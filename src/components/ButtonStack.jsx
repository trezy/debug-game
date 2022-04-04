// Module imports
import {
	Children,
	createElement,
	useMemo,
} from 'react'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'





// Constants
const BUTTON_VARIANTS = {
	animate: {
		opacity: 1,
		x: 0,
		transition: {
			damping: 30,
			stiffness: 500,
			type: 'spring',
		},
	},
	exit: {
		opacity: 0,
		x: '-100%',
		transition: {
			duration: 0.2,
		},
	},
	initial: {
		opacity: 0,
		x: '-100%',
	},
}

const MENU_VARIANTS = {
	animate: {
		transition: {
			staggerChildren: 0.05,
		},
	},
	exit: {
		transition: {
			staggerChildren: 0.05,
		},
	},
	initial: {
		transition: {
			staggerChildren: 0.05,
		},
	},
}





/**
 * A wrapper for groups of buttons.
 *
 * @param {object} props All component props.
 * @param {*} [props.children] Node to be rendered inside of the button.
 * @param {string} [props.className] A string of classes to be set on the button.
 */
export function ButtonStack(props) {
	const {
		children,
		className,
	} = props

	const compiledClassName = useMemo(() => classNames('button-stack', className), [className])

	const compiledChildren = useMemo(() => {
		return Children.map(children, child => {
			if (child === null) {
				return child
			}

			return createElement(child.type, {
				...child.props,
				key: child.key,
				ref: child.ref,
				variants: BUTTON_VARIANTS,
			})
		})
	}, [children])

	return (
		<motion.menu
			animate={'animate'}
			className={compiledClassName}
			exit={'exit'}
			initial={'initial'}
			variants={MENU_VARIANTS}>
			{compiledChildren}
		</motion.menu>
	)
}

ButtonStack.defaultProps = {
	children: null,
	className: '',
}

ButtonStack.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
}
