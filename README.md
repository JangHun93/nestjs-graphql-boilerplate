## 개발 가이드

| Key                     | 설명                                                                                          | Required |
| ----------------------- | --------------------------------------------------------------------------------------------- | -------- |
| SERVER_PORT             | NestJS 서버가 실행될 포트                                                                     | ✅       |
| MONGO_CONNECTION_STRING | MongoDB의 호스트네임                                                                          | ✅       |
| MONGO_DBNAME            | MongoDB의 데이터베이스 이름                                                                   | ✅       |
| JWT_PRIVATE_KEY         | [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme)을 서명하는데 사용될 암호 키 | ✅       |
| BCRYPT_SALT             | [Bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme) Salt Round                        |          |
