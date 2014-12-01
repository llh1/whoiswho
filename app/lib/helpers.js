UI.registerHelper('fullNameOf', function(person) {
    if(person) {
        return person.lastName + ", " + person.firstName;
    }
});

UI.registerHelper('activeIfTemplateIs', function(templateName) {
    var currentRoute = Router.current();
    return currentRoute && templateName === currentRoute.lookupTemplate() ? 'active' : '';
});