(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["ratio~aa1ee488"],{"42a7":function(a,n,e){"use strict";e.r(n);var t=function(){var a=this,n=a.$createElement,e=a._self._c||n;return e("div",{staticClass:"ratio"},[a._m(0),e("div",{staticClass:"grid-x large-up-2"},a._l(a.cases,(function(n){return e("div",{key:n,staticClass:"cell card-item",attrs:{id:"card_"+n}},[e(a.componentCard[n],{tag:"component",attrs:{myCase:["ratio",n]},model:{value:a.modelCard,callback:function(n){a.modelCard=n},expression:"modelCard"}})],1)})),0)])},l=[function(){var a=this,n=a.$createElement,e=a._self._c||n;return e("div",{staticClass:"help-text callout warning"},[e("ul",[e("li",[e("strong",[a._v("Touch / Click")]),a._v(" chart to see detail")])])])}],o=e("0ec5"),r=e("eafc"),i=e.n(r),s=e("5492"),c=e.n(s),d=e("0644"),u=e.n(d),f=e("1946"),m=f["a"].filter((function(a){return"confirmed"!=a})),v={name:"RationPopulation",components:{RankingCard:o["a"]},data:function(){return{modelCard:{periods:null},cases:u()(m),lazyLoadCanvas:null,componentCard:c()(f["a"],[null,null,null,null])}},mounted:function(){var a=this;i()((function(){if(!a.lazyLoadCanvas){var n=e("e249");a.lazyLoadCanvas=new n({elements_selector:".card-item",unobserve_entered:!0,callback_enter:function(n){var e=n.id.split("_").slice(1).join("_");a.$set(a.componentCard,e,o["a"])}})}}),299)},destroyed:function(){this.lazyLoadCanvas&&this.lazyLoadCanvas.destroy()}},C=v,p=(e("4575"),e("2877")),_=Object(p["a"])(C,t,l,!1,null,"c184ce3e",null);n["default"]=_.exports},4575:function(a,n,e){"use strict";var t=e("a98a"),l=e.n(t);l.a},a98a:function(a,n,e){}}]);