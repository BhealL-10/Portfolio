var Uc=Object.defineProperty;var Nc=(s,e,t)=>e in s?Uc(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var y=(s,e,t)=>Nc(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ro="160",Fc=0,Io=1,Oc=2,Nl=1,kc=2,di=3,mi=0,Ut=1,zt=2,Ti=0,gn=1,Do=2,Uo=3,No=4,Bc=5,Ni=100,zc=101,Gc=102,Fo=103,Oo=104,Vc=200,Hc=201,Wc=202,Xc=203,Hr=204,Wr=205,qc=206,jc=207,Yc=208,Jc=209,Zc=210,$c=211,Kc=212,Qc=213,eh=214,th=0,ih=1,nh=2,Bs=3,sh=4,rh=5,oh=6,ah=7,Fl=0,lh=1,ch=2,Ai=0,hh=1,uh=2,dh=3,fh=4,ph=5,mh=6,Ol=300,vn=301,xn=302,Xr=303,qr=304,Ys=306,jr=1e3,Gt=1001,Yr=1002,Ct=1003,ko=1004,rr=1005,It=1006,gh=1007,Gn=1008,wi=1009,_h=1010,vh=1011,oo=1012,kl=1013,bi=1014,Ei=1015,Vn=1016,Bl=1017,zl=1018,ki=1020,xh=1021,$t=1023,yh=1024,Sh=1025,Bi=1026,yn=1027,Mh=1028,Gl=1029,bh=1030,Vl=1031,Hl=1033,or=33776,ar=33777,lr=33778,cr=33779,Bo=35840,zo=35841,Go=35842,Vo=35843,Wl=36196,Ho=37492,Wo=37496,Xo=37808,qo=37809,jo=37810,Yo=37811,Jo=37812,Zo=37813,$o=37814,Ko=37815,Qo=37816,ea=37817,ta=37818,ia=37819,na=37820,sa=37821,hr=36492,ra=36494,oa=36495,Eh=36283,aa=36284,la=36285,ca=36286,Xl=3e3,zi=3001,Th=3200,Ah=3201,ql=0,wh=1,Wt="",dt="srgb",gi="srgb-linear",ao="display-p3",Js="display-p3-linear",zs="linear",it="srgb",Gs="rec709",Vs="p3",qi=7680,ha=519,Ph=512,Ch=513,Rh=514,jl=515,Lh=516,Ih=517,Dh=518,Uh=519,ua=35044,da="300 es",Jr=1035,fi=2e3,Hs=2001;class Mn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const n=this._listeners[e];if(n!==void 0){const r=n.indexOf(t);r!==-1&&n.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const n=i.slice(0);for(let r=0,o=n.length;r<o;r++)n[r].call(this,e);e.target=null}}}const bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let fa=1234567;const Dn=Math.PI/180,Hn=180/Math.PI;function Wi(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(bt[s&255]+bt[s>>8&255]+bt[s>>16&255]+bt[s>>24&255]+"-"+bt[e&255]+bt[e>>8&255]+"-"+bt[e>>16&15|64]+bt[e>>24&255]+"-"+bt[t&63|128]+bt[t>>8&255]+"-"+bt[t>>16&255]+bt[t>>24&255]+bt[i&255]+bt[i>>8&255]+bt[i>>16&255]+bt[i>>24&255]).toLowerCase()}function yt(s,e,t){return Math.max(e,Math.min(t,s))}function lo(s,e){return(s%e+e)%e}function Nh(s,e,t,i,n){return i+(s-e)*(n-i)/(t-e)}function Fh(s,e,t){return s!==e?(t-s)/(e-s):0}function Un(s,e,t){return(1-t)*s+t*e}function Oh(s,e,t,i){return Un(s,e,1-Math.exp(-t*i))}function kh(s,e=1){return e-Math.abs(lo(s,e*2)-e)}function Bh(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function zh(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Gh(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Vh(s,e){return s+Math.random()*(e-s)}function Hh(s){return s*(.5-Math.random())}function Wh(s){s!==void 0&&(fa=s);let e=fa+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Xh(s){return s*Dn}function qh(s){return s*Hn}function Zr(s){return(s&s-1)===0&&s!==0}function jh(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Ws(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Yh(s,e,t,i,n){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+i)/2),h=o((e+i)/2),u=r((e-i)/2),d=o((e-i)/2),f=r((i-e)/2),g=o((i-e)/2);switch(n){case"XYX":s.set(a*h,l*u,l*d,a*c);break;case"YZY":s.set(l*d,a*h,l*u,a*c);break;case"ZXZ":s.set(l*u,l*d,a*h,a*c);break;case"XZX":s.set(a*h,l*g,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*g,a*c);break;case"ZYZ":s.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function dn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function wt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Yt={DEG2RAD:Dn,RAD2DEG:Hn,generateUUID:Wi,clamp:yt,euclideanModulo:lo,mapLinear:Nh,inverseLerp:Fh,lerp:Un,damp:Oh,pingpong:kh,smoothstep:Bh,smootherstep:zh,randInt:Gh,randFloat:Vh,randFloatSpread:Hh,seededRandom:Wh,degToRad:Xh,radToDeg:qh,isPowerOfTwo:Zr,ceilPowerOfTwo:jh,floorPowerOfTwo:Ws,setQuaternionFromProperEuler:Yh,normalize:wt,denormalize:dn};class re{constructor(e=0,t=0){re.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(yt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),n=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*n+e.x,this.y=r*n+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class je{constructor(e,t,i,n,r,o,a,l,c){je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,o,a,l,c)}set(e,t,i,n,r,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=n,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],f=i[5],g=i[8],v=n[0],m=n[3],p=n[6],M=n[1],_=n[4],T=n[7],L=n[2],P=n[5],C=n[8];return r[0]=o*v+a*M+l*L,r[3]=o*m+a*_+l*P,r[6]=o*p+a*T+l*C,r[1]=c*v+h*M+u*L,r[4]=c*m+h*_+u*P,r[7]=c*p+h*T+u*C,r[2]=d*v+f*M+g*L,r[5]=d*m+f*_+g*P,r[8]=d*p+f*T+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-i*r*h+i*a*l+n*r*c-n*o*l}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,g=t*u+i*d+n*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=u*v,e[1]=(n*c-h*i)*v,e[2]=(a*i-n*o)*v,e[3]=d*v,e[4]=(h*t-n*l)*v,e[5]=(n*r-a*t)*v,e[6]=f*v,e[7]=(i*l-c*t)*v,e[8]=(o*t-i*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-n*c,n*l,-n*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ur.makeScale(e,t)),this}rotate(e){return this.premultiply(ur.makeRotation(-e)),this}translate(e,t){return this.premultiply(ur.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<9;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ur=new je;function Yl(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Wn(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Jh(){const s=Wn("canvas");return s.style.display="block",s}const pa={};function Nn(s){s in pa||(pa[s]=!0,console.warn(s))}const ma=new je().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ga=new je().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),is={[gi]:{transfer:zs,primaries:Gs,toReference:s=>s,fromReference:s=>s},[dt]:{transfer:it,primaries:Gs,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[Js]:{transfer:zs,primaries:Vs,toReference:s=>s.applyMatrix3(ga),fromReference:s=>s.applyMatrix3(ma)},[ao]:{transfer:it,primaries:Vs,toReference:s=>s.convertSRGBToLinear().applyMatrix3(ga),fromReference:s=>s.applyMatrix3(ma).convertLinearToSRGB()}},Zh=new Set([gi,Js]),Ke={enabled:!0,_workingColorSpace:gi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Zh.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;const i=is[e].toReference,n=is[t].fromReference;return n(i(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return is[s].primaries},getTransfer:function(s){return s===Wt?zs:is[s].transfer}};function _n(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function dr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ji;class Jl{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ji===void 0&&(ji=Wn("canvas")),ji.width=e.width,ji.height=e.height;const i=ji.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=ji}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Wn("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const n=i.getImageData(0,0,e.width,e.height),r=n.data;for(let o=0;o<r.length;o++)r[o]=_n(r[o]/255)*255;return i.putImageData(n,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(_n(t[i]/255)*255):t[i]=_n(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let $h=0;class Zl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:$h++}),this.uuid=Wi(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let o=0,a=n.length;o<a;o++)n[o].isDataTexture?r.push(fr(n[o].image)):r.push(fr(n[o]))}else r=fr(n);i.url=r}return t||(e.images[this.uuid]=i),i}}function fr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Jl.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Kh=0;class Nt extends Mn{constructor(e=Nt.DEFAULT_IMAGE,t=Nt.DEFAULT_MAPPING,i=Gt,n=Gt,r=It,o=Gn,a=$t,l=wi,c=Nt.DEFAULT_ANISOTROPY,h=Wt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Kh++}),this.uuid=Wi(),this.name="",this.source=new Zl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new re(0,0),this.repeat=new re(1,1),this.center=new re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Nn("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===zi?dt:Wt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ol)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case jr:e.x=e.x-Math.floor(e.x);break;case Gt:e.x=e.x<0?0:1;break;case Yr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case jr:e.y=e.y-Math.floor(e.y);break;case Gt:e.y=e.y<0?0:1;break;case Yr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Nn("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===dt?zi:Xl}set encoding(e){Nn("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===zi?dt:Wt}}Nt.DEFAULT_IMAGE=null;Nt.DEFAULT_MAPPING=Ol;Nt.DEFAULT_ANISOTROPY=1;class nt{constructor(e=0,t=0,i=0,n=1){nt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*n+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*n+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*n+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*n+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const _=(c+1)/2,T=(f+1)/2,L=(p+1)/2,P=(h+d)/4,C=(u+v)/4,N=(g+m)/4;return _>T&&_>L?_<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(_),n=P/i,r=C/i):T>L?T<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(T),i=P/n,r=N/n):L<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(L),i=C/r,n=N/r),this.set(i,n,r,t),this}let M=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-v)/M,this.z=(d-h)/M,this.w=Math.acos((c+f+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Qh extends Mn{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new nt(0,0,e,t),this.scissorTest=!1,this.viewport=new nt(0,0,e,t);const n={width:e,height:t,depth:1};i.encoding!==void 0&&(Nn("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===zi?dt:Wt),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:It,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Nt(n,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Zl(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gi extends Qh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class $l extends Nt{constructor(e=null,t=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Gt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class eu extends Nt{constructor(e=null,t=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Gt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Yn{constructor(e=0,t=0,i=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=n}static slerpFlat(e,t,i,n,r,o,a){let l=i[n+0],c=i[n+1],h=i[n+2],u=i[n+3];const d=r[o+0],f=r[o+1],g=r[o+2],v=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=v;return}if(u!==v||l!==d||c!==f||h!==g){let m=1-a;const p=l*d+c*f+h*g+u*v,M=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){const L=Math.sqrt(_),P=Math.atan2(L,p*M);m=Math.sin(m*P)/L,a=Math.sin(a*P)/L}const T=a*M;if(l=l*m+d*T,c=c*m+f*T,h=h*m+g*T,u=u*m+v*T,m===1-a){const L=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=L,c*=L,h*=L,u*=L}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,n,r,o){const a=i[n],l=i[n+1],c=i[n+2],h=i[n+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-a*f,e[t+2]=c*g+h*f+a*d-l*u,e[t+3]=h*g-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,n=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(n/2),u=a(r/2),d=l(i/2),f=l(n/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],n=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=i+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-n)*f}else if(i>a&&i>u){const f=2*Math.sqrt(1+i-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(n+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-i-u);this._w=(r-c)/f,this._x=(n+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-i-a);this._w=(o-n)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(yt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const n=Math.min(1,t/i);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,n=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+o*a+n*c-r*l,this._y=n*h+o*l+r*a-i*c,this._z=r*h+o*c+i*l-n*a,this._w=o*h-i*a-n*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,n=this._y,r=this._z,o=this._w;let a=o*e._w+i*e._x+n*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=n,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*i+t*this._x,this._y=f*n+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=i*u+this._x*d,this._y=n*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),n=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(n),i*Math.sin(r),i*Math.cos(r),t*Math.sin(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class w{constructor(e=0,t=0,i=0){w.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(_a.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(_a.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*n,this.y=r[1]*t+r[4]*i+r[7]*n,this.z=r[2]*t+r[5]*i+r[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*n+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*n+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*n+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,n=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*n-a*i),h=2*(a*t-r*n),u=2*(r*i-o*t);return this.x=t+l*c+o*u-a*h,this.y=i+l*h+a*c-r*u,this.z=n+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*n,this.y=r[1]*t+r[5]*i+r[9]*n,this.z=r[2]*t+r[6]*i+r[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,n=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=n*l-r*a,this.y=r*o-i*l,this.z=i*a-n*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return pr.copy(this).projectOnVector(e),this.sub(pr)}reflect(e){return this.sub(pr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(yt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const pr=new w,_a=new Yn;class Jn{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Xt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Xt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Xt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Xt):Xt.fromBufferAttribute(r,o),Xt.applyMatrix4(e.matrixWorld),this.expandByPoint(Xt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ns.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ns.copy(i.boundingBox)),ns.applyMatrix4(e.matrixWorld),this.union(ns)}const n=e.children;for(let r=0,o=n.length;r<o;r++)this.expandByObject(n[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Xt),Xt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Tn),ss.subVectors(this.max,Tn),Yi.subVectors(e.a,Tn),Ji.subVectors(e.b,Tn),Zi.subVectors(e.c,Tn),_i.subVectors(Ji,Yi),vi.subVectors(Zi,Ji),Ri.subVectors(Yi,Zi);let t=[0,-_i.z,_i.y,0,-vi.z,vi.y,0,-Ri.z,Ri.y,_i.z,0,-_i.x,vi.z,0,-vi.x,Ri.z,0,-Ri.x,-_i.y,_i.x,0,-vi.y,vi.x,0,-Ri.y,Ri.x,0];return!mr(t,Yi,Ji,Zi,ss)||(t=[1,0,0,0,1,0,0,0,1],!mr(t,Yi,Ji,Zi,ss))?!1:(rs.crossVectors(_i,vi),t=[rs.x,rs.y,rs.z],mr(t,Yi,Ji,Zi,ss))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Xt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Xt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(oi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),oi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),oi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),oi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),oi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),oi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),oi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),oi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(oi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const oi=[new w,new w,new w,new w,new w,new w,new w,new w],Xt=new w,ns=new Jn,Yi=new w,Ji=new w,Zi=new w,_i=new w,vi=new w,Ri=new w,Tn=new w,ss=new w,rs=new w,Li=new w;function mr(s,e,t,i,n){for(let r=0,o=s.length-3;r<=o;r+=3){Li.fromArray(s,r);const a=n.x*Math.abs(Li.x)+n.y*Math.abs(Li.y)+n.z*Math.abs(Li.z),l=e.dot(Li),c=t.dot(Li),h=i.dot(Li);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const tu=new Jn,An=new w,gr=new w;class Zn{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):tu.setFromPoints(e).getCenter(i);let n=0;for(let r=0,o=e.length;r<o;r++)n=Math.max(n,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;An.subVectors(e,this.center);const t=An.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),n=(i-this.radius)*.5;this.center.addScaledVector(An,n/i),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(gr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(An.copy(e.center).add(gr)),this.expandByPoint(An.copy(e.center).sub(gr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ai=new w,_r=new w,os=new w,xi=new w,vr=new w,as=new w,xr=new w;class Zs{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ai)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ai.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ai.copy(this.origin).addScaledVector(this.direction,t),ai.distanceToSquared(e))}distanceSqToSegment(e,t,i,n){_r.copy(e).add(t).multiplyScalar(.5),os.copy(t).sub(e).normalize(),xi.copy(this.origin).sub(_r);const r=e.distanceTo(t)*.5,o=-this.direction.dot(os),a=xi.dot(this.direction),l=-xi.dot(os),c=xi.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const v=1/h;u*=v,d*=v,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),n&&n.copy(_r).addScaledVector(os,d),f}intersectSphere(e,t){ai.subVectors(e.center,this.origin);const i=ai.dot(this.direction),n=ai.dot(ai)-i*i,r=e.radius*e.radius;if(n>r)return null;const o=Math.sqrt(r-n),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,n,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,n=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,n=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),i>o||r>n||((r>i||isNaN(i))&&(i=r),(o<n||isNaN(n))&&(n=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),i>l||a>n)||((a>i||i!==i)&&(i=a),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,t)}intersectsBox(e){return this.intersectBox(e,ai)!==null}intersectTriangle(e,t,i,n,r){vr.subVectors(t,e),as.subVectors(i,e),xr.crossVectors(vr,as);let o=this.direction.dot(xr),a;if(o>0){if(n)return null;a=1}else if(o<0)a=-1,o=-o;else return null;xi.subVectors(this.origin,e);const l=a*this.direction.dot(as.crossVectors(xi,as));if(l<0)return null;const c=a*this.direction.dot(vr.cross(xi));if(c<0||l+c>o)return null;const h=-a*xi.dot(xr);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class at{constructor(e,t,i,n,r,o,a,l,c,h,u,d,f,g,v,m){at.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,o,a,l,c,h,u,d,f,g,v,m)}set(e,t,i,n,r,o,a,l,c,h,u,d,f,g,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=n,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new at().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,n=1/$i.setFromMatrixColumn(e,0).length(),r=1/$i.setFromMatrixColumn(e,1).length(),o=1/$i.setFromMatrixColumn(e,2).length();return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,n=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(n),c=Math.sin(n),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=o*h,f=o*u,g=a*h,v=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-v*c,t[9]=-a*l,t[2]=v-d*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,g=c*h,v=c*u;t[0]=d+v*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=v+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,g=c*h,v=c*u;t[0]=d-v*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=v-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*h,f=o*u,g=a*h,v=a*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+v,t[1]=l*u,t[5]=v*c+d,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,f=o*c,g=a*l,v=a*c;t[0]=l*h,t[4]=v-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-v*u}else if(e.order==="XZY"){const d=o*l,f=o*c,g=a*l,v=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+v,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=v*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(iu,e,nu)}lookAt(e,t,i){const n=this.elements;return Ot.subVectors(e,t),Ot.lengthSq()===0&&(Ot.z=1),Ot.normalize(),yi.crossVectors(i,Ot),yi.lengthSq()===0&&(Math.abs(i.z)===1?Ot.x+=1e-4:Ot.z+=1e-4,Ot.normalize(),yi.crossVectors(i,Ot)),yi.normalize(),ls.crossVectors(Ot,yi),n[0]=yi.x,n[4]=ls.x,n[8]=Ot.x,n[1]=yi.y,n[5]=ls.y,n[9]=Ot.y,n[2]=yi.z,n[6]=ls.z,n[10]=Ot.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],f=i[13],g=i[2],v=i[6],m=i[10],p=i[14],M=i[3],_=i[7],T=i[11],L=i[15],P=n[0],C=n[4],N=n[8],S=n[12],E=n[1],U=n[5],z=n[9],K=n[13],I=n[2],O=n[6],H=n[10],J=n[14],Y=n[3],X=n[7],Q=n[11],ee=n[15];return r[0]=o*P+a*E+l*I+c*Y,r[4]=o*C+a*U+l*O+c*X,r[8]=o*N+a*z+l*H+c*Q,r[12]=o*S+a*K+l*J+c*ee,r[1]=h*P+u*E+d*I+f*Y,r[5]=h*C+u*U+d*O+f*X,r[9]=h*N+u*z+d*H+f*Q,r[13]=h*S+u*K+d*J+f*ee,r[2]=g*P+v*E+m*I+p*Y,r[6]=g*C+v*U+m*O+p*X,r[10]=g*N+v*z+m*H+p*Q,r[14]=g*S+v*K+m*J+p*ee,r[3]=M*P+_*E+T*I+L*Y,r[7]=M*C+_*U+T*O+L*X,r[11]=M*N+_*z+T*H+L*Q,r[15]=M*S+_*K+T*J+L*ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],n=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],v=e[7],m=e[11],p=e[15];return g*(+r*l*u-n*c*u-r*a*d+i*c*d+n*a*f-i*l*f)+v*(+t*l*f-t*c*d+r*o*d-n*o*f+n*c*h-r*l*h)+m*(+t*c*u-t*a*f-r*o*u+i*o*f+r*a*h-i*c*h)+p*(-n*a*h-t*l*u+t*a*d+n*o*u-i*o*d+i*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],v=e[13],m=e[14],p=e[15],M=u*m*c-v*d*c+v*l*f-a*m*f-u*l*p+a*d*p,_=g*d*c-h*m*c-g*l*f+o*m*f+h*l*p-o*d*p,T=h*v*c-g*u*c+g*a*f-o*v*f-h*a*p+o*u*p,L=g*u*l-h*v*l-g*a*d+o*v*d+h*a*m-o*u*m,P=t*M+i*_+n*T+r*L;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/P;return e[0]=M*C,e[1]=(v*d*r-u*m*r-v*n*f+i*m*f+u*n*p-i*d*p)*C,e[2]=(a*m*r-v*l*r+v*n*c-i*m*c-a*n*p+i*l*p)*C,e[3]=(u*l*r-a*d*r-u*n*c+i*d*c+a*n*f-i*l*f)*C,e[4]=_*C,e[5]=(h*m*r-g*d*r+g*n*f-t*m*f-h*n*p+t*d*p)*C,e[6]=(g*l*r-o*m*r-g*n*c+t*m*c+o*n*p-t*l*p)*C,e[7]=(o*d*r-h*l*r+h*n*c-t*d*c-o*n*f+t*l*f)*C,e[8]=T*C,e[9]=(g*u*r-h*v*r-g*i*f+t*v*f+h*i*p-t*u*p)*C,e[10]=(o*v*r-g*a*r+g*i*c-t*v*c-o*i*p+t*a*p)*C,e[11]=(h*a*r-o*u*r-h*i*c+t*u*c+o*i*f-t*a*f)*C,e[12]=L*C,e[13]=(h*v*n-g*u*n+g*i*d-t*v*d-h*i*m+t*u*m)*C,e[14]=(g*a*n-o*v*n-g*i*l+t*v*l+o*i*m-t*a*m)*C,e[15]=(o*u*n-h*a*n+h*i*l-t*u*l-o*i*d+t*a*d)*C,this}scale(e){const t=this.elements,i=e.x,n=e.y,r=e.z;return t[0]*=i,t[4]*=n,t[8]*=r,t[1]*=i,t[5]*=n,t[9]*=r,t[2]*=i,t[6]*=n,t[10]*=r,t[3]*=i,t[7]*=n,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,n))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),n=Math.sin(t),r=1-i,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+i,c*a-n*l,c*l+n*a,0,c*a+n*l,h*a+i,h*l-n*o,0,c*l-n*a,h*l+n*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,n,r,o){return this.set(1,i,r,0,e,1,o,0,t,n,1,0,0,0,0,1),this}compose(e,t,i){const n=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,g=r*u,v=o*h,m=o*u,p=a*u,M=l*c,_=l*h,T=l*u,L=i.x,P=i.y,C=i.z;return n[0]=(1-(v+p))*L,n[1]=(f+T)*L,n[2]=(g-_)*L,n[3]=0,n[4]=(f-T)*P,n[5]=(1-(d+p))*P,n[6]=(m+M)*P,n[7]=0,n[8]=(g+_)*C,n[9]=(m-M)*C,n[10]=(1-(d+v))*C,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,i){const n=this.elements;let r=$i.set(n[0],n[1],n[2]).length();const o=$i.set(n[4],n[5],n[6]).length(),a=$i.set(n[8],n[9],n[10]).length();this.determinant()<0&&(r=-r),e.x=n[12],e.y=n[13],e.z=n[14],qt.copy(this);const c=1/r,h=1/o,u=1/a;return qt.elements[0]*=c,qt.elements[1]*=c,qt.elements[2]*=c,qt.elements[4]*=h,qt.elements[5]*=h,qt.elements[6]*=h,qt.elements[8]*=u,qt.elements[9]*=u,qt.elements[10]*=u,t.setFromRotationMatrix(qt),i.x=r,i.y=o,i.z=a,this}makePerspective(e,t,i,n,r,o,a=fi){const l=this.elements,c=2*r/(t-e),h=2*r/(i-n),u=(t+e)/(t-e),d=(i+n)/(i-n);let f,g;if(a===fi)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Hs)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,n,r,o,a=fi){const l=this.elements,c=1/(t-e),h=1/(i-n),u=1/(o-r),d=(t+e)*c,f=(i+n)*h;let g,v;if(a===fi)g=(o+r)*u,v=-2*u;else if(a===Hs)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<16;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const $i=new w,qt=new at,iu=new w(0,0,0),nu=new w(1,1,1),yi=new w,ls=new w,Ot=new w,va=new at,xa=new Yn;class $s{constructor(e=0,t=0,i=0,n=$s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,n=this._order){return this._x=e,this._y=t,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const n=e.elements,r=n[0],o=n[4],a=n[8],l=n[1],c=n[5],h=n[9],u=n[2],d=n[6],f=n[10];switch(t){case"XYZ":this._y=Math.asin(yt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-yt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(yt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-yt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(yt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-yt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return va.makeRotationFromQuaternion(e),this.setFromRotationMatrix(va,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return xa.setFromEuler(this),this.setFromQuaternion(xa,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}$s.DEFAULT_ORDER="XYZ";class co{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let su=0;const ya=new w,Ki=new Yn,li=new at,cs=new w,wn=new w,ru=new w,ou=new Yn,Sa=new w(1,0,0),Ma=new w(0,1,0),ba=new w(0,0,1),au={type:"added"},lu={type:"removed"};class xt extends Mn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:su++}),this.uuid=Wi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xt.DEFAULT_UP.clone();const e=new w,t=new $s,i=new Yn,n=new w(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new at},normalMatrix:{value:new je}}),this.matrix=new at,this.matrixWorld=new at,this.matrixAutoUpdate=xt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new co,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ki.setFromAxisAngle(e,t),this.quaternion.multiply(Ki),this}rotateOnWorldAxis(e,t){return Ki.setFromAxisAngle(e,t),this.quaternion.premultiply(Ki),this}rotateX(e){return this.rotateOnAxis(Sa,e)}rotateY(e){return this.rotateOnAxis(Ma,e)}rotateZ(e){return this.rotateOnAxis(ba,e)}translateOnAxis(e,t){return ya.copy(e).applyQuaternion(this.quaternion),this.position.add(ya.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Sa,e)}translateY(e){return this.translateOnAxis(Ma,e)}translateZ(e){return this.translateOnAxis(ba,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(li.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?cs.copy(e):cs.set(e,t,i);const n=this.parent;this.updateWorldMatrix(!0,!1),wn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?li.lookAt(wn,cs,this.up):li.lookAt(cs,wn,this.up),this.quaternion.setFromRotationMatrix(li),n&&(li.extractRotation(n.matrixWorld),Ki.setFromRotationMatrix(li),this.quaternion.premultiply(Ki.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(au)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(lu)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),li.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),li.multiply(e.parent.matrixWorld)),e.applyMatrix4(li),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,n=this.children.length;i<n;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const n=this.children;for(let r=0,o=n.length;r<o;r++)n[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(wn,e,ru),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(wn,ou,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,n=t.length;i<n;i++){const r=t[i];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const n=this.children;for(let r=0,o=n.length;r<o;r++){const a=n[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.visibility=this._visibility,n.active=this._active,n.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),n.maxGeometryCount=this._maxGeometryCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.geometryCount=this._geometryCount,n.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(n.boundingSphere={center:n.boundingSphere.center.toArray(),radius:n.boundingSphere.radius}),this.boundingBox!==null&&(n.boundingBox={min:n.boundingBox.min.toArray(),max:n.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));n.material=a}else n.material=r(e.materials,this.material);if(this.children.length>0){n.children=[];for(let a=0;a<this.children.length;a++)n.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];n.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=n,i;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const n=e.children[i];this.add(n.clone())}return this}}xt.DEFAULT_UP=new w(0,1,0);xt.DEFAULT_MATRIX_AUTO_UPDATE=!0;xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const jt=new w,ci=new w,yr=new w,hi=new w,Qi=new w,en=new w,Ea=new w,Sr=new w,Mr=new w,br=new w;let hs=!1;class Jt{constructor(e=new w,t=new w,i=new w){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,n){n.subVectors(i,t),jt.subVectors(e,t),n.cross(jt);const r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(e,t,i,n,r){jt.subVectors(n,t),ci.subVectors(i,t),yr.subVectors(e,t);const o=jt.dot(jt),a=jt.dot(ci),l=jt.dot(yr),c=ci.dot(ci),h=ci.dot(yr),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,i,n){return this.getBarycoord(e,t,i,n,hi)===null?!1:hi.x>=0&&hi.y>=0&&hi.x+hi.y<=1}static getUV(e,t,i,n,r,o,a,l){return hs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),hs=!0),this.getInterpolation(e,t,i,n,r,o,a,l)}static getInterpolation(e,t,i,n,r,o,a,l){return this.getBarycoord(e,t,i,n,hi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,hi.x),l.addScaledVector(o,hi.y),l.addScaledVector(a,hi.z),l)}static isFrontFacing(e,t,i,n){return jt.subVectors(i,t),ci.subVectors(e,t),jt.cross(ci).dot(n)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,n){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,i,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jt.subVectors(this.c,this.b),ci.subVectors(this.a,this.b),jt.cross(ci).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Jt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Jt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,n,r){return hs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),hs=!0),Jt.getInterpolation(e,this.a,this.b,this.c,t,i,n,r)}getInterpolation(e,t,i,n,r){return Jt.getInterpolation(e,this.a,this.b,this.c,t,i,n,r)}containsPoint(e){return Jt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Jt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,n=this.b,r=this.c;let o,a;Qi.subVectors(n,i),en.subVectors(r,i),Sr.subVectors(e,i);const l=Qi.dot(Sr),c=en.dot(Sr);if(l<=0&&c<=0)return t.copy(i);Mr.subVectors(e,n);const h=Qi.dot(Mr),u=en.dot(Mr);if(h>=0&&u<=h)return t.copy(n);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(i).addScaledVector(Qi,o);br.subVectors(e,r);const f=Qi.dot(br),g=en.dot(br);if(g>=0&&f<=g)return t.copy(r);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(en,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Ea.subVectors(r,n),a=(u-h)/(u-h+(f-g)),t.copy(n).addScaledVector(Ea,a);const p=1/(m+v+d);return o=v*p,a=d*p,t.copy(i).addScaledVector(Qi,o).addScaledVector(en,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Kl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Si={h:0,s:0,l:0},us={h:0,s:0,l:0};function Er(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Oe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const n=e;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=dt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.toWorkingColorSpace(this,t),this}setRGB(e,t,i,n=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=i,Ke.toWorkingColorSpace(this,n),this}setHSL(e,t,i,n=Ke.workingColorSpace){if(e=lo(e,1),t=yt(t,0,1),i=yt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=Er(o,r,e+1/3),this.g=Er(o,r,e),this.b=Er(o,r,e-1/3)}return Ke.toWorkingColorSpace(this,n),this}setStyle(e,t=dt){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=n[1],a=n[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=n[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=dt){const i=Kl[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=_n(e.r),this.g=_n(e.g),this.b=_n(e.b),this}copyLinearToSRGB(e){return this.r=dr(e.r),this.g=dr(e.g),this.b=dr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=dt){return Ke.fromWorkingColorSpace(Et.copy(this),e),Math.round(yt(Et.r*255,0,255))*65536+Math.round(yt(Et.g*255,0,255))*256+Math.round(yt(Et.b*255,0,255))}getHexString(e=dt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.fromWorkingColorSpace(Et.copy(this),t);const i=Et.r,n=Et.g,r=Et.b,o=Math.max(i,n,r),a=Math.min(i,n,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case i:l=(n-r)/u+(n<r?6:0);break;case n:l=(r-i)/u+2;break;case r:l=(i-n)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ke.workingColorSpace){return Ke.fromWorkingColorSpace(Et.copy(this),t),e.r=Et.r,e.g=Et.g,e.b=Et.b,e}getStyle(e=dt){Ke.fromWorkingColorSpace(Et.copy(this),e);const t=Et.r,i=Et.g,n=Et.b;return e!==dt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(e,t,i){return this.getHSL(Si),this.setHSL(Si.h+e,Si.s+t,Si.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Si),e.getHSL(us);const i=Un(Si.h,us.h,t),n=Un(Si.s,us.s,t),r=Un(Si.l,us.l,t);return this.setHSL(i,n,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,n=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*n,this.g=r[1]*t+r[4]*i+r[7]*n,this.b=r[2]*t+r[5]*i+r[8]*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Et=new Oe;Oe.NAMES=Kl;let cu=0;class Xi extends Mn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cu++}),this.uuid=Wi(),this.name="",this.type="Material",this.blending=gn,this.side=mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Hr,this.blendDst=Wr,this.blendEquation=Ni,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Oe(0,0,0),this.blendAlpha=0,this.depthFunc=Bs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ha,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qi,this.stencilZFail=qi,this.stencilZPass=qi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==gn&&(i.blending=this.blending),this.side!==mi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Hr&&(i.blendSrc=this.blendSrc),this.blendDst!==Wr&&(i.blendDst=this.blendDst),this.blendEquation!==Ni&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Bs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ha&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==qi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==qi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==qi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=n(e.textures),o=n(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const n=t.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ni extends Xi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Fl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ut=new w,ds=new re;class Lt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=ua,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ei,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[e+n]=t.array[i+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ds.fromBufferAttribute(this,t),ds.applyMatrix3(e),this.setXY(t,ds.x,ds.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix3(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix4(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.applyNormalMatrix(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.transformDirection(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=dn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=wt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=dn(t,this.array)),t}setX(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=dn(t,this.array)),t}setY(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=dn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=dn(t,this.array)),t}setW(e,t){return this.normalized&&(t=wt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),i=wt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,n){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),i=wt(i,this.array),n=wt(n,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this}setXYZW(e,t,i,n,r){return e*=this.itemSize,this.normalized&&(t=wt(t,this.array),i=wt(i,this.array),n=wt(n,this.array),r=wt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ua&&(e.usage=this.usage),e}}class Ql extends Lt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class ec extends Lt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class st extends Lt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let hu=0;const Ht=new at,Tr=new xt,tn=new w,kt=new Jn,Pn=new Jn,_t=new w;class St extends Mn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hu++}),this.uuid=Wi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Yl(e)?ec:Ql)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new je().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ht.makeRotationFromQuaternion(e),this.applyMatrix4(Ht),this}rotateX(e){return Ht.makeRotationX(e),this.applyMatrix4(Ht),this}rotateY(e){return Ht.makeRotationY(e),this.applyMatrix4(Ht),this}rotateZ(e){return Ht.makeRotationZ(e),this.applyMatrix4(Ht),this}translate(e,t,i){return Ht.makeTranslation(e,t,i),this.applyMatrix4(Ht),this}scale(e,t,i){return Ht.makeScale(e,t,i),this.applyMatrix4(Ht),this}lookAt(e){return Tr.lookAt(e),Tr.updateMatrix(),this.applyMatrix4(Tr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(tn).negate(),this.translate(tn.x,tn.y,tn.z),this}setFromPoints(e){const t=[];for(let i=0,n=e.length;i<n;i++){const r=e[i];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new st(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,n=t.length;i<n;i++){const r=t[i];kt.setFromBufferAttribute(r),this.morphTargetsRelative?(_t.addVectors(this.boundingBox.min,kt.min),this.boundingBox.expandByPoint(_t),_t.addVectors(this.boundingBox.max,kt.max),this.boundingBox.expandByPoint(_t)):(this.boundingBox.expandByPoint(kt.min),this.boundingBox.expandByPoint(kt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Zn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new w,1/0);return}if(e){const i=this.boundingSphere.center;if(kt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Pn.setFromBufferAttribute(a),this.morphTargetsRelative?(_t.addVectors(kt.min,Pn.min),kt.expandByPoint(_t),_t.addVectors(kt.max,Pn.max),kt.expandByPoint(_t)):(kt.expandByPoint(Pn.min),kt.expandByPoint(Pn.max))}kt.getCenter(i);let n=0;for(let r=0,o=e.count;r<o;r++)_t.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(_t));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)_t.fromBufferAttribute(a,c),l&&(tn.fromBufferAttribute(e,c),_t.add(tn)),n=Math.max(n,i.distanceToSquared(_t))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,n=t.position.array,r=t.normal.array,o=t.uv.array,a=n.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Lt(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let E=0;E<a;E++)c[E]=new w,h[E]=new w;const u=new w,d=new w,f=new w,g=new re,v=new re,m=new re,p=new w,M=new w;function _(E,U,z){u.fromArray(n,E*3),d.fromArray(n,U*3),f.fromArray(n,z*3),g.fromArray(o,E*2),v.fromArray(o,U*2),m.fromArray(o,z*2),d.sub(u),f.sub(u),v.sub(g),m.sub(g);const K=1/(v.x*m.y-m.x*v.y);isFinite(K)&&(p.copy(d).multiplyScalar(m.y).addScaledVector(f,-v.y).multiplyScalar(K),M.copy(f).multiplyScalar(v.x).addScaledVector(d,-m.x).multiplyScalar(K),c[E].add(p),c[U].add(p),c[z].add(p),h[E].add(M),h[U].add(M),h[z].add(M))}let T=this.groups;T.length===0&&(T=[{start:0,count:i.length}]);for(let E=0,U=T.length;E<U;++E){const z=T[E],K=z.start,I=z.count;for(let O=K,H=K+I;O<H;O+=3)_(i[O+0],i[O+1],i[O+2])}const L=new w,P=new w,C=new w,N=new w;function S(E){C.fromArray(r,E*3),N.copy(C);const U=c[E];L.copy(U),L.sub(C.multiplyScalar(C.dot(U))).normalize(),P.crossVectors(N,U);const K=P.dot(h[E])<0?-1:1;l[E*4]=L.x,l[E*4+1]=L.y,l[E*4+2]=L.z,l[E*4+3]=K}for(let E=0,U=T.length;E<U;++E){const z=T[E],K=z.start,I=z.count;for(let O=K,H=K+I;O<H;O+=3)S(i[O+0]),S(i[O+1]),S(i[O+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Lt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);const n=new w,r=new w,o=new w,a=new w,l=new w,c=new w,h=new w,u=new w;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),v=e.getX(d+1),m=e.getX(d+2);n.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(n,r),h.cross(u),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)n.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(n,r),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)_t.fromBufferAttribute(e,t),_t.normalize(),e.setXYZ(t,_t.x,_t.y,_t.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new Lt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new St,i=this.index.array,n=this.attributes;for(const a in n){const l=n[a],c=e(l,i);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,i);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const n={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(n[l]=h,r=!0)}r&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const n=e.attributes;for(const c in n){const h=n[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ta=new at,Ii=new Zs,fs=new Zn,Aa=new w,nn=new w,sn=new w,rn=new w,Ar=new w,ps=new w,ms=new re,gs=new re,_s=new re,wa=new w,Pa=new w,Ca=new w,vs=new w,xs=new w;class vt extends xt{constructor(e=new St,t=new ni){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=n.length;r<o;r++){const a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(n,e);const a=this.morphTargetInfluences;if(r&&a){ps.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(Ar.fromBufferAttribute(u,e),o?ps.addScaledVector(Ar,h):ps.addScaledVector(Ar.sub(t),h))}t.add(ps)}return t}raycast(e,t){const i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),fs.copy(i.boundingSphere),fs.applyMatrix4(r),Ii.copy(e.ray).recast(e.near),!(fs.containsPoint(Ii.origin)===!1&&(Ii.intersectSphere(fs,Aa)===null||Ii.origin.distanceToSquared(Aa)>(e.far-e.near)**2))&&(Ta.copy(r).invert(),Ii.copy(e.ray).applyMatrix4(Ta),!(i.boundingBox!==null&&Ii.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ii)))}_computeIntersections(e,t,i){let n;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),_=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let T=M,L=_;T<L;T+=3){const P=a.getX(T),C=a.getX(T+1),N=a.getX(T+2);n=ys(this,p,e,i,c,h,u,P,C,N),n&&(n.faceIndex=Math.floor(T/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const g=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const M=a.getX(m),_=a.getX(m+1),T=a.getX(m+2);n=ys(this,o,e,i,c,h,u,M,_,T),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),_=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let T=M,L=_;T<L;T+=3){const P=T,C=T+1,N=T+2;n=ys(this,p,e,i,c,h,u,P,C,N),n&&(n.faceIndex=Math.floor(T/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const M=m,_=m+1,T=m+2;n=ys(this,o,e,i,c,h,u,M,_,T),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}}}function uu(s,e,t,i,n,r,o,a){let l;if(e.side===Ut?l=i.intersectTriangle(o,r,n,!0,a):l=i.intersectTriangle(n,r,o,e.side===mi,a),l===null)return null;xs.copy(a),xs.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(xs);return c<t.near||c>t.far?null:{distance:c,point:xs.clone(),object:s}}function ys(s,e,t,i,n,r,o,a,l,c){s.getVertexPosition(a,nn),s.getVertexPosition(l,sn),s.getVertexPosition(c,rn);const h=uu(s,e,t,i,nn,sn,rn,vs);if(h){n&&(ms.fromBufferAttribute(n,a),gs.fromBufferAttribute(n,l),_s.fromBufferAttribute(n,c),h.uv=Jt.getInterpolation(vs,nn,sn,rn,ms,gs,_s,new re)),r&&(ms.fromBufferAttribute(r,a),gs.fromBufferAttribute(r,l),_s.fromBufferAttribute(r,c),h.uv1=Jt.getInterpolation(vs,nn,sn,rn,ms,gs,_s,new re),h.uv2=h.uv1),o&&(wa.fromBufferAttribute(o,a),Pa.fromBufferAttribute(o,l),Ca.fromBufferAttribute(o,c),h.normal=Jt.getInterpolation(vs,nn,sn,rn,wa,Pa,Ca,new w),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new w,materialIndex:0};Jt.getNormal(nn,sn,rn,u.normal),h.face=u}return h}class $n extends St{constructor(e=1,t=1,i=1,n=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:n,heightSegments:r,depthSegments:o};const a=this;n=Math.floor(n),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,i,t,e,o,r,0),g("z","y","x",1,-1,i,t,-e,o,r,1),g("x","z","y",1,1,e,i,t,n,o,2),g("x","z","y",1,-1,e,i,-t,n,o,3),g("x","y","z",1,-1,e,t,i,n,r,4),g("x","y","z",-1,-1,e,t,-i,n,r,5),this.setIndex(l),this.setAttribute("position",new st(c,3)),this.setAttribute("normal",new st(h,3)),this.setAttribute("uv",new st(u,2));function g(v,m,p,M,_,T,L,P,C,N,S){const E=T/C,U=L/N,z=T/2,K=L/2,I=P/2,O=C+1,H=N+1;let J=0,Y=0;const X=new w;for(let Q=0;Q<H;Q++){const ee=Q*U-K;for(let ue=0;ue<O;ue++){const W=ue*E-z;X[v]=W*M,X[m]=ee*_,X[p]=I,c.push(X.x,X.y,X.z),X[v]=0,X[m]=0,X[p]=P>0?1:-1,h.push(X.x,X.y,X.z),u.push(ue/C),u.push(1-Q/N),J+=1}}for(let Q=0;Q<N;Q++)for(let ee=0;ee<C;ee++){const ue=d+ee+O*Q,W=d+ee+O*(Q+1),$=d+(ee+1)+O*(Q+1),fe=d+(ee+1)+O*Q;l.push(ue,W,fe),l.push(W,$,fe),Y+=6}a.addGroup(f,Y,S),f+=Y,d+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Sn(s){const e={};for(const t in s){e[t]={};for(const i in s[t]){const n=s[t][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=n.clone():Array.isArray(n)?e[t][i]=n.slice():e[t][i]=n}}return e}function Pt(s){const e={};for(let t=0;t<s.length;t++){const i=Sn(s[t]);for(const n in i)e[n]=i[n]}return e}function du(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function tc(s){return s.getRenderTarget()===null?s.outputColorSpace:Ke.workingColorSpace}const fu={clone:Sn,merge:Pt};var pu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,mu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vi extends Xi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pu,this.fragmentShader=mu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Sn(e.uniforms),this.uniformsGroups=du(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const n in this.uniforms){const o=this.uniforms[n].value;o&&o.isTexture?t.uniforms[n]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[n]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[n]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[n]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[n]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[n]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[n]={type:"m4",value:o.toArray()}:t.uniforms[n]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class ic extends xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new at,this.projectionMatrix=new at,this.projectionMatrixInverse=new at,this.coordinateSystem=fi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Bt extends ic{constructor(e=50,t=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Hn*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Dn*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Hn*2*Math.atan(Math.tan(Dn*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,n,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Dn*.5*this.fov)/this.zoom,i=2*t,n=this.aspect*i,r=-.5*n;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*n/l,t-=o.offsetY*i/c,n*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const on=-90,an=1;class gu extends xt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new Bt(on,an,e,t);n.layers=this.layers,this.add(n);const r=new Bt(on,an,e,t);r.layers=this.layers,this.add(r);const o=new Bt(on,an,e,t);o.layers=this.layers,this.add(o);const a=new Bt(on,an,e,t);a.layers=this.layers,this.add(a);const l=new Bt(on,an,e,t);l.layers=this.layers,this.add(l);const c=new Bt(on,an,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,n,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===fi)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Hs)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,n),e.render(t,r),e.setRenderTarget(i,1,n),e.render(t,o),e.setRenderTarget(i,2,n),e.render(t,a),e.setRenderTarget(i,3,n),e.render(t,l),e.setRenderTarget(i,4,n),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,n),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class nc extends Nt{constructor(e,t,i,n,r,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:vn,super(e,t,i,n,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class _u extends Gi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},n=[i,i,i,i,i,i];t.encoding!==void 0&&(Nn("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===zi?dt:Wt),this.texture=new nc(n,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:It}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},n=new $n(5,5,5),r=new Vi({name:"CubemapFromEquirect",uniforms:Sn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ut,blending:Ti});r.uniforms.tEquirect.value=t;const o=new vt(n,r),a=t.minFilter;return t.minFilter===Gn&&(t.minFilter=It),new gu(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,n){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,n);e.setRenderTarget(r)}}const wr=new w,vu=new w,xu=new je;class Mi{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const n=wr.subVectors(i,t).cross(vu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(wr),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/n;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||xu.getNormalMatrix(e),n=this.coplanarPoint(wr).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Di=new Zn,Ss=new w;class ho{constructor(e=new Mi,t=new Mi,i=new Mi,n=new Mi,r=new Mi,o=new Mi){this.planes=[e,t,i,n,r,o]}set(e,t,i,n,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(n),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=fi){const i=this.planes,n=e.elements,r=n[0],o=n[1],a=n[2],l=n[3],c=n[4],h=n[5],u=n[6],d=n[7],f=n[8],g=n[9],v=n[10],m=n[11],p=n[12],M=n[13],_=n[14],T=n[15];if(i[0].setComponents(l-r,d-c,m-f,T-p).normalize(),i[1].setComponents(l+r,d+c,m+f,T+p).normalize(),i[2].setComponents(l+o,d+h,m+g,T+M).normalize(),i[3].setComponents(l-o,d-h,m-g,T-M).normalize(),i[4].setComponents(l-a,d-u,m-v,T-_).normalize(),t===fi)i[5].setComponents(l+a,d+u,m+v,T+_).normalize();else if(t===Hs)i[5].setComponents(a,u,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Di.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Di.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Di)}intersectsSprite(e){return Di.center.set(0,0,0),Di.radius=.7071067811865476,Di.applyMatrix4(e.matrixWorld),this.intersectsSphere(Di)}intersectsSphere(e){const t=this.planes,i=e.center,n=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const n=t[i];if(Ss.x=n.normal.x>0?e.max.x:e.min.x,Ss.y=n.normal.y>0?e.max.y:e.min.y,Ss.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(Ss)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function sc(){let s=null,e=!1,t=null,i=null;function n(r,o){t(r,o),i=s.requestAnimationFrame(n)}return{start:function(){e!==!0&&t!==null&&(i=s.requestAnimationFrame(n),e=!0)},stop:function(){s.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function yu(s,e){const t=e.isWebGL2,i=new WeakMap;function n(c,h){const u=c.array,d=c.usage,f=u.byteLength,g=s.createBuffer();s.bindBuffer(h,g),s.bufferData(h,u,d),c.onUploadCallback();let v;if(u instanceof Float32Array)v=s.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)v=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=s.UNSIGNED_SHORT;else if(u instanceof Int16Array)v=s.SHORT;else if(u instanceof Uint32Array)v=s.UNSIGNED_INT;else if(u instanceof Int32Array)v=s.INT;else if(u instanceof Int8Array)v=s.BYTE;else if(u instanceof Uint8Array)v=s.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)v=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:v,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:f}}function r(c,h,u){const d=h.array,f=h._updateRange,g=h.updateRanges;if(s.bindBuffer(u,c),f.count===-1&&g.length===0&&s.bufferSubData(u,0,d),g.length!==0){for(let v=0,m=g.length;v<m;v++){const p=g[v];t?s.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d,p.start,p.count):s.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d.subarray(p.start,p.start+p.count))}h.clearUpdateRanges()}f.count!==-1&&(t?s.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):s.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);h&&(s.deleteBuffer(h.buffer),i.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const d=i.get(c);(!d||d.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);if(u===void 0)i.set(c,n(c,h));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,c,h),u.version=c.version}}return{get:o,remove:a,update:l}}class Kn extends St{constructor(e=1,t=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:n};const r=e/2,o=t/2,a=Math.floor(i),l=Math.floor(n),c=a+1,h=l+1,u=e/a,d=t/l,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const M=p*d-o;for(let _=0;_<c;_++){const T=_*u-r;g.push(T,-M,0),v.push(0,0,1),m.push(_/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<a;M++){const _=M+c*p,T=M+c*(p+1),L=M+1+c*(p+1),P=M+1+c*p;f.push(_,T,P),f.push(T,L,P)}this.setIndex(f),this.setAttribute("position",new st(g,3)),this.setAttribute("normal",new st(v,3)),this.setAttribute("uv",new st(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kn(e.width,e.height,e.widthSegments,e.heightSegments)}}var Su=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Mu=`#ifdef USE_ALPHAHASH
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
#endif`,bu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Eu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Tu=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Au=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wu=`#ifdef USE_AOMAP
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
#endif`,Pu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Cu=`#ifdef USE_BATCHING
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
#endif`,Ru=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Lu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Iu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Du=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Uu=`#ifdef USE_IRIDESCENCE
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
#endif`,Nu=`#ifdef USE_BUMPMAP
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
#endif`,Fu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ou=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ku=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Bu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Gu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Vu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Hu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Wu=`#define PI 3.141592653589793
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
} // validated`,Xu=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,qu=`vec3 transformedNormal = objectNormal;
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
#endif`,ju=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Yu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ju=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Zu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$u="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ku=`
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
}`,Qu=`#ifdef USE_ENVMAP
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
#endif`,ed=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,td=`#ifdef USE_ENVMAP
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
#endif`,id=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,nd=`#ifdef USE_ENVMAP
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
#endif`,sd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,od=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ad=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ld=`#ifdef USE_GRADIENTMAP
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
}`,cd=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,hd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ud=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,dd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,fd=`uniform bool receiveShadow;
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
#endif`,pd=`#ifdef USE_ENVMAP
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
#endif`,md=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,gd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,_d=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,vd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xd=`PhysicalMaterial material;
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
#endif`,yd=`struct PhysicalMaterial {
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
}`,Sd=`
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
#endif`,Md=`#if defined( RE_IndirectDiffuse )
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
#endif`,bd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ed=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Td=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ad=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,wd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Pd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Rd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ld=`#if defined( USE_POINTS_UV )
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
#endif`,Id=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Dd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ud=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Nd=`#ifdef USE_MORPHNORMALS
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
#endif`,Fd=`#ifdef USE_MORPHTARGETS
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
#endif`,Od=`#ifdef USE_MORPHTARGETS
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
#endif`,kd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Bd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,zd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Hd=`#ifdef USE_NORMALMAP
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
#endif`,Wd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Yd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Jd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Zd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$d=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Kd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ef=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,tf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,nf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,rf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,of=`float getShadowMask() {
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
}`,af=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lf=`#ifdef USE_SKINNING
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
#endif`,cf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hf=`#ifdef USE_SKINNING
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
#endif`,uf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,df=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ff=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,pf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,mf=`#ifdef USE_TRANSMISSION
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
#endif`,gf=`#ifdef USE_TRANSMISSION
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
#endif`,_f=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Sf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Mf=`uniform sampler2D t2D;
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
}`,bf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ef=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Tf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Af=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wf=`#include <common>
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
}`,Pf=`#if DEPTH_PACKING == 3200
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
}`,Cf=`#define DISTANCE
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
}`,Rf=`#define DISTANCE
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
}`,Lf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,If=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Df=`uniform float scale;
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
}`,Uf=`uniform vec3 diffuse;
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
}`,Nf=`#include <common>
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
}`,Ff=`uniform vec3 diffuse;
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
}`,Of=`#define LAMBERT
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
}`,kf=`#define LAMBERT
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
}`,Bf=`#define MATCAP
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
}`,zf=`#define MATCAP
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
}`,Gf=`#define NORMAL
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
}`,Vf=`#define NORMAL
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
}`,Hf=`#define PHONG
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
}`,Wf=`#define PHONG
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
}`,Xf=`#define STANDARD
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
}`,qf=`#define STANDARD
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
}`,jf=`#define TOON
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
}`,Yf=`#define TOON
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
}`,Jf=`uniform float size;
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
}`,Zf=`uniform vec3 diffuse;
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
}`,$f=`#include <common>
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
}`,Kf=`uniform vec3 color;
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
}`,Qf=`uniform float rotation;
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
}`,ep=`uniform vec3 diffuse;
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
}`,He={alphahash_fragment:Su,alphahash_pars_fragment:Mu,alphamap_fragment:bu,alphamap_pars_fragment:Eu,alphatest_fragment:Tu,alphatest_pars_fragment:Au,aomap_fragment:wu,aomap_pars_fragment:Pu,batching_pars_vertex:Cu,batching_vertex:Ru,begin_vertex:Lu,beginnormal_vertex:Iu,bsdfs:Du,iridescence_fragment:Uu,bumpmap_pars_fragment:Nu,clipping_planes_fragment:Fu,clipping_planes_pars_fragment:Ou,clipping_planes_pars_vertex:ku,clipping_planes_vertex:Bu,color_fragment:zu,color_pars_fragment:Gu,color_pars_vertex:Vu,color_vertex:Hu,common:Wu,cube_uv_reflection_fragment:Xu,defaultnormal_vertex:qu,displacementmap_pars_vertex:ju,displacementmap_vertex:Yu,emissivemap_fragment:Ju,emissivemap_pars_fragment:Zu,colorspace_fragment:$u,colorspace_pars_fragment:Ku,envmap_fragment:Qu,envmap_common_pars_fragment:ed,envmap_pars_fragment:td,envmap_pars_vertex:id,envmap_physical_pars_fragment:pd,envmap_vertex:nd,fog_vertex:sd,fog_pars_vertex:rd,fog_fragment:od,fog_pars_fragment:ad,gradientmap_pars_fragment:ld,lightmap_fragment:cd,lightmap_pars_fragment:hd,lights_lambert_fragment:ud,lights_lambert_pars_fragment:dd,lights_pars_begin:fd,lights_toon_fragment:md,lights_toon_pars_fragment:gd,lights_phong_fragment:_d,lights_phong_pars_fragment:vd,lights_physical_fragment:xd,lights_physical_pars_fragment:yd,lights_fragment_begin:Sd,lights_fragment_maps:Md,lights_fragment_end:bd,logdepthbuf_fragment:Ed,logdepthbuf_pars_fragment:Td,logdepthbuf_pars_vertex:Ad,logdepthbuf_vertex:wd,map_fragment:Pd,map_pars_fragment:Cd,map_particle_fragment:Rd,map_particle_pars_fragment:Ld,metalnessmap_fragment:Id,metalnessmap_pars_fragment:Dd,morphcolor_vertex:Ud,morphnormal_vertex:Nd,morphtarget_pars_vertex:Fd,morphtarget_vertex:Od,normal_fragment_begin:kd,normal_fragment_maps:Bd,normal_pars_fragment:zd,normal_pars_vertex:Gd,normal_vertex:Vd,normalmap_pars_fragment:Hd,clearcoat_normal_fragment_begin:Wd,clearcoat_normal_fragment_maps:Xd,clearcoat_pars_fragment:qd,iridescence_pars_fragment:jd,opaque_fragment:Yd,packing:Jd,premultiplied_alpha_fragment:Zd,project_vertex:$d,dithering_fragment:Kd,dithering_pars_fragment:Qd,roughnessmap_fragment:ef,roughnessmap_pars_fragment:tf,shadowmap_pars_fragment:nf,shadowmap_pars_vertex:sf,shadowmap_vertex:rf,shadowmask_pars_fragment:of,skinbase_vertex:af,skinning_pars_vertex:lf,skinning_vertex:cf,skinnormal_vertex:hf,specularmap_fragment:uf,specularmap_pars_fragment:df,tonemapping_fragment:ff,tonemapping_pars_fragment:pf,transmission_fragment:mf,transmission_pars_fragment:gf,uv_pars_fragment:_f,uv_pars_vertex:vf,uv_vertex:xf,worldpos_vertex:yf,background_vert:Sf,background_frag:Mf,backgroundCube_vert:bf,backgroundCube_frag:Ef,cube_vert:Tf,cube_frag:Af,depth_vert:wf,depth_frag:Pf,distanceRGBA_vert:Cf,distanceRGBA_frag:Rf,equirect_vert:Lf,equirect_frag:If,linedashed_vert:Df,linedashed_frag:Uf,meshbasic_vert:Nf,meshbasic_frag:Ff,meshlambert_vert:Of,meshlambert_frag:kf,meshmatcap_vert:Bf,meshmatcap_frag:zf,meshnormal_vert:Gf,meshnormal_frag:Vf,meshphong_vert:Hf,meshphong_frag:Wf,meshphysical_vert:Xf,meshphysical_frag:qf,meshtoon_vert:jf,meshtoon_frag:Yf,points_vert:Jf,points_frag:Zf,shadow_vert:$f,shadow_frag:Kf,sprite_vert:Qf,sprite_frag:ep},he={common:{diffuse:{value:new Oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new Oe(16777215)},opacity:{value:1},center:{value:new re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},ii={basic:{uniforms:Pt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:Pt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Oe(0)}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:Pt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Oe(0)},specular:{value:new Oe(1118481)},shininess:{value:30}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:Pt([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new Oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:Pt([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new Oe(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:Pt([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:Pt([he.points,he.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:Pt([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:Pt([he.common,he.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:Pt([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:Pt([he.sprite,he.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distanceRGBA:{uniforms:Pt([he.common,he.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distanceRGBA_vert,fragmentShader:He.distanceRGBA_frag},shadow:{uniforms:Pt([he.lights,he.fog,{color:{value:new Oe(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};ii.physical={uniforms:Pt([ii.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new Oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new Oe(0)},specularColor:{value:new Oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};const Ms={r:0,b:0,g:0};function tp(s,e,t,i,n,r,o){const a=new Oe(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(m,p){let M=!1,_=p.isScene===!0?p.background:null;_&&_.isTexture&&(_=(p.backgroundBlurriness>0?t:e).get(_)),_===null?v(a,l):_&&_.isColor&&(v(_,1),M=!0);const T=s.xr.getEnvironmentBlendMode();T==="additive"?i.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(s.autoClear||M)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),_&&(_.isCubeTexture||_.mapping===Ys)?(h===void 0&&(h=new vt(new $n(1,1,1),new Vi({name:"BackgroundCubeMaterial",uniforms:Sn(ii.backgroundCube.uniforms),vertexShader:ii.backgroundCube.vertexShader,fragmentShader:ii.backgroundCube.fragmentShader,side:Ut,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,P,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(h)),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,h.material.toneMapped=Ke.getTransfer(_.colorSpace)!==it,(u!==_||d!==_.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=_,d=_.version,f=s.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new vt(new Kn(2,2),new Vi({name:"BackgroundMaterial",uniforms:Sn(ii.background.uniforms),vertexShader:ii.background.vertexShader,fragmentShader:ii.background.fragmentShader,side:mi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=Ke.getTransfer(_.colorSpace)!==it,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||d!==_.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=_,d=_.version,f=s.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function v(m,p){m.getRGB(Ms,tc(s)),i.buffers.color.setClear(Ms.r,Ms.g,Ms.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),l=p,v(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,v(a,l)},render:g}}function ip(s,e,t,i){const n=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||r!==null,a={},l=m(null);let c=l,h=!1;function u(I,O,H,J,Y){let X=!1;if(o){const Q=v(J,H,O);c!==Q&&(c=Q,f(c.object)),X=p(I,J,H,Y),X&&M(I,J,H,Y)}else{const Q=O.wireframe===!0;(c.geometry!==J.id||c.program!==H.id||c.wireframe!==Q)&&(c.geometry=J.id,c.program=H.id,c.wireframe=Q,X=!0)}Y!==null&&t.update(Y,s.ELEMENT_ARRAY_BUFFER),(X||h)&&(h=!1,N(I,O,H,J),Y!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(Y).buffer))}function d(){return i.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function f(I){return i.isWebGL2?s.bindVertexArray(I):r.bindVertexArrayOES(I)}function g(I){return i.isWebGL2?s.deleteVertexArray(I):r.deleteVertexArrayOES(I)}function v(I,O,H){const J=H.wireframe===!0;let Y=a[I.id];Y===void 0&&(Y={},a[I.id]=Y);let X=Y[O.id];X===void 0&&(X={},Y[O.id]=X);let Q=X[J];return Q===void 0&&(Q=m(d()),X[J]=Q),Q}function m(I){const O=[],H=[],J=[];for(let Y=0;Y<n;Y++)O[Y]=0,H[Y]=0,J[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:H,attributeDivisors:J,object:I,attributes:{},index:null}}function p(I,O,H,J){const Y=c.attributes,X=O.attributes;let Q=0;const ee=H.getAttributes();for(const ue in ee)if(ee[ue].location>=0){const $=Y[ue];let fe=X[ue];if(fe===void 0&&(ue==="instanceMatrix"&&I.instanceMatrix&&(fe=I.instanceMatrix),ue==="instanceColor"&&I.instanceColor&&(fe=I.instanceColor)),$===void 0||$.attribute!==fe||fe&&$.data!==fe.data)return!0;Q++}return c.attributesNum!==Q||c.index!==J}function M(I,O,H,J){const Y={},X=O.attributes;let Q=0;const ee=H.getAttributes();for(const ue in ee)if(ee[ue].location>=0){let $=X[ue];$===void 0&&(ue==="instanceMatrix"&&I.instanceMatrix&&($=I.instanceMatrix),ue==="instanceColor"&&I.instanceColor&&($=I.instanceColor));const fe={};fe.attribute=$,$&&$.data&&(fe.data=$.data),Y[ue]=fe,Q++}c.attributes=Y,c.attributesNum=Q,c.index=J}function _(){const I=c.newAttributes;for(let O=0,H=I.length;O<H;O++)I[O]=0}function T(I){L(I,0)}function L(I,O){const H=c.newAttributes,J=c.enabledAttributes,Y=c.attributeDivisors;H[I]=1,J[I]===0&&(s.enableVertexAttribArray(I),J[I]=1),Y[I]!==O&&((i.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](I,O),Y[I]=O)}function P(){const I=c.newAttributes,O=c.enabledAttributes;for(let H=0,J=O.length;H<J;H++)O[H]!==I[H]&&(s.disableVertexAttribArray(H),O[H]=0)}function C(I,O,H,J,Y,X,Q){Q===!0?s.vertexAttribIPointer(I,O,H,Y,X):s.vertexAttribPointer(I,O,H,J,Y,X)}function N(I,O,H,J){if(i.isWebGL2===!1&&(I.isInstancedMesh||J.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;_();const Y=J.attributes,X=H.getAttributes(),Q=O.defaultAttributeValues;for(const ee in X){const ue=X[ee];if(ue.location>=0){let W=Y[ee];if(W===void 0&&(ee==="instanceMatrix"&&I.instanceMatrix&&(W=I.instanceMatrix),ee==="instanceColor"&&I.instanceColor&&(W=I.instanceColor)),W!==void 0){const $=W.normalized,fe=W.itemSize,Se=t.get(W);if(Se===void 0)continue;const _e=Se.buffer,Pe=Se.type,Ue=Se.bytesPerElement,ae=i.isWebGL2===!0&&(Pe===s.INT||Pe===s.UNSIGNED_INT||W.gpuType===kl);if(W.isInterleavedBufferAttribute){const Le=W.data,R=Le.stride,le=W.offset;if(Le.isInstancedInterleavedBuffer){for(let j=0;j<ue.locationSize;j++)L(ue.location+j,Le.meshPerAttribute);I.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=Le.meshPerAttribute*Le.count)}else for(let j=0;j<ue.locationSize;j++)T(ue.location+j);s.bindBuffer(s.ARRAY_BUFFER,_e);for(let j=0;j<ue.locationSize;j++)C(ue.location+j,fe/ue.locationSize,Pe,$,R*Ue,(le+fe/ue.locationSize*j)*Ue,ae)}else{if(W.isInstancedBufferAttribute){for(let Le=0;Le<ue.locationSize;Le++)L(ue.location+Le,W.meshPerAttribute);I.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let Le=0;Le<ue.locationSize;Le++)T(ue.location+Le);s.bindBuffer(s.ARRAY_BUFFER,_e);for(let Le=0;Le<ue.locationSize;Le++)C(ue.location+Le,fe/ue.locationSize,Pe,$,fe*Ue,fe/ue.locationSize*Le*Ue,ae)}}else if(Q!==void 0){const $=Q[ee];if($!==void 0)switch($.length){case 2:s.vertexAttrib2fv(ue.location,$);break;case 3:s.vertexAttrib3fv(ue.location,$);break;case 4:s.vertexAttrib4fv(ue.location,$);break;default:s.vertexAttrib1fv(ue.location,$)}}}}P()}function S(){z();for(const I in a){const O=a[I];for(const H in O){const J=O[H];for(const Y in J)g(J[Y].object),delete J[Y];delete O[H]}delete a[I]}}function E(I){if(a[I.id]===void 0)return;const O=a[I.id];for(const H in O){const J=O[H];for(const Y in J)g(J[Y].object),delete J[Y];delete O[H]}delete a[I.id]}function U(I){for(const O in a){const H=a[O];if(H[I.id]===void 0)continue;const J=H[I.id];for(const Y in J)g(J[Y].object),delete J[Y];delete H[I.id]}}function z(){K(),h=!0,c!==l&&(c=l,f(c.object))}function K(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:z,resetDefaultState:K,dispose:S,releaseStatesOfGeometry:E,releaseStatesOfProgram:U,initAttributes:_,enableAttribute:T,disableUnusedAttributes:P}}function np(s,e,t,i){const n=i.isWebGL2;let r;function o(h){r=h}function a(h,u){s.drawArrays(r,h,u),t.update(u,r,1)}function l(h,u,d){if(d===0)return;let f,g;if(n)f=s,g="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](r,h,u,d),t.update(u,r,d)}function c(h,u,d){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<d;g++)this.render(h[g],u[g]);else{f.multiDrawArraysWEBGL(r,h,0,u,0,d);let g=0;for(let v=0;v<d;v++)g+=u[v];t.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function sp(s,e,t){let i;function n(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(C){if(C==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=r(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),d=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),v=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),p=s.getParameter(s.MAX_VARYING_VECTORS),M=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),_=d>0,T=o||e.has("OES_texture_float"),L=_&&T,P=o?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:n,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:g,maxAttributes:v,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:M,vertexTextures:_,floatFragmentTextures:T,floatVertexTextures:L,maxSamples:P}}function rp(s){const e=this;let t=null,i=0,n=!1,r=!1;const o=new Mi,a=new je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||i!==0||n;return n=d,i=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!n||g===null||g.length===0||r&&!m)r?h(null):c();else{const M=r?0:i,_=M*4;let T=p.clippingState||null;l.value=T,T=h(g,d,_,f);for(let L=0;L!==_;++L)T[L]=t[L];p.clippingState=T,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,d,f,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=f+v*4,M=d.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let _=0,T=f;_!==v;++_,T+=4)o.copy(u[_]).applyMatrix4(M,a),o.normal.toArray(m,T),m[T+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function op(s){let e=new WeakMap;function t(o,a){return a===Xr?o.mapping=vn:a===qr&&(o.mapping=xn),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Xr||a===qr)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new _u(l.height/2);return c.fromEquirectangularTexture(s,o),e.set(o,c),o.addEventListener("dispose",n),t(c.texture,o.mapping)}else return null}}return o}function n(o){const a=o.target;a.removeEventListener("dispose",n);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}class rc extends ic{constructor(e=-1,t=1,i=1,n=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let r=i-e,o=i+e,a=n+t,l=n-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const fn=4,Ra=[.125,.215,.35,.446,.526,.582],Fi=20,Pr=new rc,La=new Oe;let Cr=null,Rr=0,Lr=0;const Ui=(1+Math.sqrt(5))/2,ln=1/Ui,Ia=[new w(1,1,1),new w(-1,1,1),new w(1,1,-1),new w(-1,1,-1),new w(0,Ui,ln),new w(0,Ui,-ln),new w(ln,0,Ui),new w(-ln,0,Ui),new w(Ui,ln,0),new w(-Ui,ln,0)];class Da{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,n=100){Cr=this._renderer.getRenderTarget(),Rr=this._renderer.getActiveCubeFace(),Lr=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,n,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fa(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Na(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Cr,Rr,Lr),e.scissorTest=!1,bs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===vn||e.mapping===xn?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Cr=this._renderer.getRenderTarget(),Rr=this._renderer.getActiveCubeFace(),Lr=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:It,minFilter:It,generateMipmaps:!1,type:Vn,format:$t,colorSpace:gi,depthBuffer:!1},n=Ua(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ua(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ap(r)),this._blurMaterial=lp(r,e,t)}return n}_compileMaterial(e){const t=new vt(this._lodPlanes[0],e);this._renderer.compile(t,Pr)}_sceneToCubeUV(e,t,i,n){const a=new Bt(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(La),h.toneMapping=Ai,h.autoClear=!1;const f=new ni({name:"PMREM.Background",side:Ut,depthWrite:!1,depthTest:!1}),g=new vt(new $n,f);let v=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,v=!0):(f.color.copy(La),v=!0);for(let p=0;p<6;p++){const M=p%3;M===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):M===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const _=this._cubeSize;bs(n,M*_,p>2?_:0,_,_),h.setRenderTarget(n),v&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,n=e.mapping===vn||e.mapping===xn;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fa()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Na());const r=n?this._cubemapMaterial:this._equirectMaterial,o=new vt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;bs(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,Pr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let n=1;n<this._lodPlanes.length;n++){const r=Math.sqrt(this._sigmas[n]*this._sigmas[n]-this._sigmas[n-1]*this._sigmas[n-1]),o=Ia[(n-1)%Ia.length];this._blur(e,n-1,n,r,o)}t.autoClear=i}_blur(e,t,i,n,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,n,"latitudinal",r),this._halfBlur(o,e,i,i,n,"longitudinal",r)}_halfBlur(e,t,i,n,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new vt(this._lodPlanes[n],c),d=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Fi-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):Fi;m>Fi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Fi}`);const p=[];let M=0;for(let C=0;C<Fi;++C){const N=C/v,S=Math.exp(-N*N/2);p.push(S),C===0?M+=S:C<m&&(M+=2*S)}for(let C=0;C<p.length;C++)p[C]=p[C]/M;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:_}=this;d.dTheta.value=g,d.mipInt.value=_-i;const T=this._sizeLods[n],L=3*T*(n>_-fn?n-_+fn:0),P=4*(this._cubeSize-T);bs(t,L,P,3*T,2*T),l.setRenderTarget(t),l.render(u,Pr)}}function ap(s){const e=[],t=[],i=[];let n=s;const r=s-fn+1+Ra.length;for(let o=0;o<r;o++){const a=Math.pow(2,n);t.push(a);let l=1/a;o>s-fn?l=Ra[o-s+fn-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,v=3,m=2,p=1,M=new Float32Array(v*g*f),_=new Float32Array(m*g*f),T=new Float32Array(p*g*f);for(let P=0;P<f;P++){const C=P%3*2/3-1,N=P>2?0:-1,S=[C,N,0,C+2/3,N,0,C+2/3,N+1,0,C,N,0,C+2/3,N+1,0,C,N+1,0];M.set(S,v*g*P),_.set(d,m*g*P);const E=[P,P,P,P,P,P];T.set(E,p*g*P)}const L=new St;L.setAttribute("position",new Lt(M,v)),L.setAttribute("uv",new Lt(_,m)),L.setAttribute("faceIndex",new Lt(T,p)),e.push(L),n>fn&&n--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Ua(s,e,t){const i=new Gi(s,e,t);return i.texture.mapping=Ys,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function bs(s,e,t,i,n){s.viewport.set(e,t,i,n),s.scissor.set(e,t,i,n)}function lp(s,e,t){const i=new Float32Array(Fi),n=new w(0,1,0);return new Vi({name:"SphericalGaussianBlur",defines:{n:Fi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:uo(),fragmentShader:`

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
		`,blending:Ti,depthTest:!1,depthWrite:!1})}function Na(){return new Vi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:uo(),fragmentShader:`

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
		`,blending:Ti,depthTest:!1,depthWrite:!1})}function Fa(){return new Vi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:uo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ti,depthTest:!1,depthWrite:!1})}function uo(){return`

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
	`}function cp(s){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Xr||l===qr,h=l===vn||l===xn;if(c||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return t===null&&(t=new Da(s)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{const u=a.image;if(c&&u&&u.height>0||h&&u&&n(u)){t===null&&(t=new Da(s));const d=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,d),a.addEventListener("dispose",r),d.texture}else return null}}}return a}function n(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function hp(s){const e={};function t(i){if(e[i]!==void 0)return e[i];let n;switch(i){case"WEBGL_depth_texture":n=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":n=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":n=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":n=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:n=s.getExtension(i)}return e[i]=n,n}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const n=t(i);return n===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),n}}}function up(s,e,t,i){const n={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const v=d.morphAttributes[g];for(let m=0,p=v.length;m<p;m++)e.remove(v[m])}d.removeEventListener("dispose",o),delete n[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return n[d.id]===!0||(d.addEventListener("dispose",o),n[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)e.update(d[g],s.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const v=f[g];for(let m=0,p=v.length;m<p;m++)e.update(v[m],s.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,g=u.attributes.position;let v=0;if(f!==null){const M=f.array;v=f.version;for(let _=0,T=M.length;_<T;_+=3){const L=M[_+0],P=M[_+1],C=M[_+2];d.push(L,P,P,C,C,L)}}else if(g!==void 0){const M=g.array;v=g.version;for(let _=0,T=M.length/3-1;_<T;_+=3){const L=_+0,P=_+1,C=_+2;d.push(L,P,P,C,C,L)}}else return;const m=new(Yl(d)?ec:Ql)(d,1);m.version=v;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function dp(s,e,t,i){const n=i.isWebGL2;let r;function o(f){r=f}let a,l;function c(f){a=f.type,l=f.bytesPerElement}function h(f,g){s.drawElements(r,g,a,f*l),t.update(g,r,1)}function u(f,g,v){if(v===0)return;let m,p;if(n)m=s,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,g,a,f*l,v),t.update(g,r,v)}function d(f,g,v){if(v===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<v;p++)this.render(f[p]/l,g[p]);else{m.multiDrawElementsWEBGL(r,g,0,a,f,0,v);let p=0;for(let M=0;M<v;M++)p+=g[M];t.update(p,r,1)}}this.setMode=o,this.setIndex=c,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function fp(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function n(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:n,update:i}}function pp(s,e){return s[0]-e[0]}function mp(s,e){return Math.abs(e[1])-Math.abs(s[1])}function gp(s,e,t){const i={},n=new Float32Array(8),r=new WeakMap,o=new nt,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,h,u){const d=c.morphTargetInfluences;if(e.isWebGL2===!0){const f=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=f!==void 0?f.length:0;let v=r.get(h);if(v===void 0||v.count!==g){let I=function(){z.dispose(),r.delete(h),h.removeEventListener("dispose",I)};v!==void 0&&v.texture.dispose();const M=h.morphAttributes.position!==void 0,_=h.morphAttributes.normal!==void 0,T=h.morphAttributes.color!==void 0,L=h.morphAttributes.position||[],P=h.morphAttributes.normal||[],C=h.morphAttributes.color||[];let N=0;M===!0&&(N=1),_===!0&&(N=2),T===!0&&(N=3);let S=h.attributes.position.count*N,E=1;S>e.maxTextureSize&&(E=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const U=new Float32Array(S*E*4*g),z=new $l(U,S,E,g);z.type=Ei,z.needsUpdate=!0;const K=N*4;for(let O=0;O<g;O++){const H=L[O],J=P[O],Y=C[O],X=S*E*4*O;for(let Q=0;Q<H.count;Q++){const ee=Q*K;M===!0&&(o.fromBufferAttribute(H,Q),U[X+ee+0]=o.x,U[X+ee+1]=o.y,U[X+ee+2]=o.z,U[X+ee+3]=0),_===!0&&(o.fromBufferAttribute(J,Q),U[X+ee+4]=o.x,U[X+ee+5]=o.y,U[X+ee+6]=o.z,U[X+ee+7]=0),T===!0&&(o.fromBufferAttribute(Y,Q),U[X+ee+8]=o.x,U[X+ee+9]=o.y,U[X+ee+10]=o.z,U[X+ee+11]=Y.itemSize===4?o.w:1)}}v={count:g,texture:z,size:new re(S,E)},r.set(h,v),h.addEventListener("dispose",I)}let m=0;for(let M=0;M<d.length;M++)m+=d[M];const p=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(s,"morphTargetBaseInfluence",p),u.getUniforms().setValue(s,"morphTargetInfluences",d),u.getUniforms().setValue(s,"morphTargetsTexture",v.texture,t),u.getUniforms().setValue(s,"morphTargetsTextureSize",v.size)}else{const f=d===void 0?0:d.length;let g=i[h.id];if(g===void 0||g.length!==f){g=[];for(let _=0;_<f;_++)g[_]=[_,0];i[h.id]=g}for(let _=0;_<f;_++){const T=g[_];T[0]=_,T[1]=d[_]}g.sort(mp);for(let _=0;_<8;_++)_<f&&g[_][1]?(a[_][0]=g[_][0],a[_][1]=g[_][1]):(a[_][0]=Number.MAX_SAFE_INTEGER,a[_][1]=0);a.sort(pp);const v=h.morphAttributes.position,m=h.morphAttributes.normal;let p=0;for(let _=0;_<8;_++){const T=a[_],L=T[0],P=T[1];L!==Number.MAX_SAFE_INTEGER&&P?(v&&h.getAttribute("morphTarget"+_)!==v[L]&&h.setAttribute("morphTarget"+_,v[L]),m&&h.getAttribute("morphNormal"+_)!==m[L]&&h.setAttribute("morphNormal"+_,m[L]),n[_]=P,p+=P):(v&&h.hasAttribute("morphTarget"+_)===!0&&h.deleteAttribute("morphTarget"+_),m&&h.hasAttribute("morphNormal"+_)===!0&&h.deleteAttribute("morphNormal"+_),n[_]=0)}const M=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(s,"morphTargetBaseInfluence",M),u.getUniforms().setValue(s,"morphTargetInfluences",n)}}return{update:l}}function _p(s,e,t,i){let n=new WeakMap;function r(l){const c=i.render.frame,h=l.geometry,u=e.get(l,h);if(n.get(u)!==c&&(e.update(u),n.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),n.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),n.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;n.get(d)!==c&&(d.update(),n.set(d,c))}return u}function o(){n=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class oc extends Nt{constructor(e,t,i,n,r,o,a,l,c,h){if(h=h!==void 0?h:Bi,h!==Bi&&h!==yn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Bi&&(i=bi),i===void 0&&h===yn&&(i=ki),super(null,n,r,o,a,l,h,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Ct,this.minFilter=l!==void 0?l:Ct,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const ac=new Nt,lc=new oc(1,1);lc.compareFunction=jl;const cc=new $l,hc=new eu,uc=new nc,Oa=[],ka=[],Ba=new Float32Array(16),za=new Float32Array(9),Ga=new Float32Array(4);function bn(s,e,t){const i=s[0];if(i<=0||i>0)return s;const n=e*t;let r=Oa[n];if(r===void 0&&(r=new Float32Array(n),Oa[n]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function ft(s,e){if(s.length!==e.length)return!1;for(let t=0,i=s.length;t<i;t++)if(s[t]!==e[t])return!1;return!0}function pt(s,e){for(let t=0,i=e.length;t<i;t++)s[t]=e[t]}function Ks(s,e){let t=ka[e];t===void 0&&(t=new Int32Array(e),ka[e]=t);for(let i=0;i!==e;++i)t[i]=s.allocateTextureUnit();return t}function vp(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function xp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;s.uniform2fv(this.addr,e),pt(t,e)}}function yp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ft(t,e))return;s.uniform3fv(this.addr,e),pt(t,e)}}function Sp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;s.uniform4fv(this.addr,e),pt(t,e)}}function Mp(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(ft(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,i))return;Ga.set(i),s.uniformMatrix2fv(this.addr,!1,Ga),pt(t,i)}}function bp(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(ft(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,i))return;za.set(i),s.uniformMatrix3fv(this.addr,!1,za),pt(t,i)}}function Ep(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(ft(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,i))return;Ba.set(i),s.uniformMatrix4fv(this.addr,!1,Ba),pt(t,i)}}function Tp(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Ap(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;s.uniform2iv(this.addr,e),pt(t,e)}}function wp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;s.uniform3iv(this.addr,e),pt(t,e)}}function Pp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;s.uniform4iv(this.addr,e),pt(t,e)}}function Cp(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Rp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;s.uniform2uiv(this.addr,e),pt(t,e)}}function Lp(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;s.uniform3uiv(this.addr,e),pt(t,e)}}function Ip(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;s.uniform4uiv(this.addr,e),pt(t,e)}}function Dp(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);const r=this.type===s.SAMPLER_2D_SHADOW?lc:ac;t.setTexture2D(e||r,n)}function Up(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture3D(e||hc,n)}function Np(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTextureCube(e||uc,n)}function Fp(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture2DArray(e||cc,n)}function Op(s){switch(s){case 5126:return vp;case 35664:return xp;case 35665:return yp;case 35666:return Sp;case 35674:return Mp;case 35675:return bp;case 35676:return Ep;case 5124:case 35670:return Tp;case 35667:case 35671:return Ap;case 35668:case 35672:return wp;case 35669:case 35673:return Pp;case 5125:return Cp;case 36294:return Rp;case 36295:return Lp;case 36296:return Ip;case 35678:case 36198:case 36298:case 36306:case 35682:return Dp;case 35679:case 36299:case 36307:return Up;case 35680:case 36300:case 36308:case 36293:return Np;case 36289:case 36303:case 36311:case 36292:return Fp}}function kp(s,e){s.uniform1fv(this.addr,e)}function Bp(s,e){const t=bn(e,this.size,2);s.uniform2fv(this.addr,t)}function zp(s,e){const t=bn(e,this.size,3);s.uniform3fv(this.addr,t)}function Gp(s,e){const t=bn(e,this.size,4);s.uniform4fv(this.addr,t)}function Vp(s,e){const t=bn(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Hp(s,e){const t=bn(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Wp(s,e){const t=bn(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Xp(s,e){s.uniform1iv(this.addr,e)}function qp(s,e){s.uniform2iv(this.addr,e)}function jp(s,e){s.uniform3iv(this.addr,e)}function Yp(s,e){s.uniform4iv(this.addr,e)}function Jp(s,e){s.uniform1uiv(this.addr,e)}function Zp(s,e){s.uniform2uiv(this.addr,e)}function $p(s,e){s.uniform3uiv(this.addr,e)}function Kp(s,e){s.uniform4uiv(this.addr,e)}function Qp(s,e,t){const i=this.cache,n=e.length,r=Ks(t,n);ft(i,r)||(s.uniform1iv(this.addr,r),pt(i,r));for(let o=0;o!==n;++o)t.setTexture2D(e[o]||ac,r[o])}function em(s,e,t){const i=this.cache,n=e.length,r=Ks(t,n);ft(i,r)||(s.uniform1iv(this.addr,r),pt(i,r));for(let o=0;o!==n;++o)t.setTexture3D(e[o]||hc,r[o])}function tm(s,e,t){const i=this.cache,n=e.length,r=Ks(t,n);ft(i,r)||(s.uniform1iv(this.addr,r),pt(i,r));for(let o=0;o!==n;++o)t.setTextureCube(e[o]||uc,r[o])}function im(s,e,t){const i=this.cache,n=e.length,r=Ks(t,n);ft(i,r)||(s.uniform1iv(this.addr,r),pt(i,r));for(let o=0;o!==n;++o)t.setTexture2DArray(e[o]||cc,r[o])}function nm(s){switch(s){case 5126:return kp;case 35664:return Bp;case 35665:return zp;case 35666:return Gp;case 35674:return Vp;case 35675:return Hp;case 35676:return Wp;case 5124:case 35670:return Xp;case 35667:case 35671:return qp;case 35668:case 35672:return jp;case 35669:case 35673:return Yp;case 5125:return Jp;case 36294:return Zp;case 36295:return $p;case 36296:return Kp;case 35678:case 36198:case 36298:case 36306:case 35682:return Qp;case 35679:case 36299:case 36307:return em;case 35680:case 36300:case 36308:case 36293:return tm;case 36289:case 36303:case 36311:case 36292:return im}}class sm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Op(t.type)}}class rm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=nm(t.type)}}class om{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const n=this.seq;for(let r=0,o=n.length;r!==o;++r){const a=n[r];a.setValue(e,t[a.id],i)}}}const Ir=/(\w+)(\])?(\[|\.)?/g;function Va(s,e){s.seq.push(e),s.map[e.id]=e}function am(s,e,t){const i=s.name,n=i.length;for(Ir.lastIndex=0;;){const r=Ir.exec(i),o=Ir.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===n){Va(t,c===void 0?new sm(a,s,e):new rm(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new om(a),Va(t,u)),t=u}}}class Os{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){const r=e.getActiveUniform(t,n),o=e.getUniformLocation(t,r.name);am(r,o,this)}}setValue(e,t,i,n){const r=this.map[t];r!==void 0&&r.setValue(e,i,n)}setOptional(e,t,i){const n=t[i];n!==void 0&&this.setValue(e,i,n)}static upload(e,t,i,n){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,n)}}static seqWithValue(e,t){const i=[];for(let n=0,r=e.length;n!==r;++n){const o=e[n];o.id in t&&i.push(o)}return i}}function Ha(s,e,t){const i=s.createShader(e);return s.shaderSource(i,t),s.compileShader(i),i}const lm=37297;let cm=0;function hm(s,e){const t=s.split(`
`),i=[],n=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=n;o<r;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}function um(s){const e=Ke.getPrimaries(Ke.workingColorSpace),t=Ke.getPrimaries(s);let i;switch(e===t?i="":e===Vs&&t===Gs?i="LinearDisplayP3ToLinearSRGB":e===Gs&&t===Vs&&(i="LinearSRGBToLinearDisplayP3"),s){case gi:case Js:return[i,"LinearTransferOETF"];case dt:case ao:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[i,"LinearTransferOETF"]}}function Wa(s,e,t){const i=s.getShaderParameter(e,s.COMPILE_STATUS),n=s.getShaderInfoLog(e).trim();if(i&&n==="")return"";const r=/ERROR: 0:(\d+)/.exec(n);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+n+`

`+hm(s.getShaderSource(e),o)}else return n}function dm(s,e){const t=um(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function fm(s,e){let t;switch(e){case hh:t="Linear";break;case uh:t="Reinhard";break;case dh:t="OptimizedCineon";break;case fh:t="ACESFilmic";break;case mh:t="AgX";break;case ph:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function pm(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(pn).join(`
`)}function mm(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(pn).join(`
`)}function gm(s){const e=[];for(const t in s){const i=s[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function _m(s,e){const t={},i=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const r=s.getActiveAttrib(e,n),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function pn(s){return s!==""}function Xa(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function qa(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const vm=/^[ \t]*#include +<([\w\d./]+)>/gm;function $r(s){return s.replace(vm,ym)}const xm=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function ym(s,e){let t=He[e];if(t===void 0){const i=xm.get(e);if(i!==void 0)t=He[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return $r(t)}const Sm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ja(s){return s.replace(Sm,Mm)}function Mm(s,e,t,i){let n="";for(let r=parseInt(e);r<parseInt(t);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function Ya(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function bm(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Nl?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===kc?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===di&&(e="SHADOWMAP_TYPE_VSM"),e}function Em(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case vn:case xn:e="ENVMAP_TYPE_CUBE";break;case Ys:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Tm(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case xn:e="ENVMAP_MODE_REFRACTION";break}return e}function Am(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Fl:e="ENVMAP_BLENDING_MULTIPLY";break;case lh:e="ENVMAP_BLENDING_MIX";break;case ch:e="ENVMAP_BLENDING_ADD";break}return e}function wm(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Pm(s,e,t,i){const n=s.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=bm(t),c=Em(t),h=Tm(t),u=Am(t),d=wm(t),f=t.isWebGL2?"":pm(t),g=mm(t),v=gm(r),m=n.createProgram();let p,M,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(pn).join(`
`),p.length>0&&(p+=`
`),M=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(pn).join(`
`),M.length>0&&(M+=`
`)):(p=[Ya(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(pn).join(`
`),M=[f,Ya(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ai?"#define TONE_MAPPING":"",t.toneMapping!==Ai?He.tonemapping_pars_fragment:"",t.toneMapping!==Ai?fm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,dm("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(pn).join(`
`)),o=$r(o),o=Xa(o,t),o=qa(o,t),a=$r(a),a=Xa(a,t),a=qa(a,t),o=ja(o),a=ja(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,M=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===da?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===da?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M);const T=_+p+o,L=_+M+a,P=Ha(n,n.VERTEX_SHADER,T),C=Ha(n,n.FRAGMENT_SHADER,L);n.attachShader(m,P),n.attachShader(m,C),t.index0AttributeName!==void 0?n.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&n.bindAttribLocation(m,0,"position"),n.linkProgram(m);function N(z){if(s.debug.checkShaderErrors){const K=n.getProgramInfoLog(m).trim(),I=n.getShaderInfoLog(P).trim(),O=n.getShaderInfoLog(C).trim();let H=!0,J=!0;if(n.getProgramParameter(m,n.LINK_STATUS)===!1)if(H=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,m,P,C);else{const Y=Wa(n,P,"vertex"),X=Wa(n,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(m,n.VALIDATE_STATUS)+`

Program Info Log: `+K+`
`+Y+`
`+X)}else K!==""?console.warn("THREE.WebGLProgram: Program Info Log:",K):(I===""||O==="")&&(J=!1);J&&(z.diagnostics={runnable:H,programLog:K,vertexShader:{log:I,prefix:p},fragmentShader:{log:O,prefix:M}})}n.deleteShader(P),n.deleteShader(C),S=new Os(n,m),E=_m(n,m)}let S;this.getUniforms=function(){return S===void 0&&N(this),S};let E;this.getAttributes=function(){return E===void 0&&N(this),E};let U=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=n.getProgramParameter(m,lm)),U},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=cm++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=P,this.fragmentShader=C,this}let Cm=0;class Rm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,n=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(n)===!1&&(o.add(n),n.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Lm(e),t.set(e,i)),i}}class Lm{constructor(e){this.id=Cm++,this.code=e,this.usedTimes=0}}function Im(s,e,t,i,n,r,o){const a=new co,l=new Rm,c=[],h=n.isWebGL2,u=n.logarithmicDepthBuffer,d=n.vertexTextures;let f=n.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return S===0?"uv":`uv${S}`}function m(S,E,U,z,K){const I=z.fog,O=K.geometry,H=S.isMeshStandardMaterial?z.environment:null,J=(S.isMeshStandardMaterial?t:e).get(S.envMap||H),Y=J&&J.mapping===Ys?J.image.height:null,X=g[S.type];S.precision!==null&&(f=n.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const Q=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,ee=Q!==void 0?Q.length:0;let ue=0;O.morphAttributes.position!==void 0&&(ue=1),O.morphAttributes.normal!==void 0&&(ue=2),O.morphAttributes.color!==void 0&&(ue=3);let W,$,fe,Se;if(X){const Tt=ii[X];W=Tt.vertexShader,$=Tt.fragmentShader}else W=S.vertexShader,$=S.fragmentShader,l.update(S),fe=l.getVertexShaderID(S),Se=l.getFragmentShaderID(S);const _e=s.getRenderTarget(),Pe=K.isInstancedMesh===!0,Ue=K.isBatchedMesh===!0,ae=!!S.map,Le=!!S.matcap,R=!!J,le=!!S.aoMap,j=!!S.lightMap,oe=!!S.bumpMap,q=!!S.normalMap,Te=!!S.displacementMap,ge=!!S.emissiveMap,b=!!S.metalnessMap,x=!!S.roughnessMap,k=S.anisotropy>0,se=S.clearcoat>0,ie=S.iridescence>0,te=S.sheen>0,Me=S.transmission>0,de=k&&!!S.anisotropyMap,xe=se&&!!S.clearcoatMap,Ce=se&&!!S.clearcoatNormalMap,Be=se&&!!S.clearcoatRoughnessMap,ne=ie&&!!S.iridescenceMap,Je=ie&&!!S.iridescenceThicknessMap,Ye=te&&!!S.sheenColorMap,Fe=te&&!!S.sheenRoughnessMap,Ae=!!S.specularMap,ye=!!S.specularColorMap,Ve=!!S.specularIntensityMap,$e=Me&&!!S.transmissionMap,lt=Me&&!!S.thicknessMap,Xe=!!S.gradientMap,ce=!!S.alphaMap,D=S.alphaTest>0,pe=!!S.alphaHash,me=!!S.extensions,De=!!O.attributes.uv1,Re=!!O.attributes.uv2,Qe=!!O.attributes.uv3;let et=Ai;return S.toneMapped&&(_e===null||_e.isXRRenderTarget===!0)&&(et=s.toneMapping),{isWebGL2:h,shaderID:X,shaderType:S.type,shaderName:S.name,vertexShader:W,fragmentShader:$,defines:S.defines,customVertexShaderID:fe,customFragmentShaderID:Se,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Ue,instancing:Pe,instancingColor:Pe&&K.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:_e===null?s.outputColorSpace:_e.isXRRenderTarget===!0?_e.texture.colorSpace:gi,map:ae,matcap:Le,envMap:R,envMapMode:R&&J.mapping,envMapCubeUVHeight:Y,aoMap:le,lightMap:j,bumpMap:oe,normalMap:q,displacementMap:d&&Te,emissiveMap:ge,normalMapObjectSpace:q&&S.normalMapType===wh,normalMapTangentSpace:q&&S.normalMapType===ql,metalnessMap:b,roughnessMap:x,anisotropy:k,anisotropyMap:de,clearcoat:se,clearcoatMap:xe,clearcoatNormalMap:Ce,clearcoatRoughnessMap:Be,iridescence:ie,iridescenceMap:ne,iridescenceThicknessMap:Je,sheen:te,sheenColorMap:Ye,sheenRoughnessMap:Fe,specularMap:Ae,specularColorMap:ye,specularIntensityMap:Ve,transmission:Me,transmissionMap:$e,thicknessMap:lt,gradientMap:Xe,opaque:S.transparent===!1&&S.blending===gn,alphaMap:ce,alphaTest:D,alphaHash:pe,combine:S.combine,mapUv:ae&&v(S.map.channel),aoMapUv:le&&v(S.aoMap.channel),lightMapUv:j&&v(S.lightMap.channel),bumpMapUv:oe&&v(S.bumpMap.channel),normalMapUv:q&&v(S.normalMap.channel),displacementMapUv:Te&&v(S.displacementMap.channel),emissiveMapUv:ge&&v(S.emissiveMap.channel),metalnessMapUv:b&&v(S.metalnessMap.channel),roughnessMapUv:x&&v(S.roughnessMap.channel),anisotropyMapUv:de&&v(S.anisotropyMap.channel),clearcoatMapUv:xe&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:Ce&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Be&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ne&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:Je&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ye&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:Fe&&v(S.sheenRoughnessMap.channel),specularMapUv:Ae&&v(S.specularMap.channel),specularColorMapUv:ye&&v(S.specularColorMap.channel),specularIntensityMapUv:Ve&&v(S.specularIntensityMap.channel),transmissionMapUv:$e&&v(S.transmissionMap.channel),thicknessMapUv:lt&&v(S.thicknessMap.channel),alphaMapUv:ce&&v(S.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(q||k),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,vertexUv1s:De,vertexUv2s:Re,vertexUv3s:Qe,pointsUvs:K.isPoints===!0&&!!O.attributes.uv&&(ae||ce),fog:!!I,useFog:S.fog===!0,fogExp2:I&&I.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:K.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:ue,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&U.length>0,shadowMapType:s.shadowMap.type,toneMapping:et,useLegacyLights:s._useLegacyLights,decodeVideoTexture:ae&&S.map.isVideoTexture===!0&&Ke.getTransfer(S.map.colorSpace)===it,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===zt,flipSided:S.side===Ut,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:me&&S.extensions.derivatives===!0,extensionFragDepth:me&&S.extensions.fragDepth===!0,extensionDrawBuffers:me&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:me&&S.extensions.shaderTextureLOD===!0,extensionClipCullDistance:me&&S.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()}}function p(S){const E=[];if(S.shaderID?E.push(S.shaderID):(E.push(S.customVertexShaderID),E.push(S.customFragmentShaderID)),S.defines!==void 0)for(const U in S.defines)E.push(U),E.push(S.defines[U]);return S.isRawShaderMaterial===!1&&(M(E,S),_(E,S),E.push(s.outputColorSpace)),E.push(S.customProgramCacheKey),E.join()}function M(S,E){S.push(E.precision),S.push(E.outputColorSpace),S.push(E.envMapMode),S.push(E.envMapCubeUVHeight),S.push(E.mapUv),S.push(E.alphaMapUv),S.push(E.lightMapUv),S.push(E.aoMapUv),S.push(E.bumpMapUv),S.push(E.normalMapUv),S.push(E.displacementMapUv),S.push(E.emissiveMapUv),S.push(E.metalnessMapUv),S.push(E.roughnessMapUv),S.push(E.anisotropyMapUv),S.push(E.clearcoatMapUv),S.push(E.clearcoatNormalMapUv),S.push(E.clearcoatRoughnessMapUv),S.push(E.iridescenceMapUv),S.push(E.iridescenceThicknessMapUv),S.push(E.sheenColorMapUv),S.push(E.sheenRoughnessMapUv),S.push(E.specularMapUv),S.push(E.specularColorMapUv),S.push(E.specularIntensityMapUv),S.push(E.transmissionMapUv),S.push(E.thicknessMapUv),S.push(E.combine),S.push(E.fogExp2),S.push(E.sizeAttenuation),S.push(E.morphTargetsCount),S.push(E.morphAttributeCount),S.push(E.numDirLights),S.push(E.numPointLights),S.push(E.numSpotLights),S.push(E.numSpotLightMaps),S.push(E.numHemiLights),S.push(E.numRectAreaLights),S.push(E.numDirLightShadows),S.push(E.numPointLightShadows),S.push(E.numSpotLightShadows),S.push(E.numSpotLightShadowsWithMaps),S.push(E.numLightProbes),S.push(E.shadowMapType),S.push(E.toneMapping),S.push(E.numClippingPlanes),S.push(E.numClipIntersection),S.push(E.depthPacking)}function _(S,E){a.disableAll(),E.isWebGL2&&a.enable(0),E.supportsVertexTextures&&a.enable(1),E.instancing&&a.enable(2),E.instancingColor&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),S.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.skinning&&a.enable(4),E.morphTargets&&a.enable(5),E.morphNormals&&a.enable(6),E.morphColors&&a.enable(7),E.premultipliedAlpha&&a.enable(8),E.shadowMapEnabled&&a.enable(9),E.useLegacyLights&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),S.push(a.mask)}function T(S){const E=g[S.type];let U;if(E){const z=ii[E];U=fu.clone(z.uniforms)}else U=S.uniforms;return U}function L(S,E){let U;for(let z=0,K=c.length;z<K;z++){const I=c[z];if(I.cacheKey===E){U=I,++U.usedTimes;break}}return U===void 0&&(U=new Pm(s,E,S,r),c.push(U)),U}function P(S){if(--S.usedTimes===0){const E=c.indexOf(S);c[E]=c[c.length-1],c.pop(),S.destroy()}}function C(S){l.remove(S)}function N(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:T,acquireProgram:L,releaseProgram:P,releaseShaderCache:C,programs:c,dispose:N}}function Dm(){let s=new WeakMap;function e(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function t(r){s.delete(r)}function i(r,o,a){s.get(r)[o]=a}function n(){s=new WeakMap}return{get:e,remove:t,update:i,dispose:n}}function Um(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Ja(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Za(){const s=[];let e=0;const t=[],i=[],n=[];function r(){e=0,t.length=0,i.length=0,n.length=0}function o(u,d,f,g,v,m){let p=s[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},s[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),e++,p}function a(u,d,f,g,v,m){const p=o(u,d,f,g,v,m);f.transmission>0?i.push(p):f.transparent===!0?n.push(p):t.push(p)}function l(u,d,f,g,v,m){const p=o(u,d,f,g,v,m);f.transmission>0?i.unshift(p):f.transparent===!0?n.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||Um),i.length>1&&i.sort(d||Ja),n.length>1&&n.sort(d||Ja)}function h(){for(let u=e,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:n,init:r,push:a,unshift:l,finish:h,sort:c}}function Nm(){let s=new WeakMap;function e(i,n){const r=s.get(i);let o;return r===void 0?(o=new Za,s.set(i,[o])):n>=r.length?(o=new Za,r.push(o)):o=r[n],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function Fm(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new Oe};break;case"SpotLight":t={position:new w,direction:new w,color:new Oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new Oe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new Oe,groundColor:new Oe};break;case"RectAreaLight":t={color:new Oe,position:new w,halfWidth:new w,halfHeight:new w};break}return s[e.id]=t,t}}}function Om(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let km=0;function Bm(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function zm(s,e){const t=new Fm,i=Om(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new w);const r=new w,o=new at,a=new at;function l(h,u){let d=0,f=0,g=0;for(let z=0;z<9;z++)n.probe[z].set(0,0,0);let v=0,m=0,p=0,M=0,_=0,T=0,L=0,P=0,C=0,N=0,S=0;h.sort(Bm);const E=u===!0?Math.PI:1;for(let z=0,K=h.length;z<K;z++){const I=h[z],O=I.color,H=I.intensity,J=I.distance,Y=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)d+=O.r*H*E,f+=O.g*H*E,g+=O.b*H*E;else if(I.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(I.sh.coefficients[X],H);S++}else if(I.isDirectionalLight){const X=t.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity*E),I.castShadow){const Q=I.shadow,ee=i.get(I);ee.shadowBias=Q.bias,ee.shadowNormalBias=Q.normalBias,ee.shadowRadius=Q.radius,ee.shadowMapSize=Q.mapSize,n.directionalShadow[v]=ee,n.directionalShadowMap[v]=Y,n.directionalShadowMatrix[v]=I.shadow.matrix,T++}n.directional[v]=X,v++}else if(I.isSpotLight){const X=t.get(I);X.position.setFromMatrixPosition(I.matrixWorld),X.color.copy(O).multiplyScalar(H*E),X.distance=J,X.coneCos=Math.cos(I.angle),X.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),X.decay=I.decay,n.spot[p]=X;const Q=I.shadow;if(I.map&&(n.spotLightMap[C]=I.map,C++,Q.updateMatrices(I),I.castShadow&&N++),n.spotLightMatrix[p]=Q.matrix,I.castShadow){const ee=i.get(I);ee.shadowBias=Q.bias,ee.shadowNormalBias=Q.normalBias,ee.shadowRadius=Q.radius,ee.shadowMapSize=Q.mapSize,n.spotShadow[p]=ee,n.spotShadowMap[p]=Y,P++}p++}else if(I.isRectAreaLight){const X=t.get(I);X.color.copy(O).multiplyScalar(H),X.halfWidth.set(I.width*.5,0,0),X.halfHeight.set(0,I.height*.5,0),n.rectArea[M]=X,M++}else if(I.isPointLight){const X=t.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity*E),X.distance=I.distance,X.decay=I.decay,I.castShadow){const Q=I.shadow,ee=i.get(I);ee.shadowBias=Q.bias,ee.shadowNormalBias=Q.normalBias,ee.shadowRadius=Q.radius,ee.shadowMapSize=Q.mapSize,ee.shadowCameraNear=Q.camera.near,ee.shadowCameraFar=Q.camera.far,n.pointShadow[m]=ee,n.pointShadowMap[m]=Y,n.pointShadowMatrix[m]=I.shadow.matrix,L++}n.point[m]=X,m++}else if(I.isHemisphereLight){const X=t.get(I);X.skyColor.copy(I.color).multiplyScalar(H*E),X.groundColor.copy(I.groundColor).multiplyScalar(H*E),n.hemi[_]=X,_++}}M>0&&(e.isWebGL2?s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=he.LTC_FLOAT_1,n.rectAreaLTC2=he.LTC_FLOAT_2):(n.rectAreaLTC1=he.LTC_HALF_1,n.rectAreaLTC2=he.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=he.LTC_FLOAT_1,n.rectAreaLTC2=he.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(n.rectAreaLTC1=he.LTC_HALF_1,n.rectAreaLTC2=he.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),n.ambient[0]=d,n.ambient[1]=f,n.ambient[2]=g;const U=n.hash;(U.directionalLength!==v||U.pointLength!==m||U.spotLength!==p||U.rectAreaLength!==M||U.hemiLength!==_||U.numDirectionalShadows!==T||U.numPointShadows!==L||U.numSpotShadows!==P||U.numSpotMaps!==C||U.numLightProbes!==S)&&(n.directional.length=v,n.spot.length=p,n.rectArea.length=M,n.point.length=m,n.hemi.length=_,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=L,n.pointShadowMap.length=L,n.spotShadow.length=P,n.spotShadowMap.length=P,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=L,n.spotLightMatrix.length=P+C-N,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=N,n.numLightProbes=S,U.directionalLength=v,U.pointLength=m,U.spotLength=p,U.rectAreaLength=M,U.hemiLength=_,U.numDirectionalShadows=T,U.numPointShadows=L,U.numSpotShadows=P,U.numSpotMaps=C,U.numLightProbes=S,n.version=km++)}function c(h,u){let d=0,f=0,g=0,v=0,m=0;const p=u.matrixWorldInverse;for(let M=0,_=h.length;M<_;M++){const T=h[M];if(T.isDirectionalLight){const L=n.directional[d];L.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(p),d++}else if(T.isSpotLight){const L=n.spot[g];L.position.setFromMatrixPosition(T.matrixWorld),L.position.applyMatrix4(p),L.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(p),g++}else if(T.isRectAreaLight){const L=n.rectArea[v];L.position.setFromMatrixPosition(T.matrixWorld),L.position.applyMatrix4(p),a.identity(),o.copy(T.matrixWorld),o.premultiply(p),a.extractRotation(o),L.halfWidth.set(T.width*.5,0,0),L.halfHeight.set(0,T.height*.5,0),L.halfWidth.applyMatrix4(a),L.halfHeight.applyMatrix4(a),v++}else if(T.isPointLight){const L=n.point[f];L.position.setFromMatrixPosition(T.matrixWorld),L.position.applyMatrix4(p),f++}else if(T.isHemisphereLight){const L=n.hemi[m];L.direction.setFromMatrixPosition(T.matrixWorld),L.direction.transformDirection(p),m++}}}return{setup:l,setupView:c,state:n}}function $a(s,e){const t=new zm(s,e),i=[],n=[];function r(){i.length=0,n.length=0}function o(u){i.push(u)}function a(u){n.push(u)}function l(u){t.setup(i,u)}function c(u){t.setupView(i,u)}return{init:r,state:{lightsArray:i,shadowsArray:n,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function Gm(s,e){let t=new WeakMap;function i(r,o=0){const a=t.get(r);let l;return a===void 0?(l=new $a(s,e),t.set(r,[l])):o>=a.length?(l=new $a(s,e),a.push(l)):l=a[o],l}function n(){t=new WeakMap}return{get:i,dispose:n}}class Vm extends Xi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Th,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Hm extends Xi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Wm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Xm=`uniform sampler2D shadow_pass;
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
}`;function qm(s,e,t){let i=new ho;const n=new re,r=new re,o=new nt,a=new Vm({depthPacking:Ah}),l=new Hm,c={},h=t.maxTextureSize,u={[mi]:Ut,[Ut]:mi,[zt]:zt},d=new Vi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new re},radius:{value:4}},vertexShader:Wm,fragmentShader:Xm}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new St;g.setAttribute("position",new Lt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new vt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Nl;let p=this.type;this.render=function(P,C,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||P.length===0)return;const S=s.getRenderTarget(),E=s.getActiveCubeFace(),U=s.getActiveMipmapLevel(),z=s.state;z.setBlending(Ti),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const K=p!==di&&this.type===di,I=p===di&&this.type!==di;for(let O=0,H=P.length;O<H;O++){const J=P[O],Y=J.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;n.copy(Y.mapSize);const X=Y.getFrameExtents();if(n.multiply(X),r.copy(Y.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(r.x=Math.floor(h/X.x),n.x=r.x*X.x,Y.mapSize.x=r.x),n.y>h&&(r.y=Math.floor(h/X.y),n.y=r.y*X.y,Y.mapSize.y=r.y)),Y.map===null||K===!0||I===!0){const ee=this.type!==di?{minFilter:Ct,magFilter:Ct}:{};Y.map!==null&&Y.map.dispose(),Y.map=new Gi(n.x,n.y,ee),Y.map.texture.name=J.name+".shadowMap",Y.camera.updateProjectionMatrix()}s.setRenderTarget(Y.map),s.clear();const Q=Y.getViewportCount();for(let ee=0;ee<Q;ee++){const ue=Y.getViewport(ee);o.set(r.x*ue.x,r.y*ue.y,r.x*ue.z,r.y*ue.w),z.viewport(o),Y.updateMatrices(J,ee),i=Y.getFrustum(),T(C,N,Y.camera,J,this.type)}Y.isPointLightShadow!==!0&&this.type===di&&M(Y,N),Y.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(S,E,U)};function M(P,C){const N=e.update(v);d.defines.VSM_SAMPLES!==P.blurSamples&&(d.defines.VSM_SAMPLES=P.blurSamples,f.defines.VSM_SAMPLES=P.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new Gi(n.x,n.y)),d.uniforms.shadow_pass.value=P.map.texture,d.uniforms.resolution.value=P.mapSize,d.uniforms.radius.value=P.radius,s.setRenderTarget(P.mapPass),s.clear(),s.renderBufferDirect(C,null,N,d,v,null),f.uniforms.shadow_pass.value=P.mapPass.texture,f.uniforms.resolution.value=P.mapSize,f.uniforms.radius.value=P.radius,s.setRenderTarget(P.map),s.clear(),s.renderBufferDirect(C,null,N,f,v,null)}function _(P,C,N,S){let E=null;const U=N.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(U!==void 0)E=U;else if(E=N.isPointLight===!0?l:a,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const z=E.uuid,K=C.uuid;let I=c[z];I===void 0&&(I={},c[z]=I);let O=I[K];O===void 0&&(O=E.clone(),I[K]=O,C.addEventListener("dispose",L)),E=O}if(E.visible=C.visible,E.wireframe=C.wireframe,S===di?E.side=C.shadowSide!==null?C.shadowSide:C.side:E.side=C.shadowSide!==null?C.shadowSide:u[C.side],E.alphaMap=C.alphaMap,E.alphaTest=C.alphaTest,E.map=C.map,E.clipShadows=C.clipShadows,E.clippingPlanes=C.clippingPlanes,E.clipIntersection=C.clipIntersection,E.displacementMap=C.displacementMap,E.displacementScale=C.displacementScale,E.displacementBias=C.displacementBias,E.wireframeLinewidth=C.wireframeLinewidth,E.linewidth=C.linewidth,N.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const z=s.properties.get(E);z.light=N}return E}function T(P,C,N,S,E){if(P.visible===!1)return;if(P.layers.test(C.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&E===di)&&(!P.frustumCulled||i.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,P.matrixWorld);const K=e.update(P),I=P.material;if(Array.isArray(I)){const O=K.groups;for(let H=0,J=O.length;H<J;H++){const Y=O[H],X=I[Y.materialIndex];if(X&&X.visible){const Q=_(P,X,S,E);P.onBeforeShadow(s,P,C,N,K,Q,Y),s.renderBufferDirect(N,null,K,Q,P,Y),P.onAfterShadow(s,P,C,N,K,Q,Y)}}}else if(I.visible){const O=_(P,I,S,E);P.onBeforeShadow(s,P,C,N,K,O,null),s.renderBufferDirect(N,null,K,O,P,null),P.onAfterShadow(s,P,C,N,K,O,null)}}const z=P.children;for(let K=0,I=z.length;K<I;K++)T(z[K],C,N,S,E)}function L(P){P.target.removeEventListener("dispose",L);for(const N in c){const S=c[N],E=P.target.uuid;E in S&&(S[E].dispose(),delete S[E])}}}function jm(s,e,t){const i=t.isWebGL2;function n(){let D=!1;const pe=new nt;let me=null;const De=new nt(0,0,0,0);return{setMask:function(Re){me!==Re&&!D&&(s.colorMask(Re,Re,Re,Re),me=Re)},setLocked:function(Re){D=Re},setClear:function(Re,Qe,et,mt,Tt){Tt===!0&&(Re*=mt,Qe*=mt,et*=mt),pe.set(Re,Qe,et,mt),De.equals(pe)===!1&&(s.clearColor(Re,Qe,et,mt),De.copy(pe))},reset:function(){D=!1,me=null,De.set(-1,0,0,0)}}}function r(){let D=!1,pe=null,me=null,De=null;return{setTest:function(Re){Re?Ue(s.DEPTH_TEST):ae(s.DEPTH_TEST)},setMask:function(Re){pe!==Re&&!D&&(s.depthMask(Re),pe=Re)},setFunc:function(Re){if(me!==Re){switch(Re){case th:s.depthFunc(s.NEVER);break;case ih:s.depthFunc(s.ALWAYS);break;case nh:s.depthFunc(s.LESS);break;case Bs:s.depthFunc(s.LEQUAL);break;case sh:s.depthFunc(s.EQUAL);break;case rh:s.depthFunc(s.GEQUAL);break;case oh:s.depthFunc(s.GREATER);break;case ah:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}me=Re}},setLocked:function(Re){D=Re},setClear:function(Re){De!==Re&&(s.clearDepth(Re),De=Re)},reset:function(){D=!1,pe=null,me=null,De=null}}}function o(){let D=!1,pe=null,me=null,De=null,Re=null,Qe=null,et=null,mt=null,Tt=null;return{setTest:function(tt){D||(tt?Ue(s.STENCIL_TEST):ae(s.STENCIL_TEST))},setMask:function(tt){pe!==tt&&!D&&(s.stencilMask(tt),pe=tt)},setFunc:function(tt,At,Kt){(me!==tt||De!==At||Re!==Kt)&&(s.stencilFunc(tt,At,Kt),me=tt,De=At,Re=Kt)},setOp:function(tt,At,Kt){(Qe!==tt||et!==At||mt!==Kt)&&(s.stencilOp(tt,At,Kt),Qe=tt,et=At,mt=Kt)},setLocked:function(tt){D=tt},setClear:function(tt){Tt!==tt&&(s.clearStencil(tt),Tt=tt)},reset:function(){D=!1,pe=null,me=null,De=null,Re=null,Qe=null,et=null,mt=null,Tt=null}}}const a=new n,l=new r,c=new o,h=new WeakMap,u=new WeakMap;let d={},f={},g=new WeakMap,v=[],m=null,p=!1,M=null,_=null,T=null,L=null,P=null,C=null,N=null,S=new Oe(0,0,0),E=0,U=!1,z=null,K=null,I=null,O=null,H=null;const J=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,X=0;const Q=s.getParameter(s.VERSION);Q.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(Q)[1]),Y=X>=1):Q.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),Y=X>=2);let ee=null,ue={};const W=s.getParameter(s.SCISSOR_BOX),$=s.getParameter(s.VIEWPORT),fe=new nt().fromArray(W),Se=new nt().fromArray($);function _e(D,pe,me,De){const Re=new Uint8Array(4),Qe=s.createTexture();s.bindTexture(D,Qe),s.texParameteri(D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(D,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let et=0;et<me;et++)i&&(D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY)?s.texImage3D(pe,0,s.RGBA,1,1,De,0,s.RGBA,s.UNSIGNED_BYTE,Re):s.texImage2D(pe+et,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Re);return Qe}const Pe={};Pe[s.TEXTURE_2D]=_e(s.TEXTURE_2D,s.TEXTURE_2D,1),Pe[s.TEXTURE_CUBE_MAP]=_e(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Pe[s.TEXTURE_2D_ARRAY]=_e(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Pe[s.TEXTURE_3D]=_e(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ue(s.DEPTH_TEST),l.setFunc(Bs),ge(!1),b(Io),Ue(s.CULL_FACE),q(Ti);function Ue(D){d[D]!==!0&&(s.enable(D),d[D]=!0)}function ae(D){d[D]!==!1&&(s.disable(D),d[D]=!1)}function Le(D,pe){return f[D]!==pe?(s.bindFramebuffer(D,pe),f[D]=pe,i&&(D===s.DRAW_FRAMEBUFFER&&(f[s.FRAMEBUFFER]=pe),D===s.FRAMEBUFFER&&(f[s.DRAW_FRAMEBUFFER]=pe)),!0):!1}function R(D,pe){let me=v,De=!1;if(D)if(me=g.get(pe),me===void 0&&(me=[],g.set(pe,me)),D.isWebGLMultipleRenderTargets){const Re=D.texture;if(me.length!==Re.length||me[0]!==s.COLOR_ATTACHMENT0){for(let Qe=0,et=Re.length;Qe<et;Qe++)me[Qe]=s.COLOR_ATTACHMENT0+Qe;me.length=Re.length,De=!0}}else me[0]!==s.COLOR_ATTACHMENT0&&(me[0]=s.COLOR_ATTACHMENT0,De=!0);else me[0]!==s.BACK&&(me[0]=s.BACK,De=!0);De&&(t.isWebGL2?s.drawBuffers(me):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(me))}function le(D){return m!==D?(s.useProgram(D),m=D,!0):!1}const j={[Ni]:s.FUNC_ADD,[zc]:s.FUNC_SUBTRACT,[Gc]:s.FUNC_REVERSE_SUBTRACT};if(i)j[Fo]=s.MIN,j[Oo]=s.MAX;else{const D=e.get("EXT_blend_minmax");D!==null&&(j[Fo]=D.MIN_EXT,j[Oo]=D.MAX_EXT)}const oe={[Vc]:s.ZERO,[Hc]:s.ONE,[Wc]:s.SRC_COLOR,[Hr]:s.SRC_ALPHA,[Zc]:s.SRC_ALPHA_SATURATE,[Yc]:s.DST_COLOR,[qc]:s.DST_ALPHA,[Xc]:s.ONE_MINUS_SRC_COLOR,[Wr]:s.ONE_MINUS_SRC_ALPHA,[Jc]:s.ONE_MINUS_DST_COLOR,[jc]:s.ONE_MINUS_DST_ALPHA,[$c]:s.CONSTANT_COLOR,[Kc]:s.ONE_MINUS_CONSTANT_COLOR,[Qc]:s.CONSTANT_ALPHA,[eh]:s.ONE_MINUS_CONSTANT_ALPHA};function q(D,pe,me,De,Re,Qe,et,mt,Tt,tt){if(D===Ti){p===!0&&(ae(s.BLEND),p=!1);return}if(p===!1&&(Ue(s.BLEND),p=!0),D!==Bc){if(D!==M||tt!==U){if((_!==Ni||P!==Ni)&&(s.blendEquation(s.FUNC_ADD),_=Ni,P=Ni),tt)switch(D){case gn:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Do:s.blendFunc(s.ONE,s.ONE);break;case Uo:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case No:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case gn:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Do:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Uo:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case No:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}T=null,L=null,C=null,N=null,S.set(0,0,0),E=0,M=D,U=tt}return}Re=Re||pe,Qe=Qe||me,et=et||De,(pe!==_||Re!==P)&&(s.blendEquationSeparate(j[pe],j[Re]),_=pe,P=Re),(me!==T||De!==L||Qe!==C||et!==N)&&(s.blendFuncSeparate(oe[me],oe[De],oe[Qe],oe[et]),T=me,L=De,C=Qe,N=et),(mt.equals(S)===!1||Tt!==E)&&(s.blendColor(mt.r,mt.g,mt.b,Tt),S.copy(mt),E=Tt),M=D,U=!1}function Te(D,pe){D.side===zt?ae(s.CULL_FACE):Ue(s.CULL_FACE);let me=D.side===Ut;pe&&(me=!me),ge(me),D.blending===gn&&D.transparent===!1?q(Ti):q(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),l.setFunc(D.depthFunc),l.setTest(D.depthTest),l.setMask(D.depthWrite),a.setMask(D.colorWrite);const De=D.stencilWrite;c.setTest(De),De&&(c.setMask(D.stencilWriteMask),c.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),c.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),k(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Ue(s.SAMPLE_ALPHA_TO_COVERAGE):ae(s.SAMPLE_ALPHA_TO_COVERAGE)}function ge(D){z!==D&&(D?s.frontFace(s.CW):s.frontFace(s.CCW),z=D)}function b(D){D!==Fc?(Ue(s.CULL_FACE),D!==K&&(D===Io?s.cullFace(s.BACK):D===Oc?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ae(s.CULL_FACE),K=D}function x(D){D!==I&&(Y&&s.lineWidth(D),I=D)}function k(D,pe,me){D?(Ue(s.POLYGON_OFFSET_FILL),(O!==pe||H!==me)&&(s.polygonOffset(pe,me),O=pe,H=me)):ae(s.POLYGON_OFFSET_FILL)}function se(D){D?Ue(s.SCISSOR_TEST):ae(s.SCISSOR_TEST)}function ie(D){D===void 0&&(D=s.TEXTURE0+J-1),ee!==D&&(s.activeTexture(D),ee=D)}function te(D,pe,me){me===void 0&&(ee===null?me=s.TEXTURE0+J-1:me=ee);let De=ue[me];De===void 0&&(De={type:void 0,texture:void 0},ue[me]=De),(De.type!==D||De.texture!==pe)&&(ee!==me&&(s.activeTexture(me),ee=me),s.bindTexture(D,pe||Pe[D]),De.type=D,De.texture=pe)}function Me(){const D=ue[ee];D!==void 0&&D.type!==void 0&&(s.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function de(){try{s.compressedTexImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function xe(){try{s.compressedTexImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ce(){try{s.texSubImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Be(){try{s.texSubImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ne(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Je(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ye(){try{s.texStorage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Fe(){try{s.texStorage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ae(){try{s.texImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ye(){try{s.texImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ve(D){fe.equals(D)===!1&&(s.scissor(D.x,D.y,D.z,D.w),fe.copy(D))}function $e(D){Se.equals(D)===!1&&(s.viewport(D.x,D.y,D.z,D.w),Se.copy(D))}function lt(D,pe){let me=u.get(pe);me===void 0&&(me=new WeakMap,u.set(pe,me));let De=me.get(D);De===void 0&&(De=s.getUniformBlockIndex(pe,D.name),me.set(D,De))}function Xe(D,pe){const De=u.get(pe).get(D);h.get(pe)!==De&&(s.uniformBlockBinding(pe,De,D.__bindingPointIndex),h.set(pe,De))}function ce(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),i===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),d={},ee=null,ue={},f={},g=new WeakMap,v=[],m=null,p=!1,M=null,_=null,T=null,L=null,P=null,C=null,N=null,S=new Oe(0,0,0),E=0,U=!1,z=null,K=null,I=null,O=null,H=null,fe.set(0,0,s.canvas.width,s.canvas.height),Se.set(0,0,s.canvas.width,s.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:Ue,disable:ae,bindFramebuffer:Le,drawBuffers:R,useProgram:le,setBlending:q,setMaterial:Te,setFlipSided:ge,setCullFace:b,setLineWidth:x,setPolygonOffset:k,setScissorTest:se,activeTexture:ie,bindTexture:te,unbindTexture:Me,compressedTexImage2D:de,compressedTexImage3D:xe,texImage2D:Ae,texImage3D:ye,updateUBOMapping:lt,uniformBlockBinding:Xe,texStorage2D:Ye,texStorage3D:Fe,texSubImage2D:Ce,texSubImage3D:Be,compressedTexSubImage2D:ne,compressedTexSubImage3D:Je,scissor:Ve,viewport:$e,reset:ce}}function Ym(s,e,t,i,n,r,o){const a=n.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,x){return f?new OffscreenCanvas(b,x):Wn("canvas")}function v(b,x,k,se){let ie=1;if((b.width>se||b.height>se)&&(ie=se/Math.max(b.width,b.height)),ie<1||x===!0)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap){const te=x?Ws:Math.floor,Me=te(ie*b.width),de=te(ie*b.height);u===void 0&&(u=g(Me,de));const xe=k?g(Me,de):u;return xe.width=Me,xe.height=de,xe.getContext("2d").drawImage(b,0,0,Me,de),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+b.width+"x"+b.height+") to ("+Me+"x"+de+")."),xe}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+b.width+"x"+b.height+")."),b;return b}function m(b){return Zr(b.width)&&Zr(b.height)}function p(b){return a?!1:b.wrapS!==Gt||b.wrapT!==Gt||b.minFilter!==Ct&&b.minFilter!==It}function M(b,x){return b.generateMipmaps&&x&&b.minFilter!==Ct&&b.minFilter!==It}function _(b){s.generateMipmap(b)}function T(b,x,k,se,ie=!1){if(a===!1)return x;if(b!==null){if(s[b]!==void 0)return s[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let te=x;if(x===s.RED&&(k===s.FLOAT&&(te=s.R32F),k===s.HALF_FLOAT&&(te=s.R16F),k===s.UNSIGNED_BYTE&&(te=s.R8)),x===s.RED_INTEGER&&(k===s.UNSIGNED_BYTE&&(te=s.R8UI),k===s.UNSIGNED_SHORT&&(te=s.R16UI),k===s.UNSIGNED_INT&&(te=s.R32UI),k===s.BYTE&&(te=s.R8I),k===s.SHORT&&(te=s.R16I),k===s.INT&&(te=s.R32I)),x===s.RG&&(k===s.FLOAT&&(te=s.RG32F),k===s.HALF_FLOAT&&(te=s.RG16F),k===s.UNSIGNED_BYTE&&(te=s.RG8)),x===s.RGBA){const Me=ie?zs:Ke.getTransfer(se);k===s.FLOAT&&(te=s.RGBA32F),k===s.HALF_FLOAT&&(te=s.RGBA16F),k===s.UNSIGNED_BYTE&&(te=Me===it?s.SRGB8_ALPHA8:s.RGBA8),k===s.UNSIGNED_SHORT_4_4_4_4&&(te=s.RGBA4),k===s.UNSIGNED_SHORT_5_5_5_1&&(te=s.RGB5_A1)}return(te===s.R16F||te===s.R32F||te===s.RG16F||te===s.RG32F||te===s.RGBA16F||te===s.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function L(b,x,k){return M(b,k)===!0||b.isFramebufferTexture&&b.minFilter!==Ct&&b.minFilter!==It?Math.log2(Math.max(x.width,x.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?x.mipmaps.length:1}function P(b){return b===Ct||b===ko||b===rr?s.NEAREST:s.LINEAR}function C(b){const x=b.target;x.removeEventListener("dispose",C),S(x),x.isVideoTexture&&h.delete(x)}function N(b){const x=b.target;x.removeEventListener("dispose",N),U(x)}function S(b){const x=i.get(b);if(x.__webglInit===void 0)return;const k=b.source,se=d.get(k);if(se){const ie=se[x.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&E(b),Object.keys(se).length===0&&d.delete(k)}i.remove(b)}function E(b){const x=i.get(b);s.deleteTexture(x.__webglTexture);const k=b.source,se=d.get(k);delete se[x.__cacheKey],o.memory.textures--}function U(b){const x=b.texture,k=i.get(b),se=i.get(x);if(se.__webglTexture!==void 0&&(s.deleteTexture(se.__webglTexture),o.memory.textures--),b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let ie=0;ie<6;ie++){if(Array.isArray(k.__webglFramebuffer[ie]))for(let te=0;te<k.__webglFramebuffer[ie].length;te++)s.deleteFramebuffer(k.__webglFramebuffer[ie][te]);else s.deleteFramebuffer(k.__webglFramebuffer[ie]);k.__webglDepthbuffer&&s.deleteRenderbuffer(k.__webglDepthbuffer[ie])}else{if(Array.isArray(k.__webglFramebuffer))for(let ie=0;ie<k.__webglFramebuffer.length;ie++)s.deleteFramebuffer(k.__webglFramebuffer[ie]);else s.deleteFramebuffer(k.__webglFramebuffer);if(k.__webglDepthbuffer&&s.deleteRenderbuffer(k.__webglDepthbuffer),k.__webglMultisampledFramebuffer&&s.deleteFramebuffer(k.__webglMultisampledFramebuffer),k.__webglColorRenderbuffer)for(let ie=0;ie<k.__webglColorRenderbuffer.length;ie++)k.__webglColorRenderbuffer[ie]&&s.deleteRenderbuffer(k.__webglColorRenderbuffer[ie]);k.__webglDepthRenderbuffer&&s.deleteRenderbuffer(k.__webglDepthRenderbuffer)}if(b.isWebGLMultipleRenderTargets)for(let ie=0,te=x.length;ie<te;ie++){const Me=i.get(x[ie]);Me.__webglTexture&&(s.deleteTexture(Me.__webglTexture),o.memory.textures--),i.remove(x[ie])}i.remove(x),i.remove(b)}let z=0;function K(){z=0}function I(){const b=z;return b>=n.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+n.maxTextures),z+=1,b}function O(b){const x=[];return x.push(b.wrapS),x.push(b.wrapT),x.push(b.wrapR||0),x.push(b.magFilter),x.push(b.minFilter),x.push(b.anisotropy),x.push(b.internalFormat),x.push(b.format),x.push(b.type),x.push(b.generateMipmaps),x.push(b.premultiplyAlpha),x.push(b.flipY),x.push(b.unpackAlignment),x.push(b.colorSpace),x.join()}function H(b,x){const k=i.get(b);if(b.isVideoTexture&&Te(b),b.isRenderTargetTexture===!1&&b.version>0&&k.__version!==b.version){const se=b.image;if(se===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{fe(k,b,x);return}}t.bindTexture(s.TEXTURE_2D,k.__webglTexture,s.TEXTURE0+x)}function J(b,x){const k=i.get(b);if(b.version>0&&k.__version!==b.version){fe(k,b,x);return}t.bindTexture(s.TEXTURE_2D_ARRAY,k.__webglTexture,s.TEXTURE0+x)}function Y(b,x){const k=i.get(b);if(b.version>0&&k.__version!==b.version){fe(k,b,x);return}t.bindTexture(s.TEXTURE_3D,k.__webglTexture,s.TEXTURE0+x)}function X(b,x){const k=i.get(b);if(b.version>0&&k.__version!==b.version){Se(k,b,x);return}t.bindTexture(s.TEXTURE_CUBE_MAP,k.__webglTexture,s.TEXTURE0+x)}const Q={[jr]:s.REPEAT,[Gt]:s.CLAMP_TO_EDGE,[Yr]:s.MIRRORED_REPEAT},ee={[Ct]:s.NEAREST,[ko]:s.NEAREST_MIPMAP_NEAREST,[rr]:s.NEAREST_MIPMAP_LINEAR,[It]:s.LINEAR,[gh]:s.LINEAR_MIPMAP_NEAREST,[Gn]:s.LINEAR_MIPMAP_LINEAR},ue={[Ph]:s.NEVER,[Uh]:s.ALWAYS,[Ch]:s.LESS,[jl]:s.LEQUAL,[Rh]:s.EQUAL,[Dh]:s.GEQUAL,[Lh]:s.GREATER,[Ih]:s.NOTEQUAL};function W(b,x,k){if(k?(s.texParameteri(b,s.TEXTURE_WRAP_S,Q[x.wrapS]),s.texParameteri(b,s.TEXTURE_WRAP_T,Q[x.wrapT]),(b===s.TEXTURE_3D||b===s.TEXTURE_2D_ARRAY)&&s.texParameteri(b,s.TEXTURE_WRAP_R,Q[x.wrapR]),s.texParameteri(b,s.TEXTURE_MAG_FILTER,ee[x.magFilter]),s.texParameteri(b,s.TEXTURE_MIN_FILTER,ee[x.minFilter])):(s.texParameteri(b,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(b,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(b===s.TEXTURE_3D||b===s.TEXTURE_2D_ARRAY)&&s.texParameteri(b,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(x.wrapS!==Gt||x.wrapT!==Gt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(b,s.TEXTURE_MAG_FILTER,P(x.magFilter)),s.texParameteri(b,s.TEXTURE_MIN_FILTER,P(x.minFilter)),x.minFilter!==Ct&&x.minFilter!==It&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),x.compareFunction&&(s.texParameteri(b,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(b,s.TEXTURE_COMPARE_FUNC,ue[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const se=e.get("EXT_texture_filter_anisotropic");if(x.magFilter===Ct||x.minFilter!==rr&&x.minFilter!==Gn||x.type===Ei&&e.has("OES_texture_float_linear")===!1||a===!1&&x.type===Vn&&e.has("OES_texture_half_float_linear")===!1)return;(x.anisotropy>1||i.get(x).__currentAnisotropy)&&(s.texParameterf(b,se.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,n.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy)}}function $(b,x){let k=!1;b.__webglInit===void 0&&(b.__webglInit=!0,x.addEventListener("dispose",C));const se=x.source;let ie=d.get(se);ie===void 0&&(ie={},d.set(se,ie));const te=O(x);if(te!==b.__cacheKey){ie[te]===void 0&&(ie[te]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,k=!0),ie[te].usedTimes++;const Me=ie[b.__cacheKey];Me!==void 0&&(ie[b.__cacheKey].usedTimes--,Me.usedTimes===0&&E(x)),b.__cacheKey=te,b.__webglTexture=ie[te].texture}return k}function fe(b,x,k){let se=s.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(se=s.TEXTURE_2D_ARRAY),x.isData3DTexture&&(se=s.TEXTURE_3D);const ie=$(b,x),te=x.source;t.bindTexture(se,b.__webglTexture,s.TEXTURE0+k);const Me=i.get(te);if(te.version!==Me.__version||ie===!0){t.activeTexture(s.TEXTURE0+k);const de=Ke.getPrimaries(Ke.workingColorSpace),xe=x.colorSpace===Wt?null:Ke.getPrimaries(x.colorSpace),Ce=x.colorSpace===Wt||de===xe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);const Be=p(x)&&m(x.image)===!1;let ne=v(x.image,Be,!1,n.maxTextureSize);ne=ge(x,ne);const Je=m(ne)||a,Ye=r.convert(x.format,x.colorSpace);let Fe=r.convert(x.type),Ae=T(x.internalFormat,Ye,Fe,x.colorSpace,x.isVideoTexture);W(se,x,Je);let ye;const Ve=x.mipmaps,$e=a&&x.isVideoTexture!==!0&&Ae!==Wl,lt=Me.__version===void 0||ie===!0,Xe=L(x,ne,Je);if(x.isDepthTexture)Ae=s.DEPTH_COMPONENT,a?x.type===Ei?Ae=s.DEPTH_COMPONENT32F:x.type===bi?Ae=s.DEPTH_COMPONENT24:x.type===ki?Ae=s.DEPTH24_STENCIL8:Ae=s.DEPTH_COMPONENT16:x.type===Ei&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),x.format===Bi&&Ae===s.DEPTH_COMPONENT&&x.type!==oo&&x.type!==bi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),x.type=bi,Fe=r.convert(x.type)),x.format===yn&&Ae===s.DEPTH_COMPONENT&&(Ae=s.DEPTH_STENCIL,x.type!==ki&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),x.type=ki,Fe=r.convert(x.type))),lt&&($e?t.texStorage2D(s.TEXTURE_2D,1,Ae,ne.width,ne.height):t.texImage2D(s.TEXTURE_2D,0,Ae,ne.width,ne.height,0,Ye,Fe,null));else if(x.isDataTexture)if(Ve.length>0&&Je){$e&&lt&&t.texStorage2D(s.TEXTURE_2D,Xe,Ae,Ve[0].width,Ve[0].height);for(let ce=0,D=Ve.length;ce<D;ce++)ye=Ve[ce],$e?t.texSubImage2D(s.TEXTURE_2D,ce,0,0,ye.width,ye.height,Ye,Fe,ye.data):t.texImage2D(s.TEXTURE_2D,ce,Ae,ye.width,ye.height,0,Ye,Fe,ye.data);x.generateMipmaps=!1}else $e?(lt&&t.texStorage2D(s.TEXTURE_2D,Xe,Ae,ne.width,ne.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,ne.width,ne.height,Ye,Fe,ne.data)):t.texImage2D(s.TEXTURE_2D,0,Ae,ne.width,ne.height,0,Ye,Fe,ne.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){$e&&lt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Xe,Ae,Ve[0].width,Ve[0].height,ne.depth);for(let ce=0,D=Ve.length;ce<D;ce++)ye=Ve[ce],x.format!==$t?Ye!==null?$e?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ce,0,0,0,ye.width,ye.height,ne.depth,Ye,ye.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ce,Ae,ye.width,ye.height,ne.depth,0,ye.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?t.texSubImage3D(s.TEXTURE_2D_ARRAY,ce,0,0,0,ye.width,ye.height,ne.depth,Ye,Fe,ye.data):t.texImage3D(s.TEXTURE_2D_ARRAY,ce,Ae,ye.width,ye.height,ne.depth,0,Ye,Fe,ye.data)}else{$e&&lt&&t.texStorage2D(s.TEXTURE_2D,Xe,Ae,Ve[0].width,Ve[0].height);for(let ce=0,D=Ve.length;ce<D;ce++)ye=Ve[ce],x.format!==$t?Ye!==null?$e?t.compressedTexSubImage2D(s.TEXTURE_2D,ce,0,0,ye.width,ye.height,Ye,ye.data):t.compressedTexImage2D(s.TEXTURE_2D,ce,Ae,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?t.texSubImage2D(s.TEXTURE_2D,ce,0,0,ye.width,ye.height,Ye,Fe,ye.data):t.texImage2D(s.TEXTURE_2D,ce,Ae,ye.width,ye.height,0,Ye,Fe,ye.data)}else if(x.isDataArrayTexture)$e?(lt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Xe,Ae,ne.width,ne.height,ne.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,Ye,Fe,ne.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,Ae,ne.width,ne.height,ne.depth,0,Ye,Fe,ne.data);else if(x.isData3DTexture)$e?(lt&&t.texStorage3D(s.TEXTURE_3D,Xe,Ae,ne.width,ne.height,ne.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,Ye,Fe,ne.data)):t.texImage3D(s.TEXTURE_3D,0,Ae,ne.width,ne.height,ne.depth,0,Ye,Fe,ne.data);else if(x.isFramebufferTexture){if(lt)if($e)t.texStorage2D(s.TEXTURE_2D,Xe,Ae,ne.width,ne.height);else{let ce=ne.width,D=ne.height;for(let pe=0;pe<Xe;pe++)t.texImage2D(s.TEXTURE_2D,pe,Ae,ce,D,0,Ye,Fe,null),ce>>=1,D>>=1}}else if(Ve.length>0&&Je){$e&&lt&&t.texStorage2D(s.TEXTURE_2D,Xe,Ae,Ve[0].width,Ve[0].height);for(let ce=0,D=Ve.length;ce<D;ce++)ye=Ve[ce],$e?t.texSubImage2D(s.TEXTURE_2D,ce,0,0,Ye,Fe,ye):t.texImage2D(s.TEXTURE_2D,ce,Ae,Ye,Fe,ye);x.generateMipmaps=!1}else $e?(lt&&t.texStorage2D(s.TEXTURE_2D,Xe,Ae,ne.width,ne.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,Ye,Fe,ne)):t.texImage2D(s.TEXTURE_2D,0,Ae,Ye,Fe,ne);M(x,Je)&&_(se),Me.__version=te.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function Se(b,x,k){if(x.image.length!==6)return;const se=$(b,x),ie=x.source;t.bindTexture(s.TEXTURE_CUBE_MAP,b.__webglTexture,s.TEXTURE0+k);const te=i.get(ie);if(ie.version!==te.__version||se===!0){t.activeTexture(s.TEXTURE0+k);const Me=Ke.getPrimaries(Ke.workingColorSpace),de=x.colorSpace===Wt?null:Ke.getPrimaries(x.colorSpace),xe=x.colorSpace===Wt||Me===de?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);const Ce=x.isCompressedTexture||x.image[0].isCompressedTexture,Be=x.image[0]&&x.image[0].isDataTexture,ne=[];for(let ce=0;ce<6;ce++)!Ce&&!Be?ne[ce]=v(x.image[ce],!1,!0,n.maxCubemapSize):ne[ce]=Be?x.image[ce].image:x.image[ce],ne[ce]=ge(x,ne[ce]);const Je=ne[0],Ye=m(Je)||a,Fe=r.convert(x.format,x.colorSpace),Ae=r.convert(x.type),ye=T(x.internalFormat,Fe,Ae,x.colorSpace),Ve=a&&x.isVideoTexture!==!0,$e=te.__version===void 0||se===!0;let lt=L(x,Je,Ye);W(s.TEXTURE_CUBE_MAP,x,Ye);let Xe;if(Ce){Ve&&$e&&t.texStorage2D(s.TEXTURE_CUBE_MAP,lt,ye,Je.width,Je.height);for(let ce=0;ce<6;ce++){Xe=ne[ce].mipmaps;for(let D=0;D<Xe.length;D++){const pe=Xe[D];x.format!==$t?Fe!==null?Ve?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,D,0,0,pe.width,pe.height,Fe,pe.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,D,ye,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ve?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,D,0,0,pe.width,pe.height,Fe,Ae,pe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,D,ye,pe.width,pe.height,0,Fe,Ae,pe.data)}}}else{Xe=x.mipmaps,Ve&&$e&&(Xe.length>0&&lt++,t.texStorage2D(s.TEXTURE_CUBE_MAP,lt,ye,ne[0].width,ne[0].height));for(let ce=0;ce<6;ce++)if(Be){Ve?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,ne[ce].width,ne[ce].height,Fe,Ae,ne[ce].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,ye,ne[ce].width,ne[ce].height,0,Fe,Ae,ne[ce].data);for(let D=0;D<Xe.length;D++){const me=Xe[D].image[ce].image;Ve?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,D+1,0,0,me.width,me.height,Fe,Ae,me.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,D+1,ye,me.width,me.height,0,Fe,Ae,me.data)}}else{Ve?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,Fe,Ae,ne[ce]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,ye,Fe,Ae,ne[ce]);for(let D=0;D<Xe.length;D++){const pe=Xe[D];Ve?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,D+1,0,0,Fe,Ae,pe.image[ce]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,D+1,ye,Fe,Ae,pe.image[ce])}}}M(x,Ye)&&_(s.TEXTURE_CUBE_MAP),te.__version=ie.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function _e(b,x,k,se,ie,te){const Me=r.convert(k.format,k.colorSpace),de=r.convert(k.type),xe=T(k.internalFormat,Me,de,k.colorSpace);if(!i.get(x).__hasExternalTextures){const Be=Math.max(1,x.width>>te),ne=Math.max(1,x.height>>te);ie===s.TEXTURE_3D||ie===s.TEXTURE_2D_ARRAY?t.texImage3D(ie,te,xe,Be,ne,x.depth,0,Me,de,null):t.texImage2D(ie,te,xe,Be,ne,0,Me,de,null)}t.bindFramebuffer(s.FRAMEBUFFER,b),q(x)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,se,ie,i.get(k).__webglTexture,0,oe(x)):(ie===s.TEXTURE_2D||ie>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,se,ie,i.get(k).__webglTexture,te),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Pe(b,x,k){if(s.bindRenderbuffer(s.RENDERBUFFER,b),x.depthBuffer&&!x.stencilBuffer){let se=a===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(k||q(x)){const ie=x.depthTexture;ie&&ie.isDepthTexture&&(ie.type===Ei?se=s.DEPTH_COMPONENT32F:ie.type===bi&&(se=s.DEPTH_COMPONENT24));const te=oe(x);q(x)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,te,se,x.width,x.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,te,se,x.width,x.height)}else s.renderbufferStorage(s.RENDERBUFFER,se,x.width,x.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,b)}else if(x.depthBuffer&&x.stencilBuffer){const se=oe(x);k&&q(x)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,se,s.DEPTH24_STENCIL8,x.width,x.height):q(x)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,se,s.DEPTH24_STENCIL8,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,x.width,x.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,b)}else{const se=x.isWebGLMultipleRenderTargets===!0?x.texture:[x.texture];for(let ie=0;ie<se.length;ie++){const te=se[ie],Me=r.convert(te.format,te.colorSpace),de=r.convert(te.type),xe=T(te.internalFormat,Me,de,te.colorSpace),Ce=oe(x);k&&q(x)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ce,xe,x.width,x.height):q(x)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ce,xe,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,xe,x.width,x.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ue(b,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,b),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),H(x.depthTexture,0);const se=i.get(x.depthTexture).__webglTexture,ie=oe(x);if(x.depthTexture.format===Bi)q(x)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,se,0,ie):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,se,0);else if(x.depthTexture.format===yn)q(x)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,se,0,ie):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function ae(b){const x=i.get(b),k=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture&&!x.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");Ue(x.__webglFramebuffer,b)}else if(k){x.__webglDepthbuffer=[];for(let se=0;se<6;se++)t.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer[se]),x.__webglDepthbuffer[se]=s.createRenderbuffer(),Pe(x.__webglDepthbuffer[se],b,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer=s.createRenderbuffer(),Pe(x.__webglDepthbuffer,b,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function Le(b,x,k){const se=i.get(b);x!==void 0&&_e(se.__webglFramebuffer,b,b.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),k!==void 0&&ae(b)}function R(b){const x=b.texture,k=i.get(b),se=i.get(x);b.addEventListener("dispose",N),b.isWebGLMultipleRenderTargets!==!0&&(se.__webglTexture===void 0&&(se.__webglTexture=s.createTexture()),se.__version=x.version,o.memory.textures++);const ie=b.isWebGLCubeRenderTarget===!0,te=b.isWebGLMultipleRenderTargets===!0,Me=m(b)||a;if(ie){k.__webglFramebuffer=[];for(let de=0;de<6;de++)if(a&&x.mipmaps&&x.mipmaps.length>0){k.__webglFramebuffer[de]=[];for(let xe=0;xe<x.mipmaps.length;xe++)k.__webglFramebuffer[de][xe]=s.createFramebuffer()}else k.__webglFramebuffer[de]=s.createFramebuffer()}else{if(a&&x.mipmaps&&x.mipmaps.length>0){k.__webglFramebuffer=[];for(let de=0;de<x.mipmaps.length;de++)k.__webglFramebuffer[de]=s.createFramebuffer()}else k.__webglFramebuffer=s.createFramebuffer();if(te)if(n.drawBuffers){const de=b.texture;for(let xe=0,Ce=de.length;xe<Ce;xe++){const Be=i.get(de[xe]);Be.__webglTexture===void 0&&(Be.__webglTexture=s.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&b.samples>0&&q(b)===!1){const de=te?x:[x];k.__webglMultisampledFramebuffer=s.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let xe=0;xe<de.length;xe++){const Ce=de[xe];k.__webglColorRenderbuffer[xe]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,k.__webglColorRenderbuffer[xe]);const Be=r.convert(Ce.format,Ce.colorSpace),ne=r.convert(Ce.type),Je=T(Ce.internalFormat,Be,ne,Ce.colorSpace,b.isXRRenderTarget===!0),Ye=oe(b);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ye,Je,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+xe,s.RENDERBUFFER,k.__webglColorRenderbuffer[xe])}s.bindRenderbuffer(s.RENDERBUFFER,null),b.depthBuffer&&(k.__webglDepthRenderbuffer=s.createRenderbuffer(),Pe(k.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ie){t.bindTexture(s.TEXTURE_CUBE_MAP,se.__webglTexture),W(s.TEXTURE_CUBE_MAP,x,Me);for(let de=0;de<6;de++)if(a&&x.mipmaps&&x.mipmaps.length>0)for(let xe=0;xe<x.mipmaps.length;xe++)_e(k.__webglFramebuffer[de][xe],b,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+de,xe);else _e(k.__webglFramebuffer[de],b,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+de,0);M(x,Me)&&_(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(te){const de=b.texture;for(let xe=0,Ce=de.length;xe<Ce;xe++){const Be=de[xe],ne=i.get(Be);t.bindTexture(s.TEXTURE_2D,ne.__webglTexture),W(s.TEXTURE_2D,Be,Me),_e(k.__webglFramebuffer,b,Be,s.COLOR_ATTACHMENT0+xe,s.TEXTURE_2D,0),M(Be,Me)&&_(s.TEXTURE_2D)}t.unbindTexture()}else{let de=s.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(a?de=b.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(de,se.__webglTexture),W(de,x,Me),a&&x.mipmaps&&x.mipmaps.length>0)for(let xe=0;xe<x.mipmaps.length;xe++)_e(k.__webglFramebuffer[xe],b,x,s.COLOR_ATTACHMENT0,de,xe);else _e(k.__webglFramebuffer,b,x,s.COLOR_ATTACHMENT0,de,0);M(x,Me)&&_(de),t.unbindTexture()}b.depthBuffer&&ae(b)}function le(b){const x=m(b)||a,k=b.isWebGLMultipleRenderTargets===!0?b.texture:[b.texture];for(let se=0,ie=k.length;se<ie;se++){const te=k[se];if(M(te,x)){const Me=b.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,de=i.get(te).__webglTexture;t.bindTexture(Me,de),_(Me),t.unbindTexture()}}}function j(b){if(a&&b.samples>0&&q(b)===!1){const x=b.isWebGLMultipleRenderTargets?b.texture:[b.texture],k=b.width,se=b.height;let ie=s.COLOR_BUFFER_BIT;const te=[],Me=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,de=i.get(b),xe=b.isWebGLMultipleRenderTargets===!0;if(xe)for(let Ce=0;Ce<x.length;Ce++)t.bindFramebuffer(s.FRAMEBUFFER,de.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ce,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,de.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ce,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,de.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,de.__webglFramebuffer);for(let Ce=0;Ce<x.length;Ce++){te.push(s.COLOR_ATTACHMENT0+Ce),b.depthBuffer&&te.push(Me);const Be=de.__ignoreDepthValues!==void 0?de.__ignoreDepthValues:!1;if(Be===!1&&(b.depthBuffer&&(ie|=s.DEPTH_BUFFER_BIT),b.stencilBuffer&&(ie|=s.STENCIL_BUFFER_BIT)),xe&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,de.__webglColorRenderbuffer[Ce]),Be===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[Me]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[Me])),xe){const ne=i.get(x[Ce]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ne,0)}s.blitFramebuffer(0,0,k,se,0,0,k,se,ie,s.NEAREST),c&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,te)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),xe)for(let Ce=0;Ce<x.length;Ce++){t.bindFramebuffer(s.FRAMEBUFFER,de.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ce,s.RENDERBUFFER,de.__webglColorRenderbuffer[Ce]);const Be=i.get(x[Ce]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,de.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ce,s.TEXTURE_2D,Be,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,de.__webglMultisampledFramebuffer)}}function oe(b){return Math.min(n.maxSamples,b.samples)}function q(b){const x=i.get(b);return a&&b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Te(b){const x=o.render.frame;h.get(b)!==x&&(h.set(b,x),b.update())}function ge(b,x){const k=b.colorSpace,se=b.format,ie=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||b.format===Jr||k!==gi&&k!==Wt&&(Ke.getTransfer(k)===it?a===!1?e.has("EXT_sRGB")===!0&&se===$t?(b.format=Jr,b.minFilter=It,b.generateMipmaps=!1):x=Jl.sRGBToLinear(x):(se!==$t||ie!==wi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),x}this.allocateTextureUnit=I,this.resetTextureUnits=K,this.setTexture2D=H,this.setTexture2DArray=J,this.setTexture3D=Y,this.setTextureCube=X,this.rebindTextures=Le,this.setupRenderTarget=R,this.updateRenderTargetMipmap=le,this.updateMultisampleRenderTarget=j,this.setupDepthRenderbuffer=ae,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=q}function Jm(s,e,t){const i=t.isWebGL2;function n(r,o=Wt){let a;const l=Ke.getTransfer(o);if(r===wi)return s.UNSIGNED_BYTE;if(r===Bl)return s.UNSIGNED_SHORT_4_4_4_4;if(r===zl)return s.UNSIGNED_SHORT_5_5_5_1;if(r===_h)return s.BYTE;if(r===vh)return s.SHORT;if(r===oo)return s.UNSIGNED_SHORT;if(r===kl)return s.INT;if(r===bi)return s.UNSIGNED_INT;if(r===Ei)return s.FLOAT;if(r===Vn)return i?s.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===xh)return s.ALPHA;if(r===$t)return s.RGBA;if(r===yh)return s.LUMINANCE;if(r===Sh)return s.LUMINANCE_ALPHA;if(r===Bi)return s.DEPTH_COMPONENT;if(r===yn)return s.DEPTH_STENCIL;if(r===Jr)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===Mh)return s.RED;if(r===Gl)return s.RED_INTEGER;if(r===bh)return s.RG;if(r===Vl)return s.RG_INTEGER;if(r===Hl)return s.RGBA_INTEGER;if(r===or||r===ar||r===lr||r===cr)if(l===it)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===or)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===ar)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===lr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===cr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===or)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===ar)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===lr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===cr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Bo||r===zo||r===Go||r===Vo)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===Bo)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===zo)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Go)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Vo)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Wl)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Ho||r===Wo)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===Ho)return l===it?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===Wo)return l===it?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Xo||r===qo||r===jo||r===Yo||r===Jo||r===Zo||r===$o||r===Ko||r===Qo||r===ea||r===ta||r===ia||r===na||r===sa)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===Xo)return l===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===qo)return l===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===jo)return l===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Yo)return l===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Jo)return l===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Zo)return l===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===$o)return l===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Ko)return l===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Qo)return l===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===ea)return l===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===ta)return l===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===ia)return l===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===na)return l===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===sa)return l===it?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===hr||r===ra||r===oa)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===hr)return l===it?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===ra)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===oa)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Eh||r===aa||r===la||r===ca)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===hr)return a.COMPRESSED_RED_RGTC1_EXT;if(r===aa)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===la)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===ca)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===ki?i?s.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:n}}class Zm extends Bt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Rt extends xt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const $m={type:"move"};class Dr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Rt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Rt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Rt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let n=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,i),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(n=t.getPose(e.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(a.matrix.fromArray(n.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,n.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(n.linearVelocity)):a.hasLinearVelocity=!1,n.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(n.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent($m)))}return a!==null&&(a.visible=n!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Rt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Km extends Mn{constructor(e,t){super();const i=this;let n=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const v=t.getContextAttributes();let m=null,p=null;const M=[],_=[],T=new re;let L=null;const P=new Bt;P.layers.enable(1),P.viewport=new nt;const C=new Bt;C.layers.enable(2),C.viewport=new nt;const N=[P,C],S=new Zm;S.layers.enable(1),S.layers.enable(2);let E=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let $=M[W];return $===void 0&&($=new Dr,M[W]=$),$.getTargetRaySpace()},this.getControllerGrip=function(W){let $=M[W];return $===void 0&&($=new Dr,M[W]=$),$.getGripSpace()},this.getHand=function(W){let $=M[W];return $===void 0&&($=new Dr,M[W]=$),$.getHandSpace()};function z(W){const $=_.indexOf(W.inputSource);if($===-1)return;const fe=M[$];fe!==void 0&&(fe.update(W.inputSource,W.frame,c||o),fe.dispatchEvent({type:W.type,data:W.inputSource}))}function K(){n.removeEventListener("select",z),n.removeEventListener("selectstart",z),n.removeEventListener("selectend",z),n.removeEventListener("squeeze",z),n.removeEventListener("squeezestart",z),n.removeEventListener("squeezeend",z),n.removeEventListener("end",K),n.removeEventListener("inputsourceschange",I);for(let W=0;W<M.length;W++){const $=_[W];$!==null&&(_[W]=null,M[W].disconnect($))}E=null,U=null,e.setRenderTarget(m),f=null,d=null,u=null,n=null,p=null,ue.stop(),i.isPresenting=!1,e.setPixelRatio(L),e.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(W){if(n=W,n!==null){if(m=e.getRenderTarget(),n.addEventListener("select",z),n.addEventListener("selectstart",z),n.addEventListener("selectend",z),n.addEventListener("squeeze",z),n.addEventListener("squeezestart",z),n.addEventListener("squeezeend",z),n.addEventListener("end",K),n.addEventListener("inputsourceschange",I),v.xrCompatible!==!0&&await t.makeXRCompatible(),L=e.getPixelRatio(),e.getSize(T),n.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const $={antialias:n.renderState.layers===void 0?v.antialias:!0,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(n,t,$),n.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new Gi(f.framebufferWidth,f.framebufferHeight,{format:$t,type:wi,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil})}else{let $=null,fe=null,Se=null;v.depth&&(Se=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,$=v.stencil?yn:Bi,fe=v.stencil?ki:bi);const _e={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:r};u=new XRWebGLBinding(n,t),d=u.createProjectionLayer(_e),n.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),p=new Gi(d.textureWidth,d.textureHeight,{format:$t,type:wi,depthTexture:new oc(d.textureWidth,d.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0});const Pe=e.properties.get(p);Pe.__ignoreDepthValues=d.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await n.requestReferenceSpace(a),ue.setContext(n),ue.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode};function I(W){for(let $=0;$<W.removed.length;$++){const fe=W.removed[$],Se=_.indexOf(fe);Se>=0&&(_[Se]=null,M[Se].disconnect(fe))}for(let $=0;$<W.added.length;$++){const fe=W.added[$];let Se=_.indexOf(fe);if(Se===-1){for(let Pe=0;Pe<M.length;Pe++)if(Pe>=_.length){_.push(fe),Se=Pe;break}else if(_[Pe]===null){_[Pe]=fe,Se=Pe;break}if(Se===-1)break}const _e=M[Se];_e&&_e.connect(fe)}}const O=new w,H=new w;function J(W,$,fe){O.setFromMatrixPosition($.matrixWorld),H.setFromMatrixPosition(fe.matrixWorld);const Se=O.distanceTo(H),_e=$.projectionMatrix.elements,Pe=fe.projectionMatrix.elements,Ue=_e[14]/(_e[10]-1),ae=_e[14]/(_e[10]+1),Le=(_e[9]+1)/_e[5],R=(_e[9]-1)/_e[5],le=(_e[8]-1)/_e[0],j=(Pe[8]+1)/Pe[0],oe=Ue*le,q=Ue*j,Te=Se/(-le+j),ge=Te*-le;$.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(ge),W.translateZ(Te),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert();const b=Ue+Te,x=ae+Te,k=oe-ge,se=q+(Se-ge),ie=Le*ae/x*b,te=R*ae/x*b;W.projectionMatrix.makePerspective(k,se,ie,te,b,x),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}function Y(W,$){$===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices($.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(n===null)return;S.near=C.near=P.near=W.near,S.far=C.far=P.far=W.far,(E!==S.near||U!==S.far)&&(n.updateRenderState({depthNear:S.near,depthFar:S.far}),E=S.near,U=S.far);const $=W.parent,fe=S.cameras;Y(S,$);for(let Se=0;Se<fe.length;Se++)Y(fe[Se],$);fe.length===2?J(S,P,C):S.projectionMatrix.copy(P.projectionMatrix),X(W,S,$)};function X(W,$,fe){fe===null?W.matrix.copy($.matrixWorld):(W.matrix.copy(fe.matrixWorld),W.matrix.invert(),W.matrix.multiply($.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy($.projectionMatrix),W.projectionMatrixInverse.copy($.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Hn*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(W){l=W,d!==null&&(d.fixedFoveation=W),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=W)};let Q=null;function ee(W,$){if(h=$.getViewerPose(c||o),g=$,h!==null){const fe=h.views;f!==null&&(e.setRenderTargetFramebuffer(p,f.framebuffer),e.setRenderTarget(p));let Se=!1;fe.length!==S.cameras.length&&(S.cameras.length=0,Se=!0);for(let _e=0;_e<fe.length;_e++){const Pe=fe[_e];let Ue=null;if(f!==null)Ue=f.getViewport(Pe);else{const Le=u.getViewSubImage(d,Pe);Ue=Le.viewport,_e===0&&(e.setRenderTargetTextures(p,Le.colorTexture,d.ignoreDepthValues?void 0:Le.depthStencilTexture),e.setRenderTarget(p))}let ae=N[_e];ae===void 0&&(ae=new Bt,ae.layers.enable(_e),ae.viewport=new nt,N[_e]=ae),ae.matrix.fromArray(Pe.transform.matrix),ae.matrix.decompose(ae.position,ae.quaternion,ae.scale),ae.projectionMatrix.fromArray(Pe.projectionMatrix),ae.projectionMatrixInverse.copy(ae.projectionMatrix).invert(),ae.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),_e===0&&(S.matrix.copy(ae.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),Se===!0&&S.cameras.push(ae)}}for(let fe=0;fe<M.length;fe++){const Se=_[fe],_e=M[fe];Se!==null&&_e!==void 0&&_e.update(Se,$,c||o)}Q&&Q(W,$),$.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:$}),g=null}const ue=new sc;ue.setAnimationLoop(ee),this.setAnimationLoop=function(W){Q=W},this.dispose=function(){}}}function Qm(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,tc(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function n(m,p,M,_,T){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,T)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,M,_):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ut&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ut&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=e.get(p).envMap;if(M&&(m.envMap.value=M,m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const _=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*_,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,_){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=_*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ut&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const M=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function eg(s,e,t,i){let n={},r={},o=[];const a=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(M,_){const T=_.program;i.uniformBlockBinding(M,T)}function c(M,_){let T=n[M.id];T===void 0&&(g(M),T=h(M),n[M.id]=T,M.addEventListener("dispose",m));const L=_.program;i.updateUBOMapping(M,L);const P=e.render.frame;r[M.id]!==P&&(d(M),r[M.id]=P)}function h(M){const _=u();M.__bindingPointIndex=_;const T=s.createBuffer(),L=M.__size,P=M.usage;return s.bindBuffer(s.UNIFORM_BUFFER,T),s.bufferData(s.UNIFORM_BUFFER,L,P),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,_,T),T}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const _=n[M.id],T=M.uniforms,L=M.__cache;s.bindBuffer(s.UNIFORM_BUFFER,_);for(let P=0,C=T.length;P<C;P++){const N=Array.isArray(T[P])?T[P]:[T[P]];for(let S=0,E=N.length;S<E;S++){const U=N[S];if(f(U,P,S,L)===!0){const z=U.__offset,K=Array.isArray(U.value)?U.value:[U.value];let I=0;for(let O=0;O<K.length;O++){const H=K[O],J=v(H);typeof H=="number"||typeof H=="boolean"?(U.__data[0]=H,s.bufferSubData(s.UNIFORM_BUFFER,z+I,U.__data)):H.isMatrix3?(U.__data[0]=H.elements[0],U.__data[1]=H.elements[1],U.__data[2]=H.elements[2],U.__data[3]=0,U.__data[4]=H.elements[3],U.__data[5]=H.elements[4],U.__data[6]=H.elements[5],U.__data[7]=0,U.__data[8]=H.elements[6],U.__data[9]=H.elements[7],U.__data[10]=H.elements[8],U.__data[11]=0):(H.toArray(U.__data,I),I+=J.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,z,U.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(M,_,T,L){const P=M.value,C=_+"_"+T;if(L[C]===void 0)return typeof P=="number"||typeof P=="boolean"?L[C]=P:L[C]=P.clone(),!0;{const N=L[C];if(typeof P=="number"||typeof P=="boolean"){if(N!==P)return L[C]=P,!0}else if(N.equals(P)===!1)return N.copy(P),!0}return!1}function g(M){const _=M.uniforms;let T=0;const L=16;for(let C=0,N=_.length;C<N;C++){const S=Array.isArray(_[C])?_[C]:[_[C]];for(let E=0,U=S.length;E<U;E++){const z=S[E],K=Array.isArray(z.value)?z.value:[z.value];for(let I=0,O=K.length;I<O;I++){const H=K[I],J=v(H),Y=T%L;Y!==0&&L-Y<J.boundary&&(T+=L-Y),z.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=T,T+=J.storage}}}const P=T%L;return P>0&&(T+=L-P),M.__size=T,M.__cache={},this}function v(M){const _={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(_.boundary=4,_.storage=4):M.isVector2?(_.boundary=8,_.storage=8):M.isVector3||M.isColor?(_.boundary=16,_.storage=12):M.isVector4?(_.boundary=16,_.storage=16):M.isMatrix3?(_.boundary=48,_.storage=48):M.isMatrix4?(_.boundary=64,_.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),_}function m(M){const _=M.target;_.removeEventListener("dispose",m);const T=o.indexOf(_.__bindingPointIndex);o.splice(T,1),s.deleteBuffer(n[_.id]),delete n[_.id],delete r[_.id]}function p(){for(const M in n)s.deleteBuffer(n[M]);o=[],n={},r={}}return{bind:l,update:c,dispose:p}}class dc{constructor(e={}){const{canvas:t=Jh(),context:i=null,depth:n=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=o;const f=new Uint32Array(4),g=new Int32Array(4);let v=null,m=null;const p=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=dt,this._useLegacyLights=!1,this.toneMapping=Ai,this.toneMappingExposure=1;const _=this;let T=!1,L=0,P=0,C=null,N=-1,S=null;const E=new nt,U=new nt;let z=null;const K=new Oe(0);let I=0,O=t.width,H=t.height,J=1,Y=null,X=null;const Q=new nt(0,0,O,H),ee=new nt(0,0,O,H);let ue=!1;const W=new ho;let $=!1,fe=!1,Se=null;const _e=new at,Pe=new re,Ue=new w,ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Le(){return C===null?J:1}let R=i;function le(A,F){for(let G=0;G<A.length;G++){const V=A[G],B=t.getContext(V,F);if(B!==null)return B}return null}try{const A={alpha:!0,depth:n,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ro}`),t.addEventListener("webglcontextlost",ce,!1),t.addEventListener("webglcontextrestored",D,!1),t.addEventListener("webglcontextcreationerror",pe,!1),R===null){const F=["webgl2","webgl","experimental-webgl"];if(_.isWebGL1Renderer===!0&&F.shift(),R=le(F,A),R===null)throw le(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&R instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),R.getShaderPrecisionFormat===void 0&&(R.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let j,oe,q,Te,ge,b,x,k,se,ie,te,Me,de,xe,Ce,Be,ne,Je,Ye,Fe,Ae,ye,Ve,$e;function lt(){j=new hp(R),oe=new sp(R,j,e),j.init(oe),ye=new Jm(R,j,oe),q=new jm(R,j,oe),Te=new fp(R),ge=new Dm,b=new Ym(R,j,q,ge,oe,ye,Te),x=new op(_),k=new cp(_),se=new yu(R,oe),Ve=new ip(R,j,se,oe),ie=new up(R,se,Te,Ve),te=new _p(R,ie,se,Te),Ye=new gp(R,oe,b),Be=new rp(ge),Me=new Im(_,x,k,j,oe,Ve,Be),de=new Qm(_,ge),xe=new Nm,Ce=new Gm(j,oe),Je=new tp(_,x,k,q,te,d,l),ne=new qm(_,te,oe),$e=new eg(R,Te,oe,q),Fe=new np(R,j,Te,oe),Ae=new dp(R,j,Te,oe),Te.programs=Me.programs,_.capabilities=oe,_.extensions=j,_.properties=ge,_.renderLists=xe,_.shadowMap=ne,_.state=q,_.info=Te}lt();const Xe=new Km(_,R);this.xr=Xe,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const A=j.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=j.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(A){A!==void 0&&(J=A,this.setSize(O,H,!1))},this.getSize=function(A){return A.set(O,H)},this.setSize=function(A,F,G=!0){if(Xe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=A,H=F,t.width=Math.floor(A*J),t.height=Math.floor(F*J),G===!0&&(t.style.width=A+"px",t.style.height=F+"px"),this.setViewport(0,0,A,F)},this.getDrawingBufferSize=function(A){return A.set(O*J,H*J).floor()},this.setDrawingBufferSize=function(A,F,G){O=A,H=F,J=G,t.width=Math.floor(A*G),t.height=Math.floor(F*G),this.setViewport(0,0,A,F)},this.getCurrentViewport=function(A){return A.copy(E)},this.getViewport=function(A){return A.copy(Q)},this.setViewport=function(A,F,G,V){A.isVector4?Q.set(A.x,A.y,A.z,A.w):Q.set(A,F,G,V),q.viewport(E.copy(Q).multiplyScalar(J).floor())},this.getScissor=function(A){return A.copy(ee)},this.setScissor=function(A,F,G,V){A.isVector4?ee.set(A.x,A.y,A.z,A.w):ee.set(A,F,G,V),q.scissor(U.copy(ee).multiplyScalar(J).floor())},this.getScissorTest=function(){return ue},this.setScissorTest=function(A){q.setScissorTest(ue=A)},this.setOpaqueSort=function(A){Y=A},this.setTransparentSort=function(A){X=A},this.getClearColor=function(A){return A.copy(Je.getClearColor())},this.setClearColor=function(){Je.setClearColor.apply(Je,arguments)},this.getClearAlpha=function(){return Je.getClearAlpha()},this.setClearAlpha=function(){Je.setClearAlpha.apply(Je,arguments)},this.clear=function(A=!0,F=!0,G=!0){let V=0;if(A){let B=!1;if(C!==null){const ve=C.texture.format;B=ve===Hl||ve===Vl||ve===Gl}if(B){const ve=C.texture.type,Ee=ve===wi||ve===bi||ve===oo||ve===ki||ve===Bl||ve===zl,Ie=Je.getClearColor(),Ne=Je.getClearAlpha(),We=Ie.r,ke=Ie.g,ze=Ie.b;Ee?(f[0]=We,f[1]=ke,f[2]=ze,f[3]=Ne,R.clearBufferuiv(R.COLOR,0,f)):(g[0]=We,g[1]=ke,g[2]=ze,g[3]=Ne,R.clearBufferiv(R.COLOR,0,g))}else V|=R.COLOR_BUFFER_BIT}F&&(V|=R.DEPTH_BUFFER_BIT),G&&(V|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ce,!1),t.removeEventListener("webglcontextrestored",D,!1),t.removeEventListener("webglcontextcreationerror",pe,!1),xe.dispose(),Ce.dispose(),ge.dispose(),x.dispose(),k.dispose(),te.dispose(),Ve.dispose(),$e.dispose(),Me.dispose(),Xe.dispose(),Xe.removeEventListener("sessionstart",Tt),Xe.removeEventListener("sessionend",tt),Se&&(Se.dispose(),Se=null),At.stop()};function ce(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function D(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const A=Te.autoReset,F=ne.enabled,G=ne.autoUpdate,V=ne.needsUpdate,B=ne.type;lt(),Te.autoReset=A,ne.enabled=F,ne.autoUpdate=G,ne.needsUpdate=V,ne.type=B}function pe(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function me(A){const F=A.target;F.removeEventListener("dispose",me),De(F)}function De(A){Re(A),ge.remove(A)}function Re(A){const F=ge.get(A).programs;F!==void 0&&(F.forEach(function(G){Me.releaseProgram(G)}),A.isShaderMaterial&&Me.releaseShaderCache(A))}this.renderBufferDirect=function(A,F,G,V,B,ve){F===null&&(F=ae);const Ee=B.isMesh&&B.matrixWorld.determinant()<0,Ie=Rc(A,F,G,V,B);q.setMaterial(V,Ee);let Ne=G.index,We=1;if(V.wireframe===!0){if(Ne=ie.getWireframeAttribute(G),Ne===void 0)return;We=2}const ke=G.drawRange,ze=G.attributes.position;let ht=ke.start*We,Ft=(ke.start+ke.count)*We;ve!==null&&(ht=Math.max(ht,ve.start*We),Ft=Math.min(Ft,(ve.start+ve.count)*We)),Ne!==null?(ht=Math.max(ht,0),Ft=Math.min(Ft,Ne.count)):ze!=null&&(ht=Math.max(ht,0),Ft=Math.min(Ft,ze.count));const gt=Ft-ht;if(gt<0||gt===1/0)return;Ve.setup(B,V,Ie,G,Ne);let ri,rt=Fe;if(Ne!==null&&(ri=se.get(Ne),rt=Ae,rt.setIndex(ri)),B.isMesh)V.wireframe===!0?(q.setLineWidth(V.wireframeLinewidth*Le()),rt.setMode(R.LINES)):rt.setMode(R.TRIANGLES);else if(B.isLine){let qe=V.linewidth;qe===void 0&&(qe=1),q.setLineWidth(qe*Le()),B.isLineSegments?rt.setMode(R.LINES):B.isLineLoop?rt.setMode(R.LINE_LOOP):rt.setMode(R.LINE_STRIP)}else B.isPoints?rt.setMode(R.POINTS):B.isSprite&&rt.setMode(R.TRIANGLES);if(B.isBatchedMesh)rt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else if(B.isInstancedMesh)rt.renderInstances(ht,gt,B.count);else if(G.isInstancedBufferGeometry){const qe=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,tr=Math.min(G.instanceCount,qe);rt.renderInstances(ht,gt,tr)}else rt.render(ht,gt)};function Qe(A,F,G){A.transparent===!0&&A.side===zt&&A.forceSinglePass===!1?(A.side=Ut,A.needsUpdate=!0,ts(A,F,G),A.side=mi,A.needsUpdate=!0,ts(A,F,G),A.side=zt):ts(A,F,G)}this.compile=function(A,F,G=null){G===null&&(G=A),m=Ce.get(G),m.init(),M.push(m),G.traverseVisible(function(B){B.isLight&&B.layers.test(F.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),A!==G&&A.traverseVisible(function(B){B.isLight&&B.layers.test(F.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),m.setupLights(_._useLegacyLights);const V=new Set;return A.traverse(function(B){const ve=B.material;if(ve)if(Array.isArray(ve))for(let Ee=0;Ee<ve.length;Ee++){const Ie=ve[Ee];Qe(Ie,G,B),V.add(Ie)}else Qe(ve,G,B),V.add(ve)}),M.pop(),m=null,V},this.compileAsync=function(A,F,G=null){const V=this.compile(A,F,G);return new Promise(B=>{function ve(){if(V.forEach(function(Ee){ge.get(Ee).currentProgram.isReady()&&V.delete(Ee)}),V.size===0){B(A);return}setTimeout(ve,10)}j.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let et=null;function mt(A){et&&et(A)}function Tt(){At.stop()}function tt(){At.start()}const At=new sc;At.setAnimationLoop(mt),typeof self<"u"&&At.setContext(self),this.setAnimationLoop=function(A){et=A,Xe.setAnimationLoop(A),A===null?At.stop():At.start()},Xe.addEventListener("sessionstart",Tt),Xe.addEventListener("sessionend",tt),this.render=function(A,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Xe.enabled===!0&&Xe.isPresenting===!0&&(Xe.cameraAutoUpdate===!0&&Xe.updateCamera(F),F=Xe.getCamera()),A.isScene===!0&&A.onBeforeRender(_,A,F,C),m=Ce.get(A,M.length),m.init(),M.push(m),_e.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),W.setFromProjectionMatrix(_e),fe=this.localClippingEnabled,$=Be.init(this.clippingPlanes,fe),v=xe.get(A,p.length),v.init(),p.push(v),Kt(A,F,0,_.sortObjects),v.finish(),_.sortObjects===!0&&v.sort(Y,X),this.info.render.frame++,$===!0&&Be.beginShadows();const G=m.state.shadowsArray;if(ne.render(G,A,F),$===!0&&Be.endShadows(),this.info.autoReset===!0&&this.info.reset(),Je.render(v,A),m.setupLights(_._useLegacyLights),F.isArrayCamera){const V=F.cameras;for(let B=0,ve=V.length;B<ve;B++){const Ee=V[B];Ao(v,A,Ee,Ee.viewport)}}else Ao(v,A,F);C!==null&&(b.updateMultisampleRenderTarget(C),b.updateRenderTargetMipmap(C)),A.isScene===!0&&A.onAfterRender(_,A,F),Ve.resetDefaultState(),N=-1,S=null,M.pop(),M.length>0?m=M[M.length-1]:m=null,p.pop(),p.length>0?v=p[p.length-1]:v=null};function Kt(A,F,G,V){if(A.visible===!1)return;if(A.layers.test(F.layers)){if(A.isGroup)G=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(F);else if(A.isLight)m.pushLight(A),A.castShadow&&m.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||W.intersectsSprite(A)){V&&Ue.setFromMatrixPosition(A.matrixWorld).applyMatrix4(_e);const Ee=te.update(A),Ie=A.material;Ie.visible&&v.push(A,Ee,Ie,G,Ue.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||W.intersectsObject(A))){const Ee=te.update(A),Ie=A.material;if(V&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Ue.copy(A.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),Ue.copy(Ee.boundingSphere.center)),Ue.applyMatrix4(A.matrixWorld).applyMatrix4(_e)),Array.isArray(Ie)){const Ne=Ee.groups;for(let We=0,ke=Ne.length;We<ke;We++){const ze=Ne[We],ht=Ie[ze.materialIndex];ht&&ht.visible&&v.push(A,Ee,ht,G,Ue.z,ze)}}else Ie.visible&&v.push(A,Ee,Ie,G,Ue.z,null)}}const ve=A.children;for(let Ee=0,Ie=ve.length;Ee<Ie;Ee++)Kt(ve[Ee],F,G,V)}function Ao(A,F,G,V){const B=A.opaque,ve=A.transmissive,Ee=A.transparent;m.setupLightsView(G),$===!0&&Be.setGlobalState(_.clippingPlanes,G),ve.length>0&&Cc(B,ve,F,G),V&&q.viewport(E.copy(V)),B.length>0&&es(B,F,G),ve.length>0&&es(ve,F,G),Ee.length>0&&es(Ee,F,G),q.buffers.depth.setTest(!0),q.buffers.depth.setMask(!0),q.buffers.color.setMask(!0),q.setPolygonOffset(!1)}function Cc(A,F,G,V){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;const ve=oe.isWebGL2;Se===null&&(Se=new Gi(1,1,{generateMipmaps:!0,type:j.has("EXT_color_buffer_half_float")?Vn:wi,minFilter:Gn,samples:ve?4:0})),_.getDrawingBufferSize(Pe),ve?Se.setSize(Pe.x,Pe.y):Se.setSize(Ws(Pe.x),Ws(Pe.y));const Ee=_.getRenderTarget();_.setRenderTarget(Se),_.getClearColor(K),I=_.getClearAlpha(),I<1&&_.setClearColor(16777215,.5),_.clear();const Ie=_.toneMapping;_.toneMapping=Ai,es(A,G,V),b.updateMultisampleRenderTarget(Se),b.updateRenderTargetMipmap(Se);let Ne=!1;for(let We=0,ke=F.length;We<ke;We++){const ze=F[We],ht=ze.object,Ft=ze.geometry,gt=ze.material,ri=ze.group;if(gt.side===zt&&ht.layers.test(V.layers)){const rt=gt.side;gt.side=Ut,gt.needsUpdate=!0,wo(ht,G,V,Ft,gt,ri),gt.side=rt,gt.needsUpdate=!0,Ne=!0}}Ne===!0&&(b.updateMultisampleRenderTarget(Se),b.updateRenderTargetMipmap(Se)),_.setRenderTarget(Ee),_.setClearColor(K,I),_.toneMapping=Ie}function es(A,F,G){const V=F.isScene===!0?F.overrideMaterial:null;for(let B=0,ve=A.length;B<ve;B++){const Ee=A[B],Ie=Ee.object,Ne=Ee.geometry,We=V===null?Ee.material:V,ke=Ee.group;Ie.layers.test(G.layers)&&wo(Ie,F,G,Ne,We,ke)}}function wo(A,F,G,V,B,ve){A.onBeforeRender(_,F,G,V,B,ve),A.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),B.onBeforeRender(_,F,G,V,A,ve),B.transparent===!0&&B.side===zt&&B.forceSinglePass===!1?(B.side=Ut,B.needsUpdate=!0,_.renderBufferDirect(G,F,V,B,A,ve),B.side=mi,B.needsUpdate=!0,_.renderBufferDirect(G,F,V,B,A,ve),B.side=zt):_.renderBufferDirect(G,F,V,B,A,ve),A.onAfterRender(_,F,G,V,B,ve)}function ts(A,F,G){F.isScene!==!0&&(F=ae);const V=ge.get(A),B=m.state.lights,ve=m.state.shadowsArray,Ee=B.state.version,Ie=Me.getParameters(A,B.state,ve,F,G),Ne=Me.getProgramCacheKey(Ie);let We=V.programs;V.environment=A.isMeshStandardMaterial?F.environment:null,V.fog=F.fog,V.envMap=(A.isMeshStandardMaterial?k:x).get(A.envMap||V.environment),We===void 0&&(A.addEventListener("dispose",me),We=new Map,V.programs=We);let ke=We.get(Ne);if(ke!==void 0){if(V.currentProgram===ke&&V.lightsStateVersion===Ee)return Co(A,Ie),ke}else Ie.uniforms=Me.getUniforms(A),A.onBuild(G,Ie,_),A.onBeforeCompile(Ie,_),ke=Me.acquireProgram(Ie,Ne),We.set(Ne,ke),V.uniforms=Ie.uniforms;const ze=V.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(ze.clippingPlanes=Be.uniform),Co(A,Ie),V.needsLights=Ic(A),V.lightsStateVersion=Ee,V.needsLights&&(ze.ambientLightColor.value=B.state.ambient,ze.lightProbe.value=B.state.probe,ze.directionalLights.value=B.state.directional,ze.directionalLightShadows.value=B.state.directionalShadow,ze.spotLights.value=B.state.spot,ze.spotLightShadows.value=B.state.spotShadow,ze.rectAreaLights.value=B.state.rectArea,ze.ltc_1.value=B.state.rectAreaLTC1,ze.ltc_2.value=B.state.rectAreaLTC2,ze.pointLights.value=B.state.point,ze.pointLightShadows.value=B.state.pointShadow,ze.hemisphereLights.value=B.state.hemi,ze.directionalShadowMap.value=B.state.directionalShadowMap,ze.directionalShadowMatrix.value=B.state.directionalShadowMatrix,ze.spotShadowMap.value=B.state.spotShadowMap,ze.spotLightMatrix.value=B.state.spotLightMatrix,ze.spotLightMap.value=B.state.spotLightMap,ze.pointShadowMap.value=B.state.pointShadowMap,ze.pointShadowMatrix.value=B.state.pointShadowMatrix),V.currentProgram=ke,V.uniformsList=null,ke}function Po(A){if(A.uniformsList===null){const F=A.currentProgram.getUniforms();A.uniformsList=Os.seqWithValue(F.seq,A.uniforms)}return A.uniformsList}function Co(A,F){const G=ge.get(A);G.outputColorSpace=F.outputColorSpace,G.batching=F.batching,G.instancing=F.instancing,G.instancingColor=F.instancingColor,G.skinning=F.skinning,G.morphTargets=F.morphTargets,G.morphNormals=F.morphNormals,G.morphColors=F.morphColors,G.morphTargetsCount=F.morphTargetsCount,G.numClippingPlanes=F.numClippingPlanes,G.numIntersection=F.numClipIntersection,G.vertexAlphas=F.vertexAlphas,G.vertexTangents=F.vertexTangents,G.toneMapping=F.toneMapping}function Rc(A,F,G,V,B){F.isScene!==!0&&(F=ae),b.resetTextureUnits();const ve=F.fog,Ee=V.isMeshStandardMaterial?F.environment:null,Ie=C===null?_.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:gi,Ne=(V.isMeshStandardMaterial?k:x).get(V.envMap||Ee),We=V.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,ke=!!G.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),ze=!!G.morphAttributes.position,ht=!!G.morphAttributes.normal,Ft=!!G.morphAttributes.color;let gt=Ai;V.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(gt=_.toneMapping);const ri=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,rt=ri!==void 0?ri.length:0,qe=ge.get(V),tr=m.state.lights;if($===!0&&(fe===!0||A!==S)){const Vt=A===S&&V.id===N;Be.setState(V,A,Vt)}let ct=!1;V.version===qe.__version?(qe.needsLights&&qe.lightsStateVersion!==tr.state.version||qe.outputColorSpace!==Ie||B.isBatchedMesh&&qe.batching===!1||!B.isBatchedMesh&&qe.batching===!0||B.isInstancedMesh&&qe.instancing===!1||!B.isInstancedMesh&&qe.instancing===!0||B.isSkinnedMesh&&qe.skinning===!1||!B.isSkinnedMesh&&qe.skinning===!0||B.isInstancedMesh&&qe.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&qe.instancingColor===!1&&B.instanceColor!==null||qe.envMap!==Ne||V.fog===!0&&qe.fog!==ve||qe.numClippingPlanes!==void 0&&(qe.numClippingPlanes!==Be.numPlanes||qe.numIntersection!==Be.numIntersection)||qe.vertexAlphas!==We||qe.vertexTangents!==ke||qe.morphTargets!==ze||qe.morphNormals!==ht||qe.morphColors!==Ft||qe.toneMapping!==gt||oe.isWebGL2===!0&&qe.morphTargetsCount!==rt)&&(ct=!0):(ct=!0,qe.__version=V.version);let Pi=qe.currentProgram;ct===!0&&(Pi=ts(V,F,B));let Ro=!1,En=!1,ir=!1;const Mt=Pi.getUniforms(),Ci=qe.uniforms;if(q.useProgram(Pi.program)&&(Ro=!0,En=!0,ir=!0),V.id!==N&&(N=V.id,En=!0),Ro||S!==A){Mt.setValue(R,"projectionMatrix",A.projectionMatrix),Mt.setValue(R,"viewMatrix",A.matrixWorldInverse);const Vt=Mt.map.cameraPosition;Vt!==void 0&&Vt.setValue(R,Ue.setFromMatrixPosition(A.matrixWorld)),oe.logarithmicDepthBuffer&&Mt.setValue(R,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&Mt.setValue(R,"isOrthographic",A.isOrthographicCamera===!0),S!==A&&(S=A,En=!0,ir=!0)}if(B.isSkinnedMesh){Mt.setOptional(R,B,"bindMatrix"),Mt.setOptional(R,B,"bindMatrixInverse");const Vt=B.skeleton;Vt&&(oe.floatVertexTextures?(Vt.boneTexture===null&&Vt.computeBoneTexture(),Mt.setValue(R,"boneTexture",Vt.boneTexture,b)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}B.isBatchedMesh&&(Mt.setOptional(R,B,"batchingTexture"),Mt.setValue(R,"batchingTexture",B._matricesTexture,b));const nr=G.morphAttributes;if((nr.position!==void 0||nr.normal!==void 0||nr.color!==void 0&&oe.isWebGL2===!0)&&Ye.update(B,G,Pi),(En||qe.receiveShadow!==B.receiveShadow)&&(qe.receiveShadow=B.receiveShadow,Mt.setValue(R,"receiveShadow",B.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(Ci.envMap.value=Ne,Ci.flipEnvMap.value=Ne.isCubeTexture&&Ne.isRenderTargetTexture===!1?-1:1),En&&(Mt.setValue(R,"toneMappingExposure",_.toneMappingExposure),qe.needsLights&&Lc(Ci,ir),ve&&V.fog===!0&&de.refreshFogUniforms(Ci,ve),de.refreshMaterialUniforms(Ci,V,J,H,Se),Os.upload(R,Po(qe),Ci,b)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Os.upload(R,Po(qe),Ci,b),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&Mt.setValue(R,"center",B.center),Mt.setValue(R,"modelViewMatrix",B.modelViewMatrix),Mt.setValue(R,"normalMatrix",B.normalMatrix),Mt.setValue(R,"modelMatrix",B.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Vt=V.uniformsGroups;for(let sr=0,Dc=Vt.length;sr<Dc;sr++)if(oe.isWebGL2){const Lo=Vt[sr];$e.update(Lo,Pi),$e.bind(Lo,Pi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Pi}function Lc(A,F){A.ambientLightColor.needsUpdate=F,A.lightProbe.needsUpdate=F,A.directionalLights.needsUpdate=F,A.directionalLightShadows.needsUpdate=F,A.pointLights.needsUpdate=F,A.pointLightShadows.needsUpdate=F,A.spotLights.needsUpdate=F,A.spotLightShadows.needsUpdate=F,A.rectAreaLights.needsUpdate=F,A.hemisphereLights.needsUpdate=F}function Ic(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(A,F,G){ge.get(A.texture).__webglTexture=F,ge.get(A.depthTexture).__webglTexture=G;const V=ge.get(A);V.__hasExternalTextures=!0,V.__hasExternalTextures&&(V.__autoAllocateDepthBuffer=G===void 0,V.__autoAllocateDepthBuffer||j.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(A,F){const G=ge.get(A);G.__webglFramebuffer=F,G.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(A,F=0,G=0){C=A,L=F,P=G;let V=!0,B=null,ve=!1,Ee=!1;if(A){const Ne=ge.get(A);Ne.__useDefaultFramebuffer!==void 0?(q.bindFramebuffer(R.FRAMEBUFFER,null),V=!1):Ne.__webglFramebuffer===void 0?b.setupRenderTarget(A):Ne.__hasExternalTextures&&b.rebindTextures(A,ge.get(A.texture).__webglTexture,ge.get(A.depthTexture).__webglTexture);const We=A.texture;(We.isData3DTexture||We.isDataArrayTexture||We.isCompressedArrayTexture)&&(Ee=!0);const ke=ge.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(ke[F])?B=ke[F][G]:B=ke[F],ve=!0):oe.isWebGL2&&A.samples>0&&b.useMultisampledRTT(A)===!1?B=ge.get(A).__webglMultisampledFramebuffer:Array.isArray(ke)?B=ke[G]:B=ke,E.copy(A.viewport),U.copy(A.scissor),z=A.scissorTest}else E.copy(Q).multiplyScalar(J).floor(),U.copy(ee).multiplyScalar(J).floor(),z=ue;if(q.bindFramebuffer(R.FRAMEBUFFER,B)&&oe.drawBuffers&&V&&q.drawBuffers(A,B),q.viewport(E),q.scissor(U),q.setScissorTest(z),ve){const Ne=ge.get(A.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+F,Ne.__webglTexture,G)}else if(Ee){const Ne=ge.get(A.texture),We=F||0;R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,Ne.__webglTexture,G||0,We)}N=-1},this.readRenderTargetPixels=function(A,F,G,V,B,ve,Ee){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ie=ge.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ee!==void 0&&(Ie=Ie[Ee]),Ie){q.bindFramebuffer(R.FRAMEBUFFER,Ie);try{const Ne=A.texture,We=Ne.format,ke=Ne.type;if(We!==$t&&ye.convert(We)!==R.getParameter(R.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const ze=ke===Vn&&(j.has("EXT_color_buffer_half_float")||oe.isWebGL2&&j.has("EXT_color_buffer_float"));if(ke!==wi&&ye.convert(ke)!==R.getParameter(R.IMPLEMENTATION_COLOR_READ_TYPE)&&!(ke===Ei&&(oe.isWebGL2||j.has("OES_texture_float")||j.has("WEBGL_color_buffer_float")))&&!ze){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=A.width-V&&G>=0&&G<=A.height-B&&R.readPixels(F,G,V,B,ye.convert(We),ye.convert(ke),ve)}finally{const Ne=C!==null?ge.get(C).__webglFramebuffer:null;q.bindFramebuffer(R.FRAMEBUFFER,Ne)}}},this.copyFramebufferToTexture=function(A,F,G=0){const V=Math.pow(2,-G),B=Math.floor(F.image.width*V),ve=Math.floor(F.image.height*V);b.setTexture2D(F,0),R.copyTexSubImage2D(R.TEXTURE_2D,G,0,0,A.x,A.y,B,ve),q.unbindTexture()},this.copyTextureToTexture=function(A,F,G,V=0){const B=F.image.width,ve=F.image.height,Ee=ye.convert(G.format),Ie=ye.convert(G.type);b.setTexture2D(G,0),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,G.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,G.unpackAlignment),F.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,V,A.x,A.y,B,ve,Ee,Ie,F.image.data):F.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,V,A.x,A.y,F.mipmaps[0].width,F.mipmaps[0].height,Ee,F.mipmaps[0].data):R.texSubImage2D(R.TEXTURE_2D,V,A.x,A.y,Ee,Ie,F.image),V===0&&G.generateMipmaps&&R.generateMipmap(R.TEXTURE_2D),q.unbindTexture()},this.copyTextureToTexture3D=function(A,F,G,V,B=0){if(_.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ve=A.max.x-A.min.x+1,Ee=A.max.y-A.min.y+1,Ie=A.max.z-A.min.z+1,Ne=ye.convert(V.format),We=ye.convert(V.type);let ke;if(V.isData3DTexture)b.setTexture3D(V,0),ke=R.TEXTURE_3D;else if(V.isDataArrayTexture||V.isCompressedArrayTexture)b.setTexture2DArray(V,0),ke=R.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,V.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,V.unpackAlignment);const ze=R.getParameter(R.UNPACK_ROW_LENGTH),ht=R.getParameter(R.UNPACK_IMAGE_HEIGHT),Ft=R.getParameter(R.UNPACK_SKIP_PIXELS),gt=R.getParameter(R.UNPACK_SKIP_ROWS),ri=R.getParameter(R.UNPACK_SKIP_IMAGES),rt=G.isCompressedTexture?G.mipmaps[B]:G.image;R.pixelStorei(R.UNPACK_ROW_LENGTH,rt.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,rt.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,A.min.x),R.pixelStorei(R.UNPACK_SKIP_ROWS,A.min.y),R.pixelStorei(R.UNPACK_SKIP_IMAGES,A.min.z),G.isDataTexture||G.isData3DTexture?R.texSubImage3D(ke,B,F.x,F.y,F.z,ve,Ee,Ie,Ne,We,rt.data):G.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),R.compressedTexSubImage3D(ke,B,F.x,F.y,F.z,ve,Ee,Ie,Ne,rt.data)):R.texSubImage3D(ke,B,F.x,F.y,F.z,ve,Ee,Ie,Ne,We,rt),R.pixelStorei(R.UNPACK_ROW_LENGTH,ze),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,ht),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Ft),R.pixelStorei(R.UNPACK_SKIP_ROWS,gt),R.pixelStorei(R.UNPACK_SKIP_IMAGES,ri),B===0&&V.generateMipmaps&&R.generateMipmap(ke),q.unbindTexture()},this.initTexture=function(A){A.isCubeTexture?b.setTextureCube(A,0):A.isData3DTexture?b.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?b.setTexture2DArray(A,0):b.setTexture2D(A,0),q.unbindTexture()},this.resetState=function(){L=0,P=0,C=null,q.reset(),Ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===ao?"display-p3":"srgb",t.unpackColorSpace=Ke.workingColorSpace===Js?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===dt?zi:Xl}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===zi?dt:gi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class tg extends dc{}tg.prototype.isWebGL1Renderer=!0;class ig extends xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class fo extends Xi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Oe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ka=new w,Qa=new w,el=new at,Ur=new Zs,Es=new Zn;class Kr extends xt{constructor(e=new St,t=new fo){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let n=1,r=t.count;n<r;n++)Ka.fromBufferAttribute(t,n-1),Qa.fromBufferAttribute(t,n),i[n]=i[n-1],i[n]+=Ka.distanceTo(Qa);e.setAttribute("lineDistance",new st(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,n=this.matrixWorld,r=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Es.copy(i.boundingSphere),Es.applyMatrix4(n),Es.radius+=r,e.ray.intersectsSphere(Es)===!1)return;el.copy(n).invert(),Ur.copy(e.ray).applyMatrix4(el);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new w,h=new w,u=new w,d=new w,f=this.isLineSegments?2:1,g=i.index,m=i.attributes.position;if(g!==null){const p=Math.max(0,o.start),M=Math.min(g.count,o.start+o.count);for(let _=p,T=M-1;_<T;_+=f){const L=g.getX(_),P=g.getX(_+1);if(c.fromBufferAttribute(m,L),h.fromBufferAttribute(m,P),Ur.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const N=e.ray.origin.distanceTo(d);N<e.near||N>e.far||t.push({distance:N,point:u.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,o.start),M=Math.min(m.count,o.start+o.count);for(let _=p,T=M-1;_<T;_+=f){if(c.fromBufferAttribute(m,_),h.fromBufferAttribute(m,_+1),Ur.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const P=e.ray.origin.distanceTo(d);P<e.near||P>e.far||t.push({distance:P,point:u.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=n.length;r<o;r++){const a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}class fc extends Xi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Oe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const tl=new at,Qr=new Zs,Ts=new Zn,As=new w;class ng extends xt{constructor(e=new St,t=new fc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,n=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ts.copy(i.boundingSphere),Ts.applyMatrix4(n),Ts.radius+=r,e.ray.intersectsSphere(Ts)===!1)return;tl.copy(n).invert(),Qr.copy(e.ray).applyMatrix4(tl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,u=i.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,v=f;g<v;g++){const m=c.getX(g);As.fromBufferAttribute(u,m),il(As,m,l,n,e,t,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,v=f;g<v;g++)As.fromBufferAttribute(u,g),il(As,g,l,n,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=n.length;r<o;r++){const a=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function il(s,e,t,i,n,r,o){const a=Qr.distanceSqToPoint(s);if(a<t){const l=new w;Qr.closestPointToPoint(s,l),l.applyMatrix4(i);const c=n.ray.origin.distanceTo(l);if(c<n.near||c>n.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class si{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,n=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),r+=i.distanceTo(n),t.push(r),n=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const i=this.getLengths();let n=0;const r=i.length;let o;t?o=t:o=e*i[r-1];let a=0,l=r-1,c;for(;a<=l;)if(n=Math.floor(a+(l-a)/2),c=i[n]-o,c<0)a=n+1;else if(c>0)l=n-1;else{l=n;break}if(n=l,i[n]===o)return n/(r-1);const h=i[n],d=i[n+1]-h,f=(o-h)/d;return(n+f)/(r-1)}getTangent(e,t){let n=e-1e-4,r=e+1e-4;n<0&&(n=0),r>1&&(r=1);const o=this.getPoint(n),a=this.getPoint(r),l=t||(o.isVector2?new re:new w);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){const i=new w,n=[],r=[],o=[],a=new w,l=new at;for(let f=0;f<=e;f++){const g=f/e;n[f]=this.getTangentAt(g,new w)}r[0]=new w,o[0]=new w;let c=Number.MAX_VALUE;const h=Math.abs(n[0].x),u=Math.abs(n[0].y),d=Math.abs(n[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),d<=c&&i.set(0,0,1),a.crossVectors(n[0],i).normalize(),r[0].crossVectors(n[0],a),o[0].crossVectors(n[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(n[f-1],n[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(yt(n[f-1].dot(n[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(n[f],r[f])}if(t===!0){let f=Math.acos(yt(r[0].dot(r[e]),-1,1));f/=e,n[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(n[g],f*g)),o[g].crossVectors(n[g],r[g])}return{tangents:n,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class po extends si{constructor(e=0,t=0,i=1,n=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=n,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t){const i=t||new re,n=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=n;for(;r>n;)r-=n;r<Number.EPSILON&&(o?r=0:r=n),this.aClockwise===!0&&!o&&(r===n?r=-n:r=r-n);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class sg extends po{constructor(e,t,i,n,r,o){super(e,t,i,i,n,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function mo(){let s=0,e=0,t=0,i=0;function n(r,o,a,l){s=r,e=a,t=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){n(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,n(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return s+e*r+t*o+i*a}}}const ws=new w,Nr=new mo,Fr=new mo,Or=new mo;class rg extends si{constructor(e=[],t=!1,i="centripetal",n=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=n}getPoint(e,t=new w){const i=t,n=this.points,r=n.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=n[(a-1)%r]:(ws.subVectors(n[0],n[1]).add(n[0]),c=ws);const u=n[a%r],d=n[(a+1)%r];if(this.closed||a+2<r?h=n[(a+2)%r]:(ws.subVectors(n[r-1],n[r-2]).add(n[r-1]),h=ws),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),Nr.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,v,m),Fr.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,v,m),Or.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(Nr.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Fr.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Or.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return i.set(Nr.calc(l),Fr.calc(l),Or.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const n=e.points[t];this.points.push(new w().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function nl(s,e,t,i,n){const r=(i-e)*.5,o=(n-t)*.5,a=s*s,l=s*a;return(2*t-2*i+r+o)*l+(-3*t+3*i-2*r-o)*a+r*s+t}function og(s,e){const t=1-s;return t*t*e}function ag(s,e){return 2*(1-s)*s*e}function lg(s,e){return s*s*e}function Fn(s,e,t,i){return og(s,e)+ag(s,t)+lg(s,i)}function cg(s,e){const t=1-s;return t*t*t*e}function hg(s,e){const t=1-s;return 3*t*t*s*e}function ug(s,e){return 3*(1-s)*s*s*e}function dg(s,e){return s*s*s*e}function On(s,e,t,i,n){return cg(s,e)+hg(s,t)+ug(s,i)+dg(s,n)}class pc extends si{constructor(e=new re,t=new re,i=new re,n=new re){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=n}getPoint(e,t=new re){const i=t,n=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(On(e,n.x,r.x,o.x,a.x),On(e,n.y,r.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class fg extends si{constructor(e=new w,t=new w,i=new w,n=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=n}getPoint(e,t=new w){const i=t,n=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(On(e,n.x,r.x,o.x,a.x),On(e,n.y,r.y,o.y,a.y),On(e,n.z,r.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class mc extends si{constructor(e=new re,t=new re){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new re){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new re){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class pg extends si{constructor(e=new w,t=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class gc extends si{constructor(e=new re,t=new re,i=new re){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new re){const i=t,n=this.v0,r=this.v1,o=this.v2;return i.set(Fn(e,n.x,r.x,o.x),Fn(e,n.y,r.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class mg extends si{constructor(e=new w,t=new w,i=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new w){const i=t,n=this.v0,r=this.v1,o=this.v2;return i.set(Fn(e,n.x,r.x,o.x),Fn(e,n.y,r.y,o.y),Fn(e,n.z,r.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class _c extends si{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new re){const i=t,n=this.points,r=(n.length-1)*e,o=Math.floor(r),a=r-o,l=n[o===0?o:o-1],c=n[o],h=n[o>n.length-2?n.length-1:o+1],u=n[o>n.length-3?n.length-1:o+2];return i.set(nl(a,l.x,c.x,h.x,u.x),nl(a,l.y,c.y,h.y,u.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const n=e.points[t];this.points.push(n.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const n=e.points[t];this.points.push(new re().fromArray(n))}return this}}var eo=Object.freeze({__proto__:null,ArcCurve:sg,CatmullRomCurve3:rg,CubicBezierCurve:pc,CubicBezierCurve3:fg,EllipseCurve:po,LineCurve:mc,LineCurve3:pg,QuadraticBezierCurve:gc,QuadraticBezierCurve3:mg,SplineCurve:_c});class gg extends si{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new eo[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),n=this.getCurveLengths();let r=0;for(;r<n.length;){if(n[r]>=i){const o=n[r]-i,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,n=this.curves.length;i<n;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let n=0,r=this.curves;n<r.length;n++){const o=r[n],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];i&&i.equals(h)||(t.push(h),i=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const n=e.curves[t];this.curves.push(new eo[n.type]().fromJSON(n))}return this}}class sl extends gg{constructor(e){super(),this.type="Path",this.currentPoint=new re,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new mc(this.currentPoint.clone(),new re(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,n){const r=new gc(this.currentPoint.clone(),new re(e,t),new re(i,n));return this.curves.push(r),this.currentPoint.set(i,n),this}bezierCurveTo(e,t,i,n,r,o){const a=new pc(this.currentPoint.clone(),new re(e,t),new re(i,n),new re(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new _c(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,n,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,i,n,r,o),this}absarc(e,t,i,n,r,o){return this.absellipse(e,t,i,i,n,r,o),this}ellipse(e,t,i,n,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,i,n,r,o,a,l),this}absellipse(e,t,i,n,r,o,a,l){const c=new po(e,t,i,n,r,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class go extends St{constructor(e=1,t=1,i=1,n=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:n,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;n=Math.floor(n),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const v=[],m=i/2;let p=0;M(),o===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new st(u,3)),this.setAttribute("normal",new st(d,3)),this.setAttribute("uv",new st(f,2));function M(){const T=new w,L=new w;let P=0;const C=(t-e)/i;for(let N=0;N<=r;N++){const S=[],E=N/r,U=E*(t-e)+e;for(let z=0;z<=n;z++){const K=z/n,I=K*l+a,O=Math.sin(I),H=Math.cos(I);L.x=U*O,L.y=-E*i+m,L.z=U*H,u.push(L.x,L.y,L.z),T.set(O,C,H).normalize(),d.push(T.x,T.y,T.z),f.push(K,1-E),S.push(g++)}v.push(S)}for(let N=0;N<n;N++)for(let S=0;S<r;S++){const E=v[S][N],U=v[S+1][N],z=v[S+1][N+1],K=v[S][N+1];h.push(E,U,K),h.push(U,z,K),P+=6}c.addGroup(p,P,0),p+=P}function _(T){const L=g,P=new re,C=new w;let N=0;const S=T===!0?e:t,E=T===!0?1:-1;for(let z=1;z<=n;z++)u.push(0,m*E,0),d.push(0,E,0),f.push(.5,.5),g++;const U=g;for(let z=0;z<=n;z++){const I=z/n*l+a,O=Math.cos(I),H=Math.sin(I);C.x=S*H,C.y=m*E,C.z=S*O,u.push(C.x,C.y,C.z),d.push(0,E,0),P.x=O*.5+.5,P.y=H*.5*E+.5,f.push(P.x,P.y),g++}for(let z=0;z<n;z++){const K=L+z,I=U+z;T===!0?h.push(I,I+1,K):h.push(I+1,I,K),N+=3}c.addGroup(p,N,T===!0?1:2),p+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new go(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class _o extends go{constructor(e=1,t=1,i=32,n=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,i,n,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:n,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new _o(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Qs extends St{constructor(e=[],t=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:n};const r=[],o=[];a(n),c(i),h(),this.setAttribute("position",new st(r,3)),this.setAttribute("normal",new st(r.slice(),3)),this.setAttribute("uv",new st(o,2)),n===0?this.computeVertexNormals():this.normalizeNormals();function a(M){const _=new w,T=new w,L=new w;for(let P=0;P<t.length;P+=3)f(t[P+0],_),f(t[P+1],T),f(t[P+2],L),l(_,T,L,M)}function l(M,_,T,L){const P=L+1,C=[];for(let N=0;N<=P;N++){C[N]=[];const S=M.clone().lerp(T,N/P),E=_.clone().lerp(T,N/P),U=P-N;for(let z=0;z<=U;z++)z===0&&N===P?C[N][z]=S:C[N][z]=S.clone().lerp(E,z/U)}for(let N=0;N<P;N++)for(let S=0;S<2*(P-N)-1;S++){const E=Math.floor(S/2);S%2===0?(d(C[N][E+1]),d(C[N+1][E]),d(C[N][E])):(d(C[N][E+1]),d(C[N+1][E+1]),d(C[N+1][E]))}}function c(M){const _=new w;for(let T=0;T<r.length;T+=3)_.x=r[T+0],_.y=r[T+1],_.z=r[T+2],_.normalize().multiplyScalar(M),r[T+0]=_.x,r[T+1]=_.y,r[T+2]=_.z}function h(){const M=new w;for(let _=0;_<r.length;_+=3){M.x=r[_+0],M.y=r[_+1],M.z=r[_+2];const T=m(M)/2/Math.PI+.5,L=p(M)/Math.PI+.5;o.push(T,1-L)}g(),u()}function u(){for(let M=0;M<o.length;M+=6){const _=o[M+0],T=o[M+2],L=o[M+4],P=Math.max(_,T,L),C=Math.min(_,T,L);P>.9&&C<.1&&(_<.2&&(o[M+0]+=1),T<.2&&(o[M+2]+=1),L<.2&&(o[M+4]+=1))}}function d(M){r.push(M.x,M.y,M.z)}function f(M,_){const T=M*3;_.x=e[T+0],_.y=e[T+1],_.z=e[T+2]}function g(){const M=new w,_=new w,T=new w,L=new w,P=new re,C=new re,N=new re;for(let S=0,E=0;S<r.length;S+=9,E+=6){M.set(r[S+0],r[S+1],r[S+2]),_.set(r[S+3],r[S+4],r[S+5]),T.set(r[S+6],r[S+7],r[S+8]),P.set(o[E+0],o[E+1]),C.set(o[E+2],o[E+3]),N.set(o[E+4],o[E+5]),L.copy(M).add(_).add(T).divideScalar(3);const U=m(L);v(P,E+0,M,U),v(C,E+2,_,U),v(N,E+4,T,U)}}function v(M,_,T,L){L<0&&M.x===1&&(o[_]=M.x-1),T.x===0&&T.z===0&&(o[_]=L/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qs(e.vertices,e.indices,e.radius,e.details)}}class vc extends sl{constructor(e){super(e),this.uuid=Wi(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,n=this.holes.length;i<n;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const n=e.holes[t];this.holes.push(new sl().fromJSON(n))}return this}}const _g={triangulate:function(s,e,t=2){const i=e&&e.length,n=i?e[0]*t:s.length;let r=xc(s,0,n,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c,h,u,d,f;if(i&&(r=Mg(s,e,r,t)),s.length>80*t){a=c=s[0],l=h=s[1];for(let g=t;g<n;g+=t)u=s[g],d=s[g+1],u<a&&(a=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-a,h-l),f=f!==0?32767/f:0}return Xn(r,o,t,a,l,f,0),o}};function xc(s,e,t,i,n){let r,o;if(n===Dg(s,e,t,i)>0)for(r=e;r<t;r+=i)o=rl(r,s[r],s[r+1],o);else for(r=t-i;r>=e;r-=i)o=rl(r,s[r],s[r+1],o);return o&&er(o,o.next)&&(jn(o),o=o.next),o}function Hi(s,e){if(!s)return s;e||(e=s);let t=s,i;do if(i=!1,!t.steiner&&(er(t,t.next)||ot(t.prev,t,t.next)===0)){if(jn(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function Xn(s,e,t,i,n,r,o){if(!s)return;!o&&r&&wg(s,i,n,r);let a=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?xg(s,i,n,r):vg(s)){e.push(l.i/t|0),e.push(s.i/t|0),e.push(c.i/t|0),jn(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=yg(Hi(s),e,t),Xn(s,e,t,i,n,r,2)):o===2&&Sg(s,e,t,i,n,r):Xn(Hi(s),e,t,i,n,r,1);break}}}function vg(s){const e=s.prev,t=s,i=s.next;if(ot(e,t,i)>=0)return!1;const n=e.x,r=t.x,o=i.x,a=e.y,l=t.y,c=i.y,h=n<r?n<o?n:o:r<o?r:o,u=a<l?a<c?a:c:l<c?l:c,d=n>r?n>o?n:o:r>o?r:o,f=a>l?a>c?a:c:l>c?l:c;let g=i.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&mn(n,a,r,l,o,c,g.x,g.y)&&ot(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function xg(s,e,t,i){const n=s.prev,r=s,o=s.next;if(ot(n,r,o)>=0)return!1;const a=n.x,l=r.x,c=o.x,h=n.y,u=r.y,d=o.y,f=a<l?a<c?a:c:l<c?l:c,g=h<u?h<d?h:d:u<d?u:d,v=a>l?a>c?a:c:l>c?l:c,m=h>u?h>d?h:d:u>d?u:d,p=to(f,g,e,t,i),M=to(v,m,e,t,i);let _=s.prevZ,T=s.nextZ;for(;_&&_.z>=p&&T&&T.z<=M;){if(_.x>=f&&_.x<=v&&_.y>=g&&_.y<=m&&_!==n&&_!==o&&mn(a,h,l,u,c,d,_.x,_.y)&&ot(_.prev,_,_.next)>=0||(_=_.prevZ,T.x>=f&&T.x<=v&&T.y>=g&&T.y<=m&&T!==n&&T!==o&&mn(a,h,l,u,c,d,T.x,T.y)&&ot(T.prev,T,T.next)>=0))return!1;T=T.nextZ}for(;_&&_.z>=p;){if(_.x>=f&&_.x<=v&&_.y>=g&&_.y<=m&&_!==n&&_!==o&&mn(a,h,l,u,c,d,_.x,_.y)&&ot(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;T&&T.z<=M;){if(T.x>=f&&T.x<=v&&T.y>=g&&T.y<=m&&T!==n&&T!==o&&mn(a,h,l,u,c,d,T.x,T.y)&&ot(T.prev,T,T.next)>=0)return!1;T=T.nextZ}return!0}function yg(s,e,t){let i=s;do{const n=i.prev,r=i.next.next;!er(n,r)&&yc(n,i,i.next,r)&&qn(n,r)&&qn(r,n)&&(e.push(n.i/t|0),e.push(i.i/t|0),e.push(r.i/t|0),jn(i),jn(i.next),i=s=r),i=i.next}while(i!==s);return Hi(i)}function Sg(s,e,t,i,n,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Rg(o,a)){let l=Sc(o,a);o=Hi(o,o.next),l=Hi(l,l.next),Xn(o,e,t,i,n,r,0),Xn(l,e,t,i,n,r,0);return}a=a.next}o=o.next}while(o!==s)}function Mg(s,e,t,i){const n=[];let r,o,a,l,c;for(r=0,o=e.length;r<o;r++)a=e[r]*i,l=r<o-1?e[r+1]*i:s.length,c=xc(s,a,l,i,!1),c===c.next&&(c.steiner=!0),n.push(Cg(c));for(n.sort(bg),r=0;r<n.length;r++)t=Eg(n[r],t);return t}function bg(s,e){return s.x-e.x}function Eg(s,e){const t=Tg(s,e);if(!t)return e;const i=Sc(t,s);return Hi(i,i.next),Hi(t,t.next)}function Tg(s,e){let t=e,i=-1/0,n;const r=s.x,o=s.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const d=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=r&&d>i&&(i=d,n=t.x<t.next.x?t:t.next,d===r))return n}t=t.next}while(t!==e);if(!n)return null;const a=n,l=n.x,c=n.y;let h=1/0,u;t=n;do r>=t.x&&t.x>=l&&r!==t.x&&mn(o<c?r:i,o,l,c,o<c?i:r,o,t.x,t.y)&&(u=Math.abs(o-t.y)/(r-t.x),qn(t,s)&&(u<h||u===h&&(t.x>n.x||t.x===n.x&&Ag(n,t)))&&(n=t,h=u)),t=t.next;while(t!==a);return n}function Ag(s,e){return ot(s.prev,s,e.prev)<0&&ot(e.next,s,s.next)<0}function wg(s,e,t,i){let n=s;do n.z===0&&(n.z=to(n.x,n.y,e,t,i)),n.prevZ=n.prev,n.nextZ=n.next,n=n.next;while(n!==s);n.prevZ.nextZ=null,n.prevZ=null,Pg(n)}function Pg(s){let e,t,i,n,r,o,a,l,c=1;do{for(t=s,s=null,r=null,o=0;t;){for(o++,i=t,a=0,e=0;e<c&&(a++,i=i.nextZ,!!i);e++);for(l=c;a>0||l>0&&i;)a!==0&&(l===0||!i||t.z<=i.z)?(n=t,t=t.nextZ,a--):(n=i,i=i.nextZ,l--),r?r.nextZ=n:s=n,n.prevZ=r,r=n;t=i}r.nextZ=null,c*=2}while(o>1);return s}function to(s,e,t,i,n){return s=(s-t)*n|0,e=(e-i)*n|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function Cg(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function mn(s,e,t,i,n,r,o,a){return(n-o)*(e-a)>=(s-o)*(r-a)&&(s-o)*(i-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(n-o)*(i-a)}function Rg(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!Lg(s,e)&&(qn(s,e)&&qn(e,s)&&Ig(s,e)&&(ot(s.prev,s,e.prev)||ot(s,e.prev,e))||er(s,e)&&ot(s.prev,s,s.next)>0&&ot(e.prev,e,e.next)>0)}function ot(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function er(s,e){return s.x===e.x&&s.y===e.y}function yc(s,e,t,i){const n=Cs(ot(s,e,t)),r=Cs(ot(s,e,i)),o=Cs(ot(t,i,s)),a=Cs(ot(t,i,e));return!!(n!==r&&o!==a||n===0&&Ps(s,t,e)||r===0&&Ps(s,i,e)||o===0&&Ps(t,s,i)||a===0&&Ps(t,e,i))}function Ps(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function Cs(s){return s>0?1:s<0?-1:0}function Lg(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&yc(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function qn(s,e){return ot(s.prev,s,s.next)<0?ot(s,e,s.next)>=0&&ot(s,s.prev,e)>=0:ot(s,e,s.prev)<0||ot(s,s.next,e)<0}function Ig(s,e){let t=s,i=!1;const n=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&n<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==s);return i}function Sc(s,e){const t=new io(s.i,s.x,s.y),i=new io(e.i,e.x,e.y),n=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=n,n.prev=t,i.next=t,t.prev=i,r.next=i,i.prev=r,i}function rl(s,e,t,i){const n=new io(s,e,t);return i?(n.next=i.next,n.prev=i,i.next.prev=n,i.next=n):(n.prev=n,n.next=n),n}function jn(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function io(s,e,t){this.i=s,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Dg(s,e,t,i){let n=0;for(let r=e,o=t-i;r<t;r+=i)n+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return n}class kn{static area(e){const t=e.length;let i=0;for(let n=t-1,r=0;r<t;n=r++)i+=e[n].x*e[r].y-e[r].x*e[n].y;return i*.5}static isClockWise(e){return kn.area(e)<0}static triangulateShape(e,t){const i=[],n=[],r=[];ol(e),al(i,e);let o=e.length;t.forEach(ol);for(let l=0;l<t.length;l++)n.push(o),o+=t[l].length,al(i,t[l]);const a=_g.triangulate(i,n);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function ol(s){const e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function al(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}class vo extends St{constructor(e=new vc([new re(.5,.5),new re(-.5,.5),new re(-.5,-.5),new re(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const i=this,n=[],r=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new st(n,3)),this.setAttribute("uv",new st(r,2)),this.computeVertexNormals();function o(a){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,M=t.UVGenerator!==void 0?t.UVGenerator:Ug;let _,T=!1,L,P,C,N;p&&(_=p.getSpacedPoints(h),T=!0,d=!1,L=p.computeFrenetFrames(h,!1),P=new w,C=new w,N=new w),d||(m=0,f=0,g=0,v=0);const S=a.extractPoints(c);let E=S.shape;const U=S.holes;if(!kn.isClockWise(E)){E=E.reverse();for(let R=0,le=U.length;R<le;R++){const j=U[R];kn.isClockWise(j)&&(U[R]=j.reverse())}}const K=kn.triangulateShape(E,U),I=E;for(let R=0,le=U.length;R<le;R++){const j=U[R];E=E.concat(j)}function O(R,le,j){return le||console.error("THREE.ExtrudeGeometry: vec does not exist"),R.clone().addScaledVector(le,j)}const H=E.length,J=K.length;function Y(R,le,j){let oe,q,Te;const ge=R.x-le.x,b=R.y-le.y,x=j.x-R.x,k=j.y-R.y,se=ge*ge+b*b,ie=ge*k-b*x;if(Math.abs(ie)>Number.EPSILON){const te=Math.sqrt(se),Me=Math.sqrt(x*x+k*k),de=le.x-b/te,xe=le.y+ge/te,Ce=j.x-k/Me,Be=j.y+x/Me,ne=((Ce-de)*k-(Be-xe)*x)/(ge*k-b*x);oe=de+ge*ne-R.x,q=xe+b*ne-R.y;const Je=oe*oe+q*q;if(Je<=2)return new re(oe,q);Te=Math.sqrt(Je/2)}else{let te=!1;ge>Number.EPSILON?x>Number.EPSILON&&(te=!0):ge<-Number.EPSILON?x<-Number.EPSILON&&(te=!0):Math.sign(b)===Math.sign(k)&&(te=!0),te?(oe=-b,q=ge,Te=Math.sqrt(se)):(oe=ge,q=b,Te=Math.sqrt(se/2))}return new re(oe/Te,q/Te)}const X=[];for(let R=0,le=I.length,j=le-1,oe=R+1;R<le;R++,j++,oe++)j===le&&(j=0),oe===le&&(oe=0),X[R]=Y(I[R],I[j],I[oe]);const Q=[];let ee,ue=X.concat();for(let R=0,le=U.length;R<le;R++){const j=U[R];ee=[];for(let oe=0,q=j.length,Te=q-1,ge=oe+1;oe<q;oe++,Te++,ge++)Te===q&&(Te=0),ge===q&&(ge=0),ee[oe]=Y(j[oe],j[Te],j[ge]);Q.push(ee),ue=ue.concat(ee)}for(let R=0;R<m;R++){const le=R/m,j=f*Math.cos(le*Math.PI/2),oe=g*Math.sin(le*Math.PI/2)+v;for(let q=0,Te=I.length;q<Te;q++){const ge=O(I[q],X[q],oe);_e(ge.x,ge.y,-j)}for(let q=0,Te=U.length;q<Te;q++){const ge=U[q];ee=Q[q];for(let b=0,x=ge.length;b<x;b++){const k=O(ge[b],ee[b],oe);_e(k.x,k.y,-j)}}}const W=g+v;for(let R=0;R<H;R++){const le=d?O(E[R],ue[R],W):E[R];T?(C.copy(L.normals[0]).multiplyScalar(le.x),P.copy(L.binormals[0]).multiplyScalar(le.y),N.copy(_[0]).add(C).add(P),_e(N.x,N.y,N.z)):_e(le.x,le.y,0)}for(let R=1;R<=h;R++)for(let le=0;le<H;le++){const j=d?O(E[le],ue[le],W):E[le];T?(C.copy(L.normals[R]).multiplyScalar(j.x),P.copy(L.binormals[R]).multiplyScalar(j.y),N.copy(_[R]).add(C).add(P),_e(N.x,N.y,N.z)):_e(j.x,j.y,u/h*R)}for(let R=m-1;R>=0;R--){const le=R/m,j=f*Math.cos(le*Math.PI/2),oe=g*Math.sin(le*Math.PI/2)+v;for(let q=0,Te=I.length;q<Te;q++){const ge=O(I[q],X[q],oe);_e(ge.x,ge.y,u+j)}for(let q=0,Te=U.length;q<Te;q++){const ge=U[q];ee=Q[q];for(let b=0,x=ge.length;b<x;b++){const k=O(ge[b],ee[b],oe);T?_e(k.x,k.y+_[h-1].y,_[h-1].x+j):_e(k.x,k.y,u+j)}}}$(),fe();function $(){const R=n.length/3;if(d){let le=0,j=H*le;for(let oe=0;oe<J;oe++){const q=K[oe];Pe(q[2]+j,q[1]+j,q[0]+j)}le=h+m*2,j=H*le;for(let oe=0;oe<J;oe++){const q=K[oe];Pe(q[0]+j,q[1]+j,q[2]+j)}}else{for(let le=0;le<J;le++){const j=K[le];Pe(j[2],j[1],j[0])}for(let le=0;le<J;le++){const j=K[le];Pe(j[0]+H*h,j[1]+H*h,j[2]+H*h)}}i.addGroup(R,n.length/3-R,0)}function fe(){const R=n.length/3;let le=0;Se(I,le),le+=I.length;for(let j=0,oe=U.length;j<oe;j++){const q=U[j];Se(q,le),le+=q.length}i.addGroup(R,n.length/3-R,1)}function Se(R,le){let j=R.length;for(;--j>=0;){const oe=j;let q=j-1;q<0&&(q=R.length-1);for(let Te=0,ge=h+m*2;Te<ge;Te++){const b=H*Te,x=H*(Te+1),k=le+oe+b,se=le+q+b,ie=le+q+x,te=le+oe+x;Ue(k,se,ie,te)}}}function _e(R,le,j){l.push(R),l.push(le),l.push(j)}function Pe(R,le,j){ae(R),ae(le),ae(j);const oe=n.length/3,q=M.generateTopUV(i,n,oe-3,oe-2,oe-1);Le(q[0]),Le(q[1]),Le(q[2])}function Ue(R,le,j,oe){ae(R),ae(le),ae(oe),ae(le),ae(j),ae(oe);const q=n.length/3,Te=M.generateSideWallUV(i,n,q-6,q-3,q-2,q-1);Le(Te[0]),Le(Te[1]),Le(Te[3]),Le(Te[1]),Le(Te[2]),Le(Te[3])}function ae(R){n.push(l[R*3+0]),n.push(l[R*3+1]),n.push(l[R*3+2])}function Le(R){r.push(R.x),r.push(R.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return Ng(t,i,e)}static fromJSON(e,t){const i=[];for(let r=0,o=e.shapes.length;r<o;r++){const a=t[e.shapes[r]];i.push(a)}const n=e.options.extrudePath;return n!==void 0&&(e.options.extrudePath=new eo[n.type]().fromJSON(n)),new vo(i,e.options)}}const Ug={generateTopUV:function(s,e,t,i,n){const r=e[t*3],o=e[t*3+1],a=e[i*3],l=e[i*3+1],c=e[n*3],h=e[n*3+1];return[new re(r,o),new re(a,l),new re(c,h)]},generateSideWallUV:function(s,e,t,i,n,r){const o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[i*3],h=e[i*3+1],u=e[i*3+2],d=e[n*3],f=e[n*3+1],g=e[n*3+2],v=e[r*3],m=e[r*3+1],p=e[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new re(o,1-l),new re(c,1-u),new re(d,1-g),new re(v,1-p)]:[new re(a,1-l),new re(h,1-u),new re(f,1-g),new re(m,1-p)]}};function Ng(s,e,t){if(t.shapes=[],Array.isArray(s))for(let i=0,n=s.length;i<n;i++){const r=s[i];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Qn extends Qs{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,n=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(n,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Qn(e.radius,e.detail)}}class xo extends Qs{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],n=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,n,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new xo(e.radius,e.detail)}}class Xs extends St{constructor(e=.5,t=1,i=32,n=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:n,thetaStart:r,thetaLength:o},i=Math.max(3,i),n=Math.max(1,n);const a=[],l=[],c=[],h=[];let u=e;const d=(t-e)/n,f=new w,g=new re;for(let v=0;v<=n;v++){for(let m=0;m<=i;m++){const p=r+m/i*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let v=0;v<n;v++){const m=v*(i+1);for(let p=0;p<i;p++){const M=p+m,_=M,T=M+i+1,L=M+i+2,P=M+1;a.push(_,T,P),a.push(T,L,P)}}this.setIndex(a),this.setAttribute("position",new st(l,3)),this.setAttribute("normal",new st(c,3)),this.setAttribute("uv",new st(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xs(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class yo extends St{constructor(e=1,t=32,i=16,n=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:n,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new w,d=new w,f=[],g=[],v=[],m=[];for(let p=0;p<=i;p++){const M=[],_=p/i;let T=0;p===0&&o===0?T=.5/t:p===i&&l===Math.PI&&(T=-.5/t);for(let L=0;L<=t;L++){const P=L/t;u.x=-e*Math.cos(n+P*r)*Math.sin(o+_*a),u.y=e*Math.cos(o+_*a),u.z=e*Math.sin(n+P*r)*Math.sin(o+_*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),m.push(P+T,1-_),M.push(c++)}h.push(M)}for(let p=0;p<i;p++)for(let M=0;M<t;M++){const _=h[p][M+1],T=h[p][M],L=h[p+1][M],P=h[p+1][M+1];(p!==0||o>0)&&f.push(_,T,P),(p!==i-1||l<Math.PI)&&f.push(T,L,P)}this.setIndex(f),this.setAttribute("position",new st(g,3)),this.setAttribute("normal",new st(v,3)),this.setAttribute("uv",new st(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yo(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Fg extends Xi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Oe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ql,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const ll={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class Og{constructor(e,t,i){const n=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(h){a++,r===!1&&n.onStart!==void 0&&n.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,n.onProgress!==void 0&&n.onProgress(h,o,a),o===a&&(r=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(h){n.onError!==void 0&&n.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const kg=new Og;class So{constructor(e){this.manager=e!==void 0?e:kg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(n,r){i.load(e,n,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}So.DEFAULT_MATERIAL_NAME="__DEFAULT";class Bg extends So{constructor(e){super(e)}load(e,t,i,n){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=ll.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=Wn("img");function l(){h(),ll.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(u){h(),n&&n(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class Mc extends So{constructor(e){super(e)}load(e,t,i,n){const r=new Nt,o=new Bg(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},i,n),r}}class Mo extends xt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Oe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const kr=new at,cl=new w,hl=new w;class bc{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new re(512,512),this.map=null,this.mapPass=null,this.matrix=new at,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ho,this._frameExtents=new re(1,1),this._viewportCount=1,this._viewports=[new nt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;cl.setFromMatrixPosition(e.matrixWorld),t.position.copy(cl),hl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(hl),t.updateMatrixWorld(),kr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(kr),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(kr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ul=new at,Cn=new w,Br=new w;class zg extends bc{constructor(){super(new Bt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new re(4,2),this._viewportCount=6,this._viewports=[new nt(2,1,1,1),new nt(0,1,1,1),new nt(3,1,1,1),new nt(1,1,1,1),new nt(3,0,1,1),new nt(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,n=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),Cn.setFromMatrixPosition(e.matrixWorld),i.position.copy(Cn),Br.copy(i.position),Br.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Br),i.updateMatrixWorld(),n.makeTranslation(-Cn.x,-Cn.y,-Cn.z),ul.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ul)}}class Gg extends Mo{constructor(e,t,i=0,n=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new zg}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Vg extends bc{constructor(){super(new rc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Hg extends Mo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.target=new xt,this.shadow=new Vg}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Wg extends Mo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Xg{constructor(e,t,i=0,n=1/0){this.ray=new Zs(e,t),this.near=i,this.far=n,this.camera=null,this.layers=new co,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,i=[]){return no(e,this,i,t),i.sort(dl),i}intersectObjects(e,t=!0,i=[]){for(let n=0,r=e.length;n<r;n++)no(e[n],this,i,t);return i.sort(dl),i}}function dl(s,e){return s.distance-e.distance}function no(s,e,t,i){if(s.layers.test(e.layers)&&s.raycast(e,t),i===!0){const n=s.children;for(let r=0,o=n.length;r<o;r++)no(n[r],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ro}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ro);const fl=[{x:0,y:0,z:0},{x:-2.7,y:3.6,z:1.7},{x:-1.3,y:1.75,z:.8},{x:2.7,y:3.6,z:-1.7},{x:1.3,y:1.75,z:-.8},{x:-2.7,y:-3.6,z:-1.7},{x:-1.3,y:-1.75,z:-.8},{x:2.7,y:-3.6,z:1.7},{x:1.3,y:-1.75,z:.8},{x:0,y:-4.35,z:.15}],pl=[{x:0,y:0,z:0},{x:-4.8,y:6.1,z:3.4},{x:-2.15,y:2.95,z:1.55},{x:4.8,y:6.1,z:-3.4},{x:2.15,y:2.95,z:-1.55},{x:-4.8,y:-6.1,z:-3.4},{x:-2.15,y:-2.95,z:-1.55},{x:4.8,y:-6.1,z:3.4},{x:2.15,y:-2.95,z:1.55},{x:0,y:-5.05,z:.2}];function qg(s,e){return s===0?"presentation":s===e-1?"hint":"project"}function jg(s){return fl[s]||fl[0]}function Yg(s){return pl[s]||pl[0]}const Jg=[{id:1,activeFacette:0,date:"2024-03",facettes:[{id:1,images:["assets/images/projects/intro.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:"https://github.com/orgs/ApeProd",demo:null,video:null},featured:!1},{id:3,images:["assets/images/projects/Imageprofile.png"],links:{github:null,demo:null,video:null},featured:!1}]},{id:2,activeFacette:0,date:"2024-02",facettes:[{id:1,images:["assets/images/projects/TonoIntro.png"],links:{github:"https://github.com/bheall/Tono_Discord_Bot",demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:3,activeFacette:0,date:"2024-01",facettes:[{id:1,images:["assets/images/projects/Davinciintro.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:4,activeFacette:0,date:"2023-12",facettes:[{id:1,images:[],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:5,activeFacette:0,date:"2023-11",facettes:[{id:1,images:["assets/images/projects/Introia.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:6,activeFacette:0,date:"2023-10",facettes:[{id:1,images:["assets/images/projects/Discordintro.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:7,activeFacette:0,date:"2023-09",facettes:[{id:1,images:["assets/images/projects/placeholder.svg"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:["assets/images/projects/placeholder.svg"],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:["assets/images/projects/placeholder.svg"],links:{github:null,demo:null,video:null},featured:!1}]},{id:8,activeFacette:0,date:"2023-08",facettes:[{id:1,images:["assets/images/projects/Spine.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:9,activeFacette:0,date:"2023-07",facettes:[{id:1,images:["assets/images/projects/Conception.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:10,activeFacette:0,date:"2023-06",facettes:[{id:1,images:[],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]}],Ec={fr:[{id:1,title:"PRÉSENTATION",facettes:[{category:"presentation",longDescription:"On dit souvent qu'un restaurant avec une carte trop fournie peine à exceller dans chaque plat. Ape Prod propose plusieurs services MAIS qui convergent vers une seule spécialité : le design et le brainstorming de projets. Direction artistique, identité visuelle, game design, prototypage technique et scénarisation — chaque compétence sert un objectif commun : transformer vos idées en concepts solides à votre image et innovants.",technologies:["Direction Artistique","Conception","Stratégie Créative","Innovation","Vision Globale"]},{category:"services",longDescription:`Designer polyvalent, je travaille avec de nombreux logiciels pour donner vie à mes idées et créer des DA et designs adaptés à n'importe quel projet. Ma valeur ajoutée réside dans ma polyvalence — sans être un expert de chaque domaine — qui me permet de créer des prototypes précis facilement reprenables et améliorables.

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

Together, we won't create just another project. We'll create THE project that makes the difference.`,technologies:["Innovation","Strategic Creativity","Impact","Excellence","Difference"]}]}]},Zg={1:{dark:"assets/images/Logo/logomodedark.svg",light:"assets/images/Logo/logomodelight.svg",scale:.7,opacity:1},2:{dark:"assets/images/Logo/logomodedark.svg",light:"assets/images/Logo/logomodelight.svg",scale:.7,opacity:1},3:{dark:"assets/images/Logo/DavinciLogoDark.svg",light:"assets/images/Logo/DavinciLogoLight.svg",scale:.7,opacity:1},4:{dark:"assets/images/Logo/MovieLogoDark.svg",light:"assets/images/Logo/MovieLogoLight.svg",scale:.7,opacity:1},5:{dark:"assets/images/Logo/IALogoDark.svg",light:"assets/images/Logo/IALogoLight.svg",scale:.7,opacity:1},6:{dark:"assets/images/Logo/DiscordLogoDark.svg",light:"assets/images/Logo/DiscordLogoLight.svg",scale:.7,opacity:1},7:{dark:"assets/images/Logo/AffinityLogoDark.svg",light:"assets/images/Logo/AffinityLogoLight.svg",scale:.7,opacity:1},8:{dark:"assets/images/Logo/SpineLogoDark.svg",light:"assets/images/Logo/SpineLogoLight.svg",scale:.7,opacity:1},9:{dark:"assets/images/Logo/logomodedark.svg",light:"assets/images/Logo/logomodelight.svg",scale:.7,opacity:1},10:{dark:"assets/images/Logo/logomodedark.svg",light:"assets/images/Logo/logomodelight.svg",scale:.7,opacity:1}},Rs={dark:"/assets/images/Logo/logomodedark.svg",light:"/assets/images/Logo/logomodelight.svg",scale:.7,opacity:1},$g={presentation:{fr:"Présentation",en:"Introduction"},services:{fr:"Services",en:"Services"},about:{fr:"À propos",en:"About"},dev:{fr:"Développement",en:"Development"},video:{fr:"Vidéo",en:"Video"},tech:{fr:"IA & technique",en:"AI & tech"},design:{fr:"Design",en:"Design"},gamedesign:{fr:"Game design",en:"Game design"},business:{fr:"Stratégie",en:"Strategy"}};function Kg(s){return{github:(s==null?void 0:s.github)||null,demo:(s==null?void 0:s.demo)||null,video:(s==null?void 0:s.video)||null}}function Qg(s,e,t,i){const n=e.category,r=$g[n]||{fr:n,en:t.category||n};return{id:s,categoryKey:n,categoryLabel:r,description:{fr:e.longDescription,en:t.longDescription},technologies:e.technologies.map((o,a)=>({fr:o,en:t.technologies[a]||o})),images:i.images?i.images.map(o=>`/${o}`):[],links:Kg(i.links),featured:!!i.featured}}function e_(s){const t=Zg[String(s)]||{};return{dark:t.dark?`/${t.dark}`:Rs.dark,light:t.light?`/${t.light}`:Rs.light,scale:typeof t.scale=="number"?t.scale:Rs.scale,opacity:typeof t.opacity=="number"?t.opacity:Rs.opacity}}const ml=Jg,t_=Ec.fr,i_=Ec.en,n_=ml.map((s,e)=>{const t=t_[e],i=i_[e],n=qg(e,ml.length),r=s.facettes.map((o,a)=>Qg(a,t.facettes[a],i.facettes[a],o));return{id:`shard-${s.id}`,numericId:s.id,order:e,role:n,date:s.date,title:{fr:n==="hint"?"INDICE":t.title,en:n==="hint"?"HINT":i.title},logo:e_(s.id),facets:n==="hint"?[{...r[0],categoryKey:"hint",categoryLabel:{fr:"Indice",en:"Hint"},description:{fr:"Tous les fragments n’attendent pas le focus. Certains veulent retrouver une forme précise. Observe le X, puis ce point sous sa blessure centrale.",en:"Not every fragment wants focus. Some want to recover a precise form. Watch the X, then the dot below its central wound."},technologies:[{fr:"Mystère",en:"Mystery"},{fr:"Placement",en:"Placement"},{fr:"Transformation",en:"Transformation"},{fr:"Jeu caché",en:"Hidden game"},{fr:"Clé d’accès",en:"Access key"}]},{...r[1],categoryKey:"hint",categoryLabel:{fr:"Accès",en:"Access"},description:{fr:"Quand chaque shard rejoint son empreinte, le monde cesse d’être un portfolio et bascule vers une autre règle.",en:"When every shard reaches its imprint, the world stops being a portfolio and switches to another rule."},technologies:[{fr:"Pivot",en:"Pivot"},{fr:"Constellation",en:"Constellation"},{fr:"Déblocage",en:"Unlock"},{fr:"Momentum",en:"Momentum"},{fr:"Transition",en:"Transition"}]},{...r[2],categoryKey:"hint",categoryLabel:{fr:"Conseil",en:"Clue"},description:{fr:"Ne cherche pas un bouton. Replace les fragments. Le fil de lumière ne ment jamais.",en:"Do not search for a button. Put the fragments back into place. The line of light never lies."},technologies:[{fr:"Patience",en:"Patience"},{fr:"Lecture",en:"Reading"},{fr:"Exploration",en:"Exploration"},{fr:"Déverrouillage",en:"Unlocking"},{fr:"Secret",en:"Secret"}]}]:r}});class s_{constructor(){y(this,"projects",n_)}getProjects(){return this.projects}getProjectById(e){return this.projects.find(t=>t.id===e)||null}getProjectByOrder(e){return this.projects[e]||null}getProjectLabel(e,t){const i=this.getProjectById(e);return i?i.title[t]:""}getFacet(e,t){const i=this.getProjectById(e);return i&&i.facets[Math.max(0,Math.min(t,i.facets.length-1))]||null}getProjectIndex(e){return this.projects.findIndex(t=>t.id===e)}getProjectCount(){return this.projects.length}getLocalizedProjects(e){return this.projects.map(t=>({id:t.id,title:t.title[e],project:t}))}}const Z=(s,e)=>({fr:s,en:e}),we=s=>s;function gl(){return{counts:{},ownedOrder:[],modifiers:Tc()}}function Tc(){return{glideFactor:0,landingTolerance:0,chargeRate:1,jumpPower:1,chargedLeapBonus:0,airControl:0,captureRadius:0,extraJumps:0,phaseJump:!1,phaseJumpRescueRadius:0,phaseJumpCooldown:20,teleportRange:0,teleportCooldown:30,warpRange:0,warpCooldown:24,rocketBurst:!1,rocketBurstCooldown:18,rocketBurstPower:0,airDashCharges:0,airDashPower:0,momentumRetention:0,infiniteFlaps:!1,momentumGain:0,momentumCap:1,shieldCharges:0,doubleCoin:!1,spikeOrbit:!1,coinMagnet:0,shopDiscount:0,speedBonus:0,coinBonus:0,luck:0,eventLuck:0,autoCannonLevel:0,enemyDamageBonus:0,timeSlowFactor:0,gravityInverter:!1,phantomLanding:!1,chaosWarp:!1,rareItemBias:0,extraCoinSlots:0,momentumRedirect:0}}const r_={common:Z("Common","Common"),uncommon:Z("Uncommon","Uncommon"),rare:Z("Rare","Rare"),epic:Z("Epic","Epic"),legendary:Z("Legendary","Legendary")},bo=[we({id:"overdrive_core",icon:"OVC",rarity:"common",category:"momentum",unlockScore:0,stackable:!0,maxStacks:5,effects:["momentum_gain"],name:Z("Overdrive Core","Overdrive Core"),description:Z("Augmente le gain de momentum.","Increase momentum gain.")}),we({id:"gyro_stabilizer",icon:"GYR",rarity:"common",category:"momentum",unlockScore:0,stackable:!0,maxStacks:4,effects:["momentum_decay_down"],name:Z("Gyro Stabilizer","Gyro Stabilizer"),description:Z("Le momentum retombe moins vite.","Momentum decays more slowly.")}),we({id:"hyper_boost",icon:"HPB",rarity:"uncommon",category:"momentum",unlockScore:0,stackable:!0,maxStacks:3,effects:["speed_bonus","jump_bonus"],name:Z("Hyper Boost","Hyper Boost"),description:Z("Chaque chaîne réussie pousse plus loin.","Successful chains grant extra speed and jump power.")}),we({id:"kinetic_engine",icon:"KIN",rarity:"uncommon",category:"momentum",unlockScore:0,stackable:!0,maxStacks:3,effects:["landing_tolerance","momentum_gain"],name:Z("Kinetic Engine","Kinetic Engine"),description:Z("Préserve mieux l’élan à l’atterrissage.","Preserve more speed on landing.")}),we({id:"momentum_capacitor",icon:"CAP",rarity:"rare",category:"momentum",unlockScore:0,stackable:!0,maxStacks:3,effects:["momentum_cap"],name:Z("Momentum Capacitor","Momentum Capacitor"),description:Z("Augmente la capacité maximale de momentum.","Increase the maximum momentum gauge.")}),we({id:"chain_amplifier",icon:"CHN",rarity:"rare",category:"momentum",unlockScore:0,stackable:!0,maxStacks:3,effects:["momentum_gain","charge_rate"],name:Z("Chain Amplifier","Chain Amplifier"),description:Z("Les enchaînements remplissent plus fort la jauge.","Chains fill the gauge more efficiently.")}),we({id:"velocity_loop",icon:"VLP",rarity:"common",category:"momentum",unlockScore:0,stackable:!0,maxStacks:4,effects:["speed_bonus"],name:Z("Velocity Loop","Velocity Loop"),description:Z("Augmente légèrement la vitesse globale.","Light permanent speed increase.")}),we({id:"gravity_skimmer",icon:"GSK",rarity:"uncommon",category:"momentum",unlockScore:0,stackable:!0,maxStacks:3,effects:["glide","momentum_decay_down"],name:Z("Gravity Skimmer","Gravity Skimmer"),description:Z("Conserve mieux la vitesse après une trajectoire faible.","Retain more speed after awkward landings.")}),we({id:"turbo_reactor",icon:"TRB",rarity:"rare",category:"momentum",unlockScore:0,stackable:!1,maxStacks:1,effects:["rocket_burst"],name:Z("Turbo Reactor","Turbo Reactor"),description:Z("Déclenche des poussées sur les gros sauts.","Trigger a burst on high-energy launches.")}),we({id:"speed_matrix",icon:"SPD",rarity:"common",category:"momentum",unlockScore:0,stackable:!0,maxStacks:4,effects:["speed_bonus"],name:Z("Speed Matrix","Speed Matrix"),description:Z("Accélère légèrement le run.","Permanent +10% run speed feel.")}),we({id:"double_jump_module",icon:"DJP",rarity:"uncommon",category:"mobility",unlockScore:0,stackable:!1,maxStacks:1,effects:["extra_jump"],name:Z("Double Jump Module","Double Jump Module"),description:Z("Ajoute un saut en l’air.","Add one extra jump.")}),we({id:"triple_jump_module",icon:"TJP",rarity:"epic",category:"mobility",unlockScore:50,stackable:!1,maxStacks:1,effects:["extra_jump_2"],name:Z("Triple Jump Module","Triple Jump Module"),description:Z("Ajoute deux sauts en l’air.","Add two extra jumps.")}),we({id:"air_dash_thrusters",icon:"ADS",rarity:"rare",category:"mobility",unlockScore:0,stackable:!1,maxStacks:1,effects:["air_dash"],name:Z("Air Dash Thrusters","Air Dash Thrusters"),description:Z("Permet un dash aérien court.","Add one short airborne dash.")}),we({id:"glide_wings",icon:"GLD",rarity:"common",category:"mobility",unlockScore:0,stackable:!0,maxStacks:4,effects:["glide"],name:Z("Glide Wings","Glide Wings"),description:Z("Réduit la chute en vol.","Reduce fall speed while airborne.")}),we({id:"long_glide_core",icon:"LGC",rarity:"uncommon",category:"mobility",unlockScore:0,stackable:!0,maxStacks:3,effects:["glide"],name:Z("Long Glide Core","Long Glide Core"),description:Z("Glide beaucoup plus longtemps.","Make gliding significantly stronger.")}),we({id:"magnetic_orbit",icon:"MGO",rarity:"uncommon",category:"mobility",unlockScore:0,stackable:!0,maxStacks:4,effects:["capture_radius"],name:Z("Magnetic Orbit","Magnetic Orbit"),description:Z("La capture des shards est plus facile.","Increase shard capture radius.")}),we({id:"momentum_redirector",icon:"MRD",rarity:"common",category:"mobility",unlockScore:0,stackable:!0,maxStacks:4,effects:["air_control"],name:Z("Momentum Redirector","Momentum Redirector"),description:Z("Permet de corriger plus vite les angles.","Improve air control and redirect sharper.")}),we({id:"teleport_pulse",icon:"TLP",rarity:"rare",category:"mobility",unlockScore:0,stackable:!1,maxStacks:1,effects:["teleport"],name:Z("Teleport Pulse","Teleport Pulse"),description:Z("Téléporte plus loin sur un long cooldown.","Teleport forward every 30 seconds.")}),we({id:"warp_blink",icon:"WRP",rarity:"rare",category:"mobility",unlockScore:0,stackable:!1,maxStacks:1,effects:["warp"],name:Z("Warp Blink","Warp Blink"),description:Z("Ajoute un blink de secours plus court.","Add a shorter emergency warp.")}),we({id:"anti_gravity_boots",icon:"AGB",rarity:"uncommon",category:"mobility",unlockScore:0,stackable:!0,maxStacks:3,effects:["jump_bonus","glide"],name:Z("Anti-Gravity Boots","Anti-Gravity Boots"),description:Z("Allège les sauts et adoucit la chute.","Lighten jumps and soften falling.")}),we({id:"auto_cannon",icon:"CAN",rarity:"rare",category:"combat",unlockScore:20,stackable:!1,maxStacks:1,effects:["auto_fire"],name:Z("Auto Cannon","Auto Cannon"),description:Z("Tire automatiquement sur les ennemis proches.","Auto-fire at nearby enemies.")}),we({id:"laser_turret",icon:"LSR",rarity:"epic",category:"combat",unlockScore:50,stackable:!1,maxStacks:1,effects:["auto_fire_plus"],name:Z("Laser Turret","Laser Turret"),description:Z("Renforce fortement les tirs automatiques.","Stronger automatic shots.")}),we({id:"shockwave_landing",icon:"SHK",rarity:"rare",category:"combat",unlockScore:20,stackable:!0,maxStacks:2,effects:["landing_burst"],name:Z("Shockwave Landing","Shockwave Landing"),description:Z("Un atterrissage rapide nettoie les ennemis proches.","Strong landings clear nearby enemies.")}),we({id:"impact_burst",icon:"IMP",rarity:"rare",category:"combat",unlockScore:20,stackable:!0,maxStacks:2,effects:["impact_bonus"],name:Z("Impact Burst","Impact Burst"),description:Z("Les frappes rapides deviennent létales.","Fast impacts deal lethal damage.")}),we({id:"drone_companion",icon:"DRN",rarity:"epic",category:"combat",unlockScore:50,stackable:!1,maxStacks:1,effects:["auto_fire"],name:Z("Drone Companion","Drone Companion"),description:Z("Un drone ajoute une pression offensive constante.","A drone adds constant offensive pressure.")}),we({id:"plasma_trail",icon:"PLS",rarity:"rare",category:"combat",unlockScore:20,stackable:!1,maxStacks:1,effects:["trail_damage"],name:Z("Plasma Trail","Plasma Trail"),description:Z("La traînée du joueur devient offensive.","Your trail damages enemies behind you.")}),we({id:"spike_orbit",icon:"SPK",rarity:"uncommon",category:"combat",unlockScore:20,stackable:!1,maxStacks:1,effects:["orbit_damage"],name:Z("Spike Orbit","Spike Orbit"),description:Z("Tourner sur une shard devient dangereux pour les ennemis.","Orbiting around shards damages enemies on contact.")}),we({id:"pulse_shield",icon:"SHD",rarity:"rare",category:"combat",unlockScore:20,stackable:!0,maxStacks:2,effects:["shield"],name:Z("Pulse Shield","Pulse Shield"),description:Z("Bloque un impact mortel.","Blocks one lethal collision.")}),we({id:"emp_pulse",icon:"EMP",rarity:"epic",category:"combat",unlockScore:50,stackable:!1,maxStacks:1,effects:["emp"],name:Z("EMP Pulse","EMP Pulse"),description:Z("Neutralise brièvement les menaces proches.","Temporarily disable nearby enemies.")}),we({id:"target_lock",icon:"TLK",rarity:"uncommon",category:"combat",unlockScore:20,stackable:!1,maxStacks:1,effects:["auto_fire_accuracy"],name:Z("Target Lock","Target Lock"),description:Z("Les tirs automatiques ratent moins.","Improve auto-fire accuracy.")}),we({id:"coin_magnet",icon:"CNM",rarity:"common",category:"economy",unlockScore:0,stackable:!0,maxStacks:4,effects:["coin_magnet"],name:Z("Coin Magnet","Coin Magnet"),description:Z("Attire les pièces plus tôt sur l’orbite.","Pull coins toward the player sooner.")}),we({id:"double_coin",icon:"DBL",rarity:"rare",category:"economy",unlockScore:0,stackable:!1,maxStacks:1,effects:["double_coin"],name:Z("Double Coin","Double Coin"),description:Z("Double les pièces gagnées.","Double all coin rewards.")}),we({id:"lucky_shard",icon:"LCK",rarity:"uncommon",category:"economy",unlockScore:0,stackable:!0,maxStacks:3,effects:["luck"],name:Z("Lucky Shard","Lucky Shard"),description:Z("Augmente légèrement la richesse des runs.","Increase general loot luck.")}),we({id:"treasure_scanner",icon:"TRS",rarity:"uncommon",category:"economy",unlockScore:0,stackable:!0,maxStacks:3,effects:["event_luck"],name:Z("Treasure Scanner","Treasure Scanner"),description:Z("Augmente la fréquence des événements utiles.","Increase valuable event odds.")}),we({id:"market_discount",icon:"MKT",rarity:"uncommon",category:"economy",unlockScore:0,stackable:!0,maxStacks:3,effects:["shop_discount"],name:Z("Market Discount","Market Discount"),description:Z("Réduit les prix du shop.","Lower shop prices.")}),we({id:"loot_booster",icon:"LBT",rarity:"rare",category:"economy",unlockScore:0,stackable:!0,maxStacks:3,effects:["coin_bonus"],name:Z("Loot Booster","Loot Booster"),description:Z("Chaque gain donne plus de ressources.","Increase resource payouts.")}),we({id:"golden_orbit",icon:"GLD",rarity:"rare",category:"economy",unlockScore:0,stackable:!0,maxStacks:2,effects:["extra_coin_slots"],name:Z("Golden Orbit","Golden Orbit"),description:Z("Ajoute plus de pièces sur les trajectoires.","Spawn more coins on orbit paths.")}),we({id:"jackpot_engine",icon:"JPT",rarity:"epic",category:"economy",unlockScore:50,stackable:!1,maxStacks:1,effects:["coin_bonus","luck"],name:Z("Jackpot Engine","Jackpot Engine"),description:Z("Les gains rares deviennent plus lucratifs.","Rare drops pay out harder.")}),we({id:"rare_item_finder",icon:"RRF",rarity:"epic",category:"economy",unlockScore:50,stackable:!0,maxStacks:2,effects:["rare_item_bias"],name:Z("Rare Item Finder","Rare Item Finder"),description:Z("Pousse les offres vers de meilleures raretés.","Bias future offers toward higher rarity.")}),we({id:"coin_storm",icon:"CST",rarity:"legendary",category:"economy",unlockScore:100,stackable:!1,maxStacks:1,effects:["coin_bonus","extra_coin_slots"],name:Z("Coin Storm","Coin Storm"),description:Z("Déverse une pluie de pièces dans le run.","Flood the run with extra coin value.")}),we({id:"chaos_warp",icon:"CHW",rarity:"rare",category:"utility",unlockScore:50,stackable:!1,maxStacks:1,effects:["chaos_warp"],name:Z("Chaos Warp","Chaos Warp"),description:Z("Ajoute un warp imprévisible mais salvateur.","Add a risky emergency warp.")}),we({id:"shard_splitter",icon:"SPL",rarity:"uncommon",category:"utility",unlockScore:50,stackable:!0,maxStacks:2,effects:["extra_coin_slots","event_luck"],name:Z("Shard Splitter","Shard Splitter"),description:Z("Multiplie les possibilités sur certaines sections.","Occasionally create richer shard sections.")}),we({id:"phase_walk",icon:"PHS",rarity:"rare",category:"utility",unlockScore:50,stackable:!1,maxStacks:1,effects:["phase_jump"],name:Z("Phase Walk","Phase Walk"),description:Z("Permet de sauver une capture ratée.","Pass through one missed landing on cooldown.")}),we({id:"time_slow_field",icon:"TSF",rarity:"epic",category:"utility",unlockScore:50,stackable:!1,maxStacks:1,effects:["time_slow"],name:Z("Time Slow Field","Time Slow Field"),description:Z("Ralentit légèrement la pression globale.","Slightly slow the world around you.")}),we({id:"mirror_momentum",icon:"MMR",rarity:"rare",category:"utility",unlockScore:50,stackable:!0,maxStacks:2,effects:["momentum_gain","momentum_cap"],name:Z("Mirror Momentum","Mirror Momentum"),description:Z("Amplifie la jauge quand le flow est propre.","Amplify gauge growth during clean flow.")}),we({id:"overclock_core",icon:"OCK",rarity:"epic",category:"utility",unlockScore:50,stackable:!1,maxStacks:1,effects:["charge_rate","speed_bonus"],name:Z("Overclock Core","Overclock Core"),description:Z("Charge plus vite et accélère tout le run.","Charge faster and push the whole run faster.")}),we({id:"gravity_inverter",icon:"GIV",rarity:"legendary",category:"utility",unlockScore:100,stackable:!1,maxStacks:1,effects:["gravity_invert"],name:Z("Gravity Inverter","Gravity Inverter"),description:Z("Inverse certains comportements de chute en votre faveur.","Invert some falling pressure in your favor.")}),we({id:"phantom_landing",icon:"PHN",rarity:"rare",category:"utility",unlockScore:50,stackable:!0,maxStacks:2,effects:["phase_jump","landing_tolerance"],name:Z("Phantom Landing","Phantom Landing"),description:Z("Ajoute une fenêtre fantôme de rattrapage.","Create a ghost landing rescue window.")}),we({id:"energy_shield",icon:"ENG",rarity:"epic",category:"utility",unlockScore:50,stackable:!0,maxStacks:2,effects:["shield"],name:Z("Energy Shield","Energy Shield"),description:Z("Ajoute plusieurs charges de protection.","Grant multiple protection charges.")}),we({id:"orbital_wings",icon:"WNG",rarity:"legendary",category:"utility",unlockScore:100,stackable:!1,maxStacks:1,effects:["infinite_flap","glide"],name:Z("Orbital Wings","Orbital Wings"),description:Z("Le vol devient presque libre.","Almost remove airborne limitations.")})],Ls={common:56,uncommon:28,rare:11,epic:4,legendary:1};function o_(s){return s<50?["common","uncommon","rare"]:s<100?["common","uncommon","rare","epic"]:["common","uncommon","rare","epic","legendary"]}function a_(s){return s<10?10:s<100?100:s<1e3?1e3:Math.floor(s/1e3)*1e3+1e3}function zr(s,e){const t=a_(s);return e>=t?t:null}function Ln(s,e,t=Math.random){const i=new Set(o_(s)),n=bo.filter(a=>{if(!i.has(a.rarity)||s<a.unlockScore)return!1;const l=e.counts[a.id]??0;return!(!a.stackable&&l>0||a.stackable&&l>=a.maxStacks)}),r=[],o=new Set;for(;r.length<3&&o.size<n.length;){const a=l_(n,t,o,e.modifiers.rareItemBias);if(!a)break;o.add(a.id),r.push({item:a,stackCount:e.counts[a.id]??0})}return r}function l_(s,e,t,i){const n=s.filter(a=>!t.has(a.id));if(n.length===0)return null;const r=n.reduce((a,l)=>a+_l(l.rarity,i),0);let o=e()*r;for(const a of n)if(o-=_l(a.rarity,i),o<=0)return a;return n[n.length-1]??null}function _l(s,e){const t=Math.max(0,e);return s==="legendary"?Ls[s]*(1+t*4):s==="epic"?Ls[s]*(1+t*2.5):s==="rare"?Ls[s]*(1+t):Ls[s]}function c_(s,e){const t={...s.counts,[e]:(s.counts[e]??0)+1},i=s.ownedOrder.includes(e)?s.ownedOrder:[...s.ownedOrder,e],n={counts:t,ownedOrder:i,modifiers:Tc()};for(const r of bo){const o=t[r.id]??0;if(!(o<=0))switch(r.id){case"overdrive_core":n.modifiers.momentumGain+=.1*o;break;case"gyro_stabilizer":n.modifiers.momentumRetention+=.08*o;break;case"hyper_boost":n.modifiers.speedBonus+=.08*o,n.modifiers.jumpPower+=.06*o;break;case"kinetic_engine":n.modifiers.landingTolerance+=.12*o,n.modifiers.momentumGain+=.05*o;break;case"momentum_capacitor":n.modifiers.momentumCap+=.08*o;break;case"chain_amplifier":n.modifiers.momentumGain+=.06*o,n.modifiers.chargeRate+=.08*o;break;case"velocity_loop":n.modifiers.speedBonus+=.05*o;break;case"gravity_skimmer":n.modifiers.glideFactor+=.16*o,n.modifiers.momentumRetention+=.04*o;break;case"turbo_reactor":n.modifiers.rocketBurst=!0,n.modifiers.rocketBurstPower=5.4,n.modifiers.rocketBurstCooldown=16;break;case"speed_matrix":n.modifiers.speedBonus+=.1*o;break;case"double_jump_module":n.modifiers.extraJumps=Math.max(n.modifiers.extraJumps,1);break;case"triple_jump_module":n.modifiers.extraJumps=Math.max(n.modifiers.extraJumps,2);break;case"air_dash_thrusters":n.modifiers.airDashCharges=Math.max(n.modifiers.airDashCharges,1),n.modifiers.airDashPower=4.8;break;case"glide_wings":n.modifiers.glideFactor+=.2*o;break;case"long_glide_core":n.modifiers.glideFactor+=.34*o;break;case"magnetic_orbit":n.modifiers.captureRadius+=.12*o;break;case"momentum_redirector":n.modifiers.airControl+=.12*o,n.modifiers.momentumRedirect+=.1*o;break;case"teleport_pulse":n.modifiers.teleportRange=10,n.modifiers.teleportCooldown=30;break;case"warp_blink":n.modifiers.warpRange=6,n.modifiers.warpCooldown=20;break;case"anti_gravity_boots":n.modifiers.glideFactor+=.12*o,n.modifiers.jumpPower+=.05*o;break;case"auto_cannon":n.modifiers.autoCannonLevel=Math.max(n.modifiers.autoCannonLevel,1);break;case"laser_turret":n.modifiers.autoCannonLevel=Math.max(n.modifiers.autoCannonLevel,2),n.modifiers.enemyDamageBonus+=1;break;case"shockwave_landing":n.modifiers.enemyDamageBonus+=.5*o;break;case"impact_burst":n.modifiers.enemyDamageBonus+=.6*o;break;case"drone_companion":n.modifiers.autoCannonLevel=Math.max(n.modifiers.autoCannonLevel,1),n.modifiers.enemyDamageBonus+=.4;break;case"plasma_trail":n.modifiers.enemyDamageBonus+=.35;break;case"spike_orbit":n.modifiers.spikeOrbit=!0;break;case"pulse_shield":n.modifiers.shieldCharges+=1;break;case"emp_pulse":n.modifiers.enemyDamageBonus+=.8;break;case"target_lock":n.modifiers.autoCannonLevel=Math.max(n.modifiers.autoCannonLevel,1);break;case"coin_magnet":n.modifiers.coinMagnet+=.18*o;break;case"double_coin":n.modifiers.doubleCoin=!0;break;case"lucky_shard":n.modifiers.luck+=.1*o;break;case"treasure_scanner":n.modifiers.eventLuck+=.1*o;break;case"market_discount":n.modifiers.shopDiscount+=.12*o;break;case"loot_booster":n.modifiers.coinBonus+=.15*o;break;case"golden_orbit":n.modifiers.extraCoinSlots+=o;break;case"jackpot_engine":n.modifiers.coinBonus+=.28,n.modifiers.luck+=.12;break;case"rare_item_finder":n.modifiers.rareItemBias+=.12*o;break;case"coin_storm":n.modifiers.coinBonus+=.35,n.modifiers.extraCoinSlots+=2;break;case"chaos_warp":n.modifiers.chaosWarp=!0,n.modifiers.warpRange=Math.max(n.modifiers.warpRange,12);break;case"shard_splitter":n.modifiers.extraCoinSlots+=o,n.modifiers.eventLuck+=.06*o;break;case"phase_walk":n.modifiers.phaseJump=!0,n.modifiers.phaseJumpRescueRadius=2.8,n.modifiers.phaseJumpCooldown=18;break;case"time_slow_field":n.modifiers.timeSlowFactor+=.12;break;case"mirror_momentum":n.modifiers.momentumGain+=.12*o,n.modifiers.momentumCap+=.06*o;break;case"overclock_core":n.modifiers.chargeRate+=.28,n.modifiers.speedBonus+=.12;break;case"gravity_inverter":n.modifiers.gravityInverter=!0,n.modifiers.glideFactor+=.2;break;case"phantom_landing":n.modifiers.phaseJump=!0,n.modifiers.phaseJumpRescueRadius=2.2,n.modifiers.landingTolerance+=.14*o,n.modifiers.phantomLanding=!0;break;case"energy_shield":n.modifiers.shieldCharges+=2*o;break;case"orbital_wings":n.modifiers.infiniteFlaps=!0,n.modifiers.glideFactor+=.8;break}}return n.modifiers.glideFactor=Math.min(1.9,n.modifiers.glideFactor),n.modifiers.captureRadius=Math.min(1.25,n.modifiers.captureRadius),n.modifiers.airControl=Math.min(.85,n.modifiers.airControl),n.modifiers.jumpPower=Math.min(1.9,n.modifiers.jumpPower),n.modifiers.chargeRate=Math.min(2.4,n.modifiers.chargeRate),n.modifiers.chargedLeapBonus=Math.min(.8,n.modifiers.chargedLeapBonus),n.modifiers.momentumRetention=Math.min(.72,n.modifiers.momentumRetention),n.modifiers.momentumGain=Math.min(1.2,n.modifiers.momentumGain),n.modifiers.momentumCap=Math.min(1.8,n.modifiers.momentumCap),n.modifiers.coinMagnet=Math.min(.9,n.modifiers.coinMagnet),n.modifiers.shopDiscount=Math.min(.45,n.modifiers.shopDiscount),n.modifiers.speedBonus=Math.min(.9,n.modifiers.speedBonus),n.modifiers.coinBonus=Math.min(1.2,n.modifiers.coinBonus),n.modifiers.luck=Math.min(.8,n.modifiers.luck),n.modifiers.eventLuck=Math.min(.6,n.modifiers.eventLuck),n.modifiers.timeSlowFactor=Math.min(.35,n.modifiers.timeSlowFactor),n.modifiers.rareItemBias=Math.min(.5,n.modifiers.rareItemBias),n}const cn={miss:new URL("/assets/Grade-Echec-DkeOkBAi.png",import.meta.url).href,good:new URL("/assets/Grade-Great-pxoxq3uM.png",import.meta.url).href,super:new URL("/assets/Grade-super-C8-aOZx2.png",import.meta.url).href,perfect:new URL("/assets/Grade-Perfect-CGoj8wyC.png",import.meta.url).href,twist:new URL("/assets/Grade-Twist-C8LMfMxJ.png",import.meta.url).href},Is={bg:new URL("/assets/momentum_bar_bg-Bne9zH7y.png",import.meta.url).href,fill1:new URL("/assets/momentum_bar_fill_1-46YrHeEY.png",import.meta.url).href,fill2:new URL("/assets/momentum_bar_fill_2-BQHB3toE.png",import.meta.url).href};class h_{constructor(e,t,i){y(this,"element");y(this,"panel");y(this,"scoreLabel");y(this,"highscoreLabel");y(this,"chargeLabel");y(this,"chainLabel");y(this,"distanceLabel");y(this,"coinsLabel");y(this,"scoreValue");y(this,"highscoreValue");y(this,"chainValue");y(this,"distanceValue");y(this,"coinsValue");y(this,"momentumBarLabel");y(this,"momentumBarValue");y(this,"momentumMask");y(this,"momentumFillPrimary");y(this,"momentumFillSecondary");y(this,"chargeFill");y(this,"orbitGraceIndicator");y(this,"statusValue");y(this,"metaValue");y(this,"exitButton");y(this,"branchLayer");y(this,"inventoryBar");y(this,"branchTitle");y(this,"branchHint");y(this,"branchCards");y(this,"shopBar");y(this,"shopButtons");y(this,"shopCloseButton");y(this,"landingFeedbackBadge");y(this,"toast");y(this,"toastLabel");y(this,"toastName");y(this,"gameOverOverlay");y(this,"gameOverTitle");y(this,"gameOverBody");y(this,"restartButton");y(this,"returnButton");this.i18n=t,this.preloadUiAssets(),this.element=document.createElement("div"),this.element.className="game-hud",this.element.innerHTML=`
      <div class="game-hud__panel">
        <div class="game-hud__stats">
          <div><span data-score-label></span><strong data-score>0</strong></div>
          <div><span data-highscore-label></span><strong data-highscore>0</strong></div>
          <div><span data-chain-label></span><strong data-chain>0</strong></div>
          <div><span data-distance-label></span><strong data-distance>0m</strong></div>
          <div><span data-coins-label></span><strong data-coins>0</strong></div>
        </div>
        <div class="game-hud__momentum-meter">
          <div class="game-hud__momentum-meta">
            <span data-momentum-bar-label></span>
            <strong data-momentum-bar-value>0%</strong>
          </div>
          <div class="game-hud__momentum-shell">
            <img src="${Is.bg}" alt="" class="game-hud__momentum-bg" />
            <div class="game-hud__momentum-mask" data-momentum-mask>
              <img src="${Is.fill1}" alt="" class="game-hud__momentum-fill game-hud__momentum-fill--primary" data-momentum-fill-primary />
              <img src="${Is.fill2}" alt="" class="game-hud__momentum-fill game-hud__momentum-fill--secondary" data-momentum-fill-secondary />
            </div>
          </div>
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
      <div class="game-hud__play-zone game-hud__play-zone--top"></div>
      <div class="game-hud__play-zone game-hud__play-zone--bottom"></div>
      <div class="game-hud__inventory"></div>
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
    `,this.panel=this.element.querySelector(".game-hud__panel"),this.scoreLabel=this.element.querySelector("[data-score-label]"),this.highscoreLabel=this.element.querySelector("[data-highscore-label]"),this.chargeLabel=this.element.querySelector("[data-charge-label]"),this.chainLabel=this.element.querySelector("[data-chain-label]"),this.distanceLabel=this.element.querySelector("[data-distance-label]"),this.coinsLabel=this.element.querySelector("[data-coins-label]"),this.scoreValue=this.element.querySelector("[data-score]"),this.highscoreValue=this.element.querySelector("[data-highscore]"),this.chainValue=this.element.querySelector("[data-chain]"),this.distanceValue=this.element.querySelector("[data-distance]"),this.coinsValue=this.element.querySelector("[data-coins]"),this.momentumBarLabel=this.element.querySelector("[data-momentum-bar-label]"),this.momentumBarValue=this.element.querySelector("[data-momentum-bar-value]"),this.momentumMask=this.element.querySelector("[data-momentum-mask]"),this.momentumFillPrimary=this.element.querySelector("[data-momentum-fill-primary]"),this.momentumFillSecondary=this.element.querySelector("[data-momentum-fill-secondary]"),this.chargeFill=this.element.querySelector("[data-charge-fill]"),this.orbitGraceIndicator=this.element.querySelector("[data-orbit-grace]"),this.statusValue=this.element.querySelector(".game-hud__status"),this.metaValue=this.element.querySelector(".game-hud__meta"),this.exitButton=this.element.querySelector("[data-exit]"),this.branchLayer=this.element.querySelector(".game-hud__branch-layer"),this.inventoryBar=this.element.querySelector(".game-hud__inventory"),this.branchTitle=this.element.querySelector("[data-upgrade-title]"),this.branchHint=this.element.querySelector("[data-upgrade-hint]"),this.branchCards=Array.from(this.element.querySelectorAll("[data-branch-card]")),this.shopBar=this.element.querySelector(".game-hud__shop-bar"),this.shopButtons=Array.from(this.element.querySelectorAll("[data-shop-offer]")),this.shopCloseButton=this.element.querySelector("[data-shop-close]"),this.landingFeedbackBadge=this.element.querySelector(".game-hud__landing-feedback"),this.toast=this.element.querySelector(".game-hud__toast"),this.toastLabel=this.element.querySelector("[data-toast-label]"),this.toastName=this.element.querySelector("[data-toast-name]"),this.gameOverOverlay=this.element.querySelector(".game-hud__game-over"),this.gameOverTitle=this.element.querySelector("[data-game-over-title]"),this.gameOverBody=this.element.querySelector("[data-game-over-body]"),this.restartButton=this.element.querySelector("[data-restart]"),this.returnButton=this.element.querySelector("[data-return]"),this.exitButton.addEventListener("click",i.onExit),this.restartButton.addEventListener("click",i.onRestart),this.returnButton.addEventListener("click",i.onExit),this.shopButtons.forEach((n,r)=>{n.addEventListener("click",()=>i.onSelectUpgrade(r))}),this.shopCloseButton.addEventListener("click",i.onCloseShop),e.appendChild(this.element),this.i18n.onChange(()=>this.renderStatic()),this.renderStatic()}setVisible(e){this.element.classList.toggle("is-visible",e)}update(e){this.scoreValue.textContent=String(e.score),this.highscoreValue.textContent=String(e.highscore),this.distanceValue.textContent=`${Math.round(e.distanceMeters)}m`,this.coinsValue.textContent=String(e.coins),this.chainValue.textContent=`${Math.round(e.momentumGauge*100)}%`,this.chainValue.style.opacity=`${.58+e.momentumGauge*.42}`,this.momentumBarValue.textContent=`${Math.round(e.momentumGauge*100)}%`,this.momentumMask.style.width=`${Math.round(e.momentumGauge*100)}%`;const t=Math.floor(performance.now()/240)%2;this.momentumFillPrimary.style.opacity=t===0?"1":"0",this.momentumFillSecondary.style.opacity=t===0?"0":"1",this.chargeFill.style.setProperty("--charge-ratio",e.chargeRatio.toFixed(3)),this.orbitGraceIndicator.classList.toggle("is-visible",e.orbitGraceActive),this.orbitGraceIndicator.style.setProperty("--orbit-grace-progress",e.orbitGraceProgress.toFixed(3));const i=this.element.querySelector("[data-charge-value]");i&&(i.textContent=`${Math.round(e.chargeRatio*100)}%`),this.statusValue.textContent=e.state==="transition"?this.i18n.t("gameStatusTransition"):e.state==="running"?this.i18n.t("gameStatusRunning"):e.state==="upgrade_choice"?this.i18n.t("gameStatusUpgrade"):this.i18n.t("gameStatusGameOver"),this.metaValue.textContent=this.renderMeta(e);const n=e.branchHints.some(r=>r.mode==="shop_orbit");this.branchTitle.textContent=n?this.i18n.t("gameShopTitle"):this.i18n.t("gameUpgradeTitle"),this.branchHint.textContent=n?this.i18n.t("gameShopHint"):this.i18n.t("gameUpgradeHint"),this.panel.classList.toggle("is-hidden",e.state==="game_over"),this.branchLayer.classList.toggle("is-visible",e.state==="upgrade_choice"&&!n),this.shopBar.classList.toggle("is-visible",e.state==="upgrade_choice"&&n),this.gameOverOverlay.classList.toggle("is-visible",e.state==="game_over"),this.toast.classList.toggle("is-visible",!!e.acquisition),e.acquisition&&(this.toast.style.setProperty("--toast-progress",e.acquisition.progress.toFixed(3)),this.toastName.textContent=e.acquisition.offer.item.name[this.i18n.current]),this.renderLandingFeedback(e.landingFeedback),e.state==="game_over"&&(this.gameOverBody.textContent=this.getGameOverBody(e.gameOverCause)),this.renderInventory(e.inventoryItems),this.renderBranchHints(e.branchHints),this.renderShopBar(e.branchHints,e.coins)}renderStatic(){this.scoreLabel.textContent=this.i18n.t("gameScore"),this.highscoreLabel.textContent=this.i18n.t("gameBest"),this.chargeLabel.textContent=this.i18n.t("gameCharge"),this.chainLabel.textContent=this.i18n.t("gameMomentum"),this.momentumBarLabel.textContent=this.i18n.t("gameMomentum"),this.distanceLabel.textContent=this.i18n.t("gameDistance"),this.coinsLabel.textContent=this.i18n.t("gameCoins"),this.exitButton.textContent=this.i18n.t("gamePortfolio"),this.branchTitle.textContent=this.i18n.t("gameUpgradeTitle"),this.branchHint.textContent=this.i18n.t("gameUpgradeHint"),this.shopCloseButton.textContent=this.i18n.t("gameShopClose"),this.toastLabel.textContent=this.i18n.t("gameAcquired"),this.gameOverTitle.textContent=this.i18n.t("gameOverTitle"),this.gameOverBody.textContent=this.i18n.t("gameOverBody"),this.restartButton.textContent=this.i18n.t("gameRestart"),this.returnButton.textContent=this.i18n.t("gamePortfolio")}renderBranchHints(e){this.branchCards.forEach((t,i)=>{const n=e[i];if(!n){t.hidden=!0;return}t.hidden=!1,t.dataset.rarity=n.offer.item.rarity;const r=n.mode==="shop_orbit"?this.i18n.t("gameShopOffer"):i===0?this.i18n.t("gamePathUpper"):i===1?this.i18n.t("gamePathForward"):this.i18n.t("gamePathLower");t.style.transform=`translate(${n.screenX}px, ${n.screenY}px)`,t.innerHTML=`
        <span class="game-hud__upgrade-icon">${n.offer.item.icon}</span>
        <span class="game-hud__upgrade-rarity">${this.getRarityLabel(n.offer.item.rarity)}</span>
        <span class="game-hud__upgrade-path-label">${r}</span>
        <strong class="game-hud__upgrade-path-name">${n.offer.item.name[this.i18n.current]}</strong>
        <span class="game-hud__upgrade-path-desc">${n.offer.item.description[this.i18n.current]}</span>
        ${n.price!==void 0?`<span class="game-hud__upgrade-price">${this.i18n.t("gamePrice")}: ${n.price}</span>`:""}
      `})}renderInventory(e){this.inventoryBar.innerHTML="",this.inventoryBar.classList.toggle("is-visible",e.length>0),e.forEach(t=>{const i=document.createElement("div");i.className="game-hud__inventory-item",i.innerHTML=`
        <img src="${t.iconSrc}" alt="" class="game-hud__inventory-icon" />
        <div class="game-hud__inventory-copy">
          <strong class="game-hud__inventory-name">${t.name}</strong>
          <span class="game-hud__inventory-desc">${t.description}</span>
        </div>
        <span class="game-hud__inventory-count">x${t.count}</span>
      `,i.title=`${t.name} — ${t.description}`,this.inventoryBar.appendChild(i)})}renderShopBar(e,t=0){const i=e.filter(n=>n.mode==="shop_orbit");this.shopButtons.forEach((n,r)=>{const o=i[r];if(n.hidden=!o,n.disabled=!o,!o)return;const a=(o.price??0)<=t;n.disabled=!a,n.innerHTML=`
        <strong>${o.offer.item.name[this.i18n.current]}</strong>
        <span>${o.offer.item.description[this.i18n.current]}</span>
        <em>${this.i18n.t("gamePrice")}: ${o.price??0}</em>
      `,n.classList.toggle("is-disabled",!a)}),this.shopCloseButton.textContent=this.i18n.t("gameShopClose")}renderMeta(e){const t=[10,100,1e3].map(i=>{const n=e.splitTimes[i];return n===void 0?null:`${i}: ${n.toFixed(1)}s`}).filter(Boolean).join(" • ");return t?`${this.i18n.t("gameSplits")}: ${t}`:`${this.i18n.t("gameBestDistance")}: ${Math.round(e.bestDistanceMeters)}m`}renderLandingFeedback(e){if(!e){this.landingFeedbackBadge.classList.remove("is-visible"),this.landingFeedbackBadge.innerHTML="";return}const t=this.getLandingGradeAsset(e.grade);this.landingFeedbackBadge.innerHTML=`
      ${e.twist?`<img src="${cn.twist}" alt="${this.i18n.t("gameLandingTwist")}" class="game-hud__landing-feedback-asset game-hud__landing-feedback-asset--twist" />`:""}
      <img src="${t}" alt="${this.getLandingGradeLabel(e.grade)}" class="game-hud__landing-feedback-asset game-hud__landing-feedback-asset--grade" />
    `,this.landingFeedbackBadge.dataset.grade=e.grade,this.landingFeedbackBadge.classList.toggle("is-twist",e.twist),this.landingFeedbackBadge.classList.add("is-visible"),this.landingFeedbackBadge.style.setProperty("--landing-progress",e.progress.toFixed(3)),this.landingFeedbackBadge.style.transform=`translate(${e.screenX}px, ${e.screenY}px)`}getLandingGradeLabel(e){return e==="miss"?this.i18n.t("gameLandingMiss"):e==="super"?this.i18n.t("gameLandingSuper"):e==="perfect"?this.i18n.t("gameLandingPerfect"):this.i18n.t("gameLandingGood")}getLandingGradeAsset(e){return e==="miss"?cn.miss:e==="super"?cn.super:e==="perfect"?cn.perfect:cn.good}getRarityLabel(e){return r_[e][this.i18n.current]}getGameOverBody(e){return e==="enemy"?this.i18n.t("gameOverEnemy"):e==="out_of_bounds"?this.i18n.t("gameOverBounds"):this.i18n.t("gameOverCamera")}preloadUiAssets(){Object.values(cn).concat(Object.values(Is)).forEach(e=>{const t=new Image;t.decoding="async",t.src=e})}}function Ge(s,e,t){return Math.min(t,Math.max(e,s))}function be(s,e,t,i){return s+(e-s)*(1-Math.exp(-t*i))}function vl(s,e){const t=s.x-e.x,i=s.y-e.y,n=s.z-e.z;return Math.sqrt(t*t+i*i+n*n)}function ks(s,e){return(s%e+e)%e}const Dt=8.9;function In(s){return s/Dt}function Zt(s){const e=Ge(s/200,0,1),t=s<50?"easy":s<100?"medium":s<160?"hard":"expert";return{normalized:e,band:t,spacing:Dt+e*7.8,movementAmplitude:.08+e*1.05,movementSpeed:.22+e*.88,cameraSpeed:1.65+e*3.55,cameraCatchupSpeed:2.6+e*2.2,maxJumpDistance:17.8+e*9.2,maxVerticalDelta:5.2+e*3.8,safeZoneDistance:8.6+e*1.8,cameraLookAhead:8.6+e*5.2,baseZoom:22.4,largeShardZoom:6.4,milestoneZoom:18,momentumZoomRange:21.5,enemyUnlocked:s>=20,ovalUnlocked:s>=50,triangularUnlocked:s>=100,roundMovementUnlocked:s>=5,eventChance:s<12?0:s<60?.08:s<120?.14:.18,movingShardChance:s<5?0:s<50?.12:s<100?.2:.3}}const zn=class zn{constructor(){y(this,"position",new w);y(this,"lookAt",new w);y(this,"currentFocus",new re);y(this,"targetFocus",new re);y(this,"currentZoom",18.8);y(this,"targetZoom",18.8);y(this,"railX",-12);y(this,"safeLeft",-1/0);y(this,"safeRight",1/0);y(this,"safeTop",1/0);y(this,"safeBottom",-1/0);y(this,"fov",42)}reset(e){this.railX=e.resolvedX-4.4,this.currentFocus.set(e.resolvedX+4.2,e.resolvedY),this.targetFocus.copy(this.currentFocus),this.currentZoom=18.8,this.targetZoom=18.8,this.position.set(this.currentFocus.x-zn.CAMERA_CENTER_OFFSET,e.resolvedY+.18,this.currentZoom),this.lookAt.set(this.currentFocus.x,e.resolvedY,0),this.safeLeft=-1/0,this.safeRight=1/0,this.safeTop=1/0,this.safeBottom=-1/0}update(e){const{deltaTime:t,state:i,score:n,currentNode:r,nextNode:o,playerPosition:a,momentumGauge:l,largeShardFactor:c,milestoneZoom:h,choiceZoom:u,bossZoom:d,speedPressure:f}=e,g=Zt(n),v=i==="running_attached"||i==="running_charging"||i==="running_airborne",m=1+Math.min(.65,n/420);v&&(this.railX+=g.cameraSpeed*f*m*t),this.railX=Math.max(this.railX,a.x-g.cameraLookAhead);const p=r.isGigantic?r.resolvedX+.4:this.railX+g.cameraLookAhead,M=r.isGigantic?r.resolvedY:r.resolvedY*.64+o.resolvedY*.36,_=Math.pow(l,.85),T=a.y-M,L=Yt.clamp(.28+Math.min(.36,Math.abs(T)/12)+_*.18,.28,.64),P=Yt.lerp(M,a.y,L);this.targetFocus.set(p,P);const C=a.x>=this.currentFocus.x-.08?Math.max(12,g.cameraCatchupSpeed*4.2):Math.max(4.4,g.cameraCatchupSpeed*1.25),N=be(this.currentFocus.x,this.targetFocus.x,r.isGigantic?C*2.6:C,t);this.currentFocus.x=r.isGigantic?N:Math.max(this.currentFocus.x,a.x-.08,N),this.currentFocus.y=be(this.currentFocus.y,this.targetFocus.y,r.isGigantic?7.8:1.95+_*1.7,t);const S=g.momentumZoomRange*Math.pow(l,.82);this.targetZoom=g.baseZoom+S+g.largeShardZoom*c+h+u+d,this.currentZoom=be(this.currentZoom,this.targetZoom,r.isGigantic?14.5:i==="upgrade_branching"?1.9:2.6,t),this.position.set(this.currentFocus.x-zn.CAMERA_CENTER_OFFSET,this.currentFocus.y+.18,this.currentZoom),this.lookAt.set(this.currentFocus.x,this.currentFocus.y,0);const E=Math.max(.5,window.innerWidth/Math.max(1,window.innerHeight)),U=Math.tan(Yt.degToRad(this.fov*.5))*this.currentZoom,z=U*E;this.safeLeft=this.lookAt.x-z*.94,this.safeRight=this.lookAt.x+z*.94,this.safeTop=this.lookAt.y+U*.94,this.safeBottom=this.lookAt.y-U*.94}isBehindSafeLine(e){return e.x<this.safeLeft}isOutsideVerticalBounds(e,t=.02){const n=(this.safeTop-this.safeBottom)*t;return e.y<=this.safeBottom+n||e.y>=this.safeTop-n}getPose(){return{position:this.position.clone(),lookAt:this.lookAt.clone()}}getZoom(){return this.currentZoom}getSafeLeft(){return this.safeLeft}getSafeRight(){return this.safeRight}};y(zn,"CAMERA_CENTER_OFFSET",1.6);let so=zn;const Oi=class Oi{constructor(e){y(this,"group",new Rt);y(this,"mesh");y(this,"texture");y(this,"layout");y(this,"currentFrame",-1);this.layout=e.layout,this.texture=Oi.getTexture(e.textureUrl,e.layout),this.mesh=new vt(new Kn(e.width,e.height),new ni({map:this.texture,transparent:!0,alphaTest:e.alphaTest??.04,side:e.doubleSided?zt:mi,depthWrite:!1})),this.mesh.position.y=e.offsetY??0,this.mesh.renderOrder=e.renderOrder??10,this.group.add(this.mesh),this.setFrame(0)}static preload(e,t){Oi.getTexture(e,t)}setVisible(e){this.group.visible=e}setScale(e){this.group.scale.setScalar(e)}setFrame(e){if(e===this.currentFrame)return;this.currentFrame=e;const{columns:t,rows:i}=this.layout,n=e%t,r=Math.floor(e/t);this.texture.offset.set(n/t,1-(r+1)/i)}playLoop(e,t,i){if(e.length===0)return;const n=Math.floor(i*Math.max(.01,t))%e.length;this.setFrame(e[n])}setTexture(e){const t=Oi.getTexture(e,this.layout);t!==this.texture&&(this.texture=t,this.mesh.material.map=t,this.mesh.material.needsUpdate=!0,this.currentFrame=-1,this.setFrame(0))}static getTexture(e,t){const i=this.textureCache.get(e);if(i)return i;const n=this.loader.load(e);return n.colorSpace=dt,n.wrapS=Gt,n.wrapT=Gt,n.repeat.set(1/t.columns,1/t.rows),n.minFilter=It,n.magFilter=It,n.generateMipmaps=!0,this.textureCache.set(e,n),n}};y(Oi,"loader",new Mc),y(Oi,"textureCache",new Map);let pi=Oi;const xl=new URL("/assets/coinsheetsprite-D59jzRYr.png",import.meta.url).href;class u_{constructor(e,t){y(this,"group",new Rt);y(this,"pool",[]);pi.preload(xl,{columns:4,rows:1});for(let i=0;i<36;i+=1){const n=new pi({textureUrl:xl,layout:{columns:4,rows:1},width:.86,height:.86,alphaTest:.08,doubleSided:!0,offsetY:.02,renderOrder:14});n.setVisible(!1),this.pool.push(n),this.group.add(n.group)}this.group.visible=!1,e.add(this.group),this.setTheme(t)}setTheme(e){}setVisible(e){this.group.visible=e}reset(){this.pool.forEach(e=>{e.setVisible(!1)})}update(e,t){this.pool.forEach((i,n)=>{const r=e[n];if(!r||!r.visible){i.setVisible(!1);return}i.setVisible(!0),i.group.position.copy(r.position),i.group.rotation.set(0,0,0),i.setScale(r.scale*.72*(1+Math.sin(t*4+n)*.05)),i.playLoop([0,1,2,3],4,t+n*.05)})}}const yl=new URL("/assets/Spritsheetennemielight-DT4FCziT.png",import.meta.url).href,Sl=new URL("/assets/Spritsheetennemiedark-CLp4gdga.png",import.meta.url).href;class d_{constructor(e,t){y(this,"group",new Rt);y(this,"pool",[]);y(this,"theme");this.theme=t,pi.preload(yl,{columns:2,rows:2}),pi.preload(Sl,{columns:2,rows:2});for(let i=0;i<18;i+=1){const n=new Rt,r=new pi({textureUrl:this.getEnemySpriteUrl(),layout:{columns:2,rows:2},width:2.1,height:2.1,alphaTest:.08,doubleSided:!0,renderOrder:14});r.mesh.material.depthTest=!1;const o=new vt(new _o(.12,.34,3),new ni({color:t==="dark"?"#393F4A":"#D4BF9B",transparent:!0,opacity:.95}));o.material.depthTest=!1,o.rotation.z=Math.PI,n.add(r.group,o),n.visible=!1,this.pool.push({activeId:null,group:n,body:r,backArrow:o,deathStartedAt:0,dying:!1}),this.group.add(n)}this.group.visible=!1,e.add(this.group)}setTheme(e){this.theme=e}setVisible(e){this.group.visible=e}reset(){this.pool.forEach(e=>{e.activeId=null,e.dying=!1,e.group.visible=!1})}update(e,t){const i=new Set(e.filter(n=>n.visible).map(n=>n.id));this.pool.forEach(n=>{n.activeId&&!i.has(n.activeId)&&!n.dying&&n.group.visible&&(n.dying=!0,n.deathStartedAt=t)}),this.pool.forEach((n,r)=>{const o=e[r];if(!o||!o.visible){if(n.dying){const l=t-n.deathStartedAt;if(l>=.32){n.group.visible=!1,n.activeId=null,n.dying=!1;return}n.group.visible=!0,n.body.setTexture(this.getEnemySpriteUrl()),n.body.playLoop([2,3],9.5,l);const c=Math.max(0,1-l/.32);n.body.mesh.material.opacity=c,n.backArrow.material.opacity=c;return}n.group.visible=!1,n.activeId=null;return}n.activeId=o.id,n.dying=!1,n.group.visible=!0,n.body.setTexture(this.getEnemySpriteUrl()),n.body.mesh.material.opacity=1,n.body.mesh.material.color.set(o.tier==="invincible"?"#F06A5A":"#FFFFFF"),n.body.playLoop([0,1],o.tier==="invincible"?7.4:o.tier==="elite"?6.8:5.6,t+r*.07),n.backArrow.material.color.set(this.theme==="dark"?"#393F4A":"#D4BF9B"),n.backArrow.material.opacity=.95,n.group.position.copy(o.position),n.group.position.z+=.34,n.group.rotation.set(0,0,0);const a=o.tier==="elite"?1.44:o.tier==="armored"?1.28:o.tier==="invincible"?1.58:1.16;n.group.scale.setScalar(a),n.body.group.scale.set(1,o.pole==="south"?-1:1,1),n.backArrow.position.set(0,o.pole==="north"?-.84:.84,0),n.backArrow.rotation.z=o.pole==="north"?Math.PI:0})}getEnemySpriteUrl(){return this.theme==="dark"?Sl:yl}}const Ml=["shop","treasure","gift","mini_boss","rare_item"];class f_{constructor(){y(this,"queuedEvents",new Map);y(this,"bossConsumed",!1);y(this,"shopQueued",!1)}reset(){this.queuedEvents.clear(),this.bossConsumed=!1,this.shopQueued=!1}schedulePostMilestoneEvents(e,t,i){const n=Zt(t),r=i()<n.eventChance?i()<.42?2:1:0;for(let o=0;o<r;o+=1){const a=e+10+Math.floor(i()*11)+o*3;if(this.queuedEvents.has(a))continue;const l=!this.shopQueued&&e>=10?"shop":Ml[Math.floor(i()*Ml.length)]??"gift";this.queuedEvents.set(a,l),l==="shop"&&(this.shopQueued=!0)}}consumePlannedEvent(e,t){if(!this.bossConsumed&&t>=150&&e>=150)return this.bossConsumed=!0,"boss";const i=this.queuedEvents.get(e);return i?(this.queuedEvents.delete(e),i):"none"}}const p_=["shop","treasure","gift","mini_boss","rare_item"],Qt=["round","oval","triangular"],ei=["round","oval","triangular"],ti=["round","oval","triangular"];function Ze(s,e,t,i,n,r,o){return{id:s,difficulty:e,verticality:t,movementType:i,allowedShardSizes:n,allowedShapeKinds:r,eventCompatibility:p_,nodes:o}}const bl=[Ze("easy_01","easy","low","static",["tiny","very_small","small","medium_small"],Qt,[{x:10,y:1,coinAngles:[Math.PI*.5]},{x:21,y:-1},{x:33,y:2,enemyPole:"north"},{x:46,y:0,coinAngles:[Math.PI*1.35]}]),Ze("easy_02","easy","medium","static",["tiny","small","medium_small","medium"],Qt,[{x:9,y:3},{x:20,y:5,coinAngles:[Math.PI*.25]},{x:33,y:2},{x:47,y:-1,enemyPole:"south"}]),Ze("easy_03","easy","medium","moving",["very_small","small","medium_small"],Qt,[{x:11,y:-3,motionPattern:"vertical"},{x:22,y:1},{x:34,y:4,coinAngles:[Math.PI*.75]},{x:47,y:2,motionPattern:"horizontal"}]),Ze("easy_04","easy","low","moving",["tiny","very_small","small"],Qt,[{x:8,y:2},{x:18,y:-1,motionPattern:"drift"},{x:30,y:0},{x:43,y:3,coinAngles:[Math.PI*1.75]}]),Ze("easy_05","easy","high","static",["small","medium_small","medium"],Qt,[{x:10,y:5},{x:20,y:8},{x:31,y:4,enemyPole:"north"},{x:44,y:1}]),Ze("easy_06","easy","high","moving",["very_small","small","medium_small"],Qt,[{x:10,y:-4,motionPattern:"vertical"},{x:21,y:-7,coinAngles:[Math.PI*.9]},{x:33,y:-3,motionPattern:"micro_orbit"},{x:45,y:1}]),Ze("easy_07","easy","medium","static",["small","medium_small","medium"],Qt,[{x:11,y:1},{x:23,y:6},{x:36,y:5},{x:50,y:0,coinAngles:[Math.PI*.4],enemyPole:"south"}]),Ze("easy_08","easy","medium","moving",["tiny","very_small","small","medium_small"],Qt,[{x:9,y:-2,motionPattern:"horizontal"},{x:19,y:1},{x:31,y:-3,coinAngles:[Math.PI*1.1]},{x:43,y:2,motionPattern:"vertical"}]),Ze("easy_09","easy","low","static",["small","medium_small","medium"],Qt,[{x:12,y:0},{x:25,y:2},{x:39,y:-2,enemyPole:"north"},{x:54,y:1}]),Ze("easy_10","easy","medium","moving",["tiny","very_small","small"],Qt,[{x:10,y:4,motionPattern:"vertical"},{x:21,y:1},{x:33,y:-2,coinAngles:[Math.PI*.6]},{x:46,y:-5,motionPattern:"drift"}]),Ze("medium_01","medium","medium","moving",["small","medium_small","medium","medium_large"],ei,[{x:12,y:5,motionPattern:"vertical"},{x:25,y:2,sizeTier:"medium"},{x:39,y:8,coinAngles:[Math.PI*.2],enemyPole:"north"},{x:54,y:4,motionPattern:"horizontal"},{x:69,y:1}]),Ze("medium_02","medium","high","moving",["small","medium_small","medium","medium_large"],ei,[{x:13,y:-6},{x:27,y:-2,motionPattern:"drift"},{x:40,y:4,sizeTier:"medium_large"},{x:55,y:8,coinAngles:[Math.PI*1.5]},{x:71,y:3,enemyPole:"south"}]),Ze("medium_03","medium","medium","static",["very_small","small","medium_small","medium"],ei,[{x:11,y:3,sizeTier:"small"},{x:23,y:-1,sizeTier:"medium_small"},{x:36,y:5,sizeTier:"very_large",coinAngles:[Math.PI*.95]},{x:52,y:1,sizeTier:"small"}]),Ze("medium_04","medium","high","moving",["very_small","small","medium_small","medium_large"],ei,[{x:12,y:7,motionPattern:"vertical"},{x:26,y:2},{x:40,y:-4,motionPattern:"micro_orbit"},{x:54,y:-8,enemyPole:"north"},{x:70,y:-2,coinAngles:[Math.PI*.4]}]),Ze("medium_05","medium","medium","moving",["small","medium_small","medium","large"],ei,[{x:12,y:1},{x:24,y:6,motionPattern:"horizontal"},{x:39,y:1,sizeTier:"large"},{x:55,y:-3,coinAngles:[Math.PI*1.2]},{x:71,y:2}]),Ze("medium_06","medium","high","moving",["tiny","small","medium_small","medium"],ei,[{x:10,y:-5,sizeTier:"tiny"},{x:22,y:3,motionPattern:"drift"},{x:36,y:9,sizeTier:"medium_large",coinAngles:[Math.PI*.1]},{x:52,y:5},{x:68,y:-1,enemyPole:"south"}]),Ze("medium_07","medium","medium","static",["small","medium_small","medium","medium_large"],ei,[{x:13,y:-2},{x:28,y:4,sizeTier:"medium_large"},{x:43,y:7,sizeTier:"medium"},{x:58,y:1,coinAngles:[Math.PI*.65]},{x:74,y:-2}]),Ze("medium_08","medium","high","moving",["small","medium_small","medium","large"],ei,[{x:12,y:6,motionPattern:"vertical"},{x:26,y:-2},{x:40,y:-8,motionPattern:"horizontal"},{x:56,y:-3,sizeTier:"large",enemyPole:"north"},{x:72,y:4,coinAngles:[Math.PI*1.4]}]),Ze("medium_09","medium","medium","moving",["very_small","small","medium_small","medium"],ei,[{x:11,y:2,sizeTier:"very_small"},{x:24,y:8,motionPattern:"drift"},{x:40,y:4},{x:56,y:-1,enemyPole:"south"},{x:72,y:3,coinAngles:[Math.PI*.5]}]),Ze("medium_10","medium","high","moving",["small","medium_small","medium","very_large"],ei,[{x:12,y:-7,motionPattern:"vertical"},{x:27,y:-1,sizeTier:"small"},{x:42,y:6,sizeTier:"very_large"},{x:58,y:9,coinAngles:[Math.PI*.3],enemyPole:"north"},{x:76,y:2}]),Ze("hard_01","hard","high","moving",["small","medium_small","medium","large","very_large"],ti,[{x:14,y:7,motionPattern:"vertical"},{x:31,y:0,sizeTier:"large"},{x:48,y:-8,motionPattern:"micro_orbit",enemyPole:"north"},{x:66,y:-1,coinAngles:[Math.PI*1.5]},{x:86,y:6,sizeTier:"very_large"}]),Ze("hard_02","hard","high","moving",["tiny","small","medium_small","medium","large"],ti,[{x:13,y:-8,sizeTier:"tiny"},{x:30,y:-2,motionPattern:"drift"},{x:47,y:6,sizeTier:"medium_large"},{x:66,y:10,coinAngles:[Math.PI*.95]},{x:86,y:1,enemyPole:"south"}]),Ze("hard_03","hard","medium","moving",["small","medium_small","medium","large","very_large"],ti,[{x:15,y:2,sizeTier:"very_large"},{x:33,y:7,motionPattern:"horizontal"},{x:51,y:1,sizeTier:"small"},{x:70,y:-6,motionPattern:"vertical"},{x:91,y:0,coinAngles:[Math.PI*.2],enemyPole:"north"}]),Ze("hard_04","hard","high","moving",["tiny","small","medium_small","large"],ti,[{x:14,y:9,sizeTier:"tiny"},{x:31,y:2},{x:49,y:-7,motionPattern:"horizontal"},{x:68,y:-10,sizeTier:"large",coinAngles:[Math.PI*1.1]},{x:90,y:-1,enemyPole:"south"}]),Ze("hard_05","hard","high","moving",["small","medium_small","medium","medium_large","huge"],ti,[{x:15,y:-3},{x:32,y:8,sizeTier:"huge"},{x:50,y:2,motionPattern:"micro_orbit"},{x:70,y:-9,sizeTier:"small",enemyPole:"north"},{x:92,y:-4,coinAngles:[Math.PI*.55]}]),Ze("hard_06","hard","medium","moving",["tiny","small","medium_small","medium","large"],ti,[{x:14,y:5,sizeTier:"small"},{x:31,y:-4,motionPattern:"vertical"},{x:49,y:5,sizeTier:"tiny"},{x:69,y:11,motionPattern:"drift",enemyPole:"south"},{x:91,y:4,coinAngles:[Math.PI*.25]}]),Ze("expert_01","expert","high","moving",["tiny","small","medium_small","large","very_large"],ti,[{x:16,y:10,sizeTier:"tiny",motionPattern:"vertical"},{x:36,y:1,sizeTier:"large"},{x:57,y:-10,motionPattern:"micro_orbit",enemyPole:"north"},{x:79,y:0,sizeTier:"very_large"},{x:103,y:9,coinAngles:[Math.PI*1.65]}]),Ze("expert_02","expert","high","moving",["tiny","small","medium_small","medium","huge"],ti,[{x:17,y:-11,sizeTier:"tiny"},{x:37,y:-2,motionPattern:"drift"},{x:59,y:9,sizeTier:"huge"},{x:82,y:12,motionPattern:"horizontal",enemyPole:"south"},{x:107,y:1,coinAngles:[Math.PI*.15]}]),Ze("expert_03","expert","medium","moving",["small","medium_small","medium","large","massive"],ti,[{x:16,y:2,sizeTier:"massive"},{x:38,y:10,motionPattern:"vertical"},{x:61,y:0,sizeTier:"small"},{x:85,y:-10,motionPattern:"drift",enemyPole:"north"},{x:111,y:-1,coinAngles:[Math.PI*1.1]}]),Ze("expert_04","expert","high","moving",["tiny","small","medium","large","very_large"],ti,[{x:15,y:8,motionPattern:"horizontal"},{x:35,y:-7,sizeTier:"tiny"},{x:57,y:11,sizeTier:"large"},{x:81,y:-9,motionPattern:"micro_orbit",enemyPole:"south"},{x:108,y:3,coinAngles:[Math.PI*.35]}])],m_={easy:{easy:70,medium:30,hard:0,expert:0},medium:{easy:40,medium:40,hard:20,expert:0},hard:{easy:0,medium:20,hard:60,expert:20},expert:{easy:0,medium:10,hard:55,expert:35}};function g_(s,e,t){const i=Zt(s),n=m_[i.band],r=new Set(t.slice(-3)),o=bl.filter(h=>!r.has(h.id)&&n[h.difficulty]>0),a=o.length>0?o:bl.filter(h=>n[h.difficulty]>0),l=a.reduce((h,u)=>h+n[u.difficulty],0);let c=e()*l;for(const h of a)if(c-=n[h.difficulty],c<=0)return h;return a[a.length-1]}function Gr(s,e){if(s.length===0)return!1;const t=e.slice(Math.max(0,e.length-8));let i=e[e.length-1]??null;for(const n of s){const r=Zt(n.index);if(i){const o=n.x-i.x,a=n.y-i.y,l=Math.hypot(o,a),c=Ds(i)+Ds(n),h=v_(i,n,o,a,c,r.maxVerticalDelta);if(l<c||l>r.maxJumpDistance||!h&&Math.abs(a)>r.maxVerticalDelta||!h&&n.x<i.x+Math.max(2.8,n.gameplayRadius*.75))return!1}for(const o of t)if(o.isMilestone&&__(n,o)||Math.hypot(n.x-o.x,n.y-o.y)<Ds(n)+Ds(o)||Math.abs(n.x-o.x)<Math.max(1.25,(n.gameplayRadius+o.gameplayRadius)*.42)&&Math.abs(n.y-o.y)<Math.max(1.7,(n.gameplayRadius+o.gameplayRadius)*.54))return!1;if(Math.abs(n.y)>28)return!1;t.push(n),t.length>8&&t.shift(),i=n}return!0}function __(s,e){const t=e.x-Dt*3,i=e.x+Dt*5.1;return s.x>=t&&s.x<=i}function Ds(s){const e=s.gameplayRadius<1.15?.72:s.gameplayRadius<1.9?1.05:1.38;return s.gameplayRadius+s.visualScale*.14+e}function v_(s,e,t,i,n,r){if(s.isGigantic||e.isGigantic||El(s)||El(e))return!1;const o=Math.abs(t)<=Math.max(2.1,n*.34),a=Math.abs(i)>=Math.max(4.8,n*1.02),l=Math.abs(i)<=r*2.35,c=t>=.28;return o&&a&&l&&c}function El(s){return s.sizeTier==="large"||s.sizeTier==="very_large"||s.sizeTier==="huge"||s.sizeTier==="massive"}function x_(s,e,t){return t<=e||!s[t]?!1:t<s.length-4}function y_(s,e){if(s.shapeKind==="round")return 0;const t=s.spinDirection==="cw"?-1:1,i=s.shapeKind==="oval"?.38:.92;return s.motionSeed+e*s.spinSpeed*i*t}function qs(s,e,t){const i=Zt(Math.max(s.index,t));let n=s.x,r=s.y;if(s.index>t+1&&s.motionPattern!=="none"){const o=e*(.48+i.movementSpeed*.66)+s.motionSeed,a=i.movementAmplitude*(.44+s.visualScale*.08);s.motionPattern==="vertical"?r+=Math.sin(o)*a*.95:s.motionPattern==="horizontal"?(n+=Math.cos(o*.82)*a*.7,r+=Math.sin(o*.54)*a*.2):s.motionPattern==="micro_orbit"?(n+=Math.sin(o*.55)*a*.34,r+=Math.cos(o*.94)*a*.7):s.motionPattern==="drift"&&(n+=Math.cos(o*.42)*a*.46,r+=Math.sin(o*.42)*a*.46)}return{...s,resolvedX:n,resolvedY:r,resolvedZ:s.z,resolvedSpinPhase:y_(s,e)}}const Tl={tiny:{radius:[.42,.6],visual:[.34,.54],orbitPeriod:[1.6,2.1]},very_small:{radius:[.6,.86],visual:[.54,.82],orbitPeriod:[2,2.5]},small:{radius:[.86,1.18],visual:[.82,1.18],orbitPeriod:[2.4,2.9]},medium_small:{radius:[1.18,1.58],visual:[1.18,1.72],orbitPeriod:[2.8,3.5]},medium:{radius:[1.58,2.08],visual:[1.72,2.36],orbitPeriod:[3.2,4]},medium_large:{radius:[2.08,2.74],visual:[2.36,3.12],orbitPeriod:[3.8,4.8]},large:{radius:[2.74,3.54],visual:[3.12,4.16],orbitPeriod:[4.4,5.6]},very_large:{radius:[3.54,4.52],visual:[4.16,5.7],orbitPeriod:[5.4,6.8]},huge:{radius:[4.52,5.9],visual:[5.7,7.9],orbitPeriod:[6.8,8.4]},massive:{radius:[5.9,7.4],visual:[7.9,11.2],orbitPeriod:[8.4,9.8]}},S_=["tiny","very_small","small","medium_small","medium","medium_large","large","very_large","huge","massive"],Us=Dt*2.3,Al=Dt,js=Dt*3,Ac=Dt*1.35,wc=Dt*.45;function M_(s){return{start:s-js,end:s+js+Ac+wc}}class b_{constructor(){y(this,"nodes",[]);y(this,"eventSystem",new f_);y(this,"seed",1);y(this,"recentPatternIds",[])}reset(){this.seed=Math.random()*2147483647|1,this.recentPatternIds=[],this.eventSystem.reset(),this.nodes=[{index:0,x:-12,y:.8,z:0,gameplayRadius:1.86,visualScale:1.92,pathDistance:0,direction:"right",kind:"normal",sizeTier:"medium",shapeKind:"round",spinDirection:"cw",spinSpeed:.18,motionPattern:"none",eventType:"none",colorHint:"none",gameplayOrbitPeriod:3.6,branchSlot:null,offerId:null,onboarding:!0,isMilestone:!1,isGigantic:!1,coinSlots:[{angle:Math.PI*.4,value:1,collected:!1,orbitScale:1}],enemySlot:null,motionSeed:this.nextRandom()*Math.PI*2,visualStretch:{x:1,y:1,z:1}}]}prebuild(e){this.nodes.length===0&&this.reset(),this.append(Math.max(0,e-this.nodes.length))}ensureAhead(e,t=50,i=30){this.nodes.length-e>t||this.append(i)}queuePostMilestoneEvents(e,t){this.eventSystem.schedulePostMilestoneEvents(e,t,()=>this.nextRandom())}getInitialNodes(e){return this.prebuild(Math.max(180,e+60)),this.nodes.slice(0,e)}getInitialPositions(e){return this.getInitialNodes(e).map(t=>({x:t.x,y:t.y,z:t.z}))}getNode(e){return this.ensureAhead(e+1),this.nodes[e]||null}getWindow(e,t,i,n){return this.ensureAhead(e+t),this.nodes.slice(e,e+t).map(r=>qs(r,i,n))}getResolvedNode(e,t,i){this.ensureAhead(e+1);const n=this.nodes[e]??this.nodes[this.nodes.length-1];return qs(n,t,i)}replaceFuture(e,t){const i=this.nodes.slice(0,e+1),n=i[i.length-1]??null,r=[];t.forEach((o,a)=>{r.push(this.reindexNode(o,e+a+1,a===0?n:r[a-1]))}),this.nodes=[...i,...r]}createUpgradeBranches(e,t,i){const n=this.getNode(e);if(!n)return[];const r=i<50?8.4:7.2,o=n.x+js,a=[{slot:0,yBias:r*2,direction:"up_right"},{slot:1,yBias:0,direction:"right"},{slot:2,yBias:-r*2,direction:"down_right"}];return t.slice(0,3).map((l,c)=>{const h=a[c]??a[1],u="medium",d=Tl[u],f=d.radius[0]+this.nextRandom()*(d.radius[1]-d.radius[0]),g=d.visual[0]+this.nextRandom()*(d.visual[1]-d.visual[0]),v=d.orbitPeriod[0]+this.nextRandom()*(d.orbitPeriod[1]-d.orbitPeriod[0]),m=this.buildNode({previous:n,index:e+1,x:o,y:n.y+h.yBias,direction:h.direction,sizeTier:u,shapeKind:"round",motionPattern:"none",spinDirection:c===1?"cw":"ccw",spinSpeed:.14+c*.03+this.nextRandom()*.04,gameplayRadius:f,visualScale:g,gameplayOrbitPeriod:v,visualStretch:{x:1,y:1,z:1},kind:"branch",branchSlot:h.slot,offerId:l.item.id,onboarding:!1,eventType:"none",colorHint:"reward",isMilestone:!1,isGigantic:!1,coinSlots:[{angle:Math.PI*.5,value:1,collected:!1,orbitScale:1}],enemySlot:null});return{mode:"reward_branch",offer:l,entry:m,previewNodes:[m],pathNodes:[m]}})}getTeleportTarget(e,t){this.ensureAhead(e+t+60);const i=Math.min(this.nodes.length-5,e+t);return x_(this.nodes,e,i)?i:-1}sampleAtDistance(e){this.nodes.length===0&&this.prebuild(2);const t=Math.max(0,e);let i=this.nodes[0];for(let a=1;a<this.nodes.length;a+=1){const l=this.nodes[a];if(l.pathDistance>=t){const c=Math.max(1e-4,l.pathDistance-i.pathDistance),h=Ge((t-i.pathDistance)/c,0,1),u=i.x+(l.x-i.x)*h,d=i.y+(l.y-i.y)*h,f=Math.hypot(l.x-i.x,l.y-i.y)||1;return{x:u,y:d,z:0,tangent:{x:(l.x-i.x)/f,y:(l.y-i.y)/f}}}i=l}const n=this.nodes[this.nodes.length-1],r=this.nodes[this.nodes.length-2]??n,o=Math.hypot(n.x-r.x,n.y-r.y)||1;return{x:n.x,y:n.y,z:0,tangent:{x:(n.x-r.x)/o,y:(n.y-r.y)/o}}}append(e){if(e<=0)return;let t=0;for(;t<e;){const i=g_(this.nodes.length,()=>this.nextRandom(),this.recentPatternIds),n=this.instantiatePattern(i);this.nodes.push(...n),this.recentPatternIds.push(i.id),this.recentPatternIds.length>6&&this.recentPatternIds.shift(),t+=n.length}}instantiatePattern(e){const t=this.nodes[this.nodes.length-1],i=t.index,r=Zt(i).spacing/11.5,o=e.nodes.map((c,h)=>{const u=t.index+h+1;return this.buildTemplateNode(t,u,c,e,r,i)}),a=this.isolateMilestones(this.densifyPattern(t,o,i),t,i);let l;return Gr(a,this.nodes)?l=a:Gr(o,this.nodes)?l=o:l=this.buildFallbackPattern(t),this.reserveMilestones(t,this.expandLanePresence(t,l,i),i)}reserveMilestones(e,t,i){if(t.length===0)return t;const n=[];let r=e;return t.forEach(o=>{const a=Math.hypot(o.x-r.x,o.y-r.y),l=In(r.pathDistance),c=In(r.pathDistance+a),h=zr(l,c);let u={...o};if(h!==null){const f=Us/1.1500000000000001,g=Us+Al,v=Math.max(o.x,r.x+g);u=this.buildNode({previous:r,index:r.index+1,x:v,y:0,direction:"right",sizeTier:"massive",shapeKind:"round",motionPattern:"none",spinDirection:"cw",spinSpeed:.04,gameplayRadius:Us,visualScale:f,gameplayOrbitPeriod:5.4,visualStretch:{x:1,y:1,z:1},kind:"milestone",branchSlot:null,offerId:null,onboarding:!1,eventType:"none",colorHint:"none",isMilestone:!0,isGigantic:!0,coinSlots:[],enemySlot:null})}const d=this.reindexNode(u,r.index+1,r);n.push(d),r=d}),this.isolateMilestones(n,e,i)}buildTemplateNode(e,t,i,n,r,o){const a=this.pickShapeKind(n.allowedShapeKinds,o),c=i.sizeTier??this.pickSizeTier(n.allowedShardSizes,o),h=e.x+i.x*r,u=e.y+i.y*r*1.14,d=this.alignToLane(u,o,c,!1),f=Math.hypot(h-e.x,d-e.y),g=In(e.pathDistance),v=In(e.pathDistance+f),m=zr(g,v)!==null,p=m,M=p?"massive":c,_=Tl[M],T=p?14.4+this.nextRandom()*2.6:_.radius[0]+this.nextRandom()*(_.radius[1]-_.radius[0]),L=p?38+this.nextRandom()*14:_.visual[0]+this.nextRandom()*(_.visual[1]-_.visual[0]),P=p?5.4+this.nextRandom()*.8:_.orbitPeriod[0]+this.nextRandom()*(_.orbitPeriod[1]-_.orbitPeriod[0]),C=this.directionFrom(e.x,e.y,h,d),N=this.resolveEventType(t,g,v,o,i),S=p?"none":this.pickMotionPattern(i.motionPattern,o,a,M),E=this.nextRandom()<.5?"cw":"ccw",U=a==="triangular"?.42+this.nextRandom()*.22:a==="oval"?.18+this.nextRandom()*.1:.08+this.nextRandom()*.12,z=a==="oval"?{x:1.72+this.nextRandom()*.38,y:.68+this.nextRandom()*.12,z:.82+this.nextRandom()*.1}:a==="triangular"?{x:1.18+this.nextRandom()*.18,y:1.24+this.nextRandom()*.16,z:.64+this.nextRandom()*.12}:{x:1,y:1,z:1},K=m?"milestone":N==="none"?"normal":N==="boss_weak"?"boss_weak":"event",I=m?"accent":N==="boss"||N==="boss_weak"?"danger":N==="none"?"none":"accent",O=m||N!=="none";return this.buildNode({previous:e,index:t,x:h,y:d,direction:C,sizeTier:M,shapeKind:a,motionPattern:S,spinDirection:E,spinSpeed:U,gameplayRadius:T,visualScale:O?L*1.08:L,gameplayOrbitPeriod:P,visualStretch:z,kind:K,branchSlot:null,offerId:null,onboarding:t<50,eventType:N,colorHint:I,isMilestone:m,isGigantic:p,coinSlots:this.buildCoinSlots(i,N,o),enemySlot:this.buildEnemySlot(i,o,N,a)})}buildFallbackPattern(e){const t=e.index,i=Zt(t),n=[],r=4;for(let o=0;o<r;o+=1){const a=e.index+o+1,l=o===0?e:n[o-1],c=l.y>9?"down_right":l.y<-9||o%2===0?"up_right":"down_right",h=c==="up_right"?{x:1,y:.66}:c==="down_right"?{x:1,y:-.66}:{x:1,y:0},u=i.spacing*(.68+this.nextRandom()*.16),d=l.x+h.x*u,f=this.alignToLane(l.y+h.y*u*1.08,t,o%2===0?"small":"medium_small",!0);n.push(this.buildNode({previous:l,index:a,x:d,y:f,direction:c,sizeTier:o%2===0?"small":"medium_small",shapeKind:this.pickShapeKind(["round","oval","triangular"],t),motionPattern:i.roundMovementUnlocked?"vertical":"none",spinDirection:"cw",spinSpeed:.14,gameplayRadius:o%2===0?1.12:1.46,visualScale:o%2===0?1.2:1.58,gameplayOrbitPeriod:o%2===0?2.8:3.2,visualStretch:{x:1,y:1,z:1},kind:"normal",branchSlot:null,offerId:null,onboarding:a<50,eventType:"none",colorHint:"none",isMilestone:!1,isGigantic:!1,coinSlots:o===1?[{angle:Math.PI*.6,value:1,collected:!1,orbitScale:1}]:[],enemySlot:null}))}return n}densifyPattern(e,t,i){if(t.length===0)return t;const n=Zt(i),r=[];let o=e,a=0;const l=i>=50&&i%36<12;t.forEach(h=>{const u=h.x-o.x,d=h.y-o.y,f=Math.hypot(u,d),g=Math.abs(d)<n.maxVerticalDelta*.2;a=g?a+1:0;const v=i<50,m=Math.max(h.gameplayRadius,o.gameplayRadius),p=m<1.05?4:m<1.9?2:1;if(i<160&&(f>n.spacing*(v?.82:1.02)||Math.abs(d)>n.maxVerticalDelta*.62||a>=(v?1:2)||l)){const _=v||l||f>n.spacing*1.28||Math.abs(d)>n.maxVerticalDelta*.92?2:1,T=Math.min(p,_+(v&&p>1?1:0));for(let L=0;L<T;L+=1){const P=(L+1)/(T+1),C=(o.index+h.index+L)%2===0?1:-1,N=(T-1)*.5,S=(L-N)*(v?2.45:1.85),E=g?S+C*(v?.85:.55):Math.sign(d||C)*Math.min(v?2.8:2.2,Math.abs(d)*.34)+S*.4,U=r[r.length-1]??o,z=o.x+u*P+(T>=3?(L-N)*.18:0),K=o.y+d*P+E,I=T>=3||L===0?"tiny":"very_small",O=this.alignToLane(K,i,I,!0);r.push(this.buildNode({previous:U,index:U.index+1,x:z,y:O,direction:this.directionFrom(U.x,U.y,z,O),sizeTier:I,shapeKind:this.pickShapeKind(["round","oval","triangular"],i),motionPattern:i>=40&&L===T-1?"vertical":"none",spinDirection:this.nextRandom()<.5?"cw":"ccw",spinSpeed:.1+this.nextRandom()*.08,gameplayRadius:I==="tiny"?.78:.96,visualScale:I==="tiny"?.86:1.08,gameplayOrbitPeriod:I==="tiny"?2.4:2.75,visualStretch:{x:1,y:1,z:1},kind:"normal",branchSlot:null,offerId:null,onboarding:h.index<50,eventType:"none",colorHint:"none",isMilestone:!1,isGigantic:!1,coinSlots:[],enemySlot:null}))}}r.push(this.reindexNode(h,(r[r.length-1]??o).index+1,r[r.length-1]??o)),o=r[r.length-1]??o});const c=[];return r.forEach((h,u)=>{c.push(this.reindexNode(h,e.index+u+1,u===0?e:c[u-1]))}),c}expandLanePresence(e,t,i){if(t.length===0)return t;const n=i<50?8.4:7.2,r=[-n,0,n],o=[-n*1.65,-n*.82,0,n*.82,n*1.65],a=[],l=i>=50&&i%42<16;t.forEach(h=>{const u=a[a.length-1]??e,d=this.forceLargeShardCenter(h,i),f=this.reindexNode(d,u.index+1,u);if(a.push(f),f.isMilestone||f.isGigantic||["large","very_large","huge","massive"].includes(f.sizeTier))return;const v=i<50,m=f.sizeTier==="tiny"||f.sizeTier==="very_small"||f.sizeTier==="small"||f.sizeTier==="medium_small",p=v&&m;if(!(p||l||this.nextRandom()<.42))return;const _=(f.sizeTier==="tiny"||f.sizeTier==="very_small"||f.sizeTier==="small")&&p||l&&this.nextRandom()<.36,T=_?o:r,L=_?2:1,P=this.getLaneIndex(f.y,n,_),C=this.buildCompanionLaneOrder(P,T.length),N=f.sizeTier==="tiny"||f.sizeTier==="very_small"||f.sizeTier==="small"?_?4:v?2:1:f.sizeTier==="medium_small"||f.sizeTier==="medium"?_?3:v?2:1:0;for(let S=0;S<N;S+=1){const E=C[S];if(E===void 0)break;const U=a[a.length-1]??e,z=this.pickCompanionSizeTier(f.sizeTier),K=(S-(N-1)*.5)*(_?.12:.18),I=f.x+.5+K+(this.nextRandom()-.5)*(p?.16:.12),O=T[E]+(this.nextRandom()-.5)*(z==="tiny"?.82:z==="very_small"?.64:.5),H=E!==L&&this.nextRandom()<.34,J=this.buildNode({previous:U,index:U.index+1,x:I,y:O,direction:this.directionFrom(U.x,U.y,I,O),sizeTier:z,shapeKind:this.pickShapeKind(["round","oval","triangular"],i),motionPattern:v?"none":this.nextRandom()<.16?"vertical":"none",spinDirection:this.nextRandom()<.5?"cw":"ccw",spinSpeed:.08+this.nextRandom()*.08,gameplayRadius:z==="tiny"?.78:z==="very_small"?.9:1.06,visualScale:z==="tiny"?.88:z==="very_small"?1.02:1.16,gameplayOrbitPeriod:z==="tiny"?2.36:z==="very_small"?2.58:2.9,visualStretch:{x:1,y:1,z:1},kind:"normal",branchSlot:null,offerId:null,onboarding:U.index<50,eventType:"none",colorHint:"none",isMilestone:!1,isGigantic:!1,coinSlots:H?[{angle:Math.PI*(.35+this.nextRandom()*1.2),value:1,collected:!1,orbitScale:1}]:[],enemySlot:null});Gr([J],[...this.nodes,...a])&&a.push(J)}});const c=[];return a.forEach((h,u)=>{c.push(this.reindexNode(h,e.index+u+1,u===0?e:c[u-1]))}),c}buildNode(e){const t=e.previous,i=t?Math.hypot(e.x-t.x,e.y-t.y):0;return{index:e.index,x:e.x,y:e.y,z:0,gameplayRadius:e.gameplayRadius,visualScale:e.visualScale,pathDistance:t?t.pathDistance+i:0,direction:e.direction,kind:e.kind,sizeTier:e.sizeTier,shapeKind:e.shapeKind,spinDirection:e.spinDirection,spinSpeed:e.spinSpeed,motionPattern:e.motionPattern,eventType:e.eventType,colorHint:e.colorHint,gameplayOrbitPeriod:e.gameplayOrbitPeriod,branchSlot:e.branchSlot,offerId:e.offerId,onboarding:e.onboarding,isMilestone:e.isMilestone,isGigantic:e.isGigantic,coinSlots:e.coinSlots,enemySlot:e.enemySlot,motionSeed:this.nextRandom()*Math.PI*2,visualStretch:e.visualStretch}}alignToLane(e,t,i,n){const r=t<50?8.4:7.2,o=[-r,0,r],a=i==="massive"||i==="huge"||i==="very_large",l=i==="medium"||i==="medium_large"||i==="large";if(a)return Yt.clamp(e*.35,-r,r);const c=e>r*.35?2:e<-r*.35?0:1;let h=c;n&&!l&&this.nextRandom()<.42?h=[0,1,2][Math.floor(this.nextRandom()*3)]??c:n&&l&&this.nextRandom()<.2&&(h=c===1?this.nextRandom()<.5?0:2:c);const u=a?.32:l?.44:.58;return o[h]+(this.nextRandom()-.5)*u}getLaneIndex(e,t,i=!1){return i?e>t*1.24?4:e>t*.38?3:e<-t*1.24?0:e<-t*.38?1:2:e>t*.42?2:e<-t*.42?0:1}buildCompanionLaneOrder(e,t){const i=[];for(let n=1;n<t;n+=1){const r=e-n,o=e+n;o<t&&i.push(o),r>=0&&i.push(r)}return i}pickCompanionSizeTier(e){switch(e){case"tiny":case"very_small":return"tiny";case"small":case"medium_small":return this.nextRandom()<.5?"tiny":"very_small";case"medium":return this.nextRandom()<.5?"very_small":"small";default:return"small"}}forceLargeShardCenter(e,t){if(!["large","very_large","huge","massive"].includes(e.sizeTier)||e.isMilestone||e.isGigantic)return e;const i=this.alignToLane(0,t,e.sizeTier,!1);return{...e,y:i}}reindexNode(e,t,i){return this.buildNode({previous:i,index:t,x:e.x,y:e.y,direction:e.direction,sizeTier:e.sizeTier,shapeKind:e.shapeKind,motionPattern:e.motionPattern,spinDirection:e.spinDirection,spinSpeed:e.spinSpeed,gameplayRadius:e.gameplayRadius,visualScale:e.visualScale,gameplayOrbitPeriod:e.gameplayOrbitPeriod,visualStretch:e.visualStretch,kind:e.kind,branchSlot:e.branchSlot,offerId:e.offerId,onboarding:!1,eventType:e.eventType,colorHint:e.colorHint,isMilestone:e.isMilestone,isGigantic:e.isGigantic,coinSlots:e.coinSlots.map(n=>({...n})),enemySlot:e.enemySlot?{...e.enemySlot}:null})}buildCoinSlots(e,t,i){var r;const n=((r=e.coinAngles)==null?void 0:r.map(o=>({angle:o,value:t==="treasure"?3:1,collected:!1,orbitScale:1})))??[];return n.length===0&&i<12&&n.push({angle:Math.PI*(.2+this.nextRandom()*1.6),value:1,collected:!1,orbitScale:1}),n}buildEnemySlot(e,t,i,n){if(!Zt(t).enemyUnlocked||i==="shop"||i==="gift"||n!=="round")return null;const o=e.enemyPole??(this.nextRandom()<.24?this.nextRandom()<.5?"north":"south":null);if(!o)return null;const a=t<60?"light":t<120?this.nextRandom()<.7?"armored":"light":this.nextRandom()<.18?"invincible":this.nextRandom()<.55?"elite":"armored",l=a==="light"?4.6:a==="armored"?6.4:a==="elite"?8.1:Number.POSITIVE_INFINITY;return{pole:o,tier:a,alive:!0,rewardCoins:a==="elite"?10:a==="armored"?8+Math.floor(this.nextRandom()*2):a==="light"?5+Math.floor(this.nextRandom()*4):0,speedThreshold:l}}pickSizeTier(e,t){const i=Zt(t),n=S_.filter(a=>e.includes(a)),r=Ge(Math.floor(i.normalized*(n.length-1)+4),0,n.length-1),o=n.slice(0,r+1);return o[Math.floor(this.nextRandom()*o.length)]??"medium"}pickShapeKind(e,t){const i=Ge(t/220,0,1),n={round:.9-i*.22,oval:.08+i*.16,triangular:.02+i*.08},r=e.length>0?e:["round"],o=r.reduce((l,c)=>l+(n[c]??0),0);let a=this.nextRandom()*o;for(const l of r)if(a-=n[l]??0,a<=0)return l;return r[0]??"round"}isolateMilestones(e,t,i){if(!e.some(a=>a.isMilestone))return e;const n=i<50?8.4:7.2,r=[];e.forEach((a,l)=>{let c={...a};if(c.isMilestone){const d=Us+Al;c={...c,x:Math.max(c.x,(r[l-1]??t).x+d),y:0}}const h=r[l-1]??t;if(h.isMilestone){const d=js+Ac+wc;c={...c,x:Math.max(c.x,h.x+d),y:Math.abs(c.y)<n*1.7?c.y>=0?n*2.2:-n*2.2:c.y}}const u=[...r,t].filter(d=>d.isMilestone).reduce((d,f)=>d?Math.abs(f.x-c.x)<Math.abs(d.x-c.x)?f:d:f,null);if(u&&!c.isMilestone){const d=M_(u.x);c.x>=d.start&&c.x<=d.end&&(c={...c,x:d.end+Math.max(Dt*.92,c.gameplayRadius*.42),y:Math.abs(c.y)<n*1.9?c.y>=0?n*2.5:-n*2.5:c.y})}r.push(c)});const o=[];return r.forEach((a,l)=>{o.push(this.reindexNode(a,t.index+l+1,l===0?t:o[l-1]))}),o}pickMotionPattern(e,t,i,n){const r=Zt(t);if(i!=="round"||!r.roundMovementUnlocked||["large","very_large","huge","massive"].includes(n))return"none";const o=r.movingShardChance*(t<50?.55:1);if(e&&e!=="none"&&this.nextRandom()<o+.18)return e;if(this.nextRandom()>o)return"none";const a=["vertical","horizontal"];return a[Math.floor(this.nextRandom()*a.length)]??"none"}resolveEventType(e,t,i,n,r){if(zr(t,i)!==null)return"none";if(r.sizeTier==="massive"&&n>=150)return"boss_weak";const o=this.eventSystem.consumePlannedEvent(e,n);if(o!=="none")return o;if(i>=100&&r.sizeTier!=="massive"){const a=i<250?.028:i<600?.042:.056;if(this.nextRandom()<a){const l=this.nextRandom();return l<.16?"shop":l<.46?"gift":l<.72?"rare_item":"treasure"}}return"none"}directionFrom(e,t,i,n){const r=i-e,o=n-t;return Math.abs(o)<1.5?"right":o>0?r<0?"up_left":Math.abs(r)<1.2?"up":"up_right":r<0?"down_left":"down_right"}nextRandom(){return this.seed=this.seed*48271%2147483647,this.seed/2147483647}}const wl="portfolio-game-highscore",Pl="portfolio-game-best-distance",Cl="portfolio-game-best-splits";class E_{constructor(){y(this,"shardsLanded",0);y(this,"distanceMeters",0);y(this,"coins",0);y(this,"runStartTime",0);y(this,"splitTimes",{});y(this,"bestShards",Number(window.localStorage.getItem(wl)||0));y(this,"bestDistanceMeters",Number(window.localStorage.getItem(Pl)||0));y(this,"bestSplitTimes",this.readSplits())}reset(e=performance.now()){this.shardsLanded=0,this.distanceMeters=0,this.coins=0,this.runStartTime=e,this.splitTimes={}}recordLanding(e,t,i){const n=this.distanceMeters;this.shardsLanded=Math.max(this.shardsLanded,e),this.distanceMeters=Math.max(this.distanceMeters,In(t));for(const r of[10,100,1e3]){if(n>=r||this.distanceMeters<r||this.splitTimes[r]!==void 0)continue;const o=Math.max(0,i-this.runStartTime)/1e3;this.splitTimes[r]=o;const a=this.bestSplitTimes[r];(a===void 0||o<a)&&(this.bestSplitTimes[r]=o,this.persist())}this.shardsLanded>this.bestShards&&(this.bestShards=this.shardsLanded,this.persist()),this.distanceMeters>this.bestDistanceMeters&&(this.bestDistanceMeters=this.distanceMeters,this.persist())}addCoins(e){this.coins+=e}canAfford(e){return this.coins>=e}spendCoins(e){return this.coins<e?!1:(this.coins-=e,!0)}getSnapshot(){return{shardsLanded:this.shardsLanded,bestShards:this.bestShards,distanceMeters:this.distanceMeters,bestDistanceMeters:this.bestDistanceMeters,coins:this.coins,splitTimes:{...this.splitTimes},bestSplitTimes:{...this.bestSplitTimes}}}fillHud(e){e.score=this.shardsLanded,e.highscore=this.bestShards,e.distanceMeters=this.distanceMeters,e.bestDistanceMeters=this.bestDistanceMeters,e.coins=this.coins,e.splitTimes={...this.splitTimes}}readSplits(){const e=window.localStorage.getItem(Cl);if(!e)return{};try{return JSON.parse(e)}catch{return{}}}persist(){window.localStorage.setItem(wl,String(this.bestShards)),window.localStorage.setItem(Pl,String(this.bestDistanceMeters)),window.localStorage.setItem(Cl,JSON.stringify(this.bestSplitTimes))}}const Rl="#D9624E";class T_{constructor(e,t){y(this,"group",new Rt);y(this,"pool",[]);y(this,"activeOffers",[]);y(this,"open",!1);const i=new Oe(t==="dark"?Rl:"#8E4130");for(let n=0;n<3;n+=1){const r=new vt(new Qn(.34,0),new ni({color:i,transparent:!0,opacity:.94}));r.visible=!1,this.pool.push(r),this.group.add(r)}this.group.visible=!1,e.add(this.group)}setTheme(e){const t=new Oe(e==="dark"?Rl:"#8E4130");this.pool.forEach(i=>i.material.color.copy(t))}reset(){this.open=!1,this.activeOffers=[],this.group.visible=!1,this.pool.forEach(e=>{e.visible=!1})}openForRun(e,t){const i=Math.max(0,Math.min(.45,t.modifiers.shopDiscount)),n=Ln(e,t);return this.activeOffers=n.slice(0,3).map((r,o)=>({angle:Math.PI*(.2+o*.55),price:this.getPriceForOffer(r,i),purchased:!1,offer:r})),this.open=this.activeOffers.length>0,this.group.visible=this.open,n}isOpen(){return this.open}getActiveOffers(){return this.activeOffers.map(e=>({offer:e.offer,price:e.price,angle:e.angle,purchased:e.purchased}))}getHints(e){return this.activeOffers.map((t,i)=>{var n,r,o;return{mode:"shop_orbit",offer:t.offer,price:t.price,entry:{index:i,x:((n=e[i])==null?void 0:n.x)??0,y:((r=e[i])==null?void 0:r.y)??0,z:((o=e[i])==null?void 0:o.z)??0,gameplayRadius:.5,visualScale:.5,pathDistance:0,direction:"right",kind:"event",sizeTier:"tiny",shapeKind:"round",spinDirection:"cw",spinSpeed:0,motionPattern:"none",eventType:"shop",colorHint:"accent",gameplayOrbitPeriod:1,branchSlot:i,offerId:t.offer.item.id,onboarding:!1,isMilestone:!1,isGigantic:!1,coinSlots:[],enemySlot:null,motionSeed:0,visualStretch:{x:1,y:1,z:1}},previewNodes:[],pathNodes:[]}})}tryPurchase(e,t){if(!this.open)return null;for(const i of this.activeOffers){if(i.purchased)continue;if(A_(e,i.angle)<.22&&t>=i.price)return i.purchased=!0,this.close(),{offer:i.offer,price:i.price}}return null}update(e,t,i){if(!this.open){this.group.visible=!1;return}this.group.visible=!0,this.pool.forEach((n,r)=>{const o=this.activeOffers[r];if(!o||o.purchased){n.visible=!1;return}n.visible=!0,n.position.set(e.x+Math.cos(o.angle)*(t+1.6),e.y+Math.sin(o.angle)*(t+1.6),0),n.rotation.y=i*1.4+r*.35,n.scale.setScalar(1+Math.sin(i*3+r)*.06)})}close(){this.open=!1,this.group.visible=!1,this.pool.forEach(e=>{e.visible=!1})}getPriceForOffer(e,t){const i=e.item.rarity==="legendary"?11:e.item.rarity==="epic"?8:e.item.rarity==="rare"?5:e.item.rarity==="uncommon"?3:2;return Math.max(1,Math.round((i+e.stackCount)*(1-t)))}}function A_(s,e){return Math.abs(((s-e)%(Math.PI*2)+Math.PI*3)%(Math.PI*2)-Math.PI)}const Ns="#D9624E";class w_{constructor(e,t){y(this,"group",new Rt);y(this,"bossMesh");y(this,"weakPointMesh");y(this,"phase","idle");y(this,"phaseEndsAt",0);y(this,"active",!1);y(this,"defeated",!1);y(this,"weakPointVisible",!1);y(this,"weakPointPosition",new w);this.bossMesh=new vt(new Qn(2.8,1),new ni({color:t==="dark"?Ns:"#8E4130",transparent:!0,opacity:.9})),this.weakPointMesh=new vt(new xo(.78,0),new ni({color:Ns,transparent:!0,opacity:.96})),this.bossMesh.visible=!1,this.weakPointMesh.visible=!1,this.group.add(this.bossMesh,this.weakPointMesh),e.add(this.group)}setTheme(e){this.bossMesh.material.color.set(e==="dark"?Ns:"#8E4130"),this.weakPointMesh.material.color.set(Ns)}reset(){this.active=!1,this.defeated=!1,this.phase="idle",this.phaseEndsAt=0,this.weakPointVisible=!1,this.bossMesh.visible=!1,this.weakPointMesh.visible=!1}start(e){this.active=!0,this.defeated=!1,this.phase="chase",this.phaseEndsAt=e+6,this.bossMesh.visible=!0}isActive(){return this.active&&!this.defeated}isWeakPointPhase(){return this.phase==="weak_point"}getSpeedPressure(){return this.phase==="chaos"?1.24:this.phase==="chase"?1.12:1}getCameraZoomOffset(){return this.active?this.phase==="weak_point"?9.5:this.phase==="chaos"?5.6:3.2:0}update(e,t,i){return!this.active||this.defeated?(this.bossMesh.visible=!1,this.weakPointMesh.visible=!1,{playerHit:!1}):(t>=this.phaseEndsAt&&(this.phase==="chase"?(this.phase="chaos",this.phaseEndsAt=t+8):this.phase==="chaos"&&(this.phase="weak_point",this.phaseEndsAt=t+10,this.weakPointVisible=!0)),this.bossMesh.visible=!0,this.bossMesh.position.set(i.x-(this.phase==="weak_point"?10.5:8.6),i.y+Math.sin(t*1.2)*2.4,0),this.bossMesh.rotation.y+=e*.32,this.bossMesh.rotation.z+=e*.18,this.bossMesh.scale.setScalar(this.phase==="chaos"?1.2:1),this.weakPointMesh.visible=this.weakPointVisible,this.weakPointVisible&&(this.weakPointMesh.position.copy(this.weakPointPosition),this.weakPointMesh.rotation.y+=e*1.8,this.weakPointMesh.scale.setScalar(1+Math.sin(t*6)*.08)),{playerHit:this.phase!=="weak_point"&&this.bossMesh.position.distanceTo(i)<2.2})}setWeakPoint(e){this.weakPointPosition.copy(e),this.weakPointVisible=this.phase==="weak_point"}defeat(){this.defeated=!0,this.active=!1,this.phase="defeated",this.weakPointVisible=!1,this.bossMesh.visible=!1,this.weakPointMesh.visible=!1}}const Ll="#D9624E",P_="#F06A5A",Il=["#FF4B4B","#47D76B","#4B74FF"],Dl=["#4B74FF","#FF4B4B","#47D76B"],C_="/assets/images/Logo/logomodedark.svg",R_=new URL("/assets/Spritsheetboat-B2KEN6Zw.png",import.meta.url).href,L_=new URL("/assets/Spritsheetboost-BHKqpfTz.png",import.meta.url).href;function ui(s){const e=Math.PI*2;return(s%e+e)%e}function Fs(s,e){const t=Math.PI*2;return((s-e+Math.PI)%t+t)%t-Math.PI}class I_{constructor(e,t){y(this,"root",new Rt);y(this,"player",new Rt);y(this,"playerMainSprite");y(this,"playerBoostSprite");y(this,"playerTrail",new Kr);y(this,"trailPoints",Array.from({length:8},()=>new w));y(this,"trailBuffer",new Float32Array(this.trailPoints.length*3));y(this,"path",new b_);y(this,"camera",new so);y(this,"stats",new E_);y(this,"coins");y(this,"enemies");y(this,"shop");y(this,"boss");y(this,"scoreListeners",new Set);y(this,"playerPosition",new w);y(this,"playerVelocity",new w);y(this,"playerVelocityTarget",new w);y(this,"scratchVector",new w);y(this,"scratchVectorB",new w);y(this,"scratchVector2",new re);y(this,"impactWaves",new Map);y(this,"theme");y(this,"hudSnapshot",{state:"transition",score:0,highscore:0,distanceMeters:0,bestDistanceMeters:0,coins:0,splitTimes:{},chargeRatio:0,momentumGauge:0,momentumTier:0,orbitGraceActive:!1,orbitGraceProgress:1,offers:[],branchHints:[],inventoryItems:[],landingFeedback:null,acquisition:null,gameOverCause:null});y(this,"momentum",{gauge:0,fillRate:0,decayRate:.12,speedMultiplier:1,jumpMultiplier:1,cameraZoomMultiplier:0});y(this,"state","idle");y(this,"playerState","attached");y(this,"currentTime",0);y(this,"attachedIndex",0);y(this,"displayWindowIndices",[]);y(this,"displayNextIndex",0);y(this,"score",0);y(this,"orbitGraceActive",!1);y(this,"orbitGraceProgress",1);y(this,"orbitGraceTravel",0);y(this,"chargeActive",!1);y(this,"chargeMeter",0);y(this,"orbitAngle",Math.PI*.18);y(this,"orbitDirection",-1);y(this,"angularSpeed",0);y(this,"lastLandingDirection",0);y(this,"choiceMode","none");y(this,"activeChoices",[]);y(this,"activeShopAngles",[]);y(this,"acquisition",null);y(this,"landingFeedback",null);y(this,"acquisitionStartedAt",0);y(this,"acquisitionDuration",.9);y(this,"landingFeedbackStartedAt",0);y(this,"landingFeedbackDuration",1.35);y(this,"gameOverStartedAt",0);y(this,"gameOverCause",null);y(this,"jumpVisualUntil",0);y(this,"landingVisualUntil",0);y(this,"runUpgrades",gl());y(this,"remainingExtraJumps",0);y(this,"phaseJumpReadyAt",0);y(this,"teleportReadyAt",0);y(this,"warpReadyAt",0);y(this,"shieldCharges",0);y(this,"eventCooldownUntil",0);y(this,"autoFireReadyAt",0);y(this,"milestoneChoiceCache",new Map);this.theme=t,this.playerMainSprite=new pi({textureUrl:R_,layout:{columns:2,rows:2},width:2.3,height:1.16,alphaTest:.08,offsetY:.18,renderOrder:15}),this.playerBoostSprite=new pi({textureUrl:L_,layout:{columns:2,rows:2},width:2.4,height:1.2,alphaTest:.08,offsetY:.18,renderOrder:15}),this.player.add(this.playerMainSprite.group,this.playerBoostSprite.group),this.player.visible=!1,this.root.add(this.player);const i=new St;i.setAttribute("position",new Lt(this.trailBuffer,3)),this.playerTrail=new Kr(i,new fo({color:t==="dark"?"#D4BF9B":"#393F4A",transparent:!0,opacity:.42})),this.playerTrail.visible=!1,this.root.add(this.playerTrail),e.add(this.root),this.coins=new u_(e,t),this.enemies=new d_(e,t),this.shop=new T_(e,t),this.boss=new w_(e,t)}get currentState(){return this.state}get currentScore(){return this.score}get bestScore(){return this.stats.getSnapshot().bestShards}setTheme(e){this.theme=e,this.playerTrail.material.color.set(e==="dark"?"#D4BF9B":"#393F4A"),this.coins.setTheme(e),this.enemies.setTheme(e),this.shop.setTheme(e),this.boss.setTheme(e)}onScoreChange(e){return this.scoreListeners.add(e),()=>this.scoreListeners.delete(e)}startTransition(){this.resetRunState(),this.path.reset(),this.path.prebuild(180),this.camera.reset(this.getResolvedNode(0)),this.state="transition_in",this.root.visible=!0,this.player.visible=!1,this.playerTrail.visible=!1}beginRun(){const e=this.state==="transition_in";this.resetRunState(),e||(this.path.reset(),this.path.prebuild(180)),this.root.visible=!0,this.player.visible=!0,this.playerTrail.visible=!0,this.attachToNode(0,!1,null,null),this.camera.reset(this.getResolvedNode(0)),this.state="running_attached",this.emitScore()}restart(){this.beginRun()}prepareReturnTransition(){this.state="transition_out",this.chargeActive=!1,this.choiceMode="none",this.activeChoices=[],this.shop.reset(),this.boss.reset(),this.coins.reset(),this.enemies.reset(),this.player.visible=!1,this.playerTrail.visible=!1}stop(){this.state="idle",this.root.visible=!1,this.player.visible=!1,this.playerTrail.visible=!1,this.shop.reset(),this.boss.reset(),this.coins.reset(),this.enemies.reset(),this.camera.reset(this.getResolvedNode(0))}resetRunState(){this.stats.reset(performance.now()),this.score=0,this.chargeActive=!1,this.chargeMeter=0,this.choiceMode="none",this.activeChoices=[],this.activeShopAngles=[],this.acquisition=null,this.landingFeedback=null,this.acquisitionStartedAt=0,this.landingFeedbackStartedAt=0,this.gameOverStartedAt=0,this.gameOverCause=null,this.jumpVisualUntil=0,this.landingVisualUntil=0,this.currentTime=0,this.attachedIndex=0,this.displayWindowIndices=[],this.displayNextIndex=0,this.orbitGraceActive=!1,this.orbitGraceProgress=1,this.orbitGraceTravel=0,this.lastLandingDirection=0,this.playerState="attached",this.orbitAngle=Math.PI*.18,this.orbitDirection=-1,this.angularSpeed=0,this.playerPosition.set(0,0,0),this.playerVelocity.set(0,0,0),this.playerVelocityTarget.set(0,0,0),this.runUpgrades=gl(),this.remainingExtraJumps=0,this.phaseJumpReadyAt=0,this.teleportReadyAt=0,this.warpReadyAt=0,this.shieldCharges=0,this.eventCooldownUntil=0,this.autoFireReadyAt=0,this.milestoneChoiceCache.clear(),this.momentum.gauge=0,this.momentum.fillRate=0,this.momentum.decayRate=.12,this.momentum.speedMultiplier=1,this.momentum.jumpMultiplier=1,this.momentum.cameraZoomMultiplier=0,this.impactWaves.clear(),this.playerTrail.geometry.setDrawRange(0,this.trailPoints.length),this.trailPoints.forEach(e=>e.set(0,0,0)),this.playerMainSprite.setScale(1),this.playerBoostSprite.setScale(1),this.coins.reset(),this.enemies.reset(),this.shop.reset(),this.boss.reset()}getInitialPlatformPositions(e){return this.path.prebuild(Math.max(160,e+60)),this.path.getInitialNodes(e).map(t=>new w(t.x,t.y,t.z))}getInitialPlatformScales(e){return this.path.prebuild(Math.max(160,e+60)),this.path.getInitialNodes(e).map(t=>t.visualScale)}getInitialPlatformVisuals(e){return this.path.prebuild(Math.max(160,e+60)),this.initializeDisplayWindow(e),this.getVisiblePlatformVisuals(e)}getVisiblePlatformPositions(e){return this.getDisplayNodes(e).map(t=>new w(t.resolvedX,t.resolvedY,t.resolvedZ))}getVisiblePlatformScales(e){return this.getDisplayNodes(e).map(t=>t.visualScale)}getVisiblePlatformVisuals(e){return this.getDisplayNodes(e).map(i=>{const n=i.index===this.attachedIndex&&this.playerState!=="airborne",r=ui(this.orbitAngle-(i.shapeKind==="round"?0:i.resolvedSpinPhase)),o=n&&this.orbitGraceActive?this.orbitGraceProgress:1,a=this.getVisualWaveState(i),l=Math.max(this.camera.getSafeLeft(),this.playerPosition.x-Dt*1.35),c=i.resolvedX+this.getPhysicalRadius(i),h=Ge(1-(c-l)/4.2,0,1),u=i.index<this.attachedIndex?Ge((this.playerPosition.x-(i.resolvedX+this.getPhysicalRadius(i)*.32))/Math.max(2.2,Dt*.92),0,1):0,d=Math.max(h,u),f=i.isMilestone?.003:i.shapeKind==="round"?.018:i.shapeKind==="oval"?.038:.048,g=i.isMilestone?.18:i.shapeKind==="round"?.52:i.shapeKind==="oval"?.68:.78,v=g+.42+this.momentum.gauge*.34,m=n?Yt.lerp(g,v,o):Math.max(g,(a==null?void 0:a.density)??g),p=i.isMilestone?.012+o*.02:f+.18+o*.12+this.momentum.gauge*.46,M=this.getSpecialAccent(i);return{scale:new w(i.visualScale*i.visualStretch.x,i.visualScale*i.visualStretch.y,i.visualScale*i.visualStretch.z),shapeKind:i.shapeKind,spinDirection:i.spinDirection,spinSpeed:i.spinSpeed,spinPhase:i.resolvedSpinPhase,tint:i.colorHint==="danger"?P_:i.eventType==="shop"||i.colorHint==="reward"?this.getThemeShardColor():i.colorHint==="accent"&&!i.isMilestone?M??Ll:null,ringTint:i.colorHint==="reward"?this.getRewardRingColor(i):i.eventType==="shop"?M??Ll:null,ringScale:i.colorHint==="reward"||i.eventType==="shop"?Math.max(i.visualStretch.x,i.visualStretch.y)*i.visualScale*1.48:0,stripeTint:null,stripeMix:0,stripePhase:0,pulse:i.isMilestone?.18:i.eventType==="shop"?.48:i.colorHint==="reward"?.68:i.eventType!=="none"?.34:Ge(this.momentum.gauge*.22,0,.22),deformAngle:n?r:(a==null?void 0:a.angle)??0,deformStrength:n?p:Math.max(f,(a==null?void 0:a.strength)??0)+(i.isMilestone?0:d*.16),deformDensity:m,fragmentAmount:d}})}getRecommendedVisibleCount(){const e=this.state==="transition_in"?72:64,t=Math.round(this.momentum.cameraZoomMultiplier*18),i=this.choiceMode==="reward_branch"?12:this.choiceMode==="shop_orbit"?8:0,n=this.path.getNode(this.attachedIndex),r=this.path.getNode(this.attachedIndex+1),o=n!=null&&n.isGigantic||r!=null&&r.isGigantic?18:(n==null?void 0:n.eventType)!=="none"||(r==null?void 0:r.eventType)!=="none"?10:0;return Math.max(56,Math.min(124,e+t+i+o))}setChargeActive(e){if(this.state==="idle"||this.state==="transition_in"||this.state==="transition_out"||this.state==="game_over")return!1;if(e)return this.chargeActive=!0,this.playerState==="attached"&&(this.playerState="charging",this.state==="running_attached"&&(this.state="running_charging")),!1;const t=this.chargeActive&&(this.playerState==="charging"||this.playerState==="attached")&&(this.state==="running_charging"||this.state==="running_attached"||this.state==="upgrade_branching");return this.chargeActive=!1,t?this.launch():!1}triggerJump(){return this.state==="idle"||this.state==="transition_in"||this.state==="transition_out"||this.state==="game_over"?!1:this.playerState==="attached"||this.playerState==="charging"?(this.chargeActive=!1,this.launch()):this.performAirAction()}selectUpgradeFallback(e){if(this.state!=="upgrade_branching")return!1;if(this.choiceMode==="shop_orbit"){const t=this.activeChoices[e];return!t||t.price===void 0||!this.stats.spendCoins(t.price)?!1:(this.applyOffer(t.offer,"Shop item"),this.shop.reset(),this.choiceMode="none",this.activeChoices=[],this.activeShopAngles=[],this.state="upgrade_acquired",this.eventCooldownUntil=this.currentTime+.6,!0)}return this.choiceMode!=="reward_branch"?!1:this.commitRewardBranch(e,!0)}closeShopChoice(){return this.choiceMode!=="shop_orbit"||this.state!=="upgrade_branching"?!1:(this.shop.reset(),this.choiceMode="none",this.activeChoices=[],this.activeShopAngles=[],this.state=this.playerState==="airborne"?"running_airborne":this.chargeActive?"running_charging":"running_attached",this.eventCooldownUntil=this.currentTime+.18,!0)}getCameraPose(){return this.camera.getPose()}getHudState(){const e=Ge(this.momentum.gauge/Math.max(1,this.runUpgrades.modifiers.momentumCap),0,1);return this.stats.fillHud(this.hudSnapshot),this.hudSnapshot.state=this.getHudStateValue(),this.hudSnapshot.chargeRatio=Ge(this.chargeMeter,0,1),this.hudSnapshot.momentumGauge=e,this.hudSnapshot.momentumTier=Math.min(4,Math.floor(e*5)),this.hudSnapshot.orbitGraceActive=this.orbitGraceActive,this.hudSnapshot.orbitGraceProgress=this.orbitGraceProgress,this.hudSnapshot.offers=this.activeChoices.map(t=>t.offer),this.hudSnapshot.branchHints=this.getBranchHints(),this.hudSnapshot.inventoryItems=this.runUpgrades.ownedOrder.map(t=>{const i=bo.find(n=>n.id===t);return{id:t,name:(i==null?void 0:i.name.en)??t,description:(i==null?void 0:i.description.en)??t,count:this.runUpgrades.counts[t]??1,iconSrc:C_}}),this.hudSnapshot.landingFeedback=this.landingFeedback,this.hudSnapshot.acquisition=this.acquisition,this.hudSnapshot.gameOverCause=this.gameOverCause,this.hudSnapshot}update(e,t){if(this.state==="idle")return;if(this.currentTime=t,this.state==="transition_in"||this.state==="transition_out"){this.updateMomentum(e);return}this.path.ensureAhead(this.attachedIndex),this.updateMomentum(e),this.prewarmUpcomingMilestones();let i=this.getResolvedNode(this.attachedIndex),n=this.getResolvedNode(this.attachedIndex+1);if(this.state==="game_over"){this.updateCamera(e,i,n),this.updateTrail(e),this.syncPlayerVisual(t),this.syncMarkers(t);return}const r=this.attachedIndex;if(this.playerState==="airborne"?this.updateAirborne(e):this.updateAttached(e,i),(this.attachedIndex!==r||this.playerState!=="airborne")&&(i=this.getResolvedNode(this.attachedIndex),n=this.getResolvedNode(this.attachedIndex+1)),this.advanceDisplayAnchor(),this.updateEvents(e,t,i),this.updateCamera(e,i,n),this.updateTrail(e),this.syncPlayerVisual(t),this.syncMarkers(t),!(i.isMilestone&&this.playerState!=="airborne")){if(this.isOutsidePlayableField(this.playerPosition)?this.failRun("out_of_bounds"):this.camera.isBehindSafeLine(this.playerPosition)&&this.failRun("camera"),this.acquisition){const o=Ge((t-this.acquisitionStartedAt)/this.acquisitionDuration,0,1);this.acquisition.progress=o,o>=1&&(this.acquisition=null)}if(this.landingFeedback){const o=Ge((t-this.landingFeedbackStartedAt)/this.landingFeedbackDuration,0,1);this.landingFeedback.progress=o,o>=1&&(this.landingFeedback=null)}}}getHudStateValue(){return this.state==="game_over"?"game_over":this.state==="transition_in"||this.state==="transition_out"?"transition":this.state==="upgrade_branching"?"upgrade_choice":"running"}emitScore(){this.scoreListeners.forEach(e=>e())}getResolvedNode(e){return this.path.getResolvedNode(Math.max(0,e),this.currentTime,this.attachedIndex)}getDisplayNodes(e){if(this.choiceMode==="reward_branch"&&this.activeChoices.length>0){this.initializeDisplayWindow(e);const t=this.getResolvedNode(this.attachedIndex),i=this.activeChoices.map(h=>qs(h.entry,this.currentTime,this.attachedIndex)),n=t.resolvedX-Dt*3,r=Math.max(...i.map(h=>h.resolvedX),t.resolvedX)+Dt,o=this.displayWindowIndices.map(h=>this.getResolvedNode(h)).filter(h=>h.index===t.index||h.resolvedX<n||h.resolvedX>r);o.push(t,...i),o.sort((h,u)=>h.resolvedX-u.resolvedX);const a=[],l=new Set;o.forEach(h=>{const u=`${h.index}:${Math.round(h.resolvedX*100)}:${Math.round(h.resolvedY*100)}`;l.has(u)||(l.add(u),a.push(h))});const c=a[a.length-1]??t;for(;a.length<e;)a.push({...c,resolvedX:c.resolvedX+320+a.length*6,resolvedY:c.resolvedY+180,resolvedZ:c.resolvedZ,visualScale:1e-4,gameplayRadius:1e-4,shapeKind:"round",colorHint:"none",eventType:"none",isMilestone:!1,isGigantic:!1,coinSlots:[],enemySlot:null,resolvedSpinPhase:0,spinSpeed:0,visualStretch:{x:1,y:1,z:1}});return a.slice(0,e)}return this.initializeDisplayWindow(e),this.displayWindowIndices.slice(0,e).map(t=>this.getResolvedNode(t))}advanceDisplayAnchor(){if(this.displayWindowIndices.length!==0)for(let e=0;e<this.displayWindowIndices.length;e+=1){const t=this.displayWindowIndices[e],i=this.getResolvedNode(t);if(!(i.resolvedX+this.getPhysicalRadius(i)+5.5<this.camera.getSafeLeft()))continue;this.path.ensureAhead(this.displayNextIndex+1);const r=this.getResolvedNode(this.displayNextIndex);r.resolvedX-this.getPhysicalRadius(r)>this.camera.getSafeRight()+2.8&&(this.displayWindowIndices[e]=this.displayNextIndex,this.displayNextIndex+=1)}}initializeDisplayWindow(e){if(this.displayWindowIndices.length===0){this.path.ensureAhead(e+1),this.displayWindowIndices=Array.from({length:e},(t,i)=>i),this.displayNextIndex=e;return}if(this.displayWindowIndices.length<e)for(this.path.ensureAhead(e+1);this.displayWindowIndices.length<e;)this.displayWindowIndices.push(this.displayNextIndex),this.displayNextIndex+=1}updateMomentum(e){const t=1-Math.min(.72,this.runUpgrades.modifiers.momentumRetention),i=this.momentum.decayRate*t;this.orbitGraceActive&&this.playerState!=="airborne"||(this.momentum.gauge=Ge(this.momentum.gauge-i*e,0,1));const n=1+this.momentum.gauge*.6+this.runUpgrades.modifiers.speedBonus,r=1+this.momentum.gauge*.48+this.runUpgrades.modifiers.chargedLeapBonus*.12,o=this.momentum.gauge*1.4;this.momentum.speedMultiplier=be(this.momentum.speedMultiplier,n,2.4,e),this.momentum.jumpMultiplier=be(this.momentum.jumpMultiplier,r,2.6,e),this.momentum.cameraZoomMultiplier=be(this.momentum.cameraZoomMultiplier,o,2.2,e),this.momentum.fillRate=be(this.momentum.fillRate,0,4.6,e)}updateAttached(e,t){const i=this.getOrbitSample(t,this.orbitAngle),n=Math.max(1,i.position.length()),r=Math.PI*2/Math.max(1.6,t.gameplayOrbitPeriod),o=this.chargeActive?.55+this.chargeMeter*.45:0,a=r*(1+o+this.momentum.gauge*.42)*this.momentum.speedMultiplier*(1+this.runUpgrades.modifiers.chargeRate*.06+this.runUpgrades.modifiers.speedBonus*.3),l=t.isGigantic?.58:1;this.angularSpeed=be(this.angularSpeed,a*l,this.chargeActive?2.6:1.7,e),this.orbitAngle=ui(this.orbitAngle+this.orbitDirection*this.angularSpeed*e);const c=this.getOrbitSample(t,this.orbitAngle);if(this.playerPosition.set(t.resolvedX+c.position.x,t.resolvedY+c.position.y,t.resolvedZ),this.playerVelocity.set(c.tangent.x*n*this.angularSpeed*this.orbitDirection,c.tangent.y*n*this.angularSpeed*this.orbitDirection,0),this.orbitGraceActive&&(this.orbitGraceTravel+=Math.abs(this.angularSpeed*e),this.orbitGraceProgress=Ge(this.orbitGraceTravel/(Math.PI*2),0,1),this.orbitGraceProgress>=1&&(this.orbitGraceActive=!1)),this.chargeActive){const h=.55+this.runUpgrades.modifiers.chargeRate*.24;this.chargeMeter=Ge(this.chargeMeter+e*h,0,1),this.state==="running_attached"&&(this.state="running_charging"),this.playerState==="attached"&&(this.playerState="charging")}else this.chargeMeter=be(this.chargeMeter,0,4.2,e),this.playerState==="charging"&&(this.playerState="attached"),this.state==="running_charging"&&(this.state="running_attached");if(this.collectCoinsOnCurrentNode(t),this.resolveEnemyContact(t),this.choiceMode==="shop_orbit"&&this.shop.isOpen()){const h=this.shop.tryPurchase(this.orbitAngle,this.stats.getSnapshot().coins);h&&this.stats.spendCoins(h.price)&&(this.applyOffer(h.offer,"Shop item"),this.shop.reset(),this.choiceMode="none",this.activeChoices=[],this.activeShopAngles=[],this.state="upgrade_acquired",this.eventCooldownUntil=this.currentTime+.6)}}updateAirborne(e){const t=this.scratchVector.set(this.playerPosition.x,this.playerPosition.y,this.playerPosition.z),i=Ge(1-this.runUpgrades.modifiers.glideFactor*.55,.18,1);if(this.playerVelocity.y-=6.8*i*e,this.playerVelocity.x+=this.runUpgrades.modifiers.airControl*e*.4,this.playerPosition.addScaledVector(this.playerVelocity,e),this.choiceMode==="reward_branch"&&this.activeChoices.length>0)for(let o=0;o<this.activeChoices.length;o+=1){const a=this.activeChoices[o];if(!a)continue;const l=qs(a.entry,this.currentTime,this.attachedIndex);if(this.canCaptureNode(l,t)){this.commitRewardBranch(o,!1),this.attachToNode(this.attachedIndex+1,!0,this.playerPosition,this.playerVelocity);return}}const n=this.attachedIndex+Math.max(24,this.displayWindowIndices.length+8);for(let o=this.attachedIndex+1;o<=n;o+=1){const a=this.getResolvedNode(o);if(a.resolvedX-t.x>64)break;if(a.isGigantic&&this.canCaptureNode(a,t)){this.attachToNode(o,!0,this.playerPosition,this.playerVelocity);return}}for(let o=this.attachedIndex+1;o<=n;o+=1){const a=this.getResolvedNode(o);if(a.resolvedX-t.x>64)break;if(this.canCaptureNode(a,t)){this.attachToNode(o,!0,this.playerPosition,this.playerVelocity);return}}if(this.runUpgrades.modifiers.phaseJump&&this.currentTime>=this.phaseJumpReadyAt){const o=this.attachedIndex+1,a=this.getResolvedNode(o),l=this.playerPosition.distanceToSquared(this.scratchVector.set(a.resolvedX,a.resolvedY,a.resolvedZ)),c=(a.gameplayRadius+this.runUpgrades.modifiers.phaseJumpRescueRadius)**2;if(l<c){this.phaseJumpReadyAt=this.currentTime+this.runUpgrades.modifiers.phaseJumpCooldown,this.attachToNode(o,!0,this.playerPosition,this.playerVelocity);return}}if(this.teleportReadyAt<=this.currentTime&&this.runUpgrades.modifiers.teleportRange>0){const o=this.path.getTeleportTarget(this.attachedIndex,this.runUpgrades.modifiers.teleportRange);o>this.attachedIndex+1&&this.playerPosition.x<this.camera.getSafeLeft()+2.4&&(this.teleportReadyAt=this.currentTime+this.runUpgrades.modifiers.teleportCooldown,this.attachToNode(o,!1,null,null))}if(this.warpReadyAt<=this.currentTime&&this.runUpgrades.modifiers.warpRange>0){const o=this.path.getTeleportTarget(this.attachedIndex,this.runUpgrades.modifiers.warpRange);o>this.attachedIndex+3&&this.playerPosition.x<this.camera.getSafeLeft()+1.6&&(this.warpReadyAt=this.currentTime+this.runUpgrades.modifiers.warpCooldown,this.attachToNode(o,!1,null,null))}if(!this.getResolvedNode(this.attachedIndex).isMilestone){if(this.isOutsidePlayableField(this.playerPosition)){this.failRun("out_of_bounds");return}if(this.camera.isBehindSafeLine(this.playerPosition)){this.failRun("camera");return}this.resolveAirborneEnemyContact()}}launch(){if(this.playerState!=="attached"&&this.playerState!=="charging")return!1;const e=this.getResolvedNode(this.attachedIndex),t=this.getOrbitSample(e,this.orbitAngle),i=this.scratchVector.set(t.tangent.x*this.orbitDirection,t.tangent.y*this.orbitDirection,0).normalize(),n=this.scratchVectorB.set(t.position.x,t.position.y,0).normalize(),o=(Math.max(1,t.position.length())*this.angularSpeed*.92+5.2+this.chargeMeter*8.5*(1+this.runUpgrades.modifiers.chargedLeapBonus))*this.momentum.jumpMultiplier*this.runUpgrades.modifiers.jumpPower*(1+this.runUpgrades.modifiers.speedBonus*.35);return this.registerImpactWave(e,this.orbitAngle,o*.92),this.playerVelocity.copy(i.multiplyScalar(o)).addScaledVector(n,o*.08),this.playerState="airborne",this.state=this.choiceMode==="reward_branch"?"upgrade_branching":"running_airborne",this.jumpVisualUntil=this.currentTime+.14,this.remainingExtraJumps=Math.max(0,this.runUpgrades.modifiers.extraJumps),this.chargeMeter=0,!0}performAirAction(){if(this.playerState!=="airborne")return!1;if(this.runUpgrades.modifiers.infiniteFlaps||this.remainingExtraJumps>0){this.runUpgrades.modifiers.infiniteFlaps||(this.remainingExtraJumps-=1);const e=4.2+this.runUpgrades.modifiers.jumpPower*1.6;return this.playerVelocity.y=Math.max(this.playerVelocity.y,0)+e,this.playerVelocity.x+=.9+this.momentum.gauge*1.6,!0}return!1}attachToNode(e,t,i,n){const r=this.getResolvedNode(e);this.attachedIndex=e,this.score=Math.max(this.score,e),this.stats.recordLanding(e,r.pathDistance,performance.now()),this.emitScore();let o=this.orbitAngle,a=e===0?-1:this.orbitDirection,l=Math.PI*2/Math.max(1.4,r.gameplayOrbitPeriod);if(t&&i&&n){const h=this.findBestOrbitAttachment(r,i);o=h.angle;const u=h.tangent.dot(this.scratchVector2.set(n.x,n.y));a=u>=0?1:-1;const d=Math.abs(u),f=Math.max(1.2,h.position.length());l=Ge(d/f,Math.PI*2/Math.max(1.4,r.gameplayOrbitPeriod)*.72,Math.PI*2/Math.max(1.1,r.gameplayOrbitPeriod)*2.2),l=this.applyLandingJudgement(a,d,r,h,n,l),this.registerImpactWave(r,h.angle,n.length())}else o=e===0?Math.PI*.18:0,a=e===0?-1:this.orbitDirection;this.orbitAngle=o,this.orbitDirection=a,this.angularSpeed=l,this.orbitGraceActive=!0,this.orbitGraceProgress=0,this.orbitGraceTravel=0,this.playerState="attached",this.state="running_attached",this.landingVisualUntil=this.currentTime+.12,this.chargeActive=!1,this.chargeMeter=0,this.remainingExtraJumps=Math.max(0,this.runUpgrades.modifiers.extraJumps);const c=this.getOrbitSample(r,this.orbitAngle);this.playerPosition.set(r.resolvedX+c.position.x,r.resolvedY+c.position.y,r.resolvedZ),this.playerVelocity.set(0,0,0),this.collectCoinsOnCurrentNode(r),this.resolveEnemyContact(r),this.choiceMode==="reward_branch"&&!r.isMilestone&&r.colorHint!=="reward"&&(this.choiceMode="none",this.activeChoices=[],this.activeShopAngles=[],this.state="running_attached"),this.currentTime>=this.eventCooldownUntil&&this.resolveNodeEvent(r)}applyLandingJudgement(e,t,i,n,r,o){const a=this.scratchVector2.set(r.x,r.y),l=Math.max(.001,a.length());a.divideScalar(l);const c=n.tangent.clone().multiplyScalar(e).normalize(),h=n.position.clone().normalize(),u=Ge(a.dot(c),-1,1),d=Math.abs(a.dot(h)),f=this.lastLandingDirection!==0&&e!==this.lastLandingDirection;let g="good";d>.78||u<.28?g="miss":u>.95&&d<.2?g="perfect":u>.8&&d<.42&&(g="super");let v=f?.15:.05;!f&&this.momentum.gauge>=.5?v=0:!f&&this.momentum.gauge+v>.5&&(v=Math.max(0,.5-this.momentum.gauge));let m=1;g==="miss"?(v=-.04,m=.84):g==="super"?(v+=f?.035:.01,m=f?1.24:1.08):g==="perfect"?(v+=f?.055:.02,m=f?1.34:1.14):f&&(m=1.18);const p=Ge(this.momentum.gauge+v*(1+this.runUpgrades.modifiers.momentumGain),0,Math.max(1,this.runUpgrades.modifiers.momentumCap));return this.momentum.fillRate=Math.max(0,p-this.momentum.gauge),this.momentum.gauge=p,this.lastLandingDirection=e,this.startLandingFeedback(g,f),o*m}startLandingFeedback(e,t){this.landingFeedbackStartedAt=this.currentTime,this.landingFeedback={grade:e,twist:t,progress:0,worldPosition:new w(this.playerPosition.x-2.2,this.playerPosition.y+.9,this.playerPosition.z)}}resolveNodeEvent(e){var t;if(e.isMilestone){if(!this.milestoneChoiceCache.has(e.index)){const i=Ln(e.index,this.runUpgrades);this.milestoneChoiceCache.set(e.index,this.path.createUpgradeBranches(e.index,i,this.score))}this.activeChoices=(this.milestoneChoiceCache.get(e.index)??[]).map(i=>({...i,previewNodes:i.previewNodes.map(n=>({...n,coinSlots:n.coinSlots.map(r=>({...r}))})),pathNodes:i.pathNodes.map(n=>({...n,coinSlots:n.coinSlots.map(r=>({...r}))}))})),this.choiceMode="reward_branch",this.state="upgrade_branching",this.eventCooldownUntil=this.currentTime+.2;return}switch(e.eventType){case"shop":{this.shop.openForRun(e.index,this.runUpgrades);const i=this.shop.getActiveOffers().slice(0,3);this.activeChoices=i.map(n=>({mode:"shop_orbit",offer:n.offer,price:n.price,entry:e,previewNodes:[],pathNodes:[]})),this.activeShopAngles=i.map(n=>n.angle),this.choiceMode="shop_orbit",this.state="upgrade_branching",this.eventCooldownUntil=this.currentTime+.2;break}case"treasure":this.stats.addCoins(this.applyCoinBonus(5)),this.startAcquisition(((t=this.activeChoices[0])==null?void 0:t.offer)??this.buildVirtualOffer("Treasure Chest","common","TRE","Gain 5 coins."),"Treasure");break;case"gift":{const i=Ln(e.index,this.runUpgrades)[0];i&&this.applyOffer(i,"Gift shard");break}case"rare_item":{const i=Ln(Math.max(100,e.index),this.runUpgrades)[0];i&&this.applyOffer(i,"Rare item");break}case"mini_boss":case"boss":this.boss.start(this.currentTime);break;case"boss_weak":this.boss.isWeakPointPhase()&&(this.boss.defeat(),this.stats.addCoins(this.applyCoinBonus(8)),this.fillMomentumBurst(.24));break}}commitRewardBranch(e,t){const i=this.activeChoices[e];return i?(this.path.replaceFuture(this.attachedIndex,i.pathNodes),this.path.ensureAhead(this.attachedIndex+1,50,40),this.path.queuePostMilestoneEvents(this.attachedIndex+1,this.attachedIndex+1),this.milestoneChoiceCache.delete(this.attachedIndex),this.applyOffer(i.offer,t?"Quick choice":"Path chosen"),this.choiceMode="none",this.activeChoices=[],this.activeShopAngles=[],this.state="upgrade_acquired",this.eventCooldownUntil=this.currentTime+.35,!0):!1}applyOffer(e,t){this.runUpgrades=c_(this.runUpgrades,e.item.id),this.remainingExtraJumps=Math.max(0,this.runUpgrades.modifiers.extraJumps),this.shieldCharges=Math.max(this.shieldCharges,this.runUpgrades.modifiers.shieldCharges),this.startAcquisition(e,t)}startAcquisition(e,t){this.acquisitionStartedAt=this.currentTime,this.acquisition={offer:e,progress:0,subtitle:t}}buildVirtualOffer(e,t,i,n){return{item:{id:`virtual-${i}`,rarity:t,category:"economy",icon:i,unlockScore:0,stackable:!1,maxStacks:1,effects:["virtual"],name:{fr:e,en:e},description:{fr:n,en:n}},stackCount:0}}updateEvents(e,t,i){if(this.boss.update(e,t,this.playerPosition).playerHit&&this.failRun("enemy"),this.boss.isWeakPointPhase()){const r=this.findVisibleWeakPoint();r&&this.boss.setWeakPoint(new w(r.resolvedX,r.resolvedY,r.resolvedZ))}this.state==="upgrade_acquired"&&t>=this.eventCooldownUntil&&(this.state=this.playerState==="airborne"?"running_airborne":this.chargeActive?"running_charging":"running_attached"),this.updateAutoFire(t),this.shop.update(new w(i.resolvedX,i.resolvedY,i.resolvedZ),i.gameplayRadius+.7,t)}updateCamera(e,t,i){const n=t.isGigantic&&this.playerState==="airborne"?i:t,r=t.isGigantic&&this.playerState==="airborne"?this.getResolvedNode(this.attachedIndex+2):i,o=r.isGigantic?Ge(1-Math.max(0,r.resolvedX-this.playerPosition.x)/34,0,1):0,a=Ge((Math.max(n.visualScale,r.visualScale)-2.8)/28,0,1.24),l=t.isGigantic&&this.playerState==="airborne"?Ge(1-Math.max(0,this.playerPosition.x-t.resolvedX)/24,0,1)*26:0,c=t.isGigantic&&this.playerState!=="airborne"?82:Math.max(l,o*38),h=this.choiceMode==="reward_branch"?9.6:this.choiceMode==="shop_orbit"?3.2:this.state==="upgrade_acquired"?2.4:0,u=this.boss.getCameraZoomOffset(),d=(this.boss.isActive()?this.boss.getSpeedPressure():1)*this.momentum.speedMultiplier;this.camera.update({deltaTime:e,state:this.state,score:this.score,currentNode:n,nextNode:r,playerPosition:this.playerPosition,momentumGauge:Ge(this.momentum.gauge,0,1),largeShardFactor:a,milestoneZoom:c,choiceZoom:h,bossZoom:u,speedPressure:d*(1-this.runUpgrades.modifiers.timeSlowFactor*.55)})}updateTrail(e){for(let i=this.trailPoints.length-1;i>0;i-=1)this.trailPoints[i].copy(this.trailPoints[i-1]);this.trailPoints[0].copy(this.playerPosition),this.trailPoints.forEach((i,n)=>{this.trailBuffer[n*3]=i.x,this.trailBuffer[n*3+1]=i.y,this.trailBuffer[n*3+2]=i.z});const t=this.playerTrail.geometry.getAttribute("position");t.needsUpdate=!0,this.playerTrail.material.opacity=.24+this.momentum.gauge*.36}syncPlayerVisual(e){this.player.position.copy(this.playerPosition);const t=this.getResolvedNode(this.attachedIndex),i=this.getOrbitSample(t,this.orbitAngle),n=this.playerState==="airborne"?this.scratchVector2.set(this.playerVelocity.x||.001,this.playerVelocity.y||.001).normalize():i.tangent.clone().multiplyScalar(this.orbitDirection).normalize(),r=Math.atan2(n.y,n.x);this.player.rotation.z=r,this.player.scale.set(1,this.playerState==="airborne"?1:this.orbitDirection>0?-1:1,1),this.playerMainSprite.group.rotation.z=0,this.playerBoostSprite.group.rotation.z=0,this.playerMainSprite.group.position.set(0,0,0),this.playerBoostSprite.group.position.set(0,0,0);const o=this.resolvePlayerVisualState(),a=Math.max(this.playerVelocity.length(),Math.abs(this.angularSpeed)*Math.max(1,i.position.length())),l=1+this.momentum.gauge*.12+Math.sin(e*8)*.02;if(this.state==="game_over"){const c=Ge((e-this.gameOverStartedAt)/.26,0,1),h=Math.max(.02,1-c*1.22);this.playerMainSprite.setVisible(!0),this.playerBoostSprite.setVisible(!1),this.playerMainSprite.setScale(h),this.playerMainSprite.setFrame(3);return}if(o==="attached_idle_orbit"||o==="attached_fast_orbit"){this.playerMainSprite.setVisible(!1),this.playerBoostSprite.setVisible(!0),this.playerBoostSprite.setScale(l);const c=a<5.4?[0,1]:a<8.4?[0,1,2]:[0,1,2,3],h=a<5.4?4.4:a<8.4?7.2:a<11.5?9.6:12.8;this.playerBoostSprite.playLoop(c,h,e);return}this.playerBoostSprite.setVisible(!1),this.playerMainSprite.setVisible(!0),this.playerMainSprite.setScale(l),o==="jump_start"?this.playerMainSprite.setFrame(1):o==="landing"?this.playerMainSprite.setFrame(2):this.playerMainSprite.setFrame(0)}resolvePlayerVisualState(){return this.playerState==="dead"||this.state==="game_over"?"death":this.currentTime<this.jumpVisualUntil?"jump_start":this.currentTime<this.landingVisualUntil?"landing":this.playerState==="airborne"?"airborne":this.playerVelocity.length()>6.6||this.angularSpeed>2.9?"attached_fast_orbit":"attached_idle_orbit"}syncMarkers(e){const t=this.getDisplayNodes(Math.min(28,this.getRecommendedVisibleCount())),i=[],n=[];t.forEach(r=>{var o;r.coinSlots.forEach(a=>{a.collected||i.push({position:this.getCoinWorldPosition(r,a.angle,a.orbitScale),scale:.74+a.value*.08,visible:!0})}),(o=r.enemySlot)!=null&&o.alive&&n.push({id:`${r.index}:${r.enemySlot.pole}`,position:this.getEnemyWorldPosition(r,r.enemySlot.pole),visible:!0,tier:r.enemySlot.tier,pole:r.enemySlot.pole})}),this.coins.setVisible(this.state!=="idle"&&this.state!=="transition_out"),this.enemies.setVisible(this.state!=="idle"&&this.state!=="transition_out"),this.coins.update(i,e),this.enemies.update(n,e)}fillMomentumBurst(e){this.momentum.gauge=Ge(this.momentum.gauge+e*(1+this.runUpgrades.modifiers.momentumGain),0,Math.max(1,this.runUpgrades.modifiers.momentumCap)),this.momentum.fillRate=Math.max(this.momentum.fillRate,e)}collectCoinsOnCurrentNode(e){e.coinSlots.forEach(t=>{t.collected||Math.abs(Fs(this.orbitAngle,t.angle))<.16+this.runUpgrades.modifiers.coinMagnet*.08&&(t.collected=!0,this.stats.addCoins(this.applyCoinBonus(t.value)))})}resolveEnemyContact(e){const t=e.enemySlot;if(!t||!t.alive||this.getEnemyWorldPosition(e,t.pole).distanceTo(this.playerPosition)>e.gameplayRadius*.36+.82)return;const n=this.playerVelocity.length();if(this.isEnemyHitFromBehind(t.pole)&&n>=t.speedThreshold||this.runUpgrades.modifiers.spikeOrbit){t.alive=!1,this.stats.addCoins(this.applyCoinBonus(t.rewardCoins)),this.fillMomentumBurst(.05);return}this.consumeProtectionOrFail()}resolveAirborneEnemyContact(){for(let e=this.attachedIndex+1;e<=this.attachedIndex+4;e+=1){const t=this.getResolvedNode(e),i=t.enemySlot;if(!i||!i.alive||this.getEnemyWorldPosition(t,i.pole).distanceTo(this.playerPosition)>1.2)continue;this.playerVelocity.length()>=i.speedThreshold*.75||this.runUpgrades.modifiers.spikeOrbit?(i.alive=!1,this.stats.addCoins(this.applyCoinBonus(i.rewardCoins)),this.fillMomentumBurst(.08)):this.consumeProtectionOrFail();return}}consumeProtectionOrFail(){if(this.shieldCharges>0){this.shieldCharges-=1,this.fillMomentumBurst(.04);return}this.failRun("enemy")}updateAutoFire(e){if(!(this.runUpgrades.modifiers.autoCannonLevel<=0)&&!(e<this.autoFireReadyAt))for(let t=this.attachedIndex;t<this.attachedIndex+8;t+=1){const i=this.getResolvedNode(t),n=i.enemySlot;if(!(!n||!n.alive||n.tier==="invincible"||this.getEnemyWorldPosition(i,n.pole).distanceTo(this.playerPosition)>8.2)){n.alive=!1,this.stats.addCoins(this.applyCoinBonus(n.rewardCoins)),this.fillMomentumBurst(.04+this.runUpgrades.modifiers.autoCannonLevel*.01),this.autoFireReadyAt=e+Math.max(2.2,5-this.runUpgrades.modifiers.autoCannonLevel*1.1);return}}}applyCoinBonus(e){const t=this.runUpgrades.modifiers.doubleCoin?e*2:e;return Math.max(1,Math.round(t*(1+this.runUpgrades.modifiers.coinBonus)))}failRun(e="camera"){this.state!=="game_over"&&(this.state="game_over",this.playerState="dead",this.gameOverCause=e,this.chargeActive=!1,this.chargeMeter=0,this.choiceMode="none",this.activeChoices=[],this.playerVelocity.set(0,0,0),this.playerVelocityTarget.set(0,0,0),this.angularSpeed=0,this.gameOverStartedAt=this.currentTime,this.playerTrail.visible=!1,this.shop.reset(),this.emitScore())}isOutsidePlayableField(e){return e.y<=-32||e.y>=32}canCaptureNode(e,t){const i=this.getPhysicalRadius(e)+(e.isGigantic?this.getOrbitClearance(e)+1.15:.92)+this.runUpgrades.modifiers.captureRadius,n=this.playerPosition.x-e.resolvedX,r=this.playerPosition.y-e.resolvedY,o=n*n+r*r<=i*i;if(o||!t)return o;const a=t.x-e.resolvedX,l=t.y-e.resolvedY,c=this.playerPosition.x-t.x,h=this.playerPosition.y-t.y,u=c*c+h*h;if(u<=1e-4)return!1;const d=Ge(-(a*c+l*h)/u,0,1),f=a+c*d,g=l+h*d;return f*f+g*g<=i*i}findBestOrbitAttachment(e,t){let i=0,n=Number.POSITIVE_INFINITY,r=new re,o=new re(1,0);for(let a=0;a<72;a+=1){const l=a/72*Math.PI*2,c=this.getOrbitSample(e,l),h=e.resolvedX+c.position.x,u=e.resolvedY+c.position.y,d=(t.x-h)**2+(t.y-u)**2;d<n&&(n=d,i=l,r=c.position.clone(),o=c.tangent.clone())}return{angle:i,position:r,tangent:o}}getOrbitSample(e,t){const i=ui(t),n=e.shapeKind==="round"?0:e.resolvedSpinPhase,r=this.getShapeExtents(e),o=this.getOrbitClearance(e),a=this.getPhysicalRadius(e)+o,l=ui(i-n);if(e.shapeKind==="oval"){const u=r.x+o,d=r.y+o,f=new re(Math.cos(l)*u,Math.sin(l)*d),g=new re(-Math.sin(l)*u,Math.cos(l)*d).normalize();return this.applySurfaceContour(e,l,this.rotateOrbitSample(f,g,n))}if(e.shapeKind==="triangular"){const u=r.y+o,d=r.x/Math.max(1e-4,r.y)*u,f=[new re(0,u),new re(-d,-u*.5),new re(d,-u*.5)],g=this.sampleTriangleBoundary(f,l),v=g.position,m=g.tangent;return this.applySurfaceContour(e,l,this.rotateOrbitSample(v,m,n))}const c=new re(Math.cos(i)*a,Math.sin(i)*a),h=new re(-Math.sin(i),Math.cos(i));return this.applySurfaceContour(e,l,this.rotateOrbitSample(c,h,0))}getShapeExtents(e){const t=e.shapeKind==="triangular"?1.07384:e.shapeKind==="oval"?1.18:1.25,i=e.shapeKind==="triangular"?1.24:e.shapeKind==="oval"?1.18:1.25;return{x:t*e.visualScale*e.visualStretch.x*.92,y:i*e.visualScale*e.visualStretch.y*.92}}sampleTriangleBoundary(e,t){const i=new re(Math.cos(t),Math.sin(t));let n=Number.POSITIVE_INFINITY,r=e[0].clone(),o=e[1].clone().sub(e[0]).normalize();for(let a=0;a<e.length;a+=1){const l=e[a],h=e[(a+1)%e.length].clone().sub(l),u=i.x*h.y-i.y*h.x;if(Math.abs(u)<1e-4)continue;const d=(l.x*h.y-l.y*h.x)/u,f=(l.x*i.y-l.y*i.x)/u;d<=0||f<0||f>1||d<n&&(n=d,r=i.clone().multiplyScalar(d),o=h.normalize())}return{position:r,tangent:o}}getPhysicalRadius(e){const t=this.getShapeExtents(e),i=Math.max(t.x,t.y);return e.isGigantic?Math.max(e.gameplayRadius,i*1.02):Math.max(e.gameplayRadius,i)}getOrbitClearance(e){const t=e.index===this.attachedIndex&&this.playerState!=="airborne"?Ge(this.playerVelocity.length()/16,0,.46):0,i=Ge((e.visualScale-3.2)*.085,0,.82);return e.isGigantic?Ge(.96+e.visualScale*.042+t*.4,.96,2.35):Ge(.28+e.visualScale*.048+i+t,.28,1.48)}applySurfaceContour(e,t,i){const n=1+this.sampleSurfaceDeformation(e,t),r=i.position.clone().normalize();return{position:i.position.multiplyScalar(n),tangent:i.tangent.addScaledVector(r,.12*this.sampleSurfaceSlope(e,t)).normalize()}}sampleSurfaceDeformation(e,t){const i=Ge(e.index/280,0,1),n=Ge(1.08-e.visualScale*.035,.32,1),r=(.008+i*.03)*n,o=e.shapeKind==="triangular"?3:e.shapeKind==="oval"?2:4;return Math.sin(t*o+e.motionSeed*6.2)*r+Math.sin(t*(o+3)-e.motionSeed*4.1)*r*.42+this.sampleImpactWaveOffset(e,t)+this.sampleBoatWaveOffset(e,t)*n}sampleSurfaceSlope(e,t){return(this.sampleSurfaceDeformation(e,ui(t+.06))-this.sampleSurfaceDeformation(e,ui(t-.06)))/(.06*2)}sampleImpactWaveOffset(e,t){const i=this.impactWaves.get(e.index);if(!i||i.length===0)return 0;let n=0;const r=[];return i.forEach(o=>{const a=this.currentTime-o.createdAt;if(a>=o.decay)return;const l=1-a/o.decay,c=Fs(t,o.originAngle),h=Math.exp(-(c*c)/Math.max(.08,o.radius*o.radius));n+=o.strength*h*l,r.push(o)}),r.length>0?this.impactWaves.set(e.index,r):this.impactWaves.delete(e.index),n}sampleBoatWaveOffset(e,t){if(e.index!==this.attachedIndex||this.playerState==="airborne")return 0;const i=e.shapeKind==="round"?0:e.resolvedSpinPhase,n=ui(this.orbitAngle-i),r=ui(n-this.orbitDirection*.28),o=Fs(t,n),a=Fs(t,r),l=this.orbitGraceActive?Ge(this.orbitGraceProgress,.15,1):1,c=Math.exp(-(o*o)/.2)*(.05+this.momentum.gauge*.075)*l,h=Math.exp(-(a*a)/.48)*.03*l;return c+h}registerImpactWave(e,t,i){const n=Ge(e.index/240,0,1),r=Ge(1.04-e.visualScale*.03,.34,1),o=Ge((i-4.6)/18,.02,.18)*(.6+n*.4)*r,a={originAngle:ui(t),strength:o,radius:.32+Ge(i/18,0,.72),decay:1.4+Ge(i/16,0,.9),createdAt:this.currentTime},l=this.impactWaves.get(e.index)??[];l.push(a),this.impactWaves.set(e.index,l.slice(-4))}getVisualWaveState(e){const t=this.impactWaves.get(e.index);if(!t||t.length===0)return null;let i=null,n=0;for(const a of t){const l=this.currentTime-a.createdAt;if(l>=a.decay)continue;const c=1-l/a.decay;(!i||c*a.strength>n)&&(i=a,n=c*a.strength)}if(!i)return null;const r=this.currentTime-i.createdAt,o=Ge(1-r/i.decay,0,1);return{angle:i.originAngle,strength:i.strength*(.9+o*.9),density:.72+o*.58}}rotateOrbitSample(e,t,i){const n=Math.cos(i),r=Math.sin(i);return{position:new re(e.x*n-e.y*r,e.x*r+e.y*n),tangent:new re(t.x*n-t.y*r,t.x*r+t.y*n).normalize()}}getCoinWorldPosition(e,t,i){const n=this.getOrbitSample(e,t);return new w(e.resolvedX+n.position.x*i,e.resolvedY+n.position.y*i,e.resolvedZ)}getEnemyWorldPosition(e,t){const n=this.getOrbitSample(e,t==="north"?Math.PI*.5:Math.PI*1.5).position.clone().normalize().multiplyScalar(this.getPhysicalRadius(e)+1.08),r=e.shapeKind==="round"?0:e.resolvedSpinPhase,o=Math.cos(r),a=Math.sin(r);return new w(e.resolvedX+n.x*o-n.y*a,e.resolvedY+n.x*a+n.y*o,e.resolvedZ)}isEnemyHitFromBehind(e){return e==="north"?this.orbitDirection===1:this.orbitDirection===-1}prewarmUpcomingMilestones(){for(let e=this.attachedIndex+1;e<this.attachedIndex+48;e+=1){const t=this.path.getNode(e);if(!(t!=null&&t.isMilestone)||this.milestoneChoiceCache.has(t.index))continue;const i=Ln(t.index,this.runUpgrades);this.milestoneChoiceCache.set(t.index,this.path.createUpgradeBranches(t.index,i,this.score));return}}getBranchHints(){if(this.choiceMode==="reward_branch")return this.activeChoices.slice(0,3).map((e,t)=>{const i=e.previewNodes[0]??e.entry;return{slot:t,offer:e.offer,worldPosition:new w(i.x+3.4,i.y,i.z),mode:"reward_branch"}});if(this.choiceMode==="shop_orbit"&&this.activeChoices.length>0){const e=this.getResolvedNode(this.attachedIndex);return this.activeChoices.slice(0,3).map((t,i)=>{const n=this.activeShopAngles[i]??0,r=e.gameplayRadius+2.1;return{slot:i,offer:t.offer,worldPosition:new w(e.resolvedX+Math.cos(n)*r,e.resolvedY+Math.sin(n)*r,e.resolvedZ),mode:"shop_orbit",price:t.price}})}return[]}findVisibleWeakPoint(){for(let e=this.attachedIndex+1;e<this.attachedIndex+18;e+=1){const t=this.getResolvedNode(e);if(t.eventType==="boss_weak")return t}return null}getSpecialAccent(e){if(!(e.eventType==="shop"||e.colorHint==="accent"&&!e.isMilestone))return null;const t=Math.floor(this.currentTime/3)%Il.length;return Il[t]}getRewardRingColor(e){const t=e.branchSlot??0;return Dl[t]??Dl[0]}getThemeShardColor(){return this.theme==="dark"?"#D4BF9B":"#393F4A"}}class D_{constructor(){y(this,"yaw",0);y(this,"radius",26.5);y(this,"yawTarget",0);y(this,"radiusTarget",26.5);y(this,"yawVelocity",0);y(this,"height",2.6);y(this,"pose",new w);y(this,"lookAt",new w)}setRadius(e){this.radius=e,this.radiusTarget=e}orbit(e,t){const i=Ge(e,-10,10);this.yawVelocity=Ge(this.yawVelocity+i*85e-5,-.032,.032)}update(e,t){return this.yawTarget+=this.yawVelocity,this.yawVelocity=be(this.yawVelocity,0,11,e),this.yaw=be(this.yaw,this.yawTarget,10,e),this.radius=be(this.radius,this.radiusTarget,8,e),this.pose.set(t.x+Math.sin(this.yaw)*this.radius,t.y+this.height,t.z+Math.cos(this.yaw)*this.radius),this.lookAt.copy(t),{position:this.pose.clone(),lookAt:this.lookAt.clone()}}}class U_{constructor(e,t,i){y(this,"element");y(this,"canvas");y(this,"context");y(this,"content");y(this,"progress");y(this,"logo");y(this,"sites",[]);y(this,"cellCache",[]);y(this,"fragments",[]);y(this,"clickCount",0);y(this,"clickThreshold",8);y(this,"fractureIndex",0);y(this,"state","idle");y(this,"opacity",1);y(this,"shatterElapsed",0);y(this,"onBroken",null);y(this,"onHidden",null);y(this,"onPointerDown",e=>{if(this.state!=="idle")return;const t=this.canvas.getBoundingClientRect(),i=e.clientX-t.left,n=e.clientY-t.top;this.addFractureCluster(i,n),this.clickCount+=1,this.progress.style.setProperty("--intro-progress",String(this.clickCount/this.clickThreshold)),this.progress.textContent=`${this.clickCount}/${this.clickThreshold}`,this.clickCount>=this.clickThreshold?this.startShatter():this.draw()});y(this,"resize",()=>{this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.draw()});this.i18n=t,this.theme=i,this.element=document.createElement("div"),this.element.className="intro-layer",this.canvas=document.createElement("canvas"),this.canvas.className="intro-layer__canvas";const n=this.canvas.getContext("2d");if(!n)throw new Error("Canvas 2D context unavailable");this.context=n,this.content=document.createElement("div"),this.content.className="intro-layer__content",this.content.innerHTML=`
      <div class="intro-layer__logo-wrap">
        <img class="intro-layer__logo" alt="Ape Prod logo">
      </div>
      <h1 class="intro-layer__title"></h1>
      <p class="intro-layer__subtitle"></p>
      <div class="intro-layer__progress"></div>
    `,this.logo=this.content.querySelector(".intro-layer__logo"),this.progress=this.content.querySelector(".intro-layer__progress"),this.element.append(this.canvas,this.content),e.appendChild(this.element),this.element.addEventListener("pointerdown",this.onPointerDown),this.i18n.onChange(()=>this.renderText()),this.theme.onChange(()=>this.renderText()),window.addEventListener("resize",this.resize),this.resize(),this.renderText()}get isComplete(){return this.state==="hidden"}update(e){var t;this.state==="shattering"&&(this.shatterElapsed+=e,this.opacity=Ge(1-this.shatterElapsed/1.35,0,1),this.fragments.forEach(i=>{i.centerX+=i.velocityX*e,i.centerY+=i.velocityY*e,i.velocityY+=320*e,i.rotation+=i.angularVelocity*e}),this.shatterElapsed>1.4&&(this.state="hidden",this.element.classList.add("is-hidden"),(t=this.onHidden)==null||t.call(this))),this.draw()}addFractureCluster(e,t){const n=this.fractureIndex+1;this.fractureIndex+=1;for(let r=0;r<9;r+=1){const o=r/9*Math.PI*2,a=18+(n*37+r*17)%44,l=Math.sin(n+r*.7)*18,c=Math.cos(n*1.3+r*.5)*18;this.sites.push({x:e+Math.cos(o)*a+l,y:t+Math.sin(o)*a+c,fractureId:n})}this.cellCache=this.sites.map(r=>this.computeCell(r))}computeCell(e){const t=[];for(let r=0;r<18;r+=1){const o=r/18*Math.PI*2;let a=44;for(const l of this.sites){if(l===e)continue;const c=Math.cos(o),h=Math.sin(o),u=l.x-e.x,d=l.y-e.y,f=2*(c*u+h*d),g=u*u+d*d;f>.001&&(a=Math.min(a,g/f))}t.push({x:e.x+Math.cos(o)*Math.max(8,a),y:e.y+Math.sin(o)*Math.max(8,a)})}return t}startShatter(){var e;this.state==="idle"&&(this.state="shattering",this.shatterElapsed=0,this.fragments=this.cellCache.map((t,i)=>{const n=t.reduce((a,l)=>a+l.x,0)/t.length,r=t.reduce((a,l)=>a+l.y,0)/t.length,o=Math.atan2(r-this.canvas.height/2,n-this.canvas.width/2);return{points:t,centerX:n,centerY:r,velocityX:Math.cos(o)*(60+i*2.5),velocityY:Math.sin(o)*(40+i*1.5)-20,angularVelocity:(Math.random()-.5)*4,rotation:0}}),(e=this.onBroken)==null||e.call(this))}draw(){const e=this.canvas.width,t=this.canvas.height,{context:i}=this;i.clearRect(0,0,e,t),i.save(),i.globalAlpha=this.opacity,i.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--color-bg").trim(),i.fillRect(0,0,e,t),this.state==="shattering"?(i.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue("--color-fg").trim(),i.lineWidth=1.1,this.fragments.forEach(n=>{i.save(),i.translate(n.centerX,n.centerY),i.rotate(n.rotation),i.beginPath(),n.points.forEach((r,o)=>{const a=r.x-n.centerX,l=r.y-n.centerY;o===0?i.moveTo(a,l):i.lineTo(a,l)}),i.closePath(),i.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--color-bg").trim(),i.fill(),i.stroke(),i.restore()})):(i.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue("--color-fg").trim(),i.fillStyle="rgba(0, 0, 0, 0)",i.lineWidth=1.2,this.cellCache.forEach(n=>{i.beginPath(),n.forEach((r,o)=>{o===0?i.moveTo(r.x,r.y):i.lineTo(r.x,r.y)}),i.closePath(),i.stroke()})),i.restore()}renderText(){this.content.querySelector(".intro-layer__title").textContent=this.i18n.t("introTitle"),this.content.querySelector(".intro-layer__subtitle").textContent=this.i18n.t("introSubtitle"),this.progress.textContent=`${this.clickCount}/${this.clickThreshold}`,this.progress.style.setProperty("--intro-progress",String(this.clickCount/this.clickThreshold)),this.logo.src=this.theme.current==="dark"?"/assets/images/Logo/LogoApeProdLight.svg":"/assets/images/Logo/LogoApeProdDark.svg"}}const Bn={dark:{color:new Oe("#D4BF9B"),emissive:new Oe("#D4BF9B")},light:{color:new Oe("#393F4A"),emissive:new Oe("#393F4A")}};function Ul(s,e){const t=new Fg({color:Bn[s].color.clone(),emissive:Bn[s].emissive.clone(),emissiveIntensity:.12,roughness:.48,metalness:.18,flatShading:!0,transparent:!0,opacity:1});return t.onBeforeCompile=i=>{const n={uTime:{value:0},uHover:{value:0},uDrag:{value:0},uFocus:{value:0},uSettled:{value:0},uSnap:{value:0},uSeed:{value:e},uOrbitAngle:{value:0},uOrbitPulse:{value:0},uWaveDensity:{value:.72},uStripeMix:{value:0},uStripePhase:{value:0},uStripeColor:{value:Bn[s].color.clone()}};t.userData.shaderUniforms=n,Object.assign(i.uniforms,n),i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
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
diffuseColor.rgb = mix(diffuseColor.rgb, uStripeColor, stripeBand * uStripeMix);`)},t.customProgramCacheKey=()=>`shard-${e}`,t}function hn(s,e){s.color.copy(Bn[e].color),s.emissive.copy(Bn[e].emissive)}function Vr(s,e){const t=s.userData.shaderUniforms;t&&(t.uTime.value=e.time,t.uHover.value=e.hover,t.uDrag.value=e.drag,t.uFocus.value=e.focus,t.uSettled.value=e.settled,t.uSnap.value=e.snap,t.uOrbitAngle.value=e.orbitAngle??0,t.uOrbitPulse.value=e.orbitPulse??0,t.uWaveDensity.value=e.waveDensity??.72,t.uStripeMix&&(t.uStripeMix.value=e.stripeMix??0),t.uStripePhase&&(t.uStripePhase.value=e.stripePhase??0),t.uStripeColor&&e.stripeColor&&t.uStripeColor.value.set(e.stripeColor))}function N_(s,e){const t=new Qn(s,e).toNonIndexed();return Eo(t)}function F_(s,e,t){const i=new yo(s,e,t).toNonIndexed();return Eo(i)}function O_(s,e){const t=s*Math.sqrt(3)*.5,i=new vc;i.moveTo(0,s),i.lineTo(-t,-s*.5),i.lineTo(t,-s*.5),i.closePath();const n=new vo(i,{depth:e,steps:1,bevelEnabled:!1}).translate(0,0,-e*.5).toNonIndexed();return Eo(n)}function Eo(s){const e=s.getAttribute("position"),t=new Float32Array(e.count*3),i=new Float32Array(e.count);for(let n=0;n<e.count;n+=3){const r=e.getX(n),o=e.getY(n),a=e.getZ(n),l=e.getX(n+1),c=e.getY(n+1),h=e.getZ(n+1),u=e.getX(n+2),d=e.getY(n+2),f=e.getZ(n+2),g=new w((r+l+u)/3,(o+c+d)/3,(a+h+f)/3).normalize(),v=n/3*.173;for(let m=0;m<3;m+=1){const p=(n+m)*3;t[p]=g.x,t[p+1]=g.y,t[p+2]=g.z,i[n+m]=v}}return s.setAttribute("aFragmentDir",new Lt(t,3)),s.setAttribute("aFragmentPhase",new Lt(i,1)),s}const k_=new w(0,.8,24),B_=new w(0,.2,17.5),Rn=33;class z_{constructor(e,t,i,n){y(this,"root",new Rt);y(this,"loader",new Mc);y(this,"raycaster",new Xg);y(this,"dragPlane",new Mi(new w(0,0,1),0));y(this,"interactionPlanePoint",new w);y(this,"entities",new Map);y(this,"entityList");y(this,"pickTargets",[]);y(this,"pointer",new re);y(this,"backgroundPoints");y(this,"focusTargetPosition",new w(0,.1,7.4));y(this,"pivot",new w(0,0,0));y(this,"roundGeometry",N_(1.25,4));y(this,"ovalGeometry",F_(1.18,18,14));y(this,"triangularGeometry",O_(1.24,1.48));y(this,"constellationLines");y(this,"gameFieldEntities");y(this,"globalOrbitTime",0);y(this,"hoveredId",null);y(this,"focusedId",null);y(this,"draggingId",null);y(this,"activeIndex",0);y(this,"theme");y(this,"focusSettled",!1);y(this,"activeLookAt",new w);y(this,"externalLayoutActive",!1);y(this,"externalLayoutPositions",null);y(this,"externalLayoutScales",null);y(this,"externalLayoutVisuals",null);y(this,"externalTransitionFrom",[]);y(this,"externalTransitionTo",[]);y(this,"externalTransitionProgress",0);y(this,"speedAccentTimer",36);y(this,"speedAccentId",null);y(this,"unlockCallbacks",new Set);y(this,"slotPreviewIds",new Set);this.scene=e,this.slotSystem=i,this.theme=n,this.scene.add(this.root),this.backgroundPoints=this.createBackgroundPoints(),this.scene.add(this.backgroundPoints),this.constellationLines=this.createConstellationLines(),this.entityList=t.map((r,o)=>this.createShard(r,o)),this.gameFieldEntities=Array.from({length:Rn},(r,o)=>this.createGameFieldShard(o))}getGameGeometry(e){return e==="oval"?this.ovalGeometry:e==="triangular"?this.triangularGeometry:this.roundGeometry}setTheme(e){this.theme=e,this.entityList.forEach(t=>{hn(t.core.material,e),this.updateLogoTexture(t),t.slotIndicator.material.color.set(e==="dark"?"#D4BF9B":"#393F4A")}),this.gameFieldEntities.forEach(t=>{hn(t.core.material,e)}),this.backgroundPoints.material.color.set(e==="dark"?"#D4BF9B":"#393F4A"),this.constellationLines.forEach(t=>t.material.color.set(e==="dark"?"#D4BF9B":"#393F4A"))}setActiveIndex(e){this.activeIndex=ks(e,this.entityList.length)}setHovered(e){this.hoveredId=e}setFocused(e){this.focusedId=e,this.focusSettled=!1,this.entityList.forEach(t=>{e&&t.project.id===e?t.runtimeState="focus_enter":t.runtimeState!=="dragging"&&(t.runtimeState=t.snapped?"snapped":"orbiting")})}isFocusSettled(){return this.focusSettled}clearFocus(){this.focusedId=null,this.focusSettled=!1,this.entityList.forEach(e=>{e.runtimeState=e.snapped?"snapped":"focus_exit",e.manualRotationY=0})}getFocusedProject(){var e;return this.focusedId&&((e=this.entities.get(this.focusedId))==null?void 0:e.project)||null}getFocusedFacetIndex(){var e;return this.focusedId?((e=this.entities.get(this.focusedId))==null?void 0:e.activeFacet)??0:0}changeFacet(e){if(!this.focusedId)return null;const t=this.entities.get(this.focusedId);return!t||t.facetAnimation.active?null:(t.facetAnimation={active:!0,direction:e,progress:0,swapped:!1},t.project.id)}previewFacetRotation(e){if(!this.focusedId)return;const t=this.entities.get(this.focusedId);!t||t.facetAnimation.active||(t.manualRotationY=Yt.clamp(e*.007,-Math.PI/6,Math.PI/6))}finishFacetRotation(){if(!this.focusedId)return!1;const e=this.entities.get(this.focusedId);if(!e||e.facetAnimation.active)return!1;if(Math.abs(e.manualRotationY)>Math.PI/8){const t=e.manualRotationY>0?1:-1;return e.manualRotationY=0,this.changeFacet(t),!0}return e.manualRotationY=0,!1}beginDrag(e,t){if(this.focusedId)return!1;const i=this.entities.get(e);return!i||i.project.role==="presentation"||!this.slotSystem.getSlotForShard(e)?!1:(this.slotPreviewIds.delete(e),i.snapped&&(i.snapped=!1,this.slotSystem.deactivate(i.project.id)),this.draggingId=e,i.runtimeState="dragging",i.dragOffset.copy(i.group.position).sub(t),i.dragTarget.copy(i.group.position),this.dragPlane.constant=-i.group.position.z,!0)}updateDrag(e){if(!this.draggingId)return 0;const t=this.entities.get(this.draggingId);if(!t)return 0;t.dragTarget.copy(e).add(t.dragOffset),t.dragTarget.z=t.group.position.z;const i=this.slotSystem.getSlotForShard(t.project.id),n=this.slotSystem.getProximity(t.project.id,t.dragTarget);if(i&&n>0){const r=Yt.clamp(.12+n*n*.62,.12,.74);t.dragTarget.x=Yt.lerp(t.dragTarget.x,i.worldPosition.x,r),t.dragTarget.y=Yt.lerp(t.dragTarget.y,i.worldPosition.y,r),t.dragTarget.z=Yt.lerp(t.dragTarget.z,i.worldPosition.z,r)}return n}endDrag(){if(!this.draggingId)return{snapped:!1,unlocked:!1,shardId:null};const e=this.entities.get(this.draggingId),t=this.slotSystem.canSnap(e.project.id,e.dragTarget);let i=!1;t?(e.snapped=!0,e.runtimeState="snapped",e.dragTarget.set(t.worldPosition.x,t.worldPosition.y,t.worldPosition.z),e.velocity.set(0,0,0),this.slotSystem.activate(e.project.id),this.slotSystem.isUnlocked()&&(i=!0,this.unlockCallbacks.forEach(r=>r()))):e.runtimeState="orbiting";const n={snapped:!!t,unlocked:i,shardId:this.draggingId};return this.draggingId=null,n}pick(e,t,i,n){const r=i.getBoundingClientRect();this.pointer.x=(e-r.left)/r.width*2-1,this.pointer.y=-((t-r.top)/r.height)*2+1,this.raycaster.setFromCamera(this.pointer,n);const a=this.raycaster.intersectObjects(this.pickTargets,!1).find(l=>!!l.object.userData.shardId);return a?{shardId:a.object.userData.shardId,point:a.point.clone()}:null}projectPointerToDragPlane(e,t,i,n){const r=i.getBoundingClientRect();return this.pointer.x=(e-r.left)/r.width*2-1,this.pointer.y=-((t-r.top)/r.height)*2+1,this.raycaster.setFromCamera(this.pointer,n),this.raycaster.ray.intersectPlane(this.dragPlane,this.interactionPlanePoint.clone())}getProjectAt(e){var t;return((t=this.entityList[ks(e,this.entityList.length)])==null?void 0:t.project)||null}getPivot(){return this.pivot.clone()}getOrbitCameraPose(){return this.activeLookAt.copy(this.pivot),{position:k_,lookAt:this.activeLookAt.clone()}}getFocusCameraPose(){const e=this.focusedId?this.entities.get(this.focusedId):null;return{position:B_,lookAt:(e==null?void 0:e.group.position.clone())||this.focusTargetPosition.clone()}}getFocusedEntityId(){return this.focusedId}onUnlocked(e){return this.unlockCallbacks.add(e),()=>this.unlockCallbacks.delete(e)}activateSlotPreview(){this.slotPreviewIds.clear(),this.entityList.forEach(e=>{this.slotSystem.getSlotForShard(e.project.id)&&(this.slotPreviewIds.add(e.project.id),e.snapped=!1,!this.focusedId&&e.runtimeState!=="dragging"&&(e.runtimeState="orbiting"))})}activateSlotPreviewForShard(e){if(!this.entities.has(e)||!this.slotSystem.getSlotForShard(e))return;this.slotPreviewIds.add(e);const t=this.entities.get(e);t&&!t.snapped&&!this.focusedId&&t.runtimeState!=="dragging"&&(t.runtimeState="orbiting")}snapShardToSlot(e){const t=this.entities.get(e),i=this.slotSystem.getSlotForShard(e);return!t||!i?!1:(this.slotPreviewIds.delete(e),t.snapped=!0,t.runtimeState="snapped",t.dragTarget.set(i.worldPosition.x,i.worldPosition.y,i.worldPosition.z),t.group.position.set(i.worldPosition.x,i.worldPosition.y,i.worldPosition.z),t.velocity.set(0,0,0),this.slotSystem.activate(e),this.slotSystem.isUnlocked()?(this.unlockCallbacks.forEach(n=>n()),!0):!1)}clearSlotPreview(){this.slotPreviewIds.clear()}getPresentationProjectId(){var e;return((e=this.entityList.find(t=>t.project.role==="presentation"))==null?void 0:e.project.id)??null}getDragThreshold(e){const t=this.entities.get(e);return t?t.project.role==="presentation"?3:t.snapped?4:8:8}getCurrentShardPositions(){return this.entityList.map(e=>e.group.position.clone())}getGameFieldCapacity(){return this.entityList.length+this.gameFieldEntities.length}ensureGameFieldCapacity(e){const t=Math.max(0,e-this.entityList.length);for(;this.gameFieldEntities.length<t;)this.gameFieldEntities.push(this.createGameFieldShard(this.gameFieldEntities.length))}getOrbitPositions(){return this.entityList.map((e,t)=>this.computeOrbitTarget(e,this.globalOrbitTime,t===this.activeIndex))}getSlotPositions(){return this.entityList.map(e=>{const t=this.slotSystem.getSlotForShard(e.project.id);return t?new w(t.worldPosition.x,t.worldPosition.y,t.worldPosition.z):e.group.position.clone()})}beginExternalLayoutTransition(e,t,i){this.externalLayoutActive=!0,this.externalLayoutPositions=null,this.externalLayoutScales=t?[...t]:null,this.externalLayoutVisuals=i?i.map(n=>({scale:n.scale.clone(),shapeKind:n.shapeKind,spinDirection:n.spinDirection,spinSpeed:n.spinSpeed,spinPhase:n.spinPhase,tint:n.tint,pulse:n.pulse,deformAngle:n.deformAngle,deformStrength:n.deformStrength,deformDensity:n.deformDensity})):null,this.externalTransitionFrom=this.getCurrentShardPositions(),this.externalTransitionTo=e.map(n=>n.clone()),this.externalTransitionProgress=0}setExternalLayoutProgress(e){this.externalTransitionProgress=e}setExternalLayoutPositions(e,t,i){this.externalLayoutActive=!0,this.externalLayoutPositions=e.map(n=>n.clone()),this.externalLayoutScales=t?[...t]:null,this.externalLayoutVisuals=i?i.map(n=>({scale:n.scale.clone(),shapeKind:n.shapeKind,spinDirection:n.spinDirection,spinSpeed:n.spinSpeed,spinPhase:n.spinPhase,tint:n.tint,pulse:n.pulse,deformAngle:n.deformAngle,deformStrength:n.deformStrength,deformDensity:n.deformDensity})):null}clearExternalLayout(){this.externalLayoutActive=!1,this.externalLayoutPositions=null,this.externalLayoutScales=null,this.externalLayoutVisuals=null,this.externalTransitionFrom=[],this.externalTransitionTo=[],this.externalTransitionProgress=0,this.gameFieldEntities.forEach(e=>{e.group.visible=!1,e.hiddenUntil=0})}releaseSnappedShards(){this.entityList.forEach(e=>{e.snapped=!1,this.slotSystem.getSlotForShard(e.project.id)&&this.slotSystem.deactivate(e.project.id),!this.focusedId&&e.runtimeState!=="dragging"&&(e.runtimeState="orbiting")})}resetPortfolioState(){this.hoveredId=null,this.focusedId=null,this.draggingId=null,this.focusSettled=!1,this.clearExternalLayout(),this.clearSlotPreview(),this.entityList.forEach(e=>{e.snapped=!1,e.runtimeState="orbiting",e.manualRotationY=0,e.hoverAmount=0,e.dragAmount=0,e.focusAmount=0,e.opacity=1,e.slotPulse=0,e.facetAnimation={active:!1,direction:1,progress:0,swapped:!1},e.hiddenUntil=0,e.dragTarget.copy(e.group.position),e.dragOffset.set(0,0,0),e.velocity.set(0,0,0)}),this.updateConstellationLines()}setVisible(e){this.root.visible=e,this.backgroundPoints.visible=e}update(e,t,i){if(this.globalOrbitTime+=e,this.backgroundPoints.rotation.z+=e*.012,this.backgroundPoints.rotation.y+=e*.02,this.syncLivePivot(t),this.speedAccentTimer-=e,this.speedAccentTimer<=0)if(this.speedAccentId)this.speedAccentId=null,this.speedAccentTimer=28+Math.random()*20;else{const n=this.entityList.filter(o=>o.project.role==="project"),r=n[Math.floor(Math.random()*n.length)];this.speedAccentId=(r==null?void 0:r.project.id)??null,this.speedAccentTimer=8+Math.random()*6}if(this.entityList.forEach((n,r)=>{var S,E,U,z,K,I,O,H,J,Y,X,Q,ee,ue,W,$,fe,Se,_e,Pe,Ue;const o=n.project.id===this.focusedId,a=n.project.id===this.draggingId,l=r===this.activeIndex,c=this.slotSystem.getSlotForShard(n.project.id),h=this.slotPreviewIds.has(n.project.id);n.orbitBoostTarget=this.speedAccentId===n.project.id?1.055:1,n.orbitBoost=be(n.orbitBoost,n.orbitBoostTarget,.55,e);let d=this.computeOrbitTarget(n,t,l),f=l?1.1:1,g=this.focusedId?o?1:.26:1,v=n.snapped?"snapped":"orbiting";if(n.slotPulse=be(n.slotPulse,c!=null&&c.activated?1:this.slotSystem.getProximity(n.project.id,n.group.position),10,e),c&&(n.slotIndicator.position.set(c.worldPosition.x,c.worldPosition.y,c.worldPosition.z),n.slotIndicator.material.opacity=this.externalLayoutActive?0:n.slotPulse*(c.activated?.82:.52),n.slotIndicator.scale.setScalar(.8+n.slotPulse*.35+Math.sin(t*3+r)*.03)),this.externalLayoutActive){const ae=((S=this.externalLayoutVisuals)==null?void 0:S[r])??null;if((E=this.externalLayoutPositions)!=null&&E[r]?d=this.externalLayoutPositions[r]:this.externalTransitionFrom[r]&&this.externalTransitionTo[r]&&(d=this.externalTransitionFrom[r].clone().lerp(this.externalTransitionTo[r],this.externalTransitionProgress)),this.externalLayoutPositions&&n.group.position.distanceToSquared(d)>14*14&&(n.group.position.copy(d),ae&&(n.group.rotation.z=ae.shapeKind==="round"?0:ae.spinPhase),n.hiddenUntil=t+.08),f=(ae==null?void 0:ae.scale.x)??((U=this.externalLayoutScales)==null?void 0:U[r])??1.02,g=1,v="orbiting",ae){n.group.rotation.x=be(n.group.rotation.x,0,9,e),n.group.rotation.y=be(n.group.rotation.y,0,9,e),n.group.rotation.z=be(n.group.rotation.z,ae.shapeKind==="round"?0:ae.spinPhase,8,e);const Le=this.getGameGeometry(ae.shapeKind);if(n.core.geometry!==Le&&(n.core.geometry=Le),n.group.scale.x=be(n.group.scale.x,ae.scale.x,6,e),n.group.scale.y=be(n.group.scale.y,ae.scale.y,6,e),n.group.scale.z=be(n.group.scale.z,ae.scale.z,6,e),ae.tint?(n.core.material.color.set(ae.tint),n.core.material.emissive.set(ae.tint)):hn(n.core.material,this.theme),ae.ringTint){n.accentRing.visible=!0,n.accentRing.material.color.set(ae.ringTint),n.accentRing.material.opacity=.58+(ae.pulse??0)*.3;const R=ae.ringScale??Math.max(ae.scale.x,ae.scale.y)*1.4;n.accentRing.scale.setScalar(R)}else n.accentRing.visible=!1}else n.core.geometry!==this.roundGeometry&&(n.core.geometry=this.roundGeometry,hn(n.core.material,this.theme),n.accentRing.visible=!1)}else a?(d=n.dragTarget,f=1.06,v="dragging"):n.snapped?(d=new w(c.worldPosition.x,c.worldPosition.y,c.worldPosition.z),f=1.08,v="snapped"):h&&c?(d=new w(c.worldPosition.x,c.worldPosition.y,c.worldPosition.z),f=1.04,v="snapped"):o&&(d=this.focusTargetPosition,f=2.55,v=i==="focus_exit"?"focus_exit":i==="focus"?"focused":"focus_enter");n.runtimeState==="focus_exit"&&!this.focusedId?(n.focusAmount=be(n.focusAmount,0,10,e),n.focusAmount<.05&&(n.runtimeState=n.snapped?"snapped":"orbiting")):n.runtimeState=v;const m=a?18:o?14:n.snapped?13:6.5;n.group.position.x=be(n.group.position.x,d.x,m,e),n.group.position.y=be(n.group.position.y,d.y,m,e),n.group.position.z=be(n.group.position.z,d.z,m,e);const p=this.hoveredId===n.project.id&&!this.focusedId&&!a?1:0,M=a?1:0,_=o?1:0;if(n.hoverAmount=be(n.hoverAmount,p,10,e),n.dragAmount=be(n.dragAmount,M,12,e),n.focusAmount=be(n.focusAmount,_,10,e),n.opacity=be(n.opacity,g,9,e),n.group.visible=t>=n.hiddenUntil,n.facetAnimation.active){n.facetAnimation.progress=Math.min(1,n.facetAnimation.progress+e*1.8);const ae=Math.sin(n.facetAnimation.progress*Math.PI)*Math.PI*.92*n.facetAnimation.direction;n.manualRotationY=ae,!n.facetAnimation.swapped&&n.facetAnimation.progress>=.5&&(n.activeFacet=ks(n.activeFacet+n.facetAnimation.direction,n.project.facets.length),n.facetAnimation.swapped=!0),n.facetAnimation.progress>=1&&(n.facetAnimation.active=!1,n.manualRotationY=0)}else n.manualRotationY=be(n.manualRotationY,0,14,e);const T=o?0:n.group.rotation.x+e*(.11+r*.001),L=o?n.manualRotationY:n.group.rotation.y+e*(.18+r*.002),P=o?0:n.group.rotation.z+e*(.08+r*.0015);this.externalLayoutActive||(n.group.rotation.x=be(n.group.rotation.x,T,o?12:2,e),n.group.rotation.y=be(n.group.rotation.y,L,o?12:2,e),n.group.rotation.z=be(n.group.rotation.z,P,o?12:2,e));const C=o?.06:n.snapped?.96:1;this.externalLayoutActive||(n.hiddenUntil=0,n.accentRing.visible=!1,n.core.geometry!==this.roundGeometry&&(n.core.geometry=this.roundGeometry),n.group.scale.x=be(n.group.scale.x,f,8,e),n.group.scale.y=be(n.group.scale.y,f,8,e),n.group.scale.z=be(n.group.scale.z,f*C,8,e)),n.core.material.opacity=n.opacity,n.core.material.emissiveIntensity=.08+n.hoverAmount*.18+(l?.08:0)+n.slotPulse*.06+(((K=(z=this.externalLayoutVisuals)==null?void 0:z[r])==null?void 0:K.pulse)??0);const N=((O=(I=this.externalLayoutVisuals)==null?void 0:I[r])==null?void 0:O.shapeKind)??null;Vr(n.core.material,{time:t,hover:n.hoverAmount,drag:n.dragAmount,focus:n.focusAmount,settled:this.externalLayoutActive?N&&N!=="round"?.16:0:n.focusAmount*.25,snap:this.externalLayoutActive?((J=(H=this.externalLayoutVisuals)==null?void 0:H[r])==null?void 0:J.fragmentAmount)??0:n.snapped||h?.96+n.slotPulse*.22:0,orbitAngle:((X=(Y=this.externalLayoutVisuals)==null?void 0:Y[r])==null?void 0:X.deformAngle)??0,orbitPulse:this.externalLayoutActive?((ee=(Q=this.externalLayoutVisuals)==null?void 0:Q[r])==null?void 0:ee.deformStrength)??0:0,waveDensity:this.externalLayoutActive?((W=(ue=this.externalLayoutVisuals)==null?void 0:ue[r])==null?void 0:W.deformDensity)??.72:n.snapped||h?1.56:.42,stripeMix:((fe=($=this.externalLayoutVisuals)==null?void 0:$[r])==null?void 0:fe.stripeMix)??0,stripePhase:((_e=(Se=this.externalLayoutVisuals)==null?void 0:Se[r])==null?void 0:_e.stripePhase)??0,stripeColor:((Ue=(Pe=this.externalLayoutVisuals)==null?void 0:Pe[r])==null?void 0:Ue.stripeTint)??void 0}),n.logoPlanes.forEach((ae,Le)=>{const R=this.externalLayoutActive||this.focusedId?0:n.opacity;ae.material.opacity=R*(.65+Le*.1)})}),this.updateGameFieldEntities(e,t),this.updateConstellationLines(),this.focusedId){const n=this.entities.get(this.focusedId);this.focusSettled=!!(n&&Math.abs(n.group.position.x-this.focusTargetPosition.x)<.05&&Math.abs(n.group.position.y-this.focusTargetPosition.y)<.05&&Math.abs(n.group.position.z-this.focusTargetPosition.z)<.05&&Math.abs(n.group.scale.x-2.55)<.05)}else this.focusSettled=!1}updateGameFieldEntities(e,t){if(!this.externalLayoutActive){this.gameFieldEntities.forEach((i,n)=>{if(n>=Rn){i.group.visible=!1,i.hiddenUntil=0;return}const r=i.orbitPhase+t*i.orbitSpeed,o=i.anchor.x+Math.cos(r)*i.orbitRadius,a=i.anchor.y+Math.sin(r*.82)*i.orbitRadius*.9,l=i.anchor.z+Math.sin(r)*i.orbitRadius*.72;i.group.visible=!0,i.group.position.x=be(i.group.position.x,o,4.6,e),i.group.position.y=be(i.group.position.y,a,4.6,e),i.group.position.z=be(i.group.position.z,l,4.6,e),i.group.rotation.x=be(i.group.rotation.x,i.group.rotation.x+e*.18,2,e),i.group.rotation.y=be(i.group.rotation.y,i.group.rotation.y+e*.24,2,e),i.group.rotation.z=be(i.group.rotation.z,i.group.rotation.z+e*.14,2,e),i.group.scale.setScalar(be(i.group.scale.x,.18+Math.sin(t*1.8+n)*.012,6,e)),i.accentRing.visible=!1,i.core.material.opacity=this.focusedId?.1:.22,i.core.material.emissiveIntensity=this.focusedId?.02:.06,hn(i.core.material,this.theme),Vr(i.core.material,{time:t,hover:0,drag:0,focus:0,settled:0,snap:0,orbitAngle:r,orbitPulse:.08,waveDensity:.36,stripeMix:0})});return}this.gameFieldEntities.forEach((i,n)=>{var f,g;const r=this.entityList.length+n,o=this.externalTransitionTo[r]??null,a=((f=this.externalLayoutPositions)==null?void 0:f[r])??(o?i.group.position.clone().lerp(o,this.externalTransitionProgress):null),l=((g=this.externalLayoutVisuals)==null?void 0:g[r])??null;if((!a||!l)&&!o){i.group.visible=!1,i.accentRing.visible=!1;return}const c=a??o??i.group.position;this.externalLayoutPositions&&i.group.position.distanceToSquared(c)>14*14&&(i.group.position.copy(c),l&&(i.group.rotation.z=l.shapeKind==="round"?0:l.spinPhase),i.hiddenUntil=t+.08),i.group.visible=t>=i.hiddenUntil,i.group.position.x=be(i.group.position.x,c.x,7.2,e),i.group.position.y=be(i.group.position.y,c.y,7.2,e),i.group.position.z=be(i.group.position.z,c.z,7.2,e),i.group.rotation.x=be(i.group.rotation.x,0,8,e),i.group.rotation.y=be(i.group.rotation.y,0,8,e);const h=(l==null?void 0:l.shapeKind)??"round",u=(l==null?void 0:l.scale)??new w(.22,.22,.22);i.group.rotation.z=be(i.group.rotation.z,h==="round"?0:(l==null?void 0:l.spinPhase)??0,8,e),i.group.scale.x=be(i.group.scale.x,u.x,6,e),i.group.scale.y=be(i.group.scale.y,u.y,6,e),i.group.scale.z=be(i.group.scale.z,u.z,6,e);const d=this.getGameGeometry(h);i.core.geometry!==d&&(i.core.geometry=d),l!=null&&l.tint?(i.core.material.color.set(l.tint),i.core.material.emissive.set(l.tint)):hn(i.core.material,this.theme),l!=null&&l.ringTint?(i.accentRing.visible=!0,i.accentRing.material.color.set(l.ringTint),i.accentRing.material.opacity=.62+(l.pulse??.06)*.32,i.accentRing.scale.setScalar(l.ringScale??Math.max(u.x,u.y)*1.42)):i.accentRing.visible=!1,i.core.material.opacity=1-((l==null?void 0:l.fragmentAmount)??0)*.92,i.core.material.emissiveIntensity=.08+((l==null?void 0:l.pulse)??.06),Vr(i.core.material,{time:t,hover:0,drag:0,focus:0,settled:h==="round"?0:.16,snap:(l==null?void 0:l.fragmentAmount)??0,orbitAngle:(l==null?void 0:l.deformAngle)??0,orbitPulse:(l==null?void 0:l.deformStrength)??0,waveDensity:(l==null?void 0:l.deformDensity)??.72,stripeMix:(l==null?void 0:l.stripeMix)??0,stripePhase:(l==null?void 0:l.stripePhase)??0,stripeColor:(l==null?void 0:l.stripeTint)??void 0})})}syncLivePivot(e){const t=this.entityList.find(i=>i.project.role==="presentation");if(!t){this.pivot.set(0,0,0);return}this.pivot.set(t.layoutAnchor.x,t.layoutAnchor.y,t.layoutAnchor.z)}computeOrbitTarget(e,t,i){const n=e.orbitPhase+t*e.orbitSpeed*e.orbitBoost,r=e.layoutAnchor.clone();if(e.project.role==="presentation")return new w(this.pivot.x+Math.cos(n)*1.9,this.pivot.y+Math.sin(n*.85)*.72,this.pivot.z+Math.sin(n)*2.6+(i?.35:0));if(e.project.role==="hint")return new w(this.pivot.x+Math.sin(n*.42)*.45,this.pivot.y+Math.cos(n)*5.05,this.pivot.z+Math.sin(n)*4.2+(i?.24:0));const a=Math.atan2(r.y,r.x||1e-4)+n,l=4.1+Math.abs(r.x)*.6+Math.abs(r.y)*.2,c=Yt.clamp(r.y*.05,-.36,.36),h=Math.cos(a)*l,u=Math.sin(a)*l,d=new w(this.pivot.x+h,this.pivot.y+r.y*.78+Math.sin(a*1.1+e.orbitHeight)*.55+u*c*.16,this.pivot.z+u+r.z*.45);return i&&(d.z+=.38),d}createShard(e,t){const i=new Rt,n=jg(t),r=new w(n.x,n.y,n.z),o=Math.max(1,this.slotSystem.getSlots().length);i.position.copy(r),this.root.add(i);const a=this.roundGeometry,l=Ul(this.theme,t*17+11),c=new vt(a,l);c.userData.shardId=e.id,i.add(c),this.pickTargets.push(c);const h=new vt(new Xs(1,1.18,36),new ni({color:this.theme==="dark"?"#D4BF9B":"#393F4A",transparent:!0,opacity:0,side:zt,depthWrite:!1}));h.visible=!0,this.root.add(h);const u=this.createAccentRing();u.visible=!1,i.add(u);const d={project:e,group:i,core:c,logoPlanes:[],layoutAnchor:r,orbitRadius:r.length(),orbitPhase:t/o*Math.PI*2,orbitSpeed:e.role==="presentation"?.34:e.role==="hint"?.58:.38+t*.012,orbitBoost:1,orbitBoostTarget:1,orbitHeight:t*.9,orbitDepth:t*.55,velocity:new w,dragTarget:new w,dragOffset:new w,hoverAmount:0,dragAmount:0,focusAmount:0,opacity:1,activeFacet:0,runtimeState:"orbiting",snapped:!1,slotIndicator:h,slotPulse:0,manualRotationY:0,facetAnimation:{active:!1,direction:1,progress:0,swapped:!1},hiddenUntil:0,accentRing:u};return this.entities.set(e.id,d),this.createLogoPlanes(d),d}createGameFieldShard(e){const t=new Rt;t.visible=!1,this.root.add(t);const i=Ul(this.theme,900+e*23),n=new vt(this.roundGeometry,i);t.add(n);const r=this.createAccentRing();r.visible=!1,t.add(r);const o=this.getGameFieldAnchor(e);return{group:t,core:n,accentRing:r,anchor:o,orbitPhase:e*.37,orbitSpeed:.32+e%7*.018,orbitRadius:.22+e%4*.06,hiddenUntil:0}}createAccentRing(){return new vt(new Xs(1.08,1.26,48),new ni({color:"#4B74FF",transparent:!0,opacity:0,side:zt,depthWrite:!1}))}getGameFieldAnchor(e){if(e>=Rn)return new w(0,0,0);const t=Math.ceil(Rn/2),i=e<t,n=i?e:e-t,r=i?t:Rn-t,a=(r<=1?0:n/(r-1))*2-1,l=.38+Math.abs(a)*.78,c=a*10.8,h=(i?1:-1)*a*6.6*l,u=(i?1:-1)*a*4.2;return new w(c,h,u)}createLogoPlanes(e){const t=this.theme==="dark"?e.project.logo.dark:e.project.logo.light,i=1.7*e.project.logo.scale,n=[0,Math.PI*(2/3),Math.PI*(4/3)];this.loader.load(t,r=>{r.colorSpace=dt,r.anisotropy=4,n.forEach(o=>{const a=new Kn(i,i,12,12),l=a.attributes.position;for(let u=0;u<l.count;u+=1){const d=l.getX(u),f=l.getY(u),g=Math.sqrt(d*d+f*f)/(i*.7);l.setZ(u,Math.sin(g*Math.PI*.5)*.22)}a.computeVertexNormals();const c=new ni({map:r,transparent:!0,opacity:e.project.logo.opacity,side:zt,depthWrite:!1}),h=new vt(a,c);h.position.set(Math.sin(o)*1.48,0,Math.cos(o)*1.48),h.lookAt(0,0,0),h.userData.shardId=e.project.id,e.group.add(h),e.logoPlanes.push(h),this.pickTargets.push(h)})})}updateLogoTexture(e){const t=this.theme==="dark"?e.project.logo.dark:e.project.logo.light;this.loader.load(t,i=>{i.colorSpace=dt,e.logoPlanes.forEach(n=>{n.material.map=i,n.material.needsUpdate=!0})})}createBackgroundPoints(){const e=new St,t=new Float32Array(240*3);for(let i=0;i<240;i+=1){const n=26+Math.random()*20,r=Math.random()*Math.PI*2,o=(Math.random()-.5)*18;t[i*3]=Math.cos(r)*n,t[i*3+1]=o,t[i*3+2]=Math.sin(r)*6-8}return e.setAttribute("position",new Lt(t,3)),new ng(e,new fc({color:this.theme==="dark"?"#D4BF9B":"#393F4A",size:.08,transparent:!0,opacity:.35}))}createConstellationLines(){const e=()=>{const t=new St;t.setAttribute("position",new st([],3));const i=new fo({color:this.theme==="dark"?"#D4BF9B":"#393F4A",transparent:!0,opacity:.9}),n=new Kr(t,i);return this.root.add(n),n};return[e(),e(),e()]}updateConstellationLines(){if(this.externalLayoutActive){this.constellationLines.forEach(i=>{i.visible=!1});return}const e=this.slotSystem.getSlots();[[e[1],e[2],e[0],e[6],e[5]],[e[3],e[4],e[0],e[8],e[7]],[e[0],e[9]]].forEach((i,n)=>{const r=i.filter(Boolean).filter(l=>l.activated).map(l=>l.worldPosition),o=this.constellationLines[n];if(r.length<2){o.visible=!1,o.geometry.setAttribute("position",new st([],3));return}const a=new Float32Array(r.length*3);r.forEach((l,c)=>{a[c*3]=l.x,a[c*3+1]=l.y,a[c*3+2]=l.z}),o.visible=!0,o.geometry.setAttribute("position",new Lt(a,3)),o.geometry.computeBoundingSphere()})}}class To{constructor(e){y(this,"slots");this.slots=e.map((t,i,n)=>({shardId:t,worldPosition:To.computePosition(i,n.length),snapRadius:3.05,activated:!1}))}static computePosition(e,t){return Yg(e<t?e:0)}getSlots(){return this.slots}getSlotForShard(e){return this.slots.find(t=>t.shardId===e)||null}getProximity(e,t){const i=this.getSlotForShard(e);if(!i||i.activated)return 0;const n=vl(i.worldPosition,t);return Math.max(0,1-n/(i.snapRadius*2.75))}canSnap(e,t){const i=this.getSlotForShard(e);return!i||i.activated?null:vl(i.worldPosition,t)<=i.snapRadius?i:null}activate(e){const t=this.getSlotForShard(e);return t?(t.activated=!0,t):null}deactivate(e){const t=this.getSlotForShard(e);return t?(t.activated=!1,t):null}reset(){this.slots.forEach(e=>{e.activated=!1})}isUnlocked(){return this.slots.every(e=>e.activated)}}class G_{constructor(e,t,i,n,r){y(this,"pointerDown",!1);y(this,"downX",0);y(this,"downY",0);y(this,"lastX",0);y(this,"lastY",0);y(this,"dragged",!1);y(this,"sceneOrbiting",!1);y(this,"downShardId",null);y(this,"focusGesture",!1);y(this,"onPointerDown",e=>{const t=this.getMode();if(t==="intro"||t==="intro_shattering"||t==="intro_transition"||t==="about_section"||t==="game_transition"||t==="game"||t==="game_over")return;this.pointerDown=!0,this.dragged=!1,this.sceneOrbiting=!1,this.focusGesture=!1,this.downX=e.clientX,this.downY=e.clientY,this.lastX=e.clientX,this.lastY=e.clientY,this.canvas.setPointerCapture(e.pointerId);const i=this.world.pick(e.clientX,e.clientY,this.canvas,this.camera);this.downShardId=(i==null?void 0:i.shardId)||null,!(t==="focus"||t==="focus_facet_transition"||t==="focus_enter")&&i&&this.callbacks.onHover(i.shardId)});y(this,"onPointerMove",e=>{const t=this.getMode(),i=e.clientX-this.downX,n=e.clientY-this.downY,r=e.clientX-this.lastX,o=e.clientY-this.lastY,a=Math.hypot(i,n);if(!this.pointerDown){if(t==="orbit"||t==="dragging"||t==="constellation_complete"){const c=this.world.pick(e.clientX,e.clientY,this.canvas,this.camera);this.callbacks.onHover((c==null?void 0:c.shardId)||null)}return}if(t==="focus"||t==="focus_enter"){Math.abs(i)>12&&Math.abs(i)>Math.abs(n)&&(this.focusGesture=!0,this.callbacks.onFocusRotation(i));return}const l=this.downShardId?this.world.getDragThreshold(this.downShardId):8;if((t==="orbit"||t==="constellation_complete"||t==="dragging")&&this.downShardId&&a>l){const c=this.world.projectPointerToDragPlane(e.clientX,e.clientY,this.canvas,this.camera);if(!c)return;this.dragged||(this.dragged=this.callbacks.onDragStart(this.downShardId,c)),this.dragged&&this.callbacks.onDragMove(c);return}(t==="orbit"||t==="constellation_complete")&&!this.downShardId&&a>4&&(this.sceneOrbiting=!0,this.callbacks.onSceneOrbitMove(r,o)),this.lastX=e.clientX,this.lastY=e.clientY});y(this,"onPointerUp",e=>{const t=this.getMode(),i=Math.hypot(e.clientX-this.downX,e.clientY-this.downY);if(this.canvas.hasPointerCapture(e.pointerId)&&this.canvas.releasePointerCapture(e.pointerId),this.dragged){this.callbacks.onDragEnd(),this.reset();return}if(t==="focus"||t==="focus_enter"){if(this.focusGesture)this.callbacks.onFocusRotationEnd();else{const n=this.world.pick(e.clientX,e.clientY,this.canvas,this.camera);n&&n.shardId===this.world.getFocusedEntityId()?this.callbacks.onFocusSideTap(e.clientX<window.innerWidth/2?"left":"right"):this.callbacks.onBackgroundClick()}this.reset();return}if(this.sceneOrbiting){this.reset();return}if((t==="orbit"||t==="constellation_complete")&&i<=8){const n=this.world.pick(e.clientX,e.clientY,this.canvas,this.camera);n?this.callbacks.onShardClick(n.shardId):this.callbacks.onHover(null)}this.reset()});y(this,"onPointerLeave",()=>{this.dragged&&this.callbacks.onDragEnd(),this.callbacks.onHover(null),this.reset()});this.canvas=e,this.camera=t,this.world=i,this.getMode=n,this.callbacks=r,this.canvas.addEventListener("pointerdown",this.onPointerDown),this.canvas.addEventListener("pointermove",this.onPointerMove),this.canvas.addEventListener("pointerup",this.onPointerUp),this.canvas.addEventListener("pointerleave",this.onPointerLeave)}reset(){this.pointerDown=!1,this.dragged=!1,this.sceneOrbiting=!1,this.focusGesture=!1,this.downShardId=null,this.lastX=0,this.lastY=0}}const V_={dark:{background:new Oe("#393F4A"),foreground:new Oe("#D4BF9B")},light:{background:new Oe("#D4BF9B"),foreground:new Oe("#393F4A")}};class H_{constructor(e){y(this,"scene",new ig);y(this,"camera",new Bt(42,1,.1,200));y(this,"renderer",new dc({antialias:!0,alpha:!0,powerPreference:"high-performance"}));y(this,"cameraTarget",new w(0,.5,24));y(this,"cameraCurrent",new w(0,.5,24));y(this,"lookTarget",new w(0,0,0));y(this,"lookCurrent",new w(0,0,0));y(this,"ambientLight",new Wg(16777215,.95));y(this,"keyLight",new Hg(16777215,1.4));y(this,"rimLight",new Gg(16777215,25,80,2));y(this,"cameraPositionResponse",8);y(this,"lookResponse",8);y(this,"resize",()=>{const e=this.host.clientWidth||window.innerWidth,t=this.host.clientHeight||window.innerHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1)});this.host=e,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.domElement.className="app-canvas",this.host.appendChild(this.renderer.domElement),this.keyLight.position.set(12,10,16),this.rimLight.position.set(0,-6,22),this.scene.add(this.ambientLight,this.keyLight,this.rimLight),this.resize(),this.setTheme("dark"),window.addEventListener("resize",this.resize)}setTheme(e){const t=V_[e];this.scene.background=t.background.clone(),this.ambientLight.color.copy(t.foreground),this.keyLight.color.copy(t.foreground),this.rimLight.color.copy(t.foreground)}setCameraTarget(e,t){this.cameraTarget.copy(e),this.lookTarget.copy(t)}setCameraResponse(e,t=e){this.cameraPositionResponse=Math.max(1,e),this.lookResponse=Math.max(1,t)}update(e){this.cameraCurrent.x=be(this.cameraCurrent.x,this.cameraTarget.x,this.cameraPositionResponse,e),this.cameraCurrent.y=be(this.cameraCurrent.y,this.cameraTarget.y,this.cameraPositionResponse,e),this.cameraCurrent.z=be(this.cameraCurrent.z,this.cameraTarget.z,this.cameraPositionResponse,e),this.lookCurrent.x=be(this.lookCurrent.x,this.lookTarget.x,this.lookResponse,e),this.lookCurrent.y=be(this.lookCurrent.y,this.lookTarget.y,this.lookResponse,e),this.lookCurrent.z=be(this.lookCurrent.z,this.lookTarget.z,this.lookResponse,e),this.rimLight.position.z=this.cameraCurrent.z-2,this.camera.position.copy(this.cameraCurrent),this.camera.lookAt(this.lookCurrent)}render(){this.renderer.render(this.scene,this.camera)}projectWorldToScreen(e){const t=e.clone().project(this.camera);return{x:(t.x+1)*.5*(this.host.clientWidth||window.innerWidth),y:(1-t.y)*.5*(this.host.clientHeight||window.innerHeight),visible:t.z>=-1&&t.z<=1}}}const un={title:{fr:"À propos",en:"About"},paragraphs:[{fr:"Passionné par la création sous toutes ses formes, je combine développement web, réalisation audiovisuelle, montage vidéo et design graphique pour donner vie à des projets uniques.",en:"Passionate about creation in all its forms, I combine web development, audiovisual production, video editing, and graphic design to bring unique projects to life."},{fr:"Mon approche multidisciplinaire me permet de créer des expériences complètes, de la conception à la réalisation.",en:"My multidisciplinary approach allows me to create complete experiences, from concept to delivery."}],skills:[{title:{fr:"Développement",en:"Development"},body:{fr:"JavaScript, React, Three.js, Node.js, Ruby on Rails",en:"JavaScript, React, Three.js, Node.js, Ruby on Rails"}},{title:{fr:"Réalisation",en:"Production"},body:{fr:"Direction artistique, scénarisation, storyboarding",en:"Art direction, scriptwriting, storyboarding"}},{title:{fr:"Vidéo",en:"Video"},body:{fr:"Montage, motion design, VFX, color grading",en:"Editing, motion design, VFX, color grading"}},{title:{fr:"Graphisme",en:"Design"},body:{fr:"UI/UX, branding, illustration, design system",en:"UI/UX, branding, illustration, design systems"}}],contactTitle:{fr:"Contact",en:"Contact"},contactText:{fr:"Intéressé par une collaboration ? N’hésitez pas à me contacter.",en:"Interested in collaborating? Feel free to reach out."}},W_=[{id:"email",href:"mailto:contact.bheall@gmail.com",label:{fr:"Email",en:"Email"}},{id:"github",href:"https://github.com/orgs/ApeProd",label:{fr:"GitHub",en:"GitHub"}},{id:"x",href:"https://x.com/BhealLfr",label:{fr:"X",en:"X"}}];class X_{constructor(e,t){y(this,"element");y(this,"panel");y(this,"closeButton");y(this,"isOpen",!1);y(this,"onClose",null);this.i18n=t,this.element=document.createElement("div"),this.element.className="about-layer",this.panel=document.createElement("div"),this.panel.className="about-layer__panel",this.panel.dataset.uiInteractive="true",this.closeButton=document.createElement("button"),this.closeButton.className="about-layer__close",this.closeButton.type="button",this.closeButton.addEventListener("click",()=>this.close()),this.panel.appendChild(this.closeButton),this.element.appendChild(this.panel),this.element.addEventListener("click",i=>{i.target===this.element&&this.close()}),e.appendChild(this.element),this.i18n.onChange(i=>this.render(i)),this.render(this.i18n.current)}open(){this.isOpen=!0,this.element.classList.add("is-open")}close(){var e;this.isOpen&&(this.isOpen=!1,this.element.classList.remove("is-open"),(e=this.onClose)==null||e.call(this))}get opened(){return this.isOpen}render(e){this.closeButton.textContent=this.i18n.t("close");const t=un.skills.map(r=>`
          <article class="about-layer__skill">
            <h3>${r.title[e]}</h3>
            <p>${r.body[e]}</p>
          </article>
        `).join(""),i=W_.map(r=>`
          <a class="about-layer__link" href="${r.href}" target="${r.id==="email"?"_self":"_blank"}" rel="noopener">
            ${r.label[e]}
          </a>
        `).join("");this.panel.innerHTML=`
      <button class="about-layer__close" type="button">${this.i18n.t("close")}</button>
      <h2>${un.title[e]}</h2>
      <p>${un.paragraphs[0][e]}</p>
      <p>${un.paragraphs[1][e]}</p>
      <div class="about-layer__skills">${t}</div>
      <h3>${un.contactTitle[e]}</h3>
      <p>${un.contactText[e]}</p>
      <div class="about-layer__links">${i}</div>
    `;const n=this.panel.querySelector(".about-layer__close");n&&n.addEventListener("click",()=>this.close())}}class q_{constructor(e,t,i){y(this,"element");y(this,"panel");y(this,"project",null);y(this,"facetIndex",0);y(this,"currentSlide",0);y(this,"gridView",!1);y(this,"callbacks");this.i18n=t,this.callbacks=i,this.element=document.createElement("div"),this.element.className="focus-layer",this.panel=document.createElement("div"),this.panel.className="focus-layer__panel",this.panel.dataset.uiInteractive="true",this.element.appendChild(this.panel),e.appendChild(this.element),this.element.addEventListener("click",n=>{n.target===this.element&&this.callbacks.onClose()}),this.i18n.onChange(()=>this.render())}show(e,t){this.project=e,this.facetIndex=t,this.currentSlide=0,this.gridView=!1,this.render(),this.element.classList.add("is-visible")}hide(){this.element.classList.remove("is-visible"),this.project=null}updateFacet(e){this.facetIndex=e,this.currentSlide=0,this.gridView=!1,this.render()}render(){var a,l;if(!this.project){this.panel.innerHTML="";return}const e=this.i18n.current,t=this.project.facets[this.facetIndex],i=t.images.slice(0,12),n=i[this.currentSlide]||"";this.panel.innerHTML=`
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
    `;const r=this.panel.querySelector(".focus-layer__close"),o=this.panel.querySelectorAll(".focus-layer__facet-btn");r==null||r.addEventListener("click",()=>this.callbacks.onClose()),(a=o[0])==null||a.addEventListener("click",()=>this.callbacks.onPrevFacet()),(l=o[1])==null||l.addEventListener("click",()=>this.callbacks.onNextFacet()),this.bindMediaEvents(i)}renderMedia(e,t){return e.length===0?`<div class="focus-layer__empty">${this.i18n.t("media")}</div>`:e.length===1?`<img class="focus-layer__image" src="${e[0]}" alt="Project media">`:this.gridView?`
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
    `}renderLinks(){if(!this.project)return"";const e=this.project.facets[this.facetIndex],t=Object.entries(e.links).filter(([,i])=>i);return t.length===0?`<span class="focus-layer__empty">${this.i18n.t("links")}</span>`:t.map(([i,n])=>`<a class="focus-layer__link" href="${n}" target="_blank" rel="noopener">${i.toUpperCase()}</a>`).join("")}bindMediaEvents(e){if(e.length<=1)return;const t=this.panel.querySelector(".focus-layer__image"),i=this.panel.querySelectorAll(".focus-layer__slide-nav"),n=this.panel.querySelectorAll(".focus-layer__thumb");t==null||t.addEventListener("click",()=>{this.gridView=!0,this.render()}),i.forEach(r=>r.addEventListener("click",()=>{const o=Number(r.dataset.slideDir)||0;this.currentSlide=(this.currentSlide+o+e.length)%e.length,this.render()})),n.forEach(r=>r.addEventListener("click",()=>{this.currentSlide=Number(r.dataset.slide)||0,this.gridView=!1,this.render()}))}}class j_{constructor(e,t){y(this,"element");y(this,"titleElement");y(this,"bodyElement");y(this,"currentStep","intro");this.host=e,this.i18n=t,this.element=document.createElement("div"),this.element.className="guide-bubble",this.titleElement=document.createElement("p"),this.titleElement.className="guide-bubble__title",this.bodyElement=document.createElement("p"),this.bodyElement.className="guide-bubble__body",this.element.append(this.titleElement,this.bodyElement),this.host.appendChild(this.element),this.i18n.onChange(()=>this.render()),this.render()}setStep(e){e!==this.currentStep&&(this.currentStep=e,this.render())}render(){const e=this.currentStep==="unlocked"?this.i18n.t("unlocked"):this.i18n.t("home"),t={intro:this.i18n.t("introHint"),orbit:this.i18n.t("orbitHint"),focus:this.i18n.t("focusHint"),drag:this.i18n.t("dragHint"),slots:this.i18n.t("slotHint"),unlocked:this.i18n.t("unlockedHint")}[this.currentStep];this.titleElement.textContent=e,this.bodyElement.textContent=t}}const Y_={fr:{theme:"Thème",language:"Langue",about:"About / Outro",backToOrbit:"Retour à l’orbite",unlocked:"Mini-jeu débloqué",locked:"Mini-jeu verrouillé",close:"Fermer",previous:"Précédent",next:"Suivant",technologies:"Technologies",links:"Liens",media:"Médias",clickToGrid:"Cliquez sur le média pour afficher la grille.",introTitle:"Portfolio",introSubtitle:"Bilel Kharbouche",introHint:"Cliquez plusieurs fois pour fissurer la surface.",orbitHint:"Cliquez une shard pour la mettre en focus.",focusHint:"Glissez horizontalement ou utilisez les flèches pour changer de facette.",dragHint:"Faites glisser une shard hors focus pour chercher sa place secrète.",slotHint:"La bonne place réagit quand la bonne shard s’en approche.",unlockedHint:"Toutes les shards sont placées. Le mini-jeu est prêt à être branché.",aboutTitle:"About / Outro",home:"Accueil",gameScore:"Score",gameBest:"Meilleur score",gameBestDistance:"Meilleure distance",gameChain:"Chaîne",gameMomentum:"Momentum",gameCharge:"Charge",gameDistance:"Distance",gameCoins:"Pièces",gameSplits:"Splits",gameRestart:"Recommencer",gamePortfolio:"Portfolio",gameStatusTransition:"Le chemin s’aligne.",gameStatusRunning:"Maintenez bas pour charger. Haut pour sauter.",gameStatusUpgrade:"Sautez vers une branche pour choisir votre item.",gameStatusGameOver:"Run terminée.",gameUpgradeTitle:"Choisissez une amélioration",gameUpgradeHint:"Sautez vers une branche. 1, 2, 3 restent disponibles en secours.",gameShopTitle:"Marché orbital",gameShopHint:"Tournez autour de la shard pour acheter une offre.",gameShopClose:"Retour",gamePathLeft:"Voie gauche",gamePathCenter:"Voie centrale",gamePathRight:"Voie droite",gamePathUpper:"Voie haute",gamePathForward:"Voie frontale",gamePathLower:"Voie basse",gameShopOffer:"Offre orbitale",gamePrice:"Prix",gameOverTitle:"Game Over",gameOverBody:"La caméra vous a dépassé ou la trajectoire a été manquée.",gameOverCamera:"La caméra vous a laissé derrière.",gameOverEnemy:"Un ennemi vous a touché de face.",gameOverBounds:"Vous êtes sorti de la zone jouable.",gameAcquired:"Objet acquis",gameLandingMiss:"Raté",gameLandingGood:"Bon",gameLandingSuper:"Super",gameLandingPerfect:"Parfait",gameLandingTwist:"Twist"},en:{theme:"Theme",language:"Language",about:"About / Outro",backToOrbit:"Back to orbit",unlocked:"Mini-game unlocked",locked:"Mini-game locked",close:"Close",previous:"Previous",next:"Next",technologies:"Technologies",links:"Links",media:"Media",clickToGrid:"Click the media to open the grid.",introTitle:"Portfolio",introSubtitle:"Bilel Kharbouche",introHint:"Click repeatedly to fracture the surface.",orbitHint:"Click a shard to focus it.",focusHint:"Swipe or drag horizontally to change facets.",dragHint:"Drag a shard outside focus to look for its hidden slot.",slotHint:"The correct slot reacts when the correct shard gets close.",unlockedHint:"All shards are placed. The mini-game hook is ready.",aboutTitle:"About / Outro",home:"Home",gameScore:"Score",gameBest:"Best",gameBestDistance:"Best distance",gameChain:"Chain",gameMomentum:"Momentum",gameCharge:"Charge",gameDistance:"Distance",gameCoins:"Coins",gameSplits:"Splits",gameRestart:"Restart",gamePortfolio:"Portfolio",gameStatusTransition:"Aligning the path.",gameStatusRunning:"Hold Down to charge. Press Up to jump.",gameStatusUpgrade:"Jump into a branch to claim an item.",gameStatusGameOver:"Run over.",gameUpgradeTitle:"Choose an upgrade",gameUpgradeHint:"Jump into a branch. 1, 2, 3 remain available as fallback.",gameShopTitle:"Orbital market",gameShopHint:"Rotate around the shard to buy one offer.",gameShopClose:"Return",gamePathLeft:"Left path",gamePathCenter:"Center path",gamePathRight:"Right path",gamePathUpper:"Upper path",gamePathForward:"Forward path",gamePathLower:"Lower path",gameShopOffer:"Orbital offer",gamePrice:"Price",gameOverTitle:"Game Over",gameOverBody:"The camera overtook you or the jump line was lost.",gameOverCamera:"The camera left you behind.",gameOverEnemy:"An enemy hit you from the front.",gameOverBounds:"You left the playable zone.",gameAcquired:"Item acquired",gameLandingMiss:"Miss",gameLandingGood:"Good",gameLandingSuper:"Super",gameLandingPerfect:"Perfect",gameLandingTwist:"Twist"}};class J_{constructor(){y(this,"language");y(this,"listeners",new Set);const e=window.localStorage.getItem("portfolio-language");this.language=e==="en"?"en":"fr",document.documentElement.lang=this.language}get current(){return this.language}toggle(){this.language=this.language==="fr"?"en":"fr",window.localStorage.setItem("portfolio-language",this.language),document.documentElement.lang=this.language,this.listeners.forEach(e=>e(this.language))}t(e){return Y_[this.language][e]}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}}class Z_{constructor(e,t,i,n){y(this,"element");y(this,"topbar");y(this,"activeChip");y(this,"themeButton");y(this,"languageButton");y(this,"aboutButton");y(this,"homeButton");y(this,"unlockChip");y(this,"dots",[]);this.i18n=t,this.content=i,this.element=document.createElement("div"),this.element.className="navigation-hud",this.topbar=document.createElement("div"),this.topbar.className="navigation-hud__topbar",this.activeChip=document.createElement("div"),this.activeChip.className="navigation-hud__chip",this.themeButton=this.createButton(()=>n.onThemeToggle()),this.languageButton=this.createButton(()=>n.onLanguageToggle()),this.aboutButton=this.createButton(()=>n.onAboutToggle()),this.homeButton=this.createButton(()=>n.onHome()),this.unlockChip=document.createElement("div"),this.unlockChip.className="navigation-hud__chip navigation-hud__chip--status",this.topbar.append(this.activeChip,this.homeButton,this.themeButton,this.languageButton,this.aboutButton,this.unlockChip);const r=document.createElement("div");r.className="navigation-hud__rail",this.content.getProjects().forEach((o,a)=>{const l=document.createElement("button");l.className="navigation-hud__dot",l.type="button",l.addEventListener("click",()=>n.onProjectSelect(a)),r.appendChild(l),this.dots.push(l)}),this.element.append(this.topbar,r),e.appendChild(this.element),this.i18n.onChange(()=>this.renderStatic()),this.renderStatic()}setActiveProject(e,t){const i=this.content.getProjectByOrder(e);this.activeChip.textContent=i?i.title[t]:"",this.dots.forEach((n,r)=>{var o;n.classList.toggle("is-active",r===e),n.title=((o=this.content.getProjectByOrder(r))==null?void 0:o.title[t])||""})}setUnlocked(e){this.unlockChip.textContent=e?this.i18n.t("unlocked"):this.i18n.t("locked"),this.unlockChip.classList.toggle("is-unlocked",e)}setAboutOpen(e){this.aboutButton.classList.toggle("is-active",e)}createButton(e){const t=document.createElement("button");return t.className="navigation-hud__button",t.type="button",t.addEventListener("click",e),t}renderStatic(){this.themeButton.textContent=this.i18n.t("theme"),this.languageButton.textContent=this.i18n.t("language"),this.aboutButton.textContent=this.i18n.t("about"),this.homeButton.textContent=this.i18n.t("home")}}class $_{constructor(){y(this,"theme");y(this,"listeners",new Set);const e=window.localStorage.getItem("portfolio-theme");e==="dark"||e==="light"?this.theme=e:this.theme=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",this.applyTheme()}get current(){return this.theme}toggle(){this.theme=this.theme==="dark"?"light":"dark",this.applyTheme()}set(e){e!==this.theme&&(this.theme=e,this.applyTheme())}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}applyTheme(){document.documentElement.dataset.theme=this.theme,window.localStorage.setItem("portfolio-theme",this.theme),this.listeners.forEach(e=>e(this.theme))}}const K_={intro:["intro_shattering"],intro_shattering:["intro_transition"],intro_transition:["orbit"],orbit:["dragging","focus_enter","about_section","constellation_complete","game_transition"],dragging:["orbit","constellation_complete","game_transition"],focus_enter:["focus","focus_exit"],focus:["focus_facet_transition","focus_exit"],focus_facet_transition:["focus"],focus_exit:["orbit","constellation_complete"],about_section:["orbit","constellation_complete"],constellation_complete:["focus_enter","about_section","orbit","game_transition"],game_transition:["game","orbit","constellation_complete"],game:["game_over","orbit","game_transition"],game_over:["game","orbit","game_transition"]};class Q_{constructor(){y(this,"mode","intro");y(this,"listeners",new Set)}get current(){return this.mode}is(e){return this.mode===e}canTransition(e){return e===this.mode?!0:K_[this.mode].includes(e)}setMode(e){if(!this.canTransition(e))throw new Error(`Invalid mode transition from ${this.mode} to ${e}`);if(e===this.mode)return;const t=this.mode;this.mode=e,this.listeners.forEach(i=>i(e,t))}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}}class e0{constructor(e){y(this,"running",!1);y(this,"frameId",0);y(this,"lastTime",0);y(this,"tick",e=>{if(!this.running)return;const t=Math.min((e-this.lastTime)/1e3,.1);this.lastTime=e,this.onFrame(t,e/1e3),this.frameId=requestAnimationFrame(this.tick)});this.onFrame=e}start(){this.running||(this.running=!0,this.lastTime=performance.now(),this.frameId=requestAnimationFrame(this.tick))}stop(){this.running=!1,cancelAnimationFrame(this.frameId)}}const t0={linear:s=>s,easeOutCubic:s=>1-Math.pow(1-s,3),easeInOutCubic:s=>s<.5?4*s*s*s:1-Math.pow(-2*s+2,3)/2,easeOutQuint:s=>1-Math.pow(1-s,5)};class i0{constructor(){y(this,"tweens",new Map);y(this,"nextId",1)}animate(e){const t=this.nextId++,i={id:t,elapsed:0,...e};return i.onUpdate(i.from),this.tweens.set(t,i),t}cancel(e){this.tweens.delete(e)}clear(){this.tweens.clear()}update(e){var t;for(const i of this.tweens.values()){i.elapsed+=e;const n=Math.min(1,i.elapsed/i.duration),r=t0[i.easing](n);i.onUpdate(i.from+(i.to-i.from)*r),n>=1&&(this.tweens.delete(i.id),(t=i.onComplete)==null||t.call(i))}}}class n0{constructor(e){y(this,"content",new s_);y(this,"theme",new $_);y(this,"i18n",new J_);y(this,"mode",new Q_);y(this,"transitions",new i0);y(this,"root");y(this,"canvasHost");y(this,"uiHost");y(this,"renderer");y(this,"slotSystem");y(this,"world");y(this,"intro");y(this,"guide");y(this,"hud");y(this,"about");y(this,"focus");y(this,"gameHud");y(this,"game");y(this,"interaction");y(this,"loop");y(this,"cameraOrbit",new D_);y(this,"introStartCameraPosition",new w(0,1.6,42));y(this,"introStartLookAt",new w(0,0,0));y(this,"cameraFocusBlend",0);y(this,"introTransitionProgress",0);y(this,"gameTransitionProgress",0);y(this,"activeIndex",0);y(this,"lastWheelAt",0);y(this,"hasFocused",!1);y(this,"hasChangedFacet",!1);y(this,"hasDragged",!1);y(this,"seenFacetsByProject",new Map);y(this,"pendingPostFocusExit",null);y(this,"didRunIntroPresentationFocus",!1);y(this,"gameTransitionTweenId",null);y(this,"mobileChargePointerId",null);y(this,"mobileChargeStartY",0);y(this,"mobileChargeStartedAt",0);y(this,"onWheel",e=>{(this.mode.is("orbit")||this.mode.is("constellation_complete"))&&(Date.now()-this.lastWheelAt<120||(this.lastWheelAt=Date.now(),e.preventDefault(),this.stepActiveIndex(e.deltaY>0?1:-1)))});y(this,"onKeyDown",e=>{if(this.mode.is("game_transition")){e.key==="Escape"&&(e.preventDefault(),this.exitGame());return}if(this.mode.is("game")||this.mode.is("game_over")){if(e.key==="Escape"){e.preventDefault(),this.exitGame();return}if(this.mode.is("game")){if(this.game.getHudState().state==="upgrade_choice"&&(e.key==="1"||e.key==="2"||e.key==="3")){e.preventDefault(),this.game.selectUpgradeFallback(Number(e.key)-1)&&this.refreshUI();return}e.key==="ArrowDown"?(e.preventDefault(),this.game.setChargeActive(!0)):e.key==="ArrowUp"&&(e.preventDefault(),this.game.triggerJump());return}(e.key==="Enter"||e.key===" "||e.key==="ArrowUp")&&(e.preventDefault(),this.restartGame());return}if(!(this.mode.is("intro")||this.mode.is("intro_shattering")||this.mode.is("intro_transition"))){if(e.key==="Escape"){this.about.opened?this.about.close():this.exitFocus();return}if(this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition")){e.key==="ArrowLeft"?(e.preventDefault(),this.changeFacet(-1)):e.key==="ArrowRight"&&(e.preventDefault(),this.changeFacet(1));return}if(this.mode.is("orbit")||this.mode.is("constellation_complete")){if(e.key==="ArrowLeft"||e.key==="ArrowUp")e.preventDefault(),this.stepActiveIndex(-1);else if(e.key==="ArrowRight"||e.key==="ArrowDown")e.preventDefault(),this.stepActiveIndex(1);else if(e.key==="Enter"||e.key===" "){e.preventDefault();const t=this.content.getProjectByOrder(this.activeIndex);t&&this.enterFocus(t.id)}}}});y(this,"onKeyUp",e=>{this.mode.is("game")&&e.key==="ArrowDown"&&this.game.setChargeActive(!1)});y(this,"onGamePointerDown",e=>{if(this.mode.is("game_over")){e.preventDefault(),this.restartGame();return}this.mode.is("game")&&(this.mobileChargePointerId=e.pointerId,this.mobileChargeStartY=e.clientY,this.mobileChargeStartedAt=performance.now(),this.game.setChargeActive(!0))});y(this,"onGamePointerUp",e=>{if(!this.mode.is("game")||this.mobileChargePointerId!==e.pointerId)return;const t=this.mobileChargeStartY-e.clientY,i=performance.now()-this.mobileChargeStartedAt;!this.game.setChargeActive(!1)&&(i<180||t>12)&&(this.game.triggerJump(),e.preventDefault()),this.mobileChargePointerId=null,this.mobileChargeStartedAt=0});y(this,"onGamePointerCancel",e=>{this.mobileChargePointerId===e.pointerId&&(this.mobileChargePointerId=null,this.mobileChargeStartedAt=0,this.game.setChargeActive(!1))});this.root=document.createElement("div"),this.root.className="app-shell",this.canvasHost=document.createElement("div"),this.canvasHost.className="app-shell__canvas",this.uiHost=document.createElement("div"),this.uiHost.className="app-shell__ui",this.root.append(this.canvasHost,this.uiHost),e.appendChild(this.root),this.renderer=new H_(this.canvasHost),this.slotSystem=new To(this.content.getProjects().filter(t=>t.role!=="presentation").map(t=>t.id)),this.world=new z_(this.renderer.scene,this.content.getProjects(),this.slotSystem,this.theme.current),this.game=new I_(this.renderer.scene,this.theme.current),this.hud=new Z_(this.uiHost,this.i18n,this.content,{onThemeToggle:()=>this.theme.toggle(),onLanguageToggle:()=>this.i18n.toggle(),onAboutToggle:()=>this.toggleAbout(),onHome:()=>this.returnHome(),onProjectSelect:t=>this.selectProject(t)}),this.about=new X_(this.uiHost,this.i18n),this.focus=new q_(this.uiHost,this.i18n,{onClose:()=>this.exitFocus(),onPrevFacet:()=>this.changeFacet(-1),onNextFacet:()=>this.changeFacet(1)}),this.guide=new j_(this.uiHost,this.i18n),this.intro=new U_(this.uiHost,this.i18n,this.theme),this.gameHud=new h_(this.uiHost,this.i18n,{onRestart:()=>this.restartGame(),onExit:()=>this.exitGame(),onCloseShop:()=>{this.game.closeShopChoice()&&this.refreshUI()},onSelectUpgrade:t=>{this.game.selectUpgradeFallback(t)&&this.refreshUI()}}),this.interaction=new G_(this.renderer.renderer.domElement,this.renderer.camera,this.world,()=>this.mode.current,{onShardClick:t=>this.enterFocus(t),onBackgroundClick:()=>{(this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition"))&&this.exitFocus()},onHover:t=>this.world.setHovered(t),onDragStart:(t,i)=>{if(!(this.mode.is("orbit")||this.mode.is("constellation_complete")))return!1;const n=this.world.beginDrag(t,i);return n&&(this.mode.setMode("dragging"),this.world.setHovered(null)),n},onDragMove:t=>{this.world.updateDrag(t)},onDragEnd:()=>{const t=this.world.endDrag();t.shardId&&(this.hasDragged=!0),!t.unlocked&&this.mode.is("dragging")&&this.resumeOrbitMode(),this.refreshUI(),this.updateGuide()},onSceneOrbitMove:(t,i)=>{(this.mode.is("orbit")||this.mode.is("constellation_complete"))&&this.cameraOrbit.orbit(-t,i)},onFocusRotation:t=>this.world.previewFacetRotation(t),onFocusRotationEnd:()=>{this.world.finishFacetRotation()&&(this.mode.setMode("focus_facet_transition"),this.scheduleFacetCompletion())},onFocusSideTap:t=>this.changeFacet(t==="left"?-1:1)}),this.interaction,this.loop=new e0((t,i)=>this.update(t,i)),this.bindEvents(),this.refreshUI(),this.updateGuide(),this.loop.start()}bindEvents(){this.theme.onChange(t=>{this.renderer.setTheme(t),this.world.setTheme(t),this.game.setTheme(t),this.refreshUI()}),this.i18n.onChange(()=>{this.refreshUI();const t=this.world.getFocusedProject();t&&this.focus.show(t,this.world.getFocusedFacetIndex()),(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))&&this.gameHud.update(this.getGameHudPayload())}),this.game.onScoreChange(()=>{(this.mode.is("game")||this.mode.is("game_over"))&&this.refreshUI()}),this.about.onClose=()=>{this.mode.is("about_section")&&(this.resumeOrbitMode(),this.refreshUI(),this.updateGuide())},this.intro.onBroken=()=>{this.mode.is("intro")&&(this.mode.setMode("intro_shattering"),window.setTimeout(()=>{this.mode.is("intro_shattering")&&this.mode.setMode("intro_transition")},60),this.transitions.animate({from:0,to:1,duration:2.6,easing:"easeOutQuint",onUpdate:t=>{this.introTransitionProgress=t},onComplete:()=>{if(this.introTransitionProgress=1,this.resumeOrbitMode(),this.refreshUI(),this.updateGuide(),!this.didRunIntroPresentationFocus){const t=this.world.getPresentationProjectId();t&&(this.didRunIntroPresentationFocus=!0,this.activeIndex=0,this.world.setActiveIndex(0),window.setTimeout(()=>{this.mode.is("orbit")&&this.enterFocus(t)},220))}}}))},this.world.onUnlocked(()=>{this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over")||(this.mode.is("constellation_complete")||(this.mode.is("dragging")||this.mode.is("orbit"))&&this.mode.setMode("constellation_complete"),this.refreshUI(),this.updateGuide(),this.transitions.animate({from:0,to:1,duration:.9,easing:"easeOutCubic",onUpdate:()=>{},onComplete:()=>{this.slotSystem.isUnlocked()&&this.startGameTransition()}}))}),window.addEventListener("wheel",this.onWheel,{passive:!1}),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp);const e=this.renderer.renderer.domElement;e.addEventListener("pointerdown",this.onGamePointerDown),e.addEventListener("pointerup",this.onGamePointerUp),e.addEventListener("pointercancel",this.onGamePointerCancel)}stepActiveIndex(e){this.activeIndex=ks(this.activeIndex+e,this.content.getProjectCount()),this.world.setActiveIndex(this.activeIndex),this.refreshUI()}selectProject(e){if(this.mode.is("intro")||this.mode.is("intro_shattering")||this.mode.is("intro_transition")||this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))return;this.about.opened&&this.about.close(),this.activeIndex=e,this.world.setActiveIndex(e),this.refreshUI();const t=this.content.getProjectByOrder(e);t&&(this.mode.is("orbit")||this.mode.is("constellation_complete"))&&this.enterFocus(t.id)}enterFocus(e){(this.mode.is("orbit")||this.mode.is("constellation_complete"))&&(this.mode.setMode("focus_enter"),this.world.setFocused(e),this.world.setHovered(null),this.refreshUI())}exitFocus(e){if(!(this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition"))){e==null||e();return}const t=this.world.getFocusedProject();this.pendingPostFocusExit=e||null,this.focus.hide(),this.mode.setMode("focus_exit"),this.world.clearFocus(),this.transitions.animate({from:0,to:1,duration:.55,easing:"easeOutCubic",onUpdate:()=>{},onComplete:()=>{this.resumeOrbitMode(),t&&this.hasSeenAllFacets(t.id)&&this.world.snapShardToSlot(t.id);const i=this.pendingPostFocusExit;this.pendingPostFocusExit=null,i==null||i(),this.refreshUI(),this.updateGuide()}})}changeFacet(e){!this.mode.is("focus")||!this.world.changeFacet(e)||(this.mode.setMode("focus_facet_transition"),this.scheduleFacetCompletion())}scheduleFacetCompletion(){this.transitions.animate({from:0,to:1,duration:.68,easing:"easeInOutCubic",onUpdate:()=>{},onComplete:()=>{if(!this.mode.is("focus_facet_transition"))return;this.mode.setMode("focus");const e=this.world.getFocusedProject();e&&(this.markFacetSeen(e.id,this.world.getFocusedFacetIndex()),this.focus.updateFacet(this.world.getFocusedFacetIndex()),this.hasChangedFacet=!0,this.updateGuide())}})}toggleAbout(){if(this.mode.is("intro")||this.mode.is("intro_shattering")||this.mode.is("intro_transition")||this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))return;if(this.about.opened){this.about.close();return}const e=()=>{this.about.open(),this.mode.setMode("about_section"),this.refreshUI(),this.updateGuide()};if(this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition")){this.exitFocus(e);return}e()}returnHome(){(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))&&this.exitGame(),this.activeIndex=0,this.world.setActiveIndex(0),this.about.opened&&this.about.close(),(this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition"))&&this.exitFocus(),this.refreshUI()}resumeOrbitMode(){if(this.slotSystem.isUnlocked()){this.mode.is("constellation_complete")||(this.mode.is("focus_exit")||this.mode.is("about_section")||this.mode.is("dragging")||this.mode.is("orbit")||this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))&&this.mode.setMode("constellation_complete");return}this.mode.is("orbit")||this.mode.setMode("orbit")}startGameTransition(){if(!this.slotSystem.isUnlocked()||this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))return;if(this.about.opened&&this.about.close(),this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition")){this.exitFocus(()=>this.startGameTransition());return}this.mode.is("dragging")&&this.resumeOrbitMode(),this.mode.is("constellation_complete")||this.mode.setMode("constellation_complete"),this.gameTransitionTweenId!==null&&(this.transitions.cancel(this.gameTransitionTweenId),this.gameTransitionTweenId=null),this.mode.setMode("game_transition"),this.gameTransitionProgress=0,this.game.startTransition();const e=this.getGameFieldCount();this.world.beginExternalLayoutTransition(this.game.getInitialPlatformPositions(e),this.game.getInitialPlatformScales(e),this.game.getInitialPlatformVisuals(e)),this.refreshUI(),this.gameTransitionTweenId=this.transitions.animate({from:0,to:1,duration:2.25,easing:"easeInOutCubic",onUpdate:t=>{this.gameTransitionProgress=t,this.world.setExternalLayoutProgress(t)},onComplete:()=>{this.gameTransitionTweenId=null,this.gameTransitionProgress=1,this.mode.setMode("game"),this.game.beginRun();const t=this.getGameFieldCount();this.world.setExternalLayoutPositions(this.game.getVisiblePlatformPositions(t),this.game.getVisiblePlatformScales(t),this.game.getVisiblePlatformVisuals(t)),this.refreshUI()}})}restartGame(){if(!(this.mode.is("game")||this.mode.is("game_over")))return;this.mode.is("game_over")&&this.mode.setMode("game"),this.game.restart();const e=this.getGameFieldCount();this.world.setExternalLayoutPositions(this.game.getVisiblePlatformPositions(e),this.game.getVisiblePlatformScales(e),this.game.getVisiblePlatformVisuals(e)),this.refreshUI()}exitGame(){if(!(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over")))return;this.gameTransitionTweenId!==null&&(this.transitions.cancel(this.gameTransitionTweenId),this.gameTransitionTweenId=null),this.mobileChargePointerId=null,this.game.setChargeActive(!1);const e=this.world.getOrbitPositions();this.world.beginExternalLayoutTransition(e),this.game.prepareReturnTransition(),(this.mode.is("game")||this.mode.is("game_over"))&&this.mode.setMode("game_transition"),this.gameTransitionTweenId=this.transitions.animate({from:this.gameTransitionProgress,to:0,duration:1.25,easing:"easeInOutCubic",onUpdate:t=>{this.gameTransitionProgress=t,this.world.setExternalLayoutProgress(1-t)},onComplete:()=>{this.gameTransitionTweenId=null,this.game.stop(),this.gameTransitionProgress=0,this.slotSystem.reset(),this.interaction.reset(),this.world.resetPortfolioState(),this.activeIndex=0,this.world.setActiveIndex(0),this.resumeOrbitMode(),this.refreshUI(),this.updateGuide()}})}getGameHudPayload(){const e=this.game.getHudState();return{score:e.score,highscore:e.highscore,distanceMeters:e.distanceMeters,bestDistanceMeters:e.bestDistanceMeters,coins:e.coins,splitTimes:e.splitTimes,chargeRatio:e.chargeRatio,momentumGauge:e.momentumGauge,momentumTier:e.momentumTier,orbitGraceActive:e.orbitGraceActive,orbitGraceProgress:e.orbitGraceProgress,state:e.state,offers:e.offers,branchHints:e.branchHints.reduce((t,i)=>{const n=this.renderer.projectWorldToScreen(i.worldPosition);return n.visible&&t.push({slot:i.slot,offer:i.offer,screenX:n.x,screenY:n.y,mode:i.mode,price:i.price}),t},[]),inventoryItems:e.inventoryItems,landingFeedback:e.landingFeedback?(()=>{const t=this.renderer.projectWorldToScreen(e.landingFeedback.worldPosition);return t.visible?{grade:e.landingFeedback.grade,twist:e.landingFeedback.twist,progress:e.landingFeedback.progress,screenX:t.x,screenY:t.y}:null})():null,acquisition:e.acquisition,gameOverCause:e.gameOverCause}}update(e,t){if(this.transitions.update(e),this.world.update(e,t,this.mode.current),this.game.update(e,t),this.mode.is("game")||this.mode.is("game_over")){const f=this.getGameFieldCount();this.world.setExternalLayoutPositions(this.game.getVisiblePlatformPositions(f),this.game.getVisiblePlatformScales(f),this.game.getVisiblePlatformVisuals(f))}if(this.mode.is("focus_enter")&&this.world.isFocusSettled()){this.mode.setMode("focus");const f=this.world.getFocusedProject();f&&(this.markFacetSeen(f.id,this.world.getFocusedFacetIndex()),this.focus.show(f,this.world.getFocusedFacetIndex()),this.hasFocused=!0,this.updateGuide())}this.mode.is("game")&&this.game.currentState==="game_over"&&this.mode.setMode("game_over"),this.cameraFocusBlend=be(this.cameraFocusBlend,this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition")||this.mode.is("focus_exit")?1:0,8,e);const i=this.world.getOrbitCameraPose(),n=this.cameraOrbit.update(e,this.world.getPivot()),r=this.world.getFocusCameraPose(),o=this.game.getCameraPose(),a=n.position.clone().lerp(r.position,this.cameraFocusBlend),l=n.lookAt.clone().lerp(i.lookAt,.18).lerp(r.lookAt,this.cameraFocusBlend),c=a.clone().lerp(o.position,this.gameTransitionProgress),h=l.clone().lerp(o.lookAt,this.gameTransitionProgress),u=this.introStartCameraPosition.clone().lerp(c,this.introTransitionProgress),d=this.introStartLookAt.clone().lerp(h,this.introTransitionProgress);this.renderer.setCameraResponse(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over")?18:8,this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over")?20:8),this.renderer.setCameraTarget(u,d),this.renderer.update(e),(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))&&this.gameHud.update(this.getGameHudPayload()),this.renderer.render(),this.intro.update(e),this.refreshUI()}refreshUI(){const e=this.world.getFocusedProject(),t=e?this.content.getProjectIndex(e.id):this.activeIndex,i=this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over");this.hud.setActiveProject(t,this.i18n.current),this.hud.setUnlocked(this.slotSystem.isUnlocked()),this.hud.setAboutOpen(this.about.opened),this.hud.element.classList.toggle("is-hidden",i),this.guide.element.classList.toggle("is-hidden",i),this.gameHud.setVisible(i),i&&this.gameHud.update(this.getGameHudPayload()),this.world.setActiveIndex(this.activeIndex)}getGameFieldCount(){const e=Math.max(this.world.getGameFieldCapacity(),this.game.getRecommendedVisibleCount());return this.world.ensureGameFieldCapacity(e),this.world.getGameFieldCapacity()}updateGuide(){if(!(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))){if(this.slotSystem.isUnlocked()){this.guide.setStep("unlocked");return}if(this.mode.is("intro")||this.mode.is("intro_shattering")||this.mode.is("intro_transition")){this.guide.setStep("intro");return}if(!this.hasFocused){this.guide.setStep("orbit");return}if(!this.hasChangedFacet){this.guide.setStep("focus");return}if(!this.hasDragged){this.guide.setStep("drag");return}this.guide.setStep("slots")}}markFacetSeen(e,t){const i=this.seenFacetsByProject.get(e)??new Set;i.add(t),this.seenFacetsByProject.set(e,i)}hasSeenAllFacets(e){var t;return(((t=this.seenFacetsByProject.get(e))==null?void 0:t.size)??0)>=3}}const Pc=document.getElementById("app");if(!Pc)throw new Error("App root not found");new n0(Pc);
