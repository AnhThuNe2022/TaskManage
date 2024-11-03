using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebManagaTask.Models
{
    public class Tasks
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TaskId { get; set; } 
        public int UserId { get; set; } 
        public string? Title { get; set; } 
        public string? Description { get; set; }
        /// <summary>0:Unsuccess 1:success </summary>
        public int Status { get; set; }  
        public int Priority { get; set; }
        public int? CategoryId { get; set; }

        public Category? Category { get; set; }
        public DateTime? DueDate { get; set; } 
        public DateTime CreatedAt { get; set; } 
        public DateTime UpdatedAt { get; set; } 
    }
}
