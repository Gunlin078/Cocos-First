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
    start() {

    }

    update(deltaTime: number) {
        
    }
}


