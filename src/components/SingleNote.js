import React, { Component } from 'react';
import Loading from './Loading';
import './SingleNote.css';
import './Heading.css';
import Delete from '../images/Delete.png';
import Edit from '../images/Edit.png';


class SingleNote extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            title: '',
            note: '',
            createdAt: '',
            updatedAt: '',
            category: 'Uncategorized',
            color: 0,
            noteId: null,
            error: null,
            loading: true
        }
    }
    
    componentDidMount = () => {
        const path = window.location.pathname;
        const noteId = path.split("/")[3];
        fetch("https://sticky-notes-back-end.herokuapp.com/notes/" + noteId, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer '+ this.props.token
            }
        })
        .then(result => {
            if(result.status !== 200)
                throw new Error("Cannot fetch data");
            return result.json();
        })
        .then(result => {
            // console.log("after fetching single post data");
            // console.log(result);
            this.setState({
                title: result.title,
                note: result.note,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt,
                category: result.category,
                noteId: result._id,
                color: result.color,
                loading: false
            });

        })
        .catch(error => {
            this.setState({
                error: 'Unable to fetch data'
            });
        });
    }

    editNote = (e) => {
        e.preventDefault();
        this.props.setOldTitle(this.state.title);
        this.props.setOldNote(this.state.note);
        this.props.setOldCategory(this.state.category);
        this.props.setOldColor(this.state.color);
        this.props.history.push("/sticky-notes/edit-note/" + this.state.noteId);
    }

    deleteNote = (e, noteId) => {
        e.preventDefault();
        document.getElementById("delete-note-button").style.display = "none";

        fetch('https://sticky-notes-back-end.herokuapp.com/delete-note/' + this.state.noteId, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer '+ this.props.token
            }
        })
        .then(result => {
            if(result.status !== 200)
                throw new Error("Unable to delete");
            this.props.history.push("/sticky-notes/notes");
        })
        .catch(error => {
            document.getElementById("delete-note-button").style.display = "block";

            this.setState({
                error: "Unable to delete"
            });
        })
    }

    render() {
        if(this.state.error)
            return <div className="single-note"><div className="message">{this.state.error}</div></div>;
        
        if(this.state.loading)
            return <div className="single-note"> <Loading/> </div> 

        const colorsArr = ["white", "#bfbfbf", "#ffcccc", "#ff9999", "#ffbf80", "#ffff99", "#bbff99", "#99ffff", "#d9b3ff", "#99c2ff"];

        // console.log(this.state.note.toString());
        return (
            <div className="single-note">
                <div className="top">
                    <div className="dates">
                        <div className="created"><span> Created : </span> {this.state.createdAt} </div>
                        <div className="updated"><span> Updated : </span> {this.state.updatedAt} </div>
                        <div className="category"><span> Category : </span> {this.state.category} </div>
                    </div>
                    <div className="single-note-heading">
                        {this.state.title}
                    </div>
                </div>
                <div className="actions">
                    <div className="edit" onClick={(e) => this.editNote(e)}>
                        <img src={Edit} alt="Edit" title="Edit"/>
                    </div>
                    <div className="delete" onClick={(e) => this.deleteNote(e)}>
                        <img src={Delete} alt="Delete" title="Delete" id="delete-note-button"/>
                    </div>
                </div>
                
                <div className="box" style={{backgroundColor: colorsArr[this.state.color] }}>
                    <div className="title">
                        {this.state.title}
                    </div>
                    <div className="note">
                        {this.state.note}
                    </div>
                   
                </div>
            </div>
        );
    }
}

export default SingleNote;