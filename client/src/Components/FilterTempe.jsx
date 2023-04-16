
import { useSelector } from "react-redux";
import Cards from "./Cards";


 export default function FilterTempe() {

const filtered = useSelector(state => state.filterBreed)


return (
    <div>
        <Cards cardArr={filtered} />
    </div>
)
}
