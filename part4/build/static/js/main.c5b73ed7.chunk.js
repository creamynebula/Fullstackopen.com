(this.webpackJsonppart2=this.webpackJsonppart2||[]).push([[0],{15:function(t,e,n){t.exports=n(38)},37:function(t,e,n){},38:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),o=n(13),c=n.n(o),u=n(14),l=n(2),i=function(t){var e=t.note,n=t.toggleImportance,a=e.important?"Turn Into Not Important":"Make it Important";return r.a.createElement("li",{className:"note"},e.content,r.a.createElement("button",{onClick:n},a))},m=n(3),f=n.n(m),s=function(t){var e=t.message;return null===e?null:r.a.createElement("div",{className:"error"},e)},p=function(){return r.a.createElement("div",{style:{color:"rgb(29, 1, 107)",fontStyle:"italic",fontSize:18}},r.a.createElement("br",null),r.a.createElement("em",null,"Note app, Department of Computer Science, University of Helsinki 2020"))},d=function(){var t=Object(a.useState)([]),e=Object(l.a)(t,2),n=e[0],o=e[1],c=Object(a.useState)("A certain magical new note"),m=Object(l.a)(c,2),d=m[0],E=m[1],b=Object(a.useState)(!0),v=Object(l.a)(b,2),h=v[0],g=v[1],N=Object(a.useState)(null),O=Object(l.a)(N,2),j=O[0],S=O[1];Object(a.useEffect)((function(){return f.a.get("/api/notes").then((function(t){o(t.data)}))}),[]);var y=h?n:n.filter((function(t){return!0===t.important})),k=function(t){var e=n.find((function(e){return e.id===t})),a=Object(u.a)({},e,{important:!e.important});(function(t,e){return f.a.put("".concat("/api/notes","/").concat(t),e).then((function(t){return t.data}))})(t,a).then((function(e){o(n.map((function(n){return n.id!==t?n:e}))),S("Note updated"),setTimeout((function(){S(null)}),5e3)})).catch((function(a){S("Note '".concat(e.content,"' was already removed from server")),setTimeout((function(){S(null)}),5e3),o(n.filter((function(e){return e.id!==t})))}))};return r.a.createElement("div",null,r.a.createElement("h1",null,"Notes"),r.a.createElement(s,{message:j}),r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){return g(!h)}},"Show ",h?"Only VERY Important Notes":"All Notes")),r.a.createElement("ul",null,y.map((function(t){return r.a.createElement(i,{key:t.date,note:t,toggleImportance:function(){return k(t.id)}})}))),r.a.createElement("form",{onSubmit:function(t){t.preventDefault();var e,a={content:d,date:new Date,important:Math.random()>.5};(e=a,f.a.post("/api/notes",e).then((function(t){return t.data}))).then((function(t){o(n.concat(t)),S("Note created"),setTimeout((function(){S(null)}),5e3),E("")}))}},r.a.createElement("p",null,r.a.createElement("input",{value:d,onChange:function(t){E(t.target.value)}})),r.a.createElement("button",{type:"submit"},"Save Note")),r.a.createElement(p,null))};n(37);c.a.render(r.a.createElement(d,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.c5b73ed7.chunk.js.map