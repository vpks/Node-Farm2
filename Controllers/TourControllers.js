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
