# expand-app

Full-stack source for the expand app, an anonymous and secure blockchain based journalism service.

# installation

Installing `expand-app` for development is most simple. We use [`npm`](https://www.npmjs.com/get-npm) for package management, [`git`](https://git-scm.com/downloads) for collaborative mangement and [`nodejs`](https://nodejs.org) as our main programming language, all of which you must install to use `expand-app`.
Below is the way to install all required files for `expand-app`.

## npm and git installation (required)

```sh

# you can use the links above, or you can run these shell commands

sudo apt-get install nodejs
sudo apt-get install npm
sudo apt-get install git

```

### cloning (required)
```sh
# clone

git clone https://github.com/expand-app.git
```

This will install all required project files on to your computer.

### package installation (required)

```sh
# install packages

npm install
```

This will install all required dependencies to your computer as well.

### eslint global install (optional)
```sh

# globally install eslint

sudo npm i -g babel-eslint eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard eslint-plugin-vue

```

`eslint` is a program we use to enforce order on our programs. If you are having trouble matching the linter's specifications, you can use `eslint --fix <file>` when globally installed.

## running the client

To run the client, just type these commands from the root project directory

```sh

cd client

npm start
```

When running the client alone, you will have no ability to search or get names. You will need to run the *server* for this.

## running the server

To run the server, you **must have access to our API keys/enviornment variables**. Please ask someone with write access to this repository for those keys. You may still be denied access.

To start the server, type these commands from the root directory

```sh
cd server

npm start
```
