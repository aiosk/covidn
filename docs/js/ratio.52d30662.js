(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["ratio"],{"2dd7":function(a,t,n){},"42a7":function(a,t,n){"use strict";n.r(t);var e=function(){var a=this,t=a.$createElement,n=a._self._c||t;return n("div",{staticClass:"ratio"},[a._m(0),n("div",{staticClass:"grid-x large-up-2"},a._l(a.cases,(function(t){return n("div",{key:t,staticClass:"cell"},[n("Card",{class:["card-ranking","card-ranking--"+t],scopedSlots:a._u([{key:"header",fn:function(){return[n("h6",[a._v(a._s("Case "+("death"==t?"fatality":"recover"==t?"recovery":t)+" Ratio"))]),n("menu",[n("a",{staticClass:"fullscreen show-for-large",attrs:{title:"resize card","aria-label":"resize card"},on:{click:a.onClickFullscreen}},[n("i",{staticClass:"icon-window-maximize"})])])]},proxy:!0},{key:"mainImage",fn:function(){return[n("canvas",{attrs:{id:"Ratio_"+t.toUpperCase()}})]},proxy:!0},{key:"menu",fn:function(){return[n("a",{staticClass:"download-card",attrs:{title:"download card","aria-label":"download card"},on:{click:a.downloadOnClick}},[n("i",{staticClass:"icon-download-cloud"})]),n("a",{staticClass:"share",attrs:{title:"share","aria-label":"share"},on:{click:a.shareOnClick}},[n("i",{staticClass:"icon-share"})])]},proxy:!0}],null,!0)})],1)})),0),n("Dialog",{model:{value:a.modelDialog,callback:function(t){a.modelDialog=t},expression:"modelDialog"}},[n(a.componentChart,{tag:"component",attrs:{zone:a.modelChart.zone},model:{value:a.modelChart,callback:function(t){a.modelChart=t},expression:"modelChart"}})],1)],1)},r=[function(){var a=this,t=a.$createElement,n=a._self._c||t;return n("div",{staticClass:"help-text callout warning"},[n("ul",[n("li",[n("strong",[a._v("Long Touch / Hover")]),a._v(" to see case number")]),n("li",[n("strong",[a._v("Touch / Click")]),a._v(" chart bar to see province detail")])])])}],o=n("a34a"),s=n.n(o),c=n("ae8d"),i=n("3f7a"),l=n("a039"),d=n("6afe"),u=n("eafc"),f=n.n(u),h=n("93c6"),v=n.n(h),m=n("b047c"),p=n.n(m),C=n("5492"),g=n.n(C),b=n("0644"),w=n.n(b),_=n("1946");function k(a,t,n,e,r,o,s){try{var c=a[o](s),i=c.value}catch(l){return void n(l)}c.done?t(i):Promise.resolve(i).then(e,r)}function x(a){return function(){var t=this,n=arguments;return new Promise((function(e,r){var o=a.apply(t,n);function s(a){k(o,e,r,s,c,"next",a)}function c(a){k(o,e,r,s,c,"throw",a)}s(void 0)}))}}var y=_["a"].filter((function(a){return"confirmed"!=a})),D={name:"RationPopulation",mixins:[l["a"],d["a"]],components:{Card:c["a"],Dialog:i["a"]},data:function(){return{modelChart:{zone:null,isDialog:!0},cases:y,chartInstance:g()(y,[null,null,null]),data:g()(y,[w()(_["c"]),w()(_["c"]),w()(_["c"])])}},watch:{"data.recover.labels":p()((function(a,t){var n=this;y.forEach((function(a){n.chartInstance[a].update()}))}),500)},created:function(){var a=this;f()(x(s.a.mark((function t(){var n,e,r;return s.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n="https://raw.githubusercontent.com/aiosk/covidn/master/cli/dist/stats/stats.json?_=".concat(Date.now()),t.next=3,fetch(n);case 3:return e=t.sent,t.next=6,e.json();case 6:r=t.sent,r=Object.entries(r),y.forEach((function(t){var n=v()(r,(function(a){var n=a[1];return parseInt(n.ratio[t])}),"desc");n.forEach((function(e,r){var o=e[0],s=e[1];a.data[t].datasets[0].data.push(s.ratio[t]),a.$set(a.data[t].datasets[0],"backgroundColor",_["b"][t]),a.data[t].datasets[0].datalabels||a.$set(a.data[t].datasets[0],"datalabels",{align:[],color:[]});var c=4;a.$set(a.data[t].datasets[0].datalabels.align,r,r<n.length/c?"start":"end"),a.$set(a.data[t].datasets[0].datalabels.color,r,r<n.length/c?"#fff":"#000"),a.data[t].labels.push(o.split("_").join(" "))}))}));case 9:case"end":return t.stop()}}),t)}))),9)},mounted:function(){var a=this,t=this;y.forEach((function(e){if(!a.chartInstance[e]){var r=n("b16f"),o=r.initChartRanking;a.chartInstance[e]=o({elementId:"Ratio_".concat(e.toUpperCase()),data:a.data[e],onClick:function(a,n){if(n.length){var e=n[0]._view.label.replace(/ /g,"_");t.modelChart.zone=e,t.modelDialog.isOpen=!0}}})}}))},destroyed:function(){var a=this;y.forEach((function(t){a.chartInstance[t]&&a.chartInstance[t].destroy(),a.data[t]=w()(_["c"])}))}},I=D,O=(n("d1a9"),n("2877")),E=Object(O["a"])(I,e,r,!1,null,null,null);t["default"]=E.exports},5492:function(a,t,n){var e=n("32b3"),r=n("d70d");function o(a,t){return r(a||[],t||[],e)}a.exports=o},"7d1b":function(a,t,n){},"93c6":function(a,t,n){var e=n("6a5c"),r=n("6747");function o(a,t,n,o){return null==a?[]:(r(t)||(t=null==t?[]:[t]),n=o?void 0:n,r(n)||(n=null==n?[]:[n]),e(a,t,n))}a.exports=o},"9f8a":function(a,t,n){"use strict";var e=n("2dd7"),r=n.n(e);r.a},a039:function(a,t,n){"use strict";var e=n("a59d"),r={components:{ZoneCard:e["a"]},data:function(){return{modelDialog:{isOpen:!1,isCollapse:!0},componentChart:null}},watch:{"modelDialog.isOpen":function(a,t){this.componentChart=a?e["a"]:null}}};t["a"]=r},ae8d:function(a,t,n){"use strict";var e=function(){var a=this,t=a.$createElement,n=a._self._c||t;return n("div",{staticClass:"card"},[n("div",{staticClass:"capture"},[n("header",{staticClass:"card-divider"},[a._t("header")],2),n("main",{staticClass:"card-section"},[a._t("main")],2),n("main",{staticClass:"card-image"},[a._t("mainImage")],2)]),n("menu",{staticClass:"card-section"},[a._t("menu")],2)])},r=[],o={name:"Card",props:{value:Object}},s=o,c=(n("9f8a"),n("2877")),i=Object(c["a"])(s,e,r,!1,null,"32ad9b4a",null);t["a"]=i.exports},d1a9:function(a,t,n){"use strict";var e=n("7d1b"),r=n.n(e);r.a},d70d:function(a,t){function n(a,t,n){var e=-1,r=a.length,o=t.length,s={};while(++e<r){var c=e<o?t[e]:void 0;n(s,a[e],c)}return s}a.exports=n}}]);
//# sourceMappingURL=ratio.52d30662.js.map