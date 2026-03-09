const mongoose = require('../mongoose/ mongoose');

const tourScheme = mongoose.Schema({
  primaryID: {
    type: mongoose.Schema.ObjectId,
  },
  id: {
    type: 'Number',
  },
  name: {
    type: 'String',
  },
  startLocation: {
    type: 'String',
  },
  nextStartDate: {
    type: 'String',
  },
  duration: {
    type: 'Number',
  },
  maxGroupSize: {
    type: 'Number',
  },
  difficulty: {
    type: 'String',
  },
  avgRating: {
    type: 'Number',
  },
  numReviews: {
    type: 'Number',
  },
  regPrice: {
    type: 'Number',
  },
  shortDescription: {
    type: 'String',
  },
  longDescription: {
    type: 'String',
  },
});

const tourModel = mongoose.model('Tours', tourScheme);

module.exports = tourModel;
