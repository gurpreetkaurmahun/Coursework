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
    public class CustomerController : ControllerBase
    {
        private readonly EcommerceContext _context;
        private readonly ILogger<CustomerController> _logger; 
        private readonly LogSupport _logSupport;

        private readonly string _currentTime;

        public CustomerController(EcommerceContext context,ILogger<CustomerController> logger,LogSupport logSupport)
        {
            _context = context;
            _logger=logger;
            _logSupport=logSupport;
            _currentTime=_logSupport.GetCurrentTime();
            
        }

        // GET: api/Customer
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            try{
                _logger.LogInformation($"Time:{_currentTime} ==> Fetching Customers:");
                return await _context.Customers.ToListAsync();
            }

            catch (Exception ex){
                _logger.LogError(ex,$"Time:{_currentTime} ==>Error occured while fetching Customers");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching Customers");

            }
            
        }

        // GET: api/Customer/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {

            try{
                _logger.LogInformation($"Searching FOr CUstomer with id{id}");
                 // Finding the customer entry in the database based on the provided ID
                var customer = await _context.Customers.FindAsync(id);

                if (customer == null)
                {
                    _logger.LogError($"Customer With Provided Id:{id} Not Found");
                    // Returning a NotFound response if the customer with the provided ID cannot be found
                    return NotFound();
                }

                _logger.LogInformation($"Providing Details of Customer with Id:{id}");
                return customer;

            }

            catch (Exception ex){
                _logger.LogError(ex,$"Time:{_currentTime} ==>Error occured while fetching Customer with Id:{id}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching Customer with Requested ID");

            }
           
        }

        // PUT: api/Customer/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, Customer customer)
        {
             // Checking if the provided ID matches the CustomerId of the customer object
            try
            {
                if (id != customer.CustomerId)
                {
                    _logger.LogError($"Time:{_currentTime} ==>Invalid Value for the ID entered. Please Recheck the value.");
                    // Returning a BadRequest response if the IDs do not match
                    return Conflict($"Invalid Value for the ID entered. Please Recheck the value.");
                }

                _context.Entry(customer).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                _logger.LogInformation($"Time:{_currentTime} ==>Changes made to account with CustomerId {customer.CustomerId}");
                return Ok(new { message = $"Changes made to account with CustomerId {customer.CustomerId}" }) ;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    _logger.LogError($"Time:{_currentTime} ==>Customer with Id {id} not Found! Please recheck the Id value");
                    return Conflict($"Customer with Id {id} not Found! Please recheck the Id value");
                }
                else
                {
                    throw;
                }
            }

              catch (Exception ex){
                _logger.LogError($"Time:{_currentTime} ==>An error occurred while updating the Customer: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");

           }
        }

        // POST: api/Customer
        
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {

            try{
                
                var existingCustomer = await _context.Customers.FirstOrDefaultAsync(c => c.CustomerId == customer.CustomerId);
                 // Adding the customer object to the context
                 if(existingCustomer!=null){
                     _logger.LogError($"Time:{_currentTime} ==>Customer with Id {customer.CustomerId} already exists.");
                     return Conflict($"Customer with Id {customer.CustomerId}already exists.");
                 }
                _context.Customers.Add(customer);
                await _context.SaveChangesAsync();
                _logger.LogInformation($"Time:{_currentTime} ==>New Customer Added to the Customer Table");
                return CreatedAtAction("GetCustomer", new { id = customer.CustomerId }, customer);

            }
              catch (Exception ex){
                _logger.LogError($"Time:{_currentTime} ==>An error occurred while Adding the Customer with ID:{customer.CustomerId}: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");

           }
            
        }

        // DELETE: api/Customer/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {

            try{
                _logger.LogInformation($"Time:{_currentTime} ==> Searching for Customer withID:{id}");
                var customer = await _context.Customers.FindAsync(id);
                if (customer == null )
                {
                    _logger.LogError($"Time:{_currentTime} ==> Customer withID:{id} not found in the system");
                    return Conflict($"A Customer with the ID {id } cannot be found");
                }
               
                _context.Customers.Remove(customer);
                await _context.SaveChangesAsync();
                _logger.LogInformation($"Time:{_currentTime} ==> Customer withID:{id} Sucessfully Deleted");
                return Ok($"Customer withID:{id} Sucessfully Deleted");

            }

            
             catch(Exception ex){
                _logger.LogError($"Time:{_currentTime} ==>An error occurred while deleting the Customer: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
          
        }

        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.CustomerId == id);
        }
    }
}
