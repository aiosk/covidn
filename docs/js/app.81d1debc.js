(function(t){function e(e){for(var n,r,o=e[0],c=e[1],l=e[2],u=0,d=[];u<o.length;u++)r=o[u],Object.prototype.hasOwnProperty.call(s,r)&&s[r]&&d.push(s[r][0]),s[r]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);p&&p(e);while(d.length)d.shift()();return i.push.apply(i,l||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],n=!0,r=1;r<a.length;r++){var o=a[r];0!==s[o]&&(n=!1)}n&&(i.splice(e--,1),t=c(c.s=a[0]))}return t}var n={},r={app:0},s={app:0},i=[];function o(t){return c.p+"js/"+({about:"about",ranking:"ranking",ratio:"ratio","ratio-population":"ratio-population"}[t]||t)+"."+{about:"a3ea81e3",ranking:"251b1ff9",ratio:"d2779e63","ratio-population":"f61e1395"}[t]+".js"}function c(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.e=function(t){var e=[],a={ranking:1,ratio:1,"ratio-population":1};r[t]?e.push(r[t]):0!==r[t]&&a[t]&&e.push(r[t]=new Promise((function(e,a){for(var n="css/"+({about:"about",ranking:"ranking",ratio:"ratio","ratio-population":"ratio-population"}[t]||t)+"."+{about:"31d6cfe0",ranking:"7dc081d8",ratio:"7dc081d8","ratio-population":"82ffb1cc"}[t]+".css",s=c.p+n,i=document.getElementsByTagName("link"),o=0;o<i.length;o++){var l=i[o],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===n||u===s))return e()}var d=document.getElementsByTagName("style");for(o=0;o<d.length;o++){l=d[o],u=l.getAttribute("data-href");if(u===n||u===s)return e()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=e,p.onerror=function(e){var n=e&&e.target&&e.target.src||s,i=new Error("Loading CSS chunk "+t+" failed.\n("+n+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=n,delete r[t],p.parentNode.removeChild(p),a(i)},p.href=s;var v=document.getElementsByTagName("head")[0];v.appendChild(p)})).then((function(){r[t]=0})));var n=s[t];if(0!==n)if(n)e.push(n[2]);else{var i=new Promise((function(e,a){n=s[t]=[e,a]}));e.push(n[2]=i);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,c.nc&&u.setAttribute("nonce",c.nc),u.src=o(t);var d=new Error;l=function(e){u.onerror=u.onload=null,clearTimeout(p);var a=s[t];if(0!==a){if(a){var n=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src;d.message="Loading chunk "+t+" failed.\n("+n+": "+r+")",d.name="ChunkLoadError",d.type=n,d.request=r,a[1](d)}s[t]=void 0}};var p=setTimeout((function(){l({type:"timeout",target:u})}),12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(e)},c.m=t,c.c=n,c.d=function(t,e,a){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)c.d(a,n,function(e){return t[e]}.bind(null,n));return a},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/covidn/",c.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=e,l=l.slice();for(var d=0;d<l.length;d++)e(l[d]);var p=u;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"03c2":function(t,e,a){"use strict";var n=a("8ade"),r=a.n(n);r.a},1946:function(t,e,a){"use strict";a.d(e,"g",(function(){return n})),a.d(e,"f",(function(){return r})),a.d(e,"e",(function(){return s})),a.d(e,"d",(function(){return i})),a.d(e,"a",(function(){return o})),a.d(e,"c",(function(){return c})),a.d(e,"b",(function(){return l}));var n=["NATIONAL","DKI_JAKARTA","JAWA_BARAT","JAWA_TIMUR","JAWA_TENGAH","SULAWESI_SELATAN","BANTEN","NUSA_TENGGARA_BARAT","BALI","PAPUA","KALIMANTAN_SELATAN","SUMATERA_BARAT","SUMATERA_SELATAN","KALIMANTAN_TENGAH","KALIMANTAN_TIMUR","SUMATERA_UTARA","DAERAH_ISTIMEWA_YOGYAKARTA","KALIMANTAN_UTARA","KEPULAUAN_RIAU","KALIMANTAN_BARAT","SULAWESI_TENGGARA","LAMPUNG","SULAWESI_UTARA","SULAWESI_TENGAH","RIAU","PAPUA_BARAT","SULAWESI_BARAT","JAMBI","MALUKU_UTARA","MALUKU","GORONTALO","KEPULAUAN_BANGKA_BELITUNG","ACEH","BENGKULU","NUSA_TENGGARA_TIMUR"],r=["NATIONAL"],s=3,i=[!0,!0,!0,!0,!1,!1,!1,!1,!0,!0,!0,!0],o=["confirmed","recover","death","active"],c={datasets:[{data:[]}],labels:[]},l={confirmed:"#2c347c",recover:"#3c928c",death:"#ec6f58",active:"#c6ac42"}},"1c9c":function(t,e){t.exports=domtoimage},"2f1b":function(t,e,a){},"2f2f":function(t,e,a){},"4fd6":function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);var n=a("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"grid-container",attrs:{id:"app"}},[a("ul",{staticClass:"menu vertical medium-horizontal",attrs:{id:"nav"}},[t._m(0),a("router-link",{attrs:{to:"/daily"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.href,r=(e.route,e.navigate),s=e.isActive,i=e.isExactActive;return[a("li",{class:[s&&"is-active",i&&"is-active"]},[a("a",{attrs:{href:n},on:{click:r}},[t._v("Daily")])])]}}])}),a("router-link",{attrs:{to:"/ranking"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.href,r=(e.route,e.navigate),s=e.isActive,i=e.isExactActive;return[a("li",{class:[s&&"is-active",i&&"is-active"]},[a("a",{attrs:{href:n},on:{click:r}},[t._v("Ranking")])])]}}])}),a("router-link",{attrs:{to:"/ratio"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.href,r=(e.route,e.navigate),s=e.isActive,i=e.isExactActive;return[a("li",{class:[s&&"is-active",i&&"is-active"]},[a("a",{attrs:{href:n},on:{click:r}},[t._v("Ratio")])])]}}])}),a("router-link",{attrs:{to:"/ratio-population"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.href,r=(e.route,e.navigate),s=e.isActive,i=e.isExactActive;return[a("li",{class:[s&&"is-active",i&&"is-active"]},[a("a",{attrs:{href:n},on:{click:r}},[t._v("Population Ratio")])])]}}])}),a("router-link",{attrs:{to:"/about"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.href,r=(e.route,e.navigate),s=e.isActive,i=e.isExactActive;return[a("li",{class:[s&&"is-active",i&&"is-active"]},[a("a",{attrs:{href:n},on:{click:r}},[t._v("About")])])]}}])})],1),t._m(1),a("br"),a("router-view"),a("button",{staticClass:"button small",attrs:{id:"top"},on:{click:t.topBtnOnClick}},[a("i",{staticClass:"icon-up-circled",attrs:{title:"Scroll to top"}})])],1)},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"menu-text"},[a("a",{attrs:{href:"./"}},[t._v("COVIDN")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"callout warning hide-for-medium",attrs:{id:"chartHelpText"}},[a("ul",{staticClass:"help-text"},[a("li",[t._v("For best results please view in "),a("strong",[t._v("landscape")]),t._v(" mode")])])])}],i={name:"App",methods:{topBtnOnClick:function(t){document.querySelector("#nav").scrollIntoView({behavior:"smooth"})}},mounted:function(){},destroyed:function(){}},o=i,c=(a("5c0b"),a("2877")),l=Object(c["a"])(o,r,s,!1,null,null,null),u=l.exports,d=a("8c4f"),p=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"daily"},[a("h3",[t._v("Daily Cases per Provinces")]),a("DailyForm",{model:{value:t.myModel,callback:function(e){t.myModel=e},expression:"myModel"}}),a("div",{staticClass:"grid-x xlarge-up-2",attrs:{"aria-describedby":"chartHelpText"}},[t._l(t.myModel.selectedZones,(function(e){return[a("div",{key:e,staticClass:"cell",class:["chart-item"],attrs:{id:"CellChart_"+e}},[a(t.componentZoneCard[e],{key:e,tag:"component",attrs:{zone:e},model:{value:t.myModel,callback:function(e){t.myModel=e},expression:"myModel"}})],1)]}))],2)],1)},v=[],f=a("a34a"),h=a.n(f),m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("form",{staticClass:"daily-form callout secondary"},[a("div",{staticClass:"grid-x periods"},[a("div",{staticClass:"cell xlarge-3"},[a("label",{attrs:{for:"periods"}},[a("span",[t._v(t._s(t.periods))]),t._v(" days period")])]),a("div",{staticClass:"cell xlarge-9"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.periods,expression:"periods"}],attrs:{id:"periods",name:"periods",type:"range",min:"1",max:"14",step:"1","aria-describedby":"periodsHelpText"},domProps:{value:t.periods},on:{__r:function(e){t.periods=e.target.value}}}),t._m(0)])]),a("div",{staticClass:"grid-x zones"},[t._m(1),a("div",{staticClass:"cell xlarge-9"},[a("menu",{staticClass:"text-right"},[a("a",{on:{click:t.selectAllOnClick}},[t._v("Select All")]),a("a",{on:{click:t.deselectAllOnClick}},[t._v("Deselect All")])]),a("select",{directives:[{name:"model",rawName:"v-model",value:t.selectedZones,expression:"selectedZones"}],attrs:{id:"zones",name:"zones",multiple:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.selectedZones=e.target.multiple?a:a[0]}}},t._l(t.zones,(function(e){return a("option",{key:e,domProps:{value:e}},[t._v(t._s(e.split("_").join(" ")))])})),0),a("p",{staticClass:"help-text"},[t._v("Too many charts, i don't like to scroll, i want to select some chart")])])])])},y=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",{staticClass:"help-text",attrs:{id:"periodsHelpText"}},[t._v("Try smaller or larger data periods by sliding (tap/click => hold => move) slider to change days period."),a("br"),a("strong",[t._v("Smaller")]),t._v(" day periods will generate complicated chart data, while "),a("strong",[t._v("larger")]),t._v(" day periods will generate simplified chart data. Use wisely.")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cell xlarge-3"},[a("label",{attrs:{for:"zones"}},[t._v("Zone")])])}],g=a("0644"),b=a.n(g),A=a("9424"),_=a("1946"),C={name:"DailyForm",mixins:[A["a"]],props:{value:Object},computed:{zones:function(){return this.value.zones},periods:{get:function(){return this.value.periods?this.value.periods:_["e"]},set:function(t){this.emitModel({periods:t})}},selectedZones:{get:function(){return this.value.selectedZones},set:function(t){this.emitModel({selectedZones:t})}}},watch:{periods:function(t,e){this.updateQuery("periods",t,_["e"])},selectedZones:function(t,e){this.updateQuery("zones",t,_["f"])}},methods:{selectAllOnClick:function(t){var e=t.target.closest(".cell").querySelector("select");e.querySelectorAll("option").forEach((function(t){t.selected=!0})),e.dispatchEvent(new Event("change"))},deselectAllOnClick:function(t){var e=t.target.closest(".cell").querySelector("select");e.querySelectorAll("option:not([value='NATIONAL'])").forEach((function(t){t.selected=!1})),e.dispatchEvent(new Event("change"))}},created:function(){var t=this.$route.query.periods;t&&(this.periods=t)}},x=C,w=(a("9fb9"),Object(c["a"])(x,m,y,!1,null,"6d6a6fa4",null)),k=w.exports,S=a("a59d"),M=a("6afe"),T=a("eafc"),E=a.n(T);function O(t,e,a,n,r,s,i){try{var o=t[s](i),c=o.value}catch(l){return void a(l)}o.done?e(c):Promise.resolve(c).then(n,r)}function I(t){return function(){var e=this,a=arguments;return new Promise((function(n,r){var s=t.apply(e,a);function i(t){O(s,n,r,i,o,"next",t)}function o(t){O(s,n,r,i,o,"throw",t)}i(void 0)}))}}var L={name:"Daily",mixins:[M["a"],A["a"]],components:{DailyForm:k,ZoneCard:S["a"]},data:function(){return{lazyLoadCanvas:null,componentZoneCard:{},myModel:{periods:null,zones:_["g"],selectedZones:b()(_["f"]),hiddenDatasets:null}}},watch:{componentZoneCard:function(t,e){var a=this;E()((function(){a.lazyLoadCanvas&&a.lazyLoadCanvas.update()}),9)},"myModel.selectedZones":function(){var t=I(h.a.mark((function t(e,a){var n=this;return h.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:E()((function(){n.lazyLoadCanvas&&n.lazyLoadCanvas.update()}),9);case 1:case"end":return t.stop()}}),t)})));function e(e,a){return t.apply(this,arguments)}return e}()},created:function(){var t=this.$route.query.zones;t&&(t=t.split("+"),this.myModel.selectedZones=t)},mounted:function(){var t=this;E()((function(){if(!t.lazyLoadCanvas){var e=a("e249");t.lazyLoadCanvas=new e({elements_selector:".chart-item",unobserve_entered:!0,callback_enter:function(e){var a=e.id.split("_").slice(1).join("_");t.$set(t.componentZoneCard,a,S["a"])}})}}),299)},destroyed:function(){this.lazyLoadCanvas.destroy(),this.$set(this.myModel,"periods",null),this.$set(this.myModel,"selectedZones",b()(_["f"])),this.$set(this.myModel,"hiddenDatasets",null)}},N=L,D=(a("dc6c"),Object(c["a"])(N,p,v,!1,null,null,null)),j=D.exports;n["a"].use(d["a"]);var P=[{path:"/",name:"Home",component:j},{path:"/daily",name:"Daily",component:j},{path:"/ranking",name:"Ranking",component:function(){return a.e("ranking").then(a.bind(null,"4320"))}},{path:"/ratio",name:"Ratio",component:function(){return a.e("ratio").then(a.bind(null,"42a7"))}},{path:"/ratio-population",name:"RatioPopulation",component:function(){return a.e("ratio-population").then(a.bind(null,"91e5"))}},{path:"/about",name:"About",component:function(){return a.e("about").then(a.bind(null,"f820"))}}],U=new d["a"]({routes:P}),z=U;n["a"].config.productionTip=!1,new n["a"]({router:z,render:function(t){return t(u)}}).$mount("#app")},"5c0b":function(t,e,a){"use strict";var n=a("9c0c"),r=a.n(n);r.a},"66c0":function(t,e){t.exports=Chart},"6afe":function(t,e,a){"use strict";var n=a("a34a"),r=a.n(n);function s(t,e,a,n,r,s,i){try{var o=t[s](i),c=o.value}catch(l){return void a(l)}o.done?e(c):Promise.resolve(c).then(n,r)}function i(t){return function(){var e=this,a=arguments;return new Promise((function(n,r){var i=t.apply(e,a);function o(t){s(i,n,r,o,c,"next",t)}function c(t){s(i,n,r,o,c,"throw",t)}o(void 0)}))}}var o={methods:{downloadOnClick:function(t){var e=a("1c9c"),n=t.target.closest(".card"),s=n.querySelector("h4,h5"),o="".concat(s.innerText.replace(/ /g,"_"),".jpeg");i(r.a.mark((function t(){var a,s;return r.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.toJpeg(n.querySelector(".capture"));case 2:a=t.sent,s=document.createElement("a"),s.href=a,s.download=o,s.click();case 7:case"end":return t.stop()}}),t)})))()}}};e["a"]=o},"83bb":function(t,e,a){"use strict";var n=a("2f1b"),r=a.n(n);r.a},"8ade":function(t,e,a){},9424:function(t,e,a){"use strict";var n=a("a34a"),r=a.n(n),s=a("63ea"),i=a.n(s),o=a("6747"),c=a.n(o),l=a("6679"),u=a.n(l),d=a("e2a0"),p=a.n(d),v=a("c707"),f=a.n(v);function h(t,e,a,n,r,s,i){try{var o=t[s](i),c=o.value}catch(l){return void a(l)}o.done?e(c):Promise.resolve(c).then(n,r)}function m(t){return function(){var e=this,a=arguments;return new Promise((function(n,r){var s=t.apply(e,a);function i(t){h(s,n,r,i,o,"next",t)}function o(t){h(s,n,r,i,o,"throw",t)}i(void 0)}))}}function y(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function g(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?y(Object(a),!0).forEach((function(e){b(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):y(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function b(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var A={methods:{emitModel:function(t){var e=g(g({},this.value),t);this.$emit("input",e)},updateQuery:function(){var t=m(r.a.mark((function t(e,a,n){var s;return r.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return s=g({},this.$route.query),delete s[e],c()(a)?u()(a[0])?i()(a,n)||(s[e]=a.map((function(t){return t?1:0})).join("")):p()(a[0])?a.length&&!i()(f()(a),f()(n))&&(s[e]=a.join("+")):s[e]=a.join("+"):a!=n&&(s[e]=a),t.prev=3,t.next=6,this.$router.push({query:s});case 6:t.next=10;break;case 8:t.prev=8,t.t0=t["catch"](3);case 10:case"end":return t.stop()}}),t,this,[[3,8]])})));function e(e,a,n){return t.apply(this,arguments)}return e}()}};e["a"]=A},"9c0c":function(t,e,a){},"9fb9":function(t,e,a){"use strict";var n=a("2f2f"),r=a.n(n);r.a},a59d:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"zone-card card",attrs:{"aria-describedby":"chartHelpText"}},[a("div",{staticClass:"capture"},[a("div",{staticClass:"card-divider title"},[a("h5",[t._v(t._s("Daily "+t.zone.split("_").join(" ")))])]),a("div",{staticClass:"card-image stats"},[a(t.componentStats,{tag:"component",model:{value:t.myStatsModel,callback:function(e){t.myStatsModel=e},expression:"myStatsModel"}})],1),a("div",{staticClass:"card-image"},[a("div",{staticClass:"legend grid-x small-up-2 medium-up-4",domProps:{innerHTML:t._s(t.legendHTML)},on:{click:t.legendOnClick}}),t._m(0),a("canvas",{attrs:{id:"Chart_"+t.zone}})])]),a("div",{staticClass:"card-section action"},[a("a",{staticClass:"download-raw",attrs:{rel:"noopener",href:"https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/csv/"+this.zone+".csv",target:"_blank"}},[a("i",{staticClass:"icon-download-cloud",attrs:{title:"download raw"}})]),a("a",{staticClass:"download-chart",on:{click:t.downloadOnClick}},[a("i",{staticClass:"icon-floppy",attrs:{title:"download chart"}})]),a("a",{staticClass:"fullscreen show-for-xlarge",on:{click:t.onClickFullscreen}},[a("i",{staticClass:"icon-resize-full",attrs:{title:"resize fullscreen"}})])])])},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"help-text text-right"},[a("div",[a("strong",{staticClass:"show-for-xlarge"},[t._v("Click")]),a("strong",{staticClass:"hide-for-xlarge"},[t._v("Tap / Touch")]),t._v(" legend item to toggle chart line")])])}],s=a("a34a"),i=a.n(s),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home-chart-stats"},[t.stats.population?a("div",{staticClass:"grid-x small-up-2"},[a("div",{staticClass:"cell"},[a("div",{staticClass:"card population"},[a("div",{staticClass:"card-section"},[a("h6",[t._v("Population")]),a("div",{staticClass:"total"},[t._v(t._s(t.numberWithCommas(t.stats.population)))])])])]),a("div",{staticClass:"cell"},[a("div",{staticClass:"card confirmed"},[a("div",{staticClass:"card-section"},[a("h6",[t._v("Confirmed")]),a("div",{staticClass:"total"},[t._v(t._s(t.numberWithCommas(t.stats.total.confirmed))),a("sup",[t._v(t._s(t.plusMinusStr(t.stats.daily.confirmed)))])])])])])]):t._e(),a("div",{staticClass:"grid-x",class:[{"medium-up-4":!t.stats.population},{"medium-up-3":!!t.stats.population},{"small-up-2":!t.stats.population},{"small-up-3":!!t.stats.population}]},[t.stats.population?t._e():a("div",{staticClass:"cell"},[a("div",{staticClass:"card confirmed"},[a("div",{staticClass:"card-section"},[a("h6",[t._v("Confirmed")]),a("div",{staticClass:"total"},[t._v(t._s(t.numberWithCommas(t.stats.total.confirmed))),a("sup",[t._v(t._s(t.plusMinusStr(t.stats.daily.confirmed)))])])])])]),a("div",{staticClass:"cell"},[a("div",{staticClass:"card recover"},[a("div",{staticClass:"card-section"},[a("h6",[t._v("Recover")]),a("div",{staticClass:"total"},[t._v(t._s(t.numberWithCommas(t.stats.total.recover))),a("sup",[t._v(t._s(t.plusMinusStr(t.stats.daily.recover)))])])])])]),a("div",{staticClass:"cell"},[a("div",{staticClass:"card death"},[a("div",{staticClass:"card-section"},[a("h6",[t._v("Death")]),a("div",{staticClass:"total"},[t._v(t._s(t.numberWithCommas(t.stats.total.death))),a("sup",[t._v(t._s(t.plusMinusStr(t.stats.daily.death)))])])])])]),a("div",{staticClass:"cell"},[a("div",{staticClass:"card active"},[a("div",{staticClass:"card-section"},[a("h6",[t._v("Active")]),a("div",{staticClass:"total"},[t._v(t._s(t.numberWithCommas(t.stats.total.active))),a("sup",[t._v(t._s(t.plusMinusStr(t.stats.daily.active)))])])])])])]),a("div",{staticClass:"help-text text-right"},[t._v("Last Update: "+t._s(t.stats.lastUpdate))])])},c=[],l=(a("eafc"),a("13ea"),{name:"HomeChartStats",props:{value:Object},computed:{stats:function(){return this.value.stats},zone:function(){return this.value.zone}},watch:{},methods:{moolahRound:function(t){return Math.abs(Number(t))>=1e9?Math.round(Math.abs(Number(t))/1e9)+"B":Math.abs(Number(t))>=1e6?Math.round(Math.abs(Number(t))/1e6)+"M":Math.abs(Number(t))>=1e3?Math.round(Math.abs(Number(t))/1e3)+"K":Math.abs(Number(t))},numberWithCommas:function(t){return null===t||void 0===t?void 0:t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},plusMinusStr:function(t){return 0==t?"":"(".concat(t>0?"+".concat(t):t,")")}}}),u=l,d=(a("83bb"),a("2877")),p=Object(d["a"])(u,o,c,!1,null,"466f82f8",null),v=p.exports,f=a("6afe"),h=a("9424"),m=a("0644"),y=a.n(m),g=a("1946");function b(t){return x(t)||C(t)||_(t)||A()}function A(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _(t,e){if(t){if("string"===typeof t)return w(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?w(t,e):void 0}}function C(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function x(t){if(Array.isArray(t))return w(t)}function w(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=t[a];return n}function k(t,e,a,n,r,s,i){try{var o=t[s](i),c=o.value}catch(l){return void a(l)}o.done?e(c):Promise.resolve(c).then(n,r)}function S(t){return function(){var e=this,a=arguments;return new Promise((function(n,r){var s=t.apply(e,a);function i(t){k(s,n,r,i,o,"next",t)}function o(t){k(s,n,r,i,o,"throw",t)}i(void 0)}))}}var M={lastUpdate:null,total:{},daily:{}},T={name:"ZoneCard",mixins:[f["a"],h["a"]],components:{HomeChartStats:v},props:{zone:String,value:Object},computed:{myStatsModel:function(){return{zone:this.zone,stats:this.stats}},population:function(){return this.value.population},periods:function(){return this.value.periods?this.value.periods:1},hiddenDatasets:{get:function(){return this.value.hiddenDatasets?this.value.hiddenDatasets:g["d"]},set:function(t){this.emitModel({hiddenDatasets:t})}}},watch:{periods:function(t,e){this.updateChartData()},hiddenDatasets:function(){var t=S(i.a.mark((function t(e,a){return i.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:this.updateChartHiddenDatasets(),this.updateQuery("hidden",e,g["d"]);case 2:case"end":return t.stop()}}),t,this)})));function e(e,a){return t.apply(this,arguments)}return e}()},data:function(){return{chartInstance:null,legendHTML:null,stats:y()(M),componentStats:null,data:y()(g["c"])}},methods:{onClickFullscreen:function(t){t.target.closest(".cell").classList.toggle("width-100")},legendOnClick:function(t){var e=t.target.closest(".item");if(e){var a=t.target.closest(".legend");"none"==t.target.style.textDecoration?t.target.style.textDecoration="line-through":t.target.style.textDecoration="none";var n=b(a.querySelectorAll(".text")).map((function(t){return"none"!=t.style.textDecoration}));this.hiddenDatasets=n}},updateChartData:function(){var t=this;S(i.a.mark((function e(){var a,n,r,s,o,c,l;return i.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a="https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/chartjs/".concat(t.periods,"/").concat(t.zone,".json?_=").concat(Date.now()),e.next=3,fetch(a);case 3:return n=e.sent,e.next=6,n.json();case 6:r=e.sent,t.$set(t.data,"datasets",r.datasets),t.$set(t.data,"labels",r.labels),s=0,o=!1,c=r.datasets[4].data.length;while(!o)s++,0!=r.datasets[0].data[c-s]&&(o=!0);l=c-s,t.$set(t.stats,"population",t.population),t.$set(t.stats,"lastUpdate",r.labels[c-s]),t.$set(t.stats,"total",{confirmed:r.datasets[4].data[l],recover:r.datasets[5].data[l],death:r.datasets[6].data[l],active:r.datasets[7].data[l]}),t.$set(t.stats,"daily",{confirmed:r.datasets[0].data[l],recover:r.datasets[1].data[l],death:r.datasets[2].data[l],active:r.datasets[3].data[l]}),t.updateChartHiddenDatasets();case 19:case"end":return e.stop()}}),e)})))()},updateChartHiddenDatasets:function(){var t=this;this.chartInstance&&this.hiddenDatasets.length&&(this.hiddenDatasets.forEach((function(e,a){if(t.chartInstance.data.datasets.length){if(!t.chartInstance.data.datasets[a])return;t.chartInstance.data.datasets[a].hidden=e}})),this.chartInstance.update(),this.legendHTML=this.chartInstance.generateLegend())}},created:function(){var t=this.$route.query.hidden;t&&(t=t.split("").map((function(t){return"1"==t})),this.hiddenDatasets=t),this.updateChartData()},mounted:function(){if(!this.chartInstance){var t=a("b16f"),e=t.initChartDaily;this.chartInstance=e({zone:this.zone,data:this.data})}this.componentStats=v},destroyed:function(){this.data=y()(g["c"]),this.componentStats=null,this.stats=y()(M),this.chartInstance&&(this.chartInstance.destroy(),this.chartInstance=null)}},E=T,O=(a("03c2"),Object(d["a"])(E,n,r,!1,null,"1e4a8124",null));e["a"]=O.exports},b16f:function(t,e,a){"use strict";a.r(e),a.d(e,"initChartDaily",(function(){return i})),a.d(e,"initChartRanking",(function(){return o}));var n=a("66c0"),r=new Image;r.src="img/watermark2.png";var s={image:r,x:0,y:0,opacity:1,alignX:"middle",alignY:"middle",position:"front"},i=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{zone:null,data:null},e=new n("Chart_".concat(t.zone),{type:"line",data:t.data,options:{tooltips:{mode:"index",intersect:!1,callbacks:{labelColor:function(t,e){t.datasetIndex;return{borderColor:e.data.datasets[t.datasetIndex].borderColor,backgroundColor:e.data.datasets[t.datasetIndex].borderColor}},label:function(t,e){var a=t.datasetIndex%8,n=e.datasets[a].label||"",r=e.datasets[a].data[t.index],s=e.datasets[a+4].data[t.index],i=0==r?"0":r>0?"+".concat(r):r,o=(t.datasetIndex/4).toFixed(1);return o=o>=1&&o<2,o?"".concat(n,": ").concat(r):"".concat(n,": ").concat(i,", Total: ").concat(s," ")}}},legend:{display:!1},legendCallback:function(t){var e=t.legend.legendItems.map((function(t){return"<div class='cell item'>\n  <div class='grid-x'>\n    <div class='cell small-2'>\n      <span class='color' style=\"background-color:".concat(t.fillStyle,";border:.2rem solid ").concat(t.strokeStyle,";\"></span>\n    </div>\n    <div class='cell small-10'>\n      <span class='text' style=\"text-decoration:").concat(t.hidden?"line-through":"none",';">').concat(t.text,"</span>\n    </div>\n  </div>\n</div>")})).join("\n");return e},elements:{line:{tension:.2},point:{radius:2}},scales:{xAxes:[{gridLines:{display:!1},ticks:{display:!1}}],yAxes:[{gridLines:{display:!1},ticks:{display:!1}}]},animation:{duration:0},hover:{animationDuration:0},responsiveAnimationDuration:0,watermark:s}});return e},o=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{elementId:null,data:null,onClick:null},e=new n(t.elementId,{type:"horizontalBar",data:t.data,options:{onClick:t.onClick,maintainAspectRatio:!1,legend:{display:!1},animation:{duration:0},hover:{animationDuration:0},responsiveAnimationDuration:0,watermark:s,scales:{xAxes:[{gridLines:{display:!1},ticks:{display:!1,min:0}}],yAxes:[{gridLines:{display:!1},ticks:{}}]},tooltips:{}}});return e}},dc6c:function(t,e,a){"use strict";var n=a("4fd6"),r=a.n(n);r.a},e249:function(t,e){t.exports=LazyLoad}});
//# sourceMappingURL=app.81d1debc.js.map