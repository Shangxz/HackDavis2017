import {Component}     from 'angular2/core';
import {Router, RouteParams, RouterLink} from 'angular2/router';
import {Control,
	ControlGroup,
	Validators,
	FormBuilder} from 'angular2/common';
import {HTTP_PROVIDERS, Http, Headers} from 'angular2/http';
import {localLoginService}         from './login.service';
import {HomeComponent} from './home.component';
@Component({
    selector: 'login-page',
    templateUrl: 'views/loginPage.html',
	providers: [localLoginService],
	directives: [RouterLink]
})

export class LoginComponent {
	loginForm: ControlGroup;
	constructor(
		private _router: Router,
		routeParams: RouteParams,
		fb: FormBuilder,
		private _service: localLoginService
	) { 
		this.loginForm = fb.group({
            email: new Control("", Validators.required),
			password: new Control("", Validators.required)
        });
	}

	doLogin(event) {
        var formData = this.loginForm.value;
        this._service.checkPassport(formData);
    }

	goTo(url) {
		this._router.navigate(['Login']);
	}

}

