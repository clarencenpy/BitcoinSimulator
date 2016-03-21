Meteor.methods({
    fakeTransaction() {
        let tx = {
            fromWallet: {},
            toWallet: {},
            amount: Random.choice([5, 10, 15, 20, 25, 30, 35, 40, 45, 50]),
            date: new Date()
        }
        tx.fromWallet.ownerName = faker.name.firstName()
        tx.fromWallet.ownerKey = CryptoJS.SHA256(tx.fromWallet.ownerName).toString()
        tx.toWallet.ownerName = faker.name.firstName()
        tx.toWallet.ownerKey = CryptoJS.SHA256(tx.toWallet.ownerName).toString()
        Transactions.insert(tx)
    },



    //API METHODS//

    addWallet(wallet) {
        let matchingWallet = Wallets.findOne({ownerName: wallet.ownerName})
        if (!matchingWallet) {
            wallet.online = true
            wallet.amount = 0
            Wallets.insert(wallet)
        }
        return {
            status: 'ACCEPTED'
        }
    },
    goOnline(wallet) {
        Wallets.update({ownerKey: wallet.ownerKey}, {$set: {online: true}})
    },
    goOffline(wallet) {
        Wallets.update({ownerKey: wallet.ownerKey}, {$set: {online: false, mining: false}})
    },
    startMining(wallet) {
        Wallets.update({ownerKey: wallet.ownerKey}, {$set: {mining: true}})
    },
    stopMining(wallet) {
        Wallets.update({ownerKey: wallet.ownerKey}, {$set: {mining: false}})
    },
    transaction() {
        //returns the first transaction in the queue
        return Transactions.find({confirmed: {$in: [false, undefined]}}).fetch()[0]
    },
    submitBlock(block) {
        //perform checking

        let txid = block.transactions[1]._id
        let rewardee = block.transactions[0].toWallet.ownerKey
        let tx = Transactions.findOne(txid)
        if (tx && tx.confirmed) {
            //transaction has already been added
            return {
                status: 'ALREADY_ADDED'
            }
        } else {
            block.date = new Date()
            VerifiedBlocks.insert(block)
            Transactions.update(txid, {$set: {confirmed: true}})
            Wallets.update({ownerKey: rewardee}, {$inc: {amount: block.transactions[0].amount}})
            return {
                status: 'ACCEPTED'
            }
        }
        

        
    },
    blocks() {
        return VerifiedBlocks.find({}, {}, {sort: {date: 1}}).fetch()
    },
    submitBlockchain(blockchain) {
        //find a matching blockchain, and increment count
        let matchingBlock = Blockchains.findOne({blocks: blockchain})
        if (matchingBlock) {
            Blockchains.update(matchingBlock._id, {$inc: {count: 1}})
        } else {
            //not found, add it
            Blockchains.insert({blocks: blockchain, count: 1})
        }
        return {
            status: 'ACCEPTED'
        }
    }
})
