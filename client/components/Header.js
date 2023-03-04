import Image from "next/image";
import { useEffect } from "react";
import { MdOutlineKeyboardArrowDown, MdRemoveModerator } from "react-icons/md";
import { socket } from '../pages/_app';

const Header = ({ username, spectator, title }) => {

    const disconnect = (e) => {
        e.preventDefault();

        // Remove localStorage
        localStorage.removeItem(`${title.toLowerCase()}_username`);
        localStorage.removeItem(`${title.toLowerCase()}_spectator`);

        // Remove user from the server
        socket.emit('update_data', username);
        window.location.reload();
    };

    return (
        <header>
            <div>
                <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
                <h1>{title}</h1>
            </div>
            <div>
                {username && <button className="username" onClick={disconnect}>
                    {spectator == "true" ? <MdRemoveModerator className="spectator" /> : ""}
                    {username}
                    <MdOutlineKeyboardArrowDown />
                </button>}
                
            </div>
        </header>
    )
}

export default Header;