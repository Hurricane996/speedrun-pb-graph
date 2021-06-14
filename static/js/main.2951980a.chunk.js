(this["webpackJsonpspeedrun-pb-graph"]=this["webpackJsonpspeedrun-pb-graph"]||[]).push([[0],{241:function(e,t,a){"use strict";a.r(t);var c=a(0),n=a.n(c),r=a(31),s=a.n(r),o=a(16),l=a(6),i=a(21),j=a.n(i),u=a(29),b=a(7),d=a(17),O=a.n(d),h=a(103),p=(a(233),a(12)),m=a(243),x=a(3),g=function(e){var t=e%1,a=Math.floor(e)%60,c=Math.floor(e/60)%60,n=Math.floor(e/3600),r=0===t?"":t.toFixed(3).slice(1),s=a<10?"0".concat(a):"".concat(a),o=c<10?"0".concat(c):"".concat(c),l=0===n?"":"".concat(n,":"),i="".concat(l).concat(o,":").concat(s).concat(r);return console.log(i),i},f={scales:{x:{type:"time",time:{tooltipFormat:"DD"}},y:{ticks:{callback:function(e){return g(e)}}}},plugins:{tooltip:{callbacks:{label:function(e){return g(e.parsed.y)}}}}},v=function(){var e=Object(l.f)(),t=e.userId,a=e.categoryId,n=Object(c.useState)(!0),r=Object(b.a)(n,2),s=r[0],i=r[1],d=Object(c.useState)(!1),g=Object(b.a)(d,2),v=g[0],y=g[1],k=Object(c.useState)(""),S=Object(b.a)(k,2),w=S[0],I=S[1],F=Object(c.useState)(""),E=Object(b.a)(F,2),D=E[0],N=E[1],B=Object(c.useState)(""),C=Object(b.a)(B,2),L=C[0],T=C[1],P=Object(c.useState)(""),G=Object(b.a)(P,2),J=G[0],H=G[1],U=Object(c.useState)([]),_=Object(b.a)(U,2),q=_[0],z=_[1],A=function(){var e=Object(u.a)(j.a.mark((function e(){var c,n,r,s,o;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Promise.all([O.a.jsonp("".concat(M,"/categories/").concat(a,"?embed=game&callback=callback")),O.a.jsonp("".concat(M,"/users/").concat(t,"?callback=callback")),O.a.jsonp("".concat(M,"/runs?user=").concat(t,"&category=").concat(a,"&max=200&callback=callback"))]);case 3:c=e.sent,n=Object(b.a)(c,3),r=n[0],s=n[1],o=n[2],console.log(o),N(r.data.game.data.names.international),T(r.data.name),H(s.data.names.international),i(!1),z(o.data.filter((function(e){return"rejected"!==e.status.status})).map((function(e){return{date:p.DateTime.fromFormat(e.date,"yyyy-MM-dd"),time:e.times.primary_t}})).sort((function(e,t){return e.date===t.date?e.time<t.time?-1:1:e.date<t.date?-1:1}))),e.next=21;break;case 16:e.prev=16,e.t0=e.catch(0),y(!0),I(e.t0.message),console.log(e.t0);case 21:case"end":return e.stop()}}),e,null,[[0,16]])})));return function(){return e.apply(this,arguments)}}();if(Object(c.useEffect)((function(){A()}),[]),v)return Object(x.jsxs)("p",{children:['Encountered error "',w,'"']});if(s)return Object(x.jsx)("p",{children:"Loading..."});var K={labels:q.map((function(e){return e.date})),datasets:[{label:"Time",data:q.map((function(e){return e.time})),borderColor:"rgb(255,0,0)"}]};return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsxs)("h1",{children:[D," : ",L," - ",J]}),Object(x.jsx)(o.b,{to:"/user/".concat(t),children:"Back to user"}),Object(x.jsx)(m.a,{children:Object(x.jsx)(h.a,{type:"line",data:K,options:f,width:600,height:250})})]})},y=a(245),k=null,S=function(){var e=Object(c.useState)(""),t=Object(b.a)(e,2),a=t[0],n=t[1],r=Object(c.useState)(!1),s=Object(b.a)(r,2),l=s[0],i=s[1],d=Object(c.useState)([]),h=Object(b.a)(d,2),p=h[0],m=h[1],g=function(){var e=Object(u.a)(j.a.mark((function e(t){var a,c;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return k&&k.cancel(),e.prev=1,k=O.a.CancelToken.source(),e.next=5,O.a.jsonp("".concat(M,"/users?name=").concat(t,"&callback=callback"),{cancelToken:k.token});case 5:a=e.sent,c=a.data,console.log(c),m(c.slice(0,5).map((function(e){return{id:e.id,name:e.names.international}}))),i(!1),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(1),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(t){return e.apply(this,arguments)}}();return Object(x.jsx)(x.Fragment,{children:Object(x.jsxs)(y.a,{children:[Object(x.jsxs)(y.a.Group,{children:[Object(x.jsx)(y.a.Label,{children:"Enter your speedrun.com username"}),Object(x.jsx)(y.a.Control,{type:"search",name:"username",onChange:function(e){n(e.target.value),i(!0),e.target.value.length>=1?g(e.target.value):m([])},value:a})]}),l||0==a.length?0!=a.length?Object(x.jsx)("p",{children:"Loading..."}):Object(x.jsx)(x.Fragment,{}):Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("h3",{children:"Users:"}),Object(x.jsx)("ul",{children:p.length>0?p.map((function(e){var t=e.id,a=e.name;return Object(x.jsx)("li",{children:Object(x.jsxs)(o.b,{to:"/user/".concat(t),children:[a," "]})},t)})):Object(x.jsx)("p",{children:"No users found"})})]})]})})},w=function(){var e=Object(l.f)().id,t=Object(c.useState)(!0),a=Object(b.a)(t,2),n=a[0],r=a[1],s=Object(c.useState)(!1),i=Object(b.a)(s,2),d=i[0],h=i[1],p=Object(c.useState)(""),m=Object(b.a)(p,2),g=m[0],f=m[1],v=Object(c.useState)(null),y=Object(b.a)(v,2),k=y[0],S=y[1],w=function(){var t=Object(u.a)(j.a.mark((function t(){var a,c,n,s;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Promise.all([O.a.jsonp("".concat(M,"/users/").concat(e,"?callback=callback")),O.a.jsonp("".concat(M,"/users/").concat(e,"/personal-bests?embed=game,category&callback=callback"))]);case 3:a=t.sent,c=Object(b.a)(a,2),n=c[0],s=c[1],r(!1),console.log(s.data),S({id:n.data.id,name:n.data.names.international,categories:s.data.filter((function(e){return"per-game"===e.category.data.type})).map((function(e){var t=e.game,a=e.category;return{gameName:t.data.names.international,gameId:t.data.id,categoryName:a.data.name,categoryId:a.data.id}}))}),t.next=17;break;case 12:t.prev=12,t.t0=t.catch(0),h(!0),f(t.t0.message),console.error(t.t0);case 17:case"end":return t.stop()}}),t,null,[[0,12]])})));return function(){return t.apply(this,arguments)}}();return Object(c.useEffect)((function(){w()}),[]),d?Object(x.jsxs)("p",{children:["Error ",g," occured."]}):n?Object(x.jsx)("p",{children:"Loading..."}):(console.log(k),Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("h2",{children:null===k||void 0===k?void 0:k.name}),Object(x.jsx)("ul",{children:null===k||void 0===k?void 0:k.categories.map((function(e){return Object(x.jsx)("li",{children:Object(x.jsxs)(o.b,{to:"/graph/".concat(null===k||void 0===k?void 0:k.id,"/").concat(e.categoryId),children:[e.gameName,": ",e.categoryName]})},e.categoryId)}))})]}))},I=a(102),F=a(244),E=a(246),M=(a(240),"https://speedrun.com/api/v1"),D=function(){return Object(x.jsxs)(o.a,{children:[Object(x.jsxs)(F.a,{bg:"dark",children:[Object(x.jsx)(F.a.Brand,{children:Object(x.jsx)(o.b,{to:"/",style:{textDecoration:"none"},children:Object(x.jsx)("h4",{style:{color:"white"},children:"Speedrun PB Grapher"})})}),Object(x.jsx)(E.a.Item,{children:Object(x.jsx)(o.b,{to:"/",style:{color:"white",textDecoration:"none"},children:"Home"})})]}),Object(x.jsx)(I.a,{children:Object(x.jsxs)(l.c,{children:[Object(x.jsx)(l.a,{path:"/user/:id",exact:!0,children:Object(x.jsx)(w,{})}),Object(x.jsx)(l.a,{path:"/graph/:userId/:categoryId",exact:!0,children:Object(x.jsx)(v,{})}),Object(x.jsx)(l.a,{path:"/",exact:!0,children:Object(x.jsx)(S,{})}),Object(x.jsx)(l.a,{children:"404"})]})})]})};s.a.render(Object(x.jsx)(n.a.StrictMode,{children:Object(x.jsx)(D,{})}),document.getElementById("root"))}},[[241,1,2]]]);
//# sourceMappingURL=main.2951980a.chunk.js.map