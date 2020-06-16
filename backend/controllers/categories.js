const User = require('../models/user');
const mongoose = require('mongoose');

exports.getCategories = (req,res,next) => {
    const userId = mongoose.Types.ObjectId(req.userId);
    User.findById(userId)
    .then(user => {
        if(!user)
            throw new Error("User not found");
        res.status(200).json(user.categories);
    })
    .catch(error => {
        next(error);
    });
};


exports.createCategory = (req,res,next) => {
    const userId = mongoose.Types.ObjectId(req.userId);
    const newCategory = req.body.name;
    User.findById(userId)
    .then(user => {
        if(!user)
            throw new Error("User not found");
        let categories = [...user.categories];
        var i;
        var foundCategory = false;
        for(i=0; i<categories.length; i++){
            if(categories[i].name.toString().trim() === newCategory.toString().trim()){
                foundCategory = true;
                break;
            }
        }
        if(!foundCategory){
            categories.push({name: newCategory});
        }
        user.categories = categories;
        return user.save();
        
    })
    .then(result => {
        res.status(200).json({name: newCategory});
    })
    .catch(error => {
        next(error);
    });
};



exports.getCategoryNotes = (req, res, next) => {
    const userId = mongoose.Types.ObjectId(req.userId);
    const categoryName = req.params.categoryName;
    // console.log(categoryName);
    let notesArr=[];

    User.findById(userId)
    .then(user => {
        if(!user)
            throw new Error("User not found");

        notesArr = user.notes.filter(n => {
            // console.log(n);
            return n.category.toString().trim() === categoryName.toString().trim();
        });

        // console.log("notes arr in category results");
        // console.log(notesArr);
        
        res.status(200).json(notesArr);
        
    })
    .catch(error => {
        next(error);
    });

};




exports.deleteCategory = (req,res,next) => {
    const userId = mongoose.Types.ObjectId(req.userId);
    const categoryName = req.params.categoryName;
    // console.log("in delete category")
    // console.log(userId, categoryName);

    
    User.findById(userId)
    .then(user => {
        if(!user)
            throw new Error("No user found");
        let updatedNotes = [...user.notes];
        var l = updatedNotes.length;
        for(i=0; i<l; i++){
            if(updatedNotes[i].category === categoryName)
                updatedNotes[i].category = 'Uncategorized';
        }
        
        
        updatedCategories = user.categories.filter(c => {
            return c.name.toString().trim() !== categoryName.toString().trim();
        });
        user.notes = updatedNotes;
        user.categories = updatedCategories;
        user.save();
    })
    .then(result => {
        res.status(200).json({message: 'Success !! Category successfully deleted'});
    })
    .catch(error => {
        next(error);
    });
    
};

exports.searchCategoryNotes = (req,res,next) => {
    let searchWords = req.params.searchValue.split(" ");
    const userId = mongoose.Types.ObjectId(req.userId);
    const categoryName = req.params.categoryName;

    let ansNotes = [];

    var i;
    for(i=0; i<searchWords.length; i++)
        searchWords[i] = searchWords[i].toLowerCase();

    User.findById(userId)
    .then(user => {
        if(!user)
            throw new Error("User not found");
        let userNotes = [...user.notes];
        for (note of userNotes){
            if(note.category.toString().trim() !== categoryName.toString().trim())
                continue;
                 
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
};
