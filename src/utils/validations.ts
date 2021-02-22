export function isCellphoneValid(phoneNumber: string): boolean {
  return phoneNumber.length === 10;
}

export function isZipCodeValid(zipCode: string): boolean {
  return zipCode.length === 5;
}

export function isLeaderElectorKeyValid(electorKey: string): boolean {
  if (electorKey === 'PENDIENTE') {
    return true;
  }

  return electorKey.length === 18;
}

export function isHabitantElectorKeyValid(electorKey: string): boolean {
  if (electorKey === 'PENDIENTE') {
    return true;
  }

  return electorKey.length === 18;
}

export function isNotNull(data: string): boolean {
  return data.trim().length > 0;
}

export function isNumberNotNull(num: string): boolean {
  return !isNaN(Number(num));
}

export function isCurpValid(curp: string): boolean {
  if (curp === 'PENDIENTE') {
    return true;
  }

  return curp.length === 18;
}

export function isDayValid(day: string): boolean {
  if (day === '00') {
    return false;
  }

  return day.length === 2 && ( Number(day) > 0 && Number(day) < 31);
}
