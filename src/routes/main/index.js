import express from 'express'
var router = express.Router();

import controller from '../../controllers/index-controller'

router.get('/', controller.main);

// module.exports = router;
export default router
