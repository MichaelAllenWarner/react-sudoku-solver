!function(o){var t={};function n(s){if(t[s])return t[s].exports;var e=t[s]={i:s,l:!1,exports:{}};return o[s].call(e.exports,e,e.exports,n),e.l=!0,e.exports}n.m=o,n.c=t,n.d=function(o,t,s){n.o(o,t)||Object.defineProperty(o,t,{enumerable:!0,get:s})},n.r=function(o){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})},n.t=function(o,t){if(1&t&&(o=n(o)),8&t)return o;if(4&t&&"object"==typeof o&&o&&o.__esModule)return o;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:o}),2&t&&"string"!=typeof o)for(var e in o)n.d(s,e,function(t){return o[t]}.bind(null,e));return s},n.n=function(o){var t=o&&o.__esModule?function(){return o.default}:function(){return o};return n.d(t,"a",t),t},n.o=function(o,t){return Object.prototype.hasOwnProperty.call(o,t)},n.p="",n(n.s=0)}([function(o,t,n){"use strict";n.r(t);class s{constructor(o,t){this.id=o,this.val=t||null,this.possVals=t?[]:Array.from({length:9},(o,t)=>t+1),this.isAccountedForInGroupTakenNums=!1}row(){return Math.floor(this.id/9)}col(){return this.id%9}box(){return 3*Math.floor(this.row()/3)+Math.floor(this.col()/3)}moveLastRemainingPossValToVal(){this.val||1!==this.possVals.length||(this.val=this.possVals[0],this.possVals.pop())}checkForNoPossValsLeft(){return!this.val&&0===this.possVals.length}}class e{constructor(o,t){this.groupType=o,this.num=t,this.takenNums=[]}checkForDuplicates(){return this.takenNums.some((o,t,n)=>n.indexOf(o)!==n.lastIndexOf(o))}}function r(o,t){const n=[];for(const s of o){if(!s.val||s.isAccountedForInGroupTakenNums)continue;s.isAccountedForInGroupTakenNums=!0;const o=o=>s[o.groupType]()===o.num,e=o=>{n.push([o,s.val])};t.filter(o).forEach(e)}for(const[o,t]of n)o.takenNums.push(t);return n.length>0}function u(o,t){const n=[];for(const s of o){if(s.val)continue;const o=o=>s[o.groupType]()===o.num&&o.takenNums.length>0,e=o=>{for(const t of o.takenNums)s.possVals.includes(t)&&n.push([s,t])};t.filter(o).forEach(e)}for(const[o,t]of n){const n=o.possVals.indexOf(t);-1!==n&&o.possVals.splice(n,1)}return n.length>0}function i(o,t){const n=[];for(const s of t){const t=[],e=[],r=o=>o[s.groupType]()===s.num,u=o=>{t.push(o),Array.prototype.push.apply(e,o.possVals)};o.filter(r).forEach(u);const i=(o,t,n)=>n.indexOf(o)===n.lastIndexOf(o),c=o=>{const s=t.find(t=>t.possVals.includes(o));n.push([s,o])};e.filter(i).forEach(c)}for(const[o,t]of n)o.possVals=[t];return n.length>0}var c=(o,t)=>{let n;do{const s=r(o,t),e=u(o,t),c=i(o,t);if(n=s||e||c)for(const t of o)t.moveLastRemainingPossValToVal()}while(n)},l=(o,t)=>{for(const t of o)if(t.checkForNoPossValsLeft())return!0;for(const o of t)if(o.checkForDuplicates())return!0},f=o=>{let t;for(const n of o)if(!n.val){if(2===n.possVals.length){t=n;break}(!t||n.possVals.length<t.possVals.length)&&(t=n)}return t};function a(o){const t=function(o){const t=[],n=o.split("");for(const[o,e]of n.entries())t.push(new s(o,+e));return t}(o),n=function(){const o=[];for(let t=0;t<9;t++)o.push(new e("row",t)),o.push(new e("col",t)),o.push(new e("box",t));return o}();if(c(t,n),l(t,n))return;const r=t.map(o=>o.val||0);if(!r.includes(0)){return r}const u=r,i=f(t);for(const o of i.possVals){u[i.id]=o;const t=a(u.join(""));if(t){return t}}}onmessage=function(o){const t=a(o.data);postMessage({boardString:o.data,solutionArray:t})}}]);