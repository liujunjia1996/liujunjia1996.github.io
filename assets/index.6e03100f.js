const a=(e,n)=>window.fetch(e,n).then(t=>t.json()).then(t=>typeof t.data=="string"?JSON.parse(t.data):t.data),r=e=>a(e,{headers:{"Access-Token":"day5"}});export{r as f};
