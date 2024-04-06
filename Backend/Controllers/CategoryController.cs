using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CourseWork.Models;
using CourseWork.Support;
using Microsoft.AspNetCore.Authorization;


namespace CourseWork.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize(Roles = "Administrator")]
    public class CategoryController : ControllerBase
    {
        private readonly EcommerceContext _context;
        private readonly ILogger<CategoryController> _logger; 
        private readonly LogSupport _logSupport;

        private readonly string _currentTime;

        public CategoryController(EcommerceContext context,ILogger<CategoryController> logger,LogSupport logSupport)
        {
            _context = context;
            _logger=logger;
            _logSupport=logSupport;
            _currentTime=_logSupport.GetCurrentTime();
        }

        // GET: api/Category
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            try{
                _logger.LogInformation($"Time:{_currentTime} ==> Fetching Products:");
                // Include the associated products for each category
                return await _context.Categories.ToListAsync();
            }
            catch (Exception ex){
                _logger.LogError(ex,$"Time:{_currentTime} ==>Error occured while fetching Categories");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching Categories");

            }
            
            
        }

        // GET: api/Category/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {

            try{
                _logger.LogInformation($"Time:{_currentTime} ==>Searching Category with id {id}");
                var category = await _context.Categories.FindAsync(id);

                if (category == null || category.CategoryId!=id )
                {
                    _logger.LogError($"Time:{_currentTime} ==> Category with Id: {id} not found");
                    return Conflict($"Category with Id: {id} not found");
                }

                _logger.LogInformation($"Time:{_currentTime} ==> Fetching Category with Id: {id} ");
                // Returning the found category entry
                return category;

            }
            catch (Exception ex){
                _logger.LogError(ex,$"Time:{_currentTime} ==>Error occured while fetching Category with Id: {id}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching Category with requested Id");

            }
        }

        // PUT: api/Category/5
        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, Category category)
        {
           

            try
            {
             _logger.LogInformation($"Time:{_currentTime} ==>Searching Category with id {id}");
            // Checking if the provided ID matches the CategoryId of the category object
            if (id != category.CategoryId)
            {
                _logger.LogError($"Time:{_currentTime} ==>Invalid Id entered!Please recheck the id!");
                return BadRequest();
            }
            // Setting the state of the category object in the context to Modified
            _context.Entry(category).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            _logger.LogInformation($"Time:{_currentTime} ==>Category with id {id} Sucessfully Updated");
            return Ok(new { message = $"Changes made to  account with CategoryId {category.CategoryId}" });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    _logger.LogError($"Time:{_currentTime} ==> Category with Id : {id} not Found!");
                    return Conflict($"Category with Id {id} Not Found!");
                }
                else
                {
                    throw;
                }
            }

            catch (Exception ex){
                _logger.LogError($"Time:{_currentTime} ==>An error occurred while updating the Category with Id {id}: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");

           }

            
        }


        // POST: api/Category
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
       [HttpPost]
       public async Task<ActionResult<Category>> PostCategory(Category category)
        {
            try
            {
                _logger.LogInformation($"Time:{_currentTime} ==> Checking if Category with Id{category.CategoryId} or Name {category.name} Already Exists or not!");
                var existingCategory = await _context.Categories.FirstOrDefaultAsync(c => c.name == category.name || c.CategoryId == category.CategoryId);
                var categories = await _context.Categories.ToListAsync();

                if (existingCategory != null)
                {
                    _logger.LogError($"Time:{_currentTime} ==> Category with Id {category.CategoryId} Already Exists! Duplicate entries Not Allowed!");
                    return Conflict(new { Message = $"A category with the name '{category.name}' or with ID '{category.CategoryId}' already exists.", ExistingCategories = categories });
                }

                _context.Categories.Add(category);
                await _context.SaveChangesAsync();
                _logger.LogInformation($"Time:{_currentTime} ==> Category with Id {category.CategoryId} created Successfully");

                return CreatedAtAction("GetCategory", new { id = category.CategoryId }, category);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Time:{_currentTime} ==> An error occurred while adding the Category with Id {category.CategoryId}: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // public async Task<ActionResult<Category>> PostCategory(Category category)
        // {

        //     try{
        //         _logger.LogInformation($"Time:{_currentTime} ==>Checking if Category with Id{category.CategoryId} or Name {category.name} Already Exists or not!");
                
        //         var existingCategory = await _context.Categories.FirstOrDefaultAsync(c => c.name == category.name || c.CategoryId == category.CategoryId);

        //         // Retrieving all existing categories for reference
        //         var categories =   await _context.Categories.ToListAsync();

        //         if (existingCategory != null)
        //         {
        //             // Category with the same name already exists, return a conflict response
        //             _logger.LogError($"Time:{_currentTime} ==>Category with Id {id } Already Exists! Duplicate entries Not Allowed!");
        //             return Conflict( { Message = $"A category with the name {category.name} or with ID {category.CategoryId}  already exists.", ExistingCategories = categories });
                
        //         }
        //         // No existing category with the same name, proceed with adding the new category
        //         _context.Categories.Add(category);
            
        //         await _context.SaveChangesAsync();
        //         _logger.LogInformation($"Time:{_currentTime} ==>Category with Id {id} created Successfully");

        //         // Returning a response indicating successful creation of the category
        //         return CreatedAtAction("GetCategory", new { id = category.CategoryId }, category);

        //     }

        //     catch (Exception ex){
        //         _logger.LogError($"Time:{_currentTime} ==>An error occurred while adding the Category with Id {id}: {ex.Message}");
        //         return StatusCode(500, $"Internal server error: {ex.Message}");

        //    }

            
        // }

        // DELETE: api/Category/5
        [HttpDelete("{id}")]
        
        public async Task<IActionResult> DeleteCategory(int id)
        {

            try{
                 
                // Finding the category entry in the database based on the provided ID
                var category = await _context.Categories.FindAsync(id);

                if (category == null)
                {
                    _logger.LogError($"Time:{_currentTime} ==>Category with id {id} Not Found!");
                    // Returning a Conflict response if the category with the provided ID cannot be found
                    return Conflict($"A Category with the ID {id} cannot be found");
                }

                // Check if there are any associated products
                var associatedProducts = await _context.Products.Where(p => p.CategoryId == id).ToListAsync();
                if (associatedProducts.Any())
                {
                    _logger.LogError($"Time:{_currentTime} ==>Category with id {id} cannot be deleted because it has associated products");
                // If there are associated products, return a conflict response indicating deletion is not allowed
                    return Conflict($"Cannot delete category '{category.CategoryId}' because it has associated products.");
                }

                // If there are no associated products with the category, proceed with deleting the category
                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();
                _logger.LogInformation($"Time:{_currentTime} ==>Category with Id {id}Deleted Successfully");

                return Ok($"Category with Id {id}Deleted Successfully");
            }
            catch (Exception ex){
                _logger.LogError($"Time:{_currentTime} ==>An error occurred while deleting the Category with Id {id}: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");

           }

        }


        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.CategoryId == id);
        }
    }
}
