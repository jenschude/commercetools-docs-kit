# Gatsby Theme Add-On for API docs

This theme provides components in MDX to render API info from RAML spec files.

It is a feature add-on to `@commercetools-docs/gatsby-theme-docs` and is not usable standalone.

## Installation

```
npx install-peerdeps --dev @commercetools-docs/gatsby-theme-api-docs
```

## Usage

In your `gatsby-config.js`:

```js
const {
  configureThemeWithAddOns,
} = require('@commercetools-docs/gatsby-theme-docs/configure-theme');

module.exports = {
  // ... other site config
  plugins: [
    ...configureThemeWithAddOns({
      // ... other theme config
      addOns: [
        {
          resolve: '@commercetools-docs/gatsby-theme-api-docs',
          options: {
            transformerRaml: {
              includeApis: ['example'],
              movePropertiesToTop: ['id'],
              movePropertiesToBottom: ['custom'],
            },
          },
        },
      ],
    }),
  ],
};
```

### Plugin Options

- `transformerRaml`: See [gatsby-transformer-raml Plugin Options](../gatsby-transformer-raml#available-plugin-options)

### Generating the required canonical RAML form

Use the [**@commercetools-docs/rmf-codegen**](../rmf-codegen) `RAML_DOC` target output to generate RAML API specifications in the canonical file layout required by this plugin. It does an (any valid) RAML to (canonical flattened) RAML conversion allowing the gatsbyJS plugin to handle the RAML literally without parsing or resolving.

Example call:

```shell
npx rmf-codegen generate ./websites/api-docs-smoke-test/source-raml/test/api.raml --output-folder ./websites/api-docs-smoke-test/src/api-specs/test --target RAML_DOC
```

In gatsby develop mode, add the `--watch` option to the rmf-codegen command to continuously regenerate the canonical output while editing the original RAML.

### Path Convention `./src/api-specs/`

RAML spec files have to be added in the `./src/api-specs/` folder of the website. This directory is required and is automatically generated when the plugin runs.

The file location determines the `apiKey` through which it can be addressed:

- `src/api-specs/foo.raml` -> apiKey `foo`
- `src/api-specs/bar/api.raml` -> apiKey `bar`
- `src/api-specs/baz/baz.raml` -> apiKey `baz`

## Using UI components in MDX

The package exposes the following components in the MDX context:

- `<ApiType>`: Renders an API type.

```jsx
{
  /*
  apiKey - name of the specs directory
  type - name of the api type
  hideInheritedProperties - optional prop that hides properties inherited from parent type except discriminator
*/
}
<ApiType apiKey="test" type="ExamplesTestType" hideInheritedProperties />;
```

- `<ApiEndpoint>`: Renders an API endpoint.

```jsx
{
  /*
  apiKey - name of the specs directory
  resource - path of the endpoint
  method - endpoint method e.g. get, post, delete.
  title - optional title to render
*/
}
<ApiEndpoint
  apiKey="test"
  resource="/{projectKey}/resource/artificially-complex/path/uri-parameter-one={uriParameterOne}/{uriParameterTwo}"
  method="POST"
  title="<optional>"
/>;
```

- `<ApiEndpointsForResource>`: Renders all endpoints of an API resource.

```jsx
{
  /*
  apiKey - name of the specs directory
  resource - path of the resource
*/
}
<ApiEndpointsForResource apiKey="test" resource="/{projectKey}/resource" />;
```
