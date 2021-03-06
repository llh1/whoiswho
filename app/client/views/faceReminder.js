Template.faceReminder.helpers({
    pictures: function () {
        Session.get("reload");
        Session.set("reload", null);
        var persons = Persons.find({random: {$near: [Math.random(), 0]}}, {limit: 4});
        var shuffledPersons = _.shuffle(persons.fetch().map(function(person) {
            return person;
        }));
        Session.set("personToFind", shuffledPersons[0]);

        var pictureIds = _.map(shuffledPersons, function(person) {
            if(person.pictureId) return person.pictureId;
            if(person.photographId) return person.photographId;
        });
        return Pictures.find({_id: {$in: pictureIds}});
    },
    person: function() {
        return Session.get("personToFind");
    },
    answered: function() {
        return Session.get("answered") != undefined;
    }
});

Template.pictureChoice.events({
    "click .picture": function (event) {
        var picture = $(event.target);
        var personToFind = Session.get("personToFind");

        picture.addClass("answer");
        if (picture.data('picture-id') === personToFind.pictureId || picture.data('picture-id') === personToFind.photographId) {
            picture.addClass("btn-success");
            if(Meteor.userId()) {
                var myNewScore = Session.get("myScore") + 1;
                Session.set("myScore", myNewScore);
                Meteor.call("increaseScore");
            }
        } else {
            picture.addClass("btn-danger");
        }

        Session.set("answered", true);
        $(".picture").not(".answer").addClass('disabled-picture').removeClass('picture');
        event.preventDefault();
    }
});

Template.faceReminder.events({
    "click .next": function() {
        var chosenButton = $(".answer");
        chosenButton.removeClass("answer");
        chosenButton.removeClass("btn-success");
        chosenButton.removeClass("btn-danger");
        $("#face-reminder img").addClass("picture").removeClass("disabled-picture");
        Session.set("answered", null);
        Session.set("reload", true);
    }
});
