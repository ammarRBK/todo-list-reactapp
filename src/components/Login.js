import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
    this.handleChange= this.handleChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    this.state.username && this.state.password ? 
    axios.post('users/signin', user)
      .then( response =>{
        console.log(response.data);
        response.data === "user authintecated" ? this.props.history.push('/Tasks') : 
        console.error("cannot login");
        
      })
      .catch(err =>{
        console.error(err);
      })
      : alert("please fillout your information");
  }

  render() {
    return (
      <div class="container">
       <form>
         <div className="form-group">
          <label> Username: </label>
          <input type="text" className="form-control" name="username" 
          value={this.state.username} placeholder="enter your username" required/>
         </div>
         <div className="form-group">
          <label> Password: </label>
          <input type="password" className="form-control" name="password" 
          value={this.state.username} placeholder="enter your password" required/>
         </div>
       </form>
      </div>
    );
  }
}

export default Login;