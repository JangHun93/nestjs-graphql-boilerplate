// import * as dayjs from 'dayjs';
// import { BadRequestException } from '@nestjs/common';
// import { Condition } from 'mongoose';
// import { TimeUnitKey, TIME_UNITS } from 'src/ems/shared/literals';
// import { TimeRangeInput } from 'src/types/graphql.schema';

/**
 * 가장 가까운 15분 단위의 쿼터로 변환
 *
 * @param time - 지정된 시간
 */
// export function getRoundQuarter(time: Date): Date {
//   const ms = 1000 * 60 * 15; // convert quarter to ms
//   return new Date(Math.round(time.getTime() / ms) * ms);
// }

/**
 * 시간 단위에 따른 From-To 범위 제한 확인
 * @param timeUnit - 시간 단위
 * @param timeRange - From~To 시간 범위
 */
// export function checkFromToBoundary(
//   timeUnit: TimeUnitKey,
//   { from, to }: TimeRangeInput,
// ): void {
//   if (timeUnit === 'PER_FIFTEEN' && dayjs(to).diff(dayjs(from), 'hour') > 6)
//     throw new BadRequestException(
//       '15분별 데이터는 최대 6시간까지만 조회가 가능합니다.',
//     );
//   else if (timeUnit === 'PER_HOUR' && dayjs(to).diff(dayjs(from), 'day') > 7)
//     throw new BadRequestException(
//       '시간별 데이터는 최대 7일까지만 조회가 가능합니다.',
//     );
//   else if (timeUnit === 'PER_DAY' && dayjs(to).diff(dayjs(from), 'month') > 3)
//     throw new BadRequestException(
//       '일별 데이터는 최대 3달까지만 조회가 가능합니다.',
//     );
//   else if (timeUnit === 'PER_MONTH' && dayjs(to).diff(dayjs(from), 'year') > 3)
//     throw new BadRequestException(
//       '월별 데이터는 최대 3년까지만 조회가 가능합니다.',
//     );
//   else if (timeUnit === 'PER_YEAR' && dayjs(to).diff(dayjs(from), 'year') > 6)
//     throw new BadRequestException(
//       '연별 데이터는 최대 6년까지만 조회가 가능합니다.',
//     );
// }

/**
 * Mongoose From~To Query 생성
 * @param timeRangeInput - From~To 파라미터
 * @returns DateTime Rnage Mongoose Condition
 */
// export function createFromToQuery(
//   timeUnit: TimeUnitKey,
//   { from, to }: TimeRangeInput,
// ): Condition<Date> {
//   if (from > to) throw new BadRequestException('to는 from 이전이어야 합니다.');
//   switch (timeUnit) {
//     case 'PER_FIFTEEN':
//       from = getRoundQuarter(from);
//       to = getRoundQuarter(to);
//       break;
//     case 'PER_DAY':
//       to = dayjs(to).endOf('day').toDate();
//       break;
//     case 'PER_MONTH':
//       to = dayjs(to).endOf('month').toDate();
//       break;
//     case 'PER_YEAR':
//       to = dayjs(to).endOf('year').toDate();
//       break;
//   }

//   if (!from) return { $lte: to };
//   if (!to) return { $gte: from };
//   return { $gte: from, $lte: to };
// }
