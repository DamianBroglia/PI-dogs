import { orderByHeight, orderByLifeSpan, orderByWeight, orderByHeightRev,
orderByLifeSpanRev, orderByWeightRev } from "../Redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./NavOrder.module.css"


export default function Order() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isOrderHeight, setIsOrderHeight] = useState(false)
    const [isOrderWeight, setIsOrderWeight] = useState(false)
    const [isOrderSpan, setIsOrderSpan] = useState(false)

    function clickHandle(e) {
        const { name } = e.target
        if (name === "byHeight") {
            dispatch(orderByHeight())
            setIsOrderHeight(true)
            navigate("/order")
        }
        if (name === "byHeightReverse") {
            dispatch(orderByHeightRev())
            setIsOrderHeight(false)
            navigate("/order")
        }
        if (name === "byWeight") {
            dispatch(orderByWeight())
            setIsOrderWeight(true)
            navigate("/order")
        }
        if (name === "byWeightReverse") {
            dispatch(orderByWeightRev())
            setIsOrderWeight(false)
            navigate("/order")
        }
        if (name === "bySpan") {
            dispatch(orderByLifeSpan())
            setIsOrderSpan(true)
            navigate("/order")
        }
        if (name === "bySpanReverse") {
            dispatch(orderByLifeSpanRev())
            setIsOrderSpan(false)
            navigate("/order")
        }


    }


    return (
            <nav className={styles.div}>
                {!isOrderHeight ? <button className={styles.button} name="byHeight" onClick={(e) => clickHandle(e)}>Los mas bajos</button> :
                    <button className={styles.button} name="byHeightReverse" onClick={(e) => clickHandle(e)}>Los mas altos</button>}
                {!isOrderWeight ? <button className={styles.button} name="byWeight" onClick={(e) => clickHandle(e)}>Los mas livianos</button> :
                    <button className={styles.button} name="byWeightReverse" onClick={(e) => clickHandle(e)}>los mas pesados</button>}
                {!isOrderSpan ? <button className={styles.button} name="bySpan" onClick={(e) => clickHandle(e)}>Vive rapido!</button> :
                    <button className={styles.button} name="bySpanReverse" onClick={(e) => clickHandle(e)}>Casi inmortales</button>}
            </nav>
    )



}