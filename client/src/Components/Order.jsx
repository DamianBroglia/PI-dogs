import Cards from "./Cards";
import { useSelector } from "react-redux";


export default function Order() {
    const breeds = useSelector(state => state.orderBreed)

    return (
        <div>
            <Cards cardArr={breeds} />
        </div>
    )
}