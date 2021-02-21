import '@testing-library/jest-dom';

const noop = () => null;
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
global.matchMedia = global.matchMedia || function matchMedia () {
  return {
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};

expect.extend({
  toBeAValidField(node) {
    const classes = node.getAttribute('class').split(' ');
    const isValid = classes.includes('is-valid');

    return {
      pass: isValid,
      message: () => 'Invalid field',
    };
  },
  toBeAnInvalidField(node) {
    const classes = node.getAttribute('class').split(' ');
    const isInvalid = classes.includes('is-invalid');

    return {
      pass: isInvalid,
      message: () => 'Not a invalid field',
    };
  },
  toBeAnUnvalidatedField(node) {
    const classes = node.getAttribute('class').split(' ');

    return {
      pass: !classes.includes('is-invalid') && !classes.includes('is-valid'),
      message: () => 'Not an unvalidated field',
    };
  },
});