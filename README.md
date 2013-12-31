basic-carousel-js-library
=========================

Purpose of this exercise 
========================
1) To better understand the JS module system / AMD-system and how they depend on each other. <br>
2) To get hands-on experience with requireJS module loader. <br>
3) I wanted to write a very small javascript-library <br>
4) Wanted to get a better idea on how to write JS test-cases. I have written a sample example to use this library as well. This is NOT a good example of how 
   to write JS test-cases, given that it does NOT test in a very modular fashion and I have not used any mocking/testing framework per say, 
   but does a basic job of giving me a basic idea of how to write them. 
   <br>
NOTE: The purpose of this exercise was mainly exploring various javascript aspects. So I wanted to devote minimal time on styling the carousel, so 
      for css and html I have just copied the code from www.amazon.com/dp/B0013E9SOG <br>
DISCLAIMER : Please note that all the images/css/html which I have used is publicly available on the amazon website. I have NOT used any internal information. 

How to use the library
======================

1) The consumers of the library should depend on carouselFramework module. Note that while doing so you specify the path relatively to the consumer module. <br>
2) carouselFramework module exposes a method to createCarousel. You need to provide an outer div which should be present on the page, inside which the carousel 
   would be shown. Also you need to provide some other details. <br>
3) Refer CarouselFrameworkTest.js in js_tests folder to see the library being used in action. Open CarouselFrameworkTest.html in a browser to see the carousels 
   in action. 

Patterns used 
=============

I have tried to use many JS patterns which I had never used before to get a hands-on experience. <br>
1) Instead of using MVC pattern, I have used Model-widget pattern as described in this article : http://michaux.ca/articles/mvc-architecture-for-javascript-applications.
   In this pattern the widget has the responsibility of both view and controller.  <br>
2) In order to make sure the widget-module does NOT become too bloated, I have used the composite pattern and there are individual modules for each parts of the
   carousel. This also facilitates easier extension later if required. <br>
3) I have used the classical way of object-initialization for modules for which multiple instances could be created like Carousel.js, CarouselModel.js et al. 
   Note how I return the constructor function itself from the module for such classes. Also note that for such modules I have used the convention to start
   the name with capital-camel-case. <br>
4) AMD by default supports singleton-module creation, so for classes where I wanted to have only a single instance like carouselFramework it was very easy with
   AMD. Also note that for such modules I have used the convention to start the name with small-camel-case.<br>
5) Since with classical-way of object initialization with prototypes, there is NO way to enforce private methods, I have used the convention to prefix such
   methods with an underscore. 

What I could have done better 
=============================
1) CarouselModel.js is a mammoth module and performs large no. of responsibilities, I should have broken it down. <br>
2) I should have used module-level string-constants instead of embedding the code with strings. <br>
3) Better error support. RequireJS does NOT provide a decent way to log/throw errors if a module initialization fails. So if for some reason you try 
   to use the library wrongly, very informative errors are NOT always thrown. <br>
4) I should have used my own css/html, but again this was out-of-scope for this exercise. Also the css/html is NOT very well used, there are some broken UX here
   and there, I did NOT get a chance to fix that. <br>
5) Currently each module is strictly-coupled in how/what methods to call for other module. Instead I should have used a simple event-bus (subscribe/publish 
   concept) and each module should have triggered/listened to appropriate events. This would have lead to a much loosely coupled system. <br>
6) RequireJS needs that while mentioning the dependencies, the paths should be properly mentioned relative to the module which is consuming it. This makes
   using the library difficult to use and moving of files difficult. 

