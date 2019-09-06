
export function createUser(userId, userName, password, email, role) {
    let url = "http://192.168.0.185:8080/api/v1/webApi/addUser";
    let userData = {
        "userId": userId,
        "userName": userName,
        "password": password,
        "email": email,
        "role": role,
        "createdBy": "90200"
    }
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(userData), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log(response);
        response.json()
    }).catch(err => {
        console.log(err);
    })
}

// export function createRoom(roomName, utils, size) {
//     let url = "http://192.168.0.185:8080/api/v1/webApi/addUser";
//     let roomData = {
//         roomNa
//     }
// }