import { journey } from "@forgerock/login-widget";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoginWidget from "./LoginWidget";

const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

function Register() {
  const navigate = useNavigate();

	useEffect(() => {
		// Create journey observable
		const journeyEvents = journey();

		// Use the subscribe to catch the event you want to observe
		const unsubscribe = journeyEvents.subscribe((event) => {
			if (event.user.successful) {
				navigate('/');
			}
		});

		// Start the journey with "Registration"
		journeyEvents.start({ journey: 'Registration' });

		// Ensure you return a function that unsubscribes from the observable
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<div className={`card ${prefersDarkMode ? 'tw_dark' : ''}`}>
			<LoginWidget />
		</div>
	);
}

export default Register;