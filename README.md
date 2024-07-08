# C2G1_Project (Dell Academy)
A resource management web application that manages workshops, trainers and clients using ReactJS for frontend.

Table of contents
---
1. [Requirements](#requirements)
    1. [Frontend](#frontend)
    2. [Backend](#backend)
2. [Getting Started](#gettingstarted)
    1. [Cloning Frontend Repository](#cloningfrontend)
    2. [Cloning Backend repository](#cloningbackend)
    3. [Install dependencies](#installdep)
3. [Running](#running)
4. [What to expect](#outcome)
 
<a id="requirements"></a>
## Requirements  :
---
<a id="frontend"></a>
### Frontend
* React
* npm
* j-son server

<a id="backend"></a>
### Backend
* docker
* C2G1_Backend 

<a id="gettingstarted"></a>
## Getting started
---
<a id="clonefrontend"></a>
### Clone Frontend repository
```shell
git clone https://github.com/CoderJae777/C2G1_Project.git
```
<a id="clonebackend"></a>
### Clone Backend Repository
```shell
git clone https://github.com/leesean5150/C2G1_Backend.git
```
<a id="installdep"></a>
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

<a id="running"></a>
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
Open in [http://localhost:3000](http://localhost:3000)


<a id="outcome"></a>
## What to expect
---
screenshot of homepage