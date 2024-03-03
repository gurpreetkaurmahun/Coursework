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

        // GET: api/OrderProduct/5/2/2023-12/21 Where 5 is productid, 2 is orderid, and dateoforder is date on which order is placed.
        // these 3 values are passed to the Route because OrderProduct is a link table and these 3 ids are a  composite key
        [HttpGet("{productId}/{orderId}/{dateOfOrder}")]
        public async Task<ActionResult<OrderProduct>> GetOrderProduct(int productId, int orderId, DateOnly dateOfOrder)
        {
            var orderProduct = await _context.OrderProducts.FindAsync(productId, orderId, dateOfOrder);

            if (orderProduct == null)
            {
                return NotFound($"An OrderProduct with ProductId {productId}, OrderId {orderId}, and DateOfOrder {dateOfOrder} does not match the composite key values.");
            }

            return orderProduct;
        }


        // PUT: api/OrderProduct/5
        
    
        [HttpPut("{productId}/{orderId}/{dateOfOrder}")]
        public async Task<IActionResult> PutOrderProduct(int productId, int orderId, DateOnly dateOfOrder, int orderProductId, OrderProduct orderProduct)
        {
            if (
            productId != orderProduct.ProductId &&
            orderId != orderProduct.OrderId &&
            dateOfOrder != orderProduct.DateOfOrder)
        {
            return BadRequest("The provided data does not match the composite key values.");
        }

            _context.Entry(orderProduct).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderProductExists(orderProductId))
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
       
       [HttpPost]

        public async Task<ActionResult<OrderProduct>> PostOrderProduct(OrderProduct orderProduct)
        {
            
                 // Checking if an OrderProduct with the same ProductId, OrderId, and DateOfOrder already exists
                if (await _context.OrderProducts.AnyAsync(op =>
                op.ProductId == orderProduct.ProductId &&
                op.OrderId == orderProduct.OrderId &&
                op.DateOfOrder == orderProduct.DateOfOrder))
                {
                    // Returning a Conflict response if an order product with the same attributes already exists
                    return Conflict($"An order product with  ProductId {orderProduct.ProductId},OrderId {orderProduct.OrderId}, and DateOfOrder {orderProduct.DateOfOrder} already exists.");
                }
                // Check if the ProductId exists
                if (!await _context.Products.AnyAsync(p => p.ProductId == orderProduct.ProductId))
                {
                    // Returning a Conflict response if the ProductId does not exist in the Product Table
                    return Conflict($"Product with ID {orderProduct.ProductId} not found and it does not exist in Product Table");
                }

                // Check if the OrderId exists
                if (!await _context.Orders.AnyAsync(o => o.OrderId == orderProduct.OrderId))
                {
                    // Returning a Conflict response if the OrderId does not exist in the Order Table
                    return Conflict($"Order with ID {orderProduct.OrderId} not found and it does not exist in Order Table");
                }

                // Add the new order product to the context
                _context.OrderProducts.Add(orderProduct);
                
                // Save changes to the database
                await _context.SaveChangesAsync();

                // Return a 201 Created response with the created orderProduct
                return CreatedAtAction("GetOrderProduct", new { id = orderProduct.OrderProductId }, orderProduct);
                   
            }

   
    

        // DELETE: api/OrderProduct/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderProduct(int id)
        {
             // Finding the OrderProduct entry in the database based on the provided ID
            var orderProduct = await _context.OrderProducts.FindAsync(id);
            if (orderProduct == null)
            {
                 // Returning a NotFound response if the OrderProduct with the provided ID cannot be found
                return NotFound();
            }

            // Removing the OrderProduct entry from the context
            _context.OrderProducts.Remove(orderProduct);
            await _context.SaveChangesAsync();

            // Returning a response indicating successful deletion of the OrderProduct
            return NoContent();
        }

        private bool OrderProductExists(int id)
        {
            return _context.OrderProducts.Any(e => e.ProductId == id);
        }



    }
}
