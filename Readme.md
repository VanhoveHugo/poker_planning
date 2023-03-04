
# Poker Planning

This is a web-based application designed to facilitate poker planning sessions for agile teams. Poker planning is a consensus-based technique used to estimate the effort or complexity of tasks in software development projects.


## Features

- Real-time updates of the planning session status
- Support for custom card decks and card values
- Option to hide/show individual votes to promote unbiased estimation

## Tech Stack

**Client:** NextJs, SASS, Socket.io-client

**Server:** Node, Express, Socket.io


## Installation

Clone repository
```bash
git clone https://github.com/VanhoveHugo/pokerplanning.git
```

## Configuration

Change the #hex in client/styles/_theme.scss and regenerated SASS

### Client
Replace .env.sample with .env on **client file** 
```bash
cd ./client
cp .env.sample .env
```
Change environment variable
- NEXT_PUBLIC_NAME=**Name of your company**
- NEXT_PUBLIC_SERVER_URL=**Your server's link ( + port )**
- NEXT_PUBLIC_NOTES=**Name of your company**
- NEXT_PUBLIC_SPECTATOR_VALIDATION_ONLY=**Want only the spectators to reveal the cards**

### Server
Replace .env.sample with .env on **server file** 
```bash
cd ./server
cp .env.sample .env
```
Change environment variable
- CLIENT_URL=**Your client's link ( + port )**
- SERVER_PORT=**Port you want to use for your server**

## Get Started

Install dependencies on both client and server

```bash
cd ./client && npm install && cd ../server && npm install && cd ..
```

```bash
docker-compose up
```

Go on folder pokerplanning and type :

```bash
docker-compose up
```
## Documentation

| Informations | values | 
|---|---|
| Users max in app | none |
| Users max around table | 12 |
| Letters max per username | 8 - 9 |
| Multiple same username | none |

## Contributing

Contributions to this project are welcome. If you find a bug or have a feature request, please create an issue on GitHub. If you'd like to contribute code, please fork the repository and create a pull request with your changes.

## Support

For support, email contact@vanhovehugo.fr
## Acknowledgements

This project was inspired by the [Planning poker online](https://planningpokeronline.com/) website.
