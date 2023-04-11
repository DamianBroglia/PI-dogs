import { filterByBreedGroup, filterByHeight, filterByWeight, filterByLifeSpan } from "../Redux/actions"
import FilterByGroup from "./FilterByBreedGroup"
import FilterByHeight from "./FilterByHeight"
import FilterByWeight from "./FilterByWeight"
import FilterByLifeSpan from "./FilterByLifeSpan"
import styles from "./Filters.module.css"

export default function NavFilterComp() {

    return (

        <nav className={styles.nav} >
            <FilterByHeight filterByHeight={filterByHeight} />
            <FilterByWeight filterByWeight={filterByWeight} />
            <FilterByLifeSpan filterByLifeSpan={filterByLifeSpan} />
            <FilterByGroup filterByBreedGroup={filterByBreedGroup} />
        </nav>



    )
}