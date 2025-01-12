import React from 'react';
import PropTypes from 'prop-types';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { FullWidthContainer } from '@commercetools-docs/gatsby-theme-docs';
import useReadResourceByResourcePath from '../../hooks/use-read-resource-by-resource-path';
import reportError from '../../utils/report-error';
import Method from './method';

const Resource = ({ apiKey, resource }) => {
  const resourceObj = useReadResourceByResourcePath(apiKey, resource);

  if (!resourceObj) {
    return reportError(`Resource '${resource}' not found in '${apiKey}' API`);
  }

  const methods = ['post', 'put', 'get', 'delete'];

  return (
    <FullWidthContainer>
      <SpacingsStack scale="xl">
        {methods.map((method) => {
          return resourceObj[method] ? (
            <Method
              key={method}
              apiKey={resourceObj.apiKey}
              uris={resourceObj.uris}
              resourceUriParameters={resourceObj.allUriParameters}
              method={resourceObj[method]}
              methodType={method}
            />
          ) : null;
        })}
      </SpacingsStack>
    </FullWidthContainer>
  );
};

Resource.propTypes = {
  apiKey: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired,
};

export default Resource;
