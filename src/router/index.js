import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home
			// beforeEnter: (to, from, next) => {
			// 	console.log('bf enter')
			// 	next()
			// }
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

// router.beforeEach((to, from, next) => {
// 	Vue.prototype.$Progress.start()
// 	setTimeout(() => {
// 		if (Vue.prototype.$isFirebaseAuth) next()
// 	}, 2000)
// })
// router.afterEach((to, from) => {
// 	console.log(to)
// 	console.log(from)
// 	Vue.prototype.$Progress.finish()
// })

export default router
