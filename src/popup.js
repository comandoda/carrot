"use strict"

export default class PopUp {
    constructor() {
        this.popup = document.querySelector(".popup")
        this.popupMessage = document.querySelector(".popup_message")
        this.popupButton = document.querySelector(".popup-button")
        this.popupButton.addEventListener("click", () => {
            this.onClick && this.onClick()
            hide()
        })
    }

    setClickListener(onClick) {
        this.onClick = onClick
    }

    hide() {
        this.popup.classList.add("popup-hide")
    }

    Popup(text) {
        this.popupMessage.innerText = text
        this.popup.classList.remove("popup-hide")
    }
}