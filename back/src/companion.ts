export const companionOptions = {
  providerOptions: {
    instagram: {
      key: '1295400800883059',
      secret: 'cbcac5f24f3d4321a846db043c5a77ed',
    },
  },
  server: {
    host: `localhost:${process.env.PORT || 3002}`,
    protocol: 'http',
    path: '/api/companion',
  },
  filePath: 'tmp/',
  secret: 'pkgenerator',
}
