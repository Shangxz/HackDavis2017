System.register(['angular2/core', 'angular2/router', 'angular2/common', './signup.service'], function(exports_1, context_1) {
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
    var core_1, router_1, common_1, signup_service_1;
    var SignUpComponent;
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
            function (signup_service_1_1) {
                signup_service_1 = signup_service_1_1;
            }],
        execute: function() {
            SignUpComponent = (function () {
                function SignUpComponent(_router, routeParams, fb, _service) {
                    this._router = _router;
                    this._service = _service;
                    this.signupForm = fb.group({
                        email: new common_1.Control("", common_1.Validators.required),
                        password: new common_1.Control("", common_1.Validators.required)
                    });
                }
                SignUpComponent.prototype.doSignUp = function (event) {
                    var formData = this.signupForm.value;
                    this._service.signUpLocal(formData);
                };
                SignUpComponent = __decorate([
                    core_1.Component({
                        selector: 'signup-page',
                        templateUrl: '/views/signUpPage.html',
                        providers: [signup_service_1.localSignUpService],
                        directives: [router_1.RouterLink]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, common_1.FormBuilder, signup_service_1.localSignUpService])
                ], SignUpComponent);
                return SignUpComponent;
            }());
            exports_1("SignUpComponent", SignUpComponent);
        }
    }
});
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=signup.component.js.map