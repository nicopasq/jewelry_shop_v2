# Jewelry Shop: Phase 5 Project
Project Description: The aim for this project was to create an online store for a jewelry shop. It utilizes a Rails API to effectively communicate requests to and from the backend. React.js makes up the frontend and uses complex state management to update how a user's view is rendered.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Features
The project is built with the following features in mind:

1. User Authentication and Authorization - Users can create an account, login, stay logged in after leaving the site, and logout.
2. User registration and login system uses password encryption to ensure password protection.

3. Order_products have full CRUD, a user can only access their own order_products, they are displayed in the bag if the ':in_cart' attribute is true.

4. Orders have full CRUD, a user can only see and change their own orders.
5. A User can see all of the Products that they've ordered in the past, if an Order is cancelled the Products from that Order are removed.
6. Users can go through the checkout process after an item is in the bag.
7. Users do not need to refresh the site to view changes they've made.

## Installation

### Technologies Needed
  - NodeJs
  - NPM
  - Bundler
  - Postgresql (must be running to have a backend API)
  - React.js
  - Ruby on Rails

Install anything that may be missing

Clone this repository and add it to your local machine.
In the app's terminal, run the following
  1. Bundle install
  2. npm install --prefix client
  3. rails db:create
  4. rails db:migrate
  5. rails db:seed

To run Rails and React...
  1. Open two separate terminal windows/tabs
  2. In one window, run rails s to start the rails server
  3. In the other window, run npm start --prefix client 

## Usage
Once the installation process has been completed, users will be able to access the website through their browser at localhost:3000. To use this application, follow these steps:

- If the User has not already signed up, signup otherwise login.

- Upon logging in the User is brought to the Home page, where they can navigate to their Profile, Shop, or Bag, and then return Home.

- A User is meant to browse the Shop and add products to the Bag, products in the Bag are a User's Order_products.

- After adding an Order_product to the bag, a User can increase or decrease the quantity of the Order_product, to remove it completely just use the 'Remove All' button.

- After the User is satisfied with their Order_products, they can continue to checkout where they will be asked to fill out billing and shipping information and then review the Order.

- If the Order is placed, the User is sent to the ThankYou page and then navigated back to Home after 10 seconds.

- After an Order is placed, the User can view the Order in the Profile page. 
- Users can click on an Order and update or delete it.
- Users can also view the products they have ordered in the past. However if an Order is cancelled, the Products are removed with it.
# jewelry_shop_v3
