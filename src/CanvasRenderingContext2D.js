import {webviewTarget, webviewProperties, webviewMethods} from './webview-binders';
import {Image} from './Image';

@webviewTarget('context2D')
@webviewProperties({
  fillStyle: '#000',
  font: '10px sans-serif',
  globalAlpha: 1.0,
  globalCompositeOperation: 'source-over',
  lineCap: 'butt',
  lineDashOffset: 0.0,
  lineJoin: 'miter',
  lineWidth: 1.0,
  miterLimit: 10.0,
  shadowBlur: 0,
  shadowColor: 'rgba(0,0,0,0)',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  strokeStyle: '#000',
  textAlign: 'start',
  textBaseline: 'alphabetic',
})
@webviewMethods([
  'arc',
  'arcTo',
  'beginPath',
  'bezierCurveTo',
  'clearRect',
  'clip',
  'closePath',
  'createImageData',
  'createLinearGradient',
  'createPattern',
  'createRadialGradient',
  'drawFocusIfNeeded',
  'drawImage',
  'drawWidgetAsOnScreen',
  'drawWindow',
  'fill',
  'fillRect',
  'fillText',
  'getImageData',
  'getLineDash',
  'isPointInPath',
  'isPointInStroke',
  'lineTo',
  'measureText',
  'moveTo',
  'putImageData',
  'quadraticCurveTo',
  'rect',
  'restore',
  'rotate',
  'save',
  'scale',
  'setLineDash',
  'setTransform',
  'stroke',
  'strokeRect',
  'strokeText',
  'transform',
  'translate',
])
export default class CanvasRenderingContext2D {
  constructor(canvas) {
    this.canvas = canvas;
  }

  loadAndDrawImages(urls) {
    return new Promise((resolve, reject) => {
      let loadedImages = 0;
      const numImages = urls.length;
      urls.forEach(url => {
        const img = new Image(this.canvas);
        img.src = url;
        img.addEventListener('load', () => {
          this.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
          if (++loadedImages >= numImages) {
            resolve();
          }
        });
      });
    })
  }

  postMessage(message) {
    return this.canvas.postMessage(message);
  }
}
