(function (window) {
	'use strict';
	/**
	 * @constructor
	 */

	/**
	 * @function
	 * @param {string} selector html class to select
	 * @param {HTMLElement } scope were we want to select
	 * @description Get element(s) by CSS selector:
	 * @function qs
	 * @returns {HTMLElement } The first element find
	 */
	window.qs = function (selector, scope) {
		return (scope || document).querySelector(selector);
	};

	/**
	 * @function
	 * @param {string} selector html class to select
	 * @param {HTMLElement } scope were we want to select
	 * @description Get element(s) by CSS selector:
	 * @function qsa
	 * @returns {HTMLElement } All the element find
	 */
	window.qsa = function (selector, scope) {
		return (scope || document).querySelectorAll(selector);
	};

	/**
	 * @function
	 * @param {string} target html class to select
	 * @param {string} type  A case-sensitive string representing the event type to listen for.
	 * @param {function} callback the callback of the event
	 * @param {HTMLElement } useCapture A Boolean indicating that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.
	 * @description addEventListener wrapper
	 * @function $on
	 * @returns {void}
	 */
	window.$on = function (target, type, callback, useCapture) {
		target.addEventListener(type, callback, !!useCapture);
	};

	/**
	 * @function
	 * @param {string} target html class to select
	 * @param {string} selector selector to get the element
	 * @param {string} type the type of the item we want
	 * @param {HTMLElement } handler what it should do so the callback
	 * @description Attach a handler to event for all elements that match the selector, now or in the future, based on a root element
	 * @function $delegate
	 * @returns {void}
	 */
	window.$delegate = function (target, selector, type, handler) {
		function dispatchEvent(event) {
			var targetElement = event.target;
			var potentialElements = window.qsa(selector, target);
			var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

			if (hasMatch) {
				handler.call(targetElement, event);
			}
		}

		// https://developer.mozilla.org/en-US/docs/Web/Events/blur
		var useCapture = type === 'blur' || type === 'focus';

		window.$on(target, type, dispatchEvent, useCapture);
	};

	// 
	// 
	/**
	 * @function
	 * @param {HTMLElement } element html class to select
	 * @param {string} tagName the tagname to find
	 * @description Find the element's parent with the given tag name: $parent(qs('a'), 'div');
	 * @function $parent
	 * @returns {void | HTMLElement }
	 */
	window.$parent = function (element, tagName) {
		if (!element.parentNode) {
			return;
		}
		if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
			return element.parentNode;
		}
		return window.$parent(element.parentNode, tagName);
	};

	// Allow for looping on nodes by chaining:
	// qsa('.foo').forEach(function () {})
	NodeList.prototype.forEach = Array.prototype.forEach;
})(window);
