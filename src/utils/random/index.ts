import * as dayjs from 'dayjs';
import { TimeUnitKey } from 'src/ems/shared/literals';
import { TimeRange, TimeStat, TimeUnitEnum } from 'src/types/graphql.schema';

// RANDOM VARIABLES
export const RAND_FLOORS = ['지하 1층', '1층', '2층', '3층', '4층', '5층'];
export const RAND_EQUIPMENT_GROUP = ['렉', '냉동', '항온항습기', 'FCU', 'AHU'];

/**
 * 지정된 시간 단위/범위에 따른 리턴할 무작위 도큐먼트 갯수 계산
 * @param timeUnit - 지정된 시간 단위
 * @param timeRange - 지정된 시간 범위
 * @returns - 리턴할 무작위 도큐먼트 갯수
 */
export function getDocumentCount(
  timeUnit: TimeUnitKey,
  timeRange: TimeRange,
): number {
  const from = dayjs(timeRange.from);
  const to = dayjs(timeRange.to);

  switch (timeUnit) {
    case 'PER_FIFTEEN':
      return Math.floor(to.diff(from, 'minutes') / 15);
    case 'PER_HOUR':
      return to.diff(from, 'hours');
    case 'PER_DAY':
      return to.diff(from, 'days');
    case 'PER_MONTH':
      return to.diff(from, 'months');
    case 'PER_YEAR':
      return to.diff(from, 'years');
  }
}

/**
 * 난수(정수) 생성
 * @param max - 최대값
 */
export function randomInt(max: number, min = 0): number {
  return Math.floor(Math.random() * max) + min;
}

/**
 * 난수 생성
 * @param max - 최대값
 */
export function randomFloat(max = 1, min = 0): number {
  return Math.random() * max + min;
}

/**
 * 난수 생성 (시간 단위에 따라 증가하는)
 * @param max - 최대값
 * @param min - 최소값
 * @param timeUnit - 시간 단위
 */
export function randomFloatMux(
  min = 0,
  max = 1,
  timeUnit: TimeUnitKey,
): number {
  let timeMux = 1;
  if (timeUnit === 'PER_HOUR') {
    timeMux = 4;
  } else if (timeUnit === 'PER_DAY') {
    timeMux = 96;
  } else if (timeUnit === 'PER_MONTH') {
    timeMux = 2880;
  } else if (timeUnit === 'PER_YEAR') {
    timeMux = 1051200;
  }

  return Math.random() * max + min * timeMux;
}

/**
 * 무작위 층 선택
 */
export function randomFloor(): string {
  return RAND_FLOORS[randomInt(RAND_FLOORS.length - 1)];
}

/**
 * N개의 무작위 층 선택
 * @param n - 층갯수
 */
export function randomNFloor(n: number): string[] {
  const shuffledFloor = RAND_FLOORS.sort(() => 0.5 - Math.random());
  return shuffledFloor.slice(0, n);
}

/**
 * 층 이름에 따른 랜덤 설비 이름 생성
 * @param floorName - 층 이름
 * @example "2층 항온항습기-5"
 */
export function randomEquipment(floorName: string): string {
  return `${floorName} ${
    RAND_EQUIPMENT_GROUP[randomInt(RAND_EQUIPMENT_GROUP.length - 1)]
  }-${randomInt(5) + 1}`;
}

/**
 *  N개의 무작위 설비 이름 생성
 * @param n - 설비 갯수
 * @param floorName - 층 이름
 */
export function randomNEquipment(n: number, floorName: string): string[] {
  const equipments = [];
  for (let i = 0; i < n; i++) {
    equipments.push(randomEquipment(floorName));
  }
  return equipments;
}

/**
 * 무작위 발전기 이름 생성
 * @param type - 발전기 종류
 */
export function randomGeneratorName(type: '태양광' | '연료전지') {
  return `${type}-#${randomInt(4)}`;
}

/**
 * 지정된 시간 단위/범위에 따라 증가하는 무작위 시간열 데이터 Array 생성
 * @param minVal - 15분 단위별 최솟값
 * @param maxVal - 15분 단위별 최댓값
 * @param timeUnit - 지정된 시간 단위
 * @param timeRange - 지정된 시간 범위
 */
export function randomTimeStatGenMux(
  minVal = 0,
  maxVal: number,
  timeUnit: TimeUnitKey,
  timeRange: TimeRange,
): TimeStat[] {
  const timeStats: TimeStat[] = [];

  // Setup for timeunits
  let manipulateType: dayjs.ManipulateType;
  let timeMux = 1;
  switch (timeUnit) {
    case 'PER_FIFTEEN':
      manipulateType = 'minute';
      timeMux = 15;
      break;
    case 'PER_HOUR':
      manipulateType = 'hour';
      maxVal *= 4;
      break;
    case 'PER_DAY':
      manipulateType = 'day';
      maxVal *= 96;
      break;
    case 'PER_MONTH':
      manipulateType = 'month';
      maxVal *= 96 * 30;
      break;
    case 'PER_YEAR':
      manipulateType = 'year';
      maxVal *= 96 * 365;
      break;
  }

  for (let i = 0; i <= getDocumentCount(timeUnit, timeRange); i++) {
    const timestamp = dayjs(timeRange.from)
      .add(timeMux * i, manipulateType)
      .toDate();
    timeStats.push({
      timestamp,
      value: randomFloat(maxVal, minVal),
    });
  }
  return timeStats;
}

/**
 * 지정된 시간 단위/범위에 따른 무작위 시간열 데이터 Array 생성
 * @param minVal - 각 시간 단위별 최솟값
 * @param maxVal - 각 시간 단위별 최댓값
 * @param timeUnit - 지정된 시간 단위
 * @param timeRange - 지정된 시간 범위
 */
export function randomTimeStatGen(
  minVal = 0,
  maxVal: number,
  timeUnit: TimeUnitKey,
  timeRange: TimeRange,
): TimeStat[] {
  const timeStats: TimeStat[] = [];

  // Setup for timeunits
  let manipulateType: dayjs.ManipulateType;
  let timeMux = 1;
  switch (timeUnit) {
    case 'PER_FIFTEEN':
      manipulateType = 'minute';
      timeMux = 15;
      break;
    case 'PER_HOUR':
      manipulateType = 'hour';
      break;
    case 'PER_DAY':
      manipulateType = 'day';
      break;
    case 'PER_MONTH':
      manipulateType = 'month';
      break;
    case 'PER_YEAR':
      manipulateType = 'year';
      break;
  }

  for (let i = 0; i <= getDocumentCount(timeUnit, timeRange); i++) {
    const timestamp = dayjs(timeRange.from)
      .add(timeMux * i, manipulateType)
      .toDate();
    timeStats.push({
      timestamp,
      value: randomFloat(maxVal, minVal),
    });
  }
  return timeStats;
}

/**
 * 시간열 데이터 보일러플레이팅을 위한
 * 지정된 시간 단위/범위에 timestamp array 생성
 * @param timeUnit - 지정된 시간 단위
 * @param timeRange - 지정된 시간 범위
 */
export function timestampGen(
  timeUnit: TimeUnitKey,
  timeRange: TimeRange,
): TimeStat[] {
  const timeStats: TimeStat[] = [];

  // Setup for timeunits
  let manipulateType: dayjs.ManipulateType;
  let timeMux = 1;
  switch (timeUnit) {
    case 'PER_FIFTEEN':
      manipulateType = 'minute';
      timeMux = 15;
      break;
    case 'PER_HOUR':
      manipulateType = 'hour';
      break;
    case 'PER_DAY':
      manipulateType = 'day';
      break;
    case 'PER_MONTH':
      manipulateType = 'month';
      break;
    case 'PER_YEAR':
      manipulateType = 'year';
      break;
  }

  for (let i = 0; i <= getDocumentCount(timeUnit, timeRange); i++) {
    const timestamp = dayjs(timeRange.from)
      .add(timeMux * i, manipulateType)
      .toDate();
    timeStats.push({
      timestamp,
    });
  }
  return timeStats;
}
