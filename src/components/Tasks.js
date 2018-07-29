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
      isChecked:"still"
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

  startEdit(){
    $( `<button id="savebutton" onclick="this.taskChecked()">SAVE</button>` ).insertAfter( "#task" );
  }

  componentDidMount() {
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
            </tr>
          </thead>
          <tbody id="taskField">
            {this.state.tasks.map((elem,index) =>{
              return (<tr>
                        <td>
                          <h3 id="task" title="press on me to edit" defaultValue={elem.task} onClick={()=> this.startEdit()}>{elem.task}</h3>
                          
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