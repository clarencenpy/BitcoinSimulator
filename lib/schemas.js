Transactions = new Mongo.Collection('transactions')

Wallets = new Mongo.Collection('wallets')

let WalletSchema = new SimpleSchema({
    ownerName: {
        type: String
    },
    ownerKey: {
        type: String
    },
    online: {
        type: Boolean,
        optional: true
    },
    mining: {
        type: Boolean,
        optional: true
    }
})

Wallets.attachSchema(WalletSchema)

let TransactionSchema = new SimpleSchema({
    fromWallet: {
        type: WalletSchema,
        optional: true
    },
    toWallet: {
        type: WalletSchema
    },
    amount: {
        type: Number,
        decimal: true
    },
    date: {
        type: Date
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




