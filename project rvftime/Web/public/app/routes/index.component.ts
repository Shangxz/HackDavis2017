import {Component, AfterViewInit, ElementRef}     from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {CSSCarouselComponent} from './carouselDemo.component';
import {ShowcaseCarouselComponent} from './showcaseCarousel.component';

declare var WOW:any;
declare var jQuery: any;
declare var particlesJS: any;

@Component({
    selector: 'index-page',
	templateUrl:'/views/indexPage.html',
    styles:[`
        .isHide {
            display : none;
        }
        .isHide #status {
            display : none;
        }
    `],
    directives: [CSSCarouselComponent, ShowcaseCarouselComponent]
    
})

export class IndexComponent implements AfterViewInit {
    isLoading = false;
    isFaded = false;
    
	constructor(
		private _router: Router,
		routeParams: RouteParams,
        public element: ElementRef
	) {
       this.element.nativeElement
	}
    ngAfterViewInit() {
        console.log("View Init");
        
        window.setTimeout(() => {
            jQuery('body').css({'overflow':'visible'});
            jQuery('.navbar').addClass('isDisplayBlack');
            this.isLoading = true;
		    var wow = new WOW(
            {
                mobile: false
            });
            wow.init();
            // particlesJS.load('particles-js', '/assets/particles.json', function() {
            //     console.log('callback - particles.js config loaded');
            // });
        }, 800
            
        )
        window.setTimeout(() =>
            this.isFaded = true , 1800
        )
        
        
        console.log(this.element.nativeElement)
    }
}