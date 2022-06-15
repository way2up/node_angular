# node_angular

## create node and angular project

1) `$ npm init -- to create step by step` or `$ npm init -y  -- to create standard package.json`
2) `$ create index.js file`
3) `$ npm i express` for node
4) `$ npm i mongoose` for mongoDb
5) `$ npm i nodemon` for auto run server in develop
6) `$ ng new <project Name> ` to create new angular project 
7) `$ npm i concurrently` for run server and client side projects
8) `$ put it in your server side package.json` 
`$ "scripts": {
    "start": "node index",
    "server": "nodemon index",
    "client-install": "npm install --prefix client",
    "client": "npm run start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\" "
  },`
  9) `$ npm run dev` for run app server  (localhost: 3000) and client (localhost: 4200) side 

  10) `$ node seed/user-seeder.js`  for insert Data in users and skills Collections
