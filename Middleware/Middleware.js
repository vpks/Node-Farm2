const testFunction = (req, res, next) => {
  console.log('hello from MW 😂');
  //   res.status(200).send('no data');
  next();
};

module.exports = testFunction;
