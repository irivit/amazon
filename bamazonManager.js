var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');


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
    menu();

});

function menu() {
    inquirer.prompt([
        {
            name: "menu",
            message: "Menu:",
            type: "list",
            choices: ["Products for Sale", "Low Inventory", "Add to Inventory", "New Product"],
        }]).then(function (answer) {
            switch (answer.menu) {
                case "Products for Sale": {
                    showInventory();
                    break;
                }
                case "Low Inventory": {
                    lowerInventory();
                    break;
                }
                case "Add to Inventory": {
                    addInventory();
                    
                    break;
                }
                case "New Product": {
                    addNewProduct();
                    break;
                }
            }

        });
}

function showInventory() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
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

function lowerInventory() {
    var query = "SELECT product_name,  stock_quantity FROM  products WHERE  stock_quantity <= 5;"
    connection.query(query, function (err, resp) {
        if (err) throw err;
        console.log(`
        `);
        var table = new Table({
            chars: {
                'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
                , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
                , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
                , 'right': '║', 'right-mid': '╢', 'middle': '│'
            }, head: ['PRODUCT', 'IN STOCK']
        });
        for (let i = 0; i < resp.length; i++) {
            table.push([resp[i].product_name, resp[i].stock_quantity]);
        }
        console.log(table.toString());

    });
    menu();
}

function addInventory() {
    inquirer.prompt([
        {
            name: "id",
            message: "Introduce the ID number of the product to add to inventory:",
        },
        {
            name: "quantity",
            message: "How much units do you want to add?",
        }]).then(function (answer) {
            var quantity = 0;
            var query1 = "SELECT stock_quantity FROM  products WHERE  item_id = ?";
            connection.query(query1, answer.id, function (err, resp) {
                if (err) throw err;
                for (let i = 0; i < resp.length; i++) {
                    quantity = resp[i].stock_quantity;
                    var newQuantity = parseInt(quantity) + parseInt(answer.quantity);
                    var query2 = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";
                    connection.query(query2, [newQuantity, answer.id], function (err, resp) {
                        if (err) throw err;
                    });
                }
            });
            menu();
        });
}

function addNewProduct() {
    inquirer.prompt([
        {
            name: "name",
            message: "Introduce the name of the new product:",
        },
        {
            name: "department",
            message: "Introduce the name of the department:",
        },
        {
            name: "price",
            message: "Introduce the price of the product:",
        },
        {
            name: "quantity",
            message: "How much units do you want to add?",
        }]).then(function (answer) {
            var query = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)";
            connection.query(query, [answer.name, answer.department, parseFloat(answer.price), answer.price], function (err, resp) {
                if (err) throw err;
                console.log(resp);
            });
            menu();
        });
}