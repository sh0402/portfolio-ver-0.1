import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

// const levelCheck = (to, from, next) => {
// 	// todo: business logic.. 다음에 수정
// 	if (!store.state.user) return next('/sign')
// 	if (!store.state.claims) return next('/userProfile')
// 	next()
// 	// if (store.state.claims.level === undefined) next('/userProfile')
// 	// next()
// }

const adminCheck = (to, from, next) => {
	if (!store.state.user) {
		if (to.path !== '/sign') return next('/sign')
	} else {
		if (!store.state.user.emailVerified) return next('/userProfile')
		if (store.state.claims.level > 0) throw Error('관리자 권한입니다.')
	}
	next()
}
const userCheck = (to, from, next) => {
	if (!store.state.user) {
		if (to.path !== '/sign') return next('/sign')
	} else {
		if (!store.state.user.emailVerified) return next('/userProfile')
		if (store.state.claims.level > 1) throw Error('사용자 권한입니다.')
	}
	next()
}
const guestCheck = (to, from, next) => {
	if (!store.state.user) {
		if (to.path !== '/sign') return next('/sign')
	} else {
		if (!store.state.user.emailVerified) return next('/userProfile')
		if (store.state.claims.level > 2) throw Error('게스트 권한입니다.')
	}
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
			beforeEnter: guestCheck
		},
		{
			path: '/sign',
			component: () => import('../components/auth/sign'),
			beforeEnter: (to, from, next) => {
				if (store.state.user) return next('/')
				next()
			}
		},
		{
			path: '/admin/users',
			component: () => import('../views/admin/users'),
			beforeEnter: guestCheck //adminCheck
		},
		{
			path: '/test/lv0',
			component: () => import('../views/test/lv0'),
			beforeEnter: adminCheck
		},
		{
			path: '/test/lv1',
			component: () => import('../views/test/lv1'),
			beforeEnter: userCheck
		},
		{
			path: '/test/lv2',
			component: () => import('../views/test/lv2'),
			beforeEnter: guestCheck
		},
		{
			path: '/userProfile',
			component: () => import('../views/userProfile'),
			beforeEnter: (to, from, next) => {
				if (!store.state.user) return next('/sign')
				next()
			}
		},
		{
			path: '/about',
			name: 'About',
			component: () => import('../views/About.vue')
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
		},
		{
			path: '*',
			component: () => import('../views/e404')
		}
	]
})

const waitFirebase = () => {
	return new Promise((resolve, reject) => {
		let cnt = 0
		const tmr = setInterval(() => {
			if (store.state.firebaseLoaded) {
				clearInterval(tmr)
				resolve()
			} else if (cnt++ > 200) {
				clearInterval(tmr)
				reject(Error('제한 시간 초과, 인터넷 연결을 확인하세요'))
			}
		}, 10)
	})
}

router.beforeEach((to, from, next) => {
	Vue.prototype.$Progress.start()
	// if (store.state.firebaseLoaded) next()
	waitFirebase()
		.then(() => next())
		.catch(e => Vue.prototype.$toasted.global.error(e.message))
})
// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
	Vue.prototype.$Progress.finish()
})
router.onError(e => {
	Vue.prototype.$Progress.finish()
	Vue.prototype.$toasted.global.error(e.message)
})

export default router
