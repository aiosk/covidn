(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["ratio-population"],{"18ae":function(t,a,n){"use strict";var e=n("cb02"),o=n.n(e);o.a},2386:function(t,a,n){"use strict";var e=n("98e8"),o=n.n(e);o.a},"2dd7":function(t,a,n){},"3f7a":function(t,a,n){"use strict";var e=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"dialog"},[n("div",{staticClass:"reveal-overlay",style:{display:t.styleDisplay},on:{click:function(a){return a.target!==a.currentTarget?null:t.overlayOnClick(a)}}},[n("div",{staticClass:"reveal",class:[{collapse:t.isCollapse},{large:t.isLarge}],style:{display:t.styleDisplay}},[n("button",{staticClass:"close-button",attrs:{"aria-label":"Close Accessible Modal",type:"button"},on:{click:t.closeOnClick}},[n("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])]),t._t("default")],2)])])},o=[],s=n("9424"),i={name:"Dialog",mixins:[s["a"]],props:{value:Object},data:function(){return{scrollTop:null}},computed:{isOpen:{get:function(){return!!this.value&&!!this.value.isOpen},set:function(t){this.emitModel({isOpen:t})}},isCollapse:{get:function(){return!!this.value&&!!this.value.isCollapse},set:function(t){this.emitModel({isCollapse:t})}},isLarge:{get:function(){return!!this.value&&!!this.value.isLarge},set:function(t){this.emitModel({isLarge:t})}},styleDisplay:function(){return this.isOpen?"block":"none"}},watch:{isOpen:function(t,a){var n=document.querySelector("html");t?(this.scrollTop=n.scrollTop,n.style.top="-".concat(n.scrollTop,"px"),n.classList.add("zf-has-scroll"),n.classList.add("is-reveal-open")):(n.classList.remove("zf-has-scroll"),n.classList.remove("is-reveal-open"),n.style.top=null,window.scrollTo({top:this.scrollTop}))}},methods:{closeOnClick:function(t){this.isOpen=!1},overlayOnClick:function(t){this.isOpen=!1}},destroyed:function(){this.scrollTop=null}},l=i,c=(n("2386"),n("2877")),r=Object(c["a"])(l,e,o,!1,null,"a53e3556",null);a["a"]=r.exports},5492:function(t,a,n){var e=n("32b3"),o=n("d70d");function s(t,a){return o(t||[],a||[],e)}t.exports=s},"91e5":function(t,a,n){"use strict";n.r(a);var e=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"ratio-population"},[t._m(0),t._l(t.cases,(function(a){return n("Card",{key:a,class:["card--"+a],scopedSlots:t._u([{key:"header",fn:function(){return[n("h6",[t._v(t._s(a+" Rate per 1 Million Population Ratio"))])]},proxy:!0},{key:"mainImage",fn:function(){return[n("canvas",{attrs:{id:"RatioPopulation_"+a.toUpperCase()}})]},proxy:!0},{key:"menu",fn:function(){return[n("a",{staticClass:"download-card",on:{click:t.downloadOnClick}},[n("i",{staticClass:"icon-download-cloud",attrs:{title:"download card"}})])]},proxy:!0}],null,!0)})})),n("Dialog",{model:{value:t.modelDialog,callback:function(a){t.modelDialog=a},expression:"modelDialog"}},[n(t.componentChart,{tag:"component",attrs:{zone:t.modelChart.zone},model:{value:t.modelChart,callback:function(a){t.modelChart=a},expression:"modelChart"}})],1)],2)},o=[function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"help-text callout warning"},[n("ul",[n("li",[n("strong",[t._v("Long Touch / Hover")]),t._v(" to see case number")]),n("li",[n("strong",[t._v("Touch / Click")]),t._v(" chart bar to see province detail")])])])}],s=n("a34a"),i=n.n(s),l=n("ae8d"),c=n("3f7a"),r=n("a039"),u=n("6afe"),d=n("eafc"),p=n.n(d),f=n("93c6"),h=n.n(f),v=n("b047c"),m=n.n(v),C=n("5492"),g=n.n(C),_=n("0644"),b=n.n(_),y=n("1946");function w(t,a,n,e,o,s,i){try{var l=t[s](i),c=l.value}catch(r){return void n(r)}l.done?a(c):Promise.resolve(c).then(e,o)}function k(t){return function(){var a=this,n=arguments;return new Promise((function(e,o){var s=t.apply(a,n);function i(t){w(s,e,o,i,l,"next",t)}function l(t){w(s,e,o,i,l,"throw",t)}i(void 0)}))}}var O={name:"RationPopulation",mixins:[r["a"],u["a"]],components:{Card:l["a"],Dialog:c["a"]},data:function(){return{modelChart:{zone:null,population:null,isDialog:!0},cases:y["a"],chartInstance:g()(y["a"],[null,null,null,null]),data:g()(y["a"],[b()(y["c"]),b()(y["c"]),b()(y["c"]),b()(y["c"])])}},watch:{"data.confirmed.labels":m()((function(t,a){var n=this;y["a"].forEach((function(t){n.chartInstance[t].update()}))}),500)},created:function(){var t=this;p()(k(i.a.mark((function a(){var n,e,o;return i.a.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n="https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/stats/stats.json?_=".concat(Date.now()),a.next=3,fetch(n);case 3:return e=a.sent,a.next=6,e.json();case 6:o=a.sent,o=Object.entries(o).filter((function(t){return"NATIONAL"!=t[0]})),y["a"].forEach((function(a){var n=h()(o,(function(t){var n=t[1];return parseInt(n.populationRatio[a])}),"desc");n.forEach((function(n){var e=n[0],o=n[1];t.data[a].datasets[0].data.push(o.populationRatio[a]),t.data[a].datasets[0].population||(t.data[a].datasets[0].population=[]),t.data[a].datasets[0].population.push(o.population),t.$set(t.data[a].datasets[0],"backgroundColor",y["b"][a]),t.data[a].labels.push(e.split("_").join(" "))}))}));case 9:case"end":return a.stop()}}),a)}))),9)},mounted:function(){var t=this,a=this;y["a"].forEach((function(e){if(!t.chartInstance[e]){var o=n("b16f"),s=o.initChartRanking;t.chartInstance[e]=s({elementId:"RatioPopulation_".concat(e.toUpperCase()),data:t.data[e],onClick:function(t,n){if(n.length){var e=n[0]._chart.canvas.id.split("_")[1].toLowerCase(),o=n[0]._view.label.replace(/ /g,"_");a.$set(a.modelChart,"zone",o),a.$set(a.modelChart,"population",a.data[e].datasets[0].population[n[0]._index]),a.modelDialog.isOpen=!0}}})}}))},destroyed:function(){var t=this;y["a"].forEach((function(a){t.chartInstance[a]&&t.chartInstance[a].destroy(),t.data[a]=b()(y["c"])}))}},x=O,D=(n("18ae"),n("2877")),L=Object(D["a"])(x,e,o,!1,null,null,null);a["default"]=L.exports},"93c6":function(t,a,n){var e=n("6a5c"),o=n("6747");function s(t,a,n,s){return null==t?[]:(o(a)||(a=null==a?[]:[a]),n=s?void 0:n,o(n)||(n=null==n?[]:[n]),e(t,a,n))}t.exports=s},"98e8":function(t,a,n){},"9f8a":function(t,a,n){"use strict";var e=n("2dd7"),o=n.n(e);o.a},a039:function(t,a,n){"use strict";var e=n("a59d"),o={components:{ZoneCard:e["a"]},data:function(){return{modelDialog:{isOpen:!1,isCollapse:!0,isLarge:!0},componentChart:null}},watch:{"modelDialog.isOpen":function(t,a){this.componentChart=t?e["a"]:null}}};a["a"]=o},ae8d:function(t,a,n){"use strict";var e=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"card"},[n("div",{staticClass:"capture"},[n("header",{staticClass:"card-divider"},[t._t("header")],2),n("main",{staticClass:"card-section"},[t._t("main")],2),n("main",{staticClass:"card-image"},[t._t("mainImage")],2)]),n("menu",{staticClass:"card-section"},[t._t("menu")],2)])},o=[],s={name:"Card",props:{value:Object}},i=s,l=(n("9f8a"),n("2877")),c=Object(l["a"])(i,e,o,!1,null,"32ad9b4a",null);a["a"]=c.exports},cb02:function(t,a,n){},d70d:function(t,a){function n(t,a,n){var e=-1,o=t.length,s=a.length,i={};while(++e<o){var l=e<s?a[e]:void 0;n(i,t[e],l)}return i}t.exports=n}}]);
//# sourceMappingURL=ratio-population.5973e9e3.js.map