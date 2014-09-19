var karmaConfig = require('./karma.conf');

module.exports = function(config) {
  var conf = karmaConfig(config);

  conf.files = conf.files.concat([

    //test files
    'test/functions/*.js'
    
  ]);

  config.set(conf);
};