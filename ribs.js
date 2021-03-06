(function(){

this.String.prototype.format = function () {
    "use strict";
    if (arguments.length === 0) {
        return null;
    }

    var string = this;
    for (var index = 0; index !== arguments.length; ++index) {
        var regEx = new RegExp("\\{" + (index + 1) + "\\}", "gm");
        string = string.replace(regEx, arguments[index]);
    }

    return string;
};

function Ribs() {
    this.Model = new _RibsModel();
    this.Collection = new _RibsCollection();
    this.View = new _RibsView();
    this.Router = new _Router();
}

Ribs.prototype.extend = function () {
    "use strict";
    var process = function (destination, source) {
        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                destination[key] = source[key];
            }
        }
        return destination;
    };
    var result = {};
    for(var i=0; i<arguments.length; i++) {
        result = process(result, arguments[i]);
    }
    return result;
};

Ribs.prototype.make = function(obj, defaults) {
    var tempObj;
    if(arguments.length === 1) {
        tempObj = $.extend(true, {}, obj);
    }
    else if(arguments.length === 2) {
        tempObj = $.extend(true, {}, obj);
        tempObj.set(defaults);
    }
    else {
        tempObj = false;
    }

    if(tempObj !== false) {
        tempObj.initialize();
    }

    return tempObj;
};

Ribs.prototype.transferSettings = function(obj) {
    var newObj;
    alert('Type: ' + obj._type);
    if(obj._type === 'Ribs.View') {
        newObj = Ribs.View.make(obj.json);
    }
    else if(obj._type === 'Ribs.Model') {
        newObj = Ribs.Model.make(obj.json);
    }
    else if(obj._type === 'Ribs.Collection') {
        newObj = Ribs.Collection.make(obj.json);
    }
    else {
        newObj = false;
    }
    return newObj;
}

function _RibsView() {
    this._type = 'Ribs.View';
    this.self;
    this.json;
    this.el;
    this.events;
    this.renderFunc;
    this.template;
    this.initialize = function() {return;};
    this.defaults = {};
    this.watch;
}

_RibsView.prototype.make = function(params) {
    var obj = Object.create(this);
    // var obj = $.extend(true, {}, Ribs.View);

    obj = obj.adopt(params, obj);

    this.self = obj;
    return obj;
};

_RibsView.prototype.adopt = function(params, object) {
    var obj;
    if(arguments.length === 1) {
        obj = this;
    }
    else if(arguments.length === 2) {
        obj = object;
        obj.json = params;
    }

    $.each(params, function(item) {
        var val = params[item];
        if(item === 'el') {
            obj.el = val;
        }
        else if(item === 'events') {
            obj.events = val;
        }
        else if(item === 'render') {
            obj.renderFunc = val;
        }
        else if(item === 'template') {
            obj.template = val;
        }
        else if(item === 'initialize') {
            obj.initialize = val;
        }
        else if(item === 'defaults') {
            if(typeof val === 'function') {
                obj.defaults = val();
            }
            else {
                obj.defaults = val;
            }
        }
        else if(item === 'watch') {
            obj.watch = val;
        }
        else {
            var code = '_RibsView.prototype.' + item + ' = ' + val;
            eval(code);
        }
    });

    return obj;
}

_RibsView.prototype._doChangeEvent = function () {};

_RibsView.prototype.changeEvent = function(defaultKey) {
    if(this.watch[defaultKey]) {
        _RibsView.prototype._doChangeEvent = this.json[this.watch[defaultKey]];
        _RibsView.prototype._doChangeEvent.call(this);
    }
}

_RibsView.prototype.get = function(key) {
    return this.defaults[key];
};

_RibsView.prototype.set = function(json) {
    var that = this;
    $.each(json, function(key, value) {
        that.defaults[key] = json[key];
        if(that.watch) {
            that.changeEvent(key);
        }
    });
    return this.defaults;
};

_RibsView.prototype.render = function() {
    this.renderFunc();

    console.log('EVENT');
    // add events listener
    for(event in this.events) {
        var evt = this.events[event];
        $(event).on(evt.on, {self: this}, this.json[evt.fire]);
    }
};

function _RibsModel() {
    this._type = 'Ribs.Model';
    this.self;
    this.json;
    this.fetchUrl;
    this.fetchMethod = 'get';
    this.updateUrl;
    this.updateMethod = 'post';
    this.deleteUrl;
    this.deleteMethod = 'post';
    this.createUrl;
    this.createMethod = 'post';
    this.initialize = function() {return;};
    this.defaults = {};
    this.watch;
}

_RibsModel.prototype.make = function(params) {
    var obj = Object.create(this);
    // var obj = $.extend(true, {}, Ribs.Model);

    obj = obj.adopt(params, obj);

    this.self = obj;
    return obj;
};

_RibsModel.prototype.adopt = function(params, object) {
    var obj;
    if(arguments.length === 1) {
        obj = this;
    }
    else if(arguments.length === 2) {
        obj = object;
        obj.json = params;
    }

    $.each(params, function(item) {
        var val = params[item];
        if(item === 'fetch') {
            obj.fetchUrl = val['url'];
            obj.fetchMethod = val['method'] ? val['method'] : 'get';
        }
        else if(item === 'update') {
            obj.updateUrl = val['url'];
            obj.updateMethod = val['method'] ? val['method'] : 'post';
        }
        else if(item === 'create') {
            obj.createUrl = val['url'];
            obj.createMethod = val['method'] ? val['method'] : 'put';
        }
        else if(item === 'destory') {
            obj.deleteUrl = val['url'];
            obj.deleteMethod = val['method'] ? val['method'] : 'delete';
        }
        else if(item === 'initialize') {
            obj.initialize = val;
        }
        else if(item === 'defaults') {
            if(typeof val === 'function') {
                obj.defaults = val();
            }
            else {
                obj.defaults = val;
            }
        }
        else if(item === 'watch') {
            obj.watch = val;
        }
        else {
            var code = '_RibsModel.prototype.' + item + ' = ' + val;
            eval(code);
        }
    });

    return obj;
}

_RibsModel.prototype._doChangeEvent = function () {};

_RibsModel.prototype.get = function(key) {
    return this.defaults[key];
};

_RibsModel.prototype.set = function(json) {
    var that = this;
    $.each(json, function(key, value) {
        that.defaults[key] = json[key];
        if(that.watch) {
            that.changeEvent(key);
        }
    });
    return this.defaults;
};

_RibsModel.prototype.changeEvent = function(defaultKey) {
    if(this.watch[defaultKey]) {
        _RibsModel.prototype._doChangeEvent = this.json[this.watch[defaultKey]];
        _RibsModel.prototype._doChangeEvent.call(this);
    }
}

_RibsModel.prototype.fetch = function(params) {
    this.ajax(this.fetchUrl, this.fetchMethod, params);
};

_RibsModel.prototype.update = function(params) {
    this.ajax(this.updateUrl, this.updateMethod, params);
};

_RibsModel.prototype.destory = function(params) {
    this.ajax(this.deleteUrl, this.deleteMethod, params);
};

_RibsModel.prototype.create = function(params) {
    this.ajax(this.createUrl, this.createMethod, params);
};

_RibsModel.prototype.ajax = function(url, method, params) {
    var data = params.data ? params.data : {};
    var async = params.async ? params.async : true;
    var doneFunc = params.done ? params.done : function() {return;};
    var failFunc = params.fail ? params.fail : function() {return;};
    var alwaysFunc = params.always ? params.always : function() {return;};
    doneFunc = doneFunc.bind(this);
    failFunc = failFunc.bind(this);
    alwaysFunc = alwaysFunc.bind(this);
    var self = this.self;
    $.ajax({
        url: url,
        type: method,
        context: self,
        data: data,
        async: async
    }).done(doneFunc).fail(failFunc).always(alwaysFunc);
};

function _RibsCollection() {
    this._type = 'Ribs.Collection';
    this.self;
    this.json;
    this.model;
    this.models = [];

    this.fetchUrl;
    this.fetchMethod = 'get';
    this.updateUrl;
    this.updateMethod = 'post';
    this.deleteUrl;
    this.deleteMethod = 'post';
    this.createUrl;
    this.createMethod = 'post';

    this.defaults = {};
    this.initialize = function() {return;};
    this.watch;
}

_RibsCollection.prototype.make = function(params) {
    var obj = Object.create(this);
    // var obj = $.extend(true, {}, Ribs.Collection);

    obj = obj.adopt(params, obj);

    this.self = obj;
    return obj;
};

_RibsCollection.prototype.adopt = function(params, object) {
    var obj;
    if(arguments.length === 1) {
        obj = this;
    }
    else if(arguments.length === 2) {
        obj = object;
        obj.json = params;
    }

    $.each(params, function(item) {
        var val = params[item];
        if(item === 'model') {
            obj.model = val;
        }
        else if(item === 'fetch') {
            obj.fetchUrl = val['url'];
            obj.fetchMethod = val['method'] ? val['method'] : 'get';
        }
        else if(item === 'update') {
            obj.updateUrl = val['url'];
            obj.updateMethod = val['method'] ? val['method'] : 'post';
        }
        else if(item === 'create') {
            obj.createUrl = val['url'];
            obj.createMethod = val['method'] ? val['method'] : 'put';
        }
        else if(item === 'destory') {
            obj.deleteUrl = val['url'];
            obj.deleteMethod = val['method'] ? val['method'] : 'delete';
        }
        else if(item === 'initialize') {
            obj.initialize = val;
        }
        else if(item === 'defaults') {
            if(typeof val === 'function') {
                obj.defaults = val();
            }
            else {
                obj.defaults = val;
            }
        }
        else if(item === 'watch') {
            obj.watch = val;
        }
        else {
            var code = '_RibsCollection.prototype.' + item + ' = ' + val;
            eval(code);
        }
    });

    return obj;
}

_RibsCollection.prototype._doChangeEvent = function () {};

_RibsCollection.prototype.get = function(key) {
    return this.defaults[key];
};

_RibsCollection.prototype.set = function(json) {
    var that = this;
    $.each(json, function(key, value) {
        that.defaults[key] = json[key];
        if(that.watch) {
            that.changeEvent(key);
        }
    });
    return this.defaults;
};

_RibsCollection.prototype.changeEvent = function(defaultKey) {
    if(this.watch[defaultKey]) {
        _RibsCollection.prototype._doChangeEvent = this.json[this.watch[defaultKey]];
        _RibsCollection.prototype._doChangeEvent.call(this);
    }
}

_RibsCollection.prototype.fetch = function(params) {
    var data = {};
    var async = true;
    var doneFunc = function() {return;};
    var failFunc = function() {return;};
    var alwaysFunc = function() {return;};

    if(arguments.length !== 0) {
        data = params.data ? params.data : {};
        async = params.async ? params.async : true;
        doneFunc = params.done ? params.done : function() {return;};
        failFunc = params.fail ? params.fail : function() {return;};
        alwaysFunc = params.always ? params.always : function() {return;};
    }

    var that = this;
    $.ajax({
        url: this.fetchUrl,
        type: this.fetchMethod,
        data: data,
        context: this,
        async: async,
        statusCode: {
            200: doneFunc
        },
        success: function(data) {
            $.each(data, function(i, item) {
                var md = Ribs.make(that.model, item);
                that.models.push(md);
            });
        },
        error: failFunc,
        complete: alwaysFunc
    });
};

_RibsCollection.prototype.update = function(params) {
    this.ajax(this.updateUrl, this.updateMethod, params);
};

_RibsCollection.prototype.destory = function(params) {
    this.ajax(this.deleteUrl, this.deleteMethod, params);
};

_RibsCollection.prototype.create = function(params) {
    this.ajax(this.createUrl, this.createMethod, params);
};

_RibsCollection.prototype.ajax = function(url, method, params) {
    var data = params.data ? params.data : {};
    var async = params.async ? params.async : true;
    var doneFunc = params.done ? params.done : function() {return;};
    var failFunc = params.fail ? params.fail : function() {return;};
    var alwaysFunc = params.always ? params.always : function() {return;};
    $.ajax({
        url: url,
        type: method,
        context: this,
        data: data,
        async: async
    }).done(doneFunc).fail(failFunc).always(alwaysFunc);
};

_RibsCollection.prototype.size = function() {
    return this.models.length;
};

function _Router() {
}

_Router.prototype.route = function(params) {
    this.route = routie(params);
    return this;
}

_Router.prototype.navigate = function(url) {
    routie(url);
};

var Ribs = new Ribs();
window['Ribs'] = {};
window['Ribs']['make'] = Ribs.make;
window['Ribs']['extend'] = Ribs.extend;
window['Ribs']['Model'] = Ribs.Model;
window['Ribs']['Collection'] = Ribs.Collection;
window['Ribs']['View'] = Ribs.View;
window['Ribs']['Router'] = Ribs.Router;
})();
