import axios from 'axios';
const ServerAPI= {
    url: 'http://localhost:3000/api/',
    checkIsLoggedIn: function(){
        axios.get(ServerAPI.url + 'users/checkLogin')
        .then(function(res){
            if(res.data === "LoggedIn") return "True"
            return "False";
        })
    }
}

export default ServerAPI;