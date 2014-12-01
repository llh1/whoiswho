Template.faceReminder.helpers({
    pictures: function () {
        Session.get("reload");
        Session.set("reload", null);
        var persons = Persons.find({random: {$near: [Math.random(), 0]}}, {limit: 4});
        var shuffledPersons = _.shuffle(persons.fetch().map(function(person) {
            return person;
        }));
        Session.set("personToFind", shuffledPersons[0]);

        var pictureIds = _.pluck(shuffledPersons, "pictureId");
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
        if (picture.data('picture-id') === personToFind.pictureId) {
            picture.addClass("btn-success");
            var myScore = Session.get("myScore") || 0;
            Session.set("myScore", myScore + 1);
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
