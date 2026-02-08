document.addEventListener('DOMContentLoaded', () => {
    // 1. Get ID from URL or Global Variable
    const urlParams = new URLSearchParams(window.location.search);
    const receiptId = window.receiptId || urlParams.get('id') || '10'; // Prioritize global var, then URL, then default

    // 2. Fetch Data
    const data = receiptData[receiptId];

    if (!data) {
        document.body.innerHTML = '<h2 style="color:red; text-align:center;">Receipt not found!</h2>';
        return;
    }

    // 3. Render Header Info
    document.getElementById('store-name').textContent = data.storeName;
    document.getElementById('store-location').textContent = data.storeLocation;
    document.getElementById('customer-id').textContent = data.customerId;
    document.getElementById('transaction-date').textContent = data.transactionDate;

    // 4. Render Separators (Dynamic View)
    // Generating long strings to ensure they cover full width (CSS overflow:hidden will clip them)
    const doubleLine = "=".repeat(80);
    const dashedLine = "-".repeat(80);

    document.getElementById('sep-1').textContent = doubleLine;
    document.getElementById('sep-2').textContent = dashedLine;
    document.getElementById('sep-3').textContent = doubleLine;

    // 5. Render Items
    const itemsContainer = document.getElementById('items-container');
    itemsContainer.innerHTML = ''; // Clear items

    data.items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';

        itemDiv.innerHTML = `
            <div class="item-name">${item.name}</div>
            <div class="item-detail">
                <div class="detail-left">
                    <span>${item.qty}</span>
                    <span>${item.price}</span>
                    <span>=Rp</span>
                </div>
                <div class="detail-right">
                    <span>${item.total}</span>
                </div>
            </div>
        `;
        itemsContainer.appendChild(itemDiv);
    });

    // 6. Render Totals
    // Simple fields
    document.getElementById('total-qty').textContent = data.totals.qty;
    document.getElementById('total-amount').textContent = data.totals.total;

    // Potongan (Discount)
    document.getElementById('discount-amount').textContent = data.totals.discount;

    // Dynamic Payment Rows (Bayar, Kembali - or others if they exist)
    // In the template we have fixed rows for BAYAR and KEMBALI to match the style exactly.
    // If we wanted to be fully dynamic we could generate these rows too, 
    // but the template structure is rigid in the HTML.
    // For now we map the values directly.

    // Find BAYAR and KEMBALI in models if they exist, otherwise default logic
    const payRow = data.totals.models.find(m => m.label === 'BAYAR');
    const changeRow = data.totals.models.find(m => m.label === 'KEMBALI');

    if (payRow) {
        document.getElementById('paid-amount').textContent = payRow.val;
    }
    if (changeRow) {
        document.getElementById('change-amount').textContent = changeRow.val;
    }

    // 7. Render Footer
    document.getElementById('items-count').textContent = data.footer.itemsCount;
    document.getElementById('cashier-name').textContent = data.footer.cashierName;
});
