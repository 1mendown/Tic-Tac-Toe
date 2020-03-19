const mysql = require('mysql');
const util = require('util');

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'tictactoedb'
});


conn.connect(err => {
    if(err) {
        throw err
    }
    console.log('Connected to DB');
});


const query = util.promisify(conn.query).bind(conn)

module.exports = query;