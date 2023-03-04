import { useState } from "react";
import { socket } from '../pages/_app';

const Footer = ({stats, values, username, spectator, state}) => {
    const [oldkey, setOldkey] = useState();

    const handleClick = (event) => {
        event.preventDefault();
        socket.emit('handle_cards', {username, note: event.target.innerHTML});
        removeAllClasses(event.target.id)
        event.target.classList.toggle('active') 
    }

    const removeAllClasses = (key) => {
        if (!oldkey) return setOldkey(key)
        var oldbutton = document.getElementById(oldkey)
        oldbutton.classList.remove('active')
        return setOldkey(key)
    }

    return (
        <footer>
            {spectator == "true" ? <p>Vous êtes en mode spectateur</p> : 
            <div className="values">
                {state === false && values.map((value, index) => {
                    return <button href="#" onClick={handleClick} id={index} key={index}>{value}</button>
                })}
                {(state === true && stats.average) && <div className="stats">
                    <p>Moyenne : {stats.average}</p>
                </div>}
            </div>}
            <p>© 2023 PokerPlanning OpenSource - HugoV.</p>
        </footer>
    )
}
export default Footer;