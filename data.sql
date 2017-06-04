CREATE DATABASE Bamazon;

Use Bamazon;

CREATE TABLE Products
(
    Item_ID INT NOT NULL
    AUTO_INCREMENT,
    Product_Name VARCHAR
    (225) NOT NULL,
    Department_Name VARCHAR
    (255) NOT NULL,
    Price DECIMAL
    (5,2) NOT NULL,
    Stock_Quantity INT NOT NULL,
    PRIMARY KEY
    (Item_ID)
);

    INSERT INTO Products
        (Product_Name, Department_Name, Price, Stock_Quantity)
    VALUES('Clubmans', 'Handlebars', 25, 2);

    INSERT INTO Products
        (Product_Name, Department_Name, Price, Stock_Quantity)
    VALUES('MX', 'Handlebars', 25, 2);

    INSERT INTO Products
        (Product_Name, Department_Name, Price, Stock_Quantity)
    VALUES('Icecream', 'Pedals', 10, 2);

    INSERT INTO Products
        (Product_Name, Department_Name, Price, Stock_Quantity)
    VALUES('BMX', 'Pedals', 10, 5);

    INSERT INTO Products
        (Product_Name, Department_Name, Price, Stock_Quantity)
    VALUES('Polini 70cc', 'Kits', 120, 3);

    INSERT INTO Products
        (Product_Name, Department_Name, Price, Stock_Quantity)
    VALUES('Malossi 70cc', 'Kits', 115, 3);

    INSERT INTO Products
        (Product_Name, Department_Name, Price, Stock_Quantity)
    VALUES('Sava GP1', 'Tires', 30, 8);

    INSERT INTO Products
        (Product_Name, Department_Name, Price, Stock_Quantity)
    VALUES('Michellen Gazells', 'Tires', 25, 8);

    INSERT INTO Products
        (Product_Name, Department_Name, Price, Stock_Quantity)
    VALUES('PHBG', 'Carburators', 90, 3);

    INSERT INTO Products
        (Product_Name, Department_Name, Price, Stock_Quantity)
    VALUES('Mikuni', 'Carburators', 90, 3);

    SELECT *
    FROM Products;

    UPDATE Prodcuts SET Stock_Quantity = (Stock_Quantity + ?)
    WHERE Item_ID = ?, [2,1];