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

        // GET: api/OrderProduct/5/2/2023-12/21 Where 5 is poductid, 2 is orderid, and dateoforder is date on which order is placed.
        // these 3 values are passed because OrderProduct is a link table and these 3 ids are a form of composite key
        [HttpGet("{productId}/{orderId}/{dateOfOrder}")]
        public async Task<ActionResult<OrderProduct>> GetOrderProduct(int productId, int orderId, DateOnly dateOfOrder)
        {
            var orderProduct = await _context.OrderProducts.FindAsync(productId, orderId, dateOfOrder);

            if (orderProduct == null)
            {
                return NotFound($"An OrderProduct with ProductId {productId}, OrderId {orderId}, and DateOfOrder {dateOfOrder} does not exist");
            }

            return orderProduct;
        }


        // PUT: api/OrderProduct/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{productId}/{orderId}/{dateOfOrder}")]
        public async Task<IActionResult> PutOrderProduct(int productId, int orderId, DateOnly dateOfOrder, int orderProductId, OrderProduct orderProduct)
        {
             if (orderProductId != orderProduct.OrderProductId || productId != orderProduct.ProductId || orderId != orderProduct.OrderId || dateOfOrder != orderProduct.DateOfOrder)
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
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
       [HttpPost]

        public async Task<ActionResult<OrderProduct>> PostOrderProduct(OrderProduct orderProduct)
        {
            
                if (await _context.OrderProducts.AnyAsync(op =>
                op.ProductId == orderProduct.ProductId &&
                op.OrderId == orderProduct.OrderId &&
                op.DateOfOrder == orderProduct.DateOfOrder))
                {
                    return Conflict($"An order product with  ProductId {orderProduct.ProductId},OrderId {orderProduct.OrderId}, and DateOfOrder {orderProduct.DateOfOrder} already exists.");
                }
                // Check if the ProductId exists
                if (!await _context.Products.AnyAsync(p => p.ProductId == orderProduct.ProductId))
                {
                    return Conflict($"Product with ID {orderProduct.ProductId} not found and it does not exist in Product Table");
                }

                // Check if the OrderId exists
                if (!await _context.Orders.AnyAsync(o => o.OrderId == orderProduct.OrderId))
                {
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

   




    }
}
