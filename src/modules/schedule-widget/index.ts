type Time = [number, number]
type WorkingTime = [Time, Time]
type Schedule = Array<WorkingTime | null>

function getUtcTime () {
    const now = new Date()
    return now.getTime() + (now.getTimezoneOffset() * 60000)
}

function timezoneTime(offset: number): Time {
    const utc = getUtcTime()
    var nd = new Date(utc + (3600000 * offset));
    const parts = nd.toLocaleTimeString().split(':')
    return [parseInt(parts[0]), parseInt(parts[1])]
}

function renderTime(t: Time) {
    return t
        .map(String)
        .map(v => v.padStart(2, '0'))
        .join(':')
}

export function createSchedule (node: HTMLElement, schedule: Schedule) {
    node.classList.add('schedule')
    const text = document.createElement('div')
    text.className = 'schedule-text'
    text.innerText = '00:00'
    const status = document.createElement('div')
    status.className = 'schedule-status'
    node.appendChild(text)
    node.appendChild(status)
    schedule.forEach(() => {
        // TODO: Build schedule node
    })

    setInterval(() => {
        const time = timezoneTime(+3)
        text.innerText = renderTime(time)
    }, 1000)
}