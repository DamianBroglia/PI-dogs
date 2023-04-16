import styles from "./Card.module.css"
import { Link } from "react-router-dom"
import { putUser } from "../Redux/actions"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Card(props) {
   const user = useSelector(state => state.user)
   const favorit = useSelector(state => state.fav)
   const [isFav, setIsFav] = useState(false)
   const dispatch = useDispatch()


   useEffect(() => {
      //dispatch(getFav())
      favorit.forEach((el) => {
         if (el.id === props.id) {
            setIsFav(true)
         }
      })
   }, [favorit]);



   function handleFavorite(ch) {
      if (isFav) {
         setIsFav(false)
         dispatch(putUser(user.id, ch.id, "del"))
      } else {
         setIsFav(true)
         dispatch(putUser(user.id, ch.id, "add"))
      }
   }


   return (
      <div className={styles.card}>
         <Link to={`/Detail/${props.id}`}>
            <img src={props.image} className={styles.image} alt="Not found" />
         </Link>
         <h2 className={styles.name}>{props.name}</h2>
         <div className={styles.divMay}>
            <div className={styles.divMed}>
               <label className={styles.label}>Altura: </label>
               <label className={styles.label2}> {props.height} </label>
               <label className={styles.label3}>cm</label>
            </div>
            <div className={styles.divMed}>
               <label className={styles.label}>Peso: </label>
               <label className={styles.label2}>{props.weight}</label>
               <label className={styles.label3}>kg</label>
            </div>
         </div>
         <h2 className={styles.data2}>{props.breedGroup}</h2>
         {
            isFav ? (
               <button onClick={() => handleFavorite(props)} className={styles.favorito}>❤️</button>
            ) : (
               <button onClick={() => handleFavorite(props)} className={styles.favorito}>🤍</button>
            )
         }
      </div>

   );
}

