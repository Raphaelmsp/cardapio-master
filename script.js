const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-modal-btn")
const clouseModalBtn = document.getElementById("clouse-modal-btn")
const cartCounter = document.getElementById("cart-count")
const nameInput = document.getElementById("nome")
const matrInput = document.getElementById("matr")
const nameWarn = document.getElementById("name-warn")
const matrWarn = document.getElementById("matr-warn")

let cart =[];

//abrir o modal da opção
cartBtn.addEventListener("click", function() {
  cartModal.style.display ="flex"
  UpdateCartModal();
})

//fechar o modal da opção clicar fora
cartModal.addEventListener("click", function(event) {
  if(event.target === cartModal){
  cartModal.style.display ="none"
  }
})

clouseModalBtn.addEventListener("click", function() {
  cartModal.style.display ="none"
})

menu.addEventListener("click", function(event) {
  //console.log(event.target)
  let parentButton = event.target.closest(".add-to-cart-btn")
  if(parentButton){
    const name = parentButton.getAttribute("data-name");
    addToCart(name)
  }
})

  //função para adicionar a opc
  function addToCart(name){
    existingItem = cart.find(item =>item.name === name);

    if(existingItem){
      // se o item ja existir apenas a quantida = 1.
      existingItem.quantity =1;
    }else{
      cart.push({
        name: name,
        quantity: 1,
      });
    }
    UpdateCartModal();
  }

  //atualiza pedido opção
  function UpdateCartModal(){
    let total = 0;
    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = "";
      
  } else {
      console.error("cartItemsContainer not found");
  }
  
  if (cartCounter) {
      cartCounter.innerHTML = cart.length;
  } else {
      console.error("cartCounter not found");
  }

    cart.forEach(item => {
      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

      cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
          <div>
            <p class="font-bold">${item.name}</p>
            
          </div>

            <button class="remove-cart-from-btn" data-name="${item.name}">
              Remover
            </button>
          
        </div>
      `
      total += item.quantity;

      cartItemsContainer.appendChild(cartItemElement);
    });
    
    cartCounter.innerHTML = cart.length;
    cartTotal.textContent = total;
    
  }

  //funcao para remover a opção
  cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains=("remove-cart-from-btn")){
      const name = event.target.getAttribute("data-name");
      removeItemCart(name);

    }
  })

function removeItemCart(name){
const index = cart.findIndex(item => item.name === name);
if(index !== -1)
  cart.splice(index, 1);
  cartModal.style.display ="none"
  UpdateCartModal();
  }
  
  nameInput.addEventListener("input", function(event){
    let inputValue = event.target.value;
    if(inputValue !== ""){
    nameInput.style.border = "";
    nameWarn.classList.add("hidden")
    }
  })

  matrInput.addEventListener("input", function(event){
    let inputValue = event.target.value;
    if(inputValue !== ""){
      matrInput.style.border = "";
      matrWarn.classList.add("hidden")
    }
  })
  //finalizar pedido opc
  checkoutBtn.addEventListener("click", function(){

    const isOpen = checkRestaurantOpen();
    if(!isOpen){
      Toastify({
        text: "Ops o restaurante está fechado!",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#ef4444",
          // background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
      return;
    }


    if(cart.length === 0) return;
    if(nameInput.value === ""){
      nameWarn.classList.remove("hidden")
      if(matrInput.value === ""){
        matrWarn.classList.remove("hidden")
      
      nameInput.style.border = "1px solid red"
      matrInput.style.border = "1px solid red"
      return;
    }}
    //envia pedido
    const cartItems = cart.map((item) =>{
      return(
        `${item.name}           `
      )
    }).join("                                                                                                      ")
    const menssage = encodeURIComponent(cartItems)
    const phone = "24992597690"

    window.open(`https://wa.me/${phone}?text=${menssage}                                                                            
      Nome: ${nameInput.value}                                           
      Matrícula: ${matrInput.value}`, "_blank");

    cart = [];
    UpdateCartModal();
  })


//vericar a hora e manipular o card horario
  function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >=6 && hora <9; //true
  }

  const spanItem = document.getElementById("date-span")
  const isOpen = checkRestaurantOpen();

  if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
  }else{
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500");
  }
