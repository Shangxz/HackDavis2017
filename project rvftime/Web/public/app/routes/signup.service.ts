import {Injectable} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Http, Headers} from 'angular2/http';
import {AppComponent} from '../app.component';

@Injectable()
export class localSignUpService {
	constructor(
		private http:Http,
		private _router: Router
	) {
		this.http = http;
	}

	signUpLocal(signUpCredential) { 
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		this.http.post('/signup', JSON.stringify(signUpCredential), {
			headers: headers
		})
        .map( (responseData) => {
            console.log("THE RESPONSE IS" + JSON.stringify(responseData.json()));
            return responseData.json();
        })
		.subscribe(responseData => {
		  this._router.navigate(['Home']);
		});
	}

	getLoginInfo() {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.get('/home', {
			headers: headers
		})
        .map( (responseData) => {
            return responseData.json();
        })
	}
}