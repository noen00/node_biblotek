document.getElementById('createButton').addEventListener('click', async () => {
    try {
        const boknav = document.getElementById('boknav').value;
        console.log(boknav);
        const token = localStorage.getItem('token')

        fetch('/api/klick', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'boknav': boknav,
                'authorization': `${token}`
            },
        })
		.then(response => response.json)


        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        //alert(data.message);

    } catch (error) {
        //console.error('Error:', error);
        //alert('An error occurred while creating the table');
    }
});


document.getElementById('login').addEventListener('click', async () => {
    const passord = document.getElementById('passord').value;
    const brukernavn = document.getElementById('brukernavn').value;
    console.log(passord," ", brukernavn)

    fetch('/brukere', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },          
        body: JSON.stringify({'passord': passord, 'brukernavn': brukernavn})
    })
    .then(response => {return response.json()})
    .then(token => {
        localStorage.setItem('token', token)
        
    })
});
