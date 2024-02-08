var DataFrame = dfjs.DataFrame

let div = document.querySelector('.div')
let input = div.querySelector('input');


div.addEventListener('mouseover',  (e) => {
    div.style.backgroundColor='#00ADB5'
    div.style.border='4px dotted #222831'
})
div.addEventListener('mouseout',  (e) => {
    div.style.backgroundColor=''
    div.style.border='2px dashed grey'
})
div.addEventListener('dragover',  (e) => {
    div.style.height= '450px'
    div.style.backgroundColor='#00ADB5'
    div.style.border='2px dashed #222831'
})

div.addEventListener('dragleave',  (e) => {
    div.style.height= '250px'
    div.style.backgroundColor=''
    div.style.border='2px dashed grey'
})

div.addEventListener('drop', (e) => {
    e.preventDefault();
    div.style.height= '250px'
    div.style.backgroundColor=''
    div.style.border='2px dashed grey'
    const archivo = e.dataTransfer.files
    if (archivo.length > 0){
        proccessFile(archivo[0])
    }
})

div.addEventListener('click', (e)=> {
    input.click()
    input.addEventListener('change', ()=> {
        proccessFile(input.files[0])
    })
})

function AddEventsOnContainer(){
    let grafica1 = document.getElementById('Grafica1')
    let grafica2 = document.getElementById('Grafica2')
    let grafica3 = document.getElementById('Grafica3')
    let grafica4 = document.getElementById('Grafica4')

    grafica1.addEventListener('mouseover', (e)=>{
        grafica1.style.backgroundColor="Turquoise"
        grafica1.style.border="1px solid  black"
    })
    grafica1.addEventListener('mouseout', (e)=>{
        grafica1.style.backgroundColor="aqua"
        grafica1.style.border=""
    })
    grafica1.addEventListener('click', (e)=>{
        window.location.href='#Graficas';
    })
    grafica2.addEventListener('mouseover', (e)=>{
        grafica2.style.backgroundColor="Turquoise"
        grafica2.style.border="1px solid  black"
    })
    grafica2.addEventListener('mouseout', (e)=>{
        grafica2.style.backgroundColor="aqua"
        grafica2.style.border=""
    })
    grafica2.addEventListener('click', (e)=>{
        window.location.href='#Tablas';
    })
    grafica3.addEventListener('mouseover', (e)=>{
        grafica3.style.backgroundColor="Turquoise"
        grafica3.style.border="1px solid  black"
    })
    grafica3.addEventListener('mouseout', (e)=>{
        grafica3.style.backgroundColor="aqua"
        grafica3.style.border=""
    })
    grafica3.addEventListener('click', (e)=>{
        window.location.href='#About_me';
    })
    grafica4.addEventListener('mouseover', (e)=>{
        grafica4.style.backgroundColor="Turquoise"
        grafica4.style.border="1px solid  black"

    })
    grafica4.addEventListener('mouseout', (e)=>{
        grafica4.style.backgroundColor="aqua"
        grafica4.style.border=""
    })
    grafica4.addEventListener('click', (e)=>{
        window.location.href='../index.html';
    })
    return
}

function proccessFile(file){
    AddEventsOnContainer()
    var lector = new FileReader()
    lector.readAsDataURL(file)
    lector.onload = (e) => {

        var contenido = e.target.result
        DataFrame.fromCSV(contenido)
        .then(df => {
            let df2=preprocessDF(df)
            let df3=roundDigitsDF(df2)
            columnas = df3.listColumns()
            valores = df3.toArray()
            const table = document.createElement("table")
            const headerRow = document.createElement("tr")
            columnas.forEach(column => {
                const th = document.createElement("th")
                th.textContent = column
                headerRow.appendChild(th)
            })
            table.appendChild(headerRow)
            valores.forEach(row => {
                const tr = document.createElement("tr")
                row.forEach(value => {
                    const td = document.createElement("td")
                    td.textContent = value
                    td.style.border="1px solid grey"
                    tr.style.border="1px solid grey"
                    tr.appendChild(td)
                })
                table.appendChild(tr)
            })
            table.style.border="1px solid grey"
            table.style.borderCollapse="collapse"
            document.getElementById('grafics').hidden=false
            document.getElementById('tabls').hidden=false
            document.getElementById('controlPanel').style.display="grid"
            document.getElementById("Graficas").style.display="flex"
            document.getElementById("Tablas").style.display="flex"
            document.getElementById("Tablas").appendChild(table)
        })
        
        .catch(err=>alert(err))
    }

}

function preprocessDF(df){
    const columns = ['VentasA', 'VentasB', 'VentasC', 'VentasD'];
    columns.forEach(column => {
        const meanValue = df.stat.mean(column);
        df = df.map(row => row.set(column, isNaN(row.get(column)) ? meanValue : row.get(column)));
    });
    let df2 = df.cast('Year',Number).cast('Month',String).cast('VentasA',Number).cast('VentasB',Number).cast('VentasC',Number).cast('VentasD',Number)
    return df2
}
function roundDigitsDF(df) {
    let ventasA = df.map(row => row.set('VentasA', parseFloat(row.get('VentasA').toFixed(2))));
    let ventasB = ventasA.map(row => row.set('VentasB', parseFloat(row.get('VentasB').toFixed(2))));
    let ventasC = ventasB.map(row => row.set('VentasC', parseFloat(row.get('VentasC').toFixed(2))));
    let ventasD = ventasC.map(row => row.set('VentasD', parseFloat(row.get('VentasD').toFixed(2))));

    return ventasD;
}

function groupedDF(df) {
    const ventasA = df.groupBy("Year").aggregate(group => group.stat.mean("VentasA")).rename("aggregation", "VentasA");
    const ventasB = df.groupBy("Year").aggregate(group => group.stat.mean("VentasB")).rename("aggregation", "VentasB");
    const ventasC = df.groupBy("Year").aggregate(group => group.stat.mean("VentasC")).rename("aggregation", "VentasC");
    const ventasD = df.groupBy("Year").aggregate(group => group.stat.mean("VentasD")).rename("aggregation", "VentasD");

    return ventasA.join(ventasB , ["Year"]).join(ventasC, ["Year"]).join(ventasD, ["Year"])

}

function getDateFromDF(df) {
    const meses = {
        "Enero": 0,
        "Febrero": 1,
        "Marzo": 2,
        "Abril": 3,
        "Mayo": 4,
        "Junio": 5,
        "Julio": 6,
        "Agosto": 7,
        "Septiembre": 8,
        "Octubre": 9,
        "Noviembre": 10,
        "Diciembre": 11
      };
    let anomes = df.select('Year', 'Month').toArray();
    let dates = anomes.map(row => {
        let ano = row[0];
        let mes = row[1];
        let numeromes = meses[mes];
        return new Date(ano, numeromes, 1);
    });

    return dates;
}