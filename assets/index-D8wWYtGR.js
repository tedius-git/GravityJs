(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))e(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&e(l)}).observe(document,{childList:!0,subtree:!0});function s(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function e(n){if(n.ep)return;n.ep=!0;const c=s(n);fetch(n.href,c)}})();const B="/GravityJs/player-play.svg",E="/GravityJs/player-pause.svg",M="/GravityJs/light-mode.svg",P="/GravityJs/dark-mode.svg";let i={yellow:"#e8dc3d",red:"#f38ba8",purple:"#cba6f7",blue:"#89dceb",green:"#a6e3a1"};function L(t){const o=document.getElementById(t),s=o.getContext("2d"),e=window.devicePixelRatio||1;o.width=o.clientWidth*e-50,o.height=o.clientHeight*e-50,s.scale(e,e)}function b(t,o,s){let e={pos:{x:t,y:o},m:s,v:{x:Math.random()*2-1,y:Math.random()*2-1},a:{x:0,y:0}};return s<1e3?e.color=i.red:s<2e3?e.color=i.green:s<3e3?e.color=i.blue:e.color=i.yellow,e}function x(t,o){for(let s in t){const e=t[s];G(e.pos.x,e.pos.y,e.m/200,o,e.color)}}function C(t,o){for(let s in t){let e=t[s];e.pos.x+=e.v.x*o,e.pos.y+=e.v.y*o}}function O(t,o){for(let s in t){let e=t[s];e.v.x+=e.a.x*o,e.v.y+=e.a.y*o}}function q(t,o){const s=6.674*Math.pow(10,0);for(let e=0;e<t.length;e++){let n=t[e];n.a.x=0,n.a.y=0;for(let c=0;c<t.length;c++){if(e===c)continue;let l=t[c],d=l.pos.x-n.pos.x,u=l.pos.y-n.pos.y,m=Math.sqrt(d*d+u*u);if(m<(n.m+l.m)/200)continue;let y=s*n.m*l.m/(m*m),g=Math.atan2(u,d),I=y/n.m*Math.cos(g),w=y/n.m*Math.sin(g);n.a.x+=I*o,n.a.y+=w*o}}}function A(t,o){for(let s in t){let e=t[s];(e.pos.x>o.width||e.pos.x<0)&&t.splice(s,1),(e.pos.y>o.height||e.pos.y<0)&&t.splice(s,1)}}function G(t,o,s,e,n){e.save(),e.fillStyle=n,e.lineWidth=3,e.beginPath(),e.arc(t,o,s,0,Math.PI*2,!0),e.fill(),e.restore()}let f=performance.now(),a=!1,r=[];function p(t){if(a){f=t,window.requestAnimationFrame(p);return}const o=document.getElementById("app"),s=o.getContext("2d");L("app");const e=(t-f)/100;f=t,s.clearRect(0,0,o.width,o.height),C(r,e),O(r,e),q(r,e),x(r,s),A(r,o),window.requestAnimationFrame(p)}const h=document.getElementById("pauseButton");h.addEventListener("click",()=>{a=!a,document.getElementById("pauseImage").src=a?B:E,h.style.background=a?i.green:i.red});const R=document.getElementById("plusPlanetButton");R.addEventListener("click",()=>{const t=document.getElementById("app"),o=t.getContext("2d");o.clearRect(0,0,t.width,t.height),x(r,o);const s=Math.floor(Math.random()*t.width-50)+50,e=Math.floor(Math.random()*t.height-50)+50,n=Math.floor(Math.random()*4e3);r.push(b(s,e,n))});const k=document.getElementById("modeButton");k.addEventListener("click",()=>{const t=document.querySelector("html");t.classList.contains("dark")?(t.classList.remove("dark"),document.getElementById("modeImage").src=P):(t.classList.add("dark"),document.getElementById("modeImage").src=M)});const v=document.getElementById("app");v.addEventListener("mousemove",function(t){const o=v.getBoundingClientRect(),s=t.clientX-o.left,e=t.clientY-o.top;document.getElementById("coords").textContent=`${s}, ${e}`});p();
