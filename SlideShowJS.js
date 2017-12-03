/*
*
*   -- SlideShowJS --
*
* 	Copyright (C) 2017 Christian Visintin - christian.visintin1997@gmail.com
*
* 	This file is part of SlideShowJS
*
*   SlideShowJS is free software: you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation, either version 3 of the License, or
*   (at your option) any later version.
*
*   SlideShowJS is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*
*   You should have received a copy of the GNU General Public License
*   along with SlideShowJS.  If not, see <http://www.gnu.org/licenses/>.
*
*/

//Customizable variables
var slideshowSpeed = 1; //The smaller it is, the faster the element slides
var growthRatio = 2; //Number of pixels the element slides for slideshowSpeed ms

//Slideshow constructor
function Slideshow(element, height, width) {

  this.element = element; //Slideshow Div
  this.height = height; //Slideshow Div height
  this.width = width; //Slideshow Div Width
  this.currentElement = element.firstChild.nextElementSibling; //Current element displayed on slideshow

}

//Function called on load, constructs slideshow objects
function slideshowInit() {

  slideshow = [];
  var divs = document.getElementsByClassName("slideshow");

  for(var i = 0; i < divs.length; i++) {
    slideshow[i] = new Slideshow(divs[i],divs[i].offsetHeight,divs[i].offsetWidth);
  }

}

var slideCounter = 0;

//SLIDEUP!!! - push the second element up

//Slide current element up - Has to be called from outside to slide
function slideUp() {
  slideCounter = 0; //Counter for animation, from 0 to element height
  for(var i = 0; i < slideshow.length; i++) { //Slide all slideshows in web page
    slideUpAnim(slideshow[i]);
  }

}

//Animate sliding - do not call outside!
function slideUpAnim(slideshowObj) {

  setTimeout(function() {
    slideCounter += growthRatio;
    slideshowObj.currentElement.setAttribute("style","margin-top: -"+slideCounter+"px");
    if(slideCounter <= slideshowObj.height) slideUpAnim(slideshowObj);
    else {
      var newElement = slideshowObj.currentElement;
      newElement.removeAttribute("style");
      slideshowObj.currentElement.remove(); //Move current element from start of sequence to the end
      slideshowObj.currentElement = slideshowObj.element.firstChild.nextElementSibling; //the current element is the second one
      slideshowObj.element.appendChild(newElement); //The old first element is now the last, so we append it to the end
    }
  }, slideshowSpeed);

}

//SLIDEDOWN!!! - make the last element falling from above

//Slide current element down - Has to be called from outside to slide
function slideDown() {
  for(var i = 0; i < slideshow.length; i++) { //Slide all slideshows in web page
    slideDownInit(slideshow[i]);
  }
}

function slideDownInit(slideshowObj) {

  slideCounter = -(slideshowObj.height);
  var newElement = slideshowObj.element.firstChild.nextElementSibling.nextElementSibling.nextElementSibling; //Get the last element of the sequence
  newElement.remove(); //Remove it from its current poisition
  newElement.setAttribute("style","margin-top: -"+slideshowObj.height+"px; "); //Set its margin-top with the negative height of the slideshow
  slideshowObj.element.insertBefore(newElement,slideshowObj.currentElement); //Place it at the top of the slideshow (so it is above the current element)
  slideshowObj.currentElement = newElement; //Change the current element to the one that has to be moved
  slideDownAnim(slideshowObj); //start the animation

}

function slideDownAnim(slideshowObj) {

  setTimeout(function() {
    slideCounter += growthRatio; //Decrease the slide counter every tick
    slideshowObj.currentElement.setAttribute("style","margin-top: "+slideCounter+"px"); //Decreate the margin-top
    if(slideCounter <= 0) slideDownAnim(slideshowObj); //Do it till slideCounter is ge than 0
    else { //When it's 0...
      var newElement = slideshowObj.element.firstChild.nextElementSibling.nextElementSibling; //Select the second element (the one that was displayed before)
      newElement.remove(); //Remove the second element (the one that was displayed before)
      slideshowObj.currentElement.removeAttribute("style"); //Remove the margin-top
      slideshowObj.element.insertBefore(newElement,slideshowObj.element.firstChild.nextElementSibling.nextElementSibling); //Place the older element to the second position of the sequence
    }

  }, slideshowSpeed);
}

window.addEventListener("load",slideshowInit,false);
