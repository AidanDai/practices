'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1511254232461_2158';

  // add your config here
  config.middleware = [
    'robot',
    'gzip',
  ];

  config.robot = {
    ua: [
      /Baiduspider/i,
    ],
  };

  config.gzip = {
    threshold: 1024, // 小于 1k 的响应体不压缩
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  config.news = {
    pageSize: 100,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  };

  return config;
};
