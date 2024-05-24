import "./EventPage.style.css"
import axios from "axios";
import { useEffect, useState } from "react";
import HTTPClient from "../../utils/HTTPClient";
import Encabezado from "../../components/Encabezado/Encabezado.component";
import CreateEvent from "../../components/CreateEvent/CreateEvent.component";

const EventPage = (props) => {

    const [events, setEvents] = useState([]);

    const getEvents = () => {
        let client = new HTTPClient();
        client.getEvents()
            .then((response) => {
                setEvents(response.data.events)
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
                if (error.response && error.response.status === 401){
                    console.log("Tenemos que refrescar token primero y luego reintentar")
                }
            })
    }

    const createEvent = (data) => {
        let client = new HTTPClient();
        client.createEvent(data)
            .then((response) => {
                getEvents();
            })
            .catch((error) => {
                console.log(error)
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
    const deleteEvent = async (eventId) => {
        try {
            await axios.delete(`http://localhost:5000/events/${eventId}`);
            getEvents();
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    useEffect(()=>{
        getEvents();
    },[])


    return <div className="content">
        <Encabezado></Encabezado>
        <div className="container-2">
            <div>
                <div >
                    <table className="sub-content">
                        <thead>
                            <tr>
                                <th className="th-1">Events</th>
                                <th className="th-1"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <td>
                                {events.map((event, index) => (
                                    <div key={index}>
                                    <h3>{event.name}</h3>
                                    <p className={isDateExpired(event.date) ? 'expired-date' : ''}>Date: {formatDate(event.date)}</p>
                                    <p>Description: {event.description}</p>
                                </div>
                                ) )}
                            </td>
                            <td>
                                {events.map((event, index) => (
                                    <div key={index}>
                                        <div className="button-container">
                                            <button className="other-button2" onClick={() => deleteEvent(event._id)}>X</button>
                                        </div>
                                </div>
                                ) )}
                            </td>
                        </tbody>
                    </table>   
                </div>
                
            </div>
            <div className="sub-content1">   
                    <CreateEvent createEvent={createEvent}/>
                </div>
        </div>
    </div>
}

export default EventPage;