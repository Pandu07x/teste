// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'iotdatabase1.cnxh81zkiydj.us-east-1.rds.amazonaws.com',
  database: 'iot',
  password: "12345678",
  port: 5432,
  ssl:{
    rejectUnauthorized:false
  }
});

module.exports = pool;
