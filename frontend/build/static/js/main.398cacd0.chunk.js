(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{28:function(e,t,a){},69:function(e,t,a){e.exports=a(80)},74:function(e,t,a){},80:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(10),l=a.n(r),c=a(14),i=a(11),u=(a(74),a(53)),m=a(13),s=a(122),d=a(116),f=a(117),b=a(115),h=a(124),E=a(120),p=a(125),v=a(110),g=a(126),j=a(121),O=a(118),y=a(119);a(28);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var C=o.a.createElement(c.a,null,o.a.createElement(i.c,null,o.a.createElement(i.a,{exact:!0,path:"/",component:function(){return o.a.createElement("div",{className:"Container"},o.a.createElement("h1",null,"Notion Forms"),o.a.createElement("p",null,o.a.createElement(c.b,{target:"_blank",to:"/form/5ee8e0606b5647fed80c522f"},"Join the waitlist to start creating your own forms as soon as possible")),o.a.createElement("p",null,o.a.createElement(c.b,{to:"/create"},"Create a form (needs account)")),o.a.createElement("p",null,o.a.createElement(c.b,{to:"/about"},"About")))}}),o.a.createElement(i.a,{exact:!0,path:"/form/:form_id",component:function(){var e=Object(n.useState)(""),t=Object(m.a)(e,2),a=t[0],r=t[1],l=Object(n.useState)(""),c=Object(m.a)(l,2),C=c[0],k=c[1],w=Object(n.useState)([]),S=Object(m.a)(w,2),_=S[0],N=S[1],F=Object(n.useState)(""),x=Object(m.a)(F,2),W=x[0],B=x[1],I=Object(n.useState)(!1),T=Object(m.a)(I,2),Y=T[0],q=T[1],J=Object(n.useState)(!1),P=Object(m.a)(J,2),U=P[0],D=P[1],L=Object(i.g)().form_id,R=Object(i.f)(),A=function(e,t){var a=_[t];a.value=e,N([].concat(Object(u.a)(_.slice(0,t)),[a],Object(u.a)(_.slice(t+1)))),B("")};Object(n.useEffect)((function(){fetch("/api/getFormForDisplay/".concat(L)).then((function(e){if(200===e.status)return e.json().then((function(e){r(e.heading),k(e.description),N(e.questions),D(!0),document.title=e.heading?e.heading:"Form"}));R.push("/no-form")}))}),[L]);var H=C?o.a.createElement("p",null,C):"";return o.a.createElement("div",{className:"Container"},o.a.createElement("h1",null,a||"Loading..."),H,_.map((function(e,t){return o.a.createElement("div",{className:"UserInput",key:e.field},"title"===e.type||"text"===e.type?o.a.createElement(s.a,{fullWidth:!0,margin:"normal",onChange:function(e){return A(e.target.value,t)},value:e.value?e.value:"",label:(e.mandatory?"* ":" ")+e.question,variant:"outlined"}):"checkbox"===e.type?o.a.createElement(d.a,{control:o.a.createElement(f.a,{value:!!e.value&&e.value,onChange:function(e){return A(e.target.checked,t)},color:"secondary"}),label:(e.mandatory?"* ":" ")+e.question,labelPlacement:"start"}):"select"===e.type?o.a.createElement(b.a,{variant:"outlined"},o.a.createElement(h.a,{id:e.field+"-select-label"},(e.mandatory?"* ":" ")+e.question),o.a.createElement(E.a,{id:e.field+"-select",value:e.value?e.value:"",onChange:function(e){return A(e.target.value,t)}},o.a.createElement(p.a,{value:""},o.a.createElement("em",null,"None")),e.options.map((function(e){return o.a.createElement(p.a,{value:e},e)})))):"multi_select"===e.type?o.a.createElement(b.a,{variant:"outlined"},o.a.createElement(h.a,{id:e.field+"-multi-select-label"},(e.mandatory?"* ":" ")+e.question),o.a.createElement(E.a,{multiple:!0,id:e.field+"-multi-select",value:e.value?e.value:"",onChange:function(e){return A(e.target.value,t)},input:o.a.createElement(v.a,{id:e.field+"-multi-select-chip"}),renderValue:function(e){return o.a.createElement("div",{className:"chips"},e.map((function(e){return o.a.createElement(g.a,{key:e,label:e,className:"chip"})})))}},e.options.map((function(t){return o.a.createElement(p.a,{key:t,value:t},o.a.createElement(j.a,{checked:!!e.value&&e.value.indexOf(t)>-1}),o.a.createElement(O.a,{primary:t}))})))):"")})),o.a.createElement("br",null),o.a.createElement("div",{className:"UserInput"},U?o.a.createElement(y.a,{variant:"contained",color:"default",onClick:function(){return function(e){q(!0),B("");var t={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(_)};fetch("/api/submitToForm/".concat(L),t).then((function(t){200===t.status?e.push("/submitted",{form_id:L}):(q(!1),B("Could not submit form, check that all mandatory fields are included"))}))}(R)}},o.a.createElement("h2",null,Y?"Submitting...":"Submit")):"",o.a.createElement("p",null,W)))}}),o.a.createElement(i.a,{exact:!0,path:"/submitted",component:function(e){Object(n.useEffect)((function(){document.title="Response Submitted"}),[]);var t="/form/".concat(e.location.state.form_id);return o.a.createElement("div",{className:"Container"},o.a.createElement("h1",null,"Your response has been recorded."),o.a.createElement("p",null,o.a.createElement(c.b,{to:t},"Submit another response")))}}),o.a.createElement(i.a,{exact:!0,path:"/create",component:function(){var e=Object(n.useState)(""),t=Object(m.a)(e,2),a=t[0],r=t[1],l=Object(n.useState)(""),u=Object(m.a)(l,2),d=u[0],f=u[1],b=Object(n.useState)(""),h=Object(m.a)(b,2),E=h[0],p=h[1],v=Object(n.useState)(""),g=Object(m.a)(v,2),j=g[0],O=g[1],C=Object(n.useState)(""),k=Object(m.a)(C,2),w=k[0],S=k[1],_=Object(n.useState)(!1),N=Object(m.a)(_,2),F=N[0],x=N[1],W=Object(i.f)();return Object(n.useEffect)((function(){document.title="Create Form"}),[]),o.a.createElement("div",{className:"Container"},o.a.createElement("h1",null,"Create Form"),o.a.createElement("div",null,o.a.createElement("p",null,o.a.createElement(c.b,{target:"_blank",to:"/form/5ee8e0606b5647fed80c522f"},"If you don't have an account, join the waitlist to start creating your own forms as soon as possible")),o.a.createElement("p",null,o.a.createElement(c.b,{to:"/"},"Cancel and go back to home"))),o.a.createElement("div",null,o.a.createElement(s.a,{fullWidth:!0,margin:"normal",onChange:function(e){return t=e.target.value,f(t),void S("");var t},value:d,label:"* Username",variant:"outlined"})),o.a.createElement("div",null,o.a.createElement(s.a,{fullWidth:!0,margin:"normal",onChange:function(e){return t=e.target.value,p(t),void S("");var t},value:E,label:"* Password",type:"password",variant:"outlined"})),o.a.createElement("div",null,o.a.createElement(s.a,{fullWidth:!0,margin:"normal",onChange:function(e){return t=e.target.value,r(t),void S("");var t},value:a,label:"* Form Heading",variant:"outlined"})),o.a.createElement("div",null,o.a.createElement(s.a,{fullWidth:!0,margin:"normal",onChange:function(e){return t=e.target.value,O(t),void S("");var t},value:j,label:"* Link to Response DB",variant:"outlined"})),o.a.createElement("br",null),o.a.createElement("div",null,o.a.createElement(y.a,{variant:"contained",color:"default",onClick:function(){return function(e){x(!0),S("");var t={form_heading:a,user:d,pass:E,notion_db:j},n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)};fetch("/api/createForm",n).then((function(t){200===t.status?t.json().then((function(t){e.push("/created",{form_id:t.id,notion_db:j})})):401===t.status?(x(!1),S("Could not create form, username and password were not found. If you do not have a username and password, join the waitlist. Otherwise, try again or contact me if you're unable to use your account.")):(x(!1),S("Could not create form, check that all fields are included and links to notion are valid."))}))}(W)}},o.a.createElement("h2",null,F?"Creating...":"Create")),o.a.createElement("p",null,w)))}}),o.a.createElement(i.a,{exact:!0,path:"/created",component:function(e){var t=window.location.host,a=Object(n.useState)(""),r=Object(m.a)(a,2),l=r[0],i=r[1],u=Object(n.useState)(""),s=Object(m.a)(u,2),d=s[0],f=s[1],b=Object(n.useState)(""),h=Object(m.a)(b,2),E=h[0],p=h[1],v=Object(n.useState)(""),g=Object(m.a)(v,2),j=g[0],O=g[1],y=Object(n.useState)(!1),C=Object(m.a)(y,2),k=C[0],w=C[1];return Object(n.useEffect)((function(){document.title="Form Created",fetch("/api/getForm/".concat(e.location.state.form_id)).then((function(e){return e.json()})).then((function(t){f("".concat(t.forms_db)),p("".concat(t.fields_db)),O("".concat(e.location.state.notion_db)),i("/form/".concat(e.location.state.form_id)),w(!0)}))}),[e.location.state.form_id,e.location.state.notion_db]),o.a.createElement("div",{className:"Container"},o.a.createElement("h1",null,k?"Your form has been created":"Finishing up..."),k?o.a.createElement("div",null,o.a.createElement("p",null,"Your form is live at: ",o.a.createElement(c.b,{target:"_blank",to:l},t,l)),o.a.createElement("p",null,"Your form will send responses to: ",o.a.createElement("a",{target:"_blank",href:j},"this notion collection")),o.a.createElement("p",null,"You can edit your form using: ",o.a.createElement("a",{target:"_blank",href:d},"your forms notion collection")," and ",o.a.createElement("a",{target:"_blank",href:E},"your fields notion collection")),o.a.createElement("p",null,o.a.createElement(c.b,{to:"/"},"Back to home"))):"")}}),o.a.createElement(i.a,{exact:!0,path:"/about",component:function(){return o.a.createElement("div",{className:"Container"},o.a.createElement("h1",null,"Notion Forms"),o.a.createElement("p",null,"With Notion Forms, you can create and manage forms that submit responses directly into your Notion databases. You will be able to manage your forms using your own Notion databases."),o.a.createElement("p",null,o.a.createElement(c.b,{to:"/"},"Back to home")))}}),o.a.createElement(i.a,{exact:!0,path:"/no-form",component:function(){return o.a.createElement("div",{className:"Container"},o.a.createElement("h1",null,"Notion Forms"),o.a.createElement("p",null,"The form you're looking for wasn't found. If you are the owner of this form, check your forms database or contact us at notionforms@gmail.com to troubleshoot."),o.a.createElement("p",null,o.a.createElement(c.b,{to:"/"},"Back to home")))}})));l.a.render(C,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[69,1,2]]]);
//# sourceMappingURL=main.398cacd0.chunk.js.map