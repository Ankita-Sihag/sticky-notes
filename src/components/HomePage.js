import React from 'react';
import './HomePage.css';
import HomePageBackground from '../images/HomePageBackground.jpg';


import AllNotesDemo from '../images/AllNotesDemo.png';
import CategoriesDemo from '../images/CategoriesDemo.png';
import AddNoteDemo from '../images/AddNoteDemo.png';
import Ankita from '../images/Ankita.jpg';
import Gmail from '../images/Gmail.png';
import Github from '../images/Github.png';

import Zoom from 'react-reveal/Zoom';
import Slide from 'react-reveal/Slide';
import Flip from 'react-reveal/Flip';


const HomePage = () => {
  return (

    <div className="homepage">
        <div className="background">
            <img src={HomePageBackground} alt="" />
        </div>

        {/* <Fade {...fadeProperties} className="slide-container" >
            <div className="each-fade">
                <div className="image-container">
                <img src={i1} />
                </div>
            </div>
            <div className="each-fade">
                <div className="image-container">
                <img src={i2} />
                </div>
            </div>
            <div className="each-fade">
                <div className="image-container">
                <img src={i3} />
                </div>
            </div>
            <div className="each-fade">
                <div className="image-container">
                <img src={i4} />
                </div>
            </div>
            <div className="each-fade">
                <div className="image-container">
                <img src={i5} />
                </div>
            </div>
            <div className="each-fade">
                <div className="image-container">
                <img src={i6} />
                </div>
            </div>
            <div className="each-fade">
                <div className="image-container">
                <img src={i7} />
                </div>
            </div> */}
        {/* </Fade> */}

        {/* <Zoom top> */}
            <div className="home-page-heading">
                <Zoom left delay={150}>
                    S
                </Zoom>
                <Zoom left delay={120}>
                    t
                </Zoom>
                <Zoom left delay={90}>
                    i
                </Zoom>
                <Zoom left delay={60}>
                    c
                </Zoom>
                <Zoom left delay={30}>
                    k
                </Zoom>
                <Zoom left delay={0}>
                    y
                </Zoom>
                <Zoom right delay={30}>
                    N
                </Zoom>
                <Zoom right delay={60}>
                    o
                </Zoom>
                <Zoom right delay={90}>
                    t
                </Zoom>
                <Zoom right delay={120}>
                    e
                </Zoom>
                <Zoom right delay={150}>
                    s
                </Zoom>

            </div>
        {/* </Zoom> */}

        <div className="just-go-digital">
            <Slide left >
                <div className="just">
                    Just
                </div>
            </Slide>
            <Slide right delay={300}>
                <div className="go">
                    Go
                </div>
            </Slide>
            <Slide left delay={600}>
                <div className="digital">
                    Digital
                </div>
            </Slide>
            <Slide right delay={600}>
                <div className="now">
                    Now !!
                </div>
            </Slide> 
        </div>

        <div className="add-note-div">
            <Zoom left>
                <div className="text">
                    Create <br/> new notes
                </div>
            </Zoom>
            <Flip right>
                <div className="image">
                    <img src={AddNoteDemo} alt=""/>
                </div>
            </Flip>
        </div>

        <div className="create-categories-div">
            <Flip left>
                <div className="image">
                    <img src={CategoriesDemo} alt=""/>
                </div>
            </Flip>
            <Zoom right>
                <div className="text">
                    Arrange into <br/> categories
                </div>
            </Zoom>
        </div>

        <div className="all-notes-div">
            <Zoom left>
                <div className="text">
                    Build your <br/> own wall
                </div>
            </Zoom>
            <Flip right>
                <div className="image">
                    <img src={AllNotesDemo} alt=""/>
                </div>
            </Flip>
        </div>
        <div className="line">
            <hr/>
        </div>
        <div className="coded">
            <Slide left>
                <div className="text">
                    <div> Coded by : Ankita Sihag </div>
                    <div className="email"> 
                        <div className="icon">
                            <img src={Gmail} alt="" />
                        </div>
                        <div className="data">
                            ankitasihag2001@gmail.com
                        </div>
                    </div>
                    <div className="github"> 
                        <div className="icon">
                            <img src={Github} alt="" />
                        </div>
                        <div className="data">
                            https://github.com/Ankita-Sihag
                        </div>
                    </div>
                </div>
            </Slide>
            <Slide right>
                <div className="personAbout">
                    <div className="imgBoxAbout">
                        <img src={Ankita} alt="Ankita"/>
                    </div>
                    <div className="nameAbout">
                        <p>Ankita Sihag</p>
                    </div>
                </div>
            </Slide>

        </div>
       
    </div>
    
  )
}



export default HomePage;
