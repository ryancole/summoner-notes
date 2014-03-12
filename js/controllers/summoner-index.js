
App.SummonerIndexController = Ember.ObjectController.extend({

    needs: 'summoner',
    summoner: Ember.computed.alias("controllers.summoner"),

    query: '',
    lolking: '',
    summonerDetails: null,
    summonerNotFound: false,
    summonerNotPlayedWith: false,

    opponentsCount: function () {

        var summoner = this.get('summoner').get('content');

        return Object.keys(summoner.opponents).length;

    }.property('summoner'),

    actions: {

        search: function (query) {

            // get the local summoner data
            var summoner = this.get('summoner').get('content');

            query = query.replace(/ /g,'');

            // search for requested summoner name
            getSummonerByName(summoner.token, summoner.region, query).then(function (result) {

                this.set('summonerDetails', null);
                this.set('summonerNotFound', false);
                this.set('summonerNotPlayedWith', false);

                // extract the summoner's id
                var id = result[query].id;

                // check to see if this summoner have been played with
                if (summoner.opponents.hasOwnProperty(id)) {

                    var details = summoner.opponents[id];

                    // set the name
                    details.name = result[query].name;

                    // set the controller details
                    this.set('summonerDetails', details);

                    var link = 'http://www.lolking.net/summoner/' + details.region + '/' + details.id + '#matches/' + details.mostRecentGame.id;

                    // set the lolking url
                    this.set('lolking', link);

                } else {

                    this.set('summonerNotPlayedWith', true);

                }

            }.bind(this)).fail(function () {

                this.set('summonerDetails', null);
                this.set('summonerNotFound', true);
                this.set('summonerNotPlayedWith', false);

            }.bind(this));

        }

    }

});