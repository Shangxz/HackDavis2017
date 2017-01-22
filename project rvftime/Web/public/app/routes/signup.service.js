System.register(['angular2/core', 'angular2/router', 'angular2/http'], function(exports_1, context_1) {
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
    var core_1, router_1, http_1;
    var localSignUpService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            localSignUpService = (function () {
                function localSignUpService(http, _router) {
                    this.http = http;
                    this._router = _router;
                    this.http = http;
                }
                localSignUpService.prototype.signUpLocal = function (signUpCredential) {
                    var _this = this;
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    this.http.post('/signup', JSON.stringify(signUpCredential), {
                        headers: headers
                    })
                        .map(function (responseData) {
                        console.log("THE RESPONSE IS" + JSON.stringify(responseData.json()));
                        return responseData.json();
                    })
                        .subscribe(function (responseData) {
                        _this._router.navigate(['Home']);
                    });
                };
                localSignUpService.prototype.getLoginInfo = function () {
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.http.get('/home', {
                        headers: headers
                    })
                        .map(function (responseData) {
                        return responseData.json();
                    });
                };
                localSignUpService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, router_1.Router])
                ], localSignUpService);
                return localSignUpService;
            }());
            exports_1("localSignUpService", localSignUpService);
        }
    }
});
//# sourceMappingURL=signup.service.js.map