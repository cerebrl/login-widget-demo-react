import Widget from '@forgerock/login-widget';
import { useEffect, useRef } from 'react';

function LoginWidget() {
  const widgetElement = useRef(null);

	useEffect(() => {
		// Instantiate the Widget and assign it to a variable
    const widget = new Widget({
			// Target needs to be an actual DOM element, so ref is needed with inline type
			target: widgetElement.current,
			props: { type: 'inline' }
		});

		// Ensure you return a function that destroys the Widget on unmount
		return () => {
			widget.$destroy();
		};
	}, []);

	return <div ref={widgetElement}></div>;
}

export default LoginWidget;