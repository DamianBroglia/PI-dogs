import Cards from "./Cards";
import { useSelector } from "react-redux";


export default function Filter() {
    const breeds = useSelector(state => state.filterBreed)

    return (
        <div>
            <Cards cardArr={breeds} />
        </div>
    )
}










