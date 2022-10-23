#!/bin/bash

if [ -d "venv" ]
then
  echo "Python venv folder already exists"
else
  python3 -m venv venv
fi

echo $PWD
source venv/bin/activate

pip3 install -r requirements.txt

if [ -d "logs" ]
then
  echo "Logs folder already exists"
else
  mkdir logs
  touch logs/error.log logs/access.log
fi
chmod 777 logs
echo "envsetup finished"