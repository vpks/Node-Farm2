const fs = require('fs');
const tourModel = require('../models/TourModel');
const catchAsyncErrors = require('../HelperFunctions/funtioncHelper');

const tours = JSON.parse(fs.readFileSync(`./dev-data/data/tours-simple.json`));

//getalltours====>>>>>>>
exports.getAllTours = catchAsyncErrors(async (req, res, next) => {
  const getTours = await tourModel.find();
  res.status(200).json({
    status: 'success',
    data: getTours,
  });
});

// res.status(200).json({
//   status: 'success',
//   requestedAt: req.requestedTime,
//   result: tours.length,
//   data: tours,
// });

//TourByID>>>>>>>>>>>>>
exports.getToursID = catchAsyncErrors(async (req, res, next) => {
  const result = await tourModel.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: result,
  });
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
// const newID = tours[tours.length - 1].id + 1;
// const newObj = {
//   id: newID,
//   // eslint-disable-next-line node/no-unsupported-features/es-syntax
//   ...req.body,
// };
// tours.push(newObj);
// fs.writeFile(
//   './dev-data/data/tours-simple.json',
//   JSON.stringify(tours),
//   (err) => {
//     if (err) {
//       res.status(400).json({
//         status: 'fail',
//         message: err,
//       });
//     } else {
//       res.status(200).json({
//         status: 'success',
//         newObj,
//         message: 'created record',
//       });
//     }
//   },
// );

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
