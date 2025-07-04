import React, { useEffect, useState } from "react";
import "./BackgroundGrid.css";

function getGridDimensions() {
  // 1cm in px (approx, depends on device, but 37.8px is standard for 96dpi)
  const cm = 37.8;
  const cols = Math.ceil(window.innerWidth / cm);
  const rows = Math.ceil(window.innerHeight / cm);
  return { cols, rows };
}

function getFilledIndices(totalBoxes) {
  // For every 7 boxes, pick one random index in that group to fill
  const filled = new Set();
  for (let i = 0; i < totalBoxes; i += 7) {
    const groupEnd = Math.min(i + 7, totalBoxes);
    const fillIdx = i + Math.floor(Math.random() * (groupEnd - i));
    filled.add(fillIdx);
  }
  return filled;
}

function BackgroundGrid() {
  const [dimensions, setDimensions] = useState(getGridDimensions());
  const [filledIndices, setFilledIndices] = useState(() => getFilledIndices(dimensions.cols * dimensions.rows));

  useEffect(() => {
    function handleResize() {
      const dims = getGridDimensions();
      setDimensions(dims);
      setFilledIndices(getFilledIndices(dims.cols * dims.rows));
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const total = dimensions.cols * dimensions.rows;

  return (
    <div
      className="background-grid"
      style={{
        gridTemplateColumns: `repeat(${dimensions.cols}, 1cm)`,
        gridTemplateRows: `repeat(${dimensions.rows}, 1cm)`
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`grid-box${filledIndices.has(i) ? " filled" : ""}`}
        />
      ))}
    </div>
  );
}

export default BackgroundGrid; 