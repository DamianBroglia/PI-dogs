import { useState } from "react";
import { useEffect } from "react";
import styles from "./Temperament.module.css"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { filterByTemperament } from "../Redux/actions";
import { useNavigate } from "react-router-dom";


export default function Temperament() {
    const [temperament, setTemperament] = useState([])
    const [firtInPage, setFirtInPage] = useState(0)
    const [lastInPage, setLastInPage] = useState(20)
    const allBreed = useSelector(state => state.breedDogs)
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
        setFirtInPage(firtInPage + 20)
        setLastInPage(lastInPage + 20)
    }

    function handlePrev() {
        setFirtInPage(firtInPage - 20)
        setLastInPage(lastInPage - 20)
    }

    function handleOnClick(e) {
        const { name } = e.target
        dispatch(filterByTemperament(name))
        navigate(`/temperaments/${name}`)
    }

    return (

        <div className={styles.container}>
            {temperament.slice(firtInPage, lastInPage).map((t) =>
                <div key={t.id}>
                    <button name={t.name} onClick={(e) => handleOnClick(e)} className={styles.button}>{t.name}</button>
                </div>
            )}
            <div>
                <button onClick={handlePrev}>Prev</button>
                <button onClick={handleNext}>Next</button>
            </div>
        </div >
    )

}

