
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 07/10/2020 00:41:40
-- Generated from EDMX file: C:\Users\HP\Desktop\CN.NET\MVCWeb\WebApplication3\ShopWeb.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [ShoppingWeb];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_Category_Sport]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Category] DROP CONSTRAINT [FK_Category_Sport];
GO
IF OBJECT_ID(N'[dbo].[FK_Product_Brand]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Product] DROP CONSTRAINT [FK_Product_Brand];
GO
IF OBJECT_ID(N'[dbo].[FK_Product_Category]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Product] DROP CONSTRAINT [FK_Product_Category];
GO
IF OBJECT_ID(N'[dbo].[FK_Product_ImageFile]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Product] DROP CONSTRAINT [FK_Product_ImageFile];
GO
IF OBJECT_ID(N'[dbo].[FK_ProductReview_Product]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ProductReview] DROP CONSTRAINT [FK_ProductReview_Product];
GO
IF OBJECT_ID(N'[dbo].[FK_ProductReview_User]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ProductReview] DROP CONSTRAINT [FK_ProductReview_User];
GO
IF OBJECT_ID(N'[dbo].[FK_Receipt_Product_Product]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Receipt_Product] DROP CONSTRAINT [FK_Receipt_Product_Product];
GO
IF OBJECT_ID(N'[dbo].[FK_Receipt_Product_Receipt]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Receipt_Product] DROP CONSTRAINT [FK_Receipt_Product_Receipt];
GO
IF OBJECT_ID(N'[dbo].[FK_Receipt_User]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Receipt] DROP CONSTRAINT [FK_Receipt_User];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[Brand]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Brand];
GO
IF OBJECT_ID(N'[dbo].[Category]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Category];
GO
IF OBJECT_ID(N'[dbo].[ImageFile]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ImageFile];
GO
IF OBJECT_ID(N'[dbo].[Product]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Product];
GO
IF OBJECT_ID(N'[dbo].[ProductReview]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ProductReview];
GO
IF OBJECT_ID(N'[dbo].[Receipt]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Receipt];
GO
IF OBJECT_ID(N'[dbo].[Receipt_Product]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Receipt_Product];
GO
IF OBJECT_ID(N'[dbo].[Sport]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Sport];
GO
IF OBJECT_ID(N'[dbo].[User]', 'U') IS NOT NULL
    DROP TABLE [dbo].[User];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Brands'
CREATE TABLE [dbo].[Brands] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(50)  NOT NULL
);
GO

-- Creating table 'Categories'
CREATE TABLE [dbo].[Categories] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(50)  NOT NULL,
    [SportId] int  NOT NULL
);
GO

-- Creating table 'ImageFiles'
CREATE TABLE [dbo].[ImageFiles] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Image] varbinary(max)  NULL,
    [ImageURL] nvarchar(max)  NULL
);
GO

-- Creating table 'ProductReviews'
CREATE TABLE [dbo].[ProductReviews] (
    [UserId] int  NOT NULL,
    [ProductId] int  NOT NULL,
    [CreatedDate] datetime  NOT NULL,
    [ReviewContent] nvarchar(max)  NULL,
    [Rating] int  NOT NULL,
    [Id] int IDENTITY(1,1) NOT NULL
);
GO

-- Creating table 'Receipts'
CREATE TABLE [dbo].[Receipts] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [UserId] int  NULL,
    [CreatedDate] datetime  NULL,
    [Total] int  NOT NULL,
    [Payment] int  NOT NULL
);
GO

-- Creating table 'Receipt_Product'
CREATE TABLE [dbo].[Receipt_Product] (
    [ReceiptId] int  NOT NULL,
    [ProductId] int  NOT NULL,
    [TotalPrice] int  NOT NULL,
    [ProductCount] int  NOT NULL
);
GO

-- Creating table 'Users'
CREATE TABLE [dbo].[Users] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(50)  NOT NULL,
    [Email] nvarchar(50)  NULL,
    [PhoneNumber] nvarchar(10)  NULL,
    [UserType] int  NOT NULL
);
GO

-- Creating table 'Sports'
CREATE TABLE [dbo].[Sports] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'Products'
CREATE TABLE [dbo].[Products] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(50)  NOT NULL,
    [Price] int  NOT NULL,
    [BrandId] int  NOT NULL,
    [ImageId] int  NULL,
    [CategoryId] int  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'Brands'
ALTER TABLE [dbo].[Brands]
ADD CONSTRAINT [PK_Brands]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Categories'
ALTER TABLE [dbo].[Categories]
ADD CONSTRAINT [PK_Categories]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'ImageFiles'
ALTER TABLE [dbo].[ImageFiles]
ADD CONSTRAINT [PK_ImageFiles]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'ProductReviews'
ALTER TABLE [dbo].[ProductReviews]
ADD CONSTRAINT [PK_ProductReviews]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Receipts'
ALTER TABLE [dbo].[Receipts]
ADD CONSTRAINT [PK_Receipts]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [ReceiptId], [ProductId] in table 'Receipt_Product'
ALTER TABLE [dbo].[Receipt_Product]
ADD CONSTRAINT [PK_Receipt_Product]
    PRIMARY KEY CLUSTERED ([ReceiptId], [ProductId] ASC);
GO

-- Creating primary key on [Id] in table 'Users'
ALTER TABLE [dbo].[Users]
ADD CONSTRAINT [PK_Users]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Sports'
ALTER TABLE [dbo].[Sports]
ADD CONSTRAINT [PK_Sports]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Products'
ALTER TABLE [dbo].[Products]
ADD CONSTRAINT [PK_Products]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [UserId] in table 'ProductReviews'
ALTER TABLE [dbo].[ProductReviews]
ADD CONSTRAINT [FK_ProductReview_User]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[Users]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_ProductReview_User'
CREATE INDEX [IX_FK_ProductReview_User]
ON [dbo].[ProductReviews]
    ([UserId]);
GO

-- Creating foreign key on [ReceiptId] in table 'Receipt_Product'
ALTER TABLE [dbo].[Receipt_Product]
ADD CONSTRAINT [FK_Receipt_Product_Receipt]
    FOREIGN KEY ([ReceiptId])
    REFERENCES [dbo].[Receipts]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [UserId] in table 'Receipts'
ALTER TABLE [dbo].[Receipts]
ADD CONSTRAINT [FK_Receipt_User]
    FOREIGN KEY ([UserId])
    REFERENCES [dbo].[Users]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Receipt_User'
CREATE INDEX [IX_FK_Receipt_User]
ON [dbo].[Receipts]
    ([UserId]);
GO

-- Creating foreign key on [SportId] in table 'Categories'
ALTER TABLE [dbo].[Categories]
ADD CONSTRAINT [FK_Category_Sport]
    FOREIGN KEY ([SportId])
    REFERENCES [dbo].[Sports]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Category_Sport'
CREATE INDEX [IX_FK_Category_Sport]
ON [dbo].[Categories]
    ([SportId]);
GO

-- Creating foreign key on [BrandId] in table 'Products'
ALTER TABLE [dbo].[Products]
ADD CONSTRAINT [FK_Product_Brand]
    FOREIGN KEY ([BrandId])
    REFERENCES [dbo].[Brands]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Product_Brand'
CREATE INDEX [IX_FK_Product_Brand]
ON [dbo].[Products]
    ([BrandId]);
GO

-- Creating foreign key on [CategoryId] in table 'Products'
ALTER TABLE [dbo].[Products]
ADD CONSTRAINT [FK_Product_Category]
    FOREIGN KEY ([CategoryId])
    REFERENCES [dbo].[Categories]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Product_Category'
CREATE INDEX [IX_FK_Product_Category]
ON [dbo].[Products]
    ([CategoryId]);
GO

-- Creating foreign key on [ImageId] in table 'Products'
ALTER TABLE [dbo].[Products]
ADD CONSTRAINT [FK_Product_ImageFile]
    FOREIGN KEY ([ImageId])
    REFERENCES [dbo].[ImageFiles]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Product_ImageFile'
CREATE INDEX [IX_FK_Product_ImageFile]
ON [dbo].[Products]
    ([ImageId]);
GO

-- Creating foreign key on [ProductId] in table 'ProductReviews'
ALTER TABLE [dbo].[ProductReviews]
ADD CONSTRAINT [FK_ProductReview_Product]
    FOREIGN KEY ([ProductId])
    REFERENCES [dbo].[Products]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_ProductReview_Product'
CREATE INDEX [IX_FK_ProductReview_Product]
ON [dbo].[ProductReviews]
    ([ProductId]);
GO

-- Creating foreign key on [ProductId] in table 'Receipt_Product'
ALTER TABLE [dbo].[Receipt_Product]
ADD CONSTRAINT [FK_Receipt_Product_Product]
    FOREIGN KEY ([ProductId])
    REFERENCES [dbo].[Products]
        ([Id])
    ON DELETE CASCADE ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Receipt_Product_Product'
CREATE INDEX [IX_FK_Receipt_Product_Product]
ON [dbo].[Receipt_Product]
    ([ProductId]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------