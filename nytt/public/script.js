document.getElementById('createButton').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/klick', {
            method: 'POST',
            body: JSON.stringify({ bok: 'test' }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            alert(response.json().message);
        } else {
            alert('Failed to create table');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while creating the table');
    }
});
document.getElementById('login').addEventListener('click', async () => {
    const passord = document.getElementById('passord').value;
    const brukernavn = document.getElementById('brukernavn').value;
    console.log(passord," ", brukernavn)

    fetch('/brukere', {
        method: 'GET',
        headers: {'passord': passord, 'brukernavn': brukernavn}   
    })
    .then(response => {return response.json()})
    .then(token => {
        localStorage.setItem('token', token)
    })
});