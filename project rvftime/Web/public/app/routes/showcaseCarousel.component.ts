//Import Component form the angular core package
import {Component}     from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
//Importt the Image interface
import {Image} from './image.interface';

//Compoent Decorator
@Component({
  //Name of our tag
  selector: 'showcase-carousel',
  //Template for the tag
  template: `
 <div class="carousel">

  <ul class="slides">

    <li *ngFor="#image of images">
      <h2>{{image.title}}</h2>
      <img src="{{image.url}}" alt="">
    </li>

   
  </ul>

</div>
  `,
  //Styles for the tag
  styles: [`
.carousel{
    overflow:hidden;
    width:100%;
}
.slides{
    list-style:none;
    position:relative;
    width:300%; /* Number of panes * 100% */
    overflow:hidden; /* Clear floats */
        /* Slide effect Animations*/
    -moz-animation:carousel 30s infinite;
    -webkit-animation:carousel 30s infinite;
    animation:carousel 30s infinite;
}
.slides > li{
    position:relative;
    float:left;
    width: 33%; /* 100 / number of panes */
}
.carousel img{
    display:block;
    width:100%;
    max-width:100%;
}
.carousel h2{
    margin-bottom: 0;
    font-size:1em;
    padding:1.5em 0.5em 1.5em 0.5em;
    position:absolute;
    right:0px;
    bottom:0px;
    left:0px;
    text-align:center;
    color:#fff;
    background-color:rgba(0,0,0,0.75);
    text-transform: uppercase;
}

@keyframes carousel{
    0%    { left:-5%; }
    50%   { left:-205%; }
    100%    { left:-5%; }
}
  `],
})
//Carousel Component itself
export class ShowcaseCarouselComponent {
    //images data to be bound to the template
	public images = IMAGES;
}

//IMAGES array implementing Image interface
var IMAGES: Image[] = [
	{ "title": "", "url": "/img/slide/1.png" },
	{ "title": "", "url": "/img/slide/2.png" },
	{ "title": "", "url": "/img/slide/3.png" }
];