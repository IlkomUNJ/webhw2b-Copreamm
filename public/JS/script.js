const menuBtns = document.querySelectorAll('.menu-icon')
const navLists = document.querySelectorAll('.navbar-list')

menuBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    navLists[index].classList.toggle('active')

    const icon = btn.querySelector('i')
    if (icon.classList.contains('bi-list')) {
      icon.classList.replace('bi-list', 'bi-x')
    } else {
      icon.classList.replace('bi-x', 'bi-list')
    }
  })
})

function showWishlistNotification(productName) {
  const notificationContainer = document.createElement('div')
  notificationContainer.className = 'toast-notification wishlist-toast'
  notificationContainer.textContent = `${productName} ditambahkan ke Wishlist! ❤️`
  document.body.appendChild(notificationContainer)
  setTimeout(() => {
    notificationContainer.remove()
  }, 3000)
}

function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count')
  if (!cartCountElement) return

  // 🚨 DEFAULT HARUS '0'
  let count = parseInt(localStorage.getItem('cartCount') || '3')
  if (isNaN(count) || count < 0) count = 0

  cartCountElement.textContent = count
  localStorage.setItem('cartCount', count)
}

function addToCart(productName) {
  let count = parseInt(localStorage.getItem('cartCount') || '3')
  count += 1
  localStorage.setItem('cartCount', count)
  updateCartCount()
  showNotification(productName)
}

function updateWishlistCount() {
  const wishlistCountElement = document.getElementById('wishlist-count')
  if (!wishlistCountElement) return

  let count = parseInt(localStorage.getItem('wishlistCount') || '1')
  if (isNaN(count) || count < 0) count = 0

  wishlistCountElement.textContent = count
  localStorage.setItem('wishlistCount', count)
}

function addToWishlist(productName) {
  let count = parseInt(localStorage.getItem('wishlistCount') || '1')
  count += 1
  localStorage.setItem('wishlistCount', count)
  updateWishlistCount()

  if (typeof showWishlistNotification === 'function') {
    showWishlistNotification(productName)
  } else {
    console.log(`${productName} ditambahkan ke Wishlist!`)
  }
}

const productList = document.getElementById('product-list')

if (productList) {
  productList.addEventListener('click', function (event) {
    event.preventDefault()

    const cartButton = event.target.closest('.add-to-cart')
    const wishlistButton = event.target.closest('.add-to-wishlist')

    let productName = 'Produk'
    const clickedButton = cartButton || wishlistButton

    if (clickedButton) {
      const productBox = clickedButton.closest('.box-wrap')
      const productNameElement = productBox ? productBox.querySelector('h2') : null
      productName = productNameElement ? productNameElement.textContent.trim() : 'Produk'
    }

    if (cartButton) {
      addToCart(productName)
    } else if (wishlistButton) {
      addToWishlist(productName)
    }
  })
}

updateCartCount()
updateWishlistCount()

const products = [
  { name: 'Blue de Amoura', price: 650000, image: './Asset/EDT-Fixed.png' },
  { name: 'Amoura Valor', price: 800000, image: './Asset/EDP-Fixed.png' },
  { name: 'Amoura Noir', price: 750000, image: './Asset/EDP 3-Fixed.png' },
  { name: 'Amoura Gimber', price: 450000, image: './Asset/EDC 2-Fixed.png' },
  { name: 'Imperial Essence', price: 850000, image: './Asset/Extrait-Fixed.png' },
  { name: 'Noble Gentleman', price: 600000, image: './Asset/EDP 2-Fixed.png' },
]

function renderProducts(filteredProducts) {
  const productList = document.getElementById('product-list')
  productList.innerHTML = ''

  filteredProducts.forEach((product) => {
    const productItem = document.createElement('div')
    productItem.classList.add('box-wrap')
    productItem.innerHTML = `
      <a href="#" class="hover-container">
        <div class="box-image">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <h2>${product.name}</h2>
        <p>IDR ${product.price.toLocaleString()}</p>
      </a>
      <div class="btn-wrap">
        <a href="javascript:void(3)" class="btn btn-secondary add-to-cart">ADD TO CART</a>
        <a href="#" class="btn btn-primary">BUY NOW</a>
        <a href="javascript:void(1)" class="btn btn-secondary add-to-wishlist">
          <i class="bi bi-heart-fill"></i>
        </a>
      </div>
    `
    productList.appendChild(productItem)
  })
}

document.querySelector('.search-form').addEventListener('submit', function (event) {
  event.preventDefault()

  const query = document.getElementById('search-input').value.toLowerCase()
  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(query))

  renderProducts(filteredProducts)
})

renderProducts(products)
