(window.webpackJsonp=window.webpackJsonp||[]).push([[9,5,6,7,8],{"/b8u":function(t,e,a){var r=a("STAE");t.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},"33Wh":function(t,e,a){var r=a("yoRg"),n=a("eDl+");t.exports=Object.keys||function(t){return r(t,n)}},"6LWA":function(t,e,a){var r=a("xrYK");t.exports=Array.isArray||function(t){return"Array"==r(t)}},A2ZE:function(t,e,a){var r=a("HAuM");t.exports=function(t,e,a){if(r(t),void 0===e)return t;switch(a){case 0:return function(){return t.call(e)};case 1:return function(a){return t.call(e,a)};case 2:return function(a,r){return t.call(e,a,r)};case 3:return function(a,r,n){return t.call(e,a,r,n)}}return function(){return t.apply(e,arguments)}}},BIHw:function(t,e,a){"use strict";var r=a("I+eb"),n=a("or9q"),l=a("ewvW"),i=a("UMSQ"),c=a("ppGB"),o=a("ZfDv");r({target:"Array",proto:!0},{flat:function(){var t=arguments.length?arguments[0]:void 0,e=l(this),a=i(e.length),r=o(e,0);return r.length=n(r,e,e,a,0,void 0===t?1:c(t)),r}})},BkDX:function(t,e,a){"use strict";a.r(e);a("BIHw"),a("QGkA");var r=a("q1tI"),n=a.n(r),l=a("yE/o"),i=a("AKWm"),c=a("TCOF"),o=a("Xt/6"),d=a("LDjW"),s=a("s8O9"),u=a("dCyY"),f=a("lgMH"),p=a("sUwa"),m=a("oVo9"),v=a("wz8V"),b=a("R0i0"),g=a("VIqg"),h=a("+ugm"),y=a("qE0H"),j=a("iBRH"),O=a("VlI8"),x=a("X/k/"),_=a("Cove");e.default=function(t){var e,a=t.mergedWeatherData,w="graph-canvas-wave-height",E=Object(r.useState)(),A=E[0],k=E[1],W={id:w},N=Object(_.a)(W),B=N[0];N[1],Object(r.useEffect)((function(){Object(i.a)(".graph-wave-heihgt").selectAll("*").remove();var t=H();t&&k(t)}),[a,B]),Object(r.useEffect)((function(){S()}),[A]);var H=function(){var t=window.document.getElementById(w);if(t&&a){var e,r,n=null!==(e=null==t?void 0:t.clientWidth)&&void 0!==e?e:0,l=null!==(r=null==t?void 0:t.clientHeight)&&void 0!==r?r:0,c=Object(i.a)(".graph-wave-heihgt").append("svg").attr("height",l).attr("width",n);return{x:n-(x.a.left+x.a.right),y:l-(x.a.top+x.a.bottom),node:c.append("g").attr("transform","translate("+x.a.left+","+x.a.top+")")}}},S=function(){if(a&&A){var t,e,r=a,n=r.map((function(t){var e;return null!==(e=t.datetime)&&void 0!==e?e:void 0})).filter(O.b),l=Object(v.a)(n),_=Object(b.a)().range([0,A.x-30]).domain(l),w=r.map((function(t){var e,a;return[null!==(e=t.sea_surface_wave_maximum_height)&&void 0!==e?e:void 0,null!==(a=t.sea_surface_wave_significant_height)&&void 0!==a?a:void 0]})).flat().filter(O.b),E=Object(v.a)(w),k=E[0],W=E[1],N=Object(g.a)().range([null!==(t=null==A?void 0:A.y)&&void 0!==t?t:0,0]).domain([k,W]),B=Object(g.a)().range([null!==(e=null==A?void 0:A.y)&&void 0!==e?e:0,0]).domain([0,360]),H=Object(h.a)().curve(y.a).x((function(t){return _(t[0])})).y((function(t){N(t[1]);return N(t[1])})),S=(A.node.append("g"),a.filter((function(t){return t.sea_surface_wave_maximum_height})).map((function(t){return[t.datetime,t.sea_surface_wave_maximum_height,"max"]}))),I=a.filter((function(t){return t.sea_surface_wave_significant_height})).map((function(t){return[t.datetime,t.sea_surface_wave_significant_height,"sig"]}));null==A||A.node.append("g").selectAll("dot").data(a.filter((function(t){return t.sea_surface_wave_from_direction_at_variance_spectral_density_maximum}))).enter().append("circle").attr("cx",(function(t){return _(t.datetime)})).attr("cy",(function(t){return B(t.sea_surface_wave_from_direction_at_variance_spectral_density_maximum)})).attr("r",1.5).style("fill","red"),A.node.append("g").selectAll(".location").data([S,I]).enter().append("g").attr("class","location").append("path").attr("class","line axisBlue").attr("d",(function(t){var e=H(t);return console.log(e),e})).style("stroke",(function(t){return"max"===t[0][2]?"lightBlue":"darkBlue"})).attr("fill","none"),null==A||A.node.append("g").attr("class","axis axis--x").attr("transform","translate(0,"+A.y+")").call(Object(j.a)(_).tickFormat((function(t){var e,a=Object(c.a)(".%L"),r=Object(c.a)(":%S"),n=Object(c.a)("%H:%M"),l=Object(c.a)("%H:00"),i=Object(c.a)("%a %d"),v=Object(c.a)("%b %d"),b=Object(c.a)("%B"),g=Object(c.a)("%Y");return e=t,(Object(o.a)(e)<e?a:Object(d.a)(e)<e?r:Object(s.a)(e)<e?n:Object(u.a)(e)<e?l:Object(f.a)(e)<e?Object(p.b)(e)<e?i:v:Object(m.a)(e)<e?b:g)(e)}))),A.node.append("g").attr("class","axis y-axis axisBlue").call(Object(j.b)(N).ticks(Math.min(Math.round(Math.floor(A.y/35)+1),W),".0f")).append("text").attr("transform","rotate(-90) translate("+-A.y/2+", "+.8*-x.a.left+")").attr("class","label").attr("text-anchor","middle").style("font-weight","normal").style("font-size","12px").attr("y",6).attr("dy",".35em").attr("fill","#666").text("Height"),A.node.append("g").attr("class","axisRed").attr("transform","translate("+(A.x-30)+", 0)").call(Object(j.c)(B)).append("text").attr("fill","red").attr("transform","rotate(-90) translate("+-A.y/2+",30\n            )").attr("class","label").attr("text-anchor","middle").style("font-weight","normal").style("font-size","12px").attr("y",6).attr("dy",".35em").attr("fill","red").text("Direction"),A.node.selectAll(".y-axis g text").attr("fill","#666"),A.node.selectAll(".y-axis g line").attr("stroke","#666");var z=Object(i.a)("#my_dataviz-wave");z.append("circle").attr("cx",10).attr("cy",10).attr("r",6).style("fill","red"),z.append("text").attr("x",20).attr("y",10).text("Wave Direction").style("font-size","15px").attr("alignment-baseline","middle"),z.append("circle").attr("cx",150).attr("cy",10).attr("r",6).style("fill","darkBlue"),z.append("text").attr("x",170).attr("y",10).text("Sig. Wave Height").style("font-size","15px").attr("alignment-baseline","middle"),z.append("circle").attr("cx",300).attr("cy",10).attr("r",6).style("fill","lightBlue"),z.append("text").attr("x",320).attr("y",10).text("Max Wave Height").style("font-size","15px").attr("alignment-baseline","middle")}};return n.a.createElement(l.a,null,n.a.createElement("div",{className:"App"},n.a.createElement("div",{className:"header",style:{minHeight:"70px"}},n.a.createElement("h3",{className:"text-muted"},"Wave Dashboard"),n.a.createElement("svg",{id:"my_dataviz-wave",height:"30",width:null!==(e=null==A?void 0:A.x)&&void 0!==e?e:405})),n.a.createElement("div",{style:{textAlign:"center",borderBottom:"1px solid #e5e5e5",padding:"0",minHeight:"300px"},className:"jumbotron "+".graph-wave-heihgt".replace(".",""),id:w})))}},"G+Rx":function(t,e,a){var r=a("0GbY");t.exports=r("document","documentElement")},MZgk:function(t,e,a){"use strict";a.d(e,"a",(function(){return M}));var r=a("wx14"),n=a("msdH"),l=a("G3A0");var i=function(t){return t!=t};var c=function(t,e,a){for(var r=a-1,n=t.length;++r<n;)if(t[r]===e)return r;return-1};var o=function(t,e,a){return e==e?c(t,e,a):Object(l.a)(t,i,a)};var d=function(t,e){return!!(null==t?0:t.length)&&o(t,e,0)>-1};var s=function(t,e,a){for(var r=-1,n=null==t?0:t.length;++r<n;)if(a(e,t[r]))return!0;return!1},u=a("ZWiB"),f=a("pVw1");var p=function(){},m=a("GYlH"),v=f.a&&1/Object(m.a)(new f.a([,-0]))[1]==1/0?function(t){return new f.a(t)}:p;var b=function(t,e,a){var r=-1,l=d,i=t.length,c=!0,o=[],f=o;if(a)c=!1,l=s;else if(i>=200){var p=e?null:v(t);if(p)return Object(m.a)(p);c=!1,l=u.a,f=new n.a}else f=e?[]:o;t:for(;++r<i;){var b=t[r],g=e?e(b):b;if(b=a||0!==b?b:0,c&&g==g){for(var h=f.length;h--;)if(f[h]===g)continue t;e&&f.push(g),o.push(b)}else l(f,g,a)||(f!==o&&f.push(g),o.push(b))}return o};var g=function(t){return t&&t.length?b(t):[]},h=a("/1FC"),y=a("8M4i"),j=a("U6JX"),O=Object(j.a)(Object.getPrototypeOf,Object),x=a("EUcb"),_=Function.prototype,w=Object.prototype,E=_.toString,A=w.hasOwnProperty,k=E.call(Object);var W=function(t){if(!Object(x.a)(t)||"[object Object]"!=Object(y.a)(t))return!1;var e=O(t);if(null===e)return!0;var a=A.call(e,"constructor")&&e.constructor;return"function"==typeof a&&a instanceof a&&E.call(a)==k},N=a("vJtL");var B=function(t){return"number"==typeof t||Object(x.a)(t)&&"[object Number]"==Object(y.a)(t)};var H=function(t){return"string"==typeof t||!Object(h.a)(t)&&Object(x.a)(t)&&"[object String]"==Object(y.a)(t)};var S=function(t){return!0===t||!1===t||Object(x.a)(t)&&"[object Boolean]"==Object(y.a)(t)};var I=function(t){return null==t},z=a("iuhU"),D=a("q1tI");function M(t,e){if("function"!=typeof t&&"string"!=typeof t)throw new Error("createShorthandFactory() Component must be a string or function.");return function(a,n){return function(t,e,a,n){if(void 0===n&&(n={}),"function"!=typeof t&&"string"!=typeof t)throw new Error("createShorthand() Component must be a string or function.");if(I(a)||S(a))return null;var l=H(a),i=B(a),c=Object(N.a)(a),o=D.isValidElement(a),d=W(a),s=l||i||Object(h.a)(a);if(!(c||o||d||s))return null;var u=n.defaultProps,f=void 0===u?{}:u,p=o&&a.props||d&&a||s&&e(a),m=n.overrideProps,v=void 0===m?{}:m;v=Object(N.a)(v)?v(Object(r.a)({},f,p)):v;var b=Object(r.a)({},f,p,v);if(f.className||v.className||p.className){var y=Object(z.a)(f.className,v.className,p.className);b.className=g(y.split(" ")).join(" ")}if((f.style||v.style||p.style)&&(b.style=Object(r.a)({},f.style,p.style,v.style)),I(b.key)){var j=b.childKey,O=n.autoGenerateKey,x=void 0===O||O;I(j)?x&&(l||i)&&(b.key=a):(b.key="function"==typeof j?j(b):j,delete b.childKey)}return o?D.cloneElement(a,b):"function"==typeof b.children?b.children(t,Object(r.a)({},b,{children:void 0})):s||d?D.createElement(t,b):c?a(t,b,b.children):void 0}(t,e,a,n)}}},"N+g0":function(t,e,a){var r=a("g6v/"),n=a("m/L8"),l=a("glrk"),i=a("33Wh");t.exports=r?Object.defineProperties:function(t,e){l(t);for(var a,r=i(e),c=r.length,o=0;c>o;)n.f(t,a=r[o++],e[a]);return t}},QGkA:function(t,e,a){a("RNIs")("flat")},QeBL:function(t,e,a){"use strict";a.r(e);var r=a("o0o1"),n=a.n(r),l=(a("ls82"),a("HaE+")),i=(a("h+6X"),a("q1tI")),c=a.n(i),o=a("yE/o"),d=a("wx14"),s=a("iuhU"),u=a("ZeOK"),f=a("ICNK"),p=a("Y53p"),m=a("MZgk");function v(t){var e=t.children,a=t.className,r=t.computer,n=t.color,l=t.floated,i=t.largeScreen,o=t.mobile,m=t.only,b=t.stretched,g=t.tablet,h=t.textAlign,y=t.verticalAlign,j=t.widescreen,O=t.width,x=Object(s.a)(n,Object(u.a)(b,"stretched"),Object(u.c)(m,"only"),Object(u.d)(h),Object(u.e)(l,"floated"),Object(u.f)(y),Object(u.g)(r,"wide computer"),Object(u.g)(i,"wide large screen"),Object(u.g)(o,"wide mobile"),Object(u.g)(g,"wide tablet"),Object(u.g)(j,"wide widescreen"),Object(u.g)(O,"wide"),"column",a),_=Object(f.a)(v,t),w=Object(p.a)(v,t);return c.a.createElement(w,Object(d.a)({},_,{className:x}),e)}v.handledProps=["as","children","className","color","computer","floated","largeScreen","mobile","only","stretched","tablet","textAlign","verticalAlign","widescreen","width"],v.create=Object(m.a)(v,(function(t){return{children:t}}));var b=v;function g(t){var e=t.centered,a=t.children,r=t.className,n=t.color,l=t.columns,i=t.divided,o=t.only,m=t.reversed,v=t.stretched,b=t.textAlign,h=t.verticalAlign,y=Object(s.a)(n,Object(u.a)(e,"centered"),Object(u.a)(i,"divided"),Object(u.a)(v,"stretched"),Object(u.c)(o,"only"),Object(u.c)(m,"reversed"),Object(u.d)(b),Object(u.f)(h),Object(u.g)(l,"column",!0),"row",r),j=Object(f.a)(g,t),O=Object(p.a)(g,t);return c.a.createElement(O,Object(d.a)({},j,{className:y}),a)}g.handledProps=["as","centered","children","className","color","columns","divided","only","reversed","stretched","textAlign","verticalAlign"];var h=g;function y(t){var e=t.celled,a=t.centered,r=t.children,n=t.className,l=t.columns,i=t.container,o=t.divided,m=t.doubling,v=t.inverted,b=t.padded,g=t.relaxed,h=t.reversed,j=t.stackable,O=t.stretched,x=t.textAlign,_=t.verticalAlign,w=Object(s.a)("ui",Object(u.a)(a,"centered"),Object(u.a)(i,"container"),Object(u.a)(m,"doubling"),Object(u.a)(v,"inverted"),Object(u.a)(j,"stackable"),Object(u.a)(O,"stretched"),Object(u.b)(e,"celled"),Object(u.b)(o,"divided"),Object(u.b)(b,"padded"),Object(u.b)(g,"relaxed"),Object(u.c)(h,"reversed"),Object(u.d)(x),Object(u.f)(_),Object(u.g)(l,"column",!0),"grid",n),E=Object(f.a)(y,t),A=Object(p.a)(y,t);return c.a.createElement(A,Object(d.a)({},E,{className:w}),r)}y.handledProps=["as","celled","centered","children","className","columns","container","divided","doubling","inverted","padded","relaxed","reversed","stackable","stretched","textAlign","verticalAlign"],y.Column=b,y.Row=h;var j=y,O=a("VlI8"),x=a("9Dj+"),_=a("XclY"),w=a("BkDX"),E=a("o3Sb"),A=a("XcmW");e.default=function(t){var e=t.location,a=(t.data.site.siteMetadata.siteName,Object(i.useState)()),r=a[0],d=a[1];return Object(i.useEffect)((function(){(function(){var t=Object(l.a)(n.a.mark((function t(){var e;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(O.a)();case 2:e=t.sent,console.log(e),d(e);case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}})()()}),[]),c.a.createElement(x.a,{location:e},c.a.createElement(o.a,null,c.a.createElement(j,{stackable:!0,columns:2,padded:!0},c.a.createElement(j.Column,{key:"red"},c.a.createElement(_.default,{mergedWeatherData:r})),c.a.createElement(j.Column,{key:"blue"},c.a.createElement(w.default,{mergedWeatherData:r})),c.a.createElement(j.Column,{key:"olive"},c.a.createElement(E.default,{mergedWeatherData:r})),c.a.createElement(j.Column,{key:"green"},c.a.createElement(A.default,{mergedWeatherData:r})))))}},RNIs:function(t,e,a){var r=a("tiKp"),n=a("fHMY"),l=a("m/L8"),i=r("unscopables"),c=Array.prototype;null==c[i]&&l.f(c,i,{configurable:!0,value:n(null)}),t.exports=function(t){c[i][t]=!0}},STAE:function(t,e,a){var r=a("0Dky");t.exports=!!Object.getOwnPropertySymbols&&!r((function(){return!String(Symbol())}))},XclY:function(t,e,a){"use strict";a.r(e);var r=a("q1tI"),n=a.n(r),l=a("yE/o"),i=a("AKWm"),c=a("wz8V"),o=a("R0i0"),d=a("VIqg"),s=a("+ugm"),u=a("qE0H"),f=a("iBRH"),p=a("VlI8"),m=a("X/k/"),v=a("Cove");e.default=function(t){var e,a=t.mergedWeatherData,b=Object(r.useState)(),g=b[0],h=b[1],y=Object(v.a)({id:"graph-canvas-weather"}),j=y[0];y[1],Object(r.useEffect)((function(){Object(i.a)(".graph-canvas").selectAll("*").remove();var t=O();t&&h(t)}),[a,j]),Object(r.useEffect)((function(){x()}),[g]);var O=function(){var t=window.document.getElementById("graph-canvas-weather");if(t&&a){var e,r,n=null!==(e=null==t?void 0:t.clientWidth)&&void 0!==e?e:0,l=null!==(r=null==t?void 0:t.clientHeight)&&void 0!==r?r:0,c=Object(i.a)(".graph-canvas").append("svg").attr("height",l).attr("width",n);return{x:n-(m.a.left+m.a.right),y:l-(m.a.top+m.a.bottom),node:c.append("g").attr("transform","translate("+m.a.left+","+m.a.top+")")}}},x=function(){if(a&&g){var t,e=a,r=e.map((function(t){var e;return null!==(e=t.datetime)&&void 0!==e?e:void 0})).filter(p.b),n=Object(c.a)(r),l=Object(o.a)().range([0,g.x]).domain(n),v=e.map((function(t){var e;return null!==(e=t.air_temperature_at_2m_above_ground_level)&&void 0!==e?e:void 0})).filter(p.b),b=Object(c.a)(v),h=b[0],y=b[1],j=Object(d.a)().range([null!==(t=null==g?void 0:g.y)&&void 0!==t?t:0,0]).domain([h,y]),O=Object(s.a)().curve(u.a).x((function(t){var e;return l(null!==(e=t.datetime)&&void 0!==e?e:0)})).y((function(t){var e,a;j(null!==(e=t.air_temperature_at_2m_above_ground_level)&&void 0!==e?e:0);return j(null!==(a=t.air_temperature_at_2m_above_ground_level)&&void 0!==a?a:0)}));g.node.append("g");g.node.append("g").selectAll(".location").data([a[0]]).enter().append("g").attr("class","location").append("path").attr("class","line").attr("d",(function(t){var e=O(a.filter((function(t){return t.air_temperature_at_2m_above_ground_level})));return console.log(e),e})).style("stroke",(function(t){return"darkBlue"})).attr("fill","none"),null==g||g.node.append("g").attr("class","axis axis--x").attr("transform","translate(0,"+g.y+")").call(Object(f.a)(l)),g.node.append("g").attr("class","axis y-axis").call(Object(f.b)(j).ticks(Math.min(Math.round(Math.floor(g.y/35)+1),y),".0f")).append("text").attr("transform","rotate(-90) translate("+-g.y/2+", "+.8*-m.a.left+")").attr("class","label").attr("text-anchor","middle").style("font-weight","normal").style("font-size","12px").attr("y",6).attr("dy",".35em").attr("fill","#666").text("Temp"),g.node.selectAll(".y-axis g text").attr("fill","#666"),g.node.selectAll(".y-axis g line").attr("stroke","#666");var x=Object(i.a)("#my_dataviz-air");x.append("circle").attr("cx",10).attr("cy",10).attr("r",6).style("fill","darkBlue"),x.append("text").attr("x",20).attr("y",10).text("Air Temp").style("font-size","15px").attr("alignment-baseline","middle")}};return n.a.createElement(l.a,null,n.a.createElement("div",{className:"App"},n.a.createElement("div",{className:"header",style:{minHeight:"70px"}},n.a.createElement("h3",{className:"text-muted"},"Air Dashboard"),n.a.createElement("svg",{id:"my_dataviz-air",height:"30",width:null!==(e=null==g?void 0:g.x)&&void 0!==e?e:405})),n.a.createElement("div",{style:{textAlign:"center",borderBottom:"1px solid #e5e5e5",padding:"0",minHeight:"300px"},className:"jumbotron graph-canvas",id:"graph-canvas-weather"})))}},XcmW:function(t,e,a){"use strict";a.r(e);var r=a("q1tI"),n=a.n(r),l=a("yE/o"),i=a("AKWm"),c=a("wz8V"),o=a("R0i0"),d=a("VIqg"),s=a("+ugm"),u=a("qE0H"),f=a("iBRH"),p=a("VlI8"),m=a("X/k/"),v=a("Cove");e.default=function(t){var e,a=t.mergedWeatherData,b="graph-canvas-water",g=Object(r.useState)(),h=g[0],y=g[1],j={id:b},O=Object(v.a)(j),x=O[0];O[1],Object(r.useEffect)((function(){Object(i.a)(".graph-water").selectAll("*").remove();var t=_();t&&y(t)}),[a,x]),Object(r.useEffect)((function(){w()}),[h]);var _=function(){var t=window.document.getElementById(b);if(t&&a){var e,r,n=null!==(e=null==t?void 0:t.clientWidth)&&void 0!==e?e:0,l=null!==(r=null==t?void 0:t.clientHeight)&&void 0!==r?r:0,c=Object(i.a)(".graph-water").append("svg").attr("height",l).attr("width",n);return{x:n-(m.a.left+m.a.right),y:l-(m.a.top+m.a.bottom),node:c.append("g").attr("transform","translate("+m.a.left+","+m.a.top+")")}}},w=function(){if(a&&h){var t,e=a,r=e.map((function(t){var e;return null!==(e=t.datetime)&&void 0!==e?e:void 0})).filter(p.b),n=Object(c.a)(r),l=Object(o.a)().range([0,h.x]).domain(n),v=e.map((function(t){return t.surface_sea_water_speed})).filter(p.b),b=Object(c.a)(v),g=Object(d.a)().range([null!==(t=null==h?void 0:h.y)&&void 0!==t?t:0,0]).domain(b),y=Object(s.a)().curve(u.a).x((function(t){return l(t[0])})).y((function(t){g(t[1]);return g(t[1])})),j=(h.node.append("g"),a.filter((function(t){return t.surface_sea_water_speed})).map((function(t){return[t.datetime,t.surface_sea_water_speed]})));h.node.append("g").selectAll(".location").data([j]).enter().append("g").attr("class","location").append("path").attr("class","line").attr("d",(function(t){var e=y(t);return console.log(e),e})).style("stroke",(function(t){return"darkBlue"})).attr("fill","none"),null==h||h.node.append("g").attr("class","axis axis--x").attr("transform","translate(0,"+h.y+")").call(Object(f.a)(l)),h.node.append("g").attr("class","axis y-axis").call(Object(f.b)(g)).append("text").attr("transform","rotate(-90) translate("+-h.y/2+", "+-m.a.left+")").attr("class","label").attr("text-anchor","middle").style("font-weight","normal").style("font-size","12px").attr("y",6).attr("dy",".35em").attr("fill","#666").text("Water Speed"),h.node.selectAll(".y-axis g text").attr("fill","#666"),h.node.selectAll(".y-axis g line").attr("stroke","#666");var O=Object(i.a)("#my_dataviz-water");O.append("circle").attr("cx",10).attr("cy",10).attr("r",6).style("fill","darkBlue"),O.append("text").attr("x",20).attr("y",10).text("Water Speed").style("font-size","15px").attr("alignment-baseline","middle")}};return n.a.createElement(l.a,null,n.a.createElement("div",{className:"App"},n.a.createElement("div",{className:"header",style:{minHeight:"70px"}},n.a.createElement("h3",{className:"text-muted"},"Water Dashboard"),n.a.createElement("svg",{id:"my_dataviz-water",height:"30",width:null!==(e=null==h?void 0:h.x)&&void 0!==e?e:405})),n.a.createElement("div",{style:{textAlign:"center",borderBottom:"1px solid #e5e5e5",padding:"0",minHeight:"300px"},className:"jumbotron "+".graph-water".replace(".",""),id:b})))}},ZfDv:function(t,e,a){var r=a("hh1v"),n=a("6LWA"),l=a("tiKp")("species");t.exports=function(t,e){var a;return n(t)&&("function"!=typeof(a=t.constructor)||a!==Array&&!n(a.prototype)?r(a)&&null===(a=a[l])&&(a=void 0):a=void 0),new(void 0===a?Array:a)(0===e?0:e)}},fHMY:function(t,e,a){var r,n=a("glrk"),l=a("N+g0"),i=a("eDl+"),c=a("0BK2"),o=a("G+Rx"),d=a("zBJ4"),s=a("93I0"),u=s("IE_PROTO"),f=function(){},p=function(t){return"<script>"+t+"<\/script>"},m=function(){try{r=document.domain&&new ActiveXObject("htmlfile")}catch(n){}var t,e;m=r?function(t){t.write(p("")),t.close();var e=t.parentWindow.Object;return t=null,e}(r):((e=d("iframe")).style.display="none",o.appendChild(e),e.src=String("javascript:"),(t=e.contentWindow.document).open(),t.write(p("document.F=Object")),t.close(),t.F);for(var a=i.length;a--;)delete m.prototype[i[a]];return m()};c[u]=!0,t.exports=Object.create||function(t,e){var a;return null!==t?(f.prototype=n(t),a=new f,f.prototype=null,a[u]=t):a=m(),void 0===e?a:l(a,e)}},"h+6X":function(t,e,a){},o3Sb:function(t,e,a){"use strict";a.r(e);var r=a("q1tI"),n=a.n(r),l=a("yE/o"),i=a("AKWm"),c=a("TCOF"),o=a("Xt/6"),d=a("LDjW"),s=a("s8O9"),u=a("dCyY"),f=a("lgMH"),p=a("sUwa"),m=a("oVo9"),v=a("wz8V"),b=a("R0i0"),g=a("VIqg"),h=a("+ugm"),y=a("qE0H"),j=a("iBRH"),O=a("VlI8"),x=a("X/k/"),_=a("Cove");e.default=function(t){var e,a=t.mergedWeatherData,w="graph-canvas-wind",E=Object(r.useState)(),A=E[0],k=E[1],W={id:w},N=Object(_.a)(W),B=N[0];N[1],Object(r.useEffect)((function(){Object(i.a)(".graph-wind").selectAll("*").remove();var t=H();t&&k(t)}),[a,B]),Object(r.useEffect)((function(){S()}),[A]);var H=function(){var t=window.document.getElementById(w);if(t&&a){var e,r,n=null!==(e=null==t?void 0:t.clientWidth)&&void 0!==e?e:0,l=null!==(r=null==t?void 0:t.clientHeight)&&void 0!==r?r:0,c=Object(i.a)(".graph-wind").append("svg").attr("height",l).attr("width",n);return{x:n-(x.a.left+x.a.right),y:l-(x.a.top+x.a.bottom),node:c.append("g").attr("transform","translate("+x.a.left+","+x.a.top+")")}}},S=function(){if(a&&A){var t,e,r=a,n=r.map((function(t){var e;return null!==(e=t.datetime)&&void 0!==e?e:void 0})).filter(O.b),l=Object(v.a)(n),_=Object(b.a)().range([0,A.x-30]).domain(l),w=r.map((function(t){return t.wind_speed_at_10m_above_ground_level})).filter(O.b),E=Object(v.a)(w),k=E[0],W=E[1],N=Object(g.a)().range([null!==(t=null==A?void 0:A.y)&&void 0!==t?t:0,0]).domain([k,W]),B=Object(g.a)().range([null!==(e=null==A?void 0:A.y)&&void 0!==e?e:0,0]).domain([0,360]),H=Object(h.a)().curve(y.a).x((function(t){return _(t[0])})).y((function(t){N(t[1]);return N(t[1])})),S=(A.node.append("g"),a.filter((function(t){return t.wind_speed_at_10m_above_ground_level})).map((function(t){return[t.datetime,t.wind_speed_at_10m_above_ground_level]})));null==A||A.node.append("g").selectAll("dot").data(a.filter((function(t){return t.wind_from_direction_at_10m_above_ground_level}))).enter().append("circle").attr("cx",(function(t){return _(t.datetime)})).attr("cy",(function(t){return B(t.wind_from_direction_at_10m_above_ground_level)})).attr("r",1.5).style("fill","red"),A.node.append("g").selectAll(".location").data([S]).enter().append("g").attr("class","location").append("path").attr("class","line").attr("d",(function(t){var e=H(t);return console.log(e),e})).style("stroke",(function(t){return"darkBlue"})).attr("fill","none"),null==A||A.node.append("g").attr("class","axis axis--x").attr("transform","translate(0,"+A.y+")").call(Object(j.a)(_).tickFormat((function(t){var e,a=Object(c.a)(".%L"),r=Object(c.a)(":%S"),n=Object(c.a)("%H:%M"),l=Object(c.a)("%H:00"),i=Object(c.a)("%a %d"),v=Object(c.a)("%b %d"),b=Object(c.a)("%B"),g=Object(c.a)("%Y");return e=t,(Object(o.a)(e)<e?a:Object(d.a)(e)<e?r:Object(s.a)(e)<e?n:Object(u.a)(e)<e?l:Object(f.a)(e)<e?Object(p.b)(e)<e?i:v:Object(m.a)(e)<e?b:g)(e)}))),A.node.append("g").attr("transform","translate("+(A.x-30)+", 0)").attr("class","axisRed").call(Object(j.c)(B)).append("text").attr("transform","rotate(-90) translate("+-A.y/2+", 30\n            )").attr("class","label").attr("text-anchor","middle").style("font-weight","normal").style("font-size","12px").attr("y",6).attr("dy",".35em").attr("fill","red").text("Direction"),A.node.append("g").attr("class","axis y-axis").attr("class","axisBlue").call(Object(j.b)(N).ticks(Math.min(Math.round(Math.floor(A.y/35)+1),W),".0f")).append("text").attr("transform","rotate(-90) translate("+-A.y/2+", "+.8*-x.a.left+")").attr("class","label").attr("text-anchor","middle").style("font-weight","normal").style("font-size","12px").attr("y",6).attr("dy",".35em").attr("fill","#666").text("Wind Speed"),A.node.selectAll(".y-axis g text").attr("fill","#666"),A.node.selectAll(".y-axis g line").attr("stroke","#666");var I=Object(i.a)("#my_dataviz-wind");I.append("circle").attr("cx",10).attr("cy",10).attr("r",6).style("fill","red"),I.append("text").attr("x",20).attr("y",10).text("Wind Direction").style("font-size","15px").attr("alignment-baseline","middle"),I.append("circle").attr("cx",150).attr("cy",10).attr("r",6).style("fill","darkBlue"),I.append("text").attr("x",170).attr("y",10).text("Wind Speed").style("font-size","15px").attr("alignment-baseline","middle")}};return n.a.createElement(l.a,null,n.a.createElement("div",{className:"App"},n.a.createElement("div",{className:"header",style:{minHeight:"70px"}},n.a.createElement("h3",{className:"text-muted"},"Wind Dashboard"),n.a.createElement("svg",{id:"my_dataviz-wind",height:"30",width:null!==(e=null==A?void 0:A.x)&&void 0!==e?e:405})),n.a.createElement("div",{style:{textAlign:"center",borderBottom:"1px solid #e5e5e5",padding:"0",minHeight:"300px"},className:"jumbotron "+".graph-wind".replace(".",""),id:w})))}},or9q:function(t,e,a){"use strict";var r=a("6LWA"),n=a("UMSQ"),l=a("A2ZE"),i=function(t,e,a,c,o,d,s,u){for(var f,p=o,m=0,v=!!s&&l(s,u,3);m<c;){if(m in a){if(f=v?v(a[m],m,e):a[m],d>0&&r(f))p=i(t,e,f,n(f.length),p,d-1)-1;else{if(p>=9007199254740991)throw TypeError("Exceed the acceptable array length");t[p]=f}p++}m++}return p};t.exports=i},tiKp:function(t,e,a){var r=a("2oRo"),n=a("VpIT"),l=a("UTVS"),i=a("kOOl"),c=a("STAE"),o=a("/b8u"),d=n("wks"),s=r.Symbol,u=o?s:s&&s.withoutSetter||i;t.exports=function(t){return l(d,t)||(c&&l(s,t)?d[t]=s[t]:d[t]=u("Symbol."+t)),d[t]}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-6d99b9607eb95dba7db9.js.map