/*
https://github.com/Urigo/graphql-scalars

The MIT License (MIT)

Copyright (c) 2020 The Guild

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. 
*/


const { GraphQLScalarType, Kind } = require("graphql");

// import { validateJSDate, validateDateTime } from './validator';
// import { parseDateTime } from './formatter';

const validateJSDate = (date) => {
  const time = date.getTime();
  return time === time;
};

const validateDateTime = (dateTimeString) => {
  dateTimeString = dateTimeString.toUpperCase();
  const RFC_3339_REGEX = /^(\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60))(\.\d{1,})?(([Z])|([+|-]([01][0-9]|2[0-3]):[0-5][0-9]))$/;

  // Validate the structure of the date-string
  if (!RFC_3339_REGEX.test(dateTimeString)) {
    return false;
  }
  // Check if it is a correct date using the javascript Date parse() method.
  const time = Date.parse(dateTimeString);
  if (time !== time) {
    // eslint-disable-line
    return false;
  }
  // Split the date-time-string up into the string-date and time-string part.
  // and check whether these parts are RFC 3339 compliant.
  const index = dateTimeString.indexOf('T');
  const dateString = dateTimeString.substr(0, index);
  const timeString = dateTimeString.substr(index + 1);
  return validateDate(dateString) && validateTime(timeString);
};


const parseTime = (time) => {
  const currentDateString = new Date().toISOString();
  return new Date(
    currentDateString.substr(0, currentDateString.indexOf('T') + 1) + time,
  );
};

const GraphQLDateTime = {
  name: 'DateTime',
  description:
    'A date-time string at UTC, such as 2007-12-03T10:15:30Z, ' +
    'compliant with the `date-time` format outlined in section 5.6 of ' +
    'the RFC 3339 profile of the ISO 8601 standard for representation ' +
    'of dates and times using the Gregorian calendar.',
  serialize(value) {
    if (value instanceof Date) {
      if (validateJSDate(value)) {
        return value;
      }
      throw new TypeError('DateTime cannot represent an invalid Date instance');
    } else if (typeof value === 'string') {
      if (validateDateTime(value)) {
        return parseDateTime(value);
      }
      throw new TypeError(
        `DateTime cannot represent an invalid date-time-string ${value}.`,
      );
    } else if (typeof value === 'number') {
      try {
        return new Date(value);
      } catch (e) {
        throw new TypeError(
          'DateTime cannot represent an invalid Unix timestamp ' + value,
        );
      }
    } else {
      throw new TypeError(
        'DateTime cannot be serialized from a non string, ' +
          'non numeric or non Date type ' +
          JSON.stringify(value),
      );
    }
  },
  parseValue(value) {
    if (value instanceof Date) {
      if (validateJSDate(value)) {
        return value;
      }
      throw new TypeError('DateTime cannot represent an invalid Date instance');
    }
    if (typeof value === 'string') {
      if (validateDateTime(value)) {
        return parseDateTime(value);
      }
      throw new TypeError(
        `DateTime cannot represent an invalid date-time-string ${value}.`,
      );
    }
    throw new TypeError(
      `DateTime cannot represent non string or Date type ${JSON.stringify(
        value,
      )}`,
    );
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new TypeError(
        `DateTime cannot represent non string or Date type ${
          'value' in ast && ast.value
        }`,
      );
    }
    const { value } = ast;
    if (validateDateTime(value)) {
      return parseDateTime(value);
    }
    throw new TypeError(
      `DateTime cannot represent an invalid date-time-string ${String(value)}.`,
    );
  },
};

/**
 * An RFC 3339 compliant date-time scalar.
 *
 * Input:
 *    This scalar takes an RFC 3339 date-time string as input and
 *    parses it to a javascript Date.
 *
 * Output:
 *    This scalar serializes javascript Dates,
 *    RFC 3339 date-time strings and unix timestamps
 *    to RFC 3339 UTC date-time strings.
 */


exports.GraphQLDateTime = GraphQLDateTime;