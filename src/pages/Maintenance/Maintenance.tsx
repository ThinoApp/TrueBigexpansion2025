import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { gsap } from "gsap";
import { Settings, Settings2 } from "lucide-react";
import "./maintenance.scss";

const Maintenance = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Nous revenons très bientôt");
  const [_scene, setScene] = useState<THREE.Scene | null>(null);
  const [_camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [_renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const [_sphere, setSphere] = useState<THREE.Mesh | null>(null);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  // Function to exit maintenance mode (désactivée)
  // const exitMaintenanceMode = () => {
  //   // Cette fonction est désactivée pour bloquer le site en mode maintenance
  //   // sessionStorage.removeItem("maintenanceMode");
  //   // window.location.href = window.location.pathname;
  //   console.log("Le site est actuellement bloqué en mode maintenance");
  // };

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

      // Update window size state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

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

  // Progress animation - maintenant juste un indicateur visuel, pas de progression réelle
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Alternons entre 35% et 65% pour donner l'impression d'une activité en cours
        if (prev >= 65) {
          return 35;
        }
        return prev + 0.5;
      });
    }, 300);

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

      gsap.to(".maint-message", {
        opacity: 0,
        y: -20,
        duration: 0.5,
        onComplete: () => {
          setMessage(messages[currentIndex]);
          gsap.to(".maint-message", {
            opacity: 1,
            y: 0,
            duration: 0.5,
          });
        },
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Ajustement du nombre d'éléments flottants en fonction de la taille de l'écran
  const getFloatingElementsCount = () => {
    if (windowSize.width <= 375) return 5;
    if (windowSize.width <= 768) return 8;
    return 10;
  };

  // Ajustement de la taille des engrenages en fonction de la taille de l'écran
  const getGearSize = () => {
    if (windowSize.width <= 375) return { left: 36, right: 32 };
    if (windowSize.width <= 576) return { left: 38, right: 34 };
    return { left: 42, right: 38 };
  };

  const gearSizes = getGearSize();

  return (
    <div className="maint-container" ref={containerRef}>
      {/* 3D Background */}
      <canvas ref={canvasRef} className="maint-canvas" />

      {/* Content */}
      <div className="maint-content">
        <motion.div
          className="maint-card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Gears icons */}
          <div className="maint-gears-container">
            <div className="maint-gear maint-gear-left">
              <Settings
                className="text-blue-500"
                size={gearSizes.left}
                style={{
                  animation: "spin 10s linear infinite",
                  filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.7))",
                }}
              />
            </div>
            <div className="maint-gear maint-gear-right">
              <Settings2
                className="text-blue-500"
                size={gearSizes.right}
                style={{
                  animation: "spin 8s linear infinite reverse",
                  filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.7))",
                }}
              />
            </div>
          </div>

          <motion.div
            className="maint-logo-container"
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
            <h1 className="maint-logo">
              B<span className="text-blue-500">.</span>I
              <span className="text-blue-500">.</span>G Expansion
            </h1>
          </motion.div>

          <h2 className="maint-title">Site en maintenance</h2>

          <div className="maint-message-container">
            <p className="maint-message">{message}</p>
          </div>

          <div className="maint-progress-container">
            <div className="maint-progress-bar">
              <motion.div
                className="maint-progress-fill"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="maint-progress-text">{Math.round(progress)}%</p>
          </div>

          <div className="maint-contact-info">
            <p>Pour toute question, contactez-nous à :</p>
            <a
              href="mailto:contact@bigexpansion.eu"
              className="maint-email-link"
            >
              contact@bigexpansion.eu
            </a>
          </div>

          <div className="maint-social-links">
            {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
              <motion.a
                key={social}
                href={`https://${social}.com/bigexpansion`}
                className="maint-social-icon"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className={`maint-icon-${social}`}></span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Floating elements - nombre adaptatif */}
        <div className="maint-floating-elements">
          {[...Array(getFloatingElementsCount())].map((_, i) => (
            <motion.div
              key={i}
              className="maint-floating-element"
              initial={{
                x: Math.random() * windowSize.width,
                y: Math.random() * windowSize.height,
                scale: Math.random() * 0.5 + 0.5,
                opacity: Math.random() * 0.5 + 0.3,
              }}
              animate={{
                x: Math.random() * windowSize.width,
                y: Math.random() * windowSize.height,
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

      {/* Le bouton de sortie est maintenant caché */}
      {/* 
      <button
        onClick={exitMaintenanceMode}
        className="maint-exit-button"
        title="Exit Maintenance Mode (Admin only)"
      >
        Exit
      </button>
      */}
    </div>
  );
};

export default Maintenance;
