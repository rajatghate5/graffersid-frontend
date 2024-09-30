import React, { useState, useEffect } from "react";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  const handleError = (error, errorInfo) => {
    setHasError(true);
    setError(error);
    setErrorInfo(errorInfo);
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  };

  useEffect(() => {
    const originalErrorHandler = window.onerror;
    window.onerror = (msg, source, lineno, colno, error) => {
      handleError(error, {
        componentStack: `${source}:${lineno}:${colno}`,
      });
      return true;
    };

    return () => {
      window.onerror = originalErrorHandler;
    };
  }, []);

  if (hasError) {
    return (
      <div className="p-6 bg-red-100 text-red-700 rounded-lg">
        <h2>Something went wrong.</h2>
        <details className="whitespace-pre-wrap">
          {error && error.toString()}
          <br />
          {errorInfo.componentStack}
        </details>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;
