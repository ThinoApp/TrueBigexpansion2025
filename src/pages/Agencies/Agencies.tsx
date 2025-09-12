import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import PageTransition from "../../components/PageTransition";
import { agencies } from "../../data/agencies";
import "./agencies.scss";

// MapTiler API Key
maptilersdk.config.apiKey = "0JAZk9LeZ3nUAECY04aT";

const Agencies = () => {
  const [isEntering, setIsEntering] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState<any>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maptilersdk.Map | null>(null);

  useEffect(() => {
    setIsEntering(true);
  }, []);

  // Initialize map
  useEffect(() => {
    if (map.current) return; // Initialize map only once
    
    if (mapContainer.current) {
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.DARK,
        center: [20, -10], // Center on Indian Ocean to show all agencies
        zoom: 3,
      });

      // Add markers for each agency
      agencies.forEach((agency) => {
        // Create a custom marker element
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';
        markerElement.innerHTML = `
          <div class="marker-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#fff"/>
              <circle cx="12" cy="9" r="2.5" fill="#000"/>
            </svg>
          </div>
        `;
        
        // Create comprehensive popup with all agency details
        const teamMembersHTML = agency.team.slice(0, 6).map(member => `
          <div class="popup-team-member">
            <div class="popup-member-photo" style="background-image: url('${member.photo}')"></div>
            <div class="popup-member-info">
              <h5>${member.name}</h5>
              <p>${member.role}</p>
            </div>
          </div>
        `).join('');

        const popup = new maptilersdk.Popup({ 
          offset: 15, 
          closeButton: true,
          closeOnClick: false,
          maxWidth: '320px',
          className: 'agency-detailed-popup',
          anchor: 'top',
          focusAfterOpen: false
        })
          .setHTML(`
          <div class="agency-popup-detailed">
            <div class="popup-hero" style="background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('${agency.image}')">
              <div class="popup-hero-content">
                <h3>${agency.name}</h3>
                <p class="popup-location">${agency.location}</p>
              </div>
            </div>
            
            <div class="popup-content">
              <div class="popup-contact-section">
                <h4>Contact</h4>
                <div class="popup-contact-grid">
                  <div class="popup-contact-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor"/>
                    </svg>
                    <span>${agency.address}</span>
                  </div>
                  <div class="popup-contact-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="currentColor"/>
                    </svg>
                    <span>${agency.phone}</span>
                  </div>
                  <div class="popup-contact-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                      <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>${agency.email}</span>
                  </div>
                </div>
              </div>
              
              <div class="popup-team-section">
                <h4>Notre équipe</h4>
                <div class="popup-team-grid">
                  ${teamMembersHTML}
                </div>
              </div>
            </div>
          </div>
        `);

        // Create marker
        const marker = new maptilersdk.Marker({ element: markerElement })
          .setLngLat([agency.coordinates.lng, agency.coordinates.lat])
          .setPopup(popup)
          .addTo(map.current!);

        // Add click event to marker (popup will open automatically)
        markerElement.addEventListener('click', () => {
          // Popup opens automatically, no need for sidebar
        });
      });

      // Add click event listener for popup buttons
      map.current.on('click', (e) => {
        const features = map.current!.queryRenderedFeatures(e.point);
        if (features.length > 0) {
          const agencyId = (e.originalEvent.target as HTMLElement)?.getAttribute('data-agency-id');
          if (agencyId) {
            const agency = agencies.find(a => a.id === agencyId);
            if (agency) {
              setSelectedAgency(agency);
            }
          }
        }
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <PageTransition isEntering={isEntering}>
      <div className="agencies-map-container">
        {/* Header */}
        <motion.div
          className="agencies-header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Nos Agences</h1>
          <p>Découvrez nos implantations dans l'océan Indien et en métropole</p>
        </motion.div>

        {/* Map Container with Overlay */}
        <motion.div
          className="map-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div ref={mapContainer} className="map-container" />
          
          {/* Agencies List Overlay */}
          <motion.div
            className="agencies-overlay"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="overlay-header">
              <h3>Nos Agences</h3>
              <p>Cliquez pour explorer</p>
            </div>
            
            <div className="agencies-vertical-list">
              {agencies.map((agency, index) => (
                <motion.div
                  key={agency.id}
                  className="agency-overlay-card"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  onClick={() => {
                    if (map.current) {
                      map.current.flyTo({
                        center: [agency.coordinates.lng, agency.coordinates.lat],
                        zoom: 8,
                        duration: 2000
                      });
                      // Find the marker and trigger its popup
                      setTimeout(() => {
                        const markers = document.querySelectorAll('.custom-marker');
                        markers.forEach(marker => {
                          const markerText = marker.querySelector('.marker-icon');
                          if (markerText) {
                            (marker as HTMLElement).click();
                          }
                        });
                      }, 2100);
                    }
                  }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div 
                    className="overlay-card-image"
                    style={{ backgroundImage: `url(${agency.imageMin})` }}
                  />
                  <div className="overlay-card-content">
                    <h4>{agency.name}</h4>
                    <p>{agency.location}</p>
                  </div>
                  <div className="overlay-card-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Agencies;
