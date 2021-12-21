1. Express server 구축 (Window Ubuntu)
  $ mkdir /home/djkang/project-src/test-node
  $ cd /home/djkang/project-src/test-node
  $ npm init
    ㄴ 정보입력

  - express install
    $ npm install express --save
    # 혹은
    $ yarn add express

	- sockjs install
		$ yarn add sockjs

	- cors install
		$ yarn add http express cors

	- module install (package.json "type": "module" 추가)
		$ yarn add module

	<!-- - chalk install
		$ yarn add chalk -->
		
	- chalk-template install
		$ yarn add chalk-template

	- ES6/7 사용을 위한 Babel 연동
		$ yarn add @babel/cli @babel/core @babel/preset-env @babel/node --dev

	- uuid install <!-- 쓸데 없을수도 -->
		$ yarn add uuid

	- url install
		$ yarn add url

	- nodemon install
		$ yarn add nodemon --dev

  - 실행
    # Wsl.md Local 실행 참조

	- Mecurial 등록
		http://scm.corp.simplexi.com/
		

※ Client 적용
	- library
		ㄴ https://socket.io/docs/v4/client-installation/
		ㄴ https://socket.io/docs/v4/


※ API 문서
	- express 4.x
		ㄴ https://expressjs.com/ko/4x/api.html

	- sockjs
		ㄴ https://openbase.com/js/sockjs/documentation#sockjs-node-api


※ 참조 문서
	- nginx socket.io 설정
		ㄴ https://www.cikorea.net/bbs/view/tip?idx=16769

		```
		#socket.io.js파일 전용.
    location /socket.io/ {
        proxy_pass http://localhost:2800/socket.io/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_redirect off;
 
        proxy_buffers 8 32k;
        proxy_buffer_size 64k;
 
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
    }
		```
		
	- MVC 패턴
		ㄴ https://gofnrk.tistory.com/65

		ㄴ https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=psj9102&logNo=221282415870
		ㄴ https://velog.io/@jinukix/Node.js-MVC-%EB%AA%A8%EB%93%88%ED%99%94

		# Prisma Client 활용
			ㄴ https://velog.io/@jinybear/TIL-6.-%EB%AA%A8%EB%93%88%ED%99%94%EC%99%80-MVC-%ED%8C%A8%ED%84%B4-2
			ㄴ https://velog.io/@iamhayoung/prisma-schema
			ㄴ https://junlab.tistory.com/163

	- ES6/7 사용을 위한 Babel 연동
		https://github.com/babel/example-node-server
		https://junlab.tistory.com/145

※ KILL
	# Linux/Mac
		$ lsof -i tcp:3000
		$ kill -9 PID

	# Windows
		netstat -ano | findstr :3000
		tskill typeyourPIDhere




※ Node.js 웹 앱의 도커라이징
  https://nodejs.org/ko/docs/guides/nodejs-docker-webapp/


※ Express server 구축
	https://velog.io/@syc1013/NodeJS%EB%A1%9C-Chat-app-%EB%A7%8C%EB%93%A4%EA%B8%B0



※ 채팅 서버 만들어 보기
	0. Window Ubuntu 실행
	1. nvm으로 node 설치
		ㄴ https://docs.microsoft.com/ko-kr/windows/dev-environment/javascript/nodejs-on-wsl
		ㄴ https://tutorialpost.apptilus.com/code/posts/nodejs/nvm-for-node-version-manager/

		$ sudo apt-get install curl
		$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

		// .bashrc 설정 리로드
			$ source ~/.bashrc
		$ nvm --version
		$ nvm ls

		# 권장 (Node.js의 안정적인 최신 LTS 릴리스를 설치)
			$ nvm install [버전]
			$ nvm install --lts

		$ nvm ls
		$ node -v

		$ nvm use [버전]

		# node.js 설치 경로 확인하기
			$ which node

	2. Express server 구축
		2.1. Window Ubuntu 실행
		2.2. nodejs 프로젝트 만들기
			ㄴ https://heropy.blog/2018/02/18/node-js-npm/
			ㄴ https://www.deok.me/entry/NodeJS-NodeJS-Express-%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%84%9C%EB%B9%84%EC%8A%A4-%EA%B0%9C%EB%B0%9C-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0
			$ mkdir /home/djkang/project-src/test-node
			$ cd /home/djkang/project-src/test-node
			$ npm init
				ㄴ 정보입력

			$ npm install express --save
			# 혹은
			$ yarn add express



// ##### 참조1 시작
https://www.deok.me/entry/NodeJS-NodeJS-Express-%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%84%9C%EB%B9%84%EC%8A%A4-%EA%B0%9C%EB%B0%9C-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0
https://heropy.blog/2018/02/18/node-js-npm/
// ##### 참조1 종료


// ##### 참조2 시작
	https://github.com/igorantun/node-chat

	$ git clone https://github.com/igorantun/node-chat.git
	$ npm install
	$ node app.js
// ##### 참조2 종료
