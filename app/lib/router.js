Router.configure({
    layoutTemplate: 'applicationLayout'
});

Router.route('/', function() {
    this.render('List');
});

Router.route('/list', function() {
    this.render('List');
});

Router.route('/add', function() {
    if(!Meteor.userId()) {
        this.render('List');
    } else {
        this.render('AddProfile');
    }
});

Router.route('/nameReminder', function() {
   this.render('NameReminder');
});

Router.route('/faceReminder', function() {
   this.render('FaceReminder');
});

Router.route('/top10', function() {
    this.render('Top10');
});