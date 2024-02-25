using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace CourseWork.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string name{ get; set; }
       
    }
}