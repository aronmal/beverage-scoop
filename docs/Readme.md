# Readme

[![works badge](https://img.shields.io/badge/works-on%20my%20machine-brightgreen)](https://github.com/limited-dev)

# Installing nodejs

This is needed (if you haven't already installed node on your computer), because the frontend and backend are served with nodejs. Take a look in the documentation for more details about the working principle

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash # download and executing the installation script for nvm (Node Version Manager)
nvm install node # installing latest (17.1.0 Current) version of nodejs
```

Clone the reposetory (if you haven't already):


```bash
git clone https://github.com/aronmal/beverage-scoop.git # git must be installed!
```

Or download the project as zipped file manually from Github and extract it. Navigate in the nodejs folder:

```bash
cd nodejs/ # navigating in the nodejs folder (inside the project folder)
```

Next Step (must be executed inside of the nodejs folder!):

```bash
npm ci # executing clean-install (to create the necessary node_modules folder)
npm start # starting up the server
```

expected Console output behavior:


```bash
user@device:~/beverage-scoop/nodejs$ npm start

> beverage-scoop@1.0.0 start
> node .

Server running on: http://localhost:5000
```

Congratulation, your frontend with backend api is set up! Next step, flash the Arduino.

# script list:
- rpi:
    - ConnectionTest.py -- this script will be the rpi part of a connection test.
    - main.py -- "main" script; likely will be scraped
- PumpController:
    - ./src/main.cpp -- this script will controll the pumps
