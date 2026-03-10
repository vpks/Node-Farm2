const express = require('express');
const testFunction = require('../Middleware/Middleware');

const router = express.Router();
const TourController = require('../Controllers/TourControllers');

// router.param('id', (req, res, next, id) => {
//   next();
// });

router
  .route('/tours')
  .get(testFunction, TourController.getAllTours)
  .post(TourController.PostTour);
router
  .route('/tours/:id')
  .get(TourController.getToursID)
  .patch(TourController.UpdateTour)
  .put(TourController.TourPut);
module.exports = router;
