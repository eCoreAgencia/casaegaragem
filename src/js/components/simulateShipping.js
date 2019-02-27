import swal from 'sweetalert'
import formatInput from './formatInput'

export default class SimulateShipping {
    constructor(product) {
        console.log(product)
        let self = this
        let body = $('body')
        let zipCodeEl = '.shipping__input'

        this.seller = 1
        this.skuId = product.skus[0].sku
        this.country = vtexjs.checkout.orderForm ? vtexjs.checkout.orderForm.storePreferencesData.countryCode : 'BRA'
        this.salesChannel = +window.jssalesChannel || 1
        this.containerElement = $('.shipping__result')

        body.on('input', zipCodeEl, () => { formatInput(zipCodeEl, '00000-000') })

        body.on('submit', '.shipping__form', function (e) {
            e.preventDefault()
            if (skuJson.skus[0].available) {
            let postalCode = $(zipCodeEl).val().replace('-', '')
            if (postalCode.length === 8) {
                self.postalCode = postalCode
                self.requestShippingInfo()
            }
            else {
                swal({
                text: 'Insira um CEP válido',
                icon: 'warning',
                })
            }
            }
            else {
            swal({
                text: 'Este produto está indisponível',
                icon: 'warning',
            })
            }
        })

        body.on('click', '.shipping__close', function (e) {
            e.preventDefault()
            self.containerElement.fadeOut(150)
        })
    }

    requestShippingInfo() {
    vtexjs.checkout.getOrderForm()
        .then(orderForm => {
        const item = {
            id: this.skuId,
            seller: this.seller,
            quantity: +$('.product__qtd-value').val(),
        }
        return vtexjs.checkout.simulateShipping([item], this.postalCode, this.country, this.salesChannel)
        })
        .done(shippingInfo => {
        let { slas } = shippingInfo.logisticsInfo[0]
        if (slas && slas.length) {
            this.renderShippingResult(slas)
        }
        else {
            swal({
            text: 'Não há informações de frete relacionadas a este produto',
            icon: 'warning',
            })
        }
        })
    }

    renderShippingResult(slas) {
        let html = `
            <div class="product__shipping__result">
            <button class="product__shipping-close shipping__close" type="button">X</button>

            <table class="product__shipping-table">
                ${slas.map(sla => this.renderShippingTypeRow(sla)).join('')}
            </table>
            </div>
        `
        this.containerElement.html(html).fadeIn(150)
    }

    renderShippingTypeRow(sla) {
        let { name, price, shippingEstimate } = sla
        let isFree = price === 0 ? true : false
        let days = +shippingEstimate.replace('bd', '')
        let daysText = days === 1 ? 'dia útil' : 'dias úteis'
        price = (price / 100).formatMoney()
        return `
            <tr class="product__shipping-table__row">
            <td class="product__shipping-table__cell">${name}</td>
            <td class="product__shipping-table__cell">
                <strong>Em até <span class="product__shipping-table__days">${days} ${daysText}</span></strong>
            </td>
            <td class="product__shipping-table__cell">${isFree ? 'Grátis' : `R$ ${price}`}</td>
            </tr>
        `
    }
}
