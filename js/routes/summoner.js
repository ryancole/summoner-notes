
App.SummonerRoute = Ember.Route.extend({

    model: function (params) {

        var summoner = {
            name: params.name,
            region: params.region
        };

        // check for possible existing summoner data
        if (typeof(localStorage.summoners) == 'string') {

            // parse existing local data
            var data = JSON.parse(localStorage.summoners);

            // check for data for this summoner
            if (data.hasOwnProperty(summoner.region) && data[summoner.region].hasOwnProperty(summoner.name)) {

                // use the existing data
                summoner = data[summoner.region][summoner.name];

            }

        }

        return summoner;

    },

    afterModel: function (model, transition) {

        // check for an api access token
        if (typeof(model.token) != 'string' || model.token.length <= 0) {

            return this.transitionTo('summoner.configure');

        }

        // check for summoner id
        if (typeof(model.id) != 'number') {

            return getSummonerByName(model.token, model.region, model.name).then(function (summoner) {

                // save the summoner id
                model.id = summoner[model.name].id;

                // reload the route
                this.transitionTo('summoner', model);

            }.bind(this));

        }

        // fetch recent games
        return getGamesBySummonerId(model.token, model.region, model.id).then(function (history) {

            // initialize opponents container
            if (!model.hasOwnProperty('opponents'))
                model.opponents = { };

            // reverse the game history
            history.games.reverse();

            // iterate over recent games
            history.games.forEach(function (game) {

                // iterate over each player in the game
                game.fellowPlayers.forEach(function (fellow) {

                    // create the player record if this is the first encounter
                    if (!model.opponents.hasOwnProperty(fellow.summonerId)) {

                        model.opponents[fellow.summonerId] = {
                            id: fellow.summonerId,
                            region: model.region,
                            timesSeen: 0,
                            mostRecentGame: {
                                id: 0
                            }
                        };

                    }

                    var opponent = model.opponents[fellow.summonerId];

                    // if this game id is newer than previous, update
                    if (game.gameId > opponent.mostRecentGame.id) {

                        // increment times seen
                        opponent.timesSeen += 1;

                        // set last game data
                        opponent.mostRecentGame = {
                            id: game.gameId,
                            mode: game.gameMode,
                            type: game.gameType,
                            subtype: game.subType,
                            enemy: game.teamId != fellow.teamId,
                            victory: game.stats.win
                        };

                    }

                });

            });

            var local = JSON.parse(localStorage.summoners);

            local[model.region][model.name] = model;

            localStorage.summoners = JSON.stringify(local);

        }.bind(this));

    }

});