import { useState } from "react";
import { Link } from "react-router-dom"
import styles from "./LoginForm.module.css"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios"


export default function LoginForm({ getUser }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [access, setAccess] = useState(false)
    const [userData, setUserData] = useState({ username: "", password: '' });
    function handleInputChange(e) {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    async function login2(userData) {
        if (userData.username && userData.password) {
            const users = await axios("http://localhost:3001/user")
            const arrayUsers = users.data
            for (let i = 0; i < arrayUsers.length; i++) {
                if (userData.password === arrayUsers[i].password &&
                    userData.username === arrayUsers[i].username) {
                    setAccess(true);
                    navigate('/home');
                    alert(`Bienvenidos nuevamente! ${userData.username}`)
                    return
                }
            }
            alert("Username o password incorrectas")
        } else {
            if (!userData.username) alert("Debes tener un nombre de ususario para ingresar")
            if (!userData.password) alert("Debes colocar tu contraseña para ingresar")
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getUser(userData))
        login2(userData)

    }

    useEffect(() => {
        !access && navigate('/');
    }, [access]);

    return (
        <div className={styles.back}>
            <h1 className={styles.h1}>BIENVENIDO A DOGSAPP</h1>
            <form onSubmit={((e) => {
                handleSubmit(e)
            })}>
                <div className={styles.container}>
                    {/* <img className={styles.image} src="https://wallpapercave.com/wp/wp2247042.jpg"
                        alt="background" /> */}
                    <div className={styles.container2}>
                        <label className={styles.username}>Nombre:</label>
                        <input className={styles.input} type="text" name="username" placeholder="Username"
                            onChange={(e) => handleInputChange(e)}></input>
                    
                    
                        <label className={styles.username}>Contraseña:</label>
                        <input className={styles.input} type="text"
                            name="password"
                            placeholder="Password"
                            onChange={(e) => handleInputChange(e)}></input>
                    <button className={styles.button} type="sudmit"> INGRESAR</button>
                    <p className={styles.p}>Si no tienes cuenta has click aquí: </p>
                    <Link to="/registrarse">
                        <label className={styles.label}>Registrarse</label>
                    </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

