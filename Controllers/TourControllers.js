const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`./dev-data/data/tours-simple.json`));

//getalltours====>>>>>>>
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: tours,
  });
};

//TourByID>>>>>>>>>>>>>
exports.getToursID = (req, res) => {
  const result = tours.find((e) => e.id === req.params.id);
  if (result) {
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } else {
    res.status('404').json({
      status: 'fail',
      message: 'data not found',
    });
  }
};

//TourUpdatePatch
exports.UpdateTour = (req, res) => {
  const keyValues = Object.entries(req.body);
  const element = tours.find((e) => e.id === req.params.id);
  const index = tours.findIndex((e) => e.id === req.params.id);
  if (element) {
    keyValues.forEach((e) => {
      element[e[0]] = e[1];
    });
    tours[index] = element;
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
  } else {
    res.status(404).json({
      status: 'fail',
      message: 'data not found',
    });
  }
};

//TourCreate
exports.PostTour = (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  const newObj = {
    id: newID,
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    ...req.body,
  };
  tours.push(newObj);
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
          newObj,
          message: 'created record',
        });
      }
    },
  );
};

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
