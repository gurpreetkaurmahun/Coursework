Ecommerce Backend Service


Overview
This project is an ecommerce backend service developed using ASP.NET Core, providing a robust foundation for building and managing various functionalities of an online store.
It offers features such as product management, cart handling, order processing,Category management, customer management and authentication.



Technologies Used:
• ASP.NET Core: A cross-platform framework for building web applications and services using C#.

• Entity Framework Core: An Object-Relational Mapping (ORM) framework for .NET, used for
  database access.
  
• ASP.NET Core Identity: Provides user authentication and authorization capabilities.

• JWT Authentication: JSON Web Token (JWT) authentication for securing APIs.

• SOLite: A lightweight database engine used for data storage in development.

• C# Programming Language: The primary language used for development.



API Documentation:
 After running the application, navigate to
"https://localhost:5299/swagger" to explore and test the available endpoints.



Usage: On Postman
• Product Management: CRUD-Add, remove, update and Delete products.
    • API endpoint: 'https://localhost:5299/api/Product'
    
• Cart Management: CRUD-Add, remove, update and Delete orders in Cart.
  • API endpoint: 'https://localhost:5299/api/Cart'
  
• Order Management: CRUD-Add, remove, update and Delete items.
  • API endpoint: 'https://localhost:5299/api/Order
  
• Customer Management: CRUD-Add, remove, update and Delete Customer Information.
  • API endpoint: https://localhost:5299/api/Customer
  
• OrderProduct Management: CRUD-Add, remove, update and Delete Order Products.
  • API endpoint: https://localhost:5299/api/OrderProduct
  
• Category Management: CRUD-Add, remove, update and Delete Categories.
  • API endpoint: https://localhost:5299/api/Category

• Roles Management: Assign, Delete and CHeck roles.
  • API endpoint: https://localhost:5299/api/Roles
  
• Account Management: Login, logout, verify email, register user and generate JWT token.
  • API endpoint: https://localhost:5299/api/Account

Frontend: The frontend, developed using React, ReactDOM, AOS (Animate On Scroll) from React, and Bootstrap, provides a user-friendly interface for interacting with the ecommerce platform.

Browser Routes
In the frontend of the ecommerce platform, browser routes are defined using React Router, a powerful routing library for React applications. These routes map specific URL paths to corresponding React components, allowing for dynamic content rendering based on the current URL.

• Home: Route '/' - Renders the Home component, displaying the homepage of the ecommerce platform.
• About: Route '/About' - Renders the About component, providing information about the ecommerce platform
• Login: Route '/Login' - Renders the LogRegForm component, allowing users to log in to their accounts or register for a new account if they don't have one already.
• New Arrivals: Route '/NewArrivals' - Renders the AllProducts component, displaying a list of new arrivals or recently added products in the store. 
• All Products: Route '/product' - Renders the AllProducts component, showing a comprehensive list of all available products in the store
• Single Product: Route '/Product/:id' - Renders the SingleProduct component, displaying detailed information about a specific product identified by its unique ID.

Authors:
Gurpreet Kaur Mahun

Acknowledgements:
• Microsoft for providing the ASP.NET Core framework and related tools.
• University Lectures in Web Development and Stack Overflow contributions and support.

Azure Link: 
https://web-dev-2024.azurewebsites.net/Test 
•/Test is for testing that it works

https://web-dev-2024.azurewebsites.net/weatherforecast
•/weatherforecast is for testing that it works


