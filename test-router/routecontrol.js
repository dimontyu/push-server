

var express = require('express');
var router = express.Router();
const jsonParser = express.json();


// Require our controllers.
var controller = require('../test-controller/controll');
var createbaza = require('../test-controller/createbaza');



/// BOOK ROUTES ///









// Require our controllers.

router.get('/test', controller.index);//рендер страницы








router.post("/test/user", jsonParser,controller.index_post );


router.delete("/test/user/:id",controller.index_delete );

router.put("/test/user", jsonParser,controller.index_put );




router.post('/test/createbaza', createbaza.index_cites);//загрузить файл в базу данных
router.post('/test/createbaza2', createbaza.index_citezen);//загрузить файл в базу данных

module.exports = router;








