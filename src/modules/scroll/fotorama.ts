import { ScrollHandler } from "./controller"

interface FotoramaConfig {
    speed?: number,
    threshold?: number
}

export function createFotorama(node: HTMLElement, config?: FotoramaConfig): ScrollHandler {
    const THRESHOLD = config?.threshold || 0.2
    const SPEED = config?.threshold || 1

    let active = 0
    const slides = Array.from(node.children) as HTMLElement[]
    const step = ((1 - THRESHOLD) / slides.length) * SPEED
    function applyVisibility () {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.opacity = i <= active ? '1' : '0'
        }
    }
    applyVisibility()
    return position => {
        if (position.top < THRESHOLD && active === 0) return
        const progress = Math.floor(position.top / step)
        if ((progress > active && active < slides.length) ||
            (progress < active && active >= 1)) {
            active = progress
            applyVisibility()
        }
    }
}