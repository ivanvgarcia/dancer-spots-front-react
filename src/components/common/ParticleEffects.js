import React from "react";
import Particles from "react-particles-js";

const particlesParams = {
  particles: {
    number: {
      value: 640,
      density: {
        enable: true,
        value_area: 1500
      }
    },
    line_linked: {
      enable: true,
      opacity: 0.02
    },
    move: {
      direction: "right",
      speed: 0.55
    },
    size: {
      value: 3
    },
    opacity: {
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.05
      }
    }
  },
  interactivity: {
    events: {
      onclick: {
        enable: true,
        mode: "push"
      }
    },
    modes: {
      push: {
        particles_nb: 1
      }
    }
  },
  retina_detect: true
};

const ParticleEffects = () => {
  return <Particles className="particles" params={particlesParams} />;
};

export default ParticleEffects;
