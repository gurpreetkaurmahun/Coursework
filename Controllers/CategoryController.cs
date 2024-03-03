using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CourseWork.Models;

namespace CourseWork.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly EcommerceContext _context;

        public CategoryController(EcommerceContext context)
        {
            _context = context;
        }

        // GET: api/Category
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            // Include the associated products for each category
            return await _context.Categories.ToListAsync();
            
        }

        // GET: api/Category/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            // Finding the category entry in the database based on the provided ID
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }


            // Returning the found category entry
            return category;
        }

        // PUT: api/Category/5
        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, Category category)
        {
              // Checking if the provided ID matches the CategoryId of the category object
            if (id != category.CategoryId)
            {
                
                return BadRequest();
            }
            // Setting the state of the category object in the context to Modified
            _context.Entry(category).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

             // Returning an Ok response indicating successful update of the category
            // Also providing a message indicating the changes made

            return Ok(new { message = $"Changes made to  account with CategoryId {category.CategoryId}" });
        }


        // POST: api/Category
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
       [HttpPost]
        public async Task<ActionResult<Category>> PostCategory(Category category)
        {
             // Checking if a category with the same name or ID already exists in the database
            var existingCategory = await _context.Categories.FirstOrDefaultAsync(c => c.name == category.name || c.CategoryId == category.CategoryId);

             // Retrieving all existing categories for reference
            var categories =   await _context.Categories.ToListAsync();

            if (existingCategory != null)
            {
                // Category with the same name already exists, return a conflict response
                
                return Conflict(new { Message = $"A category with the name {category.name} or with ID {category.CategoryId}  already exists.", ExistingCategories = categories });}
            

            // No existing category with the same name, proceed with adding the new category
            _context.Categories.Add(category);
           
            await _context.SaveChangesAsync();

            // Returning a response indicating successful creation of the category
            return CreatedAtAction("GetCategory", new { id = category.CategoryId }, category);
        }

        // DELETE: api/Category/5
        [HttpDelete("{id}")]
        
        public async Task<IActionResult> DeleteCategory(int id)
        {
             // Finding the category entry in the database based on the provided ID
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {

                // Returning a Conflict response if the category with the provided ID cannot be found
                return Conflict($"A Category with the ID {id} cannot be found");
            }

            // Check if there are any associated products
            var associatedProducts = await _context.Products.Where(p => p.CategoryId == id).ToListAsync();
            if (associatedProducts.Any())
            {
               // If there are associated products, return a conflict response indicating deletion is not allowed
                return Conflict($"Cannot delete category '{category.CategoryId}' because it has associated products.");
            }

            // If there are no associated products with the category, proceed with deleting the category
            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.CategoryId == id);
        }
    }
}
