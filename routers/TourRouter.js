const express = require('express');
const testFunction = require('../Middleware/Middleware');

const router = express.Router();
const TourController = require('../Controllers/TourControllers');

// router.param('id', (req, res, next, id) => {
//   next();
// });
router
  .route('/top-5-tours')
  .get(TourController.Toptour, TourController.getAllTours);

router
  .route('/')
  .get(testFunction, TourController.getAllTours)
  .post(TourController.PostTour);
router
  .route('/:id')
  .get(TourController.getToursID)
  .patch(TourController.UpdateTour)
  .put(TourController.TourPut)
  .delete(TourController.DeleteTour);
module.exports = router;
