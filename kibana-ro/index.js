'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (kibana) {
  const kbnBaseUrl = '/app/kibana';
  return new kibana.Plugin({
    id: 'kibana',
    config: function (Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
        defaultAppId: Joi.string().default('home'),
        index: Joi.string().default('.kibana')
      }).default();
    },

    uiExports: {
      hacks: ['plugins/kibana/dev_tools/hacks/hide_empty_tools'],
      fieldFormats: ['plugins/kibana/field_formats/register'],
      savedObjectTypes: ['plugins/kibana/visualize/saved_visualizations/saved_visualization_register', 'plugins/kibana/discover/saved_searches/saved_search_register', 'plugins/kibana/dashboard/saved_dashboard/saved_dashboard_register'],
      app: {
        id: 'kibana',
        title: 'Kibana',
        listed: false,
        description: 'the kibana you know and love',
        main: 'plugins/kibana/kibana',
        uses: ['home', 'visTypes', 'visResponseHandlers', 'visRequestHandlers', 'visEditorTypes', 'savedObjectTypes', 'spyModes', 'fieldFormats', 'fieldFormatEditors', 'navbarExtensions', 'managementSections', 'devTools', 'docViews', 'embeddableFactories']
      },

      links: [{
        id: 'kibana:discover',
        title: 'Discover',
        order: -1003,
        url: `${kbnBaseUrl}#/discover`,
        description: 'interactively explore your data',
        icon: 'plugins/kibana/assets/discover.svg'
      }, {
        id: 'kibana:dashboard',
        title: 'Dashboard',
        order: -1001,
        url: `${kbnBaseUrl}#/dashboards`,
        // The subUrlBase is the common substring of all urls for this app. If not given, it defaults to the url
        // above. This app has to use a different subUrlBase, in addition to the url above, because "#/dashboard"
        // routes to a page that creates a new dashboard. When we introduced a landing page, we needed to change
        // the url above in order to preserve the original url for BWC. The subUrlBase helps the Chrome api nav
        // to determine what url to use for the app link.
        subUrlBase: `${kbnBaseUrl}#/dashboard`,
        description: 'compose visualizations for much win',
        icon: 'plugins/kibana/assets/dashboard.svg'
      }],

      injectDefaultVars(server, options) {
        return {
          kbnIndex: options.index,
          kbnBaseUrl
        };
      },

      translations: [(0, _path.resolve)(__dirname, './translations/en.json')],

      mappings: _mappings2.default,
      uiSettingDefaults: (0, _ui_setting_defaults.getUiSettingDefaults)()
    },

    preInit: async function (server) {
      try {
        // Create the data directory (recursively, if the a parent dir doesn't exist).
        // If it already exists, does nothing.
        await mkdirp(server.config().get('path.data'));
      } catch (err) {
        server.log(['error', 'init'], err);
        // Stop the server startup with a fatal error
        throw err;
      }
    },

    init: function (server) {
      // uuid
      (0, _manage_uuid2.default)(server);
      // routes
      (0, _search.searchApi)(server);
      (0, _scripts.scriptsApi)(server);
      (0, _scroll_search.scrollSearchApi)(server);
      (0, _import.importApi)(server);
      (0, _export.exportApi)(server);
      (0, _home.homeApi)(server);
      (0, _suggestions.registerSuggestionsApi)(server);
      (0, _register.registerFieldFormats)(server);
      (0, _register2.registerTutorials)(server);
      server.expose('systemApi', systemApi);
      server.expose('handleEsError', _handle_es_error2.default);
      server.injectUiAppVars('kibana', () => (0, _inject_vars.injectVars)(server));
    }
  });
};

var _path = require('path');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mkdirp = require('mkdirp');

var _manage_uuid = require('./server/lib/manage_uuid');

var _manage_uuid2 = _interopRequireDefault(_manage_uuid);

var _search = require('./server/routes/api/search');

var _scroll_search = require('./server/routes/api/scroll_search');

var _import = require('./server/routes/api/import');

var _export = require('./server/routes/api/export');

var _home = require('./server/routes/api/home');

var _scripts = require('./server/routes/api/scripts');

var _suggestions = require('./server/routes/api/suggestions');

var _register = require('./server/field_formats/register');

var _register2 = require('./server/tutorials/register');

var _system_api = require('./server/lib/system_api');

var systemApi = _interopRequireWildcard(_system_api);

var _handle_es_error = require('./server/lib/handle_es_error');

var _handle_es_error2 = _interopRequireDefault(_handle_es_error);

var _mappings = require('./mappings.json');

var _mappings2 = _interopRequireDefault(_mappings);

var _ui_setting_defaults = require('./ui_setting_defaults');

var _inject_vars = require('./inject_vars');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mkdirp = _bluebird2.default.promisify(_mkdirp.mkdirp);

module.exports = exports['default'];

