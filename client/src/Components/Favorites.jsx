
import { useSelector, useDispatch } from "react-redux";
import Cards from "./Cards";
import { useEffect } from "react";
import { getFav, getUser } from "../Redux/actions";


 export default function Favorites() {
const dispatch = useDispatch()
const favorites = useSelector(state => state.fav)
const user = useSelector(state => state.user)

useEffect(() => {
    dispatch(getFav())
}, [user]);


return (
    <div>
        {favorites.length > 0 ? <Cards cardArr={favorites} />: <p>No tienes razas favoritos</p>}
    </div>
)
}
