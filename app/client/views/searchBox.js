Template.searchBox.events({
   'keyup #searchInput': function(event) {
       Router.go('/');
       Session.set("searchQuery", event.target.value);
   }
});