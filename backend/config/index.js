require('dotenv').config();

module.exports = {
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : process.env.SECRET || 'e6F9KvSDf4dyXj'
};
