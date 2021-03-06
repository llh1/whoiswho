Template.list.helpers({
  persons: function() {
    var query = Session.get("searchQuery");
    if(query != undefined && query.length > 1) {
      return Persons.find({$or: [
        {firstName: new RegExp(query, "i")},
        {lastName: new RegExp(query, "i")},
        {company: new RegExp(query, "i")},
        {role: new RegExp(query, "i")}
      ]});
    } else {
      return Persons.find({});
    }
  }
});

Template.person.helpers({
  editing: function() {
    return Session.get("updatePerson" + this._id);
  },
  displayPicture: function() {
    return Pictures.find({$or: [{_id: this.pictureId}, {_id: this.photographId}]}).fetch()[0];
  },
  fullname: function() {
    var fullname = this.lastName + " " + this.firstName;
    return fullname.substr(0, 17);
  },
  profileInfo: function() {
    var id = this._id;
    Meteor.defer(function() {
      $("#profile-info-" + id).tooltip("fixTitle");
    });

    if(this.role && this.company) {
      return "Work as " + this.role + " at " + this.company;
    } else if(this.role) {
      return this.role;
    } else if(this.company) {
      return "Work at " + this.company;
    } else {
      return "No data"
    }
  },
  canEdit: function() {
    return this.createdById === Meteor.userId();
  }
});

Template.person.events({
  "click .update-person-button": function() {
    Session.set("updatePerson" + this._id, true);
    Tracker.flush();
  },
  "click .delete-person-button": function() {
    Meteor.call("deletePerson", this._id, this.pictureId, this.photographId);
  },
  "click .cancel-update-person-button": function(event) {
    Session.set("updatePerson" + this._id, false);
    event.preventDefault();
  },
  "click .save-update-person-button": function(event, template) {
    Session.set("updatePerson" + this._id, false);
    var firstName = template.$('[name=firstName]').val(),
        lastName = template.$('[name=lastName]').val(),
        company = template.$('[name=company]').val(),
        role = template.$('[name=role]').val();
    Meteor.call("updatePerson", this._id, firstName, lastName, company, role);
    event.preventDefault();
  }
});

Template.person.rendered = function() {
  $(".show-profile-button").tooltip();
};
