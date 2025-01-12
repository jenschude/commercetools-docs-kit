/* eslint-disable import/prefer-default-export */
import { useStaticQuery, graphql } from 'gatsby';
import { generateTypeURN } from '../utils/ctp-urn';

const buildPageSlug = (page) => {
  const [pathWithoutExt] = page.parent.relativePath.split(page.parent.ext);
  return `/${pathWithoutExt}`;
};

const convertComponentInMdxToTypeLocations = (data) =>
  data.allComponentInMdx.nodes.reduce((typeLocations, node) => {
    const apiKeyAttribute = node.attributes.find(
      (att) => att.name === 'apiKey'
    );
    const typeAttribute = node.attributes.find((att) => att.name === 'type');

    const apiKey = apiKeyAttribute ? apiKeyAttribute.value : null;
    const name = typeAttribute ? typeAttribute.value : null;
    const slug = buildPageSlug(node.page);
    const urn = generateTypeURN({ apiKey, displayName: name });
    const urlAnchorTag = slug && urn ? `${slug}#${urn}` : '';

    return {
      ...typeLocations,
      [`${apiKey}__${name}`]: {
        apiKey,
        name,
        slug,
        urn,
        urlAnchorTag,
      },
    };
  }, {});

export const useTypeLocations = () => {
  const queryResult = useStaticQuery(
    graphql`
      {
        allComponentInMdx(filter: { component: { eq: "ApiType" } }) {
          nodes {
            attributes {
              name
              value
            }
            page: mdx {
              parent {
                id
                ... on File {
                  relativePath
                  ext
                }
              }
            }
          }
        }
      }
    `
  );

  return convertComponentInMdxToTypeLocations(queryResult);
};

export const locationForType = (apiKey, type, typeLocations) => {
  return typeLocations[`${apiKey}__${type}`];
};
