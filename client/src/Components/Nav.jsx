import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"
import styles from "./Nav.module.css"
import { useSelector } from "react-redux"

export default function Nav({ filterByName }) {
    const user = useSelector(state => state.user)

    return (
        <nav className={styles.nav}>
            <img className={styles.image} src="https://cdn-icons-png.flaticon.com/512/194/194279.png" alt="" />
            <h2 className={styles.label}>HENRY</h2>
            <h3 className={styles.label2}>DOG</h3>
            <div className={styles.buttons}>
                <Link to="/home">
                    <button className={styles.button}>Home</button>
                </Link>
                <Link to="/about">
                    <button className={styles.button}>About</button>
                </Link>
                <Link to="/postBreed">
                    <button className={styles.button}>Crear</button>
                </Link>
                <Link to="/temperaments">
                    <button className={styles.button}>Temperamentos</button>
                </Link>
                <Link to="/user">
                    <button className={styles.button}>Perfil</button>
                </Link>
            </div>
            <SearchBar filterByName={filterByName} />
            <div className={styles.user}>
                <Link to="/">
                    <button className={styles.button2}>Salir</button>
                </Link>
                <h1 className={styles.name}>{user.username}</h1>
            </div>
        </nav>
    )
}