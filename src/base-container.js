
import {mesh, utils } from 'pixi.js';
import _ from 'lodash';

export default class BaseContainer extends mesh.NineSlicePlane {
  constructor(config, path) {
    let cfg = config;

    if (path) {
      cfg = _.extends(
        {
          slice: [10, 10, 10, 10],
          anchor: {x: 0.5, y: 0.5},
          width: 100,
          height: 100,
          x: 0,
          y: 0
        },
        _.get(config, path)
      );
    }

    super(utils.TextureCache[cfg.texture], cfg.slice[0], cfg.slice[1], cfg.slice[2], cfg.slice[3]);
    this.anchor.x = cfg.anchor.x;
    this.anchor.y = cfg.anchor.y;
    this.x = cfg.x;
    this.y = cfg.y;

  }
}

