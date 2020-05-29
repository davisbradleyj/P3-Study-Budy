import axios from 'axios'
export default {
    authenticate: function (loginData) {
        return axios.put("/api/user", loginData)
    },
    verifyUser: function (sessionId) {
        console.log("requesting verify")
        return axios.get("/api/user/verifyUser")
    },

    // ****************** SESSIONS **************************************
    // Gets ALL Sessions for ALL the Classes
    
    getAllParticipatingSessions: function(userid){
        return axios.get(`/api/user/info-session/${userid}/participant-sessions`)
    },
    
    getAllUserSessions: function (userid) {
        return axios.get(`/api/user/info-session/${userid}/allsessions`)
    },

    getSessionsForOneClass: function (classId){
        console.log("calling info-session all one class")
        return axios.get(`/api/user/info-session/${classId}/class-sessions`)
    },

    getHostedSessions: function(userid){
        console.log("get hosting")
        return axios.get(`/api/user/info-session/${userid}/hosting`)
    },

    // ****************** SESSIONS **************************************

    getAllLocations: function () {
        console.log("calling locations")
        return axios.get("/api/user/locations")
    },
    getAllClasses: function (userId) {
        console.log("get all classes for a user")
        return axios.get(`/api/user/allclasses/${userId}/classes`)
    },
    

    // ****************** USERSESSIONS **********************************
    joinSession: function (sessionId) {
        console.log("joining session",sessionId)
        return axios.post(`/api/user/info-session/joinsession`,sessionId)
    },
    leaveSession: function (sessionId) {
        console.log("leaving session",sessionId)
        return axios.delete(`/api/user/info-session/leavesession`,sessionId)
    },
}