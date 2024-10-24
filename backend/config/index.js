require('dotenv').config();

if (!process.env.SECRET) {
  throw new Error('Missing required environment variable: SECRET');
}

module.exports = {
  secret: process.env.SECRET
};
