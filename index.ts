/** This allows for other canvas implementations */
type Canvas = {
    width: number;
	height: number;
    getContext(contextId: "2d"): CanvasRenderingContext2D|null;
    toDataURL(): string;
}

/** Defines a color stop for creating gradients */
export type ColorStop = {
    /** Any valid CSS color specification */
    color: string;
    /** A number between 0 and 1.0 */
    offset: number;
}

///////////////////////////////////////////////////////////////////////////
// These types aren't defined for some reason
///////////////////////////////////////////////////////////////////////////
export type CanvasPatternRepetition = "repeat" | "repeat-x" | "repeat-y" | "no-repeat";
export type CanvasCompositeOperation =
    "source-over" | "source-atop" | "source-in" | "source-out" |
    "destination-over" | "destination-atop" | "destination-in" | "destination-out" |
    "lighter" | "copy" | "xor";

///////////////////////////////////////////////////////////////////////////////
// Constants
///////////////////////////////////////////////////////////////////////////////
export const PI_OVER_180 = Math.PI / 180;
export const PI_OVER_2 = Math.PI / 2;
export const TWO_PI = 2 * Math.PI;
export const TAU = 2 * Math.PI;

/**
 * Converts degrees to radians
 * @param degrees
 */
export function toRadians(degrees: number): number {
    return PI_OVER_180 * degrees;
}

/**
 * Wrapper and high level drawing methods for HTMLCanvasElement 2D context
 */
export class CanvasContext2D {
    readonly canvas: Canvas;
    readonly context: CanvasRenderingContext2D;

    /**
     * Gets an instance for a canvas
     * @param canvas Canvas to get a context for
     */
    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d") as CanvasRenderingContext2D;
    }

    ///////////////////////////////////////////////////////////////////////////////
    // Canvas methods
    ///////////////////////////////////////////////////////////////////////////////

    toDataUrl(): string {
        return this.canvas.toDataURL();
    }

    ///////////////////////////////////////////////////////////////////////////
    // Stroke and fill styles
    ///////////////////////////////////////////////////////////////////////////

    fillStyle(gradient: CanvasGradient): CanvasContext2D;
    fillStyle(pattern: CanvasPattern): CanvasContext2D;
    fillStyle(color: string): CanvasContext2D;
    fillStyle(): string|CanvasGradient|CanvasPattern;
    fillStyle(style?: string|CanvasGradient|CanvasPattern): string|CanvasGradient|CanvasPattern|CanvasContext2D {
        if (style === undefined) {
            return this.context.fillStyle;
        }
        this.context.fillStyle = style;
        return this;
    }

    strokeStyle(gradient: CanvasGradient): CanvasContext2D;
    strokeStyle(pattern: CanvasPattern): CanvasContext2D;
    strokeStyle(color: string): CanvasContext2D;
    strokeStyle(): string|CanvasGradient|CanvasPattern;
    strokeStyle(style?: string|CanvasGradient|CanvasPattern): string|CanvasGradient|CanvasPattern|CanvasContext2D {
        if (style === undefined) {
            return this.context.strokeStyle;
        }
        this.context.strokeStyle = style;
        return this;
    }

    ///////////////////////////////////////////////////////////////////////////
    // Line properties
    ///////////////////////////////////////////////////////////////////////////

    lineWidth(): number;
    lineWidth(width: number): CanvasContext2D;
    lineWidth(width?: number): number|CanvasContext2D {
        if (width === undefined) {
            return this.context.lineWidth;
        }
        this.context.lineWidth = width;
        return this;
    }

    lineCap(lineCap: CanvasLineCap): CanvasContext2D;
    lineCap(): CanvasLineCap;
    lineCap(lineCap?: CanvasLineCap): CanvasLineCap|CanvasContext2D {
        if (lineCap === undefined) {
            return this.context.lineCap;
        }
        this.context.lineCap = lineCap;
        return this;
    }

    lineJoin(join: CanvasLineJoin): CanvasContext2D;
    lineJoin(): CanvasLineJoin;
    lineJoin(join?: CanvasLineJoin): CanvasLineJoin|CanvasContext2D {
        if (join === undefined) {
            return this.context.lineJoin;
        }
        this.context.lineJoin = join;
        return this;
    }

    miterLimit(limit: number): CanvasContext2D;
    miterLimit(): number;
    miterLimit(limit?: number): number|CanvasContext2D {
        if (limit === undefined) {
            return this.context.miterLimit;
        }
        this.context.miterLimit = limit;
        return this;
    }

    lineDash(sequence: number[]): CanvasContext2D;
    lineDash(): number[];
    lineDash(sequence?: number[]): number[]|CanvasContext2D {
        if ("setLineDash" in this.context) {
            if (sequence === undefined) {
                return this.context.getLineDash();
            }
            this.context.setLineDash(sequence);
            return this;
        }
        else {
            console.error(() => "setLineDash not supported by the browser");
        }

        return null;
    }

    ///////////////////////////////////////////////////////////////////////////
    // Shadow properties
    ///////////////////////////////////////////////////////////////////////////

    shadowColor(color: string): CanvasContext2D;
    shadowColor(): string;
    shadowColor(color?: string): string|CanvasContext2D {
        if (color === undefined) {
            return this.context.shadowColor;
        }
        this.context.shadowColor = color;
        return this;
    }

    shadowBlur(size: number): CanvasContext2D;
    shadowBlur(): number;
    shadowBlur(size?: number): number|CanvasContext2D {
        if (size === undefined) {
            return this.context.shadowBlur;
        }
        this.context.shadowBlur = size;
        return this;
    }

    shadowOffsetX(offset: number): CanvasContext2D;
    shadowOffsetX(): number;
    shadowOffsetX(offset?: number): number|CanvasContext2D {
        if (offset === undefined) {
            return this.context.shadowOffsetX;
        }
        this.context.shadowOffsetX = offset;
        return this;
    }

    shadowOffsetY(offset: number): CanvasContext2D;
    shadowOffsetY(): number;
    shadowOffsetY(offset?: number): number|CanvasContext2D {
        if (offset === undefined) {
            return this.context.shadowOffsetY;
        }
        this.context.shadowOffsetY = offset;
        return this;
    }

    shadowOffset(offsetX: number, offsetY: number): CanvasContext2D;
    shadowOffset(offset: number): CanvasContext2D;
    shadowOffset(): { offsetX: number; offsetY: number };
    shadowOffset(offsetX?: number, offsetY?: number): { offsetX: number; offsetY: number }|CanvasContext2D {
        if (offsetX === undefined) {
            return { offsetX: this.shadowOffsetX(), offsetY: this.shadowOffsetY() };
        }
        this.shadowOffsetX(offsetX);
        this.shadowOffsetY(offsetY === undefined ? offsetX : offsetY);
        return this;
    }

    /** Sets all of the shadow styles in one call */
    shadowStyle(color: string, offsetX: number, offsetY: number, blur: number): CanvasContext2D {
        return this.shadowColor(color)
            .shadowOffsetX(offsetX)
            .shadowOffsetY(offsetY)
            .shadowBlur(blur);
    }

    ///////////////////////////////////////////////////////////////////////////
    // Text properties
    ///////////////////////////////////////////////////////////////////////////

    font(font: string): CanvasContext2D;
    font(): string;
    font(font?: string): string|CanvasContext2D {
        if (font === undefined) {
            return this.context.font;
        }
        this.context.font = font;
        return this;
    }

    textAlign(alignment: CanvasTextAlign): CanvasContext2D;
    textAlign(): CanvasTextAlign;
    textAlign(alignment?: CanvasTextAlign): string|CanvasContext2D {
        if (alignment === undefined) {
            return this.context.textAlign;
        }
        this.context.textAlign = alignment;
        return this;
    }

    /** Sets text baseline (use CanvasContext2D.TextBaseline) */
    textBaseline(baseline: CanvasTextBaseline): CanvasContext2D;
    textBaseline(): CanvasTextBaseline;
    textBaseline(baseline?: CanvasTextBaseline): CanvasTextBaseline|CanvasContext2D {
        if (baseline === undefined) {
            return this.context.textBaseline;
        }
        this.context.textBaseline = baseline;
        return this;
    }

    ///////////////////////////////////////////////////////////////////////////
    // Compositing properties
    ///////////////////////////////////////////////////////////////////////////

    /** Sets global alpha */
    globalAlpha(alpha: number): CanvasContext2D;
    globalAlpha(): number;
    globalAlpha(alpha?: number): number|CanvasContext2D {
        if (alpha === undefined) {
            return this.context.globalAlpha;
        }
        this.context.globalAlpha = alpha;
        return this;
    }

    /** Sets global compositing operation (use CanvasContext2D.CompositeOperation) */
    globalCompositeOperation(operation: string): CanvasContext2D;
    globalCompositeOperation(): string
    globalCompositeOperation(operation?: string): string|CanvasContext2D {
        if (operation === undefined) {
            return this.context.globalCompositeOperation;
        }
        this.context.globalCompositeOperation = operation;
        return this;
    }

    ///////////////////////////////////////////////////////////////////////////
    // Clearing methods
    ///////////////////////////////////////////////////////////////////////////

    /** Clears the entire canvas */
    clear(): CanvasContext2D {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        return this;
    }

    /** Clears a portion of the canvas */
    clearRect(x: number, y: number, w: number, h: number): CanvasContext2D {
        this.context.clearRect(x, y, w, h);
        return this;
    }

    ///////////////////////////////////////////////////////////////////////////
    // Context state methods
    ///////////////////////////////////////////////////////////////////////////

    /** Pushes the current state of the context */
    save(): CanvasContext2D {
        this.context.save();
        return this;
    }
    /** Restores the state of the context from the last save */
    restore(): CanvasContext2D {
        this.context.restore();
        return this;
    }

    ///////////////////////////////////////////////////////////////////////////
    // Transformation methods
    ///////////////////////////////////////////////////////////////////////////

    /** Sets the scale transform of the canvas */
    scale(scale: number): CanvasContext2D;
    /** Sets the x and y scale transform of the canvas */
    scale(xs: number, ys: number): CanvasContext2D;
    scale(xs: number, ys?: number): CanvasContext2D {
        this.context.scale(xs, ys || xs);
        return this;
    }
    
    /** moves the origin to the specified location */
    translate(x: number, y: number): CanvasContext2D {
        this.context.translate(x, y);
        return this;
    }
    
    /** Rotates the canvas */
    rotate(radians: number): CanvasContext2D {
        this.context.rotate(radians);
        return this;
    }
    
    /**
     * Sets the current transformation matrix
     * m11 Scales the drawing horizontally
     * m12 Skews the drawing horizontally
     * m21 Scales the drawing vertically
     * m22 Skews the drawing vertically
     * dx Moves the the drawing horizontally
     * dy Moves the the drawing vertically
     */
    transform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): CanvasContext2D {
        this.context.transform(m11, m12, m21, m22, dx, dy);
        return this;
    }
    
    /** Resets to the identity matrix then applies the new transformation matrix */
    setTransform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): CanvasContext2D {
        this.context.setTransform(m11, m12, m21, m22, dx, dy);
        return this;
    }

    ///////////////////////////////////////////////////////////////////////////
    // Image methods
    ///////////////////////////////////////////////////////////////////////////

    /**
     * Draws an image to the canvas and optionally scales it
     * @param image
     * @param x Destination x
     * @param y Destination y
     * @param w Width to scale image to (optional)
     * @param h Height to scale image to (optional)
     */
    drawImage(image: CanvasImageSource, x: number, y: number, w: number = image.width as number, h: number = image.height as number): CanvasContext2D {
        this.context.drawImage(image, x, y, w, h);
        return this;
    }

    /**
     * Draws a portion of an image to the canvas
     * @param image The source image
     * @param sx Clip area x
     * @param sy Clip area y
     * @param sw Clip area w
     * @param sh Clip area h
     * @param x  Destination x
     * @param y  Destination y
     * @param w  Destination w (optional, default is clip area w)
     * @param h  Destination h (optional, default is clip area h)
     */
    drawClippedImage(image: CanvasImageSource, sx: number, sy: number, sw: number, sh: number, x: number, y: number, w: number = sw, h: number = sh): CanvasContext2D {
        this.context.drawImage(image, sx, sy, sw, sh, x, y, w, h);
        return this;
    }

    /**
     * Draws an image rotating about its center and optionally scales it
     * @param image
     * @param x Destination x
     * @param y Destination y
     * @param angle Angle in radians (0 to 2PI)
     * @param w Width to scale image to (optional)
     * @param h Height to scale image to (optional)
     */
    drawRotatedImage(image: CanvasImageSource, x: number, y: number, angle: number, width: number = image.width as number, height: number = image.height as number): CanvasContext2D {
        // Draw image at its center
        const cx = width / 2;
        const cy = height / 2;
        return this.save()
            .translate(x, y)
            .rotate(angle)
            .drawImage(image, -cx, -cy, width, height)
            .restore();
    }

    ///////////////////////////////////////////////////////////////////////////
    // Line methods
    ///////////////////////////////////////////////////////////////////////////

    drawLine(x1: number, y1: number, x2: number, y2: number): CanvasContext2D {
        return this.beginPath()
            .moveTo(x1, y1)
            .lineTo(x2, y2)
            .stroke();
    }
    
    /**
     * Draws the lines defined by the set of coordinates
     * @param coords An array containing sets of x and y coordinates (ex: [x1, y1, x2, y2, ...])
     */
    drawLines(...coords: number[]): CanvasContext2D {
        return this.definePolyline(coords).stroke();
    }

    ///////////////////////////////////////////////////////////////////////////
    // Circle/Arc methods
    ///////////////////////////////////////////////////////////////////////////

    drawCircle(x: number, y: number, radius: number): CanvasContext2D {
        this.beginPath()
            .arc(x, y, radius, 0, TWO_PI, true)
            .closePath()
            .stroke();
        return this;
    }

    fillCircle(x: number, y: number, radius: number): CanvasContext2D {
        this.beginPath()
            .arc(x, y, radius, 0, TWO_PI, true)
            .closePath()
            .fill();
        return this;
    }

    drawArc(x: number, y: number, radius: number, start: number, end: number, anticlockwise = false): CanvasContext2D {
        this.beginPath()
            .arc(x, y, radius, start, end, anticlockwise)
            .stroke();
        return this;
    }

    fillArc(x: number, y: number, radius: number, start: number, end: number, anticlockwise = false): CanvasContext2D {
        this.beginPath()
            .arc(x, y, radius, start, end, anticlockwise)
            .fill();
        return this;
    }

    drawEllipse(x: number, y: number, rx: number, ry: number): CanvasContext2D {
        if (rx === ry) return this.drawCircle(x, y, rx);
        this.defineEllipse(x, y, rx, ry)
            .stroke();
        return this;
    }

    fillEllipse(x: number, y: number, rx: number, ry: number): CanvasContext2D {
        if (rx === ry) return this.fillCircle(x, y, rx);
        this.defineEllipse(x, y, rx, ry)
            .fill();
        return this;
    }

    ///////////////////////////////////////////////////////////////////////////
    // Rectangle methods
    ///////////////////////////////////////////////////////////////////////////

    drawRect(x: number, y: number, w: number, h: number): CanvasContext2D {
        this.context.strokeRect(x, y, w, h);
        return this;
    }

    fillRect(x: number, y: number, w: number, h: number): CanvasContext2D {
        this.context.fillRect(x, y, w, h);
        return this;
    }
    /**
     * Draws a rounded rectangle
     * @param r radius of the corners
     */
    drawRoundedRect(x: number, y: number, w: number, h: number, r: number): CanvasContext2D;
    /**
     * Draws a rounded rectangle
     * @param radii The radii of each corner (clockwise from upper-left)
     */
    drawRoundedRect(x: number, y: number, w: number, h: number, radii: number[]): CanvasContext2D;
    drawRoundedRect(x: number, y: number, w: number, h: number, r: number|number[]): CanvasContext2D {
        if (typeof r === "number") {
            r = [r, r, r, r];
        }
        return this.defineRoundedRect(x, y, w, h, r).stroke();
    }

    /**
     * Draws a filled rounded rectangle
     * @param r radius of the corners
     */
    fillRoundedRect(x: number, y: number, w: number, h: number, r: number): CanvasContext2D;
    /**
     * Draws a filled rounded rectangle
     * @param radii The radii of each corner (clockwise from upper-left)
     */
    fillRoundedRect(x: number, y: number, w: number, h: number, r: number[]): CanvasContext2D;
    fillRoundedRect(x: number, y: number, w: number, h: number, r: number|number[]): CanvasContext2D {
        if (typeof r === "number") {
            r = [r, r, r, r];
        }
        return this.defineRoundedRect(x, y, w, h, r).fill();
    }

    ///////////////////////////////////////////////////////////////////////////
    // Shape methods
    ///////////////////////////////////////////////////////////////////////////

    /**
     * Draws a shape defined by the set of coordinates
     * @param coords Array of x and y coordinates (ex: [x1, y1, x2, y2, ...])
     */
    drawShape(...coords: number[]): CanvasContext2D {
        return this.definePolyline(coords).closePath().stroke();
    }

    /**
     * Fills a shape defined by the set of coordinates
     * @param coords Array of x and y coordinates (ex: [x1, y1, x2, y2, ...])
     */
    fillShape(...coords: number[]): CanvasContext2D {
        return this.definePolyline(coords).closePath().fill();
    }

    ///////////////////////////////////////////////////////////////////////////
    // Text methods
    ///////////////////////////////////////////////////////////////////////////

    drawText(text: string, x: number, y: number, maxWidth?: number): CanvasContext2D {
        if (maxWidth === undefined) this.context.strokeText(text, x, y);
        else this.context.strokeText(text, x, y, maxWidth);
        return this;
    }

    fillText(text: string, x: number, y: number, maxWidth?: number): CanvasContext2D {
        if (maxWidth === undefined) this.context.fillText(text, x, y);
        else this.context.fillText(text, x, y, maxWidth);
        return this;
    }

    measureText(text: string): TextMetrics {
        return this.context.measureText(text);
    }

    /** Gets the width of text using measureText */
    textWidth(text: string): number {
        return this.context.measureText(text).width;
    }

    ///////////////////////////////////////////////////////////////////////////
    // Gradient/Pattern methods
    ///////////////////////////////////////////////////////////////////////////

    /** Creates a gradient with no color stops */
    createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient;
    /** Creates a gradient from one color to another */
    createLinearGradient(x0: number, y0: number, x1: number, y1: number, color1: string, color2: string): CanvasGradient;
    /** Creates a gradient with multiple color stops */
    createLinearGradient(x0: number, y0: number, x1: number, y1: number, ...colorStops: ColorStop[]): CanvasGradient;
    createLinearGradient(x0: number, y0: number, x1: number, y1: number, ...colorsOrStops: string[]|ColorStop[]): CanvasGradient {
        const gradient = this.context.createLinearGradient(x0, y0, x1, y1);
        return this.addGradientColorStops(gradient, ...colorsOrStops);
    }

    /** Creates a gradient with no color stops */
    createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): CanvasGradient;
    /** Creates a gradient from one color to another */
    createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number, color1: string, color2: string): CanvasGradient;
    /** Creates a gradient with multiple color stops */
    createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number, ...colorsOrStops: ColorStop[]): CanvasGradient;
    createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number, ...colorsOrStops: string[]|ColorStop[]): CanvasGradient {
        const gradient = this.context.createRadialGradient(x0, y0, r0, x1, y1, r1);
        return this.addGradientColorStops(gradient, ...colorsOrStops);
    }

    /**
     * Cerates a pattern from an image
     * @param image
     * @param repetition Type of repetition (Use CanvasContext2D.Repetition), default is repeat.
     */
    createPattern(image: CanvasImageSource, repetition: CanvasPatternRepetition = "repeat"): CanvasPattern {
        return this.context.createPattern(image, repetition) as CanvasPattern;
    }

    /**
     * Draws a gradient rectangle from one color to another
     * @param x
     * @param y
     * @param w
     * @param h
     * @param angle Angle of the gradient in radians [0, pi/2], where 0 is completely horizontal, pi/2 is vertical.
     * @param color1 The start color
     * @param color2 The end color
     */
    drawLinearGradient(x: number, y: number, w: number, h: number, angle: number, color1: string, color2: string): CanvasContext2D;
    /**
     * Draws a gradient rectangle with multiple color stops
     * @param x
     * @param y
     * @param w
     * @param h
     * @param angle Angle of the gradient in radians [0, pi/2], where 0 is completely horizontal, pi/2 is vertical.
     * @param colorStops
     */
    drawLinearGradient(x: number, y: number, w: number, h: number, angle: number, ...colorStops: ColorStop[]): CanvasContext2D;
    drawLinearGradient(x: number, y: number, w: number, h: number, angle: number, ...colorsOrStops: string[]|ColorStop[]): CanvasContext2D {
        if (angle < 0 || angle > PI_OVER_2) {
            throw new Error("CanvasContext2D.drawLinearGradient angle must be between 0 and PI/2");
        }
        let dx = Math.cos(angle);
        let dy = Math.sin(angle);
        let gradient = this.createLinearGradient(x, y, x + dx * w, y + dy * h, ...colorsOrStops as any[]);
        this.save()
            .fillStyle(gradient)
            .fillRect(x, y, w, h)
            .restore();
        return this;
    }

    /** Draws a radial gradient from one color to another */
    drawRadialGradient(x: number, y: number, r: number, outerColor: string, innerColor: string): CanvasContext2D;
    /** Draws a radial gradient with multiple color stops */
    drawRadialGradient(x: number, y: number, r: number, ...colorsOrStops: ColorStop[]): CanvasContext2D;
    drawRadialGradient(x: number, y: number, r: number, ...colorsOrStops: string[]|ColorStop[]): CanvasContext2D {
        const gradient = this.createRadialGradient(x, y, r, x, y, 0, ...colorsOrStops as any[]);
        this.save()
            .fillStyle(gradient)
            .fillCircle(x, y, r)
            .restore();
        return this;
    }

    /** Draws a rectangle with the pattern correctly applied at the origin of the rectangle (not the canvas) */
    drawPattern(x: number, y: number, w: number, h: number, pattern: CanvasPattern): CanvasContext2D;
    /** Draws a rectangle with the pattern correctly applied at the origin of the rectangle (not the canvas) */
    drawPattern(x: number, y: number, w: number, h: number, image: CanvasImageSource, repetition?: string): CanvasContext2D;
    drawPattern(x: number, y: number, w: number, h: number, imageOrPattern: CanvasPattern|CanvasImageSource, repetition: CanvasPatternRepetition = "repeat"): CanvasContext2D {
        const isCanvasPattern = imageOrPattern["setTransform"];
        const pattern = (isCanvasPattern ?
            imageOrPattern as CanvasPattern :
            this.createPattern(imageOrPattern as CanvasImageSource, repetition));
        this.save()
            .fillStyle(pattern)
            .translate(x, y)
            .fillRect(0, 0, w, h)
            .restore();
        return this;
    }

    ///////////////////////////////////////////////////////////////////////////
    // ImageData methods
    ///////////////////////////////////////////////////////////////////////////

    /** Creates ImageData from an existing ImageData */
    createImageData(imageData: ImageData): ImageData;
    /** Creates ImageData of the specified size */
    createImageData(w: number, h: number): ImageData;
    createImageData(imageDataOrW?: number | ImageData, h?: number): ImageData {
        if (h === undefined) {
            return this.context.createImageData(imageDataOrW as ImageData);
        }
        else {
            return this.context.createImageData(imageDataOrW as number, h);
        }
    }

    /** Gets image data for the entire canvas */
    getImageData(): ImageData;
    /** Gets image data for a region of the canvas */
    getImageData(x: number, y: number, w: number, h: number): ImageData;
    getImageData(sx?: number, sy?: number, sw?: number, sh?: number): ImageData {
        return this.context.getImageData(sx || 0, sy || 0, sw || this.canvas.width, sh || this.canvas.height);
    }

    /** Puts image data into the canvas at the top-left */
    putImageData(imageData: ImageData): CanvasContext2D;
    /** Puts image data into the canvas at the specified point */
    putImageData(imageData: ImageData, x: number, y: number): CanvasContext2D;
    /** Puts image data into the canvas at the specified point and offset */
    putImageData(imageData: ImageData, x: number, y: number, destX: number, destY: number): CanvasContext2D;
    /** Puts image data into the canvas at the specified point and offset and scales it */
    putImageData(imageData: ImageData, x: number, y: number, destX: number, destY: number, destW: number, destH: number): CanvasContext2D;
    putImageData(imageData: ImageData, x = 0, y = 0, destX?: number, destY?: number, destW?: number, destH?: number): CanvasContext2D {
        // Passing in undefined values doesn't work so check params
        if (destX === undefined) {
            this.context.putImageData(imageData, x, y);
        }
        else {
            const height = imageData.height;
            const width = imageData.width;
            this.context.putImageData(imageData, x, y, destX || 0, destY || 0, destW || width, destH || height);
        }
        return this;
    }

    ///////////////////////////////////////////////////////////////////////////
    // Primitive Path methods
    ///////////////////////////////////////////////////////////////////////////

    rect(x: number, y: number, w: number, h: number): CanvasContext2D {
        this.context.rect(x, y, w, h);
        return this;
    }

    fill(): CanvasContext2D {
        this.context.fill();
        return this;
    }

    stroke(): CanvasContext2D {
        this.context.stroke();
        return this;
    }

    beginPath(): CanvasContext2D {
        this.context.beginPath();
        return this;
    }

    closePath(): CanvasContext2D {
        this.context.closePath();
        return this;
    }

    moveTo(x: number, y: number): CanvasContext2D {
        this.context.moveTo(x, y);
        return this;
    }

    lineTo(x: number, y: number): CanvasContext2D {
        this.context.lineTo(x, y);
        return this;
    }

    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): CanvasContext2D {
        this.context.quadraticCurveTo(cpx, cpy, x, y);
        return this;
    }

    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): CanvasContext2D {
        this.context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
        return this;
    }

    arc(x: number, y: number, r: number, startRads: number, endRads: number, anticlockwise?: boolean): CanvasContext2D {
        this.context.arc(x, y, r, startRads, endRads, anticlockwise);
        return this;
    }

    arcTo(x1: number, y1: number, x2: number, y2: number, r: number): CanvasContext2D {
        this.context.arcTo(x1, y1, x2, y2, r);
        return this;
    }

    /** Clips drawing to the specified rectangular area */
    setClipRect(x: number, y: number, w: number, h: number): CanvasContext2D {
        this.beginPath()
            .rect(x, y, w, h)
            .clip();
        return this;
    }

    /** Clips drawing to the current path */
    clip(fillRule?: CanvasFillRule): CanvasContext2D;
    /** Clips drawing to the given path */
    clip(path: Path2D, fillRule?: CanvasFillRule): CanvasContext2D;
    clip(pathOrRule?: Path2D|CanvasFillRule, fillRule?: CanvasFillRule): CanvasContext2D {
        if (pathOrRule instanceof Path2D) {
            this.context.clip(pathOrRule as Path2D, fillRule);
        }
        else {
            this.context.clip(pathOrRule as CanvasFillRule);
        }
        return this;
    }

    isPointInPath(x: number, y: number, fillRule?: CanvasFillRule): boolean;
    isPointInPath(path: Path2D, x: number, y: number, fillRule?: CanvasFillRule): boolean;
    isPointInPath(xOrPath: number|Path2D, xy: number, yOrRule?: number|CanvasFillRule, fillRule?: CanvasFillRule): boolean {
        if (typeof xOrPath === "number") {
            return this.context.isPointInPath(xOrPath as number, xy, yOrRule as CanvasFillRule);
        }
        return this.context.isPointInPath(xOrPath as Path2D, xy, yOrRule as number, fillRule);
    }

    ///////////////////////////////////////////////////////////////////////////
    // Private methods
    ///////////////////////////////////////////////////////////////////////////

    /** 
     * Defines the path for a rounded rectangle
     * @param x The top left x coordinate 
     * @param y The top left y coordinate  
     * @param width The width of the rectangle  
     * @param height The height of the rectangle 
     * @param radii The radii of each corner (clockwise from upper-left)
     */
    private defineRoundedRect(x: number, y: number, w: number, h: number, radii: number[]): CanvasContext2D {
        return this.beginPath()
            .moveTo(x + radii[0], y)
            .lineTo(x + w - radii[1], y)
            .quadraticCurveTo(x + w, y, x + w, y + radii[1])
            .lineTo(x + w, y + h - radii[2])
            .quadraticCurveTo(x + w, y + h, x + w - radii[2], y + h)
            .lineTo(x + radii[3], y + h)
            .quadraticCurveTo(x, y + h, x, y + h - radii[3])
            .lineTo(x, y + radii[0])
            .quadraticCurveTo(x, y, x + radii[0], y)
            .closePath();
    }

    /** Defines the path for an ellipse */
    private defineEllipse(x: number, y: number, rx: number, ry: number): CanvasContext2D {
        const radius = Math.max(rx, ry);
        const scaleX = rx / radius;
        const scaleY = ry / radius;
        return this.save()
            .translate(x, y)
            .scale(scaleX, scaleY)
            .beginPath()
            .arc(0, 0, radius, 0, TWO_PI, true)
            .closePath()
            .restore();
    }

    /**
     * Defines the path for a set of coordinates
     * @param coords Set of x and y coordinates
     */
    private definePolyline(coords: number[]): CanvasContext2D {
        this.beginPath()
            .moveTo(coords[0], coords[1]);
        for (let i = 2; i < coords.length; i += 2) {
            this.context.lineTo(coords[i], coords[i + 1]);
        }
        return this;
    }

    private addGradientColorStops(gradient: CanvasGradient, ...colorsOrStops: any[]): CanvasGradient {
        if (colorsOrStops && colorsOrStops.length > 0) {
            if (colorsOrStops.length === 2 && typeof colorsOrStops[0] === "string") {
                gradient.addColorStop(0, colorsOrStops[0]);
                gradient.addColorStop(1, colorsOrStops[1]);
            }
            else {
                for (let i = 0; i < colorsOrStops.length; i++) {
                    const stop = colorsOrStops[i];
                    gradient.addColorStop(stop.offset, stop.color);
                }
            }
        }
        return gradient;
    }
}
