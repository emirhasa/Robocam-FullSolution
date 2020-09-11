import utils from './utils';

const auth = {

    login: async (username, password, callback) => {
        fetch(utils.baseUrl + "/Auth/Login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "username": username, "password": password })
        }).then(response => {
            if (!response.ok) throw new Error();
        }).then(() => { console.log("Logged in!"); callback(true); })
            .catch(() => { console.log("Failed logging in!"); callback(false); })
    },

    logout: async () => {
        fetch(utils.baseUrl + "/Auth/Logout", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (!response.ok) throw new Error();
        }).then(() => { console.log("Logged out!"); return true; })
            .catch(() => { console.log("Error logging out!"); return false; })
    },

    getLoggedUser: async (callback) => {
        fetch(utils.baseUrl + "/Auth/GetLoggedUserProfile", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (!response.ok) throw new Error();
            return response.json();
        }).then((data) => { callback(data) })
            .catch(() => { callback(null) })
    }

}

export default auth;