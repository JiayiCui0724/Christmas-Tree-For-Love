
import * as THREE from 'three';

export const COLORS = {
  EMERALD: '#0ea5e9', // Shifted slightly towards cyan-emerald for better glow
  DEEP_GREEN: '#064e3b',
  VIBRANT_GREEN: '#22c55e', // Much more neon-vibrant green
  GOLD: '#fbbf24', // Brighter amber-gold
  BRIGHT_GOLD: '#fcd34d', // Intense bright gold
  RICH_RED: '#dc2626', // Brighter, more punchy red
  DIAMOND: '#f0f9ff',
  SAPPHIRE: '#38bdf8',
  TRUNK_BROWN: '#451a03', // Rich mahogany
};

export const TREE_PARAMS = {
  HEIGHT: 12,
  BASE_RADIUS: 5,
  PARTICLE_COUNT: 35000, 
  ORNAMENT_COUNT: 600,
  CHAOS_RADIUS: 18,
  TRUNK_HEIGHT: 1.2,
  TRUNK_RADIUS: 0.8,
  TRUNK_PARTICLE_COUNT: 5000,
  SNOW_PARTICLE_COUNT: 15000,
  SNOW_BASE_RADIUS: 6.0,
  GROUND_GIFT_COUNT: 40,
};

export const getRandomSpherePoint = (radius: number): [number, number, number] => {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  const r = radius * Math.pow(Math.random(), 0.33);
  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi)
  ];
};

export const getTreePoint = (height: number, baseRadius: number): [number, number, number] => {
  const h = Math.random() * height;
  const t = h / height;
  const radiusAtHeight = (1 - Math.pow(t, 1.5)) * baseRadius;
  const angle = Math.random() * Math.PI * 2;
  const r = Math.random() * radiusAtHeight;
  return [
    r * Math.cos(angle),
    h - height / 2,
    r * Math.sin(angle)
  ];
};

export const getTrunkPoint = (height: number, radius: number, treeHeight: number): [number, number, number] => {
  const h = Math.random() * height;
  const angle = Math.random() * Math.PI * 2;
  const r = Math.sqrt(Math.random()) * radius; 
  return [
    r * Math.cos(angle),
    h - (treeHeight / 2) - height + 0.2,
    r * Math.sin(angle)
  ];
};

export const getSnowGroundPoint = (baseRadius: number, treeHeight: number, trunkHeight: number): [number, number, number] => {
  const angle = Math.random() * Math.PI * 2;
  const r = Math.sqrt(Math.random()) * baseRadius;
  return [
    r * Math.cos(angle),
    -(treeHeight / 2) - trunkHeight + 0.05 + (Math.random() * 0.1),
    r * Math.sin(angle)
  ];
};

export const getGiftOnSnowPoint = (baseRadius: number, treeHeight: number, trunkHeight: number): [number, number, number] => {
  const angle = Math.random() * Math.PI * 2;
  const r = Math.sqrt(Math.random()) * (baseRadius * 0.85);
  return [
    r * Math.cos(angle),
    -(treeHeight / 2) - trunkHeight + 0.25,
    r * Math.sin(angle)
  ];
};

/**
 * Creates a generic star shape.
 * @param points Number of points (e.g., 5 for pentagram)
 * @param outerRadius Distance to the tips
 * @param innerRadius Distance to the inner corners
 */
export const createStarShape = (points: number, outerRadius: number, innerRadius: number) => {
  const shape = new THREE.Shape();
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points;
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
};
