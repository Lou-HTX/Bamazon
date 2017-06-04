'use strict';

var mysql = require('mysql');
var inquirer = require('inquirer');
var prompt = require('prompt');

var connection = mysql.createConnection({
    host: "localhost",
    user: "test",
    password: "Welcome01",
    database: "Bamazon"
});

connection.connect(function(err) {
    if (err) {
        console.log('Error connecting to DB');
        return;
    }
});

function managerView() {
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'What do you want to do?',
        choices: [
            new inquirer.Separator(),
            'View Products for Sale',
            'View Low Inventory',
            'Add to Inventory',
            'Add New Product',
            new inquirer.Separator(),
            'Exit'
        ]
    }, ]).then(function(answer) {
        switch (answer.action) {
            case 'View Products for Sale':
                viewProductForSale();
                break;

            case 'View Low Inventory':
                viewLowInventory();
                break;

            case 'Add to Inventory':
                addtoInventory();
                break;

            case 'Add New Product':
                addNewProduct();
                break;

            case 'Exit':
                return;
                break;
        }
    });
};

function viewProductForSale() {
    connection.query('SELECT * FROM products', function(err, rows) {
        if (!err) {
            for (var i = 0; i < rows.length; i++) {
                console.log(rows[i].Item_ID + ' | ' +
                    rows[i].Product_Name + ' | ' +
                    rows[i].Department_Name + ' | ' +
                    "$" + rows[i].Price + ' | ' +
                    rows[i].Stock_Quantity);
            }
            console.log('<----------------------------------------->');
        }
    })
};

function viewLowInventory() {
    connection.query('SELECT * FROM products WHERE Stock_Quantity < 3', function(err, rows) {
        if (!err) {
            for (var i = 0; i < rows.length; i++) {
                console.log(rows[i].Item_ID + ' | ' +
                    rows[i].Product_Name + ' | ' +
                    rows[i].Department_Name + ' | ' +
                    '$' + rows[i].Price + ' | ' +
                    rows[i].Stock_Quantity);
            }
            console.log('<----------------------------------------->');
        }
    })
};

function addtoInventory() {
    prompt.get(['Item_ID', 'Quantity'], function(err, result) {
        var itemQty = parseInt(result.Quantity);
        var itemID = parseInt(result.Item_ID);
        connection.query('UPDATE Products SET Stock_Quantity = (Stock_Quantity + ?) WHERE Item_ID = ?', [itemQty, itemID], function(err, row) {
            if (err) throw err;
        });
    });
};

function addNewProduct() {
    prompt.get(['Product_Name', 'Department_Name', 'Price', 'Stock_Quantity'], function(err, result) {
        var itemQty = parseInt(result.Stock_Quantity);
        var query = "INSERT INTO Products (Product_Name, Department_Name, Price, Stock_Quantity)" + "VALUES (?,?,?,?)"
        connection.query(query, [result.Product_Name, result.Department_Name, result.Price, itemQty], function(err, rwo) {
            if (err) throw err;
        });
    });
};

function customerView() {
    connection.query('SELECT * FROM products', function(err, rows) {
        inquirer.prompt({
            name: 'choice',
            type: 'rawlist',
            choices: function(vlaue) {
                var choiceArray = [];
                for (var i = 0; i < rows.length; i++) {
                    choiceArray.push(rows[i].Product_Name);
                }
                return choiceArray;
            },
            message: "What would you like to buy?"
        }).then(function(answer) {
            var i = 0,
                cont = true;
            while (i < rows.length && cont == true) {
                if (rows[i].Product_Name == answer.choice) {
                    cont = false;
                    var chosenItem = rows[i];
                    inquirer.prompt({
                        name: "qty",
                        type: "input",
                        message: "How many would you like to buy?"
                    }).then(function(answer) {
                        var qty = parseInt(answer.qty);
                        var itemID = parseInt(chosenItem.Item_ID);
                        if (chosenItem.Stock_Quantity >= qty) {
                            var query = "UPDATE Products SET Stock_Quantity = (Stock_Quantity - ?) WHERE Item_ID = ?";
                            connection.query(query, [qty, itemID], function(err, row) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log("Product :" + chosenItem.Product_Name + " Quantity : " + qty);
                                    console.log("Total Amount : $" + qty * chosenItem.Price);
                                }
                            })
                        } else {
                            console.log("Insufficient quantity!");
                        }
                    });
                } else {
                    i++;
                }

            }
        })
    })
}

function startBamazon() {

    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'What do you want to do?',
        choices: [
            new inquirer.Separator(),
            'Customer View',
            'Manager View',
            new inquirer.Separator(),
            'Exit'
        ]
    }, ]).then(function(answer) {
        switch (answer.action) {
            case 'Customer View':
                customerView();
                break;

            case 'Manager View':
                managerView();
                break;

            case 'Exit':
                console.log('Thank you shoppping with us');
                console.log('Please visit us again');
                return;
                break;
        }
    });
}
startBamazon();