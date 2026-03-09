/**
 * CanvasLayer.jsx
 * MatrixCityScene is now self-contained (owns its own Canvas,
 * EffectComposer, fog, and camera). Just mount it here.
 */
import MatrixCityScene from './city/MatrixCityScene';

export default function CanvasLayer() {
  return <MatrixCityScene />;
}
