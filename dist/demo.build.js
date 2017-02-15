/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("var PopoverConfirm = __webpack_require__( 1 );\n\nvar vm = null, \n    URL = null,\n    main = null,\n    Status = null;\n\n// ajax 地址\nURL = {\n    changeStatus: '/api/subActivity/changeSubActivityStatus' // 更改启用、禁用状态 POST\n};\n\n// avalon vm\nvm = avalon.define({\n    $id: 'main',\n    data: [\n        {\n            Kind: '抽奖活动',\n            Name: '捕鱼达人单次抽奖',\n            Id: 1,\n            Status: true\n        }, {\n            Kind: '每日签到',\n            Name: '欢乐斗地主',\n            Id: 2,\n            Status: false\n        }\n    ],\n    showUpdateStatusConfirm: function( e, index, data ) {\n        Status.show( e, index, data );\n    }\n});\n\n// 状态\nStatus = {\n    show: function( e, index, data ) {\n        var _this = this;\n        \n        PopoverConfirm.init({\n            e: e,\n            UID: data.id + 'status', // 数据中唯一标识符，比如 ID，UserID 等，以确保重复点击显示、隐藏不会闪烁\n            title: '确定'+ (data.status ? '启用' : '禁用') +'？',\n            loadingContent: (data.status ? '启用生效' : '禁用生效') + '中.........', // Popover 加载中提示文字\n            ajax: {\n                config: {\n                    type: 'post',\n                    url: URL.changeStatus,\n                    data: data,\n                },\n                callback: function( res ) {\n                    if ( res.Status ) {\n                        avalon.vmodels.main.data[ index ].Status = data.status; // 更改数据状态\n                        PopoverConfirm.destroy(); // 销毁\n                    } else {\n                        // 错误信息提示\n                        PopoverConfirm.setContent({\n                            title: '<span class=\"text-danger\">操作失败</span>',\n                            content: '<span class=\"text-danger\">'+ res.Message +'</span>'\n                        });\n                    }\n                }\n            }\n        });\n    }\n};\n\n// 主函数\nmain = {\n    init: function() {\n        avalon.scan();\n    }\n};\n\nmain.init();\n\n//////////////////\n// WEBPACK FOOTER\n// ./demo.js\n// module id = 0\n// module chunks = 0\n//# sourceURL=webpack:///./demo.js?");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("var __WEBPACK_AMD_DEFINE_RESULT__;/**\n * @Author:\t  Live\n * @Email:       ivill@live.com\n * @DateTime:\t2016-11-03 13:59:03\n * @Description: popover 二次确认框\n * @Require: [JQuery, Bootstrap]\n */\n\n!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {\n\t'use strict';\n\n\tvar _options = {\n\t\t\te: null,\n\t\t\tUID: '', // 唯一识别符，比如 ID，UserID 等，以确保重复点击显示、隐藏不会闪烁\n\t\t\ttitle: '提示', // 标题\n\t\t\tloadingContent: '努力加载中...', // ajax 加载中提示语\n\t\t\tajax: { // ajax 配置项\n\t\t\t\tconfig: {\n\t\t            type: 'GET', // ajax 请求类型\n\t\t            url: '', // ajax 请求地址\n\t\t            data: {} // ajax 参数\n\t\t            // ... other\n\t\t        },\n\t\t        callback: function( res ) {} // ajax success 回调函数\n\t\t\t},\n\t\t\t$trigger: null // popover 触发者\n\t\t},\n\t\t_popoverSelector = '', // 当前弹出的 popover 的选择器\n\t\t_timestamp = (new Date()).getTime(); // 使用时间戳作为 确定、取消按钮 的 id 名称后缀\n\t\t\n\tvar CONFIRM_TPL = '<div class=\"btn-group\">' +\n\t\t\t\t '<button type=\"button\" id=\"' + _getIDName( 'J_Confirm' ) + '\" class=\"btn btn-xs btn-primary\"><i class=\"glyphicon glyphicon-ok-sign\">&ensp;</i>确定</button>' +\n\t\t\t\t '<button type=\"button\" id=\"' + _getIDName( 'J_Cancel' ) + '\" class=\"btn btn-xs btn-default\"><i class=\"glyphicon glyphicon-remove-sign\">&ensp;</i>取消</button>' +\n\t\t\t  '</div>';\n\n\n\t/**\n     * 切换按钮的禁用属性\n     */\n    function _toggleBtnDisableAttr( $btn ) {\n\t\t$btn.prop('disabled', function (_, val) { return ! val; });\n    }\n\n    /**\n     * 生成页面唯一的 id\n     * @param  {String} idName\n     * @return {String}        idName + postfix\n     */\n\tfunction _getIDName( idName ) {\n\t\treturn idName + _timestamp;\n\t}\n\n\t// 需要在模块引用的时候会自动执行（保证执行一次）\n\tfunction _bind() {\n\t\t// 点击 popover 以外的区域，隐藏 popover\n\t\t$( document ).on('click', function() {\n\t\t\tdestroy();\n\t\t});\n\n\t\t// 启用、禁用 Popover 取消、确定点击绑定\n\t\t$( document ).on('click', '#' + _getIDName( 'J_Confirm' ), function() {\n\t\t\t_confirm( $(this) );\n\t\t});\n\t\t$( document ).on('click', '#' + _getIDName( 'J_Cancel' ), function() {\n\t\t\tdestroy();\n\t\t});\n\t}\n\t\n\t/**\n\t * 确认操作\n\t */\n\tfunction _confirm() {\n\t\tvar ajaxConfig = { // ajax 配置项\n\t\t\t\ttype: _options.ajax.type,\n\t\t\t\turl: _options.ajax.url,\n\t\t\t\tdata: _options.ajax.data,\n\t\t\t\tcache: false,\n\t\t\t\tcomplete: function() {\n\t\t\t\t\t_toggleBtnDisableAttr( _options.$trigger );\n\t\t\t\t},\n\t\t\t\tsuccess: function( res ) {\n\t\t\t\t\t_options.ajax.callback( res );\n\t\t\t\t},\n\t\t\t\terror: function( error ) {\n\t\t\t\t\tsetContent({\n\t\t\t\t\t\ttitle: '<span class=\"text-danger\">操作失败</span>',\n\t\t\t\t\t\tcontent: '<span class=\"text-danger\">网络错误，请刷新后重试！</span>'\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t};\n\n\t\t$.extend( ajaxConfig, _options.ajax.config );\n\n\t\t_toggleBtnDisableAttr( _options.$trigger );\n\n\t\tsetContent({\n\t\t\tcontent: _options.loadingContent\n\t\t});\n\n\t\t$.ajax( ajaxConfig );\n\t}\n\n\t/**\n\t * 获取 popover 的 selector\n\t * @return { Selector }\n\t */\n\tfunction _getSelector() {\n\t\treturn '#' + _options.$trigger.attr( 'aria-describedby' );\n\t}\n\n\n\t/**\n\t * 阻止点击 popover 冒泡事件\n\t */\n\tfunction _stopPropagation( selector ) {\n\t\t$( document ).on('click', selector, function( e ) {\n\t\t\te.stopPropagation();\n\t\t});\n\t}\n\n\t/**\n\t * 初始化\n\t * @param  {Object} options 配置项，详见开头 _options 的说明\n\t */\n\tfunction init( options ) {\n\t\tvar isNewUID = (_options.UID !== options.UID);\n\n\t\toptions.e.stopPropagation();\n\t\toptions.$trigger = $(options.e.currentTarget);\n\n\t\tdestroy();\n\n\t\tif ( isNewUID ) { // 点击的如果不是同一个按钮，则切换显示、隐藏\n\t\t\t$.extend( _options, options );\n\n\t\t\t_options.$trigger.popover({\n\t\t\t\thtml: true,\n\t\t\t\tplacement: 'left',\n\t\t\t\ttrigger: 'manual',\n\t\t\t\ttitle: _options.title,\n\t\t\t\tcontent: CONFIRM_TPL\n\t\t\t});\n\n\t\t\tshow();\n\t\t\t_popoverSelector = _getSelector();\n\t\t\t_stopPropagation( _popoverSelector ); // 必须先 show popover 才能获取到 selector\n\t\t}\n\t}\n\n\t/**\n\t * 显示\n\t */\n\tfunction show() {\n\t\tif ( _options.$trigger !== null ) {\n\t\t\t_options.$trigger.popover( 'show' );\n\t\t}\n\t}\n\n\t/**\n\t * 隐藏\n\t */\n\tfunction hide() {\n\t\tif ( _options.$trigger !== null ) {\n\t\t\t_options.$trigger.popover( 'hide' );\n\t\t}\n\t}\n\n\t/**\n\t * 销毁\n\t */\n\tfunction destroy() {\n\t\tif ( _options.$trigger !== null ) {\n\t\t\t_options.UID = ''; // 清空 uid\n\t\t\t_options.$trigger.popover( 'destroy' ); // 销毁 popover\n\t\t\t_options.$trigger.attr( \"data-content\", '' ); // 清空 content，防止影响后面配置 content\n\t\t\t_options.$trigger.attr( \"data-original-title\", '' ); // 清空 title，防止影响后面配置 title\n\t\t}\n\t}\n\n\t/**\n\t * 设置 popover 的内容\n\t * @param {Object} options 设置的内容对象\n\t * {\n\t *     title: '这是标题',\n\t *     content: '这是内容'\n\t * }\n\t */\n\tfunction setContent( options ) {\n\t\tvar title = options.title,\n\t\t\tcontent = options.content;\n\n\t\tif ( typeof title !== 'undefined' ) {\n\t\t\t_options.$trigger.attr( \"data-original-title\", title );\n\t\t}\n\n\t\tif ( typeof content !== 'undefined' ) {\n\t\t\t_options.$trigger.attr( \"data-content\", content );\n\t\t}\n\n\t\t_options.$trigger.popover( 'show' );\n\t}\n\n\t_bind();\n\treturn {\n\t\tinit: init,\n\t\tshow: show,\n\t\thide: hide,\n\t\tdestroy: destroy,\n\t\tsetContent: setContent\n\t};\n}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\n//////////////////\n// WEBPACK FOOTER\n// ./bs-popover-confirm.js\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///./bs-popover-confirm.js?");

/***/ }
/******/ ]);