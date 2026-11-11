/* 反馈通道配置：只改这里，不用动应用代码。
 *
 * CHANNEL:
 *   local  —— 默认。反馈存在测试者本机，点「导出反馈文件」把 json 发回给作者。零依赖、零账号。
 *   link   —— 提交时额外打开一个预填链接。target 里可用 {title} {body} 两个占位符。
 *   mailto —— 提交时打开邮件客户端，target 填收件邮箱（需同时改 index.html 里的分支）。
 *   api    —— 预留。以后有服务端时在这里填 POST 地址，应用代码里补一个 fetch 即可。
 *
 * GitHub Pages 专用：下面的 target 会根据当前网址自动算出本仓库的 Issues 预填地址，
 * 不管是「用户名.github.io」还是「用户名.github.io/仓库名」都对，不用手填用户名和仓库名。
 * 想让反馈直接变成一条 Issue，把 CHANNEL 改成 'link' 即可；
 * 前提：测试者要有 GitHub 账号并登录，否则仍可用「导出反馈文件」这条零门槛路径。
 *
 * 注意：静态托管下不要在这里填任何密钥或私有 webhook，前端文件任何人都能看到。
 */
(function(){
  var CHANNEL = 'local';
  var host = window.location.hostname || '';
  var seg = (window.location.pathname || '/').split('/').filter(Boolean);
  var issuesTarget = '';
  if(/\.github\.io$/.test(host)){
    var user = host.split('.')[0];
    var repo = seg[0] || (user + '.github.io');
    issuesTarget = 'https://github.com/' + user + '/' + repo +
                   '/issues/new?title={title}&body={body}';
  }
  window.QUIZ_FEEDBACK_CONFIG = {
    channel: CHANNEL,
    target: issuesTarget,
    appVersion: '2',
    contactHint: CHANNEL === 'link'
      ? '提交会打开 GitHub 填工单；没有 GitHub 账号也可点「导出反馈文件」发给我'
      : '导出反馈文件后发给作者即可'
  };
})();
