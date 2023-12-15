// server/models/user.js
const db = require('../database/db');


const getUserByUsernameAndPassword = async (uname, password) => {
    try {
      const query = 'SELECT * FROM "UserMaster" WHERE "uname" = $1 AND "password" = $2';
      const result = await db.query(query, [uname, password]);
  
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  };
module.exports = { getUserByUsernameAndPassword };
