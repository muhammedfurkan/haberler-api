const PORT = process.env.PORT || 8000

const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')


const app = express()
const articles = []

app.get('/',(req, res) =>
{
    res.json('haberleri almak için /haber yolunu kullanmalısın :)')
})


const newspaper = [
    {
        name: 'haber',
        adress: 'https://www.haberler.com/son-dakika/'
    }
]



newspaper.forEach(newspaper => {

    axios.get(newspaper.adress)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('div.hblnContent',html).each(function (){

                const baslik = $(this).find('a').text()
                const icerik = $(this).find('p').text()
                const link = $(this).find('a').attr('href')

                articles.push({
                    baslik,
                    icerik,
                    link
                })   
            })
        })
})

app.get('/haber',(req, res) => {
    res.json(articles)
})


app.listen(PORT,()=> console.log('server running'))