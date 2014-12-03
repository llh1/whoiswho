Template.nameReminder.helpers({
    names: function () {
        Session.get("reload");
        Session.set("reload", null);
        var persons = Persons.find({random: {$near: [Math.random(), 0]}}, {limit: 4});
        var shuffledPersons = _.shuffle(persons.fetch().map(function(person) {
           return person;
        }));
        Session.set("personToFind", shuffledPersons[0]);
        return persons;
    },
    picture: function() {
        var personToFind = Session.get("personToFind");
        if(personToFind) {
            return Pictures.find({_id: personToFind.pictureId || personToFind.photographId}).fetch()[0];
        }
    },
    answered: function() {
        return Session.get("answered") != undefined;
    }
});

Template.nameReminder.events({
    "click .name-button": function(event) {
        var button = $(event.target);
        var chosenFullName = button.text();
        var personToFind = Session.get("personToFind");
        var fullNameToFind = personToFind.firstName + " " + personToFind.lastName;

        button.addClass("answer");
        if(chosenFullName === fullNameToFind) {
            button.addClass("btn-success");
            var myScore = Session.get("myScore") || 0;
            Session.set("myScore", myScore + 1);
        } else {
            button.addClass("btn-danger");
        }

        Session.set("answered", true);
        $(".name-button").not(".answer").attr("disabled", true);
        event.preventDefault();
    },
    "click .next": function() {
        var chosenButton = $(".answer");
        chosenButton.removeClass("answer");
        chosenButton.removeClass("btn-success");
        chosenButton.removeClass("btn-danger");
        $(".name-button").attr("disabled", false);
        Session.set("answered", null);
        Session.set("reload", true);
    }
});
