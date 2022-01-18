"use strict"
window.onload = pageLoad;
var elements = new Object;
var currentSpeed = 250;
var currentAnimationText = "";
var intervalId = null;

var animArray = [];
var animIndex = 0; //Initiate animation text from first index

// Initialize DOM elements
function initializeElements() {
    elements.maintxt = document.getElementById("maintxt");
    elements.controlSize = document.getElementById("controlSize");
    elements.controlAnimation = document.getElementById("controlAnimation");
    elements.turboCheckBox = document.getElementById("turboChk");
    elements.btnStart = document.getElementById("btnStart");
    elements.btnStop = document.getElementById("btnStop");
}
//Bind all events
function bindEvents() {
    elements.controlSize.addEventListener('change', sizeChanged);
    elements.controlAnimation.addEventListener('change', animationChanged);
    elements.turboCheckBox.addEventListener('change', speedChanged);
    elements.btnStart.onclick = start;
    elements.btnStop.onclick = stop;
}

function pageLoad(e) {
    initializeElements();
    bindEvents();
}

//On button start click
function start() {
    currentAnimationText = elements.maintxt.value; // Set current animation value
    //Do nothing if there's no text
    if (!currentAnimationText)
        return;
    toggleinteractability(true);
    animArray = elements.maintxt.value.split('====\n');
    animIndex = 0; //Initiate animation text from first index
    animationStart();
}

//Stop animation and reset controls
function stop() {
    toggleinteractability(false);
    animationStop();

}

//Disable OR Enable corresponding elements
function toggleinteractability(isStarted) {
    elements.btnStart.disabled = isStarted ? true : false;
    elements.btnStop.disabled = isStarted ? false : true;
    elements.controlAnimation.disabled = isStarted ? true : false;
}

function animationStart() {
    if (intervalId)
        clearInterval(intervalId);

    intervalId = setInterval(function() {
        if (animIndex === animArray.length) {
            animIndex = 0;
        }
        elements.maintxt.value = animArray[animIndex++];
    }, currentSpeed);

}

//Stop animation
function animationStop() {
    if (intervalId)
        clearInterval(intervalId);
    resetText();
}

function resetText() {
    elements.maintxt.value = currentAnimationText;
}


//On text size change request
var sizeChanged = function(e) {
    let selectedValue = e.currentTarget.value;
    elements.maintxt.style.fontSize = selectedValue;

}

//Change animation type/text
var animationChanged = function(e) {
        let selectedValue = e.currentTarget.value;
        elements.maintxt.value = ANIMATIONS[selectedValue];
    }
    //Change global value of currentspeed upon changes
var speedChanged = function(e) {
    if (e.currentTarget.checked) {
        currentSpeed -= 50;
        animationStart();
    } else {
        currentSpeed = 250;
        animationStart();

    }

}