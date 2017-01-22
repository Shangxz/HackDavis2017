import {bootstrap}        from 'angular2/platform/browser';
import {Component, provide}   from 'angular2/core';

import {HTTP_PROVIDERS, Http, Headers} from 'angular2/http';
import {
ROUTER_DIRECTIVES,
ROUTER_PROVIDERS,
RouteConfig,
Location,
LocationStrategy,
HashLocationStrategy
} from 'angular2/router';
import 'rxjs/Rx';

import {AppComponent} from './app.component'

bootstrap(AppComponent, [
	HTTP_PROVIDERS,
	ROUTER_PROVIDERS,
	provide(LocationStrategy, { useClass: HashLocationStrategy })
]);