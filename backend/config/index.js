require('dotenv').config();

if (!process.env.SECRET) {
  throw new Error('SECRET is not defined in the environment variables');
}

module.exports = {
  secret: process.env.SECRET
};
