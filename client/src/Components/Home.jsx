import Cards from "./Cards";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBreed, getFav } from "../Redux/actions";
import { useState } from 'react';


export default function Home() {
    const dispatch = useDispatch()
    const breeds = useSelector(state => state.breedDogs)
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllBreed())
        if (user.favorites){
            dispatch(getFav())
        }
    }, [])

    return (
        <div>
            <Cards cardArr={breeds} />
        </div>
    )
}