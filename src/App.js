import "./App.css"
import { HashRouter, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./components/Home"
import Catalog from "./components/Catalog"
import ItemPage from "./components/ItemPage"
import Footer from "./components/Footer"
import { useState } from "react"

const App = () => {

    const [allItems, setAllItems] = useState([
        {id: 1, name: "EA Light X E1 H11", price: 689, type: "H11 ", power: 25, diodes: 16, producer: "France"},
        {id: 2, name: "KAIXEN Evolution H7", price: 3215, type: "H7 ", power: 21, diodes: 12, producer: "Germany"},
        {id: 3, name: "RZTK LB 4K12", price: 169, type: "E27 ", power: 3.5, diodes: 1, producer: "England"},
        {id: 4, name: "Astral Pool RGB", price: 10421, type: "LED ", power: 27, diodes: 21, producer: "Italy"}
    ])

    const [currentlyDisplayedItems, setCurrentlyDisplayedItems] = useState(allItems)

    return (
        <HashRouter>
            <div className='container'>
                <Header />
                <div>
                    <Route exact path='/' component={Home}></Route>
                    <Route path='/catalog' render={props => <Catalog {...props}
                        allItems={allItems} currentlyDisplayedItems={currentlyDisplayedItems}
                        setAllItems={setAllItems} setCurrentlyDisplayedItems={setCurrentlyDisplayedItems}
                        />}></Route>
                    <Route path='/item/:id' render={props => <ItemPage {...props} allItems={allItems}/>}></Route>
                </div>
                <Footer />
            </div>
        </HashRouter>
    )
}

export default App
