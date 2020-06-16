import React, { Component } from 'react';
import LightSpeed from 'react-reveal/LightSpeed';
import Fade from 'react-reveal/Fade';
import './Heading.css';
import './Form.css';
import './Login.css';


class Signup extends Component {

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
            error: null
        })
    }

    createAccount = (e) => {
        e.preventDefault();
        fetch('https://sticky-notes-back-end.herokuapp.com/auth/signup', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({email: this.state.email, password: this.state.password})
        })
        .then(result => {
            if(result.status !== 200)
                throw result.json();
            return result.json();
        })
        .then(result => {
            console.log("changing the url to login from signup");
            this.props.history.push("/sticky-notes/auth/login");
        })
        .catch(error => {
            error.then(e => {
                this.setState({
                    error: e.message
                });
            });

        });
        
    }


    render() {
        return (
            <div className="signup">
                <LightSpeed right>
                    <div className="heading"> 
                        Sign up
                    </div>
                </LightSpeed>

               
                               
                <form className="form" onSubmit={(e) => this.createAccount(e)}>
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
                        <button type="submit" className="btn">Sign up</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Signup;