import React, { Component } from 'react';
import LightSpeed from 'react-reveal/LightSpeed';
import Fade from 'react-reveal/Fade';
import './Heading.css';
import './Form.css';
import './Login.css';

class Login extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            password: '',
            error: null
        }
    }

    emailChangeHandler = (event) => {
        this.setState({
            email: event.target.value,
            error: null
        })
    }
    
    passwordChangeHandler = (event) => {
        this.setState({
            password: event.target.value,
            error:null
        })
    }

    loginFunction = (e) => {
        e.preventDefault();
        fetch('https://sticky-notes-back-end.herokuapp.com/auth/login', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            }, 
            body: JSON.stringify({email: this.state.email, password: this.state.password})
        })
        .then(result => {
            
            if(result.status !== 200)
                throw new Error("mistake in login.js");
            return result;
            
        })
        .then(result => result.json())
        .then(result => {
            
            this.props.setToken(result.token);
            this.props.setIsAuth(true);
            this.props.setUserId(result.userId)
            this.props.addLocalStorage(result.token, result.userId);
            return;
        })
        .then(result => {
            this.props.history.push("/sticky-notes/notes");
        })
        .catch(error => {
            // console.log(error);
            this.setState({
                error: "Invalid email or password."
            });
        
        });
    }


    render() {
        
        return (
            
            <div className="login">
                <LightSpeed right>
                    <div className="heading"> 
                        Login
                    </div>
                </LightSpeed>

                
                <form className="form" onSubmit={(e) => this.loginFunction(e)}>
                    <Fade bottom collapse when={this.state.error}>
                        <div className="error-message">
                           <div> {this.state.error} </div>
                        </div>
                    </Fade>
                    <div className="form-row">
                        <input type="text" value={this.state.email} onChange={this.emailChangeHandler} placeholder="Email"/>
                    </div>
                    <div className="form-row">
                        <input type="password" value={this.state.password} onChange={this.passwordChangeHandler} placeholder="Password"/>
                    </div>
                
                    <div className="submit-button form-row">                
                        <button type="submit" className="btn">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;