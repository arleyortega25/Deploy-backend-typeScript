[![Deploy Pipeline](https://github.com/arleyortega25/Deploy-backend-typeScript/actions/workflows/pipeline.yml/badge.svg)](https://github.com/arleyortega25/Deploy-backend-typeScript/actions/workflows/pipeline.yml)



# E-Commerce API

This project is a fully featured **E-Commerce REST API** built entirely with **TypeScript** following the **Object-Oriented Programming (OOP)** paradigm.  
It provides a complete set of **CRUD operations** (Create, Read, Update, Delete) for managing different entities within an online store ecosystem.

---

## Features

- **User Management**  
  - Create, update, query, and delete users.  
  - Support for multiple roles:
    - **User Role**: Allows standard users to browse and make purchases.  
    - **Administrator Role**: Grants elevated privileges to delete users, products, categories, and other resources.  

- **Product & Category Management**  
  - Create, update, query, and delete products.  
  - Organize products by categories for better structure and scalability.  

- **Purchases & Customers**  
  - Manage customer records.  
  - Handle purchases and order tracking.  

- **Authentication & Authorization**  
  - Implemented with **Passport.js** and **JSON Web Tokens (JWT)**.  
  - Role-based access control ensures security between customer and administrator functionalities.  

---

## Technical Stack

- **Language & Paradigm**: TypeScript with OOP principles.  
- **Database**: MySQL, containerized with **Docker Compose**.  
- **ORM**: **TypeORM** for object-relational mapping and SQL query handling.  
- **Authentication**: Passport.js and JWT for secure user sessions and role verification.  
- **Testing**: Unit and integration tests written with **Jest** and **Supertest**.  

---

## CI/CD Pipeline

The project includes a complete **CI/CD pipeline** with the following features:  

- **Automated Testing**: Runs Jest and Supertest suites on every push and pull request.  
- **Continuous Deployment**: Deploys automatically to an **AWS EC2 instance**.  
- **Secure Authentication**: Uses **OIDC (OpenID Connect)** for secure GitHub Actions to AWS authentication.  

---

## Summary

This project demonstrates a **scalable, secure, and production-ready API** suitable for e-commerce applications.  
It combines clean architecture, role-based security, automated testing, and a modern CI/CD workflow to ensure reliability and maintainability.  

---
## Commands
```bash
#install all dependencies
npm install

#make migrations
npm run mig:gen

#run migrations
npm run mig:run

#start the database and the project
docker-compose up
```


---
## Documentation

The API comes with documentation generated using Postman, where you can find detailed information about the endpoints, including example requests. You can access the documentation at the following link:
```bash
https://documenter.getpostman.com/view/46826118/2sB3BKDT4c
```


---
## Project AWS URL

You can access the API deployed on AWS through the following URL. It can be tested using Postman, Thunder Client, or any other API testing tool of your choice, guided by the provided documentation.
```bash
http://ec2-3-150-42-103.us-east-2.compute.amazonaws.com
```
