function Ribs() {
    this.Model = new _RibsModel();
    this.Collection = new _RibsCollection();
    this.View = new _RibsView();
}

Ribs.prototype.new = function(obj, defaults) {
    if(arguments.length === 1) {
        var tempObj = Object.create(obj);
        tempObj.initialize();
        return tempObj;
    }
    else if(arguments.length === 2) {
        var tempObj = _.clone(obj);
        $.each(defaults, function(key, value) {
            tempObj.defaults[key] = defaults[key];
        });
        tempObj.initialize();
        return tempObj;
    }
    else {
        return false;
    }
};

function _RibsView() {
    this.json;
    this.el;
    this.events;
    this.renderFunc;
    this.immediate = function() {return;};
    this.initialize = function() {return;};
    this.defaults = {};
    this.onchange;
    this.functions;
}

_RibsView.prototype.extend = function(params) {
    var obj = Object.create(this);

    var that = obj;
    obj.json = params;
    obj.el = params.el;
    if(params.events) {
        obj.events = params.events;
    }
    if(params.functions) {
        var that = obj;
        obj.functions = params.functions;
        $.each(obj.functions, function(key,value) {
            var code = '_RibsView.prototype.' + key + ' = ' + value;
            eval(code);
        })
    }
    obj.renderFunc = params.render;
    if(params.immediate) {
        obj.immediate = params.immediate;
    }
    if(params.initialize) {
        obj.initialize = params.initialize;
    }
    if(params.defaults) {
        obj.defaults = params.defaults;
    }
    if(params.onchange) {
        obj.onchange = params.onchange;
    }

    obj.immediate();

    return obj;
};

_RibsView.prototype.changeEvent = function(defaultKey) {
    if(this.onchange[defaultKey]) {
        this.onchange[defaultKey]();
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
        $(event).on(this.events[event]['on'], this.json[this.events[event]['do']]);
    }
};

function _RibsModel() {
    this.fetchUrl;
    this.fetchMethod = 'get';
    this.updateUrl;
    this.updateMethod = 'post';
    this.deleteUrl;
    this.deleteMethod = 'post';
    this.createUrl;
    this.createMethod = 'post';
    this.immediate = function() {return;};
    this.initialize = function() {return;};
    this.defaults = {};
    this.onchange;
    this.functions;
}

_RibsModel.prototype.extend = function(params) {
    var obj = Object.create(this);
    var that = obj;
    if(params.onchange) {
        obj.onchange = params.onchange;
    }
    if(params.functions) {
        var that = obj;
        obj.functions = params.functions;
        $.each(obj.functions, function(key,value) {
            var code = '_RibsModel.prototype.' + key + ' = ' + value;
            eval(code);
        })
    }
    if(params.fetch) {
        obj.fetchUrl = params.fetch['url'];
        obj.fetchMethod = params.fetch['method'] ? params.fetch['method'] : 'get';
    }
    if(params.update) {
        obj.updateUrl = params.update['url'];
        obj.updateMethod = params.update['method'] ? params.update['method'] : 'post';
    }
    if(params.destory) {
        obj.deleteUrl = params.destory['url'];
        obj.deleteMethod = params.destory['method'] ? params.destory['method'] : 'post';
    }
    if(params.create) {
        obj.createUrl = params.create['url'];
        obj.createMethod = params.create['method'] ? params.create['method'] : 'post';
    }
    if(params.immediate) {
        obj.immediate = params.immediate;
    }
    if(params.initialize) {
        obj.initialize = params.initialize;
    }
    if(params.defaults) {
        obj.defaults = params.defaults;
    }

    obj.immediate();

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
        this.onchange[defaultKey]();
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
    this.onchange;
    this.functions;
}

_RibsCollection.prototype.extend = function(params) {
    var obj = Object.create(this);
    var that = obj;
    if(params.model) {
        obj.model = params.model;
    }
    if(params.defaults) {
        obj.defaults = params.defaults;
    }
    if(params.onchange) {
        obj.onchange = params.onchange;
    }
    if(params.fetch) {
        obj.fetchUrl = params.fetch['url'];
        obj.fetchMethod = params.fetch['method'] ? params.fetch['method'] : 'get';
    }
    if(params.update) {
        obj.updateUrl = params.update['url'];
        obj.updateMethod = params.update['method'] ? params.update['method'] : 'post';
    }
    if(params.destory) {
        obj.deleteUrl = params.destory['url'];
        obj.deleteMethod = params.destory['method'] ? params.destory['method'] : 'post';
    }
    if(params.create) {
        obj.createUrl = params.create['url'];
        obj.createMethod = params.create['method'] ? params.create['method'] : 'post';
    }
    if(params.functions) {
        var that = obj;
        obj.functions = params.functions;
        $.each(obj.functions, function(key,value) {
            var code = '_RibsCollection.prototype.' + key + ' = ' + value;
            eval(code);
        })
    }
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
        this.onchange[defaultKey]();
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

var Ribs = new Ribs();

