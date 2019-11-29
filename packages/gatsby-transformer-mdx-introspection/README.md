# gatsby-transformer-mdx-introspection

This plugin statically analyzes the nodes generated by `gatsby-plugin-mdx`
and generates GraphQL Nodes that allow to find out what MDX-sourced pages
contain which manually placed React components.

It serves use cases that need the full "database" of "what component was placed where"
for example to generate links to these places need this plugin.

It only supports JSX that is a DOM subset, eg. `<MyComponent prop1="value" attribute2="anotherValue" />`
which turned out to be sufficient for the typical use case.

## Issues

It has to parse the MDX separately (and therefore twice in the site build) because `gatsby-plugin-mdx` does
lazyly evaluate the AST property on the Mdx GraphQL provided, which means it's available to components using GraphQL
but not to other plugins that read from the GatsbyJS Node Objects in earlier build phases.

## Example GraphQL query

To collect all locations of manually placed `<ApiType .../>` components:

```graphql
query MyQuery {
  allComponentInMdx(filter: { component: { eq: "apitype" } }) {
    nodes {
      attributes {
        name
        value
      }
      page: parent {
        ... on Mdx {
          fields {
            slug
          }
        }
      }
    }
  }
}
```

Please not the lowercase `apitype` in the query - the names are normalized to lowercase by the DOM parser used.

Example response:

```json
{
  "data": {
    "allComponentInMdx": {
      "nodes": [
        {
          "attributes": [
            {
              "name": "apikey",
              "value": "test"
            },
            {
              "name": "type",
              "value": "OutOfOrderPropertiesTestType"
            }
          ],
          "page": {
            "fields": {
              "slug": "/api/types/"
            }
          }
        },
...
```