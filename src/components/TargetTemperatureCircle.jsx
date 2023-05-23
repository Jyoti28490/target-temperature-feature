import React from 'react';

const TargetTemperatureCircle = ({
  minTemperature,
  maxTemperature,
  currentTemperature,
}) => {
  const circleSize = 200; // Size of the circle in pixels
  const strokeWidth = 3; // Width of the lines in pixels
  const circleRadius = (circleSize - strokeWidth) / 2;
  const circleCenter = circleSize / 2;
  const minAngle = 135; // Angle for the minimum temperature line in degree
  const maxAngle = 45; // Angle for the maximum temperature line in degree
  const textMargin = 40; // Margin for the temperature text in pixels
  const lineLength = 10; // Line length for outer circle lines in pixels
  const visibleHeight = circleSize + 50;

  // Helper function to calculate the coordinates of a point on a circle given the radius and angle

  const getPointOnCircle = (angle, radius) => {
    const radians = (angle * Math.PI) / 180;
    const x = circleCenter + Math.cos(radians) * radius;
    const y = circleCenter + Math.sin(radians) * radius;
    return { x, y };
  };

  const renderOuterLine = (angle, length) => {
    const startPoint = getPointOnCircle(angle, circleRadius);
    const endPoint = getPointOnCircle(angle, circleRadius + length);
    return (
      <line
        x1={startPoint.x}
        y1={startPoint.y}
        x2={endPoint.x}
        y2={endPoint.y}
        stroke="black"
        strokeWidth={strokeWidth}
      />
    );
  };

  const renderTargetLine = () => {
    const targetAngle =
      ((currentTemperature - minTemperature) /
        (maxTemperature - minTemperature)) *
        270 +
      135;

    const targetPoint = getPointOnCircle(targetAngle, circleRadius);

    return (
      <line
        x1={circleCenter}
        y1={circleCenter}
        x2={targetPoint.x}
        y2={targetPoint.y}
        stroke="red"
        strokeWidth={strokeWidth}
      />
    );
  };

  // Check if the current target temperature lies between minimum and maximum temperatures

  const inTemperatureRange =
    currentTemperature >= minTemperature &&
    currentTemperature <= maxTemperature;

  const message = () => {
    if (currentTemperature < minTemperature) {
      return ' is too low';
    } else if (currentTemperature > maxTemperature) {
      return ' is too high';
    }
  };

  return (
    <div>
      {!inTemperatureRange ? (
        <div style={{ color: 'red' }}>
          Current Temperature: {currentTemperature}°C {message()}
        </div>
      ) : (
        <svg width={circleSize} height={visibleHeight}>
          {renderOuterLine(minAngle, lineLength)}
          {renderOuterLine(maxAngle, lineLength)}
          {renderTargetLine()}
          <circle
            cx={circleCenter}
            cy={circleCenter}
            r={circleRadius}
            fill="none"
            stroke="black"
            strokeWidth={strokeWidth}
          />

          <text
            x={circleCenter}
            y={circleSize + textMargin}
            textAnchor="middle"
            fontSize="14"
            fontWeight="500"
          >
            {currentTemperature}°C
          </text>
        </svg>
      )}
    </div>
  );
};

export default TargetTemperatureCircle;
