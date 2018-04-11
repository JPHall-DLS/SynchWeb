define(['backbone'], function(Backbone) {
    
    return Backbone.Model.extend({
        idAttribute: 'DIFFRACTIONPLANID',
        urlRoot: '/sample/plan',

        initialize: function(attrs, options) {
            this.on('change:AXISRANGE change:NUMBEROFIMAGES change:AXISSTART', this.calculateAxisEnd)
            this.calculateAxisEnd()
        },

        calculateAxisEnd: function() {
            this.set('AXISEND', parseFloat(this.get('AXISSTART'))+(parseInt(this.get('NUMBEROFIMAGES'))*parseFloat(this.get('AXISRANGE'))))
            this.trigger('computed:changed')
        },

        computed: function() {
            return [
                'AXISEND'
            ]
        },

        initialize: function(attrs, options) {
            if (options && options.beamlinesetup) {
                _.each(this.validation, function(v,k) {
                    var range = options.beamlinesetup.getRange({ field: k })
                    if (range) this.__proto__.validation[k].range = range
                }, this)
            }
        },


        defaults: {
            WAVELENGTH: 12658,
            AXISEND: 0,
        },

        validation: {
            EXPERIMENTKIND: {
                required: true,
                pattern: 'word',
            },

            REQUIREDRESOLUTION: {
                required: true,
                pattern: 'number',
            },

            EXPOSURETIME: {
                required: true,
                pattern: 'number',
            },

            PREFERREDBEAMSIZEX: {
                required: true,
                pattern: 'digits',
            },

            PREFERREDBEAMSIZEY: {
                required: true,
                pattern: 'digits',
            },

            AXISRANGE: {
                required: false,
                pattern: 'number',
            },

            AXISSTART: {
                required: true,
                pattern: 'number',
            },

            AXISEND: {
                required: false,
                pattern: 'number',
            },

            NUMBEROFIMAGES: {
                required: true,
                pattern: 'digits',
            },

            TRANSMISSION: {
                required: true,
                pattern: 'number',
            },

            ENERGY: {
                required: true,
                pattern: 'digits',
            },
        },
      
    })
       
})
