function generateReceipt() {
    const form = document.getElementById("gadgetForm");
    let receiptData = [];
    let grandTotal = 0; // Initialize grand total

    // Prices for each item
    const prices = {
        "Apple Ipad Pro 2024": 5249.00,
        "Apple Ipad Air 2024": 3149.00,
        "Apple Ipad Mini 2022": 2699.00,
        "Apple Watch Series 9": 1899.00,
        "Apple Watch SE 2024": 1299.00,
        "Apple Watch Ultra": 3499.00,
        "Apple MacBook Pro 16": 10249.00,
        "Apple MacBook Air 2024": 8249.00,
        "Apple MacBook Pro 14": 9499.00
    };

    // Collecting form data
    const rows = form.getElementsByTagName('tr');
    for (let row of rows) {
        const inputs = row.getElementsByTagName('input');
        let itemSelected = false;
        let quantityValue = 0;
        let itemName = "";

        for (let input of inputs) {
            if (input.type === 'checkbox' && input.checked) {
                itemSelected = true;
                itemName = input.value;
            } else if (input.type === 'number') {
                quantityValue = input.value;
            }
        }

        if (itemSelected && parseInt(quantityValue) > 0) {
            let itemPrice = prices[itemName] * quantityValue;
            receiptData.push({ item: itemName, quantity: quantityValue, price: itemPrice });
            grandTotal += itemPrice; // Add to grand total
        }
    }

    // Generate receipt HTML
    let receiptHtml = "<h3>Order Summary</h3><ul>";
    receiptData.forEach(entry => {
        receiptHtml += `<li>${entry.item} - Quantity: ${entry.quantity} - Price: $${entry.price.toFixed(2)}</li>`;
    });
    receiptHtml += `</ul><h4>Grand Total: $${grandTotal.toFixed(2)}</h4>`;

    // Open a new window and write the receipt content
    const receiptWindow = window.open("", "Receipt", "width=600,height=400");
    receiptWindow.document.write(`
        <html>
            <head><title>Receipt</title></head>
            <body>${receiptHtml}</body>
        </html>
    `);
    receiptWindow.document.close();  // Close the document to complete the page loading
}
