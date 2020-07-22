const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./constants');

function verifyJwt(req, res, next) {
  const token = req.headers.authorization;
  if (token === undefined) {
    res.sendStatus(401);
  } else {
    const fields = token.split(' ');
    if (fields.length !== 2) {
      res.status(403).send({
        error: 'Authorization did not include Bearer',
      });
      return;
    }
    const jwtToken = fields[1];
    try {
      const payload = jwt.verify(jwtToken, JWT_SECRET);

      req.token = payload;
      next();
    } catch (err) {
      console.error(err);
      res.status(403).send({
        error: err.message,
      });
    }
  }
}

module.exports = {
  verifyJwt,
};
