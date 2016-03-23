Meteor.methods({
    fakeTransaction() {
        let tx = {
            fromWallet: {},
            toWallet: {},
            amount: Random.choice([5, 10, 15, 20, 25, 30, 35, 40, 45, 50]),
            date: new Date(),
            difficulty: Difficulty.find().fetch()[0].difficulty
        }
        tx.fromWallet.ownerName = faker.name.firstName()
        tx.fromWallet.ownerKey = CryptoJS.SHA256(tx.fromWallet.ownerName).toString()
        tx.toWallet.ownerName = faker.name.firstName()
        tx.toWallet.ownerKey = CryptoJS.SHA256(tx.toWallet.ownerName).toString()
        Transactions.insert(tx)
    },
    reset() {
        Transactions.remove({})
        Wallets.remove({})
        VerifiedBlocks.remove({})
        Difficulty.remove({})

        Difficulty.insert({difficulty: 20})

        let wallets = ['Clarence', 'Waituck', 'Jesper', 'Shraddha', 'Moriarty', 'ProfessorR']
        _.each(wallets, function (name) {
            Wallets.insert({
                ownerName: name,
                ownerKey: CryptoJS.SHA256(name).toString(),
                online: true,
                amount: name === 'Moriarty' ? 1000 : 0
            })
        })

        VerifiedBlocks.insert({
            transactions: [
                {
                    toWallet: {
                        ownerName: 'Moriarty',
                        ownerKey: CryptoJS.SHA256('Moriarty').toString()
                    },
                    amount: 500
                },
                {
                    toWallet: {
                        ownerName: 'Moriarty',
                        ownerKey: CryptoJS.SHA256('Moriarty').toString()
                    },
                    amount: 500
                }
            ],
            nonce: 0,
            date: new Date(),
            outputHash: '00000000000000000'
        })
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
        Wallets.update({ownerKey: wallet.ownerKey}, {$set: {online: true, evil: false}})
    },
    goOffline(wallet) {
        Wallets.update({ownerKey: wallet.ownerKey}, {$set: {online: false, mining: false}})
    },
    goEvil(wallet) {
        Wallets.update({ownerKey: wallet.ownerKey}, {$set: {evil: true}})
    },
    stopEvil(wallet) {
        Wallets.update({ownerKey: wallet.ownerKey}, {$set: {evil: false}})
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
            return {
                status: 'ACCEPTED'
            }
        }
        

        
    },
    blocks() {
        return VerifiedBlocks.find({}, {sort: {date: 1}}).fetch()
    },
    submitParsedAmounts(wallets) {
        let update = {}
        let curWallets = Wallets.find().fetch()
        _.each(curWallets, function (wallet) {
            update[wallet.ownerName] = 0
        })
        _.each(wallets, function (value, key) {
            update[key] = value
        })
        _.each(update, function (value, key) {
            Wallets.update({ownerName: key}, {$set: {amount: value}})
        })
    }
})
