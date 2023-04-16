import Card from "./Card";
import { useState } from 'react';
import styles from "./Cards.module.css"

export default function Cards({ cardArr }) {

    const cardbyPage = 8;
    const [firstInPage, setFirtInPage] = useState(0)
    const [lastInPage, setLastInPage] = useState(8)
    const [numPage, setNumPage] = useState(1)
    const totalCards = cardArr.length

    function nextHandler() {
        if (firstInPage > totalCards) return
        setFirtInPage(() => firstInPage + cardbyPage)
        setLastInPage(() => lastInPage + cardbyPage)
        setNumPage(numPage + 1)

    }
    function prevHandler() {
        if (firstInPage <= 0) return
        setFirtInPage(() => firstInPage - cardbyPage)
        setLastInPage(() => lastInPage - cardbyPage)
        setNumPage(numPage - 1)
    }
    return (
        <div className={styles.cards}>
            {cardArr.slice(firstInPage, lastInPage).map(breedDog =>
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
            {cardArr.length > 8 ?
                <div className={styles.page}>
                    <button className={styles.nextPrev} onClick={prevHandler} >prev</button>
                    <p className={styles.numPag}>{numPage}</p>
                    <button className={styles.nextPrev} onClick={nextHandler} >Next</button>
                </div> : null}
        </div>
    )
}