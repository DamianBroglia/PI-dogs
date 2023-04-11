import { useSelector } from "react-redux"
import Favorites from "./Favorites"
import Created from "./Created"
import { useState } from "react"
import { getCreated } from "../Redux/actions"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import styles from "./Perfil.module.css"

export default function Perfil() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [option, setOption] = useState(true)


    function handleOnClick(e) {
        const { name } = e.target
        if (name === "Fav") {
            setOption(true)
        }
        if (name === "Raz")
            setOption(false)
    }

    return (
        <div className={styles.divMay}>
            <div className={styles.divMed}>
                <div className={styles.divMen}>
                    <label className={styles.label}>Favoritas</label>
                    <h2 className={styles.h2}>{user.favorites.length}</h2>
                </div>
            <h1 className={styles.name}>{user.username}</h1>
                <div className={styles.divMen}>
                    <label className={styles.label}>Creadas</label>
                    <h2 className={styles.h2}>{user.created.length}</h2>
                </div>
            </div>
            <div className={styles.div3}>
                <button className={styles.button} name="Fav" onClick={(e) => handleOnClick(e)}></button>
                <button className={styles.button} name="Raz" onClick={(e) => handleOnClick(e)}></button>
            </div>
            {option ? <Favorites /> : <Created />}
        </div>
    )
}