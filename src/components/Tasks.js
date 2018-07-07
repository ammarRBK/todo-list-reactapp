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
        <table>
          <tr>
            <th>Task</th>
            <th>Adding Date</th>
          </tr>
          {this.state.tasks.map(elem =>{
            return (<tr>
                      <th>
                        Hello world
                        {elem.task}
                      </th>
                      <th>
                        {elem.date}
                      </th>
                    </tr>)
            })}
        </table>
      </div>
    );
  }
}

export default Tasks;