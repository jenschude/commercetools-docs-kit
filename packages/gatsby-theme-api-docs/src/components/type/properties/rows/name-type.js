import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Markdown } from '@commercetools-docs/ui-kit';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { BetaFlag } from '@commercetools-docs/gatsby-theme-docs';
import { typography } from '../../../../design-system';
import { useTypeLocations } from '../../../../hooks/use-type-locations';
import generateTypeToRender from '../../../../utils/generate-type-to-render';
import Required from '../../../required';

// inline-blocks inside a block are wrapped first before wrapping inline.
// this implements a wrapping behavior where property name and type are separated
// into lines before the name is wrapped in itself if it consists of multiple words.
const PropertyName = styled.div`
  white-space: nowrap;
`;
const PropertyType = styled.div``;
const BetaWrapper = styled.span`
  font-size: ${typography.fontSizes.body};
`;

const NameType = ({ apiKey, property }) => {
  const typeLocations = useTypeLocations();
  const typeToRender = generateTypeToRender({
    typeLocations,
    property,
    apiKey,
  });

  return (
    <SpacingsStack scale="xs">
      <PropertyName className="name-type">
        <Markdown.InlineCode>{property.name}</Markdown.InlineCode>
        {property.required && <Required />}
        {property.beta && (
          <BetaWrapper>
            <BetaFlag />
          </BetaWrapper>
        )}
      </PropertyName>
      <PropertyType className="name-type">
        {typeToRender.displayPrefix && (
          <span className="name">{typeToRender.displayPrefix}</span>
        )}

        {typeof typeToRender.type === 'string' ? (
          <span className="name">{typeToRender.type}</span>
        ) : (
          typeToRender.type
        )}
      </PropertyType>
    </SpacingsStack>
  );
};

NameType.propTypes = {
  apiKey: PropTypes.string.isRequired,
  property: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    items: PropTypes.shape({
      type: PropTypes.string.isRequired,
    }),
    required: PropTypes.bool.isRequired,
    beta: PropTypes.bool,
  }).isRequired,
};

export default NameType;
