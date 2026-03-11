const express = require('express');

const router = express.Router();
const userController = require('../Controllers/userControllers');

// router.param('id', (req, res, next, id) => {
//   next();
// });

router.route('/').get(userController.getAllUsers).post(userController.PostUser);
router
  .route('/:id')
  .get(userController.getUserID)
  .patch(userController.UpdateUser)
  .put(userController.UserPut);
module.exports = router;
