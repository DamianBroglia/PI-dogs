
import { useEffect, useState } from "react";
import styles from "./Temperament.module.css"
import { useDispatch } from "react-redux";
import { filterByTemperament } from "../Redux/actions";
import { useNavigate } from "react-router-dom";


export default function Temperament() {
    const [temperament, setTemperament] = useState([])
    const [firstInPage, setFirtInPage] = useState(0)
    const [lastInPage, setLastInPage] = useState(20)
    const [numPag, setNumPage] = useState(1)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:3001/temperament`)
            .then((response) => response.json())
            .then((tempe) => {
                if (tempe.length > 0) {
                    setTemperament(tempe);
                } else {
                    window.alert("Algo salió mal!");
                }
            })
            .catch((err) => {
                window.alert("ACA LLEGO");
            });
    }, []);

    function handleNext() {
        if(firstInPage > temperament.length) return
        setFirtInPage(firstInPage + 20)
        setLastInPage(lastInPage + 20)
        setNumPage(numPag + 1)
    }

    function handlePrev() {
        if(firstInPage <= 0) return
        setFirtInPage(firstInPage - 20)
        setLastInPage(lastInPage - 20)
        setNumPage(numPag - 1)
    }

    function handleOnClick(e) {
        const { name } = e.target
        dispatch(filterByTemperament(name))
        navigate(`/temperaments/${name}`)
    }

    return (

        <div className={styles.container}>
            {temperament.slice(firstInPage, lastInPage).map((t) =>
                <div key={t.id}>
                    <button name={t.name} onClick={(e) => handleOnClick(e)} className={styles.button}>{t.name}</button>
                </div>
            )}
            <div className={styles.page}>
                <button className={styles.nextPrev} onClick={handlePrev}>Prev</button>
                <p className={styles.numPage}>{numPag}</p>
                <button className={styles.nextPrev} onClick={handleNext}>Next</button>
            </div>
        </div >
    )

}

