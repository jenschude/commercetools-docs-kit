# commercetools Writing Style Linter

This package provides

- commercetools specific writing style and terminology rules for the configurable [vale](https://errata-ai.github.io/vale/) prose linter.
- the `commercetools-vale` command-line tool which wraps the vale binary and calls it using the included writing style and configuration
- the `commercetools-vale-bin` command is directly calling the vale binary without passing the commercetools configuration. The `.vale.ini` configuration location has to be passed separately via vale's `--config` flag.

The base style is the [Google Developer Documentation Style Guide](https://github.com/errata-ai/Google), which is included as a copy (MIT licensed, too) and modified and partially overridden with commercetools specific rules.

The configuration defaults to checking `.md`, `.mdx`, `.txt`, and `.html` files, which can be overridden by calling it with a command-line parameter `commercetools-vale --glob='*.{js,md}' ./path/to/content` passing a list of [supported file format extensions](https://errata-ai.github.io/vale/formats/#formats).

## Automatic vale binary download for the current platform

This packages `postinstall` script automatically downloads the appropriate `vale` binary upon installation. This ensures a small package size and no unnecessary binary files in it. Supported platforms are Mac OS (`darwin`), Linux (`linux`), and Windows (`windows`).

## Standalone command-line usage

1.  Install the command globally via `yarn global add @commercetools-docs/writing-style` or `npm install -g @commercetools-docs/writing-style`
1.  Use it by calling `commercetools-vale ./path/to/your/content`

Please don't forget to frequently update the package to get the latest styles.

## Usage in the VSCode vale plugin

The [vscode-vale plugin](https://marketplace.visualstudio.com/items?itemName=testthedocs.vale) is always passing a `--config` parameter even if none is configured, so you have to separately configure the binary and the config location as follows, for example in a workspace configuration file:

```json
{
  "settings": {
    "vscode-vale.path": "${workspaceFolder}/node_modules/.bin/commercetools-vale-bin",
    "vscode-vale.configPath": "${workspaceFolder}/node_modules/@commercetools-docs/writing-style/.vale.ini"
  }
}
```

## Usage as a `package.json` dependency

1. Add the writing-style package as a development dependency: `yarn add --dev @commercetools-docs/writing-style`
1. In your project's folder, call it from the command
   line via `npx commercetools-vale ./your/path/to/content` and optionally add vale command-line parameters as needed (for example `--no-wrap` on command-line jobs).
   - _Tip_: Running it over your complete repository is not a good idea since it checks the complete node_modules folder which takes a long time and is not your content, so make sure to pass a relevant file selection

## Updating the Google styles

The [Google styles for vale](https://github.com/errata-ai/Google) should not be changed in this repository as they are maintained by the Errata-AI team and pulled directly from their repository. To get the latest changes, run the `yarn download:google` command.

## Updating the vale version

Update the custom `valeVersion` property in `package.json` and confirm that the artifact naming convention on vale's [GitHub releases page](https://github.com/errata-ai/vale/releases) has not changed.

## Contributing

All [contributions](../../CONTRIBUTING.md), especially to enrich and complete the commercetools specific terminology and branding are welcome.

Please always provide content examples in the pull request to explain the rationale and typical use cases.
