UI.registerHelper('fullNameOf', function(person) {
    if(person) {
        return person.lastName + ", " + person.firstName;
    }
});