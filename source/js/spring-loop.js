// What a nice battery you have there.
// It'd be a shame if something were to
//
//
//
// happen to it.

import MainLoop from 'mainloop.js'

// This should probably be a class.
// Whatever.
window.spring = {
  // These values are state that gets updated repeatedly
  pos: 0,
  formattedPos: 0,
  vel: 0,
  accel: 0,
  force: 0,

  // These constants stay as-is. They affect the feel of the spring.
  mass: 1.9,
  k: 0.4,
  damp: 0.86,

  // This is the number the spring wants to be at
  target: 0,
}

const updateSpring = () => {
  // adapted from https://processing.org/examples/springs.html

  spring.force = -spring.k * (spring.pos - spring.target);
  spring.accel = spring.force / spring.mass;
  spring.vel = spring.damp * (spring.vel + spring.accel);
  spring.pos = spring.pos + spring.vel;
  spring.formattedPos = spring.pos.toFixed(5)
}

updateSpring()

const update = () => {
  updateSpring()
}

const draw = () => {
  document.documentElement.style.setProperty('--spring', spring.formattedPos)
}

const scrollState = {
  pos: 0,
  delta: 0,
}
window.addEventListener('scroll', (e) => {
  const pos = window.pageYOffset
  const delta = scrollState.pos - pos;

  scrollState.pos = pos
  scrollState.delta = delta

  spring.vel = Math.abs(delta)
})

MainLoop.setUpdate(update).setDraw(draw).start()
