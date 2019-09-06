
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
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json()
    }).catch(err => {
        Promise.reject(err);
    })
}

export function createRoom(roomName, utils, size) {
    let url = "http://192.168.0.185:8080/api/v1/webApi/addRoom";
    let utilityWater = false;
    let utilityWBoard = false;
    let utilityAC = false;
    let utilityProjector = false;
    let utilitySmTv = false;
    for (let i = 0; i < utils.length; i++) {
        switch (utils[i]) {
            case "projector":
                utilityProjector = true;
                break;
            case "tv":
                utilitySmTv = true;
                break;
            case "ac":
                utilityAC = true;
                break;
            case "board":
                utilityWBoard = true;
                break;
            case "water":
                utilityWater = true
        }
    }

    let roomData = {
        "roomName": roomName,
        "size": size,
        "utilityWater": utilityWater,
        "utilityWBoard": utilityWBoard,
        "utilityAC": utilityAC,
        "utilityProjector": utilityProjector,
        "utilitySmTv": utilitySmTv,
        "createdBy": "90200"
    }
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(roomData), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json()
    }).catch(err => {
        Promise.reject(err);
    })

}

export function logIn(email, password) {
    let url = "http://192.168.0.185:8080/api/v1/webApi/login";
    let data = {
        "email": email,
        "password": password
    }
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json()
    }).catch(err => {
        Promise.reject(err);
    });
}