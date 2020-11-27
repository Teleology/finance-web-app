import { decomposeColor, recomposeColor } from '@material-ui/core';

const getContrastColor = (color: string): string => {
  const colorObject = decomposeColor(color);
  const r = 255 - colorObject.values[0];
  const g = 255 - colorObject.values[1];
  const b = 255 - colorObject.values[2];
  return recomposeColor({ type: 'rgb', values: [r, g, b] });
};

export { getContrastColor };
