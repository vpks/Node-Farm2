const express = require('express');

const router = express.Router();
const TourController = require('../Controllers/TourControllers');

router
  .route('/tours')
  .get(TourController.getAllTours)
  .post(TourController.PostTour);
router
  .route('/tours/:id')
  .get(TourController.getToursID)
  .patch(TourController.UpdateTour)
  .put(TourController.TourPut);
module.exports = router;
