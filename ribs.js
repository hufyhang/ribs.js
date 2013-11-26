function Ribs() {
    this.Model = new _RibsModel();
    this.Collection = new _RibsCollection();
    this.View = new _RibsView();
}

function _RibsView() {
    this.json;
    this.el;
    this.events;
    this.renderFunc;
    this.initilize;
}

_RibsView.prototype.extend = function(params) {
    var that = this;
    this.json = params;
    this.el = params.el;
    if(params.hasOwnProperty('events')) {
        this.events = params.events;
    }
    this.renderFunc = params.render;
    if(params.hasOwnProperty('initilize')) {
        this.initilize = params.initilize;
    }

    this.initilize();

    return this;
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
}

_RibsModel.prototype.extend = function(params) {
    var that = this;
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

    return this;
};

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
}

_RibsCollection.prototype.extend = function(params) {
    var that = this;
    if(params.hasOwnProperty['model']) {
        this.model = params.model;
        this.models.push(this.model);
    }
    this.url = params.url;
    if(params.hasOwnProperty['method']) {
        this.method = params.method;
    }
    return this;
};

_RibsCollection.prototype.fetch = function(params) {
    var data = params.data ? params.data : {};
    var doneFunc = params.done ? params.done : function() {return;};
    var failFunc = params.fail ? params.fail : function() {return;};
    var alwaysFunc = params.always ? params.always : function() {return;};
    $.get(this.url, data).done(doneFunc).fail(failFunc).always(alwaysFunc);
};

var Ribs = new Ribs();

