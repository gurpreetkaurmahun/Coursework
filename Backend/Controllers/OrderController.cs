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
   
    public class OrderController : ControllerBase
    {
        private readonly EcommerceContext _context;
         private readonly ILogger<OrderController> _logger; 
        private readonly LogSupport _logSupport;

        private readonly string _currentTime;

        public OrderController(EcommerceContext context,ILogger<OrderController> logger,LogSupport logSupport)
        {
            _context = context;
            _logger=logger;
            _logSupport=logSupport;
            _currentTime=_logSupport.GetCurrentTime();
        }

        // GET: api/Order
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {

            try{
                _logger.LogInformation($"Time:{_currentTime} ==> Fetching Orders:");
                return await _context.Orders.ToListAsync();
            }
            catch (Exception ex){
                _logger.LogError(ex,$"Time:{_currentTime} ==>Error occured while fetching Orders");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching Orders");

            }
            
        }

        // GET: api/Order/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {

            try{
            _logger.LogInformation($"Time:{_currentTime} ==> Fetching Order with Id {id}");
            // Finding the order entry in the database based on the provided ID
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                _logger.LogError($"Time:{_currentTime} ==> Failed to Fetch Order with Id {id}");
                // Returning a NotFound response if the order with the provided ID cannot be found
                return Conflict($"Failed to Fetch Order with Id {id}");
            }

            _logger.LogInformation($"Details of Order with Id:{id} are as Follows:");
             // Returning the found order entry
            return order;

            }

            catch (Exception ex){
                _logger.LogError(ex,$"Time:{_currentTime} ==>Error occured while fetching Order with Id{id}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching Order with requested Id.");

            }
            
        }

        // PUT: api/Order/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
          
            try
            {
                  
            if (id != order.OrderId)
            {
                _logger.LogInformation($"Time:{_currentTime} ==> Invalid Id Entered. Please recheck the Id");
                // Returning a BadRequest response if the IDs do not match
                return Conflict($"Invalid Id Entered. Please recheck the Id");
            }


            _context.Entry(order).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            _logger.LogInformation($"Time:{_currentTime} ==> Order with Id: {id} successfully updated");
            return  Ok(new { message = $"Changes made to account with orderId {order.OrderId}" });
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    _logger.LogError($"Time:{_currentTime} ==> Order with Id:{id} not found!");
                    return Conflict($"Order with Id not Found. Please Recheck the Value");
                }
                else
                {
                    throw;
                }
            }
        }


        [HttpPost]
       public async Task<ActionResult<Order>> PostOrder(Order order)
        {

            try{
                // Check if a Order with the same name already exists in the same category
            var existingOrder = await _context.Orders.FirstOrDefaultAsync(o => o.OrderId == order.OrderId );

            if (existingOrder != null)
            {
                _logger.LogInformation($"Time:{_currentTime} ==>Error occured while Adding Order with Id{order.OrderId}");
                // Order with the same name in the same category already exists, return a conflict response
                return Conflict($"A Order with the OREDERID {order.OrderId} is already added to the Cart with id {order.CartId}");
            }
            
            // No existing Order with the same name in the same category, proceed with adding the new Order
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            _logger.LogInformation($"Time:{_currentTime} ==>Order with Id: {order.OrderId} Successfully added .");
            return CreatedAtAction("GetOrder", new { id = order.OrderId }, order);

            }
            

             catch (Exception ex){
                _logger.LogError(ex,$"Time:{_currentTime} ==>Error occured while Adding Order with requested Id");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while Adding Order with requested Id.");

            }
        }
        // DELETE: api/Order/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            try{
            _logger.LogInformation($"Time:{_currentTime} ==> Searching for Order with Id {id}");
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                _logger.LogError($"Time:{_currentTime} ==> Order with Id:{id} could not be Found.");
                // Returning a Conflict response if the order with the provided ID cannot be found
                return Conflict($"A Order with id {id} not found");
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

           _logger.LogInformation($"Time:{_currentTime} ==> Order with Id:{id} successfully deleted.");
            return Ok($"Order with Id:{id} successfully deleted.");
            }
         

            catch (Exception ex){
                _logger.LogError(ex,$"Time:{_currentTime} ==>Error occured while Deleting Order with Id{id}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while Deleting Order with requested Id.");

            }
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }
    }
}
