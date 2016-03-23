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
    },
    evil: {
        type: Boolean,
        optional: true
    },
    amount: {
        type: Number,
        optional: true,
        decimal: true
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
        type: Date,
        optional: true
    },
    confirmed: {
        type: Boolean,
        optional: true
    }
})

Transactions.attachSchema(TransactionSchema)


VerifiedBlocks = new Mongo.Collection('verifiedBlocks')

let BlockSchema = new SimpleSchema({
    transactions: {
        type: [TransactionSchema]
    },
    nonce: {
        type: Number
    },
    date: {
        type: Date,
        optional: true
    },
    previousHash: {
        type: String,
        optional: true  //not for genesis block
    },
    outputHash: {
        type: String
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




