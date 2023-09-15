/// <reference path="./index.d.ts" />

class FestMapLegend extends HTMLElement {
    private modal: HTMLDivElement;
    private modalTitle: HTMLDivElement;
    private modalContent: HTMLDivElement;
    private showBtn: HTMLButtonElement;
    private closeBtn: HTMLButtonElement;

    static get observedAttributes() {
        return ["title", "items", "btn-text", "btn-index", "btn-bg-color", "btn-text-color", "modal-index"];
    }

    connectedCallback() {
        this.modal.style.zIndex = this.getAttribute("modal-index") ?? "2";
        this.modalTitle.innerText = this.getAttribute("title") ?? "Map Legend";
        this.showBtn.innerText = this.getAttribute("btn-text") ?? "Show Legend";
        this.showBtn.style.zIndex = this.getAttribute("btn-index") ?? "1";
        this.showBtn.style.backgroundColor = this.getAttribute("btn-bg-color") ?? "#ffffff";
        this.showBtn.style.color = this.getAttribute("btn-text-color") ?? "#333333";
    }

    attributeChangedCallback(name: string, _: string, newValue: string) {
        if (newValue === null) return;

        switch (name) {
            case "title":
                this.modalTitle.innerText = newValue;
                break;
            case "btn-text":
                this.showBtn.innerText = newValue;
                break;
            case "items":
                try {
                    const items = JSON.parse(newValue) as LegendItem[];
                    this.populateItems(items);
                } catch (e) {
                    console.error("Error parsing items:", e);
                }
                break;
            default:
                break;
        }
    }

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = `
            <style>
                .fest-legend-btn-show {
                    position: absolute;
                    bottom: 30px;
                    right: 10px;
                    z-index: 10;
                    padding: 0.4rem 0.6rem;
                    border: 0;
                    border-radius: 8px;
                    box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.10);
                    font-family: inherit;
                    font-size: 0.8rem;
                    font-weight: 500;
                    cursor: pointer;
                    user-select: none;
                }
                .fest-legend-btn-show:hover {
                    opacity: 0.9;
                }
                .fest-legend-modal {
                    position: absolute;
                    bottom: 30px;
                    right: 10px;
                    z-index: 9999;
                    display: flex;
                    flex-flow: column wrap;
                    gap: 0.2rem;
                    box-sizing: border-box;
                    max-width: 430px;
                    padding: 0 1.125rem;
                    background: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.10);
                    color: #333333;
                }
                .fest-legend-modal.is-hidden {
                    display: none;
                }
                .fest-legend-modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 0;
                    font-size: 1.1rem;
                    font-weight: 600;
                }
                .fest-legend-modal-content {
                    display: flex;
                    flex-flow: column wrap;
                    gap: 0.9rem;
                    padding: 0 0 1.125rem;
                    text-align: left;
                }
                .fest-legend-item {
                    display: flex;
                    gap: 1rem;
                }
                .fest-legend-item-color {
                    width: 1.3rem;
                    height: 1.3rem;
                    border-radius: 6px;
                }
                .fest-legend-item-content {
                    flex: 1;
                    display: flex;
                    flex-flow: column wrap;
                    gap: 0.24rem;
                }
                .fest-legend-item-content > strong {
                    text-transform: uppercase;
                    font-size: 1rem;
                    font-weight: 500;
                }
                .fest-legend-item-content > span {
                    color: #757575;
                    font-size: 0.8rem;
                }
                .fest-legend-btn-close {
                    position: relative;
                    right: -0.2rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 1.9rem;
                    height: 1.9rem;
                    margin: 0;
                    padding: 0;
                    background: transparent;
                    border: 0;
                    border-radius: 6px;
                    cursor: pointer;
                }
                .fest-legend-btn-close:hover {
                    background: #F6F6F6;
                }
                @media (max-width: 767px) {
                    .fest-legend-modal {
                        left: 0;
                        right: 0;
                        bottom: 0;
                        width: 100%;
                        max-width: 100%;
                        border-radius: 0;
                    }
                }
            </style>
            <button type="button" class="fest-legend-btn-show"></button>
            <div class="fest-legend-modal is-hidden">
                <header class="fest-legend-modal-header">
                    <div class="fest-legend-modal-title"></div>
                    <button class="fest-legend-btn-close" title="Close">
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.46967 4.46967C4.76256 4.17678 5.23744 4.17678 5.53033 4.46967L12 10.9393L18.4697 4.46967C18.7626 4.17678 19.2374 4.17678 19.5303 4.46967C19.8232 4.76256 19.8232 5.23744 19.5303 5.53033L13.0607 12L19.5303 18.4697C19.8232 18.7626 19.8232 19.2374 19.5303 19.5303C19.2374 19.8232 18.7626 19.8232 18.4697 19.5303L12 13.0607L5.53033 19.5303C5.23744 19.8232 4.76256 19.8232 4.46967 19.5303C4.17678 19.2374 4.17678 18.7626 4.46967 18.4697L10.9393 12L4.46967 5.53033C4.17678 5.23744 4.17678 4.76256 4.46967 4.46967Z" fill="#757575"/>
                        </svg>
                    </button>
                </header>
                <div class="fest-legend-modal-content"></div>
            </div>
        `;

        this.modal = shadow.querySelector(".fest-legend-modal") as HTMLDivElement;
        this.modalTitle = shadow.querySelector(".fest-legend-modal-title") as HTMLDivElement;
        this.showBtn = shadow.querySelector(".fest-legend-btn-show") as HTMLButtonElement;
        this.closeBtn = shadow.querySelector(".fest-legend-btn-close") as HTMLButtonElement;
        this.modalContent = shadow.querySelector(".fest-legend-modal-content") as HTMLDivElement;

        this.showBtn.addEventListener("click", () => this.toggleModal());
        this.closeBtn.addEventListener("click", () => this.toggleModal());

        const items = this.getAttribute("items");
        if (items) {
            try {
                this.populateItems(JSON.parse(items));
            } catch (e) {
                console.error("Error parsing items:", e);
            }
        }
    }

    toggleModal() {
        this.modal.classList.toggle("is-hidden");
    }

    populateItems(items: LegendItem[]) {
        this.modalContent.innerHTML = items
            .map(
                (item) => `
                    <div class="fest-legend-item">
                        <div class="fest-legend-item-color" style="background-color: ${item.color}"></div>
                        <div class="fest-legend-item-content">
                            <strong>${item.name}</strong>
                            ${item.desc ? `<span>${item.desc}</span>` : ""}
                        </div>
                    </div>
                 `
            )
            .join("");
    }
}

customElements.define("fest-map-legend", FestMapLegend);
