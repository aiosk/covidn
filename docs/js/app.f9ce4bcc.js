(function(t){function e(e){for(var n,r,o=e[0],c=e[1],l=e[2],d=0,u=[];d<o.length;d++)r=o[d],Object.prototype.hasOwnProperty.call(s,r)&&s[r]&&u.push(s[r][0]),s[r]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);h&&h(e);while(u.length)u.shift()();return i.push.apply(i,l||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],n=!0,r=1;r<a.length;r++){var o=a[r];0!==s[o]&&(n=!1)}n&&(i.splice(e--,1),t=c(c.s=a[0]))}return t}var n={},r={app:0},s={app:0},i=[];function o(t){return c.p+"js/"+({about:"about",density:"density",ranking:"ranking"}[t]||t)+"."+{about:"59073a95",density:"2e2d582f",ranking:"407fc7c9"}[t]+".js"}function c(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.e=function(t){var e=[],a={about:1,density:1,ranking:1};r[t]?e.push(r[t]):0!==r[t]&&a[t]&&e.push(r[t]=new Promise((function(e,a){for(var n="css/"+({about:"about",density:"density",ranking:"ranking"}[t]||t)+"."+{about:"0e433876",density:"1aea3639",ranking:"b475dcb5"}[t]+".css",s=c.p+n,i=document.getElementsByTagName("link"),o=0;o<i.length;o++){var l=i[o],d=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(d===n||d===s))return e()}var u=document.getElementsByTagName("style");for(o=0;o<u.length;o++){l=u[o],d=l.getAttribute("data-href");if(d===n||d===s)return e()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=e,h.onerror=function(e){var n=e&&e.target&&e.target.src||s,i=new Error("Loading CSS chunk "+t+" failed.\n("+n+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=n,delete r[t],h.parentNode.removeChild(h),a(i)},h.href=s;var p=document.getElementsByTagName("head")[0];p.appendChild(h)})).then((function(){r[t]=0})));var n=s[t];if(0!==n)if(n)e.push(n[2]);else{var i=new Promise((function(e,a){n=s[t]=[e,a]}));e.push(n[2]=i);var l,d=document.createElement("script");d.charset="utf-8",d.timeout=120,c.nc&&d.setAttribute("nonce",c.nc),d.src=o(t);var u=new Error;l=function(e){d.onerror=d.onload=null,clearTimeout(h);var a=s[t];if(0!==a){if(a){var n=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src;u.message="Loading chunk "+t+" failed.\n("+n+": "+r+")",u.name="ChunkLoadError",u.type=n,u.request=r,a[1](u)}s[t]=void 0}};var h=setTimeout((function(){l({type:"timeout",target:d})}),12e4);d.onerror=d.onload=l,document.head.appendChild(d)}return Promise.all(e)},c.m=t,c.c=n,c.d=function(t,e,a){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)c.d(a,n,function(e){return t[e]}.bind(null,n));return a},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/covidn/",c.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],d=l.push.bind(l);l.push=e,l=l.slice();for(var u=0;u<l.length;u++)e(l[u]);var h=d;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},1946:function(t,e,a){"use strict";a.d(e,"e",(function(){return n})),a.d(e,"d",(function(){return r})),a.d(e,"c",(function(){return s})),a.d(e,"b",(function(){return i})),a.d(e,"a",(function(){return o}));var n=["NATIONAL","DKI_JAKARTA","JAWA_BARAT","JAWA_TIMUR","JAWA_TENGAH","SULAWESI_SELATAN","BANTEN","NUSA_TENGGARA_BARAT","BALI","PAPUA","KALIMANTAN_SELATAN","SUMATERA_BARAT","SUMATERA_SELATAN","KALIMANTAN_TENGAH","KALIMANTAN_TIMUR","SUMATERA_UTARA","DAERAH_ISTIMEWA_YOGYAKARTA","KALIMANTAN_UTARA","KEPULAUAN_RIAU","KALIMANTAN_BARAT","SULAWESI_TENGGARA","LAMPUNG","SULAWESI_UTARA","SULAWESI_TENGAH","RIAU","PAPUA_BARAT","SULAWESI_BARAT","JAMBI","MALUKU_UTARA","MALUKU","GORONTALO","KEPULAUAN_BANGKA_BELITUNG","ACEH","BENGKULU","NUSA_TENGGARA_TIMUR"],r=["NATIONAL"],s=3,i=[!0,!0,!0,!0,!0,!0,!0,!0,!1,!1,!1,!1],o=["confirmed","recover","death","active"]},"1c9c":function(t,e){t.exports=domtoimage},"21bb":function(t,e,a){"use strict";var n=a("2dad"),r=a.n(n);r.a},"2dad":function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);var n=a("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"grid-container",attrs:{id:"app"}},[a("ul",{staticClass:"menu vertical medium-horizontal",attrs:{id:"nav"}},[t._m(0),a("router-link",{attrs:{to:"/daily"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.href,r=(e.route,e.navigate),s=e.isActive,i=e.isExactActive;return[a("li",{class:[s&&"is-active",i&&"is-active"]},[a("a",{attrs:{href:n},on:{click:r}},[t._v("Daily")])])]}}])}),a("router-link",{attrs:{to:"/ranking"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.href,r=(e.route,e.navigate),s=e.isActive,i=e.isExactActive;return[a("li",{class:[s&&"is-active",i&&"is-active"]},[a("a",{attrs:{href:n},on:{click:r}},[t._v("Ranking")])])]}}])}),a("router-link",{attrs:{to:"/density"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.href,r=(e.route,e.navigate),s=e.isActive,i=e.isExactActive;return[a("li",{class:[s&&"is-active",i&&"is-active"]},[a("a",{attrs:{href:n},on:{click:r}},[t._v("Density")])])]}}])}),a("router-link",{attrs:{to:"/about"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.href,r=(e.route,e.navigate),s=e.isActive,i=e.isExactActive;return[a("li",{class:[s&&"is-active",i&&"is-active"]},[a("a",{attrs:{href:n},on:{click:r}},[t._v("About")])])]}}])}),t._m(1)],1),t._m(2),a("br"),a("router-view"),a("button",{staticClass:"button small",attrs:{id:"top"},on:{click:t.topBtnOnClick}},[a("i",{staticClass:"icon-angle-circled-up",attrs:{title:"Scroll to top"}})])],1)},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"menu-text"},[a("a",{attrs:{href:"./"}},[t._v("COVIDN")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"github"},[a("a",{attrs:{href:"https://github.com/aiosk/covidn"}},[a("img",{attrs:{alt:"GitHub stars",src:"https://img.shields.io/github/stars/aiosk/covidn?logo=github&style=for-the-badge"}})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"callout warning hide-for-medium",attrs:{id:"chartHelpText"}},[a("ul",{staticClass:"help-text"},[a("li",[t._v("For best results please view in "),a("strong",[t._v("landscape")]),t._v(" mode")])])])}],i={name:"App",methods:{topBtnOnClick:function(t){document.querySelector("#chartHelpText").scrollIntoView({behavior:"smooth"})}},mounted:function(){},destroyed:function(){}},o=i,c=(a("5c0b"),a("2877")),l=Object(c["a"])(o,r,s,!1,null,null,null),d=l.exports,u=a("8c4f"),h=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[a("h3",[t._v("Daily Cases per Provinces")]),a("MyForm",{model:{value:t.myModel,callback:function(e){t.myModel=e},expression:"myModel"}}),a("div",{staticClass:"grid-x xlarge-up-2",attrs:{"aria-describedby":"chartHelpText"}},[t._l(t.myModel.selectedZones,(function(e){return[a("div",{key:e,staticClass:"cell",class:[{"width-100":"NATIONAL"==e},"chart-item"],attrs:{id:"CellChart_"+e}},[a(t.homeChart[e],{key:e,ref:e,refInFor:!0,tag:"component",attrs:{zone:e},model:{value:t.myModel,callback:function(e){t.myModel=e},expression:"myModel"}})],1)]}))],2)],1)},p=[],v=a("a34a"),f=a.n(v),m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("form",{staticClass:"my-form callout secondary"},[a("div",{staticClass:"grid-x periods"},[a("div",{staticClass:"cell xlarge-3"},[a("label",{attrs:{for:"periods"}},[a("span",[t._v(t._s(t.periods))]),t._v(" days period")])]),a("div",{staticClass:"cell xlarge-9"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.periods,expression:"periods"}],attrs:{id:"periods",name:"periods",type:"range",min:"1",max:"14",step:"1","aria-describedby":"periodsHelpText"},domProps:{value:t.periods},on:{__r:function(e){t.periods=e.target.value}}}),t._m(0)])]),a("div",{staticClass:"grid-x zones"},[t._m(1),a("div",{staticClass:"cell xlarge-9"},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.selectedZones,expression:"selectedZones"}],attrs:{id:"zones",name:"zones",multiple:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.selectedZones=e.target.multiple?a:a[0]}}},t._l(t.zones,(function(e){return a("option",{key:e,domProps:{value:e}},[t._v(t._s(e.split("_").join(" ")))])})),0),a("p",{staticClass:"help-text"},[t._v("Too many charts, i don't like to scroll, i want to select some chart")])])])])},y=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",{staticClass:"help-text",attrs:{id:"periodsHelpText"}},[t._v("Try smaller or larger data periods by sliding (tap/click => hold => move) slider to change days period."),a("br"),a("strong",[t._v("Smaller")]),t._v(" day periods will generate complicated chart data, while "),a("strong",[t._v("larger")]),t._v(" day periods will generate simplified chart data. Use wisely.")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cell xlarge-3"},[a("label",{attrs:{for:"zones"}},[t._v("Zone")])])}],g=a("0644"),b=a.n(g),A={name:"MyForm",props:{value:Object},computed:{zones:function(){return this.value.zones},periods:{get:function(){return this.value.periods},set:function(t){var e=b()(this.value);this.$set(e,"periods",t),this.$emit("input",e)}},selectedZones:{get:function(){return this.value.selectedZones},set:function(t){var e=b()(this.value);this.$set(e,"selectedZones",t),this.$emit("input",e)}}}},_=A,C=(a("c4de"),Object(c["a"])(_,m,y,!1,null,"00945366",null)),x=C.exports,w=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home-chart card",attrs:{"aria-describedby":"chartHelpText"}},[a("div",{staticClass:"capture"},[a("div",{staticClass:"card-divider title"},[a("h5",[t._v(t._s(t.zone.split("_").join(" ")))])]),a("div",{staticClass:"card-image stats"},[a(t.homeChartStats,{tag:"component",model:{value:t.myStatsModel,callback:function(e){t.myStatsModel=e},expression:"myStatsModel"}})],1),a("div",{staticClass:"card-image"},[a("div",{staticClass:"legend grid-x small-up-2 medium-up-4",domProps:{innerHTML:t._s(t.legendHTML)},on:{click:t.legendOnClick}}),t._m(0),a("canvas",{attrs:{id:"Chart_"+t.zone}})])]),a("div",{staticClass:"card-section action"},[a("a",{staticClass:"download-raw",attrs:{rel:"noopener",href:"https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/csv/"+this.zone+".csv",target:"_blank"}},[a("i",{staticClass:"icon-table",attrs:{title:"download raw"}})]),a("a",{staticClass:"download-chart",on:{click:t.onClickDownloadChart}},[a("i",{staticClass:"icon-download-cloud",attrs:{title:"download chart"}})]),a("a",{staticClass:"fullscreen show-for-xlarge",on:{click:t.onClickFullscreen}},[a("i",{staticClass:"icon-resize-full",attrs:{title:"resize fullscreen"}})])])])},k=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"help-text text-right"},[a("strong",{staticClass:"show-for-xlarge"},[t._v("Click")]),a("strong",{staticClass:"hide-for-xlarge"},[t._v("Tap / Touch")]),t._v(" legend item to toggle chart line")])}],M=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home-chart-stats"},[a("div",{staticClass:"grid-x small-up-2 medium-up-4"},[a("div",{staticClass:"cell"},[a("div",{staticClass:"card confirmed"},[a("div",{staticClass:"card-section"},[a("h6",[t._v("Confirmed")]),a("div",{staticClass:"total"},[t._v(t._s(t.numberWithCommas(t.stats.total.confirmed))),a("sup",[t._v(t._s(t.plusMinusStr(t.stats.daily.confirmed)))])])])])]),a("div",{staticClass:"cell"},[a("div",{staticClass:"card recover"},[a("div",{staticClass:"card-section"},[a("h6",[t._v("Recover")]),a("div",{staticClass:"total"},[t._v(t._s(t.numberWithCommas(t.stats.total.recover))),a("sup",[t._v(t._s(t.plusMinusStr(t.stats.daily.recover)))])])])])]),a("div",{staticClass:"cell"},[a("div",{staticClass:"card death"},[a("div",{staticClass:"card-section"},[a("h6",[t._v("Death")]),a("div",{staticClass:"total"},[t._v(t._s(t.numberWithCommas(t.stats.total.death))),a("sup",[t._v(t._s(t.plusMinusStr(t.stats.daily.death)))])])])])]),a("div",{staticClass:"cell"},[a("div",{staticClass:"card active"},[a("div",{staticClass:"card-section"},[a("h6",[t._v("Active")]),a("div",{staticClass:"total"},[t._v(t._s(t.numberWithCommas(t.stats.total.active))),a("sup",[t._v(t._s(t.plusMinusStr(t.stats.daily.active)))])])])])])]),a("div",{staticClass:"help-text text-right"},[t._v("Last Update: "+t._s(t.stats.lastUpdate))])])},S=[],T=a("eafc"),L=a.n(T),E=(a("13ea"),{name:"HomeChartStats",props:{value:Object},computed:{stats:function(){return this.value.stats},zone:function(){return this.value.zone}},watch:{},methods:{moolahRound:function(t){return Math.abs(Number(t))>=1e9?Math.round(Math.abs(Number(t))/1e9)+"B":Math.abs(Number(t))>=1e6?Math.round(Math.abs(Number(t))/1e6)+"M":Math.abs(Number(t))>=1e3?Math.round(Math.abs(Number(t))/1e3)+"K":Math.abs(Number(t))},numberWithCommas:function(t){return null===t||void 0===t?void 0:t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},plusMinusStr:function(t){return 0==t?"":"(".concat(t>0?"+".concat(t):t,")")}}}),O=E,I=(a("f423"),Object(c["a"])(O,M,S,!1,null,"fba40a2c",null)),N=I.exports;function j(t){return $(t)||U(t)||D(t)||z()}function z(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function D(t,e){if(t){if("string"===typeof t)return P(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?P(t,e):void 0}}function U(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function $(t){if(Array.isArray(t))return P(t)}function P(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=t[a];return n}function R(t,e,a,n,r,s,i){try{var o=t[s](i),c=o.value}catch(l){return void a(l)}o.done?e(c):Promise.resolve(c).then(n,r)}function H(t){return function(){var e=this,a=arguments;return new Promise((function(n,r){var s=t.apply(e,a);function i(t){R(s,n,r,i,o,"next",t)}function o(t){R(s,n,r,i,o,"throw",t)}i(void 0)}))}}var B={name:"HomeChart",components:{HomeChartStats:N},props:{zone:String,value:Object},computed:{myStatsModel:function(){return{zone:this.zone,stats:this.stats}},periods:function(){return this.value.periods},hiddenDatasets:function(){return this.value.hiddenDatasets}},watch:{periods:function(t,e){this.updateChartData()}},data:function(){return{chartInstance:null,legendHTML:null,stats:{lastUpdate:null,total:{},daily:{}},homeChartStats:null,data:{datasets:[],labels:[]}}},methods:{onClickFullscreen:function(t){t.target.closest(".cell").classList.toggle("width-100")},onClickDownloadChart:function(t){var e=this;if(this.chartInstance){var n=a("1c9c");t.target.closest("a.download-chart");H(f.a.mark((function a(){var r,s;return f.a.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,n.toJpeg(t.target.closest(".card").querySelector(".capture"));case 2:r=a.sent,s=document.createElement("a"),s.href=r,s.download="Chart_".concat(e.zone,".jpeg"),s.click();case 7:case"end":return a.stop()}}),a)})))()}},legendOnClick:function(t){var e=t.target.closest(".item");if(e){var a=t.target.closest(".legend");"none"==t.target.style.textDecoration?t.target.style.textDecoration="line-through":t.target.style.textDecoration="none";var n=j(a.querySelectorAll(".text")).map((function(t){return"none"!=t.style.textDecoration})),r=b()(this.value);this.$set(r,"hiddenDatasets",n),this.$emit("input",r)}},updateChartData:function(){var t=this;H(f.a.mark((function e(){var a,n,r,s,i,o,c;return f.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a="https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/chartjs/".concat(t.zone,"/").concat(t.periods,".json?_=").concat(Date.now()),e.next=3,fetch(a);case 3:return n=e.sent,e.next=6,n.json();case 6:r=e.sent,t.$set(t.data,"datasets",r.datasets),t.$set(t.data,"labels",r.labels),s=0,i=!1,o=r.datasets[4].data.length;while(!i)s++,0!=r.datasets[0].data[o-s]&&(i=!0);c=o-s,t.$set(t.stats,"lastUpdate",r.labels[o-s]),t.$set(t.stats,"total",{confirmed:r.datasets[4].data[c],recover:r.datasets[5].data[c],death:r.datasets[6].data[c],active:r.datasets[7].data[c]}),t.$set(t.stats,"daily",{confirmed:r.datasets[0].data[c],recover:r.datasets[1].data[c],death:r.datasets[2].data[c],active:r.datasets[3].data[c]}),t.updateChartHiddenDatasets();case 18:case"end":return e.stop()}}),e)})))()},updateChartHiddenDatasets:function(){var t=this;this.chartInstance&&(this.hiddenDatasets.forEach((function(e,a){t.chartInstance.data.datasets.length&&(t.chartInstance.data.datasets[a].hidden=e)})),this.chartInstance.update(),this.legendHTML=this.chartInstance.generateLegend())}},created:function(){this.updateChartData()},mounted:function(){if(!this.chartInstance){var t=a("b16f"),e=t.initChartDaily;this.chartInstance=e({zone:this.zone,data:this.data})}this.homeChartStats=N},destroyed:function(){this.data={datasets:[],labels:[]},this.chartInstance&&this.chartInstance.destroy()}},G=B,K=(a("f5d1"),Object(c["a"])(G,w,k,!1,null,"2575ff54",null)),W=K.exports,q=a("63ea"),Z=a.n(q),F=a("c707"),J=a.n(F),Y=a("1946");function V(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function X(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?V(Object(a),!0).forEach((function(e){Q(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):V(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function Q(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function tt(t,e,a,n,r,s,i){try{var o=t[s](i),c=o.value}catch(l){return void a(l)}o.done?e(c):Promise.resolve(c).then(n,r)}function et(t){return function(){var e=this,a=arguments;return new Promise((function(n,r){var s=t.apply(e,a);function i(t){tt(s,n,r,i,o,"next",t)}function o(t){tt(s,n,r,i,o,"throw",t)}i(void 0)}))}}var at={name:"Home",components:{MyForm:x,HomeChart:W},data:function(){return{lazyLoadCanvas:null,homeChart:{},myModel:{periods:Y["c"],zones:Y["e"],selectedZones:b()(Y["d"]),hiddenDatasets:b()(Y["b"])}}},watch:{homeChart:function(t,e){var a=this;L()((function(){a.lazyLoadCanvas&&a.lazyLoadCanvas.update()}),9)},"myModel.hiddenDatasets":function(){var t=et(f.a.mark((function t(e,a){var n,r=this;return f.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return L()((function(){r.lazyLoadCanvas&&r.lazyLoadCanvas.update()}),9),n=X({},this.$route.query),delete n.hidden,Z()(e,Y["b"])||(n.hidden=e.map((function(t){return t?1:0})).join("")),t.prev=4,t.next=7,this.$router.push({query:n});case 7:t.next=11;break;case 9:t.prev=9,t.t0=t["catch"](4);case 11:case"end":return t.stop()}}),t,this,[[4,9]])})));function e(e,a){return t.apply(this,arguments)}return e}(),"myModel.periods":function(){var t=et(f.a.mark((function t(e,a){var n,r=this;return f.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return L()((function(){r.lazyLoadCanvas&&r.lazyLoadCanvas.update()}),9),n=X({},this.$route.query),delete n.periods,e!=Y["c"]&&(n.periods=e),t.prev=4,t.next=7,this.$router.push({query:n});case 7:t.next=11;break;case 9:t.prev=9,t.t0=t["catch"](4);case 11:case"end":return t.stop()}}),t,this,[[4,9]])})));function e(e,a){return t.apply(this,arguments)}return e}(),"myModel.selectedZones":function(){var t=et(f.a.mark((function t(e,a){var n,r=this;return f.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return L()((function(){r.lazyLoadCanvas&&r.lazyLoadCanvas.update()}),9),n=X({},this.$route.query),delete n.zones,e.length&&!Z()(J()(e),J()(Y["d"]))&&(n.zones=e.join("+")),t.prev=4,t.next=7,this.$router.push({query:n});case 7:t.next=11;break;case 9:t.prev=9,t.t0=t["catch"](4);case 11:case"end":return t.stop()}}),t,this,[[4,9]])})));function e(e,a){return t.apply(this,arguments)}return e}()},methods:{},created:function(){var t=this.$route.query,e=t.hidden,a=t.zones,n=t.periods;e&&(e=e.split("").map((function(t){return"1"==t})),this.myModel.hiddenDatasets=e),a&&(a=a.split("+"),this.myModel.selectedZones=a),n&&(this.myModel.periods=n)},mounted:function(){var t=this;L()((function(){if(!t.lazyLoadCanvas){var e=a("e249");t.lazyLoadCanvas=new e({elements_selector:".chart-item",unobserve_entered:!0,callback_enter:function(e){var a=e.id.split("_").slice(1).join("_");t.$set(t.homeChart,a,W),t.$refs[a]&&t.$refs[a][0].updateChartHiddenDatasets()}})}}),299)},destroyed:function(){this.lazyLoadCanvas.destroy(),this.$set(this.myModel,"periods",Y["c"]),this.$set(this.myModel,"selectedZones",b()(Y["d"])),this.$set(this.myModel,"hiddenDatasets",b()(Y["b"]))}},nt=at,rt=(a("21bb"),Object(c["a"])(nt,h,p,!1,null,null,null)),st=rt.exports;n["a"].use(u["a"]);var it=[{path:"/",name:"Home",component:st},{path:"/daily",name:"daily",component:st},{path:"/about",name:"About",component:function(){return a.e("about").then(a.bind(null,"f820"))}},{path:"/ranking",name:"Ranking",component:function(){return a.e("ranking").then(a.bind(null,"4320"))}},{path:"/density",name:"Density",component:function(){return a.e("density").then(a.bind(null,"ab7d"))}}],ot=new u["a"]({routes:it}),ct=ot;n["a"].config.productionTip=!1,new n["a"]({router:ct,render:function(t){return t(d)}}).$mount("#app")},"5c0b":function(t,e,a){"use strict";var n=a("9c0c"),r=a.n(n);r.a},"5f11":function(t,e,a){},"66c0":function(t,e){t.exports=Chart},"9c0c":function(t,e,a){},a1c4:function(t,e,a){},b16f:function(t,e,a){"use strict";a.r(e),a.d(e,"color",(function(){return c})),a.d(e,"initChartDaily",(function(){return i})),a.d(e,"initChartRanking",(function(){return o}));var n=a("66c0"),r=new Image;r.src="img/watermark2.png";var s={image:r,x:0,y:0,opacity:1,alignX:"middle",alignY:"middle",position:"front"},i=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{zone:null,data:null},e=new n("Chart_".concat(t.zone),{type:"line",data:t.data,options:{tooltips:{mode:"index",intersect:!1,callbacks:{labelColor:function(t,e){t.datasetIndex;return{borderColor:e.data.datasets[t.datasetIndex].borderColor,backgroundColor:e.data.datasets[t.datasetIndex].borderColor}},label:function(t,e){var a=t.datasetIndex%8,n=e.datasets[a].label||"",r=e.datasets[a].data[t.index],s=e.datasets[a+4].data[t.index],i=0==r?"":r>0?"(+".concat(r,")"):"(".concat(r,")"),o=(t.datasetIndex/4).toFixed(1);return o=o>=1&&o<2,o?"".concat(n,": ").concat(r):"".concat(n,": ").concat(s," ").concat(i)}}},legend:{display:!1},legendCallback:function(t){var e=t.legend.legendItems.map((function(t){return"<div class='cell item'>\n  <div class='grid-x'>\n    <div class='cell small-2'>\n      <span class='color' style=\"background-color:".concat(t.fillStyle,";border:.2rem solid ").concat(t.strokeStyle,";\"></span>\n    </div>\n    <div class='cell small-10'>\n      <span class='text' style=\"text-decoration:").concat(t.hidden?"line-through":"none",';">').concat(t.text,"</span>\n    </div>\n  </div>\n</div>")})).join("\n");return e},elements:{line:{tension:0,fill:!1},point:{radius:2}},scales:{xAxes:[{gridLines:{display:!1},ticks:{display:!1}}],yAxes:[{gridLines:{display:!1},ticks:{display:!1}}]},animation:{duration:0},hover:{animationDuration:0},responsiveAnimationDuration:0,watermark:s}});return e},o=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{elementId:null,data:null},e=new n(t.elementId,{type:"horizontalBar",data:t.data,options:{maintainAspectRatio:!1,legend:{display:!1},animation:{duration:0},hover:{animationDuration:0},responsiveAnimationDuration:0,watermark:s,scales:{xAxes:[{gridLines:{display:!1},ticks:{display:!1,min:0}}],yAxes:[{gridLines:{display:!1},ticks:{}}]},tooltips:{}}});return e},c={confirmed:"#2c347c",recover:"#3c928c",death:"#ec6f58",active:"#c6ac42"}},c4de:function(t,e,a){"use strict";var n=a("a1c4"),r=a.n(n);r.a},c7d5:function(t,e,a){},e249:function(t,e){t.exports=LazyLoad},f423:function(t,e,a){"use strict";var n=a("5f11"),r=a.n(n);r.a},f5d1:function(t,e,a){"use strict";var n=a("c7d5"),r=a.n(n);r.a}});
//# sourceMappingURL=app.f9ce4bcc.js.map