import Heading from "./Heading"
import MayLikeItem from "./MayLikeItem"
import { useEffect, useState } from "react"
import ScrollToTop from "./ScrollToTop"

const Home = () => {

    const name = "Lamp"
    let infos = [`OFFICIALLY LICENSED: This quality collectable is a unique addition to any 
    fan's set. Give this cool collector's merchandise to mums, dads, fans, students, kids, 
    boys & girls who love pop culture fun.`,

    `Made of high-quality iron, spinning, cutting, polishing, grinding, painting, 
    hand-made color and other processes made of fine workmanship, 
    not easy to fade and rusty.`,

    `It's a perfectly chilling way to illuminate your man cave, bedroom, office, 
    or themed home theatre and makes a wonderful collectible for true horror fans.`,

    `teampunk retro lamp ​made in an Industrial Steampunk style made of 1/2" malleable 
    iron pipe/fittings, high-temperature baking paint, which have a great quality. and finished with 
    a flexible cable with inline on/off switch and UK plug.The cool and unique vintage Iron table lamp design adds more personality to your room.`]

    const [isScrollNeeded, setIsScrollNeeded] = useState(() => true)

    const getRandomInfo = () => {
        return infos[Math.round(Math.random() * 100) % 4]
    }

    const [mayLikeItems, setItems] = useState(() => { return [
        {
            id: 0,
            name: name,
            info: getRandomInfo()
        },
        {
            id: 1,
            name: name,
            info: getRandomInfo()
        },
        {
            id: 2,
            name: name,
            info: getRandomInfo()
        },
        {
            id: 3,
            name: name,
            info: getRandomInfo()
        } 
    ]})
    const [id, setId] = useState(() => 4)

    const showMoreItems = () => {
        setIsScrollNeeded(false)
        setItems([...mayLikeItems,
            {
                id: id,
                name: name,
                info: getRandomInfo()
            },
            {
                id: id + 1,
                name: name,
                info: getRandomInfo()
            },
            {
                id: id + 2,
                name: name,
                info: getRandomInfo()
            },
            {
                id: id + 3,
                name: name,
                info: getRandomInfo()
            }
        ])
        setId(id + 4)
    }

    return (
        <div className='home'>
            <Heading />
            {isScrollNeeded ? <ScrollToTop /> : null}
            <section className='may-like-items'>
                <h1>You may be interested</h1>
                <ul>
                    { mayLikeItems.map(item => 
                        <MayLikeItem key={item.id} name={`${item.name} ${item.id + 1}`} info={item.info}/>) }
                </ul>
                <div className='view-more'>
                    <button className='may-like-items__view-more-button' onClick={showMoreItems}>View more</button>
                </div>    
            </section>
        </div>
    )
}

export default Home
