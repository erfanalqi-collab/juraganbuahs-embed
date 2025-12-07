(function(){
  function el(t,c,h){ const e=document.createElement(t); if(c) e.className=c; if(h!==undefined) e.innerHTML=h; return e; }
  function currency(n){ return 'Rp '+Number(n||0).toLocaleString('id-ID'); }
  const root = document.getElementById('juraganbuah-store');
  if(!root){ console.error('juraganbuah-store div not found'); return; }
  const jsonUrl = root.dataset.json || 'products.json';
  root.innerHTML = '<div>Memuat produk...</div>';

  const modal = el('div','jb-modal'); 
  Object.assign(modal.style,{position:'fixed',left:0,top:0,right:0,bottom:0,display:'none',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,0.5)',zIndex:9999});
  const modalContent = el('div','jb-modal-content');
  Object.assign(modalContent.style,{background:'#fff',padding:'20px',borderRadius:'12px',maxWidth:'720px',width:'95%'});
  modal.appendChild(modalContent); document.body.appendChild(modal);
  modal.addEventListener('click',e=>{ if(e.target===modal) modal.style.display='none'; });

  function openDetail(p){
    modalContent.innerHTML='';
    modalContent.innerHTML+=`<img src="${p.img||''}" style="width:100%;border-radius:8px">`;
    modalContent.innerHTML+=`<h2>${p.name}</h2>`;
    modalContent.innerHTML+=`<div style="color:#e53e3e;font-weight:700">${currency(p.priceNumber||p.price)}</div>`;
    modalContent.innerHTML+=`<div>Stok: ${p.stockQty||0}</div>`;
    modalContent.innerHTML+=`<p>${p.description||''}</p>`;
    modalContent.innerHTML+=`<a target="_blank" href="https://wa.me/6285736464806?text=Halo,%20saya%20mau%20${encodeURIComponent(p.name)}" style="display:inline-block;margin-top:10px;background:#25D366;color:#fff;padding:10px 14px;border-radius:8px;text-decoration:none">💬 Pesan via WA</a>`;
    modal.style.display='flex';
  }

  fetch(jsonUrl).then(r=>r.json()).then(products=>{
    if(!products.length){ root.innerHTML='Tidak ada produk'; return; }
    root.innerHTML='';
    products.forEach(p=>{
      const card = el('div','',`
        <img src="${p.img||''}" style="width:100%;border-radius:8px">
        <div style="font-weight:700;margin-top:8px">${p.name}</div>
        <div style="color:#e53e3e;font-weight:700">${currency(p.priceNumber||p.price)}</div>
      `);
      card.style.padding='12px'; card.style.borderRadius='10px'; card.style.background='#fff'; card.style.marginBottom='12px';
      card.addEventListener('click',()=>openDetail(p));
      root.appendChild(card);
    });
  }).catch(err=>{
    root.innerHTML='<div style="color:red">'+err.message+'</div>';
  });
})();