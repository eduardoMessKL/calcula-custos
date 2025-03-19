import Swal from 'sweetalert2'

const form = document.getElementById('form') as HTMLFormElement
if(!form){
    throw new Error('NULL form')
}

form.addEventListener('submit', CalcularCustos)

function CalcularCustos(event: Event){
    event.preventDefault()

    const selectedMarketplace = document.getElementById('selectMarketplace') as HTMLSelectElement
    const precoDeCusto = document.getElementById('precoDeCusto') as HTMLInputElement
    const porcentagemLucro = document.getElementById('porcentagemLucro') as HTMLInputElement

    let resultado = document.getElementById('resultado') as HTMLElement

    if(!selectedMarketplace || !precoDeCusto || !porcentagemLucro){ 
        throw new Error('Alguns campos não foram encontrados')
    }

    if(!selectedMarketplace.value || !precoDeCusto.value || !porcentagemLucro.value){ 
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Acho que você esqueceu de preencher alguns campos!",
        });

        throw new Error('Todos os campos devem ser preenchidos')
    }

    let valorPrecoDeCusto: number = parseFloat(precoDeCusto.value)
    let valorEsperadoLucro: number = parseFloat(porcentagemLucro.value)

    if(!valorPrecoDeCusto || !valorEsperadoLucro){
        throw new Error('Ocorreu um erro ao capturar os valores dos inputs')
    }

    switch(selectedMarketplace.value){
        case 'mercadoLivre': {
            const tipoDeLucro = document.getElementById('tipoDeLucro') as HTMLSelectElement
            if(!tipoDeLucro){
                throw new Error('NULL tipoDeLucro')
            }

            console.log('tipoDeLucro.value', tipoDeLucro.value)

            let lucroAbsoluto: number

            switch(tipoDeLucro.value){
                case 'porcentagem' : {
                    valorEsperadoLucro = valorEsperadoLucro / 100
                    lucroAbsoluto = valorPrecoDeCusto * valorEsperadoLucro

                    break;
                }
                case 'reais' : {
                    console.log('reais')
                    lucroAbsoluto = valorEsperadoLucro

                    break;
                }
                default : {
                    console.log('default')
                    lucroAbsoluto = 1

                    break;
                }
            }

            const TAXA_FIXA: number = 6.50
            const TAXA_ML_PERCENT: number = (11.50 / 100)
            const TAXA_IR_PERCENT: number = (12 / 100)

            const valorDesejado = lucroAbsoluto + valorPrecoDeCusto

            let valorFinal = (valorDesejado + TAXA_FIXA) / (1 - TAXA_ML_PERCENT - TAXA_IR_PERCENT)

            if(valorFinal >= 79){
                valorFinal = valorDesejado / (1 - TAXA_ML_PERCENT - TAXA_IR_PERCENT)
            }

            resultado.innerHTML = `
                Venda no valor de R$ ${valorFinal.toFixed(2)} para alcançar seus lucros
            `

            return
        }
        case 'facebook': {

        }
        case 'shopee': {

        }
    }

    return
}
