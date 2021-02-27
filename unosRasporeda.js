let ucitavanjeDana = () =>{
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = () => {
        if(ajax.readyState == 4 && ajax.status == 200){
            let resData = JSON.parse(ajax.responseText)
            console.log(resData)
            const selectGrupa = document.getElementById('danSedmice');
            
            for(let i = 0; i < resData.length ; i++){
                var opcija = document.createElement("option");
                opcija.text = resData[i].naziv;
                selectGrupa.add(opcija);    
            }
        }
        else if(ajax.readyState == 4 && ajax.status != 200){
            console.log("Greska " + ajax.readyState + ' ' + ajax.status);
        }

    }
    ajax.open("GET", "http://localhost:3000/v2/dan", true);
    ajax.send();
}

let ucitavanjeTipa = () =>{
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = () => {
        if(ajax.readyState == 4 && ajax.status == 200){
            let resData = JSON.parse(ajax.responseText)
            console.log(resData)
            const selectGrupa = document.getElementById('tipNastave');
            
            for(let i = 0; i < resData.length ; i++){
                var opcija = document.createElement("option");
                opcija.text = resData[i].naziv;
                selectGrupa.add(opcija);    
            }
        }
        else if(ajax.readyState == 4 && ajax.status != 200){
            console.log("Greska " + ajax.readyState + ' ' + ajax.status);
        }

    }
    ajax.open("GET", "http://localhost:3000/v2/tip", true);
    ajax.send();
}

let ucitavanjePredmeta = () =>{
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = () => {
        if(ajax.readyState == 4 && ajax.status == 200){
            let resData = JSON.parse(ajax.responseText)
            console.log(resData)
            const ul = document.getElementById('predmeti');
            
            for(let i = 0; i < resData.length ; i++){
                let li = document.createElement('li')
                let naziv = document.createElement('p')
                naziv.textContent = resData[i].naziv

                li.appendChild(naziv)
                ul.appendChild(li)
            }
        }
        else if(ajax.readyState == 4 && ajax.status != 200){
            console.log("Greska " + ajax.readyState + ' ' + ajax.status);
        }

    }
    ajax.open("GET", "http://localhost:3000/v2/predmet", true);
    ajax.send();
}

let ucitavanjeAktivnosti = () =>{
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = () => {
        if(ajax.readyState == 4 && ajax.status == 200){
            let resData = JSON.parse(ajax.responseText)
            console.log(resData)
            const ul = document.getElementById('aktivnosti');
            
            for(let i = 0; i < resData.length ; i++){
                let li = document.createElement('li')

                let pNaziv = document.createElement('p')
                pNaziv.textContent = resData[i].naziv
            
                li.appendChild(pNaziv)
                ul.appendChild(li)
            }
        }
        else if(ajax.readyState == 4 && ajax.status != 200){
            console.log("Greska " + ajax.readyState + ' ' + ajax.status);
        }

    }
    ajax.open("GET", "http://localhost:3000/v2/aktivnost", true);
    ajax.send();
}


let dodavanjeAktivnosti = () => {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = () => {
        if (ajax.readyState === 4 && ajax.status === 200) {
            let resData = JSON.parse(ajax.responseText);
            console.log(resData);
        }
        else if (ajax.readyState === 4 && ajax.status !== 200){
            console.log('Greška: ' + ajax.readyState + ' ' + ajax.status);
        }

    }

    ajax.open("POST", "http://localhost:3000/aktivnost", true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    const nazivAktivnosti = document.getElementById('nazivAktivnosti').value;
    
    const izbor1 = document.getElementById('tipNastave');
    const tip = izbor1.options[izbor1.selectedIndex].text;
    
    const vrijemePocetka = document.getElementById('vrijemePocetka').value;
    const vrijemeKraj = document.getElementById('vrijemeKraja').value;
    
    const izbor2 = document.getElementById('danSedmice');
    const dan = izbor2.options[izbor2.selectedIndex].text;
    
    ajax.send('naziv=' + encodeURIComponent(nazivAktivnosti) + '&tip=' + encodeURIComponent(tip) + '&pocetak=' + encodeURIComponent(vrijemePocetka) +
        '&kraj=' + encodeURIComponent(vrijemeKraj) + '&dan=' + encodeURIComponent(dan));

}

ucitavanjeDana();
ucitavanjeTipa();
ucitavanjePredmeta();
ucitavanjeAktivnosti();