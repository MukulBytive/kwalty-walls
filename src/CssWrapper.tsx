import { useState, useEffect, type ReactNode } from "react";

function CSSLoaderWrapper({ children }:{children:ReactNode}) {
  const [cssLoaded, setCssLoaded] = useState(false);

  useEffect(() => {
    // Find all <link rel="stylesheet"> tags and cast to HTMLLinkElement
    const links = document.querySelectorAll(
      'link[rel="stylesheet"]'
    ) as NodeListOf<HTMLLinkElement>;
    let loadedCount = 0;
    const totalLinks = links.length;

    // If no stylesheets are found, consider CSS loaded
    if (totalLinks === 0) {
      // setCssLoaded(true);
      return;
    }

    const onLoad = () => {
      loadedCount++;
      if (loadedCount === totalLinks) {
        setCssLoaded(true);
      }
    };

    // Check each stylesheet
    links.forEach((link) => {
      if (link.sheet) {
        // Stylesheet is already loaded
        onLoad();
      } else {
        // Attach load event listener for stylesheets still loading
        link.addEventListener("load", onLoad);
      }
    });

    // Cleanup event listeners when component unmounts
    return () => {
      links.forEach((link) => link.removeEventListener("load", onLoad));
    };
  }, []);

  // Show nothing or a loading indicator while CSS is loading
  if (!cssLoaded) {
    return null; // Or use a loading spinner: <div>Loading...</div>
  }

  // Render the component once CSS is loaded
  return children;
}

export default CSSLoaderWrapper;
