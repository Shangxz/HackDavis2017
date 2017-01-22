System.register(['angular2/core', 'angular2/router', './login.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, login_service_1;
    var HomeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            }],
        execute: function() {
            HomeComponent = (function () {
                function HomeComponent(_router, routeParams, _service) {
                    this._router = _router;
                    this._service = _service;
                }
                HomeComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    //this.loginCheck = this._service.getLoginInfo();
                    this._service.getLoginInfo().subscribe(function (res) {
                        _this.loginCheck = res;
                        console.log("after init" + JSON.stringify(res));
                        _this._service.getAllData(res._id).subscribe(function (response) {
                            console.log("response is " + JSON.stringify(response));
                        });
                    });
                    //console.log(JSON.stringify(this.loginCheck));
                    //this.loginCheck = {"_id":"56bbe5a52571e728478a886a","__v":0,"local":{"_windowsDesktopData":"56bbe5a42571e728478a8868","_chromeData":"56bbe5a42571e728478a8869","password":"$2a$08$Mw3hkUZasWtk/ERYWTMQvO889ZhUX.WuaXeDbBr6xMW..BBeW/nzu","email":"zodiaclucifer@gmail.com"}};
                };
                HomeComponent.prototype.logOut = function () {
                    this._service.logout();
                };
                HomeComponent = __decorate([
                    core_1.Component({
                        selector: 'home-page',
                        templateUrl: '/views/homePage.html',
                        providers: [login_service_1.localLoginService],
                        bindings: [login_service_1.localLoginService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, login_service_1.localLoginService])
                ], HomeComponent);
                return HomeComponent;
            }());
            exports_1("HomeComponent", HomeComponent);
        }
    }
});
//# sourceMappingURL=home.component.js.map