"use client";

import React, { useState } from 'react';
import styles from '../styles/Homepage.module.css'; 

const Dashboard = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Apple iPhone 13', price: 999, stock: 50 },
    { id: 2, name: 'Samsung Galaxy S21', price: 799, stock: 30 },
    { id: 3, name: 'Google Pixel 6', price: 599, stock: 20 },
    { id: 4, name: 'Sony WH-1000XM4', price: 349, stock: 40 },
    { id: 5, name: 'Dell XPS 13', price: 1099, stock: 15 },
    { id: 6, name: 'MacBook Pro 14"', price: 1999, stock: 10 },
    { id: 7, name: 'iPad Air', price: 599, stock: 25 },
    { id: 8, name: 'Samsung Galaxy Tab S7', price: 649, stock: 12 },
    { id: 9, name: 'Amazon Echo Dot', price: 49, stock: 100 },
    { id: 10, name: 'Fitbit Charge 5', price: 149, stock: 75 },
  ]);

  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState('name'); 
  const [sortOrder, setSortOrder] = useState('asc'); 
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock: '',
  });

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleSort = (e) => {
    const [field, order] = e.target.value.split('-');
    setSortField(field);
    setSortOrder(order);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price && newProduct.stock) {
      const newId = products.length ? products[products.length - 1].id + 1 : 1; // Generate new ID
      const productToAdd = {
        id: newId,
        name: newProduct.name,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
      };
      setProducts([...products, productToAdd]);
      setNewProduct({ name: '', price: '', stock: '' }); // Reset form fields
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const isAsc = sortOrder === 'asc';
    if (sortField === 'name') {
      return isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortField === 'price') {
      return isAsc ? a.price - b.price : b.price - a.price;
    } else if (sortField === 'stock') {
      return isAsc ? a.stock - b.stock : b.stock - a.stock;
    }
    return 0;
  });

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Dashboard Menu</h2>
        <ul className={styles.menuItems}>
          <li>Product List</li>
          <li>Add Product</li>
          <li>Orders</li>
          <li>Customers</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
      </aside>
      <main className={styles.mainContent}>
        <h1 className={styles.heading}>Product Dashboard</h1>
        <div className={styles.filterContainer}>
          <input
            type="text"
            placeholder="Filter by name"
            className={styles.inputBox}
            onChange={handleFilter}
          />
          <select className={styles.selectBox} onChange={handleSort}>
            <option value="name-asc">Sort by Name (A-Z)</option>
            <option value="name-desc">Sort by Name (Z-A)</option>
            <option value="price-asc">Sort by Price (Low to High)</option>
            <option value="price-desc">Sort by Price (High to Low)</option>
            <option value="stock-asc">Sort by Stock (Low to High)</option>
            <option value="stock-desc">Sort by Stock (High to Low)</option>
          </select>
        </div>
        <div className={styles.productList}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.formContainer}>
          <h2>Add New Product</h2>
          <form onSubmit={handleAddProduct}>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              placeholder="Product Name"
              className={styles.inputBox}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="price"
              value={newProduct.price}
              placeholder="Price"
              className={styles.inputBox}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="stock"
              value={newProduct.stock}
              placeholder="Stock Quantity"
              className={styles.inputBox}
              onChange={handleInputChange}
            />
            <button type="submit" className={styles.addButton}>Add Product</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
