import React, { useState } from 'react';
import './connexion.css';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Connexion = ({ className, onSubmit }) => {
    const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "username") {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username: userName,
                password: password
            });
            const { accessToken } = response.data;
            // Appelle la fonction onSubmit avec les informations de connexion et le token
            login(accessToken);
            // Redirige vers la page /Posts
            navigate('/posts');
        } catch (error) {
            setError("Nom d'utilisateur ou mot de passe incorrect");
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/auth/register", {
                username: userName,
                password: password
            });
            console.log("Compte créé:", response.data);
            alert("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");

            // vider les champs
            setUsername("");
            setPassword("");

        } catch (error) {
            setError("Erreur lors de la création du compte");
        }
    };

    return (

        <form className="pageConnexion">
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
            {error && <div className="error">{error}</div>}
            <div>
                <button className='bouton' type="submit" onClick={handleLogin}>Se connecter</button>
            </div>
            <div>
                <button className='bouton' type="button" onClick={handleRegister}>Créer un compte</button>
            </div>
        </form>
    )
};

export default Connexion;