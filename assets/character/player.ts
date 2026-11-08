import {
    _decorator, Component, Node, input, Input, EventKeyboard, KeyCode, Vec2,
    RigidBody2D, Collider2D, BoxCollider2D, Contact2DType, IPhysics2DContact, Label
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('player')
export class player extends Component {
    @property({ type: Label })

    private scoreLabel: Label | null = null;
    private score: number = 0;

    private collider: any;

    private rigidbody: any;
    private direction: number = 0;
    private walk_force: number = 1000;
    private jump_force: number = 35000;

    onLoad() {
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEventType.KEY_UP, this.onKeyUp, this);
    }

    start() {
        this.rigidbody = this.node.getComponent(RigidBody2D);
        this.collider = this.node.getComponent(BoxCollider2D);
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    update(deltaTime: number) {
        this.rigidbody.applyForceToCenter(new Vec2(this.direction * this.walk_force, 0), true);
    }

    onBeginContact(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {

        if (otherCollider.name == "star<BoxCollider2D>") {
            otherCollider.node.getComponent("Star").destroyStar();
            this.score++;
            this.scoreLabel.string = "Score: " + this.score;
        }
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {

            case macro.KEY.a:
            case macro.KEY.left: {
                this.direction = 0;
                break;
            }

            case macro.KEY.d:
            case macro.KEY.right: {
                this.direction = 0;
                break;
            }

            default:
                break;
        }
    }

    onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {

            case macro.KEY.a:
            case macro.KEY.left: {
                this.direction = -1;
                break;
            }

            case macro.KEY.d:
            case macro.KEY.right: {
                this.direction = 1;
                break;
            }

            case macro.KEY.space:
            case macro.KEY.up: {
                this.rigidbody.applyForceToCenter(new Vec2(0, this.jump_force),
                    true);
                break;
            }
            default:
                break;
        }
    }
}