const mysql = require('mysql');
const Express = require('express');

const app = Express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'destifo',
    database: 'student_monitoring_demo',
});

connection.connect((error) => {
    if (error)
        console.log(error.message);
    else
        console.log("Connection to MySql was successful...");
});


const port = process.env.port || 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));