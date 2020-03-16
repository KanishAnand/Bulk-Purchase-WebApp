# Bulk-Purchase-WebApp

## About

-   Web application based on MERN stack - MongoDB, Express.js, React.js, and Node.js.
-   The app will has an option for sellers to host their products along with the minimum bulk dispatch quantity, upload images of the product, cancel or dispatch products.
-   Customers can select from the listed products or search desired products and order them with their own required quantity.
-   Webapp support fuzzy searching, sorting results by price,quantity and rating.
- Customer can see list of all their ordered products along with their current status.
- Customer can rate vendors and products and also add their reviews.

## Requirements:

-   NodeJS
-   ReactJS
-   ExpressJS
-   MongoDB

## Running the program

### Node

-   sudo apt-get update
-   sudo apt-get install nodejs
-   sudo apt-get install npm

### MongoDB

-   sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
-   echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
-   sudo apt-get update
-   sudo apt-get install -y mongodb-org
-   sudo systemctl start mongod
-   sudo systemctl status mongod
-   sudo systemctl enable mongod

### React

-   npm install -g create-react-app

### Express

-   npm i express

## Running the code

Run Express:

```
cd backend/
npm install
nodemon start
```

Run React:

```
cd fronted/
npm install/
npm start
```

---
