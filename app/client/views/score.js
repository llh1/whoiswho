Template.score.helpers({
   "myScore": function() {
       var myScore = Meteor.user().score;
       Session.set("myScore", myScore);
       return Meteor.userId() ? myScore : 0;
   }
});