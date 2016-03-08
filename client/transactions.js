Template.transactions.onCreated(function() {

})

Template.transactions.onRendered(function() {

})

Template.transactions.helpers({
    transactions() {
        return Transactions.find()
    },
    truncate(id) {
        return id.substr(0, 6).toUpperCase()
    }
})

Template.transactions.events({

})

Template.transactions.onDestroyed(function() {

})

