// eslint-disable-next-line arrow-body-style
const catchAsyncErrors = (fn) => {
  // eslint-disable-next-line no-undef
  return (req, res, next) => fn(req, res, next).catch(next);
};

module.exports = catchAsyncErrors;
