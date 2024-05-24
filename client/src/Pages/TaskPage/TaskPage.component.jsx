import "./TaskPage.style.css"
import axios from "axios";
import { useEffect, useState } from "react";
import HTTPClient from "../../utils/HTTPClient";
import CreateTask from "../../components/CreateTask/CreateTask.component";
import Encabezado from "../../components/Encabezado/Encabezado.component";

const TaskPage = (props) => {

    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    const toggleTaskCompletion = (index) => {
        if (completedTasks.includes(index)) {
            setCompletedTasks(completedTasks.filter((taskIndex) => taskIndex !== index));
        } else {
            setCompletedTasks([...completedTasks, index]);
        }
    };
    const getTask = () => {
        let client = new HTTPClient();
        client.getTasks()
            .then((response) => {
                setTasks(response.data.tasks)
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
                if (error.response && error.response.status === 401){
                    console.log("Tenemos que refrescar token primero y luego reintentar")
                }
            })
    }

    const createTask = (data) => {
        let client = new HTTPClient();
        client.createTask(data)
            .then((response) => {
                getTask();
            })
            .catch((error) => {
                console.error('Error creating task:', error);
            })
        
    }
    const isDateExpired = (dateString) => {
        const currentDate = new Date();
        const projectDate = new Date(dateString);
        return currentDate > projectDate; 
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); 
    };
    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:5000/task/${taskId}`);
            getTask();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };
    
    useEffect(()=>{
        getTask();
    },[])


    return <div className="content">
        <Encabezado></Encabezado>
        <div className="container-2">
            <div>
                <div>
                    <table className="sub-content">
                        <thead>
                            <tr>
                                <th className="th-1">To Do List</th>
                                <th className="th-1"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <td>
                                {tasks.map((task, index) => (
                                    <div key={index}>
                                    <h3 style={{ textDecoration: completedTasks.includes(index) ? "line-through" : "none" }}>
                                    {task.name}
                                    </h3>
                                    <p className={isDateExpired(task.date) ? 'expired-date' : ''}>Date: {formatDate(task.date)}</p>
                                    </div>
                                ) )}
                            </td>
                            <td>
                                {tasks.map((task, index) => (
                                        <div key={index}>
                                            <div className="button-container">
                                                <button className="other-button1" onClick={() =>{toggleTaskCompletion(index)}}>✔</button>
                                                <button className="other-button2" onClick={() => deleteTask(task._id)}>X</button>
                                            </div>
                                        
                                        </div>
                                    ) )}
                            </td>
                        </tbody>
                    </table>   
                </div>
            </div>

            <div className="sub-content1">   
                <CreateTask createTask={createTask}/>
            </div>
        </div>
        
    </div>
}

export default TaskPage;