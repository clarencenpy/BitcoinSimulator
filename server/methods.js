Meteor.methods({
    fakeTransaction() {
        let tx = {
            fromWallet: {},
            toWallet: {},
            amount: Random.choice([5, 10, 15, 20, 25, 30, 35, 40, 45, 50])
        }
        tx.fromWallet.ownerName = faker.name.firstName()
        tx.fromWallet.ownerKey = CryptoJS.SHA256(tx.fromWallet.ownerName).toString()
        tx.toWallet.ownerName = faker.name.firstName()
        tx.toWallet.ownerKey = CryptoJS.SHA256(tx.toWallet.ownerName).toString()
        Transactions.insert(tx)
    },
    transaction() {
        //returns the first transaction in the queue
        return Transactions.find().fetch()[0]
    },
    submitBlock(block) {
        //perform checking

        let txid = block.transactions[1]._id
        VerifiedBlocks.insert(block)
        if (Transactions.remove(txid) === 1) console.log(`tx ${txid} removed from queue`)
        return {
            status: 'ACCEPTED'
        }
    }
})
