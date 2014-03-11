
var RIOT_API = 'https://prod.api.pvp.net';

function getSummonerByName (token, region, name) {

    return $.getJSON(RIOT_API + '/api/lol/' + region + '/v1.3/summoner/by-name/' + name + '?api_key=' + token);

};

function getGamesBySummonerId (token, region, id) {

    return $.getJSON(RIOT_API + '/api/lol/' + region + '/v1.3/game/by-summoner/' + id + '/recent' + '?api_key=' + token);

};
