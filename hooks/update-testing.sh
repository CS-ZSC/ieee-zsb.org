#!bin/bash

cd .. && git pull
pm2 restart $HOME/ecosystem.config.js --only testing
