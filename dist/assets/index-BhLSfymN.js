var Sl=Object.defineProperty;var Ml=(s,e,t)=>e in s?Sl(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var M=(s,e,t)=>Ml(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Kr="160",bl=0,Eo=1,El=2,bc=1,Tl=2,ui=3,Ti=0,Lt=1,Yt=2,Mi=0,dn=1,To=2,Ao=3,wo=4,Al=5,Di=100,wl=101,Pl=102,Po=103,Co=104,Cl=200,Rl=201,Ll=202,Il=203,Ur=204,Nr=205,Dl=206,Ul=207,Nl=208,Fl=209,Ol=210,kl=211,Bl=212,zl=213,Gl=214,Vl=0,Hl=1,Wl=2,Rs=3,Xl=4,ql=5,jl=6,Yl=7,Ec=0,Jl=1,Zl=2,bi=0,Kl=1,$l=2,Ql=3,eh=4,th=5,ih=6,Tc=300,pn=301,mn=302,Fr=303,Or=304,ks=306,kr=1e3,Jt=1001,Br=1002,Ct=1003,Ro=1004,Ks=1005,Gt=1006,nh=1007,Nn=1008,Ei=1009,sh=1010,rh=1011,$r=1012,Ac=1013,yi=1014,Si=1015,Fn=1016,wc=1017,Pc=1018,Ni=1020,oh=1021,Zt=1023,ah=1024,ch=1025,Fi=1026,gn=1027,lh=1028,Cc=1029,hh=1030,Rc=1031,Lc=1033,$s=33776,Qs=33777,er=33778,tr=33779,Lo=35840,Io=35841,Do=35842,Uo=35843,Ic=36196,No=37492,Fo=37496,Oo=37808,ko=37809,Bo=37810,zo=37811,Go=37812,Vo=37813,Ho=37814,Wo=37815,Xo=37816,qo=37817,jo=37818,Yo=37819,Jo=37820,Zo=37821,ir=36492,Ko=36494,$o=36495,uh=36283,Qo=36284,ea=36285,ta=36286,Dc=3e3,Oi=3001,dh=3200,fh=3201,Uc=0,ph=1,Vt="",dt="srgb",fi="srgb-linear",Qr="display-p3",Bs="display-p3-linear",Ls="linear",nt="srgb",Is="rec709",Ds="p3",Hi=7680,ia=519,mh=512,gh=513,_h=514,Nc=515,vh=516,xh=517,yh=518,Sh=519,na=35044,sa="300 es",zr=1035,di=2e3,Us=2001;class vn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const n=this._listeners[e];if(n!==void 0){const r=n.indexOf(t);r!==-1&&n.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const n=i.slice(0);for(let r=0,o=n.length;r<o;r++)n[r].call(this,e);e.target=null}}}const bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ra=1234567;const Pn=Math.PI/180,On=180/Math.PI;function Gi(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(bt[s&255]+bt[s>>8&255]+bt[s>>16&255]+bt[s>>24&255]+"-"+bt[e&255]+bt[e>>8&255]+"-"+bt[e>>16&15|64]+bt[e>>24&255]+"-"+bt[t&63|128]+bt[t>>8&255]+"-"+bt[t>>16&255]+bt[t>>24&255]+bt[i&255]+bt[i>>8&255]+bt[i>>16&255]+bt[i>>24&255]).toLowerCase()}function St(s,e,t){return Math.max(e,Math.min(t,s))}function eo(s,e){return(s%e+e)%e}function Mh(s,e,t,i,n){return i+(s-e)*(n-i)/(t-e)}function bh(s,e,t){return s!==e?(t-s)/(e-s):0}function Cn(s,e,t){return(1-t)*s+t*e}function Eh(s,e,t,i){return Cn(s,e,1-Math.exp(-t*i))}function Th(s,e=1){return e-Math.abs(eo(s,e*2)-e)}function Ah(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function wh(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Ph(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Ch(s,e){return s+Math.random()*(e-s)}function Rh(s){return s*(.5-Math.random())}function Lh(s){s!==void 0&&(ra=s);let e=ra+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ih(s){return s*Pn}function Dh(s){return s*On}function Gr(s){return(s&s-1)===0&&s!==0}function Uh(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Ns(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Nh(s,e,t,i,n){const r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+i)/2),h=o((e+i)/2),u=r((e-i)/2),d=o((e-i)/2),p=r((i-e)/2),g=o((i-e)/2);switch(n){case"XYX":s.set(a*h,c*u,c*d,a*l);break;case"YZY":s.set(c*d,a*h,c*u,a*l);break;case"ZXZ":s.set(c*u,c*d,a*h,a*l);break;case"XZX":s.set(a*h,c*g,c*p,a*l);break;case"YXY":s.set(c*p,a*h,c*g,a*l);break;case"ZYZ":s.set(c*g,c*p,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function cn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function wt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const qt={DEG2RAD:Pn,RAD2DEG:On,generateUUID:Gi,clamp:St,euclideanModulo:eo,mapLinear:Mh,inverseLerp:bh,lerp:Cn,damp:Eh,pingpong:Th,smoothstep:Ah,smootherstep:wh,randInt:Ph,randFloat:Ch,randFloatSpread:Rh,seededRandom:Lh,degToRad:Ih,radToDeg:Dh,isPowerOfTwo:Gr,ceilPowerOfTwo:Uh,floorPowerOfTwo:Ns,setQuaternionFromProperEuler:Nh,normalize:wt,denormalize:cn};class se{constructor(e=0,t=0){se.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(St(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),n=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*n+e.x,this.y=r*n+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qe{constructor(e,t,i,n,r,o,a,c,l){qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,o,a,c,l)}set(e,t,i,n,r,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=n,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=i,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],h=i[4],u=i[7],d=i[2],p=i[5],g=i[8],_=n[0],m=n[3],f=n[6],b=n[1],v=n[4],y=n[7],R=n[2],P=n[5],C=n[8];return r[0]=o*_+a*b+c*R,r[3]=o*m+a*v+c*P,r[6]=o*f+a*y+c*C,r[1]=l*_+h*b+u*R,r[4]=l*m+h*v+u*P,r[7]=l*f+h*y+u*C,r[2]=d*_+p*b+g*R,r[5]=d*m+p*v+g*P,r[8]=d*f+p*y+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-i*r*h+i*a*c+n*r*l-n*o*c}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*r,p=l*r-o*c,g=t*u+i*d+n*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(n*l-h*i)*_,e[2]=(a*i-n*o)*_,e[3]=d*_,e[4]=(h*t-n*c)*_,e[5]=(n*r-a*t)*_,e[6]=p*_,e[7]=(i*c-l*t)*_,e[8]=(o*t-i*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-n*l,n*c,-n*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(nr.makeScale(e,t)),this}rotate(e){return this.premultiply(nr.makeRotation(-e)),this}translate(e,t){return this.premultiply(nr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<9;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const nr=new qe;function Fc(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function kn(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Fh(){const s=kn("canvas");return s.style.display="block",s}const oa={};function Rn(s){s in oa||(oa[s]=!0,console.warn(s))}const aa=new qe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ca=new qe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Jn={[fi]:{transfer:Ls,primaries:Is,toReference:s=>s,fromReference:s=>s},[dt]:{transfer:nt,primaries:Is,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[Bs]:{transfer:Ls,primaries:Ds,toReference:s=>s.applyMatrix3(ca),fromReference:s=>s.applyMatrix3(aa)},[Qr]:{transfer:nt,primaries:Ds,toReference:s=>s.convertSRGBToLinear().applyMatrix3(ca),fromReference:s=>s.applyMatrix3(aa).convertLinearToSRGB()}},Oh=new Set([fi,Bs]),$e={enabled:!0,_workingColorSpace:fi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Oh.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;const i=Jn[e].toReference,n=Jn[t].fromReference;return n(i(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return Jn[s].primaries},getTransfer:function(s){return s===Vt?Ls:Jn[s].transfer}};function fn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function sr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Wi;class Oc{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Wi===void 0&&(Wi=kn("canvas")),Wi.width=e.width,Wi.height=e.height;const i=Wi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Wi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=kn("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const n=i.getImageData(0,0,e.width,e.height),r=n.data;for(let o=0;o<r.length;o++)r[o]=fn(r[o]/255)*255;return i.putImageData(n,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(fn(t[i]/255)*255):t[i]=fn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let kh=0;class kc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:kh++}),this.uuid=Gi(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let o=0,a=n.length;o<a;o++)n[o].isDataTexture?r.push(rr(n[o].image)):r.push(rr(n[o]))}else r=rr(n);i.url=r}return t||(e.images[this.uuid]=i),i}}function rr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Oc.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Bh=0;class It extends vn{constructor(e=It.DEFAULT_IMAGE,t=It.DEFAULT_MAPPING,i=Jt,n=Jt,r=Gt,o=Nn,a=Zt,c=Ei,l=It.DEFAULT_ANISOTROPY,h=Vt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bh++}),this.uuid=Gi(),this.name="",this.source=new kc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new se(0,0),this.repeat=new se(1,1),this.center=new se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Rn("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Oi?dt:Vt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Tc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case kr:e.x=e.x-Math.floor(e.x);break;case Jt:e.x=e.x<0?0:1;break;case Br:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case kr:e.y=e.y-Math.floor(e.y);break;case Jt:e.y=e.y<0?0:1;break;case Br:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Rn("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===dt?Oi:Dc}set encoding(e){Rn("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Oi?dt:Vt}}It.DEFAULT_IMAGE=null;It.DEFAULT_MAPPING=Tc;It.DEFAULT_ANISOTROPY=1;class st{constructor(e=0,t=0,i=0,n=1){st.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*n+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*n+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*n+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*n+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n,r;const c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],p=c[5],g=c[9],_=c[2],m=c[6],f=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(l+1)/2,y=(p+1)/2,R=(f+1)/2,P=(h+d)/4,C=(u+_)/4,N=(g+m)/4;return v>y&&v>R?v<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(v),n=P/i,r=C/i):y>R?y<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(y),i=P/n,r=N/n):R<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(R),i=C/r,n=N/r),this.set(i,n,r,t),this}let b=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(u-_)/b,this.z=(d-h)/b,this.w=Math.acos((l+p+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class zh extends vn{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new st(0,0,e,t),this.scissorTest=!1,this.viewport=new st(0,0,e,t);const n={width:e,height:t,depth:1};i.encoding!==void 0&&(Rn("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Oi?dt:Vt),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new It(n,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new kc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ki extends zh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Bc extends It{constructor(e=null,t=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Gh extends It{constructor(e=null,t=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Vn{constructor(e=0,t=0,i=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=n}static slerpFlat(e,t,i,n,r,o,a){let c=i[n+0],l=i[n+1],h=i[n+2],u=i[n+3];const d=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(u!==_||c!==d||l!==p||h!==g){let m=1-a;const f=c*d+l*p+h*g+u*_,b=f>=0?1:-1,v=1-f*f;if(v>Number.EPSILON){const R=Math.sqrt(v),P=Math.atan2(R,f*b);m=Math.sin(m*P)/R,a=Math.sin(a*P)/R}const y=a*b;if(c=c*m+d*y,l=l*m+p*y,h=h*m+g*y,u=u*m+_*y,m===1-a){const R=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=R,l*=R,h*=R,u*=R}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,n,r,o){const a=i[n],c=i[n+1],l=i[n+2],h=i[n+3],u=r[o],d=r[o+1],p=r[o+2],g=r[o+3];return e[t]=a*g+h*u+c*p-l*d,e[t+1]=c*g+h*d+l*u-a*p,e[t+2]=l*g+h*p+a*d-c*u,e[t+3]=h*g-a*u-c*d-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,n=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),h=a(n/2),u=a(r/2),d=c(i/2),p=c(n/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"YZX":this._x=d*h*u+l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u-d*p*g;break;case"XZY":this._x=d*h*u-l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],n=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=i+a+u;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-n)*p}else if(i>a&&i>u){const p=2*Math.sqrt(1+i-a-u);this._w=(h-c)/p,this._x=.25*p,this._y=(n+o)/p,this._z=(r+l)/p}else if(a>u){const p=2*Math.sqrt(1+a-i-u);this._w=(r-l)/p,this._x=(n+o)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+u-i-a);this._w=(o-n)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(St(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const n=Math.min(1,t/i);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,n=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+o*a+n*l-r*c,this._y=n*h+o*c+r*a-i*l,this._z=r*h+o*l+i*c-n*a,this._w=o*h-i*a-n*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,n=this._y,r=this._z,o=this._w;let a=o*e._w+i*e._x+n*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=n,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*i+t*this._x,this._y=p*n+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=o*u+this._w*d,this._x=i*u+this._x*d,this._y=n*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),n=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(n),i*Math.sin(r),i*Math.cos(r),t*Math.sin(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class w{constructor(e=0,t=0,i=0){w.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(la.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(la.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*n,this.y=r[1]*t+r[4]*i+r[7]*n,this.z=r[2]*t+r[5]*i+r[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*n+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*n+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*n+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,n=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*n-a*i),h=2*(a*t-r*n),u=2*(r*i-o*t);return this.x=t+c*l+o*u-a*h,this.y=i+c*h+a*l-r*u,this.z=n+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*n,this.y=r[1]*t+r[5]*i+r[9]*n,this.z=r[2]*t+r[6]*i+r[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,n=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=n*c-r*a,this.y=r*o-i*c,this.z=i*a-n*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return or.copy(this).projectOnVector(e),this.sub(or)}reflect(e){return this.sub(or.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(St(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const or=new w,la=new Vn;class Hn{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Ht.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Ht.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Ht.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Ht):Ht.fromBufferAttribute(r,o),Ht.applyMatrix4(e.matrixWorld),this.expandByPoint(Ht);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Zn.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Zn.copy(i.boundingBox)),Zn.applyMatrix4(e.matrixWorld),this.union(Zn)}const n=e.children;for(let r=0,o=n.length;r<o;r++)this.expandByObject(n[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Ht),Ht.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Sn),Kn.subVectors(this.max,Sn),Xi.subVectors(e.a,Sn),qi.subVectors(e.b,Sn),ji.subVectors(e.c,Sn),pi.subVectors(qi,Xi),mi.subVectors(ji,qi),Pi.subVectors(Xi,ji);let t=[0,-pi.z,pi.y,0,-mi.z,mi.y,0,-Pi.z,Pi.y,pi.z,0,-pi.x,mi.z,0,-mi.x,Pi.z,0,-Pi.x,-pi.y,pi.x,0,-mi.y,mi.x,0,-Pi.y,Pi.x,0];return!ar(t,Xi,qi,ji,Kn)||(t=[1,0,0,0,1,0,0,0,1],!ar(t,Xi,qi,ji,Kn))?!1:($n.crossVectors(pi,mi),t=[$n.x,$n.y,$n.z],ar(t,Xi,qi,ji,Kn))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ht).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ht).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ri),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ri=[new w,new w,new w,new w,new w,new w,new w,new w],Ht=new w,Zn=new Hn,Xi=new w,qi=new w,ji=new w,pi=new w,mi=new w,Pi=new w,Sn=new w,Kn=new w,$n=new w,Ci=new w;function ar(s,e,t,i,n){for(let r=0,o=s.length-3;r<=o;r+=3){Ci.fromArray(s,r);const a=n.x*Math.abs(Ci.x)+n.y*Math.abs(Ci.y)+n.z*Math.abs(Ci.z),c=e.dot(Ci),l=t.dot(Ci),h=i.dot(Ci);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Vh=new Hn,Mn=new w,cr=new w;class Wn{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Vh.setFromPoints(e).getCenter(i);let n=0;for(let r=0,o=e.length;r<o;r++)n=Math.max(n,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Mn.subVectors(e,this.center);const t=Mn.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),n=(i-this.radius)*.5;this.center.addScaledVector(Mn,n/i),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(cr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Mn.copy(e.center).add(cr)),this.expandByPoint(Mn.copy(e.center).sub(cr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const oi=new w,lr=new w,Qn=new w,gi=new w,hr=new w,es=new w,ur=new w;class zs{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,oi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=oi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(oi.copy(this.origin).addScaledVector(this.direction,t),oi.distanceToSquared(e))}distanceSqToSegment(e,t,i,n){lr.copy(e).add(t).multiplyScalar(.5),Qn.copy(t).sub(e).normalize(),gi.copy(this.origin).sub(lr);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Qn),a=gi.dot(this.direction),c=-gi.dot(Qn),l=gi.lengthSq(),h=Math.abs(1-o*o);let u,d,p,g;if(h>0)if(u=o*c-a,d=o*a-c,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,p=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),p=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),p=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),p=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),n&&n.copy(lr).addScaledVector(Qn,d),p}intersectSphere(e,t){oi.subVectors(e.center,this.origin);const i=oi.dot(this.direction),n=oi.dot(oi)-i*i,r=e.radius*e.radius;if(n>r)return null;const o=Math.sqrt(r-n),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,n,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(i=(e.min.x-d.x)*l,n=(e.max.x-d.x)*l):(i=(e.max.x-d.x)*l,n=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),i>o||r>n||((r>i||isNaN(i))&&(i=r),(o<n||isNaN(n))&&(n=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),i>c||a>n)||((a>i||i!==i)&&(i=a),(c<n||n!==n)&&(n=c),n<0)?null:this.at(i>=0?i:n,t)}intersectsBox(e){return this.intersectBox(e,oi)!==null}intersectTriangle(e,t,i,n,r){hr.subVectors(t,e),es.subVectors(i,e),ur.crossVectors(hr,es);let o=this.direction.dot(ur),a;if(o>0){if(n)return null;a=1}else if(o<0)a=-1,o=-o;else return null;gi.subVectors(this.origin,e);const c=a*this.direction.dot(es.crossVectors(gi,es));if(c<0)return null;const l=a*this.direction.dot(hr.cross(gi));if(l<0||c+l>o)return null;const h=-a*gi.dot(ur);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class at{constructor(e,t,i,n,r,o,a,c,l,h,u,d,p,g,_,m){at.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,o,a,c,l,h,u,d,p,g,_,m)}set(e,t,i,n,r,o,a,c,l,h,u,d,p,g,_,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=n,f[1]=r,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new at().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,n=1/Yi.setFromMatrixColumn(e,0).length(),r=1/Yi.setFromMatrixColumn(e,1).length(),o=1/Yi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,n=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(n),l=Math.sin(n),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=o*h,p=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=p+g*l,t[5]=d-_*l,t[9]=-a*c,t[2]=_-d*l,t[6]=g+p*l,t[10]=o*c}else if(e.order==="YXZ"){const d=c*h,p=c*u,g=l*h,_=l*u;t[0]=d+_*a,t[4]=g*a-p,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=p*a-g,t[6]=_+d*a,t[10]=o*c}else if(e.order==="ZXY"){const d=c*h,p=c*u,g=l*h,_=l*u;t[0]=d-_*a,t[4]=-o*u,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const d=o*h,p=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=g*l-p,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=p*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const d=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=_-d*u,t[8]=g*u+p,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=p*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=o*c,p=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=o*h,t[9]=p*u-g,t[2]=g*u-p,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Hh,e,Wh)}lookAt(e,t,i){const n=this.elements;return Ut.subVectors(e,t),Ut.lengthSq()===0&&(Ut.z=1),Ut.normalize(),_i.crossVectors(i,Ut),_i.lengthSq()===0&&(Math.abs(i.z)===1?Ut.x+=1e-4:Ut.z+=1e-4,Ut.normalize(),_i.crossVectors(i,Ut)),_i.normalize(),ts.crossVectors(Ut,_i),n[0]=_i.x,n[4]=ts.x,n[8]=Ut.x,n[1]=_i.y,n[5]=ts.y,n[9]=Ut.y,n[2]=_i.z,n[6]=ts.z,n[10]=Ut.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],h=i[1],u=i[5],d=i[9],p=i[13],g=i[2],_=i[6],m=i[10],f=i[14],b=i[3],v=i[7],y=i[11],R=i[15],P=n[0],C=n[4],N=n[8],S=n[12],E=n[1],U=n[5],B=n[9],Q=n[13],I=n[2],k=n[6],V=n[10],Y=n[14],J=n[3],Z=n[7],K=n[11],re=n[15];return r[0]=o*P+a*E+c*I+l*J,r[4]=o*C+a*U+c*k+l*Z,r[8]=o*N+a*B+c*V+l*K,r[12]=o*S+a*Q+c*Y+l*re,r[1]=h*P+u*E+d*I+p*J,r[5]=h*C+u*U+d*k+p*Z,r[9]=h*N+u*B+d*V+p*K,r[13]=h*S+u*Q+d*Y+p*re,r[2]=g*P+_*E+m*I+f*J,r[6]=g*C+_*U+m*k+f*Z,r[10]=g*N+_*B+m*V+f*K,r[14]=g*S+_*Q+m*Y+f*re,r[3]=b*P+v*E+y*I+R*J,r[7]=b*C+v*U+y*k+R*Z,r[11]=b*N+v*B+y*V+R*K,r[15]=b*S+v*Q+y*Y+R*re,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],n=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],p=e[14],g=e[3],_=e[7],m=e[11],f=e[15];return g*(+r*c*u-n*l*u-r*a*d+i*l*d+n*a*p-i*c*p)+_*(+t*c*p-t*l*d+r*o*d-n*o*p+n*l*h-r*c*h)+m*(+t*l*u-t*a*p-r*o*u+i*o*p+r*a*h-i*l*h)+f*(-n*a*h-t*c*u+t*a*d+n*o*u-i*o*d+i*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],p=e[11],g=e[12],_=e[13],m=e[14],f=e[15],b=u*m*l-_*d*l+_*c*p-a*m*p-u*c*f+a*d*f,v=g*d*l-h*m*l-g*c*p+o*m*p+h*c*f-o*d*f,y=h*_*l-g*u*l+g*a*p-o*_*p-h*a*f+o*u*f,R=g*u*c-h*_*c-g*a*d+o*_*d+h*a*m-o*u*m,P=t*b+i*v+n*y+r*R;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/P;return e[0]=b*C,e[1]=(_*d*r-u*m*r-_*n*p+i*m*p+u*n*f-i*d*f)*C,e[2]=(a*m*r-_*c*r+_*n*l-i*m*l-a*n*f+i*c*f)*C,e[3]=(u*c*r-a*d*r-u*n*l+i*d*l+a*n*p-i*c*p)*C,e[4]=v*C,e[5]=(h*m*r-g*d*r+g*n*p-t*m*p-h*n*f+t*d*f)*C,e[6]=(g*c*r-o*m*r-g*n*l+t*m*l+o*n*f-t*c*f)*C,e[7]=(o*d*r-h*c*r+h*n*l-t*d*l-o*n*p+t*c*p)*C,e[8]=y*C,e[9]=(g*u*r-h*_*r-g*i*p+t*_*p+h*i*f-t*u*f)*C,e[10]=(o*_*r-g*a*r+g*i*l-t*_*l-o*i*f+t*a*f)*C,e[11]=(h*a*r-o*u*r-h*i*l+t*u*l+o*i*p-t*a*p)*C,e[12]=R*C,e[13]=(h*_*n-g*u*n+g*i*d-t*_*d-h*i*m+t*u*m)*C,e[14]=(g*a*n-o*_*n-g*i*c+t*_*c+o*i*m-t*a*m)*C,e[15]=(o*u*n-h*a*n+h*i*c-t*u*c-o*i*d+t*a*d)*C,this}scale(e){const t=this.elements,i=e.x,n=e.y,r=e.z;return t[0]*=i,t[4]*=n,t[8]*=r,t[1]*=i,t[5]*=n,t[9]*=r,t[2]*=i,t[6]*=n,t[10]*=r,t[3]*=i,t[7]*=n,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,n))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),n=Math.sin(t),r=1-i,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+i,l*a-n*c,l*c+n*a,0,l*a+n*c,h*a+i,h*c-n*o,0,l*c-n*a,h*c+n*o,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,n,r,o){return this.set(1,i,r,0,e,1,o,0,t,n,1,0,0,0,0,1),this}compose(e,t,i){const n=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,d=r*l,p=r*h,g=r*u,_=o*h,m=o*u,f=a*u,b=c*l,v=c*h,y=c*u,R=i.x,P=i.y,C=i.z;return n[0]=(1-(_+f))*R,n[1]=(p+y)*R,n[2]=(g-v)*R,n[3]=0,n[4]=(p-y)*P,n[5]=(1-(d+f))*P,n[6]=(m+b)*P,n[7]=0,n[8]=(g+v)*C,n[9]=(m-b)*C,n[10]=(1-(d+_))*C,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,i){const n=this.elements;let r=Yi.set(n[0],n[1],n[2]).length();const o=Yi.set(n[4],n[5],n[6]).length(),a=Yi.set(n[8],n[9],n[10]).length();this.determinant()<0&&(r=-r),e.x=n[12],e.y=n[13],e.z=n[14],Wt.copy(this);const l=1/r,h=1/o,u=1/a;return Wt.elements[0]*=l,Wt.elements[1]*=l,Wt.elements[2]*=l,Wt.elements[4]*=h,Wt.elements[5]*=h,Wt.elements[6]*=h,Wt.elements[8]*=u,Wt.elements[9]*=u,Wt.elements[10]*=u,t.setFromRotationMatrix(Wt),i.x=r,i.y=o,i.z=a,this}makePerspective(e,t,i,n,r,o,a=di){const c=this.elements,l=2*r/(t-e),h=2*r/(i-n),u=(t+e)/(t-e),d=(i+n)/(i-n);let p,g;if(a===di)p=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Us)p=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,n,r,o,a=di){const c=this.elements,l=1/(t-e),h=1/(i-n),u=1/(o-r),d=(t+e)*l,p=(i+n)*h;let g,_;if(a===di)g=(o+r)*u,_=-2*u;else if(a===Us)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<16;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Yi=new w,Wt=new at,Hh=new w(0,0,0),Wh=new w(1,1,1),_i=new w,ts=new w,Ut=new w,ha=new at,ua=new Vn;class Gs{constructor(e=0,t=0,i=0,n=Gs.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,n=this._order){return this._x=e,this._y=t,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const n=e.elements,r=n[0],o=n[4],a=n[8],c=n[1],l=n[5],h=n[9],u=n[2],d=n[6],p=n[10];switch(t){case"XYZ":this._y=Math.asin(St(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-St(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(St(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-St(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(St(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-St(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return ha.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ha,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ua.setFromEuler(this),this.setFromQuaternion(ua,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Gs.DEFAULT_ORDER="XYZ";class to{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Xh=0;const da=new w,Ji=new Vn,ai=new at,is=new w,bn=new w,qh=new w,jh=new Vn,fa=new w(1,0,0),pa=new w(0,1,0),ma=new w(0,0,1),Yh={type:"added"},Jh={type:"removed"};class xt extends vn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Xh++}),this.uuid=Gi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xt.DEFAULT_UP.clone();const e=new w,t=new Gs,i=new Vn,n=new w(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new at},normalMatrix:{value:new qe}}),this.matrix=new at,this.matrixWorld=new at,this.matrixAutoUpdate=xt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new to,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ji.setFromAxisAngle(e,t),this.quaternion.multiply(Ji),this}rotateOnWorldAxis(e,t){return Ji.setFromAxisAngle(e,t),this.quaternion.premultiply(Ji),this}rotateX(e){return this.rotateOnAxis(fa,e)}rotateY(e){return this.rotateOnAxis(pa,e)}rotateZ(e){return this.rotateOnAxis(ma,e)}translateOnAxis(e,t){return da.copy(e).applyQuaternion(this.quaternion),this.position.add(da.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(fa,e)}translateY(e){return this.translateOnAxis(pa,e)}translateZ(e){return this.translateOnAxis(ma,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ai.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?is.copy(e):is.set(e,t,i);const n=this.parent;this.updateWorldMatrix(!0,!1),bn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ai.lookAt(bn,is,this.up):ai.lookAt(is,bn,this.up),this.quaternion.setFromRotationMatrix(ai),n&&(ai.extractRotation(n.matrixWorld),Ji.setFromRotationMatrix(ai),this.quaternion.premultiply(Ji.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Yh)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Jh)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ai.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ai.multiply(e.parent.matrixWorld)),e.applyMatrix4(ai),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,n=this.children.length;i<n;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const n=this.children;for(let r=0,o=n.length;r<o;r++)n[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bn,e,qh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bn,jh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,n=t.length;i<n;i++){const r=t[i];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const n=this.children;for(let r=0,o=n.length;r<o;r++){const a=n[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.visibility=this._visibility,n.active=this._active,n.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),n.maxGeometryCount=this._maxGeometryCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.geometryCount=this._geometryCount,n.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(n.boundingSphere={center:n.boundingSphere.center.toArray(),radius:n.boundingSphere.radius}),this.boundingBox!==null&&(n.boundingBox={min:n.boundingBox.min.toArray(),max:n.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));n.material=a}else n.material=r(e.materials,this.material);if(this.children.length>0){n.children=[];for(let a=0;a<this.children.length;a++)n.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];n.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=n,i;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const n=e.children[i];this.add(n.clone())}return this}}xt.DEFAULT_UP=new w(0,1,0);xt.DEFAULT_MATRIX_AUTO_UPDATE=!0;xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Xt=new w,ci=new w,dr=new w,li=new w,Zi=new w,Ki=new w,ga=new w,fr=new w,pr=new w,mr=new w;let ns=!1;class jt{constructor(e=new w,t=new w,i=new w){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,n){n.subVectors(i,t),Xt.subVectors(e,t),n.cross(Xt);const r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(e,t,i,n,r){Xt.subVectors(n,t),ci.subVectors(i,t),dr.subVectors(e,t);const o=Xt.dot(Xt),a=Xt.dot(ci),c=Xt.dot(dr),l=ci.dot(ci),h=ci.dot(dr),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,p=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-p-g,g,p)}static containsPoint(e,t,i,n){return this.getBarycoord(e,t,i,n,li)===null?!1:li.x>=0&&li.y>=0&&li.x+li.y<=1}static getUV(e,t,i,n,r,o,a,c){return ns===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ns=!0),this.getInterpolation(e,t,i,n,r,o,a,c)}static getInterpolation(e,t,i,n,r,o,a,c){return this.getBarycoord(e,t,i,n,li)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,li.x),c.addScaledVector(o,li.y),c.addScaledVector(a,li.z),c)}static isFrontFacing(e,t,i,n){return Xt.subVectors(i,t),ci.subVectors(e,t),Xt.cross(ci).dot(n)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,n){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,i,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Xt.subVectors(this.c,this.b),ci.subVectors(this.a,this.b),Xt.cross(ci).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return jt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return jt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,n,r){return ns===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ns=!0),jt.getInterpolation(e,this.a,this.b,this.c,t,i,n,r)}getInterpolation(e,t,i,n,r){return jt.getInterpolation(e,this.a,this.b,this.c,t,i,n,r)}containsPoint(e){return jt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return jt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,n=this.b,r=this.c;let o,a;Zi.subVectors(n,i),Ki.subVectors(r,i),fr.subVectors(e,i);const c=Zi.dot(fr),l=Ki.dot(fr);if(c<=0&&l<=0)return t.copy(i);pr.subVectors(e,n);const h=Zi.dot(pr),u=Ki.dot(pr);if(h>=0&&u<=h)return t.copy(n);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(i).addScaledVector(Zi,o);mr.subVectors(e,r);const p=Zi.dot(mr),g=Ki.dot(mr);if(g>=0&&p<=g)return t.copy(r);const _=p*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(i).addScaledVector(Ki,a);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return ga.subVectors(r,n),a=(u-h)/(u-h+(p-g)),t.copy(n).addScaledVector(ga,a);const f=1/(m+_+d);return o=_*f,a=d*f,t.copy(i).addScaledVector(Zi,o).addScaledVector(Ki,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const zc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},vi={h:0,s:0,l:0},ss={h:0,s:0,l:0};function gr(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Pe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const n=e;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=dt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.toWorkingColorSpace(this,t),this}setRGB(e,t,i,n=$e.workingColorSpace){return this.r=e,this.g=t,this.b=i,$e.toWorkingColorSpace(this,n),this}setHSL(e,t,i,n=$e.workingColorSpace){if(e=eo(e,1),t=St(t,0,1),i=St(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=gr(o,r,e+1/3),this.g=gr(o,r,e),this.b=gr(o,r,e-1/3)}return $e.toWorkingColorSpace(this,n),this}setStyle(e,t=dt){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=n[1],a=n[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=n[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=dt){const i=zc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=fn(e.r),this.g=fn(e.g),this.b=fn(e.b),this}copyLinearToSRGB(e){return this.r=sr(e.r),this.g=sr(e.g),this.b=sr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=dt){return $e.fromWorkingColorSpace(Et.copy(this),e),Math.round(St(Et.r*255,0,255))*65536+Math.round(St(Et.g*255,0,255))*256+Math.round(St(Et.b*255,0,255))}getHexString(e=dt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.fromWorkingColorSpace(Et.copy(this),t);const i=Et.r,n=Et.g,r=Et.b,o=Math.max(i,n,r),a=Math.min(i,n,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case i:c=(n-r)/u+(n<r?6:0);break;case n:c=(r-i)/u+2;break;case r:c=(i-n)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=$e.workingColorSpace){return $e.fromWorkingColorSpace(Et.copy(this),t),e.r=Et.r,e.g=Et.g,e.b=Et.b,e}getStyle(e=dt){$e.fromWorkingColorSpace(Et.copy(this),e);const t=Et.r,i=Et.g,n=Et.b;return e!==dt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(e,t,i){return this.getHSL(vi),this.setHSL(vi.h+e,vi.s+t,vi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(vi),e.getHSL(ss);const i=Cn(vi.h,ss.h,t),n=Cn(vi.s,ss.s,t),r=Cn(vi.l,ss.l,t);return this.setHSL(i,n,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,n=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*n,this.g=r[1]*t+r[4]*i+r[7]*n,this.b=r[2]*t+r[5]*i+r[8]*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Et=new Pe;Pe.NAMES=zc;let Zh=0;class Vi extends vn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Zh++}),this.uuid=Gi(),this.name="",this.type="Material",this.blending=dn,this.side=Ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ur,this.blendDst=Nr,this.blendEquation=Di,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pe(0,0,0),this.blendAlpha=0,this.depthFunc=Rs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ia,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hi,this.stencilZFail=Hi,this.stencilZPass=Hi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==dn&&(i.blending=this.blending),this.side!==Ti&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ur&&(i.blendSrc=this.blendSrc),this.blendDst!==Nr&&(i.blendDst=this.blendDst),this.blendEquation!==Di&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Rs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ia&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Hi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Hi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Hi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=n(e.textures),o=n(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const n=t.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ii extends Vi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ec,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ut=new w,rs=new se;class Rt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=na,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Si,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[e+n]=t.array[i+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)rs.fromBufferAttribute(this,t),rs.applyMatrix3(e),this.setXY(t,rs.x,rs.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix3(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix4(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.applyNormalMatrix(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.transformDirection(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=cn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=wt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=cn(t,this.array)),t}setX(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=cn(t,this.array)),t}setY(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=cn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=cn(t,this.array)),t}setW(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),i=wt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,n){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),i=wt(i,this.array),n=wt(n,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this}setXYZW(e,t,i,n,r){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),i=wt(i,this.array),n=wt(n,this.array),r=wt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==na&&(e.usage=this.usage),e}}class Gc extends Rt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Vc extends Rt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Qe extends Rt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Kh=0;const zt=new at,_r=new xt,$i=new w,Nt=new Hn,En=new Hn,_t=new w;class yt extends vn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Kh++}),this.uuid=Gi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Fc(e)?Vc:Gc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new qe().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return zt.makeRotationFromQuaternion(e),this.applyMatrix4(zt),this}rotateX(e){return zt.makeRotationX(e),this.applyMatrix4(zt),this}rotateY(e){return zt.makeRotationY(e),this.applyMatrix4(zt),this}rotateZ(e){return zt.makeRotationZ(e),this.applyMatrix4(zt),this}translate(e,t,i){return zt.makeTranslation(e,t,i),this.applyMatrix4(zt),this}scale(e,t,i){return zt.makeScale(e,t,i),this.applyMatrix4(zt),this}lookAt(e){return _r.lookAt(e),_r.updateMatrix(),this.applyMatrix4(_r.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter($i).negate(),this.translate($i.x,$i.y,$i.z),this}setFromPoints(e){const t=[];for(let i=0,n=e.length;i<n;i++){const r=e[i];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Qe(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,n=t.length;i<n;i++){const r=t[i];Nt.setFromBufferAttribute(r),this.morphTargetsRelative?(_t.addVectors(this.boundingBox.min,Nt.min),this.boundingBox.expandByPoint(_t),_t.addVectors(this.boundingBox.max,Nt.max),this.boundingBox.expandByPoint(_t)):(this.boundingBox.expandByPoint(Nt.min),this.boundingBox.expandByPoint(Nt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new w,1/0);return}if(e){const i=this.boundingSphere.center;if(Nt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];En.setFromBufferAttribute(a),this.morphTargetsRelative?(_t.addVectors(Nt.min,En.min),Nt.expandByPoint(_t),_t.addVectors(Nt.max,En.max),Nt.expandByPoint(_t)):(Nt.expandByPoint(En.min),Nt.expandByPoint(En.max))}Nt.getCenter(i);let n=0;for(let r=0,o=e.count;r<o;r++)_t.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(_t));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)_t.fromBufferAttribute(a,l),c&&($i.fromBufferAttribute(e,l),_t.add($i)),n=Math.max(n,i.distanceToSquared(_t))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,n=t.position.array,r=t.normal.array,o=t.uv.array,a=n.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Rt(new Float32Array(4*a),4));const c=this.getAttribute("tangent").array,l=[],h=[];for(let E=0;E<a;E++)l[E]=new w,h[E]=new w;const u=new w,d=new w,p=new w,g=new se,_=new se,m=new se,f=new w,b=new w;function v(E,U,B){u.fromArray(n,E*3),d.fromArray(n,U*3),p.fromArray(n,B*3),g.fromArray(o,E*2),_.fromArray(o,U*2),m.fromArray(o,B*2),d.sub(u),p.sub(u),_.sub(g),m.sub(g);const Q=1/(_.x*m.y-m.x*_.y);isFinite(Q)&&(f.copy(d).multiplyScalar(m.y).addScaledVector(p,-_.y).multiplyScalar(Q),b.copy(p).multiplyScalar(_.x).addScaledVector(d,-m.x).multiplyScalar(Q),l[E].add(f),l[U].add(f),l[B].add(f),h[E].add(b),h[U].add(b),h[B].add(b))}let y=this.groups;y.length===0&&(y=[{start:0,count:i.length}]);for(let E=0,U=y.length;E<U;++E){const B=y[E],Q=B.start,I=B.count;for(let k=Q,V=Q+I;k<V;k+=3)v(i[k+0],i[k+1],i[k+2])}const R=new w,P=new w,C=new w,N=new w;function S(E){C.fromArray(r,E*3),N.copy(C);const U=l[E];R.copy(U),R.sub(C.multiplyScalar(C.dot(U))).normalize(),P.crossVectors(N,U);const Q=P.dot(h[E])<0?-1:1;c[E*4]=R.x,c[E*4+1]=R.y,c[E*4+2]=R.z,c[E*4+3]=Q}for(let E=0,U=y.length;E<U;++E){const B=y[E],Q=B.start,I=B.count;for(let k=Q,V=Q+I;k<V;k+=3)S(i[k+0]),S(i[k+1]),S(i[k+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Rt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const n=new w,r=new w,o=new w,a=new w,c=new w,l=new w,h=new w,u=new w;if(e)for(let d=0,p=e.count;d<p;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);n.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(n,r),h.cross(u),a.fromBufferAttribute(i,g),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,m),a.add(h),c.add(h),l.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,p=t.count;d<p;d+=3)n.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(n,r),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)_t.fromBufferAttribute(e,t),_t.normalize(),e.setXYZ(t,_t.x,_t.y,_t.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let p=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?p=c[_]*a.data.stride+a.offset:p=c[_]*h;for(let f=0;f<h;f++)d[g++]=l[p++]}return new Rt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new yt,i=this.index.array,n=this.attributes;for(const a in n){const c=n[a],l=e(c,i);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],p=e(d,i);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const n={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const p=l[u];h.push(p.toJSON(e.data))}h.length>0&&(n[c]=h,r=!0)}r&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const n=e.attributes;for(const l in n){const h=n[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],u=r[l];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const _a=new at,Ri=new zs,os=new Wn,va=new w,Qi=new w,en=new w,tn=new w,vr=new w,as=new w,cs=new se,ls=new se,hs=new se,xa=new w,ya=new w,Sa=new w,us=new w,ds=new w;class vt extends xt{constructor(e=new yt,t=new ii){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=n.length;r<o;r++){const a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(n,e);const a=this.morphTargetInfluences;if(r&&a){as.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(vr.fromBufferAttribute(u,e),o?as.addScaledVector(vr,h):as.addScaledVector(vr.sub(t),h))}t.add(as)}return t}raycast(e,t){const i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),os.copy(i.boundingSphere),os.applyMatrix4(r),Ri.copy(e.ray).recast(e.near),!(os.containsPoint(Ri.origin)===!1&&(Ri.intersectSphere(os,va)===null||Ri.origin.distanceToSquared(va)>(e.far-e.near)**2))&&(_a.copy(r).invert(),Ri.copy(e.ray).applyMatrix4(_a),!(i.boundingBox!==null&&Ri.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ri)))}_computeIntersections(e,t,i){let n;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=o[m.materialIndex],b=Math.max(m.start,p.start),v=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let y=b,R=v;y<R;y+=3){const P=a.getX(y),C=a.getX(y+1),N=a.getX(y+2);n=fs(this,f,e,i,l,h,u,P,C,N),n&&(n.faceIndex=Math.floor(y/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const b=a.getX(m),v=a.getX(m+1),y=a.getX(m+2);n=fs(this,o,e,i,l,h,u,b,v,y),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=o[m.materialIndex],b=Math.max(m.start,p.start),v=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let y=b,R=v;y<R;y+=3){const P=y,C=y+1,N=y+2;n=fs(this,f,e,i,l,h,u,P,C,N),n&&(n.faceIndex=Math.floor(y/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const b=m,v=m+1,y=m+2;n=fs(this,o,e,i,l,h,u,b,v,y),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}}}function $h(s,e,t,i,n,r,o,a){let c;if(e.side===Lt?c=i.intersectTriangle(o,r,n,!0,a):c=i.intersectTriangle(n,r,o,e.side===Ti,a),c===null)return null;ds.copy(a),ds.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(ds);return l<t.near||l>t.far?null:{distance:l,point:ds.clone(),object:s}}function fs(s,e,t,i,n,r,o,a,c,l){s.getVertexPosition(a,Qi),s.getVertexPosition(c,en),s.getVertexPosition(l,tn);const h=$h(s,e,t,i,Qi,en,tn,us);if(h){n&&(cs.fromBufferAttribute(n,a),ls.fromBufferAttribute(n,c),hs.fromBufferAttribute(n,l),h.uv=jt.getInterpolation(us,Qi,en,tn,cs,ls,hs,new se)),r&&(cs.fromBufferAttribute(r,a),ls.fromBufferAttribute(r,c),hs.fromBufferAttribute(r,l),h.uv1=jt.getInterpolation(us,Qi,en,tn,cs,ls,hs,new se),h.uv2=h.uv1),o&&(xa.fromBufferAttribute(o,a),ya.fromBufferAttribute(o,c),Sa.fromBufferAttribute(o,l),h.normal=jt.getInterpolation(us,Qi,en,tn,xa,ya,Sa,new w),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:c,c:l,normal:new w,materialIndex:0};jt.getNormal(Qi,en,tn,u.normal),h.face=u}return h}class Xn extends yt{constructor(e=1,t=1,i=1,n=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:n,heightSegments:r,depthSegments:o};const a=this;n=Math.floor(n),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,p=0;g("z","y","x",-1,-1,i,t,e,o,r,0),g("z","y","x",1,-1,i,t,-e,o,r,1),g("x","z","y",1,1,e,i,t,n,o,2),g("x","z","y",1,-1,e,i,-t,n,o,3),g("x","y","z",1,-1,e,t,i,n,r,4),g("x","y","z",-1,-1,e,t,-i,n,r,5),this.setIndex(c),this.setAttribute("position",new Qe(l,3)),this.setAttribute("normal",new Qe(h,3)),this.setAttribute("uv",new Qe(u,2));function g(_,m,f,b,v,y,R,P,C,N,S){const E=y/C,U=R/N,B=y/2,Q=R/2,I=P/2,k=C+1,V=N+1;let Y=0,J=0;const Z=new w;for(let K=0;K<V;K++){const re=K*U-Q;for(let oe=0;oe<k;oe++){const W=oe*E-B;Z[_]=W*b,Z[m]=re*v,Z[f]=I,l.push(Z.x,Z.y,Z.z),Z[_]=0,Z[m]=0,Z[f]=P>0?1:-1,h.push(Z.x,Z.y,Z.z),u.push(oe/C),u.push(1-K/N),Y+=1}}for(let K=0;K<N;K++)for(let re=0;re<C;re++){const oe=d+re+k*K,W=d+re+k*(K+1),X=d+(re+1)+k*(K+1),ue=d+(re+1)+k*K;c.push(oe,W,ue),c.push(W,X,ue),J+=6}a.addGroup(p,J,S),p+=J,d+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function _n(s){const e={};for(const t in s){e[t]={};for(const i in s[t]){const n=s[t][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=n.clone():Array.isArray(n)?e[t][i]=n.slice():e[t][i]=n}}return e}function Pt(s){const e={};for(let t=0;t<s.length;t++){const i=_n(s[t]);for(const n in i)e[n]=i[n]}return e}function Qh(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Hc(s){return s.getRenderTarget()===null?s.outputColorSpace:$e.workingColorSpace}const eu={clone:_n,merge:Pt};var tu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,iu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Bi extends Vi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=tu,this.fragmentShader=iu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=_n(e.uniforms),this.uniformsGroups=Qh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const n in this.uniforms){const o=this.uniforms[n].value;o&&o.isTexture?t.uniforms[n]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[n]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[n]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[n]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[n]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[n]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[n]={type:"m4",value:o.toArray()}:t.uniforms[n]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Wc extends xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new at,this.projectionMatrix=new at,this.projectionMatrixInverse=new at,this.coordinateSystem=di}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Ot extends Wc{constructor(e=50,t=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=On*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Pn*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return On*2*Math.atan(Math.tan(Pn*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,n,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Pn*.5*this.fov)/this.zoom,i=2*t,n=this.aspect*i,r=-.5*n;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*n/c,t-=o.offsetY*i/l,n*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const nn=-90,sn=1;class nu extends xt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new Ot(nn,sn,e,t);n.layers=this.layers,this.add(n);const r=new Ot(nn,sn,e,t);r.layers=this.layers,this.add(r);const o=new Ot(nn,sn,e,t);o.layers=this.layers,this.add(o);const a=new Ot(nn,sn,e,t);a.layers=this.layers,this.add(a);const c=new Ot(nn,sn,e,t);c.layers=this.layers,this.add(c);const l=new Ot(nn,sn,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,n,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===di)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Us)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,n),e.render(t,r),e.setRenderTarget(i,1,n),e.render(t,o),e.setRenderTarget(i,2,n),e.render(t,a),e.setRenderTarget(i,3,n),e.render(t,c),e.setRenderTarget(i,4,n),e.render(t,l),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,n),e.render(t,h),e.setRenderTarget(u,d,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Xc extends It{constructor(e,t,i,n,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:pn,super(e,t,i,n,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class su extends ki{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},n=[i,i,i,i,i,i];t.encoding!==void 0&&(Rn("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Oi?dt:Vt),this.texture=new Xc(n,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Gt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},n=new Xn(5,5,5),r=new Bi({name:"CubemapFromEquirect",uniforms:_n(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Lt,blending:Mi});r.uniforms.tEquirect.value=t;const o=new vt(n,r),a=t.minFilter;return t.minFilter===Nn&&(t.minFilter=Gt),new nu(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,n){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,n);e.setRenderTarget(r)}}const xr=new w,ru=new w,ou=new qe;class xi{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const n=xr.subVectors(i,t).cross(ru.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(xr),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/n;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||ou.getNormalMatrix(e),n=this.coplanarPoint(xr).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Li=new Wn,ps=new w;class io{constructor(e=new xi,t=new xi,i=new xi,n=new xi,r=new xi,o=new xi){this.planes=[e,t,i,n,r,o]}set(e,t,i,n,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(n),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=di){const i=this.planes,n=e.elements,r=n[0],o=n[1],a=n[2],c=n[3],l=n[4],h=n[5],u=n[6],d=n[7],p=n[8],g=n[9],_=n[10],m=n[11],f=n[12],b=n[13],v=n[14],y=n[15];if(i[0].setComponents(c-r,d-l,m-p,y-f).normalize(),i[1].setComponents(c+r,d+l,m+p,y+f).normalize(),i[2].setComponents(c+o,d+h,m+g,y+b).normalize(),i[3].setComponents(c-o,d-h,m-g,y-b).normalize(),i[4].setComponents(c-a,d-u,m-_,y-v).normalize(),t===di)i[5].setComponents(c+a,d+u,m+_,y+v).normalize();else if(t===Us)i[5].setComponents(a,u,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Li.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Li.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Li)}intersectsSprite(e){return Li.center.set(0,0,0),Li.radius=.7071067811865476,Li.applyMatrix4(e.matrixWorld),this.intersectsSphere(Li)}intersectsSphere(e){const t=this.planes,i=e.center,n=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const n=t[i];if(ps.x=n.normal.x>0?e.max.x:e.min.x,ps.y=n.normal.y>0?e.max.y:e.min.y,ps.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(ps)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function qc(){let s=null,e=!1,t=null,i=null;function n(r,o){t(r,o),i=s.requestAnimationFrame(n)}return{start:function(){e!==!0&&t!==null&&(i=s.requestAnimationFrame(n),e=!0)},stop:function(){s.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function au(s,e){const t=e.isWebGL2,i=new WeakMap;function n(l,h){const u=l.array,d=l.usage,p=u.byteLength,g=s.createBuffer();s.bindBuffer(h,g),s.bufferData(h,u,d),l.onUploadCallback();let _;if(u instanceof Float32Array)_=s.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)_=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=s.UNSIGNED_SHORT;else if(u instanceof Int16Array)_=s.SHORT;else if(u instanceof Uint32Array)_=s.UNSIGNED_INT;else if(u instanceof Int32Array)_=s.INT;else if(u instanceof Int8Array)_=s.BYTE;else if(u instanceof Uint8Array)_=s.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)_=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:_,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:p}}function r(l,h,u){const d=h.array,p=h._updateRange,g=h.updateRanges;if(s.bindBuffer(u,l),p.count===-1&&g.length===0&&s.bufferSubData(u,0,d),g.length!==0){for(let _=0,m=g.length;_<m;_++){const f=g[_];t?s.bufferSubData(u,f.start*d.BYTES_PER_ELEMENT,d,f.start,f.count):s.bufferSubData(u,f.start*d.BYTES_PER_ELEMENT,d.subarray(f.start,f.start+f.count))}h.clearUpdateRanges()}p.count!==-1&&(t?s.bufferSubData(u,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count):s.bufferSubData(u,p.offset*d.BYTES_PER_ELEMENT,d.subarray(p.offset,p.offset+p.count)),p.count=-1),h.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),i.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const h=i.get(l);h&&(s.deleteBuffer(h.buffer),i.delete(l))}function c(l,h){if(l.isGLBufferAttribute){const d=i.get(l);(!d||d.version<l.version)&&i.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const u=i.get(l);if(u===void 0)i.set(l,n(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,l,h),u.version=l.version}}return{get:o,remove:a,update:c}}class Vs extends yt{constructor(e=1,t=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:n};const r=e/2,o=t/2,a=Math.floor(i),c=Math.floor(n),l=a+1,h=c+1,u=e/a,d=t/c,p=[],g=[],_=[],m=[];for(let f=0;f<h;f++){const b=f*d-o;for(let v=0;v<l;v++){const y=v*u-r;g.push(y,-b,0),_.push(0,0,1),m.push(v/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let b=0;b<a;b++){const v=b+l*f,y=b+l*(f+1),R=b+1+l*(f+1),P=b+1+l*f;p.push(v,y,P),p.push(y,R,P)}this.setIndex(p),this.setAttribute("position",new Qe(g,3)),this.setAttribute("normal",new Qe(_,3)),this.setAttribute("uv",new Qe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vs(e.width,e.height,e.widthSegments,e.heightSegments)}}var cu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,lu=`#ifdef USE_ALPHAHASH
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
#endif`,hu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,uu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,du=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,fu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,pu=`#ifdef USE_AOMAP
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
#endif`,mu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,gu=`#ifdef USE_BATCHING
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
#endif`,_u=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,vu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,xu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Su=`#ifdef USE_IRIDESCENCE
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
#endif`,Mu=`#ifdef USE_BUMPMAP
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
#endif`,bu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Eu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Tu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Au=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Pu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Cu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Ru=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Lu=`#define PI 3.141592653589793
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
} // validated`,Iu=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Du=`vec3 transformedNormal = objectNormal;
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
#endif`,Uu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Nu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Fu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ou=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ku="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bu=`
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
}`,zu=`#ifdef USE_ENVMAP
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
#endif`,Gu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Vu=`#ifdef USE_ENVMAP
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
#endif`,Hu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Wu=`#ifdef USE_ENVMAP
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
#endif`,Xu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,qu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ju=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Yu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ju=`#ifdef USE_GRADIENTMAP
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
}`,Zu=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Ku=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,$u=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Qu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ed=`uniform bool receiveShadow;
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
#endif`,td=`#ifdef USE_ENVMAP
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
#endif`,id=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,nd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,sd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,rd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,od=`PhysicalMaterial material;
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
#endif`,ad=`struct PhysicalMaterial {
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
}`,cd=`
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
#endif`,ld=`#if defined( RE_IndirectDiffuse )
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
#endif`,hd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ud=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,pd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,md=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,gd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_d=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,vd=`#if defined( USE_POINTS_UV )
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
#endif`,xd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Sd=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Md=`#ifdef USE_MORPHNORMALS
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
#endif`,bd=`#ifdef USE_MORPHTARGETS
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
#endif`,Ed=`#ifdef USE_MORPHTARGETS
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
#endif`,Td=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ad=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,wd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Rd=`#ifdef USE_NORMALMAP
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
#endif`,Ld=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Id=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Dd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ud=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Nd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Fd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Od=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,kd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Bd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,zd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Gd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Vd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Hd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Wd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Xd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,qd=`float getShadowMask() {
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
}`,jd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Yd=`#ifdef USE_SKINNING
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
#endif`,Jd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Zd=`#ifdef USE_SKINNING
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
#endif`,Kd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$d=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Qd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ef=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,tf=`#ifdef USE_TRANSMISSION
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
#endif`,nf=`#ifdef USE_TRANSMISSION
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
#endif`,sf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,of=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,af=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const cf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,lf=`uniform sampler2D t2D;
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
}`,hf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,uf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,df=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ff=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pf=`#include <common>
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
}`,mf=`#if DEPTH_PACKING == 3200
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
}`,gf=`#define DISTANCE
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
}`,_f=`#define DISTANCE
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
}`,vf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,xf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yf=`uniform float scale;
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
}`,Sf=`uniform vec3 diffuse;
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
}`,Mf=`#include <common>
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
}`,bf=`uniform vec3 diffuse;
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
}`,Ef=`#define LAMBERT
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
}`,Tf=`#define LAMBERT
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
}`,Af=`#define MATCAP
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
}`,wf=`#define MATCAP
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
}`,Pf=`#define NORMAL
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
}`,Cf=`#define NORMAL
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
}`,Rf=`#define PHONG
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
}`,Lf=`#define PHONG
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
}`,If=`#define STANDARD
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
}`,Df=`#define STANDARD
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
}`,Uf=`#define TOON
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
}`,Nf=`#define TOON
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
}`,Ff=`uniform float size;
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
}`,Of=`uniform vec3 diffuse;
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
}`,kf=`#include <common>
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
}`,Bf=`uniform vec3 color;
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
}`,zf=`uniform float rotation;
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
}`,Gf=`uniform vec3 diffuse;
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
}`,Ve={alphahash_fragment:cu,alphahash_pars_fragment:lu,alphamap_fragment:hu,alphamap_pars_fragment:uu,alphatest_fragment:du,alphatest_pars_fragment:fu,aomap_fragment:pu,aomap_pars_fragment:mu,batching_pars_vertex:gu,batching_vertex:_u,begin_vertex:vu,beginnormal_vertex:xu,bsdfs:yu,iridescence_fragment:Su,bumpmap_pars_fragment:Mu,clipping_planes_fragment:bu,clipping_planes_pars_fragment:Eu,clipping_planes_pars_vertex:Tu,clipping_planes_vertex:Au,color_fragment:wu,color_pars_fragment:Pu,color_pars_vertex:Cu,color_vertex:Ru,common:Lu,cube_uv_reflection_fragment:Iu,defaultnormal_vertex:Du,displacementmap_pars_vertex:Uu,displacementmap_vertex:Nu,emissivemap_fragment:Fu,emissivemap_pars_fragment:Ou,colorspace_fragment:ku,colorspace_pars_fragment:Bu,envmap_fragment:zu,envmap_common_pars_fragment:Gu,envmap_pars_fragment:Vu,envmap_pars_vertex:Hu,envmap_physical_pars_fragment:td,envmap_vertex:Wu,fog_vertex:Xu,fog_pars_vertex:qu,fog_fragment:ju,fog_pars_fragment:Yu,gradientmap_pars_fragment:Ju,lightmap_fragment:Zu,lightmap_pars_fragment:Ku,lights_lambert_fragment:$u,lights_lambert_pars_fragment:Qu,lights_pars_begin:ed,lights_toon_fragment:id,lights_toon_pars_fragment:nd,lights_phong_fragment:sd,lights_phong_pars_fragment:rd,lights_physical_fragment:od,lights_physical_pars_fragment:ad,lights_fragment_begin:cd,lights_fragment_maps:ld,lights_fragment_end:hd,logdepthbuf_fragment:ud,logdepthbuf_pars_fragment:dd,logdepthbuf_pars_vertex:fd,logdepthbuf_vertex:pd,map_fragment:md,map_pars_fragment:gd,map_particle_fragment:_d,map_particle_pars_fragment:vd,metalnessmap_fragment:xd,metalnessmap_pars_fragment:yd,morphcolor_vertex:Sd,morphnormal_vertex:Md,morphtarget_pars_vertex:bd,morphtarget_vertex:Ed,normal_fragment_begin:Td,normal_fragment_maps:Ad,normal_pars_fragment:wd,normal_pars_vertex:Pd,normal_vertex:Cd,normalmap_pars_fragment:Rd,clearcoat_normal_fragment_begin:Ld,clearcoat_normal_fragment_maps:Id,clearcoat_pars_fragment:Dd,iridescence_pars_fragment:Ud,opaque_fragment:Nd,packing:Fd,premultiplied_alpha_fragment:Od,project_vertex:kd,dithering_fragment:Bd,dithering_pars_fragment:zd,roughnessmap_fragment:Gd,roughnessmap_pars_fragment:Vd,shadowmap_pars_fragment:Hd,shadowmap_pars_vertex:Wd,shadowmap_vertex:Xd,shadowmask_pars_fragment:qd,skinbase_vertex:jd,skinning_pars_vertex:Yd,skinning_vertex:Jd,skinnormal_vertex:Zd,specularmap_fragment:Kd,specularmap_pars_fragment:$d,tonemapping_fragment:Qd,tonemapping_pars_fragment:ef,transmission_fragment:tf,transmission_pars_fragment:nf,uv_pars_fragment:sf,uv_pars_vertex:rf,uv_vertex:of,worldpos_vertex:af,background_vert:cf,background_frag:lf,backgroundCube_vert:hf,backgroundCube_frag:uf,cube_vert:df,cube_frag:ff,depth_vert:pf,depth_frag:mf,distanceRGBA_vert:gf,distanceRGBA_frag:_f,equirect_vert:vf,equirect_frag:xf,linedashed_vert:yf,linedashed_frag:Sf,meshbasic_vert:Mf,meshbasic_frag:bf,meshlambert_vert:Ef,meshlambert_frag:Tf,meshmatcap_vert:Af,meshmatcap_frag:wf,meshnormal_vert:Pf,meshnormal_frag:Cf,meshphong_vert:Rf,meshphong_frag:Lf,meshphysical_vert:If,meshphysical_frag:Df,meshtoon_vert:Uf,meshtoon_frag:Nf,points_vert:Ff,points_frag:Of,shadow_vert:kf,shadow_frag:Bf,sprite_vert:zf,sprite_frag:Gf},he={common:{diffuse:{value:new Pe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qe}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qe},normalScale:{value:new se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Pe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0},uvTransform:{value:new qe}},sprite:{diffuse:{value:new Pe(16777215)},opacity:{value:1},center:{value:new se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}}},ti={basic:{uniforms:Pt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:Pt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Pe(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:Pt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Pe(0)},specular:{value:new Pe(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:Pt([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new Pe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:Pt([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new Pe(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:Pt([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:Pt([he.points,he.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:Pt([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:Pt([he.common,he.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:Pt([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:Pt([he.sprite,he.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:Pt([he.common,he.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:Pt([he.lights,he.fog,{color:{value:new Pe(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};ti.physical={uniforms:Pt([ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qe},clearcoatNormalScale:{value:new se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qe},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qe},sheen:{value:0},sheenColor:{value:new Pe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qe},transmissionSamplerSize:{value:new se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qe},attenuationDistance:{value:0},attenuationColor:{value:new Pe(0)},specularColor:{value:new Pe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qe},anisotropyVector:{value:new se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qe}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const ms={r:0,b:0,g:0};function Vf(s,e,t,i,n,r,o){const a=new Pe(0);let c=r===!0?0:1,l,h,u=null,d=0,p=null;function g(m,f){let b=!1,v=f.isScene===!0?f.background:null;v&&v.isTexture&&(v=(f.backgroundBlurriness>0?t:e).get(v)),v===null?_(a,c):v&&v.isColor&&(_(v,1),b=!0);const y=s.xr.getEnvironmentBlendMode();y==="additive"?i.buffers.color.setClear(0,0,0,1,o):y==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(s.autoClear||b)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),v&&(v.isCubeTexture||v.mapping===ks)?(h===void 0&&(h=new vt(new Xn(1,1,1),new Bi({name:"BackgroundCubeMaterial",uniforms:_n(ti.backgroundCube.uniforms),vertexShader:ti.backgroundCube.vertexShader,fragmentShader:ti.backgroundCube.fragmentShader,side:Lt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,P,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(h)),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,h.material.toneMapped=$e.getTransfer(v.colorSpace)!==nt,(u!==v||d!==v.version||p!==s.toneMapping)&&(h.material.needsUpdate=!0,u=v,d=v.version,p=s.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new vt(new Vs(2,2),new Bi({name:"BackgroundMaterial",uniforms:_n(ti.background.uniforms),vertexShader:ti.background.vertexShader,fragmentShader:ti.background.fragmentShader,side:Ti,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,l.material.toneMapped=$e.getTransfer(v.colorSpace)!==nt,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||p!==s.toneMapping)&&(l.material.needsUpdate=!0,u=v,d=v.version,p=s.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function _(m,f){m.getRGB(ms,Hc(s)),i.buffers.color.setClear(ms.r,ms.g,ms.b,f,o)}return{getClearColor:function(){return a},setClearColor:function(m,f=1){a.set(m),c=f,_(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,_(a,c)},render:g}}function Hf(s,e,t,i){const n=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||r!==null,a={},c=m(null);let l=c,h=!1;function u(I,k,V,Y,J){let Z=!1;if(o){const K=_(Y,V,k);l!==K&&(l=K,p(l.object)),Z=f(I,Y,V,J),Z&&b(I,Y,V,J)}else{const K=k.wireframe===!0;(l.geometry!==Y.id||l.program!==V.id||l.wireframe!==K)&&(l.geometry=Y.id,l.program=V.id,l.wireframe=K,Z=!0)}J!==null&&t.update(J,s.ELEMENT_ARRAY_BUFFER),(Z||h)&&(h=!1,N(I,k,V,Y),J!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(J).buffer))}function d(){return i.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function p(I){return i.isWebGL2?s.bindVertexArray(I):r.bindVertexArrayOES(I)}function g(I){return i.isWebGL2?s.deleteVertexArray(I):r.deleteVertexArrayOES(I)}function _(I,k,V){const Y=V.wireframe===!0;let J=a[I.id];J===void 0&&(J={},a[I.id]=J);let Z=J[k.id];Z===void 0&&(Z={},J[k.id]=Z);let K=Z[Y];return K===void 0&&(K=m(d()),Z[Y]=K),K}function m(I){const k=[],V=[],Y=[];for(let J=0;J<n;J++)k[J]=0,V[J]=0,Y[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:V,attributeDivisors:Y,object:I,attributes:{},index:null}}function f(I,k,V,Y){const J=l.attributes,Z=k.attributes;let K=0;const re=V.getAttributes();for(const oe in re)if(re[oe].location>=0){const X=J[oe];let ue=Z[oe];if(ue===void 0&&(oe==="instanceMatrix"&&I.instanceMatrix&&(ue=I.instanceMatrix),oe==="instanceColor"&&I.instanceColor&&(ue=I.instanceColor)),X===void 0||X.attribute!==ue||ue&&X.data!==ue.data)return!0;K++}return l.attributesNum!==K||l.index!==Y}function b(I,k,V,Y){const J={},Z=k.attributes;let K=0;const re=V.getAttributes();for(const oe in re)if(re[oe].location>=0){let X=Z[oe];X===void 0&&(oe==="instanceMatrix"&&I.instanceMatrix&&(X=I.instanceMatrix),oe==="instanceColor"&&I.instanceColor&&(X=I.instanceColor));const ue={};ue.attribute=X,X&&X.data&&(ue.data=X.data),J[oe]=ue,K++}l.attributes=J,l.attributesNum=K,l.index=Y}function v(){const I=l.newAttributes;for(let k=0,V=I.length;k<V;k++)I[k]=0}function y(I){R(I,0)}function R(I,k){const V=l.newAttributes,Y=l.enabledAttributes,J=l.attributeDivisors;V[I]=1,Y[I]===0&&(s.enableVertexAttribArray(I),Y[I]=1),J[I]!==k&&((i.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](I,k),J[I]=k)}function P(){const I=l.newAttributes,k=l.enabledAttributes;for(let V=0,Y=k.length;V<Y;V++)k[V]!==I[V]&&(s.disableVertexAttribArray(V),k[V]=0)}function C(I,k,V,Y,J,Z,K){K===!0?s.vertexAttribIPointer(I,k,V,J,Z):s.vertexAttribPointer(I,k,V,Y,J,Z)}function N(I,k,V,Y){if(i.isWebGL2===!1&&(I.isInstancedMesh||Y.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const J=Y.attributes,Z=V.getAttributes(),K=k.defaultAttributeValues;for(const re in Z){const oe=Z[re];if(oe.location>=0){let W=J[re];if(W===void 0&&(re==="instanceMatrix"&&I.instanceMatrix&&(W=I.instanceMatrix),re==="instanceColor"&&I.instanceColor&&(W=I.instanceColor)),W!==void 0){const X=W.normalized,ue=W.itemSize,ye=t.get(W);if(ye===void 0)continue;const _e=ye.buffer,Ie=ye.type,Oe=ye.bytesPerElement,be=i.isWebGL2===!0&&(Ie===s.INT||Ie===s.UNSIGNED_INT||W.gpuType===Ac);if(W.isInterleavedBufferAttribute){const Ne=W.data,L=Ne.stride,ce=W.offset;if(Ne.isInstancedInterleavedBuffer){for(let j=0;j<oe.locationSize;j++)R(oe.location+j,Ne.meshPerAttribute);I.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=Ne.meshPerAttribute*Ne.count)}else for(let j=0;j<oe.locationSize;j++)y(oe.location+j);s.bindBuffer(s.ARRAY_BUFFER,_e);for(let j=0;j<oe.locationSize;j++)C(oe.location+j,ue/oe.locationSize,Ie,X,L*Oe,(ce+ue/oe.locationSize*j)*Oe,be)}else{if(W.isInstancedBufferAttribute){for(let Ne=0;Ne<oe.locationSize;Ne++)R(oe.location+Ne,W.meshPerAttribute);I.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let Ne=0;Ne<oe.locationSize;Ne++)y(oe.location+Ne);s.bindBuffer(s.ARRAY_BUFFER,_e);for(let Ne=0;Ne<oe.locationSize;Ne++)C(oe.location+Ne,ue/oe.locationSize,Ie,X,ue*Oe,ue/oe.locationSize*Ne*Oe,be)}}else if(K!==void 0){const X=K[re];if(X!==void 0)switch(X.length){case 2:s.vertexAttrib2fv(oe.location,X);break;case 3:s.vertexAttrib3fv(oe.location,X);break;case 4:s.vertexAttrib4fv(oe.location,X);break;default:s.vertexAttrib1fv(oe.location,X)}}}}P()}function S(){B();for(const I in a){const k=a[I];for(const V in k){const Y=k[V];for(const J in Y)g(Y[J].object),delete Y[J];delete k[V]}delete a[I]}}function E(I){if(a[I.id]===void 0)return;const k=a[I.id];for(const V in k){const Y=k[V];for(const J in Y)g(Y[J].object),delete Y[J];delete k[V]}delete a[I.id]}function U(I){for(const k in a){const V=a[k];if(V[I.id]===void 0)continue;const Y=V[I.id];for(const J in Y)g(Y[J].object),delete Y[J];delete V[I.id]}}function B(){Q(),h=!0,l!==c&&(l=c,p(l.object))}function Q(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:B,resetDefaultState:Q,dispose:S,releaseStatesOfGeometry:E,releaseStatesOfProgram:U,initAttributes:v,enableAttribute:y,disableUnusedAttributes:P}}function Wf(s,e,t,i){const n=i.isWebGL2;let r;function o(h){r=h}function a(h,u){s.drawArrays(r,h,u),t.update(u,r,1)}function c(h,u,d){if(d===0)return;let p,g;if(n)p=s,g="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[g](r,h,u,d),t.update(u,r,d)}function l(h,u,d){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<d;g++)this.render(h[g],u[g]);else{p.multiDrawArraysWEBGL(r,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_];t.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function Xf(s,e,t){let i;function n(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(C){if(C==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const c=r(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);const l=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),d=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),_=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),f=s.getParameter(s.MAX_VARYING_VECTORS),b=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),v=d>0,y=o||e.has("OES_texture_float"),R=v&&y,P=o?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:n,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:f,maxFragmentUniforms:b,vertexTextures:v,floatFragmentTextures:y,floatVertexTextures:R,maxSamples:P}}function qf(s){const e=this;let t=null,i=0,n=!1,r=!1;const o=new xi,a=new qe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const p=u.length!==0||d||i!==0||n;return n=d,i=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,p){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,f=s.get(u);if(!n||g===null||g.length===0||r&&!m)r?h(null):l();else{const b=r?0:i,v=b*4;let y=f.clippingState||null;c.value=y,y=h(g,d,v,p);for(let R=0;R!==v;++R)y[R]=t[R];f.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,d,p,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const f=p+_*4,b=d.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<f)&&(m=new Float32Array(f));for(let v=0,y=p;v!==_;++v,y+=4)o.copy(u[v]).applyMatrix4(b,a),o.normal.toArray(m,y),m[y+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function jf(s){let e=new WeakMap;function t(o,a){return a===Fr?o.mapping=pn:a===Or&&(o.mapping=mn),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Fr||a===Or)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new su(c.height/2);return l.fromEquirectangularTexture(s,o),e.set(o,l),o.addEventListener("dispose",n),t(l.texture,o.mapping)}else return null}}return o}function n(o){const a=o.target;a.removeEventListener("dispose",n);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}class jc extends Wc{constructor(e=-1,t=1,i=1,n=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let r=i-e,o=i+e,a=n+t,c=n-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ln=4,Ma=[.125,.215,.35,.446,.526,.582],Ui=20,yr=new jc,ba=new Pe;let Sr=null,Mr=0,br=0;const Ii=(1+Math.sqrt(5))/2,rn=1/Ii,Ea=[new w(1,1,1),new w(-1,1,1),new w(1,1,-1),new w(-1,1,-1),new w(0,Ii,rn),new w(0,Ii,-rn),new w(rn,0,Ii),new w(-rn,0,Ii),new w(Ii,rn,0),new w(-Ii,rn,0)];class Ta{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,n=100){Sr=this._renderer.getRenderTarget(),Mr=this._renderer.getActiveCubeFace(),br=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,n,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pa(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wa(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Sr,Mr,br),e.scissorTest=!1,gs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===pn||e.mapping===mn?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Sr=this._renderer.getRenderTarget(),Mr=this._renderer.getActiveCubeFace(),br=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Gt,minFilter:Gt,generateMipmaps:!1,type:Fn,format:Zt,colorSpace:fi,depthBuffer:!1},n=Aa(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Aa(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Yf(r)),this._blurMaterial=Jf(r,e,t)}return n}_compileMaterial(e){const t=new vt(this._lodPlanes[0],e);this._renderer.compile(t,yr)}_sceneToCubeUV(e,t,i,n){const a=new Ot(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(ba),h.toneMapping=bi,h.autoClear=!1;const p=new ii({name:"PMREM.Background",side:Lt,depthWrite:!1,depthTest:!1}),g=new vt(new Xn,p);let _=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy(ba),_=!0);for(let f=0;f<6;f++){const b=f%3;b===0?(a.up.set(0,c[f],0),a.lookAt(l[f],0,0)):b===1?(a.up.set(0,0,c[f]),a.lookAt(0,l[f],0)):(a.up.set(0,c[f],0),a.lookAt(0,0,l[f]));const v=this._cubeSize;gs(n,b*v,f>2?v:0,v,v),h.setRenderTarget(n),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,n=e.mapping===pn||e.mapping===mn;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pa()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wa());const r=n?this._cubemapMaterial:this._equirectMaterial,o=new vt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;gs(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,yr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let n=1;n<this._lodPlanes.length;n++){const r=Math.sqrt(this._sigmas[n]*this._sigmas[n]-this._sigmas[n-1]*this._sigmas[n-1]),o=Ea[(n-1)%Ea.length];this._blur(e,n-1,n,r,o)}t.autoClear=i}_blur(e,t,i,n,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,n,"latitudinal",r),this._halfBlur(o,e,i,i,n,"longitudinal",r)}_halfBlur(e,t,i,n,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new vt(this._lodPlanes[n],l),d=l.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Ui-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Ui;m>Ui&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ui}`);const f=[];let b=0;for(let C=0;C<Ui;++C){const N=C/_,S=Math.exp(-N*N/2);f.push(S),C===0?b+=S:C<m&&(b+=2*S)}for(let C=0;C<f.length;C++)f[C]=f[C]/b;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-i;const y=this._sizeLods[n],R=3*y*(n>v-ln?n-v+ln:0),P=4*(this._cubeSize-y);gs(t,R,P,3*y,2*y),c.setRenderTarget(t),c.render(u,yr)}}function Yf(s){const e=[],t=[],i=[];let n=s;const r=s-ln+1+Ma.length;for(let o=0;o<r;o++){const a=Math.pow(2,n);t.push(a);let c=1/a;o>s-ln?c=Ma[o-s+ln-1]:o===0&&(c=0),i.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,_=3,m=2,f=1,b=new Float32Array(_*g*p),v=new Float32Array(m*g*p),y=new Float32Array(f*g*p);for(let P=0;P<p;P++){const C=P%3*2/3-1,N=P>2?0:-1,S=[C,N,0,C+2/3,N,0,C+2/3,N+1,0,C,N,0,C+2/3,N+1,0,C,N+1,0];b.set(S,_*g*P),v.set(d,m*g*P);const E=[P,P,P,P,P,P];y.set(E,f*g*P)}const R=new yt;R.setAttribute("position",new Rt(b,_)),R.setAttribute("uv",new Rt(v,m)),R.setAttribute("faceIndex",new Rt(y,f)),e.push(R),n>ln&&n--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Aa(s,e,t){const i=new ki(s,e,t);return i.texture.mapping=ks,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function gs(s,e,t,i,n){s.viewport.set(e,t,i,n),s.scissor.set(e,t,i,n)}function Jf(s,e,t){const i=new Float32Array(Ui),n=new w(0,1,0);return new Bi({name:"SphericalGaussianBlur",defines:{n:Ui,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:no(),fragmentShader:`

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
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function wa(){return new Bi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:no(),fragmentShader:`

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
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function Pa(){return new Bi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:no(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function no(){return`

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
	`}function Zf(s){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const c=a.mapping,l=c===Fr||c===Or,h=c===pn||c===mn;if(l||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return t===null&&(t=new Ta(s)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{const u=a.image;if(l&&u&&u.height>0||h&&u&&n(u)){t===null&&(t=new Ta(s));const d=l?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,d),a.addEventListener("dispose",r),d.texture}else return null}}}return a}function n(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function Kf(s){const e={};function t(i){if(e[i]!==void 0)return e[i];let n;switch(i){case"WEBGL_depth_texture":n=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":n=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":n=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":n=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:n=s.getExtension(i)}return e[i]=n,n}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const n=t(i);return n===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),n}}}function $f(s,e,t,i){const n={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,f=_.length;m<f;m++)e.remove(_[m])}d.removeEventListener("dispose",o),delete n[d.id];const p=r.get(d);p&&(e.remove(p),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return n[d.id]===!0||(d.addEventListener("dispose",o),n[d.id]=!0,t.memory.geometries++),d}function c(u){const d=u.attributes;for(const g in d)e.update(d[g],s.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const _=p[g];for(let m=0,f=_.length;m<f;m++)e.update(_[m],s.ARRAY_BUFFER)}}function l(u){const d=[],p=u.index,g=u.attributes.position;let _=0;if(p!==null){const b=p.array;_=p.version;for(let v=0,y=b.length;v<y;v+=3){const R=b[v+0],P=b[v+1],C=b[v+2];d.push(R,P,P,C,C,R)}}else if(g!==void 0){const b=g.array;_=g.version;for(let v=0,y=b.length/3-1;v<y;v+=3){const R=v+0,P=v+1,C=v+2;d.push(R,P,P,C,C,R)}}else return;const m=new(Fc(d)?Vc:Gc)(d,1);m.version=_;const f=r.get(u);f&&e.remove(f),r.set(u,m)}function h(u){const d=r.get(u);if(d){const p=u.index;p!==null&&d.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function Qf(s,e,t,i){const n=i.isWebGL2;let r;function o(p){r=p}let a,c;function l(p){a=p.type,c=p.bytesPerElement}function h(p,g){s.drawElements(r,g,a,p*c),t.update(g,r,1)}function u(p,g,_){if(_===0)return;let m,f;if(n)m=s,f="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[f](r,g,a,p*c,_),t.update(g,r,_)}function d(p,g,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<_;f++)this.render(p[f]/c,g[f]);else{m.multiDrawElementsWEBGL(r,g,0,a,p,0,_);let f=0;for(let b=0;b<_;b++)f+=g[b];t.update(f,r,1)}}this.setMode=o,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function ep(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function n(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:n,update:i}}function tp(s,e){return s[0]-e[0]}function ip(s,e){return Math.abs(e[1])-Math.abs(s[1])}function np(s,e,t){const i={},n=new Float32Array(8),r=new WeakMap,o=new st,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,h,u){const d=l.morphTargetInfluences;if(e.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let m=r.get(h);if(m===void 0||m.count!==_){let k=function(){Q.dispose(),r.delete(h),h.removeEventListener("dispose",k)};var p=k;m!==void 0&&m.texture.dispose();const v=h.morphAttributes.position!==void 0,y=h.morphAttributes.normal!==void 0,R=h.morphAttributes.color!==void 0,P=h.morphAttributes.position||[],C=h.morphAttributes.normal||[],N=h.morphAttributes.color||[];let S=0;v===!0&&(S=1),y===!0&&(S=2),R===!0&&(S=3);let E=h.attributes.position.count*S,U=1;E>e.maxTextureSize&&(U=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const B=new Float32Array(E*U*4*_),Q=new Bc(B,E,U,_);Q.type=Si,Q.needsUpdate=!0;const I=S*4;for(let V=0;V<_;V++){const Y=P[V],J=C[V],Z=N[V],K=E*U*4*V;for(let re=0;re<Y.count;re++){const oe=re*I;v===!0&&(o.fromBufferAttribute(Y,re),B[K+oe+0]=o.x,B[K+oe+1]=o.y,B[K+oe+2]=o.z,B[K+oe+3]=0),y===!0&&(o.fromBufferAttribute(J,re),B[K+oe+4]=o.x,B[K+oe+5]=o.y,B[K+oe+6]=o.z,B[K+oe+7]=0),R===!0&&(o.fromBufferAttribute(Z,re),B[K+oe+8]=o.x,B[K+oe+9]=o.y,B[K+oe+10]=o.z,B[K+oe+11]=Z.itemSize===4?o.w:1)}}m={count:_,texture:Q,size:new se(E,U)},r.set(h,m),h.addEventListener("dispose",k)}let f=0;for(let v=0;v<d.length;v++)f+=d[v];const b=h.morphTargetsRelative?1:1-f;u.getUniforms().setValue(s,"morphTargetBaseInfluence",b),u.getUniforms().setValue(s,"morphTargetInfluences",d),u.getUniforms().setValue(s,"morphTargetsTexture",m.texture,t),u.getUniforms().setValue(s,"morphTargetsTextureSize",m.size)}else{const g=d===void 0?0:d.length;let _=i[h.id];if(_===void 0||_.length!==g){_=[];for(let y=0;y<g;y++)_[y]=[y,0];i[h.id]=_}for(let y=0;y<g;y++){const R=_[y];R[0]=y,R[1]=d[y]}_.sort(ip);for(let y=0;y<8;y++)y<g&&_[y][1]?(a[y][0]=_[y][0],a[y][1]=_[y][1]):(a[y][0]=Number.MAX_SAFE_INTEGER,a[y][1]=0);a.sort(tp);const m=h.morphAttributes.position,f=h.morphAttributes.normal;let b=0;for(let y=0;y<8;y++){const R=a[y],P=R[0],C=R[1];P!==Number.MAX_SAFE_INTEGER&&C?(m&&h.getAttribute("morphTarget"+y)!==m[P]&&h.setAttribute("morphTarget"+y,m[P]),f&&h.getAttribute("morphNormal"+y)!==f[P]&&h.setAttribute("morphNormal"+y,f[P]),n[y]=C,b+=C):(m&&h.hasAttribute("morphTarget"+y)===!0&&h.deleteAttribute("morphTarget"+y),f&&h.hasAttribute("morphNormal"+y)===!0&&h.deleteAttribute("morphNormal"+y),n[y]=0)}const v=h.morphTargetsRelative?1:1-b;u.getUniforms().setValue(s,"morphTargetBaseInfluence",v),u.getUniforms().setValue(s,"morphTargetInfluences",n)}}return{update:c}}function sp(s,e,t,i){let n=new WeakMap;function r(c){const l=i.render.frame,h=c.geometry,u=e.get(c,h);if(n.get(u)!==l&&(e.update(u),n.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),n.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),n.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;n.get(d)!==l&&(d.update(),n.set(d,l))}return u}function o(){n=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}class Yc extends It{constructor(e,t,i,n,r,o,a,c,l,h){if(h=h!==void 0?h:Fi,h!==Fi&&h!==gn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Fi&&(i=yi),i===void 0&&h===gn&&(i=Ni),super(null,n,r,o,a,c,h,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Ct,this.minFilter=c!==void 0?c:Ct,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Jc=new It,Zc=new Yc(1,1);Zc.compareFunction=Nc;const Kc=new Bc,$c=new Gh,Qc=new Xc,Ca=[],Ra=[],La=new Float32Array(16),Ia=new Float32Array(9),Da=new Float32Array(4);function xn(s,e,t){const i=s[0];if(i<=0||i>0)return s;const n=e*t;let r=Ca[n];if(r===void 0&&(r=new Float32Array(n),Ca[n]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function ft(s,e){if(s.length!==e.length)return!1;for(let t=0,i=s.length;t<i;t++)if(s[t]!==e[t])return!1;return!0}function pt(s,e){for(let t=0,i=e.length;t<i;t++)s[t]=e[t]}function Hs(s,e){let t=Ra[e];t===void 0&&(t=new Int32Array(e),Ra[e]=t);for(let i=0;i!==e;++i)t[i]=s.allocateTextureUnit();return t}function rp(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function op(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;s.uniform2fv(this.addr,e),pt(t,e)}}function ap(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ft(t,e))return;s.uniform3fv(this.addr,e),pt(t,e)}}function cp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;s.uniform4fv(this.addr,e),pt(t,e)}}function lp(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(ft(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,i))return;Da.set(i),s.uniformMatrix2fv(this.addr,!1,Da),pt(t,i)}}function hp(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(ft(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,i))return;Ia.set(i),s.uniformMatrix3fv(this.addr,!1,Ia),pt(t,i)}}function up(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(ft(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,i))return;La.set(i),s.uniformMatrix4fv(this.addr,!1,La),pt(t,i)}}function dp(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function fp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;s.uniform2iv(this.addr,e),pt(t,e)}}function pp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;s.uniform3iv(this.addr,e),pt(t,e)}}function mp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;s.uniform4iv(this.addr,e),pt(t,e)}}function gp(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function _p(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;s.uniform2uiv(this.addr,e),pt(t,e)}}function vp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;s.uniform3uiv(this.addr,e),pt(t,e)}}function xp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;s.uniform4uiv(this.addr,e),pt(t,e)}}function yp(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);const r=this.type===s.SAMPLER_2D_SHADOW?Zc:Jc;t.setTexture2D(e||r,n)}function Sp(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture3D(e||$c,n)}function Mp(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTextureCube(e||Qc,n)}function bp(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture2DArray(e||Kc,n)}function Ep(s){switch(s){case 5126:return rp;case 35664:return op;case 35665:return ap;case 35666:return cp;case 35674:return lp;case 35675:return hp;case 35676:return up;case 5124:case 35670:return dp;case 35667:case 35671:return fp;case 35668:case 35672:return pp;case 35669:case 35673:return mp;case 5125:return gp;case 36294:return _p;case 36295:return vp;case 36296:return xp;case 35678:case 36198:case 36298:case 36306:case 35682:return yp;case 35679:case 36299:case 36307:return Sp;case 35680:case 36300:case 36308:case 36293:return Mp;case 36289:case 36303:case 36311:case 36292:return bp}}function Tp(s,e){s.uniform1fv(this.addr,e)}function Ap(s,e){const t=xn(e,this.size,2);s.uniform2fv(this.addr,t)}function wp(s,e){const t=xn(e,this.size,3);s.uniform3fv(this.addr,t)}function Pp(s,e){const t=xn(e,this.size,4);s.uniform4fv(this.addr,t)}function Cp(s,e){const t=xn(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Rp(s,e){const t=xn(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Lp(s,e){const t=xn(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Ip(s,e){s.uniform1iv(this.addr,e)}function Dp(s,e){s.uniform2iv(this.addr,e)}function Up(s,e){s.uniform3iv(this.addr,e)}function Np(s,e){s.uniform4iv(this.addr,e)}function Fp(s,e){s.uniform1uiv(this.addr,e)}function Op(s,e){s.uniform2uiv(this.addr,e)}function kp(s,e){s.uniform3uiv(this.addr,e)}function Bp(s,e){s.uniform4uiv(this.addr,e)}function zp(s,e,t){const i=this.cache,n=e.length,r=Hs(t,n);ft(i,r)||(s.uniform1iv(this.addr,r),pt(i,r));for(let o=0;o!==n;++o)t.setTexture2D(e[o]||Jc,r[o])}function Gp(s,e,t){const i=this.cache,n=e.length,r=Hs(t,n);ft(i,r)||(s.uniform1iv(this.addr,r),pt(i,r));for(let o=0;o!==n;++o)t.setTexture3D(e[o]||$c,r[o])}function Vp(s,e,t){const i=this.cache,n=e.length,r=Hs(t,n);ft(i,r)||(s.uniform1iv(this.addr,r),pt(i,r));for(let o=0;o!==n;++o)t.setTextureCube(e[o]||Qc,r[o])}function Hp(s,e,t){const i=this.cache,n=e.length,r=Hs(t,n);ft(i,r)||(s.uniform1iv(this.addr,r),pt(i,r));for(let o=0;o!==n;++o)t.setTexture2DArray(e[o]||Kc,r[o])}function Wp(s){switch(s){case 5126:return Tp;case 35664:return Ap;case 35665:return wp;case 35666:return Pp;case 35674:return Cp;case 35675:return Rp;case 35676:return Lp;case 5124:case 35670:return Ip;case 35667:case 35671:return Dp;case 35668:case 35672:return Up;case 35669:case 35673:return Np;case 5125:return Fp;case 36294:return Op;case 36295:return kp;case 36296:return Bp;case 35678:case 36198:case 36298:case 36306:case 35682:return zp;case 35679:case 36299:case 36307:return Gp;case 35680:case 36300:case 36308:case 36293:return Vp;case 36289:case 36303:case 36311:case 36292:return Hp}}class Xp{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Ep(t.type)}}class qp{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Wp(t.type)}}class jp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const n=this.seq;for(let r=0,o=n.length;r!==o;++r){const a=n[r];a.setValue(e,t[a.id],i)}}}const Er=/(\w+)(\])?(\[|\.)?/g;function Ua(s,e){s.seq.push(e),s.map[e.id]=e}function Yp(s,e,t){const i=s.name,n=i.length;for(Er.lastIndex=0;;){const r=Er.exec(i),o=Er.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===n){Ua(t,l===void 0?new Xp(a,s,e):new qp(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new jp(a),Ua(t,u)),t=u}}}class Ps{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){const r=e.getActiveUniform(t,n),o=e.getUniformLocation(t,r.name);Yp(r,o,this)}}setValue(e,t,i,n){const r=this.map[t];r!==void 0&&r.setValue(e,i,n)}setOptional(e,t,i){const n=t[i];n!==void 0&&this.setValue(e,i,n)}static upload(e,t,i,n){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,n)}}static seqWithValue(e,t){const i=[];for(let n=0,r=e.length;n!==r;++n){const o=e[n];o.id in t&&i.push(o)}return i}}function Na(s,e,t){const i=s.createShader(e);return s.shaderSource(i,t),s.compileShader(i),i}const Jp=37297;let Zp=0;function Kp(s,e){const t=s.split(`
`),i=[],n=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=n;o<r;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}function $p(s){const e=$e.getPrimaries($e.workingColorSpace),t=$e.getPrimaries(s);let i;switch(e===t?i="":e===Ds&&t===Is?i="LinearDisplayP3ToLinearSRGB":e===Is&&t===Ds&&(i="LinearSRGBToLinearDisplayP3"),s){case fi:case Bs:return[i,"LinearTransferOETF"];case dt:case Qr:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[i,"LinearTransferOETF"]}}function Fa(s,e,t){const i=s.getShaderParameter(e,s.COMPILE_STATUS),n=s.getShaderInfoLog(e).trim();if(i&&n==="")return"";const r=/ERROR: 0:(\d+)/.exec(n);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+n+`

`+Kp(s.getShaderSource(e),o)}else return n}function Qp(s,e){const t=$p(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function em(s,e){let t;switch(e){case Kl:t="Linear";break;case $l:t="Reinhard";break;case Ql:t="OptimizedCineon";break;case eh:t="ACESFilmic";break;case ih:t="AgX";break;case th:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function tm(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(hn).join(`
`)}function im(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(hn).join(`
`)}function nm(s){const e=[];for(const t in s){const i=s[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function sm(s,e){const t={},i=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const r=s.getActiveAttrib(e,n),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function hn(s){return s!==""}function Oa(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ka(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const rm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Vr(s){return s.replace(rm,am)}const om=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function am(s,e){let t=Ve[e];if(t===void 0){const i=om.get(e);if(i!==void 0)t=Ve[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Vr(t)}const cm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ba(s){return s.replace(cm,lm)}function lm(s,e,t,i){let n="";for(let r=parseInt(e);r<parseInt(t);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function za(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function hm(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===bc?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Tl?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===ui&&(e="SHADOWMAP_TYPE_VSM"),e}function um(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case pn:case mn:e="ENVMAP_TYPE_CUBE";break;case ks:e="ENVMAP_TYPE_CUBE_UV";break}return e}function dm(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case mn:e="ENVMAP_MODE_REFRACTION";break}return e}function fm(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ec:e="ENVMAP_BLENDING_MULTIPLY";break;case Jl:e="ENVMAP_BLENDING_MIX";break;case Zl:e="ENVMAP_BLENDING_ADD";break}return e}function pm(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function mm(s,e,t,i){const n=s.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=hm(t),l=um(t),h=dm(t),u=fm(t),d=pm(t),p=t.isWebGL2?"":tm(t),g=im(t),_=nm(r),m=n.createProgram();let f,b,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(hn).join(`
`),f.length>0&&(f+=`
`),b=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(hn).join(`
`),b.length>0&&(b+=`
`)):(f=[za(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(hn).join(`
`),b=[p,za(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==bi?"#define TONE_MAPPING":"",t.toneMapping!==bi?Ve.tonemapping_pars_fragment:"",t.toneMapping!==bi?em("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,Qp("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(hn).join(`
`)),o=Vr(o),o=Oa(o,t),o=ka(o,t),a=Vr(a),a=Oa(a,t),a=ka(a,t),o=Ba(o),a=Ba(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,f=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,b=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===sa?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===sa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+b);const y=v+f+o,R=v+b+a,P=Na(n,n.VERTEX_SHADER,y),C=Na(n,n.FRAGMENT_SHADER,R);n.attachShader(m,P),n.attachShader(m,C),t.index0AttributeName!==void 0?n.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&n.bindAttribLocation(m,0,"position"),n.linkProgram(m);function N(B){if(s.debug.checkShaderErrors){const Q=n.getProgramInfoLog(m).trim(),I=n.getShaderInfoLog(P).trim(),k=n.getShaderInfoLog(C).trim();let V=!0,Y=!0;if(n.getProgramParameter(m,n.LINK_STATUS)===!1)if(V=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,m,P,C);else{const J=Fa(n,P,"vertex"),Z=Fa(n,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(m,n.VALIDATE_STATUS)+`

Program Info Log: `+Q+`
`+J+`
`+Z)}else Q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Q):(I===""||k==="")&&(Y=!1);Y&&(B.diagnostics={runnable:V,programLog:Q,vertexShader:{log:I,prefix:f},fragmentShader:{log:k,prefix:b}})}n.deleteShader(P),n.deleteShader(C),S=new Ps(n,m),E=sm(n,m)}let S;this.getUniforms=function(){return S===void 0&&N(this),S};let E;this.getAttributes=function(){return E===void 0&&N(this),E};let U=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=n.getProgramParameter(m,Jp)),U},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Zp++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=P,this.fragmentShader=C,this}let gm=0;class _m{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,n=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(n)===!1&&(o.add(n),n.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new vm(e),t.set(e,i)),i}}class vm{constructor(e){this.id=gm++,this.code=e,this.usedTimes=0}}function xm(s,e,t,i,n,r,o){const a=new to,c=new _m,l=[],h=n.isWebGL2,u=n.logarithmicDepthBuffer,d=n.vertexTextures;let p=n.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return S===0?"uv":`uv${S}`}function m(S,E,U,B,Q){const I=B.fog,k=Q.geometry,V=S.isMeshStandardMaterial?B.environment:null,Y=(S.isMeshStandardMaterial?t:e).get(S.envMap||V),J=Y&&Y.mapping===ks?Y.image.height:null,Z=g[S.type];S.precision!==null&&(p=n.getMaxPrecision(S.precision),p!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",p,"instead."));const K=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,re=K!==void 0?K.length:0;let oe=0;k.morphAttributes.position!==void 0&&(oe=1),k.morphAttributes.normal!==void 0&&(oe=2),k.morphAttributes.color!==void 0&&(oe=3);let W,X,ue,ye;if(Z){const Tt=ti[Z];W=Tt.vertexShader,X=Tt.fragmentShader}else W=S.vertexShader,X=S.fragmentShader,c.update(S),ue=c.getVertexShaderID(S),ye=c.getFragmentShaderID(S);const _e=s.getRenderTarget(),Ie=Q.isInstancedMesh===!0,Oe=Q.isBatchedMesh===!0,be=!!S.map,Ne=!!S.matcap,L=!!Y,ce=!!S.aoMap,j=!!S.lightMap,ae=!!S.bumpMap,q=!!S.normalMap,Te=!!S.displacementMap,me=!!S.emissiveMap,T=!!S.metalnessMap,x=!!S.roughnessMap,O=S.anisotropy>0,ne=S.clearcoat>0,te=S.iridescence>0,ee=S.sheen>0,Se=S.transmission>0,de=O&&!!S.anisotropyMap,ve=ne&&!!S.clearcoatMap,Ce=ne&&!!S.clearcoatNormalMap,Be=ne&&!!S.clearcoatRoughnessMap,ie=te&&!!S.iridescenceMap,Je=te&&!!S.iridescenceThicknessMap,je=ee&&!!S.sheenColorMap,Fe=ee&&!!S.sheenRoughnessMap,Ae=!!S.specularMap,xe=!!S.specularColorMap,Ge=!!S.specularIntensityMap,Ke=Se&&!!S.transmissionMap,ct=Se&&!!S.thicknessMap,We=!!S.gradientMap,le=!!S.alphaMap,D=S.alphaTest>0,fe=!!S.alphaHash,pe=!!S.extensions,De=!!k.attributes.uv1,Re=!!k.attributes.uv2,et=!!k.attributes.uv3;let tt=bi;return S.toneMapped&&(_e===null||_e.isXRRenderTarget===!0)&&(tt=s.toneMapping),{isWebGL2:h,shaderID:Z,shaderType:S.type,shaderName:S.name,vertexShader:W,fragmentShader:X,defines:S.defines,customVertexShaderID:ue,customFragmentShaderID:ye,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:p,batching:Oe,instancing:Ie,instancingColor:Ie&&Q.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:_e===null?s.outputColorSpace:_e.isXRRenderTarget===!0?_e.texture.colorSpace:fi,map:be,matcap:Ne,envMap:L,envMapMode:L&&Y.mapping,envMapCubeUVHeight:J,aoMap:ce,lightMap:j,bumpMap:ae,normalMap:q,displacementMap:d&&Te,emissiveMap:me,normalMapObjectSpace:q&&S.normalMapType===ph,normalMapTangentSpace:q&&S.normalMapType===Uc,metalnessMap:T,roughnessMap:x,anisotropy:O,anisotropyMap:de,clearcoat:ne,clearcoatMap:ve,clearcoatNormalMap:Ce,clearcoatRoughnessMap:Be,iridescence:te,iridescenceMap:ie,iridescenceThicknessMap:Je,sheen:ee,sheenColorMap:je,sheenRoughnessMap:Fe,specularMap:Ae,specularColorMap:xe,specularIntensityMap:Ge,transmission:Se,transmissionMap:Ke,thicknessMap:ct,gradientMap:We,opaque:S.transparent===!1&&S.blending===dn,alphaMap:le,alphaTest:D,alphaHash:fe,combine:S.combine,mapUv:be&&_(S.map.channel),aoMapUv:ce&&_(S.aoMap.channel),lightMapUv:j&&_(S.lightMap.channel),bumpMapUv:ae&&_(S.bumpMap.channel),normalMapUv:q&&_(S.normalMap.channel),displacementMapUv:Te&&_(S.displacementMap.channel),emissiveMapUv:me&&_(S.emissiveMap.channel),metalnessMapUv:T&&_(S.metalnessMap.channel),roughnessMapUv:x&&_(S.roughnessMap.channel),anisotropyMapUv:de&&_(S.anisotropyMap.channel),clearcoatMapUv:ve&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:Ce&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Be&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ie&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:Je&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:je&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Fe&&_(S.sheenRoughnessMap.channel),specularMapUv:Ae&&_(S.specularMap.channel),specularColorMapUv:xe&&_(S.specularColorMap.channel),specularIntensityMapUv:Ge&&_(S.specularIntensityMap.channel),transmissionMapUv:Ke&&_(S.transmissionMap.channel),thicknessMapUv:ct&&_(S.thicknessMap.channel),alphaMapUv:le&&_(S.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(q||O),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,vertexUv1s:De,vertexUv2s:Re,vertexUv3s:et,pointsUvs:Q.isPoints===!0&&!!k.attributes.uv&&(be||le),fog:!!I,useFog:S.fog===!0,fogExp2:I&&I.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:Q.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:oe,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&U.length>0,shadowMapType:s.shadowMap.type,toneMapping:tt,useLegacyLights:s._useLegacyLights,decodeVideoTexture:be&&S.map.isVideoTexture===!0&&$e.getTransfer(S.map.colorSpace)===nt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Yt,flipSided:S.side===Lt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:pe&&S.extensions.derivatives===!0,extensionFragDepth:pe&&S.extensions.fragDepth===!0,extensionDrawBuffers:pe&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:pe&&S.extensions.shaderTextureLOD===!0,extensionClipCullDistance:pe&&S.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()}}function f(S){const E=[];if(S.shaderID?E.push(S.shaderID):(E.push(S.customVertexShaderID),E.push(S.customFragmentShaderID)),S.defines!==void 0)for(const U in S.defines)E.push(U),E.push(S.defines[U]);return S.isRawShaderMaterial===!1&&(b(E,S),v(E,S),E.push(s.outputColorSpace)),E.push(S.customProgramCacheKey),E.join()}function b(S,E){S.push(E.precision),S.push(E.outputColorSpace),S.push(E.envMapMode),S.push(E.envMapCubeUVHeight),S.push(E.mapUv),S.push(E.alphaMapUv),S.push(E.lightMapUv),S.push(E.aoMapUv),S.push(E.bumpMapUv),S.push(E.normalMapUv),S.push(E.displacementMapUv),S.push(E.emissiveMapUv),S.push(E.metalnessMapUv),S.push(E.roughnessMapUv),S.push(E.anisotropyMapUv),S.push(E.clearcoatMapUv),S.push(E.clearcoatNormalMapUv),S.push(E.clearcoatRoughnessMapUv),S.push(E.iridescenceMapUv),S.push(E.iridescenceThicknessMapUv),S.push(E.sheenColorMapUv),S.push(E.sheenRoughnessMapUv),S.push(E.specularMapUv),S.push(E.specularColorMapUv),S.push(E.specularIntensityMapUv),S.push(E.transmissionMapUv),S.push(E.thicknessMapUv),S.push(E.combine),S.push(E.fogExp2),S.push(E.sizeAttenuation),S.push(E.morphTargetsCount),S.push(E.morphAttributeCount),S.push(E.numDirLights),S.push(E.numPointLights),S.push(E.numSpotLights),S.push(E.numSpotLightMaps),S.push(E.numHemiLights),S.push(E.numRectAreaLights),S.push(E.numDirLightShadows),S.push(E.numPointLightShadows),S.push(E.numSpotLightShadows),S.push(E.numSpotLightShadowsWithMaps),S.push(E.numLightProbes),S.push(E.shadowMapType),S.push(E.toneMapping),S.push(E.numClippingPlanes),S.push(E.numClipIntersection),S.push(E.depthPacking)}function v(S,E){a.disableAll(),E.isWebGL2&&a.enable(0),E.supportsVertexTextures&&a.enable(1),E.instancing&&a.enable(2),E.instancingColor&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),S.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.skinning&&a.enable(4),E.morphTargets&&a.enable(5),E.morphNormals&&a.enable(6),E.morphColors&&a.enable(7),E.premultipliedAlpha&&a.enable(8),E.shadowMapEnabled&&a.enable(9),E.useLegacyLights&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),S.push(a.mask)}function y(S){const E=g[S.type];let U;if(E){const B=ti[E];U=eu.clone(B.uniforms)}else U=S.uniforms;return U}function R(S,E){let U;for(let B=0,Q=l.length;B<Q;B++){const I=l[B];if(I.cacheKey===E){U=I,++U.usedTimes;break}}return U===void 0&&(U=new mm(s,E,S,r),l.push(U)),U}function P(S){if(--S.usedTimes===0){const E=l.indexOf(S);l[E]=l[l.length-1],l.pop(),S.destroy()}}function C(S){c.remove(S)}function N(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:y,acquireProgram:R,releaseProgram:P,releaseShaderCache:C,programs:l,dispose:N}}function ym(){let s=new WeakMap;function e(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function t(r){s.delete(r)}function i(r,o,a){s.get(r)[o]=a}function n(){s=new WeakMap}return{get:e,remove:t,update:i,dispose:n}}function Sm(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Ga(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Va(){const s=[];let e=0;const t=[],i=[],n=[];function r(){e=0,t.length=0,i.length=0,n.length=0}function o(u,d,p,g,_,m){let f=s[e];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},s[e]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=_,f.group=m),e++,f}function a(u,d,p,g,_,m){const f=o(u,d,p,g,_,m);p.transmission>0?i.push(f):p.transparent===!0?n.push(f):t.push(f)}function c(u,d,p,g,_,m){const f=o(u,d,p,g,_,m);p.transmission>0?i.unshift(f):p.transparent===!0?n.unshift(f):t.unshift(f)}function l(u,d){t.length>1&&t.sort(u||Sm),i.length>1&&i.sort(d||Ga),n.length>1&&n.sort(d||Ga)}function h(){for(let u=e,d=s.length;u<d;u++){const p=s[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:n,init:r,push:a,unshift:c,finish:h,sort:l}}function Mm(){let s=new WeakMap;function e(i,n){const r=s.get(i);let o;return r===void 0?(o=new Va,s.set(i,[o])):n>=r.length?(o=new Va,r.push(o)):o=r[n],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function bm(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new Pe};break;case"SpotLight":t={position:new w,direction:new w,color:new Pe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new Pe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new Pe,groundColor:new Pe};break;case"RectAreaLight":t={color:new Pe,position:new w,halfWidth:new w,halfHeight:new w};break}return s[e.id]=t,t}}}function Em(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Tm=0;function Am(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function wm(s,e){const t=new bm,i=Em(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new w);const r=new w,o=new at,a=new at;function c(h,u){let d=0,p=0,g=0;for(let B=0;B<9;B++)n.probe[B].set(0,0,0);let _=0,m=0,f=0,b=0,v=0,y=0,R=0,P=0,C=0,N=0,S=0;h.sort(Am);const E=u===!0?Math.PI:1;for(let B=0,Q=h.length;B<Q;B++){const I=h[B],k=I.color,V=I.intensity,Y=I.distance,J=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)d+=k.r*V*E,p+=k.g*V*E,g+=k.b*V*E;else if(I.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(I.sh.coefficients[Z],V);S++}else if(I.isDirectionalLight){const Z=t.get(I);if(Z.color.copy(I.color).multiplyScalar(I.intensity*E),I.castShadow){const K=I.shadow,re=i.get(I);re.shadowBias=K.bias,re.shadowNormalBias=K.normalBias,re.shadowRadius=K.radius,re.shadowMapSize=K.mapSize,n.directionalShadow[_]=re,n.directionalShadowMap[_]=J,n.directionalShadowMatrix[_]=I.shadow.matrix,y++}n.directional[_]=Z,_++}else if(I.isSpotLight){const Z=t.get(I);Z.position.setFromMatrixPosition(I.matrixWorld),Z.color.copy(k).multiplyScalar(V*E),Z.distance=Y,Z.coneCos=Math.cos(I.angle),Z.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),Z.decay=I.decay,n.spot[f]=Z;const K=I.shadow;if(I.map&&(n.spotLightMap[C]=I.map,C++,K.updateMatrices(I),I.castShadow&&N++),n.spotLightMatrix[f]=K.matrix,I.castShadow){const re=i.get(I);re.shadowBias=K.bias,re.shadowNormalBias=K.normalBias,re.shadowRadius=K.radius,re.shadowMapSize=K.mapSize,n.spotShadow[f]=re,n.spotShadowMap[f]=J,P++}f++}else if(I.isRectAreaLight){const Z=t.get(I);Z.color.copy(k).multiplyScalar(V),Z.halfWidth.set(I.width*.5,0,0),Z.halfHeight.set(0,I.height*.5,0),n.rectArea[b]=Z,b++}else if(I.isPointLight){const Z=t.get(I);if(Z.color.copy(I.color).multiplyScalar(I.intensity*E),Z.distance=I.distance,Z.decay=I.decay,I.castShadow){const K=I.shadow,re=i.get(I);re.shadowBias=K.bias,re.shadowNormalBias=K.normalBias,re.shadowRadius=K.radius,re.shadowMapSize=K.mapSize,re.shadowCameraNear=K.camera.near,re.shadowCameraFar=K.camera.far,n.pointShadow[m]=re,n.pointShadowMap[m]=J,n.pointShadowMatrix[m]=I.shadow.matrix,R++}n.point[m]=Z,m++}else if(I.isHemisphereLight){const Z=t.get(I);Z.skyColor.copy(I.color).multiplyScalar(V*E),Z.groundColor.copy(I.groundColor).multiplyScalar(V*E),n.hemi[v]=Z,v++}}b>0&&(e.isWebGL2?s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=he.LTC_FLOAT_1,n.rectAreaLTC2=he.LTC_FLOAT_2):(n.rectAreaLTC1=he.LTC_HALF_1,n.rectAreaLTC2=he.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=he.LTC_FLOAT_1,n.rectAreaLTC2=he.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(n.rectAreaLTC1=he.LTC_HALF_1,n.rectAreaLTC2=he.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),n.ambient[0]=d,n.ambient[1]=p,n.ambient[2]=g;const U=n.hash;(U.directionalLength!==_||U.pointLength!==m||U.spotLength!==f||U.rectAreaLength!==b||U.hemiLength!==v||U.numDirectionalShadows!==y||U.numPointShadows!==R||U.numSpotShadows!==P||U.numSpotMaps!==C||U.numLightProbes!==S)&&(n.directional.length=_,n.spot.length=f,n.rectArea.length=b,n.point.length=m,n.hemi.length=v,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=R,n.pointShadowMap.length=R,n.spotShadow.length=P,n.spotShadowMap.length=P,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=R,n.spotLightMatrix.length=P+C-N,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=N,n.numLightProbes=S,U.directionalLength=_,U.pointLength=m,U.spotLength=f,U.rectAreaLength=b,U.hemiLength=v,U.numDirectionalShadows=y,U.numPointShadows=R,U.numSpotShadows=P,U.numSpotMaps=C,U.numLightProbes=S,n.version=Tm++)}function l(h,u){let d=0,p=0,g=0,_=0,m=0;const f=u.matrixWorldInverse;for(let b=0,v=h.length;b<v;b++){const y=h[b];if(y.isDirectionalLight){const R=n.directional[d];R.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(f),d++}else if(y.isSpotLight){const R=n.spot[g];R.position.setFromMatrixPosition(y.matrixWorld),R.position.applyMatrix4(f),R.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(f),g++}else if(y.isRectAreaLight){const R=n.rectArea[_];R.position.setFromMatrixPosition(y.matrixWorld),R.position.applyMatrix4(f),a.identity(),o.copy(y.matrixWorld),o.premultiply(f),a.extractRotation(o),R.halfWidth.set(y.width*.5,0,0),R.halfHeight.set(0,y.height*.5,0),R.halfWidth.applyMatrix4(a),R.halfHeight.applyMatrix4(a),_++}else if(y.isPointLight){const R=n.point[p];R.position.setFromMatrixPosition(y.matrixWorld),R.position.applyMatrix4(f),p++}else if(y.isHemisphereLight){const R=n.hemi[m];R.direction.setFromMatrixPosition(y.matrixWorld),R.direction.transformDirection(f),m++}}}return{setup:c,setupView:l,state:n}}function Ha(s,e){const t=new wm(s,e),i=[],n=[];function r(){i.length=0,n.length=0}function o(u){i.push(u)}function a(u){n.push(u)}function c(u){t.setup(i,u)}function l(u){t.setupView(i,u)}return{init:r,state:{lightsArray:i,shadowsArray:n,lights:t},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function Pm(s,e){let t=new WeakMap;function i(r,o=0){const a=t.get(r);let c;return a===void 0?(c=new Ha(s,e),t.set(r,[c])):o>=a.length?(c=new Ha(s,e),a.push(c)):c=a[o],c}function n(){t=new WeakMap}return{get:i,dispose:n}}class Cm extends Vi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=dh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Rm extends Vi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Lm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Im=`uniform sampler2D shadow_pass;
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
}`;function Dm(s,e,t){let i=new io;const n=new se,r=new se,o=new st,a=new Cm({depthPacking:fh}),c=new Rm,l={},h=t.maxTextureSize,u={[Ti]:Lt,[Lt]:Ti,[Yt]:Yt},d=new Bi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new se},radius:{value:4}},vertexShader:Lm,fragmentShader:Im}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new yt;g.setAttribute("position",new Rt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new vt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=bc;let f=this.type;this.render=function(P,C,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||P.length===0)return;const S=s.getRenderTarget(),E=s.getActiveCubeFace(),U=s.getActiveMipmapLevel(),B=s.state;B.setBlending(Mi),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const Q=f!==ui&&this.type===ui,I=f===ui&&this.type!==ui;for(let k=0,V=P.length;k<V;k++){const Y=P[k],J=Y.shadow;if(J===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(J.autoUpdate===!1&&J.needsUpdate===!1)continue;n.copy(J.mapSize);const Z=J.getFrameExtents();if(n.multiply(Z),r.copy(J.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(r.x=Math.floor(h/Z.x),n.x=r.x*Z.x,J.mapSize.x=r.x),n.y>h&&(r.y=Math.floor(h/Z.y),n.y=r.y*Z.y,J.mapSize.y=r.y)),J.map===null||Q===!0||I===!0){const re=this.type!==ui?{minFilter:Ct,magFilter:Ct}:{};J.map!==null&&J.map.dispose(),J.map=new ki(n.x,n.y,re),J.map.texture.name=Y.name+".shadowMap",J.camera.updateProjectionMatrix()}s.setRenderTarget(J.map),s.clear();const K=J.getViewportCount();for(let re=0;re<K;re++){const oe=J.getViewport(re);o.set(r.x*oe.x,r.y*oe.y,r.x*oe.z,r.y*oe.w),B.viewport(o),J.updateMatrices(Y,re),i=J.getFrustum(),y(C,N,J.camera,Y,this.type)}J.isPointLightShadow!==!0&&this.type===ui&&b(J,N),J.needsUpdate=!1}f=this.type,m.needsUpdate=!1,s.setRenderTarget(S,E,U)};function b(P,C){const N=e.update(_);d.defines.VSM_SAMPLES!==P.blurSamples&&(d.defines.VSM_SAMPLES=P.blurSamples,p.defines.VSM_SAMPLES=P.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new ki(n.x,n.y)),d.uniforms.shadow_pass.value=P.map.texture,d.uniforms.resolution.value=P.mapSize,d.uniforms.radius.value=P.radius,s.setRenderTarget(P.mapPass),s.clear(),s.renderBufferDirect(C,null,N,d,_,null),p.uniforms.shadow_pass.value=P.mapPass.texture,p.uniforms.resolution.value=P.mapSize,p.uniforms.radius.value=P.radius,s.setRenderTarget(P.map),s.clear(),s.renderBufferDirect(C,null,N,p,_,null)}function v(P,C,N,S){let E=null;const U=N.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(U!==void 0)E=U;else if(E=N.isPointLight===!0?c:a,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const B=E.uuid,Q=C.uuid;let I=l[B];I===void 0&&(I={},l[B]=I);let k=I[Q];k===void 0&&(k=E.clone(),I[Q]=k,C.addEventListener("dispose",R)),E=k}if(E.visible=C.visible,E.wireframe=C.wireframe,S===ui?E.side=C.shadowSide!==null?C.shadowSide:C.side:E.side=C.shadowSide!==null?C.shadowSide:u[C.side],E.alphaMap=C.alphaMap,E.alphaTest=C.alphaTest,E.map=C.map,E.clipShadows=C.clipShadows,E.clippingPlanes=C.clippingPlanes,E.clipIntersection=C.clipIntersection,E.displacementMap=C.displacementMap,E.displacementScale=C.displacementScale,E.displacementBias=C.displacementBias,E.wireframeLinewidth=C.wireframeLinewidth,E.linewidth=C.linewidth,N.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const B=s.properties.get(E);B.light=N}return E}function y(P,C,N,S,E){if(P.visible===!1)return;if(P.layers.test(C.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&E===ui)&&(!P.frustumCulled||i.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,P.matrixWorld);const Q=e.update(P),I=P.material;if(Array.isArray(I)){const k=Q.groups;for(let V=0,Y=k.length;V<Y;V++){const J=k[V],Z=I[J.materialIndex];if(Z&&Z.visible){const K=v(P,Z,S,E);P.onBeforeShadow(s,P,C,N,Q,K,J),s.renderBufferDirect(N,null,Q,K,P,J),P.onAfterShadow(s,P,C,N,Q,K,J)}}}else if(I.visible){const k=v(P,I,S,E);P.onBeforeShadow(s,P,C,N,Q,k,null),s.renderBufferDirect(N,null,Q,k,P,null),P.onAfterShadow(s,P,C,N,Q,k,null)}}const B=P.children;for(let Q=0,I=B.length;Q<I;Q++)y(B[Q],C,N,S,E)}function R(P){P.target.removeEventListener("dispose",R);for(const N in l){const S=l[N],E=P.target.uuid;E in S&&(S[E].dispose(),delete S[E])}}}function Um(s,e,t){const i=t.isWebGL2;function n(){let D=!1;const fe=new st;let pe=null;const De=new st(0,0,0,0);return{setMask:function(Re){pe!==Re&&!D&&(s.colorMask(Re,Re,Re,Re),pe=Re)},setLocked:function(Re){D=Re},setClear:function(Re,et,tt,mt,Tt){Tt===!0&&(Re*=mt,et*=mt,tt*=mt),fe.set(Re,et,tt,mt),De.equals(fe)===!1&&(s.clearColor(Re,et,tt,mt),De.copy(fe))},reset:function(){D=!1,pe=null,De.set(-1,0,0,0)}}}function r(){let D=!1,fe=null,pe=null,De=null;return{setTest:function(Re){Re?Oe(s.DEPTH_TEST):be(s.DEPTH_TEST)},setMask:function(Re){fe!==Re&&!D&&(s.depthMask(Re),fe=Re)},setFunc:function(Re){if(pe!==Re){switch(Re){case Vl:s.depthFunc(s.NEVER);break;case Hl:s.depthFunc(s.ALWAYS);break;case Wl:s.depthFunc(s.LESS);break;case Rs:s.depthFunc(s.LEQUAL);break;case Xl:s.depthFunc(s.EQUAL);break;case ql:s.depthFunc(s.GEQUAL);break;case jl:s.depthFunc(s.GREATER);break;case Yl:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}pe=Re}},setLocked:function(Re){D=Re},setClear:function(Re){De!==Re&&(s.clearDepth(Re),De=Re)},reset:function(){D=!1,fe=null,pe=null,De=null}}}function o(){let D=!1,fe=null,pe=null,De=null,Re=null,et=null,tt=null,mt=null,Tt=null;return{setTest:function(it){D||(it?Oe(s.STENCIL_TEST):be(s.STENCIL_TEST))},setMask:function(it){fe!==it&&!D&&(s.stencilMask(it),fe=it)},setFunc:function(it,At,Kt){(pe!==it||De!==At||Re!==Kt)&&(s.stencilFunc(it,At,Kt),pe=it,De=At,Re=Kt)},setOp:function(it,At,Kt){(et!==it||tt!==At||mt!==Kt)&&(s.stencilOp(it,At,Kt),et=it,tt=At,mt=Kt)},setLocked:function(it){D=it},setClear:function(it){Tt!==it&&(s.clearStencil(it),Tt=it)},reset:function(){D=!1,fe=null,pe=null,De=null,Re=null,et=null,tt=null,mt=null,Tt=null}}}const a=new n,c=new r,l=new o,h=new WeakMap,u=new WeakMap;let d={},p={},g=new WeakMap,_=[],m=null,f=!1,b=null,v=null,y=null,R=null,P=null,C=null,N=null,S=new Pe(0,0,0),E=0,U=!1,B=null,Q=null,I=null,k=null,V=null;const Y=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let J=!1,Z=0;const K=s.getParameter(s.VERSION);K.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(K)[1]),J=Z>=1):K.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),J=Z>=2);let re=null,oe={};const W=s.getParameter(s.SCISSOR_BOX),X=s.getParameter(s.VIEWPORT),ue=new st().fromArray(W),ye=new st().fromArray(X);function _e(D,fe,pe,De){const Re=new Uint8Array(4),et=s.createTexture();s.bindTexture(D,et),s.texParameteri(D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(D,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let tt=0;tt<pe;tt++)i&&(D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY)?s.texImage3D(fe,0,s.RGBA,1,1,De,0,s.RGBA,s.UNSIGNED_BYTE,Re):s.texImage2D(fe+tt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Re);return et}const Ie={};Ie[s.TEXTURE_2D]=_e(s.TEXTURE_2D,s.TEXTURE_2D,1),Ie[s.TEXTURE_CUBE_MAP]=_e(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Ie[s.TEXTURE_2D_ARRAY]=_e(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Ie[s.TEXTURE_3D]=_e(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),Oe(s.DEPTH_TEST),c.setFunc(Rs),me(!1),T(Eo),Oe(s.CULL_FACE),q(Mi);function Oe(D){d[D]!==!0&&(s.enable(D),d[D]=!0)}function be(D){d[D]!==!1&&(s.disable(D),d[D]=!1)}function Ne(D,fe){return p[D]!==fe?(s.bindFramebuffer(D,fe),p[D]=fe,i&&(D===s.DRAW_FRAMEBUFFER&&(p[s.FRAMEBUFFER]=fe),D===s.FRAMEBUFFER&&(p[s.DRAW_FRAMEBUFFER]=fe)),!0):!1}function L(D,fe){let pe=_,De=!1;if(D)if(pe=g.get(fe),pe===void 0&&(pe=[],g.set(fe,pe)),D.isWebGLMultipleRenderTargets){const Re=D.texture;if(pe.length!==Re.length||pe[0]!==s.COLOR_ATTACHMENT0){for(let et=0,tt=Re.length;et<tt;et++)pe[et]=s.COLOR_ATTACHMENT0+et;pe.length=Re.length,De=!0}}else pe[0]!==s.COLOR_ATTACHMENT0&&(pe[0]=s.COLOR_ATTACHMENT0,De=!0);else pe[0]!==s.BACK&&(pe[0]=s.BACK,De=!0);De&&(t.isWebGL2?s.drawBuffers(pe):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(pe))}function ce(D){return m!==D?(s.useProgram(D),m=D,!0):!1}const j={[Di]:s.FUNC_ADD,[wl]:s.FUNC_SUBTRACT,[Pl]:s.FUNC_REVERSE_SUBTRACT};if(i)j[Po]=s.MIN,j[Co]=s.MAX;else{const D=e.get("EXT_blend_minmax");D!==null&&(j[Po]=D.MIN_EXT,j[Co]=D.MAX_EXT)}const ae={[Cl]:s.ZERO,[Rl]:s.ONE,[Ll]:s.SRC_COLOR,[Ur]:s.SRC_ALPHA,[Ol]:s.SRC_ALPHA_SATURATE,[Nl]:s.DST_COLOR,[Dl]:s.DST_ALPHA,[Il]:s.ONE_MINUS_SRC_COLOR,[Nr]:s.ONE_MINUS_SRC_ALPHA,[Fl]:s.ONE_MINUS_DST_COLOR,[Ul]:s.ONE_MINUS_DST_ALPHA,[kl]:s.CONSTANT_COLOR,[Bl]:s.ONE_MINUS_CONSTANT_COLOR,[zl]:s.CONSTANT_ALPHA,[Gl]:s.ONE_MINUS_CONSTANT_ALPHA};function q(D,fe,pe,De,Re,et,tt,mt,Tt,it){if(D===Mi){f===!0&&(be(s.BLEND),f=!1);return}if(f===!1&&(Oe(s.BLEND),f=!0),D!==Al){if(D!==b||it!==U){if((v!==Di||P!==Di)&&(s.blendEquation(s.FUNC_ADD),v=Di,P=Di),it)switch(D){case dn:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case To:s.blendFunc(s.ONE,s.ONE);break;case Ao:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case wo:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case dn:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case To:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Ao:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case wo:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}y=null,R=null,C=null,N=null,S.set(0,0,0),E=0,b=D,U=it}return}Re=Re||fe,et=et||pe,tt=tt||De,(fe!==v||Re!==P)&&(s.blendEquationSeparate(j[fe],j[Re]),v=fe,P=Re),(pe!==y||De!==R||et!==C||tt!==N)&&(s.blendFuncSeparate(ae[pe],ae[De],ae[et],ae[tt]),y=pe,R=De,C=et,N=tt),(mt.equals(S)===!1||Tt!==E)&&(s.blendColor(mt.r,mt.g,mt.b,Tt),S.copy(mt),E=Tt),b=D,U=!1}function Te(D,fe){D.side===Yt?be(s.CULL_FACE):Oe(s.CULL_FACE);let pe=D.side===Lt;fe&&(pe=!pe),me(pe),D.blending===dn&&D.transparent===!1?q(Mi):q(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),c.setFunc(D.depthFunc),c.setTest(D.depthTest),c.setMask(D.depthWrite),a.setMask(D.colorWrite);const De=D.stencilWrite;l.setTest(De),De&&(l.setMask(D.stencilWriteMask),l.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),l.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),O(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Oe(s.SAMPLE_ALPHA_TO_COVERAGE):be(s.SAMPLE_ALPHA_TO_COVERAGE)}function me(D){B!==D&&(D?s.frontFace(s.CW):s.frontFace(s.CCW),B=D)}function T(D){D!==bl?(Oe(s.CULL_FACE),D!==Q&&(D===Eo?s.cullFace(s.BACK):D===El?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):be(s.CULL_FACE),Q=D}function x(D){D!==I&&(J&&s.lineWidth(D),I=D)}function O(D,fe,pe){D?(Oe(s.POLYGON_OFFSET_FILL),(k!==fe||V!==pe)&&(s.polygonOffset(fe,pe),k=fe,V=pe)):be(s.POLYGON_OFFSET_FILL)}function ne(D){D?Oe(s.SCISSOR_TEST):be(s.SCISSOR_TEST)}function te(D){D===void 0&&(D=s.TEXTURE0+Y-1),re!==D&&(s.activeTexture(D),re=D)}function ee(D,fe,pe){pe===void 0&&(re===null?pe=s.TEXTURE0+Y-1:pe=re);let De=oe[pe];De===void 0&&(De={type:void 0,texture:void 0},oe[pe]=De),(De.type!==D||De.texture!==fe)&&(re!==pe&&(s.activeTexture(pe),re=pe),s.bindTexture(D,fe||Ie[D]),De.type=D,De.texture=fe)}function Se(){const D=oe[re];D!==void 0&&D.type!==void 0&&(s.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function de(){try{s.compressedTexImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ve(){try{s.compressedTexImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ce(){try{s.texSubImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Be(){try{s.texSubImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ie(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Je(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function je(){try{s.texStorage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Fe(){try{s.texStorage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ae(){try{s.texImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function xe(){try{s.texImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ge(D){ue.equals(D)===!1&&(s.scissor(D.x,D.y,D.z,D.w),ue.copy(D))}function Ke(D){ye.equals(D)===!1&&(s.viewport(D.x,D.y,D.z,D.w),ye.copy(D))}function ct(D,fe){let pe=u.get(fe);pe===void 0&&(pe=new WeakMap,u.set(fe,pe));let De=pe.get(D);De===void 0&&(De=s.getUniformBlockIndex(fe,D.name),pe.set(D,De))}function We(D,fe){const De=u.get(fe).get(D);h.get(fe)!==De&&(s.uniformBlockBinding(fe,De,D.__bindingPointIndex),h.set(fe,De))}function le(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),i===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),d={},re=null,oe={},p={},g=new WeakMap,_=[],m=null,f=!1,b=null,v=null,y=null,R=null,P=null,C=null,N=null,S=new Pe(0,0,0),E=0,U=!1,B=null,Q=null,I=null,k=null,V=null,ue.set(0,0,s.canvas.width,s.canvas.height),ye.set(0,0,s.canvas.width,s.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:Oe,disable:be,bindFramebuffer:Ne,drawBuffers:L,useProgram:ce,setBlending:q,setMaterial:Te,setFlipSided:me,setCullFace:T,setLineWidth:x,setPolygonOffset:O,setScissorTest:ne,activeTexture:te,bindTexture:ee,unbindTexture:Se,compressedTexImage2D:de,compressedTexImage3D:ve,texImage2D:Ae,texImage3D:xe,updateUBOMapping:ct,uniformBlockBinding:We,texStorage2D:je,texStorage3D:Fe,texSubImage2D:Ce,texSubImage3D:Be,compressedTexSubImage2D:ie,compressedTexSubImage3D:Je,scissor:Ge,viewport:Ke,reset:le}}function Nm(s,e,t,i,n,r,o){const a=n.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,x){return p?new OffscreenCanvas(T,x):kn("canvas")}function _(T,x,O,ne){let te=1;if((T.width>ne||T.height>ne)&&(te=ne/Math.max(T.width,T.height)),te<1||x===!0)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap){const ee=x?Ns:Math.floor,Se=ee(te*T.width),de=ee(te*T.height);u===void 0&&(u=g(Se,de));const ve=O?g(Se,de):u;return ve.width=Se,ve.height=de,ve.getContext("2d").drawImage(T,0,0,Se,de),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+T.width+"x"+T.height+") to ("+Se+"x"+de+")."),ve}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+T.width+"x"+T.height+")."),T;return T}function m(T){return Gr(T.width)&&Gr(T.height)}function f(T){return a?!1:T.wrapS!==Jt||T.wrapT!==Jt||T.minFilter!==Ct&&T.minFilter!==Gt}function b(T,x){return T.generateMipmaps&&x&&T.minFilter!==Ct&&T.minFilter!==Gt}function v(T){s.generateMipmap(T)}function y(T,x,O,ne,te=!1){if(a===!1)return x;if(T!==null){if(s[T]!==void 0)return s[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let ee=x;if(x===s.RED&&(O===s.FLOAT&&(ee=s.R32F),O===s.HALF_FLOAT&&(ee=s.R16F),O===s.UNSIGNED_BYTE&&(ee=s.R8)),x===s.RED_INTEGER&&(O===s.UNSIGNED_BYTE&&(ee=s.R8UI),O===s.UNSIGNED_SHORT&&(ee=s.R16UI),O===s.UNSIGNED_INT&&(ee=s.R32UI),O===s.BYTE&&(ee=s.R8I),O===s.SHORT&&(ee=s.R16I),O===s.INT&&(ee=s.R32I)),x===s.RG&&(O===s.FLOAT&&(ee=s.RG32F),O===s.HALF_FLOAT&&(ee=s.RG16F),O===s.UNSIGNED_BYTE&&(ee=s.RG8)),x===s.RGBA){const Se=te?Ls:$e.getTransfer(ne);O===s.FLOAT&&(ee=s.RGBA32F),O===s.HALF_FLOAT&&(ee=s.RGBA16F),O===s.UNSIGNED_BYTE&&(ee=Se===nt?s.SRGB8_ALPHA8:s.RGBA8),O===s.UNSIGNED_SHORT_4_4_4_4&&(ee=s.RGBA4),O===s.UNSIGNED_SHORT_5_5_5_1&&(ee=s.RGB5_A1)}return(ee===s.R16F||ee===s.R32F||ee===s.RG16F||ee===s.RG32F||ee===s.RGBA16F||ee===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function R(T,x,O){return b(T,O)===!0||T.isFramebufferTexture&&T.minFilter!==Ct&&T.minFilter!==Gt?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function P(T){return T===Ct||T===Ro||T===Ks?s.NEAREST:s.LINEAR}function C(T){const x=T.target;x.removeEventListener("dispose",C),S(x),x.isVideoTexture&&h.delete(x)}function N(T){const x=T.target;x.removeEventListener("dispose",N),U(x)}function S(T){const x=i.get(T);if(x.__webglInit===void 0)return;const O=T.source,ne=d.get(O);if(ne){const te=ne[x.__cacheKey];te.usedTimes--,te.usedTimes===0&&E(T),Object.keys(ne).length===0&&d.delete(O)}i.remove(T)}function E(T){const x=i.get(T);s.deleteTexture(x.__webglTexture);const O=T.source,ne=d.get(O);delete ne[x.__cacheKey],o.memory.textures--}function U(T){const x=T.texture,O=i.get(T),ne=i.get(x);if(ne.__webglTexture!==void 0&&(s.deleteTexture(ne.__webglTexture),o.memory.textures--),T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(O.__webglFramebuffer[te]))for(let ee=0;ee<O.__webglFramebuffer[te].length;ee++)s.deleteFramebuffer(O.__webglFramebuffer[te][ee]);else s.deleteFramebuffer(O.__webglFramebuffer[te]);O.__webglDepthbuffer&&s.deleteRenderbuffer(O.__webglDepthbuffer[te])}else{if(Array.isArray(O.__webglFramebuffer))for(let te=0;te<O.__webglFramebuffer.length;te++)s.deleteFramebuffer(O.__webglFramebuffer[te]);else s.deleteFramebuffer(O.__webglFramebuffer);if(O.__webglDepthbuffer&&s.deleteRenderbuffer(O.__webglDepthbuffer),O.__webglMultisampledFramebuffer&&s.deleteFramebuffer(O.__webglMultisampledFramebuffer),O.__webglColorRenderbuffer)for(let te=0;te<O.__webglColorRenderbuffer.length;te++)O.__webglColorRenderbuffer[te]&&s.deleteRenderbuffer(O.__webglColorRenderbuffer[te]);O.__webglDepthRenderbuffer&&s.deleteRenderbuffer(O.__webglDepthRenderbuffer)}if(T.isWebGLMultipleRenderTargets)for(let te=0,ee=x.length;te<ee;te++){const Se=i.get(x[te]);Se.__webglTexture&&(s.deleteTexture(Se.__webglTexture),o.memory.textures--),i.remove(x[te])}i.remove(x),i.remove(T)}let B=0;function Q(){B=0}function I(){const T=B;return T>=n.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+n.maxTextures),B+=1,T}function k(T){const x=[];return x.push(T.wrapS),x.push(T.wrapT),x.push(T.wrapR||0),x.push(T.magFilter),x.push(T.minFilter),x.push(T.anisotropy),x.push(T.internalFormat),x.push(T.format),x.push(T.type),x.push(T.generateMipmaps),x.push(T.premultiplyAlpha),x.push(T.flipY),x.push(T.unpackAlignment),x.push(T.colorSpace),x.join()}function V(T,x){const O=i.get(T);if(T.isVideoTexture&&Te(T),T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){const ne=T.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ue(O,T,x);return}}t.bindTexture(s.TEXTURE_2D,O.__webglTexture,s.TEXTURE0+x)}function Y(T,x){const O=i.get(T);if(T.version>0&&O.__version!==T.version){ue(O,T,x);return}t.bindTexture(s.TEXTURE_2D_ARRAY,O.__webglTexture,s.TEXTURE0+x)}function J(T,x){const O=i.get(T);if(T.version>0&&O.__version!==T.version){ue(O,T,x);return}t.bindTexture(s.TEXTURE_3D,O.__webglTexture,s.TEXTURE0+x)}function Z(T,x){const O=i.get(T);if(T.version>0&&O.__version!==T.version){ye(O,T,x);return}t.bindTexture(s.TEXTURE_CUBE_MAP,O.__webglTexture,s.TEXTURE0+x)}const K={[kr]:s.REPEAT,[Jt]:s.CLAMP_TO_EDGE,[Br]:s.MIRRORED_REPEAT},re={[Ct]:s.NEAREST,[Ro]:s.NEAREST_MIPMAP_NEAREST,[Ks]:s.NEAREST_MIPMAP_LINEAR,[Gt]:s.LINEAR,[nh]:s.LINEAR_MIPMAP_NEAREST,[Nn]:s.LINEAR_MIPMAP_LINEAR},oe={[mh]:s.NEVER,[Sh]:s.ALWAYS,[gh]:s.LESS,[Nc]:s.LEQUAL,[_h]:s.EQUAL,[yh]:s.GEQUAL,[vh]:s.GREATER,[xh]:s.NOTEQUAL};function W(T,x,O){if(O?(s.texParameteri(T,s.TEXTURE_WRAP_S,K[x.wrapS]),s.texParameteri(T,s.TEXTURE_WRAP_T,K[x.wrapT]),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,K[x.wrapR]),s.texParameteri(T,s.TEXTURE_MAG_FILTER,re[x.magFilter]),s.texParameteri(T,s.TEXTURE_MIN_FILTER,re[x.minFilter])):(s.texParameteri(T,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(T,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(x.wrapS!==Jt||x.wrapT!==Jt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(T,s.TEXTURE_MAG_FILTER,P(x.magFilter)),s.texParameteri(T,s.TEXTURE_MIN_FILTER,P(x.minFilter)),x.minFilter!==Ct&&x.minFilter!==Gt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),x.compareFunction&&(s.texParameteri(T,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(T,s.TEXTURE_COMPARE_FUNC,oe[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ne=e.get("EXT_texture_filter_anisotropic");if(x.magFilter===Ct||x.minFilter!==Ks&&x.minFilter!==Nn||x.type===Si&&e.has("OES_texture_float_linear")===!1||a===!1&&x.type===Fn&&e.has("OES_texture_half_float_linear")===!1)return;(x.anisotropy>1||i.get(x).__currentAnisotropy)&&(s.texParameterf(T,ne.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,n.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy)}}function X(T,x){let O=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",C));const ne=x.source;let te=d.get(ne);te===void 0&&(te={},d.set(ne,te));const ee=k(x);if(ee!==T.__cacheKey){te[ee]===void 0&&(te[ee]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,O=!0),te[ee].usedTimes++;const Se=te[T.__cacheKey];Se!==void 0&&(te[T.__cacheKey].usedTimes--,Se.usedTimes===0&&E(x)),T.__cacheKey=ee,T.__webglTexture=te[ee].texture}return O}function ue(T,x,O){let ne=s.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(ne=s.TEXTURE_2D_ARRAY),x.isData3DTexture&&(ne=s.TEXTURE_3D);const te=X(T,x),ee=x.source;t.bindTexture(ne,T.__webglTexture,s.TEXTURE0+O);const Se=i.get(ee);if(ee.version!==Se.__version||te===!0){t.activeTexture(s.TEXTURE0+O);const de=$e.getPrimaries($e.workingColorSpace),ve=x.colorSpace===Vt?null:$e.getPrimaries(x.colorSpace),Ce=x.colorSpace===Vt||de===ve?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);const Be=f(x)&&m(x.image)===!1;let ie=_(x.image,Be,!1,n.maxTextureSize);ie=me(x,ie);const Je=m(ie)||a,je=r.convert(x.format,x.colorSpace);let Fe=r.convert(x.type),Ae=y(x.internalFormat,je,Fe,x.colorSpace,x.isVideoTexture);W(ne,x,Je);let xe;const Ge=x.mipmaps,Ke=a&&x.isVideoTexture!==!0&&Ae!==Ic,ct=Se.__version===void 0||te===!0,We=R(x,ie,Je);if(x.isDepthTexture)Ae=s.DEPTH_COMPONENT,a?x.type===Si?Ae=s.DEPTH_COMPONENT32F:x.type===yi?Ae=s.DEPTH_COMPONENT24:x.type===Ni?Ae=s.DEPTH24_STENCIL8:Ae=s.DEPTH_COMPONENT16:x.type===Si&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),x.format===Fi&&Ae===s.DEPTH_COMPONENT&&x.type!==$r&&x.type!==yi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),x.type=yi,Fe=r.convert(x.type)),x.format===gn&&Ae===s.DEPTH_COMPONENT&&(Ae=s.DEPTH_STENCIL,x.type!==Ni&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),x.type=Ni,Fe=r.convert(x.type))),ct&&(Ke?t.texStorage2D(s.TEXTURE_2D,1,Ae,ie.width,ie.height):t.texImage2D(s.TEXTURE_2D,0,Ae,ie.width,ie.height,0,je,Fe,null));else if(x.isDataTexture)if(Ge.length>0&&Je){Ke&&ct&&t.texStorage2D(s.TEXTURE_2D,We,Ae,Ge[0].width,Ge[0].height);for(let le=0,D=Ge.length;le<D;le++)xe=Ge[le],Ke?t.texSubImage2D(s.TEXTURE_2D,le,0,0,xe.width,xe.height,je,Fe,xe.data):t.texImage2D(s.TEXTURE_2D,le,Ae,xe.width,xe.height,0,je,Fe,xe.data);x.generateMipmaps=!1}else Ke?(ct&&t.texStorage2D(s.TEXTURE_2D,We,Ae,ie.width,ie.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,ie.width,ie.height,je,Fe,ie.data)):t.texImage2D(s.TEXTURE_2D,0,Ae,ie.width,ie.height,0,je,Fe,ie.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Ke&&ct&&t.texStorage3D(s.TEXTURE_2D_ARRAY,We,Ae,Ge[0].width,Ge[0].height,ie.depth);for(let le=0,D=Ge.length;le<D;le++)xe=Ge[le],x.format!==Zt?je!==null?Ke?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,le,0,0,0,xe.width,xe.height,ie.depth,je,xe.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,le,Ae,xe.width,xe.height,ie.depth,0,xe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ke?t.texSubImage3D(s.TEXTURE_2D_ARRAY,le,0,0,0,xe.width,xe.height,ie.depth,je,Fe,xe.data):t.texImage3D(s.TEXTURE_2D_ARRAY,le,Ae,xe.width,xe.height,ie.depth,0,je,Fe,xe.data)}else{Ke&&ct&&t.texStorage2D(s.TEXTURE_2D,We,Ae,Ge[0].width,Ge[0].height);for(let le=0,D=Ge.length;le<D;le++)xe=Ge[le],x.format!==Zt?je!==null?Ke?t.compressedTexSubImage2D(s.TEXTURE_2D,le,0,0,xe.width,xe.height,je,xe.data):t.compressedTexImage2D(s.TEXTURE_2D,le,Ae,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ke?t.texSubImage2D(s.TEXTURE_2D,le,0,0,xe.width,xe.height,je,Fe,xe.data):t.texImage2D(s.TEXTURE_2D,le,Ae,xe.width,xe.height,0,je,Fe,xe.data)}else if(x.isDataArrayTexture)Ke?(ct&&t.texStorage3D(s.TEXTURE_2D_ARRAY,We,Ae,ie.width,ie.height,ie.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,je,Fe,ie.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,Ae,ie.width,ie.height,ie.depth,0,je,Fe,ie.data);else if(x.isData3DTexture)Ke?(ct&&t.texStorage3D(s.TEXTURE_3D,We,Ae,ie.width,ie.height,ie.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,je,Fe,ie.data)):t.texImage3D(s.TEXTURE_3D,0,Ae,ie.width,ie.height,ie.depth,0,je,Fe,ie.data);else if(x.isFramebufferTexture){if(ct)if(Ke)t.texStorage2D(s.TEXTURE_2D,We,Ae,ie.width,ie.height);else{let le=ie.width,D=ie.height;for(let fe=0;fe<We;fe++)t.texImage2D(s.TEXTURE_2D,fe,Ae,le,D,0,je,Fe,null),le>>=1,D>>=1}}else if(Ge.length>0&&Je){Ke&&ct&&t.texStorage2D(s.TEXTURE_2D,We,Ae,Ge[0].width,Ge[0].height);for(let le=0,D=Ge.length;le<D;le++)xe=Ge[le],Ke?t.texSubImage2D(s.TEXTURE_2D,le,0,0,je,Fe,xe):t.texImage2D(s.TEXTURE_2D,le,Ae,je,Fe,xe);x.generateMipmaps=!1}else Ke?(ct&&t.texStorage2D(s.TEXTURE_2D,We,Ae,ie.width,ie.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,je,Fe,ie)):t.texImage2D(s.TEXTURE_2D,0,Ae,je,Fe,ie);b(x,Je)&&v(ne),Se.__version=ee.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function ye(T,x,O){if(x.image.length!==6)return;const ne=X(T,x),te=x.source;t.bindTexture(s.TEXTURE_CUBE_MAP,T.__webglTexture,s.TEXTURE0+O);const ee=i.get(te);if(te.version!==ee.__version||ne===!0){t.activeTexture(s.TEXTURE0+O);const Se=$e.getPrimaries($e.workingColorSpace),de=x.colorSpace===Vt?null:$e.getPrimaries(x.colorSpace),ve=x.colorSpace===Vt||Se===de?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);const Ce=x.isCompressedTexture||x.image[0].isCompressedTexture,Be=x.image[0]&&x.image[0].isDataTexture,ie=[];for(let le=0;le<6;le++)!Ce&&!Be?ie[le]=_(x.image[le],!1,!0,n.maxCubemapSize):ie[le]=Be?x.image[le].image:x.image[le],ie[le]=me(x,ie[le]);const Je=ie[0],je=m(Je)||a,Fe=r.convert(x.format,x.colorSpace),Ae=r.convert(x.type),xe=y(x.internalFormat,Fe,Ae,x.colorSpace),Ge=a&&x.isVideoTexture!==!0,Ke=ee.__version===void 0||ne===!0;let ct=R(x,Je,je);W(s.TEXTURE_CUBE_MAP,x,je);let We;if(Ce){Ge&&Ke&&t.texStorage2D(s.TEXTURE_CUBE_MAP,ct,xe,Je.width,Je.height);for(let le=0;le<6;le++){We=ie[le].mipmaps;for(let D=0;D<We.length;D++){const fe=We[D];x.format!==Zt?Fe!==null?Ge?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+le,D,0,0,fe.width,fe.height,Fe,fe.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+le,D,xe,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ge?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+le,D,0,0,fe.width,fe.height,Fe,Ae,fe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+le,D,xe,fe.width,fe.height,0,Fe,Ae,fe.data)}}}else{We=x.mipmaps,Ge&&Ke&&(We.length>0&&ct++,t.texStorage2D(s.TEXTURE_CUBE_MAP,ct,xe,ie[0].width,ie[0].height));for(let le=0;le<6;le++)if(Be){Ge?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,ie[le].width,ie[le].height,Fe,Ae,ie[le].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,xe,ie[le].width,ie[le].height,0,Fe,Ae,ie[le].data);for(let D=0;D<We.length;D++){const pe=We[D].image[le].image;Ge?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+le,D+1,0,0,pe.width,pe.height,Fe,Ae,pe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+le,D+1,xe,pe.width,pe.height,0,Fe,Ae,pe.data)}}else{Ge?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,0,0,Fe,Ae,ie[le]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,xe,Fe,Ae,ie[le]);for(let D=0;D<We.length;D++){const fe=We[D];Ge?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+le,D+1,0,0,Fe,Ae,fe.image[le]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+le,D+1,xe,Fe,Ae,fe.image[le])}}}b(x,je)&&v(s.TEXTURE_CUBE_MAP),ee.__version=te.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function _e(T,x,O,ne,te,ee){const Se=r.convert(O.format,O.colorSpace),de=r.convert(O.type),ve=y(O.internalFormat,Se,de,O.colorSpace);if(!i.get(x).__hasExternalTextures){const Be=Math.max(1,x.width>>ee),ie=Math.max(1,x.height>>ee);te===s.TEXTURE_3D||te===s.TEXTURE_2D_ARRAY?t.texImage3D(te,ee,ve,Be,ie,x.depth,0,Se,de,null):t.texImage2D(te,ee,ve,Be,ie,0,Se,de,null)}t.bindFramebuffer(s.FRAMEBUFFER,T),q(x)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ne,te,i.get(O).__webglTexture,0,ae(x)):(te===s.TEXTURE_2D||te>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,ne,te,i.get(O).__webglTexture,ee),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ie(T,x,O){if(s.bindRenderbuffer(s.RENDERBUFFER,T),x.depthBuffer&&!x.stencilBuffer){let ne=a===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(O||q(x)){const te=x.depthTexture;te&&te.isDepthTexture&&(te.type===Si?ne=s.DEPTH_COMPONENT32F:te.type===yi&&(ne=s.DEPTH_COMPONENT24));const ee=ae(x);q(x)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ee,ne,x.width,x.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,ee,ne,x.width,x.height)}else s.renderbufferStorage(s.RENDERBUFFER,ne,x.width,x.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,T)}else if(x.depthBuffer&&x.stencilBuffer){const ne=ae(x);O&&q(x)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ne,s.DEPTH24_STENCIL8,x.width,x.height):q(x)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ne,s.DEPTH24_STENCIL8,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,x.width,x.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,T)}else{const ne=x.isWebGLMultipleRenderTargets===!0?x.texture:[x.texture];for(let te=0;te<ne.length;te++){const ee=ne[te],Se=r.convert(ee.format,ee.colorSpace),de=r.convert(ee.type),ve=y(ee.internalFormat,Se,de,ee.colorSpace),Ce=ae(x);O&&q(x)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ce,ve,x.width,x.height):q(x)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ce,ve,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,ve,x.width,x.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Oe(T,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,T),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),V(x.depthTexture,0);const ne=i.get(x.depthTexture).__webglTexture,te=ae(x);if(x.depthTexture.format===Fi)q(x)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ne,0,te):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ne,0);else if(x.depthTexture.format===gn)q(x)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ne,0,te):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function be(T){const x=i.get(T),O=T.isWebGLCubeRenderTarget===!0;if(T.depthTexture&&!x.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");Oe(x.__webglFramebuffer,T)}else if(O){x.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)t.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer[ne]),x.__webglDepthbuffer[ne]=s.createRenderbuffer(),Ie(x.__webglDepthbuffer[ne],T,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer=s.createRenderbuffer(),Ie(x.__webglDepthbuffer,T,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ne(T,x,O){const ne=i.get(T);x!==void 0&&_e(ne.__webglFramebuffer,T,T.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),O!==void 0&&be(T)}function L(T){const x=T.texture,O=i.get(T),ne=i.get(x);T.addEventListener("dispose",N),T.isWebGLMultipleRenderTargets!==!0&&(ne.__webglTexture===void 0&&(ne.__webglTexture=s.createTexture()),ne.__version=x.version,o.memory.textures++);const te=T.isWebGLCubeRenderTarget===!0,ee=T.isWebGLMultipleRenderTargets===!0,Se=m(T)||a;if(te){O.__webglFramebuffer=[];for(let de=0;de<6;de++)if(a&&x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer[de]=[];for(let ve=0;ve<x.mipmaps.length;ve++)O.__webglFramebuffer[de][ve]=s.createFramebuffer()}else O.__webglFramebuffer[de]=s.createFramebuffer()}else{if(a&&x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer=[];for(let de=0;de<x.mipmaps.length;de++)O.__webglFramebuffer[de]=s.createFramebuffer()}else O.__webglFramebuffer=s.createFramebuffer();if(ee)if(n.drawBuffers){const de=T.texture;for(let ve=0,Ce=de.length;ve<Ce;ve++){const Be=i.get(de[ve]);Be.__webglTexture===void 0&&(Be.__webglTexture=s.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&T.samples>0&&q(T)===!1){const de=ee?x:[x];O.__webglMultisampledFramebuffer=s.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ve=0;ve<de.length;ve++){const Ce=de[ve];O.__webglColorRenderbuffer[ve]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,O.__webglColorRenderbuffer[ve]);const Be=r.convert(Ce.format,Ce.colorSpace),ie=r.convert(Ce.type),Je=y(Ce.internalFormat,Be,ie,Ce.colorSpace,T.isXRRenderTarget===!0),je=ae(T);s.renderbufferStorageMultisample(s.RENDERBUFFER,je,Je,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ve,s.RENDERBUFFER,O.__webglColorRenderbuffer[ve])}s.bindRenderbuffer(s.RENDERBUFFER,null),T.depthBuffer&&(O.__webglDepthRenderbuffer=s.createRenderbuffer(),Ie(O.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(te){t.bindTexture(s.TEXTURE_CUBE_MAP,ne.__webglTexture),W(s.TEXTURE_CUBE_MAP,x,Se);for(let de=0;de<6;de++)if(a&&x.mipmaps&&x.mipmaps.length>0)for(let ve=0;ve<x.mipmaps.length;ve++)_e(O.__webglFramebuffer[de][ve],T,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+de,ve);else _e(O.__webglFramebuffer[de],T,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+de,0);b(x,Se)&&v(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ee){const de=T.texture;for(let ve=0,Ce=de.length;ve<Ce;ve++){const Be=de[ve],ie=i.get(Be);t.bindTexture(s.TEXTURE_2D,ie.__webglTexture),W(s.TEXTURE_2D,Be,Se),_e(O.__webglFramebuffer,T,Be,s.COLOR_ATTACHMENT0+ve,s.TEXTURE_2D,0),b(Be,Se)&&v(s.TEXTURE_2D)}t.unbindTexture()}else{let de=s.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(a?de=T.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(de,ne.__webglTexture),W(de,x,Se),a&&x.mipmaps&&x.mipmaps.length>0)for(let ve=0;ve<x.mipmaps.length;ve++)_e(O.__webglFramebuffer[ve],T,x,s.COLOR_ATTACHMENT0,de,ve);else _e(O.__webglFramebuffer,T,x,s.COLOR_ATTACHMENT0,de,0);b(x,Se)&&v(de),t.unbindTexture()}T.depthBuffer&&be(T)}function ce(T){const x=m(T)||a,O=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let ne=0,te=O.length;ne<te;ne++){const ee=O[ne];if(b(ee,x)){const Se=T.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,de=i.get(ee).__webglTexture;t.bindTexture(Se,de),v(Se),t.unbindTexture()}}}function j(T){if(a&&T.samples>0&&q(T)===!1){const x=T.isWebGLMultipleRenderTargets?T.texture:[T.texture],O=T.width,ne=T.height;let te=s.COLOR_BUFFER_BIT;const ee=[],Se=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,de=i.get(T),ve=T.isWebGLMultipleRenderTargets===!0;if(ve)for(let Ce=0;Ce<x.length;Ce++)t.bindFramebuffer(s.FRAMEBUFFER,de.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ce,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,de.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ce,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,de.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,de.__webglFramebuffer);for(let Ce=0;Ce<x.length;Ce++){ee.push(s.COLOR_ATTACHMENT0+Ce),T.depthBuffer&&ee.push(Se);const Be=de.__ignoreDepthValues!==void 0?de.__ignoreDepthValues:!1;if(Be===!1&&(T.depthBuffer&&(te|=s.DEPTH_BUFFER_BIT),T.stencilBuffer&&(te|=s.STENCIL_BUFFER_BIT)),ve&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,de.__webglColorRenderbuffer[Ce]),Be===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[Se]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[Se])),ve){const ie=i.get(x[Ce]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ie,0)}s.blitFramebuffer(0,0,O,ne,0,0,O,ne,te,s.NEAREST),l&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ee)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ve)for(let Ce=0;Ce<x.length;Ce++){t.bindFramebuffer(s.FRAMEBUFFER,de.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ce,s.RENDERBUFFER,de.__webglColorRenderbuffer[Ce]);const Be=i.get(x[Ce]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,de.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ce,s.TEXTURE_2D,Be,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,de.__webglMultisampledFramebuffer)}}function ae(T){return Math.min(n.maxSamples,T.samples)}function q(T){const x=i.get(T);return a&&T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Te(T){const x=o.render.frame;h.get(T)!==x&&(h.set(T,x),T.update())}function me(T,x){const O=T.colorSpace,ne=T.format,te=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||T.format===zr||O!==fi&&O!==Vt&&($e.getTransfer(O)===nt?a===!1?e.has("EXT_sRGB")===!0&&ne===Zt?(T.format=zr,T.minFilter=Gt,T.generateMipmaps=!1):x=Oc.sRGBToLinear(x):(ne!==Zt||te!==Ei)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),x}this.allocateTextureUnit=I,this.resetTextureUnits=Q,this.setTexture2D=V,this.setTexture2DArray=Y,this.setTexture3D=J,this.setTextureCube=Z,this.rebindTextures=Ne,this.setupRenderTarget=L,this.updateRenderTargetMipmap=ce,this.updateMultisampleRenderTarget=j,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=q}function Fm(s,e,t){const i=t.isWebGL2;function n(r,o=Vt){let a;const c=$e.getTransfer(o);if(r===Ei)return s.UNSIGNED_BYTE;if(r===wc)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Pc)return s.UNSIGNED_SHORT_5_5_5_1;if(r===sh)return s.BYTE;if(r===rh)return s.SHORT;if(r===$r)return s.UNSIGNED_SHORT;if(r===Ac)return s.INT;if(r===yi)return s.UNSIGNED_INT;if(r===Si)return s.FLOAT;if(r===Fn)return i?s.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===oh)return s.ALPHA;if(r===Zt)return s.RGBA;if(r===ah)return s.LUMINANCE;if(r===ch)return s.LUMINANCE_ALPHA;if(r===Fi)return s.DEPTH_COMPONENT;if(r===gn)return s.DEPTH_STENCIL;if(r===zr)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===lh)return s.RED;if(r===Cc)return s.RED_INTEGER;if(r===hh)return s.RG;if(r===Rc)return s.RG_INTEGER;if(r===Lc)return s.RGBA_INTEGER;if(r===$s||r===Qs||r===er||r===tr)if(c===nt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===$s)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Qs)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===er)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===tr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===$s)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Qs)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===er)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===tr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Lo||r===Io||r===Do||r===Uo)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===Lo)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Io)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Do)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Uo)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Ic)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===No||r===Fo)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===No)return c===nt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===Fo)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Oo||r===ko||r===Bo||r===zo||r===Go||r===Vo||r===Ho||r===Wo||r===Xo||r===qo||r===jo||r===Yo||r===Jo||r===Zo)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===Oo)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===ko)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Bo)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===zo)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Go)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Vo)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Ho)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Wo)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Xo)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===qo)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===jo)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Yo)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Jo)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Zo)return c===nt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===ir||r===Ko||r===$o)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===ir)return c===nt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Ko)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===$o)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===uh||r===Qo||r===ea||r===ta)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===ir)return a.COMPRESSED_RED_RGTC1_EXT;if(r===Qo)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===ea)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===ta)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Ni?i?s.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:n}}class Om extends Ot{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class kt extends xt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const km={type:"move"};class Tr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new kt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new kt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new kt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let n=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),f=this._getHandJoint(l,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&d>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(n=t.getPose(e.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(a.matrix.fromArray(n.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,n.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(n.linearVelocity)):a.hasLinearVelocity=!1,n.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(n.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(km)))}return a!==null&&(a.visible=n!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new kt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Bm extends vn{constructor(e,t){super();const i=this;let n=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,p=null,g=null;const _=t.getContextAttributes();let m=null,f=null;const b=[],v=[],y=new se;let R=null;const P=new Ot;P.layers.enable(1),P.viewport=new st;const C=new Ot;C.layers.enable(2),C.viewport=new st;const N=[P,C],S=new Om;S.layers.enable(1),S.layers.enable(2);let E=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let X=b[W];return X===void 0&&(X=new Tr,b[W]=X),X.getTargetRaySpace()},this.getControllerGrip=function(W){let X=b[W];return X===void 0&&(X=new Tr,b[W]=X),X.getGripSpace()},this.getHand=function(W){let X=b[W];return X===void 0&&(X=new Tr,b[W]=X),X.getHandSpace()};function B(W){const X=v.indexOf(W.inputSource);if(X===-1)return;const ue=b[X];ue!==void 0&&(ue.update(W.inputSource,W.frame,l||o),ue.dispatchEvent({type:W.type,data:W.inputSource}))}function Q(){n.removeEventListener("select",B),n.removeEventListener("selectstart",B),n.removeEventListener("selectend",B),n.removeEventListener("squeeze",B),n.removeEventListener("squeezestart",B),n.removeEventListener("squeezeend",B),n.removeEventListener("end",Q),n.removeEventListener("inputsourceschange",I);for(let W=0;W<b.length;W++){const X=v[W];X!==null&&(v[W]=null,b[W].disconnect(X))}E=null,U=null,e.setRenderTarget(m),p=null,d=null,u=null,n=null,f=null,oe.stop(),i.isPresenting=!1,e.setPixelRatio(R),e.setSize(y.width,y.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(W){l=W},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(W){if(n=W,n!==null){if(m=e.getRenderTarget(),n.addEventListener("select",B),n.addEventListener("selectstart",B),n.addEventListener("selectend",B),n.addEventListener("squeeze",B),n.addEventListener("squeezestart",B),n.addEventListener("squeezeend",B),n.addEventListener("end",Q),n.addEventListener("inputsourceschange",I),_.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(y),n.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const X={antialias:n.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(n,t,X),n.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),f=new ki(p.framebufferWidth,p.framebufferHeight,{format:Zt,type:Ei,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let X=null,ue=null,ye=null;_.depth&&(ye=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,X=_.stencil?gn:Fi,ue=_.stencil?Ni:yi);const _e={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:r};u=new XRWebGLBinding(n,t),d=u.createProjectionLayer(_e),n.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),f=new ki(d.textureWidth,d.textureHeight,{format:Zt,type:Ei,depthTexture:new Yc(d.textureWidth,d.textureHeight,ue,void 0,void 0,void 0,void 0,void 0,void 0,X),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Ie=e.properties.get(f);Ie.__ignoreDepthValues=d.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await n.requestReferenceSpace(a),oe.setContext(n),oe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode};function I(W){for(let X=0;X<W.removed.length;X++){const ue=W.removed[X],ye=v.indexOf(ue);ye>=0&&(v[ye]=null,b[ye].disconnect(ue))}for(let X=0;X<W.added.length;X++){const ue=W.added[X];let ye=v.indexOf(ue);if(ye===-1){for(let Ie=0;Ie<b.length;Ie++)if(Ie>=v.length){v.push(ue),ye=Ie;break}else if(v[Ie]===null){v[Ie]=ue,ye=Ie;break}if(ye===-1)break}const _e=b[ye];_e&&_e.connect(ue)}}const k=new w,V=new w;function Y(W,X,ue){k.setFromMatrixPosition(X.matrixWorld),V.setFromMatrixPosition(ue.matrixWorld);const ye=k.distanceTo(V),_e=X.projectionMatrix.elements,Ie=ue.projectionMatrix.elements,Oe=_e[14]/(_e[10]-1),be=_e[14]/(_e[10]+1),Ne=(_e[9]+1)/_e[5],L=(_e[9]-1)/_e[5],ce=(_e[8]-1)/_e[0],j=(Ie[8]+1)/Ie[0],ae=Oe*ce,q=Oe*j,Te=ye/(-ce+j),me=Te*-ce;X.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(me),W.translateZ(Te),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert();const T=Oe+Te,x=be+Te,O=ae-me,ne=q+(ye-me),te=Ne*be/x*T,ee=L*be/x*T;W.projectionMatrix.makePerspective(O,ne,te,ee,T,x),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}function J(W,X){X===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(X.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(n===null)return;S.near=C.near=P.near=W.near,S.far=C.far=P.far=W.far,(E!==S.near||U!==S.far)&&(n.updateRenderState({depthNear:S.near,depthFar:S.far}),E=S.near,U=S.far);const X=W.parent,ue=S.cameras;J(S,X);for(let ye=0;ye<ue.length;ye++)J(ue[ye],X);ue.length===2?Y(S,P,C):S.projectionMatrix.copy(P.projectionMatrix),Z(W,S,X)};function Z(W,X,ue){ue===null?W.matrix.copy(X.matrixWorld):(W.matrix.copy(ue.matrixWorld),W.matrix.invert(),W.matrix.multiply(X.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(X.projectionMatrix),W.projectionMatrixInverse.copy(X.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=On*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(W){c=W,d!==null&&(d.fixedFoveation=W),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=W)};let K=null;function re(W,X){if(h=X.getViewerPose(l||o),g=X,h!==null){const ue=h.views;p!==null&&(e.setRenderTargetFramebuffer(f,p.framebuffer),e.setRenderTarget(f));let ye=!1;ue.length!==S.cameras.length&&(S.cameras.length=0,ye=!0);for(let _e=0;_e<ue.length;_e++){const Ie=ue[_e];let Oe=null;if(p!==null)Oe=p.getViewport(Ie);else{const Ne=u.getViewSubImage(d,Ie);Oe=Ne.viewport,_e===0&&(e.setRenderTargetTextures(f,Ne.colorTexture,d.ignoreDepthValues?void 0:Ne.depthStencilTexture),e.setRenderTarget(f))}let be=N[_e];be===void 0&&(be=new Ot,be.layers.enable(_e),be.viewport=new st,N[_e]=be),be.matrix.fromArray(Ie.transform.matrix),be.matrix.decompose(be.position,be.quaternion,be.scale),be.projectionMatrix.fromArray(Ie.projectionMatrix),be.projectionMatrixInverse.copy(be.projectionMatrix).invert(),be.viewport.set(Oe.x,Oe.y,Oe.width,Oe.height),_e===0&&(S.matrix.copy(be.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),ye===!0&&S.cameras.push(be)}}for(let ue=0;ue<b.length;ue++){const ye=v[ue],_e=b[ue];ye!==null&&_e!==void 0&&_e.update(ye,X,l||o)}K&&K(W,X),X.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:X}),g=null}const oe=new qc;oe.setAnimationLoop(re),this.setAnimationLoop=function(W){K=W},this.dispose=function(){}}}function zm(s,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,Hc(s)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function n(m,f,b,v,y){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),_(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,b,v):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Lt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Lt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const b=e.get(f).envMap;if(b&&(m.envMap.value=b,m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap){m.lightMap.value=f.lightMap;const v=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=f.lightMapIntensity*v,t(f.lightMap,m.lightMapTransform)}f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,b,v){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*b,m.scale.value=v*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),e.get(f).envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,b){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Lt&&m.clearcoatNormalScale.value.negate())),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const b=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function Gm(s,e,t,i){let n={},r={},o=[];const a=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(b,v){const y=v.program;i.uniformBlockBinding(b,y)}function l(b,v){let y=n[b.id];y===void 0&&(g(b),y=h(b),n[b.id]=y,b.addEventListener("dispose",m));const R=v.program;i.updateUBOMapping(b,R);const P=e.render.frame;r[b.id]!==P&&(d(b),r[b.id]=P)}function h(b){const v=u();b.__bindingPointIndex=v;const y=s.createBuffer(),R=b.__size,P=b.usage;return s.bindBuffer(s.UNIFORM_BUFFER,y),s.bufferData(s.UNIFORM_BUFFER,R,P),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,v,y),y}function u(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const v=n[b.id],y=b.uniforms,R=b.__cache;s.bindBuffer(s.UNIFORM_BUFFER,v);for(let P=0,C=y.length;P<C;P++){const N=Array.isArray(y[P])?y[P]:[y[P]];for(let S=0,E=N.length;S<E;S++){const U=N[S];if(p(U,P,S,R)===!0){const B=U.__offset,Q=Array.isArray(U.value)?U.value:[U.value];let I=0;for(let k=0;k<Q.length;k++){const V=Q[k],Y=_(V);typeof V=="number"||typeof V=="boolean"?(U.__data[0]=V,s.bufferSubData(s.UNIFORM_BUFFER,B+I,U.__data)):V.isMatrix3?(U.__data[0]=V.elements[0],U.__data[1]=V.elements[1],U.__data[2]=V.elements[2],U.__data[3]=0,U.__data[4]=V.elements[3],U.__data[5]=V.elements[4],U.__data[6]=V.elements[5],U.__data[7]=0,U.__data[8]=V.elements[6],U.__data[9]=V.elements[7],U.__data[10]=V.elements[8],U.__data[11]=0):(V.toArray(U.__data,I),I+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,B,U.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(b,v,y,R){const P=b.value,C=v+"_"+y;if(R[C]===void 0)return typeof P=="number"||typeof P=="boolean"?R[C]=P:R[C]=P.clone(),!0;{const N=R[C];if(typeof P=="number"||typeof P=="boolean"){if(N!==P)return R[C]=P,!0}else if(N.equals(P)===!1)return N.copy(P),!0}return!1}function g(b){const v=b.uniforms;let y=0;const R=16;for(let C=0,N=v.length;C<N;C++){const S=Array.isArray(v[C])?v[C]:[v[C]];for(let E=0,U=S.length;E<U;E++){const B=S[E],Q=Array.isArray(B.value)?B.value:[B.value];for(let I=0,k=Q.length;I<k;I++){const V=Q[I],Y=_(V),J=y%R;J!==0&&R-J<Y.boundary&&(y+=R-J),B.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=y,y+=Y.storage}}}const P=y%R;return P>0&&(y+=R-P),b.__size=y,b.__cache={},this}function _(b){const v={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(v.boundary=4,v.storage=4):b.isVector2?(v.boundary=8,v.storage=8):b.isVector3||b.isColor?(v.boundary=16,v.storage=12):b.isVector4?(v.boundary=16,v.storage=16):b.isMatrix3?(v.boundary=48,v.storage=48):b.isMatrix4?(v.boundary=64,v.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),v}function m(b){const v=b.target;v.removeEventListener("dispose",m);const y=o.indexOf(v.__bindingPointIndex);o.splice(y,1),s.deleteBuffer(n[v.id]),delete n[v.id],delete r[v.id]}function f(){for(const b in n)s.deleteBuffer(n[b]);o=[],n={},r={}}return{bind:c,update:l,dispose:f}}class el{constructor(e={}){const{canvas:t=Fh(),context:i=null,depth:n=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=o;const p=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const f=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=dt,this._useLegacyLights=!1,this.toneMapping=bi,this.toneMappingExposure=1;const v=this;let y=!1,R=0,P=0,C=null,N=-1,S=null;const E=new st,U=new st;let B=null;const Q=new Pe(0);let I=0,k=t.width,V=t.height,Y=1,J=null,Z=null;const K=new st(0,0,k,V),re=new st(0,0,k,V);let oe=!1;const W=new io;let X=!1,ue=!1,ye=null;const _e=new at,Ie=new se,Oe=new w,be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ne(){return C===null?Y:1}let L=i;function ce(A,F){for(let G=0;G<A.length;G++){const H=A[G],z=t.getContext(H,F);if(z!==null)return z}return null}try{const A={alpha:!0,depth:n,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Kr}`),t.addEventListener("webglcontextlost",le,!1),t.addEventListener("webglcontextrestored",D,!1),t.addEventListener("webglcontextcreationerror",fe,!1),L===null){const F=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&F.shift(),L=ce(F,A),L===null)throw ce(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&L instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),L.getShaderPrecisionFormat===void 0&&(L.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let j,ae,q,Te,me,T,x,O,ne,te,ee,Se,de,ve,Ce,Be,ie,Je,je,Fe,Ae,xe,Ge,Ke;function ct(){j=new Kf(L),ae=new Xf(L,j,e),j.init(ae),xe=new Fm(L,j,ae),q=new Um(L,j,ae),Te=new ep(L),me=new ym,T=new Nm(L,j,q,me,ae,xe,Te),x=new jf(v),O=new Zf(v),ne=new au(L,ae),Ge=new Hf(L,j,ne,ae),te=new $f(L,ne,Te,Ge),ee=new sp(L,te,ne,Te),je=new np(L,ae,T),Be=new qf(me),Se=new xm(v,x,O,j,ae,Ge,Be),de=new zm(v,me),ve=new Mm,Ce=new Pm(j,ae),Je=new Vf(v,x,O,q,ee,d,c),ie=new Dm(v,ee,ae),Ke=new Gm(L,Te,ae,q),Fe=new Wf(L,j,Te,ae),Ae=new Qf(L,j,Te,ae),Te.programs=Se.programs,v.capabilities=ae,v.extensions=j,v.properties=me,v.renderLists=ve,v.shadowMap=ie,v.state=q,v.info=Te}ct();const We=new Bm(v,L);this.xr=We,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const A=j.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=j.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(A){A!==void 0&&(Y=A,this.setSize(k,V,!1))},this.getSize=function(A){return A.set(k,V)},this.setSize=function(A,F,G=!0){if(We.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=A,V=F,t.width=Math.floor(A*Y),t.height=Math.floor(F*Y),G===!0&&(t.style.width=A+"px",t.style.height=F+"px"),this.setViewport(0,0,A,F)},this.getDrawingBufferSize=function(A){return A.set(k*Y,V*Y).floor()},this.setDrawingBufferSize=function(A,F,G){k=A,V=F,Y=G,t.width=Math.floor(A*G),t.height=Math.floor(F*G),this.setViewport(0,0,A,F)},this.getCurrentViewport=function(A){return A.copy(E)},this.getViewport=function(A){return A.copy(K)},this.setViewport=function(A,F,G,H){A.isVector4?K.set(A.x,A.y,A.z,A.w):K.set(A,F,G,H),q.viewport(E.copy(K).multiplyScalar(Y).floor())},this.getScissor=function(A){return A.copy(re)},this.setScissor=function(A,F,G,H){A.isVector4?re.set(A.x,A.y,A.z,A.w):re.set(A,F,G,H),q.scissor(U.copy(re).multiplyScalar(Y).floor())},this.getScissorTest=function(){return oe},this.setScissorTest=function(A){q.setScissorTest(oe=A)},this.setOpaqueSort=function(A){J=A},this.setTransparentSort=function(A){Z=A},this.getClearColor=function(A){return A.copy(Je.getClearColor())},this.setClearColor=function(){Je.setClearColor.apply(Je,arguments)},this.getClearAlpha=function(){return Je.getClearAlpha()},this.setClearAlpha=function(){Je.setClearAlpha.apply(Je,arguments)},this.clear=function(A=!0,F=!0,G=!0){let H=0;if(A){let z=!1;if(C!==null){const ge=C.texture.format;z=ge===Lc||ge===Rc||ge===Cc}if(z){const ge=C.texture.type,Ee=ge===Ei||ge===yi||ge===$r||ge===Ni||ge===wc||ge===Pc,Le=Je.getClearColor(),Ue=Je.getClearAlpha(),He=Le.r,ke=Le.g,ze=Le.b;Ee?(p[0]=He,p[1]=ke,p[2]=ze,p[3]=Ue,L.clearBufferuiv(L.COLOR,0,p)):(g[0]=He,g[1]=ke,g[2]=ze,g[3]=Ue,L.clearBufferiv(L.COLOR,0,g))}else H|=L.COLOR_BUFFER_BIT}F&&(H|=L.DEPTH_BUFFER_BIT),G&&(H|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",le,!1),t.removeEventListener("webglcontextrestored",D,!1),t.removeEventListener("webglcontextcreationerror",fe,!1),ve.dispose(),Ce.dispose(),me.dispose(),x.dispose(),O.dispose(),ee.dispose(),Ge.dispose(),Ke.dispose(),Se.dispose(),We.dispose(),We.removeEventListener("sessionstart",Tt),We.removeEventListener("sessionend",it),ye&&(ye.dispose(),ye=null),At.stop()};function le(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function D(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const A=Te.autoReset,F=ie.enabled,G=ie.autoUpdate,H=ie.needsUpdate,z=ie.type;ct(),Te.autoReset=A,ie.enabled=F,ie.autoUpdate=G,ie.needsUpdate=H,ie.type=z}function fe(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function pe(A){const F=A.target;F.removeEventListener("dispose",pe),De(F)}function De(A){Re(A),me.remove(A)}function Re(A){const F=me.get(A).programs;F!==void 0&&(F.forEach(function(G){Se.releaseProgram(G)}),A.isShaderMaterial&&Se.releaseShaderCache(A))}this.renderBufferDirect=function(A,F,G,H,z,ge){F===null&&(F=be);const Ee=z.isMesh&&z.matrixWorld.determinant()<0,Le=_l(A,F,G,H,z);q.setMaterial(H,Ee);let Ue=G.index,He=1;if(H.wireframe===!0){if(Ue=te.getWireframeAttribute(G),Ue===void 0)return;He=2}const ke=G.drawRange,ze=G.attributes.position;let ht=ke.start*He,Dt=(ke.start+ke.count)*He;ge!==null&&(ht=Math.max(ht,ge.start*He),Dt=Math.min(Dt,(ge.start+ge.count)*He)),Ue!==null?(ht=Math.max(ht,0),Dt=Math.min(Dt,Ue.count)):ze!=null&&(ht=Math.max(ht,0),Dt=Math.min(Dt,ze.count));const gt=Dt-ht;if(gt<0||gt===1/0)return;Ge.setup(z,H,Le,G,Ue);let si,rt=Fe;if(Ue!==null&&(si=ne.get(Ue),rt=Ae,rt.setIndex(si)),z.isMesh)H.wireframe===!0?(q.setLineWidth(H.wireframeLinewidth*Ne()),rt.setMode(L.LINES)):rt.setMode(L.TRIANGLES);else if(z.isLine){let Xe=H.linewidth;Xe===void 0&&(Xe=1),q.setLineWidth(Xe*Ne()),z.isLineSegments?rt.setMode(L.LINES):z.isLineLoop?rt.setMode(L.LINE_LOOP):rt.setMode(L.LINE_STRIP)}else z.isPoints?rt.setMode(L.POINTS):z.isSprite&&rt.setMode(L.TRIANGLES);if(z.isBatchedMesh)rt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else if(z.isInstancedMesh)rt.renderInstances(ht,gt,z.count);else if(G.isInstancedBufferGeometry){const Xe=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,js=Math.min(G.instanceCount,Xe);rt.renderInstances(ht,gt,js)}else rt.render(ht,gt)};function et(A,F,G){A.transparent===!0&&A.side===Yt&&A.forceSinglePass===!1?(A.side=Lt,A.needsUpdate=!0,Yn(A,F,G),A.side=Ti,A.needsUpdate=!0,Yn(A,F,G),A.side=Yt):Yn(A,F,G)}this.compile=function(A,F,G=null){G===null&&(G=A),m=Ce.get(G),m.init(),b.push(m),G.traverseVisible(function(z){z.isLight&&z.layers.test(F.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),A!==G&&A.traverseVisible(function(z){z.isLight&&z.layers.test(F.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),m.setupLights(v._useLegacyLights);const H=new Set;return A.traverse(function(z){const ge=z.material;if(ge)if(Array.isArray(ge))for(let Ee=0;Ee<ge.length;Ee++){const Le=ge[Ee];et(Le,G,z),H.add(Le)}else et(ge,G,z),H.add(ge)}),b.pop(),m=null,H},this.compileAsync=function(A,F,G=null){const H=this.compile(A,F,G);return new Promise(z=>{function ge(){if(H.forEach(function(Ee){me.get(Ee).currentProgram.isReady()&&H.delete(Ee)}),H.size===0){z(A);return}setTimeout(ge,10)}j.get("KHR_parallel_shader_compile")!==null?ge():setTimeout(ge,10)})};let tt=null;function mt(A){tt&&tt(A)}function Tt(){At.stop()}function it(){At.start()}const At=new qc;At.setAnimationLoop(mt),typeof self<"u"&&At.setContext(self),this.setAnimationLoop=function(A){tt=A,We.setAnimationLoop(A),A===null?At.stop():At.start()},We.addEventListener("sessionstart",Tt),We.addEventListener("sessionend",it),this.render=function(A,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),We.enabled===!0&&We.isPresenting===!0&&(We.cameraAutoUpdate===!0&&We.updateCamera(F),F=We.getCamera()),A.isScene===!0&&A.onBeforeRender(v,A,F,C),m=Ce.get(A,b.length),m.init(),b.push(m),_e.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),W.setFromProjectionMatrix(_e),ue=this.localClippingEnabled,X=Be.init(this.clippingPlanes,ue),_=ve.get(A,f.length),_.init(),f.push(_),Kt(A,F,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(J,Z),this.info.render.frame++,X===!0&&Be.beginShadows();const G=m.state.shadowsArray;if(ie.render(G,A,F),X===!0&&Be.endShadows(),this.info.autoReset===!0&&this.info.reset(),Je.render(_,A),m.setupLights(v._useLegacyLights),F.isArrayCamera){const H=F.cameras;for(let z=0,ge=H.length;z<ge;z++){const Ee=H[z];vo(_,A,Ee,Ee.viewport)}}else vo(_,A,F);C!==null&&(T.updateMultisampleRenderTarget(C),T.updateRenderTargetMipmap(C)),A.isScene===!0&&A.onAfterRender(v,A,F),Ge.resetDefaultState(),N=-1,S=null,b.pop(),b.length>0?m=b[b.length-1]:m=null,f.pop(),f.length>0?_=f[f.length-1]:_=null};function Kt(A,F,G,H){if(A.visible===!1)return;if(A.layers.test(F.layers)){if(A.isGroup)G=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(F);else if(A.isLight)m.pushLight(A),A.castShadow&&m.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||W.intersectsSprite(A)){H&&Oe.setFromMatrixPosition(A.matrixWorld).applyMatrix4(_e);const Ee=ee.update(A),Le=A.material;Le.visible&&_.push(A,Ee,Le,G,Oe.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||W.intersectsObject(A))){const Ee=ee.update(A),Le=A.material;if(H&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Oe.copy(A.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),Oe.copy(Ee.boundingSphere.center)),Oe.applyMatrix4(A.matrixWorld).applyMatrix4(_e)),Array.isArray(Le)){const Ue=Ee.groups;for(let He=0,ke=Ue.length;He<ke;He++){const ze=Ue[He],ht=Le[ze.materialIndex];ht&&ht.visible&&_.push(A,Ee,ht,G,Oe.z,ze)}}else Le.visible&&_.push(A,Ee,Le,G,Oe.z,null)}}const ge=A.children;for(let Ee=0,Le=ge.length;Ee<Le;Ee++)Kt(ge[Ee],F,G,H)}function vo(A,F,G,H){const z=A.opaque,ge=A.transmissive,Ee=A.transparent;m.setupLightsView(G),X===!0&&Be.setGlobalState(v.clippingPlanes,G),ge.length>0&&gl(z,ge,F,G),H&&q.viewport(E.copy(H)),z.length>0&&jn(z,F,G),ge.length>0&&jn(ge,F,G),Ee.length>0&&jn(Ee,F,G),q.buffers.depth.setTest(!0),q.buffers.depth.setMask(!0),q.buffers.color.setMask(!0),q.setPolygonOffset(!1)}function gl(A,F,G,H){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;const ge=ae.isWebGL2;ye===null&&(ye=new ki(1,1,{generateMipmaps:!0,type:j.has("EXT_color_buffer_half_float")?Fn:Ei,minFilter:Nn,samples:ge?4:0})),v.getDrawingBufferSize(Ie),ge?ye.setSize(Ie.x,Ie.y):ye.setSize(Ns(Ie.x),Ns(Ie.y));const Ee=v.getRenderTarget();v.setRenderTarget(ye),v.getClearColor(Q),I=v.getClearAlpha(),I<1&&v.setClearColor(16777215,.5),v.clear();const Le=v.toneMapping;v.toneMapping=bi,jn(A,G,H),T.updateMultisampleRenderTarget(ye),T.updateRenderTargetMipmap(ye);let Ue=!1;for(let He=0,ke=F.length;He<ke;He++){const ze=F[He],ht=ze.object,Dt=ze.geometry,gt=ze.material,si=ze.group;if(gt.side===Yt&&ht.layers.test(H.layers)){const rt=gt.side;gt.side=Lt,gt.needsUpdate=!0,xo(ht,G,H,Dt,gt,si),gt.side=rt,gt.needsUpdate=!0,Ue=!0}}Ue===!0&&(T.updateMultisampleRenderTarget(ye),T.updateRenderTargetMipmap(ye)),v.setRenderTarget(Ee),v.setClearColor(Q,I),v.toneMapping=Le}function jn(A,F,G){const H=F.isScene===!0?F.overrideMaterial:null;for(let z=0,ge=A.length;z<ge;z++){const Ee=A[z],Le=Ee.object,Ue=Ee.geometry,He=H===null?Ee.material:H,ke=Ee.group;Le.layers.test(G.layers)&&xo(Le,F,G,Ue,He,ke)}}function xo(A,F,G,H,z,ge){A.onBeforeRender(v,F,G,H,z,ge),A.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),z.onBeforeRender(v,F,G,H,A,ge),z.transparent===!0&&z.side===Yt&&z.forceSinglePass===!1?(z.side=Lt,z.needsUpdate=!0,v.renderBufferDirect(G,F,H,z,A,ge),z.side=Ti,z.needsUpdate=!0,v.renderBufferDirect(G,F,H,z,A,ge),z.side=Yt):v.renderBufferDirect(G,F,H,z,A,ge),A.onAfterRender(v,F,G,H,z,ge)}function Yn(A,F,G){F.isScene!==!0&&(F=be);const H=me.get(A),z=m.state.lights,ge=m.state.shadowsArray,Ee=z.state.version,Le=Se.getParameters(A,z.state,ge,F,G),Ue=Se.getProgramCacheKey(Le);let He=H.programs;H.environment=A.isMeshStandardMaterial?F.environment:null,H.fog=F.fog,H.envMap=(A.isMeshStandardMaterial?O:x).get(A.envMap||H.environment),He===void 0&&(A.addEventListener("dispose",pe),He=new Map,H.programs=He);let ke=He.get(Ue);if(ke!==void 0){if(H.currentProgram===ke&&H.lightsStateVersion===Ee)return So(A,Le),ke}else Le.uniforms=Se.getUniforms(A),A.onBuild(G,Le,v),A.onBeforeCompile(Le,v),ke=Se.acquireProgram(Le,Ue),He.set(Ue,ke),H.uniforms=Le.uniforms;const ze=H.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(ze.clippingPlanes=Be.uniform),So(A,Le),H.needsLights=xl(A),H.lightsStateVersion=Ee,H.needsLights&&(ze.ambientLightColor.value=z.state.ambient,ze.lightProbe.value=z.state.probe,ze.directionalLights.value=z.state.directional,ze.directionalLightShadows.value=z.state.directionalShadow,ze.spotLights.value=z.state.spot,ze.spotLightShadows.value=z.state.spotShadow,ze.rectAreaLights.value=z.state.rectArea,ze.ltc_1.value=z.state.rectAreaLTC1,ze.ltc_2.value=z.state.rectAreaLTC2,ze.pointLights.value=z.state.point,ze.pointLightShadows.value=z.state.pointShadow,ze.hemisphereLights.value=z.state.hemi,ze.directionalShadowMap.value=z.state.directionalShadowMap,ze.directionalShadowMatrix.value=z.state.directionalShadowMatrix,ze.spotShadowMap.value=z.state.spotShadowMap,ze.spotLightMatrix.value=z.state.spotLightMatrix,ze.spotLightMap.value=z.state.spotLightMap,ze.pointShadowMap.value=z.state.pointShadowMap,ze.pointShadowMatrix.value=z.state.pointShadowMatrix),H.currentProgram=ke,H.uniformsList=null,ke}function yo(A){if(A.uniformsList===null){const F=A.currentProgram.getUniforms();A.uniformsList=Ps.seqWithValue(F.seq,A.uniforms)}return A.uniformsList}function So(A,F){const G=me.get(A);G.outputColorSpace=F.outputColorSpace,G.batching=F.batching,G.instancing=F.instancing,G.instancingColor=F.instancingColor,G.skinning=F.skinning,G.morphTargets=F.morphTargets,G.morphNormals=F.morphNormals,G.morphColors=F.morphColors,G.morphTargetsCount=F.morphTargetsCount,G.numClippingPlanes=F.numClippingPlanes,G.numIntersection=F.numClipIntersection,G.vertexAlphas=F.vertexAlphas,G.vertexTangents=F.vertexTangents,G.toneMapping=F.toneMapping}function _l(A,F,G,H,z){F.isScene!==!0&&(F=be),T.resetTextureUnits();const ge=F.fog,Ee=H.isMeshStandardMaterial?F.environment:null,Le=C===null?v.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:fi,Ue=(H.isMeshStandardMaterial?O:x).get(H.envMap||Ee),He=H.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,ke=!!G.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),ze=!!G.morphAttributes.position,ht=!!G.morphAttributes.normal,Dt=!!G.morphAttributes.color;let gt=bi;H.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(gt=v.toneMapping);const si=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,rt=si!==void 0?si.length:0,Xe=me.get(H),js=m.state.lights;if(X===!0&&(ue===!0||A!==S)){const Bt=A===S&&H.id===N;Be.setState(H,A,Bt)}let lt=!1;H.version===Xe.__version?(Xe.needsLights&&Xe.lightsStateVersion!==js.state.version||Xe.outputColorSpace!==Le||z.isBatchedMesh&&Xe.batching===!1||!z.isBatchedMesh&&Xe.batching===!0||z.isInstancedMesh&&Xe.instancing===!1||!z.isInstancedMesh&&Xe.instancing===!0||z.isSkinnedMesh&&Xe.skinning===!1||!z.isSkinnedMesh&&Xe.skinning===!0||z.isInstancedMesh&&Xe.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Xe.instancingColor===!1&&z.instanceColor!==null||Xe.envMap!==Ue||H.fog===!0&&Xe.fog!==ge||Xe.numClippingPlanes!==void 0&&(Xe.numClippingPlanes!==Be.numPlanes||Xe.numIntersection!==Be.numIntersection)||Xe.vertexAlphas!==He||Xe.vertexTangents!==ke||Xe.morphTargets!==ze||Xe.morphNormals!==ht||Xe.morphColors!==Dt||Xe.toneMapping!==gt||ae.isWebGL2===!0&&Xe.morphTargetsCount!==rt)&&(lt=!0):(lt=!0,Xe.__version=H.version);let Ai=Xe.currentProgram;lt===!0&&(Ai=Yn(H,F,z));let Mo=!1,yn=!1,Ys=!1;const Mt=Ai.getUniforms(),wi=Xe.uniforms;if(q.useProgram(Ai.program)&&(Mo=!0,yn=!0,Ys=!0),H.id!==N&&(N=H.id,yn=!0),Mo||S!==A){Mt.setValue(L,"projectionMatrix",A.projectionMatrix),Mt.setValue(L,"viewMatrix",A.matrixWorldInverse);const Bt=Mt.map.cameraPosition;Bt!==void 0&&Bt.setValue(L,Oe.setFromMatrixPosition(A.matrixWorld)),ae.logarithmicDepthBuffer&&Mt.setValue(L,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&Mt.setValue(L,"isOrthographic",A.isOrthographicCamera===!0),S!==A&&(S=A,yn=!0,Ys=!0)}if(z.isSkinnedMesh){Mt.setOptional(L,z,"bindMatrix"),Mt.setOptional(L,z,"bindMatrixInverse");const Bt=z.skeleton;Bt&&(ae.floatVertexTextures?(Bt.boneTexture===null&&Bt.computeBoneTexture(),Mt.setValue(L,"boneTexture",Bt.boneTexture,T)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}z.isBatchedMesh&&(Mt.setOptional(L,z,"batchingTexture"),Mt.setValue(L,"batchingTexture",z._matricesTexture,T));const Js=G.morphAttributes;if((Js.position!==void 0||Js.normal!==void 0||Js.color!==void 0&&ae.isWebGL2===!0)&&je.update(z,G,Ai),(yn||Xe.receiveShadow!==z.receiveShadow)&&(Xe.receiveShadow=z.receiveShadow,Mt.setValue(L,"receiveShadow",z.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(wi.envMap.value=Ue,wi.flipEnvMap.value=Ue.isCubeTexture&&Ue.isRenderTargetTexture===!1?-1:1),yn&&(Mt.setValue(L,"toneMappingExposure",v.toneMappingExposure),Xe.needsLights&&vl(wi,Ys),ge&&H.fog===!0&&de.refreshFogUniforms(wi,ge),de.refreshMaterialUniforms(wi,H,Y,V,ye),Ps.upload(L,yo(Xe),wi,T)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Ps.upload(L,yo(Xe),wi,T),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&Mt.setValue(L,"center",z.center),Mt.setValue(L,"modelViewMatrix",z.modelViewMatrix),Mt.setValue(L,"normalMatrix",z.normalMatrix),Mt.setValue(L,"modelMatrix",z.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Bt=H.uniformsGroups;for(let Zs=0,yl=Bt.length;Zs<yl;Zs++)if(ae.isWebGL2){const bo=Bt[Zs];Ke.update(bo,Ai),Ke.bind(bo,Ai)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Ai}function vl(A,F){A.ambientLightColor.needsUpdate=F,A.lightProbe.needsUpdate=F,A.directionalLights.needsUpdate=F,A.directionalLightShadows.needsUpdate=F,A.pointLights.needsUpdate=F,A.pointLightShadows.needsUpdate=F,A.spotLights.needsUpdate=F,A.spotLightShadows.needsUpdate=F,A.rectAreaLights.needsUpdate=F,A.hemisphereLights.needsUpdate=F}function xl(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(A,F,G){me.get(A.texture).__webglTexture=F,me.get(A.depthTexture).__webglTexture=G;const H=me.get(A);H.__hasExternalTextures=!0,H.__hasExternalTextures&&(H.__autoAllocateDepthBuffer=G===void 0,H.__autoAllocateDepthBuffer||j.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(A,F){const G=me.get(A);G.__webglFramebuffer=F,G.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(A,F=0,G=0){C=A,R=F,P=G;let H=!0,z=null,ge=!1,Ee=!1;if(A){const Ue=me.get(A);Ue.__useDefaultFramebuffer!==void 0?(q.bindFramebuffer(L.FRAMEBUFFER,null),H=!1):Ue.__webglFramebuffer===void 0?T.setupRenderTarget(A):Ue.__hasExternalTextures&&T.rebindTextures(A,me.get(A.texture).__webglTexture,me.get(A.depthTexture).__webglTexture);const He=A.texture;(He.isData3DTexture||He.isDataArrayTexture||He.isCompressedArrayTexture)&&(Ee=!0);const ke=me.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(ke[F])?z=ke[F][G]:z=ke[F],ge=!0):ae.isWebGL2&&A.samples>0&&T.useMultisampledRTT(A)===!1?z=me.get(A).__webglMultisampledFramebuffer:Array.isArray(ke)?z=ke[G]:z=ke,E.copy(A.viewport),U.copy(A.scissor),B=A.scissorTest}else E.copy(K).multiplyScalar(Y).floor(),U.copy(re).multiplyScalar(Y).floor(),B=oe;if(q.bindFramebuffer(L.FRAMEBUFFER,z)&&ae.drawBuffers&&H&&q.drawBuffers(A,z),q.viewport(E),q.scissor(U),q.setScissorTest(B),ge){const Ue=me.get(A.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+F,Ue.__webglTexture,G)}else if(Ee){const Ue=me.get(A.texture),He=F||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ue.__webglTexture,G||0,He)}N=-1},this.readRenderTargetPixels=function(A,F,G,H,z,ge,Ee){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=me.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ee!==void 0&&(Le=Le[Ee]),Le){q.bindFramebuffer(L.FRAMEBUFFER,Le);try{const Ue=A.texture,He=Ue.format,ke=Ue.type;if(He!==Zt&&xe.convert(He)!==L.getParameter(L.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const ze=ke===Fn&&(j.has("EXT_color_buffer_half_float")||ae.isWebGL2&&j.has("EXT_color_buffer_float"));if(ke!==Ei&&xe.convert(ke)!==L.getParameter(L.IMPLEMENTATION_COLOR_READ_TYPE)&&!(ke===Si&&(ae.isWebGL2||j.has("OES_texture_float")||j.has("WEBGL_color_buffer_float")))&&!ze){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=A.width-H&&G>=0&&G<=A.height-z&&L.readPixels(F,G,H,z,xe.convert(He),xe.convert(ke),ge)}finally{const Ue=C!==null?me.get(C).__webglFramebuffer:null;q.bindFramebuffer(L.FRAMEBUFFER,Ue)}}},this.copyFramebufferToTexture=function(A,F,G=0){const H=Math.pow(2,-G),z=Math.floor(F.image.width*H),ge=Math.floor(F.image.height*H);T.setTexture2D(F,0),L.copyTexSubImage2D(L.TEXTURE_2D,G,0,0,A.x,A.y,z,ge),q.unbindTexture()},this.copyTextureToTexture=function(A,F,G,H=0){const z=F.image.width,ge=F.image.height,Ee=xe.convert(G.format),Le=xe.convert(G.type);T.setTexture2D(G,0),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,G.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,G.unpackAlignment),F.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,H,A.x,A.y,z,ge,Ee,Le,F.image.data):F.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,H,A.x,A.y,F.mipmaps[0].width,F.mipmaps[0].height,Ee,F.mipmaps[0].data):L.texSubImage2D(L.TEXTURE_2D,H,A.x,A.y,Ee,Le,F.image),H===0&&G.generateMipmaps&&L.generateMipmap(L.TEXTURE_2D),q.unbindTexture()},this.copyTextureToTexture3D=function(A,F,G,H,z=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ge=A.max.x-A.min.x+1,Ee=A.max.y-A.min.y+1,Le=A.max.z-A.min.z+1,Ue=xe.convert(H.format),He=xe.convert(H.type);let ke;if(H.isData3DTexture)T.setTexture3D(H,0),ke=L.TEXTURE_3D;else if(H.isDataArrayTexture||H.isCompressedArrayTexture)T.setTexture2DArray(H,0),ke=L.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,H.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,H.unpackAlignment);const ze=L.getParameter(L.UNPACK_ROW_LENGTH),ht=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Dt=L.getParameter(L.UNPACK_SKIP_PIXELS),gt=L.getParameter(L.UNPACK_SKIP_ROWS),si=L.getParameter(L.UNPACK_SKIP_IMAGES),rt=G.isCompressedTexture?G.mipmaps[z]:G.image;L.pixelStorei(L.UNPACK_ROW_LENGTH,rt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,rt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,A.min.x),L.pixelStorei(L.UNPACK_SKIP_ROWS,A.min.y),L.pixelStorei(L.UNPACK_SKIP_IMAGES,A.min.z),G.isDataTexture||G.isData3DTexture?L.texSubImage3D(ke,z,F.x,F.y,F.z,ge,Ee,Le,Ue,He,rt.data):G.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),L.compressedTexSubImage3D(ke,z,F.x,F.y,F.z,ge,Ee,Le,Ue,rt.data)):L.texSubImage3D(ke,z,F.x,F.y,F.z,ge,Ee,Le,Ue,He,rt),L.pixelStorei(L.UNPACK_ROW_LENGTH,ze),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ht),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Dt),L.pixelStorei(L.UNPACK_SKIP_ROWS,gt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,si),z===0&&H.generateMipmaps&&L.generateMipmap(ke),q.unbindTexture()},this.initTexture=function(A){A.isCubeTexture?T.setTextureCube(A,0):A.isData3DTexture?T.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?T.setTexture2DArray(A,0):T.setTexture2D(A,0),q.unbindTexture()},this.resetState=function(){R=0,P=0,C=null,q.reset(),Ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return di}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Qr?"display-p3":"srgb",t.unpackColorSpace=$e.workingColorSpace===Bs?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===dt?Oi:Dc}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Oi?dt:fi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Vm extends el{}Vm.prototype.isWebGL1Renderer=!0;class Hm extends xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class so extends Vi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Pe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Wa=new w,Xa=new w,qa=new at,Ar=new zs,_s=new Wn;class Hr extends xt{constructor(e=new yt,t=new so){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let n=1,r=t.count;n<r;n++)Wa.fromBufferAttribute(t,n-1),Xa.fromBufferAttribute(t,n),i[n]=i[n-1],i[n]+=Wa.distanceTo(Xa);e.setAttribute("lineDistance",new Qe(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,n=this.matrixWorld,r=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),_s.copy(i.boundingSphere),_s.applyMatrix4(n),_s.radius+=r,e.ray.intersectsSphere(_s)===!1)return;qa.copy(n).invert(),Ar.copy(e.ray).applyMatrix4(qa);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=new w,h=new w,u=new w,d=new w,p=this.isLineSegments?2:1,g=i.index,m=i.attributes.position;if(g!==null){const f=Math.max(0,o.start),b=Math.min(g.count,o.start+o.count);for(let v=f,y=b-1;v<y;v+=p){const R=g.getX(v),P=g.getX(v+1);if(l.fromBufferAttribute(m,R),h.fromBufferAttribute(m,P),Ar.distanceSqToSegment(l,h,d,u)>c)continue;d.applyMatrix4(this.matrixWorld);const N=e.ray.origin.distanceTo(d);N<e.near||N>e.far||t.push({distance:N,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const f=Math.max(0,o.start),b=Math.min(m.count,o.start+o.count);for(let v=f,y=b-1;v<y;v+=p){if(l.fromBufferAttribute(m,v),h.fromBufferAttribute(m,v+1),Ar.distanceSqToSegment(l,h,d,u)>c)continue;d.applyMatrix4(this.matrixWorld);const P=e.ray.origin.distanceTo(d);P<e.near||P>e.far||t.push({distance:P,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=n.length;r<o;r++){const a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}class tl extends Vi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Pe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ja=new at,Wr=new zs,vs=new Wn,xs=new w;class Wm extends xt{constructor(e=new yt,t=new tl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,n=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),vs.copy(i.boundingSphere),vs.applyMatrix4(n),vs.radius+=r,e.ray.intersectsSphere(vs)===!1)return;ja.copy(n).invert(),Wr.copy(e.ray).applyMatrix4(ja);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,u=i.attributes.position;if(l!==null){const d=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let g=d,_=p;g<_;g++){const m=l.getX(g);xs.fromBufferAttribute(u,m),Ya(xs,m,c,n,e,t,this)}}else{const d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let g=d,_=p;g<_;g++)xs.fromBufferAttribute(u,g),Ya(xs,g,c,n,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=n.length;r<o;r++){const a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Ya(s,e,t,i,n,r,o){const a=Wr.distanceSqToPoint(s);if(a<t){const c=new w;Wr.closestPointToPoint(s,c),c.applyMatrix4(i);const l=n.ray.origin.distanceTo(c);if(l<n.near||l>n.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,object:o})}}class ni{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,n=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),r+=i.distanceTo(n),t.push(r),n=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const i=this.getLengths();let n=0;const r=i.length;let o;t?o=t:o=e*i[r-1];let a=0,c=r-1,l;for(;a<=c;)if(n=Math.floor(a+(c-a)/2),l=i[n]-o,l<0)a=n+1;else if(l>0)c=n-1;else{c=n;break}if(n=c,i[n]===o)return n/(r-1);const h=i[n],d=i[n+1]-h,p=(o-h)/d;return(n+p)/(r-1)}getTangent(e,t){let n=e-1e-4,r=e+1e-4;n<0&&(n=0),r>1&&(r=1);const o=this.getPoint(n),a=this.getPoint(r),c=t||(o.isVector2?new se:new w);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){const i=new w,n=[],r=[],o=[],a=new w,c=new at;for(let p=0;p<=e;p++){const g=p/e;n[p]=this.getTangentAt(g,new w)}r[0]=new w,o[0]=new w;let l=Number.MAX_VALUE;const h=Math.abs(n[0].x),u=Math.abs(n[0].y),d=Math.abs(n[0].z);h<=l&&(l=h,i.set(1,0,0)),u<=l&&(l=u,i.set(0,1,0)),d<=l&&i.set(0,0,1),a.crossVectors(n[0],i).normalize(),r[0].crossVectors(n[0],a),o[0].crossVectors(n[0],r[0]);for(let p=1;p<=e;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(n[p-1],n[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(St(n[p-1].dot(n[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(a,g))}o[p].crossVectors(n[p],r[p])}if(t===!0){let p=Math.acos(St(r[0].dot(r[e]),-1,1));p/=e,n[0].dot(a.crossVectors(r[0],r[e]))>0&&(p=-p);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(n[g],p*g)),o[g].crossVectors(n[g],r[g])}return{tangents:n,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class ro extends ni{constructor(e=0,t=0,i=1,n=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=n,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t){const i=t||new se,n=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=n;for(;r>n;)r-=n;r<Number.EPSILON&&(o?r=0:r=n),this.aClockwise===!0&&!o&&(r===n?r=-n:r=r-n);const a=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,p=l-this.aY;c=d*h-p*u+this.aX,l=d*u+p*h+this.aY}return i.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Xm extends ro{constructor(e,t,i,n,r,o){super(e,t,i,i,n,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function oo(){let s=0,e=0,t=0,i=0;function n(r,o,a,c){s=r,e=a,t=-3*r+3*o-2*a-c,i=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){n(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,p=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,p*=h,n(o,a,d,p)},calc:function(r){const o=r*r,a=o*r;return s+e*r+t*o+i*a}}}const ys=new w,wr=new oo,Pr=new oo,Cr=new oo;class qm extends ni{constructor(e=[],t=!1,i="centripetal",n=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=n}getPoint(e,t=new w){const i=t,n=this.points,r=n.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=n[(a-1)%r]:(ys.subVectors(n[0],n[1]).add(n[0]),l=ys);const u=n[a%r],d=n[(a+1)%r];if(this.closed||a+2<r?h=n[(a+2)%r]:(ys.subVectors(n[r-1],n[r-2]).add(n[r-1]),h=ys),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),p),_=Math.pow(u.distanceToSquared(d),p),m=Math.pow(d.distanceToSquared(h),p);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),wr.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,_,m),Pr.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,_,m),Cr.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(wr.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),Pr.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),Cr.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return i.set(wr.calc(c),Pr.calc(c),Cr.calc(c)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const n=e.points[t];this.points.push(new w().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Ja(s,e,t,i,n){const r=(i-e)*.5,o=(n-t)*.5,a=s*s,c=s*a;return(2*t-2*i+r+o)*c+(-3*t+3*i-2*r-o)*a+r*s+t}function jm(s,e){const t=1-s;return t*t*e}function Ym(s,e){return 2*(1-s)*s*e}function Jm(s,e){return s*s*e}function Ln(s,e,t,i){return jm(s,e)+Ym(s,t)+Jm(s,i)}function Zm(s,e){const t=1-s;return t*t*t*e}function Km(s,e){const t=1-s;return 3*t*t*s*e}function $m(s,e){return 3*(1-s)*s*s*e}function Qm(s,e){return s*s*s*e}function In(s,e,t,i,n){return Zm(s,e)+Km(s,t)+$m(s,i)+Qm(s,n)}class il extends ni{constructor(e=new se,t=new se,i=new se,n=new se){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=n}getPoint(e,t=new se){const i=t,n=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(In(e,n.x,r.x,o.x,a.x),In(e,n.y,r.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class eg extends ni{constructor(e=new w,t=new w,i=new w,n=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=n}getPoint(e,t=new w){const i=t,n=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(In(e,n.x,r.x,o.x,a.x),In(e,n.y,r.y,o.y,a.y),In(e,n.z,r.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class nl extends ni{constructor(e=new se,t=new se){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new se){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new se){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class tg extends ni{constructor(e=new w,t=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class sl extends ni{constructor(e=new se,t=new se,i=new se){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new se){const i=t,n=this.v0,r=this.v1,o=this.v2;return i.set(Ln(e,n.x,r.x,o.x),Ln(e,n.y,r.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ig extends ni{constructor(e=new w,t=new w,i=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new w){const i=t,n=this.v0,r=this.v1,o=this.v2;return i.set(Ln(e,n.x,r.x,o.x),Ln(e,n.y,r.y,o.y),Ln(e,n.z,r.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class rl extends ni{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new se){const i=t,n=this.points,r=(n.length-1)*e,o=Math.floor(r),a=r-o,c=n[o===0?o:o-1],l=n[o],h=n[o>n.length-2?n.length-1:o+1],u=n[o>n.length-3?n.length-1:o+2];return i.set(Ja(a,c.x,l.x,h.x,u.x),Ja(a,c.y,l.y,h.y,u.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const n=e.points[t];this.points.push(n.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const n=e.points[t];this.points.push(new se().fromArray(n))}return this}}var Xr=Object.freeze({__proto__:null,ArcCurve:Xm,CatmullRomCurve3:qm,CubicBezierCurve:il,CubicBezierCurve3:eg,EllipseCurve:ro,LineCurve:nl,LineCurve3:tg,QuadraticBezierCurve:sl,QuadraticBezierCurve3:ig,SplineCurve:rl});class ng extends ni{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Xr[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),n=this.getCurveLengths();let r=0;for(;r<n.length;){if(n[r]>=i){const o=n[r]-i,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,n=this.curves.length;i<n;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let n=0,r=this.curves;n<r.length;n++){const o=r[n],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];i&&i.equals(h)||(t.push(h),i=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const n=e.curves[t];this.curves.push(new Xr[n.type]().fromJSON(n))}return this}}class Za extends ng{constructor(e){super(),this.type="Path",this.currentPoint=new se,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new nl(this.currentPoint.clone(),new se(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,n){const r=new sl(this.currentPoint.clone(),new se(e,t),new se(i,n));return this.curves.push(r),this.currentPoint.set(i,n),this}bezierCurveTo(e,t,i,n,r,o){const a=new il(this.currentPoint.clone(),new se(e,t),new se(i,n),new se(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new rl(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,n,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,i,n,r,o),this}absarc(e,t,i,n,r,o){return this.absellipse(e,t,i,i,n,r,o),this}ellipse(e,t,i,n,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,i,n,r,o,a,c),this}absellipse(e,t,i,n,r,o,a,c){const l=new ro(e,t,i,n,r,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class ao extends yt{constructor(e=1,t=1,i=1,n=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:n,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;n=Math.floor(n),r=Math.floor(r);const h=[],u=[],d=[],p=[];let g=0;const _=[],m=i/2;let f=0;b(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new Qe(u,3)),this.setAttribute("normal",new Qe(d,3)),this.setAttribute("uv",new Qe(p,2));function b(){const y=new w,R=new w;let P=0;const C=(t-e)/i;for(let N=0;N<=r;N++){const S=[],E=N/r,U=E*(t-e)+e;for(let B=0;B<=n;B++){const Q=B/n,I=Q*c+a,k=Math.sin(I),V=Math.cos(I);R.x=U*k,R.y=-E*i+m,R.z=U*V,u.push(R.x,R.y,R.z),y.set(k,C,V).normalize(),d.push(y.x,y.y,y.z),p.push(Q,1-E),S.push(g++)}_.push(S)}for(let N=0;N<n;N++)for(let S=0;S<r;S++){const E=_[S][N],U=_[S+1][N],B=_[S+1][N+1],Q=_[S][N+1];h.push(E,U,Q),h.push(U,B,Q),P+=6}l.addGroup(f,P,0),f+=P}function v(y){const R=g,P=new se,C=new w;let N=0;const S=y===!0?e:t,E=y===!0?1:-1;for(let B=1;B<=n;B++)u.push(0,m*E,0),d.push(0,E,0),p.push(.5,.5),g++;const U=g;for(let B=0;B<=n;B++){const I=B/n*c+a,k=Math.cos(I),V=Math.sin(I);C.x=S*V,C.y=m*E,C.z=S*k,u.push(C.x,C.y,C.z),d.push(0,E,0),P.x=k*.5+.5,P.y=V*.5*E+.5,p.push(P.x,P.y),g++}for(let B=0;B<n;B++){const Q=R+B,I=U+B;y===!0?h.push(I,I+1,Q):h.push(I+1,I,Q),N+=3}l.addGroup(f,N,y===!0?1:2),f+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ao(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class co extends ao{constructor(e=1,t=1,i=32,n=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,i,n,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:n,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new co(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ws extends yt{constructor(e=[],t=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:n};const r=[],o=[];a(n),l(i),h(),this.setAttribute("position",new Qe(r,3)),this.setAttribute("normal",new Qe(r.slice(),3)),this.setAttribute("uv",new Qe(o,2)),n===0?this.computeVertexNormals():this.normalizeNormals();function a(b){const v=new w,y=new w,R=new w;for(let P=0;P<t.length;P+=3)p(t[P+0],v),p(t[P+1],y),p(t[P+2],R),c(v,y,R,b)}function c(b,v,y,R){const P=R+1,C=[];for(let N=0;N<=P;N++){C[N]=[];const S=b.clone().lerp(y,N/P),E=v.clone().lerp(y,N/P),U=P-N;for(let B=0;B<=U;B++)B===0&&N===P?C[N][B]=S:C[N][B]=S.clone().lerp(E,B/U)}for(let N=0;N<P;N++)for(let S=0;S<2*(P-N)-1;S++){const E=Math.floor(S/2);S%2===0?(d(C[N][E+1]),d(C[N+1][E]),d(C[N][E])):(d(C[N][E+1]),d(C[N+1][E+1]),d(C[N+1][E]))}}function l(b){const v=new w;for(let y=0;y<r.length;y+=3)v.x=r[y+0],v.y=r[y+1],v.z=r[y+2],v.normalize().multiplyScalar(b),r[y+0]=v.x,r[y+1]=v.y,r[y+2]=v.z}function h(){const b=new w;for(let v=0;v<r.length;v+=3){b.x=r[v+0],b.y=r[v+1],b.z=r[v+2];const y=m(b)/2/Math.PI+.5,R=f(b)/Math.PI+.5;o.push(y,1-R)}g(),u()}function u(){for(let b=0;b<o.length;b+=6){const v=o[b+0],y=o[b+2],R=o[b+4],P=Math.max(v,y,R),C=Math.min(v,y,R);P>.9&&C<.1&&(v<.2&&(o[b+0]+=1),y<.2&&(o[b+2]+=1),R<.2&&(o[b+4]+=1))}}function d(b){r.push(b.x,b.y,b.z)}function p(b,v){const y=b*3;v.x=e[y+0],v.y=e[y+1],v.z=e[y+2]}function g(){const b=new w,v=new w,y=new w,R=new w,P=new se,C=new se,N=new se;for(let S=0,E=0;S<r.length;S+=9,E+=6){b.set(r[S+0],r[S+1],r[S+2]),v.set(r[S+3],r[S+4],r[S+5]),y.set(r[S+6],r[S+7],r[S+8]),P.set(o[E+0],o[E+1]),C.set(o[E+2],o[E+3]),N.set(o[E+4],o[E+5]),R.copy(b).add(v).add(y).divideScalar(3);const U=m(R);_(P,E+0,b,U),_(C,E+2,v,U),_(N,E+4,y,U)}}function _(b,v,y,R){R<0&&b.x===1&&(o[v]=b.x-1),y.x===0&&y.z===0&&(o[v]=R/2/Math.PI+.5)}function m(b){return Math.atan2(b.z,-b.x)}function f(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ws(e.vertices,e.indices,e.radius,e.details)}}class ol extends Za{constructor(e){super(e),this.uuid=Gi(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,n=this.holes.length;i<n;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const n=e.holes[t];this.holes.push(new Za().fromJSON(n))}return this}}const sg={triangulate:function(s,e,t=2){const i=e&&e.length,n=i?e[0]*t:s.length;let r=al(s,0,n,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,u,d,p;if(i&&(r=lg(s,e,r,t)),s.length>80*t){a=l=s[0],c=h=s[1];for(let g=t;g<n;g+=t)u=s[g],d=s[g+1],u<a&&(a=u),d<c&&(c=d),u>l&&(l=u),d>h&&(h=d);p=Math.max(l-a,h-c),p=p!==0?32767/p:0}return Bn(r,o,t,a,c,p,0),o}};function al(s,e,t,i,n){let r,o;if(n===yg(s,e,t,i)>0)for(r=e;r<t;r+=i)o=Ka(r,s[r],s[r+1],o);else for(r=t-i;r>=e;r-=i)o=Ka(r,s[r],s[r+1],o);return o&&Xs(o,o.next)&&(Gn(o),o=o.next),o}function zi(s,e){if(!s)return s;e||(e=s);let t=s,i;do if(i=!1,!t.steiner&&(Xs(t,t.next)||ot(t.prev,t,t.next)===0)){if(Gn(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function Bn(s,e,t,i,n,r,o){if(!s)return;!o&&r&&pg(s,i,n,r);let a=s,c,l;for(;s.prev!==s.next;){if(c=s.prev,l=s.next,r?og(s,i,n,r):rg(s)){e.push(c.i/t|0),e.push(s.i/t|0),e.push(l.i/t|0),Gn(s),s=l.next,a=l.next;continue}if(s=l,s===a){o?o===1?(s=ag(zi(s),e,t),Bn(s,e,t,i,n,r,2)):o===2&&cg(s,e,t,i,n,r):Bn(zi(s),e,t,i,n,r,1);break}}}function rg(s){const e=s.prev,t=s,i=s.next;if(ot(e,t,i)>=0)return!1;const n=e.x,r=t.x,o=i.x,a=e.y,c=t.y,l=i.y,h=n<r?n<o?n:o:r<o?r:o,u=a<c?a<l?a:l:c<l?c:l,d=n>r?n>o?n:o:r>o?r:o,p=a>c?a>l?a:l:c>l?c:l;let g=i.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=p&&un(n,a,r,c,o,l,g.x,g.y)&&ot(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function og(s,e,t,i){const n=s.prev,r=s,o=s.next;if(ot(n,r,o)>=0)return!1;const a=n.x,c=r.x,l=o.x,h=n.y,u=r.y,d=o.y,p=a<c?a<l?a:l:c<l?c:l,g=h<u?h<d?h:d:u<d?u:d,_=a>c?a>l?a:l:c>l?c:l,m=h>u?h>d?h:d:u>d?u:d,f=qr(p,g,e,t,i),b=qr(_,m,e,t,i);let v=s.prevZ,y=s.nextZ;for(;v&&v.z>=f&&y&&y.z<=b;){if(v.x>=p&&v.x<=_&&v.y>=g&&v.y<=m&&v!==n&&v!==o&&un(a,h,c,u,l,d,v.x,v.y)&&ot(v.prev,v,v.next)>=0||(v=v.prevZ,y.x>=p&&y.x<=_&&y.y>=g&&y.y<=m&&y!==n&&y!==o&&un(a,h,c,u,l,d,y.x,y.y)&&ot(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;v&&v.z>=f;){if(v.x>=p&&v.x<=_&&v.y>=g&&v.y<=m&&v!==n&&v!==o&&un(a,h,c,u,l,d,v.x,v.y)&&ot(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;y&&y.z<=b;){if(y.x>=p&&y.x<=_&&y.y>=g&&y.y<=m&&y!==n&&y!==o&&un(a,h,c,u,l,d,y.x,y.y)&&ot(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function ag(s,e,t){let i=s;do{const n=i.prev,r=i.next.next;!Xs(n,r)&&cl(n,i,i.next,r)&&zn(n,r)&&zn(r,n)&&(e.push(n.i/t|0),e.push(i.i/t|0),e.push(r.i/t|0),Gn(i),Gn(i.next),i=s=r),i=i.next}while(i!==s);return zi(i)}function cg(s,e,t,i,n,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&_g(o,a)){let c=ll(o,a);o=zi(o,o.next),c=zi(c,c.next),Bn(o,e,t,i,n,r,0),Bn(c,e,t,i,n,r,0);return}a=a.next}o=o.next}while(o!==s)}function lg(s,e,t,i){const n=[];let r,o,a,c,l;for(r=0,o=e.length;r<o;r++)a=e[r]*i,c=r<o-1?e[r+1]*i:s.length,l=al(s,a,c,i,!1),l===l.next&&(l.steiner=!0),n.push(gg(l));for(n.sort(hg),r=0;r<n.length;r++)t=ug(n[r],t);return t}function hg(s,e){return s.x-e.x}function ug(s,e){const t=dg(s,e);if(!t)return e;const i=ll(t,s);return zi(i,i.next),zi(t,t.next)}function dg(s,e){let t=e,i=-1/0,n;const r=s.x,o=s.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const d=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=r&&d>i&&(i=d,n=t.x<t.next.x?t:t.next,d===r))return n}t=t.next}while(t!==e);if(!n)return null;const a=n,c=n.x,l=n.y;let h=1/0,u;t=n;do r>=t.x&&t.x>=c&&r!==t.x&&un(o<l?r:i,o,c,l,o<l?i:r,o,t.x,t.y)&&(u=Math.abs(o-t.y)/(r-t.x),zn(t,s)&&(u<h||u===h&&(t.x>n.x||t.x===n.x&&fg(n,t)))&&(n=t,h=u)),t=t.next;while(t!==a);return n}function fg(s,e){return ot(s.prev,s,e.prev)<0&&ot(e.next,s,s.next)<0}function pg(s,e,t,i){let n=s;do n.z===0&&(n.z=qr(n.x,n.y,e,t,i)),n.prevZ=n.prev,n.nextZ=n.next,n=n.next;while(n!==s);n.prevZ.nextZ=null,n.prevZ=null,mg(n)}function mg(s){let e,t,i,n,r,o,a,c,l=1;do{for(t=s,s=null,r=null,o=0;t;){for(o++,i=t,a=0,e=0;e<l&&(a++,i=i.nextZ,!!i);e++);for(c=l;a>0||c>0&&i;)a!==0&&(c===0||!i||t.z<=i.z)?(n=t,t=t.nextZ,a--):(n=i,i=i.nextZ,c--),r?r.nextZ=n:s=n,n.prevZ=r,r=n;t=i}r.nextZ=null,l*=2}while(o>1);return s}function qr(s,e,t,i,n){return s=(s-t)*n|0,e=(e-i)*n|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function gg(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function un(s,e,t,i,n,r,o,a){return(n-o)*(e-a)>=(s-o)*(r-a)&&(s-o)*(i-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(n-o)*(i-a)}function _g(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!vg(s,e)&&(zn(s,e)&&zn(e,s)&&xg(s,e)&&(ot(s.prev,s,e.prev)||ot(s,e.prev,e))||Xs(s,e)&&ot(s.prev,s,s.next)>0&&ot(e.prev,e,e.next)>0)}function ot(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function Xs(s,e){return s.x===e.x&&s.y===e.y}function cl(s,e,t,i){const n=Ms(ot(s,e,t)),r=Ms(ot(s,e,i)),o=Ms(ot(t,i,s)),a=Ms(ot(t,i,e));return!!(n!==r&&o!==a||n===0&&Ss(s,t,e)||r===0&&Ss(s,i,e)||o===0&&Ss(t,s,i)||a===0&&Ss(t,e,i))}function Ss(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function Ms(s){return s>0?1:s<0?-1:0}function vg(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&cl(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function zn(s,e){return ot(s.prev,s,s.next)<0?ot(s,e,s.next)>=0&&ot(s,s.prev,e)>=0:ot(s,e,s.prev)<0||ot(s,s.next,e)<0}function xg(s,e){let t=s,i=!1;const n=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&n<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==s);return i}function ll(s,e){const t=new jr(s.i,s.x,s.y),i=new jr(e.i,e.x,e.y),n=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=n,n.prev=t,i.next=t,t.prev=i,r.next=i,i.prev=r,i}function Ka(s,e,t,i){const n=new jr(s,e,t);return i?(n.next=i.next,n.prev=i,i.next.prev=n,i.next=n):(n.prev=n,n.next=n),n}function Gn(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function jr(s,e,t){this.i=s,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function yg(s,e,t,i){let n=0;for(let r=e,o=t-i;r<t;r+=i)n+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return n}class Dn{static area(e){const t=e.length;let i=0;for(let n=t-1,r=0;r<t;n=r++)i+=e[n].x*e[r].y-e[r].x*e[n].y;return i*.5}static isClockWise(e){return Dn.area(e)<0}static triangulateShape(e,t){const i=[],n=[],r=[];$a(e),Qa(i,e);let o=e.length;t.forEach($a);for(let c=0;c<t.length;c++)n.push(o),o+=t[c].length,Qa(i,t[c]);const a=sg.triangulate(i,n);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function $a(s){const e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function Qa(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}class lo extends yt{constructor(e=new ol([new se(.5,.5),new se(-.5,.5),new se(-.5,-.5),new se(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const i=this,n=[],r=[];for(let a=0,c=e.length;a<c;a++){const l=e[a];o(l)}this.setAttribute("position",new Qe(n,3)),this.setAttribute("uv",new Qe(r,2)),this.computeVertexNormals();function o(a){const c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,p=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:p-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const f=t.extrudePath,b=t.UVGenerator!==void 0?t.UVGenerator:Sg;let v,y=!1,R,P,C,N;f&&(v=f.getSpacedPoints(h),y=!0,d=!1,R=f.computeFrenetFrames(h,!1),P=new w,C=new w,N=new w),d||(m=0,p=0,g=0,_=0);const S=a.extractPoints(l);let E=S.shape;const U=S.holes;if(!Dn.isClockWise(E)){E=E.reverse();for(let L=0,ce=U.length;L<ce;L++){const j=U[L];Dn.isClockWise(j)&&(U[L]=j.reverse())}}const Q=Dn.triangulateShape(E,U),I=E;for(let L=0,ce=U.length;L<ce;L++){const j=U[L];E=E.concat(j)}function k(L,ce,j){return ce||console.error("THREE.ExtrudeGeometry: vec does not exist"),L.clone().addScaledVector(ce,j)}const V=E.length,Y=Q.length;function J(L,ce,j){let ae,q,Te;const me=L.x-ce.x,T=L.y-ce.y,x=j.x-L.x,O=j.y-L.y,ne=me*me+T*T,te=me*O-T*x;if(Math.abs(te)>Number.EPSILON){const ee=Math.sqrt(ne),Se=Math.sqrt(x*x+O*O),de=ce.x-T/ee,ve=ce.y+me/ee,Ce=j.x-O/Se,Be=j.y+x/Se,ie=((Ce-de)*O-(Be-ve)*x)/(me*O-T*x);ae=de+me*ie-L.x,q=ve+T*ie-L.y;const Je=ae*ae+q*q;if(Je<=2)return new se(ae,q);Te=Math.sqrt(Je/2)}else{let ee=!1;me>Number.EPSILON?x>Number.EPSILON&&(ee=!0):me<-Number.EPSILON?x<-Number.EPSILON&&(ee=!0):Math.sign(T)===Math.sign(O)&&(ee=!0),ee?(ae=-T,q=me,Te=Math.sqrt(ne)):(ae=me,q=T,Te=Math.sqrt(ne/2))}return new se(ae/Te,q/Te)}const Z=[];for(let L=0,ce=I.length,j=ce-1,ae=L+1;L<ce;L++,j++,ae++)j===ce&&(j=0),ae===ce&&(ae=0),Z[L]=J(I[L],I[j],I[ae]);const K=[];let re,oe=Z.concat();for(let L=0,ce=U.length;L<ce;L++){const j=U[L];re=[];for(let ae=0,q=j.length,Te=q-1,me=ae+1;ae<q;ae++,Te++,me++)Te===q&&(Te=0),me===q&&(me=0),re[ae]=J(j[ae],j[Te],j[me]);K.push(re),oe=oe.concat(re)}for(let L=0;L<m;L++){const ce=L/m,j=p*Math.cos(ce*Math.PI/2),ae=g*Math.sin(ce*Math.PI/2)+_;for(let q=0,Te=I.length;q<Te;q++){const me=k(I[q],Z[q],ae);_e(me.x,me.y,-j)}for(let q=0,Te=U.length;q<Te;q++){const me=U[q];re=K[q];for(let T=0,x=me.length;T<x;T++){const O=k(me[T],re[T],ae);_e(O.x,O.y,-j)}}}const W=g+_;for(let L=0;L<V;L++){const ce=d?k(E[L],oe[L],W):E[L];y?(C.copy(R.normals[0]).multiplyScalar(ce.x),P.copy(R.binormals[0]).multiplyScalar(ce.y),N.copy(v[0]).add(C).add(P),_e(N.x,N.y,N.z)):_e(ce.x,ce.y,0)}for(let L=1;L<=h;L++)for(let ce=0;ce<V;ce++){const j=d?k(E[ce],oe[ce],W):E[ce];y?(C.copy(R.normals[L]).multiplyScalar(j.x),P.copy(R.binormals[L]).multiplyScalar(j.y),N.copy(v[L]).add(C).add(P),_e(N.x,N.y,N.z)):_e(j.x,j.y,u/h*L)}for(let L=m-1;L>=0;L--){const ce=L/m,j=p*Math.cos(ce*Math.PI/2),ae=g*Math.sin(ce*Math.PI/2)+_;for(let q=0,Te=I.length;q<Te;q++){const me=k(I[q],Z[q],ae);_e(me.x,me.y,u+j)}for(let q=0,Te=U.length;q<Te;q++){const me=U[q];re=K[q];for(let T=0,x=me.length;T<x;T++){const O=k(me[T],re[T],ae);y?_e(O.x,O.y+v[h-1].y,v[h-1].x+j):_e(O.x,O.y,u+j)}}}X(),ue();function X(){const L=n.length/3;if(d){let ce=0,j=V*ce;for(let ae=0;ae<Y;ae++){const q=Q[ae];Ie(q[2]+j,q[1]+j,q[0]+j)}ce=h+m*2,j=V*ce;for(let ae=0;ae<Y;ae++){const q=Q[ae];Ie(q[0]+j,q[1]+j,q[2]+j)}}else{for(let ce=0;ce<Y;ce++){const j=Q[ce];Ie(j[2],j[1],j[0])}for(let ce=0;ce<Y;ce++){const j=Q[ce];Ie(j[0]+V*h,j[1]+V*h,j[2]+V*h)}}i.addGroup(L,n.length/3-L,0)}function ue(){const L=n.length/3;let ce=0;ye(I,ce),ce+=I.length;for(let j=0,ae=U.length;j<ae;j++){const q=U[j];ye(q,ce),ce+=q.length}i.addGroup(L,n.length/3-L,1)}function ye(L,ce){let j=L.length;for(;--j>=0;){const ae=j;let q=j-1;q<0&&(q=L.length-1);for(let Te=0,me=h+m*2;Te<me;Te++){const T=V*Te,x=V*(Te+1),O=ce+ae+T,ne=ce+q+T,te=ce+q+x,ee=ce+ae+x;Oe(O,ne,te,ee)}}}function _e(L,ce,j){c.push(L),c.push(ce),c.push(j)}function Ie(L,ce,j){be(L),be(ce),be(j);const ae=n.length/3,q=b.generateTopUV(i,n,ae-3,ae-2,ae-1);Ne(q[0]),Ne(q[1]),Ne(q[2])}function Oe(L,ce,j,ae){be(L),be(ce),be(ae),be(ce),be(j),be(ae);const q=n.length/3,Te=b.generateSideWallUV(i,n,q-6,q-3,q-2,q-1);Ne(Te[0]),Ne(Te[1]),Ne(Te[3]),Ne(Te[1]),Ne(Te[2]),Ne(Te[3])}function be(L){n.push(c[L*3+0]),n.push(c[L*3+1]),n.push(c[L*3+2])}function Ne(L){r.push(L.x),r.push(L.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return Mg(t,i,e)}static fromJSON(e,t){const i=[];for(let r=0,o=e.shapes.length;r<o;r++){const a=t[e.shapes[r]];i.push(a)}const n=e.options.extrudePath;return n!==void 0&&(e.options.extrudePath=new Xr[n.type]().fromJSON(n)),new lo(i,e.options)}}const Sg={generateTopUV:function(s,e,t,i,n){const r=e[t*3],o=e[t*3+1],a=e[i*3],c=e[i*3+1],l=e[n*3],h=e[n*3+1];return[new se(r,o),new se(a,c),new se(l,h)]},generateSideWallUV:function(s,e,t,i,n,r){const o=e[t*3],a=e[t*3+1],c=e[t*3+2],l=e[i*3],h=e[i*3+1],u=e[i*3+2],d=e[n*3],p=e[n*3+1],g=e[n*3+2],_=e[r*3],m=e[r*3+1],f=e[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new se(o,1-c),new se(l,1-u),new se(d,1-g),new se(_,1-f)]:[new se(a,1-c),new se(h,1-u),new se(p,1-g),new se(m,1-f)]}};function Mg(s,e,t){if(t.shapes=[],Array.isArray(s))for(let i=0,n=s.length;i<n;i++){const r=s[i];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class qn extends Ws{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,n=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(n,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new qn(e.radius,e.detail)}}class qs extends Ws{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],n=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,n,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new qs(e.radius,e.detail)}}class ho extends yt{constructor(e=.5,t=1,i=32,n=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:n,thetaStart:r,thetaLength:o},i=Math.max(3,i),n=Math.max(1,n);const a=[],c=[],l=[],h=[];let u=e;const d=(t-e)/n,p=new w,g=new se;for(let _=0;_<=n;_++){for(let m=0;m<=i;m++){const f=r+m/i*o;p.x=u*Math.cos(f),p.y=u*Math.sin(f),c.push(p.x,p.y,p.z),l.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let _=0;_<n;_++){const m=_*(i+1);for(let f=0;f<i;f++){const b=f+m,v=b,y=b+i+1,R=b+i+2,P=b+1;a.push(v,y,P),a.push(y,R,P)}}this.setIndex(a),this.setAttribute("position",new Qe(c,3)),this.setAttribute("normal",new Qe(l,3)),this.setAttribute("uv",new Qe(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ho(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class uo extends yt{constructor(e=1,t=32,i=16,n=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:n,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new w,d=new w,p=[],g=[],_=[],m=[];for(let f=0;f<=i;f++){const b=[],v=f/i;let y=0;f===0&&o===0?y=.5/t:f===i&&c===Math.PI&&(y=-.5/t);for(let R=0;R<=t;R++){const P=R/t;u.x=-e*Math.cos(n+P*r)*Math.sin(o+v*a),u.y=e*Math.cos(o+v*a),u.z=e*Math.sin(n+P*r)*Math.sin(o+v*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(P+y,1-v),b.push(l++)}h.push(b)}for(let f=0;f<i;f++)for(let b=0;b<t;b++){const v=h[f][b+1],y=h[f][b],R=h[f+1][b],P=h[f+1][b+1];(f!==0||o>0)&&p.push(v,y,P),(f!==i-1||c<Math.PI)&&p.push(y,R,P)}this.setIndex(p),this.setAttribute("position",new Qe(g,3)),this.setAttribute("normal",new Qe(_,3)),this.setAttribute("uv",new Qe(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new uo(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class fo extends yt{constructor(e=1,t=.4,i=12,n=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:n,arc:r},i=Math.floor(i),n=Math.floor(n);const o=[],a=[],c=[],l=[],h=new w,u=new w,d=new w;for(let p=0;p<=i;p++)for(let g=0;g<=n;g++){const _=g/n*r,m=p/i*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(_),u.y=(e+t*Math.cos(m))*Math.sin(_),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(g/n),l.push(p/i)}for(let p=1;p<=i;p++)for(let g=1;g<=n;g++){const _=(n+1)*p+g-1,m=(n+1)*(p-1)+g-1,f=(n+1)*(p-1)+g,b=(n+1)*p+g;o.push(_,m,b),o.push(m,f,b)}this.setIndex(o),this.setAttribute("position",new Qe(a,3)),this.setAttribute("normal",new Qe(c,3)),this.setAttribute("uv",new Qe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fo(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class bg extends Vi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Pe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Uc,this.normalScale=new se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const ec={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class Eg{constructor(e,t,i){const n=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(h){a++,r===!1&&n.onStart!==void 0&&n.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,n.onProgress!==void 0&&n.onProgress(h,o,a),o===a&&(r=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(h){n.onError!==void 0&&n.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){const p=l[u],g=l[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}}const Tg=new Eg;class po{constructor(e){this.manager=e!==void 0?e:Tg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(n,r){i.load(e,n,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}po.DEFAULT_MATERIAL_NAME="__DEFAULT";class Ag extends po{constructor(e){super(e)}load(e,t,i,n){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=ec.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=kn("img");function c(){h(),ec.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(u){h(),n&&n(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class wg extends po{constructor(e){super(e)}load(e,t,i,n){const r=new It,o=new Ag(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},i,n),r}}class mo extends xt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Pe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const Rr=new at,tc=new w,ic=new w;class hl{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new se(512,512),this.map=null,this.mapPass=null,this.matrix=new at,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new io,this._frameExtents=new se(1,1),this._viewportCount=1,this._viewports=[new st(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;tc.setFromMatrixPosition(e.matrixWorld),t.position.copy(tc),ic.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ic),t.updateMatrixWorld(),Rr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Rr),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Rr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const nc=new at,Tn=new w,Lr=new w;class Pg extends hl{constructor(){super(new Ot(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new se(4,2),this._viewportCount=6,this._viewports=[new st(2,1,1,1),new st(0,1,1,1),new st(3,1,1,1),new st(1,1,1,1),new st(3,0,1,1),new st(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,n=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),Tn.setFromMatrixPosition(e.matrixWorld),i.position.copy(Tn),Lr.copy(i.position),Lr.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Lr),i.updateMatrixWorld(),n.makeTranslation(-Tn.x,-Tn.y,-Tn.z),nc.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(nc)}}class Cg extends mo{constructor(e,t,i=0,n=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new Pg}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Rg extends hl{constructor(){super(new jc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Lg extends mo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.target=new xt,this.shadow=new Rg}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Ig extends mo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Dg{constructor(e,t,i=0,n=1/0){this.ray=new zs(e,t),this.near=i,this.far=n,this.camera=null,this.layers=new to,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,i=[]){return Yr(e,this,i,t),i.sort(sc),i}intersectObjects(e,t=!0,i=[]){for(let n=0,r=e.length;n<r;n++)Yr(e[n],this,i,t);return i.sort(sc),i}}function sc(s,e){return s.distance-e.distance}function Yr(s,e,t,i){if(s.layers.test(e.layers)&&s.raycast(e,t),i===!0){const n=s.children;for(let r=0,o=n.length;r<o;r++)Yr(n[r],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Kr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Kr);const rc=[{x:0,y:0,z:0},{x:-2.7,y:3.6,z:1.7},{x:-1.3,y:1.75,z:.8},{x:2.7,y:3.6,z:-1.7},{x:1.3,y:1.75,z:-.8},{x:-2.7,y:-3.6,z:-1.7},{x:-1.3,y:-1.75,z:-.8},{x:2.7,y:-3.6,z:1.7},{x:1.3,y:-1.75,z:.8},{x:0,y:-4.35,z:.15}],oc=[{x:0,y:0,z:0},{x:-4.8,y:6.1,z:3.4},{x:-2.15,y:2.95,z:1.55},{x:4.8,y:6.1,z:-3.4},{x:2.15,y:2.95,z:-1.55},{x:-4.8,y:-6.1,z:-3.4},{x:-2.15,y:-2.95,z:-1.55},{x:4.8,y:-6.1,z:3.4},{x:2.15,y:-2.95,z:1.55},{x:0,y:-5.05,z:.2}];function Ug(s,e){return s===0?"presentation":s===e-1?"hint":"project"}function Ng(s){return rc[s]||rc[0]}function Fg(s){return oc[s]||oc[0]}const Og=[{id:1,activeFacette:0,date:"2024-03",facettes:[{id:1,images:["assets/images/projects/intro.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:"https://github.com/orgs/ApeProd",demo:null,video:null},featured:!1},{id:3,images:["assets/images/projects/Imageprofile.png"],links:{github:null,demo:null,video:null},featured:!1}]},{id:2,activeFacette:0,date:"2024-02",facettes:[{id:1,images:["assets/images/projects/TonoIntro.png"],links:{github:"https://github.com/bheall/Tono_Discord_Bot",demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:3,activeFacette:0,date:"2024-01",facettes:[{id:1,images:["assets/images/projects/Davinciintro.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:4,activeFacette:0,date:"2023-12",facettes:[{id:1,images:[],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:5,activeFacette:0,date:"2023-11",facettes:[{id:1,images:["assets/images/projects/Introia.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:6,activeFacette:0,date:"2023-10",facettes:[{id:1,images:["assets/images/projects/Discordintro.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:7,activeFacette:0,date:"2023-09",facettes:[{id:1,images:["assets/images/projects/placeholder.svg"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:["assets/images/projects/placeholder.svg"],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:["assets/images/projects/placeholder.svg"],links:{github:null,demo:null,video:null},featured:!1}]},{id:8,activeFacette:0,date:"2023-08",facettes:[{id:1,images:["assets/images/projects/Spine.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:9,activeFacette:0,date:"2023-07",facettes:[{id:1,images:["assets/images/projects/Conception.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:10,activeFacette:0,date:"2023-06",facettes:[{id:1,images:[],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]}],ul={fr:[{id:1,title:"PRÉSENTATION",facettes:[{category:"presentation",longDescription:"On dit souvent qu'un restaurant avec une carte trop fournie peine à exceller dans chaque plat. Ape Prod propose plusieurs services MAIS qui convergent vers une seule spécialité : le design et le brainstorming de projets. Direction artistique, identité visuelle, game design, prototypage technique et scénarisation — chaque compétence sert un objectif commun : transformer vos idées en concepts solides à votre image et innovants.",technologies:["Direction Artistique","Conception","Stratégie Créative","Innovation","Vision Globale"]},{category:"services",longDescription:`Designer polyvalent, je travaille avec de nombreux logiciels pour donner vie à mes idées et créer des DA et designs adaptés à n'importe quel projet. Ma valeur ajoutée réside dans ma polyvalence — sans être un expert de chaque domaine — qui me permet de créer des prototypes précis facilement reprenables et améliorables.

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

Together, we won't create just another project. We'll create THE project that makes the difference.`,technologies:["Innovation","Strategic Creativity","Impact","Excellence","Difference"]}]}]},kg={1:{dark:"assets/images/Logo/logomodedark.svg",light:"assets/images/Logo/logomodelight.svg",scale:.7,opacity:1},2:{dark:"assets/images/Logo/logomodedark.svg",light:"assets/images/Logo/logomodelight.svg",scale:.7,opacity:1},3:{dark:"assets/images/Logo/DavinciLogoDark.svg",light:"assets/images/Logo/DavinciLogoLight.svg",scale:.7,opacity:1},4:{dark:"assets/images/Logo/MovieLogoDark.svg",light:"assets/images/Logo/MovieLogoLight.svg",scale:.7,opacity:1},5:{dark:"assets/images/Logo/IALogoDark.svg",light:"assets/images/Logo/IALogoLight.svg",scale:.7,opacity:1},6:{dark:"assets/images/Logo/DiscordLogoDark.svg",light:"assets/images/Logo/DiscordLogoLight.svg",scale:.7,opacity:1},7:{dark:"assets/images/Logo/AffinityLogoDark.svg",light:"assets/images/Logo/AffinityLogoLight.svg",scale:.7,opacity:1},8:{dark:"assets/images/Logo/SpineLogoDark.svg",light:"assets/images/Logo/SpineLogoLight.svg",scale:.7,opacity:1},9:{dark:"assets/images/Logo/logomodedark.svg",light:"assets/images/Logo/logomodelight.svg",scale:.7,opacity:1},10:{dark:"assets/images/Logo/logomodedark.svg",light:"assets/images/Logo/logomodelight.svg",scale:.7,opacity:1}},bs={dark:"/assets/images/Logo/logomodedark.svg",light:"/assets/images/Logo/logomodelight.svg",scale:.7,opacity:1},Bg={presentation:{fr:"Présentation",en:"Introduction"},services:{fr:"Services",en:"Services"},about:{fr:"À propos",en:"About"},dev:{fr:"Développement",en:"Development"},video:{fr:"Vidéo",en:"Video"},tech:{fr:"IA & technique",en:"AI & tech"},design:{fr:"Design",en:"Design"},gamedesign:{fr:"Game design",en:"Game design"},business:{fr:"Stratégie",en:"Strategy"}};function zg(s){return{github:(s==null?void 0:s.github)||null,demo:(s==null?void 0:s.demo)||null,video:(s==null?void 0:s.video)||null}}function Gg(s,e,t,i){const n=e.category,r=Bg[n]||{fr:n,en:t.category||n};return{id:s,categoryKey:n,categoryLabel:r,description:{fr:e.longDescription,en:t.longDescription},technologies:e.technologies.map((o,a)=>({fr:o,en:t.technologies[a]||o})),images:i.images?i.images.map(o=>`/${o}`):[],links:zg(i.links),featured:!!i.featured}}function Vg(s){const t=kg[String(s)]||{};return{dark:t.dark?`/${t.dark}`:bs.dark,light:t.light?`/${t.light}`:bs.light,scale:typeof t.scale=="number"?t.scale:bs.scale,opacity:typeof t.opacity=="number"?t.opacity:bs.opacity}}const ac=Og,Hg=ul.fr,Wg=ul.en,Xg=ac.map((s,e)=>{const t=Hg[e],i=Wg[e],n=Ug(e,ac.length),r=s.facettes.map((o,a)=>Gg(a,t.facettes[a],i.facettes[a],o));return{id:`shard-${s.id}`,numericId:s.id,order:e,role:n,date:s.date,title:{fr:n==="hint"?"INDICE":t.title,en:n==="hint"?"HINT":i.title},logo:Vg(s.id),facets:n==="hint"?[{...r[0],categoryKey:"hint",categoryLabel:{fr:"Indice",en:"Hint"},description:{fr:"Tous les fragments n’attendent pas le focus. Certains veulent retrouver une forme précise. Observe le X, puis ce point sous sa blessure centrale.",en:"Not every fragment wants focus. Some want to recover a precise form. Watch the X, then the dot below its central wound."},technologies:[{fr:"Mystère",en:"Mystery"},{fr:"Placement",en:"Placement"},{fr:"Transformation",en:"Transformation"},{fr:"Jeu caché",en:"Hidden game"},{fr:"Clé d’accès",en:"Access key"}]},{...r[1],categoryKey:"hint",categoryLabel:{fr:"Accès",en:"Access"},description:{fr:"Quand chaque shard rejoint son empreinte, le monde cesse d’être un portfolio et bascule vers une autre règle.",en:"When every shard reaches its imprint, the world stops being a portfolio and switches to another rule."},technologies:[{fr:"Pivot",en:"Pivot"},{fr:"Constellation",en:"Constellation"},{fr:"Déblocage",en:"Unlock"},{fr:"Momentum",en:"Momentum"},{fr:"Transition",en:"Transition"}]},{...r[2],categoryKey:"hint",categoryLabel:{fr:"Conseil",en:"Clue"},description:{fr:"Ne cherche pas un bouton. Replace les fragments. Le fil de lumière ne ment jamais.",en:"Do not search for a button. Put the fragments back into place. The line of light never lies."},technologies:[{fr:"Patience",en:"Patience"},{fr:"Lecture",en:"Reading"},{fr:"Exploration",en:"Exploration"},{fr:"Déverrouillage",en:"Unlocking"},{fr:"Secret",en:"Secret"}]}]:r}});class qg{constructor(){M(this,"projects",Xg)}getProjects(){return this.projects}getProjectById(e){return this.projects.find(t=>t.id===e)||null}getProjectByOrder(e){return this.projects[e]||null}getProjectLabel(e,t){const i=this.getProjectById(e);return i?i.title[t]:""}getFacet(e,t){const i=this.getProjectById(e);return i&&i.facets[Math.max(0,Math.min(t,i.facets.length-1))]||null}getProjectIndex(e){return this.projects.findIndex(t=>t.id===e)}getProjectCount(){return this.projects.length}getLocalizedProjects(e){return this.projects.map(t=>({id:t.id,title:t.title[e],project:t}))}}const $=(s,e)=>({fr:s,en:e}),we=s=>s;function cc(){return{counts:{},ownedOrder:[],modifiers:dl()}}function dl(){return{glideFactor:0,landingTolerance:0,chargeRate:1,jumpPower:1,chargedLeapBonus:0,airControl:0,captureRadius:0,extraJumps:0,phaseJump:!1,phaseJumpRescueRadius:0,phaseJumpCooldown:20,teleportRange:0,teleportCooldown:30,warpRange:0,warpCooldown:24,rocketBurst:!1,rocketBurstCooldown:18,rocketBurstPower:0,airDashCharges:0,airDashPower:0,momentumRetention:0,infiniteFlaps:!1,momentumGain:0,momentumCap:1,shieldCharges:0,doubleCoin:!1,spikeOrbit:!1,coinMagnet:0,shopDiscount:0,speedBonus:0,coinBonus:0,luck:0,eventLuck:0,autoCannonLevel:0,enemyDamageBonus:0,timeSlowFactor:0,gravityInverter:!1,phantomLanding:!1,chaosWarp:!1,rareItemBias:0,extraCoinSlots:0,momentumRedirect:0}}const jg={common:$("Common","Common"),uncommon:$("Uncommon","Uncommon"),rare:$("Rare","Rare"),epic:$("Epic","Epic"),legendary:$("Legendary","Legendary")},fl=[we({id:"overdrive_core",icon:"OVC",rarity:"common",category:"momentum",unlockScore:0,stackable:!0,maxStacks:5,effects:["momentum_gain"],name:$("Overdrive Core","Overdrive Core"),description:$("Augmente le gain de momentum.","Increase momentum gain.")}),we({id:"gyro_stabilizer",icon:"GYR",rarity:"common",category:"momentum",unlockScore:0,stackable:!0,maxStacks:4,effects:["momentum_decay_down"],name:$("Gyro Stabilizer","Gyro Stabilizer"),description:$("Le momentum retombe moins vite.","Momentum decays more slowly.")}),we({id:"hyper_boost",icon:"HPB",rarity:"uncommon",category:"momentum",unlockScore:0,stackable:!0,maxStacks:3,effects:["speed_bonus","jump_bonus"],name:$("Hyper Boost","Hyper Boost"),description:$("Chaque chaîne réussie pousse plus loin.","Successful chains grant extra speed and jump power.")}),we({id:"kinetic_engine",icon:"KIN",rarity:"uncommon",category:"momentum",unlockScore:0,stackable:!0,maxStacks:3,effects:["landing_tolerance","momentum_gain"],name:$("Kinetic Engine","Kinetic Engine"),description:$("Préserve mieux l’élan à l’atterrissage.","Preserve more speed on landing.")}),we({id:"momentum_capacitor",icon:"CAP",rarity:"rare",category:"momentum",unlockScore:0,stackable:!0,maxStacks:3,effects:["momentum_cap"],name:$("Momentum Capacitor","Momentum Capacitor"),description:$("Augmente la capacité maximale de momentum.","Increase the maximum momentum gauge.")}),we({id:"chain_amplifier",icon:"CHN",rarity:"rare",category:"momentum",unlockScore:0,stackable:!0,maxStacks:3,effects:["momentum_gain","charge_rate"],name:$("Chain Amplifier","Chain Amplifier"),description:$("Les enchaînements remplissent plus fort la jauge.","Chains fill the gauge more efficiently.")}),we({id:"velocity_loop",icon:"VLP",rarity:"common",category:"momentum",unlockScore:0,stackable:!0,maxStacks:4,effects:["speed_bonus"],name:$("Velocity Loop","Velocity Loop"),description:$("Augmente légèrement la vitesse globale.","Light permanent speed increase.")}),we({id:"gravity_skimmer",icon:"GSK",rarity:"uncommon",category:"momentum",unlockScore:0,stackable:!0,maxStacks:3,effects:["glide","momentum_decay_down"],name:$("Gravity Skimmer","Gravity Skimmer"),description:$("Conserve mieux la vitesse après une trajectoire faible.","Retain more speed after awkward landings.")}),we({id:"turbo_reactor",icon:"TRB",rarity:"rare",category:"momentum",unlockScore:0,stackable:!1,maxStacks:1,effects:["rocket_burst"],name:$("Turbo Reactor","Turbo Reactor"),description:$("Déclenche des poussées sur les gros sauts.","Trigger a burst on high-energy launches.")}),we({id:"speed_matrix",icon:"SPD",rarity:"common",category:"momentum",unlockScore:0,stackable:!0,maxStacks:4,effects:["speed_bonus"],name:$("Speed Matrix","Speed Matrix"),description:$("Accélère légèrement le run.","Permanent +10% run speed feel.")}),we({id:"double_jump_module",icon:"DJP",rarity:"uncommon",category:"mobility",unlockScore:0,stackable:!1,maxStacks:1,effects:["extra_jump"],name:$("Double Jump Module","Double Jump Module"),description:$("Ajoute un saut en l’air.","Add one extra jump.")}),we({id:"triple_jump_module",icon:"TJP",rarity:"epic",category:"mobility",unlockScore:50,stackable:!1,maxStacks:1,effects:["extra_jump_2"],name:$("Triple Jump Module","Triple Jump Module"),description:$("Ajoute deux sauts en l’air.","Add two extra jumps.")}),we({id:"air_dash_thrusters",icon:"ADS",rarity:"rare",category:"mobility",unlockScore:0,stackable:!1,maxStacks:1,effects:["air_dash"],name:$("Air Dash Thrusters","Air Dash Thrusters"),description:$("Permet un dash aérien court.","Add one short airborne dash.")}),we({id:"glide_wings",icon:"GLD",rarity:"common",category:"mobility",unlockScore:0,stackable:!0,maxStacks:4,effects:["glide"],name:$("Glide Wings","Glide Wings"),description:$("Réduit la chute en vol.","Reduce fall speed while airborne.")}),we({id:"long_glide_core",icon:"LGC",rarity:"uncommon",category:"mobility",unlockScore:0,stackable:!0,maxStacks:3,effects:["glide"],name:$("Long Glide Core","Long Glide Core"),description:$("Glide beaucoup plus longtemps.","Make gliding significantly stronger.")}),we({id:"magnetic_orbit",icon:"MGO",rarity:"uncommon",category:"mobility",unlockScore:0,stackable:!0,maxStacks:4,effects:["capture_radius"],name:$("Magnetic Orbit","Magnetic Orbit"),description:$("La capture des shards est plus facile.","Increase shard capture radius.")}),we({id:"momentum_redirector",icon:"MRD",rarity:"common",category:"mobility",unlockScore:0,stackable:!0,maxStacks:4,effects:["air_control"],name:$("Momentum Redirector","Momentum Redirector"),description:$("Permet de corriger plus vite les angles.","Improve air control and redirect sharper.")}),we({id:"teleport_pulse",icon:"TLP",rarity:"rare",category:"mobility",unlockScore:0,stackable:!1,maxStacks:1,effects:["teleport"],name:$("Teleport Pulse","Teleport Pulse"),description:$("Téléporte plus loin sur un long cooldown.","Teleport forward every 30 seconds.")}),we({id:"warp_blink",icon:"WRP",rarity:"rare",category:"mobility",unlockScore:0,stackable:!1,maxStacks:1,effects:["warp"],name:$("Warp Blink","Warp Blink"),description:$("Ajoute un blink de secours plus court.","Add a shorter emergency warp.")}),we({id:"anti_gravity_boots",icon:"AGB",rarity:"uncommon",category:"mobility",unlockScore:0,stackable:!0,maxStacks:3,effects:["jump_bonus","glide"],name:$("Anti-Gravity Boots","Anti-Gravity Boots"),description:$("Allège les sauts et adoucit la chute.","Lighten jumps and soften falling.")}),we({id:"auto_cannon",icon:"CAN",rarity:"rare",category:"combat",unlockScore:20,stackable:!1,maxStacks:1,effects:["auto_fire"],name:$("Auto Cannon","Auto Cannon"),description:$("Tire automatiquement sur les ennemis proches.","Auto-fire at nearby enemies.")}),we({id:"laser_turret",icon:"LSR",rarity:"epic",category:"combat",unlockScore:50,stackable:!1,maxStacks:1,effects:["auto_fire_plus"],name:$("Laser Turret","Laser Turret"),description:$("Renforce fortement les tirs automatiques.","Stronger automatic shots.")}),we({id:"shockwave_landing",icon:"SHK",rarity:"rare",category:"combat",unlockScore:20,stackable:!0,maxStacks:2,effects:["landing_burst"],name:$("Shockwave Landing","Shockwave Landing"),description:$("Un atterrissage rapide nettoie les ennemis proches.","Strong landings clear nearby enemies.")}),we({id:"impact_burst",icon:"IMP",rarity:"rare",category:"combat",unlockScore:20,stackable:!0,maxStacks:2,effects:["impact_bonus"],name:$("Impact Burst","Impact Burst"),description:$("Les frappes rapides deviennent létales.","Fast impacts deal lethal damage.")}),we({id:"drone_companion",icon:"DRN",rarity:"epic",category:"combat",unlockScore:50,stackable:!1,maxStacks:1,effects:["auto_fire"],name:$("Drone Companion","Drone Companion"),description:$("Un drone ajoute une pression offensive constante.","A drone adds constant offensive pressure.")}),we({id:"plasma_trail",icon:"PLS",rarity:"rare",category:"combat",unlockScore:20,stackable:!1,maxStacks:1,effects:["trail_damage"],name:$("Plasma Trail","Plasma Trail"),description:$("La traînée du joueur devient offensive.","Your trail damages enemies behind you.")}),we({id:"spike_orbit",icon:"SPK",rarity:"uncommon",category:"combat",unlockScore:20,stackable:!1,maxStacks:1,effects:["orbit_damage"],name:$("Spike Orbit","Spike Orbit"),description:$("Tourner sur une shard devient dangereux pour les ennemis.","Orbiting around shards damages enemies on contact.")}),we({id:"pulse_shield",icon:"SHD",rarity:"rare",category:"combat",unlockScore:20,stackable:!0,maxStacks:2,effects:["shield"],name:$("Pulse Shield","Pulse Shield"),description:$("Bloque un impact mortel.","Blocks one lethal collision.")}),we({id:"emp_pulse",icon:"EMP",rarity:"epic",category:"combat",unlockScore:50,stackable:!1,maxStacks:1,effects:["emp"],name:$("EMP Pulse","EMP Pulse"),description:$("Neutralise brièvement les menaces proches.","Temporarily disable nearby enemies.")}),we({id:"target_lock",icon:"TLK",rarity:"uncommon",category:"combat",unlockScore:20,stackable:!1,maxStacks:1,effects:["auto_fire_accuracy"],name:$("Target Lock","Target Lock"),description:$("Les tirs automatiques ratent moins.","Improve auto-fire accuracy.")}),we({id:"coin_magnet",icon:"CNM",rarity:"common",category:"economy",unlockScore:0,stackable:!0,maxStacks:4,effects:["coin_magnet"],name:$("Coin Magnet","Coin Magnet"),description:$("Attire les pièces plus tôt sur l’orbite.","Pull coins toward the player sooner.")}),we({id:"double_coin",icon:"DBL",rarity:"rare",category:"economy",unlockScore:0,stackable:!1,maxStacks:1,effects:["double_coin"],name:$("Double Coin","Double Coin"),description:$("Double les pièces gagnées.","Double all coin rewards.")}),we({id:"lucky_shard",icon:"LCK",rarity:"uncommon",category:"economy",unlockScore:0,stackable:!0,maxStacks:3,effects:["luck"],name:$("Lucky Shard","Lucky Shard"),description:$("Augmente légèrement la richesse des runs.","Increase general loot luck.")}),we({id:"treasure_scanner",icon:"TRS",rarity:"uncommon",category:"economy",unlockScore:0,stackable:!0,maxStacks:3,effects:["event_luck"],name:$("Treasure Scanner","Treasure Scanner"),description:$("Augmente la fréquence des événements utiles.","Increase valuable event odds.")}),we({id:"market_discount",icon:"MKT",rarity:"uncommon",category:"economy",unlockScore:0,stackable:!0,maxStacks:3,effects:["shop_discount"],name:$("Market Discount","Market Discount"),description:$("Réduit les prix du shop.","Lower shop prices.")}),we({id:"loot_booster",icon:"LBT",rarity:"rare",category:"economy",unlockScore:0,stackable:!0,maxStacks:3,effects:["coin_bonus"],name:$("Loot Booster","Loot Booster"),description:$("Chaque gain donne plus de ressources.","Increase resource payouts.")}),we({id:"golden_orbit",icon:"GLD",rarity:"rare",category:"economy",unlockScore:0,stackable:!0,maxStacks:2,effects:["extra_coin_slots"],name:$("Golden Orbit","Golden Orbit"),description:$("Ajoute plus de pièces sur les trajectoires.","Spawn more coins on orbit paths.")}),we({id:"jackpot_engine",icon:"JPT",rarity:"epic",category:"economy",unlockScore:50,stackable:!1,maxStacks:1,effects:["coin_bonus","luck"],name:$("Jackpot Engine","Jackpot Engine"),description:$("Les gains rares deviennent plus lucratifs.","Rare drops pay out harder.")}),we({id:"rare_item_finder",icon:"RRF",rarity:"epic",category:"economy",unlockScore:50,stackable:!0,maxStacks:2,effects:["rare_item_bias"],name:$("Rare Item Finder","Rare Item Finder"),description:$("Pousse les offres vers de meilleures raretés.","Bias future offers toward higher rarity.")}),we({id:"coin_storm",icon:"CST",rarity:"legendary",category:"economy",unlockScore:100,stackable:!1,maxStacks:1,effects:["coin_bonus","extra_coin_slots"],name:$("Coin Storm","Coin Storm"),description:$("Déverse une pluie de pièces dans le run.","Flood the run with extra coin value.")}),we({id:"chaos_warp",icon:"CHW",rarity:"rare",category:"utility",unlockScore:50,stackable:!1,maxStacks:1,effects:["chaos_warp"],name:$("Chaos Warp","Chaos Warp"),description:$("Ajoute un warp imprévisible mais salvateur.","Add a risky emergency warp.")}),we({id:"shard_splitter",icon:"SPL",rarity:"uncommon",category:"utility",unlockScore:50,stackable:!0,maxStacks:2,effects:["extra_coin_slots","event_luck"],name:$("Shard Splitter","Shard Splitter"),description:$("Multiplie les possibilités sur certaines sections.","Occasionally create richer shard sections.")}),we({id:"phase_walk",icon:"PHS",rarity:"rare",category:"utility",unlockScore:50,stackable:!1,maxStacks:1,effects:["phase_jump"],name:$("Phase Walk","Phase Walk"),description:$("Permet de sauver une capture ratée.","Pass through one missed landing on cooldown.")}),we({id:"time_slow_field",icon:"TSF",rarity:"epic",category:"utility",unlockScore:50,stackable:!1,maxStacks:1,effects:["time_slow"],name:$("Time Slow Field","Time Slow Field"),description:$("Ralentit légèrement la pression globale.","Slightly slow the world around you.")}),we({id:"mirror_momentum",icon:"MMR",rarity:"rare",category:"utility",unlockScore:50,stackable:!0,maxStacks:2,effects:["momentum_gain","momentum_cap"],name:$("Mirror Momentum","Mirror Momentum"),description:$("Amplifie la jauge quand le flow est propre.","Amplify gauge growth during clean flow.")}),we({id:"overclock_core",icon:"OCK",rarity:"epic",category:"utility",unlockScore:50,stackable:!1,maxStacks:1,effects:["charge_rate","speed_bonus"],name:$("Overclock Core","Overclock Core"),description:$("Charge plus vite et accélère tout le run.","Charge faster and push the whole run faster.")}),we({id:"gravity_inverter",icon:"GIV",rarity:"legendary",category:"utility",unlockScore:100,stackable:!1,maxStacks:1,effects:["gravity_invert"],name:$("Gravity Inverter","Gravity Inverter"),description:$("Inverse certains comportements de chute en votre faveur.","Invert some falling pressure in your favor.")}),we({id:"phantom_landing",icon:"PHN",rarity:"rare",category:"utility",unlockScore:50,stackable:!0,maxStacks:2,effects:["phase_jump","landing_tolerance"],name:$("Phantom Landing","Phantom Landing"),description:$("Ajoute une fenêtre fantôme de rattrapage.","Create a ghost landing rescue window.")}),we({id:"energy_shield",icon:"ENG",rarity:"epic",category:"utility",unlockScore:50,stackable:!0,maxStacks:2,effects:["shield"],name:$("Energy Shield","Energy Shield"),description:$("Ajoute plusieurs charges de protection.","Grant multiple protection charges.")}),we({id:"orbital_wings",icon:"WNG",rarity:"legendary",category:"utility",unlockScore:100,stackable:!1,maxStacks:1,effects:["infinite_flap","glide"],name:$("Orbital Wings","Orbital Wings"),description:$("Le vol devient presque libre.","Almost remove airborne limitations.")})],Es={common:56,uncommon:28,rare:11,epic:4,legendary:1};function Yg(s){return s<50?["common","uncommon","rare"]:s<100?["common","uncommon","rare","epic"]:["common","uncommon","rare","epic","legendary"]}function Jg(s){return s<100?100:s<500?500:s<1e3?1e3:Math.floor(s/1e3)*1e3+1e3}function lc(s,e){const t=Jg(s);return e>=t?t:null}function wn(s,e,t=Math.random){const i=new Set(Yg(s)),n=fl.filter(a=>{if(!i.has(a.rarity)||s<a.unlockScore)return!1;const c=e.counts[a.id]??0;return!(!a.stackable&&c>0||a.stackable&&c>=a.maxStacks)}),r=[],o=new Set;for(;r.length<3&&o.size<n.length;){const a=Zg(n,t,o,e.modifiers.rareItemBias);if(!a)break;o.add(a.id),r.push({item:a,stackCount:e.counts[a.id]??0})}return r}function Zg(s,e,t,i){const n=s.filter(a=>!t.has(a.id));if(n.length===0)return null;const r=n.reduce((a,c)=>a+hc(c.rarity,i),0);let o=e()*r;for(const a of n)if(o-=hc(a.rarity,i),o<=0)return a;return n[n.length-1]??null}function hc(s,e){const t=Math.max(0,e);return s==="legendary"?Es[s]*(1+t*4):s==="epic"?Es[s]*(1+t*2.5):s==="rare"?Es[s]*(1+t):Es[s]}function Kg(s,e){const t={...s.counts,[e]:(s.counts[e]??0)+1},i=s.ownedOrder.includes(e)?s.ownedOrder:[...s.ownedOrder,e],n={counts:t,ownedOrder:i,modifiers:dl()};for(const r of fl){const o=t[r.id]??0;if(!(o<=0))switch(r.id){case"overdrive_core":n.modifiers.momentumGain+=.1*o;break;case"gyro_stabilizer":n.modifiers.momentumRetention+=.08*o;break;case"hyper_boost":n.modifiers.speedBonus+=.08*o,n.modifiers.jumpPower+=.06*o;break;case"kinetic_engine":n.modifiers.landingTolerance+=.12*o,n.modifiers.momentumGain+=.05*o;break;case"momentum_capacitor":n.modifiers.momentumCap+=.08*o;break;case"chain_amplifier":n.modifiers.momentumGain+=.06*o,n.modifiers.chargeRate+=.08*o;break;case"velocity_loop":n.modifiers.speedBonus+=.05*o;break;case"gravity_skimmer":n.modifiers.glideFactor+=.16*o,n.modifiers.momentumRetention+=.04*o;break;case"turbo_reactor":n.modifiers.rocketBurst=!0,n.modifiers.rocketBurstPower=5.4,n.modifiers.rocketBurstCooldown=16;break;case"speed_matrix":n.modifiers.speedBonus+=.1*o;break;case"double_jump_module":n.modifiers.extraJumps=Math.max(n.modifiers.extraJumps,1);break;case"triple_jump_module":n.modifiers.extraJumps=Math.max(n.modifiers.extraJumps,2);break;case"air_dash_thrusters":n.modifiers.airDashCharges=Math.max(n.modifiers.airDashCharges,1),n.modifiers.airDashPower=4.8;break;case"glide_wings":n.modifiers.glideFactor+=.2*o;break;case"long_glide_core":n.modifiers.glideFactor+=.34*o;break;case"magnetic_orbit":n.modifiers.captureRadius+=.12*o;break;case"momentum_redirector":n.modifiers.airControl+=.12*o,n.modifiers.momentumRedirect+=.1*o;break;case"teleport_pulse":n.modifiers.teleportRange=10,n.modifiers.teleportCooldown=30;break;case"warp_blink":n.modifiers.warpRange=6,n.modifiers.warpCooldown=20;break;case"anti_gravity_boots":n.modifiers.glideFactor+=.12*o,n.modifiers.jumpPower+=.05*o;break;case"auto_cannon":n.modifiers.autoCannonLevel=Math.max(n.modifiers.autoCannonLevel,1);break;case"laser_turret":n.modifiers.autoCannonLevel=Math.max(n.modifiers.autoCannonLevel,2),n.modifiers.enemyDamageBonus+=1;break;case"shockwave_landing":n.modifiers.enemyDamageBonus+=.5*o;break;case"impact_burst":n.modifiers.enemyDamageBonus+=.6*o;break;case"drone_companion":n.modifiers.autoCannonLevel=Math.max(n.modifiers.autoCannonLevel,1),n.modifiers.enemyDamageBonus+=.4;break;case"plasma_trail":n.modifiers.enemyDamageBonus+=.35;break;case"spike_orbit":n.modifiers.spikeOrbit=!0;break;case"pulse_shield":n.modifiers.shieldCharges+=1;break;case"emp_pulse":n.modifiers.enemyDamageBonus+=.8;break;case"target_lock":n.modifiers.autoCannonLevel=Math.max(n.modifiers.autoCannonLevel,1);break;case"coin_magnet":n.modifiers.coinMagnet+=.18*o;break;case"double_coin":n.modifiers.doubleCoin=!0;break;case"lucky_shard":n.modifiers.luck+=.1*o;break;case"treasure_scanner":n.modifiers.eventLuck+=.1*o;break;case"market_discount":n.modifiers.shopDiscount+=.12*o;break;case"loot_booster":n.modifiers.coinBonus+=.15*o;break;case"golden_orbit":n.modifiers.extraCoinSlots+=o;break;case"jackpot_engine":n.modifiers.coinBonus+=.28,n.modifiers.luck+=.12;break;case"rare_item_finder":n.modifiers.rareItemBias+=.12*o;break;case"coin_storm":n.modifiers.coinBonus+=.35,n.modifiers.extraCoinSlots+=2;break;case"chaos_warp":n.modifiers.chaosWarp=!0,n.modifiers.warpRange=Math.max(n.modifiers.warpRange,12);break;case"shard_splitter":n.modifiers.extraCoinSlots+=o,n.modifiers.eventLuck+=.06*o;break;case"phase_walk":n.modifiers.phaseJump=!0,n.modifiers.phaseJumpRescueRadius=2.8,n.modifiers.phaseJumpCooldown=18;break;case"time_slow_field":n.modifiers.timeSlowFactor+=.12;break;case"mirror_momentum":n.modifiers.momentumGain+=.12*o,n.modifiers.momentumCap+=.06*o;break;case"overclock_core":n.modifiers.chargeRate+=.28,n.modifiers.speedBonus+=.12;break;case"gravity_inverter":n.modifiers.gravityInverter=!0,n.modifiers.glideFactor+=.2;break;case"phantom_landing":n.modifiers.phaseJump=!0,n.modifiers.phaseJumpRescueRadius=2.2,n.modifiers.landingTolerance+=.14*o,n.modifiers.phantomLanding=!0;break;case"energy_shield":n.modifiers.shieldCharges+=2*o;break;case"orbital_wings":n.modifiers.infiniteFlaps=!0,n.modifiers.glideFactor+=.8;break}}return n.modifiers.glideFactor=Math.min(1.9,n.modifiers.glideFactor),n.modifiers.captureRadius=Math.min(1.25,n.modifiers.captureRadius),n.modifiers.airControl=Math.min(.85,n.modifiers.airControl),n.modifiers.jumpPower=Math.min(1.9,n.modifiers.jumpPower),n.modifiers.chargeRate=Math.min(2.4,n.modifiers.chargeRate),n.modifiers.chargedLeapBonus=Math.min(.8,n.modifiers.chargedLeapBonus),n.modifiers.momentumRetention=Math.min(.72,n.modifiers.momentumRetention),n.modifiers.momentumGain=Math.min(1.2,n.modifiers.momentumGain),n.modifiers.momentumCap=Math.min(1.8,n.modifiers.momentumCap),n.modifiers.coinMagnet=Math.min(.9,n.modifiers.coinMagnet),n.modifiers.shopDiscount=Math.min(.45,n.modifiers.shopDiscount),n.modifiers.speedBonus=Math.min(.9,n.modifiers.speedBonus),n.modifiers.coinBonus=Math.min(1.2,n.modifiers.coinBonus),n.modifiers.luck=Math.min(.8,n.modifiers.luck),n.modifiers.eventLuck=Math.min(.6,n.modifiers.eventLuck),n.modifiers.timeSlowFactor=Math.min(.35,n.modifiers.timeSlowFactor),n.modifiers.rareItemBias=Math.min(.5,n.modifiers.rareItemBias),n}class $g{constructor(e,t,i){M(this,"element");M(this,"panel");M(this,"scoreLabel");M(this,"highscoreLabel");M(this,"chargeLabel");M(this,"chainLabel");M(this,"distanceLabel");M(this,"coinsLabel");M(this,"scoreValue");M(this,"highscoreValue");M(this,"chainValue");M(this,"distanceValue");M(this,"coinsValue");M(this,"chargeFill");M(this,"orbitGraceIndicator");M(this,"statusValue");M(this,"metaValue");M(this,"exitButton");M(this,"branchLayer");M(this,"branchTitle");M(this,"branchHint");M(this,"branchCards");M(this,"toast");M(this,"toastLabel");M(this,"toastName");M(this,"gameOverOverlay");M(this,"gameOverTitle");M(this,"gameOverBody");M(this,"restartButton");M(this,"returnButton");this.i18n=t,this.element=document.createElement("div"),this.element.className="game-hud",this.element.innerHTML=`
      <div class="game-hud__panel">
        <div class="game-hud__stats">
          <div><span data-score-label></span><strong data-score>0</strong></div>
          <div><span data-highscore-label></span><strong data-highscore>0</strong></div>
          <div><span data-chain-label></span><strong data-chain>0</strong></div>
          <div><span data-distance-label></span><strong data-distance>0m</strong></div>
          <div><span data-coins-label></span><strong data-coins>0</strong></div>
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
      <div class="game-hud__branch-layer">
        <div class="game-hud__branch-header">
          <h3 data-upgrade-title></h3>
          <p data-upgrade-hint></p>
        </div>
        <div class="game-hud__branch-card" data-branch-card="0"></div>
        <div class="game-hud__branch-card" data-branch-card="1"></div>
        <div class="game-hud__branch-card" data-branch-card="2"></div>
      </div>
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
    `,this.panel=this.element.querySelector(".game-hud__panel"),this.scoreLabel=this.element.querySelector("[data-score-label]"),this.highscoreLabel=this.element.querySelector("[data-highscore-label]"),this.chargeLabel=this.element.querySelector("[data-charge-label]"),this.chainLabel=this.element.querySelector("[data-chain-label]"),this.distanceLabel=this.element.querySelector("[data-distance-label]"),this.coinsLabel=this.element.querySelector("[data-coins-label]"),this.scoreValue=this.element.querySelector("[data-score]"),this.highscoreValue=this.element.querySelector("[data-highscore]"),this.chainValue=this.element.querySelector("[data-chain]"),this.distanceValue=this.element.querySelector("[data-distance]"),this.coinsValue=this.element.querySelector("[data-coins]"),this.chargeFill=this.element.querySelector("[data-charge-fill]"),this.orbitGraceIndicator=this.element.querySelector("[data-orbit-grace]"),this.statusValue=this.element.querySelector(".game-hud__status"),this.metaValue=this.element.querySelector(".game-hud__meta"),this.exitButton=this.element.querySelector("[data-exit]"),this.branchLayer=this.element.querySelector(".game-hud__branch-layer"),this.branchTitle=this.element.querySelector("[data-upgrade-title]"),this.branchHint=this.element.querySelector("[data-upgrade-hint]"),this.branchCards=Array.from(this.element.querySelectorAll("[data-branch-card]")),this.toast=this.element.querySelector(".game-hud__toast"),this.toastLabel=this.element.querySelector("[data-toast-label]"),this.toastName=this.element.querySelector("[data-toast-name]"),this.gameOverOverlay=this.element.querySelector(".game-hud__game-over"),this.gameOverTitle=this.element.querySelector("[data-game-over-title]"),this.gameOverBody=this.element.querySelector("[data-game-over-body]"),this.restartButton=this.element.querySelector("[data-restart]"),this.returnButton=this.element.querySelector("[data-return]"),this.exitButton.addEventListener("click",i.onExit),this.restartButton.addEventListener("click",i.onRestart),this.returnButton.addEventListener("click",i.onExit),e.appendChild(this.element),this.i18n.onChange(()=>this.renderStatic()),this.renderStatic()}setVisible(e){this.element.classList.toggle("is-visible",e)}update(e){this.scoreValue.textContent=String(e.score),this.highscoreValue.textContent=String(e.highscore),this.distanceValue.textContent=`${Math.round(e.distanceMeters)}m`,this.coinsValue.textContent=String(e.coins),this.chainValue.textContent=`${Math.round(e.momentumGauge*100)}%`,this.chainValue.style.opacity=`${.58+e.momentumGauge*.42}`,this.chargeFill.style.setProperty("--charge-ratio",e.chargeRatio.toFixed(3)),this.orbitGraceIndicator.classList.toggle("is-visible",e.orbitGraceActive),this.orbitGraceIndicator.style.setProperty("--orbit-grace-progress",e.orbitGraceProgress.toFixed(3));const t=this.element.querySelector("[data-charge-value]");t&&(t.textContent=`${Math.round(e.chargeRatio*100)}%`),this.statusValue.textContent=e.state==="transition"?this.i18n.t("gameStatusTransition"):e.state==="running"?this.i18n.t("gameStatusRunning"):e.state==="upgrade_choice"?this.i18n.t("gameStatusUpgrade"):this.i18n.t("gameStatusGameOver"),this.metaValue.textContent=this.renderMeta(e);const i=e.branchHints.some(n=>n.mode==="shop_orbit");this.branchTitle.textContent=i?this.i18n.t("gameShopTitle"):this.i18n.t("gameUpgradeTitle"),this.branchHint.textContent=i?this.i18n.t("gameShopHint"):this.i18n.t("gameUpgradeHint"),this.panel.classList.toggle("is-hidden",e.state==="game_over"),this.branchLayer.classList.toggle("is-visible",e.state==="upgrade_choice"),this.gameOverOverlay.classList.toggle("is-visible",e.state==="game_over"),this.toast.classList.toggle("is-visible",!!e.acquisition),e.acquisition&&(this.toast.style.setProperty("--toast-progress",e.acquisition.progress.toFixed(3)),this.toastName.textContent=e.acquisition.offer.item.name[this.i18n.current]),this.renderBranchHints(e.branchHints)}renderStatic(){this.scoreLabel.textContent=this.i18n.t("gameScore"),this.highscoreLabel.textContent=this.i18n.t("gameBest"),this.chargeLabel.textContent=this.i18n.t("gameCharge"),this.chainLabel.textContent=this.i18n.t("gameMomentum"),this.distanceLabel.textContent=this.i18n.t("gameDistance"),this.coinsLabel.textContent=this.i18n.t("gameCoins"),this.exitButton.textContent=this.i18n.t("gamePortfolio"),this.branchTitle.textContent=this.i18n.t("gameUpgradeTitle"),this.branchHint.textContent=this.i18n.t("gameUpgradeHint"),this.toastLabel.textContent=this.i18n.t("gameAcquired"),this.gameOverTitle.textContent=this.i18n.t("gameOverTitle"),this.gameOverBody.textContent=this.i18n.t("gameOverBody"),this.restartButton.textContent=this.i18n.t("gameRestart"),this.returnButton.textContent=this.i18n.t("gamePortfolio")}renderBranchHints(e){this.branchCards.forEach((t,i)=>{const n=e[i];if(!n){t.hidden=!0;return}t.hidden=!1,t.dataset.rarity=n.offer.item.rarity;const r=n.mode==="shop_orbit"?this.i18n.t("gameShopOffer"):i===0?this.i18n.t("gamePathUpper"):i===1?this.i18n.t("gamePathForward"):this.i18n.t("gamePathLower");t.style.transform=`translate(${n.screenX}px, ${n.screenY}px)`,t.innerHTML=`
        <span class="game-hud__upgrade-icon">${n.offer.item.icon}</span>
        <span class="game-hud__upgrade-rarity">${this.getRarityLabel(n.offer.item.rarity)}</span>
        <span class="game-hud__upgrade-path-label">${r}</span>
        <strong class="game-hud__upgrade-path-name">${n.offer.item.name[this.i18n.current]}</strong>
        <span class="game-hud__upgrade-path-desc">${n.offer.item.description[this.i18n.current]}</span>
        ${n.price!==void 0?`<span class="game-hud__upgrade-price">${this.i18n.t("gamePrice")}: ${n.price}</span>`:""}
      `})}renderMeta(e){const t=[100,500,1e3].map(i=>{const n=e.splitTimes[i];return n===void 0?null:`${i}: ${n.toFixed(1)}s`}).filter(Boolean).join(" • ");return t?`${this.i18n.t("gameSplits")}: ${t}`:`${this.i18n.t("gameBestDistance")}: ${Math.round(e.bestDistanceMeters)}m`}getRarityLabel(e){return jg[e][this.i18n.current]}}function Ye(s,e,t){return Math.min(t,Math.max(e,s))}function Me(s,e,t,i){return s+(e-s)*(1-Math.exp(-t*i))}function uc(s,e){const t=s.x-e.x,i=s.y-e.y,n=s.z-e.z;return Math.sqrt(t*t+i*i+n*n)}function Cs(s,e){return(s%e+e)%e}const pl=8.9;function Jr(s){return s/pl}function Ft(s){const e=Ye(s/200,0,1),t=s<50?"easy":s<100?"medium":s<160?"hard":"expert";return{normalized:e,band:t,spacing:pl+e*7.8,movementAmplitude:.08+e*1.05,movementSpeed:.22+e*.88,cameraSpeed:1.65+e*3.55,cameraCatchupSpeed:2.6+e*2.2,maxJumpDistance:17.8+e*9.2,maxVerticalDelta:5.2+e*3.8,safeZoneDistance:8.6+e*1.8,cameraLookAhead:8.6+e*5.2,baseZoom:22.4,largeShardZoom:6.4,milestoneZoom:18,momentumZoomRange:21.5,enemyUnlocked:s>=20,ovalUnlocked:s>=50,triangularUnlocked:s>=100,roundMovementUnlocked:s>=5,eventChance:s<12?0:s<60?.08:s<120?.14:.18,movingShardChance:s<5?0:s<50?.12:s<100?.2:.3}}const Un=class Un{constructor(){M(this,"position",new w);M(this,"lookAt",new w);M(this,"currentFocus",new se);M(this,"targetFocus",new se);M(this,"currentZoom",18.8);M(this,"targetZoom",18.8);M(this,"railX",-12);M(this,"safeLeft",-1/0);M(this,"safeRight",1/0);M(this,"safeTop",1/0);M(this,"safeBottom",-1/0);M(this,"fov",42)}reset(e){this.railX=e.resolvedX-4.4,this.currentFocus.set(e.resolvedX+4.2,e.resolvedY),this.targetFocus.copy(this.currentFocus),this.currentZoom=18.8,this.targetZoom=18.8,this.position.set(this.currentFocus.x-Un.CAMERA_CENTER_OFFSET,e.resolvedY+.18,this.currentZoom),this.lookAt.set(this.currentFocus.x,e.resolvedY,0),this.safeLeft=-1/0,this.safeRight=1/0,this.safeTop=1/0,this.safeBottom=-1/0}update(e){const{deltaTime:t,state:i,score:n,currentNode:r,nextNode:o,playerPosition:a,momentumGauge:c,largeShardFactor:l,milestoneZoom:h,choiceZoom:u,bossZoom:d,speedPressure:p}=e,g=Ft(n),_=i==="running_attached"||i==="running_charging"||i==="running_airborne",m=1+Math.min(.65,n/420);_&&(this.railX+=g.cameraSpeed*p*m*t),this.railX=Math.max(this.railX,a.x-g.cameraLookAhead);const f=this.railX+g.cameraLookAhead,b=r.resolvedY*.64+o.resolvedY*.36,v=Math.pow(c,.85),y=a.y-b,R=qt.clamp(.28+Math.min(.36,Math.abs(y)/12)+v*.18,.28,.64),P=qt.lerp(b,a.y,R);this.targetFocus.set(f,P);const C=a.x>=this.currentFocus.x-.08?Math.max(12,g.cameraCatchupSpeed*4.2):Math.max(4.4,g.cameraCatchupSpeed*1.25),N=Me(this.currentFocus.x,this.targetFocus.x,C,t);this.currentFocus.x=Math.max(this.currentFocus.x,a.x-.08,N),this.currentFocus.y=Me(this.currentFocus.y,this.targetFocus.y,1.95+v*1.7,t);const S=g.momentumZoomRange*Math.pow(c,.82);this.targetZoom=g.baseZoom+S+g.largeShardZoom*l+h+u+d,this.currentZoom=Me(this.currentZoom,this.targetZoom,i==="upgrade_branching"?1.9:2.6,t),this.position.set(this.currentFocus.x-Un.CAMERA_CENTER_OFFSET,this.currentFocus.y+.18,this.currentZoom),this.lookAt.set(this.currentFocus.x,this.currentFocus.y,0);const E=Math.max(.5,window.innerWidth/Math.max(1,window.innerHeight)),U=Math.tan(qt.degToRad(this.fov*.5))*this.currentZoom,B=U*E;this.safeLeft=this.lookAt.x-B*.94,this.safeRight=this.lookAt.x+B*.94,this.safeTop=this.lookAt.y+U*.94,this.safeBottom=this.lookAt.y-U*.94}isBehindSafeLine(e){return e.x<this.safeLeft}isOutsideVerticalBounds(e,t=.02){const n=(this.safeTop-this.safeBottom)*t;return e.y<=this.safeBottom+n||e.y>=this.safeTop-n}getPose(){return{position:this.position.clone(),lookAt:this.lookAt.clone()}}getZoom(){return this.currentZoom}getSafeLeft(){return this.safeLeft}getSafeRight(){return this.safeRight}};M(Un,"CAMERA_CENTER_OFFSET",1.6);let Zr=Un;const dc="#D9624E";class Qg{constructor(e,t){M(this,"group",new kt);M(this,"pool",[]);const i=new Pe(dc);for(let n=0;n<36;n+=1){const r=new vt(new fo(.22,.08,8,18),new ii({color:i,transparent:!0,opacity:.96}));r.visible=!1,this.pool.push(r),this.group.add(r)}this.group.visible=!1,e.add(this.group),this.setTheme(t)}setTheme(e){const t=e==="dark"?new Pe(dc):new Pe("#8B3E34");this.pool.forEach(i=>i.material.color.copy(t))}setVisible(e){this.group.visible=e}reset(){this.pool.forEach(e=>{e.visible=!1})}update(e,t){this.pool.forEach((i,n)=>{const r=e[n];if(!r||!r.visible){i.visible=!1;return}i.visible=!0,i.position.copy(r.position),i.rotation.x=Math.PI*.5,i.rotation.y=t*1.8+n*.24,i.scale.setScalar(r.scale*(1+Math.sin(t*4+n)*.08))})}}function fc(s,e){return e==="invincible"?new Pe("#F06A5A"):e==="elite"?new Pe(s==="dark"?"#E18C70":"#A14D38"):e==="armored"?new Pe(s==="dark"?"#C9775B":"#8E4130"):new Pe(s==="dark"?"#D4BF9B":"#393F4A")}class e_{constructor(e,t){M(this,"group",new kt);M(this,"pool",[]);M(this,"theme");this.theme=t;for(let i=0;i<18;i+=1){const n=new vt(new qs(.38,0),new ii({color:fc(t,"light"),transparent:!0,opacity:.95}));n.visible=!1,this.pool.push(n),this.group.add(n)}this.group.visible=!1,e.add(this.group)}setTheme(e){this.theme=e}setVisible(e){this.group.visible=e}reset(){this.pool.forEach(e=>{e.visible=!1})}update(e,t){this.pool.forEach((i,n)=>{const r=e[n];if(!r||!r.visible){i.visible=!1;return}i.visible=!0,i.material.color.copy(fc(this.theme,r.tier)),i.position.copy(r.position),i.rotation.y=t*.8+n*.18;const o=r.tier==="elite"?1.16:r.tier==="armored"?1.04:r.tier==="invincible"?1.24:.92;i.scale.setScalar(o)})}}const pc=["shop","treasure","gift","mini_boss","rare_item"];class t_{constructor(){M(this,"queuedEvents",new Map);M(this,"bossConsumed",!1)}reset(){this.queuedEvents.clear(),this.bossConsumed=!1}schedulePostMilestoneEvents(e,t,i){const n=Ft(t),r=i()<n.eventChance?i()<.42?2:1:0;for(let o=0;o<r;o+=1){const a=e+10+Math.floor(i()*11)+o*3;if(this.queuedEvents.has(a))continue;const c=pc[Math.floor(i()*pc.length)]??"gift";this.queuedEvents.set(a,c)}}consumePlannedEvent(e,t){if(!this.bossConsumed&&t>=150&&e>=150)return this.bossConsumed=!0,"boss";const i=this.queuedEvents.get(e);return i?(this.queuedEvents.delete(e),i):"none"}}const i_=["shop","treasure","gift","mini_boss","rare_item"],$t=["round","oval","triangular"],Qt=["round","oval","triangular"],ei=["round","oval","triangular"];function Ze(s,e,t,i,n,r,o){return{id:s,difficulty:e,verticality:t,movementType:i,allowedShardSizes:n,allowedShapeKinds:r,eventCompatibility:i_,nodes:o}}const mc=[Ze("easy_01","easy","low","static",["tiny","very_small","small","medium_small"],$t,[{x:10,y:1,coinAngles:[Math.PI*.5]},{x:21,y:-1},{x:33,y:2,enemyPole:"north"},{x:46,y:0,coinAngles:[Math.PI*1.35]}]),Ze("easy_02","easy","medium","static",["tiny","small","medium_small","medium"],$t,[{x:9,y:3},{x:20,y:5,coinAngles:[Math.PI*.25]},{x:33,y:2},{x:47,y:-1,enemyPole:"south"}]),Ze("easy_03","easy","medium","moving",["very_small","small","medium_small"],$t,[{x:11,y:-3,motionPattern:"vertical"},{x:22,y:1},{x:34,y:4,coinAngles:[Math.PI*.75]},{x:47,y:2,motionPattern:"horizontal"}]),Ze("easy_04","easy","low","moving",["tiny","very_small","small"],$t,[{x:8,y:2},{x:18,y:-1,motionPattern:"drift"},{x:30,y:0},{x:43,y:3,coinAngles:[Math.PI*1.75]}]),Ze("easy_05","easy","high","static",["small","medium_small","medium"],$t,[{x:10,y:5},{x:20,y:8},{x:31,y:4,enemyPole:"north"},{x:44,y:1}]),Ze("easy_06","easy","high","moving",["very_small","small","medium_small"],$t,[{x:10,y:-4,motionPattern:"vertical"},{x:21,y:-7,coinAngles:[Math.PI*.9]},{x:33,y:-3,motionPattern:"micro_orbit"},{x:45,y:1}]),Ze("easy_07","easy","medium","static",["small","medium_small","medium"],$t,[{x:11,y:1},{x:23,y:6},{x:36,y:5},{x:50,y:0,coinAngles:[Math.PI*.4],enemyPole:"south"}]),Ze("easy_08","easy","medium","moving",["tiny","very_small","small","medium_small"],$t,[{x:9,y:-2,motionPattern:"horizontal"},{x:19,y:1},{x:31,y:-3,coinAngles:[Math.PI*1.1]},{x:43,y:2,motionPattern:"vertical"}]),Ze("easy_09","easy","low","static",["small","medium_small","medium"],$t,[{x:12,y:0},{x:25,y:2},{x:39,y:-2,enemyPole:"north"},{x:54,y:1}]),Ze("easy_10","easy","medium","moving",["tiny","very_small","small"],$t,[{x:10,y:4,motionPattern:"vertical"},{x:21,y:1},{x:33,y:-2,coinAngles:[Math.PI*.6]},{x:46,y:-5,motionPattern:"drift"}]),Ze("medium_01","medium","medium","moving",["small","medium_small","medium","medium_large"],Qt,[{x:12,y:5,motionPattern:"vertical"},{x:25,y:2,sizeTier:"medium"},{x:39,y:8,coinAngles:[Math.PI*.2],enemyPole:"north"},{x:54,y:4,motionPattern:"horizontal"},{x:69,y:1}]),Ze("medium_02","medium","high","moving",["small","medium_small","medium","medium_large"],Qt,[{x:13,y:-6},{x:27,y:-2,motionPattern:"drift"},{x:40,y:4,sizeTier:"medium_large"},{x:55,y:8,coinAngles:[Math.PI*1.5]},{x:71,y:3,enemyPole:"south"}]),Ze("medium_03","medium","medium","static",["very_small","small","medium_small","medium"],Qt,[{x:11,y:3,sizeTier:"small"},{x:23,y:-1,sizeTier:"medium_small"},{x:36,y:5,sizeTier:"very_large",coinAngles:[Math.PI*.95]},{x:52,y:1,sizeTier:"small"}]),Ze("medium_04","medium","high","moving",["very_small","small","medium_small","medium_large"],Qt,[{x:12,y:7,motionPattern:"vertical"},{x:26,y:2},{x:40,y:-4,motionPattern:"micro_orbit"},{x:54,y:-8,enemyPole:"north"},{x:70,y:-2,coinAngles:[Math.PI*.4]}]),Ze("medium_05","medium","medium","moving",["small","medium_small","medium","large"],Qt,[{x:12,y:1},{x:24,y:6,motionPattern:"horizontal"},{x:39,y:1,sizeTier:"large"},{x:55,y:-3,coinAngles:[Math.PI*1.2]},{x:71,y:2}]),Ze("medium_06","medium","high","moving",["tiny","small","medium_small","medium"],Qt,[{x:10,y:-5,sizeTier:"tiny"},{x:22,y:3,motionPattern:"drift"},{x:36,y:9,sizeTier:"medium_large",coinAngles:[Math.PI*.1]},{x:52,y:5},{x:68,y:-1,enemyPole:"south"}]),Ze("medium_07","medium","medium","static",["small","medium_small","medium","medium_large"],Qt,[{x:13,y:-2},{x:28,y:4,sizeTier:"medium_large"},{x:43,y:7,sizeTier:"medium"},{x:58,y:1,coinAngles:[Math.PI*.65]},{x:74,y:-2}]),Ze("medium_08","medium","high","moving",["small","medium_small","medium","large"],Qt,[{x:12,y:6,motionPattern:"vertical"},{x:26,y:-2},{x:40,y:-8,motionPattern:"horizontal"},{x:56,y:-3,sizeTier:"large",enemyPole:"north"},{x:72,y:4,coinAngles:[Math.PI*1.4]}]),Ze("medium_09","medium","medium","moving",["very_small","small","medium_small","medium"],Qt,[{x:11,y:2,sizeTier:"very_small"},{x:24,y:8,motionPattern:"drift"},{x:40,y:4},{x:56,y:-1,enemyPole:"south"},{x:72,y:3,coinAngles:[Math.PI*.5]}]),Ze("medium_10","medium","high","moving",["small","medium_small","medium","very_large"],Qt,[{x:12,y:-7,motionPattern:"vertical"},{x:27,y:-1,sizeTier:"small"},{x:42,y:6,sizeTier:"very_large"},{x:58,y:9,coinAngles:[Math.PI*.3],enemyPole:"north"},{x:76,y:2}]),Ze("hard_01","hard","high","moving",["small","medium_small","medium","large","very_large"],ei,[{x:14,y:7,motionPattern:"vertical"},{x:31,y:0,sizeTier:"large"},{x:48,y:-8,motionPattern:"micro_orbit",enemyPole:"north"},{x:66,y:-1,coinAngles:[Math.PI*1.5]},{x:86,y:6,sizeTier:"very_large"}]),Ze("hard_02","hard","high","moving",["tiny","small","medium_small","medium","large"],ei,[{x:13,y:-8,sizeTier:"tiny"},{x:30,y:-2,motionPattern:"drift"},{x:47,y:6,sizeTier:"medium_large"},{x:66,y:10,coinAngles:[Math.PI*.95]},{x:86,y:1,enemyPole:"south"}]),Ze("hard_03","hard","medium","moving",["small","medium_small","medium","large","very_large"],ei,[{x:15,y:2,sizeTier:"very_large"},{x:33,y:7,motionPattern:"horizontal"},{x:51,y:1,sizeTier:"small"},{x:70,y:-6,motionPattern:"vertical"},{x:91,y:0,coinAngles:[Math.PI*.2],enemyPole:"north"}]),Ze("hard_04","hard","high","moving",["tiny","small","medium_small","large"],ei,[{x:14,y:9,sizeTier:"tiny"},{x:31,y:2},{x:49,y:-7,motionPattern:"horizontal"},{x:68,y:-10,sizeTier:"large",coinAngles:[Math.PI*1.1]},{x:90,y:-1,enemyPole:"south"}]),Ze("hard_05","hard","high","moving",["small","medium_small","medium","medium_large","huge"],ei,[{x:15,y:-3},{x:32,y:8,sizeTier:"huge"},{x:50,y:2,motionPattern:"micro_orbit"},{x:70,y:-9,sizeTier:"small",enemyPole:"north"},{x:92,y:-4,coinAngles:[Math.PI*.55]}]),Ze("hard_06","hard","medium","moving",["tiny","small","medium_small","medium","large"],ei,[{x:14,y:5,sizeTier:"small"},{x:31,y:-4,motionPattern:"vertical"},{x:49,y:5,sizeTier:"tiny"},{x:69,y:11,motionPattern:"drift",enemyPole:"south"},{x:91,y:4,coinAngles:[Math.PI*.25]}]),Ze("expert_01","expert","high","moving",["tiny","small","medium_small","large","very_large"],ei,[{x:16,y:10,sizeTier:"tiny",motionPattern:"vertical"},{x:36,y:1,sizeTier:"large"},{x:57,y:-10,motionPattern:"micro_orbit",enemyPole:"north"},{x:79,y:0,sizeTier:"very_large"},{x:103,y:9,coinAngles:[Math.PI*1.65]}]),Ze("expert_02","expert","high","moving",["tiny","small","medium_small","medium","huge"],ei,[{x:17,y:-11,sizeTier:"tiny"},{x:37,y:-2,motionPattern:"drift"},{x:59,y:9,sizeTier:"huge"},{x:82,y:12,motionPattern:"horizontal",enemyPole:"south"},{x:107,y:1,coinAngles:[Math.PI*.15]}]),Ze("expert_03","expert","medium","moving",["small","medium_small","medium","large","massive"],ei,[{x:16,y:2,sizeTier:"massive"},{x:38,y:10,motionPattern:"vertical"},{x:61,y:0,sizeTier:"small"},{x:85,y:-10,motionPattern:"drift",enemyPole:"north"},{x:111,y:-1,coinAngles:[Math.PI*1.1]}]),Ze("expert_04","expert","high","moving",["tiny","small","medium","large","very_large"],ei,[{x:15,y:8,motionPattern:"horizontal"},{x:35,y:-7,sizeTier:"tiny"},{x:57,y:11,sizeTier:"large"},{x:81,y:-9,motionPattern:"micro_orbit",enemyPole:"south"},{x:108,y:3,coinAngles:[Math.PI*.35]}])],n_={easy:{easy:70,medium:30,hard:0,expert:0},medium:{easy:40,medium:40,hard:20,expert:0},hard:{easy:0,medium:20,hard:60,expert:20},expert:{easy:0,medium:10,hard:55,expert:35}};function s_(s,e,t){const i=Ft(s),n=n_[i.band],r=new Set(t.slice(-3)),o=mc.filter(h=>!r.has(h.id)&&n[h.difficulty]>0),a=o.length>0?o:mc.filter(h=>n[h.difficulty]>0),c=a.reduce((h,u)=>h+n[u.difficulty],0);let l=e()*c;for(const h of a)if(l-=n[h.difficulty],l<=0)return h;return a[a.length-1]}function Ir(s,e){if(s.length===0)return!1;const t=e.slice(Math.max(0,e.length-8));let i=e[e.length-1]??null;for(const n of s){const r=Ft(n.index);if(i){const o=n.x-i.x,a=n.y-i.y,c=Math.hypot(o,a),l=Ts(i)+Ts(n),h=r_(i,n,o,a,l,r.maxVerticalDelta);if(c<l||c>r.maxJumpDistance||!h&&Math.abs(a)>r.maxVerticalDelta||!h&&n.x<i.x+Math.max(2.8,n.gameplayRadius*.75))return!1}for(const o of t)if(Math.hypot(n.x-o.x,n.y-o.y)<Ts(n)+Ts(o)||Math.abs(n.x-o.x)<Math.max(1.25,(n.gameplayRadius+o.gameplayRadius)*.42)&&Math.abs(n.y-o.y)<Math.max(1.7,(n.gameplayRadius+o.gameplayRadius)*.54))return!1;if(Math.abs(n.y)>28)return!1;t.push(n),t.length>8&&t.shift(),i=n}return!0}function Ts(s){const e=s.gameplayRadius<1.15?.72:s.gameplayRadius<1.9?1.05:1.38;return s.gameplayRadius+s.visualScale*.14+e}function r_(s,e,t,i,n,r){if(s.isGigantic||e.isGigantic||gc(s)||gc(e))return!1;const o=Math.abs(t)<=Math.max(2.1,n*.34),a=Math.abs(i)>=Math.max(4.8,n*1.02),c=Math.abs(i)<=r*2.35,l=t>=.28;return o&&a&&c&&l}function gc(s){return s.sizeTier==="large"||s.sizeTier==="very_large"||s.sizeTier==="huge"||s.sizeTier==="massive"}function o_(s,e,t){return t<=e||!s[t]?!1:t<s.length-4}function a_(s,e){if(s.shapeKind==="round")return 0;const t=s.spinDirection==="cw"?-1:1,i=s.shapeKind==="oval"?.14:.22;return s.motionSeed+e*s.spinSpeed*i*t}function Fs(s,e,t){const i=Ft(Math.max(s.index,t));let n=s.x,r=s.y;if(s.index>t+1&&s.motionPattern!=="none"){const o=e*(.48+i.movementSpeed*.66)+s.motionSeed,a=i.movementAmplitude*(.44+s.visualScale*.08);s.motionPattern==="vertical"?r+=Math.sin(o)*a*.95:s.motionPattern==="horizontal"?(n+=Math.cos(o*.82)*a*.7,r+=Math.sin(o*.54)*a*.2):s.motionPattern==="micro_orbit"?(n+=Math.sin(o*.55)*a*.34,r+=Math.cos(o*.94)*a*.7):s.motionPattern==="drift"&&(n+=Math.cos(o*.42)*a*.46,r+=Math.sin(o*.42)*a*.46)}return{...s,resolvedX:n,resolvedY:r,resolvedZ:s.z,resolvedSpinPhase:a_(s,e)}}const _c={tiny:{radius:[.42,.6],visual:[.34,.54],orbitPeriod:[1.6,2.1]},very_small:{radius:[.6,.86],visual:[.54,.82],orbitPeriod:[2,2.5]},small:{radius:[.86,1.18],visual:[.82,1.18],orbitPeriod:[2.4,2.9]},medium_small:{radius:[1.18,1.58],visual:[1.18,1.72],orbitPeriod:[2.8,3.5]},medium:{radius:[1.58,2.08],visual:[1.72,2.36],orbitPeriod:[3.2,4]},medium_large:{radius:[2.08,2.74],visual:[2.36,3.12],orbitPeriod:[3.8,4.8]},large:{radius:[2.74,3.54],visual:[3.12,4.16],orbitPeriod:[4.4,5.6]},very_large:{radius:[3.54,4.52],visual:[4.16,5.7],orbitPeriod:[5.4,6.8]},huge:{radius:[4.52,5.9],visual:[5.7,7.9],orbitPeriod:[6.8,8.4]},massive:{radius:[5.9,7.4],visual:[7.9,11.2],orbitPeriod:[8.4,9.8]}},c_=["tiny","very_small","small","medium_small","medium","medium_large","large","very_large","huge","massive"];class l_{constructor(){M(this,"nodes",[]);M(this,"eventSystem",new t_);M(this,"seed",1);M(this,"recentPatternIds",[])}reset(){this.seed=Math.random()*2147483647|1,this.recentPatternIds=[],this.eventSystem.reset(),this.nodes=[{index:0,x:-12,y:.8,z:0,gameplayRadius:1.86,visualScale:1.92,pathDistance:0,direction:"right",kind:"normal",sizeTier:"medium",shapeKind:"round",spinDirection:"cw",spinSpeed:.18,motionPattern:"none",eventType:"none",colorHint:"none",gameplayOrbitPeriod:3.6,branchSlot:null,offerId:null,onboarding:!0,isMilestone:!1,isGigantic:!1,coinSlots:[{angle:Math.PI*.4,value:1,collected:!1,orbitScale:1}],enemySlot:null,motionSeed:this.nextRandom()*Math.PI*2,visualStretch:{x:1,y:1,z:1}}]}prebuild(e){this.nodes.length===0&&this.reset(),this.append(Math.max(0,e-this.nodes.length))}ensureAhead(e,t=50,i=30){this.nodes.length-e>t||this.append(i)}queuePostMilestoneEvents(e,t){this.eventSystem.schedulePostMilestoneEvents(e,t,()=>this.nextRandom())}getInitialNodes(e){return this.prebuild(Math.max(180,e+60)),this.nodes.slice(0,e)}getInitialPositions(e){return this.getInitialNodes(e).map(t=>({x:t.x,y:t.y,z:t.z}))}getNode(e){return this.ensureAhead(e+1),this.nodes[e]||null}getWindow(e,t,i,n){return this.ensureAhead(e+t),this.nodes.slice(e,e+t).map(r=>Fs(r,i,n))}getResolvedNode(e,t,i){this.ensureAhead(e+1);const n=this.nodes[e]??this.nodes[this.nodes.length-1];return Fs(n,t,i)}replaceFuture(e,t){const i=this.nodes.slice(0,e+1),n=i[i.length-1]??null,r=[];t.forEach((o,a)=>{r.push(this.reindexNode(o,e+a+1,a===0?n:r[a-1]))}),this.nodes=[...i,...r]}createUpgradeBranches(e,t,i){const n=this.getNode(e);if(!n)return[];const o=Ft(i).spacing*1.18,a=n.x+o*.96,c=[{slot:0,yBias:10.5,direction:"up_right"},{slot:1,yBias:0,direction:"right"},{slot:2,yBias:-10.5,direction:"down_right"}];return t.slice(0,3).map((l,h)=>{const u=c[h]??c[1],d=[];for(let p=0;p<5;p+=1){const g=p/4,_=p===0?n:d[p-1],m=p<2?"large":"medium_large",f=_c[m],b=f.radius[0]+this.nextRandom()*(f.radius[1]-f.radius[0]),v=f.visual[0]+this.nextRandom()*(f.visual[1]-f.visual[0]),y=f.orbitPeriod[0]+this.nextRandom()*(f.orbitPeriod[1]-f.orbitPeriod[0]),R=p===0?a:a+p*o*.98,P=p===0?n.y+u.yBias*.96:n.y+u.yBias*(.42+g*.9)+Math.sin(g*Math.PI)*u.yBias*.1;d.push(this.buildNode({previous:_,index:e+p+1,x:R,y:P,direction:u.direction,sizeTier:m,shapeKind:i>=100?h===1?"triangular":"oval":i>=50?"oval":"round",motionPattern:p===0?"none":p%2===0?"vertical":"horizontal",spinDirection:h===1?"cw":"ccw",spinSpeed:.12+this.nextRandom()*.16,gameplayRadius:b,visualScale:v,gameplayOrbitPeriod:y,visualStretch:h===1?{x:1,y:1.08,z:.84}:{x:1.32,y:.84,z:1},kind:"branch",branchSlot:u.slot,offerId:l.item.id,onboarding:!1,eventType:"none",colorHint:"reward",isMilestone:!1,isGigantic:!1,coinSlots:p===0?[{angle:Math.PI*.5,value:1,collected:!1,orbitScale:1}]:[],enemySlot:null}))}return{mode:"reward_branch",offer:l,entry:d[0],previewNodes:d.slice(0,3),pathNodes:d}})}getTeleportTarget(e,t){this.ensureAhead(e+t+60);const i=Math.min(this.nodes.length-5,e+t);return o_(this.nodes,e,i)?i:-1}sampleAtDistance(e){this.nodes.length===0&&this.prebuild(2);const t=Math.max(0,e);let i=this.nodes[0];for(let a=1;a<this.nodes.length;a+=1){const c=this.nodes[a];if(c.pathDistance>=t){const l=Math.max(1e-4,c.pathDistance-i.pathDistance),h=Ye((t-i.pathDistance)/l,0,1),u=i.x+(c.x-i.x)*h,d=i.y+(c.y-i.y)*h,p=Math.hypot(c.x-i.x,c.y-i.y)||1;return{x:u,y:d,z:0,tangent:{x:(c.x-i.x)/p,y:(c.y-i.y)/p}}}i=c}const n=this.nodes[this.nodes.length-1],r=this.nodes[this.nodes.length-2]??n,o=Math.hypot(n.x-r.x,n.y-r.y)||1;return{x:n.x,y:n.y,z:0,tangent:{x:(n.x-r.x)/o,y:(n.y-r.y)/o}}}append(e){if(e<=0)return;let t=0;for(;t<e;){const i=s_(this.nodes.length,()=>this.nextRandom(),this.recentPatternIds),n=this.instantiatePattern(i);this.nodes.push(...n),this.recentPatternIds.push(i.id),this.recentPatternIds.length>6&&this.recentPatternIds.shift(),t+=n.length}}instantiatePattern(e){const t=this.nodes[this.nodes.length-1],i=t.index,r=Ft(i).spacing/11.5,o=e.nodes.map((l,h)=>{const u=t.index+h+1;return this.buildTemplateNode(t,u,l,e,r,i)}),a=this.isolateMilestones(this.densifyPattern(t,o,i),t,i);let c;return Ir(a,this.nodes)?c=a:Ir(o,this.nodes)?c=o:c=this.buildFallbackPattern(t),this.expandLanePresence(t,c,i)}buildTemplateNode(e,t,i,n,r,o){const a=this.pickShapeKind(n.allowedShapeKinds,o),l=i.sizeTier??this.pickSizeTier(n.allowedShardSizes,o),h=e.x+i.x*r,u=e.y+i.y*r*1.14,d=this.alignToLane(u,o,l,!1),p=Math.hypot(h-e.x,d-e.y),g=Jr(e.pathDistance),_=Jr(e.pathDistance+p),m=lc(g,_)!==null,f=m,b=f?"massive":l,v=_c[b],y=f?11.6+this.nextRandom()*1.8:v.radius[0]+this.nextRandom()*(v.radius[1]-v.radius[0]),R=f?30+this.nextRandom()*10:v.visual[0]+this.nextRandom()*(v.visual[1]-v.visual[0]),P=f?8.8:v.orbitPeriod[0]+this.nextRandom()*(v.orbitPeriod[1]-v.orbitPeriod[0]),C=this.directionFrom(e.x,e.y,h,d),N=this.resolveEventType(t,g,_,o,i),S=f?"none":this.pickMotionPattern(i.motionPattern,o,a),E=this.nextRandom()<.5?"cw":"ccw",U=a==="round"?.08+this.nextRandom()*.12:.06+this.nextRandom()*.18,B=a==="oval"?{x:1.72+this.nextRandom()*.38,y:.68+this.nextRandom()*.12,z:.82+this.nextRandom()*.1}:a==="triangular"?{x:1.18+this.nextRandom()*.18,y:1.24+this.nextRandom()*.16,z:.64+this.nextRandom()*.12}:{x:1,y:1,z:1},Q=m?"milestone":N==="none"?"normal":N==="boss_weak"?"boss_weak":"event",I=m?"accent":N==="boss"||N==="boss_weak"?"danger":N==="none"?"none":"accent",k=m||N!=="none";return this.buildNode({previous:e,index:t,x:h,y:d,direction:C,sizeTier:b,shapeKind:a,motionPattern:S,spinDirection:E,spinSpeed:U,gameplayRadius:y,visualScale:k?R*1.08:R,gameplayOrbitPeriod:P,visualStretch:B,kind:Q,branchSlot:null,offerId:null,onboarding:t<50,eventType:N,colorHint:I,isMilestone:m,isGigantic:f,coinSlots:this.buildCoinSlots(i,N,o),enemySlot:this.buildEnemySlot(i,o,N)})}buildFallbackPattern(e){const t=e.index,i=Ft(t),n=[],r=4;for(let o=0;o<r;o+=1){const a=e.index+o+1,c=o===0?e:n[o-1],l=c.y>9?"down_right":c.y<-9||o%2===0?"up_right":"down_right",h=l==="up_right"?{x:1,y:.66}:l==="down_right"?{x:1,y:-.66}:{x:1,y:0},u=i.spacing*(.68+this.nextRandom()*.16),d=c.x+h.x*u,p=this.alignToLane(c.y+h.y*u*1.08,t,o%2===0?"small":"medium_small",!0);n.push(this.buildNode({previous:c,index:a,x:d,y:p,direction:l,sizeTier:o%2===0?"small":"medium_small",shapeKind:this.pickShapeKind(["round","oval","triangular"],t),motionPattern:i.roundMovementUnlocked?"vertical":"none",spinDirection:"cw",spinSpeed:.12,gameplayRadius:o%2===0?1.12:1.46,visualScale:o%2===0?1.2:1.58,gameplayOrbitPeriod:o%2===0?2.8:3.2,visualStretch:{x:1,y:1,z:1},kind:"normal",branchSlot:null,offerId:null,onboarding:a<50,eventType:"none",colorHint:"none",isMilestone:!1,isGigantic:!1,coinSlots:o===1?[{angle:Math.PI*.6,value:1,collected:!1,orbitScale:1}]:[],enemySlot:null}))}return n}densifyPattern(e,t,i){if(t.length===0)return t;const n=Ft(i),r=[];let o=e,a=0;const c=i>=50&&i%36<12;t.forEach(h=>{const u=h.x-o.x,d=h.y-o.y,p=Math.hypot(u,d),g=Math.abs(d)<n.maxVerticalDelta*.2;a=g?a+1:0;const _=i<50,m=Math.max(h.gameplayRadius,o.gameplayRadius),f=m<1.05?4:m<1.9?2:1;if(i<160&&(p>n.spacing*(_?.82:1.02)||Math.abs(d)>n.maxVerticalDelta*.62||a>=(_?1:2)||c)){const v=_||c||p>n.spacing*1.28||Math.abs(d)>n.maxVerticalDelta*.92?2:1,y=Math.min(f,v+(_&&f>1?1:0));for(let R=0;R<y;R+=1){const P=(R+1)/(y+1),C=(o.index+h.index+R)%2===0?1:-1,N=(y-1)*.5,S=(R-N)*(_?2.45:1.85),E=g?S+C*(_?.85:.55):Math.sign(d||C)*Math.min(_?2.8:2.2,Math.abs(d)*.34)+S*.4,U=r[r.length-1]??o,B=o.x+u*P+(y>=3?(R-N)*.18:0),Q=o.y+d*P+E,I=y>=3||R===0?"tiny":"very_small",k=this.alignToLane(Q,i,I,!0);r.push(this.buildNode({previous:U,index:U.index+1,x:B,y:k,direction:this.directionFrom(U.x,U.y,B,k),sizeTier:I,shapeKind:this.pickShapeKind(["round","oval","triangular"],i),motionPattern:i>=40&&R===y-1?"vertical":"none",spinDirection:this.nextRandom()<.5?"cw":"ccw",spinSpeed:.1+this.nextRandom()*.08,gameplayRadius:I==="tiny"?.78:.96,visualScale:I==="tiny"?.86:1.08,gameplayOrbitPeriod:I==="tiny"?2.4:2.75,visualStretch:{x:1,y:1,z:1},kind:"normal",branchSlot:null,offerId:null,onboarding:h.index<50,eventType:"none",colorHint:"none",isMilestone:!1,isGigantic:!1,coinSlots:[],enemySlot:null}))}}r.push(this.reindexNode(h,(r[r.length-1]??o).index+1,r[r.length-1]??o)),o=r[r.length-1]??o});const l=[];return r.forEach((h,u)=>{l.push(this.reindexNode(h,e.index+u+1,u===0?e:l[u-1]))}),l}expandLanePresence(e,t,i){if(t.length===0)return t;const n=i<50?8.4:7.2,r=[-n,0,n],o=[-n*1.65,-n*.82,0,n*.82,n*1.65],a=[],c=i>=50&&i%42<16;t.forEach(h=>{const u=a[a.length-1]??e,d=this.forceLargeShardCenter(h,i),p=this.reindexNode(d,u.index+1,u);if(a.push(p),p.isMilestone||p.isGigantic||["large","very_large","huge","massive"].includes(p.sizeTier))return;const _=i<50,m=p.sizeTier==="tiny"||p.sizeTier==="very_small"||p.sizeTier==="small"||p.sizeTier==="medium_small",f=_&&m;if(!(f||c||this.nextRandom()<.42))return;const v=(p.sizeTier==="tiny"||p.sizeTier==="very_small"||p.sizeTier==="small")&&f||c&&this.nextRandom()<.36,y=v?o:r,R=v?2:1,P=this.getLaneIndex(p.y,n,v),C=this.buildCompanionLaneOrder(P,y.length),N=p.sizeTier==="tiny"||p.sizeTier==="very_small"||p.sizeTier==="small"?v?4:_?2:1:p.sizeTier==="medium_small"||p.sizeTier==="medium"?v?3:_?2:1:0;for(let S=0;S<N;S+=1){const E=C[S];if(E===void 0)break;const U=a[a.length-1]??e,B=this.pickCompanionSizeTier(p.sizeTier),Q=(S-(N-1)*.5)*(v?.12:.18),I=p.x+.5+Q+(this.nextRandom()-.5)*(f?.16:.12),k=y[E]+(this.nextRandom()-.5)*(B==="tiny"?.82:B==="very_small"?.64:.5),V=E!==R&&this.nextRandom()<.34,Y=this.buildNode({previous:U,index:U.index+1,x:I,y:k,direction:this.directionFrom(U.x,U.y,I,k),sizeTier:B,shapeKind:this.pickShapeKind(["round","oval","triangular"],i),motionPattern:_?"none":this.nextRandom()<.16?"vertical":"none",spinDirection:this.nextRandom()<.5?"cw":"ccw",spinSpeed:.1+this.nextRandom()*.08,gameplayRadius:B==="tiny"?.78:B==="very_small"?.9:1.06,visualScale:B==="tiny"?.88:B==="very_small"?1.02:1.16,gameplayOrbitPeriod:B==="tiny"?2.36:B==="very_small"?2.58:2.9,visualStretch:{x:1,y:1,z:1},kind:"normal",branchSlot:null,offerId:null,onboarding:U.index<50,eventType:"none",colorHint:"none",isMilestone:!1,isGigantic:!1,coinSlots:V?[{angle:Math.PI*(.35+this.nextRandom()*1.2),value:1,collected:!1,orbitScale:1}]:[],enemySlot:null});Ir([Y],[...this.nodes,...a])&&a.push(Y)}});const l=[];return a.forEach((h,u)=>{l.push(this.reindexNode(h,e.index+u+1,u===0?e:l[u-1]))}),l}buildNode(e){const t=e.previous,i=t?Math.hypot(e.x-t.x,e.y-t.y):0;return{index:e.index,x:e.x,y:e.y,z:0,gameplayRadius:e.gameplayRadius,visualScale:e.visualScale,pathDistance:t?t.pathDistance+i:0,direction:e.direction,kind:e.kind,sizeTier:e.sizeTier,shapeKind:e.shapeKind,spinDirection:e.spinDirection,spinSpeed:e.spinSpeed,motionPattern:e.motionPattern,eventType:e.eventType,colorHint:e.colorHint,gameplayOrbitPeriod:e.gameplayOrbitPeriod,branchSlot:e.branchSlot,offerId:e.offerId,onboarding:e.onboarding,isMilestone:e.isMilestone,isGigantic:e.isGigantic,coinSlots:e.coinSlots,enemySlot:e.enemySlot,motionSeed:this.nextRandom()*Math.PI*2,visualStretch:e.visualStretch}}alignToLane(e,t,i,n){const r=t<50?8.4:7.2,o=[-r,0,r],a=i==="massive"||i==="huge"||i==="very_large",c=i==="medium"||i==="medium_large"||i==="large";if(a)return qt.clamp(e*.35,-r,r);const l=e>r*.35?2:e<-r*.35?0:1;let h=l;n&&!c&&this.nextRandom()<.42?h=[0,1,2][Math.floor(this.nextRandom()*3)]??l:n&&c&&this.nextRandom()<.2&&(h=l===1?this.nextRandom()<.5?0:2:l);const u=a?.32:c?.44:.58;return o[h]+(this.nextRandom()-.5)*u}getLaneIndex(e,t,i=!1){return i?e>t*1.24?4:e>t*.38?3:e<-t*1.24?0:e<-t*.38?1:2:e>t*.42?2:e<-t*.42?0:1}buildCompanionLaneOrder(e,t){const i=[];for(let n=1;n<t;n+=1){const r=e-n,o=e+n;o<t&&i.push(o),r>=0&&i.push(r)}return i}pickCompanionSizeTier(e){switch(e){case"tiny":case"very_small":return"tiny";case"small":case"medium_small":return this.nextRandom()<.5?"tiny":"very_small";case"medium":return this.nextRandom()<.5?"very_small":"small";default:return"small"}}forceLargeShardCenter(e,t){if(!["large","very_large","huge","massive"].includes(e.sizeTier)||e.isMilestone||e.isGigantic)return e;const i=this.alignToLane(0,t,e.sizeTier,!1);return{...e,y:i}}reindexNode(e,t,i){return this.buildNode({previous:i,index:t,x:e.x,y:e.y,direction:e.direction,sizeTier:e.sizeTier,shapeKind:e.shapeKind,motionPattern:e.motionPattern,spinDirection:e.spinDirection,spinSpeed:e.spinSpeed,gameplayRadius:e.gameplayRadius,visualScale:e.visualScale,gameplayOrbitPeriod:e.gameplayOrbitPeriod,visualStretch:e.visualStretch,kind:e.kind,branchSlot:e.branchSlot,offerId:e.offerId,onboarding:!1,eventType:e.eventType,colorHint:e.colorHint,isMilestone:e.isMilestone,isGigantic:e.isGigantic,coinSlots:e.coinSlots.map(n=>({...n})),enemySlot:e.enemySlot?{...e.enemySlot}:null})}buildCoinSlots(e,t,i){var r;const n=((r=e.coinAngles)==null?void 0:r.map(o=>({angle:o,value:t==="treasure"?3:1,collected:!1,orbitScale:1})))??[];return n.length===0&&i<12&&n.push({angle:Math.PI*(.2+this.nextRandom()*1.6),value:1,collected:!1,orbitScale:1}),n}buildEnemySlot(e,t,i){if(!Ft(t).enemyUnlocked||i==="shop"||i==="gift")return null;const r=e.enemyPole??(this.nextRandom()<.24?this.nextRandom()<.5?"north":"south":null);if(!r)return null;const o=t<60?"light":t<120?this.nextRandom()<.7?"armored":"light":this.nextRandom()<.18?"invincible":this.nextRandom()<.55?"elite":"armored",a=o==="light"?4.6:o==="armored"?6.4:o==="elite"?8.1:Number.POSITIVE_INFINITY;return{pole:r,tier:o,alive:!0,rewardCoins:o==="elite"?10:o==="armored"?8+Math.floor(this.nextRandom()*2):o==="light"?5+Math.floor(this.nextRandom()*4):0,speedThreshold:a}}pickSizeTier(e,t){const i=Ft(t),n=c_.filter(a=>e.includes(a)),r=Ye(Math.floor(i.normalized*(n.length-1)+4),0,n.length-1),o=n.slice(0,r+1);return o[Math.floor(this.nextRandom()*o.length)]??"medium"}pickShapeKind(e,t){const i=Ye(t/220,0,1),n={round:.9-i*.22,oval:.08+i*.16,triangular:.02+i*.08},r=e.length>0?e:["round"],o=r.reduce((c,l)=>c+(n[l]??0),0);let a=this.nextRandom()*o;for(const c of r)if(a-=n[c]??0,a<=0)return c;return r[0]??"round"}isolateMilestones(e,t,i){if(!e.some(a=>a.isMilestone))return e;const n=Ft(i),r=[];e.forEach((a,c)=>{let l={...a};l.isMilestone&&(l={...l,x:Math.max(l.x,(r[c-1]??t).x+n.spacing*1.9),y:0});const h=r[c-1]??t;h.isMilestone&&(l={...l,x:Math.max(l.x,h.x+n.spacing*1.7)}),r.push(l)});const o=[];return r.forEach((a,c)=>{o.push(this.reindexNode(a,t.index+c+1,c===0?t:o[c-1]))}),o}pickMotionPattern(e,t,i){const n=Ft(t);if(i==="round"&&!n.roundMovementUnlocked)return"none";if(e&&e!=="none"&&this.nextRandom()<n.movingShardChance+.25)return e;if(this.nextRandom()>n.movingShardChance)return"none";const r=["vertical","horizontal","micro_orbit","drift"];return r[Math.floor(this.nextRandom()*r.length)]??"none"}resolveEventType(e,t,i,n,r){return lc(t,i)!==null?"none":r.sizeTier==="massive"&&n>=150?"boss_weak":this.eventSystem.consumePlannedEvent(e,n)}directionFrom(e,t,i,n){const r=i-e,o=n-t;return Math.abs(o)<1.5?"right":o>0?r<0?"up_left":Math.abs(r)<1.2?"up":"up_right":r<0?"down_left":"down_right"}nextRandom(){return this.seed=this.seed*48271%2147483647,this.seed/2147483647}}const vc="portfolio-game-highscore",xc="portfolio-game-best-distance",yc="portfolio-game-best-splits";class h_{constructor(){M(this,"shardsLanded",0);M(this,"distanceMeters",0);M(this,"coins",0);M(this,"runStartTime",0);M(this,"splitTimes",{});M(this,"bestShards",Number(window.localStorage.getItem(vc)||0));M(this,"bestDistanceMeters",Number(window.localStorage.getItem(xc)||0));M(this,"bestSplitTimes",this.readSplits())}reset(e=performance.now()){this.shardsLanded=0,this.distanceMeters=0,this.coins=0,this.runStartTime=e,this.splitTimes={}}recordLanding(e,t,i){const n=this.distanceMeters;this.shardsLanded=Math.max(this.shardsLanded,e),this.distanceMeters=Math.max(this.distanceMeters,Jr(t));for(const r of[100,500,1e3]){if(n>=r||this.distanceMeters<r||this.splitTimes[r]!==void 0)continue;const o=Math.max(0,i-this.runStartTime)/1e3;this.splitTimes[r]=o;const a=this.bestSplitTimes[r];(a===void 0||o<a)&&(this.bestSplitTimes[r]=o,this.persist())}this.shardsLanded>this.bestShards&&(this.bestShards=this.shardsLanded,this.persist()),this.distanceMeters>this.bestDistanceMeters&&(this.bestDistanceMeters=this.distanceMeters,this.persist())}addCoins(e){this.coins+=e}canAfford(e){return this.coins>=e}spendCoins(e){return this.coins<e?!1:(this.coins-=e,!0)}getSnapshot(){return{shardsLanded:this.shardsLanded,bestShards:this.bestShards,distanceMeters:this.distanceMeters,bestDistanceMeters:this.bestDistanceMeters,coins:this.coins,splitTimes:{...this.splitTimes},bestSplitTimes:{...this.bestSplitTimes}}}fillHud(e){e.score=this.shardsLanded,e.highscore=this.bestShards,e.distanceMeters=this.distanceMeters,e.bestDistanceMeters=this.bestDistanceMeters,e.coins=this.coins,e.splitTimes={...this.splitTimes}}readSplits(){const e=window.localStorage.getItem(yc);if(!e)return{};try{return JSON.parse(e)}catch{return{}}}persist(){window.localStorage.setItem(vc,String(this.bestShards)),window.localStorage.setItem(xc,String(this.bestDistanceMeters)),window.localStorage.setItem(yc,JSON.stringify(this.bestSplitTimes))}}const Sc="#D9624E";class u_{constructor(e,t){M(this,"group",new kt);M(this,"pool",[]);M(this,"activeOffers",[]);M(this,"open",!1);const i=new Pe(t==="dark"?Sc:"#8E4130");for(let n=0;n<3;n+=1){const r=new vt(new qn(.34,0),new ii({color:i,transparent:!0,opacity:.94}));r.visible=!1,this.pool.push(r),this.group.add(r)}this.group.visible=!1,e.add(this.group)}setTheme(e){const t=new Pe(e==="dark"?Sc:"#8E4130");this.pool.forEach(i=>i.material.color.copy(t))}reset(){this.open=!1,this.activeOffers=[],this.group.visible=!1,this.pool.forEach(e=>{e.visible=!1})}openForRun(e,t){const i=Math.max(0,Math.min(.45,t.modifiers.shopDiscount)),n=wn(e,t);return this.activeOffers=n.slice(0,3).map((r,o)=>({angle:Math.PI*(.2+o*.55),price:this.getPriceForOffer(r,i),purchased:!1,offer:r})),this.open=this.activeOffers.length>0,this.group.visible=this.open,n}isOpen(){return this.open}getActiveOffers(){return this.activeOffers.map(e=>({offer:e.offer,price:e.price,angle:e.angle,purchased:e.purchased}))}getHints(e){return this.activeOffers.map((t,i)=>{var n,r,o;return{mode:"shop_orbit",offer:t.offer,price:t.price,entry:{index:i,x:((n=e[i])==null?void 0:n.x)??0,y:((r=e[i])==null?void 0:r.y)??0,z:((o=e[i])==null?void 0:o.z)??0,gameplayRadius:.5,visualScale:.5,pathDistance:0,direction:"right",kind:"event",sizeTier:"tiny",shapeKind:"round",spinDirection:"cw",spinSpeed:0,motionPattern:"none",eventType:"shop",colorHint:"accent",gameplayOrbitPeriod:1,branchSlot:i,offerId:t.offer.item.id,onboarding:!1,isMilestone:!1,isGigantic:!1,coinSlots:[],enemySlot:null,motionSeed:0,visualStretch:{x:1,y:1,z:1}},previewNodes:[],pathNodes:[]}})}tryPurchase(e,t){if(!this.open)return null;for(const i of this.activeOffers){if(i.purchased)continue;if(d_(e,i.angle)<.22&&t>=i.price)return i.purchased=!0,this.close(),{offer:i.offer,price:i.price}}return null}update(e,t,i){if(!this.open){this.group.visible=!1;return}this.group.visible=!0,this.pool.forEach((n,r)=>{const o=this.activeOffers[r];if(!o||o.purchased){n.visible=!1;return}n.visible=!0,n.position.set(e.x+Math.cos(o.angle)*(t+1.6),e.y+Math.sin(o.angle)*(t+1.6),0),n.rotation.y=i*1.4+r*.35,n.scale.setScalar(1+Math.sin(i*3+r)*.06)})}close(){this.open=!1,this.group.visible=!1,this.pool.forEach(e=>{e.visible=!1})}getPriceForOffer(e,t){const i=e.item.rarity==="legendary"?11:e.item.rarity==="epic"?8:e.item.rarity==="rare"?5:e.item.rarity==="uncommon"?3:2;return Math.max(1,Math.round((i+e.stackCount)*(1-t)))}}function d_(s,e){return Math.abs(((s-e)%(Math.PI*2)+Math.PI*3)%(Math.PI*2)-Math.PI)}const As="#D9624E";class f_{constructor(e,t){M(this,"group",new kt);M(this,"bossMesh");M(this,"weakPointMesh");M(this,"phase","idle");M(this,"phaseEndsAt",0);M(this,"active",!1);M(this,"defeated",!1);M(this,"weakPointVisible",!1);M(this,"weakPointPosition",new w);this.bossMesh=new vt(new qn(2.8,1),new ii({color:t==="dark"?As:"#8E4130",transparent:!0,opacity:.9})),this.weakPointMesh=new vt(new qs(.78,0),new ii({color:As,transparent:!0,opacity:.96})),this.bossMesh.visible=!1,this.weakPointMesh.visible=!1,this.group.add(this.bossMesh,this.weakPointMesh),e.add(this.group)}setTheme(e){this.bossMesh.material.color.set(e==="dark"?As:"#8E4130"),this.weakPointMesh.material.color.set(As)}reset(){this.active=!1,this.defeated=!1,this.phase="idle",this.phaseEndsAt=0,this.weakPointVisible=!1,this.bossMesh.visible=!1,this.weakPointMesh.visible=!1}start(e){this.active=!0,this.defeated=!1,this.phase="chase",this.phaseEndsAt=e+6,this.bossMesh.visible=!0}isActive(){return this.active&&!this.defeated}isWeakPointPhase(){return this.phase==="weak_point"}getSpeedPressure(){return this.phase==="chaos"?1.24:this.phase==="chase"?1.12:1}getCameraZoomOffset(){return this.active?this.phase==="weak_point"?9.5:this.phase==="chaos"?5.6:3.2:0}update(e,t,i){return!this.active||this.defeated?(this.bossMesh.visible=!1,this.weakPointMesh.visible=!1,{playerHit:!1}):(t>=this.phaseEndsAt&&(this.phase==="chase"?(this.phase="chaos",this.phaseEndsAt=t+8):this.phase==="chaos"&&(this.phase="weak_point",this.phaseEndsAt=t+10,this.weakPointVisible=!0)),this.bossMesh.visible=!0,this.bossMesh.position.set(i.x-(this.phase==="weak_point"?10.5:8.6),i.y+Math.sin(t*1.2)*2.4,0),this.bossMesh.rotation.y+=e*.32,this.bossMesh.rotation.z+=e*.18,this.bossMesh.scale.setScalar(this.phase==="chaos"?1.2:1),this.weakPointMesh.visible=this.weakPointVisible,this.weakPointVisible&&(this.weakPointMesh.position.copy(this.weakPointPosition),this.weakPointMesh.rotation.y+=e*1.8,this.weakPointMesh.scale.setScalar(1+Math.sin(t*6)*.08)),{playerHit:this.phase!=="weak_point"&&this.bossMesh.position.distanceTo(i)<2.2})}setWeakPoint(e){this.weakPointPosition.copy(e),this.weakPointVisible=this.phase==="weak_point"}defeat(){this.defeated=!0,this.active=!1,this.phase="defeated",this.weakPointVisible=!1,this.bossMesh.visible=!1,this.weakPointMesh.visible=!1}}const p_="#D9624E",m_="#F06A5A";function hi(s){const e=Math.PI*2;return(s%e+e)%e}function ws(s,e){const t=Math.PI*2;return((s-e+Math.PI)%t+t)%t-Math.PI}class g_{constructor(e,t){M(this,"root",new kt);M(this,"player",new kt);M(this,"playerBody");M(this,"playerTrail",new Hr);M(this,"trailPoints",Array.from({length:8},()=>new w));M(this,"trailBuffer",new Float32Array(this.trailPoints.length*3));M(this,"path",new l_);M(this,"camera",new Zr);M(this,"stats",new h_);M(this,"coins");M(this,"enemies");M(this,"shop");M(this,"boss");M(this,"scoreListeners",new Set);M(this,"playerPosition",new w);M(this,"playerVelocity",new w);M(this,"playerVelocityTarget",new w);M(this,"scratchVector",new w);M(this,"scratchVectorB",new w);M(this,"scratchVector2",new se);M(this,"impactWaves",new Map);M(this,"hudSnapshot",{state:"transition",score:0,highscore:0,distanceMeters:0,bestDistanceMeters:0,coins:0,splitTimes:{},chargeRatio:0,momentumGauge:0,momentumTier:0,orbitGraceActive:!1,orbitGraceProgress:1,offers:[],branchHints:[],acquisition:null});M(this,"momentum",{gauge:0,fillRate:0,decayRate:.12,speedMultiplier:1,jumpMultiplier:1,cameraZoomMultiplier:0});M(this,"state","idle");M(this,"playerState","attached");M(this,"currentTime",0);M(this,"attachedIndex",0);M(this,"displayWindowIndices",[]);M(this,"displayNextIndex",0);M(this,"score",0);M(this,"orbitGraceActive",!1);M(this,"orbitGraceProgress",1);M(this,"orbitGraceTravel",0);M(this,"chargeActive",!1);M(this,"chargeMeter",0);M(this,"orbitAngle",Math.PI*.18);M(this,"orbitDirection",-1);M(this,"angularSpeed",0);M(this,"lastLandingDirection",0);M(this,"choiceMode","none");M(this,"activeChoices",[]);M(this,"activeShopAngles",[]);M(this,"acquisition",null);M(this,"acquisitionStartedAt",0);M(this,"acquisitionDuration",.9);M(this,"gameOverStartedAt",0);M(this,"runUpgrades",cc());M(this,"currentTheme");M(this,"remainingExtraJumps",0);M(this,"phaseJumpReadyAt",0);M(this,"teleportReadyAt",0);M(this,"warpReadyAt",0);M(this,"shieldCharges",0);M(this,"eventCooldownUntil",0);M(this,"autoFireReadyAt",0);M(this,"milestoneChoiceCache",new Map);this.currentTheme=t,this.playerBody=new vt(new co(.42,1.18,6),new ii({color:t==="dark"?"#D4BF9B":"#393F4A"})),this.playerBody.rotation.z=-Math.PI/2,this.player.add(this.playerBody),this.player.visible=!1,this.root.add(this.player);const i=new yt;i.setAttribute("position",new Rt(this.trailBuffer,3)),this.playerTrail=new Hr(i,new so({color:t==="dark"?"#D4BF9B":"#393F4A",transparent:!0,opacity:.42})),this.playerTrail.visible=!1,this.root.add(this.playerTrail),e.add(this.root),this.coins=new Qg(e,t),this.enemies=new e_(e,t),this.shop=new u_(e,t),this.boss=new f_(e,t)}get currentState(){return this.state}get currentScore(){return this.score}get bestScore(){return this.stats.getSnapshot().bestShards}setTheme(e){this.currentTheme=e,this.playerBody.material.color.set(e==="dark"?"#D4BF9B":"#393F4A"),this.playerTrail.material.color.set(e==="dark"?"#D4BF9B":"#393F4A"),this.coins.setTheme(e),this.enemies.setTheme(e),this.shop.setTheme(e),this.boss.setTheme(e)}onScoreChange(e){return this.scoreListeners.add(e),()=>this.scoreListeners.delete(e)}startTransition(){this.resetRunState(),this.path.reset(),this.path.prebuild(180),this.camera.reset(this.getResolvedNode(0)),this.state="transition_in",this.root.visible=!0,this.player.visible=!1,this.playerTrail.visible=!1}beginRun(){const e=this.state==="transition_in";this.resetRunState(),e||(this.path.reset(),this.path.prebuild(180)),this.root.visible=!0,this.player.visible=!0,this.playerTrail.visible=!0,this.attachToNode(0,!1,null,null),this.camera.reset(this.getResolvedNode(0)),this.state="running_attached",this.emitScore()}restart(){this.beginRun()}prepareReturnTransition(){this.state="transition_out",this.chargeActive=!1,this.choiceMode="none",this.activeChoices=[],this.shop.reset(),this.boss.reset(),this.coins.reset(),this.enemies.reset(),this.player.visible=!1,this.playerTrail.visible=!1}stop(){this.state="idle",this.root.visible=!1,this.player.visible=!1,this.playerTrail.visible=!1,this.shop.reset(),this.boss.reset(),this.coins.reset(),this.enemies.reset(),this.camera.reset(this.getResolvedNode(0))}resetRunState(){this.stats.reset(performance.now()),this.score=0,this.chargeActive=!1,this.chargeMeter=0,this.choiceMode="none",this.activeChoices=[],this.activeShopAngles=[],this.acquisition=null,this.acquisitionStartedAt=0,this.gameOverStartedAt=0,this.currentTime=0,this.attachedIndex=0,this.displayWindowIndices=[],this.displayNextIndex=0,this.orbitGraceActive=!1,this.orbitGraceProgress=1,this.orbitGraceTravel=0,this.lastLandingDirection=0,this.playerState="attached",this.orbitAngle=Math.PI*.18,this.orbitDirection=-1,this.angularSpeed=0,this.playerPosition.set(0,0,0),this.playerVelocity.set(0,0,0),this.playerVelocityTarget.set(0,0,0),this.runUpgrades=cc(),this.remainingExtraJumps=0,this.phaseJumpReadyAt=0,this.teleportReadyAt=0,this.warpReadyAt=0,this.shieldCharges=0,this.eventCooldownUntil=0,this.autoFireReadyAt=0,this.milestoneChoiceCache.clear(),this.momentum.gauge=0,this.momentum.fillRate=0,this.momentum.decayRate=.12,this.momentum.speedMultiplier=1,this.momentum.jumpMultiplier=1,this.momentum.cameraZoomMultiplier=0,this.impactWaves.clear(),this.playerTrail.geometry.setDrawRange(0,this.trailPoints.length),this.trailPoints.forEach(e=>e.set(0,0,0)),this.playerBody.scale.setScalar(1),this.coins.reset(),this.enemies.reset(),this.shop.reset(),this.boss.reset()}getInitialPlatformPositions(e){return this.path.prebuild(Math.max(160,e+60)),this.path.getInitialNodes(e).map(t=>new w(t.x,t.y,t.z))}getInitialPlatformScales(e){return this.path.prebuild(Math.max(160,e+60)),this.path.getInitialNodes(e).map(t=>t.visualScale)}getInitialPlatformVisuals(e){return this.path.prebuild(Math.max(160,e+60)),this.initializeDisplayWindow(e),this.getVisiblePlatformVisuals(e)}getVisiblePlatformPositions(e){return this.getDisplayNodes(e).map(t=>new w(t.resolvedX,t.resolvedY,t.resolvedZ))}getVisiblePlatformScales(e){return this.getDisplayNodes(e).map(t=>t.visualScale)}getVisiblePlatformVisuals(e){return this.getDisplayNodes(e).map(t=>{const i=t.index===this.attachedIndex&&this.playerState!=="airborne",n=hi(this.orbitAngle-(t.shapeKind==="round"?0:t.resolvedSpinPhase)),r=i&&this.orbitGraceActive?this.orbitGraceProgress:1,o=this.getVisualWaveState(t),a=this.camera.getSafeLeft(),c=t.resolvedX+this.getPhysicalRadius(t),l=Ye(1-(c-a)/5.6,0,1),h=t.shapeKind==="round"?.018:t.shapeKind==="oval"?.038:.048,u=t.shapeKind==="round"?.52:t.shapeKind==="oval"?.68:.78,d=u+.42+this.momentum.gauge*.34,p=i?qt.lerp(u,d,r):Math.max(u,(o==null?void 0:o.density)??u),g=h+.18+r*.12+this.momentum.gauge*.46;return{scale:new w(t.visualScale*t.visualStretch.x,t.visualScale*t.visualStretch.y,t.visualScale*t.visualStretch.z),shapeKind:t.shapeKind,spinDirection:t.spinDirection,spinSpeed:t.spinSpeed,spinPhase:t.resolvedSpinPhase,tint:t.colorHint==="danger"?m_:t.colorHint==="reward"?this.currentTheme==="dark"?"#393F4A":"#D4BF9B":t.colorHint==="accent"?p_:null,pulse:t.isMilestone||t.eventType!=="none"?.34:Ye(this.momentum.gauge*.22,0,.22),deformAngle:i?n:(o==null?void 0:o.angle)??0,deformStrength:i?g:Math.max(h,(o==null?void 0:o.strength)??0)+l*.16,deformDensity:p,fragmentAmount:l}})}getRecommendedVisibleCount(){const e=this.state==="transition_in"?72:64,t=Math.round(this.momentum.cameraZoomMultiplier*18),i=this.choiceMode==="reward_branch"?12:this.choiceMode==="shop_orbit"?8:0,n=this.path.getNode(this.attachedIndex),r=this.path.getNode(this.attachedIndex+1),o=n!=null&&n.isGigantic||r!=null&&r.isGigantic?18:(n==null?void 0:n.eventType)!=="none"||(r==null?void 0:r.eventType)!=="none"?10:0;return Math.max(56,Math.min(124,e+t+i+o))}setChargeActive(e){if(this.state==="idle"||this.state==="transition_in"||this.state==="transition_out"||this.state==="game_over")return!1;if(e)return this.chargeActive=!0,this.playerState==="attached"&&(this.playerState="charging",this.state==="running_attached"&&(this.state="running_charging")),!1;const t=this.chargeActive&&(this.playerState==="charging"||this.playerState==="attached")&&(this.state==="running_charging"||this.state==="running_attached"||this.state==="upgrade_branching");return this.chargeActive=!1,t?this.launch():!1}triggerJump(){return this.state==="idle"||this.state==="transition_in"||this.state==="transition_out"||this.state==="game_over"?!1:this.playerState==="attached"||this.playerState==="charging"?(this.chargeActive=!1,this.launch()):this.performAirAction()}selectUpgradeFallback(e){if(this.state!=="upgrade_branching")return!1;if(this.choiceMode==="shop_orbit"){const t=this.activeChoices[e];return!t||t.price===void 0||!this.stats.spendCoins(t.price)?!1:(this.applyOffer(t.offer,"Shop item"),this.shop.reset(),this.choiceMode="none",this.activeChoices=[],this.state="upgrade_acquired",this.eventCooldownUntil=this.currentTime+.6,!0)}return this.choiceMode!=="reward_branch"?!1:this.commitRewardBranch(e,!0)}getCameraPose(){return this.camera.getPose()}getHudState(){const e=Ye(this.momentum.gauge/Math.max(1,this.runUpgrades.modifiers.momentumCap),0,1);return this.stats.fillHud(this.hudSnapshot),this.hudSnapshot.state=this.getHudStateValue(),this.hudSnapshot.chargeRatio=Ye(this.chargeMeter,0,1),this.hudSnapshot.momentumGauge=e,this.hudSnapshot.momentumTier=Math.min(4,Math.floor(e*5)),this.hudSnapshot.orbitGraceActive=this.orbitGraceActive,this.hudSnapshot.orbitGraceProgress=this.orbitGraceProgress,this.hudSnapshot.offers=this.activeChoices.map(t=>t.offer),this.hudSnapshot.branchHints=this.getBranchHints(),this.hudSnapshot.acquisition=this.acquisition,this.hudSnapshot}update(e,t){if(this.state==="idle")return;if(this.currentTime=t,this.state==="transition_in"||this.state==="transition_out"){this.updateMomentum(e);return}this.path.ensureAhead(this.attachedIndex),this.updateMomentum(e),this.prewarmUpcomingMilestones();let i=this.getResolvedNode(this.attachedIndex),n=this.getResolvedNode(this.attachedIndex+1);if(this.state==="game_over"){this.updateCamera(e,i,n),this.updateTrail(e),this.syncPlayerVisual(t),this.syncMarkers(t);return}const r=this.attachedIndex;if(this.playerState==="airborne"?this.updateAirborne(e):this.updateAttached(e,i),(this.attachedIndex!==r||this.playerState!=="airborne")&&(i=this.getResolvedNode(this.attachedIndex),n=this.getResolvedNode(this.attachedIndex+1)),this.advanceDisplayAnchor(),this.updateEvents(e,t,i),this.updateCamera(e,i,n),this.updateTrail(e),this.syncPlayerVisual(t),this.syncMarkers(t),(this.isOutsidePlayableField(this.playerPosition)||this.camera.isBehindSafeLine(this.playerPosition))&&this.failRun(),this.acquisition){const o=Ye((t-this.acquisitionStartedAt)/this.acquisitionDuration,0,1);this.acquisition.progress=o,o>=1&&(this.acquisition=null)}}getHudStateValue(){return this.state==="game_over"?"game_over":this.state==="transition_in"||this.state==="transition_out"?"transition":this.state==="upgrade_branching"?"upgrade_choice":"running"}emitScore(){this.scoreListeners.forEach(e=>e())}getResolvedNode(e){return this.path.getResolvedNode(Math.max(0,e),this.currentTime,this.attachedIndex)}getDisplayNodes(e){if(this.choiceMode==="reward_branch"&&this.activeChoices.length>0){const t=[this.getResolvedNode(this.attachedIndex)];for(this.activeChoices.forEach(i=>{i.previewNodes.slice(0,3).forEach(n=>{t.push(Fs(n,this.currentTime,this.attachedIndex))})});t.length<e;){const i=this.attachedIndex+Math.max(1,t.length-8);t.push(this.getResolvedNode(i))}return t.slice(0,e)}return this.initializeDisplayWindow(e),this.displayWindowIndices.slice(0,e).map(t=>this.getResolvedNode(t))}advanceDisplayAnchor(){if(this.displayWindowIndices.length!==0)for(let e=0;e<this.displayWindowIndices.length;e+=1){const t=this.displayWindowIndices[e],i=this.getResolvedNode(t);if(!(i.resolvedX+this.getPhysicalRadius(i)+5.5<this.camera.getSafeLeft()))continue;this.path.ensureAhead(this.displayNextIndex+1);const r=this.getResolvedNode(this.displayNextIndex);r.resolvedX-this.getPhysicalRadius(r)>this.camera.getSafeRight()+2.8&&(this.displayWindowIndices[e]=this.displayNextIndex,this.displayNextIndex+=1)}}initializeDisplayWindow(e){if(this.displayWindowIndices.length===0){this.path.ensureAhead(e+1),this.displayWindowIndices=Array.from({length:e},(t,i)=>i),this.displayNextIndex=e;return}if(this.displayWindowIndices.length<e)for(this.path.ensureAhead(e+1);this.displayWindowIndices.length<e;)this.displayWindowIndices.push(this.displayNextIndex),this.displayNextIndex+=1}updateMomentum(e){const t=1-Math.min(.72,this.runUpgrades.modifiers.momentumRetention),i=this.momentum.decayRate*t;this.orbitGraceActive&&this.playerState!=="airborne"||(this.momentum.gauge=Ye(this.momentum.gauge-i*e,0,1));const n=1+this.momentum.gauge*.6+this.runUpgrades.modifiers.speedBonus,r=1+this.momentum.gauge*.48+this.runUpgrades.modifiers.chargedLeapBonus*.12,o=this.momentum.gauge*1.4;this.momentum.speedMultiplier=Me(this.momentum.speedMultiplier,n,2.4,e),this.momentum.jumpMultiplier=Me(this.momentum.jumpMultiplier,r,2.6,e),this.momentum.cameraZoomMultiplier=Me(this.momentum.cameraZoomMultiplier,o,2.2,e),this.momentum.fillRate=Me(this.momentum.fillRate,0,4.6,e)}updateAttached(e,t){const i=this.getOrbitSample(t,this.orbitAngle),n=Math.max(1,i.position.length()),r=Math.PI*2/Math.max(1.6,t.gameplayOrbitPeriod),o=this.chargeActive?.55+this.chargeMeter*.45:0,a=r*(1+o+this.momentum.gauge*.42)*this.momentum.speedMultiplier*(1+this.runUpgrades.modifiers.chargeRate*.06+this.runUpgrades.modifiers.speedBonus*.3);this.angularSpeed=Me(this.angularSpeed,a,this.chargeActive?2.6:1.7,e),this.orbitAngle=hi(this.orbitAngle+this.orbitDirection*this.angularSpeed*e);const c=this.getOrbitSample(t,this.orbitAngle);if(this.playerPosition.set(t.resolvedX+c.position.x,t.resolvedY+c.position.y,t.resolvedZ),this.playerVelocity.set(c.tangent.x*n*this.angularSpeed*this.orbitDirection,c.tangent.y*n*this.angularSpeed*this.orbitDirection,0),this.orbitGraceActive&&(this.orbitGraceTravel+=Math.abs(this.angularSpeed*e),this.orbitGraceProgress=Ye(this.orbitGraceTravel/(Math.PI*2),0,1),this.orbitGraceProgress>=1&&(this.orbitGraceActive=!1)),this.chargeActive){const l=.55+this.runUpgrades.modifiers.chargeRate*.24;this.chargeMeter=Ye(this.chargeMeter+e*l,0,1),this.state==="running_attached"&&(this.state="running_charging"),this.playerState==="attached"&&(this.playerState="charging")}else this.chargeMeter=Me(this.chargeMeter,0,4.2,e),this.playerState==="charging"&&(this.playerState="attached"),this.state==="running_charging"&&(this.state="running_attached");if(this.collectCoinsOnCurrentNode(t),this.resolveEnemyContact(t),this.choiceMode==="shop_orbit"&&this.shop.isOpen()){const l=this.shop.tryPurchase(this.orbitAngle,this.stats.getSnapshot().coins);l&&this.stats.spendCoins(l.price)&&(this.applyOffer(l.offer,"Shop item"),this.choiceMode="none",this.activeChoices=[],this.state="upgrade_acquired",this.eventCooldownUntil=this.currentTime+.6)}}updateAirborne(e){const t=this.scratchVector.set(this.playerPosition.x,this.playerPosition.y,this.playerPosition.z),i=Ye(1-this.runUpgrades.modifiers.glideFactor*.55,.18,1);if(this.playerVelocity.y-=6.8*i*e,this.playerVelocity.x+=this.runUpgrades.modifiers.airControl*e*.4,this.playerPosition.addScaledVector(this.playerVelocity,e),this.choiceMode==="reward_branch"&&this.activeChoices.length>0)for(let r=0;r<this.activeChoices.length;r+=1){const o=this.activeChoices[r];if(!o)continue;const a=Fs(o.entry,this.currentTime,this.attachedIndex);if(this.canCaptureNode(a,t)){this.commitRewardBranch(r,!1),this.attachToNode(this.attachedIndex+1,!0,this.playerPosition,this.playerVelocity);return}}const n=this.attachedIndex+Math.max(24,this.displayWindowIndices.length+8);for(let r=this.attachedIndex+1;r<=n;r+=1){const o=this.getResolvedNode(r);if(o.resolvedX-t.x>64)break;if(this.canCaptureNode(o,t)){this.attachToNode(r,!0,this.playerPosition,this.playerVelocity);return}}if(this.runUpgrades.modifiers.phaseJump&&this.currentTime>=this.phaseJumpReadyAt){const r=this.attachedIndex+1,o=this.getResolvedNode(r),a=this.playerPosition.distanceToSquared(this.scratchVector.set(o.resolvedX,o.resolvedY,o.resolvedZ)),c=(o.gameplayRadius+this.runUpgrades.modifiers.phaseJumpRescueRadius)**2;if(a<c){this.phaseJumpReadyAt=this.currentTime+this.runUpgrades.modifiers.phaseJumpCooldown,this.attachToNode(r,!0,this.playerPosition,this.playerVelocity);return}}if(this.teleportReadyAt<=this.currentTime&&this.runUpgrades.modifiers.teleportRange>0){const r=this.path.getTeleportTarget(this.attachedIndex,this.runUpgrades.modifiers.teleportRange);r>this.attachedIndex+1&&this.playerPosition.x<this.camera.getSafeLeft()+2.4&&(this.teleportReadyAt=this.currentTime+this.runUpgrades.modifiers.teleportCooldown,this.attachToNode(r,!1,null,null))}if(this.warpReadyAt<=this.currentTime&&this.runUpgrades.modifiers.warpRange>0){const r=this.path.getTeleportTarget(this.attachedIndex,this.runUpgrades.modifiers.warpRange);r>this.attachedIndex+3&&this.playerPosition.x<this.camera.getSafeLeft()+1.6&&(this.warpReadyAt=this.currentTime+this.runUpgrades.modifiers.warpCooldown,this.attachToNode(r,!1,null,null))}if(this.isOutsidePlayableField(this.playerPosition)||this.camera.isBehindSafeLine(this.playerPosition)){this.failRun();return}this.resolveAirborneEnemyContact()}launch(){if(this.playerState!=="attached"&&this.playerState!=="charging")return!1;const e=this.getResolvedNode(this.attachedIndex),t=this.getOrbitSample(e,this.orbitAngle),i=this.scratchVector.set(t.tangent.x*this.orbitDirection,t.tangent.y*this.orbitDirection,0).normalize(),n=this.scratchVectorB.set(t.position.x,t.position.y,0).normalize(),o=(Math.max(1,t.position.length())*this.angularSpeed*.92+5.2+this.chargeMeter*8.5*(1+this.runUpgrades.modifiers.chargedLeapBonus))*this.momentum.jumpMultiplier*this.runUpgrades.modifiers.jumpPower*(1+this.runUpgrades.modifiers.speedBonus*.35);return this.registerImpactWave(e,this.orbitAngle,o*.92),this.playerVelocity.copy(i.multiplyScalar(o)).addScaledVector(n,o*.08),this.playerState="airborne",this.state=this.choiceMode==="reward_branch"?"upgrade_branching":"running_airborne",this.remainingExtraJumps=Math.max(0,this.runUpgrades.modifiers.extraJumps),this.chargeMeter=0,!0}performAirAction(){if(this.playerState!=="airborne")return!1;if(this.runUpgrades.modifiers.infiniteFlaps||this.remainingExtraJumps>0){this.runUpgrades.modifiers.infiniteFlaps||(this.remainingExtraJumps-=1);const e=4.2+this.runUpgrades.modifiers.jumpPower*1.6;return this.playerVelocity.y=Math.max(this.playerVelocity.y,0)+e,this.playerVelocity.x+=.9+this.momentum.gauge*1.6,!0}return!1}attachToNode(e,t,i,n){const r=this.getResolvedNode(e);this.attachedIndex=e,this.score=Math.max(this.score,e),this.stats.recordLanding(e,r.pathDistance,performance.now()),this.emitScore();let o=this.orbitAngle,a=e===0?-1:this.orbitDirection,c=Math.PI*2/Math.max(1.4,r.gameplayOrbitPeriod);if(t&&i&&n){const h=this.findBestOrbitAttachment(r,i);o=h.angle;const u=h.tangent.dot(this.scratchVector2.set(n.x,n.y));a=u>=0?1:-1;const d=Math.abs(u),p=Math.max(1.2,h.position.length());c=Ye(d/p,Math.PI*2/Math.max(1.4,r.gameplayOrbitPeriod)*.72,Math.PI*2/Math.max(1.1,r.gameplayOrbitPeriod)*2.2),this.rewardMomentum(a,d,r),this.registerImpactWave(r,h.angle,n.length())}else o=e===0?Math.PI*.18:0,a=e===0?-1:this.orbitDirection;this.orbitAngle=o,this.orbitDirection=a,this.angularSpeed=c,this.orbitGraceActive=!0,this.orbitGraceProgress=0,this.orbitGraceTravel=0,this.playerState="attached",this.state="running_attached",this.chargeActive=!1,this.chargeMeter=0,this.remainingExtraJumps=Math.max(0,this.runUpgrades.modifiers.extraJumps);const l=this.getOrbitSample(r,this.orbitAngle);this.playerPosition.set(r.resolvedX+l.position.x,r.resolvedY+l.position.y,r.resolvedZ),this.playerVelocity.set(0,0,0),this.collectCoinsOnCurrentNode(r),this.resolveEnemyContact(r),this.currentTime>=this.eventCooldownUntil&&this.resolveNodeEvent(r)}rewardMomentum(e,t,i){const n=Ye((t-4.2)/7.5,0,1),r=this.lastLandingDirection!==0&&e!==this.lastLandingDirection,o=.08+n*.16+(r?.18:0)+(i.shapeKind==="triangular"?.03:i.shapeKind==="oval"?.015:0);this.momentum.gauge=Ye(this.momentum.gauge+o*(1+this.runUpgrades.modifiers.momentumGain),0,Math.max(1,this.runUpgrades.modifiers.momentumCap)),this.momentum.fillRate=o,this.lastLandingDirection=e}resolveNodeEvent(e){var t;if(e.isMilestone){if(!this.milestoneChoiceCache.has(e.index)){const i=wn(e.index,this.runUpgrades);this.milestoneChoiceCache.set(e.index,this.path.createUpgradeBranches(e.index,i,this.score))}this.activeChoices=(this.milestoneChoiceCache.get(e.index)??[]).map(i=>({...i,previewNodes:i.previewNodes.map(n=>({...n,coinSlots:n.coinSlots.map(r=>({...r}))})),pathNodes:i.pathNodes.map(n=>({...n,coinSlots:n.coinSlots.map(r=>({...r}))}))})),this.choiceMode="reward_branch",this.state="upgrade_branching",this.eventCooldownUntil=this.currentTime+.2;return}switch(e.eventType){case"shop":{this.shop.openForRun(e.index,this.runUpgrades);const i=this.shop.getActiveOffers().slice(0,3);this.activeChoices=i.map(n=>({mode:"shop_orbit",offer:n.offer,price:n.price,entry:e,previewNodes:[],pathNodes:[]})),this.activeShopAngles=i.map(n=>n.angle),this.choiceMode="shop_orbit",this.state="upgrade_branching",this.eventCooldownUntil=this.currentTime+.2;break}case"treasure":this.stats.addCoins(this.applyCoinBonus(5)),this.startAcquisition(((t=this.activeChoices[0])==null?void 0:t.offer)??this.buildVirtualOffer("Treasure Chest","common","TRE","Gain 5 coins."),"Treasure");break;case"gift":{const i=wn(e.index,this.runUpgrades)[0];i&&this.applyOffer(i,"Gift shard");break}case"rare_item":{const i=wn(Math.max(100,e.index),this.runUpgrades)[0];i&&this.applyOffer(i,"Rare item");break}case"mini_boss":case"boss":this.boss.start(this.currentTime);break;case"boss_weak":this.boss.isWeakPointPhase()&&(this.boss.defeat(),this.stats.addCoins(this.applyCoinBonus(8)),this.fillMomentumBurst(.24));break}}commitRewardBranch(e,t){const i=this.activeChoices[e];return i?(this.path.replaceFuture(this.attachedIndex,i.pathNodes),this.path.ensureAhead(this.attachedIndex+1,50,40),this.path.queuePostMilestoneEvents(this.attachedIndex+i.pathNodes.length,this.attachedIndex+i.pathNodes.length),this.milestoneChoiceCache.delete(this.attachedIndex),this.applyOffer(i.offer,t?"Quick choice":"Path chosen"),this.choiceMode="none",this.activeChoices=[],this.state="upgrade_acquired",this.eventCooldownUntil=this.currentTime+.35,!0):!1}applyOffer(e,t){this.runUpgrades=Kg(this.runUpgrades,e.item.id),this.remainingExtraJumps=Math.max(0,this.runUpgrades.modifiers.extraJumps),this.shieldCharges=Math.max(this.shieldCharges,this.runUpgrades.modifiers.shieldCharges),this.startAcquisition(e,t)}startAcquisition(e,t){this.acquisitionStartedAt=this.currentTime,this.acquisition={offer:e,progress:0,subtitle:t}}buildVirtualOffer(e,t,i,n){return{item:{id:`virtual-${i}`,rarity:t,category:"economy",icon:i,unlockScore:0,stackable:!1,maxStacks:1,effects:["virtual"],name:{fr:e,en:e},description:{fr:n,en:n}},stackCount:0}}updateEvents(e,t,i){if(this.boss.update(e,t,this.playerPosition).playerHit&&this.failRun(),this.boss.isWeakPointPhase()){const r=this.findVisibleWeakPoint();r&&this.boss.setWeakPoint(new w(r.resolvedX,r.resolvedY,r.resolvedZ))}this.state==="upgrade_acquired"&&t>=this.eventCooldownUntil&&(this.state=this.playerState==="airborne"?"running_airborne":this.chargeActive?"running_charging":"running_attached"),this.updateAutoFire(t),this.shop.update(new w(i.resolvedX,i.resolvedY,i.resolvedZ),i.gameplayRadius+.7,t)}updateCamera(e,t,i){const n=i.isGigantic?Ye(1-Math.max(0,i.resolvedX-this.playerPosition.x)/24,0,1):0,r=Ye((Math.max(t.visualScale,i.visualScale)-2.8)/28,0,1.24),o=t.isGigantic?11.6:n*8.4,a=this.choiceMode==="reward_branch"?5.8:this.choiceMode==="shop_orbit"?2.4:this.state==="upgrade_acquired"?1.8:0,c=this.boss.getCameraZoomOffset(),l=(this.boss.isActive()?this.boss.getSpeedPressure():1)*this.momentum.speedMultiplier;this.camera.update({deltaTime:e,state:this.state,score:this.score,currentNode:t,nextNode:i,playerPosition:this.playerPosition,momentumGauge:Ye(this.momentum.gauge,0,1),largeShardFactor:r,milestoneZoom:o,choiceZoom:a,bossZoom:c,speedPressure:l*(1-this.runUpgrades.modifiers.timeSlowFactor*.55)})}updateTrail(e){for(let i=this.trailPoints.length-1;i>0;i-=1)this.trailPoints[i].copy(this.trailPoints[i-1]);this.trailPoints[0].copy(this.playerPosition),this.trailPoints.forEach((i,n)=>{this.trailBuffer[n*3]=i.x,this.trailBuffer[n*3+1]=i.y,this.trailBuffer[n*3+2]=i.z});const t=this.playerTrail.geometry.getAttribute("position");t.needsUpdate=!0,this.playerTrail.material.opacity=.24+this.momentum.gauge*.36}syncPlayerVisual(e){this.player.position.copy(this.playerPosition);const t=Math.atan2(this.playerVelocity.y||.001,this.playerVelocity.x||.001);if(this.player.rotation.z=t,this.state==="game_over"){const i=Ye((e-this.gameOverStartedAt)/.26,0,1);this.playerBody.scale.setScalar(Math.max(.02,1-i*1.22));return}this.playerBody.scale.setScalar(1+this.momentum.gauge*.12+Math.sin(e*8)*.02)}syncMarkers(e){const t=this.getDisplayNodes(Math.min(28,this.getRecommendedVisibleCount())),i=[],n=[];t.forEach(r=>{var o;r.coinSlots.forEach(a=>{a.collected||i.push({position:this.getCoinWorldPosition(r,a.angle,a.orbitScale),scale:.74+a.value*.08,visible:!0})}),(o=r.enemySlot)!=null&&o.alive&&n.push({position:this.getEnemyWorldPosition(r,r.enemySlot.pole),visible:!0,tier:r.enemySlot.tier})}),this.coins.setVisible(this.state!=="idle"&&this.state!=="transition_out"),this.enemies.setVisible(this.state!=="idle"&&this.state!=="transition_out"),this.coins.update(i,e),this.enemies.update(n,e)}fillMomentumBurst(e){this.momentum.gauge=Ye(this.momentum.gauge+e*(1+this.runUpgrades.modifiers.momentumGain),0,Math.max(1,this.runUpgrades.modifiers.momentumCap)),this.momentum.fillRate=Math.max(this.momentum.fillRate,e)}collectCoinsOnCurrentNode(e){e.coinSlots.forEach(t=>{t.collected||Math.abs(ws(this.orbitAngle,t.angle))<.16+this.runUpgrades.modifiers.coinMagnet*.08&&(t.collected=!0,this.stats.addCoins(this.applyCoinBonus(t.value)))})}resolveEnemyContact(e){const t=e.enemySlot;if(!t||!t.alive||this.getEnemyWorldPosition(e,t.pole).distanceTo(this.playerPosition)>e.gameplayRadius*.36+.82)return;const n=this.playerVelocity.length();if(this.isEnemyHitFromBehind(t.pole)&&n>=t.speedThreshold||this.runUpgrades.modifiers.spikeOrbit){t.alive=!1,this.stats.addCoins(this.applyCoinBonus(t.rewardCoins)),this.fillMomentumBurst(.05);return}this.consumeProtectionOrFail()}resolveAirborneEnemyContact(){for(let e=this.attachedIndex+1;e<=this.attachedIndex+4;e+=1){const t=this.getResolvedNode(e),i=t.enemySlot;if(!i||!i.alive||this.getEnemyWorldPosition(t,i.pole).distanceTo(this.playerPosition)>1.2)continue;this.playerVelocity.length()>=i.speedThreshold*.75||this.runUpgrades.modifiers.spikeOrbit?(i.alive=!1,this.stats.addCoins(this.applyCoinBonus(i.rewardCoins)),this.fillMomentumBurst(.08)):this.consumeProtectionOrFail();return}}consumeProtectionOrFail(){if(this.shieldCharges>0){this.shieldCharges-=1,this.fillMomentumBurst(.04);return}this.failRun()}updateAutoFire(e){if(!(this.runUpgrades.modifiers.autoCannonLevel<=0)&&!(e<this.autoFireReadyAt))for(let t=this.attachedIndex;t<this.attachedIndex+8;t+=1){const i=this.getResolvedNode(t),n=i.enemySlot;if(!(!n||!n.alive||n.tier==="invincible"||this.getEnemyWorldPosition(i,n.pole).distanceTo(this.playerPosition)>8.2)){n.alive=!1,this.stats.addCoins(this.applyCoinBonus(n.rewardCoins)),this.fillMomentumBurst(.04+this.runUpgrades.modifiers.autoCannonLevel*.01),this.autoFireReadyAt=e+Math.max(2.2,5-this.runUpgrades.modifiers.autoCannonLevel*1.1);return}}}applyCoinBonus(e){const t=this.runUpgrades.modifiers.doubleCoin?e*2:e;return Math.max(1,Math.round(t*(1+this.runUpgrades.modifiers.coinBonus)))}failRun(){this.state!=="game_over"&&(this.state="game_over",this.playerState="dead",this.chargeActive=!1,this.chargeMeter=0,this.choiceMode="none",this.activeChoices=[],this.playerVelocity.set(0,0,0),this.playerVelocityTarget.set(0,0,0),this.angularSpeed=0,this.gameOverStartedAt=this.currentTime,this.playerTrail.visible=!1,this.shop.reset(),this.emitScore())}isOutsidePlayableField(e){return e.y<=-32||e.y>=32}canCaptureNode(e,t){const i=this.getPhysicalRadius(e)+.92+this.runUpgrades.modifiers.captureRadius,n=this.playerPosition.x-e.resolvedX,r=this.playerPosition.y-e.resolvedY,o=n*n+r*r<=i*i;if(o||!t)return o;const a=t.x-e.resolvedX,c=t.y-e.resolvedY,l=this.playerPosition.x-t.x,h=this.playerPosition.y-t.y,u=l*l+h*h;if(u<=1e-4)return!1;const d=Ye(-(a*l+c*h)/u,0,1),p=a+l*d,g=c+h*d;return p*p+g*g<=i*i}findBestOrbitAttachment(e,t){let i=0,n=Number.POSITIVE_INFINITY,r=new se,o=new se(1,0);for(let a=0;a<72;a+=1){const c=a/72*Math.PI*2,l=this.getOrbitSample(e,c),h=e.resolvedX+l.position.x,u=e.resolvedY+l.position.y,d=(t.x-h)**2+(t.y-u)**2;d<n&&(n=d,i=c,r=l.position.clone(),o=l.tangent.clone())}return{angle:i,position:r,tangent:o}}getOrbitSample(e,t){const i=hi(t),n=e.shapeKind==="round"?0:e.resolvedSpinPhase,r=this.getShapeExtents(e),o=this.getOrbitClearance(e),a=this.getPhysicalRadius(e)+o,c=hi(i-n);if(e.shapeKind==="oval"){const u=r.x+o,d=r.y+o,p=new se(Math.cos(c)*u,Math.sin(c)*d),g=new se(-Math.sin(c)*u,Math.cos(c)*d).normalize();return this.applySurfaceContour(e,c,this.rotateOrbitSample(p,g,n))}if(e.shapeKind==="triangular"){const u=r.y+o,d=r.x/Math.max(1e-4,r.y)*u,p=[new se(0,u),new se(-d,-u*.5),new se(d,-u*.5)],g=this.sampleTriangleBoundary(p,c),_=g.position,m=g.tangent;return this.applySurfaceContour(e,c,this.rotateOrbitSample(_,m,n))}const l=new se(Math.cos(i)*a,Math.sin(i)*a),h=new se(-Math.sin(i),Math.cos(i));return this.applySurfaceContour(e,c,this.rotateOrbitSample(l,h,0))}getShapeExtents(e){const t=e.shapeKind==="triangular"?1.07384:e.shapeKind==="oval"?1.18:1.25,i=e.shapeKind==="triangular"?1.24:e.shapeKind==="oval"?1.18:1.25;return{x:t*e.visualScale*e.visualStretch.x*.92,y:i*e.visualScale*e.visualStretch.y*.92}}sampleTriangleBoundary(e,t){const i=new se(Math.cos(t),Math.sin(t));let n=Number.POSITIVE_INFINITY,r=e[0].clone(),o=e[1].clone().sub(e[0]).normalize();for(let a=0;a<e.length;a+=1){const c=e[a],h=e[(a+1)%e.length].clone().sub(c),u=i.x*h.y-i.y*h.x;if(Math.abs(u)<1e-4)continue;const d=(c.x*h.y-c.y*h.x)/u,p=(c.x*i.y-c.y*i.x)/u;d<=0||p<0||p>1||d<n&&(n=d,r=i.clone().multiplyScalar(d),o=h.normalize())}return{position:r,tangent:o}}getPhysicalRadius(e){const t=this.getShapeExtents(e),i=Math.max(t.x,t.y);return Math.max(e.gameplayRadius,i)}getOrbitClearance(e){const t=e.index===this.attachedIndex&&this.playerState!=="airborne"?Ye(this.playerVelocity.length()/16,0,.46):0,i=Ye((e.visualScale-3.2)*.085,0,.82);return Ye(.28+e.visualScale*.048+i+t,.28,1.48)}applySurfaceContour(e,t,i){const n=1+this.sampleSurfaceDeformation(e,t),r=i.position.clone().normalize();return{position:i.position.multiplyScalar(n),tangent:i.tangent.addScaledVector(r,.12*this.sampleSurfaceSlope(e,t)).normalize()}}sampleSurfaceDeformation(e,t){const i=Ye(e.index/280,0,1),n=Ye(1.08-e.visualScale*.035,.32,1),r=(.008+i*.03)*n,o=e.shapeKind==="triangular"?3:e.shapeKind==="oval"?2:4;return Math.sin(t*o+e.motionSeed*6.2)*r+Math.sin(t*(o+3)-e.motionSeed*4.1)*r*.42+this.sampleImpactWaveOffset(e,t)+this.sampleBoatWaveOffset(e,t)*n}sampleSurfaceSlope(e,t){return(this.sampleSurfaceDeformation(e,hi(t+.06))-this.sampleSurfaceDeformation(e,hi(t-.06)))/(.06*2)}sampleImpactWaveOffset(e,t){const i=this.impactWaves.get(e.index);if(!i||i.length===0)return 0;let n=0;const r=[];return i.forEach(o=>{const a=this.currentTime-o.createdAt;if(a>=o.decay)return;const c=1-a/o.decay,l=ws(t,o.originAngle),h=Math.exp(-(l*l)/Math.max(.08,o.radius*o.radius));n+=o.strength*h*c,r.push(o)}),r.length>0?this.impactWaves.set(e.index,r):this.impactWaves.delete(e.index),n}sampleBoatWaveOffset(e,t){if(e.index!==this.attachedIndex||this.playerState==="airborne")return 0;const i=e.shapeKind==="round"?0:e.resolvedSpinPhase,n=hi(this.orbitAngle-i),r=hi(n-this.orbitDirection*.28),o=ws(t,n),a=ws(t,r),c=this.orbitGraceActive?Ye(this.orbitGraceProgress,.15,1):1,l=Math.exp(-(o*o)/.2)*(.05+this.momentum.gauge*.075)*c,h=Math.exp(-(a*a)/.48)*.03*c;return l+h}registerImpactWave(e,t,i){const n=Ye(e.index/240,0,1),r=Ye(1.04-e.visualScale*.03,.34,1),o=Ye((i-4.6)/18,.02,.18)*(.6+n*.4)*r,a={originAngle:hi(t),strength:o,radius:.32+Ye(i/18,0,.72),decay:1.4+Ye(i/16,0,.9),createdAt:this.currentTime},c=this.impactWaves.get(e.index)??[];c.push(a),this.impactWaves.set(e.index,c.slice(-4))}getVisualWaveState(e){const t=this.impactWaves.get(e.index);if(!t||t.length===0)return null;let i=null,n=0;for(const a of t){const c=this.currentTime-a.createdAt;if(c>=a.decay)continue;const l=1-c/a.decay;(!i||l*a.strength>n)&&(i=a,n=l*a.strength)}if(!i)return null;const r=this.currentTime-i.createdAt,o=Ye(1-r/i.decay,0,1);return{angle:i.originAngle,strength:i.strength*(.9+o*.9),density:.72+o*.58}}rotateOrbitSample(e,t,i){const n=Math.cos(i),r=Math.sin(i);return{position:new se(e.x*n-e.y*r,e.x*r+e.y*n),tangent:new se(t.x*n-t.y*r,t.x*r+t.y*n).normalize()}}getCoinWorldPosition(e,t,i){const n=this.getOrbitSample(e,t);return new w(e.resolvedX+n.position.x*i,e.resolvedY+n.position.y*i,e.resolvedZ)}getEnemyWorldPosition(e,t){const n=this.getOrbitSample(e,t==="north"?Math.PI*.5:Math.PI*1.5).position.clone().normalize().multiplyScalar(this.getPhysicalRadius(e)+.58),r=e.shapeKind==="round"?0:e.resolvedSpinPhase,o=Math.cos(r),a=Math.sin(r);return new w(e.resolvedX+n.x*o-n.y*a,e.resolvedY+n.x*a+n.y*o,e.resolvedZ)}isEnemyHitFromBehind(e){return e==="north"?this.orbitDirection===1:this.orbitDirection===-1}prewarmUpcomingMilestones(){for(let e=this.attachedIndex+1;e<this.attachedIndex+18;e+=1){const t=this.path.getNode(e);if(!(t!=null&&t.isMilestone)||this.milestoneChoiceCache.has(t.index))continue;const i=wn(t.index,this.runUpgrades);this.milestoneChoiceCache.set(t.index,this.path.createUpgradeBranches(t.index,i,this.score));return}}getBranchHints(){if(this.choiceMode==="reward_branch")return this.activeChoices.slice(0,3).map((e,t)=>{const i=e.previewNodes[0]??e.entry;return{slot:t,offer:e.offer,worldPosition:new w(i.x,i.y+(t===1?2.4:t===0?3.2:-3.2),i.z),mode:"reward_branch"}});if(this.choiceMode==="shop_orbit"&&this.activeChoices.length>0){const e=this.getResolvedNode(this.attachedIndex);return this.activeChoices.slice(0,3).map((t,i)=>{const n=this.activeShopAngles[i]??0,r=e.gameplayRadius+2.1;return{slot:i,offer:t.offer,worldPosition:new w(e.resolvedX+Math.cos(n)*r,e.resolvedY+Math.sin(n)*r,e.resolvedZ),mode:"shop_orbit",price:t.price}})}return[]}findVisibleWeakPoint(){for(let e=this.attachedIndex+1;e<this.attachedIndex+18;e+=1){const t=this.getResolvedNode(e);if(t.eventType==="boss_weak")return t}return null}}class __{constructor(){M(this,"yaw",0);M(this,"radius",26.5);M(this,"yawTarget",0);M(this,"radiusTarget",26.5);M(this,"yawVelocity",0);M(this,"height",2.6);M(this,"pose",new w);M(this,"lookAt",new w)}setRadius(e){this.radius=e,this.radiusTarget=e}orbit(e,t){const i=Ye(e,-10,10);this.yawVelocity=Ye(this.yawVelocity+i*85e-5,-.032,.032)}update(e,t){return this.yawTarget+=this.yawVelocity,this.yawVelocity=Me(this.yawVelocity,0,11,e),this.yaw=Me(this.yaw,this.yawTarget,10,e),this.radius=Me(this.radius,this.radiusTarget,8,e),this.pose.set(t.x+Math.sin(this.yaw)*this.radius,t.y+this.height,t.z+Math.cos(this.yaw)*this.radius),this.lookAt.copy(t),{position:this.pose.clone(),lookAt:this.lookAt.clone()}}}class v_{constructor(e,t,i){M(this,"element");M(this,"canvas");M(this,"context");M(this,"content");M(this,"progress");M(this,"logo");M(this,"sites",[]);M(this,"cellCache",[]);M(this,"fragments",[]);M(this,"clickCount",0);M(this,"clickThreshold",8);M(this,"fractureIndex",0);M(this,"state","idle");M(this,"opacity",1);M(this,"shatterElapsed",0);M(this,"onBroken",null);M(this,"onHidden",null);M(this,"onPointerDown",e=>{if(this.state!=="idle")return;const t=this.canvas.getBoundingClientRect(),i=e.clientX-t.left,n=e.clientY-t.top;this.addFractureCluster(i,n),this.clickCount+=1,this.progress.style.setProperty("--intro-progress",String(this.clickCount/this.clickThreshold)),this.progress.textContent=`${this.clickCount}/${this.clickThreshold}`,this.clickCount>=this.clickThreshold?this.startShatter():this.draw()});M(this,"resize",()=>{this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.draw()});this.i18n=t,this.theme=i,this.element=document.createElement("div"),this.element.className="intro-layer",this.canvas=document.createElement("canvas"),this.canvas.className="intro-layer__canvas";const n=this.canvas.getContext("2d");if(!n)throw new Error("Canvas 2D context unavailable");this.context=n,this.content=document.createElement("div"),this.content.className="intro-layer__content",this.content.innerHTML=`
      <div class="intro-layer__logo-wrap">
        <img class="intro-layer__logo" alt="Ape Prod logo">
      </div>
      <h1 class="intro-layer__title"></h1>
      <p class="intro-layer__subtitle"></p>
      <div class="intro-layer__progress"></div>
    `,this.logo=this.content.querySelector(".intro-layer__logo"),this.progress=this.content.querySelector(".intro-layer__progress"),this.element.append(this.canvas,this.content),e.appendChild(this.element),this.element.addEventListener("pointerdown",this.onPointerDown),this.i18n.onChange(()=>this.renderText()),this.theme.onChange(()=>this.renderText()),window.addEventListener("resize",this.resize),this.resize(),this.renderText()}get isComplete(){return this.state==="hidden"}update(e){var t;this.state==="shattering"&&(this.shatterElapsed+=e,this.opacity=Ye(1-this.shatterElapsed/1.35,0,1),this.fragments.forEach(i=>{i.centerX+=i.velocityX*e,i.centerY+=i.velocityY*e,i.velocityY+=320*e,i.rotation+=i.angularVelocity*e}),this.shatterElapsed>1.4&&(this.state="hidden",this.element.classList.add("is-hidden"),(t=this.onHidden)==null||t.call(this))),this.draw()}addFractureCluster(e,t){const n=this.fractureIndex+1;this.fractureIndex+=1;for(let r=0;r<9;r+=1){const o=r/9*Math.PI*2,a=18+(n*37+r*17)%44,c=Math.sin(n+r*.7)*18,l=Math.cos(n*1.3+r*.5)*18;this.sites.push({x:e+Math.cos(o)*a+c,y:t+Math.sin(o)*a+l,fractureId:n})}this.cellCache=this.sites.map(r=>this.computeCell(r))}computeCell(e){const t=[];for(let r=0;r<18;r+=1){const o=r/18*Math.PI*2;let a=44;for(const c of this.sites){if(c===e)continue;const l=Math.cos(o),h=Math.sin(o),u=c.x-e.x,d=c.y-e.y,p=2*(l*u+h*d),g=u*u+d*d;p>.001&&(a=Math.min(a,g/p))}t.push({x:e.x+Math.cos(o)*Math.max(8,a),y:e.y+Math.sin(o)*Math.max(8,a)})}return t}startShatter(){var e;this.state==="idle"&&(this.state="shattering",this.shatterElapsed=0,this.fragments=this.cellCache.map((t,i)=>{const n=t.reduce((a,c)=>a+c.x,0)/t.length,r=t.reduce((a,c)=>a+c.y,0)/t.length,o=Math.atan2(r-this.canvas.height/2,n-this.canvas.width/2);return{points:t,centerX:n,centerY:r,velocityX:Math.cos(o)*(60+i*2.5),velocityY:Math.sin(o)*(40+i*1.5)-20,angularVelocity:(Math.random()-.5)*4,rotation:0}}),(e=this.onBroken)==null||e.call(this))}draw(){const e=this.canvas.width,t=this.canvas.height,{context:i}=this;i.clearRect(0,0,e,t),i.save(),i.globalAlpha=this.opacity,i.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--color-bg").trim(),i.fillRect(0,0,e,t),this.state==="shattering"?(i.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue("--color-fg").trim(),i.lineWidth=1.1,this.fragments.forEach(n=>{i.save(),i.translate(n.centerX,n.centerY),i.rotate(n.rotation),i.beginPath(),n.points.forEach((r,o)=>{const a=r.x-n.centerX,c=r.y-n.centerY;o===0?i.moveTo(a,c):i.lineTo(a,c)}),i.closePath(),i.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--color-bg").trim(),i.fill(),i.stroke(),i.restore()})):(i.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue("--color-fg").trim(),i.fillStyle="rgba(0, 0, 0, 0)",i.lineWidth=1.2,this.cellCache.forEach(n=>{i.beginPath(),n.forEach((r,o)=>{o===0?i.moveTo(r.x,r.y):i.lineTo(r.x,r.y)}),i.closePath(),i.stroke()})),i.restore()}renderText(){this.content.querySelector(".intro-layer__title").textContent=this.i18n.t("introTitle"),this.content.querySelector(".intro-layer__subtitle").textContent=this.i18n.t("introSubtitle"),this.progress.textContent=`${this.clickCount}/${this.clickThreshold}`,this.progress.style.setProperty("--intro-progress",String(this.clickCount/this.clickThreshold)),this.logo.src=this.theme.current==="dark"?"/assets/images/Logo/LogoApeProdLight.svg":"/assets/images/Logo/LogoApeProdDark.svg"}}const Os={dark:{color:new Pe("#D4BF9B"),emissive:new Pe("#D4BF9B")},light:{color:new Pe("#393F4A"),emissive:new Pe("#393F4A")}};function Mc(s,e){const t=new bg({color:Os[s].color.clone(),emissive:Os[s].emissive.clone(),emissiveIntensity:.12,roughness:.48,metalness:.18,flatShading:!0,transparent:!0,opacity:1});return t.onBeforeCompile=i=>{const n={uTime:{value:0},uHover:{value:0},uDrag:{value:0},uFocus:{value:0},uSettled:{value:0},uSnap:{value:0},uSeed:{value:e},uOrbitAngle:{value:0},uOrbitPulse:{value:0},uWaveDensity:{value:.72}};t.userData.shaderUniforms=n,Object.assign(i.uniforms,n),i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
attribute vec3 aFragmentDir;
attribute float aFragmentPhase;
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
transformed.z *= focusFlatten;`)},t.customProgramCacheKey=()=>`shard-${e}`,t}function on(s,e){s.color.copy(Os[e].color),s.emissive.copy(Os[e].emissive)}function Dr(s,e){const t=s.userData.shaderUniforms;t&&(t.uTime.value=e.time,t.uHover.value=e.hover,t.uDrag.value=e.drag,t.uFocus.value=e.focus,t.uSettled.value=e.settled,t.uSnap.value=e.snap,t.uOrbitAngle.value=e.orbitAngle??0,t.uOrbitPulse.value=e.orbitPulse??0,t.uWaveDensity.value=e.waveDensity??.72)}function x_(s,e){const t=new qn(s,e).toNonIndexed();return go(t)}function y_(s,e,t){const i=new uo(s,e,t).toNonIndexed();return go(i)}function S_(s,e){const t=s*Math.sqrt(3)*.5,i=new ol;i.moveTo(0,s),i.lineTo(-t,-s*.5),i.lineTo(t,-s*.5),i.closePath();const n=new lo(i,{depth:e,steps:1,bevelEnabled:!1}).translate(0,0,-e*.5).toNonIndexed();return go(n)}function go(s){const e=s.getAttribute("position"),t=new Float32Array(e.count*3),i=new Float32Array(e.count);for(let n=0;n<e.count;n+=3){const r=e.getX(n),o=e.getY(n),a=e.getZ(n),c=e.getX(n+1),l=e.getY(n+1),h=e.getZ(n+1),u=e.getX(n+2),d=e.getY(n+2),p=e.getZ(n+2),g=new w((r+c+u)/3,(o+l+d)/3,(a+h+p)/3).normalize(),_=n/3*.173;for(let m=0;m<3;m+=1){const f=(n+m)*3;t[f]=g.x,t[f+1]=g.y,t[f+2]=g.z,i[n+m]=_}}return s.setAttribute("aFragmentDir",new Rt(t,3)),s.setAttribute("aFragmentPhase",new Rt(i,1)),s}const M_=new w(0,.8,24),b_=new w(0,.2,17.5),An=33;class E_{constructor(e,t,i,n){M(this,"root",new kt);M(this,"loader",new wg);M(this,"raycaster",new Dg);M(this,"dragPlane",new xi(new w(0,0,1),0));M(this,"interactionPlanePoint",new w);M(this,"entities",new Map);M(this,"entityList");M(this,"pickTargets",[]);M(this,"pointer",new se);M(this,"backgroundPoints");M(this,"focusTargetPosition",new w(0,.1,7.4));M(this,"pivot",new w(0,0,0));M(this,"roundGeometry",x_(1.25,4));M(this,"ovalGeometry",y_(1.18,18,14));M(this,"triangularGeometry",S_(1.24,1.48));M(this,"constellationLines");M(this,"gameFieldEntities");M(this,"globalOrbitTime",0);M(this,"hoveredId",null);M(this,"focusedId",null);M(this,"draggingId",null);M(this,"activeIndex",0);M(this,"theme");M(this,"focusSettled",!1);M(this,"activeLookAt",new w);M(this,"externalLayoutActive",!1);M(this,"externalLayoutPositions",null);M(this,"externalLayoutScales",null);M(this,"externalLayoutVisuals",null);M(this,"externalTransitionFrom",[]);M(this,"externalTransitionTo",[]);M(this,"externalTransitionProgress",0);M(this,"speedAccentTimer",36);M(this,"speedAccentId",null);M(this,"unlockCallbacks",new Set);M(this,"slotPreviewIds",new Set);this.scene=e,this.slotSystem=i,this.theme=n,this.scene.add(this.root),this.backgroundPoints=this.createBackgroundPoints(),this.scene.add(this.backgroundPoints),this.constellationLines=this.createConstellationLines(),this.entityList=t.map((r,o)=>this.createShard(r,o)),this.gameFieldEntities=Array.from({length:An},(r,o)=>this.createGameFieldShard(o))}getGameGeometry(e){return e==="oval"?this.ovalGeometry:e==="triangular"?this.triangularGeometry:this.roundGeometry}setTheme(e){this.theme=e,this.entityList.forEach(t=>{on(t.core.material,e),this.updateLogoTexture(t),t.slotIndicator.material.color.set(e==="dark"?"#D4BF9B":"#393F4A")}),this.gameFieldEntities.forEach(t=>{on(t.core.material,e)}),this.backgroundPoints.material.color.set(e==="dark"?"#D4BF9B":"#393F4A"),this.constellationLines.forEach(t=>t.material.color.set(e==="dark"?"#D4BF9B":"#393F4A"))}setActiveIndex(e){this.activeIndex=Cs(e,this.entityList.length)}setHovered(e){this.hoveredId=e}setFocused(e){this.focusedId=e,this.focusSettled=!1,this.entityList.forEach(t=>{e&&t.project.id===e?t.runtimeState="focus_enter":t.runtimeState!=="dragging"&&(t.runtimeState=t.snapped?"snapped":"orbiting")})}isFocusSettled(){return this.focusSettled}clearFocus(){this.focusedId=null,this.focusSettled=!1,this.entityList.forEach(e=>{e.runtimeState=e.snapped?"snapped":"focus_exit",e.manualRotationY=0})}getFocusedProject(){var e;return this.focusedId&&((e=this.entities.get(this.focusedId))==null?void 0:e.project)||null}getFocusedFacetIndex(){var e;return this.focusedId?((e=this.entities.get(this.focusedId))==null?void 0:e.activeFacet)??0:0}changeFacet(e){if(!this.focusedId)return null;const t=this.entities.get(this.focusedId);return!t||t.facetAnimation.active?null:(t.facetAnimation={active:!0,direction:e,progress:0,swapped:!1},t.project.id)}previewFacetRotation(e){if(!this.focusedId)return;const t=this.entities.get(this.focusedId);!t||t.facetAnimation.active||(t.manualRotationY=qt.clamp(e*.007,-Math.PI/6,Math.PI/6))}finishFacetRotation(){if(!this.focusedId)return!1;const e=this.entities.get(this.focusedId);if(!e||e.facetAnimation.active)return!1;if(Math.abs(e.manualRotationY)>Math.PI/8){const t=e.manualRotationY>0?1:-1;return e.manualRotationY=0,this.changeFacet(t),!0}return e.manualRotationY=0,!1}beginDrag(e,t){if(this.focusedId)return!1;const i=this.entities.get(e);return!i||i.project.role==="presentation"||!this.slotSystem.getSlotForShard(e)?!1:(this.slotPreviewIds.delete(e),i.snapped&&(i.snapped=!1,this.slotSystem.deactivate(i.project.id)),this.draggingId=e,i.runtimeState="dragging",i.dragOffset.copy(i.group.position).sub(t),i.dragTarget.copy(i.group.position),this.dragPlane.constant=-i.group.position.z,!0)}updateDrag(e){if(!this.draggingId)return 0;const t=this.entities.get(this.draggingId);if(!t)return 0;t.dragTarget.copy(e).add(t.dragOffset),t.dragTarget.z=t.group.position.z;const i=this.slotSystem.getSlotForShard(t.project.id),n=this.slotSystem.getProximity(t.project.id,t.dragTarget);if(i&&n>0){const r=qt.clamp(.12+n*n*.62,.12,.74);t.dragTarget.x=qt.lerp(t.dragTarget.x,i.worldPosition.x,r),t.dragTarget.y=qt.lerp(t.dragTarget.y,i.worldPosition.y,r),t.dragTarget.z=qt.lerp(t.dragTarget.z,i.worldPosition.z,r)}return n}endDrag(){if(!this.draggingId)return{snapped:!1,unlocked:!1,shardId:null};const e=this.entities.get(this.draggingId),t=this.slotSystem.canSnap(e.project.id,e.dragTarget);let i=!1;t?(e.snapped=!0,e.runtimeState="snapped",e.dragTarget.set(t.worldPosition.x,t.worldPosition.y,t.worldPosition.z),e.velocity.set(0,0,0),this.slotSystem.activate(e.project.id),this.slotSystem.isUnlocked()&&(i=!0,this.unlockCallbacks.forEach(r=>r()))):e.runtimeState="orbiting";const n={snapped:!!t,unlocked:i,shardId:this.draggingId};return this.draggingId=null,n}pick(e,t,i,n){const r=i.getBoundingClientRect();this.pointer.x=(e-r.left)/r.width*2-1,this.pointer.y=-((t-r.top)/r.height)*2+1,this.raycaster.setFromCamera(this.pointer,n);const a=this.raycaster.intersectObjects(this.pickTargets,!1).find(c=>!!c.object.userData.shardId);return a?{shardId:a.object.userData.shardId,point:a.point.clone()}:null}projectPointerToDragPlane(e,t,i,n){const r=i.getBoundingClientRect();return this.pointer.x=(e-r.left)/r.width*2-1,this.pointer.y=-((t-r.top)/r.height)*2+1,this.raycaster.setFromCamera(this.pointer,n),this.raycaster.ray.intersectPlane(this.dragPlane,this.interactionPlanePoint.clone())}getProjectAt(e){var t;return((t=this.entityList[Cs(e,this.entityList.length)])==null?void 0:t.project)||null}getPivot(){return this.pivot.clone()}getOrbitCameraPose(){return this.activeLookAt.copy(this.pivot),{position:M_,lookAt:this.activeLookAt.clone()}}getFocusCameraPose(){const e=this.focusedId?this.entities.get(this.focusedId):null;return{position:b_,lookAt:(e==null?void 0:e.group.position.clone())||this.focusTargetPosition.clone()}}getFocusedEntityId(){return this.focusedId}onUnlocked(e){return this.unlockCallbacks.add(e),()=>this.unlockCallbacks.delete(e)}activateSlotPreview(){this.slotPreviewIds.clear(),this.entityList.forEach(e=>{this.slotSystem.getSlotForShard(e.project.id)&&(this.slotPreviewIds.add(e.project.id),e.snapped=!1,!this.focusedId&&e.runtimeState!=="dragging"&&(e.runtimeState="orbiting"))})}activateSlotPreviewForShard(e){if(!this.entities.has(e)||!this.slotSystem.getSlotForShard(e))return;this.slotPreviewIds.add(e);const t=this.entities.get(e);t&&!t.snapped&&!this.focusedId&&t.runtimeState!=="dragging"&&(t.runtimeState="orbiting")}snapShardToSlot(e){const t=this.entities.get(e),i=this.slotSystem.getSlotForShard(e);return!t||!i?!1:(this.slotPreviewIds.delete(e),t.snapped=!0,t.runtimeState="snapped",t.dragTarget.set(i.worldPosition.x,i.worldPosition.y,i.worldPosition.z),t.group.position.set(i.worldPosition.x,i.worldPosition.y,i.worldPosition.z),t.velocity.set(0,0,0),this.slotSystem.activate(e),this.slotSystem.isUnlocked()?(this.unlockCallbacks.forEach(n=>n()),!0):!1)}clearSlotPreview(){this.slotPreviewIds.clear()}getPresentationProjectId(){var e;return((e=this.entityList.find(t=>t.project.role==="presentation"))==null?void 0:e.project.id)??null}getDragThreshold(e){const t=this.entities.get(e);return t?t.project.role==="presentation"?3:t.snapped?4:8:8}getCurrentShardPositions(){return this.entityList.map(e=>e.group.position.clone())}getGameFieldCapacity(){return this.entityList.length+this.gameFieldEntities.length}ensureGameFieldCapacity(e){const t=Math.max(0,e-this.entityList.length);for(;this.gameFieldEntities.length<t;)this.gameFieldEntities.push(this.createGameFieldShard(this.gameFieldEntities.length))}getOrbitPositions(){return this.entityList.map((e,t)=>this.computeOrbitTarget(e,this.globalOrbitTime,t===this.activeIndex))}getSlotPositions(){return this.entityList.map(e=>{const t=this.slotSystem.getSlotForShard(e.project.id);return t?new w(t.worldPosition.x,t.worldPosition.y,t.worldPosition.z):e.group.position.clone()})}beginExternalLayoutTransition(e,t,i){this.externalLayoutActive=!0,this.externalLayoutPositions=null,this.externalLayoutScales=t?[...t]:null,this.externalLayoutVisuals=i?i.map(n=>({scale:n.scale.clone(),shapeKind:n.shapeKind,spinDirection:n.spinDirection,spinSpeed:n.spinSpeed,spinPhase:n.spinPhase,tint:n.tint,pulse:n.pulse,deformAngle:n.deformAngle,deformStrength:n.deformStrength,deformDensity:n.deformDensity})):null,this.externalTransitionFrom=this.getCurrentShardPositions(),this.externalTransitionTo=e.map(n=>n.clone()),this.externalTransitionProgress=0}setExternalLayoutProgress(e){this.externalTransitionProgress=e}setExternalLayoutPositions(e,t,i){this.externalLayoutActive=!0,this.externalLayoutPositions=e.map(n=>n.clone()),this.externalLayoutScales=t?[...t]:null,this.externalLayoutVisuals=i?i.map(n=>({scale:n.scale.clone(),shapeKind:n.shapeKind,spinDirection:n.spinDirection,spinSpeed:n.spinSpeed,spinPhase:n.spinPhase,tint:n.tint,pulse:n.pulse,deformAngle:n.deformAngle,deformStrength:n.deformStrength,deformDensity:n.deformDensity})):null}clearExternalLayout(){this.externalLayoutActive=!1,this.externalLayoutPositions=null,this.externalLayoutScales=null,this.externalLayoutVisuals=null,this.externalTransitionFrom=[],this.externalTransitionTo=[],this.externalTransitionProgress=0,this.gameFieldEntities.forEach(e=>{e.group.visible=!1,e.hiddenUntil=0})}releaseSnappedShards(){this.entityList.forEach(e=>{e.snapped=!1,this.slotSystem.getSlotForShard(e.project.id)&&this.slotSystem.deactivate(e.project.id),!this.focusedId&&e.runtimeState!=="dragging"&&(e.runtimeState="orbiting")})}resetPortfolioState(){this.hoveredId=null,this.focusedId=null,this.draggingId=null,this.focusSettled=!1,this.clearExternalLayout(),this.clearSlotPreview(),this.entityList.forEach(e=>{e.snapped=!1,e.runtimeState="orbiting",e.manualRotationY=0,e.hoverAmount=0,e.dragAmount=0,e.focusAmount=0,e.opacity=1,e.slotPulse=0,e.facetAnimation={active:!1,direction:1,progress:0,swapped:!1},e.hiddenUntil=0,e.dragTarget.copy(e.group.position),e.dragOffset.set(0,0,0),e.velocity.set(0,0,0)}),this.updateConstellationLines()}setVisible(e){this.root.visible=e,this.backgroundPoints.visible=e}update(e,t,i){if(this.globalOrbitTime+=e,this.backgroundPoints.rotation.z+=e*.012,this.backgroundPoints.rotation.y+=e*.02,this.syncLivePivot(t),this.speedAccentTimer-=e,this.speedAccentTimer<=0)if(this.speedAccentId)this.speedAccentId=null,this.speedAccentTimer=28+Math.random()*20;else{const n=this.entityList.filter(o=>o.project.role==="project"),r=n[Math.floor(Math.random()*n.length)];this.speedAccentId=(r==null?void 0:r.project.id)??null,this.speedAccentTimer=8+Math.random()*6}if(this.entityList.forEach((n,r)=>{var S,E,U,B,Q,I,k,V,Y,J,Z,K,re,oe,W;const o=n.project.id===this.focusedId,a=n.project.id===this.draggingId,c=r===this.activeIndex,l=this.slotSystem.getSlotForShard(n.project.id),h=this.slotPreviewIds.has(n.project.id);n.orbitBoostTarget=this.speedAccentId===n.project.id?1.055:1,n.orbitBoost=Me(n.orbitBoost,n.orbitBoostTarget,.55,e);let d=this.computeOrbitTarget(n,t,c),p=c?1.1:1,g=this.focusedId?o?1:.26:1,_=n.snapped?"snapped":"orbiting";if(n.slotPulse=Me(n.slotPulse,l!=null&&l.activated?1:this.slotSystem.getProximity(n.project.id,n.group.position),10,e),l&&(n.slotIndicator.position.set(l.worldPosition.x,l.worldPosition.y,l.worldPosition.z),n.slotIndicator.material.opacity=this.externalLayoutActive?0:n.slotPulse*(l.activated?.82:.52),n.slotIndicator.scale.setScalar(.8+n.slotPulse*.35+Math.sin(t*3+r)*.03)),this.externalLayoutActive){const X=((S=this.externalLayoutVisuals)==null?void 0:S[r])??null;if((E=this.externalLayoutPositions)!=null&&E[r]?d=this.externalLayoutPositions[r]:this.externalTransitionFrom[r]&&this.externalTransitionTo[r]&&(d=this.externalTransitionFrom[r].clone().lerp(this.externalTransitionTo[r],this.externalTransitionProgress)),this.externalLayoutPositions&&n.group.position.distanceToSquared(d)>14*14&&(n.group.position.copy(d),n.hiddenUntil=t+.08),p=(X==null?void 0:X.scale.x)??((U=this.externalLayoutScales)==null?void 0:U[r])??1.02,g=1,_="orbiting",X){n.group.rotation.x=Me(n.group.rotation.x,0,9,e),n.group.rotation.y=Me(n.group.rotation.y,0,9,e),n.group.rotation.z=Me(n.group.rotation.z,X.shapeKind==="round"?0:X.spinPhase,8,e);const ue=this.getGameGeometry(X.shapeKind);n.core.geometry!==ue&&(n.core.geometry=ue),n.group.scale.x=Me(n.group.scale.x,X.scale.x,6,e),n.group.scale.y=Me(n.group.scale.y,X.scale.y,6,e),n.group.scale.z=Me(n.group.scale.z,X.scale.z,6,e),X.tint?(n.core.material.color.set(X.tint),n.core.material.emissive.set(X.tint)):on(n.core.material,this.theme)}else n.core.geometry!==this.roundGeometry&&(n.core.geometry=this.roundGeometry,on(n.core.material,this.theme))}else a?(d=n.dragTarget,p=1.06,_="dragging"):n.snapped?(d=new w(l.worldPosition.x,l.worldPosition.y,l.worldPosition.z),p=1.08,_="snapped"):h&&l?(d=new w(l.worldPosition.x,l.worldPosition.y,l.worldPosition.z),p=1.04,_="snapped"):o&&(d=this.focusTargetPosition,p=2.55,_=i==="focus_exit"?"focus_exit":i==="focus"?"focused":"focus_enter");n.runtimeState==="focus_exit"&&!this.focusedId?(n.focusAmount=Me(n.focusAmount,0,10,e),n.focusAmount<.05&&(n.runtimeState=n.snapped?"snapped":"orbiting")):n.runtimeState=_;const m=a?18:o?14:n.snapped?13:6.5;n.group.position.x=Me(n.group.position.x,d.x,m,e),n.group.position.y=Me(n.group.position.y,d.y,m,e),n.group.position.z=Me(n.group.position.z,d.z,m,e);const f=this.hoveredId===n.project.id&&!this.focusedId&&!a?1:0,b=a?1:0,v=o?1:0;if(n.hoverAmount=Me(n.hoverAmount,f,10,e),n.dragAmount=Me(n.dragAmount,b,12,e),n.focusAmount=Me(n.focusAmount,v,10,e),n.opacity=Me(n.opacity,g,9,e),n.group.visible=t>=n.hiddenUntil,n.facetAnimation.active){n.facetAnimation.progress=Math.min(1,n.facetAnimation.progress+e*1.8);const X=Math.sin(n.facetAnimation.progress*Math.PI)*Math.PI*.92*n.facetAnimation.direction;n.manualRotationY=X,!n.facetAnimation.swapped&&n.facetAnimation.progress>=.5&&(n.activeFacet=Cs(n.activeFacet+n.facetAnimation.direction,n.project.facets.length),n.facetAnimation.swapped=!0),n.facetAnimation.progress>=1&&(n.facetAnimation.active=!1,n.manualRotationY=0)}else n.manualRotationY=Me(n.manualRotationY,0,14,e);const y=o?0:n.group.rotation.x+e*(.11+r*.001),R=o?n.manualRotationY:n.group.rotation.y+e*(.18+r*.002),P=o?0:n.group.rotation.z+e*(.08+r*.0015);this.externalLayoutActive||(n.group.rotation.x=Me(n.group.rotation.x,y,o?12:2,e),n.group.rotation.y=Me(n.group.rotation.y,R,o?12:2,e),n.group.rotation.z=Me(n.group.rotation.z,P,o?12:2,e));const C=o?.06:n.snapped?.96:1;this.externalLayoutActive||(n.hiddenUntil=0,n.core.geometry!==this.roundGeometry&&(n.core.geometry=this.roundGeometry),n.group.scale.x=Me(n.group.scale.x,p,8,e),n.group.scale.y=Me(n.group.scale.y,p,8,e),n.group.scale.z=Me(n.group.scale.z,p*C,8,e)),n.core.material.opacity=n.opacity,n.core.material.emissiveIntensity=.08+n.hoverAmount*.18+(c?.08:0)+n.slotPulse*.06+(((Q=(B=this.externalLayoutVisuals)==null?void 0:B[r])==null?void 0:Q.pulse)??0);const N=((k=(I=this.externalLayoutVisuals)==null?void 0:I[r])==null?void 0:k.shapeKind)??null;Dr(n.core.material,{time:t,hover:n.hoverAmount,drag:n.dragAmount,focus:n.focusAmount,settled:this.externalLayoutActive?N&&N!=="round"?.16:0:n.focusAmount*.25,snap:this.externalLayoutActive?((Y=(V=this.externalLayoutVisuals)==null?void 0:V[r])==null?void 0:Y.fragmentAmount)??0:n.snapped||h?.96+n.slotPulse*.22:0,orbitAngle:((Z=(J=this.externalLayoutVisuals)==null?void 0:J[r])==null?void 0:Z.deformAngle)??0,orbitPulse:this.externalLayoutActive?((re=(K=this.externalLayoutVisuals)==null?void 0:K[r])==null?void 0:re.deformStrength)??0:0,waveDensity:this.externalLayoutActive?((W=(oe=this.externalLayoutVisuals)==null?void 0:oe[r])==null?void 0:W.deformDensity)??.72:n.snapped||h?1.56:.42}),n.logoPlanes.forEach((X,ue)=>{const ye=this.externalLayoutActive||this.focusedId?0:n.opacity;X.material.opacity=ye*(.65+ue*.1)})}),this.updateGameFieldEntities(e,t),this.updateConstellationLines(),this.focusedId){const n=this.entities.get(this.focusedId);this.focusSettled=!!(n&&Math.abs(n.group.position.x-this.focusTargetPosition.x)<.05&&Math.abs(n.group.position.y-this.focusTargetPosition.y)<.05&&Math.abs(n.group.position.z-this.focusTargetPosition.z)<.05&&Math.abs(n.group.scale.x-2.55)<.05)}else this.focusSettled=!1}updateGameFieldEntities(e,t){if(!this.externalLayoutActive){this.gameFieldEntities.forEach((i,n)=>{if(n>=An){i.group.visible=!1,i.hiddenUntil=0;return}const r=i.orbitPhase+t*i.orbitSpeed,o=i.anchor.x+Math.cos(r)*i.orbitRadius,a=i.anchor.y+Math.sin(r*.82)*i.orbitRadius*.9,c=i.anchor.z+Math.sin(r)*i.orbitRadius*.72;i.group.visible=!0,i.group.position.x=Me(i.group.position.x,o,4.6,e),i.group.position.y=Me(i.group.position.y,a,4.6,e),i.group.position.z=Me(i.group.position.z,c,4.6,e),i.group.rotation.x=Me(i.group.rotation.x,i.group.rotation.x+e*.18,2,e),i.group.rotation.y=Me(i.group.rotation.y,i.group.rotation.y+e*.24,2,e),i.group.rotation.z=Me(i.group.rotation.z,i.group.rotation.z+e*.14,2,e),i.group.scale.setScalar(Me(i.group.scale.x,.18+Math.sin(t*1.8+n)*.012,6,e)),i.core.material.opacity=this.focusedId?.1:.22,i.core.material.emissiveIntensity=this.focusedId?.02:.06,on(i.core.material,this.theme),Dr(i.core.material,{time:t,hover:0,drag:0,focus:0,settled:0,snap:0,orbitAngle:r,orbitPulse:.08,waveDensity:.36})});return}this.gameFieldEntities.forEach((i,n)=>{var p,g;const r=this.entityList.length+n,o=this.externalTransitionTo[r]??null,a=((p=this.externalLayoutPositions)==null?void 0:p[r])??(o?i.group.position.clone().lerp(o,this.externalTransitionProgress):null),c=((g=this.externalLayoutVisuals)==null?void 0:g[r])??null;if((!a||!c)&&!o){i.group.visible=!1;return}const l=a??o??i.group.position;this.externalLayoutPositions&&i.group.position.distanceToSquared(l)>14*14&&(i.group.position.copy(l),i.hiddenUntil=t+.08),i.group.visible=t>=i.hiddenUntil,i.group.position.x=Me(i.group.position.x,l.x,7.2,e),i.group.position.y=Me(i.group.position.y,l.y,7.2,e),i.group.position.z=Me(i.group.position.z,l.z,7.2,e),i.group.rotation.x=Me(i.group.rotation.x,0,8,e),i.group.rotation.y=Me(i.group.rotation.y,0,8,e);const h=(c==null?void 0:c.shapeKind)??"round",u=(c==null?void 0:c.scale)??new w(.22,.22,.22);i.group.rotation.z=Me(i.group.rotation.z,h==="round"?0:(c==null?void 0:c.spinPhase)??0,8,e),i.group.scale.x=Me(i.group.scale.x,u.x,6,e),i.group.scale.y=Me(i.group.scale.y,u.y,6,e),i.group.scale.z=Me(i.group.scale.z,u.z,6,e);const d=this.getGameGeometry(h);i.core.geometry!==d&&(i.core.geometry=d),c!=null&&c.tint?(i.core.material.color.set(c.tint),i.core.material.emissive.set(c.tint)):on(i.core.material,this.theme),i.core.material.opacity=1,i.core.material.emissiveIntensity=.08+((c==null?void 0:c.pulse)??.06),Dr(i.core.material,{time:t,hover:0,drag:0,focus:0,settled:h==="round"?0:.16,snap:(c==null?void 0:c.fragmentAmount)??0,orbitAngle:(c==null?void 0:c.deformAngle)??0,orbitPulse:(c==null?void 0:c.deformStrength)??0,waveDensity:(c==null?void 0:c.deformDensity)??.72})})}syncLivePivot(e){const t=this.entityList.find(i=>i.project.role==="presentation");if(!t){this.pivot.set(0,0,0);return}this.pivot.set(t.layoutAnchor.x,t.layoutAnchor.y,t.layoutAnchor.z)}computeOrbitTarget(e,t,i){const n=e.orbitPhase+t*e.orbitSpeed*e.orbitBoost,r=e.layoutAnchor.clone();if(e.project.role==="presentation")return new w(this.pivot.x+Math.cos(n)*1.9,this.pivot.y+Math.sin(n*.85)*.72,this.pivot.z+Math.sin(n)*2.6+(i?.35:0));if(e.project.role==="hint")return new w(this.pivot.x+Math.sin(n*.42)*.45,this.pivot.y+Math.cos(n)*5.05,this.pivot.z+Math.sin(n)*4.2+(i?.24:0));const a=Math.atan2(r.y,r.x||1e-4)+n,c=4.1+Math.abs(r.x)*.6+Math.abs(r.y)*.2,l=qt.clamp(r.y*.05,-.36,.36),h=Math.cos(a)*c,u=Math.sin(a)*c,d=new w(this.pivot.x+h,this.pivot.y+r.y*.78+Math.sin(a*1.1+e.orbitHeight)*.55+u*l*.16,this.pivot.z+u+r.z*.45);return i&&(d.z+=.38),d}createShard(e,t){const i=new kt,n=Ng(t),r=new w(n.x,n.y,n.z),o=Math.max(1,this.slotSystem.getSlots().length);i.position.copy(r),this.root.add(i);const a=this.roundGeometry,c=Mc(this.theme,t*17+11),l=new vt(a,c);l.userData.shardId=e.id,i.add(l),this.pickTargets.push(l);const h=new vt(new ho(1,1.18,36),new ii({color:this.theme==="dark"?"#D4BF9B":"#393F4A",transparent:!0,opacity:0,side:Yt,depthWrite:!1}));h.visible=!0,this.root.add(h);const u={project:e,group:i,core:l,logoPlanes:[],layoutAnchor:r,orbitRadius:r.length(),orbitPhase:t/o*Math.PI*2,orbitSpeed:e.role==="presentation"?.34:e.role==="hint"?.58:.38+t*.012,orbitBoost:1,orbitBoostTarget:1,orbitHeight:t*.9,orbitDepth:t*.55,velocity:new w,dragTarget:new w,dragOffset:new w,hoverAmount:0,dragAmount:0,focusAmount:0,opacity:1,activeFacet:0,runtimeState:"orbiting",snapped:!1,slotIndicator:h,slotPulse:0,manualRotationY:0,facetAnimation:{active:!1,direction:1,progress:0,swapped:!1},hiddenUntil:0};return this.entities.set(e.id,u),this.createLogoPlanes(u),u}createGameFieldShard(e){const t=new kt;t.visible=!1,this.root.add(t);const i=Mc(this.theme,900+e*23),n=new vt(this.roundGeometry,i);t.add(n);const r=this.getGameFieldAnchor(e);return{group:t,core:n,anchor:r,orbitPhase:e*.37,orbitSpeed:.32+e%7*.018,orbitRadius:.22+e%4*.06,hiddenUntil:0}}getGameFieldAnchor(e){if(e>=An)return new w(0,0,0);const t=Math.ceil(An/2),i=e<t,n=i?e:e-t,r=i?t:An-t,a=(r<=1?0:n/(r-1))*2-1,c=.38+Math.abs(a)*.78,l=a*10.8,h=(i?1:-1)*a*6.6*c,u=(i?1:-1)*a*4.2;return new w(l,h,u)}createLogoPlanes(e){const t=this.theme==="dark"?e.project.logo.dark:e.project.logo.light,i=1.7*e.project.logo.scale,n=[0,Math.PI*(2/3),Math.PI*(4/3)];this.loader.load(t,r=>{r.colorSpace=dt,r.anisotropy=4,n.forEach(o=>{const a=new Vs(i,i,12,12),c=a.attributes.position;for(let u=0;u<c.count;u+=1){const d=c.getX(u),p=c.getY(u),g=Math.sqrt(d*d+p*p)/(i*.7);c.setZ(u,Math.sin(g*Math.PI*.5)*.22)}a.computeVertexNormals();const l=new ii({map:r,transparent:!0,opacity:e.project.logo.opacity,side:Yt,depthWrite:!1}),h=new vt(a,l);h.position.set(Math.sin(o)*1.48,0,Math.cos(o)*1.48),h.lookAt(0,0,0),h.userData.shardId=e.project.id,e.group.add(h),e.logoPlanes.push(h),this.pickTargets.push(h)})})}updateLogoTexture(e){const t=this.theme==="dark"?e.project.logo.dark:e.project.logo.light;this.loader.load(t,i=>{i.colorSpace=dt,e.logoPlanes.forEach(n=>{n.material.map=i,n.material.needsUpdate=!0})})}createBackgroundPoints(){const e=new yt,t=new Float32Array(240*3);for(let i=0;i<240;i+=1){const n=26+Math.random()*20,r=Math.random()*Math.PI*2,o=(Math.random()-.5)*18;t[i*3]=Math.cos(r)*n,t[i*3+1]=o,t[i*3+2]=Math.sin(r)*6-8}return e.setAttribute("position",new Rt(t,3)),new Wm(e,new tl({color:this.theme==="dark"?"#D4BF9B":"#393F4A",size:.08,transparent:!0,opacity:.35}))}createConstellationLines(){const e=()=>{const t=new yt;t.setAttribute("position",new Qe([],3));const i=new so({color:this.theme==="dark"?"#D4BF9B":"#393F4A",transparent:!0,opacity:.9}),n=new Hr(t,i);return this.root.add(n),n};return[e(),e(),e()]}updateConstellationLines(){if(this.externalLayoutActive){this.constellationLines.forEach(i=>{i.visible=!1});return}const e=this.slotSystem.getSlots();[[e[1],e[2],e[0],e[6],e[5]],[e[3],e[4],e[0],e[8],e[7]],[e[0],e[9]]].forEach((i,n)=>{const r=i.filter(Boolean).filter(c=>c.activated).map(c=>c.worldPosition),o=this.constellationLines[n];if(r.length<2){o.visible=!1,o.geometry.setAttribute("position",new Qe([],3));return}const a=new Float32Array(r.length*3);r.forEach((c,l)=>{a[l*3]=c.x,a[l*3+1]=c.y,a[l*3+2]=c.z}),o.visible=!0,o.geometry.setAttribute("position",new Rt(a,3)),o.geometry.computeBoundingSphere()})}}class _o{constructor(e){M(this,"slots");this.slots=e.map((t,i,n)=>({shardId:t,worldPosition:_o.computePosition(i,n.length),snapRadius:3.05,activated:!1}))}static computePosition(e,t){return Fg(e<t?e:0)}getSlots(){return this.slots}getSlotForShard(e){return this.slots.find(t=>t.shardId===e)||null}getProximity(e,t){const i=this.getSlotForShard(e);if(!i||i.activated)return 0;const n=uc(i.worldPosition,t);return Math.max(0,1-n/(i.snapRadius*2.75))}canSnap(e,t){const i=this.getSlotForShard(e);return!i||i.activated?null:uc(i.worldPosition,t)<=i.snapRadius?i:null}activate(e){const t=this.getSlotForShard(e);return t?(t.activated=!0,t):null}deactivate(e){const t=this.getSlotForShard(e);return t?(t.activated=!1,t):null}reset(){this.slots.forEach(e=>{e.activated=!1})}isUnlocked(){return this.slots.every(e=>e.activated)}}class T_{constructor(e,t,i,n,r){M(this,"pointerDown",!1);M(this,"downX",0);M(this,"downY",0);M(this,"lastX",0);M(this,"lastY",0);M(this,"dragged",!1);M(this,"sceneOrbiting",!1);M(this,"downShardId",null);M(this,"focusGesture",!1);M(this,"onPointerDown",e=>{const t=this.getMode();if(t==="intro"||t==="intro_shattering"||t==="intro_transition"||t==="about_section"||t==="game_transition"||t==="game"||t==="game_over")return;this.pointerDown=!0,this.dragged=!1,this.sceneOrbiting=!1,this.focusGesture=!1,this.downX=e.clientX,this.downY=e.clientY,this.lastX=e.clientX,this.lastY=e.clientY,this.canvas.setPointerCapture(e.pointerId);const i=this.world.pick(e.clientX,e.clientY,this.canvas,this.camera);this.downShardId=(i==null?void 0:i.shardId)||null,!(t==="focus"||t==="focus_facet_transition"||t==="focus_enter")&&i&&this.callbacks.onHover(i.shardId)});M(this,"onPointerMove",e=>{const t=this.getMode(),i=e.clientX-this.downX,n=e.clientY-this.downY,r=e.clientX-this.lastX,o=e.clientY-this.lastY,a=Math.hypot(i,n);if(!this.pointerDown){if(t==="orbit"||t==="dragging"||t==="constellation_complete"){const l=this.world.pick(e.clientX,e.clientY,this.canvas,this.camera);this.callbacks.onHover((l==null?void 0:l.shardId)||null)}return}if(t==="focus"||t==="focus_enter"){Math.abs(i)>12&&Math.abs(i)>Math.abs(n)&&(this.focusGesture=!0,this.callbacks.onFocusRotation(i));return}const c=this.downShardId?this.world.getDragThreshold(this.downShardId):8;if((t==="orbit"||t==="constellation_complete"||t==="dragging")&&this.downShardId&&a>c){const l=this.world.projectPointerToDragPlane(e.clientX,e.clientY,this.canvas,this.camera);if(!l)return;this.dragged||(this.dragged=this.callbacks.onDragStart(this.downShardId,l)),this.dragged&&this.callbacks.onDragMove(l);return}(t==="orbit"||t==="constellation_complete")&&!this.downShardId&&a>4&&(this.sceneOrbiting=!0,this.callbacks.onSceneOrbitMove(r,o)),this.lastX=e.clientX,this.lastY=e.clientY});M(this,"onPointerUp",e=>{const t=this.getMode(),i=Math.hypot(e.clientX-this.downX,e.clientY-this.downY);if(this.canvas.hasPointerCapture(e.pointerId)&&this.canvas.releasePointerCapture(e.pointerId),this.dragged){this.callbacks.onDragEnd(),this.reset();return}if(t==="focus"||t==="focus_enter"){if(this.focusGesture)this.callbacks.onFocusRotationEnd();else{const n=this.world.pick(e.clientX,e.clientY,this.canvas,this.camera);n&&n.shardId===this.world.getFocusedEntityId()?this.callbacks.onFocusSideTap(e.clientX<window.innerWidth/2?"left":"right"):this.callbacks.onBackgroundClick()}this.reset();return}if(this.sceneOrbiting){this.reset();return}if((t==="orbit"||t==="constellation_complete")&&i<=8){const n=this.world.pick(e.clientX,e.clientY,this.canvas,this.camera);n?this.callbacks.onShardClick(n.shardId):this.callbacks.onHover(null)}this.reset()});M(this,"onPointerLeave",()=>{this.dragged&&this.callbacks.onDragEnd(),this.callbacks.onHover(null),this.reset()});this.canvas=e,this.camera=t,this.world=i,this.getMode=n,this.callbacks=r,this.canvas.addEventListener("pointerdown",this.onPointerDown),this.canvas.addEventListener("pointermove",this.onPointerMove),this.canvas.addEventListener("pointerup",this.onPointerUp),this.canvas.addEventListener("pointerleave",this.onPointerLeave)}reset(){this.pointerDown=!1,this.dragged=!1,this.sceneOrbiting=!1,this.focusGesture=!1,this.downShardId=null,this.lastX=0,this.lastY=0}}const A_={dark:{background:new Pe("#393F4A"),foreground:new Pe("#D4BF9B")},light:{background:new Pe("#D4BF9B"),foreground:new Pe("#393F4A")}};class w_{constructor(e){M(this,"scene",new Hm);M(this,"camera",new Ot(42,1,.1,200));M(this,"renderer",new el({antialias:!0,alpha:!0,powerPreference:"high-performance"}));M(this,"cameraTarget",new w(0,.5,24));M(this,"cameraCurrent",new w(0,.5,24));M(this,"lookTarget",new w(0,0,0));M(this,"lookCurrent",new w(0,0,0));M(this,"ambientLight",new Ig(16777215,.95));M(this,"keyLight",new Lg(16777215,1.4));M(this,"rimLight",new Cg(16777215,25,80,2));M(this,"cameraPositionResponse",8);M(this,"lookResponse",8);M(this,"resize",()=>{const e=this.host.clientWidth||window.innerWidth,t=this.host.clientHeight||window.innerHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1)});this.host=e,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.domElement.className="app-canvas",this.host.appendChild(this.renderer.domElement),this.keyLight.position.set(12,10,16),this.rimLight.position.set(0,-6,22),this.scene.add(this.ambientLight,this.keyLight,this.rimLight),this.resize(),this.setTheme("dark"),window.addEventListener("resize",this.resize)}setTheme(e){const t=A_[e];this.scene.background=t.background.clone(),this.ambientLight.color.copy(t.foreground),this.keyLight.color.copy(t.foreground),this.rimLight.color.copy(t.foreground)}setCameraTarget(e,t){this.cameraTarget.copy(e),this.lookTarget.copy(t)}setCameraResponse(e,t=e){this.cameraPositionResponse=Math.max(1,e),this.lookResponse=Math.max(1,t)}update(e){this.cameraCurrent.x=Me(this.cameraCurrent.x,this.cameraTarget.x,this.cameraPositionResponse,e),this.cameraCurrent.y=Me(this.cameraCurrent.y,this.cameraTarget.y,this.cameraPositionResponse,e),this.cameraCurrent.z=Me(this.cameraCurrent.z,this.cameraTarget.z,this.cameraPositionResponse,e),this.lookCurrent.x=Me(this.lookCurrent.x,this.lookTarget.x,this.lookResponse,e),this.lookCurrent.y=Me(this.lookCurrent.y,this.lookTarget.y,this.lookResponse,e),this.lookCurrent.z=Me(this.lookCurrent.z,this.lookTarget.z,this.lookResponse,e),this.rimLight.position.z=this.cameraCurrent.z-2,this.camera.position.copy(this.cameraCurrent),this.camera.lookAt(this.lookCurrent)}render(){this.renderer.render(this.scene,this.camera)}projectWorldToScreen(e){const t=e.clone().project(this.camera);return{x:(t.x+1)*.5*(this.host.clientWidth||window.innerWidth),y:(1-t.y)*.5*(this.host.clientHeight||window.innerHeight),visible:t.z>=-1&&t.z<=1}}}const an={title:{fr:"À propos",en:"About"},paragraphs:[{fr:"Passionné par la création sous toutes ses formes, je combine développement web, réalisation audiovisuelle, montage vidéo et design graphique pour donner vie à des projets uniques.",en:"Passionate about creation in all its forms, I combine web development, audiovisual production, video editing, and graphic design to bring unique projects to life."},{fr:"Mon approche multidisciplinaire me permet de créer des expériences complètes, de la conception à la réalisation.",en:"My multidisciplinary approach allows me to create complete experiences, from concept to delivery."}],skills:[{title:{fr:"Développement",en:"Development"},body:{fr:"JavaScript, React, Three.js, Node.js, Ruby on Rails",en:"JavaScript, React, Three.js, Node.js, Ruby on Rails"}},{title:{fr:"Réalisation",en:"Production"},body:{fr:"Direction artistique, scénarisation, storyboarding",en:"Art direction, scriptwriting, storyboarding"}},{title:{fr:"Vidéo",en:"Video"},body:{fr:"Montage, motion design, VFX, color grading",en:"Editing, motion design, VFX, color grading"}},{title:{fr:"Graphisme",en:"Design"},body:{fr:"UI/UX, branding, illustration, design system",en:"UI/UX, branding, illustration, design systems"}}],contactTitle:{fr:"Contact",en:"Contact"},contactText:{fr:"Intéressé par une collaboration ? N’hésitez pas à me contacter.",en:"Interested in collaborating? Feel free to reach out."}},P_=[{id:"email",href:"mailto:contact.bheall@gmail.com",label:{fr:"Email",en:"Email"}},{id:"github",href:"https://github.com/orgs/ApeProd",label:{fr:"GitHub",en:"GitHub"}},{id:"x",href:"https://x.com/BhealLfr",label:{fr:"X",en:"X"}}];class C_{constructor(e,t){M(this,"element");M(this,"panel");M(this,"closeButton");M(this,"isOpen",!1);M(this,"onClose",null);this.i18n=t,this.element=document.createElement("div"),this.element.className="about-layer",this.panel=document.createElement("div"),this.panel.className="about-layer__panel",this.panel.dataset.uiInteractive="true",this.closeButton=document.createElement("button"),this.closeButton.className="about-layer__close",this.closeButton.type="button",this.closeButton.addEventListener("click",()=>this.close()),this.panel.appendChild(this.closeButton),this.element.appendChild(this.panel),this.element.addEventListener("click",i=>{i.target===this.element&&this.close()}),e.appendChild(this.element),this.i18n.onChange(i=>this.render(i)),this.render(this.i18n.current)}open(){this.isOpen=!0,this.element.classList.add("is-open")}close(){var e;this.isOpen&&(this.isOpen=!1,this.element.classList.remove("is-open"),(e=this.onClose)==null||e.call(this))}get opened(){return this.isOpen}render(e){this.closeButton.textContent=this.i18n.t("close");const t=an.skills.map(r=>`
          <article class="about-layer__skill">
            <h3>${r.title[e]}</h3>
            <p>${r.body[e]}</p>
          </article>
        `).join(""),i=P_.map(r=>`
          <a class="about-layer__link" href="${r.href}" target="${r.id==="email"?"_self":"_blank"}" rel="noopener">
            ${r.label[e]}
          </a>
        `).join("");this.panel.innerHTML=`
      <button class="about-layer__close" type="button">${this.i18n.t("close")}</button>
      <h2>${an.title[e]}</h2>
      <p>${an.paragraphs[0][e]}</p>
      <p>${an.paragraphs[1][e]}</p>
      <div class="about-layer__skills">${t}</div>
      <h3>${an.contactTitle[e]}</h3>
      <p>${an.contactText[e]}</p>
      <div class="about-layer__links">${i}</div>
    `;const n=this.panel.querySelector(".about-layer__close");n&&n.addEventListener("click",()=>this.close())}}class R_{constructor(e,t,i){M(this,"element");M(this,"panel");M(this,"project",null);M(this,"facetIndex",0);M(this,"currentSlide",0);M(this,"gridView",!1);M(this,"callbacks");this.i18n=t,this.callbacks=i,this.element=document.createElement("div"),this.element.className="focus-layer",this.panel=document.createElement("div"),this.panel.className="focus-layer__panel",this.panel.dataset.uiInteractive="true",this.element.appendChild(this.panel),e.appendChild(this.element),this.element.addEventListener("click",n=>{n.target===this.element&&this.callbacks.onClose()}),this.i18n.onChange(()=>this.render())}show(e,t){this.project=e,this.facetIndex=t,this.currentSlide=0,this.gridView=!1,this.render(),this.element.classList.add("is-visible")}hide(){this.element.classList.remove("is-visible"),this.project=null}updateFacet(e){this.facetIndex=e,this.currentSlide=0,this.gridView=!1,this.render()}render(){var a,c;if(!this.project){this.panel.innerHTML="";return}const e=this.i18n.current,t=this.project.facets[this.facetIndex],i=t.images.slice(0,12),n=i[this.currentSlide]||"";this.panel.innerHTML=`
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

`).map(l=>`<p>${l}</p>`).join("")}
      </div>
      <section class="focus-layer__section">
        <h3>${this.i18n.t("technologies")}</h3>
        <div class="focus-layer__tags">
          ${t.technologies.map(l=>`<span>${l[e]}</span>`).join("")}
        </div>
      </section>
      <section class="focus-layer__section">
        <h3>${this.i18n.t("links")}</h3>
        <div class="focus-layer__links">
          ${this.renderLinks()}
        </div>
      </section>
    `;const r=this.panel.querySelector(".focus-layer__close"),o=this.panel.querySelectorAll(".focus-layer__facet-btn");r==null||r.addEventListener("click",()=>this.callbacks.onClose()),(a=o[0])==null||a.addEventListener("click",()=>this.callbacks.onPrevFacet()),(c=o[1])==null||c.addEventListener("click",()=>this.callbacks.onNextFacet()),this.bindMediaEvents(i)}renderMedia(e,t){return e.length===0?`<div class="focus-layer__empty">${this.i18n.t("media")}</div>`:e.length===1?`<img class="focus-layer__image" src="${e[0]}" alt="Project media">`:this.gridView?`
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
    `}renderLinks(){if(!this.project)return"";const e=this.project.facets[this.facetIndex],t=Object.entries(e.links).filter(([,i])=>i);return t.length===0?`<span class="focus-layer__empty">${this.i18n.t("links")}</span>`:t.map(([i,n])=>`<a class="focus-layer__link" href="${n}" target="_blank" rel="noopener">${i.toUpperCase()}</a>`).join("")}bindMediaEvents(e){if(e.length<=1)return;const t=this.panel.querySelector(".focus-layer__image"),i=this.panel.querySelectorAll(".focus-layer__slide-nav"),n=this.panel.querySelectorAll(".focus-layer__thumb");t==null||t.addEventListener("click",()=>{this.gridView=!0,this.render()}),i.forEach(r=>r.addEventListener("click",()=>{const o=Number(r.dataset.slideDir)||0;this.currentSlide=(this.currentSlide+o+e.length)%e.length,this.render()})),n.forEach(r=>r.addEventListener("click",()=>{this.currentSlide=Number(r.dataset.slide)||0,this.gridView=!1,this.render()}))}}class L_{constructor(e,t){M(this,"element");M(this,"titleElement");M(this,"bodyElement");M(this,"currentStep","intro");this.host=e,this.i18n=t,this.element=document.createElement("div"),this.element.className="guide-bubble",this.titleElement=document.createElement("p"),this.titleElement.className="guide-bubble__title",this.bodyElement=document.createElement("p"),this.bodyElement.className="guide-bubble__body",this.element.append(this.titleElement,this.bodyElement),this.host.appendChild(this.element),this.i18n.onChange(()=>this.render()),this.render()}setStep(e){e!==this.currentStep&&(this.currentStep=e,this.render())}render(){const e=this.currentStep==="unlocked"?this.i18n.t("unlocked"):this.i18n.t("home"),t={intro:this.i18n.t("introHint"),orbit:this.i18n.t("orbitHint"),focus:this.i18n.t("focusHint"),drag:this.i18n.t("dragHint"),slots:this.i18n.t("slotHint"),unlocked:this.i18n.t("unlockedHint")}[this.currentStep];this.titleElement.textContent=e,this.bodyElement.textContent=t}}const I_={fr:{theme:"Thème",language:"Langue",about:"About / Outro",backToOrbit:"Retour à l’orbite",unlocked:"Mini-jeu débloqué",locked:"Mini-jeu verrouillé",close:"Fermer",previous:"Précédent",next:"Suivant",technologies:"Technologies",links:"Liens",media:"Médias",clickToGrid:"Cliquez sur le média pour afficher la grille.",introTitle:"Portfolio",introSubtitle:"Bilel Kharbouche",introHint:"Cliquez plusieurs fois pour fissurer la surface.",orbitHint:"Cliquez une shard pour la mettre en focus.",focusHint:"Glissez horizontalement ou utilisez les flèches pour changer de facette.",dragHint:"Faites glisser une shard hors focus pour chercher sa place secrète.",slotHint:"La bonne place réagit quand la bonne shard s’en approche.",unlockedHint:"Toutes les shards sont placées. Le mini-jeu est prêt à être branché.",aboutTitle:"About / Outro",home:"Accueil",gameScore:"Score",gameBest:"Meilleur score",gameBestDistance:"Meilleure distance",gameChain:"Chaîne",gameMomentum:"Momentum",gameCharge:"Charge",gameDistance:"Distance",gameCoins:"Pièces",gameSplits:"Splits",gameRestart:"Recommencer",gamePortfolio:"Portfolio",gameStatusTransition:"Le chemin s’aligne.",gameStatusRunning:"Maintenez bas pour charger. Haut pour sauter.",gameStatusUpgrade:"Sautez vers une branche pour choisir votre item.",gameStatusGameOver:"Run terminée.",gameUpgradeTitle:"Choisissez une amélioration",gameUpgradeHint:"Sautez vers une branche. 1, 2, 3 restent disponibles en secours.",gameShopTitle:"Marché orbital",gameShopHint:"Tournez autour de la shard pour acheter une offre.",gamePathLeft:"Voie gauche",gamePathCenter:"Voie centrale",gamePathRight:"Voie droite",gamePathUpper:"Voie haute",gamePathForward:"Voie frontale",gamePathLower:"Voie basse",gameShopOffer:"Offre orbitale",gamePrice:"Prix",gameOverTitle:"Game Over",gameOverBody:"La caméra vous a dépassé ou la trajectoire a été manquée.",gameAcquired:"Objet acquis"},en:{theme:"Theme",language:"Language",about:"About / Outro",backToOrbit:"Back to orbit",unlocked:"Mini-game unlocked",locked:"Mini-game locked",close:"Close",previous:"Previous",next:"Next",technologies:"Technologies",links:"Links",media:"Media",clickToGrid:"Click the media to open the grid.",introTitle:"Portfolio",introSubtitle:"Bilel Kharbouche",introHint:"Click repeatedly to fracture the surface.",orbitHint:"Click a shard to focus it.",focusHint:"Swipe or drag horizontally to change facets.",dragHint:"Drag a shard outside focus to look for its hidden slot.",slotHint:"The correct slot reacts when the correct shard gets close.",unlockedHint:"All shards are placed. The mini-game hook is ready.",aboutTitle:"About / Outro",home:"Home",gameScore:"Score",gameBest:"Best",gameBestDistance:"Best distance",gameChain:"Chain",gameMomentum:"Momentum",gameCharge:"Charge",gameDistance:"Distance",gameCoins:"Coins",gameSplits:"Splits",gameRestart:"Restart",gamePortfolio:"Portfolio",gameStatusTransition:"Aligning the path.",gameStatusRunning:"Hold Down to charge. Press Up to jump.",gameStatusUpgrade:"Jump into a branch to claim an item.",gameStatusGameOver:"Run over.",gameUpgradeTitle:"Choose an upgrade",gameUpgradeHint:"Jump into a branch. 1, 2, 3 remain available as fallback.",gameShopTitle:"Orbital market",gameShopHint:"Rotate around the shard to buy one offer.",gamePathLeft:"Left path",gamePathCenter:"Center path",gamePathRight:"Right path",gamePathUpper:"Upper path",gamePathForward:"Forward path",gamePathLower:"Lower path",gameShopOffer:"Orbital offer",gamePrice:"Price",gameOverTitle:"Game Over",gameOverBody:"The camera overtook you or the jump line was lost.",gameAcquired:"Item acquired"}};class D_{constructor(){M(this,"language");M(this,"listeners",new Set);const e=window.localStorage.getItem("portfolio-language");this.language=e==="en"?"en":"fr",document.documentElement.lang=this.language}get current(){return this.language}toggle(){this.language=this.language==="fr"?"en":"fr",window.localStorage.setItem("portfolio-language",this.language),document.documentElement.lang=this.language,this.listeners.forEach(e=>e(this.language))}t(e){return I_[this.language][e]}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}}class U_{constructor(e,t,i,n){M(this,"element");M(this,"topbar");M(this,"activeChip");M(this,"themeButton");M(this,"languageButton");M(this,"aboutButton");M(this,"homeButton");M(this,"unlockChip");M(this,"dots",[]);this.i18n=t,this.content=i,this.element=document.createElement("div"),this.element.className="navigation-hud",this.topbar=document.createElement("div"),this.topbar.className="navigation-hud__topbar",this.activeChip=document.createElement("div"),this.activeChip.className="navigation-hud__chip",this.themeButton=this.createButton(()=>n.onThemeToggle()),this.languageButton=this.createButton(()=>n.onLanguageToggle()),this.aboutButton=this.createButton(()=>n.onAboutToggle()),this.homeButton=this.createButton(()=>n.onHome()),this.unlockChip=document.createElement("div"),this.unlockChip.className="navigation-hud__chip navigation-hud__chip--status",this.topbar.append(this.activeChip,this.homeButton,this.themeButton,this.languageButton,this.aboutButton,this.unlockChip);const r=document.createElement("div");r.className="navigation-hud__rail",this.content.getProjects().forEach((o,a)=>{const c=document.createElement("button");c.className="navigation-hud__dot",c.type="button",c.addEventListener("click",()=>n.onProjectSelect(a)),r.appendChild(c),this.dots.push(c)}),this.element.append(this.topbar,r),e.appendChild(this.element),this.i18n.onChange(()=>this.renderStatic()),this.renderStatic()}setActiveProject(e,t){const i=this.content.getProjectByOrder(e);this.activeChip.textContent=i?i.title[t]:"",this.dots.forEach((n,r)=>{var o;n.classList.toggle("is-active",r===e),n.title=((o=this.content.getProjectByOrder(r))==null?void 0:o.title[t])||""})}setUnlocked(e){this.unlockChip.textContent=e?this.i18n.t("unlocked"):this.i18n.t("locked"),this.unlockChip.classList.toggle("is-unlocked",e)}setAboutOpen(e){this.aboutButton.classList.toggle("is-active",e)}createButton(e){const t=document.createElement("button");return t.className="navigation-hud__button",t.type="button",t.addEventListener("click",e),t}renderStatic(){this.themeButton.textContent=this.i18n.t("theme"),this.languageButton.textContent=this.i18n.t("language"),this.aboutButton.textContent=this.i18n.t("about"),this.homeButton.textContent=this.i18n.t("home")}}class N_{constructor(){M(this,"theme");M(this,"listeners",new Set);const e=window.localStorage.getItem("portfolio-theme");e==="dark"||e==="light"?this.theme=e:this.theme=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",this.applyTheme()}get current(){return this.theme}toggle(){this.theme=this.theme==="dark"?"light":"dark",this.applyTheme()}set(e){e!==this.theme&&(this.theme=e,this.applyTheme())}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}applyTheme(){document.documentElement.dataset.theme=this.theme,window.localStorage.setItem("portfolio-theme",this.theme),this.listeners.forEach(e=>e(this.theme))}}const F_={intro:["intro_shattering"],intro_shattering:["intro_transition"],intro_transition:["orbit"],orbit:["dragging","focus_enter","about_section","constellation_complete","game_transition"],dragging:["orbit","constellation_complete","game_transition"],focus_enter:["focus","focus_exit"],focus:["focus_facet_transition","focus_exit"],focus_facet_transition:["focus"],focus_exit:["orbit","constellation_complete"],about_section:["orbit","constellation_complete"],constellation_complete:["focus_enter","about_section","orbit","game_transition"],game_transition:["game","orbit","constellation_complete"],game:["game_over","orbit","game_transition"],game_over:["game","orbit","game_transition"]};class O_{constructor(){M(this,"mode","intro");M(this,"listeners",new Set)}get current(){return this.mode}is(e){return this.mode===e}canTransition(e){return e===this.mode?!0:F_[this.mode].includes(e)}setMode(e){if(!this.canTransition(e))throw new Error(`Invalid mode transition from ${this.mode} to ${e}`);if(e===this.mode)return;const t=this.mode;this.mode=e,this.listeners.forEach(i=>i(e,t))}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}}class k_{constructor(e){M(this,"running",!1);M(this,"frameId",0);M(this,"lastTime",0);M(this,"tick",e=>{if(!this.running)return;const t=Math.min((e-this.lastTime)/1e3,.1);this.lastTime=e,this.onFrame(t,e/1e3),this.frameId=requestAnimationFrame(this.tick)});this.onFrame=e}start(){this.running||(this.running=!0,this.lastTime=performance.now(),this.frameId=requestAnimationFrame(this.tick))}stop(){this.running=!1,cancelAnimationFrame(this.frameId)}}const B_={linear:s=>s,easeOutCubic:s=>1-Math.pow(1-s,3),easeInOutCubic:s=>s<.5?4*s*s*s:1-Math.pow(-2*s+2,3)/2,easeOutQuint:s=>1-Math.pow(1-s,5)};class z_{constructor(){M(this,"tweens",new Map);M(this,"nextId",1)}animate(e){const t=this.nextId++,i={id:t,elapsed:0,...e};return i.onUpdate(i.from),this.tweens.set(t,i),t}cancel(e){this.tweens.delete(e)}clear(){this.tweens.clear()}update(e){var t;for(const i of this.tweens.values()){i.elapsed+=e;const n=Math.min(1,i.elapsed/i.duration),r=B_[i.easing](n);i.onUpdate(i.from+(i.to-i.from)*r),n>=1&&(this.tweens.delete(i.id),(t=i.onComplete)==null||t.call(i))}}}class G_{constructor(e){M(this,"content",new qg);M(this,"theme",new N_);M(this,"i18n",new D_);M(this,"mode",new O_);M(this,"transitions",new z_);M(this,"root");M(this,"canvasHost");M(this,"uiHost");M(this,"renderer");M(this,"slotSystem");M(this,"world");M(this,"intro");M(this,"guide");M(this,"hud");M(this,"about");M(this,"focus");M(this,"gameHud");M(this,"game");M(this,"interaction");M(this,"loop");M(this,"cameraOrbit",new __);M(this,"introStartCameraPosition",new w(0,1.6,42));M(this,"introStartLookAt",new w(0,0,0));M(this,"cameraFocusBlend",0);M(this,"introTransitionProgress",0);M(this,"gameTransitionProgress",0);M(this,"activeIndex",0);M(this,"lastWheelAt",0);M(this,"hasFocused",!1);M(this,"hasChangedFacet",!1);M(this,"hasDragged",!1);M(this,"seenFacetsByProject",new Map);M(this,"pendingPostFocusExit",null);M(this,"didRunIntroPresentationFocus",!1);M(this,"gameTransitionTweenId",null);M(this,"mobileChargePointerId",null);M(this,"mobileChargeStartY",0);M(this,"mobileChargeStartedAt",0);M(this,"onWheel",e=>{(this.mode.is("orbit")||this.mode.is("constellation_complete"))&&(Date.now()-this.lastWheelAt<120||(this.lastWheelAt=Date.now(),e.preventDefault(),this.stepActiveIndex(e.deltaY>0?1:-1)))});M(this,"onKeyDown",e=>{if(this.mode.is("game_transition")){e.key==="Escape"&&(e.preventDefault(),this.exitGame());return}if(this.mode.is("game")||this.mode.is("game_over")){if(e.key==="Escape"){e.preventDefault(),this.exitGame();return}if(this.mode.is("game")){if(this.game.getHudState().state==="upgrade_choice"&&(e.key==="1"||e.key==="2"||e.key==="3")){e.preventDefault(),this.game.selectUpgradeFallback(Number(e.key)-1)&&this.refreshUI();return}e.key==="ArrowDown"?(e.preventDefault(),this.game.setChargeActive(!0)):e.key==="ArrowUp"&&(e.preventDefault(),this.game.triggerJump());return}(e.key==="Enter"||e.key===" "||e.key==="ArrowUp")&&(e.preventDefault(),this.restartGame());return}if(!(this.mode.is("intro")||this.mode.is("intro_shattering")||this.mode.is("intro_transition"))){if(e.key==="Escape"){this.about.opened?this.about.close():this.exitFocus();return}if(this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition")){e.key==="ArrowLeft"?(e.preventDefault(),this.changeFacet(-1)):e.key==="ArrowRight"&&(e.preventDefault(),this.changeFacet(1));return}if(this.mode.is("orbit")||this.mode.is("constellation_complete")){if(e.key==="ArrowLeft"||e.key==="ArrowUp")e.preventDefault(),this.stepActiveIndex(-1);else if(e.key==="ArrowRight"||e.key==="ArrowDown")e.preventDefault(),this.stepActiveIndex(1);else if(e.key==="Enter"||e.key===" "){e.preventDefault();const t=this.content.getProjectByOrder(this.activeIndex);t&&this.enterFocus(t.id)}}}});M(this,"onKeyUp",e=>{this.mode.is("game")&&e.key==="ArrowDown"&&this.game.setChargeActive(!1)});M(this,"onGamePointerDown",e=>{if(this.mode.is("game_over")){e.preventDefault(),this.restartGame();return}this.mode.is("game")&&(this.mobileChargePointerId=e.pointerId,this.mobileChargeStartY=e.clientY,this.mobileChargeStartedAt=performance.now(),this.game.setChargeActive(!0))});M(this,"onGamePointerUp",e=>{if(!this.mode.is("game")||this.mobileChargePointerId!==e.pointerId)return;const t=this.mobileChargeStartY-e.clientY,i=performance.now()-this.mobileChargeStartedAt;!this.game.setChargeActive(!1)&&(i<180||t>12)&&(this.game.triggerJump(),e.preventDefault()),this.mobileChargePointerId=null,this.mobileChargeStartedAt=0});M(this,"onGamePointerCancel",e=>{this.mobileChargePointerId===e.pointerId&&(this.mobileChargePointerId=null,this.mobileChargeStartedAt=0,this.game.setChargeActive(!1))});this.root=document.createElement("div"),this.root.className="app-shell",this.canvasHost=document.createElement("div"),this.canvasHost.className="app-shell__canvas",this.uiHost=document.createElement("div"),this.uiHost.className="app-shell__ui",this.root.append(this.canvasHost,this.uiHost),e.appendChild(this.root),this.renderer=new w_(this.canvasHost),this.slotSystem=new _o(this.content.getProjects().filter(t=>t.role!=="presentation").map(t=>t.id)),this.world=new E_(this.renderer.scene,this.content.getProjects(),this.slotSystem,this.theme.current),this.game=new g_(this.renderer.scene,this.theme.current),this.hud=new U_(this.uiHost,this.i18n,this.content,{onThemeToggle:()=>this.theme.toggle(),onLanguageToggle:()=>this.i18n.toggle(),onAboutToggle:()=>this.toggleAbout(),onHome:()=>this.returnHome(),onProjectSelect:t=>this.selectProject(t)}),this.about=new C_(this.uiHost,this.i18n),this.focus=new R_(this.uiHost,this.i18n,{onClose:()=>this.exitFocus(),onPrevFacet:()=>this.changeFacet(-1),onNextFacet:()=>this.changeFacet(1)}),this.guide=new L_(this.uiHost,this.i18n),this.intro=new v_(this.uiHost,this.i18n,this.theme),this.gameHud=new $g(this.uiHost,this.i18n,{onRestart:()=>this.restartGame(),onExit:()=>this.exitGame(),onSelectUpgrade:t=>{this.game.selectUpgradeFallback(t)&&this.refreshUI()}}),this.interaction=new T_(this.renderer.renderer.domElement,this.renderer.camera,this.world,()=>this.mode.current,{onShardClick:t=>this.enterFocus(t),onBackgroundClick:()=>{(this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition"))&&this.exitFocus()},onHover:t=>this.world.setHovered(t),onDragStart:(t,i)=>{if(!(this.mode.is("orbit")||this.mode.is("constellation_complete")))return!1;const n=this.world.beginDrag(t,i);return n&&(this.mode.setMode("dragging"),this.world.setHovered(null)),n},onDragMove:t=>{this.world.updateDrag(t)},onDragEnd:()=>{const t=this.world.endDrag();t.shardId&&(this.hasDragged=!0),!t.unlocked&&this.mode.is("dragging")&&this.resumeOrbitMode(),this.refreshUI(),this.updateGuide()},onSceneOrbitMove:(t,i)=>{(this.mode.is("orbit")||this.mode.is("constellation_complete"))&&this.cameraOrbit.orbit(-t,i)},onFocusRotation:t=>this.world.previewFacetRotation(t),onFocusRotationEnd:()=>{this.world.finishFacetRotation()&&(this.mode.setMode("focus_facet_transition"),this.scheduleFacetCompletion())},onFocusSideTap:t=>this.changeFacet(t==="left"?-1:1)}),this.interaction,this.loop=new k_((t,i)=>this.update(t,i)),this.bindEvents(),this.refreshUI(),this.updateGuide(),this.loop.start()}bindEvents(){this.theme.onChange(t=>{this.renderer.setTheme(t),this.world.setTheme(t),this.game.setTheme(t),this.refreshUI()}),this.i18n.onChange(()=>{this.refreshUI();const t=this.world.getFocusedProject();t&&this.focus.show(t,this.world.getFocusedFacetIndex()),(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))&&this.gameHud.update(this.getGameHudPayload())}),this.game.onScoreChange(()=>{(this.mode.is("game")||this.mode.is("game_over"))&&this.refreshUI()}),this.about.onClose=()=>{this.mode.is("about_section")&&(this.resumeOrbitMode(),this.refreshUI(),this.updateGuide())},this.intro.onBroken=()=>{this.mode.is("intro")&&(this.mode.setMode("intro_shattering"),window.setTimeout(()=>{this.mode.is("intro_shattering")&&this.mode.setMode("intro_transition")},60),this.transitions.animate({from:0,to:1,duration:2.6,easing:"easeOutQuint",onUpdate:t=>{this.introTransitionProgress=t},onComplete:()=>{if(this.introTransitionProgress=1,this.resumeOrbitMode(),this.refreshUI(),this.updateGuide(),!this.didRunIntroPresentationFocus){const t=this.world.getPresentationProjectId();t&&(this.didRunIntroPresentationFocus=!0,this.activeIndex=0,this.world.setActiveIndex(0),window.setTimeout(()=>{this.mode.is("orbit")&&this.enterFocus(t)},220))}}}))},this.world.onUnlocked(()=>{this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over")||(this.mode.is("constellation_complete")||(this.mode.is("dragging")||this.mode.is("orbit"))&&this.mode.setMode("constellation_complete"),this.refreshUI(),this.updateGuide(),this.transitions.animate({from:0,to:1,duration:.9,easing:"easeOutCubic",onUpdate:()=>{},onComplete:()=>{this.slotSystem.isUnlocked()&&this.startGameTransition()}}))}),window.addEventListener("wheel",this.onWheel,{passive:!1}),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp);const e=this.renderer.renderer.domElement;e.addEventListener("pointerdown",this.onGamePointerDown),e.addEventListener("pointerup",this.onGamePointerUp),e.addEventListener("pointercancel",this.onGamePointerCancel)}stepActiveIndex(e){this.activeIndex=Cs(this.activeIndex+e,this.content.getProjectCount()),this.world.setActiveIndex(this.activeIndex),this.refreshUI()}selectProject(e){if(this.mode.is("intro")||this.mode.is("intro_shattering")||this.mode.is("intro_transition")||this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))return;this.about.opened&&this.about.close(),this.activeIndex=e,this.world.setActiveIndex(e),this.refreshUI();const t=this.content.getProjectByOrder(e);t&&(this.mode.is("orbit")||this.mode.is("constellation_complete"))&&this.enterFocus(t.id)}enterFocus(e){(this.mode.is("orbit")||this.mode.is("constellation_complete"))&&(this.mode.setMode("focus_enter"),this.world.setFocused(e),this.world.setHovered(null),this.refreshUI())}exitFocus(e){if(!(this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition"))){e==null||e();return}const t=this.world.getFocusedProject();this.pendingPostFocusExit=e||null,this.focus.hide(),this.mode.setMode("focus_exit"),this.world.clearFocus(),this.transitions.animate({from:0,to:1,duration:.55,easing:"easeOutCubic",onUpdate:()=>{},onComplete:()=>{this.resumeOrbitMode(),t&&this.hasSeenAllFacets(t.id)&&this.world.snapShardToSlot(t.id);const i=this.pendingPostFocusExit;this.pendingPostFocusExit=null,i==null||i(),this.refreshUI(),this.updateGuide()}})}changeFacet(e){!this.mode.is("focus")||!this.world.changeFacet(e)||(this.mode.setMode("focus_facet_transition"),this.scheduleFacetCompletion())}scheduleFacetCompletion(){this.transitions.animate({from:0,to:1,duration:.68,easing:"easeInOutCubic",onUpdate:()=>{},onComplete:()=>{if(!this.mode.is("focus_facet_transition"))return;this.mode.setMode("focus");const e=this.world.getFocusedProject();e&&(this.markFacetSeen(e.id,this.world.getFocusedFacetIndex()),this.focus.updateFacet(this.world.getFocusedFacetIndex()),this.hasChangedFacet=!0,this.updateGuide())}})}toggleAbout(){if(this.mode.is("intro")||this.mode.is("intro_shattering")||this.mode.is("intro_transition")||this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))return;if(this.about.opened){this.about.close();return}const e=()=>{this.about.open(),this.mode.setMode("about_section"),this.refreshUI(),this.updateGuide()};if(this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition")){this.exitFocus(e);return}e()}returnHome(){(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))&&this.exitGame(),this.activeIndex=0,this.world.setActiveIndex(0),this.about.opened&&this.about.close(),(this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition"))&&this.exitFocus(),this.refreshUI()}resumeOrbitMode(){if(this.slotSystem.isUnlocked()){this.mode.is("constellation_complete")||(this.mode.is("focus_exit")||this.mode.is("about_section")||this.mode.is("dragging")||this.mode.is("orbit")||this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))&&this.mode.setMode("constellation_complete");return}this.mode.is("orbit")||this.mode.setMode("orbit")}startGameTransition(){if(!this.slotSystem.isUnlocked()||this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))return;if(this.about.opened&&this.about.close(),this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition")){this.exitFocus(()=>this.startGameTransition());return}this.mode.is("dragging")&&this.resumeOrbitMode(),this.mode.is("constellation_complete")||this.mode.setMode("constellation_complete"),this.gameTransitionTweenId!==null&&(this.transitions.cancel(this.gameTransitionTweenId),this.gameTransitionTweenId=null),this.mode.setMode("game_transition"),this.gameTransitionProgress=0,this.game.startTransition();const e=this.getGameFieldCount();this.world.beginExternalLayoutTransition(this.game.getInitialPlatformPositions(e),this.game.getInitialPlatformScales(e),this.game.getInitialPlatformVisuals(e)),this.refreshUI(),this.gameTransitionTweenId=this.transitions.animate({from:0,to:1,duration:2.25,easing:"easeInOutCubic",onUpdate:t=>{this.gameTransitionProgress=t,this.world.setExternalLayoutProgress(t)},onComplete:()=>{this.gameTransitionTweenId=null,this.gameTransitionProgress=1,this.mode.setMode("game"),this.game.beginRun();const t=this.getGameFieldCount();this.world.setExternalLayoutPositions(this.game.getVisiblePlatformPositions(t),this.game.getVisiblePlatformScales(t),this.game.getVisiblePlatformVisuals(t)),this.refreshUI()}})}restartGame(){if(!(this.mode.is("game")||this.mode.is("game_over")))return;this.mode.is("game_over")&&this.mode.setMode("game"),this.game.restart();const e=this.getGameFieldCount();this.world.setExternalLayoutPositions(this.game.getVisiblePlatformPositions(e),this.game.getVisiblePlatformScales(e),this.game.getVisiblePlatformVisuals(e)),this.refreshUI()}exitGame(){if(!(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over")))return;this.gameTransitionTweenId!==null&&(this.transitions.cancel(this.gameTransitionTweenId),this.gameTransitionTweenId=null),this.mobileChargePointerId=null,this.game.setChargeActive(!1);const e=this.world.getOrbitPositions();this.world.beginExternalLayoutTransition(e),this.game.prepareReturnTransition(),(this.mode.is("game")||this.mode.is("game_over"))&&this.mode.setMode("game_transition"),this.gameTransitionTweenId=this.transitions.animate({from:this.gameTransitionProgress,to:0,duration:1.25,easing:"easeInOutCubic",onUpdate:t=>{this.gameTransitionProgress=t,this.world.setExternalLayoutProgress(1-t)},onComplete:()=>{this.gameTransitionTweenId=null,this.game.stop(),this.gameTransitionProgress=0,this.slotSystem.reset(),this.interaction.reset(),this.world.resetPortfolioState(),this.activeIndex=0,this.world.setActiveIndex(0),this.resumeOrbitMode(),this.refreshUI(),this.updateGuide()}})}getGameHudPayload(){const e=this.game.getHudState();return{score:e.score,highscore:e.highscore,distanceMeters:e.distanceMeters,bestDistanceMeters:e.bestDistanceMeters,coins:e.coins,splitTimes:e.splitTimes,chargeRatio:e.chargeRatio,momentumGauge:e.momentumGauge,momentumTier:e.momentumTier,orbitGraceActive:e.orbitGraceActive,orbitGraceProgress:e.orbitGraceProgress,state:e.state,offers:e.offers,branchHints:e.branchHints.reduce((t,i)=>{const n=this.renderer.projectWorldToScreen(i.worldPosition);return n.visible&&t.push({slot:i.slot,offer:i.offer,screenX:n.x,screenY:n.y,mode:i.mode,price:i.price}),t},[]),acquisition:e.acquisition}}update(e,t){if(this.transitions.update(e),this.world.update(e,t,this.mode.current),this.game.update(e,t),this.mode.is("game")||this.mode.is("game_over")){const p=this.getGameFieldCount();this.world.setExternalLayoutPositions(this.game.getVisiblePlatformPositions(p),this.game.getVisiblePlatformScales(p),this.game.getVisiblePlatformVisuals(p))}if(this.mode.is("focus_enter")&&this.world.isFocusSettled()){this.mode.setMode("focus");const p=this.world.getFocusedProject();p&&(this.markFacetSeen(p.id,this.world.getFocusedFacetIndex()),this.focus.show(p,this.world.getFocusedFacetIndex()),this.hasFocused=!0,this.updateGuide())}this.mode.is("game")&&this.game.currentState==="game_over"&&this.mode.setMode("game_over"),this.cameraFocusBlend=Me(this.cameraFocusBlend,this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition")||this.mode.is("focus_exit")?1:0,8,e);const i=this.world.getOrbitCameraPose(),n=this.cameraOrbit.update(e,this.world.getPivot()),r=this.world.getFocusCameraPose(),o=this.game.getCameraPose(),a=n.position.clone().lerp(r.position,this.cameraFocusBlend),c=n.lookAt.clone().lerp(i.lookAt,.18).lerp(r.lookAt,this.cameraFocusBlend),l=a.clone().lerp(o.position,this.gameTransitionProgress),h=c.clone().lerp(o.lookAt,this.gameTransitionProgress),u=this.introStartCameraPosition.clone().lerp(l,this.introTransitionProgress),d=this.introStartLookAt.clone().lerp(h,this.introTransitionProgress);this.renderer.setCameraResponse(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over")?18:8,this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over")?20:8),this.renderer.setCameraTarget(u,d),this.renderer.update(e),(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))&&this.gameHud.update(this.getGameHudPayload()),this.renderer.render(),this.intro.update(e),this.refreshUI()}refreshUI(){const e=this.world.getFocusedProject(),t=e?this.content.getProjectIndex(e.id):this.activeIndex,i=this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over");this.hud.setActiveProject(t,this.i18n.current),this.hud.setUnlocked(this.slotSystem.isUnlocked()),this.hud.setAboutOpen(this.about.opened),this.hud.element.classList.toggle("is-hidden",i),this.guide.element.classList.toggle("is-hidden",i),this.gameHud.setVisible(i),i&&this.gameHud.update(this.getGameHudPayload()),this.world.setActiveIndex(this.activeIndex)}getGameFieldCount(){const e=Math.max(this.world.getGameFieldCapacity(),this.game.getRecommendedVisibleCount());return this.world.ensureGameFieldCapacity(e),this.world.getGameFieldCapacity()}updateGuide(){if(!(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))){if(this.slotSystem.isUnlocked()){this.guide.setStep("unlocked");return}if(this.mode.is("intro")||this.mode.is("intro_shattering")||this.mode.is("intro_transition")){this.guide.setStep("intro");return}if(!this.hasFocused){this.guide.setStep("orbit");return}if(!this.hasChangedFacet){this.guide.setStep("focus");return}if(!this.hasDragged){this.guide.setStep("drag");return}this.guide.setStep("slots")}}markFacetSeen(e,t){const i=this.seenFacetsByProject.get(e)??new Set;i.add(t),this.seenFacetsByProject.set(e,i)}hasSeenAllFacets(e){var t;return(((t=this.seenFacetsByProject.get(e))==null?void 0:t.size)??0)>=3}}const ml=document.getElementById("app");if(!ml)throw new Error("App root not found");new G_(ml);
