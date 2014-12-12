Meteor.methods({
   updatePerson: function(personId, firstName, lastName, company, role) {
       var person = Persons.findOne({_id: personId});
       if(person.createdById != Meteor.userId()) {
           throw new Meteor.Error("No permission to update this person.");
       }

       Persons.update(personId, {$set: {
           firstName: firstName,
           lastName: lastName,
           company: company,
           role: role
       }});
   },
    deletePerson: function(personId, pictureId, photographId) {
        var person = Persons.findOne({_id: personId});
        if(person.createdById != Meteor.userId()) {
            throw new Meteor.Error("No permission to delete this person.");
        }

        Persons.remove(personId);
        Pictures.remove(pictureId);
        Pictures.remove(photographId);
    }
});

Meteor.publish("personDirectory", function() {
    return Persons.find({});
});

Persons.allow({
    insert: function(userId, person) {
        return Meteor.userId() != undefined;
    },
    update: function(userId, person) {
        return false;
    },
    remove: function(userId, person) {
        return false;
    }
});