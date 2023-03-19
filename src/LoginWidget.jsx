import Widget from '@forgerock/login-widget';
import { useEffect, useRef } from 'react';

function LoginWidget() {
  const widgetElement = useRef(null);

	useEffect(() => {
		// Instantiate the Widget and assign it to a variable
    const widget = new Widget({ target: widgetElement.current, props: { type: 'inline' }});

		return () => {
			widget.$destroy();
		};
	});

	return <div ref={widgetElement}></div>;
}

export default LoginWidget;