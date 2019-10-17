const tus = require('tus-node-server');

const server = new tus.Server();
server.datastore = new tus.FileStore({
    path: '/files'
});
server.on(tus.EVENTS.EVENT_UPLOAD_COMPLETE, (event) => {
    console.log(`Upload complete for file ${event.file.id}`);
});
server.on(tus.EVENTS.EVENT_ENDPOINT_CREATED, (event) => {
    console.log('New endpoint', event);
});
const host = 'localhost';
const port = 8000;
server.listen({ host, port }, () => {
    console.log(`[${new Date().toLocaleTimeString()}] tus server listening at http://${host}:${port}`);
});