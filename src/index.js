import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import  ServerAPI from './apis/ServerAPI';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AddTask from './components/AddTask';
import Login from './components/Login';
import Tasks from './components/Tasks';

ReactDOM.render(
  <Router>
      <div>
        <nav id="nav"class="navbar navbar-inverse navbar-fixed-top">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="/">My Daily Tasks</a>
              {
                (
                    window.location.href !== "http://localhost:3000/Tasks" ?
                    <Link id="loginlink" to='/Login'><a class="navbar-brand">Login</a></Link> :
                    <Link id="loginlink" 
                     onClick={
                      axios.get(ServerAPI.url + 'users/logout')
                      .then(res =>{
                        console.log(res);
                      })
                    } 
                    to='/Login'><a class="navbar-brand">LogOut</a></Link>
                )
              }
            </div>
          </div>
        </nav>
        <Route exact path='/' component={App} />
        <Route path='/Login' component={Login} />
        <Route path='/AddTask' component={AddTask} />
        <Route path='/Tasks' component={Tasks} />
      </div>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();