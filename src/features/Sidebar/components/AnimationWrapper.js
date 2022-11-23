import React from 'react'
import { motion } from "framer-motion";

const AnimationWrapper = ({ id, children }) => {
	return (
		<motion.div
			id={id}
			key={id}
			initial={{ x: "-100%" }}
			animate={{ x: 0 }}
			exit={{ x: "-100%" }}
			transition={{
				type: "tween",
				delayChildren: 1.5,
				velocity: 1,
				duration: 0.3,
			}}
		>
			{children}
		</motion.div>
	)
}

export default AnimationWrapper