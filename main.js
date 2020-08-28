'use strict'
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

// let spans = document.querySelectorAll('span')
// spans.forEach(x => {
//     x.addEventListener('dragstart', e => {
//         // console.log(e.target.id);
//         e.dataTransfer.setData('text', e.target.id)
//     })
// })
// let boxes = document.querySelectorAll('.box')
// boxes.forEach(x => {
//     x.addEventListener('dragover', e => {
//         e.preventDefault()
//     })
// })
// boxes.forEach(x => {
//     x.addEventListener('drop', e => {
//         let data = e.dataTransfer.getData('text')
//         let draggedElem = document.getElementById(data)
//         let targetParent = e.target.closest('.box')
//         console.log(e.target.closest('.box').firstElementChild);
//         draggedElem.parentElement.append(e.target.closest('.box').firstElementChild)
//         targetParent.append(draggedElem)
//     })
// })

/*
function drop(e) {
    e.preventDefault()
    let data = e.dataTransfer.getData('text')
    console.log(data);
    e.target.append(document.getElementById(data))
}
function dragStart(e) {
    e.dataTransfer.setData('text', e.target.id)
}
*/




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
function colorWrongRank() {
    for (let row of table.rows) {
        if (+row.cells[0].innerText == list.filter(x => x.name == row.cells[1].innerText)[0].rank) {
            row.cells[1].style.color = 'green'
        } else {
            row.cells[1].style.color = 'red'

        }
    }
}
function displayTheTable() {
    for (let i = 0; i < 10; i++) { //list.length
        let tr = document.createElement('tr')
        tr.innerHTML = `<td>${i + 1}</td><td><span draggable="true" id="id${i}">${list[i].name}</span></td>`
        table.tBodies[0].append(tr)
    }
}


