process.env.NODE_ENV = 'development';

const fs = require('fs-extra');
const webpack = require('webpack');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const config = require('../config/webpack.config.js');
const path = require('path');

const conf = config('development');

for (const rule of conf.module.rules) {
  if (!rule.oneOf) continue

  for (const one of rule.oneOf) {
    if (
      one.loader &&
      one.loader.includes('babel-loader') &&
      one.options &&
      one.options.plugins
    ) {
      one.options.plugins = one
        .options
        .plugins
        .filter(plugin =>
          typeof plugin !== 'string' ||
          !plugin.includes('react-refresh')
        )
    }
  }
}

conf.plugins = conf
  .plugins
  .filter(plugin =>
    !(plugin instanceof webpack.HotModuleReplacementPlugin) &&
    !(plugin instanceof ReactRefreshPlugin)
  )

// We needed to output to a specific folder for cross-framework interop.
// Make sure to change the output path or to remove this line if the behavior
// of the original gist is sufficient for your needs!
const distFolder = path.resolve(process.env.BUILD_PATH);
conf.output.path = distFolder;

webpack(conf).watch({}, (err, stats) => {
  if (err) {
    console.error(err);
  } else {
    copyPublicFolder();
  }
  console.error(stats.toString({
    chunks: false,
    colors: true
  }));
});

function copyPublicFolder() {
  fs.copySync(path.resolve(process.cwd(), 'public'), path.resolve(process.env.BUILD_PATH), {
    dereference: true,
    filter: file => file !== path.resolve(process.cwd(), 'public', 'index.html')
  });
}
