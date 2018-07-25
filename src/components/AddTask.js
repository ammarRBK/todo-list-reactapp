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

  handleChange(event){
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    axios.post( ServerAPI.url+ 'tasks/addTask', { task: this.state.task } )
    .then( res => {
      res.data.message === "task added" ? this.props.history.push('/AddTask'):
      alert("task did not added because unkowen error");
    })
    .catch(err=>{
      console.error(err);
    })
  }

  handleClick(){
    console.error("Hello Man I am Ammar");
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div class="container">
        <h2>Be aware with your tasks because you are using our APP</h2>
        <form onSubmit={this.handleSubmit}>
          <div class="form-group">
            <label> Task: </label>
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
{/* <button onClick={(e) => this.handleClick(e)}>press me </button> */}
export default AddTask;