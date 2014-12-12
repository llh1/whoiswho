Accounts.onCreateUser(function (options, user) {
    user.score = 0;
    return user;
});

Meteor.publish("currentUser", function () {
    if (this.userId) {
        return Meteor.users.find({_id: this.userId},
            {fields: {'score': 1}});
    } else {
        this.ready();
    }
});

Meteor.publish("userDirectory", function() {
    return Meteor.users.find({});
});

Meteor.methods({
   increaseScore: function() {
       Meteor.users.update(Meteor.userId(), {$inc: {score: 1}});
   }
});