# SlideShowJS

~ An easy SlideShow maker for web ~ Version 1712-4

## Introduction

SlideShowJS is a simple JS script that allows you to implement a slideshow in your web page. Its strengths are the simplicity to implement it and its fluid animations that allow you to slide the elements up or down.<br/><br/>

## Implementation

The implementation is extremely simple, you need just to create a <b>div</b> with <b>slideshow</b> as class attribute and <b>overflow: hidden</b> and a pre-set <b>height</b> as style and the job is done! <br/> Indeed, doing so, the script will create an array of slideshow objects that will slide your elements up or down at your command.<br/>

## Animate your SlideShow

To animate your slideshow you just need to call one of the following functions based on the animation you want<br/>
Remember that a single call to a function moves the elements <b>just once!!!</b><br/>

<ul>
   <li>Slide
    <ul>
      <li>slideUp() - Slide the elements up once</li>
      <li>slideDown() - Slide the elements down once</li>
      </ul>
  </li>
   <li>Cover
      <ul>
         <li>cover() - cover the current element with the second in the sequence (requires <b>images</b>)</li>
      </ul>
   </li>
</ul>
 
 ## Customizable parameters
 
 You can set some values to the following variables to change the behaviour of the animations<br/>
 
 <ul>
  <li>var slideshowSpeed - The smaller it is, the faster the element slides (default 1)</li>
  <li>var growthRatio - Number of pixels the element slides for slideshowSpeed milliseconds (default 2)</li>
 </ul>
 
 ## Script Structure
 
 ### SlideShow Object
 
 Is an object that identifies a single slideshow in your web page and has the following attributes
 
 <ul>
  <li>element         - Slideshow Div</li>
  <li>height          - Height of the slideshow div</li>
  <li>width           - Width of the slideshow div</li>
  <li>currentElement  - Current element displayed on slideshow div</li>
 </ul>
  
 ### function SlideShow(element, height, width)
 
 Is the slideshow Object constructor. It basically sets the parameters needed by the object constructor.
 
 ### function slideshowInit()
 
 This function is called by an event listener as soon as the page has been loaded and fills an array of slideshow objects, calling for every div with "slideshow" as class attribute the slideshow constructor.
 
 ### function slideUp()
 
 For every slideshow div present in the slideshow object array calls the function which carries of animating the elements movement. (calls slideUpAnim())
 
 ### function slideUpAnim(slideshowObj)
 
 Is the function called by slideUp and carries of making the animation "slideUp". What it does is basically:
 <ul>
  <li>Inside a timeout with <b>slideshowSpeed</b> as timeout: sets the style of the current displayed element to margin-top: -slideCounter, where slideCounter is a variable that goes from 0 to the height of the slideshow div.</li>
  <li>Increate the variable slideCounter of the value of <b>growthRatio</b></li>
  <li>Check if slideCounter is less or equal than the height of the slideshow div:
    <ul>
      <li>If the condition is true:
        <ul>
          <li>Call another time slideUpAnim()</li>
        </ul>
       </li>
      <li>If the condition is false (which means the animation ended):
        <ul>
          <li>save in a variable the older displayed element</li>
          <li>Removes from it the style attribute</li>
          <li>Removes it from the page</li>
          <li>set currentElement to current one which is displayed</li>
          <li>Append the older element at the end of the sequence</li>
        </ul>
      </li>
    </ul>
  </li>
 </ul>
 
 ### slideDown()
 
  For every slideshow div present in the slideshow object array calls the function which carries of animating the elements movement. (calls slideDownInit())
  
### slideDownInit(slideshowObj)

Initialize the slideDown animation. What basically it does is:
<ul>
  <li>Set slideCounter to the negative value of the slideshow div height</li>
  <li>get in a variable the last element of the slideshow</li>
  <li>Removes the last element of the slideshow from the page</li>
  <li>Set to the variable containing the last element of the slideshow margin-top: slideCounter</li>
  <li>Inserts before the displayed element of the slideshow the last element of the slideshow</li>
  <li>Calls slideDownAnim()</li>
 </ul>
  
### slideDownAnim(slideshowObj)

 Is the function called by slideDownInit and carries of making the animation "slideDown". What it does is basically:
 <ul>
  <li>Inside a timeout with <b>slideshowSpeed</b> as timeout: increases the value of slideCounter of growthRatio and apply the margin-top attribute to the last element of the slideshow. Then it checks if the value of slideCounter is less or equal than 0.
    <ul>
      <li>If the condition is true:
        <ul>
          <li>Calls slideDownAnim again</li>
        </ul>
      </li>
      <li>If the condition is false: (which means the animation ended)
        <ul>
          <li>Store the old displayed element in a variable</li>
          <li>Removes the old displayed element from the page</li>
          <li>Removes the margin-top attribute to the new displayed element</li>
          <li>Puts the old displayed element between the new displayed element and the second of the sequence</li>
        </ul>
      </li>
 </ul>
          
 ### function cover()
 
   For every slideshow div present in the slideshow object array calls the function which carries of animating the elements movement. (calls coverInit())
   
### function coverInit(slideshowObj)

Initialize the cover animation. What it does is basically:

<ul>
   <li>Store the content of the current element in a variable</li>
   <li>Change the currentElement of slideshowObj with the second in the sequence</li>
   <li>Set the style attribute of the second element with a padding-top equal to the height of the slideshow div and a background-image which is the same of the current displayed element (that's why it requires images as elements).</li>
   <li>Remove the displayed element</li>
   <li>set slideCounter to the height of the slideshow div</li>
   <li>Append the old displayed element at the end of the slideshow sequence</li>
   <li>Call coverAnim()</li>
 </ul>
 
 ### function coverAnim(slideshowObj)
 
  Is the function called by coverInit() and carries of making the animation "cover". What it does is basically:
 <ul>
  <li>Inside a timeout with <b>slideshowSpeed</b> as timeout: decrease the value of slideCounter of growthRatio and apply the padding-top attribute to the second element of the slideshow. Then it checks if the value of slideCounter is greater or equal than 0.
    <ul>
       <li>If the condition is true...
          <ul>
             <li>calls coverAnim()</li>
          </ul>
       </li>
       <li>If the condition is false... (which means the animation ended)
          <ul>
             <li>Removes the style attribute to the displayed element (which was the second in the sequence)</li>
          </ul>
       </li>
     </ul>
   </li>
   </ul>
 
 ## Credits
 
 Developed by Christian Visintin <br/>
 Copyright © 2017 Christian Visintin - christian.visintin1997@gmail.com<br/>
 
 ## License
 
###  SlideShowJS
 	 
   Copyright (C) 2017 Christian Visintin - christian.visintin1997@gmail.com

   SlideShowJS is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   SlideShowJS is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with SlideShowJS.  If not, see <http://www.gnu.org/licenses/>.
