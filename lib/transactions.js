Transactions = new Mongo.Collection('transactions')

Transactions.attachSchema(new SimpleSchema({
    fromWallet: {
        type: Object
    },
    'fromWallet.ownerName': {
        type: String
    },
    'fromWallet.ownerKey': {
        type: String
    },
    toWallet: {
        type: Object
    },
    'toWallet.ownerName': {
        type: String
    },
    'toWallet.ownerKey': {
        type: String
    },
    amount: {
        type: Number,
        decimal: true
    }
}))

