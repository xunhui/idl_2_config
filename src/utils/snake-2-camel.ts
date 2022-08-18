export function snake2Camel(snakeCaseStr: string) {
  return snakeCaseStr.split('_').map(piece => piece.charAt(0).toUpperCase() + piece.slice(1)).join(' ');
}