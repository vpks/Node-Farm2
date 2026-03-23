// eslint-disable-next-line import/no-extraneous-dependencies
const slugify = require('slugify');

const mongoose = require('../mongoose/ mongoose');

// const tourScheme = mongoose.Schema({
//   name: { type: String, required: true },
// });
const tourScheme = mongoose.Schema(
  {
    name: {
      type: 'String',
      required: [true, 'A tour must have a name'],
      unique: true,
    },
    duration: {
      type: 'Number',
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: 'Number',
      required: [true, 'A tour must have a maxGroupSize'],
    },
    difficulty: {
      type: 'String',
      required: [true, 'A tour must have a difficulty'],
    },
    ratingAverage: {
      type: 'Number',
      default: 4.5,
    },
    ratingsQuantity: {
      type: 'Number',
      default: 0,
    },
    price: {
      type: 'Number',
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: 'String',
    },
    summary: {
      type: 'String',
      trim: true,
      required: [true, 'A tour must have a summary'],
    },
    description: {
      type: 'String',
      trim: true,
      required: [true, 'A tour must have a summary'],
    },
    imageCover: {
      type: 'String',
      required: [true, 'A tour must have a images'],
    },
    images: [String],
    createdAt: {
      type: 'Date',
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    slug: 'String',
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

tourScheme.virtual('durationinWeeks').get(function () {
  return this.duration / 7;
});

tourScheme.pre('save', function (next) {
  this.slug = slugify(this.name);
  next();
});
// eslint-disable-next-line prefer-arrow-callback
tourScheme.pre('save', function (next) {
  console.log('saving document');
  next();
});
// eslint-disable-next-line prefer-arrow-callback
tourScheme.post('save', function (doc, next) {
  console.log(doc);
  next();
});

const tourModel = mongoose.model('Tours', tourScheme);

module.exports = tourModel;
