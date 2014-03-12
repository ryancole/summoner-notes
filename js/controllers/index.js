

App.IndexController = Ember.ObjectController.extend({

    region: 'na',
    summoner: '',
    regions: [
        { name: 'North America', value: 'na' },
        { name: 'Europe West', value: 'euw' },
        { name: 'Brazil', value: 'br' },
        { name: 'Europe Nordic and East', value: 'eune' },
        { name: 'Latin America North', value: 'lan' },
        { name: 'Latin America South', value: 'las' },
        { name: 'Oceania', value: 'oce' }
    ]

});