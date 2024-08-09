import{_ as C,g as $,h as E,o as L,c as x,p as w,i as b,d as g,F as U,f as y,b as S,w as F,e as d,j as v,k}from"./index-DWFmOphp.js";import{a as O}from"./axios-Cm0UX6qg.js";const B=s=>s>=1024*1024*1024?(s/(1024*1024*1024)).toFixed(2)+"G":s>=1024*1024?(s/(1024*1024)).toFixed(2)+"M":s>=1024?(s/1024).toFixed(2)+"K":s+"B",A=s=>(w("data-v-254a7378"),s=s(),b(),s),P=A(()=>g("span",null,"拖拽文件到此处上传",-1)),G=[P],I={__name:"DragUpLoadFiles",emits:["getFilesList"],setup(s,{emit:n}){const r=n,o=$(null),_=async a=>{if(a.isDirectory){const i=a.createReader(),f=await new Promise((e,t)=>{i.readEntries(e,t)});let u=[];for(const e of f){const t=await _(e);u=u.concat(t)}return u}else return[await new Promise((f,u)=>{a.file(f,u)})]},p=async a=>{const i=[];for(const e of a){const t=e.webkitGetAsEntry();i.push(_(t))}const u=(await Promise.all(i)).flat();r("getFilesList",u)};return E(()=>{o.value.addEventListener("dragover",a=>{a.preventDefault(),o.value.style.opacity="0.5"}),o.value.addEventListener("dragleave",a=>{a.preventDefault(),o.value.style.opacity="1"}),o.value.addEventListener("drop",a=>{a.preventDefault(),o.value.style.opacity="1",p(a.dataTransfer.items)})}),(a,i)=>(L(),x("div",{class:"dragContainer",ref_key:"dragContainer",ref:o},G,512))}},R=C(I,[["__scopeId","data-v-254a7378"]]),T=s=>(w("data-v-32c40b8f"),s=s(),b(),s),V=T(()=>g("div",{style:{display:"flex"}},[g("label",{for:"uploadFiles",class:"uploadFiles"},[g("span",null,"上传文件")]),g("label",{for:"uploadFolder",class:"uploadFolder"},[g("span",null,"上传文件夹")])],-1)),j={__name:"UpLoadFiles",emits:["getFilesList"],setup(s,{emit:n}){const r=n,o=p=>{const a=p.target.files;r("getFilesList",a)},_=p=>{const a=p.target.files;r("getFilesList",a)};return(p,a)=>(L(),x(U,null,[V,g("input",{type:"file",id:"uploadFiles",multiple:"",onChange:o},null,32),g("input",{type:"file",id:"uploadFolder",webkitdirectory:"",mozdirectory:"",odirectory:"",onChange:_},null,32)],64))}},q=C(j,[["__scopeId","data-v-32c40b8f"]]),M={__name:"UpLoadList",props:{list:{type:Array,default:()=>[]}},emits:["pauseFileUpLoad","runOnFileUpLoad"],setup(s,{emit:n}){const r=n,o=p=>{r("pauseFileUpLoad",p)},_=p=>{r("runOnFileUpLoad",p)};return(p,a)=>{const i=y("a-table-column"),f=y("a-progress"),u=y("a-button"),e=y("a-table");return L(),S(e,{data:s.list,"show-empty-tree":"",style:{"margin-top":"20px","margin-bottom":"20px"},pagination:{pageSize:10}},{columns:F(()=>[d(i,{title:"序号","data-index":"key"}),d(i,{title:"文件名",ellipsis:!0,"data-index":"name"}),d(i,{title:"文件大小","data-index":"size"}),d(i,{title:"文件类型","data-index":"type"}),d(i,{title:"上传进度"},{cell:F(({record:t})=>[d(f,{type:"circle",size:"small",percent:t.progress},null,8,["percent"])]),_:1}),d(i,{title:"操作设置"},{cell:F(({record:t})=>[d(u,{type:"primary",status:"warning",size:"mini",onClick:c=>o(t.key)},{default:F(()=>[v("暂停上传")]),_:2},1032,["onClick"]),d(u,{type:"primary",status:"success",size:"mini",onClick:c=>_(t.key)},{default:F(()=>[v("继续上传")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])}}},D=O.create({baseURL:"http://localhost:3000"}),J=(s,n,r=o=>o)=>D({url:"/upload",method:"post",data:s,headers:{"Content-Type":"multipart/form-data"},signal:n,onUploadProgress:r}).catch(o=>{console.log("Request canceled",o.message)}),K=s=>D({url:"/merge",method:"post",data:JSON.stringify(s)}),W={__name:"index",setup(s){const n=k([]),r=k({}),o=e=>{const t=Array.from(e).filter(l=>l.name!==".DS_Store"),c=new AbortController;t.forEach(l=>{const m=_(l);r[n.length]=m;const h=l.name.split(".");n.push({key:n.length,name:h[0],type:h[h.length-1],size:B(l.size),progress:0,file:l,controller:c,signal:c.signal})})},_=(e,t=1*1024*1024)=>{const c=[];let l=0,m=0;for(;l<e.size;)c.push({file:e.slice(l,l+t),chunkName:`${e.name}-${m}`,fileName:e.name}),l+=t,m++;return c},p=()=>{for(const e in r)a(r[e]).forEach((c,l)=>{J(c,n[e].signal,i(r[e][l],e,r[e].length))})},a=e=>e.map(({file:t,fileName:c,chunkName:l})=>{const m=new FormData;return m.append("file",t),m.append("fileName",c),m.append("chunkName",l),m}),i=(e,t,c)=>l=>{const m=l.loaded/l.total,h=1/c;if(e.progress=Number(m.toFixed(2)),e.progress===1){let N=n[t].progress+h;n[t].progress=Number(N.toFixed(2)),r[t].find(z=>z.progress!==1)||(n[t].progress=1,K({fileName:n[t].file.name,size:1*1024*1024}))}},f=e=>{n[e].controller.abort()},u=e=>{};return(e,t)=>{const c=y("a-button");return L(),x(U,null,[d(R,{onGetFilesList:o}),d(q,{onGetFilesList:o}),d(M,{list:n,onPauseFileUpLoad:f,onRunOnFileUpLoad:u},null,8,["list"]),d(c,{type:"primary",status:"success",onClick:p},{default:F(()=>[v("开始上传")]),_:1})],64)}}};export{W as default};
