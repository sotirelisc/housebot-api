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

```POST``` ```/api/v1/houses``` Create a House

```GET``` ```/api/v1/houses/houseId``` Get House info

```PUT``` ```/api/v1/houses/houseId``` Update House info

```GET``` ```/api/v1/houses/houseId/owner``` Get House owner (User)

## Testing

Currently, test coverage is zero, but tests are a priority.

## Contributing

- Fork repo
- Create a new branch using ```git checkout -b <name>```
- Push your commit there
- Create a pull request
