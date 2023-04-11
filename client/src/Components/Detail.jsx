import styles from "./Detail.module.css"
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";



export default function Detail() {
    const { detailId } = useParams()
    const [breed, setBreed] = useState({})
    useEffect(() => {
        fetch(`http://localhost:3001/dogs/${detailId}`)
            .then((response) => response.json())
            .then((breed) => {
                if (breed.name) {
                    setBreed(breed);
                } else {
                    window.alert("No hay razas con ese ID");
                }
            })
            .catch((err) => {
                window.alert("No hay razas con ese ID");
            });
        return setBreed({});
    }, [detailId]);

    return (
        <div className={styles.container}>
            <div>
                <img className={styles.image} src={breed.image} alt="Image not found" />
                <h1 className={styles.name}>{breed.name}</h1>
            </div>
            <div className={styles.props}>
                    <p>Altura:</p>
                <h2 className={styles.h2}>{breed.height}</h2>
                    <p>Peso:</p>
                <h2 className={styles.h2}>{breed.weight}</h2>
                    <p>Esperanza de vida:</p>
                <h2 className={styles.h2}>{breed.lifeSpan}</h2>
                    <p>Origen:</p>
                <h2 className={styles.h2}>{breed.origin}</h2>
                    <p>Grupo de Raza:</p>
                <h2 className={styles.h2}>{breed.breedGroup}</h2>
                <p>Temperamentos:</p>
                {Array.isArray(breed.temperaments) ? breed.temperaments.map((e) => 
                <h2 key= {e.id} className={styles.h3}> {e.name} </h2>
                ): <h2 className={styles.h2}>{breed.temperament}</h2>}                    
            </div>
        </div>
    )

}
