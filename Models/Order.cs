using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace CourseWork.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        [ForeignKey("Customer")]
        public int CustomerId { get; set; }
        public Customer Customer {get;set;}
        public List<Product> products { get; set; }

        public int CartId { get; set; }
    }
}