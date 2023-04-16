import Cards from "./Cards";
import { useSelector } from "react-redux";


export default function Filter() {
    const breeds = useSelector(state => state.filterBreed)

    return (
        <div>
            {breeds.length > 0 ? <Cards cardArr={breeds} />: <h2> No hay resultados con esos parametros</h2>}
        </div>
    )
}










