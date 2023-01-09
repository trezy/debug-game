// Module imports
import {
	useCallback,
	useMemo,
	useState,
} from 'react'





// Local imports
import { AddResourcePackModal } from '../../AddResourcePackModal/AddResourcePackModal.jsx'
import { BlockList } from '../../BlockList/BlockList.jsx'
import { BlockListItem } from '../../BlockList/BlockListItem.jsx'
import { Button } from '../../Button.jsx'
import { Panel } from '../../scenes/Architect/Panel.jsx'
import { Resourcepack } from './Resourcepack.jsx'
import { useEditor } from '../../scenes/Architect/context/EditorContext.jsx'





/**
 * Allows managing of resourcepacks.
 */
export function ResourcepacksPanel() {
	const [showManageResourcePacksModal, setShowManageResourcePacksModal] = useState(false)
	const {
		addResourcepacks,
		resourcepacks,
	} = useEditor()

	const handleManageResourcePacksClick = useCallback(() => setShowManageResourcePacksModal(true), [setShowManageResourcePacksModal])

	const handleManageResourcePacksModalClose = useCallback(() => setShowManageResourcePacksModal(false), [setShowManageResourcePacksModal])

	const handleSaveResourcepacks = useCallback(resourcepackIDs => {
		addResourcepacks(resourcepackIDs)
		setShowManageResourcePacksModal(false)
	}, [
		addResourcepacks,
		setShowManageResourcePacksModal,
	])

	const Menu = useMemo(() => (
		<Button
			isFullWidth
			onClick={handleManageResourcePacksClick}>
			{'Manage'}
		</Button>
	), [handleManageResourcePacksClick])

	const mappedItems = useMemo(() => {
		return Object.values(resourcepacks).map(resourcepack => {
			return (
				<BlockListItem key={resourcepack.id}>
					<Resourcepack resourcepack={resourcepack} />
				</BlockListItem>
			)
		})
	}, [resourcepacks])

	return (
		<>
			<Panel
				className={'resource-packs-panel'}
				isCollapsible
				menu={Menu}
				title={'Resources'}>
				<BlockList>
					{!Object.keys(resourcepacks).length && (
						<BlockListItem isEmpty>
							{'No resource packs.'}
						</BlockListItem>
					)}

					{Boolean(Object.keys(resourcepacks).length) && mappedItems}
				</BlockList>
			</Panel>

			{showManageResourcePacksModal && (
				<AddResourcePackModal
					onClose={handleManageResourcePacksModalClose}
					onSave={handleSaveResourcepacks} />
			)}
		</>
	)
}
