import styles from "./Detail.module.css"
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Loading from "./Loading";




export default function Detail() {
    const { detailId } = useParams()
    const [breed, setBreed] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`http://localhost:3001/dogs/${detailId}`)
            .then((response) => response.json())
            .then((breed) => {
                if (breed.name) {
                    setBreed(breed);
                    setLoading(false)
                } else {
                    window.alert("Hay porblemas de conexion");
                }
            })
            .catch((err) => {
                window.alert("No hay razas con ese ID");
            });
        return setBreed({});
    }, [detailId]);

    if(loading){
        return (
            <Loading/>
        )
    }else{
        return (
            <div className={styles.container}>
                <div>
                    <img className={styles.image} src={breed.image} alt="Image not found" />
                    <h1 className={styles.name}>{breed.name}</h1>
                </div>
                <div className={styles.props}>
                    <div className={styles.h2} >
                        <p className={styles.p}>Altura:</p>
                        <h2>{breed.height}</h2>
                    </div>
                    <div className={styles.h2}>
                        <p className={styles.p}>Peso:</p>
                        <h2>{breed.weight}</h2>
                    </div>
                    <div className={styles.h2}>
                        <p className={styles.p}>Esperanza de vida:</p>
                        <h2>{breed.lifeSpan}</h2>
                    </div>
                    <div className={styles.h2}>
                        <p className={styles.p}>Origen:</p>
                        <h2>{breed.origin}</h2>
                    </div>
                    <div className={styles.h2}>
                        <p  className={styles.p}>Grupo de Raza:</p>
                        <h2>{breed.breedGroup}</h2>
                    </div>
                    <div className={styles.h2}>
                        <p className={styles.p}>Temperamentos:</p>
                        {Array.isArray(breed.temperaments) ? breed.temperaments.map((e) =>
                            <h2 key={e.id} className={styles.h2}> {e.name} </h2>
                        ) : <h2 className={styles.h2}>{breed.temperament}</h2>}
                    </div>
                </div>
            </div>
        )
    }


}
