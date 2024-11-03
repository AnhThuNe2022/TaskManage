using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebManagaTask.Models;

namespace WebManagaTask.Data;

public class ApplicationDbContext : IdentityDbContext
{

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Category> Category { get; set; }
    public DbSet<Tasks> Task { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<IdentityUserLogin<string>>().HasKey(l => new { l.LoginProvider, l.ProviderKey });

        modelBuilder.Entity<Tasks>()
            .HasKey(o => o.TaskId);
        modelBuilder.Entity<Tasks>()
         .HasOne(o => o.Category)
         .WithMany(e => e.Tasks)
         .HasForeignKey(o => o.CategoryId);
    }
}
