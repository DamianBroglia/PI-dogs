import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import styles from "./Filters.module.css"

export default function FilterByWeight({ filterByLifeSpan }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [lifeRange, setLifeRange] = useState({ min: "", max: "" })

    function handleInputChange(e) {
        setLifeRange({
            ...lifeRange,
            [e.target.name]: e.target.value
        })
    }
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(filterByLifeSpan(lifeRange))
        setLifeRange({ min: "", max: "" })
        navigate("/filter")
    }

    return (
        <form className={styles.container} onSubmit={(e) => {
            handleSubmit(e)
        }}>
            <label className={styles.titulo}>Longevidad</label>
            <div className={styles.div}>
                <input className={styles.inputTex} type="text"
                    placeholder="min"
                    value={lifeRange.min}
                    name="min"
                    onChange={(e) => handleInputChange(e)} />
                <input className={styles.inputTex} type="text"
                    placeholder="max"
                    value={lifeRange.max}
                    name="max"
                    onChange={(e) => handleInputChange(e)} />
            </div>
            <input className={styles.button} type="submit" value="Filtrar" />

        </form>
    )
}