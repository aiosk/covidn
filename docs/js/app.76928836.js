(function(t){function e(e){for(var n,i,o=e[0],l=e[1],c=e[2],u=0,h=[];u<o.length;u++)i=o[u],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&h.push(r[i][0]),r[i]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);d&&d(e);while(h.length)h.shift()();return s.push.apply(s,c||[]),a()}function a(){for(var t,e=0;e<s.length;e++){for(var a=s[e],n=!0,o=1;o<a.length;o++){var l=a[o];0!==r[l]&&(n=!1)}n&&(s.splice(e--,1),t=i(i.s=a[0]))}return t}var n={},r={app:0},s=[];function i(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=n,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(a,n,function(e){return t[e]}.bind(null,n));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/covidn/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var d=l;s.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"0588":function(t,e,a){"use strict";var n=a("139d"),r=a.n(n);r.a},"139d":function(t,e,a){},1757:function(t,e,a){"use strict";var n=a("b7d0"),r=a.n(n);r.a},"56d7":function(t,e,a){"use strict";a.r(e);var n=a("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"grid-container",attrs:{id:"app"}},[a("h4",{staticClass:"text-center"},[t._v("Daily Indonesia COVID-19 cases")]),a("h5",{staticClass:"text-center"},[t._v("National and Provinces"),a("div",{directives:[{name:"lazy-container",rawName:"v-lazy-container",value:{selector:"img"},expression:"{ selector: 'img' }"}],staticClass:"clearfix"},[t._m(0)])]),a("div",{staticClass:"help-text callout warning",attrs:{id:"chartHelpText"}},[a("ul",{directives:[{name:"lazy-container",rawName:"v-lazy-container",value:{selector:"img"},expression:"{ selector: 'img' }"}]},[t._m(1),t._m(2),t._m(3),t._m(4),t._m(5),t._m(6)])]),a("MyForm",{model:{value:t.myModel,callback:function(e){t.myModel=e},expression:"myModel"}}),a("div",{staticClass:"grid-x xlarge-up-2",attrs:{id:"myChart","aria-describedby":"chartHelpText"}},t._l(t.myModel.selectedZones,(function(e){return a("div",{key:e,staticClass:"cell callout",class:{"width-100":"NATIONAL"==e},on:{show:t.handler}},[a("MyChart",{attrs:{zone:e},model:{value:t.myModel,callback:function(e){t.myModel=e},expression:"myModel"}})],1)})),0)],1)},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a",{staticClass:"float-right",attrs:{href:"https://github.com/aiosk/covidn"}},[a("img",{staticClass:"lazy",attrs:{alt:"GitHub stars","data-src":"https://img.shields.io/github/stars/aiosk/covidn?logo=github&style=for-the-badge"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"hide-for-xlarge"},[t._v("For best results please view in "),a("strong",[t._v("landscape")]),t._v(" mode")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",[a("strong",{staticClass:"show-for-xlarge"},[t._v("Hover")]),a("strong",{staticClass:"hide-for-xlarge"},[t._v("Tap / Touch")]),t._v(" chart bar to see case number")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",[a("strong",{staticClass:"show-for-xlarge"},[t._v("Click")]),a("strong",{staticClass:"hide-for-xlarge"},[t._v("Tap / Touch")]),t._v(" chart legend to show/hide chart data")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",[t._v("Click "),a("img",{attrs:{"data-src":"./img/baseline_get_app_black_18dp.png",alt:"download chart"}}),t._v(" to save chart as image")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",[t._v("Click "),a("img",{attrs:{"data-src":"./img/baseline_backup_table_black_18dp.png",alt:"download raw",title:"download raw"}}),t._v(" to save chart raw data")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("li",{staticClass:"show-for-xlarge"},[t._v("Click "),a("img",{attrs:{"data-src":"./img/baseline_fullscreen_black_18dp.png",alt:"fullscreen"}}),t._v(" to toggle chart "),a("strong",[t._v("full-width")]),t._v(" mode")])}],i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("form",{staticClass:"my-form callout secondary"},[a("div",{staticClass:"grid-x periods"},[a("div",{staticClass:"cell xlarge-3"},[a("label",{attrs:{for:"periods"}},[a("span",[t._v(t._s(t.periods))]),t._v(" days period")])]),a("div",{staticClass:"cell xlarge-9"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.periods,expression:"periods"}],attrs:{id:"periods",name:"periods",type:"range",min:"1",max:"21",step:"1","aria-describedby":"periodsHelpText"},domProps:{value:t.periods},on:{__r:function(e){t.periods=e.target.value}}}),t._m(0)])]),a("div",{staticClass:"grid-x zones"},[t._m(1),a("div",{staticClass:"cell xlarge-9"},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.selectedZones,expression:"selectedZones"}],attrs:{id:"zones",name:"zones",multiple:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.selectedZones=e.target.multiple?a:a[0]}}},t._l(t.zones,(function(e){return a("option",{key:e,domProps:{value:e}},[t._v(t._s(e.split("_").join(" ")))])})),0),a("p",{staticClass:"help-text"},[t._v("Too many charts, i don't like to scroll, i want to select some chart")])])])])},o=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("p",{staticClass:"help-text",attrs:{id:"periodsHelpText"}},[t._v("Try smaller or larger data periods by sliding (tap/click => hold => move) slider to change days period."),a("br"),a("strong",[t._v("Smaller")]),t._v(" day periods will generate complicated chart data, while "),a("strong",[t._v("larger")]),t._v(" day periods will generate simplified chart data. Use wisely.")])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cell xlarge-3"},[a("label",{attrs:{for:"zones"}},[t._v("Zone")])])}],l=a("0644"),c=a.n(l),d={name:"MyForm",props:{value:Object},computed:{zones:function(){return this.value.zones},periods:{get:function(){return this.value.periods},set:function(t){var e=c()(this.value);this.$set(e,"periods",t),this.$emit("input",e)}},selectedZones:{get:function(){return this.value.selectedZones},set:function(t){var e=c()(this.value);this.$set(e,"selectedZones",t),this.$emit("input",e)}}}},u=d,h=(a("1757"),a("2877")),p=Object(h["a"])(u,i,o,!1,null,"52214b4a",null),v=p.exports,f=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"my-chart"},[a("div",{directives:[{name:"lazy-container",rawName:"v-lazy-container",value:{selector:"img"},expression:"{ selector: 'img' }"}],staticClass:"action"},[a("div",{staticClass:"loader"}),a("a",{staticClass:"icon download-raw",attrs:{rel:"noopener",href:"https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/csv/"+this.zone+".csv",target:"_blank"}},[a("img",{staticClass:"lazy",attrs:{"data-src":"./img/baseline_backup_table_black_18dp.png",alt:"download raw",title:"download raw"}})]),a("a",{staticClass:"icon download-chart",on:{click:t.onClickDownloadChart}},[a("img",{attrs:{"data-src":"./img/baseline_get_app_black_18dp.png",alt:"download chart",title:"download chart"}})]),a("a",{staticClass:"icon fullscreen show-for-xlarge",on:{click:t.onClickFullscreen}},[a("img",{attrs:{"data-src":"./img/baseline_fullscreen_black_18dp.png",alt:"fullscreen"}})])]),a("canvas",{attrs:{id:"Chart_"+t.zone}})])},m=[],_=a("a34a"),A=a.n(_),g=a("eafc"),w=a.n(g),y=a("4cfe"),b=a.n(y);function T(t,e,a,n,r,s,i){try{var o=t[s](i),l=o.value}catch(c){return void a(c)}o.done?e(l):Promise.resolve(l).then(n,r)}function C(t){return function(){var e=this,a=arguments;return new Promise((function(n,r){var s=t.apply(e,a);function i(t){T(s,n,r,i,o,"next",t)}function o(t){T(s,n,r,i,o,"throw",t)}i(void 0)}))}}var x=new Image;x.src="img/watermark2.png";var N={name:"MyChart",props:{zone:String,value:Object},computed:{urlData:function(){return"https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/chartjs/".concat(this.zone,"-").concat(this.periods,".json?_=").concat(Date.now())},periods:function(){return this.value.periods},hiddenDatasets:function(){return this.value.hiddenDatasets}},data:function(){return{chartInstance:null,data:{datasets:[],labels:[]}}},watch:{value:function(t,e){this.updateChartData()}},methods:{onClickFullscreen:function(t){t.target.closest(".cell.callout").classList.toggle("width-100")},onClickDownloadChart:function(t){var e=t.target.closest("a.download-chart"),a=this.chartInstance.toBase64Image();e.href=a,e.download="Chart_".concat(this.zone,".jpg")},updateChartData:function(){var t=this;C(A.a.mark((function e(){var a,n;return A.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch(t.urlData);case 2:return a=e.sent,e.next=5,a.json();case 5:n=e.sent,t.hiddenDatasets.forEach((function(t,e){n.datasets[e].hidden=t})),t.data.datasets=n.datasets,t.data.labels=n.labels,t.chartInstance.update();case 10:case"end":return e.stop()}}),e)})))()}},mounted:function(){var t=this,e=this;w()((function(){var n=a("b16f"),r=n.default;t.chartInstance=new r("Chart_".concat(t.zone),{type:"bar",data:t.data,options:{title:{display:!0,text:t.zone.split("_").join(" ")},tooltips:{mode:"index",filter:function(t,e){return b()(e.datasets[t.datasetIndex].type)}},legend:{onClick:function(t,a){var n=a.datasetIndex,r=this.chart;r.data.datasets[n].hidden=!r.data.datasets[n].hidden;var s=c()(e.value);e.$set(s.hiddenDatasets,n,r.data.datasets[n].hidden),e.$emit("input",s),r.update()}},scales:{},animation:{duration:0},hover:{animationDuration:0},responsiveAnimationDuration:0,watermark:{image:x,x:0,y:0,opacity:1,alignX:"middle",alignY:"middle",position:"front"}}})}),499),w()((function(){t.updateChartData()}),699)}},E=N,M=(a("0588"),Object(h["a"])(E,f,m,!1,null,"f971706e",null)),U=M.exports,S=a("63ea"),I=a.n(S),k=a("c707"),L=a.n(k),R=["NATIONAL","DKI_JAKARTA","JAWA_BARAT","JAWA_TIMUR","JAWA_TENGAH","SULAWESI_SELATAN","BANTEN","NUSA_TENGGARA_BARAT","BALI","PAPUA","KALIMANTAN_SELATAN","SUMATERA_BARAT","SUMATERA_SELATAN","KALIMANTAN_TENGAH","KALIMANTAN_TIMUR","SUMATERA_UTARA","DAERAH_ISTIMEWA_YOGYAKARTA","KALIMANTAN_UTARA","KEPULAUAN_RIAU","KALIMANTAN_BARAT","SULAWESI_TENGGARA","LAMPUNG","SULAWESI_UTARA","SULAWESI_TENGAH","RIAU","PAPUA_BARAT","SULAWESI_BARAT","JAMBI","MALUKU_UTARA","MALUKU","GORONTALO","KEPULAUAN_BANGKA_BELITUNG","ACEH","BENGKULU","NUSA_TENGGARA_TIMUR"],z=[!0,!1,!0,!1,!0,!1,!0,!1],O=["NATIONAL","DKI_JAKARTA","JAWA_BARAT","JAWA_TENGAH","JAWA_TIMUR","SULAWESI_SELATAN","KALIMANTAN_SELATAN"],D={name:"App",components:{MyForm:v,MyChart:U},data:function(){return{myModel:{periods:14,zones:R,selectedZones:c()(O),hiddenDatasets:c()(z)}}},watch:{"myModel.hiddenDatasets":function(t,e){var a=new URLSearchParams(window.location.search);a.delete("hidden"),I()(t,z)||a.set("hidden",t.join("+")),window.history.replaceState({},"","".concat(location.pathname,"?").concat(a))},"myModel.periods":function(t,e){var a=new URLSearchParams(window.location.search);a.set("periods",t),window.history.replaceState({},"","".concat(location.pathname,"?").concat(a))},"myModel.selectedZones":function(t,e){var a=new URLSearchParams(window.location.search);a.delete("zones"),I()(L()(t),L()(O))||a.set("zones",t.join("+")),window.history.replaceState({},"","".concat(location.pathname,"?").concat(a))}},methods:{handler:function(t){console.log(t)}},created:function(){var t=this,e=new URLSearchParams(window.location.search),a=e.get("zones"),n=e.get("hidden"),r=this;n&&(n=n.split("+"),n.map((function(t){return JSON.parse("true"==t.toLowerCase())})).forEach((function(e,a){r.$set(t.myModel.hiddenDatasets,a,e)}))),a&&(a=a.split("+"),this.myModel.selectedZones=a.length?a:O);var s=e.get("periods");this.myModel.periods=s||14}},P=D,j=(a("5c0b"),Object(h["a"])(P,r,s,!1,null,null,null)),$=j.exports,G=a("caf9");n["a"].use(G["a"],{observer:!0,dispatchEvent:!0,lazyComponent:!0}),n["a"].config.productionTip=!1,new n["a"]({render:function(t){return t($)}}).$mount("#app")},"5c0b":function(t,e,a){"use strict";var n=a("9c0c"),r=a.n(n);r.a},"66c0":function(t,e){t.exports=Chart},"9c0c":function(t,e,a){},b16f:function(t,e,a){"use strict";a.r(e);var n=a("66c0");n.plugins.register({beforeDraw:function(t){var e=t.chart.ctx;e.fillStyle="white",e.fillRect(0,0,t.chart.width,t.chart.height)}}),e["default"]=n},b7d0:function(t,e,a){}});
//# sourceMappingURL=app.76928836.js.map