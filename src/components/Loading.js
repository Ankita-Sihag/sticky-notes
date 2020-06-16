import React from 'react';
// import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';
import './Loading.css';



const Loading = props => {
    // return <div> loading</div>
    // const { promiseInProgress } = usePromiseTracker();
    // if(!promiseInProgress)
    // {
      // localStorage.setItem('loadingAllNotes', false);
      // return null;
    // }
      // console.log("LOADING INDICATOR !!")
    // localStorage.setItem('loading')
    return (
      // promiseInProgress && 
      <Loader className="loading" type="ThreeDots" color="gray" height="100" width="100" />

    );  
  }

export default Loading;