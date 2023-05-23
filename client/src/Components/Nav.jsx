import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"
import styles from "./Nav.module.css"
import { useSelector, useDispatch } from "react-redux"
import { clearFavorite, clearCreated, clearUser } from "../Redux/actions"
import { useNavigate } from "react-router-dom"




export default function Nav({ filterByName }) {
    const user = useSelector(state => state.user)
    const created = useSelector(state => state.created)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleOnClick(e) {
        dispatch(clearFavorite())
        dispatch(clearCreated())
        dispatch(clearUser())
        navigate("/")
    }


    return (
        <nav className={styles.nav}>
            {/* <img className={styles.image} src="https://img.freepik.com/premium-photo/small-sitting-brown-puppy-crossbreed-dog-isolated-wearing-green-collar-tag-id_191971-26646.jpg" alt="" /> */}
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
                    <button className={styles.button}>Tempe</button>
                </Link>
                <Link to="/user">
                    <button className={styles.button}>Perfil</button>
                </Link>
            </div>
            <SearchBar filterByName={filterByName} />
            <div className={styles.user}>
                <p className={styles.p}>- Usuario: {user.username} -</p>
                <p className={styles.p}>- Razas Favoritas:</p> {Array.isArray(user.favorites) ? <p>{user.favorites.length} -</p> : <p> 0 -</p>}
                <p className={styles.p}>- Razas Creadas:</p> {created ? <p>{created.length} -</p> : <p> 0 -</p>}
                <button onClick={handleOnClick} className={styles.button2}>Salir</button>
            </div>
        </nav>
    )
}