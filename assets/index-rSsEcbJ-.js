(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))e(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&e(r)}).observe(document,{childList:!0,subtree:!0});function l(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function e(n){if(n.ep)return;n.ep=!0;const i=l(n);fetch(n.href,i)}})();const B="/GravityJs/player-play.svg",P="/GravityJs/player-pause.svg";let s={yellow:"#e8dc3d",red:"#f38ba8",purple:"#cba6f7",blue:"#89dceb",green:"#a6e3a1"};function I(t){const o=document.getElementById(t),l=o.getContext("2d"),e=window.devicePixelRatio||1;o.width=o.clientWidth*e-50,o.height=o.clientHeight*e-50,l.scale(e,e)}function E(t,o,l){let e={pos:{x:t,y:o},m:l,v:{x:Math.random()*2-1,y:Math.random()*2-1},a:{x:0,y:0}};return l<1e3?e.color=s.red:l<2e3?e.color=s.green:l<3e3?e.color=s.blue:e.color=s.yellow,e}function x(t,o){for(let l in t){const e=t[l];A(e.pos.x,e.pos.y,e.m/200,o,e.color)}}function b(t,o){for(let l in t){let e=t[l];e.pos.x+=e.v.x*o,e.pos.y+=e.v.y*o}}function L(t,o){for(let l in t){let e=t[l];e.v.x+=e.a.x*o,e.v.y+=e.a.y*o}}function C(t,o){const l=6.674*Math.pow(10,0);for(let e=0;e<t.length;e++){let n=t[e];n.a.x=0,n.a.y=0;for(let i=0;i<t.length;i++){if(e===i)continue;let r=t[i],d=r.pos.x-n.pos.x,u=r.pos.y-n.pos.y,f=Math.sqrt(d*d+u*u);if(f<(n.m+r.m)/200)continue;let y=l*n.m*r.m/(f*f),h=Math.atan2(u,d),w=y/n.m*Math.cos(h),M=y/n.m*Math.sin(h);n.a.x+=w*o,n.a.y+=M*o}}}function O(t,o){for(let l in t){let e=t[l];(e.pos.x>o.width||e.pos.x<0)&&t.splice(l,1),(e.pos.y>o.height||e.pos.y<0)&&t.splice(l,1)}}function A(t,o,l,e,n){e.save(),e.fillStyle=n,e.lineWidth=3,e.beginPath(),e.arc(t,o,l,0,Math.PI*2,!0),e.fill(),e.restore()}let p=performance.now(),a=!1,c=[];function m(t){if(a){p=t,window.requestAnimationFrame(m);return}const o=document.getElementById("app"),l=o.getContext("2d");I("app");const e=(t-p)/100;p=t,l.clearRect(0,0,o.width,o.height),b(c,e),L(c,e),C(c,e),x(c,l),O(c,o),window.requestAnimationFrame(m)}const g=document.getElementById("pauseButton");g.addEventListener("click",()=>{a=!a,document.getElementById("pauseImage").src=a?B:P,g.style.background=a?s.green:s.red});const R=document.getElementById("plusPlanetButton");R.addEventListener("click",()=>{const t=document.getElementById("app"),o=t.getContext("2d");o.clearRect(0,0,t.width,t.height),x(c,o);const l=Math.floor(Math.random()*t.width-50)+50,e=Math.floor(Math.random()*t.height-50)+50,n=Math.floor(Math.random()*4e3);c.push(E(l,e,n))});const v=document.getElementById("app");v.addEventListener("mousemove",function(t){const o=v.getBoundingClientRect(),l=t.clientX-o.left,e=t.clientY-o.top;document.getElementById("coords").textContent=`${l}, ${e}`});m();
