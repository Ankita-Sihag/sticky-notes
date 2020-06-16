const {validationResult} = require('express-validator/check');
const User = require('../models/user');
const mongoose = require('mongoose'); 

exports.postAddNote = (req, res, next) => {    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        throw error;
    }

    const title = req.body.title;
    const note = req.body.note;
    const category = req.body.category;
    const color = req.body.color;

    const userId = req.body.userId;


    var today = new Date();
    var createdAt = today.getDate() + '/'+(today.getMonth()+1)+'/'+ today.getFullYear();


    const newNote = {title: title, note: note, createdAt:createdAt , updatedAt: createdAt, category: category, color: color};
    User.findById(userId)
    .then(user => {
        if(!user)
        {
            throw new Error("User not found");
        }
        let notes = [...user.notes];
        notes.push(newNote);
        user.notes = notes;
        user.save();
    })
    .then(result => { 
        // console.log("note added");
        res.status(200).json({message: 'Successfully added note'});
    })
    .catch(error => {
        next(error);
    });
    
};

exports.getAllNotes = (req, res, next) => {
    const userId = mongoose.Types.ObjectId(req.userId);
    // console.log("user id in get all notes"+ userId);
    // console.log(req.userId); 
    User.findById(userId)
    .then(user => {
        if(!user)
            throw new Error("User not found");
        // console.log(user.notes);
        // console.log("all set in getallnotes");
        res.status(200).json(user.notes.reverse());
    })
    .catch(error => {
        next(error);
    });
};

exports.getSingleNote = (req, res, next) => {
    const noteId = req.params.noteId;
    let userId = req.userId;
    userId = mongoose.Types.ObjectId(userId);
    User.findOne(userId)
    .then(user => {
        if(!user)
            throw new Error("No user found");
        const notes = [...user.notes];
        // console.log("NOtes area ");
        // console.log(notes);
        let foundNote = null;
        var i;
        for(i=0; i<notes.length; i++){
            if(notes[i]._id.toString()===noteId.toString()){
                foundNote = notes[i];
                break;
            }
        }
        if(foundNote)
            res.status(200).json(foundNote);
        else   
            throw new Error("No note found");
    })
    .catch(error => {
        next(error);
    });
};

exports.postEditNote = (req,res,next) => {
    // console.log("in post edit note");
    const updatedTitle = req.body.title;
    const updatedNote = req.body.note;
    const updatedCategory = req.body.category;
    const updatedColor = req.body.color;
    // console.log(updatedColor);
    const noteId = req.params.noteId;
    var today = new Date();
    var updatedAt = today.getDate() + '/'+(today.getMonth()+1)+'/'+ today.getFullYear();
    let userId = req.userId;
    userId = mongoose.Types.ObjectId(userId);

    
    User.findOne(userId)
    .then(user => {
        if(!user)
            throw new Error("No user found");

        // console.log("user found");
        let updatedNotes = [...user.notes];
        const noteIndex = updatedNotes.findIndex(n => {
            return n._id.toString()===noteId.toString();
        });

        if(noteIndex<0)
            throw new Error("No note found");
        
        updatedNotes[noteIndex].title = updatedTitle;
        updatedNotes[noteIndex].note = updatedNote;
        updatedNotes[noteIndex].updatedAt = updatedAt;
        updatedNotes[noteIndex].category = updatedCategory;
        updatedNotes[noteIndex].color = updatedColor;


        // console.log(updatedNote[noteIndex]);

        user.notes = updatedNotes;
        return user.save();
    })
    .then(result => {
        // console.log("all done in edit");
        res.json({message: 'Success. Note successfully updated'});
    })
    .catch(error => {
        next(error);
    });
};

exports.searchAllNotes = (req,res,next) => {
    let searchWords = req.params.searchValue.split(" ");
    const userId = mongoose.Types.ObjectId(req.userId);

    let ansNotes = [];

    for(word of searchWords)
        word = word.toLowerCase();

    User.findById(userId)
    .then(user => {
        if(!user)
            throw new Error("User not found");
        let userNotes = [...user.notes];
        for (note of userNotes){
            flag = false;
            for(word of searchWords){
                if(note.title.toLowerCase().includes(word) || note.note.toLowerCase().includes(word)){
                    flag = true;
                    break;
                }
            }
            if(flag)
                ansNotes.push(note);
        }
    })
    .then(result => {
        return res.status(200).json(ansNotes);
    })
    .catch(error => {
        next(error);
    });
}

exports.deleteNote = (req, res, next) => {
    const noteId = req.params.noteId;
    let userId = req.userId;
    userId = mongoose.Types.ObjectId(userId);
    User.findById(userId)
    .then(user => {
        if(!user)
            throw new Error("No user found");
        let updatedNotes = user.notes.filter(n => {
            return n._id.toString() !== noteId.toString();
        });
        user.notes = updatedNotes;
        user.save();
    })
    .then(result => {
        res.status(200).json({message: 'Success !! Note successfully deleted'});
    })
    .catch(error => {
        next(error);
    });
};
