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

    this.deletTask= this.deletTask.bind(this);
  }

  componentDidMount() {
    axios.get( ServerAPI.url + 'tasks/getusertasks' )
      .then(res => {
        console.log('==========>Tasks response ',{tasks:res.data.tasks});
        this.setState({ tasks: res.data.tasks });
      });   
  }

  deletTask(task){

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
                          <button class="btn btn-danger" onClick={this.deletTask(elem.task)}> Delete </button>
                        </td>
                        <td>
                          <input type="checkbox" />
                          <p>Mark as Done</p>
                        </td>
                      </tr>)
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Tasks;