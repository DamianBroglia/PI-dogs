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
        userId: user.id, name: " ", image: " ", height: " ", weight: " ", lifeSpan: " ",
        origin: " ", breedGroup: " ", temperament: []
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
            if (temName.length < 5) {
                const exists = temName.find(e => e === value)
                if (!exists) {
                    setTemName([
                        ...temName, value
                    ])
                }
            } else {
                alert("No puedes asignar mas de 5 temperamentos a tu raza")
            }
        }
        if (name === "lifeSpan") {
            setBreedCreated({
                ...breedCreated,
                [name]: value + " years"
            })
        } else {
            setBreedCreated({
                ...breedCreated,
                [name]: value
            })
        }

    }

    function handleSubmit(e) {
        e.preventDefault()
        setBreedCreated({
            ...breedCreated,
            temperament: temName
        })
        const complete = Object.values(breedCreated)
        const isComplet = complete.filter(e => e === " ")
        if (isComplet.length === 0) {
            if (breedCreated.height.split("-").length === 2 &&
                breedCreated.weight.split("-").length === 2 &&
                breedCreated.lifeSpan.split("-").length === 2) {
                if (breedCreated.height.split("-")[0] < breedCreated.height.split("-")[1] &&
                    breedCreated.weight.split("-")[0] < breedCreated.weight.split("-")[1] &&
                    breedCreated.lifeSpan.split("-")[0] < breedCreated.lifeSpan.split("-")[1]) {
                    dispatch(postBreed(breedCreated))
                    navigate('/postBreed/creasteRaza')
                } else {
                    alert("El minimo no puede ser mayor o igual que el maximo")
                }
            } else {
                alert("Altura, Peso y Esperanza de vida deben ser dos valores separados por un " - " ; ej 10-34")
            }
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
                        <input className={styles.input} placeholder="Altura minima - Edad minima" type="text" name="height"
                            onChange={(e) => handleInputChange(e)}></input>

                    </div>
                    <div className={styles.containerMenor}>
                        <label className={styles.label}>Peso: </label>
                        <input className={styles.input} placeholder="Peso minimo - Peso maximo" type="text" name="weight"
                            onChange={(e) => handleInputChange(e)}></input>

                    </div>
                    <div className={styles.containerMenor}>
                        <label className={styles.label}>Esperanza de Vida: </label>
                        <input className={styles.input} placeholder="Edad minima - Edad maxima" type="text" name="lifeSpan"
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

                    <label className={styles.label}>Temperamentos</label>
                    <select name="temperament" defaultValue={"DEFAULT"} onChange={(e) => handleInputChange(e)}>
                        {temper.map(tem =>
                            <option key={tem.id} name={tem.name} value={tem.id}>{tem.name}</option>

                        )}
                    </select>
                    <div className={styles.divTemper}>
                        {temName.map((el) =>
                            <p className={styles.tempeName}>{temper[el - 1].name}</p>
                        )}
                    </div>


                    <button className={styles.button} type="sudmit" >Crear Raza</button>

                </div>
            </form>
        </div>
    )
}

