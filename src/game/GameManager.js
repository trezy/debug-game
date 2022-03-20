// Local imports
import { Renderer } from './Renderer.js'
import { store } from '../store/index.js'





export class GameManager {
	/****************************************************************************\
	 * Private properties
	\****************************************************************************/

	#renderer = null





	/****************************************************************************\
	 * Public properties
	\****************************************************************************/

	controls = null
	cursorPosition = {
		x: 0,
		y: 0,
	}
	currentCell = null
	isRunning = true





	/****************************************************************************\
	 * Public methods
	\****************************************************************************/

	constructor() {}

	gameLoop = () => {
		if (this.isRunning) {
			const {
				map,
				nextFrame,
			} = store.getState()

			nextFrame()

			this.renderer.drawGrid(map.width, map.height)
			map.render(this.renderer)

			// render.drawEntities(entities)

			// if (currentTile < map.tiles.length) {
			// 	render.drawPlacement()
			// }

			this.renderer.update()

			requestAnimationFrame(this.gameLoop)
		}
	}

	// handleDoubleClick = () => {
	// 	if (document.fullscreenElement) {
	// 		document.exitFullscreen()
	// 	} else {
	// 		this.canvas.requestFullscreen()
	// 	}
	// }

	start() {
		if (!store.getState().isRunning) {
			store.setState({ isRunning: true })
			this.isRunning = true

			// window.addEventListener('dblclick', this.handleDoubleClick)

			this.gameLoop()
		}
	}

	stop() {
		if (store.getState().isRunning) {
			store.setState({ isRunning: false })
			this.isRunning = false
		}
	}

	get renderer() {
		if (!this.#renderer) {
			this.#renderer = new Renderer()
		}

		return this.#renderer
	}
}
