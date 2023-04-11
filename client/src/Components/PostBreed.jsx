import { useState } from "react";
import { postBreed } from "../Redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./PostBreed.module.css"
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function PostBreed() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [breedCreated, setBreedCreated] = useState({
        userId: user.id, name: "", image: "", height: "", weight: "", lifeSpan: "",
        origin: "", breedGroup: "", temperament: []
    })
    const [temper, setTemper] = useState([])
    const [temName, setTemName] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3001/temperament`)
            .then((response) => response.json())
            .then((tempe) => {
                if (tempe.length > 0) {
                    setTemper(tempe);
                } else {
                    window.alert("Algo salió mal!");
                }
            })
            .catch((err) => {
                window.alert("ACA LLEGO");
            });
    }, []);


    function handleInputChange(e) {
        const { name, value } = e.target
        if (name === "temperament") {
            if (temName.length < 6) {
                const exists = temName.find(e => e === value)
                if (!exists) {
                    setBreedCreated({
                        ...breedCreated,
                        temperament: [...breedCreated.temperament, value]
                    })                    
                    setTemName([
                        ...temName, value
                    ])
                    console.log("2222222222222222222222", breedCreated.temperament);
                    console.log("2222222222222222222222333", e);
                }
            } else {
                alert("No puedes asignar mas de 5 temperamentos a tu raza")
            }
        } else {
            setBreedCreated({
                ...breedCreated,
                [name]: value
            })
        }

    }

    function handleSubmit(e) {
        e.preventDefault()
        if (breedCreated.name && breedCreated.image
            && breedCreated.height && breedCreated.weight
            && breedCreated.lifeSpan && breedCreated.origin
            && breedCreated.breedGroup && breedCreated.temperament.length > 0) {
            dispatch(postBreed(breedCreated))
            navigate('/postBreed/creasteRaza')
        } else {
            alert("Faltan completar cuadros")
        }

    }

    return (
        <div className={styles.containerMayor}>
            <form onSubmit={((e) => {
                handleSubmit(e)
            })}>
                <div className={styles.containerMedio}>
                    <div className={styles.containerMenor}>
                        <label className={styles.label}>Nombre: </label>
                        <input className={styles.input} type="text" name="name" placeholder="Nombre de la raza"
                            onChange={(e) => handleInputChange(e)}></input>
                    </div>
                    <div className={styles.containerMenor}>
                        <label className={styles.label}> Imagen: </label>
                        <input className={styles.input} type="text" name="image" placeholder="Imagen"
                            onChange={(e) => handleInputChange(e)}></input>
                    </div>
                    <div className={styles.containerMenor}>
                        <label className={styles.label}>Altura: </label>
                        <input className={styles.input} type="text" name="height" placeholder="Altura"
                            onChange={(e) => handleInputChange(e)}></input>

                    </div>
                    <div className={styles.containerMenor}>
                        <label className={styles.label}>Peso: </label>
                        <input className={styles.input} type="text" name="weight" placeholder="Peso"
                            onChange={(e) => handleInputChange(e)}></input>

                    </div>
                    <div className={styles.containerMenor}>
                        <label className={styles.label}>Esperanza de Vida: </label>
                        <input className={styles.input} type="text" name="lifeSpan" placeholder="Esperanza de Vida"
                            onChange={(e) => handleInputChange(e)}></input>

                    </div>
                    <div className={styles.containerMenor}>
                        <label className={styles.label}>Origen: </label>
                        <input className={styles.input} type="text" name="origin" placeholder="Origen"
                            onChange={(e) => handleInputChange(e)}></input>

                    </div>
                    <div className={styles.containerMenor}>
                        <label className={styles.label}>Tipo de raza: </label>
                        <select name="breedGroup" defaultValue={"DEFAULT"} onChange={(e) => handleInputChange(e)}>
                            <option value="DEFAULT" disabled >Grupo de Raza</option>
                            <option value="Toy" >Toy</option>
                            <option value="Hound">Hound</option>
                            <option value="Terrier">Terrier</option>
                            <option value="Working" >Working </option>
                            <option value="Mixed">Mixed</option>
                            <option value="Non-sporting">Non-sporting</option>
                            <option value="Sporting">Sporting</option>
                            <option value="Herding">Herding</option>
                        </select>
                    </div>
                    <div>
                        <label className={styles.label}>Temperamentos</label>
                        <select name="temperament" defaultValue={"DEFAULT"} onChange={(e) => handleInputChange(e)}>
                            {temper.map(tem =>
                                <option key={tem.id} name={tem.name} value={tem.id}>{tem.name}</option>

                            )}
                        </select>
                        <div className={styles.divTemper}>
                           { temName.map ((el) => 
                                   <p className={styles.tempeName}>{temper[el].name}</p>
                           )}
                        </div>
                    </div>
                    <div>
                        <button className={styles.button} type="sudmit" >Crear Raza</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

