# FakeStoreApi_26

#### E-commerce application
**FakeStoreApi is an e-commerce REST API application designed to support both mock data and real data for use in shopping websites.**

---
### The features in the API:
 **loading...**
---
<!--ts-->

## How to install/use

#### 1.Clone the repository

```bash

git clone https://github.com/MisterRadhoo/FakeStoreApi_26.git

```

#### 2.Go to the project directory

```bash

cd backend

```

#### 3.Install dependencies

```bash

npm install

```

#### 4.Use mockData for testing purposes (Optional)

```bash

  node src/mockData/seeder.js -i

```
**or**

```bash

node src/mockData/seeder.js -d 

```

#### 5.Start server (CLI)

```bash

 nodemon src/index.js

````

**or**

```bash

npm run dev

```
#### Enviroment Variable
**Note: .env file will be upload with the project, for less hassle when starting the application, it is not recommended.**

---
#### API Authentication

**Certain endpoints are private routes,authentication is required.Depending on the user role,they gain access on various CRUD operations via token/cookieToken**
- **Step 1.** Registered user, they just need to log in to obtain token/cookieToken for access.
- **Step 2.** Unregistered user, they need to register first, then login into new account to obtain token/cookieToken for access.

#### Auth examples:

```md
 Authorization: Bearer <your_token> 
 Cookie: cookieToken=<your_token>
```
---

#### Endpoints

- [Authentication](#authentication)
  - [Register](#register)
  - [Login](#login)
  - [Logout](#logout)
- [Products](#products)
  - [Create Product](#create-product)
  - [Get specific Product](#get-specific-product)
  - [Update specific Product](#update-specific-product)
  - [Delete specific Product](#delete-specific-product)
  - [Get all Products](#get-all-products)
  - [Get related Products](#get-related-products)
  - [Get all Reviews on specific Product](#get-all-reviews-on-specific-product)
  - [Get Product slug](#get-product-slug)
  - [Search Products by filters](#search-products-by-filters)
  - [Product schema](#product-schema)

  <!--te-->

---
 # Authentication
  
  Auth Routes:

  | @Route             | @Type | @access | @desc                           |
  |--------------------|-------|---------|---------------------------------|
  | /api/auth/register | POST  | Public  | Create a new User in db         |
  | /api/auth/login    | POST  | Public  | Authenticate the current User   |
  | /api/auth/logout   | POST  | Public  | Logout the current User         |

  ## Register
  - **User** can register by sending an object like the following to the URL below:

  ```bash
 [POST] http://localhost:7800/api/auth/register
  ```

```json
{
  "userName": "radu",
  "email": "radu@email.com",
  "password": "forzarapid",
  "confirmPassword": "forzarapid",
  "fullName": "Craciun Radu"
}
```

<details><summary><b>Output</b></summary>
<br/>

```javascript
{
  "status": "Registered successfully!",
  "data": {
    "id": "69c3f4dcb178bfb403a5ac69",
    "userName": "radu",
    "email": "radu@email.com",
    "fullName": "Craciun Radu",
    "role": "user",
    "isActive": true,
    "wishlist": [],
    "addresses": [],
    "createdAt": "2026-03-25T14:44:44.998Z",
    "updatedAt": "2026-03-25T14:44:44.998Z"
  }
}
```

</details>

## Login
- **User** can login sending an object like the following to the URL below:

 ```bash
 [POST] http://localhost:7800/api/auth/login
  ```

```json
{
  "email": "radu@email.com",
  "password": "forzarapid"
}
```

<details><summary><b>Output</b></summary>
<br/>

```javascript
{
  "status": "Welcome back, radu!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OWMzZjRkY2IxNzhiZmI0MDNhNWFjNjkiLCJpYXQiOjE3NzQ0NTAzMjIsImV4cCI6MTc3NTY1OTkyMn0.idUlKlhZc2FVNMNJE3BQVhm7LjL38cTEQh0RGOBH-Cw",
  "data": {
    "id": "69c3f4dcb178bfb403a5ac69",
    "userName": "radu",
    "email": "radu@email.com",
    "fullName": "Craciun Radu",
    "role": "user",
    "isActive": true,
    "wishlist": [],
    "addresses": [],
    "createdAt": "2026-03-25T14:44:44.998Z",
    "updatedAt": "2026-03-25T14:44:44.998Z"
  }
}
```

</details>

## Logout
- **User** can logout from account using the following URL below:

```bash
[POST] http://localhost:7800/api/auth/logout
```

<details><summary><b>Output</b></summary>
<br/>

```javascript
{
  "status": "Logged out successfully!" 
}
```

</details>


# Products
---

Product Routes:

| @Routes                               | @Types  | @access       | @desc                                  |
|---------------------------------------|---------|---------------|----------------------------------------|
| /api/products                         | POST    | Private/Admin | Create Product                         |
| /api/products/:id                     | PATCH   | Private/Admin | Update specific Product                |
| /api/products/:id                     | DELETE  | Private/Admin | Delete specific Product                |
| /api/products/:id                     | GET     | Public        | Get specific Product                   |
| /api/products                         | GET     | Public        | Get all Products                       |
| /api/products/related/:productId      | GET     | Public        | Get related Products                   |
| /api/products/:productId/reviews/list | GET     | Public        | Get all Reviews on specific Product    |
| /api/products/slug/:slug              | GET     | Public        | Get Product slug                       |
| /api/products/search                  | POST    | Public        | Search Products by filters             |

## Create Product








 






