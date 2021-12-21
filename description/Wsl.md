# Wsl
## Local 실행
  ```
    - 경로이동
      $ cd /home/djkang/project-src/test-node/docker

    - 권한주기
      $ chmod +x ./docker-build.sh
      $ chmod +x ./docker-run.sh

    - 빌드
      $ ./docker-build.sh

    - 실행
      $ ./docker-run.sh
  ```

## [Windows 10] Docker 설치 완벽 가이드(Home 포함)
  > [Docker 설치 완벽 가이드(Home 포함)](https://www.lainyzine.com/ko/article/a-complete-guide-to-how-to-install-docker-desktop-on-windows-10/)

1. Windows PowerShell 관리자 모드 실행
    > Windows + S
    <br/>
    > Windows PowerShell (관리자모드 실행)

2. WSL 기능 활성화
    > 2.1. DISM(배포 이미지 서비스 및 관리) 명령어로 Microsoft-Windows-Subsystem-Linux 기능을 활성화합니다.
    ```
    $ dism.exe /online /enable-feature
    ```

    > 2.2. VirtualMachinePlatform 기능 활성화
    ```
    dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
    ```

    > 2.3. window restart

3. WSL2 Linux 커널 업데이트
    > 3.1. 업데이트 파일 받아 실행 (x64 머신용 최신 WSL2 Linux 커널 업데이트 패키지)\
    > > ㄴ 나같은 경우에는 그냥 윈도우 업데이트 있는지 확인하고 있어서 업데이트 함

    > 3.2. WSL 버전을 2로 변경
    > > ㄴ 나같은 경우에는 그냥 윈도우 업데이트 있는지 확인하고 있어서 업데이트 함

4. 마이크로소프트 스토어에서 리눅스 설치
    > : 마이크로소프트 스토어(Microsoft Store) 앱을 열고 Ubuntu를 검색합니다.\
    >   ㄴ Window + S => Ubuntu => 설치

    > 4.1. Ubuntu 설치

    > 4.2. Ubuntu 에서 사용 할 아이디/패스워드 설정

    > 4.3. Ubuntu 버전 확인
    > > ``` $ wsl -l -v ```

5. Docker Desktop 다운로드 및 설치
    > 5.1. [다운로드](https://www.docker.com/products/docker-desktop) 받은파일 실행
    > > [에러!](https://hello-bryan.tistory.com/159) => docker desktop requires the server service to be enabled\
    > > 시스템에 WSL2가 활성화되어있다면 Docker는 기본적으로 WSL2를 백엔드로 Docker Engine을 실행합니다.

    > 5.2. 도커 실행 후 설정
    > > Ubuntu 활성화 (Setting => Resources => WSL INTEGRATION => Ubuntu)

6. 실행해보기
    > 6.1. 탐색기 열기
    > > ``` \\wsl$ ```

    > > 필요한 파일 및 폴더 옮기기

    > 6.2. 권한주기 ( 예 : sudo chmod a+rwx wslfolder )
    ```
      - -R 옵션으로 하위폴더까지 권한주자
        $ chmod -R a+rwx /home/djkang

      - 도커 빌드
        $ docker build -t image-test-node:0.1 -f $PWD/flask/Dockerfile .

      - 컨테이너 실행
        $ docker run --name server-test-node -d -p 10001:10001 \
            -v /home/djkang/test-node:/home/user-docker/test-node --env MODE=default \
            image-test-node:0.1 sh /start-flask.sh

        ## 1. 기존에 안나던 에러 발생
          : https://edudeveloper.tistory.com/134
            ㄴ ImportError: cannot import name 'cached_property' from 'werkzeug' (/usr/local/lib/python3.7/site-packages/werkzeug/__init__.py)
              => Werkzeug >= 1.0 버전부터 flask-restplus를 중단 했다고 한다. 그래서 버전 오류에 문제이다.
              => /home/djkang/test-node/docker/flask/config/requirements.txt
                ㄴ Werkzeug==0.16.0 (추가)

        ## 2. 기존에 안나던 에러 발생
          : https://stackoverflow.com/questions/65610809/retrieving-data-from-rds-gives-attributeerror-sqlalchemy-cimmutabledict-immuta
            => /home/djkang/test-node/docker/flask/config/requirements.txt
              ㄴ Flask-SQLAlchemy==2.5.0 (버전 변경)

        ## 3. 기존에 안나던 에러 발생
          : https://stackoverflow.com/questions/58661569/password-with-cant-connect-the-database
            => 패스워드에 @ 들어있으면 안됨 (sqlalchemy.exc.OperationalError)
              ㄴ import urllib.parse
              ㄴ MYSQL_PASSWD = urllib.parse.quote_plus("qkd@ktrks")

    ```

7. 네트웍 드라이브 생성 및 mucurial 연동
    > ``` \\wsl$ 이동 ```

    > 네트웍으로 연결

8. wsl2 console 네트웍 설정확인
    > 8.0. 1차 테스트 (아래 안될것임)
    ```
    $ curl -X GET http://ezp.cafe24test.com/sign/front/in
    $ curl -X GET http://ezp.cafe24test.com/mobile/sign/front/in
    ```

    > 8.1. wsl.conf 설정
      ```
      $ sudo vi /etc/wsl.conf

        [network]
        generateHosts = false
        generateResolvConf = false
      ```

    > 8.2. hosts 설정
      : 172.25.128.1 <- wsl ip
      ```
      $ sudo cp /mnt/c/Windows/System32/drivers/etc/hosts /etc/hosts

      $ sudo vi /etc/hosts

        172.25.128.1 bakan.cafe24test.com
        172.25.128.1 ezp.cafe24test.com
        172.25.128.1 square.ezp.cafe24test.com
        172.25.128.1 ezpwp.cafe24test.com
        172.25.128.1 ezpsquare.cafe24test.com
        172.25.128.1 quixlab.cafe24test.com
        172.25.128.1 seller.ezp.cafe24test.com
        172.25.128.1 pub.ezp.pc.cafe24test.com
        172.25.128.1 pub.ezp.mo.cafe24test.com
        172.25.128.1 pub.seller.pc.cafe24test.com

        1.209.179.26 bakan.cafe24test.com
        1.209.179.26 ezp.cafe24test.com
        1.209.179.26 square.ezp.cafe24test.com
        1.209.179.26 ezpwp.cafe24test.com
        1.209.179.26 ezpsquare.cafe24test.com
        1.209.179.26 quixlab.cafe24test.com
        1.209.179.26 seller.ezp.cafe24test.com
        1.209.179.26 pub.ezp.pc.cafe24test.com
        1.209.179.26 pub.ezp.mo.cafe24test.com
        1.209.179.26 pub.seller.pc.cafe24test.com
      ```
    
    > 8.3. 재기동
      ```
      PS C:\> Restart-Service LxssManager*
      PS C:\> wsl --shutdown
      ```

    > 8.4. 설정확인
      ```
      $ curl -X GET http://ezp.cafe24test.com/sign/front/in
      $ curl -X GET http://ezp.cafe24test.com/mobile/sign/front/in
      $ curl -X GET http://bakan.cafe24test.com/login/front?type=isAuthFail
      $ curl -X GET http://square.ezp.cafe24test.com/sign/front/in?type=isAuthFail
      ```

9. resolv.conf
  > 9.1. nameserver 추가
    ```
      $ sudo vi /etc/resolv.conf
      ...
      nameserver 8.8.8.8
      nameserver 8.8.4.4
    ```



※ 아래는 다른것들 안되면 확인만
99. WSL2 프로세스 외부 접속을 위한 포트포워딩
    > [netsh를 이용하여 WSL2 서비스 포트포워딩 설정](https://butteryoon.github.io/tools/2020/10/28/Windows_netshell.html)
    > [WSL2, 외부 네트워크와 연결하기](https://codeac.tistory.com/118)

    > 99.1. PowerShell 관리자 권한 실행

    > 99.2. PowerShell 함수로 만들기
      ```
      Set-ForwardRules -add 4000 : 4000번 포트를 WSL로 포트프록시 연결 설정 추가.
      Set-ForwardRules -del 4000 : 4000번 포트를 WSL로 포트프록시 연결 설정 삭제.
      ```

      ```
        # 함수 등록
          PS C:\> .\MyFunctions.ps1
          PS C:\> . .\MyFunctions.ps1

        # 함수 확인
          PS C:\> cd Function:
          PS Function:\> ls
      ```

    > > MyFunctions.ps1
      ```
        function Set-ForwardRules {
        <#
        .Synopsis 
        WSL 서비스를 위해 netsh interface portproxy 규칙 설정 
        .Description
        add netsh interface portproxy rules for WSL Services
        .Parameter Role
        .Example 
        Set-ForwardRules -add 4000
        Set-ForwardRules -del 4000
        .Link 
        https://butteryoon.github.io/tools/2020/08/28/ps_netstat.html
        #>
            Param (
                [switch]$add,
                [switch]$del 
            )

            $connectPort = $args[0]

            $connectAddress = bash -c 'ip -f inet addr show dev eth0 | egrep -o \"[[:digit:]]{1,3}.[[:digit:]]{1,3}.[[:digit:]]{1,3}.[[:digit:]]{1,3}\" | head -n 1'

            if ( $connectAddress ) {
                Write-Host "WSL IP Address : $connectAddress"
            } else {
                Write-Host "Can't find the IP address of the WSL2"
            }

            if ($add) {
                Invoke-Expression "netsh interface portproxy add v4tov4 listenport=$connectPort listenaddress=0.0.0.0 connectport=$connectPort connectaddress=$connectAddress"
            } elseif ($del) {
                Invoke-Expression "netsh interface portproxy delete v4tov4 listenport=$connectPort listenaddress=0.0.0.0"
            }

            Invoke-Expression "netsh interface portproxy show all"
        }
      ```

    > 99.3. netsh 포트프록시 설정 목록을 확인
    > > $ netsh interface portproxy show all

    > 99.4. (함수로 안만들었을때) WSL2 호스트에 접근 가능한 포트프록시 연결을 추가
    > > $ netsh interface portproxy add v4tov4 listenport=4000 listenaddress=0.0.0.0 connectport=4000 connectaddress=172.20.147.206

    > 99.5. 수동 삭제
    ```
    PS C:\WINDOWS\system32> iex "netsh interface portproxy delete v4tov4 listenport=80 listenaddress=*"
    PS C:\WINDOWS\system32> iex "netsh interface portproxy delete v4tov4 listenport=50 listenaddress=*"
    PS C:\WINDOWS\system32> iex "netsh interface portproxy delete v4tov4 listenport=4000 listenaddress=*"
    PS C:\WINDOWS\system32> iex "netsh interface portproxy delete v4tov4 listenport=5000 listenaddress=0.0.0.0"
    PS C:\WINDOWS\system32> iex "netsh interface portproxy delete v4tov4 listenport=listenaddress=0.0.0.0 listenaddress=*"
    PS C:\WINDOWS\system32> iex "netsh interface portproxy delete v4tov4 listenport=3000 listenaddress=0.0.0.0"

    PS C:\WINDOWS\system32> netsh interface portproxy show all
    ```



