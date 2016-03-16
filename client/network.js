Template.network.onCreated(function() {
    const template = this

    let data = {
        nodes: [],
        edges: []
    }

    template.network = null

    //faking some data for testing
    for (let i=1; i<=6; i++) {
        data.nodes.push({
            id: i,
            //title: 'Tx #1212',
            label: 'Tx #1235' + String(i) +'\nWaituck -25-> Clarence\nTKC -25-> Clarence'
        })
    }
    data.edges.push({from: 1, to: 2})
    data.edges.push({from: 1, to: 3})
    data.edges.push({from: 1, to: 4})
    data.edges.push({from: 2, to: 5})
    data.edges.push({from: 5, to: 6})

    Session.set('networkData', data)


})

Template.network.onRendered(function() {
    const template = this
    Tracker.autorun(function () {
        let data = Session.get('networkData')
        let container = template.$('#network-container')[0]
        let options = {
            layout: {
                hierarchical: {
                    direction: 'LR',
                    levelSeparation: 300
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
                },
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
    })

})

Template.network.helpers({

})

Template.network.events({

})

Template.network.onDestroyed(function() {

})

let NetworkUtil = {
    update() {

    }
}