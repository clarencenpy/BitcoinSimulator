Transactions = new Mongo.Collection('transactions')

TransactionSchema = new SimpleSchema({
    fromWallet: {
        type: Object,
        optional: true
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
})

Transactions.attachSchema(TransactionSchema)


VerifiedBlocks = new Mongo.Collection('verfiedBlocks')

VerifiedBlocks.attachSchema(new SimpleSchema({
    transactions: {
        type: [TransactionSchema]
    },
    nonce: {
        type: Number
    }
}))


