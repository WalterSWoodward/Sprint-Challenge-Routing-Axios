import React, { Component } from 'react';
import axios from 'axios';

class SmurfForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      height: ''
    };
    
    this.updateName = this.updateName.bind(this);
    this.updateAge = this.updateAge.bind(this);
    this.updateHeight = this.updateHeight.bind(this);
    this.addSmurf = this.addSmurf.bind(this)
  }

  updateName(event) {
    this.setState({
      name: event.target.value
    });
  }

  updateAge(event) {
    this.setState({
      age: event.target.value
    });
  }

  updateHeight(event) {
    this.setState({
      height: event.target.value
    });
  }

  addSmurf(event) {

    // add code to create the smurf using the api
    event.preventDefault();
    const newSmurf = this.state; 
    axios.post("http://localhost:3333/smurfs", newSmurf)
      .then(response => {
        this.props.getSmurfs();
        console.log('From post:', response);
        console.log('New smurf from post:', response.data)
      })
      .catch(error => {
        console.log(error);
      });
      // Clears inputs
      this.setState({
        name: '',
        age: '',
        height: ''
      })   
  }

  render() {
    return (
      <div className="SmurfForm">
        <form onSubmit={this.addSmurf}>
          <input
            onChange={this.updateName}
            placeholder="name"
            value={this.state.name}
          />
          <input
            onChange={this.updateAge}
            placeholder="age"
            value={this.state.age}
          />
          <input
            onChange={this.updateHeight}
            placeholder="height"
            value={this.state.height}
          />
          <button type="submit">Add to the village</button>
        </form>
      </div>
    );
  }
}

export default SmurfForm;