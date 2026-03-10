//getalltours====>>>>>>>
exports.getAllUsers = (req, res) => {
  res.status(404).json({
    status: 'fail',
    requestedAt: req.requestedTime,
    data: 'Route not defined',
  });
};

//TourByID>>>>>>>>>>>>>
exports.getUserID = (req, res) => {
  res.status(404).json({
    status: 'fail',
    requestedAt: req.requestedTime,
    data: 'Route not defined',
  });
};

//TourUpdatePatch
exports.UpdateUser = (req, res) => {
  res.status(404).json({
    status: 'fail',
    requestedAt: req.requestedTime,
    data: 'Route not defined',
  });
};

//TourCreate
exports.PostUser = (req, res) => {
  res.status(404).json({
    status: 'fail',
    requestedAt: req.requestedTime,
    data: 'Route not defined',
  });
};

//TourUpdatePut
exports.UserPut = (req, res) => {
  res.status(404).json({
    status: 'fail',
    requestedAt: req.requestedTime,
    data: 'Route not defined',
  });
};
