let products=[], cart=JSON.parse(localStorage.getItem("cart")||"[]");
const modal=document.getElementById("modal"), content=document.getElementById("modalContent");
function saveCart(){localStorage.setItem("cart",JSON.stringify(cart));document.getElementById("cartCount").textContent=cart.length}
async function loadProducts(){products=await (await fetch("/api/products")).json();document.getElementById("productGrid").innerHTML=products.map(p=>`<div class="card"><img src="${p.image}"><div class="card-body"><span class="category">${p.category}</span><h3>${p.name}</h3><p class="price">₹${p.price}</p><button onclick="showProduct('${p._id}')">View Product</button></div></div>`).join("")}
function showProduct(id){let p=products.find(x=>x._id===id);content.innerHTML=`<img class="detail-img" src="${p.image}"><h2>${p.name}</h2><p>${p.description}</p><h3>₹${p.price}</h3><button class="primary" onclick="addCart('${p._id}')">Add to Cart</button>`;modal.style.display="flex"}
function addCart(id){cart.push(products.find(x=>x._id===id));saveCart();openCart()}
function openCart(){let total=cart.reduce((s,p)=>s+p.price,0);content.innerHTML=`<h2>Shopping Cart</h2>${cart.length?cart.map((p,i)=>`<div class="cart-item"><span>${p.name} — ₹${p.price}</span><button onclick="removeCart(${i})">Remove</button></div>`).join(""):"<p>Your cart is empty.</p>"}<h3>Total: ₹${total}</h3>${cart.length?'<button class="primary" onclick="placeOrder()">Place Order</button>':""}`;modal.style.display="flex"}
function removeCart(i){cart.splice(i,1);saveCart();openCart()}
function openAuth(){content.innerHTML=`<h2>User Account</h2><div class="tabs"><button onclick="loginForm()">Login</button><button onclick="registerForm()">Register</button></div><div id="authForm"></div>`;modal.style.display="flex";loginForm()}
function loginForm(){document.getElementById("authForm").innerHTML=`<div class="form"><input id="email" placeholder="Email"><input id="password" type="password" placeholder="Password"><button class="primary" onclick="login()">Login</button></div>`}
function registerForm(){document.getElementById("authForm").innerHTML=`<div class="form"><input id="name" placeholder="Name"><input id="email" placeholder="Email"><input id="password" type="password" placeholder="Password"><button class="primary" onclick="register()">Register</button></div>`}
async function request(url,options){let r=await fetch(url,options),d=await r.json();alert(d.message||"Done");return {r,d}}
async function register(){
  const userName = document.getElementById("name").value;
  const userEmail = document.getElementById("email").value;
  const userPassword = document.getElementById("password").value;

  await request("/api/auth/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: userName,
      email: userEmail,
      password: userPassword
    })
  });

  loginForm();
}
async function login(){let x=await request("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:email.value,password:password.value})});if(x.r.ok)closeModal()}
async function placeOrder(){let total=cart.reduce((s,p)=>s+p.price,0),x=await request("/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({items:cart,total})});if(x.r.ok){cart=[];saveCart();closeModal()}}
async function showOrders(){let r=await fetch("/api/orders"),d=await r.json();if(!r.ok){alert(d.message);return}content.innerHTML=`<h2>My Orders</h2>${d.length?d.map(o=>`<div class="cart-item"><span>${new Date(o.createdAt).toLocaleDateString()} • ${o.items.length} items</span><b>₹${o.total} • ${o.status}</b></div>`).join(""):"<p>No orders yet.</p>"}`;modal.style.display="flex"}
function closeModal(){modal.style.display="none"}modal.onclick=e=>{if(e.target===modal)closeModal()};saveCart();loadProducts();