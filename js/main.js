"use strict";
window.addEventListener('DOMContentLoaded', () => {
    const navlist = document.querySelectorAll('nav ul li')
    const backlight = document.querySelector('nav .backlight')

    // document.getElementById('main-page-link').classList.add('active')
    navlist.forEach((item) => {
        item.addEventListener('mouseover', () => {
            backlight.classList.add('hovered')
            let pos = item.getBoundingClientRect()
            backlight.style.left = pos.x + 'px'
            backlight.style.top = pos.y + 'px'
            backlight.style.height = pos.height + 'px'
            backlight.style.width = pos.width + 'px'
        })
        item.addEventListener('mouseout', () => {
            backlight.classList.remove('hovered')
        })
        item.addEventListener('click', async () => {
            navlist.forEach((item1) => {
                item1.classList.remove('active')
            })
            item.classList.add('active')
            await switchContent(item)
        })
    })
})

async function switchContent(navbarItem) {
    let pageName = navbarItem.id.replace('-link', '')
    fetch(`./pages/${pageName}.html`)
        .then((response) => {
            return response.text()
        })
        .then((html) => {
            document.getElementById('content-display-1').innerHTML = html
        })
        .then(() => {
            switch (navbarItem.id) {
                case 'main-page-link':
                    break;
                case 'calculator-link':
                    console.log('calculator')
                    const numbers = document.querySelectorAll('.number')
                    const signs = document.querySelectorAll('.sign')
                    console.log(numbers)
                    numbers.forEach((item) => {
                        item.addEventListener('click', (e) => {
                            e.preventDefault()
                            let currVal = document.getElementById('calculator-display-value').innerHTML
                            let newVal
                            if (currVal == 0) {
                                newVal = item.id.replace('-button', '')
                            } else {
                                newVal = currVal + item.id.replace('-button', '')

                            }
                            document.getElementById('calculator-display-value').innerHTML = newVal
                        })
                    })
                    signs.forEach((item) => {
                        item.addEventListener('click', (e) => {
                            e.preventDefault()
                            let sign = item.id.replace('-button')
                        })
                    })
                    document.getElementById('ac-button').addEventListener('click', () => {
                        document.getElementById('calculator-display-value').innerHTML = 0
                    })

                    break;
                case 'art-gallery-link':
                    break;
            }
        })
}