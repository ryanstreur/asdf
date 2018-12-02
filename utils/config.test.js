const assert = require('assert');
const expect = require('chai').expect;
const replaceDefaultSettingsWithDefaults = require('./config').replaceEmptySettingsWithDefaults;

describe('config settings', () => {
  it('should replace empty keys in the default config with the user config', () => {
    const exampleUserConfig = {
      a: 'a',
      d: 'd'
    }

    const exampleDefaultConfig = {
      a: '1',
      b: '2',
      c: '3',
      d: '4'
    }

    const expectedConfigOut = {
      a: 'a',
      b: '2',
      c: '3',
      d: 'd'
    }

    const configOut = replaceDefaultSettingsWithDefaults(exampleUserConfig, exampleDefaultConfig);
    assert(configOut.a === expectedConfigOut.a);
  });

  it('should do this recursively for nested objects in config json', () => {
    const exampleUserConfig = {
      l: {
        filePath: 'test1'
      },
      a: 'b'
    };
    const exampleDefaultConfig = {
      l: {
        filePath: 'prod1',
        fmt: 'org'
      },
      a: '1'
    };
    const expectedConfigOut = {
      l: {
        filePath: 'test1',
        fmt: 'org'
      },
      a: 'b'
    };
    const configOut = replaceDefaultSettingsWithDefaults(exampleUserConfig, exampleDefaultConfig);
    expect(configOut).to.eql(expectedConfigOut);
  });
});