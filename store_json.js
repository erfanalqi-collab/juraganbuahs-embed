(function(){
  function el(t, c, h){ const e=document.createElement(t); if(c) e.className=c; if(h!==undefined) e.innerHTML=h; return e; }
  function currency(n){ return 'Rp '+Number(n||0).toLocaleString('id-ID'); }
  const root = document.getElementById('juraganbuah-store');
  if(!root){ console.error('juraganbuah-store div not found'); return; }

  const jsonUrl = root.dataset.json || 'products.json';
  root.innerHTML = '<div>Memuat produk (JSON)...</div>';

  fetch(jsonUrl).then(r=>{
    if(!r.ok) throw new Error('HTTP '+r.status);
    return r.json();
  }).then(products=>{
    if(!products || products.length===0){
      root.innerHTML='<p>Tidak ada produk.</p>';
      return;
    }

    root.innerHTML='';

    // FIX: gunakan let, bukan const
    let mode = root.dataset.mode || 'grid';
    const perrow = Number(root.dataset.perrow)||3;

    if(mode==='auto') {
      mode = (window.innerWidth<=640)?'tiktok':'grid';
    }

    if(mode==='grid'){
      const grid=document.createElement('div');
      grid.style.display='grid';
      grid.style.gridTemplateColumns='repeat('+perrow+',1fr)';
      grid.style.gap='12px';

      products.forEach(p=>{
        const card=el('div','jb-card',`
          <img src="${p.img||''}" style="width:100%;height:160px;object-fit:cover;border-radius:8px">
          <div style="font-weight:700;margin-top:8px">${p.name}</div>
          <div style="color:#e53e3e;font-weight:700">${p.price||''}</div>
        `);

        const footer=el('div','jb-foot');
        const wa = el('a','jb-wa','💬 Pesan via WhatsApp');
        wa.href = 'https://wa.me/6285736464806?text=Halo%20Admin%20Juragan%20Buah,%20Saya%20mau%20pesan:%20'+encodeURIComponent(p.name);
        wa.target='_blank';
        wa.style.display='inline-block';
        wa.style.background='#25D366';
        wa.style.color='#fff';
        wa.style.padding='8px';
        wa.style.borderRadius='8px';
        wa.style.textDecoration='none';

        footer.appendChild(wa);

        if((p.stockQty||0)<=0){
          const sold = el('span','soldout','Sold Out');
          sold.style.background='#e53e3e';
          sold.style.color='#fff';
          sold.style.padding='6px';
          sold.style.borderRadius='8px';
          sold.style.marginLeft='8px';
          footer.appendChild(sold);
        }

        card.appendChild(footer);
        grid.appendChild(card);
      });

      root.appendChild(grid);

    } else if(mode==='tiktok'){

      products.forEach(p=>{
        const c=el('div');
        c.style.marginBottom='18px';
        c.innerHTML = `
          <img src="${p.img||''}" style="width:100%;height:420px;object-fit:cover;border-radius:12px">
          <div style="font-weight:700;margin-top:8px">${p.name}</div>
          <div style="color:#e53e3e;font-weight:700">${p.price||''}</div>
        `;
        root.appendChild(c);
      });

    } else {

      products.forEach(p=>{
        const r=el('div');
        r.style.padding='10px';
        r.style.border='1px solid #eee';
        r.style.borderRadius='8px';
        r.innerHTML = `
          <div style="display:flex;gap:12px">
            <img src="${p.img||''}" style="width:120px;height:80px;object-fit:cover;border-radius:8px">
            <div>
              <div style="font-weight:800">${p.name}</div>
              <div style="color:#e53e3e">${p.price||''}</div>
            </div>
          </div>
        `;
        root.appendChild(r);
      });

    }

  }).catch(err=>{
    root.innerHTML = '<div style="color:red">Gagal memuat produk: '+err.message+'</div>';
    console.error(err);
  });

})();
