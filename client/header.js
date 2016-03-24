Template.header.onCreated(function() {

})

Template.header.onRendered(function() {

})

Template.header.helpers({
    difficulty() {
        return Difficulty.find().fetch()[0].difficulty
    }
})

Template.header.events({
    'click .add-difficulty-btn'() {
        Difficulty.update(Difficulty.find().fetch()[0]._id, {$inc: {difficulty: 1}})
    },
    'click .lower-difficulty-btn'() {
        Difficulty.update(Difficulty.find().fetch()[0]._id, {$inc: {difficulty: -1}})
    }
})

Template.header.onDestroyed(function() {

})

