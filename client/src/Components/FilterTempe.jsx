// import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Cards from "./Cards";
import { useEffect } from "react";
import { getFav } from "../Redux/actions";
// import Card from "./Card"
import styles from "./Cards.module.css"
// import styles2 from "./Favorites.module.css"

 export default function FilterTempe() {

const filtered = useSelector(state => state.filterBreed)


return (
    <div>
        <Cards cardArr={filtered} />
    </div>
)
}
