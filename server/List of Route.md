## List of User Route:

| Route               | HTTP | Header(s) | Body                                                         | Description            |      |
| :------------------ | ---- | --------- | ------------------------------------------------------------ | ---------------------- | ---- |
| /users/register     | post | none      | name:String (Required), email:String(Required), password:String(Required) | Create a user          |      |
| /user/registerAdmin | post | none      | name:String (Required), email:String(Required), password:String(Required) | Create a user as admin |      |
| /user/login         | post | none      | email:String(Required), password:String(Required)            | User Login             |      |



## List of Product Route:

| Route      | HTTP   | Header(s) | Body                                                         | Description                    |      |
| :--------- | ------ | --------- | ------------------------------------------------------------ | ------------------------------ | ---- |
| /items     | get    | none      | none                                                         | Get all product                |      |
| /items/:id | get    | none      | none                                                         | Get a single product           |      |
| /items     | post   | token     | name:String (Required), description:String(Required), price:Integer(Required) | Create a new product           |      |
| /items/:id | delete | token     | none                                                         | Delete a product               |      |
| /items/:id | put    | token     | name:String (Required), description:String(Required), price:Integer(Required) | Update a product with new info |      |



## List of Filter Route:

| Route                   | HTTP | Description         |
| ----------------------- | ---- | ------------------- |
| /users?name=<keyword>   | get  | Get user by name    |
| /product?name=<keyword> | get  | Get product by name |



## List of Cart:

| Route     | HTTP | Header(s) | Body       | Description              |
| --------- | ---- | --------- | ---------- | ------------------------ |
| /cart     | post | token     | id:Integer | Add product to user cart |
| /cart/:id | post | token     | none       | Delete product from cart |
| /checkout | post | token     | none       | Checkout payment         |