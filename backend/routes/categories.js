const express = require('express');
const router = express.Router();
const {body} = require('express-validator/check');
const categoriesController = require('../controllers/categories');
const isAuth = require('../middleware/isAuth');

router.get('/categories', isAuth, categoriesController.getCategories);

router.post('/create-category', isAuth, categoriesController.createCategory);

router.get('/category-notes/:categoryName', isAuth, categoriesController.getCategoryNotes);

router.get("/search-category-notes/:categoryName/:searchValue", isAuth, categoriesController.searchCategoryNotes);

router.delete('/delete-category/:categoryName', isAuth, categoriesController.deleteCategory);
 
module.exports = router;