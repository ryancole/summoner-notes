
App.SummonerConfigureController = Ember.ObjectController.extend({

    needs: 'summoner',
    summoner: Ember.computed.alias("controllers.summoner"),

    actions: {

        save: function () {

            var result = { };

            if (typeof(localStorage.summoners) == 'string') {

                // parse the local data
                result = JSON.parse(localStorage.summoners);

            }

            // get the latest summoner data
            var summoner = this.get('summoner').get('content');

            if (!result.hasOwnProperty(summoner.region)) {

                // create region key if not exist
                result[summoner.region] = { };

            }

            // update local data with the current data
            result[summoner.region][summoner.name] = {

                name: summoner.name,
                games: summoner.games,
                token: summoner.token,
                region: summoner.region

            };

            // write it back to local storage
            localStorage.summoners = JSON.stringify(result);

            // redirect back to history listing
            this.transitionToRoute('summoner');

        }

    }

})