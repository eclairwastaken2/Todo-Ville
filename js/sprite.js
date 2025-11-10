export class Sprite {
    constructor(ctx, imagePath, frameWidth, frameHeight, frameCount, frameSpeed, ctxWidth, ctxHeight) {
        this.ctx = ctx;
        this.image = new Image(); 
        this.image.src = imagePath; 
        this.frameWidth = frameWidth; 
        this.frameHeight = frameHeight; 
        this.frameCount = frameCount; 
        this.frameSpeed = frameSpeed;
        this.ctxWidth = ctxWidth; 
        this.ctxHeight = ctxHeight; 
        this.frameIndex = 0; 
        this.lastFrameTime = 0; 
    }

    draw(timestamp) {
        if (!this.lastFrameTime) this.lastFrameTime = timestamp; 
        const elapsed = timestamp - this.lastFrameTime;
        if (elapsed > this.frameSpeed) {
            this.frameIndex = (this.frameIndex + 1) % this.frameCount; 
            this.lastFrameTime = timestamp; 
        }

        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.drawImage(
            this.image,
            this.frameIndex * this.frameWidth, 
            0, 
            this.frameWidth,
            this.frameHeight,
            0, 
            0, 
            this.ctxWidth, 
            this.ctxHeight
        ) 
    }

    reset() {
        this.frameIndex = 0;
        this.lastFrameTime = 0;
    }
}