import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AddTask extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div class="container">
        <h1>Welcome from AddTask</h1>
      </div>
    );
  }
}

export default AddTask;