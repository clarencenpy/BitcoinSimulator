Template.ticker.onCreated(function() {

})

Template.ticker.onRendered(function() {

})

Template.ticker.helpers({

})

Template.ticker.events({
    'click .start-fake-btn'(event, template) {
        template.interval = Meteor.setInterval(function () {
            Meteor.call('fakeTransaction')
        }, 3000)
    },
    'click .end-fake-btn'(event, template) {
        Meteor.clearInterval(template.interval)
    }
})

Template.ticker.onDestroyed(function() {
    let template = this
    Meteor.clearInterval(template.interval)
})

