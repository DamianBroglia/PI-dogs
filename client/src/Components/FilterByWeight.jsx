import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import styles from "./Filters.module.css"

export default function FilterByWeight({ filterByWeight }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [weihgtRange, setWeihgtRange] = useState({ min: "", max: "" })

    function handleInputChange(e) {
        setWeihgtRange({
            ...weihgtRange,
            [e.target.name]: e.target.value
        })
    }
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(filterByWeight(weihgtRange))
        setWeihgtRange({ min: "", max: "" })
        navigate("/filter")
    }

    return (
        <form className={styles.container} onSubmit={(e) => {
            handleSubmit(e)
        }}>
            <label className={styles.titulo}>Peso(kg)</label>
            <div className={styles.div}>
                <input className={styles.inputTex} type="text"
                    placeholder="min"
                    value={weihgtRange.min}
                    name="min"
                    onChange={(e) => handleInputChange(e)} />
                <input className={styles.inputTex} type="text"
                    placeholder="max"
                    value={weihgtRange.max}
                    name="max"
                    onChange={(e) => handleInputChange(e)} />
            </div>
            <input className={styles.button} type="submit" value="Filtrar" />
        </form>
    )
}
