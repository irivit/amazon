-- DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE  bamazon;

USE bamazon;

  CREATE TABLE products(
    item_id INTEGER(4) NOT NULL AUTO_INCREMENT
    , product_name VARCHAR(100) NOT NULL
    , department_name VARCHAR(100) NOT NULL
    , price DEC(10,2)
    , stock_quantity INTEGER(250)
    , PRIMARY KEY (item_id)
  );
  
  DROP TABLE products;
  
  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ("laptop", "electronics", 750.50, 15);
  
  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ("tv", "electronics", 400.50, 10);
  
  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ("shampoo", "beauty", 4.75, 4);
  
  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ("gel", "beauty",  2.40, 10);
  
  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ("matress", "home", 3000.00, 7);
  
  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ("sheet", "home", 10.00, 10);
  
  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ("banana", "produce", 0.40, 30);
  
  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ("orange", "produce", 0.60, 15);
  
  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ("carrot", "produce", 0.30, 10);
  
  INSERT INTO products (product_name, department_name, price, stock_quantity)
  VALUES ("iPhone x", "electronics", 999.00, 7);
  
  SELECT * FROM products;
  
