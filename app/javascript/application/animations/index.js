require('velocity-animate');
require('velocity-animate/velocity.ui');

import { velocityHelpers } from 'velocity-react'

export default {
  Page: {
    In: velocityHelpers.registerEffect({
      defaultDuration: 500,
      calls: [
        [ { translateX: 0, opacity: 1 } ]
      ]
    }, 'In'),
    Left: velocityHelpers.registerEffect({
      defaultDuration: 500,
      calls: [
        [ { translateX: '-100%', opacity: 0 } ]
      ]
    }, 'Out'),
    Right: velocityHelpers.registerEffect({
      defaultDuration: 500,
      calls: [
        [ { translateX: '100%', opacity: 0 } ]
      ]
    }, 'Out')
  },
  Login: {
    Screen: {
      In: velocityHelpers.registerEffect({
        defaultDuration: 500,
        calls: [
          [ { translateY: [0, [0.5, 0, 0.5, 1.25]] } ]
        ]
      }, 'In'),
      Out: velocityHelpers.registerEffect({
        defaultDuration: 500,
        calls: [
          [ { translateY: ['-110%', [0.5, -0.25, 0.5, 1]] } ]
        ]
      }, 'Out'),
    },
    Field: {
      In: velocityHelpers.registerEffect({
        calls: [
          [{
            transformPerspective: [800, 800],
            transformOriginX: ['50%', '50%'],
            transformOriginY: ['0%', '0%'],
            marginBottom: 0,
            opacity: 1,
            rotateX: [0, -90],
          }, 1, { easing: 'spring', display: 'block' }]
        ]
      }),
      Out: velocityHelpers.registerEffect({
        calls: [
          [{
            transformPerspective: [800, 800],
            transformOriginX: ['50%', '50%'],
            transformOriginY: ['0%', '0%'],
            marginBottom: -64,
            opacity: 0,
            rotateX: -90,
          }, 1, { easing: 'ease-out', display: 'block' }]
        ]
      })
    }
  }
}
