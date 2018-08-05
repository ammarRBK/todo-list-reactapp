import axios from 'axios';
const ServerAPI= {
    response: "",
    url: 'https://my-daily-tasks.herokuapp.com/api/',
    checkIsLoggedIn: function(){
        axios.get(ServerAPI.url + 'users/checklogin')
        .then(res => function(){
            if(res.data === "loggedin"){ return "True" } return "Hello Ammar";
        })
    }
}

export default ServerAPI;