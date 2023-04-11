// import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Cards from "./Cards";
import { useEffect } from "react";
import { getFav } from "../Redux/actions";
// import Card from "./Card"
import styles from "./Cards.module.css"
// import styles2 from "./Favorites.module.css"

 export default function Favorites() {
const dispatch = useDispatch()
const favorites = useSelector(state => state.fav)

useEffect(() => {
    dispatch(getFav())
}, []);


return (
    <div>
        <Cards cardArr={favorites} />
    </div>
)
}
