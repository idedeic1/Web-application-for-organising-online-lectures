
let ucitavanjeGrupa = () =>{
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = () => {
        if(ajax.readyState == 4 && ajax.status == 200){
            let resData = JSON.parse(ajax.responseText)
            console.log(resData)
            const selectGrupa = document.getElementById('grupa');
            
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
    ajax.open("GET", "http://localhost:3000/v2/grupa", true);
    ajax.send();
}

ucitavanjeGrupa();

let dodavanjeStudenta = () => {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = () => {
        if(ajax.readyState == 4 && ajax.status == 200){
            let textArea = document.getElementById("txtArea");
            var odgovor = JSON.parse(ajax.responseText);
            var praviFormat = odgovor.message.toString().replace(",", "\n");
            textArea.value = praviFormat;
        }
        else if(ajax.readyState == 4 && ajax.status != 200){
            console.log("Greska " + ajax.readyState + ' ' + ajax.status);
        }
    }

    ajax.open("POST", "http://localhost:3000/v2/z2", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    const selectGrupa = document.getElementById("grupa");
    const grupaID = selectGrupa.options[selectGrupa.selectedIndex].value;
    const textAreaString = document.getElementById("txtArea").value.toString();

    ajax.send('textArea='+encodeURIComponent(textAreaString)+'&grupaID='+encodeURIComponent(grupaID));
}



