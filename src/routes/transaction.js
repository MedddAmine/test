const express =require('express')
const router = express.Router();
const controllers = require('../controllers')


router.post('/signup',controllers.transaction.Sned);


module.exports=router;