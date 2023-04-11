// import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Cards from "./Cards";
import { useEffect } from "react";
import { getCreated, getUser } from "../Redux/actions";
// import Card from "./Card"
import styles from "./Cards.module.css"
// import styles2 from "./Favorites.module.css"

 export default function Created() {
const dispatch = useDispatch()
const user = useSelector(state => state.user)
const created = useSelector(state => state.created)

useEffect(() => {
    if(user.created)
     dispatch(getUser(user))
    dispatch(getCreated())
}, []);


return (
    <div>
        <Cards cardArr={created} />
    </div>
)
}