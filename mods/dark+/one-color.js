!function(t,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):((t=t||self).one=t.one||{},t.one.color=r())}(this,(function(){"use strict";var t=[],r=function(t){return void 0===t},e=/\s*(\.\d+|\d+(?:\.\d+)?)(%)?\s*/,n=/\s*(\.\d+|100|\d?\d(?:\.\d+)?)%\s*/,a=new RegExp("^(rgb|hsl|hsv)a?\\("+e.source+","+e.source+","+e.source+"(?:,"+/\s*(\.\d+|\d+(?:\.\d+)?)\s*/.source+")?\\)$","i");function o(t){if(Array.isArray(t)){if("string"==typeof t[0]&&"function"==typeof o[t[0]])return new o[t[0]](t.slice(1,t.length));if(4===t.length)return new o.RGB(t[0]/255,t[1]/255,t[2]/255,t[3]/255)}else if("string"==typeof t){var e=t.toLowerCase();o.namedColors[e]&&(t="#"+o.namedColors[e]),"transparent"===e&&(t="rgba(0,0,0,0)");var s=t.match(a);if(s){var i=s[1].toUpperCase(),u=r(s[8])?s[8]:parseFloat(s[8]),h="H"===i[0],c=s[3]?100:h?360:255,f=s[5]||h?100:255,l=s[7]||h?100:255;if(r(o[i]))throw new Error("color."+i+" is not installed.");return new o[i](parseFloat(s[2])/c,parseFloat(s[4])/f,parseFloat(s[6])/l,u)}t.length<6&&(t=t.replace(/^#?([0-9a-f])([0-9a-f])([0-9a-f])$/i,"$1$1$2$2$3$3"));var p=t.match(/^#?([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])$/i);if(p)return new o.RGB(parseInt(p[1],16)/255,parseInt(p[2],16)/255,parseInt(p[3],16)/255);if(o.CMYK){var d=t.match(new RegExp("^cmyk\\("+n.source+","+n.source+","+n.source+","+n.source+"\\)$","i"));if(d)return new o.CMYK(parseFloat(d[1])/100,parseFloat(d[2])/100,parseFloat(d[3])/100,parseFloat(d[4])/100)}}else if("object"==typeof t&&t.isColor)return t;return!1}o.namedColors={},o.installColorSpace=function(e,n,a){o[e]=function(t){var r=Array.isArray(t)?t:arguments;n.forEach((function(t,a){var o=r[a];if("alpha"===t)this._alpha=isNaN(o)||o>1?1:o<0?0:o;else{if(isNaN(o))throw new Error("["+e+"]: Invalid color: ("+n.join(",")+")");"hue"===t?this._hue=o<0?o-Math.floor(o):o%1:this["_"+t]=o<0?0:o>1?1:o}}),this)},o[e].propertyNames=n;var s=o[e].prototype;for(var i in["valueOf","hex","hexa","css","cssa"].forEach((function(t){s[t]=s[t]||("RGB"===e?s.hex:function(){return this.rgb()[t]()})})),s.isColor=!0,s.equals=function(t,a){r(a)&&(a=1e-10),t=t[e.toLowerCase()]();for(var o=0;o<n.length;o+=1)if(Math.abs(this["_"+n[o]]-t["_"+n[o]])>a)return!1;return!0},s.toJSON=function(){return[e].concat(n.map((function(t){return this["_"+t]}),this))},a)if(Object.prototype.hasOwnProperty.call(a,i)){var u=i.match(/^from(.*)$/);u?o[u[1].toUpperCase()].prototype[e.toLowerCase()]=a[i]:s[i]=a[i]}function h(t,r){var e={};for(var n in e[r.toLowerCase()]=function(){return this.rgb()[r.toLowerCase()]()},o[r].propertyNames.forEach((function(t){var n="black"===t?"k":t.charAt(0);e[t]=e[n]=function(e,n){return this[r.toLowerCase()]()[t](e,n)}})),e)Object.prototype.hasOwnProperty.call(e,n)&&void 0===o[t].prototype[n]&&(o[t].prototype[n]=e[n])}return s[e.toLowerCase()]=function(){return this},s.toString=function(){return"["+e+" "+n.map((function(t){return this["_"+t]}),this).join(", ")+"]"},n.forEach((function(t){var r="black"===t?"k":t.charAt(0);s[t]=s[r]=function(r,e){return void 0===r?this["_"+t]:e?new this.constructor(n.map((function(e){return this["_"+e]+(t===e?r:0)}),this)):new this.constructor(n.map((function(e){return t===e?r:this["_"+e]}),this))}})),t.forEach((function(t){h(e,t),h(t,e)})),t.push(e),o},o.pluginList=[],o.use=function(t){return-1===o.pluginList.indexOf(t)&&(this.pluginList.push(t),t(o)),o},o.installMethod=function(r,e){return t.forEach((function(t){o[t].prototype[r]=e})),this},o.installColorSpace("RGB",["red","green","blue","alpha"],{hex:function(){var t=(65536*Math.round(255*this._red)+256*Math.round(255*this._green)+Math.round(255*this._blue)).toString(16);return"#"+"00000".substr(0,6-t.length)+t},hexa:function(){var t=Math.round(255*this._alpha).toString(16);return"#"+"00".substr(0,2-t.length)+t+this.hex().substr(1,6)},css:function(){return"rgb("+Math.round(255*this._red)+","+Math.round(255*this._green)+","+Math.round(255*this._blue)+")"},cssa:function(){return"rgba("+Math.round(255*this._red)+","+Math.round(255*this._green)+","+Math.round(255*this._blue)+","+this._alpha+")"}});var s=function(t){t.installColorSpace("HSV",["hue","saturation","value","alpha"],{rgb:function(){var r,e,n,a=this._hue,o=this._saturation,s=this._value,i=Math.min(5,Math.floor(6*a)),u=6*a-i,h=s*(1-o),c=s*(1-u*o),f=s*(1-(1-u)*o);switch(i){case 0:r=s,e=f,n=h;break;case 1:r=c,e=s,n=h;break;case 2:r=h,e=s,n=f;break;case 3:r=h,e=c,n=s;break;case 4:r=f,e=h,n=s;break;case 5:r=s,e=h,n=c}return new t.RGB(r,e,n,this._alpha)},hsl:function(){var r,e=(2-this._saturation)*this._value,n=this._saturation*this._value,a=e<=1?e:2-e;return r=a<1e-9?0:n/a,new t.HSL(this._hue,r,e/2,this._alpha)},fromRgb:function(){var r,e=this._red,n=this._green,a=this._blue,o=Math.max(e,n,a),s=o-Math.min(e,n,a),i=0===o?0:s/o,u=o;if(0===s)r=0;else switch(o){case e:r=(n-a)/s/6+(n<a?1:0);break;case n:r=(a-e)/s/6+1/3;break;case a:r=(e-n)/s/6+2/3}return new t.HSV(r,i,u,this._alpha)}})};return o.use(s).use((function(t){t.use(s),t.installColorSpace("HSL",["hue","saturation","lightness","alpha"],{hsv:function(){var r,e=2*this._lightness,n=this._saturation*(e<=1?e:2-e);return r=e+n<1e-9?0:2*n/(e+n),new t.HSV(this._hue,r,(e+n)/2,this._alpha)},rgb:function(){return this.hsv().rgb()},fromRgb:function(){return this.hsv().hsl()}})}))}));
//# sourceMappingURL=one-color.js.map