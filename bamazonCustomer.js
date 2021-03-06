var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

//function to stablish connection
var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    showStoreInventary();
});

// this function will show the invetory of the story in a table
function showStoreInventary() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {

        var table = new Table({
            chars: {
                'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
                , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
                , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
                , 'right': '║', 'right-mid': '╢', 'middle': '│'
            }, head: ['ID', 'PRODUCT', 'DEPARTMENT', 'PRICE', 'IN STOCK']
        });
        for (let i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        console.log(table.toString());
        menu();

    });
}


//this function will function like a menu for the user
function menu() {
    inquirer.prompt([
        {
            name: "id",
            message: "Introduce the ID of the product you want to buy:",
        }, {
            name: "quantity",
            message: "How many products do you want to buy?",
        }]).then(function (answer) {
            checkStock(answer.id, answer.quantity);
        });
}


// This function will check the availability of one product
function checkStock(id, quantity) {

    var query = "SELECT stock_quantity FROM products WHERE item_id = ?";
    connection.query(query, [id], function (err, res) {
        for (let i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < quantity) {  
                console.log(`Sorry, we don't have enough ${res[i].product_name} in stock. There're ${res[i].stock_quantity} items availables.`);
                menu();    
            
            }else{
                updateStock(quantity, id);
                checkOut(id, quantity);
            }
        }
    });

}


//This function will update the inventory once the user buy a product
function updateStock(quantity, id) {
    var query = "SELECT stock_quantity FROM products WHERE item_id = ?";
    connection.query(query, [id], function (err, res) {
        for (let i = 0; i < res.length; i++) {
            var newQuantity = res[i].stock_quantity - quantity;
            var updateQuery = "UPDATE products SET stock_quantity = ? WHERE item_id = ?;";
            connection.query(updateQuery, [newQuantity, id], function (err, resp) {
                if (err) throw err;
            });
        }
    });
}

//This function will process the check out of the user
function checkOut(id, quantity) {
    var query = "SELECT price FROM products WHERE item_id = ?";
    connection.query(query, id, function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            var totalPrice = res[i].price * parseFloat(quantity);
            console.log(`Your total price today is ${totalPrice} dollars.`)
        }
        connection.end();
    });
}

