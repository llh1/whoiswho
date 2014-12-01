Template.score.helpers({
   "myScore": function() {
       return Session.get("myScore") || 0;
   }
});