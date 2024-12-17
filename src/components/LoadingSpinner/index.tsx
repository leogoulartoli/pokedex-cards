import React from "react";
import "./style.scss";

export const LoadingSpinner = () => {
  return (
    <div className="loading" data-testid="loading-spinner">
      <div className="spinner"></div>
    </div>
  );
};
