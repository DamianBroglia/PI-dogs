import Cards from "./Cards";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBreed, getCreated, getFav } from "../Redux/actions";



export default function Home() {
    const dispatch = useDispatch()
    const breeds = useSelector(state => state.breedDogs)
    const user = useSelector(state => state.user)

    useEffect(() => {
        if (user.favorites){
            dispatch(getFav())
            dispatch(getCreated())
        }
    }, [])

    return (
        <div>
            <Cards cardArr={breeds} />
        </div>
    )
}