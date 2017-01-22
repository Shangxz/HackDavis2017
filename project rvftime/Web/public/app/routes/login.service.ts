import {Injectable} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Http, Headers} from 'angular2/http';
import {AppComponent} from '../app.component';

export class localLoginCredential {
	constructor(
        public email: string, 
        public password: string
    ) { }
}

@Injectable()
export class localLoginService {
	constructor(
		private http:Http,
		private _router: Router
	) {
		this.http = http;
	}

	checkPassport(loginCredential) { 
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		this.http.post('/login', JSON.stringify(loginCredential), {
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
    logout() { 
		this.http.get('/logout')
        .map( (responseData) => {
            console.log("THE RESPONSE IS" + JSON.stringify(responseData.json()));
            return responseData.json();
        })
		.subscribe(responseData => {
		  this._router.navigate(['login']);
		});
	}
    
	getLoginInfo() {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.get('/home', {
			headers: headers
		})
        .map( (responseData) => {
            console.log("HOME INIT ID " + JSON.stringify(responseData.json()));
            return responseData.json();
        })
	}
    getAllData(id) {
        var request = "/allDataSync?id=" + id;
        console.log("GET ALL DATA START " + id);
        return this.http.get(request)
        .map( (responseData) => {
            console.log(responseData);
            console.log("HOME INIT EVERYTHING" + JSON.stringify(responseData.json()));
            return responseData.json();
        })
    }
}