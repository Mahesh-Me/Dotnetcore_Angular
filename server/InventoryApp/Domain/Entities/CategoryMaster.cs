

using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("CategoryMaster",Schema ="dbo")]
    public class CategoryMaster
    {
        public int Id { get; set; }
        public string? CategoryName { get; set; }
        public string? IconLink { get; set; }
    }
}
