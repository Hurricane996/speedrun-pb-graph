(this["webpackJsonpspeedrun-pb-graph"]=this["webpackJsonpspeedrun-pb-graph"]||[]).push([[0],{227:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),c=a(37),s=a.n(c),u=a(14),i=a(6),o=a(7),l=a.n(o),d=a(10),j=a(9),b=a(13),h=a(106),m=(a(219),a(16)),f=a(229),p=a(74),g=a(2),O=function(e){var t=e.error;return Object(g.jsxs)(p.a,{variant:"danger",children:["An error occured: ",t]})},x=function(){return Object(g.jsx)(p.a,{variant:"info",children:"Loading..."})},v=function(e){var t=e%1,a=Math.floor(e)%60,r=Math.floor(e/60)%60,n=Math.floor(e/3600),c=t<.001?"":t.toFixed(3).slice(1),s=a<10?"0".concat(a):"".concat(a),u=r<10?"0".concat(r):"".concat(r),i=0===n?"":"".concat(n,":");return"".concat(i).concat(u,":").concat(s).concat(c)},y=a(100),N=a.n(y),I=a(30),w=Object(r.createContext)(null),k=function(e){var t=e.children,a=Object(r.useState)({}),n=Object(j.a)(a,2),c=n[0],s=n[1];return Object(g.jsx)(w.Provider,{value:{isInCache:function(e){return Object.keys(c).includes(e)},getFromCache:function(e){return c[e]},addOrUpdateCache:function(e,t){var a=Object(I.a)({},c);a[e]=t,s(a)}},children:t})},C=function(e,t,a){var n=Object(r.useState)(null),c=Object(j.a)(n,2),s=c[0],u=c[1],i=Object(r.useState)(!0),o=Object(j.a)(i,2),d=o[0],h=o[1],m=Object(r.useState)(null),f=Object(j.a)(m,2),p=f[0],g=f[1],O=Object(r.useContext)(w);if(!O)return[null,!1,"calls to useFetcher() must be wrapped in a CacheProvider"];var x=O.isInCache,v=O.addOrUpdateCache,y=O.getFromCache,I=function(){var e=Object(b.a)(l.a.mark((function e(t){var a,r,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=t.replace(X,""),!x(a)){e.next=3;break}return e.abrupt("return",y(a));case 3:return e.next=5,N()(t,{timeout:1e4});case 5:return r=e.sent,e.next=8,r.json();case 8:return n=e.sent,v(a,n),e.abrupt("return",n);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k=function(){var a=Object(b.a)(l.a.mark((function a(){var r;return l.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return h(!0),a.prev=1,a.next=4,e(t,I);case 4:r=a.sent,u(r),h(!1),a.next=13;break;case 9:a.prev=9,a.t0=a.catch(1),console.error(a.t0),g(a.t0.message);case 13:case"end":return a.stop()}}),a,null,[[1,9]])})));return function(){return a.apply(this,arguments)}}();return Object(r.useEffect)((function(){k()}),null!==a&&void 0!==a?a:[]),[s,d,p]},P=function(e,t,a){return a?e?t+e:"":e?e+t:""},S=function(){var e=Object(b.a)(l.a.mark((function e(t,a){var r,n,c,s,u,i,o,h,f,p,g,O;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.userId,n=t.categoryId,c=t.levelId,s=t.searchParams,e.next=3,Promise.all([a("".concat(X,"/categories/").concat(n,"?embed=game")),a("".concat(X,"/users/").concat(r)),a("".concat(X,"/runs?user=").concat(r).concat(P(c,"&level=",!0),"&category=").concat(n,"&max=200")),c?a("".concat(X,"/levels/").concat(c)):null,Promise.all(Object(d.a)(s.entries()).map(function(){var e=Object(b.a)(l.a.mark((function e(t){var r,n,c,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=Object(j.a)(t,2),n=r[0],c=r[1],e.next=3,a("".concat(X,"/variables/").concat(n));case 3:return s=e.sent,e.abrupt("return",s.data.values.values[c].label);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()))]);case 3:return u=e.sent,i=Object(j.a)(u,5),o=i[0],h=i[1],f=i[2],p=i[3],g=i[4],O=f.data.filter((function(e){return"rejected"!==e.status.status})).filter((function(e){return Object.entries(e.values).every((function(e){var t=Object(j.a)(e,2),a=t[0];return t[1]===s.get(a)}))})).map((function(e){return{date:m.DateTime.fromFormat(e.date,"yyyy-MM-dd",{zone:"UTC"}),time:e.times.primary_t,id:e.id}})).sort((function(e,t){return e.date===t.date?e.time<t.time?-1:1:e.date<t.date?-1:1})),e.abrupt("return",{gameName:o.data.game.data.names.international,categoryName:o.data.name,subcategoryString:g.join(", "),username:h.data.names.international,levelName:p?p.data.name:"",runs:O});case 12:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),F=function(){var e=Object(i.h)(),t=e.userId,a=e.categoryId,n=e.levelId,c=Object(r.useRef)(null),s=new URLSearchParams(Object(i.g)().search);if(!t)return Object(g.jsx)(O,{error:"No user id provided!"});if(!a)return Object(g.jsx)(O,{error:"No category id provided!"});var o=C(S,{userId:t,categoryId:a,levelId:n,searchParams:s}),l=Object(j.a)(o,3),d=l[0],b=l[1],m=l[2];if(m)return Object(g.jsx)(O,{error:m});if(b)return Object(g.jsx)(x,{});var p={labels:null===d||void 0===d?void 0:d.runs.map((function(e){return e.date})),datasets:[{label:"Time",data:null===d||void 0===d?void 0:d.runs.map((function(e){return e.time})),borderColor:"rgb(255,0,0)"}]},y={onClick:function(){if(c.current){var e=c.current.getActiveElements();if(e.length>0){var t=null===d||void 0===d?void 0:d.runs[e[0].index];window.location.href="https://speedrun.com/run/".concat(null===t||void 0===t?void 0:t.id)}}},responsive:!0,scales:{x:{type:"time",time:{tooltipFormat:"MMM d, yyyy"}},y:{ticks:{callback:function(e){return v(e)}}}},plugins:{tooltip:{callbacks:{label:function(e){return v(e.parsed.y)}}}}};return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsxs)("h1",{children:[null===d||void 0===d?void 0:d.gameName,": ",P(null===d||void 0===d?void 0:d.levelName," "),null===d||void 0===d?void 0:d.categoryName," - ",P(null===d||void 0===d?void 0:d.subcategoryString," - "),null===d||void 0===d?void 0:d.username]}),Object(g.jsx)(u.b,{to:"/user/".concat(t),children:"Back to user"}),Object(g.jsx)("p",{children:Object(g.jsx)("b",{children:" Click a data-point to see the associated run's speedrun.com page!"})}),Object(g.jsx)(f.a,{children:Object(g.jsx)(h.a,{ref:c,type:"line",data:p,options:y})})]})},M=a(102),V=a(230),L=a(104),G=a(73),q=a(103),B=function(){var e=Object(r.useState)(""),t=Object(j.a)(e,2),a=t[0],n=t[1],c=Object(i.f)();return Object(g.jsx)(G.a,{inline:!0,onSubmit:function(e){e.preventDefault(),c.push("/search/".concat(a))},children:Object(g.jsxs)(q.a,{children:[Object(g.jsx)(G.a.Control,{type:"search",name:"username",id:Object(M.uniqueId)("search-field-"),placeholder:"speedrun.com username",value:a,onChange:function(e){e.preventDefault(),n(e.target.value)}}),Object(g.jsx)(L.a,{type:"submit","aria-label":"search",children:Object(g.jsx)(V.a,{})})]})})},R=function(){return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)("h1",{children:" Welcome to the Speedrun PB Grapher"}),Object(g.jsx)("p",{children:" Enter your username to get started!"}),Object(g.jsx)(B,{})]})},U=function(){var e=Object(b.a)(l.a.mark((function e(t,a){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all(Object.entries(t).map(function(){var e=Object(b.a)(l.a.mark((function e(t){var r,n,c,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=Object(j.a)(t,2),n=r[0],c=r[1],e.next=3,a("".concat(X,"/variables/").concat(n));case 3:return s=e.sent,e.abrupt("return",{subcategoryKeyId:n,subcategoryValueId:c,subcategoryValueName:s.data.values.values[c].label});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),E=function(e,t){if(e.categoryName<t.categoryName)return-1;if(e.categoryName>t.categoryName)return 1;if(0===e.subcategories.length||0===t.subcategories.length)return 0;if(e.subcategories[0].subcategoryValueName<t.subcategories[0].subcategoryValueName)return-1;if(e.subcategories[0].subcategoryValueName>t.subcategories[0].subcategoryValueName)return 1;if("levelName"in e&&"levelName"in t){if(e.levelName<t.levelName)return-1;if(e.levelName>t.levelName)return 1}return 0},J=function(){var e=Object(b.a)(l.a.mark((function e(t,a){var r,n,c,s,u,i,o,h,m,f,p;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.id,e.next=3,Promise.all([a("".concat(X,"/users/").concat(r)),a("".concat(X,"/users/").concat(r,"/personal-bests?embed=game,category,level"))]);case 3:return n=e.sent,c=Object(j.a)(n,2),s=c[0],u=c[1],i=u.data.filter((function(e){return"per-game"===e.category.data.type})),o=u.data.filter((function(e){return"per-level"===e.category.data.type})),e.next=11,Promise.all(i.map(function(){var e=Object(b.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=t.game.data.names.international,e.t1=t.game.data.id,e.t2=t.category.data.name,e.t3=t.category.data.id,e.next=6,U(t.run.values,a);case 6:return e.t4=e.sent,e.abrupt("return",{gameName:e.t0,gameId:e.t1,categoryName:e.t2,categoryId:e.t3,subcategories:e.t4});case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 11:return h=e.sent,e.next=14,Promise.all(o.map(function(){var e=Object(b.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=t.game.data.names.international,e.t1=t.game.data.id,e.t2=t.category.data.name,e.t3=t.category.data.id,e.t4=t.level.data.id,e.t5=t.level.data.name,e.next=8,U(t.run.values,a);case 8:return e.t6=e.sent,e.abrupt("return",{gameName:e.t0,gameId:e.t1,categoryName:e.t2,categoryId:e.t3,levelId:e.t4,levelName:e.t5,subcategories:e.t6});case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 14:return m=e.sent,f=Object(d.a)(new Set(u.data.map((function(e){return e.game.data.id})))),p=f.map((function(e){var t=h.filter((function(t){return t.gameId===e})).sort(E),a=m.filter((function(t){return t.gameId===e})).sort(E);return{id:e,name:t.length>0?t[0].gameName:a[0].gameName,fullGameCategories:t,levelCategories:a}})),e.abrupt("return",{id:s.data.id,name:s.data.names.international,games:p});case 18:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),T=function(e){return e.length?"?"+e.map((function(e){return"".concat(e.subcategoryKeyId,"=").concat(e.subcategoryValueId)})).join("&"):""},A=function(e){return e.length?" - "+e.map((function(e){return e.subcategoryValueName})).join(", "):""},D=function(){var e=Object(i.h)().id,t=C(J,{id:e}),a=Object(j.a)(t,3),r=a[0],c=a[1],s=a[2];return s?Object(g.jsx)(O,{error:s}):c?Object(g.jsx)(x,{}):Object(g.jsxs)(g.Fragment,{children:[Object(g.jsxs)("h1",{children:["Categories for ",null===r||void 0===r?void 0:r.name]}),r&&r.games.length>0?r.games.map((function(e){return Object(g.jsxs)(n.a.Fragment,{children:[Object(g.jsxs)("h2",{children:[" ",e.name," "]}),e.fullGameCategories.length>0&&Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)("h3",{children:"Full game runs:"}),Object(g.jsx)("ul",{children:e.fullGameCategories.map((function(e){return Object(g.jsx)("li",{children:Object(g.jsxs)(u.b,{to:"/graph/".concat(r.id,"/").concat(e.categoryId).concat(T(e.subcategories)),children:[e.categoryName,A(e.subcategories)]})},JSON.stringify(e))}))})]}),e.levelCategories.length>0&&Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)("h3",{children:"IL runs:"}),Object(g.jsx)("ul",{children:e.levelCategories.map((function(e){return Object(g.jsx)("li",{children:Object(g.jsxs)(u.b,{to:"/graph/il/".concat(r.id,"/").concat(e.levelId,"/").concat(e.categoryId,"?").concat(T(e.subcategories)),children:[e.levelName," ",e.categoryName,A(e.subcategories)]})},JSON.stringify(e))}))})]})]},e.id)})):Object(g.jsx)("p",{children:"This user hasn't submitted any runs"})]})},H=a(105),K=a(233),z=a(232),W=(a(226),function(){var e=Object(b.a)(l.a.mark((function e(t,a){var r,n,c,s,u,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.query,n=t.offset,e.next=3,Promise.all([a("".concat(X,"/users?lookup=").concat(r)),a("".concat(X,"/users?name=").concat(r,"&offset=").concat(n))]);case 3:return c=e.sent,s=Object(j.a)(c,2),u=s[0],i=s[1],e.abrupt("return",{exactMatch:u.data.length>0?{id:u.data[0].id,name:u.data[0].names.international}:null,results:i.data.map((function(e){return{id:e.id,name:e.names.international}})),hasNext:!!i.pagination.links.find((function(e){return"next"==e.rel}))});case 8:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),_=function(){var e=Object(i.h)().query,t=new URLSearchParams(Object(i.g)().search).get("offset"),a=t?parseInt(t):0,r=C(W,{query:e,offset:a},[e,a]),n=Object(j.a)(r,3),c=n[0],s=n[1],o=n[2];return o?Object(g.jsx)(O,{error:o}):s?Object(g.jsx)(x,{}):Object(g.jsxs)(g.Fragment,{children:[Object(g.jsxs)("h3",{children:["Results for ",e,":"]}),(null===c||void 0===c?void 0:c.exactMatch)&&Object(g.jsx)("p",{children:Object(g.jsxs)("b",{children:["An exact match was found: ",Object(g.jsxs)(u.b,{to:"/user/".concat(c.exactMatch.id),children:[c.exactMatch.name," "]})]})}),(null===c||void 0===c?void 0:c.results)&&c.results.length>0?Object(g.jsx)("ul",{children:c.results.map((function(e){var t=e.id,a=e.name;return Object(g.jsx)("li",{children:Object(g.jsxs)(u.b,{to:"/user/".concat(t),children:[a," "]})},t)}))}):Object(g.jsxs)("p",{children:["No users found. ",Object(g.jsx)(u.b,{to:"/",children:"Search again?"})]}),a>0&&Object(g.jsx)(u.b,{to:"/search/".concat(e,"?offset=").concat(Math.max(0,a-20)),children:"<Prev"}),a>0&&(null===c||void 0===c?void 0:c.hasNext)&&" - ",(null===c||void 0===c?void 0:c.hasNext)&&Object(g.jsx)(u.b,{to:"/search/".concat(e,"?offset=").concat(a+20),children:"Next >"})]})},Q=a(231),X="https://speedrun.com/api/v1",Y=function(){return Object(g.jsx)(u.a,{children:Object(g.jsxs)(k,{children:[Object(g.jsxs)(K.a,{bg:"dark",expand:"lg",className:"mb-4",style:{justifyContent:"space-between",paddingLeft:"1em",paddingRight:"1em"},children:[Object(g.jsxs)(z.a,{children:[Object(g.jsx)(K.a.Brand,{href:"#/",style:{color:"white"},children:"Speedrun PB Grapher"}),Object(g.jsx)(z.a.Link,{href:"#/",style:{color:"white"},children:"Home"})]}),Object(g.jsxs)(z.a,{className:"float-right",children:[Object(g.jsx)(B,{}),Object(g.jsx)(z.a.Link,{"aria-label":"Project Github",href:"https://github.com/Hurricane996/speedrun-pb-graph",children:Object(g.jsx)(Q.a,{style:{color:"white"},className:"ml-auto"})})]})]}),Object(g.jsx)(H.a,{children:Object(g.jsxs)(i.c,{children:[Object(g.jsx)(i.a,{path:"/user/:id",exact:!0,children:Object(g.jsx)(D,{})}),Object(g.jsx)(i.a,{path:"/graph/il/:userId/:levelId/:categoryId",exact:!0,children:Object(g.jsx)(F,{})}),Object(g.jsx)(i.a,{path:"/graph/:userId/:categoryId",exact:!0,children:Object(g.jsx)(F,{})}),Object(g.jsx)(i.a,{path:"/search/:query",exact:!0,children:Object(g.jsx)(_,{})}),Object(g.jsx)(i.a,{path:"/",exact:!0,children:Object(g.jsx)(R,{})}),Object(g.jsx)(i.a,{children:"404"})]})})]})})};s.a.render(Object(g.jsx)(n.a.StrictMode,{children:Object(g.jsx)(Y,{})}),document.getElementById("root"))}},[[227,1,2]]]);
//# sourceMappingURL=main.bc3306ce.chunk.js.map