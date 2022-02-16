const toCurrency = price => {
    return new Intl.NumberFormat('ru', {
        currency: 'RUB',
        style: 'currency'
    }).format(price)
}

document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(node.textContent)
})

const $card = document.querySelector('#card')
if ($card) {
    $card.addEventListener('click', evt => {
        if (evt.target.classList.contains('js-remove')) {
            const id = evt.target.dataset.id

            fetch('/card/remove/' + id, {
                method: 'delete'
            }).then(res => res.json())
            .then(card => {
                if (card.courses.length) {
                    const html = card.courses.map(c => {
                       return `
                        <tr>
                            <td>${c.title}</td>
                            <td>${c.count}</td>
                            <td class="price price-small">${c.price}</td>
                            <td>
                                <button class="btn btn-small js-remove" data-id="${c.id}">Удалить</button>
                            </td>
                        </tr>
                        `
                    }).join('')
                    $card.querySelector('tbody').innerHTML = html
                    console.log(card.price)
                    $card.querySelectorAll('.price').forEach(e => {
                        e.textContent = toCurrency(card.price)
                    }) 
                } else {
                    $card.innerHTML = '<p>Корзина пуста</p>'
                }
            })
        }
    })
}
