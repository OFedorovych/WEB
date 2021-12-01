import { useState } from "react"
import Filters from "./Filters"
import CatalogItem from "./CatalogItem"
import ScrollToTop from "./ScrollToTop"

const Catalog = ({ allItems, currentlyDisplayedItems, setAllItems, setCurrentlyDisplayedItems }) => {

    const [currentSortOrder, setCurrentSortOrder] = useState('asc')

    const compareStrings = (a, b) => {
        if (a === b) return 0
        return a < b ? -1 : 1
    }

    const sortItems = (parameter) => {
        let sortOrder = (currentSortOrder === 'asc') ? 1 : -1;
        let [selectedCoef, selectedParameter] = parameter.split("-")

        let sortCoef = selectedCoef === "total" ?
            item => item.count :
            item => 1

        let sortParameters = {
            "name": item => item.name,
            "price": item => item.price,
            "power": item => item.power
        }

        let tmpAllItems = [...allItems]
        let tmpCurrentlyDisplayedItems = [...currentlyDisplayedItems]

        tmpAllItems.sort((a, b) => {
            console.log("f")
            if (typeof sortParameters[selectedParameter](a) === "string")
                return sortOrder * compareStrings(sortParameters[selectedParameter](a),
                    sortParameters[selectedParameter](b))
            else
                return sortOrder * (sortParameters[selectedParameter](a) * sortCoef(a)
                    - sortParameters[selectedParameter](b) * sortCoef(b))
        })

        tmpCurrentlyDisplayedItems.sort((a, b) => {
            if (typeof sortParameters[selectedParameter](a) === "string")
                return sortOrder * compareStrings(sortParameters[selectedParameter](a),
                    sortParameters[selectedParameter](b))
            else
                return sortOrder * (sortParameters[selectedParameter](a) * sortCoef(a)
                    - sortParameters[selectedParameter](b) * sortCoef(b))
        })

        setAllItems(tmpAllItems)
        setCurrentlyDisplayedItems(tmpCurrentlyDisplayedItems)
    }

    const reverseItems = () => {
        if (currentSortOrder === 'asc') {
            setCurrentSortOrder('desc')
        }
        else {
            setCurrentSortOrder('asc')
        }

        let tmpAllItems = [...allItems]
        let tmpCurrentlyDisplayedItems = [...currentlyDisplayedItems]

        tmpAllItems.reverse()
        tmpCurrentlyDisplayedItems.reverse()

        setAllItems(tmpAllItems)
        setCurrentlyDisplayedItems(tmpCurrentlyDisplayedItems)
    }

    const searchItems = (searchInput) => {
        setCurrentlyDisplayedItems(allItems.filter(item => {
            return item.name.toUpperCase().replaceAll(' ', '')
                .includes(searchInput.toUpperCase().replaceAll(' ', ''))
        }))
    }

    return (
        <div className='catalog'>
            <ScrollToTop />
            <Filters reverseItems={reverseItems} sortItems={sortItems} searchItems={searchItems}/>   
            <ul>
                { currentlyDisplayedItems.map(item =>
                    <CatalogItem key={item.id} id={item.id} name={item.name} price={item.price} type={item.type}
                    power={item.power} diodes={item.diodes} producer={item.producer}/>)
                }
            </ul>
        </div>    
    )
}

export default Catalog
