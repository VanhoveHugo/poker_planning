import { useEffect } from 'react';
import { MdVisibilityOff } from 'react-icons/md';
import { socket } from '../pages/_app';

const Table = ({ users, spectator, state }) => {
    const InvitePlayers = (event) => {
        event.preventDefault();
        navigator.clipboard.writeText(window.location.href);
        event.target.innerHTML = "URL copié !"
        setTimeout(() => {
            event.target.innerHTML = "Inviter d&apos;autres participants"
        }, "1000")
    }

    const RevealCards = (event) => {
        event.preventDefault();
        socket.emit('handle_state');
        socket.emit('get_stats')
    }

    useEffect(() => {
        if(process.env.NEXT_PUBLIC_SPECTATOR_VALIDATION_ONLY === "true") {
            if(spectator === "false") return;
        } else {
            let button = document.getElementById('reveal');
            if (state === true) {
                button.innerHTML = "Cacher les cartes"
            } else {
                button.innerHTML = "Révéler les cartes"
            }
        }

        
    }, [state]);

    const Article = ({ user, index }) => {
        return <article key={index}>
            <div className={"card" + (user.spectator ? " spectator" : "") + (user.note ? " ready" : "") + (state ? " active" : "")}>
                {user.spectator && <MdVisibilityOff />}
                <p>{user.note}</p>
            </div>
            <h2>{user.username}</h2>
        </article>
    }

    return(
        <section className="table">
            <div className="inner">
                <div />
                <div className="top">
                    {users.length === 1 && 
                        <div className="solo">
                            <p>Vous êtes seul 😴</p>
                            <a href='#' onClick={InvitePlayers}>Inviter d&apos;autres participants</a>
                        </div>}
                    {users.length > 4 && users.slice(4, 8).map((user, index) => {
                        return <Article user={user} index={index} />
                    })}
                </div>
                <div />
                <div className="left">
                {users.length > 8 && users.slice(8, 10).map((user, index) => {
                        return <Article user={user} index={index} />
                })}
                </div>
                <div className="glow">
                    {process.env.NEXT_PUBLIC_SPECTATOR_VALIDATION_ONLY === "true" ?
                    (spectator === "true") && <button id='reveal' onClick={RevealCards}>Révéler les cartes</button>
                    :
                    <button id='reveal' onClick={RevealCards}>Révéler les cartes</button>}
                </div>
                <div className="right">
                {users.length > 10 && users.slice(10, 12).map((user, index) => {
                        return <Article user={user} index={index} />
                })}
                </div>
                <div />
                <div className="bottom">
                    {users.slice(0, 4).map((user, index) => {
                        return <Article user={user} index={index} />
                    })}
                </div>
            </div>
            <div className='others'>
                {users.length > 12 && users.slice(12, users.length).map((user, index) => {
                        return <Article user={user} index={index} />
                })}
            </div>
        </section>
    )
}

export default Table;