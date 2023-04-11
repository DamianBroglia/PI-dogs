import React, { useState } from "react";
import styles from "./SearchBar.module.css"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ filterByName }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [breed, setBreed] = useState("")
    return (
        <form className={styles.container} onSubmit={(e) => {
            e.preventDefault();
            dispatch(filterByName(breed))
            if(breed.length > 0){
                navigate(`/filter`)
                setBreed("")
            }
        }}>
            <input type="text"
                className={styles.search}
                placeholder="Raza"
                value={breed}
                onChange={e => setBreed(e.target.value)} />
            <input type="submit" className={styles.button} value="Buscar" />
        </form>
    )
}