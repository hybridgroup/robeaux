var karmaConfig = require('./karma.conf');

module.exports = function(config) {
  var conf = karmaConfig(config);

  conf.files = conf.files.concat([

    //test files
    'test/controllers/*.js',
    'test/directives/*.js',
    'test/services/*.js',
    'test/widgets/*.js',
    'test/functions/*.js',

    {pattern: 'test/support/robots.json', watched: true, served: true, included: false},
    {pattern: 'test/support/myRobot.json', watched: true, served: true, included: false},
    {pattern: 'test/support/myDevice.json', watched: true, served: true, included: false},
    {pattern: 'test/support/widgets.json', watched: true, served: true, included: false},
    {pattern: 'test/support/themes.json', watched: true, served: true, included: false}
  ]);

  config.set(conf);
};