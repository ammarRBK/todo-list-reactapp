import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ServerAPI from '../apis/ServerAPI';

class Tasks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks:[]
    };
  }

  handleClick(){
    console.log("----dskdddddddkkkkkkkks-sssssssssss-dkfffffffffffd--------------fkkkkkk")
    this.props.history.push('/AddTask');
  }

  deleteTask(task){
    console.log('=====> this task will be deleted', task);
    const array= this.state.tasks
    array.splice(array.indexOf(task),1);
    this.setState({tasks: array});
    // axios.post(ServerAPI.url + 'tasks/deleteTask',{})
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
        <table className="table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Adding Date</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tasks.map(elem =>{
              return (<tr>
                        <td>
                          {elem.task}
                        </td>
                        <td>
                          {elem.date}
                        </td>
                        <td>
                          <input type="checkbox" />
                          <p>Mark as Done</p>
                        </td>
                        <td>
                          <button onClick={(e) => this.deleteTask(elem.task)}> Delete </button>
                        </td>
                      </tr>
                      )
              })}
          </tbody>
        </table>
        <button class="btn btn-success" onClick={(e) => this.handleClick(e)}> Add Tasks </button>
      </div>
    );
  }
}
{/* <button class="btn btn-danger" onDoubleClick={this.deletTask(elem.task)}> Delete </button> */}
export default Tasks;