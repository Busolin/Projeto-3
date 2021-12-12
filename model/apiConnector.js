/*//conecta a api sobre covid
const covidAPI = 'https://covid-api.mmediagroup.fr/v1/cases'
module.exports.getData = function (country) {
    fetch(covidAPI + '?country=' + inputSearch.value, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
            resp = data.All
        }).then(th => {
            try {
                document.querySelector('.table-resp').remove()
            } catch (er) {

            }
            try {
                respHTML = document.createElement('table')
                respHTML.innerHTML += '<tr><th>Total de contaminados</th><th>Recuperados</th><th>Mortos</th><th>População Total</th></tr>' + '<tr><th>' + resp.confirmed + '</th><th>' + resp.recoverd + '</th><th>' + resp.deaths + '</th><th>' + resp.population + '</th></tr>'
                respHTML.className = 'table-resp'
                document.querySelector('.search-container').append(respHTML)
            } catch (er) {
                alert('Pais não encontrado')
            }
        })
})
}*/