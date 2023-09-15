interface LegendItem {
    name: string;
    desc?: string;
    color: string;
}

declare namespace JSX {
    interface IntrinsicElements {
        "fest-map-legend": {
            title?: string;
            items?: string;
            "btn-text"?: string;
            "btn-index"?: string;
            "btn-bg-color"?: string;
            "btn-text-color"?: string;
            "modal-index"?: string;
        };
    }
}
