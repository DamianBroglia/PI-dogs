import styles from "./About.module.css"

export default function About() {
    return (
        <div className={styles.container}>
            <p>Aplicacion creada para el PI de SoyHenry por:</p>
            <h2 className={styles.name}>Damian Broglia</h2>
        </div>
    )
}