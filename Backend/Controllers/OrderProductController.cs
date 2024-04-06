using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CourseWork.Models;
using CourseWork.Support;
using System.Globalization;

namespace CourseWork.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderProductController : ControllerBase
    {
        private readonly EcommerceContext _context;
        private readonly ILogger<OrderProductController> _logger; 
        private readonly LogSupport _logSupport;

        private readonly string _currentTime;

        public OrderProductController(EcommerceContext context,ILogger<OrderProductController> logger, LogSupport logSupport)
        {
            _context = context;
            _logger=logger;
            _logSupport=logSupport;
            _currentTime=_logSupport.GetCurrentTime();
        }

        // GET: api/OrderProduct
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderProduct>>> GetOrderProducts()
        {

            try{
                _logger.LogInformation($"Time:{_currentTime} ==> Fetching OrderProducts:");
                return await _context.OrderProducts.ToListAsync();
            }
            catch (Exception ex){
                _logger.LogError(ex,$"Time:{_currentTime} ==>Error occured while fetching OrderProduct");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching OrderProduct");

            }
            
        }

        // GET: api/OrderProduct/5/2/2023-12/21 Where 5 is productid, 2 is orderid, and dateoforder is date on which order is placed.
        // these 3 values are passed to the Route because OrderProduct is a link table and these 3 ids are a  composite key
        [HttpGet("{productId}/{orderId}/{dateOfOrder}")]
        public async Task<ActionResult<OrderProduct>> GetOrderProduct(int productId, int orderId, DateOnly dateOfOrder)
        {

            try{
                _logger.LogInformation($"Time:{_currentTime} ==> Searching OrderProduct with requested Id");

                var orderProduct = await _context.OrderProducts.FindAsync(productId, orderId, dateOfOrder);

                if (orderProduct == null)
                {
                    _logger.LogError($"Time:{_currentTime} ==>An OrderProduct with ProductId {productId}, OrderId {orderId}, and DateOfOrder {dateOfOrder} does not match the composite key values.");
                    return NotFound($"An OrderProduct with ProductId {productId}, OrderId {orderId}, and DateOfOrder {dateOfOrder} does not match the composite key values.");
                }
                _logger.LogInformation($"Time:{_currentTime} ==>Fetching OrderProduct with ProductId {productId}, OrderId {orderId}, and DateOfOrder {dateOfOrder}");
                return orderProduct;
            }
            catch (Exception ex){
                _logger.LogError(ex,$"Time:{_currentTime} ==>Error occured while fetching OrderProduct with requested Id");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching OrderProduct with Requested ID");

            }
            
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
            try{
                 // Checking if an OrderProduct with the same ProductId, OrderId, and DateOfOrder already exists
                 _logger.LogInformation($"Time:{_currentTime} ==> Checking if OrderProduct with Id:{orderProduct.ProductId}/{orderProduct.OrderId}/{orderProduct.DateOfOrder}");
                var OrderProducts = await _context.OrderProducts.FirstOrDefaultAsync(op =>op.ProductId ==orderProduct.ProductId && op.OrderId == orderProduct.OrderId&& op.DateOfOrder == orderProduct.DateOfOrder);
                if (OrderProducts!=null)
                {

                    _logger.LogError($"Time:{_currentTime} ==>An order product with  ProductId {orderProduct.ProductId},OrderId {orderProduct.OrderId}, and DateOfOrder {orderProduct.DateOfOrder} already exists.");
                    // Returning a Conflict response if an order product with the same attributes already exists
                    return Conflict($"An order product with  ProductId {orderProduct.ProductId},OrderId {orderProduct.OrderId}, and DateOfOrder {orderProduct.DateOfOrder} already exists.");
                }
                // Check if the ProductId exists
                if (!await _context.Products.AnyAsync(p => p.ProductId == orderProduct.ProductId))
                {
                     _logger.LogError($"Time:{_currentTime} ==>Product with ID {orderProduct.ProductId} not found and it does not exist in Product Table");
                    // Returning a Conflict response if the ProductId does not exist in the Product Table
                    return Conflict($"Product with ID {orderProduct.ProductId} not found and it does not exist in Product Table");
                }

                // Check if the OrderId exists
                if (!await _context.Orders.AnyAsync(o => o.OrderId == orderProduct.OrderId))
                {
                    _logger.LogError($"Time:{_currentTime} ==>Product with ID {orderProduct.OrderId} not found and it does not exist in Product Table");
                    // Returning a Conflict response if the OrderId does not exist in the Order Table
                    return Conflict($"Order with ID {orderProduct.OrderId} not found and it does not exist in Order Table");
                }

                // Add the new order product to the context
                _context.OrderProducts.Add(orderProduct);
                
                // Save changes to the database
                await _context.SaveChangesAsync();
                _logger.LogInformation($"Time:{_currentTime} ==>OrderProduct Sucessfully added to the OrderProduct Table");

                // Return a 201 Created response with the created orderProduct
                return CreatedAtAction("GetOrderProduct", new { id = orderProduct.OrderProductId }, orderProduct);
            }
                catch (Exception ex){
                _logger.LogError(ex,$"Time:{_currentTime} ==>Error occured while Adding OrderProduct with requested Id");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while Adding OrderProduct with Requested ID");

            }
                   
            }

  


        // DELETE: api/OrderProduct/5
        [HttpDelete("{productId}/{orderId}/{dateOfOrder}")]
        public async Task<IActionResult> DeleteOrderProduct(int productId, int orderId, DateOnly dateOfOrder)
        {
            try{
                _logger.LogInformation($"Time:{_currentTime} ==> Searching for OrderProduct with Composite Key{productId}/{orderId}/{dateOfOrder}");
               var orderProduct = await _context.OrderProducts.FirstOrDefaultAsync(op =>
            op.ProductId == productId && op.OrderId == orderId && op.DateOfOrder == dateOfOrder);
                if (orderProduct == null)
                {
                    _logger.LogError($"Time:{_currentTime} ==> OrderProduct with Id not found.");
                    // Returning a NotFound response if the OrderProduct with the provided ID cannot be found
                    return NotFound();
                }
                
               
                // Removing the OrderProduct entry from the context
                _context.OrderProducts.Remove(orderProduct);
                await _context.SaveChangesAsync();

                _logger.LogInformation($"Time:{_currentTime} ==> OrderProduct with Id: Sucessfully Deleted.");
                return Ok(" OrderProduct with Id: Sucessfully Deleted.");
                }
           
            catch (Exception ex){
                _logger.LogError(ex,$"Time:{_currentTime} ==>Error occured while Deleting OrderProduct with requested Id");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while Deleting OrderProduct with Requested ID");

            }
        }

        private bool OrderProductExists(int id)
        {
            return _context.OrderProducts.Any(e => e.ProductId == id);
        }



    }
}
