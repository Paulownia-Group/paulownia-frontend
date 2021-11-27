import { ScrollHandler } from "./controller"

export function createParallax(node: HTMLElement, speed: number): ScrollHandler {
    return position => {
        node.style.transform = `translateY(${position.top * -speed}px) translateZ(0)`
    }
}
