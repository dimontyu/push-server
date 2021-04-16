const w=document.querySelector('#w-main');

const wl=document.querySelector('#wl');


import {html, render,directive} from '../lit-html/lit-html.js';

wl.addEventListener('click',f);


async function f(){
var response = await fetch("/test/createbaza", {
            method: 'POST'
            
        });
	
	return response
	
	
}