const jwt = require('jsonwebtoken'); // eslint-disable-line
const ClientError = require('./client-error'); // eslint-disable-line

function authorizationMiddleware(req, res, next) {

  try {
    const token = req.get('X-Access-Token');
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = payload;

  } catch (err) {
    throw new ClientError(401, 'authentication required');
  }
  next();

}

module.exports = authorizationMiddleware;
