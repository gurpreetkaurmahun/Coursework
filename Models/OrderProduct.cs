using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace CourseWork.Models
{
    public class OrderProduct
    {
        public int OrderProductId { get; set; }
        
        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public Product Product { get; set; }
        [ForeignKey("Order")]
        public int OrderId { get ; set; }
        public Order Order{ get ;set; }

        public DateOnly DateOfOrder { get ; set;}
    }
}