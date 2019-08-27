import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import SignIn from './components/signIn/SignIn';
import Register from './components/register/Register';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import './App.css';

// Particles background settings
const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }   
  }
}

// The default initial state of the app
const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
    }  

  // Load user data when signing in or registering
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    }})
  }

  // Calculate box position around detected face
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  // Set state box position info to be used in FaceRecognition
  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  // constructor and render are React prebuilt methods, so to ensure "this" in our
  // custom methods works the same use arrow function syntax.
  // Updates the state input property to be what the user put in as image URL in the ImageLinkForm
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  // When the user submits an image to be detected
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      // fetch backend imageurl endpoint and post input image URL
      fetch("https://thawing-reaches-89716.herokuapp.com/imageurl", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              input: this.state.input,
            })
          })
      // Convert response to JSON
      .then(response => response.json())
      // If there is a response, fetch backend image endpoint and put the image to be displayed
      .then(response => {
        if (response) {
          fetch("https://thawing-reaches-89716.herokuapp.com/image", {
            method: "put",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              id: this.state.user.id,
            })
          })
          .then(response => response.json())
          // Set count to be displayed to the value of the users entries
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }));
          })
          .catch(console.log);
        }     
        // Set box position info based on response from inputted image   
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  // Update route property of state and set other properties accordingly
  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
      route = "signin";
    } else if (route === "home") {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  // 
  render() {
    // Deconstructed so no need to write this.state.isSignedIn etc.
    const { isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
        {/* Always render Particles background and Navigation */}
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />         
        {/* If home, render ImageLinkForm and FaceRecognition, otherwise render SignIn form or Register form */} 
        { route === "home" 
          ? <div>
              <Logo />  
              <Rank name={this.state.user.name} entries={this.state.user.entries} />    
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          : (            
              route === "signin" 
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )          
        }
      </div>
    );
  }
}

export default App;
