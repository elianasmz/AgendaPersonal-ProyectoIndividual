import axios from "axios";

class HTTPClient {
    constructor(token){
        this.instance = axios.create({
            baseURL: "http://localhost:5000",
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}` 
            }
        })
    }

    login(email, password){
        return this.instance.post("/login", {
            email,
            password
        })
    }

    register(data){
        return this.instance.post("/register/", data)
    }
    createTask(data){
        return this.instance.post("/task/", data)
    }
    getTasks(){
        return this.instance.get("/task/")
    }
    createEvent(data){
        return this.instance.post("/events/", data)
    }
    getEvents(){
        return this.instance.get("/events/")
    }
    createClass(data){
        return this.instance.post("/class/", data)
    }
    getClasses(){
        return this.instance.get("/class/")
    }
    deleteClass(classId,data){
        return this.instance.delete(`/class/${classId}`,data);
    }
}

export default HTTPClient;