// このファイルは古いService Workerを解除するためのダミーファイル
// ブラウザのDevTools → Application → Service Workers で Unregister した後は削除可能

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  self.clients.matchAll({ type: 'window' }).then((clients) => {
    clients.forEach((client) => client.navigate(client.url));
  });
  // 自身を登録解除
  self.registration.unregister();
});
