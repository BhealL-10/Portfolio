var Ol=Object.defineProperty;var kl=(s,e,t)=>e in s?Ol(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var S=(s,e,t)=>kl(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Rr="160",Bl=0,Jr=1,zl=2,jo=1,Gl=2,ci=3,bi=0,Rt=1,qt=2,yi=0,on=1,Qr=2,ea=3,ta=4,Hl=5,Li=100,Vl=101,Wl=102,ia=103,na=104,Xl=200,ql=201,jl=202,Yl=203,_r=204,vr=205,Kl=206,$l=207,Zl=208,Jl=209,Ql=210,ec=211,tc=212,ic=213,nc=214,sc=0,rc=1,ac=2,vs=3,oc=4,lc=5,cc=6,hc=7,Yo=0,uc=1,dc=2,Si=0,fc=1,pc=2,mc=3,gc=4,_c=5,vc=6,Ko=300,cn=301,hn=302,xr=303,yr=304,As=306,Sr=1e3,jt=1001,Mr=1002,wt=1003,sa=1004,Os=1005,zt=1006,xc=1007,wn=1008,Mi=1009,yc=1010,Sc=1011,Lr=1012,$o=1013,vi=1014,xi=1015,Pn=1016,Zo=1017,Jo=1018,Ii=1020,Mc=1021,Yt=1023,bc=1024,Ec=1025,Ui=1026,un=1027,Tc=1028,Qo=1029,Ac=1030,el=1031,tl=1033,ks=33776,Bs=33777,zs=33778,Gs=33779,ra=35840,aa=35841,oa=35842,la=35843,il=36196,ca=37492,ha=37496,ua=37808,da=37809,fa=37810,pa=37811,ma=37812,ga=37813,_a=37814,va=37815,xa=37816,ya=37817,Sa=37818,Ma=37819,ba=37820,Ea=37821,Hs=36492,Ta=36494,Aa=36495,wc=36283,wa=36284,Pa=36285,Ca=36286,nl=3e3,Ni=3001,Pc=3200,Cc=3201,sl=0,Rc=1,Gt="",ht="srgb",ui="srgb-linear",Dr="display-p3",ws="display-p3-linear",xs="linear",et="srgb",ys="rec709",Ss="p3",Bi=7680,Ra=519,Lc=512,Dc=513,Ic=514,rl=515,Uc=516,Nc=517,Fc=518,Oc=519,La=35044,Da="300 es",br=1035,hi=2e3,Ms=2001;class fn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const n=this._listeners[e];if(n!==void 0){const r=n.indexOf(t);r!==-1&&n.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const n=i.slice(0);for(let r=0,a=n.length;r<a;r++)n[r].call(this,e);e.target=null}}}const xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ia=1234567;const bn=Math.PI/180,Cn=180/Math.PI;function pn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(xt[s&255]+xt[s>>8&255]+xt[s>>16&255]+xt[s>>24&255]+"-"+xt[e&255]+xt[e>>8&255]+"-"+xt[e>>16&15|64]+xt[e>>24&255]+"-"+xt[t&63|128]+xt[t>>8&255]+"-"+xt[t>>16&255]+xt[t>>24&255]+xt[i&255]+xt[i>>8&255]+xt[i>>16&255]+xt[i>>24&255]).toLowerCase()}function Pt(s,e,t){return Math.max(e,Math.min(t,s))}function Ir(s,e){return(s%e+e)%e}function kc(s,e,t,i,n){return i+(s-e)*(n-i)/(t-e)}function Bc(s,e,t){return s!==e?(t-s)/(e-s):0}function En(s,e,t){return(1-t)*s+t*e}function zc(s,e,t,i){return En(s,e,1-Math.exp(-t*i))}function Gc(s,e=1){return e-Math.abs(Ir(s,e*2)-e)}function Hc(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Vc(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Wc(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Xc(s,e){return s+Math.random()*(e-s)}function qc(s){return s*(.5-Math.random())}function jc(s){s!==void 0&&(Ia=s);let e=Ia+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Yc(s){return s*bn}function Kc(s){return s*Cn}function Er(s){return(s&s-1)===0&&s!==0}function $c(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function bs(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Zc(s,e,t,i,n){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),h=a((e+i)/2),u=r((e-i)/2),f=a((e-i)/2),p=r((i-e)/2),g=a((i-e)/2);switch(n){case"XYX":s.set(o*h,l*u,l*f,o*c);break;case"YZY":s.set(l*f,o*h,l*u,o*c);break;case"ZXZ":s.set(l*u,l*f,o*h,o*c);break;case"XZX":s.set(o*h,l*g,l*p,o*c);break;case"YXY":s.set(l*p,o*h,l*g,o*c);break;case"ZYZ":s.set(l*g,l*p,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function sn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Tt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Qt={DEG2RAD:bn,RAD2DEG:Cn,generateUUID:pn,clamp:Pt,euclideanModulo:Ir,mapLinear:kc,inverseLerp:Bc,lerp:En,damp:zc,pingpong:Gc,smoothstep:Hc,smootherstep:Vc,randInt:Wc,randFloat:Xc,randFloatSpread:qc,seededRandom:jc,degToRad:Yc,radToDeg:Kc,isPowerOfTwo:Er,ceilPowerOfTwo:$c,floorPowerOfTwo:bs,setQuaternionFromProperEuler:Zc,normalize:Tt,denormalize:sn};class xe{constructor(e=0,t=0){xe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Pt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),n=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*n+e.x,this.y=r*n+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ve{constructor(e,t,i,n,r,a,o,l,c){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,a,o,l,c)}set(e,t,i,n,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=n,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],f=i[2],p=i[5],g=i[8],_=n[0],m=n[3],d=n[6],b=n[1],v=n[4],T=n[7],R=n[2],w=n[5],P=n[8];return r[0]=a*_+o*b+l*R,r[3]=a*m+o*v+l*w,r[6]=a*d+o*T+l*P,r[1]=c*_+h*b+u*R,r[4]=c*m+h*v+u*w,r[7]=c*d+h*T+u*P,r[2]=f*_+p*b+g*R,r[5]=f*m+p*v+g*w,r[8]=f*d+p*T+g*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-i*r*h+i*o*l+n*r*c-n*a*l}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,f=o*l-h*r,p=c*r-a*l,g=t*u+i*f+n*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(n*c-h*i)*_,e[2]=(o*i-n*a)*_,e[3]=f*_,e[4]=(h*t-n*l)*_,e[5]=(n*r-o*t)*_,e[6]=p*_,e[7]=(i*l-c*t)*_,e[8]=(a*t-i*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-n*c,n*l,-n*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Vs.makeScale(e,t)),this}rotate(e){return this.premultiply(Vs.makeRotation(-e)),this}translate(e,t){return this.premultiply(Vs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<9;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Vs=new Ve;function al(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Rn(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Jc(){const s=Rn("canvas");return s.style.display="block",s}const Ua={};function Tn(s){s in Ua||(Ua[s]=!0,console.warn(s))}const Na=new Ve().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Fa=new Ve().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Bn={[ui]:{transfer:xs,primaries:ys,toReference:s=>s,fromReference:s=>s},[ht]:{transfer:et,primaries:ys,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[ws]:{transfer:xs,primaries:Ss,toReference:s=>s.applyMatrix3(Fa),fromReference:s=>s.applyMatrix3(Na)},[Dr]:{transfer:et,primaries:Ss,toReference:s=>s.convertSRGBToLinear().applyMatrix3(Fa),fromReference:s=>s.applyMatrix3(Na).convertLinearToSRGB()}},Qc=new Set([ui,ws]),$e={enabled:!0,_workingColorSpace:ui,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Qc.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;const i=Bn[e].toReference,n=Bn[t].fromReference;return n(i(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return Bn[s].primaries},getTransfer:function(s){return s===Gt?xs:Bn[s].transfer}};function ln(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ws(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let zi;class ol{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{zi===void 0&&(zi=Rn("canvas")),zi.width=e.width,zi.height=e.height;const i=zi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=zi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Rn("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const n=i.getImageData(0,0,e.width,e.height),r=n.data;for(let a=0;a<r.length;a++)r[a]=ln(r[a]/255)*255;return i.putImageData(n,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ln(t[i]/255)*255):t[i]=ln(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let eh=0;class ll{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:eh++}),this.uuid=pn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let a=0,o=n.length;a<o;a++)n[a].isDataTexture?r.push(Xs(n[a].image)):r.push(Xs(n[a]))}else r=Xs(n);i.url=r}return t||(e.images[this.uuid]=i),i}}function Xs(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?ol.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let th=0;class Lt extends fn{constructor(e=Lt.DEFAULT_IMAGE,t=Lt.DEFAULT_MAPPING,i=jt,n=jt,r=zt,a=wn,o=Yt,l=Mi,c=Lt.DEFAULT_ANISOTROPY,h=Gt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:th++}),this.uuid=pn(),this.name="",this.source=new ll(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new xe(0,0),this.repeat=new xe(1,1),this.center=new xe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Tn("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Ni?ht:Gt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ko)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Sr:e.x=e.x-Math.floor(e.x);break;case jt:e.x=e.x<0?0:1;break;case Mr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Sr:e.y=e.y-Math.floor(e.y);break;case jt:e.y=e.y<0?0:1;break;case Mr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Tn("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===ht?Ni:nl}set encoding(e){Tn("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Ni?ht:Gt}}Lt.DEFAULT_IMAGE=null;Lt.DEFAULT_MAPPING=Ko;Lt.DEFAULT_ANISOTROPY=1;class tt{constructor(e=0,t=0,i=0,n=1){tt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*n+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*n+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*n+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*n+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n,r;const l=e.elements,c=l[0],h=l[4],u=l[8],f=l[1],p=l[5],g=l[9],_=l[2],m=l[6],d=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,T=(p+1)/2,R=(d+1)/2,w=(h+f)/4,P=(u+_)/4,U=(g+m)/4;return v>T&&v>R?v<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(v),n=w/i,r=P/i):T>R?T<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(T),i=w/n,r=U/n):R<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(R),i=P/r,n=U/r),this.set(i,n,r,t),this}let b=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(u-_)/b,this.z=(f-h)/b,this.w=Math.acos((c+p+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ih extends fn{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new tt(0,0,e,t),this.scissorTest=!1,this.viewport=new tt(0,0,e,t);const n={width:e,height:t,depth:1};i.encoding!==void 0&&(Tn("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Ni?ht:Gt),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:zt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Lt(n,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new ll(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Fi extends ih{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class cl extends Lt{constructor(e=null,t=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=wt,this.minFilter=wt,this.wrapR=jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class nh extends Lt{constructor(e=null,t=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=wt,this.minFilter=wt,this.wrapR=jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ln{constructor(e=0,t=0,i=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=n}static slerpFlat(e,t,i,n,r,a,o){let l=i[n+0],c=i[n+1],h=i[n+2],u=i[n+3];const f=r[a+0],p=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=f,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==f||c!==p||h!==g){let m=1-o;const d=l*f+c*p+h*g+u*_,b=d>=0?1:-1,v=1-d*d;if(v>Number.EPSILON){const R=Math.sqrt(v),w=Math.atan2(R,d*b);m=Math.sin(m*w)/R,o=Math.sin(o*w)/R}const T=o*b;if(l=l*m+f*T,c=c*m+p*T,h=h*m+g*T,u=u*m+_*T,m===1-o){const R=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=R,c*=R,h*=R,u*=R}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,n,r,a){const o=i[n],l=i[n+1],c=i[n+2],h=i[n+3],u=r[a],f=r[a+1],p=r[a+2],g=r[a+3];return e[t]=o*g+h*u+l*p-c*f,e[t+1]=l*g+h*f+c*u-o*p,e[t+2]=c*g+h*p+o*f-l*u,e[t+3]=h*g-o*u-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,n=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(n/2),u=o(r/2),f=l(i/2),p=l(n/2),g=l(r/2);switch(a){case"XYZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"YXZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"ZXY":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"ZYX":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"YZX":this._x=f*h*u+c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u-f*p*g;break;case"XZY":this._x=f*h*u-c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],n=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],f=i+o+u;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(a-n)*p}else if(i>o&&i>u){const p=2*Math.sqrt(1+i-o-u);this._w=(h-l)/p,this._x=.25*p,this._y=(n+a)/p,this._z=(r+c)/p}else if(o>u){const p=2*Math.sqrt(1+o-i-u);this._w=(r-c)/p,this._x=(n+a)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+u-i-o);this._w=(a-n)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Pt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const n=Math.min(1,t/i);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,n=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+a*o+n*c-r*l,this._y=n*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-n*o,this._w=a*h-i*o-n*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,n=this._y,r=this._z,a=this._w;let o=a*e._w+i*e._x+n*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=n,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*i+t*this._x,this._y=p*n+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,f=Math.sin(t*h)/c;return this._w=a*u+this._w*f,this._x=i*u+this._x*f,this._y=n*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),n=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(n),i*Math.sin(r),i*Math.cos(r),t*Math.sin(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(e=0,t=0,i=0){C.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Oa.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Oa.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*n,this.y=r[1]*t+r[4]*i+r[7]*n,this.z=r[2]*t+r[5]*i+r[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*n+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*n+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*n+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,n=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*n-o*i),h=2*(o*t-r*n),u=2*(r*i-a*t);return this.x=t+l*c+a*u-o*h,this.y=i+l*h+o*c-r*u,this.z=n+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*n,this.y=r[1]*t+r[5]*i+r[9]*n,this.z=r[2]*t+r[6]*i+r[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,n=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=n*l-r*o,this.y=r*a-i*l,this.z=i*o-n*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return qs.copy(this).projectOnVector(e),this.sub(qs)}reflect(e){return this.sub(qs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Pt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const qs=new C,Oa=new Ln;class Dn{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Ht.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Ht.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Ht.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ht):Ht.fromBufferAttribute(r,a),Ht.applyMatrix4(e.matrixWorld),this.expandByPoint(Ht);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),zn.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),zn.copy(i.boundingBox)),zn.applyMatrix4(e.matrixWorld),this.union(zn)}const n=e.children;for(let r=0,a=n.length;r<a;r++)this.expandByObject(n[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Ht),Ht.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(_n),Gn.subVectors(this.max,_n),Gi.subVectors(e.a,_n),Hi.subVectors(e.b,_n),Vi.subVectors(e.c,_n),di.subVectors(Hi,Gi),fi.subVectors(Vi,Hi),Ai.subVectors(Gi,Vi);let t=[0,-di.z,di.y,0,-fi.z,fi.y,0,-Ai.z,Ai.y,di.z,0,-di.x,fi.z,0,-fi.x,Ai.z,0,-Ai.x,-di.y,di.x,0,-fi.y,fi.x,0,-Ai.y,Ai.x,0];return!js(t,Gi,Hi,Vi,Gn)||(t=[1,0,0,0,1,0,0,0,1],!js(t,Gi,Hi,Vi,Gn))?!1:(Hn.crossVectors(di,fi),t=[Hn.x,Hn.y,Hn.z],js(t,Gi,Hi,Vi,Gn))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ht).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ht).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ni[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ni[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ni[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ni[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ni[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ni[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ni[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ni[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ni),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ni=[new C,new C,new C,new C,new C,new C,new C,new C],Ht=new C,zn=new Dn,Gi=new C,Hi=new C,Vi=new C,di=new C,fi=new C,Ai=new C,_n=new C,Gn=new C,Hn=new C,wi=new C;function js(s,e,t,i,n){for(let r=0,a=s.length-3;r<=a;r+=3){wi.fromArray(s,r);const o=n.x*Math.abs(wi.x)+n.y*Math.abs(wi.y)+n.z*Math.abs(wi.z),l=e.dot(wi),c=t.dot(wi),h=i.dot(wi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const sh=new Dn,vn=new C,Ys=new C;class In{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):sh.setFromPoints(e).getCenter(i);let n=0;for(let r=0,a=e.length;r<a;r++)n=Math.max(n,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;vn.subVectors(e,this.center);const t=vn.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),n=(i-this.radius)*.5;this.center.addScaledVector(vn,n/i),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ys.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(vn.copy(e.center).add(Ys)),this.expandByPoint(vn.copy(e.center).sub(Ys))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const si=new C,Ks=new C,Vn=new C,pi=new C,$s=new C,Wn=new C,Zs=new C;class Ps{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,si)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=si.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(si.copy(this.origin).addScaledVector(this.direction,t),si.distanceToSquared(e))}distanceSqToSegment(e,t,i,n){Ks.copy(e).add(t).multiplyScalar(.5),Vn.copy(t).sub(e).normalize(),pi.copy(this.origin).sub(Ks);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Vn),o=pi.dot(this.direction),l=-pi.dot(Vn),c=pi.lengthSq(),h=Math.abs(1-a*a);let u,f,p,g;if(h>0)if(u=a*l-o,f=a*o-l,g=r*h,u>=0)if(f>=-g)if(f<=g){const _=1/h;u*=_,f*=_,p=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),n&&n.copy(Ks).addScaledVector(Vn,f),p}intersectSphere(e,t){si.subVectors(e.center,this.origin);const i=si.dot(this.direction),n=si.dot(si)-i*i,r=e.radius*e.radius;if(n>r)return null;const a=Math.sqrt(r-n),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,n,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,n=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,n=(e.min.x-f.x)*c),h>=0?(r=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),i>a||r>n||((r>i||isNaN(i))&&(i=r),(a<n||isNaN(n))&&(n=a),u>=0?(o=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(o=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),i>l||o>n)||((o>i||i!==i)&&(i=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,t)}intersectsBox(e){return this.intersectBox(e,si)!==null}intersectTriangle(e,t,i,n,r){$s.subVectors(t,e),Wn.subVectors(i,e),Zs.crossVectors($s,Wn);let a=this.direction.dot(Zs),o;if(a>0){if(n)return null;o=1}else if(a<0)o=-1,a=-a;else return null;pi.subVectors(this.origin,e);const l=o*this.direction.dot(Wn.crossVectors(pi,Wn));if(l<0)return null;const c=o*this.direction.dot($s.cross(pi));if(c<0||l+c>a)return null;const h=-o*pi.dot(Zs);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class at{constructor(e,t,i,n,r,a,o,l,c,h,u,f,p,g,_,m){at.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,a,o,l,c,h,u,f,p,g,_,m)}set(e,t,i,n,r,a,o,l,c,h,u,f,p,g,_,m){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=n,d[1]=r,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=h,d[10]=u,d[14]=f,d[3]=p,d[7]=g,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new at().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,n=1/Wi.setFromMatrixColumn(e,0).length(),r=1/Wi.setFromMatrixColumn(e,1).length(),a=1/Wi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,n=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(n),c=Math.sin(n),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const f=a*h,p=a*u,g=o*h,_=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=p+g*c,t[5]=f-_*c,t[9]=-o*l,t[2]=_-f*c,t[6]=g+p*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*h,p=l*u,g=c*h,_=c*u;t[0]=f+_*o,t[4]=g*o-p,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=p*o-g,t[6]=_+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*h,p=l*u,g=c*h,_=c*u;t[0]=f-_*o,t[4]=-a*u,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*h,t[9]=_-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*h,p=a*u,g=o*h,_=o*u;t[0]=l*h,t[4]=g*c-p,t[8]=f*c+_,t[1]=l*u,t[5]=_*c+f,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,p=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=_-f*u,t[8]=g*u+p,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=p*u+g,t[10]=f-_*u}else if(e.order==="XZY"){const f=a*l,p=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=f*u+_,t[5]=a*h,t[9]=p*u-g,t[2]=g*u-p,t[6]=o*h,t[10]=_*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(rh,e,ah)}lookAt(e,t,i){const n=this.elements;return It.subVectors(e,t),It.lengthSq()===0&&(It.z=1),It.normalize(),mi.crossVectors(i,It),mi.lengthSq()===0&&(Math.abs(i.z)===1?It.x+=1e-4:It.z+=1e-4,It.normalize(),mi.crossVectors(i,It)),mi.normalize(),Xn.crossVectors(It,mi),n[0]=mi.x,n[4]=Xn.x,n[8]=It.x,n[1]=mi.y,n[5]=Xn.y,n[9]=It.y,n[2]=mi.z,n[6]=Xn.z,n[10]=It.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],f=i[9],p=i[13],g=i[2],_=i[6],m=i[10],d=i[14],b=i[3],v=i[7],T=i[11],R=i[15],w=n[0],P=n[4],U=n[8],x=n[12],E=n[1],F=n[5],O=n[9],J=n[13],D=n[2],N=n[6],W=n[10],q=n[14],X=n[3],Y=n[7],K=n[11],ne=n[15];return r[0]=a*w+o*E+l*D+c*X,r[4]=a*P+o*F+l*N+c*Y,r[8]=a*U+o*O+l*W+c*K,r[12]=a*x+o*J+l*q+c*ne,r[1]=h*w+u*E+f*D+p*X,r[5]=h*P+u*F+f*N+p*Y,r[9]=h*U+u*O+f*W+p*K,r[13]=h*x+u*J+f*q+p*ne,r[2]=g*w+_*E+m*D+d*X,r[6]=g*P+_*F+m*N+d*Y,r[10]=g*U+_*O+m*W+d*K,r[14]=g*x+_*J+m*q+d*ne,r[3]=b*w+v*E+T*D+R*X,r[7]=b*P+v*F+T*N+R*Y,r[11]=b*U+v*O+T*W+R*K,r[15]=b*x+v*J+T*q+R*ne,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],n=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],f=e[10],p=e[14],g=e[3],_=e[7],m=e[11],d=e[15];return g*(+r*l*u-n*c*u-r*o*f+i*c*f+n*o*p-i*l*p)+_*(+t*l*p-t*c*f+r*a*f-n*a*p+n*c*h-r*l*h)+m*(+t*c*u-t*o*p-r*a*u+i*a*p+r*o*h-i*c*h)+d*(-n*o*h-t*l*u+t*o*f+n*a*u-i*a*f+i*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],f=e[10],p=e[11],g=e[12],_=e[13],m=e[14],d=e[15],b=u*m*c-_*f*c+_*l*p-o*m*p-u*l*d+o*f*d,v=g*f*c-h*m*c-g*l*p+a*m*p+h*l*d-a*f*d,T=h*_*c-g*u*c+g*o*p-a*_*p-h*o*d+a*u*d,R=g*u*l-h*_*l-g*o*f+a*_*f+h*o*m-a*u*m,w=t*b+i*v+n*T+r*R;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/w;return e[0]=b*P,e[1]=(_*f*r-u*m*r-_*n*p+i*m*p+u*n*d-i*f*d)*P,e[2]=(o*m*r-_*l*r+_*n*c-i*m*c-o*n*d+i*l*d)*P,e[3]=(u*l*r-o*f*r-u*n*c+i*f*c+o*n*p-i*l*p)*P,e[4]=v*P,e[5]=(h*m*r-g*f*r+g*n*p-t*m*p-h*n*d+t*f*d)*P,e[6]=(g*l*r-a*m*r-g*n*c+t*m*c+a*n*d-t*l*d)*P,e[7]=(a*f*r-h*l*r+h*n*c-t*f*c-a*n*p+t*l*p)*P,e[8]=T*P,e[9]=(g*u*r-h*_*r-g*i*p+t*_*p+h*i*d-t*u*d)*P,e[10]=(a*_*r-g*o*r+g*i*c-t*_*c-a*i*d+t*o*d)*P,e[11]=(h*o*r-a*u*r-h*i*c+t*u*c+a*i*p-t*o*p)*P,e[12]=R*P,e[13]=(h*_*n-g*u*n+g*i*f-t*_*f-h*i*m+t*u*m)*P,e[14]=(g*o*n-a*_*n-g*i*l+t*_*l+a*i*m-t*o*m)*P,e[15]=(a*u*n-h*o*n+h*i*l-t*u*l-a*i*f+t*o*f)*P,this}scale(e){const t=this.elements,i=e.x,n=e.y,r=e.z;return t[0]*=i,t[4]*=n,t[8]*=r,t[1]*=i,t[5]*=n,t[9]*=r,t[2]*=i,t[6]*=n,t[10]*=r,t[3]*=i,t[7]*=n,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,n))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),n=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-n*l,c*l+n*o,0,c*o+n*l,h*o+i,h*l-n*a,0,c*l-n*o,h*l+n*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,n,r,a){return this.set(1,i,r,0,e,1,a,0,t,n,1,0,0,0,0,1),this}compose(e,t,i){const n=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,f=r*c,p=r*h,g=r*u,_=a*h,m=a*u,d=o*u,b=l*c,v=l*h,T=l*u,R=i.x,w=i.y,P=i.z;return n[0]=(1-(_+d))*R,n[1]=(p+T)*R,n[2]=(g-v)*R,n[3]=0,n[4]=(p-T)*w,n[5]=(1-(f+d))*w,n[6]=(m+b)*w,n[7]=0,n[8]=(g+v)*P,n[9]=(m-b)*P,n[10]=(1-(f+_))*P,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,i){const n=this.elements;let r=Wi.set(n[0],n[1],n[2]).length();const a=Wi.set(n[4],n[5],n[6]).length(),o=Wi.set(n[8],n[9],n[10]).length();this.determinant()<0&&(r=-r),e.x=n[12],e.y=n[13],e.z=n[14],Vt.copy(this);const c=1/r,h=1/a,u=1/o;return Vt.elements[0]*=c,Vt.elements[1]*=c,Vt.elements[2]*=c,Vt.elements[4]*=h,Vt.elements[5]*=h,Vt.elements[6]*=h,Vt.elements[8]*=u,Vt.elements[9]*=u,Vt.elements[10]*=u,t.setFromRotationMatrix(Vt),i.x=r,i.y=a,i.z=o,this}makePerspective(e,t,i,n,r,a,o=hi){const l=this.elements,c=2*r/(t-e),h=2*r/(i-n),u=(t+e)/(t-e),f=(i+n)/(i-n);let p,g;if(o===hi)p=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Ms)p=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,n,r,a,o=hi){const l=this.elements,c=1/(t-e),h=1/(i-n),u=1/(a-r),f=(t+e)*c,p=(i+n)*h;let g,_;if(o===hi)g=(a+r)*u,_=-2*u;else if(o===Ms)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<16;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Wi=new C,Vt=new at,rh=new C(0,0,0),ah=new C(1,1,1),mi=new C,Xn=new C,It=new C,ka=new at,Ba=new Ln;class Cs{constructor(e=0,t=0,i=0,n=Cs.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,n=this._order){return this._x=e,this._y=t,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const n=e.elements,r=n[0],a=n[4],o=n[8],l=n[1],c=n[5],h=n[9],u=n[2],f=n[6],p=n[10];switch(t){case"XYZ":this._y=Math.asin(Pt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Pt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Pt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Pt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Pt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Pt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return ka.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ka,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ba.setFromEuler(this),this.setFromQuaternion(Ba,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Cs.DEFAULT_ORDER="XYZ";class Ur{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let oh=0;const za=new C,Xi=new Ln,ri=new at,qn=new C,xn=new C,lh=new C,ch=new Ln,Ga=new C(1,0,0),Ha=new C(0,1,0),Va=new C(0,0,1),hh={type:"added"},uh={type:"removed"};class _t extends fn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:oh++}),this.uuid=pn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=_t.DEFAULT_UP.clone();const e=new C,t=new Cs,i=new Ln,n=new C(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new at},normalMatrix:{value:new Ve}}),this.matrix=new at,this.matrixWorld=new at,this.matrixAutoUpdate=_t.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=_t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ur,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Xi.setFromAxisAngle(e,t),this.quaternion.multiply(Xi),this}rotateOnWorldAxis(e,t){return Xi.setFromAxisAngle(e,t),this.quaternion.premultiply(Xi),this}rotateX(e){return this.rotateOnAxis(Ga,e)}rotateY(e){return this.rotateOnAxis(Ha,e)}rotateZ(e){return this.rotateOnAxis(Va,e)}translateOnAxis(e,t){return za.copy(e).applyQuaternion(this.quaternion),this.position.add(za.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ga,e)}translateY(e){return this.translateOnAxis(Ha,e)}translateZ(e){return this.translateOnAxis(Va,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ri.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?qn.copy(e):qn.set(e,t,i);const n=this.parent;this.updateWorldMatrix(!0,!1),xn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ri.lookAt(xn,qn,this.up):ri.lookAt(qn,xn,this.up),this.quaternion.setFromRotationMatrix(ri),n&&(ri.extractRotation(n.matrixWorld),Xi.setFromRotationMatrix(ri),this.quaternion.premultiply(Xi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(hh)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(uh)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ri.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ri.multiply(e.parent.matrixWorld)),e.applyMatrix4(ri),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,n=this.children.length;i<n;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xn,e,lh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xn,ch,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,n=t.length;i<n;i++){const r=t[i];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const n=this.children;for(let r=0,a=n.length;r<a;r++){const o=n[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.visibility=this._visibility,n.active=this._active,n.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),n.maxGeometryCount=this._maxGeometryCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.geometryCount=this._geometryCount,n.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(n.boundingSphere={center:n.boundingSphere.center.toArray(),radius:n.boundingSphere.radius}),this.boundingBox!==null&&(n.boundingBox={min:n.boundingBox.min.toArray(),max:n.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));n.material=o}else n.material=r(e.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];n.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),f=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=n,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const n=e.children[i];this.add(n.clone())}return this}}_t.DEFAULT_UP=new C(0,1,0);_t.DEFAULT_MATRIX_AUTO_UPDATE=!0;_t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Wt=new C,ai=new C,Js=new C,oi=new C,qi=new C,ji=new C,Wa=new C,Qs=new C,er=new C,tr=new C;let jn=!1;class Xt{constructor(e=new C,t=new C,i=new C){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,n){n.subVectors(i,t),Wt.subVectors(e,t),n.cross(Wt);const r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(e,t,i,n,r){Wt.subVectors(n,t),ai.subVectors(i,t),Js.subVectors(e,t);const a=Wt.dot(Wt),o=Wt.dot(ai),l=Wt.dot(Js),c=ai.dot(ai),h=ai.dot(Js),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,p=(c*l-o*h)*f,g=(a*h-o*l)*f;return r.set(1-p-g,g,p)}static containsPoint(e,t,i,n){return this.getBarycoord(e,t,i,n,oi)===null?!1:oi.x>=0&&oi.y>=0&&oi.x+oi.y<=1}static getUV(e,t,i,n,r,a,o,l){return jn===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),jn=!0),this.getInterpolation(e,t,i,n,r,a,o,l)}static getInterpolation(e,t,i,n,r,a,o,l){return this.getBarycoord(e,t,i,n,oi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,oi.x),l.addScaledVector(a,oi.y),l.addScaledVector(o,oi.z),l)}static isFrontFacing(e,t,i,n){return Wt.subVectors(i,t),ai.subVectors(e,t),Wt.cross(ai).dot(n)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,n){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,i,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Wt.subVectors(this.c,this.b),ai.subVectors(this.a,this.b),Wt.cross(ai).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Xt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Xt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,n,r){return jn===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),jn=!0),Xt.getInterpolation(e,this.a,this.b,this.c,t,i,n,r)}getInterpolation(e,t,i,n,r){return Xt.getInterpolation(e,this.a,this.b,this.c,t,i,n,r)}containsPoint(e){return Xt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Xt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,n=this.b,r=this.c;let a,o;qi.subVectors(n,i),ji.subVectors(r,i),Qs.subVectors(e,i);const l=qi.dot(Qs),c=ji.dot(Qs);if(l<=0&&c<=0)return t.copy(i);er.subVectors(e,n);const h=qi.dot(er),u=ji.dot(er);if(h>=0&&u<=h)return t.copy(n);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(i).addScaledVector(qi,a);tr.subVectors(e,r);const p=qi.dot(tr),g=ji.dot(tr);if(g>=0&&p<=g)return t.copy(r);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(ji,o);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return Wa.subVectors(r,n),o=(u-h)/(u-h+(p-g)),t.copy(n).addScaledVector(Wa,o);const d=1/(m+_+f);return a=_*d,o=f*d,t.copy(i).addScaledVector(qi,a).addScaledVector(ji,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const hl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gi={h:0,s:0,l:0},Yn={h:0,s:0,l:0};function ir(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Me{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const n=e;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ht){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.toWorkingColorSpace(this,t),this}setRGB(e,t,i,n=$e.workingColorSpace){return this.r=e,this.g=t,this.b=i,$e.toWorkingColorSpace(this,n),this}setHSL(e,t,i,n=$e.workingColorSpace){if(e=Ir(e,1),t=Pt(t,0,1),i=Pt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=ir(a,r,e+1/3),this.g=ir(a,r,e),this.b=ir(a,r,e-1/3)}return $e.toWorkingColorSpace(this,n),this}setStyle(e,t=ht){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=n[1],o=n[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=n[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ht){const i=hl[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ln(e.r),this.g=ln(e.g),this.b=ln(e.b),this}copyLinearToSRGB(e){return this.r=Ws(e.r),this.g=Ws(e.g),this.b=Ws(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ht){return $e.fromWorkingColorSpace(yt.copy(this),e),Math.round(Pt(yt.r*255,0,255))*65536+Math.round(Pt(yt.g*255,0,255))*256+Math.round(Pt(yt.b*255,0,255))}getHexString(e=ht){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.fromWorkingColorSpace(yt.copy(this),t);const i=yt.r,n=yt.g,r=yt.b,a=Math.max(i,n,r),o=Math.min(i,n,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(n-r)/u+(n<r?6:0);break;case n:l=(r-i)/u+2;break;case r:l=(i-n)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=$e.workingColorSpace){return $e.fromWorkingColorSpace(yt.copy(this),t),e.r=yt.r,e.g=yt.g,e.b=yt.b,e}getStyle(e=ht){$e.fromWorkingColorSpace(yt.copy(this),e);const t=yt.r,i=yt.g,n=yt.b;return e!==ht?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(e,t,i){return this.getHSL(gi),this.setHSL(gi.h+e,gi.s+t,gi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(gi),e.getHSL(Yn);const i=En(gi.h,Yn.h,t),n=En(gi.s,Yn.s,t),r=En(gi.l,Yn.l,t);return this.setHSL(i,n,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,n=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*n,this.g=r[1]*t+r[4]*i+r[7]*n,this.b=r[2]*t+r[5]*i+r[8]*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const yt=new Me;Me.NAMES=hl;let dh=0;class ki extends fn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:dh++}),this.uuid=pn(),this.name="",this.type="Material",this.blending=on,this.side=bi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=_r,this.blendDst=vr,this.blendEquation=Li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Me(0,0,0),this.blendAlpha=0,this.depthFunc=vs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ra,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Bi,this.stencilZFail=Bi,this.stencilZPass=Bi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==on&&(i.blending=this.blending),this.side!==bi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==_r&&(i.blendSrc=this.blendSrc),this.blendDst!==vr&&(i.blendDst=this.blendDst),this.blendEquation!==Li&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==vs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ra&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Bi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Bi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Bi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=n(e.textures),a=n(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const n=t.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ti extends ki{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Me(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Yo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ct=new C,Kn=new xe;class Ct{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=La,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=xi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[e+n]=t.array[i+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Kn.fromBufferAttribute(this,t),Kn.applyMatrix3(e),this.setXY(t,Kn.x,Kn.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)ct.fromBufferAttribute(this,t),ct.applyMatrix3(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)ct.fromBufferAttribute(this,t),ct.applyMatrix4(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)ct.fromBufferAttribute(this,t),ct.applyNormalMatrix(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)ct.fromBufferAttribute(this,t),ct.transformDirection(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=sn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Tt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=sn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Tt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=sn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Tt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=sn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Tt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=sn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Tt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Tt(t,this.array),i=Tt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,n){return e*=this.itemSize,this.normalized&&(t=Tt(t,this.array),i=Tt(i,this.array),n=Tt(n,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this}setXYZW(e,t,i,n,r){return e*=this.itemSize,this.normalized&&(t=Tt(t,this.array),i=Tt(i,this.array),n=Tt(n,this.array),r=Tt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==La&&(e.usage=this.usage),e}}class ul extends Ct{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class dl extends Ct{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class ot extends Ct{constructor(e,t,i){super(new Float32Array(e),t,i)}}let fh=0;const Bt=new at,nr=new _t,Yi=new C,Ut=new Dn,yn=new Dn,mt=new C;class St extends fn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:fh++}),this.uuid=pn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(al(e)?dl:ul)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ve().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Bt.makeRotationFromQuaternion(e),this.applyMatrix4(Bt),this}rotateX(e){return Bt.makeRotationX(e),this.applyMatrix4(Bt),this}rotateY(e){return Bt.makeRotationY(e),this.applyMatrix4(Bt),this}rotateZ(e){return Bt.makeRotationZ(e),this.applyMatrix4(Bt),this}translate(e,t,i){return Bt.makeTranslation(e,t,i),this.applyMatrix4(Bt),this}scale(e,t,i){return Bt.makeScale(e,t,i),this.applyMatrix4(Bt),this}lookAt(e){return nr.lookAt(e),nr.updateMatrix(),this.applyMatrix4(nr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Yi).negate(),this.translate(Yi.x,Yi.y,Yi.z),this}setFromPoints(e){const t=[];for(let i=0,n=e.length;i<n;i++){const r=e[i];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new ot(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Dn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,n=t.length;i<n;i++){const r=t[i];Ut.setFromBufferAttribute(r),this.morphTargetsRelative?(mt.addVectors(this.boundingBox.min,Ut.min),this.boundingBox.expandByPoint(mt),mt.addVectors(this.boundingBox.max,Ut.max),this.boundingBox.expandByPoint(mt)):(this.boundingBox.expandByPoint(Ut.min),this.boundingBox.expandByPoint(Ut.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new In);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new C,1/0);return}if(e){const i=this.boundingSphere.center;if(Ut.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];yn.setFromBufferAttribute(o),this.morphTargetsRelative?(mt.addVectors(Ut.min,yn.min),Ut.expandByPoint(mt),mt.addVectors(Ut.max,yn.max),Ut.expandByPoint(mt)):(Ut.expandByPoint(yn.min),Ut.expandByPoint(yn.max))}Ut.getCenter(i);let n=0;for(let r=0,a=e.count;r<a;r++)mt.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(mt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)mt.fromBufferAttribute(o,c),l&&(Yi.fromBufferAttribute(e,c),mt.add(Yi)),n=Math.max(n,i.distanceToSquared(mt))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,n=t.position.array,r=t.normal.array,a=t.uv.array,o=n.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ct(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let E=0;E<o;E++)c[E]=new C,h[E]=new C;const u=new C,f=new C,p=new C,g=new xe,_=new xe,m=new xe,d=new C,b=new C;function v(E,F,O){u.fromArray(n,E*3),f.fromArray(n,F*3),p.fromArray(n,O*3),g.fromArray(a,E*2),_.fromArray(a,F*2),m.fromArray(a,O*2),f.sub(u),p.sub(u),_.sub(g),m.sub(g);const J=1/(_.x*m.y-m.x*_.y);isFinite(J)&&(d.copy(f).multiplyScalar(m.y).addScaledVector(p,-_.y).multiplyScalar(J),b.copy(p).multiplyScalar(_.x).addScaledVector(f,-m.x).multiplyScalar(J),c[E].add(d),c[F].add(d),c[O].add(d),h[E].add(b),h[F].add(b),h[O].add(b))}let T=this.groups;T.length===0&&(T=[{start:0,count:i.length}]);for(let E=0,F=T.length;E<F;++E){const O=T[E],J=O.start,D=O.count;for(let N=J,W=J+D;N<W;N+=3)v(i[N+0],i[N+1],i[N+2])}const R=new C,w=new C,P=new C,U=new C;function x(E){P.fromArray(r,E*3),U.copy(P);const F=c[E];R.copy(F),R.sub(P.multiplyScalar(P.dot(F))).normalize(),w.crossVectors(U,F);const J=w.dot(h[E])<0?-1:1;l[E*4]=R.x,l[E*4+1]=R.y,l[E*4+2]=R.z,l[E*4+3]=J}for(let E=0,F=T.length;E<F;++E){const O=T[E],J=O.start,D=O.count;for(let N=J,W=J+D;N<W;N+=3)x(i[N+0]),x(i[N+1]),x(i[N+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ct(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const n=new C,r=new C,a=new C,o=new C,l=new C,c=new C,h=new C,u=new C;if(e)for(let f=0,p=e.count;f<p;f+=3){const g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);n.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(n,r),h.cross(u),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=t.count;f<p;f+=3)n.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,r),u.subVectors(n,r),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)mt.fromBufferAttribute(e,t),mt.normalize(),e.setXYZ(t,mt.x,mt.y,mt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?p=l[_]*o.data.stride+o.offset:p=l[_]*h;for(let d=0;d<h;d++)f[g++]=c[p++]}return new Ct(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new St,i=this.index.array,n=this.attributes;for(const o in n){const l=n[o],c=e(l,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const f=c[h],p=e(f,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const n={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const p=c[u];h.push(p.toJSON(e.data))}h.length>0&&(n[l]=h,r=!0)}r&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const n=e.attributes;for(const c in n){const h=n[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Xa=new at,Pi=new Ps,$n=new In,qa=new C,Ki=new C,$i=new C,Zi=new C,sr=new C,Zn=new C,Jn=new xe,Qn=new xe,es=new xe,ja=new C,Ya=new C,Ka=new C,ts=new C,is=new C;class gt extends _t{constructor(e=new St,t=new ti){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(n,e);const o=this.morphTargetInfluences;if(r&&o){Zn.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(sr.fromBufferAttribute(u,e),a?Zn.addScaledVector(sr,h):Zn.addScaledVector(sr.sub(t),h))}t.add(Zn)}return t}raycast(e,t){const i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),$n.copy(i.boundingSphere),$n.applyMatrix4(r),Pi.copy(e.ray).recast(e.near),!($n.containsPoint(Pi.origin)===!1&&(Pi.intersectSphere($n,qa)===null||Pi.origin.distanceToSquared(qa)>(e.far-e.near)**2))&&(Xa.copy(r).invert(),Pi.copy(e.ray).applyMatrix4(Xa),!(i.boundingBox!==null&&Pi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Pi)))}_computeIntersections(e,t,i){let n;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=a[m.materialIndex],b=Math.max(m.start,p.start),v=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let T=b,R=v;T<R;T+=3){const w=o.getX(T),P=o.getX(T+1),U=o.getX(T+2);n=ns(this,d,e,i,c,h,u,w,P,U),n&&(n.faceIndex=Math.floor(T/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const g=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const b=o.getX(m),v=o.getX(m+1),T=o.getX(m+2);n=ns(this,a,e,i,c,h,u,b,v,T),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=a[m.materialIndex],b=Math.max(m.start,p.start),v=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let T=b,R=v;T<R;T+=3){const w=T,P=T+1,U=T+2;n=ns(this,d,e,i,c,h,u,w,P,U),n&&(n.faceIndex=Math.floor(T/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const b=m,v=m+1,T=m+2;n=ns(this,a,e,i,c,h,u,b,v,T),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}}}function ph(s,e,t,i,n,r,a,o){let l;if(e.side===Rt?l=i.intersectTriangle(a,r,n,!0,o):l=i.intersectTriangle(n,r,a,e.side===bi,o),l===null)return null;is.copy(o),is.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(is);return c<t.near||c>t.far?null:{distance:c,point:is.clone(),object:s}}function ns(s,e,t,i,n,r,a,o,l,c){s.getVertexPosition(o,Ki),s.getVertexPosition(l,$i),s.getVertexPosition(c,Zi);const h=ph(s,e,t,i,Ki,$i,Zi,ts);if(h){n&&(Jn.fromBufferAttribute(n,o),Qn.fromBufferAttribute(n,l),es.fromBufferAttribute(n,c),h.uv=Xt.getInterpolation(ts,Ki,$i,Zi,Jn,Qn,es,new xe)),r&&(Jn.fromBufferAttribute(r,o),Qn.fromBufferAttribute(r,l),es.fromBufferAttribute(r,c),h.uv1=Xt.getInterpolation(ts,Ki,$i,Zi,Jn,Qn,es,new xe),h.uv2=h.uv1),a&&(ja.fromBufferAttribute(a,o),Ya.fromBufferAttribute(a,l),Ka.fromBufferAttribute(a,c),h.normal=Xt.getInterpolation(ts,Ki,$i,Zi,ja,Ya,Ka,new C),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new C,materialIndex:0};Xt.getNormal(Ki,$i,Zi,u.normal),h.face=u}return h}class Un extends St{constructor(e=1,t=1,i=1,n=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:n,heightSegments:r,depthSegments:a};const o=this;n=Math.floor(n),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let f=0,p=0;g("z","y","x",-1,-1,i,t,e,a,r,0),g("z","y","x",1,-1,i,t,-e,a,r,1),g("x","z","y",1,1,e,i,t,n,a,2),g("x","z","y",1,-1,e,i,-t,n,a,3),g("x","y","z",1,-1,e,t,i,n,r,4),g("x","y","z",-1,-1,e,t,-i,n,r,5),this.setIndex(l),this.setAttribute("position",new ot(c,3)),this.setAttribute("normal",new ot(h,3)),this.setAttribute("uv",new ot(u,2));function g(_,m,d,b,v,T,R,w,P,U,x){const E=T/P,F=R/U,O=T/2,J=R/2,D=w/2,N=P+1,W=U+1;let q=0,X=0;const Y=new C;for(let K=0;K<W;K++){const ne=K*F-J;for(let $=0;$<N;$++){const V=$*E-O;Y[_]=V*b,Y[m]=ne*v,Y[d]=D,c.push(Y.x,Y.y,Y.z),Y[_]=0,Y[m]=0,Y[d]=w>0?1:-1,h.push(Y.x,Y.y,Y.z),u.push($/P),u.push(1-K/U),q+=1}}for(let K=0;K<U;K++)for(let ne=0;ne<P;ne++){const $=f+ne+N*K,V=f+ne+N*(K+1),Z=f+(ne+1)+N*(K+1),ce=f+(ne+1)+N*K;l.push($,V,ce),l.push(V,Z,ce),X+=6}o.addGroup(p,X,x),p+=X,f+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Un(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function dn(s){const e={};for(const t in s){e[t]={};for(const i in s[t]){const n=s[t][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=n.clone():Array.isArray(n)?e[t][i]=n.slice():e[t][i]=n}}return e}function At(s){const e={};for(let t=0;t<s.length;t++){const i=dn(s[t]);for(const n in i)e[n]=i[n]}return e}function mh(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function fl(s){return s.getRenderTarget()===null?s.outputColorSpace:$e.workingColorSpace}const gh={clone:dn,merge:At};var _h=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,vh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Oi extends ki{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_h,this.fragmentShader=vh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=dn(e.uniforms),this.uniformsGroups=mh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const n in this.uniforms){const a=this.uniforms[n].value;a&&a.isTexture?t.uniforms[n]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[n]={type:"m4",value:a.toArray()}:t.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class pl extends _t{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new at,this.projectionMatrix=new at,this.projectionMatrixInverse=new at,this.coordinateSystem=hi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Ft extends pl{constructor(e=50,t=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Cn*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(bn*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Cn*2*Math.atan(Math.tan(bn*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,n,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(bn*.5*this.fov)/this.zoom,i=2*t,n=this.aspect*i,r=-.5*n;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*n/l,t-=a.offsetY*i/c,n*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ji=-90,Qi=1;class xh extends _t{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new Ft(Ji,Qi,e,t);n.layers=this.layers,this.add(n);const r=new Ft(Ji,Qi,e,t);r.layers=this.layers,this.add(r);const a=new Ft(Ji,Qi,e,t);a.layers=this.layers,this.add(a);const o=new Ft(Ji,Qi,e,t);o.layers=this.layers,this.add(o);const l=new Ft(Ji,Qi,e,t);l.layers=this.layers,this.add(l);const c=new Ft(Ji,Qi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,n,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===hi)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ms)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,n),e.render(t,r),e.setRenderTarget(i,1,n),e.render(t,a),e.setRenderTarget(i,2,n),e.render(t,o),e.setRenderTarget(i,3,n),e.render(t,l),e.setRenderTarget(i,4,n),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,n),e.render(t,h),e.setRenderTarget(u,f,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class ml extends Lt{constructor(e,t,i,n,r,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:cn,super(e,t,i,n,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class yh extends Fi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},n=[i,i,i,i,i,i];t.encoding!==void 0&&(Tn("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Ni?ht:Gt),this.texture=new ml(n,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:zt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},n=new Un(5,5,5),r=new Oi({name:"CubemapFromEquirect",uniforms:dn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Rt,blending:yi});r.uniforms.tEquirect.value=t;const a=new gt(n,r),o=t.minFilter;return t.minFilter===wn&&(t.minFilter=zt),new xh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,n){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,n);e.setRenderTarget(r)}}const rr=new C,Sh=new C,Mh=new Ve;class _i{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const n=rr.subVectors(i,t).cross(Sh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(rr),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/n;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Mh.getNormalMatrix(e),n=this.coplanarPoint(rr).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ci=new In,ss=new C;class Nr{constructor(e=new _i,t=new _i,i=new _i,n=new _i,r=new _i,a=new _i){this.planes=[e,t,i,n,r,a]}set(e,t,i,n,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(n),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=hi){const i=this.planes,n=e.elements,r=n[0],a=n[1],o=n[2],l=n[3],c=n[4],h=n[5],u=n[6],f=n[7],p=n[8],g=n[9],_=n[10],m=n[11],d=n[12],b=n[13],v=n[14],T=n[15];if(i[0].setComponents(l-r,f-c,m-p,T-d).normalize(),i[1].setComponents(l+r,f+c,m+p,T+d).normalize(),i[2].setComponents(l+a,f+h,m+g,T+b).normalize(),i[3].setComponents(l-a,f-h,m-g,T-b).normalize(),i[4].setComponents(l-o,f-u,m-_,T-v).normalize(),t===hi)i[5].setComponents(l+o,f+u,m+_,T+v).normalize();else if(t===Ms)i[5].setComponents(o,u,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ci.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ci.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ci)}intersectsSprite(e){return Ci.center.set(0,0,0),Ci.radius=.7071067811865476,Ci.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ci)}intersectsSphere(e){const t=this.planes,i=e.center,n=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const n=t[i];if(ss.x=n.normal.x>0?e.max.x:e.min.x,ss.y=n.normal.y>0?e.max.y:e.min.y,ss.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(ss)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function gl(){let s=null,e=!1,t=null,i=null;function n(r,a){t(r,a),i=s.requestAnimationFrame(n)}return{start:function(){e!==!0&&t!==null&&(i=s.requestAnimationFrame(n),e=!0)},stop:function(){s.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function bh(s,e){const t=e.isWebGL2,i=new WeakMap;function n(c,h){const u=c.array,f=c.usage,p=u.byteLength,g=s.createBuffer();s.bindBuffer(h,g),s.bufferData(h,u,f),c.onUploadCallback();let _;if(u instanceof Float32Array)_=s.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=s.UNSIGNED_SHORT;else if(u instanceof Int16Array)_=s.SHORT;else if(u instanceof Uint32Array)_=s.UNSIGNED_INT;else if(u instanceof Int32Array)_=s.INT;else if(u instanceof Int8Array)_=s.BYTE;else if(u instanceof Uint8Array)_=s.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)_=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:_,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:p}}function r(c,h,u){const f=h.array,p=h._updateRange,g=h.updateRanges;if(s.bindBuffer(u,c),p.count===-1&&g.length===0&&s.bufferSubData(u,0,f),g.length!==0){for(let _=0,m=g.length;_<m;_++){const d=g[_];t?s.bufferSubData(u,d.start*f.BYTES_PER_ELEMENT,f,d.start,d.count):s.bufferSubData(u,d.start*f.BYTES_PER_ELEMENT,f.subarray(d.start,d.start+d.count))}h.clearUpdateRanges()}p.count!==-1&&(t?s.bufferSubData(u,p.offset*f.BYTES_PER_ELEMENT,f,p.offset,p.count):s.bufferSubData(u,p.offset*f.BYTES_PER_ELEMENT,f.subarray(p.offset,p.offset+p.count)),p.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);h&&(s.deleteBuffer(h.buffer),i.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const f=i.get(c);(!f||f.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);if(u===void 0)i.set(c,n(c,h));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,c,h),u.version=c.version}}return{get:a,remove:o,update:l}}class Rs extends St{constructor(e=1,t=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:n};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(n),c=o+1,h=l+1,u=e/o,f=t/l,p=[],g=[],_=[],m=[];for(let d=0;d<h;d++){const b=d*f-a;for(let v=0;v<c;v++){const T=v*u-r;g.push(T,-b,0),_.push(0,0,1),m.push(v/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let b=0;b<o;b++){const v=b+c*d,T=b+c*(d+1),R=b+1+c*(d+1),w=b+1+c*d;p.push(v,T,w),p.push(T,R,w)}this.setIndex(p),this.setAttribute("position",new ot(g,3)),this.setAttribute("normal",new ot(_,3)),this.setAttribute("uv",new ot(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rs(e.width,e.height,e.widthSegments,e.heightSegments)}}var Eh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Th=`#ifdef USE_ALPHAHASH
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
#endif`,Ah=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,wh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ph=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Ch=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Rh=`#ifdef USE_AOMAP
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
#endif`,Lh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Dh=`#ifdef USE_BATCHING
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
#endif`,Ih=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Uh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Nh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Fh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Oh=`#ifdef USE_IRIDESCENCE
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
#endif`,kh=`#ifdef USE_BUMPMAP
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
#endif`,Bh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,zh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Gh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Hh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Vh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Wh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Xh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,qh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,jh=`#define PI 3.141592653589793
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
} // validated`,Yh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Kh=`vec3 transformedNormal = objectNormal;
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
#endif`,$h=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Zh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Jh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Qh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,eu="gl_FragColor = linearToOutputTexel( gl_FragColor );",tu=`
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
}`,iu=`#ifdef USE_ENVMAP
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
#endif`,nu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,su=`#ifdef USE_ENVMAP
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
#endif`,ru=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,au=`#ifdef USE_ENVMAP
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
#endif`,ou=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,lu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,uu=`#ifdef USE_GRADIENTMAP
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
}`,du=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,fu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,pu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,mu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,gu=`uniform bool receiveShadow;
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
#endif`,_u=`#ifdef USE_ENVMAP
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
#endif`,vu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,xu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,yu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Su=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Mu=`PhysicalMaterial material;
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
#endif`,bu=`struct PhysicalMaterial {
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
}`,Eu=`
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
#endif`,Tu=`#if defined( RE_IndirectDiffuse )
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
#endif`,Au=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wu=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Pu=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cu=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Ru=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Lu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Du=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Iu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Uu=`#if defined( USE_POINTS_UV )
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
#endif`,Nu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Fu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ou=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ku=`#ifdef USE_MORPHNORMALS
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
#endif`,Bu=`#ifdef USE_MORPHTARGETS
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
#endif`,zu=`#ifdef USE_MORPHTARGETS
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
#endif`,Gu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Hu=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Vu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,qu=`#ifdef USE_NORMALMAP
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
#endif`,ju=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Yu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ku=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,$u=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zu=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ju=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Qu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ed=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,td=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,id=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,nd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,sd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,rd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ad=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,od=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ld=`float getShadowMask() {
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
}`,cd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hd=`#ifdef USE_SKINNING
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
#endif`,ud=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,dd=`#ifdef USE_SKINNING
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
#endif`,fd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,pd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,md=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gd=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,_d=`#ifdef USE_TRANSMISSION
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
#endif`,vd=`#ifdef USE_TRANSMISSION
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
#endif`,xd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Sd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Md=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const bd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ed=`uniform sampler2D t2D;
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
}`,Td=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ad=`#ifdef ENVMAP_TYPE_CUBE
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
}`,wd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cd=`#include <common>
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
}`,Rd=`#if DEPTH_PACKING == 3200
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
}`,Ld=`#define DISTANCE
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
}`,Dd=`#define DISTANCE
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
}`,Id=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ud=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nd=`uniform float scale;
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
}`,Fd=`uniform vec3 diffuse;
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
}`,Od=`#include <common>
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
}`,kd=`uniform vec3 diffuse;
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
}`,Bd=`#define LAMBERT
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
}`,zd=`#define LAMBERT
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
}`,Gd=`#define MATCAP
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
}`,Hd=`#define MATCAP
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
}`,Vd=`#define NORMAL
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
}`,Wd=`#define NORMAL
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
}`,Xd=`#define PHONG
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
}`,qd=`#define PHONG
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
}`,jd=`#define STANDARD
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
}`,Yd=`#define STANDARD
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
}`,Kd=`#define TOON
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
}`,$d=`#define TOON
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
}`,Zd=`uniform float size;
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
}`,Jd=`uniform vec3 diffuse;
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
}`,Qd=`#include <common>
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
}`,ef=`uniform vec3 color;
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
}`,tf=`uniform float rotation;
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
}`,nf=`uniform vec3 diffuse;
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
}`,Oe={alphahash_fragment:Eh,alphahash_pars_fragment:Th,alphamap_fragment:Ah,alphamap_pars_fragment:wh,alphatest_fragment:Ph,alphatest_pars_fragment:Ch,aomap_fragment:Rh,aomap_pars_fragment:Lh,batching_pars_vertex:Dh,batching_vertex:Ih,begin_vertex:Uh,beginnormal_vertex:Nh,bsdfs:Fh,iridescence_fragment:Oh,bumpmap_pars_fragment:kh,clipping_planes_fragment:Bh,clipping_planes_pars_fragment:zh,clipping_planes_pars_vertex:Gh,clipping_planes_vertex:Hh,color_fragment:Vh,color_pars_fragment:Wh,color_pars_vertex:Xh,color_vertex:qh,common:jh,cube_uv_reflection_fragment:Yh,defaultnormal_vertex:Kh,displacementmap_pars_vertex:$h,displacementmap_vertex:Zh,emissivemap_fragment:Jh,emissivemap_pars_fragment:Qh,colorspace_fragment:eu,colorspace_pars_fragment:tu,envmap_fragment:iu,envmap_common_pars_fragment:nu,envmap_pars_fragment:su,envmap_pars_vertex:ru,envmap_physical_pars_fragment:_u,envmap_vertex:au,fog_vertex:ou,fog_pars_vertex:lu,fog_fragment:cu,fog_pars_fragment:hu,gradientmap_pars_fragment:uu,lightmap_fragment:du,lightmap_pars_fragment:fu,lights_lambert_fragment:pu,lights_lambert_pars_fragment:mu,lights_pars_begin:gu,lights_toon_fragment:vu,lights_toon_pars_fragment:xu,lights_phong_fragment:yu,lights_phong_pars_fragment:Su,lights_physical_fragment:Mu,lights_physical_pars_fragment:bu,lights_fragment_begin:Eu,lights_fragment_maps:Tu,lights_fragment_end:Au,logdepthbuf_fragment:wu,logdepthbuf_pars_fragment:Pu,logdepthbuf_pars_vertex:Cu,logdepthbuf_vertex:Ru,map_fragment:Lu,map_pars_fragment:Du,map_particle_fragment:Iu,map_particle_pars_fragment:Uu,metalnessmap_fragment:Nu,metalnessmap_pars_fragment:Fu,morphcolor_vertex:Ou,morphnormal_vertex:ku,morphtarget_pars_vertex:Bu,morphtarget_vertex:zu,normal_fragment_begin:Gu,normal_fragment_maps:Hu,normal_pars_fragment:Vu,normal_pars_vertex:Wu,normal_vertex:Xu,normalmap_pars_fragment:qu,clearcoat_normal_fragment_begin:ju,clearcoat_normal_fragment_maps:Yu,clearcoat_pars_fragment:Ku,iridescence_pars_fragment:$u,opaque_fragment:Zu,packing:Ju,premultiplied_alpha_fragment:Qu,project_vertex:ed,dithering_fragment:td,dithering_pars_fragment:id,roughnessmap_fragment:nd,roughnessmap_pars_fragment:sd,shadowmap_pars_fragment:rd,shadowmap_pars_vertex:ad,shadowmap_vertex:od,shadowmask_pars_fragment:ld,skinbase_vertex:cd,skinning_pars_vertex:hd,skinning_vertex:ud,skinnormal_vertex:dd,specularmap_fragment:fd,specularmap_pars_fragment:pd,tonemapping_fragment:md,tonemapping_pars_fragment:gd,transmission_fragment:_d,transmission_pars_fragment:vd,uv_pars_fragment:xd,uv_pars_vertex:yd,uv_vertex:Sd,worldpos_vertex:Md,background_vert:bd,background_frag:Ed,backgroundCube_vert:Td,backgroundCube_frag:Ad,cube_vert:wd,cube_frag:Pd,depth_vert:Cd,depth_frag:Rd,distanceRGBA_vert:Ld,distanceRGBA_frag:Dd,equirect_vert:Id,equirect_frag:Ud,linedashed_vert:Nd,linedashed_frag:Fd,meshbasic_vert:Od,meshbasic_frag:kd,meshlambert_vert:Bd,meshlambert_frag:zd,meshmatcap_vert:Gd,meshmatcap_frag:Hd,meshnormal_vert:Vd,meshnormal_frag:Wd,meshphong_vert:Xd,meshphong_frag:qd,meshphysical_vert:jd,meshphysical_frag:Yd,meshtoon_vert:Kd,meshtoon_frag:$d,points_vert:Zd,points_frag:Jd,shadow_vert:Qd,shadow_frag:ef,sprite_vert:tf,sprite_frag:nf},re={common:{diffuse:{value:new Me(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Me(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Me(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new Me(16777215)},opacity:{value:1},center:{value:new xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},ei={basic:{uniforms:At([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:At([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Me(0)}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:At([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Me(0)},specular:{value:new Me(1118481)},shininess:{value:30}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:At([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new Me(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:At([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new Me(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:At([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:At([re.points,re.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:At([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:At([re.common,re.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:At([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:At([re.sprite,re.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distanceRGBA:{uniforms:At([re.common,re.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distanceRGBA_vert,fragmentShader:Oe.distanceRGBA_frag},shadow:{uniforms:At([re.lights,re.fog,{color:{value:new Me(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};ei.physical={uniforms:At([ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new Me(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new Me(0)},specularColor:{value:new Me(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};const rs={r:0,b:0,g:0};function sf(s,e,t,i,n,r,a){const o=new Me(0);let l=r===!0?0:1,c,h,u=null,f=0,p=null;function g(m,d){let b=!1,v=d.isScene===!0?d.background:null;v&&v.isTexture&&(v=(d.backgroundBlurriness>0?t:e).get(v)),v===null?_(o,l):v&&v.isColor&&(_(v,1),b=!0);const T=s.xr.getEnvironmentBlendMode();T==="additive"?i.buffers.color.setClear(0,0,0,1,a):T==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(s.autoClear||b)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),v&&(v.isCubeTexture||v.mapping===As)?(h===void 0&&(h=new gt(new Un(1,1,1),new Oi({name:"BackgroundCubeMaterial",uniforms:dn(ei.backgroundCube.uniforms),vertexShader:ei.backgroundCube.vertexShader,fragmentShader:ei.backgroundCube.fragmentShader,side:Rt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,w,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(h)),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,h.material.toneMapped=$e.getTransfer(v.colorSpace)!==et,(u!==v||f!==v.version||p!==s.toneMapping)&&(h.material.needsUpdate=!0,u=v,f=v.version,p=s.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new gt(new Rs(2,2),new Oi({name:"BackgroundMaterial",uniforms:dn(ei.background.uniforms),vertexShader:ei.background.vertexShader,fragmentShader:ei.background.fragmentShader,side:bi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,c.material.toneMapped=$e.getTransfer(v.colorSpace)!==et,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||f!==v.version||p!==s.toneMapping)&&(c.material.needsUpdate=!0,u=v,f=v.version,p=s.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function _(m,d){m.getRGB(rs,fl(s)),i.buffers.color.setClear(rs.r,rs.g,rs.b,d,a)}return{getClearColor:function(){return o},setClearColor:function(m,d=1){o.set(m),l=d,_(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,_(o,l)},render:g}}function rf(s,e,t,i){const n=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||r!==null,o={},l=m(null);let c=l,h=!1;function u(D,N,W,q,X){let Y=!1;if(a){const K=_(q,W,N);c!==K&&(c=K,p(c.object)),Y=d(D,q,W,X),Y&&b(D,q,W,X)}else{const K=N.wireframe===!0;(c.geometry!==q.id||c.program!==W.id||c.wireframe!==K)&&(c.geometry=q.id,c.program=W.id,c.wireframe=K,Y=!0)}X!==null&&t.update(X,s.ELEMENT_ARRAY_BUFFER),(Y||h)&&(h=!1,U(D,N,W,q),X!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function f(){return i.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function p(D){return i.isWebGL2?s.bindVertexArray(D):r.bindVertexArrayOES(D)}function g(D){return i.isWebGL2?s.deleteVertexArray(D):r.deleteVertexArrayOES(D)}function _(D,N,W){const q=W.wireframe===!0;let X=o[D.id];X===void 0&&(X={},o[D.id]=X);let Y=X[N.id];Y===void 0&&(Y={},X[N.id]=Y);let K=Y[q];return K===void 0&&(K=m(f()),Y[q]=K),K}function m(D){const N=[],W=[],q=[];for(let X=0;X<n;X++)N[X]=0,W[X]=0,q[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:W,attributeDivisors:q,object:D,attributes:{},index:null}}function d(D,N,W,q){const X=c.attributes,Y=N.attributes;let K=0;const ne=W.getAttributes();for(const $ in ne)if(ne[$].location>=0){const Z=X[$];let ce=Y[$];if(ce===void 0&&($==="instanceMatrix"&&D.instanceMatrix&&(ce=D.instanceMatrix),$==="instanceColor"&&D.instanceColor&&(ce=D.instanceColor)),Z===void 0||Z.attribute!==ce||ce&&Z.data!==ce.data)return!0;K++}return c.attributesNum!==K||c.index!==q}function b(D,N,W,q){const X={},Y=N.attributes;let K=0;const ne=W.getAttributes();for(const $ in ne)if(ne[$].location>=0){let Z=Y[$];Z===void 0&&($==="instanceMatrix"&&D.instanceMatrix&&(Z=D.instanceMatrix),$==="instanceColor"&&D.instanceColor&&(Z=D.instanceColor));const ce={};ce.attribute=Z,Z&&Z.data&&(ce.data=Z.data),X[$]=ce,K++}c.attributes=X,c.attributesNum=K,c.index=q}function v(){const D=c.newAttributes;for(let N=0,W=D.length;N<W;N++)D[N]=0}function T(D){R(D,0)}function R(D,N){const W=c.newAttributes,q=c.enabledAttributes,X=c.attributeDivisors;W[D]=1,q[D]===0&&(s.enableVertexAttribArray(D),q[D]=1),X[D]!==N&&((i.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,N),X[D]=N)}function w(){const D=c.newAttributes,N=c.enabledAttributes;for(let W=0,q=N.length;W<q;W++)N[W]!==D[W]&&(s.disableVertexAttribArray(W),N[W]=0)}function P(D,N,W,q,X,Y,K){K===!0?s.vertexAttribIPointer(D,N,W,X,Y):s.vertexAttribPointer(D,N,W,q,X,Y)}function U(D,N,W,q){if(i.isWebGL2===!1&&(D.isInstancedMesh||q.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const X=q.attributes,Y=W.getAttributes(),K=N.defaultAttributeValues;for(const ne in Y){const $=Y[ne];if($.location>=0){let V=X[ne];if(V===void 0&&(ne==="instanceMatrix"&&D.instanceMatrix&&(V=D.instanceMatrix),ne==="instanceColor"&&D.instanceColor&&(V=D.instanceColor)),V!==void 0){const Z=V.normalized,ce=V.itemSize,ve=t.get(V);if(ve===void 0)continue;const _e=ve.buffer,Ie=ve.type,Ne=ve.bytesPerElement,we=i.isWebGL2===!0&&(Ie===s.INT||Ie===s.UNSIGNED_INT||V.gpuType===$o);if(V.isInterleavedBufferAttribute){const Xe=V.data,k=Xe.stride,Mt=V.offset;if(Xe.isInstancedInterleavedBuffer){for(let be=0;be<$.locationSize;be++)R($.location+be,Xe.meshPerAttribute);D.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=Xe.meshPerAttribute*Xe.count)}else for(let be=0;be<$.locationSize;be++)T($.location+be);s.bindBuffer(s.ARRAY_BUFFER,_e);for(let be=0;be<$.locationSize;be++)P($.location+be,ce/$.locationSize,Ie,Z,k*Ne,(Mt+ce/$.locationSize*be)*Ne,we)}else{if(V.isInstancedBufferAttribute){for(let Xe=0;Xe<$.locationSize;Xe++)R($.location+Xe,V.meshPerAttribute);D.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let Xe=0;Xe<$.locationSize;Xe++)T($.location+Xe);s.bindBuffer(s.ARRAY_BUFFER,_e);for(let Xe=0;Xe<$.locationSize;Xe++)P($.location+Xe,ce/$.locationSize,Ie,Z,ce*Ne,ce/$.locationSize*Xe*Ne,we)}}else if(K!==void 0){const Z=K[ne];if(Z!==void 0)switch(Z.length){case 2:s.vertexAttrib2fv($.location,Z);break;case 3:s.vertexAttrib3fv($.location,Z);break;case 4:s.vertexAttrib4fv($.location,Z);break;default:s.vertexAttrib1fv($.location,Z)}}}}w()}function x(){O();for(const D in o){const N=o[D];for(const W in N){const q=N[W];for(const X in q)g(q[X].object),delete q[X];delete N[W]}delete o[D]}}function E(D){if(o[D.id]===void 0)return;const N=o[D.id];for(const W in N){const q=N[W];for(const X in q)g(q[X].object),delete q[X];delete N[W]}delete o[D.id]}function F(D){for(const N in o){const W=o[N];if(W[D.id]===void 0)continue;const q=W[D.id];for(const X in q)g(q[X].object),delete q[X];delete W[D.id]}}function O(){J(),h=!0,c!==l&&(c=l,p(c.object))}function J(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:O,resetDefaultState:J,dispose:x,releaseStatesOfGeometry:E,releaseStatesOfProgram:F,initAttributes:v,enableAttribute:T,disableUnusedAttributes:w}}function af(s,e,t,i){const n=i.isWebGL2;let r;function a(h){r=h}function o(h,u){s.drawArrays(r,h,u),t.update(u,r,1)}function l(h,u,f){if(f===0)return;let p,g;if(n)p=s,g="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[g](r,h,u,f),t.update(u,r,f)}function c(h,u,f){if(f===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<f;g++)this.render(h[g],u[g]);else{p.multiDrawArraysWEBGL(r,h,0,u,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_];t.update(g,r,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function of(s,e,t){let i;function n(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(P){if(P==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),_=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),d=s.getParameter(s.MAX_VARYING_VECTORS),b=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),v=f>0,T=a||e.has("OES_texture_float"),R=v&&T,w=a?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:n,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:f,maxTextureSize:p,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:d,maxFragmentUniforms:b,vertexTextures:v,floatFragmentTextures:T,floatVertexTextures:R,maxSamples:w}}function lf(s){const e=this;let t=null,i=0,n=!1,r=!1;const a=new _i,o=new Ve,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const p=u.length!==0||f||i!==0||n;return n=f,i=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,p){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,d=s.get(u);if(!n||g===null||g.length===0||r&&!m)r?h(null):c();else{const b=r?0:i,v=b*4;let T=d.clippingState||null;l.value=T,T=h(g,f,v,p);for(let R=0;R!==v;++R)T[R]=t[R];d.clippingState=T,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,f,p,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const d=p+_*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<d)&&(m=new Float32Array(d));for(let v=0,T=p;v!==_;++v,T+=4)a.copy(u[v]).applyMatrix4(b,o),a.normal.toArray(m,T),m[T+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function cf(s){let e=new WeakMap;function t(a,o){return o===xr?a.mapping=cn:o===yr&&(a.mapping=hn),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===xr||o===yr)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new yh(l.height/2);return c.fromEquirectangularTexture(s,a),e.set(a,c),a.addEventListener("dispose",n),t(c.texture,a.mapping)}else return null}}return a}function n(a){const o=a.target;o.removeEventListener("dispose",n);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}class _l extends pl{constructor(e=-1,t=1,i=1,n=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=n+t,l=n-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const rn=4,$a=[.125,.215,.35,.446,.526,.582],Di=20,ar=new _l,Za=new Me;let or=null,lr=0,cr=0;const Ri=(1+Math.sqrt(5))/2,en=1/Ri,Ja=[new C(1,1,1),new C(-1,1,1),new C(1,1,-1),new C(-1,1,-1),new C(0,Ri,en),new C(0,Ri,-en),new C(en,0,Ri),new C(-en,0,Ri),new C(Ri,en,0),new C(-Ri,en,0)];class Qa{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,n=100){or=this._renderer.getRenderTarget(),lr=this._renderer.getActiveCubeFace(),cr=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,n,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=io(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=to(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(or,lr,cr),e.scissorTest=!1,as(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===cn||e.mapping===hn?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),or=this._renderer.getRenderTarget(),lr=this._renderer.getActiveCubeFace(),cr=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:zt,minFilter:zt,generateMipmaps:!1,type:Pn,format:Yt,colorSpace:ui,depthBuffer:!1},n=eo(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=eo(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=hf(r)),this._blurMaterial=uf(r,e,t)}return n}_compileMaterial(e){const t=new gt(this._lodPlanes[0],e);this._renderer.compile(t,ar)}_sceneToCubeUV(e,t,i,n){const o=new Ft(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Za),h.toneMapping=Si,h.autoClear=!1;const p=new ti({name:"PMREM.Background",side:Rt,depthWrite:!1,depthTest:!1}),g=new gt(new Un,p);let _=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy(Za),_=!0);for(let d=0;d<6;d++){const b=d%3;b===0?(o.up.set(0,l[d],0),o.lookAt(c[d],0,0)):b===1?(o.up.set(0,0,l[d]),o.lookAt(0,c[d],0)):(o.up.set(0,l[d],0),o.lookAt(0,0,c[d]));const v=this._cubeSize;as(n,b*v,d>2?v:0,v,v),h.setRenderTarget(n),_&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,n=e.mapping===cn||e.mapping===hn;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=io()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=to());const r=n?this._cubemapMaterial:this._equirectMaterial,a=new gt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;as(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,ar)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let n=1;n<this._lodPlanes.length;n++){const r=Math.sqrt(this._sigmas[n]*this._sigmas[n]-this._sigmas[n-1]*this._sigmas[n-1]),a=Ja[(n-1)%Ja.length];this._blur(e,n-1,n,r,a)}t.autoClear=i}_blur(e,t,i,n,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,n,"latitudinal",r),this._halfBlur(a,e,i,i,n,"longitudinal",r)}_halfBlur(e,t,i,n,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new gt(this._lodPlanes[n],c),f=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Di-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Di;m>Di&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Di}`);const d=[];let b=0;for(let P=0;P<Di;++P){const U=P/_,x=Math.exp(-U*U/2);d.push(x),P===0?b+=x:P<m&&(b+=2*x)}for(let P=0;P<d.length;P++)d[P]=d[P]/b;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-i;const T=this._sizeLods[n],R=3*T*(n>v-rn?n-v+rn:0),w=4*(this._cubeSize-T);as(t,R,w,3*T,2*T),l.setRenderTarget(t),l.render(u,ar)}}function hf(s){const e=[],t=[],i=[];let n=s;const r=s-rn+1+$a.length;for(let a=0;a<r;a++){const o=Math.pow(2,n);t.push(o);let l=1/o;a>s-rn?l=$a[a-s+rn-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,_=3,m=2,d=1,b=new Float32Array(_*g*p),v=new Float32Array(m*g*p),T=new Float32Array(d*g*p);for(let w=0;w<p;w++){const P=w%3*2/3-1,U=w>2?0:-1,x=[P,U,0,P+2/3,U,0,P+2/3,U+1,0,P,U,0,P+2/3,U+1,0,P,U+1,0];b.set(x,_*g*w),v.set(f,m*g*w);const E=[w,w,w,w,w,w];T.set(E,d*g*w)}const R=new St;R.setAttribute("position",new Ct(b,_)),R.setAttribute("uv",new Ct(v,m)),R.setAttribute("faceIndex",new Ct(T,d)),e.push(R),n>rn&&n--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function eo(s,e,t){const i=new Fi(s,e,t);return i.texture.mapping=As,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function as(s,e,t,i,n){s.viewport.set(e,t,i,n),s.scissor.set(e,t,i,n)}function uf(s,e,t){const i=new Float32Array(Di),n=new C(0,1,0);return new Oi({name:"SphericalGaussianBlur",defines:{n:Di,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:Fr(),fragmentShader:`

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
		`,blending:yi,depthTest:!1,depthWrite:!1})}function to(){return new Oi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fr(),fragmentShader:`

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
		`,blending:yi,depthTest:!1,depthWrite:!1})}function io(){return new Oi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yi,depthTest:!1,depthWrite:!1})}function Fr(){return`

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
	`}function df(s){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===xr||l===yr,h=l===cn||l===hn;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=e.get(o);return t===null&&(t=new Qa(s)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),e.set(o,u),u.texture}else{if(e.has(o))return e.get(o).texture;{const u=o.image;if(c&&u&&u.height>0||h&&u&&n(u)){t===null&&(t=new Qa(s));const f=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,f),o.addEventListener("dispose",r),f.texture}else return null}}}return o}function n(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function ff(s){const e={};function t(i){if(e[i]!==void 0)return e[i];let n;switch(i){case"WEBGL_depth_texture":n=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":n=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":n=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":n=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:n=s.getExtension(i)}return e[i]=n,n}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const n=t(i);return n===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),n}}}function pf(s,e,t,i){const n={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let m=0,d=_.length;m<d;m++)e.remove(_[m])}f.removeEventListener("dispose",a),delete n[f.id];const p=r.get(f);p&&(e.remove(p),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(u,f){return n[f.id]===!0||(f.addEventListener("dispose",a),n[f.id]=!0,t.memory.geometries++),f}function l(u){const f=u.attributes;for(const g in f)e.update(f[g],s.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const _=p[g];for(let m=0,d=_.length;m<d;m++)e.update(_[m],s.ARRAY_BUFFER)}}function c(u){const f=[],p=u.index,g=u.attributes.position;let _=0;if(p!==null){const b=p.array;_=p.version;for(let v=0,T=b.length;v<T;v+=3){const R=b[v+0],w=b[v+1],P=b[v+2];f.push(R,w,w,P,P,R)}}else if(g!==void 0){const b=g.array;_=g.version;for(let v=0,T=b.length/3-1;v<T;v+=3){const R=v+0,w=v+1,P=v+2;f.push(R,w,w,P,P,R)}}else return;const m=new(al(f)?dl:ul)(f,1);m.version=_;const d=r.get(u);d&&e.remove(d),r.set(u,m)}function h(u){const f=r.get(u);if(f){const p=u.index;p!==null&&f.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function mf(s,e,t,i){const n=i.isWebGL2;let r;function a(p){r=p}let o,l;function c(p){o=p.type,l=p.bytesPerElement}function h(p,g){s.drawElements(r,g,o,p*l),t.update(g,r,1)}function u(p,g,_){if(_===0)return;let m,d;if(n)m=s,d="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[d](r,g,o,p*l,_),t.update(g,r,_)}function f(p,g,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<_;d++)this.render(p[d]/l,g[d]);else{m.multiDrawElementsWEBGL(r,g,0,o,p,0,_);let d=0;for(let b=0;b<_;b++)d+=g[b];t.update(d,r,1)}}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=u,this.renderMultiDraw=f}function gf(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function n(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:n,update:i}}function _f(s,e){return s[0]-e[0]}function vf(s,e){return Math.abs(e[1])-Math.abs(s[1])}function xf(s,e,t){const i={},n=new Float32Array(8),r=new WeakMap,a=new tt,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,u){const f=c.morphTargetInfluences;if(e.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let m=r.get(h);if(m===void 0||m.count!==_){let N=function(){J.dispose(),r.delete(h),h.removeEventListener("dispose",N)};var p=N;m!==void 0&&m.texture.dispose();const v=h.morphAttributes.position!==void 0,T=h.morphAttributes.normal!==void 0,R=h.morphAttributes.color!==void 0,w=h.morphAttributes.position||[],P=h.morphAttributes.normal||[],U=h.morphAttributes.color||[];let x=0;v===!0&&(x=1),T===!0&&(x=2),R===!0&&(x=3);let E=h.attributes.position.count*x,F=1;E>e.maxTextureSize&&(F=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const O=new Float32Array(E*F*4*_),J=new cl(O,E,F,_);J.type=xi,J.needsUpdate=!0;const D=x*4;for(let W=0;W<_;W++){const q=w[W],X=P[W],Y=U[W],K=E*F*4*W;for(let ne=0;ne<q.count;ne++){const $=ne*D;v===!0&&(a.fromBufferAttribute(q,ne),O[K+$+0]=a.x,O[K+$+1]=a.y,O[K+$+2]=a.z,O[K+$+3]=0),T===!0&&(a.fromBufferAttribute(X,ne),O[K+$+4]=a.x,O[K+$+5]=a.y,O[K+$+6]=a.z,O[K+$+7]=0),R===!0&&(a.fromBufferAttribute(Y,ne),O[K+$+8]=a.x,O[K+$+9]=a.y,O[K+$+10]=a.z,O[K+$+11]=Y.itemSize===4?a.w:1)}}m={count:_,texture:J,size:new xe(E,F)},r.set(h,m),h.addEventListener("dispose",N)}let d=0;for(let v=0;v<f.length;v++)d+=f[v];const b=h.morphTargetsRelative?1:1-d;u.getUniforms().setValue(s,"morphTargetBaseInfluence",b),u.getUniforms().setValue(s,"morphTargetInfluences",f),u.getUniforms().setValue(s,"morphTargetsTexture",m.texture,t),u.getUniforms().setValue(s,"morphTargetsTextureSize",m.size)}else{const g=f===void 0?0:f.length;let _=i[h.id];if(_===void 0||_.length!==g){_=[];for(let T=0;T<g;T++)_[T]=[T,0];i[h.id]=_}for(let T=0;T<g;T++){const R=_[T];R[0]=T,R[1]=f[T]}_.sort(vf);for(let T=0;T<8;T++)T<g&&_[T][1]?(o[T][0]=_[T][0],o[T][1]=_[T][1]):(o[T][0]=Number.MAX_SAFE_INTEGER,o[T][1]=0);o.sort(_f);const m=h.morphAttributes.position,d=h.morphAttributes.normal;let b=0;for(let T=0;T<8;T++){const R=o[T],w=R[0],P=R[1];w!==Number.MAX_SAFE_INTEGER&&P?(m&&h.getAttribute("morphTarget"+T)!==m[w]&&h.setAttribute("morphTarget"+T,m[w]),d&&h.getAttribute("morphNormal"+T)!==d[w]&&h.setAttribute("morphNormal"+T,d[w]),n[T]=P,b+=P):(m&&h.hasAttribute("morphTarget"+T)===!0&&h.deleteAttribute("morphTarget"+T),d&&h.hasAttribute("morphNormal"+T)===!0&&h.deleteAttribute("morphNormal"+T),n[T]=0)}const v=h.morphTargetsRelative?1:1-b;u.getUniforms().setValue(s,"morphTargetBaseInfluence",v),u.getUniforms().setValue(s,"morphTargetInfluences",n)}}return{update:l}}function yf(s,e,t,i){let n=new WeakMap;function r(l){const c=i.render.frame,h=l.geometry,u=e.get(l,h);if(n.get(u)!==c&&(e.update(u),n.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),n.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),n.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;n.get(f)!==c&&(f.update(),n.set(f,c))}return u}function a(){n=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}class vl extends Lt{constructor(e,t,i,n,r,a,o,l,c,h){if(h=h!==void 0?h:Ui,h!==Ui&&h!==un)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Ui&&(i=vi),i===void 0&&h===un&&(i=Ii),super(null,n,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:wt,this.minFilter=l!==void 0?l:wt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const xl=new Lt,yl=new vl(1,1);yl.compareFunction=rl;const Sl=new cl,Ml=new nh,bl=new ml,no=[],so=[],ro=new Float32Array(16),ao=new Float32Array(9),oo=new Float32Array(4);function mn(s,e,t){const i=s[0];if(i<=0||i>0)return s;const n=e*t;let r=no[n];if(r===void 0&&(r=new Float32Array(n),no[n]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function ut(s,e){if(s.length!==e.length)return!1;for(let t=0,i=s.length;t<i;t++)if(s[t]!==e[t])return!1;return!0}function dt(s,e){for(let t=0,i=e.length;t<i;t++)s[t]=e[t]}function Ls(s,e){let t=so[e];t===void 0&&(t=new Int32Array(e),so[e]=t);for(let i=0;i!==e;++i)t[i]=s.allocateTextureUnit();return t}function Sf(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Mf(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ut(t,e))return;s.uniform2fv(this.addr,e),dt(t,e)}}function bf(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ut(t,e))return;s.uniform3fv(this.addr,e),dt(t,e)}}function Ef(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ut(t,e))return;s.uniform4fv(this.addr,e),dt(t,e)}}function Tf(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(ut(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),dt(t,e)}else{if(ut(t,i))return;oo.set(i),s.uniformMatrix2fv(this.addr,!1,oo),dt(t,i)}}function Af(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(ut(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),dt(t,e)}else{if(ut(t,i))return;ao.set(i),s.uniformMatrix3fv(this.addr,!1,ao),dt(t,i)}}function wf(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(ut(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),dt(t,e)}else{if(ut(t,i))return;ro.set(i),s.uniformMatrix4fv(this.addr,!1,ro),dt(t,i)}}function Pf(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Cf(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ut(t,e))return;s.uniform2iv(this.addr,e),dt(t,e)}}function Rf(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ut(t,e))return;s.uniform3iv(this.addr,e),dt(t,e)}}function Lf(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ut(t,e))return;s.uniform4iv(this.addr,e),dt(t,e)}}function Df(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function If(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ut(t,e))return;s.uniform2uiv(this.addr,e),dt(t,e)}}function Uf(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ut(t,e))return;s.uniform3uiv(this.addr,e),dt(t,e)}}function Nf(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ut(t,e))return;s.uniform4uiv(this.addr,e),dt(t,e)}}function Ff(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);const r=this.type===s.SAMPLER_2D_SHADOW?yl:xl;t.setTexture2D(e||r,n)}function Of(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture3D(e||Ml,n)}function kf(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTextureCube(e||bl,n)}function Bf(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture2DArray(e||Sl,n)}function zf(s){switch(s){case 5126:return Sf;case 35664:return Mf;case 35665:return bf;case 35666:return Ef;case 35674:return Tf;case 35675:return Af;case 35676:return wf;case 5124:case 35670:return Pf;case 35667:case 35671:return Cf;case 35668:case 35672:return Rf;case 35669:case 35673:return Lf;case 5125:return Df;case 36294:return If;case 36295:return Uf;case 36296:return Nf;case 35678:case 36198:case 36298:case 36306:case 35682:return Ff;case 35679:case 36299:case 36307:return Of;case 35680:case 36300:case 36308:case 36293:return kf;case 36289:case 36303:case 36311:case 36292:return Bf}}function Gf(s,e){s.uniform1fv(this.addr,e)}function Hf(s,e){const t=mn(e,this.size,2);s.uniform2fv(this.addr,t)}function Vf(s,e){const t=mn(e,this.size,3);s.uniform3fv(this.addr,t)}function Wf(s,e){const t=mn(e,this.size,4);s.uniform4fv(this.addr,t)}function Xf(s,e){const t=mn(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function qf(s,e){const t=mn(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function jf(s,e){const t=mn(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Yf(s,e){s.uniform1iv(this.addr,e)}function Kf(s,e){s.uniform2iv(this.addr,e)}function $f(s,e){s.uniform3iv(this.addr,e)}function Zf(s,e){s.uniform4iv(this.addr,e)}function Jf(s,e){s.uniform1uiv(this.addr,e)}function Qf(s,e){s.uniform2uiv(this.addr,e)}function ep(s,e){s.uniform3uiv(this.addr,e)}function tp(s,e){s.uniform4uiv(this.addr,e)}function ip(s,e,t){const i=this.cache,n=e.length,r=Ls(t,n);ut(i,r)||(s.uniform1iv(this.addr,r),dt(i,r));for(let a=0;a!==n;++a)t.setTexture2D(e[a]||xl,r[a])}function np(s,e,t){const i=this.cache,n=e.length,r=Ls(t,n);ut(i,r)||(s.uniform1iv(this.addr,r),dt(i,r));for(let a=0;a!==n;++a)t.setTexture3D(e[a]||Ml,r[a])}function sp(s,e,t){const i=this.cache,n=e.length,r=Ls(t,n);ut(i,r)||(s.uniform1iv(this.addr,r),dt(i,r));for(let a=0;a!==n;++a)t.setTextureCube(e[a]||bl,r[a])}function rp(s,e,t){const i=this.cache,n=e.length,r=Ls(t,n);ut(i,r)||(s.uniform1iv(this.addr,r),dt(i,r));for(let a=0;a!==n;++a)t.setTexture2DArray(e[a]||Sl,r[a])}function ap(s){switch(s){case 5126:return Gf;case 35664:return Hf;case 35665:return Vf;case 35666:return Wf;case 35674:return Xf;case 35675:return qf;case 35676:return jf;case 5124:case 35670:return Yf;case 35667:case 35671:return Kf;case 35668:case 35672:return $f;case 35669:case 35673:return Zf;case 5125:return Jf;case 36294:return Qf;case 36295:return ep;case 36296:return tp;case 35678:case 36198:case 36298:case 36306:case 35682:return ip;case 35679:case 36299:case 36307:return np;case 35680:case 36300:case 36308:case 36293:return sp;case 36289:case 36303:case 36311:case 36292:return rp}}class op{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=zf(t.type)}}class lp{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ap(t.type)}}class cp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const n=this.seq;for(let r=0,a=n.length;r!==a;++r){const o=n[r];o.setValue(e,t[o.id],i)}}}const hr=/(\w+)(\])?(\[|\.)?/g;function lo(s,e){s.seq.push(e),s.map[e.id]=e}function hp(s,e,t){const i=s.name,n=i.length;for(hr.lastIndex=0;;){const r=hr.exec(i),a=hr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===n){lo(t,c===void 0?new op(o,s,e):new lp(o,s,e));break}else{let u=t.map[o];u===void 0&&(u=new cp(o),lo(t,u)),t=u}}}class ms{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){const r=e.getActiveUniform(t,n),a=e.getUniformLocation(t,r.name);hp(r,a,this)}}setValue(e,t,i,n){const r=this.map[t];r!==void 0&&r.setValue(e,i,n)}setOptional(e,t,i){const n=t[i];n!==void 0&&this.setValue(e,i,n)}static upload(e,t,i,n){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,n)}}static seqWithValue(e,t){const i=[];for(let n=0,r=e.length;n!==r;++n){const a=e[n];a.id in t&&i.push(a)}return i}}function co(s,e,t){const i=s.createShader(e);return s.shaderSource(i,t),s.compileShader(i),i}const up=37297;let dp=0;function fp(s,e){const t=s.split(`
`),i=[],n=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=n;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function pp(s){const e=$e.getPrimaries($e.workingColorSpace),t=$e.getPrimaries(s);let i;switch(e===t?i="":e===Ss&&t===ys?i="LinearDisplayP3ToLinearSRGB":e===ys&&t===Ss&&(i="LinearSRGBToLinearDisplayP3"),s){case ui:case ws:return[i,"LinearTransferOETF"];case ht:case Dr:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[i,"LinearTransferOETF"]}}function ho(s,e,t){const i=s.getShaderParameter(e,s.COMPILE_STATUS),n=s.getShaderInfoLog(e).trim();if(i&&n==="")return"";const r=/ERROR: 0:(\d+)/.exec(n);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+n+`

`+fp(s.getShaderSource(e),a)}else return n}function mp(s,e){const t=pp(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function gp(s,e){let t;switch(e){case fc:t="Linear";break;case pc:t="Reinhard";break;case mc:t="OptimizedCineon";break;case gc:t="ACESFilmic";break;case vc:t="AgX";break;case _c:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function _p(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(an).join(`
`)}function vp(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(an).join(`
`)}function xp(s){const e=[];for(const t in s){const i=s[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function yp(s,e){const t={},i=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const r=s.getActiveAttrib(e,n),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function an(s){return s!==""}function uo(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function fo(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Sp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Tr(s){return s.replace(Sp,bp)}const Mp=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function bp(s,e){let t=Oe[e];if(t===void 0){const i=Mp.get(e);if(i!==void 0)t=Oe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Tr(t)}const Ep=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function po(s){return s.replace(Ep,Tp)}function Tp(s,e,t,i){let n="";for(let r=parseInt(e);r<parseInt(t);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function mo(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Ap(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===jo?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Gl?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===ci&&(e="SHADOWMAP_TYPE_VSM"),e}function wp(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case cn:case hn:e="ENVMAP_TYPE_CUBE";break;case As:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Pp(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case hn:e="ENVMAP_MODE_REFRACTION";break}return e}function Cp(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Yo:e="ENVMAP_BLENDING_MULTIPLY";break;case uc:e="ENVMAP_BLENDING_MIX";break;case dc:e="ENVMAP_BLENDING_ADD";break}return e}function Rp(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Lp(s,e,t,i){const n=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Ap(t),c=wp(t),h=Pp(t),u=Cp(t),f=Rp(t),p=t.isWebGL2?"":_p(t),g=vp(t),_=xp(r),m=n.createProgram();let d,b,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(an).join(`
`),d.length>0&&(d+=`
`),b=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(an).join(`
`),b.length>0&&(b+=`
`)):(d=[mo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(an).join(`
`),b=[p,mo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Si?"#define TONE_MAPPING":"",t.toneMapping!==Si?Oe.tonemapping_pars_fragment:"",t.toneMapping!==Si?gp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Oe.colorspace_pars_fragment,mp("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(an).join(`
`)),a=Tr(a),a=uo(a,t),a=fo(a,t),o=Tr(o),o=uo(o,t),o=fo(o,t),a=po(a),o=po(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,d=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,b=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Da?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Da?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+b);const T=v+d+a,R=v+b+o,w=co(n,n.VERTEX_SHADER,T),P=co(n,n.FRAGMENT_SHADER,R);n.attachShader(m,w),n.attachShader(m,P),t.index0AttributeName!==void 0?n.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&n.bindAttribLocation(m,0,"position"),n.linkProgram(m);function U(O){if(s.debug.checkShaderErrors){const J=n.getProgramInfoLog(m).trim(),D=n.getShaderInfoLog(w).trim(),N=n.getShaderInfoLog(P).trim();let W=!0,q=!0;if(n.getProgramParameter(m,n.LINK_STATUS)===!1)if(W=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,m,w,P);else{const X=ho(n,w,"vertex"),Y=ho(n,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(m,n.VALIDATE_STATUS)+`

Program Info Log: `+J+`
`+X+`
`+Y)}else J!==""?console.warn("THREE.WebGLProgram: Program Info Log:",J):(D===""||N==="")&&(q=!1);q&&(O.diagnostics={runnable:W,programLog:J,vertexShader:{log:D,prefix:d},fragmentShader:{log:N,prefix:b}})}n.deleteShader(w),n.deleteShader(P),x=new ms(n,m),E=yp(n,m)}let x;this.getUniforms=function(){return x===void 0&&U(this),x};let E;this.getAttributes=function(){return E===void 0&&U(this),E};let F=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=n.getProgramParameter(m,up)),F},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=dp++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=w,this.fragmentShader=P,this}let Dp=0;class Ip{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,n=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(n)===!1&&(a.add(n),n.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Up(e),t.set(e,i)),i}}class Up{constructor(e){this.id=Dp++,this.code=e,this.usedTimes=0}}function Np(s,e,t,i,n,r,a){const o=new Ur,l=new Ip,c=[],h=n.isWebGL2,u=n.logarithmicDepthBuffer,f=n.vertexTextures;let p=n.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return x===0?"uv":`uv${x}`}function m(x,E,F,O,J){const D=O.fog,N=J.geometry,W=x.isMeshStandardMaterial?O.environment:null,q=(x.isMeshStandardMaterial?t:e).get(x.envMap||W),X=q&&q.mapping===As?q.image.height:null,Y=g[x.type];x.precision!==null&&(p=n.getMaxPrecision(x.precision),p!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",p,"instead."));const K=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,ne=K!==void 0?K.length:0;let $=0;N.morphAttributes.position!==void 0&&($=1),N.morphAttributes.normal!==void 0&&($=2),N.morphAttributes.color!==void 0&&($=3);let V,Z,ce,ve;if(Y){const bt=ei[Y];V=bt.vertexShader,Z=bt.fragmentShader}else V=x.vertexShader,Z=x.fragmentShader,l.update(x),ce=l.getVertexShaderID(x),ve=l.getFragmentShaderID(x);const _e=s.getRenderTarget(),Ie=J.isInstancedMesh===!0,Ne=J.isBatchedMesh===!0,we=!!x.map,Xe=!!x.matcap,k=!!q,Mt=!!x.aoMap,be=!!x.lightMap,Le=!!x.bumpMap,pe=!!x.normalMap,it=!!x.displacementMap,ke=!!x.emissiveMap,A=!!x.metalnessMap,y=!!x.roughnessMap,z=x.anisotropy>0,te=x.clearcoat>0,ee=x.iridescence>0,ie=x.sheen>0,me=x.transmission>0,le=z&&!!x.anisotropyMap,ue=te&&!!x.clearcoatMap,Ae=te&&!!x.clearcoatNormalMap,Be=te&&!!x.clearcoatRoughnessMap,Q=ee&&!!x.iridescenceMap,Ke=ee&&!!x.iridescenceThicknessMap,We=ie&&!!x.sheenColorMap,Re=ie&&!!x.sheenRoughnessMap,ye=!!x.specularMap,de=!!x.specularColorMap,Fe=!!x.specularIntensityMap,Ye=me&&!!x.transmissionMap,st=me&&!!x.thicknessMap,Ge=!!x.gradientMap,se=!!x.alphaMap,L=x.alphaTest>0,ae=!!x.alphaHash,oe=!!x.extensions,Pe=!!N.attributes.uv1,Ee=!!N.attributes.uv2,Ze=!!N.attributes.uv3;let Je=Si;return x.toneMapped&&(_e===null||_e.isXRRenderTarget===!0)&&(Je=s.toneMapping),{isWebGL2:h,shaderID:Y,shaderType:x.type,shaderName:x.name,vertexShader:V,fragmentShader:Z,defines:x.defines,customVertexShaderID:ce,customFragmentShaderID:ve,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:p,batching:Ne,instancing:Ie,instancingColor:Ie&&J.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:_e===null?s.outputColorSpace:_e.isXRRenderTarget===!0?_e.texture.colorSpace:ui,map:we,matcap:Xe,envMap:k,envMapMode:k&&q.mapping,envMapCubeUVHeight:X,aoMap:Mt,lightMap:be,bumpMap:Le,normalMap:pe,displacementMap:f&&it,emissiveMap:ke,normalMapObjectSpace:pe&&x.normalMapType===Rc,normalMapTangentSpace:pe&&x.normalMapType===sl,metalnessMap:A,roughnessMap:y,anisotropy:z,anisotropyMap:le,clearcoat:te,clearcoatMap:ue,clearcoatNormalMap:Ae,clearcoatRoughnessMap:Be,iridescence:ee,iridescenceMap:Q,iridescenceThicknessMap:Ke,sheen:ie,sheenColorMap:We,sheenRoughnessMap:Re,specularMap:ye,specularColorMap:de,specularIntensityMap:Fe,transmission:me,transmissionMap:Ye,thicknessMap:st,gradientMap:Ge,opaque:x.transparent===!1&&x.blending===on,alphaMap:se,alphaTest:L,alphaHash:ae,combine:x.combine,mapUv:we&&_(x.map.channel),aoMapUv:Mt&&_(x.aoMap.channel),lightMapUv:be&&_(x.lightMap.channel),bumpMapUv:Le&&_(x.bumpMap.channel),normalMapUv:pe&&_(x.normalMap.channel),displacementMapUv:it&&_(x.displacementMap.channel),emissiveMapUv:ke&&_(x.emissiveMap.channel),metalnessMapUv:A&&_(x.metalnessMap.channel),roughnessMapUv:y&&_(x.roughnessMap.channel),anisotropyMapUv:le&&_(x.anisotropyMap.channel),clearcoatMapUv:ue&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:Ae&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Be&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:Ke&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:We&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:Re&&_(x.sheenRoughnessMap.channel),specularMapUv:ye&&_(x.specularMap.channel),specularColorMapUv:de&&_(x.specularColorMap.channel),specularIntensityMapUv:Fe&&_(x.specularIntensityMap.channel),transmissionMapUv:Ye&&_(x.transmissionMap.channel),thicknessMapUv:st&&_(x.thicknessMap.channel),alphaMapUv:se&&_(x.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(pe||z),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,vertexUv1s:Pe,vertexUv2s:Ee,vertexUv3s:Ze,pointsUvs:J.isPoints===!0&&!!N.attributes.uv&&(we||se),fog:!!D,useFog:x.fog===!0,fogExp2:D&&D.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:J.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:$,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:s.shadowMap.enabled&&F.length>0,shadowMapType:s.shadowMap.type,toneMapping:Je,useLegacyLights:s._useLegacyLights,decodeVideoTexture:we&&x.map.isVideoTexture===!0&&$e.getTransfer(x.map.colorSpace)===et,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===qt,flipSided:x.side===Rt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionDerivatives:oe&&x.extensions.derivatives===!0,extensionFragDepth:oe&&x.extensions.fragDepth===!0,extensionDrawBuffers:oe&&x.extensions.drawBuffers===!0,extensionShaderTextureLOD:oe&&x.extensions.shaderTextureLOD===!0,extensionClipCullDistance:oe&&x.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()}}function d(x){const E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(const F in x.defines)E.push(F),E.push(x.defines[F]);return x.isRawShaderMaterial===!1&&(b(E,x),v(E,x),E.push(s.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function b(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapCubeUVHeight),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.anisotropyMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.morphAttributeCount),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.numLightProbes),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function v(x,E){o.disableAll(),E.isWebGL2&&o.enable(0),E.supportsVertexTextures&&o.enable(1),E.instancing&&o.enable(2),E.instancingColor&&o.enable(3),E.matcap&&o.enable(4),E.envMap&&o.enable(5),E.normalMapObjectSpace&&o.enable(6),E.normalMapTangentSpace&&o.enable(7),E.clearcoat&&o.enable(8),E.iridescence&&o.enable(9),E.alphaTest&&o.enable(10),E.vertexColors&&o.enable(11),E.vertexAlphas&&o.enable(12),E.vertexUv1s&&o.enable(13),E.vertexUv2s&&o.enable(14),E.vertexUv3s&&o.enable(15),E.vertexTangents&&o.enable(16),E.anisotropy&&o.enable(17),E.alphaHash&&o.enable(18),E.batching&&o.enable(19),x.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.skinning&&o.enable(4),E.morphTargets&&o.enable(5),E.morphNormals&&o.enable(6),E.morphColors&&o.enable(7),E.premultipliedAlpha&&o.enable(8),E.shadowMapEnabled&&o.enable(9),E.useLegacyLights&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),x.push(o.mask)}function T(x){const E=g[x.type];let F;if(E){const O=ei[E];F=gh.clone(O.uniforms)}else F=x.uniforms;return F}function R(x,E){let F;for(let O=0,J=c.length;O<J;O++){const D=c[O];if(D.cacheKey===E){F=D,++F.usedTimes;break}}return F===void 0&&(F=new Lp(s,E,x,r),c.push(F)),F}function w(x){if(--x.usedTimes===0){const E=c.indexOf(x);c[E]=c[c.length-1],c.pop(),x.destroy()}}function P(x){l.remove(x)}function U(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:T,acquireProgram:R,releaseProgram:w,releaseShaderCache:P,programs:c,dispose:U}}function Fp(){let s=new WeakMap;function e(r){let a=s.get(r);return a===void 0&&(a={},s.set(r,a)),a}function t(r){s.delete(r)}function i(r,a,o){s.get(r)[a]=o}function n(){s=new WeakMap}return{get:e,remove:t,update:i,dispose:n}}function Op(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function go(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function _o(){const s=[];let e=0;const t=[],i=[],n=[];function r(){e=0,t.length=0,i.length=0,n.length=0}function a(u,f,p,g,_,m){let d=s[e];return d===void 0?(d={id:u.id,object:u,geometry:f,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},s[e]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=_,d.group=m),e++,d}function o(u,f,p,g,_,m){const d=a(u,f,p,g,_,m);p.transmission>0?i.push(d):p.transparent===!0?n.push(d):t.push(d)}function l(u,f,p,g,_,m){const d=a(u,f,p,g,_,m);p.transmission>0?i.unshift(d):p.transparent===!0?n.unshift(d):t.unshift(d)}function c(u,f){t.length>1&&t.sort(u||Op),i.length>1&&i.sort(f||go),n.length>1&&n.sort(f||go)}function h(){for(let u=e,f=s.length;u<f;u++){const p=s[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:n,init:r,push:o,unshift:l,finish:h,sort:c}}function kp(){let s=new WeakMap;function e(i,n){const r=s.get(i);let a;return r===void 0?(a=new _o,s.set(i,[a])):n>=r.length?(a=new _o,r.push(a)):a=r[n],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function Bp(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new Me};break;case"SpotLight":t={position:new C,direction:new C,color:new Me,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new Me,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new Me,groundColor:new Me};break;case"RectAreaLight":t={color:new Me,position:new C,halfWidth:new C,halfHeight:new C};break}return s[e.id]=t,t}}}function zp(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Gp=0;function Hp(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Vp(s,e){const t=new Bp,i=zp(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new C);const r=new C,a=new at,o=new at;function l(h,u){let f=0,p=0,g=0;for(let O=0;O<9;O++)n.probe[O].set(0,0,0);let _=0,m=0,d=0,b=0,v=0,T=0,R=0,w=0,P=0,U=0,x=0;h.sort(Hp);const E=u===!0?Math.PI:1;for(let O=0,J=h.length;O<J;O++){const D=h[O],N=D.color,W=D.intensity,q=D.distance,X=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)f+=N.r*W*E,p+=N.g*W*E,g+=N.b*W*E;else if(D.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(D.sh.coefficients[Y],W);x++}else if(D.isDirectionalLight){const Y=t.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity*E),D.castShadow){const K=D.shadow,ne=i.get(D);ne.shadowBias=K.bias,ne.shadowNormalBias=K.normalBias,ne.shadowRadius=K.radius,ne.shadowMapSize=K.mapSize,n.directionalShadow[_]=ne,n.directionalShadowMap[_]=X,n.directionalShadowMatrix[_]=D.shadow.matrix,T++}n.directional[_]=Y,_++}else if(D.isSpotLight){const Y=t.get(D);Y.position.setFromMatrixPosition(D.matrixWorld),Y.color.copy(N).multiplyScalar(W*E),Y.distance=q,Y.coneCos=Math.cos(D.angle),Y.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),Y.decay=D.decay,n.spot[d]=Y;const K=D.shadow;if(D.map&&(n.spotLightMap[P]=D.map,P++,K.updateMatrices(D),D.castShadow&&U++),n.spotLightMatrix[d]=K.matrix,D.castShadow){const ne=i.get(D);ne.shadowBias=K.bias,ne.shadowNormalBias=K.normalBias,ne.shadowRadius=K.radius,ne.shadowMapSize=K.mapSize,n.spotShadow[d]=ne,n.spotShadowMap[d]=X,w++}d++}else if(D.isRectAreaLight){const Y=t.get(D);Y.color.copy(N).multiplyScalar(W),Y.halfWidth.set(D.width*.5,0,0),Y.halfHeight.set(0,D.height*.5,0),n.rectArea[b]=Y,b++}else if(D.isPointLight){const Y=t.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity*E),Y.distance=D.distance,Y.decay=D.decay,D.castShadow){const K=D.shadow,ne=i.get(D);ne.shadowBias=K.bias,ne.shadowNormalBias=K.normalBias,ne.shadowRadius=K.radius,ne.shadowMapSize=K.mapSize,ne.shadowCameraNear=K.camera.near,ne.shadowCameraFar=K.camera.far,n.pointShadow[m]=ne,n.pointShadowMap[m]=X,n.pointShadowMatrix[m]=D.shadow.matrix,R++}n.point[m]=Y,m++}else if(D.isHemisphereLight){const Y=t.get(D);Y.skyColor.copy(D.color).multiplyScalar(W*E),Y.groundColor.copy(D.groundColor).multiplyScalar(W*E),n.hemi[v]=Y,v++}}b>0&&(e.isWebGL2?s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=re.LTC_FLOAT_1,n.rectAreaLTC2=re.LTC_FLOAT_2):(n.rectAreaLTC1=re.LTC_HALF_1,n.rectAreaLTC2=re.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=re.LTC_FLOAT_1,n.rectAreaLTC2=re.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(n.rectAreaLTC1=re.LTC_HALF_1,n.rectAreaLTC2=re.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),n.ambient[0]=f,n.ambient[1]=p,n.ambient[2]=g;const F=n.hash;(F.directionalLength!==_||F.pointLength!==m||F.spotLength!==d||F.rectAreaLength!==b||F.hemiLength!==v||F.numDirectionalShadows!==T||F.numPointShadows!==R||F.numSpotShadows!==w||F.numSpotMaps!==P||F.numLightProbes!==x)&&(n.directional.length=_,n.spot.length=d,n.rectArea.length=b,n.point.length=m,n.hemi.length=v,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=R,n.pointShadowMap.length=R,n.spotShadow.length=w,n.spotShadowMap.length=w,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=R,n.spotLightMatrix.length=w+P-U,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=U,n.numLightProbes=x,F.directionalLength=_,F.pointLength=m,F.spotLength=d,F.rectAreaLength=b,F.hemiLength=v,F.numDirectionalShadows=T,F.numPointShadows=R,F.numSpotShadows=w,F.numSpotMaps=P,F.numLightProbes=x,n.version=Gp++)}function c(h,u){let f=0,p=0,g=0,_=0,m=0;const d=u.matrixWorldInverse;for(let b=0,v=h.length;b<v;b++){const T=h[b];if(T.isDirectionalLight){const R=n.directional[f];R.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(d),f++}else if(T.isSpotLight){const R=n.spot[g];R.position.setFromMatrixPosition(T.matrixWorld),R.position.applyMatrix4(d),R.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(d),g++}else if(T.isRectAreaLight){const R=n.rectArea[_];R.position.setFromMatrixPosition(T.matrixWorld),R.position.applyMatrix4(d),o.identity(),a.copy(T.matrixWorld),a.premultiply(d),o.extractRotation(a),R.halfWidth.set(T.width*.5,0,0),R.halfHeight.set(0,T.height*.5,0),R.halfWidth.applyMatrix4(o),R.halfHeight.applyMatrix4(o),_++}else if(T.isPointLight){const R=n.point[p];R.position.setFromMatrixPosition(T.matrixWorld),R.position.applyMatrix4(d),p++}else if(T.isHemisphereLight){const R=n.hemi[m];R.direction.setFromMatrixPosition(T.matrixWorld),R.direction.transformDirection(d),m++}}}return{setup:l,setupView:c,state:n}}function vo(s,e){const t=new Vp(s,e),i=[],n=[];function r(){i.length=0,n.length=0}function a(u){i.push(u)}function o(u){n.push(u)}function l(u){t.setup(i,u)}function c(u){t.setupView(i,u)}return{init:r,state:{lightsArray:i,shadowsArray:n,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Wp(s,e){let t=new WeakMap;function i(r,a=0){const o=t.get(r);let l;return o===void 0?(l=new vo(s,e),t.set(r,[l])):a>=o.length?(l=new vo(s,e),o.push(l)):l=o[a],l}function n(){t=new WeakMap}return{get:i,dispose:n}}class Xp extends ki{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Pc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class qp extends ki{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const jp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Yp=`uniform sampler2D shadow_pass;
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
}`;function Kp(s,e,t){let i=new Nr;const n=new xe,r=new xe,a=new tt,o=new Xp({depthPacking:Cc}),l=new qp,c={},h=t.maxTextureSize,u={[bi]:Rt,[Rt]:bi,[qt]:qt},f=new Oi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xe},radius:{value:4}},vertexShader:jp,fragmentShader:Yp}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new St;g.setAttribute("position",new Ct(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new gt(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=jo;let d=this.type;this.render=function(w,P,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const x=s.getRenderTarget(),E=s.getActiveCubeFace(),F=s.getActiveMipmapLevel(),O=s.state;O.setBlending(yi),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const J=d!==ci&&this.type===ci,D=d===ci&&this.type!==ci;for(let N=0,W=w.length;N<W;N++){const q=w[N],X=q.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;n.copy(X.mapSize);const Y=X.getFrameExtents();if(n.multiply(Y),r.copy(X.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(r.x=Math.floor(h/Y.x),n.x=r.x*Y.x,X.mapSize.x=r.x),n.y>h&&(r.y=Math.floor(h/Y.y),n.y=r.y*Y.y,X.mapSize.y=r.y)),X.map===null||J===!0||D===!0){const ne=this.type!==ci?{minFilter:wt,magFilter:wt}:{};X.map!==null&&X.map.dispose(),X.map=new Fi(n.x,n.y,ne),X.map.texture.name=q.name+".shadowMap",X.camera.updateProjectionMatrix()}s.setRenderTarget(X.map),s.clear();const K=X.getViewportCount();for(let ne=0;ne<K;ne++){const $=X.getViewport(ne);a.set(r.x*$.x,r.y*$.y,r.x*$.z,r.y*$.w),O.viewport(a),X.updateMatrices(q,ne),i=X.getFrustum(),T(P,U,X.camera,q,this.type)}X.isPointLightShadow!==!0&&this.type===ci&&b(X,U),X.needsUpdate=!1}d=this.type,m.needsUpdate=!1,s.setRenderTarget(x,E,F)};function b(w,P){const U=e.update(_);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Fi(n.x,n.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,s.setRenderTarget(w.mapPass),s.clear(),s.renderBufferDirect(P,null,U,f,_,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,s.setRenderTarget(w.map),s.clear(),s.renderBufferDirect(P,null,U,p,_,null)}function v(w,P,U,x){let E=null;const F=U.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(F!==void 0)E=F;else if(E=U.isPointLight===!0?l:o,s.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const O=E.uuid,J=P.uuid;let D=c[O];D===void 0&&(D={},c[O]=D);let N=D[J];N===void 0&&(N=E.clone(),D[J]=N,P.addEventListener("dispose",R)),E=N}if(E.visible=P.visible,E.wireframe=P.wireframe,x===ci?E.side=P.shadowSide!==null?P.shadowSide:P.side:E.side=P.shadowSide!==null?P.shadowSide:u[P.side],E.alphaMap=P.alphaMap,E.alphaTest=P.alphaTest,E.map=P.map,E.clipShadows=P.clipShadows,E.clippingPlanes=P.clippingPlanes,E.clipIntersection=P.clipIntersection,E.displacementMap=P.displacementMap,E.displacementScale=P.displacementScale,E.displacementBias=P.displacementBias,E.wireframeLinewidth=P.wireframeLinewidth,E.linewidth=P.linewidth,U.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const O=s.properties.get(E);O.light=U}return E}function T(w,P,U,x,E){if(w.visible===!1)return;if(w.layers.test(P.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&E===ci)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,w.matrixWorld);const J=e.update(w),D=w.material;if(Array.isArray(D)){const N=J.groups;for(let W=0,q=N.length;W<q;W++){const X=N[W],Y=D[X.materialIndex];if(Y&&Y.visible){const K=v(w,Y,x,E);w.onBeforeShadow(s,w,P,U,J,K,X),s.renderBufferDirect(U,null,J,K,w,X),w.onAfterShadow(s,w,P,U,J,K,X)}}}else if(D.visible){const N=v(w,D,x,E);w.onBeforeShadow(s,w,P,U,J,N,null),s.renderBufferDirect(U,null,J,N,w,null),w.onAfterShadow(s,w,P,U,J,N,null)}}const O=w.children;for(let J=0,D=O.length;J<D;J++)T(O[J],P,U,x,E)}function R(w){w.target.removeEventListener("dispose",R);for(const U in c){const x=c[U],E=w.target.uuid;E in x&&(x[E].dispose(),delete x[E])}}}function $p(s,e,t){const i=t.isWebGL2;function n(){let L=!1;const ae=new tt;let oe=null;const Pe=new tt(0,0,0,0);return{setMask:function(Ee){oe!==Ee&&!L&&(s.colorMask(Ee,Ee,Ee,Ee),oe=Ee)},setLocked:function(Ee){L=Ee},setClear:function(Ee,Ze,Je,ft,bt){bt===!0&&(Ee*=ft,Ze*=ft,Je*=ft),ae.set(Ee,Ze,Je,ft),Pe.equals(ae)===!1&&(s.clearColor(Ee,Ze,Je,ft),Pe.copy(ae))},reset:function(){L=!1,oe=null,Pe.set(-1,0,0,0)}}}function r(){let L=!1,ae=null,oe=null,Pe=null;return{setTest:function(Ee){Ee?Ne(s.DEPTH_TEST):we(s.DEPTH_TEST)},setMask:function(Ee){ae!==Ee&&!L&&(s.depthMask(Ee),ae=Ee)},setFunc:function(Ee){if(oe!==Ee){switch(Ee){case sc:s.depthFunc(s.NEVER);break;case rc:s.depthFunc(s.ALWAYS);break;case ac:s.depthFunc(s.LESS);break;case vs:s.depthFunc(s.LEQUAL);break;case oc:s.depthFunc(s.EQUAL);break;case lc:s.depthFunc(s.GEQUAL);break;case cc:s.depthFunc(s.GREATER);break;case hc:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}oe=Ee}},setLocked:function(Ee){L=Ee},setClear:function(Ee){Pe!==Ee&&(s.clearDepth(Ee),Pe=Ee)},reset:function(){L=!1,ae=null,oe=null,Pe=null}}}function a(){let L=!1,ae=null,oe=null,Pe=null,Ee=null,Ze=null,Je=null,ft=null,bt=null;return{setTest:function(Qe){L||(Qe?Ne(s.STENCIL_TEST):we(s.STENCIL_TEST))},setMask:function(Qe){ae!==Qe&&!L&&(s.stencilMask(Qe),ae=Qe)},setFunc:function(Qe,Et,Kt){(oe!==Qe||Pe!==Et||Ee!==Kt)&&(s.stencilFunc(Qe,Et,Kt),oe=Qe,Pe=Et,Ee=Kt)},setOp:function(Qe,Et,Kt){(Ze!==Qe||Je!==Et||ft!==Kt)&&(s.stencilOp(Qe,Et,Kt),Ze=Qe,Je=Et,ft=Kt)},setLocked:function(Qe){L=Qe},setClear:function(Qe){bt!==Qe&&(s.clearStencil(Qe),bt=Qe)},reset:function(){L=!1,ae=null,oe=null,Pe=null,Ee=null,Ze=null,Je=null,ft=null,bt=null}}}const o=new n,l=new r,c=new a,h=new WeakMap,u=new WeakMap;let f={},p={},g=new WeakMap,_=[],m=null,d=!1,b=null,v=null,T=null,R=null,w=null,P=null,U=null,x=new Me(0,0,0),E=0,F=!1,O=null,J=null,D=null,N=null,W=null;const q=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,Y=0;const K=s.getParameter(s.VERSION);K.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(K)[1]),X=Y>=1):K.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),X=Y>=2);let ne=null,$={};const V=s.getParameter(s.SCISSOR_BOX),Z=s.getParameter(s.VIEWPORT),ce=new tt().fromArray(V),ve=new tt().fromArray(Z);function _e(L,ae,oe,Pe){const Ee=new Uint8Array(4),Ze=s.createTexture();s.bindTexture(L,Ze),s.texParameteri(L,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(L,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Je=0;Je<oe;Je++)i&&(L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY)?s.texImage3D(ae,0,s.RGBA,1,1,Pe,0,s.RGBA,s.UNSIGNED_BYTE,Ee):s.texImage2D(ae+Je,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Ee);return Ze}const Ie={};Ie[s.TEXTURE_2D]=_e(s.TEXTURE_2D,s.TEXTURE_2D,1),Ie[s.TEXTURE_CUBE_MAP]=_e(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Ie[s.TEXTURE_2D_ARRAY]=_e(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Ie[s.TEXTURE_3D]=_e(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ne(s.DEPTH_TEST),l.setFunc(vs),ke(!1),A(Jr),Ne(s.CULL_FACE),pe(yi);function Ne(L){f[L]!==!0&&(s.enable(L),f[L]=!0)}function we(L){f[L]!==!1&&(s.disable(L),f[L]=!1)}function Xe(L,ae){return p[L]!==ae?(s.bindFramebuffer(L,ae),p[L]=ae,i&&(L===s.DRAW_FRAMEBUFFER&&(p[s.FRAMEBUFFER]=ae),L===s.FRAMEBUFFER&&(p[s.DRAW_FRAMEBUFFER]=ae)),!0):!1}function k(L,ae){let oe=_,Pe=!1;if(L)if(oe=g.get(ae),oe===void 0&&(oe=[],g.set(ae,oe)),L.isWebGLMultipleRenderTargets){const Ee=L.texture;if(oe.length!==Ee.length||oe[0]!==s.COLOR_ATTACHMENT0){for(let Ze=0,Je=Ee.length;Ze<Je;Ze++)oe[Ze]=s.COLOR_ATTACHMENT0+Ze;oe.length=Ee.length,Pe=!0}}else oe[0]!==s.COLOR_ATTACHMENT0&&(oe[0]=s.COLOR_ATTACHMENT0,Pe=!0);else oe[0]!==s.BACK&&(oe[0]=s.BACK,Pe=!0);Pe&&(t.isWebGL2?s.drawBuffers(oe):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(oe))}function Mt(L){return m!==L?(s.useProgram(L),m=L,!0):!1}const be={[Li]:s.FUNC_ADD,[Vl]:s.FUNC_SUBTRACT,[Wl]:s.FUNC_REVERSE_SUBTRACT};if(i)be[ia]=s.MIN,be[na]=s.MAX;else{const L=e.get("EXT_blend_minmax");L!==null&&(be[ia]=L.MIN_EXT,be[na]=L.MAX_EXT)}const Le={[Xl]:s.ZERO,[ql]:s.ONE,[jl]:s.SRC_COLOR,[_r]:s.SRC_ALPHA,[Ql]:s.SRC_ALPHA_SATURATE,[Zl]:s.DST_COLOR,[Kl]:s.DST_ALPHA,[Yl]:s.ONE_MINUS_SRC_COLOR,[vr]:s.ONE_MINUS_SRC_ALPHA,[Jl]:s.ONE_MINUS_DST_COLOR,[$l]:s.ONE_MINUS_DST_ALPHA,[ec]:s.CONSTANT_COLOR,[tc]:s.ONE_MINUS_CONSTANT_COLOR,[ic]:s.CONSTANT_ALPHA,[nc]:s.ONE_MINUS_CONSTANT_ALPHA};function pe(L,ae,oe,Pe,Ee,Ze,Je,ft,bt,Qe){if(L===yi){d===!0&&(we(s.BLEND),d=!1);return}if(d===!1&&(Ne(s.BLEND),d=!0),L!==Hl){if(L!==b||Qe!==F){if((v!==Li||w!==Li)&&(s.blendEquation(s.FUNC_ADD),v=Li,w=Li),Qe)switch(L){case on:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Qr:s.blendFunc(s.ONE,s.ONE);break;case ea:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case ta:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case on:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Qr:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case ea:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case ta:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}T=null,R=null,P=null,U=null,x.set(0,0,0),E=0,b=L,F=Qe}return}Ee=Ee||ae,Ze=Ze||oe,Je=Je||Pe,(ae!==v||Ee!==w)&&(s.blendEquationSeparate(be[ae],be[Ee]),v=ae,w=Ee),(oe!==T||Pe!==R||Ze!==P||Je!==U)&&(s.blendFuncSeparate(Le[oe],Le[Pe],Le[Ze],Le[Je]),T=oe,R=Pe,P=Ze,U=Je),(ft.equals(x)===!1||bt!==E)&&(s.blendColor(ft.r,ft.g,ft.b,bt),x.copy(ft),E=bt),b=L,F=!1}function it(L,ae){L.side===qt?we(s.CULL_FACE):Ne(s.CULL_FACE);let oe=L.side===Rt;ae&&(oe=!oe),ke(oe),L.blending===on&&L.transparent===!1?pe(yi):pe(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),l.setFunc(L.depthFunc),l.setTest(L.depthTest),l.setMask(L.depthWrite),o.setMask(L.colorWrite);const Pe=L.stencilWrite;c.setTest(Pe),Pe&&(c.setMask(L.stencilWriteMask),c.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),c.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),z(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?Ne(s.SAMPLE_ALPHA_TO_COVERAGE):we(s.SAMPLE_ALPHA_TO_COVERAGE)}function ke(L){O!==L&&(L?s.frontFace(s.CW):s.frontFace(s.CCW),O=L)}function A(L){L!==Bl?(Ne(s.CULL_FACE),L!==J&&(L===Jr?s.cullFace(s.BACK):L===zl?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):we(s.CULL_FACE),J=L}function y(L){L!==D&&(X&&s.lineWidth(L),D=L)}function z(L,ae,oe){L?(Ne(s.POLYGON_OFFSET_FILL),(N!==ae||W!==oe)&&(s.polygonOffset(ae,oe),N=ae,W=oe)):we(s.POLYGON_OFFSET_FILL)}function te(L){L?Ne(s.SCISSOR_TEST):we(s.SCISSOR_TEST)}function ee(L){L===void 0&&(L=s.TEXTURE0+q-1),ne!==L&&(s.activeTexture(L),ne=L)}function ie(L,ae,oe){oe===void 0&&(ne===null?oe=s.TEXTURE0+q-1:oe=ne);let Pe=$[oe];Pe===void 0&&(Pe={type:void 0,texture:void 0},$[oe]=Pe),(Pe.type!==L||Pe.texture!==ae)&&(ne!==oe&&(s.activeTexture(oe),ne=oe),s.bindTexture(L,ae||Ie[L]),Pe.type=L,Pe.texture=ae)}function me(){const L=$[ne];L!==void 0&&L.type!==void 0&&(s.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function le(){try{s.compressedTexImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ue(){try{s.compressedTexImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ae(){try{s.texSubImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Be(){try{s.texSubImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Q(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ke(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function We(){try{s.texStorage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Re(){try{s.texStorage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ye(){try{s.texImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function de(){try{s.texImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Fe(L){ce.equals(L)===!1&&(s.scissor(L.x,L.y,L.z,L.w),ce.copy(L))}function Ye(L){ve.equals(L)===!1&&(s.viewport(L.x,L.y,L.z,L.w),ve.copy(L))}function st(L,ae){let oe=u.get(ae);oe===void 0&&(oe=new WeakMap,u.set(ae,oe));let Pe=oe.get(L);Pe===void 0&&(Pe=s.getUniformBlockIndex(ae,L.name),oe.set(L,Pe))}function Ge(L,ae){const Pe=u.get(ae).get(L);h.get(ae)!==Pe&&(s.uniformBlockBinding(ae,Pe,L.__bindingPointIndex),h.set(ae,Pe))}function se(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),i===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),f={},ne=null,$={},p={},g=new WeakMap,_=[],m=null,d=!1,b=null,v=null,T=null,R=null,w=null,P=null,U=null,x=new Me(0,0,0),E=0,F=!1,O=null,J=null,D=null,N=null,W=null,ce.set(0,0,s.canvas.width,s.canvas.height),ve.set(0,0,s.canvas.width,s.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Ne,disable:we,bindFramebuffer:Xe,drawBuffers:k,useProgram:Mt,setBlending:pe,setMaterial:it,setFlipSided:ke,setCullFace:A,setLineWidth:y,setPolygonOffset:z,setScissorTest:te,activeTexture:ee,bindTexture:ie,unbindTexture:me,compressedTexImage2D:le,compressedTexImage3D:ue,texImage2D:ye,texImage3D:de,updateUBOMapping:st,uniformBlockBinding:Ge,texStorage2D:We,texStorage3D:Re,texSubImage2D:Ae,texSubImage3D:Be,compressedTexSubImage2D:Q,compressedTexSubImage3D:Ke,scissor:Fe,viewport:Ye,reset:se}}function Zp(s,e,t,i,n,r,a){const o=n.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,y){return p?new OffscreenCanvas(A,y):Rn("canvas")}function _(A,y,z,te){let ee=1;if((A.width>te||A.height>te)&&(ee=te/Math.max(A.width,A.height)),ee<1||y===!0)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap){const ie=y?bs:Math.floor,me=ie(ee*A.width),le=ie(ee*A.height);u===void 0&&(u=g(me,le));const ue=z?g(me,le):u;return ue.width=me,ue.height=le,ue.getContext("2d").drawImage(A,0,0,me,le),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+A.width+"x"+A.height+") to ("+me+"x"+le+")."),ue}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+A.width+"x"+A.height+")."),A;return A}function m(A){return Er(A.width)&&Er(A.height)}function d(A){return o?!1:A.wrapS!==jt||A.wrapT!==jt||A.minFilter!==wt&&A.minFilter!==zt}function b(A,y){return A.generateMipmaps&&y&&A.minFilter!==wt&&A.minFilter!==zt}function v(A){s.generateMipmap(A)}function T(A,y,z,te,ee=!1){if(o===!1)return y;if(A!==null){if(s[A]!==void 0)return s[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let ie=y;if(y===s.RED&&(z===s.FLOAT&&(ie=s.R32F),z===s.HALF_FLOAT&&(ie=s.R16F),z===s.UNSIGNED_BYTE&&(ie=s.R8)),y===s.RED_INTEGER&&(z===s.UNSIGNED_BYTE&&(ie=s.R8UI),z===s.UNSIGNED_SHORT&&(ie=s.R16UI),z===s.UNSIGNED_INT&&(ie=s.R32UI),z===s.BYTE&&(ie=s.R8I),z===s.SHORT&&(ie=s.R16I),z===s.INT&&(ie=s.R32I)),y===s.RG&&(z===s.FLOAT&&(ie=s.RG32F),z===s.HALF_FLOAT&&(ie=s.RG16F),z===s.UNSIGNED_BYTE&&(ie=s.RG8)),y===s.RGBA){const me=ee?xs:$e.getTransfer(te);z===s.FLOAT&&(ie=s.RGBA32F),z===s.HALF_FLOAT&&(ie=s.RGBA16F),z===s.UNSIGNED_BYTE&&(ie=me===et?s.SRGB8_ALPHA8:s.RGBA8),z===s.UNSIGNED_SHORT_4_4_4_4&&(ie=s.RGBA4),z===s.UNSIGNED_SHORT_5_5_5_1&&(ie=s.RGB5_A1)}return(ie===s.R16F||ie===s.R32F||ie===s.RG16F||ie===s.RG32F||ie===s.RGBA16F||ie===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function R(A,y,z){return b(A,z)===!0||A.isFramebufferTexture&&A.minFilter!==wt&&A.minFilter!==zt?Math.log2(Math.max(y.width,y.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?y.mipmaps.length:1}function w(A){return A===wt||A===sa||A===Os?s.NEAREST:s.LINEAR}function P(A){const y=A.target;y.removeEventListener("dispose",P),x(y),y.isVideoTexture&&h.delete(y)}function U(A){const y=A.target;y.removeEventListener("dispose",U),F(y)}function x(A){const y=i.get(A);if(y.__webglInit===void 0)return;const z=A.source,te=f.get(z);if(te){const ee=te[y.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&E(A),Object.keys(te).length===0&&f.delete(z)}i.remove(A)}function E(A){const y=i.get(A);s.deleteTexture(y.__webglTexture);const z=A.source,te=f.get(z);delete te[y.__cacheKey],a.memory.textures--}function F(A){const y=A.texture,z=i.get(A),te=i.get(y);if(te.__webglTexture!==void 0&&(s.deleteTexture(te.__webglTexture),a.memory.textures--),A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(z.__webglFramebuffer[ee]))for(let ie=0;ie<z.__webglFramebuffer[ee].length;ie++)s.deleteFramebuffer(z.__webglFramebuffer[ee][ie]);else s.deleteFramebuffer(z.__webglFramebuffer[ee]);z.__webglDepthbuffer&&s.deleteRenderbuffer(z.__webglDepthbuffer[ee])}else{if(Array.isArray(z.__webglFramebuffer))for(let ee=0;ee<z.__webglFramebuffer.length;ee++)s.deleteFramebuffer(z.__webglFramebuffer[ee]);else s.deleteFramebuffer(z.__webglFramebuffer);if(z.__webglDepthbuffer&&s.deleteRenderbuffer(z.__webglDepthbuffer),z.__webglMultisampledFramebuffer&&s.deleteFramebuffer(z.__webglMultisampledFramebuffer),z.__webglColorRenderbuffer)for(let ee=0;ee<z.__webglColorRenderbuffer.length;ee++)z.__webglColorRenderbuffer[ee]&&s.deleteRenderbuffer(z.__webglColorRenderbuffer[ee]);z.__webglDepthRenderbuffer&&s.deleteRenderbuffer(z.__webglDepthRenderbuffer)}if(A.isWebGLMultipleRenderTargets)for(let ee=0,ie=y.length;ee<ie;ee++){const me=i.get(y[ee]);me.__webglTexture&&(s.deleteTexture(me.__webglTexture),a.memory.textures--),i.remove(y[ee])}i.remove(y),i.remove(A)}let O=0;function J(){O=0}function D(){const A=O;return A>=n.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+n.maxTextures),O+=1,A}function N(A){const y=[];return y.push(A.wrapS),y.push(A.wrapT),y.push(A.wrapR||0),y.push(A.magFilter),y.push(A.minFilter),y.push(A.anisotropy),y.push(A.internalFormat),y.push(A.format),y.push(A.type),y.push(A.generateMipmaps),y.push(A.premultiplyAlpha),y.push(A.flipY),y.push(A.unpackAlignment),y.push(A.colorSpace),y.join()}function W(A,y){const z=i.get(A);if(A.isVideoTexture&&it(A),A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){const te=A.image;if(te===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ce(z,A,y);return}}t.bindTexture(s.TEXTURE_2D,z.__webglTexture,s.TEXTURE0+y)}function q(A,y){const z=i.get(A);if(A.version>0&&z.__version!==A.version){ce(z,A,y);return}t.bindTexture(s.TEXTURE_2D_ARRAY,z.__webglTexture,s.TEXTURE0+y)}function X(A,y){const z=i.get(A);if(A.version>0&&z.__version!==A.version){ce(z,A,y);return}t.bindTexture(s.TEXTURE_3D,z.__webglTexture,s.TEXTURE0+y)}function Y(A,y){const z=i.get(A);if(A.version>0&&z.__version!==A.version){ve(z,A,y);return}t.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture,s.TEXTURE0+y)}const K={[Sr]:s.REPEAT,[jt]:s.CLAMP_TO_EDGE,[Mr]:s.MIRRORED_REPEAT},ne={[wt]:s.NEAREST,[sa]:s.NEAREST_MIPMAP_NEAREST,[Os]:s.NEAREST_MIPMAP_LINEAR,[zt]:s.LINEAR,[xc]:s.LINEAR_MIPMAP_NEAREST,[wn]:s.LINEAR_MIPMAP_LINEAR},$={[Lc]:s.NEVER,[Oc]:s.ALWAYS,[Dc]:s.LESS,[rl]:s.LEQUAL,[Ic]:s.EQUAL,[Fc]:s.GEQUAL,[Uc]:s.GREATER,[Nc]:s.NOTEQUAL};function V(A,y,z){if(z?(s.texParameteri(A,s.TEXTURE_WRAP_S,K[y.wrapS]),s.texParameteri(A,s.TEXTURE_WRAP_T,K[y.wrapT]),(A===s.TEXTURE_3D||A===s.TEXTURE_2D_ARRAY)&&s.texParameteri(A,s.TEXTURE_WRAP_R,K[y.wrapR]),s.texParameteri(A,s.TEXTURE_MAG_FILTER,ne[y.magFilter]),s.texParameteri(A,s.TEXTURE_MIN_FILTER,ne[y.minFilter])):(s.texParameteri(A,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(A,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(A===s.TEXTURE_3D||A===s.TEXTURE_2D_ARRAY)&&s.texParameteri(A,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(y.wrapS!==jt||y.wrapT!==jt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(A,s.TEXTURE_MAG_FILTER,w(y.magFilter)),s.texParameteri(A,s.TEXTURE_MIN_FILTER,w(y.minFilter)),y.minFilter!==wt&&y.minFilter!==zt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(s.texParameteri(A,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(A,s.TEXTURE_COMPARE_FUNC,$[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const te=e.get("EXT_texture_filter_anisotropic");if(y.magFilter===wt||y.minFilter!==Os&&y.minFilter!==wn||y.type===xi&&e.has("OES_texture_float_linear")===!1||o===!1&&y.type===Pn&&e.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||i.get(y).__currentAnisotropy)&&(s.texParameterf(A,te.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,n.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy)}}function Z(A,y){let z=!1;A.__webglInit===void 0&&(A.__webglInit=!0,y.addEventListener("dispose",P));const te=y.source;let ee=f.get(te);ee===void 0&&(ee={},f.set(te,ee));const ie=N(y);if(ie!==A.__cacheKey){ee[ie]===void 0&&(ee[ie]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,z=!0),ee[ie].usedTimes++;const me=ee[A.__cacheKey];me!==void 0&&(ee[A.__cacheKey].usedTimes--,me.usedTimes===0&&E(y)),A.__cacheKey=ie,A.__webglTexture=ee[ie].texture}return z}function ce(A,y,z){let te=s.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(te=s.TEXTURE_2D_ARRAY),y.isData3DTexture&&(te=s.TEXTURE_3D);const ee=Z(A,y),ie=y.source;t.bindTexture(te,A.__webglTexture,s.TEXTURE0+z);const me=i.get(ie);if(ie.version!==me.__version||ee===!0){t.activeTexture(s.TEXTURE0+z);const le=$e.getPrimaries($e.workingColorSpace),ue=y.colorSpace===Gt?null:$e.getPrimaries(y.colorSpace),Ae=y.colorSpace===Gt||le===ue?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);const Be=d(y)&&m(y.image)===!1;let Q=_(y.image,Be,!1,n.maxTextureSize);Q=ke(y,Q);const Ke=m(Q)||o,We=r.convert(y.format,y.colorSpace);let Re=r.convert(y.type),ye=T(y.internalFormat,We,Re,y.colorSpace,y.isVideoTexture);V(te,y,Ke);let de;const Fe=y.mipmaps,Ye=o&&y.isVideoTexture!==!0&&ye!==il,st=me.__version===void 0||ee===!0,Ge=R(y,Q,Ke);if(y.isDepthTexture)ye=s.DEPTH_COMPONENT,o?y.type===xi?ye=s.DEPTH_COMPONENT32F:y.type===vi?ye=s.DEPTH_COMPONENT24:y.type===Ii?ye=s.DEPTH24_STENCIL8:ye=s.DEPTH_COMPONENT16:y.type===xi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===Ui&&ye===s.DEPTH_COMPONENT&&y.type!==Lr&&y.type!==vi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=vi,Re=r.convert(y.type)),y.format===un&&ye===s.DEPTH_COMPONENT&&(ye=s.DEPTH_STENCIL,y.type!==Ii&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=Ii,Re=r.convert(y.type))),st&&(Ye?t.texStorage2D(s.TEXTURE_2D,1,ye,Q.width,Q.height):t.texImage2D(s.TEXTURE_2D,0,ye,Q.width,Q.height,0,We,Re,null));else if(y.isDataTexture)if(Fe.length>0&&Ke){Ye&&st&&t.texStorage2D(s.TEXTURE_2D,Ge,ye,Fe[0].width,Fe[0].height);for(let se=0,L=Fe.length;se<L;se++)de=Fe[se],Ye?t.texSubImage2D(s.TEXTURE_2D,se,0,0,de.width,de.height,We,Re,de.data):t.texImage2D(s.TEXTURE_2D,se,ye,de.width,de.height,0,We,Re,de.data);y.generateMipmaps=!1}else Ye?(st&&t.texStorage2D(s.TEXTURE_2D,Ge,ye,Q.width,Q.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,Q.width,Q.height,We,Re,Q.data)):t.texImage2D(s.TEXTURE_2D,0,ye,Q.width,Q.height,0,We,Re,Q.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Ye&&st&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ge,ye,Fe[0].width,Fe[0].height,Q.depth);for(let se=0,L=Fe.length;se<L;se++)de=Fe[se],y.format!==Yt?We!==null?Ye?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,se,0,0,0,de.width,de.height,Q.depth,We,de.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,se,ye,de.width,de.height,Q.depth,0,de.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?t.texSubImage3D(s.TEXTURE_2D_ARRAY,se,0,0,0,de.width,de.height,Q.depth,We,Re,de.data):t.texImage3D(s.TEXTURE_2D_ARRAY,se,ye,de.width,de.height,Q.depth,0,We,Re,de.data)}else{Ye&&st&&t.texStorage2D(s.TEXTURE_2D,Ge,ye,Fe[0].width,Fe[0].height);for(let se=0,L=Fe.length;se<L;se++)de=Fe[se],y.format!==Yt?We!==null?Ye?t.compressedTexSubImage2D(s.TEXTURE_2D,se,0,0,de.width,de.height,We,de.data):t.compressedTexImage2D(s.TEXTURE_2D,se,ye,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?t.texSubImage2D(s.TEXTURE_2D,se,0,0,de.width,de.height,We,Re,de.data):t.texImage2D(s.TEXTURE_2D,se,ye,de.width,de.height,0,We,Re,de.data)}else if(y.isDataArrayTexture)Ye?(st&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ge,ye,Q.width,Q.height,Q.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,We,Re,Q.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,ye,Q.width,Q.height,Q.depth,0,We,Re,Q.data);else if(y.isData3DTexture)Ye?(st&&t.texStorage3D(s.TEXTURE_3D,Ge,ye,Q.width,Q.height,Q.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,We,Re,Q.data)):t.texImage3D(s.TEXTURE_3D,0,ye,Q.width,Q.height,Q.depth,0,We,Re,Q.data);else if(y.isFramebufferTexture){if(st)if(Ye)t.texStorage2D(s.TEXTURE_2D,Ge,ye,Q.width,Q.height);else{let se=Q.width,L=Q.height;for(let ae=0;ae<Ge;ae++)t.texImage2D(s.TEXTURE_2D,ae,ye,se,L,0,We,Re,null),se>>=1,L>>=1}}else if(Fe.length>0&&Ke){Ye&&st&&t.texStorage2D(s.TEXTURE_2D,Ge,ye,Fe[0].width,Fe[0].height);for(let se=0,L=Fe.length;se<L;se++)de=Fe[se],Ye?t.texSubImage2D(s.TEXTURE_2D,se,0,0,We,Re,de):t.texImage2D(s.TEXTURE_2D,se,ye,We,Re,de);y.generateMipmaps=!1}else Ye?(st&&t.texStorage2D(s.TEXTURE_2D,Ge,ye,Q.width,Q.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,We,Re,Q)):t.texImage2D(s.TEXTURE_2D,0,ye,We,Re,Q);b(y,Ke)&&v(te),me.__version=ie.version,y.onUpdate&&y.onUpdate(y)}A.__version=y.version}function ve(A,y,z){if(y.image.length!==6)return;const te=Z(A,y),ee=y.source;t.bindTexture(s.TEXTURE_CUBE_MAP,A.__webglTexture,s.TEXTURE0+z);const ie=i.get(ee);if(ee.version!==ie.__version||te===!0){t.activeTexture(s.TEXTURE0+z);const me=$e.getPrimaries($e.workingColorSpace),le=y.colorSpace===Gt?null:$e.getPrimaries(y.colorSpace),ue=y.colorSpace===Gt||me===le?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);const Ae=y.isCompressedTexture||y.image[0].isCompressedTexture,Be=y.image[0]&&y.image[0].isDataTexture,Q=[];for(let se=0;se<6;se++)!Ae&&!Be?Q[se]=_(y.image[se],!1,!0,n.maxCubemapSize):Q[se]=Be?y.image[se].image:y.image[se],Q[se]=ke(y,Q[se]);const Ke=Q[0],We=m(Ke)||o,Re=r.convert(y.format,y.colorSpace),ye=r.convert(y.type),de=T(y.internalFormat,Re,ye,y.colorSpace),Fe=o&&y.isVideoTexture!==!0,Ye=ie.__version===void 0||te===!0;let st=R(y,Ke,We);V(s.TEXTURE_CUBE_MAP,y,We);let Ge;if(Ae){Fe&&Ye&&t.texStorage2D(s.TEXTURE_CUBE_MAP,st,de,Ke.width,Ke.height);for(let se=0;se<6;se++){Ge=Q[se].mipmaps;for(let L=0;L<Ge.length;L++){const ae=Ge[L];y.format!==Yt?Re!==null?Fe?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,L,0,0,ae.width,ae.height,Re,ae.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,L,de,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Fe?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,L,0,0,ae.width,ae.height,Re,ye,ae.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,L,de,ae.width,ae.height,0,Re,ye,ae.data)}}}else{Ge=y.mipmaps,Fe&&Ye&&(Ge.length>0&&st++,t.texStorage2D(s.TEXTURE_CUBE_MAP,st,de,Q[0].width,Q[0].height));for(let se=0;se<6;se++)if(Be){Fe?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Q[se].width,Q[se].height,Re,ye,Q[se].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,de,Q[se].width,Q[se].height,0,Re,ye,Q[se].data);for(let L=0;L<Ge.length;L++){const oe=Ge[L].image[se].image;Fe?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,L+1,0,0,oe.width,oe.height,Re,ye,oe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,L+1,de,oe.width,oe.height,0,Re,ye,oe.data)}}else{Fe?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Re,ye,Q[se]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,de,Re,ye,Q[se]);for(let L=0;L<Ge.length;L++){const ae=Ge[L];Fe?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,L+1,0,0,Re,ye,ae.image[se]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,L+1,de,Re,ye,ae.image[se])}}}b(y,We)&&v(s.TEXTURE_CUBE_MAP),ie.__version=ee.version,y.onUpdate&&y.onUpdate(y)}A.__version=y.version}function _e(A,y,z,te,ee,ie){const me=r.convert(z.format,z.colorSpace),le=r.convert(z.type),ue=T(z.internalFormat,me,le,z.colorSpace);if(!i.get(y).__hasExternalTextures){const Be=Math.max(1,y.width>>ie),Q=Math.max(1,y.height>>ie);ee===s.TEXTURE_3D||ee===s.TEXTURE_2D_ARRAY?t.texImage3D(ee,ie,ue,Be,Q,y.depth,0,me,le,null):t.texImage2D(ee,ie,ue,Be,Q,0,me,le,null)}t.bindFramebuffer(s.FRAMEBUFFER,A),pe(y)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,te,ee,i.get(z).__webglTexture,0,Le(y)):(ee===s.TEXTURE_2D||ee>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,te,ee,i.get(z).__webglTexture,ie),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ie(A,y,z){if(s.bindRenderbuffer(s.RENDERBUFFER,A),y.depthBuffer&&!y.stencilBuffer){let te=o===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(z||pe(y)){const ee=y.depthTexture;ee&&ee.isDepthTexture&&(ee.type===xi?te=s.DEPTH_COMPONENT32F:ee.type===vi&&(te=s.DEPTH_COMPONENT24));const ie=Le(y);pe(y)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ie,te,y.width,y.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,ie,te,y.width,y.height)}else s.renderbufferStorage(s.RENDERBUFFER,te,y.width,y.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,A)}else if(y.depthBuffer&&y.stencilBuffer){const te=Le(y);z&&pe(y)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,te,s.DEPTH24_STENCIL8,y.width,y.height):pe(y)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,te,s.DEPTH24_STENCIL8,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,y.width,y.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,A)}else{const te=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let ee=0;ee<te.length;ee++){const ie=te[ee],me=r.convert(ie.format,ie.colorSpace),le=r.convert(ie.type),ue=T(ie.internalFormat,me,le,ie.colorSpace),Ae=Le(y);z&&pe(y)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ae,ue,y.width,y.height):pe(y)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ae,ue,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,ue,y.width,y.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ne(A,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,A),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),W(y.depthTexture,0);const te=i.get(y.depthTexture).__webglTexture,ee=Le(y);if(y.depthTexture.format===Ui)pe(y)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,te,0,ee):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,te,0);else if(y.depthTexture.format===un)pe(y)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,te,0,ee):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function we(A){const y=i.get(A),z=A.isWebGLCubeRenderTarget===!0;if(A.depthTexture&&!y.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");Ne(y.__webglFramebuffer,A)}else if(z){y.__webglDepthbuffer=[];for(let te=0;te<6;te++)t.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer[te]),y.__webglDepthbuffer[te]=s.createRenderbuffer(),Ie(y.__webglDepthbuffer[te],A,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=s.createRenderbuffer(),Ie(y.__webglDepthbuffer,A,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function Xe(A,y,z){const te=i.get(A);y!==void 0&&_e(te.__webglFramebuffer,A,A.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),z!==void 0&&we(A)}function k(A){const y=A.texture,z=i.get(A),te=i.get(y);A.addEventListener("dispose",U),A.isWebGLMultipleRenderTargets!==!0&&(te.__webglTexture===void 0&&(te.__webglTexture=s.createTexture()),te.__version=y.version,a.memory.textures++);const ee=A.isWebGLCubeRenderTarget===!0,ie=A.isWebGLMultipleRenderTargets===!0,me=m(A)||o;if(ee){z.__webglFramebuffer=[];for(let le=0;le<6;le++)if(o&&y.mipmaps&&y.mipmaps.length>0){z.__webglFramebuffer[le]=[];for(let ue=0;ue<y.mipmaps.length;ue++)z.__webglFramebuffer[le][ue]=s.createFramebuffer()}else z.__webglFramebuffer[le]=s.createFramebuffer()}else{if(o&&y.mipmaps&&y.mipmaps.length>0){z.__webglFramebuffer=[];for(let le=0;le<y.mipmaps.length;le++)z.__webglFramebuffer[le]=s.createFramebuffer()}else z.__webglFramebuffer=s.createFramebuffer();if(ie)if(n.drawBuffers){const le=A.texture;for(let ue=0,Ae=le.length;ue<Ae;ue++){const Be=i.get(le[ue]);Be.__webglTexture===void 0&&(Be.__webglTexture=s.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&A.samples>0&&pe(A)===!1){const le=ie?y:[y];z.__webglMultisampledFramebuffer=s.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let ue=0;ue<le.length;ue++){const Ae=le[ue];z.__webglColorRenderbuffer[ue]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,z.__webglColorRenderbuffer[ue]);const Be=r.convert(Ae.format,Ae.colorSpace),Q=r.convert(Ae.type),Ke=T(Ae.internalFormat,Be,Q,Ae.colorSpace,A.isXRRenderTarget===!0),We=Le(A);s.renderbufferStorageMultisample(s.RENDERBUFFER,We,Ke,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ue,s.RENDERBUFFER,z.__webglColorRenderbuffer[ue])}s.bindRenderbuffer(s.RENDERBUFFER,null),A.depthBuffer&&(z.__webglDepthRenderbuffer=s.createRenderbuffer(),Ie(z.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ee){t.bindTexture(s.TEXTURE_CUBE_MAP,te.__webglTexture),V(s.TEXTURE_CUBE_MAP,y,me);for(let le=0;le<6;le++)if(o&&y.mipmaps&&y.mipmaps.length>0)for(let ue=0;ue<y.mipmaps.length;ue++)_e(z.__webglFramebuffer[le][ue],A,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+le,ue);else _e(z.__webglFramebuffer[le],A,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);b(y,me)&&v(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ie){const le=A.texture;for(let ue=0,Ae=le.length;ue<Ae;ue++){const Be=le[ue],Q=i.get(Be);t.bindTexture(s.TEXTURE_2D,Q.__webglTexture),V(s.TEXTURE_2D,Be,me),_e(z.__webglFramebuffer,A,Be,s.COLOR_ATTACHMENT0+ue,s.TEXTURE_2D,0),b(Be,me)&&v(s.TEXTURE_2D)}t.unbindTexture()}else{let le=s.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(o?le=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(le,te.__webglTexture),V(le,y,me),o&&y.mipmaps&&y.mipmaps.length>0)for(let ue=0;ue<y.mipmaps.length;ue++)_e(z.__webglFramebuffer[ue],A,y,s.COLOR_ATTACHMENT0,le,ue);else _e(z.__webglFramebuffer,A,y,s.COLOR_ATTACHMENT0,le,0);b(y,me)&&v(le),t.unbindTexture()}A.depthBuffer&&we(A)}function Mt(A){const y=m(A)||o,z=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let te=0,ee=z.length;te<ee;te++){const ie=z[te];if(b(ie,y)){const me=A.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,le=i.get(ie).__webglTexture;t.bindTexture(me,le),v(me),t.unbindTexture()}}}function be(A){if(o&&A.samples>0&&pe(A)===!1){const y=A.isWebGLMultipleRenderTargets?A.texture:[A.texture],z=A.width,te=A.height;let ee=s.COLOR_BUFFER_BIT;const ie=[],me=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,le=i.get(A),ue=A.isWebGLMultipleRenderTargets===!0;if(ue)for(let Ae=0;Ae<y.length;Ae++)t.bindFramebuffer(s.FRAMEBUFFER,le.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,le.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let Ae=0;Ae<y.length;Ae++){ie.push(s.COLOR_ATTACHMENT0+Ae),A.depthBuffer&&ie.push(me);const Be=le.__ignoreDepthValues!==void 0?le.__ignoreDepthValues:!1;if(Be===!1&&(A.depthBuffer&&(ee|=s.DEPTH_BUFFER_BIT),A.stencilBuffer&&(ee|=s.STENCIL_BUFFER_BIT)),ue&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,le.__webglColorRenderbuffer[Ae]),Be===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[me]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[me])),ue){const Q=i.get(y[Ae]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Q,0)}s.blitFramebuffer(0,0,z,te,0,0,z,te,ee,s.NEAREST),c&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ie)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ue)for(let Ae=0;Ae<y.length;Ae++){t.bindFramebuffer(s.FRAMEBUFFER,le.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.RENDERBUFFER,le.__webglColorRenderbuffer[Ae]);const Be=i.get(y[Ae]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,le.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.TEXTURE_2D,Be,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}}function Le(A){return Math.min(n.maxSamples,A.samples)}function pe(A){const y=i.get(A);return o&&A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function it(A){const y=a.render.frame;h.get(A)!==y&&(h.set(A,y),A.update())}function ke(A,y){const z=A.colorSpace,te=A.format,ee=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||A.format===br||z!==ui&&z!==Gt&&($e.getTransfer(z)===et?o===!1?e.has("EXT_sRGB")===!0&&te===Yt?(A.format=br,A.minFilter=zt,A.generateMipmaps=!1):y=ol.sRGBToLinear(y):(te!==Yt||ee!==Mi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),y}this.allocateTextureUnit=D,this.resetTextureUnits=J,this.setTexture2D=W,this.setTexture2DArray=q,this.setTexture3D=X,this.setTextureCube=Y,this.rebindTextures=Xe,this.setupRenderTarget=k,this.updateRenderTargetMipmap=Mt,this.updateMultisampleRenderTarget=be,this.setupDepthRenderbuffer=we,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=pe}function Jp(s,e,t){const i=t.isWebGL2;function n(r,a=Gt){let o;const l=$e.getTransfer(a);if(r===Mi)return s.UNSIGNED_BYTE;if(r===Zo)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Jo)return s.UNSIGNED_SHORT_5_5_5_1;if(r===yc)return s.BYTE;if(r===Sc)return s.SHORT;if(r===Lr)return s.UNSIGNED_SHORT;if(r===$o)return s.INT;if(r===vi)return s.UNSIGNED_INT;if(r===xi)return s.FLOAT;if(r===Pn)return i?s.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===Mc)return s.ALPHA;if(r===Yt)return s.RGBA;if(r===bc)return s.LUMINANCE;if(r===Ec)return s.LUMINANCE_ALPHA;if(r===Ui)return s.DEPTH_COMPONENT;if(r===un)return s.DEPTH_STENCIL;if(r===br)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===Tc)return s.RED;if(r===Qo)return s.RED_INTEGER;if(r===Ac)return s.RG;if(r===el)return s.RG_INTEGER;if(r===tl)return s.RGBA_INTEGER;if(r===ks||r===Bs||r===zs||r===Gs)if(l===et)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===ks)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Bs)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===zs)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Gs)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===ks)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Bs)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===zs)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Gs)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===ra||r===aa||r===oa||r===la)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===ra)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===aa)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===oa)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===la)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===il)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===ca||r===ha)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===ca)return l===et?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===ha)return l===et?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===ua||r===da||r===fa||r===pa||r===ma||r===ga||r===_a||r===va||r===xa||r===ya||r===Sa||r===Ma||r===ba||r===Ea)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===ua)return l===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===da)return l===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===fa)return l===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===pa)return l===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===ma)return l===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===ga)return l===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===_a)return l===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===va)return l===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===xa)return l===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===ya)return l===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Sa)return l===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Ma)return l===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===ba)return l===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Ea)return l===et?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Hs||r===Ta||r===Aa)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===Hs)return l===et?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Ta)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Aa)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===wc||r===wa||r===Pa||r===Ca)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===Hs)return o.COMPRESSED_RED_RGTC1_EXT;if(r===wa)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Pa)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Ca)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Ii?i?s.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:n}}class Qp extends Ft{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ot extends _t{constructor(){super(),this.isGroup=!0,this.type="Group"}}const em={type:"move"};class ur{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ot,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ot,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ot,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let n=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),d=this._getHandJoint(c,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(n=t.getPose(e.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(em)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ot;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class tm extends fn{constructor(e,t){super();const i=this;let n=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,f=null,p=null,g=null;const _=t.getContextAttributes();let m=null,d=null;const b=[],v=[],T=new xe;let R=null;const w=new Ft;w.layers.enable(1),w.viewport=new tt;const P=new Ft;P.layers.enable(2),P.viewport=new tt;const U=[w,P],x=new Qp;x.layers.enable(1),x.layers.enable(2);let E=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let Z=b[V];return Z===void 0&&(Z=new ur,b[V]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(V){let Z=b[V];return Z===void 0&&(Z=new ur,b[V]=Z),Z.getGripSpace()},this.getHand=function(V){let Z=b[V];return Z===void 0&&(Z=new ur,b[V]=Z),Z.getHandSpace()};function O(V){const Z=v.indexOf(V.inputSource);if(Z===-1)return;const ce=b[Z];ce!==void 0&&(ce.update(V.inputSource,V.frame,c||a),ce.dispatchEvent({type:V.type,data:V.inputSource}))}function J(){n.removeEventListener("select",O),n.removeEventListener("selectstart",O),n.removeEventListener("selectend",O),n.removeEventListener("squeeze",O),n.removeEventListener("squeezestart",O),n.removeEventListener("squeezeend",O),n.removeEventListener("end",J),n.removeEventListener("inputsourceschange",D);for(let V=0;V<b.length;V++){const Z=v[V];Z!==null&&(v[V]=null,b[V].disconnect(Z))}E=null,F=null,e.setRenderTarget(m),p=null,f=null,u=null,n=null,d=null,$.stop(),i.isPresenting=!1,e.setPixelRatio(R),e.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){o=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(V){c=V},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(V){if(n=V,n!==null){if(m=e.getRenderTarget(),n.addEventListener("select",O),n.addEventListener("selectstart",O),n.addEventListener("selectend",O),n.addEventListener("squeeze",O),n.addEventListener("squeezestart",O),n.addEventListener("squeezeend",O),n.addEventListener("end",J),n.addEventListener("inputsourceschange",D),_.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(T),n.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Z={antialias:n.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(n,t,Z),n.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),d=new Fi(p.framebufferWidth,p.framebufferHeight,{format:Yt,type:Mi,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let Z=null,ce=null,ve=null;_.depth&&(ve=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Z=_.stencil?un:Ui,ce=_.stencil?Ii:vi);const _e={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:r};u=new XRWebGLBinding(n,t),f=u.createProjectionLayer(_e),n.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),d=new Fi(f.textureWidth,f.textureHeight,{format:Yt,type:Mi,depthTexture:new vl(f.textureWidth,f.textureHeight,ce,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Ie=e.properties.get(d);Ie.__ignoreDepthValues=f.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await n.requestReferenceSpace(o),$.setContext(n),$.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode};function D(V){for(let Z=0;Z<V.removed.length;Z++){const ce=V.removed[Z],ve=v.indexOf(ce);ve>=0&&(v[ve]=null,b[ve].disconnect(ce))}for(let Z=0;Z<V.added.length;Z++){const ce=V.added[Z];let ve=v.indexOf(ce);if(ve===-1){for(let Ie=0;Ie<b.length;Ie++)if(Ie>=v.length){v.push(ce),ve=Ie;break}else if(v[Ie]===null){v[Ie]=ce,ve=Ie;break}if(ve===-1)break}const _e=b[ve];_e&&_e.connect(ce)}}const N=new C,W=new C;function q(V,Z,ce){N.setFromMatrixPosition(Z.matrixWorld),W.setFromMatrixPosition(ce.matrixWorld);const ve=N.distanceTo(W),_e=Z.projectionMatrix.elements,Ie=ce.projectionMatrix.elements,Ne=_e[14]/(_e[10]-1),we=_e[14]/(_e[10]+1),Xe=(_e[9]+1)/_e[5],k=(_e[9]-1)/_e[5],Mt=(_e[8]-1)/_e[0],be=(Ie[8]+1)/Ie[0],Le=Ne*Mt,pe=Ne*be,it=ve/(-Mt+be),ke=it*-Mt;Z.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(ke),V.translateZ(it),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert();const A=Ne+it,y=we+it,z=Le-ke,te=pe+(ve-ke),ee=Xe*we/y*A,ie=k*we/y*A;V.projectionMatrix.makePerspective(z,te,ee,ie,A,y),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}function X(V,Z){Z===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(Z.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(n===null)return;x.near=P.near=w.near=V.near,x.far=P.far=w.far=V.far,(E!==x.near||F!==x.far)&&(n.updateRenderState({depthNear:x.near,depthFar:x.far}),E=x.near,F=x.far);const Z=V.parent,ce=x.cameras;X(x,Z);for(let ve=0;ve<ce.length;ve++)X(ce[ve],Z);ce.length===2?q(x,w,P):x.projectionMatrix.copy(w.projectionMatrix),Y(V,x,Z)};function Y(V,Z,ce){ce===null?V.matrix.copy(Z.matrixWorld):(V.matrix.copy(ce.matrixWorld),V.matrix.invert(),V.matrix.multiply(Z.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(Z.projectionMatrix),V.projectionMatrixInverse.copy(Z.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=Cn*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(V){l=V,f!==null&&(f.fixedFoveation=V),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=V)};let K=null;function ne(V,Z){if(h=Z.getViewerPose(c||a),g=Z,h!==null){const ce=h.views;p!==null&&(e.setRenderTargetFramebuffer(d,p.framebuffer),e.setRenderTarget(d));let ve=!1;ce.length!==x.cameras.length&&(x.cameras.length=0,ve=!0);for(let _e=0;_e<ce.length;_e++){const Ie=ce[_e];let Ne=null;if(p!==null)Ne=p.getViewport(Ie);else{const Xe=u.getViewSubImage(f,Ie);Ne=Xe.viewport,_e===0&&(e.setRenderTargetTextures(d,Xe.colorTexture,f.ignoreDepthValues?void 0:Xe.depthStencilTexture),e.setRenderTarget(d))}let we=U[_e];we===void 0&&(we=new Ft,we.layers.enable(_e),we.viewport=new tt,U[_e]=we),we.matrix.fromArray(Ie.transform.matrix),we.matrix.decompose(we.position,we.quaternion,we.scale),we.projectionMatrix.fromArray(Ie.projectionMatrix),we.projectionMatrixInverse.copy(we.projectionMatrix).invert(),we.viewport.set(Ne.x,Ne.y,Ne.width,Ne.height),_e===0&&(x.matrix.copy(we.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),ve===!0&&x.cameras.push(we)}}for(let ce=0;ce<b.length;ce++){const ve=v[ce],_e=b[ce];ve!==null&&_e!==void 0&&_e.update(ve,Z,c||a)}K&&K(V,Z),Z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Z}),g=null}const $=new gl;$.setAnimationLoop(ne),this.setAnimationLoop=function(V){K=V},this.dispose=function(){}}}function im(s,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,fl(s)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function n(m,d,b,v,T){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),u(m,d)):d.isMeshPhongMaterial?(r(m,d),h(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,T)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),_(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,b,v):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Rt&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Rt&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const b=e.get(d).envMap;if(b&&(m.envMap.value=b,m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap){m.lightMap.value=d.lightMap;const v=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=d.lightMapIntensity*v,t(d.lightMap,m.lightMapTransform)}d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,b,v){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*b,m.scale.value=v*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function u(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),e.get(d).envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,b){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Rt&&m.clearcoatNormalScale.value.negate())),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){const b=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function nm(s,e,t,i){let n={},r={},a=[];const o=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(b,v){const T=v.program;i.uniformBlockBinding(b,T)}function c(b,v){let T=n[b.id];T===void 0&&(g(b),T=h(b),n[b.id]=T,b.addEventListener("dispose",m));const R=v.program;i.updateUBOMapping(b,R);const w=e.render.frame;r[b.id]!==w&&(f(b),r[b.id]=w)}function h(b){const v=u();b.__bindingPointIndex=v;const T=s.createBuffer(),R=b.__size,w=b.usage;return s.bindBuffer(s.UNIFORM_BUFFER,T),s.bufferData(s.UNIFORM_BUFFER,R,w),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,v,T),T}function u(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const v=n[b.id],T=b.uniforms,R=b.__cache;s.bindBuffer(s.UNIFORM_BUFFER,v);for(let w=0,P=T.length;w<P;w++){const U=Array.isArray(T[w])?T[w]:[T[w]];for(let x=0,E=U.length;x<E;x++){const F=U[x];if(p(F,w,x,R)===!0){const O=F.__offset,J=Array.isArray(F.value)?F.value:[F.value];let D=0;for(let N=0;N<J.length;N++){const W=J[N],q=_(W);typeof W=="number"||typeof W=="boolean"?(F.__data[0]=W,s.bufferSubData(s.UNIFORM_BUFFER,O+D,F.__data)):W.isMatrix3?(F.__data[0]=W.elements[0],F.__data[1]=W.elements[1],F.__data[2]=W.elements[2],F.__data[3]=0,F.__data[4]=W.elements[3],F.__data[5]=W.elements[4],F.__data[6]=W.elements[5],F.__data[7]=0,F.__data[8]=W.elements[6],F.__data[9]=W.elements[7],F.__data[10]=W.elements[8],F.__data[11]=0):(W.toArray(F.__data,D),D+=q.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,O,F.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(b,v,T,R){const w=b.value,P=v+"_"+T;if(R[P]===void 0)return typeof w=="number"||typeof w=="boolean"?R[P]=w:R[P]=w.clone(),!0;{const U=R[P];if(typeof w=="number"||typeof w=="boolean"){if(U!==w)return R[P]=w,!0}else if(U.equals(w)===!1)return U.copy(w),!0}return!1}function g(b){const v=b.uniforms;let T=0;const R=16;for(let P=0,U=v.length;P<U;P++){const x=Array.isArray(v[P])?v[P]:[v[P]];for(let E=0,F=x.length;E<F;E++){const O=x[E],J=Array.isArray(O.value)?O.value:[O.value];for(let D=0,N=J.length;D<N;D++){const W=J[D],q=_(W),X=T%R;X!==0&&R-X<q.boundary&&(T+=R-X),O.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=T,T+=q.storage}}}const w=T%R;return w>0&&(T+=R-w),b.__size=T,b.__cache={},this}function _(b){const v={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(v.boundary=4,v.storage=4):b.isVector2?(v.boundary=8,v.storage=8):b.isVector3||b.isColor?(v.boundary=16,v.storage=12):b.isVector4?(v.boundary=16,v.storage=16):b.isMatrix3?(v.boundary=48,v.storage=48):b.isMatrix4?(v.boundary=64,v.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),v}function m(b){const v=b.target;v.removeEventListener("dispose",m);const T=a.indexOf(v.__bindingPointIndex);a.splice(T,1),s.deleteBuffer(n[v.id]),delete n[v.id],delete r[v.id]}function d(){for(const b in n)s.deleteBuffer(n[b]);a=[],n={},r={}}return{bind:l,update:c,dispose:d}}class El{constructor(e={}){const{canvas:t=Jc(),context:i=null,depth:n=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let f;i!==null?f=i.getContextAttributes().alpha:f=a;const p=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const d=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ht,this._useLegacyLights=!1,this.toneMapping=Si,this.toneMappingExposure=1;const v=this;let T=!1,R=0,w=0,P=null,U=-1,x=null;const E=new tt,F=new tt;let O=null;const J=new Me(0);let D=0,N=t.width,W=t.height,q=1,X=null,Y=null;const K=new tt(0,0,N,W),ne=new tt(0,0,N,W);let $=!1;const V=new Nr;let Z=!1,ce=!1,ve=null;const _e=new at,Ie=new xe,Ne=new C,we={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Xe(){return P===null?q:1}let k=i;function Mt(M,I){for(let G=0;G<M.length;G++){const H=M[G],B=t.getContext(H,I);if(B!==null)return B}return null}try{const M={alpha:!0,depth:n,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Rr}`),t.addEventListener("webglcontextlost",se,!1),t.addEventListener("webglcontextrestored",L,!1),t.addEventListener("webglcontextcreationerror",ae,!1),k===null){const I=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&I.shift(),k=Mt(I,M),k===null)throw Mt(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&k instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),k.getShaderPrecisionFormat===void 0&&(k.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let be,Le,pe,it,ke,A,y,z,te,ee,ie,me,le,ue,Ae,Be,Q,Ke,We,Re,ye,de,Fe,Ye;function st(){be=new ff(k),Le=new of(k,be,e),be.init(Le),de=new Jp(k,be,Le),pe=new $p(k,be,Le),it=new gf(k),ke=new Fp,A=new Zp(k,be,pe,ke,Le,de,it),y=new cf(v),z=new df(v),te=new bh(k,Le),Fe=new rf(k,be,te,Le),ee=new pf(k,te,it,Fe),ie=new yf(k,ee,te,it),We=new xf(k,Le,A),Be=new lf(ke),me=new Np(v,y,z,be,Le,Fe,Be),le=new im(v,ke),ue=new kp,Ae=new Wp(be,Le),Ke=new sf(v,y,z,pe,ie,f,l),Q=new Kp(v,ie,Le),Ye=new nm(k,it,Le,pe),Re=new af(k,be,it,Le),ye=new mf(k,be,it,Le),it.programs=me.programs,v.capabilities=Le,v.extensions=be,v.properties=ke,v.renderLists=ue,v.shadowMap=Q,v.state=pe,v.info=it}st();const Ge=new tm(v,k);this.xr=Ge,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const M=be.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=be.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(M){M!==void 0&&(q=M,this.setSize(N,W,!1))},this.getSize=function(M){return M.set(N,W)},this.setSize=function(M,I,G=!0){if(Ge.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=M,W=I,t.width=Math.floor(M*q),t.height=Math.floor(I*q),G===!0&&(t.style.width=M+"px",t.style.height=I+"px"),this.setViewport(0,0,M,I)},this.getDrawingBufferSize=function(M){return M.set(N*q,W*q).floor()},this.setDrawingBufferSize=function(M,I,G){N=M,W=I,q=G,t.width=Math.floor(M*G),t.height=Math.floor(I*G),this.setViewport(0,0,M,I)},this.getCurrentViewport=function(M){return M.copy(E)},this.getViewport=function(M){return M.copy(K)},this.setViewport=function(M,I,G,H){M.isVector4?K.set(M.x,M.y,M.z,M.w):K.set(M,I,G,H),pe.viewport(E.copy(K).multiplyScalar(q).floor())},this.getScissor=function(M){return M.copy(ne)},this.setScissor=function(M,I,G,H){M.isVector4?ne.set(M.x,M.y,M.z,M.w):ne.set(M,I,G,H),pe.scissor(F.copy(ne).multiplyScalar(q).floor())},this.getScissorTest=function(){return $},this.setScissorTest=function(M){pe.setScissorTest($=M)},this.setOpaqueSort=function(M){X=M},this.setTransparentSort=function(M){Y=M},this.getClearColor=function(M){return M.copy(Ke.getClearColor())},this.setClearColor=function(){Ke.setClearColor.apply(Ke,arguments)},this.getClearAlpha=function(){return Ke.getClearAlpha()},this.setClearAlpha=function(){Ke.setClearAlpha.apply(Ke,arguments)},this.clear=function(M=!0,I=!0,G=!0){let H=0;if(M){let B=!1;if(P!==null){const he=P.texture.format;B=he===tl||he===el||he===Qo}if(B){const he=P.texture.type,ge=he===Mi||he===vi||he===Lr||he===Ii||he===Zo||he===Jo,Te=Ke.getClearColor(),Ce=Ke.getClearAlpha(),ze=Te.r,De=Te.g,Ue=Te.b;ge?(p[0]=ze,p[1]=De,p[2]=Ue,p[3]=Ce,k.clearBufferuiv(k.COLOR,0,p)):(g[0]=ze,g[1]=De,g[2]=Ue,g[3]=Ce,k.clearBufferiv(k.COLOR,0,g))}else H|=k.COLOR_BUFFER_BIT}I&&(H|=k.DEPTH_BUFFER_BIT),G&&(H|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",se,!1),t.removeEventListener("webglcontextrestored",L,!1),t.removeEventListener("webglcontextcreationerror",ae,!1),ue.dispose(),Ae.dispose(),ke.dispose(),y.dispose(),z.dispose(),ie.dispose(),Fe.dispose(),Ye.dispose(),me.dispose(),Ge.dispose(),Ge.removeEventListener("sessionstart",bt),Ge.removeEventListener("sessionend",Qe),ve&&(ve.dispose(),ve=null),Et.stop()};function se(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function L(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const M=it.autoReset,I=Q.enabled,G=Q.autoUpdate,H=Q.needsUpdate,B=Q.type;st(),it.autoReset=M,Q.enabled=I,Q.autoUpdate=G,Q.needsUpdate=H,Q.type=B}function ae(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function oe(M){const I=M.target;I.removeEventListener("dispose",oe),Pe(I)}function Pe(M){Ee(M),ke.remove(M)}function Ee(M){const I=ke.get(M).programs;I!==void 0&&(I.forEach(function(G){me.releaseProgram(G)}),M.isShaderMaterial&&me.releaseShaderCache(M))}this.renderBufferDirect=function(M,I,G,H,B,he){I===null&&(I=we);const ge=B.isMesh&&B.matrixWorld.determinant()<0,Te=Il(M,I,G,H,B);pe.setMaterial(H,ge);let Ce=G.index,ze=1;if(H.wireframe===!0){if(Ce=ee.getWireframeAttribute(G),Ce===void 0)return;ze=2}const De=G.drawRange,Ue=G.attributes.position;let lt=De.start*ze,Dt=(De.start+De.count)*ze;he!==null&&(lt=Math.max(lt,he.start*ze),Dt=Math.min(Dt,(he.start+he.count)*ze)),Ce!==null?(lt=Math.max(lt,0),Dt=Math.min(Dt,Ce.count)):Ue!=null&&(lt=Math.max(lt,0),Dt=Math.min(Dt,Ue.count));const pt=Dt-lt;if(pt<0||pt===1/0)return;Fe.setup(B,H,Te,G,Ce);let ii,nt=Re;if(Ce!==null&&(ii=te.get(Ce),nt=ye,nt.setIndex(ii)),B.isMesh)H.wireframe===!0?(pe.setLineWidth(H.wireframeLinewidth*Xe()),nt.setMode(k.LINES)):nt.setMode(k.TRIANGLES);else if(B.isLine){let He=H.linewidth;He===void 0&&(He=1),pe.setLineWidth(He*Xe()),B.isLineSegments?nt.setMode(k.LINES):B.isLineLoop?nt.setMode(k.LINE_LOOP):nt.setMode(k.LINE_STRIP)}else B.isPoints?nt.setMode(k.POINTS):B.isSprite&&nt.setMode(k.TRIANGLES);if(B.isBatchedMesh)nt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else if(B.isInstancedMesh)nt.renderInstances(lt,pt,B.count);else if(G.isInstancedBufferGeometry){const He=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Is=Math.min(G.instanceCount,He);nt.renderInstances(lt,pt,Is)}else nt.render(lt,pt)};function Ze(M,I,G){M.transparent===!0&&M.side===qt&&M.forceSinglePass===!1?(M.side=Rt,M.needsUpdate=!0,kn(M,I,G),M.side=bi,M.needsUpdate=!0,kn(M,I,G),M.side=qt):kn(M,I,G)}this.compile=function(M,I,G=null){G===null&&(G=M),m=Ae.get(G),m.init(),b.push(m),G.traverseVisible(function(B){B.isLight&&B.layers.test(I.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),M!==G&&M.traverseVisible(function(B){B.isLight&&B.layers.test(I.layers)&&(m.pushLight(B),B.castShadow&&m.pushShadow(B))}),m.setupLights(v._useLegacyLights);const H=new Set;return M.traverse(function(B){const he=B.material;if(he)if(Array.isArray(he))for(let ge=0;ge<he.length;ge++){const Te=he[ge];Ze(Te,G,B),H.add(Te)}else Ze(he,G,B),H.add(he)}),b.pop(),m=null,H},this.compileAsync=function(M,I,G=null){const H=this.compile(M,I,G);return new Promise(B=>{function he(){if(H.forEach(function(ge){ke.get(ge).currentProgram.isReady()&&H.delete(ge)}),H.size===0){B(M);return}setTimeout(he,10)}be.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let Je=null;function ft(M){Je&&Je(M)}function bt(){Et.stop()}function Qe(){Et.start()}const Et=new gl;Et.setAnimationLoop(ft),typeof self<"u"&&Et.setContext(self),this.setAnimationLoop=function(M){Je=M,Ge.setAnimationLoop(M),M===null?Et.stop():Et.start()},Ge.addEventListener("sessionstart",bt),Ge.addEventListener("sessionend",Qe),this.render=function(M,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),Ge.enabled===!0&&Ge.isPresenting===!0&&(Ge.cameraAutoUpdate===!0&&Ge.updateCamera(I),I=Ge.getCamera()),M.isScene===!0&&M.onBeforeRender(v,M,I,P),m=Ae.get(M,b.length),m.init(),b.push(m),_e.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),V.setFromProjectionMatrix(_e),ce=this.localClippingEnabled,Z=Be.init(this.clippingPlanes,ce),_=ue.get(M,d.length),_.init(),d.push(_),Kt(M,I,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(X,Y),this.info.render.frame++,Z===!0&&Be.beginShadows();const G=m.state.shadowsArray;if(Q.render(G,M,I),Z===!0&&Be.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ke.render(_,M),m.setupLights(v._useLegacyLights),I.isArrayCamera){const H=I.cameras;for(let B=0,he=H.length;B<he;B++){const ge=H[B];qr(_,M,ge,ge.viewport)}}else qr(_,M,I);P!==null&&(A.updateMultisampleRenderTarget(P),A.updateRenderTargetMipmap(P)),M.isScene===!0&&M.onAfterRender(v,M,I),Fe.resetDefaultState(),U=-1,x=null,b.pop(),b.length>0?m=b[b.length-1]:m=null,d.pop(),d.length>0?_=d[d.length-1]:_=null};function Kt(M,I,G,H){if(M.visible===!1)return;if(M.layers.test(I.layers)){if(M.isGroup)G=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(I);else if(M.isLight)m.pushLight(M),M.castShadow&&m.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||V.intersectsSprite(M)){H&&Ne.setFromMatrixPosition(M.matrixWorld).applyMatrix4(_e);const ge=ie.update(M),Te=M.material;Te.visible&&_.push(M,ge,Te,G,Ne.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||V.intersectsObject(M))){const ge=ie.update(M),Te=M.material;if(H&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ne.copy(M.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),Ne.copy(ge.boundingSphere.center)),Ne.applyMatrix4(M.matrixWorld).applyMatrix4(_e)),Array.isArray(Te)){const Ce=ge.groups;for(let ze=0,De=Ce.length;ze<De;ze++){const Ue=Ce[ze],lt=Te[Ue.materialIndex];lt&&lt.visible&&_.push(M,ge,lt,G,Ne.z,Ue)}}else Te.visible&&_.push(M,ge,Te,G,Ne.z,null)}}const he=M.children;for(let ge=0,Te=he.length;ge<Te;ge++)Kt(he[ge],I,G,H)}function qr(M,I,G,H){const B=M.opaque,he=M.transmissive,ge=M.transparent;m.setupLightsView(G),Z===!0&&Be.setGlobalState(v.clippingPlanes,G),he.length>0&&Dl(B,he,I,G),H&&pe.viewport(E.copy(H)),B.length>0&&On(B,I,G),he.length>0&&On(he,I,G),ge.length>0&&On(ge,I,G),pe.buffers.depth.setTest(!0),pe.buffers.depth.setMask(!0),pe.buffers.color.setMask(!0),pe.setPolygonOffset(!1)}function Dl(M,I,G,H){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;const he=Le.isWebGL2;ve===null&&(ve=new Fi(1,1,{generateMipmaps:!0,type:be.has("EXT_color_buffer_half_float")?Pn:Mi,minFilter:wn,samples:he?4:0})),v.getDrawingBufferSize(Ie),he?ve.setSize(Ie.x,Ie.y):ve.setSize(bs(Ie.x),bs(Ie.y));const ge=v.getRenderTarget();v.setRenderTarget(ve),v.getClearColor(J),D=v.getClearAlpha(),D<1&&v.setClearColor(16777215,.5),v.clear();const Te=v.toneMapping;v.toneMapping=Si,On(M,G,H),A.updateMultisampleRenderTarget(ve),A.updateRenderTargetMipmap(ve);let Ce=!1;for(let ze=0,De=I.length;ze<De;ze++){const Ue=I[ze],lt=Ue.object,Dt=Ue.geometry,pt=Ue.material,ii=Ue.group;if(pt.side===qt&&lt.layers.test(H.layers)){const nt=pt.side;pt.side=Rt,pt.needsUpdate=!0,jr(lt,G,H,Dt,pt,ii),pt.side=nt,pt.needsUpdate=!0,Ce=!0}}Ce===!0&&(A.updateMultisampleRenderTarget(ve),A.updateRenderTargetMipmap(ve)),v.setRenderTarget(ge),v.setClearColor(J,D),v.toneMapping=Te}function On(M,I,G){const H=I.isScene===!0?I.overrideMaterial:null;for(let B=0,he=M.length;B<he;B++){const ge=M[B],Te=ge.object,Ce=ge.geometry,ze=H===null?ge.material:H,De=ge.group;Te.layers.test(G.layers)&&jr(Te,I,G,Ce,ze,De)}}function jr(M,I,G,H,B,he){M.onBeforeRender(v,I,G,H,B,he),M.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),B.onBeforeRender(v,I,G,H,M,he),B.transparent===!0&&B.side===qt&&B.forceSinglePass===!1?(B.side=Rt,B.needsUpdate=!0,v.renderBufferDirect(G,I,H,B,M,he),B.side=bi,B.needsUpdate=!0,v.renderBufferDirect(G,I,H,B,M,he),B.side=qt):v.renderBufferDirect(G,I,H,B,M,he),M.onAfterRender(v,I,G,H,B,he)}function kn(M,I,G){I.isScene!==!0&&(I=we);const H=ke.get(M),B=m.state.lights,he=m.state.shadowsArray,ge=B.state.version,Te=me.getParameters(M,B.state,he,I,G),Ce=me.getProgramCacheKey(Te);let ze=H.programs;H.environment=M.isMeshStandardMaterial?I.environment:null,H.fog=I.fog,H.envMap=(M.isMeshStandardMaterial?z:y).get(M.envMap||H.environment),ze===void 0&&(M.addEventListener("dispose",oe),ze=new Map,H.programs=ze);let De=ze.get(Ce);if(De!==void 0){if(H.currentProgram===De&&H.lightsStateVersion===ge)return Kr(M,Te),De}else Te.uniforms=me.getUniforms(M),M.onBuild(G,Te,v),M.onBeforeCompile(Te,v),De=me.acquireProgram(Te,Ce),ze.set(Ce,De),H.uniforms=Te.uniforms;const Ue=H.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ue.clippingPlanes=Be.uniform),Kr(M,Te),H.needsLights=Nl(M),H.lightsStateVersion=ge,H.needsLights&&(Ue.ambientLightColor.value=B.state.ambient,Ue.lightProbe.value=B.state.probe,Ue.directionalLights.value=B.state.directional,Ue.directionalLightShadows.value=B.state.directionalShadow,Ue.spotLights.value=B.state.spot,Ue.spotLightShadows.value=B.state.spotShadow,Ue.rectAreaLights.value=B.state.rectArea,Ue.ltc_1.value=B.state.rectAreaLTC1,Ue.ltc_2.value=B.state.rectAreaLTC2,Ue.pointLights.value=B.state.point,Ue.pointLightShadows.value=B.state.pointShadow,Ue.hemisphereLights.value=B.state.hemi,Ue.directionalShadowMap.value=B.state.directionalShadowMap,Ue.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Ue.spotShadowMap.value=B.state.spotShadowMap,Ue.spotLightMatrix.value=B.state.spotLightMatrix,Ue.spotLightMap.value=B.state.spotLightMap,Ue.pointShadowMap.value=B.state.pointShadowMap,Ue.pointShadowMatrix.value=B.state.pointShadowMatrix),H.currentProgram=De,H.uniformsList=null,De}function Yr(M){if(M.uniformsList===null){const I=M.currentProgram.getUniforms();M.uniformsList=ms.seqWithValue(I.seq,M.uniforms)}return M.uniformsList}function Kr(M,I){const G=ke.get(M);G.outputColorSpace=I.outputColorSpace,G.batching=I.batching,G.instancing=I.instancing,G.instancingColor=I.instancingColor,G.skinning=I.skinning,G.morphTargets=I.morphTargets,G.morphNormals=I.morphNormals,G.morphColors=I.morphColors,G.morphTargetsCount=I.morphTargetsCount,G.numClippingPlanes=I.numClippingPlanes,G.numIntersection=I.numClipIntersection,G.vertexAlphas=I.vertexAlphas,G.vertexTangents=I.vertexTangents,G.toneMapping=I.toneMapping}function Il(M,I,G,H,B){I.isScene!==!0&&(I=we),A.resetTextureUnits();const he=I.fog,ge=H.isMeshStandardMaterial?I.environment:null,Te=P===null?v.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:ui,Ce=(H.isMeshStandardMaterial?z:y).get(H.envMap||ge),ze=H.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,De=!!G.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ue=!!G.morphAttributes.position,lt=!!G.morphAttributes.normal,Dt=!!G.morphAttributes.color;let pt=Si;H.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(pt=v.toneMapping);const ii=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,nt=ii!==void 0?ii.length:0,He=ke.get(H),Is=m.state.lights;if(Z===!0&&(ce===!0||M!==x)){const kt=M===x&&H.id===U;Be.setState(H,M,kt)}let rt=!1;H.version===He.__version?(He.needsLights&&He.lightsStateVersion!==Is.state.version||He.outputColorSpace!==Te||B.isBatchedMesh&&He.batching===!1||!B.isBatchedMesh&&He.batching===!0||B.isInstancedMesh&&He.instancing===!1||!B.isInstancedMesh&&He.instancing===!0||B.isSkinnedMesh&&He.skinning===!1||!B.isSkinnedMesh&&He.skinning===!0||B.isInstancedMesh&&He.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&He.instancingColor===!1&&B.instanceColor!==null||He.envMap!==Ce||H.fog===!0&&He.fog!==he||He.numClippingPlanes!==void 0&&(He.numClippingPlanes!==Be.numPlanes||He.numIntersection!==Be.numIntersection)||He.vertexAlphas!==ze||He.vertexTangents!==De||He.morphTargets!==Ue||He.morphNormals!==lt||He.morphColors!==Dt||He.toneMapping!==pt||Le.isWebGL2===!0&&He.morphTargetsCount!==nt)&&(rt=!0):(rt=!0,He.__version=H.version);let Ei=He.currentProgram;rt===!0&&(Ei=kn(H,I,B));let $r=!1,gn=!1,Us=!1;const vt=Ei.getUniforms(),Ti=He.uniforms;if(pe.useProgram(Ei.program)&&($r=!0,gn=!0,Us=!0),H.id!==U&&(U=H.id,gn=!0),$r||x!==M){vt.setValue(k,"projectionMatrix",M.projectionMatrix),vt.setValue(k,"viewMatrix",M.matrixWorldInverse);const kt=vt.map.cameraPosition;kt!==void 0&&kt.setValue(k,Ne.setFromMatrixPosition(M.matrixWorld)),Le.logarithmicDepthBuffer&&vt.setValue(k,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&vt.setValue(k,"isOrthographic",M.isOrthographicCamera===!0),x!==M&&(x=M,gn=!0,Us=!0)}if(B.isSkinnedMesh){vt.setOptional(k,B,"bindMatrix"),vt.setOptional(k,B,"bindMatrixInverse");const kt=B.skeleton;kt&&(Le.floatVertexTextures?(kt.boneTexture===null&&kt.computeBoneTexture(),vt.setValue(k,"boneTexture",kt.boneTexture,A)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}B.isBatchedMesh&&(vt.setOptional(k,B,"batchingTexture"),vt.setValue(k,"batchingTexture",B._matricesTexture,A));const Ns=G.morphAttributes;if((Ns.position!==void 0||Ns.normal!==void 0||Ns.color!==void 0&&Le.isWebGL2===!0)&&We.update(B,G,Ei),(gn||He.receiveShadow!==B.receiveShadow)&&(He.receiveShadow=B.receiveShadow,vt.setValue(k,"receiveShadow",B.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Ti.envMap.value=Ce,Ti.flipEnvMap.value=Ce.isCubeTexture&&Ce.isRenderTargetTexture===!1?-1:1),gn&&(vt.setValue(k,"toneMappingExposure",v.toneMappingExposure),He.needsLights&&Ul(Ti,Us),he&&H.fog===!0&&le.refreshFogUniforms(Ti,he),le.refreshMaterialUniforms(Ti,H,q,W,ve),ms.upload(k,Yr(He),Ti,A)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(ms.upload(k,Yr(He),Ti,A),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&vt.setValue(k,"center",B.center),vt.setValue(k,"modelViewMatrix",B.modelViewMatrix),vt.setValue(k,"normalMatrix",B.normalMatrix),vt.setValue(k,"modelMatrix",B.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const kt=H.uniformsGroups;for(let Fs=0,Fl=kt.length;Fs<Fl;Fs++)if(Le.isWebGL2){const Zr=kt[Fs];Ye.update(Zr,Ei),Ye.bind(Zr,Ei)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Ei}function Ul(M,I){M.ambientLightColor.needsUpdate=I,M.lightProbe.needsUpdate=I,M.directionalLights.needsUpdate=I,M.directionalLightShadows.needsUpdate=I,M.pointLights.needsUpdate=I,M.pointLightShadows.needsUpdate=I,M.spotLights.needsUpdate=I,M.spotLightShadows.needsUpdate=I,M.rectAreaLights.needsUpdate=I,M.hemisphereLights.needsUpdate=I}function Nl(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(M,I,G){ke.get(M.texture).__webglTexture=I,ke.get(M.depthTexture).__webglTexture=G;const H=ke.get(M);H.__hasExternalTextures=!0,H.__hasExternalTextures&&(H.__autoAllocateDepthBuffer=G===void 0,H.__autoAllocateDepthBuffer||be.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(M,I){const G=ke.get(M);G.__webglFramebuffer=I,G.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(M,I=0,G=0){P=M,R=I,w=G;let H=!0,B=null,he=!1,ge=!1;if(M){const Ce=ke.get(M);Ce.__useDefaultFramebuffer!==void 0?(pe.bindFramebuffer(k.FRAMEBUFFER,null),H=!1):Ce.__webglFramebuffer===void 0?A.setupRenderTarget(M):Ce.__hasExternalTextures&&A.rebindTextures(M,ke.get(M.texture).__webglTexture,ke.get(M.depthTexture).__webglTexture);const ze=M.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(ge=!0);const De=ke.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(De[I])?B=De[I][G]:B=De[I],he=!0):Le.isWebGL2&&M.samples>0&&A.useMultisampledRTT(M)===!1?B=ke.get(M).__webglMultisampledFramebuffer:Array.isArray(De)?B=De[G]:B=De,E.copy(M.viewport),F.copy(M.scissor),O=M.scissorTest}else E.copy(K).multiplyScalar(q).floor(),F.copy(ne).multiplyScalar(q).floor(),O=$;if(pe.bindFramebuffer(k.FRAMEBUFFER,B)&&Le.drawBuffers&&H&&pe.drawBuffers(M,B),pe.viewport(E),pe.scissor(F),pe.setScissorTest(O),he){const Ce=ke.get(M.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+I,Ce.__webglTexture,G)}else if(ge){const Ce=ke.get(M.texture),ze=I||0;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ce.__webglTexture,G||0,ze)}U=-1},this.readRenderTargetPixels=function(M,I,G,H,B,he,ge){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=ke.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ge!==void 0&&(Te=Te[ge]),Te){pe.bindFramebuffer(k.FRAMEBUFFER,Te);try{const Ce=M.texture,ze=Ce.format,De=Ce.type;if(ze!==Yt&&de.convert(ze)!==k.getParameter(k.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ue=De===Pn&&(be.has("EXT_color_buffer_half_float")||Le.isWebGL2&&be.has("EXT_color_buffer_float"));if(De!==Mi&&de.convert(De)!==k.getParameter(k.IMPLEMENTATION_COLOR_READ_TYPE)&&!(De===xi&&(Le.isWebGL2||be.has("OES_texture_float")||be.has("WEBGL_color_buffer_float")))&&!Ue){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=M.width-H&&G>=0&&G<=M.height-B&&k.readPixels(I,G,H,B,de.convert(ze),de.convert(De),he)}finally{const Ce=P!==null?ke.get(P).__webglFramebuffer:null;pe.bindFramebuffer(k.FRAMEBUFFER,Ce)}}},this.copyFramebufferToTexture=function(M,I,G=0){const H=Math.pow(2,-G),B=Math.floor(I.image.width*H),he=Math.floor(I.image.height*H);A.setTexture2D(I,0),k.copyTexSubImage2D(k.TEXTURE_2D,G,0,0,M.x,M.y,B,he),pe.unbindTexture()},this.copyTextureToTexture=function(M,I,G,H=0){const B=I.image.width,he=I.image.height,ge=de.convert(G.format),Te=de.convert(G.type);A.setTexture2D(G,0),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,G.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,G.unpackAlignment),I.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,H,M.x,M.y,B,he,ge,Te,I.image.data):I.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,H,M.x,M.y,I.mipmaps[0].width,I.mipmaps[0].height,ge,I.mipmaps[0].data):k.texSubImage2D(k.TEXTURE_2D,H,M.x,M.y,ge,Te,I.image),H===0&&G.generateMipmaps&&k.generateMipmap(k.TEXTURE_2D),pe.unbindTexture()},this.copyTextureToTexture3D=function(M,I,G,H,B=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const he=M.max.x-M.min.x+1,ge=M.max.y-M.min.y+1,Te=M.max.z-M.min.z+1,Ce=de.convert(H.format),ze=de.convert(H.type);let De;if(H.isData3DTexture)A.setTexture3D(H,0),De=k.TEXTURE_3D;else if(H.isDataArrayTexture||H.isCompressedArrayTexture)A.setTexture2DArray(H,0),De=k.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,H.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,H.unpackAlignment);const Ue=k.getParameter(k.UNPACK_ROW_LENGTH),lt=k.getParameter(k.UNPACK_IMAGE_HEIGHT),Dt=k.getParameter(k.UNPACK_SKIP_PIXELS),pt=k.getParameter(k.UNPACK_SKIP_ROWS),ii=k.getParameter(k.UNPACK_SKIP_IMAGES),nt=G.isCompressedTexture?G.mipmaps[B]:G.image;k.pixelStorei(k.UNPACK_ROW_LENGTH,nt.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,nt.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,M.min.x),k.pixelStorei(k.UNPACK_SKIP_ROWS,M.min.y),k.pixelStorei(k.UNPACK_SKIP_IMAGES,M.min.z),G.isDataTexture||G.isData3DTexture?k.texSubImage3D(De,B,I.x,I.y,I.z,he,ge,Te,Ce,ze,nt.data):G.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),k.compressedTexSubImage3D(De,B,I.x,I.y,I.z,he,ge,Te,Ce,nt.data)):k.texSubImage3D(De,B,I.x,I.y,I.z,he,ge,Te,Ce,ze,nt),k.pixelStorei(k.UNPACK_ROW_LENGTH,Ue),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,lt),k.pixelStorei(k.UNPACK_SKIP_PIXELS,Dt),k.pixelStorei(k.UNPACK_SKIP_ROWS,pt),k.pixelStorei(k.UNPACK_SKIP_IMAGES,ii),B===0&&H.generateMipmaps&&k.generateMipmap(De),pe.unbindTexture()},this.initTexture=function(M){M.isCubeTexture?A.setTextureCube(M,0):M.isData3DTexture?A.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?A.setTexture2DArray(M,0):A.setTexture2D(M,0),pe.unbindTexture()},this.resetState=function(){R=0,w=0,P=null,pe.reset(),Fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Dr?"display-p3":"srgb",t.unpackColorSpace=$e.workingColorSpace===ws?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===ht?Ni:nl}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Ni?ht:ui}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class sm extends El{}sm.prototype.isWebGL1Renderer=!0;class rm extends _t{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Or extends ki{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Me(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const xo=new C,yo=new C,So=new at,dr=new Ps,os=new In;class Ar extends _t{constructor(e=new St,t=new Or){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let n=1,r=t.count;n<r;n++)xo.fromBufferAttribute(t,n-1),yo.fromBufferAttribute(t,n),i[n]=i[n-1],i[n]+=xo.distanceTo(yo);e.setAttribute("lineDistance",new ot(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,n=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),os.copy(i.boundingSphere),os.applyMatrix4(n),os.radius+=r,e.ray.intersectsSphere(os)===!1)return;So.copy(n).invert(),dr.copy(e.ray).applyMatrix4(So);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new C,h=new C,u=new C,f=new C,p=this.isLineSegments?2:1,g=i.index,m=i.attributes.position;if(g!==null){const d=Math.max(0,a.start),b=Math.min(g.count,a.start+a.count);for(let v=d,T=b-1;v<T;v+=p){const R=g.getX(v),w=g.getX(v+1);if(c.fromBufferAttribute(m,R),h.fromBufferAttribute(m,w),dr.distanceSqToSegment(c,h,f,u)>l)continue;f.applyMatrix4(this.matrixWorld);const U=e.ray.origin.distanceTo(f);U<e.near||U>e.far||t.push({distance:U,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const d=Math.max(0,a.start),b=Math.min(m.count,a.start+a.count);for(let v=d,T=b-1;v<T;v+=p){if(c.fromBufferAttribute(m,v),h.fromBufferAttribute(m,v+1),dr.distanceSqToSegment(c,h,f,u)>l)continue;f.applyMatrix4(this.matrixWorld);const w=e.ray.origin.distanceTo(f);w<e.near||w>e.far||t.push({distance:w,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}class Tl extends ki{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Me(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Mo=new at,wr=new Ps,ls=new In,cs=new C;class am extends _t{constructor(e=new St,t=new Tl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,n=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ls.copy(i.boundingSphere),ls.applyMatrix4(n),ls.radius+=r,e.ray.intersectsSphere(ls)===!1)return;Mo.copy(n).invert(),wr.copy(e.ray).applyMatrix4(Mo);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,u=i.attributes.position;if(c!==null){const f=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let g=f,_=p;g<_;g++){const m=c.getX(g);cs.fromBufferAttribute(u,m),bo(cs,m,l,n,e,t,this)}}else{const f=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let g=f,_=p;g<_;g++)cs.fromBufferAttribute(u,g),bo(cs,g,l,n,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function bo(s,e,t,i,n,r,a){const o=wr.distanceSqToPoint(s);if(o<t){const l=new C;wr.closestPointToPoint(s,l),l.applyMatrix4(i);const c=n.ray.origin.distanceTo(l);if(c<n.near||c>n.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class kr extends St{constructor(e=1,t=1,i=1,n=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:n,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;n=Math.floor(n),r=Math.floor(r);const h=[],u=[],f=[],p=[];let g=0;const _=[],m=i/2;let d=0;b(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new ot(u,3)),this.setAttribute("normal",new ot(f,3)),this.setAttribute("uv",new ot(p,2));function b(){const T=new C,R=new C;let w=0;const P=(t-e)/i;for(let U=0;U<=r;U++){const x=[],E=U/r,F=E*(t-e)+e;for(let O=0;O<=n;O++){const J=O/n,D=J*l+o,N=Math.sin(D),W=Math.cos(D);R.x=F*N,R.y=-E*i+m,R.z=F*W,u.push(R.x,R.y,R.z),T.set(N,P,W).normalize(),f.push(T.x,T.y,T.z),p.push(J,1-E),x.push(g++)}_.push(x)}for(let U=0;U<n;U++)for(let x=0;x<r;x++){const E=_[x][U],F=_[x+1][U],O=_[x+1][U+1],J=_[x][U+1];h.push(E,F,J),h.push(F,O,J),w+=6}c.addGroup(d,w,0),d+=w}function v(T){const R=g,w=new xe,P=new C;let U=0;const x=T===!0?e:t,E=T===!0?1:-1;for(let O=1;O<=n;O++)u.push(0,m*E,0),f.push(0,E,0),p.push(.5,.5),g++;const F=g;for(let O=0;O<=n;O++){const D=O/n*l+o,N=Math.cos(D),W=Math.sin(D);P.x=x*W,P.y=m*E,P.z=x*N,u.push(P.x,P.y,P.z),f.push(0,E,0),w.x=N*.5+.5,w.y=W*.5*E+.5,p.push(w.x,w.y),g++}for(let O=0;O<n;O++){const J=R+O,D=F+O;T===!0?h.push(D,D+1,J):h.push(D+1,D,J),U+=3}c.addGroup(d,U,T===!0?1:2),d+=U}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kr(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Br extends kr{constructor(e=1,t=1,i=32,n=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,i,n,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:n,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Br(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Nn extends St{constructor(e=[],t=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:n};const r=[],a=[];o(n),c(i),h(),this.setAttribute("position",new ot(r,3)),this.setAttribute("normal",new ot(r.slice(),3)),this.setAttribute("uv",new ot(a,2)),n===0?this.computeVertexNormals():this.normalizeNormals();function o(b){const v=new C,T=new C,R=new C;for(let w=0;w<t.length;w+=3)p(t[w+0],v),p(t[w+1],T),p(t[w+2],R),l(v,T,R,b)}function l(b,v,T,R){const w=R+1,P=[];for(let U=0;U<=w;U++){P[U]=[];const x=b.clone().lerp(T,U/w),E=v.clone().lerp(T,U/w),F=w-U;for(let O=0;O<=F;O++)O===0&&U===w?P[U][O]=x:P[U][O]=x.clone().lerp(E,O/F)}for(let U=0;U<w;U++)for(let x=0;x<2*(w-U)-1;x++){const E=Math.floor(x/2);x%2===0?(f(P[U][E+1]),f(P[U+1][E]),f(P[U][E])):(f(P[U][E+1]),f(P[U+1][E+1]),f(P[U+1][E]))}}function c(b){const v=new C;for(let T=0;T<r.length;T+=3)v.x=r[T+0],v.y=r[T+1],v.z=r[T+2],v.normalize().multiplyScalar(b),r[T+0]=v.x,r[T+1]=v.y,r[T+2]=v.z}function h(){const b=new C;for(let v=0;v<r.length;v+=3){b.x=r[v+0],b.y=r[v+1],b.z=r[v+2];const T=m(b)/2/Math.PI+.5,R=d(b)/Math.PI+.5;a.push(T,1-R)}g(),u()}function u(){for(let b=0;b<a.length;b+=6){const v=a[b+0],T=a[b+2],R=a[b+4],w=Math.max(v,T,R),P=Math.min(v,T,R);w>.9&&P<.1&&(v<.2&&(a[b+0]+=1),T<.2&&(a[b+2]+=1),R<.2&&(a[b+4]+=1))}}function f(b){r.push(b.x,b.y,b.z)}function p(b,v){const T=b*3;v.x=e[T+0],v.y=e[T+1],v.z=e[T+2]}function g(){const b=new C,v=new C,T=new C,R=new C,w=new xe,P=new xe,U=new xe;for(let x=0,E=0;x<r.length;x+=9,E+=6){b.set(r[x+0],r[x+1],r[x+2]),v.set(r[x+3],r[x+4],r[x+5]),T.set(r[x+6],r[x+7],r[x+8]),w.set(a[E+0],a[E+1]),P.set(a[E+2],a[E+3]),U.set(a[E+4],a[E+5]),R.copy(b).add(v).add(T).divideScalar(3);const F=m(R);_(w,E+0,b,F),_(P,E+2,v,F),_(U,E+4,T,F)}}function _(b,v,T,R){R<0&&b.x===1&&(a[v]=b.x-1),T.x===0&&T.z===0&&(a[v]=R/2/Math.PI+.5)}function m(b){return Math.atan2(b.z,-b.x)}function d(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nn(e.vertices,e.indices,e.radius,e.details)}}class Fn extends Nn{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,n=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(n,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Fn(e.radius,e.detail)}}class Ds extends Nn{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],n=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,n,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ds(e.radius,e.detail)}}class zr extends St{constructor(e=.5,t=1,i=32,n=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:n,thetaStart:r,thetaLength:a},i=Math.max(3,i),n=Math.max(1,n);const o=[],l=[],c=[],h=[];let u=e;const f=(t-e)/n,p=new C,g=new xe;for(let _=0;_<=n;_++){for(let m=0;m<=i;m++){const d=r+m/i*a;p.x=u*Math.cos(d),p.y=u*Math.sin(d),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,h.push(g.x,g.y)}u+=f}for(let _=0;_<n;_++){const m=_*(i+1);for(let d=0;d<i;d++){const b=d+m,v=b,T=b+i+1,R=b+i+2,w=b+1;o.push(v,T,w),o.push(T,R,w)}}this.setIndex(o),this.setAttribute("position",new ot(l,3)),this.setAttribute("normal",new ot(c,3)),this.setAttribute("uv",new ot(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zr(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Gr extends Nn{constructor(e=1,t=0){const i=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],n=[2,1,0,0,3,2,1,3,0,2,3,1];super(i,n,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Gr(e.radius,e.detail)}}class Hr extends St{constructor(e=1,t=.4,i=12,n=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:n,arc:r},i=Math.floor(i),n=Math.floor(n);const a=[],o=[],l=[],c=[],h=new C,u=new C,f=new C;for(let p=0;p<=i;p++)for(let g=0;g<=n;g++){const _=g/n*r,m=p/i*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(_),u.y=(e+t*Math.cos(m))*Math.sin(_),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),c.push(g/n),c.push(p/i)}for(let p=1;p<=i;p++)for(let g=1;g<=n;g++){const _=(n+1)*p+g-1,m=(n+1)*(p-1)+g-1,d=(n+1)*(p-1)+g,b=(n+1)*p+g;a.push(_,m,b),a.push(m,d,b)}this.setIndex(a),this.setAttribute("position",new ot(o,3)),this.setAttribute("normal",new ot(l,3)),this.setAttribute("uv",new ot(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hr(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class om extends ki{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Me(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Me(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=sl,this.normalScale=new xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const Eo={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class lm{constructor(e,t,i){const n=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(h){o++,r===!1&&n.onStart!==void 0&&n.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,n.onProgress!==void 0&&n.onProgress(h,a,o),a===o&&(r=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(h){n.onError!==void 0&&n.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){const p=c[u],g=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}}const cm=new lm;class Vr{constructor(e){this.manager=e!==void 0?e:cm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(n,r){i.load(e,n,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Vr.DEFAULT_MATERIAL_NAME="__DEFAULT";class hm extends Vr{constructor(e){super(e)}load(e,t,i,n){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Eo.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=Rn("img");function l(){h(),Eo.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(u){h(),n&&n(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class um extends Vr{constructor(e){super(e)}load(e,t,i,n){const r=new Lt,a=new hm(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},i,n),r}}class Wr extends _t{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Me(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const fr=new at,To=new C,Ao=new C;class Al{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new xe(512,512),this.map=null,this.mapPass=null,this.matrix=new at,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Nr,this._frameExtents=new xe(1,1),this._viewportCount=1,this._viewports=[new tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;To.setFromMatrixPosition(e.matrixWorld),t.position.copy(To),Ao.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ao),t.updateMatrixWorld(),fr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fr),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(fr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const wo=new at,Sn=new C,pr=new C;class dm extends Al{constructor(){super(new Ft(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new xe(4,2),this._viewportCount=6,this._viewports=[new tt(2,1,1,1),new tt(0,1,1,1),new tt(3,1,1,1),new tt(1,1,1,1),new tt(3,0,1,1),new tt(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,n=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),Sn.setFromMatrixPosition(e.matrixWorld),i.position.copy(Sn),pr.copy(i.position),pr.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(pr),i.updateMatrixWorld(),n.makeTranslation(-Sn.x,-Sn.y,-Sn.z),wo.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wo)}}class fm extends Wr{constructor(e,t,i=0,n=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new dm}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class pm extends Al{constructor(){super(new _l(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class mm extends Wr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_t.DEFAULT_UP),this.updateMatrix(),this.target=new _t,this.shadow=new pm}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class gm extends Wr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class _m{constructor(e,t,i=0,n=1/0){this.ray=new Ps(e,t),this.near=i,this.far=n,this.camera=null,this.layers=new Ur,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,i=[]){return Pr(e,this,i,t),i.sort(Po),i}intersectObjects(e,t=!0,i=[]){for(let n=0,r=e.length;n<r;n++)Pr(e[n],this,i,t);return i.sort(Po),i}}function Po(s,e){return s.distance-e.distance}function Pr(s,e,t,i){if(s.layers.test(e.layers)&&s.raycast(e,t),i===!0){const n=s.children;for(let r=0,a=n.length;r<a;r++)Pr(n[r],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Rr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Rr);const Co=[{x:0,y:0,z:0},{x:-2.7,y:3.6,z:1.7},{x:-1.3,y:1.75,z:.8},{x:2.7,y:3.6,z:-1.7},{x:1.3,y:1.75,z:-.8},{x:-2.7,y:-3.6,z:-1.7},{x:-1.3,y:-1.75,z:-.8},{x:2.7,y:-3.6,z:1.7},{x:1.3,y:-1.75,z:.8},{x:0,y:-4.35,z:.15}],Ro=[{x:0,y:0,z:0},{x:-4.8,y:6.1,z:3.4},{x:-2.15,y:2.95,z:1.55},{x:4.8,y:6.1,z:-3.4},{x:2.15,y:2.95,z:-1.55},{x:-4.8,y:-6.1,z:-3.4},{x:-2.15,y:-2.95,z:-1.55},{x:4.8,y:-6.1,z:3.4},{x:2.15,y:-2.95,z:1.55},{x:0,y:-5.05,z:.2}];function vm(s,e){return s===0?"presentation":s===e-1?"hint":"project"}function xm(s){return Co[s]||Co[0]}function ym(s){return Ro[s]||Ro[0]}const Sm=[{id:1,activeFacette:0,date:"2024-03",facettes:[{id:1,images:["assets/images/projects/intro.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:"https://github.com/orgs/ApeProd",demo:null,video:null},featured:!1},{id:3,images:["assets/images/projects/Imageprofile.png"],links:{github:null,demo:null,video:null},featured:!1}]},{id:2,activeFacette:0,date:"2024-02",facettes:[{id:1,images:["assets/images/projects/TonoIntro.png"],links:{github:"https://github.com/bheall/Tono_Discord_Bot",demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:3,activeFacette:0,date:"2024-01",facettes:[{id:1,images:["assets/images/projects/Davinciintro.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:4,activeFacette:0,date:"2023-12",facettes:[{id:1,images:[],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:5,activeFacette:0,date:"2023-11",facettes:[{id:1,images:["assets/images/projects/Introia.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:6,activeFacette:0,date:"2023-10",facettes:[{id:1,images:["assets/images/projects/Discordintro.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:7,activeFacette:0,date:"2023-09",facettes:[{id:1,images:["assets/images/projects/placeholder.svg"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:["assets/images/projects/placeholder.svg"],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:["assets/images/projects/placeholder.svg"],links:{github:null,demo:null,video:null},featured:!1}]},{id:8,activeFacette:0,date:"2023-08",facettes:[{id:1,images:["assets/images/projects/Spine.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:9,activeFacette:0,date:"2023-07",facettes:[{id:1,images:["assets/images/projects/Conception.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:10,activeFacette:0,date:"2023-06",facettes:[{id:1,images:[],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]}],wl={fr:[{id:1,title:"PRÉSENTATION",facettes:[{category:"presentation",longDescription:"On dit souvent qu'un restaurant avec une carte trop fournie peine à exceller dans chaque plat. Ape Prod propose plusieurs services MAIS qui convergent vers une seule spécialité : le design et le brainstorming de projets. Direction artistique, identité visuelle, game design, prototypage technique et scénarisation — chaque compétence sert un objectif commun : transformer vos idées en concepts solides à votre image et innovants.",technologies:["Direction Artistique","Conception","Stratégie Créative","Innovation","Vision Globale"]},{category:"services",longDescription:`Designer polyvalent, je travaille avec de nombreux logiciels pour donner vie à mes idées et créer des DA et designs adaptés à n'importe quel projet. Ma valeur ajoutée réside dans ma polyvalence — sans être un expert de chaque domaine — qui me permet de créer des prototypes précis facilement reprenables et améliorables.

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

Together, we won't create just another project. We'll create THE project that makes the difference.`,technologies:["Innovation","Strategic Creativity","Impact","Excellence","Difference"]}]}]},Mm={1:{dark:"assets/images/Logo/logomodedark.svg",light:"assets/images/Logo/logomodelight.svg",scale:.7,opacity:1},2:{dark:"assets/images/Logo/logomodedark.svg",light:"assets/images/Logo/logomodelight.svg",scale:.7,opacity:1},3:{dark:"assets/images/Logo/DavinciLogoDark.svg",light:"assets/images/Logo/DavinciLogoLight.svg",scale:.7,opacity:1},4:{dark:"assets/images/Logo/MovieLogoDark.svg",light:"assets/images/Logo/MovieLogoLight.svg",scale:.7,opacity:1},5:{dark:"assets/images/Logo/IALogoDark.svg",light:"assets/images/Logo/IALogoLight.svg",scale:.7,opacity:1},6:{dark:"assets/images/Logo/DiscordLogoDark.svg",light:"assets/images/Logo/DiscordLogoLight.svg",scale:.7,opacity:1},7:{dark:"assets/images/Logo/AffinityLogoDark.svg",light:"assets/images/Logo/AffinityLogoLight.svg",scale:.7,opacity:1},8:{dark:"assets/images/Logo/SpineLogoDark.svg",light:"assets/images/Logo/SpineLogoLight.svg",scale:.7,opacity:1},9:{dark:"assets/images/Logo/logomodedark.svg",light:"assets/images/Logo/logomodelight.svg",scale:.7,opacity:1},10:{dark:"assets/images/Logo/logomodedark.svg",light:"assets/images/Logo/logomodelight.svg",scale:.7,opacity:1}},hs={dark:"/assets/images/Logo/logomodedark.svg",light:"/assets/images/Logo/logomodelight.svg",scale:.7,opacity:1},bm={presentation:{fr:"Présentation",en:"Introduction"},services:{fr:"Services",en:"Services"},about:{fr:"À propos",en:"About"},dev:{fr:"Développement",en:"Development"},video:{fr:"Vidéo",en:"Video"},tech:{fr:"IA & technique",en:"AI & tech"},design:{fr:"Design",en:"Design"},gamedesign:{fr:"Game design",en:"Game design"},business:{fr:"Stratégie",en:"Strategy"}};function Em(s){return{github:(s==null?void 0:s.github)||null,demo:(s==null?void 0:s.demo)||null,video:(s==null?void 0:s.video)||null}}function Tm(s,e,t,i){const n=e.category,r=bm[n]||{fr:n,en:t.category||n};return{id:s,categoryKey:n,categoryLabel:r,description:{fr:e.longDescription,en:t.longDescription},technologies:e.technologies.map((a,o)=>({fr:a,en:t.technologies[o]||a})),images:i.images?i.images.map(a=>`/${a}`):[],links:Em(i.links),featured:!!i.featured}}function Am(s){const t=Mm[String(s)]||{};return{dark:t.dark?`/${t.dark}`:hs.dark,light:t.light?`/${t.light}`:hs.light,scale:typeof t.scale=="number"?t.scale:hs.scale,opacity:typeof t.opacity=="number"?t.opacity:hs.opacity}}const Lo=Sm,wm=wl.fr,Pm=wl.en,Cm=Lo.map((s,e)=>{const t=wm[e],i=Pm[e],n=vm(e,Lo.length),r=s.facettes.map((a,o)=>Tm(o,t.facettes[o],i.facettes[o],a));return{id:`shard-${s.id}`,numericId:s.id,order:e,role:n,date:s.date,title:{fr:n==="hint"?"INDICE":t.title,en:n==="hint"?"HINT":i.title},logo:Am(s.id),facets:n==="hint"?[{...r[0],categoryKey:"hint",categoryLabel:{fr:"Indice",en:"Hint"},description:{fr:"Tous les fragments n’attendent pas le focus. Certains veulent retrouver une forme précise. Observe le X, puis ce point sous sa blessure centrale.",en:"Not every fragment wants focus. Some want to recover a precise form. Watch the X, then the dot below its central wound."},technologies:[{fr:"Mystère",en:"Mystery"},{fr:"Placement",en:"Placement"},{fr:"Transformation",en:"Transformation"},{fr:"Jeu caché",en:"Hidden game"},{fr:"Clé d’accès",en:"Access key"}]},{...r[1],categoryKey:"hint",categoryLabel:{fr:"Accès",en:"Access"},description:{fr:"Quand chaque shard rejoint son empreinte, le monde cesse d’être un portfolio et bascule vers une autre règle.",en:"When every shard reaches its imprint, the world stops being a portfolio and switches to another rule."},technologies:[{fr:"Pivot",en:"Pivot"},{fr:"Constellation",en:"Constellation"},{fr:"Déblocage",en:"Unlock"},{fr:"Momentum",en:"Momentum"},{fr:"Transition",en:"Transition"}]},{...r[2],categoryKey:"hint",categoryLabel:{fr:"Conseil",en:"Clue"},description:{fr:"Ne cherche pas un bouton. Replace les fragments. Le fil de lumière ne ment jamais.",en:"Do not search for a button. Put the fragments back into place. The line of light never lies."},technologies:[{fr:"Patience",en:"Patience"},{fr:"Lecture",en:"Reading"},{fr:"Exploration",en:"Exploration"},{fr:"Déverrouillage",en:"Unlocking"},{fr:"Secret",en:"Secret"}]}]:r}});class Rm{constructor(){S(this,"projects",Cm)}getProjects(){return this.projects}getProjectById(e){return this.projects.find(t=>t.id===e)||null}getProjectByOrder(e){return this.projects[e]||null}getProjectLabel(e,t){const i=this.getProjectById(e);return i?i.title[t]:""}getFacet(e,t){const i=this.getProjectById(e);return i&&i.facets[Math.max(0,Math.min(t,i.facets.length-1))]||null}getProjectIndex(e){return this.projects.findIndex(t=>t.id===e)}getProjectCount(){return this.projects.length}getLocalizedProjects(e){return this.projects.map(t=>({id:t.id,title:t.title[e],project:t}))}}const j=(s,e)=>({fr:s,en:e}),Se=s=>s;function Do(){return{counts:{},ownedOrder:[],modifiers:Pl()}}function Pl(){return{glideFactor:0,landingTolerance:0,chargeRate:1,jumpPower:1,chargedLeapBonus:0,airControl:0,captureRadius:0,extraJumps:0,phaseJump:!1,phaseJumpRescueRadius:0,phaseJumpCooldown:20,teleportRange:0,teleportCooldown:30,warpRange:0,warpCooldown:24,rocketBurst:!1,rocketBurstCooldown:18,rocketBurstPower:0,airDashCharges:0,airDashPower:0,momentumRetention:0,infiniteFlaps:!1,momentumGain:0,momentumCap:1,shieldCharges:0,doubleCoin:!1,spikeOrbit:!1,coinMagnet:0,shopDiscount:0,speedBonus:0,coinBonus:0,luck:0,eventLuck:0,autoCannonLevel:0,enemyDamageBonus:0,timeSlowFactor:0,gravityInverter:!1,phantomLanding:!1,chaosWarp:!1,rareItemBias:0,extraCoinSlots:0,momentumRedirect:0}}const Lm={common:j("Common","Common"),uncommon:j("Uncommon","Uncommon"),rare:j("Rare","Rare"),epic:j("Epic","Epic"),legendary:j("Legendary","Legendary")},Cl=[Se({id:"overdrive_core",icon:"OVC",rarity:"common",category:"momentum",unlockScore:0,stackable:!0,maxStacks:5,effects:["momentum_gain"],name:j("Overdrive Core","Overdrive Core"),description:j("Augmente le gain de momentum.","Increase momentum gain.")}),Se({id:"gyro_stabilizer",icon:"GYR",rarity:"common",category:"momentum",unlockScore:0,stackable:!0,maxStacks:4,effects:["momentum_decay_down"],name:j("Gyro Stabilizer","Gyro Stabilizer"),description:j("Le momentum retombe moins vite.","Momentum decays more slowly.")}),Se({id:"hyper_boost",icon:"HPB",rarity:"uncommon",category:"momentum",unlockScore:0,stackable:!0,maxStacks:3,effects:["speed_bonus","jump_bonus"],name:j("Hyper Boost","Hyper Boost"),description:j("Chaque chaîne réussie pousse plus loin.","Successful chains grant extra speed and jump power.")}),Se({id:"kinetic_engine",icon:"KIN",rarity:"uncommon",category:"momentum",unlockScore:0,stackable:!0,maxStacks:3,effects:["landing_tolerance","momentum_gain"],name:j("Kinetic Engine","Kinetic Engine"),description:j("Préserve mieux l’élan à l’atterrissage.","Preserve more speed on landing.")}),Se({id:"momentum_capacitor",icon:"CAP",rarity:"rare",category:"momentum",unlockScore:0,stackable:!0,maxStacks:3,effects:["momentum_cap"],name:j("Momentum Capacitor","Momentum Capacitor"),description:j("Augmente la capacité maximale de momentum.","Increase the maximum momentum gauge.")}),Se({id:"chain_amplifier",icon:"CHN",rarity:"rare",category:"momentum",unlockScore:0,stackable:!0,maxStacks:3,effects:["momentum_gain","charge_rate"],name:j("Chain Amplifier","Chain Amplifier"),description:j("Les enchaînements remplissent plus fort la jauge.","Chains fill the gauge more efficiently.")}),Se({id:"velocity_loop",icon:"VLP",rarity:"common",category:"momentum",unlockScore:0,stackable:!0,maxStacks:4,effects:["speed_bonus"],name:j("Velocity Loop","Velocity Loop"),description:j("Augmente légèrement la vitesse globale.","Light permanent speed increase.")}),Se({id:"gravity_skimmer",icon:"GSK",rarity:"uncommon",category:"momentum",unlockScore:0,stackable:!0,maxStacks:3,effects:["glide","momentum_decay_down"],name:j("Gravity Skimmer","Gravity Skimmer"),description:j("Conserve mieux la vitesse après une trajectoire faible.","Retain more speed after awkward landings.")}),Se({id:"turbo_reactor",icon:"TRB",rarity:"rare",category:"momentum",unlockScore:0,stackable:!1,maxStacks:1,effects:["rocket_burst"],name:j("Turbo Reactor","Turbo Reactor"),description:j("Déclenche des poussées sur les gros sauts.","Trigger a burst on high-energy launches.")}),Se({id:"speed_matrix",icon:"SPD",rarity:"common",category:"momentum",unlockScore:0,stackable:!0,maxStacks:4,effects:["speed_bonus"],name:j("Speed Matrix","Speed Matrix"),description:j("Accélère légèrement le run.","Permanent +10% run speed feel.")}),Se({id:"double_jump_module",icon:"DJP",rarity:"uncommon",category:"mobility",unlockScore:0,stackable:!1,maxStacks:1,effects:["extra_jump"],name:j("Double Jump Module","Double Jump Module"),description:j("Ajoute un saut en l’air.","Add one extra jump.")}),Se({id:"triple_jump_module",icon:"TJP",rarity:"epic",category:"mobility",unlockScore:50,stackable:!1,maxStacks:1,effects:["extra_jump_2"],name:j("Triple Jump Module","Triple Jump Module"),description:j("Ajoute deux sauts en l’air.","Add two extra jumps.")}),Se({id:"air_dash_thrusters",icon:"ADS",rarity:"rare",category:"mobility",unlockScore:0,stackable:!1,maxStacks:1,effects:["air_dash"],name:j("Air Dash Thrusters","Air Dash Thrusters"),description:j("Permet un dash aérien court.","Add one short airborne dash.")}),Se({id:"glide_wings",icon:"GLD",rarity:"common",category:"mobility",unlockScore:0,stackable:!0,maxStacks:4,effects:["glide"],name:j("Glide Wings","Glide Wings"),description:j("Réduit la chute en vol.","Reduce fall speed while airborne.")}),Se({id:"long_glide_core",icon:"LGC",rarity:"uncommon",category:"mobility",unlockScore:0,stackable:!0,maxStacks:3,effects:["glide"],name:j("Long Glide Core","Long Glide Core"),description:j("Glide beaucoup plus longtemps.","Make gliding significantly stronger.")}),Se({id:"magnetic_orbit",icon:"MGO",rarity:"uncommon",category:"mobility",unlockScore:0,stackable:!0,maxStacks:4,effects:["capture_radius"],name:j("Magnetic Orbit","Magnetic Orbit"),description:j("La capture des shards est plus facile.","Increase shard capture radius.")}),Se({id:"momentum_redirector",icon:"MRD",rarity:"common",category:"mobility",unlockScore:0,stackable:!0,maxStacks:4,effects:["air_control"],name:j("Momentum Redirector","Momentum Redirector"),description:j("Permet de corriger plus vite les angles.","Improve air control and redirect sharper.")}),Se({id:"teleport_pulse",icon:"TLP",rarity:"rare",category:"mobility",unlockScore:0,stackable:!1,maxStacks:1,effects:["teleport"],name:j("Teleport Pulse","Teleport Pulse"),description:j("Téléporte plus loin sur un long cooldown.","Teleport forward every 30 seconds.")}),Se({id:"warp_blink",icon:"WRP",rarity:"rare",category:"mobility",unlockScore:0,stackable:!1,maxStacks:1,effects:["warp"],name:j("Warp Blink","Warp Blink"),description:j("Ajoute un blink de secours plus court.","Add a shorter emergency warp.")}),Se({id:"anti_gravity_boots",icon:"AGB",rarity:"uncommon",category:"mobility",unlockScore:0,stackable:!0,maxStacks:3,effects:["jump_bonus","glide"],name:j("Anti-Gravity Boots","Anti-Gravity Boots"),description:j("Allège les sauts et adoucit la chute.","Lighten jumps and soften falling.")}),Se({id:"auto_cannon",icon:"CAN",rarity:"rare",category:"combat",unlockScore:20,stackable:!1,maxStacks:1,effects:["auto_fire"],name:j("Auto Cannon","Auto Cannon"),description:j("Tire automatiquement sur les ennemis proches.","Auto-fire at nearby enemies.")}),Se({id:"laser_turret",icon:"LSR",rarity:"epic",category:"combat",unlockScore:50,stackable:!1,maxStacks:1,effects:["auto_fire_plus"],name:j("Laser Turret","Laser Turret"),description:j("Renforce fortement les tirs automatiques.","Stronger automatic shots.")}),Se({id:"shockwave_landing",icon:"SHK",rarity:"rare",category:"combat",unlockScore:20,stackable:!0,maxStacks:2,effects:["landing_burst"],name:j("Shockwave Landing","Shockwave Landing"),description:j("Un atterrissage rapide nettoie les ennemis proches.","Strong landings clear nearby enemies.")}),Se({id:"impact_burst",icon:"IMP",rarity:"rare",category:"combat",unlockScore:20,stackable:!0,maxStacks:2,effects:["impact_bonus"],name:j("Impact Burst","Impact Burst"),description:j("Les frappes rapides deviennent létales.","Fast impacts deal lethal damage.")}),Se({id:"drone_companion",icon:"DRN",rarity:"epic",category:"combat",unlockScore:50,stackable:!1,maxStacks:1,effects:["auto_fire"],name:j("Drone Companion","Drone Companion"),description:j("Un drone ajoute une pression offensive constante.","A drone adds constant offensive pressure.")}),Se({id:"plasma_trail",icon:"PLS",rarity:"rare",category:"combat",unlockScore:20,stackable:!1,maxStacks:1,effects:["trail_damage"],name:j("Plasma Trail","Plasma Trail"),description:j("La traînée du joueur devient offensive.","Your trail damages enemies behind you.")}),Se({id:"spike_orbit",icon:"SPK",rarity:"uncommon",category:"combat",unlockScore:20,stackable:!1,maxStacks:1,effects:["orbit_damage"],name:j("Spike Orbit","Spike Orbit"),description:j("Tourner sur une shard devient dangereux pour les ennemis.","Orbiting around shards damages enemies on contact.")}),Se({id:"pulse_shield",icon:"SHD",rarity:"rare",category:"combat",unlockScore:20,stackable:!0,maxStacks:2,effects:["shield"],name:j("Pulse Shield","Pulse Shield"),description:j("Bloque un impact mortel.","Blocks one lethal collision.")}),Se({id:"emp_pulse",icon:"EMP",rarity:"epic",category:"combat",unlockScore:50,stackable:!1,maxStacks:1,effects:["emp"],name:j("EMP Pulse","EMP Pulse"),description:j("Neutralise brièvement les menaces proches.","Temporarily disable nearby enemies.")}),Se({id:"target_lock",icon:"TLK",rarity:"uncommon",category:"combat",unlockScore:20,stackable:!1,maxStacks:1,effects:["auto_fire_accuracy"],name:j("Target Lock","Target Lock"),description:j("Les tirs automatiques ratent moins.","Improve auto-fire accuracy.")}),Se({id:"coin_magnet",icon:"CNM",rarity:"common",category:"economy",unlockScore:0,stackable:!0,maxStacks:4,effects:["coin_magnet"],name:j("Coin Magnet","Coin Magnet"),description:j("Attire les pièces plus tôt sur l’orbite.","Pull coins toward the player sooner.")}),Se({id:"double_coin",icon:"DBL",rarity:"rare",category:"economy",unlockScore:0,stackable:!1,maxStacks:1,effects:["double_coin"],name:j("Double Coin","Double Coin"),description:j("Double les pièces gagnées.","Double all coin rewards.")}),Se({id:"lucky_shard",icon:"LCK",rarity:"uncommon",category:"economy",unlockScore:0,stackable:!0,maxStacks:3,effects:["luck"],name:j("Lucky Shard","Lucky Shard"),description:j("Augmente légèrement la richesse des runs.","Increase general loot luck.")}),Se({id:"treasure_scanner",icon:"TRS",rarity:"uncommon",category:"economy",unlockScore:0,stackable:!0,maxStacks:3,effects:["event_luck"],name:j("Treasure Scanner","Treasure Scanner"),description:j("Augmente la fréquence des événements utiles.","Increase valuable event odds.")}),Se({id:"market_discount",icon:"MKT",rarity:"uncommon",category:"economy",unlockScore:0,stackable:!0,maxStacks:3,effects:["shop_discount"],name:j("Market Discount","Market Discount"),description:j("Réduit les prix du shop.","Lower shop prices.")}),Se({id:"loot_booster",icon:"LBT",rarity:"rare",category:"economy",unlockScore:0,stackable:!0,maxStacks:3,effects:["coin_bonus"],name:j("Loot Booster","Loot Booster"),description:j("Chaque gain donne plus de ressources.","Increase resource payouts.")}),Se({id:"golden_orbit",icon:"GLD",rarity:"rare",category:"economy",unlockScore:0,stackable:!0,maxStacks:2,effects:["extra_coin_slots"],name:j("Golden Orbit","Golden Orbit"),description:j("Ajoute plus de pièces sur les trajectoires.","Spawn more coins on orbit paths.")}),Se({id:"jackpot_engine",icon:"JPT",rarity:"epic",category:"economy",unlockScore:50,stackable:!1,maxStacks:1,effects:["coin_bonus","luck"],name:j("Jackpot Engine","Jackpot Engine"),description:j("Les gains rares deviennent plus lucratifs.","Rare drops pay out harder.")}),Se({id:"rare_item_finder",icon:"RRF",rarity:"epic",category:"economy",unlockScore:50,stackable:!0,maxStacks:2,effects:["rare_item_bias"],name:j("Rare Item Finder","Rare Item Finder"),description:j("Pousse les offres vers de meilleures raretés.","Bias future offers toward higher rarity.")}),Se({id:"coin_storm",icon:"CST",rarity:"legendary",category:"economy",unlockScore:100,stackable:!1,maxStacks:1,effects:["coin_bonus","extra_coin_slots"],name:j("Coin Storm","Coin Storm"),description:j("Déverse une pluie de pièces dans le run.","Flood the run with extra coin value.")}),Se({id:"chaos_warp",icon:"CHW",rarity:"rare",category:"utility",unlockScore:50,stackable:!1,maxStacks:1,effects:["chaos_warp"],name:j("Chaos Warp","Chaos Warp"),description:j("Ajoute un warp imprévisible mais salvateur.","Add a risky emergency warp.")}),Se({id:"shard_splitter",icon:"SPL",rarity:"uncommon",category:"utility",unlockScore:50,stackable:!0,maxStacks:2,effects:["extra_coin_slots","event_luck"],name:j("Shard Splitter","Shard Splitter"),description:j("Multiplie les possibilités sur certaines sections.","Occasionally create richer shard sections.")}),Se({id:"phase_walk",icon:"PHS",rarity:"rare",category:"utility",unlockScore:50,stackable:!1,maxStacks:1,effects:["phase_jump"],name:j("Phase Walk","Phase Walk"),description:j("Permet de sauver une capture ratée.","Pass through one missed landing on cooldown.")}),Se({id:"time_slow_field",icon:"TSF",rarity:"epic",category:"utility",unlockScore:50,stackable:!1,maxStacks:1,effects:["time_slow"],name:j("Time Slow Field","Time Slow Field"),description:j("Ralentit légèrement la pression globale.","Slightly slow the world around you.")}),Se({id:"mirror_momentum",icon:"MMR",rarity:"rare",category:"utility",unlockScore:50,stackable:!0,maxStacks:2,effects:["momentum_gain","momentum_cap"],name:j("Mirror Momentum","Mirror Momentum"),description:j("Amplifie la jauge quand le flow est propre.","Amplify gauge growth during clean flow.")}),Se({id:"overclock_core",icon:"OCK",rarity:"epic",category:"utility",unlockScore:50,stackable:!1,maxStacks:1,effects:["charge_rate","speed_bonus"],name:j("Overclock Core","Overclock Core"),description:j("Charge plus vite et accélère tout le run.","Charge faster and push the whole run faster.")}),Se({id:"gravity_inverter",icon:"GIV",rarity:"legendary",category:"utility",unlockScore:100,stackable:!1,maxStacks:1,effects:["gravity_invert"],name:j("Gravity Inverter","Gravity Inverter"),description:j("Inverse certains comportements de chute en votre faveur.","Invert some falling pressure in your favor.")}),Se({id:"phantom_landing",icon:"PHN",rarity:"rare",category:"utility",unlockScore:50,stackable:!0,maxStacks:2,effects:["phase_jump","landing_tolerance"],name:j("Phantom Landing","Phantom Landing"),description:j("Ajoute une fenêtre fantôme de rattrapage.","Create a ghost landing rescue window.")}),Se({id:"energy_shield",icon:"ENG",rarity:"epic",category:"utility",unlockScore:50,stackable:!0,maxStacks:2,effects:["shield"],name:j("Energy Shield","Energy Shield"),description:j("Ajoute plusieurs charges de protection.","Grant multiple protection charges.")}),Se({id:"orbital_wings",icon:"WNG",rarity:"legendary",category:"utility",unlockScore:100,stackable:!1,maxStacks:1,effects:["infinite_flap","glide"],name:j("Orbital Wings","Orbital Wings"),description:j("Le vol devient presque libre.","Almost remove airborne limitations.")})],us={common:56,uncommon:28,rare:11,epic:4,legendary:1};function Dm(s){return s<50?["common","uncommon","rare"]:s<100?["common","uncommon","rare","epic"]:["common","uncommon","rare","epic","legendary"]}function Im(s){return s<100?100:s<500?500:s<1e3?1e3:Math.floor(s/1e3)*1e3+1e3}function Io(s,e){const t=Im(s);return e>=t?t:null}function gs(s,e,t=Math.random){const i=new Set(Dm(s)),n=Cl.filter(o=>{if(!i.has(o.rarity)||s<o.unlockScore)return!1;const l=e.counts[o.id]??0;return!(!o.stackable&&l>0||o.stackable&&l>=o.maxStacks)}),r=[],a=new Set;for(;r.length<3&&a.size<n.length;){const o=Um(n,t,a,e.modifiers.rareItemBias);if(!o)break;a.add(o.id),r.push({item:o,stackCount:e.counts[o.id]??0})}return r}function Um(s,e,t,i){const n=s.filter(o=>!t.has(o.id));if(n.length===0)return null;const r=n.reduce((o,l)=>o+Uo(l.rarity,i),0);let a=e()*r;for(const o of n)if(a-=Uo(o.rarity,i),a<=0)return o;return n[n.length-1]??null}function Uo(s,e){const t=Math.max(0,e);return s==="legendary"?us[s]*(1+t*4):s==="epic"?us[s]*(1+t*2.5):s==="rare"?us[s]*(1+t):us[s]}function Nm(s,e){const t={...s.counts,[e]:(s.counts[e]??0)+1},i=s.ownedOrder.includes(e)?s.ownedOrder:[...s.ownedOrder,e],n={counts:t,ownedOrder:i,modifiers:Pl()};for(const r of Cl){const a=t[r.id]??0;if(!(a<=0))switch(r.id){case"overdrive_core":n.modifiers.momentumGain+=.1*a;break;case"gyro_stabilizer":n.modifiers.momentumRetention+=.08*a;break;case"hyper_boost":n.modifiers.speedBonus+=.08*a,n.modifiers.jumpPower+=.06*a;break;case"kinetic_engine":n.modifiers.landingTolerance+=.12*a,n.modifiers.momentumGain+=.05*a;break;case"momentum_capacitor":n.modifiers.momentumCap+=.08*a;break;case"chain_amplifier":n.modifiers.momentumGain+=.06*a,n.modifiers.chargeRate+=.08*a;break;case"velocity_loop":n.modifiers.speedBonus+=.05*a;break;case"gravity_skimmer":n.modifiers.glideFactor+=.16*a,n.modifiers.momentumRetention+=.04*a;break;case"turbo_reactor":n.modifiers.rocketBurst=!0,n.modifiers.rocketBurstPower=5.4,n.modifiers.rocketBurstCooldown=16;break;case"speed_matrix":n.modifiers.speedBonus+=.1*a;break;case"double_jump_module":n.modifiers.extraJumps=Math.max(n.modifiers.extraJumps,1);break;case"triple_jump_module":n.modifiers.extraJumps=Math.max(n.modifiers.extraJumps,2);break;case"air_dash_thrusters":n.modifiers.airDashCharges=Math.max(n.modifiers.airDashCharges,1),n.modifiers.airDashPower=4.8;break;case"glide_wings":n.modifiers.glideFactor+=.2*a;break;case"long_glide_core":n.modifiers.glideFactor+=.34*a;break;case"magnetic_orbit":n.modifiers.captureRadius+=.12*a;break;case"momentum_redirector":n.modifiers.airControl+=.12*a,n.modifiers.momentumRedirect+=.1*a;break;case"teleport_pulse":n.modifiers.teleportRange=10,n.modifiers.teleportCooldown=30;break;case"warp_blink":n.modifiers.warpRange=6,n.modifiers.warpCooldown=20;break;case"anti_gravity_boots":n.modifiers.glideFactor+=.12*a,n.modifiers.jumpPower+=.05*a;break;case"auto_cannon":n.modifiers.autoCannonLevel=Math.max(n.modifiers.autoCannonLevel,1);break;case"laser_turret":n.modifiers.autoCannonLevel=Math.max(n.modifiers.autoCannonLevel,2),n.modifiers.enemyDamageBonus+=1;break;case"shockwave_landing":n.modifiers.enemyDamageBonus+=.5*a;break;case"impact_burst":n.modifiers.enemyDamageBonus+=.6*a;break;case"drone_companion":n.modifiers.autoCannonLevel=Math.max(n.modifiers.autoCannonLevel,1),n.modifiers.enemyDamageBonus+=.4;break;case"plasma_trail":n.modifiers.enemyDamageBonus+=.35;break;case"spike_orbit":n.modifiers.spikeOrbit=!0;break;case"pulse_shield":n.modifiers.shieldCharges+=1;break;case"emp_pulse":n.modifiers.enemyDamageBonus+=.8;break;case"target_lock":n.modifiers.autoCannonLevel=Math.max(n.modifiers.autoCannonLevel,1);break;case"coin_magnet":n.modifiers.coinMagnet+=.18*a;break;case"double_coin":n.modifiers.doubleCoin=!0;break;case"lucky_shard":n.modifiers.luck+=.1*a;break;case"treasure_scanner":n.modifiers.eventLuck+=.1*a;break;case"market_discount":n.modifiers.shopDiscount+=.12*a;break;case"loot_booster":n.modifiers.coinBonus+=.15*a;break;case"golden_orbit":n.modifiers.extraCoinSlots+=a;break;case"jackpot_engine":n.modifiers.coinBonus+=.28,n.modifiers.luck+=.12;break;case"rare_item_finder":n.modifiers.rareItemBias+=.12*a;break;case"coin_storm":n.modifiers.coinBonus+=.35,n.modifiers.extraCoinSlots+=2;break;case"chaos_warp":n.modifiers.chaosWarp=!0,n.modifiers.warpRange=Math.max(n.modifiers.warpRange,12);break;case"shard_splitter":n.modifiers.extraCoinSlots+=a,n.modifiers.eventLuck+=.06*a;break;case"phase_walk":n.modifiers.phaseJump=!0,n.modifiers.phaseJumpRescueRadius=2.8,n.modifiers.phaseJumpCooldown=18;break;case"time_slow_field":n.modifiers.timeSlowFactor+=.12;break;case"mirror_momentum":n.modifiers.momentumGain+=.12*a,n.modifiers.momentumCap+=.06*a;break;case"overclock_core":n.modifiers.chargeRate+=.28,n.modifiers.speedBonus+=.12;break;case"gravity_inverter":n.modifiers.gravityInverter=!0,n.modifiers.glideFactor+=.2;break;case"phantom_landing":n.modifiers.phaseJump=!0,n.modifiers.phaseJumpRescueRadius=2.2,n.modifiers.landingTolerance+=.14*a,n.modifiers.phantomLanding=!0;break;case"energy_shield":n.modifiers.shieldCharges+=2*a;break;case"orbital_wings":n.modifiers.infiniteFlaps=!0,n.modifiers.glideFactor+=.8;break}}return n.modifiers.glideFactor=Math.min(1.9,n.modifiers.glideFactor),n.modifiers.captureRadius=Math.min(1.25,n.modifiers.captureRadius),n.modifiers.airControl=Math.min(.85,n.modifiers.airControl),n.modifiers.jumpPower=Math.min(1.9,n.modifiers.jumpPower),n.modifiers.chargeRate=Math.min(2.4,n.modifiers.chargeRate),n.modifiers.chargedLeapBonus=Math.min(.8,n.modifiers.chargedLeapBonus),n.modifiers.momentumRetention=Math.min(.72,n.modifiers.momentumRetention),n.modifiers.momentumGain=Math.min(1.2,n.modifiers.momentumGain),n.modifiers.momentumCap=Math.min(1.8,n.modifiers.momentumCap),n.modifiers.coinMagnet=Math.min(.9,n.modifiers.coinMagnet),n.modifiers.shopDiscount=Math.min(.45,n.modifiers.shopDiscount),n.modifiers.speedBonus=Math.min(.9,n.modifiers.speedBonus),n.modifiers.coinBonus=Math.min(1.2,n.modifiers.coinBonus),n.modifiers.luck=Math.min(.8,n.modifiers.luck),n.modifiers.eventLuck=Math.min(.6,n.modifiers.eventLuck),n.modifiers.timeSlowFactor=Math.min(.35,n.modifiers.timeSlowFactor),n.modifiers.rareItemBias=Math.min(.5,n.modifiers.rareItemBias),n}class Fm{constructor(e,t,i){S(this,"element");S(this,"panel");S(this,"scoreLabel");S(this,"highscoreLabel");S(this,"chargeLabel");S(this,"chainLabel");S(this,"distanceLabel");S(this,"coinsLabel");S(this,"scoreValue");S(this,"highscoreValue");S(this,"chainValue");S(this,"distanceValue");S(this,"coinsValue");S(this,"chargeFill");S(this,"orbitGraceIndicator");S(this,"statusValue");S(this,"metaValue");S(this,"exitButton");S(this,"branchLayer");S(this,"branchTitle");S(this,"branchHint");S(this,"branchCards");S(this,"toast");S(this,"toastLabel");S(this,"toastName");S(this,"gameOverOverlay");S(this,"gameOverTitle");S(this,"gameOverBody");S(this,"restartButton");S(this,"returnButton");this.i18n=t,this.element=document.createElement("div"),this.element.className="game-hud",this.element.innerHTML=`
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
      `})}renderMeta(e){const t=[100,500,1e3].map(i=>{const n=e.splitTimes[i];return n===void 0?null:`${i}: ${n.toFixed(1)}s`}).filter(Boolean).join(" • ");return t?`${this.i18n.t("gameSplits")}: ${t}`:`${this.i18n.t("gameBestDistance")}: ${Math.round(e.bestDistanceMeters)}m`}getRarityLabel(e){return Lm[e][this.i18n.current]}}function qe(s,e,t){return Math.min(t,Math.max(e,s))}function fe(s,e,t,i){return s+(e-s)*(1-Math.exp(-t*i))}function No(s,e){const t=s.x-e.x,i=s.y-e.y,n=s.z-e.z;return Math.sqrt(t*t+i*i+n*n)}function _s(s,e){return(s%e+e)%e}function Nt(s){const e=qe(s/200,0,1),t=s<50?"easy":s<100?"medium":s<160?"hard":"expert";return{normalized:e,band:t,spacing:8.9+e*7.8,movementAmplitude:.08+e*1.05,movementSpeed:.22+e*.88,cameraSpeed:1.45+e*2.85,cameraCatchupSpeed:2.6+e*2.2,maxJumpDistance:17.8+e*9.2,maxVerticalDelta:5.2+e*3.8,safeZoneDistance:8.6+e*1.8,cameraLookAhead:8.6+e*5.2,baseZoom:22.4,largeShardZoom:6.4,milestoneZoom:18,momentumZoomRange:21.5,enemyUnlocked:s>=20,ovalUnlocked:s>=50,triangularUnlocked:s>=100,roundMovementUnlocked:s>=5,eventChance:s<12?0:s<60?.08:s<120?.14:.18,movingShardChance:s<5?0:s<50?.12:s<100?.2:.3}}const An=class An{constructor(){S(this,"position",new C);S(this,"lookAt",new C);S(this,"currentFocus",new xe);S(this,"targetFocus",new xe);S(this,"currentZoom",18.8);S(this,"targetZoom",18.8);S(this,"railX",-12);S(this,"safeLeft",-1/0);S(this,"safeRight",1/0);S(this,"safeTop",1/0);S(this,"safeBottom",-1/0);S(this,"fov",42)}reset(e){this.railX=e.resolvedX-4.4,this.currentFocus.set(e.resolvedX+4.2,e.resolvedY),this.targetFocus.copy(this.currentFocus),this.currentZoom=18.8,this.targetZoom=18.8,this.position.set(this.currentFocus.x-An.CAMERA_CENTER_OFFSET,e.resolvedY+.18,this.currentZoom),this.lookAt.set(this.currentFocus.x,e.resolvedY,0),this.safeLeft=-1/0,this.safeRight=1/0,this.safeTop=1/0,this.safeBottom=-1/0}update(e){const{deltaTime:t,state:i,score:n,currentNode:r,nextNode:a,playerPosition:o,momentumGauge:l,largeShardFactor:c,milestoneZoom:h,choiceZoom:u,bossZoom:f,speedPressure:p}=e,g=Nt(n);(i==="running_attached"||i==="running_charging"||i==="running_airborne")&&(this.railX+=g.cameraSpeed*p*t),this.railX=Math.max(this.railX,o.x-g.cameraLookAhead);const m=this.railX+g.cameraLookAhead,d=r.resolvedY*.64+a.resolvedY*.36,b=Math.pow(l,.85),v=Qt.lerp(0,d,.28+b*.72);this.targetFocus.set(m,v);const T=o.x>=this.currentFocus.x-.08?Math.max(12,g.cameraCatchupSpeed*4.2):Math.max(4.4,g.cameraCatchupSpeed*1.25),R=fe(this.currentFocus.x,this.targetFocus.x,T,t);this.currentFocus.x=Math.max(this.currentFocus.x,o.x-.08,R),this.currentFocus.y=fe(this.currentFocus.y,this.targetFocus.y,1.75+b*1.35,t);const w=g.momentumZoomRange*Math.pow(l,.82);this.targetZoom=g.baseZoom+w+g.largeShardZoom*c+h+u+f,this.currentZoom=fe(this.currentZoom,this.targetZoom,i==="upgrade_branching"?1.9:2.6,t),this.position.set(this.currentFocus.x-An.CAMERA_CENTER_OFFSET,this.currentFocus.y+.18,this.currentZoom),this.lookAt.set(this.currentFocus.x,this.currentFocus.y,0);const P=Math.max(.5,window.innerWidth/Math.max(1,window.innerHeight)),U=Math.tan(Qt.degToRad(this.fov*.5))*this.currentZoom,x=U*P;this.safeLeft=this.lookAt.x-x*.94,this.safeRight=this.lookAt.x+x*.94,this.safeTop=this.lookAt.y+U*.94,this.safeBottom=this.lookAt.y-U*.94}isBehindSafeLine(e){return e.x<this.safeLeft}isOutsideVerticalBounds(e,t=.02){const n=(this.safeTop-this.safeBottom)*t;return e.y<=this.safeBottom+n||e.y>=this.safeTop-n}getPose(){return{position:this.position.clone(),lookAt:this.lookAt.clone()}}getZoom(){return this.currentZoom}getSafeLeft(){return this.safeLeft}getSafeRight(){return this.safeRight}};S(An,"CAMERA_CENTER_OFFSET",1.6);let Cr=An;const Fo="#D9624E";class Om{constructor(e,t){S(this,"group",new Ot);S(this,"pool",[]);const i=new Me(Fo);for(let n=0;n<36;n+=1){const r=new gt(new Hr(.22,.08,8,18),new ti({color:i,transparent:!0,opacity:.96}));r.visible=!1,this.pool.push(r),this.group.add(r)}this.group.visible=!1,e.add(this.group),this.setTheme(t)}setTheme(e){const t=e==="dark"?new Me(Fo):new Me("#8B3E34");this.pool.forEach(i=>i.material.color.copy(t))}setVisible(e){this.group.visible=e}reset(){this.pool.forEach(e=>{e.visible=!1})}update(e,t){this.pool.forEach((i,n)=>{const r=e[n];if(!r||!r.visible){i.visible=!1;return}i.visible=!0,i.position.copy(r.position),i.rotation.x=Math.PI*.5,i.rotation.y=t*1.8+n*.24,i.scale.setScalar(r.scale*(1+Math.sin(t*4+n)*.08))})}}function Oo(s,e){return e==="invincible"?new Me("#F06A5A"):e==="elite"?new Me(s==="dark"?"#E18C70":"#A14D38"):e==="armored"?new Me(s==="dark"?"#C9775B":"#8E4130"):new Me(s==="dark"?"#D4BF9B":"#393F4A")}class km{constructor(e,t){S(this,"group",new Ot);S(this,"pool",[]);S(this,"theme");this.theme=t;for(let i=0;i<18;i+=1){const n=new gt(new Ds(.38,0),new ti({color:Oo(t,"light"),transparent:!0,opacity:.95}));n.visible=!1,this.pool.push(n),this.group.add(n)}this.group.visible=!1,e.add(this.group)}setTheme(e){this.theme=e}setVisible(e){this.group.visible=e}reset(){this.pool.forEach(e=>{e.visible=!1})}update(e,t){this.pool.forEach((i,n)=>{const r=e[n];if(!r||!r.visible){i.visible=!1;return}i.visible=!0,i.material.color.copy(Oo(this.theme,r.tier)),i.position.copy(r.position),i.rotation.y=t*.8+n*.18;const a=r.tier==="elite"?1.16:r.tier==="armored"?1.04:r.tier==="invincible"?1.24:.92;i.scale.setScalar(a)})}}const ko=["shop","treasure","gift","mini_boss","rare_item"];class Bm{constructor(){S(this,"queuedEvents",new Map);S(this,"bossConsumed",!1)}reset(){this.queuedEvents.clear(),this.bossConsumed=!1}schedulePostMilestoneEvents(e,t,i){const n=Nt(t),r=i()<n.eventChance?i()<.42?2:1:0;for(let a=0;a<r;a+=1){const o=e+10+Math.floor(i()*11)+a*3;if(this.queuedEvents.has(o))continue;const l=ko[Math.floor(i()*ko.length)]??"gift";this.queuedEvents.set(o,l)}}consumePlannedEvent(e,t){if(!this.bossConsumed&&t>=150&&e>=150)return this.bossConsumed=!0,"boss";const i=this.queuedEvents.get(e);return i?(this.queuedEvents.delete(e),i):"none"}}const zm=["shop","treasure","gift","mini_boss","rare_item"],$t=["round"],Zt=["round","oval"],Jt=["round","oval","triangular"];function je(s,e,t,i,n,r,a){return{id:s,difficulty:e,verticality:t,movementType:i,allowedShardSizes:n,allowedShapeKinds:r,eventCompatibility:zm,nodes:a}}const Bo=[je("easy_01","easy","low","static",["tiny","very_small","small","medium_small"],$t,[{x:10,y:1,coinAngles:[Math.PI*.5]},{x:21,y:-1},{x:33,y:2,enemyPole:"north"},{x:46,y:0,coinAngles:[Math.PI*1.35]}]),je("easy_02","easy","medium","static",["tiny","small","medium_small","medium"],$t,[{x:9,y:3},{x:20,y:5,coinAngles:[Math.PI*.25]},{x:33,y:2},{x:47,y:-1,enemyPole:"south"}]),je("easy_03","easy","medium","moving",["very_small","small","medium_small"],$t,[{x:11,y:-3,motionPattern:"vertical"},{x:22,y:1},{x:34,y:4,coinAngles:[Math.PI*.75]},{x:47,y:2,motionPattern:"horizontal"}]),je("easy_04","easy","low","moving",["tiny","very_small","small"],$t,[{x:8,y:2},{x:18,y:-1,motionPattern:"drift"},{x:30,y:0},{x:43,y:3,coinAngles:[Math.PI*1.75]}]),je("easy_05","easy","high","static",["small","medium_small","medium"],$t,[{x:10,y:5},{x:20,y:8},{x:31,y:4,enemyPole:"north"},{x:44,y:1}]),je("easy_06","easy","high","moving",["very_small","small","medium_small"],$t,[{x:10,y:-4,motionPattern:"vertical"},{x:21,y:-7,coinAngles:[Math.PI*.9]},{x:33,y:-3,motionPattern:"micro_orbit"},{x:45,y:1}]),je("easy_07","easy","medium","static",["small","medium_small","medium"],$t,[{x:11,y:1},{x:23,y:6},{x:36,y:5},{x:50,y:0,coinAngles:[Math.PI*.4],enemyPole:"south"}]),je("easy_08","easy","medium","moving",["tiny","very_small","small","medium_small"],$t,[{x:9,y:-2,motionPattern:"horizontal"},{x:19,y:1},{x:31,y:-3,coinAngles:[Math.PI*1.1]},{x:43,y:2,motionPattern:"vertical"}]),je("easy_09","easy","low","static",["small","medium_small","medium"],$t,[{x:12,y:0},{x:25,y:2},{x:39,y:-2,enemyPole:"north"},{x:54,y:1}]),je("easy_10","easy","medium","moving",["tiny","very_small","small"],$t,[{x:10,y:4,motionPattern:"vertical"},{x:21,y:1},{x:33,y:-2,coinAngles:[Math.PI*.6]},{x:46,y:-5,motionPattern:"drift"}]),je("medium_01","medium","medium","moving",["small","medium_small","medium","medium_large"],Zt,[{x:12,y:5,motionPattern:"vertical"},{x:25,y:2,sizeTier:"medium"},{x:39,y:8,coinAngles:[Math.PI*.2],enemyPole:"north"},{x:54,y:4,motionPattern:"horizontal"},{x:69,y:1}]),je("medium_02","medium","high","moving",["small","medium_small","medium","medium_large"],Zt,[{x:13,y:-6},{x:27,y:-2,motionPattern:"drift"},{x:40,y:4,sizeTier:"medium_large"},{x:55,y:8,coinAngles:[Math.PI*1.5]},{x:71,y:3,enemyPole:"south"}]),je("medium_03","medium","medium","static",["very_small","small","medium_small","medium"],Zt,[{x:11,y:3,sizeTier:"small"},{x:23,y:-1,sizeTier:"medium_small"},{x:36,y:5,sizeTier:"very_large",coinAngles:[Math.PI*.95]},{x:52,y:1,sizeTier:"small"}]),je("medium_04","medium","high","moving",["very_small","small","medium_small","medium_large"],Zt,[{x:12,y:7,motionPattern:"vertical"},{x:26,y:2},{x:40,y:-4,motionPattern:"micro_orbit"},{x:54,y:-8,enemyPole:"north"},{x:70,y:-2,coinAngles:[Math.PI*.4]}]),je("medium_05","medium","medium","moving",["small","medium_small","medium","large"],Zt,[{x:12,y:1},{x:24,y:6,motionPattern:"horizontal"},{x:39,y:1,sizeTier:"large"},{x:55,y:-3,coinAngles:[Math.PI*1.2]},{x:71,y:2}]),je("medium_06","medium","high","moving",["tiny","small","medium_small","medium"],Zt,[{x:10,y:-5,sizeTier:"tiny"},{x:22,y:3,motionPattern:"drift"},{x:36,y:9,sizeTier:"medium_large",coinAngles:[Math.PI*.1]},{x:52,y:5},{x:68,y:-1,enemyPole:"south"}]),je("medium_07","medium","medium","static",["small","medium_small","medium","medium_large"],Zt,[{x:13,y:-2},{x:28,y:4,sizeTier:"medium_large"},{x:43,y:7,sizeTier:"medium"},{x:58,y:1,coinAngles:[Math.PI*.65]},{x:74,y:-2}]),je("medium_08","medium","high","moving",["small","medium_small","medium","large"],Zt,[{x:12,y:6,motionPattern:"vertical"},{x:26,y:-2},{x:40,y:-8,motionPattern:"horizontal"},{x:56,y:-3,sizeTier:"large",enemyPole:"north"},{x:72,y:4,coinAngles:[Math.PI*1.4]}]),je("medium_09","medium","medium","moving",["very_small","small","medium_small","medium"],Zt,[{x:11,y:2,sizeTier:"very_small"},{x:24,y:8,motionPattern:"drift"},{x:40,y:4},{x:56,y:-1,enemyPole:"south"},{x:72,y:3,coinAngles:[Math.PI*.5]}]),je("medium_10","medium","high","moving",["small","medium_small","medium","very_large"],Zt,[{x:12,y:-7,motionPattern:"vertical"},{x:27,y:-1,sizeTier:"small"},{x:42,y:6,sizeTier:"very_large"},{x:58,y:9,coinAngles:[Math.PI*.3],enemyPole:"north"},{x:76,y:2}]),je("hard_01","hard","high","moving",["small","medium_small","medium","large","very_large"],Jt,[{x:14,y:7,motionPattern:"vertical"},{x:31,y:0,sizeTier:"large"},{x:48,y:-8,motionPattern:"micro_orbit",enemyPole:"north"},{x:66,y:-1,coinAngles:[Math.PI*1.5]},{x:86,y:6,sizeTier:"very_large"}]),je("hard_02","hard","high","moving",["tiny","small","medium_small","medium","large"],Jt,[{x:13,y:-8,sizeTier:"tiny"},{x:30,y:-2,motionPattern:"drift"},{x:47,y:6,sizeTier:"medium_large"},{x:66,y:10,coinAngles:[Math.PI*.95]},{x:86,y:1,enemyPole:"south"}]),je("hard_03","hard","medium","moving",["small","medium_small","medium","large","very_large"],Jt,[{x:15,y:2,sizeTier:"very_large"},{x:33,y:7,motionPattern:"horizontal"},{x:51,y:1,sizeTier:"small"},{x:70,y:-6,motionPattern:"vertical"},{x:91,y:0,coinAngles:[Math.PI*.2],enemyPole:"north"}]),je("hard_04","hard","high","moving",["tiny","small","medium_small","large"],Jt,[{x:14,y:9,sizeTier:"tiny"},{x:31,y:2},{x:49,y:-7,motionPattern:"horizontal"},{x:68,y:-10,sizeTier:"large",coinAngles:[Math.PI*1.1]},{x:90,y:-1,enemyPole:"south"}]),je("hard_05","hard","high","moving",["small","medium_small","medium","medium_large","huge"],Jt,[{x:15,y:-3},{x:32,y:8,sizeTier:"huge"},{x:50,y:2,motionPattern:"micro_orbit"},{x:70,y:-9,sizeTier:"small",enemyPole:"north"},{x:92,y:-4,coinAngles:[Math.PI*.55]}]),je("hard_06","hard","medium","moving",["tiny","small","medium_small","medium","large"],Jt,[{x:14,y:5,sizeTier:"small"},{x:31,y:-4,motionPattern:"vertical"},{x:49,y:5,sizeTier:"tiny"},{x:69,y:11,motionPattern:"drift",enemyPole:"south"},{x:91,y:4,coinAngles:[Math.PI*.25]}]),je("expert_01","expert","high","moving",["tiny","small","medium_small","large","very_large"],Jt,[{x:16,y:10,sizeTier:"tiny",motionPattern:"vertical"},{x:36,y:1,sizeTier:"large"},{x:57,y:-10,motionPattern:"micro_orbit",enemyPole:"north"},{x:79,y:0,sizeTier:"very_large"},{x:103,y:9,coinAngles:[Math.PI*1.65]}]),je("expert_02","expert","high","moving",["tiny","small","medium_small","medium","huge"],Jt,[{x:17,y:-11,sizeTier:"tiny"},{x:37,y:-2,motionPattern:"drift"},{x:59,y:9,sizeTier:"huge"},{x:82,y:12,motionPattern:"horizontal",enemyPole:"south"},{x:107,y:1,coinAngles:[Math.PI*.15]}]),je("expert_03","expert","medium","moving",["small","medium_small","medium","large","massive"],Jt,[{x:16,y:2,sizeTier:"massive"},{x:38,y:10,motionPattern:"vertical"},{x:61,y:0,sizeTier:"small"},{x:85,y:-10,motionPattern:"drift",enemyPole:"north"},{x:111,y:-1,coinAngles:[Math.PI*1.1]}]),je("expert_04","expert","high","moving",["tiny","small","medium","large","very_large"],Jt,[{x:15,y:8,motionPattern:"horizontal"},{x:35,y:-7,sizeTier:"tiny"},{x:57,y:11,sizeTier:"large"},{x:81,y:-9,motionPattern:"micro_orbit",enemyPole:"south"},{x:108,y:3,coinAngles:[Math.PI*.35]}])],Gm={easy:{easy:70,medium:30,hard:0,expert:0},medium:{easy:40,medium:40,hard:20,expert:0},hard:{easy:0,medium:20,hard:60,expert:20},expert:{easy:0,medium:10,hard:55,expert:35}};function Hm(s,e,t){const i=Nt(s),n=Gm[i.band],r=new Set(t.slice(-3)),a=Bo.filter(h=>!r.has(h.id)&&n[h.difficulty]>0),o=a.length>0?a:Bo.filter(h=>n[h.difficulty]>0),l=o.reduce((h,u)=>h+n[u.difficulty],0);let c=e()*l;for(const h of o)if(c-=n[h.difficulty],c<=0)return h;return o[o.length-1]}function mr(s,e){if(s.length===0)return!1;const t=e.slice(Math.max(0,e.length-8));let i=e[e.length-1]??null;for(const n of s){const r=Nt(n.index);if(i){const a=n.x-i.x,o=n.y-i.y,l=Math.hypot(a,o),c=ds(i)+ds(n),h=Vm(i,n,a,o,c,r.maxVerticalDelta);if(l<c||l>r.maxJumpDistance||!h&&Math.abs(o)>r.maxVerticalDelta||!h&&n.x<i.x+Math.max(2.8,n.gameplayRadius*.75))return!1}for(const a of t)if(Math.hypot(n.x-a.x,n.y-a.y)<ds(n)+ds(a)||Math.abs(n.x-a.x)<Math.max(1.25,(n.gameplayRadius+a.gameplayRadius)*.42)&&Math.abs(n.y-a.y)<Math.max(1.7,(n.gameplayRadius+a.gameplayRadius)*.54))return!1;if(Math.abs(n.y)>28)return!1;t.push(n),t.length>8&&t.shift(),i=n}return!0}function ds(s){const e=s.gameplayRadius<1.15?.72:s.gameplayRadius<1.9?1.05:1.38;return s.gameplayRadius+s.visualScale*.14+e}function Vm(s,e,t,i,n,r){if(s.isGigantic||e.isGigantic||zo(s)||zo(e))return!1;const a=Math.abs(t)<=Math.max(2.1,n*.34),o=Math.abs(i)>=Math.max(4.8,n*1.02),l=Math.abs(i)<=r*2.35,c=t>=.28;return a&&o&&l&&c}function zo(s){return s.sizeTier==="large"||s.sizeTier==="very_large"||s.sizeTier==="huge"||s.sizeTier==="massive"}function Wm(s,e,t){return t<=e||!s[t]?!1:t<s.length-4}function Xm(s,e){if(s.shapeKind==="round")return 0;const t=s.spinDirection==="cw"?-1:1;return s.motionSeed+e*s.spinSpeed*.42*t}function Es(s,e,t){const i=Nt(Math.max(s.index,t));let n=s.x,r=s.y;if(s.index>t+1&&s.motionPattern!=="none"){const a=e*(.48+i.movementSpeed*.66)+s.motionSeed,o=i.movementAmplitude*(.44+s.visualScale*.08);s.motionPattern==="vertical"?r+=Math.sin(a)*o*.95:s.motionPattern==="horizontal"?(n+=Math.cos(a*.82)*o*.7,r+=Math.sin(a*.54)*o*.2):s.motionPattern==="micro_orbit"?(n+=Math.sin(a*.55)*o*.34,r+=Math.cos(a*.94)*o*.7):s.motionPattern==="drift"&&(n+=Math.cos(a*.42)*o*.46,r+=Math.sin(a*.42)*o*.46)}return{...s,resolvedX:n,resolvedY:r,resolvedZ:s.z,resolvedSpinPhase:Xm(s,e)}}const Go={tiny:{radius:[.42,.6],visual:[.34,.54],orbitPeriod:[1.6,2.1]},very_small:{radius:[.6,.86],visual:[.54,.82],orbitPeriod:[2,2.5]},small:{radius:[.86,1.18],visual:[.82,1.18],orbitPeriod:[2.4,2.9]},medium_small:{radius:[1.18,1.58],visual:[1.18,1.72],orbitPeriod:[2.8,3.5]},medium:{radius:[1.58,2.08],visual:[1.72,2.36],orbitPeriod:[3.2,4]},medium_large:{radius:[2.08,2.74],visual:[2.36,3.12],orbitPeriod:[3.8,4.8]},large:{radius:[2.74,3.54],visual:[3.12,4.16],orbitPeriod:[4.4,5.6]},very_large:{radius:[3.54,4.52],visual:[4.16,5.7],orbitPeriod:[5.4,6.8]},huge:{radius:[4.52,5.9],visual:[5.7,7.9],orbitPeriod:[6.8,8.4]},massive:{radius:[5.9,7.4],visual:[7.9,11.2],orbitPeriod:[8.4,9.8]}},qm=["tiny","very_small","small","medium_small","medium","medium_large","large","very_large","huge","massive"];class jm{constructor(){S(this,"nodes",[]);S(this,"eventSystem",new Bm);S(this,"seed",1);S(this,"recentPatternIds",[])}reset(){this.seed=Math.random()*2147483647|1,this.recentPatternIds=[],this.eventSystem.reset(),this.nodes=[{index:0,x:-12,y:.8,z:0,gameplayRadius:1.86,visualScale:1.92,pathDistance:0,direction:"right",kind:"normal",sizeTier:"medium",shapeKind:"round",spinDirection:"cw",spinSpeed:.18,motionPattern:"none",eventType:"none",colorHint:"none",gameplayOrbitPeriod:3.6,branchSlot:null,offerId:null,onboarding:!0,isMilestone:!1,isGigantic:!1,coinSlots:[{angle:Math.PI*.4,value:1,collected:!1,orbitScale:1}],enemySlot:null,motionSeed:this.nextRandom()*Math.PI*2,visualStretch:{x:1,y:1,z:1}}]}prebuild(e){this.nodes.length===0&&this.reset(),this.append(Math.max(0,e-this.nodes.length))}ensureAhead(e,t=50,i=30){this.nodes.length-e>t||this.append(i)}queuePostMilestoneEvents(e,t){this.eventSystem.schedulePostMilestoneEvents(e,t,()=>this.nextRandom())}getInitialNodes(e){return this.prebuild(Math.max(180,e+60)),this.nodes.slice(0,e)}getInitialPositions(e){return this.getInitialNodes(e).map(t=>({x:t.x,y:t.y,z:t.z}))}getNode(e){return this.ensureAhead(e+1),this.nodes[e]||null}getWindow(e,t,i,n){return this.ensureAhead(e+t),this.nodes.slice(e,e+t).map(r=>Es(r,i,n))}getResolvedNode(e,t,i){this.ensureAhead(e+1);const n=this.nodes[e]??this.nodes[this.nodes.length-1];return Es(n,t,i)}replaceFuture(e,t){const i=this.nodes.slice(0,e+1),n=i[i.length-1]??null,r=[];t.forEach((a,o)=>{r.push(this.reindexNode(a,e+o+1,o===0?n:r[o-1]))}),this.nodes=[...i,...r]}createUpgradeBranches(e,t,i){const n=this.getNode(e);if(!n)return[];const a=Nt(i).spacing*1.18,o=n.x+a*.96,l=[{slot:0,yBias:10.5,direction:"up_right"},{slot:1,yBias:0,direction:"right"},{slot:2,yBias:-10.5,direction:"down_right"}];return t.slice(0,3).map((c,h)=>{const u=l[h]??l[1],f=[];for(let p=0;p<5;p+=1){const g=p/4,_=p===0?n:f[p-1],m=p<2?"large":"medium_large",d=Go[m],b=d.radius[0]+this.nextRandom()*(d.radius[1]-d.radius[0]),v=d.visual[0]+this.nextRandom()*(d.visual[1]-d.visual[0]),T=d.orbitPeriod[0]+this.nextRandom()*(d.orbitPeriod[1]-d.orbitPeriod[0]),R=p===0?o:o+p*a*.98,w=p===0?n.y+u.yBias*.96:n.y+u.yBias*(.42+g*.9)+Math.sin(g*Math.PI)*u.yBias*.1;f.push(this.buildNode({previous:_,index:e+p+1,x:R,y:w,direction:u.direction,sizeTier:m,shapeKind:i>=100?h===1?"triangular":"oval":i>=50?"oval":"round",motionPattern:p===0?"none":p%2===0?"vertical":"horizontal",spinDirection:h===1?"cw":"ccw",spinSpeed:.12+this.nextRandom()*.16,gameplayRadius:b,visualScale:v,gameplayOrbitPeriod:T,visualStretch:h===1?{x:1,y:1.08,z:.84}:{x:1.32,y:.84,z:1},kind:"branch",branchSlot:u.slot,offerId:c.item.id,onboarding:!1,eventType:"none",colorHint:"reward",isMilestone:!1,isGigantic:!1,coinSlots:p===0?[{angle:Math.PI*.5,value:1,collected:!1,orbitScale:1}]:[],enemySlot:null}))}return{mode:"reward_branch",offer:c,entry:f[0],previewNodes:f.slice(0,3),pathNodes:f}})}getTeleportTarget(e,t){this.ensureAhead(e+t+60);const i=Math.min(this.nodes.length-5,e+t);return Wm(this.nodes,e,i)?i:-1}sampleAtDistance(e){this.nodes.length===0&&this.prebuild(2);const t=Math.max(0,e);let i=this.nodes[0];for(let o=1;o<this.nodes.length;o+=1){const l=this.nodes[o];if(l.pathDistance>=t){const c=Math.max(1e-4,l.pathDistance-i.pathDistance),h=qe((t-i.pathDistance)/c,0,1),u=i.x+(l.x-i.x)*h,f=i.y+(l.y-i.y)*h,p=Math.hypot(l.x-i.x,l.y-i.y)||1;return{x:u,y:f,z:0,tangent:{x:(l.x-i.x)/p,y:(l.y-i.y)/p}}}i=l}const n=this.nodes[this.nodes.length-1],r=this.nodes[this.nodes.length-2]??n,a=Math.hypot(n.x-r.x,n.y-r.y)||1;return{x:n.x,y:n.y,z:0,tangent:{x:(n.x-r.x)/a,y:(n.y-r.y)/a}}}append(e){if(e<=0)return;let t=0;for(;t<e;){const i=Hm(this.nodes.length,()=>this.nextRandom(),this.recentPatternIds),n=this.instantiatePattern(i);this.nodes.push(...n),this.recentPatternIds.push(i.id),this.recentPatternIds.length>6&&this.recentPatternIds.shift(),t+=n.length}}instantiatePattern(e){const t=this.nodes[this.nodes.length-1],i=t.index,r=Nt(i).spacing/11.5,a=e.nodes.map((c,h)=>{const u=t.index+h+1;return this.buildTemplateNode(t,u,c,e,r,i)}),o=this.densifyPattern(t,a,i);let l;return mr(o,this.nodes)?l=o:mr(a,this.nodes)?l=a:l=this.buildFallbackPattern(t),this.expandLanePresence(t,l,i)}buildTemplateNode(e,t,i,n,r,a){const o=this.pickShapeKind(n.allowedShapeKinds,a),c=i.sizeTier??this.pickSizeTier(n.allowedShardSizes,a),h=e.x+i.x*r,u=e.y+i.y*r*1.14,f=this.alignToLane(u,a,c,!1),p=Math.hypot(h-e.x,f-e.y),g=e.pathDistance*3.2,_=(e.pathDistance+p)*3.2,m=Io(g,_)!==null,d=m,b=d?"massive":c,v=Go[b],T=d?10.4+this.nextRandom()*1.2:v.radius[0]+this.nextRandom()*(v.radius[1]-v.radius[0]),R=d?28+this.nextRandom()*8:v.visual[0]+this.nextRandom()*(v.visual[1]-v.visual[0]),w=d?10:v.orbitPeriod[0]+this.nextRandom()*(v.orbitPeriod[1]-v.orbitPeriod[0]),P=this.directionFrom(e.x,e.y,h,f),U=this.resolveEventType(t,g,_,a,i),x=d?"none":this.pickMotionPattern(i.motionPattern,a,o),E=this.nextRandom()<.5?"cw":"ccw",F=o==="round"?.08+this.nextRandom()*.12:.06+this.nextRandom()*.18,O=o==="oval"?{x:1.42+this.nextRandom()*.42,y:.74+this.nextRandom()*.16,z:1}:o==="triangular"?{x:1,y:1.08+this.nextRandom()*.14,z:.84+this.nextRandom()*.1}:{x:1,y:1,z:1},J=m?"milestone":U==="none"?"normal":U==="boss_weak"?"boss_weak":"event";return this.buildNode({previous:e,index:t,x:h,y:f,direction:P,sizeTier:b,shapeKind:o,motionPattern:x,spinDirection:E,spinSpeed:F,gameplayRadius:T,visualScale:R,gameplayOrbitPeriod:w,visualStretch:O,kind:J,branchSlot:null,offerId:null,onboarding:t<50,eventType:U,colorHint:U==="boss"||U==="boss_weak"?"danger":U==="none"?"none":"accent",isMilestone:m,isGigantic:d,coinSlots:this.buildCoinSlots(i,U,a),enemySlot:this.buildEnemySlot(i,a,U)})}buildFallbackPattern(e){const t=e.index,i=Nt(t),n=[],r=4;for(let a=0;a<r;a+=1){const o=e.index+a+1,l=a===0?e:n[a-1],c=l.y>9?"down_right":l.y<-9||a%2===0?"up_right":"down_right",h=c==="up_right"?{x:1,y:.66}:c==="down_right"?{x:1,y:-.66}:{x:1,y:0},u=i.spacing*(.68+this.nextRandom()*.16),f=l.x+h.x*u,p=this.alignToLane(l.y+h.y*u*1.08,t,a%2===0?"small":"medium_small",!0);n.push(this.buildNode({previous:l,index:o,x:f,y:p,direction:c,sizeTier:a%2===0?"small":"medium_small",shapeKind:t>=100?"triangular":t>=50?"oval":"round",motionPattern:i.roundMovementUnlocked?"vertical":"none",spinDirection:"cw",spinSpeed:.12,gameplayRadius:a%2===0?1.12:1.46,visualScale:a%2===0?1.2:1.58,gameplayOrbitPeriod:a%2===0?2.8:3.2,visualStretch:{x:1,y:1,z:1},kind:"normal",branchSlot:null,offerId:null,onboarding:o<50,eventType:"none",colorHint:"none",isMilestone:!1,isGigantic:!1,coinSlots:a===1?[{angle:Math.PI*.6,value:1,collected:!1,orbitScale:1}]:[],enemySlot:null}))}return n}densifyPattern(e,t,i){if(t.length===0)return t;const n=Nt(i),r=[];let a=e,o=0;const l=i>=50&&i%36<12;t.forEach(h=>{const u=h.x-a.x,f=h.y-a.y,p=Math.hypot(u,f),g=Math.abs(f)<n.maxVerticalDelta*.2;o=g?o+1:0;const _=i<50,m=Math.max(h.gameplayRadius,a.gameplayRadius),d=m<1.05?4:m<1.9?2:1;if(i<160&&(p>n.spacing*(_?.82:1.02)||Math.abs(f)>n.maxVerticalDelta*.62||o>=(_?1:2)||l)){const v=_||l||p>n.spacing*1.28||Math.abs(f)>n.maxVerticalDelta*.92?2:1,T=Math.min(d,v+(_&&d>1?1:0));for(let R=0;R<T;R+=1){const w=(R+1)/(T+1),P=(a.index+h.index+R)%2===0?1:-1,U=(T-1)*.5,x=(R-U)*(_?2.45:1.85),E=g?x+P*(_?.85:.55):Math.sign(f||P)*Math.min(_?2.8:2.2,Math.abs(f)*.34)+x*.4,F=r[r.length-1]??a,O=a.x+u*w+(T>=3?(R-U)*.18:0),J=a.y+f*w+E,D=T>=3||R===0?"tiny":"very_small",N=this.alignToLane(J,i,D,!0);r.push(this.buildNode({previous:F,index:F.index+1,x:O,y:N,direction:this.directionFrom(F.x,F.y,O,N),sizeTier:D,shapeKind:i>=100?"triangular":i>=50?"oval":"round",motionPattern:i>=40&&R===T-1?"vertical":"none",spinDirection:this.nextRandom()<.5?"cw":"ccw",spinSpeed:.1+this.nextRandom()*.08,gameplayRadius:D==="tiny"?.78:.96,visualScale:D==="tiny"?.86:1.08,gameplayOrbitPeriod:D==="tiny"?2.4:2.75,visualStretch:{x:1,y:1,z:1},kind:"normal",branchSlot:null,offerId:null,onboarding:h.index<50,eventType:"none",colorHint:"none",isMilestone:!1,isGigantic:!1,coinSlots:[],enemySlot:null}))}}r.push(this.reindexNode(h,(r[r.length-1]??a).index+1,r[r.length-1]??a)),a=r[r.length-1]??a});const c=[];return r.forEach((h,u)=>{c.push(this.reindexNode(h,e.index+u+1,u===0?e:c[u-1]))}),c}expandLanePresence(e,t,i){if(t.length===0)return t;const n=i<50?8.4:7.2,r=[-n,0,n],a=[-n*1.65,-n*.82,0,n*.82,n*1.65],o=[],l=i>=50&&i%42<16;t.forEach(h=>{const u=o[o.length-1]??e,f=this.forceLargeShardCenter(h,i),p=this.reindexNode(f,u.index+1,u);if(o.push(p),p.isMilestone||p.isGigantic||["large","very_large","huge","massive"].includes(p.sizeTier))return;const _=i<50,m=p.sizeTier==="tiny"||p.sizeTier==="very_small"||p.sizeTier==="small"||p.sizeTier==="medium_small",d=_&&m;if(!(d||l||this.nextRandom()<.42))return;const v=(p.sizeTier==="tiny"||p.sizeTier==="very_small"||p.sizeTier==="small")&&d||l&&this.nextRandom()<.36,T=v?a:r,R=v?2:1,w=this.getLaneIndex(p.y,n,v),P=this.buildCompanionLaneOrder(w,T.length),U=p.sizeTier==="tiny"||p.sizeTier==="very_small"||p.sizeTier==="small"?v?4:_?2:1:p.sizeTier==="medium_small"||p.sizeTier==="medium"?v?3:_?2:1:0;for(let x=0;x<U;x+=1){const E=P[x];if(E===void 0)break;const F=o[o.length-1]??e,O=this.pickCompanionSizeTier(p.sizeTier),J=(x-(U-1)*.5)*(v?.12:.18),D=p.x+.5+J+(this.nextRandom()-.5)*(d?.16:.12),N=T[E]+(this.nextRandom()-.5)*(O==="tiny"?.82:O==="very_small"?.64:.5),W=E!==R&&this.nextRandom()<.34,q=this.buildNode({previous:F,index:F.index+1,x:D,y:N,direction:this.directionFrom(F.x,F.y,D,N),sizeTier:O,shapeKind:i>=100?"triangular":i>=50?"oval":"round",motionPattern:_?"none":this.nextRandom()<.16?"vertical":"none",spinDirection:this.nextRandom()<.5?"cw":"ccw",spinSpeed:.1+this.nextRandom()*.08,gameplayRadius:O==="tiny"?.78:O==="very_small"?.9:1.06,visualScale:O==="tiny"?.88:O==="very_small"?1.02:1.16,gameplayOrbitPeriod:O==="tiny"?2.36:O==="very_small"?2.58:2.9,visualStretch:{x:1,y:1,z:1},kind:"normal",branchSlot:null,offerId:null,onboarding:F.index<50,eventType:"none",colorHint:"none",isMilestone:!1,isGigantic:!1,coinSlots:W?[{angle:Math.PI*(.35+this.nextRandom()*1.2),value:1,collected:!1,orbitScale:1}]:[],enemySlot:null});mr([q],[...this.nodes,...o])&&o.push(q)}});const c=[];return o.forEach((h,u)=>{c.push(this.reindexNode(h,e.index+u+1,u===0?e:c[u-1]))}),c}buildNode(e){const t=e.previous,i=t?Math.hypot(e.x-t.x,e.y-t.y):0;return{index:e.index,x:e.x,y:e.y,z:0,gameplayRadius:e.gameplayRadius,visualScale:e.visualScale,pathDistance:t?t.pathDistance+i:0,direction:e.direction,kind:e.kind,sizeTier:e.sizeTier,shapeKind:e.shapeKind,spinDirection:e.spinDirection,spinSpeed:e.spinSpeed,motionPattern:e.motionPattern,eventType:e.eventType,colorHint:e.colorHint,gameplayOrbitPeriod:e.gameplayOrbitPeriod,branchSlot:e.branchSlot,offerId:e.offerId,onboarding:e.onboarding,isMilestone:e.isMilestone,isGigantic:e.isGigantic,coinSlots:e.coinSlots,enemySlot:e.enemySlot,motionSeed:this.nextRandom()*Math.PI*2,visualStretch:e.visualStretch}}alignToLane(e,t,i,n){const r=t<50?8.4:7.2,a=[-r,0,r],o=i==="massive"||i==="huge"||i==="very_large",l=i==="medium"||i==="medium_large"||i==="large";if(o)return Qt.clamp(e*.35,-r,r);const c=e>r*.35?2:e<-r*.35?0:1;let h=c;n&&!l&&this.nextRandom()<.42?h=[0,1,2][Math.floor(this.nextRandom()*3)]??c:n&&l&&this.nextRandom()<.2&&(h=c===1?this.nextRandom()<.5?0:2:c);const u=o?.32:l?.44:.58;return a[h]+(this.nextRandom()-.5)*u}getLaneIndex(e,t,i=!1){return i?e>t*1.24?4:e>t*.38?3:e<-t*1.24?0:e<-t*.38?1:2:e>t*.42?2:e<-t*.42?0:1}buildCompanionLaneOrder(e,t){const i=[];for(let n=1;n<t;n+=1){const r=e-n,a=e+n;a<t&&i.push(a),r>=0&&i.push(r)}return i}pickCompanionSizeTier(e){switch(e){case"tiny":case"very_small":return"tiny";case"small":case"medium_small":return this.nextRandom()<.5?"tiny":"very_small";case"medium":return this.nextRandom()<.5?"very_small":"small";default:return"small"}}forceLargeShardCenter(e,t){if(!["large","very_large","huge","massive"].includes(e.sizeTier)||e.isMilestone||e.isGigantic)return e;const i=this.alignToLane(0,t,e.sizeTier,!1);return{...e,y:i}}reindexNode(e,t,i){return this.buildNode({previous:i,index:t,x:e.x,y:e.y,direction:e.direction,sizeTier:e.sizeTier,shapeKind:e.shapeKind,motionPattern:e.motionPattern,spinDirection:e.spinDirection,spinSpeed:e.spinSpeed,gameplayRadius:e.gameplayRadius,visualScale:e.visualScale,gameplayOrbitPeriod:e.gameplayOrbitPeriod,visualStretch:e.visualStretch,kind:e.kind,branchSlot:e.branchSlot,offerId:e.offerId,onboarding:!1,eventType:e.eventType,colorHint:e.colorHint,isMilestone:e.isMilestone,isGigantic:e.isGigantic,coinSlots:e.coinSlots.map(n=>({...n})),enemySlot:e.enemySlot?{...e.enemySlot}:null})}buildCoinSlots(e,t,i){var r;const n=((r=e.coinAngles)==null?void 0:r.map(a=>({angle:a,value:t==="treasure"?3:1,collected:!1,orbitScale:1})))??[];return n.length===0&&i<12&&n.push({angle:Math.PI*(.2+this.nextRandom()*1.6),value:1,collected:!1,orbitScale:1}),n}buildEnemySlot(e,t,i){if(!Nt(t).enemyUnlocked||i==="shop"||i==="gift")return null;const r=e.enemyPole??(this.nextRandom()<.24?this.nextRandom()<.5?"north":"south":null);if(!r)return null;const a=t<60?"light":t<120?this.nextRandom()<.7?"armored":"light":this.nextRandom()<.18?"invincible":this.nextRandom()<.55?"elite":"armored",o=a==="light"?4.6:a==="armored"?6.4:a==="elite"?8.1:Number.POSITIVE_INFINITY;return{pole:r,tier:a,alive:!0,rewardCoins:a==="elite"?2:1,speedThreshold:o}}pickSizeTier(e,t){const i=Nt(t),n=qm.filter(o=>e.includes(o)),r=qe(Math.floor(i.normalized*(n.length-1)+4),0,n.length-1),a=n.slice(0,r+1);return a[Math.floor(this.nextRandom()*a.length)]??"medium"}pickShapeKind(e,t){const i=Nt(t),n=e.filter(r=>!(r==="oval"&&!i.ovalUnlocked||r==="triangular"&&!i.triangularUnlocked));return n[Math.floor(this.nextRandom()*n.length)]??"round"}pickMotionPattern(e,t,i){const n=Nt(t);if(i==="round"&&!n.roundMovementUnlocked)return"none";if(e&&e!=="none"&&this.nextRandom()<n.movingShardChance+.25)return e;if(this.nextRandom()>n.movingShardChance)return"none";const r=["vertical","horizontal","micro_orbit","drift"];return r[Math.floor(this.nextRandom()*r.length)]??"none"}resolveEventType(e,t,i,n,r){return Io(t,i)!==null?"none":r.sizeTier==="massive"&&n>=150?"boss_weak":this.eventSystem.consumePlannedEvent(e,n)}directionFrom(e,t,i,n){const r=i-e,a=n-t;return Math.abs(a)<1.5?"right":a>0?r<0?"up_left":Math.abs(r)<1.2?"up":"up_right":r<0?"down_left":"down_right"}nextRandom(){return this.seed=this.seed*48271%2147483647,this.seed/2147483647}}const Ho="portfolio-game-highscore",Vo="portfolio-game-best-distance",Wo="portfolio-game-best-splits";class Ym{constructor(){S(this,"shardsLanded",0);S(this,"distanceMeters",0);S(this,"coins",0);S(this,"runStartTime",0);S(this,"splitTimes",{});S(this,"bestShards",Number(window.localStorage.getItem(Ho)||0));S(this,"bestDistanceMeters",Number(window.localStorage.getItem(Vo)||0));S(this,"bestSplitTimes",this.readSplits())}reset(e=performance.now()){this.shardsLanded=0,this.distanceMeters=0,this.coins=0,this.runStartTime=e,this.splitTimes={}}recordLanding(e,t,i){const n=this.distanceMeters;this.shardsLanded=Math.max(this.shardsLanded,e),this.distanceMeters=Math.max(this.distanceMeters,t*3.2);for(const r of[100,500,1e3]){if(n>=r||this.distanceMeters<r||this.splitTimes[r]!==void 0)continue;const a=Math.max(0,i-this.runStartTime)/1e3;this.splitTimes[r]=a;const o=this.bestSplitTimes[r];(o===void 0||a<o)&&(this.bestSplitTimes[r]=a,this.persist())}this.shardsLanded>this.bestShards&&(this.bestShards=this.shardsLanded,this.persist()),this.distanceMeters>this.bestDistanceMeters&&(this.bestDistanceMeters=this.distanceMeters,this.persist())}addCoins(e){this.coins+=e}canAfford(e){return this.coins>=e}spendCoins(e){return this.coins<e?!1:(this.coins-=e,!0)}getSnapshot(){return{shardsLanded:this.shardsLanded,bestShards:this.bestShards,distanceMeters:this.distanceMeters,bestDistanceMeters:this.bestDistanceMeters,coins:this.coins,splitTimes:{...this.splitTimes},bestSplitTimes:{...this.bestSplitTimes}}}fillHud(e){e.score=this.shardsLanded,e.highscore=this.bestShards,e.distanceMeters=this.distanceMeters,e.bestDistanceMeters=this.bestDistanceMeters,e.coins=this.coins,e.splitTimes={...this.splitTimes}}readSplits(){const e=window.localStorage.getItem(Wo);if(!e)return{};try{return JSON.parse(e)}catch{return{}}}persist(){window.localStorage.setItem(Ho,String(this.bestShards)),window.localStorage.setItem(Vo,String(this.bestDistanceMeters)),window.localStorage.setItem(Wo,JSON.stringify(this.bestSplitTimes))}}const Xo="#D9624E";class Km{constructor(e,t){S(this,"group",new Ot);S(this,"pool",[]);S(this,"activeOffers",[]);S(this,"open",!1);const i=new Me(t==="dark"?Xo:"#8E4130");for(let n=0;n<3;n+=1){const r=new gt(new Fn(.34,0),new ti({color:i,transparent:!0,opacity:.94}));r.visible=!1,this.pool.push(r),this.group.add(r)}this.group.visible=!1,e.add(this.group)}setTheme(e){const t=new Me(e==="dark"?Xo:"#8E4130");this.pool.forEach(i=>i.material.color.copy(t))}reset(){this.open=!1,this.activeOffers=[],this.group.visible=!1,this.pool.forEach(e=>{e.visible=!1})}openForRun(e,t){const i=Math.max(0,Math.min(.45,t.modifiers.shopDiscount)),n=gs(e,t);return this.activeOffers=n.slice(0,3).map((r,a)=>({angle:Math.PI*(.2+a*.55),price:this.getPriceForOffer(r,i),purchased:!1,offer:r})),this.open=this.activeOffers.length>0,this.group.visible=this.open,n}isOpen(){return this.open}getActiveOffers(){return this.activeOffers.map(e=>({offer:e.offer,price:e.price,angle:e.angle,purchased:e.purchased}))}getHints(e){return this.activeOffers.map((t,i)=>{var n,r,a;return{mode:"shop_orbit",offer:t.offer,price:t.price,entry:{index:i,x:((n=e[i])==null?void 0:n.x)??0,y:((r=e[i])==null?void 0:r.y)??0,z:((a=e[i])==null?void 0:a.z)??0,gameplayRadius:.5,visualScale:.5,pathDistance:0,direction:"right",kind:"event",sizeTier:"tiny",shapeKind:"round",spinDirection:"cw",spinSpeed:0,motionPattern:"none",eventType:"shop",colorHint:"accent",gameplayOrbitPeriod:1,branchSlot:i,offerId:t.offer.item.id,onboarding:!1,isMilestone:!1,isGigantic:!1,coinSlots:[],enemySlot:null,motionSeed:0,visualStretch:{x:1,y:1,z:1}},previewNodes:[],pathNodes:[]}})}tryPurchase(e,t){if(!this.open)return null;for(const i of this.activeOffers){if(i.purchased)continue;if($m(e,i.angle)<.22&&t>=i.price)return i.purchased=!0,this.close(),{offer:i.offer,price:i.price}}return null}update(e,t,i){if(!this.open){this.group.visible=!1;return}this.group.visible=!0,this.pool.forEach((n,r)=>{const a=this.activeOffers[r];if(!a||a.purchased){n.visible=!1;return}n.visible=!0,n.position.set(e.x+Math.cos(a.angle)*(t+1.6),e.y+Math.sin(a.angle)*(t+1.6),0),n.rotation.y=i*1.4+r*.35,n.scale.setScalar(1+Math.sin(i*3+r)*.06)})}close(){this.open=!1,this.group.visible=!1,this.pool.forEach(e=>{e.visible=!1})}getPriceForOffer(e,t){const i=e.item.rarity==="legendary"?11:e.item.rarity==="epic"?8:e.item.rarity==="rare"?5:e.item.rarity==="uncommon"?3:2;return Math.max(1,Math.round((i+e.stackCount)*(1-t)))}}function $m(s,e){return Math.abs(((s-e)%(Math.PI*2)+Math.PI*3)%(Math.PI*2)-Math.PI)}const fs="#D9624E";class Zm{constructor(e,t){S(this,"group",new Ot);S(this,"bossMesh");S(this,"weakPointMesh");S(this,"phase","idle");S(this,"phaseEndsAt",0);S(this,"active",!1);S(this,"defeated",!1);S(this,"weakPointVisible",!1);S(this,"weakPointPosition",new C);this.bossMesh=new gt(new Fn(2.8,1),new ti({color:t==="dark"?fs:"#8E4130",transparent:!0,opacity:.9})),this.weakPointMesh=new gt(new Ds(.78,0),new ti({color:fs,transparent:!0,opacity:.96})),this.bossMesh.visible=!1,this.weakPointMesh.visible=!1,this.group.add(this.bossMesh,this.weakPointMesh),e.add(this.group)}setTheme(e){this.bossMesh.material.color.set(e==="dark"?fs:"#8E4130"),this.weakPointMesh.material.color.set(fs)}reset(){this.active=!1,this.defeated=!1,this.phase="idle",this.phaseEndsAt=0,this.weakPointVisible=!1,this.bossMesh.visible=!1,this.weakPointMesh.visible=!1}start(e){this.active=!0,this.defeated=!1,this.phase="chase",this.phaseEndsAt=e+6,this.bossMesh.visible=!0}isActive(){return this.active&&!this.defeated}isWeakPointPhase(){return this.phase==="weak_point"}getSpeedPressure(){return this.phase==="chaos"?1.24:this.phase==="chase"?1.12:1}getCameraZoomOffset(){return this.active?this.phase==="weak_point"?9.5:this.phase==="chaos"?5.6:3.2:0}update(e,t,i){return!this.active||this.defeated?(this.bossMesh.visible=!1,this.weakPointMesh.visible=!1,{playerHit:!1}):(t>=this.phaseEndsAt&&(this.phase==="chase"?(this.phase="chaos",this.phaseEndsAt=t+8):this.phase==="chaos"&&(this.phase="weak_point",this.phaseEndsAt=t+10,this.weakPointVisible=!0)),this.bossMesh.visible=!0,this.bossMesh.position.set(i.x-(this.phase==="weak_point"?10.5:8.6),i.y+Math.sin(t*1.2)*2.4,0),this.bossMesh.rotation.y+=e*.32,this.bossMesh.rotation.z+=e*.18,this.bossMesh.scale.setScalar(this.phase==="chaos"?1.2:1),this.weakPointMesh.visible=this.weakPointVisible,this.weakPointVisible&&(this.weakPointMesh.position.copy(this.weakPointPosition),this.weakPointMesh.rotation.y+=e*1.8,this.weakPointMesh.scale.setScalar(1+Math.sin(t*6)*.08)),{playerHit:this.phase!=="weak_point"&&this.bossMesh.position.distanceTo(i)<2.2})}setWeakPoint(e){this.weakPointPosition.copy(e),this.weakPointVisible=this.phase==="weak_point"}defeat(){this.defeated=!0,this.active=!1,this.phase="defeated",this.weakPointVisible=!1,this.bossMesh.visible=!1,this.weakPointMesh.visible=!1}}const Jm="#D9624E",Qm="#F06A5A";function li(s){const e=Math.PI*2;return(s%e+e)%e}function ps(s,e){const t=Math.PI*2;return((s-e+Math.PI)%t+t)%t-Math.PI}class eg{constructor(e,t){S(this,"root",new Ot);S(this,"player",new Ot);S(this,"playerBody");S(this,"playerTrail",new Ar);S(this,"trailPoints",Array.from({length:8},()=>new C));S(this,"trailBuffer",new Float32Array(this.trailPoints.length*3));S(this,"path",new jm);S(this,"camera",new Cr);S(this,"stats",new Ym);S(this,"coins");S(this,"enemies");S(this,"shop");S(this,"boss");S(this,"scoreListeners",new Set);S(this,"playerPosition",new C);S(this,"playerVelocity",new C);S(this,"playerVelocityTarget",new C);S(this,"scratchVector",new C);S(this,"scratchVectorB",new C);S(this,"scratchVector2",new xe);S(this,"impactWaves",new Map);S(this,"hudSnapshot",{state:"transition",score:0,highscore:0,distanceMeters:0,bestDistanceMeters:0,coins:0,splitTimes:{},chargeRatio:0,momentumGauge:0,momentumTier:0,orbitGraceActive:!1,orbitGraceProgress:1,offers:[],branchHints:[],acquisition:null});S(this,"momentum",{gauge:0,fillRate:0,decayRate:.12,speedMultiplier:1,jumpMultiplier:1,cameraZoomMultiplier:0});S(this,"state","idle");S(this,"playerState","attached");S(this,"currentTime",0);S(this,"attachedIndex",0);S(this,"displayWindowIndices",[]);S(this,"displayNextIndex",0);S(this,"score",0);S(this,"orbitGraceActive",!1);S(this,"orbitGraceProgress",1);S(this,"orbitGraceTravel",0);S(this,"chargeActive",!1);S(this,"chargeMeter",0);S(this,"orbitAngle",Math.PI*.18);S(this,"orbitDirection",-1);S(this,"angularSpeed",0);S(this,"lastLandingDirection",0);S(this,"choiceMode","none");S(this,"activeChoices",[]);S(this,"activeShopAngles",[]);S(this,"acquisition",null);S(this,"acquisitionStartedAt",0);S(this,"acquisitionDuration",.9);S(this,"runUpgrades",Do());S(this,"currentTheme");S(this,"remainingExtraJumps",0);S(this,"phaseJumpReadyAt",0);S(this,"teleportReadyAt",0);S(this,"warpReadyAt",0);S(this,"shieldCharges",0);S(this,"eventCooldownUntil",0);S(this,"autoFireReadyAt",0);this.currentTheme=t,this.playerBody=new gt(new Br(.42,1.18,6),new ti({color:t==="dark"?"#D4BF9B":"#393F4A"})),this.playerBody.rotation.z=-Math.PI/2,this.player.add(this.playerBody),this.player.visible=!1,this.root.add(this.player);const i=new St;i.setAttribute("position",new Ct(this.trailBuffer,3)),this.playerTrail=new Ar(i,new Or({color:t==="dark"?"#D4BF9B":"#393F4A",transparent:!0,opacity:.42})),this.playerTrail.visible=!1,this.root.add(this.playerTrail),e.add(this.root),this.coins=new Om(e,t),this.enemies=new km(e,t),this.shop=new Km(e,t),this.boss=new Zm(e,t)}get currentState(){return this.state}get currentScore(){return this.score}get bestScore(){return this.stats.getSnapshot().bestShards}setTheme(e){this.currentTheme=e,this.playerBody.material.color.set(e==="dark"?"#D4BF9B":"#393F4A"),this.playerTrail.material.color.set(e==="dark"?"#D4BF9B":"#393F4A"),this.coins.setTheme(e),this.enemies.setTheme(e),this.shop.setTheme(e),this.boss.setTheme(e)}onScoreChange(e){return this.scoreListeners.add(e),()=>this.scoreListeners.delete(e)}startTransition(){this.resetRunState(),this.path.reset(),this.path.prebuild(180),this.camera.reset(this.getResolvedNode(0)),this.state="transition_in",this.root.visible=!0,this.player.visible=!1,this.playerTrail.visible=!1}beginRun(){const e=this.state==="transition_in";this.resetRunState(),e||(this.path.reset(),this.path.prebuild(180)),this.root.visible=!0,this.player.visible=!0,this.playerTrail.visible=!0,this.attachToNode(0,!1,null,null),this.camera.reset(this.getResolvedNode(0)),this.state="running_attached",this.emitScore()}restart(){this.beginRun()}prepareReturnTransition(){this.state="transition_out",this.chargeActive=!1,this.choiceMode="none",this.activeChoices=[],this.shop.reset(),this.boss.reset(),this.coins.reset(),this.enemies.reset(),this.player.visible=!1,this.playerTrail.visible=!1}stop(){this.state="idle",this.root.visible=!1,this.player.visible=!1,this.playerTrail.visible=!1,this.shop.reset(),this.boss.reset(),this.coins.reset(),this.enemies.reset(),this.camera.reset(this.getResolvedNode(0))}resetRunState(){this.stats.reset(performance.now()),this.score=0,this.chargeActive=!1,this.chargeMeter=0,this.choiceMode="none",this.activeChoices=[],this.activeShopAngles=[],this.acquisition=null,this.acquisitionStartedAt=0,this.currentTime=0,this.attachedIndex=0,this.displayWindowIndices=[],this.displayNextIndex=0,this.orbitGraceActive=!1,this.orbitGraceProgress=1,this.orbitGraceTravel=0,this.lastLandingDirection=0,this.playerState="attached",this.orbitAngle=Math.PI*.18,this.orbitDirection=-1,this.angularSpeed=0,this.playerPosition.set(0,0,0),this.playerVelocity.set(0,0,0),this.playerVelocityTarget.set(0,0,0),this.runUpgrades=Do(),this.remainingExtraJumps=0,this.phaseJumpReadyAt=0,this.teleportReadyAt=0,this.warpReadyAt=0,this.shieldCharges=0,this.eventCooldownUntil=0,this.autoFireReadyAt=0,this.momentum.gauge=0,this.momentum.fillRate=0,this.momentum.decayRate=.12,this.momentum.speedMultiplier=1,this.momentum.jumpMultiplier=1,this.momentum.cameraZoomMultiplier=0,this.impactWaves.clear(),this.playerTrail.geometry.setDrawRange(0,this.trailPoints.length),this.trailPoints.forEach(e=>e.set(0,0,0)),this.coins.reset(),this.enemies.reset(),this.shop.reset(),this.boss.reset()}getInitialPlatformPositions(e){return this.path.prebuild(Math.max(160,e+60)),this.path.getInitialNodes(e).map(t=>new C(t.x,t.y,t.z))}getInitialPlatformScales(e){return this.path.prebuild(Math.max(160,e+60)),this.path.getInitialNodes(e).map(t=>t.visualScale)}getInitialPlatformVisuals(e){return this.path.prebuild(Math.max(160,e+60)),this.initializeDisplayWindow(e),this.getVisiblePlatformVisuals(e)}getVisiblePlatformPositions(e){return this.getDisplayNodes(e).map(t=>new C(t.resolvedX,t.resolvedY,t.resolvedZ))}getVisiblePlatformScales(e){return this.getDisplayNodes(e).map(t=>t.visualScale)}getVisiblePlatformVisuals(e){return this.getDisplayNodes(e).map(t=>{const i=t.index===this.attachedIndex&&this.playerState!=="airborne",n=li(this.orbitAngle-(t.shapeKind==="round"?0:t.resolvedSpinPhase)),r=i&&this.orbitGraceActive?this.orbitGraceProgress:1,a=this.getVisualWaveState(t),o=1.04+this.momentum.gauge*.3,l=i?Qt.lerp(.66,o,r):.62;return{scale:new C(t.visualScale*t.visualStretch.x,t.visualScale*t.visualStretch.y,t.visualScale*t.visualStretch.z),shapeKind:t.shapeKind,spinDirection:t.spinDirection,spinSpeed:t.spinSpeed,spinPhase:t.resolvedSpinPhase,tint:t.colorHint==="danger"?Qm:t.colorHint==="reward"?this.currentTheme==="dark"?"#393F4A":"#D4BF9B":t.colorHint==="accent"?Jm:null,pulse:t.isMilestone||t.eventType!=="none"?.34:qe(this.momentum.gauge*.22,0,.22),deformAngle:i?n:(a==null?void 0:a.angle)??0,deformStrength:i?.32+r*.22+this.momentum.gauge*.52:(a==null?void 0:a.strength)??0,deformDensity:i?l:(a==null?void 0:a.density)??.62}})}getRecommendedVisibleCount(){const e=this.state==="transition_in"?72:64,t=Math.round(this.momentum.cameraZoomMultiplier*18),i=this.choiceMode==="reward_branch"?12:this.choiceMode==="shop_orbit"?8:0;return Math.max(56,Math.min(112,e+t+i))}setChargeActive(e){if(this.state==="idle"||this.state==="transition_in"||this.state==="transition_out"||this.state==="game_over")return!1;if(e)return this.chargeActive=!0,this.playerState==="attached"&&(this.playerState="charging",this.state==="running_attached"&&(this.state="running_charging")),!1;const t=this.chargeActive&&(this.playerState==="charging"||this.playerState==="attached")&&(this.state==="running_charging"||this.state==="running_attached"||this.state==="upgrade_branching");return this.chargeActive=!1,t?this.launch():!1}triggerJump(){return this.state==="idle"||this.state==="transition_in"||this.state==="transition_out"||this.state==="game_over"?!1:this.playerState==="attached"||this.playerState==="charging"?(this.chargeActive=!1,this.launch()):this.performAirAction()}selectUpgradeFallback(e){if(this.state!=="upgrade_branching")return!1;if(this.choiceMode==="shop_orbit"){const t=this.activeChoices[e];return!t||t.price===void 0||!this.stats.spendCoins(t.price)?!1:(this.applyOffer(t.offer,"Shop item"),this.shop.reset(),this.choiceMode="none",this.activeChoices=[],this.state="upgrade_acquired",this.eventCooldownUntil=this.currentTime+.6,!0)}return this.choiceMode!=="reward_branch"?!1:this.commitRewardBranch(e,!0)}getCameraPose(){return this.camera.getPose()}getHudState(){const e=qe(this.momentum.gauge/Math.max(1,this.runUpgrades.modifiers.momentumCap),0,1);return this.stats.fillHud(this.hudSnapshot),this.hudSnapshot.state=this.getHudStateValue(),this.hudSnapshot.chargeRatio=qe(this.chargeMeter,0,1),this.hudSnapshot.momentumGauge=e,this.hudSnapshot.momentumTier=Math.min(4,Math.floor(e*5)),this.hudSnapshot.orbitGraceActive=this.orbitGraceActive,this.hudSnapshot.orbitGraceProgress=this.orbitGraceProgress,this.hudSnapshot.offers=this.activeChoices.map(t=>t.offer),this.hudSnapshot.branchHints=this.getBranchHints(),this.hudSnapshot.acquisition=this.acquisition,this.hudSnapshot}update(e,t){if(this.state==="idle")return;if(this.currentTime=t,this.state==="transition_in"||this.state==="transition_out"){this.updateMomentum(e);return}this.path.ensureAhead(this.attachedIndex),this.updateMomentum(e);let i=this.getResolvedNode(this.attachedIndex),n=this.getResolvedNode(this.attachedIndex+1);const r=this.attachedIndex;if(this.playerState==="airborne"?this.updateAirborne(e,i):this.updateAttached(e,i),(this.attachedIndex!==r||this.playerState!=="airborne")&&(i=this.getResolvedNode(this.attachedIndex),n=this.getResolvedNode(this.attachedIndex+1)),this.advanceDisplayAnchor(),this.updateEvents(e,t,i),this.updateCamera(e,i,n),this.updateTrail(e),this.syncPlayerVisual(t),this.syncMarkers(t),this.state!=="game_over"&&(this.camera.isOutsideVerticalBounds(this.playerPosition,.02)||this.camera.isBehindSafeLine(this.playerPosition)?this.failRun():this.playerState!=="airborne"&&this.camera.isBehindSafeLine(new C(i.resolvedX,i.resolvedY,0))&&this.failRun()),this.acquisition){const a=qe((t-this.acquisitionStartedAt)/this.acquisitionDuration,0,1);this.acquisition.progress=a,a>=1&&(this.acquisition=null)}}getHudStateValue(){return this.state==="game_over"?"game_over":this.state==="transition_in"||this.state==="transition_out"?"transition":this.state==="upgrade_branching"?"upgrade_choice":"running"}emitScore(){this.scoreListeners.forEach(e=>e())}getResolvedNode(e){return this.path.getResolvedNode(Math.max(0,e),this.currentTime,this.attachedIndex)}getDisplayNodes(e){if(this.choiceMode==="reward_branch"&&this.activeChoices.length>0){const t=[this.getResolvedNode(this.attachedIndex)];for(this.activeChoices.forEach(i=>{i.previewNodes.slice(0,3).forEach(n=>{t.push(Es(n,this.currentTime,this.attachedIndex))})});t.length<e;){const i=this.attachedIndex+Math.max(1,t.length-8);t.push(this.getResolvedNode(i))}return t.slice(0,e)}return this.initializeDisplayWindow(e),this.displayWindowIndices.slice(0,e).map(t=>this.getResolvedNode(t))}advanceDisplayAnchor(){if(this.displayWindowIndices.length!==0)for(let e=0;e<this.displayWindowIndices.length;e+=1){const t=this.displayWindowIndices[e],i=this.getResolvedNode(t);if(!(i.resolvedX+this.getPhysicalRadius(i)+5.5<this.camera.getSafeLeft()))continue;this.path.ensureAhead(this.displayNextIndex+1);const r=this.getResolvedNode(this.displayNextIndex);r.resolvedX-this.getPhysicalRadius(r)>this.camera.getSafeRight()+2.8&&(this.displayWindowIndices[e]=this.displayNextIndex,this.displayNextIndex+=1)}}initializeDisplayWindow(e){if(this.displayWindowIndices.length===0){this.path.ensureAhead(e+1),this.displayWindowIndices=Array.from({length:e},(t,i)=>i),this.displayNextIndex=e;return}if(this.displayWindowIndices.length<e)for(this.path.ensureAhead(e+1);this.displayWindowIndices.length<e;)this.displayWindowIndices.push(this.displayNextIndex),this.displayNextIndex+=1}updateMomentum(e){const t=1-Math.min(.72,this.runUpgrades.modifiers.momentumRetention),i=this.momentum.decayRate*t;this.orbitGraceActive&&this.playerState!=="airborne"||(this.momentum.gauge=qe(this.momentum.gauge-i*e,0,1));const n=1+this.momentum.gauge*.6+this.runUpgrades.modifiers.speedBonus,r=1+this.momentum.gauge*.48+this.runUpgrades.modifiers.chargedLeapBonus*.12,a=this.momentum.gauge*1.4;this.momentum.speedMultiplier=fe(this.momentum.speedMultiplier,n,2.4,e),this.momentum.jumpMultiplier=fe(this.momentum.jumpMultiplier,r,2.6,e),this.momentum.cameraZoomMultiplier=fe(this.momentum.cameraZoomMultiplier,a,2.2,e),this.momentum.fillRate=fe(this.momentum.fillRate,0,4.6,e)}updateAttached(e,t){const i=this.getOrbitSample(t,this.orbitAngle),n=Math.max(1,i.position.length()),r=Math.PI*2/Math.max(1.6,t.gameplayOrbitPeriod),a=this.chargeActive?.55+this.chargeMeter*.45:0,o=r*(1+a+this.momentum.gauge*.42)*this.momentum.speedMultiplier*(1+this.runUpgrades.modifiers.chargeRate*.06+this.runUpgrades.modifiers.speedBonus*.3);this.angularSpeed=fe(this.angularSpeed,o,this.chargeActive?2.6:1.7,e),this.orbitAngle=li(this.orbitAngle+this.orbitDirection*this.angularSpeed*e);const l=this.getOrbitSample(t,this.orbitAngle);if(this.playerPosition.set(t.resolvedX+l.position.x,t.resolvedY+l.position.y,t.resolvedZ),this.playerVelocity.set(l.tangent.x*n*this.angularSpeed*this.orbitDirection,l.tangent.y*n*this.angularSpeed*this.orbitDirection,0),this.orbitGraceActive&&(this.orbitGraceTravel+=Math.abs(this.angularSpeed*e),this.orbitGraceProgress=qe(this.orbitGraceTravel/(Math.PI*2),0,1),this.orbitGraceProgress>=1&&(this.orbitGraceActive=!1)),this.chargeActive){const c=.55+this.runUpgrades.modifiers.chargeRate*.24;this.chargeMeter=qe(this.chargeMeter+e*c,0,1),this.state==="running_attached"&&(this.state="running_charging"),this.playerState==="attached"&&(this.playerState="charging")}else this.chargeMeter=fe(this.chargeMeter,0,4.2,e),this.playerState==="charging"&&(this.playerState="attached"),this.state==="running_charging"&&(this.state="running_attached");if(this.collectCoinsOnCurrentNode(t),this.resolveEnemyContact(t),this.choiceMode==="shop_orbit"&&this.shop.isOpen()){const c=this.shop.tryPurchase(this.orbitAngle,this.stats.getSnapshot().coins);c&&this.stats.spendCoins(c.price)&&(this.applyOffer(c.offer,"Shop item"),this.choiceMode="none",this.activeChoices=[],this.state="upgrade_acquired",this.eventCooldownUntil=this.currentTime+.6)}}updateAirborne(e,t){const i=this.scratchVector.set(this.playerPosition.x,this.playerPosition.y,this.playerPosition.z),n=qe(1-this.runUpgrades.modifiers.glideFactor*.55,.18,1);if(this.playerVelocity.y-=6.8*n*e,this.playerVelocity.x+=this.runUpgrades.modifiers.airControl*e*.4,this.playerPosition.addScaledVector(this.playerVelocity,e),this.choiceMode==="reward_branch"&&this.activeChoices.length>0)for(let a=0;a<this.activeChoices.length;a+=1){const o=this.activeChoices[a];if(!o)continue;const l=Es(o.entry,this.currentTime,this.attachedIndex);if(this.canCaptureNode(l,i)){this.commitRewardBranch(a,!1),this.attachToNode(this.attachedIndex+1,!0,this.playerPosition,this.playerVelocity);return}}const r=this.attachedIndex+Math.max(24,this.displayWindowIndices.length+8);for(let a=this.attachedIndex+1;a<=r;a+=1){const o=this.getResolvedNode(a);if(o.resolvedX-i.x>64)break;if(this.canCaptureNode(o,i)){this.attachToNode(a,!0,this.playerPosition,this.playerVelocity);return}}if(this.runUpgrades.modifiers.phaseJump&&this.currentTime>=this.phaseJumpReadyAt){const a=this.attachedIndex+1,o=this.getResolvedNode(a),l=this.playerPosition.distanceToSquared(this.scratchVector.set(o.resolvedX,o.resolvedY,o.resolvedZ)),c=(o.gameplayRadius+this.runUpgrades.modifiers.phaseJumpRescueRadius)**2;if(l<c){this.phaseJumpReadyAt=this.currentTime+this.runUpgrades.modifiers.phaseJumpCooldown,this.attachToNode(a,!0,this.playerPosition,this.playerVelocity);return}}if(this.teleportReadyAt<=this.currentTime&&this.runUpgrades.modifiers.teleportRange>0){const a=this.path.getTeleportTarget(this.attachedIndex,this.runUpgrades.modifiers.teleportRange);a>this.attachedIndex+1&&this.playerPosition.x<this.camera.getSafeLeft()+2.4&&(this.teleportReadyAt=this.currentTime+this.runUpgrades.modifiers.teleportCooldown,this.attachToNode(a,!1,null,null))}if(this.warpReadyAt<=this.currentTime&&this.runUpgrades.modifiers.warpRange>0){const a=this.path.getTeleportTarget(this.attachedIndex,this.runUpgrades.modifiers.warpRange);a>this.attachedIndex+3&&this.playerPosition.x<this.camera.getSafeLeft()+1.6&&(this.warpReadyAt=this.currentTime+this.runUpgrades.modifiers.warpCooldown,this.attachToNode(a,!1,null,null))}if(this.camera.isOutsideVerticalBounds(this.playerPosition,.02)||this.camera.isBehindSafeLine(this.playerPosition)){this.failRun();return}this.resolveAirborneEnemyContact(t)}launch(){if(this.playerState!=="attached"&&this.playerState!=="charging")return!1;const e=this.getResolvedNode(this.attachedIndex),t=this.getOrbitSample(e,this.orbitAngle),i=this.scratchVector.set(t.tangent.x*this.orbitDirection,t.tangent.y*this.orbitDirection,0).normalize(),n=this.scratchVectorB.set(t.position.x,t.position.y,0).normalize(),a=(Math.max(1,t.position.length())*this.angularSpeed*.92+5.2+this.chargeMeter*8.5*(1+this.runUpgrades.modifiers.chargedLeapBonus))*this.momentum.jumpMultiplier*this.runUpgrades.modifiers.jumpPower*(1+this.runUpgrades.modifiers.speedBonus*.35);return this.registerImpactWave(e,this.orbitAngle,a*.92),this.playerVelocity.copy(i.multiplyScalar(a)).addScaledVector(n,a*.08),this.playerState="airborne",this.state=this.choiceMode==="reward_branch"?"upgrade_branching":"running_airborne",this.remainingExtraJumps=Math.max(0,this.runUpgrades.modifiers.extraJumps),this.chargeMeter=0,!0}performAirAction(){if(this.playerState!=="airborne")return!1;if(this.runUpgrades.modifiers.infiniteFlaps||this.remainingExtraJumps>0){this.runUpgrades.modifiers.infiniteFlaps||(this.remainingExtraJumps-=1);const e=4.2+this.runUpgrades.modifiers.jumpPower*1.6;return this.playerVelocity.y=Math.max(this.playerVelocity.y,0)+e,this.playerVelocity.x+=.9+this.momentum.gauge*1.6,!0}return!1}attachToNode(e,t,i,n){const r=this.getResolvedNode(e);this.attachedIndex=e,this.score=Math.max(this.score,e),this.stats.recordLanding(e,r.pathDistance,performance.now()),this.emitScore();let a=this.orbitAngle,o=e===0?-1:this.orbitDirection,l=Math.PI*2/Math.max(1.4,r.gameplayOrbitPeriod);if(t&&i&&n){const h=this.findBestOrbitAttachment(r,i);a=h.angle;const u=h.tangent.dot(this.scratchVector2.set(n.x,n.y));o=u>=0?1:-1;const f=Math.abs(u),p=Math.max(1.2,h.position.length());l=qe(f/p,Math.PI*2/Math.max(1.4,r.gameplayOrbitPeriod)*.72,Math.PI*2/Math.max(1.1,r.gameplayOrbitPeriod)*2.2),this.rewardMomentum(o,f,r),this.registerImpactWave(r,h.angle,n.length())}else a=e===0?Math.PI*.18:0,o=e===0?-1:this.orbitDirection;this.orbitAngle=a,this.orbitDirection=o,this.angularSpeed=l,this.orbitGraceActive=!0,this.orbitGraceProgress=0,this.orbitGraceTravel=0,this.playerState="attached",this.state="running_attached",this.chargeActive=!1,this.chargeMeter=0,this.remainingExtraJumps=Math.max(0,this.runUpgrades.modifiers.extraJumps);const c=this.getOrbitSample(r,this.orbitAngle);this.playerPosition.set(r.resolvedX+c.position.x,r.resolvedY+c.position.y,r.resolvedZ),this.playerVelocity.set(0,0,0),this.collectCoinsOnCurrentNode(r),this.resolveEnemyContact(r),this.currentTime>=this.eventCooldownUntil&&this.resolveNodeEvent(r)}rewardMomentum(e,t,i){const n=qe((t-4.2)/7.5,0,1),r=this.lastLandingDirection!==0&&e!==this.lastLandingDirection,a=.08+n*.16+(r?.18:0)+(i.shapeKind==="triangular"?.03:i.shapeKind==="oval"?.015:0);this.momentum.gauge=qe(this.momentum.gauge+a*(1+this.runUpgrades.modifiers.momentumGain),0,Math.max(1,this.runUpgrades.modifiers.momentumCap)),this.momentum.fillRate=a,this.lastLandingDirection=e}resolveNodeEvent(e){var t;if(e.isMilestone){const i=gs(e.index,this.runUpgrades);this.activeChoices=this.path.createUpgradeBranches(e.index,i,this.score),this.choiceMode="reward_branch",this.state="upgrade_branching",this.eventCooldownUntil=this.currentTime+.2;return}switch(e.eventType){case"shop":{this.shop.openForRun(e.index,this.runUpgrades);const i=this.shop.getActiveOffers().slice(0,3);this.activeChoices=i.map(n=>({mode:"shop_orbit",offer:n.offer,price:n.price,entry:e,previewNodes:[],pathNodes:[]})),this.activeShopAngles=i.map(n=>n.angle),this.choiceMode="shop_orbit",this.state="upgrade_branching",this.eventCooldownUntil=this.currentTime+.2;break}case"treasure":this.stats.addCoins(this.applyCoinBonus(5)),this.startAcquisition(((t=this.activeChoices[0])==null?void 0:t.offer)??this.buildVirtualOffer("Treasure Chest","common","TRE","Gain 5 coins."),"Treasure");break;case"gift":{const i=gs(e.index,this.runUpgrades)[0];i&&this.applyOffer(i,"Gift shard");break}case"rare_item":{const i=gs(Math.max(100,e.index),this.runUpgrades)[0];i&&this.applyOffer(i,"Rare item");break}case"mini_boss":case"boss":this.boss.start(this.currentTime);break;case"boss_weak":this.boss.isWeakPointPhase()&&(this.boss.defeat(),this.stats.addCoins(this.applyCoinBonus(8)),this.fillMomentumBurst(.24));break}}commitRewardBranch(e,t){const i=this.activeChoices[e];return i?(this.path.replaceFuture(this.attachedIndex,i.pathNodes),this.path.ensureAhead(this.attachedIndex+1,50,40),this.path.queuePostMilestoneEvents(this.attachedIndex+i.pathNodes.length,this.attachedIndex+i.pathNodes.length),this.applyOffer(i.offer,t?"Quick choice":"Path chosen"),this.choiceMode="none",this.activeChoices=[],this.state="upgrade_acquired",this.eventCooldownUntil=this.currentTime+.35,!0):!1}applyOffer(e,t){this.runUpgrades=Nm(this.runUpgrades,e.item.id),this.remainingExtraJumps=Math.max(0,this.runUpgrades.modifiers.extraJumps),this.shieldCharges=Math.max(this.shieldCharges,this.runUpgrades.modifiers.shieldCharges),this.startAcquisition(e,t)}startAcquisition(e,t){this.acquisitionStartedAt=this.currentTime,this.acquisition={offer:e,progress:0,subtitle:t}}buildVirtualOffer(e,t,i,n){return{item:{id:`virtual-${i}`,rarity:t,category:"economy",icon:i,unlockScore:0,stackable:!1,maxStacks:1,effects:["virtual"],name:{fr:e,en:e},description:{fr:n,en:n}},stackCount:0}}updateEvents(e,t,i){if(this.boss.update(e,t,this.playerPosition).playerHit&&this.failRun(),this.boss.isWeakPointPhase()){const r=this.findVisibleWeakPoint();r&&this.boss.setWeakPoint(new C(r.resolvedX,r.resolvedY,r.resolvedZ))}this.state==="upgrade_acquired"&&t>=this.eventCooldownUntil&&(this.state=this.playerState==="airborne"?"running_airborne":this.chargeActive?"running_charging":"running_attached"),this.updateAutoFire(t),this.shop.update(new C(i.resolvedX,i.resolvedY,i.resolvedZ),i.gameplayRadius+.7,t)}updateCamera(e,t,i){const n=qe((t.visualScale-2.8)/28,0,1.2),r=t.isGigantic?9.2:0,a=this.choiceMode==="reward_branch"?5.8:this.choiceMode==="shop_orbit"?2.4:this.state==="upgrade_acquired"?1.8:0,o=this.boss.getCameraZoomOffset(),l=(this.boss.isActive()?this.boss.getSpeedPressure():1)*this.momentum.speedMultiplier;this.camera.update({deltaTime:e,state:this.state,score:this.score,currentNode:t,nextNode:i,playerPosition:this.playerPosition,momentumGauge:qe(this.momentum.gauge,0,1),largeShardFactor:n,milestoneZoom:r,choiceZoom:a,bossZoom:o,speedPressure:l*(1-this.runUpgrades.modifiers.timeSlowFactor*.55)})}updateTrail(e){for(let i=this.trailPoints.length-1;i>0;i-=1)this.trailPoints[i].copy(this.trailPoints[i-1]);this.trailPoints[0].copy(this.playerPosition),this.trailPoints.forEach((i,n)=>{this.trailBuffer[n*3]=i.x,this.trailBuffer[n*3+1]=i.y,this.trailBuffer[n*3+2]=i.z});const t=this.playerTrail.geometry.getAttribute("position");t.needsUpdate=!0,this.playerTrail.material.opacity=.24+this.momentum.gauge*.36}syncPlayerVisual(e){this.player.position.copy(this.playerPosition);const t=Math.atan2(this.playerVelocity.y||.001,this.playerVelocity.x||.001);this.player.rotation.z=t,this.playerBody.scale.setScalar(1+this.momentum.gauge*.12+Math.sin(e*8)*.02)}syncMarkers(e){const t=this.getDisplayNodes(14),i=[],n=[];t.forEach(r=>{var a;r.coinSlots.forEach(o=>{o.collected||i.push({position:this.getCoinWorldPosition(r,o.angle,o.orbitScale),scale:.74+o.value*.08,visible:!0})}),(a=r.enemySlot)!=null&&a.alive&&n.push({position:this.getEnemyWorldPosition(r,r.enemySlot.pole),visible:!0,tier:r.enemySlot.tier})}),this.coins.setVisible(this.state!=="idle"&&this.state!=="transition_out"),this.enemies.setVisible(this.state!=="idle"&&this.state!=="transition_out"),this.coins.update(i,e),this.enemies.update(n,e)}fillMomentumBurst(e){this.momentum.gauge=qe(this.momentum.gauge+e*(1+this.runUpgrades.modifiers.momentumGain),0,Math.max(1,this.runUpgrades.modifiers.momentumCap)),this.momentum.fillRate=Math.max(this.momentum.fillRate,e)}collectCoinsOnCurrentNode(e){e.coinSlots.forEach(t=>{t.collected||Math.abs(ps(this.orbitAngle,t.angle))<.16+this.runUpgrades.modifiers.coinMagnet*.08&&(t.collected=!0,this.stats.addCoins(this.applyCoinBonus(t.value)))})}resolveEnemyContact(e){const t=e.enemySlot;if(!t||!t.alive||this.getEnemyWorldPosition(e,t.pole).distanceTo(this.playerPosition)>e.gameplayRadius*.36+.82)return;if(this.playerVelocity.length()>=t.speedThreshold||this.runUpgrades.modifiers.spikeOrbit){t.alive=!1,this.stats.addCoins(this.applyCoinBonus(t.rewardCoins)),this.fillMomentumBurst(.05);return}this.consumeProtectionOrFail()}resolveAirborneEnemyContact(e){for(let t=this.attachedIndex+1;t<=this.attachedIndex+4;t+=1){const i=this.getResolvedNode(t),n=i.enemySlot;if(!n||!n.alive||this.getEnemyWorldPosition(i,n.pole).distanceTo(this.playerPosition)>1.2)continue;this.playerVelocity.length()>=n.speedThreshold*.75||i===e?(n.alive=!1,this.stats.addCoins(this.applyCoinBonus(n.rewardCoins)),this.fillMomentumBurst(.08)):this.consumeProtectionOrFail();return}}consumeProtectionOrFail(){if(this.shieldCharges>0){this.shieldCharges-=1,this.fillMomentumBurst(.04);return}this.failRun()}updateAutoFire(e){if(!(this.runUpgrades.modifiers.autoCannonLevel<=0)&&!(e<this.autoFireReadyAt))for(let t=this.attachedIndex;t<this.attachedIndex+8;t+=1){const i=this.getResolvedNode(t),n=i.enemySlot;if(!(!n||!n.alive||n.tier==="invincible"||this.getEnemyWorldPosition(i,n.pole).distanceTo(this.playerPosition)>8.2)){n.alive=!1,this.stats.addCoins(this.applyCoinBonus(n.rewardCoins)),this.fillMomentumBurst(.04+this.runUpgrades.modifiers.autoCannonLevel*.01),this.autoFireReadyAt=e+Math.max(2.2,5-this.runUpgrades.modifiers.autoCannonLevel*1.1);return}}}applyCoinBonus(e){const t=this.runUpgrades.modifiers.doubleCoin?e*2:e;return Math.max(1,Math.round(t*(1+this.runUpgrades.modifiers.coinBonus)))}failRun(){this.state!=="game_over"&&(this.state="game_over",this.chargeActive=!1,this.choiceMode="none",this.activeChoices=[],this.shop.reset(),this.emitScore())}canCaptureNode(e,t){const i=this.getPhysicalRadius(e)+.92+this.runUpgrades.modifiers.captureRadius,n=this.playerPosition.x-e.resolvedX,r=this.playerPosition.y-e.resolvedY,a=n*n+r*r<=i*i;if(a||!t)return a;const o=t.x-e.resolvedX,l=t.y-e.resolvedY,c=this.playerPosition.x-t.x,h=this.playerPosition.y-t.y,u=c*c+h*h;if(u<=1e-4)return!1;const f=qe(-(o*c+l*h)/u,0,1),p=o+c*f,g=l+h*f;return p*p+g*g<=i*i}findBestOrbitAttachment(e,t){let i=0,n=Number.POSITIVE_INFINITY,r=new xe,a=new xe(1,0);for(let o=0;o<72;o+=1){const l=o/72*Math.PI*2,c=this.getOrbitSample(e,l),h=e.resolvedX+c.position.x,u=e.resolvedY+c.position.y,f=(t.x-h)**2+(t.y-u)**2;f<n&&(n=f,i=l,r=c.position.clone(),a=c.tangent.clone())}return{angle:i,position:r,tangent:a}}getOrbitSample(e,t){const i=li(t),n=e.shapeKind==="round"?0:e.resolvedSpinPhase,r=this.getPhysicalRadius(e)+this.getOrbitClearance(e),a=li(i-n);if(e.shapeKind==="oval"){const c=r*1.46,h=r*.84,u=new xe(Math.cos(i)*c,Math.sin(i)*h),f=new xe(-Math.sin(i)*c,Math.cos(i)*h).normalize();return this.applySurfaceContour(e,a,this.rotateOrbitSample(u,f,n))}if(e.shapeKind==="triangular"){const c=r*1.18,h=[new xe(0,c*1.2),new xe(-c*1.04,-c*.86),new xe(c*1.04,-c*.86)],f=i/(Math.PI*2)*3,p=Math.floor(f)%3,g=f-Math.floor(f),_=h[p],m=h[(p+1)%3],d=_.clone().lerp(m,g),b=m.clone().sub(_).normalize();return this.applySurfaceContour(e,a,this.rotateOrbitSample(d,b,n))}const o=new xe(Math.cos(i)*r,Math.sin(i)*r),l=new xe(-Math.sin(i),Math.cos(i));return this.applySurfaceContour(e,a,this.rotateOrbitSample(o,l,0))}getPhysicalRadius(e){const t=e.shapeKind==="triangular"?1.42:1.25,i=Math.max(e.visualStretch.x,e.visualStretch.y),n=t*e.visualScale*i*.92;return Math.max(e.gameplayRadius,n)}getOrbitClearance(e){const t=e.index===this.attachedIndex&&this.playerState!=="airborne"?qe(this.playerVelocity.length()/16,0,.46):0,i=qe((e.visualScale-3.2)*.085,0,.82);return qe(.28+e.visualScale*.048+i+t,.28,1.48)}applySurfaceContour(e,t,i){const n=1+this.sampleSurfaceDeformation(e,t),r=i.position.clone().normalize();return{position:i.position.multiplyScalar(n),tangent:i.tangent.addScaledVector(r,.12*this.sampleSurfaceSlope(e,t)).normalize()}}sampleSurfaceDeformation(e,t){const i=qe(e.index/280,0,1),n=qe(1.08-e.visualScale*.035,.32,1),r=(.008+i*.03)*n,a=e.shapeKind==="triangular"?3:e.shapeKind==="oval"?2:4;return Math.sin(t*a+e.motionSeed*6.2)*r+Math.sin(t*(a+3)-e.motionSeed*4.1)*r*.42+this.sampleImpactWaveOffset(e,t)+this.sampleBoatWaveOffset(e,t)*n}sampleSurfaceSlope(e,t){return(this.sampleSurfaceDeformation(e,li(t+.06))-this.sampleSurfaceDeformation(e,li(t-.06)))/(.06*2)}sampleImpactWaveOffset(e,t){const i=this.impactWaves.get(e.index);if(!i||i.length===0)return 0;let n=0;const r=[];return i.forEach(a=>{const o=this.currentTime-a.createdAt;if(o>=a.decay)return;const l=1-o/a.decay,c=ps(t,a.originAngle),h=Math.exp(-(c*c)/Math.max(.08,a.radius*a.radius));n+=a.strength*h*l,r.push(a)}),r.length>0?this.impactWaves.set(e.index,r):this.impactWaves.delete(e.index),n}sampleBoatWaveOffset(e,t){if(e.index!==this.attachedIndex||this.playerState==="airborne")return 0;const i=e.shapeKind==="round"?0:e.resolvedSpinPhase,n=li(this.orbitAngle-i),r=li(n-this.orbitDirection*.28),a=ps(t,n),o=ps(t,r),l=this.orbitGraceActive?qe(this.orbitGraceProgress,.15,1):1,c=Math.exp(-(a*a)/.2)*(.05+this.momentum.gauge*.075)*l,h=Math.exp(-(o*o)/.48)*.03*l;return c+h}registerImpactWave(e,t,i){const n=qe(e.index/240,0,1),r=qe(1.04-e.visualScale*.03,.34,1),a=qe((i-4.6)/18,.02,.18)*(.6+n*.4)*r,o={originAngle:li(t),strength:a,radius:.32+qe(i/18,0,.72),decay:1.4+qe(i/16,0,.9),createdAt:this.currentTime},l=this.impactWaves.get(e.index)??[];l.push(o),this.impactWaves.set(e.index,l.slice(-4))}getVisualWaveState(e){const t=this.impactWaves.get(e.index);if(!t||t.length===0)return null;let i=null,n=0;for(const o of t){const l=this.currentTime-o.createdAt;if(l>=o.decay)continue;const c=1-l/o.decay;(!i||c*o.strength>n)&&(i=o,n=c*o.strength)}if(!i)return null;const r=this.currentTime-i.createdAt,a=qe(1-r/i.decay,0,1);return{angle:i.originAngle,strength:i.strength*(.9+a*.9),density:.72+a*.58}}rotateOrbitSample(e,t,i){const n=Math.cos(i),r=Math.sin(i);return{position:new xe(e.x*n-e.y*r,e.x*r+e.y*n),tangent:new xe(t.x*n-t.y*r,t.x*r+t.y*n).normalize()}}getCoinWorldPosition(e,t,i){const n=this.getOrbitSample(e,t);return new C(e.resolvedX+n.position.x*i,e.resolvedY+n.position.y*i,e.resolvedZ)}getEnemyWorldPosition(e,t){const n=this.getOrbitSample(e,t==="north"?Math.PI*.5:Math.PI*1.5).position.clone().normalize().multiplyScalar(this.getPhysicalRadius(e)+.58),r=e.shapeKind==="round"?0:e.resolvedSpinPhase,a=Math.cos(r),o=Math.sin(r);return new C(e.resolvedX+n.x*a-n.y*o,e.resolvedY+n.x*o+n.y*a,e.resolvedZ)}getBranchHints(){if(this.choiceMode==="reward_branch")return this.activeChoices.slice(0,3).map((e,t)=>{const i=e.previewNodes[0]??e.entry;return{slot:t,offer:e.offer,worldPosition:new C(i.x,i.y+(t===1?2.4:t===0?3.2:-3.2),i.z),mode:"reward_branch"}});if(this.choiceMode==="shop_orbit"&&this.activeChoices.length>0){const e=this.getResolvedNode(this.attachedIndex);return this.activeChoices.slice(0,3).map((t,i)=>{const n=this.activeShopAngles[i]??0,r=e.gameplayRadius+2.1;return{slot:i,offer:t.offer,worldPosition:new C(e.resolvedX+Math.cos(n)*r,e.resolvedY+Math.sin(n)*r,e.resolvedZ),mode:"shop_orbit",price:t.price}})}return[]}findVisibleWeakPoint(){for(let e=this.attachedIndex+1;e<this.attachedIndex+18;e+=1){const t=this.getResolvedNode(e);if(t.eventType==="boss_weak")return t}return null}}class tg{constructor(){S(this,"yaw",0);S(this,"radius",26.5);S(this,"yawTarget",0);S(this,"radiusTarget",26.5);S(this,"yawVelocity",0);S(this,"height",2.6);S(this,"pose",new C);S(this,"lookAt",new C)}setRadius(e){this.radius=e,this.radiusTarget=e}orbit(e,t){const i=qe(e,-10,10);this.yawVelocity=qe(this.yawVelocity+i*85e-5,-.032,.032)}update(e,t){return this.yawTarget+=this.yawVelocity,this.yawVelocity=fe(this.yawVelocity,0,11,e),this.yaw=fe(this.yaw,this.yawTarget,10,e),this.radius=fe(this.radius,this.radiusTarget,8,e),this.pose.set(t.x+Math.sin(this.yaw)*this.radius,t.y+this.height,t.z+Math.cos(this.yaw)*this.radius),this.lookAt.copy(t),{position:this.pose.clone(),lookAt:this.lookAt.clone()}}}class ig{constructor(e,t,i){S(this,"element");S(this,"canvas");S(this,"context");S(this,"content");S(this,"progress");S(this,"logo");S(this,"sites",[]);S(this,"cellCache",[]);S(this,"fragments",[]);S(this,"clickCount",0);S(this,"clickThreshold",8);S(this,"fractureIndex",0);S(this,"state","idle");S(this,"opacity",1);S(this,"shatterElapsed",0);S(this,"onBroken",null);S(this,"onHidden",null);S(this,"onPointerDown",e=>{if(this.state!=="idle")return;const t=this.canvas.getBoundingClientRect(),i=e.clientX-t.left,n=e.clientY-t.top;this.addFractureCluster(i,n),this.clickCount+=1,this.progress.style.setProperty("--intro-progress",String(this.clickCount/this.clickThreshold)),this.progress.textContent=`${this.clickCount}/${this.clickThreshold}`,this.clickCount>=this.clickThreshold?this.startShatter():this.draw()});S(this,"resize",()=>{this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.draw()});this.i18n=t,this.theme=i,this.element=document.createElement("div"),this.element.className="intro-layer",this.canvas=document.createElement("canvas"),this.canvas.className="intro-layer__canvas";const n=this.canvas.getContext("2d");if(!n)throw new Error("Canvas 2D context unavailable");this.context=n,this.content=document.createElement("div"),this.content.className="intro-layer__content",this.content.innerHTML=`
      <div class="intro-layer__logo-wrap">
        <img class="intro-layer__logo" alt="Ape Prod logo">
      </div>
      <h1 class="intro-layer__title"></h1>
      <p class="intro-layer__subtitle"></p>
      <div class="intro-layer__progress"></div>
    `,this.logo=this.content.querySelector(".intro-layer__logo"),this.progress=this.content.querySelector(".intro-layer__progress"),this.element.append(this.canvas,this.content),e.appendChild(this.element),this.element.addEventListener("pointerdown",this.onPointerDown),this.i18n.onChange(()=>this.renderText()),this.theme.onChange(()=>this.renderText()),window.addEventListener("resize",this.resize),this.resize(),this.renderText()}get isComplete(){return this.state==="hidden"}update(e){var t;this.state==="shattering"&&(this.shatterElapsed+=e,this.opacity=qe(1-this.shatterElapsed/1.35,0,1),this.fragments.forEach(i=>{i.centerX+=i.velocityX*e,i.centerY+=i.velocityY*e,i.velocityY+=320*e,i.rotation+=i.angularVelocity*e}),this.shatterElapsed>1.4&&(this.state="hidden",this.element.classList.add("is-hidden"),(t=this.onHidden)==null||t.call(this))),this.draw()}addFractureCluster(e,t){const n=this.fractureIndex+1;this.fractureIndex+=1;for(let r=0;r<9;r+=1){const a=r/9*Math.PI*2,o=18+(n*37+r*17)%44,l=Math.sin(n+r*.7)*18,c=Math.cos(n*1.3+r*.5)*18;this.sites.push({x:e+Math.cos(a)*o+l,y:t+Math.sin(a)*o+c,fractureId:n})}this.cellCache=this.sites.map(r=>this.computeCell(r))}computeCell(e){const t=[];for(let r=0;r<18;r+=1){const a=r/18*Math.PI*2;let o=44;for(const l of this.sites){if(l===e)continue;const c=Math.cos(a),h=Math.sin(a),u=l.x-e.x,f=l.y-e.y,p=2*(c*u+h*f),g=u*u+f*f;p>.001&&(o=Math.min(o,g/p))}t.push({x:e.x+Math.cos(a)*Math.max(8,o),y:e.y+Math.sin(a)*Math.max(8,o)})}return t}startShatter(){var e;this.state==="idle"&&(this.state="shattering",this.shatterElapsed=0,this.fragments=this.cellCache.map((t,i)=>{const n=t.reduce((o,l)=>o+l.x,0)/t.length,r=t.reduce((o,l)=>o+l.y,0)/t.length,a=Math.atan2(r-this.canvas.height/2,n-this.canvas.width/2);return{points:t,centerX:n,centerY:r,velocityX:Math.cos(a)*(60+i*2.5),velocityY:Math.sin(a)*(40+i*1.5)-20,angularVelocity:(Math.random()-.5)*4,rotation:0}}),(e=this.onBroken)==null||e.call(this))}draw(){const e=this.canvas.width,t=this.canvas.height,{context:i}=this;i.clearRect(0,0,e,t),i.save(),i.globalAlpha=this.opacity,i.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--color-bg").trim(),i.fillRect(0,0,e,t),this.state==="shattering"?(i.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue("--color-fg").trim(),i.lineWidth=1.1,this.fragments.forEach(n=>{i.save(),i.translate(n.centerX,n.centerY),i.rotate(n.rotation),i.beginPath(),n.points.forEach((r,a)=>{const o=r.x-n.centerX,l=r.y-n.centerY;a===0?i.moveTo(o,l):i.lineTo(o,l)}),i.closePath(),i.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--color-bg").trim(),i.fill(),i.stroke(),i.restore()})):(i.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue("--color-fg").trim(),i.fillStyle="rgba(0, 0, 0, 0)",i.lineWidth=1.2,this.cellCache.forEach(n=>{i.beginPath(),n.forEach((r,a)=>{a===0?i.moveTo(r.x,r.y):i.lineTo(r.x,r.y)}),i.closePath(),i.stroke()})),i.restore()}renderText(){this.content.querySelector(".intro-layer__title").textContent=this.i18n.t("introTitle"),this.content.querySelector(".intro-layer__subtitle").textContent=this.i18n.t("introSubtitle"),this.progress.textContent=`${this.clickCount}/${this.clickThreshold}`,this.progress.style.setProperty("--intro-progress",String(this.clickCount/this.clickThreshold)),this.logo.src=this.theme.current==="dark"?"/assets/images/Logo/LogoApeProdLight.svg":"/assets/images/Logo/LogoApeProdDark.svg"}}const Ts={dark:{color:new Me("#D4BF9B"),emissive:new Me("#D4BF9B")},light:{color:new Me("#393F4A"),emissive:new Me("#393F4A")}};function qo(s,e){const t=new om({color:Ts[s].color.clone(),emissive:Ts[s].emissive.clone(),emissiveIntensity:.12,roughness:.48,metalness:.18,flatShading:!0,transparent:!0,opacity:1});return t.onBeforeCompile=i=>{const n={uTime:{value:0},uHover:{value:0},uDrag:{value:0},uFocus:{value:0},uSettled:{value:0},uSnap:{value:0},uSeed:{value:e},uOrbitAngle:{value:0},uOrbitPulse:{value:0},uWaveDensity:{value:.72}};t.userData.shaderUniforms=n,Object.assign(i.uniforms,n),i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
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
transformed.z *= focusFlatten;`)},t.customProgramCacheKey=()=>`shard-${e}`,t}function tn(s,e){s.color.copy(Ts[e].color),s.emissive.copy(Ts[e].emissive)}function gr(s,e){const t=s.userData.shaderUniforms;t&&(t.uTime.value=e.time,t.uHover.value=e.hover,t.uDrag.value=e.drag,t.uFocus.value=e.focus,t.uSettled.value=e.settled,t.uSnap.value=e.snap,t.uOrbitAngle.value=e.orbitAngle??0,t.uOrbitPulse.value=e.orbitPulse??0,t.uWaveDensity.value=e.waveDensity??.72)}function ng(s,e){const t=new Fn(s,e).toNonIndexed();return Rl(t)}function sg(s,e){const t=new Gr(s,e).toNonIndexed();return Rl(t)}function Rl(s){const e=s.getAttribute("position"),t=new Float32Array(e.count*3),i=new Float32Array(e.count);for(let n=0;n<e.count;n+=3){const r=e.getX(n),a=e.getY(n),o=e.getZ(n),l=e.getX(n+1),c=e.getY(n+1),h=e.getZ(n+1),u=e.getX(n+2),f=e.getY(n+2),p=e.getZ(n+2),g=new C((r+l+u)/3,(a+c+f)/3,(o+h+p)/3).normalize(),_=n/3*.173;for(let m=0;m<3;m+=1){const d=(n+m)*3;t[d]=g.x,t[d+1]=g.y,t[d+2]=g.z,i[n+m]=_}}return s.setAttribute("aFragmentDir",new Ct(t,3)),s.setAttribute("aFragmentPhase",new Ct(i,1)),s}const rg=new C(0,.8,24),ag=new C(0,.2,17.5),Mn=33;class og{constructor(e,t,i,n){S(this,"root",new Ot);S(this,"loader",new um);S(this,"raycaster",new _m);S(this,"dragPlane",new _i(new C(0,0,1),0));S(this,"interactionPlanePoint",new C);S(this,"entities",new Map);S(this,"entityList");S(this,"pickTargets",[]);S(this,"pointer",new xe);S(this,"backgroundPoints");S(this,"focusTargetPosition",new C(0,.1,7.4));S(this,"pivot",new C(0,0,0));S(this,"roundGeometry",ng(1.25,4));S(this,"triangularGeometry",sg(1.42,2));S(this,"constellationLines");S(this,"gameFieldEntities");S(this,"globalOrbitTime",0);S(this,"hoveredId",null);S(this,"focusedId",null);S(this,"draggingId",null);S(this,"activeIndex",0);S(this,"theme");S(this,"focusSettled",!1);S(this,"activeLookAt",new C);S(this,"externalLayoutActive",!1);S(this,"externalLayoutPositions",null);S(this,"externalLayoutScales",null);S(this,"externalLayoutVisuals",null);S(this,"externalTransitionFrom",[]);S(this,"externalTransitionTo",[]);S(this,"externalTransitionProgress",0);S(this,"speedAccentTimer",36);S(this,"speedAccentId",null);S(this,"unlockCallbacks",new Set);S(this,"slotPreviewIds",new Set);this.scene=e,this.slotSystem=i,this.theme=n,this.scene.add(this.root),this.backgroundPoints=this.createBackgroundPoints(),this.scene.add(this.backgroundPoints),this.constellationLines=this.createConstellationLines(),this.entityList=t.map((r,a)=>this.createShard(r,a)),this.gameFieldEntities=Array.from({length:Mn},(r,a)=>this.createGameFieldShard(a))}setTheme(e){this.theme=e,this.entityList.forEach(t=>{tn(t.core.material,e),this.updateLogoTexture(t),t.slotIndicator.material.color.set(e==="dark"?"#D4BF9B":"#393F4A")}),this.gameFieldEntities.forEach(t=>{tn(t.core.material,e)}),this.backgroundPoints.material.color.set(e==="dark"?"#D4BF9B":"#393F4A"),this.constellationLines.forEach(t=>t.material.color.set(e==="dark"?"#D4BF9B":"#393F4A"))}setActiveIndex(e){this.activeIndex=_s(e,this.entityList.length)}setHovered(e){this.hoveredId=e}setFocused(e){this.focusedId=e,this.focusSettled=!1,this.entityList.forEach(t=>{e&&t.project.id===e?t.runtimeState="focus_enter":t.runtimeState!=="dragging"&&(t.runtimeState=t.snapped?"snapped":"orbiting")})}isFocusSettled(){return this.focusSettled}clearFocus(){this.focusedId=null,this.focusSettled=!1,this.entityList.forEach(e=>{e.runtimeState=e.snapped?"snapped":"focus_exit",e.manualRotationY=0})}getFocusedProject(){var e;return this.focusedId&&((e=this.entities.get(this.focusedId))==null?void 0:e.project)||null}getFocusedFacetIndex(){var e;return this.focusedId?((e=this.entities.get(this.focusedId))==null?void 0:e.activeFacet)??0:0}changeFacet(e){if(!this.focusedId)return null;const t=this.entities.get(this.focusedId);return!t||t.facetAnimation.active?null:(t.facetAnimation={active:!0,direction:e,progress:0,swapped:!1},t.project.id)}previewFacetRotation(e){if(!this.focusedId)return;const t=this.entities.get(this.focusedId);!t||t.facetAnimation.active||(t.manualRotationY=Qt.clamp(e*.007,-Math.PI/6,Math.PI/6))}finishFacetRotation(){if(!this.focusedId)return!1;const e=this.entities.get(this.focusedId);if(!e||e.facetAnimation.active)return!1;if(Math.abs(e.manualRotationY)>Math.PI/8){const t=e.manualRotationY>0?1:-1;return e.manualRotationY=0,this.changeFacet(t),!0}return e.manualRotationY=0,!1}beginDrag(e,t){if(this.focusedId)return!1;const i=this.entities.get(e);return!i||i.project.role==="presentation"||!this.slotSystem.getSlotForShard(e)?!1:(this.slotPreviewIds.delete(e),i.snapped&&(i.snapped=!1,this.slotSystem.deactivate(i.project.id)),this.draggingId=e,i.runtimeState="dragging",i.dragOffset.copy(i.group.position).sub(t),i.dragTarget.copy(i.group.position),this.dragPlane.constant=-i.group.position.z,!0)}updateDrag(e){if(!this.draggingId)return 0;const t=this.entities.get(this.draggingId);if(!t)return 0;t.dragTarget.copy(e).add(t.dragOffset),t.dragTarget.z=t.group.position.z;const i=this.slotSystem.getSlotForShard(t.project.id),n=this.slotSystem.getProximity(t.project.id,t.dragTarget);if(i&&n>0){const r=Qt.clamp(.12+n*n*.62,.12,.74);t.dragTarget.x=Qt.lerp(t.dragTarget.x,i.worldPosition.x,r),t.dragTarget.y=Qt.lerp(t.dragTarget.y,i.worldPosition.y,r),t.dragTarget.z=Qt.lerp(t.dragTarget.z,i.worldPosition.z,r)}return n}endDrag(){if(!this.draggingId)return{snapped:!1,unlocked:!1,shardId:null};const e=this.entities.get(this.draggingId),t=this.slotSystem.canSnap(e.project.id,e.dragTarget);let i=!1;t?(e.snapped=!0,e.runtimeState="snapped",e.dragTarget.set(t.worldPosition.x,t.worldPosition.y,t.worldPosition.z),e.velocity.set(0,0,0),this.slotSystem.activate(e.project.id),this.slotSystem.isUnlocked()&&(i=!0,this.unlockCallbacks.forEach(r=>r()))):e.runtimeState="orbiting";const n={snapped:!!t,unlocked:i,shardId:this.draggingId};return this.draggingId=null,n}pick(e,t,i,n){const r=i.getBoundingClientRect();this.pointer.x=(e-r.left)/r.width*2-1,this.pointer.y=-((t-r.top)/r.height)*2+1,this.raycaster.setFromCamera(this.pointer,n);const o=this.raycaster.intersectObjects(this.pickTargets,!1).find(l=>!!l.object.userData.shardId);return o?{shardId:o.object.userData.shardId,point:o.point.clone()}:null}projectPointerToDragPlane(e,t,i,n){const r=i.getBoundingClientRect();return this.pointer.x=(e-r.left)/r.width*2-1,this.pointer.y=-((t-r.top)/r.height)*2+1,this.raycaster.setFromCamera(this.pointer,n),this.raycaster.ray.intersectPlane(this.dragPlane,this.interactionPlanePoint.clone())}getProjectAt(e){var t;return((t=this.entityList[_s(e,this.entityList.length)])==null?void 0:t.project)||null}getPivot(){return this.pivot.clone()}getOrbitCameraPose(){return this.activeLookAt.copy(this.pivot),{position:rg,lookAt:this.activeLookAt.clone()}}getFocusCameraPose(){const e=this.focusedId?this.entities.get(this.focusedId):null;return{position:ag,lookAt:(e==null?void 0:e.group.position.clone())||this.focusTargetPosition.clone()}}getFocusedEntityId(){return this.focusedId}onUnlocked(e){return this.unlockCallbacks.add(e),()=>this.unlockCallbacks.delete(e)}activateSlotPreview(){this.slotPreviewIds.clear(),this.entityList.forEach(e=>{this.slotSystem.getSlotForShard(e.project.id)&&(this.slotPreviewIds.add(e.project.id),e.snapped=!1,!this.focusedId&&e.runtimeState!=="dragging"&&(e.runtimeState="orbiting"))})}activateSlotPreviewForShard(e){if(!this.entities.has(e)||!this.slotSystem.getSlotForShard(e))return;this.slotPreviewIds.add(e);const t=this.entities.get(e);t&&!t.snapped&&!this.focusedId&&t.runtimeState!=="dragging"&&(t.runtimeState="orbiting")}snapShardToSlot(e){const t=this.entities.get(e),i=this.slotSystem.getSlotForShard(e);return!t||!i?!1:(this.slotPreviewIds.delete(e),t.snapped=!0,t.runtimeState="snapped",t.dragTarget.set(i.worldPosition.x,i.worldPosition.y,i.worldPosition.z),t.group.position.set(i.worldPosition.x,i.worldPosition.y,i.worldPosition.z),t.velocity.set(0,0,0),this.slotSystem.activate(e),this.slotSystem.isUnlocked()?(this.unlockCallbacks.forEach(n=>n()),!0):!1)}clearSlotPreview(){this.slotPreviewIds.clear()}getPresentationProjectId(){var e;return((e=this.entityList.find(t=>t.project.role==="presentation"))==null?void 0:e.project.id)??null}getDragThreshold(e){const t=this.entities.get(e);return t?t.project.role==="presentation"?3:t.snapped?4:8:8}getCurrentShardPositions(){return this.entityList.map(e=>e.group.position.clone())}getGameFieldCapacity(){return this.entityList.length+this.gameFieldEntities.length}ensureGameFieldCapacity(e){const t=Math.max(0,e-this.entityList.length);for(;this.gameFieldEntities.length<t;)this.gameFieldEntities.push(this.createGameFieldShard(this.gameFieldEntities.length))}getOrbitPositions(){return this.entityList.map((e,t)=>this.computeOrbitTarget(e,this.globalOrbitTime,t===this.activeIndex))}getSlotPositions(){return this.entityList.map(e=>{const t=this.slotSystem.getSlotForShard(e.project.id);return t?new C(t.worldPosition.x,t.worldPosition.y,t.worldPosition.z):e.group.position.clone()})}beginExternalLayoutTransition(e,t,i){this.externalLayoutActive=!0,this.externalLayoutPositions=null,this.externalLayoutScales=t?[...t]:null,this.externalLayoutVisuals=i?i.map(n=>({scale:n.scale.clone(),shapeKind:n.shapeKind,spinDirection:n.spinDirection,spinSpeed:n.spinSpeed,spinPhase:n.spinPhase,tint:n.tint,pulse:n.pulse,deformAngle:n.deformAngle,deformStrength:n.deformStrength,deformDensity:n.deformDensity})):null,this.externalTransitionFrom=this.getCurrentShardPositions(),this.externalTransitionTo=e.map(n=>n.clone()),this.externalTransitionProgress=0}setExternalLayoutProgress(e){this.externalTransitionProgress=e}setExternalLayoutPositions(e,t,i){this.externalLayoutActive=!0,this.externalLayoutPositions=e.map(n=>n.clone()),this.externalLayoutScales=t?[...t]:null,this.externalLayoutVisuals=i?i.map(n=>({scale:n.scale.clone(),shapeKind:n.shapeKind,spinDirection:n.spinDirection,spinSpeed:n.spinSpeed,spinPhase:n.spinPhase,tint:n.tint,pulse:n.pulse,deformAngle:n.deformAngle,deformStrength:n.deformStrength,deformDensity:n.deformDensity})):null}clearExternalLayout(){this.externalLayoutActive=!1,this.externalLayoutPositions=null,this.externalLayoutScales=null,this.externalLayoutVisuals=null,this.externalTransitionFrom=[],this.externalTransitionTo=[],this.externalTransitionProgress=0,this.gameFieldEntities.forEach(e=>{e.group.visible=!1})}releaseSnappedShards(){this.entityList.forEach(e=>{e.snapped=!1,this.slotSystem.getSlotForShard(e.project.id)&&this.slotSystem.deactivate(e.project.id),!this.focusedId&&e.runtimeState!=="dragging"&&(e.runtimeState="orbiting")})}resetPortfolioState(){this.hoveredId=null,this.focusedId=null,this.draggingId=null,this.focusSettled=!1,this.clearExternalLayout(),this.clearSlotPreview(),this.entityList.forEach(e=>{e.snapped=!1,e.runtimeState="orbiting",e.manualRotationY=0,e.hoverAmount=0,e.dragAmount=0,e.focusAmount=0,e.opacity=1,e.slotPulse=0,e.facetAnimation={active:!1,direction:1,progress:0,swapped:!1},e.dragTarget.copy(e.group.position),e.dragOffset.set(0,0,0),e.velocity.set(0,0,0)}),this.updateConstellationLines()}setVisible(e){this.root.visible=e,this.backgroundPoints.visible=e}update(e,t,i){if(this.globalOrbitTime+=e,this.backgroundPoints.rotation.z+=e*.012,this.backgroundPoints.rotation.y+=e*.02,this.syncLivePivot(t),this.speedAccentTimer-=e,this.speedAccentTimer<=0)if(this.speedAccentId)this.speedAccentId=null,this.speedAccentTimer=28+Math.random()*20;else{const n=this.entityList.filter(a=>a.project.role==="project"),r=n[Math.floor(Math.random()*n.length)];this.speedAccentId=(r==null?void 0:r.project.id)??null,this.speedAccentTimer=8+Math.random()*6}if(this.entityList.forEach((n,r)=>{var x,E,F,O,J,D,N,W,q,X,Y,K,ne;const a=n.project.id===this.focusedId,o=n.project.id===this.draggingId,l=r===this.activeIndex,c=this.slotSystem.getSlotForShard(n.project.id),h=this.slotPreviewIds.has(n.project.id);n.orbitBoostTarget=this.speedAccentId===n.project.id?1.055:1,n.orbitBoost=fe(n.orbitBoost,n.orbitBoostTarget,.55,e);let f=this.computeOrbitTarget(n,t,l),p=l?1.1:1,g=this.focusedId?a?1:.26:1,_=n.snapped?"snapped":"orbiting";if(n.slotPulse=fe(n.slotPulse,c!=null&&c.activated?1:this.slotSystem.getProximity(n.project.id,n.group.position),10,e),c&&(n.slotIndicator.position.set(c.worldPosition.x,c.worldPosition.y,c.worldPosition.z),n.slotIndicator.material.opacity=this.externalLayoutActive?0:n.slotPulse*(c.activated?.82:.52),n.slotIndicator.scale.setScalar(.8+n.slotPulse*.35+Math.sin(t*3+r)*.03)),this.externalLayoutActive){const $=((x=this.externalLayoutVisuals)==null?void 0:x[r])??null;if((E=this.externalLayoutPositions)!=null&&E[r]?f=this.externalLayoutPositions[r]:this.externalTransitionFrom[r]&&this.externalTransitionTo[r]&&(f=this.externalTransitionFrom[r].clone().lerp(this.externalTransitionTo[r],this.externalTransitionProgress)),p=($==null?void 0:$.scale.x)??((F=this.externalLayoutScales)==null?void 0:F[r])??1.02,g=1,_="orbiting",$){n.group.rotation.x=fe(n.group.rotation.x,0,9,e),n.group.rotation.y=fe(n.group.rotation.y,0,9,e),n.group.rotation.z=fe(n.group.rotation.z,$.shapeKind==="round"?0:$.spinPhase,8,e);const V=$.shapeKind==="triangular"?this.triangularGeometry:this.roundGeometry;n.core.geometry!==V&&(n.core.geometry=V),n.group.scale.x=fe(n.group.scale.x,$.scale.x,6,e),n.group.scale.y=fe(n.group.scale.y,$.scale.y,6,e),n.group.scale.z=fe(n.group.scale.z,$.scale.z,6,e),$.tint?(n.core.material.color.set($.tint),n.core.material.emissive.set($.tint)):tn(n.core.material,this.theme)}else n.core.geometry!==this.roundGeometry&&(n.core.geometry=this.roundGeometry,tn(n.core.material,this.theme))}else o?(f=n.dragTarget,p=1.06,_="dragging"):n.snapped?(f=new C(c.worldPosition.x,c.worldPosition.y,c.worldPosition.z),p=1.08,_="snapped"):h&&c?(f=new C(c.worldPosition.x,c.worldPosition.y,c.worldPosition.z),p=1.04,_="snapped"):a&&(f=this.focusTargetPosition,p=2.55,_=i==="focus_exit"?"focus_exit":i==="focus"?"focused":"focus_enter");n.runtimeState==="focus_exit"&&!this.focusedId?(n.focusAmount=fe(n.focusAmount,0,10,e),n.focusAmount<.05&&(n.runtimeState=n.snapped?"snapped":"orbiting")):n.runtimeState=_;const m=o?18:a?14:n.snapped?13:6.5;n.group.position.x=fe(n.group.position.x,f.x,m,e),n.group.position.y=fe(n.group.position.y,f.y,m,e),n.group.position.z=fe(n.group.position.z,f.z,m,e);const d=this.hoveredId===n.project.id&&!this.focusedId&&!o?1:0,b=o?1:0,v=a?1:0;if(n.hoverAmount=fe(n.hoverAmount,d,10,e),n.dragAmount=fe(n.dragAmount,b,12,e),n.focusAmount=fe(n.focusAmount,v,10,e),n.opacity=fe(n.opacity,g,9,e),n.facetAnimation.active){n.facetAnimation.progress=Math.min(1,n.facetAnimation.progress+e*1.8);const $=Math.sin(n.facetAnimation.progress*Math.PI)*Math.PI*.92*n.facetAnimation.direction;n.manualRotationY=$,!n.facetAnimation.swapped&&n.facetAnimation.progress>=.5&&(n.activeFacet=_s(n.activeFacet+n.facetAnimation.direction,n.project.facets.length),n.facetAnimation.swapped=!0),n.facetAnimation.progress>=1&&(n.facetAnimation.active=!1,n.manualRotationY=0)}else n.manualRotationY=fe(n.manualRotationY,0,14,e);const T=a?0:n.group.rotation.x+e*(.11+r*.001),R=a?n.manualRotationY:n.group.rotation.y+e*(.18+r*.002),w=a?0:n.group.rotation.z+e*(.08+r*.0015);this.externalLayoutActive||(n.group.rotation.x=fe(n.group.rotation.x,T,a?12:2,e),n.group.rotation.y=fe(n.group.rotation.y,R,a?12:2,e),n.group.rotation.z=fe(n.group.rotation.z,w,a?12:2,e));const P=a?.06:n.snapped?.96:1;this.externalLayoutActive||(n.core.geometry!==this.roundGeometry&&(n.core.geometry=this.roundGeometry),n.group.scale.x=fe(n.group.scale.x,p,8,e),n.group.scale.y=fe(n.group.scale.y,p,8,e),n.group.scale.z=fe(n.group.scale.z,p*P,8,e)),n.core.material.opacity=n.opacity,n.core.material.emissiveIntensity=.08+n.hoverAmount*.18+(l?.08:0)+n.slotPulse*.06+(((J=(O=this.externalLayoutVisuals)==null?void 0:O[r])==null?void 0:J.pulse)??0);const U=((N=(D=this.externalLayoutVisuals)==null?void 0:D[r])==null?void 0:N.shapeKind)??null;gr(n.core.material,{time:t,hover:n.hoverAmount,drag:n.dragAmount,focus:n.focusAmount,settled:this.externalLayoutActive?U&&U!=="round"?1:0:n.focusAmount*.25,snap:this.externalLayoutActive?0:n.snapped||h?.96+n.slotPulse*.22:0,orbitAngle:((q=(W=this.externalLayoutVisuals)==null?void 0:W[r])==null?void 0:q.deformAngle)??0,orbitPulse:this.externalLayoutActive?((Y=(X=this.externalLayoutVisuals)==null?void 0:X[r])==null?void 0:Y.deformStrength)??0:0,waveDensity:this.externalLayoutActive?((ne=(K=this.externalLayoutVisuals)==null?void 0:K[r])==null?void 0:ne.deformDensity)??.72:n.snapped||h?1.56:.42}),n.logoPlanes.forEach(($,V)=>{const Z=this.externalLayoutActive||this.focusedId?0:n.opacity;$.material.opacity=Z*(.65+V*.1)})}),this.updateGameFieldEntities(e,t),this.updateConstellationLines(),this.focusedId){const n=this.entities.get(this.focusedId);this.focusSettled=!!(n&&Math.abs(n.group.position.x-this.focusTargetPosition.x)<.05&&Math.abs(n.group.position.y-this.focusTargetPosition.y)<.05&&Math.abs(n.group.position.z-this.focusTargetPosition.z)<.05&&Math.abs(n.group.scale.x-2.55)<.05)}else this.focusSettled=!1}updateGameFieldEntities(e,t){if(!this.externalLayoutActive){this.gameFieldEntities.forEach((i,n)=>{if(n>=Mn){i.group.visible=!1;return}const r=i.orbitPhase+t*i.orbitSpeed,a=i.anchor.x+Math.cos(r)*i.orbitRadius,o=i.anchor.y+Math.sin(r*.82)*i.orbitRadius*.9,l=i.anchor.z+Math.sin(r)*i.orbitRadius*.72;i.group.visible=!0,i.group.position.x=fe(i.group.position.x,a,4.6,e),i.group.position.y=fe(i.group.position.y,o,4.6,e),i.group.position.z=fe(i.group.position.z,l,4.6,e),i.group.rotation.x=fe(i.group.rotation.x,i.group.rotation.x+e*.18,2,e),i.group.rotation.y=fe(i.group.rotation.y,i.group.rotation.y+e*.24,2,e),i.group.rotation.z=fe(i.group.rotation.z,i.group.rotation.z+e*.14,2,e),i.group.scale.setScalar(fe(i.group.scale.x,.18+Math.sin(t*1.8+n)*.012,6,e)),i.core.material.opacity=this.focusedId?.1:.22,i.core.material.emissiveIntensity=this.focusedId?.02:.06,tn(i.core.material,this.theme),gr(i.core.material,{time:t,hover:0,drag:0,focus:0,settled:0,snap:0,orbitAngle:r,orbitPulse:.08,waveDensity:.36})});return}this.gameFieldEntities.forEach((i,n)=>{var p,g;const r=this.entityList.length+n,a=this.externalTransitionTo[r]??null,o=((p=this.externalLayoutPositions)==null?void 0:p[r])??(a?i.group.position.clone().lerp(a,this.externalTransitionProgress):null),l=((g=this.externalLayoutVisuals)==null?void 0:g[r])??null;if((!o||!l)&&!a){i.group.visible=!1;return}const c=o??a??i.group.position;i.group.visible=!0,i.group.position.x=fe(i.group.position.x,c.x,7.2,e),i.group.position.y=fe(i.group.position.y,c.y,7.2,e),i.group.position.z=fe(i.group.position.z,c.z,7.2,e),i.group.rotation.x=fe(i.group.rotation.x,0,8,e),i.group.rotation.y=fe(i.group.rotation.y,0,8,e);const h=(l==null?void 0:l.shapeKind)??"round",u=(l==null?void 0:l.scale)??new C(.22,.22,.22);i.group.rotation.z=fe(i.group.rotation.z,h==="round"?0:(l==null?void 0:l.spinPhase)??0,8,e),i.group.scale.x=fe(i.group.scale.x,u.x,6,e),i.group.scale.y=fe(i.group.scale.y,u.y,6,e),i.group.scale.z=fe(i.group.scale.z,u.z,6,e);const f=h==="triangular"?this.triangularGeometry:this.roundGeometry;i.core.geometry!==f&&(i.core.geometry=f),l!=null&&l.tint?(i.core.material.color.set(l.tint),i.core.material.emissive.set(l.tint)):tn(i.core.material,this.theme),i.core.material.opacity=1,i.core.material.emissiveIntensity=.08+((l==null?void 0:l.pulse)??.06),gr(i.core.material,{time:t,hover:0,drag:0,focus:0,settled:h==="round"?0:1,snap:0,orbitAngle:(l==null?void 0:l.deformAngle)??0,orbitPulse:(l==null?void 0:l.deformStrength)??0,waveDensity:(l==null?void 0:l.deformDensity)??.72})})}syncLivePivot(e){const t=this.entityList.find(i=>i.project.role==="presentation");if(!t){this.pivot.set(0,0,0);return}this.pivot.set(t.layoutAnchor.x,t.layoutAnchor.y,t.layoutAnchor.z)}computeOrbitTarget(e,t,i){const n=e.orbitPhase+t*e.orbitSpeed*e.orbitBoost,r=e.layoutAnchor.clone();if(e.project.role==="presentation")return new C(this.pivot.x+Math.cos(n)*1.9,this.pivot.y+Math.sin(n*.85)*.72,this.pivot.z+Math.sin(n)*2.6+(i?.35:0));if(e.project.role==="hint")return new C(this.pivot.x+Math.sin(n*.42)*.45,this.pivot.y+Math.cos(n)*5.05,this.pivot.z+Math.sin(n)*4.2+(i?.24:0));const o=Math.atan2(r.y,r.x||1e-4)+n,l=4.1+Math.abs(r.x)*.6+Math.abs(r.y)*.2,c=Qt.clamp(r.y*.05,-.36,.36),h=Math.cos(o)*l,u=Math.sin(o)*l,f=new C(this.pivot.x+h,this.pivot.y+r.y*.78+Math.sin(o*1.1+e.orbitHeight)*.55+u*c*.16,this.pivot.z+u+r.z*.45);return i&&(f.z+=.38),f}createShard(e,t){const i=new Ot,n=xm(t),r=new C(n.x,n.y,n.z),a=Math.max(1,this.slotSystem.getSlots().length);i.position.copy(r),this.root.add(i);const o=this.roundGeometry,l=qo(this.theme,t*17+11),c=new gt(o,l);c.userData.shardId=e.id,i.add(c),this.pickTargets.push(c);const h=new gt(new zr(1,1.18,36),new ti({color:this.theme==="dark"?"#D4BF9B":"#393F4A",transparent:!0,opacity:0,side:qt,depthWrite:!1}));h.visible=!0,this.root.add(h);const u={project:e,group:i,core:c,logoPlanes:[],layoutAnchor:r,orbitRadius:r.length(),orbitPhase:t/a*Math.PI*2,orbitSpeed:e.role==="presentation"?.34:e.role==="hint"?.58:.38+t*.012,orbitBoost:1,orbitBoostTarget:1,orbitHeight:t*.9,orbitDepth:t*.55,velocity:new C,dragTarget:new C,dragOffset:new C,hoverAmount:0,dragAmount:0,focusAmount:0,opacity:1,activeFacet:0,runtimeState:"orbiting",snapped:!1,slotIndicator:h,slotPulse:0,manualRotationY:0,facetAnimation:{active:!1,direction:1,progress:0,swapped:!1}};return this.entities.set(e.id,u),this.createLogoPlanes(u),u}createGameFieldShard(e){const t=new Ot;t.visible=!1,this.root.add(t);const i=qo(this.theme,900+e*23),n=new gt(this.roundGeometry,i);t.add(n);const r=this.getGameFieldAnchor(e);return{group:t,core:n,anchor:r,orbitPhase:e*.37,orbitSpeed:.32+e%7*.018,orbitRadius:.22+e%4*.06}}getGameFieldAnchor(e){if(e>=Mn)return new C(0,0,0);const t=Math.ceil(Mn/2),i=e<t,n=i?e:e-t,r=i?t:Mn-t,o=(r<=1?0:n/(r-1))*2-1,l=.38+Math.abs(o)*.78,c=o*10.8,h=(i?1:-1)*o*6.6*l,u=(i?1:-1)*o*4.2;return new C(c,h,u)}createLogoPlanes(e){const t=this.theme==="dark"?e.project.logo.dark:e.project.logo.light,i=1.7*e.project.logo.scale,n=[0,Math.PI*(2/3),Math.PI*(4/3)];this.loader.load(t,r=>{r.colorSpace=ht,r.anisotropy=4,n.forEach(a=>{const o=new Rs(i,i,12,12),l=o.attributes.position;for(let u=0;u<l.count;u+=1){const f=l.getX(u),p=l.getY(u),g=Math.sqrt(f*f+p*p)/(i*.7);l.setZ(u,Math.sin(g*Math.PI*.5)*.22)}o.computeVertexNormals();const c=new ti({map:r,transparent:!0,opacity:e.project.logo.opacity,side:qt,depthWrite:!1}),h=new gt(o,c);h.position.set(Math.sin(a)*1.48,0,Math.cos(a)*1.48),h.lookAt(0,0,0),h.userData.shardId=e.project.id,e.group.add(h),e.logoPlanes.push(h),this.pickTargets.push(h)})})}updateLogoTexture(e){const t=this.theme==="dark"?e.project.logo.dark:e.project.logo.light;this.loader.load(t,i=>{i.colorSpace=ht,e.logoPlanes.forEach(n=>{n.material.map=i,n.material.needsUpdate=!0})})}createBackgroundPoints(){const e=new St,t=new Float32Array(240*3);for(let i=0;i<240;i+=1){const n=26+Math.random()*20,r=Math.random()*Math.PI*2,a=(Math.random()-.5)*18;t[i*3]=Math.cos(r)*n,t[i*3+1]=a,t[i*3+2]=Math.sin(r)*6-8}return e.setAttribute("position",new Ct(t,3)),new am(e,new Tl({color:this.theme==="dark"?"#D4BF9B":"#393F4A",size:.08,transparent:!0,opacity:.35}))}createConstellationLines(){const e=()=>{const t=new St;t.setAttribute("position",new ot([],3));const i=new Or({color:this.theme==="dark"?"#D4BF9B":"#393F4A",transparent:!0,opacity:.9}),n=new Ar(t,i);return this.root.add(n),n};return[e(),e(),e()]}updateConstellationLines(){if(this.externalLayoutActive){this.constellationLines.forEach(i=>{i.visible=!1});return}const e=this.slotSystem.getSlots();[[e[1],e[2],e[0],e[6],e[5]],[e[3],e[4],e[0],e[8],e[7]],[e[0],e[9]]].forEach((i,n)=>{const r=i.filter(Boolean).filter(l=>l.activated).map(l=>l.worldPosition),a=this.constellationLines[n];if(r.length<2){a.visible=!1,a.geometry.setAttribute("position",new ot([],3));return}const o=new Float32Array(r.length*3);r.forEach((l,c)=>{o[c*3]=l.x,o[c*3+1]=l.y,o[c*3+2]=l.z}),a.visible=!0,a.geometry.setAttribute("position",new Ct(o,3)),a.geometry.computeBoundingSphere()})}}class Xr{constructor(e){S(this,"slots");this.slots=e.map((t,i,n)=>({shardId:t,worldPosition:Xr.computePosition(i,n.length),snapRadius:3.05,activated:!1}))}static computePosition(e,t){return ym(e<t?e:0)}getSlots(){return this.slots}getSlotForShard(e){return this.slots.find(t=>t.shardId===e)||null}getProximity(e,t){const i=this.getSlotForShard(e);if(!i||i.activated)return 0;const n=No(i.worldPosition,t);return Math.max(0,1-n/(i.snapRadius*2.75))}canSnap(e,t){const i=this.getSlotForShard(e);return!i||i.activated?null:No(i.worldPosition,t)<=i.snapRadius?i:null}activate(e){const t=this.getSlotForShard(e);return t?(t.activated=!0,t):null}deactivate(e){const t=this.getSlotForShard(e);return t?(t.activated=!1,t):null}reset(){this.slots.forEach(e=>{e.activated=!1})}isUnlocked(){return this.slots.every(e=>e.activated)}}class lg{constructor(e,t,i,n,r){S(this,"pointerDown",!1);S(this,"downX",0);S(this,"downY",0);S(this,"lastX",0);S(this,"lastY",0);S(this,"dragged",!1);S(this,"sceneOrbiting",!1);S(this,"downShardId",null);S(this,"focusGesture",!1);S(this,"onPointerDown",e=>{const t=this.getMode();if(t==="intro"||t==="intro_shattering"||t==="intro_transition"||t==="about_section"||t==="game_transition"||t==="game"||t==="game_over")return;this.pointerDown=!0,this.dragged=!1,this.sceneOrbiting=!1,this.focusGesture=!1,this.downX=e.clientX,this.downY=e.clientY,this.lastX=e.clientX,this.lastY=e.clientY,this.canvas.setPointerCapture(e.pointerId);const i=this.world.pick(e.clientX,e.clientY,this.canvas,this.camera);this.downShardId=(i==null?void 0:i.shardId)||null,!(t==="focus"||t==="focus_facet_transition"||t==="focus_enter")&&i&&this.callbacks.onHover(i.shardId)});S(this,"onPointerMove",e=>{const t=this.getMode(),i=e.clientX-this.downX,n=e.clientY-this.downY,r=e.clientX-this.lastX,a=e.clientY-this.lastY,o=Math.hypot(i,n);if(!this.pointerDown){if(t==="orbit"||t==="dragging"||t==="constellation_complete"){const c=this.world.pick(e.clientX,e.clientY,this.canvas,this.camera);this.callbacks.onHover((c==null?void 0:c.shardId)||null)}return}if(t==="focus"||t==="focus_enter"){Math.abs(i)>12&&Math.abs(i)>Math.abs(n)&&(this.focusGesture=!0,this.callbacks.onFocusRotation(i));return}const l=this.downShardId?this.world.getDragThreshold(this.downShardId):8;if((t==="orbit"||t==="constellation_complete"||t==="dragging")&&this.downShardId&&o>l){const c=this.world.projectPointerToDragPlane(e.clientX,e.clientY,this.canvas,this.camera);if(!c)return;this.dragged||(this.dragged=this.callbacks.onDragStart(this.downShardId,c)),this.dragged&&this.callbacks.onDragMove(c);return}(t==="orbit"||t==="constellation_complete")&&!this.downShardId&&o>4&&(this.sceneOrbiting=!0,this.callbacks.onSceneOrbitMove(r,a)),this.lastX=e.clientX,this.lastY=e.clientY});S(this,"onPointerUp",e=>{const t=this.getMode(),i=Math.hypot(e.clientX-this.downX,e.clientY-this.downY);if(this.canvas.hasPointerCapture(e.pointerId)&&this.canvas.releasePointerCapture(e.pointerId),this.dragged){this.callbacks.onDragEnd(),this.reset();return}if(t==="focus"||t==="focus_enter"){if(this.focusGesture)this.callbacks.onFocusRotationEnd();else{const n=this.world.pick(e.clientX,e.clientY,this.canvas,this.camera);n&&n.shardId===this.world.getFocusedEntityId()?this.callbacks.onFocusSideTap(e.clientX<window.innerWidth/2?"left":"right"):this.callbacks.onBackgroundClick()}this.reset();return}if(this.sceneOrbiting){this.reset();return}if((t==="orbit"||t==="constellation_complete")&&i<=8){const n=this.world.pick(e.clientX,e.clientY,this.canvas,this.camera);n?this.callbacks.onShardClick(n.shardId):this.callbacks.onHover(null)}this.reset()});S(this,"onPointerLeave",()=>{this.dragged&&this.callbacks.onDragEnd(),this.callbacks.onHover(null),this.reset()});this.canvas=e,this.camera=t,this.world=i,this.getMode=n,this.callbacks=r,this.canvas.addEventListener("pointerdown",this.onPointerDown),this.canvas.addEventListener("pointermove",this.onPointerMove),this.canvas.addEventListener("pointerup",this.onPointerUp),this.canvas.addEventListener("pointerleave",this.onPointerLeave)}reset(){this.pointerDown=!1,this.dragged=!1,this.sceneOrbiting=!1,this.focusGesture=!1,this.downShardId=null,this.lastX=0,this.lastY=0}}const cg={dark:{background:new Me("#393F4A"),foreground:new Me("#D4BF9B")},light:{background:new Me("#D4BF9B"),foreground:new Me("#393F4A")}};class hg{constructor(e){S(this,"scene",new rm);S(this,"camera",new Ft(42,1,.1,200));S(this,"renderer",new El({antialias:!0,alpha:!0,powerPreference:"high-performance"}));S(this,"cameraTarget",new C(0,.5,24));S(this,"cameraCurrent",new C(0,.5,24));S(this,"lookTarget",new C(0,0,0));S(this,"lookCurrent",new C(0,0,0));S(this,"ambientLight",new gm(16777215,.95));S(this,"keyLight",new mm(16777215,1.4));S(this,"rimLight",new fm(16777215,25,80,2));S(this,"cameraPositionResponse",8);S(this,"lookResponse",8);S(this,"resize",()=>{const e=this.host.clientWidth||window.innerWidth,t=this.host.clientHeight||window.innerHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1)});this.host=e,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.domElement.className="app-canvas",this.host.appendChild(this.renderer.domElement),this.keyLight.position.set(12,10,16),this.rimLight.position.set(0,-6,22),this.scene.add(this.ambientLight,this.keyLight,this.rimLight),this.resize(),this.setTheme("dark"),window.addEventListener("resize",this.resize)}setTheme(e){const t=cg[e];this.scene.background=t.background.clone(),this.ambientLight.color.copy(t.foreground),this.keyLight.color.copy(t.foreground),this.rimLight.color.copy(t.foreground)}setCameraTarget(e,t){this.cameraTarget.copy(e),this.lookTarget.copy(t)}setCameraResponse(e,t=e){this.cameraPositionResponse=Math.max(1,e),this.lookResponse=Math.max(1,t)}update(e){this.cameraCurrent.x=fe(this.cameraCurrent.x,this.cameraTarget.x,this.cameraPositionResponse,e),this.cameraCurrent.y=fe(this.cameraCurrent.y,this.cameraTarget.y,this.cameraPositionResponse,e),this.cameraCurrent.z=fe(this.cameraCurrent.z,this.cameraTarget.z,this.cameraPositionResponse,e),this.lookCurrent.x=fe(this.lookCurrent.x,this.lookTarget.x,this.lookResponse,e),this.lookCurrent.y=fe(this.lookCurrent.y,this.lookTarget.y,this.lookResponse,e),this.lookCurrent.z=fe(this.lookCurrent.z,this.lookTarget.z,this.lookResponse,e),this.rimLight.position.z=this.cameraCurrent.z-2,this.camera.position.copy(this.cameraCurrent),this.camera.lookAt(this.lookCurrent)}render(){this.renderer.render(this.scene,this.camera)}projectWorldToScreen(e){const t=e.clone().project(this.camera);return{x:(t.x+1)*.5*(this.host.clientWidth||window.innerWidth),y:(1-t.y)*.5*(this.host.clientHeight||window.innerHeight),visible:t.z>=-1&&t.z<=1}}}const nn={title:{fr:"À propos",en:"About"},paragraphs:[{fr:"Passionné par la création sous toutes ses formes, je combine développement web, réalisation audiovisuelle, montage vidéo et design graphique pour donner vie à des projets uniques.",en:"Passionate about creation in all its forms, I combine web development, audiovisual production, video editing, and graphic design to bring unique projects to life."},{fr:"Mon approche multidisciplinaire me permet de créer des expériences complètes, de la conception à la réalisation.",en:"My multidisciplinary approach allows me to create complete experiences, from concept to delivery."}],skills:[{title:{fr:"Développement",en:"Development"},body:{fr:"JavaScript, React, Three.js, Node.js, Ruby on Rails",en:"JavaScript, React, Three.js, Node.js, Ruby on Rails"}},{title:{fr:"Réalisation",en:"Production"},body:{fr:"Direction artistique, scénarisation, storyboarding",en:"Art direction, scriptwriting, storyboarding"}},{title:{fr:"Vidéo",en:"Video"},body:{fr:"Montage, motion design, VFX, color grading",en:"Editing, motion design, VFX, color grading"}},{title:{fr:"Graphisme",en:"Design"},body:{fr:"UI/UX, branding, illustration, design system",en:"UI/UX, branding, illustration, design systems"}}],contactTitle:{fr:"Contact",en:"Contact"},contactText:{fr:"Intéressé par une collaboration ? N’hésitez pas à me contacter.",en:"Interested in collaborating? Feel free to reach out."}},ug=[{id:"email",href:"mailto:contact.bheall@gmail.com",label:{fr:"Email",en:"Email"}},{id:"github",href:"https://github.com/orgs/ApeProd",label:{fr:"GitHub",en:"GitHub"}},{id:"x",href:"https://x.com/BhealLfr",label:{fr:"X",en:"X"}}];class dg{constructor(e,t){S(this,"element");S(this,"panel");S(this,"closeButton");S(this,"isOpen",!1);S(this,"onClose",null);this.i18n=t,this.element=document.createElement("div"),this.element.className="about-layer",this.panel=document.createElement("div"),this.panel.className="about-layer__panel",this.panel.dataset.uiInteractive="true",this.closeButton=document.createElement("button"),this.closeButton.className="about-layer__close",this.closeButton.type="button",this.closeButton.addEventListener("click",()=>this.close()),this.panel.appendChild(this.closeButton),this.element.appendChild(this.panel),this.element.addEventListener("click",i=>{i.target===this.element&&this.close()}),e.appendChild(this.element),this.i18n.onChange(i=>this.render(i)),this.render(this.i18n.current)}open(){this.isOpen=!0,this.element.classList.add("is-open")}close(){var e;this.isOpen&&(this.isOpen=!1,this.element.classList.remove("is-open"),(e=this.onClose)==null||e.call(this))}get opened(){return this.isOpen}render(e){this.closeButton.textContent=this.i18n.t("close");const t=nn.skills.map(r=>`
          <article class="about-layer__skill">
            <h3>${r.title[e]}</h3>
            <p>${r.body[e]}</p>
          </article>
        `).join(""),i=ug.map(r=>`
          <a class="about-layer__link" href="${r.href}" target="${r.id==="email"?"_self":"_blank"}" rel="noopener">
            ${r.label[e]}
          </a>
        `).join("");this.panel.innerHTML=`
      <button class="about-layer__close" type="button">${this.i18n.t("close")}</button>
      <h2>${nn.title[e]}</h2>
      <p>${nn.paragraphs[0][e]}</p>
      <p>${nn.paragraphs[1][e]}</p>
      <div class="about-layer__skills">${t}</div>
      <h3>${nn.contactTitle[e]}</h3>
      <p>${nn.contactText[e]}</p>
      <div class="about-layer__links">${i}</div>
    `;const n=this.panel.querySelector(".about-layer__close");n&&n.addEventListener("click",()=>this.close())}}class fg{constructor(e,t,i){S(this,"element");S(this,"panel");S(this,"project",null);S(this,"facetIndex",0);S(this,"currentSlide",0);S(this,"gridView",!1);S(this,"callbacks");this.i18n=t,this.callbacks=i,this.element=document.createElement("div"),this.element.className="focus-layer",this.panel=document.createElement("div"),this.panel.className="focus-layer__panel",this.panel.dataset.uiInteractive="true",this.element.appendChild(this.panel),e.appendChild(this.element),this.element.addEventListener("click",n=>{n.target===this.element&&this.callbacks.onClose()}),this.i18n.onChange(()=>this.render())}show(e,t){this.project=e,this.facetIndex=t,this.currentSlide=0,this.gridView=!1,this.render(),this.element.classList.add("is-visible")}hide(){this.element.classList.remove("is-visible"),this.project=null}updateFacet(e){this.facetIndex=e,this.currentSlide=0,this.gridView=!1,this.render()}render(){var o,l;if(!this.project){this.panel.innerHTML="";return}const e=this.i18n.current,t=this.project.facets[this.facetIndex],i=t.images.slice(0,12),n=i[this.currentSlide]||"";this.panel.innerHTML=`
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
    `}renderLinks(){if(!this.project)return"";const e=this.project.facets[this.facetIndex],t=Object.entries(e.links).filter(([,i])=>i);return t.length===0?`<span class="focus-layer__empty">${this.i18n.t("links")}</span>`:t.map(([i,n])=>`<a class="focus-layer__link" href="${n}" target="_blank" rel="noopener">${i.toUpperCase()}</a>`).join("")}bindMediaEvents(e){if(e.length<=1)return;const t=this.panel.querySelector(".focus-layer__image"),i=this.panel.querySelectorAll(".focus-layer__slide-nav"),n=this.panel.querySelectorAll(".focus-layer__thumb");t==null||t.addEventListener("click",()=>{this.gridView=!0,this.render()}),i.forEach(r=>r.addEventListener("click",()=>{const a=Number(r.dataset.slideDir)||0;this.currentSlide=(this.currentSlide+a+e.length)%e.length,this.render()})),n.forEach(r=>r.addEventListener("click",()=>{this.currentSlide=Number(r.dataset.slide)||0,this.gridView=!1,this.render()}))}}class pg{constructor(e,t){S(this,"element");S(this,"titleElement");S(this,"bodyElement");S(this,"currentStep","intro");this.host=e,this.i18n=t,this.element=document.createElement("div"),this.element.className="guide-bubble",this.titleElement=document.createElement("p"),this.titleElement.className="guide-bubble__title",this.bodyElement=document.createElement("p"),this.bodyElement.className="guide-bubble__body",this.element.append(this.titleElement,this.bodyElement),this.host.appendChild(this.element),this.i18n.onChange(()=>this.render()),this.render()}setStep(e){e!==this.currentStep&&(this.currentStep=e,this.render())}render(){const e=this.currentStep==="unlocked"?this.i18n.t("unlocked"):this.i18n.t("home"),t={intro:this.i18n.t("introHint"),orbit:this.i18n.t("orbitHint"),focus:this.i18n.t("focusHint"),drag:this.i18n.t("dragHint"),slots:this.i18n.t("slotHint"),unlocked:this.i18n.t("unlockedHint")}[this.currentStep];this.titleElement.textContent=e,this.bodyElement.textContent=t}}const mg={fr:{theme:"Thème",language:"Langue",about:"About / Outro",backToOrbit:"Retour à l’orbite",unlocked:"Mini-jeu débloqué",locked:"Mini-jeu verrouillé",close:"Fermer",previous:"Précédent",next:"Suivant",technologies:"Technologies",links:"Liens",media:"Médias",clickToGrid:"Cliquez sur le média pour afficher la grille.",introTitle:"Portfolio",introSubtitle:"Bilel Kharbouche",introHint:"Cliquez plusieurs fois pour fissurer la surface.",orbitHint:"Cliquez une shard pour la mettre en focus.",focusHint:"Glissez horizontalement ou utilisez les flèches pour changer de facette.",dragHint:"Faites glisser une shard hors focus pour chercher sa place secrète.",slotHint:"La bonne place réagit quand la bonne shard s’en approche.",unlockedHint:"Toutes les shards sont placées. Le mini-jeu est prêt à être branché.",aboutTitle:"About / Outro",home:"Accueil",gameScore:"Score",gameBest:"Meilleur score",gameBestDistance:"Meilleure distance",gameChain:"Chaîne",gameMomentum:"Momentum",gameCharge:"Charge",gameDistance:"Distance",gameCoins:"Pièces",gameSplits:"Splits",gameRestart:"Recommencer",gamePortfolio:"Portfolio",gameStatusTransition:"Le chemin s’aligne.",gameStatusRunning:"Maintenez bas pour charger. Haut pour sauter.",gameStatusUpgrade:"Sautez vers une branche pour choisir votre item.",gameStatusGameOver:"Run terminée.",gameUpgradeTitle:"Choisissez une amélioration",gameUpgradeHint:"Sautez vers une branche. 1, 2, 3 restent disponibles en secours.",gameShopTitle:"Marché orbital",gameShopHint:"Tournez autour de la shard pour acheter une offre.",gamePathLeft:"Voie gauche",gamePathCenter:"Voie centrale",gamePathRight:"Voie droite",gamePathUpper:"Voie haute",gamePathForward:"Voie frontale",gamePathLower:"Voie basse",gameShopOffer:"Offre orbitale",gamePrice:"Prix",gameOverTitle:"Game Over",gameOverBody:"La caméra vous a dépassé ou la trajectoire a été manquée.",gameAcquired:"Objet acquis"},en:{theme:"Theme",language:"Language",about:"About / Outro",backToOrbit:"Back to orbit",unlocked:"Mini-game unlocked",locked:"Mini-game locked",close:"Close",previous:"Previous",next:"Next",technologies:"Technologies",links:"Links",media:"Media",clickToGrid:"Click the media to open the grid.",introTitle:"Portfolio",introSubtitle:"Bilel Kharbouche",introHint:"Click repeatedly to fracture the surface.",orbitHint:"Click a shard to focus it.",focusHint:"Swipe or drag horizontally to change facets.",dragHint:"Drag a shard outside focus to look for its hidden slot.",slotHint:"The correct slot reacts when the correct shard gets close.",unlockedHint:"All shards are placed. The mini-game hook is ready.",aboutTitle:"About / Outro",home:"Home",gameScore:"Score",gameBest:"Best",gameBestDistance:"Best distance",gameChain:"Chain",gameMomentum:"Momentum",gameCharge:"Charge",gameDistance:"Distance",gameCoins:"Coins",gameSplits:"Splits",gameRestart:"Restart",gamePortfolio:"Portfolio",gameStatusTransition:"Aligning the path.",gameStatusRunning:"Hold Down to charge. Press Up to jump.",gameStatusUpgrade:"Jump into a branch to claim an item.",gameStatusGameOver:"Run over.",gameUpgradeTitle:"Choose an upgrade",gameUpgradeHint:"Jump into a branch. 1, 2, 3 remain available as fallback.",gameShopTitle:"Orbital market",gameShopHint:"Rotate around the shard to buy one offer.",gamePathLeft:"Left path",gamePathCenter:"Center path",gamePathRight:"Right path",gamePathUpper:"Upper path",gamePathForward:"Forward path",gamePathLower:"Lower path",gameShopOffer:"Orbital offer",gamePrice:"Price",gameOverTitle:"Game Over",gameOverBody:"The camera overtook you or the jump line was lost.",gameAcquired:"Item acquired"}};class gg{constructor(){S(this,"language");S(this,"listeners",new Set);const e=window.localStorage.getItem("portfolio-language");this.language=e==="en"?"en":"fr",document.documentElement.lang=this.language}get current(){return this.language}toggle(){this.language=this.language==="fr"?"en":"fr",window.localStorage.setItem("portfolio-language",this.language),document.documentElement.lang=this.language,this.listeners.forEach(e=>e(this.language))}t(e){return mg[this.language][e]}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}}class _g{constructor(e,t,i,n){S(this,"element");S(this,"topbar");S(this,"activeChip");S(this,"themeButton");S(this,"languageButton");S(this,"aboutButton");S(this,"homeButton");S(this,"unlockChip");S(this,"dots",[]);this.i18n=t,this.content=i,this.element=document.createElement("div"),this.element.className="navigation-hud",this.topbar=document.createElement("div"),this.topbar.className="navigation-hud__topbar",this.activeChip=document.createElement("div"),this.activeChip.className="navigation-hud__chip",this.themeButton=this.createButton(()=>n.onThemeToggle()),this.languageButton=this.createButton(()=>n.onLanguageToggle()),this.aboutButton=this.createButton(()=>n.onAboutToggle()),this.homeButton=this.createButton(()=>n.onHome()),this.unlockChip=document.createElement("div"),this.unlockChip.className="navigation-hud__chip navigation-hud__chip--status",this.topbar.append(this.activeChip,this.homeButton,this.themeButton,this.languageButton,this.aboutButton,this.unlockChip);const r=document.createElement("div");r.className="navigation-hud__rail",this.content.getProjects().forEach((a,o)=>{const l=document.createElement("button");l.className="navigation-hud__dot",l.type="button",l.addEventListener("click",()=>n.onProjectSelect(o)),r.appendChild(l),this.dots.push(l)}),this.element.append(this.topbar,r),e.appendChild(this.element),this.i18n.onChange(()=>this.renderStatic()),this.renderStatic()}setActiveProject(e,t){const i=this.content.getProjectByOrder(e);this.activeChip.textContent=i?i.title[t]:"",this.dots.forEach((n,r)=>{var a;n.classList.toggle("is-active",r===e),n.title=((a=this.content.getProjectByOrder(r))==null?void 0:a.title[t])||""})}setUnlocked(e){this.unlockChip.textContent=e?this.i18n.t("unlocked"):this.i18n.t("locked"),this.unlockChip.classList.toggle("is-unlocked",e)}setAboutOpen(e){this.aboutButton.classList.toggle("is-active",e)}createButton(e){const t=document.createElement("button");return t.className="navigation-hud__button",t.type="button",t.addEventListener("click",e),t}renderStatic(){this.themeButton.textContent=this.i18n.t("theme"),this.languageButton.textContent=this.i18n.t("language"),this.aboutButton.textContent=this.i18n.t("about"),this.homeButton.textContent=this.i18n.t("home")}}class vg{constructor(){S(this,"theme");S(this,"listeners",new Set);const e=window.localStorage.getItem("portfolio-theme");e==="dark"||e==="light"?this.theme=e:this.theme=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",this.applyTheme()}get current(){return this.theme}toggle(){this.theme=this.theme==="dark"?"light":"dark",this.applyTheme()}set(e){e!==this.theme&&(this.theme=e,this.applyTheme())}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}applyTheme(){document.documentElement.dataset.theme=this.theme,window.localStorage.setItem("portfolio-theme",this.theme),this.listeners.forEach(e=>e(this.theme))}}const xg={intro:["intro_shattering"],intro_shattering:["intro_transition"],intro_transition:["orbit"],orbit:["dragging","focus_enter","about_section","constellation_complete","game_transition"],dragging:["orbit","constellation_complete","game_transition"],focus_enter:["focus","focus_exit"],focus:["focus_facet_transition","focus_exit"],focus_facet_transition:["focus"],focus_exit:["orbit","constellation_complete"],about_section:["orbit","constellation_complete"],constellation_complete:["focus_enter","about_section","orbit","game_transition"],game_transition:["game","orbit","constellation_complete"],game:["game_over","orbit","game_transition"],game_over:["game","orbit","game_transition"]};class yg{constructor(){S(this,"mode","intro");S(this,"listeners",new Set)}get current(){return this.mode}is(e){return this.mode===e}canTransition(e){return e===this.mode?!0:xg[this.mode].includes(e)}setMode(e){if(!this.canTransition(e))throw new Error(`Invalid mode transition from ${this.mode} to ${e}`);if(e===this.mode)return;const t=this.mode;this.mode=e,this.listeners.forEach(i=>i(e,t))}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}}class Sg{constructor(e){S(this,"running",!1);S(this,"frameId",0);S(this,"lastTime",0);S(this,"tick",e=>{if(!this.running)return;const t=Math.min((e-this.lastTime)/1e3,.1);this.lastTime=e,this.onFrame(t,e/1e3),this.frameId=requestAnimationFrame(this.tick)});this.onFrame=e}start(){this.running||(this.running=!0,this.lastTime=performance.now(),this.frameId=requestAnimationFrame(this.tick))}stop(){this.running=!1,cancelAnimationFrame(this.frameId)}}const Mg={linear:s=>s,easeOutCubic:s=>1-Math.pow(1-s,3),easeInOutCubic:s=>s<.5?4*s*s*s:1-Math.pow(-2*s+2,3)/2,easeOutQuint:s=>1-Math.pow(1-s,5)};class bg{constructor(){S(this,"tweens",new Map);S(this,"nextId",1)}animate(e){const t=this.nextId++,i={id:t,elapsed:0,...e};return i.onUpdate(i.from),this.tweens.set(t,i),t}cancel(e){this.tweens.delete(e)}clear(){this.tweens.clear()}update(e){var t;for(const i of this.tweens.values()){i.elapsed+=e;const n=Math.min(1,i.elapsed/i.duration),r=Mg[i.easing](n);i.onUpdate(i.from+(i.to-i.from)*r),n>=1&&(this.tweens.delete(i.id),(t=i.onComplete)==null||t.call(i))}}}class Eg{constructor(e){S(this,"content",new Rm);S(this,"theme",new vg);S(this,"i18n",new gg);S(this,"mode",new yg);S(this,"transitions",new bg);S(this,"root");S(this,"canvasHost");S(this,"uiHost");S(this,"renderer");S(this,"slotSystem");S(this,"world");S(this,"intro");S(this,"guide");S(this,"hud");S(this,"about");S(this,"focus");S(this,"gameHud");S(this,"game");S(this,"interaction");S(this,"loop");S(this,"cameraOrbit",new tg);S(this,"introStartCameraPosition",new C(0,1.6,42));S(this,"introStartLookAt",new C(0,0,0));S(this,"cameraFocusBlend",0);S(this,"introTransitionProgress",0);S(this,"gameTransitionProgress",0);S(this,"activeIndex",0);S(this,"lastWheelAt",0);S(this,"hasFocused",!1);S(this,"hasChangedFacet",!1);S(this,"hasDragged",!1);S(this,"seenFacetsByProject",new Map);S(this,"pendingPostFocusExit",null);S(this,"didRunIntroPresentationFocus",!1);S(this,"gameTransitionTweenId",null);S(this,"mobileChargePointerId",null);S(this,"mobileChargeStartY",0);S(this,"mobileChargeStartedAt",0);S(this,"onWheel",e=>{(this.mode.is("orbit")||this.mode.is("constellation_complete"))&&(Date.now()-this.lastWheelAt<120||(this.lastWheelAt=Date.now(),e.preventDefault(),this.stepActiveIndex(e.deltaY>0?1:-1)))});S(this,"onKeyDown",e=>{if(this.mode.is("game_transition")){e.key==="Escape"&&(e.preventDefault(),this.exitGame());return}if(this.mode.is("game")||this.mode.is("game_over")){if(e.key==="Escape"){e.preventDefault(),this.exitGame();return}if(this.mode.is("game")){if(this.game.getHudState().state==="upgrade_choice"&&(e.key==="1"||e.key==="2"||e.key==="3")){e.preventDefault(),this.game.selectUpgradeFallback(Number(e.key)-1)&&this.refreshUI();return}e.key==="ArrowDown"?(e.preventDefault(),this.game.setChargeActive(!0)):e.key==="ArrowUp"&&(e.preventDefault(),this.game.triggerJump());return}(e.key==="Enter"||e.key===" "||e.key==="ArrowUp")&&(e.preventDefault(),this.restartGame());return}if(!(this.mode.is("intro")||this.mode.is("intro_shattering")||this.mode.is("intro_transition"))){if(e.key==="Escape"){this.about.opened?this.about.close():this.exitFocus();return}if(this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition")){e.key==="ArrowLeft"?(e.preventDefault(),this.changeFacet(-1)):e.key==="ArrowRight"&&(e.preventDefault(),this.changeFacet(1));return}if(this.mode.is("orbit")||this.mode.is("constellation_complete")){if(e.key==="ArrowLeft"||e.key==="ArrowUp")e.preventDefault(),this.stepActiveIndex(-1);else if(e.key==="ArrowRight"||e.key==="ArrowDown")e.preventDefault(),this.stepActiveIndex(1);else if(e.key==="Enter"||e.key===" "){e.preventDefault();const t=this.content.getProjectByOrder(this.activeIndex);t&&this.enterFocus(t.id)}}}});S(this,"onKeyUp",e=>{this.mode.is("game")&&e.key==="ArrowDown"&&this.game.setChargeActive(!1)});S(this,"onGamePointerDown",e=>{if(this.mode.is("game_over")){e.preventDefault(),this.restartGame();return}this.mode.is("game")&&(this.mobileChargePointerId=e.pointerId,this.mobileChargeStartY=e.clientY,this.mobileChargeStartedAt=performance.now(),this.game.setChargeActive(!0))});S(this,"onGamePointerUp",e=>{if(!this.mode.is("game")||this.mobileChargePointerId!==e.pointerId)return;const t=this.mobileChargeStartY-e.clientY,i=performance.now()-this.mobileChargeStartedAt;!this.game.setChargeActive(!1)&&(i<180||t>12)&&(this.game.triggerJump(),e.preventDefault()),this.mobileChargePointerId=null,this.mobileChargeStartedAt=0});S(this,"onGamePointerCancel",e=>{this.mobileChargePointerId===e.pointerId&&(this.mobileChargePointerId=null,this.mobileChargeStartedAt=0,this.game.setChargeActive(!1))});this.root=document.createElement("div"),this.root.className="app-shell",this.canvasHost=document.createElement("div"),this.canvasHost.className="app-shell__canvas",this.uiHost=document.createElement("div"),this.uiHost.className="app-shell__ui",this.root.append(this.canvasHost,this.uiHost),e.appendChild(this.root),this.renderer=new hg(this.canvasHost),this.slotSystem=new Xr(this.content.getProjects().filter(t=>t.role!=="presentation").map(t=>t.id)),this.world=new og(this.renderer.scene,this.content.getProjects(),this.slotSystem,this.theme.current),this.game=new eg(this.renderer.scene,this.theme.current),this.hud=new _g(this.uiHost,this.i18n,this.content,{onThemeToggle:()=>this.theme.toggle(),onLanguageToggle:()=>this.i18n.toggle(),onAboutToggle:()=>this.toggleAbout(),onHome:()=>this.returnHome(),onProjectSelect:t=>this.selectProject(t)}),this.about=new dg(this.uiHost,this.i18n),this.focus=new fg(this.uiHost,this.i18n,{onClose:()=>this.exitFocus(),onPrevFacet:()=>this.changeFacet(-1),onNextFacet:()=>this.changeFacet(1)}),this.guide=new pg(this.uiHost,this.i18n),this.intro=new ig(this.uiHost,this.i18n,this.theme),this.gameHud=new Fm(this.uiHost,this.i18n,{onRestart:()=>this.restartGame(),onExit:()=>this.exitGame(),onSelectUpgrade:t=>{this.game.selectUpgradeFallback(t)&&this.refreshUI()}}),this.interaction=new lg(this.renderer.renderer.domElement,this.renderer.camera,this.world,()=>this.mode.current,{onShardClick:t=>this.enterFocus(t),onBackgroundClick:()=>{(this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition"))&&this.exitFocus()},onHover:t=>this.world.setHovered(t),onDragStart:(t,i)=>{if(!(this.mode.is("orbit")||this.mode.is("constellation_complete")))return!1;const n=this.world.beginDrag(t,i);return n&&(this.mode.setMode("dragging"),this.world.setHovered(null)),n},onDragMove:t=>{this.world.updateDrag(t)},onDragEnd:()=>{const t=this.world.endDrag();t.shardId&&(this.hasDragged=!0),!t.unlocked&&this.mode.is("dragging")&&this.resumeOrbitMode(),this.refreshUI(),this.updateGuide()},onSceneOrbitMove:(t,i)=>{(this.mode.is("orbit")||this.mode.is("constellation_complete"))&&this.cameraOrbit.orbit(-t,i)},onFocusRotation:t=>this.world.previewFacetRotation(t),onFocusRotationEnd:()=>{this.world.finishFacetRotation()&&(this.mode.setMode("focus_facet_transition"),this.scheduleFacetCompletion())},onFocusSideTap:t=>this.changeFacet(t==="left"?-1:1)}),this.interaction,this.loop=new Sg((t,i)=>this.update(t,i)),this.bindEvents(),this.refreshUI(),this.updateGuide(),this.loop.start()}bindEvents(){this.theme.onChange(t=>{this.renderer.setTheme(t),this.world.setTheme(t),this.game.setTheme(t),this.refreshUI()}),this.i18n.onChange(()=>{this.refreshUI();const t=this.world.getFocusedProject();t&&this.focus.show(t,this.world.getFocusedFacetIndex()),(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))&&this.gameHud.update(this.getGameHudPayload())}),this.game.onScoreChange(()=>{(this.mode.is("game")||this.mode.is("game_over"))&&this.refreshUI()}),this.about.onClose=()=>{this.mode.is("about_section")&&(this.resumeOrbitMode(),this.refreshUI(),this.updateGuide())},this.intro.onBroken=()=>{this.mode.is("intro")&&(this.mode.setMode("intro_shattering"),window.setTimeout(()=>{this.mode.is("intro_shattering")&&this.mode.setMode("intro_transition")},60),this.transitions.animate({from:0,to:1,duration:2.6,easing:"easeOutQuint",onUpdate:t=>{this.introTransitionProgress=t},onComplete:()=>{if(this.introTransitionProgress=1,this.resumeOrbitMode(),this.refreshUI(),this.updateGuide(),!this.didRunIntroPresentationFocus){const t=this.world.getPresentationProjectId();t&&(this.didRunIntroPresentationFocus=!0,this.activeIndex=0,this.world.setActiveIndex(0),window.setTimeout(()=>{this.mode.is("orbit")&&this.enterFocus(t)},220))}}}))},this.world.onUnlocked(()=>{this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over")||(this.mode.is("constellation_complete")||(this.mode.is("dragging")||this.mode.is("orbit"))&&this.mode.setMode("constellation_complete"),this.refreshUI(),this.updateGuide(),this.transitions.animate({from:0,to:1,duration:.9,easing:"easeOutCubic",onUpdate:()=>{},onComplete:()=>{this.slotSystem.isUnlocked()&&this.startGameTransition()}}))}),window.addEventListener("wheel",this.onWheel,{passive:!1}),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp);const e=this.renderer.renderer.domElement;e.addEventListener("pointerdown",this.onGamePointerDown),e.addEventListener("pointerup",this.onGamePointerUp),e.addEventListener("pointercancel",this.onGamePointerCancel)}stepActiveIndex(e){this.activeIndex=_s(this.activeIndex+e,this.content.getProjectCount()),this.world.setActiveIndex(this.activeIndex),this.refreshUI()}selectProject(e){if(this.mode.is("intro")||this.mode.is("intro_shattering")||this.mode.is("intro_transition")||this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))return;this.about.opened&&this.about.close(),this.activeIndex=e,this.world.setActiveIndex(e),this.refreshUI();const t=this.content.getProjectByOrder(e);t&&(this.mode.is("orbit")||this.mode.is("constellation_complete"))&&this.enterFocus(t.id)}enterFocus(e){(this.mode.is("orbit")||this.mode.is("constellation_complete"))&&(this.mode.setMode("focus_enter"),this.world.setFocused(e),this.world.setHovered(null),this.refreshUI())}exitFocus(e){if(!(this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition"))){e==null||e();return}const t=this.world.getFocusedProject();this.pendingPostFocusExit=e||null,this.focus.hide(),this.mode.setMode("focus_exit"),this.world.clearFocus(),this.transitions.animate({from:0,to:1,duration:.55,easing:"easeOutCubic",onUpdate:()=>{},onComplete:()=>{this.resumeOrbitMode(),t&&this.hasSeenAllFacets(t.id)&&this.world.snapShardToSlot(t.id);const i=this.pendingPostFocusExit;this.pendingPostFocusExit=null,i==null||i(),this.refreshUI(),this.updateGuide()}})}changeFacet(e){!this.mode.is("focus")||!this.world.changeFacet(e)||(this.mode.setMode("focus_facet_transition"),this.scheduleFacetCompletion())}scheduleFacetCompletion(){this.transitions.animate({from:0,to:1,duration:.68,easing:"easeInOutCubic",onUpdate:()=>{},onComplete:()=>{if(!this.mode.is("focus_facet_transition"))return;this.mode.setMode("focus");const e=this.world.getFocusedProject();e&&(this.markFacetSeen(e.id,this.world.getFocusedFacetIndex()),this.focus.updateFacet(this.world.getFocusedFacetIndex()),this.hasChangedFacet=!0,this.updateGuide())}})}toggleAbout(){if(this.mode.is("intro")||this.mode.is("intro_shattering")||this.mode.is("intro_transition")||this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))return;if(this.about.opened){this.about.close();return}const e=()=>{this.about.open(),this.mode.setMode("about_section"),this.refreshUI(),this.updateGuide()};if(this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition")){this.exitFocus(e);return}e()}returnHome(){(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))&&this.exitGame(),this.activeIndex=0,this.world.setActiveIndex(0),this.about.opened&&this.about.close(),(this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition"))&&this.exitFocus(),this.refreshUI()}resumeOrbitMode(){if(this.slotSystem.isUnlocked()){this.mode.is("constellation_complete")||(this.mode.is("focus_exit")||this.mode.is("about_section")||this.mode.is("dragging")||this.mode.is("orbit")||this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))&&this.mode.setMode("constellation_complete");return}this.mode.is("orbit")||this.mode.setMode("orbit")}startGameTransition(){if(!this.slotSystem.isUnlocked()||this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))return;if(this.about.opened&&this.about.close(),this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition")){this.exitFocus(()=>this.startGameTransition());return}this.mode.is("dragging")&&this.resumeOrbitMode(),this.mode.is("constellation_complete")||this.mode.setMode("constellation_complete"),this.gameTransitionTweenId!==null&&(this.transitions.cancel(this.gameTransitionTweenId),this.gameTransitionTweenId=null),this.mode.setMode("game_transition"),this.gameTransitionProgress=0,this.game.startTransition();const e=this.getGameFieldCount();this.world.beginExternalLayoutTransition(this.game.getInitialPlatformPositions(e),this.game.getInitialPlatformScales(e),this.game.getInitialPlatformVisuals(e)),this.refreshUI(),this.gameTransitionTweenId=this.transitions.animate({from:0,to:1,duration:2.25,easing:"easeInOutCubic",onUpdate:t=>{this.gameTransitionProgress=t,this.world.setExternalLayoutProgress(t)},onComplete:()=>{this.gameTransitionTweenId=null,this.gameTransitionProgress=1,this.mode.setMode("game"),this.game.beginRun();const t=this.getGameFieldCount();this.world.setExternalLayoutPositions(this.game.getVisiblePlatformPositions(t),this.game.getVisiblePlatformScales(t),this.game.getVisiblePlatformVisuals(t)),this.refreshUI()}})}restartGame(){if(!(this.mode.is("game")||this.mode.is("game_over")))return;this.mode.is("game_over")&&this.mode.setMode("game"),this.game.restart();const e=this.getGameFieldCount();this.world.setExternalLayoutPositions(this.game.getVisiblePlatformPositions(e),this.game.getVisiblePlatformScales(e),this.game.getVisiblePlatformVisuals(e)),this.refreshUI()}exitGame(){if(!(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over")))return;this.gameTransitionTweenId!==null&&(this.transitions.cancel(this.gameTransitionTweenId),this.gameTransitionTweenId=null),this.mobileChargePointerId=null,this.game.setChargeActive(!1);const e=this.world.getOrbitPositions();this.world.beginExternalLayoutTransition(e),this.game.prepareReturnTransition(),(this.mode.is("game")||this.mode.is("game_over"))&&this.mode.setMode("game_transition"),this.gameTransitionTweenId=this.transitions.animate({from:this.gameTransitionProgress,to:0,duration:1.25,easing:"easeInOutCubic",onUpdate:t=>{this.gameTransitionProgress=t,this.world.setExternalLayoutProgress(1-t)},onComplete:()=>{this.gameTransitionTweenId=null,this.game.stop(),this.gameTransitionProgress=0,this.slotSystem.reset(),this.interaction.reset(),this.world.resetPortfolioState(),this.activeIndex=0,this.world.setActiveIndex(0),this.resumeOrbitMode(),this.refreshUI(),this.updateGuide()}})}getGameHudPayload(){const e=this.game.getHudState();return{score:e.score,highscore:e.highscore,distanceMeters:e.distanceMeters,bestDistanceMeters:e.bestDistanceMeters,coins:e.coins,splitTimes:e.splitTimes,chargeRatio:e.chargeRatio,momentumGauge:e.momentumGauge,momentumTier:e.momentumTier,orbitGraceActive:e.orbitGraceActive,orbitGraceProgress:e.orbitGraceProgress,state:e.state,offers:e.offers,branchHints:e.branchHints.reduce((t,i)=>{const n=this.renderer.projectWorldToScreen(i.worldPosition);return n.visible&&t.push({slot:i.slot,offer:i.offer,screenX:n.x,screenY:n.y,mode:i.mode,price:i.price}),t},[]),acquisition:e.acquisition}}update(e,t){if(this.transitions.update(e),this.world.update(e,t,this.mode.current),this.game.update(e,t),this.mode.is("game")||this.mode.is("game_over")){const p=this.getGameFieldCount();this.world.setExternalLayoutPositions(this.game.getVisiblePlatformPositions(p),this.game.getVisiblePlatformScales(p),this.game.getVisiblePlatformVisuals(p))}if(this.mode.is("focus_enter")&&this.world.isFocusSettled()){this.mode.setMode("focus");const p=this.world.getFocusedProject();p&&(this.markFacetSeen(p.id,this.world.getFocusedFacetIndex()),this.focus.show(p,this.world.getFocusedFacetIndex()),this.hasFocused=!0,this.updateGuide())}this.mode.is("game")&&this.game.currentState==="game_over"&&this.mode.setMode("game_over"),this.cameraFocusBlend=fe(this.cameraFocusBlend,this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition")||this.mode.is("focus_exit")?1:0,8,e);const i=this.world.getOrbitCameraPose(),n=this.cameraOrbit.update(e,this.world.getPivot()),r=this.world.getFocusCameraPose(),a=this.game.getCameraPose(),o=n.position.clone().lerp(r.position,this.cameraFocusBlend),l=n.lookAt.clone().lerp(i.lookAt,.18).lerp(r.lookAt,this.cameraFocusBlend),c=o.clone().lerp(a.position,this.gameTransitionProgress),h=l.clone().lerp(a.lookAt,this.gameTransitionProgress),u=this.introStartCameraPosition.clone().lerp(c,this.introTransitionProgress),f=this.introStartLookAt.clone().lerp(h,this.introTransitionProgress);this.renderer.setCameraResponse(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over")?18:8,this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over")?20:8),this.renderer.setCameraTarget(u,f),this.renderer.update(e),(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))&&this.gameHud.update(this.getGameHudPayload()),this.renderer.render(),this.intro.update(e),this.refreshUI()}refreshUI(){const e=this.world.getFocusedProject(),t=e?this.content.getProjectIndex(e.id):this.activeIndex,i=this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over");this.hud.setActiveProject(t,this.i18n.current),this.hud.setUnlocked(this.slotSystem.isUnlocked()),this.hud.setAboutOpen(this.about.opened),this.hud.element.classList.toggle("is-hidden",i),this.guide.element.classList.toggle("is-hidden",i),this.gameHud.setVisible(i),i&&this.gameHud.update(this.getGameHudPayload()),this.world.setActiveIndex(this.activeIndex)}getGameFieldCount(){const e=Math.max(this.world.getGameFieldCapacity(),this.game.getRecommendedVisibleCount());return this.world.ensureGameFieldCapacity(e),this.world.getGameFieldCapacity()}updateGuide(){if(!(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))){if(this.slotSystem.isUnlocked()){this.guide.setStep("unlocked");return}if(this.mode.is("intro")||this.mode.is("intro_shattering")||this.mode.is("intro_transition")){this.guide.setStep("intro");return}if(!this.hasFocused){this.guide.setStep("orbit");return}if(!this.hasChangedFacet){this.guide.setStep("focus");return}if(!this.hasDragged){this.guide.setStep("drag");return}this.guide.setStep("slots")}}markFacetSeen(e,t){const i=this.seenFacetsByProject.get(e)??new Set;i.add(t),this.seenFacetsByProject.set(e,i)}hasSeenAllFacets(e){var t;return(((t=this.seenFacetsByProject.get(e))==null?void 0:t.size)??0)>=3}}const Ll=document.getElementById("app");if(!Ll)throw new Error("App root not found");new Eg(Ll);
