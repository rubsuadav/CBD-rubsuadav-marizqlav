# !/bin/bash

sudo apt install curl
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install nodejs
node -v
npm -v