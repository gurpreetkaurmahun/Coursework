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
    public class OrderController : ControllerBase
    {
        private readonly EcommerceContext _context;

        public OrderController(EcommerceContext context)
        {
            _context = context;
        }

        // GET: api/Order
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.ToListAsync();
        }

        // GET: api/Order/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            // Finding the order entry in the database based on the provided ID
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                // Returning a NotFound response if the order with the provided ID cannot be found
                return NotFound();
            }

             // Returning the found order entry
            return order;
        }

        // PUT: api/Order/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            // Checking if the provided ID matches the OrderId of the order object
            if (id != order.OrderId)
            {
                // Returning a BadRequest response if the IDs do not match
                return BadRequest();
            }

            // Setting the state of the order object in the context to Modified
            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            // Returning an Ok response indicating successful update of the order
            // Also providing a message indicating the changes made

            return  Ok(new { message = $"Changes made to account with orderId {order.OrderId}" });
        }


        [HttpPost]
       public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            // Check if a Order with the same name already exists in the same category
            var existingOrder = await _context.Orders.FirstOrDefaultAsync(o => o.OrderId == order.OrderId );

            if (existingOrder != null)
            {
                // Order with the same name in the same category already exists, return a conflict response
                return Conflict($"A Order with the OREDERID {order.OrderId} is already added to the Cart with id {order.CartId}");
            }

            // No existing Order with the same name in the same category, proceed with adding the new Order
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.OrderId }, order);
        }
        // DELETE: api/Order/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
             // Finding the order entry in the database based on the provided ID
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                // Returning a Conflict response if the order with the provided ID cannot be found
                return Conflict($"A Order with id {id} not found");
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            // Returning a response indicating successful deletion of the order
            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }
    }
}
