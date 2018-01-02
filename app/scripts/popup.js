'use strict'

var range = document.querySelector('.range')
var rangeValue = document.querySelector('.range-value')
var run = document.querySelector('.run')
var stop = document.querySelector('.stop')
var prev = document.querySelector('.prev')
var next = document.querySelector('.next')

// @TODO: window.scroll
var scrollFn = function(value) {
  return `
    var speed = ${value / 10};
    var i = window.scrollY;
    var autoScrollTimeId = setInterval(function() {
      i = i + speed
      if (window.scrollY > i) {
        return void clearInterval(autoScrollTimeId)
      }
      window.scrollTo(0, i)
    }, 1000 / (60 * 10))
    `
}

run.onclick = function() {
  chrome.tabs.executeScript(null, {code: scrollFn(range.value)})
}
stop.onclick = function() {
  chrome.tabs.executeScript(null, {code: 'clearInterval(autoScrollTimeId)'})
}
range.addEventListener('blur', function() {
  chrome.tabs.executeScript(null, {code: scrollFn(range.value)})
})
range.addEventListener('input', function(e) {
  rangeValue.innerHTML = e.target.value
})
