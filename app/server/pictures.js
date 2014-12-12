Pictures.allow({
    insert: function(userId, doc) {
        return true;
    },
    update: function(userId, doc, fieldNames, modifier) {
        return true;
    },
    remove: function(userId, doc) {
        return false;
    },
    download: function(userId, fileObj) {
        return true;
    }
});

Meteor.publish("pictures", function() {
    return Pictures.find();
});