# fest-map-legend

Web Component to show legend on Fest map

## 📦 Install

    yarn add @fest/map-legend

## 🔨 Usage

    import React from "react";
    import "@fest/map-legend";

    const App = () => (
      <>
        <fest-map-legend
          title="Map Legend"
          btn-text="Show legend"
          btn-index="20"
          modal-index="999"
          items='[
            {
              "name": "Park",
              "desc": "Green space for recreation and relaxation, often with paths and benches.",
              "color": "#4CB2E6"
            },
            {
              "name": "Picnic Area",
              "desc": "Designated spot with tables for outdoor meals.",
              "color": "#FFC014"
            }
          ]'
        ></fest-map-legend>
      </>
    );
