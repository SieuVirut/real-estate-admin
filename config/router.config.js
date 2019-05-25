export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['super_admin'],
    routes: [
      // investor
      { path: '/', redirect: '/investor/list' },
      {
        path: '/investor',
        name: 'investor',
        icon: 'team',
        routes: [
          {
            path: '/investor/list',
            name: 'investorList',
            component: './Investor/ListInvestor',
            icon: 'team'
          },
          {
            path: '/investor/create',
            name: 'createInvestor',
            component: './Investor/CreateInvestor',
            icon: 'usergroup-add'
          },
          {
            path: '/investor/detail',
            component: './Investor/DetailInvestor',
            hideInMenu: true
          },
        ],
      },
      // Agency
      {
        path: '/agency',
        name: 'agency',
        icon: 'hdd',
        routes: [
          {
            path: '/agency/list',
            name: 'listAgency',
            component: './Agency/ListAgency',
            icon: 'team'
          },
          {
            path: '/agency/create',
            name: 'createAgency',
            component: './Agency/CreateAgency',
            icon: 'diff'
          },
          {
            path: '/agency/detail',
            component: './Agency/DetailAgency',
            hideInMenu: true
          },
        ],
      },
      // Facility
      {
        path: '/facility',
        name: 'facility',
        icon: 'trophy',
        component: './Facility/ListFacilities'
      },
      {
        path: '/project',
        name: 'projectDetail',
        icon: 'file',
        routes: [
          {
            path: '/project/list-general',
            name: 'listGeneral',
            component: './Project/ListGeneral',
            icon: 'diff',
            hideChidrenInMenu: true,
            routes: [
              {
                path: '/project/list-general',
                component: './Project/ListGeneral/TableGeneral'
              },
            ]
          },
          {
            path: '/project/create-new-project',
            component: './Project/CreateNewProject',
            hideInMenu: true
          },
          {
            path: '/project/detail-and-form-input',
            name: 'projectDetailAndFormInput',
            component: './Project/Detail',
            icon: 'diff',
            routes: [
              {
                path: '/project/detail-and-form-input',
                redirect: '/project/detail-and-form-input/table-general',
              },
              {
                path: '/project/detail-and-form-input/table-general',
                component: './Project/Detail/TableGeneral',
              },
              {
                path: '/project/detail-and-form-input/update-building',
                component: './Project/Detail/TableUpdateInfoBuilding',
              },
              {
                path: '/project/detail-and-form-input/update-floor',
                component: './Project/Detail/TableUpdateFloor',
              },
              {
                path: '/project/detail-and-form-input/update-condo',
                component: './Project/Detail/TableUpdateCondo',
              },
              {
                path: '/project/detail-and-form-input/upload-flat',
                component: './Project/Detail/TableUploadFlat',
              },
            ]
          }, {
            path: '/project/price-and-distribution',
            name: 'priceAndDistribution',
            // component: './Project/Detail',
            component: './404',
            icon: 'diff'
          }, {
            path: '/project/condo-status',
            name: 'condoStatus',
            // component: './Project/Detail',
            component: './404',
            icon: 'diff'
          }, {
            path: '/project/fast-update-price-distribution-status',
            name: 'fastUpdatePriceDistributionStatus',
            // component: './Project/Detail',
            component: './404',
            icon: 'diff'
          }
        ]
      },
      
    ],
  },
];

