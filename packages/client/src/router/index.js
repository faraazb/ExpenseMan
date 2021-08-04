import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Expenses from '@/views/Expenses.vue';
import Reports from '@/views/Reports.vue'
import Login from '@/views/Login.vue';
import SignUp from '@/views/SignUp.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/expenses',
    name: 'Expenses',
    component: Expenses,
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  }
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  const publicViews = ['/login', '/signup'];
  const authenticatedViews = !publicViews.includes(to.path);
  const loggedIn = localStorage.getItem('userToken') ? true : false

  if(authenticatedViews && !loggedIn) {
    return(next('/login'))
  }
  next();
})

export default router;
