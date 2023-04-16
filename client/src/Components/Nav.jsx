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
            <img className={styles.image} src="https://cdn-icons-png.flaticon.com/512/194/194279.png" alt="" />
            <h2 className={styles.label}>HENRY</h2>
            <h3 className={styles.label2}>DOG</h3>
            <div className={styles.buttons}>
                <Link to="/home">
                    <button className={styles.button}>Home 🏠</button>
                </Link>
                <Link to="/about">
                    <button className={styles.button}>About 🤔</button>
                </Link>
                <Link to="/postBreed">
                    <button className={styles.button}>Crear 🐶</button>
                </Link>
                <Link to="/temperaments">
                    <button className={styles.button}>Tempe 🗯️</button>
                </Link>
                <Link to="/user">
                    <button className={styles.button}>Perfil 👨</button>
                </Link>
            </div>
            <SearchBar filterByName={filterByName} />
            <div className={styles.user}>
                <button onClick={handleOnClick} className={styles.button2}> 🚪 </button>
                <div className={styles.minDiv}>
                    <p>❤️</p>
                    {Array.isArray(user.favorites) ? <p>{user.favorites.length}</p> : <p>0</p>}
                </div>
                <div className={styles.minDiv2}>
                    <p>🐕</p>
                    {created ? <p>{created.length}</p> : <p>0</p>}
                </div>
                <h1 className={styles.name}>{user.username}</h1>
                <p className={styles.icon}>👨‍🍳</p>
            </div>
        </nav>
    )
}