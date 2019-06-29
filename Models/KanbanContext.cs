using Microsoft.EntityFrameworkCore;

namespace kanban.Models
{
    public class KanbanContext : DbContext
    {
        public KanbanContext(DbContextOptions<KanbanContext> options) : base(options)
        {
        }

        public DbSet<TblProject> Projects { get; set; }

        public DbSet<TblKanbanList> KanbanLists { get; set; }

        public DbSet<TblTaskCard> TaskCards { get; set; }

        public DbSet<TblComment> Comments { get; set; }
    }
}