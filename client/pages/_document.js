import { Html, Head, Main, NextScript } from 'next/document'
import dotenv from 'dotenv'

export default function Document() {
  dotenv.config()
  return (
    <Html lang="fr-FR">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Service d'estimation de tickets" />
        <meta name="author" content="Vanhove hugo" />
        <link rel="shortcut icon" href="../images/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}