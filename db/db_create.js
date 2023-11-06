const db = require("./db_connection");
/**** Drop existing tables, if any ****/

const drop_coffee_table_sql = "DROP TABLE IF EXISTS coffee;"

db.execute(drop_coffee_table_sql);

const drop_donuts_table_sql = "DROP TABLE IF EXISTS donuts;"

db.execute(drop_donuts_table_sql);

const drop_merch_table_sql = "DROP TABLE IF EXISTS merch;"

db.execute(drop_merch_table_sql);

const drop_products_table_sql = "DROP TABLE IF EXISTS products;"

db.execute(drop_products_table_sql);

const create_products_table_sql = `
CREATE TABLE products (
    product_id INT NOT NULL,
    product_name VARCHAR(45) NULL,
    #ofitems INT NULL, 
    popularity INT NULL, 
    PRIMARY KEY (product_id));
  
`
db.execute(create_products_table_sql);


const create_donuts_table_sql = `
CREATE TABLE donuts (
    donut_id INT NOT NULL,
    product_id INT NULL,
    donut_type VARCHAR(45) NULL, 
    sprinkled VARCHAR(45) NULL ,
    why VARCHAR(45) NULL, 

    PRIMARY KEY (donut_id));
    `

db.execute(create_donuts_table_sql);


const create_merch_table_sql = ` 
CREATE TABLE merch (
    merch_id INT NOT NULL,
    product_id INT NULL,
    merch_type VARCHAR(45) NULL,
    PRIMARY KEY (merch_id));
    `
db.execute(create_merch_table_sql);

const create_coffee_table_sql = `
    CREATE TABLE coffee (
        coffee_id INT NOT NULL,
        product_id INT NULL,
        coffee_type VARCHAR(45) NULL,
        PRIMARY KEY (coffee_id));
        `

db.execute(create_coffee_table_sql);

db.end();