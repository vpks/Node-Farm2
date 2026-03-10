const express = require('express');
const testFunction = require('../Middleware/Middleware');

const router = express.Router();
const userController = require('../Controllers/userControllers');

// router.param('id', (req, res, next, id) => {
//   next();
// });

router
  .route('/users')
  .get(testFunction, userController.getAllUsers)
  .post(userController.PostUser);
router
  .route('/users/:id')
  .get(userController.getUserID)
  .patch(userController.UpdateUser)
  .put(userController.UserPut);
module.exports = router;
