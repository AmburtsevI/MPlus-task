declare global {
    interface HTMLAttributes {
        'outclick': CustomEvent;
    }
}

export const clickoutside = (node: HTMLElement) => {
    const handleClick = (event: MouseEvent)  => {
        if (!node.contains(event.target as Node)) {
            node.dispatchEvent(new CustomEvent('outclick'));
        }
    };

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    };
}