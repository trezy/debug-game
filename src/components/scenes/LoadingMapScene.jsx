// Module imports
import { useEffect } from 'react'





// Local imports
import { Panel } from '../Panel.jsx'
import { PanelsLayout } from '../layouts/PanelsLayout.jsx'
import { Meter } from '../Meter.jsx'
import { Scene } from '../Scene.jsx'
import { useStore } from '../../store/react.js'





export function LoadingMapScene() {
	const [
		currentMap,
		loadMap,
		map,
	] = useStore(state => [
		state.currentMap,
		state.loadMap,
		state.map,
	])

	useEffect(() => {
		loadMap()
	}, [
		loadMap,
	])

	return (
		<Scene id="map-select">
			<PanelsLayout id="title">
				<Panel>
					<h2>{'Menu'}</h2>
				</Panel>

				<Panel
					columnSpan={3}
					isCentered>
					<div>
						<h2>{'Loading Map'}</h2>

						<dl>
							<dt>{'Map Name:'}</dt>
							<dd>{currentMap}</dd>

							{Boolean(map) && (
								<>
									<dt>{'Map Size:'}</dt>
									<dd>{`${map.width} x ${map.height}`}</dd>
								</>
							)}
						</dl>

						<Meter
							isFullWidth
							maximum={100}
							minimum={0}
							segmentSize={10}
							value={50} />
					</div>
				</Panel>
			</PanelsLayout>
		</Scene>
	)
}
