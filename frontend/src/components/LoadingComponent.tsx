import React, { useEffect, useState } from "react";

export default function LoadingComponent() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleLoadingChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      setIsLoading(customEvent.detail);
    };

    // Add event listener
    window.addEventListener(
      "loadingChange",
      handleLoadingChange as EventListener
    );

    // Cleanup
    return () => {
      window.removeEventListener(
        "loadingChange",
        handleLoadingChange as EventListener
      );
    };
  }, []);

  return <div>{isLoading ? "Loading..." : "Not Loading"}</div>;
}
