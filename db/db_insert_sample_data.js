const db = require("./db_connection");

/**** Delete *CONTENTS OF* existing tables (but not dropping tables themselves) ****/

const delete_coffee_table_sql = "DELETE FROM coffee;"

db.execute(delete_coffee_table_sql);

const delete_products_table_sql = "DELETE FROM products;"

db.execute(delete_products_table_sql);

const delete_donuts_table_sql = "DELETE FROM donuts;"

db.execute(delete_donuts_table_sql);

const delete_merch_table_sql = "DELETE FROM merch;"

db.execute(delete_merch_table_sql);

/**** Create some sample subjects and assignments ****/

const insert_coffee_sql = `
    INSERT INTO coffee 
        (coffee_id, product_id, coffee_type) 
    VALUES 
        (?, ?, ?);
`

db.execute(insert_coffee_sql, [1, 2, 'hazelnut']);

db.execute(insert_coffee_sql, [2, 2, 'black']);

db.execute(insert_coffee_sql, [3, 2, 'latte']);



const insert_donuts_sql = `
    INSERT INTO donuts 
        (donut_id, product_id, donut_type, sprinkled, why) 
    VALUES 
        (?, ?, ?, ?, ?);
`


db.execute(insert_donuts_sql, [1, 1, 'glazed', 'Y', 'They hate it.']);


db.execute(insert_donuts_sql, [2, 1, 'chocolate', 'N', 'amazing.']);


db.execute(insert_donuts_sql, [3, 1, 'strawberry', 'Y', 'spectacular.']);

const insert_merch_sql = `
    INSERT INTO merch 
        (merch_id, product_id, merch_type) 
    VALUES 
        (?, ?, ?);
`


db.execute(insert_merch_sql, [1, 3, 'hoodie']);


db.execute(insert_merch_sql, [2, 3, 'hat']);


db.execute(insert_merch_sql, [3, 3, 'mug']);


const insert_products_sql = `
    INSERT INTO products 
        (product_id, product_name, popularity) 
    VALUES 
        (?, ?, ?);
`


db.execute(insert_products_sql, [1, "donuts", 5]);


db.execute(insert_products_sql, [2, "coffee", 4]);


db.execute(insert_products_sql, [3, "merch", 1]);

db.end();