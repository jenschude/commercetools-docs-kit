import { designSystem } from '@commercetools-docs/ui-kit';

export const tokens = {
  borderRadius1: designSystem.pxToRem(`1px`),
  borderRadius16: designSystem.pxToRem(`16px`),
  shadow1: `0 ${designSystem.pxToRem(`1px`)} ${designSystem.pxToRem(
    `1px`
  )} 0 rgba(0, 0, 0, 0.25)`,
  shadow2: `0 ${designSystem.pxToRem(`1px`)} ${designSystem.pxToRem(
    `2px`
  )} 0 rgba(0, 0, 0, 0.25)`,
};

export const dimensions = {
  widths: {
    tableColumn: designSystem.pxToRem('200px'),
    methodBorderLeft: designSystem.pxToRem('8px'),
  },
};

export const colors = {
  light: {
    surfaceTableHead: '#f2f2f2',
    border: '#e6e6e6',
    methods: {
      get: '#078cdf',
      post: '#00ccb4',
      delete: '#e60050',
    },
  },
};

export const typography = {
  lineHeights: {
    th: designSystem.pxToRem('21px'),
    methodType: designSystem.pxToRem('26px'),
    methodTitle: designSystem.pxToRem('32px'),
  },
};