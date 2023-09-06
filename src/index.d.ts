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
            "modal-index"?: string;
        };
    }
}
