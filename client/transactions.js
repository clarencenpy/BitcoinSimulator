Template.transactions.onCreated(function() {
    const template = this
    template.interval = new ReactiveVar(null)
})

Template.transactions.onRendered(function() {
    const template = this
    template.$('.ui.basic.modal').on('click', '.submit-btn', function() {
        let fromWalletName = $('#fromWalletName')[0].value
        let toWalletName = $('#toWalletName')[0].value
        let amount = $('#amount')[0].value
        let tx = {
            fromWallet: {
                ownerName: fromWalletName,
                ownerKey: CryptoJS.SHA256(fromWalletName).toString()
            },
            toWallet: {
                ownerName: toWalletName,
                ownerKey: CryptoJS.SHA256(toWalletName).toString()
            },
            amount: amount,
            date: new Date(),
            confirmed: false,
            difficulty: Difficulty.find().fetch()[0].difficulty
        }
        Transactions.insert(tx)

        $('.ui.basic.modal').modal('hide')
    })
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
    },
    'click .make-transaction-btn'() {
        $('.ui.basic.modal').modal('show')
    }
})

Template.transactions.onDestroyed(function() {
    Meteor.clearInterval(template.interval.get())
    template.interval.set(null)
})

