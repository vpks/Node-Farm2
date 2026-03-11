const express = require('express');
const morgan = require('morgan');
const TourRouter = require('./routers/TourRouter');
const userRouter = require('./routers/userRouter');

const ApiError = require('./ErrorHandling/Error');

const app = express();

//Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestedTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', TourRouter);
app.use('/api/v1/users', userRouter);

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`listening at ${PORT}`);
// });

app.use((err, req, res, next) => {
  const newError = new ApiError(err, 500);
  res.status(500).json({
    status: 'fail',
    message: newError.message,
    stack: newError.stack,
  });
});

module.exports = app;
