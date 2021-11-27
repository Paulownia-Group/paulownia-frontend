//@ts-check

const cheerio = require('cheerio')
const { readFile, writeFile } = require('fs/promises')
const Typograf = require('typograf')

const HTML_PATH = 'dist/index.html'

const tp = new Typograf({
    locale: ['ru'],
    htmlEntity: {
        type: 'name',
        onlyInvisible: true
    }
})
const improveTypografy = text => tp.execute(text) 

const readTextFile = path => readFile(path, { encoding: 'utf-8' })

readTextFile(HTML_PATH)
    .then(t => {
        const $ = cheerio.load(t)
        $('p, .module-factoidMain, .module-factoidDescription').each((i, item) => {
            const processed = improveTypografy($(item).html())
            $(item).html(processed)
        })
        return $.html()
    })
    .then(t => writeFile(HTML_PATH, t))
