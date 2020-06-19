import React, { Component } from 'react';
import './Category.css';
import './Heading.css';

import Delete from '../images/Delete.png';
import Sticky from './Sticky';


class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            loading: true,
            newCategory: "",
            disabled: true,
            isAuth: this.props.isAuth,
            error: null
        };
    }

    newCategoryHandler = (e) => {
        const val = e.target.value.trimLeft();
        let disabled = true;
        var button = document.getElementsByClassName("addButton")[0];

        if(val !== "")
            disabled = false;
        
        button.disabled = disabled;
    
        this.setState({
            newCategory: val,
            disabled: disabled
        });
    }
    
    componentDidMount = () => {
        // this.setState({error: null});
        if(this.props.isAuth)
        {
            this.setState({loading: true});
            fetch('https://sticky-notes-back-end.herokuapp.com/categories', {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer '+ this.props.token
                }
            })
            .then(result => {
                if(result.status !== 200)
                    throw new Error("Error in fetching categories");
                return result;
            })
            .then(result => result.json())
            .then(result => {
              
                this.setState({
                    categories : result,
                    loading: false
                });               
            })
            .catch(err => {
                this.setState({
                    error: 'Cannot fetch categories'
                });
            });
        }
    }

    componentDidUpdate = () => {
        if(this.props.isAuth !== this.state.isAuth)
        {
            this.setState({isAuth: this.props.isAuth});
            this.componentDidMount();
        }
    }
    
    createNewCategory = (e) => {
        e.preventDefault();

        this.setState({loading: true});
        fetch('https://sticky-notes-back-end.herokuapp.com/create-category', {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + this.props.token
            },
            body: JSON.stringify({name: this.state.newCategory})
        })
        .then(result => { 
            // console.log(result);
            if(result.status !== 200)
                throw new Error("Unable to save");
            this.setState({
                newCategory: ""
            }); 
            this.componentDidMount();
        })
        .catch(error => {

            this.setState({
                error: "Unable to save"
            });
        });
    }

    showNotesForCategory = (categoryName) => {

        this.props.history.push("/sticky-notes/category-notes/"+categoryName);
    }

    deleteCategory = (e, categoryName) => {
        e.preventDefault();
        this.setState({loading: true});
        fetch('https://sticky-notes-back-end.herokuapp.com/delete-category/'+ categoryName, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + this.props.token
            }
        })
        .then(result => {
            if(result.status !== 200)
                throw new Error("Error in fetching categories");
            this.setState({loading: false});
            this.componentDidMount();
        })
        .catch(error => {
            this.setState({
                error: "Unable to save"
            });
        });
        
    }

    showCategoryMenu = () => {
        document.getElementsByClassName("category-div")[0].style.display="block";
        document.getElementsByClassName("category-button")[0].style.display="none";
    }

    
    render() {
        if(window.location.pathname === "/sticky-notes/" || window.location.pathname==="/sticky-notes" || window.location.pathname==="/")
            return <div></div>
        
        if(!this.props.isAuth){
            return <div className="category-div"><Sticky/></div>
            // return <div></div>
        }
        if(this.state.error)
            return <div className="category-div">Error in fetching categories</div>


        

        try{       

            const list = this.state.categories.map(category => (
                <div key={category._id} className="one-category" >
                    
                    <div className="name" onClick={() => this.showNotesForCategory(category.name)}>- {category.name}</div>
                    {(category.name !== 'Uncategorized' ? 
                    <button className="delete" onClick={(e) => this.deleteCategory(e, category.name)}><img src={Delete} alt="Del"/></button>:
                    <span></span>)}                  
                </div>));
            // console.log(list);
            
            let code_to_return = (
            // <div className="backdrop">
                /* <div className="category-button" onClick={this.showCategoryMenu}>M</div> */
                <div className="category-div">

                    <div className="category-heading">Categories</div>
                    {list.length ? list : <div className="no-categories">No categories</div>}

                    <form className="category-form" onSubmit={(e) => this.createNewCategory(e)}>
                        <input type="text" value={this.state.newCategory} onChange={(e) => this.newCategoryHandler(e)}  maxLength="13" placeholder="Add new category" />
                        <button className="addButton" type="submit" disabled><span> + </span></button>
                    </form>
                </div>
            // </div>
            );

            if(this.state.loading)
                code_to_return = (
                // <div className="backdrop">
                    // <div className="category-button" onClick={this.showCategoryMenu} >M</div>
                    <div className="category-div">
                        <div className="category-heading">Categories</div>
                        <div className="loading">LOADING</div>
                    </div>
                // </div>
                );
                // console.log("rendered categories");

            return (
                code_to_return
            );
        }
        catch{
            return <div className="category-div">Cannot fetch categories</div>
        }
    }
}

export default Category;