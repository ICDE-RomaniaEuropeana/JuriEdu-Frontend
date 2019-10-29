import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
const Dashboard = () => import(/* webpackChunkName: "pages" */ '@/views/Dashboard/Dashboard.vue');

// GeneralViews
import NotFound from '@/views/GeneralViews/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'Home',
        component: Dashboard,
      },
    ],
  },
  { path: '*', component: NotFound }
];

export default routes;
