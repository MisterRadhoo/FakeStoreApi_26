# FakeStoreApi_26

#### Description
**The APP named FakeStoreApi is an e-commerce REST API application designed to support both mock data and real data for use in shopping websites.**

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
**Note: The .env file will be uploaded with the project, for less hassle when starting the application.**

---
#### API Authentication

**Certain endpoints are private routes, authentication is required.Depending on the user role, access on various CRUD operations is granted via token/cookieToken**
- **Step 1.** Registered user, they just need to login to obtain token/cookieToken for access.
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
  - [Get list of Products by Category](#get-list-of-products-by-category)
  - [Get Product slug](#get-product-slug)
  - [Search Products by filters](#search-products-by-filters)
  - [Product schema](#product-schema)
- [Review](#review)
  - [Create Review](#create-review)
  - [Get specific Review](#get-specific-review)
  - [Update specific Review](#update-specific-review)
  - [Delete specific Review](#delete-specific-review)
  - [Get all reviews](#get-all-reviews)
  - [Get list of Reviews on specific Product](#get-list-of-reviews-on-specific-product)
  - [Review Schema](#review-schema)

  <!--te-->

---
 # Authentication
  
  Auth Routes:

  | @Route             | @Type | @access | @description                    |
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
- **User** can login by sending an object like the following to the URL below:

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

| @Routes                                   | @Types  | @access       | @description                           |
|-------------------------------------------|---------|---------------|----------------------------------------|
| /api/products                             | POST    | Private/Admin | Create Product                         |
| /api/products/:id                         | PATCH   | Private/Admin | Update specific Product                |
| /api/products/:id                         | DELETE  | Private/Admin | Delete specific Product                |
| /api/products/:id                         | GET     | Public        | Get specific Product                   |
| /api/products                             | GET     | Public        | Get all Products                       |
| /api/products/related/:productId          | GET     | Public        | Get related Products                   |
| /api/categories/:categoryId/products/list | GET     | Public        | Get list of Products by Category       |
| /api/products/slug/:slug                  | GET     | Public        | Get Product slug                       |
| /api/products/search                      | POST    | Public        | Search Products by filters             |

## Create Product
- **Create** a new product by sending an object like the following to the URL below:

```bash
[POST] http://localhost:7800/api/products
```

```json
{
   "title": "Nike SB Dunk Low x Heineken",
   "price": 1560.77,
   "stock": 8,
   "description": "Probably the best collaboration in the world between Nike and beer producer Heineken.",
   "categoryId": "6980755adb563b32c2d55fb6",
   "subcategoriesIds": ["699b7838fbe26d029d8a7706"],
   "brandId": "69a320dcccd444547f8a0ea4",
   "imageCover": "https://www.diversesolesb.com/nike-sb-dunk-low-heineken-69533993.html",
   "colors": ["Classic Green", "White", "Red", "Black"]
}
```

<details><summary><b>Output</b></summary>
<br/>

```javascript
{
  "message": "Document Product has been created!",
  "data": {
    "title": "Nike SB Dunk Low x Heineken",
    "slug": "nike-sb-dunk-low-x-heineken",
    "price": 1560.77,
    "currency": "USD",
    "stock": 8,
    "description": "Probably the best collaboration in the world between Nike and beer producer Heineken.",
    "categoryId": "6980755adb563b32c2d55fb6",
    "subcategoriesIds": [
      "699b7838fbe26d029d8a7706"
    ],
    "brandId": "69a320dcccd444547f8a0ea4",
    "imageCover": "https://www.diversesolesb.com/nike-sb-dunk-low-heineken-69533993.html",
    "images": [],
    "colors": [
      "Classic Green",
      "White",
      "Red",
      "Black"
    ],
    "sold": 0,
    "ratingsQuantity": 0,
    "_id": "69c41c6201c423c5513c8a57",
    "createdAt": "2026-03-25T17:33:22.920Z",
    "updatedAt": "2026-03-25T17:33:22.920Z",
    "__v": 0,
    "id": "69c41c6201c423c5513c8a57"
  }
}
```

</details>

## Update specific Product
- **Update** specific product that exists by sending an object like the following and adding the `id` as a parameter to the URL below:

```bash
[PATCH] http://localhost:7800/api/products/69c41c6201c423c5513c8a57
```

```json
{
   "title": "Nike SB Dunk Low x Heineken",
   "price": 3560.77,
   "stock": 12,
   "description": "Probably the best collaboration in the world between Nike and beer producer Heineken.",
   "categoryId": "6980755adb563b32c2d55fb6",
   "subcategoriesIds": ["699b7838fbe26d029d8a7706"],
   "brandId": "69a320dcccd444547f8a0ea4",
   "imageCover": "https://www.highsnobiety.com/p/nike-sb-dunk-low-heineken-2-0/",
   "colors": ["Classic Green", "White", "Red", "Black"]
}
```

<details><summary><b>Output</b></summary>
<br/>

```javascript
{
  "message": "Document Product has been updated successfully!",
  "data": {
    "_id": "69c41c6201c423c5513c8a57",
    "title": "Nike SB Dunk Low x Heineken",
    "slug": "nike-sb-dunk-low-x-heineken",
    "price": 3560.77,
    "currency": "USD",
    "stock": 12,
    "description": "Probably the best collaboration in the world between Nike and beer producer Heineken.",
    "categoryId": {
      "_id": "6980755adb563b32c2d55fb6",
      "name": "Sneakers"
    },
    "subcategoriesIds": [
      {
        "_id": "699b7838fbe26d029d8a7706",
        "name": "Sneakers Low Man"
      }
    ],
    "brandId": {
      "_id": "69a320dcccd444547f8a0ea4",
      "name": "Nike SB",
      "description": "Just Do It"
    },
    "imageCover": "https://www.highsnobiety.com/p/nike-sb-dunk-low-heineken-2-0/",
    "images": [],
    "colors": [
      "Classic Green",
      "White",
      "Red",
      "Black"
    ],
    "sold": 0,
    "ratingsQuantity": 0,
    "createdAt": "2026-03-25T17:33:22.920Z",
    "updatedAt": "2026-03-25T17:59:30.724Z",
    "__v": 0,
    "id": "69c41c6201c423c5513c8a57"
  }
}
```

</details>

## Delete specific Product
- **Delete** specific product that exists by adding the `id` as a parameter to the URL below:

```bash
[DELETE] http://localhost:7800/api/products/69c41c6201c423c5513c8a57
```

<details><summary><b>Output</b></summary>
<br/>

```javascript
{
  "message": "Document Product has been deleted successfully!",
  "data": {
    "_id": "69c41c6201c423c5513c8a57",
    "title": "Nike SB Dunk Low x Heineken",
    "slug": "nike-sb-dunk-low-x-heineken",
    "price": 3560.77,
    "currency": "USD",
    "stock": 12,
    "description": "Probably the best collaboration in the world between Nike and beer producer Heineken.",
    //...
  }
}
```

</details>

## Get specific Product
- **Get** specific product that exists by adding `id` as a parameter to the URL below:

```bash
[GET] http://localhost:7800/api/products/69bec9b294bc0c4efd74869a
```

<details><summary><b>Output</b></summary>
<br/>

```javascript
{
  "message": "Query document Product retrieved!",
  "data": {
    "_id": "69bec9b294bc0c4efd74869a",
    "title": "Nike SB Dunk Low Asparagus",
    "slug": "nike-sb-dunk-low-asparagus",
    "price": 2649.99,
    "currency": "USD",
    "stock": 3,
    "description": "Starul in ascensiune al skateboarding-ului Yuto Horigome continua sa-si lase amprenta asupra modei, streetwear, odată cu lansarea celui de-al 2-lea Nike SB Dunk Low, numit Asparagus.",
    "categoryId": {
      "_id": "6980755adb563b32c2d55fb6",
      "name": "Sneakers"
    },
    "subcategoriesIds": [
      {
        "_id": "699b7838fbe26d029d8a7706",
        "name": "Sneakers Low Man"
      }
    ],
    "brandId": {
      "_id": "69a320dcccd444547f8a0ea4",
      "name": "Nike SB",
      "description": "Just Do It"
    },
    "imageCover": "http://localhost:7800/static/img/Yuto-Horigome-Nike-SB-Dunk-Low.png",
    "images": [],
    "colors": [
      "Asparagus",
      "Legion Green",
      "Light Khaki",
      "Dark Loden",
      "Sesame",
      "Burnt Sienna"
    ],
    "sold": 0,
    "ratingsAverage": 4.9,
    "ratingsQuantity": 22,
    "createdAt": "2026-03-21T16:39:14.642Z",
    "updatedAt": "2026-03-21T16:39:14.642Z",
    "__v": 0,
    "reviews": [],
    "id": "69bec9b294bc0c4efd74869a"
  }
}
```
</details>

## Get all Products
- **Get** all products from the database by using URL below:

```bash
[GET] http://localhost:7800/api/products?limit=3&page=2&sortedBy=-stock
```

<details><summary><b>Output</b></summary>
<br/>

```javascript
{
  "result": 3,
  "paginationResult": {
    "currentPage": 2,
    "limit": 3,
    "numberOfPages": 6,
    "totalResult": 16,
    "nextPage": 3,
    "prevPage": 1
  },
  "data": [
    {
      "_id": "69bec9b294bc0c4efd748695",
      "title": "Nike SB Dunk Low Chicago J-pack",
      "slug": "nike-sb-dunk-low-chicago-j-pack",
      "price": 3620.99,
      "currency": "USD",
      "stock": 19,
      "description": "Celebrul pattern al echipei de baschet Chicago Bulls, disponibil acum si pe un model de skateboarding.",
      "categoryId": {
        "_id": "6980755adb563b32c2d55fb6",
        "name": "Sneakers"
      },
      "subcategoriesIds": [
        {
          "_id": "699b7838fbe26d029d8a7706",
          "name": "Sneakers Low Man"
        }
      ],
      "brandId": {
        "_id": "69a320dcccd444547f8a0ea4",
        "name": "Nike SB",
        "description": "Just Do It"
      },
      "imageCover": "http://localhost:7800/static/img/nike-sb-dunk-low-chicago.png",
      "colors": [
        "University Red",
        "Black",
        "White"
      ],
      "sold": 10,
      "ratingsAverage": 4.9,
      "ratingsQuantity": 37,
      "createdAt": "2026-03-21T16:39:14.642Z",
      "updatedAt": "2026-03-22T15:29:29.696Z",
      "id": "69bec9b294bc0c4efd748695"
    },
    {
      "_id": "69bec9b294bc0c4efd74869c",
      "title": "Air Jordan 1 Low OG Floral Swoosh",
      "slug": "air-jordan-1-low-og-floral-swoosh",
      "price": 249.99,
      "currency": "USD",
      "stock": 17,
      //...
    },
    // Additional products may be returned...
  ]
}
```

</details>

## Get related Products
- **Get** related products by adding `productId` as a parameter to the URL below:
- **This route is a custom product base, that uses `productId` as a parameter.** 

```bash
[GET] http://localhost:7800/api/products/related/69bec9b294bc0c4efd74869a
```

<details><summary><b>Output</b></summary>
<br/>

```javascript
{
  "object": "related_products_list",
  "limit": 12,
  "page": 1,
  "sort": "-createdAt",
  "count": 12,
  "products": [
    {
      "_id": "69bec9b294bc0c4efd748693",
      "title": "Nike SB Dunk Low x Hayley-Wilson",
      "slug": "nike-sb-dunk-low-x-hayley-wilson",
      "price": 1789.88,
      "currency": "USD",
      "stock": 9,
      "description": "Modelul Hayley Dunks prezinta un fir reactiv la UV care isi schimba culoarea la soare in jurul swoosh-ului.",
      "categoryId": {
        "_id": "6980755adb563b32c2d55fb6",
        "name": "Sneakers"
      },
      //..
    },
    // Additional products may be returned...
  ]
}
```
</details>

## Get list of Products by Category
- **Get** list of products for a specific Category, by adding `categoryId `as a parameter to the URL below:

```bash
[GET] http://localhost:7800/api/categories/699770f0a04e80c6606e6088/products/list
```

<details><summary><b>Output</b></summary>
<br/>

```javascript
{
  "object": "product_list_by_same_category",
  "limit": 14,
  "page": 1,
  "sort": "-price",
  "count": 2,
  "products": [
    {
      "_id": "69bec9b294bc0c4efd74869f",
      "title": "Nike Everyday Socks 6 Pack",
      "slug": "nike-everyday-socks-6-pack",
      "price": 30,
      "currency": "USD",
      "stock": 49,
      "description": "The Nike Everyday Socks blend sweat-wicking technology with breathable fabric to help keep your foot dry and cool.",
      "categoryId": {
        "_id": "699770f0a04e80c6606e6088",
        "name": "Accessories"
      },
      "subcategoriesIds": [],
      "brandId": {
        "_id": "69be7af76f6540230bd94474",
        "name": "Nike",
        "description": "Just Do It"
      },
      "imageCover": "http://localhost:7800/static/img/nike-socks-6pack.png",
      "images": [],
      "colors": [
        "Mint Foam",
        "Baroque Brown",
        "Rose Gold",
        "Washed Coral",
        "White"
      ],
      "sold": 4,
      "ratingsAverage": 4.84,
      "ratingsQuantity": 3,
      "createdAt": "2026-03-21T16:39:14.642Z",
      "updatedAt": "2026-03-21T16:39:14.642Z",
      "__v": 0,
      "id": "69bec9b294bc0c4efd74869f"
    },
    {
      "_id": "69bec9b294bc0c4efd74869e",
      "title": "Nike Everyday Socks 3 Pack",
      "slug": "nike-everyday-socks-3-pack",
      "price": 20.99,
      "currency": "USD",
      "stock": 99,
      "description": "The Nike Everyday Socks blend sweat-wicking technology with breathable fabric to help keep your foot dry and cool.",
      "categoryId": {
        "_id": "699770f0a04e80c6606e6088",
        "name": "Accessories"
      },
      "subcategoriesIds": [],
      "brandId": {
        "_id": "69be7af76f6540230bd94474",
        "name": "Nike",
        "description": "Just Do It"
      },
      "imageCover": "http://localhost:7800/static/img/nike-socks-3pack.png",
      "images": [],
      "colors": [
        "White"
      ],
      "sold": 46,
      "ratingsAverage": 4.44,
      "ratingsQuantity": 26,
      "createdAt": "2026-03-21T16:39:14.642Z",
      "updatedAt": "2026-03-21T16:39:14.642Z",
      "__v": 0,
      "id": "69bec9b294bc0c4efd74869e"
    }
  ]
}
```

</details>

## Get Product slug
- **Get** product slug by adding `slug` as a parameter to the URL below:

```bash
[GET] http://localhost:7800/api/products/slug/nike-sb-dunk-low-asparagus
```

<details><summary><b>Output</b></summary>
<br/>

```javascript
{
  "object": "slug",
  "product": {
    "_id": "69bec9b294bc0c4efd74869a",
    "title": "Nike SB Dunk Low Asparagus",
    "slug": "nike-sb-dunk-low-asparagus",
    "price": 2649.99,
    "currency": "USD",
    "stock": 3,
    "description": "Starul in ascensiune al skateboarding-ului Yuto Horigome continua sa-si lase amprenta asupra modei, streetwear, odată cu lansarea celui de-al 2-lea Nike SB Dunk Low, numit Asparagus.",
    "categoryId": {
      "_id": "6980755adb563b32c2d55fb6",
      "name": "Sneakers"
    },
    "subcategoriesIds": [
      {
        "_id": "699b7838fbe26d029d8a7706",
        "name": "Sneakers Low Man"
      }
    ],
    "brandId": {
      "_id": "69a320dcccd444547f8a0ea4",
      "name": "Nike SB",
      "description": "Just Do It"
    },
    "imageCover": "http://localhost:7800/static/img/Yuto-Horigome-Nike-SB-Dunk-Low.png",
    "images": [],
    "colors": [
      "Asparagus",
      "Legion Green",
      "Light Khaki",
      "Dark Loden",
      "Sesame",
      "Burnt Sienna"
    ],
    "sold": 0,
    "ratingsAverage": 4.89,
    "ratingsQuantity": 2,
    "createdAt": "2026-03-21T16:39:14.642Z",
    "updatedAt": "2026-03-25T22:01:14.731Z",
    "__v": 0,
    "id": "69bec9b294bc0c4efd74869a"
  }
}
```

</details>


## Search Products by filters
- **Search** products using filter options by sending an object like the following to the URL below:

```bash
[POST] http://localhost:7800/api/products/search
```

```json
{
   "order": "asc",
   "limit": 15,
   "sortBy": "price",
   "skip": 0,
   "filters": {
     "price": [20, 1000]
   }
}
```

<details><summary><b>Output</b></summary>
<br/>

```javascript
{
  "size": 7,
  "data": [
    {
      "_id": "69bec9b294bc0c4efd74869e",
      "title": "Nike Everyday Socks 3 Pack",
      "slug": "nike-everyday-socks-3-pack",
      "price": 20.99,
      "currency": "USD",
      "stock": 99,
      "description": "The Nike Everyday Socks blend sweat-wicking technology with breathable fabric to help keep your foot dry and cool.",
      "categoryId": {
        "_id": "699770f0a04e80c6606e6088",
        "name": "Accessories"
      },
      "subcategoriesIds": [],
      "brandId": {
        "_id": "69be7af76f6540230bd94474",
        "name": "Nike",
        "description": "Just Do It"
      },
      "imageCover": "http://localhost:7800/static/img/nike-socks-3pack.png",
      "images": [],
      "colors": [
        "White"
      ],
      "sold": 46,
      "ratingsAverage": 4.44,
      "ratingsQuantity": 26,
      "createdAt": "2026-03-21T16:39:14.642Z",
      "updatedAt": "2026-03-21T16:39:14.642Z",
      "__v": 0,
      "id": "69bec9b294bc0c4efd74869e"
    },
    {
      "_id": "69bec9b294bc0c4efd74869f",
      "title": "Nike Everyday Socks 6 Pack",
      "slug": "nike-everyday-socks-6-pack",
      "price": 30,
      //...
    },
    // Additional products may be returned...
  ]
}
      
```

</details>

## Product Schema

| Attribute        | Type       |
|------------------|------------|
| title            | String     |
| slug             | String     |
| price            | Number     |
| currency         | String     |
| stock            | Number     |
| description      | String     |
| categoryId       | ObjectId   |
| subcategoriesIds | [ObjectId] |
| brandId          | ObjectId   |
| imageCover       | String     |
| images           | [String]   |
| colors           | [String]   |
| sold             | Number     |
| ratingsAverage   | Number     |
| ratingsQuantity  | Number     |

---
# Review

Review Routes:

| @Route                                  | @Type  | @access             | @description                   |
|-----------------------------------------|--------|---------------------|--------------------------------|
| /api/reviews                            | POST   | Private/User        | Create Review                  |
| /api/reviews/:id                        | GET    | Public              | Get specific Review            |
| /api/reviews/:id                        | PUT    | Private/User        | Update specific Review         |
| /api/reviews/:id                        | DELETE | Private/User/Admin  | Delete specific Review         |
| /api/reviews                            | GET    | Public              | Get all Reviews                |
| /api/products/:productsId/reviews/list  | GET    | Public              | Get list of reviews on specific Product |


## Get list of Reviews on specific Product
- **Get** list of Reviews on specific product by adding `productId` as a parameter to the URL below:
- **The reviews route is implemented as a nested route.**

```bash
[GET] http://localhost:7800/api/products/69bec9b294bc0c4efd74869a/reviews/list
```

<details><summary><b>Output</b></summary>
<br/>

```javascript
{
  "object": "reviews_list",
  "limit": 12,
  "page": 1,
  "sort": "-createdAt",
  "count": 2,
  "list": [
    {
      "_id": "69c45b2a404f10549f271eb5",
      "title": "colors are indeed marvelous!",
      "ratings": 4.8,
      "userId": {
        "_id": "69bec9b294bc0c4efd74868d",
        "userName": "Ana_rose"
      },
      "productId": "69bec9b294bc0c4efd74869a",
      "createdAt": "2026-03-25T22:01:14.719Z",
      "updatedAt": "2026-03-25T22:01:14.719Z",
      "__v": 0
    },
    {
      "_id": "69c459d4404f10549f271e9f",
      "title": "Nice ones, they are fire!",
      "ratings": 4.98,
      "userId": {
        "_id": "69c3f4dcb178bfb403a5ac69",
        "userName": "radu"
      },
      "productId": "69bec9b294bc0c4efd74869a",
      "createdAt": "2026-03-25T21:55:32.359Z",
      "updatedAt": "2026-03-25T21:55:32.359Z",
      "__v": 0
    }
  ]
}
```

</details>


 






