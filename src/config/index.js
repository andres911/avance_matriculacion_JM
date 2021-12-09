if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  
  module.exports = {
    PORT: process.env.API_PORT,
    DATABASE_URL: process.env.DATABASE_URL,
  };