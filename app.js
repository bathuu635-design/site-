const DEFAULT_PRODUCTS = [
  {id:'BO-001',name:'Зөөлөн Bunny комбинзон',price:59000,category:'Babies',rating:5,image:'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=700&q=80'},
  {id:'BO-002',name:'Pastel Pink даашинз',price:69000,category:'Girls',rating:5,image:'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=700&q=80'},
  {id:'BO-003',name:'Mini Bear футболк',price:45000,category:'Boys',rating:4,image:'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=700&q=80'},
  {id:'BO-004',name:'Little Cloud пүүз',price:79000,category:'Shoes',rating:5,image:'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=700&q=80'},
  {id:'BO-005',name:'Cotton Bunny сет',price:75000,category:'Babies',rating:5,image:'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=700&q=80'},
  {id:'BO-006',name:'Sunny Day цамц',price:49000,category:'Girls',rating:4,image:'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=700&q=80'},
  {id:'BO-007',name:'Tiny Explorer hoodie',price:65000,category:'Boys',rating:5,image:'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=700&q=80'},
  {id:'BO-008',name:'Mini Bow аксессуар',price:19000,category:'Shoes',rating:5,image:'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=700&q=80'}
];
const PRODUCTS_KEY='littlebo_products_v1';
const CART_KEY='littlebo_cart_v1';
const products=JSON.parse(localStorage.getItem(PRODUCTS_KEY)||'null')||DEFAULT_PRODUCTS;
let cart=JSON.parse(localStorage.getItem(CART_KEY)||'[]');
let activeCategory='';
const PAGE_LINK='https://www.facebook.com/share/18eMwyRdEL/';
const money=n=>new Intl.NumberFormat('mn-MN').format(n)+'₮';
function save(){localStorage.setItem(PRODUCTS_KEY,JSON.stringify(products));localStorage.setItem(CART_KEY,JSON.stringify(cart));}
function stars(n){return '★'.repeat(n)+'☆'.repeat(5-n)}
function renderProducts(list=products){const grid=document.getElementById('productGrid');grid.innerHTML=list.length?list.map(p=>`<article class="product-card bg-white rounded-3xl overflow-hidden border border-pink-50"><div class="relative overflow-hidden bg-slate-100"><img src="${p.image}" alt="${p.name}" class="w-full aspect-square object-cover"><button onclick="addWish('${p.id}')" class="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90">♡</button></div><div class="p-4"><p class="text-xs font-black text-pink-400">${p.id}</p><h3 class="font-black mt-1 min-h-12">${p.name}</h3><div class="text-amber-400 text-sm mt-2">${stars(p.rating)}</div><div class="flex items-center justify-between mt-3"><b class="text-lg text-[#65505a]">${money(p.price)}</b><button onclick="addCart('${p.id}')" class="px-3 py-2 rounded-full bg-[#ffe1eb] text-pink-600 font-black text-xs">Сагсанд +</button></div><button onclick="orderProduct('${p.id}')" class="w-full mt-3 py-2.5 rounded-full bg-[#65505a] text-white font-black text-sm">Захиалах 💬</button></div></article>`).join(''):'<p class="col-span-full text-center py-10 text-slate-500">Бараа олдсонгүй.</p>';}
function addCart(id){const p=products.find(x=>x.id===id);if(!p)return;const item=cart.find(x=>x.id===id);item?item.qty++:cart.push({id,qty:1});save();renderCart();toast('Сагсанд нэмэгдлээ 🛒')}
function renderCart(){document.getElementById('cartCount').textContent=cart.reduce((s,x)=>s+x.qty,0);const box=document.getElementById('cartItems');if(!cart.length){box.innerHTML='<p class="text-slate-500 text-center py-10">Сагс хоосон байна.</p>';document.getElementById('cartTotal').textContent='0₮';return}let total=0;box.innerHTML=cart.map(x=>{const p=products.find(q=>q.id===x.id);if(!p)return '';total+=p.price*x.qty;return `<div class="flex gap-3 items-center"><img src="${p.image}" class="w-16 h-16 rounded-2xl object-cover"><div class="flex-1"><b>${p.name}</b><p class="text-sm">${money(p.price)} × ${x.qty}</p></div><button onclick="removeCart('${p.id}')" class="text-red-400">Устгах</button></div>`}).join('');document.getElementById('cartTotal').textContent=money(total)}
function removeCart(id){cart=cart.filter(x=>x.id!==id);save();renderCart()}
function orderText(items){return `Сайн байна уу, Little BO kids store!\nЗахиалга өгөх хүсэлтэй байна:\n\n${items.map(x=>`• ${x.name} | Код: ${x.id} | Үнэ: ${money(x.price)}${x.qty?' | Тоо: '+x.qty:''}`).join('\n')}\n\nНэр/утас/хаягаа илгээнэ үү.`}
function orderProduct(id){const p=products.find(x=>x.id===id);if(!p)return;const text=orderText([{...p,qty:1}]);navigator.clipboard?.writeText(text).catch(()=>{});window.open(PAGE_LINK,'_blank','noopener');toast('Захиалгын мэдээллийг хууллаа. Messenger чатанд paste хийнэ үү 💬')}
function orderCart(){const items=cart.map(x=>{const p=products.find(q=>q.id===x.id);return {...p,qty:x.qty}}).filter(Boolean);if(!items.length)return toast('Сагс хоосон байна');const text=orderText(items);navigator.clipboard?.writeText(text).catch(()=>{});window.open(PAGE_LINK,'_blank','noopener');toast('Захиалгын мэдээллийг хууллаа. Messenger чатанд paste хийнэ үү 💬')}
function toast(t){const e=document.getElementById('toast');e.textContent=t;e.classList.remove('hidden');clearTimeout(window._toast);window._toast=setTimeout(()=>e.classList.add('hidden'),3000)}
function addWish(id){const p=products.find(x=>x.id===id);if(p)toast(`${p.name} wishlist-д нэмэгдлээ ♡`)}
document.getElementById('cartBtn').onclick=()=>{document.getElementById('cartModal').classList.remove('hidden');renderCart()};document.getElementById('closeCart').onclick=()=>document.getElementById('cartModal').classList.add('hidden');document.getElementById('orderCart').onclick=orderCart;document.getElementById('clearFilter').onclick=()=>{activeCategory='';renderProducts()};
document.querySelectorAll('.category-card').forEach(b=>b.onclick=()=>{activeCategory=b.dataset.category;renderProducts(products.filter(p=>p.category===activeCategory));document.getElementById('products').scrollIntoView({behavior:'smooth'})});
document.getElementById('searchInput').addEventListener('input',e=>{const q=e.target.value.toLowerCase();renderProducts(products.filter(p=>(p.name+p.id+p.category).toLowerCase().includes(q)&&(activeCategory?p.category===activeCategory:true)))});
document.getElementById('newsletter').onsubmit=e=>{e.preventDefault();toast('Бүртгэл амжилттай! 💌');e.target.reset()};
renderProducts();renderCart();save();
