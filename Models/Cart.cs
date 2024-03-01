using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace CourseWork.Models
{
    public class Cart
    {
        public int CartId { get; set; }
        public int CartTotal { get; set; }

        [ForeignKey("Customer")]
        public int CustomerId { get; set; }
        public Customer? Customer{get;set;}
       
        

      
        

        
        
    }
}