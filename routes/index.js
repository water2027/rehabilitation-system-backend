
function RegisterRoutes(app) {
  app.use('/api', require('./user'));
}

module.exports = RegisterRoutes;