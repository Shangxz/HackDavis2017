System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var CSSCarouselComponent, IMAGES;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            //Compoent Decorator
            CSSCarouselComponent = (function () {
                function CSSCarouselComponent() {
                    //images data to be bound to the template
                    this.images = IMAGES;
                }
                CSSCarouselComponent = __decorate([
                    core_1.Component({
                        //Name of our tag
                        selector: 'css-carousel',
                        //Template for the tag
                        template: "\n <div class=\"carousel\">\n\n  <ul class=\"slides\">\n\n    <li *ngFor=\"#image of images\">\n      <h2>{{image.title}}</h2>\n      <img src=\"{{image.url}}\" alt=\"\">\n    </li>\n\n   \n  </ul>\n\n</div>\n  ",
                        //Styles for the tag
                        styles: ["\n.carousel{\n    overflow:hidden;\n    width:100%;\n}\n.slides{\n    list-style:none;\n    position:relative;\n    width:500%; /* Number of panes * 100% */\n    overflow:hidden; /* Clear floats */\n        /* Slide effect Animations*/\n    -moz-animation:carousel 30s infinite;\n    -webkit-animation:carousel 30s infinite;\n    animation:carousel 30s infinite;\n}\n.slides > li{\n    position:relative;\n    float:left;\n    width: 20%; /* 100 / number of panes */\n}\n.carousel img{\n    display:block;\n    width:100%;\n    max-width:100%;\n}\n.carousel h2{\n    margin-bottom: 0;\n    font-size:1em;\n    padding:1.5em 0.5em 1.5em 0.5em;\n    position:absolute;\n    right:0px;\n    bottom:0px;\n    left:0px;\n    text-align:center;\n    color:#fff;\n    background-color:rgba(0,0,0,0.75);\n    text-transform: uppercase;\n}\n\n@keyframes carousel{\n    0%    { left:-5%; }\n    11%   { left:-5%; }\n    12.5% { left:-105%; }\n    23.5% { left:-105%; }\n    25%   { left:-205%; }\n    36%   { left:-205%; }\n    37.5% { left:-305%; }\n    48.5% { left:-305%; }\n    50%   { left:-405%; }\n    61%   { left:-405%; }\n    62.5% { left:-305%; }\n    73.5% { left:-305%; }\n    75%   { left:-205%; }\n    86%   { left:-205%; }\n    87.5% { left:-105%; }\n    98.5% { left:-105%; }\n    100%  { left:-5%; }\n}\n  "],
                    }), 
                    __metadata('design:paramtypes', [])
                ], CSSCarouselComponent);
                return CSSCarouselComponent;
            }());
            exports_1("CSSCarouselComponent", CSSCarouselComponent);
            //IMAGES array implementing Image interface
            IMAGES = [
                { "title": "We are covered", "url": "https://raw.githubusercontent.com/christiannwamba/angular2-carousel-component/master/images/covered.jpg" },
                { "title": "Generation Gap", "url": "https://raw.githubusercontent.com/christiannwamba/angular2-carousel-component/master/images/generation.jpg" },
                { "title": "Potter Me", "url": "https://raw.githubusercontent.com/christiannwamba/angular2-carousel-component/master/images/potter.jpg" },
                { "title": "Pre-School Kids", "url": "https://raw.githubusercontent.com/christiannwamba/angular2-carousel-component/master/images/preschool.jpg" },
                { "title": "Young Peter Cech", "url": "https://raw.githubusercontent.com/christiannwamba/angular2-carousel-component/master/images/soccer.jpg" }
            ];
        }
    }
});
//# sourceMappingURL=carouselDemo.component.js.map