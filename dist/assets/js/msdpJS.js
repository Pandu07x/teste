window.onload = function (e) {
  // polyfill for closest() - IE11 does not support that out of the box
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector;
  }
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
      var el = this;

      do {
        if (Element.prototype.matches.call(el, s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
  }

  // toggle expand / collapse feature of sidebar
  var toggle = document.querySelector("#appBar--expander");
  var appWrapper = document.querySelector(".appWrapper");
  toggle.addEventListener("click", function () {
    // appBar.classList.toggle("has-appBarAdvanced-collapsed");
    appWrapper.classList.toggle("has-appBarAdvanced-collapsed");
    var elems = document.querySelectorAll(".appBarAdvanced .level1");
    for (var i = 0; i < elems.length; i++) {
      elems[i].classList.remove("is-shown");
    }
  });

  // set active state of item on click
  var level1links = document.querySelectorAll(".appBarAdvanced .item__link");
  for (var i = 0; i < level1links.length; i++) {
    level1links[i].addEventListener("click", function (event) {
      for (var j = 0; j < level1links.length; j++) {
        level1links[j].parentElement.classList.remove("is-active");
      }
      event.target.closest(".level1").classList.add("is-active");
      event.target.blur();
      event.target.parentNode.parentNode.blur(); // needed for collapsed mode
      event.preventDefault();
    });
  }

  // add class to show app bar submenu on hover
  var timerHover;
  var collapsedAppBarElements = document.querySelectorAll(
    ".has-appBarAdvanced-collapsed .appBarAdvanced .level1"
  );
  var collapsedAppBarLinks = document.querySelectorAll(
    ".has-appBarAdvanced-collapsed .appBarAdvanced .level1 a"
  );
  for (var i = 0; i < collapsedAppBarLinks.length; i++) {
    collapsedAppBarLinks[i].addEventListener("mouseenter", function (event) {
      clearTimeout(timerHover);
      for (var j = 0; j < collapsedAppBarElements.length; j++) {
        collapsedAppBarElements[j].classList.remove("is-shown");
      }
      event.target.closest(".level1").classList.add("is-shown");
    });
  }

  // hide all possible open app bar items on mouse-leave, but wait for a split second
  // to avoid unintentional mouseleave events
  var appBar = document.querySelector(".appBarAdvanced");
  appBar.addEventListener("mouseleave", function () {
    timerHover = setTimeout(function () {
      for (var j = 0; j < collapsedAppBarElements.length; j++) {
        collapsedAppBarElements[j].classList.remove("is-shown");
      }
    }, 100);
  });
  var regionsWrapper = document.querySelector(".appWrapper__regions");
  var mainContent = document.querySelector(".main-content");
  // functionality to hide context and/or leadimg region through button
  var toggleLeading = document.querySelector("#toggleLeadingRegionDemo");
  // toggleLeading.addEventListener('click', function() {
  //     regionsWrapper.classList.toggle('leadingRegion-is-expanded');
  // });

  var toggleContext = document.querySelector("#toggleContextRegionDemo");
  // toggleContext.addEventListener("click", function () {
  //   regionsWrapper.classList.toggle("contextRegion-is-expanded");
  //   mainContent.classList.toggle("contextRegion-is-expanded");
  // });
};
