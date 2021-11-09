import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const levelCheck = (to, from, next) => {
	if (store.state.claims.level === undefined) next('/userProfile')
	next()
}

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home,
			beforeEnter: levelCheck
		},
		{
			path: '/about',
			name: 'About',
			component: () => import('../views/About.vue')
		},
		{
			path: '/sign',
			component: () => import('../components/auth/sign')
		},
		{
			path: '/userProfile',
			component: () => import('../views/userProfile')
		},
		{
			path: '/lectures/axios',
			component: () => import('../views/lectures/axios')
		},
		{
			path: '/lectures/mother',
			component: () => import('../views/lectures/mother')
		},
		{
			path: '/lectures/vuex',
			component: () => import('../views/lectures/vuex')
		}
	]
})

router.beforeEach((to, from, next) => {
	Vue.prototype.$Progress.start()
	if (store.state.firebaseLoaded) next()
})
// router.afterEach((to, from) => {
// 	console.log(to)
// 	console.log(from)
// 	Vue.prototype.$Progress.finish()
// })

export default router
