import {Component, provide}   from 'angular2/core';
import {
ROUTER_DIRECTIVES,
ROUTER_PROVIDERS,
RouteConfig,
Location,
LocationStrategy,
HashLocationStrategy,
RouterLink
} from 'angular2/router';

import {HTTP_PROVIDERS, Http, Headers} from 'angular2/http';
import {IndexComponent} from './routes/index.component';
import {LoginComponent} from './routes/login.component';
import {HomeComponent} from './routes/home.component';
import {SignUpComponent} from './routes/signup.component';
import {PrivacyComponent} from './routes/privacy.component';


@Component({
    selector: 'my-app',
    templateUrl: '/views/nav.html',
    directives: [ROUTER_DIRECTIVES, RouterLink]
})

@RouteConfig([
    {
    path: '/index',
    name: 'Index',
    component: IndexComponent,
    useAsDefault: true
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent
  },
  { path: '/home', name: 'Home', component: HomeComponent },
  { path: '/signup', name: 'SignUp', component: SignUpComponent },
  { path: '/privacy', name: 'Privacy', component: PrivacyComponent }
])

export class AppComponent { }