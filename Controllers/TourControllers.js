const fs = require('fs');

const APIfeatures = require(`../APIFeatures/APIfeatures`);
const tourModel = require('../models/TourModel');
const catchAsyncErrors = require('../HelperFunctions/funtioncHelper');

const tours = JSON.parse(fs.readFileSync(`./dev-data/data/tours-simple.json`));

exports.getAllTours = catchAsyncErrors(async (req, res, next) => {
  const features = new APIfeatures(tourModel.find(), req.query)
    .filter()
    .limit()
    .pagination()
    .sort();

  //data assign
  const getTours = await features.query;

  res.status(200).json({
    status: 'success',
    result: getTours.length,
    data: getTours,
  });
});

//TourByID>>>>>>>>>>>>>
exports.getToursID = catchAsyncErrors(async (req, res, next) => {
  const result = await tourModel.findById(req.params.id);
  if (result) {
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } else {
    res.status(404).json({
      status: 'fail',
      data: 'no records found.',
    });
  }
});

//TourUpdatePatch
exports.UpdateTour = catchAsyncErrors(async (req, res, next) => {
  const result = await tourModel.updateOne({ _id: req.params.id }, req.body);
  res.status(201).json({
    status: 'success',
    data: result,
  });
});

//TourCreate
exports.PostTour = catchAsyncErrors(async (req, res, next) => {
  // eslint-disable-next-line no-useless-catch
  const newTour = await tourModel.create(req.body);
  res.status(200).json({
    satus: 'success',
    data: newTour,
  });
});
//TourUpdatePut
exports.TourPut = (req, res) => {
  const TourUpdate = req.body;
  // const record = tours.find((e) => e.id == TourUpdate.id);
  const index = tours.findIndex((e) => e.id === TourUpdate.id);
  tours[index] = TourUpdate;
  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(400).json({
          status: 'fail',
          message: err,
        });
      } else {
        res.status(200).json({
          status: 'success',
          id: req.params.id,
          message: 'updated record',
        });
      }
    },
  );
};

exports.DeleteTour = catchAsyncErrors(async (req, res, next) => {
  await tourModel.findOneAndDelete({ _id: req.params.id });
  res.status(200).json({
    status: 'succes',
    data: `data with id:${req.params.id} successfully.`,
  });
});

//aliasing
exports.Toptour = async (req, res, next) => {
  req.query = {
    ratingAverage: {
      gte: 4.5,
    },
    limit: 5,
  };
  next();
};

exports.TourStats = async (req, res, next) => {};

exports.getTourStats = catchAsyncErrors(async (req, res, next) => {
  const stats = await tourModel.aggregate([
    { $match: { ratingAverage: { $gte: 4.5 } } },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
    // {
    //   $match: { _id: { $ne: 'EASY' } },
    // },
  ]);
  res.status(200).json({
    status: 'success',
    result: stats.length,
    data: stats,
  });
});

//get full month name
function getFullMonthName(monthNumber) {
  // Month numbers in JavaScript's Date object are 0-indexed (0-11).
  // We subtract 1 from the input number to match this (e.g., 1 becomes 0 for January).
  const date = new Date(2000, monthNumber - 1, 1);

  // Use toLocaleString to format the date part to the full month name.
  // 'en-US' is an example locale; you can change this as needed.
  const monthName = date.toLocaleString('en-US', { month: 'long' });

  return monthName;
}

exports.getMonthlyPlan = catchAsyncErrors(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await tourModel.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: {
          $month: '$startDates',
        },
        numTours: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: {
        month: '$_id',
        // month: {
        //   $function: {
        //     body: getFullMonthName,
        //     args: ['$_id'],
        //   },
        // },
      },
    },
    {
      $project: { _id: 0 },
    },
    {
      $sort: { month: 1 },
    },
  ]);

  // plan = plan.map((e) => {
  //   e.month = getFullMonthName(e.month);
  //   return e;
  // });
  const planNew = plan.map((e) => {
    e.month = getFullMonthName(e.month);
    return e;
  });
  // console.log(planNew);

  res.status(200).json({
    status: 'success',
    result: planNew.length,
    data: planNew,
  });
});
