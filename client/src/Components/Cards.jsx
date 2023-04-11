import Card from "./Card";
import { useState } from 'react';
import styles from "./Cards.module.css"

export default function Cards({ cardArr }) {

    const cardbyPage = 8;
    const [firtInPage, setFirtInPage] = useState(0)
    const [lastInPage, setLastInPage] = useState(8)
    const totalCards = cardArr.length

    function nextHandler() {
        if (totalCards > 8) {
            if (lastInPage >= totalCards) return
            setFirtInPage(() => firtInPage + cardbyPage)
            setLastInPage(() => lastInPage + cardbyPage)
        }
    }
    function prevHandler() {
        if (totalCards > 8) {
            if (firtInPage <= 0) return
            setFirtInPage(() => firtInPage - cardbyPage)
            setLastInPage(() => lastInPage - cardbyPage)
        }
    }
    return (
        <div className={styles.cards}>
            {cardArr.slice(firtInPage, lastInPage).map(breedDog =>
                <Card
                    key={breedDog.id}
                    id={breedDog.id}
                    image={breedDog.image}
                    name={breedDog.name}
                    height={breedDog.height}
                    weight={breedDog.weight}
                    lifeSpan={breedDog.lifeSpan}
                    origin={breedDog.origin}
                    breedGroup={breedDog.breedGroup}
                />)
            }
            {cardArr.length > 8 ? <button onClick={prevHandler} >prev</button> : null}
            {cardArr.length > 8 ? <button onClick={nextHandler} >Next</button> : null}
         
        </div>
    )
}