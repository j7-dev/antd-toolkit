import "./styles.scss";

export const LoadingPage = () => {
  return (
    <div className="relative">
      <div className="loading">
        <div className="loading__square"></div>
        <div className="loading__square"></div>
        <div className="loading__square"></div>
        <div className="loading__square"></div>
        <div className="loading__square"></div>
        <div className="loading__square"></div>
        <div className="loading__square"></div>
      </div>
      <p className="text-center text-gray-500">Loading...</p>
    </div>
  );
};
