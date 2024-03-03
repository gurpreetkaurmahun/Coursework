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
    public class CartController : ControllerBase
    {
        private readonly EcommerceContext _context;

        public CartController(EcommerceContext context)
        {
            _context = context;
        }

        // GET: api/Cart
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCarts()
        {
            return await _context.Carts.ToListAsync();
        }

        // GET: api/Cart/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cart>> GetCart(int id)
        {
            // Finding the cart entry in the database based on the provided ID
            var cart = await _context.Carts.FindAsync(id);

            if (cart == null)
            {
                return NotFound();
            }

            return cart;
        }

        // PUT: api/Cart/5
       
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart(int id, Cart cart)
        {
            // Checking if the provided ID matches the CartId of the cart object
            if (id != cart.CartId)
            {
                return BadRequest();
            }

             // Setting the state of the cart object in the context to Modified
            _context.Entry(cart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            
            // Returning an Ok response indicating successful update of the cart
            // Also providing a message indicating the changes made
            return Ok(new { message = $"Changes made to  account with CartId {cart.CartId}" });
        }

        // POST: api/Cart
        
        [HttpPost]
        public async Task<ActionResult<Cart>> PostCart(Cart cart)
        {
            // Checking if the customer associated with the cart exists in the Customer Table
            var existingCustomer = await _context.Customers.FindAsync(cart.CustomerId);
            if (existingCustomer == null)
            {
                // Returning a BadRequest response if the customer does not exist
                return Conflict($"Customer with the provided {cart.CustomerId} does not exist.");
            }
              // Checking if a cart with the provided CartId already exists
            var existingCart = await _context.Carts.FindAsync(cart.CartId);
            if (existingCart != null)
            {
                // Returning a Conflict response if the cart already exists
                return Conflict($"A cart with the provided CartId {cart.CartId} already exists.");
            }

            // Adding the new cart entry to the context
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();

             // Returning a response indicating successful creation of the cart
            return CreatedAtAction("GetCart", new { id = cart.CartId }, cart);
        }

        // DELETE: api/Cart/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {

            // Finding the cart entry in the database based on the provided ID
            var cart = await _context.Carts.FindAsync(id);
            if (cart == null)
            {
                 // Returning a Conflict response if the cart with the provided ID cannot be found
                return Conflict($"A Cart with the ID {id} cannot be found");
            }

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        

        private bool CartExists(int id)
        {
            return _context.Carts.Any(e => e.CartId == id);
        }
    }
}
