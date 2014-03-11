
var App = Ember.Application.create();

App.Router.map(function () {

    this.resource('summoner', { path: '/:region/:name' }, function () {

        this.route('configure');

    });

});
