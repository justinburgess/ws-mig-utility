const connections = document.getElementById('connections');

connections.addEventListener('click', (event) => {
    const target = event.target;
    
    if (target.textContent === 'Delete Connection'){
        return deleteWorkspotConnection(target.name);
    }

    if (target.textContent === 'Dashboard'){
        console.log('dashboard clicked')
        return getWorkspotDashboard();
    }
});

async function getWorkspotDashboard() {
    await fetch('http://localhost:3000/workspot/connection/dashboard', {
        method: 'get',
        headers: { 'Content-Type': 'application/html' },
    })
}

function deleteWorkspotConnection (name) {
    fetch('http://localhost:3000/workspot/connection/delete', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name})
    })
        .then(res => {
        if (res.ok) return res.json()
        })
        .then(data => {
        window.location.reload()
        })
}