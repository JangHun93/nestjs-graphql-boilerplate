interface IKeyName {
  key: string;
  name: string;
}

/**
 * 주어진 Object Literal을 언팩하는 유틸리티
 * @param literal - Literal
 * @returns `{key: string, value: string}` 형식의 literal key-value 페어 목록
 */
export function unpackLiterals(literal: Record<string, string>): IKeyName[] {
  const literalValues = Object.values(literal);
  return Object.keys(literal).map((key, i) => ({
    key,
    name: literalValues[i],
  }));
}
