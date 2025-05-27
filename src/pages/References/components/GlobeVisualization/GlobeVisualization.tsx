import React, { useCallback, useEffect, useRef } from "react";
import Globe from "globe.gl";
import * as d3 from "d3";
import { Reference, Arc, GlobePoint } from "../../types";
import referencesData from "../../../../data/references.json";
import "./GlobeVisualization.scss";

interface GlobeVisualizationProps {
  references: Reference[];
  selectedReference: Reference | null;
  onReferenceSelect: (reference: Reference) => void;
}

const GlobeVisualization = ({
  references,
  selectedReference,
  onReferenceSelect,
}: GlobeVisualizationProps) => {
  const globeRef = useRef<HTMLDivElement>(null);
  const globeInstance = useRef<any>(null);

  const getColorByType = (ref: Reference) => {
    if (referencesData.FAISABILITE.some((r) => r.id === ref.id)) {
      return "#00ffff";
    }
    if (referencesData.AMO.some((r) => r.id === ref.id)) {
      return "#ffff00";
    }
    return "#ff69b4";
  };

  const getTypeLabel = (ref: Reference) => {
    if (referencesData.FAISABILITE.some((r) => r.id === ref.id)) {
      return "Études de faisabilité";
    }
    if (referencesData.AMO.some((r) => r.id === ref.id)) {
      return "Assistance à maîtrise d'ouvrage";
    }
    return "Maîtrise d'œuvre";
  };

  const focusOnReference = useCallback((ref: Reference) => {
    if (!globeInstance.current) return;

    // Désactiver la rotation automatique pendant l'animation
    globeInstance.current.controls().autoRotate = false;

    // Animer la transition vers le point
    globeInstance.current.pointOfView(
      {
        lat: ref.lat,
        lng: ref.long,
        altitude: 1.5,
      },
      1000
    ); // 1000ms de durée d'animation

    // Réactiver la rotation automatique après l'animation
    setTimeout(() => {
      if (globeInstance.current) {
        globeInstance.current.controls().autoRotate = true;
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (selectedReference !== null) focusOnReference(selectedReference);
  }, [selectedReference, focusOnReference]);

  useEffect(() => {
    if (!globeRef.current) return;

    // Create data points for the globe
    const points: GlobePoint[] = references.map((ref: Reference) => ({
      lat: ref.lat,
      lng: ref.long,
      size: 0.05,
      color: getColorByType(ref),
      altitude: 0.2,
      data: ref,
    }));

    // Create arcs between points
    const arcs: Arc[] = [];
    for (let i = 0; i < references.length - 1; i++) {
      const startRef = references[i];
      const endRef = references[i + 1];
      arcs.push({
        startLat: startRef.lat,
        startLng: startRef.long,
        endLat: endRef.lat,
        endLng: endRef.long,
        color: getColorByType(startRef),
      });
    }

    // Initialize globe with specific size
    const globeViz = Globe()
      .width(window.innerWidth / 2)
      .height(window.innerHeight)
      .globeImageUrl(
        "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      )
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
      .atmosphereColor("#ffffff")
      .atmosphereAltitude(0.25)
      .pointsData(points)
      .pointAltitude("altitude")
      .pointColor("color")
      .pointRadius("size")
      .pointResolution(64)
      .pointsMerge(true)
      .arcsData(arcs)
      .arcColor("color")
      .arcAltitude(0.3)
      .arcStroke(0.5)
      .arcDashLength(0.5)
      .arcDashGap(1)
      .arcDashAnimateTime(2000)
      .onPointClick((point: any) => {
        if (point && "data" in point) {
          onReferenceSelect((point as GlobePoint).data);
        }
      })
      .htmlElement((point: any): HTMLElement | null => {
        if (
          !point ||
          !("data" in point) ||
          (point as GlobePoint).data.id !== selectedReference?.id
        ) {
          return null;
        }

        const data = (point as GlobePoint).data;
        const el = document.createElement("div");
        el.className = "globe-tooltip";
        el.innerHTML = `
          <div class="tooltip-content">
            <h3>${data.title}</h3>
            <div class="tooltip-type" style="background-color: ${getColorByType(
              data
            )}">
              ${getTypeLabel(data)}
            </div>
            <p class="tooltip-location">${data.lieu}</p>
            <div class="tooltip-details">
              <span>Année: ${data.annee}</span>
              ${data.prix ? `<span>Prix: ${data.prix}</span>` : ""}
              ${
                data.superficie
                  ? `<span>Superficie: ${data.superficie}</span>`
                  : ""
              }
            </div>
          </div>
        `;
        return el;
      });

    globeInstance.current = globeViz(globeRef.current);

    // Handle window resize
    const handleResize = () => {
      globeViz.width(window.innerWidth / 2).height(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Auto-rotation animation with variable speed
    if (globeInstance.current) {
      globeInstance.current.controls().autoRotate = true;
      globeInstance.current.controls().autoRotateSpeed = 0.5;

      // Rotation speed animation
      let time = 0;
      const animate = () => {
        time += 0.01;
        if (globeInstance.current) {
          globeInstance.current.controls().autoRotateSpeed =
            0.5 + Math.sin(time) * 0.2;
          requestAnimationFrame(animate);
        }
      };
      animate();

      // Entry animation
      const startRadius = globeInstance.current.getGlobeRadius() * 2.5;
      globeInstance.current.pointOfView({ altitude: startRadius });
      d3.transition()
        .duration(3000)
        .tween("zoom", () => {
          const interpolate = d3.interpolate(startRadius, 2.5);
          return (t: number) => {
            if (globeInstance.current) {
              globeInstance.current.pointOfView({ altitude: interpolate(t) });
            }
          };
        });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (globeRef.current && globeInstance.current) {
        if (globeInstance.current.controls()) {
          globeInstance.current.controls().dispose();
        }
        while (globeRef.current.firstChild) {
          globeRef.current.removeChild(globeRef.current.firstChild);
        }
        globeInstance.current = null;
      }
    };
  }, [references, onReferenceSelect]);

  return (
    <div className="globe-section">
      <div className="globe-container" ref={globeRef}></div>
      <div className="legend">
        <div className="legend-item">
          <span
            className="color-dot"
            style={{ backgroundColor: "#00ffff" }}
          ></span>
          <span>Études de faisabilité</span>
        </div>
        <div className="legend-item">
          <span
            className="color-dot"
            style={{ backgroundColor: "#ffff00" }}
          ></span>
          <span>Assistance à maîtrise d'ouvrage</span>
        </div>
        <div className="legend-item">
          <span
            className="color-dot"
            style={{ backgroundColor: "#ff69b4" }}
          ></span>
          <span>Maîtrise d'œuvre</span>
        </div>
      </div>
    </div>
  );
};

// export default GlobeVisualization;

export default React.memo(GlobeVisualization, (prevProps, nextProps) => {
  // Ne re-rendre que si `references` change
  return (
    prevProps.references === nextProps.references &&
    prevProps.selectedReference === nextProps.selectedReference &&
    prevProps.onReferenceSelect === nextProps.onReferenceSelect
  );
});
