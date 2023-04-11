import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import styles from "./Filters.module.css"

export default function FilterByHeight({ filterByHeight }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [heightRange, setHeightRange] = useState({ min: "", max: "" })

    function handleInputChange(e) {
        setHeightRange({
            ...heightRange,
            [e.target.name]: e.target.value
        })
    }
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(filterByHeight(heightRange))
        setHeightRange({ min: "", max: "" })
        navigate("/filter")
    }

    return (
        <form className={styles.container} onSubmit={(e) => {
            handleSubmit(e)
        }}>
            <label className={styles.titulo}>Altura(cm)</label>
            <div className={styles.div}>
                <input className={styles.inputTex} type="text"
                placeholder="min"
                    value={heightRange.min}
                    name="min"
                    onChange={(e) => handleInputChange(e)} />


                <input className={styles.inputTex} type="text"
                    placeholder="max"
                    value={heightRange.max}
                    name="max"
                    onChange={(e) => handleInputChange(e)} />
            </div>
            <input className={styles.button} type="submit" value="Filtrar" />

        </form>
    )
}
