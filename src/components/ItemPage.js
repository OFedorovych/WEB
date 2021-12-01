import { useParams } from "react-router"
import Item from "./Item"
import { NavLink } from "react-router-dom"
import ScrollToTop from "./ScrollToTop"

const ItemPage = ({ allItems }) => {

    const params = useParams()

    return (
        <div className='item-page'>
            <ScrollToTop />
            <Item allItems={allItems} id={params.id} />
            <NavLink to='/catalog'>Back to catalog</NavLink>
        </div>
    )
}

export default ItemPage
