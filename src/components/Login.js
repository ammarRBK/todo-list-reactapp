import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ServerAPI from '../apis/ServerAPI';

import Tasks from '../components/Tasks';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      userFromServer: {},
      isLoggedIn: false
    }
    this.handleChange= this.handleChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }

  showComponent(){
    if(this.state.isLoggedIn === false)
    {
      return <div class="container">
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
        <label> Username: </label>
        <input type="text" className="form-control" name="username" 
        value={this.state.username} placeholder="Enter your username"
        onChange={this.handleChange} required/>
        </div>
        <div classammaName="form-group">
        <label> Password: </label>
        <input type="password" className="form-control" name="password" 
        value={this.state.password} placeholder="Enter your password" 
        onChange={this.handleChange} required/>
        </div>
        <button type="submit" className="btn btn-default">Submit Login</button>
      </form>
    </div>
   }
     return <Tasks userFromServer={this.state.userFromServer}/>
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  afterAuthUser(){
    this.state.isLoggedIn= true;
    // this.props.history.push('/Tasks');
  };

  handleSubmit(event){
    event.preventDefault();
    const user={
      username: this.state.username,
      password: this.state.password
    };
    user.username && user.password? 
    axios.post(ServerAPI.url + 'users/signin', user)
      .then( response =>{
        this.setState({userFromServer: response.data});
        response.data.message === "user authintecated" ? 
         this.afterAuthUser() : 
        console.error("cannot login");
        
      })
      .catch(err =>{
        console.error(err);
      })
      : alert("please fillout your information");
  }
  render() {
    return (
      this.showComponent()
    );
  }
}

export default Login;