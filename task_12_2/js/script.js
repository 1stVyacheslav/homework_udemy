window.addEventListener('DOMContentLoaded', function() {
	'use strict';

	class Options {
	
		constructor(height, width, bg, fontSize, textAlign) {
			this.height = height + 'px';
			this.width = width + 'px';
			this.bg = bg;
			this.fontSize = fontSize + 'px';
			this.textAlign = textAlign;
		}
	
		createDiv(content) {
			let elem  = document.createElement('div');
			elem.textContent = content;
			elem.style.height = this.height;
			elem.style.width = this.width;
			elem.style.background = this.bg;
			elem.style.fontSize = this.fontSize;
			elem.style.textAlign = this.textAlign;
			document.body.appendChild(elem);
		}
	
	}

	let newObj = new Options(100, 100, 'red', 20, 'center');

	newObj.createDiv('TEST');
})
