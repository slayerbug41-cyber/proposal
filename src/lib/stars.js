// Shared, render-free control surface for the StarField canvas.
export const starState = {
  speed: 0.2,
  targetSpeed: 0.2,
  brightness: 0,
  targetBrightness: 0.5,
};

export function setStars({ speed, brightness } = {}) {
  if (speed != null) starState.targetSpeed = speed;
  if (brightness != null) starState.targetBrightness = brightness;
}
