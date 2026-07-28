function LoadingIndicator() {
  return (
    <div
      className="loader loader-active"
      role="status"
      aria-label="Loading predictions"
    >
      <div className="loader-inner pacman" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} />
        ))}
      </div>
    </div>
  );
}

export default LoadingIndicator;
