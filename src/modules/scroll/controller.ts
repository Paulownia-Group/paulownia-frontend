export type ScrollHandler = (position: {
    top: number
    left: number
}) => void

export class ScrollConductor {
    private listeners = new Map<HTMLElement, ScrollHandler>()
    private active = new Set<HTMLElement>()
    private observer: IntersectionObserver
    
    constructor () {
        const options = {
            threshold: 0,
            rootMargin: '0px',
            root: null,
        }
        this.observer = new IntersectionObserver(e => this.handle(e), options);
        window.addEventListener('scroll', () =>
            this.active.forEach(node => {
                const rect = node.getBoundingClientRect()
                const cb = this.listeners.get(node)
                cb && cb({
                    top: Math.min(
                        1 - (rect.top + rect.height) / (window.innerHeight + rect.height), 1),
                    left: Math.min(1 - rect.left / window.innerWidth, 1),
                })
            })
        )
    }
    

    public handle(entries: IntersectionObserverEntry[]) {
        entries.forEach(v => {
            if (v.isIntersecting) {
                this.active.add(v.target as HTMLElement)
            } else {
                this.active.delete(v.target as HTMLElement)
            }
        })
    }

    public add(node: HTMLElement, handler: ScrollHandler) {
        this.listeners.set(node, handler)
        this.observer.observe(node)
    }
}