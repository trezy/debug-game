// Local imports
import { Panel } from '../Panel.jsx'





export function TileQueuePanel() {
	return (
		<Panel
			className={'queue-panel'}
			isCollapsible
			title={'Queue'}>
			<ol className={'block-list'} />
		</Panel>
	)
}
