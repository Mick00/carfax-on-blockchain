# Prisma and DB config
Creating the db

you need to have docker and docker compose https://docs.docker.com/compose/install/

    go in the root project and simply type this command: docker-compose up
    you can now see your db in docker and is on the localhost:3306

Working with prisma

    You need to create a database prisma in you mysql Db***************
    *do a npm install before *the connection to the db is already set with the mysql container running on localhost:3306 to make a migration * migrations is to keep your database schema in sync with your Prisma schema as it evolves
        you need to modify the schema.prisma file under the prisma folder
        for the first migration you need to call this command in the root folder : npx prisma migrate dev --name init
        Then for the other migrations command : npx prisma migrate dev --name added_job_title
        Detailed documentation: https://www.prisma.io/docs/concepts/components/prisma-migrate

to make a introspection db -> prisma schema

    make the change in the mysql db and then update the schema
    with this command : npx prisma introspect --force
    Detailed documentation: https://www.prisma.io/docs/concepts/components/introspection

Prisma client (used to make queries using objects )

    install it :npm install @prisma/client
    using the client to make queries using objects
    ex: querying a frequency record
    1. import the @prisma/client by adding the line : const { PrismaClient } = require("@prisma/client")
    2. make a object frequency by calling the PrismaClient() constructor : const prisma = new PrismaClient()
    3. make the query in this query we are asking for the first record (the fonction needs to be async) : const frequency1 = await frequency.findFirst()
    4. we can now access the frequency object like this : frequency1.days

# 🏗 Scaffold-Eth Typescript

## Typescript

This is the typescript repo of scaffold-eth and it uses `hardhat` and `vite`. The directories that you'll use are:

```bash
packages/vite-app-ts/
packages/hardhat-ts/
```

## Quick Start

Running the app

1. install your dependencies

   ```bash
   yarn install
   ```

2. start a hardhat node

   ```bash
   yarn chain
   ```

3. run the app, `open a new command prompt`

   ```bash
   # build hardhat & external contracts types
   yarn contracts:build 
   # deploy your hardhat contracts
   yarn deploy
   # start the app
   yarn start 
   ```

4. other commands
   ```bash
   # rebuild all contracts, incase of inconsistent state
   yarn contracts:rebuild
   # run hardhat commands for the workspace, or see all tasks
   yarn hardhat 'xxx'
   # run subgraph commands for the workspace
   yarn subgraph 'xxx'
   ```

## Overview

Everything you need to build on Ethereum! 🚀 Quickly experiment with Solidity using a frontend that adapts to your smart contract:

![image](https://user-images.githubusercontent.com/2653167/124158108-c14ca380-da56-11eb-967e-69cde37ca8eb.png)

- 🔏 Edit your smart contract `YourContract.sol` in `packages/hardhat-ts/contracts`
- 📝 Edit your frontend `MainPage.tsx` in `packages/vite-app-ts/src`
- 💼 Edit your deployment scripts in `packages/hardhat-ts/deploy`
- 📱 Open http://localhost:3000 to see the app
- 👷🏽‍♂️ run `yarn hardhat` to get a list of all the tasks.  Run `yarn hardhat taskname` to run the task.

<br/><br/><br/>

--------------------------------------
# Guides

## Documentation

- Check out [eth-hooks docs](https://scaffold-eth.github.io/eth-hooks) for example of how to use hooks


## 🏃💨 Speedrun Ethereum
Register as a builder [here](https://speedrunethereum.com) and start on some of the challenges and build a portfolio.
>  🏁 Make sure to click on the typescript tab!

<br/><br/><br/>

--------------------------------------
# More Information!

## 📚 Documentation

Documentation, tutorials, challenges, and many more resources, visit: [docs.scaffoldeth.io](https://docs.scaffoldeth.io)

Eth-hooks documentation is [here](https://scaffold-eth.github.io/eth-hooks/).  Learn how to use the contexts here.


### 🔭 Learning Solidity

Read the docs: https://docs.soliditylang.org

Go through each topic from [solidity by example](https://solidity-by-example.org) editing `YourContract.sol` in **🏗 scaffold-eth**


## 🛠 Buidl

Check out all the [active branches](https://github.com/austintgriffith/scaffold-eth/branches/active), [open issues](https://github.com/austintgriffith/scaffold-eth/issues), and join/fund the 🏰 [BuidlGuidl](https://BuidlGuidl.com)!

[Follow the full Ethereum Speed Run](https://medium.com/@austin_48503/%EF%B8%8Fethereum-dev-speed-run-bd72bcba6a4c)

### 💬 Support Chat

Join the telegram [support chat 💬](https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA) to ask questions and find others building with 🏗 scaffold-eth!

### 🙏🏽 Support us!

Please check out our [Gitcoin grant](https://gitcoin.co/grants/2851/scaffold-eth) too!


## 🔐 P.S.About keys

You need an RPC and API keys for testnets and production deployments, create an [Alchemy](https://www.alchemy.com/) account and replace the value of `ALCHEMY_KEY = xxx` in `packages/vite-app-ts/.env` with your new keys.

