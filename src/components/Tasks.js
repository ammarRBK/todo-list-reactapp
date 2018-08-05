import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import ServerAPI from '../apis/ServerAPI';

class Tasks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks:[],
      isChecked:"still",
      index: null
    };
    this.taskChecked= this.taskChecked.bind(this);
  }

  showMessage(_task,index){
    console.log('=====> this task will be deleted', _task.task, "with index ",index);
    const array= this.state.tasks
    array.splice(index,1);
    this.setState({tasks: array});
    this.state.deleteMessage= "the task [ "+ _task.task + " ] is deleted";
    setTimeout(()=>{
      this.setState( { deleteMessage: "" } );
    },3000);
  }

  deleteTask(task,index){
    axios.post(ServerAPI.url + 'tasks/deleteTask',{oldTask: task})
    .then( _response => {
      console.log("response data------------->",_response.data);
      _response.data.message === 'deleted successfully' ? this.showMessage(task,index) : alert("Error in deleting task");
    })
  }

  taskChecked(task,index,taskStatus){
    console.log(task,index,taskStatus);
    let array= this.state.tasks;
    taskStatus === "still" ?

    axios.post(ServerAPI.url + 'tasks/marktask',{ task: task, newStatus: "done" })
    .then(res =>{
      array[index].done= "done";
      
      res.data === "The task "+ task +" has sitted." ? this.setState({ tasks: array }) : alert(" Cannot set the task ");
    }) :

    axios.post(ServerAPI.url + 'tasks/marktask',{ task: task, newStatus: "still" })
    .then(res =>{
      array[index].done= "still";
      
      res.data === "The task "+ task +" has sitted." ? this.setState({ tasks: array }) : alert(" Cannot set the task ");
    })
  }

  startEdit(task,_index){
    console.log(task);
    this.setState({ index: _index });
    $("#editButton").show();
  }

  saveEdition(){
    var oldTaskIndex= this.state.index;
    const array= this.state.tasks
    const newTask= $("#"+oldTaskIndex).text();
    console.log("THE NEW TASK IS","\n",newTask);
    axios.post(ServerAPI.url + 'tasks/editTask',{oldTask: array[oldTaskIndex].task,
    newTask: newTask
  }).then( _response => {
    console.log(_response);

    if(_response.data === "User task updated"){ 
    array[oldTaskIndex].task= newTask;
    this.setState({ tasks: array });
    console.log("Tasks after Edition=========>","\n",this.state.tasks);
    $("#editButton").hide();
  }else {
    console.log("cannot update the task");
  }
  })  
  }

  componentDidMount() {
    axios.get(ServerAPI.url + 'users/checklogin')
      .then(res =>{
          console.log(res.data);
          res.data === "loggedout" ? this.props.history.push('/Login') :
          $("#editButton").hide();
          axios.get( ServerAPI.url + 'tasks/getusertasks' )
            .then(res => {
              console.log('==========>Tasks response ',{tasks:res.data.tasks});
              this.setState({ tasks: res.data.tasks });
            });
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
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Task</th>
              <th>Adding Date</th>
              <th>Is Done</th>
              <button id="editButton" class="btn btn-success" onClick={()=> this.saveEdition()}>Save Edite</button>
            </tr>
          </thead>
          <tbody id="taskField">
            {this.state.tasks.map((elem,index) =>{
              return (<tr>
                        <td>
                          <h5 id={index} title="press on me to edit"  onClick={()=> this.startEdit(elem.task,index)} contentEditable="true">{elem.task}</h5>
                        </td>
                        <td>
                          {elem.date}
                        </td>
                        <td>
                          {elem.done}
                        </td>
                        <td>
                          <label>Mark as done</label>
                          <input type="checkbox" onChange={()=>this.taskChecked(elem.task,index,elem.done)}/>
                        </td>
                        <td>
                          <button className="btn btn-danger" onClick={(_e) => this.deleteTask(elem,index)}> Delete </button>
                        </td>
                      </tr>
                      )
              })}
          </tbody>
        </table>
        <h2>{this.state.deleteMessage}</h2>
        <Link id="toaddtasks" to='/AddTask'><a id="toaddtasks" data-toggle="tooltip" data-placement="bottom" title="go to add tasks page">Add Task</a></Link>
      </div>
    );
  }
}
export default Tasks;