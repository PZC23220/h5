;(function(){
	Date.prototype.Format = function (fmt) { //author: meizz 
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "h+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	}

	 window.setupWebViewJavascriptBridge = function(callback) {
		if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
		if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
		window.WVJBCallbacks = [callback];
		var WVJBIframe = document.createElement('iframe');
		WVJBIframe.style.display = 'none';
		WVJBIframe.src = 'https://__bridge_loaded__';
		document.documentElement.appendChild(WVJBIframe);
		setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
	}

	// var bridge = window.bridge || (window.bridge = {});
	// bridge.registerHandler
	// bridge.getToken = function(targetType,targetId,token) {
	// 	switch(targetType) {
	// 		case 1:
	// 			let _href =  _host + 'idol/video?targetid=' + targetId + '&token=' + token;
	// 			alert(_href);
	// 			window.location.href = _href;
	// 			break;
	// 	}
	// }
})();

// ;(function() {
// 	if (window.WebViewJavascriptBridge) {
// 		return;
// 	}

// 	if (!window.onerror) {
// 		window.onerror = function(msg, url, line) {
// 			console.log("WebViewJavascriptBridge: ERROR:" + msg + "@" + url + ":" + line);
// 		}
// 	}
// 	window.WebViewJavascriptBridge = {
// 		registerHandler: registerHandler,
// 		callHandler: callHandler,
// 		disableJavscriptAlertBoxSafetyTimeout: disableJavscriptAlertBoxSafetyTimeout,
// 		_fetchQueue: _fetchQueue,
// 		_handleMessageFromObjC: _handleMessageFromObjC,
// 		setupWebViewJavascriptBridge: setupWebViewJavascriptBridge

// 	};

// 	var messagingIframe;
// 	var sendMessageQueue = [];
// 	var messageHandlers = {};

// 	messagingIframe = document.createElement('iframe');
// 	messagingIframe.style.display = 'none';
// 	messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE;
// 	document.documentElement.appendChild(messagingIframe);
	
// 	var CUSTOM_PROTOCOL_SCHEME = 'https';
// 	var QUEUE_HAS_MESSAGE = '__wvjb_queue_message__';
	
// 	var responseCallbacks = {};
// 	var uniqueId = 1;
// 	var dispatchMessagesWithTimeoutSafety = true;

// 	function registerHandler(handlerName, handler) {
// 		messageHandlers[handlerName] = handler;
// 	}
	
// 	function callHandler(handlerName, data, responseCallback) {
// 		if (arguments.length == 2 && typeof data == 'function') {
// 			responseCallback = data;
// 			data = null;
// 		}
// 		_doSend({ handlerName:handlerName, data:data }, responseCallback);
// 	}
// 	function disableJavscriptAlertBoxSafetyTimeout() {
// 		dispatchMessagesWithTimeoutSafety = false;
// 	}
	
// 	function _doSend(message, responseCallback) {
// 		if (responseCallback) {
// 			var callbackId = 'cb_'+(uniqueId++)+'_'+new Date().getTime();
// 			responseCallbacks[callbackId] = responseCallback;
// 			message['callbackId'] = callbackId;
// 		}
// 		sendMessageQueue.push(message);
// 		messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE;
// 	}

// 	function _fetchQueue() {
// 		var messageQueueString = JSON.stringify(sendMessageQueue);
// 		sendMessageQueue = [];
// 		return messageQueueString;
// 	}

// 	function _dispatchMessageFromObjC(messageJSON) {
// 		if (dispatchMessagesWithTimeoutSafety) {
// 			setTimeout(_doDispatchMessageFromObjC);
// 		} else {
// 			 _doDispatchMessageFromObjC();
// 		}
		
// 		function _doDispatchMessageFromObjC() {
// 			var message = JSON.parse(messageJSON);
// 			var messageHandler;
// 			var responseCallback;

// 			if (message.responseId) {
// 				responseCallback = responseCallbacks[message.responseId];
// 				if (!responseCallback) {
// 					return;
// 				}
// 				responseCallback(message.responseData);
// 				delete responseCallbacks[message.responseId];
// 			} else {
// 				if (message.callbackId) {
// 					var callbackResponseId = message.callbackId;
// 					responseCallback = function(responseData) {
// 						_doSend({ handlerName:message.handlerName, responseId:callbackResponseId, responseData:responseData });
// 					};
// 				}
				
// 				var handler = messageHandlers[message.handlerName];
// 				if (!handler) {
// 					console.log("WebViewJavascriptBridge: WARNING: no handler for message from ObjC:", message);
// 				} else {
// 					handler(message.data, responseCallback);
// 				}
// 			}
// 		}
// 	}
	
// 	function _handleMessageFromObjC(messageJSON) {
//         _dispatchMessageFromObjC(messageJSON);
// 	}
// 	function setupWebViewJavascriptBridge(callback) {
// 		if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
// 		if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
// 		window.WVJBCallbacks = [callback];
// 		var WVJBIframe = document.createElement('iframe');
// 		WVJBIframe.style.display = 'none';
// 		WVJBIframe.src = 'https://__bridge_loaded__';
// 		document.documentElement.appendChild(WVJBIframe);
// 		setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
// 	}

// 	// setupWebViewJavascriptBridge(function(bridge) {
	
// 	// 	/* Initialize your app here */

// 	// 	bridge.registerHandler('JS Echo', function(data, responseCallback) {
// 	// 		console.log("JS Echo called with:", data)
// 	// 		responseCallback(data)
// 	// 	})
// 	// 	bridge.callHandler('ObjC Echo', {'key':'value'}, function responseCallback(responseData) {
// 	// 		console.log("JS received response:", responseData)
// 	// 	})
// 	// })

// 	registerHandler("_disableJavascriptAlertBoxSafetyTimeout", disableJavscriptAlertBoxSafetyTimeout);
	
// 	setTimeout(_callWVJBCallbacks, 0);
// 	function _callWVJBCallbacks() {
// 		var callbacks = window.WVJBCallbacks || [];
// 		delete window.WVJBCallbacks;
// 		for (var i=0; i<callbacks.length; i++) {
// 			callbacks[i](WebViewJavascriptBridge);
// 		}
// 	}
// })();