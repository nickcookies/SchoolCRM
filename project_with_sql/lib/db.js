var sql = require('mysql2')
var conn = sql.createConnection({
    host:'localhost',
    user:'root',
    pass: "",
    database : "pss",
    port: 3306
});

conn.connect(function(error){
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log("Connection with DB established Successfully.");
    }
});

module.exports = conn;