import { Sprite } from "./sprite.js";

export class StateManager {
    constructor(ctx) {
        this.ctx = ctx;
        this.sprites = {
            idle: new Sprite(ctx, '../sprites/enchantress/Idle.png', 128, 128, 5, 350, 200, 200),
            jump: new Sprite(ctx, '../sprites/enchantress/Jump.png', 128, 128, 8, 100, 200, 200),
            dead: new Sprite(ctx, '../sprites/enchantress/Dead.png', 128, 128, 5, 100, 200, 200),
            attack: new Sprite(ctx, '../sprites/enchantress/Attack_1.png', 128, 128, 6, 80, 200, 200)
        }
        this.current = this.sprites.idle;
    };

    setState(state, revertToIdle = false) {
        if (!this.sprites[state]) return;
        if (this.current === this.sprites[state]) return;
        this.current = this.sprites[state];
        if (revertToIdle) {
            const sprite = this.sprites[state];
            const duration = sprite.frameCount * sprite.frameSpeed;
            
            setTimeout(() => {
                this.current = this.sprites.idle;
            }, duration);
        }
    }

    update(timestamp) {
        this.current.draw(timestamp);
    }
}

