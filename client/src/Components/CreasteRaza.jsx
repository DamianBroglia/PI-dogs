import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./CreasteRaza.module.css"



export default function CartelCreasteRaza() {  
    const user = useSelector(state => state.user)

    return (
        <div className={styles.div}>
            <h1 className={styles.msg}>FELICITACIONES! {user.username} creaste una nueva raza de perro</h1>
            <Link to="/home">
                <button className={styles.button}>Home</button>
            </Link>
            <Link to="/user">
                <button className={styles.button}>Ver</button>
            </Link>
        </div>
    )
}