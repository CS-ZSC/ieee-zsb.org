#!/bin/bash

cd $HOME/master && git pull && npm install
pm2 restart $HOME/ecosystem.config.js --only master
