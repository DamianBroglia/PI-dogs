import { useSelector } from "react-redux";
import Card from "./Card"
import styles from "./Card.module.css"


export default function Search() {

    const breed = useSelector((state) => state.filterBreed)
    
    return (
        <div className={styles.cards}>
            {breed.map(breedDog =>
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
            
        </div>
    );

}