import { configuration, journey } from '@forgerock/login-widget';
import { useEffect, useRef, useState } from 'react'

export default function useLoginWidget({ forgerock }) {
	/**
	 * Use ref for a persistent value usable within useEffect w/o requiring a dependency
	 * Docs: https://react.dev/learn/referencing-values-with-refs
	 * Ref doesn't trigger a re-render and is a stable reference for use within useEffect
	 * This is just for internal use of this custom hook
	 */
	const userInfoRef = useRef(null);
	// State exposed for the outside and will trigger a re-render
  const [userInfo, setUserInfo] = useState(null);

  // Initiate the Widget modules
  const config = configuration();
	const journeyEvents = journey();

	useEffect(() => {
		// Initiate the Widget modules
		config.set({ forgerock });

    // Subscribe to journey observable and assign unsubscribe function to variable
    const unsubscribe = journeyEvents.subscribe((event) => {
      if (userInfoRef !== event.user.response) {
        setUserInfo(event.user.response);
				userInfoRef.current = event.user.response;
      }
    });

		journeyEvents.start();

    // Return a function that destroys the Widget and unsubscribes from the journey observable
    return () => {
      unsubscribe();
    };

		/**
		 * We want this useEffect to only run once, and not rerun when useInfo is updated
		 * This is why we use a ref, rather than state, so we can avoid rerunning this
		 */
  }, []);

	return userInfo;
}