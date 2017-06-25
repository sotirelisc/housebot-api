[![Build Status](https://travis-ci.org/sotirelisc/housebot-api.svg?branch=master)](https://travis-ci.org/sotirelisc/housebot-api)

## Overview

**HouseBot** is the updated, 2017 version of Sydomus, a 2014 Android app with house listings either for rent or purchase.
Sydomus was built using Parse as its BaaS. HouseBot uses this new, NodeJS & MongoDB powered API. Still needs a lot of work.

**Features:**
- JWT-based User System
- CRUD Operations on Houses

## Endpoints

### User

```POST``` ```/api/v1/users/signup``` Create a User (sign-up)

```POST``` ```/api/v1/users/signin``` Sign in a User

```GET``` ```/api/v1/users/userId``` Get User info

```GET``` ```/api/v1/users/userId/houses``` Get Houses owned by User

### House

```GET``` ```/api/v1/houses``` Get all Houses

```POST``` ```/api/v1/houses``` Create a House (requires token of signed-in User as Authorization header)

```GET``` ```/api/v1/houses/houseId``` Get House info

```PUT``` ```/api/v1/houses/houseId``` Update House info

```GET``` ```/api/v1/houses/houseId/owner``` Get House owner (User)

## Testing

Currently, test coverage is low, but tests are a priority.

Run tests with ```npm test```

## Running

In order to start the API you need a MongoDB instance with the corresponding URI.

You have to set two env variables (you can also put them in a ```api/config/env.js``` file):

```process.env.MONGO_DB``` URI connecting to your MongoDB database

```process.env.PASSPORT_KEY``` A string of your choice used by Passport for JWT tokens


Run ```npm install``` and then ```npm start```

## Contributing

- Fork repo
- Create a new branch using ```git checkout -b <name>```
- Push your commit there (ensure tests are green)
- Create a pull request

## License

HouseBot is released under the [Apache 2.0 License](https://opensource.org/licenses/Apache-2.0).
