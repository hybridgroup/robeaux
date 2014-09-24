var karmaConfig = require('./karma.conf');

module.exports = function(config) {
  var conf = karmaConfig(config);

  conf.files = conf.files.concat([

    //test files
    'test/services/*.js',

    {pattern: 'test/support/widgets.json', watched: true, served: true, included: false},
    {pattern: 'test/support/themes.json', watched: true, served: true, included: false}
    
  ]);

  config.set(conf);
};