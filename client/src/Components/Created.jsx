
import { useSelector, useDispatch } from "react-redux";
import Cards from "./Cards";
import { useEffect } from "react";
import { getCreated } from "../Redux/actions";


 export default function Created() {
const created = useSelector(state => state.created)

return (
    <div>
        {created.length > 0 ? <Cards cardArr={created} /> : <p>No has creado ninguna raza</p>}
    </div>
)
}