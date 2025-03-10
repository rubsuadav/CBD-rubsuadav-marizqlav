# !/bin/bash

sudo apt install curl
curl -o- https://fnm.vercel.app/install | bash
fnm install 22
node -v # Should print "v22.14.0".
npm -v # Should print "10.9.2".
