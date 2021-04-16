
var express = require('express');
var router = express.Router();


// Require our controllers.
var controller = require('../test-controller/controll');
var createbaza = require('../test-controller/createbaza');



/// BOOK ROUTES ///


router.get('/test', controller.index);//рендер страницы


/* router.post('/test/create',controller.user_create_post);//создать нового жителя


router.post('/city/create', controller.sity_create_post);//создать новый город


router.post('/test/:id/delete', controller.user_delete_post);//удалить жителя


router.post('/test/:id/update', controller.user_update_post);//обновить жителя
 */
router.post('/test/createbaza', createbaza.index_cites);//загрузить файл в базу данных
router.get('/test/createbaza2', createbaza.index_citezen);//загрузить файл в базу данных

module.exports = router;
