import React, { useState, useEffect } from "react";
import CreateClass from "../../components/CreateClass/CreateClass.component";
import HTTPClient from "../../utils/HTTPClient";
import Encabezado from "../../components/Encabezado/Encabezado.component"
import "./ClassPage.style.css"
import axios from "axios";
const ClassPage = () => {
    const [classes, setClasses] = useState([]);

    // Función para obtener las clases
    const getClasses = () => {
        let client = new HTTPClient();
        client.getClasses()
            .then((response) => {
                setClasses(response.data.classes)
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
                if (error.response && error.response.status === 401){
                    console.log("Tenemos que refrescar token primero y luego reintentar")
                }
            })
    };

    // Función para crear una nueva clase
    const createClass = (data) => {
        let client = new HTTPClient();
        client.createClass(data)
            .then((response) => {
                getClasses();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const compareClassesByTime = (classA, classB) => {
        const hourA = parseInt(classA.hour, 10);
        const hourB = parseInt(classB.hour, 10);
        const minuteA = parseInt(classA.minute, 10);
        const minuteB = parseInt(classB.minute, 10);
    
        if (hourA !== hourB) {
            return hourA - hourB;
        } else {
            return minuteA - minuteB;
        }
    };
    const deleteClass = async (classId) => {
        try {
            await axios.delete(`http://localhost:5000/class/${classId}`);
            getClasses();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    useEffect(() => {
        getClasses();
    }, []);

    return (
        <div className="content">
            <Encabezado></Encabezado>
            <div className="bg-blue">
                <CreateClass createClass={createClass} />
            </div>
            <div>
            <table className="my-table">
                <thead>
                    <tr>
                        <th className="table-header">Monday</th>
                        <th className="table-header">Tuesday</th>
                        <th className="table-header">Wednesday</th>
                        <th className="table-header">Thursday</th>
                        <th className="table-header">Friday</th>
                        <th className="table-header">Saturday</th>
                        <th className="table-header">Sunday</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
    <td>
        <div>
            {(classes.filter(class_ => class_.day === "Monday").sort(compareClassesByTime)).map((class_, index) => (
                <div key={index}>
                    <h3>{class_.name}</h3>
                    <p>{class_.hour}:{class_.minute} - {class_.hour_end}:{class_.minute_end} </p>
                    <button className="button" onClick={() => deleteClass(class_._id)}>X</button>
                </div>
            ))}
        </div>
    </td>
    <td>
        <div>
            {(classes.filter(class_ => class_.day === "Tuesday").sort(compareClassesByTime)).map((class_, index) => (
                <div key={index}>
                    <h3>{class_.name}</h3>
                    <p>{class_.hour}:{class_.minute} - {class_.hour_end}:{class_.minute_end} </p>
                    <button className="button" onClick={() => deleteClass(class_._id)}>X</button>
                </div>
            ))}
        </div>
    </td>
    <td>
        <div>
            {(classes.filter(class_ => class_.day === "Wednesday").sort(compareClassesByTime)).map((class_, index) => (
                <div key={index}>
                    <h3>{class_.name}</h3>
                    <p>{class_.hour}:{class_.minute} - {class_.hour_end}:{class_.minute_end} </p>
                    <button className="button" onClick={() => deleteClass(class_._id)}>X</button>
                </div>
            ))}
        </div>
    </td>
    <td>
        <div>
            {(classes.filter(class_ => class_.day === "Thursday").sort(compareClassesByTime)).map((class_, index) => (
                <div key={index}>
                    <h3>{class_.name}</h3>
                    <p>{class_.hour}:{class_.minute} - {class_.hour_end}:{class_.minute_end} </p>
                    <button className="button" onClick={() => deleteClass(class_._id)}>X</button>
                </div>
            ))}
        </div>
    </td>
    <td>
        <div>
            {(classes.filter(class_ => class_.day === "Friday").sort(compareClassesByTime)).map((class_, index) => (
                <div key={index}>
                    <h3>{class_.name}</h3>
                    <p>{class_.hour}:{class_.minute} - {class_.hour_end}:{class_.minute_end} </p>
                    <button className="button" onClick={() => deleteClass(class_._id)}>X</button>
                </div>
            ))}
        </div>
    </td>
    <td>
        <div>
            {(classes.filter(class_ => class_.day === "Saturday").sort(compareClassesByTime)).map((class_, index) => (
                <div key={index}>
                    <h3>{class_.name}</h3>
                    <p>{class_.hour}:{class_.minute} - {class_.hour_end}:{class_.minute_end} </p>
                    <button className="button" onClick={() => deleteClass(class_._id)}>X</button>
                </div>
            ))}
        </div>
    </td>
    <td>
        <div>
            {(classes.filter(class_ => class_.day === "Sunday").sort(compareClassesByTime)).map((class_, index) => (
                <div key={index}>
                    <h3>{class_.name}</h3>
                    <p>{class_.hour}:{class_.minute} - {class_.hour_end}:{class_.minute_end} </p>
                    <button className="button" onClick={() => deleteClass(class_._id)}>X</button>
                </div>
            ))}
        </div>
    </td>
</tr>
                </tbody>
            </table>   
        </div>
        </div>
    );
};


export default ClassPage;