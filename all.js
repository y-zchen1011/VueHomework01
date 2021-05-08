let productData = [];
const btnAddProduct =document.getElementById('addProduct');
const btnClearAll =document.getElementById('clearAll');
const productStatus =document.getElementById('productList');
const productCount =document.getElementById('productCount');
const productTitle = document.getElementById('title');
const productPrice = document.getElementById('price');
const productOriginPrice = document.getElementById('origin_price');

btnAddProduct.addEventListener('click', () => {
    const timeStamp = Math.floor(Date.now());
    if (productTitle.value.trim() !== '') {
        productData.push({
            id: timeStamp,
            title: productTitle.value.trim(),
            origin_price: parseInt(productOriginPrice.value) || 0,
            price: parseInt(productPrice.value) || 0,
            is_enabled: false,
        })
        concatString(productData);
        productTitle.value = '';
        productOriginPrice.value = '';
        productPrice.value = '';
    }
});

btnClearAll.addEventListener('click', (e) => {
    e.preventDefault();
    productData = [];
    concatString(productData);
});

productStatus.addEventListener('click', (e) => {
    const action = e.target.dataset.action;
    const id = e.target.dataset.id;
    if (action === 'remove') {
        let newIndex = 0;
        productData.forEach((item, key) => {
            if (id == item.id) {
                newIndex = key;
            }
        })
        productData.splice(newIndex, 1);

    } else if (action === 'complete') {
        productData.forEach((item) => {
            if (id == item.id) {
                item.is_enabled = !item.is_enabled;
            }
        })
    }
    concatString(productData);
});


concatString(productData);


function concatString(array){
    let str = '';
    array.forEach((item) => {
        str += `
  <tr>
    <td>${item.title}</td>
    <td width="120">
      ${item.origin_price}
    </td>
    <td width="120">
      ${item.price}
    </td>
    <td width="100">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="is_enabled" ${item.is_enabled ? 'checked' : ''} data-action="complete" data-id="${item.id}">
        <label class="form-check-label" for="is_enabled">${item.is_enabled ? '啟用' : '未啟用'}</label>
      </div>
    </td>
    <td width="120">
      <button type="button" class="btn btn-sm btn-danger move" data-action="remove" data-id="${item.id}"> 刪除 </button>
    </td>
  </tr>`;
    })

    productList.innerHTML = str;
    productCount.textContent = productData.length;
}


