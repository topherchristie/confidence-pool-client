#~/usr/bin/env bash
sudo add-apt-repository ppa:git-core/ppa -y
apt-get update
apt-get install -y curl build-essential python-dev libkrb5-dev
apt-get install -y git

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# apt-get update
# apt-get install -y nginx

# service nginx stop

# sudo cp /vagrant/nginx-conf/nginx.conf /etc/nginx/nginx.conf
# sudo cp /vagrant/nginx-conf/default /etc/nginx/sites-available/default
# sudo sed -i.bak 's/sendfile on/sendfile off/' /etc/nginx/nginx.conf


# service nginx start

# mkdir /opt/redis
# mkdir /opt/redis/bin
# cd /opt/redis

# wget http://download.redis.io/redis-stable.tar.gz
# tar xvzf redis-stable.tar.gz
# cd redis-stable

# make

# cp src/redis-server /opt/redis/bin/redis-server
# cp src/redis-cli /opt/redis/bin/redis-cli

# cp /vagrant/redis.init.d /etc/init.d/redis
# cp /vagrant/redis.conf /etc/redis.conf

# mkdir /var/redis
# chmod -R 777 /var/redis

# useradd redis

# sudo touch /var/log/redis.log
# sudo chown redis /var/log/redis.log
# sudo chgrp redis /var/log/redis.log

# chmod 755 /etc/init.d/redis
# /etc/init.d/redis start



# Note the new setup script name for Node.js 
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
# Then install with:
sudo apt-get install -y nodejs

#sudo npm install -g gulp
#~sudo npm install -g nodemon

#npm install
#npm install -dev
#echo "export DB_PORT_27017_TCP_ADDR=dev2:5AwGFu6uAy78@ds029535-a0.mongolab.com:29535,ds029535-a1.mongolab.com:29535" >> ~/.profile
