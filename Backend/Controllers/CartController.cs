using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CourseWork.Models;
using CourseWork.Support;

namespace CourseWork.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly EcommerceContext _context;
        private readonly ILogger<CartController> _logger; 
        private readonly LogSupport _logSupport;

        private readonly string _currentTime;



        public CartController(EcommerceContext context,ILogger<CartController> logger, LogSupport logSupport)
        {
            _context = context;
            _logger=logger;
            _logSupport=logSupport;
            _currentTime=_logSupport.GetCurrentTime();
        }

        // GET: api/Cart
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCarts()
        {

            try{
                _logger.LogInformation($"Time:{_currentTime} ==> Fetching Cart:");
                var carts=await _context.Carts.ToListAsync();
                return carts;
            }
             catch (Exception ex){
                _logger.LogError(ex,$"Time:{_currentTime} ==>Error occured while fetching Cart");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching Cart");

            }
        }

        // GET: api/Cart/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cart>> GetCart(int id)
        {

            try{
                var cart = await _context.Carts.FindAsync(id);
                _logger.LogInformation($"Time:{_currentTime} ==> Searching for Cart with Cart with Id {id}");
                 // Finding the cart entry in the database based on the provided ID
                

                if (cart == null)
                {
                    _logger.LogError($"Time:{_currentTime} ==>Cart with Id {id} Not Found");
                    return Conflict($"A product with the ID {id} cannot be found");
                }
                _logger.LogInformation($"Time:{_currentTime} ==> Fetching Cart with Id {cart.CartId}");
                return cart;

            }
            catch (Exception ex){
                _logger.LogError(ex,$"Time:{_currentTime} ==>Error occured while fetching Cart with Id {id}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching the Cart with requested Id");

            }
           
        }

        // PUT: api/Cart/5
       
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart(int id, Cart cart)
        {
           try
            {
                if (id != cart.CartId)
                {
                    _logger.LogWarning("Time:{_currentTime} ==>Invalid Id entered!Please recheck the id!");
                    return Conflict(new { message = $" Invalid Id for Cart Entered!" });
                    
                }
               
                _context.Entry(cart).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                _logger.LogInformation($"Time:{_currentTime} ==>Cart with Id: {cart.CartId} Successfully Updated ");
                return Ok(new { message = $"Changes made to  Cart with CartId {cart.CartId}" });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
                {
                    _logger.LogWarning($"Time:{_currentTime} ==>Cart with Id {id} doesnot exists !");
                    return Conflict(new { message = $" Cart with Id {cart.CartId} not found" });
                }
                else
                {
                    throw;
                }
            }
            catch (Exception ex){
                _logger.LogError($"Time:{_currentTime} ==>An error occurred while updating the Cart: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");

           }
        }

        // POST: api/Cart
        
        [HttpPost]
        public async Task<ActionResult<Cart>> PostCart(Cart cart)
        {

            try{
            // Checking if the customer associated with the cart exists in the Customer Table

            var existingCustomer = await _context.Customers.FindAsync(cart.CustomerId);
            if (existingCustomer == null)
            {
                _logger.LogWarning($"Time:{_currentTime} ==>Customer with the provided {cart.CustomerId} does not exist.");
                // Returning a BadRequest response if the customer does not exist
                return Conflict($"Customer with the provided {cart.CustomerId} does not exist.");
            }
              // Checking if a cart with the provided CartId already exists
            var existingCart = await _context.Carts.FindAsync(cart.CartId);
            if (existingCart != null)
            {
                _logger.LogWarning($"Time:{_currentTime} ==>Cart with the provided {cart.CustomerId} already exists.");
                // Returning a Conflict response if the cart already exists
                return Conflict($"A cart with the provided CartId {cart.CartId} already exists.");
            }

            // Adding the new cart entry to the context
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
            _logger.LogInformation($"New Order added to the Cart Sucessfully!");

             // Returning a response indicating successful creation of the cart
            return CreatedAtAction("GetCart", new { id = cart.CartId }, cart);

            }

            catch (Exception ex){
                _logger.LogError($"Time:{_currentTime} ==>An error occurred while Adding new Order to  the Cart: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");

           }
           }

        // DELETE: api/Cart/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {

            try{
            // Finding the cart entry in the database based on the provided ID
            var cart = await _context.Carts.FindAsync(id);
            if (cart == null)
            {
                _logger.LogError($"Time:{_currentTime} ==>Cart with Id: {id} not Found!");
                 // Returning a Conflict response if the cart with the provided ID cannot be found
                return Conflict($"A Cart with the ID {id} cannot be found");
            }

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();
            _logger.LogInformation($"Time:{_currentTime} ==>Cart with Id: {id} successfully deleted!");
            return Ok($"Cart with Id: {id} successfully deleted!");
            }

            
             catch(Exception ex){
                _logger.LogError($"Time:{_currentTime} ==>An error occurred while deleting the product: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
            
        }

        

        private bool CartExists(int id)
        {
            return _context.Carts.Any(e => e.CartId == id);
        }
    }
}
