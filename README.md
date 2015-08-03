# Backbone Retry Sync

Backbone Retry Sync is a plugin for [Backbone.js](http://backbonejs.org/) that allows models and collections to retry failed sync operations up to a configurable limit.

## Requirements

* Backbone.js 1.1.2+
* jQuery 2.1.3+

## Installation

It is recommended to use [Bower](http://bower.io/) for installation as follows:

```
    bower install --save backbone-retry-sync
```

## Usage

By default, Retry Sync will attempt to use Backbone.Sync with limit of 3 requests per instantiated model/collection.

This is configurable by setting annotations in your model/collection's initialize function.

Two annotations are currently supported:

* "retrySyncEngine" - Allows you to specify a custom sync function. If unspecified, then the default is Backbone.sync.

* "retrySyncLimit" - Allows you to specify the maximum number of times to retry a sync operation. If unspecified, then the default is 3.

For example:

```
var MyFancyModel = Backbone.Model.extend({
    initialize: function() {
        this.retrySyncEngine = MyFancySyncLibrary.sync;
        this.retrySyncLimit = 3;
    },
    sync: Backbone.RetrySync,
});
```

## Contributions

Contributions and feedback are welcome! Please open an issue or send a pull request.
