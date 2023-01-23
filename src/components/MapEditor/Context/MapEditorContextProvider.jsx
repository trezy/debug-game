// Module imports
import {
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react'
import { ipcRenderer } from 'electron'
import PropTypes from 'prop-types'





// Local imports
import { initialState } from './initialState.js'
import { MapEditorContext } from './MapEditorContext.js'
import { useEditorContext } from '../../Editor/Context/useEditorContext.js'
import { useStore } from '../../../store/react.js'





export function MapEditorContextProvider(props) {
	const { children } = props

	const [isSaving, setIsSaving] = useState(initialState.isSaving)
	const [mapName, setMapName] = useState(initialState.mapName)
	const [resourcepacks, setResourcepacks] = useState(initialState.resourcepacks)
	const {
		layers,
		pfgrid,
		startingPosition,
	} = useEditorContext()

	const contentManager = useStore(state => state.contentManager)

	const compileMap = useCallback(() => {
		return {
			dependencies: Object.entries(resourcepacks).reduce((accumulator, [resourcepackID, resourcePackData]) => {
				accumulator[resourcepackID] = resourcePackData.version
				return accumulator
			}, {}),
			mapName,
			layers,
			pfgrid,
			startingPosition,
		}
	}, [
		layers,
		mapName,
		pfgrid,
		resourcepacks,
	])

	const handleResourcepackLoaded = useCallback(resourcepackID => {
		setResourcepacks(previousState => {
			return {
				...previousState,
				[resourcepackID]: { ...contentManager.getResourcepack(resourcepackID) },
			}
		})
	}, [contentManager])

	const saveMap = useCallback(async() => {
		setIsSaving(true)
		const compiledMap = compileMap()
		await ipcRenderer.invoke('saveMap', compiledMap)
		setIsSaving(false)
	}, [
		compileMap,
		setIsSaving,
	])

	const updateResourcepacks = useCallback(selectedResourcepacks => {
		const updatedResourcepacks = Object
			.entries(selectedResourcepacks)
			.reduce((accumulator, [resourcepackID, isEnabled]) => {
				if (isEnabled) {
					contentManager.loadResourcepack(resourcepackID)
					accumulator[resourcepackID] = { ...contentManager.getResourcepack(resourcepackID) }
				} else {
					contentManager.unloadResourcepack(resourcepackID)
					delete accumulator[resourcepackID]
				}
				return accumulator
			}, {})

		setResourcepacks(updatedResourcepacks)
	}, [
		contentManager,
		setResourcepacks,
	])

	const hasTiles = useMemo(() => {
		return layers.some(layer => {
			return Boolean(Object.keys(layer).length)
		})
	}, [layers])

	const providerState = useMemo(() => {
		return {
			hasTiles,
			isSaving,
			mapName,
			resourcepacks,
			saveMap,
			setMapName,
			updateResourcepacks,
		}
	}, [
		hasTiles,
		isSaving,
		mapName,
		resourcepacks,
		saveMap,
		setMapName,
		updateResourcepacks,
	])

	useEffect(() => {
		contentManager.on('resourcepack:loaded', handleResourcepackLoaded)

		return () => {
			contentManager.off('resourcepack:loaded', handleResourcepackLoaded)
		}
	}, [
		contentManager,
		handleResourcepackLoaded,
	])

	return (
		<MapEditorContext.Provider
			value={providerState}>
			{children}
		</MapEditorContext.Provider>
	)
}

MapEditorContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
}
