using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
namespace CourseWork.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string name{ get; set; }

       
    }
}