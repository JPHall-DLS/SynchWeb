define(['backbone'], function(Backbone) {

    return Backbone.Model.extend({
        urlRoot: '/fault/sys',
        idAttribute: 'SYSTEMID',

        defaults: {
            NAME: '',
            DESCRIPTION: '',
            BEAMLINES: '',
        },

        initialize: function(options) {
        	this.on('change', this._add_id, this)
      		this._add_id()
        },

        _add_id: function() {
        	this.attributes.ID = this.get('SYSTEMID')
        },
    })
    
})