## Ribs.js

Ribs.js is designed to be a light-weight MVC framework for Web front-end development. Unlike other MVX frameworks (e.g. Backbone.js) Ribs.js is primarily used with *non-RESTful* Web services/APIs.

Ribs.js is currently at **Alpha** stage, please report any bugs encountered or raise pull requests.

A standalone copy of this documentation can be found from Ribs.js's [homepage](http://feifeihang.info/ribs/).

Dependencies
============

1. jQuery
2. Routie.js (*already included in Ribs.js by default*)

Installation
============

The minified Ribs.js library is available at:

[http://feifeihang.info/ribs/ribs.min.js](http://feifeihang.info/ribs/ribs.min.js)

Object.format(`*args`)
======================

Format a string.

For example:

        '{1} is now {2} years old.'.format('Tom', 20);


Ribs.make(`obj, defaults`)
=======================

<a name="ribs_new"></a>Create an Ribs instance.

`obj`: the object that needs to be cloned.

`defaults`: [**optional**] the defaults JSON data of the newly cloned istance.


Ribs.extend(`json`)
===================

Deep copy the objects defined in arguments and return the newly created object.


Ribs.Model
==========

Ribs.Model.make(`json`)
--------------------

Create a new Ribs.Model instance.

`json`: the settings in JSON

* `fetch`: JSON to set the access point for fetching the Ribs.Model from server.
    -  `url`: URL
    -  `method`: Invoking method (*i.e. 'get', 'post', 'put', 'delete', etc.*).
* `update`: JSON to set the access point for updating the Ribs.Model from server.
    -  `url`: URL
    -  `method`: Invoking method (*i.e. 'get', 'post', 'put', 'delete', etc.*).
* `create`: JSON to set the access point for creating the Ribs.Model from server.
    -  `url`: URL
    -  `method`: Invoking method (*i.e. 'get', 'post', 'put', 'delete', etc.*).
* `destory`: JSON to set the access point for destorying the Ribs.Model from server.
    -  `url`: URL
    -  `method`: Invoking method (*i.e. 'get', 'post', 'put', 'delete', etc.*).
* `initialize`: the function that will be executed when a new instance is create by using Ribs.new against this Ribs instance.
* `defaults`: the default dataset of the instance.
* `onchange`: the functions that will be autoamatically executed when the specified 'defailts' element is changed.

Ribs.Model.adopt(`json`)
----------------------

Update settings according to 'json'.

`json`: settings JSON

Ribs.Model.get(`key`)
-------------------

Get a JSON value from default dataset.

`key`: the JSON key of the target element.

Ribs.Model.set(`json`)
--------------------

Set/update the default dataset.

`json`: the new JSON to be set.

Ribs.Model.fetch(`json`)
----------------------

Fetch data from server according to the '`fetch`' settings.

`json`: the settings of the fetch method.

* `data`: JSON of the form data to be sent to server.
* `async`: [**optional**] the boolean value to identify if this call should be asynchronioused.
* `done`: the function that will be executed when the calling is successed.
* `fail`: the function that will be executed when the calling is failed.
* `always`: the function that will always be executed after the calling.

Ribs.Model.update(`json`)
-----------------------

Fetch data from server according to the '`update`' settings.

`json`: the settings of the update method.

* `data`: JSON of the form data to be sent to server.
* `async`: [**optional**] the boolean value to identify if this call should be asynchronioused.
* `done`: the function that will be executed when the calling is successed.
* `fail`: the function that will be executed when the calling is failed.
* `always`: the function that will always be executed after the calling.

Ribs.Model.create(`json`)
-----------------------

Fetch data from server according to the '`create`' settings.

`json`: the settings of the create method.

* `data`: JSON of the form data to be sent to server.
* `async`: [**optional**] the boolean value to identify if this call should be asynchronioused.
* `done`: the function that will be executed when the calling is successed.
* `fail`: the function that will be executed when the calling is failed.
* `always`: the function that will always be executed after the calling.

Ribs.Model.destory(`json`)
------------------------

Fetch data from server according to the '`destory`' settings.

`json`: the settings of the destory method.

* `data`: JSON of the form data to be sent to server.
* `async`: [**optional**] the boolean value to identify if this call should be asynchronioused.
* `done`: the function that will be executed when the calling is successed.
* `fail`: the function that will be executed when the calling is failed.
* `always`: the function that will always be executed after the calling.

Ribs.View
=========

Ribs.View.make(`json`)
-------------------

Create a new Ribs.View instance.

`json`: the settings in JSON

* `el`: the DOM element that will be used to display the view instance.
* `events`: the events binding of the view instance (has to be an array).
   - `on`: the event trigger.
   - `do`: the name of the function that will be called when the trigger is fired. This function should be defined as a part of 'json'.

       e.g.: `{'#btn': [{on: 'click', do: 'showInfo'}]}`

* `template`: the template that will be used to render the view.
* `initialize`: the function that will be executed when a new instance is create by using Ribs.create against this Ribs instance.
* `defaults`: the default dataset of the instance.
* `onchange`: the functions that will be autoamatically executed when the specified '`defaults`' element is changed.

**Good Practice:** [Defining functions for Ribs.View](#ribs-view-functions)

Ribs.View.adopt(`json`)
---------------------

Update settings according to '`json`'.

`json`: settings JSON

Ribs.View.get(`key`)
------------------

Get a JSON value from default dataset.

`key`: the JSON key of the target element.

Ribs.View.set(`json`)
-------------------

Set/update the default dataset.

`json`: the new JSON to be set.

Ribs.View.render()
------------------

Render the Ribs.View instance in its '`el`'.

Ribs.Collection
===============

Ribs.Collection.make(`json`)
-------------------------

Create a new Ribs.Collection instance.

`json`: the settings in JSON

* `model`: the initial Ribs.Model involved in this Ribs.Collection.
* `fetch`: JSON to set the access point for fetching the Ribs.Model from server.
   - `url`: URL
   - `method`: Invoking method (*i.e. 'get', 'post', 'put', 'delete', etc.*).
* `update`: JSON to set the access point for updating the Ribs.Model from server.
   - `url`: URL
   - `method`: Invoking method (*i.e. 'get', 'post', 'put', 'delete', etc.*).
* `create`: JSON to set the access point for creating the Ribs.Model from server.
   - `url`: URL
   - `method`: Invoking method (*i.e. 'get', 'post', 'put', 'delete', etc.*).
* `destory`: JSON to set the access point for destorying the Ribs.Model from server.
   - `url`: URL
   - `method`: Invoking method (*i.e. 'get', 'post', 'put', 'delete', etc.*).
* `defaults`: the default dataset of the instance.
* `initialize`: the function that will be executed when a new instance is create by using [Ribs.make](#ribs_new) against this Ribs instance.
* `onchange`: the functions that will be autoamatically executed when the specified '`defaults`' element is changed.

Ribs.Collection.adopt(`json`)
----------------------

Update settings according to '`json`'.

`json`: settings JSON

Ribs.Collection.get(`key`)
------------------------

Get a JSON value from default dataset.

`key`: the JSON key of the target element.

Ribs.Collection.set(`json`)
-------------------------

Set/update the default dataset.

`json`: the new JSON to be set.

Ribs.Collection.fetch(`json`)
---------------------------

Fetch data from server according to the '`fetch`' settings.

`json`: the settings of the fetch method.

* `data`: JSON of the form data to be sent to server.
* `async`: [**optional**] the boolean value to identify if this call should be asynchronioused.
* `done`: the function that will be executed when the calling is successed.
* `fail`: the function that will be executed when the calling is failed.
* `always`: the function that will always be executed after the calling.

Ribs.Collection.update(`json`)
----------------------------

Fetch data from server according to the '`update`' settings.

- `json`: the settings of the update method.
   * `data`: JSON of the form data to be sent to server.
   * `async`: [**optional**] the boolean value to identify if this call should be asynchronioused.
   * `done`: the function that will be executed when the calling is successed.
   * `fail`: the function that will be executed when the calling is failed.
   * `always`: the function that will always be executed after the calling.

Ribs.Collection.create(`json`)
----------------------------

Fetch data from server according to the '`create`' settings.

`json`: the settings of the create method.

* `data`: JSON of the form data to be sent to server.
* `async`: [**optional**] the boolean value to identify if this call should be asynchronioused.
* `done`: the function that will be executed when the calling is successed.
* `fail`: the function that will be executed when the calling is failed.
* `always`: the function that will always be executed after the calling.

Ribs.Collection.destory(`json`)
-----------------------------

Fetch data from server according to the '`destory`' settings.

`json`: the settings of the destory method.

* `data`: JSON of the form data to be sent to server.
* `async`: [**optional**] the boolean value to identify if this call should be asynchronioused.
* `done`: the function that will be executed when the calling is successed.
* `fail`: the function that will be executed when the calling is failed.
* `always`: the function that will always be executed after the calling.

Ribs.Collection.size()
----------------------

Return the size of the Ribs collection.

Ribs.Router
===========

**Dependency: [routie.js]**

Ribs.Router.route(`json`)
-----------------------

Set routing.

`json`: the settings in JSON

e.g.:

~~~ {.json}
{
    '': function() {
        alert(...);
    }, 
    'home': function() {
        return;
    }
}
~~~

Ribs.Router.navigate(`url`)
-------------------------

Redirect the page to a URL.

`url`: the reditection destination.


Ribs Good Practice
===================

Defining functions for a Ribs.View
-----------------------------------

<a name="ribs-view-functions"></a>
When defining functions for a Ribs.View, the **data members** involved in the function code blocks **are independent** from the definition of Ribs.View itself. To use the data members or functions even contained by the Ribs.View itself, an explicit include/import is necessary.

To refer the Ribs.View instance itself in `events` actions, passing a parameter such as `evt` to the action, and then use `var self = evt.data.self;` instead of pointer `this`.

Example:

~~~ {.javascript}
var date = new Date();
var user = Ribs.Model.make(...);

var UserView = Ribs.View.make({
    el: $("body"),
    template: $("user-view-template").html(),
    defaults: {
        sys-date: date
    },
    render: function() {
        this.el.html(_.template(this.template), {data: this.get("sys-date")});
    },
    initialize: function() {
        this.render();
    },
    events: {
        "#ok-btn": {
            on: "click",
            do: "showInfo"
        }
    },
    showInfo: function(e) {
        // point self to the instance
        var self = e.data.self;

        // include external data members/instances
        self.set({
            user: user,
        });

        // invoke functions
        console.log(self.get("sys-date"));
        console.log(self.get("user").someFunction());
    },
    nonActionFunc: function() {
        // 'this' can be used in non-action functions
        console.log(this.get("sys-date");
    }

});
~~~

[routie.js]: http://projects.jga.me/routie

