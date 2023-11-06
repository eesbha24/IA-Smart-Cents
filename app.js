// set up the server 
const express = require ("express"); 
const app = express(); 
const port = 3000;
const logger = require("morgan");  
const DEBUG = true; 
const db = require ('./db/db_connection'); 

app.set ("views", __dirname + "/views") 
app.set ("view engine", "ejs"); 

// Configure Express to use EJS
app.set( "views",  __dirname + "/views");
app.set( "view engine", "ejs" );

// define middleware that logs all incoming requests
app.use(logger ("dev")); 
// define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));
// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.render('index');
});
// Configure Express to parse URL-encoded POST request bodies (traditional forms)
app.use( express.urlencoded({ extended: false }) );


// define a route for the assignment list page
const read_assignments_all_sql = `
    SELECT *
    FROM coffee
`;

// app.get("/assignments", (req, res) => {
//     db.execute(read_assignments_all_sql, (error, results) => {
//         if (DEBUG)
//             console.log(error ? error : results);
//         if (error)
//             res.status(500).send(error); // Internal Server Error
//         else {
//             if (results.length === 0) {
//                 res.status(404).send("No assignments found"); // Send a 404 response if no assignments are found
//             } else {
//                 res.render('assignments', { assignments: results }); // Render the 'assignments' view with the 'results' data
//             }
//         }
//     });
// });


// define a route for the assignment detail page


app.get( "/assignments", ( req, res ) => {
    db.execute(read_assignments_all_sql, (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else if (results.length == 0)
            res.status(404).send(`No assignment found with id = "${req.params.id}"` ); // NOT FOUND
        else {

            let data = {hw: results}; // results is still an array, get first (only) element
            res.render('assignments', data); 
            // What's passed to the rendered view: 
            //  hw: { id: ___ , title: ___ , priority: ___ , 
            //    subjectName: ___ , subjectId: ___, 
            //    dueDateExtended: ___ , dueDateYMD: ___ , description: ___ 
            //  }
        }
    });
});

// define a route for assignment DELETE
const delete_assignment_sql = `
    DELETE 
    FROM
        coffee
    WHERE
        coffee_id = ?
`
app.get("/assignments/:id/delete", ( req, res ) => {
    db.execute(delete_assignment_sql, [req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect("/assignments");
        }
    });
});

// define a route for assignment CREATE
const create_assignment_sql = `
    INSERT INTO assignments 
        (coffee_id, product_id, coffee_type) 
    VALUES 
        (?, ?, ?);
`
app.post("/assignments", ( req, res ) => {
    db.execute(create_assignment_sql, [req.body.coffee_id, req.body.product_id, req.body.coffee_type], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            //results.insertId has the primary key (assignmentId) of the newly inserted row.
            res.redirect(`/assignments/${results.insertId}`);
        }
    });
});

// define a route for assignment UPDATE
const update_assignment_sql = `
    UPDATE
        coffee
    SET
        coffee_id = ?, 
        product_id = ?, 
        coffee_type = ?, 

    WHERE
        assignmentId = ?
`
app.post("/assignments/:id", ( req, res ) => {
    db.execute(update_assignment_sql, [req.body.coffee_id, req.body.product_id, req.body.coffee_type], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect(`/assignments/${req.params.id}`);
        }
    });
});



        

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );

