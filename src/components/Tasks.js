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
    console.log(this.props.userFromServer);
    axios.get(ServerAPI.url + `tasks/getTasks`,{_id: this.props.userFromServer._id})
      .then(res => {
        this.setState({ tasks: res.data });
        console.log(this.state.tasks);
      });
  }

  render() {
    const getTasksAll= this.state.tasks.map((task) =>
          <tr>
            <th>{task.task}</th>
            <th>{task.date}</th>
          </tr> 
    )
    return (
      <div class="container">
        <table>
          <tr>
            <th>Task</th>
            <th>Adding Date</th>
          </tr>
          {getTasksAll}
        </table>
      </div>
    );
  }
}

export default Tasks;