Meteor.subscribe("personDirectory");
Meteor.subscribe("pictures");
Meteor.subscribe("currentUser");
Meteor.subscribe("userDirectory");

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});