'use strict'

let list = []
let table = document.getElementById('t')

getRichestList()

async function getRichestList() {
    let response = await fetch('https://forbes400.herokuapp.com/api/forbes400?limit=10')
    let json = await response.json()
    json.forEach(element => {
        let obj = {}
        obj.name = element.personName
        obj.rank = element.rank
        obj.country = element.countryOfCitizenship
        list.push(obj)
        list.sort(() => Math.random() - 0.5)
    });
    displayTheTable()
    makeDragAble()
    colorWrongRank()
}

function displayTheTable() {
    for (let i = 0; i < list.length; i++) {
        let tr = document.createElement('tr')
        tr.innerHTML = `<td>${i + 1}</td><td><span draggable="true" id="id${i}">${list[i].name}</span></td>`
        table.tBodies[0].append(tr)
    }
}

function makeDragAble() {
    let names = document.querySelectorAll('td > span')
    let tds = document.querySelectorAll('td:last-child')
    names.forEach(x => {
        x.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text', e.target.id)
        })
    })
    tds.forEach(x => {
        x.addEventListener('dragover', e => {
            e.preventDefault()
        })
    })
    tds.forEach(x => {
        x.addEventListener('drop', e => {
            let data = e.dataTransfer.getData('text')
            let draggedElem = document.getElementById(data)
            let targetParent = e.target.closest('td')
            draggedElem.parentElement.append(e.target.closest('td').firstElementChild)
            targetParent.append(draggedElem)
            colorWrongRank()
        })
    })
}

function colorWrongRank() {
    for (let row of table.rows) {
        if (+row.cells[0].innerText == list.filter(x => x.name == row.cells[1].innerText)[0].rank) {
            row.cells[1].style.color = 'green'
        } else {
            row.cells[1].style.color = 'red'

        }
    }
}
