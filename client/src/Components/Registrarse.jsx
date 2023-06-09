import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import validate from "./Validate.js";
import styles from "./Registrarse.module.css"


export default function Registrarse({ postUser }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [userData, setUserData] = useState({ username: "", email: '', password: '', favorites: [], created: [] });
    const [errors, setErrors] = useState({ username: "", email: '', password: '' });
    function handleInputChange(e) {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...userData,
            [e.target.name]: e.target.value
        }))
    }
    function handleSubmit(e) {
        e.preventDefault()
        const errores = Object.values(errors)
        if (errores.length > 0) {
            if (errors.username) {
                alert(errors.username)
            }
            else if (errors.email) {
                alert(errors.email)
            }
            else if (errors.password) {
                alert(errors.password)
            }

        } else {

            dispatch(postUser(userData))
            alert("Bienvenido a la app de dogs")
            navigate("/home")
        }
    }

    return (
        <div className={styles.image}>
            <form onSubmit={((e) => {
                handleSubmit(e)
            })}>
                <div className={styles.container}>
                    {/* <img className={styles.image} src="data:image/jpeg;base64,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"
                        alt="background" /> */}
                    <p className={styles.parra}>Registrate! Es completamente gratis y
                        podrás acceder al contenido de la app</p>
                    <div className={styles.container2}>
                        <div>
                            <label className={styles.username} >Nombre:</label>
                            <input className={styles.input} type="text" name="username" placeholder="Username"
                                onChange={(e) => handleInputChange(e)}></input>
                            <p className={styles.errors}>{errors.username}</p>
                        </div>
                        <div>
                            <label className={styles.username}>Email:</label>
                            <input className={styles.input} type="text" name="email" placeholder="email"
                                onChange={(e) => handleInputChange(e)}></input>
                            <p className={styles.errors}>{errors.email}</p>
                        </div>
                        <div>
                            <label className={styles.username}>Contraseña:</label>
                            <input className={styles.input} type="text"
                                name="password"
                                placeholder="Password"
                                onChange={(e) => handleInputChange(e)}></input>
                            <p className={styles.errors}>{errors.password}</p>
                        </div>
                        <button type="sudmit" className={styles.button}>Entrar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
