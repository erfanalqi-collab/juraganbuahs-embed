// Admin Panel Auto-Update + ImgBB Upload + GitHub Commit
const IMGBB_KEY = "f19b4d4478f7b71b34e870eacd7a857a";
const RAW = "https://raw.githubusercontent.com/erfanalqi-collab/juraganbuahs-embed/main/products.json";
const NETLIFY = "https://juraganbuah-admins.netlify.app/.netlify/functions/update-products";

async function uploadImg(file){
  const fd=new FormData(); fd.append("image",file);
  const r=await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`,{method:"POST",body:fd});
  const j=await r.json(); if(!j.success) throw new Error("Upload gagal");
  return j.data.url;
}

async function loadProducts(){
  const r=await fetch(RAW+"?t="+Date.now()); return await r.json();
}

async function saveProducts(arr,msg){
  const r=await fetch(NETLIFY,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({products:arr,message:msg})});
  const j=await r.json(); if(!r.ok) throw new Error(j.error); return j;
}

async function addProduct({name,price,stock,file,desc}){
  const url=file?await uploadImg(file):"";
  const products=await loadProducts();
  const id="p"+Date.now();
  products.unshift({
    id,name,
    price:String(price),
    priceNumber:Number(String(price).replace(/[^0-9]/g,"")),
    stockQty:Number(stock),
    img:url,
    description:desc||"",
    createdAt:new Date().toISOString()
  });
  await saveProducts(products,"Add "+name);
  alert("Berhasil");
}