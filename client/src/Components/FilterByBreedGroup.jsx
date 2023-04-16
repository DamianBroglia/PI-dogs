import { useState } from "react"
import { useDispatch } from "react-redux"
import styles from "./Filters.module.css"
import { useNavigate } from "react-router-dom"


export default function FilterByGroup({ filterByBreedGroup }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [breedGroup, setBreedGroup] = useState(" ")


    function handleClick(e) {        
            setBreedGroup(e.target.value)       
    }

    return (
        <form className={styles.container} onSubmit={(e) => {
            e.preventDefault();
            dispatch(filterByBreedGroup(breedGroup))
            navigate("/filter")
        }}>
            <select className={styles.search} name="breedGroup" defaultValue={"DEFAULT"} onChange={handleClick}>
                <option value="DEFAULT" disabled >Grupo de Raza</option>
                <option value="Toy" >Toy</option>
                <option value="Hound">Hound</option>
                <option value="Terrier">Terrier</option>
                <option value="Working" >Working </option>
                <option value="Mixed">Mixed</option>
                <option value="Non-Sporting">Non-sporting</option>
                <option value="Sporting">Sporting</option>
                <option value="Herding">Herding</option>
            </select>
            <button className={styles.button} type="submit" value="Buscar" > Buscar </button>
        </form>
    )
}
