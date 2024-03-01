using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CourseWork.Models
{
    public class Product
    {
        public int ProductId { get; set; }        

         
        public string name { get; set; }

        public double price { get; set; }
        
        [ForeignKey("Category")]
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
       
        
       
    }
}