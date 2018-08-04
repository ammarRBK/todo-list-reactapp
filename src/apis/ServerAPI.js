import axios from 'axios';
const ServerAPI= {
    response: "",
    url: 'https://my-daily-tasks.herokuapp.com/api/',
    checkIsLoggedIn: function(){
        // fetch(ServerAPI.url + 'users/checklogin')
        //     .then(function(response){
        //         return response.json();
        //     })
        //     .then(function(res) {
        //         console.log(res);
        //         if(res === "loggedin"){
        //             ServerAPI.response= "True"
        //         }
        //         ServerAPI.response= "False";
        //     });
        axios.get(ServerAPI.url + 'users/checklogin')
        .then(res => function(){
            if(res.data === "loggedin"){ return "True" } return "Hello Ammar";
        })
    }
}

export default ServerAPI;