Template.transactions.onCreated(function() {
    const template = this
    template.interval = new ReactiveVar(null)
})

Template.transactions.onRendered(function() {

})

Template.transactions.helpers({
    transactions() {
        return Transactions.find({}, {sort: {date: -1}})
    },
    truncate(id) {
        return id.substr(0, 6).toUpperCase()
    },
    isFaking() {
        return !!Template.instance().interval.get()
    }
})

Template.transactions.events({
    'click .start-fake-btn'(event, template) {
        //check if it is already started
        if (!template.interval.get()) {
            //already started
            template.interval.set(Meteor.setInterval(function () {
                Meteor.call('fakeTransaction')
            }, 3000))
        } else {
            //stop it
            Meteor.clearInterval(template.interval.get())
            template.interval.set(null)
        }
    }
})

Template.transactions.onDestroyed(function() {
    Meteor.clearInterval(template.interval.get())
    template.interval.set(null)
})

