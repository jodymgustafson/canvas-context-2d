import { createCanvas, loadImage, Canvas } from "canvas";
import { CanvasContext2D, toRadians } from "..";

describe("When draw to canvas", () => {
    const canvas = createCanvas(10, 10);
    const context = new CanvasContext2D(canvas as unknown as HTMLCanvasElement);

    beforeEach(() => {
        context.clear();
    });

    describe("When draw gradients", () => {
        it("should draw default horizontal linear gradient", () => {
            context.drawLinearGradient(0, 0, 10, 10, 0, "red", "blue");
            expect(context.toDataUrl()).toBe(HORIZ_LINEAR_GRADIENT);
        });

        it("should draw linear gradient with color stops at 45 degrees", () => {
            context.drawLinearGradient(0, 0, 10, 10, toRadians(45),
                { color: "red", offset: 0 },
                { color: "orange", offset: .2 },
                { color: "yellow", offset: .4 },
                { color: "green", offset: .6 },
                { color: "blue", offset: .8 },
                { color: "purple", offset: 1 }
            );
            expect(context.toDataUrl()).toBe(ANGLE_LINEAR_GRADIENT);
        });

        it("should draw default radial gradient", () => {
            context.drawRadialGradient(5, 5, 5, "white", "blue");
            expect(context.toDataUrl()).toBe(DFLT_RADIAL_GRADIENT);
        });

        it("should draw radial gradient with multiple colors", () => {
            context.drawRadialGradient(5, 5, 5,
                { color: "red", offset: 0 },
                { color: "orange", offset: .2 },
                { color: "yellow", offset: .4 },
                { color: "green", offset: .6 },
                { color: "blue", offset: .8 },
                { color: "purple", offset: 1 }
            );
            expect(context.toDataUrl()).toBe(MULTI_RADIAL_GRADIENT);
        });
    });

    describe("When draw images", () => {
        it("should draw image", async () => {
            await loadImage(TEST_IMAGE_8).then(img => {
                context.drawImage(img as any, 0, 0, 10, 10);
                expect(context.toDataUrl()).toBe(DRAW_IMAGE);
            });
        });
    });

    describe("When draw rectangles", () => {
        it("should draw rectangle", () => {
            context.strokeStyle("green").drawRect(0, 0, 10, 10);
            expect(context.toDataUrl()).toBe(RECT);
        });
        it("should fill rectangle", () => {
            context.fillStyle("red").fillRect(0, 0, 10, 10);
            expect(context.toDataUrl()).toBe(FILL_RECT);
        });
    });

    describe("When draw rounded rectangles", () => {
        it("should draw rounded rectangle", () => {
            context.strokeStyle("green").drawRoundedRect(0, 0, 10, 10, 4);
            expect(context.toDataUrl()).toBe(ROUND_RECT);
        });
        it("should fill rounded rectangle", () => {
            context.fillStyle("green").fillRoundedRect(0, 0, 10, 10, 4);
            expect(context.toDataUrl()).toBe(FILL_ROUND_RECT);
        });
    });

    describe("When draw text", () => {
        it("should draw text", () => {
            context.font("8px sans-serif").strokeStyle("green").textBaseline("top").drawText("Test", 0, 0);
            expect(context.toDataUrl()).toBe(TEXT);
        });
        it("should fill text", () => {
            context.font("8px sans-serif").fillStyle("green").textBaseline("top").fillText("Test", 0, 0);
            expect(context.toDataUrl()).toBe(FILL_TEXT);
        });
    });

    // describe("When draw patterns", () => {
    //     it("should draw default pattern", async () => {
    //         await loadImage(TEST_IMAGE_8).then(img => {
    //             //context.drawImage(img as any, 0, 0);
    //             let pat = context.createPattern(img as any);
    //             context.drawPattern(0, 0, 10, 10, pat);
    //             // context.drawPattern(200, 100, 100, 100, img, CanvasContext2D.Repetition.repeatY);
    //             // context.drawPattern(200, 100, 100, 100, img, CanvasContext2D.Repetition.repeatX);
    //             expect(context.toDataUrl()).toBe("");
    //         });
    //     });
    // });
});
