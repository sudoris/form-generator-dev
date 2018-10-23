import Vue from 'vue';
import Router from 'vue-router';
import PersonalInfo from './components/note_components/PersonalInfo';
import PersonalHistory from './components/note_components/PersonalHistory';
import ReviewOfTheSystem from './components/note_components/ReviewOfTheSystem';


Vue.use(Router);

export default new Router({
	routes: [
		{
			path: "/",
			name: "personalInfo",
			component: PersonalInfo
		},
		{
			path: "/history-pt",
			name: "personalHistory",
			component: PersonalHistory
		},
		{
			path: "/review",
			name: "reviewOfTheSystem",
			component: ReviewOfTheSystem
		},
		{
			path: "/history",
			redirect: { name: "personalHistory"}
		}
	]
})