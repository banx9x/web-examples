class CircleProgress extends HTMLElement {
    constructor() {
        super();

        const color = this.getAttribute("color") || "#333333";
        const stroke = this.getAttribute("stroke") || "2";
        const radius = this.getAttribute("radius") || 50;
        const normalizedRadius = radius - stroke * 2;
        this.circumference = normalizedRadius * 2 * Math.PI;

        this.root = this.attachShadow({ mode: "open" });
        this.root.innerHTML = `
            <svg
            height="${radius * 2}"
            width="${radius * 2}"
            >
            <circle
                stroke="${color}"
                stroke-dasharray="${this.circumference} ${this.circumference}"
                style="stroke-dashoffset:${this.circumference}"
                stroke-width="${stroke}"
                stroke-linecap="round"
                fill="transparent"
                r="${normalizedRadius}"
                cx="${radius}"
                cy="${radius}"
            />
            </svg>

            <style>
            circle {
                transition: stroke-dashoffset 0.35s;
                transform: rotate(-90deg);
                transform-origin: 50% 50%;
            }
            </style>
        `;
    }

    setProgress(percent) {
        const offset =
            this.circumference - (percent / 100) * this.circumference;
        const circle = this.root.querySelector("circle");
        circle.style.strokeDashoffset = offset;
    }

    static get observedAttributes() {
        return ["progress"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "progress") {
            this.setProgress(newValue);
        }
    }
}

window.customElements.define("circle-progress", CircleProgress);
