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

    this.state.deleteMessage= "the task"+ _task.task + "is deleted";
  }

  deleteTask(task,index){
    axios.post(ServerAPI.url + 'tasks/deleteTask',{oldTask: task})
    .then( _response => {
      console.log("response data------------->",_response.data);
      _response.data.message === 'deleted successfully' ? this.showMessage(task,index) : alert("Error in deleting task");
    })
  }

  taskChecked(){
    console.log(this.state.isChecked);
    this.state.isChecked === "still" ? this.setState({ isChecked: "done" }) : this.setState({ isChecked: "still" });
  }

  startEdit(task,_index){
    console.log(task);
    this.setState({ index: _index });
    $("#editButton").show();
  }

  saveEdition(){
    var oldTaskIndex= this.state.index;
    const newTask= $("#"+oldTaskIndex).text();
    console.log("THE NEW TASK IS","\n",newTask);
    const array= this.state.tasks;
    array[oldTaskIndex].task= newTask;
    this.setState({ tasks: array });
    console.log("Tasks after Edition=========>","\n",this.state.tasks);
    $("#editButton").hide();
    
  }

  componentDidMount() {
    $("#editButton").hide();
    axios.get( ServerAPI.url + 'tasks/getusertasks' )
      .then(res => {
        console.log('==========>Tasks response ',{tasks:res.data.tasks});
        this.setState({ tasks: res.data.tasks });
      });   
  }

  render() {
    return (
      <div class="container">
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
                          <h3 id={index} title="press on me to edit"  onClick={()=> this.startEdit(elem.task,index)} contentEditable="true">{elem.task}</h3>
                        </td>
                        <td>
                          {elem.date}
                        </td>
                        <td>
                          {this.state.isChecked}
                        </td>
                        <td>
                          <input type="checkbox" onChange={this.taskChecked}/>
                          <p>Mark as Done</p>
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
        <Link id="toAddTasks" to='/AddTask'><a class="" data-toggle="tooltip" data-placement="bottom" title="go to add tasks page">Add Task</a></Link>
      </div>
    );
  }
}
export default Tasks;