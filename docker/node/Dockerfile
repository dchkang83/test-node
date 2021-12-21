# 베이스 이미지
FROM node:12

# 필요한 Config ROOT에 복사
ADD ./node/config  /


# pip upgrade & requirements.txt 모듈 설치 & 실행권한 부여
# RUN pip install --upgrade pip && \
#     pip install --no-cache-dir --requirement /requirements.txt && \
#     chmod +x /*.sh


# sh 권한주기
RUN chmod +x /*.sh

## CREATE user-docker USER ##
# Create the home directory for the new user-docker user.
RUN mkdir -p /home/user-docker

# Create an user-docker user so our program doesn't run as root.
RUN groupadd -r user-docker &&\
  useradd -r -g user-docker -d /home/user-docker -s /sbin/nologin -c "Docker image user" user-docker

# Set the home directory to our user-docker user's home.
ENV HOME=/home/user-docker
ENV APP_HOME=/home/user-docker/test-node

## SETTING UP THE APP ##
RUN mkdir $APP_HOME
WORKDIR $APP_HOME



# 앱 의존성 설치
# 가능한 경우(npm@5+) package.json과 package-lock.json을 모두 복사하기 위해
# 와일드카드를 사용
COPY ../package*.json ./

RUN npm install
# 프로덕션을 위한 코드를 빌드하는 경우
# RUN npm ci --only=production







# Chown all the files to the user-docker user.
RUN chown -R user-docker:user-docker $APP_HOME

# Change to the user-docker user.
USER user-docker

# Port
# EXPOSE 8080