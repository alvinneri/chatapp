const users = [];

const addUsers = ({id, username}) => {

   

    const existingUser = users.find((user) => user.username === username);

    if(existingUser){

    }

    const user = {
        id : id.trim().toLowerCase(),
        username : username
    }
    users.push(user);

    return {user};
}

const getUser = (id) => {

    id = id.trim().toLowerCase();
    console.log(id);
    
    
    return users.find((user)=> user.id === id);

}

const removeUser =(id) => {
    id = id.trim().toLowerCase();
    const index = users.findIndex(user => user.id === id);
    if(index !== -1){
        return users.splice(index, 1)[0];

    }

}


module.exports = {addUsers, removeUser, getUser}