const testFunction = (req, res, next) => {
  //   res.status(200).send('no data');
  next();
};

module.exports = testFunction;
