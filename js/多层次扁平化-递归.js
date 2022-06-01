/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */

const reslut = [
  '/jobs/auto_create',
  '/jobs/:jobId/info',
  '/jobs/:jobId/setting',
  '/jobs/:jobId/manager',
  '/jobs/:jobId/source',
  '/jobs/:jobId/smart_recruitment',
  '/jobs/:jobId/satisfaction/pandect/:candidateId',
  '/jobs/:jobId/satisfaction/application/:applicationId',
  '/jobs/:jobId/satisfaction/:id',
];

const testCase = [
  {
    path: '/jobs',
    routes: [
      {
        path: '/auto_create',
      },
      {
        path: '/:jobId',
        routes: [
          {
            path: '/info',
          },
          {
            path: '/setting',
          },
          {
            path: '/manager',
          },
          {
            path: '/source',
          },
          {
            path: '/smart_recruitment',
          },
          {
            path: '/satisfaction',
            routes: [
              {
                path: ['/pandect/:candidateId', '/application/:applicationId', '/:id'],
              },
            ],
          },
        ],
      },
    ],
  },
];

const flattenRoutes = (data = []) => {
  function flattenRoute(path, routes, prePath = '') {
    if (routes) {
      return routes.map((route) => flattenPath(route.path, route.routes, prePath + path));
    }
    return prePath + path;
  }

  function flattenPath(path, routes, prePath = '') {
    if (Array.isArray(path)) {
      return path.map((item) => flattenRoute(item, routes, prePath));
    }
    return flattenRoute(path, routes, prePath);
  }

  const arr = data.map(({ path, routes }) => flattenPath(path, routes));

  return arr.flat(10);
};

flattenRoutes(testCase);
