Template.footer.onCreated(function() {

})

Template.footer.onRendered(function() {

})

Template.footer.helpers({
    numHonest() {
        return Wallets.find({evil: {$in: [undefined, false]}}).count()
    },
    numEvil() {
        return Wallets.find({evil: true}).count()
    },
    numConfirmed() {
        return Transactions.find({confirmed: true}).count()
    },
    numPending() {
        return Transactions.find({confirmed: {$nin: [undefined, false]}}).count()
    }
})

Template.footer.events({

})

Template.footer.onDestroyed(function() {

})

