import MainLoop from 'mainloop.js'

let n = 0

// Someday I'll make this a proper class.
// Today is not that day.
window.spring = {
  // These values are state that gets updated repeatedly
  pos: 0,
  formattedPos: 0,
  vel: 0,
  accel: 0,
  force: 0,

  // These values stay as-is, and affect the feel of the spring
  mass: 1.5,
  k: 0.5,
  damp: 0.8,

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
  // n += 0.1
}

const draw = () => {
  document.documentElement.style.setProperty('--spring', `${spring.formattedPos}px`)
  // document.documentElement.style.setProperty('--n', n)
}

const scrollState = {
  pos: window.pageYOffset,
  delta: 0,
}
window.addEventListener('scroll', (e) => {
  const pos = window.pageYOffset
  const delta = scrollState.pos - pos;

  scrollState.pos = pos
  scrollState.delta = delta

  spring.vel = -delta
})

MainLoop.setUpdate(update).setDraw(draw).start()
