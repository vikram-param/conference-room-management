export function getRooms() {
    let url = "http://192.168.0.185:8080/api/v1/webApi/getRooms";
    return fetch(url).then(res => {
        return res.json();
    }).catch(err => {
        Promise.reject(err);
    })
}