Template.top10.helpers({
    personInTop10: function() {
        var top10 = Meteor.users.find({}, {sort: {score: -1}, limit: 10}).fetch();
        var position = 1;
        _.each(top10, function(user) {
            user.position = position;
            if(position <= 3) {
                user.class = "top" + position;
            }
            position += 1;
        });
        return top10;
    }
});

Template.top10row.helpers({
    isFirst: function() {
        return this.position === 1;
    }
});