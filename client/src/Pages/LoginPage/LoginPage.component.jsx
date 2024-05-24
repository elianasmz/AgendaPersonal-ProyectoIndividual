import { useState } from "react"
import { useNavigate, Link } from 'react-router-dom';
import "./LoginPage.style.css"
import HTTPClient from "../../utils/HTTPClient";

const LoginPage = (props) => {
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const [setErrorMessage] = useState('');
    const [token] = useState("");
    const handleLogin = () => {
        
        let client = new HTTPClient(token);

        client.login(data.email, data.password)
            .then((response) => {
                if (response.data && response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    navigate("/task/");
                } else {
                    setErrorMessage('Credenciales incorrectas. Por favor, inténtelo de nuevo.');
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }
    
    return (
        <div className="container-1">
            <div className="row jutify-content-center">
                <div className="col-4 bg-white">
                    <h1>Login</h1>
                    <div className="row">
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={data.email || ""} 
                            onChange={handleChange} />
                    </div>
                    <div className="row">
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={data.password || ""} 
                            onChange={handleChange} />
                    </div>
                    <div>
                        <button onClick={handleLogin}>Log in!</button>
                    </div>
                    <p>Don't have an account? <Link to="/register/">Sign up here</Link></p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage