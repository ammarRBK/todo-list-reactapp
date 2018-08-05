import axios from 'axios';
const ServerAPI= {
    url: 'http://localhost:3000/api/',
    checkIsLoggedIn: function(){
        axios.get(ServerAPI.url + 'users/checklogin')
        .then(res => function(){
            if(res.data === "loggedin"){ return "True" } return "Hello Ammar";
        })
    }
}

export default ServerAPI;