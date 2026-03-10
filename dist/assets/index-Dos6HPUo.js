var Cc=Object.defineProperty;var Rc=(s,e,t)=>e in s?Cc(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var M=(s,e,t)=>Rc(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Mr="160",Lc=0,Wr=1,Dc=2,Bo=1,Ic=2,oi=3,Mi=0,Rt=1,qt=2,xi=0,rn=1,Xr=2,qr=3,jr=4,Uc=5,Ri=100,Nc=101,Fc=102,Yr=103,$r=104,Oc=200,kc=201,Bc=202,zc=203,hr=204,ur=205,Gc=206,Hc=207,Vc=208,Wc=209,Xc=210,qc=211,jc=212,Yc=213,$c=214,Kc=0,Zc=1,Jc=2,ds=3,Qc=4,el=5,tl=6,il=7,zo=0,nl=1,sl=2,yi=0,rl=1,al=2,ol=3,cl=4,ll=5,hl=6,Go=300,on=301,cn=302,dr=303,fr=304,ys=306,pr=1e3,jt=1001,mr=1002,wt=1003,Kr=1004,Ls=1005,Bt=1006,ul=1007,bn=1008,Si=1009,dl=1010,fl=1011,br=1012,Ho=1013,_i=1014,vi=1015,En=1016,Vo=1017,Wo=1018,Di=1020,pl=1021,Yt=1023,ml=1024,gl=1025,Ii=1026,ln=1027,_l=1028,Xo=1029,vl=1030,qo=1031,jo=1033,Ds=33776,Is=33777,Us=33778,Ns=33779,Zr=35840,Jr=35841,Qr=35842,ea=35843,Yo=36196,ta=37492,ia=37496,na=37808,sa=37809,ra=37810,aa=37811,oa=37812,ca=37813,la=37814,ha=37815,ua=37816,da=37817,fa=37818,pa=37819,ma=37820,ga=37821,Fs=36492,_a=36494,va=36495,xl=36283,xa=36284,ya=36285,Sa=36286,$o=3e3,Ui=3001,yl=3200,Sl=3201,Ko=0,Ml=1,zt="",ht="srgb",li="srgb-linear",Er="display-p3",Ss="display-p3-linear",fs="linear",Qe="srgb",ps="rec709",ms="p3",ki=7680,Ma=519,bl=512,El=513,Tl=514,Zo=515,Al=516,wl=517,Pl=518,Cl=519,ba=35044,Ea="300 es",gr=1035,ci=2e3,gs=2001;class un{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const n=this._listeners[e];if(n!==void 0){const r=n.indexOf(t);r!==-1&&n.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const n=i.slice(0);for(let r=0,a=n.length;r<a;r++)n[r].call(this,e);e.target=null}}}const xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ta=1234567;const yn=Math.PI/180,Tn=180/Math.PI;function dn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(xt[s&255]+xt[s>>8&255]+xt[s>>16&255]+xt[s>>24&255]+"-"+xt[e&255]+xt[e>>8&255]+"-"+xt[e>>16&15|64]+xt[e>>24&255]+"-"+xt[t&63|128]+xt[t>>8&255]+"-"+xt[t>>16&255]+xt[t>>24&255]+xt[i&255]+xt[i>>8&255]+xt[i>>16&255]+xt[i>>24&255]).toLowerCase()}function Pt(s,e,t){return Math.max(e,Math.min(t,s))}function Tr(s,e){return(s%e+e)%e}function Rl(s,e,t,i,n){return i+(s-e)*(n-i)/(t-e)}function Ll(s,e,t){return s!==e?(t-s)/(e-s):0}function Sn(s,e,t){return(1-t)*s+t*e}function Dl(s,e,t,i){return Sn(s,e,1-Math.exp(-t*i))}function Il(s,e=1){return e-Math.abs(Tr(s,e*2)-e)}function Ul(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Nl(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Fl(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Ol(s,e){return s+Math.random()*(e-s)}function kl(s){return s*(.5-Math.random())}function Bl(s){s!==void 0&&(Ta=s);let e=Ta+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function zl(s){return s*yn}function Gl(s){return s*Tn}function _r(s){return(s&s-1)===0&&s!==0}function Hl(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function _s(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Vl(s,e,t,i,n){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+i)/2),h=a((e+i)/2),u=r((e-i)/2),f=a((e-i)/2),m=r((i-e)/2),g=a((i-e)/2);switch(n){case"XYX":s.set(o*h,c*u,c*f,o*l);break;case"YZY":s.set(c*f,o*h,c*u,o*l);break;case"ZXZ":s.set(c*u,c*f,o*h,o*l);break;case"XZX":s.set(o*h,c*g,c*m,o*l);break;case"YXY":s.set(c*m,o*h,c*g,o*l);break;case"ZYZ":s.set(c*g,c*m,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function tn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Tt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const mi={DEG2RAD:yn,RAD2DEG:Tn,generateUUID:dn,clamp:Pt,euclideanModulo:Tr,mapLinear:Rl,inverseLerp:Ll,lerp:Sn,damp:Dl,pingpong:Il,smoothstep:Ul,smootherstep:Nl,randInt:Fl,randFloat:Ol,randFloatSpread:kl,seededRandom:Bl,degToRad:zl,radToDeg:Gl,isPowerOfTwo:_r,ceilPowerOfTwo:Hl,floorPowerOfTwo:_s,setQuaternionFromProperEuler:Vl,normalize:Tt,denormalize:tn};class ve{constructor(e=0,t=0){ve.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Pt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),n=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*n+e.x,this.y=r*n+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ve{constructor(e,t,i,n,r,a,o,c,l){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,a,o,c,l)}set(e,t,i,n,r,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=n,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=i,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],h=i[4],u=i[7],f=i[2],m=i[5],g=i[8],_=n[0],p=n[3],d=n[6],b=n[1],x=n[4],A=n[7],L=n[2],w=n[5],P=n[8];return r[0]=a*_+o*b+c*L,r[3]=a*p+o*x+c*w,r[6]=a*d+o*A+c*P,r[1]=l*_+h*b+u*L,r[4]=l*p+h*x+u*w,r[7]=l*d+h*A+u*P,r[2]=f*_+m*b+g*L,r[5]=f*p+m*x+g*w,r[8]=f*d+m*A+g*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-i*r*h+i*o*c+n*r*l-n*a*c}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,f=o*c-h*r,m=l*r-a*c,g=t*u+i*f+n*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(n*l-h*i)*_,e[2]=(o*i-n*a)*_,e[3]=f*_,e[4]=(h*t-n*c)*_,e[5]=(n*r-o*t)*_,e[6]=m*_,e[7]=(i*c-l*t)*_,e[8]=(a*t-i*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-n*l,n*c,-n*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Os.makeScale(e,t)),this}rotate(e){return this.premultiply(Os.makeRotation(-e)),this}translate(e,t){return this.premultiply(Os.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<9;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Os=new Ve;function Jo(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function An(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Wl(){const s=An("canvas");return s.style.display="block",s}const Aa={};function Mn(s){s in Aa||(Aa[s]=!0,console.warn(s))}const wa=new Ve().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Pa=new Ve().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Nn={[li]:{transfer:fs,primaries:ps,toReference:s=>s,fromReference:s=>s},[ht]:{transfer:Qe,primaries:ps,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[Ss]:{transfer:fs,primaries:ms,toReference:s=>s.applyMatrix3(Pa),fromReference:s=>s.applyMatrix3(wa)},[Er]:{transfer:Qe,primaries:ms,toReference:s=>s.convertSRGBToLinear().applyMatrix3(Pa),fromReference:s=>s.applyMatrix3(wa).convertLinearToSRGB()}},Xl=new Set([li,Ss]),$e={enabled:!0,_workingColorSpace:li,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Xl.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;const i=Nn[e].toReference,n=Nn[t].fromReference;return n(i(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return Nn[s].primaries},getTransfer:function(s){return s===zt?fs:Nn[s].transfer}};function an(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ks(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Bi;class Qo{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Bi===void 0&&(Bi=An("canvas")),Bi.width=e.width,Bi.height=e.height;const i=Bi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Bi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=An("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const n=i.getImageData(0,0,e.width,e.height),r=n.data;for(let a=0;a<r.length;a++)r[a]=an(r[a]/255)*255;return i.putImageData(n,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(an(t[i]/255)*255):t[i]=an(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let ql=0;class ec{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ql++}),this.uuid=dn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let a=0,o=n.length;a<o;a++)n[a].isDataTexture?r.push(Bs(n[a].image)):r.push(Bs(n[a]))}else r=Bs(n);i.url=r}return t||(e.images[this.uuid]=i),i}}function Bs(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Qo.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let jl=0;class Lt extends un{constructor(e=Lt.DEFAULT_IMAGE,t=Lt.DEFAULT_MAPPING,i=jt,n=jt,r=Bt,a=bn,o=Yt,c=Si,l=Lt.DEFAULT_ANISOTROPY,h=zt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jl++}),this.uuid=dn(),this.name="",this.source=new ec(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ve(0,0),this.repeat=new ve(1,1),this.center=new ve(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Mn("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Ui?ht:zt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Go)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case pr:e.x=e.x-Math.floor(e.x);break;case jt:e.x=e.x<0?0:1;break;case mr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case pr:e.y=e.y-Math.floor(e.y);break;case jt:e.y=e.y<0?0:1;break;case mr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Mn("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===ht?Ui:$o}set encoding(e){Mn("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Ui?ht:zt}}Lt.DEFAULT_IMAGE=null;Lt.DEFAULT_MAPPING=Go;Lt.DEFAULT_ANISOTROPY=1;class et{constructor(e=0,t=0,i=0,n=1){et.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*n+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*n+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*n+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*n+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n,r;const c=e.elements,l=c[0],h=c[4],u=c[8],f=c[1],m=c[5],g=c[9],_=c[2],p=c[6],d=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+p)<.1&&Math.abs(l+m+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(l+1)/2,A=(m+1)/2,L=(d+1)/2,w=(h+f)/4,P=(u+_)/4,z=(g+p)/4;return x>A&&x>L?x<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(x),n=w/i,r=P/i):A>L?A<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(A),i=w/n,r=z/n):L<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(L),i=P/r,n=z/r),this.set(i,n,r,t),this}let b=Math.sqrt((p-g)*(p-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(b)<.001&&(b=1),this.x=(p-g)/b,this.y=(u-_)/b,this.z=(f-h)/b,this.w=Math.acos((l+m+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Yl extends un{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new et(0,0,e,t),this.scissorTest=!1,this.viewport=new et(0,0,e,t);const n={width:e,height:t,depth:1};i.encoding!==void 0&&(Mn("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===Ui?ht:zt),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Lt(n,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new ec(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ni extends Yl{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class tc extends Lt{constructor(e=null,t=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=wt,this.minFilter=wt,this.wrapR=jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $l extends Lt{constructor(e=null,t=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=wt,this.minFilter=wt,this.wrapR=jt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class wn{constructor(e=0,t=0,i=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=n}static slerpFlat(e,t,i,n,r,a,o){let c=i[n+0],l=i[n+1],h=i[n+2],u=i[n+3];const f=r[a+0],m=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=f,e[t+1]=m,e[t+2]=g,e[t+3]=_;return}if(u!==_||c!==f||l!==m||h!==g){let p=1-o;const d=c*f+l*m+h*g+u*_,b=d>=0?1:-1,x=1-d*d;if(x>Number.EPSILON){const L=Math.sqrt(x),w=Math.atan2(L,d*b);p=Math.sin(p*w)/L,o=Math.sin(o*w)/L}const A=o*b;if(c=c*p+f*A,l=l*p+m*A,h=h*p+g*A,u=u*p+_*A,p===1-o){const L=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=L,l*=L,h*=L,u*=L}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,n,r,a){const o=i[n],c=i[n+1],l=i[n+2],h=i[n+3],u=r[a],f=r[a+1],m=r[a+2],g=r[a+3];return e[t]=o*g+h*u+c*m-l*f,e[t+1]=c*g+h*f+l*u-o*m,e[t+2]=l*g+h*m+o*f-c*u,e[t+3]=h*g-o*u-c*f-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,n=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(n/2),u=o(r/2),f=c(i/2),m=c(n/2),g=c(r/2);switch(a){case"XYZ":this._x=f*h*u+l*m*g,this._y=l*m*u-f*h*g,this._z=l*h*g+f*m*u,this._w=l*h*u-f*m*g;break;case"YXZ":this._x=f*h*u+l*m*g,this._y=l*m*u-f*h*g,this._z=l*h*g-f*m*u,this._w=l*h*u+f*m*g;break;case"ZXY":this._x=f*h*u-l*m*g,this._y=l*m*u+f*h*g,this._z=l*h*g+f*m*u,this._w=l*h*u-f*m*g;break;case"ZYX":this._x=f*h*u-l*m*g,this._y=l*m*u+f*h*g,this._z=l*h*g-f*m*u,this._w=l*h*u+f*m*g;break;case"YZX":this._x=f*h*u+l*m*g,this._y=l*m*u+f*h*g,this._z=l*h*g-f*m*u,this._w=l*h*u-f*m*g;break;case"XZY":this._x=f*h*u-l*m*g,this._y=l*m*u-f*h*g,this._z=l*h*g+f*m*u,this._w=l*h*u+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],n=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],f=i+o+u;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(h-c)*m,this._y=(r-l)*m,this._z=(a-n)*m}else if(i>o&&i>u){const m=2*Math.sqrt(1+i-o-u);this._w=(h-c)/m,this._x=.25*m,this._y=(n+a)/m,this._z=(r+l)/m}else if(o>u){const m=2*Math.sqrt(1+o-i-u);this._w=(r-l)/m,this._x=(n+a)/m,this._y=.25*m,this._z=(c+h)/m}else{const m=2*Math.sqrt(1+u-i-o);this._w=(a-n)/m,this._x=(r+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Pt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const n=Math.min(1,t/i);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,n=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+a*o+n*l-r*c,this._y=n*h+a*c+r*o-i*l,this._z=r*h+a*l+i*c-n*o,this._w=a*h-i*o-n*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,n=this._y,r=this._z,a=this._w;let o=a*e._w+i*e._x+n*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=n,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*i+t*this._x,this._y=m*n+t*this._y,this._z=m*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,f=Math.sin(t*h)/l;return this._w=a*u+this._w*f,this._x=i*u+this._x*f,this._y=n*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),n=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(n),i*Math.sin(r),i*Math.cos(r),t*Math.sin(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(e=0,t=0,i=0){C.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ca.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ca.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*n,this.y=r[1]*t+r[4]*i+r[7]*n,this.z=r[2]*t+r[5]*i+r[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*n+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*n+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*n+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,n=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*n-o*i),h=2*(o*t-r*n),u=2*(r*i-a*t);return this.x=t+c*l+a*u-o*h,this.y=i+c*h+o*l-r*u,this.z=n+c*u+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*n,this.y=r[1]*t+r[5]*i+r[9]*n,this.z=r[2]*t+r[6]*i+r[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,n=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=n*c-r*o,this.y=r*a-i*c,this.z=i*o-n*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return zs.copy(this).projectOnVector(e),this.sub(zs)}reflect(e){return this.sub(zs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Pt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const zs=new C,Ca=new wn;class Pn{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Ht.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Ht.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Ht.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ht):Ht.fromBufferAttribute(r,a),Ht.applyMatrix4(e.matrixWorld),this.expandByPoint(Ht);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Fn.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Fn.copy(i.boundingBox)),Fn.applyMatrix4(e.matrixWorld),this.union(Fn)}const n=e.children;for(let r=0,a=n.length;r<a;r++)this.expandByObject(n[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Ht),Ht.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(mn),On.subVectors(this.max,mn),zi.subVectors(e.a,mn),Gi.subVectors(e.b,mn),Hi.subVectors(e.c,mn),hi.subVectors(Gi,zi),ui.subVectors(Hi,Gi),Ti.subVectors(zi,Hi);let t=[0,-hi.z,hi.y,0,-ui.z,ui.y,0,-Ti.z,Ti.y,hi.z,0,-hi.x,ui.z,0,-ui.x,Ti.z,0,-Ti.x,-hi.y,hi.x,0,-ui.y,ui.x,0,-Ti.y,Ti.x,0];return!Gs(t,zi,Gi,Hi,On)||(t=[1,0,0,0,1,0,0,0,1],!Gs(t,zi,Gi,Hi,On))?!1:(kn.crossVectors(hi,ui),t=[kn.x,kn.y,kn.z],Gs(t,zi,Gi,Hi,On))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ht).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ht).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ii[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ii[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ii[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ii[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ii[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ii[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ii[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ii[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ii),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ii=[new C,new C,new C,new C,new C,new C,new C,new C],Ht=new C,Fn=new Pn,zi=new C,Gi=new C,Hi=new C,hi=new C,ui=new C,Ti=new C,mn=new C,On=new C,kn=new C,Ai=new C;function Gs(s,e,t,i,n){for(let r=0,a=s.length-3;r<=a;r+=3){Ai.fromArray(s,r);const o=n.x*Math.abs(Ai.x)+n.y*Math.abs(Ai.y)+n.z*Math.abs(Ai.z),c=e.dot(Ai),l=t.dot(Ai),h=i.dot(Ai);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Kl=new Pn,gn=new C,Hs=new C;class Cn{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Kl.setFromPoints(e).getCenter(i);let n=0;for(let r=0,a=e.length;r<a;r++)n=Math.max(n,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;gn.subVectors(e,this.center);const t=gn.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),n=(i-this.radius)*.5;this.center.addScaledVector(gn,n/i),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Hs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(gn.copy(e.center).add(Hs)),this.expandByPoint(gn.copy(e.center).sub(Hs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ni=new C,Vs=new C,Bn=new C,di=new C,Ws=new C,zn=new C,Xs=new C;class Ms{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ni)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ni.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ni.copy(this.origin).addScaledVector(this.direction,t),ni.distanceToSquared(e))}distanceSqToSegment(e,t,i,n){Vs.copy(e).add(t).multiplyScalar(.5),Bn.copy(t).sub(e).normalize(),di.copy(this.origin).sub(Vs);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Bn),o=di.dot(this.direction),c=-di.dot(Bn),l=di.lengthSq(),h=Math.abs(1-a*a);let u,f,m,g;if(h>0)if(u=a*c-o,f=a*o-c,g=r*h,u>=0)if(f>=-g)if(f<=g){const _=1/h;u*=_,f*=_,m=u*(u+a*f+2*o)+f*(a*u+f+2*c)+l}else f=r,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-c),r),m=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),m=f*(f+2*c)+l):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-c),r),m=-u*u+f*(f+2*c)+l);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),n&&n.copy(Vs).addScaledVector(Bn,f),m}intersectSphere(e,t){ni.subVectors(e.center,this.origin);const i=ni.dot(this.direction),n=ni.dot(ni)-i*i,r=e.radius*e.radius;if(n>r)return null;const a=Math.sqrt(r-n),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,n,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(i=(e.min.x-f.x)*l,n=(e.max.x-f.x)*l):(i=(e.max.x-f.x)*l,n=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),i>a||r>n||((r>i||isNaN(i))&&(i=r),(a<n||isNaN(n))&&(n=a),u>=0?(o=(e.min.z-f.z)*u,c=(e.max.z-f.z)*u):(o=(e.max.z-f.z)*u,c=(e.min.z-f.z)*u),i>c||o>n)||((o>i||i!==i)&&(i=o),(c<n||n!==n)&&(n=c),n<0)?null:this.at(i>=0?i:n,t)}intersectsBox(e){return this.intersectBox(e,ni)!==null}intersectTriangle(e,t,i,n,r){Ws.subVectors(t,e),zn.subVectors(i,e),Xs.crossVectors(Ws,zn);let a=this.direction.dot(Xs),o;if(a>0){if(n)return null;o=1}else if(a<0)o=-1,a=-a;else return null;di.subVectors(this.origin,e);const c=o*this.direction.dot(zn.crossVectors(di,zn));if(c<0)return null;const l=o*this.direction.dot(Ws.cross(di));if(l<0||c+l>a)return null;const h=-o*di.dot(Xs);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class rt{constructor(e,t,i,n,r,a,o,c,l,h,u,f,m,g,_,p){rt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,n,r,a,o,c,l,h,u,f,m,g,_,p)}set(e,t,i,n,r,a,o,c,l,h,u,f,m,g,_,p){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=n,d[1]=r,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=h,d[10]=u,d[14]=f,d[3]=m,d[7]=g,d[11]=_,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,n=1/Vi.setFromMatrixColumn(e,0).length(),r=1/Vi.setFromMatrixColumn(e,1).length(),a=1/Vi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,n=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(n),l=Math.sin(n),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const f=a*h,m=a*u,g=o*h,_=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=m+g*l,t[5]=f-_*l,t[9]=-o*c,t[2]=_-f*l,t[6]=g+m*l,t[10]=a*c}else if(e.order==="YXZ"){const f=c*h,m=c*u,g=l*h,_=l*u;t[0]=f+_*o,t[4]=g*o-m,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=m*o-g,t[6]=_+f*o,t[10]=a*c}else if(e.order==="ZXY"){const f=c*h,m=c*u,g=l*h,_=l*u;t[0]=f-_*o,t[4]=-a*u,t[8]=g+m*o,t[1]=m+g*o,t[5]=a*h,t[9]=_-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const f=a*h,m=a*u,g=o*h,_=o*u;t[0]=c*h,t[4]=g*l-m,t[8]=f*l+_,t[1]=c*u,t[5]=_*l+f,t[9]=m*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const f=a*c,m=a*l,g=o*c,_=o*l;t[0]=c*h,t[4]=_-f*u,t[8]=g*u+m,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=m*u+g,t[10]=f-_*u}else if(e.order==="XZY"){const f=a*c,m=a*l,g=o*c,_=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=f*u+_,t[5]=a*h,t[9]=m*u-g,t[2]=g*u-m,t[6]=o*h,t[10]=_*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Zl,e,Jl)}lookAt(e,t,i){const n=this.elements;return It.subVectors(e,t),It.lengthSq()===0&&(It.z=1),It.normalize(),fi.crossVectors(i,It),fi.lengthSq()===0&&(Math.abs(i.z)===1?It.x+=1e-4:It.z+=1e-4,It.normalize(),fi.crossVectors(i,It)),fi.normalize(),Gn.crossVectors(It,fi),n[0]=fi.x,n[4]=Gn.x,n[8]=It.x,n[1]=fi.y,n[5]=Gn.y,n[9]=It.y,n[2]=fi.z,n[6]=Gn.z,n[10]=It.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],h=i[1],u=i[5],f=i[9],m=i[13],g=i[2],_=i[6],p=i[10],d=i[14],b=i[3],x=i[7],A=i[11],L=i[15],w=n[0],P=n[4],z=n[8],y=n[12],E=n[1],H=n[5],V=n[9],Q=n[13],D=n[2],U=n[6],O=n[10],j=n[14],X=n[3],Y=n[7],$=n[11],ie=n[15];return r[0]=a*w+o*E+c*D+l*X,r[4]=a*P+o*H+c*U+l*Y,r[8]=a*z+o*V+c*O+l*$,r[12]=a*y+o*Q+c*j+l*ie,r[1]=h*w+u*E+f*D+m*X,r[5]=h*P+u*H+f*U+m*Y,r[9]=h*z+u*V+f*O+m*$,r[13]=h*y+u*Q+f*j+m*ie,r[2]=g*w+_*E+p*D+d*X,r[6]=g*P+_*H+p*U+d*Y,r[10]=g*z+_*V+p*O+d*$,r[14]=g*y+_*Q+p*j+d*ie,r[3]=b*w+x*E+A*D+L*X,r[7]=b*P+x*H+A*U+L*Y,r[11]=b*z+x*V+A*O+L*$,r[15]=b*y+x*Q+A*j+L*ie,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],n=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],f=e[10],m=e[14],g=e[3],_=e[7],p=e[11],d=e[15];return g*(+r*c*u-n*l*u-r*o*f+i*l*f+n*o*m-i*c*m)+_*(+t*c*m-t*l*f+r*a*f-n*a*m+n*l*h-r*c*h)+p*(+t*l*u-t*o*m-r*a*u+i*a*m+r*o*h-i*l*h)+d*(-n*o*h-t*c*u+t*o*f+n*a*u-i*a*f+i*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],f=e[10],m=e[11],g=e[12],_=e[13],p=e[14],d=e[15],b=u*p*l-_*f*l+_*c*m-o*p*m-u*c*d+o*f*d,x=g*f*l-h*p*l-g*c*m+a*p*m+h*c*d-a*f*d,A=h*_*l-g*u*l+g*o*m-a*_*m-h*o*d+a*u*d,L=g*u*c-h*_*c-g*o*f+a*_*f+h*o*p-a*u*p,w=t*b+i*x+n*A+r*L;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/w;return e[0]=b*P,e[1]=(_*f*r-u*p*r-_*n*m+i*p*m+u*n*d-i*f*d)*P,e[2]=(o*p*r-_*c*r+_*n*l-i*p*l-o*n*d+i*c*d)*P,e[3]=(u*c*r-o*f*r-u*n*l+i*f*l+o*n*m-i*c*m)*P,e[4]=x*P,e[5]=(h*p*r-g*f*r+g*n*m-t*p*m-h*n*d+t*f*d)*P,e[6]=(g*c*r-a*p*r-g*n*l+t*p*l+a*n*d-t*c*d)*P,e[7]=(a*f*r-h*c*r+h*n*l-t*f*l-a*n*m+t*c*m)*P,e[8]=A*P,e[9]=(g*u*r-h*_*r-g*i*m+t*_*m+h*i*d-t*u*d)*P,e[10]=(a*_*r-g*o*r+g*i*l-t*_*l-a*i*d+t*o*d)*P,e[11]=(h*o*r-a*u*r-h*i*l+t*u*l+a*i*m-t*o*m)*P,e[12]=L*P,e[13]=(h*_*n-g*u*n+g*i*f-t*_*f-h*i*p+t*u*p)*P,e[14]=(g*o*n-a*_*n-g*i*c+t*_*c+a*i*p-t*o*p)*P,e[15]=(a*u*n-h*o*n+h*i*c-t*u*c-a*i*f+t*o*f)*P,this}scale(e){const t=this.elements,i=e.x,n=e.y,r=e.z;return t[0]*=i,t[4]*=n,t[8]*=r,t[1]*=i,t[5]*=n,t[9]*=r,t[2]*=i,t[6]*=n,t[10]*=r,t[3]*=i,t[7]*=n,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,n))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),n=Math.sin(t),r=1-i,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+i,l*o-n*c,l*c+n*o,0,l*o+n*c,h*o+i,h*c-n*a,0,l*c-n*o,h*c+n*a,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,n,r,a){return this.set(1,i,r,0,e,1,a,0,t,n,1,0,0,0,0,1),this}compose(e,t,i){const n=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,u=o+o,f=r*l,m=r*h,g=r*u,_=a*h,p=a*u,d=o*u,b=c*l,x=c*h,A=c*u,L=i.x,w=i.y,P=i.z;return n[0]=(1-(_+d))*L,n[1]=(m+A)*L,n[2]=(g-x)*L,n[3]=0,n[4]=(m-A)*w,n[5]=(1-(f+d))*w,n[6]=(p+b)*w,n[7]=0,n[8]=(g+x)*P,n[9]=(p-b)*P,n[10]=(1-(f+_))*P,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,i){const n=this.elements;let r=Vi.set(n[0],n[1],n[2]).length();const a=Vi.set(n[4],n[5],n[6]).length(),o=Vi.set(n[8],n[9],n[10]).length();this.determinant()<0&&(r=-r),e.x=n[12],e.y=n[13],e.z=n[14],Vt.copy(this);const l=1/r,h=1/a,u=1/o;return Vt.elements[0]*=l,Vt.elements[1]*=l,Vt.elements[2]*=l,Vt.elements[4]*=h,Vt.elements[5]*=h,Vt.elements[6]*=h,Vt.elements[8]*=u,Vt.elements[9]*=u,Vt.elements[10]*=u,t.setFromRotationMatrix(Vt),i.x=r,i.y=a,i.z=o,this}makePerspective(e,t,i,n,r,a,o=ci){const c=this.elements,l=2*r/(t-e),h=2*r/(i-n),u=(t+e)/(t-e),f=(i+n)/(i-n);let m,g;if(o===ci)m=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===gs)m=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,n,r,a,o=ci){const c=this.elements,l=1/(t-e),h=1/(i-n),u=1/(a-r),f=(t+e)*l,m=(i+n)*h;let g,_;if(o===ci)g=(a+r)*u,_=-2*u;else if(o===gs)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<16;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Vi=new C,Vt=new rt,Zl=new C(0,0,0),Jl=new C(1,1,1),fi=new C,Gn=new C,It=new C,Ra=new rt,La=new wn;class bs{constructor(e=0,t=0,i=0,n=bs.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,n=this._order){return this._x=e,this._y=t,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const n=e.elements,r=n[0],a=n[4],o=n[8],c=n[1],l=n[5],h=n[9],u=n[2],f=n[6],m=n[10];switch(t){case"XYZ":this._y=Math.asin(Pt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Pt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Pt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Pt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Pt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Pt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Ra.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ra,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return La.setFromEuler(this),this.setFromQuaternion(La,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}bs.DEFAULT_ORDER="XYZ";class Ar{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ql=0;const Da=new C,Wi=new wn,si=new rt,Hn=new C,_n=new C,eh=new C,th=new wn,Ia=new C(1,0,0),Ua=new C(0,1,0),Na=new C(0,0,1),ih={type:"added"},nh={type:"removed"};class gt extends un{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ql++}),this.uuid=dn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=gt.DEFAULT_UP.clone();const e=new C,t=new bs,i=new wn,n=new C(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new rt},normalMatrix:{value:new Ve}}),this.matrix=new rt,this.matrixWorld=new rt,this.matrixAutoUpdate=gt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ar,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Wi.setFromAxisAngle(e,t),this.quaternion.multiply(Wi),this}rotateOnWorldAxis(e,t){return Wi.setFromAxisAngle(e,t),this.quaternion.premultiply(Wi),this}rotateX(e){return this.rotateOnAxis(Ia,e)}rotateY(e){return this.rotateOnAxis(Ua,e)}rotateZ(e){return this.rotateOnAxis(Na,e)}translateOnAxis(e,t){return Da.copy(e).applyQuaternion(this.quaternion),this.position.add(Da.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ia,e)}translateY(e){return this.translateOnAxis(Ua,e)}translateZ(e){return this.translateOnAxis(Na,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(si.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Hn.copy(e):Hn.set(e,t,i);const n=this.parent;this.updateWorldMatrix(!0,!1),_n.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?si.lookAt(_n,Hn,this.up):si.lookAt(Hn,_n,this.up),this.quaternion.setFromRotationMatrix(si),n&&(si.extractRotation(n.matrixWorld),Wi.setFromRotationMatrix(si),this.quaternion.premultiply(Wi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(ih)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(nh)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),si.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),si.multiply(e.parent.matrixWorld)),e.applyMatrix4(si),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,n=this.children.length;i<n;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_n,e,eh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_n,th,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,n=t.length;i<n;i++){const r=t[i];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const n=this.children;for(let r=0,a=n.length;r<a;r++){const o=n[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.visibility=this._visibility,n.active=this._active,n.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),n.maxGeometryCount=this._maxGeometryCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.geometryCount=this._geometryCount,n.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(n.boundingSphere={center:n.boundingSphere.center.toArray(),radius:n.boundingSphere.radius}),this.boundingBox!==null&&(n.boundingBox={min:n.boundingBox.min.toArray(),max:n.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));n.material=o}else n.material=r(e.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];n.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),f=a(e.skeletons),m=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=n,i;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const n=e.children[i];this.add(n.clone())}return this}}gt.DEFAULT_UP=new C(0,1,0);gt.DEFAULT_MATRIX_AUTO_UPDATE=!0;gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Wt=new C,ri=new C,qs=new C,ai=new C,Xi=new C,qi=new C,Fa=new C,js=new C,Ys=new C,$s=new C;let Vn=!1;class Xt{constructor(e=new C,t=new C,i=new C){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,n){n.subVectors(i,t),Wt.subVectors(e,t),n.cross(Wt);const r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(e,t,i,n,r){Wt.subVectors(n,t),ri.subVectors(i,t),qs.subVectors(e,t);const a=Wt.dot(Wt),o=Wt.dot(ri),c=Wt.dot(qs),l=ri.dot(ri),h=ri.dot(qs),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,m=(l*c-o*h)*f,g=(a*h-o*c)*f;return r.set(1-m-g,g,m)}static containsPoint(e,t,i,n){return this.getBarycoord(e,t,i,n,ai)===null?!1:ai.x>=0&&ai.y>=0&&ai.x+ai.y<=1}static getUV(e,t,i,n,r,a,o,c){return Vn===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Vn=!0),this.getInterpolation(e,t,i,n,r,a,o,c)}static getInterpolation(e,t,i,n,r,a,o,c){return this.getBarycoord(e,t,i,n,ai)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ai.x),c.addScaledVector(a,ai.y),c.addScaledVector(o,ai.z),c)}static isFrontFacing(e,t,i,n){return Wt.subVectors(i,t),ri.subVectors(e,t),Wt.cross(ri).dot(n)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,n){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,i,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Wt.subVectors(this.c,this.b),ri.subVectors(this.a,this.b),Wt.cross(ri).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Xt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Xt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,n,r){return Vn===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Vn=!0),Xt.getInterpolation(e,this.a,this.b,this.c,t,i,n,r)}getInterpolation(e,t,i,n,r){return Xt.getInterpolation(e,this.a,this.b,this.c,t,i,n,r)}containsPoint(e){return Xt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Xt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,n=this.b,r=this.c;let a,o;Xi.subVectors(n,i),qi.subVectors(r,i),js.subVectors(e,i);const c=Xi.dot(js),l=qi.dot(js);if(c<=0&&l<=0)return t.copy(i);Ys.subVectors(e,n);const h=Xi.dot(Ys),u=qi.dot(Ys);if(h>=0&&u<=h)return t.copy(n);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(i).addScaledVector(Xi,a);$s.subVectors(e,r);const m=Xi.dot($s),g=qi.dot($s);if(g>=0&&m<=g)return t.copy(r);const _=m*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(i).addScaledVector(qi,o);const p=h*g-m*u;if(p<=0&&u-h>=0&&m-g>=0)return Fa.subVectors(r,n),o=(u-h)/(u-h+(m-g)),t.copy(n).addScaledVector(Fa,o);const d=1/(p+_+f);return a=_*d,o=f*d,t.copy(i).addScaledVector(Xi,a).addScaledVector(qi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const ic={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},pi={h:0,s:0,l:0},Wn={h:0,s:0,l:0};function Ks(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Se{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const n=e;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ht){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.toWorkingColorSpace(this,t),this}setRGB(e,t,i,n=$e.workingColorSpace){return this.r=e,this.g=t,this.b=i,$e.toWorkingColorSpace(this,n),this}setHSL(e,t,i,n=$e.workingColorSpace){if(e=Tr(e,1),t=Pt(t,0,1),i=Pt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Ks(a,r,e+1/3),this.g=Ks(a,r,e),this.b=Ks(a,r,e-1/3)}return $e.toWorkingColorSpace(this,n),this}setStyle(e,t=ht){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=n[1],o=n[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=n[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ht){const i=ic[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=an(e.r),this.g=an(e.g),this.b=an(e.b),this}copyLinearToSRGB(e){return this.r=ks(e.r),this.g=ks(e.g),this.b=ks(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ht){return $e.fromWorkingColorSpace(yt.copy(this),e),Math.round(Pt(yt.r*255,0,255))*65536+Math.round(Pt(yt.g*255,0,255))*256+Math.round(Pt(yt.b*255,0,255))}getHexString(e=ht){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.fromWorkingColorSpace(yt.copy(this),t);const i=yt.r,n=yt.g,r=yt.b,a=Math.max(i,n,r),o=Math.min(i,n,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case i:c=(n-r)/u+(n<r?6:0);break;case n:c=(r-i)/u+2;break;case r:c=(i-n)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=$e.workingColorSpace){return $e.fromWorkingColorSpace(yt.copy(this),t),e.r=yt.r,e.g=yt.g,e.b=yt.b,e}getStyle(e=ht){$e.fromWorkingColorSpace(yt.copy(this),e);const t=yt.r,i=yt.g,n=yt.b;return e!==ht?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(e,t,i){return this.getHSL(pi),this.setHSL(pi.h+e,pi.s+t,pi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(pi),e.getHSL(Wn);const i=Sn(pi.h,Wn.h,t),n=Sn(pi.s,Wn.s,t),r=Sn(pi.l,Wn.l,t);return this.setHSL(i,n,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,n=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*n,this.g=r[1]*t+r[4]*i+r[7]*n,this.b=r[2]*t+r[5]*i+r[8]*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const yt=new Se;Se.NAMES=ic;let sh=0;class Oi extends un{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sh++}),this.uuid=dn(),this.name="",this.type="Material",this.blending=rn,this.side=Mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=hr,this.blendDst=ur,this.blendEquation=Ri,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Se(0,0,0),this.blendAlpha=0,this.depthFunc=ds,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ma,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ki,this.stencilZFail=ki,this.stencilZPass=ki,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==rn&&(i.blending=this.blending),this.side!==Mi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==hr&&(i.blendSrc=this.blendSrc),this.blendDst!==ur&&(i.blendDst=this.blendDst),this.blendEquation!==Ri&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ds&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ma&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ki&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ki&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ki&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=n(e.textures),a=n(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const n=t.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ei extends Oi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Se(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=zo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ct=new C,Xn=new ve;class Ct{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=ba,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=vi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[e+n]=t.array[i+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Xn.fromBufferAttribute(this,t),Xn.applyMatrix3(e),this.setXY(t,Xn.x,Xn.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)ct.fromBufferAttribute(this,t),ct.applyMatrix3(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)ct.fromBufferAttribute(this,t),ct.applyMatrix4(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)ct.fromBufferAttribute(this,t),ct.applyNormalMatrix(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)ct.fromBufferAttribute(this,t),ct.transformDirection(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=tn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Tt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=tn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Tt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=tn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Tt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=tn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Tt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=tn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Tt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Tt(t,this.array),i=Tt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,n){return e*=this.itemSize,this.normalized&&(t=Tt(t,this.array),i=Tt(i,this.array),n=Tt(n,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this}setXYZW(e,t,i,n,r){return e*=this.itemSize,this.normalized&&(t=Tt(t,this.array),i=Tt(i,this.array),n=Tt(n,this.array),r=Tt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ba&&(e.usage=this.usage),e}}class nc extends Ct{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class sc extends Ct{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class at extends Ct{constructor(e,t,i){super(new Float32Array(e),t,i)}}let rh=0;const Ot=new rt,Zs=new gt,ji=new C,Ut=new Pn,vn=new Pn,mt=new C;class St extends un{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rh++}),this.uuid=dn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Jo(e)?sc:nc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ve().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ot.makeRotationFromQuaternion(e),this.applyMatrix4(Ot),this}rotateX(e){return Ot.makeRotationX(e),this.applyMatrix4(Ot),this}rotateY(e){return Ot.makeRotationY(e),this.applyMatrix4(Ot),this}rotateZ(e){return Ot.makeRotationZ(e),this.applyMatrix4(Ot),this}translate(e,t,i){return Ot.makeTranslation(e,t,i),this.applyMatrix4(Ot),this}scale(e,t,i){return Ot.makeScale(e,t,i),this.applyMatrix4(Ot),this}lookAt(e){return Zs.lookAt(e),Zs.updateMatrix(),this.applyMatrix4(Zs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ji).negate(),this.translate(ji.x,ji.y,ji.z),this}setFromPoints(e){const t=[];for(let i=0,n=e.length;i<n;i++){const r=e[i];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new at(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,n=t.length;i<n;i++){const r=t[i];Ut.setFromBufferAttribute(r),this.morphTargetsRelative?(mt.addVectors(this.boundingBox.min,Ut.min),this.boundingBox.expandByPoint(mt),mt.addVectors(this.boundingBox.max,Ut.max),this.boundingBox.expandByPoint(mt)):(this.boundingBox.expandByPoint(Ut.min),this.boundingBox.expandByPoint(Ut.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Cn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new C,1/0);return}if(e){const i=this.boundingSphere.center;if(Ut.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];vn.setFromBufferAttribute(o),this.morphTargetsRelative?(mt.addVectors(Ut.min,vn.min),Ut.expandByPoint(mt),mt.addVectors(Ut.max,vn.max),Ut.expandByPoint(mt)):(Ut.expandByPoint(vn.min),Ut.expandByPoint(vn.max))}Ut.getCenter(i);let n=0;for(let r=0,a=e.count;r<a;r++)mt.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(mt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)mt.fromBufferAttribute(o,l),c&&(ji.fromBufferAttribute(e,l),mt.add(ji)),n=Math.max(n,i.distanceToSquared(mt))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,n=t.position.array,r=t.normal.array,a=t.uv.array,o=n.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ct(new Float32Array(4*o),4));const c=this.getAttribute("tangent").array,l=[],h=[];for(let E=0;E<o;E++)l[E]=new C,h[E]=new C;const u=new C,f=new C,m=new C,g=new ve,_=new ve,p=new ve,d=new C,b=new C;function x(E,H,V){u.fromArray(n,E*3),f.fromArray(n,H*3),m.fromArray(n,V*3),g.fromArray(a,E*2),_.fromArray(a,H*2),p.fromArray(a,V*2),f.sub(u),m.sub(u),_.sub(g),p.sub(g);const Q=1/(_.x*p.y-p.x*_.y);isFinite(Q)&&(d.copy(f).multiplyScalar(p.y).addScaledVector(m,-_.y).multiplyScalar(Q),b.copy(m).multiplyScalar(_.x).addScaledVector(f,-p.x).multiplyScalar(Q),l[E].add(d),l[H].add(d),l[V].add(d),h[E].add(b),h[H].add(b),h[V].add(b))}let A=this.groups;A.length===0&&(A=[{start:0,count:i.length}]);for(let E=0,H=A.length;E<H;++E){const V=A[E],Q=V.start,D=V.count;for(let U=Q,O=Q+D;U<O;U+=3)x(i[U+0],i[U+1],i[U+2])}const L=new C,w=new C,P=new C,z=new C;function y(E){P.fromArray(r,E*3),z.copy(P);const H=l[E];L.copy(H),L.sub(P.multiplyScalar(P.dot(H))).normalize(),w.crossVectors(z,H);const Q=w.dot(h[E])<0?-1:1;c[E*4]=L.x,c[E*4+1]=L.y,c[E*4+2]=L.z,c[E*4+3]=Q}for(let E=0,H=A.length;E<H;++E){const V=A[E],Q=V.start,D=V.count;for(let U=Q,O=Q+D;U<O;U+=3)y(i[U+0]),y(i[U+1]),y(i[U+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ct(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,m=i.count;f<m;f++)i.setXYZ(f,0,0,0);const n=new C,r=new C,a=new C,o=new C,c=new C,l=new C,h=new C,u=new C;if(e)for(let f=0,m=e.count;f<m;f+=3){const g=e.getX(f+0),_=e.getX(f+1),p=e.getX(f+2);n.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,p),h.subVectors(a,r),u.subVectors(n,r),h.cross(u),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,p),o.add(h),c.add(h),l.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,m=t.count;f<m;f+=3)n.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,r),u.subVectors(n,r),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)mt.fromBufferAttribute(e,t),mt.normalize(),e.setXYZ(t,mt.x,mt.y,mt.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,u=o.normalized,f=new l.constructor(c.length*h);let m=0,g=0;for(let _=0,p=c.length;_<p;_++){o.isInterleavedBufferAttribute?m=c[_]*o.data.stride+o.offset:m=c[_]*h;for(let d=0;d<h;d++)f[g++]=l[m++]}return new Ct(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new St,i=this.index.array,n=this.attributes;for(const o in n){const c=n[o],l=e(c,i);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){const f=l[h],m=e(f,i);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const n={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const m=l[u];h.push(m.toJSON(e.data))}h.length>0&&(n[c]=h,r=!0)}r&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const n=e.attributes;for(const l in n){const h=n[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,m=u.length;f<m;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Oa=new rt,wi=new Ms,qn=new Cn,ka=new C,Yi=new C,$i=new C,Ki=new C,Js=new C,jn=new C,Yn=new ve,$n=new ve,Kn=new ve,Ba=new C,za=new C,Ga=new C,Zn=new C,Jn=new C;class _t extends gt{constructor(e=new St,t=new ei){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(n,e);const o=this.morphTargetInfluences;if(r&&o){jn.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],u=r[c];h!==0&&(Js.fromBufferAttribute(u,e),a?jn.addScaledVector(Js,h):jn.addScaledVector(Js.sub(t),h))}t.add(jn)}return t}raycast(e,t){const i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),qn.copy(i.boundingSphere),qn.applyMatrix4(r),wi.copy(e.ray).recast(e.near),!(qn.containsPoint(wi.origin)===!1&&(wi.intersectSphere(qn,ka)===null||wi.origin.distanceToSquared(ka)>(e.far-e.near)**2))&&(Oa.copy(r).invert(),wi.copy(e.ray).applyMatrix4(Oa),!(i.boundingBox!==null&&wi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,wi)))}_computeIntersections(e,t,i){let n;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const p=f[g],d=a[p.materialIndex],b=Math.max(p.start,m.start),x=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let A=b,L=x;A<L;A+=3){const w=o.getX(A),P=o.getX(A+1),z=o.getX(A+2);n=Qn(this,d,e,i,l,h,u,w,P,z),n&&(n.faceIndex=Math.floor(A/3),n.face.materialIndex=p.materialIndex,t.push(n))}}else{const g=Math.max(0,m.start),_=Math.min(o.count,m.start+m.count);for(let p=g,d=_;p<d;p+=3){const b=o.getX(p),x=o.getX(p+1),A=o.getX(p+2);n=Qn(this,a,e,i,l,h,u,b,x,A),n&&(n.faceIndex=Math.floor(p/3),t.push(n))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const p=f[g],d=a[p.materialIndex],b=Math.max(p.start,m.start),x=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let A=b,L=x;A<L;A+=3){const w=A,P=A+1,z=A+2;n=Qn(this,d,e,i,l,h,u,w,P,z),n&&(n.faceIndex=Math.floor(A/3),n.face.materialIndex=p.materialIndex,t.push(n))}}else{const g=Math.max(0,m.start),_=Math.min(c.count,m.start+m.count);for(let p=g,d=_;p<d;p+=3){const b=p,x=p+1,A=p+2;n=Qn(this,a,e,i,l,h,u,b,x,A),n&&(n.faceIndex=Math.floor(p/3),t.push(n))}}}}function ah(s,e,t,i,n,r,a,o){let c;if(e.side===Rt?c=i.intersectTriangle(a,r,n,!0,o):c=i.intersectTriangle(n,r,a,e.side===Mi,o),c===null)return null;Jn.copy(o),Jn.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(Jn);return l<t.near||l>t.far?null:{distance:l,point:Jn.clone(),object:s}}function Qn(s,e,t,i,n,r,a,o,c,l){s.getVertexPosition(o,Yi),s.getVertexPosition(c,$i),s.getVertexPosition(l,Ki);const h=ah(s,e,t,i,Yi,$i,Ki,Zn);if(h){n&&(Yn.fromBufferAttribute(n,o),$n.fromBufferAttribute(n,c),Kn.fromBufferAttribute(n,l),h.uv=Xt.getInterpolation(Zn,Yi,$i,Ki,Yn,$n,Kn,new ve)),r&&(Yn.fromBufferAttribute(r,o),$n.fromBufferAttribute(r,c),Kn.fromBufferAttribute(r,l),h.uv1=Xt.getInterpolation(Zn,Yi,$i,Ki,Yn,$n,Kn,new ve),h.uv2=h.uv1),a&&(Ba.fromBufferAttribute(a,o),za.fromBufferAttribute(a,c),Ga.fromBufferAttribute(a,l),h.normal=Xt.getInterpolation(Zn,Yi,$i,Ki,Ba,za,Ga,new C),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new C,materialIndex:0};Xt.getNormal(Yi,$i,Ki,u.normal),h.face=u}return h}class Rn extends St{constructor(e=1,t=1,i=1,n=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:n,heightSegments:r,depthSegments:a};const o=this;n=Math.floor(n),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],u=[];let f=0,m=0;g("z","y","x",-1,-1,i,t,e,a,r,0),g("z","y","x",1,-1,i,t,-e,a,r,1),g("x","z","y",1,1,e,i,t,n,a,2),g("x","z","y",1,-1,e,i,-t,n,a,3),g("x","y","z",1,-1,e,t,i,n,r,4),g("x","y","z",-1,-1,e,t,-i,n,r,5),this.setIndex(c),this.setAttribute("position",new at(l,3)),this.setAttribute("normal",new at(h,3)),this.setAttribute("uv",new at(u,2));function g(_,p,d,b,x,A,L,w,P,z,y){const E=A/P,H=L/z,V=A/2,Q=L/2,D=w/2,U=P+1,O=z+1;let j=0,X=0;const Y=new C;for(let $=0;$<O;$++){const ie=$*H-Q;for(let ne=0;ne<U;ne++){const W=ne*E-V;Y[_]=W*b,Y[p]=ie*x,Y[d]=D,l.push(Y.x,Y.y,Y.z),Y[_]=0,Y[p]=0,Y[d]=w>0?1:-1,h.push(Y.x,Y.y,Y.z),u.push(ne/P),u.push(1-$/z),j+=1}}for(let $=0;$<z;$++)for(let ie=0;ie<P;ie++){const ne=f+ie+U*$,W=f+ie+U*($+1),K=f+(ie+1)+U*($+1),le=f+(ie+1)+U*$;c.push(ne,W,le),c.push(W,K,le),X+=6}o.addGroup(m,X,y),m+=X,f+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function hn(s){const e={};for(const t in s){e[t]={};for(const i in s[t]){const n=s[t][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=n.clone():Array.isArray(n)?e[t][i]=n.slice():e[t][i]=n}}return e}function At(s){const e={};for(let t=0;t<s.length;t++){const i=hn(s[t]);for(const n in i)e[n]=i[n]}return e}function oh(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function rc(s){return s.getRenderTarget()===null?s.outputColorSpace:$e.workingColorSpace}const ch={clone:hn,merge:At};var lh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,hh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Fi extends Oi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=lh,this.fragmentShader=hh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=hn(e.uniforms),this.uniformsGroups=oh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const n in this.uniforms){const a=this.uniforms[n].value;a&&a.isTexture?t.uniforms[n]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[n]={type:"m4",value:a.toArray()}:t.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class ac extends gt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new rt,this.projectionMatrix=new rt,this.projectionMatrixInverse=new rt,this.coordinateSystem=ci}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Nt extends ac{constructor(e=50,t=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Tn*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(yn*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Tn*2*Math.atan(Math.tan(yn*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,n,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(yn*.5*this.fov)/this.zoom,i=2*t,n=this.aspect*i,r=-.5*n;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*n/c,t-=a.offsetY*i/l,n*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Zi=-90,Ji=1;class uh extends gt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new Nt(Zi,Ji,e,t);n.layers=this.layers,this.add(n);const r=new Nt(Zi,Ji,e,t);r.layers=this.layers,this.add(r);const a=new Nt(Zi,Ji,e,t);a.layers=this.layers,this.add(a);const o=new Nt(Zi,Ji,e,t);o.layers=this.layers,this.add(o);const c=new Nt(Zi,Ji,e,t);c.layers=this.layers,this.add(c);const l=new Nt(Zi,Ji,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,n,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===ci)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===gs)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,n),e.render(t,r),e.setRenderTarget(i,1,n),e.render(t,a),e.setRenderTarget(i,2,n),e.render(t,o),e.setRenderTarget(i,3,n),e.render(t,c),e.setRenderTarget(i,4,n),e.render(t,l),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,n),e.render(t,h),e.setRenderTarget(u,f,m),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class oc extends Lt{constructor(e,t,i,n,r,a,o,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:on,super(e,t,i,n,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class dh extends Ni{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},n=[i,i,i,i,i,i];t.encoding!==void 0&&(Mn("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Ui?ht:zt),this.texture=new oc(n,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Bt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},n=new Rn(5,5,5),r=new Fi({name:"CubemapFromEquirect",uniforms:hn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Rt,blending:xi});r.uniforms.tEquirect.value=t;const a=new _t(n,r),o=t.minFilter;return t.minFilter===bn&&(t.minFilter=Bt),new uh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,n){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,n);e.setRenderTarget(r)}}const Qs=new C,fh=new C,ph=new Ve;class gi{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const n=Qs.subVectors(i,t).cross(fh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Qs),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/n;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||ph.getNormalMatrix(e),n=this.coplanarPoint(Qs).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Pi=new Cn,es=new C;class wr{constructor(e=new gi,t=new gi,i=new gi,n=new gi,r=new gi,a=new gi){this.planes=[e,t,i,n,r,a]}set(e,t,i,n,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(n),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ci){const i=this.planes,n=e.elements,r=n[0],a=n[1],o=n[2],c=n[3],l=n[4],h=n[5],u=n[6],f=n[7],m=n[8],g=n[9],_=n[10],p=n[11],d=n[12],b=n[13],x=n[14],A=n[15];if(i[0].setComponents(c-r,f-l,p-m,A-d).normalize(),i[1].setComponents(c+r,f+l,p+m,A+d).normalize(),i[2].setComponents(c+a,f+h,p+g,A+b).normalize(),i[3].setComponents(c-a,f-h,p-g,A-b).normalize(),i[4].setComponents(c-o,f-u,p-_,A-x).normalize(),t===ci)i[5].setComponents(c+o,f+u,p+_,A+x).normalize();else if(t===gs)i[5].setComponents(o,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Pi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Pi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Pi)}intersectsSprite(e){return Pi.center.set(0,0,0),Pi.radius=.7071067811865476,Pi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Pi)}intersectsSphere(e){const t=this.planes,i=e.center,n=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const n=t[i];if(es.x=n.normal.x>0?e.max.x:e.min.x,es.y=n.normal.y>0?e.max.y:e.min.y,es.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(es)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function cc(){let s=null,e=!1,t=null,i=null;function n(r,a){t(r,a),i=s.requestAnimationFrame(n)}return{start:function(){e!==!0&&t!==null&&(i=s.requestAnimationFrame(n),e=!0)},stop:function(){s.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function mh(s,e){const t=e.isWebGL2,i=new WeakMap;function n(l,h){const u=l.array,f=l.usage,m=u.byteLength,g=s.createBuffer();s.bindBuffer(h,g),s.bufferData(h,u,f),l.onUploadCallback();let _;if(u instanceof Float32Array)_=s.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)_=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=s.UNSIGNED_SHORT;else if(u instanceof Int16Array)_=s.SHORT;else if(u instanceof Uint32Array)_=s.UNSIGNED_INT;else if(u instanceof Int32Array)_=s.INT;else if(u instanceof Int8Array)_=s.BYTE;else if(u instanceof Uint8Array)_=s.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)_=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:_,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:m}}function r(l,h,u){const f=h.array,m=h._updateRange,g=h.updateRanges;if(s.bindBuffer(u,l),m.count===-1&&g.length===0&&s.bufferSubData(u,0,f),g.length!==0){for(let _=0,p=g.length;_<p;_++){const d=g[_];t?s.bufferSubData(u,d.start*f.BYTES_PER_ELEMENT,f,d.start,d.count):s.bufferSubData(u,d.start*f.BYTES_PER_ELEMENT,f.subarray(d.start,d.start+d.count))}h.clearUpdateRanges()}m.count!==-1&&(t?s.bufferSubData(u,m.offset*f.BYTES_PER_ELEMENT,f,m.offset,m.count):s.bufferSubData(u,m.offset*f.BYTES_PER_ELEMENT,f.subarray(m.offset,m.offset+m.count)),m.count=-1),h.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),i.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);const h=i.get(l);h&&(s.deleteBuffer(h.buffer),i.delete(l))}function c(l,h){if(l.isGLBufferAttribute){const f=i.get(l);(!f||f.version<l.version)&&i.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const u=i.get(l);if(u===void 0)i.set(l,n(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,l,h),u.version=l.version}}return{get:a,remove:o,update:c}}class Es extends St{constructor(e=1,t=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:n};const r=e/2,a=t/2,o=Math.floor(i),c=Math.floor(n),l=o+1,h=c+1,u=e/o,f=t/c,m=[],g=[],_=[],p=[];for(let d=0;d<h;d++){const b=d*f-a;for(let x=0;x<l;x++){const A=x*u-r;g.push(A,-b,0),_.push(0,0,1),p.push(x/o),p.push(1-d/c)}}for(let d=0;d<c;d++)for(let b=0;b<o;b++){const x=b+l*d,A=b+l*(d+1),L=b+1+l*(d+1),w=b+1+l*d;m.push(x,A,w),m.push(A,L,w)}this.setIndex(m),this.setAttribute("position",new at(g,3)),this.setAttribute("normal",new at(_,3)),this.setAttribute("uv",new at(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Es(e.width,e.height,e.widthSegments,e.heightSegments)}}var gh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_h=`#ifdef USE_ALPHAHASH
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
#endif`,vh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yh=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Sh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Mh=`#ifdef USE_AOMAP
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
#endif`,bh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Eh=`#ifdef USE_BATCHING
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
#endif`,Th=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Ah=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ph=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ch=`#ifdef USE_IRIDESCENCE
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
#endif`,Rh=`#ifdef USE_BUMPMAP
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
#endif`,Lh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Dh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ih=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Uh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Nh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Fh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Oh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,kh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Bh=`#define PI 3.141592653589793
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
} // validated`,zh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Gh=`vec3 transformedNormal = objectNormal;
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
#endif`,Hh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Vh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Wh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Xh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,qh="gl_FragColor = linearToOutputTexel( gl_FragColor );",jh=`
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
}`,Yh=`#ifdef USE_ENVMAP
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
#endif`,$h=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Kh=`#ifdef USE_ENVMAP
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
#endif`,Zh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Jh=`#ifdef USE_ENVMAP
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
#endif`,Qh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,eu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,tu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,iu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,nu=`#ifdef USE_GRADIENTMAP
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
}`,su=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,ru=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,au=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ou=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,cu=`uniform bool receiveShadow;
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
#endif`,lu=`#ifdef USE_ENVMAP
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
#endif`,hu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,uu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,du=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,fu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,pu=`PhysicalMaterial material;
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
#endif`,mu=`struct PhysicalMaterial {
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
}`,gu=`
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
#endif`,_u=`#if defined( RE_IndirectDiffuse )
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
#endif`,vu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,xu=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,yu=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Su=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Mu=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,bu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Eu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Tu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Au=`#if defined( USE_POINTS_UV )
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
#endif`,wu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Pu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Cu=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ru=`#ifdef USE_MORPHNORMALS
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
#endif`,Lu=`#ifdef USE_MORPHTARGETS
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
#endif`,Du=`#ifdef USE_MORPHTARGETS
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
#endif`,Iu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Uu=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Nu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ou=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ku=`#ifdef USE_NORMALMAP
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
#endif`,Bu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,zu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Gu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Hu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Vu=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Wu=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Xu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,qu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ju=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Yu=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$u=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ku=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Zu=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ju=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Qu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ed=`float getShadowMask() {
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
}`,td=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,id=`#ifdef USE_SKINNING
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
#endif`,nd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,sd=`#ifdef USE_SKINNING
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
#endif`,rd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ad=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,od=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cd=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ld=`#ifdef USE_TRANSMISSION
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
#endif`,hd=`#ifdef USE_TRANSMISSION
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
#endif`,ud=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const md=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gd=`uniform sampler2D t2D;
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
}`,_d=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vd=`#ifdef ENVMAP_TYPE_CUBE
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
}`,xd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sd=`#include <common>
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
}`,Md=`#if DEPTH_PACKING == 3200
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
}`,bd=`#define DISTANCE
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
}`,Ed=`#define DISTANCE
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
}`,Td=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ad=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wd=`uniform float scale;
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
}`,Pd=`uniform vec3 diffuse;
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
}`,Cd=`#include <common>
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
}`,Rd=`uniform vec3 diffuse;
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
}`,Ld=`#define LAMBERT
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
}`,Dd=`#define LAMBERT
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
}`,Id=`#define MATCAP
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
}`,Ud=`#define MATCAP
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
}`,Nd=`#define NORMAL
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
}`,Fd=`#define NORMAL
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
}`,Od=`#define PHONG
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
}`,kd=`#define PHONG
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
}`,Bd=`#define STANDARD
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
}`,zd=`#define STANDARD
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
}`,Gd=`#define TOON
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
}`,Hd=`#define TOON
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
}`,Vd=`uniform float size;
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
}`,Wd=`uniform vec3 diffuse;
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
}`,Xd=`#include <common>
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
}`,qd=`uniform vec3 color;
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
}`,jd=`uniform float rotation;
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
}`,Yd=`uniform vec3 diffuse;
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
}`,Oe={alphahash_fragment:gh,alphahash_pars_fragment:_h,alphamap_fragment:vh,alphamap_pars_fragment:xh,alphatest_fragment:yh,alphatest_pars_fragment:Sh,aomap_fragment:Mh,aomap_pars_fragment:bh,batching_pars_vertex:Eh,batching_vertex:Th,begin_vertex:Ah,beginnormal_vertex:wh,bsdfs:Ph,iridescence_fragment:Ch,bumpmap_pars_fragment:Rh,clipping_planes_fragment:Lh,clipping_planes_pars_fragment:Dh,clipping_planes_pars_vertex:Ih,clipping_planes_vertex:Uh,color_fragment:Nh,color_pars_fragment:Fh,color_pars_vertex:Oh,color_vertex:kh,common:Bh,cube_uv_reflection_fragment:zh,defaultnormal_vertex:Gh,displacementmap_pars_vertex:Hh,displacementmap_vertex:Vh,emissivemap_fragment:Wh,emissivemap_pars_fragment:Xh,colorspace_fragment:qh,colorspace_pars_fragment:jh,envmap_fragment:Yh,envmap_common_pars_fragment:$h,envmap_pars_fragment:Kh,envmap_pars_vertex:Zh,envmap_physical_pars_fragment:lu,envmap_vertex:Jh,fog_vertex:Qh,fog_pars_vertex:eu,fog_fragment:tu,fog_pars_fragment:iu,gradientmap_pars_fragment:nu,lightmap_fragment:su,lightmap_pars_fragment:ru,lights_lambert_fragment:au,lights_lambert_pars_fragment:ou,lights_pars_begin:cu,lights_toon_fragment:hu,lights_toon_pars_fragment:uu,lights_phong_fragment:du,lights_phong_pars_fragment:fu,lights_physical_fragment:pu,lights_physical_pars_fragment:mu,lights_fragment_begin:gu,lights_fragment_maps:_u,lights_fragment_end:vu,logdepthbuf_fragment:xu,logdepthbuf_pars_fragment:yu,logdepthbuf_pars_vertex:Su,logdepthbuf_vertex:Mu,map_fragment:bu,map_pars_fragment:Eu,map_particle_fragment:Tu,map_particle_pars_fragment:Au,metalnessmap_fragment:wu,metalnessmap_pars_fragment:Pu,morphcolor_vertex:Cu,morphnormal_vertex:Ru,morphtarget_pars_vertex:Lu,morphtarget_vertex:Du,normal_fragment_begin:Iu,normal_fragment_maps:Uu,normal_pars_fragment:Nu,normal_pars_vertex:Fu,normal_vertex:Ou,normalmap_pars_fragment:ku,clearcoat_normal_fragment_begin:Bu,clearcoat_normal_fragment_maps:zu,clearcoat_pars_fragment:Gu,iridescence_pars_fragment:Hu,opaque_fragment:Vu,packing:Wu,premultiplied_alpha_fragment:Xu,project_vertex:qu,dithering_fragment:ju,dithering_pars_fragment:Yu,roughnessmap_fragment:$u,roughnessmap_pars_fragment:Ku,shadowmap_pars_fragment:Zu,shadowmap_pars_vertex:Ju,shadowmap_vertex:Qu,shadowmask_pars_fragment:ed,skinbase_vertex:td,skinning_pars_vertex:id,skinning_vertex:nd,skinnormal_vertex:sd,specularmap_fragment:rd,specularmap_pars_fragment:ad,tonemapping_fragment:od,tonemapping_pars_fragment:cd,transmission_fragment:ld,transmission_pars_fragment:hd,uv_pars_fragment:ud,uv_pars_vertex:dd,uv_vertex:fd,worldpos_vertex:pd,background_vert:md,background_frag:gd,backgroundCube_vert:_d,backgroundCube_frag:vd,cube_vert:xd,cube_frag:yd,depth_vert:Sd,depth_frag:Md,distanceRGBA_vert:bd,distanceRGBA_frag:Ed,equirect_vert:Td,equirect_frag:Ad,linedashed_vert:wd,linedashed_frag:Pd,meshbasic_vert:Cd,meshbasic_frag:Rd,meshlambert_vert:Ld,meshlambert_frag:Dd,meshmatcap_vert:Id,meshmatcap_frag:Ud,meshnormal_vert:Nd,meshnormal_frag:Fd,meshphong_vert:Od,meshphong_frag:kd,meshphysical_vert:Bd,meshphysical_frag:zd,meshtoon_vert:Gd,meshtoon_frag:Hd,points_vert:Vd,points_frag:Wd,shadow_vert:Xd,shadow_frag:qd,sprite_vert:jd,sprite_frag:Yd},re={common:{diffuse:{value:new Se(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new ve(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Se(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Se(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new Se(16777215)},opacity:{value:1},center:{value:new ve(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},Qt={basic:{uniforms:At([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:At([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Se(0)}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:At([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Se(0)},specular:{value:new Se(1118481)},shininess:{value:30}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:At([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new Se(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:At([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new Se(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:At([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:At([re.points,re.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:At([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:At([re.common,re.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:At([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:At([re.sprite,re.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distanceRGBA:{uniforms:At([re.common,re.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distanceRGBA_vert,fragmentShader:Oe.distanceRGBA_frag},shadow:{uniforms:At([re.lights,re.fog,{color:{value:new Se(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};Qt.physical={uniforms:At([Qt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new ve(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new Se(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new ve},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new Se(0)},specularColor:{value:new Se(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new ve},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};const ts={r:0,b:0,g:0};function $d(s,e,t,i,n,r,a){const o=new Se(0);let c=r===!0?0:1,l,h,u=null,f=0,m=null;function g(p,d){let b=!1,x=d.isScene===!0?d.background:null;x&&x.isTexture&&(x=(d.backgroundBlurriness>0?t:e).get(x)),x===null?_(o,c):x&&x.isColor&&(_(x,1),b=!0);const A=s.xr.getEnvironmentBlendMode();A==="additive"?i.buffers.color.setClear(0,0,0,1,a):A==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(s.autoClear||b)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),x&&(x.isCubeTexture||x.mapping===ys)?(h===void 0&&(h=new _t(new Rn(1,1,1),new Fi({name:"BackgroundCubeMaterial",uniforms:hn(Qt.backgroundCube.uniforms),vertexShader:Qt.backgroundCube.vertexShader,fragmentShader:Qt.backgroundCube.fragmentShader,side:Rt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,w,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(h)),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,h.material.toneMapped=$e.getTransfer(x.colorSpace)!==Qe,(u!==x||f!==x.version||m!==s.toneMapping)&&(h.material.needsUpdate=!0,u=x,f=x.version,m=s.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new _t(new Es(2,2),new Fi({name:"BackgroundMaterial",uniforms:hn(Qt.background.uniforms),vertexShader:Qt.background.vertexShader,fragmentShader:Qt.background.fragmentShader,side:Mi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,l.material.toneMapped=$e.getTransfer(x.colorSpace)!==Qe,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||f!==x.version||m!==s.toneMapping)&&(l.material.needsUpdate=!0,u=x,f=x.version,m=s.toneMapping),l.layers.enableAll(),p.unshift(l,l.geometry,l.material,0,0,null))}function _(p,d){p.getRGB(ts,rc(s)),i.buffers.color.setClear(ts.r,ts.g,ts.b,d,a)}return{getClearColor:function(){return o},setClearColor:function(p,d=1){o.set(p),c=d,_(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(p){c=p,_(o,c)},render:g}}function Kd(s,e,t,i){const n=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||r!==null,o={},c=p(null);let l=c,h=!1;function u(D,U,O,j,X){let Y=!1;if(a){const $=_(j,O,U);l!==$&&(l=$,m(l.object)),Y=d(D,j,O,X),Y&&b(D,j,O,X)}else{const $=U.wireframe===!0;(l.geometry!==j.id||l.program!==O.id||l.wireframe!==$)&&(l.geometry=j.id,l.program=O.id,l.wireframe=$,Y=!0)}X!==null&&t.update(X,s.ELEMENT_ARRAY_BUFFER),(Y||h)&&(h=!1,z(D,U,O,j),X!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function f(){return i.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function m(D){return i.isWebGL2?s.bindVertexArray(D):r.bindVertexArrayOES(D)}function g(D){return i.isWebGL2?s.deleteVertexArray(D):r.deleteVertexArrayOES(D)}function _(D,U,O){const j=O.wireframe===!0;let X=o[D.id];X===void 0&&(X={},o[D.id]=X);let Y=X[U.id];Y===void 0&&(Y={},X[U.id]=Y);let $=Y[j];return $===void 0&&($=p(f()),Y[j]=$),$}function p(D){const U=[],O=[],j=[];for(let X=0;X<n;X++)U[X]=0,O[X]=0,j[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:O,attributeDivisors:j,object:D,attributes:{},index:null}}function d(D,U,O,j){const X=l.attributes,Y=U.attributes;let $=0;const ie=O.getAttributes();for(const ne in ie)if(ie[ne].location>=0){const K=X[ne];let le=Y[ne];if(le===void 0&&(ne==="instanceMatrix"&&D.instanceMatrix&&(le=D.instanceMatrix),ne==="instanceColor"&&D.instanceColor&&(le=D.instanceColor)),K===void 0||K.attribute!==le||le&&K.data!==le.data)return!0;$++}return l.attributesNum!==$||l.index!==j}function b(D,U,O,j){const X={},Y=U.attributes;let $=0;const ie=O.getAttributes();for(const ne in ie)if(ie[ne].location>=0){let K=Y[ne];K===void 0&&(ne==="instanceMatrix"&&D.instanceMatrix&&(K=D.instanceMatrix),ne==="instanceColor"&&D.instanceColor&&(K=D.instanceColor));const le={};le.attribute=K,K&&K.data&&(le.data=K.data),X[ne]=le,$++}l.attributes=X,l.attributesNum=$,l.index=j}function x(){const D=l.newAttributes;for(let U=0,O=D.length;U<O;U++)D[U]=0}function A(D){L(D,0)}function L(D,U){const O=l.newAttributes,j=l.enabledAttributes,X=l.attributeDivisors;O[D]=1,j[D]===0&&(s.enableVertexAttribArray(D),j[D]=1),X[D]!==U&&((i.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,U),X[D]=U)}function w(){const D=l.newAttributes,U=l.enabledAttributes;for(let O=0,j=U.length;O<j;O++)U[O]!==D[O]&&(s.disableVertexAttribArray(O),U[O]=0)}function P(D,U,O,j,X,Y,$){$===!0?s.vertexAttribIPointer(D,U,O,X,Y):s.vertexAttribPointer(D,U,O,j,X,Y)}function z(D,U,O,j){if(i.isWebGL2===!1&&(D.isInstancedMesh||j.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const X=j.attributes,Y=O.getAttributes(),$=U.defaultAttributeValues;for(const ie in Y){const ne=Y[ie];if(ne.location>=0){let W=X[ie];if(W===void 0&&(ie==="instanceMatrix"&&D.instanceMatrix&&(W=D.instanceMatrix),ie==="instanceColor"&&D.instanceColor&&(W=D.instanceColor)),W!==void 0){const K=W.normalized,le=W.itemSize,_e=t.get(W);if(_e===void 0)continue;const ge=_e.buffer,Ie=_e.type,Ne=_e.bytesPerElement,Ae=i.isWebGL2===!0&&(Ie===s.INT||Ie===s.UNSIGNED_INT||W.gpuType===Ho);if(W.isInterleavedBufferAttribute){const Xe=W.data,N=Xe.stride,Mt=W.offset;if(Xe.isInstancedInterleavedBuffer){for(let Me=0;Me<ne.locationSize;Me++)L(ne.location+Me,Xe.meshPerAttribute);D.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=Xe.meshPerAttribute*Xe.count)}else for(let Me=0;Me<ne.locationSize;Me++)A(ne.location+Me);s.bindBuffer(s.ARRAY_BUFFER,ge);for(let Me=0;Me<ne.locationSize;Me++)P(ne.location+Me,le/ne.locationSize,Ie,K,N*Ne,(Mt+le/ne.locationSize*Me)*Ne,Ae)}else{if(W.isInstancedBufferAttribute){for(let Xe=0;Xe<ne.locationSize;Xe++)L(ne.location+Xe,W.meshPerAttribute);D.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let Xe=0;Xe<ne.locationSize;Xe++)A(ne.location+Xe);s.bindBuffer(s.ARRAY_BUFFER,ge);for(let Xe=0;Xe<ne.locationSize;Xe++)P(ne.location+Xe,le/ne.locationSize,Ie,K,le*Ne,le/ne.locationSize*Xe*Ne,Ae)}}else if($!==void 0){const K=$[ie];if(K!==void 0)switch(K.length){case 2:s.vertexAttrib2fv(ne.location,K);break;case 3:s.vertexAttrib3fv(ne.location,K);break;case 4:s.vertexAttrib4fv(ne.location,K);break;default:s.vertexAttrib1fv(ne.location,K)}}}}w()}function y(){V();for(const D in o){const U=o[D];for(const O in U){const j=U[O];for(const X in j)g(j[X].object),delete j[X];delete U[O]}delete o[D]}}function E(D){if(o[D.id]===void 0)return;const U=o[D.id];for(const O in U){const j=U[O];for(const X in j)g(j[X].object),delete j[X];delete U[O]}delete o[D.id]}function H(D){for(const U in o){const O=o[U];if(O[D.id]===void 0)continue;const j=O[D.id];for(const X in j)g(j[X].object),delete j[X];delete O[D.id]}}function V(){Q(),h=!0,l!==c&&(l=c,m(l.object))}function Q(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:V,resetDefaultState:Q,dispose:y,releaseStatesOfGeometry:E,releaseStatesOfProgram:H,initAttributes:x,enableAttribute:A,disableUnusedAttributes:w}}function Zd(s,e,t,i){const n=i.isWebGL2;let r;function a(h){r=h}function o(h,u){s.drawArrays(r,h,u),t.update(u,r,1)}function c(h,u,f){if(f===0)return;let m,g;if(n)m=s,g="drawArraysInstanced";else if(m=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[g](r,h,u,f),t.update(u,r,f)}function l(h,u,f){if(f===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<f;g++)this.render(h[g],u[g]);else{m.multiDrawArraysWEBGL(r,h,0,u,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_];t.update(g,r,1)}}this.setMode=a,this.render=o,this.renderInstances=c,this.renderMultiDraw=l}function Jd(s,e,t){let i;function n(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(P){if(P==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const c=r(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);const l=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),_=s.getParameter(s.MAX_VERTEX_ATTRIBS),p=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),d=s.getParameter(s.MAX_VARYING_VECTORS),b=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),x=f>0,A=a||e.has("OES_texture_float"),L=x&&A,w=a?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:l,getMaxAnisotropy:n,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:f,maxTextureSize:m,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:p,maxVaryings:d,maxFragmentUniforms:b,vertexTextures:x,floatFragmentTextures:A,floatVertexTextures:L,maxSamples:w}}function Qd(s){const e=this;let t=null,i=0,n=!1,r=!1;const a=new gi,o=new Ve,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const m=u.length!==0||f||i!==0||n;return n=f,i=u.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,m){const g=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,d=s.get(u);if(!n||g===null||g.length===0||r&&!p)r?h(null):l();else{const b=r?0:i,x=b*4;let A=d.clippingState||null;c.value=A,A=h(g,f,x,m);for(let L=0;L!==x;++L)A[L]=t[L];d.clippingState=A,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,f,m,g){const _=u!==null?u.length:0;let p=null;if(_!==0){if(p=c.value,g!==!0||p===null){const d=m+_*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(p===null||p.length<d)&&(p=new Float32Array(d));for(let x=0,A=m;x!==_;++x,A+=4)a.copy(u[x]).applyMatrix4(b,o),a.normal.toArray(p,A),p[A+3]=a.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function ef(s){let e=new WeakMap;function t(a,o){return o===dr?a.mapping=on:o===fr&&(a.mapping=cn),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===dr||o===fr)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new dh(c.height/2);return l.fromEquirectangularTexture(s,a),e.set(a,l),a.addEventListener("dispose",n),t(l.texture,a.mapping)}else return null}}return a}function n(a){const o=a.target;o.removeEventListener("dispose",n);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}class lc extends ac{constructor(e=-1,t=1,i=1,n=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=n+t,c=n-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const nn=4,Ha=[.125,.215,.35,.446,.526,.582],Li=20,er=new lc,Va=new Se;let tr=null,ir=0,nr=0;const Ci=(1+Math.sqrt(5))/2,Qi=1/Ci,Wa=[new C(1,1,1),new C(-1,1,1),new C(1,1,-1),new C(-1,1,-1),new C(0,Ci,Qi),new C(0,Ci,-Qi),new C(Qi,0,Ci),new C(-Qi,0,Ci),new C(Ci,Qi,0),new C(-Ci,Qi,0)];class Xa{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,n=100){tr=this._renderer.getRenderTarget(),ir=this._renderer.getActiveCubeFace(),nr=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,n,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ya(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ja(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(tr,ir,nr),e.scissorTest=!1,is(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===on||e.mapping===cn?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),tr=this._renderer.getRenderTarget(),ir=this._renderer.getActiveCubeFace(),nr=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Bt,minFilter:Bt,generateMipmaps:!1,type:En,format:Yt,colorSpace:li,depthBuffer:!1},n=qa(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=qa(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=tf(r)),this._blurMaterial=nf(r,e,t)}return n}_compileMaterial(e){const t=new _t(this._lodPlanes[0],e);this._renderer.compile(t,er)}_sceneToCubeUV(e,t,i,n){const o=new Nt(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Va),h.toneMapping=yi,h.autoClear=!1;const m=new ei({name:"PMREM.Background",side:Rt,depthWrite:!1,depthTest:!1}),g=new _t(new Rn,m);let _=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,_=!0):(m.color.copy(Va),_=!0);for(let d=0;d<6;d++){const b=d%3;b===0?(o.up.set(0,c[d],0),o.lookAt(l[d],0,0)):b===1?(o.up.set(0,0,c[d]),o.lookAt(0,l[d],0)):(o.up.set(0,c[d],0),o.lookAt(0,0,l[d]));const x=this._cubeSize;is(n,b*x,d>2?x:0,x,x),h.setRenderTarget(n),_&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,e.background=p}_textureToCubeUV(e,t){const i=this._renderer,n=e.mapping===on||e.mapping===cn;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ya()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ja());const r=n?this._cubemapMaterial:this._equirectMaterial,a=new _t(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;is(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,er)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let n=1;n<this._lodPlanes.length;n++){const r=Math.sqrt(this._sigmas[n]*this._sigmas[n]-this._sigmas[n-1]*this._sigmas[n-1]),a=Wa[(n-1)%Wa.length];this._blur(e,n-1,n,r,a)}t.autoClear=i}_blur(e,t,i,n,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,n,"latitudinal",r),this._halfBlur(a,e,i,i,n,"longitudinal",r)}_halfBlur(e,t,i,n,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new _t(this._lodPlanes[n],l),f=l.uniforms,m=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Li-1),_=r/g,p=isFinite(r)?1+Math.floor(h*_):Li;p>Li&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Li}`);const d=[];let b=0;for(let P=0;P<Li;++P){const z=P/_,y=Math.exp(-z*z/2);d.push(y),P===0?b+=y:P<p&&(b+=2*y)}for(let P=0;P<d.length;P++)d[P]=d[P]/b;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:x}=this;f.dTheta.value=g,f.mipInt.value=x-i;const A=this._sizeLods[n],L=3*A*(n>x-nn?n-x+nn:0),w=4*(this._cubeSize-A);is(t,L,w,3*A,2*A),c.setRenderTarget(t),c.render(u,er)}}function tf(s){const e=[],t=[],i=[];let n=s;const r=s-nn+1+Ha.length;for(let a=0;a<r;a++){const o=Math.pow(2,n);t.push(o);let c=1/o;a>s-nn?c=Ha[a-s+nn-1]:a===0&&(c=0),i.push(c);const l=1/(o-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],m=6,g=6,_=3,p=2,d=1,b=new Float32Array(_*g*m),x=new Float32Array(p*g*m),A=new Float32Array(d*g*m);for(let w=0;w<m;w++){const P=w%3*2/3-1,z=w>2?0:-1,y=[P,z,0,P+2/3,z,0,P+2/3,z+1,0,P,z,0,P+2/3,z+1,0,P,z+1,0];b.set(y,_*g*w),x.set(f,p*g*w);const E=[w,w,w,w,w,w];A.set(E,d*g*w)}const L=new St;L.setAttribute("position",new Ct(b,_)),L.setAttribute("uv",new Ct(x,p)),L.setAttribute("faceIndex",new Ct(A,d)),e.push(L),n>nn&&n--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function qa(s,e,t){const i=new Ni(s,e,t);return i.texture.mapping=ys,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function is(s,e,t,i,n){s.viewport.set(e,t,i,n),s.scissor.set(e,t,i,n)}function nf(s,e,t){const i=new Float32Array(Li),n=new C(0,1,0);return new Fi({name:"SphericalGaussianBlur",defines:{n:Li,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:Pr(),fragmentShader:`

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
		`,blending:xi,depthTest:!1,depthWrite:!1})}function ja(){return new Fi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Pr(),fragmentShader:`

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
		`,blending:xi,depthTest:!1,depthWrite:!1})}function Ya(){return new Fi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Pr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:xi,depthTest:!1,depthWrite:!1})}function Pr(){return`

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
	`}function sf(s){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const c=o.mapping,l=c===dr||c===fr,h=c===on||c===cn;if(l||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=e.get(o);return t===null&&(t=new Xa(s)),u=l?t.fromEquirectangular(o,u):t.fromCubemap(o,u),e.set(o,u),u.texture}else{if(e.has(o))return e.get(o).texture;{const u=o.image;if(l&&u&&u.height>0||h&&u&&n(u)){t===null&&(t=new Xa(s));const f=l?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,f),o.addEventListener("dispose",r),f.texture}else return null}}}return o}function n(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function rf(s){const e={};function t(i){if(e[i]!==void 0)return e[i];let n;switch(i){case"WEBGL_depth_texture":n=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":n=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":n=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":n=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:n=s.getExtension(i)}return e[i]=n,n}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const n=t(i);return n===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),n}}}function af(s,e,t,i){const n={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let p=0,d=_.length;p<d;p++)e.remove(_[p])}f.removeEventListener("dispose",a),delete n[f.id];const m=r.get(f);m&&(e.remove(m),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(u,f){return n[f.id]===!0||(f.addEventListener("dispose",a),n[f.id]=!0,t.memory.geometries++),f}function c(u){const f=u.attributes;for(const g in f)e.update(f[g],s.ARRAY_BUFFER);const m=u.morphAttributes;for(const g in m){const _=m[g];for(let p=0,d=_.length;p<d;p++)e.update(_[p],s.ARRAY_BUFFER)}}function l(u){const f=[],m=u.index,g=u.attributes.position;let _=0;if(m!==null){const b=m.array;_=m.version;for(let x=0,A=b.length;x<A;x+=3){const L=b[x+0],w=b[x+1],P=b[x+2];f.push(L,w,w,P,P,L)}}else if(g!==void 0){const b=g.array;_=g.version;for(let x=0,A=b.length/3-1;x<A;x+=3){const L=x+0,w=x+1,P=x+2;f.push(L,w,w,P,P,L)}}else return;const p=new(Jo(f)?sc:nc)(f,1);p.version=_;const d=r.get(u);d&&e.remove(d),r.set(u,p)}function h(u){const f=r.get(u);if(f){const m=u.index;m!==null&&f.version<m.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function of(s,e,t,i){const n=i.isWebGL2;let r;function a(m){r=m}let o,c;function l(m){o=m.type,c=m.bytesPerElement}function h(m,g){s.drawElements(r,g,o,m*c),t.update(g,r,1)}function u(m,g,_){if(_===0)return;let p,d;if(n)p=s,d="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[d](r,g,o,m*c,_),t.update(g,r,_)}function f(m,g,_){if(_===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let d=0;d<_;d++)this.render(m[d]/c,g[d]);else{p.multiDrawElementsWEBGL(r,g,0,o,m,0,_);let d=0;for(let b=0;b<_;b++)d+=g[b];t.update(d,r,1)}}this.setMode=a,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=f}function cf(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function n(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:n,update:i}}function lf(s,e){return s[0]-e[0]}function hf(s,e){return Math.abs(e[1])-Math.abs(s[1])}function uf(s,e,t){const i={},n=new Float32Array(8),r=new WeakMap,a=new et,o=[];for(let l=0;l<8;l++)o[l]=[l,0];function c(l,h,u){const f=l.morphTargetInfluences;if(e.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let p=r.get(h);if(p===void 0||p.count!==_){let U=function(){Q.dispose(),r.delete(h),h.removeEventListener("dispose",U)};var m=U;p!==void 0&&p.texture.dispose();const x=h.morphAttributes.position!==void 0,A=h.morphAttributes.normal!==void 0,L=h.morphAttributes.color!==void 0,w=h.morphAttributes.position||[],P=h.morphAttributes.normal||[],z=h.morphAttributes.color||[];let y=0;x===!0&&(y=1),A===!0&&(y=2),L===!0&&(y=3);let E=h.attributes.position.count*y,H=1;E>e.maxTextureSize&&(H=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const V=new Float32Array(E*H*4*_),Q=new tc(V,E,H,_);Q.type=vi,Q.needsUpdate=!0;const D=y*4;for(let O=0;O<_;O++){const j=w[O],X=P[O],Y=z[O],$=E*H*4*O;for(let ie=0;ie<j.count;ie++){const ne=ie*D;x===!0&&(a.fromBufferAttribute(j,ie),V[$+ne+0]=a.x,V[$+ne+1]=a.y,V[$+ne+2]=a.z,V[$+ne+3]=0),A===!0&&(a.fromBufferAttribute(X,ie),V[$+ne+4]=a.x,V[$+ne+5]=a.y,V[$+ne+6]=a.z,V[$+ne+7]=0),L===!0&&(a.fromBufferAttribute(Y,ie),V[$+ne+8]=a.x,V[$+ne+9]=a.y,V[$+ne+10]=a.z,V[$+ne+11]=Y.itemSize===4?a.w:1)}}p={count:_,texture:Q,size:new ve(E,H)},r.set(h,p),h.addEventListener("dispose",U)}let d=0;for(let x=0;x<f.length;x++)d+=f[x];const b=h.morphTargetsRelative?1:1-d;u.getUniforms().setValue(s,"morphTargetBaseInfluence",b),u.getUniforms().setValue(s,"morphTargetInfluences",f),u.getUniforms().setValue(s,"morphTargetsTexture",p.texture,t),u.getUniforms().setValue(s,"morphTargetsTextureSize",p.size)}else{const g=f===void 0?0:f.length;let _=i[h.id];if(_===void 0||_.length!==g){_=[];for(let A=0;A<g;A++)_[A]=[A,0];i[h.id]=_}for(let A=0;A<g;A++){const L=_[A];L[0]=A,L[1]=f[A]}_.sort(hf);for(let A=0;A<8;A++)A<g&&_[A][1]?(o[A][0]=_[A][0],o[A][1]=_[A][1]):(o[A][0]=Number.MAX_SAFE_INTEGER,o[A][1]=0);o.sort(lf);const p=h.morphAttributes.position,d=h.morphAttributes.normal;let b=0;for(let A=0;A<8;A++){const L=o[A],w=L[0],P=L[1];w!==Number.MAX_SAFE_INTEGER&&P?(p&&h.getAttribute("morphTarget"+A)!==p[w]&&h.setAttribute("morphTarget"+A,p[w]),d&&h.getAttribute("morphNormal"+A)!==d[w]&&h.setAttribute("morphNormal"+A,d[w]),n[A]=P,b+=P):(p&&h.hasAttribute("morphTarget"+A)===!0&&h.deleteAttribute("morphTarget"+A),d&&h.hasAttribute("morphNormal"+A)===!0&&h.deleteAttribute("morphNormal"+A),n[A]=0)}const x=h.morphTargetsRelative?1:1-b;u.getUniforms().setValue(s,"morphTargetBaseInfluence",x),u.getUniforms().setValue(s,"morphTargetInfluences",n)}}return{update:c}}function df(s,e,t,i){let n=new WeakMap;function r(c){const l=i.render.frame,h=c.geometry,u=e.get(c,h);if(n.get(u)!==l&&(e.update(u),n.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),n.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),n.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;n.get(f)!==l&&(f.update(),n.set(f,l))}return u}function a(){n=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}class hc extends Lt{constructor(e,t,i,n,r,a,o,c,l,h){if(h=h!==void 0?h:Ii,h!==Ii&&h!==ln)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Ii&&(i=_i),i===void 0&&h===ln&&(i=Di),super(null,n,r,a,o,c,h,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:wt,this.minFilter=c!==void 0?c:wt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const uc=new Lt,dc=new hc(1,1);dc.compareFunction=Zo;const fc=new tc,pc=new $l,mc=new oc,$a=[],Ka=[],Za=new Float32Array(16),Ja=new Float32Array(9),Qa=new Float32Array(4);function fn(s,e,t){const i=s[0];if(i<=0||i>0)return s;const n=e*t;let r=$a[n];if(r===void 0&&(r=new Float32Array(n),$a[n]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function ut(s,e){if(s.length!==e.length)return!1;for(let t=0,i=s.length;t<i;t++)if(s[t]!==e[t])return!1;return!0}function dt(s,e){for(let t=0,i=e.length;t<i;t++)s[t]=e[t]}function Ts(s,e){let t=Ka[e];t===void 0&&(t=new Int32Array(e),Ka[e]=t);for(let i=0;i!==e;++i)t[i]=s.allocateTextureUnit();return t}function ff(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function pf(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ut(t,e))return;s.uniform2fv(this.addr,e),dt(t,e)}}function mf(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ut(t,e))return;s.uniform3fv(this.addr,e),dt(t,e)}}function gf(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ut(t,e))return;s.uniform4fv(this.addr,e),dt(t,e)}}function _f(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(ut(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),dt(t,e)}else{if(ut(t,i))return;Qa.set(i),s.uniformMatrix2fv(this.addr,!1,Qa),dt(t,i)}}function vf(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(ut(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),dt(t,e)}else{if(ut(t,i))return;Ja.set(i),s.uniformMatrix3fv(this.addr,!1,Ja),dt(t,i)}}function xf(s,e){const t=this.cache,i=e.elements;if(i===void 0){if(ut(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),dt(t,e)}else{if(ut(t,i))return;Za.set(i),s.uniformMatrix4fv(this.addr,!1,Za),dt(t,i)}}function yf(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Sf(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ut(t,e))return;s.uniform2iv(this.addr,e),dt(t,e)}}function Mf(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ut(t,e))return;s.uniform3iv(this.addr,e),dt(t,e)}}function bf(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ut(t,e))return;s.uniform4iv(this.addr,e),dt(t,e)}}function Ef(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Tf(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ut(t,e))return;s.uniform2uiv(this.addr,e),dt(t,e)}}function Af(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ut(t,e))return;s.uniform3uiv(this.addr,e),dt(t,e)}}function wf(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ut(t,e))return;s.uniform4uiv(this.addr,e),dt(t,e)}}function Pf(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);const r=this.type===s.SAMPLER_2D_SHADOW?dc:uc;t.setTexture2D(e||r,n)}function Cf(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture3D(e||pc,n)}function Rf(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTextureCube(e||mc,n)}function Lf(s,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),t.setTexture2DArray(e||fc,n)}function Df(s){switch(s){case 5126:return ff;case 35664:return pf;case 35665:return mf;case 35666:return gf;case 35674:return _f;case 35675:return vf;case 35676:return xf;case 5124:case 35670:return yf;case 35667:case 35671:return Sf;case 35668:case 35672:return Mf;case 35669:case 35673:return bf;case 5125:return Ef;case 36294:return Tf;case 36295:return Af;case 36296:return wf;case 35678:case 36198:case 36298:case 36306:case 35682:return Pf;case 35679:case 36299:case 36307:return Cf;case 35680:case 36300:case 36308:case 36293:return Rf;case 36289:case 36303:case 36311:case 36292:return Lf}}function If(s,e){s.uniform1fv(this.addr,e)}function Uf(s,e){const t=fn(e,this.size,2);s.uniform2fv(this.addr,t)}function Nf(s,e){const t=fn(e,this.size,3);s.uniform3fv(this.addr,t)}function Ff(s,e){const t=fn(e,this.size,4);s.uniform4fv(this.addr,t)}function Of(s,e){const t=fn(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function kf(s,e){const t=fn(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Bf(s,e){const t=fn(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function zf(s,e){s.uniform1iv(this.addr,e)}function Gf(s,e){s.uniform2iv(this.addr,e)}function Hf(s,e){s.uniform3iv(this.addr,e)}function Vf(s,e){s.uniform4iv(this.addr,e)}function Wf(s,e){s.uniform1uiv(this.addr,e)}function Xf(s,e){s.uniform2uiv(this.addr,e)}function qf(s,e){s.uniform3uiv(this.addr,e)}function jf(s,e){s.uniform4uiv(this.addr,e)}function Yf(s,e,t){const i=this.cache,n=e.length,r=Ts(t,n);ut(i,r)||(s.uniform1iv(this.addr,r),dt(i,r));for(let a=0;a!==n;++a)t.setTexture2D(e[a]||uc,r[a])}function $f(s,e,t){const i=this.cache,n=e.length,r=Ts(t,n);ut(i,r)||(s.uniform1iv(this.addr,r),dt(i,r));for(let a=0;a!==n;++a)t.setTexture3D(e[a]||pc,r[a])}function Kf(s,e,t){const i=this.cache,n=e.length,r=Ts(t,n);ut(i,r)||(s.uniform1iv(this.addr,r),dt(i,r));for(let a=0;a!==n;++a)t.setTextureCube(e[a]||mc,r[a])}function Zf(s,e,t){const i=this.cache,n=e.length,r=Ts(t,n);ut(i,r)||(s.uniform1iv(this.addr,r),dt(i,r));for(let a=0;a!==n;++a)t.setTexture2DArray(e[a]||fc,r[a])}function Jf(s){switch(s){case 5126:return If;case 35664:return Uf;case 35665:return Nf;case 35666:return Ff;case 35674:return Of;case 35675:return kf;case 35676:return Bf;case 5124:case 35670:return zf;case 35667:case 35671:return Gf;case 35668:case 35672:return Hf;case 35669:case 35673:return Vf;case 5125:return Wf;case 36294:return Xf;case 36295:return qf;case 36296:return jf;case 35678:case 36198:case 36298:case 36306:case 35682:return Yf;case 35679:case 36299:case 36307:return $f;case 35680:case 36300:case 36308:case 36293:return Kf;case 36289:case 36303:case 36311:case 36292:return Zf}}class Qf{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Df(t.type)}}class ep{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Jf(t.type)}}class tp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const n=this.seq;for(let r=0,a=n.length;r!==a;++r){const o=n[r];o.setValue(e,t[o.id],i)}}}const sr=/(\w+)(\])?(\[|\.)?/g;function eo(s,e){s.seq.push(e),s.map[e.id]=e}function ip(s,e,t){const i=s.name,n=i.length;for(sr.lastIndex=0;;){const r=sr.exec(i),a=sr.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===n){eo(t,l===void 0?new Qf(o,s,e):new ep(o,s,e));break}else{let u=t.map[o];u===void 0&&(u=new tp(o),eo(t,u)),t=u}}}class ls{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){const r=e.getActiveUniform(t,n),a=e.getUniformLocation(t,r.name);ip(r,a,this)}}setValue(e,t,i,n){const r=this.map[t];r!==void 0&&r.setValue(e,i,n)}setOptional(e,t,i){const n=t[i];n!==void 0&&this.setValue(e,i,n)}static upload(e,t,i,n){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,n)}}static seqWithValue(e,t){const i=[];for(let n=0,r=e.length;n!==r;++n){const a=e[n];a.id in t&&i.push(a)}return i}}function to(s,e,t){const i=s.createShader(e);return s.shaderSource(i,t),s.compileShader(i),i}const np=37297;let sp=0;function rp(s,e){const t=s.split(`
`),i=[],n=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=n;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function ap(s){const e=$e.getPrimaries($e.workingColorSpace),t=$e.getPrimaries(s);let i;switch(e===t?i="":e===ms&&t===ps?i="LinearDisplayP3ToLinearSRGB":e===ps&&t===ms&&(i="LinearSRGBToLinearDisplayP3"),s){case li:case Ss:return[i,"LinearTransferOETF"];case ht:case Er:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[i,"LinearTransferOETF"]}}function io(s,e,t){const i=s.getShaderParameter(e,s.COMPILE_STATUS),n=s.getShaderInfoLog(e).trim();if(i&&n==="")return"";const r=/ERROR: 0:(\d+)/.exec(n);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+n+`

`+rp(s.getShaderSource(e),a)}else return n}function op(s,e){const t=ap(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function cp(s,e){let t;switch(e){case rl:t="Linear";break;case al:t="Reinhard";break;case ol:t="OptimizedCineon";break;case cl:t="ACESFilmic";break;case hl:t="AgX";break;case ll:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function lp(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(sn).join(`
`)}function hp(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(sn).join(`
`)}function up(s){const e=[];for(const t in s){const i=s[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function dp(s,e){const t={},i=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const r=s.getActiveAttrib(e,n),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function sn(s){return s!==""}function no(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function so(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const fp=/^[ \t]*#include +<([\w\d./]+)>/gm;function vr(s){return s.replace(fp,mp)}const pp=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function mp(s,e){let t=Oe[e];if(t===void 0){const i=pp.get(e);if(i!==void 0)t=Oe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return vr(t)}const gp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ro(s){return s.replace(gp,_p)}function _p(s,e,t,i){let n="";for(let r=parseInt(e);r<parseInt(t);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function ao(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function vp(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Bo?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Ic?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===oi&&(e="SHADOWMAP_TYPE_VSM"),e}function xp(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case on:case cn:e="ENVMAP_TYPE_CUBE";break;case ys:e="ENVMAP_TYPE_CUBE_UV";break}return e}function yp(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case cn:e="ENVMAP_MODE_REFRACTION";break}return e}function Sp(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case zo:e="ENVMAP_BLENDING_MULTIPLY";break;case nl:e="ENVMAP_BLENDING_MIX";break;case sl:e="ENVMAP_BLENDING_ADD";break}return e}function Mp(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function bp(s,e,t,i){const n=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=vp(t),l=xp(t),h=yp(t),u=Sp(t),f=Mp(t),m=t.isWebGL2?"":lp(t),g=hp(t),_=up(r),p=n.createProgram();let d,b,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(sn).join(`
`),d.length>0&&(d+=`
`),b=[m,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(sn).join(`
`),b.length>0&&(b+=`
`)):(d=[ao(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(sn).join(`
`),b=[m,ao(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==yi?"#define TONE_MAPPING":"",t.toneMapping!==yi?Oe.tonemapping_pars_fragment:"",t.toneMapping!==yi?cp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Oe.colorspace_pars_fragment,op("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(sn).join(`
`)),a=vr(a),a=no(a,t),a=so(a,t),o=vr(o),o=no(o,t),o=so(o,t),a=ro(a),o=ro(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,d=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,b=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Ea?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ea?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+b);const A=x+d+a,L=x+b+o,w=to(n,n.VERTEX_SHADER,A),P=to(n,n.FRAGMENT_SHADER,L);n.attachShader(p,w),n.attachShader(p,P),t.index0AttributeName!==void 0?n.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&n.bindAttribLocation(p,0,"position"),n.linkProgram(p);function z(V){if(s.debug.checkShaderErrors){const Q=n.getProgramInfoLog(p).trim(),D=n.getShaderInfoLog(w).trim(),U=n.getShaderInfoLog(P).trim();let O=!0,j=!0;if(n.getProgramParameter(p,n.LINK_STATUS)===!1)if(O=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,p,w,P);else{const X=io(n,w,"vertex"),Y=io(n,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(p,n.VALIDATE_STATUS)+`

Program Info Log: `+Q+`
`+X+`
`+Y)}else Q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Q):(D===""||U==="")&&(j=!1);j&&(V.diagnostics={runnable:O,programLog:Q,vertexShader:{log:D,prefix:d},fragmentShader:{log:U,prefix:b}})}n.deleteShader(w),n.deleteShader(P),y=new ls(n,p),E=dp(n,p)}let y;this.getUniforms=function(){return y===void 0&&z(this),y};let E;this.getAttributes=function(){return E===void 0&&z(this),E};let H=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return H===!1&&(H=n.getProgramParameter(p,np)),H},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=sp++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=w,this.fragmentShader=P,this}let Ep=0;class Tp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,n=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(n)===!1&&(a.add(n),n.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Ap(e),t.set(e,i)),i}}class Ap{constructor(e){this.id=Ep++,this.code=e,this.usedTimes=0}}function wp(s,e,t,i,n,r,a){const o=new Ar,c=new Tp,l=[],h=n.isWebGL2,u=n.logarithmicDepthBuffer,f=n.vertexTextures;let m=n.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return y===0?"uv":`uv${y}`}function p(y,E,H,V,Q){const D=V.fog,U=Q.geometry,O=y.isMeshStandardMaterial?V.environment:null,j=(y.isMeshStandardMaterial?t:e).get(y.envMap||O),X=j&&j.mapping===ys?j.image.height:null,Y=g[y.type];y.precision!==null&&(m=n.getMaxPrecision(y.precision),m!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",m,"instead."));const $=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,ie=$!==void 0?$.length:0;let ne=0;U.morphAttributes.position!==void 0&&(ne=1),U.morphAttributes.normal!==void 0&&(ne=2),U.morphAttributes.color!==void 0&&(ne=3);let W,K,le,_e;if(Y){const bt=Qt[Y];W=bt.vertexShader,K=bt.fragmentShader}else W=y.vertexShader,K=y.fragmentShader,c.update(y),le=c.getVertexShaderID(y),_e=c.getFragmentShaderID(y);const ge=s.getRenderTarget(),Ie=Q.isInstancedMesh===!0,Ne=Q.isBatchedMesh===!0,Ae=!!y.map,Xe=!!y.matcap,N=!!j,Mt=!!y.aoMap,Me=!!y.lightMap,Re=!!y.bumpMap,fe=!!y.normalMap,tt=!!y.displacementMap,ke=!!y.emissiveMap,T=!!y.metalnessMap,v=!!y.roughnessMap,k=y.anisotropy>0,ee=y.clearcoat>0,J=y.iridescence>0,te=y.sheen>0,pe=y.transmission>0,ce=k&&!!y.anisotropyMap,ue=ee&&!!y.clearcoatMap,Te=ee&&!!y.clearcoatNormalMap,Be=ee&&!!y.clearcoatRoughnessMap,Z=J&&!!y.iridescenceMap,Ye=J&&!!y.iridescenceThicknessMap,We=te&&!!y.sheenColorMap,Ce=te&&!!y.sheenRoughnessMap,xe=!!y.specularMap,de=!!y.specularColorMap,Fe=!!y.specularIntensityMap,je=pe&&!!y.transmissionMap,nt=pe&&!!y.thicknessMap,Ge=!!y.gradientMap,se=!!y.alphaMap,R=y.alphaTest>0,ae=!!y.alphaHash,oe=!!y.extensions,we=!!U.attributes.uv1,be=!!U.attributes.uv2,Ke=!!U.attributes.uv3;let Ze=yi;return y.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(Ze=s.toneMapping),{isWebGL2:h,shaderID:Y,shaderType:y.type,shaderName:y.name,vertexShader:W,fragmentShader:K,defines:y.defines,customVertexShaderID:le,customFragmentShaderID:_e,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:m,batching:Ne,instancing:Ie,instancingColor:Ie&&Q.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:ge===null?s.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:li,map:Ae,matcap:Xe,envMap:N,envMapMode:N&&j.mapping,envMapCubeUVHeight:X,aoMap:Mt,lightMap:Me,bumpMap:Re,normalMap:fe,displacementMap:f&&tt,emissiveMap:ke,normalMapObjectSpace:fe&&y.normalMapType===Ml,normalMapTangentSpace:fe&&y.normalMapType===Ko,metalnessMap:T,roughnessMap:v,anisotropy:k,anisotropyMap:ce,clearcoat:ee,clearcoatMap:ue,clearcoatNormalMap:Te,clearcoatRoughnessMap:Be,iridescence:J,iridescenceMap:Z,iridescenceThicknessMap:Ye,sheen:te,sheenColorMap:We,sheenRoughnessMap:Ce,specularMap:xe,specularColorMap:de,specularIntensityMap:Fe,transmission:pe,transmissionMap:je,thicknessMap:nt,gradientMap:Ge,opaque:y.transparent===!1&&y.blending===rn,alphaMap:se,alphaTest:R,alphaHash:ae,combine:y.combine,mapUv:Ae&&_(y.map.channel),aoMapUv:Mt&&_(y.aoMap.channel),lightMapUv:Me&&_(y.lightMap.channel),bumpMapUv:Re&&_(y.bumpMap.channel),normalMapUv:fe&&_(y.normalMap.channel),displacementMapUv:tt&&_(y.displacementMap.channel),emissiveMapUv:ke&&_(y.emissiveMap.channel),metalnessMapUv:T&&_(y.metalnessMap.channel),roughnessMapUv:v&&_(y.roughnessMap.channel),anisotropyMapUv:ce&&_(y.anisotropyMap.channel),clearcoatMapUv:ue&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:Te&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Be&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Z&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:Ye&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:We&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&_(y.sheenRoughnessMap.channel),specularMapUv:xe&&_(y.specularMap.channel),specularColorMapUv:de&&_(y.specularColorMap.channel),specularIntensityMapUv:Fe&&_(y.specularIntensityMap.channel),transmissionMapUv:je&&_(y.transmissionMap.channel),thicknessMapUv:nt&&_(y.thicknessMap.channel),alphaMapUv:se&&_(y.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(fe||k),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,vertexUv1s:we,vertexUv2s:be,vertexUv3s:Ke,pointsUvs:Q.isPoints===!0&&!!U.attributes.uv&&(Ae||se),fog:!!D,useFog:y.fog===!0,fogExp2:D&&D.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:Q.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:ie,morphTextureStride:ne,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:s.shadowMap.enabled&&H.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ze,useLegacyLights:s._useLegacyLights,decodeVideoTexture:Ae&&y.map.isVideoTexture===!0&&$e.getTransfer(y.map.colorSpace)===Qe,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===qt,flipSided:y.side===Rt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:oe&&y.extensions.derivatives===!0,extensionFragDepth:oe&&y.extensions.fragDepth===!0,extensionDrawBuffers:oe&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:oe&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:oe&&y.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function d(y){const E=[];if(y.shaderID?E.push(y.shaderID):(E.push(y.customVertexShaderID),E.push(y.customFragmentShaderID)),y.defines!==void 0)for(const H in y.defines)E.push(H),E.push(y.defines[H]);return y.isRawShaderMaterial===!1&&(b(E,y),x(E,y),E.push(s.outputColorSpace)),E.push(y.customProgramCacheKey),E.join()}function b(y,E){y.push(E.precision),y.push(E.outputColorSpace),y.push(E.envMapMode),y.push(E.envMapCubeUVHeight),y.push(E.mapUv),y.push(E.alphaMapUv),y.push(E.lightMapUv),y.push(E.aoMapUv),y.push(E.bumpMapUv),y.push(E.normalMapUv),y.push(E.displacementMapUv),y.push(E.emissiveMapUv),y.push(E.metalnessMapUv),y.push(E.roughnessMapUv),y.push(E.anisotropyMapUv),y.push(E.clearcoatMapUv),y.push(E.clearcoatNormalMapUv),y.push(E.clearcoatRoughnessMapUv),y.push(E.iridescenceMapUv),y.push(E.iridescenceThicknessMapUv),y.push(E.sheenColorMapUv),y.push(E.sheenRoughnessMapUv),y.push(E.specularMapUv),y.push(E.specularColorMapUv),y.push(E.specularIntensityMapUv),y.push(E.transmissionMapUv),y.push(E.thicknessMapUv),y.push(E.combine),y.push(E.fogExp2),y.push(E.sizeAttenuation),y.push(E.morphTargetsCount),y.push(E.morphAttributeCount),y.push(E.numDirLights),y.push(E.numPointLights),y.push(E.numSpotLights),y.push(E.numSpotLightMaps),y.push(E.numHemiLights),y.push(E.numRectAreaLights),y.push(E.numDirLightShadows),y.push(E.numPointLightShadows),y.push(E.numSpotLightShadows),y.push(E.numSpotLightShadowsWithMaps),y.push(E.numLightProbes),y.push(E.shadowMapType),y.push(E.toneMapping),y.push(E.numClippingPlanes),y.push(E.numClipIntersection),y.push(E.depthPacking)}function x(y,E){o.disableAll(),E.isWebGL2&&o.enable(0),E.supportsVertexTextures&&o.enable(1),E.instancing&&o.enable(2),E.instancingColor&&o.enable(3),E.matcap&&o.enable(4),E.envMap&&o.enable(5),E.normalMapObjectSpace&&o.enable(6),E.normalMapTangentSpace&&o.enable(7),E.clearcoat&&o.enable(8),E.iridescence&&o.enable(9),E.alphaTest&&o.enable(10),E.vertexColors&&o.enable(11),E.vertexAlphas&&o.enable(12),E.vertexUv1s&&o.enable(13),E.vertexUv2s&&o.enable(14),E.vertexUv3s&&o.enable(15),E.vertexTangents&&o.enable(16),E.anisotropy&&o.enable(17),E.alphaHash&&o.enable(18),E.batching&&o.enable(19),y.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.skinning&&o.enable(4),E.morphTargets&&o.enable(5),E.morphNormals&&o.enable(6),E.morphColors&&o.enable(7),E.premultipliedAlpha&&o.enable(8),E.shadowMapEnabled&&o.enable(9),E.useLegacyLights&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),y.push(o.mask)}function A(y){const E=g[y.type];let H;if(E){const V=Qt[E];H=ch.clone(V.uniforms)}else H=y.uniforms;return H}function L(y,E){let H;for(let V=0,Q=l.length;V<Q;V++){const D=l[V];if(D.cacheKey===E){H=D,++H.usedTimes;break}}return H===void 0&&(H=new bp(s,E,y,r),l.push(H)),H}function w(y){if(--y.usedTimes===0){const E=l.indexOf(y);l[E]=l[l.length-1],l.pop(),y.destroy()}}function P(y){c.remove(y)}function z(){c.dispose()}return{getParameters:p,getProgramCacheKey:d,getUniforms:A,acquireProgram:L,releaseProgram:w,releaseShaderCache:P,programs:l,dispose:z}}function Pp(){let s=new WeakMap;function e(r){let a=s.get(r);return a===void 0&&(a={},s.set(r,a)),a}function t(r){s.delete(r)}function i(r,a,o){s.get(r)[a]=o}function n(){s=new WeakMap}return{get:e,remove:t,update:i,dispose:n}}function Cp(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function oo(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function co(){const s=[];let e=0;const t=[],i=[],n=[];function r(){e=0,t.length=0,i.length=0,n.length=0}function a(u,f,m,g,_,p){let d=s[e];return d===void 0?(d={id:u.id,object:u,geometry:f,material:m,groupOrder:g,renderOrder:u.renderOrder,z:_,group:p},s[e]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=m,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=_,d.group=p),e++,d}function o(u,f,m,g,_,p){const d=a(u,f,m,g,_,p);m.transmission>0?i.push(d):m.transparent===!0?n.push(d):t.push(d)}function c(u,f,m,g,_,p){const d=a(u,f,m,g,_,p);m.transmission>0?i.unshift(d):m.transparent===!0?n.unshift(d):t.unshift(d)}function l(u,f){t.length>1&&t.sort(u||Cp),i.length>1&&i.sort(f||oo),n.length>1&&n.sort(f||oo)}function h(){for(let u=e,f=s.length;u<f;u++){const m=s[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:n,init:r,push:o,unshift:c,finish:h,sort:l}}function Rp(){let s=new WeakMap;function e(i,n){const r=s.get(i);let a;return r===void 0?(a=new co,s.set(i,[a])):n>=r.length?(a=new co,r.push(a)):a=r[n],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function Lp(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new Se};break;case"SpotLight":t={position:new C,direction:new C,color:new Se,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new Se,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new Se,groundColor:new Se};break;case"RectAreaLight":t={color:new Se,position:new C,halfWidth:new C,halfHeight:new C};break}return s[e.id]=t,t}}}function Dp(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Ip=0;function Up(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Np(s,e){const t=new Lp,i=Dp(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new C);const r=new C,a=new rt,o=new rt;function c(h,u){let f=0,m=0,g=0;for(let V=0;V<9;V++)n.probe[V].set(0,0,0);let _=0,p=0,d=0,b=0,x=0,A=0,L=0,w=0,P=0,z=0,y=0;h.sort(Up);const E=u===!0?Math.PI:1;for(let V=0,Q=h.length;V<Q;V++){const D=h[V],U=D.color,O=D.intensity,j=D.distance,X=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)f+=U.r*O*E,m+=U.g*O*E,g+=U.b*O*E;else if(D.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(D.sh.coefficients[Y],O);y++}else if(D.isDirectionalLight){const Y=t.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity*E),D.castShadow){const $=D.shadow,ie=i.get(D);ie.shadowBias=$.bias,ie.shadowNormalBias=$.normalBias,ie.shadowRadius=$.radius,ie.shadowMapSize=$.mapSize,n.directionalShadow[_]=ie,n.directionalShadowMap[_]=X,n.directionalShadowMatrix[_]=D.shadow.matrix,A++}n.directional[_]=Y,_++}else if(D.isSpotLight){const Y=t.get(D);Y.position.setFromMatrixPosition(D.matrixWorld),Y.color.copy(U).multiplyScalar(O*E),Y.distance=j,Y.coneCos=Math.cos(D.angle),Y.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),Y.decay=D.decay,n.spot[d]=Y;const $=D.shadow;if(D.map&&(n.spotLightMap[P]=D.map,P++,$.updateMatrices(D),D.castShadow&&z++),n.spotLightMatrix[d]=$.matrix,D.castShadow){const ie=i.get(D);ie.shadowBias=$.bias,ie.shadowNormalBias=$.normalBias,ie.shadowRadius=$.radius,ie.shadowMapSize=$.mapSize,n.spotShadow[d]=ie,n.spotShadowMap[d]=X,w++}d++}else if(D.isRectAreaLight){const Y=t.get(D);Y.color.copy(U).multiplyScalar(O),Y.halfWidth.set(D.width*.5,0,0),Y.halfHeight.set(0,D.height*.5,0),n.rectArea[b]=Y,b++}else if(D.isPointLight){const Y=t.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity*E),Y.distance=D.distance,Y.decay=D.decay,D.castShadow){const $=D.shadow,ie=i.get(D);ie.shadowBias=$.bias,ie.shadowNormalBias=$.normalBias,ie.shadowRadius=$.radius,ie.shadowMapSize=$.mapSize,ie.shadowCameraNear=$.camera.near,ie.shadowCameraFar=$.camera.far,n.pointShadow[p]=ie,n.pointShadowMap[p]=X,n.pointShadowMatrix[p]=D.shadow.matrix,L++}n.point[p]=Y,p++}else if(D.isHemisphereLight){const Y=t.get(D);Y.skyColor.copy(D.color).multiplyScalar(O*E),Y.groundColor.copy(D.groundColor).multiplyScalar(O*E),n.hemi[x]=Y,x++}}b>0&&(e.isWebGL2?s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=re.LTC_FLOAT_1,n.rectAreaLTC2=re.LTC_FLOAT_2):(n.rectAreaLTC1=re.LTC_HALF_1,n.rectAreaLTC2=re.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=re.LTC_FLOAT_1,n.rectAreaLTC2=re.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(n.rectAreaLTC1=re.LTC_HALF_1,n.rectAreaLTC2=re.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),n.ambient[0]=f,n.ambient[1]=m,n.ambient[2]=g;const H=n.hash;(H.directionalLength!==_||H.pointLength!==p||H.spotLength!==d||H.rectAreaLength!==b||H.hemiLength!==x||H.numDirectionalShadows!==A||H.numPointShadows!==L||H.numSpotShadows!==w||H.numSpotMaps!==P||H.numLightProbes!==y)&&(n.directional.length=_,n.spot.length=d,n.rectArea.length=b,n.point.length=p,n.hemi.length=x,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.pointShadow.length=L,n.pointShadowMap.length=L,n.spotShadow.length=w,n.spotShadowMap.length=w,n.directionalShadowMatrix.length=A,n.pointShadowMatrix.length=L,n.spotLightMatrix.length=w+P-z,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=z,n.numLightProbes=y,H.directionalLength=_,H.pointLength=p,H.spotLength=d,H.rectAreaLength=b,H.hemiLength=x,H.numDirectionalShadows=A,H.numPointShadows=L,H.numSpotShadows=w,H.numSpotMaps=P,H.numLightProbes=y,n.version=Ip++)}function l(h,u){let f=0,m=0,g=0,_=0,p=0;const d=u.matrixWorldInverse;for(let b=0,x=h.length;b<x;b++){const A=h[b];if(A.isDirectionalLight){const L=n.directional[f];L.direction.setFromMatrixPosition(A.matrixWorld),r.setFromMatrixPosition(A.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(d),f++}else if(A.isSpotLight){const L=n.spot[g];L.position.setFromMatrixPosition(A.matrixWorld),L.position.applyMatrix4(d),L.direction.setFromMatrixPosition(A.matrixWorld),r.setFromMatrixPosition(A.target.matrixWorld),L.direction.sub(r),L.direction.transformDirection(d),g++}else if(A.isRectAreaLight){const L=n.rectArea[_];L.position.setFromMatrixPosition(A.matrixWorld),L.position.applyMatrix4(d),o.identity(),a.copy(A.matrixWorld),a.premultiply(d),o.extractRotation(a),L.halfWidth.set(A.width*.5,0,0),L.halfHeight.set(0,A.height*.5,0),L.halfWidth.applyMatrix4(o),L.halfHeight.applyMatrix4(o),_++}else if(A.isPointLight){const L=n.point[m];L.position.setFromMatrixPosition(A.matrixWorld),L.position.applyMatrix4(d),m++}else if(A.isHemisphereLight){const L=n.hemi[p];L.direction.setFromMatrixPosition(A.matrixWorld),L.direction.transformDirection(d),p++}}}return{setup:c,setupView:l,state:n}}function lo(s,e){const t=new Np(s,e),i=[],n=[];function r(){i.length=0,n.length=0}function a(u){i.push(u)}function o(u){n.push(u)}function c(u){t.setup(i,u)}function l(u){t.setupView(i,u)}return{init:r,state:{lightsArray:i,shadowsArray:n,lights:t},setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function Fp(s,e){let t=new WeakMap;function i(r,a=0){const o=t.get(r);let c;return o===void 0?(c=new lo(s,e),t.set(r,[c])):a>=o.length?(c=new lo(s,e),o.push(c)):c=o[a],c}function n(){t=new WeakMap}return{get:i,dispose:n}}class Op extends Oi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yl,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class kp extends Oi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Bp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,zp=`uniform sampler2D shadow_pass;
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
}`;function Gp(s,e,t){let i=new wr;const n=new ve,r=new ve,a=new et,o=new Op({depthPacking:Sl}),c=new kp,l={},h=t.maxTextureSize,u={[Mi]:Rt,[Rt]:Mi,[qt]:qt},f=new Fi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ve},radius:{value:4}},vertexShader:Bp,fragmentShader:zp}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const g=new St;g.setAttribute("position",new Ct(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new _t(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bo;let d=this.type;this.render=function(w,P,z){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;const y=s.getRenderTarget(),E=s.getActiveCubeFace(),H=s.getActiveMipmapLevel(),V=s.state;V.setBlending(xi),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const Q=d!==oi&&this.type===oi,D=d===oi&&this.type!==oi;for(let U=0,O=w.length;U<O;U++){const j=w[U],X=j.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;n.copy(X.mapSize);const Y=X.getFrameExtents();if(n.multiply(Y),r.copy(X.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(r.x=Math.floor(h/Y.x),n.x=r.x*Y.x,X.mapSize.x=r.x),n.y>h&&(r.y=Math.floor(h/Y.y),n.y=r.y*Y.y,X.mapSize.y=r.y)),X.map===null||Q===!0||D===!0){const ie=this.type!==oi?{minFilter:wt,magFilter:wt}:{};X.map!==null&&X.map.dispose(),X.map=new Ni(n.x,n.y,ie),X.map.texture.name=j.name+".shadowMap",X.camera.updateProjectionMatrix()}s.setRenderTarget(X.map),s.clear();const $=X.getViewportCount();for(let ie=0;ie<$;ie++){const ne=X.getViewport(ie);a.set(r.x*ne.x,r.y*ne.y,r.x*ne.z,r.y*ne.w),V.viewport(a),X.updateMatrices(j,ie),i=X.getFrustum(),A(P,z,X.camera,j,this.type)}X.isPointLightShadow!==!0&&this.type===oi&&b(X,z),X.needsUpdate=!1}d=this.type,p.needsUpdate=!1,s.setRenderTarget(y,E,H)};function b(w,P){const z=e.update(_);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,m.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Ni(n.x,n.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,s.setRenderTarget(w.mapPass),s.clear(),s.renderBufferDirect(P,null,z,f,_,null),m.uniforms.shadow_pass.value=w.mapPass.texture,m.uniforms.resolution.value=w.mapSize,m.uniforms.radius.value=w.radius,s.setRenderTarget(w.map),s.clear(),s.renderBufferDirect(P,null,z,m,_,null)}function x(w,P,z,y){let E=null;const H=z.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(H!==void 0)E=H;else if(E=z.isPointLight===!0?c:o,s.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const V=E.uuid,Q=P.uuid;let D=l[V];D===void 0&&(D={},l[V]=D);let U=D[Q];U===void 0&&(U=E.clone(),D[Q]=U,P.addEventListener("dispose",L)),E=U}if(E.visible=P.visible,E.wireframe=P.wireframe,y===oi?E.side=P.shadowSide!==null?P.shadowSide:P.side:E.side=P.shadowSide!==null?P.shadowSide:u[P.side],E.alphaMap=P.alphaMap,E.alphaTest=P.alphaTest,E.map=P.map,E.clipShadows=P.clipShadows,E.clippingPlanes=P.clippingPlanes,E.clipIntersection=P.clipIntersection,E.displacementMap=P.displacementMap,E.displacementScale=P.displacementScale,E.displacementBias=P.displacementBias,E.wireframeLinewidth=P.wireframeLinewidth,E.linewidth=P.linewidth,z.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const V=s.properties.get(E);V.light=z}return E}function A(w,P,z,y,E){if(w.visible===!1)return;if(w.layers.test(P.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&E===oi)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,w.matrixWorld);const Q=e.update(w),D=w.material;if(Array.isArray(D)){const U=Q.groups;for(let O=0,j=U.length;O<j;O++){const X=U[O],Y=D[X.materialIndex];if(Y&&Y.visible){const $=x(w,Y,y,E);w.onBeforeShadow(s,w,P,z,Q,$,X),s.renderBufferDirect(z,null,Q,$,w,X),w.onAfterShadow(s,w,P,z,Q,$,X)}}}else if(D.visible){const U=x(w,D,y,E);w.onBeforeShadow(s,w,P,z,Q,U,null),s.renderBufferDirect(z,null,Q,U,w,null),w.onAfterShadow(s,w,P,z,Q,U,null)}}const V=w.children;for(let Q=0,D=V.length;Q<D;Q++)A(V[Q],P,z,y,E)}function L(w){w.target.removeEventListener("dispose",L);for(const z in l){const y=l[z],E=w.target.uuid;E in y&&(y[E].dispose(),delete y[E])}}}function Hp(s,e,t){const i=t.isWebGL2;function n(){let R=!1;const ae=new et;let oe=null;const we=new et(0,0,0,0);return{setMask:function(be){oe!==be&&!R&&(s.colorMask(be,be,be,be),oe=be)},setLocked:function(be){R=be},setClear:function(be,Ke,Ze,ft,bt){bt===!0&&(be*=ft,Ke*=ft,Ze*=ft),ae.set(be,Ke,Ze,ft),we.equals(ae)===!1&&(s.clearColor(be,Ke,Ze,ft),we.copy(ae))},reset:function(){R=!1,oe=null,we.set(-1,0,0,0)}}}function r(){let R=!1,ae=null,oe=null,we=null;return{setTest:function(be){be?Ne(s.DEPTH_TEST):Ae(s.DEPTH_TEST)},setMask:function(be){ae!==be&&!R&&(s.depthMask(be),ae=be)},setFunc:function(be){if(oe!==be){switch(be){case Kc:s.depthFunc(s.NEVER);break;case Zc:s.depthFunc(s.ALWAYS);break;case Jc:s.depthFunc(s.LESS);break;case ds:s.depthFunc(s.LEQUAL);break;case Qc:s.depthFunc(s.EQUAL);break;case el:s.depthFunc(s.GEQUAL);break;case tl:s.depthFunc(s.GREATER);break;case il:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}oe=be}},setLocked:function(be){R=be},setClear:function(be){we!==be&&(s.clearDepth(be),we=be)},reset:function(){R=!1,ae=null,oe=null,we=null}}}function a(){let R=!1,ae=null,oe=null,we=null,be=null,Ke=null,Ze=null,ft=null,bt=null;return{setTest:function(Je){R||(Je?Ne(s.STENCIL_TEST):Ae(s.STENCIL_TEST))},setMask:function(Je){ae!==Je&&!R&&(s.stencilMask(Je),ae=Je)},setFunc:function(Je,Et,$t){(oe!==Je||we!==Et||be!==$t)&&(s.stencilFunc(Je,Et,$t),oe=Je,we=Et,be=$t)},setOp:function(Je,Et,$t){(Ke!==Je||Ze!==Et||ft!==$t)&&(s.stencilOp(Je,Et,$t),Ke=Je,Ze=Et,ft=$t)},setLocked:function(Je){R=Je},setClear:function(Je){bt!==Je&&(s.clearStencil(Je),bt=Je)},reset:function(){R=!1,ae=null,oe=null,we=null,be=null,Ke=null,Ze=null,ft=null,bt=null}}}const o=new n,c=new r,l=new a,h=new WeakMap,u=new WeakMap;let f={},m={},g=new WeakMap,_=[],p=null,d=!1,b=null,x=null,A=null,L=null,w=null,P=null,z=null,y=new Se(0,0,0),E=0,H=!1,V=null,Q=null,D=null,U=null,O=null;const j=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,Y=0;const $=s.getParameter(s.VERSION);$.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec($)[1]),X=Y>=1):$.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),X=Y>=2);let ie=null,ne={};const W=s.getParameter(s.SCISSOR_BOX),K=s.getParameter(s.VIEWPORT),le=new et().fromArray(W),_e=new et().fromArray(K);function ge(R,ae,oe,we){const be=new Uint8Array(4),Ke=s.createTexture();s.bindTexture(R,Ke),s.texParameteri(R,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(R,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ze=0;Ze<oe;Ze++)i&&(R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY)?s.texImage3D(ae,0,s.RGBA,1,1,we,0,s.RGBA,s.UNSIGNED_BYTE,be):s.texImage2D(ae+Ze,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,be);return Ke}const Ie={};Ie[s.TEXTURE_2D]=ge(s.TEXTURE_2D,s.TEXTURE_2D,1),Ie[s.TEXTURE_CUBE_MAP]=ge(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Ie[s.TEXTURE_2D_ARRAY]=ge(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Ie[s.TEXTURE_3D]=ge(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),l.setClear(0),Ne(s.DEPTH_TEST),c.setFunc(ds),ke(!1),T(Wr),Ne(s.CULL_FACE),fe(xi);function Ne(R){f[R]!==!0&&(s.enable(R),f[R]=!0)}function Ae(R){f[R]!==!1&&(s.disable(R),f[R]=!1)}function Xe(R,ae){return m[R]!==ae?(s.bindFramebuffer(R,ae),m[R]=ae,i&&(R===s.DRAW_FRAMEBUFFER&&(m[s.FRAMEBUFFER]=ae),R===s.FRAMEBUFFER&&(m[s.DRAW_FRAMEBUFFER]=ae)),!0):!1}function N(R,ae){let oe=_,we=!1;if(R)if(oe=g.get(ae),oe===void 0&&(oe=[],g.set(ae,oe)),R.isWebGLMultipleRenderTargets){const be=R.texture;if(oe.length!==be.length||oe[0]!==s.COLOR_ATTACHMENT0){for(let Ke=0,Ze=be.length;Ke<Ze;Ke++)oe[Ke]=s.COLOR_ATTACHMENT0+Ke;oe.length=be.length,we=!0}}else oe[0]!==s.COLOR_ATTACHMENT0&&(oe[0]=s.COLOR_ATTACHMENT0,we=!0);else oe[0]!==s.BACK&&(oe[0]=s.BACK,we=!0);we&&(t.isWebGL2?s.drawBuffers(oe):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(oe))}function Mt(R){return p!==R?(s.useProgram(R),p=R,!0):!1}const Me={[Ri]:s.FUNC_ADD,[Nc]:s.FUNC_SUBTRACT,[Fc]:s.FUNC_REVERSE_SUBTRACT};if(i)Me[Yr]=s.MIN,Me[$r]=s.MAX;else{const R=e.get("EXT_blend_minmax");R!==null&&(Me[Yr]=R.MIN_EXT,Me[$r]=R.MAX_EXT)}const Re={[Oc]:s.ZERO,[kc]:s.ONE,[Bc]:s.SRC_COLOR,[hr]:s.SRC_ALPHA,[Xc]:s.SRC_ALPHA_SATURATE,[Vc]:s.DST_COLOR,[Gc]:s.DST_ALPHA,[zc]:s.ONE_MINUS_SRC_COLOR,[ur]:s.ONE_MINUS_SRC_ALPHA,[Wc]:s.ONE_MINUS_DST_COLOR,[Hc]:s.ONE_MINUS_DST_ALPHA,[qc]:s.CONSTANT_COLOR,[jc]:s.ONE_MINUS_CONSTANT_COLOR,[Yc]:s.CONSTANT_ALPHA,[$c]:s.ONE_MINUS_CONSTANT_ALPHA};function fe(R,ae,oe,we,be,Ke,Ze,ft,bt,Je){if(R===xi){d===!0&&(Ae(s.BLEND),d=!1);return}if(d===!1&&(Ne(s.BLEND),d=!0),R!==Uc){if(R!==b||Je!==H){if((x!==Ri||w!==Ri)&&(s.blendEquation(s.FUNC_ADD),x=Ri,w=Ri),Je)switch(R){case rn:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Xr:s.blendFunc(s.ONE,s.ONE);break;case qr:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case jr:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case rn:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Xr:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case qr:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case jr:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}A=null,L=null,P=null,z=null,y.set(0,0,0),E=0,b=R,H=Je}return}be=be||ae,Ke=Ke||oe,Ze=Ze||we,(ae!==x||be!==w)&&(s.blendEquationSeparate(Me[ae],Me[be]),x=ae,w=be),(oe!==A||we!==L||Ke!==P||Ze!==z)&&(s.blendFuncSeparate(Re[oe],Re[we],Re[Ke],Re[Ze]),A=oe,L=we,P=Ke,z=Ze),(ft.equals(y)===!1||bt!==E)&&(s.blendColor(ft.r,ft.g,ft.b,bt),y.copy(ft),E=bt),b=R,H=!1}function tt(R,ae){R.side===qt?Ae(s.CULL_FACE):Ne(s.CULL_FACE);let oe=R.side===Rt;ae&&(oe=!oe),ke(oe),R.blending===rn&&R.transparent===!1?fe(xi):fe(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),c.setFunc(R.depthFunc),c.setTest(R.depthTest),c.setMask(R.depthWrite),o.setMask(R.colorWrite);const we=R.stencilWrite;l.setTest(we),we&&(l.setMask(R.stencilWriteMask),l.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),l.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),k(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?Ne(s.SAMPLE_ALPHA_TO_COVERAGE):Ae(s.SAMPLE_ALPHA_TO_COVERAGE)}function ke(R){V!==R&&(R?s.frontFace(s.CW):s.frontFace(s.CCW),V=R)}function T(R){R!==Lc?(Ne(s.CULL_FACE),R!==Q&&(R===Wr?s.cullFace(s.BACK):R===Dc?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ae(s.CULL_FACE),Q=R}function v(R){R!==D&&(X&&s.lineWidth(R),D=R)}function k(R,ae,oe){R?(Ne(s.POLYGON_OFFSET_FILL),(U!==ae||O!==oe)&&(s.polygonOffset(ae,oe),U=ae,O=oe)):Ae(s.POLYGON_OFFSET_FILL)}function ee(R){R?Ne(s.SCISSOR_TEST):Ae(s.SCISSOR_TEST)}function J(R){R===void 0&&(R=s.TEXTURE0+j-1),ie!==R&&(s.activeTexture(R),ie=R)}function te(R,ae,oe){oe===void 0&&(ie===null?oe=s.TEXTURE0+j-1:oe=ie);let we=ne[oe];we===void 0&&(we={type:void 0,texture:void 0},ne[oe]=we),(we.type!==R||we.texture!==ae)&&(ie!==oe&&(s.activeTexture(oe),ie=oe),s.bindTexture(R,ae||Ie[R]),we.type=R,we.texture=ae)}function pe(){const R=ne[ie];R!==void 0&&R.type!==void 0&&(s.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function ce(){try{s.compressedTexImage2D.apply(s,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ue(){try{s.compressedTexImage3D.apply(s,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Te(){try{s.texSubImage2D.apply(s,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Be(){try{s.texSubImage3D.apply(s,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Z(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ye(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function We(){try{s.texStorage2D.apply(s,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ce(){try{s.texStorage3D.apply(s,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function xe(){try{s.texImage2D.apply(s,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function de(){try{s.texImage3D.apply(s,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Fe(R){le.equals(R)===!1&&(s.scissor(R.x,R.y,R.z,R.w),le.copy(R))}function je(R){_e.equals(R)===!1&&(s.viewport(R.x,R.y,R.z,R.w),_e.copy(R))}function nt(R,ae){let oe=u.get(ae);oe===void 0&&(oe=new WeakMap,u.set(ae,oe));let we=oe.get(R);we===void 0&&(we=s.getUniformBlockIndex(ae,R.name),oe.set(R,we))}function Ge(R,ae){const we=u.get(ae).get(R);h.get(ae)!==we&&(s.uniformBlockBinding(ae,we,R.__bindingPointIndex),h.set(ae,we))}function se(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),i===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),f={},ie=null,ne={},m={},g=new WeakMap,_=[],p=null,d=!1,b=null,x=null,A=null,L=null,w=null,P=null,z=null,y=new Se(0,0,0),E=0,H=!1,V=null,Q=null,D=null,U=null,O=null,le.set(0,0,s.canvas.width,s.canvas.height),_e.set(0,0,s.canvas.width,s.canvas.height),o.reset(),c.reset(),l.reset()}return{buffers:{color:o,depth:c,stencil:l},enable:Ne,disable:Ae,bindFramebuffer:Xe,drawBuffers:N,useProgram:Mt,setBlending:fe,setMaterial:tt,setFlipSided:ke,setCullFace:T,setLineWidth:v,setPolygonOffset:k,setScissorTest:ee,activeTexture:J,bindTexture:te,unbindTexture:pe,compressedTexImage2D:ce,compressedTexImage3D:ue,texImage2D:xe,texImage3D:de,updateUBOMapping:nt,uniformBlockBinding:Ge,texStorage2D:We,texStorage3D:Ce,texSubImage2D:Te,texSubImage3D:Be,compressedTexSubImage2D:Z,compressedTexSubImage3D:Ye,scissor:Fe,viewport:je,reset:se}}function Vp(s,e,t,i,n,r,a){const o=n.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,v){return m?new OffscreenCanvas(T,v):An("canvas")}function _(T,v,k,ee){let J=1;if((T.width>ee||T.height>ee)&&(J=ee/Math.max(T.width,T.height)),J<1||v===!0)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap){const te=v?_s:Math.floor,pe=te(J*T.width),ce=te(J*T.height);u===void 0&&(u=g(pe,ce));const ue=k?g(pe,ce):u;return ue.width=pe,ue.height=ce,ue.getContext("2d").drawImage(T,0,0,pe,ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+T.width+"x"+T.height+") to ("+pe+"x"+ce+")."),ue}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+T.width+"x"+T.height+")."),T;return T}function p(T){return _r(T.width)&&_r(T.height)}function d(T){return o?!1:T.wrapS!==jt||T.wrapT!==jt||T.minFilter!==wt&&T.minFilter!==Bt}function b(T,v){return T.generateMipmaps&&v&&T.minFilter!==wt&&T.minFilter!==Bt}function x(T){s.generateMipmap(T)}function A(T,v,k,ee,J=!1){if(o===!1)return v;if(T!==null){if(s[T]!==void 0)return s[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let te=v;if(v===s.RED&&(k===s.FLOAT&&(te=s.R32F),k===s.HALF_FLOAT&&(te=s.R16F),k===s.UNSIGNED_BYTE&&(te=s.R8)),v===s.RED_INTEGER&&(k===s.UNSIGNED_BYTE&&(te=s.R8UI),k===s.UNSIGNED_SHORT&&(te=s.R16UI),k===s.UNSIGNED_INT&&(te=s.R32UI),k===s.BYTE&&(te=s.R8I),k===s.SHORT&&(te=s.R16I),k===s.INT&&(te=s.R32I)),v===s.RG&&(k===s.FLOAT&&(te=s.RG32F),k===s.HALF_FLOAT&&(te=s.RG16F),k===s.UNSIGNED_BYTE&&(te=s.RG8)),v===s.RGBA){const pe=J?fs:$e.getTransfer(ee);k===s.FLOAT&&(te=s.RGBA32F),k===s.HALF_FLOAT&&(te=s.RGBA16F),k===s.UNSIGNED_BYTE&&(te=pe===Qe?s.SRGB8_ALPHA8:s.RGBA8),k===s.UNSIGNED_SHORT_4_4_4_4&&(te=s.RGBA4),k===s.UNSIGNED_SHORT_5_5_5_1&&(te=s.RGB5_A1)}return(te===s.R16F||te===s.R32F||te===s.RG16F||te===s.RG32F||te===s.RGBA16F||te===s.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function L(T,v,k){return b(T,k)===!0||T.isFramebufferTexture&&T.minFilter!==wt&&T.minFilter!==Bt?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function w(T){return T===wt||T===Kr||T===Ls?s.NEAREST:s.LINEAR}function P(T){const v=T.target;v.removeEventListener("dispose",P),y(v),v.isVideoTexture&&h.delete(v)}function z(T){const v=T.target;v.removeEventListener("dispose",z),H(v)}function y(T){const v=i.get(T);if(v.__webglInit===void 0)return;const k=T.source,ee=f.get(k);if(ee){const J=ee[v.__cacheKey];J.usedTimes--,J.usedTimes===0&&E(T),Object.keys(ee).length===0&&f.delete(k)}i.remove(T)}function E(T){const v=i.get(T);s.deleteTexture(v.__webglTexture);const k=T.source,ee=f.get(k);delete ee[v.__cacheKey],a.memory.textures--}function H(T){const v=T.texture,k=i.get(T),ee=i.get(v);if(ee.__webglTexture!==void 0&&(s.deleteTexture(ee.__webglTexture),a.memory.textures--),T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(k.__webglFramebuffer[J]))for(let te=0;te<k.__webglFramebuffer[J].length;te++)s.deleteFramebuffer(k.__webglFramebuffer[J][te]);else s.deleteFramebuffer(k.__webglFramebuffer[J]);k.__webglDepthbuffer&&s.deleteRenderbuffer(k.__webglDepthbuffer[J])}else{if(Array.isArray(k.__webglFramebuffer))for(let J=0;J<k.__webglFramebuffer.length;J++)s.deleteFramebuffer(k.__webglFramebuffer[J]);else s.deleteFramebuffer(k.__webglFramebuffer);if(k.__webglDepthbuffer&&s.deleteRenderbuffer(k.__webglDepthbuffer),k.__webglMultisampledFramebuffer&&s.deleteFramebuffer(k.__webglMultisampledFramebuffer),k.__webglColorRenderbuffer)for(let J=0;J<k.__webglColorRenderbuffer.length;J++)k.__webglColorRenderbuffer[J]&&s.deleteRenderbuffer(k.__webglColorRenderbuffer[J]);k.__webglDepthRenderbuffer&&s.deleteRenderbuffer(k.__webglDepthRenderbuffer)}if(T.isWebGLMultipleRenderTargets)for(let J=0,te=v.length;J<te;J++){const pe=i.get(v[J]);pe.__webglTexture&&(s.deleteTexture(pe.__webglTexture),a.memory.textures--),i.remove(v[J])}i.remove(v),i.remove(T)}let V=0;function Q(){V=0}function D(){const T=V;return T>=n.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+n.maxTextures),V+=1,T}function U(T){const v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function O(T,v){const k=i.get(T);if(T.isVideoTexture&&tt(T),T.isRenderTargetTexture===!1&&T.version>0&&k.__version!==T.version){const ee=T.image;if(ee===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{le(k,T,v);return}}t.bindTexture(s.TEXTURE_2D,k.__webglTexture,s.TEXTURE0+v)}function j(T,v){const k=i.get(T);if(T.version>0&&k.__version!==T.version){le(k,T,v);return}t.bindTexture(s.TEXTURE_2D_ARRAY,k.__webglTexture,s.TEXTURE0+v)}function X(T,v){const k=i.get(T);if(T.version>0&&k.__version!==T.version){le(k,T,v);return}t.bindTexture(s.TEXTURE_3D,k.__webglTexture,s.TEXTURE0+v)}function Y(T,v){const k=i.get(T);if(T.version>0&&k.__version!==T.version){_e(k,T,v);return}t.bindTexture(s.TEXTURE_CUBE_MAP,k.__webglTexture,s.TEXTURE0+v)}const $={[pr]:s.REPEAT,[jt]:s.CLAMP_TO_EDGE,[mr]:s.MIRRORED_REPEAT},ie={[wt]:s.NEAREST,[Kr]:s.NEAREST_MIPMAP_NEAREST,[Ls]:s.NEAREST_MIPMAP_LINEAR,[Bt]:s.LINEAR,[ul]:s.LINEAR_MIPMAP_NEAREST,[bn]:s.LINEAR_MIPMAP_LINEAR},ne={[bl]:s.NEVER,[Cl]:s.ALWAYS,[El]:s.LESS,[Zo]:s.LEQUAL,[Tl]:s.EQUAL,[Pl]:s.GEQUAL,[Al]:s.GREATER,[wl]:s.NOTEQUAL};function W(T,v,k){if(k?(s.texParameteri(T,s.TEXTURE_WRAP_S,$[v.wrapS]),s.texParameteri(T,s.TEXTURE_WRAP_T,$[v.wrapT]),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,$[v.wrapR]),s.texParameteri(T,s.TEXTURE_MAG_FILTER,ie[v.magFilter]),s.texParameteri(T,s.TEXTURE_MIN_FILTER,ie[v.minFilter])):(s.texParameteri(T,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(T,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(v.wrapS!==jt||v.wrapT!==jt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(T,s.TEXTURE_MAG_FILTER,w(v.magFilter)),s.texParameteri(T,s.TEXTURE_MIN_FILTER,w(v.minFilter)),v.minFilter!==wt&&v.minFilter!==Bt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),v.compareFunction&&(s.texParameteri(T,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(T,s.TEXTURE_COMPARE_FUNC,ne[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ee=e.get("EXT_texture_filter_anisotropic");if(v.magFilter===wt||v.minFilter!==Ls&&v.minFilter!==bn||v.type===vi&&e.has("OES_texture_float_linear")===!1||o===!1&&v.type===En&&e.has("OES_texture_half_float_linear")===!1)return;(v.anisotropy>1||i.get(v).__currentAnisotropy)&&(s.texParameterf(T,ee.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,n.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy)}}function K(T,v){let k=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",P));const ee=v.source;let J=f.get(ee);J===void 0&&(J={},f.set(ee,J));const te=U(v);if(te!==T.__cacheKey){J[te]===void 0&&(J[te]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,k=!0),J[te].usedTimes++;const pe=J[T.__cacheKey];pe!==void 0&&(J[T.__cacheKey].usedTimes--,pe.usedTimes===0&&E(v)),T.__cacheKey=te,T.__webglTexture=J[te].texture}return k}function le(T,v,k){let ee=s.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(ee=s.TEXTURE_2D_ARRAY),v.isData3DTexture&&(ee=s.TEXTURE_3D);const J=K(T,v),te=v.source;t.bindTexture(ee,T.__webglTexture,s.TEXTURE0+k);const pe=i.get(te);if(te.version!==pe.__version||J===!0){t.activeTexture(s.TEXTURE0+k);const ce=$e.getPrimaries($e.workingColorSpace),ue=v.colorSpace===zt?null:$e.getPrimaries(v.colorSpace),Te=v.colorSpace===zt||ce===ue?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);const Be=d(v)&&p(v.image)===!1;let Z=_(v.image,Be,!1,n.maxTextureSize);Z=ke(v,Z);const Ye=p(Z)||o,We=r.convert(v.format,v.colorSpace);let Ce=r.convert(v.type),xe=A(v.internalFormat,We,Ce,v.colorSpace,v.isVideoTexture);W(ee,v,Ye);let de;const Fe=v.mipmaps,je=o&&v.isVideoTexture!==!0&&xe!==Yo,nt=pe.__version===void 0||J===!0,Ge=L(v,Z,Ye);if(v.isDepthTexture)xe=s.DEPTH_COMPONENT,o?v.type===vi?xe=s.DEPTH_COMPONENT32F:v.type===_i?xe=s.DEPTH_COMPONENT24:v.type===Di?xe=s.DEPTH24_STENCIL8:xe=s.DEPTH_COMPONENT16:v.type===vi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),v.format===Ii&&xe===s.DEPTH_COMPONENT&&v.type!==br&&v.type!==_i&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),v.type=_i,Ce=r.convert(v.type)),v.format===ln&&xe===s.DEPTH_COMPONENT&&(xe=s.DEPTH_STENCIL,v.type!==Di&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),v.type=Di,Ce=r.convert(v.type))),nt&&(je?t.texStorage2D(s.TEXTURE_2D,1,xe,Z.width,Z.height):t.texImage2D(s.TEXTURE_2D,0,xe,Z.width,Z.height,0,We,Ce,null));else if(v.isDataTexture)if(Fe.length>0&&Ye){je&&nt&&t.texStorage2D(s.TEXTURE_2D,Ge,xe,Fe[0].width,Fe[0].height);for(let se=0,R=Fe.length;se<R;se++)de=Fe[se],je?t.texSubImage2D(s.TEXTURE_2D,se,0,0,de.width,de.height,We,Ce,de.data):t.texImage2D(s.TEXTURE_2D,se,xe,de.width,de.height,0,We,Ce,de.data);v.generateMipmaps=!1}else je?(nt&&t.texStorage2D(s.TEXTURE_2D,Ge,xe,Z.width,Z.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,Z.width,Z.height,We,Ce,Z.data)):t.texImage2D(s.TEXTURE_2D,0,xe,Z.width,Z.height,0,We,Ce,Z.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){je&&nt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ge,xe,Fe[0].width,Fe[0].height,Z.depth);for(let se=0,R=Fe.length;se<R;se++)de=Fe[se],v.format!==Yt?We!==null?je?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,se,0,0,0,de.width,de.height,Z.depth,We,de.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,se,xe,de.width,de.height,Z.depth,0,de.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):je?t.texSubImage3D(s.TEXTURE_2D_ARRAY,se,0,0,0,de.width,de.height,Z.depth,We,Ce,de.data):t.texImage3D(s.TEXTURE_2D_ARRAY,se,xe,de.width,de.height,Z.depth,0,We,Ce,de.data)}else{je&&nt&&t.texStorage2D(s.TEXTURE_2D,Ge,xe,Fe[0].width,Fe[0].height);for(let se=0,R=Fe.length;se<R;se++)de=Fe[se],v.format!==Yt?We!==null?je?t.compressedTexSubImage2D(s.TEXTURE_2D,se,0,0,de.width,de.height,We,de.data):t.compressedTexImage2D(s.TEXTURE_2D,se,xe,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):je?t.texSubImage2D(s.TEXTURE_2D,se,0,0,de.width,de.height,We,Ce,de.data):t.texImage2D(s.TEXTURE_2D,se,xe,de.width,de.height,0,We,Ce,de.data)}else if(v.isDataArrayTexture)je?(nt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ge,xe,Z.width,Z.height,Z.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,We,Ce,Z.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,xe,Z.width,Z.height,Z.depth,0,We,Ce,Z.data);else if(v.isData3DTexture)je?(nt&&t.texStorage3D(s.TEXTURE_3D,Ge,xe,Z.width,Z.height,Z.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,We,Ce,Z.data)):t.texImage3D(s.TEXTURE_3D,0,xe,Z.width,Z.height,Z.depth,0,We,Ce,Z.data);else if(v.isFramebufferTexture){if(nt)if(je)t.texStorage2D(s.TEXTURE_2D,Ge,xe,Z.width,Z.height);else{let se=Z.width,R=Z.height;for(let ae=0;ae<Ge;ae++)t.texImage2D(s.TEXTURE_2D,ae,xe,se,R,0,We,Ce,null),se>>=1,R>>=1}}else if(Fe.length>0&&Ye){je&&nt&&t.texStorage2D(s.TEXTURE_2D,Ge,xe,Fe[0].width,Fe[0].height);for(let se=0,R=Fe.length;se<R;se++)de=Fe[se],je?t.texSubImage2D(s.TEXTURE_2D,se,0,0,We,Ce,de):t.texImage2D(s.TEXTURE_2D,se,xe,We,Ce,de);v.generateMipmaps=!1}else je?(nt&&t.texStorage2D(s.TEXTURE_2D,Ge,xe,Z.width,Z.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,We,Ce,Z)):t.texImage2D(s.TEXTURE_2D,0,xe,We,Ce,Z);b(v,Ye)&&x(ee),pe.__version=te.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function _e(T,v,k){if(v.image.length!==6)return;const ee=K(T,v),J=v.source;t.bindTexture(s.TEXTURE_CUBE_MAP,T.__webglTexture,s.TEXTURE0+k);const te=i.get(J);if(J.version!==te.__version||ee===!0){t.activeTexture(s.TEXTURE0+k);const pe=$e.getPrimaries($e.workingColorSpace),ce=v.colorSpace===zt?null:$e.getPrimaries(v.colorSpace),ue=v.colorSpace===zt||pe===ce?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);const Te=v.isCompressedTexture||v.image[0].isCompressedTexture,Be=v.image[0]&&v.image[0].isDataTexture,Z=[];for(let se=0;se<6;se++)!Te&&!Be?Z[se]=_(v.image[se],!1,!0,n.maxCubemapSize):Z[se]=Be?v.image[se].image:v.image[se],Z[se]=ke(v,Z[se]);const Ye=Z[0],We=p(Ye)||o,Ce=r.convert(v.format,v.colorSpace),xe=r.convert(v.type),de=A(v.internalFormat,Ce,xe,v.colorSpace),Fe=o&&v.isVideoTexture!==!0,je=te.__version===void 0||ee===!0;let nt=L(v,Ye,We);W(s.TEXTURE_CUBE_MAP,v,We);let Ge;if(Te){Fe&&je&&t.texStorage2D(s.TEXTURE_CUBE_MAP,nt,de,Ye.width,Ye.height);for(let se=0;se<6;se++){Ge=Z[se].mipmaps;for(let R=0;R<Ge.length;R++){const ae=Ge[R];v.format!==Yt?Ce!==null?Fe?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,R,0,0,ae.width,ae.height,Ce,ae.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,R,de,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Fe?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,R,0,0,ae.width,ae.height,Ce,xe,ae.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,R,de,ae.width,ae.height,0,Ce,xe,ae.data)}}}else{Ge=v.mipmaps,Fe&&je&&(Ge.length>0&&nt++,t.texStorage2D(s.TEXTURE_CUBE_MAP,nt,de,Z[0].width,Z[0].height));for(let se=0;se<6;se++)if(Be){Fe?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Z[se].width,Z[se].height,Ce,xe,Z[se].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,de,Z[se].width,Z[se].height,0,Ce,xe,Z[se].data);for(let R=0;R<Ge.length;R++){const oe=Ge[R].image[se].image;Fe?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,R+1,0,0,oe.width,oe.height,Ce,xe,oe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,R+1,de,oe.width,oe.height,0,Ce,xe,oe.data)}}else{Fe?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Ce,xe,Z[se]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,de,Ce,xe,Z[se]);for(let R=0;R<Ge.length;R++){const ae=Ge[R];Fe?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,R+1,0,0,Ce,xe,ae.image[se]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+se,R+1,de,Ce,xe,ae.image[se])}}}b(v,We)&&x(s.TEXTURE_CUBE_MAP),te.__version=J.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function ge(T,v,k,ee,J,te){const pe=r.convert(k.format,k.colorSpace),ce=r.convert(k.type),ue=A(k.internalFormat,pe,ce,k.colorSpace);if(!i.get(v).__hasExternalTextures){const Be=Math.max(1,v.width>>te),Z=Math.max(1,v.height>>te);J===s.TEXTURE_3D||J===s.TEXTURE_2D_ARRAY?t.texImage3D(J,te,ue,Be,Z,v.depth,0,pe,ce,null):t.texImage2D(J,te,ue,Be,Z,0,pe,ce,null)}t.bindFramebuffer(s.FRAMEBUFFER,T),fe(v)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ee,J,i.get(k).__webglTexture,0,Re(v)):(J===s.TEXTURE_2D||J>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,ee,J,i.get(k).__webglTexture,te),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ie(T,v,k){if(s.bindRenderbuffer(s.RENDERBUFFER,T),v.depthBuffer&&!v.stencilBuffer){let ee=o===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(k||fe(v)){const J=v.depthTexture;J&&J.isDepthTexture&&(J.type===vi?ee=s.DEPTH_COMPONENT32F:J.type===_i&&(ee=s.DEPTH_COMPONENT24));const te=Re(v);fe(v)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,te,ee,v.width,v.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,te,ee,v.width,v.height)}else s.renderbufferStorage(s.RENDERBUFFER,ee,v.width,v.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,T)}else if(v.depthBuffer&&v.stencilBuffer){const ee=Re(v);k&&fe(v)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ee,s.DEPTH24_STENCIL8,v.width,v.height):fe(v)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ee,s.DEPTH24_STENCIL8,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,v.width,v.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,T)}else{const ee=v.isWebGLMultipleRenderTargets===!0?v.texture:[v.texture];for(let J=0;J<ee.length;J++){const te=ee[J],pe=r.convert(te.format,te.colorSpace),ce=r.convert(te.type),ue=A(te.internalFormat,pe,ce,te.colorSpace),Te=Re(v);k&&fe(v)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Te,ue,v.width,v.height):fe(v)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Te,ue,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,ue,v.width,v.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ne(T,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(v.depthTexture).__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),O(v.depthTexture,0);const ee=i.get(v.depthTexture).__webglTexture,J=Re(v);if(v.depthTexture.format===Ii)fe(v)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ee,0,J):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ee,0);else if(v.depthTexture.format===ln)fe(v)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ee,0,J):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function Ae(T){const v=i.get(T),k=T.isWebGLCubeRenderTarget===!0;if(T.depthTexture&&!v.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");Ne(v.__webglFramebuffer,T)}else if(k){v.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)t.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[ee]),v.__webglDepthbuffer[ee]=s.createRenderbuffer(),Ie(v.__webglDepthbuffer[ee],T,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer=s.createRenderbuffer(),Ie(v.__webglDepthbuffer,T,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function Xe(T,v,k){const ee=i.get(T);v!==void 0&&ge(ee.__webglFramebuffer,T,T.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),k!==void 0&&Ae(T)}function N(T){const v=T.texture,k=i.get(T),ee=i.get(v);T.addEventListener("dispose",z),T.isWebGLMultipleRenderTargets!==!0&&(ee.__webglTexture===void 0&&(ee.__webglTexture=s.createTexture()),ee.__version=v.version,a.memory.textures++);const J=T.isWebGLCubeRenderTarget===!0,te=T.isWebGLMultipleRenderTargets===!0,pe=p(T)||o;if(J){k.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(o&&v.mipmaps&&v.mipmaps.length>0){k.__webglFramebuffer[ce]=[];for(let ue=0;ue<v.mipmaps.length;ue++)k.__webglFramebuffer[ce][ue]=s.createFramebuffer()}else k.__webglFramebuffer[ce]=s.createFramebuffer()}else{if(o&&v.mipmaps&&v.mipmaps.length>0){k.__webglFramebuffer=[];for(let ce=0;ce<v.mipmaps.length;ce++)k.__webglFramebuffer[ce]=s.createFramebuffer()}else k.__webglFramebuffer=s.createFramebuffer();if(te)if(n.drawBuffers){const ce=T.texture;for(let ue=0,Te=ce.length;ue<Te;ue++){const Be=i.get(ce[ue]);Be.__webglTexture===void 0&&(Be.__webglTexture=s.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&T.samples>0&&fe(T)===!1){const ce=te?v:[v];k.__webglMultisampledFramebuffer=s.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let ue=0;ue<ce.length;ue++){const Te=ce[ue];k.__webglColorRenderbuffer[ue]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,k.__webglColorRenderbuffer[ue]);const Be=r.convert(Te.format,Te.colorSpace),Z=r.convert(Te.type),Ye=A(Te.internalFormat,Be,Z,Te.colorSpace,T.isXRRenderTarget===!0),We=Re(T);s.renderbufferStorageMultisample(s.RENDERBUFFER,We,Ye,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ue,s.RENDERBUFFER,k.__webglColorRenderbuffer[ue])}s.bindRenderbuffer(s.RENDERBUFFER,null),T.depthBuffer&&(k.__webglDepthRenderbuffer=s.createRenderbuffer(),Ie(k.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(J){t.bindTexture(s.TEXTURE_CUBE_MAP,ee.__webglTexture),W(s.TEXTURE_CUBE_MAP,v,pe);for(let ce=0;ce<6;ce++)if(o&&v.mipmaps&&v.mipmaps.length>0)for(let ue=0;ue<v.mipmaps.length;ue++)ge(k.__webglFramebuffer[ce][ue],T,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,ue);else ge(k.__webglFramebuffer[ce],T,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);b(v,pe)&&x(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(te){const ce=T.texture;for(let ue=0,Te=ce.length;ue<Te;ue++){const Be=ce[ue],Z=i.get(Be);t.bindTexture(s.TEXTURE_2D,Z.__webglTexture),W(s.TEXTURE_2D,Be,pe),ge(k.__webglFramebuffer,T,Be,s.COLOR_ATTACHMENT0+ue,s.TEXTURE_2D,0),b(Be,pe)&&x(s.TEXTURE_2D)}t.unbindTexture()}else{let ce=s.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(o?ce=T.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ce,ee.__webglTexture),W(ce,v,pe),o&&v.mipmaps&&v.mipmaps.length>0)for(let ue=0;ue<v.mipmaps.length;ue++)ge(k.__webglFramebuffer[ue],T,v,s.COLOR_ATTACHMENT0,ce,ue);else ge(k.__webglFramebuffer,T,v,s.COLOR_ATTACHMENT0,ce,0);b(v,pe)&&x(ce),t.unbindTexture()}T.depthBuffer&&Ae(T)}function Mt(T){const v=p(T)||o,k=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let ee=0,J=k.length;ee<J;ee++){const te=k[ee];if(b(te,v)){const pe=T.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,ce=i.get(te).__webglTexture;t.bindTexture(pe,ce),x(pe),t.unbindTexture()}}}function Me(T){if(o&&T.samples>0&&fe(T)===!1){const v=T.isWebGLMultipleRenderTargets?T.texture:[T.texture],k=T.width,ee=T.height;let J=s.COLOR_BUFFER_BIT;const te=[],pe=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ce=i.get(T),ue=T.isWebGLMultipleRenderTargets===!0;if(ue)for(let Te=0;Te<v.length;Te++)t.bindFramebuffer(s.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Te,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,ce.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Te,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let Te=0;Te<v.length;Te++){te.push(s.COLOR_ATTACHMENT0+Te),T.depthBuffer&&te.push(pe);const Be=ce.__ignoreDepthValues!==void 0?ce.__ignoreDepthValues:!1;if(Be===!1&&(T.depthBuffer&&(J|=s.DEPTH_BUFFER_BIT),T.stencilBuffer&&(J|=s.STENCIL_BUFFER_BIT)),ue&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,ce.__webglColorRenderbuffer[Te]),Be===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[pe]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[pe])),ue){const Z=i.get(v[Te]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Z,0)}s.blitFramebuffer(0,0,k,ee,0,0,k,ee,J,s.NEAREST),l&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,te)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ue)for(let Te=0;Te<v.length;Te++){t.bindFramebuffer(s.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Te,s.RENDERBUFFER,ce.__webglColorRenderbuffer[Te]);const Be=i.get(v[Te]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,ce.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Te,s.TEXTURE_2D,Be,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}}function Re(T){return Math.min(n.maxSamples,T.samples)}function fe(T){const v=i.get(T);return o&&T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function tt(T){const v=a.render.frame;h.get(T)!==v&&(h.set(T,v),T.update())}function ke(T,v){const k=T.colorSpace,ee=T.format,J=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||T.format===gr||k!==li&&k!==zt&&($e.getTransfer(k)===Qe?o===!1?e.has("EXT_sRGB")===!0&&ee===Yt?(T.format=gr,T.minFilter=Bt,T.generateMipmaps=!1):v=Qo.sRGBToLinear(v):(ee!==Yt||J!==Si)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),v}this.allocateTextureUnit=D,this.resetTextureUnits=Q,this.setTexture2D=O,this.setTexture2DArray=j,this.setTexture3D=X,this.setTextureCube=Y,this.rebindTextures=Xe,this.setupRenderTarget=N,this.updateRenderTargetMipmap=Mt,this.updateMultisampleRenderTarget=Me,this.setupDepthRenderbuffer=Ae,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=fe}function Wp(s,e,t){const i=t.isWebGL2;function n(r,a=zt){let o;const c=$e.getTransfer(a);if(r===Si)return s.UNSIGNED_BYTE;if(r===Vo)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Wo)return s.UNSIGNED_SHORT_5_5_5_1;if(r===dl)return s.BYTE;if(r===fl)return s.SHORT;if(r===br)return s.UNSIGNED_SHORT;if(r===Ho)return s.INT;if(r===_i)return s.UNSIGNED_INT;if(r===vi)return s.FLOAT;if(r===En)return i?s.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===pl)return s.ALPHA;if(r===Yt)return s.RGBA;if(r===ml)return s.LUMINANCE;if(r===gl)return s.LUMINANCE_ALPHA;if(r===Ii)return s.DEPTH_COMPONENT;if(r===ln)return s.DEPTH_STENCIL;if(r===gr)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===_l)return s.RED;if(r===Xo)return s.RED_INTEGER;if(r===vl)return s.RG;if(r===qo)return s.RG_INTEGER;if(r===jo)return s.RGBA_INTEGER;if(r===Ds||r===Is||r===Us||r===Ns)if(c===Qe)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Ds)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Is)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Us)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Ns)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Ds)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Is)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Us)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Ns)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Zr||r===Jr||r===Qr||r===ea)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===Zr)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Jr)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Qr)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===ea)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Yo)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===ta||r===ia)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===ta)return c===Qe?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===ia)return c===Qe?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===na||r===sa||r===ra||r===aa||r===oa||r===ca||r===la||r===ha||r===ua||r===da||r===fa||r===pa||r===ma||r===ga)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===na)return c===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===sa)return c===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===ra)return c===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===aa)return c===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===oa)return c===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===ca)return c===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===la)return c===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===ha)return c===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===ua)return c===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===da)return c===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===fa)return c===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===pa)return c===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===ma)return c===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===ga)return c===Qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Fs||r===_a||r===va)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===Fs)return c===Qe?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===_a)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===va)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===xl||r===xa||r===ya||r===Sa)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===Fs)return o.COMPRESSED_RED_RGTC1_EXT;if(r===xa)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===ya)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Sa)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Di?i?s.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:n}}class Xp extends Nt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Gt extends gt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const qp={type:"move"};class rr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Gt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Gt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Gt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let n=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,i),d=this._getHandJoint(l,_);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),m=.02,g=.005;l.inputState.pinching&&f>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(n=t.getPose(e.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(qp)))}return o!==null&&(o.visible=n!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Gt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class jp extends un{constructor(e,t){super();const i=this;let n=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,f=null,m=null,g=null;const _=t.getContextAttributes();let p=null,d=null;const b=[],x=[],A=new ve;let L=null;const w=new Nt;w.layers.enable(1),w.viewport=new et;const P=new Nt;P.layers.enable(2),P.viewport=new et;const z=[w,P],y=new Xp;y.layers.enable(1),y.layers.enable(2);let E=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let K=b[W];return K===void 0&&(K=new rr,b[W]=K),K.getTargetRaySpace()},this.getControllerGrip=function(W){let K=b[W];return K===void 0&&(K=new rr,b[W]=K),K.getGripSpace()},this.getHand=function(W){let K=b[W];return K===void 0&&(K=new rr,b[W]=K),K.getHandSpace()};function V(W){const K=x.indexOf(W.inputSource);if(K===-1)return;const le=b[K];le!==void 0&&(le.update(W.inputSource,W.frame,l||a),le.dispatchEvent({type:W.type,data:W.inputSource}))}function Q(){n.removeEventListener("select",V),n.removeEventListener("selectstart",V),n.removeEventListener("selectend",V),n.removeEventListener("squeeze",V),n.removeEventListener("squeezestart",V),n.removeEventListener("squeezeend",V),n.removeEventListener("end",Q),n.removeEventListener("inputsourceschange",D);for(let W=0;W<b.length;W++){const K=x[W];K!==null&&(x[W]=null,b[W].disconnect(K))}E=null,H=null,e.setRenderTarget(p),m=null,f=null,u=null,n=null,d=null,ne.stop(),i.isPresenting=!1,e.setPixelRatio(L),e.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(W){l=W},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(W){if(n=W,n!==null){if(p=e.getRenderTarget(),n.addEventListener("select",V),n.addEventListener("selectstart",V),n.addEventListener("selectend",V),n.addEventListener("squeeze",V),n.addEventListener("squeezestart",V),n.addEventListener("squeezeend",V),n.addEventListener("end",Q),n.addEventListener("inputsourceschange",D),_.xrCompatible!==!0&&await t.makeXRCompatible(),L=e.getPixelRatio(),e.getSize(A),n.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const K={antialias:n.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(n,t,K),n.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),d=new Ni(m.framebufferWidth,m.framebufferHeight,{format:Yt,type:Si,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let K=null,le=null,_e=null;_.depth&&(_e=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,K=_.stencil?ln:Ii,le=_.stencil?Di:_i);const ge={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:r};u=new XRWebGLBinding(n,t),f=u.createProjectionLayer(ge),n.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),d=new Ni(f.textureWidth,f.textureHeight,{format:Yt,type:Si,depthTexture:new hc(f.textureWidth,f.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Ie=e.properties.get(d);Ie.__ignoreDepthValues=f.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await n.requestReferenceSpace(o),ne.setContext(n),ne.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode};function D(W){for(let K=0;K<W.removed.length;K++){const le=W.removed[K],_e=x.indexOf(le);_e>=0&&(x[_e]=null,b[_e].disconnect(le))}for(let K=0;K<W.added.length;K++){const le=W.added[K];let _e=x.indexOf(le);if(_e===-1){for(let Ie=0;Ie<b.length;Ie++)if(Ie>=x.length){x.push(le),_e=Ie;break}else if(x[Ie]===null){x[Ie]=le,_e=Ie;break}if(_e===-1)break}const ge=b[_e];ge&&ge.connect(le)}}const U=new C,O=new C;function j(W,K,le){U.setFromMatrixPosition(K.matrixWorld),O.setFromMatrixPosition(le.matrixWorld);const _e=U.distanceTo(O),ge=K.projectionMatrix.elements,Ie=le.projectionMatrix.elements,Ne=ge[14]/(ge[10]-1),Ae=ge[14]/(ge[10]+1),Xe=(ge[9]+1)/ge[5],N=(ge[9]-1)/ge[5],Mt=(ge[8]-1)/ge[0],Me=(Ie[8]+1)/Ie[0],Re=Ne*Mt,fe=Ne*Me,tt=_e/(-Mt+Me),ke=tt*-Mt;K.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(ke),W.translateZ(tt),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert();const T=Ne+tt,v=Ae+tt,k=Re-ke,ee=fe+(_e-ke),J=Xe*Ae/v*T,te=N*Ae/v*T;W.projectionMatrix.makePerspective(k,ee,J,te,T,v),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}function X(W,K){K===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(K.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(n===null)return;y.near=P.near=w.near=W.near,y.far=P.far=w.far=W.far,(E!==y.near||H!==y.far)&&(n.updateRenderState({depthNear:y.near,depthFar:y.far}),E=y.near,H=y.far);const K=W.parent,le=y.cameras;X(y,K);for(let _e=0;_e<le.length;_e++)X(le[_e],K);le.length===2?j(y,w,P):y.projectionMatrix.copy(w.projectionMatrix),Y(W,y,K)};function Y(W,K,le){le===null?W.matrix.copy(K.matrixWorld):(W.matrix.copy(le.matrixWorld),W.matrix.invert(),W.matrix.multiply(K.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(K.projectionMatrix),W.projectionMatrixInverse.copy(K.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Tn*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&m===null))return c},this.setFoveation=function(W){c=W,f!==null&&(f.fixedFoveation=W),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=W)};let $=null;function ie(W,K){if(h=K.getViewerPose(l||a),g=K,h!==null){const le=h.views;m!==null&&(e.setRenderTargetFramebuffer(d,m.framebuffer),e.setRenderTarget(d));let _e=!1;le.length!==y.cameras.length&&(y.cameras.length=0,_e=!0);for(let ge=0;ge<le.length;ge++){const Ie=le[ge];let Ne=null;if(m!==null)Ne=m.getViewport(Ie);else{const Xe=u.getViewSubImage(f,Ie);Ne=Xe.viewport,ge===0&&(e.setRenderTargetTextures(d,Xe.colorTexture,f.ignoreDepthValues?void 0:Xe.depthStencilTexture),e.setRenderTarget(d))}let Ae=z[ge];Ae===void 0&&(Ae=new Nt,Ae.layers.enable(ge),Ae.viewport=new et,z[ge]=Ae),Ae.matrix.fromArray(Ie.transform.matrix),Ae.matrix.decompose(Ae.position,Ae.quaternion,Ae.scale),Ae.projectionMatrix.fromArray(Ie.projectionMatrix),Ae.projectionMatrixInverse.copy(Ae.projectionMatrix).invert(),Ae.viewport.set(Ne.x,Ne.y,Ne.width,Ne.height),ge===0&&(y.matrix.copy(Ae.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),_e===!0&&y.cameras.push(Ae)}}for(let le=0;le<b.length;le++){const _e=x[le],ge=b[le];_e!==null&&ge!==void 0&&ge.update(_e,K,l||a)}$&&$(W,K),K.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:K}),g=null}const ne=new cc;ne.setAnimationLoop(ie),this.setAnimationLoop=function(W){$=W},this.dispose=function(){}}}function Yp(s,e){function t(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function i(p,d){d.color.getRGB(p.fogColor.value,rc(s)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function n(p,d,b,x,A){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(p,d):d.isMeshToonMaterial?(r(p,d),u(p,d)):d.isMeshPhongMaterial?(r(p,d),h(p,d)):d.isMeshStandardMaterial?(r(p,d),f(p,d),d.isMeshPhysicalMaterial&&m(p,d,A)):d.isMeshMatcapMaterial?(r(p,d),g(p,d)):d.isMeshDepthMaterial?r(p,d):d.isMeshDistanceMaterial?(r(p,d),_(p,d)):d.isMeshNormalMaterial?r(p,d):d.isLineBasicMaterial?(a(p,d),d.isLineDashedMaterial&&o(p,d)):d.isPointsMaterial?c(p,d,b,x):d.isSpriteMaterial?l(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,t(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===Rt&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,t(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===Rt&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,t(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,t(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);const b=e.get(d).envMap;if(b&&(p.envMap.value=b,p.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap){p.lightMap.value=d.lightMap;const x=s._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=d.lightMapIntensity*x,t(d.lightMap,p.lightMapTransform)}d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,p.aoMapTransform))}function a(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform))}function o(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function c(p,d,b,x){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*b,p.scale.value=x*.5,d.map&&(p.map.value=d.map,t(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function l(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function h(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function u(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function f(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,p.roughnessMapTransform)),e.get(d).envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function m(p,d,b){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Rt&&p.clearcoatNormalScale.value.negate())),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=b.texture,p.transmissionSamplerSize.value.set(b.width,b.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,d){d.matcap&&(p.matcap.value=d.matcap)}function _(p,d){const b=e.get(d).light;p.referencePosition.value.setFromMatrixPosition(b.matrixWorld),p.nearDistance.value=b.shadow.camera.near,p.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function $p(s,e,t,i){let n={},r={},a=[];const o=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(b,x){const A=x.program;i.uniformBlockBinding(b,A)}function l(b,x){let A=n[b.id];A===void 0&&(g(b),A=h(b),n[b.id]=A,b.addEventListener("dispose",p));const L=x.program;i.updateUBOMapping(b,L);const w=e.render.frame;r[b.id]!==w&&(f(b),r[b.id]=w)}function h(b){const x=u();b.__bindingPointIndex=x;const A=s.createBuffer(),L=b.__size,w=b.usage;return s.bindBuffer(s.UNIFORM_BUFFER,A),s.bufferData(s.UNIFORM_BUFFER,L,w),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,x,A),A}function u(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const x=n[b.id],A=b.uniforms,L=b.__cache;s.bindBuffer(s.UNIFORM_BUFFER,x);for(let w=0,P=A.length;w<P;w++){const z=Array.isArray(A[w])?A[w]:[A[w]];for(let y=0,E=z.length;y<E;y++){const H=z[y];if(m(H,w,y,L)===!0){const V=H.__offset,Q=Array.isArray(H.value)?H.value:[H.value];let D=0;for(let U=0;U<Q.length;U++){const O=Q[U],j=_(O);typeof O=="number"||typeof O=="boolean"?(H.__data[0]=O,s.bufferSubData(s.UNIFORM_BUFFER,V+D,H.__data)):O.isMatrix3?(H.__data[0]=O.elements[0],H.__data[1]=O.elements[1],H.__data[2]=O.elements[2],H.__data[3]=0,H.__data[4]=O.elements[3],H.__data[5]=O.elements[4],H.__data[6]=O.elements[5],H.__data[7]=0,H.__data[8]=O.elements[6],H.__data[9]=O.elements[7],H.__data[10]=O.elements[8],H.__data[11]=0):(O.toArray(H.__data,D),D+=j.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,V,H.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function m(b,x,A,L){const w=b.value,P=x+"_"+A;if(L[P]===void 0)return typeof w=="number"||typeof w=="boolean"?L[P]=w:L[P]=w.clone(),!0;{const z=L[P];if(typeof w=="number"||typeof w=="boolean"){if(z!==w)return L[P]=w,!0}else if(z.equals(w)===!1)return z.copy(w),!0}return!1}function g(b){const x=b.uniforms;let A=0;const L=16;for(let P=0,z=x.length;P<z;P++){const y=Array.isArray(x[P])?x[P]:[x[P]];for(let E=0,H=y.length;E<H;E++){const V=y[E],Q=Array.isArray(V.value)?V.value:[V.value];for(let D=0,U=Q.length;D<U;D++){const O=Q[D],j=_(O),X=A%L;X!==0&&L-X<j.boundary&&(A+=L-X),V.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=A,A+=j.storage}}}const w=A%L;return w>0&&(A+=L-w),b.__size=A,b.__cache={},this}function _(b){const x={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(x.boundary=4,x.storage=4):b.isVector2?(x.boundary=8,x.storage=8):b.isVector3||b.isColor?(x.boundary=16,x.storage=12):b.isVector4?(x.boundary=16,x.storage=16):b.isMatrix3?(x.boundary=48,x.storage=48):b.isMatrix4?(x.boundary=64,x.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),x}function p(b){const x=b.target;x.removeEventListener("dispose",p);const A=a.indexOf(x.__bindingPointIndex);a.splice(A,1),s.deleteBuffer(n[x.id]),delete n[x.id],delete r[x.id]}function d(){for(const b in n)s.deleteBuffer(n[b]);a=[],n={},r={}}return{bind:c,update:l,dispose:d}}class gc{constructor(e={}){const{canvas:t=Wl(),context:i=null,depth:n=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let f;i!==null?f=i.getContextAttributes().alpha:f=a;const m=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const d=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ht,this._useLegacyLights=!1,this.toneMapping=yi,this.toneMappingExposure=1;const x=this;let A=!1,L=0,w=0,P=null,z=-1,y=null;const E=new et,H=new et;let V=null;const Q=new Se(0);let D=0,U=t.width,O=t.height,j=1,X=null,Y=null;const $=new et(0,0,U,O),ie=new et(0,0,U,O);let ne=!1;const W=new wr;let K=!1,le=!1,_e=null;const ge=new rt,Ie=new ve,Ne=new C,Ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Xe(){return P===null?j:1}let N=i;function Mt(S,I){for(let B=0;B<S.length;B++){const G=S[B],F=t.getContext(G,I);if(F!==null)return F}return null}try{const S={alpha:!0,depth:n,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Mr}`),t.addEventListener("webglcontextlost",se,!1),t.addEventListener("webglcontextrestored",R,!1),t.addEventListener("webglcontextcreationerror",ae,!1),N===null){const I=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&I.shift(),N=Mt(I,S),N===null)throw Mt(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&N instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),N.getShaderPrecisionFormat===void 0&&(N.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Me,Re,fe,tt,ke,T,v,k,ee,J,te,pe,ce,ue,Te,Be,Z,Ye,We,Ce,xe,de,Fe,je;function nt(){Me=new rf(N),Re=new Jd(N,Me,e),Me.init(Re),de=new Wp(N,Me,Re),fe=new Hp(N,Me,Re),tt=new cf(N),ke=new Pp,T=new Vp(N,Me,fe,ke,Re,de,tt),v=new ef(x),k=new sf(x),ee=new mh(N,Re),Fe=new Kd(N,Me,ee,Re),J=new af(N,ee,tt,Fe),te=new df(N,J,ee,tt),We=new uf(N,Re,T),Be=new Qd(ke),pe=new wp(x,v,k,Me,Re,Fe,Be),ce=new Yp(x,ke),ue=new Rp,Te=new Fp(Me,Re),Ye=new $d(x,v,k,fe,te,f,c),Z=new Gp(x,te,Re),je=new $p(N,tt,Re,fe),Ce=new Zd(N,Me,tt,Re),xe=new of(N,Me,tt,Re),tt.programs=pe.programs,x.capabilities=Re,x.extensions=Me,x.properties=ke,x.renderLists=ue,x.shadowMap=Z,x.state=fe,x.info=tt}nt();const Ge=new jp(x,N);this.xr=Ge,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const S=Me.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Me.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(S){S!==void 0&&(j=S,this.setSize(U,O,!1))},this.getSize=function(S){return S.set(U,O)},this.setSize=function(S,I,B=!0){if(Ge.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=S,O=I,t.width=Math.floor(S*j),t.height=Math.floor(I*j),B===!0&&(t.style.width=S+"px",t.style.height=I+"px"),this.setViewport(0,0,S,I)},this.getDrawingBufferSize=function(S){return S.set(U*j,O*j).floor()},this.setDrawingBufferSize=function(S,I,B){U=S,O=I,j=B,t.width=Math.floor(S*B),t.height=Math.floor(I*B),this.setViewport(0,0,S,I)},this.getCurrentViewport=function(S){return S.copy(E)},this.getViewport=function(S){return S.copy($)},this.setViewport=function(S,I,B,G){S.isVector4?$.set(S.x,S.y,S.z,S.w):$.set(S,I,B,G),fe.viewport(E.copy($).multiplyScalar(j).floor())},this.getScissor=function(S){return S.copy(ie)},this.setScissor=function(S,I,B,G){S.isVector4?ie.set(S.x,S.y,S.z,S.w):ie.set(S,I,B,G),fe.scissor(H.copy(ie).multiplyScalar(j).floor())},this.getScissorTest=function(){return ne},this.setScissorTest=function(S){fe.setScissorTest(ne=S)},this.setOpaqueSort=function(S){X=S},this.setTransparentSort=function(S){Y=S},this.getClearColor=function(S){return S.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor.apply(Ye,arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha.apply(Ye,arguments)},this.clear=function(S=!0,I=!0,B=!0){let G=0;if(S){let F=!1;if(P!==null){const he=P.texture.format;F=he===jo||he===qo||he===Xo}if(F){const he=P.texture.type,me=he===Si||he===_i||he===br||he===Di||he===Vo||he===Wo,Ee=Ye.getClearColor(),Pe=Ye.getClearAlpha(),ze=Ee.r,Le=Ee.g,Ue=Ee.b;me?(m[0]=ze,m[1]=Le,m[2]=Ue,m[3]=Pe,N.clearBufferuiv(N.COLOR,0,m)):(g[0]=ze,g[1]=Le,g[2]=Ue,g[3]=Pe,N.clearBufferiv(N.COLOR,0,g))}else G|=N.COLOR_BUFFER_BIT}I&&(G|=N.DEPTH_BUFFER_BIT),B&&(G|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",se,!1),t.removeEventListener("webglcontextrestored",R,!1),t.removeEventListener("webglcontextcreationerror",ae,!1),ue.dispose(),Te.dispose(),ke.dispose(),v.dispose(),k.dispose(),te.dispose(),Fe.dispose(),je.dispose(),pe.dispose(),Ge.dispose(),Ge.removeEventListener("sessionstart",bt),Ge.removeEventListener("sessionend",Je),_e&&(_e.dispose(),_e=null),Et.stop()};function se(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function R(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const S=tt.autoReset,I=Z.enabled,B=Z.autoUpdate,G=Z.needsUpdate,F=Z.type;nt(),tt.autoReset=S,Z.enabled=I,Z.autoUpdate=B,Z.needsUpdate=G,Z.type=F}function ae(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function oe(S){const I=S.target;I.removeEventListener("dispose",oe),we(I)}function we(S){be(S),ke.remove(S)}function be(S){const I=ke.get(S).programs;I!==void 0&&(I.forEach(function(B){pe.releaseProgram(B)}),S.isShaderMaterial&&pe.releaseShaderCache(S))}this.renderBufferDirect=function(S,I,B,G,F,he){I===null&&(I=Ae);const me=F.isMesh&&F.matrixWorld.determinant()<0,Ee=Tc(S,I,B,G,F);fe.setMaterial(G,me);let Pe=B.index,ze=1;if(G.wireframe===!0){if(Pe=J.getWireframeAttribute(B),Pe===void 0)return;ze=2}const Le=B.drawRange,Ue=B.attributes.position;let ot=Le.start*ze,Dt=(Le.start+Le.count)*ze;he!==null&&(ot=Math.max(ot,he.start*ze),Dt=Math.min(Dt,(he.start+he.count)*ze)),Pe!==null?(ot=Math.max(ot,0),Dt=Math.min(Dt,Pe.count)):Ue!=null&&(ot=Math.max(ot,0),Dt=Math.min(Dt,Ue.count));const pt=Dt-ot;if(pt<0||pt===1/0)return;Fe.setup(F,G,Ee,B,Pe);let ti,it=Ce;if(Pe!==null&&(ti=ee.get(Pe),it=xe,it.setIndex(ti)),F.isMesh)G.wireframe===!0?(fe.setLineWidth(G.wireframeLinewidth*Xe()),it.setMode(N.LINES)):it.setMode(N.TRIANGLES);else if(F.isLine){let He=G.linewidth;He===void 0&&(He=1),fe.setLineWidth(He*Xe()),F.isLineSegments?it.setMode(N.LINES):F.isLineLoop?it.setMode(N.LINE_LOOP):it.setMode(N.LINE_STRIP)}else F.isPoints?it.setMode(N.POINTS):F.isSprite&&it.setMode(N.TRIANGLES);if(F.isBatchedMesh)it.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else if(F.isInstancedMesh)it.renderInstances(ot,pt,F.count);else if(B.isInstancedBufferGeometry){const He=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,ws=Math.min(B.instanceCount,He);it.renderInstances(ot,pt,ws)}else it.render(ot,pt)};function Ke(S,I,B){S.transparent===!0&&S.side===qt&&S.forceSinglePass===!1?(S.side=Rt,S.needsUpdate=!0,Un(S,I,B),S.side=Mi,S.needsUpdate=!0,Un(S,I,B),S.side=qt):Un(S,I,B)}this.compile=function(S,I,B=null){B===null&&(B=S),p=Te.get(B),p.init(),b.push(p),B.traverseVisible(function(F){F.isLight&&F.layers.test(I.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),S!==B&&S.traverseVisible(function(F){F.isLight&&F.layers.test(I.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights(x._useLegacyLights);const G=new Set;return S.traverse(function(F){const he=F.material;if(he)if(Array.isArray(he))for(let me=0;me<he.length;me++){const Ee=he[me];Ke(Ee,B,F),G.add(Ee)}else Ke(he,B,F),G.add(he)}),b.pop(),p=null,G},this.compileAsync=function(S,I,B=null){const G=this.compile(S,I,B);return new Promise(F=>{function he(){if(G.forEach(function(me){ke.get(me).currentProgram.isReady()&&G.delete(me)}),G.size===0){F(S);return}setTimeout(he,10)}Me.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let Ze=null;function ft(S){Ze&&Ze(S)}function bt(){Et.stop()}function Je(){Et.start()}const Et=new cc;Et.setAnimationLoop(ft),typeof self<"u"&&Et.setContext(self),this.setAnimationLoop=function(S){Ze=S,Ge.setAnimationLoop(S),S===null?Et.stop():Et.start()},Ge.addEventListener("sessionstart",bt),Ge.addEventListener("sessionend",Je),this.render=function(S,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),Ge.enabled===!0&&Ge.isPresenting===!0&&(Ge.cameraAutoUpdate===!0&&Ge.updateCamera(I),I=Ge.getCamera()),S.isScene===!0&&S.onBeforeRender(x,S,I,P),p=Te.get(S,b.length),p.init(),b.push(p),ge.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),W.setFromProjectionMatrix(ge),le=this.localClippingEnabled,K=Be.init(this.clippingPlanes,le),_=ue.get(S,d.length),_.init(),d.push(_),$t(S,I,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(X,Y),this.info.render.frame++,K===!0&&Be.beginShadows();const B=p.state.shadowsArray;if(Z.render(B,S,I),K===!0&&Be.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ye.render(_,S),p.setupLights(x._useLegacyLights),I.isArrayCamera){const G=I.cameras;for(let F=0,he=G.length;F<he;F++){const me=G[F];kr(_,S,me,me.viewport)}}else kr(_,S,I);P!==null&&(T.updateMultisampleRenderTarget(P),T.updateRenderTargetMipmap(P)),S.isScene===!0&&S.onAfterRender(x,S,I),Fe.resetDefaultState(),z=-1,y=null,b.pop(),b.length>0?p=b[b.length-1]:p=null,d.pop(),d.length>0?_=d[d.length-1]:_=null};function $t(S,I,B,G){if(S.visible===!1)return;if(S.layers.test(I.layers)){if(S.isGroup)B=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(I);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||W.intersectsSprite(S)){G&&Ne.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ge);const me=te.update(S),Ee=S.material;Ee.visible&&_.push(S,me,Ee,B,Ne.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||W.intersectsObject(S))){const me=te.update(S),Ee=S.material;if(G&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ne.copy(S.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),Ne.copy(me.boundingSphere.center)),Ne.applyMatrix4(S.matrixWorld).applyMatrix4(ge)),Array.isArray(Ee)){const Pe=me.groups;for(let ze=0,Le=Pe.length;ze<Le;ze++){const Ue=Pe[ze],ot=Ee[Ue.materialIndex];ot&&ot.visible&&_.push(S,me,ot,B,Ne.z,Ue)}}else Ee.visible&&_.push(S,me,Ee,B,Ne.z,null)}}const he=S.children;for(let me=0,Ee=he.length;me<Ee;me++)$t(he[me],I,B,G)}function kr(S,I,B,G){const F=S.opaque,he=S.transmissive,me=S.transparent;p.setupLightsView(B),K===!0&&Be.setGlobalState(x.clippingPlanes,B),he.length>0&&Ec(F,he,I,B),G&&fe.viewport(E.copy(G)),F.length>0&&In(F,I,B),he.length>0&&In(he,I,B),me.length>0&&In(me,I,B),fe.buffers.depth.setTest(!0),fe.buffers.depth.setMask(!0),fe.buffers.color.setMask(!0),fe.setPolygonOffset(!1)}function Ec(S,I,B,G){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;const he=Re.isWebGL2;_e===null&&(_e=new Ni(1,1,{generateMipmaps:!0,type:Me.has("EXT_color_buffer_half_float")?En:Si,minFilter:bn,samples:he?4:0})),x.getDrawingBufferSize(Ie),he?_e.setSize(Ie.x,Ie.y):_e.setSize(_s(Ie.x),_s(Ie.y));const me=x.getRenderTarget();x.setRenderTarget(_e),x.getClearColor(Q),D=x.getClearAlpha(),D<1&&x.setClearColor(16777215,.5),x.clear();const Ee=x.toneMapping;x.toneMapping=yi,In(S,B,G),T.updateMultisampleRenderTarget(_e),T.updateRenderTargetMipmap(_e);let Pe=!1;for(let ze=0,Le=I.length;ze<Le;ze++){const Ue=I[ze],ot=Ue.object,Dt=Ue.geometry,pt=Ue.material,ti=Ue.group;if(pt.side===qt&&ot.layers.test(G.layers)){const it=pt.side;pt.side=Rt,pt.needsUpdate=!0,Br(ot,B,G,Dt,pt,ti),pt.side=it,pt.needsUpdate=!0,Pe=!0}}Pe===!0&&(T.updateMultisampleRenderTarget(_e),T.updateRenderTargetMipmap(_e)),x.setRenderTarget(me),x.setClearColor(Q,D),x.toneMapping=Ee}function In(S,I,B){const G=I.isScene===!0?I.overrideMaterial:null;for(let F=0,he=S.length;F<he;F++){const me=S[F],Ee=me.object,Pe=me.geometry,ze=G===null?me.material:G,Le=me.group;Ee.layers.test(B.layers)&&Br(Ee,I,B,Pe,ze,Le)}}function Br(S,I,B,G,F,he){S.onBeforeRender(x,I,B,G,F,he),S.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),F.onBeforeRender(x,I,B,G,S,he),F.transparent===!0&&F.side===qt&&F.forceSinglePass===!1?(F.side=Rt,F.needsUpdate=!0,x.renderBufferDirect(B,I,G,F,S,he),F.side=Mi,F.needsUpdate=!0,x.renderBufferDirect(B,I,G,F,S,he),F.side=qt):x.renderBufferDirect(B,I,G,F,S,he),S.onAfterRender(x,I,B,G,F,he)}function Un(S,I,B){I.isScene!==!0&&(I=Ae);const G=ke.get(S),F=p.state.lights,he=p.state.shadowsArray,me=F.state.version,Ee=pe.getParameters(S,F.state,he,I,B),Pe=pe.getProgramCacheKey(Ee);let ze=G.programs;G.environment=S.isMeshStandardMaterial?I.environment:null,G.fog=I.fog,G.envMap=(S.isMeshStandardMaterial?k:v).get(S.envMap||G.environment),ze===void 0&&(S.addEventListener("dispose",oe),ze=new Map,G.programs=ze);let Le=ze.get(Pe);if(Le!==void 0){if(G.currentProgram===Le&&G.lightsStateVersion===me)return Gr(S,Ee),Le}else Ee.uniforms=pe.getUniforms(S),S.onBuild(B,Ee,x),S.onBeforeCompile(Ee,x),Le=pe.acquireProgram(Ee,Pe),ze.set(Pe,Le),G.uniforms=Ee.uniforms;const Ue=G.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ue.clippingPlanes=Be.uniform),Gr(S,Ee),G.needsLights=wc(S),G.lightsStateVersion=me,G.needsLights&&(Ue.ambientLightColor.value=F.state.ambient,Ue.lightProbe.value=F.state.probe,Ue.directionalLights.value=F.state.directional,Ue.directionalLightShadows.value=F.state.directionalShadow,Ue.spotLights.value=F.state.spot,Ue.spotLightShadows.value=F.state.spotShadow,Ue.rectAreaLights.value=F.state.rectArea,Ue.ltc_1.value=F.state.rectAreaLTC1,Ue.ltc_2.value=F.state.rectAreaLTC2,Ue.pointLights.value=F.state.point,Ue.pointLightShadows.value=F.state.pointShadow,Ue.hemisphereLights.value=F.state.hemi,Ue.directionalShadowMap.value=F.state.directionalShadowMap,Ue.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ue.spotShadowMap.value=F.state.spotShadowMap,Ue.spotLightMatrix.value=F.state.spotLightMatrix,Ue.spotLightMap.value=F.state.spotLightMap,Ue.pointShadowMap.value=F.state.pointShadowMap,Ue.pointShadowMatrix.value=F.state.pointShadowMatrix),G.currentProgram=Le,G.uniformsList=null,Le}function zr(S){if(S.uniformsList===null){const I=S.currentProgram.getUniforms();S.uniformsList=ls.seqWithValue(I.seq,S.uniforms)}return S.uniformsList}function Gr(S,I){const B=ke.get(S);B.outputColorSpace=I.outputColorSpace,B.batching=I.batching,B.instancing=I.instancing,B.instancingColor=I.instancingColor,B.skinning=I.skinning,B.morphTargets=I.morphTargets,B.morphNormals=I.morphNormals,B.morphColors=I.morphColors,B.morphTargetsCount=I.morphTargetsCount,B.numClippingPlanes=I.numClippingPlanes,B.numIntersection=I.numClipIntersection,B.vertexAlphas=I.vertexAlphas,B.vertexTangents=I.vertexTangents,B.toneMapping=I.toneMapping}function Tc(S,I,B,G,F){I.isScene!==!0&&(I=Ae),T.resetTextureUnits();const he=I.fog,me=G.isMeshStandardMaterial?I.environment:null,Ee=P===null?x.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:li,Pe=(G.isMeshStandardMaterial?k:v).get(G.envMap||me),ze=G.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Le=!!B.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ue=!!B.morphAttributes.position,ot=!!B.morphAttributes.normal,Dt=!!B.morphAttributes.color;let pt=yi;G.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(pt=x.toneMapping);const ti=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,it=ti!==void 0?ti.length:0,He=ke.get(G),ws=p.state.lights;if(K===!0&&(le===!0||S!==y)){const Ft=S===y&&G.id===z;Be.setState(G,S,Ft)}let st=!1;G.version===He.__version?(He.needsLights&&He.lightsStateVersion!==ws.state.version||He.outputColorSpace!==Ee||F.isBatchedMesh&&He.batching===!1||!F.isBatchedMesh&&He.batching===!0||F.isInstancedMesh&&He.instancing===!1||!F.isInstancedMesh&&He.instancing===!0||F.isSkinnedMesh&&He.skinning===!1||!F.isSkinnedMesh&&He.skinning===!0||F.isInstancedMesh&&He.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&He.instancingColor===!1&&F.instanceColor!==null||He.envMap!==Pe||G.fog===!0&&He.fog!==he||He.numClippingPlanes!==void 0&&(He.numClippingPlanes!==Be.numPlanes||He.numIntersection!==Be.numIntersection)||He.vertexAlphas!==ze||He.vertexTangents!==Le||He.morphTargets!==Ue||He.morphNormals!==ot||He.morphColors!==Dt||He.toneMapping!==pt||Re.isWebGL2===!0&&He.morphTargetsCount!==it)&&(st=!0):(st=!0,He.__version=G.version);let bi=He.currentProgram;st===!0&&(bi=Un(G,I,F));let Hr=!1,pn=!1,Ps=!1;const vt=bi.getUniforms(),Ei=He.uniforms;if(fe.useProgram(bi.program)&&(Hr=!0,pn=!0,Ps=!0),G.id!==z&&(z=G.id,pn=!0),Hr||y!==S){vt.setValue(N,"projectionMatrix",S.projectionMatrix),vt.setValue(N,"viewMatrix",S.matrixWorldInverse);const Ft=vt.map.cameraPosition;Ft!==void 0&&Ft.setValue(N,Ne.setFromMatrixPosition(S.matrixWorld)),Re.logarithmicDepthBuffer&&vt.setValue(N,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&vt.setValue(N,"isOrthographic",S.isOrthographicCamera===!0),y!==S&&(y=S,pn=!0,Ps=!0)}if(F.isSkinnedMesh){vt.setOptional(N,F,"bindMatrix"),vt.setOptional(N,F,"bindMatrixInverse");const Ft=F.skeleton;Ft&&(Re.floatVertexTextures?(Ft.boneTexture===null&&Ft.computeBoneTexture(),vt.setValue(N,"boneTexture",Ft.boneTexture,T)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}F.isBatchedMesh&&(vt.setOptional(N,F,"batchingTexture"),vt.setValue(N,"batchingTexture",F._matricesTexture,T));const Cs=B.morphAttributes;if((Cs.position!==void 0||Cs.normal!==void 0||Cs.color!==void 0&&Re.isWebGL2===!0)&&We.update(F,B,bi),(pn||He.receiveShadow!==F.receiveShadow)&&(He.receiveShadow=F.receiveShadow,vt.setValue(N,"receiveShadow",F.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Ei.envMap.value=Pe,Ei.flipEnvMap.value=Pe.isCubeTexture&&Pe.isRenderTargetTexture===!1?-1:1),pn&&(vt.setValue(N,"toneMappingExposure",x.toneMappingExposure),He.needsLights&&Ac(Ei,Ps),he&&G.fog===!0&&ce.refreshFogUniforms(Ei,he),ce.refreshMaterialUniforms(Ei,G,j,O,_e),ls.upload(N,zr(He),Ei,T)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(ls.upload(N,zr(He),Ei,T),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&vt.setValue(N,"center",F.center),vt.setValue(N,"modelViewMatrix",F.modelViewMatrix),vt.setValue(N,"normalMatrix",F.normalMatrix),vt.setValue(N,"modelMatrix",F.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const Ft=G.uniformsGroups;for(let Rs=0,Pc=Ft.length;Rs<Pc;Rs++)if(Re.isWebGL2){const Vr=Ft[Rs];je.update(Vr,bi),je.bind(Vr,bi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return bi}function Ac(S,I){S.ambientLightColor.needsUpdate=I,S.lightProbe.needsUpdate=I,S.directionalLights.needsUpdate=I,S.directionalLightShadows.needsUpdate=I,S.pointLights.needsUpdate=I,S.pointLightShadows.needsUpdate=I,S.spotLights.needsUpdate=I,S.spotLightShadows.needsUpdate=I,S.rectAreaLights.needsUpdate=I,S.hemisphereLights.needsUpdate=I}function wc(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(S,I,B){ke.get(S.texture).__webglTexture=I,ke.get(S.depthTexture).__webglTexture=B;const G=ke.get(S);G.__hasExternalTextures=!0,G.__hasExternalTextures&&(G.__autoAllocateDepthBuffer=B===void 0,G.__autoAllocateDepthBuffer||Me.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(S,I){const B=ke.get(S);B.__webglFramebuffer=I,B.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(S,I=0,B=0){P=S,L=I,w=B;let G=!0,F=null,he=!1,me=!1;if(S){const Pe=ke.get(S);Pe.__useDefaultFramebuffer!==void 0?(fe.bindFramebuffer(N.FRAMEBUFFER,null),G=!1):Pe.__webglFramebuffer===void 0?T.setupRenderTarget(S):Pe.__hasExternalTextures&&T.rebindTextures(S,ke.get(S.texture).__webglTexture,ke.get(S.depthTexture).__webglTexture);const ze=S.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(me=!0);const Le=ke.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Le[I])?F=Le[I][B]:F=Le[I],he=!0):Re.isWebGL2&&S.samples>0&&T.useMultisampledRTT(S)===!1?F=ke.get(S).__webglMultisampledFramebuffer:Array.isArray(Le)?F=Le[B]:F=Le,E.copy(S.viewport),H.copy(S.scissor),V=S.scissorTest}else E.copy($).multiplyScalar(j).floor(),H.copy(ie).multiplyScalar(j).floor(),V=ne;if(fe.bindFramebuffer(N.FRAMEBUFFER,F)&&Re.drawBuffers&&G&&fe.drawBuffers(S,F),fe.viewport(E),fe.scissor(H),fe.setScissorTest(V),he){const Pe=ke.get(S.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+I,Pe.__webglTexture,B)}else if(me){const Pe=ke.get(S.texture),ze=I||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,Pe.__webglTexture,B||0,ze)}z=-1},this.readRenderTargetPixels=function(S,I,B,G,F,he,me){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ee=ke.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&me!==void 0&&(Ee=Ee[me]),Ee){fe.bindFramebuffer(N.FRAMEBUFFER,Ee);try{const Pe=S.texture,ze=Pe.format,Le=Pe.type;if(ze!==Yt&&de.convert(ze)!==N.getParameter(N.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ue=Le===En&&(Me.has("EXT_color_buffer_half_float")||Re.isWebGL2&&Me.has("EXT_color_buffer_float"));if(Le!==Si&&de.convert(Le)!==N.getParameter(N.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Le===vi&&(Re.isWebGL2||Me.has("OES_texture_float")||Me.has("WEBGL_color_buffer_float")))&&!Ue){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=S.width-G&&B>=0&&B<=S.height-F&&N.readPixels(I,B,G,F,de.convert(ze),de.convert(Le),he)}finally{const Pe=P!==null?ke.get(P).__webglFramebuffer:null;fe.bindFramebuffer(N.FRAMEBUFFER,Pe)}}},this.copyFramebufferToTexture=function(S,I,B=0){const G=Math.pow(2,-B),F=Math.floor(I.image.width*G),he=Math.floor(I.image.height*G);T.setTexture2D(I,0),N.copyTexSubImage2D(N.TEXTURE_2D,B,0,0,S.x,S.y,F,he),fe.unbindTexture()},this.copyTextureToTexture=function(S,I,B,G=0){const F=I.image.width,he=I.image.height,me=de.convert(B.format),Ee=de.convert(B.type);T.setTexture2D(B,0),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,B.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,B.unpackAlignment),I.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,G,S.x,S.y,F,he,me,Ee,I.image.data):I.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,G,S.x,S.y,I.mipmaps[0].width,I.mipmaps[0].height,me,I.mipmaps[0].data):N.texSubImage2D(N.TEXTURE_2D,G,S.x,S.y,me,Ee,I.image),G===0&&B.generateMipmaps&&N.generateMipmap(N.TEXTURE_2D),fe.unbindTexture()},this.copyTextureToTexture3D=function(S,I,B,G,F=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const he=S.max.x-S.min.x+1,me=S.max.y-S.min.y+1,Ee=S.max.z-S.min.z+1,Pe=de.convert(G.format),ze=de.convert(G.type);let Le;if(G.isData3DTexture)T.setTexture3D(G,0),Le=N.TEXTURE_3D;else if(G.isDataArrayTexture||G.isCompressedArrayTexture)T.setTexture2DArray(G,0),Le=N.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,G.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,G.unpackAlignment);const Ue=N.getParameter(N.UNPACK_ROW_LENGTH),ot=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Dt=N.getParameter(N.UNPACK_SKIP_PIXELS),pt=N.getParameter(N.UNPACK_SKIP_ROWS),ti=N.getParameter(N.UNPACK_SKIP_IMAGES),it=B.isCompressedTexture?B.mipmaps[F]:B.image;N.pixelStorei(N.UNPACK_ROW_LENGTH,it.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,it.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,S.min.x),N.pixelStorei(N.UNPACK_SKIP_ROWS,S.min.y),N.pixelStorei(N.UNPACK_SKIP_IMAGES,S.min.z),B.isDataTexture||B.isData3DTexture?N.texSubImage3D(Le,F,I.x,I.y,I.z,he,me,Ee,Pe,ze,it.data):B.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),N.compressedTexSubImage3D(Le,F,I.x,I.y,I.z,he,me,Ee,Pe,it.data)):N.texSubImage3D(Le,F,I.x,I.y,I.z,he,me,Ee,Pe,ze,it),N.pixelStorei(N.UNPACK_ROW_LENGTH,Ue),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ot),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Dt),N.pixelStorei(N.UNPACK_SKIP_ROWS,pt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,ti),F===0&&G.generateMipmaps&&N.generateMipmap(Le),fe.unbindTexture()},this.initTexture=function(S){S.isCubeTexture?T.setTextureCube(S,0):S.isData3DTexture?T.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?T.setTexture2DArray(S,0):T.setTexture2D(S,0),fe.unbindTexture()},this.resetState=function(){L=0,w=0,P=null,fe.reset(),Fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ci}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Er?"display-p3":"srgb",t.unpackColorSpace=$e.workingColorSpace===Ss?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===ht?Ui:$o}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Ui?ht:li}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Kp extends gc{}Kp.prototype.isWebGL1Renderer=!0;class Zp extends gt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Cr extends Oi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Se(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ho=new C,uo=new C,fo=new rt,ar=new Ms,ns=new Cn;class xr extends gt{constructor(e=new St,t=new Cr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let n=1,r=t.count;n<r;n++)ho.fromBufferAttribute(t,n-1),uo.fromBufferAttribute(t,n),i[n]=i[n-1],i[n]+=ho.distanceTo(uo);e.setAttribute("lineDistance",new at(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,n=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ns.copy(i.boundingSphere),ns.applyMatrix4(n),ns.radius+=r,e.ray.intersectsSphere(ns)===!1)return;fo.copy(n).invert(),ar.copy(e.ray).applyMatrix4(fo);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=new C,h=new C,u=new C,f=new C,m=this.isLineSegments?2:1,g=i.index,p=i.attributes.position;if(g!==null){const d=Math.max(0,a.start),b=Math.min(g.count,a.start+a.count);for(let x=d,A=b-1;x<A;x+=m){const L=g.getX(x),w=g.getX(x+1);if(l.fromBufferAttribute(p,L),h.fromBufferAttribute(p,w),ar.distanceSqToSegment(l,h,f,u)>c)continue;f.applyMatrix4(this.matrixWorld);const z=e.ray.origin.distanceTo(f);z<e.near||z>e.far||t.push({distance:z,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const d=Math.max(0,a.start),b=Math.min(p.count,a.start+a.count);for(let x=d,A=b-1;x<A;x+=m){if(l.fromBufferAttribute(p,x),h.fromBufferAttribute(p,x+1),ar.distanceSqToSegment(l,h,f,u)>c)continue;f.applyMatrix4(this.matrixWorld);const w=e.ray.origin.distanceTo(f);w<e.near||w>e.far||t.push({distance:w,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}class _c extends Oi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Se(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const po=new rt,yr=new Ms,ss=new Cn,rs=new C;class Jp extends gt{constructor(e=new St,t=new _c){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,n=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ss.copy(i.boundingSphere),ss.applyMatrix4(n),ss.radius+=r,e.ray.intersectsSphere(ss)===!1)return;po.copy(n).invert(),yr.copy(e.ray).applyMatrix4(po);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,u=i.attributes.position;if(l!==null){const f=Math.max(0,a.start),m=Math.min(l.count,a.start+a.count);for(let g=f,_=m;g<_;g++){const p=l.getX(g);rs.fromBufferAttribute(u,p),mo(rs,p,c,n,e,t,this)}}else{const f=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let g=f,_=m;g<_;g++)rs.fromBufferAttribute(u,g),mo(rs,g,c,n,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function mo(s,e,t,i,n,r,a){const o=yr.distanceSqToPoint(s);if(o<t){const c=new C;yr.closestPointToPoint(s,c),c.applyMatrix4(i);const l=n.ray.origin.distanceTo(c);if(l<n.near||l>n.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,object:a})}}class Rr extends St{constructor(e=1,t=1,i=1,n=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:n,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;n=Math.floor(n),r=Math.floor(r);const h=[],u=[],f=[],m=[];let g=0;const _=[],p=i/2;let d=0;b(),a===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new at(u,3)),this.setAttribute("normal",new at(f,3)),this.setAttribute("uv",new at(m,2));function b(){const A=new C,L=new C;let w=0;const P=(t-e)/i;for(let z=0;z<=r;z++){const y=[],E=z/r,H=E*(t-e)+e;for(let V=0;V<=n;V++){const Q=V/n,D=Q*c+o,U=Math.sin(D),O=Math.cos(D);L.x=H*U,L.y=-E*i+p,L.z=H*O,u.push(L.x,L.y,L.z),A.set(U,P,O).normalize(),f.push(A.x,A.y,A.z),m.push(Q,1-E),y.push(g++)}_.push(y)}for(let z=0;z<n;z++)for(let y=0;y<r;y++){const E=_[y][z],H=_[y+1][z],V=_[y+1][z+1],Q=_[y][z+1];h.push(E,H,Q),h.push(H,V,Q),w+=6}l.addGroup(d,w,0),d+=w}function x(A){const L=g,w=new ve,P=new C;let z=0;const y=A===!0?e:t,E=A===!0?1:-1;for(let V=1;V<=n;V++)u.push(0,p*E,0),f.push(0,E,0),m.push(.5,.5),g++;const H=g;for(let V=0;V<=n;V++){const D=V/n*c+o,U=Math.cos(D),O=Math.sin(D);P.x=y*O,P.y=p*E,P.z=y*U,u.push(P.x,P.y,P.z),f.push(0,E,0),w.x=U*.5+.5,w.y=O*.5*E+.5,m.push(w.x,w.y),g++}for(let V=0;V<n;V++){const Q=L+V,D=H+V;A===!0?h.push(D,D+1,Q):h.push(D+1,D,Q),z+=3}l.addGroup(d,z,A===!0?1:2),d+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rr(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Lr extends Rr{constructor(e=1,t=1,i=32,n=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,i,n,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:n,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Lr(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ln extends St{constructor(e=[],t=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:n};const r=[],a=[];o(n),l(i),h(),this.setAttribute("position",new at(r,3)),this.setAttribute("normal",new at(r.slice(),3)),this.setAttribute("uv",new at(a,2)),n===0?this.computeVertexNormals():this.normalizeNormals();function o(b){const x=new C,A=new C,L=new C;for(let w=0;w<t.length;w+=3)m(t[w+0],x),m(t[w+1],A),m(t[w+2],L),c(x,A,L,b)}function c(b,x,A,L){const w=L+1,P=[];for(let z=0;z<=w;z++){P[z]=[];const y=b.clone().lerp(A,z/w),E=x.clone().lerp(A,z/w),H=w-z;for(let V=0;V<=H;V++)V===0&&z===w?P[z][V]=y:P[z][V]=y.clone().lerp(E,V/H)}for(let z=0;z<w;z++)for(let y=0;y<2*(w-z)-1;y++){const E=Math.floor(y/2);y%2===0?(f(P[z][E+1]),f(P[z+1][E]),f(P[z][E])):(f(P[z][E+1]),f(P[z+1][E+1]),f(P[z+1][E]))}}function l(b){const x=new C;for(let A=0;A<r.length;A+=3)x.x=r[A+0],x.y=r[A+1],x.z=r[A+2],x.normalize().multiplyScalar(b),r[A+0]=x.x,r[A+1]=x.y,r[A+2]=x.z}function h(){const b=new C;for(let x=0;x<r.length;x+=3){b.x=r[x+0],b.y=r[x+1],b.z=r[x+2];const A=p(b)/2/Math.PI+.5,L=d(b)/Math.PI+.5;a.push(A,1-L)}g(),u()}function u(){for(let b=0;b<a.length;b+=6){const x=a[b+0],A=a[b+2],L=a[b+4],w=Math.max(x,A,L),P=Math.min(x,A,L);w>.9&&P<.1&&(x<.2&&(a[b+0]+=1),A<.2&&(a[b+2]+=1),L<.2&&(a[b+4]+=1))}}function f(b){r.push(b.x,b.y,b.z)}function m(b,x){const A=b*3;x.x=e[A+0],x.y=e[A+1],x.z=e[A+2]}function g(){const b=new C,x=new C,A=new C,L=new C,w=new ve,P=new ve,z=new ve;for(let y=0,E=0;y<r.length;y+=9,E+=6){b.set(r[y+0],r[y+1],r[y+2]),x.set(r[y+3],r[y+4],r[y+5]),A.set(r[y+6],r[y+7],r[y+8]),w.set(a[E+0],a[E+1]),P.set(a[E+2],a[E+3]),z.set(a[E+4],a[E+5]),L.copy(b).add(x).add(A).divideScalar(3);const H=p(L);_(w,E+0,b,H),_(P,E+2,x,H),_(z,E+4,A,H)}}function _(b,x,A,L){L<0&&b.x===1&&(a[x]=b.x-1),A.x===0&&A.z===0&&(a[x]=L/2/Math.PI+.5)}function p(b){return Math.atan2(b.z,-b.x)}function d(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ln(e.vertices,e.indices,e.radius,e.details)}}class Dn extends Ln{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,n=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(n,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Dn(e.radius,e.detail)}}class As extends Ln{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],n=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,n,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new As(e.radius,e.detail)}}class Dr extends St{constructor(e=.5,t=1,i=32,n=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:n,thetaStart:r,thetaLength:a},i=Math.max(3,i),n=Math.max(1,n);const o=[],c=[],l=[],h=[];let u=e;const f=(t-e)/n,m=new C,g=new ve;for(let _=0;_<=n;_++){for(let p=0;p<=i;p++){const d=r+p/i*a;m.x=u*Math.cos(d),m.y=u*Math.sin(d),c.push(m.x,m.y,m.z),l.push(0,0,1),g.x=(m.x/t+1)/2,g.y=(m.y/t+1)/2,h.push(g.x,g.y)}u+=f}for(let _=0;_<n;_++){const p=_*(i+1);for(let d=0;d<i;d++){const b=d+p,x=b,A=b+i+1,L=b+i+2,w=b+1;o.push(x,A,w),o.push(A,L,w)}}this.setIndex(o),this.setAttribute("position",new at(c,3)),this.setAttribute("normal",new at(l,3)),this.setAttribute("uv",new at(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dr(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ir extends Ln{constructor(e=1,t=0){const i=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],n=[2,1,0,0,3,2,1,3,0,2,3,1];super(i,n,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ir(e.radius,e.detail)}}class Ur extends St{constructor(e=1,t=.4,i=12,n=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:n,arc:r},i=Math.floor(i),n=Math.floor(n);const a=[],o=[],c=[],l=[],h=new C,u=new C,f=new C;for(let m=0;m<=i;m++)for(let g=0;g<=n;g++){const _=g/n*r,p=m/i*Math.PI*2;u.x=(e+t*Math.cos(p))*Math.cos(_),u.y=(e+t*Math.cos(p))*Math.sin(_),u.z=t*Math.sin(p),o.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(g/n),l.push(m/i)}for(let m=1;m<=i;m++)for(let g=1;g<=n;g++){const _=(n+1)*m+g-1,p=(n+1)*(m-1)+g-1,d=(n+1)*(m-1)+g,b=(n+1)*m+g;a.push(_,p,b),a.push(p,d,b)}this.setIndex(a),this.setAttribute("position",new at(o,3)),this.setAttribute("normal",new at(c,3)),this.setAttribute("uv",new at(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ur(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Qp extends Oi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Se(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Se(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ko,this.normalScale=new ve(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}const go={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class em{constructor(e,t,i){const n=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(h){o++,r===!1&&n.onStart!==void 0&&n.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,n.onProgress!==void 0&&n.onProgress(h,a,o),a===o&&(r=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(h){n.onError!==void 0&&n.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){const m=l[u],g=l[u+1];if(m.global&&(m.lastIndex=0),m.test(h))return g}return null}}}const tm=new em;class Nr{constructor(e){this.manager=e!==void 0?e:tm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(n,r){i.load(e,n,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Nr.DEFAULT_MATERIAL_NAME="__DEFAULT";class im extends Nr{constructor(e){super(e)}load(e,t,i,n){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=go.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=An("img");function c(){h(),go.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(u){h(),n&&n(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class nm extends Nr{constructor(e){super(e)}load(e,t,i,n){const r=new Lt,a=new im(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},i,n),r}}class Fr extends gt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Se(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const or=new rt,_o=new C,vo=new C;class vc{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ve(512,512),this.map=null,this.mapPass=null,this.matrix=new rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wr,this._frameExtents=new ve(1,1),this._viewportCount=1,this._viewports=[new et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;_o.setFromMatrixPosition(e.matrixWorld),t.position.copy(_o),vo.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(vo),t.updateMatrixWorld(),or.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(or),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(or)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const xo=new rt,xn=new C,cr=new C;class sm extends vc{constructor(){super(new Nt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ve(4,2),this._viewportCount=6,this._viewports=[new et(2,1,1,1),new et(0,1,1,1),new et(3,1,1,1),new et(1,1,1,1),new et(3,0,1,1),new et(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,n=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),xn.setFromMatrixPosition(e.matrixWorld),i.position.copy(xn),cr.copy(i.position),cr.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(cr),i.updateMatrixWorld(),n.makeTranslation(-xn.x,-xn.y,-xn.z),xo.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xo)}}class rm extends Fr{constructor(e,t,i=0,n=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new sm}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class am extends vc{constructor(){super(new lc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class om extends Fr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.target=new gt,this.shadow=new am}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class cm extends Fr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class lm{constructor(e,t,i=0,n=1/0){this.ray=new Ms(e,t),this.near=i,this.far=n,this.camera=null,this.layers=new Ar,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,i=[]){return Sr(e,this,i,t),i.sort(yo),i}intersectObjects(e,t=!0,i=[]){for(let n=0,r=e.length;n<r;n++)Sr(e[n],this,i,t);return i.sort(yo),i}}function yo(s,e){return s.distance-e.distance}function Sr(s,e,t,i){if(s.layers.test(e.layers)&&s.raycast(e,t),i===!0){const n=s.children;for(let r=0,a=n.length;r<a;r++)Sr(n[r],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Mr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Mr);const So=[{x:0,y:0,z:0},{x:-2.7,y:3.6,z:1.7},{x:-1.3,y:1.75,z:.8},{x:2.7,y:3.6,z:-1.7},{x:1.3,y:1.75,z:-.8},{x:-2.7,y:-3.6,z:-1.7},{x:-1.3,y:-1.75,z:-.8},{x:2.7,y:-3.6,z:1.7},{x:1.3,y:-1.75,z:.8},{x:0,y:-4.35,z:.15}],Mo=[{x:0,y:0,z:0},{x:-4.8,y:6.1,z:3.4},{x:-2.15,y:2.95,z:1.55},{x:4.8,y:6.1,z:-3.4},{x:2.15,y:2.95,z:-1.55},{x:-4.8,y:-6.1,z:-3.4},{x:-2.15,y:-2.95,z:-1.55},{x:4.8,y:-6.1,z:3.4},{x:2.15,y:-2.95,z:1.55},{x:0,y:-5.05,z:.2}];function hm(s,e){return s===0?"presentation":s===e-1?"hint":"project"}function um(s){return So[s]||So[0]}function dm(s){return Mo[s]||Mo[0]}const fm=[{id:1,activeFacette:0,date:"2024-03",facettes:[{id:1,images:["assets/images/projects/intro.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:"https://github.com/orgs/ApeProd",demo:null,video:null},featured:!1},{id:3,images:["assets/images/projects/Imageprofile.png"],links:{github:null,demo:null,video:null},featured:!1}]},{id:2,activeFacette:0,date:"2024-02",facettes:[{id:1,images:["assets/images/projects/TonoIntro.png"],links:{github:"https://github.com/bheall/Tono_Discord_Bot",demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:3,activeFacette:0,date:"2024-01",facettes:[{id:1,images:["assets/images/projects/Davinciintro.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:4,activeFacette:0,date:"2023-12",facettes:[{id:1,images:[],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:5,activeFacette:0,date:"2023-11",facettes:[{id:1,images:["assets/images/projects/Introia.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:6,activeFacette:0,date:"2023-10",facettes:[{id:1,images:["assets/images/projects/Discordintro.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:7,activeFacette:0,date:"2023-09",facettes:[{id:1,images:["assets/images/projects/placeholder.svg"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:["assets/images/projects/placeholder.svg"],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:["assets/images/projects/placeholder.svg"],links:{github:null,demo:null,video:null},featured:!1}]},{id:8,activeFacette:0,date:"2023-08",facettes:[{id:1,images:["assets/images/projects/Spine.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:9,activeFacette:0,date:"2023-07",facettes:[{id:1,images:["assets/images/projects/Conception.png"],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]},{id:10,activeFacette:0,date:"2023-06",facettes:[{id:1,images:[],links:{github:null,demo:null,video:null},featured:!0},{id:2,images:[],links:{github:null,demo:null,video:null},featured:!1},{id:3,images:[],links:{github:null,demo:null,video:null},featured:!1}]}],xc={fr:[{id:1,title:"PRÉSENTATION",facettes:[{category:"presentation",longDescription:"On dit souvent qu'un restaurant avec une carte trop fournie peine à exceller dans chaque plat. Ape Prod propose plusieurs services MAIS qui convergent vers une seule spécialité : le design et le brainstorming de projets. Direction artistique, identité visuelle, game design, prototypage technique et scénarisation — chaque compétence sert un objectif commun : transformer vos idées en concepts solides à votre image et innovants.",technologies:["Direction Artistique","Conception","Stratégie Créative","Innovation","Vision Globale"]},{category:"services",longDescription:`Designer polyvalent, je travaille avec de nombreux logiciels pour donner vie à mes idées et créer des DA et designs adaptés à n'importe quel projet. Ma valeur ajoutée réside dans ma polyvalence — sans être un expert de chaque domaine — qui me permet de créer des prototypes précis facilement reprenables et améliorables.

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

Together, we won't create just another project. We'll create THE project that makes the difference.`,technologies:["Innovation","Strategic Creativity","Impact","Excellence","Difference"]}]}]},pm={1:{dark:"assets/images/Logo/logomodedark.svg",light:"assets/images/Logo/logomodelight.svg",scale:.7,opacity:1},2:{dark:"assets/images/Logo/logomodedark.svg",light:"assets/images/Logo/logomodelight.svg",scale:.7,opacity:1},3:{dark:"assets/images/Logo/DavinciLogoDark.svg",light:"assets/images/Logo/DavinciLogoLight.svg",scale:.7,opacity:1},4:{dark:"assets/images/Logo/MovieLogoDark.svg",light:"assets/images/Logo/MovieLogoLight.svg",scale:.7,opacity:1},5:{dark:"assets/images/Logo/IALogoDark.svg",light:"assets/images/Logo/IALogoLight.svg",scale:.7,opacity:1},6:{dark:"assets/images/Logo/DiscordLogoDark.svg",light:"assets/images/Logo/DiscordLogoLight.svg",scale:.7,opacity:1},7:{dark:"assets/images/Logo/AffinityLogoDark.svg",light:"assets/images/Logo/AffinityLogoLight.svg",scale:.7,opacity:1},8:{dark:"assets/images/Logo/SpineLogoDark.svg",light:"assets/images/Logo/SpineLogoLight.svg",scale:.7,opacity:1},9:{dark:"assets/images/Logo/logomodedark.svg",light:"assets/images/Logo/logomodelight.svg",scale:.7,opacity:1},10:{dark:"assets/images/Logo/logomodedark.svg",light:"assets/images/Logo/logomodelight.svg",scale:.7,opacity:1}},as={dark:"/assets/images/Logo/logomodedark.svg",light:"/assets/images/Logo/logomodelight.svg",scale:.7,opacity:1},mm={presentation:{fr:"Présentation",en:"Introduction"},services:{fr:"Services",en:"Services"},about:{fr:"À propos",en:"About"},dev:{fr:"Développement",en:"Development"},video:{fr:"Vidéo",en:"Video"},tech:{fr:"IA & technique",en:"AI & tech"},design:{fr:"Design",en:"Design"},gamedesign:{fr:"Game design",en:"Game design"},business:{fr:"Stratégie",en:"Strategy"}};function gm(s){return{github:(s==null?void 0:s.github)||null,demo:(s==null?void 0:s.demo)||null,video:(s==null?void 0:s.video)||null}}function _m(s,e,t,i){const n=e.category,r=mm[n]||{fr:n,en:t.category||n};return{id:s,categoryKey:n,categoryLabel:r,description:{fr:e.longDescription,en:t.longDescription},technologies:e.technologies.map((a,o)=>({fr:a,en:t.technologies[o]||a})),images:i.images?i.images.map(a=>`/${a}`):[],links:gm(i.links),featured:!!i.featured}}function vm(s){const t=pm[String(s)]||{};return{dark:t.dark?`/${t.dark}`:as.dark,light:t.light?`/${t.light}`:as.light,scale:typeof t.scale=="number"?t.scale:as.scale,opacity:typeof t.opacity=="number"?t.opacity:as.opacity}}const bo=fm,xm=xc.fr,ym=xc.en,Sm=bo.map((s,e)=>{const t=xm[e],i=ym[e],n=hm(e,bo.length),r=s.facettes.map((a,o)=>_m(o,t.facettes[o],i.facettes[o],a));return{id:`shard-${s.id}`,numericId:s.id,order:e,role:n,date:s.date,title:{fr:n==="hint"?"INDICE":t.title,en:n==="hint"?"HINT":i.title},logo:vm(s.id),facets:n==="hint"?[{...r[0],categoryKey:"hint",categoryLabel:{fr:"Indice",en:"Hint"},description:{fr:"Tous les fragments n’attendent pas le focus. Certains veulent retrouver une forme précise. Observe le X, puis ce point sous sa blessure centrale.",en:"Not every fragment wants focus. Some want to recover a precise form. Watch the X, then the dot below its central wound."},technologies:[{fr:"Mystère",en:"Mystery"},{fr:"Placement",en:"Placement"},{fr:"Transformation",en:"Transformation"},{fr:"Jeu caché",en:"Hidden game"},{fr:"Clé d’accès",en:"Access key"}]},{...r[1],categoryKey:"hint",categoryLabel:{fr:"Accès",en:"Access"},description:{fr:"Quand chaque shard rejoint son empreinte, le monde cesse d’être un portfolio et bascule vers une autre règle.",en:"When every shard reaches its imprint, the world stops being a portfolio and switches to another rule."},technologies:[{fr:"Pivot",en:"Pivot"},{fr:"Constellation",en:"Constellation"},{fr:"Déblocage",en:"Unlock"},{fr:"Momentum",en:"Momentum"},{fr:"Transition",en:"Transition"}]},{...r[2],categoryKey:"hint",categoryLabel:{fr:"Conseil",en:"Clue"},description:{fr:"Ne cherche pas un bouton. Replace les fragments. Le fil de lumière ne ment jamais.",en:"Do not search for a button. Put the fragments back into place. The line of light never lies."},technologies:[{fr:"Patience",en:"Patience"},{fr:"Lecture",en:"Reading"},{fr:"Exploration",en:"Exploration"},{fr:"Déverrouillage",en:"Unlocking"},{fr:"Secret",en:"Secret"}]}]:r}});class Mm{constructor(){M(this,"projects",Sm)}getProjects(){return this.projects}getProjectById(e){return this.projects.find(t=>t.id===e)||null}getProjectByOrder(e){return this.projects[e]||null}getProjectLabel(e,t){const i=this.getProjectById(e);return i?i.title[t]:""}getFacet(e,t){const i=this.getProjectById(e);return i&&i.facets[Math.max(0,Math.min(t,i.facets.length-1))]||null}getProjectIndex(e){return this.projects.findIndex(t=>t.id===e)}getProjectCount(){return this.projects.length}getLocalizedProjects(e){return this.projects.map(t=>({id:t.id,title:t.title[e],project:t}))}}const q=(s,e)=>({fr:s,en:e}),ye=s=>s;function Eo(){return{counts:{},ownedOrder:[],modifiers:yc()}}function yc(){return{glideFactor:0,landingTolerance:0,chargeRate:1,jumpPower:1,chargedLeapBonus:0,airControl:0,captureRadius:0,extraJumps:0,phaseJump:!1,phaseJumpRescueRadius:0,phaseJumpCooldown:20,teleportRange:0,teleportCooldown:30,warpRange:0,warpCooldown:24,rocketBurst:!1,rocketBurstCooldown:18,rocketBurstPower:0,airDashCharges:0,airDashPower:0,momentumRetention:0,infiniteFlaps:!1,momentumGain:0,momentumCap:1,shieldCharges:0,doubleCoin:!1,spikeOrbit:!1,coinMagnet:0,shopDiscount:0,speedBonus:0,coinBonus:0,luck:0,eventLuck:0,autoCannonLevel:0,enemyDamageBonus:0,timeSlowFactor:0,gravityInverter:!1,phantomLanding:!1,chaosWarp:!1,rareItemBias:0,extraCoinSlots:0,momentumRedirect:0}}const bm={common:q("Common","Common"),uncommon:q("Uncommon","Uncommon"),rare:q("Rare","Rare"),epic:q("Epic","Epic"),legendary:q("Legendary","Legendary")},Sc=[ye({id:"overdrive_core",icon:"OVC",rarity:"common",category:"momentum",unlockScore:0,stackable:!0,maxStacks:5,effects:["momentum_gain"],name:q("Overdrive Core","Overdrive Core"),description:q("Augmente le gain de momentum.","Increase momentum gain.")}),ye({id:"gyro_stabilizer",icon:"GYR",rarity:"common",category:"momentum",unlockScore:0,stackable:!0,maxStacks:4,effects:["momentum_decay_down"],name:q("Gyro Stabilizer","Gyro Stabilizer"),description:q("Le momentum retombe moins vite.","Momentum decays more slowly.")}),ye({id:"hyper_boost",icon:"HPB",rarity:"uncommon",category:"momentum",unlockScore:0,stackable:!0,maxStacks:3,effects:["speed_bonus","jump_bonus"],name:q("Hyper Boost","Hyper Boost"),description:q("Chaque chaîne réussie pousse plus loin.","Successful chains grant extra speed and jump power.")}),ye({id:"kinetic_engine",icon:"KIN",rarity:"uncommon",category:"momentum",unlockScore:0,stackable:!0,maxStacks:3,effects:["landing_tolerance","momentum_gain"],name:q("Kinetic Engine","Kinetic Engine"),description:q("Préserve mieux l’élan à l’atterrissage.","Preserve more speed on landing.")}),ye({id:"momentum_capacitor",icon:"CAP",rarity:"rare",category:"momentum",unlockScore:0,stackable:!0,maxStacks:3,effects:["momentum_cap"],name:q("Momentum Capacitor","Momentum Capacitor"),description:q("Augmente la capacité maximale de momentum.","Increase the maximum momentum gauge.")}),ye({id:"chain_amplifier",icon:"CHN",rarity:"rare",category:"momentum",unlockScore:0,stackable:!0,maxStacks:3,effects:["momentum_gain","charge_rate"],name:q("Chain Amplifier","Chain Amplifier"),description:q("Les enchaînements remplissent plus fort la jauge.","Chains fill the gauge more efficiently.")}),ye({id:"velocity_loop",icon:"VLP",rarity:"common",category:"momentum",unlockScore:0,stackable:!0,maxStacks:4,effects:["speed_bonus"],name:q("Velocity Loop","Velocity Loop"),description:q("Augmente légèrement la vitesse globale.","Light permanent speed increase.")}),ye({id:"gravity_skimmer",icon:"GSK",rarity:"uncommon",category:"momentum",unlockScore:0,stackable:!0,maxStacks:3,effects:["glide","momentum_decay_down"],name:q("Gravity Skimmer","Gravity Skimmer"),description:q("Conserve mieux la vitesse après une trajectoire faible.","Retain more speed after awkward landings.")}),ye({id:"turbo_reactor",icon:"TRB",rarity:"rare",category:"momentum",unlockScore:0,stackable:!1,maxStacks:1,effects:["rocket_burst"],name:q("Turbo Reactor","Turbo Reactor"),description:q("Déclenche des poussées sur les gros sauts.","Trigger a burst on high-energy launches.")}),ye({id:"speed_matrix",icon:"SPD",rarity:"common",category:"momentum",unlockScore:0,stackable:!0,maxStacks:4,effects:["speed_bonus"],name:q("Speed Matrix","Speed Matrix"),description:q("Accélère légèrement le run.","Permanent +10% run speed feel.")}),ye({id:"double_jump_module",icon:"DJP",rarity:"uncommon",category:"mobility",unlockScore:0,stackable:!1,maxStacks:1,effects:["extra_jump"],name:q("Double Jump Module","Double Jump Module"),description:q("Ajoute un saut en l’air.","Add one extra jump.")}),ye({id:"triple_jump_module",icon:"TJP",rarity:"epic",category:"mobility",unlockScore:50,stackable:!1,maxStacks:1,effects:["extra_jump_2"],name:q("Triple Jump Module","Triple Jump Module"),description:q("Ajoute deux sauts en l’air.","Add two extra jumps.")}),ye({id:"air_dash_thrusters",icon:"ADS",rarity:"rare",category:"mobility",unlockScore:0,stackable:!1,maxStacks:1,effects:["air_dash"],name:q("Air Dash Thrusters","Air Dash Thrusters"),description:q("Permet un dash aérien court.","Add one short airborne dash.")}),ye({id:"glide_wings",icon:"GLD",rarity:"common",category:"mobility",unlockScore:0,stackable:!0,maxStacks:4,effects:["glide"],name:q("Glide Wings","Glide Wings"),description:q("Réduit la chute en vol.","Reduce fall speed while airborne.")}),ye({id:"long_glide_core",icon:"LGC",rarity:"uncommon",category:"mobility",unlockScore:0,stackable:!0,maxStacks:3,effects:["glide"],name:q("Long Glide Core","Long Glide Core"),description:q("Glide beaucoup plus longtemps.","Make gliding significantly stronger.")}),ye({id:"magnetic_orbit",icon:"MGO",rarity:"uncommon",category:"mobility",unlockScore:0,stackable:!0,maxStacks:4,effects:["capture_radius"],name:q("Magnetic Orbit","Magnetic Orbit"),description:q("La capture des shards est plus facile.","Increase shard capture radius.")}),ye({id:"momentum_redirector",icon:"MRD",rarity:"common",category:"mobility",unlockScore:0,stackable:!0,maxStacks:4,effects:["air_control"],name:q("Momentum Redirector","Momentum Redirector"),description:q("Permet de corriger plus vite les angles.","Improve air control and redirect sharper.")}),ye({id:"teleport_pulse",icon:"TLP",rarity:"rare",category:"mobility",unlockScore:0,stackable:!1,maxStacks:1,effects:["teleport"],name:q("Teleport Pulse","Teleport Pulse"),description:q("Téléporte plus loin sur un long cooldown.","Teleport forward every 30 seconds.")}),ye({id:"warp_blink",icon:"WRP",rarity:"rare",category:"mobility",unlockScore:0,stackable:!1,maxStacks:1,effects:["warp"],name:q("Warp Blink","Warp Blink"),description:q("Ajoute un blink de secours plus court.","Add a shorter emergency warp.")}),ye({id:"anti_gravity_boots",icon:"AGB",rarity:"uncommon",category:"mobility",unlockScore:0,stackable:!0,maxStacks:3,effects:["jump_bonus","glide"],name:q("Anti-Gravity Boots","Anti-Gravity Boots"),description:q("Allège les sauts et adoucit la chute.","Lighten jumps and soften falling.")}),ye({id:"auto_cannon",icon:"CAN",rarity:"rare",category:"combat",unlockScore:20,stackable:!1,maxStacks:1,effects:["auto_fire"],name:q("Auto Cannon","Auto Cannon"),description:q("Tire automatiquement sur les ennemis proches.","Auto-fire at nearby enemies.")}),ye({id:"laser_turret",icon:"LSR",rarity:"epic",category:"combat",unlockScore:50,stackable:!1,maxStacks:1,effects:["auto_fire_plus"],name:q("Laser Turret","Laser Turret"),description:q("Renforce fortement les tirs automatiques.","Stronger automatic shots.")}),ye({id:"shockwave_landing",icon:"SHK",rarity:"rare",category:"combat",unlockScore:20,stackable:!0,maxStacks:2,effects:["landing_burst"],name:q("Shockwave Landing","Shockwave Landing"),description:q("Un atterrissage rapide nettoie les ennemis proches.","Strong landings clear nearby enemies.")}),ye({id:"impact_burst",icon:"IMP",rarity:"rare",category:"combat",unlockScore:20,stackable:!0,maxStacks:2,effects:["impact_bonus"],name:q("Impact Burst","Impact Burst"),description:q("Les frappes rapides deviennent létales.","Fast impacts deal lethal damage.")}),ye({id:"drone_companion",icon:"DRN",rarity:"epic",category:"combat",unlockScore:50,stackable:!1,maxStacks:1,effects:["auto_fire"],name:q("Drone Companion","Drone Companion"),description:q("Un drone ajoute une pression offensive constante.","A drone adds constant offensive pressure.")}),ye({id:"plasma_trail",icon:"PLS",rarity:"rare",category:"combat",unlockScore:20,stackable:!1,maxStacks:1,effects:["trail_damage"],name:q("Plasma Trail","Plasma Trail"),description:q("La traînée du joueur devient offensive.","Your trail damages enemies behind you.")}),ye({id:"spike_orbit",icon:"SPK",rarity:"uncommon",category:"combat",unlockScore:20,stackable:!1,maxStacks:1,effects:["orbit_damage"],name:q("Spike Orbit","Spike Orbit"),description:q("Tourner sur une shard devient dangereux pour les ennemis.","Orbiting around shards damages enemies on contact.")}),ye({id:"pulse_shield",icon:"SHD",rarity:"rare",category:"combat",unlockScore:20,stackable:!0,maxStacks:2,effects:["shield"],name:q("Pulse Shield","Pulse Shield"),description:q("Bloque un impact mortel.","Blocks one lethal collision.")}),ye({id:"emp_pulse",icon:"EMP",rarity:"epic",category:"combat",unlockScore:50,stackable:!1,maxStacks:1,effects:["emp"],name:q("EMP Pulse","EMP Pulse"),description:q("Neutralise brièvement les menaces proches.","Temporarily disable nearby enemies.")}),ye({id:"target_lock",icon:"TLK",rarity:"uncommon",category:"combat",unlockScore:20,stackable:!1,maxStacks:1,effects:["auto_fire_accuracy"],name:q("Target Lock","Target Lock"),description:q("Les tirs automatiques ratent moins.","Improve auto-fire accuracy.")}),ye({id:"coin_magnet",icon:"CNM",rarity:"common",category:"economy",unlockScore:0,stackable:!0,maxStacks:4,effects:["coin_magnet"],name:q("Coin Magnet","Coin Magnet"),description:q("Attire les pièces plus tôt sur l’orbite.","Pull coins toward the player sooner.")}),ye({id:"double_coin",icon:"DBL",rarity:"rare",category:"economy",unlockScore:0,stackable:!1,maxStacks:1,effects:["double_coin"],name:q("Double Coin","Double Coin"),description:q("Double les pièces gagnées.","Double all coin rewards.")}),ye({id:"lucky_shard",icon:"LCK",rarity:"uncommon",category:"economy",unlockScore:0,stackable:!0,maxStacks:3,effects:["luck"],name:q("Lucky Shard","Lucky Shard"),description:q("Augmente légèrement la richesse des runs.","Increase general loot luck.")}),ye({id:"treasure_scanner",icon:"TRS",rarity:"uncommon",category:"economy",unlockScore:0,stackable:!0,maxStacks:3,effects:["event_luck"],name:q("Treasure Scanner","Treasure Scanner"),description:q("Augmente la fréquence des événements utiles.","Increase valuable event odds.")}),ye({id:"market_discount",icon:"MKT",rarity:"uncommon",category:"economy",unlockScore:0,stackable:!0,maxStacks:3,effects:["shop_discount"],name:q("Market Discount","Market Discount"),description:q("Réduit les prix du shop.","Lower shop prices.")}),ye({id:"loot_booster",icon:"LBT",rarity:"rare",category:"economy",unlockScore:0,stackable:!0,maxStacks:3,effects:["coin_bonus"],name:q("Loot Booster","Loot Booster"),description:q("Chaque gain donne plus de ressources.","Increase resource payouts.")}),ye({id:"golden_orbit",icon:"GLD",rarity:"rare",category:"economy",unlockScore:0,stackable:!0,maxStacks:2,effects:["extra_coin_slots"],name:q("Golden Orbit","Golden Orbit"),description:q("Ajoute plus de pièces sur les trajectoires.","Spawn more coins on orbit paths.")}),ye({id:"jackpot_engine",icon:"JPT",rarity:"epic",category:"economy",unlockScore:50,stackable:!1,maxStacks:1,effects:["coin_bonus","luck"],name:q("Jackpot Engine","Jackpot Engine"),description:q("Les gains rares deviennent plus lucratifs.","Rare drops pay out harder.")}),ye({id:"rare_item_finder",icon:"RRF",rarity:"epic",category:"economy",unlockScore:50,stackable:!0,maxStacks:2,effects:["rare_item_bias"],name:q("Rare Item Finder","Rare Item Finder"),description:q("Pousse les offres vers de meilleures raretés.","Bias future offers toward higher rarity.")}),ye({id:"coin_storm",icon:"CST",rarity:"legendary",category:"economy",unlockScore:100,stackable:!1,maxStacks:1,effects:["coin_bonus","extra_coin_slots"],name:q("Coin Storm","Coin Storm"),description:q("Déverse une pluie de pièces dans le run.","Flood the run with extra coin value.")}),ye({id:"chaos_warp",icon:"CHW",rarity:"rare",category:"utility",unlockScore:50,stackable:!1,maxStacks:1,effects:["chaos_warp"],name:q("Chaos Warp","Chaos Warp"),description:q("Ajoute un warp imprévisible mais salvateur.","Add a risky emergency warp.")}),ye({id:"shard_splitter",icon:"SPL",rarity:"uncommon",category:"utility",unlockScore:50,stackable:!0,maxStacks:2,effects:["extra_coin_slots","event_luck"],name:q("Shard Splitter","Shard Splitter"),description:q("Multiplie les possibilités sur certaines sections.","Occasionally create richer shard sections.")}),ye({id:"phase_walk",icon:"PHS",rarity:"rare",category:"utility",unlockScore:50,stackable:!1,maxStacks:1,effects:["phase_jump"],name:q("Phase Walk","Phase Walk"),description:q("Permet de sauver une capture ratée.","Pass through one missed landing on cooldown.")}),ye({id:"time_slow_field",icon:"TSF",rarity:"epic",category:"utility",unlockScore:50,stackable:!1,maxStacks:1,effects:["time_slow"],name:q("Time Slow Field","Time Slow Field"),description:q("Ralentit légèrement la pression globale.","Slightly slow the world around you.")}),ye({id:"mirror_momentum",icon:"MMR",rarity:"rare",category:"utility",unlockScore:50,stackable:!0,maxStacks:2,effects:["momentum_gain","momentum_cap"],name:q("Mirror Momentum","Mirror Momentum"),description:q("Amplifie la jauge quand le flow est propre.","Amplify gauge growth during clean flow.")}),ye({id:"overclock_core",icon:"OCK",rarity:"epic",category:"utility",unlockScore:50,stackable:!1,maxStacks:1,effects:["charge_rate","speed_bonus"],name:q("Overclock Core","Overclock Core"),description:q("Charge plus vite et accélère tout le run.","Charge faster and push the whole run faster.")}),ye({id:"gravity_inverter",icon:"GIV",rarity:"legendary",category:"utility",unlockScore:100,stackable:!1,maxStacks:1,effects:["gravity_invert"],name:q("Gravity Inverter","Gravity Inverter"),description:q("Inverse certains comportements de chute en votre faveur.","Invert some falling pressure in your favor.")}),ye({id:"phantom_landing",icon:"PHN",rarity:"rare",category:"utility",unlockScore:50,stackable:!0,maxStacks:2,effects:["phase_jump","landing_tolerance"],name:q("Phantom Landing","Phantom Landing"),description:q("Ajoute une fenêtre fantôme de rattrapage.","Create a ghost landing rescue window.")}),ye({id:"energy_shield",icon:"ENG",rarity:"epic",category:"utility",unlockScore:50,stackable:!0,maxStacks:2,effects:["shield"],name:q("Energy Shield","Energy Shield"),description:q("Ajoute plusieurs charges de protection.","Grant multiple protection charges.")}),ye({id:"orbital_wings",icon:"WNG",rarity:"legendary",category:"utility",unlockScore:100,stackable:!1,maxStacks:1,effects:["infinite_flap","glide"],name:q("Orbital Wings","Orbital Wings"),description:q("Le vol devient presque libre.","Almost remove airborne limitations.")})],os={common:56,uncommon:28,rare:11,epic:4,legendary:1};function Em(s){return s<50?["common","uncommon","rare"]:s<100?["common","uncommon","rare","epic"]:["common","uncommon","rare","epic","legendary"]}function To(s){return s===10||s===50||s===100||s>100&&s%100===0}function hs(s,e,t=Math.random){const i=new Set(Em(s)),n=Sc.filter(o=>{if(!i.has(o.rarity)||s<o.unlockScore)return!1;const c=e.counts[o.id]??0;return!(!o.stackable&&c>0||o.stackable&&c>=o.maxStacks)}),r=[],a=new Set;for(;r.length<3&&a.size<n.length;){const o=Tm(n,t,a,e.modifiers.rareItemBias);if(!o)break;a.add(o.id),r.push({item:o,stackCount:e.counts[o.id]??0})}return r}function Tm(s,e,t,i){const n=s.filter(o=>!t.has(o.id));if(n.length===0)return null;const r=n.reduce((o,c)=>o+Ao(c.rarity,i),0);let a=e()*r;for(const o of n)if(a-=Ao(o.rarity,i),a<=0)return o;return n[n.length-1]??null}function Ao(s,e){const t=Math.max(0,e);return s==="legendary"?os[s]*(1+t*4):s==="epic"?os[s]*(1+t*2.5):s==="rare"?os[s]*(1+t):os[s]}function Am(s,e){const t={...s.counts,[e]:(s.counts[e]??0)+1},i=s.ownedOrder.includes(e)?s.ownedOrder:[...s.ownedOrder,e],n={counts:t,ownedOrder:i,modifiers:yc()};for(const r of Sc){const a=t[r.id]??0;if(!(a<=0))switch(r.id){case"overdrive_core":n.modifiers.momentumGain+=.1*a;break;case"gyro_stabilizer":n.modifiers.momentumRetention+=.08*a;break;case"hyper_boost":n.modifiers.speedBonus+=.08*a,n.modifiers.jumpPower+=.06*a;break;case"kinetic_engine":n.modifiers.landingTolerance+=.12*a,n.modifiers.momentumGain+=.05*a;break;case"momentum_capacitor":n.modifiers.momentumCap+=.08*a;break;case"chain_amplifier":n.modifiers.momentumGain+=.06*a,n.modifiers.chargeRate+=.08*a;break;case"velocity_loop":n.modifiers.speedBonus+=.05*a;break;case"gravity_skimmer":n.modifiers.glideFactor+=.16*a,n.modifiers.momentumRetention+=.04*a;break;case"turbo_reactor":n.modifiers.rocketBurst=!0,n.modifiers.rocketBurstPower=5.4,n.modifiers.rocketBurstCooldown=16;break;case"speed_matrix":n.modifiers.speedBonus+=.1*a;break;case"double_jump_module":n.modifiers.extraJumps=Math.max(n.modifiers.extraJumps,1);break;case"triple_jump_module":n.modifiers.extraJumps=Math.max(n.modifiers.extraJumps,2);break;case"air_dash_thrusters":n.modifiers.airDashCharges=Math.max(n.modifiers.airDashCharges,1),n.modifiers.airDashPower=4.8;break;case"glide_wings":n.modifiers.glideFactor+=.2*a;break;case"long_glide_core":n.modifiers.glideFactor+=.34*a;break;case"magnetic_orbit":n.modifiers.captureRadius+=.12*a;break;case"momentum_redirector":n.modifiers.airControl+=.12*a,n.modifiers.momentumRedirect+=.1*a;break;case"teleport_pulse":n.modifiers.teleportRange=10,n.modifiers.teleportCooldown=30;break;case"warp_blink":n.modifiers.warpRange=6,n.modifiers.warpCooldown=20;break;case"anti_gravity_boots":n.modifiers.glideFactor+=.12*a,n.modifiers.jumpPower+=.05*a;break;case"auto_cannon":n.modifiers.autoCannonLevel=Math.max(n.modifiers.autoCannonLevel,1);break;case"laser_turret":n.modifiers.autoCannonLevel=Math.max(n.modifiers.autoCannonLevel,2),n.modifiers.enemyDamageBonus+=1;break;case"shockwave_landing":n.modifiers.enemyDamageBonus+=.5*a;break;case"impact_burst":n.modifiers.enemyDamageBonus+=.6*a;break;case"drone_companion":n.modifiers.autoCannonLevel=Math.max(n.modifiers.autoCannonLevel,1),n.modifiers.enemyDamageBonus+=.4;break;case"plasma_trail":n.modifiers.enemyDamageBonus+=.35;break;case"spike_orbit":n.modifiers.spikeOrbit=!0;break;case"pulse_shield":n.modifiers.shieldCharges+=1;break;case"emp_pulse":n.modifiers.enemyDamageBonus+=.8;break;case"target_lock":n.modifiers.autoCannonLevel=Math.max(n.modifiers.autoCannonLevel,1);break;case"coin_magnet":n.modifiers.coinMagnet+=.18*a;break;case"double_coin":n.modifiers.doubleCoin=!0;break;case"lucky_shard":n.modifiers.luck+=.1*a;break;case"treasure_scanner":n.modifiers.eventLuck+=.1*a;break;case"market_discount":n.modifiers.shopDiscount+=.12*a;break;case"loot_booster":n.modifiers.coinBonus+=.15*a;break;case"golden_orbit":n.modifiers.extraCoinSlots+=a;break;case"jackpot_engine":n.modifiers.coinBonus+=.28,n.modifiers.luck+=.12;break;case"rare_item_finder":n.modifiers.rareItemBias+=.12*a;break;case"coin_storm":n.modifiers.coinBonus+=.35,n.modifiers.extraCoinSlots+=2;break;case"chaos_warp":n.modifiers.chaosWarp=!0,n.modifiers.warpRange=Math.max(n.modifiers.warpRange,12);break;case"shard_splitter":n.modifiers.extraCoinSlots+=a,n.modifiers.eventLuck+=.06*a;break;case"phase_walk":n.modifiers.phaseJump=!0,n.modifiers.phaseJumpRescueRadius=2.8,n.modifiers.phaseJumpCooldown=18;break;case"time_slow_field":n.modifiers.timeSlowFactor+=.12;break;case"mirror_momentum":n.modifiers.momentumGain+=.12*a,n.modifiers.momentumCap+=.06*a;break;case"overclock_core":n.modifiers.chargeRate+=.28,n.modifiers.speedBonus+=.12;break;case"gravity_inverter":n.modifiers.gravityInverter=!0,n.modifiers.glideFactor+=.2;break;case"phantom_landing":n.modifiers.phaseJump=!0,n.modifiers.phaseJumpRescueRadius=2.2,n.modifiers.landingTolerance+=.14*a,n.modifiers.phantomLanding=!0;break;case"energy_shield":n.modifiers.shieldCharges+=2*a;break;case"orbital_wings":n.modifiers.infiniteFlaps=!0,n.modifiers.glideFactor+=.8;break}}return n.modifiers.glideFactor=Math.min(1.9,n.modifiers.glideFactor),n.modifiers.captureRadius=Math.min(1.25,n.modifiers.captureRadius),n.modifiers.airControl=Math.min(.85,n.modifiers.airControl),n.modifiers.jumpPower=Math.min(1.9,n.modifiers.jumpPower),n.modifiers.chargeRate=Math.min(2.4,n.modifiers.chargeRate),n.modifiers.chargedLeapBonus=Math.min(.8,n.modifiers.chargedLeapBonus),n.modifiers.momentumRetention=Math.min(.72,n.modifiers.momentumRetention),n.modifiers.momentumGain=Math.min(1.2,n.modifiers.momentumGain),n.modifiers.momentumCap=Math.min(1.8,n.modifiers.momentumCap),n.modifiers.coinMagnet=Math.min(.9,n.modifiers.coinMagnet),n.modifiers.shopDiscount=Math.min(.45,n.modifiers.shopDiscount),n.modifiers.speedBonus=Math.min(.9,n.modifiers.speedBonus),n.modifiers.coinBonus=Math.min(1.2,n.modifiers.coinBonus),n.modifiers.luck=Math.min(.8,n.modifiers.luck),n.modifiers.eventLuck=Math.min(.6,n.modifiers.eventLuck),n.modifiers.timeSlowFactor=Math.min(.35,n.modifiers.timeSlowFactor),n.modifiers.rareItemBias=Math.min(.5,n.modifiers.rareItemBias),n}class wm{constructor(e,t,i){M(this,"element");M(this,"panel");M(this,"scoreLabel");M(this,"highscoreLabel");M(this,"chargeLabel");M(this,"chainLabel");M(this,"distanceLabel");M(this,"coinsLabel");M(this,"scoreValue");M(this,"highscoreValue");M(this,"chainValue");M(this,"distanceValue");M(this,"coinsValue");M(this,"chargeFill");M(this,"statusValue");M(this,"metaValue");M(this,"exitButton");M(this,"branchLayer");M(this,"branchTitle");M(this,"branchHint");M(this,"branchCards");M(this,"toast");M(this,"toastLabel");M(this,"toastName");M(this,"gameOverOverlay");M(this,"gameOverTitle");M(this,"gameOverBody");M(this,"restartButton");M(this,"returnButton");this.i18n=t,this.element=document.createElement("div"),this.element.className="game-hud",this.element.innerHTML=`
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
    `,this.panel=this.element.querySelector(".game-hud__panel"),this.scoreLabel=this.element.querySelector("[data-score-label]"),this.highscoreLabel=this.element.querySelector("[data-highscore-label]"),this.chargeLabel=this.element.querySelector("[data-charge-label]"),this.chainLabel=this.element.querySelector("[data-chain-label]"),this.distanceLabel=this.element.querySelector("[data-distance-label]"),this.coinsLabel=this.element.querySelector("[data-coins-label]"),this.scoreValue=this.element.querySelector("[data-score]"),this.highscoreValue=this.element.querySelector("[data-highscore]"),this.chainValue=this.element.querySelector("[data-chain]"),this.distanceValue=this.element.querySelector("[data-distance]"),this.coinsValue=this.element.querySelector("[data-coins]"),this.chargeFill=this.element.querySelector("[data-charge-fill]"),this.statusValue=this.element.querySelector(".game-hud__status"),this.metaValue=this.element.querySelector(".game-hud__meta"),this.exitButton=this.element.querySelector("[data-exit]"),this.branchLayer=this.element.querySelector(".game-hud__branch-layer"),this.branchTitle=this.element.querySelector("[data-upgrade-title]"),this.branchHint=this.element.querySelector("[data-upgrade-hint]"),this.branchCards=Array.from(this.element.querySelectorAll("[data-branch-card]")),this.toast=this.element.querySelector(".game-hud__toast"),this.toastLabel=this.element.querySelector("[data-toast-label]"),this.toastName=this.element.querySelector("[data-toast-name]"),this.gameOverOverlay=this.element.querySelector(".game-hud__game-over"),this.gameOverTitle=this.element.querySelector("[data-game-over-title]"),this.gameOverBody=this.element.querySelector("[data-game-over-body]"),this.restartButton=this.element.querySelector("[data-restart]"),this.returnButton=this.element.querySelector("[data-return]"),this.exitButton.addEventListener("click",i.onExit),this.restartButton.addEventListener("click",i.onRestart),this.returnButton.addEventListener("click",i.onExit),e.appendChild(this.element),this.i18n.onChange(()=>this.renderStatic()),this.renderStatic()}setVisible(e){this.element.classList.toggle("is-visible",e)}update(e){this.scoreValue.textContent=String(e.score),this.highscoreValue.textContent=String(e.highscore),this.distanceValue.textContent=`${Math.round(e.distanceMeters)}m`,this.coinsValue.textContent=String(e.coins),this.chainValue.textContent=`${Math.round(e.momentumGauge*100)}%`,this.chainValue.style.opacity=`${.58+e.momentumGauge*.42}`,this.chargeFill.style.setProperty("--charge-ratio",e.chargeRatio.toFixed(3));const t=this.element.querySelector("[data-charge-value]");t&&(t.textContent=`${Math.round(e.chargeRatio*100)}%`),this.statusValue.textContent=e.state==="transition"?this.i18n.t("gameStatusTransition"):e.state==="running"?this.i18n.t("gameStatusRunning"):e.state==="upgrade_choice"?this.i18n.t("gameStatusUpgrade"):this.i18n.t("gameStatusGameOver"),this.metaValue.textContent=this.renderMeta(e);const i=e.branchHints.some(n=>n.mode==="shop_orbit");this.branchTitle.textContent=i?this.i18n.t("gameShopTitle"):this.i18n.t("gameUpgradeTitle"),this.branchHint.textContent=i?this.i18n.t("gameShopHint"):this.i18n.t("gameUpgradeHint"),this.panel.classList.toggle("is-hidden",e.state==="game_over"),this.branchLayer.classList.toggle("is-visible",e.state==="upgrade_choice"),this.gameOverOverlay.classList.toggle("is-visible",e.state==="game_over"),this.toast.classList.toggle("is-visible",!!e.acquisition),e.acquisition&&(this.toast.style.setProperty("--toast-progress",e.acquisition.progress.toFixed(3)),this.toastName.textContent=e.acquisition.offer.item.name[this.i18n.current]),this.renderBranchHints(e.branchHints)}renderStatic(){this.scoreLabel.textContent=this.i18n.t("gameScore"),this.highscoreLabel.textContent=this.i18n.t("gameBest"),this.chargeLabel.textContent=this.i18n.t("gameCharge"),this.chainLabel.textContent=this.i18n.t("gameMomentum"),this.distanceLabel.textContent=this.i18n.t("gameDistance"),this.coinsLabel.textContent=this.i18n.t("gameCoins"),this.exitButton.textContent=this.i18n.t("gamePortfolio"),this.branchTitle.textContent=this.i18n.t("gameUpgradeTitle"),this.branchHint.textContent=this.i18n.t("gameUpgradeHint"),this.toastLabel.textContent=this.i18n.t("gameAcquired"),this.gameOverTitle.textContent=this.i18n.t("gameOverTitle"),this.gameOverBody.textContent=this.i18n.t("gameOverBody"),this.restartButton.textContent=this.i18n.t("gameRestart"),this.returnButton.textContent=this.i18n.t("gamePortfolio")}renderBranchHints(e){this.branchCards.forEach((t,i)=>{const n=e[i];if(!n){t.hidden=!0;return}t.hidden=!1,t.dataset.rarity=n.offer.item.rarity;const r=n.mode==="shop_orbit"?this.i18n.t("gameShopOffer"):i===0?this.i18n.t("gamePathUpper"):i===1?this.i18n.t("gamePathForward"):this.i18n.t("gamePathLower");t.style.transform=`translate(${n.screenX}px, ${n.screenY}px)`,t.innerHTML=`
        <span class="game-hud__upgrade-icon">${n.offer.item.icon}</span>
        <span class="game-hud__upgrade-rarity">${this.getRarityLabel(n.offer.item.rarity)}</span>
        <span class="game-hud__upgrade-path-label">${r}</span>
        <strong class="game-hud__upgrade-path-name">${n.offer.item.name[this.i18n.current]}</strong>
        <span class="game-hud__upgrade-path-desc">${n.offer.item.description[this.i18n.current]}</span>
        ${n.price!==void 0?`<span class="game-hud__upgrade-price">${this.i18n.t("gamePrice")}: ${n.price}</span>`:""}
      `})}renderMeta(e){const t=[10,50,100].map(i=>{const n=e.splitTimes[i];return n===void 0?null:`${i}: ${n.toFixed(1)}s`}).filter(Boolean).join(" • ");return t?`${this.i18n.t("gameSplits")}: ${t}`:`${this.i18n.t("gameBestDistance")}: ${Math.round(e.bestDistanceMeters)}m`}getRarityLabel(e){return bm[e][this.i18n.current]}}function lt(s,e,t){return Math.min(t,Math.max(e,s))}function De(s,e,t,i){return s+(e-s)*(1-Math.exp(-t*i))}function wo(s,e){const t=s.x-e.x,i=s.y-e.y,n=s.z-e.z;return Math.sqrt(t*t+i*i+n*n)}function us(s,e){return(s%e+e)%e}function kt(s){const e=lt(s/200,0,1),t=s<50?"easy":s<100?"medium":s<160?"hard":"expert";return{normalized:e,band:t,spacing:11.8+e*8.8,movementAmplitude:.08+e*1.05,movementSpeed:.22+e*.88,cameraSpeed:1.45+e*2.85,cameraCatchupSpeed:2.6+e*2.2,maxJumpDistance:18.4+e*9.6,maxVerticalDelta:5.2+e*3.8,safeZoneDistance:8.6+e*1.8,cameraLookAhead:6.6+e*3.9,baseZoom:16.5,largeShardZoom:5.5,milestoneZoom:18,momentumZoomRange:10.5,enemyUnlocked:s>=20,ovalUnlocked:s>=50,triangularUnlocked:s>=100,roundMovementUnlocked:s>=5,eventChance:s<12?0:s<60?.08:s<120?.14:.18,movingShardChance:s<5?0:s<50?.12:s<100?.2:.3}}class Pm{constructor(){M(this,"position",new C);M(this,"lookAt",new C);M(this,"currentFocus",new ve);M(this,"targetFocus",new ve);M(this,"currentZoom",16.5);M(this,"targetZoom",16.5);M(this,"railX",-12);M(this,"safeLeft",-1/0);M(this,"fov",42)}reset(e){this.railX=e.resolvedX-2.4,this.currentFocus.set(e.resolvedX,e.resolvedY),this.targetFocus.copy(this.currentFocus),this.currentZoom=16.5,this.targetZoom=16.5,this.position.set(e.resolvedX,e.resolvedY+.24,this.currentZoom),this.lookAt.set(e.resolvedX+1.8,e.resolvedY,0),this.safeLeft=-1/0}update(e){const{deltaTime:t,state:i,score:n,currentNode:r,nextNode:a,playerPosition:o,momentumGauge:c,largeShardFactor:l,milestoneZoom:h,choiceZoom:u,bossZoom:f,speedPressure:m}=e,g=kt(n);(i==="running_attached"||i==="running_charging"||i==="running_airborne")&&(this.railX+=g.cameraSpeed*m*t);const d=o.x>this.currentFocus.x?Math.max(this.railX+g.cameraLookAhead,o.x):Math.max(this.railX+g.cameraLookAhead,r.resolvedX+1.1),b=o.y*.42+r.resolvedY*.34+a.resolvedY*.24;this.targetFocus.set(d,b),this.currentFocus.x=De(this.currentFocus.x,this.targetFocus.x,2.4,t),this.currentFocus.y=De(this.currentFocus.y,this.targetFocus.y,2.8,t),this.targetZoom=g.baseZoom+g.momentumZoomRange*c+g.largeShardZoom*l+h+u+f,this.currentZoom=De(this.currentZoom,this.targetZoom,i==="upgrade_branching"?1.7:2.2,t),this.position.set(this.currentFocus.x,this.currentFocus.y+.3,this.currentZoom),this.lookAt.set(this.currentFocus.x+1.8,this.currentFocus.y,0);const x=Math.max(.5,window.innerWidth/Math.max(1,window.innerHeight)),L=Math.tan(mi.degToRad(this.fov*.5))*this.currentZoom*x;this.safeLeft=this.lookAt.x-L*.96}isBehindSafeLine(e){return e.x<this.safeLeft}isOutsideViewport(e,t=.04){const i=Math.max(.5,window.innerWidth/Math.max(1,window.innerHeight)),n=Math.tan(mi.degToRad(this.fov*.5))*this.currentZoom,r=n*i,a=this.lookAt.x-r*(1-t),o=this.lookAt.x+r*(1-t),c=this.lookAt.y-n*(1-t),l=this.lookAt.y+n*(1-t);return e.x<=a||e.x>=o||e.y<=c||e.y>=l}getPose(){return{position:this.position.clone(),lookAt:this.lookAt.clone()}}getZoom(){return this.currentZoom}getSafeLeft(){return this.safeLeft}}const Po="#D9624E";class Cm{constructor(e,t){M(this,"group",new Gt);M(this,"pool",[]);const i=new Se(Po);for(let n=0;n<36;n+=1){const r=new _t(new Ur(.22,.08,8,18),new ei({color:i,transparent:!0,opacity:.96}));r.visible=!1,this.pool.push(r),this.group.add(r)}this.group.visible=!1,e.add(this.group),this.setTheme(t)}setTheme(e){const t=e==="dark"?new Se(Po):new Se("#8B3E34");this.pool.forEach(i=>i.material.color.copy(t))}setVisible(e){this.group.visible=e}reset(){this.pool.forEach(e=>{e.visible=!1})}update(e,t){this.pool.forEach((i,n)=>{const r=e[n];if(!r||!r.visible){i.visible=!1;return}i.visible=!0,i.position.copy(r.position),i.rotation.x=Math.PI*.5,i.rotation.y=t*1.8+n*.24,i.scale.setScalar(r.scale*(1+Math.sin(t*4+n)*.08))})}}function Co(s,e){return e==="invincible"?new Se("#F06A5A"):e==="elite"?new Se(s==="dark"?"#E18C70":"#A14D38"):e==="armored"?new Se(s==="dark"?"#C9775B":"#8E4130"):new Se(s==="dark"?"#D4BF9B":"#393F4A")}class Rm{constructor(e,t){M(this,"group",new Gt);M(this,"pool",[]);M(this,"theme");this.theme=t;for(let i=0;i<18;i+=1){const n=new _t(new As(.38,0),new ei({color:Co(t,"light"),transparent:!0,opacity:.95}));n.visible=!1,this.pool.push(n),this.group.add(n)}this.group.visible=!1,e.add(this.group)}setTheme(e){this.theme=e}setVisible(e){this.group.visible=e}reset(){this.pool.forEach(e=>{e.visible=!1})}update(e,t){this.pool.forEach((i,n)=>{const r=e[n];if(!r||!r.visible){i.visible=!1;return}i.visible=!0,i.material.color.copy(Co(this.theme,r.tier)),i.position.copy(r.position),i.rotation.y=t*.8+n*.18;const a=r.tier==="elite"?1.16:r.tier==="armored"?1.04:r.tier==="invincible"?1.24:.92;i.scale.setScalar(a)})}}const Ro=["shop","treasure","gift","mini_boss","rare_item"];class Lm{constructor(){M(this,"queuedEvents",new Map);M(this,"bossConsumed",!1)}reset(){this.queuedEvents.clear(),this.bossConsumed=!1}schedulePostMilestoneEvents(e,t,i){const n=kt(t),r=i()<n.eventChance?i()<.42?2:1:0;for(let a=0;a<r;a+=1){const o=e+10+Math.floor(i()*11)+a*3;if(this.queuedEvents.has(o))continue;const c=Ro[Math.floor(i()*Ro.length)]??"gift";this.queuedEvents.set(o,c)}}consumePlannedEvent(e,t){if(!this.bossConsumed&&t>=150&&e>=150)return this.bossConsumed=!0,"boss";const i=this.queuedEvents.get(e);return i?(this.queuedEvents.delete(e),i):"none"}}const Dm=["shop","treasure","gift","mini_boss","rare_item"],Kt=["round"],Zt=["round","oval"],Jt=["round","oval","triangular"];function qe(s,e,t,i,n,r,a){return{id:s,difficulty:e,verticality:t,movementType:i,allowedShardSizes:n,allowedShapeKinds:r,eventCompatibility:Dm,nodes:a}}const Lo=[qe("easy_01","easy","low","static",["tiny","very_small","small","medium_small"],Kt,[{x:10,y:1,coinAngles:[Math.PI*.5]},{x:21,y:-1},{x:33,y:2,enemyPole:"north"},{x:46,y:0,coinAngles:[Math.PI*1.35]}]),qe("easy_02","easy","medium","static",["tiny","small","medium_small","medium"],Kt,[{x:9,y:3},{x:20,y:5,coinAngles:[Math.PI*.25]},{x:33,y:2},{x:47,y:-1,enemyPole:"south"}]),qe("easy_03","easy","medium","moving",["very_small","small","medium_small"],Kt,[{x:11,y:-3,motionPattern:"vertical"},{x:22,y:1},{x:34,y:4,coinAngles:[Math.PI*.75]},{x:47,y:2,motionPattern:"horizontal"}]),qe("easy_04","easy","low","moving",["tiny","very_small","small"],Kt,[{x:8,y:2},{x:18,y:-1,motionPattern:"drift"},{x:30,y:0},{x:43,y:3,coinAngles:[Math.PI*1.75]}]),qe("easy_05","easy","high","static",["small","medium_small","medium"],Kt,[{x:10,y:5},{x:20,y:8},{x:31,y:4,enemyPole:"north"},{x:44,y:1}]),qe("easy_06","easy","high","moving",["very_small","small","medium_small"],Kt,[{x:10,y:-4,motionPattern:"vertical"},{x:21,y:-7,coinAngles:[Math.PI*.9]},{x:33,y:-3,motionPattern:"micro_orbit"},{x:45,y:1}]),qe("easy_07","easy","medium","static",["small","medium_small","medium"],Kt,[{x:11,y:1},{x:23,y:6},{x:36,y:5},{x:50,y:0,coinAngles:[Math.PI*.4],enemyPole:"south"}]),qe("easy_08","easy","medium","moving",["tiny","very_small","small","medium_small"],Kt,[{x:9,y:-2,motionPattern:"horizontal"},{x:19,y:1},{x:31,y:-3,coinAngles:[Math.PI*1.1]},{x:43,y:2,motionPattern:"vertical"}]),qe("easy_09","easy","low","static",["small","medium_small","medium"],Kt,[{x:12,y:0},{x:25,y:2},{x:39,y:-2,enemyPole:"north"},{x:54,y:1}]),qe("easy_10","easy","medium","moving",["tiny","very_small","small"],Kt,[{x:10,y:4,motionPattern:"vertical"},{x:21,y:1},{x:33,y:-2,coinAngles:[Math.PI*.6]},{x:46,y:-5,motionPattern:"drift"}]),qe("medium_01","medium","medium","moving",["small","medium_small","medium","medium_large"],Zt,[{x:12,y:5,motionPattern:"vertical"},{x:25,y:2,sizeTier:"medium"},{x:39,y:8,coinAngles:[Math.PI*.2],enemyPole:"north"},{x:54,y:4,motionPattern:"horizontal"},{x:69,y:1}]),qe("medium_02","medium","high","moving",["small","medium_small","medium","medium_large"],Zt,[{x:13,y:-6},{x:27,y:-2,motionPattern:"drift"},{x:40,y:4,sizeTier:"medium_large"},{x:55,y:8,coinAngles:[Math.PI*1.5]},{x:71,y:3,enemyPole:"south"}]),qe("medium_03","medium","medium","static",["very_small","small","medium_small","medium"],Zt,[{x:11,y:3,sizeTier:"small"},{x:23,y:-1,sizeTier:"medium_small"},{x:36,y:5,sizeTier:"very_large",coinAngles:[Math.PI*.95]},{x:52,y:1,sizeTier:"small"}]),qe("medium_04","medium","high","moving",["very_small","small","medium_small","medium_large"],Zt,[{x:12,y:7,motionPattern:"vertical"},{x:26,y:2},{x:40,y:-4,motionPattern:"micro_orbit"},{x:54,y:-8,enemyPole:"north"},{x:70,y:-2,coinAngles:[Math.PI*.4]}]),qe("medium_05","medium","medium","moving",["small","medium_small","medium","large"],Zt,[{x:12,y:1},{x:24,y:6,motionPattern:"horizontal"},{x:39,y:1,sizeTier:"large"},{x:55,y:-3,coinAngles:[Math.PI*1.2]},{x:71,y:2}]),qe("medium_06","medium","high","moving",["tiny","small","medium_small","medium"],Zt,[{x:10,y:-5,sizeTier:"tiny"},{x:22,y:3,motionPattern:"drift"},{x:36,y:9,sizeTier:"medium_large",coinAngles:[Math.PI*.1]},{x:52,y:5},{x:68,y:-1,enemyPole:"south"}]),qe("medium_07","medium","medium","static",["small","medium_small","medium","medium_large"],Zt,[{x:13,y:-2},{x:28,y:4,sizeTier:"medium_large"},{x:43,y:7,sizeTier:"medium"},{x:58,y:1,coinAngles:[Math.PI*.65]},{x:74,y:-2}]),qe("medium_08","medium","high","moving",["small","medium_small","medium","large"],Zt,[{x:12,y:6,motionPattern:"vertical"},{x:26,y:-2},{x:40,y:-8,motionPattern:"horizontal"},{x:56,y:-3,sizeTier:"large",enemyPole:"north"},{x:72,y:4,coinAngles:[Math.PI*1.4]}]),qe("medium_09","medium","medium","moving",["very_small","small","medium_small","medium"],Zt,[{x:11,y:2,sizeTier:"very_small"},{x:24,y:8,motionPattern:"drift"},{x:40,y:4},{x:56,y:-1,enemyPole:"south"},{x:72,y:3,coinAngles:[Math.PI*.5]}]),qe("medium_10","medium","high","moving",["small","medium_small","medium","very_large"],Zt,[{x:12,y:-7,motionPattern:"vertical"},{x:27,y:-1,sizeTier:"small"},{x:42,y:6,sizeTier:"very_large"},{x:58,y:9,coinAngles:[Math.PI*.3],enemyPole:"north"},{x:76,y:2}]),qe("hard_01","hard","high","moving",["small","medium_small","medium","large","very_large"],Jt,[{x:14,y:7,motionPattern:"vertical"},{x:31,y:0,sizeTier:"large"},{x:48,y:-8,motionPattern:"micro_orbit",enemyPole:"north"},{x:66,y:-1,coinAngles:[Math.PI*1.5]},{x:86,y:6,sizeTier:"very_large"}]),qe("hard_02","hard","high","moving",["tiny","small","medium_small","medium","large"],Jt,[{x:13,y:-8,sizeTier:"tiny"},{x:30,y:-2,motionPattern:"drift"},{x:47,y:6,sizeTier:"medium_large"},{x:66,y:10,coinAngles:[Math.PI*.95]},{x:86,y:1,enemyPole:"south"}]),qe("hard_03","hard","medium","moving",["small","medium_small","medium","large","very_large"],Jt,[{x:15,y:2,sizeTier:"very_large"},{x:33,y:7,motionPattern:"horizontal"},{x:51,y:1,sizeTier:"small"},{x:70,y:-6,motionPattern:"vertical"},{x:91,y:0,coinAngles:[Math.PI*.2],enemyPole:"north"}]),qe("hard_04","hard","high","moving",["tiny","small","medium_small","large"],Jt,[{x:14,y:9,sizeTier:"tiny"},{x:31,y:2},{x:49,y:-7,motionPattern:"horizontal"},{x:68,y:-10,sizeTier:"large",coinAngles:[Math.PI*1.1]},{x:90,y:-1,enemyPole:"south"}]),qe("hard_05","hard","high","moving",["small","medium_small","medium","medium_large","huge"],Jt,[{x:15,y:-3},{x:32,y:8,sizeTier:"huge"},{x:50,y:2,motionPattern:"micro_orbit"},{x:70,y:-9,sizeTier:"small",enemyPole:"north"},{x:92,y:-4,coinAngles:[Math.PI*.55]}]),qe("hard_06","hard","medium","moving",["tiny","small","medium_small","medium","large"],Jt,[{x:14,y:5,sizeTier:"small"},{x:31,y:-4,motionPattern:"vertical"},{x:49,y:5,sizeTier:"tiny"},{x:69,y:11,motionPattern:"drift",enemyPole:"south"},{x:91,y:4,coinAngles:[Math.PI*.25]}]),qe("expert_01","expert","high","moving",["tiny","small","medium_small","large","very_large"],Jt,[{x:16,y:10,sizeTier:"tiny",motionPattern:"vertical"},{x:36,y:1,sizeTier:"large"},{x:57,y:-10,motionPattern:"micro_orbit",enemyPole:"north"},{x:79,y:0,sizeTier:"very_large"},{x:103,y:9,coinAngles:[Math.PI*1.65]}]),qe("expert_02","expert","high","moving",["tiny","small","medium_small","medium","huge"],Jt,[{x:17,y:-11,sizeTier:"tiny"},{x:37,y:-2,motionPattern:"drift"},{x:59,y:9,sizeTier:"huge"},{x:82,y:12,motionPattern:"horizontal",enemyPole:"south"},{x:107,y:1,coinAngles:[Math.PI*.15]}]),qe("expert_03","expert","medium","moving",["small","medium_small","medium","large","massive"],Jt,[{x:16,y:2,sizeTier:"massive"},{x:38,y:10,motionPattern:"vertical"},{x:61,y:0,sizeTier:"small"},{x:85,y:-10,motionPattern:"drift",enemyPole:"north"},{x:111,y:-1,coinAngles:[Math.PI*1.1]}]),qe("expert_04","expert","high","moving",["tiny","small","medium","large","very_large"],Jt,[{x:15,y:8,motionPattern:"horizontal"},{x:35,y:-7,sizeTier:"tiny"},{x:57,y:11,sizeTier:"large"},{x:81,y:-9,motionPattern:"micro_orbit",enemyPole:"south"},{x:108,y:3,coinAngles:[Math.PI*.35]}])],Im={easy:{easy:70,medium:30,hard:0,expert:0},medium:{easy:40,medium:40,hard:20,expert:0},hard:{easy:0,medium:20,hard:60,expert:20},expert:{easy:0,medium:10,hard:55,expert:35}};function Um(s,e,t){const i=kt(s),n=Im[i.band],r=new Set(t.slice(-3)),a=Lo.filter(h=>!r.has(h.id)&&n[h.difficulty]>0),o=a.length>0?a:Lo.filter(h=>n[h.difficulty]>0),c=o.reduce((h,u)=>h+n[u.difficulty],0);let l=e()*c;for(const h of o)if(l-=n[h.difficulty],l<=0)return h;return o[o.length-1]}function Nm(s,e){if(s.length===0)return!1;const t=e.slice(Math.max(0,e.length-8));let i=e[e.length-1]??null;for(const n of s){const r=kt(n.index);if(i){const a=n.x-i.x,o=n.y-i.y,c=Math.hypot(a,o),l=i.gameplayRadius+n.gameplayRadius+2.8;if(c<l||c>r.maxJumpDistance||Math.abs(o)>r.maxVerticalDelta||n.x<i.x+Math.max(2.8,n.gameplayRadius*.75))return!1}for(const a of t)if(Math.hypot(n.x-a.x,n.y-a.y)<n.gameplayRadius+a.gameplayRadius+2.4)return!1;if(Math.abs(n.y)>28)return!1;t.push(n),t.length>8&&t.shift(),i=n}return!0}function Fm(s,e,t){return t<=e||!s[t]?!1:t<s.length-4}function Om(s,e){if(s.shapeKind==="round")return 0;const t=s.spinDirection==="cw"?-1:1;return s.motionSeed+e*s.spinSpeed*.42*t}function vs(s,e,t){const i=kt(Math.max(s.index,t));let n=s.x,r=s.y;if(s.index>t+1&&s.motionPattern!=="none"){const a=e*(.48+i.movementSpeed*.66)+s.motionSeed,o=i.movementAmplitude*(.44+s.visualScale*.08);s.motionPattern==="vertical"?r+=Math.sin(a)*o*.95:s.motionPattern==="horizontal"?(n+=Math.cos(a*.82)*o*.7,r+=Math.sin(a*.54)*o*.2):s.motionPattern==="micro_orbit"?(n+=Math.sin(a*.55)*o*.34,r+=Math.cos(a*.94)*o*.7):s.motionPattern==="drift"&&(n+=Math.cos(a*.42)*o*.46,r+=Math.sin(a*.42)*o*.46)}return{...s,resolvedX:n,resolvedY:r,resolvedZ:s.z,resolvedSpinPhase:Om(s,e)}}const Do={tiny:{radius:[.42,.6],visual:[.34,.54],orbitPeriod:[1.6,2.1]},very_small:{radius:[.6,.86],visual:[.54,.82],orbitPeriod:[2,2.5]},small:{radius:[.86,1.18],visual:[.82,1.18],orbitPeriod:[2.4,2.9]},medium_small:{radius:[1.18,1.58],visual:[1.18,1.72],orbitPeriod:[2.8,3.5]},medium:{radius:[1.58,2.08],visual:[1.72,2.36],orbitPeriod:[3.2,4]},medium_large:{radius:[2.08,2.74],visual:[2.36,3.12],orbitPeriod:[3.8,4.8]},large:{radius:[2.74,3.54],visual:[3.12,4.16],orbitPeriod:[4.4,5.6]},very_large:{radius:[3.54,4.52],visual:[4.16,5.7],orbitPeriod:[5.4,6.8]},huge:{radius:[4.52,5.9],visual:[5.7,7.9],orbitPeriod:[6.8,8.4]},massive:{radius:[5.9,7.4],visual:[7.9,11.2],orbitPeriod:[8.4,9.8]}},km=["tiny","very_small","small","medium_small","medium","medium_large","large","very_large","huge","massive"];class Bm{constructor(){M(this,"nodes",[]);M(this,"eventSystem",new Lm);M(this,"seed",1);M(this,"recentPatternIds",[])}reset(){this.seed=Math.random()*2147483647|1,this.recentPatternIds=[],this.eventSystem.reset(),this.nodes=[{index:0,x:-12,y:.8,z:0,gameplayRadius:1.86,visualScale:1.92,pathDistance:0,direction:"right",kind:"normal",sizeTier:"medium",shapeKind:"round",spinDirection:"cw",spinSpeed:.18,motionPattern:"none",eventType:"none",colorHint:"none",gameplayOrbitPeriod:3.6,branchSlot:null,offerId:null,onboarding:!0,isMilestone:!1,isGigantic:!1,coinSlots:[{angle:Math.PI*.4,value:1,collected:!1,orbitScale:1}],enemySlot:null,motionSeed:this.nextRandom()*Math.PI*2,visualStretch:{x:1,y:1,z:1}}]}prebuild(e){this.nodes.length===0&&this.reset(),this.append(Math.max(0,e-this.nodes.length))}ensureAhead(e,t=50,i=30){this.nodes.length-e>t||this.append(i)}queuePostMilestoneEvents(e,t){this.eventSystem.schedulePostMilestoneEvents(e,t,()=>this.nextRandom())}getInitialNodes(e){return this.prebuild(Math.max(180,e+60)),this.nodes.slice(0,e)}getInitialPositions(e){return this.getInitialNodes(e).map(t=>({x:t.x,y:t.y,z:t.z}))}getNode(e){return this.ensureAhead(e+1),this.nodes[e]||null}getWindow(e,t,i,n){return this.ensureAhead(e+t),this.nodes.slice(e,e+t).map(r=>vs(r,i,n))}getResolvedNode(e,t,i){this.ensureAhead(e+1);const n=this.nodes[e]??this.nodes[this.nodes.length-1];return vs(n,t,i)}replaceFuture(e,t){const i=this.nodes.slice(0,e+1),n=i[i.length-1]??null,r=[];t.forEach((a,o)=>{r.push(this.reindexNode(a,e+o+1,o===0?n:r[o-1]))}),this.nodes=[...i,...r]}createUpgradeBranches(e,t,i){const n=this.getNode(e);if(!n)return[];const a=kt(i).spacing*1.18,o=[{slot:0,yBias:10.5,xBias:12.5,direction:"up_right"},{slot:1,yBias:0,xBias:14.5,direction:"right"},{slot:2,yBias:-10.5,xBias:12.5,direction:"down_right"}];return t.slice(0,3).map((c,l)=>{const h=o[l]??o[1],u=[];for(let f=0;f<5;f+=1){const m=f/4,g=f===0?n:u[f-1],_=f<2?"large":"medium_large",p=Do[_],d=p.radius[0]+this.nextRandom()*(p.radius[1]-p.radius[0]),b=p.visual[0]+this.nextRandom()*(p.visual[1]-p.visual[0]),x=p.orbitPeriod[0]+this.nextRandom()*(p.orbitPeriod[1]-p.orbitPeriod[0]),A=n.x+h.xBias+f*a*.92,L=n.y+h.yBias*(.38+m*.92)+Math.sin(m*Math.PI)*h.yBias*.12;u.push(this.buildNode({previous:g,index:e+f+1,x:A,y:L,direction:h.direction,sizeTier:_,shapeKind:i>=100?l===1?"triangular":"oval":i>=50?"oval":"round",motionPattern:f===0?"none":f%2===0?"vertical":"horizontal",spinDirection:l===1?"cw":"ccw",spinSpeed:.12+this.nextRandom()*.16,gameplayRadius:d,visualScale:b,gameplayOrbitPeriod:x,visualStretch:l===1?{x:1,y:1.08,z:.84}:{x:1.32,y:.84,z:1},kind:"branch",branchSlot:h.slot,offerId:c.item.id,onboarding:!1,eventType:"none",colorHint:"reward",isMilestone:!1,isGigantic:!1,coinSlots:f===0?[{angle:Math.PI*.5,value:1,collected:!1,orbitScale:1}]:[],enemySlot:null}))}return{mode:"reward_branch",offer:c,entry:u[0],previewNodes:u.slice(0,3),pathNodes:u}})}getTeleportTarget(e,t){this.ensureAhead(e+t+60);const i=Math.min(this.nodes.length-5,e+t);return Fm(this.nodes,e,i)?i:-1}sampleAtDistance(e){this.nodes.length===0&&this.prebuild(2);const t=Math.max(0,e);let i=this.nodes[0];for(let o=1;o<this.nodes.length;o+=1){const c=this.nodes[o];if(c.pathDistance>=t){const l=Math.max(1e-4,c.pathDistance-i.pathDistance),h=lt((t-i.pathDistance)/l,0,1),u=i.x+(c.x-i.x)*h,f=i.y+(c.y-i.y)*h,m=Math.hypot(c.x-i.x,c.y-i.y)||1;return{x:u,y:f,z:0,tangent:{x:(c.x-i.x)/m,y:(c.y-i.y)/m}}}i=c}const n=this.nodes[this.nodes.length-1],r=this.nodes[this.nodes.length-2]??n,a=Math.hypot(n.x-r.x,n.y-r.y)||1;return{x:n.x,y:n.y,z:0,tangent:{x:(n.x-r.x)/a,y:(n.y-r.y)/a}}}append(e){if(e<=0)return;let t=0;for(;t<e;){const i=Um(this.nodes.length,()=>this.nextRandom(),this.recentPatternIds),n=this.instantiatePattern(i);this.nodes.push(...n),this.recentPatternIds.push(i.id),this.recentPatternIds.length>6&&this.recentPatternIds.shift(),t+=n.length}}instantiatePattern(e){const t=this.nodes[this.nodes.length-1],i=t.index,r=kt(i).spacing/11.5,a=e.nodes.map((o,c)=>{const l=t.index+c+1,h=this.resolveEventType(l,i,o);return this.buildTemplateNode(t,l,o,e,r,i,h)});return Nm(a,this.nodes)?a:this.buildFallbackPattern(t)}buildTemplateNode(e,t,i,n,r,a,o){const c=To(t),l=c,h=this.pickShapeKind(n.allowedShapeKinds,a),u=l?"massive":i.sizeTier??this.pickSizeTier(n.allowedShardSizes,a),f=Do[u],m=l?10.4+this.nextRandom()*1.2:f.radius[0]+this.nextRandom()*(f.radius[1]-f.radius[0]),g=l?28+this.nextRandom()*8:f.visual[0]+this.nextRandom()*(f.visual[1]-f.visual[0]),_=l?10:f.orbitPeriod[0]+this.nextRandom()*(f.orbitPeriod[1]-f.orbitPeriod[0]),p=e.x+i.x*r,d=e.y+i.y*r*.82,b=this.directionFrom(e.x,e.y,p,d),x=l?"none":this.pickMotionPattern(i.motionPattern,a,h),A=this.nextRandom()<.5?"cw":"ccw",L=h==="round"?.08+this.nextRandom()*.12:.06+this.nextRandom()*.18,w=h==="oval"?{x:1.42+this.nextRandom()*.42,y:.74+this.nextRandom()*.16,z:1}:h==="triangular"?{x:1,y:1.08+this.nextRandom()*.14,z:.84+this.nextRandom()*.1}:{x:1,y:1,z:1},P=c?"milestone":o==="none"?"normal":o==="boss_weak"?"boss_weak":"event";return this.buildNode({previous:e,index:t,x:p,y:d,direction:b,sizeTier:u,shapeKind:h,motionPattern:x,spinDirection:A,spinSpeed:L,gameplayRadius:m,visualScale:g,gameplayOrbitPeriod:_,visualStretch:w,kind:P,branchSlot:null,offerId:null,onboarding:t<50,eventType:o,colorHint:o==="boss"||o==="boss_weak"?"danger":o==="none"?"none":"accent",isMilestone:c,isGigantic:l,coinSlots:this.buildCoinSlots(i,o,a),enemySlot:this.buildEnemySlot(i,a,o)})}buildFallbackPattern(e){const t=e.index,i=kt(t),n=[],r=4;for(let a=0;a<r;a+=1){const o=e.index+a+1,c=a===0?e:n[a-1],l=c.y>9?"down_right":c.y<-9||a%2===0?"up_right":"down_right",h=l==="up_right"?{x:1,y:.66}:l==="down_right"?{x:1,y:-.66}:{x:1,y:0},u=i.spacing*(.88+this.nextRandom()*.24),f=c.x+h.x*u,m=c.y+h.y*u;n.push(this.buildNode({previous:c,index:o,x:f,y:m,direction:l,sizeTier:"medium",shapeKind:t>=100?"triangular":t>=50?"oval":"round",motionPattern:i.roundMovementUnlocked?"vertical":"none",spinDirection:"cw",spinSpeed:.12,gameplayRadius:1.74,visualScale:1.92,gameplayOrbitPeriod:3.6,visualStretch:{x:1,y:1,z:1},kind:"normal",branchSlot:null,offerId:null,onboarding:o<50,eventType:"none",colorHint:"none",isMilestone:!1,isGigantic:!1,coinSlots:a===1?[{angle:Math.PI*.6,value:1,collected:!1,orbitScale:1}]:[],enemySlot:null}))}return n}buildNode(e){const t=e.previous,i=t?Math.hypot(e.x-t.x,e.y-t.y):0;return{index:e.index,x:e.x,y:e.y,z:0,gameplayRadius:e.gameplayRadius,visualScale:e.visualScale,pathDistance:t?t.pathDistance+i:0,direction:e.direction,kind:e.kind,sizeTier:e.sizeTier,shapeKind:e.shapeKind,spinDirection:e.spinDirection,spinSpeed:e.spinSpeed,motionPattern:e.motionPattern,eventType:e.eventType,colorHint:e.colorHint,gameplayOrbitPeriod:e.gameplayOrbitPeriod,branchSlot:e.branchSlot,offerId:e.offerId,onboarding:e.onboarding,isMilestone:e.isMilestone,isGigantic:e.isGigantic,coinSlots:e.coinSlots,enemySlot:e.enemySlot,motionSeed:this.nextRandom()*Math.PI*2,visualStretch:e.visualStretch}}reindexNode(e,t,i){return this.buildNode({previous:i,index:t,x:e.x,y:e.y,direction:e.direction,sizeTier:e.sizeTier,shapeKind:e.shapeKind,motionPattern:e.motionPattern,spinDirection:e.spinDirection,spinSpeed:e.spinSpeed,gameplayRadius:e.gameplayRadius,visualScale:e.visualScale,gameplayOrbitPeriod:e.gameplayOrbitPeriod,visualStretch:e.visualStretch,kind:e.kind,branchSlot:e.branchSlot,offerId:e.offerId,onboarding:!1,eventType:e.eventType,colorHint:e.colorHint,isMilestone:e.isMilestone,isGigantic:e.isGigantic,coinSlots:e.coinSlots.map(n=>({...n})),enemySlot:e.enemySlot?{...e.enemySlot}:null})}buildCoinSlots(e,t,i){var r;const n=((r=e.coinAngles)==null?void 0:r.map(a=>({angle:a,value:t==="treasure"?3:1,collected:!1,orbitScale:1})))??[];return n.length===0&&i<12&&n.push({angle:Math.PI*(.2+this.nextRandom()*1.6),value:1,collected:!1,orbitScale:1}),n}buildEnemySlot(e,t,i){if(!kt(t).enemyUnlocked||i==="shop"||i==="gift")return null;const r=e.enemyPole??(this.nextRandom()<.24?this.nextRandom()<.5?"north":"south":null);if(!r)return null;const a=t<60?"light":t<120?this.nextRandom()<.7?"armored":"light":this.nextRandom()<.18?"invincible":this.nextRandom()<.55?"elite":"armored",o=a==="light"?4.6:a==="armored"?6.4:a==="elite"?8.1:Number.POSITIVE_INFINITY;return{pole:r,tier:a,alive:!0,rewardCoins:a==="elite"?2:1,speedThreshold:o}}pickSizeTier(e,t){const i=kt(t),n=km.filter(o=>e.includes(o)),r=lt(Math.floor(i.normalized*(n.length-1)+4),0,n.length-1),a=n.slice(0,r+1);return a[Math.floor(this.nextRandom()*a.length)]??"medium"}pickShapeKind(e,t){const i=kt(t),n=e.filter(r=>!(r==="oval"&&!i.ovalUnlocked||r==="triangular"&&!i.triangularUnlocked));return n[Math.floor(this.nextRandom()*n.length)]??"round"}pickMotionPattern(e,t,i){const n=kt(t);if(i==="round"&&!n.roundMovementUnlocked)return"none";if(e&&e!=="none"&&this.nextRandom()<n.movingShardChance+.25)return e;if(this.nextRandom()>n.movingShardChance)return"none";const r=["vertical","horizontal","micro_orbit","drift"];return r[Math.floor(this.nextRandom()*r.length)]??"none"}resolveEventType(e,t,i){return To(e)?"none":i.sizeTier==="massive"&&t>=150?"boss_weak":this.eventSystem.consumePlannedEvent(e,t)}directionFrom(e,t,i,n){const r=i-e,a=n-t;return Math.abs(a)<1.5?"right":a>0?r<0?"up_left":Math.abs(r)<1.2?"up":"up_right":r<0?"down_left":"down_right"}nextRandom(){return this.seed=this.seed*48271%2147483647,this.seed/2147483647}}const Io="portfolio-game-highscore",Uo="portfolio-game-best-distance",No="portfolio-game-best-splits";class zm{constructor(){M(this,"shardsLanded",0);M(this,"distanceMeters",0);M(this,"coins",0);M(this,"runStartTime",0);M(this,"splitTimes",{});M(this,"bestShards",Number(window.localStorage.getItem(Io)||0));M(this,"bestDistanceMeters",Number(window.localStorage.getItem(Uo)||0));M(this,"bestSplitTimes",this.readSplits())}reset(e=performance.now()){this.shardsLanded=0,this.distanceMeters=0,this.coins=0,this.runStartTime=e,this.splitTimes={}}recordLanding(e,t,i){if(this.shardsLanded=Math.max(this.shardsLanded,e),this.distanceMeters=Math.max(this.distanceMeters,t*3.2),(e===10||e===50||e===100)&&this.splitTimes[e]===void 0){const n=Math.max(0,i-this.runStartTime)/1e3;this.splitTimes[e]=n;const r=this.bestSplitTimes[e];(r===void 0||n<r)&&(this.bestSplitTimes[e]=n,this.persist())}this.shardsLanded>this.bestShards&&(this.bestShards=this.shardsLanded,this.persist()),this.distanceMeters>this.bestDistanceMeters&&(this.bestDistanceMeters=this.distanceMeters,this.persist())}addCoins(e){this.coins+=e}canAfford(e){return this.coins>=e}spendCoins(e){return this.coins<e?!1:(this.coins-=e,!0)}getSnapshot(){return{shardsLanded:this.shardsLanded,bestShards:this.bestShards,distanceMeters:this.distanceMeters,bestDistanceMeters:this.bestDistanceMeters,coins:this.coins,splitTimes:{...this.splitTimes},bestSplitTimes:{...this.bestSplitTimes}}}fillHud(e){e.score=this.shardsLanded,e.highscore=this.bestShards,e.distanceMeters=this.distanceMeters,e.bestDistanceMeters=this.bestDistanceMeters,e.coins=this.coins,e.splitTimes={...this.splitTimes}}readSplits(){const e=window.localStorage.getItem(No);if(!e)return{};try{return JSON.parse(e)}catch{return{}}}persist(){window.localStorage.setItem(Io,String(this.bestShards)),window.localStorage.setItem(Uo,String(this.bestDistanceMeters)),window.localStorage.setItem(No,JSON.stringify(this.bestSplitTimes))}}const Fo="#D9624E";class Gm{constructor(e,t){M(this,"group",new Gt);M(this,"pool",[]);M(this,"activeOffers",[]);M(this,"open",!1);const i=new Se(t==="dark"?Fo:"#8E4130");for(let n=0;n<3;n+=1){const r=new _t(new Dn(.34,0),new ei({color:i,transparent:!0,opacity:.94}));r.visible=!1,this.pool.push(r),this.group.add(r)}this.group.visible=!1,e.add(this.group)}setTheme(e){const t=new Se(e==="dark"?Fo:"#8E4130");this.pool.forEach(i=>i.material.color.copy(t))}reset(){this.open=!1,this.activeOffers=[],this.group.visible=!1,this.pool.forEach(e=>{e.visible=!1})}openForRun(e,t){const i=Math.max(0,Math.min(.45,t.modifiers.shopDiscount)),n=hs(e,t);return this.activeOffers=n.slice(0,3).map((r,a)=>({angle:Math.PI*(.2+a*.55),price:this.getPriceForOffer(r,i),purchased:!1,offer:r})),this.open=this.activeOffers.length>0,this.group.visible=this.open,n}isOpen(){return this.open}getActiveOffers(){return this.activeOffers.map(e=>({offer:e.offer,price:e.price,angle:e.angle,purchased:e.purchased}))}getHints(e){return this.activeOffers.map((t,i)=>{var n,r,a;return{mode:"shop_orbit",offer:t.offer,price:t.price,entry:{index:i,x:((n=e[i])==null?void 0:n.x)??0,y:((r=e[i])==null?void 0:r.y)??0,z:((a=e[i])==null?void 0:a.z)??0,gameplayRadius:.5,visualScale:.5,pathDistance:0,direction:"right",kind:"event",sizeTier:"tiny",shapeKind:"round",spinDirection:"cw",spinSpeed:0,motionPattern:"none",eventType:"shop",colorHint:"accent",gameplayOrbitPeriod:1,branchSlot:i,offerId:t.offer.item.id,onboarding:!1,isMilestone:!1,isGigantic:!1,coinSlots:[],enemySlot:null,motionSeed:0,visualStretch:{x:1,y:1,z:1}},previewNodes:[],pathNodes:[]}})}tryPurchase(e,t){if(!this.open)return null;for(const i of this.activeOffers){if(i.purchased)continue;if(Hm(e,i.angle)<.22&&t>=i.price)return i.purchased=!0,this.close(),{offer:i.offer,price:i.price}}return null}update(e,t,i){if(!this.open){this.group.visible=!1;return}this.group.visible=!0,this.pool.forEach((n,r)=>{const a=this.activeOffers[r];if(!a||a.purchased){n.visible=!1;return}n.visible=!0,n.position.set(e.x+Math.cos(a.angle)*(t+1.6),e.y+Math.sin(a.angle)*(t+1.6),0),n.rotation.y=i*1.4+r*.35,n.scale.setScalar(1+Math.sin(i*3+r)*.06)})}close(){this.open=!1,this.group.visible=!1,this.pool.forEach(e=>{e.visible=!1})}getPriceForOffer(e,t){const i=e.item.rarity==="legendary"?11:e.item.rarity==="epic"?8:e.item.rarity==="rare"?5:e.item.rarity==="uncommon"?3:2;return Math.max(1,Math.round((i+e.stackCount)*(1-t)))}}function Hm(s,e){return Math.abs(((s-e)%(Math.PI*2)+Math.PI*3)%(Math.PI*2)-Math.PI)}const cs="#D9624E";class Vm{constructor(e,t){M(this,"group",new Gt);M(this,"bossMesh");M(this,"weakPointMesh");M(this,"phase","idle");M(this,"phaseEndsAt",0);M(this,"active",!1);M(this,"defeated",!1);M(this,"weakPointVisible",!1);M(this,"weakPointPosition",new C);this.bossMesh=new _t(new Dn(2.8,1),new ei({color:t==="dark"?cs:"#8E4130",transparent:!0,opacity:.9})),this.weakPointMesh=new _t(new As(.78,0),new ei({color:cs,transparent:!0,opacity:.96})),this.bossMesh.visible=!1,this.weakPointMesh.visible=!1,this.group.add(this.bossMesh,this.weakPointMesh),e.add(this.group)}setTheme(e){this.bossMesh.material.color.set(e==="dark"?cs:"#8E4130"),this.weakPointMesh.material.color.set(cs)}reset(){this.active=!1,this.defeated=!1,this.phase="idle",this.phaseEndsAt=0,this.weakPointVisible=!1,this.bossMesh.visible=!1,this.weakPointMesh.visible=!1}start(e){this.active=!0,this.defeated=!1,this.phase="chase",this.phaseEndsAt=e+6,this.bossMesh.visible=!0}isActive(){return this.active&&!this.defeated}isWeakPointPhase(){return this.phase==="weak_point"}getSpeedPressure(){return this.phase==="chaos"?1.24:this.phase==="chase"?1.12:1}getCameraZoomOffset(){return this.active?this.phase==="weak_point"?9.5:this.phase==="chaos"?5.6:3.2:0}update(e,t,i){return!this.active||this.defeated?(this.bossMesh.visible=!1,this.weakPointMesh.visible=!1,{playerHit:!1}):(t>=this.phaseEndsAt&&(this.phase==="chase"?(this.phase="chaos",this.phaseEndsAt=t+8):this.phase==="chaos"&&(this.phase="weak_point",this.phaseEndsAt=t+10,this.weakPointVisible=!0)),this.bossMesh.visible=!0,this.bossMesh.position.set(i.x-(this.phase==="weak_point"?10.5:8.6),i.y+Math.sin(t*1.2)*2.4,0),this.bossMesh.rotation.y+=e*.32,this.bossMesh.rotation.z+=e*.18,this.bossMesh.scale.setScalar(this.phase==="chaos"?1.2:1),this.weakPointMesh.visible=this.weakPointVisible,this.weakPointVisible&&(this.weakPointMesh.position.copy(this.weakPointPosition),this.weakPointMesh.rotation.y+=e*1.8,this.weakPointMesh.scale.setScalar(1+Math.sin(t*6)*.08)),{playerHit:this.phase!=="weak_point"&&this.bossMesh.position.distanceTo(i)<2.2})}setWeakPoint(e){this.weakPointPosition.copy(e),this.weakPointVisible=this.phase==="weak_point"}defeat(){this.defeated=!0,this.active=!1,this.phase="defeated",this.weakPointVisible=!1,this.bossMesh.visible=!1,this.weakPointMesh.visible=!1}}const Oo=1.05,Wm="#D9624E",Xm="#F06A5A",qm="#E8A86E";function ko(s){const e=Math.PI*2;return(s%e+e)%e}function jm(s,e){const t=Math.PI*2;return((s-e+Math.PI)%t+t)%t-Math.PI}class Ym{constructor(e,t){M(this,"root",new Gt);M(this,"player",new Gt);M(this,"playerBody");M(this,"playerTrail",new xr);M(this,"trailPoints",Array.from({length:8},()=>new C));M(this,"trailBuffer",new Float32Array(this.trailPoints.length*3));M(this,"path",new Bm);M(this,"camera",new Pm);M(this,"stats",new zm);M(this,"coins");M(this,"enemies");M(this,"shop");M(this,"boss");M(this,"scoreListeners",new Set);M(this,"playerPosition",new C);M(this,"playerVelocity",new C);M(this,"playerVelocityTarget",new C);M(this,"scratchVector",new C);M(this,"scratchVectorB",new C);M(this,"scratchVector2",new ve);M(this,"hudSnapshot",{state:"transition",score:0,highscore:0,distanceMeters:0,bestDistanceMeters:0,coins:0,splitTimes:{},chargeRatio:0,momentumGauge:0,momentumTier:0,offers:[],branchHints:[],acquisition:null});M(this,"momentum",{gauge:0,fillRate:0,decayRate:.12,speedMultiplier:1,jumpMultiplier:1,cameraZoomMultiplier:0});M(this,"state","idle");M(this,"playerState","attached");M(this,"currentTime",0);M(this,"attachedIndex",0);M(this,"score",0);M(this,"chargeActive",!1);M(this,"chargeMeter",0);M(this,"orbitAngle",Math.PI*.18);M(this,"orbitDirection",-1);M(this,"angularSpeed",0);M(this,"lastLandingDirection",0);M(this,"choiceMode","none");M(this,"activeChoices",[]);M(this,"activeShopAngles",[]);M(this,"acquisition",null);M(this,"acquisitionStartedAt",0);M(this,"acquisitionDuration",.9);M(this,"runUpgrades",Eo());M(this,"remainingExtraJumps",0);M(this,"phaseJumpReadyAt",0);M(this,"teleportReadyAt",0);M(this,"warpReadyAt",0);M(this,"shieldCharges",0);M(this,"eventCooldownUntil",0);M(this,"autoFireReadyAt",0);this.playerBody=new _t(new Lr(.42,1.18,6),new ei({color:t==="dark"?"#D4BF9B":"#393F4A"})),this.playerBody.rotation.z=-Math.PI/2,this.player.add(this.playerBody),this.player.visible=!1,this.root.add(this.player);const i=new St;i.setAttribute("position",new Ct(this.trailBuffer,3)),this.playerTrail=new xr(i,new Cr({color:t==="dark"?"#D4BF9B":"#393F4A",transparent:!0,opacity:.42})),this.playerTrail.visible=!1,this.root.add(this.playerTrail),e.add(this.root),this.coins=new Cm(e,t),this.enemies=new Rm(e,t),this.shop=new Gm(e,t),this.boss=new Vm(e,t)}get currentState(){return this.state}get currentScore(){return this.score}get bestScore(){return this.stats.getSnapshot().bestShards}setTheme(e){this.playerBody.material.color.set(e==="dark"?"#D4BF9B":"#393F4A"),this.playerTrail.material.color.set(e==="dark"?"#D4BF9B":"#393F4A"),this.coins.setTheme(e),this.enemies.setTheme(e),this.shop.setTheme(e),this.boss.setTheme(e)}onScoreChange(e){return this.scoreListeners.add(e),()=>this.scoreListeners.delete(e)}startTransition(){this.resetRunState(),this.path.reset(),this.path.prebuild(180),this.state="transition_in",this.root.visible=!0,this.player.visible=!1,this.playerTrail.visible=!1}beginRun(){const e=this.state==="transition_in";this.resetRunState(),e||(this.path.reset(),this.path.prebuild(180)),this.root.visible=!0,this.player.visible=!0,this.playerTrail.visible=!0,this.attachToNode(0,!1,null,null),this.camera.reset(this.getResolvedNode(0)),this.state="running_attached",this.emitScore()}restart(){this.beginRun()}prepareReturnTransition(){this.state="transition_out",this.chargeActive=!1,this.choiceMode="none",this.activeChoices=[],this.shop.reset(),this.boss.reset(),this.coins.reset(),this.enemies.reset(),this.player.visible=!1,this.playerTrail.visible=!1}stop(){this.state="idle",this.root.visible=!1,this.player.visible=!1,this.playerTrail.visible=!1,this.shop.reset(),this.boss.reset(),this.coins.reset(),this.enemies.reset()}resetRunState(){this.stats.reset(performance.now()),this.score=0,this.chargeActive=!1,this.chargeMeter=0,this.choiceMode="none",this.activeChoices=[],this.activeShopAngles=[],this.acquisition=null,this.acquisitionStartedAt=0,this.currentTime=0,this.attachedIndex=0,this.lastLandingDirection=0,this.playerState="attached",this.orbitAngle=Math.PI*.18,this.orbitDirection=-1,this.angularSpeed=0,this.playerPosition.set(0,0,0),this.playerVelocity.set(0,0,0),this.playerVelocityTarget.set(0,0,0),this.runUpgrades=Eo(),this.remainingExtraJumps=0,this.phaseJumpReadyAt=0,this.teleportReadyAt=0,this.warpReadyAt=0,this.shieldCharges=0,this.eventCooldownUntil=0,this.autoFireReadyAt=0,this.momentum.gauge=0,this.momentum.fillRate=0,this.momentum.decayRate=.12,this.momentum.speedMultiplier=1,this.momentum.jumpMultiplier=1,this.momentum.cameraZoomMultiplier=0,this.playerTrail.geometry.setDrawRange(0,this.trailPoints.length),this.trailPoints.forEach(e=>e.set(0,0,0)),this.coins.reset(),this.enemies.reset(),this.shop.reset(),this.boss.reset()}getInitialPlatformPositions(e){return this.path.prebuild(Math.max(160,e+60)),this.path.getInitialNodes(e).map(t=>new C(t.x,t.y,t.z))}getInitialPlatformScales(e){return this.path.prebuild(Math.max(160,e+60)),this.path.getInitialNodes(e).map(t=>t.visualScale)}getVisiblePlatformPositions(e){return this.getDisplayNodes(e).map(t=>new C(t.resolvedX,t.resolvedY,t.resolvedZ))}getVisiblePlatformScales(e){return this.getDisplayNodes(e).map(t=>t.visualScale)}getVisiblePlatformVisuals(e){return this.getDisplayNodes(e).map(t=>({scale:new C(t.visualScale*t.visualStretch.x,t.visualScale*t.visualStretch.y,t.visualScale*t.visualStretch.z),shapeKind:t.shapeKind,spinDirection:t.spinDirection,spinSpeed:t.spinSpeed,spinPhase:t.resolvedSpinPhase,tint:t.colorHint==="danger"?Xm:t.colorHint==="reward"?qm:t.colorHint==="accent"?Wm:null,pulse:t.isMilestone||t.eventType!=="none"?.34:lt(this.momentum.gauge*.22,0,.22)}))}setChargeActive(e){if(this.state==="idle"||this.state==="transition_in"||this.state==="transition_out"||this.state==="game_over")return!1;if(e)return this.chargeActive=!0,this.playerState==="attached"&&(this.playerState="charging",this.state==="running_attached"&&(this.state="running_charging")),!1;const t=this.chargeActive&&(this.playerState==="charging"||this.playerState==="attached")&&(this.state==="running_charging"||this.state==="running_attached"||this.state==="upgrade_branching");return this.chargeActive=!1,t?this.launch():!1}triggerJump(){return this.state==="idle"||this.state==="transition_in"||this.state==="transition_out"||this.state==="game_over"?!1:this.playerState==="attached"||this.playerState==="charging"?(this.chargeActive=!1,this.launch()):this.performAirAction()}selectUpgradeFallback(e){if(this.state!=="upgrade_branching")return!1;if(this.choiceMode==="shop_orbit"){const t=this.activeChoices[e];return!t||t.price===void 0||!this.stats.spendCoins(t.price)?!1:(this.applyOffer(t.offer,"Shop item"),this.shop.reset(),this.choiceMode="none",this.activeChoices=[],this.state="upgrade_acquired",this.eventCooldownUntil=this.currentTime+.6,!0)}return this.choiceMode!=="reward_branch"?!1:this.commitRewardBranch(e,!0)}getCameraPose(){return this.camera.getPose()}getHudState(){const e=lt(this.momentum.gauge/Math.max(1,this.runUpgrades.modifiers.momentumCap),0,1);return this.stats.fillHud(this.hudSnapshot),this.hudSnapshot.state=this.getHudStateValue(),this.hudSnapshot.chargeRatio=lt(this.chargeMeter,0,1),this.hudSnapshot.momentumGauge=e,this.hudSnapshot.momentumTier=Math.min(4,Math.floor(e*5)),this.hudSnapshot.offers=this.activeChoices.map(t=>t.offer),this.hudSnapshot.branchHints=this.getBranchHints(),this.hudSnapshot.acquisition=this.acquisition,this.hudSnapshot}update(e,t){if(this.state==="idle")return;if(this.currentTime=t,this.state==="transition_in"||this.state==="transition_out"){this.updateMomentum(e);return}this.path.ensureAhead(this.attachedIndex),this.updateMomentum(e);const i=this.getResolvedNode(this.attachedIndex),n=this.getResolvedNode(this.attachedIndex+1);if(this.playerState==="airborne"?this.updateAirborne(e,i):this.updateAttached(e,i),this.updateEvents(e,t,i),this.updateCamera(e,i,n),this.updateTrail(e),this.syncPlayerVisual(t),this.syncMarkers(t),this.state!=="game_over"&&(this.camera.isOutsideViewport(this.playerPosition,.01)||this.camera.isBehindSafeLine(this.playerPosition)?this.failRun():this.playerState!=="airborne"&&this.camera.isBehindSafeLine(new C(i.resolvedX,i.resolvedY,0))&&this.failRun()),this.acquisition){const r=lt((t-this.acquisitionStartedAt)/this.acquisitionDuration,0,1);this.acquisition.progress=r,r>=1&&(this.acquisition=null)}}getHudStateValue(){return this.state==="game_over"?"game_over":this.state==="transition_in"||this.state==="transition_out"?"transition":this.state==="upgrade_branching"?"upgrade_choice":"running"}emitScore(){this.scoreListeners.forEach(e=>e())}getResolvedNode(e){return this.path.getResolvedNode(Math.max(0,e),this.currentTime,this.attachedIndex)}getDisplayNodes(e){if(this.choiceMode==="reward_branch"&&this.activeChoices.length>0){const i=[this.getResolvedNode(this.attachedIndex)];for(this.activeChoices.forEach(n=>{n.previewNodes.slice(0,3).forEach(r=>{i.push(vs(r,this.currentTime,this.attachedIndex))})});i.length<e;){const n=this.attachedIndex+Math.max(1,i.length-8);i.push(this.getResolvedNode(n))}return i.slice(0,e)}const t=Math.max(0,this.attachedIndex-1);return this.path.getWindow(t,e,this.currentTime,this.attachedIndex)}updateMomentum(e){const t=1-Math.min(.72,this.runUpgrades.modifiers.momentumRetention),i=this.momentum.decayRate*t;this.momentum.gauge=lt(this.momentum.gauge-i*e,0,1);const n=1+this.momentum.gauge*.6+this.runUpgrades.modifiers.speedBonus,r=1+this.momentum.gauge*.48+this.runUpgrades.modifiers.chargedLeapBonus*.12,a=this.momentum.gauge*1.4;this.momentum.speedMultiplier=De(this.momentum.speedMultiplier,n,2.4,e),this.momentum.jumpMultiplier=De(this.momentum.jumpMultiplier,r,2.6,e),this.momentum.cameraZoomMultiplier=De(this.momentum.cameraZoomMultiplier,a,2.2,e),this.momentum.fillRate=De(this.momentum.fillRate,0,4.6,e)}updateAttached(e,t){const i=this.getOrbitSample(t,this.orbitAngle),n=Math.max(1,i.position.length()),r=Math.PI*2/Math.max(1.6,t.gameplayOrbitPeriod),a=this.chargeActive?.55+this.chargeMeter*.45:0,o=r*(1+a+this.momentum.gauge*.42)*this.momentum.speedMultiplier*(1+this.runUpgrades.modifiers.chargeRate*.06+this.runUpgrades.modifiers.speedBonus*.3);this.angularSpeed=De(this.angularSpeed,o,this.chargeActive?2.6:1.7,e),this.orbitAngle=ko(this.orbitAngle+this.orbitDirection*this.angularSpeed*e);const c=this.getOrbitSample(t,this.orbitAngle);if(this.playerPosition.set(t.resolvedX+c.position.x,t.resolvedY+c.position.y,t.resolvedZ),this.playerVelocity.set(c.tangent.x*n*this.angularSpeed*this.orbitDirection,c.tangent.y*n*this.angularSpeed*this.orbitDirection,0),this.chargeActive){const l=.55+this.runUpgrades.modifiers.chargeRate*.24;this.chargeMeter=lt(this.chargeMeter+e*l,0,1),this.state==="running_attached"&&(this.state="running_charging"),this.playerState==="attached"&&(this.playerState="charging")}else this.chargeMeter=De(this.chargeMeter,0,4.2,e),this.playerState==="charging"&&(this.playerState="attached"),this.state==="running_charging"&&(this.state="running_attached");if(this.collectCoinsOnCurrentNode(t),this.resolveEnemyContact(t),this.choiceMode==="shop_orbit"&&this.shop.isOpen()){const l=this.shop.tryPurchase(this.orbitAngle,this.stats.getSnapshot().coins);l&&this.stats.spendCoins(l.price)&&(this.applyOffer(l.offer,"Shop item"),this.choiceMode="none",this.activeChoices=[],this.state="upgrade_acquired",this.eventCooldownUntil=this.currentTime+.6)}}updateAirborne(e,t){const i=lt(1-this.runUpgrades.modifiers.glideFactor*.55,.18,1);if(this.playerVelocity.y-=6.8*i*e,this.playerVelocity.x+=this.runUpgrades.modifiers.airControl*e*.4,this.playerPosition.addScaledVector(this.playerVelocity,e),this.choiceMode==="reward_branch"&&this.activeChoices.length>0)for(let r=0;r<this.activeChoices.length;r+=1){const a=this.activeChoices[r];if(!a)continue;const o=vs(a.entry,this.currentTime,this.attachedIndex);if(this.canCaptureNode(o)){this.commitRewardBranch(r,!1),this.attachToNode(this.attachedIndex+1,!0,this.playerPosition,this.playerVelocity);return}}const n=Math.min(this.attachedIndex+8,this.attachedIndex+1+8);for(let r=this.attachedIndex+1;r<=n;r+=1){const a=this.getResolvedNode(r);if(this.canCaptureNode(a)){this.attachToNode(r,!0,this.playerPosition,this.playerVelocity);return}}if(this.runUpgrades.modifiers.phaseJump&&this.currentTime>=this.phaseJumpReadyAt){const r=this.attachedIndex+1,a=this.getResolvedNode(r),o=this.playerPosition.distanceToSquared(this.scratchVector.set(a.resolvedX,a.resolvedY,a.resolvedZ)),c=(a.gameplayRadius+this.runUpgrades.modifiers.phaseJumpRescueRadius)**2;if(o<c){this.phaseJumpReadyAt=this.currentTime+this.runUpgrades.modifiers.phaseJumpCooldown,this.attachToNode(r,!0,this.playerPosition,this.playerVelocity);return}}if(this.teleportReadyAt<=this.currentTime&&this.runUpgrades.modifiers.teleportRange>0){const r=this.path.getTeleportTarget(this.attachedIndex,this.runUpgrades.modifiers.teleportRange);r>this.attachedIndex+1&&this.playerPosition.x<this.camera.getSafeLeft()+2.4&&(this.teleportReadyAt=this.currentTime+this.runUpgrades.modifiers.teleportCooldown,this.attachToNode(r,!1,null,null))}if(this.warpReadyAt<=this.currentTime&&this.runUpgrades.modifiers.warpRange>0){const r=this.path.getTeleportTarget(this.attachedIndex,this.runUpgrades.modifiers.warpRange);r>this.attachedIndex+3&&this.playerPosition.x<this.camera.getSafeLeft()+1.6&&(this.warpReadyAt=this.currentTime+this.runUpgrades.modifiers.warpCooldown,this.attachToNode(r,!1,null,null))}if(this.camera.isOutsideViewport(this.playerPosition,.01)||this.camera.isBehindSafeLine(this.playerPosition)){this.failRun();return}this.resolveAirborneEnemyContact(t)}launch(){if(this.playerState!=="attached"&&this.playerState!=="charging")return!1;const e=this.getResolvedNode(this.attachedIndex),t=this.getOrbitSample(e,this.orbitAngle),i=this.scratchVector.set(t.tangent.x*this.orbitDirection,t.tangent.y*this.orbitDirection,0).normalize(),n=this.scratchVectorB.set(t.position.x,t.position.y,0).normalize(),a=(Math.max(1,t.position.length())*this.angularSpeed*.92+5.2+this.chargeMeter*8.5*(1+this.runUpgrades.modifiers.chargedLeapBonus))*this.momentum.jumpMultiplier*this.runUpgrades.modifiers.jumpPower*(1+this.runUpgrades.modifiers.speedBonus*.35);return this.playerVelocity.copy(i.multiplyScalar(a)).addScaledVector(n,a*.08),this.playerState="airborne",this.state=this.choiceMode==="reward_branch"?"upgrade_branching":"running_airborne",this.remainingExtraJumps=Math.max(0,this.runUpgrades.modifiers.extraJumps),this.chargeMeter=0,!0}performAirAction(){if(this.playerState!=="airborne")return!1;if(this.runUpgrades.modifiers.infiniteFlaps||this.remainingExtraJumps>0){this.runUpgrades.modifiers.infiniteFlaps||(this.remainingExtraJumps-=1);const e=4.2+this.runUpgrades.modifiers.jumpPower*1.6;return this.playerVelocity.y=Math.max(this.playerVelocity.y,0)+e,this.playerVelocity.x+=.9+this.momentum.gauge*1.6,!0}return!1}attachToNode(e,t,i,n){const r=this.getResolvedNode(e);this.attachedIndex=e,this.score=Math.max(this.score,e),this.stats.recordLanding(e,r.pathDistance,performance.now()),this.emitScore();let a=this.orbitAngle,o=e===0?-1:this.orbitDirection,c=Math.PI*2/Math.max(1.4,r.gameplayOrbitPeriod);if(t&&i&&n){const h=this.findBestOrbitAttachment(r,i);a=h.angle;const u=h.tangent.dot(this.scratchVector2.set(n.x,n.y));o=u>=0?1:-1;const f=Math.abs(u),m=Math.max(1.2,h.position.length());c=lt(f/m,Math.PI*2/Math.max(1.4,r.gameplayOrbitPeriod)*.72,Math.PI*2/Math.max(1.1,r.gameplayOrbitPeriod)*2.2),this.rewardMomentum(o,f,r)}else a=e===0?Math.PI*.18:0,o=e===0?-1:this.orbitDirection;this.orbitAngle=a,this.orbitDirection=o,this.angularSpeed=c,this.playerState="attached",this.state="running_attached",this.chargeActive=!1,this.chargeMeter=0,this.remainingExtraJumps=Math.max(0,this.runUpgrades.modifiers.extraJumps);const l=this.getOrbitSample(r,this.orbitAngle);this.playerPosition.set(r.resolvedX+l.position.x,r.resolvedY+l.position.y,r.resolvedZ),this.playerVelocity.set(0,0,0),this.collectCoinsOnCurrentNode(r),this.resolveEnemyContact(r),this.currentTime>=this.eventCooldownUntil&&this.resolveNodeEvent(r)}rewardMomentum(e,t,i){const n=lt((t-4.2)/7.5,0,1),r=this.lastLandingDirection!==0&&e!==this.lastLandingDirection,a=.08+n*.16+(r?.18:0)+(i.shapeKind==="triangular"?.03:i.shapeKind==="oval"?.015:0);this.momentum.gauge=lt(this.momentum.gauge+a*(1+this.runUpgrades.modifiers.momentumGain),0,Math.max(1,this.runUpgrades.modifiers.momentumCap)),this.momentum.fillRate=a,this.lastLandingDirection=e}resolveNodeEvent(e){var t;if(e.isMilestone){const i=hs(e.index,this.runUpgrades);this.activeChoices=this.path.createUpgradeBranches(e.index,i,this.score),this.choiceMode="reward_branch",this.state="upgrade_branching",this.eventCooldownUntil=this.currentTime+.2;return}switch(e.eventType){case"shop":{this.shop.openForRun(e.index,this.runUpgrades);const i=this.shop.getActiveOffers().slice(0,3);this.activeChoices=i.map(n=>({mode:"shop_orbit",offer:n.offer,price:n.price,entry:e,previewNodes:[],pathNodes:[]})),this.activeShopAngles=i.map(n=>n.angle),this.choiceMode="shop_orbit",this.state="upgrade_branching",this.eventCooldownUntil=this.currentTime+.2;break}case"treasure":this.stats.addCoins(this.applyCoinBonus(5)),this.startAcquisition(((t=this.activeChoices[0])==null?void 0:t.offer)??this.buildVirtualOffer("Treasure Chest","common","TRE","Gain 5 coins."),"Treasure");break;case"gift":{const i=hs(e.index,this.runUpgrades)[0];i&&this.applyOffer(i,"Gift shard");break}case"rare_item":{const i=hs(Math.max(100,e.index),this.runUpgrades)[0];i&&this.applyOffer(i,"Rare item");break}case"mini_boss":case"boss":this.boss.start(this.currentTime);break;case"boss_weak":this.boss.isWeakPointPhase()&&(this.boss.defeat(),this.stats.addCoins(this.applyCoinBonus(8)),this.fillMomentumBurst(.24));break}}commitRewardBranch(e,t){const i=this.activeChoices[e];return i?(this.path.replaceFuture(this.attachedIndex,i.pathNodes),this.path.ensureAhead(this.attachedIndex+1,50,40),this.path.queuePostMilestoneEvents(this.attachedIndex+i.pathNodes.length,this.attachedIndex+i.pathNodes.length),this.applyOffer(i.offer,t?"Quick choice":"Path chosen"),this.choiceMode="none",this.activeChoices=[],this.state="upgrade_acquired",this.eventCooldownUntil=this.currentTime+.35,!0):!1}applyOffer(e,t){this.runUpgrades=Am(this.runUpgrades,e.item.id),this.remainingExtraJumps=Math.max(0,this.runUpgrades.modifiers.extraJumps),this.shieldCharges=Math.max(this.shieldCharges,this.runUpgrades.modifiers.shieldCharges),this.startAcquisition(e,t)}startAcquisition(e,t){this.acquisitionStartedAt=this.currentTime,this.acquisition={offer:e,progress:0,subtitle:t}}buildVirtualOffer(e,t,i,n){return{item:{id:`virtual-${i}`,rarity:t,category:"economy",icon:i,unlockScore:0,stackable:!1,maxStacks:1,effects:["virtual"],name:{fr:e,en:e},description:{fr:n,en:n}},stackCount:0}}updateEvents(e,t,i){if(this.boss.update(e,t,this.playerPosition).playerHit&&this.failRun(),this.boss.isWeakPointPhase()){const r=this.findVisibleWeakPoint();r&&this.boss.setWeakPoint(new C(r.resolvedX,r.resolvedY,r.resolvedZ))}this.state==="upgrade_acquired"&&t>=this.eventCooldownUntil&&(this.state=this.playerState==="airborne"?"running_airborne":this.chargeActive?"running_charging":"running_attached"),this.updateAutoFire(t),this.shop.update(new C(i.resolvedX,i.resolvedY,i.resolvedZ),i.gameplayRadius+.7,t)}updateCamera(e,t,i){const n=lt((t.visualScale-2.8)/28,0,1.2),r=t.isGigantic?9.2:0,a=this.choiceMode==="reward_branch"?5.8:this.choiceMode==="shop_orbit"?2.4:this.state==="upgrade_acquired"?1.8:0,o=this.boss.getCameraZoomOffset(),c=(this.boss.isActive()?this.boss.getSpeedPressure():1)*this.momentum.speedMultiplier;this.camera.update({deltaTime:e,state:this.state,score:this.score,currentNode:t,nextNode:i,playerPosition:this.playerPosition,momentumGauge:lt(this.momentum.gauge,0,1),largeShardFactor:n,milestoneZoom:r,choiceZoom:a,bossZoom:o,speedPressure:c*(1-this.runUpgrades.modifiers.timeSlowFactor*.55)})}updateTrail(e){for(let i=this.trailPoints.length-1;i>0;i-=1)this.trailPoints[i].copy(this.trailPoints[i-1]);this.trailPoints[0].copy(this.playerPosition),this.trailPoints.forEach((i,n)=>{this.trailBuffer[n*3]=i.x,this.trailBuffer[n*3+1]=i.y,this.trailBuffer[n*3+2]=i.z});const t=this.playerTrail.geometry.getAttribute("position");t.needsUpdate=!0,this.playerTrail.material.opacity=.24+this.momentum.gauge*.36}syncPlayerVisual(e){this.player.position.copy(this.playerPosition);const t=Math.atan2(this.playerVelocity.y||.001,this.playerVelocity.x||.001);this.player.rotation.z=t,this.playerBody.scale.setScalar(1+this.momentum.gauge*.12+Math.sin(e*8)*.02)}syncMarkers(e){const t=this.getDisplayNodes(14),i=[],n=[];t.forEach(r=>{var a;r.coinSlots.forEach(o=>{o.collected||i.push({position:this.getCoinWorldPosition(r,o.angle,o.orbitScale),scale:.74+o.value*.08,visible:!0})}),(a=r.enemySlot)!=null&&a.alive&&n.push({position:this.getEnemyWorldPosition(r,r.enemySlot.pole),visible:!0,tier:r.enemySlot.tier})}),this.coins.setVisible(this.state!=="idle"&&this.state!=="transition_out"),this.enemies.setVisible(this.state!=="idle"&&this.state!=="transition_out"),this.coins.update(i,e),this.enemies.update(n,e)}fillMomentumBurst(e){this.momentum.gauge=lt(this.momentum.gauge+e*(1+this.runUpgrades.modifiers.momentumGain),0,Math.max(1,this.runUpgrades.modifiers.momentumCap)),this.momentum.fillRate=Math.max(this.momentum.fillRate,e)}collectCoinsOnCurrentNode(e){e.coinSlots.forEach(t=>{t.collected||Math.abs(jm(this.orbitAngle,t.angle))<.16+this.runUpgrades.modifiers.coinMagnet*.08&&(t.collected=!0,this.stats.addCoins(this.applyCoinBonus(t.value)))})}resolveEnemyContact(e){const t=e.enemySlot;if(!t||!t.alive||this.getEnemyWorldPosition(e,t.pole).distanceTo(this.playerPosition)>e.gameplayRadius*.36+.82)return;if(this.playerVelocity.length()>=t.speedThreshold||this.runUpgrades.modifiers.spikeOrbit){t.alive=!1,this.stats.addCoins(this.applyCoinBonus(t.rewardCoins)),this.fillMomentumBurst(.05);return}this.consumeProtectionOrFail()}resolveAirborneEnemyContact(e){for(let t=this.attachedIndex+1;t<=this.attachedIndex+4;t+=1){const i=this.getResolvedNode(t),n=i.enemySlot;if(!n||!n.alive||this.getEnemyWorldPosition(i,n.pole).distanceTo(this.playerPosition)>1.2)continue;this.playerVelocity.length()>=n.speedThreshold*.75||i===e?(n.alive=!1,this.stats.addCoins(this.applyCoinBonus(n.rewardCoins)),this.fillMomentumBurst(.08)):this.consumeProtectionOrFail();return}}consumeProtectionOrFail(){if(this.shieldCharges>0){this.shieldCharges-=1,this.fillMomentumBurst(.04);return}this.failRun()}updateAutoFire(e){if(!(this.runUpgrades.modifiers.autoCannonLevel<=0)&&!(e<this.autoFireReadyAt))for(let t=this.attachedIndex;t<this.attachedIndex+8;t+=1){const i=this.getResolvedNode(t),n=i.enemySlot;if(!(!n||!n.alive||n.tier==="invincible"||this.getEnemyWorldPosition(i,n.pole).distanceTo(this.playerPosition)>8.2)){n.alive=!1,this.stats.addCoins(this.applyCoinBonus(n.rewardCoins)),this.fillMomentumBurst(.04+this.runUpgrades.modifiers.autoCannonLevel*.01),this.autoFireReadyAt=e+Math.max(2.2,5-this.runUpgrades.modifiers.autoCannonLevel*1.1);return}}}applyCoinBonus(e){const t=this.runUpgrades.modifiers.doubleCoin?e*2:e;return Math.max(1,Math.round(t*(1+this.runUpgrades.modifiers.coinBonus)))}failRun(){this.state!=="game_over"&&(this.state="game_over",this.chargeActive=!1,this.choiceMode="none",this.activeChoices=[],this.shop.reset(),this.emitScore())}canCaptureNode(e){const t=e.gameplayRadius+Oo+this.runUpgrades.modifiers.captureRadius,i=this.playerPosition.x-e.resolvedX,n=this.playerPosition.y-e.resolvedY;return i*i+n*n<=t*t}findBestOrbitAttachment(e,t){let i=0,n=Number.POSITIVE_INFINITY,r=new ve,a=new ve(1,0);for(let o=0;o<72;o+=1){const c=o/72*Math.PI*2,l=this.getOrbitSample(e,c),h=e.resolvedX+l.position.x,u=e.resolvedY+l.position.y,f=(t.x-h)**2+(t.y-u)**2;f<n&&(n=f,i=c,r=l.position.clone(),a=l.tangent.clone())}return{angle:i,position:r,tangent:a}}getOrbitSample(e,t){const i=ko(t),n=e.shapeKind==="round"?0:e.resolvedSpinPhase,r=e.gameplayRadius+Oo;if(e.shapeKind==="oval"){const c=r*1.46,l=r*.84,h=new ve(Math.cos(i)*c,Math.sin(i)*l),u=new ve(-Math.sin(i)*c,Math.cos(i)*l).normalize();return this.rotateOrbitSample(h,u,n)}if(e.shapeKind==="triangular"){const c=r*1.18,l=[new ve(0,c*1.2),new ve(-c*1.04,-c*.86),new ve(c*1.04,-c*.86)],u=i/(Math.PI*2)*3,f=Math.floor(u)%3,m=u-Math.floor(u),g=l[f],_=l[(f+1)%3],p=g.clone().lerp(_,m),d=_.clone().sub(g).normalize();return this.rotateOrbitSample(p,d,n)}const a=new ve(Math.cos(i)*r,Math.sin(i)*r),o=new ve(-Math.sin(i),Math.cos(i));return this.rotateOrbitSample(a,o,0)}rotateOrbitSample(e,t,i){const n=Math.cos(i),r=Math.sin(i);return{position:new ve(e.x*n-e.y*r,e.x*r+e.y*n),tangent:new ve(t.x*n-t.y*r,t.x*r+t.y*n).normalize()}}getCoinWorldPosition(e,t,i){const n=this.getOrbitSample(e,t);return new C(e.resolvedX+n.position.x*i,e.resolvedY+n.position.y*i,e.resolvedZ)}getEnemyWorldPosition(e,t){const i=new ve(0,(t==="north"?1:-1)*(e.gameplayRadius+.58)),n=e.shapeKind==="round"?0:e.resolvedSpinPhase,r=Math.cos(n),a=Math.sin(n);return new C(e.resolvedX+i.x*r-i.y*a,e.resolvedY+i.x*a+i.y*r,e.resolvedZ)}getBranchHints(){if(this.choiceMode==="reward_branch")return this.activeChoices.slice(0,3).map((e,t)=>{const i=e.previewNodes[0]??e.entry;return{slot:t,offer:e.offer,worldPosition:new C(i.x,i.y+(t===1?2.4:t===0?3.2:-3.2),i.z),mode:"reward_branch"}});if(this.choiceMode==="shop_orbit"&&this.activeChoices.length>0){const e=this.getResolvedNode(this.attachedIndex);return this.activeChoices.slice(0,3).map((t,i)=>{const n=this.activeShopAngles[i]??0,r=e.gameplayRadius+2.1;return{slot:i,offer:t.offer,worldPosition:new C(e.resolvedX+Math.cos(n)*r,e.resolvedY+Math.sin(n)*r,e.resolvedZ),mode:"shop_orbit",price:t.price}})}return[]}findVisibleWeakPoint(){for(let e=this.attachedIndex+1;e<this.attachedIndex+18;e+=1){const t=this.getResolvedNode(e);if(t.eventType==="boss_weak")return t}return null}}class $m{constructor(){M(this,"yaw",0);M(this,"radius",26.5);M(this,"yawTarget",0);M(this,"radiusTarget",26.5);M(this,"yawVelocity",0);M(this,"height",2.6);M(this,"pose",new C);M(this,"lookAt",new C)}setRadius(e){this.radius=e,this.radiusTarget=e}orbit(e,t){const i=lt(e,-10,10);this.yawVelocity=lt(this.yawVelocity+i*85e-5,-.032,.032)}update(e,t){return this.yawTarget+=this.yawVelocity,this.yawVelocity=De(this.yawVelocity,0,11,e),this.yaw=De(this.yaw,this.yawTarget,10,e),this.radius=De(this.radius,this.radiusTarget,8,e),this.pose.set(t.x+Math.sin(this.yaw)*this.radius,t.y+this.height,t.z+Math.cos(this.yaw)*this.radius),this.lookAt.copy(t),{position:this.pose.clone(),lookAt:this.lookAt.clone()}}}class Km{constructor(e,t,i){M(this,"element");M(this,"canvas");M(this,"context");M(this,"content");M(this,"progress");M(this,"logo");M(this,"sites",[]);M(this,"cellCache",[]);M(this,"fragments",[]);M(this,"clickCount",0);M(this,"clickThreshold",8);M(this,"fractureIndex",0);M(this,"state","idle");M(this,"opacity",1);M(this,"shatterElapsed",0);M(this,"onBroken",null);M(this,"onHidden",null);M(this,"onPointerDown",e=>{if(this.state!=="idle")return;const t=this.canvas.getBoundingClientRect(),i=e.clientX-t.left,n=e.clientY-t.top;this.addFractureCluster(i,n),this.clickCount+=1,this.progress.style.setProperty("--intro-progress",String(this.clickCount/this.clickThreshold)),this.progress.textContent=`${this.clickCount}/${this.clickThreshold}`,this.clickCount>=this.clickThreshold?this.startShatter():this.draw()});M(this,"resize",()=>{this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.draw()});this.i18n=t,this.theme=i,this.element=document.createElement("div"),this.element.className="intro-layer",this.canvas=document.createElement("canvas"),this.canvas.className="intro-layer__canvas";const n=this.canvas.getContext("2d");if(!n)throw new Error("Canvas 2D context unavailable");this.context=n,this.content=document.createElement("div"),this.content.className="intro-layer__content",this.content.innerHTML=`
      <div class="intro-layer__logo-wrap">
        <img class="intro-layer__logo" alt="Ape Prod logo">
      </div>
      <h1 class="intro-layer__title"></h1>
      <p class="intro-layer__subtitle"></p>
      <div class="intro-layer__progress"></div>
    `,this.logo=this.content.querySelector(".intro-layer__logo"),this.progress=this.content.querySelector(".intro-layer__progress"),this.element.append(this.canvas,this.content),e.appendChild(this.element),this.element.addEventListener("pointerdown",this.onPointerDown),this.i18n.onChange(()=>this.renderText()),this.theme.onChange(()=>this.renderText()),window.addEventListener("resize",this.resize),this.resize(),this.renderText()}get isComplete(){return this.state==="hidden"}update(e){var t;this.state==="shattering"&&(this.shatterElapsed+=e,this.opacity=lt(1-this.shatterElapsed/1.35,0,1),this.fragments.forEach(i=>{i.centerX+=i.velocityX*e,i.centerY+=i.velocityY*e,i.velocityY+=320*e,i.rotation+=i.angularVelocity*e}),this.shatterElapsed>1.4&&(this.state="hidden",this.element.classList.add("is-hidden"),(t=this.onHidden)==null||t.call(this))),this.draw()}addFractureCluster(e,t){const n=this.fractureIndex+1;this.fractureIndex+=1;for(let r=0;r<9;r+=1){const a=r/9*Math.PI*2,o=18+(n*37+r*17)%44,c=Math.sin(n+r*.7)*18,l=Math.cos(n*1.3+r*.5)*18;this.sites.push({x:e+Math.cos(a)*o+c,y:t+Math.sin(a)*o+l,fractureId:n})}this.cellCache=this.sites.map(r=>this.computeCell(r))}computeCell(e){const t=[];for(let r=0;r<18;r+=1){const a=r/18*Math.PI*2;let o=44;for(const c of this.sites){if(c===e)continue;const l=Math.cos(a),h=Math.sin(a),u=c.x-e.x,f=c.y-e.y,m=2*(l*u+h*f),g=u*u+f*f;m>.001&&(o=Math.min(o,g/m))}t.push({x:e.x+Math.cos(a)*Math.max(8,o),y:e.y+Math.sin(a)*Math.max(8,o)})}return t}startShatter(){var e;this.state==="idle"&&(this.state="shattering",this.shatterElapsed=0,this.fragments=this.cellCache.map((t,i)=>{const n=t.reduce((o,c)=>o+c.x,0)/t.length,r=t.reduce((o,c)=>o+c.y,0)/t.length,a=Math.atan2(r-this.canvas.height/2,n-this.canvas.width/2);return{points:t,centerX:n,centerY:r,velocityX:Math.cos(a)*(60+i*2.5),velocityY:Math.sin(a)*(40+i*1.5)-20,angularVelocity:(Math.random()-.5)*4,rotation:0}}),(e=this.onBroken)==null||e.call(this))}draw(){const e=this.canvas.width,t=this.canvas.height,{context:i}=this;i.clearRect(0,0,e,t),i.save(),i.globalAlpha=this.opacity,i.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--color-bg").trim(),i.fillRect(0,0,e,t),this.state==="shattering"?(i.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue("--color-fg").trim(),i.lineWidth=1.1,this.fragments.forEach(n=>{i.save(),i.translate(n.centerX,n.centerY),i.rotate(n.rotation),i.beginPath(),n.points.forEach((r,a)=>{const o=r.x-n.centerX,c=r.y-n.centerY;a===0?i.moveTo(o,c):i.lineTo(o,c)}),i.closePath(),i.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--color-bg").trim(),i.fill(),i.stroke(),i.restore()})):(i.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue("--color-fg").trim(),i.fillStyle="rgba(0, 0, 0, 0)",i.lineWidth=1.2,this.cellCache.forEach(n=>{i.beginPath(),n.forEach((r,a)=>{a===0?i.moveTo(r.x,r.y):i.lineTo(r.x,r.y)}),i.closePath(),i.stroke()})),i.restore()}renderText(){this.content.querySelector(".intro-layer__title").textContent=this.i18n.t("introTitle"),this.content.querySelector(".intro-layer__subtitle").textContent=this.i18n.t("introSubtitle"),this.progress.textContent=`${this.clickCount}/${this.clickThreshold}`,this.progress.style.setProperty("--intro-progress",String(this.clickCount/this.clickThreshold)),this.logo.src=this.theme.current==="dark"?"/assets/images/Logo/LogoApeProdLight.svg":"/assets/images/Logo/LogoApeProdDark.svg"}}const xs={dark:{color:new Se("#D4BF9B"),emissive:new Se("#D4BF9B")},light:{color:new Se("#393F4A"),emissive:new Se("#393F4A")}};function Zm(s,e){const t=new Qp({color:xs[s].color.clone(),emissive:xs[s].emissive.clone(),emissiveIntensity:.12,roughness:.48,metalness:.18,flatShading:!0,transparent:!0,opacity:1});return t.onBeforeCompile=i=>{const n={uTime:{value:0},uHover:{value:0},uDrag:{value:0},uFocus:{value:0},uSettled:{value:0},uSnap:{value:0},uSeed:{value:e}};t.userData.shaderUniforms=n,Object.assign(i.uniforms,n),i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
attribute vec3 aFragmentDir;
attribute float aFragmentPhase;
uniform float uTime;
uniform float uHover;
uniform float uDrag;
uniform float uFocus;
uniform float uSettled;
uniform float uSnap;
uniform float uSeed;`).replace("#include <begin_vertex>",`vec3 transformed = vec3(position);
vec3 fragmentDir = vec3(0.0, 0.0, 1.0);
float fragmentPhase = 0.0;
#ifdef USE_UV
#endif
#ifdef USE_COLOR
#endif
fragmentDir = aFragmentDir;
fragmentPhase = aFragmentPhase;
float baseWave = sin(uTime * 2.4 + position.y * 5.5 + uSeed) * 0.14;
float sideWave = cos(uTime * 1.8 + position.x * 7.0 + uSeed) * 0.08;
float waveAttenuation = (1.0 - uHover * 0.22) * (1.0 - uSettled) * (1.0 - uSnap);
float dragWave = sin(uTime * 4.0 + position.x * 8.0 + uSeed) * 0.06 * uDrag;
float focusFlatten = mix(1.0, 0.08, uFocus);
float shardNoise = fract(sin(fragmentPhase * 37.31 + uSeed) * 43758.5453);
float snapPulse = sin(uTime * 5.4 + fragmentPhase * 11.0) * 0.5 + 0.5;
vec3 swirlAxis = normalize(vec3(-fragmentDir.y, fragmentDir.x, fragmentDir.z + 0.12));
vec3 shardOffset = fragmentDir * (0.14 + shardNoise * 0.26) * uSnap * snapPulse;
shardOffset += swirlAxis * (0.08 + shardNoise * 0.12) * uSnap;
transformed += normal * ((baseWave + sideWave) * waveAttenuation + dragWave) + shardOffset;
transformed.xy *= 1.0 + 0.04 * (1.0 - uSettled) + uDrag * 0.08 + uSnap * 0.05;
transformed.z *= focusFlatten;`)},t.customProgramCacheKey=()=>`shard-${e}`,t}function lr(s,e){s.color.copy(xs[e].color),s.emissive.copy(xs[e].emissive)}function Jm(s,e){const t=s.userData.shaderUniforms;t&&(t.uTime.value=e.time,t.uHover.value=e.hover,t.uDrag.value=e.drag,t.uFocus.value=e.focus,t.uSettled.value=e.settled,t.uSnap.value=e.snap)}function Qm(s,e){const t=new Dn(s,e).toNonIndexed();return Mc(t)}function eg(s,e){const t=new Ir(s,e).toNonIndexed();return Mc(t)}function Mc(s){const e=s.getAttribute("position"),t=new Float32Array(e.count*3),i=new Float32Array(e.count);for(let n=0;n<e.count;n+=3){const r=e.getX(n),a=e.getY(n),o=e.getZ(n),c=e.getX(n+1),l=e.getY(n+1),h=e.getZ(n+1),u=e.getX(n+2),f=e.getY(n+2),m=e.getZ(n+2),g=new C((r+c+u)/3,(a+l+f)/3,(o+h+m)/3).normalize(),_=n/3*.173;for(let p=0;p<3;p+=1){const d=(n+p)*3;t[d]=g.x,t[d+1]=g.y,t[d+2]=g.z,i[n+p]=_}}return s.setAttribute("aFragmentDir",new Ct(t,3)),s.setAttribute("aFragmentPhase",new Ct(i,1)),s}const tg=new C(0,.8,24),ig=new C(0,.2,17.5);class ng{constructor(e,t,i,n){M(this,"root",new Gt);M(this,"loader",new nm);M(this,"raycaster",new lm);M(this,"dragPlane",new gi(new C(0,0,1),0));M(this,"interactionPlanePoint",new C);M(this,"entities",new Map);M(this,"entityList");M(this,"pickTargets",[]);M(this,"pointer",new ve);M(this,"backgroundPoints");M(this,"focusTargetPosition",new C(0,.1,7.4));M(this,"pivot",new C(0,0,0));M(this,"roundGeometry",Qm(1.25,4));M(this,"triangularGeometry",eg(1.42,2));M(this,"constellationLines");M(this,"globalOrbitTime",0);M(this,"hoveredId",null);M(this,"focusedId",null);M(this,"draggingId",null);M(this,"activeIndex",0);M(this,"theme");M(this,"focusSettled",!1);M(this,"activeLookAt",new C);M(this,"externalLayoutActive",!1);M(this,"externalLayoutPositions",null);M(this,"externalLayoutScales",null);M(this,"externalLayoutVisuals",null);M(this,"externalTransitionFrom",[]);M(this,"externalTransitionTo",[]);M(this,"externalTransitionProgress",0);M(this,"speedAccentTimer",36);M(this,"speedAccentId",null);M(this,"unlockCallbacks",new Set);M(this,"slotPreviewIds",new Set);this.scene=e,this.slotSystem=i,this.theme=n,this.scene.add(this.root),this.backgroundPoints=this.createBackgroundPoints(),this.scene.add(this.backgroundPoints),this.constellationLines=this.createConstellationLines(),this.entityList=t.map((r,a)=>this.createShard(r,a))}setTheme(e){this.theme=e,this.entityList.forEach(t=>{lr(t.core.material,e),this.updateLogoTexture(t),t.slotIndicator.material.color.set(e==="dark"?"#D4BF9B":"#393F4A")}),this.backgroundPoints.material.color.set(e==="dark"?"#D4BF9B":"#393F4A"),this.constellationLines.forEach(t=>t.material.color.set(e==="dark"?"#D4BF9B":"#393F4A"))}setActiveIndex(e){this.activeIndex=us(e,this.entityList.length)}setHovered(e){this.hoveredId=e}setFocused(e){this.focusedId=e,this.focusSettled=!1,this.entityList.forEach(t=>{e&&t.project.id===e?t.runtimeState="focus_enter":t.runtimeState!=="dragging"&&(t.runtimeState=t.snapped?"snapped":"orbiting")})}isFocusSettled(){return this.focusSettled}clearFocus(){this.focusedId=null,this.focusSettled=!1,this.entityList.forEach(e=>{e.runtimeState=e.snapped?"snapped":"focus_exit",e.manualRotationY=0})}getFocusedProject(){var e;return this.focusedId&&((e=this.entities.get(this.focusedId))==null?void 0:e.project)||null}getFocusedFacetIndex(){var e;return this.focusedId?((e=this.entities.get(this.focusedId))==null?void 0:e.activeFacet)??0:0}changeFacet(e){if(!this.focusedId)return null;const t=this.entities.get(this.focusedId);return!t||t.facetAnimation.active?null:(t.facetAnimation={active:!0,direction:e,progress:0,swapped:!1},t.project.id)}previewFacetRotation(e){if(!this.focusedId)return;const t=this.entities.get(this.focusedId);!t||t.facetAnimation.active||(t.manualRotationY=mi.clamp(e*.007,-Math.PI/6,Math.PI/6))}finishFacetRotation(){if(!this.focusedId)return!1;const e=this.entities.get(this.focusedId);if(!e||e.facetAnimation.active)return!1;if(Math.abs(e.manualRotationY)>Math.PI/8){const t=e.manualRotationY>0?1:-1;return e.manualRotationY=0,this.changeFacet(t),!0}return e.manualRotationY=0,!1}beginDrag(e,t){if(this.focusedId)return!1;const i=this.entities.get(e);return i?(this.slotPreviewIds.delete(e),i.snapped&&(i.snapped=!1,this.slotSystem.deactivate(i.project.id)),this.draggingId=e,i.runtimeState="dragging",i.dragOffset.copy(i.group.position).sub(t),i.dragTarget.copy(i.group.position),this.dragPlane.constant=-i.group.position.z,!0):!1}updateDrag(e){if(!this.draggingId)return 0;const t=this.entities.get(this.draggingId);if(!t)return 0;t.dragTarget.copy(e).add(t.dragOffset),t.dragTarget.z=t.group.position.z;const i=this.slotSystem.getSlotForShard(t.project.id),n=this.slotSystem.getProximity(t.project.id,t.dragTarget);if(i&&n>0){const r=mi.clamp(.12+n*n*.62,.12,.74);t.dragTarget.x=mi.lerp(t.dragTarget.x,i.worldPosition.x,r),t.dragTarget.y=mi.lerp(t.dragTarget.y,i.worldPosition.y,r),t.dragTarget.z=mi.lerp(t.dragTarget.z,i.worldPosition.z,r)}return n}endDrag(){if(!this.draggingId)return{snapped:!1,unlocked:!1,shardId:null};const e=this.entities.get(this.draggingId),t=this.slotSystem.canSnap(e.project.id,e.dragTarget);let i=!1;t?(e.snapped=!0,e.runtimeState="snapped",e.dragTarget.set(t.worldPosition.x,t.worldPosition.y,t.worldPosition.z),e.velocity.set(0,0,0),this.slotSystem.activate(e.project.id),this.slotSystem.isUnlocked()&&(i=!0,this.unlockCallbacks.forEach(r=>r()))):e.runtimeState="orbiting";const n={snapped:!!t,unlocked:i,shardId:this.draggingId};return this.draggingId=null,n}pick(e,t,i,n){const r=i.getBoundingClientRect();this.pointer.x=(e-r.left)/r.width*2-1,this.pointer.y=-((t-r.top)/r.height)*2+1,this.raycaster.setFromCamera(this.pointer,n);const o=this.raycaster.intersectObjects(this.pickTargets,!1).find(c=>!!c.object.userData.shardId);return o?{shardId:o.object.userData.shardId,point:o.point.clone()}:null}projectPointerToDragPlane(e,t,i,n){const r=i.getBoundingClientRect();return this.pointer.x=(e-r.left)/r.width*2-1,this.pointer.y=-((t-r.top)/r.height)*2+1,this.raycaster.setFromCamera(this.pointer,n),this.raycaster.ray.intersectPlane(this.dragPlane,this.interactionPlanePoint.clone())}getProjectAt(e){var t;return((t=this.entityList[us(e,this.entityList.length)])==null?void 0:t.project)||null}getPivot(){return this.pivot.clone()}getOrbitCameraPose(){return this.activeLookAt.copy(this.pivot),{position:tg,lookAt:this.activeLookAt.clone()}}getFocusCameraPose(){const e=this.focusedId?this.entities.get(this.focusedId):null;return{position:ig,lookAt:(e==null?void 0:e.group.position.clone())||this.focusTargetPosition.clone()}}getFocusedEntityId(){return this.focusedId}onUnlocked(e){return this.unlockCallbacks.add(e),()=>this.unlockCallbacks.delete(e)}activateSlotPreview(){this.slotPreviewIds.clear(),this.entityList.forEach(e=>{this.slotPreviewIds.add(e.project.id),e.snapped=!1,!this.focusedId&&e.runtimeState!=="dragging"&&(e.runtimeState="orbiting")})}activateSlotPreviewForShard(e){if(!this.entities.has(e))return;this.slotPreviewIds.add(e);const t=this.entities.get(e);t&&!t.snapped&&!this.focusedId&&t.runtimeState!=="dragging"&&(t.runtimeState="orbiting")}snapShardToSlot(e){const t=this.entities.get(e),i=this.slotSystem.getSlotForShard(e);return!t||!i?!1:(this.slotPreviewIds.delete(e),t.snapped=!0,t.runtimeState="snapped",t.dragTarget.set(i.worldPosition.x,i.worldPosition.y,i.worldPosition.z),t.group.position.set(i.worldPosition.x,i.worldPosition.y,i.worldPosition.z),t.velocity.set(0,0,0),this.slotSystem.activate(e),this.slotSystem.isUnlocked()?(this.unlockCallbacks.forEach(n=>n()),!0):!1)}clearSlotPreview(){this.slotPreviewIds.clear()}getPresentationProjectId(){var e;return((e=this.entityList.find(t=>t.project.role==="presentation"))==null?void 0:e.project.id)??null}getDragThreshold(e){const t=this.entities.get(e);return t?t.project.role==="presentation"?3:t.snapped?4:8:8}getCurrentShardPositions(){return this.entityList.map(e=>e.group.position.clone())}getOrbitPositions(){return this.entityList.map((e,t)=>this.computeOrbitTarget(e,this.globalOrbitTime,t===this.activeIndex))}getSlotPositions(){return this.entityList.map(e=>{const t=this.slotSystem.getSlotForShard(e.project.id);return t?new C(t.worldPosition.x,t.worldPosition.y,t.worldPosition.z):e.group.position.clone()})}beginExternalLayoutTransition(e,t){this.externalLayoutActive=!0,this.externalLayoutPositions=null,this.externalLayoutScales=t?[...t]:null,this.externalLayoutVisuals=null,this.externalTransitionFrom=this.getCurrentShardPositions(),this.externalTransitionTo=e.map(i=>i.clone()),this.externalTransitionProgress=0}setExternalLayoutProgress(e){this.externalTransitionProgress=e}setExternalLayoutPositions(e,t,i){this.externalLayoutActive=!0,this.externalLayoutPositions=e.map(n=>n.clone()),this.externalLayoutScales=t?[...t]:null,this.externalLayoutVisuals=i?i.map(n=>({scale:n.scale.clone(),shapeKind:n.shapeKind,spinDirection:n.spinDirection,spinSpeed:n.spinSpeed,spinPhase:n.spinPhase,tint:n.tint,pulse:n.pulse})):null}clearExternalLayout(){this.externalLayoutActive=!1,this.externalLayoutPositions=null,this.externalLayoutScales=null,this.externalLayoutVisuals=null,this.externalTransitionFrom=[],this.externalTransitionTo=[],this.externalTransitionProgress=0}releaseSnappedShards(){this.entityList.forEach(e=>{e.snapped=!1,this.slotSystem.deactivate(e.project.id),!this.focusedId&&e.runtimeState!=="dragging"&&(e.runtimeState="orbiting")})}resetPortfolioState(){this.hoveredId=null,this.focusedId=null,this.draggingId=null,this.focusSettled=!1,this.clearExternalLayout(),this.clearSlotPreview(),this.entityList.forEach(e=>{e.snapped=!1,e.runtimeState="orbiting",e.manualRotationY=0,e.hoverAmount=0,e.dragAmount=0,e.focusAmount=0,e.opacity=1,e.slotPulse=0,e.facetAnimation={active:!1,direction:1,progress:0,swapped:!1},e.dragTarget.copy(e.group.position),e.dragOffset.set(0,0,0),e.velocity.set(0,0,0)}),this.updateConstellationLines()}setVisible(e){this.root.visible=e,this.backgroundPoints.visible=e}update(e,t,i){if(this.globalOrbitTime+=e,this.backgroundPoints.rotation.z+=e*.012,this.backgroundPoints.rotation.y+=e*.02,this.syncLivePivot(t),this.speedAccentTimer-=e,this.speedAccentTimer<=0)if(this.speedAccentId)this.speedAccentId=null,this.speedAccentTimer=28+Math.random()*20;else{const n=this.entityList.filter(a=>a.project.role==="project"),r=n[Math.floor(Math.random()*n.length)];this.speedAccentId=(r==null?void 0:r.project.id)??null,this.speedAccentTimer=8+Math.random()*6}if(this.entityList.forEach((n,r)=>{var y,E,H,V,Q,D,U;const a=n.project.id===this.focusedId,o=n.project.id===this.draggingId,c=r===this.activeIndex,l=this.slotSystem.getSlotForShard(n.project.id),h=this.slotPreviewIds.has(n.project.id);n.orbitBoostTarget=this.speedAccentId===n.project.id?1.055:1,n.orbitBoost=De(n.orbitBoost,n.orbitBoostTarget,.55,e);let f=this.computeOrbitTarget(n,t,c),m=c?1.1:1,g=this.focusedId?a?1:.26:1,_=n.snapped?"snapped":"orbiting";if(n.slotPulse=De(n.slotPulse,l!=null&&l.activated?1:this.slotSystem.getProximity(n.project.id,n.group.position),10,e),l&&(n.slotIndicator.position.set(l.worldPosition.x,l.worldPosition.y,l.worldPosition.z),n.slotIndicator.material.opacity=this.externalLayoutActive?0:n.slotPulse*(l.activated?.82:.52),n.slotIndicator.scale.setScalar(.8+n.slotPulse*.35+Math.sin(t*3+r)*.03)),this.externalLayoutActive){const O=((y=this.externalLayoutVisuals)==null?void 0:y[r])??null;if((E=this.externalLayoutPositions)!=null&&E[r]?f=this.externalLayoutPositions[r]:this.externalTransitionFrom[r]&&this.externalTransitionTo[r]&&(f=this.externalTransitionFrom[r].clone().lerp(this.externalTransitionTo[r],this.externalTransitionProgress)),m=(O==null?void 0:O.scale.x)??((H=this.externalLayoutScales)==null?void 0:H[r])??1.02,g=1,_="orbiting",O){n.group.rotation.x=De(n.group.rotation.x,0,9,e),n.group.rotation.y=De(n.group.rotation.y,0,9,e),n.group.rotation.z=De(n.group.rotation.z,O.shapeKind==="round"?0:O.spinPhase,8,e);const j=O.shapeKind==="triangular"?this.triangularGeometry:this.roundGeometry;n.core.geometry!==j&&(n.core.geometry=j),n.group.scale.x=De(n.group.scale.x,O.scale.x,6,e),n.group.scale.y=De(n.group.scale.y,O.scale.y,6,e),n.group.scale.z=De(n.group.scale.z,O.scale.z,6,e),O.tint?(n.core.material.color.set(O.tint),n.core.material.emissive.set(O.tint)):lr(n.core.material,this.theme)}else n.core.geometry!==this.roundGeometry&&(n.core.geometry=this.roundGeometry,lr(n.core.material,this.theme))}else o?(f=n.dragTarget,m=1.06,_="dragging"):n.snapped?(f=new C(l.worldPosition.x,l.worldPosition.y,l.worldPosition.z),m=1.08,_="snapped"):h&&l?(f=new C(l.worldPosition.x,l.worldPosition.y,l.worldPosition.z),m=1.04,_="snapped"):a&&(f=this.focusTargetPosition,m=2.55,_=i==="focus_exit"?"focus_exit":i==="focus"?"focused":"focus_enter");n.runtimeState==="focus_exit"&&!this.focusedId?(n.focusAmount=De(n.focusAmount,0,10,e),n.focusAmount<.05&&(n.runtimeState=n.snapped?"snapped":"orbiting")):n.runtimeState=_;const p=o?18:a?14:n.snapped?13:6.5;n.group.position.x=De(n.group.position.x,f.x,p,e),n.group.position.y=De(n.group.position.y,f.y,p,e),n.group.position.z=De(n.group.position.z,f.z,p,e);const d=this.hoveredId===n.project.id&&!this.focusedId&&!o?1:0,b=o?1:0,x=a?1:0;if(n.hoverAmount=De(n.hoverAmount,d,10,e),n.dragAmount=De(n.dragAmount,b,12,e),n.focusAmount=De(n.focusAmount,x,10,e),n.opacity=De(n.opacity,g,9,e),n.facetAnimation.active){n.facetAnimation.progress=Math.min(1,n.facetAnimation.progress+e*1.8);const O=Math.sin(n.facetAnimation.progress*Math.PI)*Math.PI*.92*n.facetAnimation.direction;n.manualRotationY=O,!n.facetAnimation.swapped&&n.facetAnimation.progress>=.5&&(n.activeFacet=us(n.activeFacet+n.facetAnimation.direction,n.project.facets.length),n.facetAnimation.swapped=!0),n.facetAnimation.progress>=1&&(n.facetAnimation.active=!1,n.manualRotationY=0)}else n.manualRotationY=De(n.manualRotationY,0,14,e);const A=a?0:n.group.rotation.x+e*(.11+r*.001),L=a?n.manualRotationY:n.group.rotation.y+e*(.18+r*.002),w=a?0:n.group.rotation.z+e*(.08+r*.0015);this.externalLayoutActive||(n.group.rotation.x=De(n.group.rotation.x,A,a?12:2,e),n.group.rotation.y=De(n.group.rotation.y,L,a?12:2,e),n.group.rotation.z=De(n.group.rotation.z,w,a?12:2,e));const P=a?.06:n.snapped?.96:1;this.externalLayoutActive||(n.core.geometry!==this.roundGeometry&&(n.core.geometry=this.roundGeometry),n.group.scale.x=De(n.group.scale.x,m,8,e),n.group.scale.y=De(n.group.scale.y,m,8,e),n.group.scale.z=De(n.group.scale.z,m*P,8,e)),n.core.material.opacity=n.opacity,n.core.material.emissiveIntensity=.08+n.hoverAmount*.18+(c?.08:0)+n.slotPulse*.06+(((Q=(V=this.externalLayoutVisuals)==null?void 0:V[r])==null?void 0:Q.pulse)??0);const z=((U=(D=this.externalLayoutVisuals)==null?void 0:D[r])==null?void 0:U.shapeKind)??null;Jm(n.core.material,{time:t,hover:n.hoverAmount,drag:n.dragAmount,focus:n.focusAmount,settled:this.externalLayoutActive?z&&z!=="round"?1:0:n.focusAmount*.25,snap:this.externalLayoutActive?0:n.snapped||h?.72+n.slotPulse*.16:0}),n.logoPlanes.forEach((O,j)=>{const X=this.externalLayoutActive||this.focusedId?0:n.opacity;O.material.opacity=X*(.65+j*.1)})}),this.updateConstellationLines(),this.focusedId){const n=this.entities.get(this.focusedId);this.focusSettled=!!(n&&Math.abs(n.group.position.x-this.focusTargetPosition.x)<.05&&Math.abs(n.group.position.y-this.focusTargetPosition.y)<.05&&Math.abs(n.group.position.z-this.focusTargetPosition.z)<.05&&Math.abs(n.group.scale.x-2.55)<.05)}else this.focusSettled=!1}syncLivePivot(e){const t=this.entityList.find(i=>i.project.role==="presentation");if(!t){this.pivot.set(0,0,0);return}this.pivot.set(t.layoutAnchor.x,t.layoutAnchor.y,t.layoutAnchor.z)}computeOrbitTarget(e,t,i){const n=e.orbitPhase+t*e.orbitSpeed*e.orbitBoost,r=e.layoutAnchor.clone();if(e.project.role==="presentation")return new C(this.pivot.x+Math.cos(n)*1.9,this.pivot.y+Math.sin(n*.85)*.72,this.pivot.z+Math.sin(n)*2.6+(i?.35:0));if(e.project.role==="hint")return new C(this.pivot.x+Math.sin(n*.42)*.45,this.pivot.y+Math.cos(n)*5.05,this.pivot.z+Math.sin(n)*4.2+(i?.24:0));const o=Math.atan2(r.y,r.x||1e-4)+n,c=4.1+Math.abs(r.x)*.6+Math.abs(r.y)*.2,l=mi.clamp(r.y*.05,-.36,.36),h=Math.cos(o)*c,u=Math.sin(o)*c,f=new C(this.pivot.x+h,this.pivot.y+r.y*.78+Math.sin(o*1.1+e.orbitHeight)*.55+u*l*.16,this.pivot.z+u+r.z*.45);return i&&(f.z+=.38),f}createShard(e,t){const i=new Gt,n=um(t),r=new C(n.x,n.y,n.z),a=Math.max(1,this.slotSystem.getSlots().length);i.position.copy(r),this.root.add(i);const o=this.roundGeometry,c=Zm(this.theme,t*17+11),l=new _t(o,c);l.userData.shardId=e.id,i.add(l),this.pickTargets.push(l);const h=new _t(new Dr(1,1.18,36),new ei({color:this.theme==="dark"?"#D4BF9B":"#393F4A",transparent:!0,opacity:0,side:qt,depthWrite:!1}));h.visible=!0,this.root.add(h);const u={project:e,group:i,core:l,logoPlanes:[],layoutAnchor:r,orbitRadius:r.length(),orbitPhase:t/a*Math.PI*2,orbitSpeed:e.role==="presentation"?.34:e.role==="hint"?.58:.38+t*.012,orbitBoost:1,orbitBoostTarget:1,orbitHeight:t*.9,orbitDepth:t*.55,velocity:new C,dragTarget:new C,dragOffset:new C,hoverAmount:0,dragAmount:0,focusAmount:0,opacity:1,activeFacet:0,runtimeState:"orbiting",snapped:!1,slotIndicator:h,slotPulse:0,manualRotationY:0,facetAnimation:{active:!1,direction:1,progress:0,swapped:!1}};return this.entities.set(e.id,u),this.createLogoPlanes(u),u}createLogoPlanes(e){const t=this.theme==="dark"?e.project.logo.dark:e.project.logo.light,i=1.7*e.project.logo.scale,n=[0,Math.PI*(2/3),Math.PI*(4/3)];this.loader.load(t,r=>{r.colorSpace=ht,r.anisotropy=4,n.forEach(a=>{const o=new Es(i,i,12,12),c=o.attributes.position;for(let u=0;u<c.count;u+=1){const f=c.getX(u),m=c.getY(u),g=Math.sqrt(f*f+m*m)/(i*.7);c.setZ(u,Math.sin(g*Math.PI*.5)*.22)}o.computeVertexNormals();const l=new ei({map:r,transparent:!0,opacity:e.project.logo.opacity,side:qt,depthWrite:!1}),h=new _t(o,l);h.position.set(Math.sin(a)*1.48,0,Math.cos(a)*1.48),h.lookAt(0,0,0),h.userData.shardId=e.project.id,e.group.add(h),e.logoPlanes.push(h),this.pickTargets.push(h)})})}updateLogoTexture(e){const t=this.theme==="dark"?e.project.logo.dark:e.project.logo.light;this.loader.load(t,i=>{i.colorSpace=ht,e.logoPlanes.forEach(n=>{n.material.map=i,n.material.needsUpdate=!0})})}createBackgroundPoints(){const e=new St,t=new Float32Array(240*3);for(let i=0;i<240;i+=1){const n=26+Math.random()*20,r=Math.random()*Math.PI*2,a=(Math.random()-.5)*18;t[i*3]=Math.cos(r)*n,t[i*3+1]=a,t[i*3+2]=Math.sin(r)*6-8}return e.setAttribute("position",new Ct(t,3)),new Jp(e,new _c({color:this.theme==="dark"?"#D4BF9B":"#393F4A",size:.08,transparent:!0,opacity:.35}))}createConstellationLines(){const e=()=>{const t=new St;t.setAttribute("position",new at([],3));const i=new Cr({color:this.theme==="dark"?"#D4BF9B":"#393F4A",transparent:!0,opacity:.9}),n=new xr(t,i);return this.root.add(n),n};return[e(),e(),e()]}updateConstellationLines(){if(this.externalLayoutActive){this.constellationLines.forEach(i=>{i.visible=!1});return}const e=this.slotSystem.getSlots();[[e[1],e[2],e[0],e[6],e[5]],[e[3],e[4],e[0],e[8],e[7]],[e[0],e[9]]].forEach((i,n)=>{const r=i.filter(Boolean).filter(c=>c.activated).map(c=>c.worldPosition),a=this.constellationLines[n];if(r.length<2){a.visible=!1,a.geometry.setAttribute("position",new at([],3));return}const o=new Float32Array(r.length*3);r.forEach((c,l)=>{o[l*3]=c.x,o[l*3+1]=c.y,o[l*3+2]=c.z}),a.visible=!0,a.geometry.setAttribute("position",new Ct(o,3)),a.geometry.computeBoundingSphere()})}}class Or{constructor(e){M(this,"slots");this.slots=e.map((t,i,n)=>({shardId:t,worldPosition:Or.computePosition(i,n.length),snapRadius:3.05,activated:!1}))}static computePosition(e,t){return dm(e<t?e:0)}getSlots(){return this.slots}getSlotForShard(e){return this.slots.find(t=>t.shardId===e)||null}getProximity(e,t){const i=this.getSlotForShard(e);if(!i||i.activated)return 0;const n=wo(i.worldPosition,t);return Math.max(0,1-n/(i.snapRadius*2.75))}canSnap(e,t){const i=this.getSlotForShard(e);return!i||i.activated?null:wo(i.worldPosition,t)<=i.snapRadius?i:null}activate(e){const t=this.getSlotForShard(e);return t?(t.activated=!0,t):null}deactivate(e){const t=this.getSlotForShard(e);return t?(t.activated=!1,t):null}reset(){this.slots.forEach(e=>{e.activated=!1})}isUnlocked(){return this.slots.every(e=>e.activated)}}class sg{constructor(e,t,i,n,r){M(this,"pointerDown",!1);M(this,"downX",0);M(this,"downY",0);M(this,"lastX",0);M(this,"lastY",0);M(this,"dragged",!1);M(this,"sceneOrbiting",!1);M(this,"downShardId",null);M(this,"focusGesture",!1);M(this,"onPointerDown",e=>{const t=this.getMode();if(t==="intro"||t==="intro_shattering"||t==="intro_transition"||t==="about_section"||t==="game_transition"||t==="game"||t==="game_over")return;this.pointerDown=!0,this.dragged=!1,this.sceneOrbiting=!1,this.focusGesture=!1,this.downX=e.clientX,this.downY=e.clientY,this.lastX=e.clientX,this.lastY=e.clientY,this.canvas.setPointerCapture(e.pointerId);const i=this.world.pick(e.clientX,e.clientY,this.canvas,this.camera);this.downShardId=(i==null?void 0:i.shardId)||null,!(t==="focus"||t==="focus_facet_transition"||t==="focus_enter")&&i&&this.callbacks.onHover(i.shardId)});M(this,"onPointerMove",e=>{const t=this.getMode(),i=e.clientX-this.downX,n=e.clientY-this.downY,r=e.clientX-this.lastX,a=e.clientY-this.lastY,o=Math.hypot(i,n);if(!this.pointerDown){if(t==="orbit"||t==="dragging"||t==="constellation_complete"){const l=this.world.pick(e.clientX,e.clientY,this.canvas,this.camera);this.callbacks.onHover((l==null?void 0:l.shardId)||null)}return}if(t==="focus"||t==="focus_enter"){Math.abs(i)>12&&Math.abs(i)>Math.abs(n)&&(this.focusGesture=!0,this.callbacks.onFocusRotation(i));return}const c=this.downShardId?this.world.getDragThreshold(this.downShardId):8;if((t==="orbit"||t==="constellation_complete"||t==="dragging")&&this.downShardId&&o>c){const l=this.world.projectPointerToDragPlane(e.clientX,e.clientY,this.canvas,this.camera);if(!l)return;this.dragged||(this.dragged=this.callbacks.onDragStart(this.downShardId,l)),this.dragged&&this.callbacks.onDragMove(l);return}(t==="orbit"||t==="constellation_complete")&&!this.downShardId&&o>4&&(this.sceneOrbiting=!0,this.callbacks.onSceneOrbitMove(r,a)),this.lastX=e.clientX,this.lastY=e.clientY});M(this,"onPointerUp",e=>{const t=this.getMode(),i=Math.hypot(e.clientX-this.downX,e.clientY-this.downY);if(this.canvas.hasPointerCapture(e.pointerId)&&this.canvas.releasePointerCapture(e.pointerId),this.dragged){this.callbacks.onDragEnd(),this.reset();return}if(t==="focus"||t==="focus_enter"){if(this.focusGesture)this.callbacks.onFocusRotationEnd();else{const n=this.world.pick(e.clientX,e.clientY,this.canvas,this.camera);n&&n.shardId===this.world.getFocusedEntityId()?this.callbacks.onFocusSideTap(e.clientX<window.innerWidth/2?"left":"right"):this.callbacks.onBackgroundClick()}this.reset();return}if(this.sceneOrbiting){this.reset();return}if((t==="orbit"||t==="constellation_complete")&&i<=8){const n=this.world.pick(e.clientX,e.clientY,this.canvas,this.camera);n?this.callbacks.onShardClick(n.shardId):this.callbacks.onHover(null)}this.reset()});M(this,"onPointerLeave",()=>{this.dragged&&this.callbacks.onDragEnd(),this.callbacks.onHover(null),this.reset()});this.canvas=e,this.camera=t,this.world=i,this.getMode=n,this.callbacks=r,this.canvas.addEventListener("pointerdown",this.onPointerDown),this.canvas.addEventListener("pointermove",this.onPointerMove),this.canvas.addEventListener("pointerup",this.onPointerUp),this.canvas.addEventListener("pointerleave",this.onPointerLeave)}reset(){this.pointerDown=!1,this.dragged=!1,this.sceneOrbiting=!1,this.focusGesture=!1,this.downShardId=null,this.lastX=0,this.lastY=0}}const rg={dark:{background:new Se("#393F4A"),foreground:new Se("#D4BF9B")},light:{background:new Se("#D4BF9B"),foreground:new Se("#393F4A")}};class ag{constructor(e){M(this,"scene",new Zp);M(this,"camera",new Nt(42,1,.1,200));M(this,"renderer",new gc({antialias:!0,alpha:!0,powerPreference:"high-performance"}));M(this,"cameraTarget",new C(0,.5,24));M(this,"cameraCurrent",new C(0,.5,24));M(this,"lookTarget",new C(0,0,0));M(this,"lookCurrent",new C(0,0,0));M(this,"ambientLight",new cm(16777215,.95));M(this,"keyLight",new om(16777215,1.4));M(this,"rimLight",new rm(16777215,25,80,2));M(this,"resize",()=>{const e=this.host.clientWidth||window.innerWidth,t=this.host.clientHeight||window.innerHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1)});this.host=e,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.domElement.className="app-canvas",this.host.appendChild(this.renderer.domElement),this.keyLight.position.set(12,10,16),this.rimLight.position.set(0,-6,22),this.scene.add(this.ambientLight,this.keyLight,this.rimLight),this.resize(),this.setTheme("dark"),window.addEventListener("resize",this.resize)}setTheme(e){const t=rg[e];this.scene.background=t.background.clone(),this.ambientLight.color.copy(t.foreground),this.keyLight.color.copy(t.foreground),this.rimLight.color.copy(t.foreground)}setCameraTarget(e,t){this.cameraTarget.copy(e),this.lookTarget.copy(t)}update(e){this.cameraCurrent.x=De(this.cameraCurrent.x,this.cameraTarget.x,8,e),this.cameraCurrent.y=De(this.cameraCurrent.y,this.cameraTarget.y,8,e),this.cameraCurrent.z=De(this.cameraCurrent.z,this.cameraTarget.z,8,e),this.lookCurrent.x=De(this.lookCurrent.x,this.lookTarget.x,8,e),this.lookCurrent.y=De(this.lookCurrent.y,this.lookTarget.y,8,e),this.lookCurrent.z=De(this.lookCurrent.z,this.lookTarget.z,8,e),this.rimLight.position.z=this.cameraCurrent.z-2,this.camera.position.copy(this.cameraCurrent),this.camera.lookAt(this.lookCurrent)}render(){this.renderer.render(this.scene,this.camera)}projectWorldToScreen(e){const t=e.clone().project(this.camera);return{x:(t.x+1)*.5*(this.host.clientWidth||window.innerWidth),y:(1-t.y)*.5*(this.host.clientHeight||window.innerHeight),visible:t.z>=-1&&t.z<=1}}}const en={title:{fr:"À propos",en:"About"},paragraphs:[{fr:"Passionné par la création sous toutes ses formes, je combine développement web, réalisation audiovisuelle, montage vidéo et design graphique pour donner vie à des projets uniques.",en:"Passionate about creation in all its forms, I combine web development, audiovisual production, video editing, and graphic design to bring unique projects to life."},{fr:"Mon approche multidisciplinaire me permet de créer des expériences complètes, de la conception à la réalisation.",en:"My multidisciplinary approach allows me to create complete experiences, from concept to delivery."}],skills:[{title:{fr:"Développement",en:"Development"},body:{fr:"JavaScript, React, Three.js, Node.js, Ruby on Rails",en:"JavaScript, React, Three.js, Node.js, Ruby on Rails"}},{title:{fr:"Réalisation",en:"Production"},body:{fr:"Direction artistique, scénarisation, storyboarding",en:"Art direction, scriptwriting, storyboarding"}},{title:{fr:"Vidéo",en:"Video"},body:{fr:"Montage, motion design, VFX, color grading",en:"Editing, motion design, VFX, color grading"}},{title:{fr:"Graphisme",en:"Design"},body:{fr:"UI/UX, branding, illustration, design system",en:"UI/UX, branding, illustration, design systems"}}],contactTitle:{fr:"Contact",en:"Contact"},contactText:{fr:"Intéressé par une collaboration ? N’hésitez pas à me contacter.",en:"Interested in collaborating? Feel free to reach out."}},og=[{id:"email",href:"mailto:contact.bheall@gmail.com",label:{fr:"Email",en:"Email"}},{id:"github",href:"https://github.com/orgs/ApeProd",label:{fr:"GitHub",en:"GitHub"}},{id:"x",href:"https://x.com/BhealLfr",label:{fr:"X",en:"X"}}];class cg{constructor(e,t){M(this,"element");M(this,"panel");M(this,"closeButton");M(this,"isOpen",!1);M(this,"onClose",null);this.i18n=t,this.element=document.createElement("div"),this.element.className="about-layer",this.panel=document.createElement("div"),this.panel.className="about-layer__panel",this.panel.dataset.uiInteractive="true",this.closeButton=document.createElement("button"),this.closeButton.className="about-layer__close",this.closeButton.type="button",this.closeButton.addEventListener("click",()=>this.close()),this.panel.appendChild(this.closeButton),this.element.appendChild(this.panel),this.element.addEventListener("click",i=>{i.target===this.element&&this.close()}),e.appendChild(this.element),this.i18n.onChange(i=>this.render(i)),this.render(this.i18n.current)}open(){this.isOpen=!0,this.element.classList.add("is-open")}close(){var e;this.isOpen&&(this.isOpen=!1,this.element.classList.remove("is-open"),(e=this.onClose)==null||e.call(this))}get opened(){return this.isOpen}render(e){this.closeButton.textContent=this.i18n.t("close");const t=en.skills.map(r=>`
          <article class="about-layer__skill">
            <h3>${r.title[e]}</h3>
            <p>${r.body[e]}</p>
          </article>
        `).join(""),i=og.map(r=>`
          <a class="about-layer__link" href="${r.href}" target="${r.id==="email"?"_self":"_blank"}" rel="noopener">
            ${r.label[e]}
          </a>
        `).join("");this.panel.innerHTML=`
      <button class="about-layer__close" type="button">${this.i18n.t("close")}</button>
      <h2>${en.title[e]}</h2>
      <p>${en.paragraphs[0][e]}</p>
      <p>${en.paragraphs[1][e]}</p>
      <div class="about-layer__skills">${t}</div>
      <h3>${en.contactTitle[e]}</h3>
      <p>${en.contactText[e]}</p>
      <div class="about-layer__links">${i}</div>
    `;const n=this.panel.querySelector(".about-layer__close");n&&n.addEventListener("click",()=>this.close())}}class lg{constructor(e,t,i){M(this,"element");M(this,"panel");M(this,"project",null);M(this,"facetIndex",0);M(this,"currentSlide",0);M(this,"gridView",!1);M(this,"callbacks");this.i18n=t,this.callbacks=i,this.element=document.createElement("div"),this.element.className="focus-layer",this.panel=document.createElement("div"),this.panel.className="focus-layer__panel",this.panel.dataset.uiInteractive="true",this.element.appendChild(this.panel),e.appendChild(this.element),this.element.addEventListener("click",n=>{n.target===this.element&&this.callbacks.onClose()}),this.i18n.onChange(()=>this.render())}show(e,t){this.project=e,this.facetIndex=t,this.currentSlide=0,this.gridView=!1,this.render(),this.element.classList.add("is-visible")}hide(){this.element.classList.remove("is-visible"),this.project=null}updateFacet(e){this.facetIndex=e,this.currentSlide=0,this.gridView=!1,this.render()}render(){var o,c;if(!this.project){this.panel.innerHTML="";return}const e=this.i18n.current,t=this.project.facets[this.facetIndex],i=t.images.slice(0,12),n=i[this.currentSlide]||"";this.panel.innerHTML=`
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
    `;const r=this.panel.querySelector(".focus-layer__close"),a=this.panel.querySelectorAll(".focus-layer__facet-btn");r==null||r.addEventListener("click",()=>this.callbacks.onClose()),(o=a[0])==null||o.addEventListener("click",()=>this.callbacks.onPrevFacet()),(c=a[1])==null||c.addEventListener("click",()=>this.callbacks.onNextFacet()),this.bindMediaEvents(i)}renderMedia(e,t){return e.length===0?`<div class="focus-layer__empty">${this.i18n.t("media")}</div>`:e.length===1?`<img class="focus-layer__image" src="${e[0]}" alt="Project media">`:this.gridView?`
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
    `}renderLinks(){if(!this.project)return"";const e=this.project.facets[this.facetIndex],t=Object.entries(e.links).filter(([,i])=>i);return t.length===0?`<span class="focus-layer__empty">${this.i18n.t("links")}</span>`:t.map(([i,n])=>`<a class="focus-layer__link" href="${n}" target="_blank" rel="noopener">${i.toUpperCase()}</a>`).join("")}bindMediaEvents(e){if(e.length<=1)return;const t=this.panel.querySelector(".focus-layer__image"),i=this.panel.querySelectorAll(".focus-layer__slide-nav"),n=this.panel.querySelectorAll(".focus-layer__thumb");t==null||t.addEventListener("click",()=>{this.gridView=!0,this.render()}),i.forEach(r=>r.addEventListener("click",()=>{const a=Number(r.dataset.slideDir)||0;this.currentSlide=(this.currentSlide+a+e.length)%e.length,this.render()})),n.forEach(r=>r.addEventListener("click",()=>{this.currentSlide=Number(r.dataset.slide)||0,this.gridView=!1,this.render()}))}}class hg{constructor(e,t){M(this,"element");M(this,"titleElement");M(this,"bodyElement");M(this,"currentStep","intro");this.host=e,this.i18n=t,this.element=document.createElement("div"),this.element.className="guide-bubble",this.titleElement=document.createElement("p"),this.titleElement.className="guide-bubble__title",this.bodyElement=document.createElement("p"),this.bodyElement.className="guide-bubble__body",this.element.append(this.titleElement,this.bodyElement),this.host.appendChild(this.element),this.i18n.onChange(()=>this.render()),this.render()}setStep(e){e!==this.currentStep&&(this.currentStep=e,this.render())}render(){const e=this.currentStep==="unlocked"?this.i18n.t("unlocked"):this.i18n.t("home"),t={intro:this.i18n.t("introHint"),orbit:this.i18n.t("orbitHint"),focus:this.i18n.t("focusHint"),drag:this.i18n.t("dragHint"),slots:this.i18n.t("slotHint"),unlocked:this.i18n.t("unlockedHint")}[this.currentStep];this.titleElement.textContent=e,this.bodyElement.textContent=t}}const ug={fr:{theme:"Thème",language:"Langue",about:"About / Outro",backToOrbit:"Retour à l’orbite",unlocked:"Mini-jeu débloqué",locked:"Mini-jeu verrouillé",close:"Fermer",previous:"Précédent",next:"Suivant",technologies:"Technologies",links:"Liens",media:"Médias",clickToGrid:"Cliquez sur le média pour afficher la grille.",introTitle:"Portfolio",introSubtitle:"Bilel Kharbouche",introHint:"Cliquez plusieurs fois pour fissurer la surface.",orbitHint:"Cliquez une shard pour la mettre en focus.",focusHint:"Glissez horizontalement ou utilisez les flèches pour changer de facette.",dragHint:"Faites glisser une shard hors focus pour chercher sa place secrète.",slotHint:"La bonne place réagit quand la bonne shard s’en approche.",unlockedHint:"Toutes les shards sont placées. Le mini-jeu est prêt à être branché.",aboutTitle:"About / Outro",home:"Accueil",gameScore:"Score",gameBest:"Meilleur score",gameBestDistance:"Meilleure distance",gameChain:"Chaîne",gameMomentum:"Momentum",gameCharge:"Charge",gameDistance:"Distance",gameCoins:"Pièces",gameSplits:"Splits",gameRestart:"Recommencer",gamePortfolio:"Portfolio",gameStatusTransition:"Le chemin s’aligne.",gameStatusRunning:"Maintenez bas pour charger. Haut pour sauter.",gameStatusUpgrade:"Sautez vers une branche pour choisir votre item.",gameStatusGameOver:"Run terminée.",gameUpgradeTitle:"Choisissez une amélioration",gameUpgradeHint:"Sautez vers une branche. 1, 2, 3 restent disponibles en secours.",gameShopTitle:"Marché orbital",gameShopHint:"Tournez autour de la shard pour acheter une offre.",gamePathLeft:"Voie gauche",gamePathCenter:"Voie centrale",gamePathRight:"Voie droite",gamePathUpper:"Voie haute",gamePathForward:"Voie frontale",gamePathLower:"Voie basse",gameShopOffer:"Offre orbitale",gamePrice:"Prix",gameOverTitle:"Game Over",gameOverBody:"La caméra vous a dépassé ou la trajectoire a été manquée.",gameAcquired:"Objet acquis"},en:{theme:"Theme",language:"Language",about:"About / Outro",backToOrbit:"Back to orbit",unlocked:"Mini-game unlocked",locked:"Mini-game locked",close:"Close",previous:"Previous",next:"Next",technologies:"Technologies",links:"Links",media:"Media",clickToGrid:"Click the media to open the grid.",introTitle:"Portfolio",introSubtitle:"Bilel Kharbouche",introHint:"Click repeatedly to fracture the surface.",orbitHint:"Click a shard to focus it.",focusHint:"Swipe or drag horizontally to change facets.",dragHint:"Drag a shard outside focus to look for its hidden slot.",slotHint:"The correct slot reacts when the correct shard gets close.",unlockedHint:"All shards are placed. The mini-game hook is ready.",aboutTitle:"About / Outro",home:"Home",gameScore:"Score",gameBest:"Best",gameBestDistance:"Best distance",gameChain:"Chain",gameMomentum:"Momentum",gameCharge:"Charge",gameDistance:"Distance",gameCoins:"Coins",gameSplits:"Splits",gameRestart:"Restart",gamePortfolio:"Portfolio",gameStatusTransition:"Aligning the path.",gameStatusRunning:"Hold Down to charge. Press Up to jump.",gameStatusUpgrade:"Jump into a branch to claim an item.",gameStatusGameOver:"Run over.",gameUpgradeTitle:"Choose an upgrade",gameUpgradeHint:"Jump into a branch. 1, 2, 3 remain available as fallback.",gameShopTitle:"Orbital market",gameShopHint:"Rotate around the shard to buy one offer.",gamePathLeft:"Left path",gamePathCenter:"Center path",gamePathRight:"Right path",gamePathUpper:"Upper path",gamePathForward:"Forward path",gamePathLower:"Lower path",gameShopOffer:"Orbital offer",gamePrice:"Price",gameOverTitle:"Game Over",gameOverBody:"The camera overtook you or the jump line was lost.",gameAcquired:"Item acquired"}};class dg{constructor(){M(this,"language");M(this,"listeners",new Set);const e=window.localStorage.getItem("portfolio-language");this.language=e==="en"?"en":"fr",document.documentElement.lang=this.language}get current(){return this.language}toggle(){this.language=this.language==="fr"?"en":"fr",window.localStorage.setItem("portfolio-language",this.language),document.documentElement.lang=this.language,this.listeners.forEach(e=>e(this.language))}t(e){return ug[this.language][e]}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}}class fg{constructor(e,t,i,n){M(this,"element");M(this,"topbar");M(this,"activeChip");M(this,"themeButton");M(this,"languageButton");M(this,"aboutButton");M(this,"homeButton");M(this,"unlockChip");M(this,"dots",[]);this.i18n=t,this.content=i,this.element=document.createElement("div"),this.element.className="navigation-hud",this.topbar=document.createElement("div"),this.topbar.className="navigation-hud__topbar",this.activeChip=document.createElement("div"),this.activeChip.className="navigation-hud__chip",this.themeButton=this.createButton(()=>n.onThemeToggle()),this.languageButton=this.createButton(()=>n.onLanguageToggle()),this.aboutButton=this.createButton(()=>n.onAboutToggle()),this.homeButton=this.createButton(()=>n.onHome()),this.unlockChip=document.createElement("div"),this.unlockChip.className="navigation-hud__chip navigation-hud__chip--status",this.topbar.append(this.activeChip,this.homeButton,this.themeButton,this.languageButton,this.aboutButton,this.unlockChip);const r=document.createElement("div");r.className="navigation-hud__rail",this.content.getProjects().forEach((a,o)=>{const c=document.createElement("button");c.className="navigation-hud__dot",c.type="button",c.addEventListener("click",()=>n.onProjectSelect(o)),r.appendChild(c),this.dots.push(c)}),this.element.append(this.topbar,r),e.appendChild(this.element),this.i18n.onChange(()=>this.renderStatic()),this.renderStatic()}setActiveProject(e,t){const i=this.content.getProjectByOrder(e);this.activeChip.textContent=i?i.title[t]:"",this.dots.forEach((n,r)=>{var a;n.classList.toggle("is-active",r===e),n.title=((a=this.content.getProjectByOrder(r))==null?void 0:a.title[t])||""})}setUnlocked(e){this.unlockChip.textContent=e?this.i18n.t("unlocked"):this.i18n.t("locked"),this.unlockChip.classList.toggle("is-unlocked",e)}setAboutOpen(e){this.aboutButton.classList.toggle("is-active",e)}createButton(e){const t=document.createElement("button");return t.className="navigation-hud__button",t.type="button",t.addEventListener("click",e),t}renderStatic(){this.themeButton.textContent=this.i18n.t("theme"),this.languageButton.textContent=this.i18n.t("language"),this.aboutButton.textContent=this.i18n.t("about"),this.homeButton.textContent=this.i18n.t("home")}}class pg{constructor(){M(this,"theme");M(this,"listeners",new Set);const e=window.localStorage.getItem("portfolio-theme");e==="dark"||e==="light"?this.theme=e:this.theme=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",this.applyTheme()}get current(){return this.theme}toggle(){this.theme=this.theme==="dark"?"light":"dark",this.applyTheme()}set(e){e!==this.theme&&(this.theme=e,this.applyTheme())}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}applyTheme(){document.documentElement.dataset.theme=this.theme,window.localStorage.setItem("portfolio-theme",this.theme),this.listeners.forEach(e=>e(this.theme))}}const mg={intro:["intro_shattering"],intro_shattering:["intro_transition"],intro_transition:["orbit"],orbit:["dragging","focus_enter","about_section","constellation_complete","game_transition"],dragging:["orbit","constellation_complete","game_transition"],focus_enter:["focus","focus_exit"],focus:["focus_facet_transition","focus_exit"],focus_facet_transition:["focus"],focus_exit:["orbit","constellation_complete"],about_section:["orbit","constellation_complete"],constellation_complete:["focus_enter","about_section","orbit","game_transition"],game_transition:["game","orbit","constellation_complete"],game:["game_over","orbit","game_transition"],game_over:["game","orbit","game_transition"]};class gg{constructor(){M(this,"mode","intro");M(this,"listeners",new Set)}get current(){return this.mode}is(e){return this.mode===e}canTransition(e){return e===this.mode?!0:mg[this.mode].includes(e)}setMode(e){if(!this.canTransition(e))throw new Error(`Invalid mode transition from ${this.mode} to ${e}`);if(e===this.mode)return;const t=this.mode;this.mode=e,this.listeners.forEach(i=>i(e,t))}onChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}}class _g{constructor(e){M(this,"running",!1);M(this,"frameId",0);M(this,"lastTime",0);M(this,"tick",e=>{if(!this.running)return;const t=Math.min((e-this.lastTime)/1e3,.1);this.lastTime=e,this.onFrame(t,e/1e3),this.frameId=requestAnimationFrame(this.tick)});this.onFrame=e}start(){this.running||(this.running=!0,this.lastTime=performance.now(),this.frameId=requestAnimationFrame(this.tick))}stop(){this.running=!1,cancelAnimationFrame(this.frameId)}}const vg={linear:s=>s,easeOutCubic:s=>1-Math.pow(1-s,3),easeInOutCubic:s=>s<.5?4*s*s*s:1-Math.pow(-2*s+2,3)/2,easeOutQuint:s=>1-Math.pow(1-s,5)};class xg{constructor(){M(this,"tweens",new Map);M(this,"nextId",1)}animate(e){const t=this.nextId++,i={id:t,elapsed:0,...e};return i.onUpdate(i.from),this.tweens.set(t,i),t}cancel(e){this.tweens.delete(e)}clear(){this.tweens.clear()}update(e){var t;for(const i of this.tweens.values()){i.elapsed+=e;const n=Math.min(1,i.elapsed/i.duration),r=vg[i.easing](n);i.onUpdate(i.from+(i.to-i.from)*r),n>=1&&(this.tweens.delete(i.id),(t=i.onComplete)==null||t.call(i))}}}class yg{constructor(e){M(this,"content",new Mm);M(this,"theme",new pg);M(this,"i18n",new dg);M(this,"mode",new gg);M(this,"transitions",new xg);M(this,"root");M(this,"canvasHost");M(this,"uiHost");M(this,"renderer");M(this,"slotSystem");M(this,"world");M(this,"intro");M(this,"guide");M(this,"hud");M(this,"about");M(this,"focus");M(this,"gameHud");M(this,"game");M(this,"interaction");M(this,"loop");M(this,"cameraOrbit",new $m);M(this,"introStartCameraPosition",new C(0,1.6,42));M(this,"introStartLookAt",new C(0,0,0));M(this,"cameraFocusBlend",0);M(this,"introTransitionProgress",0);M(this,"gameTransitionProgress",0);M(this,"activeIndex",0);M(this,"lastWheelAt",0);M(this,"hasFocused",!1);M(this,"hasChangedFacet",!1);M(this,"hasDragged",!1);M(this,"seenFacetsByProject",new Map);M(this,"pendingPostFocusExit",null);M(this,"didRunIntroPresentationFocus",!1);M(this,"gameTransitionTweenId",null);M(this,"mobileChargePointerId",null);M(this,"mobileChargeStartY",0);M(this,"mobileChargeStartedAt",0);M(this,"onWheel",e=>{(this.mode.is("orbit")||this.mode.is("constellation_complete"))&&(Date.now()-this.lastWheelAt<120||(this.lastWheelAt=Date.now(),e.preventDefault(),this.stepActiveIndex(e.deltaY>0?1:-1)))});M(this,"onKeyDown",e=>{if(this.mode.is("game_transition")){e.key==="Escape"&&(e.preventDefault(),this.exitGame());return}if(this.mode.is("game")||this.mode.is("game_over")){if(e.key==="Escape"){e.preventDefault(),this.exitGame();return}if(this.mode.is("game")){if(this.game.getHudState().state==="upgrade_choice"&&(e.key==="1"||e.key==="2"||e.key==="3")){e.preventDefault(),this.game.selectUpgradeFallback(Number(e.key)-1)&&this.refreshUI();return}e.key==="ArrowDown"?(e.preventDefault(),this.game.setChargeActive(!0)):e.key==="ArrowUp"&&(e.preventDefault(),this.game.triggerJump());return}(e.key==="Enter"||e.key===" "||e.key==="ArrowUp")&&(e.preventDefault(),this.restartGame());return}if(!(this.mode.is("intro")||this.mode.is("intro_shattering")||this.mode.is("intro_transition"))){if(e.key==="Escape"){this.about.opened?this.about.close():this.exitFocus();return}if(this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition")){e.key==="ArrowLeft"?(e.preventDefault(),this.changeFacet(-1)):e.key==="ArrowRight"&&(e.preventDefault(),this.changeFacet(1));return}if(this.mode.is("orbit")||this.mode.is("constellation_complete")){if(e.key==="ArrowLeft"||e.key==="ArrowUp")e.preventDefault(),this.stepActiveIndex(-1);else if(e.key==="ArrowRight"||e.key==="ArrowDown")e.preventDefault(),this.stepActiveIndex(1);else if(e.key==="Enter"||e.key===" "){e.preventDefault();const t=this.content.getProjectByOrder(this.activeIndex);t&&this.enterFocus(t.id)}}}});M(this,"onKeyUp",e=>{this.mode.is("game")&&e.key==="ArrowDown"&&this.game.setChargeActive(!1)});M(this,"onGamePointerDown",e=>{if(this.mode.is("game_over")){e.preventDefault(),this.restartGame();return}this.mode.is("game")&&(this.mobileChargePointerId=e.pointerId,this.mobileChargeStartY=e.clientY,this.mobileChargeStartedAt=performance.now(),this.game.setChargeActive(!0))});M(this,"onGamePointerUp",e=>{if(!this.mode.is("game")||this.mobileChargePointerId!==e.pointerId)return;const t=this.mobileChargeStartY-e.clientY,i=performance.now()-this.mobileChargeStartedAt;!this.game.setChargeActive(!1)&&(i<180||t>12)&&(this.game.triggerJump(),e.preventDefault()),this.mobileChargePointerId=null,this.mobileChargeStartedAt=0});M(this,"onGamePointerCancel",e=>{this.mobileChargePointerId===e.pointerId&&(this.mobileChargePointerId=null,this.mobileChargeStartedAt=0,this.game.setChargeActive(!1))});this.root=document.createElement("div"),this.root.className="app-shell",this.canvasHost=document.createElement("div"),this.canvasHost.className="app-shell__canvas",this.uiHost=document.createElement("div"),this.uiHost.className="app-shell__ui",this.root.append(this.canvasHost,this.uiHost),e.appendChild(this.root),this.renderer=new ag(this.canvasHost),this.slotSystem=new Or(this.content.getProjects().map(t=>t.id)),this.world=new ng(this.renderer.scene,this.content.getProjects(),this.slotSystem,this.theme.current),this.game=new Ym(this.renderer.scene,this.theme.current),this.hud=new fg(this.uiHost,this.i18n,this.content,{onThemeToggle:()=>this.theme.toggle(),onLanguageToggle:()=>this.i18n.toggle(),onAboutToggle:()=>this.toggleAbout(),onHome:()=>this.returnHome(),onProjectSelect:t=>this.selectProject(t)}),this.about=new cg(this.uiHost,this.i18n),this.focus=new lg(this.uiHost,this.i18n,{onClose:()=>this.exitFocus(),onPrevFacet:()=>this.changeFacet(-1),onNextFacet:()=>this.changeFacet(1)}),this.guide=new hg(this.uiHost,this.i18n),this.intro=new Km(this.uiHost,this.i18n,this.theme),this.gameHud=new wm(this.uiHost,this.i18n,{onRestart:()=>this.restartGame(),onExit:()=>this.exitGame(),onSelectUpgrade:t=>{this.game.selectUpgradeFallback(t)&&this.refreshUI()}}),this.interaction=new sg(this.renderer.renderer.domElement,this.renderer.camera,this.world,()=>this.mode.current,{onShardClick:t=>this.enterFocus(t),onBackgroundClick:()=>{(this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition"))&&this.exitFocus()},onHover:t=>this.world.setHovered(t),onDragStart:(t,i)=>{if(!(this.mode.is("orbit")||this.mode.is("constellation_complete")))return!1;const n=this.world.beginDrag(t,i);return n&&(this.mode.setMode("dragging"),this.world.setHovered(null)),n},onDragMove:t=>{this.world.updateDrag(t)},onDragEnd:()=>{const t=this.world.endDrag();t.shardId&&(this.hasDragged=!0),!t.unlocked&&this.mode.is("dragging")&&this.resumeOrbitMode(),this.refreshUI(),this.updateGuide()},onSceneOrbitMove:(t,i)=>{(this.mode.is("orbit")||this.mode.is("constellation_complete"))&&this.cameraOrbit.orbit(-t,i)},onFocusRotation:t=>this.world.previewFacetRotation(t),onFocusRotationEnd:()=>{this.world.finishFacetRotation()&&(this.mode.setMode("focus_facet_transition"),this.scheduleFacetCompletion())},onFocusSideTap:t=>this.changeFacet(t==="left"?-1:1)}),this.interaction,this.loop=new _g((t,i)=>this.update(t,i)),this.bindEvents(),this.refreshUI(),this.updateGuide(),this.loop.start()}bindEvents(){this.theme.onChange(t=>{this.renderer.setTheme(t),this.world.setTheme(t),this.game.setTheme(t),this.refreshUI()}),this.i18n.onChange(()=>{this.refreshUI();const t=this.world.getFocusedProject();t&&this.focus.show(t,this.world.getFocusedFacetIndex()),(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))&&this.gameHud.update(this.getGameHudPayload())}),this.game.onScoreChange(()=>{(this.mode.is("game")||this.mode.is("game_over"))&&this.refreshUI()}),this.about.onClose=()=>{this.mode.is("about_section")&&(this.resumeOrbitMode(),this.refreshUI(),this.updateGuide())},this.intro.onBroken=()=>{this.mode.is("intro")&&(this.mode.setMode("intro_shattering"),window.setTimeout(()=>{this.mode.is("intro_shattering")&&this.mode.setMode("intro_transition")},60),this.transitions.animate({from:0,to:1,duration:2.6,easing:"easeOutQuint",onUpdate:t=>{this.introTransitionProgress=t},onComplete:()=>{if(this.introTransitionProgress=1,this.resumeOrbitMode(),this.refreshUI(),this.updateGuide(),!this.didRunIntroPresentationFocus){const t=this.world.getPresentationProjectId();t&&(this.didRunIntroPresentationFocus=!0,this.activeIndex=0,this.world.setActiveIndex(0),window.setTimeout(()=>{this.mode.is("orbit")&&this.enterFocus(t)},220))}}}))},this.world.onUnlocked(()=>{this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over")||(this.mode.is("constellation_complete")||(this.mode.is("dragging")||this.mode.is("orbit"))&&this.mode.setMode("constellation_complete"),this.refreshUI(),this.updateGuide(),this.transitions.animate({from:0,to:1,duration:.9,easing:"easeOutCubic",onUpdate:()=>{},onComplete:()=>{this.slotSystem.isUnlocked()&&this.startGameTransition()}}))}),window.addEventListener("wheel",this.onWheel,{passive:!1}),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp);const e=this.renderer.renderer.domElement;e.addEventListener("pointerdown",this.onGamePointerDown),e.addEventListener("pointerup",this.onGamePointerUp),e.addEventListener("pointercancel",this.onGamePointerCancel)}stepActiveIndex(e){this.activeIndex=us(this.activeIndex+e,this.content.getProjectCount()),this.world.setActiveIndex(this.activeIndex),this.refreshUI()}selectProject(e){if(this.mode.is("intro")||this.mode.is("intro_shattering")||this.mode.is("intro_transition")||this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))return;this.about.opened&&this.about.close(),this.activeIndex=e,this.world.setActiveIndex(e),this.refreshUI();const t=this.content.getProjectByOrder(e);t&&(this.mode.is("orbit")||this.mode.is("constellation_complete"))&&this.enterFocus(t.id)}enterFocus(e){(this.mode.is("orbit")||this.mode.is("constellation_complete"))&&(this.mode.setMode("focus_enter"),this.world.setFocused(e),this.world.setHovered(null),this.refreshUI())}exitFocus(e){if(!(this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition"))){e==null||e();return}const t=this.world.getFocusedProject();this.pendingPostFocusExit=e||null,this.focus.hide(),this.mode.setMode("focus_exit"),this.world.clearFocus(),this.transitions.animate({from:0,to:1,duration:.55,easing:"easeOutCubic",onUpdate:()=>{},onComplete:()=>{this.resumeOrbitMode(),t&&this.hasSeenAllFacets(t.id)&&this.world.snapShardToSlot(t.id);const i=this.pendingPostFocusExit;this.pendingPostFocusExit=null,i==null||i(),this.refreshUI(),this.updateGuide()}})}changeFacet(e){!this.mode.is("focus")||!this.world.changeFacet(e)||(this.mode.setMode("focus_facet_transition"),this.scheduleFacetCompletion())}scheduleFacetCompletion(){this.transitions.animate({from:0,to:1,duration:.68,easing:"easeInOutCubic",onUpdate:()=>{},onComplete:()=>{if(!this.mode.is("focus_facet_transition"))return;this.mode.setMode("focus");const e=this.world.getFocusedProject();e&&(this.markFacetSeen(e.id,this.world.getFocusedFacetIndex()),this.focus.updateFacet(this.world.getFocusedFacetIndex()),this.hasChangedFacet=!0,this.updateGuide())}})}toggleAbout(){if(this.mode.is("intro")||this.mode.is("intro_shattering")||this.mode.is("intro_transition")||this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))return;if(this.about.opened){this.about.close();return}const e=()=>{this.about.open(),this.mode.setMode("about_section"),this.refreshUI(),this.updateGuide()};if(this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition")){this.exitFocus(e);return}e()}returnHome(){(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))&&this.exitGame(),this.activeIndex=0,this.world.setActiveIndex(0),this.about.opened&&this.about.close(),(this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition"))&&this.exitFocus(),this.refreshUI()}resumeOrbitMode(){if(this.slotSystem.isUnlocked()){this.mode.is("constellation_complete")||(this.mode.is("focus_exit")||this.mode.is("about_section")||this.mode.is("dragging")||this.mode.is("orbit")||this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))&&this.mode.setMode("constellation_complete");return}this.mode.is("orbit")||this.mode.setMode("orbit")}startGameTransition(){if(!this.slotSystem.isUnlocked()||this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))return;if(this.about.opened&&this.about.close(),this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition")){this.exitFocus(()=>this.startGameTransition());return}this.mode.is("dragging")&&this.resumeOrbitMode(),this.mode.is("constellation_complete")||this.mode.setMode("constellation_complete"),this.gameTransitionTweenId!==null&&(this.transitions.cancel(this.gameTransitionTweenId),this.gameTransitionTweenId=null),this.mode.setMode("game_transition"),this.gameTransitionProgress=0,this.game.startTransition();const e=this.content.getProjectCount();this.world.beginExternalLayoutTransition(this.game.getInitialPlatformPositions(e),this.game.getInitialPlatformScales(e)),this.refreshUI(),this.gameTransitionTweenId=this.transitions.animate({from:0,to:1,duration:2.25,easing:"easeInOutCubic",onUpdate:t=>{this.gameTransitionProgress=t,this.world.setExternalLayoutProgress(t)},onComplete:()=>{this.gameTransitionTweenId=null,this.gameTransitionProgress=1,this.mode.setMode("game"),this.game.beginRun(),this.world.setExternalLayoutPositions(this.game.getVisiblePlatformPositions(e),this.game.getVisiblePlatformScales(e),this.game.getVisiblePlatformVisuals(e)),this.refreshUI()}})}restartGame(){(this.mode.is("game")||this.mode.is("game_over"))&&(this.mode.is("game_over")&&this.mode.setMode("game"),this.game.restart(),this.world.setExternalLayoutPositions(this.game.getVisiblePlatformPositions(this.content.getProjectCount()),this.game.getVisiblePlatformScales(this.content.getProjectCount()),this.game.getVisiblePlatformVisuals(this.content.getProjectCount())),this.refreshUI())}exitGame(){if(!(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over")))return;this.gameTransitionTweenId!==null&&(this.transitions.cancel(this.gameTransitionTweenId),this.gameTransitionTweenId=null),this.mobileChargePointerId=null,this.game.setChargeActive(!1);const e=this.world.getOrbitPositions();this.world.beginExternalLayoutTransition(e),this.game.prepareReturnTransition(),(this.mode.is("game")||this.mode.is("game_over"))&&this.mode.setMode("game_transition"),this.gameTransitionTweenId=this.transitions.animate({from:this.gameTransitionProgress,to:0,duration:1.25,easing:"easeInOutCubic",onUpdate:t=>{this.gameTransitionProgress=t,this.world.setExternalLayoutProgress(1-t)},onComplete:()=>{this.gameTransitionTweenId=null,this.game.stop(),this.gameTransitionProgress=0,this.slotSystem.reset(),this.interaction.reset(),this.world.resetPortfolioState(),this.activeIndex=0,this.world.setActiveIndex(0),this.resumeOrbitMode(),this.refreshUI(),this.updateGuide()}})}getGameHudPayload(){const e=this.game.getHudState();return{score:e.score,highscore:e.highscore,distanceMeters:e.distanceMeters,bestDistanceMeters:e.bestDistanceMeters,coins:e.coins,splitTimes:e.splitTimes,chargeRatio:e.chargeRatio,momentumGauge:e.momentumGauge,momentumTier:e.momentumTier,state:e.state,offers:e.offers,branchHints:e.branchHints.reduce((t,i)=>{const n=this.renderer.projectWorldToScreen(i.worldPosition);return n.visible&&t.push({slot:i.slot,offer:i.offer,screenX:n.x,screenY:n.y,mode:i.mode,price:i.price}),t},[]),acquisition:e.acquisition}}update(e,t){if(this.transitions.update(e),this.world.update(e,t,this.mode.current),this.game.update(e,t),(this.mode.is("game")||this.mode.is("game_over"))&&this.world.setExternalLayoutPositions(this.game.getVisiblePlatformPositions(this.content.getProjectCount()),this.game.getVisiblePlatformScales(this.content.getProjectCount()),this.game.getVisiblePlatformVisuals(this.content.getProjectCount())),this.mode.is("focus_enter")&&this.world.isFocusSettled()){this.mode.setMode("focus");const m=this.world.getFocusedProject();m&&(this.markFacetSeen(m.id,this.world.getFocusedFacetIndex()),this.focus.show(m,this.world.getFocusedFacetIndex()),this.hasFocused=!0,this.updateGuide())}this.mode.is("game")&&this.game.currentState==="game_over"&&this.mode.setMode("game_over"),this.cameraFocusBlend=De(this.cameraFocusBlend,this.mode.is("focus")||this.mode.is("focus_enter")||this.mode.is("focus_facet_transition")||this.mode.is("focus_exit")?1:0,8,e);const i=this.world.getOrbitCameraPose(),n=this.cameraOrbit.update(e,this.world.getPivot()),r=this.world.getFocusCameraPose(),a=this.game.getCameraPose(),o=n.position.clone().lerp(r.position,this.cameraFocusBlend),c=n.lookAt.clone().lerp(i.lookAt,.18).lerp(r.lookAt,this.cameraFocusBlend),l=o.clone().lerp(a.position,this.gameTransitionProgress),h=c.clone().lerp(a.lookAt,this.gameTransitionProgress),u=this.introStartCameraPosition.clone().lerp(l,this.introTransitionProgress),f=this.introStartLookAt.clone().lerp(h,this.introTransitionProgress);this.renderer.setCameraTarget(u,f),this.renderer.update(e),(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))&&this.gameHud.update(this.getGameHudPayload()),this.renderer.render(),this.intro.update(e),this.refreshUI()}refreshUI(){const e=this.world.getFocusedProject(),t=e?this.content.getProjectIndex(e.id):this.activeIndex,i=this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over");this.hud.setActiveProject(t,this.i18n.current),this.hud.setUnlocked(this.slotSystem.isUnlocked()),this.hud.setAboutOpen(this.about.opened),this.hud.element.classList.toggle("is-hidden",i),this.guide.element.classList.toggle("is-hidden",i),this.gameHud.setVisible(i),i&&this.gameHud.update(this.getGameHudPayload()),this.world.setActiveIndex(this.activeIndex)}updateGuide(){if(!(this.mode.is("game_transition")||this.mode.is("game")||this.mode.is("game_over"))){if(this.slotSystem.isUnlocked()){this.guide.setStep("unlocked");return}if(this.mode.is("intro")||this.mode.is("intro_shattering")||this.mode.is("intro_transition")){this.guide.setStep("intro");return}if(!this.hasFocused){this.guide.setStep("orbit");return}if(!this.hasChangedFacet){this.guide.setStep("focus");return}if(!this.hasDragged){this.guide.setStep("drag");return}this.guide.setStep("slots")}}markFacetSeen(e,t){const i=this.seenFacetsByProject.get(e)??new Set;i.add(t),this.seenFacetsByProject.set(e,i)}hasSeenAllFacets(e){var t;return(((t=this.seenFacetsByProject.get(e))==null?void 0:t.size)??0)>=3}}const bc=document.getElementById("app");if(!bc)throw new Error("App root not found");new yg(bc);
