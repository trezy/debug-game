// Module imports
import PF from 'pathfinding'





// Local imports
import { ContentManager } from './ContentManager.js'
import { LAYERS } from './Renderer.js'
import { TILE_SIZE } from './Tile.js'





export class MapManager {
	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	#gameManager = null

	#map = null

	#pathfindingGrid = null





	/****************************************************************************\
	 * Constructor
	\****************************************************************************/

	/**
	 * Creates a new map.
	 *
	 * @param {object} options All options.
	 * @param {import('./GameManager.js').GameManager} options.gameManager The `GameManager` this map belongs to.
	 * @param {string} options.map The map.
	 */
	constructor(options) {
		const {
			gameManager,
			map,
		} = options

		this.#gameManager = gameManager
		this.#map = map
		map.layerGrids = []

		this.#pathfindingGrid = new PF.Grid(this.width, this.height)

		map.tiles.forEach(layerData => {
			const layerGrid = this.generateGrid()

			Object
				.entries(layerData)
				.forEach(([coordinateString, tileData]) => {
					const [x, y] = coordinateString.split('|').map(Number)
					layerGrid[y][x] = this
						.contentManager
						.getTile(tileData.tileID, tileData.resourcepackID)
				})

			map.layerGrids.push(layerGrid)
		})

		Object
			.entries(map.pfgrid)
			.forEach(([coordinateString, cellData]) => {
				const [x, y] = coordinateString.split('|').map(Number)
				this.#pathfindingGrid.setWalkableAt(x, y, cellData.isTraversable)
			})
	}





	/****************************************************************************\
	 * Pbulic instance methods
	\****************************************************************************/

	generateGrid() {
		return Array(this.height)
			.fill(null)
			.map(() => {
				return Array(this.width).fill(null)
			})
	}

	render(renderer) {
		renderer.layer = LAYERS.foreground

		this.layerGrids.forEach(layerGrid => {
			layerGrid.forEach((row, y) => {
				row.forEach((tileData, x) => {
					if (tileData === null) {
						return
					}

					renderer.drawImage({
						image: tileData.image,
						source: {
							height: tileData.image.height,
							width: tileData.image.width,
							x: 0,
							y: 0,
						},
						destination: {
							height: TILE_SIZE.height,
							width: TILE_SIZE.width,
							x: x * TILE_SIZE.width,
							y: y * TILE_SIZE.height,
						},
					})
				})
			})
		})
	}





	/****************************************************************************\
	 * Public instance getters
	\****************************************************************************/

	/**
	 * @returns {ContentManager} The game's `ContentManager`.
	 */
	get contentManager() {
		return this.#gameManager.contentManager
	}

	/**
	 * @returns {number} The map's height.
	 */
	get height() {
		return this.#map.dimensions.height
	}

	/**
	 * @returns {Array} An array of layer grids.
	 */
	get layerGrids() {
		return this.#map.layerGrids
	}

	/**
	 * @returns {Array} An array of map layers.
	 */
	get layers() {
		return this.#map.tiles
	}

	/**
	 * @returns {string} The map's name.
	 */
	get name() {
		return this.#map.name
	}

	/**
	 * @returns {PF.Grid} The pathfinding grid.
	 */
	get pathfindingGrid() {
		return this.#pathfindingGrid
	}

	/**
	 * @returns {object} The starting coordinates.
	 */
	get startingPosition() {
		return this.#map.startingPosition
	}

	/**
	 * @returns {number} The map's width.
	 */
	get width() {
		return this.#map.dimensions.width
	}
}
