import {Component, OnInit}     from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

@Component({
    selector: 'privacy-page',
	templateUrl:'/views/privacyPage.html'
})

export class PrivacyComponent {
	constructor(
		private _router: Router,
		routeParams: RouteParams
	) {
       
	}
}

