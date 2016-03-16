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
}