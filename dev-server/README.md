To start the server:
windows
set BABEL_ENV=development && set NODE_ENV=development && node dev-server/dev-server.js --host="http://ca.cm.qa.preview.vca.webstagesite.com" --url="/find-a-hospital" --provider="providers/fah/provider.js" --webpackConfig="config/webpack.config.dev.js" --port=3000

linux
export BABEL_ENV=development && export NODE_ENV=development && node dev-server/dev-server.js --host="http://ca.cm.qa.preview.vca.webstagesite.com" --url="/find-a-hospital" --provider="providers/fah/provider.js" --webpackConfig="config/webpack.config.dev.js" --port=3000
