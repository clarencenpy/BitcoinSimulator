Transactions = new Mongo.Collection('transactions')

let TransactionSchema = new SimpleSchema({
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

let BlockSchema = new SimpleSchema({
    transactions: {
        type: [TransactionSchema]
    },
    nonce: {
        type: Number
    }
})

VerifiedBlocks.attachSchema(BlockSchema)

Blockchains = new Mongo.Collection('blockchains')

Blockchains.attachSchema(new SimpleSchema({
    blocks: {
        type: [BlockSchema]
    },
    count: {
        type: Number
    }
}))


