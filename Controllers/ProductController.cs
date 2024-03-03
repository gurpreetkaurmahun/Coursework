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
    public class ProductController : ControllerBase
    {
        private readonly EcommerceContext _context;

        public ProductController(EcommerceContext context)
        {
            _context = context;
        }

        // GET: api/Product
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _context.Products.Include(p => p.Category).ToListAsync();
            return products;
            // return await _context.Products.ToListAsync();
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return Conflict($"A product with the ID {id} cannot be found");
            }

            return product;
        }

        // PUT: api/Product/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            // Checking if the provided ID matches the ProductId of the product object
            if (id != product.ProductId)
            {
                 // Returning a BadRequest response if the IDs do not match
                return BadRequest();
            }

             // Setting the state of the product object in the context to Modified
            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            // Returning an Ok response indicating successful update of the product
            // Also providing a message indicating the changes made
            return Ok(new { message = $"Changes made to ProductId {product.ProductId}" });
        }

     

       [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            // Check if a product with the same name already exists in the same category
            var existingProduct = await _context.Products.FirstOrDefaultAsync(p => p.name == product.name );

            //creating list of products to display to the user the list of existing categories
            var products = await _context.Products.Include(p => p.Category).ToListAsync();
            if (existingProduct != null)
            {
                
                 return Conflict(new { Message = $"A product with the name '{product.name}' already exists in the category '{existingProduct.Category.name}'.", ExistingProducts = products });
            }

            // No existing product with the same name in the same category, proceed with adding the new product
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.ProductId }, product);
        }




        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            // Finding the product entry in the database based on the provided ID
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                // Returning a Conflict response if the product with the provided ID cannot be found
                return Conflict($"A product with the ID {id} cannot be found");
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();


            // Returning a response indicating successful deletion of the product
            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }
    }
}
