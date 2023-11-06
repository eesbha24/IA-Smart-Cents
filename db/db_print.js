const db = require("./db_connection");

/**** Read the assignments table, joined with subjects table ****/


const select_coffee_sql = `
SELECT *
FROM coffee

`;

db.execute(select_coffee_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'coffee' contents:")
        console.log(results);
    }
);


const select_donuts_sql = `
SELECT *
FROM donuts

`;

db.execute(select_donuts_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'donuts' contents:")
        console.log(results);
    }
);

const select_merch_sql = `
SELECT *
FROM merch
JOIN products
    ON merch.product_id = products.product_id

`;

db.execute(select_merch_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'merch' contents:")
        console.log(results);
    }
);

const select_products_sql = `
SELECT *
FROM products
JOIN coffee
    ON products.product_id = coffee.product_id

`;

db.execute(select_products_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'products' contents:")
        console.log(results);
    }
);


db.end();