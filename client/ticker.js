Template.ticker.onCreated(function() {

})

Template.ticker.onRendered(function() {
    Meteor.setInterval(function () {
        Meteor.call('fakeTransaction')
    }, 3000)

})

Template.ticker.helpers({

})

Template.ticker.events({

})

Template.ticker.onDestroyed(function() {

})

