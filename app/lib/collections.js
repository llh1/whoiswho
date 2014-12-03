Persons = new Mongo.Collection("persons");
Persons.attachSchema(new SimpleSchema({
    firstName: {
        type: String,
        label: "First Name",
        max: 200
    },
    lastName: {
        type: String,
        label: "Last Name",
        max: 200
    },
    company: {
        type: String,
        label: "Company",
        optional: true,
        max: 200
    },
    role: {
        type: String,
        label: "Role",
        optional: true,
        max: 100
    },
    photographId: {
        type: String,
        optional: true
    },
    pictureId: {
        label: "Upload...",
        type: String,
        optional: true
    },
    random: {
        type: [Number, Number],
        decimal: true
    }
}));

Pictures = new FS.Collection("pictures", {
    stores: [new FS.Store.FileSystem("pictures", {
        path: "~/Development/meteor/who-is-who/uploads",
        beforeWrite: function(file) {
            return {
                name: "photograph.jpg"
            }
        }
    })]
});