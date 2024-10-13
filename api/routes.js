module.exports = function (app) {
  const arithmetic = require('./controller');
  app.route('/arithmetic').get(arithmetic.calculate);
};


//Welcome to Wilco API v1.0.0
