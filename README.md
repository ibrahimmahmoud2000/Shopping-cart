# E-Commerce Application

This project is a simple e-commerce web application built using **HTML**, **CSS**, and **JavaScript**. It includes the following key features:

## Features

### 1. Login and Logout Pages
- **Login Page**:
  - Input fields for email and password.
  - User authentication is stored in Local Storage to persist login status across page reloads or revisits.
- **Logout Page**:
  - A welcome message displayed for the user.
  - A logout button that clears the user's session and redirects them to the login page.

### 2. Home Page
- Displays a collection of products with the following details:
  - Name
  - Image
  - Description
  - Price
- Each product includes an **"Add to Cart"** button.

### 3. Shopping Cart Page
- Displays all products added to the cart.
- Features include:
  - **Dynamic updates**: The cart updates in real-time as products are added or removed.
  - **Total price calculation**: Displays the total price of the products in the cart.
- Cart data is saved in Local Storage to ensure persistence across page reloads.

### 4. User Restrictions
- Users cannot access the home or shopping cart pages without logging in.
- Redirection to the login page occurs for unauthorized access attempts.

## Technologies Used
- **HTML**: For structuring the web pages.
- **CSS / Tailwind CSS / Bootstrap**: For styling and responsiveness.
- **JavaScript**: For handling dynamic functionalities like user authentication and cart management.
- **Local Storage**: For saving user data and cart details.


2. Open the project folder.
3. Launch the `index.html` file in your preferred browser.

## How It Works

### Login Page
1. The user enters their email and password.
2. On successful login, their details are stored in Local Storage, and they are redirected to the home page.

### Home Page
1. Displays a collection of products.
2. The user can add products to the cart by clicking the "Add to Cart" button.
3. Cart data is saved in Local Storage.

### Shopping Cart Page
1. Displays all products added to the cart along with their details and total price.
2. Allows users to remove items from the cart.
3. Updates the cart dynamically.

### Logout Page
1. Displays a welcome message.
2. Provides a logout button to clear the user's session and redirect them to the login page.

## Key Considerations
- **Persistence**: User login status and cart data persist through Local Storage.
- **User Experience**: The interface is designed to be intuitive and visually appealing.
- **Responsiveness**: The application is styled using Tailwind CSS or Bootstrap for compatibility across devices.



