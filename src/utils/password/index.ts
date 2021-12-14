import { hash, compare } from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { BCRYPT_SALT } from 'src/config/env';

/**
 * [bcrypt](https://www.npmjs.com/package/bcrypt)를 이용한 패스워드를 해시로 암호화
 *
 * @param password - 암호화할 Raw 패스워드
 * @returns 암호화된 패스워드 리턴
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    return await hash(password, BCRYPT_SALT);
  } catch (error) {
    throw new InternalServerErrorException();
  }
}

/**
 * Raw 패스워드와 해시 패스워드 비교
 *
 * @param password - 비교할 Raw 패스워드
 * @param hash - 비교될 암호화된 해시
 * @returns Boolean으로 리턴되는 `password`와 `hash`의 비교값
 */
export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  try {
    return await compare(password, hash);
  } catch (error) {
    throw new InternalServerErrorException();
  }
}
