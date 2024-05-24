import { useState } from "react";
import HTTPClient from "../../utils/HTTPClient";
import { useNavigate, Link } from 'react-router-dom';
import "./SignUpPage.style.css"

const SignUpPage = (props) => {

    const [data, setData] = useState({})
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const validate = () => {
        let flag = true;
        let errors = {}

        if (data.password.lenght <= 5){
            errors.password = "La password no puede tener menos de 5 caracteres"
            flag = false;
        }

        if (data.password && data.password2 && data.password !== data.password2){
            errors.password = "Las passwords no calzan"
            flag = false;
        }

        //...
        setErrors(errors);
        return flag
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!validate()){
            return
        }

        let client = new HTTPClient();

        client.register(data)
            .then((response) => {
                navigate('/');
            })
            .catch((error) => {
                if (error.response){
                    setErrors(error.response.data.errors)
                }
                console.log(error)
            })
    }

    return (
        <div className="container-1">
            <div className="row jutify-content-center">
                <div className="col-4 bg-white">
                    <h1>Create Your Account</h1>
                    <div className="row">
                        <label htmlFor="name">Name</label>
                        {errors.name && <small>{errors.name}</small>}
                        <input 
                            type="name" 
                            name="name" 
                            value={data.name || ""} 
                            onChange={handleChange}
                            required={true}
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="email">Email</label>
                        {errors.email && <small>{errors.email}</small>}
                        <input 
                            type="email" 
                            name="email" 
                            value={data.email || ""} 
                            onChange={handleChange}
                            required={true}
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="password">Password</label>
                        {errors.password && <small>{errors.password}</small>}
                        <input 
                            type="password" 
                            name="password" 
                            value={data.password || ""} 
                            onChange={handleChange}
                            required={true}
                            minLength={5}
                        />
                    </div>
                <div className="row">
                    <label htmlFor="password">Confirm password</label>
                    {errors.password && <small>{errors.password}</small>}
                    <input 
                        type="password" 
                        name="password2" 
                        value={data.password2 || ""} 
                        onChange={handleChange}
                        required={true}
                        minLength={5}
                    />
                </div>
                <div >
                    <button type="submit" onClick={handleSubmit}>Create Account</button>
                </div>
                    <p>Already have an account? <Link to="/">Log in here</Link></p>
                </div>
            </div>
        </div>
    )
    
}

export default SignUpPage;