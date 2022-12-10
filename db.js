const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"uncommon4453",
    database: "something_database",
    host: "localhost",
    port: 5432
});

module.exports = pool;