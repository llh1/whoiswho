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
   this.render('AddProfile');
});

Router.route('/nameReminder', function() {
   this.render('NameReminder');
});

Router.route('/faceReminder', function() {
   this.render('FaceReminder');
});