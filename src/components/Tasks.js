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
    // console.log(this.props.userFromServer);
    axios.get('http://localhost:3000/api/users')
      .then(res => {
        console.log('==========>Tasks response ',res.data);
        // this.props.userFromServer.tasks.forEach(element => {
        //   this.state.tasks.push(element);
        // });
        this.setState({ tasks: res.data.tasks });
      });   
  }

  render() {
    console.log('----------->Tasks ',this.state.tasks);
    return (
      <div class="container">
        {/* <ul>
          <li>Hello world</li>
          {this.state.tasks.map(task =>{ 
            return (<li>
              {task.task}
              {task.date}
            </li>)
          })}
        </ul> */}
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