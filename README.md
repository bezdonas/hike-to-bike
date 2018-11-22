# Hike to bike

Simple app for finding closest [indego](https://www.rideindego.com/) bycicle station

- [Demo](https://hike-to-bike.herokuapp.com)
- [Travis CI](https://travis-ci.com/bezdonas/hike-to-bike/)

- [Task](https://docs.google.com/document/d/1z3zuNeS7Gt0CbS9HMXQC-ta7ICUi35JA0Bn6kCYCGwQ/edit)
- [Indego API](https://www.rideindego.com/stations/json/)

# Quick start

## Via npm

- `npm start` starts dev-server
- `npm test` runs tests via jest in watch mode
- `npm run test:ci` runs tests via jest once
- `npm run build` builds production bundle in `./build`

## Via docker

- `npm run dstart` starts dev-server (`docker-compose up`)
- `npm run dtest` runs tests in docker container (`docker-compose run hike-to-bike npm run test:ci`)
- `npm run dbuild` builds production bundle in `./build` (`docker-compose run hike-to-bike npm run build`)
- `npm run dcleanup` cleans up all docker stuff (`docker-compose down --rmi all -v`)

# CI/CD

- Travis runs build and test in docker-container
- Then compiled build-folder is moved to heroku
- Heroku deploys static build

# Technologies

- [webpack](https://webpack.js.org/)
- [prettier](https://prettier.io/)
- [jest](https://jestjs.io/)
- [babel](https://babeljs.io/)
- [eslint](https://eslint.org)
- [docker](https://www.docker.com/)
- [preact](https://preactjs.com/)
- [Leaflet](https://leafletjs.com)
- [Mapbox](https://mapbox.com/)
