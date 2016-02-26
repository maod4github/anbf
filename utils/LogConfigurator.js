function LogConfigurator() {}

LogConfigurator.config = function (app) {
  var path = require('path');
  var log4js = require ('log4js');
  log4js.configure({
    appenders: [{
      type: 'file',
      filename: path.join(__dirname, '../logs/debug.log'),
      maxLogSize: (1024 * 1024 * 1), // 单位: Byte
      backups: 10,
      category: 'debug'
    }, {
      type: 'file',
      filename: path.join(__dirname, '../logs/sys.log'),
      maxLogSize: (1024 * 1024 * 1), // 单位: Byte
      backups: 10,
      category: 'sys'
    }, {
      type: 'file',
      filename: path.join(__dirname, '../logs/http.log'),
      maxLogSize: (1024 * 1024 * 1), // 单位: Byte
      backups: 10,
      category: 'http'
    }, {
      type: 'file',
      filename: path.join(__dirname, '../logs/db.log'),
      maxLogSize: (1024 * 1024 * 1), // 单位: Byte
      backups: 10,
      category: 'db'
    }],
    replaceConsole: false
  });
  app.use(log4js.connectLogger(log4js.getLogger('http'), {
    level: 'auto',
    format: ':remote-addr - :status - :method - :url - :response-time ms\nReferrer : ":referrer"\nBrowser : ":user-agent"\n'
  }));
};

module.exports = LogConfigurator;
