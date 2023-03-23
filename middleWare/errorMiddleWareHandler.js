const errorMiddleWareHandler = (err, req, res, next) => {
  //set status code
  const errorStatusCode = res.errorStatusCode === 200 ? 500 : res.statusCode;
  res.status(errorStatusCode);
  res.json({
    message: err.message,
  });
};

module.exports = { errorMiddleWareHandler };
