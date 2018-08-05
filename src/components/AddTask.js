import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ServerAPI from '../apis/ServerAPI';

class AddTask extends Component {

  constructor(props) {
    super(props);
    this.state = {
      task:""
    };
    this.handleChange= this.handleChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }
//handle the input changes
  handleChange(event){
//assign the state of the same name of the input to the same text of the input.
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    axios.post( ServerAPI.url+ 'tasks/addTask', { task: this.state.task } )
    .then( res => {
      res.data.message === "task added" ? alert("The task "+this.state.task+" added to your tasks!!!"):
      alert("task did not added because unkowen error");
    })
    .catch(err=>{
      console.error(err);
    })
  }

  componentDidMount() {
//send request to check if the user is logged in to let him continue
    axios.get(ServerAPI.url + 'users/checklogin')
      .then(res =>{
          console.log(res.data);
          res.data === "loggedout" ? this.props.history.push('/Login') :
          console.log("User Logged in");
      }) 
  }

  render() {
    return (
      <div >
        <nav id="nav"class="navbar navbar-inverse navbar-fixed-top">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="/">My Daily Tasks</a>
              <a class="navbar-brand" id="loginlink" onClick={
                  ()=>axios.get(ServerAPI.url + 'users/logout')
                      .then(res =>{
                        this.props.history.push('/Login')
                      })}>Log Out</a>
            </div>
          </div>
        </nav>
        <center><h2>Be aware with your tasks because you are using our APP</h2></center>
        <form onSubmit={this.handleSubmit}>
          <div class="form-group">
            <label> <b>Task:</b> </label>
            <input type="text" className="form-control" name="task" 
            value={this.state.task} placeholder="Enter your Task" 
            onChange={this.handleChange} required/>
          </div><br/>
          <button type="submit" className="btn btn-default">Submit Task</button>
        </form>
      </div>
    );
  }
}
export default AddTask;