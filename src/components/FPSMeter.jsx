// Module imports
import {
	animate,
	useMotionValue,
} from 'framer-motion'
import {
	useEffect,
	useRef,
} from 'react'





// Local imports
import { useStore } from '../store/react.js'





/**
 * Renders the current FPS of the game renderer.
 */
export function FPSMeter() {
	const fps = useStore(state => state.fps)
	const fpsMotionValue = useMotionValue(0)
	const fpsRef = useRef(null)

	useEffect(() => {
		const controls = animate(fpsMotionValue, fps, {
			/**
			 * Runs when the FPS motion value is updated.
			 *
			 * @param {number | string} value The current value of the FPS motion value.
			 */
			onUpdate(value) {
				if (fpsRef.current) {
					fpsRef.current.textContent = parseInt(String(value), 10)
				}
			}
		})

		return () => controls.stop()
	}, [
		fps,
		fpsMotionValue,
	])

	return (
		<div className={'fps-meter'}>
			<var ref={fpsRef} />
			{' FPS'}
		</div>
	)
}
