Template.addProfile.helpers({
    newProfilePicture: function() {
        return Session.get(NEW_PHOTOGRAPH);
    }
});

Template.addProfile.events({
    "click .take-new-picture-button": function(event) {
        MeteorCamera.getPicture({width: 300, height: 300, quality: 80}, function(error, data) {
            Session.set(NEW_PHOTOGRAPH, data);
        });
        event.preventDefault();
    },
    "click #delete-photograph": function(event) {
        Session.set(NEW_PHOTOGRAPH, null);
        event.preventDefault();
    }
});

AutoForm.hooks({
    addProfileForm: {
        formToDoc: function(doc) {
            doc.random = [Math.random(), 0];
            return doc;
        },
        before: {
            insert: function(doc, template) {
                var pictureFromCamera = Session.get(NEW_PHOTOGRAPH);
                if(pictureFromCamera) {
                    var file = Pictures.insert(pictureFromCamera);
                    doc.photographId = file._id;
                }
                return doc;
            }
        },
        onSuccess: function(operation, result, template) {
            Session.set(NEW_PHOTOGRAPH, null);
            FlashMessages.sendSuccess("New profile successfully added!");
        }
    }
});