import {
    _decorator, Component, Node, input, Input, EventKeyboard, KeyCode, Vec2,
    RigidBody2D, Contact2DType, IPhysics2DContact, Label, BoxCollider2D
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('player')
export class player extends Component {
    @property({ type: Label })
    private scoreLabel: Label | null = null;

    private score: number = 0;
    private collider: BoxCollider2D | null = null;
    private rigidbody: RigidBody2D | null = null;

    private direction: number = 0;
    private walk_force: number = 1000;
    private jump_force: number = 35000;

    onLoad() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    start() {
        this.rigidbody = this.node.getComponent(RigidBody2D);
        this.collider = this.node.getComponent(BoxCollider2D);

        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    update(deltaTime: number) {
        if (this.rigidbody && this.direction !== 0) {
            this.rigidbody.applyForceToCenter(new Vec2(this.direction * this.walk_force, 0), true);
        }
    }

    onBeginContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.node.name === "star") {
            const starComponent = otherCollider.node.getComponent("Star") as any;
            if (starComponent && typeof starComponent.destroyStar === 'function') {
                starComponent.destroyStar();
            } else {
                otherCollider.node.destroy();
            }

            this.score++;
            if (this.scoreLabel) {
                this.scoreLabel.string = "Score: " + this.score;
            }
        }
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
            case KeyCode.ARROW_LEFT: {
                this.direction = -1;
                break;
            }
            case KeyCode.KEY_D:
            case KeyCode.ARROW_RIGHT: {
                this.direction = 1;
                break;
            }
            case KeyCode.SPACE:
            case KeyCode.ARROW_UP: {
                if (this.rigidbody) {
                    this.rigidbody.applyForceToCenter(new Vec2(0, this.jump_force), true);
                }
                break;
            }
            default:
                break;
        }
    }

    onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
            case KeyCode.ARROW_LEFT:
            case KeyCode.KEY_D:
            case KeyCode.ARROW_RIGHT: {
                this.direction = 0;
                break;
            }
            default:
                break;
        }
    }
}
