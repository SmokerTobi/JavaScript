function generateBill() {
    var customerName = document.getElementById('customer-name').value;
    
    if (customerName.trim() === "") {
        alert("Please enter Customer Name.");
        return;
    }

    var qtyLaptop = parseInt(document.getElementById('qty-laptop').value) || 0;
    var qtyMobile = parseInt(document.getElementById('qty-mobile').value) || 0;
    var qtyMouse = parseInt(document.getElementById('qty-mouse').value) || 0;
    var qtyKeypad = parseInt(document.getElementById('qty-keypad').value) || 0;
    
    var priceLaptop = 50000;
    var priceMobile = 20000;
    var priceMouse = 500;
    var priceKeypad = 1000;

    if (qtyLaptop === 0 && qtyMobile === 0 && qtyMouse === 0 && qtyKeypad === 0) {
        alert("Please select at least one item to buy.");
        document.getElementById('billSection').style.display = 'none';
        return;
    }

    var tbodyHtml = "";
    var totalAmount = 0;

    if (qtyLaptop > 0) {
        var cost = qtyLaptop * priceLaptop;
        totalAmount += cost;
        tbodyHtml += "<tr><td>Laptop (Qty: " + qtyLaptop + " @ " + priceLaptop + ")</td><td class='right'>" + cost + "</td></tr>";
    }

    if (qtyMobile > 0) {
        var cost = qtyMobile * priceMobile;
        totalAmount += cost;
        tbodyHtml += "<tr><td>Mobile (Qty: " + qtyMobile + " @ " + priceMobile + ")</td><td class='right'>" + cost + "</td></tr>";
    }

    if (qtyMouse > 0) {
        var cost = qtyMouse * priceMouse;
        totalAmount += cost;
        tbodyHtml += "<tr><td>Mouse (Qty: " + qtyMouse + " @ " + priceMouse + ")</td><td class='right'>" + cost + "</td></tr>";
    }

    if (qtyKeypad > 0) {
        var cost = qtyKeypad * priceKeypad;
        totalAmount += cost;
        tbodyHtml += "<tr><td>Keypad (Qty: " + qtyKeypad + " @ " + priceKeypad + ")</td><td class='right'>" + cost + "</td></tr>";
    }

    var gst = totalAmount * 0.18; // 18% GST
    var finalAmount = totalAmount + gst;

    document.getElementById('bill-customer-name').innerText = customerName;
    document.getElementById('billItemsBody').innerHTML = tbodyHtml;
    document.getElementById('totalAmt').innerText = totalAmount;
    document.getElementById('gstAmt').innerText = gst;
    document.getElementById('finalAmt').innerText = finalAmount;

    document.getElementById('billSection').style.display = 'block';
}
