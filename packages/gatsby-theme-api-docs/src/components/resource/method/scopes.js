import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { designSystem } from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import Title from './title';

const Scope = styled.code`
  display: inline-block;
  color: ${designSystem.colors.light.textCode};
  white-space: nowrap;
`;

const Scopes = (props) => {
  return (
    <SpacingsStack scale="xs">
      <Title>OAuth 2.0 Scopes:</Title>

      <div>
        {props.scopes.map((scope, index) => (
          <Scope key={scope}>
            {scope}
            {index < props.scopes.length - 1 && ', '}
          </Scope>
        ))}
      </div>
    </SpacingsStack>
  );
};

Scopes.propTypes = {
  scopes: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default Scopes;
