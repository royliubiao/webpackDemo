'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaSimpleRouter = require('koa-simple-router');

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _koaSwig = require('koa-swig');

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _initController = require('./controllers/initController');

var _initController2 = _interopRequireDefault(_initController);

var _register = require('babel-core/register');

var _register2 = _interopRequireDefault(_register);

var _babelPolyfill = require('babel-polyfill');

var _babelPolyfill2 = _interopRequireDefault(_babelPolyfill);

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//引用babel-polyfill

//引用路由

//引用co

//路由
var app = new _koa2.default();
//执行路由

//引用config

//引用babel-register

//引用静态资源

//引用html模板
_initController2.default.init(app, _koaSimpleRouter2.default);
//koa-swig模板配置
app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
    root: _config2.default.get('viewDir'),
    autoescape: true,
    cache: 'memory', // disable, set to false 
    ext: 'html',
    writeBody: false
}));
// 静态资源引用路径
app.use((0, _koaStatic2.default)(_config2.default.get('staticDir')));

app.listen(_config2.default.get('port'), function () {
    console.log('server started');
});
exports.default = app;
