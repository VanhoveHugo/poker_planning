import React, { useEffect, useState } from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Popin from '../components/Popin';
import Table from '../components/Table';
import { useLocalStorage } from "../hooks/localStorage";
import { socket } from './_app';

const App = () => {
    const title = process.env.NEXT_PUBLIC_NAME;
    let notes = [];
    if(process.env.NEXT_PUBLIC_NOTES) notes = process.env.NEXT_PUBLIC_NOTES.split(',');
    const username = useLocalStorage(`${title.toLowerCase()}_username`);
    const spectator = useLocalStorage(`${title.toLowerCase()}_spectator`);
    const [data, setData] = useState([]);
    const [state, setState] = useState(false);
    const [stats, setStats] = useState({});

    // Set the title of the page
    useEffect(() => {
        document.title = `PokerPlanning | ${title}`;
    }, [title]);

    // Get the data from the server
    useEffect(() => {
        socket.emit('get_data');
        socket.emit('get_state');
        socket.emit('get_stats');

        socket.on('get_data', (data) => {
            setData(data);
        });

        socket.on('get_state', (state) => {
            setState(state);
        });

        socket.on('get_stats', (stats) => {
            console.log(stats);
            setStats(stats);
        });

        socket.on('set_data', (data) => {
            setData(data);
        });

        return () => {
            socket.off('get_data');
        };
    }, [socket]);

    let array = [
        {username: "Hugo", spectator: false},
        {username: "Hugo", spectator: false},
        {username: "Hugo", spectator: false},
        {username: "Hugo", spectator: false},
        {username: "Hugo", spectator: false},
        {username: "Hugo", spectator: false},
        {username: "Hugo", spectator: false},
        {username: "Hugo", spectator: false},
        {username: "Hugo", spectator: false},
        {username: "Hugo", spectator: false},
        {username: "Hugo", spectator: false},
        {username: "Hugo", spectator: false},
        {username: "Hugo", spectator: false},
        {username: "Hugo", spectator: false},
    ];

    return (
        <>
            {(data.length === 0 || !username) ? <Popin title={title} /> : null}
            <div className="app">               
                <Header username={username} spectator={spectator} title={title} />
                <Table state={state} users={data} spectator={spectator} />
                <Footer stats={stats} state={state} username={username} spectator={spectator} values={notes} />
            </div>
        </>
    );
}

export default App;
  