import styles from "./Loading.module.css"

export default function Loading() {

    return (
        <div>
            <span className={styles.animation}>CARGANDO PERRO</span>
            <div className={styles.barraCarga}>
            </div>
        </div>
    )
}