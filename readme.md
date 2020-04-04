# CanvasContext2D
A wrapper and high level drawing methods for the HTMLCanvasElement's 2D context.

## Install
`npm install canvas-context-2d`

Type definition files are included in this package.

## Description
This package defines a class named `CanvasContext2D` which contains high level drawing methods to make it easier to draw to an HTML5 canvas element.

### Constructor
To create an instance simply call the constructor passing it a canvas element.

```javascript
const context2d = new CanvasContext2D(document.querySelector("canvas"));
```

In addition to HTML5 canvas it may also be used with a node canvas created using the canvas npm package. https://www.npmjs.com/package/canvas

```javascript
const canvas = createCanvas(1024, 768);
const context = new CanvasContext2D(canvas);
```

### Usage
The canvas context built into HTML5 only contains primitive drawing methods. This class makes it easier to draw to the canvas by providing high level drawing methods such as `drawLine()`, `drawRect()`, `drawCircle()` and many more.

This class also wraps all of the primitive drawing methods and returns an instance of the CanvasContext2D class. This allows you to easily chain together drawings.

```javascript
context2d.save()
    .translate(x, y)
    .scale(scaleX, scaleY)
    .beginPath()
    .arc(0, 0, radius, 0, TWO_PI, true)
    .closePath()
    .restore();
```

### High level drawing methods
- drawImage, drawClippedImage, drawRotatedImage
- drawLine, drawLines
- drawCircle, fillCircle
- drawArc, fillArc
- drawEllipse, fillEllipse
- drawRect, fillRect
- drawRoundedRect, fillRoundedRect
- drawShape, fillShape
- drawText, fillText
- drawLinearGradient, drawRadialGradient
- drawPattern
