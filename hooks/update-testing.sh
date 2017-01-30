#!/bin/bash

cd $HOME/testing && git pull && npm install
pm2 restart $HOME/ecosystem.config.js --only testing
