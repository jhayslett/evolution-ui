module.exports = function (duration, endScroll, offset) {
  offset = offset || 0
  let start = null
  const initScroll = window.pageYOffset

  function step (timestamp) {
    if (!start) start = timestamp
    const progress = timestamp - start
    window.scrollTo(0, easing(progress, initScroll, endScroll - offset - initScroll, duration))
    if (progress < duration) {
      window.requestAnimationFrame(step)
    } else {
      endAnimation()
    }
  }

  // Easein Cubic - George McGinley Smith - https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
  // function easing (t, b, c, d) {
  //   return c * (t /= d) * t * t + b
  // }

  function easing (t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
  }



  function endAnimation () {
    window.scrollTo(0, endScroll - offset)
  }

  window.requestAnimationFrame(step)
}