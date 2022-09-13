import cofeeDetails from "./data.js";

let tableRow = document.getElementById("table-row");
let formSubmit = document.getElementById("formSubmit");
let receipt = document.getElementById("receipt");

let orders = [];

function getCofeePrice(cofeeType, addOn, quantity) {
  for (let i = 0; i < cofeeDetails.length; i++) {
    let element = cofeeDetails[i];
    if (element.cofeeType === cofeeType) {
      if (addOn === "milk") {
        return element.price.Milk * quantity;
      } else if (addOn === "cream") {
        return element.price.Cream * quantity;
      } else {
        return element.price.Latte * quantity;
      }
    }
  }
}

function getTotal() {
  let total = 0;
  for (let i = 0; i < orders.length; i++) {
    let element = orders[i];
    total += element.price;
  }
  return total;
}

for (let i = 0; i < cofeeDetails.length; i++) {
  let element = cofeeDetails[i];
  let row = ` <tr id="table-row">
          <td class="text-center border-b-2">${element.cofeeType}</td>
          <td class="text-center border-b-2 border-l-2">${element.price.Milk}</td>
          <td class="text-center border-b-2 border-l-2">${element.price.Cream}</td>
          <td class="text-center border-b-2 border-l-2">${element.price.Latte}</td>
        </tr>`;
  tableRow.innerHTML += row;
}

formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
  let cofeeType = document.getElementById("cofeeType").value;
  let addOn = document.getElementById("addOn").value;
  let quantity = document.getElementById("qty").value;
  console.log(cofeeType);
  console.log(addOn);
  console.log(quantity);
  let productObj = {
    cofeeType: cofeeType,
    addOn: addOn,
    quantity: quantity,
    price: getCofeePrice(cofeeType, addOn, quantity),
  };
  orders.push(productObj);
  console.log(orders);
  alert("Product Successfully added!");
  let getReceipt = `<input
            class="bg-gray-400 rounded p-1 px-2 text-white mt-2 cursor-pointer select-none"
            type="button"
            value="Show Receipt"
          />`;
  receipt.innerHTML = getReceipt;
});

receipt.addEventListener("click", (e) => {
  e.preventDefault();
  let viewReceipt = document.getElementById("view-receipt");
  viewReceipt.className = "block";
  let receiptTable = document.getElementById("receiptTable");
  let data = orders.map((order) => {
    return `<tr>
              <td class="text-center">${order.cofeeType}</td>
              <td class="text-center">${order.addOn}</td>
              <td class="text-center">${order.quantity}</td>
              <td class="text-center">${order.price}</td>
            </tr>`;
  });
  let firstChild = `<tr class="bg-black text-white">
              <th>CofeeType</th>
              <th>Add-On</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>`;
  let lastChild = `<tr class="bg-red-400 text-white">
              <th></th>
              <th></th>
              <th>Total</th>
              <th>${getTotal()}</th>
            </tr>`;
  data = [firstChild, ...data, lastChild];
  receiptTable.innerHTML = data;
});
