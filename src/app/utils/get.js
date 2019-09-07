export function getRooms() {
    let url = "http://192.168.0.185:8080/api/v1/webApi/getRooms";
    return fetch(url).then(res => {
        return res.json();
    }).catch(err => {
        Promise.reject(err);
    })
}
export function getBookingsByUser(userId) {
    let url = `http://192.168.0.185:8080/api/v1/webApi/allBookingById?userId=${userId}`;
    return fetch(url).then(res => {
        return res.json();
    }).catch(err => {
        Promise.reject(err);
    })
}

export function userAuthorizedForBooking(userId) {
    let url = `http://192.168.0.185:8080/api/v1/webApi/userAuthorizedForBooking?userId=${userId}`;
    return fetch(url).then(res => {
        return res.json();
    }).catch(err => {
        Promise.reject(err);
    })
}
export function getMoM(bookingId) {
    let url = `http://192.168.0.185:8080/api/v1/webApi/getMoM?bookingId=${bookingId}`;
    return fetch(url).then(res => {
        return res.json();
    }).catch(err => {
        Promise.reject(err);
    })
}