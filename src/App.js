import React, { Component } from 'react';
import Routes from '../src/components/Routes';
import TopNavigation from './components/topNavigation';
import SideNavigation from './components/sideNavigation';
import Footer from './components/Footer';
import './index.css';

class App extends Component {
  
  render() {
    if(localStorage.getItem("token") !== null){
      return (
        <div className="flexible-content">
          <TopNavigation /> 
          <SideNavigation />
          <main id="content" className="p-5">
            <Routes />
          </main>
          <Footer />
        </div>
      )
    }else{
      return (
        <div className="flexible-content">
          <main id="content" className="p-5">
            <Routes />
          </main>
        </div>
      )
    }

  }
}

export default App;
