#!/usr/bin/env bash
HOSTNAME=`hostname -s`
# IP_ADDR=`ifconfig eth0 | grep 'inet addr:' | cut -d: -f2 | awk '{ print $1}'`

# echo $HOSTNAME
# echo $IP_ADDR

run_script() {
    if [[ $HOSTNAME =~ ^bakan-dev ]]; then
        # docker-compose -f /home/user-docker/test-node/docker/docker-compose.dev.yml up -d --build
        docker run --name server-test-node -u 1000 -d -p 10002:3000 --read-only -v /home/user-docker/test-node:/home/user-docker/test-node --env MODE=dev image-test-node:0.1 sh /start-node.sh
    elif [[ $HOSTNAME =~ ^bakan-qa ]]; then
        # docker-compose -f /home/user-docker/test-node/docker/docker-compose.qa.yml up -d --build
        docker run --name server-test-node -u 1000 -d -p 10002:3000 --read-only -v /home/user-docker/test-node:/home/user-docker/test-node --env MODE=qa image-test-node:0.1 sh /start-node.sh
    elif [[ $HOSTNAME =~ ^bakan- ]]; then
        # docker-compose -f /home/user-docker/test-node/docker/docker-compose.prd.yml up -d --build
        docker run --name server-test-node -u 1000 -d -p 10002:3000 --read-only -v /home/user-docker/test-node:/home/user-docker/test-node --env MODE=prd image-test-node:0.1 sh /start-node.sh
    else
        # docker-compose -f /d/dev/project-src/python-src/test-node/docker/docker-compose.yml up -d --build
        docker run --name server-test-node -d -p 10002:3000 --read-only -v /home/djkang/project-src/test-node:/home/user-docker/test-node --env MODE=default image-test-node:0.1 sh /start-node.sh
    fi
}

docker stop server-test-node
docker rm server-test-node
run_script