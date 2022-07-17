const poolTable = document.getElementById('pool-table');

// helper functions
async function getSelectedDesktops (poolName) {
    fetch('http://localhost:3000/workspot/dashboard/desktops', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:`poolName=${poolName}`,
    })
        .then(res => {
        if (res.ok) return res.json()
        })
        .then(data => {
        window.location.reload()
        })
}

// event listeners
poolTable.addEventListener('change', (event) => {
    const target = event.target;
    if (target.className.includes('select-pool')) {
        const poolName = target.parentElement
                            .parentElement
                            .nextElementSibling
                            .textContent;
        return getSelectedDesktops(poolName);
    }
});