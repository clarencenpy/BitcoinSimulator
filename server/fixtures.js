if (Wallets.find().count() === 0) {
    Wallets.insert({
        ownerName: 'Clarence',
        ownerKey: CryptoJS.SHA256('Clarence').toString(),
        online: true
    })
}

if (VerifiedBlocks.find().count() === 0) {
    VerifiedBlocks.insert({
        transactions: [
            {
                toWallet: {
                    ownerName: 'Clarence',
                    ownerKey: CryptoJS.SHA256('Clarence').toString()
                },
                amount: 50
            },
            {
                toWallet: {
                    ownerName: 'Clarence',
                    ownerKey: CryptoJS.SHA256('Clarence').toString()
                },
                amount: 50
            }
        ],
        nonce: 0,
        date: new Date(),
        outputHash: '00000000000000000'
    })

    VerifiedBlocks.insert({
        transactions: [
            {
                toWallet: {
                    ownerName: 'Clarence',
                    ownerKey: CryptoJS.SHA256('Clarence').toString()
                },
                amount: 50
            },
            {
                fromWallet: {
                    ownerName: 'Bob',
                    ownerKey: CryptoJS.SHA256('Bob').toString()
                },
                toWallet: {
                    ownerName: 'Clarence',
                    ownerKey: CryptoJS.SHA256('Clarence').toString()
                },
                amount: 10
            }
        ],
        nonce: 0,
        date: new Date(),
        previousHash: '00000000000000000',
        outputHash: '00000000000000001'
    })


    VerifiedBlocks.insert({
        transactions: [
            {
                toWallet: {
                    ownerName: 'Clarence',
                    ownerKey: CryptoJS.SHA256('Clarence').toString()
                },
                amount: 50
            },
            {
                fromWallet: {
                    ownerName: 'Charlie',
                    ownerKey: CryptoJS.SHA256('Bob').toString()
                },
                toWallet: {
                    ownerName: 'Clarence',
                    ownerKey: CryptoJS.SHA256('Clarence').toString()
                },
                amount: 10
            }
        ],
        nonce: 0,
        date: new Date(),
        previousHash: '00000000000000001',
        outputHash: '00000000000000002'
    })

    VerifiedBlocks.insert({
        transactions: [
            {
                toWallet: {
                    ownerName: 'Clarence',
                    ownerKey: CryptoJS.SHA256('Clarence').toString()
                },
                amount: 50
            },
            {
                fromWallet: {
                    ownerName: 'Megs',
                    ownerKey: CryptoJS.SHA256('Bob').toString()
                },
                toWallet: {
                    ownerName: 'Clarence',
                    ownerKey: CryptoJS.SHA256('Clarence').toString()
                },
                amount: 10
            }
        ],
        nonce: 0,
        date: new Date(),
        previousHash: '00000000000000002',
        outputHash: '00000000000000003'
    })

}