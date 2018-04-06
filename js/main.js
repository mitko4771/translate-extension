window.onload = () => {
    let inputMain = document.getElementById('input');
    let dropdown = document.getElementById('dropdown');
    let btn = document.querySelector('button');

    inputMain.addEventListener('keyup', setText, true);

    function setText(e) {

        let inputText = document.querySelector('textarea').value;
        let isoCharCode = dropdown.options[dropdown.selectedIndex].value.toLowerCase();
        let url = 'https://testlngapi.herokuapp.com/translate?text=' + inputText + '&to=' + isoCharCode;

        let getJSON = (url) => {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open('get', url, true);
                xhr.responseType = 'json';
                xhr.onload = () => {
                    let status = xhr.status;
                    if (status >= 200 && status < 400) {
                        resolve(xhr.response);
                    } else {
                        reject(status);
                    }
                }
                
                xhr.send();
            });

        } // end of getJSON
    
        getJSON(url).then((data) => {
            let result = document.getElementById('result');
            result.innerText = data;
        }, (status) => {
            alert('Something went wrong.');
        });

    } // end of setText function


    let target = document.querySelector('textarea');
    itemsArray = new Array();

    target.addEventListener('change', () => {
        let val = document.querySelector('textarea').value;

        itemsArray.push(val);
        localStorage.setItem('items', JSON.stringify(itemsArray));
    });

    
} // end of window.onload
