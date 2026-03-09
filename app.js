const express = require('express');
const morgan = require('morgan');

const TourRouter = require('./routers/TourRouter');

const app = express();

//Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1', TourRouter);
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`listening at ${PORT}`);
// });

module.exports = app;
