const express = require('express');
const router = express.Router();
const {body} = require('express-validator/check');
const notesController = require('../controllers/notes');
const isAuth = require('../middleware/isAuth');

router.post('/add-note', isAuth,  [
    body('note')
    .trim()
    .isLength({min:1})
    .withMessage("Nothing to save")
],  notesController.postAddNote);

router.get('/notes/:noteId',isAuth, notesController.getSingleNote);

router.post('/edit-note/:noteId', isAuth, [
    body('note')
    .trim()
    .isLength({min:1})
    .withMessage("Nothing to save")
], notesController.postEditNote);

router.get('/delete-note/:noteId', isAuth, notesController.deleteNote);

router.get('/search/:searchValue', isAuth, notesController.searchAllNotes);

router.get('/all-notes', isAuth, notesController.getAllNotes);
 

 
module.exports = router;