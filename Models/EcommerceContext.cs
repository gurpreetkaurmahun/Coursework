using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using CourseWork.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

 public class EcommerceContext : IdentityDbContext<IdentityUser>
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
       
         modelBuilder.Entity<Product>()
        .HasOne(p => p.Category)
        .WithMany()  // Assuming you have a navigation property 'Products' in your Category class
        .HasForeignKey(p => p.CategoryId);

         modelBuilder.Entity<Category>()
                .HasIndex(c => c.name) // Create an index for the Name property
                .IsUnique();

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

        
}}
