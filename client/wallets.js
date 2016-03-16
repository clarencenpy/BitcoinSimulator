Template.wallets.onCreated(function() {

})

Template.wallets.onRendered(function() {

})

Template.wallets.helpers({
    wallets() {
        return Wallets.find({online: true})
    },
    obscure(key) {
        return key.substr(0, 6) + '...'
    }
})

Template.wallets.events({

})

Template.wallets.onDestroyed(function() {

})

