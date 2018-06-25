import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

//import components to route between them
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AddTask from './components/AddTask';
import Login from './components/Login';
import Tasks from './components/Tasks';

ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={ App }/>
            <Route path='/myTasks' component={ Tasks }/>
            <Route path='/login' component={ Login }/>
        </div>
    </Router>, document.getElementById('root'));
registerServiceWorker();
