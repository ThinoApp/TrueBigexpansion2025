import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { gsap } from "gsap";
import "./maintenance.scss";

const Maintenance = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Nous revenons très bientôt");
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const [sphere, setSphere] = useState<THREE.Mesh | null>(null);

  // Function to exit maintenance mode (for testing)
  const exitMaintenanceMode = () => {
    sessionStorage.removeItem("maintenanceMode");
    window.location.href = window.location.pathname; // Reload without query params
  };

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;

    // Create scene
    const newScene = new THREE.Scene();
    setScene(newScene);

    // Create camera
    const newCamera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    newCamera.position.z = 5;
    setCamera(newCamera);

    // Create renderer
    const newRenderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    newRenderer.setSize(window.innerWidth, window.innerHeight);
    newRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    setRenderer(newRenderer);

    // Create sphere geometry
    const geometry = new THREE.SphereGeometry(2, 64, 64);

    // Create material with custom shader
    const material = new THREE.MeshStandardMaterial({
      color: 0x3b82f6, // Blue color matching the brand
      roughness: 0.3,
      metalness: 0.8,
      wireframe: true,
    });

    // Create mesh
    const newSphere = new THREE.Mesh(geometry, material);
    newScene.add(newSphere);
    setSphere(newSphere);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    newScene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    newScene.add(directionalLight);

    // Add point lights for dynamic lighting
    const pointLight1 = new THREE.PointLight(0xff9000, 2, 10);
    pointLight1.position.set(2, 3, 4);
    newScene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x0078ff, 2, 10);
    pointLight2.position.set(-2, -3, 4);
    newScene.add(pointLight2);

    // Handle window resize
    const handleResize = () => {
      if (!newCamera || !newRenderer) return;

      newCamera.aspect = window.innerWidth / window.innerHeight;
      newCamera.updateProjectionMatrix();
      newRenderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      if (!newSphere || !newScene || !newCamera || !newRenderer) return;

      // Rotate sphere
      newSphere.rotation.x += 0.002;
      newSphere.rotation.y += 0.003;

      // Move point lights in circular motion
      const time = Date.now() * 0.001;
      pointLight1.position.x = Math.sin(time * 0.7) * 3;
      pointLight1.position.y = Math.cos(time * 0.5) * 3;
      pointLight2.position.x = Math.sin(time * 0.3) * 3;
      pointLight2.position.y = Math.cos(time * 0.4) * 3;

      // Render scene
      newRenderer.render(newScene, newCamera);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      newRenderer.dispose();
    };
  }, []);

  // Progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Message animation
  useEffect(() => {
    const messages = [
      "Nous revenons très bientôt",
      "Nous améliorons notre site",
      "Maintenance en cours",
      "Nous préparons quelque chose d'incroyable",
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % messages.length;

      gsap.to(".maintenance-message", {
        opacity: 0,
        y: -20,
        duration: 0.5,
        onComplete: () => {
          setMessage(messages[currentIndex]);
          gsap.to(".maintenance-message", {
            opacity: 1,
            y: 0,
            duration: 0.5,
          });
        },
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="maintenance-container" ref={containerRef}>
      {/* 3D Background */}
      <canvas ref={canvasRef} className="maintenance-canvas" />

      {/* Content */}
      <div className="maintenance-content">
        <motion.div
          className="maintenance-card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="logo-container"
            animate={{
              rotateY: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.5, 1],
            }}
          >
            <h1 className="logo">
              B<span className="text-blue-500">.</span>I
            </h1>
          </motion.div>

          <h2 className="maintenance-title">Site en maintenance</h2>

          <div className="maintenance-message-container">
            <p className="maintenance-message">{message}</p>
          </div>

          <div className="progress-container">
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="progress-text">{progress}%</p>
          </div>

          <div className="contact-info">
            <p>Pour toute question, contactez-nous à :</p>
            <a href="mailto:contact@bigexpansion.com" className="email-link">
              contact@bigexpansion.com
            </a>
          </div>

          <div className="social-links">
            {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
              <motion.a
                key={social}
                href={`https://${social}.com/bigexpansion`}
                className="social-icon"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className={`icon-${social}`}></span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Floating elements */}
        <div className="floating-elements">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="floating-element"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5,
                opacity: Math.random() * 0.5 + 0.3,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>

      {/* Hidden button to exit maintenance mode (for testing) */}
      <button
        onClick={exitMaintenanceMode}
        className="exit-maintenance-button"
        title="Exit Maintenance Mode (Admin only)"
      >
        Exit
      </button>
    </div>
  );
};

export default Maintenance;
