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
using Microsoft.Extensions.Logging;


namespace CourseWork.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class ProductController : ControllerBase
    {
        private readonly EcommerceContext _context;
        private readonly ILogger<ProductController> _logger; 
        private readonly LogSupport _logSupport;

        private readonly string _currentTime;

        public ProductController(EcommerceContext context, ILogger<ProductController> logger,LogSupport logSupport)
        {
            _context = context;
            _logger = logger;
            _logSupport=logSupport;
            _currentTime=_logSupport.GetCurrentTime();
        }

        // GET: api/Product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            
            try{
                _logger.LogInformation($"Time:{_currentTime} ==> Fetching Products:");
                var products = await _context.Products.Include(p => p.Category).ToListAsync();
                return products;
            }

            catch (Exception ex){
                _logger.LogError(ex,$"Time:{_currentTime} ==>Error occured while fetching products");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching products");

            }
           
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {

            try{

                _logger.LogInformation($"Time:{_currentTime} ==>Searching Products with id {id}");
                var product = await _context.Products.FindAsync(id);

                if (product == null)
                {
                    _logger.LogError($"Time:{_currentTime} ==>A product with the Product ID: {id} cannot be found");
                    return Conflict($"A product with the ID {id} cannot be found");
                }
                _logger.LogInformation($"Time:{_currentTime} ==>Fetching Products with id {id}");
                return product;
            }
           

            catch(Exception ex){
                _logger.LogInformation($"Time:{_currentTime} ==>An Error occurred while Fetching Product with Id{id}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching product");


            }
           

            
        }

        // PUT: api/Product/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
           

            try
            {
               
                 // Checking if the provided ID matches the ProductId of the product object
                if (id != product.ProductId)
                {
                    _logger.LogWarning("Time:{_currentTime} ==>Invalid Id entered!Please recheck the id!");
                    return Conflict(new { message = $" Invalid Id for Product Entered!" });
                   
                }

                // Setting the state of the product object in the context to Modified
                
                _context.Entry(product).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                _logger.LogInformation($"Time:{_currentTime} ==>Product with {product.name} Successfully Updated ");
                return Ok(new { message = $"Changes made to ProductId {product.ProductId}" });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    _logger.LogWarning($"Time:{_currentTime} ==>Product with id {product.ProductId} not found!");
                    return Conflict(new { message = $" ProductId {product.ProductId} not found" });
                }
                else
                {
                    throw;
                }
            }

            catch (Exception ex){
                _logger.LogError($"Time:{_currentTime} ==>An error occurred while updating the product: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");

           }
        }

     

       [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {

            try{
            // Check if a product with the same name already exists in the same category
            var existingProduct = await _context.Products.FirstOrDefaultAsync(p => p.name == product.name );

            //creating list of products to display to the user the list of existing categories
            var products = await _context.Products.Include(p => p.Category).ToListAsync();
            if (existingProduct != null)
            {
                _logger.LogError($"Time:{_currentTime} ==>Product with id {product.ProductId} exists in the Products Table");
                return Conflict(new { Message = $"A product with the name '{product.name}' already exists in the category '{existingProduct.Category.name}'.", ExistingProducts = products });
            }

            _logger.LogInformation($"Time:{_currentTime} ==>Product with {product.name} Successfully added to the Product Table");
            // No existing product with the same name in the same category, proceed with adding the new product
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetProduct", new { id = product.ProductId }, product);
            }
           

            catch(Exception ex){
                _logger.LogError($"Time:{_currentTime} ==>An error occurred while creating the product: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }




        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {

            try{
                 // Finding the product entry in the database based on the provided ID
                var product = await _context.Products.FindAsync(id);
                if (product == null)
                {
                    _logger.LogError($"Time:{_currentTime} ==>A product with the ID {id} cannot be found");
                    // Returning a Conflict response if the product with the provided ID cannot be found
                    return Conflict($"A product with the ID {id} cannot be found");
                }
               
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
                 _logger.LogInformation($"Time:{_currentTime} ==>Product with ProductID {product.ProductId} deleted.");

                // Returning a response indicating successful deletion of the product
                return Ok($"Product with Id: {id} successfully deleted!");


            }
           

             catch(Exception ex){
                _logger.LogError($"Time:{_currentTime} ==>An error occurred while deleting the product: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }
    }
}
