import React, { Component } from 'react';
import './Sticky.css';

class Sticky extends Component {
    render() {
        return (
            <div className="sticky-bar">
                <div className="sticky-box first">
                    <div className="text">
                        S
                    </div>
                </div>
                <div className="sticky-box second">
                    <div className="text">
                        T  
                    </div>
                </div>
                <div className="sticky-box third">
                    <div className="text">
                        I
                    </div>
                </div>
                <div className="sticky-box fourth">
                    <div className="text">
                        C
                    </div>
                </div>
                <div className="sticky-box fifth">
                    <div className="text">
                        K
                    </div>
                </div>
                <div className="sticky-box sixth">
                    <div className="text">
                        Y
                    </div>
                </div>

            </div>
        );
    }
}

export default Sticky;