'use strict'

class Basket{
	constructor({listMag, listBas, span}){
		this.listMag = document.querySelector(listMag);
		this.listBas = document.querySelector(listBas);
		this.span = document.querySelector(span);
		this.basket = this.listBas.getBoundingClientRect();
		this.coord = {};
		this.flag = false;
	}

move(){
	this.listMag.addEventListener('mousedown', (e) => {
		const target = e.target;
		if (target.localName === 'li') {
			this.flag = true;
			this.coord = {
				x: e.offsetX,
				y: e.offsetY
			}
		}
	});
	
	document.addEventListener('mousemove', (e) => {
		const target = e.target;
		e.preventDefault();
		if (target.localName === 'li') {
			if (this.flag) {
				target.style.position = 'absolute';
				target.style.left = (e.pageX - this.coord.x) + 'px';
				target.style.top = (e.pageY - this.coord.y) + 'px';
				target.style.zIndex = 3;
			}
		}
	});
	
	document.addEventListener('mouseup', (e) => {
		const target = e.target;
		this.flag = false;
	
		if (target.localName === 'li' && target.parentElement === this.listMag) {
			if (e.pageX >= this.basket.left && e.pageX <= this.basket.right) {
				target.removeAttribute('style');
				this.listBas.append(target);
			}
			this.span.textContent = this.listBas.children.length;
		}
	});
}

init(){
	this.move();
}
}

// let listMag = document.getElementById('listMag');
// let listBas = document.getElementById('listBas');
// let count = document.querySelector('span');




