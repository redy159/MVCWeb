﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebApplication3
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class ShoppingWebEntities : DbContext
    {
        public ShoppingWebEntities()
            : base("name=ShoppingWebEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Brand> Brands { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<ImageFile> ImageFiles { get; set; }
        public virtual DbSet<ProductReview> ProductReviews { get; set; }
        public virtual DbSet<Receipt> Receipts { get; set; }
        public virtual DbSet<Receipt_Product> Receipt_Product { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Sport> Sports { get; set; }
        public virtual DbSet<Product> Products { get; set; }
    }
}
