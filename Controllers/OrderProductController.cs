using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CourseWork.Models;
using System.Globalization;

namespace CourseWork.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderProductController : ControllerBase
    {
        private readonly EcommerceContext _context;

        public OrderProductController(EcommerceContext context)
        {
            _context = context;
        }

        // GET: api/OrderProduct
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderProduct>>> GetOrderProducts()
        {
            return await _context.OrderProducts.ToListAsync();
        }

        // GET: api/OrderProduct/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderProduct>> GetOrderProduct(int id)
        {
            var orderProduct = await _context.OrderProducts.FindAsync(id);

            if (orderProduct == null)
            {
                return NotFound();
            }

            return orderProduct;
        }

        // PUT: api/OrderProduct/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderProduct(int id, OrderProduct orderProduct)
        {
            if (id != orderProduct.ProductId)
            {
                return BadRequest();
            }

            _context.Entry(orderProduct).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/OrderProduct
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
       [HttpPost]
       public async Task<ActionResult<OrderProduct>> PostOrderProduct(OrderProduct orderProduct)
        {
            // Check if the ProductId exists
            if (!await _context.Products.AnyAsync(p => p.ProductId == orderProduct.ProductId))
            {
                return Conflict($"Product with ID {orderProduct.ProductId} not found.");
            }

            // Check if the OrderId exists
            if (!await _context.Orders.AnyAsync(o => o.OrderId == orderProduct.OrderId))
            {
                return Conflict($"Order with ID {orderProduct.OrderId} not found.");
            }

            // Check if there is already an entry with the same ProductId, OrderId, and DateOfOrder
            if (await _context.OrderProducts.AnyAsync(op =>
                op.ProductId == orderProduct.ProductId &&
                op.OrderId == orderProduct.OrderId &&
                op.DateOfOrder == orderProduct.DateOfOrder))
            {
                return Conflict($"An order product with the same Product ID, Order ID, and Date Of Order already exists.");
            }

            // Clear ModelState
            ModelState.Clear();
           


           
  

            // Save changes asynchronously
            await _context.SaveChangesAsync();

            // Return a 201 Created response with the created orderProduct
            return CreatedAtAction("GetOrderProduct", new { id = orderProduct.ProductId }, orderProduct);
        }

       






      




         
       
        // public async Task<ActionResult<OrderProduct>> PostOrderProduct(OrderProduct orderProduct)
        // {
        //     _context.OrderProducts.Add(orderProduct);
        //     try
        //     {
        //         await _context.SaveChangesAsync();
        //     }
        //     catch (DbUpdateException)
        //     {
        //         if (OrderProductExists(orderProduct.ProductId))
        //         {
        //             return Conflict();
        //         }
        //         else
        //         {
        //             throw;
        //         }
        //     }

        //     return CreatedAtAction("GetOrderProduct", new { id = orderProduct.ProductId }, orderProduct);
        // }

        // DELETE: api/OrderProduct/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderProduct(int id)
        {
            var orderProduct = await _context.OrderProducts.FindAsync(id);
            if (orderProduct == null)
            {
                return NotFound();
            }

            _context.OrderProducts.Remove(orderProduct);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderProductExists(int id)
        {
            return _context.OrderProducts.Any(e => e.ProductId == id);
        }

       private static bool IsValidDate(DateOnly? date)
{
    if (date == null)
    {
        return false;
    }

    string dateString = date.Value.ToString("yyyy-MM-dd");
    return DateOnly.TryParseExact(dateString, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out _);
}




    }
}
