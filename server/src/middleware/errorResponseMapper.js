module.exports = function(err, req, res, next) {

  console.log(err);
  let status = err.status || 500;
  res.status(status).send();
};