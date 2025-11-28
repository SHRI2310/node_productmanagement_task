# Given Task;

# Assignment: Node.is + Express + MongoDB + Postman User Panel + Admin Panel Admin Login - Product added User Login -> Product Selection -> Order Management System With Mandatory Validations+ SCHEMA Requirements

# Objective
Build a backend system that supports:
Admin Panel
‣ Admin login V Admin can add new products v Admin can update product stock v Admin can view all orders
User Panel
v User login & registration V User can view products ‣ User can place orders User can view only their orders
All data stored in MongoDB, and tested using Postman.



## Features
- User registration & login (JWT)
- Admin (role-based) — create/update products, view all orders,
- Products: list, filter, pagination
- Orders: place order (atomic, transaction), view your orders
- Input validation, sanitization, security middlewares

## Quick start (local)
1. Copy files into project folder
2. Create `.env` set `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
3. Start MongoDB locally (e.g., `mongod --dbpath ~/data/db` or use MongoDB Compass)=> I have used mongodb Compass for managing the DB
4. 
5. Install & run:
   npm install
   npm run dev
