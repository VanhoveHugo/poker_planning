import io from 'socket.io-client';

import '../styles/index.css';

export const socket = io.connect(process.env.NEXT_PUBLIC_SERVER_URL);

function MyApp({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  );
}

export default MyApp;