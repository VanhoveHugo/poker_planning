import { socket } from '../pages/_app';

const Popin = ({title}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = e.target.username.value.trim().toLowerCase();
        const spectator = e.target.spectator.checked;
        if(username && username.length > 0) {
            localStorage.setItem(`${title.toLowerCase()}_username`, username);
            localStorage.setItem(`${title.toLowerCase()}_spectator`, spectator);
            socket.emit('set_data', {username, spectator});
        }
        window.location.reload();
    };

    return (
        <div className="popin">
            <div className="inner">
                <h1>Choisissez votre nom d&apos;utilisateur</h1>
                <form onSubmit={handleSubmit}>
                    <div className="username">
                        <input id="username" type="text" minLength={1} required />
                        <label htmlFor="username">Votre nom d&apos;utilisateur</label>
                    </div>
                    <div className="spectator">
                        <input id="spectator" type="checkbox" value="true"  />
                        <label htmlFor="spectator">Rejoindre en tant que spectateur</label>
                    </div>
                    <button type="submit">Commencer à estimer</button>
                </form>
            </div>
        </div>
    );
};

export default Popin;