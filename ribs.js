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
    this.defaults;
    this.onchange;
}

_RibsView.prototype.extend = function(params) {
    var that = this;
    this.json = params;
    this.el = params.el;
    if(params.events) {
        this.events = params.events;
    }
    this.renderFunc = params.render;
    if(params.immediate) {
        this.immediate = params.immediate;
    }
    if(params.initialize) {
        this.initialize = params.initialize;
    }
    if(params.defaults) {
        this.defaults = params.defaults;
    }
    if(params.onchange) {
        this.onchange = params.onchange;
    }

    this.immediate();

    return this;
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
        that.changeEvent(key);
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
    this.defaults;
    this.onchange;
}

_RibsModel.prototype.extend = function(params) {
    var that = this;
    if(params.onchange) {
        this.onchange = params.onchange;
    }
    if(params.fetch) {
        this.fetchUrl = params.fetch['url'];
        this.fetchMethod = params.fetch['method'] ? params.fetch['method'] : 'get';
    }
    if(params.update) {
        this.updateUrl = params.update['url'];
        this.updateMethod = params.update['method'] ? params.update['method'] : 'post';
    }
    if(params.destory) {
        this.deleteUrl = params.destory['url'];
        this.deleteMethod = params.destory['method'] ? params.destory['method'] : 'post';
    }
    if(params.create) {
        this.createUrl = params.create['url'];
        this.createMethod = params.create['method'] ? params.create['method'] : 'post';
    }
    if(params.immediate) {
        this.immediate = params.immediate;
    }
    if(params.initialize) {
        this.initialize = params.initialize;
    }
    if(params.defaults) {
        this.defaults = params.defaults;
    }

    this.immediate();

    return this;
};

_RibsModel.prototype.get = function(key) {
    return this.defaults[key];
};

_RibsModel.prototype.set = function(json) {
    var that = this;
    $.each(json, function(key, value) {
        that.defaults[key] = json[key];
        that.changeEvent(key);
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
    var data = params.data ? params.data : true;
    var async = params.async ? params.async : {};
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
    this.url;
    this.method = 'get';
    this.defaults;
    this.onchange;
}

_RibsCollection.prototype.extend = function(params) {
    var that = this;
    if(params.model) {
        this.model = params.model;
        this.models.push(this.model);
    }
    this.url = params.url;
    if(params.method) {
        this.method = params.method;
    }
    if(params.defaults) {
        this.defaults = params.defaults;
    }
    if(params.onchange) {
        this.onchange = params.onchange;
    }
    return this;
};

_RibsCollection.prototype.get = function(key) {
    return this.defaults[key];
};

_RibsCollection.prototype.set = function(json) {
    var that = this;
    $.each(json, function(key, value) {
        that.defaults[key] = json[key];
        that.changeEvent(key);
    });
    return this.defaults;
};

_RibsCollection.prototype.changeEvent = function(defaultKey) {
    if(this.onchange[defaultKey]) {
        this.onchange[defaultKey]();
    }
}

_RibsCollection.prototype.fetch = function(params) {
    var data = params.data ? params.data : {};
    var doneFunc = params.done ? params.done : function() {return;};
    var failFunc = params.fail ? params.fail : function() {return;};
    var alwaysFunc = params.always ? params.always : function() {return;};
    $.get(this.url, data).done(doneFunc).fail(failFunc).always(alwaysFunc);
};

var Ribs = new Ribs();

