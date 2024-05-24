import "./Encabezado.style.css"
import { Link } from 'react-router-dom';
const Encabezado = () => {
    return <div>
        <div className="container">
            <h2 className="text-center1">Agenda</h2>
            <Link className="link_1" to="/task/">Home</Link>
            <Link className="link_1"  to="/events/">Events</Link>    
            <Link className="link_1"  to="/class/">Schedule</Link>  
        </div>
    </div>
}

export default Encabezado