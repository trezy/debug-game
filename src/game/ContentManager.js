// Module imports
import { ipcRenderer } from 'electron'





// Local imports
import { EventEmitter } from './EventEmitter.js'





/**
 * Controls loading and unloading of maps and assets.
 */
export class ContentManager extends EventEmitter {
	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	#isContentWatcherInitialised = false

	#manifests = {
		maps: {},
		resourcepacks: {},
	}





	/****************************************************************************\
	 * Constructor
	\****************************************************************************/

	/**
	 * Create a new content manager.
	 */
	constructor() {
		super()
		ipcRenderer.on('contentAdded', (...args) => this.#handleContentAddedOrChanged(...args))
		ipcRenderer.on('contentChanged', (...args) => this.#handleContentAddedOrChanged(...args))
		ipcRenderer.on('contentRemoved', (...args) => this.#handleContentRemoved(...args))
		this.initialiseContentWatcher()
	}





	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	/**
	 * Fired any time a file is added or changed in the content directories.
	 *
	 * @param {object} event The event object.
	 * @param {object} contentMeta Metadata for the content.
	 */
	#handleContentAddedOrChanged(event, contentMeta) {
		this.#manifests[contentMeta.type][contentMeta.id] = {
			...contentMeta,
			isLoaded: false,
			isLoading: false,
		}
	}

	/**
	 * Fired any time changes a file is deleted in the content directories.
	 *
	 * @param {object} event The event object.
	 * @param {object} contentMeta Metadata for the content.
	 */
	#handleContentRemoved(event, contentMeta) {
		delete this.#manifests[contentMeta.type][contentMeta.id]
	}





	/****************************************************************************\
	 * Public instance methods
	\****************************************************************************/

	/**
	 * Returns the data for a map.
	 *
	 * @param {string} mapID The ID of the map to be retrieved.
	 * @returns {object} The map's data.
	 */
	getMap(mapID) {
		const { maps } = this.#manifests

		if (!maps[mapID]) {
			throw new Error(`Map with ID ${mapID} doesn't exist.`)
		}

		return maps[mapID]
	}

	/**
	 * Returns the data for a resourcepack.
	 *
	 * @param {string} resourcepackID The ID of the resourcepack to be retrieved.
	 * @returns {object} The resourcepack's data.
	 */
	getResourcepack(resourcepackID) {
		const { resourcepacks } = this.#manifests

		if (!resourcepacks[resourcepackID]) {
			throw new Error(`Resourcepack with ID ${resourcepackID} doesn't exist.`)
		}

		return resourcepacks[resourcepackID]
	}

	/**
	 * Retrieves a tile by ID.
	 *
	 * @param {string} tileID The ID of the tile to be retrieved.
	 * @param {string} resourcepackID The ID of the resourcepack to which the tile belongs.
	 * @returns {object} The requested tile.
	 */
	getTile(tileID, resourcepackID) {
		return this.#manifests.resourcepacks[resourcepackID].tiles[tileID]
	}

	/**
	 * Initialises the content watcher.
	 */
	initialiseContentWatcher() {
		if (!this.#isContentWatcherInitialised) {
			ipcRenderer.invoke('initialiseContentWatcher')
			this.#isContentWatcherInitialised = true
		}
	}

	/**
	 * Loads data for a map.
	 *
	 * @param {string} mapID The ID of the map to be loaded.
	 */
	async loadMap(mapID) {
		const { maps } = this.#manifests

		if (!maps[mapID]) {
			throw new Error(`Map with ID ${mapID} doesn't exist.`)
		}

		const map = maps[mapID]

		this.emit('map:loading', mapID)

		map.isLoading = true

		for await (const dependencyID of Object.keys(map.dependencies)) {
			await this.loadResourcepack(dependencyID)
		}

		const mapData = await ipcRenderer.invoke('loadMap', mapID)

		Object.assign(map, mapData)

		this.emit('map:loaded', mapID)

		return map
	}

	/**
	 * Loads metadata for all currently available content.
	 */
	async loadMeta() {
		this.#manifests = await ipcRenderer.invoke('getContentMeta')
	}

	/**
	 * Loads data for a resourcepack.
	 *
	 * @param {string} resourcepackID The ID of the resourcepack to be loaded.
	 * @param {boolean} [includeAssets=false] Whether to includes assets when loading this resourcepack.
	 */
	async loadResourcepack(resourcepackID, includeAssets = false) {
		const { resourcepacks } = this.#manifests

		if (!resourcepacks[resourcepackID]) {
			throw new Error(`Resourcepack with ID ${resourcepackID} doesn't exist.`)
		}

		const resourcepack = resourcepacks[resourcepackID]

		if (resourcepack.isLoaded) {
			return
		}

		this.emit('resourcepack:loading', resourcepackID)

		resourcepack.isLoading = true

		const {
			assets,
			tiles,
		} = await ipcRenderer.invoke('loadResourcepack', resourcepackID, includeAssets)

		for await (const tile of Object.values(tiles)) {
			tile.image = new Image
			tile.image.src = tile.dataURI
			await tile.image.decode()
		}

		resourcepack.tiles = tiles

		if (assets) {
			for await (const asset of Object.values(assets)) {
				asset.image = new Image
				asset.image.src = asset.dataURL
				await asset.image.decode()
			}

			resourcepack.assets = assets
		}

		resourcepack.isLoaded = false
		resourcepack.isLoading = false

		this.emit('resourcepack:loaded', resourcepackID)

		return resourcepack
	}

	/**
	 * Removes a map's data from the ContentManager.
	 *
	 * @param {string} mapID The ID of the map to be unloaded.
	 */
	unloadMap(mapID) {}

	/**
	 * Removes a resourcepack's data from the ContentManager.
	 *
	 * @param {string} resourcepackID The ID of the resourcepack to be unloaded.
	 */
	unloadResourcepack(resourcepackID) {
		const resourcepack = this.#manifests.resourcepacks[resourcepackID]

		resourcepack.isLoaded = false
		resourcepack.isLoading = false
		delete resourcepack.tiles

		this.emit('resourcepack:unloaded', resourcepackID)
	}





	/****************************************************************************\
	 * Public instance getters/setters
	\****************************************************************************/

	/**
	 * @returns {object} A hash of all available maps.
	 */
	get maps() {
		return this.#manifests.maps
	}

	/**
	 * @returns {object} A hash of all available resourcepacks.
	 */
	get resourcepacks() {
		return this.#manifests.resourcepacks
	}
}
