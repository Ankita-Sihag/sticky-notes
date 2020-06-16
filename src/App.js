import React, { Component } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import AddNote from './components/AddNote';
import AllNotes from './components/AllNotes';
import Signup from './components/Signup';
import Login from './components/Login';
import SingleNote from './components/SingleNote';
import EditNote from './components/EditNote';
import Category from './components/Category';
import HomePage from './components/HomePage';



class App extends Component {

  constructor(props) {
    super(props);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    this.state = {
      isAuth: false,
      userId: userId,
      token: token
    }
    if(token)
      this.state.isAuth = true;
  }


  logout = () => {
    this.setState({ isAuth: false, token: null , userId:null});
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  addLocalStorage = (token, userId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }

  setToken = (token) => {
    this.setState({token: token});
    // console.log("token changed to " + token);
  }
  
  setUserId = (userId) => {
    this.setState({userId: userId});
  }

  setIsAuth = (isAuth) => {
    this.setState({isAuth: isAuth});
  }

  setOldTitle = (title) => {
    localStorage.setItem('oldTitle', title);
  }

  setOldNote = (note) => {
    localStorage.setItem('oldNote', note);
  }

  setOldCategory = (category) => {
    localStorage.setItem('oldCategory', category);
  }

  setOldColor = (color) => {
    localStorage.setItem('oldColor', color);
  }
  
  render() {
    // console.log("isAuth" + this.state.isAuth);
    // return <div>App.js</div>
    return (
      <div className="main-div-app">
        
        <BrowserRouter>
          <Navbar isAuth={this.state.isAuth} logout={this.logout}/>

          <div className="main-body-app">
            <Route path="/" render={props => (<Category {...props} isAuth={this.state.isAuth} token={this.state.token} />)}/>


            <Switch>
            {/* <ErrorHandler > */}
              <Route exact path="/sticky-notes/"  render={props => (<HomePage {...props} />)}/>

              <Route exact path="/sticky-notes/notes"  render={props => (<AllNotes {...props} isAuth={this.state.isAuth} token={this.state.token} categoryResults={false} allNotes={true} search={false}/>)}/>

              <Route exact path="/sticky-notes/search/:searchValue"  render={props => (<AllNotes {...props} isAuth={this.state.isAuth} token={this.state.token} categoryResults={false} allNotes={true} search={true} />)}/>

              <Route exact path="/sticky-notes/category-notes/:categoryName"  render={props => (<AllNotes {...props} isAuth={this.state.isAuth} token={this.state.token} categoryResults={true} allNotes={false} search={false} />)}/>

              <Route exact path="/sticky-notes/search-category-notes/:categoryName/:searchValue"  render={props => (<AllNotes {...props} isAuth={this.state.isAuth} token={this.state.token} categoryResults={true} allNotes={false} search={true} />)}/>

              <Route exact path="/sticky-notes/add-note" render={props => (<AddNote {...props} isAuth={this.state.isAuth} token={this.state.token} userId={this.state.userId} />)} />

              <Route exact path="/sticky-notes/edit-note/:noteId" render={props => (<EditNote {...props} isAuth={this.state.isAuth} token={this.state.token} />)} />

              <Route exact path="/sticky-notes/notes/:noteId" render={props => (<SingleNote {...props} token={this.state.token} setOldNote={this.setOldNote} setOldTitle={this.setOldTitle}  setOldCategory={this.setOldCategory} setOldColor={this.setOldColor} />) } />

              <Route exact path="/sticky-notes/category-notes/:categoryId" render={props => (<SingleNote {...props} token={this.state.token} setOldNote={this.setOldNote} setOldTitle={this.setOldTitle}  setOldCategory={this.setOldCategory}/>) } />

              <Route exact path="/sticky-notes/auth/signup" component={Signup} />
            
              <Route exact path="/sticky-notes/auth/login" render={props => (<Login {...props} setToken={this.setToken} setIsAuth={this.setIsAuth} setUserId={this.setUserId} addLocalStorage={this.addLocalStorage}/>)} />
              
              <Route path="/"  render={props => (<HomePage {...props} />)}/>

            {/* </ErrorHandler> */}
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

// class App extends Component {
//   render() {
//     return (
//       <React.Fragment>
//       <Navbar />
//       <Switch>
//         <Route exact path="/" component={AllNotes} />
//         <Route path="/add-note" component={AddNote} />
//         <Route component={Error} />
//       </Switch>
//     </React.Fragment>
//     );
//   }
// }
