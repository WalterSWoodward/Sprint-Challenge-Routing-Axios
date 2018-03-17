import React, { Component } from 'react';
import SmurfForm from './SmurfForm';
import axios from 'axios';
import Smurf from './Smurf';

class Smurfs extends Component {
  constructor(props) {
    super(props);

    this.state = {
        smurfs: [],
    }
    // This just allows the methods below (outside the constructor) to access the this.state (inside the constructor) 
    this.getSmurfs = this.getSmurfs.bind(this)
  }

  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server

  componentDidMount() {
    this.getSmurfs();
    console.log('componentDidMount run successfully')
  }

  getSmurfs = () => {
    axios.get("http://localhost:3333/smurfs")
      .then(response => {
        this.setState({ smurfs: response.data });
        console.log('Smurfs.js state', this.state)
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="Smurfs">
        {/* You can check that this 'getSmurfs()' is being passed by looking in React Dev inside the SmurfForm tag */}
        <SmurfForm getSmurfs={this.getSmurfs}/>
        <h1>Smurf Village</h1>
        <ul>
          { this.state.smurfs.map((smurf) => {
            return <Smurf name={smurf.name} age={smurf.age} height={smurf.height} key={smurf.id}/>;
          })}
        </ul>
      </div>
    );
  }
}

export default Smurfs;