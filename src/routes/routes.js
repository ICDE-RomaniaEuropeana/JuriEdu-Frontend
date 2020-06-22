import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
const Home = () => import(/* webpackChunkName: "pages" */ '@/views/Pages/Home.vue');
const Dictionary = () => import(/* webpackChunkName: "pages" */ '@/views/Pages/Dictionary.vue');
const Test = () => import(/* webpackChunkName: "pages" */ '@/views/Pages/Test.vue');

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
        name: 'Caută',
        component: Home,
      },
      {
        path: '/dictionar',
        name: 'Dicționar',
        component: Dictionary,
      },
      {
        path: '/teste/:id',
        name: 'Test',
        component: Test,
      },
    ],
  },
  { path: '*', component: NotFound }
];

export default routes;
