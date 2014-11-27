//Template.addProfile.events({
//    "click #add-person-button": function() {
//        var formValues = {createdAt: new Date()};
//        var inputs = $("#add-person-form").serializeArray();
//
//        _.each(inputs, function (input) {
//            formValues[input.name] = input.value;
//        });
//
//        var picture = $("#picture")[0].files[0];
//        if (picture != undefined) {
//            Pictures.insert(picture, function (err, file) {
//                formValues["pictureId"] = file._id;
//            });
//        }
//        formValues["random"] = Math.random();
//        Persons.insert(formValues);
//        return false;
//    }
//});

AutoForm.hooks({
    addProfileForm: {
        formToDoc: function(doc) {
            doc.random = [Math.random(), 0];
            return doc;
        }
    }
});