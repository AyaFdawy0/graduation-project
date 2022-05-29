import React from 'react';
import Header from './components/Header';
import Feature from './components/Feature';
import About from './components/About/About';
import Footar from './components/Footar';
import './indexlanding.css'

function Landing() {
  return (
    <div className="App">
 
     <Header/>
     <Feature/>
     {/* <About /> */}
     <Footar/>
       
    </div>
  );
}

export default Landing;