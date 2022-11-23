import React from 'react'
import { ExclamationCircleOutline } from "@graywolfai/react-heroicons";

const About = ({ toggleModal }) => {
	return (
		<div>
			<div>
				<p className="text-sm">
					This is a whatsapp clone made by Dima Tokarev.
				</p>

				<div className="pt-8 flex items-center justify-between space-x-4">
					<span className="text-gray-600 h-6 w-6">
						<ExclamationCircleOutline />
					</span>
					<p className="">
						I used React/Redux/TailwindCSS for frontend and Firebase for
						backend.
					</p>
				</div>
			</div>
			<div className="pt-4 pb-2 flex items-center justify-end space-x-2 text-gray-600 text-xs">
				<p>You can view the real website at</p>
				<a
					className="text-blue-500 hover:underline hover:text-blue-400 focus:text-blue-600"
					href="https://web.whatsapp.com/"
					target="_blank"
				>
					https://web.whatsapp.com/
				</a>
			</div>

			<div className="flex justify-end">
				<button
					type="button"
					className="px-6 py-2 text-white uppercase tracking-wide rounded transition duration-200 ease-in bg-exit-button-green hover:bg-opacity-75 hover:shadow-lg focus:outline-none"
					onClick={toggleModal}
				>
					Ok
				</button>
			</div>
		</div>
	)
}

export default About