'use strict';

import Vector2 from './vector2';

export default class MouseManager {

    constructor() {
        this.position = new Vector2(0,0);
        this.lastPosition = this.position;
    }

    mousePos(element, event) {
        let rect = element.getBoundingClientRect();
        this.lastPosition = this.position;
        this.position = new Vector2(event.clientX - rect.left, event.clientY - rect.top);
        return this.position;
    }

    get x() {
        return this.position.x;
    }

    get y() {
        return this.position.y;
    }

    toString() {
        return "x: "+this.position.x+" y: "+this.position.y;
    }
}