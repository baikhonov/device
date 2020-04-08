var contactsLink = document.querySelector(".contacts__link");
var feedbackPopup = document.querySelector(".modal--feedback");
var feedbackPopupClose = feedbackPopup.querySelector(".modal__close-button");
var feedbackPopupForm = feedbackPopup.querySelector("form")
var feedbackPopupFormName = feedbackPopupForm.querySelector("[name=name]");
var feedbackPopupFormEmail = feedbackPopupForm.querySelector("[name=email]");
var feedbackPopupFormMessage = feedbackPopupForm.querySelector("[name=message]");

var isStorageSupport = true;
var storage = "";

try {
  storage = localStorage.getItem("name");
} catch (err) {
  isStorageSupport = false;
}

contactsLink.addEventListener("click", function(evt) {
  evt.preventDefault();
  feedbackPopup.classList.add("modal--show");
  if (storage) {
    feedbackPopupFormName.value = storage;
    feedbackPopupFormEmail.focus();
  } else {
    feedbackPopupFormName.focus();
  }
});


feedbackPopupClose.addEventListener("click", function(evt) {
  evt.preventDefault();
  feedbackPopup.classList.remove("modal--show");
  feedbackPopup.classList.remove("modal--error");
});

feedbackPopupForm.addEventListener("submit", function(evt) {
  if (!feedbackPopupFormName.value || !feedbackPopupFormEmail.value || !feedbackPopupFormMessage.value)  {
    evt.preventDefault();
    feedbackPopup.classList.remove("modal--error");
    // Трюк для повторного срабатывания анимации
    void feedbackPopup.offsetWidth;
    feedbackPopup.classList.add("modal--error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("name", feedbackPopupFormName.value)
    }
  }
});

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (feedbackPopup.classList.contains("modal--show")) {
      feedbackPopup.classList.remove("modal--show");
      feedbackPopup.classList.remove("modal--error");
    }
  }
})


var mapLink = document.querySelector(".contacts__map-link");
var mapPopup = document.querySelector(".modal--map");
var mapClose = mapPopup.querySelector(".modal__close-button");

mapLink.addEventListener("click", function(evt) {
  evt.preventDefault();
  mapPopup.classList.add("modal--show");

});

mapClose.addEventListener("click", function(evt) {
  evt.preventDefault();
  mapPopup.classList.remove("modal--show");
});

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (mapPopup.classList.contains("modal--show")) {
      mapPopup.classList.remove("modal--show");
    }
  }
})

var getSiblings = function (elem) {

	// Setup siblings array and get the first sibling
	var siblings = [];
	var sibling = elem.parentNode.firstChild;

	// Loop through each sibling and push to the array
	while (sibling) {
		if (sibling.nodeType === 1 && sibling !== elem) {
			siblings.push(sibling);
		}
		sibling = sibling.nextSibling;
	}

	return siblings;

};

var servicesLinks = document.querySelectorAll(".services__short-item");

var servicesInfo = document.querySelectorAll(".services__detail-item");
servicesInfo[0].classList.add("services__detail-item--show");

servicesLinks.forEach(function(serviceLink) {
  serviceLink.addEventListener("click", function(evt) {
    evt.preventDefault();
    var otherLinks = getSiblings(serviceLink);
    otherLinks.forEach(function(link) {
      link.classList.remove("services__short-item--active");
    })
    serviceLink.classList.add("services__short-item--active");
    switch (serviceLink.children[0].text) {
      case 'Доставка' :
        servicesInfo[0].classList.add("services__detail-item--show");
        servicesInfo[1].classList.remove("services__detail-item--show");
        servicesInfo[2].classList.remove("services__detail-item--show");
        break;
      case 'Гарантия' :
        servicesInfo[1].classList.add("services__detail-item--show");
        servicesInfo[0].classList.remove("services__detail-item--show");
        servicesInfo[2].classList.remove("services__detail-item--show");
        break;
      case 'Кредит' :
        servicesInfo[2].classList.add("services__detail-item--show");
        servicesInfo[0].classList.remove("services__detail-item--show");
        servicesInfo[1].classList.remove("services__detail-item--show");
        break;
    }
  })
});

var searchInput = document.querySelector(".search-form__input");
var searchButton = document.querySelector(".search-form__button");

searchInput.addEventListener("focus", function(evt) {
  searchButton.classList.add("search-form__button--show");
});

searchButton.addEventListener("click", function() {
  this.classList.remove("search-form__button--show");
});
