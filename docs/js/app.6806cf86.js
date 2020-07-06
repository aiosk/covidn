(function(t){function e(e){for(var a,s,o=e[0],c=e[1],l=e[2],u=0,h=[];u<o.length;u++)s=o[u],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&h.push(r[s][0]),r[s]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);d&&d(e);while(h.length)h.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],a=!0,o=1;o<n.length;o++){var c=n[o];0!==r[c]&&(a=!1)}a&&(i.splice(e--,1),t=s(s.s=n[0]))}return t}var a={},r={app:0},i=[];function s(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=a,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(n,a,function(e){return t[e]}.bind(null,a));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/covidn/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var d=c;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"012f":function(t,e,n){},1757:function(t,e,n){"use strict";var a=n("b7d0"),r=n.n(a);r.a},"1c9c":function(t,e){t.exports=domtoimage},"56d7":function(t,e,n){"use strict";n.r(e);var a=n("2b0e"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"grid-container",attrs:{id:"app"}},[t._m(0),t._m(1),n("br"),n("MyForm",{model:{value:t.myModel,callback:function(e){t.myModel=e},expression:"myModel"}}),t._m(2),n("div",{staticClass:"grid-x xlarge-up-2",attrs:{id:"myChart","aria-describedby":"chartHelpText"}},t._l(t.myModel.selectedZones,(function(e){return n("div",{key:e,staticClass:"cell",class:{"width-100":"NATIONAL"==e}},[n("MyChart",{ref:e,refInFor:!0,attrs:{zone:e},model:{value:t.myModel,callback:function(e){t.myModel=e},expression:"myModel"}})],1)})),0),n("button",{staticClass:"button small",attrs:{id:"top"},on:{click:t.topBtnOnClick}},[n("img",{staticClass:"lazy",attrs:{"data-src":"img/baseline_vertical_align_top_black_18dp.png",alt:"Scroll to top"}})])],1)},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a",{attrs:{href:"./"}},[n("h4",{staticClass:"text-center"},[t._v("Daily Indonesia COVID-19 cases")]),n("h5",{staticClass:"text-center"},[t._v("National and Provinces")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"clearfix"},[t._v(" "),n("a",{staticClass:"float-right",attrs:{href:"https://github.com/aiosk/covidn"}},[n("img",{staticClass:"lazy",attrs:{alt:"GitHub stars","data-src":"https://img.shields.io/github/stars/aiosk/covidn?logo=github&style=for-the-badge"}})])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"help-text callout secondary",attrs:{id:"chartHelpText"}},[n("ul",[n("li",{staticClass:"hide-for-xlarge"},[t._v("For best results please view in "),n("strong",[t._v("landscape")]),t._v(" mode")]),n("li",[t._v("Click "),n("img",{staticClass:"lazy",attrs:{"data-src":"./img/baseline_get_app_black_18dp.png",alt:"download chart"}}),t._v(" to save chart as image")]),n("li",[t._v("Click "),n("img",{staticClass:"lazy",attrs:{"data-src":"./img/baseline_backup_table_black_18dp.png",alt:"download raw",title:"download raw"}}),t._v(" to save chart raw data")]),n("li",{staticClass:"show-for-xlarge"},[t._v("Click "),n("img",{staticClass:"lazy",attrs:{"data-src":"./img/baseline_fullscreen_black_18dp.png",alt:"fullscreen"}}),t._v(" to toggle chart "),n("strong",[t._v("full-width")]),t._v(" mode")]),n("li",[n("strong",{staticClass:"show-for-xlarge"},[t._v("Click")]),n("strong",{staticClass:"hide-for-xlarge"},[t._v("Tap / Touch")]),t._v(" chart legend to show/hide chart data")]),n("li",[n("strong",{staticClass:"show-for-xlarge"},[t._v("Hover")]),n("strong",{staticClass:"hide-for-xlarge"},[t._v("Tap / Touch")]),t._v(" chart legend to show case number")]),n("li",{staticClass:"hide-for-xlarge"},[n("strong",[t._v("Tap / Touch outside")]),t._v(" chart legend to hide case number")])])])}],s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("form",{staticClass:"my-form callout secondary"},[n("div",{staticClass:"grid-x periods"},[n("div",{staticClass:"cell xlarge-3"},[n("label",{attrs:{for:"periods"}},[n("span",[t._v(t._s(t.periods))]),t._v(" days period")])]),n("div",{staticClass:"cell xlarge-9"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.periods,expression:"periods"}],attrs:{id:"periods",name:"periods",type:"range",min:"1",max:"21",step:"1","aria-describedby":"periodsHelpText"},domProps:{value:t.periods},on:{__r:function(e){t.periods=e.target.value}}}),t._m(0)])]),n("div",{staticClass:"grid-x zones"},[t._m(1),n("div",{staticClass:"cell xlarge-9"},[n("select",{directives:[{name:"model",rawName:"v-model",value:t.selectedZones,expression:"selectedZones"}],attrs:{id:"zones",name:"zones",multiple:""},on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.selectedZones=e.target.multiple?n:n[0]}}},t._l(t.zones,(function(e){return n("option",{key:e,domProps:{value:e}},[t._v(t._s(e.split("_").join(" ")))])})),0),n("p",{staticClass:"help-text"},[t._v("Too many charts, i don't like to scroll, i want to select some chart")])])])])},o=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"help-text",attrs:{id:"periodsHelpText"}},[t._v("Try smaller or larger data periods by sliding (tap/click => hold => move) slider to change days period."),n("br"),n("strong",[t._v("Smaller")]),t._v(" day periods will generate complicated chart data, while "),n("strong",[t._v("larger")]),t._v(" day periods will generate simplified chart data. Use wisely.")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"cell xlarge-3"},[n("label",{attrs:{for:"zones"}},[t._v("Zone")])])}],c=n("0644"),l=n.n(c),d={name:"MyForm",props:{value:Object},computed:{zones:function(){return this.value.zones},periods:{get:function(){return this.value.periods},set:function(t){var e=l()(this.value);this.$set(e,"periods",t),this.$emit("input",e)}},selectedZones:{get:function(){return this.value.selectedZones},set:function(t){var e=l()(this.value);this.$set(e,"selectedZones",t),this.$emit("input",e)}}}},u=d,h=(n("1757"),n("2877")),p=Object(h["a"])(u,s,o,!1,null,"52214b4a",null),f=p.exports,m=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"my-chart card",attrs:{"aria-describedby":"chartHelpText"}},[n("div",{staticClass:"capture"},[n("div",{staticClass:"card-divider title"},[n("h1",[t._v(t._s(t.zone.split("_").join(" ")))])]),n("div",{staticClass:"card-section legend grid-x small-up-2 medium-up-4",domProps:{innerHTML:t._s(t.legendHTML)},on:{click:t.legendOnClick}}),n("div",{staticClass:"card-image"},[n("canvas",{attrs:{id:"Chart_"+t.zone}})])]),n("div",{staticClass:"card-section action"},[n("a",{staticClass:"icon download-raw",attrs:{rel:"noopener",href:"https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/csv/"+this.zone+".csv",target:"_blank"}},[n("img",{staticClass:"lazy",attrs:{"data-src":"./img/baseline_backup_table_black_18dp.png",alt:"download raw",title:"download raw"}})]),n("a",{staticClass:"icon download-chart",on:{click:t.onClickDownloadChart}},[n("img",{staticClass:"lazy",attrs:{"data-src":"./img/baseline_get_app_black_18dp.png",alt:"download chart",title:"download chart"}})]),n("a",{staticClass:"icon fullscreen show-for-xlarge",on:{click:t.onClickFullscreen}},[n("img",{staticClass:"lazy",attrs:{"data-src":"./img/baseline_fullscreen_black_18dp.png",alt:"fullscreen"}})])])])},v=[],y=n("a34a"),g=n.n(y),_=n("eafc"),A=n.n(_);function b(t){return I(t)||C(t)||x(t)||w()}function w(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function x(t,e){if(t){if("string"===typeof t)return M(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?M(t,e):void 0}}function C(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function I(t){if(Array.isArray(t))return M(t)}function M(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function S(t,e,n,a,r,i,s){try{var o=t[i](s),c=o.value}catch(l){return void n(l)}o.done?e(c):Promise.resolve(c).then(a,r)}function T(t){return function(){var e=this,n=arguments;return new Promise((function(a,r){var i=t.apply(e,n);function s(t){S(i,a,r,s,o,"next",t)}function o(t){S(i,a,r,s,o,"throw",t)}s(void 0)}))}}var k,L={name:"MyChart",props:{zone:String,value:Object},computed:{periods:function(){return this.value.periods},hiddenDatasets:function(){return this.value.hiddenDatasets},mqIsAtLeastMedium:function(){return this.value.mediaQuery.isAtLeastMedium}},data:function(){return{chartInstance:null,legendHTML:null,data:{datasets:[],labels:[]}}},watch:{periods:function(t,e){this.updateData()},hiddenDatasets:function(t,e){this.updateDatasets()},mqIsAtLeastMedium:function(t,e){this.chartInstance&&(this.chartInstance.options.scales.xAxes[0].ticks.display=t,this.chartInstance.options.scales.yAxes[0].ticks.display=!0,this.chartInstance.update())}},methods:{onClickFullscreen:function(t){t.target.closest(".cell").classList.toggle("width-100")},onClickDownloadChart:function(t){var e=this;if(this.chartInstance){var a=n("1c9c");t.target.closest("a.download-chart");T(g.a.mark((function n(){var r,i;return g.a.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,a.toJpeg(t.target.closest(".card").querySelector(".capture"));case 2:r=n.sent,i=document.createElement("a"),i.href=r,i.download="Chart_".concat(e.zone,".jpeg"),i.click();case 7:case"end":return n.stop()}}),n)})))()}},legendOnClick:function(t){t.target.closest(".item");var e=t.target.closest(".legend");"none"==t.target.style.textDecoration?t.target.style.textDecoration="line-through":t.target.style.textDecoration="none";var n=b(e.querySelectorAll(".text")).map((function(t){return"none"!=t.style.textDecoration})),a=l()(this.value);this.$set(a,"hiddenDatasets",n),this.$emit("input",a)},updateData:function(){var t=this;this.chartInstance&&T(g.a.mark((function e(){var n,a,r;return g.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n="https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/chartjs/".concat(t.zone,"-").concat(t.periods,".json?_=").concat(Date.now()),e.next=3,fetch(n);case 3:return a=e.sent,e.next=6,a.json();case 6:r=e.sent,t.$set(t.data,"datasets",r.datasets),t.$set(t.data,"labels",r.labels),t.updateDatasets();case 10:case"end":return e.stop()}}),e)})))()},updateDatasets:function(){var t=this;this.chartInstance&&(this.hiddenDatasets.forEach((function(e,n){t.chartInstance.data.datasets.length&&(t.chartInstance.data.datasets[n].hidden=e)})),this.chartInstance.update(),this.legendHTML=this.chartInstance.generateLegend())},init:function(){var t=this;A()((function(){var e=n("b16f"),a=e.initChart;t.chartInstance=a({zone:t.zone,data:t.data,mqIsAtLeastMedium:t.mqIsAtLeastMedium}),A()((function(){t.updateData()}),9)}),499)}},mounted:function(){},destroyed:function(){this.chartInstance&&this.chartInstance.destroy()}},z=L,E=(n("9a5b"),Object(h["a"])(z,m,v,!1,null,"661604a1",null)),N=E.exports,U=n("63ea"),O=n.n(U),j=n("c707"),R=n.n(j),D=["NATIONAL","DKI_JAKARTA","JAWA_BARAT","JAWA_TIMUR","JAWA_TENGAH","SULAWESI_SELATAN","BANTEN","NUSA_TENGGARA_BARAT","BALI","PAPUA","KALIMANTAN_SELATAN","SUMATERA_BARAT","SUMATERA_SELATAN","KALIMANTAN_TENGAH","KALIMANTAN_TIMUR","SUMATERA_UTARA","DAERAH_ISTIMEWA_YOGYAKARTA","KALIMANTAN_UTARA","KEPULAUAN_RIAU","KALIMANTAN_BARAT","SULAWESI_TENGGARA","LAMPUNG","SULAWESI_UTARA","SULAWESI_TENGAH","RIAU","PAPUA_BARAT","SULAWESI_BARAT","JAMBI","MALUKU_UTARA","MALUKU","GORONTALO","KEPULAUAN_BANGKA_BELITUNG","ACEH","BENGKULU","NUSA_TENGGARA_TIMUR"],P=function(t){console.log(t)},$=8,q=[!0,!1,!0,!1,!0,!1,!0,!1],H={name:"App",components:{MyForm:f,MyChart:N},data:function(){return{lazyLoadCanvas:null,lazyLoad:null,myModel:{mediaQuery:{isAtLeastMedium:!1},periods:$,zones:D,selectedZones:l()(D),hiddenDatasets:l()(q)}}},watch:{"myModel.hiddenDatasets":function(t,e){var n=new URLSearchParams(window.location.search);n.delete("hidden"),O()(t,q)||n.set("hidden",t.join("+")),window.history.replaceState({},"","".concat(location.pathname,"?").concat(n))},"myModel.periods":function(t,e){var n=new URLSearchParams(window.location.search);n.set("periods",t),window.history.replaceState({},"","".concat(location.pathname,"?").concat(n))},"myModel.selectedZones":function(t,e){var n=this;A()((function(){n.lazyLoadCanvas&&n.lazyLoad&&(n.lazyLoadCanvas.update(),n.lazyLoad.update())}),9);var a=new URLSearchParams(window.location.search);a.delete("zones"),t.length&&!O()(R()(t),R()(D))&&a.set("zones",t.join("+")),window.history.replaceState({},"","".concat(location.pathname,"?").concat(a))}},methods:{windowOnResize:function(t){this.$set(this.myModel.mediaQuery,"isAtLeastMedium",k.atLeast("medium"))},topBtnOnClick:function(t){document.querySelector("#chartHelpText").scrollIntoView({behavior:"smooth"})}},created:function(){var t=this;window.addEventListener("resize",this.windowOnResize);var e=new URLSearchParams(window.location.search),n=e.get("zones"),a=e.get("hidden"),r=this;a&&(a=a.split("+"),a.map((function(t){return JSON.parse("true"==t.toLowerCase())})).forEach((function(e,n){r.$set(t.myModel.hiddenDatasets,n,e)}))),n&&(n=n.split("+"),this.myModel.selectedZones=n.length?n:l()(D));var i=e.get("periods");i=i||$,O()(i,$)||(this.myModel.periods=i)},mounted:function(){var t=this,e=n("dc55");k=e.MediaQuery,k._init(),this.$set(this.myModel.mediaQuery,"isAtLeastMedium",k.atLeast("medium")),A()((function(){var e=n("e249");t.lazyLoadCanvas=new e({elements_selector:"canvas",unobserve_entered:!0,callback_enter:function(e){var n=e.id.split("_").slice(1).join("_"),a=t.$refs[n];a[0].init()},callback_exit:function(t){var e=t.id.split("_").slice(1).join("_");console.log("exit",e)},callback_loading:P,callback_loaded:P}),t.lazyLoad=new e}),99)},destroyed:function(){window.removeEventListener("resize",this.windowOnResize)}},B=H,G=(n("5c0b"),Object(h["a"])(B,r,i,!1,null,null,null)),K=G.exports;a["a"].config.productionTip=!1,new a["a"]({render:function(t){return t(K)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";var a=n("9c0c"),r=n.n(a);r.a},"66c0":function(t,e){t.exports=Chart},"9a5b":function(t,e,n){"use strict";var a=n("012f"),r=n.n(a);r.a},"9c0c":function(t,e,n){},b16f:function(t,e,n){"use strict";n.r(e),n.d(e,"initChart",(function(){return l}));n("4cfe");var a=n("d180"),r=n.n(a),i=n("5e9e"),s=n.n(i),o=n("66c0"),c=new Image;c.src="img/watermark2.png";var l=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{zone:null,data:null,mqIsAtLeastMedium:!1},e=new o("Chart_".concat(t.zone),{type:"bar",data:t.data,options:{tooltips:{mode:"index",intersect:!1,callbacks:{labelColor:function(t,e){var n=t.datasetIndex%2?t.datasetIndex-1:t.datasetIndex;return{backgroundColor:e.data.datasets[n].backgroundColor}},label:function(t,e){var n=t.datasetIndex%2?t.datasetIndex-1:t.datasetIndex,a=e.datasets[n].label||"",i=e.datasets[n].data[t.index],o=r()(s()(e.datasets[n].data,t.index+1));return"".concat(a,": ").concat(i,", Total ").concat(a,": ").concat(o)}}},legend:{display:!1},legendCallback:function(t){var e=t.legend.legendItems.map((function(t){return"<div class='cell item ".concat(t.text,"'>\n  <div class='grid-x'>\n    <div class='cell small-2 color' style=\"background-color:").concat(t.fillStyle,";border:.2rem solid ").concat(t.strokeStyle,";\"></div>\n    <div class='cell small-10 text' style=\"text-decoration:").concat(t.hidden?"line-through":"none",';">').concat(t.text,"</div>\n  </div>\n</div>")})).join("\n");return e},scales:{xAxes:[{ticks:{display:t.mqIsAtLeastMedium}}]},animation:{duration:0},hover:{animationDuration:0},responsiveAnimationDuration:0,watermark:{image:c,x:0,y:0,opacity:1,alignX:"middle",alignY:"middle",position:"front"}}});return e}},b7d0:function(t,e,n){},dc55:function(t,e,n){"use strict";function a(t){return a="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}function r(t,e){return l(t)||c(t,e)||s(t,e)||i()}function i(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(t,e){if(t){if("string"===typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(t,e):void 0}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function c(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var n=[],a=!0,r=!1,i=void 0;try{for(var s,o=t[Symbol.iterator]();!(a=(s=o.next()).done);a=!0)if(n.push(s.value),e&&n.length===e)break}catch(c){r=!0,i=c}finally{try{a||null==o["return"]||o["return"]()}finally{if(r)throw i}}return n}}function l(t){if(Array.isArray(t))return t}n.r(e),n.d(e,"MediaQuery",(function(){return d}));window.matchMedia||(window.matchMedia=function(){var t=window.styleMedia||window.media;if(!t){var e=document.createElement("style"),n=document.getElementsByTagName("script")[0],a=null;e.type="text/css",e.id="matchmediajs-test",n?n.parentNode.insertBefore(e,n):document.head.appendChild(e),a="getComputedStyle"in window&&window.getComputedStyle(e,null)||e.currentStyle,t={matchMedium:function(t){var n="@media "+t+"{ #matchmediajs-test { width: 1px; } }";return e.styleSheet?e.styleSheet.cssText=n:e.textContent=n,"1px"===a.width}}}return function(e){return{matches:t.matchMedium(e||"all"),media:e||"all"}}}());var d={queries:[],current:"",_init:function(){if(!0!==this.isInitialized){this.isInitialized=!0;var t=this,e=getComputedStyle(document.querySelector(".foundation-mq")).fontFamily,n=u(e);for(var a in t.queries=[],n)n.hasOwnProperty(a)&&t.queries.push({name:a,value:"only screen and (min-width: ".concat(n[a],")")});this.current=this._getCurrentSize()}},_reInit:function(){this.isInitialized=!1,this._init()},atLeast:function(t){var e=this.get(t);return!!e&&window.matchMedia(e).matches},only:function(t){return t===this._getCurrentSize()},upTo:function(t){var e=this.next(t);return!e||!this.atLeast(e)},is:function(t){var e=t.trim().split(" ").filter((function(t){return!!t.length})),n=r(e,2),a=n[0],i=n[1],s=void 0===i?"":i;if("only"===s)return this.only(a);if(!s||"up"===s)return this.atLeast(a);if("down"===s)return this.upTo(a);throw new Error('\n      Invalid breakpoint passed to MediaQuery.is().\n      Expected a breakpoint name formatted like "<size> <modifier>", got "'.concat(t,'".\n    '))},get:function(t){for(var e in this.queries)if(this.queries.hasOwnProperty(e)){var n=this.queries[e];if(t===n.name)return n.value}return null},next:function(t){var e=this,n=this.queries.findIndex((function(n){return e._getQueryName(n)===t}));if(-1===n)throw new Error('\n        Unknown breakpoint "'.concat(t,'" passed to MediaQuery.next().\n        Ensure it is present in your Sass "$breakpoints" setting.\n      '));var a=this.queries[n+1];return a?a.name:null},_getQueryName:function(t){if("string"===typeof t)return t;if("object"===a(t))return t.name;throw new TypeError('\n      Invalid value passed to MediaQuery._getQueryName().\n      Expected a breakpoint name (String) or a breakpoint query (Object), got "'.concat(t,'" (').concat(a(t),")\n    "))},_getCurrentSize:function(){for(var t,e=0;e<this.queries.length;e++){var n=this.queries[e];window.matchMedia(n.value).matches&&(t=n)}return t&&this._getQueryName(t)}};function u(t){var e={};return"string"!==typeof t?e:(t=t.trim().slice(1,-1),t?(e=t.split("&").reduce((function(t,e){var n=e.replace(/\+/g," ").split("="),a=n[0],r=n[1];return a=decodeURIComponent(a),r="undefined"===typeof r?null:decodeURIComponent(r),t.hasOwnProperty(a)?Array.isArray(t[a])?t[a].push(r):t[a]=[t[a],r]:t[a]=r,t}),{}),e):e)}},e249:function(t,e){t.exports=LazyLoad}});
//# sourceMappingURL=app.6806cf86.js.map