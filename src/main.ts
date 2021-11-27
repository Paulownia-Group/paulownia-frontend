import { createSchedule } from './modules/schedule-widget'
import { ScrollConductor, createParallax, createFotorama } from './modules/scroll'
import './style.scss'

const schedule = document.querySelector<HTMLElement>('.schedule')!
const leafs = document.querySelector<HTMLElement>('.leafs-item')!
const branch = document.querySelector<HTMLElement>('.branch-item')!
const honey = document.querySelector<HTMLElement>('.honey')!
const gallery = document.querySelector<HTMLElement>('.hero-gallery')!
const form = document.querySelector<HTMLFormElement>('.form')!

createSchedule(schedule, [])
const handler = new ScrollConductor()
handler.add(branch, createParallax(branch, 80))
handler.add(leafs, createParallax(leafs, 200))
handler.add(gallery, createFotorama(gallery, { speed: 1.15 }))
handler.add(honey, createParallax(honey, 50))

const button = form.querySelector<HTMLButtonElement>('button')!
const name = form.querySelector<HTMLInputElement>('input[name="name"]')!
const email = form.querySelector<HTMLInputElement>('input[name="email"]')!
const number = form.querySelector<HTMLInputElement>('input[name="tel"]')!
const message = form.querySelector<HTMLTextAreaElement>('textarea')!

form.addEventListener('submit', (e) => {
    if (!form.checkValidity()) {
        return
    }
    e.preventDefault()
    form.classList.add('__progress')
    fetch('/api/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name.value,
            email: email.value,
            number: number.value,
            message: message.value
        })
      }).then((res) => {
        if (!res.ok) {
            button.textContent = 'Ошибка отправки'
            return
        }
        form.classList.remove('__progress')
        form.classList.add('__success')
        button.textContent = 'Успешно отправлено'
        name.value = ''
        email.value = ''
        number.value = ''
        message.value = ''
        setTimeout(() => {
            button.textContent = 'Отправить'
            form.classList.remove('__success')
        }, 1500)
        
      })
})