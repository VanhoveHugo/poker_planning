import React, { useEffect } from 'react';

const App = () => {
    const title = String(process.env.NEXT_PUBLIC_NAME);
    useEffect(() => {
        document.title = `PokerPlanning | ${title}`;
    }, [])
    return (
        <div className="app">
            {title}
        </div>
    );
}

export default App;
  