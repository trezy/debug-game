// Module imports
import { useCallback } from 'react'





// Local imports
import { Button } from '../../Button.jsx'
import { ButtonStack } from '../../ButtonStack/ButtonStack.jsx'
// import { FPSMeter } from '../../FPSMeter.jsx'
import { PanelMenu } from '../../Panel/PanelMenu.jsx'
import { Timer } from '../../Timer/Timer.jsx'
import { useStore } from '../../../store/react.js'





/**
 * Renders the contents of the left panel for the Play scene.
 */
export function LeftPanelContents() {
	const [
		gameManager,
		goToMapSelect,
	] = useStore(state => [
		state.gameManager,
		state.goToMapSelect,
	])

	const handleQuitClick = useCallback(() => {
		gameManager.stop()
		goToMapSelect(null)
	}, [
		gameManager,
		goToMapSelect,
	])

	return (
		<>
			<Timer
				isBordered
				isCentered
				isLarge
				isMonospace />

			{/* <div className={'panel-bottom'}>
				<FPSMeter />
			</div> */}

			<PanelMenu>
				<ButtonStack>
					<Button onClick={handleQuitClick}>
						{'Quit'}
					</Button>
				</ButtonStack>
			</PanelMenu>
		</>
	)
}
