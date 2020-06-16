// import React from 'react';
import {NavLink} from 'react-router-dom';
import Icon from '../images/Icon.png';
import './Navbar.css';

import React, { Component } from 'react';

class Navbar extends Component {

    
    
 
    render() {
        return (
            <div className="navbar-div">
                <div className="left-part">
                    <div className="icon">
                        <img src={Icon} alt="Icon" />
                    </div>
                    <div className="site-name">  Sticky Notes </div>

                    <div className="main-list">
                        <NavLink to="/sticky-notes/" className="link"><div>Home</div></NavLink>
                        {this.props.isAuth ? <NavLink to="/sticky-notes/notes" className="link"><div>Notes</div></NavLink> : <div></div> }

        {this.props.isAuth ? <NavLink to="/sticky-notes/add-note" className="link"><div>Add</div></NavLink> : <div></div> }
                    </div>
                </div>
                
                { !this.props.isAuth ? (
                    <div className="auth-list">
                        <NavLink to="/sticky-notes/auth/login" className="link"><div>Login</div></NavLink>
                        <NavLink to="/sticky-notes/auth/signup" className="link"><div>Sign Up</div></NavLink>
                    </div>
                    )
                    :
                    <div className="auth-list">
                        <NavLink to="/sticky-notes/"><button onClick={this.props.logout} className="logout-button"> Logout </button></NavLink>
                    </div>
                }
                
            </div> 
            
            // <div className="navbar-div">
            //     <div className="left-part">
            //         <div className="site-name">Sticky Notes</div>
            //         <div className="main-list">
            //             <Link to="/add-note" ><div>Add</div></Link>
            //         </div>
            //     </div>
            //     <div className="auth-list">
            //         <div>Sign in</div>
            //     </div>
            // </div>
        )
    
    }
}

export default Navbar;

