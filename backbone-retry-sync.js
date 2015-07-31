// Backbone.RetrySync v0.0.1, MIT Licensed
// Copyright (c) 2015, Walter Scarborough <walter.scarborough@gmail.com>

(function(factory) {

    // AMD
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'backbone', 'exports'], factory);
    }

    // Node.js or CommonJS
    else if (typeof exports === 'object') {
        factory(require('jquery'), require('backbone'), exports);
    }

    // Browser global
    else {
        factory(_, Backbone, {});
    }

}(function(_, Backbone, RetrySync) {

    var RetrySync = function(method, model, options) {

        var syncEngine = Backbone.sync;
        if (model.hasOwnProperty('retrySyncEngine')) {
            syncEngine = model.retrySyncEngine;
        }

        var retrySyncCounter = 1;
        var retrySyncLimit = model.retrySyncLimit || 3;

        var deferred = $.Deferred();
        var that = this;

        var retrySyncOperation = function() {

            retrySyncCounter++;

            // Stop and error out if we're over the limit
            if (retrySyncCounter > retrySyncLimit) {
                deferred.reject();
            }
            else {
                syncEngine(method, model, options)
                    .then(function() {
                        // Success, let's exit
                        deferred.resolve();
                    })
                    .fail(function() {
                        // Try syncing again
                        retrySyncOperation();
                    })
                    ;
            }
        }

        // Start initial sync operation
        retrySyncOperation();

        return deferred.promise();
    };

    // Export
    Backbone.RetrySync = RetrySync;

    return Backbone.RetrySync;
}));
