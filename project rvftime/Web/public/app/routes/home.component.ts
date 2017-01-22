import {Component, OnInit}     from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {localLoginService}         from './login.service';

@Component({
    selector: 'home-page',
	templateUrl:'/views/homePage.html',
	providers: [localLoginService],
    bindings: [localLoginService]
})

export class HomeComponent implements OnInit {
	loginCheck: Object;
	constructor(
		private _router: Router,
		routeParams: RouteParams,
		public _service: localLoginService
	) {
       
	}
	ngOnInit() {
        //this.loginCheck = this._service.getLoginInfo();
		this._service.getLoginInfo().subscribe((res) => {
            this.loginCheck = res;
            console.log("after init" + JSON.stringify(res)); 
            this._service.getAllData(res._id).subscribe((response) => {
                console.log("response is "+ JSON.stringify(response))
            })
        });
        //console.log(JSON.stringify(this.loginCheck));
        //this.loginCheck = {"_id":"56bbe5a52571e728478a886a","__v":0,"local":{"_windowsDesktopData":"56bbe5a42571e728478a8868","_chromeData":"56bbe5a42571e728478a8869","password":"$2a$08$Mw3hkUZasWtk/ERYWTMQvO889ZhUX.WuaXeDbBr6xMW..BBeW/nzu","email":"zodiaclucifer@gmail.com"}};
	}
    logOut() {
        this._service.logout();
    }
}

