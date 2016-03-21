Template.network.onCreated(function() {
    const template = this
})

Template.network.onRendered(function() {
    const template = this

    //initialise network
    let data = {nodes: [], edges: []}
    let container = template.$('#network-container')[0]
    let options = {
        layout: {
            hierarchical: {
                direction: 'LR',
                levelSeparation: 250,
                sortMethod: 'directed'
            }
        },
        edges: {
            arrowStrikethrough: false,
            smooth: {
                type: 'continuous'
            },
            arrows: {from: true},
            width: 2

        },
        nodes: {
            shape: 'ellipse',
            font: {
                face: 'Share Tech Mono'
            }
        },
        interaction: {
            hover: true,
            tooltipDelay: 100
        },
        physics: {
            //maxVelocity: 10
        }
    }

    template.network = new vis.Network(container, data, options)
    Tracker.autorun(function () {
        //run whenever VerifiedBlocks is updated
        let blocks = VerifiedBlocks.find({}, {}, {sort: {date: -1}}).fetch()
        let newData = buildBlockchain(blocks)
        let currentNodes = template.network.body.data.nodes.get()
        let currentEdges = template.network.body.data.edges.get()

        //diffing
        newData.nodes = _.filter(newData.nodes, function(node) {
            return !_.findWhere(currentNodes, node)
        })
        newData.edges = _.filter(newData.edges, function(edge) {
            return !_.findWhere(currentEdges, edge)
        })

        //patch the differences
        template.network.body.data.nodes.add(newData.nodes)
        template.network.body.data.edges.add(newData.edges)
    })

})

Template.network.helpers({

})

Template.network.events({

})

Template.network.onDestroyed(function() {

})



function transactionToString(transaction) {
    return (transaction.fromWallet ? transaction.fromWallet.ownerName : 'ø') + ' -' + transaction.amount + '-> ' + transaction.toWallet.ownerName
}
function buildBlockchain(blocks) {
    //transform blockchain into data structure for vis
    let data = {
        nodes: [],
        edges: []
    }

    _.each(blocks, function (block) {

        data.nodes.push({
            id: block.outputHash,
            label: transactionToString(block.transactions[0]) + '\n'
                + transactionToString(block.transactions[1]) + '\n'
                + block.outputHash.substr(0, 10)
        })
        data.edges.push({
            from: block.previousHash,
            to: block.outputHash
        })
    })
    return data
}

