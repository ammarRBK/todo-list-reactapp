import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom';

//import components to route between them
import App from './App';
import AddTask from './components/AddTask';
import Login from './components/Login';
import Tasks from './components/Tasks';

//register the worker
import registerServiceWorker from './registerServiceWorker';

//add Router as "Father Component" to route btween the mean components
ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={ App }/>
            <Route path='/myTasks' component={ Tasks }/>
            <Route path='/login' component={ Login }/>
        </div>
    </Router>, document.getElementById('root'));
registerServiceWorker();
