const url = 'http://localhost:3000/ramens'
const menu = document.querySelector('#ramen-menu')
const form = document.querySelector('#new-ramen')
const editForm = document.querySelector('#edit-ramen')

const detailImg = document.querySelector('.detail-image')
const rName = document.querySelector('.name')
const restaurant = document.querySelector('.restaurant')
const rRating = document.querySelector('#rating-display')
const rComment = document.querySelector('#comment-display')
let currentRamen = -1


function fetchAll()
{
    fetch(url)
        .then(function (res)
        {
            return res.json()
        })
        .then(function (data)
        {
            console.log(data)
            currentRamen = data[0].id
            console.log(currentRamen)
            data.map(function (ramenData)
            {
                console.log(ramenData)
                renderData(ramenData)

            })
        })
}

function renderData(ramenData)
{
    const div = document.createElement('div')
    const img = document.createElement('img')
    const h2 = document.createElement('h2')
    const h3 = document.createElement('h3')
    const btn = document.createElement('button')

    img.src = ramenData.image
    img.className = 'detail-image'
    img.id = ramenData.id
    h2.innerText = ramenData.name
    h2.className = 'name'
    h3.innerText = ramenData.restaurant
    h3.className = 'restaurant'
    btn.innerText = 'delete'
    btn.id = ramenData.id

    detailImg.src = ramenData.image
    rName.innerText = ramenData.name
    restaurant.innerText = ramenData.restaurant
    rRating.innerText = ramenData.rating
    rComment.innerText = ramenData.comment

    div.append(img)
    // div.append(h2)
    // div.append(h3)
    div.append(btn)

    menu.append(div)

    img.addEventListener('click', function (evt)
    {
        console.log(evt.target)
        console.log(evt.target.id)
        detailImg.src = ramenData.image
        rName.innerText = ramenData.name
        restaurant.innerText = ramenData.restaurant
        rRating.innerText = ramenData.rating
        rComment.innerText = ramenData.comment
        currentRamen = ramenData.id
        console.log(currentRamen)
    })

    btn.addEventListener('click', function (evt)
    {
        evt.preventDefault()
        btnId = evt.target.id
        evt.target.parentNode.remove();
        fetch(`${url}/${btnId}`, {
            method: 'DELETE'
        })
            .then(function (res)
            {
                return res.json()
            })
            .then(function (data)
            {
                console.log(data)
            })
    })
}

function submitForm(evt)
{
    evt.preventDefault()

    let formData = {
        name: evt.target.name.value,
        restaurant: evt.target.restaurant.value,
        image: evt.target.image.value,
        rating: evt.target.rating.value,
        comment: evt.target['new-comment'].value
    }

    console.log(evt.target.name.value)
    console.log(evt.target.restaurant.value)
    console.log(evt.target.image.value)
    console.log(evt.target.rating.value)

    fetch(url, {
        method: 'POST',
        headers: {
            "Content-type": 'application/json',
            "Accept": 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(function (res)
        {
            return res.json()
        })
        .then(function (data)
        {
            renderData(data)
        })
}

function submitEditForm(evt)
{
    evt.preventDefault()
    console.log(evt)
    let formData = {
        rating: evt.target.updateRating.value,
        comment: evt.target.updateComment.value
    }

    console.log(evt.target.updateRating.value)
    console.log(evt.target.updateComment.value)

    fetch(`${url}/${currentRamen}`, {
        method: 'PATCH',
        headers: {
            "Content-type": 'application/json',
            "Accept": 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(function (res)
        {
            return res.json()
        })
        .then(function (data)
        {
            renderData(data)
        })
}


document.addEventListener('DOMContentLoaded', function (evt)
{
    evt.preventDefault()
    console.log('loaded')

    fetchAll()
    form.addEventListener('submit', submitForm)
    editForm.addEventListener('submit', submitEditForm)
})
