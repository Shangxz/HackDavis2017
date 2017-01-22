import {Component}     from 'angular2/core';
import {Router, RouteParams, RouterLink} from 'angular2/router';
import {Control,
	ControlGroup,
	Validators,
	FormBuilder} from 'angular2/common';
import {HTTP_PROVIDERS, Http, Headers} from 'angular2/http';
import {localSignUpService}         from './signup.service';
import {HomeComponent} from './home.component';


@Component({
    selector: 'signup-page',
    templateUrl:'/views/signUpPage.html',
    providers: [localSignUpService],
  directives: [RouterLink]
})

export class SignUpComponent { 
    signupForm: ControlGroup;
	constructor(
		private _router: Router,
		routeParams: RouteParams,
		fb: FormBuilder,
		private _service: localSignUpService
	) { 
		this.signupForm = fb.group({
            email: new Control("", Validators.required),
			password: new Control("", Validators.required)
        });
	}
    doSignUp(event) {
        var formData = this.signupForm.value;
        this._service.signUpLocal(formData);
    }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/