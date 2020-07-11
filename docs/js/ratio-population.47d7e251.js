(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["ratio-population"],{"18ae":function(t,n,a){"use strict";var e=a("cb02"),o=a.n(e);o.a},"29ae":function(t,n,a){},"2dd7":function(t,n,a){},"3f7a":function(t,n,a){"use strict";var e=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"dialog"},[a("div",{staticClass:"reveal-overlay",style:{display:t.styleDisplay},on:{click:function(n){return n.target!==n.currentTarget?null:t.overlayOnClick(n)}}},[a("div",{staticClass:"reveal",class:[{collapse:t.isCollapse},{large:t.isLarge}],style:{display:t.styleDisplay}},[a("button",{staticClass:"close-button",attrs:{"aria-label":"Close Accessible Modal",type:"button"},on:{click:t.closeOnClick}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])]),t._t("default")],2)])])},o=[],i=a("9424"),s={name:"Dialog",mixins:[i["a"]],props:{value:Object},data:function(){return{scrollTop:null}},computed:{isOpen:{get:function(){return!!this.value&&!!this.value.isOpen},set:function(t){this.emitModel({isOpen:t})}},isCollapse:{get:function(){return!!this.value&&!!this.value.isCollapse},set:function(t){this.emitModel({isCollapse:t})}},isLarge:{get:function(){return!!this.value&&!!this.value.isLarge},set:function(t){this.emitModel({isLarge:t})}},styleDisplay:function(){return this.isOpen?"block":"none"}},watch:{isOpen:function(t,n){var a=document.querySelector("html");t?(this.scrollTop=a.scrollTop,a.style.top="-".concat(a.scrollTop,"px"),a.classList.add("zf-has-scroll"),a.classList.add("is-reveal-open")):(a.classList.remove("zf-has-scroll"),a.classList.remove("is-reveal-open"),a.style.top=null,window.scrollTo({top:this.scrollTop}))}},methods:{closeOnClick:function(t){this.isOpen=!1},overlayOnClick:function(t){this.isOpen=!1}},destroyed:function(){this.scrollTop=null}},r=s,c=(a("981d"),a("2877")),l=Object(c["a"])(r,e,o,!1,null,"42cfca3d",null);n["a"]=l.exports},"408c":function(t,n,a){var e=a("2b3e"),o=function(){return e.Date.now()};t.exports=o},5492:function(t,n,a){var e=a("32b3"),o=a("d70d");function i(t,n){return o(t||[],n||[],e)}t.exports=i},"91e5":function(t,n,a){"use strict";a.r(n);var e=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"ratio-population"},[t._m(0),t._l(t.cases,(function(n){return a("Card",{key:n,class:["card--"+n],scopedSlots:t._u([{key:"header",fn:function(){return[a("h6",[t._v(t._s(n+" Rate per 1 Million Population Ratio"))])]},proxy:!0},{key:"mainImage",fn:function(){return[a("canvas",{attrs:{id:"RatioPopulation_"+n.toUpperCase()}})]},proxy:!0},{key:"menu",fn:function(){return[a("a",{staticClass:"download-chart",on:{click:t.downloadOnClick}},[a("i",{staticClass:"icon-floppy",attrs:{title:"download chart"}})])]},proxy:!0}],null,!0)})})),a("Dialog",{model:{value:t.modelDialog,callback:function(n){t.modelDialog=n},expression:"modelDialog"}},[a(t.componentChart,{tag:"component",attrs:{zone:t.modelChart.zone},model:{value:t.modelChart,callback:function(n){t.modelChart=n},expression:"modelChart"}})],1)],2)},o=[function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"help-text callout warning"},[a("ul",[a("li",[a("strong",[t._v("Long Touch / Hover")]),t._v(" to see case number")]),a("li",[a("strong",[t._v("Touch / Click")]),t._v(" chart bar to see province detail")])])])}],i=a("a34a"),s=a.n(i),r=a("ae8d"),c=a("3f7a"),l=a("a039"),u=a("6afe"),d=a("eafc"),p=a.n(d),f=a("93c6"),v=a.n(f),h=a("b047c"),m=a.n(h),C=a("5492"),g=a.n(C),b=a("0644"),y=a.n(b),_=a("1946");function w(t,n,a,e,o,i,s){try{var r=t[i](s),c=r.value}catch(l){return void a(l)}r.done?n(c):Promise.resolve(c).then(e,o)}function x(t){return function(){var n=this,a=arguments;return new Promise((function(e,o){var i=t.apply(n,a);function s(t){w(i,e,o,s,r,"next",t)}function r(t){w(i,e,o,s,r,"throw",t)}s(void 0)}))}}var k={name:"RationPopulation",mixins:[l["a"],u["a"]],components:{Card:r["a"],Dialog:c["a"]},data:function(){return{modelChart:{zone:null,population:null},cases:_["a"],chartInstance:g()(_["a"],[null,null,null,null]),data:g()(_["a"],[y()(_["c"]),y()(_["c"]),y()(_["c"]),y()(_["c"])])}},watch:{"data.confirmed.labels":m()((function(t,n){var a=this;_["a"].forEach((function(t){a.chartInstance[t].update()}))}),500)},created:function(){var t=this;p()(x(s.a.mark((function n(){var a,e,o;return s.a.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a="https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/stats/stats.json?_=".concat(Date.now()),n.next=3,fetch(a);case 3:return e=n.sent,n.next=6,e.json();case 6:o=n.sent,o=Object.entries(o).filter((function(t){return"NATIONAL"!=t[0]})),_["a"].forEach((function(n){var a=v()(o,(function(t){var a=t[1];return parseInt(a.populationRatio[n])}),"desc");a.forEach((function(a){var e=a[0],o=a[1];t.data[n].datasets[0].data.push(o.populationRatio[n]),t.data[n].datasets[0].population||(t.data[n].datasets[0].population=[]),t.data[n].datasets[0].population.push(o.population),t.$set(t.data[n].datasets[0],"backgroundColor",_["b"][n]),t.data[n].labels.push(e.split("_").join(" "))}))}));case 9:case"end":return n.stop()}}),n)}))),9)},mounted:function(){var t=this,n=this;_["a"].forEach((function(e){if(!t.chartInstance[e]){var o=a("b16f"),i=o.initChartRanking;t.chartInstance[e]=i({elementId:"RatioPopulation_".concat(e.toUpperCase()),data:t.data[e],onClick:function(t,a){if(a.length){var e=a[0]._chart.canvas.id.split("_")[1].toLowerCase(),o=a[0]._view.label.replace(/ /g,"_");n.$set(n.modelChart,"zone",o),n.$set(n.modelChart,"population",n.data[e].datasets[0].population[a[0]._index]),n.modelDialog.isOpen=!0}}})}}))},destroyed:function(){var t=this;_["a"].forEach((function(n){t.chartInstance[n]&&t.chartInstance[n].destroy(),t.data[n]=y()(_["c"])}))}},O=k,T=(a("18ae"),a("2877")),D=Object(T["a"])(O,e,o,!1,null,null,null);n["default"]=D.exports},"93c6":function(t,n,a){var e=a("6a5c"),o=a("6747");function i(t,n,a,i){return null==t?[]:(o(n)||(n=null==n?[]:[n]),a=i?void 0:a,o(a)||(a=null==a?[]:[a]),e(t,n,a))}t.exports=i},"981d":function(t,n,a){"use strict";var e=a("29ae"),o=a.n(e);o.a},"9f8a":function(t,n,a){"use strict";var e=a("2dd7"),o=a.n(e);o.a},a039:function(t,n,a){"use strict";var e=a("a59d"),o={components:{ZoneCard:e["a"]},data:function(){return{modelDialog:{isOpen:!1,isCollapse:!0,isLarge:!0},componentChart:null}},watch:{"modelDialog.isOpen":function(t,n){this.componentChart=t?e["a"]:null}}};n["a"]=o},ae8d:function(t,n,a){"use strict";var e=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"card"},[a("div",{staticClass:"capture"},[a("header",{staticClass:"card-divider"},[t._t("header")],2),a("main",{staticClass:"card-section"},[t._t("main")],2),a("main",{staticClass:"card-image"},[t._t("mainImage")],2)]),a("menu",{staticClass:"card-section"},[t._t("menu")],2)])},o=[],i={name:"Card",props:{value:Object}},s=i,r=(a("9f8a"),a("2877")),c=Object(r["a"])(s,e,o,!1,null,"32ad9b4a",null);n["a"]=c.exports},b047c:function(t,n,a){var e=a("1a8c"),o=a("408c"),i=a("b4b0"),s="Expected a function",r=Math.max,c=Math.min;function l(t,n,a){var l,u,d,p,f,v,h=0,m=!1,C=!1,g=!0;if("function"!=typeof t)throw new TypeError(s);function b(n){var a=l,e=u;return l=u=void 0,h=n,p=t.apply(e,a),p}function y(t){return h=t,f=setTimeout(x,n),m?b(t):p}function _(t){var a=t-v,e=t-h,o=n-a;return C?c(o,d-e):o}function w(t){var a=t-v,e=t-h;return void 0===v||a>=n||a<0||C&&e>=d}function x(){var t=o();if(w(t))return k(t);f=setTimeout(x,_(t))}function k(t){return f=void 0,g&&l?b(t):(l=u=void 0,p)}function O(){void 0!==f&&clearTimeout(f),h=0,l=v=u=f=void 0}function T(){return void 0===f?p:k(o())}function D(){var t=o(),a=w(t);if(l=arguments,u=this,v=t,a){if(void 0===f)return y(v);if(C)return clearTimeout(f),f=setTimeout(x,n),b(v)}return void 0===f&&(f=setTimeout(x,n)),p}return n=i(n)||0,e(a)&&(m=!!a.leading,C="maxWait"in a,d=C?r(i(a.maxWait)||0,n):d,g="trailing"in a?!!a.trailing:g),D.cancel=O,D.flush=T,D}t.exports=l},cb02:function(t,n,a){},d70d:function(t,n){function a(t,n,a){var e=-1,o=t.length,i=n.length,s={};while(++e<o){var r=e<i?n[e]:void 0;a(s,t[e],r)}return s}t.exports=a}}]);
//# sourceMappingURL=ratio-population.47d7e251.js.map