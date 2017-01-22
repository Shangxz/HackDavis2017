System.register(['angular2/core', 'angular2/router', './carouselDemo.component', './showcaseCarousel.component'], function(exports_1, context_1) {
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
    var core_1, router_1, carouselDemo_component_1, showcaseCarousel_component_1;
    var IndexComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (carouselDemo_component_1_1) {
                carouselDemo_component_1 = carouselDemo_component_1_1;
            },
            function (showcaseCarousel_component_1_1) {
                showcaseCarousel_component_1 = showcaseCarousel_component_1_1;
            }],
        execute: function() {
            IndexComponent = (function () {
                function IndexComponent(_router, routeParams, element) {
                    this._router = _router;
                    this.element = element;
                    this.isLoading = false;
                    this.isFaded = false;
                    this.element.nativeElement;
                }
                IndexComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    console.log("View Init");
                    window.setTimeout(function () {
                        jQuery('body').css({ 'overflow': 'visible' });
                        jQuery('.navbar').addClass('isDisplayBlack');
                        _this.isLoading = true;
                        var wow = new WOW({
                            mobile: false
                        });
                        wow.init();
                        // particlesJS.load('particles-js', '/assets/particles.json', function() {
                        //     console.log('callback - particles.js config loaded');
                        // });
                    }, 800);
                    window.setTimeout(function () {
                        return _this.isFaded = true;
                    }, 1800);
                    console.log(this.element.nativeElement);
                };
                IndexComponent = __decorate([
                    core_1.Component({
                        selector: 'index-page',
                        templateUrl: '/views/indexPage.html',
                        styles: ["\n        .isHide {\n            display : none;\n        }\n        .isHide #status {\n            display : none;\n        }\n    "],
                        directives: [carouselDemo_component_1.CSSCarouselComponent, showcaseCarousel_component_1.ShowcaseCarouselComponent]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, core_1.ElementRef])
                ], IndexComponent);
                return IndexComponent;
            }());
            exports_1("IndexComponent", IndexComponent);
        }
    }
});
//# sourceMappingURL=index.component.js.map