(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.compromiseSubtitle = factory());
})(this, (function () { 'use strict';

  var version = '0.0.1';

  const t=(t,e,n)=>{let s=parseInt(e,n);return isNaN(s)||s<0||s>1114111?t:String.fromCodePoint(s)},e=function(e){return e.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&lrm;/g,"").replace(/&rlm;/g,"").replace(/&nbsp;/g," ").replace(/&ndash;/g,"–").replace(/&mdash;/g,"—").replace(/&copy;/g,"©").replace(/&reg;/g,"®").replace(/&trade;/g,"™").replace(/&asymp;/g,"≈").replace(/&ne;/g,"≠").replace(/&pound;/g,"£").replace(/&euro;/g,"€").replace(/&deg;/g,"°").replace(/&#x([0-9a-f]+);/gi,(e,n)=>t(e,n,16)).replace(/&#(\d+);/g,(e,n)=>t(e,n,10)).replace(/&amp;/g,"&")};function n(t=""){let e=0,n=0,s=0,r=0,[i,l]=t.replace(",",".").split("."),o=i.split(":");return s=parseInt(o.pop()||"0",10),n=parseInt(o.pop()||"0",10),e=parseInt(o.pop()||"0",10),r=parseInt(l||"0",10),3600*e+60*n+s+r/1e3}const s=function(t){let[e,s]=t.split("--\x3e"),r=n(e.trim()),i=s.trim().split(/^([0-9:.,]+)(.*)/),l={startTime:r,endTime:n(i[1]),text:[]};return i[2]&&(l.attributes=i[2].trim()),l},r=/-->/,i=/^(NOTE\b|STYLE\s*$|REGION\s*$)/,l={silent:true,verbose:false,maxLength:100,allowOverlap:false},o=(t,e={})=>{e={...l,...e};let n=[];0===t.length&&n.push("No cues found");for(let s=0;s<t.length;s+=1){let r=t[s],i=false;("number"!=typeof r.startTime||r.startTime<0)&&(n.push(`Invalid start time for entry ${s}`),i=true),("number"!=typeof r.endTime||r.endTime<0)&&(n.push(`Invalid end time for entry ${s}`),i=true),!e.allowOverlap&&r.startTime>=r.endTime&&(n.push(`StartTime is not before EndTime for entry ${s}`),i=true),0===r.text.length&&(n.push(`Text is empty for entry ${s}`),i=true),r.text.reduce((t,e)=>Math.max(t,e.length),0)>e.maxLength&&(n.push(`Text is too long for entry ${s}`),i=true);let l=t[s+1];l&&r.endTime>l.startTime&&(n.push(`Overlapping cues for entry ${s}`),i=true),e.verbose&&i&&(console.warn(`Error for entry ${s}: ${r.text}`),console.warn(r),console.warn("--------------------------------"));}return n.length>0?e.silent||(console.log("Lint errors: "),console.log(n)):e.silent||console.log("No lint errors found"),n},u={stripXml:true,stripVoice:true,stripLang:true,stripStyle:true,stripMusic:true,stripSfx:true,stripSpeakerLabels:false,stripInlineSfx:false,stripWhitespace:true,stripNotes:true,stripMetadata:true,stripUndisplayed:true,sortCues:true,fixOverlaps:true},c=function(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},a={showZeroHours:true},h=t=>t.toString().padStart(2,"0"),g=(t,e)=>{let n=Math.round(1e3*t),s=Math.floor(n/36e5),r=Math.floor(n%36e5/6e4),i=Math.floor(n%6e4/1e3),l=n%1e3,o="";return (0!==s||e.showZeroHours)&&(o+=`${h(s)}:`),`${o}${h(r)}:${h(i)}.${u=l,u.toString().padStart(3,"0")}`;var u;},f=t=>t.toString().padStart(2,"0"),p=t=>{let e=Math.floor(t/3600),n=Math.floor(t%3600/60),s=Math.floor(t%60);return `${f(e)}:${f(n)}:${f(s)}`},m=t=>Math.round(100*t)/100,d=t=>{if(0===t.length)return {cue_count:0,duration_seconds:0,duration:p(0),shortest_cue_seconds:0,shortestCue:p(0),longest_cue_seconds:0,longestCue:p(0),average_cue_seconds:0,averageCue:p(0)};let e=t.reduce((t,e)=>t+e.endTime-e.startTime,0);e=m(e);let n=t.reduce((t,e)=>t<e.endTime-e.startTime?t:e.endTime-e.startTime,t[0].endTime-t[0].startTime);n=m(n);let s=t.reduce((t,e)=>t>e.endTime-e.startTime?t:e.endTime-e.startTime,t[0].endTime-t[0].startTime);s=m(s);let r=e/t.length;return r=m(r),{cue_count:t.length,duration_seconds:e,duration:p(e),shortest_cue_seconds:n,shortestCue:p(n),longest_cue_seconds:s,longestCue:p(s),average_cue_seconds:r,averageCue:p(r)}};class b{constructor(t,e=true){this.cues=t,this.showHours=e;}lint(t={}){return o(this.cues,t)}dialogue(){let t=this.cues.filter(t=>t.text[0]?.match(/^[-"'] .{2}/i));return new b(t,this.showHours)}isValid(){return 0===o(this.cues,{silent:true}).length}normalize(t={}){return this.cues=((t,e={})=>{const n={...u,...e};return n.stripXml&&(t=function(t=[]){return t.map(t=>(t.text=t.text.map(t=>t.replace(/<[^>]*>/g,"")),t))}(t)),n.stripLang&&(t=function(t=[]){return t.map(t=>(t.text=t.text.map(t=>t.replace(/<\/?lang[^>]*>/gi,"")),t))}(t)),n.stripStyle&&(t=function(t=[]){return t.map(t=>(delete t.attributes,t))}(t)),n.stripMusic&&(t=function(t=[]){return t.map(t=>(t.text=t.text.filter(t=>!/^[-\s]*[♪♫♬]/.test(t.trim())),t))}(t)),n.stripSfx&&(t=function(t=[]){return t.map(t=>(t.text=t.text.filter(t=>!/^[-\s]*[[(].*[\])]\s*$/.test(t.trim())),t))}(t)),n.stripSpeakerLabels&&(t=function(t=[]){return t.map(t=>(t.text=t.text.map(t=>t.replace(/^(\s*-?\s*)[[(][^\])]*[\])]\s*:?\s*(?=\S)/,"$1")),t))}(t)),n.stripInlineSfx&&(t=function(t=[]){return t.map(t=>(t.text=t.text.map(t=>t.replace(/[[(][^\])]*[\])]/g," ").replace(/\s{2,}/g," ").trim()).filter(t=>t.length>0),t))}(t)),n.stripVoice&&(t=function(t=[]){return t.map(t=>(t.text=t.text.map(t=>t.replace(/<\/?v(?=[\s.>])[^>]*>/gi,"")),t))}(t)),n.stripWhitespace&&(t=function(t=[]){return t.map(t=>(t.text=t.text.map(t=>t.replace(/[ \t\n\r]+/g," ").trim()).filter(t=>t.length>0),t))}(t)),n.stripNotes&&(t=function(t=[]){return t.map(t=>(delete t.label,t))}(t)),n.stripMetadata&&(t=function(t=[]){return t.map(t=>(/^[-\s]*{/.test(t.text[0]||"")?t.text=[]:t.text=t.text.filter(t=>!/^[-\s]*{.*}\s*$/.test(t)),t))}(t)),n.sortCues&&(t=[...t].sort((t,e)=>t.startTime-e.startTime)),n.fixOverlaps&&(t=(t=>{for(let e=0;e<t.length-1;e++){const n=t[e],s=t[e+1];n.endTime>s.startTime&&s.startTime-.001>n.startTime&&(n.endTime=s.startTime-.001);}return t})(t)),n.stripUndisplayed&&(t=(t=>t.filter(t=>!(t.startTime>=t.endTime||t.endTime<0)))(t)),t.filter(t=>t.text.length>0)})(this.cues,t),this}stats(){return d(this.cues)}duration(){return d(this.cues).duration_seconds}shift(t){var e,n;return this.cues=(e=this.cues,n=t,e.map(t=>(t.startTime=Math.max(0,t.startTime+n),t.endTime=Math.max(0,t.endTime+n),t))),this}minDuration(t){return this.cues=((t,e)=>{for(let n=0;n<t.length;n++){let s=t[n],r=s.startTime+e;if(s.endTime>=r)continue;let i=t[n+1],l=i?Math.min(r,i.startTime):r;l>s.endTime&&(s.endTime=l);}return t})(this.cues,t),this}maxDuration(t){return this.cues=((t,e)=>{for(let n=0;n<t.length;n++){let s=t[n];s.endTime-s.startTime>e&&(s.endTime=s.startTime+e);}return t})(this.cues,t),this}text(){return this.cues.map(t=>t.text.join("\n")).join("\n")}out(t={}){return ((t,e={})=>{let n={...a,...e},s="WEBVTT\n\n";for(let e=0;e<t.length;e++){let r=t[e];r.label&&(s+=`${r.label}\n`),s+=`${g(r.startTime,n)} --\x3e ${g(r.endTime,n)}`,r.attributes&&(s+=` ${r.attributes}`),s+=`\n${r.text.map(c).join("\n")}\n\n`;}return s.trim()})(this.cues,{showZeroHours:this.showHours,...t})}debug(){var t;return t=this.cues,console.log("--------------------------------"),console.log(d(t)),console.log("--------------------------------"),this}json(){return this.cues}}const T=Object.freeze({diffTimeout:1,diffEditCost:4,matchThreshold:.5,matchDistance:1e3,patchDeleteThreshold:.5,patchMargin:4,matchMaxBits:32}),x=-1;function w(t,e){return [t,e]}function $(t,e,n,s=true,r){const i=function(t){if(t?.__resolved)return t;const e={...T,...t};return Object.defineProperty(e,"__resolved",{value:true,enumerable:false}),e}(n);void 0===r&&(r=i.diffTimeout<=0?Number.MAX_VALUE:(new Date).getTime()+1e3*i.diffTimeout);const l=r;if(null==t||null==e)throw new Error("Null input. (diff_main)");if(t===e)return t?[w(0,t)]:[];const o=s;let u=M(t,e);const c=t.substring(0,u);u=v(t=t.substring(u),e=e.substring(u));const a=t.substring(t.length-u),h=function(t,e,n,s,r){let i;if(!t)return [w(1,e)];if(!e)return [w(x,t)];const l=t.length>e.length?t:e,o=t.length>e.length?e:t,u=l.indexOf(o);if(-1!==u)return i=[w(1,l.substring(0,u)),w(0,o),w(1,l.substring(u+o.length))],t.length>e.length&&(i[0][0]=i[2][0]=x),i;if(1===o.length)return [w(x,t),w(1,e)];const c=function(t,e,n){if(n.diffTimeout<=0)return null;const s=t.length>e.length?t:e,r=t.length>e.length?e:t;if(s.length<4||2*r.length<s.length)return null;function i(t,e,n){const s=t.substring(n,n+Math.floor(t.length/4));let r,i,l,o,u=-1,c="";for(;-1!==(u=e.indexOf(s,u+1));){const s=M(t.substring(n),e.substring(u)),a=v(t.substring(0,n),e.substring(0,u));c.length<a+s&&(c=e.substring(u-a,u)+e.substring(u,u+s),r=t.substring(0,n-a),i=t.substring(n+s),l=e.substring(0,u-a),o=e.substring(u+s));}return 2*c.length>=t.length?[r,i,l,o,c]:null}const l=i(s,r,Math.ceil(s.length/4)),o=i(s,r,Math.ceil(s.length/2));let u,c,a,h,g;if(!l&&!o)return null;u=o?l&&l[4].length>o[4].length?l:o:l,t.length>e.length?(c=u[0],a=u[1],h=u[2],g=u[3]):(h=u[0],g=u[1],c=u[2],a=u[3]);return [c,a,h,g,u[4]]}(t,e,n);if(c){const t=c[0],e=c[1],i=c[2],l=c[3],o=c[4],u=$(t,i,n,s,r),a=$(e,l,n,s,r);return u.concat([w(0,o)],a)}return s&&t.length>100&&e.length>100?function(t,e,n,s){const r=function(t,e){const n=[],s={};let r=4e4;function i(t){let e="",i=0,l=-1,o=n.length;for(;l<t.length-1;){l=t.indexOf("\n",i),-1===l&&(l=t.length-1);let u=t.substring(i,l+1);(s.hasOwnProperty?Object.prototype.hasOwnProperty.call(s,u):void 0!==s[u])?e+=String.fromCharCode(s[u]):(o===r&&(u=t.substring(i),l=t.length),e+=String.fromCharCode(o),s[u]=o,n[o++]=u),i=l+1;}return e}n[0]="";const l=i(t);r=65535;return {chars1:l,chars2:i(e),lineArray:n}}(t,e);t=r.chars1,e=r.chars2;const i=r.lineArray,l=$(t,e,n,false,s);((function(t,e){for(let n=0;n<t.length;n++){const s=t[n][1],r=[];for(let t=0;t<s.length;t++)r[t]=e[s.charCodeAt(t)];t[n][1]=r.join("");}}))(l,i),function(t){let e=false;const n=[];let s=0,r=null,i=0,l=0,o=0,u=0,c=0;for(;i<t.length;)0===t[i][0]?(n[s++]=i,l=u,o=c,u=0,c=0,r=t[i][1]):(1===t[i][0]?u+=t[i][1].length:c+=t[i][1].length,r&&r.length<=Math.max(l,o)&&r.length<=Math.max(u,c)&&(t.splice(n[s-1],0,w(x,r)),t[n[s-1]+1][0]=1,s--,s--,i=s>0?n[s-1]:-1,l=0,o=0,u=0,c=0,r=null,e=true)),i++;for(e&&I(t),function(t){function e(t,e){if(!t||!e)return 6;const n=t.charAt(t.length-1),s=e.charAt(0),r=n.match(A),i=s.match(A),l=r&&n.match(S),o=i&&s.match(S),u=l&&n.match(O),c=o&&s.match(O),a=u&&t.match(C),h=c&&e.match(E);return a||h?5:u||c?4:r&&!l&&o?3:l||o?2:r||i?1:0}let n=1;for(;n<t.length-1;){if(0===t[n-1][0]&&0===t[n+1][0]){let s=t[n-1][1],r=t[n][1],i=t[n+1][1];const l=v(s,r);if(l){const t=r.substring(r.length-l);s=s.substring(0,s.length-l),r=t+r.substring(0,r.length-l),i=t+i;}let o=s,u=r,c=i,a=e(s,r)+e(r,i);for(;r.charAt(0)===i.charAt(0);){s+=r.charAt(0),r=r.substring(1)+i.charAt(0),i=i.substring(1);const t=e(s,r)+e(r,i);t>=a&&(a=t,o=s,u=r,c=i);}t[n-1][1]!==o&&(o?t[n-1][1]=o:(t.splice(n-1,1),n--),t[n][1]=u,c?t[n+1][1]=c:(t.splice(n+1,1),n--));}n++;}}(t),i=1;i<t.length;){if(t[i-1][0]===x&&1===t[i][0]){const e=t[i-1][1],n=t[i][1],s=y(e,n),r=y(n,e);s>=r?(s>=e.length/2||s>=n.length/2)&&(t.splice(i,0,w(0,n.substring(0,s))),t[i-1][1]=e.substring(0,e.length-s),t[i+1][1]=n.substring(s),i++):(r>=e.length/2||r>=n.length/2)&&(t.splice(i,0,w(0,e.substring(0,r))),t[i-1][0]=1,t[i-1][1]=n.substring(0,n.length-r),t[i+1][0]=x,t[i+1][1]=e.substring(r),i++),i++;}i++;}}(l),l.push(w(0,""));let o=0,u=0,c=0,a="",h="";for(;o<l.length;){switch(l[o][0]){case 1:c++,h+=l[o][1];break;case x:u++,a+=l[o][1];break;case 0:if(u>=1&&c>=1){l.splice(o-u-c,u+c),o=o-u-c;const t=$(a,h,n,false,s);for(let e=t.length-1;e>=0;e--)l.splice(o,0,t[e]);o+=t.length;}c=0,u=0,a="",h="";}o++;}return l.pop(),l}(t,e,n,r):function(t,e,n,s){const r=t.length,i=e.length,l=Math.ceil((r+i)/2),o=l,u=2*l,c=new Array(u),a=new Array(u);for(let t=0;t<u;t++)c[t]=-1,a[t]=-1;c[o+1]=0,a[o+1]=0;const h=r-i,g=h%2!=0;let f=0,p=0,m=0,d=0;for(let b=0;b<l&&!((new Date).getTime()>s);b++){for(let l=-b+f;l<=b-p;l+=2){const m=o+l;let d;d=l===-b||l!==b&&c[m-1]<c[m+1]?c[m+1]:c[m-1]+1;let T=d-l;for(;d<r&&T<i&&t.charAt(d)===e.charAt(T);)d++,T++;if(c[m]=d,d>r)p+=2;else if(T>i)f+=2;else if(g){const i=o+h-l;if(i>=0&&i<u&&-1!==a[i]&&d>=r-a[i])return _(t,e,n,d,T,s)}}for(let l=-b+m;l<=b-d;l+=2){const f=o+l;let p;p=l===-b||l!==b&&a[f-1]<a[f+1]?a[f+1]:a[f-1]+1;let T=p-l;for(;p<r&&T<i&&t.charAt(r-p-1)===e.charAt(i-T-1);)p++,T++;if(a[f]=p,p>r)d+=2;else if(T>i)m+=2;else if(!g){const i=o+h-l;if(i>=0&&i<u&&-1!==c[i]){const l=c[i];if(p=r-p,l>=p)return _(t,e,n,l,o+l-i,s)}}}}return [w(x,t),w(1,e)]}(t,e,n,r)}(t=t.substring(0,t.length-u),e=e.substring(0,e.length-u),i,o,l);return c&&h.unshift(w(0,c)),a&&h.push(w(0,a)),I(h),h}function _(t,e,n,s,r,i){const l=t.substring(0,s),o=e.substring(0,r),u=t.substring(s),c=e.substring(r),a=$(l,o,n,false,i),h=$(u,c,n,false,i);return a.concat(h)}function M(t,e){if(!t||!e||t.charAt(0)!==e.charAt(0))return 0;let n=0,s=Math.min(t.length,e.length),r=s,i=0;for(;n<r;)t.substring(i,r)===e.substring(i,r)?(n=r,i=n):s=r,r=Math.floor((s-n)/2+n);return r}function v(t,e){if(!t||!e||t.charAt(t.length-1)!==e.charAt(e.length-1))return 0;let n=0,s=Math.min(t.length,e.length),r=s,i=0;for(;n<r;)t.substring(t.length-r,t.length-i)===e.substring(e.length-r,e.length-i)?(n=r,i=n):s=r,r=Math.floor((s-n)/2+n);return r}function y(t,e){const n=t.length,s=e.length;if(0===n||0===s)return 0;n>s?t=t.substring(n-s):n<s&&(e=e.substring(0,n));const r=Math.min(n,s);if(t===e)return r;let i=0,l=1;for(;;){const n=t.substring(r-l),s=e.indexOf(n);if(-1===s)return i;l+=s,0!==s&&t.substring(r-l)!==e.substring(0,l)||(i=l,l++);}}const A=/[^a-z0-9]/i,S=/\s/,O=/[\r\n]/,C=/\n\r?\n$/,E=/^\r?\n\r?\n/;function I(t){t.push(w(0,""));let e,n=0,s=0,r=0,i="",l="";for(;n<t.length;)switch(t[n][0]){case 1:r++,l+=t[n][1],n++;break;case x:s++,i+=t[n][1],n++;break;case 0:s+r>1?(0!==s&&0!==r&&(e=M(l,i),0!==e&&(n-s-r>0&&0===t[n-s-r-1][0]?t[n-s-r-1][1]+=l.substring(0,e):(t.splice(0,0,w(0,l.substring(0,e))),n++),l=l.substring(e),i=i.substring(e)),e=v(l,i),0!==e&&(t[n][1]=l.substring(l.length-e)+t[n][1],l=l.substring(0,l.length-e),i=i.substring(0,i.length-e))),n-=s+r,t.splice(n,s+r),i.length&&(t.splice(n,0,w(x,i)),n++),l.length&&(t.splice(n,0,w(1,l)),n++),n++):0!==n&&0===t[n-1][0]?(t[n-1][1]+=t[n][1],t.splice(n,1)):n++,r=0,s=0,i="",l="";}""===t[t.length-1][1]&&t.pop();let o=false;for(n=1;n<t.length-1;)0===t[n-1][0]&&0===t[n+1][0]&&(t[n][1].substring(t[n][1].length-t[n-1][1].length)===t[n-1][1]?(t[n][1]=t[n-1][1]+t[n][1].substring(0,t[n][1].length-t[n-1][1].length),t[n+1][1]=t[n-1][1]+t[n+1][1],t.splice(n-1,1),o=true):t[n][1].substring(0,t[n+1][1].length)===t[n+1][1]&&(t[n-1][1]+=t[n+1][1],t[n][1]=t[n][1].substring(t[n+1][1].length)+t[n+1][1],t.splice(n+1,1),o=true)),n++;o&&I(t);}const j=t=>"[2m"+t+"[0m";"undefined"==typeof process&&(window.process={},process.stdout=process.stdout||{},process.stdout.write=function(t){console.log(t);});const z={context_size:40},H={context_size:40,green_color:"#64a166",red_color:"#b54545",yellow_color:"#dbda81"},V=function(t){const e=[];let n=0;for(const[s,r]of t)0!==s&&e.push({op:s,text:r,pos:n}),1!==s&&(n+=r.length);return e},D={minGap:2};class N{constructor(t=""){this.input=t;let{cues:n,hasHours:l}=function(t){const n=t.trim().split("\n");if(1===n.length&&""===n[0])return {cues:[],hasHours:false};if(!n[0].includes("WEBVTT")){if(n.some(t=>r.test(t)))throw new Error("Invalid WebVTT format - missing WEBVTT header. If this is an SRT file, convert it first:  ffmpeg -i file.srt file.vtt");throw new Error("Invalid WebVTT format")}const l=[];let o=null,u=null,c=false,a=true;for(let t=1;t<n.length;t++){const h=n[t].trim();h?r.test(h)?(o&&l.push(o),a=false,o=s(h),/^\d{1,2}:\d{2}:\d{2}/.test(h.split("--\x3e")[0].trim())&&(c=true),u&&(o.label=u,u=null)):o?o.text.push(e(h)):i.test(h)?(a=true,u=null):a||(null===u?u=h:(a=true,u=null)):(o&&l.push(o),o=null,u=null,a=false);}return o&&l.push(o),{cues:l,hasHours:c}}(t);this.cues=new b(n,l);}lint(t={}){return this.cues.lint(t)}dialogue(){return this.cues.dialogue()}normalize(t={}){return this.cues=this.cues.normalize(t),this}stats(){return this.cues.stats()}duration(){return this.cues.duration()}text(){return this.cues.text()}out(t={}){return this.cues.out(t)}json(){return this.cues.json()}isValid(){return this.cues.isValid()}scenes(t={}){return ((t,e={})=>{let n={...D,...e};const s=[];let r=[];for(let e=0;e<t.length;e++){r.push(t[e]);const i=t[e+1];i&&i.startTime-t[e].endTime>=n.minGap&&(s.push(r),r=[]);}return r.length>0&&s.push(r),s})(this.cues.cues,t).map(t=>new b(t,this.cues.showHours))}shift(t){return this.cues=this.cues.shift(t),this}minDuration(t){return this.cues=this.cues.minDuration(t),this}maxDuration(t){return this.cues=this.cues.maxDuration(t),this}diffHtml(){let t=this.out();return function(t,e,n){let s=$(t,e);return function(t,e,n={}){const s=Object.assign({},H,n);let r="";return t.forEach((t,n)=>{let{op:i,text:l,pos:o}=t;const u=Math.max(0,o-s.context_size),c=e.slice(u,o),a=e.slice(t.pos+(-1===t.op?t.text.length:0),t.pos+s.context_size);r+='<div class="diff-each">',r+=`<span class='diff-before'>${c}</span>\n`,r+=-1===i?`<span class='diff diff-minus' style="color:${s.red_color}">-${l}</span>\n`:1===i?`<span class='diff diff-plus' style="color:${s.green_color}">+${l}</span>\n`:`<span class='diff diff-change' style="color:${s.yellow_color}"> ${l}</span>\n`,r+=`<span class='diff-after'>${a}</span>\n`,r+="</div>";}),'<div class="diff-container">\n'+r+"\n</div>"}(V(s),t,n)}(this.input,t)}diffCli(){let t=this.out();return function(t,e,n){let s=$(t,e);!function(t,e,n={}){const s=Object.assign({},z,n);t.forEach((t,n)=>{let{op:r,text:i,pos:l}=t;process.stdout.write("\n");const o=Math.max(0,l-s.context_size),u=e.slice(o,l),c=e.slice(t.pos+(-1===t.op?t.text.length:0),t.pos+s.context_size);process.stdout.write(j(u)),-1===r?process.stdout.write("[31m-"+i+"[0m"):1===r?process.stdout.write("[32m+"+i+"[0m"):process.stdout.write((t=>"[33m"+t+"[0m")(" "+i)),process.stdout.write(j(c));}),process.stdout.write("\n\n\n");}(V(s),t,n);}(this.input,t)}}const L=function(t=""){return new N(t)};

  const isObject = val => Object.prototype.toString.call(val) === '[object Object]';

  // combine one result per cue into a single result, decided by its type
  const merge = function (res, wrap) {
    // .map() returns an empty view for a cue with no matches, so views are set aside
    const vals = res.filter(r => r !== undefined && r !== null && !r.isView);
    if (vals.length === 0) {
      if (!res.some(r => r?.isView)) {
        return undefined
      }
      // stay chainable, and keep one view per cue
      return wrap.update(res.map((r, i) => (r?.isView ? r : wrap.views[i].none())))
    }
    const first = vals[0];
    // shared by all cues, like .world
    if (typeof first === 'object' && vals.every(v => v === first)) {
      return first
    }
    if (Array.isArray(first)) {
      return vals.flat(1)
    }
    if (typeof first === 'string') {
      return vals.filter(Boolean).join(' ')
    }
    if (typeof first === 'number') {
      return vals.reduce((sum, n) => sum + n, 0)
    }
    if (typeof first === 'boolean') {
      return vals.some(Boolean)
    }
    // key-by-key, like .groups() or .sweep()
    if (isObject(first)) {
      const keys = [...new Set(vals.flatMap(o => Object.keys(o)))];
      return Object.fromEntries(keys.map(k => [k, merge(res.map(r => r?.[k]), wrap)]))
    }
    return first
  };

  // give a callback one running index, across every cue
  const running = function (cb) {
    let i = 0;
    return m => {
      i += 1;
      return cb(m, i - 1)
    }
  };

  // call each cue, while counting any `n` param across all of them.
  // wrap.verbs(2) is the 3rd verb overall, not the 3rd verb of every cue.
  // each `n` funnels through getNth() or get(), so we borrow those methods during this call
  const acrossCues = function (views, nums, cb) {
    let proto = views[0];
    while (!Object.hasOwn(proto, 'getNth')) {
      proto = Object.getPrototypeOf(proto);
    }
    const { getNth, get } = proto;
    let seen = 0;
    let isDone = false;
    const counted = fn =>
      function (n) {
        // only the user's number, and only once - sentences().toPast(0) calls verbs(0) internally
        if (isDone || !nums.includes(n)) {
          return fn.call(this, n)
        }
        isDone = true;
        const m = this.eq(n - seen);
        seen += this.length;
        return m
      };
    proto.getNth = counted(getNth);
    proto.get = counted(get);
    try {
      return views.map((view, i) => {
        isDone = false;
        return cb(view, i)
      })
    } finally {
      proto.getNth = getNth;
      proto.get = get;
    }
  };

  const freqFmts = new Set(['freq', 'frequency', 'topk']);
  // these numbers are values, not positions - and they call val.get(0) internally
  const compares = new Set(['isEqual', 'equals', 'greaterThan', 'lessThan', 'between', 'isBetween']);

  // run a View method on every cue, and combine the results
  const forward = function (wrap, prop, args) {
    const call = (view, i) => {
      // a WrapDoc param gives each cue its own view
      const params = args.map(a => (a?.views ? a.views[i] : a));
      return view[prop](...params)
    };
    const nums = args.filter(a => typeof a === 'number');
    if (nums.length === 0 || compares.has(prop)) {
      return merge(wrap.views.map(call), wrap)
    }
    return merge(acrossCues(wrap.views, nums, call), wrap)
  };

  const handler = {
    get(target, prop, receiver) {
      // methods on this class win - but not Object's, like .toLocaleString()
      if (typeof prop === 'symbol' || target[prop] !== Object.prototype[prop]) {
        return Reflect.get(target, prop, receiver)
      }
      // anything else is looked up on the cues, so subclasses and plugin methods all work
      if (typeof target.views[0]?.[prop] === 'function') {
        return (...args) => forward(receiver, prop, args)
      }
      // a plain property, like .found or .length
      return merge(target.views.map(v => v[prop]), receiver)
    },
  };

  /** treat a list of docs as if they were one doc */
  class WrapDoc {
    // one view per cue - at least one, so use nlp('') for an empty file.
    // selections keep this shape, with an empty view for any cue without a match
    constructor(views) {
      this.views = views;
      return new Proxy(this, handler)
    }
    // overload this, to carry along extra data like timestamps
    update(views) {
      return new this.constructor(views)
    }
    get viewType() {
      return this.views[0].viewType
    }

    // ---these count across all cues, not within each one---
    filter(cb) {
      const fn = running(cb);
      return this.update(this.views.map(v => v.filter(fn)))
    }
    forEach(cb) {
      const fn = running(cb);
      this.views.forEach(v => v.forEach(fn));
      return this
    }
    map(cb, empty) {
      const fn = running(cb);
      return merge(this.views.map(v => v.map(fn, empty)), this)
    }
    some(cb) {
      const fn = running(cb);
      return this.views.some(v => v.some(fn))
    }
    find(cb) {
      let done = false;
      return this.filter((m, i) => {
        if (done) {
          return false
        }
        done = Boolean(cb(m, i));
        return done
      })
    }
    eq(n) {
      return this.filter((_m, i) => i === n)
    }
    // an alias of .eq(), unless a subclass like Numbers has its own
    get(n) {
      const view = this.views[0];
      return view.get === view.eq ? this.eq(n) : forward(this, 'get', [n])
    }
    first() {
      return this.eq(0)
    }
    last() {
      return this.eq(this.length - 1)
    }
    slice(start, end) {
      const keep = new Set([...Array(this.length).keys()].slice(start, end));
      return this.filter((_m, i) => keep.has(i))
    }
    random(n = 1) {
      const max = Math.max(this.length - n, 0);
      const start = Math.floor(Math.random() * (max + 1));
      return this.slice(start, start + n)
    }
    terms(n) {
      const m = this.match('.');
      return typeof n === 'number' ? m.eq(n) : m
    }
    matchOne(...args) {
      return this.match(...args).first()
    }
    json(n) {
      if (typeof n === 'number') {
        return forward(this, 'json', [])[n]
      }
      return forward(this, 'json', [n])
    }
    unique() {
      const seen = new Set();
      return this.filter(m => {
        const txt = m.text('machine');
        const isNew = !seen.has(txt);
        seen.add(txt);
        return isNew
      })
    }
    // on its own, a cue without a match would return itself, and get selected
    replace(match, input, keep) {
      if (match && !input) {
        return this.replaceWith(match, keep)
      }
      const m = this.match(match);
      if (!m.found) {
        return this
      }
      this.soften();
      return m.replaceWith(input, keep)
    }
    // new text goes on the end of the last cue
    concat(input) {
      if (input instanceof WrapDoc) {
        return forward(this, 'concat', [input])
      }
      const last = this.views.length - 1;
      return this.update(this.views.map((v, i) => (i === last ? v.concat(input) : v.all())))
    }

    // ---these can't be combined by type alone---
    isFull() {
      return this.views.every(v => v.isFull())
    }
    isDoc(b) {
      return b instanceof WrapDoc && this.views.every((v, i) => v.isDoc(b.views[i]))
    }
    // an average over every term, not a sum of the cues
    confidence() {
      const terms = this.docs.flat();
      if (terms.length === 0) {
        return 1
      }
      const sum = terms.reduce((n, term) => n + (term.confidence || 1), 0);
      return Math.round((sum / terms.length) * 100) / 100
    }
    out(fmt) {
      if (!freqFmts.has(fmt)) {
        return forward(this, 'out', [fmt])
      }
      // counts must be added across cues
      const counts = new Map();
      this.json({ normal: true }).forEach(({ normal }) => {
        counts.set(normal, (counts.get(normal) ?? 0) + 1);
      });
      const res = Array.from(counts, ([normal, count]) => ({ normal, count }));
      return res.sort((a, b) => b.count - a.count)
    }
  }

  // a blank line would end the cue early, and corrupt the file
  const toLines = str => {
    return str
      .split('\n')
      .map(line => line.trim())
      .filter(line => line)
  };

  /** a doc for each cue in a subtitle file */
  class SubtitleDoc extends WrapDoc {
    constructor(views, vtt) {
      super(views);
      this.vtt = vtt;
    }
    update(views) {
      return new SubtitleDoc(views, this.vtt)
    }
    // timing and labels - .cues[i] is the data for .views[i]
    get cues() {
      return this.vtt.json()
    }
    /** produce the whole subtitle file, including any changes to the text */
    toSubtitle(opts) {
      this.cues.forEach((cue, i) => {
        cue.text = toLines(this.views[i].all().text());
      });
      return this.vtt.out(opts)
    }
  }

  // a new speaker, rather than a long line wrapping around
  const newSpeaker = /^(?:[-–—]|>>)/;
  // broadcast captions mark a speaker like this, and the tagger would read it as a word
  const speakerMark = /^>{2,}\s*(?=\S)/;

  // the lines of a cue are only display-wrapping, so they are parsed as one text.
  // each wrap is kept as whitespace on the term before it, so it's written back out the same
  const parseLines = function (nlp, lines) {
    let str = '';
    const wraps = new Set();
    const marks = new Map();
    lines.forEach((line, i) => {
      if (i > 0 && newSpeaker.test(line)) {
        str += '\n';
      } else if (i > 0) {
        wraps.add(str.length);
        str += ' ';
      }
      const mark = line.match(speakerMark)?.[0] || '';
      if (mark) {
        marks.set(str.length, mark);
      }
      str += line.slice(mark.length);
    });
    const doc = nlp(str);
    let pos = 0;
    doc.docs.flat().forEach(term => {
      const start = pos;
      pos += term.pre.length + term.text.length + term.post.length;
      if (marks.has(start)) {
        term.pre = marks.get(start) + term.pre;
      }
      if (wraps.has(pos - 1) && term.post.endsWith(' ')) {
        term.post = `${term.post.slice(0, -1)}\n`;
      }
    });
    return doc
  };

  /** parse a subtitle file, into a doc for each cue */
  const fromSubtitle = function (txt) {
    const vtt = L(txt);
    const views = vtt.json().map(cue => parseLines(this, cue.text));
    // a file with no cues still needs one doc to wrap
    if (views.length === 0) {
      views.push(this(''));
    }
    return new SubtitleDoc(views, vtt)
  };

  const plugin = {
    version,
    lib: { fromSubtitle },
  };

  return plugin;

}));
