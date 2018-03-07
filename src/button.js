
import { Text } from 'pixi.js';
import BaseContainer from './base-container.js';
import _ from 'lodash';
import { State } from 'smart-animator';

export default class Button extends BaseContainer {
  constructor(config, path) {
    let cfg = config;

    if (path) {
      cfg = _.extends(
        {
          name: 'button',
          texts: {
            main: {
              value: 'Button',
              dx: 0,
              dy: 0,
              style: {
                fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center'
              }
            }
          },
          states: {
            release: {state: {from: {tint: 0xFFFFFF}, time: 0}},
            over: {state: {from: {tint: 0xFF00FF}, time: 0}},
            press: {state: {from: {tint: 0xFF0000}, time: 0}},
            disable: {state: {from: {tint: 0x555555}, time: 0}}
          }
        },
        _.get(config, path)
      );
    }

    super(cfg, path);
    this.texts = {};
    _.forEach(cfg.texts, (value, key) => {
      this.texts[key] = this.addChild(new Text(value.value, value.style));
      this.texts[key] = value.dx;
      this.texts[key] = value.dy;
    });
    this.__state = new State(cfg.states, this).change('release');
    this.interactive = true;
    this.buttonMode = true;
    this
      .on('pointerdown', this.onButtonDown)
      .on('pointerup', this.onButtonUp)
      .on('pointerupoutside', this.onButtonUp)
      .on('pointerover', this.onButtonOver)
      .on('pointerout', this.onButtonOut);

  }

  onButtonDown() {
    this.state = 'press';
  }

  onButtonUp() {
    this.state = 'over';
  }

  onButtonOver() {
    this.state = 'over';
  }

  onButtonOut() {
    this.state = 'release';
  }

  set state(value) {
    this.__state.change(value);
  }

  get state() {
    return this.__state.current;
  }

}
