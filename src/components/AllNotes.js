import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from "react-promise-tracker";
import LightSpeed from 'react-reveal/LightSpeed';

import './AllNotes.css';
import './Heading.css';
import Search from '../images/Search.png';


// import { usePromiseTracker } from "react-promise-tracker";
// const { promiseInProgress } = usePromiseTracker();





const AllNotes = (props) => {

    const [notesArr, setNotesArr] = useState([]);
    const [error, setError] = useState(null);
    const [categoryResults, setCategoryResults] = useState(props.categoryResults);
    const [categoryName, setCategoryName] = useState(null);
    const [allNotes, setAllNotes] = useState(props.allNotes);
    const [search, setSearch] = useState(props.search);
    const [searchValue, setSearchValue] = useState("");
    const [prevSearchValue, setPrevSearchValue] = useState(null);
    const { promiseInProgress } = usePromiseTracker();

    const viewNote = (e, noteId) =>{
        e.preventDefault();
        props.history.push("/sticky-notes/notes/" + noteId);
    }
    /*
    const deleteNote = (e, noteId) => {
        e.preventDefault();
        trackPromise(
        fetch('http://localhost:8080/delete-note/' + noteId, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer '+ props.token
            }
        })
        .then(result => {
            if(result.status !== 200)
                throw new Error("Unable to delete");
            // this.componentDidMount();
            fetchData();
            
        })
        .catch(error => {
            setError("Unable to delete");
        }));
    };
    */

    const getCategoryName = () => {
        try{
            const path = window.location.pathname;
            return path.split("/")[3].replace(/%20/g, " ");
        }
        catch{
            return null;
        }
    }
    
    const getSearchValue = () => {
        try{
            return props.match.params.searchValue;
        }
        catch{
            return null;
        }
    }

    const fetchData = () => {
        // console.log("in fetch data");
        // setSearchValue("");
        // setSearch(false);
        if(props.isAuth)
        {
            if(!props.search)   
                setSearchValue("");
            let url = "https://sticky-notes-back-end.herokuapp.com/all-notes";
            if(props.categoryResults && !props.search){           
                url = "https://sticky-notes-back-end.herokuapp.com/category-notes/"+getCategoryName() ;
                // setSearchValue("");
            }
            else if(props.allNotes && props.search){
                url =  "https://sticky-notes-back-end.herokuapp.com/search/" + getSearchValue(); 
            }
            else if(props.categoryResults && props.search){
                url = "https://sticky-notes-back-end.herokuapp.com/search-category-notes/"+ props.match.params.categoryName +"/" + getSearchValue();
            }
            // console.log("about to fetch notes")
            trackPromise(
            fetch(url, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer '+ props.token
                }
            })
            .then(result => {
                // console.log("got result");
                // console.log(result);
                if(result.status !== 200)
                    throw new Error("Error in fetchig");
                return result;
            })
            .then(result => result.json())
            .then(result => {
                
                // console.log("in cons");
                // console.log(typeof(result));
                // console.log(this.state);
                setNotesArr(result);
                setCategoryName(getCategoryName());
                setPrevSearchValue(getSearchValue());
                setCategoryResults(props.categoryResults);
                setAllNotes(props.allNotes);
                setSearch(props.search);

                // console.log("state set in did update");
                // return result;
            })
            .catch(err => {
                setError("Cannot fetch notes");
            }));
        }
    }

    const searchNotes = (e) => {
        if(searchValue === "")
            return;
        e.preventDefault();
        if(allNotes)
            props.history.push("/sticky-notes/search/" + searchValue);
        else    
            props.history.push("/sticky-notes/search-category-notes/"+ categoryName +"/" + searchValue);
        /*
        if(props.isAuth)
        {
            let url = "http://localhost:8080/";
            if(props.categoryResults)
            {                
                url = "http://localhost:8080/category-notes/"+getCategoryName() ;
            }
            
            trackPromise(
            fetch(url, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer '+ props.token
                },
                method: "POST",
                body: JSON.stringify({searchValue: searchValue})
            })
            .then(result => {
                // console.log("got result");
                // console.log(result);
                if(result.status !== 200)
                    throw new Error("Error in fetchig");
                return result;
            })
            .then(result => result.json())
            .then(result => {
                
                console.log("in cons");
                // console.log(typeof(result));
                // console.log(this.state);
                setNotesArr(result);
                setSearchValue("");
                // setCategoryName(getCategoryName());
                // setCategoryResults(props.categoryResults);
                // setAllNotes(props.allNotes);
                // console.log("state set in did update");
                // return result;
            })
            .catch(err => {
                setError("Cannot fetch notes");
            })); 
        }
        */
    }


    useEffect(() => {
            if(getSearchValue() !== prevSearchValue)
            {
                // console.log("in effect");
                // console.log(getSearchValue());
                // console.log(prevSearchValue);
                fetchData();
            }
        
        if((props.allNotes !== allNotes) || (props.categoryResults !== categoryResults) || (categoryName !== getCategoryName()) ){
            fetchData();
    }});
    
    if(error)
        return <div className="message">Error in fetching notes</div>

    if(!props.isAuth){
        return <div className="message">Login to see the notes</div> 
    }

    

    try{
        // console.log(this.state.notesArr);
    
        
        
        const CHAR_ON_A_NOTE = 60;
        const colorsArr = ["white", "#bfbfbf", "#ffcccc", "#ff9999", "#ffbf80", "#ffff99", "#bbff99", "#99ffff", "#d9b3ff", "#99c2ff"];

        const list = notesArr.map(note => {
            
            let note_to_be_displayed = "";

            
        
            {
                let enter_divisions = note.note.split("\n");
                let left_char = CHAR_ON_A_NOTE;
                var i;
                for(i=0; i<enter_divisions.length; i++)
                {
                    if(enter_divisions[i].length > left_char)
                    {
                        note_to_be_displayed += enter_divisions[i].substring(0,left_char);
                        left_char = 0;
                        note_to_be_displayed += '.......';
                        break;
                    }
                    else
                    {
                        note_to_be_displayed += enter_divisions[i] + "\n";
                        let r = enter_divisions[i].length/15;
                        left_char -= 15*(r+1);
                        if(left_char <=0 )
                        {
                            if(i !== enter_divisions.length-1)
                                note_to_be_displayed += '.......';
                            break;
                        }
                    }
                }
                
            }

            
            

            return(
            <li key={note._id} style={{backgroundColor: colorsArr[note.color] }}>
                <div className="box" onClick={(e) => viewNote(e, note._id)} >
                    <div className="title">
                        {note.title}
                    </div>
                    <div className="note">
                        {note_to_be_displayed}
                    </div>
                </div>
                
                {/* <button className="delete" onClick={(e) => deleteNote(e,note._id)}>
                    <img src={Delete} alt="Del" title="Delete"/>    
                </button> */}
                
            </li>)});

        let heading;
        if(allNotes)
            heading = "All Notes";
        else if(categoryResults)
            heading =  categoryName;
        else   
            heading = "Notes";
        
        let subheading="";
        if(search){
            subheading = "Search results for '" + props.match.params.searchValue + "'";
            // fetchData();
        }
       
        // console.log(list);
        // console.log("rendered");
     
        return (
            <div className="allNotes">
                <div className="top"> 
                    <LightSpeed right>
                        <div className="heading"> {heading} </div>
                    </LightSpeed>
                    
                    
                    <div className="search"> 
                        <form onSubmit={(e) => searchNotes(e)} > 
                            <label> Search your notes </label>
                            <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} maxLength="15"/>
                            <button type="submit">
                                <img src={Search} alt="Search" title="Search"/>
                            </button>
                        </form>
                        <div className="subheading"> {subheading} </div>

                    </div>
                   
                </div>
                
            <br/>
            
            {promiseInProgress ? 
                <Loading/> :

                <div className="list-of-notes">
                    {list.length ? list : <div className="message">No notes</div>}
                </div>
            }

            </div>
        );
    }
    catch{
        return <div className="message"> Unable to fetch notes</div>
    }
    
};

export default AllNotes;










  
