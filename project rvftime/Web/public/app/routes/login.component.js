System.register(['angular2/core', 'angular2/router', 'angular2/common', './login.service'], function(exports_1, context_1) {
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
    var core_1, router_1, common_1, login_service_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (login_service_1_1) {
                login_service_1 = login_service_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(_router, routeParams, fb, _service) {
                    this._router = _router;
                    this._service = _service;
                    this.loginForm = fb.group({
                        email: new common_1.Control("", common_1.Validators.required),
                        password: new common_1.Control("", common_1.Validators.required)
                    });
                }
                LoginComponent.prototype.doLogin = function (event) {
                    var formData = this.loginForm.value;
                    this._service.checkPassport(formData);
                };
                LoginComponent.prototype.goTo = function (url) {
                    this._router.navigate(['Login']);
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'login-page',
                        templateUrl: 'views/loginPage.html',
                        providers: [login_service_1.localLoginService],
                        directives: [router_1.RouterLink]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, common_1.FormBuilder, login_service_1.localLoginService])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map