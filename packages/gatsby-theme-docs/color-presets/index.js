/* eslint-disable global-require */

module.exports = {
  base: {
    key: 'base',
    relativePath: 'base',
    value: require('./base'),
  },
  merchantCenterDeveloperDocs: {
    key: 'merchantCenterDeveloperDocs',
    relativePath: 'merchant-center-developer-docs',
    value: require('./merchant-center-developer-docs'),
  },
  merchantCenterUserDocs: {
    key: 'merchantCenterUserDocs',
    relativePath: 'merchant-center-user-docs',
    value: require('./merchant-center-user-docs'),
  },
  platformDeveloperDocs: {
    key: 'platformDeveloperDocs',
    relativePath: 'platform-developer-docs',
    value: require('./platform-developer-docs'),
  },
};