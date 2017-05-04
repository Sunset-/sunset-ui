const EVENTS = {
    CONNECT: 'CONNECT',
    MESSAGE: 'MESSAGE',
    DISCONNECT: 'DISCONNECT',
    ERROR: 'ERROR'
};

/**
 * 事件订阅发布
 * 
 */
var PubSub = function (context) {
    this.context = context;
    this.callbacks = {};
}
PubSub.prototype = {
    /**
     * 获取回调集合
     */
    _getCallbacks: function () {
        return this.callbacks || (this.callbacks = {});
    },
    /**
     * 注册事件
     * @param  {[type]}   ev       事件名称
     * @param  {Function} callback 回调
     * @return {[type]}            [description]
     */
    subscribe: function (ev, callback) {
        var callbacks = this._getCallbacks();
        if (typeof callback == "function") {
            (callbacks[ev] || (callbacks[ev] = [])).push(callback);
        } else if (Object.prototype.toString.call(callback) === '[object Array]') {
            var singleCb;
            for (var i = 0, l = callback.length; i < l; i++) {
                if (typeof (singleCb = callback[i]) == "function") {
                    (callbacks[ev] || (callbacks[ev] = [])).push(singleCb);
                }
            }
        }
    },
    /**
     * 发布事件
     * @return {[type]} [description]
     */
    publish: function () {
        var callbacks = this._getCallbacks();
        var args = Array.prototype.slice.call(arguments, 0),
            ev = args.shift(),
            calls = callbacks[ev];
        if (ev && calls) {
            var l;
            if ((l = calls.length) == 1) {
                return calls[0].apply(this.context, args);
            } else {
                for (var i = 0; i < l; i++) {
                    calls[i].apply(this.context, args);
                }
            }
        }
    },
    /**
     * 发布事件
     * @return {[type]} [description]
     */
    publishAsync: function () {
        var callbacks = this._getCallbacks();
        var args = Array.prototype.slice.call(arguments, 0),
            ev = args.shift(),
            calls = callbacks[ev],
            self = this;
        if (ev && calls) {
            var l;
            if ((l = calls.length) == 1) {
                setTimeout(function () {
                    calls[0].apply(self.context, args);
                });
            } else {
                for (var i = 0; i < l; i++) {
                    (function (i) {
                        setTimeout(function () {
                            calls[i].apply(self.context, args);
                        });
                    })(i);
                }
            }
        }
    },
    /**
     * 取消订阅
     * @param  {[type]}   ev       事件名称
     * @param  {Function} callback 回调函数
     * @return {[type]}            [description]
     */
    unsubscribe: function (ev, callback) {
        var callbacks = this._getCallbacks();
        var cbs;
        if (cbs = callbacks[ev]) {
            if (callback) {
                for (var i = 0, l = cbs.length; i < l; i++) {
                    if (cbs[i] === callback) {
                        cbs.slice(i);
                    }
                }
            } else {
                callbacks[ev] = null;
            }
        }
    },
    /**
     * 注册事件集合
     * @param  {[type]} events [description]
     * @return {[type]}        [description]
     */
    regist: function (events) {
        if (events) {
            for (var ev in events) {
                if (events.hasOwnProperty(ev)) {
                    this.subscribe(ev, events[ev]);
                }
            }
        }
        return this;
    }
};


var SunsetWebsocket = {
    EVENTS: EVENTS,
    connectionMap: {},
    pubsubMap: {},
    promiseMap: {},
    promiseHolder: {},
    //连接
    connect(options) {
        var url = options.url,
            topic = options.topic || url;
        if (!this.connectionMap[topic]) {
            var ctx = options;
            ctx.topic = topic;
            this.connectionMap[topic] = ctx;
            this._connect(ctx);
            return this.promiseHolder[topic] = new Promise((resolve, reject) => {
                this.promiseMap[topic] = {
                    resolve,
                    reject,
                    isNew: true
                };
            });
        } else {
            return this.promiseHolder[topic];
        }

    },
    _connect(ctx) {
        if ('WebSocket' in window) {
            ctx.connection = new WebSocket(ctx.url);
        } else if ('MozWebSocket' in window) {
            ctx.connection = new MozWebSocket(ctx.url);
        } else {
            alert('WebSocket is not supported by this browser.');
            return;
        }
        this._initEvent(ctx);
    },
    _initEvent: function (ctx) {
        var self = this,
            topic = ctx.topic,
            connection = ctx.connection,
            format = ctx.format;
        connection.onopen = function () {
            self.trigger(topic, EVENTS.CONNECT);
            if (self.promiseMap[topic]) {
                if (self.promiseMap[topic].isNew) {
                    self.promiseMap[topic].isNew = false;
                    self.promiseMap[topic].resolve();
                }
            }
            //console.log('open');
        };
        connection.onmessage = function (evt) {
            var formatData;
            try {
                if (format) {
                    formatData = format(evt.data);
                } else if (ctx.json === true) {
                    formatData = JSON.parse(evt.data);
                }
            } catch (e) {
                formatData = evt.data;
            }
            self.trigger(topic, EVENTS.MESSAGE, formatData);
        };
        connection.onclose = function (evt) {
            if (self.connection) {
                //console.log('断线重连');
                self._connect(ctx);
            } else {
                self.trigger(topic, EVENTS.DISCONNECT);
            }
            //console.log('close');
        };
        connection.onerror = function (evt) {
            if (self.promiseMap[topic]) {
                if (self.promiseMap[topic].isNew) {
                    self.promiseMap[topic].isNew = false;
                    self.promiseMap[topic].reject();
                }
            }
            self.trigger(topic, EVENTS.ERROR);
            //console.log("WebSocketError!");
        };
    },
    trigger(topic, eventName) {
        var pubsub;
        if (pubsub = this.pubsubMap[topic]) {
            pubsub.publish.apply(pubsub, [].slice.call(arguments, 1));
        }
    },
    /**
     * 断开连接
     */
    disconnect: function (topic) {
        var ctx = this.connectionMap[topic];
        if (ctx) {
            delete this.connectionMap[topic];
            ctx.connection.close();
        }
        delete this.pubsubMap[topic];
        delete this.promiseHolder[topic];
    },
    listen(topic, eventName, cb) {
        var pubsub = this.pubsubMap[topic];
        if (!pubsub) {
            pubsub = this.pubsubMap[topic] = new PubSub();
        }
        pubsub.subscribe(eventName, cb);
    },
    send(topic, msg) {
        var ctx;
        if (ctx = this.connectionMap[topic]) {
            ctx.connection.send(msg);
        }
    }
}


module.exports = SunsetWebsocket;