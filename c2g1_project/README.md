# C2G1_Project (Dell Academy)
A resource management web application that manages workshops, trainers and clients using ReactJS for frontend.

## Requirements :
---
### Frontend
* React
* npm
* j-son server

### Backend
* docker
* C2G1_Backend 


## Getting started
---

### Clone Frontend repository
```shell
git clone https://github.com/CoderJae777/C2G1_Project.git
```
### Clone Backend Repository
```shell
git clone https://github.com/leesean5150/C2G1_Backend.git
```

### Install dependencies
In your terminal, 
```shell
npm install
```

In the event of errors  there are 2 things you can do : 
```shell
npm audit fix
```
```shell
npm audit fix --force
```
Contact developers if you still run into issuess

## Running
---
Json-server needs to be ran to read the local backend database (backend implementation is in the works)

```shell
npx json-server --watch trainer_db.json --port 8000
```
```shell
npx json-server --watch workshop_db.json --port 8002
```
```shell
npx json-server --watch today_db.json --port 8003
```

Starting the web Application

```shell
npm start
```

## What to expect
---
screenshot of homepage