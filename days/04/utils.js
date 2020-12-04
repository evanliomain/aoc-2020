const T = require('taninsam');

module.exports = {
  checkFieldsExistance,
  checkAll,
  convertType
};
function checkAll(passport) {
  if (!checkFieldsExistance(passport) || !checkFormats(passport)) {
    return false;
  }
  const typedPassport = convertType(passport);
  return (
    checkByr(typedPassport) &&
    checkIyr(typedPassport) &&
    checkEyr(typedPassport) &&
    checkHgt(typedPassport) &&
    checkEcl(typedPassport)
  );
}

function checkFieldsExistance(passport) {
  return [
    'byr', // (Birth Year)
    'iyr', // (Issue Year)
    'eyr', // (Expiration Year)
    'hgt', // (Height)
    'hcl', // (Hair Color)
    'ecl', // (Eye Color)
    'pid' // (Passport ID)
  ].every(field => !T.isNil(passport[field]));
}

function checkFormats(passport) {
  return [
    {
      field: 'byr',
      format: /^[0-9]{4}$/
    },
    {
      field: 'iyr',
      format: /^[0-9]{4}$/
    },
    {
      field: 'eyr',
      format: /^[0-9]{4}$/
    },
    {
      field: 'hgt',
      format: /^[0-9]*(cm|in)$/
    },
    {
      field: 'hcl',
      format: /^#[0-9a-f]{6}$/
    },
    {
      field: 'ecl',
      format: /^(amb|blu|brn|gry|grn|hzl|oth)$/
    },
    {
      field: 'pid',
      format: /^[0-9]{9}$/
    }
  ].every(({ field, format }) => format.test(passport[field]));
}

function convertType(password) {
  return {
    byr: parseInt(password.byr, 10), // (Birth Year)
    iyr: parseInt(password.iyr, 10), // (Issue Year)
    eyr: parseInt(password.eyr, 10), // (Expiration Year)
    hgt: {
      unit: password.hgt.substr(-2, 2),
      value: password.hgt.substr(0, password.hgt.length - 2)
    }, // (Height)
    hcl: password.hcl, // (Hair Color)
    ecl: password.ecl, // (Eye Color)
    pid: password.pid, // (Passport ID)
    cid: password.cid // (Country ID)
  };
}

function checkByr({ byr }) {
  return 1920 <= byr && byr <= 2002;
}

function checkIyr({ iyr }) {
  return 2010 <= iyr && iyr <= 2020;
}

function checkEyr({ eyr }) {
  return 2020 <= eyr && eyr <= 2030;
}

function checkHgt({ hgt }) {
  if ('cm' === hgt.unit) {
    return 150 <= hgt.value && hgt.value <= 193;
  }
  if ('in' === hgt.unit) {
    return 59 <= hgt.value && hgt.value <= 76;
  }
  return false;
}

function checkEcl({ ecl }) {
  return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl);
}
