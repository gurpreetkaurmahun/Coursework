using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
namespace CourseWork.Models
{
    public class Order
    {
        public int OrderId { get; set; }
       
        public int CustomerId { get; set; }
        public Customer? Customer {get;set;}

        public List<Product>? products { get; set; }

        [ForeignKey("Cart")]
        public int? CartId { get; set; }
        public Cart? Cart{get;set;}
    }
}