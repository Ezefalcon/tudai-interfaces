/* Store the element in elements */
let elements = $('.tilt')

/* Get the height and width of the element */


/*
  * Add a listener for mousemove event
  * Which will trigger function 'handleMove'
  * On mousemove
  */

addEventsToElements();

function addEventsToElements() {
  elements.get().forEach((val) => {
    const height = val.clientHeight
    const width = val.clientWidth
    val.addEventListener('mousemove', (e) => handleMove(e, height, width, val))
    /* Add listener for mouseout event, remove the rotation */
    val.addEventListener('mouseout', () => {
      console.log(val)
      val.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
    })

    /* Add listener for mousedown event, to simulate click */
    val.addEventListener('mousedown', () => {
      val.style.transform = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)'
    })

    /* Add listener for mouseup, simulate release of mouse click */
    val.addEventListener('mouseup', () => {
      val.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)'
    })
  });
}

/* Define function a */
function handleMove(e, height, width, element) {
  /*
    * Get position of mouse cursor
    * With respect to the element
    * On mouseover
    */
  /* Store the x position */
  const xVal = e.layerX
  /* Store the y position */
  const yVal = e.layerY

  /*
    * Calculate rotation valuee along the Y-axis
    * Here the multiplier 20 is to
    * Control the rotation
    * You can change the value and see the results
    */
  const yRotation = 20 * ((xVal - width / 2) / width)

  /* Calculate the rotation along the X-axis */
  const xRotation = -20 * ((yVal - height / 2) / height)

  /* Generate string for CSS transform property */
  const string = 'perspective(500px) scale(1.1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)'

  /* Apply the calculated transformation */
  element.style.transform = string
}
