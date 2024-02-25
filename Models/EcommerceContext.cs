using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using CourseWork.Models;

public class EcommerceContext : DbContext
{
  

    public EcommerceContext(DbContextOptions<EcommerceContext> options) : base(options)
    {
    }
    public DbSet<OrderProduct> OrderProducts { get; set; }
    public DbSet<Cart> Carts { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder); 

        modelBuilder.Entity<OrderProduct>()
            .HasKey(op => new { op.ProductId, op.OrderId, op.DateOfOrder });

        modelBuilder.Entity<OrderProduct>()
            .HasOne(op => op.Product)
            .WithMany()
            .HasForeignKey(op => op.ProductId);

        modelBuilder.Entity<OrderProduct>()
            .HasOne(op => op.Order)
            .WithMany()
            .HasForeignKey(op => op.OrderId);
    }
}
