var ih=Object.defineProperty;var nh=(s,e,t)=>e in s?ih(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var y=(s,e,t)=>nh(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Aa="160",sh=0,Ja=1,rh=2,ec=1,ah=2,_i=3,xi=0,zt=1,Ot=2,Pi=0,Tn=1,Ka=2,Qa=3,eo=4,oh=5,Vi=100,lh=101,ch=102,to=103,io=104,hh=200,uh=201,dh=202,fh=203,ca=204,ha=205,ph=206,mh=207,gh=208,vh=209,_h=210,yh=211,xh=212,Sh=213,Mh=214,bh=0,Eh=1,Ah=2,tr=3,wh=4,Th=5,Ch=6,Rh=7,tc=0,Ph=1,Lh=2,Li=0,Ih=1,Dh=2,Uh=3,Fh=4,Nh=5,Oh=6,ic=300,Pn=301,Ln=302,ua=303,da=304,fr=306,fa=1e3,Ut=1001,pa=1002,Dt=1003,no=1004,Er=1005,Nt=1006,Bh=1007,is=1008,Ii=1009,zh=1010,kh=1011,wa=1012,nc=1013,Ci=1014,Ri=1015,ns=1016,sc=1017,rc=1018,Xi=1020,Gh=1021,ei=1023,Vh=1024,Hh=1025,qi=1026,In=1027,Wh=1028,ac=1029,Xh=1030,oc=1031,lc=1033,Ar=33776,wr=33777,Tr=33778,Cr=33779,so=35840,ro=35841,ao=35842,oo=35843,cc=36196,lo=37492,co=37496,ho=37808,uo=37809,fo=37810,po=37811,mo=37812,go=37813,vo=37814,_o=37815,yo=37816,xo=37817,So=37818,Mo=37819,bo=37820,Eo=37821,Rr=36492,Ao=36494,wo=36495,qh=36283,To=36284,Co=36285,Ro=36286,hc=3e3,ji=3001,jh=3200,Yh=3201,uc=0,$h=1,$t="",nt="srgb",Si="srgb-linear",Ta="display-p3",pr="display-p3-linear",ir="linear",it="srgb",nr="rec709",sr="p3",Ki=7680,Po=519,Zh=512,Jh=513,Kh=514,dc=515,Qh=516,eu=517,tu=518,iu=519,ma=35044,Lo="300 es",ga=1035,yi=2e3,rr=2001;class Un{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const n=this._listeners[e];if(n!==void 0){const r=n.indexOf(t);r!==-1&&n.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const n=i.slice(0);for(let r=0,a=n.length;r<a;r++)n[r].call(this,e);e.target=null}}}const wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Io=1234567;const Yn=Math.PI/180,ss=180/Math.PI;function ci(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(wt[s&255]+wt[s>>8&255]+wt[s>>16&255]+wt[s>>24&255]+"-"+wt[e&255]+wt[e>>8&255]+"-"+wt[e>>16&15|64]+wt[e>>24&255]+"-"+wt[t&63|128]+wt[t>>8&255]+"-"+wt[t>>16&255]+wt[t>>24&255]+wt[i&255]+wt[i>>8&255]+wt[i>>16&255]+wt[i>>24&255]).toLowerCase()}function bt(s,e,t){return Math.max(e,Math.min(t,s))}function Ca(s,e){return(s%e+e)%e}function nu(s,e,t,i,n){return i+(s-e)*(n-i)/(t-e)}function su(s,e,t){return s!==e?(t-s)/(e-s):0}function $n(s,e,t){return(1-t)*s+t*e}function ru(s,e,t,i){return $n(s,e,1-Math.exp(-t*i))}function au(s,e=1){return e-Math.abs(Ca(s,e*2)-e)}function ou(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function lu(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function cu(s,e){return s+Math.floor(Math.random()*(e-s+1))}function hu(s,e){return s+Math.random()*(e-s)}function uu(s){return s*(.5-Math.random())}function du(s){s!==void 0&&(Io=s);let e=Io+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function fu(s){return s*Yn}function pu(s){return s*ss}function va(s){return(s&s-1)===0&&s!==0}function mu(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function ar(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function gu(s,e,t,i,n){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),h=a((e+i)/2),u=r((e-i)/2),d=a((e-i)/2),f=r((i-e)/2),g=a((i-e)/2);switch(n){case"XYX":s.set(o*h,l*u,l*d,o*c);break;case"YZY":s.set(l*d,o*h,l*u,o*c);break;case"ZXZ":s.set(l*u,l*d,o*h,o*c);break;case"XZX":s.set(o*h,l*g,l*f,o*c);break;case"YXY":s.set(l*f,o*h,l*g,o*c);break;case"ZYZ":s.set(l*g,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function li(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Je(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Ct={DEG2RAD:Yn,RAD2DEG:ss,generateUUID:ci,clamp:bt,euclideanModulo:Ca,mapLinear:nu,inverseLerp:su,lerp:$n,damp:ru,pingpong:au,smoothstep:ou,smootherstep:lu,randInt:cu,randFloat:hu,randFloatSpread:uu,seededRandom:du,degToRad:fu,radToDeg:pu,isPowerOfTwo:va,ceilPowerOfTwo:mu,floorPowerOfTwo:ar,setQuaternionFromProperEuler:gu,normalize:Je,denormalize:li};class Z{constructor(e=0,t=0){Z.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(bt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),n=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*n+e.x,this.y=r*n+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qe{constructor(e,t,i,n,r,a,o,l,c){qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,a,o,l,c)}set(e,t,i,n,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=n,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],f=i[5],g=i[8],_=n[0],m=n[3],p=n[6],M=n[1],v=n[4],b=n[7],L=n[2],C=n[5],R=n[8];return r[0]=a*_+o*M+l*L,r[3]=a*m+o*v+l*C,r[6]=a*p+o*b+l*R,r[1]=c*_+h*M+u*L,r[4]=c*m+h*v+u*C,r[7]=c*p+h*b+u*R,r[2]=d*_+f*M+g*L,r[5]=d*m+f*v+g*C,r[8]=d*p+f*b+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-i*r*h+i*o*l+n*r*c-n*a*l}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,g=t*u+i*d+n*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(n*c-h*i)*_,e[2]=(o*i-n*a)*_,e[3]=d*_,e[4]=(h*t-n*l)*_,e[5]=(n*r-o*t)*_,e[6]=f*_,e[7]=(i*l-c*t)*_,e[8]=(a*t-i*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-n*c,n*l,-n*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Pr.makeScale(e,t)),this}rotate(e){return this.premultiply(Pr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Pr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<9;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Pr=new qe;function fc(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function rs(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function vu(){const s=rs("canvas");return s.style.display="block",s}const Do={};function Zn(s){s in Do||(Do[s]=!0,console.warn(s))}const Uo=new qe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Fo=new qe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ps={[Si]:{transfer:ir,primaries:nr,toReference:s=>s,fromReference:s=>s},[nt]:{transfer:it,primaries:nr,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[pr]:{transfer:ir,primaries:sr,toReference:s=>s.applyMatrix3(Fo),fromReference:s=>s.applyMatrix3(Uo)},[Ta]:{transfer:it,primaries:sr,toReference:s=>s.convertSRGBToLinear().applyMatrix3(Fo),fromReference:s=>s.applyMatrix3(Uo).convertLinearToSRGB()}},_u=new Set([Si,pr]),Ke={enabled:!0,_workingColorSpace:Si,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!_u.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;const i=ps[e].toReference,n=ps[t].fromReference;return n(i(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return ps[s].primaries},getTransfer:function(s){return s===$t?ir:ps[s].transfer}};function Cn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Lr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Qi;class pc{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Qi===void 0&&(Qi=rs("canvas")),Qi.width=e.width,Qi.height=e.height;const i=Qi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Qi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=rs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const n=i.getImageData(0,0,e.width,e.height),r=n.data;for(let a=0;a<r.length;a++)r[a]=Cn(r[a]/255)*255;return i.putImageData(n,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Cn(t[i]/255)*255):t[i]=Cn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let yu=0;class mc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:yu++}),this.uuid=ci(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let a=0,o=n.length;a<o;a++)n[a].isDataTexture?r.push(Ir(n[a].image)):r.push(Ir(n[a]))}else r=Ir(n);i.url=r}return t||(e.images[this.uuid]=i),i}}function Ir(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?pc.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let xu=0;class Ft extends Un{constructor(e=Ft.DEFAULT_IMAGE,t=Ft.DEFAULT_MAPPING,i=Ut,n=Ut,r=Nt,a=is,o=ei,l=Ii,c=Ft.DEFAULT_ANISOTROPY,h=$t){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xu++}),this.uuid=ci(),this.name="",this.source=new mc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Z(0,0),this.repeat=new Z(1,1),this.center=new Z(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Zn("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===ji?nt:$t),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ic)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case fa:e.x=e.x-Math.floor(e.x);break;case Ut:e.x=e.x<0?0:1;break;case pa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case fa:e.y=e.y-Math.floor(e.y);break;case Ut:e.y=e.y<0?0:1;break;case pa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Zn("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===nt?ji:hc}set encoding(e){Zn("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===ji?nt:$t}}Ft.DEFAULT_IMAGE=null;Ft.DEFAULT_MAPPING=ic;Ft.DEFAULT_ANISOTROPY=1;class st{constructor(e=0,t=0,i=0,n=1){st.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*n+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*n+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*n+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*n+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,b=(f+1)/2,L=(p+1)/2,C=(h+d)/4,R=(u+_)/4,F=(g+m)/4;return v>b&&v>L?v<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(v),n=C/i,r=R/i):b>L?b<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(b),i=C/n,r=F/n):L<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(L),i=R/r,n=F/r),this.set(i,n,r,t),this}let M=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-_)/M,this.z=(d-h)/M,this.w=Math.acos((c+f+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Su extends Un{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new st(0,0,e,t),this.scissorTest=!1,this.viewport=new st(0,0,e,t);const n={width:e,height:t,depth:1};i.encoding!==void 0&&(Zn("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===ji?nt:$t),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Ft(n,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new mc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Yi extends Su{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class gc extends Ft{constructor(e=null,t=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=Ut,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Mu extends Ft{constructor(e=null,t=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=Ut,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $i{constructor(e=0,t=0,i=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=n}static slerpFlat(e,t,i,n,r,a,o){let l=i[n+0],c=i[n+1],h=i[n+2],u=i[n+3];const d=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==d||c!==f||h!==g){let m=1-o;const p=l*d+c*f+h*g+u*_,M=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){const L=Math.sqrt(v),C=Math.atan2(L,p*M);m=Math.sin(m*C)/L,o=Math.sin(o*C)/L}const b=o*M;if(l=l*m+d*b,c=c*m+f*b,h=h*m+g*b,u=u*m+_*b,m===1-o){const L=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=L,c*=L,h*=L,u*=L}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,n,r,a){const o=i[n],l=i[n+1],c=i[n+2],h=i[n+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-o*f,e[t+2]=c*g+h*f+o*d-l*u,e[t+3]=h*g-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,n=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(n/2),u=o(r/2),d=l(i/2),f=l(n/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],n=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=i+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-n)*f}else if(i>o&&i>u){const f=2*Math.sqrt(1+i-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(n+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-i-u);this._w=(r-c)/f,this._x=(n+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-i-o);this._w=(a-n)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(bt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const n=Math.min(1,t/i);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,n=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+a*o+n*c-r*l,this._y=n*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-n*o,this._w=a*h-i*o-n*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,n=this._y,r=this._z,a=this._w;let o=a*e._w+i*e._x+n*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=n,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*i+t*this._x,this._y=f*n+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=a*u+this._w*d,this._x=i*u+this._x*d,this._y=n*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),n=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(n),i*Math.sin(r),i*Math.cos(r),t*Math.sin(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class T{constructor(e=0,t=0,i=0){T.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(No.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(No.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*n,this.y=r[1]*t+r[4]*i+r[7]*n,this.z=r[2]*t+r[5]*i+r[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*n+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*n+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*n+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,n=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*n-o*i),h=2*(o*t-r*n),u=2*(r*i-a*t);return this.x=t+l*c+a*u-o*h,this.y=i+l*h+o*c-r*u,this.z=n+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*n,this.y=r[1]*t+r[5]*i+r[9]*n,this.z=r[2]*t+r[6]*i+r[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,n=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=n*l-r*o,this.y=r*a-i*l,this.z=i*o-n*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Dr.copy(this).projectOnVector(e),this.sub(Dr)}reflect(e){return this.sub(Dr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(bt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Dr=new T,No=new $i;class cs{constructor(e=new T(1/0,1/0,1/0),t=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Zt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Zt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Zt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Zt):Zt.fromBufferAttribute(r,a),Zt.applyMatrix4(e.matrixWorld),this.expandByPoint(Zt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ms.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ms.copy(i.boundingBox)),ms.applyMatrix4(e.matrixWorld),this.union(ms)}const n=e.children;for(let r=0,a=n.length;r<a;r++)this.expandByObject(n[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Zt),Zt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(On),gs.subVectors(this.max,On),en.subVectors(e.a,On),tn.subVectors(e.b,On),nn.subVectors(e.c,On),Mi.subVectors(tn,en),bi.subVectors(nn,tn),Oi.subVectors(en,nn);let t=[0,-Mi.z,Mi.y,0,-bi.z,bi.y,0,-Oi.z,Oi.y,Mi.z,0,-Mi.x,bi.z,0,-bi.x,Oi.z,0,-Oi.x,-Mi.y,Mi.x,0,-bi.y,bi.x,0,-Oi.y,Oi.x,0];return!Ur(t,en,tn,nn,gs)||(t=[1,0,0,0,1,0,0,0,1],!Ur(t,en,tn,nn,gs))?!1:(vs.crossVectors(Mi,bi),t=[vs.x,vs.y,vs.z],Ur(t,en,tn,nn,gs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Zt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Zt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const fi=[new T,new T,new T,new T,new T,new T,new T,new T],Zt=new T,ms=new cs,en=new T,tn=new T,nn=new T,Mi=new T,bi=new T,Oi=new T,On=new T,gs=new T,vs=new T,Bi=new T;function Ur(s,e,t,i,n){for(let r=0,a=s.length-3;r<=a;r+=3){Bi.fromArray(s,r);const o=n.x*Math.abs(Bi.x)+n.y*Math.abs(Bi.y)+n.z*Math.abs(Bi.z),l=e.dot(Bi),c=t.dot(Bi),h=i.dot(Bi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const bu=new cs,Bn=new T,Fr=new T;class hs{constructor(e=new T,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):bu.setFromPoints(e).getCenter(i);let n=0;for(let r=0,a=e.length;r<a;r++)n=Math.max(n,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Bn.subVectors(e,this.center);const t=Bn.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),n=(i-this.radius)*.5;this.center.addScaledVector(Bn,n/i),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Fr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Bn.copy(e.center).add(Fr)),this.expandByPoint(Bn.copy(e.center).sub(Fr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const pi=new T,Nr=new T,_s=new T,Ei=new T,Or=new T,ys=new T,Br=new T;class mr{constructor(e=new T,t=new T(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,pi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=pi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(pi.copy(this.origin).addScaledVector(this.direction,t),pi.distanceToSquared(e))}distanceSqToSegment(e,t,i,n){Nr.copy(e).add(t).multiplyScalar(.5),_s.copy(t).sub(e).normalize(),Ei.copy(this.origin).sub(Nr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(_s),o=Ei.dot(this.direction),l=-Ei.dot(_s),c=Ei.lengthSq(),h=Math.abs(1-a*a);let u,d,f,g;if(h>0)if(u=a*l-o,d=a*o-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),n&&n.copy(Nr).addScaledVector(_s,d),f}intersectSphere(e,t){pi.subVectors(e.center,this.origin);const i=pi.dot(this.direction),n=pi.dot(pi)-i*i,r=e.radius*e.radius;if(n>r)return null;const a=Math.sqrt(r-n),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,n,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,n=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,n=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),i>a||r>n||((r>i||isNaN(i))&&(i=r),(a<n||isNaN(n))&&(n=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),i>l||o>n)||((o>i||i!==i)&&(i=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,t)}intersectsBox(e){return this.intersectBox(e,pi)!==null}intersectTriangle(e,t,i,n,r){Or.subVectors(t,e),ys.subVectors(i,e),Br.crossVectors(Or,ys);let a=this.direction.dot(Br),o;if(a>0){if(n)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ei.subVectors(this.origin,e);const l=o*this.direction.dot(ys.crossVectors(Ei,ys));if(l<0)return null;const c=o*this.direction.dot(Or.cross(Ei));if(c<0||l+c>a)return null;const h=-o*Ei.dot(Br);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rt{constructor(e,t,i,n,r,a,o,l,c,h,u,d,f,g,_,m){rt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,a,o,l,c,h,u,d,f,g,_,m)}set(e,t,i,n,r,a,o,l,c,h,u,d,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=n,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,n=1/sn.setFromMatrixColumn(e,0).length(),r=1/sn.setFromMatrixColumn(e,1).length(),a=1/sn.setFromMatrixColumn(e,2).length();return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,n=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(n),c=Math.sin(n),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=a*h,f=a*u,g=o*h,_=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-_*c,t[9]=-o*l,t[2]=_-d*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d+_*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=_+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d-_*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*h,f=a*u,g=o*h,_=o*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=a*l,f=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=a*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Eu,e,Au)}lookAt(e,t,i){const n=this.elements;return Gt.subVectors(e,t),Gt.lengthSq()===0&&(Gt.z=1),Gt.normalize(),Ai.crossVectors(i,Gt),Ai.lengthSq()===0&&(Math.abs(i.z)===1?Gt.x+=1e-4:Gt.z+=1e-4,Gt.normalize(),Ai.crossVectors(i,Gt)),Ai.normalize(),xs.crossVectors(Gt,Ai),n[0]=Ai.x,n[4]=xs.x,n[8]=Gt.x,n[1]=Ai.y,n[5]=xs.y,n[9]=Gt.y,n[2]=Ai.z,n[6]=xs.z,n[10]=Gt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],f=i[13],g=i[2],_=i[6],m=i[10],p=i[14],M=i[3],v=i[7],b=i[11],L=i[15],C=n[0],R=n[4],F=n[8],S=n[12],E=n[1],U=n[5],G=n[9],K=n[13],I=n[2],O=n[6],H=n[10],$=n[14],Y=n[3],X=n[7],Q=n[11],ee=n[15];return r[0]=a*C+o*E+l*I+c*Y,r[4]=a*R+o*U+l*O+c*X,r[8]=a*F+o*G+l*H+c*Q,r[12]=a*S+o*K+l*$+c*ee,r[1]=h*C+u*E+d*I+f*Y,r[5]=h*R+u*U+d*O+f*X,r[9]=h*F+u*G+d*H+f*Q,r[13]=h*S+u*K+d*$+f*ee,r[2]=g*C+_*E+m*I+p*Y,r[6]=g*R+_*U+m*O+p*X,r[10]=g*F+_*G+m*H+p*Q,r[14]=g*S+_*K+m*$+p*ee,r[3]=M*C+v*E+b*I+L*Y,r[7]=M*R+v*U+b*O+L*X,r[11]=M*F+v*G+b*H+L*Q,r[15]=M*S+v*K+b*$+L*ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],n=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*l*u-n*c*u-r*o*d+i*c*d+n*o*f-i*l*f)+_*(+t*l*f-t*c*d+r*a*d-n*a*f+n*c*h-r*l*h)+m*(+t*c*u-t*o*f-r*a*u+i*a*f+r*o*h-i*c*h)+p*(-n*o*h-t*l*u+t*o*d+n*a*u-i*a*d+i*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],M=u*m*c-_*d*c+_*l*f-o*m*f-u*l*p+o*d*p,v=g*d*c-h*m*c-g*l*f+a*m*f+h*l*p-a*d*p,b=h*_*c-g*u*c+g*o*f-a*_*f-h*o*p+a*u*p,L=g*u*l-h*_*l-g*o*d+a*_*d+h*o*m-a*u*m,C=t*M+i*v+n*b+r*L;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/C;return e[0]=M*R,e[1]=(_*d*r-u*m*r-_*n*f+i*m*f+u*n*p-i*d*p)*R,e[2]=(o*m*r-_*l*r+_*n*c-i*m*c-o*n*p+i*l*p)*R,e[3]=(u*l*r-o*d*r-u*n*c+i*d*c+o*n*f-i*l*f)*R,e[4]=v*R,e[5]=(h*m*r-g*d*r+g*n*f-t*m*f-h*n*p+t*d*p)*R,e[6]=(g*l*r-a*m*r-g*n*c+t*m*c+a*n*p-t*l*p)*R,e[7]=(a*d*r-h*l*r+h*n*c-t*d*c-a*n*f+t*l*f)*R,e[8]=b*R,e[9]=(g*u*r-h*_*r-g*i*f+t*_*f+h*i*p-t*u*p)*R,e[10]=(a*_*r-g*o*r+g*i*c-t*_*c-a*i*p+t*o*p)*R,e[11]=(h*o*r-a*u*r-h*i*c+t*u*c+a*i*f-t*o*f)*R,e[12]=L*R,e[13]=(h*_*n-g*u*n+g*i*d-t*_*d-h*i*m+t*u*m)*R,e[14]=(g*o*n-a*_*n-g*i*l+t*_*l+a*i*m-t*o*m)*R,e[15]=(a*u*n-h*o*n+h*i*l-t*u*l-a*i*d+t*o*d)*R,this}scale(e){const t=this.elements,i=e.x,n=e.y,r=e.z;return t[0]*=i,t[4]*=n,t[8]*=r,t[1]*=i,t[5]*=n,t[9]*=r,t[2]*=i,t[6]*=n,t[10]*=r,t[3]*=i,t[7]*=n,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,n))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),n=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-n*l,c*l+n*o,0,c*o+n*l,h*o+i,h*l-n*a,0,c*l-n*o,h*l+n*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,n,r,a){return this.set(1,i,r,0,e,1,a,0,t,n,1,0,0,0,0,1),this}compose(e,t,i){const n=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,g=r*u,_=a*h,m=a*u,p=o*u,M=l*c,v=l*h,b=l*u,L=i.x,C=i.y,R=i.z;return n[0]=(1-(_+p))*L,n[1]=(f+b)*L,n[2]=(g-v)*L,n[3]=0,n[4]=(f-b)*C,n[5]=(1-(d+p))*C,n[6]=(m+M)*C,n[7]=0,n[8]=(g+v)*R,n[9]=(m-M)*R,n[10]=(1-(d+_))*R,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,i){const n=this.elements;let r=sn.set(n[0],n[1],n[2]).length();const a=sn.set(n[4],n[5],n[6]).length(),o=sn.set(n[8],n[9],n[10]).length();this.determinant()<0&&(r=-r),e.x=n[12],e.y=n[13],e.z=n[14],Jt.copy(this);const c=1/r,h=1/a,u=1/o;return Jt.elements[0]*=c,Jt.elements[1]*=c,Jt.elements[2]*=c,Jt.elements[4]*=h,Jt.elements[5]*=h,Jt.elements[6]*=h,Jt.elements[8]*=u,Jt.elements[9]*=u,Jt.elements[10]*=u,t.setFromRotationMatrix(Jt),i.x=r,i.y=a,i.z=o,this}makePerspective(e,t,i,n,r,a,o=yi){const l=this.elements,c=2*r/(t-e),h=2*r/(i-n),u=(t+e)/(t-e),d=(i+n)/(i-n);let f,g;if(o===yi)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===rr)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,n,r,a,o=yi){const l=this.elements,c=1/(t-e),h=1/(i-n),u=1/(a-r),d=(t+e)*c,f=(i+n)*h;let g,_;if(o===yi)g=(a+r)*u,_=-2*u;else if(o===rr)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<16;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const sn=new T,Jt=new rt,Eu=new T(0,0,0),Au=new T(1,1,1),Ai=new T,xs=new T,Gt=new T,Oo=new rt,Bo=new $i;class gr{constructor(e=0,t=0,i=0,n=gr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,n=this._order){return this._x=e,this._y=t,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const n=e.elements,r=n[0],a=n[4],o=n[8],l=n[1],c=n[5],h=n[9],u=n[2],d=n[6],f=n[10];switch(t){case"XYZ":this._y=Math.asin(bt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-bt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(bt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-bt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(bt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-bt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Oo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Oo,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Bo.setFromEuler(this),this.setFromQuaternion(Bo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}gr.DEFAULT_ORDER="XYZ";class Ra{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let wu=0;const zo=new T,rn=new $i,mi=new rt,Ss=new T,zn=new T,Tu=new T,Cu=new $i,ko=new T(1,0,0),Go=new T(0,1,0),Vo=new T(0,0,1),Ru={type:"added"},Pu={type:"removed"};class mt extends Un{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wu++}),this.uuid=ci(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=mt.DEFAULT_UP.clone();const e=new T,t=new gr,i=new $i,n=new T(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new rt},normalMatrix:{value:new qe}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ra,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return rn.setFromAxisAngle(e,t),this.quaternion.multiply(rn),this}rotateOnWorldAxis(e,t){return rn.setFromAxisAngle(e,t),this.quaternion.premultiply(rn),this}rotateX(e){return this.rotateOnAxis(ko,e)}rotateY(e){return this.rotateOnAxis(Go,e)}rotateZ(e){return this.rotateOnAxis(Vo,e)}translateOnAxis(e,t){return zo.copy(e).applyQuaternion(this.quaternion),this.position.add(zo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ko,e)}translateY(e){return this.translateOnAxis(Go,e)}translateZ(e){return this.translateOnAxis(Vo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(mi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Ss.copy(e):Ss.set(e,t,i);const n=this.parent;this.updateWorldMatrix(!0,!1),zn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mi.lookAt(zn,Ss,this.up):mi.lookAt(Ss,zn,this.up),this.quaternion.setFromRotationMatrix(mi),n&&(mi.extractRotation(n.matrixWorld),rn.setFromRotationMatrix(mi),this.quaternion.premultiply(rn.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Ru)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Pu)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),mi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),mi.multiply(e.parent.matrixWorld)),e.applyMatrix4(mi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,n=this.children.length;i<n;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zn,e,Tu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zn,Cu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,n=t.length;i<n;i++){const r=t[i];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const n=this.children;for(let r=0,a=n.length;r<a;r++){const o=n[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.visibility=this._visibility,n.active=this._active,n.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),n.maxGeometryCount=this._maxGeometryCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.geometryCount=this._geometryCount,n.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(n.boundingSphere={center:n.boundingSphere.center.toArray(),radius:n.boundingSphere.radius}),this.boundingBox!==null&&(n.boundingBox={min:n.boundingBox.min.toArray(),max:n.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));n.material=o}else n.material=r(e.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];n.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=n,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const n=e.children[i];this.add(n.clone())}return this}}mt.DEFAULT_UP=new T(0,1,0);mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Kt=new T,gi=new T,zr=new T,vi=new T,an=new T,on=new T,Ho=new T,kr=new T,Gr=new T,Vr=new T;let Ms=!1;class Yt{constructor(e=new T,t=new T,i=new T){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,n){n.subVectors(i,t),Kt.subVectors(e,t),n.cross(Kt);const r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(e,t,i,n,r){Kt.subVectors(n,t),gi.subVectors(i,t),zr.subVectors(e,t);const a=Kt.dot(Kt),o=Kt.dot(gi),l=Kt.dot(zr),c=gi.dot(gi),h=gi.dot(zr),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,g=(a*h-o*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,i,n){return this.getBarycoord(e,t,i,n,vi)===null?!1:vi.x>=0&&vi.y>=0&&vi.x+vi.y<=1}static getUV(e,t,i,n,r,a,o,l){return Ms===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ms=!0),this.getInterpolation(e,t,i,n,r,a,o,l)}static getInterpolation(e,t,i,n,r,a,o,l){return this.getBarycoord(e,t,i,n,vi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,vi.x),l.addScaledVector(a,vi.y),l.addScaledVector(o,vi.z),l)}static isFrontFacing(e,t,i,n){return Kt.subVectors(i,t),gi.subVectors(e,t),Kt.cross(gi).dot(n)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,n){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,i,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Kt.subVectors(this.c,this.b),gi.subVectors(this.a,this.b),Kt.cross(gi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Yt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Yt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,n,r){return Ms===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ms=!0),Yt.getInterpolation(e,this.a,this.b,this.c,t,i,n,r)}getInterpolation(e,t,i,n,r){return Yt.getInterpolation(e,this.a,this.b,this.c,t,i,n,r)}containsPoint(e){return Yt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Yt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,n=this.b,r=this.c;let a,o;an.subVectors(n,i),on.subVectors(r,i),kr.subVectors(e,i);const l=an.dot(kr),c=on.dot(kr);if(l<=0&&c<=0)return t.copy(i);Gr.subVectors(e,n);const h=an.dot(Gr),u=on.dot(Gr);if(h>=0&&u<=h)return t.copy(n);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(i).addScaledVector(an,a);Vr.subVectors(e,r);const f=an.dot(Vr),g=on.dot(Vr);if(g>=0&&f<=g)return t.copy(r);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(on,o);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Ho.subVectors(r,n),o=(u-h)/(u-h+(f-g)),t.copy(n).addScaledVector(Ho,o);const p=1/(m+_+d);return a=_*p,o=d*p,t.copy(i).addScaledVector(an,a).addScaledVector(on,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const vc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wi={h:0,s:0,l:0},bs={h:0,s:0,l:0};function Hr(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Ne{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const n=e;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=nt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.toWorkingColorSpace(this,t),this}setRGB(e,t,i,n=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ke.toWorkingColorSpace(this,n),this}setHSL(e,t,i,n=Ke.workingColorSpace){if(e=Ca(e,1),t=bt(t,0,1),i=bt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Hr(a,r,e+1/3),this.g=Hr(a,r,e),this.b=Hr(a,r,e-1/3)}return Ke.toWorkingColorSpace(this,n),this}setStyle(e,t=nt){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=n[1],o=n[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=n[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=nt){const i=vc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Cn(e.r),this.g=Cn(e.g),this.b=Cn(e.b),this}copyLinearToSRGB(e){return this.r=Lr(e.r),this.g=Lr(e.g),this.b=Lr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=nt){return Ke.fromWorkingColorSpace(Tt.copy(this),e),Math.round(bt(Tt.r*255,0,255))*65536+Math.round(bt(Tt.g*255,0,255))*256+Math.round(bt(Tt.b*255,0,255))}getHexString(e=nt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.fromWorkingColorSpace(Tt.copy(this),t);const i=Tt.r,n=Tt.g,r=Tt.b,a=Math.max(i,n,r),o=Math.min(i,n,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(n-r)/u+(n<r?6:0);break;case n:l=(r-i)/u+2;break;case r:l=(i-n)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ke.workingColorSpace){return Ke.fromWorkingColorSpace(Tt.copy(this),t),e.r=Tt.r,e.g=Tt.g,e.b=Tt.b,e}getStyle(e=nt){Ke.fromWorkingColorSpace(Tt.copy(this),e);const t=Tt.r,i=Tt.g,n=Tt.b;return e!==nt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(e,t,i){return this.getHSL(wi),this.setHSL(wi.h+e,wi.s+t,wi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(wi),e.getHSL(bs);const i=$n(wi.h,bs.h,t),n=$n(wi.s,bs.s,t),r=$n(wi.l,bs.l,t);return this.setHSL(i,n,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,n=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*n,this.g=r[1]*t+r[4]*i+r[7]*n,this.b=r[2]*t+r[5]*i+r[8]*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Tt=new Ne;Ne.NAMES=vc;let Lu=0;class Ui extends Un{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Lu++}),this.uuid=ci(),this.name="",this.type="Material",this.blending=Tn,this.side=xi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ca,this.blendDst=ha,this.blendEquation=Vi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ne(0,0,0),this.blendAlpha=0,this.depthFunc=tr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Po,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ki,this.stencilZFail=Ki,this.stencilZPass=Ki,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Tn&&(i.blending=this.blending),this.side!==xi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ca&&(i.blendSrc=this.blendSrc),this.blendDst!==ha&&(i.blendDst=this.blendDst),this.blendEquation!==Vi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==tr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Po&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ki&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ki&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ki&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=n(e.textures),a=n(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const n=t.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Wt extends Ui{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=tc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const pt=new T,Es=new Z;class Et{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=ma,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ri,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[e+n]=t.array[i+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Es.fromBufferAttribute(this,t),Es.applyMatrix3(e),this.setXY(t,Es.x,Es.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)pt.fromBufferAttribute(this,t),pt.applyMatrix3(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)pt.fromBufferAttribute(this,t),pt.applyMatrix4(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)pt.fromBufferAttribute(this,t),pt.applyNormalMatrix(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)pt.fromBufferAttribute(this,t),pt.transformDirection(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=li(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Je(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=li(t,this.array)),t}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=li(t,this.array)),t}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=li(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=li(t,this.array)),t}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),i=Je(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,n){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),i=Je(i,this.array),n=Je(n,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this}setXYZW(e,t,i,n,r){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),i=Je(i,this.array),n=Je(n,this.array),r=Je(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ma&&(e.usage=this.usage),e}}class _c extends Et{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class yc extends Et{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class at extends Et{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Iu=0;const qt=new rt,Wr=new mt,ln=new T,Vt=new cs,kn=new cs,St=new T;class gt extends Un{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Iu++}),this.uuid=ci(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(fc(e)?yc:_c)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new qe().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return qt.makeRotationFromQuaternion(e),this.applyMatrix4(qt),this}rotateX(e){return qt.makeRotationX(e),this.applyMatrix4(qt),this}rotateY(e){return qt.makeRotationY(e),this.applyMatrix4(qt),this}rotateZ(e){return qt.makeRotationZ(e),this.applyMatrix4(qt),this}translate(e,t,i){return qt.makeTranslation(e,t,i),this.applyMatrix4(qt),this}scale(e,t,i){return qt.makeScale(e,t,i),this.applyMatrix4(qt),this}lookAt(e){return Wr.lookAt(e),Wr.updateMatrix(),this.applyMatrix4(Wr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ln).negate(),this.translate(ln.x,ln.y,ln.z),this}setFromPoints(e){const t=[];for(let i=0,n=e.length;i<n;i++){const r=e[i];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new at(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new cs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,n=t.length;i<n;i++){const r=t[i];Vt.setFromBufferAttribute(r),this.morphTargetsRelative?(St.addVectors(this.boundingBox.min,Vt.min),this.boundingBox.expandByPoint(St),St.addVectors(this.boundingBox.max,Vt.max),this.boundingBox.expandByPoint(St)):(this.boundingBox.expandByPoint(Vt.min),this.boundingBox.expandByPoint(Vt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new T,1/0);return}if(e){const i=this.boundingSphere.center;if(Vt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];kn.setFromBufferAttribute(o),this.morphTargetsRelative?(St.addVectors(Vt.min,kn.min),Vt.expandByPoint(St),St.addVectors(Vt.max,kn.max),Vt.expandByPoint(St)):(Vt.expandByPoint(kn.min),Vt.expandByPoint(kn.max))}Vt.getCenter(i);let n=0;for(let r=0,a=e.count;r<a;r++)St.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(St));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)St.fromBufferAttribute(o,c),l&&(ln.fromBufferAttribute(e,c),St.add(ln)),n=Math.max(n,i.distanceToSquared(St))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,n=t.position.array,r=t.normal.array,a=t.uv.array,o=n.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Et(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let E=0;E<o;E++)c[E]=new T,h[E]=new T;const u=new T,d=new T,f=new T,g=new Z,_=new Z,m=new Z,p=new T,M=new T;function v(E,U,G){u.fromArray(n,E*3),d.fromArray(n,U*3),f.fromArray(n,G*3),g.fromArray(a,E*2),_.fromArray(a,U*2),m.fromArray(a,G*2),d.sub(u),f.sub(u),_.sub(g),m.sub(g);const K=1/(_.x*m.y-m.x*_.y);isFinite(K)&&(p.copy(d).multiplyScalar(m.y).addScaledVector(f,-_.y).multiplyScalar(K),M.copy(f).multiplyScalar(_.x).addScaledVector(d,-m.x).multiplyScalar(K),c[E].add(p),c[U].add(p),c[G].add(p),h[E].add(M),h[U].add(M),h[G].add(M))}let b=this.groups;b.length===0&&(b=[{start:0,count:i.length}]);for(let E=0,U=b.length;E<U;++E){const G=b[E],K=G.start,I=G.count;for(let O=K,H=K+I;O<H;O+=3)v(i[O+0],i[O+1],i[O+2])}const L=new T,C=new T,R=new T,F=new T;function S(E){R.fromArray(r,E*3),F.copy(R);const U=c[E];L.copy(U),L.sub(R.multiplyScalar(R.dot(U))).normalize(),C.crossVectors(F,U);const K=C.dot(h[E])<0?-1:1;l[E*4]=L.x,l[E*4+1]=L.y,l[E*4+2]=L.z,l[E*4+3]=K}for(let E=0,U=b.length;E<U;++E){const G=b[E],K=G.start,I=G.count;for(let O=K,H=K+I;O<H;O+=3)S(i[O+0]),S(i[O+1]),S(i[O+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Et(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);const n=new T,r=new T,a=new T,o=new T,l=new T,c=new T,h=new T,u=new T;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);n.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(n,r),h.cross(u),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)n.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(n,r),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)St.fromBufferAttribute(e,t),St.normalize(),e.setXYZ(t,St.x,St.y,St.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new Et(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new gt,i=this.index.array,n=this.attributes;for(const o in n){const l=n[o],c=e(l,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const n={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(n[l]=h,r=!0)}r&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const n=e.attributes;for(const c in n){const h=n[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Wo=new rt,zi=new mr,As=new hs,Xo=new T,cn=new T,hn=new T,un=new T,Xr=new T,ws=new T,Ts=new Z,Cs=new Z,Rs=new Z,qo=new T,jo=new T,Yo=new T,Ps=new T,Ls=new T;class ft extends mt{constructor(e=new gt,t=new Wt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(n,e);const o=this.morphTargetInfluences;if(r&&o){ws.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(Xr.fromBufferAttribute(u,e),a?ws.addScaledVector(Xr,h):ws.addScaledVector(Xr.sub(t),h))}t.add(ws)}return t}raycast(e,t){const i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),As.copy(i.boundingSphere),As.applyMatrix4(r),zi.copy(e.ray).recast(e.near),!(As.containsPoint(zi.origin)===!1&&(zi.intersectSphere(As,Xo)===null||zi.origin.distanceToSquared(Xo)>(e.far-e.near)**2))&&(Wo.copy(r).invert(),zi.copy(e.ray).applyMatrix4(Wo),!(i.boundingBox!==null&&zi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,zi)))}_computeIntersections(e,t,i){let n;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],M=Math.max(m.start,f.start),v=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let b=M,L=v;b<L;b+=3){const C=o.getX(b),R=o.getX(b+1),F=o.getX(b+2);n=Is(this,p,e,i,c,h,u,C,R,F),n&&(n.faceIndex=Math.floor(b/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const M=o.getX(m),v=o.getX(m+1),b=o.getX(m+2);n=Is(this,a,e,i,c,h,u,M,v,b),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],M=Math.max(m.start,f.start),v=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let b=M,L=v;b<L;b+=3){const C=b,R=b+1,F=b+2;n=Is(this,p,e,i,c,h,u,C,R,F),n&&(n.faceIndex=Math.floor(b/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const M=m,v=m+1,b=m+2;n=Is(this,a,e,i,c,h,u,M,v,b),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}}}function Du(s,e,t,i,n,r,a,o){let l;if(e.side===zt?l=i.intersectTriangle(a,r,n,!0,o):l=i.intersectTriangle(n,r,a,e.side===xi,o),l===null)return null;Ls.copy(o),Ls.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(Ls);return c<t.near||c>t.far?null:{distance:c,point:Ls.clone(),object:s}}function Is(s,e,t,i,n,r,a,o,l,c){s.getVertexPosition(o,cn),s.getVertexPosition(l,hn),s.getVertexPosition(c,un);const h=Du(s,e,t,i,cn,hn,un,Ps);if(h){n&&(Ts.fromBufferAttribute(n,o),Cs.fromBufferAttribute(n,l),Rs.fromBufferAttribute(n,c),h.uv=Yt.getInterpolation(Ps,cn,hn,un,Ts,Cs,Rs,new Z)),r&&(Ts.fromBufferAttribute(r,o),Cs.fromBufferAttribute(r,l),Rs.fromBufferAttribute(r,c),h.uv1=Yt.getInterpolation(Ps,cn,hn,un,Ts,Cs,Rs,new Z),h.uv2=h.uv1),a&&(qo.fromBufferAttribute(a,o),jo.fromBufferAttribute(a,l),Yo.fromBufferAttribute(a,c),h.normal=Yt.getInterpolation(Ps,cn,hn,un,qo,jo,Yo,new T),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new T,materialIndex:0};Yt.getNormal(cn,hn,un,u.normal),h.face=u}return h}class us extends gt{constructor(e=1,t=1,i=1,n=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:n,heightSegments:r,depthSegments:a};const o=this;n=Math.floor(n),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,i,t,e,a,r,0),g("z","y","x",1,-1,i,t,-e,a,r,1),g("x","z","y",1,1,e,i,t,n,a,2),g("x","z","y",1,-1,e,i,-t,n,a,3),g("x","y","z",1,-1,e,t,i,n,r,4),g("x","y","z",-1,-1,e,t,-i,n,r,5),this.setIndex(l),this.setAttribute("position",new at(c,3)),this.setAttribute("normal",new at(h,3)),this.setAttribute("uv",new at(u,2));function g(_,m,p,M,v,b,L,C,R,F,S){const E=b/R,U=L/F,G=b/2,K=L/2,I=C/2,O=R+1,H=F+1;let $=0,Y=0;const X=new T;for(let Q=0;Q<H;Q++){const ee=Q*U-K;for(let he=0;he<O;he++){const W=he*E-G;X[_]=W*M,X[m]=ee*v,X[p]=I,c.push(X.x,X.y,X.z),X[_]=0,X[m]=0,X[p]=C>0?1:-1,h.push(X.x,X.y,X.z),u.push(he/R),u.push(1-Q/F),$+=1}}for(let Q=0;Q<F;Q++)for(let ee=0;ee<R;ee++){const he=d+ee+O*Q,W=d+ee+O*(Q+1),J=d+(ee+1)+O*(Q+1),de=d+(ee+1)+O*Q;l.push(he,W,de),l.push(W,J,de),Y+=6}o.addGroup(f,Y,S),f+=Y,d+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new us(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Dn(s){const e={};for(const t in s){e[t]={};for(const i in s[t]){const n=s[t][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=n.clone():Array.isArray(n)?e[t][i]=n.slice():e[t][i]=n}}return e}function It(s){const e={};for(let t=0;t<s.length;t++){const i=Dn(s[t]);for(const n in i)e[n]=i[n]}return e}function Uu(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function xc(s){return s.getRenderTarget()===null?s.outputColorSpace:Ke.workingColorSpace}const Fu={clone:Dn,merge:It};var Nu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ou=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Zi extends Ui{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Nu,this.fragmentShader=Ou,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Dn(e.uniforms),this.uniformsGroups=Uu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const n in this.uniforms){const a=this.uniforms[n].value;a&&a.isTexture?t.uniforms[n]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[n]={type:"m4",value:a.toArray()}:t.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Sc extends mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=yi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Ht extends Sc{constructor(e=50,t=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ss*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Yn*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ss*2*Math.atan(Math.tan(Yn*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,n,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Yn*.5*this.fov)/this.zoom,i=2*t,n=this.aspect*i,r=-.5*n;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*n/l,t-=a.offsetY*i/c,n*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const dn=-90,fn=1;class Bu extends mt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new Ht(dn,fn,e,t);n.layers=this.layers,this.add(n);const r=new Ht(dn,fn,e,t);r.layers=this.layers,this.add(r);const a=new Ht(dn,fn,e,t);a.layers=this.layers,this.add(a);const o=new Ht(dn,fn,e,t);o.layers=this.layers,this.add(o);const l=new Ht(dn,fn,e,t);l.layers=this.layers,this.add(l);const c=new Ht(dn,fn,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,n,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===yi)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===rr)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,n),e.render(t,r),e.setRenderTarget(i,1,n),e.render(t,a),e.setRenderTarget(i,2,n),e.render(t,o),e.setRenderTarget(i,3,n),e.render(t,l),e.setRenderTarget(i,4,n),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,n),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Mc extends Ft{constructor(e,t,i,n,r,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Pn,super(e,t,i,n,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class zu extends Yi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},n=[i,i,i,i,i,i];t.encoding!==void 0&&(Zn("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===ji?nt:$t),this.texture=new Mc(n,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Nt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new us(5,5,5),r=new Zi({name:"CubemapFromEquirect",uniforms:Dn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:zt,blending:Pi});r.uniforms.tEquirect.value=t;const a=new ft(n,r),o=t.minFilter;return t.minFilter===is&&(t.minFilter=Nt),new Bu(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,n){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,n);e.setRenderTarget(r)}}const qr=new T,ku=new T,Gu=new qe;class Ti{constructor(e=new T(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const n=qr.subVectors(i,t).cross(ku.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(qr),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/n;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Gu.getNormalMatrix(e),n=this.coplanarPoint(qr).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ki=new hs,Ds=new T;class Pa{constructor(e=new Ti,t=new Ti,i=new Ti,n=new Ti,r=new Ti,a=new Ti){this.planes=[e,t,i,n,r,a]}set(e,t,i,n,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(n),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=yi){const i=this.planes,n=e.elements,r=n[0],a=n[1],o=n[2],l=n[3],c=n[4],h=n[5],u=n[6],d=n[7],f=n[8],g=n[9],_=n[10],m=n[11],p=n[12],M=n[13],v=n[14],b=n[15];if(i[0].setComponents(l-r,d-c,m-f,b-p).normalize(),i[1].setComponents(l+r,d+c,m+f,b+p).normalize(),i[2].setComponents(l+a,d+h,m+g,b+M).normalize(),i[3].setComponents(l-a,d-h,m-g,b-M).normalize(),i[4].setComponents(l-o,d-u,m-_,b-v).normalize(),t===yi)i[5].setComponents(l+o,d+u,m+_,b+v).normalize();else if(t===rr)i[5].setComponents(o,u,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ki.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ki.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ki)}intersectsSprite(e){return ki.center.set(0,0,0),ki.radius=.7071067811865476,ki.applyMatrix4(e.matrixWorld),this.intersectsSphere(ki)}intersectsSphere(e){const t=this.planes,i=e.center,n=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const n=t[i];if(Ds.x=n.normal.x>0?e.max.x:e.min.x,Ds.y=n.normal.y>0?e.max.y:e.min.y,Ds.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(Ds)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function bc(){let s=null,e=!1,t=null,i=null;function n(r,a){t(r,a),i=s.requestAnimationFrame(n)}return{start:function(){e!==!0&&t!==null&&(i=s.requestAnimationFrame(n),e=!0)},stop:function(){s.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Vu(s,e){const t=e.isWebGL2,i=new WeakMap;function n(c,h){const u=c.array,d=c.usage,f=u.byteLength,g=s.createBuffer();s.bindBuffer(h,g),s.bufferData(h,u,d),c.onUploadCallback();let _;if(u instanceof Float32Array)_=s.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=s.UNSIGNED_SHORT;else if(u instanceof Int16Array)_=s.SHORT;else if(u instanceof Uint32Array)_=s.UNSIGNED_INT;else if(u instanceof Int32Array)_=s.INT;else if(u instanceof Int8Array)_=s.BYTE;else if(u instanceof Uint8Array)_=s.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)_=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:_,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:f}}function r(c,h,u){const d=h.array,f=h._updateRange,g=h.updateRanges;if(s.bindBuffer(u,c),f.count===-1&&g.length===0&&s.bufferSubData(u,0,d),g.length!==0){for(let _=0,m=g.length;_<m;_++){const p=g[_];t?s.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d,p.start,p.count):s.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d.subarray(p.start,p.start+p.count))}h.clearUpdateRanges()}f.count!==-1&&(t?s.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):s.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);h&&(s.deleteBuffer(h.buffer),i.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const d=i.get(c);(!d||d.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);if(u===void 0)i.set(c,n(c,h));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,c,h),u.version=c.version}}return{get:a,remove:o,update:l}}class hi extends gt{constructor(e=1,t=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:n};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(n),c=o+1,h=l+1,u=e/o,d=t/l,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const M=p*d-a;for(let v=0;v<c;v++){const b=v*u-r;g.push(b,-M,0),_.push(0,0,1),m.push(v/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<o;M++){const v=M+c*p,b=M+c*(p+1),L=M+1+c*(p+1),C=M+1+c*p;f.push(v,b,C),f.push(b,L,C)}this.setIndex(f),this.setAttribute("position",new at(g,3)),this.setAttribute("normal",new at(_,3)),this.setAttribute("uv",new at(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hi(e.width,e.height,e.widthSegments,e.heightSegments)}}var Hu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Wu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Xu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,qu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ju=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Yu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,$u=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Zu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ju=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ku=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Qu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ed=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,td=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,id=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,nd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,sd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,rd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ad=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,od=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ld=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,cd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,hd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,ud=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,dd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,fd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,pd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,md=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,gd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,vd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,_d=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,yd="gl_FragColor = linearToOutputTexel( gl_FragColor );",xd=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Sd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Md=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,bd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ed=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ad=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,wd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Td=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Cd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Rd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Pd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ld=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Id=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Dd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ud=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Fd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Nd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Od=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Bd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,zd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,kd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Gd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Vd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Hd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Wd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Xd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,qd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,jd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,$d=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Zd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Jd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Kd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Qd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ef=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,tf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,nf=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,sf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,rf=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,af=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,of=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,lf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,cf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,uf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,df=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ff=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,pf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,mf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,gf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,vf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,_f=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,yf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Sf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Mf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,bf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ef=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Af=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,wf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Tf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Cf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Rf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Pf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Lf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,If=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Df=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Uf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ff=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Nf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Of=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Bf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,zf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,kf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Gf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Vf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Hf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Wf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$f=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Zf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Jf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Kf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Qf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ep=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ip=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,np=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,sp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ap=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,op=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,lp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,hp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,up=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,pp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,_p=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,yp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Sp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Mp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ve={alphahash_fragment:Hu,alphahash_pars_fragment:Wu,alphamap_fragment:Xu,alphamap_pars_fragment:qu,alphatest_fragment:ju,alphatest_pars_fragment:Yu,aomap_fragment:$u,aomap_pars_fragment:Zu,batching_pars_vertex:Ju,batching_vertex:Ku,begin_vertex:Qu,beginnormal_vertex:ed,bsdfs:td,iridescence_fragment:id,bumpmap_pars_fragment:nd,clipping_planes_fragment:sd,clipping_planes_pars_fragment:rd,clipping_planes_pars_vertex:ad,clipping_planes_vertex:od,color_fragment:ld,color_pars_fragment:cd,color_pars_vertex:hd,color_vertex:ud,common:dd,cube_uv_reflection_fragment:fd,defaultnormal_vertex:pd,displacementmap_pars_vertex:md,displacementmap_vertex:gd,emissivemap_fragment:vd,emissivemap_pars_fragment:_d,colorspace_fragment:yd,colorspace_pars_fragment:xd,envmap_fragment:Sd,envmap_common_pars_fragment:Md,envmap_pars_fragment:bd,envmap_pars_vertex:Ed,envmap_physical_pars_fragment:Nd,envmap_vertex:Ad,fog_vertex:wd,fog_pars_vertex:Td,fog_fragment:Cd,fog_pars_fragment:Rd,gradientmap_pars_fragment:Pd,lightmap_fragment:Ld,lightmap_pars_fragment:Id,lights_lambert_fragment:Dd,lights_lambert_pars_fragment:Ud,lights_pars_begin:Fd,lights_toon_fragment:Od,lights_toon_pars_fragment:Bd,lights_phong_fragment:zd,lights_phong_pars_fragment:kd,lights_physical_fragment:Gd,lights_physical_pars_fragment:Vd,lights_fragment_begin:Hd,lights_fragment_maps:Wd,lights_fragment_end:Xd,logdepthbuf_fragment:qd,logdepthbuf_pars_fragment:jd,logdepthbuf_pars_vertex:Yd,logdepthbuf_vertex:$d,map_fragment:Zd,map_pars_fragment:Jd,map_particle_fragment:Kd,map_particle_pars_fragment:Qd,metalnessmap_fragment:ef,metalnessmap_pars_fragment:tf,morphcolor_vertex:nf,morphnormal_vertex:sf,morphtarget_pars_vertex:rf,morphtarget_vertex:af,normal_fragment_begin:of,normal_fragment_maps:lf,normal_pars_fragment:cf,normal_pars_vertex:hf,normal_vertex:uf,normalmap_pars_fragment:df,clearcoat_normal_fragment_begin:ff,clearcoat_normal_fragment_maps:pf,clearcoat_pars_fragment:mf,iridescence_pars_fragment:gf,opaque_fragment:vf,packing:_f,premultiplied_alpha_fragment:yf,project_vertex:xf,dithering_fragment:Sf,dithering_pars_fragment:Mf,roughnessmap_fragment:bf,roughnessmap_pars_fragment:Ef,shadowmap_pars_fragment:Af,shadowmap_pars_vertex:wf,shadowmap_vertex:Tf,shadowmask_pars_fragment:Cf,skinbase_vertex:Rf,skinning_pars_vertex:Pf,skinning_vertex:Lf,skinnormal_vertex:If,specularmap_fragment:Df,specularmap_pars_fragment:Uf,tonemapping_fragment:Ff,tonemapping_pars_fragment:Nf,transmission_fragment:Of,transmission_pars_fragment:Bf,uv_pars_fragment:zf,uv_pars_vertex:kf,uv_vertex:Gf,worldpos_vertex:Vf,background_vert:Hf,background_frag:Wf,backgroundCube_vert:Xf,backgroundCube_frag:qf,cube_vert:jf,cube_frag:Yf,depth_vert:$f,depth_frag:Zf,distanceRGBA_vert:Jf,distanceRGBA_frag:Kf,equirect_vert:Qf,equirect_frag:ep,linedashed_vert:tp,linedashed_frag:ip,meshbasic_vert:np,meshbasic_frag:sp,meshlambert_vert:rp,meshlambert_frag:ap,meshmatcap_vert:op,meshmatcap_frag:lp,meshnormal_vert:cp,meshnormal_frag:hp,meshphong_vert:up,meshphong_frag:dp,meshphysical_vert:fp,meshphysical_frag:pp,meshtoon_vert:mp,meshtoon_frag:gp,points_vert:vp,points_frag:_p,shadow_vert:yp,shadow_frag:xp,sprite_vert:Sp,sprite_frag:Mp},ce={common:{diffuse:{value:new Ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qe}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qe},normalScale:{value:new Z(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0},uvTransform:{value:new qe}},sprite:{diffuse:{value:new Ne(16777215)},opacity:{value:1},center:{value:new Z(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}}},oi={basic:{uniforms:It([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:It([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Ne(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:It([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Ne(0)},specular:{value:new Ne(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:It([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new Ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:It([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new Ne(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:It([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:It([ce.points,ce.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:It([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:It([ce.common,ce.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:It([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:It([ce.sprite,ce.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:It([ce.common,ce.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:It([ce.lights,ce.fog,{color:{value:new Ne(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};oi.physical={uniforms:It([oi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qe},clearcoatNormalScale:{value:new Z(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qe},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qe},sheen:{value:0},sheenColor:{value:new Ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qe},transmissionSamplerSize:{value:new Z},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qe},attenuationDistance:{value:0},attenuationColor:{value:new Ne(0)},specularColor:{value:new Ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qe},anisotropyVector:{value:new Z},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qe}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const Us={r:0,b:0,g:0};function bp(s,e,t,i,n,r,a){const o=new Ne(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(m,p){let M=!1,v=p.isScene===!0?p.background:null;v&&v.isTexture&&(v=(p.backgroundBlurriness>0?t:e).get(v)),v===null?_(o,l):v&&v.isColor&&(_(v,1),M=!0);const b=s.xr.getEnvironmentBlendMode();b==="additive"?i.buffers.color.setClear(0,0,0,1,a):b==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(s.autoClear||M)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),v&&(v.isCubeTexture||v.mapping===fr)?(h===void 0&&(h=new ft(new us(1,1,1),new Zi({name:"BackgroundCubeMaterial",uniforms:Dn(oi.backgroundCube.uniforms),vertexShader:oi.backgroundCube.vertexShader,fragmentShader:oi.backgroundCube.fragmentShader,side:zt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,C,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(h)),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,h.material.toneMapped=Ke.getTransfer(v.colorSpace)!==it,(u!==v||d!==v.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=v,d=v.version,f=s.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new ft(new hi(2,2),new Zi({name:"BackgroundMaterial",uniforms:Dn(oi.background.uniforms),vertexShader:oi.background.vertexShader,fragmentShader:oi.background.fragmentShader,side:xi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=Ke.getTransfer(v.colorSpace)!==it,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=v,d=v.version,f=s.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function _(m,p){m.getRGB(Us,xc(s)),i.buffers.color.setClear(Us.r,Us.g,Us.b,p,a)}return{getClearColor:function(){return o},setClearColor:function(m,p=1){o.set(m),l=p,_(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,_(o,l)},render:g}}function Ep(s,e,t,i){const n=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||r!==null,o={},l=m(null);let c=l,h=!1;function u(I,O,H,$,Y){let X=!1;if(a){const Q=_($,H,O);c!==Q&&(c=Q,f(c.object)),X=p(I,$,H,Y),X&&M(I,$,H,Y)}else{const Q=O.wireframe===!0;(c.geometry!==$.id||c.program!==H.id||c.wireframe!==Q)&&(c.geometry=$.id,c.program=H.id,c.wireframe=Q,X=!0)}Y!==null&&t.update(Y,s.ELEMENT_ARRAY_BUFFER),(X||h)&&(h=!1,F(I,O,H,$),Y!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(Y).buffer))}function d(){return i.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function f(I){return i.isWebGL2?s.bindVertexArray(I):r.bindVertexArrayOES(I)}function g(I){return i.isWebGL2?s.deleteVertexArray(I):r.deleteVertexArrayOES(I)}function _(I,O,H){const $=H.wireframe===!0;let Y=o[I.id];Y===void 0&&(Y={},o[I.id]=Y);let X=Y[O.id];X===void 0&&(X={},Y[O.id]=X);let Q=X[$];return Q===void 0&&(Q=m(d()),X[$]=Q),Q}function m(I){const O=[],H=[],$=[];for(let Y=0;Y<n;Y++)O[Y]=0,H[Y]=0,$[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:H,attributeDivisors:$,object:I,attributes:{},index:null}}function p(I,O,H,$){const Y=c.attributes,X=O.attributes;let Q=0;const ee=H.getAttributes();for(const he in ee)if(ee[he].location>=0){const J=Y[he];let de=X[he];if(de===void 0&&(he==="instanceMatrix"&&I.instanceMatrix&&(de=I.instanceMatrix),he==="instanceColor"&&I.instanceColor&&(de=I.instanceColor)),J===void 0||J.attribute!==de||de&&J.data!==de.data)return!0;Q++}return c.attributesNum!==Q||c.index!==$}function M(I,O,H,$){const Y={},X=O.attributes;let Q=0;const ee=H.getAttributes();for(const he in ee)if(ee[he].location>=0){let J=X[he];J===void 0&&(he==="instanceMatrix"&&I.instanceMatrix&&(J=I.instanceMatrix),he==="instanceColor"&&I.instanceColor&&(J=I.instanceColor));const de={};de.attribute=J,J&&J.data&&(de.data=J.data),Y[he]=de,Q++}c.attributes=Y,c.attributesNum=Q,c.index=$}function v(){const I=c.newAttributes;for(let O=0,H=I.length;O<H;O++)I[O]=0}function b(I){L(I,0)}function L(I,O){const H=c.newAttributes,$=c.enabledAttributes,Y=c.attributeDivisors;H[I]=1,$[I]===0&&(s.enableVertexAttribArray(I),$[I]=1),Y[I]!==O&&((i.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](I,O),Y[I]=O)}function C(){const I=c.newAttributes,O=c.enabledAttributes;for(let H=0,$=O.length;H<$;H++)O[H]!==I[H]&&(s.disableVertexAttribArray(H),O[H]=0)}function R(I,O,H,$,Y,X,Q){Q===!0?s.vertexAttribIPointer(I,O,H,Y,X):s.vertexAttribPointer(I,O,H,$,Y,X)}function F(I,O,H,$){if(i.isWebGL2===!1&&(I.isInstancedMesh||$.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const Y=$.attributes,X=H.getAttributes(),Q=O.defaultAttributeValues;for(const ee in X){const he=X[ee];if(he.location>=0){let W=Y[ee];if(W===void 0&&(ee==="instanceMatrix"&&I.instanceMatrix&&(W=I.instanceMatrix),ee==="instanceColor"&&I.instanceColor&&(W=I.instanceColor)),W!==void 0){const J=W.normalized,de=W.itemSize,xe=t.get(W);if(xe===void 0)continue;const ge=xe.buffer,we=xe.type,Ue=xe.bytesPerElement,ae=i.isWebGL2===!0&&(we===s.INT||we===s.UNSIGNED_INT||W.gpuType===nc);if(W.isInterleavedBufferAttribute){const Pe=W.data,P=Pe.stride,oe=W.offset;if(Pe.isInstancedInterleavedBuffer){for(let j=0;j<he.locationSize;j++)L(he.location+j,Pe.meshPerAttribute);I.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=Pe.meshPerAttribute*Pe.count)}else for(let j=0;j<he.locationSize;j++)b(he.location+j);s.bindBuffer(s.ARRAY_BUFFER,ge);for(let j=0;j<he.locationSize;j++)R(he.location+j,de/he.locationSize,we,J,P*Ue,(oe+de/he.locationSize*j)*Ue,ae)}else{if(W.isInstancedBufferAttribute){for(let Pe=0;Pe<he.locationSize;Pe++)L(he.location+Pe,W.meshPerAttribute);I.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let Pe=0;Pe<he.locationSize;Pe++)b(he.location+Pe);s.bindBuffer(s.ARRAY_BUFFER,ge);for(let Pe=0;Pe<he.locationSize;Pe++)R(he.location+Pe,de/he.locationSize,we,J,de*Ue,de/he.locationSize*Pe*Ue,ae)}}else if(Q!==void 0){const J=Q[ee];if(J!==void 0)switch(J.length){case 2:s.vertexAttrib2fv(he.location,J);break;case 3:s.vertexAttrib3fv(he.location,J);break;case 4:s.vertexAttrib4fv(he.location,J);break;default:s.vertexAttrib1fv(he.location,J)}}}}C()}function S(){G();for(const I in o){const O=o[I];for(const H in O){const $=O[H];for(const Y in $)g($[Y].object),delete $[Y];delete O[H]}delete o[I]}}function E(I){if(o[I.id]===void 0)return;const O=o[I.id];for(const H in O){const $=O[H];for(const Y in $)g($[Y].object),delete $[Y];delete O[H]}delete o[I.id]}function U(I){for(const O in o){const H=o[O];if(H[I.id]===void 0)continue;const $=H[I.id];for(const Y in $)g($[Y].object),delete $[Y];delete H[I.id]}}function G(){K(),h=!0,c!==l&&(c=l,f(c.object))}function K(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:G,resetDefaultState:K,dispose:S,releaseStatesOfGeometry:E,releaseStatesOfProgram:U,initAttributes:v,enableAttribute:b,disableUnusedAttributes:C}}function Ap(s,e,t,i){const n=i.isWebGL2;let r;function a(h){r=h}function o(h,u){s.drawArrays(r,h,u),t.update(u,r,1)}function l(h,u,d){if(d===0)return;let f,g;if(n)f=s,g="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](r,h,u,d),t.update(u,r,d)}function c(h,u,d){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<d;g++)this.render(h[g],u[g]);else{f.multiDrawArraysWEBGL(r,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_];t.update(g,r,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function wp(s,e,t){let i;function n(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),d=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),_=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),p=s.getParameter(s.MAX_VARYING_VECTORS),M=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),v=d>0,b=a||e.has("OES_texture_float"),L=v&&b,C=a?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:n,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:M,vertexTextures:v,floatFragmentTextures:b,floatVertexTextures:L,maxSamples:C}}function Tp(s){const e=this;let t=null,i=0,n=!1,r=!1;const a=new Ti,o=new qe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||i!==0||n;return n=d,i=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!n||g===null||g.length===0||r&&!m)r?h(null):c();else{const M=r?0:i,v=M*4;let b=p.clippingState||null;l.value=b,b=h(g,d,v,f);for(let L=0;L!==v;++L)b[L]=t[L];p.clippingState=b,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=f+_*4,M=d.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,b=f;v!==_;++v,b+=4)a.copy(u[v]).applyMatrix4(M,o),a.normal.toArray(m,b),m[b+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Cp(s){let e=new WeakMap;function t(a,o){return o===ua?a.mapping=Pn:o===da&&(a.mapping=Ln),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===ua||o===da)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new zu(l.height/2);return c.fromEquirectangularTexture(s,a),e.set(a,c),a.addEventListener("dispose",n),t(c.texture,a.mapping)}else return null}}return a}function n(a){const o=a.target;o.removeEventListener("dispose",n);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}class Ec extends Sc{constructor(e=-1,t=1,i=1,n=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=n+t,l=n-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const En=4,$o=[.125,.215,.35,.446,.526,.582],Hi=20,jr=new Ec,Zo=new Ne;let Yr=null,$r=0,Zr=0;const Gi=(1+Math.sqrt(5))/2,pn=1/Gi,Jo=[new T(1,1,1),new T(-1,1,1),new T(1,1,-1),new T(-1,1,-1),new T(0,Gi,pn),new T(0,Gi,-pn),new T(pn,0,Gi),new T(-pn,0,Gi),new T(Gi,pn,0),new T(-Gi,pn,0)];class Ko{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,n=100){Yr=this._renderer.getRenderTarget(),$r=this._renderer.getActiveCubeFace(),Zr=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,n,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=tl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=el(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Yr,$r,Zr),e.scissorTest=!1,Fs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Pn||e.mapping===Ln?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Yr=this._renderer.getRenderTarget(),$r=this._renderer.getActiveCubeFace(),Zr=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Nt,minFilter:Nt,generateMipmaps:!1,type:ns,format:ei,colorSpace:Si,depthBuffer:!1},n=Qo(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Qo(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Rp(r)),this._blurMaterial=Pp(r,e,t)}return n}_compileMaterial(e){const t=new ft(this._lodPlanes[0],e);this._renderer.compile(t,jr)}_sceneToCubeUV(e,t,i,n){const o=new Ht(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Zo),h.toneMapping=Li,h.autoClear=!1;const f=new Wt({name:"PMREM.Background",side:zt,depthWrite:!1,depthTest:!1}),g=new ft(new us,f);let _=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,_=!0):(f.color.copy(Zo),_=!0);for(let p=0;p<6;p++){const M=p%3;M===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):M===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const v=this._cubeSize;Fs(n,M*v,p>2?v:0,v,v),h.setRenderTarget(n),_&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,n=e.mapping===Pn||e.mapping===Ln;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=tl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=el());const r=n?this._cubemapMaterial:this._equirectMaterial,a=new ft(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Fs(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,jr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let n=1;n<this._lodPlanes.length;n++){const r=Math.sqrt(this._sigmas[n]*this._sigmas[n]-this._sigmas[n-1]*this._sigmas[n-1]),a=Jo[(n-1)%Jo.length];this._blur(e,n-1,n,r,a)}t.autoClear=i}_blur(e,t,i,n,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,n,"latitudinal",r),this._halfBlur(a,e,i,i,n,"longitudinal",r)}_halfBlur(e,t,i,n,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ft(this._lodPlanes[n],c),d=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Hi-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Hi;m>Hi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Hi}`);const p=[];let M=0;for(let R=0;R<Hi;++R){const F=R/_,S=Math.exp(-F*F/2);p.push(S),R===0?M+=S:R<m&&(M+=2*S)}for(let R=0;R<p.length;R++)p[R]=p[R]/M;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-i;const b=this._sizeLods[n],L=3*b*(n>v-En?n-v+En:0),C=4*(this._cubeSize-b);Fs(t,L,C,3*b,2*b),l.setRenderTarget(t),l.render(u,jr)}}function Rp(s){const e=[],t=[],i=[];let n=s;const r=s-En+1+$o.length;for(let a=0;a<r;a++){const o=Math.pow(2,n);t.push(o);let l=1/o;a>s-En?l=$o[a-s+En-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,M=new Float32Array(_*g*f),v=new Float32Array(m*g*f),b=new Float32Array(p*g*f);for(let C=0;C<f;C++){const R=C%3*2/3-1,F=C>2?0:-1,S=[R,F,0,R+2/3,F,0,R+2/3,F+1,0,R,F,0,R+2/3,F+1,0,R,F+1,0];M.set(S,_*g*C),v.set(d,m*g*C);const E=[C,C,C,C,C,C];b.set(E,p*g*C)}const L=new gt;L.setAttribute("position",new Et(M,_)),L.setAttribute("uv",new Et(v,m)),L.setAttribute("faceIndex",new Et(b,p)),e.push(L),n>En&&n--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Qo(s,e,t){const i=new Yi(s,e,t);return i.texture.mapping=fr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Fs(s,e,t,i,n){s.viewport.set(e,t,i,n),s.scissor.set(e,t,i,n)}function Pp(s,e,t){const i=new Float32Array(Hi),n=new T(0,1,0);return new Zi({name:"SphericalGaussianBlur",defines:{n:Hi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:La(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function el(){return new Zi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:La(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function tl(){return new Zi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:La(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function La(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Lp(s){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===ua||l===da,h=l===Pn||l===Ln;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=e.get(o);return t===null&&(t=new Ko(s)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),e.set(o,u),u.texture}else{if(e.has(o))return e.get(o).texture;{const u=o.image;if(c&&u&&u.height>0||h&&u&&n(u)){t===null&&(t=new Ko(s));const d=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",r),d.texture}else return null}}}return o}function n(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function Ip(s){const e={};function t(i){if(e[i]!==void 0)return e[i];let n;switch(i){case"WEBGL_depth_texture":n=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":n=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":n=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":n=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:n=s.getExtension(i)}return e[i]=n,n}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const n=t(i);return n===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),n}}}function Dp(s,e,t,i){const n={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}d.removeEventListener("dispose",a),delete n[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return n[d.id]===!0||(d.addEventListener("dispose",a),n[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)e.update(d[g],s.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],s.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const M=f.array;_=f.version;for(let v=0,b=M.length;v<b;v+=3){const L=M[v+0],C=M[v+1],R=M[v+2];d.push(L,C,C,R,R,L)}}else if(g!==void 0){const M=g.array;_=g.version;for(let v=0,b=M.length/3-1;v<b;v+=3){const L=v+0,C=v+1,R=v+2;d.push(L,C,C,R,R,L)}}else return;const m=new(fc(d)?yc:_c)(d,1);m.version=_;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Up(s,e,t,i){const n=i.isWebGL2;let r;function a(f){r=f}let o,l;function c(f){o=f.type,l=f.bytesPerElement}function h(f,g){s.drawElements(r,g,o,f*l),t.update(g,r,1)}function u(f,g,_){if(_===0)return;let m,p;if(n)m=s,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,g,o,f*l,_),t.update(g,r,_)}function d(f,g,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<_;p++)this.render(f[p]/l,g[p]);else{m.multiDrawElementsWEBGL(r,g,0,o,f,0,_);let p=0;for(let M=0;M<_;M++)p+=g[M];t.update(p,r,1)}}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function Fp(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function n(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:n,update:i}}function Np(s,e){return s[0]-e[0]}function Op(s,e){return Math.abs(e[1])-Math.abs(s[1])}function Bp(s,e,t){const i={},n=new Float32Array(8),r=new WeakMap,a=new st,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,u){const d=c.morphTargetInfluences;if(e.isWebGL2===!0){const f=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=f!==void 0?f.length:0;let _=r.get(h);if(_===void 0||_.count!==g){let I=function(){G.dispose(),r.delete(h),h.removeEventListener("dispose",I)};_!==void 0&&_.texture.dispose();const M=h.morphAttributes.position!==void 0,v=h.morphAttributes.normal!==void 0,b=h.morphAttributes.color!==void 0,L=h.morphAttributes.position||[],C=h.morphAttributes.normal||[],R=h.morphAttributes.color||[];let F=0;M===!0&&(F=1),v===!0&&(F=2),b===!0&&(F=3);let S=h.attributes.position.count*F,E=1;S>e.maxTextureSize&&(E=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const U=new Float32Array(S*E*4*g),G=new gc(U,S,E,g);G.type=Ri,G.needsUpdate=!0;const K=F*4;for(let O=0;O<g;O++){const H=L[O],$=C[O],Y=R[O],X=S*E*4*O;for(let Q=0;Q<H.count;Q++){const ee=Q*K;M===!0&&(a.fromBufferAttribute(H,Q),U[X+ee+0]=a.x,U[X+ee+1]=a.y,U[X+ee+2]=a.z,U[X+ee+3]=0),v===!0&&(a.fromBufferAttribute($,Q),U[X+ee+4]=a.x,U[X+ee+5]=a.y,U[X+ee+6]=a.z,U[X+ee+7]=0),b===!0&&(a.fromBufferAttribute(Y,Q),U[X+ee+8]=a.x,U[X+ee+9]=a.y,U[X+ee+10]=a.z,U[X+ee+11]=Y.itemSize===4?a.w:1)}}_={count:g,texture:G,size:new Z(S,E)},r.set(h,_),h.addEventListener("dispose",I)}let m=0;for(let M=0;M<d.length;M++)m+=d[M];const p=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(s,"morphTargetBaseInfluence",p),u.getUniforms().setValue(s,"morphTargetInfluences",d),u.getUniforms().setValue(s,"morphTargetsTexture",_.texture,t),u.getUniforms().setValue(s,"morphTargetsTextureSize",_.size)}else{const f=d===void 0?0:d.length;let g=i[h.id];if(g===void 0||g.length!==f){g=[];for(let v=0;v<f;v++)g[v]=[v,0];i[h.id]=g}for(let v=0;v<f;v++){const b=g[v];b[0]=v,b[1]=d[v]}g.sort(Op);for(let v=0;v<8;v++)v<f&&g[v][1]?(o[v][0]=g[v][0],o[v][1]=g[v][1]):(o[v][0]=Number.MAX_SAFE_INTEGER,o[v][1]=0);o.sort(Np);const _=h.morphAttributes.position,m=h.morphAttributes.normal;let p=0;for(let v=0;v<8;v++){const b=o[v],L=b[0],C=b[1];L!==Number.MAX_SAFE_INTEGER&&C?(_&&h.getAttribute("morphTarget"+v)!==_[L]&&h.setAttribute("morphTarget"+v,_[L]),m&&h.getAttribute("morphNormal"+v)!==m[L]&&h.setAttribute("morphNormal"+v,m[L]),n[v]=C,p+=C):(_&&h.hasAttribute("morphTarget"+v)===!0&&h.deleteAttribute("morphTarget"+v),m&&h.hasAttribute("morphNormal"+v)===!0&&h.deleteAttribute("morphNormal"+v),n[v]=0)}const M=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(s,"morphTargetBaseInfluence",M),u.getUniforms().setValue(s,"morphTargetInfluences",n)}}return{update:l}}function zp(s,e,t,i){let n=new WeakMap;function r(l){const c=i.render.frame,h=l.geometry,u=e.get(l,h);if(n.get(u)!==c&&(e.update(u),n.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),n.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),n.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;n.get(d)!==c&&(d.update(),n.set(d,c))}return u}function a(){n=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}class Ac extends Ft{constructor(e,t,i,n,r,a,o,l,c,h){if(h=h!==void 0?h:qi,h!==qi&&h!==In)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===qi&&(i=Ci),i===void 0&&h===In&&(i=Xi),super(null,n,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Dt,this.minFilter=l!==void 0?l:Dt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const wc=new Ft,Tc=new Ac(1,1);Tc.compareFunction=dc;const Cc=new gc,Rc=new Mu,Pc=new Mc,il=[],nl=[],sl=new Float32Array(16),rl=new Float32Array(9),al=new Float32Array(4);function Fn(s,e,t){const i=s[0];if(i<=0||i>0)return s;const n=e*t;let r=il[n];if(r===void 0&&(r=new Float32Array(n),il[n]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function vt(s,e){if(s.length!==e.length)return!1;for(let t=0,i=s.length;t<i;t++)if(s[t]!==e[t])return!1;return!0}function _t(s,e){for(let t=0,i=e.length;t<i;t++)s[t]=e[t]}function vr(s,e){let t=nl[e];t===void 0&&(t=new Int32Array(e),nl[e]=t);for(let i=0;i!==e;++i)t[i]=s.allocateTextureUnit();return t}function kp(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Gp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(vt(t,e))return;s.uniform2fv(this.addr,e),_t(t,e)}}function Vp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(vt(t,e))return;s.uniform3fv(this.addr,e),_t(t,e)}}function Hp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(vt(t,e))return;s.uniform4fv(this.addr,e),_t(t,e)}}function Wp(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(vt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),_t(t,e)}else{if(vt(t,i))return;al.set(i),s.uniformMatrix2fv(this.addr,!1,al),_t(t,i)}}function Xp(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(vt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),_t(t,e)}else{if(vt(t,i))return;rl.set(i),s.uniformMatrix3fv(this.addr,!1,rl),_t(t,i)}}function qp(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(vt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),_t(t,e)}else{if(vt(t,i))return;sl.set(i),s.uniformMatrix4fv(this.addr,!1,sl),_t(t,i)}}function jp(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Yp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(vt(t,e))return;s.uniform2iv(this.addr,e),_t(t,e)}}function $p(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(vt(t,e))return;s.uniform3iv(this.addr,e),_t(t,e)}}function Zp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(vt(t,e))return;s.uniform4iv(this.addr,e),_t(t,e)}}function Jp(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Kp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(vt(t,e))return;s.uniform2uiv(this.addr,e),_t(t,e)}}function Qp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(vt(t,e))return;s.uniform3uiv(this.addr,e),_t(t,e)}}function em(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(vt(t,e))return;s.uniform4uiv(this.addr,e),_t(t,e)}}function tm(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);const r=this.type===s.SAMPLER_2D_SHADOW?Tc:wc;t.setTexture2D(e||r,n)}function im(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture3D(e||Rc,n)}function nm(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTextureCube(e||Pc,n)}function sm(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture2DArray(e||Cc,n)}function rm(s){switch(s){case 5126:return kp;case 35664:return Gp;case 35665:return Vp;case 35666:return Hp;case 35674:return Wp;case 35675:return Xp;case 35676:return qp;case 5124:case 35670:return jp;case 35667:case 35671:return Yp;case 35668:case 35672:return $p;case 35669:case 35673:return Zp;case 5125:return Jp;case 36294:return Kp;case 36295:return Qp;case 36296:return em;case 35678:case 36198:case 36298:case 36306:case 35682:return tm;case 35679:case 36299:case 36307:return im;case 35680:case 36300:case 36308:case 36293:return nm;case 36289:case 36303:case 36311:case 36292:return sm}}function am(s,e){s.uniform1fv(this.addr,e)}function om(s,e){const t=Fn(e,this.size,2);s.uniform2fv(this.addr,t)}function lm(s,e){const t=Fn(e,this.size,3);s.uniform3fv(this.addr,t)}function cm(s,e){const t=Fn(e,this.size,4);s.uniform4fv(this.addr,t)}function hm(s,e){const t=Fn(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function um(s,e){const t=Fn(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function dm(s,e){const t=Fn(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function fm(s,e){s.uniform1iv(this.addr,e)}function pm(s,e){s.uniform2iv(this.addr,e)}function mm(s,e){s.uniform3iv(this.addr,e)}function gm(s,e){s.uniform4iv(this.addr,e)}function vm(s,e){s.uniform1uiv(this.addr,e)}function _m(s,e){s.uniform2uiv(this.addr,e)}function ym(s,e){s.uniform3uiv(this.addr,e)}function xm(s,e){s.uniform4uiv(this.addr,e)}function Sm(s,e,t){const i=this.cache,n=e.length,r=vr(t,n);vt(i,r)||(s.uniform1iv(this.addr,r),_t(i,r));for(let a=0;a!==n;++a)t.setTexture2D(e[a]||wc,r[a])}function Mm(s,e,t){const i=this.cache,n=e.length,r=vr(t,n);vt(i,r)||(s.uniform1iv(this.addr,r),_t(i,r));for(let a=0;a!==n;++a)t.setTexture3D(e[a]||Rc,r[a])}function bm(s,e,t){const i=this.cache,n=e.length,r=vr(t,n);vt(i,r)||(s.uniform1iv(this.addr,r),_t(i,r));for(let a=0;a!==n;++a)t.setTextureCube(e[a]||Pc,r[a])}function Em(s,e,t){const i=this.cache,n=e.length,r=vr(t,n);vt(i,r)||(s.uniform1iv(this.addr,r),_t(i,r));for(let a=0;a!==n;++a)t.setTexture2DArray(e[a]||Cc,r[a])}function Am(s){switch(s){case 5126:return am;case 35664:return om;case 35665:return lm;case 35666:return cm;case 35674:return hm;case 35675:return um;case 35676:return dm;case 5124:case 35670:return fm;case 35667:case 35671:return pm;case 35668:case 35672:return mm;case 35669:case 35673:return gm;case 5125:return vm;case 36294:return _m;case 36295:return ym;case 36296:return xm;case 35678:case 36198:case 36298:case 36306:case 35682:return Sm;case 35679:case 36299:case 36307:return Mm;case 35680:case 36300:case 36308:case 36293:return bm;case 36289:case 36303:case 36311:case 36292:return Em}}class wm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=rm(t.type)}}class Tm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Am(t.type)}}class Cm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const n=this.seq;for(let r=0,a=n.length;r!==a;++r){const o=n[r];o.setValue(e,t[o.id],i)}}}const Jr=/(\w+)(\])?(\[|\.)?/g;function ol(s,e){s.seq.push(e),s.map[e.id]=e}function Rm(s,e,t){const i=s.name,n=i.length;for(Jr.lastIndex=0;;){const r=Jr.exec(i),a=Jr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===n){ol(t,c===void 0?new wm(o,s,e):new Tm(o,s,e));break}else{let u=t.map[o];u===void 0&&(u=new Cm(o),ol(t,u)),t=u}}}class Js{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){const r=e.getActiveUniform(t,n),a=e.getUniformLocation(t,r.name);Rm(r,a,this)}}setValue(e,t,i,n){const r=this.map[t];r!==void 0&&r.setValue(e,i,n)}setOptional(e,t,i){const n=t[i];n!==void 0&&this.setValue(e,i,n)}static upload(e,t,i,n){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,n)}}static seqWithValue(e,t){const i=[];for(let n=0,r=e.length;n!==r;++n){const a=e[n];a.id in t&&i.push(a)}return i}}function ll(s,e,t){const i=s.createShader(e);return s.shaderSource(i,t),s.compileShader(i),i}const Pm=37297;let Lm=0;function Im(s,e){const t=s.split(`
`),i=[],n=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=n;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function Dm(s){const e=Ke.getPrimaries(Ke.workingColorSpace),t=Ke.getPrimaries(s);let i;switch(e===t?i="":e===sr&&t===nr?i="LinearDisplayP3ToLinearSRGB":e===nr&&t===sr&&(i="LinearSRGBToLinearDisplayP3"),s){case Si:case pr:return[i,"LinearTransferOETF"];case nt:case Ta:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[i,"LinearTransferOETF"]}}function cl(s,e,t){const i=s.getShaderParameter(e,s.COMPILE_STATUS),n=s.getShaderInfoLog(e).trim();if(i&&n==="")return"";const r=/ERROR: 0:(\d+)/.exec(n);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+n+`

`+Im(s.getShaderSource(e),a)}else return n}function Um(s,e){const t=Dm(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Fm(s,e){let t;switch(e){case Ih:t="Linear";break;case Dh:t="Reinhard";break;case Uh:t="OptimizedCineon";break;case Fh:t="ACESFilmic";break;case Oh:t="AgX";break;case Nh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Nm(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(An).join(`
`)}function Om(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(An).join(`
`)}function Bm(s){const e=[];for(const t in s){const i=s[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function zm(s,e){const t={},i=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const r=s.getActiveAttrib(e,n),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function An(s){return s!==""}function hl(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ul(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const km=/^[ \t]*#include +<([\w\d./]+)>/gm;function _a(s){return s.replace(km,Vm)}const Gm=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Vm(s,e){let t=Ve[e];if(t===void 0){const i=Gm.get(e);if(i!==void 0)t=Ve[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return _a(t)}const Hm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function dl(s){return s.replace(Hm,Wm)}function Wm(s,e,t,i){let n="";for(let r=parseInt(e);r<parseInt(t);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function fl(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Xm(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===ec?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===ah?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===_i&&(e="SHADOWMAP_TYPE_VSM"),e}function qm(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Pn:case Ln:e="ENVMAP_TYPE_CUBE";break;case fr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function jm(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Ln:e="ENVMAP_MODE_REFRACTION";break}return e}function Ym(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case tc:e="ENVMAP_BLENDING_MULTIPLY";break;case Ph:e="ENVMAP_BLENDING_MIX";break;case Lh:e="ENVMAP_BLENDING_ADD";break}return e}function $m(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Zm(s,e,t,i){const n=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Xm(t),c=qm(t),h=jm(t),u=Ym(t),d=$m(t),f=t.isWebGL2?"":Nm(t),g=Om(t),_=Bm(r),m=n.createProgram();let p,M,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(An).join(`
`),p.length>0&&(p+=`
`),M=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(An).join(`
`),M.length>0&&(M+=`
`)):(p=[fl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(An).join(`
`),M=[f,fl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Li?"#define TONE_MAPPING":"",t.toneMapping!==Li?Ve.tonemapping_pars_fragment:"",t.toneMapping!==Li?Fm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,Um("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(An).join(`
`)),a=_a(a),a=hl(a,t),a=ul(a,t),o=_a(o),o=hl(o,t),o=ul(o,t),a=dl(a),o=dl(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,M=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Lo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Lo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M);const b=v+p+a,L=v+M+o,C=ll(n,n.VERTEX_SHADER,b),R=ll(n,n.FRAGMENT_SHADER,L);n.attachShader(m,C),n.attachShader(m,R),t.index0AttributeName!==void 0?n.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&n.bindAttribLocation(m,0,"position"),n.linkProgram(m);function F(G){if(s.debug.checkShaderErrors){const K=n.getProgramInfoLog(m).trim(),I=n.getShaderInfoLog(C).trim(),O=n.getShaderInfoLog(R).trim();let H=!0,$=!0;if(n.getProgramParameter(m,n.LINK_STATUS)===!1)if(H=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,m,C,R);else{const Y=cl(n,C,"vertex"),X=cl(n,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(m,n.VALIDATE_STATUS)+`

Program Info Log: `+K+`
`+Y+`
`+X)}else K!==""?console.warn("THREE.WebGLProgram: Program Info Log:",K):(I===""||O==="")&&($=!1);$&&(G.diagnostics={runnable:H,programLog:K,vertexShader:{log:I,prefix:p},fragmentShader:{log:O,prefix:M}})}n.deleteShader(C),n.deleteShader(R),S=new Js(n,m),E=zm(n,m)}let S;this.getUniforms=function(){return S===void 0&&F(this),S};let E;this.getAttributes=function(){return E===void 0&&F(this),E};let U=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=n.getProgramParameter(m,Pm)),U},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Lm++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=C,this.fragmentShader=R,this}let Jm=0;class Km{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,n=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(n)===!1&&(a.add(n),n.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Qm(e),t.set(e,i)),i}}class Qm{constructor(e){this.id=Jm++,this.code=e,this.usedTimes=0}}function eg(s,e,t,i,n,r,a){const o=new Ra,l=new Km,c=[],h=n.isWebGL2,u=n.logarithmicDepthBuffer,d=n.vertexTextures;let f=n.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return S===0?"uv":`uv${S}`}function m(S,E,U,G,K){const I=G.fog,O=K.geometry,H=S.isMeshStandardMaterial?G.environment:null,$=(S.isMeshStandardMaterial?t:e).get(S.envMap||H),Y=$&&$.mapping===fr?$.image.height:null,X=g[S.type];S.precision!==null&&(f=n.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const Q=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,ee=Q!==void 0?Q.length:0;let he=0;O.morphAttributes.position!==void 0&&(he=1),O.morphAttributes.normal!==void 0&&(he=2),O.morphAttributes.color!==void 0&&(he=3);let W,J,de,xe;if(X){const Rt=oi[X];W=Rt.vertexShader,J=Rt.fragmentShader}else W=S.vertexShader,J=S.fragmentShader,l.update(S),de=l.getVertexShaderID(S),xe=l.getFragmentShaderID(S);const ge=s.getRenderTarget(),we=K.isInstancedMesh===!0,Ue=K.isBatchedMesh===!0,ae=!!S.map,Pe=!!S.matcap,P=!!$,oe=!!S.aoMap,j=!!S.lightMap,re=!!S.bumpMap,q=!!S.normalMap,Ee=!!S.displacementMap,me=!!S.emissiveMap,A=!!S.metalnessMap,x=!!S.roughnessMap,B=S.anisotropy>0,se=S.clearcoat>0,ie=S.iridescence>0,te=S.sheen>0,Se=S.transmission>0,ue=B&&!!S.anisotropyMap,_e=se&&!!S.clearcoatMap,Te=se&&!!S.clearcoatNormalMap,ze=se&&!!S.clearcoatRoughnessMap,ne=ie&&!!S.iridescenceMap,Ye=ie&&!!S.iridescenceThicknessMap,je=te&&!!S.sheenColorMap,Oe=te&&!!S.sheenRoughnessMap,Ae=!!S.specularMap,ye=!!S.specularColorMap,Ge=!!S.specularIntensityMap,Ze=Se&&!!S.transmissionMap,ct=Se&&!!S.thicknessMap,We=!!S.gradientMap,le=!!S.alphaMap,D=S.alphaTest>0,fe=!!S.alphaHash,pe=!!S.extensions,Ie=!!O.attributes.uv1,Ce=!!O.attributes.uv2,Qe=!!O.attributes.uv3;let et=Li;return S.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(et=s.toneMapping),{isWebGL2:h,shaderID:X,shaderType:S.type,shaderName:S.name,vertexShader:W,fragmentShader:J,defines:S.defines,customVertexShaderID:de,customFragmentShaderID:xe,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Ue,instancing:we,instancingColor:we&&K.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:ge===null?s.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:Si,map:ae,matcap:Pe,envMap:P,envMapMode:P&&$.mapping,envMapCubeUVHeight:Y,aoMap:oe,lightMap:j,bumpMap:re,normalMap:q,displacementMap:d&&Ee,emissiveMap:me,normalMapObjectSpace:q&&S.normalMapType===$h,normalMapTangentSpace:q&&S.normalMapType===uc,metalnessMap:A,roughnessMap:x,anisotropy:B,anisotropyMap:ue,clearcoat:se,clearcoatMap:_e,clearcoatNormalMap:Te,clearcoatRoughnessMap:ze,iridescence:ie,iridescenceMap:ne,iridescenceThicknessMap:Ye,sheen:te,sheenColorMap:je,sheenRoughnessMap:Oe,specularMap:Ae,specularColorMap:ye,specularIntensityMap:Ge,transmission:Se,transmissionMap:Ze,thicknessMap:ct,gradientMap:We,opaque:S.transparent===!1&&S.blending===Tn,alphaMap:le,alphaTest:D,alphaHash:fe,combine:S.combine,mapUv:ae&&_(S.map.channel),aoMapUv:oe&&_(S.aoMap.channel),lightMapUv:j&&_(S.lightMap.channel),bumpMapUv:re&&_(S.bumpMap.channel),normalMapUv:q&&_(S.normalMap.channel),displacementMapUv:Ee&&_(S.displacementMap.channel),emissiveMapUv:me&&_(S.emissiveMap.channel),metalnessMapUv:A&&_(S.metalnessMap.channel),roughnessMapUv:x&&_(S.roughnessMap.channel),anisotropyMapUv:ue&&_(S.anisotropyMap.channel),clearcoatMapUv:_e&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:Te&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ze&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ne&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:Ye&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:je&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&_(S.sheenRoughnessMap.channel),specularMapUv:Ae&&_(S.specularMap.channel),specularColorMapUv:ye&&_(S.specularColorMap.channel),specularIntensityMapUv:Ge&&_(S.specularIntensityMap.channel),transmissionMapUv:Ze&&_(S.transmissionMap.channel),thicknessMapUv:ct&&_(S.thicknessMap.channel),alphaMapUv:le&&_(S.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(q||B),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,vertexUv1s:Ie,vertexUv2s:Ce,vertexUv3s:Qe,pointsUvs:K.isPoints===!0&&!!O.attributes.uv&&(ae||le),fog:!!I,useFog:S.fog===!0,fogExp2:I&&I.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:K.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:he,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&U.length>0,shadowMapType:s.shadowMap.type,toneMapping:et,useLegacyLights:s._useLegacyLights,decodeVideoTexture:ae&&S.map.isVideoTexture===!0&&Ke.getTransfer(S.map.colorSpace)===it,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Ot,flipSided:S.side===zt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:pe&&S.extensions.derivatives===!0,extensionFragDepth:pe&&S.extensions.fragDepth===!0,extensionDrawBuffers:pe&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:pe&&S.extensions.shaderTextureLOD===!0,extensionClipCullDistance:pe&&S.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()}}function p(S){const E=[];if(S.shaderID?E.push(S.shaderID):(E.push(S.customVertexShaderID),E.push(S.customFragmentShaderID)),S.defines!==void 0)for(const U in S.defines)E.push(U),E.push(S.defines[U]);return S.isRawShaderMaterial===!1&&(M(E,S),v(E,S),E.push(s.outputColorSpace)),E.push(S.customProgramCacheKey),E.join()}function M(S,E){S.push(E.precision),S.push(E.outputColorSpace),S.push(E.envMapMode),S.push(E.envMapCubeUVHeight),S.push(E.mapUv),S.push(E.alphaMapUv),S.push(E.lightMapUv),S.push(E.aoMapUv),S.push(E.bumpMapUv),S.push(E.normalMapUv),S.push(E.displacementMapUv),S.push(E.emissiveMapUv),S.push(E.metalnessMapUv),S.push(E.roughnessMapUv),S.push(E.anisotropyMapUv),S.push(E.clearcoatMapUv),S.push(E.clearcoatNormalMapUv),S.push(E.clearcoatRoughnessMapUv),S.push(E.iridescenceMapUv),S.push(E.iridescenceThicknessMapUv),S.push(E.sheenColorMapUv),S.push(E.sheenRoughnessMapUv),S.push(E.specularMapUv),S.push(E.specularColorMapUv),S.push(E.specularIntensityMapUv),S.push(E.transmissionMapUv),S.push(E.thicknessMapUv),S.push(E.combine),S.push(E.fogExp2),S.push(E.sizeAttenuation),S.push(E.morphTargetsCount),S.push(E.morphAttributeCount),S.push(E.numDirLights),S.push(E.numPointLights),S.push(E.numSpotLights),S.push(E.numSpotLightMaps),S.push(E.numHemiLights),S.push(E.numRectAreaLights),S.push(E.numDirLightShadows),S.push(E.numPointLightShadows),S.push(E.numSpotLightShadows),S.push(E.numSpotLightShadowsWithMaps),S.push(E.numLightProbes),S.push(E.shadowMapType),S.push(E.toneMapping),S.push(E.numClippingPlanes),S.push(E.numClipIntersection),S.push(E.depthPacking)}function v(S,E){o.disableAll(),E.isWebGL2&&o.enable(0),E.supportsVertexTextures&&o.enable(1),E.instancing&&o.enable(2),E.instancingColor&&o.enable(3),E.matcap&&o.enable(4),E.envMap&&o.enable(5),E.normalMapObjectSpace&&o.enable(6),E.normalMapTangentSpace&&o.enable(7),E.clearcoat&&o.enable(8),E.iridescence&&o.enable(9),E.alphaTest&&o.enable(10),E.vertexColors&&o.enable(11),E.vertexAlphas&&o.enable(12),E.vertexUv1s&&o.enable(13),E.vertexUv2s&&o.enable(14),E.vertexUv3s&&o.enable(15),E.vertexTangents&&o.enable(16),E.anisotropy&&o.enable(17),E.alphaHash&&o.enable(18),E.batching&&o.enable(19),S.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.skinning&&o.enable(4),E.morphTargets&&o.enable(5),E.morphNormals&&o.enable(6),E.morphColors&&o.enable(7),E.premultipliedAlpha&&o.enable(8),E.shadowMapEnabled&&o.enable(9),E.useLegacyLights&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),S.push(o.mask)}function b(S){const E=g[S.type];let U;if(E){const G=oi[E];U=Fu.clone(G.uniforms)}else U=S.uniforms;return U}function L(S,E){let U;for(let G=0,K=c.length;G<K;G++){const I=c[G];if(I.cacheKey===E){U=I,++U.usedTimes;break}}return U===void 0&&(U=new Zm(s,E,S,r),c.push(U)),U}function C(S){if(--S.usedTimes===0){const E=c.indexOf(S);c[E]=c[c.length-1],c.pop(),S.destroy()}}function R(S){l.remove(S)}function F(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:b,acquireProgram:L,releaseProgram:C,releaseShaderCache:R,programs:c,dispose:F}}function tg(){let s=new WeakMap;function e(r){let a=s.get(r);return a===void 0&&(a={},s.set(r,a)),a}function t(r){s.delete(r)}function i(r,a,o){s.get(r)[a]=o}function n(){s=new WeakMap}return{get:e,remove:t,update:i,dispose:n}}function ig(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function pl(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function ml(){const s=[];let e=0;const t=[],i=[],n=[];function r(){e=0,t.length=0,i.length=0,n.length=0}function a(u,d,f,g,_,m){let p=s[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},s[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function o(u,d,f,g,_,m){const p=a(u,d,f,g,_,m);f.transmission>0?i.push(p):f.transparent===!0?n.push(p):t.push(p)}function l(u,d,f,g,_,m){const p=a(u,d,f,g,_,m);f.transmission>0?i.unshift(p):f.transparent===!0?n.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||ig),i.length>1&&i.sort(d||pl),n.length>1&&n.sort(d||pl)}function h(){for(let u=e,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:n,init:r,push:o,unshift:l,finish:h,sort:c}}function ng(){let s=new WeakMap;function e(i,n){const r=s.get(i);let a;return r===void 0?(a=new ml,s.set(i,[a])):n>=r.length?(a=new ml,r.push(a)):a=r[n],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function sg(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new T,color:new Ne};break;case"SpotLight":t={position:new T,direction:new T,color:new Ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new T,color:new Ne,distance:0,decay:0};break;case"HemisphereLight":t={direction:new T,skyColor:new Ne,groundColor:new Ne};break;case"RectAreaLight":t={color:new Ne,position:new T,halfWidth:new T,halfHeight:new T};break}return s[e.id]=t,t}}}function rg(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Z};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Z};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Z,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let ag=0;function og(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function lg(s,e){const t=new sg,i=rg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new T);const r=new T,a=new rt,o=new rt;function l(h,u){let d=0,f=0,g=0;for(let G=0;G<9;G++)n.probe[G].set(0,0,0);let _=0,m=0,p=0,M=0,v=0,b=0,L=0,C=0,R=0,F=0,S=0;h.sort(og);const E=u===!0?Math.PI:1;for(let G=0,K=h.length;G<K;G++){const I=h[G],O=I.color,H=I.intensity,$=I.distance,Y=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)d+=O.r*H*E,f+=O.g*H*E,g+=O.b*H*E;else if(I.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(I.sh.coefficients[X],H);S++}else if(I.isDirectionalLight){const X=t.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity*E),I.castShadow){const Q=I.shadow,ee=i.get(I);ee.shadowBias=Q.bias,ee.shadowNormalBias=Q.normalBias,ee.shadowRadius=Q.radius,ee.shadowMapSize=Q.mapSize,n.directionalShadow[_]=ee,n.directionalShadowMap[_]=Y,n.directionalShadowMatrix[_]=I.shadow.matrix,b++}n.directional[_]=X,_++}else if(I.isSpotLight){const X=t.get(I);X.position.setFromMatrixPosition(I.matrixWorld),X.color.copy(O).multiplyScalar(H*E),X.distance=$,X.coneCos=Math.cos(I.angle),X.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),X.decay=I.decay,n.spot[p]=X;const Q=I.shadow;if(I.map&&(n.spotLightMap[R]=I.map,R++,Q.updateMatrices(I),I.castShadow&&F++),n.spotLightMatrix[p]=Q.matrix,I.castShadow){const ee=i.get(I);ee.shadowBias=Q.bias,ee.shadowNormalBias=Q.normalBias,ee.shadowRadius=Q.radius,ee.shadowMapSize=Q.mapSize,n.spotShadow[p]=ee,n.spotShadowMap[p]=Y,C++}p++}else if(I.isRectAreaLight){const X=t.get(I);X.color.copy(O).multiplyScalar(H),X.halfWidth.set(I.width*.5,0,0),X.halfHeight.set(0,I.height*.5,0),n.rectArea[M]=X,M++}else if(I.isPointLight){const X=t.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity*E),X.distance=I.distance,X.decay=I.decay,I.castShadow){const Q=I.shadow,ee=i.get(I);ee.shadowBias=Q.bias,ee.shadowNormalBias=Q.normalBias,ee.shadowRadius=Q.radius,ee.shadowMapSize=Q.mapSize,ee.shadowCameraNear=Q.camera.near,ee.shadowCameraFar=Q.camera.far,n.pointShadow[m]=ee,n.pointShadowMap[m]=Y,n.pointShadowMatrix[m]=I.shadow.matrix,L++}n.point[m]=X,m++}else if(I.isHemisphereLight){const X=t.get(I);X.skyColor.copy(I.color).multiplyScalar(H*E),X.groundColor.copy(I.groundColor).multiplyScalar(H*E),n.hemi[v]=X,v++}}M>0&&(e.isWebGL2?s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ce.LTC_FLOAT_1,n.rectAreaLTC2=ce.LTC_FLOAT_2):(n.rectAreaLTC1=ce.LTC_HALF_1,n.rectAreaLTC2=ce.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ce.LTC_FLOAT_1,n.rectAreaLTC2=ce.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(n.rectAreaLTC1=ce.LTC_HALF_1,n.rectAreaLTC2=ce.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),n.ambient[0]=d,n.ambient[1]=f,n.ambient[2]=g;const U=n.hash;(U.directionalLength!==_||U.pointLength!==m||U.spotLength!==p||U.rectAreaLength!==M||U.hemiLength!==v||U.numDirectionalShadows!==b||U.numPointShadows!==L||U.numSpotShadows!==C||U.numSpotMaps!==R||U.numLightProbes!==S)&&(n.directional.length=_,n.spot.length=p,n.rectArea.length=M,n.point.length=m,n.hemi.length=v,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=L,n.pointShadowMap.length=L,n.spotShadow.length=C,n.spotShadowMap.length=C,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=L,n.spotLightMatrix.length=C+R-F,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=F,n.numLightProbes=S,U.directionalLength=_,U.pointLength=m,U.spotLength=p,U.rectAreaLength=M,U.hemiLength=v,U.numDirectionalShadows=b,U.numPointShadows=L,U.numSpotShadows=C,U.numSpotMaps=R,U.numLightProbes=S,n.version=ag++)}function c(h,u){let d=0,f=0,g=0,_=0,m=0;const p=u.matrixWorldInverse;for(let M=0,v=h.length;M<v;M++){const b=h[M];if(b.isDirectionalLight){const L=n.directional[d];L.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(p),d++}else if(b.isSpotLight){const L=n.spot[g];L.position.setFromMatrixPosition(b.matrixWorld),L.position.applyMatrix4(p),L.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(p),g++}else if(b.isRectAreaLight){const L=n.rectArea[_];L.position.setFromMatrixPosition(b.matrixWorld),L.position.applyMatrix4(p),o.identity(),a.copy(b.matrixWorld),a.premultiply(p),o.extractRotation(a),L.halfWidth.set(b.width*.5,0,0),L.halfHeight.set(0,b.height*.5,0),L.halfWidth.applyMatrix4(o),L.halfHeight.applyMatrix4(o),_++}else if(b.isPointLight){const L=n.point[f];L.position.setFromMatrixPosition(b.matrixWorld),L.position.applyMatrix4(p),f++}else if(b.isHemisphereLight){const L=n.hemi[m];L.direction.setFromMatrixPosition(b.matrixWorld),L.direction.transformDirection(p),m++}}}return{setup:l,setupView:c,state:n}}function gl(s,e){const t=new lg(s,e),i=[],n=[];function r(){i.length=0,n.length=0}function a(u){i.push(u)}function o(u){n.push(u)}function l(u){t.setup(i,u)}function c(u){t.setupView(i,u)}return{init:r,state:{lightsArray:i,shadowsArray:n,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function cg(s,e){let t=new WeakMap;function i(r,a=0){const o=t.get(r);let l;return o===void 0?(l=new gl(s,e),t.set(r,[l])):a>=o.length?(l=new gl(s,e),o.push(l)):l=o[a],l}function n(){t=new WeakMap}return{get:i,dispose:n}}class hg extends Ui{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=jh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ug extends Ui{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const dg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function pg(s,e,t){let i=new Pa;const n=new Z,r=new Z,a=new st,o=new hg({depthPacking:Yh}),l=new ug,c={},h=t.maxTextureSize,u={[xi]:zt,[zt]:xi,[Ot]:Ot},d=new Zi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Z},radius:{value:4}},vertexShader:dg,fragmentShader:fg}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new gt;g.setAttribute("position",new Et(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ft(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ec;let p=this.type;this.render=function(C,R,F){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const S=s.getRenderTarget(),E=s.getActiveCubeFace(),U=s.getActiveMipmapLevel(),G=s.state;G.setBlending(Pi),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const K=p!==_i&&this.type===_i,I=p===_i&&this.type!==_i;for(let O=0,H=C.length;O<H;O++){const $=C[O],Y=$.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;n.copy(Y.mapSize);const X=Y.getFrameExtents();if(n.multiply(X),r.copy(Y.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(r.x=Math.floor(h/X.x),n.x=r.x*X.x,Y.mapSize.x=r.x),n.y>h&&(r.y=Math.floor(h/X.y),n.y=r.y*X.y,Y.mapSize.y=r.y)),Y.map===null||K===!0||I===!0){const ee=this.type!==_i?{minFilter:Dt,magFilter:Dt}:{};Y.map!==null&&Y.map.dispose(),Y.map=new Yi(n.x,n.y,ee),Y.map.texture.name=$.name+".shadowMap",Y.camera.updateProjectionMatrix()}s.setRenderTarget(Y.map),s.clear();const Q=Y.getViewportCount();for(let ee=0;ee<Q;ee++){const he=Y.getViewport(ee);a.set(r.x*he.x,r.y*he.y,r.x*he.z,r.y*he.w),G.viewport(a),Y.updateMatrices($,ee),i=Y.getFrustum(),b(R,F,Y.camera,$,this.type)}Y.isPointLightShadow!==!0&&this.type===_i&&M(Y,F),Y.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(S,E,U)};function M(C,R){const F=e.update(_);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Yi(n.x,n.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,s.setRenderTarget(C.mapPass),s.clear(),s.renderBufferDirect(R,null,F,d,_,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,s.setRenderTarget(C.map),s.clear(),s.renderBufferDirect(R,null,F,f,_,null)}function v(C,R,F,S){let E=null;const U=F.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(U!==void 0)E=U;else if(E=F.isPointLight===!0?l:o,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const G=E.uuid,K=R.uuid;let I=c[G];I===void 0&&(I={},c[G]=I);let O=I[K];O===void 0&&(O=E.clone(),I[K]=O,R.addEventListener("dispose",L)),E=O}if(E.visible=R.visible,E.wireframe=R.wireframe,S===_i?E.side=R.shadowSide!==null?R.shadowSide:R.side:E.side=R.shadowSide!==null?R.shadowSide:u[R.side],E.alphaMap=R.alphaMap,E.alphaTest=R.alphaTest,E.map=R.map,E.clipShadows=R.clipShadows,E.clippingPlanes=R.clippingPlanes,E.clipIntersection=R.clipIntersection,E.displacementMap=R.displacementMap,E.displacementScale=R.displacementScale,E.displacementBias=R.displacementBias,E.wireframeLinewidth=R.wireframeLinewidth,E.linewidth=R.linewidth,F.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const G=s.properties.get(E);G.light=F}return E}function b(C,R,F,S,E){if(C.visible===!1)return;if(C.layers.test(R.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&E===_i)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,C.matrixWorld);const K=e.update(C),I=C.material;if(Array.isArray(I)){const O=K.groups;for(let H=0,$=O.length;H<$;H++){const Y=O[H],X=I[Y.materialIndex];if(X&&X.visible){const Q=v(C,X,S,E);C.onBeforeShadow(s,C,R,F,K,Q,Y),s.renderBufferDirect(F,null,K,Q,C,Y),C.onAfterShadow(s,C,R,F,K,Q,Y)}}}else if(I.visible){const O=v(C,I,S,E);C.onBeforeShadow(s,C,R,F,K,O,null),s.renderBufferDirect(F,null,K,O,C,null),C.onAfterShadow(s,C,R,F,K,O,null)}}const G=C.children;for(let K=0,I=G.length;K<I;K++)b(G[K],R,F,S,E)}function L(C){C.target.removeEventListener("dispose",L);for(const F in c){const S=c[F],E=C.target.uuid;E in S&&(S[E].dispose(),delete S[E])}}}function mg(s,e,t){const i=t.isWebGL2;function n(){let D=!1;const fe=new st;let pe=null;const Ie=new st(0,0,0,0);return{setMask:function(Ce){pe!==Ce&&!D&&(s.colorMask(Ce,Ce,Ce,Ce),pe=Ce)},setLocked:function(Ce){D=Ce},setClear:function(Ce,Qe,et,yt,Rt){Rt===!0&&(Ce*=yt,Qe*=yt,et*=yt),fe.set(Ce,Qe,et,yt),Ie.equals(fe)===!1&&(s.clearColor(Ce,Qe,et,yt),Ie.copy(fe))},reset:function(){D=!1,pe=null,Ie.set(-1,0,0,0)}}}function r(){let D=!1,fe=null,pe=null,Ie=null;return{setTest:function(Ce){Ce?Ue(s.DEPTH_TEST):ae(s.DEPTH_TEST)},setMask:function(Ce){fe!==Ce&&!D&&(s.depthMask(Ce),fe=Ce)},setFunc:function(Ce){if(pe!==Ce){switch(Ce){case bh:s.depthFunc(s.NEVER);break;case Eh:s.depthFunc(s.ALWAYS);break;case Ah:s.depthFunc(s.LESS);break;case tr:s.depthFunc(s.LEQUAL);break;case wh:s.depthFunc(s.EQUAL);break;case Th:s.depthFunc(s.GEQUAL);break;case Ch:s.depthFunc(s.GREATER);break;case Rh:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}pe=Ce}},setLocked:function(Ce){D=Ce},setClear:function(Ce){Ie!==Ce&&(s.clearDepth(Ce),Ie=Ce)},reset:function(){D=!1,fe=null,pe=null,Ie=null}}}function a(){let D=!1,fe=null,pe=null,Ie=null,Ce=null,Qe=null,et=null,yt=null,Rt=null;return{setTest:function(tt){D||(tt?Ue(s.STENCIL_TEST):ae(s.STENCIL_TEST))},setMask:function(tt){fe!==tt&&!D&&(s.stencilMask(tt),fe=tt)},setFunc:function(tt,Pt,ii){(pe!==tt||Ie!==Pt||Ce!==ii)&&(s.stencilFunc(tt,Pt,ii),pe=tt,Ie=Pt,Ce=ii)},setOp:function(tt,Pt,ii){(Qe!==tt||et!==Pt||yt!==ii)&&(s.stencilOp(tt,Pt,ii),Qe=tt,et=Pt,yt=ii)},setLocked:function(tt){D=tt},setClear:function(tt){Rt!==tt&&(s.clearStencil(tt),Rt=tt)},reset:function(){D=!1,fe=null,pe=null,Ie=null,Ce=null,Qe=null,et=null,yt=null,Rt=null}}}const o=new n,l=new r,c=new a,h=new WeakMap,u=new WeakMap;let d={},f={},g=new WeakMap,_=[],m=null,p=!1,M=null,v=null,b=null,L=null,C=null,R=null,F=null,S=new Ne(0,0,0),E=0,U=!1,G=null,K=null,I=null,O=null,H=null;const $=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,X=0;const Q=s.getParameter(s.VERSION);Q.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(Q)[1]),Y=X>=1):Q.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),Y=X>=2);let ee=null,he={};const W=s.getParameter(s.SCISSOR_BOX),J=s.getParameter(s.VIEWPORT),de=new st().fromArray(W),xe=new st().fromArray(J);function ge(D,fe,pe,Ie){const Ce=new Uint8Array(4),Qe=s.createTexture();s.bindTexture(D,Qe),s.texParameteri(D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(D,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let et=0;et<pe;et++)i&&(D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY)?s.texImage3D(fe,0,s.RGBA,1,1,Ie,0,s.RGBA,s.UNSIGNED_BYTE,Ce):s.texImage2D(fe+et,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Ce);return Qe}const we={};we[s.TEXTURE_2D]=ge(s.TEXTURE_2D,s.TEXTURE_2D,1),we[s.TEXTURE_CUBE_MAP]=ge(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(we[s.TEXTURE_2D_ARRAY]=ge(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),we[s.TEXTURE_3D]=ge(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ue(s.DEPTH_TEST),l.setFunc(tr),me(!1),A(Ja),Ue(s.CULL_FACE),q(Pi);function Ue(D){d[D]!==!0&&(s.enable(D),d[D]=!0)}function ae(D){d[D]!==!1&&(s.disable(D),d[D]=!1)}function Pe(D,fe){return f[D]!==fe?(s.bindFramebuffer(D,fe),f[D]=fe,i&&(D===s.DRAW_FRAMEBUFFER&&(f[s.FRAMEBUFFER]=fe),D===s.FRAMEBUFFER&&(f[s.DRAW_FRAMEBUFFER]=fe)),!0):!1}function P(D,fe){let pe=_,Ie=!1;if(D)if(pe=g.get(fe),pe===void 0&&(pe=[],g.set(fe,pe)),D.isWebGLMultipleRenderTargets){const Ce=D.texture;if(pe.length!==Ce.length||pe[0]!==s.COLOR_ATTACHMENT0){for(let Qe=0,et=Ce.length;Qe<et;Qe++)pe[Qe]=s.COLOR_ATTACHMENT0+Qe;pe.length=Ce.length,Ie=!0}}else pe[0]!==s.COLOR_ATTACHMENT0&&(pe[0]=s.COLOR_ATTACHMENT0,Ie=!0);else pe[0]!==s.BACK&&(pe[0]=s.BACK,Ie=!0);Ie&&(t.isWebGL2?s.drawBuffers(pe):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(pe))}function oe(D){return m!==D?(s.useProgram(D),m=D,!0):!1}const j={[Vi]:s.FUNC_ADD,[lh]:s.FUNC_SUBTRACT,[ch]:s.FUNC_REVERSE_SUBTRACT};if(i)j[to]=s.MIN,j[io]=s.MAX;else{const D=e.get("EXT_blend_minmax");D!==null&&(j[to]=D.MIN_EXT,j[io]=D.MAX_EXT)}const re={[hh]:s.ZERO,[uh]:s.ONE,[dh]:s.SRC_COLOR,[ca]:s.SRC_ALPHA,[_h]:s.SRC_ALPHA_SATURATE,[gh]:s.DST_COLOR,[ph]:s.DST_ALPHA,[fh]:s.ONE_MINUS_SRC_COLOR,[ha]:s.ONE_MINUS_SRC_ALPHA,[vh]:s.ONE_MINUS_DST_COLOR,[mh]:s.ONE_MINUS_DST_ALPHA,[yh]:s.CONSTANT_COLOR,[xh]:s.ONE_MINUS_CONSTANT_COLOR,[Sh]:s.CONSTANT_ALPHA,[Mh]:s.ONE_MINUS_CONSTANT_ALPHA};function q(D,fe,pe,Ie,Ce,Qe,et,yt,Rt,tt){if(D===Pi){p===!0&&(ae(s.BLEND),p=!1);return}if(p===!1&&(Ue(s.BLEND),p=!0),D!==oh){if(D!==M||tt!==U){if((v!==Vi||C!==Vi)&&(s.blendEquation(s.FUNC_ADD),v=Vi,C=Vi),tt)switch(D){case Tn:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ka:s.blendFunc(s.ONE,s.ONE);break;case Qa:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case eo:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Tn:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ka:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Qa:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case eo:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}b=null,L=null,R=null,F=null,S.set(0,0,0),E=0,M=D,U=tt}return}Ce=Ce||fe,Qe=Qe||pe,et=et||Ie,(fe!==v||Ce!==C)&&(s.blendEquationSeparate(j[fe],j[Ce]),v=fe,C=Ce),(pe!==b||Ie!==L||Qe!==R||et!==F)&&(s.blendFuncSeparate(re[pe],re[Ie],re[Qe],re[et]),b=pe,L=Ie,R=Qe,F=et),(yt.equals(S)===!1||Rt!==E)&&(s.blendColor(yt.r,yt.g,yt.b,Rt),S.copy(yt),E=Rt),M=D,U=!1}function Ee(D,fe){D.side===Ot?ae(s.CULL_FACE):Ue(s.CULL_FACE);let pe=D.side===zt;fe&&(pe=!pe),me(pe),D.blending===Tn&&D.transparent===!1?q(Pi):q(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),l.setFunc(D.depthFunc),l.setTest(D.depthTest),l.setMask(D.depthWrite),o.setMask(D.colorWrite);const Ie=D.stencilWrite;c.setTest(Ie),Ie&&(c.setMask(D.stencilWriteMask),c.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),c.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),B(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Ue(s.SAMPLE_ALPHA_TO_COVERAGE):ae(s.SAMPLE_ALPHA_TO_COVERAGE)}function me(D){G!==D&&(D?s.frontFace(s.CW):s.frontFace(s.CCW),G=D)}function A(D){D!==sh?(Ue(s.CULL_FACE),D!==K&&(D===Ja?s.cullFace(s.BACK):D===rh?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ae(s.CULL_FACE),K=D}function x(D){D!==I&&(Y&&s.lineWidth(D),I=D)}function B(D,fe,pe){D?(Ue(s.POLYGON_OFFSET_FILL),(O!==fe||H!==pe)&&(s.polygonOffset(fe,pe),O=fe,H=pe)):ae(s.POLYGON_OFFSET_FILL)}function se(D){D?Ue(s.SCISSOR_TEST):ae(s.SCISSOR_TEST)}function ie(D){D===void 0&&(D=s.TEXTURE0+$-1),ee!==D&&(s.activeTexture(D),ee=D)}function te(D,fe,pe){pe===void 0&&(ee===null?pe=s.TEXTURE0+$-1:pe=ee);let Ie=he[pe];Ie===void 0&&(Ie={type:void 0,texture:void 0},he[pe]=Ie),(Ie.type!==D||Ie.texture!==fe)&&(ee!==pe&&(s.activeTexture(pe),ee=pe),s.bindTexture(D,fe||we[D]),Ie.type=D,Ie.texture=fe)}function Se(){const D=he[ee];D!==void 0&&D.type!==void 0&&(s.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function ue(){try{s.compressedTexImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function _e(){try{s.compressedTexImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Te(){try{s.texSubImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ze(){try{s.texSubImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ne(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ye(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function je(){try{s.texStorage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Oe(){try{s.texStorage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ae(){try{s.texImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ye(){try{s.texImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ge(D){de.equals(D)===!1&&(s.scissor(D.x,D.y,D.z,D.w),de.copy(D))}function Ze(D){xe.equals(D)===!1&&(s.viewport(D.x,D.y,D.z,D.w),xe.copy(D))}function ct(D,fe){let pe=u.get(fe);pe===void 0&&(pe=new WeakMap,u.set(fe,pe));let Ie=pe.get(D);Ie===void 0&&(Ie=s.getUniformBlockIndex(fe,D.name),pe.set(D,Ie))}function We(D,fe){const Ie=u.get(fe).get(D);h.get(fe)!==Ie&&(s.uniformBlockBinding(fe,Ie,D.__bindingPointIndex),h.set(fe,Ie))}function le(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),i===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),d={},ee=null,he={},f={},g=new WeakMap,_=[],m=null,p=!1,M=null,v=null,b=null,L=null,C=null,R=null,F=null,S=new Ne(0,0,0),E=0,U=!1,G=null,K=null,I=null,O=null,H=null,de.set(0,0,s.canvas.width,s.canvas.height),xe.set(0,0,s.canvas.width,s.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Ue,disable:ae,bindFramebuffer:Pe,drawBuffers:P,useProgram:oe,setBlending:q,setMaterial:Ee,setFlipSided:me,setCullFace:A,setLineWidth:x,setPolygonOffset:B,setScissorTest:se,activeTexture:ie,bindTexture:te,unbindTexture:Se,compressedTexImage2D:ue,compressedTexImage3D:_e,texImage2D:Ae,texImage3D:ye,updateUBOMapping:ct,uniformBlockBinding:We,texStorage2D:je,texStorage3D:Oe,texSubImage2D:Te,texSubImage3D:ze,compressedTexSubImage2D:ne,compressedTexSubImage3D:Ye,scissor:Ge,viewport:Ze,reset:le}}function gg(s,e,t,i,n,r,a){const o=n.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,x){return f?new OffscreenCanvas(A,x):rs("canvas")}function _(A,x,B,se){let ie=1;if((A.width>se||A.height>se)&&(ie=se/Math.max(A.width,A.height)),ie<1||x===!0)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap){const te=x?ar:Math.floor,Se=te(ie*A.width),ue=te(ie*A.height);u===void 0&&(u=g(Se,ue));const _e=B?g(Se,ue):u;return _e.width=Se,_e.height=ue,_e.getContext("2d").drawImage(A,0,0,Se,ue),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+A.width+"x"+A.height+") to ("+Se+"x"+ue+")."),_e}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+A.width+"x"+A.height+")."),A;return A}function m(A){return va(A.width)&&va(A.height)}function p(A){return o?!1:A.wrapS!==Ut||A.wrapT!==Ut||A.minFilter!==Dt&&A.minFilter!==Nt}function M(A,x){return A.generateMipmaps&&x&&A.minFilter!==Dt&&A.minFilter!==Nt}function v(A){s.generateMipmap(A)}function b(A,x,B,se,ie=!1){if(o===!1)return x;if(A!==null){if(s[A]!==void 0)return s[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let te=x;if(x===s.RED&&(B===s.FLOAT&&(te=s.R32F),B===s.HALF_FLOAT&&(te=s.R16F),B===s.UNSIGNED_BYTE&&(te=s.R8)),x===s.RED_INTEGER&&(B===s.UNSIGNED_BYTE&&(te=s.R8UI),B===s.UNSIGNED_SHORT&&(te=s.R16UI),B===s.UNSIGNED_INT&&(te=s.R32UI),B===s.BYTE&&(te=s.R8I),B===s.SHORT&&(te=s.R16I),B===s.INT&&(te=s.R32I)),x===s.RG&&(B===s.FLOAT&&(te=s.RG32F),B===s.HALF_FLOAT&&(te=s.RG16F),B===s.UNSIGNED_BYTE&&(te=s.RG8)),x===s.RGBA){const Se=ie?ir:Ke.getTransfer(se);B===s.FLOAT&&(te=s.RGBA32F),B===s.HALF_FLOAT&&(te=s.RGBA16F),B===s.UNSIGNED_BYTE&&(te=Se===it?s.SRGB8_ALPHA8:s.RGBA8),B===s.UNSIGNED_SHORT_4_4_4_4&&(te=s.RGBA4),B===s.UNSIGNED_SHORT_5_5_5_1&&(te=s.RGB5_A1)}return(te===s.R16F||te===s.R32F||te===s.RG16F||te===s.RG32F||te===s.RGBA16F||te===s.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function L(A,x,B){return M(A,B)===!0||A.isFramebufferTexture&&A.minFilter!==Dt&&A.minFilter!==Nt?Math.log2(Math.max(x.width,x.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?x.mipmaps.length:1}function C(A){return A===Dt||A===no||A===Er?s.NEAREST:s.LINEAR}function R(A){const x=A.target;x.removeEventListener("dispose",R),S(x),x.isVideoTexture&&h.delete(x)}function F(A){const x=A.target;x.removeEventListener("dispose",F),U(x)}function S(A){const x=i.get(A);if(x.__webglInit===void 0)return;const B=A.source,se=d.get(B);if(se){const ie=se[x.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&E(A),Object.keys(se).length===0&&d.delete(B)}i.remove(A)}function E(A){const x=i.get(A);s.deleteTexture(x.__webglTexture);const B=A.source,se=d.get(B);delete se[x.__cacheKey],a.memory.textures--}function U(A){const x=A.texture,B=i.get(A),se=i.get(x);if(se.__webglTexture!==void 0&&(s.deleteTexture(se.__webglTexture),a.memory.textures--),A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let ie=0;ie<6;ie++){if(Array.isArray(B.__webglFramebuffer[ie]))for(let te=0;te<B.__webglFramebuffer[ie].length;te++)s.deleteFramebuffer(B.__webglFramebuffer[ie][te]);else s.deleteFramebuffer(B.__webglFramebuffer[ie]);B.__webglDepthbuffer&&s.deleteRenderbuffer(B.__webglDepthbuffer[ie])}else{if(Array.isArray(B.__webglFramebuffer))for(let ie=0;ie<B.__webglFramebuffer.length;ie++)s.deleteFramebuffer(B.__webglFramebuffer[ie]);else s.deleteFramebuffer(B.__webglFramebuffer);if(B.__webglDepthbuffer&&s.deleteRenderbuffer(B.__webglDepthbuffer),B.__webglMultisampledFramebuffer&&s.deleteFramebuffer(B.__webglMultisampledFramebuffer),B.__webglColorRenderbuffer)for(let ie=0;ie<B.__webglColorRenderbuffer.length;ie++)B.__webglColorRenderbuffer[ie]&&s.deleteRenderbuffer(B.__webglColorRenderbuffer[ie]);B.__webglDepthRenderbuffer&&s.deleteRenderbuffer(B.__webglDepthRenderbuffer)}if(A.isWebGLMultipleRenderTargets)for(let ie=0,te=x.length;ie<te;ie++){const Se=i.get(x[ie]);Se.__webglTexture&&(s.deleteTexture(Se.__webglTexture),a.memory.textures--),i.remove(x[ie])}i.remove(x),i.remove(A)}let G=0;function K(){G=0}function I(){const A=G;return A>=n.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+n.maxTextures),G+=1,A}function O(A){const x=[];return x.push(A.wrapS),x.push(A.wrapT),x.push(A.wrapR||0),x.push(A.magFilter),x.push(A.minFilter),x.push(A.anisotropy),x.push(A.internalFormat),x.push(A.format),x.push(A.type),x.push(A.generateMipmaps),x.push(A.premultiplyAlpha),x.push(A.flipY),x.push(A.unpackAlignment),x.push(A.colorSpace),x.join()}function H(A,x){const B=i.get(A);if(A.isVideoTexture&&Ee(A),A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){const se=A.image;if(se===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{de(B,A,x);return}}t.bindTexture(s.TEXTURE_2D,B.__webglTexture,s.TEXTURE0+x)}function $(A,x){const B=i.get(A);if(A.version>0&&B.__version!==A.version){de(B,A,x);return}t.bindTexture(s.TEXTURE_2D_ARRAY,B.__webglTexture,s.TEXTURE0+x)}function Y(A,x){const B=i.get(A);if(A.version>0&&B.__version!==A.version){de(B,A,x);return}t.bindTexture(s.TEXTURE_3D,B.__webglTexture,s.TEXTURE0+x)}function X(A,x){const B=i.get(A);if(A.version>0&&B.__version!==A.version){xe(B,A,x);return}t.bindTexture(s.TEXTURE_CUBE_MAP,B.__webglTexture,s.TEXTURE0+x)}const Q={[fa]:s.REPEAT,[Ut]:s.CLAMP_TO_EDGE,[pa]:s.MIRRORED_REPEAT},ee={[Dt]:s.NEAREST,[no]:s.NEAREST_MIPMAP_NEAREST,[Er]:s.NEAREST_MIPMAP_LINEAR,[Nt]:s.LINEAR,[Bh]:s.LINEAR_MIPMAP_NEAREST,[is]:s.LINEAR_MIPMAP_LINEAR},he={[Zh]:s.NEVER,[iu]:s.ALWAYS,[Jh]:s.LESS,[dc]:s.LEQUAL,[Kh]:s.EQUAL,[tu]:s.GEQUAL,[Qh]:s.GREATER,[eu]:s.NOTEQUAL};function W(A,x,B){if(B?(s.texParameteri(A,s.TEXTURE_WRAP_S,Q[x.wrapS]),s.texParameteri(A,s.TEXTURE_WRAP_T,Q[x.wrapT]),(A===s.TEXTURE_3D||A===s.TEXTURE_2D_ARRAY)&&s.texParameteri(A,s.TEXTURE_WRAP_R,Q[x.wrapR]),s.texParameteri(A,s.TEXTURE_MAG_FILTER,ee[x.magFilter]),s.texParameteri(A,s.TEXTURE_MIN_FILTER,ee[x.minFilter])):(s.texParameteri(A,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(A,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(A===s.TEXTURE_3D||A===s.TEXTURE_2D_ARRAY)&&s.texParameteri(A,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(x.wrapS!==Ut||x.wrapT!==Ut)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(A,s.TEXTURE_MAG_FILTER,C(x.magFilter)),s.texParameteri(A,s.TEXTURE_MIN_FILTER,C(x.minFilter)),x.minFilter!==Dt&&x.minFilter!==Nt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),x.compareFunction&&(s.texParameteri(A,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(A,s.TEXTURE_COMPARE_FUNC,he[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const se=e.get("EXT_texture_filter_anisotropic");if(x.magFilter===Dt||x.minFilter!==Er&&x.minFilter!==is||x.type===Ri&&e.has("OES_texture_float_linear")===!1||o===!1&&x.type===ns&&e.has("OES_texture_half_float_linear")===!1)return;(x.anisotropy>1||i.get(x).__currentAnisotropy)&&(s.texParameterf(A,se.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,n.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy)}}function J(A,x){let B=!1;A.__webglInit===void 0&&(A.__webglInit=!0,x.addEventListener("dispose",R));const se=x.source;let ie=d.get(se);ie===void 0&&(ie={},d.set(se,ie));const te=O(x);if(te!==A.__cacheKey){ie[te]===void 0&&(ie[te]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,B=!0),ie[te].usedTimes++;const Se=ie[A.__cacheKey];Se!==void 0&&(ie[A.__cacheKey].usedTimes--,Se.usedTimes===0&&E(x)),A.__cacheKey=te,A.__webglTexture=ie[te].texture}return B}function de(A,x,B){let se=s.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(se=s.TEXTURE_2D_ARRAY),x.isData3DTexture&&(se=s.TEXTURE_3D);const ie=J(A,x),te=x.source;t.bindTexture(se,A.__webglTexture,s.TEXTURE0+B);const Se=i.get(te);if(te.version!==Se.__version||ie===!0){t.activeTexture(s.TEXTURE0+B);const ue=Ke.getPrimaries(Ke.workingColorSpace),_e=x.colorSpace===$t?null:Ke.getPrimaries(x.colorSpace),Te=x.colorSpace===$t||ue===_e?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);const ze=p(x)&&m(x.image)===!1;let ne=_(x.image,ze,!1,n.maxTextureSize);ne=me(x,ne);const Ye=m(ne)||o,je=r.convert(x.format,x.colorSpace);let Oe=r.convert(x.type),Ae=b(x.internalFormat,je,Oe,x.colorSpace,x.isVideoTexture);W(se,x,Ye);let ye;const Ge=x.mipmaps,Ze=o&&x.isVideoTexture!==!0&&Ae!==cc,ct=Se.__version===void 0||ie===!0,We=L(x,ne,Ye);if(x.isDepthTexture)Ae=s.DEPTH_COMPONENT,o?x.type===Ri?Ae=s.DEPTH_COMPONENT32F:x.type===Ci?Ae=s.DEPTH_COMPONENT24:x.type===Xi?Ae=s.DEPTH24_STENCIL8:Ae=s.DEPTH_COMPONENT16:x.type===Ri&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),x.format===qi&&Ae===s.DEPTH_COMPONENT&&x.type!==wa&&x.type!==Ci&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),x.type=Ci,Oe=r.convert(x.type)),x.format===In&&Ae===s.DEPTH_COMPONENT&&(Ae=s.DEPTH_STENCIL,x.type!==Xi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),x.type=Xi,Oe=r.convert(x.type))),ct&&(Ze?t.texStorage2D(s.TEXTURE_2D,1,Ae,ne.width,ne.height):t.texImage2D(s.TEXTURE_2D,0,Ae,ne.width,ne.height,0,je,Oe,null));else if(x.isDataTexture)if(Ge.length>0&&Ye){Ze&&ct&&t.texStorage2D(s.TEXTURE_2D,We,Ae,Ge[0].width,Ge[0].height);for(let le=0,D=Ge.length;le<D;le++)ye=Ge[le],Ze?t.texSubImage2D(s.TEXTURE_2D,le,0,0,ye.width,ye.height,je,Oe,ye.data):t.texImage2D(s.TEXTURE_2D,le,Ae,ye.width,ye.height,0,je,Oe,ye.data);x.generateMipmaps=!1}else Ze?(ct&&t.texStorage2D(s.TEXTURE_2D,We,Ae,ne.width,ne.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,ne.width,ne.height,je,Oe,ne.data)):t.texImage2D(s.TEXTURE_2D,0,Ae,ne.width,ne.height,0,je,Oe,ne.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Ze&&ct&&t.texStorage3D(s.TEXTURE_2D_ARRAY,We,Ae,Ge[0].width,Ge[0].height,ne.depth);for(let le=0,D=Ge.length;le<D;le++)ye=Ge[le],x.format!==ei?je!==null?Ze?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,le,0,0,0,ye.width,ye.height,ne.depth,je,ye.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,le,Ae,ye.width,ye.height,ne.depth,0,ye.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ze?t.texSubImage3D(s.TEXTURE_2D_ARRAY,le,0,0,0,ye.width,ye.height,ne.depth,je,Oe,ye.data):t.texImage3D(s.TEXTURE_2D_ARRAY,le,Ae,ye.width,ye.height,ne.depth,0,je,Oe,ye.data)}else{Ze&&ct&&t.texStorage2D(s.TEXTURE_2D,We,Ae,Ge[0].width,Ge[0].height);for(let le=0,D=Ge.length;le<D;le++)ye=Ge[le],x.format!==ei?je!==null?Ze?t.compressedTexSubImage2D(s.TEXTURE_2D,le,0,0,ye.width,ye.height,je,ye.data):t.compressedTexImage2D(s.TEXTURE_2D,le,Ae,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ze?t.texSubImage2D(s.TEXTURE_2D,le,0,0,ye.width,ye.height,je,Oe,ye.data):t.texImage2D(s.TEXTURE_2D,le,Ae,ye.width,ye.height,0,je,Oe,ye.data)}else if(x.isDataArrayTexture)Ze?(ct&&t.texStorage3D(s.TEXTURE_2D_ARRAY,We,Ae,ne.width,ne.height,ne.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,je,Oe,ne.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,Ae,ne.width,ne.height,ne.depth,0,je,Oe,ne.data);else if(x.isData3DTexture)Ze?(ct&&t.texStorage3D(s.TEXTURE_3D,We,Ae,ne.width,ne.height,ne.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,je,Oe,ne.data)):t.texImage3D(s.TEXTURE_3D,0,Ae,ne.width,ne.height,ne.depth,0,je,Oe,ne.data);else if(x.isFramebufferTexture){if(ct)if(Ze)t.texStorage2D(s.TEXTURE_2D,We,Ae,ne.width,ne.height);else{let le=ne.width,D=ne.height;for(let fe=0;fe<We;fe++)t.texImage2D(s.TEXTURE_2D,fe,Ae,le,D,0,je,Oe,null),le>>=1,D>>=1}}else if(Ge.length>0&&Ye){Ze&&ct&&t.texStorage2D(s.TEXTURE_2D,We,Ae,Ge[0].width,Ge[0].height);for(let le=0,D=Ge.length;le<D;le++)ye=Ge[le],Ze?t.texSubImage2D(s.TEXTURE_2D,le,0,0,je,Oe,ye):t.texImage2D(s.TEXTURE_2D,le,Ae,je,Oe,ye);x.generateMipmaps=!1}else Ze?(ct&&t.texStorage2D(s.TEXTURE_2D,We,Ae,ne.width,ne.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,je,Oe,ne)):t.texImage2D(s.TEXTURE_2D,0,Ae,je,Oe,ne);M(x,Ye)&&v(se),Se.__version=te.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function xe(A,x,B){if(x.image.length!==6)return;const se=J(A,x),ie=x.source;t.bindTexture(s.TEXTURE_CUBE_MAP,A.__webglTexture,s.TEXTURE0+B);const te=i.get(ie);if(ie.version!==te.__version||se===!0){t.activeTexture(s.TEXTURE0+B);const Se=Ke.getPrimaries(Ke.workingColorSpace),ue=x.colorSpace===$t?null:Ke.getPrimaries(x.colorSpace),_e=x.colorSpace===$t||Se===ue?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);const Te=x.isCompressedTexture||x.image[0].isCompressedTexture,ze=x.image[0]&&x.image[0].isDataTexture,ne=[];for(let le=0;le<6;le++)!Te&&!ze?ne[le]=_(x.image[le],!1,!0,n.maxCubemapSize):ne[le]=ze?x.image[le].image:x.image[le],ne[le]=me(x,ne[le]);const Ye=ne[0],je=m(Ye)||o,Oe=r.convert(x.format,x.colorSpace),Ae=r.convert(x.type),ye=b(x.internalFormat,Oe,Ae,x.colorSpace),Ge=o&&x.isVideoTexture!==!0,Ze=te.__version===void 0||se===!0;let ct=L(x,Ye,je);W(s.TEXTURE_CUBE_MAP,x,je);let We;if(Te){Ge&&Ze&&t.texStorage2D(s.TEXTURE_CUBE_MAP,ct,ye,Ye.width,Ye.height);for(let le=0;le<6;le++){We=ne[le].mipmaps;for(let D=0;D<We.length;D++){const fe=We[D];x.format!==ei?Oe!==null?Ge?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+le,D,0,0,fe.width,fe.height,Oe,fe.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+le,D,ye,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ge?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+le,D,0,0,fe.width,fe.height,Oe,Ae,fe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+le,D,ye,fe.width,fe.height,0,Oe,Ae,fe.data)}}}else{We=x.mipmaps,Ge&&Ze&&(We.length>0&&ct++,t.texStorage2D(s.TEXTURE_CUBE_MAP,ct,ye,ne[0].width,ne[0].height));for(let le=0;le<6;le++)if(ze){Ge?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,ne[le].width,ne[le].height,Oe,Ae,ne[le].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,ye,ne[le].width,ne[le].height,0,Oe,Ae,ne[le].data);for(let D=0;D<We.length;D++){const pe=We[D].image[le].image;Ge?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+le,D+1,0,0,pe.width,pe.height,Oe,Ae,pe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+le,D+1,ye,pe.width,pe.height,0,Oe,Ae,pe.data)}}else{Ge?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,Oe,Ae,ne[le]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,ye,Oe,Ae,ne[le]);for(let D=0;D<We.length;D++){const fe=We[D];Ge?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+le,D+1,0,0,Oe,Ae,fe.image[le]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+le,D+1,ye,Oe,Ae,fe.image[le])}}}M(x,je)&&v(s.TEXTURE_CUBE_MAP),te.__version=ie.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function ge(A,x,B,se,ie,te){const Se=r.convert(B.format,B.colorSpace),ue=r.convert(B.type),_e=b(B.internalFormat,Se,ue,B.colorSpace);if(!i.get(x).__hasExternalTextures){const ze=Math.max(1,x.width>>te),ne=Math.max(1,x.height>>te);ie===s.TEXTURE_3D||ie===s.TEXTURE_2D_ARRAY?t.texImage3D(ie,te,_e,ze,ne,x.depth,0,Se,ue,null):t.texImage2D(ie,te,_e,ze,ne,0,Se,ue,null)}t.bindFramebuffer(s.FRAMEBUFFER,A),q(x)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,se,ie,i.get(B).__webglTexture,0,re(x)):(ie===s.TEXTURE_2D||ie>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,se,ie,i.get(B).__webglTexture,te),t.bindFramebuffer(s.FRAMEBUFFER,null)}function we(A,x,B){if(s.bindRenderbuffer(s.RENDERBUFFER,A),x.depthBuffer&&!x.stencilBuffer){let se=o===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(B||q(x)){const ie=x.depthTexture;ie&&ie.isDepthTexture&&(ie.type===Ri?se=s.DEPTH_COMPONENT32F:ie.type===Ci&&(se=s.DEPTH_COMPONENT24));const te=re(x);q(x)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,te,se,x.width,x.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,te,se,x.width,x.height)}else s.renderbufferStorage(s.RENDERBUFFER,se,x.width,x.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,A)}else if(x.depthBuffer&&x.stencilBuffer){const se=re(x);B&&q(x)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,se,s.DEPTH24_STENCIL8,x.width,x.height):q(x)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,se,s.DEPTH24_STENCIL8,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,x.width,x.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,A)}else{const se=x.isWebGLMultipleRenderTargets===!0?x.texture:[x.texture];for(let ie=0;ie<se.length;ie++){const te=se[ie],Se=r.convert(te.format,te.colorSpace),ue=r.convert(te.type),_e=b(te.internalFormat,Se,ue,te.colorSpace),Te=re(x);B&&q(x)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Te,_e,x.width,x.height):q(x)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Te,_e,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,_e,x.width,x.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ue(A,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,A),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),H(x.depthTexture,0);const se=i.get(x.depthTexture).__webglTexture,ie=re(x);if(x.depthTexture.format===qi)q(x)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,se,0,ie):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,se,0);else if(x.depthTexture.format===In)q(x)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,se,0,ie):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function ae(A){const x=i.get(A),B=A.isWebGLCubeRenderTarget===!0;if(A.depthTexture&&!x.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");Ue(x.__webglFramebuffer,A)}else if(B){x.__webglDepthbuffer=[];for(let se=0;se<6;se++)t.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer[se]),x.__webglDepthbuffer[se]=s.createRenderbuffer(),we(x.__webglDepthbuffer[se],A,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer=s.createRenderbuffer(),we(x.__webglDepthbuffer,A,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function Pe(A,x,B){const se=i.get(A);x!==void 0&&ge(se.__webglFramebuffer,A,A.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),B!==void 0&&ae(A)}function P(A){const x=A.texture,B=i.get(A),se=i.get(x);A.addEventListener("dispose",F),A.isWebGLMultipleRenderTargets!==!0&&(se.__webglTexture===void 0&&(se.__webglTexture=s.createTexture()),se.__version=x.version,a.memory.textures++);const ie=A.isWebGLCubeRenderTarget===!0,te=A.isWebGLMultipleRenderTargets===!0,Se=m(A)||o;if(ie){B.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(o&&x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer[ue]=[];for(let _e=0;_e<x.mipmaps.length;_e++)B.__webglFramebuffer[ue][_e]=s.createFramebuffer()}else B.__webglFramebuffer[ue]=s.createFramebuffer()}else{if(o&&x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer=[];for(let ue=0;ue<x.mipmaps.length;ue++)B.__webglFramebuffer[ue]=s.createFramebuffer()}else B.__webglFramebuffer=s.createFramebuffer();if(te)if(n.drawBuffers){const ue=A.texture;for(let _e=0,Te=ue.length;_e<Te;_e++){const ze=i.get(ue[_e]);ze.__webglTexture===void 0&&(ze.__webglTexture=s.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&A.samples>0&&q(A)===!1){const ue=te?x:[x];B.__webglMultisampledFramebuffer=s.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let _e=0;_e<ue.length;_e++){const Te=ue[_e];B.__webglColorRenderbuffer[_e]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,B.__webglColorRenderbuffer[_e]);const ze=r.convert(Te.format,Te.colorSpace),ne=r.convert(Te.type),Ye=b(Te.internalFormat,ze,ne,Te.colorSpace,A.isXRRenderTarget===!0),je=re(A);s.renderbufferStorageMultisample(s.RENDERBUFFER,je,Ye,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+_e,s.RENDERBUFFER,B.__webglColorRenderbuffer[_e])}s.bindRenderbuffer(s.RENDERBUFFER,null),A.depthBuffer&&(B.__webglDepthRenderbuffer=s.createRenderbuffer(),we(B.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ie){t.bindTexture(s.TEXTURE_CUBE_MAP,se.__webglTexture),W(s.TEXTURE_CUBE_MAP,x,Se);for(let ue=0;ue<6;ue++)if(o&&x.mipmaps&&x.mipmaps.length>0)for(let _e=0;_e<x.mipmaps.length;_e++)ge(B.__webglFramebuffer[ue][_e],A,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,_e);else ge(B.__webglFramebuffer[ue],A,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);M(x,Se)&&v(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(te){const ue=A.texture;for(let _e=0,Te=ue.length;_e<Te;_e++){const ze=ue[_e],ne=i.get(ze);t.bindTexture(s.TEXTURE_2D,ne.__webglTexture),W(s.TEXTURE_2D,ze,Se),ge(B.__webglFramebuffer,A,ze,s.COLOR_ATTACHMENT0+_e,s.TEXTURE_2D,0),M(ze,Se)&&v(s.TEXTURE_2D)}t.unbindTexture()}else{let ue=s.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(o?ue=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ue,se.__webglTexture),W(ue,x,Se),o&&x.mipmaps&&x.mipmaps.length>0)for(let _e=0;_e<x.mipmaps.length;_e++)ge(B.__webglFramebuffer[_e],A,x,s.COLOR_ATTACHMENT0,ue,_e);else ge(B.__webglFramebuffer,A,x,s.COLOR_ATTACHMENT0,ue,0);M(x,Se)&&v(ue),t.unbindTexture()}A.depthBuffer&&ae(A)}function oe(A){const x=m(A)||o,B=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let se=0,ie=B.length;se<ie;se++){const te=B[se];if(M(te,x)){const Se=A.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,ue=i.get(te).__webglTexture;t.bindTexture(Se,ue),v(Se),t.unbindTexture()}}}function j(A){if(o&&A.samples>0&&q(A)===!1){const x=A.isWebGLMultipleRenderTargets?A.texture:[A.texture],B=A.width,se=A.height;let ie=s.COLOR_BUFFER_BIT;const te=[],Se=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ue=i.get(A),_e=A.isWebGLMultipleRenderTargets===!0;if(_e)for(let Te=0;Te<x.length;Te++)t.bindFramebuffer(s.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Te,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,ue.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Te,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let Te=0;Te<x.length;Te++){te.push(s.COLOR_ATTACHMENT0+Te),A.depthBuffer&&te.push(Se);const ze=ue.__ignoreDepthValues!==void 0?ue.__ignoreDepthValues:!1;if(ze===!1&&(A.depthBuffer&&(ie|=s.DEPTH_BUFFER_BIT),A.stencilBuffer&&(ie|=s.STENCIL_BUFFER_BIT)),_e&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,ue.__webglColorRenderbuffer[Te]),ze===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[Se]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[Se])),_e){const ne=i.get(x[Te]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ne,0)}s.blitFramebuffer(0,0,B,se,0,0,B,se,ie,s.NEAREST),c&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,te)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),_e)for(let Te=0;Te<x.length;Te++){t.bindFramebuffer(s.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Te,s.RENDERBUFFER,ue.__webglColorRenderbuffer[Te]);const ze=i.get(x[Te]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,ue.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Te,s.TEXTURE_2D,ze,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}}function re(A){return Math.min(n.maxSamples,A.samples)}function q(A){const x=i.get(A);return o&&A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Ee(A){const x=a.render.frame;h.get(A)!==x&&(h.set(A,x),A.update())}function me(A,x){const B=A.colorSpace,se=A.format,ie=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||A.format===ga||B!==Si&&B!==$t&&(Ke.getTransfer(B)===it?o===!1?e.has("EXT_sRGB")===!0&&se===ei?(A.format=ga,A.minFilter=Nt,A.generateMipmaps=!1):x=pc.sRGBToLinear(x):(se!==ei||ie!==Ii)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),x}this.allocateTextureUnit=I,this.resetTextureUnits=K,this.setTexture2D=H,this.setTexture2DArray=$,this.setTexture3D=Y,this.setTextureCube=X,this.rebindTextures=Pe,this.setupRenderTarget=P,this.updateRenderTargetMipmap=oe,this.updateMultisampleRenderTarget=j,this.setupDepthRenderbuffer=ae,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=q}function vg(s,e,t){const i=t.isWebGL2;function n(r,a=$t){let o;const l=Ke.getTransfer(a);if(r===Ii)return s.UNSIGNED_BYTE;if(r===sc)return s.UNSIGNED_SHORT_4_4_4_4;if(r===rc)return s.UNSIGNED_SHORT_5_5_5_1;if(r===zh)return s.BYTE;if(r===kh)return s.SHORT;if(r===wa)return s.UNSIGNED_SHORT;if(r===nc)return s.INT;if(r===Ci)return s.UNSIGNED_INT;if(r===Ri)return s.FLOAT;if(r===ns)return i?s.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===Gh)return s.ALPHA;if(r===ei)return s.RGBA;if(r===Vh)return s.LUMINANCE;if(r===Hh)return s.LUMINANCE_ALPHA;if(r===qi)return s.DEPTH_COMPONENT;if(r===In)return s.DEPTH_STENCIL;if(r===ga)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===Wh)return s.RED;if(r===ac)return s.RED_INTEGER;if(r===Xh)return s.RG;if(r===oc)return s.RG_INTEGER;if(r===lc)return s.RGBA_INTEGER;if(r===Ar||r===wr||r===Tr||r===Cr)if(l===it)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Ar)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===wr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Tr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Cr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Ar)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===wr)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Tr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Cr)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===so||r===ro||r===ao||r===oo)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===so)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===ro)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===ao)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===oo)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===cc)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===lo||r===co)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===lo)return l===it?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===co)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===ho||r===uo||r===fo||r===po||r===mo||r===go||r===vo||r===_o||r===yo||r===xo||r===So||r===Mo||r===bo||r===Eo)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===ho)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===uo)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===fo)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===po)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===mo)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===go)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===vo)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===_o)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===yo)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===xo)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===So)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Mo)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===bo)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Eo)return l===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Rr||r===Ao||r===wo)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===Rr)return l===it?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Ao)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===wo)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===qh||r===To||r===Co||r===Ro)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===Rr)return o.COMPRESSED_RED_RGTC1_EXT;if(r===To)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Co)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Ro)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Xi?i?s.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:n}}class _g extends Ht{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Bt extends mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const yg={type:"move"};class Kr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Bt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Bt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Bt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let n=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(n=t.getPose(e.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(yg)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Bt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class xg extends Un{constructor(e,t){super();const i=this;let n=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const _=t.getContextAttributes();let m=null,p=null;const M=[],v=[],b=new Z;let L=null;const C=new Ht;C.layers.enable(1),C.viewport=new st;const R=new Ht;R.layers.enable(2),R.viewport=new st;const F=[C,R],S=new _g;S.layers.enable(1),S.layers.enable(2);let E=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let J=M[W];return J===void 0&&(J=new Kr,M[W]=J),J.getTargetRaySpace()},this.getControllerGrip=function(W){let J=M[W];return J===void 0&&(J=new Kr,M[W]=J),J.getGripSpace()},this.getHand=function(W){let J=M[W];return J===void 0&&(J=new Kr,M[W]=J),J.getHandSpace()};function G(W){const J=v.indexOf(W.inputSource);if(J===-1)return;const de=M[J];de!==void 0&&(de.update(W.inputSource,W.frame,c||a),de.dispatchEvent({type:W.type,data:W.inputSource}))}function K(){n.removeEventListener("select",G),n.removeEventListener("selectstart",G),n.removeEventListener("selectend",G),n.removeEventListener("squeeze",G),n.removeEventListener("squeezestart",G),n.removeEventListener("squeezeend",G),n.removeEventListener("end",K),n.removeEventListener("inputsourceschange",I);for(let W=0;W<M.length;W++){const J=v[W];J!==null&&(v[W]=null,M[W].disconnect(J))}E=null,U=null,e.setRenderTarget(m),f=null,d=null,u=null,n=null,p=null,he.stop(),i.isPresenting=!1,e.setPixelRatio(L),e.setSize(b.width,b.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(W){if(n=W,n!==null){if(m=e.getRenderTarget(),n.addEventListener("select",G),n.addEventListener("selectstart",G),n.addEventListener("selectend",G),n.addEventListener("squeeze",G),n.addEventListener("squeezestart",G),n.addEventListener("squeezeend",G),n.addEventListener("end",K),n.addEventListener("inputsourceschange",I),_.xrCompatible!==!0&&await t.makeXRCompatible(),L=e.getPixelRatio(),e.getSize(b),n.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const J={antialias:n.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(n,t,J),n.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new Yi(f.framebufferWidth,f.framebufferHeight,{format:ei,type:Ii,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let J=null,de=null,xe=null;_.depth&&(xe=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,J=_.stencil?In:qi,de=_.stencil?Xi:Ci);const ge={colorFormat:t.RGBA8,depthFormat:xe,scaleFactor:r};u=new XRWebGLBinding(n,t),d=u.createProjectionLayer(ge),n.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),p=new Yi(d.textureWidth,d.textureHeight,{format:ei,type:Ii,depthTexture:new Ac(d.textureWidth,d.textureHeight,de,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const we=e.properties.get(p);we.__ignoreDepthValues=d.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await n.requestReferenceSpace(o),he.setContext(n),he.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode};function I(W){for(let J=0;J<W.removed.length;J++){const de=W.removed[J],xe=v.indexOf(de);xe>=0&&(v[xe]=null,M[xe].disconnect(de))}for(let J=0;J<W.added.length;J++){const de=W.added[J];let xe=v.indexOf(de);if(xe===-1){for(let we=0;we<M.length;we++)if(we>=v.length){v.push(de),xe=we;break}else if(v[we]===null){v[we]=de,xe=we;break}if(xe===-1)break}const ge=M[xe];ge&&ge.connect(de)}}const O=new T,H=new T;function $(W,J,de){O.setFromMatrixPosition(J.matrixWorld),H.setFromMatrixPosition(de.matrixWorld);const xe=O.distanceTo(H),ge=J.projectionMatrix.elements,we=de.projectionMatrix.elements,Ue=ge[14]/(ge[10]-1),ae=ge[14]/(ge[10]+1),Pe=(ge[9]+1)/ge[5],P=(ge[9]-1)/ge[5],oe=(ge[8]-1)/ge[0],j=(we[8]+1)/we[0],re=Ue*oe,q=Ue*j,Ee=xe/(-oe+j),me=Ee*-oe;J.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(me),W.translateZ(Ee),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert();const A=Ue+Ee,x=ae+Ee,B=re-me,se=q+(xe-me),ie=Pe*ae/x*A,te=P*ae/x*A;W.projectionMatrix.makePerspective(B,se,ie,te,A,x),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}function Y(W,J){J===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(J.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(n===null)return;S.near=R.near=C.near=W.near,S.far=R.far=C.far=W.far,(E!==S.near||U!==S.far)&&(n.updateRenderState({depthNear:S.near,depthFar:S.far}),E=S.near,U=S.far);const J=W.parent,de=S.cameras;Y(S,J);for(let xe=0;xe<de.length;xe++)Y(de[xe],J);de.length===2?$(S,C,R):S.projectionMatrix.copy(C.projectionMatrix),X(W,S,J)};function X(W,J,de){de===null?W.matrix.copy(J.matrixWorld):(W.matrix.copy(de.matrixWorld),W.matrix.invert(),W.matrix.multiply(J.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(J.projectionMatrix),W.projectionMatrixInverse.copy(J.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=ss*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(W){l=W,d!==null&&(d.fixedFoveation=W),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=W)};let Q=null;function ee(W,J){if(h=J.getViewerPose(c||a),g=J,h!==null){const de=h.views;f!==null&&(e.setRenderTargetFramebuffer(p,f.framebuffer),e.setRenderTarget(p));let xe=!1;de.length!==S.cameras.length&&(S.cameras.length=0,xe=!0);for(let ge=0;ge<de.length;ge++){const we=de[ge];let Ue=null;if(f!==null)Ue=f.getViewport(we);else{const Pe=u.getViewSubImage(d,we);Ue=Pe.viewport,ge===0&&(e.setRenderTargetTextures(p,Pe.colorTexture,d.ignoreDepthValues?void 0:Pe.depthStencilTexture),e.setRenderTarget(p))}let ae=F[ge];ae===void 0&&(ae=new Ht,ae.layers.enable(ge),ae.viewport=new st,F[ge]=ae),ae.matrix.fromArray(we.transform.matrix),ae.matrix.decompose(ae.position,ae.quaternion,ae.scale),ae.projectionMatrix.fromArray(we.projectionMatrix),ae.projectionMatrixInverse.copy(ae.projectionMatrix).invert(),ae.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),ge===0&&(S.matrix.copy(ae.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),xe===!0&&S.cameras.push(ae)}}for(let de=0;de<M.length;de++){const xe=v[de],ge=M[de];xe!==null&&ge!==void 0&&ge.update(xe,J,c||a)}Q&&Q(W,J),J.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:J}),g=null}const he=new bc;he.setAnimationLoop(ee),this.setAnimationLoop=function(W){Q=W},this.dispose=function(){}}}function Sg(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,xc(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function n(m,p,M,v,b){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,b)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,M,v):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===zt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===zt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=e.get(p).envMap;if(M&&(m.envMap.value=M,m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const v=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*v,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=v*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===zt&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const M=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function Mg(s,e,t,i){let n={},r={},a=[];const o=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(M,v){const b=v.program;i.uniformBlockBinding(M,b)}function c(M,v){let b=n[M.id];b===void 0&&(g(M),b=h(M),n[M.id]=b,M.addEventListener("dispose",m));const L=v.program;i.updateUBOMapping(M,L);const C=e.render.frame;r[M.id]!==C&&(d(M),r[M.id]=C)}function h(M){const v=u();M.__bindingPointIndex=v;const b=s.createBuffer(),L=M.__size,C=M.usage;return s.bindBuffer(s.UNIFORM_BUFFER,b),s.bufferData(s.UNIFORM_BUFFER,L,C),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,v,b),b}function u(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const v=n[M.id],b=M.uniforms,L=M.__cache;s.bindBuffer(s.UNIFORM_BUFFER,v);for(let C=0,R=b.length;C<R;C++){const F=Array.isArray(b[C])?b[C]:[b[C]];for(let S=0,E=F.length;S<E;S++){const U=F[S];if(f(U,C,S,L)===!0){const G=U.__offset,K=Array.isArray(U.value)?U.value:[U.value];let I=0;for(let O=0;O<K.length;O++){const H=K[O],$=_(H);typeof H=="number"||typeof H=="boolean"?(U.__data[0]=H,s.bufferSubData(s.UNIFORM_BUFFER,G+I,U.__data)):H.isMatrix3?(U.__data[0]=H.elements[0],U.__data[1]=H.elements[1],U.__data[2]=H.elements[2],U.__data[3]=0,U.__data[4]=H.elements[3],U.__data[5]=H.elements[4],U.__data[6]=H.elements[5],U.__data[7]=0,U.__data[8]=H.elements[6],U.__data[9]=H.elements[7],U.__data[10]=H.elements[8],U.__data[11]=0):(H.toArray(U.__data,I),I+=$.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,G,U.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(M,v,b,L){const C=M.value,R=v+"_"+b;if(L[R]===void 0)return typeof C=="number"||typeof C=="boolean"?L[R]=C:L[R]=C.clone(),!0;{const F=L[R];if(typeof C=="number"||typeof C=="boolean"){if(F!==C)return L[R]=C,!0}else if(F.equals(C)===!1)return F.copy(C),!0}return!1}function g(M){const v=M.uniforms;let b=0;const L=16;for(let R=0,F=v.length;R<F;R++){const S=Array.isArray(v[R])?v[R]:[v[R]];for(let E=0,U=S.length;E<U;E++){const G=S[E],K=Array.isArray(G.value)?G.value:[G.value];for(let I=0,O=K.length;I<O;I++){const H=K[I],$=_(H),Y=b%L;Y!==0&&L-Y<$.boundary&&(b+=L-Y),G.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=b,b+=$.storage}}}const C=b%L;return C>0&&(b+=L-C),M.__size=b,M.__cache={},this}function _(M){const v={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(v.boundary=4,v.storage=4):M.isVector2?(v.boundary=8,v.storage=8):M.isVector3||M.isColor?(v.boundary=16,v.storage=12):M.isVector4?(v.boundary=16,v.storage=16):M.isMatrix3?(v.boundary=48,v.storage=48):M.isMatrix4?(v.boundary=64,v.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),v}function m(M){const v=M.target;v.removeEventListener("dispose",m);const b=a.indexOf(v.__bindingPointIndex);a.splice(b,1),s.deleteBuffer(n[v.id]),delete n[v.id],delete r[v.id]}function p(){for(const M in n)s.deleteBuffer(n[M]);a=[],n={},r={}}return{bind:l,update:c,dispose:p}}class Lc{constructor(e={}){const{canvas:t=vu(),context:i=null,depth:n=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=a;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const p=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=nt,this._useLegacyLights=!1,this.toneMapping=Li,this.toneMappingExposure=1;const v=this;let b=!1,L=0,C=0,R=null,F=-1,S=null;const E=new st,U=new st;let G=null;const K=new Ne(0);let I=0,O=t.width,H=t.height,$=1,Y=null,X=null;const Q=new st(0,0,O,H),ee=new st(0,0,O,H);let he=!1;const W=new Pa;let J=!1,de=!1,xe=null;const ge=new rt,we=new Z,Ue=new T,ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Pe(){return R===null?$:1}let P=i;function oe(w,N){for(let k=0;k<w.length;k++){const V=w[k],z=t.getContext(V,N);if(z!==null)return z}return null}try{const w={alpha:!0,depth:n,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Aa}`),t.addEventListener("webglcontextlost",le,!1),t.addEventListener("webglcontextrestored",D,!1),t.addEventListener("webglcontextcreationerror",fe,!1),P===null){const N=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&N.shift(),P=oe(N,w),P===null)throw oe(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&P instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),P.getShaderPrecisionFormat===void 0&&(P.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let j,re,q,Ee,me,A,x,B,se,ie,te,Se,ue,_e,Te,ze,ne,Ye,je,Oe,Ae,ye,Ge,Ze;function ct(){j=new Ip(P),re=new wp(P,j,e),j.init(re),ye=new vg(P,j,re),q=new mg(P,j,re),Ee=new Fp(P),me=new tg,A=new gg(P,j,q,me,re,ye,Ee),x=new Cp(v),B=new Lp(v),se=new Vu(P,re),Ge=new Ep(P,j,se,re),ie=new Dp(P,se,Ee,Ge),te=new zp(P,ie,se,Ee),je=new Bp(P,re,A),ze=new Tp(me),Se=new eg(v,x,B,j,re,Ge,ze),ue=new Sg(v,me),_e=new ng,Te=new cg(j,re),Ye=new bp(v,x,B,q,te,d,l),ne=new pg(v,te,re),Ze=new Mg(P,Ee,re,q),Oe=new Ap(P,j,Ee,re),Ae=new Up(P,j,Ee,re),Ee.programs=Se.programs,v.capabilities=re,v.extensions=j,v.properties=me,v.renderLists=_e,v.shadowMap=ne,v.state=q,v.info=Ee}ct();const We=new xg(v,P);this.xr=We,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const w=j.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=j.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(w){w!==void 0&&($=w,this.setSize(O,H,!1))},this.getSize=function(w){return w.set(O,H)},this.setSize=function(w,N,k=!0){if(We.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=w,H=N,t.width=Math.floor(w*$),t.height=Math.floor(N*$),k===!0&&(t.style.width=w+"px",t.style.height=N+"px"),this.setViewport(0,0,w,N)},this.getDrawingBufferSize=function(w){return w.set(O*$,H*$).floor()},this.setDrawingBufferSize=function(w,N,k){O=w,H=N,$=k,t.width=Math.floor(w*k),t.height=Math.floor(N*k),this.setViewport(0,0,w,N)},this.getCurrentViewport=function(w){return w.copy(E)},this.getViewport=function(w){return w.copy(Q)},this.setViewport=function(w,N,k,V){w.isVector4?Q.set(w.x,w.y,w.z,w.w):Q.set(w,N,k,V),q.viewport(E.copy(Q).multiplyScalar($).floor())},this.getScissor=function(w){return w.copy(ee)},this.setScissor=function(w,N,k,V){w.isVector4?ee.set(w.x,w.y,w.z,w.w):ee.set(w,N,k,V),q.scissor(U.copy(ee).multiplyScalar($).floor())},this.getScissorTest=function(){return he},this.setScissorTest=function(w){q.setScissorTest(he=w)},this.setOpaqueSort=function(w){Y=w},this.setTransparentSort=function(w){X=w},this.getClearColor=function(w){return w.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor.apply(Ye,arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha.apply(Ye,arguments)},this.clear=function(w=!0,N=!0,k=!0){let V=0;if(w){let z=!1;if(R!==null){const ve=R.texture.format;z=ve===lc||ve===oc||ve===ac}if(z){const ve=R.texture.type,be=ve===Ii||ve===Ci||ve===wa||ve===Xi||ve===sc||ve===rc,Le=Ye.getClearColor(),Fe=Ye.getClearAlpha(),He=Le.r,Be=Le.g,ke=Le.b;be?(f[0]=He,f[1]=Be,f[2]=ke,f[3]=Fe,P.clearBufferuiv(P.COLOR,0,f)):(g[0]=He,g[1]=Be,g[2]=ke,g[3]=Fe,P.clearBufferiv(P.COLOR,0,g))}else V|=P.COLOR_BUFFER_BIT}N&&(V|=P.DEPTH_BUFFER_BIT),k&&(V|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",le,!1),t.removeEventListener("webglcontextrestored",D,!1),t.removeEventListener("webglcontextcreationerror",fe,!1),_e.dispose(),Te.dispose(),me.dispose(),x.dispose(),B.dispose(),te.dispose(),Ge.dispose(),Ze.dispose(),Se.dispose(),We.dispose(),We.removeEventListener("sessionstart",Rt),We.removeEventListener("sessionend",tt),xe&&(xe.dispose(),xe=null),Pt.stop()};function le(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function D(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const w=Ee.autoReset,N=ne.enabled,k=ne.autoUpdate,V=ne.needsUpdate,z=ne.type;ct(),Ee.autoReset=w,ne.enabled=N,ne.autoUpdate=k,ne.needsUpdate=V,ne.type=z}function fe(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function pe(w){const N=w.target;N.removeEventListener("dispose",pe),Ie(N)}function Ie(w){Ce(w),me.remove(w)}function Ce(w){const N=me.get(w).programs;N!==void 0&&(N.forEach(function(k){Se.releaseProgram(k)}),w.isShaderMaterial&&Se.releaseShaderCache(w))}this.renderBufferDirect=function(w,N,k,V,z,ve){N===null&&(N=ae);const be=z.isMesh&&z.matrixWorld.determinant()<0,Le=Kc(w,N,k,V,z);q.setMaterial(V,be);let Fe=k.index,He=1;if(V.wireframe===!0){if(Fe=ie.getWireframeAttribute(k),Fe===void 0)return;He=2}const Be=k.drawRange,ke=k.attributes.position;let dt=Be.start*He,kt=(Be.start+Be.count)*He;ve!==null&&(dt=Math.max(dt,ve.start*He),kt=Math.min(kt,(ve.start+ve.count)*He)),Fe!==null?(dt=Math.max(dt,0),kt=Math.min(kt,Fe.count)):ke!=null&&(dt=Math.max(dt,0),kt=Math.min(kt,ke.count));const xt=kt-dt;if(xt<0||xt===1/0)return;Ge.setup(z,V,Le,k,Fe);let di,ot=Oe;if(Fe!==null&&(di=se.get(Fe),ot=Ae,ot.setIndex(di)),z.isMesh)V.wireframe===!0?(q.setLineWidth(V.wireframeLinewidth*Pe()),ot.setMode(P.LINES)):ot.setMode(P.TRIANGLES);else if(z.isLine){let Xe=V.linewidth;Xe===void 0&&(Xe=1),q.setLineWidth(Xe*Pe()),z.isLineSegments?ot.setMode(P.LINES):z.isLineLoop?ot.setMode(P.LINE_LOOP):ot.setMode(P.LINE_STRIP)}else z.isPoints?ot.setMode(P.POINTS):z.isSprite&&ot.setMode(P.TRIANGLES);if(z.isBatchedMesh)ot.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else if(z.isInstancedMesh)ot.renderInstances(dt,xt,z.count);else if(k.isInstancedBufferGeometry){const Xe=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,xr=Math.min(k.instanceCount,Xe);ot.renderInstances(dt,xt,xr)}else ot.render(dt,xt)};function Qe(w,N,k){w.transparent===!0&&w.side===Ot&&w.forceSinglePass===!1?(w.side=zt,w.needsUpdate=!0,fs(w,N,k),w.side=xi,w.needsUpdate=!0,fs(w,N,k),w.side=Ot):fs(w,N,k)}this.compile=function(w,N,k=null){k===null&&(k=w),m=Te.get(k),m.init(),M.push(m),k.traverseVisible(function(z){z.isLight&&z.layers.test(N.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),w!==k&&w.traverseVisible(function(z){z.isLight&&z.layers.test(N.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),m.setupLights(v._useLegacyLights);const V=new Set;return w.traverse(function(z){const ve=z.material;if(ve)if(Array.isArray(ve))for(let be=0;be<ve.length;be++){const Le=ve[be];Qe(Le,k,z),V.add(Le)}else Qe(ve,k,z),V.add(ve)}),M.pop(),m=null,V},this.compileAsync=function(w,N,k=null){const V=this.compile(w,N,k);return new Promise(z=>{function ve(){if(V.forEach(function(be){me.get(be).currentProgram.isReady()&&V.delete(be)}),V.size===0){z(w);return}setTimeout(ve,10)}j.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let et=null;function yt(w){et&&et(w)}function Rt(){Pt.stop()}function tt(){Pt.start()}const Pt=new bc;Pt.setAnimationLoop(yt),typeof self<"u"&&Pt.setContext(self),this.setAnimationLoop=function(w){et=w,We.setAnimationLoop(w),w===null?Pt.stop():Pt.start()},We.addEventListener("sessionstart",Rt),We.addEventListener("sessionend",tt),this.render=function(w,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),We.enabled===!0&&We.isPresenting===!0&&(We.cameraAutoUpdate===!0&&We.updateCamera(N),N=We.getCamera()),w.isScene===!0&&w.onBeforeRender(v,w,N,R),m=Te.get(w,M.length),m.init(),M.push(m),ge.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),W.setFromProjectionMatrix(ge),de=this.localClippingEnabled,J=ze.init(this.clippingPlanes,de),_=_e.get(w,p.length),_.init(),p.push(_),ii(w,N,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(Y,X),this.info.render.frame++,J===!0&&ze.beginShadows();const k=m.state.shadowsArray;if(ne.render(k,w,N),J===!0&&ze.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ye.render(_,w),m.setupLights(v._useLegacyLights),N.isArrayCamera){const V=N.cameras;for(let z=0,ve=V.length;z<ve;z++){const be=V[z];Xa(_,w,be,be.viewport)}}else Xa(_,w,N);R!==null&&(A.updateMultisampleRenderTarget(R),A.updateRenderTargetMipmap(R)),w.isScene===!0&&w.onAfterRender(v,w,N),Ge.resetDefaultState(),F=-1,S=null,M.pop(),M.length>0?m=M[M.length-1]:m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function ii(w,N,k,V){if(w.visible===!1)return;if(w.layers.test(N.layers)){if(w.isGroup)k=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(N);else if(w.isLight)m.pushLight(w),w.castShadow&&m.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||W.intersectsSprite(w)){V&&Ue.setFromMatrixPosition(w.matrixWorld).applyMatrix4(ge);const be=te.update(w),Le=w.material;Le.visible&&_.push(w,be,Le,k,Ue.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||W.intersectsObject(w))){const be=te.update(w),Le=w.material;if(V&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Ue.copy(w.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),Ue.copy(be.boundingSphere.center)),Ue.applyMatrix4(w.matrixWorld).applyMatrix4(ge)),Array.isArray(Le)){const Fe=be.groups;for(let He=0,Be=Fe.length;He<Be;He++){const ke=Fe[He],dt=Le[ke.materialIndex];dt&&dt.visible&&_.push(w,be,dt,k,Ue.z,ke)}}else Le.visible&&_.push(w,be,Le,k,Ue.z,null)}}const ve=w.children;for(let be=0,Le=ve.length;be<Le;be++)ii(ve[be],N,k,V)}function Xa(w,N,k,V){const z=w.opaque,ve=w.transmissive,be=w.transparent;m.setupLightsView(k),J===!0&&ze.setGlobalState(v.clippingPlanes,k),ve.length>0&&Jc(z,ve,N,k),V&&q.viewport(E.copy(V)),z.length>0&&ds(z,N,k),ve.length>0&&ds(ve,N,k),be.length>0&&ds(be,N,k),q.buffers.depth.setTest(!0),q.buffers.depth.setMask(!0),q.buffers.color.setMask(!0),q.setPolygonOffset(!1)}function Jc(w,N,k,V){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;const ve=re.isWebGL2;xe===null&&(xe=new Yi(1,1,{generateMipmaps:!0,type:j.has("EXT_color_buffer_half_float")?ns:Ii,minFilter:is,samples:ve?4:0})),v.getDrawingBufferSize(we),ve?xe.setSize(we.x,we.y):xe.setSize(ar(we.x),ar(we.y));const be=v.getRenderTarget();v.setRenderTarget(xe),v.getClearColor(K),I=v.getClearAlpha(),I<1&&v.setClearColor(16777215,.5),v.clear();const Le=v.toneMapping;v.toneMapping=Li,ds(w,k,V),A.updateMultisampleRenderTarget(xe),A.updateRenderTargetMipmap(xe);let Fe=!1;for(let He=0,Be=N.length;He<Be;He++){const ke=N[He],dt=ke.object,kt=ke.geometry,xt=ke.material,di=ke.group;if(xt.side===Ot&&dt.layers.test(V.layers)){const ot=xt.side;xt.side=zt,xt.needsUpdate=!0,qa(dt,k,V,kt,xt,di),xt.side=ot,xt.needsUpdate=!0,Fe=!0}}Fe===!0&&(A.updateMultisampleRenderTarget(xe),A.updateRenderTargetMipmap(xe)),v.setRenderTarget(be),v.setClearColor(K,I),v.toneMapping=Le}function ds(w,N,k){const V=N.isScene===!0?N.overrideMaterial:null;for(let z=0,ve=w.length;z<ve;z++){const be=w[z],Le=be.object,Fe=be.geometry,He=V===null?be.material:V,Be=be.group;Le.layers.test(k.layers)&&qa(Le,N,k,Fe,He,Be)}}function qa(w,N,k,V,z,ve){w.onBeforeRender(v,N,k,V,z,ve),w.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),z.onBeforeRender(v,N,k,V,w,ve),z.transparent===!0&&z.side===Ot&&z.forceSinglePass===!1?(z.side=zt,z.needsUpdate=!0,v.renderBufferDirect(k,N,V,z,w,ve),z.side=xi,z.needsUpdate=!0,v.renderBufferDirect(k,N,V,z,w,ve),z.side=Ot):v.renderBufferDirect(k,N,V,z,w,ve),w.onAfterRender(v,N,k,V,z,ve)}function fs(w,N,k){N.isScene!==!0&&(N=ae);const V=me.get(w),z=m.state.lights,ve=m.state.shadowsArray,be=z.state.version,Le=Se.getParameters(w,z.state,ve,N,k),Fe=Se.getProgramCacheKey(Le);let He=V.programs;V.environment=w.isMeshStandardMaterial?N.environment:null,V.fog=N.fog,V.envMap=(w.isMeshStandardMaterial?B:x).get(w.envMap||V.environment),He===void 0&&(w.addEventListener("dispose",pe),He=new Map,V.programs=He);let Be=He.get(Fe);if(Be!==void 0){if(V.currentProgram===Be&&V.lightsStateVersion===be)return Ya(w,Le),Be}else Le.uniforms=Se.getUniforms(w),w.onBuild(k,Le,v),w.onBeforeCompile(Le,v),Be=Se.acquireProgram(Le,Fe),He.set(Fe,Be),V.uniforms=Le.uniforms;const ke=V.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(ke.clippingPlanes=ze.uniform),Ya(w,Le),V.needsLights=eh(w),V.lightsStateVersion=be,V.needsLights&&(ke.ambientLightColor.value=z.state.ambient,ke.lightProbe.value=z.state.probe,ke.directionalLights.value=z.state.directional,ke.directionalLightShadows.value=z.state.directionalShadow,ke.spotLights.value=z.state.spot,ke.spotLightShadows.value=z.state.spotShadow,ke.rectAreaLights.value=z.state.rectArea,ke.ltc_1.value=z.state.rectAreaLTC1,ke.ltc_2.value=z.state.rectAreaLTC2,ke.pointLights.value=z.state.point,ke.pointLightShadows.value=z.state.pointShadow,ke.hemisphereLights.value=z.state.hemi,ke.directionalShadowMap.value=z.state.directionalShadowMap,ke.directionalShadowMatrix.value=z.state.directionalShadowMatrix,ke.spotShadowMap.value=z.state.spotShadowMap,ke.spotLightMatrix.value=z.state.spotLightMatrix,ke.spotLightMap.value=z.state.spotLightMap,ke.pointShadowMap.value=z.state.pointShadowMap,ke.pointShadowMatrix.value=z.state.pointShadowMatrix),V.currentProgram=Be,V.uniformsList=null,Be}function ja(w){if(w.uniformsList===null){const N=w.currentProgram.getUniforms();w.uniformsList=Js.seqWithValue(N.seq,w.uniforms)}return w.uniformsList}function Ya(w,N){const k=me.get(w);k.outputColorSpace=N.outputColorSpace,k.batching=N.batching,k.instancing=N.instancing,k.instancingColor=N.instancingColor,k.skinning=N.skinning,k.morphTargets=N.morphTargets,k.morphNormals=N.morphNormals,k.morphColors=N.morphColors,k.morphTargetsCount=N.morphTargetsCount,k.numClippingPlanes=N.numClippingPlanes,k.numIntersection=N.numClipIntersection,k.vertexAlphas=N.vertexAlphas,k.vertexTangents=N.vertexTangents,k.toneMapping=N.toneMapping}function Kc(w,N,k,V,z){N.isScene!==!0&&(N=ae),A.resetTextureUnits();const ve=N.fog,be=V.isMeshStandardMaterial?N.environment:null,Le=R===null?v.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Si,Fe=(V.isMeshStandardMaterial?B:x).get(V.envMap||be),He=V.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Be=!!k.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),ke=!!k.morphAttributes.position,dt=!!k.morphAttributes.normal,kt=!!k.morphAttributes.color;let xt=Li;V.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(xt=v.toneMapping);const di=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ot=di!==void 0?di.length:0,Xe=me.get(V),xr=m.state.lights;if(J===!0&&(de===!0||w!==S)){const Xt=w===S&&V.id===F;ze.setState(V,w,Xt)}let ht=!1;V.version===Xe.__version?(Xe.needsLights&&Xe.lightsStateVersion!==xr.state.version||Xe.outputColorSpace!==Le||z.isBatchedMesh&&Xe.batching===!1||!z.isBatchedMesh&&Xe.batching===!0||z.isInstancedMesh&&Xe.instancing===!1||!z.isInstancedMesh&&Xe.instancing===!0||z.isSkinnedMesh&&Xe.skinning===!1||!z.isSkinnedMesh&&Xe.skinning===!0||z.isInstancedMesh&&Xe.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Xe.instancingColor===!1&&z.instanceColor!==null||Xe.envMap!==Fe||V.fog===!0&&Xe.fog!==ve||Xe.numClippingPlanes!==void 0&&(Xe.numClippingPlanes!==ze.numPlanes||Xe.numIntersection!==ze.numIntersection)||Xe.vertexAlphas!==He||Xe.vertexTangents!==Be||Xe.morphTargets!==ke||Xe.morphNormals!==dt||Xe.morphColors!==kt||Xe.toneMapping!==xt||re.isWebGL2===!0&&Xe.morphTargetsCount!==ot)&&(ht=!0):(ht=!0,Xe.__version=V.version);let Fi=Xe.currentProgram;ht===!0&&(Fi=fs(V,N,z));let $a=!1,Nn=!1,Sr=!1;const At=Fi.getUniforms(),Ni=Xe.uniforms;if(q.useProgram(Fi.program)&&($a=!0,Nn=!0,Sr=!0),V.id!==F&&(F=V.id,Nn=!0),$a||S!==w){At.setValue(P,"projectionMatrix",w.projectionMatrix),At.setValue(P,"viewMatrix",w.matrixWorldInverse);const Xt=At.map.cameraPosition;Xt!==void 0&&Xt.setValue(P,Ue.setFromMatrixPosition(w.matrixWorld)),re.logarithmicDepthBuffer&&At.setValue(P,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&At.setValue(P,"isOrthographic",w.isOrthographicCamera===!0),S!==w&&(S=w,Nn=!0,Sr=!0)}if(z.isSkinnedMesh){At.setOptional(P,z,"bindMatrix"),At.setOptional(P,z,"bindMatrixInverse");const Xt=z.skeleton;Xt&&(re.floatVertexTextures?(Xt.boneTexture===null&&Xt.computeBoneTexture(),At.setValue(P,"boneTexture",Xt.boneTexture,A)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}z.isBatchedMesh&&(At.setOptional(P,z,"batchingTexture"),At.setValue(P,"batchingTexture",z._matricesTexture,A));const Mr=k.morphAttributes;if((Mr.position!==void 0||Mr.normal!==void 0||Mr.color!==void 0&&re.isWebGL2===!0)&&je.update(z,k,Fi),(Nn||Xe.receiveShadow!==z.receiveShadow)&&(Xe.receiveShadow=z.receiveShadow,At.setValue(P,"receiveShadow",z.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(Ni.envMap.value=Fe,Ni.flipEnvMap.value=Fe.isCubeTexture&&Fe.isRenderTargetTexture===!1?-1:1),Nn&&(At.setValue(P,"toneMappingExposure",v.toneMappingExposure),Xe.needsLights&&Qc(Ni,Sr),ve&&V.fog===!0&&ue.refreshFogUniforms(Ni,ve),ue.refreshMaterialUniforms(Ni,V,$,H,xe),Js.upload(P,ja(Xe),Ni,A)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Js.upload(P,ja(Xe),Ni,A),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&At.setValue(P,"center",z.center),At.setValue(P,"modelViewMatrix",z.modelViewMatrix),At.setValue(P,"normalMatrix",z.normalMatrix),At.setValue(P,"modelMatrix",z.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Xt=V.uniformsGroups;for(let br=0,th=Xt.length;br<th;br++)if(re.isWebGL2){const Za=Xt[br];Ze.update(Za,Fi),Ze.bind(Za,Fi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Fi}function Qc(w,N){w.ambientLightColor.needsUpdate=N,w.lightProbe.needsUpdate=N,w.directionalLights.needsUpdate=N,w.directionalLightShadows.needsUpdate=N,w.pointLights.needsUpdate=N,w.pointLightShadows.needsUpdate=N,w.spotLights.needsUpdate=N,w.spotLightShadows.needsUpdate=N,w.rectAreaLights.needsUpdate=N,w.hemisphereLights.needsUpdate=N}function eh(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(w,N,k){me.get(w.texture).__webglTexture=N,me.get(w.depthTexture).__webglTexture=k;const V=me.get(w);V.__hasExternalTextures=!0,V.__hasExternalTextures&&(V.__autoAllocateDepthBuffer=k===void 0,V.__autoAllocateDepthBuffer||j.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(w,N){const k=me.get(w);k.__webglFramebuffer=N,k.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(w,N=0,k=0){R=w,L=N,C=k;let V=!0,z=null,ve=!1,be=!1;if(w){const Fe=me.get(w);Fe.__useDefaultFramebuffer!==void 0?(q.bindFramebuffer(P.FRAMEBUFFER,null),V=!1):Fe.__webglFramebuffer===void 0?A.setupRenderTarget(w):Fe.__hasExternalTextures&&A.rebindTextures(w,me.get(w.texture).__webglTexture,me.get(w.depthTexture).__webglTexture);const He=w.texture;(He.isData3DTexture||He.isDataArrayTexture||He.isCompressedArrayTexture)&&(be=!0);const Be=me.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Be[N])?z=Be[N][k]:z=Be[N],ve=!0):re.isWebGL2&&w.samples>0&&A.useMultisampledRTT(w)===!1?z=me.get(w).__webglMultisampledFramebuffer:Array.isArray(Be)?z=Be[k]:z=Be,E.copy(w.viewport),U.copy(w.scissor),G=w.scissorTest}else E.copy(Q).multiplyScalar($).floor(),U.copy(ee).multiplyScalar($).floor(),G=he;if(q.bindFramebuffer(P.FRAMEBUFFER,z)&&re.drawBuffers&&V&&q.drawBuffers(w,z),q.viewport(E),q.scissor(U),q.setScissorTest(G),ve){const Fe=me.get(w.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+N,Fe.__webglTexture,k)}else if(be){const Fe=me.get(w.texture),He=N||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Fe.__webglTexture,k||0,He)}F=-1},this.readRenderTargetPixels=function(w,N,k,V,z,ve,be){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=me.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&be!==void 0&&(Le=Le[be]),Le){q.bindFramebuffer(P.FRAMEBUFFER,Le);try{const Fe=w.texture,He=Fe.format,Be=Fe.type;if(He!==ei&&ye.convert(He)!==P.getParameter(P.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const ke=Be===ns&&(j.has("EXT_color_buffer_half_float")||re.isWebGL2&&j.has("EXT_color_buffer_float"));if(Be!==Ii&&ye.convert(Be)!==P.getParameter(P.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Be===Ri&&(re.isWebGL2||j.has("OES_texture_float")||j.has("WEBGL_color_buffer_float")))&&!ke){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=w.width-V&&k>=0&&k<=w.height-z&&P.readPixels(N,k,V,z,ye.convert(He),ye.convert(Be),ve)}finally{const Fe=R!==null?me.get(R).__webglFramebuffer:null;q.bindFramebuffer(P.FRAMEBUFFER,Fe)}}},this.copyFramebufferToTexture=function(w,N,k=0){const V=Math.pow(2,-k),z=Math.floor(N.image.width*V),ve=Math.floor(N.image.height*V);A.setTexture2D(N,0),P.copyTexSubImage2D(P.TEXTURE_2D,k,0,0,w.x,w.y,z,ve),q.unbindTexture()},this.copyTextureToTexture=function(w,N,k,V=0){const z=N.image.width,ve=N.image.height,be=ye.convert(k.format),Le=ye.convert(k.type);A.setTexture2D(k,0),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,k.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,k.unpackAlignment),N.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,V,w.x,w.y,z,ve,be,Le,N.image.data):N.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,V,w.x,w.y,N.mipmaps[0].width,N.mipmaps[0].height,be,N.mipmaps[0].data):P.texSubImage2D(P.TEXTURE_2D,V,w.x,w.y,be,Le,N.image),V===0&&k.generateMipmaps&&P.generateMipmap(P.TEXTURE_2D),q.unbindTexture()},this.copyTextureToTexture3D=function(w,N,k,V,z=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ve=w.max.x-w.min.x+1,be=w.max.y-w.min.y+1,Le=w.max.z-w.min.z+1,Fe=ye.convert(V.format),He=ye.convert(V.type);let Be;if(V.isData3DTexture)A.setTexture3D(V,0),Be=P.TEXTURE_3D;else if(V.isDataArrayTexture||V.isCompressedArrayTexture)A.setTexture2DArray(V,0),Be=P.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,V.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,V.unpackAlignment);const ke=P.getParameter(P.UNPACK_ROW_LENGTH),dt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),kt=P.getParameter(P.UNPACK_SKIP_PIXELS),xt=P.getParameter(P.UNPACK_SKIP_ROWS),di=P.getParameter(P.UNPACK_SKIP_IMAGES),ot=k.isCompressedTexture?k.mipmaps[z]:k.image;P.pixelStorei(P.UNPACK_ROW_LENGTH,ot.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ot.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,w.min.x),P.pixelStorei(P.UNPACK_SKIP_ROWS,w.min.y),P.pixelStorei(P.UNPACK_SKIP_IMAGES,w.min.z),k.isDataTexture||k.isData3DTexture?P.texSubImage3D(Be,z,N.x,N.y,N.z,ve,be,Le,Fe,He,ot.data):k.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),P.compressedTexSubImage3D(Be,z,N.x,N.y,N.z,ve,be,Le,Fe,ot.data)):P.texSubImage3D(Be,z,N.x,N.y,N.z,ve,be,Le,Fe,He,ot),P.pixelStorei(P.UNPACK_ROW_LENGTH,ke),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,dt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,kt),P.pixelStorei(P.UNPACK_SKIP_ROWS,xt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,di),z===0&&V.generateMipmaps&&P.generateMipmap(Be),q.unbindTexture()},this.initTexture=function(w){w.isCubeTexture?A.setTextureCube(w,0):w.isData3DTexture?A.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?A.setTexture2DArray(w,0):A.setTexture2D(w,0),q.unbindTexture()},this.resetState=function(){L=0,C=0,R=null,q.reset(),Ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Ta?"display-p3":"srgb",t.unpackColorSpace=Ke.workingColorSpace===pr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===nt?ji:hc}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===ji?nt:Si}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class bg extends Lc{}bg.prototype.isWebGL1Renderer=!0;class Eg extends mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Ag{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ma,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=ci()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let n=0,r=this.stride;n<r;n++)this.array[e+n]=t.array[i+n];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ci()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ci()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Lt=new T;class or{constructor(e,t,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=li(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=li(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=li(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=li(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),i=Je(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),i=Je(i,this.array),n=Je(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this}setXYZW(e,t,i,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),i=Je(i,this.array),n=Je(n,this.array),r=Je(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=n,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[n+r])}return new Et(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new or(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[n+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Ic extends Ui{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let mn;const Gn=new T,gn=new T,vn=new T,_n=new Z,Vn=new Z,Dc=new rt,Ns=new T,Hn=new T,Os=new T,vl=new Z,Qr=new Z,_l=new Z;class wg extends mt{constructor(e=new Ic){if(super(),this.isSprite=!0,this.type="Sprite",mn===void 0){mn=new gt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Ag(t,5);mn.setIndex([0,1,2,0,2,3]),mn.setAttribute("position",new or(i,3,0,!1)),mn.setAttribute("uv",new or(i,2,3,!1))}this.geometry=mn,this.material=e,this.center=new Z(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),gn.setFromMatrixScale(this.matrixWorld),Dc.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),vn.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&gn.multiplyScalar(-vn.z);const i=this.material.rotation;let n,r;i!==0&&(r=Math.cos(i),n=Math.sin(i));const a=this.center;Bs(Ns.set(-.5,-.5,0),vn,a,gn,n,r),Bs(Hn.set(.5,-.5,0),vn,a,gn,n,r),Bs(Os.set(.5,.5,0),vn,a,gn,n,r),vl.set(0,0),Qr.set(1,0),_l.set(1,1);let o=e.ray.intersectTriangle(Ns,Hn,Os,!1,Gn);if(o===null&&(Bs(Hn.set(-.5,.5,0),vn,a,gn,n,r),Qr.set(0,1),o=e.ray.intersectTriangle(Ns,Os,Hn,!1,Gn),o===null))return;const l=e.ray.origin.distanceTo(Gn);l<e.near||l>e.far||t.push({distance:l,point:Gn.clone(),uv:Yt.getInterpolation(Gn,Ns,Hn,Os,vl,Qr,_l,new Z),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Bs(s,e,t,i,n,r){_n.subVectors(s,t).addScalar(.5).multiply(i),n!==void 0?(Vn.x=r*_n.x-n*_n.y,Vn.y=n*_n.x+r*_n.y):Vn.copy(_n),s.copy(e),s.x+=Vn.x,s.y+=Vn.y,s.applyMatrix4(Dc)}class lr extends Ui{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ne(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const yl=new T,xl=new T,Sl=new rt,ea=new mr,zs=new hs;class Ks extends mt{constructor(e=new gt,t=new lr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let n=1,r=t.count;n<r;n++)yl.fromBufferAttribute(t,n-1),xl.fromBufferAttribute(t,n),i[n]=i[n-1],i[n]+=yl.distanceTo(xl);e.setAttribute("lineDistance",new at(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,n=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),zs.copy(i.boundingSphere),zs.applyMatrix4(n),zs.radius+=r,e.ray.intersectsSphere(zs)===!1)return;Sl.copy(n).invert(),ea.copy(e.ray).applyMatrix4(Sl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new T,h=new T,u=new T,d=new T,f=this.isLineSegments?2:1,g=i.index,m=i.attributes.position;if(g!==null){const p=Math.max(0,a.start),M=Math.min(g.count,a.start+a.count);for(let v=p,b=M-1;v<b;v+=f){const L=g.getX(v),C=g.getX(v+1);if(c.fromBufferAttribute(m,L),h.fromBufferAttribute(m,C),ea.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const F=e.ray.origin.distanceTo(d);F<e.near||F>e.far||t.push({distance:F,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,a.start),M=Math.min(m.count,a.start+a.count);for(let v=p,b=M-1;v<b;v+=f){if(c.fromBufferAttribute(m,v),h.fromBufferAttribute(m,v+1),ea.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const C=e.ray.origin.distanceTo(d);C<e.near||C>e.far||t.push({distance:C,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}class Uc extends Ui{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Ml=new rt,ya=new mr,ks=new hs,Gs=new T;class Tg extends mt{constructor(e=new gt,t=new Uc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,n=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ks.copy(i.boundingSphere),ks.applyMatrix4(n),ks.radius+=r,e.ray.intersectsSphere(ks)===!1)return;Ml.copy(n).invert(),ya.copy(e.ray).applyMatrix4(Ml);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,u=i.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=d,_=f;g<_;g++){const m=c.getX(g);Gs.fromBufferAttribute(u,m),bl(Gs,m,l,n,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,_=f;g<_;g++)Gs.fromBufferAttribute(u,g),bl(Gs,g,l,n,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function bl(s,e,t,i,n,r,a){const o=ya.distanceSqToPoint(s);if(o<t){const l=new T;ya.closestPointToPoint(s,l),l.applyMatrix4(i);const c=n.ray.origin.distanceTo(l);if(c<n.near||c>n.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class Fc extends Ft{constructor(e,t,i,n,r,a,o,l,c){super(e,t,i,n,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ui{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,n=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),r+=i.distanceTo(n),t.push(r),n=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const i=this.getLengths();let n=0;const r=i.length;let a;t?a=t:a=e*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(n=Math.floor(o+(l-o)/2),c=i[n]-a,c<0)o=n+1;else if(c>0)l=n-1;else{l=n;break}if(n=l,i[n]===a)return n/(r-1);const h=i[n],d=i[n+1]-h,f=(a-h)/d;return(n+f)/(r-1)}getTangent(e,t){let n=e-1e-4,r=e+1e-4;n<0&&(n=0),r>1&&(r=1);const a=this.getPoint(n),o=this.getPoint(r),l=t||(a.isVector2?new Z:new T);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){const i=new T,n=[],r=[],a=[],o=new T,l=new rt;for(let f=0;f<=e;f++){const g=f/e;n[f]=this.getTangentAt(g,new T)}r[0]=new T,a[0]=new T;let c=Number.MAX_VALUE;const h=Math.abs(n[0].x),u=Math.abs(n[0].y),d=Math.abs(n[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),d<=c&&i.set(0,0,1),o.crossVectors(n[0],i).normalize(),r[0].crossVectors(n[0],o),a[0].crossVectors(n[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(n[f-1],n[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(bt(n[f-1].dot(n[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(n[f],r[f])}if(t===!0){let f=Math.acos(bt(r[0].dot(r[e]),-1,1));f/=e,n[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(n[g],f*g)),a[g].crossVectors(n[g],r[g])}return{tangents:n,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Ia extends ui{constructor(e=0,t=0,i=1,n=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=n,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t){const i=t||new Z,n=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=n;for(;r>n;)r-=n;r<Number.EPSILON&&(a?r=0:r=n),this.aClockwise===!0&&!a&&(r===n?r=-n:r=r-n);const o=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Cg extends Ia{constructor(e,t,i,n,r,a){super(e,t,i,i,n,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Da(){let s=0,e=0,t=0,i=0;function n(r,a,o,l){s=r,e=o,t=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){n(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,n(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return s+e*r+t*a+i*o}}}const Vs=new T,ta=new Da,ia=new Da,na=new Da;class Rg extends ui{constructor(e=[],t=!1,i="centripetal",n=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=n}getPoint(e,t=new T){const i=t,n=this.points,r=n.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=n[(o-1)%r]:(Vs.subVectors(n[0],n[1]).add(n[0]),c=Vs);const u=n[o%r],d=n[(o+1)%r];if(this.closed||o+2<r?h=n[(o+2)%r]:(Vs.subVectors(n[r-1],n[r-2]).add(n[r-1]),h=Vs),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),ta.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,_,m),ia.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,_,m),na.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(ta.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),ia.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),na.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return i.set(ta.calc(l),ia.calc(l),na.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const n=e.points[t];this.points.push(new T().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function El(s,e,t,i,n){const r=(i-e)*.5,a=(n-t)*.5,o=s*s,l=s*o;return(2*t-2*i+r+a)*l+(-3*t+3*i-2*r-a)*o+r*s+t}function Pg(s,e){const t=1-s;return t*t*e}function Lg(s,e){return 2*(1-s)*s*e}function Ig(s,e){return s*s*e}function Jn(s,e,t,i){return Pg(s,e)+Lg(s,t)+Ig(s,i)}function Dg(s,e){const t=1-s;return t*t*t*e}function Ug(s,e){const t=1-s;return 3*t*t*s*e}function Fg(s,e){return 3*(1-s)*s*s*e}function Ng(s,e){return s*s*s*e}function Kn(s,e,t,i,n){return Dg(s,e)+Ug(s,t)+Fg(s,i)+Ng(s,n)}class Nc extends ui{constructor(e=new Z,t=new Z,i=new Z,n=new Z){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=n}getPoint(e,t=new Z){const i=t,n=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Kn(e,n.x,r.x,a.x,o.x),Kn(e,n.y,r.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Og extends ui{constructor(e=new T,t=new T,i=new T,n=new T){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=n}getPoint(e,t=new T){const i=t,n=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Kn(e,n.x,r.x,a.x,o.x),Kn(e,n.y,r.y,a.y,o.y),Kn(e,n.z,r.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Oc extends ui{constructor(e=new Z,t=new Z){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Z){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Z){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Bg extends ui{constructor(e=new T,t=new T){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new T){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new T){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Bc extends ui{constructor(e=new Z,t=new Z,i=new Z){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Z){const i=t,n=this.v0,r=this.v1,a=this.v2;return i.set(Jn(e,n.x,r.x,a.x),Jn(e,n.y,r.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class zg extends ui{constructor(e=new T,t=new T,i=new T){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new T){const i=t,n=this.v0,r=this.v1,a=this.v2;return i.set(Jn(e,n.x,r.x,a.x),Jn(e,n.y,r.y,a.y),Jn(e,n.z,r.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class zc extends ui{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Z){const i=t,n=this.points,r=(n.length-1)*e,a=Math.floor(r),o=r-a,l=n[a===0?a:a-1],c=n[a],h=n[a>n.length-2?n.length-1:a+1],u=n[a>n.length-3?n.length-1:a+2];return i.set(El(o,l.x,c.x,h.x,u.x),El(o,l.y,c.y,h.y,u.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const n=e.points[t];this.points.push(n.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const n=e.points[t];this.points.push(new Z().fromArray(n))}return this}}var xa=Object.freeze({__proto__:null,ArcCurve:Cg,CatmullRomCurve3:Rg,CubicBezierCurve:Nc,CubicBezierCurve3:Og,EllipseCurve:Ia,LineCurve:Oc,LineCurve3:Bg,QuadraticBezierCurve:Bc,QuadraticBezierCurve3:zg,SplineCurve:zc});class kg extends ui{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new xa[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),n=this.getCurveLengths();let r=0;for(;r<n.length;){if(n[r]>=i){const a=n[r]-i,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,n=this.curves.length;i<n;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let n=0,r=this.curves;n<r.length;n++){const a=r[n],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];i&&i.equals(h)||(t.push(h),i=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const n=e.curves[t];this.curves.push(new xa[n.type]().fromJSON(n))}return this}}class Al extends kg{constructor(e){super(),this.type="Path",this.currentPoint=new Z,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new Oc(this.currentPoint.clone(),new Z(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,n){const r=new Bc(this.currentPoint.clone(),new Z(e,t),new Z(i,n));return this.curves.push(r),this.currentPoint.set(i,n),this}bezierCurveTo(e,t,i,n,r,a){const o=new Nc(this.currentPoint.clone(),new Z(e,t),new Z(i,n),new Z(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new zc(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,n,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,n,r,a),this}absarc(e,t,i,n,r,a){return this.absellipse(e,t,i,i,n,r,a),this}ellipse(e,t,i,n,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,i,n,r,a,o,l),this}absellipse(e,t,i,n,r,a,o,l){const c=new Ia(e,t,i,n,r,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Ua extends gt{constructor(e=1,t=1,i=1,n=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:n,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;n=Math.floor(n),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const _=[],m=i/2;let p=0;M(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new at(u,3)),this.setAttribute("normal",new at(d,3)),this.setAttribute("uv",new at(f,2));function M(){const b=new T,L=new T;let C=0;const R=(t-e)/i;for(let F=0;F<=r;F++){const S=[],E=F/r,U=E*(t-e)+e;for(let G=0;G<=n;G++){const K=G/n,I=K*l+o,O=Math.sin(I),H=Math.cos(I);L.x=U*O,L.y=-E*i+m,L.z=U*H,u.push(L.x,L.y,L.z),b.set(O,R,H).normalize(),d.push(b.x,b.y,b.z),f.push(K,1-E),S.push(g++)}_.push(S)}for(let F=0;F<n;F++)for(let S=0;S<r;S++){const E=_[S][F],U=_[S+1][F],G=_[S+1][F+1],K=_[S][F+1];h.push(E,U,K),h.push(U,G,K),C+=6}c.addGroup(p,C,0),p+=C}function v(b){const L=g,C=new Z,R=new T;let F=0;const S=b===!0?e:t,E=b===!0?1:-1;for(let G=1;G<=n;G++)u.push(0,m*E,0),d.push(0,E,0),f.push(.5,.5),g++;const U=g;for(let G=0;G<=n;G++){const I=G/n*l+o,O=Math.cos(I),H=Math.sin(I);R.x=S*H,R.y=m*E,R.z=S*O,u.push(R.x,R.y,R.z),d.push(0,E,0),C.x=O*.5+.5,C.y=H*.5*E+.5,f.push(C.x,C.y),g++}for(let G=0;G<n;G++){const K=L+G,I=U+G;b===!0?h.push(I,I+1,K):h.push(I+1,I,K),F+=3}c.addGroup(p,F,b===!0?1:2),p+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ua(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Fa extends Ua{constructor(e=1,t=1,i=32,n=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,i,n,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:n,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Fa(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Na extends gt{constructor(e=[],t=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:n};const r=[],a=[];o(n),c(i),h(),this.setAttribute("position",new at(r,3)),this.setAttribute("normal",new at(r.slice(),3)),this.setAttribute("uv",new at(a,2)),n===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const v=new T,b=new T,L=new T;for(let C=0;C<t.length;C+=3)f(t[C+0],v),f(t[C+1],b),f(t[C+2],L),l(v,b,L,M)}function l(M,v,b,L){const C=L+1,R=[];for(let F=0;F<=C;F++){R[F]=[];const S=M.clone().lerp(b,F/C),E=v.clone().lerp(b,F/C),U=C-F;for(let G=0;G<=U;G++)G===0&&F===C?R[F][G]=S:R[F][G]=S.clone().lerp(E,G/U)}for(let F=0;F<C;F++)for(let S=0;S<2*(C-F)-1;S++){const E=Math.floor(S/2);S%2===0?(d(R[F][E+1]),d(R[F+1][E]),d(R[F][E])):(d(R[F][E+1]),d(R[F+1][E+1]),d(R[F+1][E]))}}function c(M){const v=new T;for(let b=0;b<r.length;b+=3)v.x=r[b+0],v.y=r[b+1],v.z=r[b+2],v.normalize().multiplyScalar(M),r[b+0]=v.x,r[b+1]=v.y,r[b+2]=v.z}function h(){const M=new T;for(let v=0;v<r.length;v+=3){M.x=r[v+0],M.y=r[v+1],M.z=r[v+2];const b=m(M)/2/Math.PI+.5,L=p(M)/Math.PI+.5;a.push(b,1-L)}g(),u()}function u(){for(let M=0;M<a.length;M+=6){const v=a[M+0],b=a[M+2],L=a[M+4],C=Math.max(v,b,L),R=Math.min(v,b,L);C>.9&&R<.1&&(v<.2&&(a[M+0]+=1),b<.2&&(a[M+2]+=1),L<.2&&(a[M+4]+=1))}}function d(M){r.push(M.x,M.y,M.z)}function f(M,v){const b=M*3;v.x=e[b+0],v.y=e[b+1],v.z=e[b+2]}function g(){const M=new T,v=new T,b=new T,L=new T,C=new Z,R=new Z,F=new Z;for(let S=0,E=0;S<r.length;S+=9,E+=6){M.set(r[S+0],r[S+1],r[S+2]),v.set(r[S+3],r[S+4],r[S+5]),b.set(r[S+6],r[S+7],r[S+8]),C.set(a[E+0],a[E+1]),R.set(a[E+2],a[E+3]),F.set(a[E+4],a[E+5]),L.copy(M).add(v).add(b).divideScalar(3);const U=m(L);_(C,E+0,M,U),_(R,E+2,v,U),_(F,E+4,b,U)}}function _(M,v,b,L){L<0&&M.x===1&&(a[v]=M.x-1),b.x===0&&b.z===0&&(a[v]=L/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Na(e.vertices,e.indices,e.radius,e.details)}}class kc extends Al{constructor(e){super(e),this.uuid=ci(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,n=this.holes.length;i<n;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const n=e.holes[t];this.holes.push(new Al().fromJSON(n))}return this}}const Gg={triangulate:function(s,e,t=2){const i=e&&e.length,n=i?e[0]*t:s.length;let r=Gc(s,0,n,t,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c,h,u,d,f;if(i&&(r=qg(s,e,r,t)),s.length>80*t){o=c=s[0],l=h=s[1];for(let g=t;g<n;g+=t)u=s[g],d=s[g+1],u<o&&(o=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-o,h-l),f=f!==0?32767/f:0}return as(r,a,t,o,l,f,0),a}};function Gc(s,e,t,i,n){let r,a;if(n===n0(s,e,t,i)>0)for(r=e;r<t;r+=i)a=wl(r,s[r],s[r+1],a);else for(r=t-i;r>=e;r-=i)a=wl(r,s[r],s[r+1],a);return a&&_r(a,a.next)&&(ls(a),a=a.next),a}function Ji(s,e){if(!s)return s;e||(e=s);let t=s,i;do if(i=!1,!t.steiner&&(_r(t,t.next)||lt(t.prev,t,t.next)===0)){if(ls(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function as(s,e,t,i,n,r,a){if(!s)return;!a&&r&&Jg(s,i,n,r);let o=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?Hg(s,i,n,r):Vg(s)){e.push(l.i/t|0),e.push(s.i/t|0),e.push(c.i/t|0),ls(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=Wg(Ji(s),e,t),as(s,e,t,i,n,r,2)):a===2&&Xg(s,e,t,i,n,r):as(Ji(s),e,t,i,n,r,1);break}}}function Vg(s){const e=s.prev,t=s,i=s.next;if(lt(e,t,i)>=0)return!1;const n=e.x,r=t.x,a=i.x,o=e.y,l=t.y,c=i.y,h=n<r?n<a?n:a:r<a?r:a,u=o<l?o<c?o:c:l<c?l:c,d=n>r?n>a?n:a:r>a?r:a,f=o>l?o>c?o:c:l>c?l:c;let g=i.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&wn(n,o,r,l,a,c,g.x,g.y)&&lt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Hg(s,e,t,i){const n=s.prev,r=s,a=s.next;if(lt(n,r,a)>=0)return!1;const o=n.x,l=r.x,c=a.x,h=n.y,u=r.y,d=a.y,f=o<l?o<c?o:c:l<c?l:c,g=h<u?h<d?h:d:u<d?u:d,_=o>l?o>c?o:c:l>c?l:c,m=h>u?h>d?h:d:u>d?u:d,p=Sa(f,g,e,t,i),M=Sa(_,m,e,t,i);let v=s.prevZ,b=s.nextZ;for(;v&&v.z>=p&&b&&b.z<=M;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=m&&v!==n&&v!==a&&wn(o,h,l,u,c,d,v.x,v.y)&&lt(v.prev,v,v.next)>=0||(v=v.prevZ,b.x>=f&&b.x<=_&&b.y>=g&&b.y<=m&&b!==n&&b!==a&&wn(o,h,l,u,c,d,b.x,b.y)&&lt(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;v&&v.z>=p;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=m&&v!==n&&v!==a&&wn(o,h,l,u,c,d,v.x,v.y)&&lt(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;b&&b.z<=M;){if(b.x>=f&&b.x<=_&&b.y>=g&&b.y<=m&&b!==n&&b!==a&&wn(o,h,l,u,c,d,b.x,b.y)&&lt(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function Wg(s,e,t){let i=s;do{const n=i.prev,r=i.next.next;!_r(n,r)&&Vc(n,i,i.next,r)&&os(n,r)&&os(r,n)&&(e.push(n.i/t|0),e.push(i.i/t|0),e.push(r.i/t|0),ls(i),ls(i.next),i=s=r),i=i.next}while(i!==s);return Ji(i)}function Xg(s,e,t,i,n,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&e0(a,o)){let l=Hc(a,o);a=Ji(a,a.next),l=Ji(l,l.next),as(a,e,t,i,n,r,0),as(l,e,t,i,n,r,0);return}o=o.next}a=a.next}while(a!==s)}function qg(s,e,t,i){const n=[];let r,a,o,l,c;for(r=0,a=e.length;r<a;r++)o=e[r]*i,l=r<a-1?e[r+1]*i:s.length,c=Gc(s,o,l,i,!1),c===c.next&&(c.steiner=!0),n.push(Qg(c));for(n.sort(jg),r=0;r<n.length;r++)t=Yg(n[r],t);return t}function jg(s,e){return s.x-e.x}function Yg(s,e){const t=$g(s,e);if(!t)return e;const i=Hc(t,s);return Ji(i,i.next),Ji(t,t.next)}function $g(s,e){let t=e,i=-1/0,n;const r=s.x,a=s.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){const d=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=r&&d>i&&(i=d,n=t.x<t.next.x?t:t.next,d===r))return n}t=t.next}while(t!==e);if(!n)return null;const o=n,l=n.x,c=n.y;let h=1/0,u;t=n;do r>=t.x&&t.x>=l&&r!==t.x&&wn(a<c?r:i,a,l,c,a<c?i:r,a,t.x,t.y)&&(u=Math.abs(a-t.y)/(r-t.x),os(t,s)&&(u<h||u===h&&(t.x>n.x||t.x===n.x&&Zg(n,t)))&&(n=t,h=u)),t=t.next;while(t!==o);return n}function Zg(s,e){return lt(s.prev,s,e.prev)<0&&lt(e.next,s,s.next)<0}function Jg(s,e,t,i){let n=s;do n.z===0&&(n.z=Sa(n.x,n.y,e,t,i)),n.prevZ=n.prev,n.nextZ=n.next,n=n.next;while(n!==s);n.prevZ.nextZ=null,n.prevZ=null,Kg(n)}function Kg(s){let e,t,i,n,r,a,o,l,c=1;do{for(t=s,s=null,r=null,a=0;t;){for(a++,i=t,o=0,e=0;e<c&&(o++,i=i.nextZ,!!i);e++);for(l=c;o>0||l>0&&i;)o!==0&&(l===0||!i||t.z<=i.z)?(n=t,t=t.nextZ,o--):(n=i,i=i.nextZ,l--),r?r.nextZ=n:s=n,n.prevZ=r,r=n;t=i}r.nextZ=null,c*=2}while(a>1);return s}function Sa(s,e,t,i,n){return s=(s-t)*n|0,e=(e-i)*n|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function Qg(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function wn(s,e,t,i,n,r,a,o){return(n-a)*(e-o)>=(s-a)*(r-o)&&(s-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(n-a)*(i-o)}function e0(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!t0(s,e)&&(os(s,e)&&os(e,s)&&i0(s,e)&&(lt(s.prev,s,e.prev)||lt(s,e.prev,e))||_r(s,e)&&lt(s.prev,s,s.next)>0&&lt(e.prev,e,e.next)>0)}function lt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function _r(s,e){return s.x===e.x&&s.y===e.y}function Vc(s,e,t,i){const n=Ws(lt(s,e,t)),r=Ws(lt(s,e,i)),a=Ws(lt(t,i,s)),o=Ws(lt(t,i,e));return!!(n!==r&&a!==o||n===0&&Hs(s,t,e)||r===0&&Hs(s,i,e)||a===0&&Hs(t,s,i)||o===0&&Hs(t,e,i))}function Hs(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function Ws(s){return s>0?1:s<0?-1:0}function t0(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&Vc(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function os(s,e){return lt(s.prev,s,s.next)<0?lt(s,e,s.next)>=0&&lt(s,s.prev,e)>=0:lt(s,e,s.prev)<0||lt(s,s.next,e)<0}function i0(s,e){let t=s,i=!1;const n=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&n<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==s);return i}function Hc(s,e){const t=new Ma(s.i,s.x,s.y),i=new Ma(e.i,e.x,e.y),n=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=n,n.prev=t,i.next=t,t.prev=i,r.next=i,i.prev=r,i}function wl(s,e,t,i){const n=new Ma(s,e,t);return i?(n.next=i.next,n.prev=i,i.next.prev=n,i.next=n):(n.prev=n,n.next=n),n}function ls(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Ma(s,e,t){this.i=s,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function n0(s,e,t,i){let n=0;for(let r=e,a=t-i;r<t;r+=i)n+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return n}class Qn{static area(e){const t=e.length;let i=0;for(let n=t-1,r=0;r<t;n=r++)i+=e[n].x*e[r].y-e[r].x*e[n].y;return i*.5}static isClockWise(e){return Qn.area(e)<0}static triangulateShape(e,t){const i=[],n=[],r=[];Tl(e),Cl(i,e);let a=e.length;t.forEach(Tl);for(let l=0;l<t.length;l++)n.push(a),a+=t[l].length,Cl(i,t[l]);const o=Gg.triangulate(i,n);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function Tl(s){const e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function Cl(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}class Oa extends gt{constructor(e=new kc([new Z(.5,.5),new Z(-.5,.5),new Z(-.5,-.5),new Z(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const i=this,n=[],r=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new at(n,3)),this.setAttribute("uv",new at(r,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,M=t.UVGenerator!==void 0?t.UVGenerator:s0;let v,b=!1,L,C,R,F;p&&(v=p.getSpacedPoints(h),b=!0,d=!1,L=p.computeFrenetFrames(h,!1),C=new T,R=new T,F=new T),d||(m=0,f=0,g=0,_=0);const S=o.extractPoints(c);let E=S.shape;const U=S.holes;if(!Qn.isClockWise(E)){E=E.reverse();for(let P=0,oe=U.length;P<oe;P++){const j=U[P];Qn.isClockWise(j)&&(U[P]=j.reverse())}}const K=Qn.triangulateShape(E,U),I=E;for(let P=0,oe=U.length;P<oe;P++){const j=U[P];E=E.concat(j)}function O(P,oe,j){return oe||console.error("THREE.ExtrudeGeometry: vec does not exist"),P.clone().addScaledVector(oe,j)}const H=E.length,$=K.length;function Y(P,oe,j){let re,q,Ee;const me=P.x-oe.x,A=P.y-oe.y,x=j.x-P.x,B=j.y-P.y,se=me*me+A*A,ie=me*B-A*x;if(Math.abs(ie)>Number.EPSILON){const te=Math.sqrt(se),Se=Math.sqrt(x*x+B*B),ue=oe.x-A/te,_e=oe.y+me/te,Te=j.x-B/Se,ze=j.y+x/Se,ne=((Te-ue)*B-(ze-_e)*x)/(me*B-A*x);re=ue+me*ne-P.x,q=_e+A*ne-P.y;const Ye=re*re+q*q;if(Ye<=2)return new Z(re,q);Ee=Math.sqrt(Ye/2)}else{let te=!1;me>Number.EPSILON?x>Number.EPSILON&&(te=!0):me<-Number.EPSILON?x<-Number.EPSILON&&(te=!0):Math.sign(A)===Math.sign(B)&&(te=!0),te?(re=-A,q=me,Ee=Math.sqrt(se)):(re=me,q=A,Ee=Math.sqrt(se/2))}return new Z(re/Ee,q/Ee)}const X=[];for(let P=0,oe=I.length,j=oe-1,re=P+1;P<oe;P++,j++,re++)j===oe&&(j=0),re===oe&&(re=0),X[P]=Y(I[P],I[j],I[re]);const Q=[];let ee,he=X.concat();for(let P=0,oe=U.length;P<oe;P++){const j=U[P];ee=[];for(let re=0,q=j.length,Ee=q-1,me=re+1;re<q;re++,Ee++,me++)Ee===q&&(Ee=0),me===q&&(me=0),ee[re]=Y(j[re],j[Ee],j[me]);Q.push(ee),he=he.concat(ee)}for(let P=0;P<m;P++){const oe=P/m,j=f*Math.cos(oe*Math.PI/2),re=g*Math.sin(oe*Math.PI/2)+_;for(let q=0,Ee=I.length;q<Ee;q++){const me=O(I[q],X[q],re);ge(me.x,me.y,-j)}for(let q=0,Ee=U.length;q<Ee;q++){const me=U[q];ee=Q[q];for(let A=0,x=me.length;A<x;A++){const B=O(me[A],ee[A],re);ge(B.x,B.y,-j)}}}const W=g+_;for(let P=0;P<H;P++){const oe=d?O(E[P],he[P],W):E[P];b?(R.copy(L.normals[0]).multiplyScalar(oe.x),C.copy(L.binormals[0]).multiplyScalar(oe.y),F.copy(v[0]).add(R).add(C),ge(F.x,F.y,F.z)):ge(oe.x,oe.y,0)}for(let P=1;P<=h;P++)for(let oe=0;oe<H;oe++){const j=d?O(E[oe],he[oe],W):E[oe];b?(R.copy(L.normals[P]).multiplyScalar(j.x),C.copy(L.binormals[P]).multiplyScalar(j.y),F.copy(v[P]).add(R).add(C),ge(F.x,F.y,F.z)):ge(j.x,j.y,u/h*P)}for(let P=m-1;P>=0;P--){const oe=P/m,j=f*Math.cos(oe*Math.PI/2),re=g*Math.sin(oe*Math.PI/2)+_;for(let q=0,Ee=I.length;q<Ee;q++){const me=O(I[q],X[q],re);ge(me.x,me.y,u+j)}for(let q=0,Ee=U.length;q<Ee;q++){const me=U[q];ee=Q[q];for(let A=0,x=me.length;A<x;A++){const B=O(me[A],ee[A],re);b?ge(B.x,B.y+v[h-1].y,v[h-1].x+j):ge(B.x,B.y,u+j)}}}J(),de();function J(){const P=n.length/3;if(d){let oe=0,j=H*oe;for(let re=0;re<$;re++){const q=K[re];we(q[2]+j,q[1]+j,q[0]+j)}oe=h+m*2,j=H*oe;for(let re=0;re<$;re++){const q=K[re];we(q[0]+j,q[1]+j,q[2]+j)}}else{for(let oe=0;oe<$;oe++){const j=K[oe];we(j[2],j[1],j[0])}for(let oe=0;oe<$;oe++){const j=K[oe];we(j[0]+H*h,j[1]+H*h,j[2]+H*h)}}i.addGroup(P,n.length/3-P,0)}function de(){const P=n.length/3;let oe=0;xe(I,oe),oe+=I.length;for(let j=0,re=U.length;j<re;j++){const q=U[j];xe(q,oe),oe+=q.length}i.addGroup(P,n.length/3-P,1)}function xe(P,oe){let j=P.length;for(;--j>=0;){const re=j;let q=j-1;q<0&&(q=P.length-1);for(let Ee=0,me=h+m*2;Ee<me;Ee++){const A=H*Ee,x=H*(Ee+1),B=oe+re+A,se=oe+q+A,ie=oe+q+x,te=oe+re+x;Ue(B,se,ie,te)}}}function ge(P,oe,j){l.push(P),l.push(oe),l.push(j)}function we(P,oe,j){ae(P),ae(oe),ae(j);const re=n.length/3,q=M.generateTopUV(i,n,re-3,re-2,re-1);Pe(q[0]),Pe(q[1]),Pe(q[2])}function Ue(P,oe,j,re){ae(P),ae(oe),ae(re),ae(oe),ae(j),ae(re);const q=n.length/3,Ee=M.generateSideWallUV(i,n,q-6,q-3,q-2,q-1);Pe(Ee[0]),Pe(Ee[1]),Pe(Ee[3]),Pe(Ee[1]),Pe(Ee[2]),Pe(Ee[3])}function ae(P){n.push(l[P*3+0]),n.push(l[P*3+1]),n.push(l[P*3+2])}function Pe(P){r.push(P.x),r.push(P.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return r0(t,i,e)}static fromJSON(e,t){const i=[];for(let r=0,a=e.shapes.length;r<a;r++){const o=t[e.shapes[r]];i.push(o)}const n=e.options.extrudePath;return n!==void 0&&(e.options.extrudePath=new xa[n.type]().fromJSON(n)),new Oa(i,e.options)}}const s0={generateTopUV:function(s,e,t,i,n){const r=e[t*3],a=e[t*3+1],o=e[i*3],l=e[i*3+1],c=e[n*3],h=e[n*3+1];return[new Z(r,a),new Z(o,l),new Z(c,h)]},generateSideWallUV:function(s,e,t,i,n,r){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[i*3],h=e[i*3+1],u=e[i*3+2],d=e[n*3],f=e[n*3+1],g=e[n*3+2],_=e[r*3],m=e[r*3+1],p=e[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new Z(a,1-l),new Z(c,1-u),new Z(d,1-g),new Z(_,1-p)]:[new Z(o,1-l),new Z(h,1-u),new Z(f,1-g),new Z(m,1-p)]}};function r0(s,e,t){if(t.shapes=[],Array.isArray(s))for(let i=0,n=s.length;i<n;i++){const r=s[i];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class yr extends Na{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,n=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(n,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new yr(e.radius,e.detail)}}class cr extends gt{constructor(e=.5,t=1,i=32,n=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:n,thetaStart:r,thetaLength:a},i=Math.max(3,i),n=Math.max(1,n);const o=[],l=[],c=[],h=[];let u=e;const d=(t-e)/n,f=new T,g=new Z;for(let _=0;_<=n;_++){for(let m=0;m<=i;m++){const p=r+m/i*a;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let _=0;_<n;_++){const m=_*(i+1);for(let p=0;p<i;p++){const M=p+m,v=M,b=M+i+1,L=M+i+2,C=M+1;o.push(v,b,C),o.push(b,L,C)}}this.setIndex(o),this.setAttribute("position",new at(l,3)),this.setAttribute("normal",new at(c,3)),this.setAttribute("uv",new at(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cr(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ba extends gt{constructor(e=1,t=32,i=16,n=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:n,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new T,d=new T,f=[],g=[],_=[],m=[];for(let p=0;p<=i;p++){const M=[],v=p/i;let b=0;p===0&&a===0?b=.5/t:p===i&&l===Math.PI&&(b=-.5/t);for(let L=0;L<=t;L++){const C=L/t;u.x=-e*Math.cos(n+C*r)*Math.sin(a+v*o),u.y=e*Math.cos(a+v*o),u.z=e*Math.sin(n+C*r)*Math.sin(a+v*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(C+b,1-v),M.push(c++)}h.push(M)}for(let p=0;p<i;p++)for(let M=0;M<t;M++){const v=h[p][M+1],b=h[p][M],L=h[p+1][M],C=h[p+1][M+1];(p!==0||a>0)&&f.push(v,b,C),(p!==i-1||l<Math.PI)&&f.push(b,L,C)}this.setIndex(f),this.setAttribute("position",new at(g,3)),this.setAttribute("normal",new at(_,3)),this.setAttribute("uv",new at(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ba(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class a0 extends Ui{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ne(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=uc,this.normalScale=new Z(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const Rl={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class o0{constructor(e,t,i){const n=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(h){o++,r===!1&&n.onStart!==void 0&&n.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,n.onProgress!==void 0&&n.onProgress(h,a,o),a===o&&(r=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(h){n.onError!==void 0&&n.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const l0=new o0;class za{constructor(e){this.manager=e!==void 0?e:l0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(n,r){i.load(e,n,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}za.DEFAULT_MATERIAL_NAME="__DEFAULT";class c0 extends za{constructor(e){super(e)}load(e,t,i,n){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Rl.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=rs("img");function l(){h(),Rl.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(u){h(),n&&n(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class hr extends za{constructor(e){super(e)}load(e,t,i,n){const r=new Ft,a=new c0(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},i,n),r}}class ka extends mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ne(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const sa=new rt,Pl=new T,Ll=new T;class Wc{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Z(512,512),this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Pa,this._frameExtents=new Z(1,1),this._viewportCount=1,this._viewports=[new st(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Pl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Pl),Ll.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ll),t.updateMatrixWorld(),sa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sa),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(sa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Il=new rt,Wn=new T,ra=new T;class h0 extends Wc{constructor(){super(new Ht(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Z(4,2),this._viewportCount=6,this._viewports=[new st(2,1,1,1),new st(0,1,1,1),new st(3,1,1,1),new st(1,1,1,1),new st(3,0,1,1),new st(1,0,1,1)],this._cubeDirections=[new T(1,0,0),new T(-1,0,0),new T(0,0,1),new T(0,0,-1),new T(0,1,0),new T(0,-1,0)],this._cubeUps=[new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,0,1),new T(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,n=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),Wn.setFromMatrixPosition(e.matrixWorld),i.position.copy(Wn),ra.copy(i.position),ra.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(ra),i.updateMatrixWorld(),n.makeTranslation(-Wn.x,-Wn.y,-Wn.z),Il.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Il)}}class u0 extends ka{constructor(e,t,i=0,n=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new h0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class d0 extends Wc{constructor(){super(new Ec(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class f0 extends ka{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.shadow=new d0}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class p0 extends ka{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class m0{constructor(e,t,i=0,n=1/0){this.ray=new mr(e,t),this.near=i,this.far=n,this.camera=null,this.layers=new Ra,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,i=[]){return ba(e,this,i,t),i.sort(Dl),i}intersectObjects(e,t=!0,i=[]){for(let n=0,r=e.length;n<r;n++)ba(e[n],this,i,t);return i.sort(Dl),i}}function Dl(s,e){return s.distance-e.distance}function ba(s,e,t,i){if(s.layers.test(e.layers)&&s.raycast(e,t),i===!0){const n=s.children;for(let r=0,a=n.length;r<a;r++)ba(n[r],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Aa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Aa);const Ul=[{x:0,y:0,z:0},{x:-2.7,y:3.6,z:1.7},{x:-1.3,y:1.75,z:.8},{x:2.7,y:3.6,z:-1.7},{x:1.3,y:1.75,z:-.8},{x:-2.7,y:-3.6,z:-1.7},{x:-1.3,y:-1.75,z:-.8},{x:2.7,y:-3.6,z:1.7},{x:1.3,y:-1.75,z:.8},{x:0,y:-4.35,z:.15}],Fl=[{x:0,y:0,z:0},{x:-4.8,y:6.1,z:3.4},{x:-2.15,y:2.95,z:1.55},{x:4.8,y:6.1,z:-3.4},{x:2.15,y:2.95,z:-1.55},{x:-4.8,y:-6.1,z:-3.4},{x:-2.15,y:-2.95,z:-1.55},{x:4.8,y:-6.1,z:3.4},{x:2.15,y:-2.95,z:1.55},{x:0,y:-5.05,z:.2}];function g0(s,e){return s===0?"presentation":s===e-1?"hint":"project"}function v0(s){return Ul[s]||Ul[0]}function _0(s){return Fl[s]||Fl[0]}const y0=[{id:1,activeFacette:0,date:"2024-03",facettes:[{id:1,images:["assets/images/projects/intro.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:"https://github.com/orgs/ApeProd",demo:null,video:null},featured:!1},{id:3,images:["assets/images/projects/Imageprofile.png"],links:{github:null,demo:null,video:null},featured:!1}]},{id:2,activeFacette:0,date:"2024-02",facettes:[{id:1,images:["assets/images/projects/TonoIntro.png"],links:{github:"https://github.com/bheall/Tono_Discord_Bot",demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:3,activeFacette:0,date:"2024-01",facettes:[{id:1,images:["assets/images/projects/Davinciintro.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:4,activeFacette:0,date:"2023-12",facettes:[{id:1,images:[],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:5,activeFacette:0,date:"2023-11",facettes:[{id:1,images:["assets/images/projects/Introia.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:6,activeFacette:0,date:"2023-10",facettes:[{id:1,images:["assets/images/projects/Discordintro.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:7,activeFacette:0,date:"2023-09",facettes:[{id:1,images:["assets/images/projects/placeholder.svg"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:["assets/images/projects/placeholder.svg"],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:["assets/images/projects/placeholder.svg"],links:{github:null,demo:null,video:null},featured:!1}]},{id:8,activeFacette:0,date:"2023-08",facettes:[{id:1,images:["assets/images/projects/Spine.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:9,activeFacette:0,date:"2023-07",facettes:[{id:1,images:["assets/images/projects/Conception.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:10,activeFacette:0,date:"2023-06",facettes:[{id:1,images:[],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]}],Xc={fr:[{id:1,title:"PRÉSENTATION",facettes:[{category:"presentation",longDescription:"On dit souvent qu'un restaurant avec une carte trop fournie peine à exceller dans chaque plat. Ape Prod propose plusieurs services MAIS qui convergent vers une seule spécialité : le design et le brainstorming de projets. Direction artistique, identité visuelle, game design, prototypage technique et scénarisation — chaque compétence sert un objectif commun : transformer vos idées en concepts solides à votre image et innovants.",technologies:["Direction Artistique","Conception","Stratégie Créative","Innovation","Vision Globale"]},{category:"services",longDescription:`Designer polyvalent, je travaille avec de nombreux logiciels pour donner vie à mes idées et créer des DA et designs adaptés à n'importe quel projet. Ma valeur ajoutée réside dans ma polyvalence — sans être un expert de chaque domaine — qui me permet de créer des prototypes précis facilement reprenables et améliorables.

Avoir des idées, c'est facile. Les affiner, les structurer et les concrétiser, c'est une autre histoire. Mon rôle est de transformer l'intention en projet viable, avec méthode et créativité.`,technologies:["Identité Visuelle","Game Design","Prototypage","Narration","UX Design"]},{category:"about",longDescription:`Je m'appelle Bilel, 27 ans. Designer et brainstormer passionné par la conception de projets cohérents et impactants.

Mon objectif : donner forme à vos idées en alliant réflexion stratégique, créativité et exécution concrète.`,technologies:["Design","Brainstorming","Créativité","Polyvalence","Exécution"]}]},{id:2,title:"TON0.D API",facettes:[{category:"dev",longDescription:`TON0.D est une API de jeu complète, pensée dès le départ pour être réutilisable sur n'importe quelle plateforme : application mobile, site web, ou bot Discord et pour être facilement améliorée et réutilisée sur un projet futur.

L'objectif était de créer un système de jeu sur une application comme Discord qui n'est logiquement pas faite pour. Je voulais que les gens soient incités, via l'envie de jouer, à aller sur Discord et donc créer des opportunités pour que l'utilisateur participe davantage sur le serveur.`,technologies:["Discord.js","Node.js","API Design","Architecture Modulaire","Ruby on Rails"]},{category:"dev",longDescription:`L'une des innovations majeures de TON0.D réside dans son système de dialogue basé sur l'IA prêt à être intégré qui génère des dialogues dynamiques et uniques. Chaque interaction avec les personnages non-joueurs génère des réponses uniques et contextuelles, rendant chaque conversation authentique et imprévisible, avec une cohérence narrative et des réponses adaptées au contexte de la situation.

Fini les dialogues scriptés et répétitifs : l'IA s'adapte aux choix du joueur, à l'historique de ses interactions et au contexte de la situation. Cette approche crée une véritable immersion narrative où aucune partie ne ressemble à la précédente.`,technologies:["IA Générative","NLP","Systèmes Conversationnels","Narration Dynamique","Contextualisation"]},{category:"dev",longDescription:`Le but de TON0.D est de permettre aux utilisateurs de devenir créateurs avec moi de cet univers. Le système de quêtes est conçu pour que les joueurs puissent créer des quêtes qui, après validation par moi, seront ajoutées à l'univers, rendant ces ajouts accessibles à l'ensemble de la communauté et que les joueurs ajoutent leur histoire à l'univers.

Cette approche collaborative transforme chaque joueur en partie de l'univers du jeu et en pouvant canoniser des quêtes et des histoires dans le lore de ce nouveau monde, créant un écosystème vivant où le contenu se renouvelle organiquement. C'est la fusion entre développement technique avancé, IA générative et game design participatif.`,technologies:["UGC","Game Design","Systèmes Collaboratifs","Éditeur de Contenu","Community Building"]}]},{id:3,title:"DAVINCI RESOLVE & FUSION",facettes:[{category:"video",longDescription:"Ma maîtrise de Fusion me permet de créer des animations complexes, des effets visuels sur mesure et des transitions narratives qui élèvent chaque projet. Là où d'autres voient des contraintes techniques, je vois des opportunités créatives.",technologies:["DaVinci Resolve","Fusion","Compositing","VFX","Motion Design"]},{category:"video",longDescription:"Du node-based compositing aux systèmes de particules, en passant par le tracking 3D, Fusion offre une liberté créative immense. J'exploite cette puissance pour construire des visuels impactants.",technologies:["Node-Based Compositing","Tracking 3D","Color Grading","Particle Systems","Workflows Avancés"]},{category:"video",longDescription:"J'ai déjà réalisé des projets complexes avec Fusion réutilisables sur plusieurs projets. Je peux créer un prototype de composition Fusion avec votre direction artistique facilement réutilisable.",technologies:["Animation","Storytelling Visuel","Post-Production","Effets Créatifs","Templates"]}]},{id:4,title:"MON PREMIER COURT-MÉTRAGE",facettes:[{category:"video",longDescription:`J'ai réalisé un court-métrage de A à Z.

J'ai endossé tous les rôles : scénariste, réalisateur, directeur de casting, repéreur de lieux, monteur. De l'écriture du scénario au découpage technique, au casting, au tournage, au montage. Cette expérience m'a appris à comprendre les différents rôles sur un tournage et les erreurs à ne pas reproduire.`,technologies:["Réalisation","Scénarisation","Direction","Casting","Production"]},{category:"video",longDescription:"Du découpage technique au dérushage, chaque phase a présenté ses défis. Trouver les bons acteurs, négocier les lieux de tournage, gérer les imprévus du jour J, et le montage final alors que je n'avais jamais fait de montage : la production audiovisuelle est un exercice d'adaptation permanente, et on peut dire que ça m'a plu malgré mon insatisfaction du résultat final.",technologies:["Découpage Technique","Gestion de Production","Montage","Adaptation","Résolution de Problèmes"]},{category:"video",longDescription:"Cette expérience m'a confirmé une conviction : j'ai les idées et un univers à partager. Mais sans budget, sans ressources, sans équipe, je ne peux pas les mettre en place comme je les ai dans mon esprit.",technologies:["Direction de Projet","Vision Artistique","Gestion d'Équipe","Créativité","Storytelling"]}]},{id:5,title:"INTELLIGENCE ARTIFICIELLE GÉNÉRATIVE",facettes:[{category:"tech",longDescription:"J'ai fait par le passé une école de développement informatique, et aujourd'hui il faut savoir travailler avec l'IA pour développer des projets. J'ai rapidement appris à utiliser l'IA pour développer des prototypes sur mesure.",technologies:["IA Générative","Claude Sonnet","Stable Diffusion","IA Locale","Workflows IA"]},{category:"tech",longDescription:"La vraie maîtrise de l'IA générative ne réside pas dans l'utilisation basique de l'outil, mais dans leur orchestration intelligente. J'ai créé mon workflow avec l'IA pour obtenir des résultats sur mesure.",technologies:["Pipelines IA","Génération d'Images","Création de Contenu","Brainstorming Assisté","Orchestration"]},{category:"tech",longDescription:"Avec une gestion avancée des IA génératives, je peux prototyper rapidement, explorer des directions créatives multiples et matérialiser des concepts complexes en un temps record.",technologies:["Prototypage Rapide","Exploration Créative","Concepts Complexes","Innovation","Itération"]}]},{id:6,title:"BOTS DISCORD PERSONNALISÉS",facettes:[{category:"dev",longDescription:"Je conçois des bots entièrement personnalisés, pensés pour répondre à des besoins spécifiques. Qu'il s'agisse de modération avancée, de systèmes de gamification, de gestion d'événements ou de fonctionnalités ludiques, chaque bot est unique et taillé sur mesure.",technologies:["Discord.js","Bot Development","Personnalisation","Modération","Gamification"]},{category:"dev",longDescription:`De l'architecture back-end à l'interface utilisateur (via les interactions Discord), mes bots intègrent :

- Gestion de bases de données pour la persistance
- Intégrations API pour étendre les possibilités
- Affichage Discord Container V2`,technologies:["Node.js","PostgreSQL","API Integration","Automation","Architecture"]},{category:"dev",longDescription:"Les nouveaux modules Discord Container V2 permettent beaucoup de choses que les anciennes versions ne donnaient pas.",technologies:["Discord Container V2","UX Design","Community Management","Engagement","Simplicité"]}]},{id:7,title:"IDENTITÉ VISUELLE & CRÉATION DE LOGOS",facettes:[{category:"design",longDescription:"Création de logos et chartes graphiques",technologies:["Branding","Identité Visuelle","Logo Design","Recherche Créative","Concept"]},{category:"design",longDescription:"J'utilise Affinity Designer, Illustrator et Photoshop",technologies:["Affinity Designer","Illustrator","Photoshop","Typographie","Design System"]},{category:"design",longDescription:"Exemples de logos et chartes graphiques créés",technologies:["Impact Visuel","Storytelling","Mémorabilité","Différenciation","Cohérence"]}]},{id:8,title:"AVATARS & ANIMATIONS",facettes:[{category:"design",longDescription:"Création d'avatars et animations",technologies:["Spine","Animation 2D","Character Design","Rigging","Concept Art"]},{category:"design",longDescription:"Création d'avatars selon votre direction artistique et vos besoins avec une animation propre à votre besoin.",technologies:["Workflow Animation","Skeletal Animation","Optimisation","Performance","Export Multi-Format"]},{category:"design",longDescription:"De l'avatar Twitch au personnage de jeu mobile, en passant par les mascottes animées pour le web, mes créations s'adaptent à tous les besoins.",technologies:["Twitch","Mobile Games","Web Animation","Asset Creation","Versatilité"]}]},{id:9,title:"GAME DESIGN COMPLET",facettes:[{category:"gamedesign",longDescription:`Le game design, c'est l'art de créer des systèmes qui engagent, défient et récompensent. C'est transformer des mécaniques abstraites en expériences mémorables.

Mon approche du game design est holistique : je ne pense pas qu'en termes de règles et de mécaniques, mais en termes d'expérience globale. Chaque système est conçu pour servir une vision, raconter une histoire, provoquer des émotions spécifiques.`,technologies:["Game Design","Systèmes de Jeu","Expérience Utilisateur","Vision Holistique","Engagement"]},{category:"gamedesign",longDescription:`Un bon game design repose sur plusieurs piliers :

**Mécaniques de jeu** : création de systèmes cohérents et intuitifs qui offrent profondeur et rejouabilité. **Progression** : courbes d'apprentissage et de difficulté pensées pour maintenir l'engagement. **Économie** : équilibrage des ressources, récompenses et investissement du joueur. **Narration ludique** : intégration de l'histoire dans les mécaniques elles-mêmes.

Je documente chaque système, créant des game design documents complets qui servent de référence pour toute l'équipe de développement.`,technologies:["Mécaniques","Progression","Économie de Jeu","Documentation","Équilibrage"]},{category:"gamedesign",longDescription:"Du concept initial au prototype jouable, je guide le projet à travers toutes les phases de développement. Mon objectif : créer des expériences qui captivent, surprennent et restent gravées dans la mémoire des joueurs longtemps après la fin de la partie.",technologies:["Prototypage","Développement","Playtesting","Itération","Mémorabilité"]}]},{id:10,title:"APPROCHE COMMERCIALE & INNOVATION",facettes:[{category:"business",longDescription:`Dans un monde saturé d'offres similaires, se démarquer n'est pas une option, c'est une nécessité. Mon approche commerciale repose sur un principe simple : l'innovation comme ADN.

Je ne me contente pas d'exécuter une demande. J'analyse le marché, j'identifie les opportunités, je propose des angles différenciants. Chaque projet est une occasion de créer quelque chose qui n'existait pas encore, quelque chose qui attire l'attention et génère de la valeur.`,technologies:["Stratégie","Innovation","Différenciation","Analyse de Marché","Positionnement"]},{category:"business",longDescription:`Mon processus commercial se déroule en plusieurs phases :

**Audit stratégique** : compréhension approfondie de votre positionnement, vos objectifs et votre marché. **Brainstorming créatif** : exploration de multiples directions, toujours en cherchant l'angle le plus fort. **Proposition de valeur** : transformation des idées en concepts concrets, actionnables et mesurables. **Exécution & suivi** : accompagnement jusqu'au déploiement, avec ajustements basés sur les résultats.

Ma garantie : vous ne recevrez jamais une solution générique. Chaque projet bénéficie d'une réflexion unique et d'une approche sur mesure.`,technologies:["Audit","Brainstorming","Proposition de Valeur","Exécution","Suivi"]},{category:"business",longDescription:`L'innovation n'est pas un bonus, c'est le fondement de ma démarche. Que vous cherchiez à lancer un nouveau produit, repositionner une marque ou créer une expérience inédite, je vous garantis une approche commerciale qui allie créativité stratégique et exécution impeccable.

Ensemble, nous ne créerons pas un projet de plus. Nous créerons LE projet qui fait la différence.`,technologies:["Innovation","Créativité Stratégique","Impact","Excellence","Différence"]}]}],en:[{id:1,title:"INTRODUCTION",facettes:[{category:"presentation",longDescription:"They say a restaurant with too extensive a menu struggles to excel at every dish. Ape Prod offers multiple services BUT converge toward a single specialty: design and project brainstorming. Art direction, visual identity, game design, technical prototyping, and storytelling—each skill serves one common goal: transforming your ideas into solid concepts that reflect your vision and are innovative.",technologies:["Art Direction","Conception","Creative Strategy","Innovation","Global Vision"]},{category:"services",longDescription:`As a versatile designer, I work with numerous software tools to bring my ideas to life and create art direction and designs adapted to any project. My added value lies in my versatility—without being an expert in every field—which allows me to create precise prototypes that are easily handed off and improved upon.

Having ideas is easy. Refining them, structuring them, and making them real is another story. My role is to transform intent into viable projects, with method and creativity.`,technologies:["Visual Identity","Game Design","Prototyping","Storytelling","UX Design"]},{category:"about",longDescription:`My name is Bilel, 27 years old. Designer and brainstormer passionate about crafting coherent, impactful projects.

My goal: give shape to your ideas by combining strategic thinking, creativity, and concrete execution.`,technologies:["Design","Brainstorming","Creativity","Versatility","Execution"]}]},{id:2,title:"TON0.D API",facettes:[{category:"dev",longDescription:`TON0.D is a complete game API, designed from the start to be reusable across any platform: mobile applications, websites, or Discord bots, and to be easily improved and reused in future projects.

The goal was to create a game system on an application like Discord that isn't logically designed for it. I wanted people to be motivated, through the desire to play, to go to Discord and thus create opportunities for users to participate more actively on the server.`,technologies:["Discord.js","Node.js","API Design","Modular Architecture","Ruby on Rails"]},{category:"dev",longDescription:`One of TON0.D's major innovations is its AI-based dialogue system, ready to integrate, which generates dynamic and unique dialogues. Each interaction with non-player characters generates unique, contextual responses, making every conversation authentic and unpredictable, with narrative coherence and responses adapted to the situation's context.

No more scripted, repetitive dialogues: the AI adapts to player choices, interaction history, and situational context. This approach creates genuine narrative immersion where no two playthroughs are alike.`,technologies:["Generative AI","NLP","Conversational Systems","Dynamic Narrative","Contextualization"]},{category:"dev",longDescription:`TON0.D's purpose is to enable users to become creators of this universe alongside me. The quest system is designed so players can create quests that, after my validation, will be added to the universe, making these additions accessible to the entire community and allowing players to add their story to the universe.

This collaborative approach transforms each player into part of the game's universe, allowing them to canonize quests and stories into the lore of this new world, creating a living ecosystem where content renews organically. It's the fusion of advanced technical development, generative AI, and participatory game design.`,technologies:["UGC","Game Design","Collaborative Systems","Content Editor","Community Building"]}]},{id:3,title:"DAVINCI RESOLVE & FUSION",facettes:[{category:"video",longDescription:"My mastery of Fusion allows me to create complex animations, custom visual effects, and narrative transitions that elevate every project. Where others see technical constraints, I see creative opportunities.",technologies:["DaVinci Resolve","Fusion","Compositing","VFX","Motion Design"]},{category:"video",longDescription:"From node-based compositing to particle systems, including 3D tracking, Fusion offers immense creative freedom. I leverage this power to build impactful visuals.",technologies:["Node-Based Compositing","3D Tracking","Color Grading","Particle Systems","Advanced Workflows"]},{category:"video",longDescription:"I've already completed complex projects with Fusion that are reusable across multiple projects. I can create a Fusion composition prototype with your art direction that's easily reusable.",technologies:["Animation","Visual Storytelling","Post-Production","Creative Effects","Templates"]}]},{id:4,title:"MY FIRST SHORT FILM",facettes:[{category:"video",longDescription:`I made a short film from A to Z.

I took on all roles: screenwriter, director, casting director, location scout, editor. From writing the screenplay to technical breakdown, casting, shooting, editing. This experience taught me to understand the different roles on a film set and the mistakes not to repeat.`,technologies:["Directing","Screenwriting","Direction","Casting","Production"]},{category:"video",longDescription:"From technical breakdown to rushes review, each phase presented its challenges. Finding the right actors, negotiating shooting locations, managing day-of surprises, and final editing when I'd never edited before: audiovisual production is a constant exercise in adaptation, and I can say I enjoyed it despite my dissatisfaction with the final result.",technologies:["Technical Breakdown","Production Management","Editing","Adaptation","Problem Solving"]},{category:"video",longDescription:"This experience confirmed a conviction: I have ideas and a universe to share. But without budget, without resources, without a team, I can't implement them as I have them in my mind.",technologies:["Project Direction","Artistic Vision","Team Management","Creativity","Storytelling"]}]},{id:5,title:"GENERATIVE ARTIFICIAL INTELLIGENCE",facettes:[{category:"tech",longDescription:"I previously attended a computer development school, and today you need to know how to work with AI to develop projects. I quickly learned to use AI to develop custom prototypes.",technologies:["Generative AI","Claude Sonnet","Stable Diffusion","Local AI","AI Workflows"]},{category:"tech",longDescription:"True mastery of generative AI doesn't lie in basic tool usage, but in their intelligent orchestration. I've created my workflow with AI to obtain custom results.",technologies:["AI Pipelines","Image Generation","Content Creation","Assisted Brainstorming","Orchestration"]},{category:"tech",longDescription:"With advanced management of generative AIs, I can prototype quickly, explore multiple creative directions, and materialize complex concepts in record time.",technologies:["Rapid Prototyping","Creative Exploration","Complex Concepts","Innovation","Iteration"]}]},{id:6,title:"CUSTOM DISCORD BOTS",facettes:[{category:"dev",longDescription:"I design fully customized bots, designed to meet specific needs. Whether it's advanced moderation, gamification systems, event management, or playful features, each bot is unique and tailor-made.",technologies:["Discord.js","Bot Development","Customization","Moderation","Gamification"]},{category:"dev",longDescription:`From back-end architecture to user interface (via Discord interactions), my bots integrate:

- Database management for persistence
- API integrations to extend possibilities
- Discord Container V2 display`,technologies:["Node.js","PostgreSQL","API Integration","Automation","Architecture"]},{category:"dev",longDescription:"The new Discord Container V2 modules allow many things that older versions didn't provide.",technologies:["Discord Container V2","UX Design","Community Management","Engagement","Simplicity"]}]},{id:7,title:"VISUAL IDENTITY & LOGO CREATION",facettes:[{category:"design",longDescription:"Logo and graphic charter creation",technologies:["Branding","Visual Identity","Logo Design","Creative Research","Concept"]},{category:"design",longDescription:"I use Affinity Designer, Illustrator and Photoshop",technologies:["Affinity Designer","Illustrator","Photoshop","Typography","Design System"]},{category:"design",longDescription:"Examples of logos and graphic charters created",technologies:["Visual Impact","Storytelling","Memorability","Differentiation","Consistency"]}]},{id:8,title:"AVATARS & ANIMATIONS",facettes:[{category:"design",longDescription:"Avatar and animation creation",technologies:["Spine","2D Animation","Character Design","Rigging","Concept Art"]},{category:"design",longDescription:"Creating avatars according to your art direction and needs with animation specific to your requirements.",technologies:["Animation Workflow","Skeletal Animation","Optimization","Performance","Multi-Format Export"]},{category:"design",longDescription:"From Twitch avatars to mobile game characters, including animated web mascots, my creations adapt to all needs.",technologies:["Twitch","Mobile Games","Web Animation","Asset Creation","Versatility"]}]},{id:9,title:"COMPLETE GAME DESIGN",facettes:[{category:"gamedesign",longDescription:`Game design is the art of creating systems that engage, challenge, and reward. It's transforming abstract mechanics into memorable experiences.

My approach to game design is holistic: I don't just think in terms of rules and mechanics, but in terms of overall experience. Each system is designed to serve a vision, tell a story, provoke specific emotions.`,technologies:["Game Design","Game Systems","User Experience","Holistic Vision","Engagement"]},{category:"gamedesign",longDescription:`Good game design rests on several pillars:

**Game mechanics**: creating coherent and intuitive systems that offer depth and replayability. **Progression**: learning and difficulty curves designed to maintain engagement. **Economy**: balancing resources, rewards, and player investment. **Ludic narrative**: integrating story into the mechanics themselves.

I document each system, creating complete game design documents that serve as reference for the entire development team.`,technologies:["Mechanics","Progression","Game Economy","Documentation","Balancing"]},{category:"gamedesign",longDescription:"From initial concept to playable prototype, I guide the project through all development phases. My goal: create experiences that captivate, surprise, and remain etched in players' memories long after the game ends.",technologies:["Prototyping","Development","Playtesting","Iteration","Memorability"]}]},{id:10,title:"COMMERCIAL APPROACH & INNOVATION",facettes:[{category:"business",longDescription:`In a world saturated with similar offers, standing out isn't an option, it's a necessity. My commercial approach rests on a simple principle: innovation as DNA.

I don't just execute a request. I analyze the market, identify opportunities, propose differentiating angles. Each project is an opportunity to create something that didn't exist yet, something that attracts attention and generates value.`,technologies:["Strategy","Innovation","Differentiation","Market Analysis","Positioning"]},{category:"business",longDescription:`My commercial process unfolds in several phases:

**Strategic audit**: deep understanding of your positioning, objectives, and market. **Creative brainstorming**: exploring multiple directions, always seeking the strongest angle. **Value proposition**: transforming ideas into concrete, actionable, and measurable concepts. **Execution & follow-up**: support until deployment, with adjustments based on results.

My guarantee: you'll never receive a generic solution. Each project benefits from unique thinking and a custom approach.`,technologies:["Audit","Brainstorming","Value Proposition","Execution","Monitoring"]},{category:"business",longDescription:`Innovation isn't a bonus, it's the foundation of my approach. Whether you're looking to launch a new product, reposition a brand, or create an unprecedented experience, I guarantee you a commercial approach that combines strategic creativity and impeccable execution.

Together, we won't create just another project. We'll create THE project that makes the difference.`,technologies:["Innovation","Strategic Creativity","Impact","Excellence","Difference"]}]}]},x0={1:{dark:"assets/images/Logo/logomodedark.svg",light:"assets/images/Logo/logomodelight.svg",scale:.7,opacity:1},2:{dark:"assets/images/Logo/logomodedark.svg",light:"assets/images/Logo/logomodelight.svg",scale:.7,opacity:1},3:{dark:"assets/images/Logo/DavinciLogoDark.svg",light:"assets/images/Logo/DavinciLogoLight.svg",scale:.7,opacity:1},4:{dark:"assets/images/Logo/MovieLogoDark.svg",light:"assets/images/Logo/MovieLogoLight.svg",scale:.7,opacity:1},5:{dark:"assets/images/Logo/IALogoDark.svg",light:"assets/images/Logo/IALogoLight.svg",scale:.7,opacity:1},6:{dark:"assets/images/Logo/DiscordLogoDark.svg",light:"assets/images/Logo/DiscordLogoLight.svg",scale:.7,opacity:1},7:{dark:"assets/images/Logo/AffinityLogoDark.svg",light:"assets/images/Logo/AffinityLogoLight.svg",scale:.7,opacity:1},8:{dark:"assets/images/Logo/SpineLogoDark.svg",light:"assets/images/Logo/SpineLogoLight.svg",scale:.7,opacity:1},9:{dark:"assets/images/Logo/logomodedark.svg",light:"assets/images/Logo/logomodelight.svg",scale:.7,opacity:1},10:{dark:"assets/images/Logo/logomodedark.svg",light:"assets/images/Logo/logomodelight.svg",scale:.7,opacity:1}},Xs={dark:"/assets/images/Logo/logomodedark.svg",light:"/assets/images/Logo/logomodelight.svg",scale:.7,opacity:1},S0={presentation:{fr:"Présentation",en:"Introduction"},services:{fr:"Services",en:"Services"},about:{fr:"À propos",en:"About"},dev:{fr:"Développement",en:"Development"},video:{fr:"Vidéo",en:"Video"},tech:{fr:"IA & technique",en:"AI & tech"},design:{fr:"Design",en:"Design"},gamedesign:{fr:"Game design",en:"Game design"},business:{fr:"Stratégie",en:"Strategy"}};function M0(s){return{github:(s==null?void 0:s.github)||null,demo:(s==null?void 0:s.demo)||null,video:(s==null?void 0:s.video)||null}}function b0(s,e,t,i){const n=e.category,r=S0[n]||{fr:n,en:t.category||n};return{id:s,categoryKey:n,categoryLabel:r,description:{fr:e.longDescription,en:t.longDescription},technologies:e.technologies.map((a,o)=>({fr:a,en:t.technologies[o]||a})),images:i.images?i.images.map(a=>`/${a}`):[],links:M0(i.links),featured:!!i.featured}}function E0(s){const t=x0[String(s)]||{};return{dark:t.dark?`/${t.dark}`:Xs.dark,light:t.light?`/${t.light}`:Xs.light,scale:typeof t.scale=="number"?t.scale:Xs.scale,opacity:typeof t.opacity=="number"?t.opacity:Xs.opacity}}const Nl=y0,A0=Xc.fr,w0=Xc.en,T0=Nl.map((s,e)=>{const t=A0[e],i=w0[e],n=g0(e,Nl.length),r=s.facettes.map((a,o)=>b0(o,t.facettes[o],i.facettes[o],a));return{id:`shard-${s.id}`,numericId:s.id,order:e,role:n,date:s.date,title:{fr:n==="hint"?"INDICE":t.title,en:n==="hint"?"HINT":i.title},logo:E0(s.id),facets:n==="hint"?[{...r[0],categoryKey:"hint",categoryLabel:{fr:"Indice",en:"Hint"},description:{fr:"Tous les fragments n’attendent pas le focus. Certains veulent retrouver une forme précise. Observe le X, puis ce point sous sa blessure centrale.",en:"Not every fragment wants focus. Some want to recover a precise form. Watch the X, then the dot below its central wound."},technologies:[{fr:"Mystère",en:"Mystery"},{fr:"Placement",en:"Placement"},{fr:"Transformation",en:"Transformation"},{fr:"Jeu caché",en:"Hidden game"},{fr:"Clé d’accès",en:"Access key"}]},{...r[1],categoryKey:"hint",categoryLabel:{fr:"Accès",en:"Access"},description:{fr:"Quand chaque shard rejoint son empreinte, le monde cesse d’être un portfolio et bascule vers une autre règle.",en:"When every shard reaches its imprint, the world stops being a portfolio and switches to another rule."},technologies:[{fr:"Pivot",en:"Pivot"},{fr:"Constellation",en:"Constellation"},{fr:"Déblocage",en:"Unlock"},{fr:"Momentum",en:"Momentum"},{fr:"Transition",en:"Transition"}]},{...r[2],categoryKey:"hint",categoryLabel:{fr:"Conseil",en:"Clue"},description:{fr:"Ne cherche pas un bouton. Replace les fragments. Le fil de lumière ne ment jamais.",en:"Do not search for a button. Put the fragments back into place. The line of light never lies."},technologies:[{fr:"Patience",en:"Patience"},{fr:"Lecture",en:"Reading"},{fr:"Exploration",en:"Exploration"},{fr:"Déverrouillage",en:"Unlocking"},{fr:"Secret",en:"Secret"}]}]:r}});class C0{constructor(){y(this,"projects",T0)}getProjects(){return this.projects}getProjectById(e){return this.projects.find(t=>t.id===e)||null}getProjectByOrder(e){return this.projects[e]||null}getProjectLabel(e,t){const i=this.getProjectById(e);return i?i.title[t]:""}getFacet(e,t){const i=this.getProjectById(e);return i&&i.facets[Math.max(0,Math.min(t,i.facets.length-1))]||null}getProjectIndex(e){return this.projects.findIndex(t=>t.id===e)}getProjectCount(){return this.projects.length}getLocalizedProjects(e){return this.projects.map(t=>({id:t.id,title:t.title[e],project:t}))}}const Re=(s,e)=>({fr:s,en:e}),R0={common:new URL("/assets/rarity-common-4jSt1rGt.png",import.meta.url).href,uncommon:new URL("/assets/rarity-uncommon-qYmZDmnI.png",import.meta.url).href,rare:new URL("/assets/rarity-rare-DOluES1A.png",import.meta.url).href,epic:new URL("/assets/rarity-epique-BI05XSPV.png",import.meta.url).href,legendary:new URL("/assets/rarity-legendaire-DLQSZvZ8.png",import.meta.url).href},Xn="/assets/images/Logo/logomodedark.svg",jt={plane:new URL("/assets/PlaneSheet-CDpNXNiS.png",import.meta.url).href,wings:new URL("/assets/wingSheet-BegWtR2C.png",import.meta.url).href,propulseur:new URL("/assets/PropulseurSheet-UH1Agc4z.png",import.meta.url).href,reacteur_front:new URL("/assets/ReacteurFrontSheet-DIobPDhJ.png",import.meta.url).href,reacteur_back:new URL("/assets/ReacteurBackSheet-B-cxDK3M.png",import.meta.url).href,shield:new URL("/assets/ShieldSheet-DQKW930N.png",import.meta.url).href,souffleur:new URL("/assets/SouffleurSheet-10LJ1Yzc.png",import.meta.url).href,wrapper:new URL("/assets/WrapperSheet-CJgNJqwB.png",import.meta.url).href,magnet:new URL("/assets/Magnetsheet-CY9J8xuc.png",import.meta.url).href,big_canon:new URL("/assets/BigCanonSheet-gatAbgQl.png",import.meta.url).href,front_canon:new URL("/assets/FrontCanonSheet-CEv6ZScb.png",import.meta.url).href,grappin:new URL("/assets/GrapSheet-BFg1zead.png",import.meta.url).href},ut={plane:new URL("/assets/Planehud-CJaq78GY.png",import.meta.url).href,wings:new URL("/assets/WingHud-HexMpm1Q.png",import.meta.url).href,propulseur:new URL("/assets/PropulseurHud-nrdveY4C.png",import.meta.url).href,reacteur_front:new URL("/assets/Frontreactorhud-CXfWJmaq.png",import.meta.url).href,reacteur_back:new URL("/assets/backreactorhud-BXuUNcQS.png",import.meta.url).href,shield:new URL("/assets/Shieldhud-BYvX7waQ.png",import.meta.url).href,souffleur:new URL("/assets/Soufleurhud-B1mFsgaN.png",import.meta.url).href,wrapper:new URL("/assets/Wrapperhud-BactsO8p.png",import.meta.url).href,magnet:new URL("/assets/MagnetHud-sH2HYDrK.png",import.meta.url).href,big_canon:new URL("/assets/Bigcanonhud-DNiPrV-m.png",import.meta.url).href,front_canon:new URL("/assets/Frontcanonhud-CeL-Qxg1.png",import.meta.url).href,grappin:new URL("/assets/Grappin%20hud-CcDl5OgU.png",import.meta.url).href,passive_momentum:Xn,passive_coin:Xn,passive_shop:Xn,passive_shield:Xn,passive_grade:Xn},P0=[{baseId:"gyro_stabilizer",icon:"GYR",kind:"passive",slot:null,category:"momentum",unlockScore:0,name:Re("Stabilisateur gyroscopique","Gyro Stabilizer"),description:Re("Le momentum retombe moins vite.","Momentum decays more slowly."),hudIconSrc:ut.passive_momentum,boatVisual:null,statsByRarity:{common:{momentumRetention:.1},uncommon:{momentumRetention:.14},rare:{momentumRetention:.18},epic:{momentumRetention:.22},legendary:{momentumRetention:.26}}},{baseId:"coin_booster",icon:"COI",kind:"passive",slot:null,category:"economy",unlockScore:0,name:Re("Booster de pieces","Coin Booster"),description:Re("Augmente les gains de pièces.","Increase coin rewards."),hudIconSrc:ut.passive_coin,boatVisual:null,statsByRarity:{common:{coinBonus:.12},uncommon:{coinBonus:.18},rare:{coinBonus:.24},epic:{coinBonus:.32},legendary:{coinBonus:.4}}},{baseId:"market_discount",icon:"MKT",kind:"passive",slot:null,category:"economy",unlockScore:0,name:Re("Reduction marchand","Market Discount"),description:Re("Réduit les prix du shop.","Lower shop prices."),hudIconSrc:ut.passive_shop,boatVisual:null,statsByRarity:{common:{shopDiscount:.08},uncommon:{shopDiscount:.12},rare:{shopDiscount:.18},epic:{shopDiscount:.24},legendary:{shopDiscount:.3}}},{baseId:"glide_liner",icon:"GLD",kind:"passive",slot:null,category:"mobility",unlockScore:0,name:Re("Lisseur de trajectoire","Flow Liner"),description:Re("Améliore légèrement le contrôle aérien sans ajouter de plané.","Slightly improve airborne control without adding glide."),hudIconSrc:ut.passive_momentum,boatVisual:null,statsByRarity:{common:{planeStability:.04},uncommon:{planeStability:.06},rare:{planeStability:.08},epic:{planeStability:.1},legendary:{planeStability:.12}}},{baseId:"fail_guard",icon:"FAIL",kind:"passive",slot:null,category:"utility",unlockScore:20,name:Re("Garde-fou","Fail Guard"),description:Re("Empêche les grades Raté.","Prevent Fail landings."),hudIconSrc:ut.passive_grade,boatVisual:null,statsByRarity:{common:{preventFail:!0},uncommon:{preventFail:!0},rare:{preventFail:!0},epic:{preventFail:!0},legendary:{preventFail:!0}}},{baseId:"reward_radar",icon:"RWD",kind:"passive",slot:null,category:"economy",unlockScore:20,name:Re("Radar de recompense","Reward Radar"),description:Re("Augmente la chance de croiser une reward shard.","Increase reward shard odds."),hudIconSrc:ut.passive_coin,boatVisual:null,statsByRarity:{common:{rewardChance:.04},uncommon:{rewardChance:.06},rare:{rewardChance:.08},epic:{rewardChance:.11},legendary:{rewardChance:.14}}},{baseId:"grade_tuner",icon:"GRD",kind:"passive",slot:null,category:"utility",unlockScore:20,name:Re("Reglage de grade","Grade Tuner"),description:Re("Agrandit légèrement les fenêtres Great et Super.","Slightly widen Great and Super windows."),hudIconSrc:ut.passive_grade,boatVisual:null,statsByRarity:{common:{gradeWindowBonus:.04},uncommon:{gradeWindowBonus:.06},rare:{gradeWindowBonus:.08},epic:{gradeWindowBonus:.1},legendary:{gradeWindowBonus:.12}}},{baseId:"soft_recovery",icon:"REC",kind:"passive",slot:null,category:"momentum",unlockScore:20,name:Re("Recuperation douce","Soft Recovery"),description:Re("Réduit la perte de momentum après un mauvais atterrissage.","Reduce momentum loss after awkward landings."),hudIconSrc:ut.passive_momentum,boatVisual:null,statsByRarity:{common:{landingPenaltyReduction:.08},uncommon:{landingPenaltyReduction:.12},rare:{landingPenaltyReduction:.16},epic:{landingPenaltyReduction:.2},legendary:{landingPenaltyReduction:.25}}},{baseId:"shop_scanner",icon:"SHP",kind:"passive",slot:null,category:"economy",unlockScore:20,name:Re("Scanner marchand","Shop Scanner"),description:Re("Augmente la chance de shop.","Increase shop odds."),hudIconSrc:ut.passive_shop,boatVisual:null,statsByRarity:{common:{shopChance:.04},uncommon:{shopChance:.06},rare:{shopChance:.08},epic:{shopChance:.1},legendary:{shopChance:.12}}},{baseId:"shield_cooler",icon:"SHC",kind:"passive",slot:null,category:"utility",unlockScore:20,name:Re("Refroidisseur de bouclier","Shield Cooler"),description:Re("Améliore la recharge du shield.","Improve shield recharge."),hudIconSrc:ut.passive_shield,boatVisual:null,statsByRarity:{common:{shieldCooldownFactor:.08},uncommon:{shieldCooldownFactor:.12},rare:{shieldCooldownFactor:.16},epic:{shieldCooldownFactor:.22},legendary:{shieldCooldownFactor:.28}}}],L0=[{baseId:"plane",icon:"PLN",kind:"module",slot:"plane",category:"mobility",unlockScore:0,name:Re("Planeur","Plane"),description:Re("Stabilise le joueur et améliore le plané.","Stabilize the player and strengthen gliding."),hudIconSrc:ut.plane,boatVisual:{spriteSheetUrl:jt.plane,columns:2,rows:2,layerOrder:30},statsByRarity:{common:{planeGlide:.18,planeStability:.12},uncommon:{planeGlide:.25,planeStability:.16},rare:{planeGlide:.33,planeStability:.22},epic:{planeGlide:.41,planeStability:.28},legendary:{planeGlide:.5,planeStability:.34}}},{baseId:"wings",icon:"WNG",kind:"module",slot:"wings",category:"mobility",unlockScore:20,name:Re("Ailes","Wings"),description:Re("Donne un fort boost diagonal vers l’avant et le haut.","Adds a strong diagonal forward-up boost."),hudIconSrc:ut.wings,boatVisual:{spriteSheetUrl:jt.wings,columns:4,rows:2,layerOrder:90},chargesByRarity:{common:1,uncommon:2,rare:3,epic:4,legendary:5},statsByRarity:{common:{propulsionPower:4.5},uncommon:{propulsionPower:5},rare:{propulsionPower:5.5},epic:{propulsionPower:6},legendary:{propulsionPower:6.5}}},{baseId:"propulseur",icon:"PRP",kind:"module",slot:"propulseur",category:"mobility",unlockScore:0,name:Re("Propulseur","Propulsor"),description:Re("Dash vers l’avant dans les airs avec des charges par saut.","Forward airborne dash using per-jump charges."),hudIconSrc:ut.propulseur,boatVisual:{spriteSheetUrl:jt.propulseur,columns:2,rows:2,layerOrder:12},chargesByRarity:{common:1,uncommon:2,rare:3,epic:4,legendary:5},statsByRarity:{common:{propulsionPower:4.2},uncommon:{propulsionPower:4.7},rare:{propulsionPower:5.2},epic:{propulsionPower:5.7},legendary:{propulsionPower:6.2}}},{baseId:"reacteur_front",icon:"FRT",kind:"module",slot:"reacteur_front",category:"mobility",unlockScore:10,name:Re("Réacteur Front","Front Reactor"),description:Re("Pousse vers le haut pendant le saut.","Push upward during airborne boosts."),hudIconSrc:ut.reacteur_front,boatVisual:{spriteSheetUrl:jt.reacteur_front,columns:2,rows:2,layerOrder:42},chargesByRarity:{common:1,uncommon:2,rare:3,epic:4,legendary:5},statsByRarity:{common:{propulsionPower:4},uncommon:{propulsionPower:4.4},rare:{propulsionPower:4.8},epic:{propulsionPower:5.2},legendary:{propulsionPower:5.6}}},{baseId:"reacteur_back",icon:"BAK",kind:"module",slot:"reacteur_back",category:"mobility",unlockScore:10,name:Re("Réacteur arriere","Back Reactor"),description:Re("Ajoute une poussee diagonale vers l’avant et le haut.","Add a diagonal forward-up thrust."),hudIconSrc:ut.reacteur_back,boatVisual:{spriteSheetUrl:jt.reacteur_back,columns:2,rows:2,layerOrder:38},chargesByRarity:{common:1,uncommon:2,rare:3,epic:4,legendary:5},statsByRarity:{common:{propulsionPower:4.1},uncommon:{propulsionPower:4.5},rare:{propulsionPower:4.9},epic:{propulsionPower:5.3},legendary:{propulsionPower:5.7}}},{baseId:"shield",icon:"SHD",kind:"module",slot:"shield",category:"combat",unlockScore:10,name:Re("Shield","Shield"),description:Re("Bloque un impact puis se recharge.","Block one hit, then recharge."),hudIconSrc:ut.shield,boatVisual:{spriteSheetUrl:jt.shield,columns:2,rows:2,layerOrder:60},statsByRarity:{common:{shieldCooldownFactor:.18},uncommon:{shieldCooldownFactor:.24},rare:{shieldCooldownFactor:.32},epic:{shieldCooldownFactor:.4},legendary:{shieldCooldownFactor:.5}}},{baseId:"souffleur",icon:"SOU",kind:"module",slot:"souffleur",category:"mobility",unlockScore:10,name:Re("Souffleur","Blower"),description:Re("Ajoute un boost aérien maintenu avec jauge.","Add a sustained airborne boost with a gauge."),hudIconSrc:ut.souffleur,boatVisual:{spriteSheetUrl:jt.souffleur,columns:2,rows:2,layerOrder:54},gaugeConfig:{common:{capacity:1,regenPerSecond:.28,regenDelay:1.2,emptyDelay:2.4},uncommon:{capacity:1.12,regenPerSecond:.34,regenDelay:1.1,emptyDelay:2.2},rare:{capacity:1.26,regenPerSecond:.38,regenDelay:1,emptyDelay:2},epic:{capacity:1.42,regenPerSecond:.44,regenDelay:.9,emptyDelay:1.9},legendary:{capacity:1.6,regenPerSecond:.5,regenDelay:.8,emptyDelay:1.8}},statsByRarity:{common:{propulsionPower:1.2,gaugeCapacity:1,gaugeRegenPerSecond:.28},uncommon:{propulsionPower:1.38,gaugeCapacity:1.12,gaugeRegenPerSecond:.34},rare:{propulsionPower:1.56,gaugeCapacity:1.26,gaugeRegenPerSecond:.38},epic:{propulsionPower:1.76,gaugeCapacity:1.42,gaugeRegenPerSecond:.44},legendary:{propulsionPower:2,gaugeCapacity:1.6,gaugeRegenPerSecond:.5}}},{baseId:"wrapper",icon:"WRP",kind:"module",slot:"wrapper",category:"utility",unlockScore:10,name:Re("Wrapper","Wrapper"),description:Re("Téléporte au moins 10m plus loin sur une shard valide.","Teleport at least 10m farther onto a valid shard."),hudIconSrc:ut.wrapper,boatVisual:{spriteSheetUrl:jt.wrapper,columns:2,rows:2,layerOrder:80},statsByRarity:{common:{wrapperDistance:10},uncommon:{wrapperDistance:12},rare:{wrapperDistance:14},epic:{wrapperDistance:16},legendary:{wrapperDistance:18}}},{baseId:"magnet",icon:"MAG",kind:"module",slot:"magnet",category:"economy",unlockScore:10,name:Re("Magnet","Magnet"),description:Re("Attire les pièces plus loin.","Pull coins from farther away."),hudIconSrc:ut.magnet,boatVisual:{spriteSheetUrl:jt.magnet,columns:2,rows:2,layerOrder:44},statsByRarity:{common:{magnetRange:.28},uncommon:{magnetRange:.38},rare:{magnetRange:.48},epic:{magnetRange:.6},legendary:{magnetRange:.72}}},{baseId:"big_canon",icon:"BGC",kind:"module",slot:"big_canon",category:"combat",unlockScore:10,name:Re("Big Canon","Big Canon"),description:Re("Tire automatiquement dans une grande zone.","Auto-fire inside a medium-large radial zone."),hudIconSrc:ut.big_canon,boatVisual:{spriteSheetUrl:jt.big_canon,columns:2,rows:2,layerOrder:52},statsByRarity:{common:{bigCanonRange:5.2,bigCanonCooldown:4.6},uncommon:{bigCanonRange:5.8,bigCanonCooldown:4.2},rare:{bigCanonRange:6.4,bigCanonCooldown:3.8},epic:{bigCanonRange:7,bigCanonCooldown:3.3},legendary:{bigCanonRange:7.6,bigCanonCooldown:2.8}}},{baseId:"front_canon",icon:"FRC",kind:"module",slot:"front_canon",category:"combat",unlockScore:10,name:Re("Front Canon","Front Canon"),description:Re("Tire seulement sur les ennemis devant le bateau.","Fire only at enemies crossing the frontal laser."),hudIconSrc:ut.front_canon,boatVisual:{spriteSheetUrl:jt.front_canon,columns:2,rows:2,layerOrder:56},statsByRarity:{common:{frontCanonRange:4.4,frontCanonCooldown:2.8},uncommon:{frontCanonRange:5,frontCanonCooldown:2.5},rare:{frontCanonRange:5.6,frontCanonCooldown:2.2},epic:{frontCanonRange:6.2,frontCanonCooldown:1.95},legendary:{frontCanonRange:6.8,frontCanonCooldown:1.7}}},{baseId:"grappin",icon:"GRP",kind:"module",slot:"grappin",category:"utility",unlockScore:10,name:Re("Grappin","Grapple"),description:Re("Accroche une shard à portée et attire le joueur.","Hook a nearby shard and pull the player toward it."),hudIconSrc:ut.grappin,boatVisual:{spriteSheetUrl:jt.grappin,columns:2,rows:2,layerOrder:58},statsByRarity:{common:{grapRange:4.8,grapCooldown:30},uncommon:{grapRange:5.4,grapCooldown:28},rare:{grapRange:6.1,grapCooldown:26},epic:{grapRange:6.8,grapCooldown:24},legendary:{grapRange:7.6,grapCooldown:22}}}],qc=[...P0,...L0],Ol={common:56,uncommon:28,rare:11,epic:4,legendary:1},Rn={common:0,uncommon:1,rare:2,epic:3,legendary:4},I0={common:Re("Common","Common"),uncommon:Re("Uncommon","Uncommon"),rare:Re("Rare","Rare"),epic:Re("Epic","Epic"),legendary:Re("Legendary","Legendary")},Ga=qc.flatMap(s=>Object.keys(Rn).map(e=>k0(s,e)));function Bl(){return{counts:{},ownedOrder:[],modifiers:Va(),passives:{},modules:{},moduleRuntime:{}}}function Va(){return{glideFactor:0,landingTolerance:0,chargeRate:1,jumpPower:1,chargedLeapBonus:0,airControl:0,captureRadius:0,extraJumps:0,phaseJump:!1,phaseJumpRescueRadius:0,phaseJumpCooldown:20,teleportRange:0,teleportCooldown:30,warpRange:0,warpCooldown:24,rocketBurst:!1,rocketBurstCooldown:18,rocketBurstPower:0,airDashCharges:0,airDashPower:0,momentumRetention:0,infiniteFlaps:!1,momentumGain:0,momentumCap:1,shieldCharges:0,doubleCoin:!1,spikeOrbit:!1,coinMagnet:0,shopDiscount:0,speedBonus:0,coinBonus:0,luck:0,eventLuck:0,enemyDamageBonus:0,timeSlowFactor:0,gravityInverter:!1,phantomLanding:!1,chaosWarp:!1,rareItemBias:0,extraCoinSlots:0,momentumRedirect:0,failSafe:!1,rewardChance:0,gradeWindowBonus:0,landingPenaltyReduction:0,shopChance:0,shieldCooldownFactor:0,planeGlide:0,planeStability:0,souffleurBoost:0,wrapperDistance:0,magnetRange:0,frontCanonRange:0,frontCanonCooldown:0,bigCanonRange:0,bigCanonCooldown:0,grapRange:0,grapCooldown:0}}function D0(s){return s<20?["common","uncommon"]:s<60?["common","uncommon","rare"]:s<100?["common","uncommon","rare","epic"]:["common","uncommon","rare","epic","legendary"]}function U0(s){return s<10?10:s<100?100:s<1e3?1e3:Math.floor(s/1e3)*1e3+1e3}function aa(s,e){const t=U0(s);return e>=t?t:null}function Di(s){return Ga.find(e=>e.id===s)??null}function jc(s,e){return Ga.find(t=>t.baseId===s&&(e?t.rarity===e:!0))??null}function Qs(s){return!s||!s.chargesByRarity?0:s.chargesByRarity[s.rarity]??0}function bn(s){return!s||!s.gaugeConfig?null:s.gaugeConfig[s.rarity]??null}function qn(s,e,t=Math.random){const i=D0(s),n=[],r=new Set,a=qc.filter(o=>{if(s<o.unlockScore)return!1;const l=zl(e,o);return l?o.kind==="passive"?!1:i.some(c=>Rn[c]>Rn[l.rarity]):!0});for(;n.length<3&&r.size<a.length;){const o=B0(a,r,t);if(!o)break;r.add(o.baseId);const l=zl(e,o),c=o.kind==="passive"?["common"]:i,h=z0(c,(l==null?void 0:l.rarity)??null,t);if(!h)continue;const u=jc(o.baseId,h);u&&n.push({item:u,stackCount:l?Rn[l.rarity]+1:0})}return n}function F0(s,e){const t=Di(e);if(!t)return s;const i={...s.counts},n={...s.passives},r={...s.modules},a={...s.moduleRuntime};let o=s.ownedOrder.filter(c=>{const h=Di(c);if(!h)return!1;const u=t.kind==="passive"&&h.kind==="passive"&&h.baseId===t.baseId,d=t.kind==="module"&&h.kind==="module"&&h.slot===t.slot;return u||d?(delete i[h.id],!1):!0});i[t.id]=1,o=[...o,t.id],t.kind==="passive"?n[t.baseId]=t.id:t.slot&&(r[t.slot]=t.id,a[t.slot]=N0(t,s.moduleRuntime[t.slot]??null));const l={counts:i,ownedOrder:o,modifiers:Va(),passives:n,modules:r,moduleRuntime:a};return O0(l),l}function N0(s,e){const t=bn(s),i=Qs(s),n=e&&e.gaugeMax>0?Math.min(1,e.gaugeCurrent/e.gaugeMax):1,r=(t==null?void 0:t.capacity)??0;return{itemId:s.id,cooldownRemaining:(e==null?void 0:e.cooldownRemaining)??0,chargesCurrent:i,chargesMax:i,gaugeCurrent:r>0?r*n:0,gaugeMax:r,regenDelayRemaining:(e==null?void 0:e.regenDelayRemaining)??0}}function O0(s){s.modifiers=Va(),s.ownedOrder.forEach(e=>{const t=Di(e);if(!t)return;const i=t.statsByRarity[t.rarity];i.momentumRetention&&(s.modifiers.momentumRetention+=i.momentumRetention),i.coinBonus&&(s.modifiers.coinBonus+=i.coinBonus),i.shopDiscount&&(s.modifiers.shopDiscount+=i.shopDiscount),i.glideFactor&&(s.modifiers.glideFactor+=i.glideFactor),i.preventFail&&(s.modifiers.failSafe=!0),i.rewardChance&&(s.modifiers.rewardChance+=i.rewardChance),i.gradeWindowBonus&&(s.modifiers.gradeWindowBonus+=i.gradeWindowBonus),i.landingPenaltyReduction&&(s.modifiers.landingPenaltyReduction+=i.landingPenaltyReduction),i.shopChance&&(s.modifiers.shopChance+=i.shopChance),i.shieldCooldownFactor&&(s.modifiers.shieldCooldownFactor+=i.shieldCooldownFactor),i.planeGlide&&(s.modifiers.planeGlide+=i.planeGlide),i.planeStability&&(s.modifiers.planeStability+=i.planeStability),i.propulsionPower&&t.baseId==="souffleur"&&(s.modifiers.souffleurBoost+=i.propulsionPower),i.wrapperDistance&&(s.modifiers.wrapperDistance=Math.max(s.modifiers.wrapperDistance,i.wrapperDistance)),i.magnetRange&&(s.modifiers.magnetRange=Math.max(s.modifiers.magnetRange,i.magnetRange),s.modifiers.coinMagnet=Math.max(s.modifiers.coinMagnet,i.magnetRange)),i.frontCanonRange&&(s.modifiers.frontCanonRange=Math.max(s.modifiers.frontCanonRange,i.frontCanonRange)),i.frontCanonCooldown&&(s.modifiers.frontCanonCooldown=Math.max(s.modifiers.frontCanonCooldown,i.frontCanonCooldown)),i.bigCanonRange&&(s.modifiers.bigCanonRange=Math.max(s.modifiers.bigCanonRange,i.bigCanonRange)),i.bigCanonCooldown&&(s.modifiers.bigCanonCooldown=Math.max(s.modifiers.bigCanonCooldown,i.bigCanonCooldown)),i.grapRange&&(s.modifiers.grapRange=Math.max(s.modifiers.grapRange,i.grapRange)),i.grapCooldown&&(s.modifiers.grapCooldown=Math.max(s.modifiers.grapCooldown,i.grapCooldown))}),s.modifiers.shopDiscount=Math.min(.45,s.modifiers.shopDiscount),s.modifiers.coinBonus=Math.min(1.2,s.modifiers.coinBonus),s.modifiers.momentumRetention=Math.min(.72,s.modifiers.momentumRetention),s.modifiers.glideFactor=Math.min(1.9,s.modifiers.glideFactor)}function B0(s,e,t){const i=s.filter(n=>!e.has(n.baseId));return i.length===0?null:i[Math.floor(t()*i.length)]??null}function z0(s,e,t){const i=s.filter(a=>e===null||Rn[a]>Rn[e]);if(i.length===0)return null;const n=i.reduce((a,o)=>a+Ol[o],0);let r=t()*n;for(const a of i)if(r-=Ol[a],r<=0)return a;return i[i.length-1]??null}function zl(s,e){const t=e.kind==="passive"?s.passives[e.baseId]:e.slot?s.modules[e.slot]:void 0;return t?Di(t):null}function k0(s,e){return{id:`${s.baseId}_${e}`,baseId:s.baseId,icon:s.icon,rarity:e,category:s.category,kind:s.kind,slot:s.slot,unlockScore:s.unlockScore,stackable:!1,maxStacks:1,effects:[],name:s.name,description:s.description,hudIconSrc:s.hudIconSrc,rarityIconSrc:R0[e],boatVisual:s.boatVisual,chargesByRarity:s.chargesByRarity,gaugeConfig:s.gaugeConfig,statsByRarity:s.statsByRarity}}const yn={miss:new URL("/assets/Grade-Echec-C7YIr0kC.png",import.meta.url).href,good:new URL("/assets/Grade-Great-v6nyuq5e.png",import.meta.url).href,super:new URL("/assets/Grade-super-CN23zq9f.png",import.meta.url).href,perfect:new URL("/assets/Grade-Perfect-BAYCism8.png",import.meta.url).href,twist:new URL("/assets/Grade-Twist-CLy14ZD_.png",import.meta.url).href},qs={bg:new URL("/assets/HUDmomentum_bar_bg-4EjTn_fd.png",import.meta.url).href,fill:new URL("/assets/HUDmomentum_bar_fill-CrnjXV7e.png",import.meta.url).href,top:new URL("/assets/momentum_bar_toplayer-D1ALWKQF.png",import.meta.url).href},js=new URL("/assets/coinsheetsprite-9pZY0JTm.png",import.meta.url).href;class G0{constructor(e,t,i){y(this,"element");y(this,"panel");y(this,"scoreLabel");y(this,"highscoreLabel");y(this,"bestDistanceLabel");y(this,"chargeLabel");y(this,"chainLabel");y(this,"distanceLabel");y(this,"scoreValue");y(this,"highscoreValue");y(this,"bestDistanceValue");y(this,"chainValue");y(this,"distanceValue");y(this,"walletIcon");y(this,"coinsValue");y(this,"momentumBarLabel");y(this,"momentumBarValue");y(this,"momentumShell");y(this,"chargeFill");y(this,"orbitGraceIndicator");y(this,"statusValue");y(this,"metaValue");y(this,"exitButton");y(this,"branchLayer");y(this,"stashBar");y(this,"inventoryBar");y(this,"branchTitle");y(this,"branchHint");y(this,"branchCards");y(this,"shopBar");y(this,"shopButtons");y(this,"shopCloseButton");y(this,"landingFeedbackBadge");y(this,"toast");y(this,"toastLabel");y(this,"toastName");y(this,"gameOverOverlay");y(this,"gameOverTitle");y(this,"gameOverBody");y(this,"restartButton");y(this,"returnButton");this.i18n=t,this.preloadUiAssets(),this.element=document.createElement("div"),this.element.className="game-hud",this.element.innerHTML=`
      <div class="game-hud__panel">
        <div class="game-hud__stats">
          <div><span data-score-label></span><strong data-score>0</strong></div>
          <div><span data-highscore-label></span><strong data-highscore>0</strong></div>
          <div><span data-best-distance-label></span><strong data-best-distance>0m</strong></div>
          <div><span data-distance-label></span><strong data-distance>0m</strong></div>
          <div><span data-chain-label></span><strong data-chain>0%</strong></div>
        </div>
        <div class="game-hud__charge">
          <div class="game-hud__charge-meta">
            <span data-charge-label></span>
            <strong data-charge-value>0%</strong>
          </div>
          <div class="game-hud__charge-bar"><div class="game-hud__charge-fill" data-charge-fill></div></div>
        </div>
        <div class="game-hud__orbit-grace" data-orbit-grace></div>
        <p class="game-hud__status"></p>
        <p class="game-hud__meta"></p>
        <div class="game-hud__actions">
          <button type="button" data-exit></button>
        </div>
      </div>
      <div class="game-hud__momentum-dock">
        <div class="game-hud__momentum-meter">
          <div class="game-hud__momentum-meta">
            <span data-momentum-bar-label></span>
            <strong data-momentum-bar-value>0%</strong>
          </div>
          <div class="game-hud__momentum-shell">
            <div class="game-hud__momentum-mask" data-momentum-mask>
              <img src="${qs.fill}" alt="" class="game-hud__momentum-fill" data-momentum-fill />
            </div>
            <img src="${qs.bg}" alt="" class="game-hud__momentum-bg" />
            <img src="${qs.top}" alt="" class="game-hud__momentum-top" />
          </div>
        </div>
      </div>
      <div class="game-hud__play-zone game-hud__play-zone--top"></div>
      <div class="game-hud__play-zone game-hud__play-zone--bottom"></div>
      <div class="game-hud__stash">
        <div class="game-hud__wallet">
          <span class="game-hud__wallet-icon" data-wallet-icon aria-hidden="true" style="--wallet-coin-url:url('${js}')"></span>
          <strong data-coins>× 0</strong>
        </div>
        <div class="game-hud__inventory"></div>
      </div>
      <div class="game-hud__branch-layer">
        <div class="game-hud__branch-header">
          <h3 data-upgrade-title></h3>
          <p data-upgrade-hint></p>
        </div>
        <div class="game-hud__branch-card" data-branch-card="0"></div>
        <div class="game-hud__branch-card" data-branch-card="1"></div>
        <div class="game-hud__branch-card" data-branch-card="2"></div>
      </div>
      <div class="game-hud__shop-bar">
        <button type="button" data-shop-offer="0"></button>
        <button type="button" data-shop-offer="1"></button>
        <button type="button" data-shop-offer="2"></button>
        <button type="button" data-shop-close></button>
      </div>
      <div class="game-hud__landing-feedback"></div>
      <div class="game-hud__toast">
        <span data-toast-label></span>
        <strong data-toast-name></strong>
      </div>
      <div class="game-hud__game-over">
        <div class="game-hud__game-over-panel">
          <h2 data-game-over-title></h2>
          <p data-game-over-body></p>
          <div class="game-hud__game-over-actions">
            <button type="button" data-restart></button>
            <button type="button" data-return></button>
          </div>
        </div>
      </div>
    `,this.panel=this.element.querySelector(".game-hud__panel"),this.scoreLabel=this.element.querySelector("[data-score-label]"),this.highscoreLabel=this.element.querySelector("[data-highscore-label]"),this.bestDistanceLabel=this.element.querySelector("[data-best-distance-label]"),this.chargeLabel=this.element.querySelector("[data-charge-label]"),this.chainLabel=this.element.querySelector("[data-chain-label]"),this.distanceLabel=this.element.querySelector("[data-distance-label]"),this.scoreValue=this.element.querySelector("[data-score]"),this.highscoreValue=this.element.querySelector("[data-highscore]"),this.bestDistanceValue=this.element.querySelector("[data-best-distance]"),this.chainValue=this.element.querySelector("[data-chain]"),this.distanceValue=this.element.querySelector("[data-distance]"),this.walletIcon=this.element.querySelector("[data-wallet-icon]"),this.coinsValue=this.element.querySelector("[data-coins]"),this.momentumBarLabel=this.element.querySelector("[data-momentum-bar-label]"),this.momentumBarValue=this.element.querySelector("[data-momentum-bar-value]"),this.momentumShell=this.element.querySelector(".game-hud__momentum-shell"),this.chargeFill=this.element.querySelector("[data-charge-fill]"),this.orbitGraceIndicator=this.element.querySelector("[data-orbit-grace]"),this.statusValue=this.element.querySelector(".game-hud__status"),this.metaValue=this.element.querySelector(".game-hud__meta"),this.exitButton=this.element.querySelector("[data-exit]"),this.branchLayer=this.element.querySelector(".game-hud__branch-layer"),this.stashBar=this.element.querySelector(".game-hud__stash"),this.inventoryBar=this.element.querySelector(".game-hud__inventory"),this.branchTitle=this.element.querySelector("[data-upgrade-title]"),this.branchHint=this.element.querySelector("[data-upgrade-hint]"),this.branchCards=Array.from(this.element.querySelectorAll("[data-branch-card]")),this.shopBar=this.element.querySelector(".game-hud__shop-bar"),this.shopButtons=Array.from(this.element.querySelectorAll("[data-shop-offer]")),this.shopCloseButton=this.element.querySelector("[data-shop-close]"),this.landingFeedbackBadge=this.element.querySelector(".game-hud__landing-feedback"),this.toast=this.element.querySelector(".game-hud__toast"),this.toastLabel=this.element.querySelector("[data-toast-label]"),this.toastName=this.element.querySelector("[data-toast-name]"),this.gameOverOverlay=this.element.querySelector(".game-hud__game-over"),this.gameOverTitle=this.element.querySelector("[data-game-over-title]"),this.gameOverBody=this.element.querySelector("[data-game-over-body]"),this.restartButton=this.element.querySelector("[data-restart]"),this.returnButton=this.element.querySelector("[data-return]"),this.exitButton.addEventListener("click",i.onExit),this.restartButton.addEventListener("click",i.onRestart),this.returnButton.addEventListener("click",i.onExit),this.shopButtons.forEach((n,r)=>{n.addEventListener("click",()=>i.onSelectUpgrade(r))}),this.shopCloseButton.addEventListener("click",i.onCloseShop),e.appendChild(this.element),this.i18n.onChange(()=>this.renderStatic()),this.renderStatic()}setVisible(e){this.element.classList.toggle("is-visible",e)}update(e){this.scoreValue.textContent=String(e.score),this.highscoreValue.textContent=String(e.highscore),this.bestDistanceValue.textContent=`${Math.round(e.bestDistanceMeters)}m`,this.distanceValue.textContent=`${Math.round(e.distanceMeters)}m`,this.coinsValue.textContent=`× ${e.coins}`,this.chainValue.textContent=`${Math.round(e.momentumGauge*100)}%`,this.chainValue.style.opacity=`${.58+e.momentumGauge*.42}`,this.momentumBarValue.textContent=`${Math.round(e.momentumGauge*100)}%`,this.momentumShell.style.setProperty("--momentum-ratio",e.momentumGauge.toFixed(3));const i=Math.floor(performance.now()/120)%4;this.momentumShell.style.setProperty("--momentum-frame",String(i)),this.chargeFill.style.setProperty("--charge-ratio",e.chargeRatio.toFixed(3)),this.orbitGraceIndicator.classList.toggle("is-visible",e.orbitGraceActive),this.orbitGraceIndicator.style.setProperty("--orbit-grace-progress",e.orbitGraceProgress.toFixed(3));const n=this.element.querySelector("[data-charge-value]");n&&(n.textContent=`${Math.round(e.chargeRatio*100)}%`),this.statusValue.textContent=e.state==="transition"?this.i18n.t("gameStatusTransition"):e.state==="running"?this.i18n.t("gameStatusRunning"):e.state==="upgrade_choice"?this.i18n.t("gameStatusUpgrade"):this.i18n.t("gameStatusGameOver"),this.metaValue.textContent=this.renderMeta(e);const r=e.branchHints.some(a=>a.mode==="shop_orbit");this.branchTitle.textContent=r?this.i18n.t("gameShopTitle"):this.i18n.t("gameUpgradeTitle"),this.branchHint.textContent=r?this.i18n.t("gameShopHint"):this.i18n.t("gameUpgradeHint"),this.panel.classList.toggle("is-hidden",e.state==="game_over"),this.branchLayer.classList.toggle("is-visible",e.state==="upgrade_choice"&&!r),this.shopBar.classList.toggle("is-visible",e.state==="upgrade_choice"&&r),this.gameOverOverlay.classList.toggle("is-visible",e.state==="game_over"),this.toast.classList.toggle("is-visible",!!e.acquisition),e.acquisition&&(this.toast.style.setProperty("--toast-progress",e.acquisition.progress.toFixed(3)),this.toastName.textContent=e.acquisition.offer.item.name[this.i18n.current]),this.renderLandingFeedback(e.landingFeedback),e.state==="game_over"&&(this.gameOverBody.textContent=this.getGameOverBody(e.gameOverCause)),this.renderInventory(e.inventoryItems),this.renderBranchHints(e.branchHints),this.renderShopBar(e.branchHints,e.coins)}renderStatic(){this.scoreLabel.textContent=this.i18n.t("gameScore"),this.highscoreLabel.textContent=this.i18n.t("gameBest"),this.chargeLabel.textContent=this.i18n.t("gameCharge"),this.chainLabel.textContent=this.i18n.t("gameMomentum"),this.momentumBarLabel.textContent=this.i18n.t("gameMomentum"),this.distanceLabel.textContent=this.i18n.t("gameDistance"),this.exitButton.textContent=this.i18n.t("gamePortfolio"),this.branchTitle.textContent=this.i18n.t("gameUpgradeTitle"),this.branchHint.textContent=this.i18n.t("gameUpgradeHint"),this.shopCloseButton.textContent=this.i18n.t("gameShopClose"),this.toastLabel.textContent=this.i18n.t("gameAcquired"),this.gameOverTitle.textContent=this.i18n.t("gameOverTitle"),this.gameOverBody.textContent=this.i18n.t("gameOverBody"),this.restartButton.textContent=this.i18n.t("gameRestart"),this.returnButton.textContent=this.i18n.t("gamePortfolio"),this.bestDistanceLabel.textContent=this.i18n.t("gameBestDistance"),this.walletIcon.title=this.i18n.t("gameCoins")}renderBranchHints(e){this.branchCards.forEach((t,i)=>{const n=e[i];if(!n){t.hidden=!0;return}t.hidden=!1,t.dataset.rarity=n.offer.item.rarity;const r=n.mode==="shop_orbit"?this.i18n.t("gameShopOffer"):i===0?this.i18n.t("gamePathUpper"):i===1?this.i18n.t("gamePathForward"):this.i18n.t("gamePathLower");t.style.transform=`translate(${n.screenX}px, ${n.screenY}px)`;const a=n.offer.item.kind==="module";t.innerHTML=`
        <span class="game-hud__upgrade-media">
          <img src="${n.offer.item.hudIconSrc}" alt="" class="game-hud__upgrade-icon-img" />
          ${a?`<img src="${n.offer.item.rarityIconSrc}" alt="" class="game-hud__upgrade-rarity-icon" />`:""}
        </span>
        ${a?`<span class="game-hud__upgrade-rarity">${this.getRarityLabel(n.offer.item.rarity)}</span>`:""}
        <span class="game-hud__upgrade-path-label">${r}</span>
        <strong class="game-hud__upgrade-path-name">${n.offer.item.name[this.i18n.current]}</strong>
        <span class="game-hud__upgrade-path-desc">${n.offer.item.description[this.i18n.current]}</span>
        ${n.price!==void 0?`<span class="game-hud__upgrade-price">${this.i18n.t("gamePrice")}: <span class="game-hud__coin-inline" aria-hidden="true" style="--wallet-coin-url:url('${js}')"></span> × ${n.price}</span>`:""}
      `})}renderInventory(e){this.inventoryBar.innerHTML="",this.stashBar.classList.add("is-visible"),e.forEach(t=>{const i=document.createElement("div");i.className="game-hud__inventory-item";const n=Di(t.id),r=t.kind==="module",a=(t.chargeMax??0)>0,o=(t.resourceRatio??0)>0||t.slot==="souffleur",l=(t.cooldownRatio??0)>0||t.slot==="souffleur"||t.slot==="shield"||t.slot==="wrapper"||t.slot==="big_canon"||t.slot==="front_canon"||t.slot==="grappin",c=Math.max(0,Math.min(1,1-(t.cooldownRatio??0))),h=a?Array.from({length:t.chargeMax??0},(u,d)=>`<span class="game-hud__inventory-charge-dot${d<(t.chargeCurrent??0)?" is-active":""}" aria-hidden="true"></span>`).join(""):"";i.innerHTML=`
        <div class="game-hud__inventory-media">
          <img src="${t.iconSrc}" alt="" class="game-hud__inventory-icon" />
          ${r?`<img src="${t.rarityIconSrc}" alt="" class="game-hud__inventory-rarity" />`:""}
        </div>
        <div class="game-hud__inventory-copy">
          <strong class="game-hud__inventory-name">${(n==null?void 0:n.name[this.i18n.current])??t.name}</strong>
          <span class="game-hud__inventory-desc">${(n==null?void 0:n.description[this.i18n.current])??t.description}</span>
          ${l||a?`<span class="game-hud__inventory-signals">${l?`<span class="game-hud__inventory-cooldown" style="--cooldown-progress:${c.toFixed(3)}"><span></span></span>`:""}${a?`<span class="game-hud__inventory-charge-dots">${h}</span>`:""}</span>`:""}
          ${o?`<span class="game-hud__inventory-meter game-hud__inventory-meter--resource"><span style="width:${Math.round((t.resourceRatio??0)*100)}%"></span></span>`:""}
        </div>
        ${t.count>1?`<span class="game-hud__inventory-count">x${t.count}</span>`:""}
      `,this.inventoryBar.appendChild(i)})}renderShopBar(e,t=0){const i=e.filter(n=>n.mode==="shop_orbit");this.shopButtons.forEach((n,r)=>{const a=i[r];if(n.hidden=!a,n.disabled=!a,!a)return;const o=(a.price??0)<=t;n.disabled=!o;const l=a.offer.item.kind==="module";n.innerHTML=`
        <span class="game-hud__shop-offer-media">
          <img src="${a.offer.item.hudIconSrc}" alt="" class="game-hud__shop-offer-icon" />
          ${l?`<img src="${a.offer.item.rarityIconSrc}" alt="" class="game-hud__shop-offer-rarity" />`:""}
        </span>
        <strong>${a.offer.item.name[this.i18n.current]}</strong>
        <span>${a.offer.item.description[this.i18n.current]}</span>
        <em class="game-hud__shop-price"><span class="game-hud__coin-inline" aria-hidden="true" style="--wallet-coin-url:url('${js}')"></span> × ${a.price??0}</em>
      `,n.classList.toggle("is-disabled",!o)}),this.shopCloseButton.textContent=this.i18n.t("gameShopClose")}renderMeta(e){const t=[10,100,1e3].map(i=>{const n=e.splitTimes[i];return n===void 0?null:`${i}: ${n.toFixed(1)}s`}).filter(Boolean).join(" • ");return t?`${this.i18n.t("gameSplits")}: ${t}`:`${this.i18n.t("gameBestDistance")}: ${Math.round(e.bestDistanceMeters)}m`}renderLandingFeedback(e){if(!e){this.landingFeedbackBadge.classList.remove("is-visible"),this.landingFeedbackBadge.innerHTML="";return}const t=this.getLandingGradeAsset(e.grade);this.landingFeedbackBadge.innerHTML=`
      ${e.twist?`<img src="${yn.twist}" alt="${this.i18n.t("gameLandingTwist")}" class="game-hud__landing-feedback-asset game-hud__landing-feedback-asset--twist" />`:""}
      <img src="${t}" alt="${this.getLandingGradeLabel(e.grade)}" class="game-hud__landing-feedback-asset game-hud__landing-feedback-asset--grade" />
    `,this.landingFeedbackBadge.dataset.grade=e.grade,this.landingFeedbackBadge.classList.toggle("is-twist",e.twist),this.landingFeedbackBadge.classList.add("is-visible"),this.landingFeedbackBadge.style.setProperty("--landing-progress",e.progress.toFixed(3));const i=e.progress<.2?.78+e.progress/.2*.34:1.12-Math.min(1,(e.progress-.2)/.8)*.12,n=e.screenY-e.progress*24;this.landingFeedbackBadge.style.transform=`translate(${e.screenX}px, ${n}px) scale(${i.toFixed(3)})`}getLandingGradeLabel(e){return e==="miss"?this.i18n.t("gameLandingMiss"):e==="super"?this.i18n.t("gameLandingSuper"):e==="perfect"?this.i18n.t("gameLandingPerfect"):this.i18n.t("gameLandingGood")}getLandingGradeAsset(e){return e==="miss"?yn.miss:e==="super"?yn.super:e==="perfect"?yn.perfect:yn.good}getRarityLabel(e){return I0[e][this.i18n.current]}getGameOverBody(e){return e==="enemy"?this.i18n.t("gameOverEnemy"):e==="out_of_bounds"?this.i18n.t("gameOverBounds"):this.i18n.t("gameOverCamera")}preloadUiAssets(){const e=Ga.flatMap(t=>[t.hudIconSrc,t.rarityIconSrc]);Object.values(yn).concat(Object.values(qs),[js],e).forEach(t=>{const i=new Image;i.decoding="async",i.src=t})}}function De(s,e,t){return Math.min(t,Math.max(e,s))}function Me(s,e,t,i){return s+(e-s)*(1-Math.exp(-t*i))}function kl(s,e){const t=s.x-e.x,i=s.y-e.y,n=s.z-e.z;return Math.sqrt(t*t+i*i+n*n)}function er(s,e){return(s%e+e)%e}const Mt=8.9;function jn(s){return s/Mt}function Qt(s){const e=De(s/200,0,1),t=s<50?"easy":s<100?"medium":s<160?"hard":"expert";return{normalized:e,band:t,spacing:Mt+e*7.8,movementAmplitude:.08+e*1.05,movementSpeed:.22+e*.88,cameraSpeed:1.65+e*3.55,cameraCatchupSpeed:2.6+e*2.2,maxJumpDistance:17.8+e*9.2,maxVerticalDelta:5.2+e*3.8,safeZoneDistance:8.6+e*1.8,cameraLookAhead:8.6+e*5.2,baseZoom:18.9,largeShardZoom:6.4,milestoneZoom:18,momentumZoomRange:16.2,enemyUnlocked:s>=20,ovalUnlocked:s>=50,triangularUnlocked:s>=100,roundMovementUnlocked:s>=5,eventChance:s<12?0:s<60?.08:s<120?.14:.18,movingShardChance:s<5?0:s<50?.12:s<100?.2:.3}}const ts=class ts{constructor(){y(this,"position",new T);y(this,"lookAt",new T);y(this,"currentFocus",new Z);y(this,"targetFocus",new Z);y(this,"currentZoom",13.9);y(this,"targetZoom",13.9);y(this,"railX",-12);y(this,"safeLeft",-1/0);y(this,"safeRight",1/0);y(this,"safeTop",1/0);y(this,"safeBottom",-1/0);y(this,"fov",42)}reset(e){this.railX=e.resolvedX-4.4,this.currentFocus.set(e.resolvedX+4.2,e.resolvedY),this.targetFocus.copy(this.currentFocus),this.currentZoom=13.9,this.targetZoom=13.9,this.position.set(this.currentFocus.x-ts.CAMERA_CENTER_OFFSET,e.resolvedY+.18,this.currentZoom),this.lookAt.set(this.currentFocus.x,e.resolvedY,0),this.safeLeft=-1/0,this.safeRight=1/0,this.safeTop=1/0,this.safeBottom=-1/0}update(e){const{deltaTime:t,state:i,score:n,currentNode:r,nextNode:a,playerPosition:o,momentumGauge:l,largeShardFactor:c,milestoneZoom:h,choiceZoom:u,speedPressure:d}=e,f=Qt(n),g=i==="running_attached"||i==="running_charging"||i==="running_airborne",_=1+Math.min(.65,n/420);g&&(this.railX+=f.cameraSpeed*d*_*t),this.railX=Math.max(this.railX,o.x-f.cameraLookAhead);const m=r.isGigantic?r.resolvedX+.4:this.railX+f.cameraLookAhead,p=r.isGigantic?r.resolvedY:r.resolvedY*.64+a.resolvedY*.36,M=Math.pow(l,.85),v=o.y-p,b=Ct.clamp(.28+Math.min(.36,Math.abs(v)/12)+M*.18,.28,.64),L=Ct.lerp(p,o.y,b);this.targetFocus.set(m,L);const C=o.x>=this.currentFocus.x-.08?Math.max(12,f.cameraCatchupSpeed*4.2):Math.max(4.4,f.cameraCatchupSpeed*1.25),R=Me(this.currentFocus.x,this.targetFocus.x,r.isGigantic?C*2.6:C,t);this.currentFocus.x=r.isGigantic?R:Math.max(this.currentFocus.x,o.x-.08,R),this.currentFocus.y=Me(this.currentFocus.y,this.targetFocus.y,r.isGigantic?7.8:1.95+M*1.7,t);const F=f.momentumZoomRange*1.02*Math.pow(l,.72);this.targetZoom=f.baseZoom+F+f.largeShardZoom*c+h+u,this.currentZoom=Me(this.currentZoom,this.targetZoom,r.isGigantic?14.5:i==="upgrade_branching"?1.9:2.6,t),this.position.set(this.currentFocus.x-ts.CAMERA_CENTER_OFFSET,this.currentFocus.y+.18,this.currentZoom),this.lookAt.set(this.currentFocus.x,this.currentFocus.y,0);const S=Math.max(.5,window.innerWidth/Math.max(1,window.innerHeight)),E=Math.tan(Ct.degToRad(this.fov*.5))*this.currentZoom,U=E*S;this.safeLeft=this.lookAt.x-U*.94,this.safeRight=this.lookAt.x+U*.94,this.safeTop=this.lookAt.y+E*.94,this.safeBottom=this.lookAt.y-E*.94}isBehindSafeLine(e){return e.x<this.safeLeft}isOutsideVerticalBounds(e,t=.02){const n=(this.safeTop-this.safeBottom)*t;return e.y<=this.safeBottom+n||e.y>=this.safeTop-n}getPose(){return{position:this.position.clone(),lookAt:this.lookAt.clone()}}getZoom(){return this.currentZoom}getSafeLeft(){return this.safeLeft}getSafeRight(){return this.safeRight}};y(ts,"CAMERA_CENTER_OFFSET",1.6);let Ea=ts;const Wi=class Wi{constructor(e){y(this,"group",new Bt);y(this,"mesh");y(this,"texture");y(this,"layout");y(this,"currentFrame",-1);this.layout=e.layout,this.texture=Wi.getTexture(e.textureUrl,e.layout),this.mesh=new ft(new hi(e.width,e.height),new Wt({map:this.texture,transparent:!0,alphaTest:e.alphaTest??.04,side:e.doubleSided?Ot:xi,depthWrite:!1})),this.mesh.position.y=e.offsetY??0,this.mesh.renderOrder=e.renderOrder??10,this.group.add(this.mesh),this.setFrame(0)}static preload(e,t){Wi.getTexture(e,t)}setVisible(e){this.group.visible=e}setScale(e){this.group.scale.setScalar(e)}setFrame(e){if(e===this.currentFrame)return;this.currentFrame=e;const{columns:t,rows:i}=this.layout,n=e%t,r=Math.floor(e/t);this.texture.offset.set(n/t,1-(r+1)/i)}playLoop(e,t,i){if(e.length===0)return;const n=Math.floor(i*Math.max(.01,t))%e.length;this.setFrame(e[n])}setTexture(e){const t=Wi.getTexture(e,this.layout);t!==this.texture&&(this.texture=t,this.mesh.material.map=t,this.mesh.material.needsUpdate=!0,this.currentFrame=-1,this.setFrame(0))}static getTexture(e,t){const i=this.textureCache.get(e);if(i)return i;const n=this.loader.load(e);return n.colorSpace=nt,n.wrapS=Ut,n.wrapT=Ut,n.repeat.set(1/t.columns,1/t.rows),n.minFilter=Nt,n.magFilter=Nt,n.generateMipmaps=!0,this.textureCache.set(e,n),n}};y(Wi,"loader",new hr),y(Wi,"textureCache",new Map);let ti=Wi;const Gl=new URL("/assets/coinsheetsprite-9pZY0JTm.png",import.meta.url).href;class V0{constructor(e,t){y(this,"group",new Bt);y(this,"pool",[]);y(this,"desiredPosition",new T);ti.preload(Gl,{columns:4,rows:1});for(let i=0;i<36;i+=1){const n=new ti({textureUrl:Gl,layout:{columns:4,rows:1},width:.98,height:.98,alphaTest:.08,doubleSided:!0,offsetY:.01,renderOrder:18});n.mesh.material.depthTest=!1,n.mesh.material.depthWrite=!1,n.setVisible(!1),this.pool.push({activeId:null,sprite:n,smoothedPosition:new T,initialized:!1}),this.group.add(n.group)}this.group.visible=!1,e.add(this.group),this.setTheme(t)}setTheme(e){}setVisible(e){this.group.visible=e}reset(){this.pool.forEach(e=>{e.activeId=null,e.sprite.setVisible(!1),e.initialized=!1})}update(e,t){const i=new Set(e.filter(n=>n.visible).map(n=>n.id));this.pool.forEach(n=>{n.activeId&&!i.has(n.activeId)&&(n.activeId=null,n.initialized=!1,n.sprite.setVisible(!1))}),e.forEach((n,r)=>{let a=this.pool.find(l=>l.activeId===n.id)??this.pool.find(l=>l.activeId===null);if(a||(a=this.pool[r%this.pool.length]),!n||!n.visible){a&&(a.activeId=null,a.initialized=!1,a.sprite.setVisible(!1));return}a.activeId!==n.id&&(a.activeId=n.id,a.initialized=!1);const o=Ct.clamp(n.attraction??0,0,1);if(this.desiredPosition.copy(n.position),n.targetPosition&&o>0&&this.desiredPosition.lerp(n.targetPosition,Math.min(.68,o*.58)),!a.initialized)a.smoothedPosition.copy(this.desiredPosition),a.initialized=!0;else{const l=.22+o*.22;a.smoothedPosition.lerp(this.desiredPosition,l)}a.sprite.setVisible(!0),a.sprite.group.position.copy(a.smoothedPosition),a.sprite.group.position.z+=.34,a.sprite.group.rotation.set(0,0,0),a.sprite.setScale(n.scale*.84*(1+Math.sin(t*2.1+r)*.03)),a.sprite.playLoop([0,1,2,3],1.9,t+r*.04)}),this.pool.forEach(n=>{n.activeId||n.sprite.group.visible||n.sprite.setVisible(!1)})}}const Vl=new URL("/assets/Spritsheetennemie-S1JLbxSH.png",import.meta.url).href;class H0{constructor(e,t){y(this,"group",new Bt);y(this,"pool",[]);y(this,"assignedIds",new Set);y(this,"theme");this.theme=t,ti.preload(Vl,{columns:4,rows:2});for(let i=0;i<64;i+=1){const n=new Bt,r=new ti({textureUrl:Vl,layout:{columns:4,rows:2},width:2.56,height:2.56,alphaTest:.08,doubleSided:!0,renderOrder:32});r.mesh.material.depthTest=!1,r.mesh.material.depthWrite=!1;const a=new ft(new Fa(.12,.34,3),new Wt({color:t==="dark"?"#393F4A":"#D4BF9B",transparent:!0,opacity:.95}));a.material.depthTest=!1,a.renderOrder=33,a.rotation.z=Math.PI,n.add(r.group,a),n.visible=!1,this.pool.push({activeId:null,group:n,body:r,backArrow:a,deathStartedAt:0,dying:!1}),this.group.add(n)}this.group.visible=!1,e.add(this.group)}setTheme(e){this.theme=e,this.pool.forEach(t=>{t.backArrow.material.color.set(this.theme==="dark"?"#D4BF9B":"#393F4A")})}setVisible(e){this.group.visible=e}reset(){this.pool.forEach(e=>{e.activeId=null,e.dying=!1,e.group.visible=!1})}update(e,t){const i=new Set(e.filter(r=>r.visible).map(r=>r.id)),n=new Set;this.assignedIds.clear(),this.pool.forEach(r=>{r.activeId&&!i.has(r.activeId)&&!r.dying&&r.group.visible&&(r.dying=!0,r.deathStartedAt=t)}),e.forEach((r,a)=>{if(!r.visible)return;const o=this.pool.find(c=>c.activeId===r.id)??this.pool.find(c=>!n.has(c)&&!c.dying&&!c.group.visible)??this.pool.find(c=>!n.has(c)&&!c.dying&&c.activeId===null)??this.pool.find(c=>!n.has(c)&&!c.dying)??this.pool[a%this.pool.length];if(!o)return;n.add(o),this.assignedIds.add(r.id),o.activeId=r.id,o.dying=!1,o.group.visible=!0,o.body.mesh.material.opacity=1,o.body.mesh.material.color.set(r.tier==="invincible"?"#F06A5A":"#FFFFFF"),o.body.playLoop([0,1,2,3],r.tier==="invincible"?8.2:r.tier==="elite"?7.1:6.1,t+a*.07),o.backArrow.material.color.set(this.theme==="dark"?"#D4BF9B":"#393F4A"),o.backArrow.material.opacity=.95,o.group.position.copy(r.position),o.group.position.z+=.88,o.group.rotation.set(0,0,0);const l=r.tier==="elite"?.85:r.tier==="armored"?.74:r.tier==="invincible"?.91:.67;o.group.scale.setScalar(l),o.body.group.scale.set(1,r.pole==="south"?-1:1,1),o.body.group.position.set(0,r.pole==="north"?.46:-.46,0),o.backArrow.position.set(0,r.pole==="north"?-1.34:1.34,.02),o.backArrow.rotation.z=r.pole==="north"?Math.PI:0}),this.pool.forEach(r=>{if(!(r.activeId&&this.assignedIds.has(r.activeId))){if(!r.activeId&&!r.dying){r.group.visible=!1;return}if(!r.dying){r.group.visible=!1,r.activeId=null;return}if(r.dying){const a=t-r.deathStartedAt;if(a>=.52){r.group.visible=!1,r.activeId=null,r.dying=!1;return}r.group.visible=!0,r.body.playLoop([4,5,6,7],9.2,a);const o=Math.max(0,1-a/.52);r.body.mesh.material.opacity=o,r.backArrow.material.opacity=o}}})}}const Hl=["shop","gift","rare_item"];class W0{constructor(){y(this,"queuedEvents",new Map);y(this,"shopQueued",!1)}reset(){this.queuedEvents.clear(),this.shopQueued=!1}schedulePostMilestoneEvents(e,t,i){const n=Qt(t),r=i()<n.eventChance?i()<.42?2:1:0;for(let a=0;a<r;a+=1){const o=e+10+Math.floor(i()*11)+a*3;if(this.queuedEvents.has(o))continue;const l=!this.shopQueued&&e>=10?"shop":Hl[Math.floor(i()*Hl.length)]??"gift";this.queuedEvents.set(o,l),l==="shop"&&(this.shopQueued=!0)}}consumePlannedEvent(e,t){const i=this.queuedEvents.get(e);return i?(this.queuedEvents.delete(e),i):"none"}}const X0=["shop","gift","rare_item"],ni=["round","oval","triangular"],si=["round","oval","triangular"],ri=["round","oval","triangular"];function $e(s,e,t,i,n,r,a){return{id:s,difficulty:e,verticality:t,movementType:i,allowedShardSizes:n,allowedShapeKinds:r,eventCompatibility:X0,nodes:a}}const Wl=[$e("easy_01","easy","low","static",["tiny","very_small","small","medium_small"],ni,[{x:10,y:1,coinAngles:[Math.PI*.5]},{x:21,y:-1},{x:33,y:2,enemyPole:"north"},{x:46,y:0,coinAngles:[Math.PI*1.35]}]),$e("easy_02","easy","medium","static",["tiny","small","medium_small","medium"],ni,[{x:9,y:3},{x:20,y:5,coinAngles:[Math.PI*.25]},{x:33,y:2},{x:47,y:-1,enemyPole:"south"}]),$e("easy_03","easy","medium","moving",["very_small","small","medium_small"],ni,[{x:11,y:-3,motionPattern:"vertical"},{x:22,y:1},{x:34,y:4,coinAngles:[Math.PI*.75]},{x:47,y:2,motionPattern:"horizontal"}]),$e("easy_04","easy","low","moving",["tiny","very_small","small"],ni,[{x:8,y:2},{x:18,y:-1,motionPattern:"drift"},{x:30,y:0},{x:43,y:3,coinAngles:[Math.PI*1.75]}]),$e("easy_05","easy","high","static",["small","medium_small","medium"],ni,[{x:10,y:5},{x:20,y:8},{x:31,y:4,enemyPole:"north"},{x:44,y:1}]),$e("easy_06","easy","high","moving",["very_small","small","medium_small"],ni,[{x:10,y:-4,motionPattern:"vertical"},{x:21,y:-7,coinAngles:[Math.PI*.9]},{x:33,y:-3,motionPattern:"micro_orbit"},{x:45,y:1}]),$e("easy_07","easy","medium","static",["small","medium_small","medium"],ni,[{x:11,y:1},{x:23,y:6},{x:36,y:5},{x:50,y:0,coinAngles:[Math.PI*.4],enemyPole:"south"}]),$e("easy_08","easy","medium","moving",["tiny","very_small","small","medium_small"],ni,[{x:9,y:-2,motionPattern:"horizontal"},{x:19,y:1},{x:31,y:-3,coinAngles:[Math.PI*1.1]},{x:43,y:2,motionPattern:"vertical"}]),$e("easy_09","easy","low","static",["small","medium_small","medium"],ni,[{x:12,y:0},{x:25,y:2},{x:39,y:-2,enemyPole:"north"},{x:54,y:1}]),$e("easy_10","easy","medium","moving",["tiny","very_small","small"],ni,[{x:10,y:4,motionPattern:"vertical"},{x:21,y:1},{x:33,y:-2,coinAngles:[Math.PI*.6]},{x:46,y:-5,motionPattern:"drift"}]),$e("medium_01","medium","medium","moving",["small","medium_small","medium","medium_large"],si,[{x:12,y:5,motionPattern:"vertical"},{x:25,y:2,sizeTier:"medium"},{x:39,y:8,coinAngles:[Math.PI*.2],enemyPole:"north"},{x:54,y:4,motionPattern:"horizontal"},{x:69,y:1}]),$e("medium_02","medium","high","moving",["small","medium_small","medium","medium_large"],si,[{x:13,y:-6},{x:27,y:-2,motionPattern:"drift"},{x:40,y:4,sizeTier:"medium_large"},{x:55,y:8,coinAngles:[Math.PI*1.5]},{x:71,y:3,enemyPole:"south"}]),$e("medium_03","medium","medium","static",["very_small","small","medium_small","medium"],si,[{x:11,y:3,sizeTier:"small"},{x:23,y:-1,sizeTier:"medium_small"},{x:36,y:5,sizeTier:"very_large",coinAngles:[Math.PI*.95]},{x:52,y:1,sizeTier:"small"}]),$e("medium_04","medium","high","moving",["very_small","small","medium_small","medium_large"],si,[{x:12,y:7,motionPattern:"vertical"},{x:26,y:2},{x:40,y:-4,motionPattern:"micro_orbit"},{x:54,y:-8,enemyPole:"north"},{x:70,y:-2,coinAngles:[Math.PI*.4]}]),$e("medium_05","medium","medium","moving",["small","medium_small","medium","large"],si,[{x:12,y:1},{x:24,y:6,motionPattern:"horizontal"},{x:39,y:1,sizeTier:"large"},{x:55,y:-3,coinAngles:[Math.PI*1.2]},{x:71,y:2}]),$e("medium_06","medium","high","moving",["tiny","small","medium_small","medium"],si,[{x:10,y:-5,sizeTier:"tiny"},{x:22,y:3,motionPattern:"drift"},{x:36,y:9,sizeTier:"medium_large",coinAngles:[Math.PI*.1]},{x:52,y:5},{x:68,y:-1,enemyPole:"south"}]),$e("medium_07","medium","medium","static",["small","medium_small","medium","medium_large"],si,[{x:13,y:-2},{x:28,y:4,sizeTier:"medium_large"},{x:43,y:7,sizeTier:"medium"},{x:58,y:1,coinAngles:[Math.PI*.65]},{x:74,y:-2}]),$e("medium_08","medium","high","moving",["small","medium_small","medium","large"],si,[{x:12,y:6,motionPattern:"vertical"},{x:26,y:-2},{x:40,y:-8,motionPattern:"horizontal"},{x:56,y:-3,sizeTier:"large",enemyPole:"north"},{x:72,y:4,coinAngles:[Math.PI*1.4]}]),$e("medium_09","medium","medium","moving",["very_small","small","medium_small","medium"],si,[{x:11,y:2,sizeTier:"very_small"},{x:24,y:8,motionPattern:"drift"},{x:40,y:4},{x:56,y:-1,enemyPole:"south"},{x:72,y:3,coinAngles:[Math.PI*.5]}]),$e("medium_10","medium","high","moving",["small","medium_small","medium","very_large"],si,[{x:12,y:-7,motionPattern:"vertical"},{x:27,y:-1,sizeTier:"small"},{x:42,y:6,sizeTier:"very_large"},{x:58,y:9,coinAngles:[Math.PI*.3],enemyPole:"north"},{x:76,y:2}]),$e("hard_01","hard","high","moving",["small","medium_small","medium","large","very_large"],ri,[{x:14,y:7,motionPattern:"vertical"},{x:31,y:0,sizeTier:"large"},{x:48,y:-8,motionPattern:"micro_orbit",enemyPole:"north"},{x:66,y:-1,coinAngles:[Math.PI*1.5]},{x:86,y:6,sizeTier:"very_large"}]),$e("hard_02","hard","high","moving",["tiny","small","medium_small","medium","large"],ri,[{x:13,y:-8,sizeTier:"tiny"},{x:30,y:-2,motionPattern:"drift"},{x:47,y:6,sizeTier:"medium_large"},{x:66,y:10,coinAngles:[Math.PI*.95]},{x:86,y:1,enemyPole:"south"}]),$e("hard_03","hard","medium","moving",["small","medium_small","medium","large","very_large"],ri,[{x:15,y:2,sizeTier:"very_large"},{x:33,y:7,motionPattern:"horizontal"},{x:51,y:1,sizeTier:"small"},{x:70,y:-6,motionPattern:"vertical"},{x:91,y:0,coinAngles:[Math.PI*.2],enemyPole:"north"}]),$e("hard_04","hard","high","moving",["tiny","small","medium_small","large"],ri,[{x:14,y:9,sizeTier:"tiny"},{x:31,y:2},{x:49,y:-7,motionPattern:"horizontal"},{x:68,y:-10,sizeTier:"large",coinAngles:[Math.PI*1.1]},{x:90,y:-1,enemyPole:"south"}]),$e("hard_05","hard","high","moving",["small","medium_small","medium","medium_large","huge"],ri,[{x:15,y:-3},{x:32,y:8,sizeTier:"huge"},{x:50,y:2,motionPattern:"micro_orbit"},{x:70,y:-9,sizeTier:"small",enemyPole:"north"},{x:92,y:-4,coinAngles:[Math.PI*.55]}]),$e("hard_06","hard","medium","moving",["tiny","small","medium_small","medium","large"],ri,[{x:14,y:5,sizeTier:"small"},{x:31,y:-4,motionPattern:"vertical"},{x:49,y:5,sizeTier:"tiny"},{x:69,y:11,motionPattern:"drift",enemyPole:"south"},{x:91,y:4,coinAngles:[Math.PI*.25]}]),$e("expert_01","expert","high","moving",["tiny","small","medium_small","large","very_large"],ri,[{x:16,y:10,sizeTier:"tiny",motionPattern:"vertical"},{x:36,y:1,sizeTier:"large"},{x:57,y:-10,motionPattern:"micro_orbit",enemyPole:"north"},{x:79,y:0,sizeTier:"very_large"},{x:103,y:9,coinAngles:[Math.PI*1.65]}]),$e("expert_02","expert","high","moving",["tiny","small","medium_small","medium","huge"],ri,[{x:17,y:-11,sizeTier:"tiny"},{x:37,y:-2,motionPattern:"drift"},{x:59,y:9,sizeTier:"huge"},{x:82,y:12,motionPattern:"horizontal",enemyPole:"south"},{x:107,y:1,coinAngles:[Math.PI*.15]}]),$e("expert_03","expert","medium","moving",["small","medium_small","medium","large","massive"],ri,[{x:16,y:2,sizeTier:"massive"},{x:38,y:10,motionPattern:"vertical"},{x:61,y:0,sizeTier:"small"},{x:85,y:-10,motionPattern:"drift",enemyPole:"north"},{x:111,y:-1,coinAngles:[Math.PI*1.1]}]),$e("expert_04","expert","high","moving",["tiny","small","medium","large","very_large"],ri,[{x:15,y:8,motionPattern:"horizontal"},{x:35,y:-7,sizeTier:"tiny"},{x:57,y:11,sizeTier:"large"},{x:81,y:-9,motionPattern:"micro_orbit",enemyPole:"south"},{x:108,y:3,coinAngles:[Math.PI*.35]}])],q0={easy:{easy:70,medium:30,hard:0,expert:0},medium:{easy:40,medium:40,hard:20,expert:0},hard:{easy:0,medium:20,hard:60,expert:20},expert:{easy:0,medium:10,hard:55,expert:35}};function j0(s,e,t){const i=Qt(s),n=q0[i.band],r=new Set(t.slice(-3)),a=Wl.filter(h=>!r.has(h.id)&&n[h.difficulty]>0),o=a.length>0?a:Wl.filter(h=>n[h.difficulty]>0),l=o.reduce((h,u)=>h+n[u.difficulty],0);let c=e()*l;for(const h of o)if(c-=n[h.difficulty],c<=0)return h;return o[o.length-1]}function oa(s,e){if(s.length===0)return!1;const t=e.slice(Math.max(0,e.length-8));let i=e[e.length-1]??null;for(const n of s){const r=Qt(n.index);if(i){const a=n.x-i.x,o=n.y-i.y,l=Math.hypot(a,o),c=Ys(i)+Ys(n),h=$0(i,n,a,o,c,r.maxVerticalDelta);if(l<c||l>r.maxJumpDistance||!h&&Math.abs(o)>r.maxVerticalDelta||!h&&n.x<i.x+Math.max(2.8,n.gameplayRadius*.75))return!1}for(const a of t)if(a.isMilestone&&Y0(n,a)||Math.hypot(n.x-a.x,n.y-a.y)<Ys(n)+Ys(a)||Math.abs(n.x-a.x)<Math.max(1.25,(n.gameplayRadius+a.gameplayRadius)*.42)&&Math.abs(n.y-a.y)<Math.max(1.7,(n.gameplayRadius+a.gameplayRadius)*.54))return!1;if(Math.abs(n.y)>28)return!1;t.push(n),t.length>8&&t.shift(),i=n}return!0}function Y0(s,e){const t=e.x-Mt*3,i=e.x+Mt*5.1;return s.x>=t&&s.x<=i}function Ys(s){const e=s.gameplayRadius<1.15?.72:s.gameplayRadius<1.9?1.05:1.38;return s.gameplayRadius+s.visualScale*.14+e}function $0(s,e,t,i,n,r){if(s.isGigantic||e.isGigantic||Xl(s)||Xl(e))return!1;const a=Math.abs(t)<=Math.max(2.1,n*.34),o=Math.abs(i)>=Math.max(4.8,n*1.02),l=Math.abs(i)<=r*2.35,c=t>=.28;return a&&o&&l&&c}function Xl(s){return s.sizeTier==="large"||s.sizeTier==="very_large"||s.sizeTier==="huge"||s.sizeTier==="massive"}function Z0(s,e,t){return t<=e||!s[t]?!1:t<s.length-4}function J0(s,e){if(s.shapeKind==="round")return 0;const t=s.spinDirection==="cw"?-1:1,i=s.shapeKind==="oval"?.38:.92;return s.motionSeed+e*s.spinSpeed*i*t}function ur(s,e,t){const i=Qt(Math.max(s.index,t));let n=s.x,r=s.y;if(s.index>t+1&&s.motionPattern!=="none"){const a=e*(.48+i.movementSpeed*.66)+s.motionSeed,o=i.movementAmplitude*(.44+s.visualScale*.08);s.motionPattern==="vertical"?r+=Math.sin(a)*o*.95:s.motionPattern==="horizontal"?(n+=Math.cos(a*.82)*o*.7,r+=Math.sin(a*.54)*o*.2):s.motionPattern==="micro_orbit"?(n+=Math.sin(a*.55)*o*.34,r+=Math.cos(a*.94)*o*.7):s.motionPattern==="drift"&&(n+=Math.cos(a*.42)*o*.46,r+=Math.sin(a*.42)*o*.46)}return{...s,resolvedX:n,resolvedY:r,resolvedZ:s.z,resolvedSpinPhase:J0(s,e)}}const ql={tiny:{radius:[.42,.6],visual:[.34,.54],orbitPeriod:[1.6,2.1]},very_small:{radius:[.6,.86],visual:[.54,.82],orbitPeriod:[2,2.5]},small:{radius:[.86,1.18],visual:[.82,1.18],orbitPeriod:[2.4,2.9]},medium_small:{radius:[1.18,1.58],visual:[1.18,1.72],orbitPeriod:[2.8,3.5]},medium:{radius:[1.58,2.08],visual:[1.72,2.36],orbitPeriod:[3.2,4]},medium_large:{radius:[2.08,2.74],visual:[2.36,3.12],orbitPeriod:[3.8,4.8]},large:{radius:[2.74,3.54],visual:[3.12,4.16],orbitPeriod:[4.4,5.6]},very_large:{radius:[3.54,4.52],visual:[4.16,5.7],orbitPeriod:[5.4,6.8]},huge:{radius:[4.52,5.9],visual:[5.7,7.9],orbitPeriod:[6.8,8.4]},massive:{radius:[5.9,7.4],visual:[7.9,11.2],orbitPeriod:[8.4,9.8]}},K0=["tiny","very_small","small","medium_small","medium","medium_large","large","very_large","huge","massive"],$s=Mt*2.3,jl=Mt,dr=Mt*3,Yc=Mt*1.35,$c=Mt*.45;function Q0(s){return{start:s-dr,end:s+dr+Yc+$c}}class ev{constructor(){y(this,"nodes",[]);y(this,"eventSystem",new W0);y(this,"seed",1);y(this,"recentPatternIds",[])}reset(){this.seed=Math.random()*2147483647|1,this.recentPatternIds=[],this.eventSystem.reset(),this.nodes=[{index:0,x:-12,y:.8,z:0,gameplayRadius:1.86,visualScale:1.92,pathDistance:0,direction:"right",kind:"normal",sizeTier:"medium",shapeKind:"round",spinDirection:"cw",spinSpeed:.18,motionPattern:"none",eventType:"none",colorHint:"none",gameplayOrbitPeriod:3.6,branchSlot:null,offerId:null,onboarding:!0,isMilestone:!1,isGigantic:!1,coinSlots:[{angle:Math.PI*.4,value:1,collected:!1,orbitScale:1}],enemySlot:null,motionSeed:this.nextRandom()*Math.PI*2,visualStretch:{x:1,y:1,z:1}}]}prebuild(e){this.nodes.length===0&&this.reset(),this.append(Math.max(0,e-this.nodes.length))}ensureAhead(e,t=50,i=30){this.nodes.length-e>t||this.append(i)}queuePostMilestoneEvents(e,t){this.eventSystem.schedulePostMilestoneEvents(e,t,()=>this.nextRandom())}getInitialNodes(e){return this.prebuild(Math.max(180,e+60)),this.nodes.slice(0,e)}getInitialPositions(e){return this.getInitialNodes(e).map(t=>({x:t.x,y:t.y,z:t.z}))}getNode(e){return this.ensureAhead(e+1),this.nodes[e]||null}getWindow(e,t,i,n){return this.ensureAhead(e+t),this.nodes.slice(e,e+t).map(r=>ur(r,i,n))}getResolvedNode(e,t,i){this.ensureAhead(e+1);const n=this.nodes[e]??this.nodes[this.nodes.length-1];return ur(n,t,i)}replaceFuture(e,t){const i=this.nodes.slice(0,e+1),n=i[i.length-1]??null,r=[];t.forEach((a,o)=>{r.push(this.reindexNode(a,e+o+1,o===0?n:r[o-1]))}),this.nodes=[...i,...r]}createUpgradeBranches(e,t,i){const n=this.getNode(e);if(!n)return[];const r=i<50?8.4:7.2,a=n.x+dr,o=[{slot:0,yBias:r*2,direction:"up_right"},{slot:1,yBias:0,direction:"right"},{slot:2,yBias:-r*2,direction:"down_right"}];return t.slice(0,3).map((l,c)=>{const h=o[c]??o[1],u="medium",d=ql[u],f=d.radius[0]+this.nextRandom()*(d.radius[1]-d.radius[0]),g=d.visual[0]+this.nextRandom()*(d.visual[1]-d.visual[0]),_=d.orbitPeriod[0]+this.nextRandom()*(d.orbitPeriod[1]-d.orbitPeriod[0]),m=this.buildNode({previous:n,index:e+1,x:a,y:n.y+h.yBias,direction:h.direction,sizeTier:u,shapeKind:"round",motionPattern:"none",spinDirection:c===1?"cw":"ccw",spinSpeed:.14+c*.03+this.nextRandom()*.04,gameplayRadius:f,visualScale:g,gameplayOrbitPeriod:_,visualStretch:{x:1,y:1,z:1},kind:"branch",branchSlot:h.slot,offerId:l.item.id,onboarding:!1,eventType:"none",colorHint:"reward",isMilestone:!1,isGigantic:!1,coinSlots:[{angle:Math.PI*.5,value:1,collected:!1,orbitScale:1}],enemySlot:null});return{mode:"reward_branch",offer:l,entry:m,previewNodes:[m],pathNodes:[m]}})}getTeleportTarget(e,t){this.ensureAhead(e+t+60);const i=Math.min(this.nodes.length-5,e+t);return Z0(this.nodes,e,i)?i:-1}sampleAtDistance(e){this.nodes.length===0&&this.prebuild(2);const t=Math.max(0,e);let i=this.nodes[0];for(let o=1;o<this.nodes.length;o+=1){const l=this.nodes[o];if(l.pathDistance>=t){const c=Math.max(1e-4,l.pathDistance-i.pathDistance),h=De((t-i.pathDistance)/c,0,1),u=i.x+(l.x-i.x)*h,d=i.y+(l.y-i.y)*h,f=Math.hypot(l.x-i.x,l.y-i.y)||1;return{x:u,y:d,z:0,tangent:{x:(l.x-i.x)/f,y:(l.y-i.y)/f}}}i=l}const n=this.nodes[this.nodes.length-1],r=this.nodes[this.nodes.length-2]??n,a=Math.hypot(n.x-r.x,n.y-r.y)||1;return{x:n.x,y:n.y,z:0,tangent:{x:(n.x-r.x)/a,y:(n.y-r.y)/a}}}append(e){if(e<=0)return;let t=0;for(;t<e;){const i=j0(this.nodes.length,()=>this.nextRandom(),this.recentPatternIds),n=this.instantiatePattern(i);this.nodes.push(...n),this.recentPatternIds.push(i.id),this.recentPatternIds.length>6&&this.recentPatternIds.shift(),t+=n.length}}instantiatePattern(e){const t=this.nodes[this.nodes.length-1],i=t.index,r=Qt(i).spacing/11.5,a=e.nodes.map((c,h)=>{const u=t.index+h+1;return this.buildTemplateNode(t,u,c,e,r,i)}),o=this.isolateMilestones(this.densifyPattern(t,a,i),t,i);let l;return oa(o,this.nodes)?l=o:oa(a,this.nodes)?l=a:l=this.buildFallbackPattern(t),this.reserveMilestones(t,this.expandLanePresence(t,l,i),i)}reserveMilestones(e,t,i){if(t.length===0)return t;const n=[];let r=e;return t.forEach(a=>{const o=Math.hypot(a.x-r.x,a.y-r.y),l=jn(r.pathDistance),c=jn(r.pathDistance+o),h=aa(l,c);let u={...a};if(h!==null){const f=$s/1.1500000000000001,g=$s+jl,_=Math.max(a.x,r.x+g);u=this.buildNode({previous:r,index:r.index+1,x:_,y:0,direction:"right",sizeTier:"massive",shapeKind:"round",motionPattern:"none",spinDirection:"cw",spinSpeed:.04,gameplayRadius:$s,visualScale:f,gameplayOrbitPeriod:5.4,visualStretch:{x:1,y:1,z:1},kind:"milestone",branchSlot:null,offerId:null,onboarding:!1,eventType:"none",colorHint:"none",isMilestone:!0,isGigantic:!0,coinSlots:[],enemySlot:null})}const d=this.reindexNode(u,r.index+1,r);n.push(d),r=d}),this.isolateMilestones(n,e,i)}buildTemplateNode(e,t,i,n,r,a){const o=this.pickShapeKind(n.allowedShapeKinds,a),c=i.sizeTier??this.pickSizeTier(n.allowedShardSizes,a),h=e.x+i.x*r,u=e.y+i.y*r*1.14,d=this.alignToLane(u,a,c,!1),f=Math.hypot(h-e.x,d-e.y),g=jn(e.pathDistance),_=jn(e.pathDistance+f),m=aa(g,_)!==null,p=m,M=p?"massive":c,v=ql[M],b=p?14.4+this.nextRandom()*2.6:v.radius[0]+this.nextRandom()*(v.radius[1]-v.radius[0]),L=p?38+this.nextRandom()*14:v.visual[0]+this.nextRandom()*(v.visual[1]-v.visual[0]),C=p?5.4+this.nextRandom()*.8:v.orbitPeriod[0]+this.nextRandom()*(v.orbitPeriod[1]-v.orbitPeriod[0]),R=this.directionFrom(e.x,e.y,h,d),F=this.resolveEventType(t,g,_,a,i),S=p?"none":this.pickMotionPattern(i.motionPattern,a,o,M),E=this.nextRandom()<.5?"cw":"ccw",U=o==="triangular"?.42+this.nextRandom()*.22:o==="oval"?.18+this.nextRandom()*.1:.08+this.nextRandom()*.12,G=o==="oval"?{x:1.72+this.nextRandom()*.38,y:.68+this.nextRandom()*.12,z:.82+this.nextRandom()*.1}:o==="triangular"?{x:1.18+this.nextRandom()*.18,y:1.24+this.nextRandom()*.16,z:.64+this.nextRandom()*.12}:{x:1,y:1,z:1},K=m?"milestone":F==="none"?"normal":"event",I=m?"accent":F==="none"?"none":"accent",O=m||F!=="none";return this.buildNode({previous:e,index:t,x:h,y:d,direction:R,sizeTier:M,shapeKind:o,motionPattern:S,spinDirection:E,spinSpeed:U,gameplayRadius:b,visualScale:O?L*1.08:L,gameplayOrbitPeriod:C,visualStretch:G,kind:K,branchSlot:null,offerId:null,onboarding:t<50,eventType:F,colorHint:I,isMilestone:m,isGigantic:p,coinSlots:this.buildCoinSlots(i,F,a),enemySlot:this.buildEnemySlot(i,a,F,o)})}buildFallbackPattern(e){const t=e.index,i=Qt(t),n=[],r=4;for(let a=0;a<r;a+=1){const o=e.index+a+1,l=a===0?e:n[a-1],c=l.y>9?"down_right":l.y<-9||a%2===0?"up_right":"down_right",h=c==="up_right"?{x:1,y:.66}:c==="down_right"?{x:1,y:-.66}:{x:1,y:0},u=i.spacing*(.68+this.nextRandom()*.16),d=l.x+h.x*u,f=this.alignToLane(l.y+h.y*u*1.08,t,a%2===0?"small":"medium_small",!0);n.push(this.buildNode({previous:l,index:o,x:d,y:f,direction:c,sizeTier:a%2===0?"small":"medium_small",shapeKind:this.pickShapeKind(["round","oval","triangular"],t),motionPattern:i.roundMovementUnlocked?"vertical":"none",spinDirection:"cw",spinSpeed:.14,gameplayRadius:a%2===0?1.12:1.46,visualScale:a%2===0?1.2:1.58,gameplayOrbitPeriod:a%2===0?2.8:3.2,visualStretch:{x:1,y:1,z:1},kind:"normal",branchSlot:null,offerId:null,onboarding:o<50,eventType:"none",colorHint:"none",isMilestone:!1,isGigantic:!1,coinSlots:a===1?[{angle:Math.PI*.6,value:1,collected:!1,orbitScale:1}]:[],enemySlot:null}))}return n}densifyPattern(e,t,i){if(t.length===0)return t;const n=Qt(i),r=[];let a=e,o=0;const l=i>=50&&i%36<12;t.forEach(h=>{const u=h.x-a.x,d=h.y-a.y,f=Math.hypot(u,d),g=Math.abs(d)<n.maxVerticalDelta*.2;o=g?o+1:0;const _=i<50,m=Math.max(h.gameplayRadius,a.gameplayRadius),p=m<1.05?4:m<1.9?2:1;if(i<160&&(f>n.spacing*(_?.82:1.02)||Math.abs(d)>n.maxVerticalDelta*.62||o>=(_?1:2)||l)){const v=_||l||f>n.spacing*1.28||Math.abs(d)>n.maxVerticalDelta*.92?2:1,b=Math.min(p,v+(_&&p>1?1:0));for(let L=0;L<b;L+=1){const C=(L+1)/(b+1),R=(a.index+h.index+L)%2===0?1:-1,F=(b-1)*.5,S=(L-F)*(_?2.45:1.85),E=g?S+R*(_?.85:.55):Math.sign(d||R)*Math.min(_?2.8:2.2,Math.abs(d)*.34)+S*.4,U=r[r.length-1]??a,G=a.x+u*C+(b>=3?(L-F)*.18:0),K=a.y+d*C+E,I=b>=3||L===0?"tiny":"very_small",O=this.alignToLane(K,i,I,!0);r.push(this.buildNode({previous:U,index:U.index+1,x:G,y:O,direction:this.directionFrom(U.x,U.y,G,O),sizeTier:I,shapeKind:this.pickShapeKind(["round","oval","triangular"],i),motionPattern:i>=40&&L===b-1?"vertical":"none",spinDirection:this.nextRandom()<.5?"cw":"ccw",spinSpeed:.1+this.nextRandom()*.08,gameplayRadius:I==="tiny"?.78:.96,visualScale:I==="tiny"?.86:1.08,gameplayOrbitPeriod:I==="tiny"?2.4:2.75,visualStretch:{x:1,y:1,z:1},kind:"normal",branchSlot:null,offerId:null,onboarding:h.index<50,eventType:"none",colorHint:"none",isMilestone:!1,isGigantic:!1,coinSlots:[],enemySlot:null}))}}r.push(this.reindexNode(h,(r[r.length-1]??a).index+1,r[r.length-1]??a)),a=r[r.length-1]??a});const c=[];return r.forEach((h,u)=>{c.push(this.reindexNode(h,e.index+u+1,u===0?e:c[u-1]))}),c}expandLanePresence(e,t,i){if(t.length===0)return t;const n=i<50?8.4:7.2,r=[-n,0,n],a=[-n*1.65,-n*.82,0,n*.82,n*1.65],o=[],l=i>=50&&i%42<16;t.forEach(h=>{const u=o[o.length-1]??e,d=this.forceLargeShardCenter(h,i),f=this.reindexNode(d,u.index+1,u);if(o.push(f),f.isMilestone||f.isGigantic||["large","very_large","huge","massive"].includes(f.sizeTier))return;const _=i<50,m=f.sizeTier==="tiny"||f.sizeTier==="very_small"||f.sizeTier==="small"||f.sizeTier==="medium_small",p=_&&m;if(!(p||l||this.nextRandom()<.42))return;const v=(f.sizeTier==="tiny"||f.sizeTier==="very_small"||f.sizeTier==="small")&&p||l&&this.nextRandom()<.36,b=v?a:r,L=v?2:1,C=this.getLaneIndex(f.y,n,v),R=this.buildCompanionLaneOrder(C,b.length),F=f.sizeTier==="tiny"||f.sizeTier==="very_small"||f.sizeTier==="small"?v?4:_?2:1:f.sizeTier==="medium_small"||f.sizeTier==="medium"?v?3:_?2:1:0;for(let S=0;S<F;S+=1){const E=R[S];if(E===void 0)break;const U=o[o.length-1]??e,G=this.pickCompanionSizeTier(f.sizeTier),K=(S-(F-1)*.5)*(v?.12:.18),I=f.x+.5+K+(this.nextRandom()-.5)*(p?.16:.12),O=b[E]+(this.nextRandom()-.5)*(G==="tiny"?.82:G==="very_small"?.64:.5),H=E!==L&&this.nextRandom()<.34,$=this.buildNode({previous:U,index:U.index+1,x:I,y:O,direction:this.directionFrom(U.x,U.y,I,O),sizeTier:G,shapeKind:this.pickShapeKind(["round","oval","triangular"],i),motionPattern:_?"none":this.nextRandom()<.16?"vertical":"none",spinDirection:this.nextRandom()<.5?"cw":"ccw",spinSpeed:.08+this.nextRandom()*.08,gameplayRadius:G==="tiny"?.78:G==="very_small"?.9:1.06,visualScale:G==="tiny"?.88:G==="very_small"?1.02:1.16,gameplayOrbitPeriod:G==="tiny"?2.36:G==="very_small"?2.58:2.9,visualStretch:{x:1,y:1,z:1},kind:"normal",branchSlot:null,offerId:null,onboarding:U.index<50,eventType:"none",colorHint:"none",isMilestone:!1,isGigantic:!1,coinSlots:H?[{angle:Math.PI*(.35+this.nextRandom()*1.2),value:1,collected:!1,orbitScale:1}]:[],enemySlot:null});oa([$],[...this.nodes,...o])&&o.push($)}});const c=[];return o.forEach((h,u)=>{c.push(this.reindexNode(h,e.index+u+1,u===0?e:c[u-1]))}),c}buildNode(e){const t=e.previous,i=t?Math.hypot(e.x-t.x,e.y-t.y):0;return{index:e.index,x:e.x,y:e.y,z:0,gameplayRadius:e.gameplayRadius,visualScale:e.visualScale,pathDistance:t?t.pathDistance+i:0,direction:e.direction,kind:e.kind,sizeTier:e.sizeTier,shapeKind:e.shapeKind,spinDirection:e.spinDirection,spinSpeed:e.spinSpeed,motionPattern:e.motionPattern,eventType:e.eventType,colorHint:e.colorHint,gameplayOrbitPeriod:e.gameplayOrbitPeriod,branchSlot:e.branchSlot,offerId:e.offerId,onboarding:e.onboarding,isMilestone:e.isMilestone,isGigantic:e.isGigantic,coinSlots:e.coinSlots,enemySlot:e.enemySlot,motionSeed:this.nextRandom()*Math.PI*2,visualStretch:e.visualStretch}}alignToLane(e,t,i,n){const r=t<50?8.4:7.2,a=[-r,0,r],o=i==="massive"||i==="huge"||i==="very_large",l=i==="medium"||i==="medium_large"||i==="large";if(o)return Ct.clamp(e*.35,-r,r);const c=e>r*.35?2:e<-r*.35?0:1;let h=c;n&&!l&&this.nextRandom()<.42?h=[0,1,2][Math.floor(this.nextRandom()*3)]??c:n&&l&&this.nextRandom()<.2&&(h=c===1?this.nextRandom()<.5?0:2:c);const u=o?.32:l?.44:.58;return a[h]+(this.nextRandom()-.5)*u}getLaneIndex(e,t,i=!1){return i?e>t*1.24?4:e>t*.38?3:e<-t*1.24?0:e<-t*.38?1:2:e>t*.42?2:e<-t*.42?0:1}buildCompanionLaneOrder(e,t){const i=[];for(let n=1;n<t;n+=1){const r=e-n,a=e+n;a<t&&i.push(a),r>=0&&i.push(r)}return i}pickCompanionSizeTier(e){switch(e){case"tiny":case"very_small":return"tiny";case"small":case"medium_small":return this.nextRandom()<.5?"tiny":"very_small";case"medium":return this.nextRandom()<.5?"very_small":"small";default:return"small"}}forceLargeShardCenter(e,t){if(!["large","very_large","huge","massive"].includes(e.sizeTier)||e.isMilestone||e.isGigantic)return e;const i=this.alignToLane(0,t,e.sizeTier,!1);return{...e,y:i}}reindexNode(e,t,i){return this.buildNode({previous:i,index:t,x:e.x,y:e.y,direction:e.direction,sizeTier:e.sizeTier,shapeKind:e.shapeKind,motionPattern:e.motionPattern,spinDirection:e.spinDirection,spinSpeed:e.spinSpeed,gameplayRadius:e.gameplayRadius,visualScale:e.visualScale,gameplayOrbitPeriod:e.gameplayOrbitPeriod,visualStretch:e.visualStretch,kind:e.kind,branchSlot:e.branchSlot,offerId:e.offerId,onboarding:!1,eventType:e.eventType,colorHint:e.colorHint,isMilestone:e.isMilestone,isGigantic:e.isGigantic,coinSlots:e.coinSlots.map(n=>({...n})),enemySlot:e.enemySlot?{...e.enemySlot}:null})}buildCoinSlots(e,t,i){var r;const n=((r=e.coinAngles)==null?void 0:r.map(a=>({angle:a,value:t==="rare_item"?2:1,collected:!1,orbitScale:1})))??[];return n.length===0&&i<12&&n.push({angle:Math.PI*(.2+this.nextRandom()*1.6),value:1,collected:!1,orbitScale:1}),n}buildEnemySlot(e,t,i,n){if(!Qt(t).enemyUnlocked||i==="shop"||i==="gift"||n!=="round")return null;const a=e.enemyPole??(this.nextRandom()<.24?this.nextRandom()<.5?"north":"south":null);if(!a)return null;const o=t<60?"light":t<120?this.nextRandom()<.7?"armored":"light":this.nextRandom()<.18?"invincible":this.nextRandom()<.55?"elite":"armored",l=o==="light"?4.6:o==="armored"?6.4:o==="elite"?8.1:Number.POSITIVE_INFINITY;return{pole:a,tier:o,alive:!0,rewardCoins:o==="elite"?10:o==="armored"?8+Math.floor(this.nextRandom()*2):o==="light"?5+Math.floor(this.nextRandom()*4):0,speedThreshold:l}}pickSizeTier(e,t){const i=Qt(t),n=K0.filter(o=>e.includes(o)),r=De(Math.floor(i.normalized*(n.length-1)+4),0,n.length-1),a=n.slice(0,r+1);return a[Math.floor(this.nextRandom()*a.length)]??"medium"}pickShapeKind(e,t){const i=De(t/220,0,1),n={round:.9-i*.22,oval:.08+i*.16,triangular:.02+i*.08},r=e.length>0?e:["round"],a=r.reduce((l,c)=>l+(n[c]??0),0);let o=this.nextRandom()*a;for(const l of r)if(o-=n[l]??0,o<=0)return l;return r[0]??"round"}isolateMilestones(e,t,i){if(!e.some(o=>o.isMilestone))return e;const n=i<50?8.4:7.2,r=[];e.forEach((o,l)=>{let c={...o};if(c.isMilestone){const d=$s+jl;c={...c,x:Math.max(c.x,(r[l-1]??t).x+d),y:0}}const h=r[l-1]??t;if(h.isMilestone){const d=dr+Yc+$c;c={...c,x:Math.max(c.x,h.x+d),y:Math.abs(c.y)<n*1.7?c.y>=0?n*2.2:-n*2.2:c.y}}const u=[...r,t].filter(d=>d.isMilestone).reduce((d,f)=>d?Math.abs(f.x-c.x)<Math.abs(d.x-c.x)?f:d:f,null);if(u&&!c.isMilestone){const d=Q0(u.x);c.x>=d.start&&c.x<=d.end&&(c={...c,x:d.end+Math.max(Mt*.92,c.gameplayRadius*.42),y:Math.abs(c.y)<n*1.9?c.y>=0?n*2.5:-n*2.5:c.y})}r.push(c)});const a=[];return r.forEach((o,l)=>{a.push(this.reindexNode(o,t.index+l+1,l===0?t:a[l-1]))}),a}pickMotionPattern(e,t,i,n){const r=Qt(t);if(i!=="round"||!r.roundMovementUnlocked||["large","very_large","huge","massive"].includes(n))return"none";const a=r.movingShardChance*(t<50?.55:1);if(e&&e!=="none"&&this.nextRandom()<a+.18)return e;if(this.nextRandom()>a)return"none";const o=["vertical","horizontal"];return o[Math.floor(this.nextRandom()*o.length)]??"none"}resolveEventType(e,t,i,n,r){if(aa(t,i)!==null)return"none";const a=this.eventSystem.consumePlannedEvent(e,n);if(a!=="none")return a;if(i>=20&&r.sizeTier!=="massive"){const o=i<60?.018:i<100?.024:i<250?.032:i<600?.042:.056;if(this.nextRandom()<o){const l=this.nextRandom();return l<.22?"shop":l<.64?"gift":"rare_item"}}return"none"}directionFrom(e,t,i,n){const r=i-e,a=n-t;return Math.abs(a)<1.5?"right":a>0?r<0?"up_left":Math.abs(r)<1.2?"up":"up_right":r<0?"down_left":"down_right"}nextRandom(){return this.seed=this.seed*48271%2147483647,this.seed/2147483647}}const Yl="portfolio-game-highscore",$l="portfolio-game-best-distance",Zl="portfolio-game-best-splits";class tv{constructor(){y(this,"shardsLanded",0);y(this,"distanceMeters",0);y(this,"coins",0);y(this,"runStartTime",0);y(this,"splitTimes",{});y(this,"bestShards",Number(window.localStorage.getItem(Yl)||0));y(this,"bestDistanceMeters",Number(window.localStorage.getItem($l)||0));y(this,"bestSplitTimes",this.readSplits())}reset(e=performance.now()){this.shardsLanded=0,this.distanceMeters=0,this.coins=0,this.runStartTime=e,this.splitTimes={}}recordLanding(e,t,i){const n=this.distanceMeters;this.shardsLanded=Math.max(this.shardsLanded,e),this.distanceMeters=Math.max(this.distanceMeters,jn(t));for(const r of[10,100,1e3]){if(n>=r||this.distanceMeters<r||this.splitTimes[r]!==void 0)continue;const a=Math.max(0,i-this.runStartTime)/1e3;this.splitTimes[r]=a;const o=this.bestSplitTimes[r];(o===void 0||a<o)&&(this.bestSplitTimes[r]=a,this.persist())}this.shardsLanded>this.bestShards&&(this.bestShards=this.shardsLanded,this.persist()),this.distanceMeters>this.bestDistanceMeters&&(this.bestDistanceMeters=this.distanceMeters,this.persist())}addCoins(e){this.coins+=e}canAfford(e){return this.coins>=e}spendCoins(e){return this.coins<e?!1:(this.coins-=e,!0)}getSnapshot(){return{shardsLanded:this.shardsLanded,bestShards:this.bestShards,distanceMeters:this.distanceMeters,bestDistanceMeters:this.bestDistanceMeters,coins:this.coins,splitTimes:{...this.splitTimes},bestSplitTimes:{...this.bestSplitTimes}}}fillHud(e){e.score=this.shardsLanded,e.highscore=this.bestShards,e.distanceMeters=this.distanceMeters,e.bestDistanceMeters=this.bestDistanceMeters,e.coins=this.coins,e.splitTimes={...this.splitTimes}}readSplits(){const e=window.localStorage.getItem(Zl);if(!e)return{};try{return JSON.parse(e)}catch{return{}}}persist(){window.localStorage.setItem(Yl,String(this.bestShards)),window.localStorage.setItem($l,String(this.bestDistanceMeters)),window.localStorage.setItem(Zl,JSON.stringify(this.bestSplitTimes))}}const Jl="#D9624E";class iv{constructor(e,t){y(this,"group",new Bt);y(this,"pool",[]);y(this,"activeOffers",[]);y(this,"open",!1);const i=new Ne(t==="dark"?Jl:"#8E4130");for(let n=0;n<3;n+=1){const r=new ft(new yr(.34,0),new Wt({color:i,transparent:!0,opacity:.94}));r.visible=!1,this.pool.push(r),this.group.add(r)}this.group.visible=!1,e.add(this.group)}setTheme(e){const t=new Ne(e==="dark"?Jl:"#8E4130");this.pool.forEach(i=>i.material.color.copy(t))}reset(){this.open=!1,this.activeOffers=[],this.group.visible=!1,this.pool.forEach(e=>{e.visible=!1})}openForRun(e,t){const i=Math.max(0,Math.min(.45,t.modifiers.shopDiscount)),n=qn(e,t);return this.activeOffers=n.slice(0,3).map((r,a)=>({angle:Math.PI*(.2+a*.55),price:this.getPriceForOffer(r,i),purchased:!1,offer:r})),this.open=this.activeOffers.length>0,this.group.visible=this.open,n}isOpen(){return this.open}getActiveOffers(){return this.activeOffers.map(e=>({offer:e.offer,price:e.price,angle:e.angle,purchased:e.purchased}))}getHints(e){return this.activeOffers.map((t,i)=>{var n,r,a;return{mode:"shop_orbit",offer:t.offer,price:t.price,entry:{index:i,x:((n=e[i])==null?void 0:n.x)??0,y:((r=e[i])==null?void 0:r.y)??0,z:((a=e[i])==null?void 0:a.z)??0,gameplayRadius:.5,visualScale:.5,pathDistance:0,direction:"right",kind:"event",sizeTier:"tiny",shapeKind:"round",spinDirection:"cw",spinSpeed:0,motionPattern:"none",eventType:"shop",colorHint:"accent",gameplayOrbitPeriod:1,branchSlot:i,offerId:t.offer.item.id,onboarding:!1,isMilestone:!1,isGigantic:!1,coinSlots:[],enemySlot:null,motionSeed:0,visualStretch:{x:1,y:1,z:1}},previewNodes:[],pathNodes:[]}})}tryPurchase(e,t){if(!this.open)return null;for(const i of this.activeOffers){if(i.purchased)continue;if(nv(e,i.angle)<.22&&t>=i.price)return i.purchased=!0,this.close(),{offer:i.offer,price:i.price}}return null}update(e,t,i){if(!this.open){this.group.visible=!1;return}this.group.visible=!0,this.pool.forEach((n,r)=>{const a=this.activeOffers[r];if(!a||a.purchased){n.visible=!1;return}n.visible=!0,n.position.set(e.x+Math.cos(a.angle)*(t+1.6),e.y+Math.sin(a.angle)*(t+1.6),0),n.rotation.y=i*1.4+r*.35,n.scale.setScalar(1+Math.sin(i*3+r)*.06)})}close(){this.open=!1,this.group.visible=!1,this.pool.forEach(e=>{e.visible=!1})}getPriceForOffer(e,t){const i=e.item.rarity==="legendary"?11:e.item.rarity==="epic"?8:e.item.rarity==="rare"?5:e.item.rarity==="uncommon"?3:2;return Math.max(1,Math.round((i+e.stackCount)*(1-t)))}}function nv(s,e){return Math.abs(((s-e)%(Math.PI*2)+Math.PI*3)%(Math.PI*2)-Math.PI)}const sv="#F06A5A",Kl="/assets/images/Logo/logomodedark.svg",rv=new URL("/assets/BoatAirSheet-BBbXm59D.png",import.meta.url).href,av=new URL("/assets/BoatGlideSheet--cqNMxh_.png",import.meta.url).href,ov=new URL("/assets/StickmankeyAirSheet-B1O1ScrZ.png",import.meta.url).href,lv=new URL("/assets/StickmankeyGlideSheet-BXtNpTxc.png",import.meta.url).href,cv=new URL("/assets/BigCanonProjectile-U7xf784H.svg",import.meta.url).href,hv=new URL("data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'%20standalone='no'?%3e%3c!DOCTYPE%20svg%20PUBLIC%20'-//W3C//DTD%20SVG%201.1//EN'%20'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3csvg%20width='100%25'%20height='100%25'%20viewBox='0%200%20115%20115'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20xml:space='preserve'%20xmlns:serif='http://www.serif.com/'%20style='fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;'%3e%3cg%20transform='matrix(1,0,0,1,-6.589982,-6.589982)'%3e%3cg%20transform='matrix(1,0,0,1,-6.589982,-7.714609)'%3e%3cclipPath%20id='_clip1'%3e%3ccircle%20cx='70.59'%20cy='71.715'%20r='57.41'/%3e%3c/clipPath%3e%3cg%20clip-path='url(%23_clip1)'%3e%3cg%20transform='matrix(1,-0,-0,1,13.179964,14.304591)'%3e%3cuse%20xlink:href='%23_Image2'%20x='0'%20y='0'%20width='115px'%20height='115px'/%3e%3c/g%3e%3c/g%3e%3cclipPath%20id='_clip3'%3e%3ccircle%20cx='70.59'%20cy='71.715'%20r='57.41'/%3e%3c/clipPath%3e%3cg%20clip-path='url(%23_clip3)'%3e%3cg%20transform='matrix(0.950294,0,0,1,-8.168114,0)'%3e%3ccircle%20cx='70.59'%20cy='71.715'%20r='57.41'%20style='fill-opacity:0.23;'/%3e%3c/g%3e%3cg%20transform='matrix(1,0,0,0.684346,3.255579,37.541881)'%3e%3cpath%20d='M38.088,-20.09C33.425,-3.582%2029.639,22.437%2029.639,50.66C29.639,78.883%2033.425,104.902%2038.088,121.41C22.544,121.41%209.924,89.708%209.924,50.66C9.924,11.612%2022.544,-20.09%2038.088,-20.09Z'%20style='fill-opacity:0.23;'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cimage%20id='_Image2'%20width='115px'%20height='115px'%20xlink:href='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCABzAHMDAREAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAQACBAf/xAAqEAACAgICAQQABQUAAAAAAAAAAREhAjFBURIiYXGBA5HB4fBCUqGx0f/EABcBAQEBAQAAAAAAAAAAAAAAAAABAwT/xAAVEQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEQMRAD8A8YyyryayTU1/qTrYiPTLXiuVMyAaUv7JRhuXC+qFFtw3c2Bnv3ALXAA/cAAGBADAAICA7c7hpuJ3MzyUZhrFO/b+cAZfqfXFcEoG98rWhQNQ2lIBpRYBK3IA6YAwBgQBwAAQEB214wmoaivgow9OG0uYApnqHVUSjDThPfs3oUTh/IA9UgM1G55AnoAkAYEAAAEBAdri3D5drclBkoXS5vkDKqLcEoxt1MvoUVPKnQE/sDPDAHwAewAwIAegACAgOvzj0pW+X/KKJtrV/UAZltVF+xKC1c37Cgm/bcAE8dAGqoAYBwAPYEAcAAEBAdnpWPkpy7URBQacrHx24duQDxbTlrmWSjKduG7QoG6W/wBgCK4kA1YA6UAAAwIC4AyBAQHW3OKfqTf9r/IoZnBN75TAyu25f6EoxlTqI4FFqVzFgEqADigBgAAwIAegACAgO3Nryfim3NMoy0/GW3X+QCEpjT6JRlNMUGn6bAGBKJ5Aw+wJ+wAwIAAAICA7fJ+Mu50ijGTpKW50kBRtLrUkoKtSvjsUZbnFRyAPfAAtSAZLsAXyAMCAnoDIEBAdeWXDba0/nZROsXP0ugMxGVuY5bJQZQnSlCgymYutgW9wBjkCa6AGAAAEAAQEB1+M4qF6Z5KDOJhc8dAW/Ff1RVkoy201S6FGVuJWrAZr7Ay3ftAA1CAOQDICAGAAQEB2fiJNYvyqd/JQeSbeU7tAZxr3slA4bcL4FA4pfqANVIBYA/kA4AHsCAOAACAgOzKFT248pcFBpJy10mAZ2ueyUZlRyKB69/kAbq02BkCYAmAPaAgAAAgIDtaWKl6bmZ0UYUPFvaTqNfsBL0pVMU4JRlw5gUGVUwC+wCtgZYEAMCAmBkCAgOzKsaqii/ErDKKhKIAxnTaWk4/n5EoMbTmxQZKPtf8AQDFJoAav7AHx7gHQByBdAT0BlgTAAP/Z'/%3e%3c/defs%3e%3c/svg%3e",import.meta.url).href,uv=new URL("/assets/Magnetradius-BXcZC-7e.svg",import.meta.url).href,dv=new URL("/assets/Bigcanonradius-BUNOGBU-.svg",import.meta.url).href,fv=new URL("/assets/Grapradius-C9jmKwqe.svg",import.meta.url).href;function ai(s){const e=Math.PI*2;return(s%e+e)%e}function Zs(s,e){const t=Math.PI*2;return((s-e+Math.PI)%t+t)%t-Math.PI}class pv{constructor(e,t){y(this,"root",new Bt);y(this,"player",new Bt);y(this,"playerMainSprite");y(this,"playerBoostSprite");y(this,"stickMonkeyAirSprite");y(this,"stickMonkeyGlideSprite");y(this,"moduleSprites",{});y(this,"shardHudCanvas",document.createElement("canvas"));y(this,"shardHudTexture");y(this,"shardHudSprite");y(this,"magnetRangeIndicator");y(this,"bigCanonRangeIndicator");y(this,"grapRangeIndicator");y(this,"frontCanonLaser");y(this,"frontCanonProjectile");y(this,"bigCanonProjectile");y(this,"grapRope",new Ks(new gt,new lr({color:"#D4BF9B",transparent:!0,opacity:.85,depthWrite:!1,depthTest:!1})));y(this,"grapRopePoints",new Float32Array(6));y(this,"playerTrail",new Ks);y(this,"trailPoints",Array.from({length:8},()=>new T));y(this,"trailBuffer",new Float32Array(this.trailPoints.length*3));y(this,"path",new ev);y(this,"camera",new Ea);y(this,"stats",new tv);y(this,"coins");y(this,"enemies");y(this,"shop");y(this,"scoreListeners",new Set);y(this,"playerPosition",new T);y(this,"playerVelocity",new T);y(this,"playerVelocityTarget",new T);y(this,"scratchVector",new T);y(this,"scratchVectorB",new T);y(this,"scratchVector2",new Z);y(this,"impactWaves",new Map);y(this,"theme");y(this,"hudSnapshot",{state:"transition",score:0,highscore:0,distanceMeters:0,bestDistanceMeters:0,coins:0,splitTimes:{},chargeRatio:0,momentumGauge:0,momentumTier:0,orbitGraceActive:!1,orbitGraceProgress:1,offers:[],branchHints:[],inventoryItems:[],landingFeedback:null,acquisition:null,gameOverCause:null});y(this,"momentum",{gauge:0,fillRate:0,decayRate:.12,speedMultiplier:1,jumpMultiplier:1,cameraZoomMultiplier:0});y(this,"state","idle");y(this,"playerState","attached");y(this,"currentTime",0);y(this,"attachedIndex",0);y(this,"displayWindowIndices",[]);y(this,"displayNextIndex",0);y(this,"score",0);y(this,"orbitGraceActive",!1);y(this,"orbitGraceProgress",1);y(this,"orbitGraceTravel",0);y(this,"chargeActive",!1);y(this,"chargeMeter",0);y(this,"orbitAngle",Math.PI*.18);y(this,"orbitDirection",-1);y(this,"angularSpeed",0);y(this,"lastLandingDirection",0);y(this,"choiceMode","none");y(this,"activeChoices",[]);y(this,"activeShopAngles",[]);y(this,"acquisition",null);y(this,"landingFeedback",null);y(this,"acquisitionStartedAt",0);y(this,"acquisitionDuration",.9);y(this,"landingFeedbackStartedAt",0);y(this,"landingFeedbackDuration",1.35);y(this,"gameOverStartedAt",0);y(this,"gameOverCause",null);y(this,"jumpVisualUntil",0);y(this,"landingVisualUntil",0);y(this,"runUpgrades",Bl());y(this,"remainingExtraJumps",0);y(this,"phaseJumpReadyAt",0);y(this,"teleportReadyAt",0);y(this,"warpReadyAt",0);y(this,"shieldCharges",0);y(this,"souffleurActive",!1);y(this,"wrapperVisualUntil",0);y(this,"shieldHitUntil",0);y(this,"shieldRechargeFlashUntil",0);y(this,"moduleFlashUntil",{});y(this,"bigCanonFireUntil",0);y(this,"frontCanonFireUntil",0);y(this,"grapState","idle");y(this,"grapStateUntil",0);y(this,"grapTargetIndex",null);y(this,"grapPullUntil",0);y(this,"grapTargetPosition",new T);y(this,"eventCooldownUntil",0);y(this,"milestoneChoiceCache",new Map);y(this,"airborneFromMilestone",!1);y(this,"airborneStartedAt",0);this.theme=t,this.shardHudCanvas.width=256,this.shardHudCanvas.height=256,this.shardHudTexture=new Fc(this.shardHudCanvas),this.shardHudTexture.colorSpace=nt,this.shardHudSprite=new wg(new Ic({map:this.shardHudTexture,transparent:!0,depthWrite:!1,depthTest:!1})),this.shardHudSprite.visible=!1,this.shardHudSprite.renderOrder=18,this.playerMainSprite=new ti({textureUrl:rv,layout:{columns:2,rows:2},width:2.3,height:1.16,alphaTest:.08,offsetY:.18,renderOrder:15}),this.playerBoostSprite=new ti({textureUrl:av,layout:{columns:2,rows:2},width:2.4,height:1.2,alphaTest:.08,offsetY:.18,renderOrder:15}),this.stickMonkeyAirSprite=new ti({textureUrl:ov,layout:{columns:2,rows:2},width:2.3,height:1.16,alphaTest:.08,offsetY:.18,renderOrder:24}),this.stickMonkeyGlideSprite=new ti({textureUrl:lv,layout:{columns:2,rows:2},width:2.4,height:1.2,alphaTest:.08,offsetY:.18,renderOrder:24}),this.player.add(this.playerMainSprite.group,this.playerBoostSprite.group,this.stickMonkeyAirSprite.group,this.stickMonkeyGlideSprite.group),this.initializeModuleSprites(),this.player.visible=!1,this.root.add(this.player),this.root.add(this.shardHudSprite),this.magnetRangeIndicator=this.createRangeIndicator(uv,"#D4BF9B",.16),this.bigCanonRangeIndicator=this.createRangeIndicator(dv,"#D9624E",.2),this.grapRangeIndicator=this.createRangeIndicator(fv,"#4B74FF",.22),this.frontCanonLaser=new ft(new hi(1,.14),new Wt({color:"#D4BF9B",transparent:!0,opacity:.4,depthWrite:!1,depthTest:!1})),this.frontCanonLaser.visible=!1,this.frontCanonLaser.renderOrder=26,this.frontCanonProjectile=this.createBillboardPlane(hv,1.6,.28,28),this.bigCanonProjectile=this.createBillboardPlane(cv,1.9,.34,28),this.grapRope.geometry.setAttribute("position",new Et(this.grapRopePoints,3)),this.grapRope.visible=!1,this.grapRope.renderOrder=27,this.root.add(this.magnetRangeIndicator,this.bigCanonRangeIndicator,this.grapRangeIndicator,this.frontCanonLaser,this.frontCanonProjectile,this.bigCanonProjectile,this.grapRope);const i=new gt;i.setAttribute("position",new Et(this.trailBuffer,3)),this.playerTrail=new Ks(i,new lr({color:t==="dark"?"#D4BF9B":"#393F4A",transparent:!0,opacity:.42})),this.playerTrail.visible=!1,this.root.add(this.playerTrail),e.add(this.root),this.coins=new V0(e,t),this.enemies=new H0(e,t),this.shop=new iv(e,t)}get currentState(){return this.state}get currentScore(){return this.score}get bestScore(){return this.stats.getSnapshot().bestShards}initializeModuleSprites(){["plane","propulseur","reacteur_back","reacteur_front","shield","souffleur","wrapper","magnet","big_canon","front_canon","grappin","wings"].forEach(t=>{const i=jc(t,"common"),n=i==null?void 0:i.boatVisual;if(!n)return;const r=new ti({textureUrl:n.spriteSheetUrl,layout:{columns:n.columns,rows:n.rows},width:2.4,height:1.2,alphaTest:.08,offsetY:.18,renderOrder:n.layerOrder});r.setVisible(!1),this.moduleSprites[t]=r,this.player.add(r.group)})}createRangeIndicator(e,t,i){const n=new hr().load(e);n.colorSpace=nt;const r=new ft(new hi(1,1),new Wt({map:n,color:t,transparent:!0,opacity:i,side:Ot,depthWrite:!1,depthTest:!1}));return r.visible=!1,r.renderOrder=28,r}createBillboardPlane(e,t,i,n){const r=new hr().load(e);r.colorSpace=nt;const a=new ft(new hi(t,i),new Wt({map:r,transparent:!0,depthWrite:!1,depthTest:!1}));return a.visible=!1,a.renderOrder=n,a}setTheme(e){this.theme=e,this.playerTrail.material.color.set(e==="dark"?"#D4BF9B":"#393F4A"),this.coins.setTheme(e),this.enemies.setTheme(e),this.shop.setTheme(e);const t=e==="dark"?"#D4BF9B":"#393F4A";this.magnetRangeIndicator.material.color.set(t),this.grapRope.material.color.set(t),this.frontCanonLaser.material.color.set(t)}onScoreChange(e){return this.scoreListeners.add(e),()=>this.scoreListeners.delete(e)}startTransition(){this.resetRunState(),this.path.reset(),this.path.prebuild(180),this.camera.reset(this.getResolvedNode(0)),this.state="transition_in",this.root.visible=!0,this.player.visible=!1,this.playerTrail.visible=!1}beginRun(){const e=this.state==="transition_in";this.resetRunState(),e||(this.path.reset(),this.path.prebuild(180)),this.root.visible=!0,this.player.visible=!0,this.playerTrail.visible=!0,this.attachToNode(0,!1,null,null),this.camera.reset(this.getResolvedNode(0)),this.state="running_attached",this.emitScore()}restart(){this.beginRun()}prepareReturnTransition(){this.state="transition_out",this.chargeActive=!1,this.choiceMode="none",this.activeChoices=[],this.airborneFromMilestone=!1,this.airborneStartedAt=0,this.shop.reset(),this.coins.reset(),this.enemies.reset(),this.player.visible=!1,this.playerTrail.visible=!1}stop(){this.state="idle",this.airborneFromMilestone=!1,this.airborneStartedAt=0,this.root.visible=!1,this.player.visible=!1,this.playerTrail.visible=!1,this.shop.reset(),this.coins.reset(),this.enemies.reset(),this.camera.reset(this.getResolvedNode(0))}resetRunState(){this.stats.reset(performance.now()),this.score=0,this.chargeActive=!1,this.chargeMeter=0,this.choiceMode="none",this.activeChoices=[],this.activeShopAngles=[],this.acquisition=null,this.landingFeedback=null,this.acquisitionStartedAt=0,this.landingFeedbackStartedAt=0,this.gameOverStartedAt=0,this.gameOverCause=null,this.jumpVisualUntil=0,this.landingVisualUntil=0,this.currentTime=0,this.attachedIndex=0,this.displayWindowIndices=[],this.displayNextIndex=0,this.orbitGraceActive=!1,this.orbitGraceProgress=1,this.orbitGraceTravel=0,this.lastLandingDirection=0,this.playerState="attached",this.orbitAngle=Math.PI*.18,this.orbitDirection=-1,this.angularSpeed=0,this.playerPosition.set(0,0,0),this.playerVelocity.set(0,0,0),this.playerVelocityTarget.set(0,0,0),this.runUpgrades=Bl(),this.remainingExtraJumps=0,this.phaseJumpReadyAt=0,this.teleportReadyAt=0,this.warpReadyAt=0,this.shieldCharges=0,this.souffleurActive=!1,this.wrapperVisualUntil=0,this.shieldHitUntil=0,this.shieldRechargeFlashUntil=0,Object.keys(this.moduleFlashUntil).forEach(e=>{delete this.moduleFlashUntil[e]}),this.bigCanonFireUntil=0,this.frontCanonFireUntil=0,this.grapState="idle",this.grapStateUntil=0,this.grapTargetIndex=null,this.grapPullUntil=0,this.eventCooldownUntil=0,this.milestoneChoiceCache.clear(),this.airborneFromMilestone=!1,this.airborneStartedAt=0,this.momentum.gauge=0,this.momentum.fillRate=0,this.momentum.decayRate=.12,this.momentum.speedMultiplier=1,this.momentum.jumpMultiplier=1,this.momentum.cameraZoomMultiplier=0,this.impactWaves.clear(),this.playerTrail.geometry.setDrawRange(0,this.trailPoints.length),this.trailPoints.forEach(e=>e.set(0,0,0)),this.shardHudSprite.visible=!1,this.playerMainSprite.setScale(1),this.playerBoostSprite.setScale(1),this.stickMonkeyAirSprite.setScale(1),this.stickMonkeyGlideSprite.setScale(1),Object.values(this.moduleSprites).forEach(e=>{e==null||e.setScale(1),e==null||e.setVisible(!1)}),this.magnetRangeIndicator.visible=!1,this.bigCanonRangeIndicator.visible=!1,this.grapRangeIndicator.visible=!1,this.frontCanonLaser.visible=!1,this.frontCanonProjectile.visible=!1,this.bigCanonProjectile.visible=!1,this.grapRope.visible=!1,this.coins.reset(),this.enemies.reset(),this.shop.reset()}getInitialPlatformPositions(e){return this.path.prebuild(Math.max(160,e+60)),this.path.getInitialNodes(e).map(t=>new T(t.x,t.y,t.z))}getInitialPlatformScales(e){return this.path.prebuild(Math.max(160,e+60)),this.path.getInitialNodes(e).map(t=>t.visualScale)}getInitialPlatformVisuals(e){return this.path.prebuild(Math.max(160,e+60)),this.initializeDisplayWindow(e),this.getVisiblePlatformVisuals(e)}getVisiblePlatformPositions(e){return this.getDisplayNodes(e).map(t=>new T(t.resolvedX,t.resolvedY,t.resolvedZ))}getVisiblePlatformScales(e){return this.getDisplayNodes(e).map(t=>t.visualScale)}getVisiblePlatformVisuals(e){return this.getDisplayNodes(e).map(i=>{const n=i.index===this.attachedIndex&&this.playerState!=="airborne",r=ai(this.orbitAngle-(i.shapeKind==="round"?0:i.resolvedSpinPhase)),a=n&&this.orbitGraceActive?this.orbitGraceProgress:1,o=this.getVisualWaveState(i),l=Math.max(this.camera.getSafeLeft(),this.playerPosition.x-Mt*1.35),c=i.resolvedX+this.getPhysicalRadius(i),h=De(1-(c-l)/4.2,0,1),u=i.index<this.attachedIndex?De((this.playerPosition.x-(i.resolvedX+this.getPhysicalRadius(i)*.32))/Math.max(2.2,Mt*.92),0,1):0,d=Math.max(h,u),f=i.isMilestone?.003:i.shapeKind==="round"?.018:i.shapeKind==="oval"?.038:.048,g=i.isMilestone?.18:i.shapeKind==="round"?.52:i.shapeKind==="oval"?.68:.78,_=g+.42+this.momentum.gauge*.34,m=n?Ct.lerp(g,_,a):Math.max(g,(o==null?void 0:o.density)??g),p=i.isMilestone?.012+a*.02:f+.18+a*.12+this.momentum.gauge*.46,M=i.offerId?Di(i.offerId):null,v=i.eventType==="shop"||i.eventType==="gift"||i.eventType==="rare_item";return{scale:new T(i.visualScale*i.visualStretch.x,i.visualScale*i.visualStretch.y,i.visualScale*i.visualStretch.z),shapeKind:i.shapeKind,spinDirection:i.spinDirection,spinSpeed:i.spinSpeed,spinPhase:i.resolvedSpinPhase,tint:i.colorHint==="danger"?sv:i.eventType==="shop"||i.colorHint==="reward"||i.eventType==="gift"||i.eventType==="rare_item"?this.getThemeShardColor():null,ringTint:null,ringScale:0,stripeTint:null,stripeMix:0,stripePhase:0,pulse:i.isMilestone?.18:v?.48:i.colorHint==="reward"?.68:i.eventType!=="none"?.34:De(this.momentum.gauge*.22,0,.22),deformAngle:n?r:(o==null?void 0:o.angle)??0,deformStrength:n?p:Math.max(f,(o==null?void 0:o.strength)??0)+(i.isMilestone?0:d*.16),deformDensity:m,fragmentAmount:d,iconSrc:i.colorHint==="reward"&&M?M.hudIconSrc:null,iconText:v?"?":null,iconTint:v?this.getThemeContrastColor():null,iconScale:i.colorHint==="reward"&&M?.42:v?.56:.34}})}getRecommendedVisibleCount(){const e=this.state==="transition_in"?72:64,t=Math.round(this.momentum.cameraZoomMultiplier*18),i=this.choiceMode==="reward_branch"?12:this.choiceMode==="shop_orbit"?8:0,n=this.path.getNode(this.attachedIndex),r=this.path.getNode(this.attachedIndex+1),a=n!=null&&n.isGigantic||r!=null&&r.isGigantic?18:(n==null?void 0:n.eventType)!=="none"||(r==null?void 0:r.eventType)!=="none"?10:0;return Math.max(56,Math.min(124,e+t+i+a))}setChargeActive(e){if(this.state==="idle"||this.state==="transition_in"||this.state==="transition_out"||this.state==="game_over")return!1;if(e)return this.chargeActive=!0,this.playerState==="attached"&&(this.playerState="charging",this.state==="running_attached"&&(this.state="running_charging")),!1;const t=this.chargeActive&&(this.playerState==="charging"||this.playerState==="attached")&&(this.state==="running_charging"||this.state==="running_attached"||this.state==="upgrade_branching");return this.chargeActive=!1,t?this.launch():!1}triggerJump(){return this.state==="idle"||this.state==="transition_in"||this.state==="transition_out"||this.state==="game_over"?!1:this.playerState==="attached"||this.playerState==="charging"?(this.chargeActive=!1,this.launch()):this.performAirAction()}selectUpgradeFallback(e){if(this.state!=="upgrade_branching")return!1;if(this.choiceMode==="shop_orbit"){const t=this.activeChoices[e];return!t||t.price===void 0||!this.stats.spendCoins(t.price)?!1:(this.applyOffer(t.offer,"Shop item"),this.shop.reset(),this.choiceMode="none",this.activeChoices=[],this.activeShopAngles=[],this.state="upgrade_acquired",this.eventCooldownUntil=this.currentTime+.6,!0)}return this.choiceMode!=="reward_branch"?!1:this.commitRewardBranch(e,!0)}closeShopChoice(){return this.choiceMode!=="shop_orbit"||this.state!=="upgrade_branching"?!1:(this.shop.reset(),this.choiceMode="none",this.activeChoices=[],this.activeShopAngles=[],this.state=this.playerState==="airborne"?"running_airborne":this.chargeActive?"running_charging":"running_attached",this.eventCooldownUntil=this.currentTime+.18,!0)}getCameraPose(){return this.camera.getPose()}getHudState(){const e=De(this.momentum.gauge/Math.max(1,this.runUpgrades.modifiers.momentumCap),0,1);return this.stats.fillHud(this.hudSnapshot),this.hudSnapshot.state=this.getHudStateValue(),this.hudSnapshot.chargeRatio=De(this.chargeMeter,0,1),this.hudSnapshot.momentumGauge=e,this.hudSnapshot.momentumTier=Math.min(4,Math.floor(e*5)),this.hudSnapshot.orbitGraceActive=this.orbitGraceActive,this.hudSnapshot.orbitGraceProgress=this.orbitGraceProgress,this.hudSnapshot.offers=this.activeChoices.map(t=>t.offer),this.hudSnapshot.branchHints=this.getBranchHints(),this.hudSnapshot.inventoryItems=this.runUpgrades.ownedOrder.map(t=>{const i=Di(t),n=i!=null&&i.slot?this.runUpgrades.moduleRuntime[i.slot]:null,r=i!=null&&i.slot?this.getModuleCooldownDuration(i.slot):0,a=i?bn(i):null,o=n&&r>0?Math.min(1,n.cooldownRemaining/r):n&&a&&n.regenDelayRemaining>0?Math.min(1,n.regenDelayRemaining/Math.max(.001,n.gaugeCurrent<=1e-4?a.emptyDelay:a.regenDelay)):0;return{id:t,name:(i==null?void 0:i.name.en)??t,description:(i==null?void 0:i.description.en)??t,count:this.runUpgrades.counts[t]??1,iconSrc:(i==null?void 0:i.hudIconSrc)??Kl,rarity:(i==null?void 0:i.rarity)??"common",rarityIconSrc:(i==null?void 0:i.rarityIconSrc)??Kl,kind:(i==null?void 0:i.kind)??"passive",cooldownRatio:o,chargeCurrent:(n==null?void 0:n.chargesCurrent)??0,chargeMax:(n==null?void 0:n.chargesMax)??0,resourceRatio:n&&n.gaugeMax>0?n.gaugeCurrent/n.gaugeMax:0,slot:(i==null?void 0:i.slot)??null}}),this.hudSnapshot.landingFeedback=this.landingFeedback,this.hudSnapshot.acquisition=this.acquisition,this.hudSnapshot.gameOverCause=this.gameOverCause,this.hudSnapshot}getEquippedItem(e){const t=this.runUpgrades.modules[e];return t?Di(t):null}getModuleRuntime(e){return this.runUpgrades.moduleRuntime[e]??null}getModuleCooldownDuration(e){switch(e){case"shield":return Math.max(4,14*(1-this.runUpgrades.modifiers.shieldCooldownFactor));case"wrapper":return 18;case"grappin":return Math.max(8,this.runUpgrades.modifiers.grapCooldown||this.getModuleStat("grappin","grapCooldown")||30);case"big_canon":return Math.max(1.4,this.runUpgrades.modifiers.bigCanonCooldown||this.getModuleStat("big_canon","bigCanonCooldown")||4.5);case"front_canon":return Math.max(1,this.runUpgrades.modifiers.frontCanonCooldown||this.getModuleStat("front_canon","frontCanonCooldown")||2.4);default:return 0}}ensureModuleRuntime(e){var r,a;const t=this.getEquippedItem(e);if(!t||!t.slot)return null;const i=this.runUpgrades.moduleRuntime[e];if(i&&i.itemId===t.id)return i;const n={itemId:t.id,cooldownRemaining:0,chargesCurrent:Qs(t),chargesMax:Qs(t),gaugeCurrent:((r=bn(t))==null?void 0:r.capacity)??0,gaugeMax:((a=bn(t))==null?void 0:a.capacity)??0,regenDelayRemaining:0};return this.runUpgrades.moduleRuntime[e]=n,n}getModuleStat(e,t){var r;const i=this.getEquippedItem(e);if(!i)return 0;const n=(r=i.statsByRarity[i.rarity])==null?void 0:r[t];return typeof n=="number"?n:0}resetJumpModuleCharges(){["wings","propulseur","reacteur_front","reacteur_back"].forEach(e=>{const t=this.getEquippedItem(e),i=this.ensureModuleRuntime(e);if(!t||!i)return;const n=Qs(t);i.chargesMax=n,i.chargesCurrent=n})}consumeModuleGauge(e,t,i){const n=this.getEquippedItem(e),r=this.ensureModuleRuntime(e),a=n?bn(n):null;if(!n||!r||!a||r.gaugeMax<=0||r.gaugeCurrent<=0)return!1;const o=Math.min(r.gaugeCurrent,i*t);return r.gaugeCurrent=Math.max(0,r.gaugeCurrent-o),r.regenDelayRemaining=r.gaugeCurrent<=1e-4?a.emptyDelay:a.regenDelay,o>0}tickModuleRuntime(e){this.souffleurActive=!1,Object.keys(this.runUpgrades.modules).forEach(i=>{const n=this.getEquippedItem(i),r=this.ensureModuleRuntime(i);if(!n||!r)return;const a=r.cooldownRemaining;if(r.cooldownRemaining=Math.max(0,r.cooldownRemaining-e),i==="shield"&&a>0&&r.cooldownRemaining<=0&&(this.shieldRechargeFlashUntil=this.currentTime+.3),r.gaugeMax>0)if(r.regenDelayRemaining>0)r.regenDelayRemaining=Math.max(0,r.regenDelayRemaining-e);else{const o=bn(n);o&&(r.gaugeCurrent=Math.min(r.gaugeMax,r.gaugeCurrent+o.regenPerSecond*e))}});const t=this.ensureModuleRuntime("shield");this.shieldCharges=t&&t.cooldownRemaining<=0?1:0}hasModuleCharges(e){const t=this.ensureModuleRuntime(e);return!!(t&&t.chargesCurrent>0)}spendModuleCharge(e){const t=this.ensureModuleRuntime(e);return!t||t.chargesCurrent<=0?!1:(t.chargesCurrent-=1,t.chargesCurrent=Math.max(0,t.chargesCurrent),!0)}triggerModuleFlash(e,t=.24){this.moduleFlashUntil[e]=this.currentTime+t}update(e,t){if(this.state==="idle")return;if(this.currentTime=t,this.state==="transition_in"||this.state==="transition_out"){this.tickModuleRuntime(e),this.updateMomentum(e);return}this.path.ensureAhead(this.attachedIndex),this.tickModuleRuntime(e),this.updateMomentum(e),this.prewarmUpcomingMilestones();let i=this.getResolvedNode(this.attachedIndex),n=this.getResolvedNode(this.attachedIndex+1);if(this.state==="game_over"){this.updateCamera(e,i,n),this.updateTrail(e),this.syncPlayerVisual(t),this.syncShardHud(i),this.syncMarkers(t);return}const r=this.attachedIndex;if(this.playerState==="airborne"?this.updateAirborne(e):this.updateAttached(e,i),(this.attachedIndex!==r||this.playerState!=="airborne")&&(i=this.getResolvedNode(this.attachedIndex),n=this.getResolvedNode(this.attachedIndex+1)),this.advanceDisplayAnchor(),this.updateEvents(e,t,i),this.updateCamera(e,i,n),this.updateTrail(e),this.syncPlayerVisual(t),this.syncShardHud(i),this.syncMarkers(t),!(i.isMilestone&&this.playerState!=="airborne")){if(this.isOutsidePlayableField(this.playerPosition)?this.failRun("out_of_bounds"):this.camera.isBehindSafeLine(this.playerPosition)&&this.failRun("camera"),this.acquisition){const a=De((t-this.acquisitionStartedAt)/this.acquisitionDuration,0,1);this.acquisition.progress=a,a>=1&&(this.acquisition=null)}if(this.landingFeedback){const a=De((t-this.landingFeedbackStartedAt)/this.landingFeedbackDuration,0,1);this.landingFeedback.progress=a,a>=1&&(this.landingFeedback=null)}}}getHudStateValue(){return this.state==="game_over"?"game_over":this.state==="transition_in"||this.state==="transition_out"?"transition":this.state==="upgrade_branching"?"upgrade_choice":"running"}emitScore(){this.scoreListeners.forEach(e=>e())}getResolvedNode(e){return this.path.getResolvedNode(Math.max(0,e),this.currentTime,this.attachedIndex)}getDisplayNodes(e){if(this.choiceMode==="reward_branch"&&this.activeChoices.length>0){this.initializeDisplayWindow(e);const t=this.getResolvedNode(this.attachedIndex),i=this.activeChoices.map(h=>ur(h.entry,this.currentTime,this.attachedIndex)),n=t.resolvedX-Mt*3,r=Math.max(...i.map(h=>h.resolvedX),t.resolvedX)+Mt,a=this.displayWindowIndices.map(h=>this.getResolvedNode(h)).filter(h=>h.index===t.index||h.resolvedX<n||h.resolvedX>r);a.push(t,...i),a.sort((h,u)=>h.resolvedX-u.resolvedX);const o=[],l=new Set;a.forEach(h=>{const u=`${h.index}:${Math.round(h.resolvedX*100)}:${Math.round(h.resolvedY*100)}`;l.has(u)||(l.add(u),o.push(h))});const c=o[o.length-1]??t;for(;o.length<e;)o.push({...c,resolvedX:c.resolvedX+320+o.length*6,resolvedY:c.resolvedY+180,resolvedZ:c.resolvedZ,visualScale:1e-4,gameplayRadius:1e-4,shapeKind:"round",colorHint:"none",eventType:"none",isMilestone:!1,isGigantic:!1,coinSlots:[],enemySlot:null,resolvedSpinPhase:0,spinSpeed:0,visualStretch:{x:1,y:1,z:1}});return o.slice(0,e)}return this.initializeDisplayWindow(e),this.displayWindowIndices.slice(0,e).map(t=>this.getResolvedNode(t))}advanceDisplayAnchor(){if(this.displayWindowIndices.length!==0&&!(this.airborneFromMilestone&&this.playerState==="airborne"))for(let e=0;e<this.displayWindowIndices.length;e+=1){const t=this.displayWindowIndices[e],i=this.getResolvedNode(t);if(!(i.resolvedX+this.getPhysicalRadius(i)+5.5<this.camera.getSafeLeft()))continue;this.path.ensureAhead(this.displayNextIndex+1);const r=this.getResolvedNode(this.displayNextIndex);r.resolvedX-this.getPhysicalRadius(r)>this.camera.getSafeRight()+2.8&&(this.displayWindowIndices[e]=this.displayNextIndex,this.displayNextIndex+=1)}}initializeDisplayWindow(e){if(this.displayWindowIndices.length===0){this.path.ensureAhead(e+1),this.displayWindowIndices=Array.from({length:e},(t,i)=>i),this.displayNextIndex=e;return}if(this.displayWindowIndices.length<e)for(this.path.ensureAhead(e+1);this.displayWindowIndices.length<e;)this.displayWindowIndices.push(this.displayNextIndex),this.displayNextIndex+=1}updateMomentum(e){const t=1-Math.min(.72,this.runUpgrades.modifiers.momentumRetention),i=this.momentum.decayRate*t,n=this.playerState==="airborne"&&this.airborneStartedAt>0&&this.currentTime-this.airborneStartedAt<3;!(this.orbitGraceActive&&this.playerState!=="airborne")&&!n&&(this.momentum.gauge=De(this.momentum.gauge-i*e,0,1));const r=1+this.momentum.gauge*.6+this.runUpgrades.modifiers.speedBonus,a=1+this.momentum.gauge*.48+this.runUpgrades.modifiers.chargedLeapBonus*.12,o=this.momentum.gauge*1.4;this.momentum.speedMultiplier=Me(this.momentum.speedMultiplier,r,2.4,e),this.momentum.jumpMultiplier=Me(this.momentum.jumpMultiplier,a,2.6,e),this.momentum.cameraZoomMultiplier=Me(this.momentum.cameraZoomMultiplier,o,2.2,e),this.momentum.fillRate=Me(this.momentum.fillRate,0,4.6,e)}updateAttached(e,t){const i=this.getOrbitSample(t,this.orbitAngle),n=Math.max(1,i.position.length()),r=Math.PI*2/Math.max(1.6,t.gameplayOrbitPeriod),a=this.chargeActive?.55+this.chargeMeter*.45:0,o=r*(1+a+this.momentum.gauge*.42)*this.momentum.speedMultiplier*(1+this.runUpgrades.modifiers.chargeRate*.06+this.runUpgrades.modifiers.speedBonus*.3),l=t.isGigantic?.58:1;this.angularSpeed=Me(this.angularSpeed,o*l,this.chargeActive?2.6:1.7,e),this.orbitAngle=ai(this.orbitAngle+this.orbitDirection*this.angularSpeed*e);const c=this.getOrbitSample(t,this.orbitAngle);if(this.playerPosition.copy(this.getPlayerOrbitWorldPosition(t,this.orbitAngle,c)),this.playerVelocity.set(c.tangent.x*n*this.angularSpeed*this.orbitDirection,c.tangent.y*n*this.angularSpeed*this.orbitDirection,0),this.orbitGraceActive&&(this.orbitGraceTravel+=Math.abs(this.angularSpeed*e),this.orbitGraceProgress=De(this.orbitGraceTravel/(Math.PI*2),0,1),this.orbitGraceProgress>=1&&(this.orbitGraceActive=!1)),this.chargeActive){const h=.55+this.runUpgrades.modifiers.chargeRate*.24;this.chargeMeter=De(this.chargeMeter+e*h,0,1),this.state==="running_attached"&&(this.state="running_charging"),this.playerState==="attached"&&(this.playerState="charging")}else this.chargeMeter=Me(this.chargeMeter,0,4.2,e),this.playerState==="charging"&&(this.playerState="attached"),this.state==="running_charging"&&(this.state="running_attached");if(this.collectCoinsOnCurrentNode(t),this.resolveEnemyContact(t),this.choiceMode==="shop_orbit"&&this.shop.isOpen()){const h=this.shop.tryPurchase(this.orbitAngle,this.stats.getSnapshot().coins);h&&this.stats.spendCoins(h.price)&&(this.applyOffer(h.offer,"Shop item"),this.shop.reset(),this.choiceMode="none",this.activeChoices=[],this.activeShopAngles=[],this.state="upgrade_acquired",this.eventCooldownUntil=this.currentTime+.6)}}updateAirborne(e){const t=this.scratchVector.set(this.playerPosition.x,this.playerPosition.y,this.playerPosition.z),i=De(1-this.runUpgrades.modifiers.planeGlide*.92,.12,1);this.playerVelocity.y-=6.8*i*e,this.playerVelocity.x+=(this.runUpgrades.modifiers.airControl+this.runUpgrades.modifiers.planeStability*.7)*e*.52;const n=this.chargeActive&&!!this.getEquippedItem("souffleur")&&this.consumeModuleGauge("souffleur",e,.42);if(this.souffleurActive=n,n){const o=this.scratchVectorB.set(this.playerVelocity.x||.001,this.playerVelocity.y||.001,0).normalize();this.playerVelocity.addScaledVector(o,(.9+this.runUpgrades.modifiers.souffleurBoost)*e),this.triggerModuleFlash("souffleur",.12)}if(this.grapTargetIndex===null&&this.tryActivateGrappin(),this.tryActivateWrapper(!0),this.grapTargetIndex!==null){const o=this.getResolvedNode(this.grapTargetIndex);this.grapTargetPosition.set(o.resolvedX,o.resolvedY,o.resolvedZ);const l=this.scratchVectorB.copy(this.grapTargetPosition).sub(this.playerPosition),c=Math.max(.001,l.length());l.normalize(),this.playerVelocity.addScaledVector(l,Math.min(9.2,4.8+c*.18)*e),this.currentTime>=this.grapStateUntil&&this.grapState==="launch"&&(this.grapState="hooked"),this.currentTime>=this.grapPullUntil&&(this.grapTargetIndex=null,this.grapState="idle")}if(this.playerPosition.addScaledVector(this.playerVelocity,e),this.choiceMode==="reward_branch"&&this.activeChoices.length>0)for(let o=0;o<this.activeChoices.length;o+=1){const l=this.activeChoices[o];if(!l)continue;const c=ur(l.entry,this.currentTime,this.attachedIndex);if(this.canCaptureNode(c,t)){this.commitRewardBranch(o,!1),this.attachToNode(this.attachedIndex+1,!0,this.playerPosition,this.playerVelocity);return}}const r=this.attachedIndex+Math.max(24,this.displayWindowIndices.length+8);for(let o=this.attachedIndex+1;o<=r;o+=1){const l=this.getResolvedNode(o);if(l.resolvedX-t.x>64)break;if(l.isGigantic&&this.canCaptureNode(l,t)){this.grapTargetIndex===o&&(this.grapState="landing",this.grapStateUntil=this.currentTime+.18,this.grapTargetIndex=null),this.attachToNode(o,!0,this.playerPosition,this.playerVelocity);return}}for(let o=this.attachedIndex+1;o<=r;o+=1){const l=this.getResolvedNode(o);if(l.resolvedX-t.x>64)break;if(this.canCaptureNode(l,t)){this.grapTargetIndex===o&&(this.grapState="landing",this.grapStateUntil=this.currentTime+.18,this.grapTargetIndex=null),this.attachToNode(o,!0,this.playerPosition,this.playerVelocity);return}}if(this.runUpgrades.modifiers.phaseJump&&this.currentTime>=this.phaseJumpReadyAt){const o=this.attachedIndex+1,l=this.getResolvedNode(o),c=this.playerPosition.distanceToSquared(this.scratchVector.set(l.resolvedX,l.resolvedY,l.resolvedZ)),h=(l.gameplayRadius+this.runUpgrades.modifiers.phaseJumpRescueRadius)**2;if(c<h){this.phaseJumpReadyAt=this.currentTime+this.runUpgrades.modifiers.phaseJumpCooldown,this.attachToNode(o,!0,this.playerPosition,this.playerVelocity);return}}if(this.teleportReadyAt<=this.currentTime&&this.runUpgrades.modifiers.teleportRange>0){const o=this.path.getTeleportTarget(this.attachedIndex,this.runUpgrades.modifiers.teleportRange);o>this.attachedIndex+1&&this.playerPosition.x<this.camera.getSafeLeft()+2.4&&(this.teleportReadyAt=this.currentTime+this.runUpgrades.modifiers.teleportCooldown,this.attachToNode(o,!1,null,null))}if(this.warpReadyAt<=this.currentTime&&this.runUpgrades.modifiers.warpRange>0){const o=this.path.getTeleportTarget(this.attachedIndex,this.runUpgrades.modifiers.warpRange);o>this.attachedIndex+3&&this.playerPosition.x<this.camera.getSafeLeft()+1.6&&(this.warpReadyAt=this.currentTime+this.runUpgrades.modifiers.warpCooldown,this.attachToNode(o,!1,null,null))}if(!this.getResolvedNode(this.attachedIndex).isMilestone){if(this.isOutsidePlayableField(this.playerPosition)){this.failRun("out_of_bounds");return}if(this.camera.isBehindSafeLine(this.playerPosition)){this.failRun("camera");return}this.resolveAirborneEnemyContact()}}launch(){if(this.playerState!=="attached"&&this.playerState!=="charging")return!1;const e=this.getResolvedNode(this.attachedIndex),t=this.getOrbitSample(e,this.orbitAngle),i=this.scratchVector.set(t.tangent.x*this.orbitDirection,t.tangent.y*this.orbitDirection,0).normalize(),n=this.scratchVectorB.set(t.position.x,t.position.y,0).normalize(),a=(Math.max(1,t.position.length())*this.angularSpeed*.92+5.2+this.chargeMeter*8.5*(1+this.runUpgrades.modifiers.chargedLeapBonus))*this.momentum.jumpMultiplier*this.runUpgrades.modifiers.jumpPower*(1+this.runUpgrades.modifiers.speedBonus*.35);return this.registerImpactWave(e,this.orbitAngle,a*.92),this.playerVelocity.copy(i.multiplyScalar(a)).addScaledVector(n,a*.08),this.playerState="airborne",this.state=this.choiceMode==="reward_branch"?"upgrade_branching":"running_airborne",this.jumpVisualUntil=this.currentTime+.14,this.remainingExtraJumps=Math.max(0,this.runUpgrades.modifiers.extraJumps),this.chargeMeter=0,this.airborneStartedAt=this.currentTime,this.airborneFromMilestone=e.isGigantic,!0}performAirAction(){if(this.playerState!=="airborne")return!1;const e=this.scratchVector.set(Math.cos(this.player.rotation.z||0),Math.sin(this.player.rotation.z||0),0).normalize();let t=!1;const i=this.scratchVectorB.set(0,0,0);let n=0;if(this.hasModuleCharges("propulseur")){this.spendModuleCharge("propulseur");const r=Math.max(3.6,this.getModuleStat("propulseur","propulsionPower"));i.addScaledVector(e,.9+r*.32),i.y+=.06+r*.05,n+=r*1.18,this.triggerModuleFlash("propulseur",.42),t=!0}if(this.hasModuleCharges("wings")){this.spendModuleCharge("wings");const r=Math.max(3.2,this.getModuleStat("wings","propulsionPower"));i.addScaledVector(e,.5+r*.18),i.y+=.78+r*.24,n+=r,this.triggerModuleFlash("wings",.82),t=!0}if(this.hasModuleCharges("reacteur_front")){this.spendModuleCharge("reacteur_front");const r=Math.max(2.6,this.getModuleStat("reacteur_front","propulsionPower"));i.y+=.56+r*.26,n+=r,this.triggerModuleFlash("reacteur_front",.4),t=!0}if(this.hasModuleCharges("reacteur_back")){this.spendModuleCharge("reacteur_back");const r=Math.max(2.8,this.getModuleStat("reacteur_back","propulsionPower"));i.addScaledVector(e,.4+r*.2),i.y+=.32+r*.16,n+=r,this.triggerModuleFlash("reacteur_back",.4),t=!0}if(t){const r=3.2+n*.56+this.momentum.gauge*2.2;return this.playerVelocity.addScaledVector(i.normalize(),r+i.length()*.9),!0}if(this.tryActivateGrappin()||this.tryActivateWrapper(!1))return!0;if(this.runUpgrades.modifiers.infiniteFlaps||this.remainingExtraJumps>0){this.runUpgrades.modifiers.infiniteFlaps||(this.remainingExtraJumps-=1);const r=4.2+this.runUpgrades.modifiers.jumpPower*1.6;return this.playerVelocity.y=Math.max(this.playerVelocity.y,0)+r,this.playerVelocity.x+=.9+this.momentum.gauge*1.6,!0}return!1}tryActivateGrappin(){if(!this.getEquippedItem("grappin")||this.grapTargetIndex!==null)return!1;const e=Math.max(4.6,this.runUpgrades.modifiers.grapRange),t=this.ensureModuleRuntime("grappin");if(!t||t.cooldownRemaining>0)return!1;const i=2.8;for(let n=this.attachedIndex+1;n<=this.attachedIndex+Math.ceil(e*2.8);n+=1){const r=this.getResolvedNode(n),a=this.playerPosition.distanceTo(this.scratchVectorB.set(r.resolvedX,r.resolvedY,r.resolvedZ));if(!(a<i)&&a<=e+r.gameplayRadius)return t.cooldownRemaining=Math.max(8,this.runUpgrades.modifiers.grapCooldown||30),this.grapTargetIndex=n,this.grapState="launch",this.grapStateUntil=this.currentTime+.22,this.grapPullUntil=this.currentTime+1.65,this.triggerModuleFlash("grappin",.5),!0}return!1}tryActivateWrapper(e){if(!this.getEquippedItem("wrapper")||e&&this.playerPosition.x>=this.camera.getSafeLeft()+2.6&&Math.abs(this.playerPosition.y)<26)return!1;const t=Math.max(10,this.runUpgrades.modifiers.wrapperDistance),i=this.ensureModuleRuntime("wrapper");if(!i||i.cooldownRemaining>0)return!1;const n=this.path.getTeleportTarget(this.attachedIndex,Math.round(t));return n<=this.attachedIndex+1?!1:(i.cooldownRemaining=18,this.wrapperVisualUntil=this.currentTime+.18,this.attachToNode(n,!1,null,null),!0)}attachToNode(e,t,i,n){const r=this.getResolvedNode(e);this.attachedIndex=e,this.score=Math.max(this.score,e),this.stats.recordLanding(e,r.pathDistance,performance.now()),this.emitScore();let a=this.orbitAngle,o=e===0?-1:this.orbitDirection,l=Math.PI*2/Math.max(1.4,r.gameplayOrbitPeriod);if(t&&i&&n){const h=this.findBestOrbitAttachment(r,i);a=h.angle;const u=h.tangent.dot(this.scratchVector2.set(n.x,n.y));o=u>=0?1:-1;const d=Math.abs(u),f=Math.max(1.2,h.position.length());l=De(d/f,Math.PI*2/Math.max(1.4,r.gameplayOrbitPeriod)*.72,Math.PI*2/Math.max(1.1,r.gameplayOrbitPeriod)*2.2),l=this.applyLandingJudgement(o,d,r,h,n,l),this.registerImpactWave(r,h.angle,n.length())}else a=e===0?Math.PI*.18:0,o=e===0?-1:this.orbitDirection;this.orbitAngle=a,this.orbitDirection=o,this.angularSpeed=l,this.orbitGraceActive=!0,this.orbitGraceProgress=0,this.orbitGraceTravel=0,this.playerState="attached",this.state="running_attached",this.airborneFromMilestone=!1,this.airborneStartedAt=0,this.landingVisualUntil=this.currentTime+.12,this.chargeActive=!1,this.chargeMeter=0,this.remainingExtraJumps=Math.max(0,this.runUpgrades.modifiers.extraJumps),this.resetJumpModuleCharges(),this.grapState!=="idle"&&(this.grapState="landing",this.grapStateUntil=this.currentTime+.18,this.grapTargetIndex=null);const c=this.getOrbitSample(r,this.orbitAngle);this.playerPosition.copy(this.getPlayerOrbitWorldPosition(r,this.orbitAngle,c)),this.playerVelocity.set(0,0,0),this.collectCoinsOnCurrentNode(r),this.resolveEnemyContact(r),this.choiceMode==="reward_branch"&&!r.isMilestone&&r.colorHint!=="reward"&&(this.choiceMode="none",this.activeChoices=[],this.activeShopAngles=[],this.state="running_attached"),this.currentTime>=this.eventCooldownUntil&&this.resolveNodeEvent(r)}applyLandingJudgement(e,t,i,n,r,a){const o=this.scratchVector2.set(r.x,r.y),l=Math.max(.001,o.length());o.divideScalar(l);const c=n.tangent.clone().multiplyScalar(e).normalize(),h=n.position.clone().normalize(),u=De(o.dot(c),-1,1),d=Math.abs(o.dot(h)),f=this.lastLandingDirection!==0&&e!==this.lastLandingDirection,g=this.runUpgrades.modifiers.gradeWindowBonus;let _="good";d>.92+g*.2||u<.08-g*.12?_="miss":u>.965&&d<.18?_="perfect":u>.62-g*.32&&d<.56+g*.28&&(_="super"),_==="miss"&&this.runUpgrades.modifiers.failSafe&&(_="good");let m=f?.14:.035;!f&&this.momentum.gauge>=.5?m=0:!f&&this.momentum.gauge+m>.5&&(m=Math.max(0,.5-this.momentum.gauge));let p=1;if(_==="miss"){const v=1-Math.min(.72,this.runUpgrades.modifiers.landingPenaltyReduction);m=-.03*v,p=1-.16*v}else _==="super"?(m+=f?.032:.012,p=f?1.34:1.1):_==="perfect"?(m+=f?.05:.018,p=f?1.48:1.16):f&&(p=1.24);const M=De(this.momentum.gauge+m*(1+this.runUpgrades.modifiers.momentumGain),0,Math.max(1,this.runUpgrades.modifiers.momentumCap));return this.momentum.fillRate=Math.max(0,M-this.momentum.gauge),this.momentum.gauge=M,this.lastLandingDirection=e,this.startLandingFeedback(_,f),a*p}startLandingFeedback(e,t){this.landingFeedbackStartedAt=this.currentTime,this.landingFeedback={grade:e,twist:t,progress:0,worldPosition:new T(this.playerPosition.x-1.45,this.playerPosition.y+.82,this.playerPosition.z)}}resolveNodeEvent(e){if(e.isMilestone){if(!this.milestoneChoiceCache.has(e.index)){const t=qn(e.index,this.runUpgrades);this.milestoneChoiceCache.set(e.index,this.path.createUpgradeBranches(e.index,t,this.score))}this.activeChoices=(this.milestoneChoiceCache.get(e.index)??[]).map(t=>({...t,previewNodes:t.previewNodes.map(i=>({...i,coinSlots:i.coinSlots.map(n=>({...n}))})),pathNodes:t.pathNodes.map(i=>({...i,coinSlots:i.coinSlots.map(n=>({...n}))}))})),this.choiceMode="reward_branch",this.state="upgrade_branching",this.eventCooldownUntil=this.currentTime+.2;return}switch(e.eventType){case"shop":{this.shop.openForRun(e.index,this.runUpgrades);const t=this.shop.getActiveOffers().slice(0,3);this.activeChoices=t.map(i=>({mode:"shop_orbit",offer:i.offer,price:i.price,entry:e,previewNodes:[],pathNodes:[]})),this.activeShopAngles=t.map(i=>i.angle),this.choiceMode="shop_orbit",this.state="upgrade_branching",this.eventCooldownUntil=this.currentTime+.2;break}case"gift":{const t=qn(e.index,this.runUpgrades)[0];t&&this.applyOffer(t,"Gift shard");break}case"rare_item":{const t=qn(Math.max(100,e.index),this.runUpgrades)[0];t&&this.applyOffer(t,"Rare item");break}}}commitRewardBranch(e,t){const i=this.activeChoices[e];return i?(this.path.replaceFuture(this.attachedIndex,i.pathNodes),this.path.ensureAhead(this.attachedIndex+1,50,40),this.path.queuePostMilestoneEvents(this.attachedIndex+1,this.attachedIndex+1),this.milestoneChoiceCache.delete(this.attachedIndex),this.applyOffer(i.offer,t?"Quick choice":"Path chosen"),this.choiceMode="none",this.activeChoices=[],this.activeShopAngles=[],this.state="upgrade_acquired",this.eventCooldownUntil=this.currentTime+.35,!0):!1}applyOffer(e,t){this.runUpgrades=F0(this.runUpgrades,e.item.id),this.remainingExtraJumps=Math.max(0,this.runUpgrades.modifiers.extraJumps),this.shieldCharges=Math.max(this.shieldCharges,this.runUpgrades.modifiers.shieldCharges),this.startAcquisition(e,t)}startAcquisition(e,t){this.acquisitionStartedAt=this.currentTime,this.acquisition={offer:e,progress:0,subtitle:t}}updateEvents(e,t,i){this.state==="upgrade_acquired"&&t>=this.eventCooldownUntil&&(this.state=this.playerState==="airborne"?"running_airborne":this.chargeActive?"running_charging":"running_attached"),this.updateAutoFire(t),this.shop.update(new T(i.resolvedX,i.resolvedY,i.resolvedZ),i.gameplayRadius+.7,t)}updateCamera(e,t,i){const n=this.airborneFromMilestone&&this.playerState==="airborne",r=n?i:t,a=n?this.getResolvedNode(this.attachedIndex+2):i,o=a.isGigantic?De(1-Math.max(0,a.resolvedX-this.playerPosition.x)/34,0,1):0,l=De((Math.max(r.visualScale,a.visualScale)-2.8)/28,0,1.24),c=n?De(1-Math.max(0,this.playerPosition.x-t.resolvedX)/24,0,1)*26:0,h=t.isGigantic&&this.playerState!=="airborne"?82:Math.max(c,o*38),u=this.choiceMode==="reward_branch"?9.6:this.choiceMode==="shop_orbit"?3.2:this.state==="upgrade_acquired"?2.4:0,d=this.momentum.speedMultiplier;this.camera.update({deltaTime:e,state:this.state,score:this.score,currentNode:r,nextNode:a,playerPosition:this.playerPosition,momentumGauge:De(this.momentum.gauge,0,1),largeShardFactor:l,milestoneZoom:h,choiceZoom:u,speedPressure:d*(1-this.runUpgrades.modifiers.timeSlowFactor*.55)})}updateTrail(e){for(let i=this.trailPoints.length-1;i>0;i-=1)this.trailPoints[i].copy(this.trailPoints[i-1]);this.trailPoints[0].copy(this.playerPosition),this.trailPoints.forEach((i,n)=>{this.trailBuffer[n*3]=i.x,this.trailBuffer[n*3+1]=i.y,this.trailBuffer[n*3+2]=i.z});const t=this.playerTrail.geometry.getAttribute("position");t.needsUpdate=!0,this.playerTrail.material.opacity=.24+this.momentum.gauge*.36}syncPlayerVisual(e){this.player.position.copy(this.playerPosition);const t=this.getResolvedNode(this.attachedIndex),i=this.getOrbitSample(t,this.orbitAngle),n=this.playerState==="airborne"?this.scratchVector2.set(this.playerVelocity.x||.001,this.playerVelocity.y||.001).normalize():i.tangent.clone().multiplyScalar(this.orbitDirection).normalize(),r=Math.atan2(n.y,n.x);this.player.rotation.z=r,this.player.scale.set(1,this.playerState==="airborne"?1:this.orbitDirection>0?-1:1,1),this.playerMainSprite.group.rotation.z=0,this.playerBoostSprite.group.rotation.z=0,this.playerMainSprite.group.position.set(0,0,0),this.playerBoostSprite.group.position.set(0,0,0);const a=this.resolvePlayerVisualState(),o=Math.max(this.playerVelocity.length(),Math.abs(this.angularSpeed)*Math.max(1,i.position.length())),l=1+this.momentum.gauge*.12+Math.sin(e*8)*.02,c=a==="attached_idle_orbit"||a==="attached_fast_orbit";if(this.state==="game_over"){const h=De((e-this.gameOverStartedAt)/.26,0,1),u=Math.max(.02,1-h*1.22);this.playerMainSprite.setVisible(!0),this.playerBoostSprite.setVisible(!1),this.stickMonkeyAirSprite.setVisible(!0),this.stickMonkeyGlideSprite.setVisible(!1),this.playerMainSprite.setScale(u),this.stickMonkeyAirSprite.setScale(u),this.playerMainSprite.setFrame(3),this.stickMonkeyAirSprite.setFrame(3),Object.values(this.moduleSprites).forEach(d=>d==null?void 0:d.setVisible(!1)),this.syncWorldModuleIndicators(r);return}this.playerMainSprite.setVisible(!c),this.playerBoostSprite.setVisible(c),this.stickMonkeyAirSprite.setVisible(!c),this.stickMonkeyGlideSprite.setVisible(c),this.playerMainSprite.setScale(l),this.playerBoostSprite.setScale(l),this.stickMonkeyAirSprite.setScale(l),this.stickMonkeyGlideSprite.setScale(l),c?(this.playerBoostSprite.playLoop([0,1,2,3],o<5.4?4.4:o<8.4?7.2:o<11.5?9.6:12.8,e),this.stickMonkeyGlideSprite.playLoop([0,1,2,3],o<5.4?4.2:o<8.4?6.6:o<11.5?8.8:11.2,e+.08)):a==="jump_start"?(this.playerMainSprite.setFrame(0),this.stickMonkeyAirSprite.setFrame(0)):a==="landing"?(this.playerMainSprite.setFrame(3),this.stickMonkeyAirSprite.setFrame(3)):(this.playerMainSprite.playLoop([1,2],5.6,e),this.stickMonkeyAirSprite.playLoop([1,2],5.2,e+.04)),this.syncModuleSprites(e,c),this.syncWorldModuleIndicators(r)}syncModuleSprites(e,t){Object.keys(this.moduleSprites).forEach(i=>{var a,o;const n=this.moduleSprites[i],r=this.getEquippedItem(i);if(!n||!r){n==null||n.setVisible(!1);return}if(n.setVisible(!0),n.setScale(1),i==="plane"){!t&&this.playerState==="airborne"&&(this.chargeActive||Math.abs(this.playerVelocity.y)>1.1)?n.playLoop([0,1,2,3],this.chargeActive?8.4:5.8,e):n.setFrame(0);return}if(i==="wings"){(this.moduleFlashUntil.wings??0)>this.currentTime?n.playLoop([0,1,2,3,4,5,6,7],10.8,e):n.setFrame(0);return}if(i==="propulseur"){(this.moduleFlashUntil.propulseur??0)>this.currentTime?n.playLoop([0,1,2,3],11.2,e):n.setFrame(0);return}if(i==="reacteur_front"||i==="reacteur_back"||i==="souffleur"||i==="big_canon"||i==="front_canon"){(this.moduleFlashUntil[i]??0)>this.currentTime||i==="souffleur"&&this.souffleurActive||i==="big_canon"&&this.bigCanonFireUntil>this.currentTime||i==="front_canon"&&this.frontCanonFireUntil>this.currentTime?n.playLoop([1,2,3],10.6,e):n.setFrame(0);return}if(i==="shield"){const l=this.getModuleRuntime("shield");this.shieldHitUntil>this.currentTime?n.setFrame(1):this.shieldRechargeFlashUntil>this.currentTime?n.setFrame(3):((l==null?void 0:l.cooldownRemaining)??0)>0?n.setFrame(2):n.setFrame(0);return}if(i==="wrapper"){if(this.wrapperVisualUntil>this.currentTime){const l=1-(this.wrapperVisualUntil-this.currentTime)/.18,c=l<.24?0:l<.46?1:l<.62?2:3;n.setFrame(c),n.mesh.renderOrder=c===2?96:((a=r.boatVisual)==null?void 0:a.layerOrder)??80}else n.mesh.renderOrder=((o=r.boatVisual)==null?void 0:o.layerOrder)??80,n.setFrame(0);return}if(i==="grappin"){this.grapState==="launch"?n.setFrame(1):this.grapState==="hooked"?n.setFrame(2):this.grapState==="landing"?n.setFrame(3):n.setFrame(0),this.grapState==="landing"&&this.currentTime>=this.grapStateUntil&&(this.grapState="idle");return}n.setFrame(0)})}syncWorldModuleIndicators(e){const t=!!this.getEquippedItem("magnet"),i=!!this.getEquippedItem("big_canon"),n=!!this.getEquippedItem("grappin"),r=!!this.getEquippedItem("front_canon");if(this.syncRangeIndicator(this.magnetRangeIndicator,t,Math.max(3.1,2.2+this.runUpgrades.modifiers.magnetRange*5.4),"#D4BF9B"),this.syncRangeIndicator(this.bigCanonRangeIndicator,i,Math.max(2.5,this.runUpgrades.modifiers.bigCanonRange*1.18),"#D9624E"),this.syncRangeIndicator(this.grapRangeIndicator,n,Math.max(2,this.runUpgrades.modifiers.grapRange*1.16),"#4B74FF"),this.magnetRangeIndicator.material.opacity=t?.2+this.momentum.gauge*.07:0,this.bigCanonRangeIndicator.material.opacity=i?.24+this.momentum.gauge*.08:0,this.grapRangeIndicator.material.opacity=n?this.grapState==="hooked"?.36:this.grapState==="launch"?.3:.22:0,this.frontCanonLaser.visible=r,r){const o=Math.max(1.8,this.runUpgrades.modifiers.frontCanonRange),l=Math.cos(e)*o*.5,c=Math.sin(e)*o*.5;this.frontCanonLaser.position.set(this.playerPosition.x+l,this.playerPosition.y+c,this.playerPosition.z+.01),this.frontCanonLaser.rotation.z=e,this.frontCanonLaser.scale.set(o*1.12,1.48,1),this.frontCanonLaser.material.opacity=.14+this.momentum.gauge*.08}this.frontCanonProjectile.visible=this.frontCanonFireUntil>this.currentTime,this.frontCanonProjectile.visible&&(this.frontCanonProjectile.position.set(this.playerPosition.x+Math.cos(e)*1.8,this.playerPosition.y+Math.sin(e)*1.8,this.playerPosition.z+.02),this.frontCanonProjectile.rotation.z=e),this.bigCanonProjectile.visible=this.bigCanonFireUntil>this.currentTime,this.bigCanonProjectile.visible&&(this.bigCanonProjectile.position.set(this.playerPosition.x,this.playerPosition.y+.28,this.playerPosition.z+.02),this.bigCanonProjectile.rotation.z=e);const a=this.grapTargetIndex!==null&&this.grapState!=="idle";if(this.grapRope.visible=a,a){this.grapRope.material.opacity=this.grapState==="launch"?.58:this.grapState==="hooked"?.92:.78;const o=this.getResolvedNode(this.grapTargetIndex);this.grapTargetPosition.set(o.resolvedX,o.resolvedY,o.resolvedZ),this.grapRopePoints[0]=this.playerPosition.x,this.grapRopePoints[1]=this.playerPosition.y,this.grapRopePoints[2]=this.playerPosition.z+.02,this.grapRopePoints[3]=this.grapTargetPosition.x,this.grapRopePoints[4]=this.grapTargetPosition.y,this.grapRopePoints[5]=this.grapTargetPosition.z+.02,this.grapRope.geometry.getAttribute("position").needsUpdate=!0}else this.grapRope.material.opacity=.85}syncRangeIndicator(e,t,i,n){if(e.visible=t,!t)return;e.material.color.set(n),e.position.set(this.playerPosition.x,this.playerPosition.y,this.playerPosition.z+.01);const r=i*2*(1+Math.sin(this.currentTime*2.2)*.015);e.scale.set(r,r,1)}syncShardHud(e){if(this.playerState==="airborne"||this.playerState==="dead"||this.state==="game_over"){this.shardHudSprite.visible=!1;return}const t=this.shardHudCanvas.getContext("2d");if(!t){this.shardHudSprite.visible=!1;return}const i=De(this.chargeMeter,0,1),n=this.orbitGraceActive?De(this.orbitGraceProgress,0,1):1,r=this.getPhysicalRadius(e),a=this.theme==="dark"?"212,191,155":"57,63,74",o=this.theme==="dark"?"57,63,74":"212,191,155";t.clearRect(0,0,256,256),t.save(),t.translate(128,128),t.strokeStyle=`rgba(${a},0.14)`,t.lineWidth=16,t.beginPath(),t.arc(0,0,84,-Math.PI/2,Math.PI*1.5),t.stroke(),t.strokeStyle=`rgba(${a},0.92)`,t.beginPath(),t.arc(0,0,84,-Math.PI/2,-Math.PI/2+Math.PI*2*i),t.stroke(),t.strokeStyle=`rgba(${o},0.18)`,t.lineWidth=12,t.beginPath(),t.arc(0,0,54,-Math.PI/2,Math.PI*1.5),t.stroke(),t.strokeStyle=`rgba(${a},0.96)`,t.beginPath(),t.arc(0,0,54,-Math.PI/2,-Math.PI/2+Math.PI*2*n),t.stroke(),t.restore(),this.shardHudTexture.needsUpdate=!0,this.shardHudSprite.visible=!0,this.shardHudSprite.position.set(e.resolvedX,e.resolvedY,e.resolvedZ+.04),this.shardHudSprite.scale.setScalar(Math.max(2.1,r*1.46))}resolvePlayerVisualState(){return this.playerState==="dead"||this.state==="game_over"?"death":this.currentTime<this.jumpVisualUntil?"jump_start":this.currentTime<this.landingVisualUntil?"landing":this.playerState==="airborne"?"airborne":this.playerVelocity.length()>6.6||this.angularSpeed>2.9?"attached_fast_orbit":"attached_idle_orbit"}syncMarkers(e){var r;const t=this.getDisplayNodes(Math.min(28,this.getRecommendedVisibleCount())),i=[],n=new Map;t.forEach(a=>{var o;if(a.coinSlots.forEach(l=>{if(l.collected)return;const c=this.getCoinWorldPosition(a,l.angle,l.orbitScale),h=Math.max(1.6,1.9+this.runUpgrades.modifiers.coinMagnet*5.6),u=c.distanceTo(this.playerPosition),d=De(1-u/h,0,1);i.push({id:`${a.index}:${Math.round(l.angle*1e3)}:${l.value}`,position:c,scale:.74+l.value*.08,visible:!0,attraction:d,targetPosition:d>0?this.playerPosition.clone():null})}),(o=a.enemySlot)!=null&&o.alive){const l=`${a.index}:${a.enemySlot.pole}`;n.set(l,{id:l,position:this.getEnemyWorldPosition(a,a.enemySlot.pole),visible:!0,tier:a.enemySlot.tier,pole:a.enemySlot.pole})}});for(let a=Math.max(0,this.attachedIndex-2);a<=this.attachedIndex+18;a+=1){const o=this.getResolvedNode(a);if(!((r=o.enemySlot)!=null&&r.alive))continue;const l=`${o.index}:${o.enemySlot.pole}`;n.set(l,{id:l,position:this.getEnemyWorldPosition(o,o.enemySlot.pole),visible:!0,tier:o.enemySlot.tier,pole:o.enemySlot.pole})}this.coins.setVisible(this.state!=="idle"&&this.state!=="transition_out"),this.enemies.setVisible(this.state!=="idle"&&this.state!=="transition_out"),this.coins.update(i,e),this.enemies.update(Array.from(n.values()),e)}fillMomentumBurst(e){this.momentum.gauge=De(this.momentum.gauge+e*(1+this.runUpgrades.modifiers.momentumGain),0,Math.max(1,this.runUpgrades.modifiers.momentumCap)),this.momentum.fillRate=Math.max(this.momentum.fillRate,e)}collectCoinsOnCurrentNode(e){e.coinSlots.forEach(t=>{t.collected||Math.abs(Zs(this.orbitAngle,t.angle))<.16+this.runUpgrades.modifiers.coinMagnet*.08&&(t.collected=!0,this.stats.addCoins(this.applyCoinBonus(t.value)))})}resolveEnemyContact(e){const t=e.enemySlot;if(!t||!t.alive||this.getEnemyWorldPosition(e,t.pole).distanceTo(this.playerPosition)>e.gameplayRadius*.36+.82)return;const n=this.playerVelocity.length();if(this.isEnemyHitFromBehind(t.pole)&&n>=t.speedThreshold||this.runUpgrades.modifiers.spikeOrbit){t.alive=!1,this.stats.addCoins(this.applyCoinBonus(t.rewardCoins)),this.fillMomentumBurst(.05);return}this.consumeProtectionOrFail()}resolveAirborneEnemyContact(){for(let e=this.attachedIndex+1;e<=this.attachedIndex+4;e+=1){const t=this.getResolvedNode(e),i=t.enemySlot;if(!i||!i.alive||this.getEnemyWorldPosition(t,i.pole).distanceTo(this.playerPosition)>1.2)continue;this.playerVelocity.length()>=i.speedThreshold*.75||this.runUpgrades.modifiers.spikeOrbit?(i.alive=!1,this.stats.addCoins(this.applyCoinBonus(i.rewardCoins)),this.fillMomentumBurst(.08)):this.consumeProtectionOrFail();return}}consumeProtectionOrFail(){const e=this.ensureModuleRuntime("shield");if(e&&e.cooldownRemaining<=0){const i=Math.max(4,14*(1-this.runUpgrades.modifiers.shieldCooldownFactor));e.cooldownRemaining=i,this.shieldCharges=0,this.shieldHitUntil=this.currentTime+.24,this.fillMomentumBurst(.04);return}this.failRun("enemy")}updateAutoFire(e){const t=!!this.getEquippedItem("big_canon"),i=!!this.getEquippedItem("front_canon");if(!t&&!i)return;if(t){const o=this.ensureModuleRuntime("big_canon");if(o&&o.cooldownRemaining<=0)for(let l=this.attachedIndex;l<this.attachedIndex+12;l+=1){const c=this.getResolvedNode(l),h=c.enemySlot;if(!(!h||!h.alive||h.tier==="invincible"||this.getEnemyWorldPosition(c,h.pole).distanceTo(this.playerPosition)>Math.max(2.2,this.runUpgrades.modifiers.bigCanonRange))){h.alive=!1,this.stats.addCoins(this.applyCoinBonus(h.rewardCoins)),this.fillMomentumBurst(.05),o.cooldownRemaining=Math.max(1.4,this.runUpgrades.modifiers.bigCanonCooldown||4.5),this.bigCanonFireUntil=e+.24,this.triggerModuleFlash("big_canon",.24);break}}}if(!i)return;const n=this.ensureModuleRuntime("front_canon");if(!n||n.cooldownRemaining>0)return;const r=this.scratchVector.set(Math.cos(this.player.rotation.z||0),Math.sin(this.player.rotation.z||0),0).normalize(),a=Math.max(2.2,this.runUpgrades.modifiers.frontCanonRange);for(let o=this.attachedIndex;o<this.attachedIndex+12;o+=1){const l=this.getResolvedNode(o),c=l.enemySlot;if(!c||!c.alive||c.tier==="invincible")continue;const h=this.getEnemyWorldPosition(l,c.pole),u=this.scratchVectorB.copy(h).sub(this.playerPosition),d=u.dot(r),f=Math.abs(u.x*-r.y+u.y*r.x);if(!(d<=0||d>a||f>.58)){c.alive=!1,this.stats.addCoins(this.applyCoinBonus(c.rewardCoins)),this.fillMomentumBurst(.04),n.cooldownRemaining=Math.max(1,this.runUpgrades.modifiers.frontCanonCooldown||2.4),this.frontCanonFireUntil=e+.18,this.triggerModuleFlash("front_canon",.22);return}}}applyCoinBonus(e){const t=this.runUpgrades.modifiers.doubleCoin?e*2:e;return Math.max(1,Math.round(t*(1+this.runUpgrades.modifiers.coinBonus)))}failRun(e="camera"){this.state!=="game_over"&&(this.state="game_over",this.playerState="dead",this.gameOverCause=e,this.chargeActive=!1,this.chargeMeter=0,this.choiceMode="none",this.activeChoices=[],this.playerVelocity.set(0,0,0),this.playerVelocityTarget.set(0,0,0),this.angularSpeed=0,this.airborneFromMilestone=!1,this.gameOverStartedAt=this.currentTime,this.playerTrail.visible=!1,this.shop.reset(),this.emitScore())}isOutsidePlayableField(e){return e.y<=-32||e.y>=32}canCaptureNode(e,t){const i=this.getPhysicalRadius(e)+(e.isGigantic?this.getOrbitClearance(e)+1.15:.92)+this.runUpgrades.modifiers.captureRadius,n=this.playerPosition.x-e.resolvedX,r=this.playerPosition.y-e.resolvedY,a=n*n+r*r<=i*i;if(a||!t)return a;const o=t.x-e.resolvedX,l=t.y-e.resolvedY,c=this.playerPosition.x-t.x,h=this.playerPosition.y-t.y,u=c*c+h*h;if(u<=1e-4)return!1;const d=De(-(o*c+l*h)/u,0,1),f=o+c*d,g=l+h*d;return f*f+g*g<=i*i}findBestOrbitAttachment(e,t){let i=0,n=Number.POSITIVE_INFINITY,r=new Z,a=new Z(1,0);for(let o=0;o<72;o+=1){const l=o/72*Math.PI*2,c=this.getOrbitSample(e,l),h=e.resolvedX+c.position.x,u=e.resolvedY+c.position.y,d=(t.x-h)**2+(t.y-u)**2;d<n&&(n=d,i=l,r=c.position.clone(),a=c.tangent.clone())}return{angle:i,position:r,tangent:a}}getOrbitSample(e,t){const i=ai(t),n=e.shapeKind==="round"?0:e.resolvedSpinPhase,r=this.getShapeExtents(e),a=this.getOrbitClearance(e),o=this.getPhysicalRadius(e)+a,l=ai(i-n);if(e.shapeKind==="oval"){const u=r.x+a,d=r.y+a,f=new Z(Math.cos(l)*u,Math.sin(l)*d),g=new Z(-Math.sin(l)*u,Math.cos(l)*d).normalize();return this.applySurfaceContour(e,l,this.rotateOrbitSample(f,g,n))}if(e.shapeKind==="triangular"){const u=r.y+a,d=r.x/Math.max(1e-4,r.y)*u,f=[new Z(0,u),new Z(-d,-u*.5),new Z(d,-u*.5)],g=this.sampleTriangleBoundary(f,l),_=g.position,m=g.tangent;return this.applySurfaceContour(e,l,this.rotateOrbitSample(_,m,n))}const c=new Z(Math.cos(i)*o,Math.sin(i)*o),h=new Z(-Math.sin(i),Math.cos(i));return this.applySurfaceContour(e,l,this.rotateOrbitSample(c,h,0))}getShapeExtents(e){const t=e.shapeKind==="triangular"?1.07384:e.shapeKind==="oval"?1.18:1.25,i=e.shapeKind==="triangular"?1.24:e.shapeKind==="oval"?1.18:1.25;return{x:t*e.visualScale*e.visualStretch.x*.92,y:i*e.visualScale*e.visualStretch.y*.92}}sampleTriangleBoundary(e,t){const i=new Z(Math.cos(t),Math.sin(t));let n=Number.POSITIVE_INFINITY,r=e[0].clone(),a=e[1].clone().sub(e[0]).normalize();for(let o=0;o<e.length;o+=1){const l=e[o],h=e[(o+1)%e.length].clone().sub(l),u=i.x*h.y-i.y*h.x;if(Math.abs(u)<1e-4)continue;const d=(l.x*h.y-l.y*h.x)/u,f=(l.x*i.y-l.y*i.x)/u;d<=0||f<0||f>1||d<n&&(n=d,r=i.clone().multiplyScalar(d),a=h.normalize())}return{position:r,tangent:a}}getPhysicalRadius(e){const t=this.getShapeExtents(e),i=Math.max(t.x,t.y);return e.isGigantic?Math.max(e.gameplayRadius,i*1.02):Math.max(e.gameplayRadius,i)}getOrbitClearance(e){const t=e.index===this.attachedIndex&&this.playerState!=="airborne"?De(this.playerVelocity.length()/16,0,.46):0,i=De((e.visualScale-3.2)*.085,0,.82);if(e.isGigantic)return De(.96+e.visualScale*.042+t*.4,.96,2.35);const n=e.visualScale<=1.15?.04:e.visualScale<=1.7?.08:e.visualScale<=2.4?.12:.16;return De(n+e.visualScale*.02+i*.46+t*.64,.04,1.08)}applySurfaceContour(e,t,i){const n=1+this.sampleSurfaceDeformation(e,t),r=i.position.clone().normalize();return{position:i.position.multiplyScalar(n),tangent:i.tangent.addScaledVector(r,.12*this.sampleSurfaceSlope(e,t)).normalize()}}sampleSurfaceDeformation(e,t){const i=De(e.index/280,0,1),n=De(1.08-e.visualScale*.035,.32,1),r=(.008+i*.03)*n,a=e.shapeKind==="triangular"?3:e.shapeKind==="oval"?2:4;return Math.sin(t*a+e.motionSeed*6.2)*r+Math.sin(t*(a+3)-e.motionSeed*4.1)*r*.42+this.sampleImpactWaveOffset(e,t)+this.sampleBoatWaveOffset(e,t)*n}sampleSurfaceSlope(e,t){return(this.sampleSurfaceDeformation(e,ai(t+.06))-this.sampleSurfaceDeformation(e,ai(t-.06)))/(.06*2)}sampleImpactWaveOffset(e,t){const i=this.impactWaves.get(e.index);if(!i||i.length===0)return 0;let n=0;const r=[];return i.forEach(a=>{const o=this.currentTime-a.createdAt;if(o>=a.decay)return;const l=1-o/a.decay,c=Zs(t,a.originAngle),h=Math.exp(-(c*c)/Math.max(.08,a.radius*a.radius));n+=a.strength*h*l,r.push(a)}),r.length>0?this.impactWaves.set(e.index,r):this.impactWaves.delete(e.index),n}sampleBoatWaveOffset(e,t){if(e.index!==this.attachedIndex||this.playerState==="airborne")return 0;const i=e.shapeKind==="round"?0:e.resolvedSpinPhase,n=ai(this.orbitAngle-i),r=ai(n-this.orbitDirection*.28),a=Zs(t,n),o=Zs(t,r),l=this.orbitGraceActive?De(this.orbitGraceProgress,.15,1):1,c=Math.exp(-(a*a)/.2)*(.05+this.momentum.gauge*.075)*l,h=Math.exp(-(o*o)/.48)*.03*l;return c+h}registerImpactWave(e,t,i){const n=De(e.index/240,0,1),r=De(1.04-e.visualScale*.03,.34,1),a=De((i-4.6)/18,.02,.18)*(.6+n*.4)*r,o={originAngle:ai(t),strength:a,radius:.32+De(i/18,0,.72),decay:1.4+De(i/16,0,.9),createdAt:this.currentTime},l=this.impactWaves.get(e.index)??[];l.push(o),this.impactWaves.set(e.index,l.slice(-4))}getVisualWaveState(e){const t=this.impactWaves.get(e.index);if(!t||t.length===0)return null;let i=null,n=0;for(const o of t){const l=this.currentTime-o.createdAt;if(l>=o.decay)continue;const c=1-l/o.decay;(!i||c*o.strength>n)&&(i=o,n=c*o.strength)}if(!i)return null;const r=this.currentTime-i.createdAt,a=De(1-r/i.decay,0,1);return{angle:i.originAngle,strength:i.strength*(.9+a*.9),density:.72+a*.58}}rotateOrbitSample(e,t,i){const n=Math.cos(i),r=Math.sin(i);return{position:new Z(e.x*n-e.y*r,e.x*r+e.y*n),tangent:new Z(t.x*n-t.y*r,t.x*r+t.y*n).normalize()}}getPlayerOrbitWorldPosition(e,t,i){const n=ai(t-(e.shapeKind==="round"?0:e.resolvedSpinPhase)),r=i.position.clone().normalize(),a=this.playerState==="airborne"?this.playerVelocity.length():Math.abs(this.angularSpeed)*Math.max(1,i.position.length()),o=Math.max(0,this.sampleSurfaceDeformation(e,n)),l=!e.isMilestone&&e.visualScale>=5?De(.14+o*.92+a*.012,.14,.84):De(o*.16+a*.003,0,.12);return new T(e.resolvedX+i.position.x+r.x*l,e.resolvedY+i.position.y+r.y*l,e.resolvedZ)}getCoinWorldPosition(e,t,i){const n=this.getOrbitSample(e,t),r=n.position.clone().normalize(),a=this.getOrbitClearance(e),o=n.position.length()*i,l=Math.max(this.getPhysicalRadius(e)+a*Math.max(.92,i)+.26,o+.22);return new T(e.resolvedX+r.x*l,e.resolvedY+r.y*l,e.resolvedZ)}getEnemyWorldPosition(e,t){const n=this.getOrbitSample(e,t==="north"?Math.PI*.5:Math.PI*1.5).position.clone().normalize().multiplyScalar(this.getPhysicalRadius(e)+.92),r=e.shapeKind==="round"?0:e.resolvedSpinPhase,a=Math.cos(r),o=Math.sin(r);return new T(e.resolvedX+n.x*a-n.y*o,e.resolvedY+n.x*o+n.y*a,e.resolvedZ)}getPlayableBorderHint(){var n,r;const e=this.getDisplayNodes(Math.min(28,this.getRecommendedVisibleCount())),t=((n=e[0])==null?void 0:n.resolvedX)??this.playerPosition.x-Mt*2,i=((r=e[e.length-1])==null?void 0:r.resolvedX)??this.playerPosition.x+Mt*8;return{top:32,bottom:-32,left:t,right:i,tileWidth:Mt,assetUrl:null}}isEnemyHitFromBehind(e){return e==="north"?this.orbitDirection===1:this.orbitDirection===-1}prewarmUpcomingMilestones(){for(let e=this.attachedIndex+1;e<this.attachedIndex+48;e+=1){const t=this.path.getNode(e);if(!(t!=null&&t.isMilestone)||this.milestoneChoiceCache.has(t.index))continue;const i=qn(t.index,this.runUpgrades);this.milestoneChoiceCache.set(t.index,this.path.createUpgradeBranches(t.index,i,this.score));return}}getBranchHints(){if(this.choiceMode==="reward_branch")return this.activeChoices.slice(0,3).map((e,t)=>{const i=e.previewNodes[0]??e.entry;return{slot:t,offer:e.offer,worldPosition:new T(i.x+3.4,i.y,i.z),mode:"reward_branch"}});if(this.choiceMode==="shop_orbit"&&this.activeChoices.length>0){const e=this.getResolvedNode(this.attachedIndex);return this.activeChoices.slice(0,3).map((t,i)=>{const n=this.activeShopAngles[i]??0,r=e.gameplayRadius+2.1;return{slot:i,offer:t.offer,worldPosition:new T(e.resolvedX+Math.cos(n)*r,e.resolvedY+Math.sin(n)*r,e.resolvedZ),mode:"shop_orbit",price:t.price}})}return[]}getThemeShardColor(){return this.theme==="dark"?"#D4BF9B":"#393F4A"}getThemeContrastColor(){return this.theme==="dark"?"#393F4A":"#D4BF9B"}}class mv{constructor(){y(this,"yaw",0);y(this,"radius",26.5);y(this,"yawTarget",0);y(this,"radiusTarget",26.5);y(this,"yawVelocity",0);y(this,"height",2.6);y(this,"pose",new T);y(this,"lookAt",new T)}setRadius(e){this.radius=e,this.radiusTarget=e}orbit(e,t){const i=De(e,-10,10);this.yawVelocity=De(this.yawVelocity+i*85e-5,-.032,.032)}update(e,t){return this.yawTarget+=this.yawVelocity,this.yawVelocity=Me(this.yawVelocity,0,11,e),this.yaw=Me(this.yaw,this.yawTarget,10,e),this.radius=Me(this.radius,this.radiusTarget,8,e),this.pose.set(t.x+Math.sin(this.yaw)*this.radius,t.y+this.height,t.z+Math.cos(this.yaw)*this.radius),this.lookAt.copy(t),{position:this.pose.clone(),lookAt:this.lookAt.clone()}}}class gv{constructor(e,t,i){y(this,"element");y(this,"canvas");y(this,"context");y(this,"content");y(this,"progress");y(this,"logo");y(this,"sites",[]);y(this,"cellCache",[]);y(this,"fragments",[]);y(this,"clickCount",0);y(this,"clickThreshold",8);y(this,"fractureIndex",0);y(this,"state","idle");y(this,"opacity",1);y(this,"shatterElapsed",0);y(this,"onBroken",null);y(this,"onHidden",null);y(this,"onPointerDown",e=>{if(this.state!=="idle")return;const t=this.canvas.getBoundingClientRect(),i=e.clientX-t.left,n=e.clientY-t.top;this.addFractureCluster(i,n),this.clickCount+=1,this.progress.style.setProperty("--intro-progress",String(this.clickCount/this.clickThreshold)),this.progress.textContent=`${this.clickCount}/${this.clickThreshold}`,this.clickCount>=this.clickThreshold?this.startShatter():this.draw()});y(this,"resize",()=>{this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.draw()});this.i18n=t,this.theme=i,this.element=document.createElement("div"),this.element.className="intro-layer",this.canvas=document.createElement("canvas"),this.canvas.className="intro-layer__canvas";const n=this.canvas.getContext("2d");if(!n)throw new Error("Canvas 2D context unavailable");this.context=n,this.content=document.createElement("div"),this.content.className="intro-layer__content",this.content.innerHTML=`
      <div class="intro-layer__logo-wrap">
        <img class="intro-layer__logo" alt="Ape Prod logo">
      </div>
      <h1 class="intro-layer__title"></h1>
      <p class="intro-layer__subtitle"></p>
      <div class="intro-layer__progress"></div>
    `,this.logo=this.content.querySelector(".intro-layer__logo"),this.progress=this.content.querySelector(".intro-layer__progress"),this.element.append(this.canvas,this.content),e.appendChild(this.element),this.element.addEventListener("pointerdown",this.onPointerDown),this.i18n.onChange(()=>this.renderText()),this.theme.onChange(()=>this.renderText()),window.addEventListener("resize",this.resize),this.resize(),this.renderText()}get isComplete(){return this.state==="hidden"}update(e){var t;this.state==="shattering"&&(this.shatterElapsed+=e,this.opacity=De(1-this.shatterElapsed/1.35,0,1),this.fragments.forEach(i=>{i.centerX+=i.velocityX*e,i.centerY+=i.velocityY*e,i.velocityY+=320*e,i.rotation+=i.angularVelocity*e}),this.shatterElapsed>1.4&&(this.state="hidden",this.element.classList.add("is-hidden"),(t=this.onHidden)==null||t.call(this))),this.draw()}addFractureCluster(e,t){const n=this.fractureIndex+1;this.fractureIndex+=1;for(let r=0;r<9;r+=1){const a=r/9*Math.PI*2,o=18+(n*37+r*17)%44,l=Math.sin(n+r*.7)*18,c=Math.cos(n*1.3+r*.5)*18;this.sites.push({x:e+Math.cos(a)*o+l,y:t+Math.sin(a)*o+c,fractureId:n})}this.cellCache=this.sites.map(r=>this.computeCell(r))}computeCell(e){const t=[];for(let r=0;r<18;r+=1){const a=r/18*Math.PI*2;let o=44;for(const l of this.sites){if(l===e)continue;const c=Math.cos(a),h=Math.sin(a),u=l.x-e.x,d=l.y-e.y,f=2*(c*u+h*d),g=u*u+d*d;f>.001&&(o=Math.min(o,g/f))}t.push({x:e.x+Math.cos(a)*Math.max(8,o),y:e.y+Math.sin(a)*Math.max(8,o)})}return t}startShatter(){var e;this.state==="idle"&&(this.state="shattering",this.shatterElapsed=0,this.fragments=this.cellCache.map((t,i)=>{const n=t.reduce((o,l)=>o+l.x,0)/t.length,r=t.reduce((o,l)=>o+l.y,0)/t.length,a=Math.atan2(r-this.canvas.height/2,n-this.canvas.width/2);return{points:t,centerX:n,centerY:r,velocityX:Math.cos(a)*(60+i*2.5),velocityY:Math.sin(a)*(40+i*1.5)-20,angularVelocity:(Math.random()-.5)*4,rotation:0}}),(e=this.onBroken)==null||e.call(this))}draw(){const e=this.canvas.width,t=this.canvas.height,{context:i}=this;i.clearRect(0,0,e,t),i.save(),i.globalAlpha=this.opacity,i.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--color-bg").trim(),i.fillRect(0,0,e,t),this.state==="shattering"?(i.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue("--color-fg").trim(),i.lineWidth=1.1,this.fragments.forEach(n=>{i.save(),i.translate(n.centerX,n.centerY),i.rotate(n.rotation),i.beginPath(),n.points.forEach((r,a)=>{const o=r.x-n.centerX,l=r.y-n.centerY;a===0?i.moveTo(o,l):i.lineTo(o,l)}),i.closePath(),i.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--color-bg").trim(),i.fill(),i.stroke(),i.restore()})):(i.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue("--color-fg").trim(),i.fillStyle="rgba(0, 0, 0, 0)",i.lineWidth=1.2,this.cellCache.forEach(n=>{i.beginPath(),n.forEach((r,a)=>{a===0?i.moveTo(r.x,r.y):i.lineTo(r.x,r.y)}),i.closePath(),i.stroke()})),i.restore()}renderText(){this.content.querySelector(".intro-layer__title").textContent=this.i18n.t("introTitle"),this.content.querySelector(".intro-layer__subtitle").textContent=this.i18n.t("introSubtitle"),this.progress.textContent=`${this.clickCount}/${this.clickThreshold}`,this.progress.style.setProperty("--intro-progress",String(this.clickCount/this.clickThreshold)),this.logo.src=this.theme.current==="dark"?"/assets/images/Logo/LogoApeProdLight.svg":"/assets/images/Logo/LogoApeProdDark.svg"}}const es={dark:{color:new Ne("#D4BF9B"),emissive:new Ne("#D4BF9B")},light:{color:new Ne("#393F4A"),emissive:new Ne("#393F4A")}};function Ql(s,e){const t=new a0({color:es[s].color.clone(),emissive:es[s].emissive.clone(),emissiveIntensity:.12,roughness:.48,metalness:.18,flatShading:!0,transparent:!0,opacity:1});return t.onBeforeCompile=i=>{const n={uTime:{value:0},uHover:{value:0},uDrag:{value:0},uFocus:{value:0},uSettled:{value:0},uSnap:{value:0},uSeed:{value:e},uOrbitAngle:{value:0},uOrbitPulse:{value:0},uWaveDensity:{value:.72},uStripeMix:{value:0},uStripePhase:{value:0},uStripeColor:{value:es[s].color.clone()}};t.userData.shaderUniforms=n,Object.assign(i.uniforms,n),i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
attribute vec3 aFragmentDir;
attribute float aFragmentPhase;
varying vec3 vShardLocalPos;
uniform float uTime;
uniform float uHover;
uniform float uDrag;
uniform float uFocus;
uniform float uSettled;
uniform float uSnap;
uniform float uSeed;
uniform float uOrbitAngle;
uniform float uOrbitPulse;
uniform float uWaveDensity;`).replace("#include <begin_vertex>",`vec3 transformed = vec3(position);
vShardLocalPos = position;
vec3 fragmentDir = vec3(0.0, 0.0, 1.0);
float fragmentPhase = 0.0;
#ifdef USE_UV
#endif
#ifdef USE_COLOR
#endif
fragmentDir = aFragmentDir;
fragmentPhase = aFragmentPhase;
float baseWave = sin(uTime * 2.4 + position.y * 5.5 + uSeed) * 0.038 * uWaveDensity;
float sideWave = cos(uTime * 1.8 + position.x * 7.0 + uSeed) * 0.022 * uWaveDensity;
float waveAttenuation = (1.0 - uHover * 0.22) * (1.0 - uSettled) * (1.0 - uSnap);
float dragWave = sin(uTime * 4.0 + position.x * 8.0 + uSeed) * 0.06 * uDrag;
float localAngle = atan(position.y, position.x);
float angleDelta = atan(sin(localAngle - uOrbitAngle), cos(localAngle - uOrbitAngle));
float orbitWave = exp(-(angleDelta * angleDelta) / 0.22) * uOrbitPulse * 0.18;
float trailDelta = atan(sin(localAngle - (uOrbitAngle - 0.28)), cos(localAngle - (uOrbitAngle - 0.28)));
orbitWave += exp(-(trailDelta * trailDelta) / 0.55) * uOrbitPulse * 0.08;
float focusFlatten = mix(1.0, 0.08, uFocus);
float shardNoise = fract(sin(fragmentPhase * 37.31 + uSeed) * 43758.5453);
float snapPulse = sin(uTime * 5.4 + fragmentPhase * 11.0) * 0.5 + 0.5;
float radialWave = sin(length(position.xy) * (8.8 + uWaveDensity * 3.2) - uTime * 5.6 + uSeed) * 0.09;
float angularWave = sin(localAngle * (10.0 + uWaveDensity * 5.0) + uTime * 4.9 - uSeed) * 0.08;
float snapWave = (radialWave + angularWave) * uSnap * (0.72 + snapPulse * 0.32);
vec3 swirlAxis = normalize(vec3(-fragmentDir.y, fragmentDir.x, fragmentDir.z + 0.12));
vec3 shardOffset = fragmentDir * (0.008 + shardNoise * 0.02) * uSnap * snapPulse;
shardOffset += swirlAxis * (0.004 + shardNoise * 0.01) * uSnap;
transformed += normal * (((baseWave + sideWave) * waveAttenuation) + dragWave + orbitWave + snapWave) + shardOffset;
transformed.xy *= 1.0 + 0.025 * (1.0 - uSettled) + uDrag * 0.08 + uSnap * 0.028;
transformed.z *= focusFlatten;`),i.fragmentShader=i.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 vShardLocalPos;
uniform float uStripeMix;
uniform float uStripePhase;
uniform vec3 uStripeColor;`).replace("vec4 diffuseColor = vec4( diffuse, opacity );",`vec4 diffuseColor = vec4( diffuse, opacity );
float stripeWave = 0.5 + 0.5 * sin(vShardLocalPos.y * 7.0 + vShardLocalPos.x * 2.6 + uStripePhase);
float stripeBand = smoothstep(0.32, 0.68, stripeWave);
diffuseColor.rgb = mix(diffuseColor.rgb, uStripeColor, stripeBand * uStripeMix);`)},t.customProgramCacheKey=()=>`shard-${e}`,t}function xn(s,e){s.color.copy(es[e].color),s.emissive.copy(es[e].emissive)}function la(s,e){const t=s.userData.shaderUniforms;t&&(t.uTime.value=e.time,t.uHover.value=e.hover,t.uDrag.value=e.drag,t.uFocus.value=e.focus,t.uSettled.value=e.settled,t.uSnap.value=e.snap,t.uOrbitAngle.value=e.orbitAngle??0,t.uOrbitPulse.value=e.orbitPulse??0,t.uWaveDensity.value=e.waveDensity??.72,t.uStripeMix&&(t.uStripeMix.value=e.stripeMix??0),t.uStripePhase&&(t.uStripePhase.value=e.stripePhase??0),t.uStripeColor&&e.stripeColor&&t.uStripeColor.value.set(e.stripeColor))}function vv(s,e){const t=new yr(s,e).toNonIndexed();return Ha(t)}function _v(s,e,t){const i=new Ba(s,e,t).toNonIndexed();return Ha(i)}function yv(s,e){const t=s*Math.sqrt(3)*.5,i=new kc;i.moveTo(0,s),i.lineTo(-t,-s*.5),i.lineTo(t,-s*.5),i.closePath();const n=new Oa(i,{depth:e,steps:1,bevelEnabled:!1}).translate(0,0,-e*.5).toNonIndexed();return Ha(n)}function Ha(s){const e=s.getAttribute("position"),t=new Float32Array(e.count*3),i=new Float32Array(e.count);for(let n=0;n<e.count;n+=3){const r=e.getX(n),a=e.getY(n),o=e.getZ(n),l=e.getX(n+1),c=e.getY(n+1),h=e.getZ(n+1),u=e.getX(n+2),d=e.getY(n+2),f=e.getZ(n+2),g=new T((r+l+u)/3,(a+c+d)/3,(o+h+f)/3).normalize(),_=n/3*.173;for(let m=0;m<3;m+=1){const p=(n+m)*3;t[p]=g.x,t[p+1]=g.y,t[p+2]=g.z,i[n+m]=_}}return s.setAttribute("aFragmentDir",new Et(t,3)),s.setAttribute("aFragmentPhase",new Et(i,1)),s}const xv=new T(0,.8,24),Sv=new T(0,.2,17.5),Sn=36;class Mv{constructor(e,t,i,n){y(this,"root",new Bt);y(this,"loader",new hr);y(this,"raycaster",new m0);y(this,"dragPlane",new Ti(new T(0,0,1),0));y(this,"interactionPlanePoint",new T);y(this,"entities",new Map);y(this,"entityList");y(this,"pickTargets",[]);y(this,"pointer",new Z);y(this,"backgroundPoints");y(this,"focusTargetPosition",new T(0,.1,7.4));y(this,"pivot",new T(0,0,0));y(this,"roundGeometry",vv(1.25,4));y(this,"ovalGeometry",_v(1.18,18,14));y(this,"triangularGeometry",yv(1.24,1.48));y(this,"constellationLines");y(this,"gameFieldEntities");y(this,"globalOrbitTime",0);y(this,"hoveredId",null);y(this,"focusedId",null);y(this,"draggingId",null);y(this,"activeIndex",0);y(this,"theme");y(this,"focusSettled",!1);y(this,"activeLookAt",new T);y(this,"externalLayoutActive",!1);y(this,"externalLayoutPositions",null);y(this,"externalLayoutScales",null);y(this,"externalLayoutVisuals",null);y(this,"externalTransitionFrom",[]);y(this,"externalTransitionTo",[]);y(this,"externalTransitionProgress",0);y(this,"speedAccentTimer",36);y(this,"speedAccentId",null);y(this,"unlockCallbacks",new Set);y(this,"slotPreviewIds",new Set);y(this,"iconTextureCache",new Map);this.scene=e,this.slotSystem=i,this.theme=n,this.scene.add(this.root),this.backgroundPoints=this.createBackgroundPoints(),this.scene.add(this.backgroundPoints),this.constellationLines=this.createConstellationLines(),this.entityList=t.map((r,a)=>this.createShard(r,a)),this.gameFieldEntities=Array.from({length:Sn},(r,a)=>this.createGameFieldShard(a))}getGameGeometry(e){return e==="oval"?this.ovalGeometry:e==="triangular"?this.triangularGeometry:this.roundGeometry}setTheme(e){this.theme=e,this.entityList.forEach(t=>{xn(t.core.material,e),this.updateLogoTexture(t),t.slotIndicator.material.color.set(e==="dark"?"#D4BF9B":"#393F4A"),t.slotIndicator.visible=!1,t.iconPlane.visible=!1}),this.gameFieldEntities.forEach(t=>{xn(t.core.material,e)}),this.backgroundPoints.material.color.set(e==="dark"?"#D4BF9B":"#393F4A"),this.constellationLines.forEach(t=>t.material.color.set(e==="dark"?"#D4BF9B":"#393F4A"))}setActiveIndex(e){this.activeIndex=er(e,this.entityList.length)}setHovered(e){this.hoveredId=e}setFocused(e){this.focusedId=e,this.focusSettled=!1,this.entityList.forEach(t=>{e&&t.project.id===e?t.runtimeState="focus_enter":t.runtimeState!=="dragging"&&(t.runtimeState=t.snapped?"snapped":"orbiting")})}isFocusSettled(){return this.focusSettled}clearFocus(){this.focusedId=null,this.focusSettled=!1,this.entityList.forEach(e=>{e.runtimeState=e.snapped?"snapped":"focus_exit",e.manualRotationY=0})}getFocusedProject(){var e;return this.focusedId&&((e=this.entities.get(this.focusedId))==null?void 0:e.project)||null}getFocusedFacetIndex(){var e;return this.focusedId?((e=this.entities.get(this.focusedId))==null?void 0:e.activeFacet)??0:0}changeFacet(e){if(!this.focusedId)return null;const t=this.entities.get(this.focusedId);return!t||t.facetAnimation.active?null:(t.facetAnimation={active:!0,direction:e,progress:0,swapped:!1},t.project.id)}previewFacetRotation(e){if(!this.focusedId)return;const t=this.entities.get(this.focusedId);!t||t.facetAnimation.active||(t.manualRotationY=Ct.clamp(e*.007,-Math.PI/6,Math.PI/6))}finishFacetRotation(){if(!this.focusedId)return!1;const e=this.entities.get(this.focusedId);if(!e||e.facetAnimation.active)return!1;if(Math.abs(e.manualRotationY)>Math.PI/8){const t=e.manualRotationY>0?1:-1;return e.manualRotationY=0,this.changeFacet(t),!0}return e.manualRotationY=0,!1}beginDrag(e,t){if(this.focusedId)return!1;const i=this.entities.get(e);return!i||i.project.role==="presentation"||!this.slotSystem.getSlotForShard(e)?!1:(this.slotPreviewIds.delete(e),i.snapped&&(i.snapped=!1,this.slotSystem.deactivate(i.project.id)),this.draggingId=e,i.runtimeState="dragging",i.dragOffset.copy(i.group.position).sub(t),i.dragTarget.copy(i.group.position),this.dragPlane.constant=-i.group.position.z,!0)}updateDrag(e){if(!this.draggingId)return 0;const t=this.entities.get(this.draggingId);if(!t)return 0;t.dragTarget.copy(e).add(t.dragOffset),t.dragTarget.z=t.group.position.z;const i=this.slotSystem.getSlotForShard(t.project.id),n=this.slotSystem.getProximity(t.project.id,t.dragTarget);if(i&&n>0){const r=Ct.clamp(.12+n*n*.62,.12,.74);t.dragTarget.x=Ct.lerp(t.dragTarget.x,i.worldPosition.x,r),t.dragTarget.y=Ct.lerp(t.dragTarget.y,i.worldPosition.y,r),t.dragTarget.z=Ct.lerp(t.dragTarget.z,i.worldPosition.z,r)}return n}endDrag(){if(!this.draggingId)return{snapped:!1,unlocked:!1,shardId:null};const e=this.entities.get(this.draggingId),t=this.slotSystem.canSnap(e.project.id,e.dragTarget);let i=!1;t?(e.snapped=!0,e.runtimeState="snapped",e.dragTarget.set(t.worldPosition.x,t.worldPosition.y,t.worldPosition.z),e.velocity.set(0,0,0),this.slotSystem.activate(e.project.id),this.slotSystem.isUnlocked()&&(i=!0,this.unlockCallbacks.forEach(r=>r()))):e.runtimeState="orbiting";const n={snapped:!!t,unlocked:i,shardId:this.draggingId};return this.draggingId=null,n}pick(e,t,i,n){const r=i.getBoundingClientRect();this.pointer.x=(e-r.left)/r.width*2-1,this.pointer.y=-((t-r.top)/r.height)*2+1,this.raycaster.setFromCamera(this.pointer,n);const o=this.raycaster.intersectObjects(this.pickTargets,!1).find(l=>!!l.object.userData.shardId);return o?{shardId:o.object.userData.shardId,point:o.point.clone()}:null}projectPointerToDragPlane(e,t,i,n){const r=i.getBoundingClientRect();return this.pointer.x=(e-r.left)/r.width*2-1,this.pointer.y=-((t-r.top)/r.height)*2+1,this.raycaster.setFromCamera(this.pointer,n),this.raycaster.ray.intersectPlane(this.dragPlane,this.interactionPlanePoint.clone())}getProjectAt(e){var t;return((t=this.entityList[er(e,this.entityList.length)])==null?void 0:t.project)||null}getPivot(){return this.pivot.clone()}getOrbitCameraPose(){return this.activeLookAt.copy(this.pivot),{position:xv,lookAt:this.activeLookAt.clone()}}getFocusCameraPose(){const e=this.focusedId?this.entities.get(this.focusedId):null;return{position:Sv,lookAt:(e==null?void 0:e.group.position.clone())||this.focusTargetPosition.clone()}}getFocusedEntityId(){return this.focusedId}onUnlocked(e){return this.unlockCallbacks.add(e),()=>this.unlockCallbacks.delete(e)}activateSlotPreview(){this.slotPreviewIds.clear(),this.entityList.forEach(e=>{this.slotSystem.getSlotForShard(e.project.id)&&(this.slotPreviewIds.add(e.project.id),e.snapped=!1,!this.focusedId&&e.runtimeState!=="dragging"&&(e.runtimeState="orbiting"))})}activateSlotPreviewForShard(e){if(!this.entities.has(e)||!this.slotSystem.getSlotForShard(e))return;this.slotPreviewIds.add(e);const t=this.entities.get(e);t&&!t.snapped&&!this.focusedId&&t.runtimeState!=="dragging"&&(t.runtimeState="orbiting")}snapShardToSlot(e){const t=this.entities.get(e),i=this.slotSystem.getSlotForShard(e);return!t||!i?!1:(this.slotPreviewIds.delete(e),t.snapped=!0,t.runtimeState="snapped",t.dragTarget.set(i.worldPosition.x,i.worldPosition.y,i.worldPosition.z),t.group.position.set(i.worldPosition.x,i.worldPosition.y,i.worldPosition.z),t.velocity.set(0,0,0),this.slotSystem.activate(e),this.slotSystem.isUnlocked()?(this.unlockCallbacks.forEach(n=>n()),!0):!1)}clearSlotPreview(){this.slotPreviewIds.clear()}getPresentationProjectId(){var e;return((e=this.entityList.find(t=>t.project.role==="presentation"))==null?void 0:e.project.id)??null}getDragThreshold(e){const t=this.entities.get(e);return t?t.project.role==="presentation"?3:t.snapped?4:8:8}getCurrentShardPositions(){return this.entityList.map(e=>e.group.position.clone())}getGameFieldCapacity(){return this.entityList.length+this.gameFieldEntities.length}ensureGameFieldCapacity(e){const t=Math.max(0,e-this.entityList.length);for(;this.gameFieldEntities.length<t;)this.gameFieldEntities.push(this.createGameFieldShard(this.gameFieldEntities.length))}getOrbitPositions(){return this.entityList.map((e,t)=>this.computeOrbitTarget(e,this.globalOrbitTime,t===this.activeIndex))}getSlotPositions(){return this.entityList.map(e=>{const t=this.slotSystem.getSlotForShard(e.project.id);return t?new T(t.worldPosition.x,t.worldPosition.y,t.worldPosition.z):e.group.position.clone()})}beginExternalLayoutTransition(e,t,i){this.externalLayoutActive=!0,this.externalLayoutPositions=null,this.externalLayoutScales=t?[...t]:null,this.externalLayoutVisuals=i?i.map(n=>({scale:n.scale.clone(),shapeKind:n.shapeKind,spinDirection:n.spinDirection,spinSpeed:n.spinSpeed,spinPhase:n.spinPhase,tint:n.tint,pulse:n.pulse,deformAngle:n.deformAngle,deformStrength:n.deformStrength,deformDensity:n.deformDensity,iconSrc:n.iconSrc,iconText:n.iconText,iconTint:n.iconTint,iconScale:n.iconScale})):null,this.externalTransitionFrom=this.getCurrentShardPositions(),this.externalTransitionTo=e.map(n=>n.clone()),this.externalTransitionProgress=0}setExternalLayoutProgress(e){this.externalTransitionProgress=e}setExternalLayoutPositions(e,t,i){this.externalLayoutActive=!0,this.externalLayoutPositions=e.map(n=>n.clone()),this.externalLayoutScales=t?[...t]:null,this.externalLayoutVisuals=i?i.map(n=>({scale:n.scale.clone(),shapeKind:n.shapeKind,spinDirection:n.spinDirection,spinSpeed:n.spinSpeed,spinPhase:n.spinPhase,tint:n.tint,pulse:n.pulse,deformAngle:n.deformAngle,deformStrength:n.deformStrength,deformDensity:n.deformDensity,iconSrc:n.iconSrc,iconText:n.iconText,iconTint:n.iconTint,iconScale:n.iconScale})):null}clearExternalLayout(){this.externalLayoutActive=!1,this.externalLayoutPositions=null,this.externalLayoutScales=null,this.externalLayoutVisuals=null,this.externalTransitionFrom=[],this.externalTransitionTo=[],this.externalTransitionProgress=0,this.gameFieldEntities.forEach(e=>{e.group.visible=!1,e.hiddenUntil=0})}releaseSnappedShards(){this.entityList.forEach(e=>{e.snapped=!1,this.slotSystem.getSlotForShard(e.project.id)&&this.slotSystem.deactivate(e.project.id),!this.focusedId&&e.runtimeState!=="dragging"&&(e.runtimeState="orbiting")})}resetPortfolioState(){this.hoveredId=null,this.focusedId=null,this.draggingId=null,this.focusSettled=!1,this.clearExternalLayout(),this.clearSlotPreview(),this.entityList.forEach(e=>{e.snapped=!1,e.runtimeState="orbiting",e.manualRotationY=0,e.hoverAmount=0,e.dragAmount=0,e.focusAmount=0,e.opacity=1,e.slotPulse=0,e.facetAnimation={active:!1,direction:1,progress:0,swapped:!1},e.hiddenUntil=0,e.dragTarget.copy(e.group.position),e.dragOffset.set(0,0,0),e.velocity.set(0,0,0)}),this.updateConstellationLines()}setVisible(e){this.root.visible=e,this.backgroundPoints.visible=e}update(e,t,i){if(this.globalOrbitTime+=e,this.backgroundPoints.rotation.z+=e*.012,this.backgroundPoints.rotation.y+=e*.02,this.syncLivePivot(t),this.speedAccentTimer-=e,this.speedAccentTimer<=0)if(this.speedAccentId)this.speedAccentId=null,this.speedAccentTimer=28+Math.random()*20;else{const n=this.entityList.filter(a=>a.project.role==="project"),r=n[Math.floor(Math.random()*n.length)];this.speedAccentId=(r==null?void 0:r.project.id)??null,this.speedAccentTimer=8+Math.random()*6}if(this.entityList.forEach((n,r)=>{var S,E,U,G,K,I,O,H,$,Y,X,Q,ee,he,W,J,de,xe,ge,we,Ue;const a=n.project.id===this.focusedId,o=n.project.id===this.draggingId,l=r===this.activeIndex,c=this.slotSystem.getSlotForShard(n.project.id),h=this.slotPreviewIds.has(n.project.id);n.orbitBoostTarget=this.speedAccentId===n.project.id?1.055:1,n.orbitBoost=Me(n.orbitBoost,n.orbitBoostTarget,.55,e);let d=this.computeOrbitTarget(n,t,l),f=l?1.1:1,g=this.focusedId?a?1:.26:1,_=n.snapped?"snapped":"orbiting";if(n.slotPulse=Me(n.slotPulse,c!=null&&c.activated?1:this.slotSystem.getProximity(n.project.id,n.group.position),10,e),c&&(n.slotIndicator.position.set(c.worldPosition.x,c.worldPosition.y,c.worldPosition.z),n.slotIndicator.material.opacity=0,n.slotIndicator.visible=!1),this.externalLayoutActive){const ae=((S=this.externalLayoutVisuals)==null?void 0:S[r])??null;if((E=this.externalLayoutPositions)!=null&&E[r]?d=this.externalLayoutPositions[r]:this.externalTransitionFrom[r]&&this.externalTransitionTo[r]&&(d=this.externalTransitionFrom[r].clone().lerp(this.externalTransitionTo[r],this.externalTransitionProgress)),this.externalLayoutPositions&&n.group.position.distanceToSquared(d)>14*14&&(n.group.position.copy(d),ae&&(n.group.rotation.z=ae.shapeKind==="round"?0:ae.spinPhase),n.hiddenUntil=t+.08),f=(ae==null?void 0:ae.scale.x)??((U=this.externalLayoutScales)==null?void 0:U[r])??1.02,g=1,_="orbiting",ae){n.group.rotation.x=Me(n.group.rotation.x,0,9,e),n.group.rotation.y=Me(n.group.rotation.y,0,9,e),n.group.rotation.z=Me(n.group.rotation.z,ae.shapeKind==="round"?0:ae.spinPhase,8,e);const Pe=this.getGameGeometry(ae.shapeKind);if(n.core.geometry!==Pe&&(n.core.geometry=Pe),n.group.scale.x=Me(n.group.scale.x,ae.scale.x,6,e),n.group.scale.y=Me(n.group.scale.y,ae.scale.y,6,e),n.group.scale.z=Me(n.group.scale.z,ae.scale.z,6,e),ae.tint?(n.core.material.color.set(ae.tint),n.core.material.emissive.set(ae.tint)):xn(n.core.material,this.theme),ae.ringTint){n.accentRing.visible=!0,n.accentRing.material.color.set(ae.ringTint),n.accentRing.material.opacity=.58+(ae.pulse??0)*.3;const P=ae.ringScale??Math.max(ae.scale.x,ae.scale.y)*1.4;n.accentRing.scale.setScalar(P)}else n.accentRing.visible=!1;this.syncIconPlane(n.iconPlane,ae,ae.scale)}else n.core.geometry!==this.roundGeometry&&(n.core.geometry=this.roundGeometry,xn(n.core.material,this.theme),n.accentRing.visible=!1,n.iconPlane.visible=!1)}else o?(d=n.dragTarget,f=1.06,_="dragging"):n.snapped?(d=new T(c.worldPosition.x,c.worldPosition.y,c.worldPosition.z),f=1.08,_="snapped"):h&&c?(d=new T(c.worldPosition.x,c.worldPosition.y,c.worldPosition.z),f=1.04,_="snapped"):a&&(d=this.focusTargetPosition,f=2.55,_=i==="focus_exit"?"focus_exit":i==="focus"?"focused":"focus_enter");n.runtimeState==="focus_exit"&&!this.focusedId?(n.focusAmount=Me(n.focusAmount,0,10,e),n.focusAmount<.05&&(n.runtimeState=n.snapped?"snapped":"orbiting")):n.runtimeState=_;const m=o?18:a?14:n.snapped?13:6.5;n.group.position.x=Me(n.group.position.x,d.x,m,e),n.group.position.y=Me(n.group.position.y,d.y,m,e),n.group.position.z=Me(n.group.position.z,d.z,m,e);const p=this.hoveredId===n.project.id&&!this.focusedId&&!o?1:0,M=o?1:0,v=a?1:0;if(n.hoverAmount=Me(n.hoverAmount,p,10,e),n.dragAmount=Me(n.dragAmount,M,12,e),n.focusAmount=Me(n.focusAmount,v,10,e),n.opacity=Me(n.opacity,g,9,e),n.group.visible=t>=n.hiddenUntil,n.facetAnimation.active){n.facetAnimation.progress=Math.min(1,n.facetAnimation.progress+e*1.8);const ae=Math.sin(n.facetAnimation.progress*Math.PI)*Math.PI*.92*n.facetAnimation.direction;n.manualRotationY=ae,!n.facetAnimation.swapped&&n.facetAnimation.progress>=.5&&(n.activeFacet=er(n.activeFacet+n.facetAnimation.direction,n.project.facets.length),n.facetAnimation.swapped=!0),n.facetAnimation.progress>=1&&(n.facetAnimation.active=!1,n.manualRotationY=0)}else n.manualRotationY=Me(n.manualRotationY,0,14,e);const b=a?0:n.group.rotation.x+e*(.11+r*.001),L=a?n.manualRotationY:n.group.rotation.y+e*(.18+r*.002),C=a?0:n.group.rotation.z+e*(.08+r*.0015);this.externalLayoutActive||(n.group.rotation.x=Me(n.group.rotation.x,b,a?12:2,e),n.group.rotation.y=Me(n.group.rotation.y,L,a?12:2,e),n.group.rotation.z=Me(n.group.rotation.z,C,a?12:2,e));const R=a?.06:n.snapped?.96:1;this.externalLayoutActive||(n.hiddenUntil=0,n.accentRing.visible=!1,n.iconPlane.visible=!1,n.core.geometry!==this.roundGeometry&&(n.core.geometry=this.roundGeometry),n.group.scale.x=Me(n.group.scale.x,f,8,e),n.group.scale.y=Me(n.group.scale.y,f,8,e),n.group.scale.z=Me(n.group.scale.z,f*R,8,e)),n.core.material.opacity=n.opacity,n.core.material.emissiveIntensity=.08+n.hoverAmount*.18+(l?.08:0)+n.slotPulse*.06+(((K=(G=this.externalLayoutVisuals)==null?void 0:G[r])==null?void 0:K.pulse)??0);const F=((O=(I=this.externalLayoutVisuals)==null?void 0:I[r])==null?void 0:O.shapeKind)??null;la(n.core.material,{time:t,hover:n.hoverAmount,drag:n.dragAmount,focus:n.focusAmount,settled:this.externalLayoutActive?F&&F!=="round"?.16:0:n.focusAmount*.25,snap:this.externalLayoutActive?(($=(H=this.externalLayoutVisuals)==null?void 0:H[r])==null?void 0:$.fragmentAmount)??0:n.snapped||h?.96+n.slotPulse*.22:0,orbitAngle:((X=(Y=this.externalLayoutVisuals)==null?void 0:Y[r])==null?void 0:X.deformAngle)??0,orbitPulse:this.externalLayoutActive?((ee=(Q=this.externalLayoutVisuals)==null?void 0:Q[r])==null?void 0:ee.deformStrength)??0:0,waveDensity:this.externalLayoutActive?((W=(he=this.externalLayoutVisuals)==null?void 0:he[r])==null?void 0:W.deformDensity)??.72:n.snapped||h?1.56:.42,stripeMix:((de=(J=this.externalLayoutVisuals)==null?void 0:J[r])==null?void 0:de.stripeMix)??0,stripePhase:((ge=(xe=this.externalLayoutVisuals)==null?void 0:xe[r])==null?void 0:ge.stripePhase)??0,stripeColor:((Ue=(we=this.externalLayoutVisuals)==null?void 0:we[r])==null?void 0:Ue.stripeTint)??void 0}),n.logoPlanes.forEach((ae,Pe)=>{const P=this.externalLayoutActive||this.focusedId?0:n.opacity;ae.material.opacity=P*(.65+Pe*.1)})}),this.updateGameFieldEntities(e,t),this.updateConstellationLines(),this.focusedId){const n=this.entities.get(this.focusedId);this.focusSettled=!!(n&&Math.abs(n.group.position.x-this.focusTargetPosition.x)<.05&&Math.abs(n.group.position.y-this.focusTargetPosition.y)<.05&&Math.abs(n.group.position.z-this.focusTargetPosition.z)<.05&&Math.abs(n.group.scale.x-2.55)<.05)}else this.focusSettled=!1}updateGameFieldEntities(e,t){var i;if(!this.externalLayoutActive){const n=this.slotSystem.getSlots(),r=Math.max(1,n.length),a=Math.max(1,Math.ceil(Sn/r)),o=this.draggingId?((i=this.slotSystem.getSlotForShard(this.draggingId))==null?void 0:i.shardId)??null:null;this.gameFieldEntities.forEach((l,c)=>{if(c>=Sn){l.group.visible=!1,l.hiddenUntil=0;return}const h=c%r,u=Math.floor(c/r),d=n[h];if(!d){l.group.visible=!1;return}const f=u%2===0?1:-1,g=d.activated,_=o===d.shardId,m=_?.5+.5*Math.sin(t*5.4+u*.9):0,p=(g?.98:_?.72:.64)+u*(g?.32:_?.24:.18),M=(g?1.68:_?1.08:.8)+u*.09,b=u/a*Math.PI*2+h*.08+t*M*f,L=d.worldPosition.x+Math.cos(b)*p,C=d.worldPosition.y+Math.sin(b)*p*.92,R=d.worldPosition.z+Math.sin(b*.9)*(g?.44:_?.34:.28);l.group.visible=!0,l.group.position.x=Me(l.group.position.x,L,4.6,e),l.group.position.y=Me(l.group.position.y,C,4.6,e),l.group.position.z=Me(l.group.position.z,R,4.6,e),l.group.rotation.x=Me(l.group.rotation.x,l.group.rotation.x+e*.16,2,e),l.group.rotation.y=Me(l.group.rotation.y,l.group.rotation.y+e*.24,2,e),l.group.rotation.z=Me(l.group.rotation.z,l.group.rotation.z+e*.12,2,e),l.group.scale.setScalar(Me(l.group.scale.x,(g?.24:_?.2:.18)+Math.sin(t*1.8+c)*.01,6,e)),l.accentRing.visible=!1,l.iconPlane.visible=!1,l.core.material.opacity=this.focusedId?.12:g?.48:_?Ct.lerp(.34,.72,m):.32,l.core.material.emissiveIntensity=this.focusedId?.03:g?.15:_?Ct.lerp(.08,.22,m):.08,xn(l.core.material,this.theme),la(l.core.material,{time:t,hover:0,drag:0,focus:0,settled:0,snap:0,orbitAngle:b,orbitPulse:g?.16:_?.12:.08,waveDensity:g?.6:_?.46:.4,stripeMix:0})});return}this.gameFieldEntities.forEach((n,r)=>{var g,_;const a=this.entityList.length+r,o=this.externalTransitionTo[a]??null,l=((g=this.externalLayoutPositions)==null?void 0:g[a])??(o?n.group.position.clone().lerp(o,this.externalTransitionProgress):null),c=((_=this.externalLayoutVisuals)==null?void 0:_[a])??null;if((!l||!c)&&!o){n.group.visible=!1,n.accentRing.visible=!1,n.iconPlane.visible=!1;return}const h=l??o??n.group.position;this.externalLayoutPositions&&n.group.position.distanceToSquared(h)>14*14&&(n.group.position.copy(h),c&&(n.group.rotation.z=c.shapeKind==="round"?0:c.spinPhase),n.hiddenUntil=t+.08),n.group.visible=t>=n.hiddenUntil,n.group.position.x=Me(n.group.position.x,h.x,7.2,e),n.group.position.y=Me(n.group.position.y,h.y,7.2,e),n.group.position.z=Me(n.group.position.z,h.z,7.2,e),n.group.rotation.x=Me(n.group.rotation.x,0,8,e),n.group.rotation.y=Me(n.group.rotation.y,0,8,e);const u=(c==null?void 0:c.shapeKind)??"round",d=(c==null?void 0:c.scale)??new T(.22,.22,.22);n.group.rotation.z=Me(n.group.rotation.z,u==="round"?0:(c==null?void 0:c.spinPhase)??0,8,e),n.group.scale.x=Me(n.group.scale.x,d.x,6,e),n.group.scale.y=Me(n.group.scale.y,d.y,6,e),n.group.scale.z=Me(n.group.scale.z,d.z,6,e);const f=this.getGameGeometry(u);n.core.geometry!==f&&(n.core.geometry=f),c!=null&&c.tint?(n.core.material.color.set(c.tint),n.core.material.emissive.set(c.tint)):xn(n.core.material,this.theme),c!=null&&c.ringTint?(n.accentRing.visible=!0,n.accentRing.material.color.set(c.ringTint),n.accentRing.material.opacity=.62+(c.pulse??.06)*.32,n.accentRing.scale.setScalar(c.ringScale??Math.max(d.x,d.y)*1.42)):n.accentRing.visible=!1,this.syncIconPlane(n.iconPlane,c,d),n.core.material.opacity=1-((c==null?void 0:c.fragmentAmount)??0)*.92,n.core.material.emissiveIntensity=.08+((c==null?void 0:c.pulse)??.06),la(n.core.material,{time:t,hover:0,drag:0,focus:0,settled:u==="round"?0:.16,snap:(c==null?void 0:c.fragmentAmount)??0,orbitAngle:(c==null?void 0:c.deformAngle)??0,orbitPulse:(c==null?void 0:c.deformStrength)??0,waveDensity:(c==null?void 0:c.deformDensity)??.72,stripeMix:(c==null?void 0:c.stripeMix)??0,stripePhase:(c==null?void 0:c.stripePhase)??0,stripeColor:(c==null?void 0:c.stripeTint)??void 0})})}syncLivePivot(e){const t=this.entityList.find(i=>i.project.role==="presentation");if(!t){this.pivot.set(0,0,0);return}this.pivot.set(t.layoutAnchor.x,t.layoutAnchor.y,t.layoutAnchor.z)}computeOrbitTarget(e,t,i){const n=e.orbitPhase+t*e.orbitSpeed*e.orbitBoost,r=e.layoutAnchor.clone();if(e.project.role==="presentation")return new T(this.pivot.x+Math.cos(n)*1.9,this.pivot.y+Math.sin(n*.85)*.72,this.pivot.z+Math.sin(n)*2.6+(i?.35:0));if(e.project.role==="hint")return new T(this.pivot.x+Math.sin(n*.42)*.45,this.pivot.y+Math.cos(n)*5.05,this.pivot.z+Math.sin(n)*4.2+(i?.24:0));const o=Math.atan2(r.y,r.x||1e-4)+n,l=4.1+Math.abs(r.x)*.6+Math.abs(r.y)*.2,c=Ct.clamp(r.y*.05,-.36,.36),h=Math.cos(o)*l,u=Math.sin(o)*l,d=new T(this.pivot.x+h,this.pivot.y+r.y*.78+Math.sin(o*1.1+e.orbitHeight)*.55+u*c*.16,this.pivot.z+u+r.z*.45);return i&&(d.z+=.38),d}createShard(e,t){const i=new Bt,n=v0(t),r=new T(n.x,n.y,n.z),a=Math.max(1,this.slotSystem.getSlots().length);i.position.copy(r),this.root.add(i);const o=this.roundGeometry,l=Ql(this.theme,t*17+11),c=new ft(o,l);c.userData.shardId=e.id,i.add(c),this.pickTargets.push(c);const h=new ft(new cr(1,1.18,36),new Wt({color:this.theme==="dark"?"#D4BF9B":"#393F4A",transparent:!0,opacity:0,side:Ot,depthWrite:!1}));h.visible=!0,h.visible=!1;const u=this.createAccentRing();u.visible=!1,i.add(u);const d=new ft(new hi(.3,.3),new Wt({transparent:!0,opacity:0,depthWrite:!1}));d.visible=!1,this.attachIconBillboard(d),i.add(d);const f={project:e,group:i,core:c,logoPlanes:[],layoutAnchor:r,orbitRadius:r.length(),orbitPhase:t/a*Math.PI*2,orbitSpeed:e.role==="presentation"?.34:e.role==="hint"?.58:.38+t*.012,orbitBoost:1,orbitBoostTarget:1,orbitHeight:t*.9,orbitDepth:t*.55,velocity:new T,dragTarget:new T,dragOffset:new T,hoverAmount:0,dragAmount:0,focusAmount:0,opacity:1,activeFacet:0,runtimeState:"orbiting",snapped:!1,slotIndicator:h,slotPulse:0,manualRotationY:0,facetAnimation:{active:!1,direction:1,progress:0,swapped:!1},hiddenUntil:0,accentRing:u,iconPlane:d};return this.entities.set(e.id,f),this.createLogoPlanes(f),f}createGameFieldShard(e){const t=new Bt;t.visible=!1,this.root.add(t);const i=Ql(this.theme,900+e*23),n=new ft(this.roundGeometry,i);t.add(n);const r=this.createAccentRing();r.visible=!1,t.add(r);const a=new ft(new hi(.3,.3),new Wt({transparent:!0,opacity:0,depthWrite:!1}));a.visible=!1,this.attachIconBillboard(a),t.add(a);const o=this.getGameFieldAnchor(e);return{group:t,core:n,accentRing:r,iconPlane:a,anchor:o,orbitPhase:e*.37,orbitSpeed:.32+e%7*.018,orbitRadius:.22+e%4*.06,hiddenUntil:0}}createAccentRing(){return new ft(new cr(1.08,1.26,48),new Wt({color:"#4B74FF",transparent:!0,opacity:0,side:Ot,depthWrite:!1}))}attachIconBillboard(e){const t=new $i,i=new $i;e.onBeforeRender=(n,r,a)=>{a.getWorldQuaternion(i),e.parent?(e.parent.getWorldQuaternion(t),t.invert(),e.quaternion.copy(t.multiply(i))):e.quaternion.copy(i)}}getIconTexture(e,t,i){const n=e?`src:${e}`:`text:${t??""}:${i??""}`,r=this.iconTextureCache.get(n);if(r)return r;let a;if(e)a=this.loader.load(e),a.colorSpace=nt;else{const o=document.createElement("canvas");o.width=256,o.height=256;const l=o.getContext("2d");l&&(l.clearRect(0,0,256,256),l.font="900 188px Arial",l.fillStyle=i??"#D4BF9B",l.strokeStyle="rgb(0 0 0 / 0.28)",l.lineWidth=12,l.textAlign="center",l.textBaseline="middle",l.strokeText(t??"?",128,138),l.fillText(t??"?",128,138)),a=new Fc(o),a.colorSpace=nt}return a.wrapS=Ut,a.wrapT=Ut,this.iconTextureCache.set(n,a),a}syncIconPlane(e,t,i){if(!(t!=null&&t.iconSrc||t!=null&&t.iconText)){e.visible=!1;return}e.visible=!0,e.material.map=this.getIconTexture(t.iconSrc,t.iconText,t.iconTint),e.material.opacity=.96,e.material.needsUpdate=!0;const n=t.iconScale??.34;e.scale.setScalar(n*Math.max(i.x,i.y)),e.position.set(0,0,.04)}getGameFieldAnchor(e){if(e>=Sn)return new T(0,0,0);const t=Math.ceil(Sn/2),i=e<t,n=i?e:e-t,r=i?t:Sn-t,o=(r<=1?0:n/(r-1))*2-1,l=.38+Math.abs(o)*.78,c=o*10.8,h=(i?1:-1)*o*6.6*l,u=(i?1:-1)*o*4.2;return new T(c,h,u)}createLogoPlanes(e){const t=this.theme==="dark"?e.project.logo.dark:e.project.logo.light,i=1.7*e.project.logo.scale,n=[0,Math.PI*(2/3),Math.PI*(4/3)];this.loader.load(t,r=>{r.colorSpace=nt,r.anisotropy=4,n.forEach(a=>{const o=new hi(i,i,12,12),l=o.attributes.position;for(let u=0;u<l.count;u+=1){const d=l.getX(u),f=l.getY(u),g=Math.sqrt(d*d+f*f)/(i*.7);l.setZ(u,Math.sin(g*Math.PI*.5)*.22)}o.computeVertexNormals();const c=new Wt({map:r,transparent:!0,opacity:e.project.logo.opacity,side:Ot,depthWrite:!1}),h=new ft(o,c);h.position.set(Math.sin(a)*1.48,0,Math.cos(a)*1.48),h.lookAt(0,0,0),h.userData.shardId=e.project.id,e.group.add(h),e.logoPlanes.push(h),this.pickTargets.push(h)})})}updateLogoTexture(e){const t=this.theme==="dark"?e.project.logo.dark:e.project.logo.light;this.loader.load(t,i=>{i.colorSpace=nt,e.logoPlanes.forEach(n=>{n.material.map=i,n.material.needsUpdate=!0})})}createBackgroundPoints(){const e=new gt,t=new Float32Array(240*3);for(let i=0;i<240;i+=1){const n=26+Math.random()*20,r=Math.random()*Math.PI*2,a=(Math.random()-.5)*18;t[i*3]=Math.cos(r)*n,t[i*3+1]=a,t[i*3+2]=Math.sin(r)*6-8}return e.setAttribute("position",new Et(t,3)),new Tg(e,new Uc({color:this.theme==="dark"?"#D4BF9B":"#393F4A",size:.08,transparent:!0,opacity:.35}))}createConstellationLines(){const e=()=>{const t=new gt;t.setAttribute("position",new at([],3));const i=new lr({color:this.theme==="dark"?"#D4BF9B":"#393F4A",transparent:!0,opacity:.9}),n=new Ks(t,i);return this.root.add(n),n};return[e(),e(),e()]}updateConstellationLines(){if(this.externalLayoutActive){this.constellationLines.forEach(i=>{i.visible=!1});return}const e=this.slotSystem.getSlots();[[e[1],e[2],e[0],e[6],e[5]],[e[3],e[4],e[0],e[8],e[7]],[e[0],e[9]]].forEach((i,n)=>{const r=i.filter(Boolean).filter(l=>l.activated).map(l=>l.worldPosition),a=this.constellationLines[n];if(r.length<2){a.visible=!1,a.geometry.setAttribute("position",new at([],3));return}const o=new Float32Array(r.length*3);r.forEach((l,c)=>{o[c*3]=l.x,o[c*3+1]=l.y,o[c*3+2]=l.z}),a.visible=!0,a.geometry.setAttribute("position",new Et(o,3)),a.geometry.computeBoundingSphere()})}}class Wa{constructor(e){y(this,"slots");this.slots=e.map((t,i,n)=>({shardId:t,worldPosition:Wa.computePosition(i,n.length),snapRadius:3.05,activated:!1}))}static computePosition(e,t){return _0(e<t?e:0)}getSlots(){return this.slots}getSlotForShard(e){return this.slots.find(t=>t.shardId===e)||null}getProximity(e,t){const i=this.getSlotForShard(e);if(!i||i.activated)return 0;const n=kl(i.worldPosition,t);return Math.max(0,1-n/(i.snapRadius*2.75))}canSnap(e,t){const i=this.getSlotForShard(e);return!i||i.activated?null:kl(i.worldPosition,t)<=i.snapRadius?i:null}activate(e){const t=this.getSlotForShard(e);return t?(t.activated=!0,t):null}deactivate(e){const t=this.getSlotForShard(e);return t?(t.activated=!1,t):null}reset(){this.slots.forEach(e=>{e.activated=!1})}isUnlocked(){return this.slots.every(e=>e.activated)}}class bv{constructor(e,t,i,n,r){y(this,"pointerDown",!1);y(this,"downX",0);y(this,"downY",0);y(this,"lastX",0);y(this,"lastY",0);y(this,"dragged",!1);y(this,"sceneOrbiting",!1);y(this,"downShardId",null);y(this,"focusGesture",!1);y(this,"onPointerDown",e=>{const t=this.getMode();if(t==="intro"||t==="intro_shattering"||t==="intro_transition"||t==="about_section"||t==="game_transition"||t==="game"||t==="game_over")return;this.pointerDown=!0,this.dragged=!1,this.sceneOrbiting=!1,this.focusGesture=!1,this.downX=e.clientX,this.downY=e.clientY,this.lastX=e.clientX,this.lastY=e.clientY,this.canvas.setPointerCapture(e.pointerId);const i=this.world.pick(e.clientX,e.clientY,this.canvas,this.camera);this.downShardId=(i==null?void 0:i.shardId)||null,!(t==="focus"||t==="focus_facet_transition"||t==="focus_enter")&&i&&this.callbacks.onHover(i.shardId)});y(this,"onPointerMove",e=>{const t=this.getMode(),i=e.clientX-this.downX,n=e.clientY-this.downY,r=e.clientX-this.lastX,a=e.clientY-this.lastY,o=Math.hypot(i,n);if(!this.pointerDown){if(t==="orbit"||t==="dragging"||t==="constellation_complete"){const c=this.world.pick(e.clientX,e.clientY,this.canvas,this.camera);this.callbacks.onHover((c==null?void 0:c.shardId)||null)}return}if(t==="focus"||t==="focus_enter"){Math.abs(i)>12&&Math.abs(i)>Math.abs(n)&&(this.focusGesture=!0,this.callbacks.onFocusRotation(i));return}const l=this.downShardId?this.world.getDragThreshold(this.downShardId):8;if((t==="orbit"||t==="constellation_complete"||t==="dragging")&&this.downShardId&&o>l){const c=this.world.projectPointerToDragPlane(e.clientX,e.clientY,this.canvas,this.camera);if(!c)return;this.dragged||(this.dragged=this.callbacks.onDragStart(this.downShardId,c)),this.dragged&&this.callbacks.onDragMove(c);return}(t==="orbit"||t==="constellation_complete")&&!this.downShardId&&o>4&&(this.sceneOrbiting=!0,this.callbacks.onSceneOrbitMove(r,a)),this.lastX=e.clientX,this.lastY=e.clientY});y(this,"onPointerUp",e=>{const t=this.getMode(),i=Math.hypot(e.clientX-this.downX,e.clientY-this.downY);if(this.canvas.hasPointerCapture(e.pointerId)&&this.canvas.releasePointerCapture(e.pointerId),this.dragged){this.callbacks.onDragEnd(),this.reset();return}if(t==="focus"||t==="focus_enter"){if(this.focusGesture)this.callbacks.onFocusRotationEnd();else{const n=this.world.pick(e.clientX,e.clientY,this.canvas,this.camera);n&&n.shardId===this.world.getFocusedEntityId()?this.callbacks.onFocusSideTap(e.clientX<window.innerWidth/2?"left":"right"):this.callbacks.onBackgroundClick()}this.reset();return}if(this.sceneOrbiting){this.reset();return}if((t==="orbit"||t==="constellation_complete")&&i<=8){const n=this.world.pick(e.clientX,e.clientY,this.canvas,this.camera);n?this.callbacks.onShardClick(n.shardId):this.callbacks.onHover(null)}this.reset()});y(this,"onPointerLeave",()=>{this.dragged&&this.callbacks.onDragEnd(),this.callbacks.onHover(null),this.reset()});this.canvas=e,this.camera=t,this.world=i,this.getMode=n,this.callbacks=r,this.canvas.addEventListener("pointerdown",this.onPointerDown),this.canvas.addEventListener("pointermove",this.onPointerMove),this.canvas.addEventListener("pointerup",this.onPointerUp),this.canvas.addEventListener("pointerleave",this.onPointerLeave)}reset(){this.pointerDown=!1,this.dragged=!1,this.sceneOrbiting=!1,this.focusGesture=!1,this.downShardId=null,this.lastX=0,this.lastY=0}}const Ev={dark:{background:new Ne("#393F4A"),foreground:new Ne("#D4BF9B")},light:{background:new Ne("#D4BF9B"),foreground:new Ne("#393F4A")}};class Av{constructor(e){y(this,"scene",new Eg);y(this,"camera",new Ht(42,1,.1,200));y(this,"renderer",new Lc({antialias:!0,alpha:!0,powerPreference:"high-performance"}));y(this,"cameraTarget",new T(0,.5,24));y(this,"cameraCurrent",new T(0,.5,24));y(this,"lookTarget",new T(0,0,0));y(this,"lookCurrent",new T(0,0,0));y(this,"ambientLight",new p0(16777215,.95));y(this,"keyLight",new f0(16777215,1.4));y(this,"rimLight",new u0(16777215,25,80,2));y(this,"cameraPositionResponse",8);y(this,"lookResponse",8);y(this,"resize",()=>{const e=this.host.clientWidth||window.innerWidth,t=this.host.clientHeight||window.innerHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1)});this.host=e,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.domElement.className="app-canvas",this.host.appendChild(this.renderer.domElement),this.keyLight.position.set(12,10,16),this.rimLight.position.set(0,-6,22),this.scene.add(this.ambientLight,this.keyLight,this.rimLight),this.resize(),this.setTheme("dark"),window.addEventListener("resize",this.resize)}setTheme(e){const t=Ev[e];this.scene.background=t.background.clone(),this.ambientLight.color.copy(t.foreground),this.keyLight.color.copy(t.foreground),this.rimLight.color.copy(t.foreground)}setCameraTarget(e,t){this.cameraTarget.copy(e),this.lookTarget.copy(t)}setCameraResponse(e,t=e){this.cameraPositionResponse=Math.max(1,e),this.lookResponse=Math.max(1,t)}update(e){this.cameraCurrent.x=Me(this.cameraCurrent.x,this.cameraTarget.x,this.cameraPositionResponse,e),this.cameraCurrent.y=Me(this.cameraCurrent.y,this.cameraTarget.y,this.cameraPositionResponse,e),this.cameraCurrent.z=Me(this.cameraCurrent.z,this.cameraTarget.z,this.cameraPositionResponse,e),this.lookCurrent.x=Me(this.lookCurrent.x,this.lookTarget.x,this.lookResponse,e),this.lookCurrent.y=Me(this.lookCurrent.y,this.lookTarget.y,this.lookResponse,e),this.lookCurrent.z=Me(this.lookCurrent.z,this.lookTarget.z,this.lookResponse,e),this.rimLight.position.z=this.cameraCurrent.z-2,this.camera.position.copy(this.cameraCurrent),this.camera.lookAt(this.lookCurrent)}render(){this.renderer.render(this.scene,this.camera)}projectWorldToScreen(e){const t=e.clone().project(this.camera);return{x:(t.x+1)*.5*(this.host.clientWidth||window.innerWidth),y:(1-t.y)*.5*(this.host.clientHeight||window.innerHeight),visible:t.z>=-1&&t.z<=1}}}const Mn={title:{fr:"À propos",en:"About"},paragraphs:[{fr:"Passionné par la création sous toutes ses formes, je combine développement web, réalisation audiovisuelle, montage vidéo et design graphique pour donner vie à des projets uniques.",en:"Passionate about creation in all its forms, I combine web development, audiovisual production, video editing, and graphic design to bring unique projects to life."},{fr:"Mon approche multidisciplinaire me permet de créer des expériences complètes, de la conception à la réalisation.",en:"My multidisciplinary approach allows me to create complete experiences, from concept to delivery."}],skills:[{title:{fr:"Développement",en:"Development"},body:{fr:"JavaScript, React, Three.js, Node.js, Ruby on Rails",en:"JavaScript, React, Three.js, Node.js, Ruby on Rails"}},{title:{fr:"Réalisation",en:"Production"},body:{fr:"Direction artistique, scénarisation, storyboarding",en:"Art direction, scriptwriting, storyboarding"}},{title:{fr:"Vidéo",en:"Video"},body:{fr:"Montage, motion design, VFX, color grading",en:"Editing, motion design, VFX, color grading"}},{title:{fr:"Graphisme",en:"Design"},body:{fr:"UI/UX, branding, illustration, design system",en:"UI/UX, branding, illustration, design systems"}}],contactTitle:{fr:"Contact",en:"Contact"},contactText:{fr:"Intéressé par une collaboration ? N’hésitez pas à me contacter.",en:"Interested in collaborating? Feel free to reach out."}},wv=[{id:"email",href:"mailto:contact.bheall@gmail.com",label:{fr:"Email",en:"Email"}},{id:"github",href:"https://github.com/orgs/ApeProd",label:{fr:"GitHub",en:"GitHub"}},{id:"x",href:"https://x.com/BhealLfr",label:{fr:"X",en:"X"}}];class Tv{constructor(e,t){y(this,"element");y(this,"panel");y(this,"closeButton");y(this,"isOpen",!1);y(this,"onClose",null);this.i18n=t,this.element=document.createElement("div"),this.element.className="about-layer",this.panel=document.createElement("div"),this.panel.className="about-layer__panel",this.panel.dataset.uiInteractive="true",this.closeButton=document.createElement("button"),this.closeButton.className="about-layer__close",this.closeButton.type="button",this.closeButton.addEventListener("click",()=>this.close()),this.panel.appendChild(this.closeButton),this.element.appendChild(this.panel),this.element.addEventListener("click",i=>{i.target===this.element&&this.close()}),e.appendChild(this.element),this.i18n.onChange(i=>this.render(i)),this.render(this.i18n.current)}open(){this.isOpen=!0,this.element.classList.add("is-open")}close(){var e;this.isOpen&&(this.isOpen=!1,this.element.classList.remove("is-open"),(e=this.onClose)==null||e.call(this))}get opened(){return this.isOpen}render(e){this.closeButton.textContent=this.i18n.t("close");const t=Mn.skills.map(r=>`
          <article class="about-layer__skill">
            <h3>${r.title[e]}</h3>
            <p>${r.body[e]}</p>
          </article>
        `).join(""),i=wv.map(r=>`
          <a class="about-layer__link" href="${r.href}" target="${r.id==="email"?"_self":"_blank"}" rel="noopener">
            ${r.label[e]}
          </a>
        `).join("");this.panel.innerHTML=`
      <button class="about-layer__close" type="button">${this.i18n.t("close")}</button>
      <h2>${Mn.title[e]}</h2>
      <p>${Mn.paragraphs[0][e]}</p>
      <p>${Mn.paragraphs[1][e]}</p>
      <div class="about-layer__skills">${t}</div>
      <h3>${Mn.contactTitle[e]}</h3>
      <p>${Mn.contactText[e]}</p>
      <div class="about-layer__links">${i}</div>
    `;const n=this.panel.querySelector(".about-layer__close");n&&n.addEventListener("click",()=>this.close())}}class Cv{constructor(e,t,i){y(this,"element");y(this,"panel");y(this,"project",null);y(this,"facetIndex",0);y(this,"currentSlide",0);y(this,"gridView",!1);y(this,"callbacks");this.i18n=t,this.callbacks=i,this.element=document.createElement("div"),this.element.className="focus-layer",this.panel=document.createElement("div"),this.panel.className="focus-layer__panel",this.panel.dataset.uiInteractive="true",this.element.appendChild(this.panel),e.appendChild(this.element),this.element.addEventListener("click",n=>{n.target===this.element&&this.callbacks.onClose()}),this.i18n.onChange(()=>this.render())}show(e,t){this.project=e,this.facetIndex=t,this.currentSlide=0,this.gridView=!1,this.render(),this.element.classList.add("is-visible")}hide(){this.element.classList.remove("is-visible"),this.project=null}updateFacet(e){this.facetIndex=e,this.currentSlide=0,this.gridView=!1,this.render()}render(){var o,l;if(!this.project){this.panel.innerHTML="";return}const e=this.i18n.current,t=this.project.facets[this.facetIndex],i=t.images.slice(0,12),n=i[this.currentSlide]||"";this.panel.innerHTML=`
      <div class="focus-layer__header">
        <div>
          <p class="focus-layer__eyebrow">${t.categoryLabel[e]}</p>
          <h2>${this.project.title[e]}</h2>
        </div>
        <button class="focus-layer__close" type="button">${this.i18n.t("close")}</button>
      </div>
      <div class="focus-layer__facet-nav">
        <button class="focus-layer__facet-btn" type="button">${this.i18n.t("previous")}</button>
        <span>${this.facetIndex+1} / ${this.project.facets.length}</span>
        <button class="focus-layer__facet-btn" type="button">${this.i18n.t("next")}</button>
      </div>
      <div class="focus-layer__media">
        ${this.renderMedia(i,n)}
      </div>
      <p class="focus-layer__hint">${this.i18n.t("clickToGrid")}</p>
      <div class="focus-layer__body">
        ${t.description[e].split(`

`).map(c=>`<p>${c}</p>`).join("")}
      </div>
      <section class="focus-layer__section">
        <h3>${this.i18n.t("technologies")}</h3>
        <div class="focus-layer__tags">
          ${t.technologies.map(c=>`<span>${c[e]}</span>`).join("")}
        </div>
      </section>
      <section class="focus-layer__section">
        <h3>${this.i18n.t("links")}</h3>
        <div class="focus-layer__links">
          ${this.renderLinks()}
        </div>
      </section>
    `;const r=this.panel.querySelector(".focus-layer__close"),a=this.panel.querySelectorAll(".focus-layer__facet-btn");r==null||r.addEventListener("click",()=>this.callbacks.onClose()),(o=a[0])==null||o.addEventListener("click",()=>this.callbacks.onPrevFacet()),(l=a[1])==null||l.addEventListener("click",()=>this.callbacks.onNextFacet()),this.bindMediaEvents(i)}renderMedia(e,t){return e.length===0?`<div class="focus-layer__empty">${this.i18n.t("media")}</div>`:e.length===1?`<img class="focus-layer__image" src="${e[0]}" alt="Project media">`:this.gridView?`
        <div class="focus-layer__grid">
          ${e.map((i,n)=>`<button class="focus-layer__thumb" data-slide="${n}" type="button"><img src="${i}" alt="Project media ${n+1}"></button>`).join("")}
        </div>
      `:`
      <div class="focus-layer__slideshow">
        <button class="focus-layer__slide-nav" data-slide-dir="-1" type="button">${this.i18n.t("previous")}</button>
        <img class="focus-layer__image" src="${t}" alt="Project media ${this.currentSlide+1}">
        <button class="focus-layer__slide-nav" data-slide-dir="1" type="button">${this.i18n.t("next")}</button>
      </div>
      <div class="focus-layer__counter">${this.currentSlide+1} / ${e.length}</div>
    `}renderLinks(){if(!this.project)return"";const e=this.project.facets[this.facetIndex],t=Object.entries(e.links).filter(([,i])=>i);return t.length===0?`<span class="focus-layer__empty">${this.i18n.t("links")}</span>`:t.map(([i,n])=>`<a class="focus-layer__link" href="${n}" target="_blank" rel="noopener">${i.toUpperCase()}</a>`).join("")}bindMediaEvents(e){if(e.length<=1)return;const t=this.panel.querySelector(".focus-layer__image"),i=this.panel.querySelectorAll(".focus-layer__slide-nav"),n=this.panel.querySelectorAll(".focus-layer__thumb");t==null||t.addEventListener("click",()=>{this.gridView=!0,this.render()}),i.forEach(r=>r.addEventListener("click",()=>{const a=Number(r.dataset.slideDir)||0;this.currentSlide=(this.currentSlide+a+e.length)%e.length,this.render()})),n.forEach(r=>r.addEventListener("click",()=>{this.currentSlide=Number(r.dataset.slide)||0,this.gridView=!1,this.render()}))}}class Rv{constructor(e,t){y(this,"element");y(this,"titleElement");y(this,"bodyElement");y(this,"currentStep","intro");this.host=e,this.i18n=t,this.element=document.createElement("div"),this.element.className="guide-bubble",this.titleElement=document.createElement("p"),this.titleElement.className="guide-bubble__title",this.bodyElement=document.createElement("p"),this.bodyElement.className="guide-bubble__body",this.element.append(this.titleElement,this.bodyElement),this.host.appendChild(this.element),this.i18n.onChange(()=>this.render()),this.render()}setStep(e){e!==this.currentStep&&(this.currentStep=e,this.render())}render(){const e=this.currentStep==="unlocked"?this.i18n.t("unlocked"):this.i18n.t("home"),t={intro:this.i18n.t("introHint"),orbit:this.i18n.t("orbitHint"),focus:this.i18n.t("focusHint"),drag:this.i18n.t("dragHint"),slots:this.i18n.t("slotHint"),unlocked:this.i18n.t("unlockedHint")}[this.currentStep];this.titleElement.textContent=e,this.bodyElement.textContent=t}}const Pv={fr:{theme:"Thème",language:"Langue",about:"About / Outro",backToOrbit:"Retour à l’orbite",unlocked:"Mini-jeu débloqué",locked:"Mini-jeu verrouillé",close:"Fermer",previous:"Précédent",next:"Suivant",technologies:"Technologies",links:"Liens",media:"Médias",clickToGrid:"Cliquez sur le média pour afficher la grille.",introTitle:"Portfolio",introSubtitle:"Bilel Kharbouche",introHint:"Cliquez plusieurs fois pour fissurer la surface.",orbitHint:"Cliquez une shard pour la mettre en focus.",focusHint:"Glissez horizontalement ou utilisez les flèches pour changer de facette.",dragHint:"Faites glisser une shard hors focus pour chercher sa place secrète.",slotHint:"La bonne place réagit quand la bonne shard s’en approche.",unlockedHint:"Toutes les shards sont placées. Le mini-jeu est prêt à être branché.",aboutTitle:"About / Outro",home:"Accueil",gameScore:"Score",gameBest:"Meilleur score",gameBestDistance:"Meilleure distance",gameChain:"Chaîne",gameMomentum:"Momentum",gameCharge:"Charge",gameDistance:"Distance",gameCoins:"Pièces",gameSplits:"Splits",gameRestart:"Recommencer",gamePortfolio:"Portfolio",gameStatusTransition:"Le chemin s’aligne.",gameStatusRunning:"Maintenez bas pour charger. Haut pour sauter.",gameStatusUpgrade:"Sautez vers une branche pour choisir votre item.",gameStatusGameOver:"Run terminée.",gameUpgradeTitle:"Choisissez une amélioration",gameUpgradeHint:"Sautez vers une branche. 1, 2, 3 restent disponibles en secours.",gameShopTitle:"Marché orbital",gameShopHint:"Tournez autour de la shard pour acheter une offre.",gameShopClose:"Retour",gamePathLeft:"Voie gauche",gamePathCenter:"Voie centrale",gamePathRight:"Voie droite",gamePathUpper:"Voie haute",gamePathForward:"Voie frontale",gamePathLower:"Voie basse",gameShopOffer:"Offre orbitale",gamePrice:"Prix",gameOverTitle:"Game Over",gameOverBody:"La caméra vous a dépassé ou la trajectoire a été manquée.",gameOverCamera:"La caméra vous a laissé derrière.",gameOverEnemy:"Un ennemi vous a touché de face.",gameOverBounds:"Vous êtes sorti de la zone jouable.",gameAcquired:"Objet acquis",gameLandingMiss:"Raté",gameLandingGood:"Bon",gameLandingSuper:"Super",gameLandingPerfect:"Parfait",gameLandingTwist:"Twist"},en:{theme:"Theme",language:"Language",about:"About / Outro",backToOrbit:"Back to orbit",unlocked:"Mini-game unlocked",locked:"Mini-game locked",close:"Close",previous:"Previous",next:"Next",technologies:"Technologies",links:"Links",media:"Media",clickToGrid:"Click the media to open the grid.",introTitle:"Portfolio",introSubtitle:"Bilel Kharbouche",introHint:"Click repeatedly to fracture the surface.",orbitHint:"Click a shard to focus it.",focusHint:"Swipe or drag horizontally to change facets.",dragHint:"Drag a shard outside focus to look for its hidden slot.",slotHint:"The correct slot reacts when the correct shard gets close.",unlockedHint:"All shards are placed. The mini-game hook is ready.",aboutTitle:"About / Outro",home:"Home",gameScore:"Score",gameBest:"Best",gameBestDistance:"Best distance",gameChain:"Chain",gameMomentum:"Momentum",gameCharge:"Charge",gameDistance:"Distance",gameCoins:"Coins",gameSplits:"Splits",gameRestart:"Restart",gamePortfolio:"Portfolio",gameStatusTransition:"Aligning the path.",gameStatusRunning:"Hold Down to charge. Press Up to jump.",gameStatusUpgrade:"Jump into a branch to claim an item.",gameStatusGameOver:"Run over.",gameUpgradeTitle:"Choose an upgrade",gameUpgradeHint:"Jump into a branch. 1, 2, 3 remain available as fallback.",gameShopTitle:"Orbital market",gameShopHint:"Rotate around the shard to buy one offer.",gameShopClose:"Return",gamePathLeft:"Left path",gamePathCenter:"Center path",gamePathRight:"Right path",gamePathUpper:"Upper path",gamePathForward:"Forward path",gamePathLower:"Lower path",gameShopOffer:"Orbital offer",gamePrice:"Price",gameOverTitle:"Game Over",gameOverBody:"The camera overtook you or the jump line was lost.",gameOverCamera:"The camera left you behind.",gameOverEnemy:"An enemy hit you from the front.",gameOverBounds:"You left the playable zone.",gameAcquired:"Item acquired",gameLandingMiss:"Miss",gameLandingGood:"Good",gameLandingSuper:"Super",gameLandingPerfect:"Perfect",gameLandingTwist:"Twist"}};class Lv{constructor(){y(this,"language");y(this,"listeners",new Set);const e=window.localStorage.getItem("portfolio-language");this.language=e==="en"?"en":"fr",document.documentElement.lang=this.language}get current(){return this.language}toggle(){this.language=this.language==="fr"?"en":"fr",window.localStorage.setItem("portfolio-language",this.language),document.documentElement.lang=this.language,this.listeners.forEach(e=>e(this.language))}t(e){return Pv[this.language][e]}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}}class Iv{constructor(e,t,i,n){y(this,"element");y(this,"topbar");y(this,"activeChip");y(this,"themeButton");y(this,"languageButton");y(this,"aboutButton");y(this,"homeButton");y(this,"unlockChip");y(this,"projectRail");y(this,"dots",[]);y(this,"gameModeActive",!1);this.i18n=t,this.content=i,this.element=document.createElement("div"),this.element.className="navigation-hud",this.topbar=document.createElement("div"),this.topbar.className="navigation-hud__topbar",this.activeChip=document.createElement("div"),this.activeChip.className="navigation-hud__chip",this.themeButton=this.createButton(()=>n.onThemeToggle()),this.languageButton=this.createButton(()=>n.onLanguageToggle()),this.aboutButton=this.createButton(()=>n.onAboutToggle()),this.homeButton=this.createButton(()=>n.onHome()),this.unlockChip=document.createElement("div"),this.unlockChip.className="navigation-hud__chip navigation-hud__chip--status",this.topbar.append(this.activeChip,this.homeButton,this.themeButton,this.languageButton,this.aboutButton,this.unlockChip),this.projectRail=document.createElement("div"),this.projectRail.className="navigation-hud__rail",this.content.getProjects().forEach((r,a)=>{const o=document.createElement("button");o.className="navigation-hud__dot",o.type="button",o.addEventListener("click",()=>n.onProjectSelect(a)),this.projectRail.appendChild(o),this.dots.push(o)}),this.element.append(this.topbar,this.projectRail),e.appendChild(this.element),this.i18n.onChange(()=>this.renderStatic()),this.renderStatic()}setActiveProject(e,t){const i=this.content.getProjectByOrder(e);this.activeChip.textContent=i?i.title[t]:"",this.dots.forEach((n,r)=>{var a;n.classList.toggle("is-active",r===e),n.title=((a=this.content.getProjectByOrder(r))==null?void 0:a.title[t])||""})}setUnlocked(e){this.unlockChip.textContent=e?this.i18n.t("unlocked"):this.i18n.t("locked"),this.unlockChip.classList.toggle("is-unlocked",e)}setAboutOpen(e){this.aboutButton.classList.toggle("is-active",e)}setGameModeNavigation(e){this.gameModeActive=e,this.activeChip.hidden=e,this.aboutButton.hidden=e,this.unlockChip.hidden=e,this.projectRail.hidden=e,this.renderStatic()}createButton(e){const t=document.createElement("button");return t.className="navigation-hud__button",t.type="button",t.addEventListener("click",e),t}renderStatic(){this.themeButton.textContent=this.i18n.t("theme"),this.languageButton.textContent=this.i18n.t("language"),this.aboutButton.textContent=this.i18n.t("about"),this.homeButton.textContent=this.gameModeActive?this.i18n.t("gamePortfolio"):this.i18n.t("home")}}class Dv{constructor(){y(this,"theme");y(this,"listeners",new Set);const e=window.localStorage.getItem("portfolio-theme");e==="dark"||e==="light"?this.theme=e:this.theme=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",this.applyTheme()}get current(){return this.theme}toggle(){this.theme=this.theme==="dark"?"light":"dark",this.applyTheme()}set(e){e!==this.theme&&(this.theme=e,this.applyTheme())}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}applyTheme(){document.documentElement.dataset.theme=this.theme,window.localStorage.setItem("portfolio-theme",this.theme),this.listeners.forEach(e=>e(this.theme))}}const Uv={intro:["intro_shattering"],intro_shattering:["intro_transition"],intro_transition:["orbit"],orbit:["dragging","focus_enter","about_section","constellation_complete","game_transition"],dragging:["orbit","constellation_complete","game_transition"],focus_enter:["focus","focus_exit"],focus:["focus_facet_transition","focus_exit"],focus_facet_transition:["focus"],focus_exit:["orbit","constellation_complete"],about_section:["orbit","constellation_complete"],constellation_complete:["focus_enter","about_section","orbit","game_transition"],game_transition:["game","orbit","constellation_complete"],game:["game_over","orbit","game_transition"],game_over:["game","orbit","game_transition"]};class Fv{constructor(){y(this,"mode","intro");y(this,"listeners",new Set)}get current(){return this.mode}is(e){return this.mode===e}canTransition(e){return e===this.mode?!0:Uv[this.mode].includes(e)}setMode(e){if(!this.canTransition(e))throw new Error(`Invalid mode transition from ${this.mode} to ${e}`);if(e===this.mode)return;const t=this.mode;this.mode=e,this.listeners.forEach(i=>i(e,t))}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}}class Nv{constructor(e){y(this,"running",!1);y(this,"frameId",0);y(this,"lastTime",0);y(this,"tick",e=>{if(!this.running)return;const t=Math.min((e-this.lastTime)/1e3,.1);this.lastTime=e,this.onFrame(t,e/1e3),this.frameId=requestAnimationFrame(this.tick)});this.onFrame=e}start(){this.running||(this.running=!0,this.lastTime=performance.now(),this.frameId=requestAnimationFrame(this.tick))}stop(){this.running=!1,cancelAnimationFrame(this.frameId)}}const Ov={linear:s=>s,easeOutCubic:s=>1-Math.pow(1-s,3),easeInOutCubic:s=>s<.5?4*s*s*s:1-Math.pow(-2*s+2,3)/2,easeOutQuint:s=>1-Math.pow(1-s,5)};class Bv{constructor(){y(this,"tweens",new Map);y(this,"nextId",1)}animate(e){const t=this.nextId++,i={id:t,elapsed:0,...e};return i.onUpdate(i.from),this.tweens.set(t,i),t}cancel(e){this.tweens.delete(e)}clear(){this.tweens.clear()}update(e){var t;for(const i of this.tweens.values()){i.elapsed+=e;const n=Math.min(1,i.elapsed/i.duration),r=Ov[i.easing](n);i.onUpdate(i.from+(i.to-i.from)*r),n>=1&&(this.tweens.delete(i.id),(t=i.onComplete)==null||t.call(i))}}}class zv{constructor(e){y(this,"content",new C0);y(this,"theme",new Dv);y(this,"i18n",new Lv);y(this,"mode",new Fv);y(this,"transitions",new Bv);y(this,"root");y(this,"canvasHost");y(this,"uiHost");y(this,"renderer");y(this,"slotSystem");y(this,"world");y(this,"intro");y(this,"guide");y(this,"hud");y(this,"about");y(this,"focus");y(this,"gameHud");y(this,"game");y(this,"interaction");y(this,"loop");y(this,"cameraOrbit",new mv);y(this,"introStartCameraPosition",new T(0,1.6,42));y(this,"introStartLookAt",new T(0,0,0));y(this,"cameraFocusBlend",0);y(this,"introTransitionProgress",0);y(this,"gameTransitionProgress",0);y(this,"activeIndex",0);y(this,"lastWheelAt",0);y(this,"hasFocused",!1);y(this,"hasChangedFacet",!1);y(this,"hasDragged",!1);y(this,"seenFacetsByProject",new Map);y(this,"pendingPostFocusExit",null);y(this,"didRunIntroPresentationFocus",!1);y(this,"gameTransitionTweenId",null);y(this,"mobileChargePointerId",null);y(this,"mobileChargeStartY",0);y(this,"mobileChargeStartedAt",0);y(this,"onWheel",e=>{(this.mode.is("orbit")||this.mode.is("constellation_complete"))&&(Date.now()-this.lastWheelAt<120||(this.lastWheelAt=Date.now(),e.preventDefault(),this.stepActiveIndex(e.deltaY>0?1:-1)))});y(this,"onKeyDown",e=>{if(this.mode.is("game_transition")){e.key==="Escape"&&(e.preventDefault(),this.exitGame());return}if(this.mode.is("game")||this.mode.is("game_over")){if(e.key==="Escape"){e.preventDefault(),this.exitGame();return}if(this.mode.is("game")){if(this.game.getHudState().state==="upgrade_choice"&&(e.key==="1"||e.key==="2"||e.key==="3")){e.preventDefault(),this.game.selectUpgradeFallback(Number(e.key)-1)&&this.refreshUI();return}e.key==="ArrowDown"?(e.preventDefault(),this.game.setChargeActive(!0)):e.key==="ArrowUp"&&(e.preventDefault(),this.game.triggerJump());return}(e.key==="Enter"||e.key===" "||e.key==="ArrowUp")&&(e.preventDefault(),this.restartGame());return}if(!(this.mode.is("intro")||this.mode.is("intro_shattering")||this.mode.is("intro_transition"))){if(e.key==="Escape"){this.about.opened?this.about.close():this.exitFocus();return}if(this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition")){e.key==="ArrowLeft"?(e.preventDefault(),this.changeFacet(-1)):e.key==="ArrowRight"&&(e.preventDefault(),this.changeFacet(1));return}if(this.mode.is("orbit")||this.mode.is("constellation_complete")){if(e.key==="ArrowLeft"||e.key==="ArrowUp")e.preventDefault(),this.stepActiveIndex(-1);else if(e.key==="ArrowRight"||e.key==="ArrowDown")e.preventDefault(),this.stepActiveIndex(1);else if(e.key==="Enter"||e.key===" "){e.preventDefault();const t=this.content.getProjectByOrder(this.activeIndex);t&&this.enterFocus(t.id)}}}});y(this,"onKeyUp",e=>{this.mode.is("game")&&e.key==="ArrowDown"&&this.game.setChargeActive(!1)});y(this,"onGamePointerDown",e=>{if(this.mode.is("game_over")){e.preventDefault(),this.restartGame();return}this.mode.is("game")&&(this.mobileChargePointerId=e.pointerId,this.mobileChargeStartY=e.clientY,this.mobileChargeStartedAt=performance.now(),this.game.setChargeActive(!0))});y(this,"onGamePointerUp",e=>{if(!this.mode.is("game")||this.mobileChargePointerId!==e.pointerId)return;const t=this.mobileChargeStartY-e.clientY,i=performance.now()-this.mobileChargeStartedAt;!this.game.setChargeActive(!1)&&(i<180||t>12)&&(this.game.triggerJump(),e.preventDefault()),this.mobileChargePointerId=null,this.mobileChargeStartedAt=0});y(this,"onGamePointerCancel",e=>{this.mobileChargePointerId===e.pointerId&&(this.mobileChargePointerId=null,this.mobileChargeStartedAt=0,this.game.setChargeActive(!1))});this.root=document.createElement("div"),this.root.className="app-shell",this.canvasHost=document.createElement("div"),this.canvasHost.className="app-shell__canvas",this.uiHost=document.createElement("div"),this.uiHost.className="app-shell__ui",this.root.append(this.canvasHost,this.uiHost),e.appendChild(this.root),this.renderer=new Av(this.canvasHost),this.slotSystem=new Wa(this.content.getProjects().filter(t=>t.role!=="presentation").map(t=>t.id)),this.world=new Mv(this.renderer.scene,this.content.getProjects(),this.slotSystem,this.theme.current),this.game=new pv(this.renderer.scene,this.theme.current),this.hud=new Iv(this.uiHost,this.i18n,this.content,{onThemeToggle:()=>this.theme.toggle(),onLanguageToggle:()=>this.i18n.toggle(),onAboutToggle:()=>this.toggleAbout(),onHome:()=>this.returnHome(),onProjectSelect:t=>this.selectProject(t)}),this.about=new Tv(this.uiHost,this.i18n),this.focus=new Cv(this.uiHost,this.i18n,{onClose:()=>this.exitFocus(),onPrevFacet:()=>this.changeFacet(-1),onNextFacet:()=>this.changeFacet(1)}),this.guide=new Rv(this.uiHost,this.i18n),this.intro=new gv(this.uiHost,this.i18n,this.theme),this.gameHud=new G0(this.uiHost,this.i18n,{onRestart:()=>this.restartGame(),onExit:()=>this.exitGame(),onCloseShop:()=>{this.game.closeShopChoice()&&this.refreshUI()},onSelectUpgrade:t=>{this.game.selectUpgradeFallback(t)&&this.refreshUI()}}),this.interaction=new bv(this.renderer.renderer.domElement,this.renderer.camera,this.world,()=>this.mode.current,{onShardClick:t=>this.enterFocus(t),onBackgroundClick:()=>{(this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition"))&&this.exitFocus()},onHover:t=>this.world.setHovered(t),onDragStart:(t,i)=>{if(!(this.mode.is("orbit")||this.mode.is("constellation_complete")))return!1;const n=this.world.beginDrag(t,i);return n&&(this.mode.setMode("dragging"),this.world.setHovered(null)),n},onDragMove:t=>{this.world.updateDrag(t)},onDragEnd:()=>{const t=this.world.endDrag();t.shardId&&(this.hasDragged=!0),!t.unlocked&&this.mode.is("dragging")&&this.resumeOrbitMode(),this.refreshUI(),this.updateGuide()},onSceneOrbitMove:(t,i)=>{(this.mode.is("orbit")||this.mode.is("constellation_complete"))&&this.cameraOrbit.orbit(-t,i)},onFocusRotation:t=>this.world.previewFacetRotation(t),onFocusRotationEnd:()=>{this.world.finishFacetRotation()&&(this.mode.setMode("focus_facet_transition"),this.scheduleFacetCompletion())},onFocusSideTap:t=>this.changeFacet(t==="left"?-1:1)}),this.interaction,this.loop=new Nv((t,i)=>this.update(t,i)),this.bindEvents(),this.refreshUI(),this.updateGuide(),this.loop.start()}bindEvents(){this.theme.onChange(t=>{this.renderer.setTheme(t),this.world.setTheme(t),this.game.setTheme(t),this.refreshUI()}),this.i18n.onChange(()=>{this.refreshUI();const t=this.world.getFocusedProject();t&&this.focus.show(t,this.world.getFocusedFacetIndex()),(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))&&this.gameHud.update(this.getGameHudPayload())}),this.game.onScoreChange(()=>{(this.mode.is("game")||this.mode.is("game_over"))&&this.refreshUI()}),this.about.onClose=()=>{this.mode.is("about_section")&&(this.resumeOrbitMode(),this.refreshUI(),this.updateGuide())},this.intro.onBroken=()=>{this.mode.is("intro")&&(this.mode.setMode("intro_shattering"),window.setTimeout(()=>{this.mode.is("intro_shattering")&&this.mode.setMode("intro_transition")},60),this.transitions.animate({from:0,to:1,duration:2.6,easing:"easeOutQuint",onUpdate:t=>{this.introTransitionProgress=t},onComplete:()=>{if(this.introTransitionProgress=1,this.resumeOrbitMode(),this.refreshUI(),this.updateGuide(),!this.didRunIntroPresentationFocus){const t=this.world.getPresentationProjectId();t&&(this.didRunIntroPresentationFocus=!0,this.activeIndex=0,this.world.setActiveIndex(0),window.setTimeout(()=>{this.mode.is("orbit")&&this.enterFocus(t)},220))}}}))},this.world.onUnlocked(()=>{this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over")||(this.mode.is("constellation_complete")||(this.mode.is("dragging")||this.mode.is("orbit"))&&this.mode.setMode("constellation_complete"),this.refreshUI(),this.updateGuide(),this.transitions.animate({from:0,to:1,duration:.9,easing:"easeOutCubic",onUpdate:()=>{},onComplete:()=>{this.slotSystem.isUnlocked()&&this.startGameTransition()}}))}),window.addEventListener("wheel",this.onWheel,{passive:!1}),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp);const e=this.renderer.renderer.domElement;e.addEventListener("pointerdown",this.onGamePointerDown),e.addEventListener("pointerup",this.onGamePointerUp),e.addEventListener("pointercancel",this.onGamePointerCancel)}stepActiveIndex(e){this.activeIndex=er(this.activeIndex+e,this.content.getProjectCount()),this.world.setActiveIndex(this.activeIndex),this.refreshUI()}selectProject(e){if(this.mode.is("intro")||this.mode.is("intro_shattering")||this.mode.is("intro_transition")||this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))return;this.about.opened&&this.about.close(),this.activeIndex=e,this.world.setActiveIndex(e),this.refreshUI();const t=this.content.getProjectByOrder(e);t&&(this.mode.is("orbit")||this.mode.is("constellation_complete"))&&this.enterFocus(t.id)}enterFocus(e){(this.mode.is("orbit")||this.mode.is("constellation_complete"))&&(this.mode.setMode("focus_enter"),this.world.setFocused(e),this.world.setHovered(null),this.refreshUI())}exitFocus(e){if(!(this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition"))){e==null||e();return}const t=this.world.getFocusedProject();this.pendingPostFocusExit=e||null,this.focus.hide(),this.mode.setMode("focus_exit"),this.world.clearFocus(),this.transitions.animate({from:0,to:1,duration:.55,easing:"easeOutCubic",onUpdate:()=>{},onComplete:()=>{this.resumeOrbitMode(),t&&this.hasSeenAllFacets(t.id)&&this.world.snapShardToSlot(t.id);const i=this.pendingPostFocusExit;this.pendingPostFocusExit=null,i==null||i(),this.refreshUI(),this.updateGuide()}})}changeFacet(e){!this.mode.is("focus")||!this.world.changeFacet(e)||(this.mode.setMode("focus_facet_transition"),this.scheduleFacetCompletion())}scheduleFacetCompletion(){this.transitions.animate({from:0,to:1,duration:.68,easing:"easeInOutCubic",onUpdate:()=>{},onComplete:()=>{if(!this.mode.is("focus_facet_transition"))return;this.mode.setMode("focus");const e=this.world.getFocusedProject();e&&(this.markFacetSeen(e.id,this.world.getFocusedFacetIndex()),this.focus.updateFacet(this.world.getFocusedFacetIndex()),this.hasChangedFacet=!0,this.updateGuide())}})}toggleAbout(){if(this.mode.is("intro")||this.mode.is("intro_shattering")||this.mode.is("intro_transition")||this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))return;if(this.about.opened){this.about.close();return}const e=()=>{this.about.open(),this.mode.setMode("about_section"),this.refreshUI(),this.updateGuide()};if(this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition")){this.exitFocus(e);return}e()}returnHome(){(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))&&this.exitGame(),this.activeIndex=0,this.world.setActiveIndex(0),this.about.opened&&this.about.close(),(this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition"))&&this.exitFocus(),this.refreshUI()}resumeOrbitMode(){if(this.slotSystem.isUnlocked()){this.mode.is("constellation_complete")||(this.mode.is("focus_exit")||this.mode.is("about_section")||this.mode.is("dragging")||this.mode.is("orbit")||this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))&&this.mode.setMode("constellation_complete");return}this.mode.is("orbit")||this.mode.setMode("orbit")}startGameTransition(){if(!this.slotSystem.isUnlocked()||this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))return;if(this.about.opened&&this.about.close(),this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition")){this.exitFocus(()=>this.startGameTransition());return}this.mode.is("dragging")&&this.resumeOrbitMode(),this.mode.is("constellation_complete")||this.mode.setMode("constellation_complete"),this.gameTransitionTweenId!==null&&(this.transitions.cancel(this.gameTransitionTweenId),this.gameTransitionTweenId=null),this.mode.setMode("game_transition"),this.gameTransitionProgress=0,this.game.startTransition();const e=this.getGameFieldCount();this.world.beginExternalLayoutTransition(this.game.getInitialPlatformPositions(e),this.game.getInitialPlatformScales(e),this.game.getInitialPlatformVisuals(e)),this.refreshUI(),this.gameTransitionTweenId=this.transitions.animate({from:0,to:1,duration:2.25,easing:"easeInOutCubic",onUpdate:t=>{this.gameTransitionProgress=t,this.world.setExternalLayoutProgress(t)},onComplete:()=>{this.gameTransitionTweenId=null,this.gameTransitionProgress=1,this.mode.setMode("game"),this.game.beginRun();const t=this.getGameFieldCount();this.world.setExternalLayoutPositions(this.game.getVisiblePlatformPositions(t),this.game.getVisiblePlatformScales(t),this.game.getVisiblePlatformVisuals(t)),this.refreshUI()}})}restartGame(){if(!(this.mode.is("game")||this.mode.is("game_over")))return;this.mode.is("game_over")&&this.mode.setMode("game"),this.game.restart();const e=this.getGameFieldCount();this.world.setExternalLayoutPositions(this.game.getVisiblePlatformPositions(e),this.game.getVisiblePlatformScales(e),this.game.getVisiblePlatformVisuals(e)),this.refreshUI()}exitGame(){if(!(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over")))return;this.gameTransitionTweenId!==null&&(this.transitions.cancel(this.gameTransitionTweenId),this.gameTransitionTweenId=null),this.mobileChargePointerId=null,this.game.setChargeActive(!1);const e=this.world.getOrbitPositions();this.world.beginExternalLayoutTransition(e),this.game.prepareReturnTransition(),(this.mode.is("game")||this.mode.is("game_over"))&&this.mode.setMode("game_transition"),this.gameTransitionTweenId=this.transitions.animate({from:this.gameTransitionProgress,to:0,duration:1.25,easing:"easeInOutCubic",onUpdate:t=>{this.gameTransitionProgress=t,this.world.setExternalLayoutProgress(1-t)},onComplete:()=>{this.gameTransitionTweenId=null,this.game.stop(),this.gameTransitionProgress=0,this.slotSystem.reset(),this.interaction.reset(),this.world.resetPortfolioState(),this.activeIndex=0,this.world.setActiveIndex(0),this.resumeOrbitMode(),this.refreshUI(),this.updateGuide()}})}getGameHudPayload(){const e=this.game.getHudState();return{score:e.score,highscore:e.highscore,distanceMeters:e.distanceMeters,bestDistanceMeters:e.bestDistanceMeters,coins:e.coins,splitTimes:e.splitTimes,chargeRatio:e.chargeRatio,momentumGauge:e.momentumGauge,momentumTier:e.momentumTier,orbitGraceActive:e.orbitGraceActive,orbitGraceProgress:e.orbitGraceProgress,state:e.state,offers:e.offers,branchHints:e.branchHints.reduce((t,i)=>{const n=this.renderer.projectWorldToScreen(i.worldPosition);return n.visible&&t.push({slot:i.slot,offer:i.offer,screenX:n.x,screenY:n.y,mode:i.mode,price:i.price}),t},[]),inventoryItems:e.inventoryItems,landingFeedback:e.landingFeedback?(()=>{const t=this.renderer.projectWorldToScreen(e.landingFeedback.worldPosition);return{grade:e.landingFeedback.grade,twist:e.landingFeedback.twist,progress:e.landingFeedback.progress,screenX:Ct.clamp(t.x,24,window.innerWidth-24),screenY:Ct.clamp(t.y,24,window.innerHeight-24)}})():null,acquisition:e.acquisition,gameOverCause:e.gameOverCause}}update(e,t){if(this.transitions.update(e),this.world.update(e,t,this.mode.current),this.game.update(e,t),this.mode.is("game")||this.mode.is("game_over")){const f=this.getGameFieldCount();this.world.setExternalLayoutPositions(this.game.getVisiblePlatformPositions(f),this.game.getVisiblePlatformScales(f),this.game.getVisiblePlatformVisuals(f))}if(this.mode.is("focus_enter")&&this.world.isFocusSettled()){this.mode.setMode("focus");const f=this.world.getFocusedProject();f&&(this.markFacetSeen(f.id,this.world.getFocusedFacetIndex()),this.focus.show(f,this.world.getFocusedFacetIndex()),this.hasFocused=!0,this.updateGuide())}this.mode.is("game")&&this.game.currentState==="game_over"&&this.mode.setMode("game_over"),this.cameraFocusBlend=Me(this.cameraFocusBlend,this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition")||this.mode.is("focus_exit")?1:0,8,e);const i=this.world.getOrbitCameraPose(),n=this.cameraOrbit.update(e,this.world.getPivot()),r=this.world.getFocusCameraPose(),a=this.game.getCameraPose(),o=n.position.clone().lerp(r.position,this.cameraFocusBlend),l=n.lookAt.clone().lerp(i.lookAt,.18).lerp(r.lookAt,this.cameraFocusBlend),c=o.clone().lerp(a.position,this.gameTransitionProgress),h=l.clone().lerp(a.lookAt,this.gameTransitionProgress),u=this.introStartCameraPosition.clone().lerp(c,this.introTransitionProgress),d=this.introStartLookAt.clone().lerp(h,this.introTransitionProgress);this.renderer.setCameraResponse(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over")?18:8,this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over")?20:8),this.renderer.setCameraTarget(u,d),this.renderer.update(e),(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))&&this.gameHud.update(this.getGameHudPayload()),this.renderer.render(),this.intro.update(e),this.refreshUI()}refreshUI(){const e=this.world.getFocusedProject(),t=e?this.content.getProjectIndex(e.id):this.activeIndex,i=this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over");this.hud.setActiveProject(t,this.i18n.current),this.hud.setUnlocked(this.slotSystem.isUnlocked()),this.hud.setAboutOpen(this.about.opened),this.hud.setGameModeNavigation(i),this.hud.element.classList.remove("is-hidden"),this.guide.element.classList.toggle("is-hidden",i),this.gameHud.setVisible(i),i&&this.gameHud.update(this.getGameHudPayload()),this.world.setActiveIndex(this.activeIndex)}getGameFieldCount(){const e=Math.max(this.world.getGameFieldCapacity(),this.game.getRecommendedVisibleCount());return this.world.ensureGameFieldCapacity(e),this.world.getGameFieldCapacity()}updateGuide(){if(!(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))){if(this.slotSystem.isUnlocked()){this.guide.setStep("unlocked");return}if(this.mode.is("intro")||this.mode.is("intro_shattering")||this.mode.is("intro_transition")){this.guide.setStep("intro");return}if(!this.hasFocused){this.guide.setStep("orbit");return}if(!this.hasChangedFacet){this.guide.setStep("focus");return}if(!this.hasDragged){this.guide.setStep("drag");return}this.guide.setStep("slots")}}markFacetSeen(e,t){const i=this.seenFacetsByProject.get(e)??new Set;i.add(t),this.seenFacetsByProject.set(e,i)}hasSeenAllFacets(e){var t;return(((t=this.seenFacetsByProject.get(e))==null?void 0:t.size)??0)>=3}}const Zc=document.getElementById("app");if(!Zc)throw new Error("App root not found");new zv(Zc);
