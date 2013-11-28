(function(){

function Ribs() {
    this.Model = new _RibsModel();
    this.Collection = new _RibsCollection();
    this.View = new _RibsView();
    this.Router = new _Router();
}

Ribs.prototype.new = function(obj, defaults) {
    var tempObj;
    if(arguments.length === 1) {
        // tempObj = Ribs.transferSettings(obj);
        tempObj = Object.create(obj);
    }
    else if(arguments.length === 2) {
        /* tempObj = Ribs.transferSettings(obj); */
        tempObj = Object.create(obj);
        tempObj.defaults = defaults;
        // think about this one below
        // $.each(defaults, function(key, value) {
        //     tempObj.defaults[key] = defaults[key];
        // });
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
        alert('Check View');
        newObj = Ribs.View.extend(obj.json);
    }
    else if(obj._type === 'Ribs.Model') {
        alert('Check Model');
        newObj = Ribs.Model.extend(obj.json);
    }
    else if(obj._type === 'Ribs.Collection') {
        alert('Check Collection');
        newObj = Ribs.Collection.extend(obj.json);
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
    this.onchange;
}

_RibsView.prototype.extend = function(params) {
    var obj = Object.create(this);

    var that = obj;
    that.json = params;
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
        else if(item === 'onchange') {
            obj.onchange = val;
        }
        else {
            var code = '_RibsView.prototype.' + item + ' = ' + val;
            eval(code);
        }
    });

    this.self = obj;
    return obj;
};

_RibsView.prototype.changeEvent = function(defaultKey) {
    if(this.onchange[defaultKey]) {
        var code = '_RibsView.prototype._doChangeEvent  = ' + this.json[this.onchange[defaultKey]];
        eval(code);
        this._doChangeEvent();
    }
}

_RibsView.prototype.get = function(key) {
    return this.defaults[key];
};

_RibsView.prototype.set = function(json) {
    var that = this;
    $.each(json, function(key, value) {
        that.defaults[key] = json[key];
        if(that.onchange) {
            that.changeEvent(key);
        }
    });
    return this.defaults;
};

_RibsView.prototype.render = function() {
    this.renderFunc();

    // add events listener
    for(event in this.events) {
        $(event).on(this.events[event]['on'], {self: this}, this.json[this.events[event]['do']]);
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
    this.onchange;
}

_RibsModel.prototype.extend = function(params) {
    var obj = Object.create(this);
    var that = obj;
    that.json = params;
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
        else if(item === 'onchange') {
            obj.onchange = val;
        }
        else {
            var code = '_RibsModel.prototype.' + item + ' = ' + val;
            eval(code);
        }
    });

    this.self = obj;
    return obj;
};

_RibsModel.prototype.get = function(key) {
    return this.defaults[key];
};

_RibsModel.prototype.set = function(json) {
    var that = this;
    $.each(json, function(key, value) {
        that.defaults[key] = json[key];
        if(that.onchange) {
            that.changeEvent(key);
        }
    });
    return this.defaults;
};

_RibsModel.prototype.changeEvent = function(defaultKey) {
    if(this.onchange[defaultKey]) {
        var code = '_RibsModel.prototype._doChangeEvent  = ' + this.json[this.onchange[defaultKey]];
        eval(code);
        this._doChangeEvent();
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
    $.ajax({
        url: url,
        type: method,
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
    this.onchange;
}

_RibsCollection.prototype.extend = function(params) {
    var obj = Object.create(this);
    var that = obj;
    that.json = params;
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
        else if(item === 'onchange') {
            obj.onchange = val;
        }
        else {
            var code = '_RibsCollection.prototype.' + item + ' = ' + val;
            eval(code);
        }
    });

    this.self = obj;
    return obj;
};

_RibsCollection.prototype.get = function(key) {
    return this.defaults[key];
};

_RibsCollection.prototype.set = function(json) {
    var that = this;
    $.each(json, function(key, value) {
        that.defaults[key] = json[key];
        if(that.onchange) {
            that.changeEvent(key);
        }
    });
    return this.defaults;
};

_RibsCollection.prototype.changeEvent = function(defaultKey) {
    if(this.onchange[defaultKey]) {
        var code = '_RibsCollection.prototype._doChangeEvent  = ' + this.json[this.onchange[defaultKey]];
        eval(code);
        this._doChangeEvent();
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
        async: async,
        statusCode: {
            200: doneFunc
        },
        success: function(data) {
            $.each(data, function(i, item) {
                var md = Ribs.new(that.model, item);
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
window['Ribs']['new'] = Ribs.new;
window['Ribs']['Model'] = Ribs.Model;
window['Ribs']['Collection'] = Ribs.Collection;
window['Ribs']['View'] = Ribs.View;
window['Ribs']['Router'] = Ribs.Router;
})();
