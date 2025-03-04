import React, { useState } from 'react';
import './login.css';

const Login = ({ className, onSubmit }) => {
    const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "username") {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ userName, password });
    }

    return (

        <form onSubmit={handleSubmit} className={className}>
            <div>
                <label>
                    Nom : 
                    <input 
                        className="formulaire"
                        name="username"
                        value={userName}
                        onChange={handleChange}
                        type="text"
                        placeholder="Nom"
                    />
                </label>
            </div>
            <div>
                <label>
                    Password :
                    <input 
                        className="formulaire"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        type="password"
                        placeholder="Password"
                    />
                </label>
            </div>
            <div>
                <button className='bouton' type="submit">Login</button>
            </div>
        </form>
    )
};

export default Login;