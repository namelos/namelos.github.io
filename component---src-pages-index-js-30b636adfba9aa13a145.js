webpackJsonp([35783957827783],{105:function(e,t){"use strict";function r(e,t,s){if("string"!=typeof t){if(f){var p=i(t);p&&p!==f&&r(e,p,s)}var d=l(t);c&&(d=d.concat(c(t)));for(var g=0;g<d.length;++g){var y=d[g];if(!(n[y]||a[y]||s&&s[y])){var O=u(t,y);try{o(e,y,O)}catch(e){}}}return e}return e}var n={childContextTypes:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},a={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},o=Object.defineProperty,l=Object.getOwnPropertyNames,c=Object.getOwnPropertySymbols,u=Object.getOwnPropertyDescriptor,i=Object.getPrototypeOf,f=i&&i(Object);e.exports=r},44:function(e,t){"use strict";function r(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}function n(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;var n=Object.getOwnPropertyNames(t).map(function(e){return t[e]});if("0123456789"!==n.join(""))return!1;var a={};return"abcdefghijklmnopqrst".split("").forEach(function(e){a[e]=e}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},a)).join("")}catch(e){return!1}}var a=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable;e.exports=n()?Object.assign:function(e,t){for(var n,c,u=r(e),i=1;i<arguments.length;i++){n=Object(arguments[i]);for(var f in n)o.call(n,f)&&(u[f]=n[f]);if(a){c=a(n);for(var s=0;s<c.length;s++)l.call(n,c[s])&&(u[c[s]]=n[c[s]])}}return u}},205:function(e,t){},119:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e){var t=e.data;return u.default.createElement("div",null,u.default.createElement("h1",null,"Namelos"),t.allOrga.edges.map(function(e){var t=e.node;return u.default.createElement(o,l({},t,{key:t.fields.slug}))}))}function o(e){var t=e.meta,r=e.fields,n=t.title||r.slug,a=t.date||"no date";return u.default.createElement("div",null,u.default.createElement("h3",null,u.default.createElement(f.default,{to:r.slug},n)),u.default.createElement("small",null,a))}t.__esModule=!0,t.pageQuery=void 0;var l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};t.default=a,r(205);var c=r(1),u=n(c),i=r(206),f=n(i);t.pageQuery="** extracted graphql fragment **"}});
//# sourceMappingURL=component---src-pages-index-js-30b636adfba9aa13a145.js.map