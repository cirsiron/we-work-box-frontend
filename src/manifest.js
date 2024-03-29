
module.exports = {
  name: '工作台',
  version: '0.1.0',
  description: '为开发者打造更顺手的工作流',
  author: 'huanghui',
  manifest_version: 2,
  icons: {
    '16': 'icons/16.png',
    '128': 'icons/16.png'
  },
  permissions: [
    'bookmarks',
    'tabs',
    'storage',
    'http://*/',
    'https://*/'
  ],
  'content_security_policy': "script-src 'self' 'unsafe-eval'; object-src 'self'",
  'web_accessible_resources': ['*'],
  browser_action: {
    default_title: '工作台'
  },
  // 覆盖浏览器默认页面
  chrome_url_overrides: {
    newtab: 'pages/app.html'
  },
  offline_enabled: true
}
