import { BadRequestException } from '@nestjs/common';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

/**
 * `JWT_PRIVATE_KEY`를 이용해 `payload`를 JWT로 서명
 *
 * `expiresIn` 옵션을 설정하여 토큰 만료 시간 설정 가능
 * [ziet/ms](https://github.com/vercel/ms) 포맷을 따름 (기본값: 2시간)
 *
 * @param payload - JWT에 담을 정보
 * @returns 토큰
 */
export function signJWT(payload: JwtPayload, expiresIn?: string): string {
  if (!expiresIn) expiresIn = '2h';
  return sign(payload, process.env.JWT_PRIVATE_KEY, { expiresIn });
}

/**
 * 토큰을 검증하여 복호화
 * @param token - JWT 서명된 토큰
 * @returns 복호화 오브젝트
 */
export function verifyJWT(token: string): string | JwtPayload {
  try {
    return verify(token, process.env.JWT_PRIVATE_KEY);
  } catch (error) {
    throw new BadRequestException();
  }
}
