import React, { Component } from 'react';
import LightSpeed from 'react-reveal/LightSpeed';
import Fade from 'react-reveal/Fade';
import './Form.css';
import './AddNote.css'; 
import './Heading.css';
import Refresh from '../images/Refresh.png';
import Tick from '../images/Tick.png';

 
class AddNote extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            title: "",
            note: "",
            error: null,
            categories: [],
            selectedCategory: 'Uncategorized',
            color: 0
        }
    }

    titleChangeHandler = (event) => {
        this.setState({
            title: event.target.value
        })
    }
    
    noteChangeHandler = (event) => {
        this.setState({
            note: event.target.value,
            error: null
        })
    }
    categoryChangeHandler = (event) => {
        this.setState({
            selectedCategory: event.target.value
        });
    }
 
    componentDidMount = () => {
        fetch('https://sticky-notes-back-end.herokuapp.com/categories', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer '+ this.props.token
            }
        })
        .then(result => {
            if(result.status !== 200)
                throw new Error("Error in fetchig");
            return result;
        })
        .then(result => result.json())
        .then(result => {
            this.setState({
                categories : result
            });               

        })
        .catch(err => {
            this.setState({
                error: 'Cannot fetch categories'
            });
        });
    }
    createNote = (e) => {
        e.preventDefault();

        fetch('https://sticky-notes-back-end.herokuapp.com/add-note', {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + this.props.token
            },
            body: JSON.stringify({title: this.state.title, note: this.state.note, category:this.state.selectedCategory,color: this.state.color,  userId: this.props.userId})
        })
        .then(result => { 
            if(result.status !== 200)
                throw new Error("Nothing to save");
            this.props.history.push("/sticky-notes/notes");
        })
        .catch(error => {
            this.setState({
                error: "Nothing to save"
            });
        });        
        
    }

    refreshCategories = (e) => {
        e.preventDefault();
        this.componentDidMount();
    }

    disableTicks = () => { 
        var x = document.getElementsByClassName("tick-image");
        var i;
        for(i=0; i<x.length; i++)
        {
            x[i].style.visibility="hidden";
        }
    }
    
    changeColorToWhite = () => {
        this.disableTicks();
        document.getElementsByClassName("tick-image")[0].style.visibility="visible";
        document.getElementsByClassName("input-title")[0].style.backgroundColor="white";
        document.getElementsByClassName("input-note")[0].style.backgroundColor="white";
        this.setState({
            color: 0
        });
    }

    changeColorToGray = () => {
        this.disableTicks();
        document.getElementsByClassName("tick-image")[1].style.visibility="visible";
        document.getElementsByClassName("input-title")[0].style.backgroundColor="#bfbfbf";
        document.getElementsByClassName("input-note")[0].style.backgroundColor="#bfbfbf";
        this.setState({
            color: 1
        });
    }

    changeColorToPink = () => {
        this.disableTicks();
        document.getElementsByClassName("tick-image")[2].style.visibility="visible";
        document.getElementsByClassName("input-title")[0].style.backgroundColor="#ffcccc";
        document.getElementsByClassName("input-note")[0].style.backgroundColor="#ffcccc";
        this.setState({
            color: 2
        });

    }

    changeColorToDarkPink = () => {
        this.disableTicks();
        document.getElementsByClassName("tick-image")[3].style.visibility="visible";
        document.getElementsByClassName("input-title")[0].style.backgroundColor="#ff9999";
        document.getElementsByClassName("input-note")[0].style.backgroundColor="#ff9999";
        this.setState({
            color: 3
        });
    }

    changeColorToBrown = () => {
        this.disableTicks();
        document.getElementsByClassName("tick-image")[4].style.visibility="visible";
        document.getElementsByClassName("input-title")[0].style.backgroundColor="#ffbf80";
        document.getElementsByClassName("input-note")[0].style.backgroundColor="#ffbf80";
        this.setState({
            color: 4
        });
    }

    changeColorToYellow = () => {
        this.disableTicks();
        document.getElementsByClassName("tick-image")[5].style.visibility="visible";
        document.getElementsByClassName("input-title")[0].style.backgroundColor="#ffff99";
        document.getElementsByClassName("input-note")[0].style.backgroundColor="#ffff99";
        this.setState({
            color: 5
        });
    }

    changeColorToGreen = () => {
        this.disableTicks();
        document.getElementsByClassName("tick-image")[6].style.visibility="visible";
        document.getElementsByClassName("input-title")[0].style.backgroundColor="#bbff99";
        document.getElementsByClassName("input-note")[0].style.backgroundColor="#bbff99";
        this.setState({
            color: 6
        });
    }

    changeColorToCyan = () => {
        this.disableTicks();
        document.getElementsByClassName("tick-image")[7].style.visibility="visible";
        document.getElementsByClassName("input-title")[0].style.backgroundColor="#99ffff";
        document.getElementsByClassName("input-note")[0].style.backgroundColor="#99ffff";
        this.setState({
            color: 7
        });
    }

    changeColorToPurple = () => {
        this.disableTicks();
        document.getElementsByClassName("tick-image")[8].style.visibility="visible";
        document.getElementsByClassName("input-title")[0].style.backgroundColor="#d9b3ff";
        document.getElementsByClassName("input-note")[0].style.backgroundColor="#d9b3ff";
        this.setState({
            color: 8
        });
    }

    changeColorToBlue = () => {
        this.disableTicks();
        document.getElementsByClassName("tick-image")[9].style.visibility="visible";
        document.getElementsByClassName("input-title")[0].style.backgroundColor="#99c2ff";
        document.getElementsByClassName("input-note")[0].style.backgroundColor="#99c2ff";
        this.setState({
            color: 9
        });
    }

    render() {
        if(!this.props.isAuth)
            return <div></div>

        const categoryList = this.state.categories.map(category => (
            <option key={category._id} value={category.name}>{category.name}</option>
        ));

        return (
        <div className="add-note">
            <LightSpeed right>
                <div className="heading"> 
                    Add a Note
                </div>
            </LightSpeed>

            

            <form className="form" onSubmit={(e) => this.createNote(e)}>
                <div className="left">
                    <Fade bottom collapse when={this.state.error}>
                        <div className="add-note-error-message">
                            {this.state.error}
                        </div>
                    </Fade>
                    <div className="form-row">
                        <input className="input-title" type="text" value={this.state.title} onChange={this.titleChangeHandler} placeholder="Title"></input>
                    </div>
                    
                    <div className="form-row">
                        <textarea className="input-note" value={this.state.note} onChange={this.noteChangeHandler} placeholder="Your note"></textarea>
                    </div>
                    <div className="submit-button form-row">                
                        <button type="submit" className="btn">Save</button>
                    </div>
                </div> 
                <div className="right">
                    
                    <div className="form-row colors">
                        <div className="colors-row">
                            <div className="white" onClick={this.changeColorToWhite}>
                                <img className="tick-image" src={Tick} alt="Tick"/>
                            </div>
                            <div className="gray" onClick={this.changeColorToGray}>
                                <img className="tick-image" src={Tick} alt="Tick"/>
                            </div>
                            <div className="pink" onClick={this.changeColorToPink}>
                                <img className="tick-image" src={Tick} alt="Tick"/>
                            </div>
                            <div className="darkpink" onClick={this.changeColorToDarkPink}>
                                <img className="tick-image" src={Tick} alt="Tick"/>
                            </div>
                            <div className="brown" onClick={this.changeColorToBrown}>
                                <img className="tick-image" src={Tick} alt="Tick"/>
                            </div>                         
                        </div>
                        <div className="colors-row">
                            <div className="yellow" onClick={this.changeColorToYellow}>
                                <img className="tick-image" src={Tick} alt="Tick"/>
                            </div>
                            <div className="green" onClick={this.changeColorToGreen}>
                                <img className="tick-image" src={Tick} alt="Tick"/>
                            </div>
                            <div className="cyan" onClick={this.changeColorToCyan}>
                                <img className="tick-image" src={Tick} alt="Tick"/>
                            </div>
                            <div className="purple" onClick={this.changeColorToPurple}>
                                <img className="tick-image" src={Tick} alt="Tick"/>
                            </div>
                            <div className="blue" onClick={this.changeColorToBlue}>
                                <img className="tick-image" src={Tick} alt="Tick"/>
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <select value={this.state.selectedCategory} onChange={this.categoryChangeHandler}>
                            {categoryList}
                        </select>
                        <button className="refresh" onClick={(e) => this.refreshCategories(e)}>
                            <img src={Refresh} alt="Refresh" title="Refresh"/>
                        </button>
                    </div> 
                </div>
                
                

                
               

            </form>
        </div>
        );
    }
} 

export default AddNote;
 