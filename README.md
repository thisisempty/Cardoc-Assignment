![Cardoc-coperation](https://media-exp1.licdn.com/dms/image/C4E1BAQHAMhi2VTSv3g/company-background_10000/0/1635417694283?e=2159024400&v=beta&t=o9RSyITmlriZNbLMsFBZMQGYBEth5M9uvU8sve_6UMg)

# Cardoc-Coperation Assignment

------

**Wanted x Wecode Pre-onboarding course Assignment #7**

- 과제 출제 기업 정보
  - 기업명 : 카닥

<aside>
💡 본 과제는 저작권의 보호를 받으며, 문제에 대한 정보를 배포하는 등의 행위를 금지 합니다.
</aside>

>## 배포 주소
>
>[http://13.125.45.93:3000/](http://13.125.45.93:3000/) 
>
>## API 문서
>
>https://documenter.getpostman.com/view/18212222/UVJckGY8

> ## 사용 기술
>
> - Back-End: <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/sqlite3-4479A1?style=for-the-badge&logo=sqlite&logoColor=white"> <img src="https://img.shields.io/badge/Nest.js@17.0.1-E0234E?style=for-the-badge&logo=Nestjs&logoColor=white">
> - Deploy: <img src="https://img.shields.io/badge/Docker-5523E?style=for-the-badge&logo=Docker&logoColor=white"> <img src="https://img.shields.io/badge/AWS(EC2)-232F3E?style=for-the-badge&logo=amazon aws&logoColor=white">
> - ETC: <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white">
>   <br/>

> ## 모델링
>
> ![스크린샷 2021-11-29 오전 6.14.40](/Users/dabeen/Downloads/스크린샷 2021-11-29 오전 6.14.40.png)



> ## 구현기능
>
> ###  사용자 생성 API
>
> - id / password로 사용자를 생성하는 API
> - ValidationPipe를 통한 유효성 검사를 시행하여 통해 형식에 맞지 않는 request일 경우 error 반환합니다.
> - 이미 존재하는 id의 경우 관련된 error 반환합니다.
>
> ### 로그인 API
>
> - jwtService를 통해 id와 password가 일치하는지 확인후 일치하면 access_token 발행합니다.
> - 존재하지 않는 id나 password 불일치의 경우 error 반환합니다.
>
> ### 사용자가 소유한 타이어 정보를 저장하는 API
>
> - 한번에 최대 5명의 사용자에 대한 요청을 받을 수 있으며 5명을 초과하거나 데이터가 없는 경우 error 반환합니다.
> - 자동차 차종 ID(trimID)를 이용하여 사용자가 소유한 자동차 정보 user_trims테이블에 저장합니다.
> - request body에 전달된 trimId와 외부 API`https://dev.mycar.cardoc.co.kr/v1/trim/{trimId}` 를 사용하여 해당 자동차의 정보를 가져와 spec -> driving -> frontTire/rearTire에 있는 타이어 정보를 가져오고 ` {폭}/{편평비}R{18}` 와 같은 구조일때만 tires 테이블에 저장할 수 있습니다. 포맷이 일치하지 않거나 빈 값이면 error를 반환합니다.
>
> ### 사용자가 소유한 타이어 정보 조회 API
>
> - 사용자 ID를 path parameters로 받아 타이어 정보를 조회할 수 있다.



> ## 서비스 구조
>
> backend 서버는 node.js로, 데이터베이스는 sqlite로 구축하였습니다.

> ## 실행 방법
>
> ------
>
> 1.  다음의 명령어로 github repository를 원하는 위치에 clone 합니다.
>
> ``` shell
> git clone https://github.com/thisisempty/Cardoc-Assignment.git
> ```
>
> 2. 프로젝트 root directory에 다음의 명령어로 .env파일을 생성합니다.
>
> ```shell
> touch .env
> ```
>
> 3. env파일에 다음의 내용을 작성합니다
>
> ```tex
> PORT=3000
> SECRET_KEY=secret_key
> JWT_EXPIRATION=3600
> ```
>
> 4. 다음의 명령어로 docker image를 생성합니다.
>
> ```shell
> docker build -t cardoc .
> ```
>
> 5. 생성한 이미지를 실행합니다.
>
> ```shell
> docker run -p 3000:3000 cardoc
> ```
>
> 5-1. 백그라운드 실행을 원하는 경우 다음 명령어를 사용합니다.
>
> ```shell
> docker run -dp 3000:3000 cardoc
> ```

> ## 폴더 구조
>
> ```code
> .
> ├── Dockerfile
> ├── README.md
> ├── cardoc.db
> ├── nest-cli.json
> ├── package-lock.json
> ├── package.json
> ├── src
> │   ├── app.module.ts
> │   ├── auth
> │   │   ├── auth.controller.ts
> │   │   ├── auth.module.ts
> │   │   ├── auth.service.ts
> │   │   ├── dto
> │   │   │   ├── auth-credential.dto.ts
> │   │   │   └── signin.dto.ts
> │   │   ├── entity
> │   │   │   └── user.entity.ts
> │   │   └── jwt.strategy.ts
> │   ├── common
> │   │   ├── base-entity.ts
> │   │   └── login.decorator.ts
> │   ├── main.ts
> │   ├── tires
> │   │   ├── dto
> │   │   │   ├── create-tire.dto.ts
> │   │   │   └── create-user-tire.dto.ts
> │   │   ├── entity
> │   │   │   └── tire.entity.ts
> │   │   ├── tires.controller.ts
> │   │   ├── tires.module.ts
> │   │   └── tires.service.ts
> │   └── user-trims
> │       ├── dto
> │       │   └── create-user-trim.dto.ts
> │       ├── entity
> │       │   └── user-trim.entity.ts
> │       ├── user-trims.controller.ts
> │       ├── user-trims.module.ts
> │       └── user-trims.service.ts
> ├── test
> │   ├── app.e2e-spec.ts
> │   └── jest-e2e.json
> ├── tsconfig.build.json
> └── tsconfig.json
> ```
>
> 

