import { useState } from 'react';

interface Train {
  id: string;
  name: string;
  type: 'express' | 'local' | 'freight';
  priority: number;
  startTime: string;
  endTime: string;
  platform: number;
  delay?: number;
  status: 'on-time' | 'delayed' | 'predicted-delay';
}

interface GanttChartProps {
  trains: Train[];
  onTrainClick?: (train: Train) => void;
}

const GanttChart = ({ trains, onTrainClick }: GanttChartProps) => {
  const [hoveredTrain, setHoveredTrain] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Time range for the chart (6 AM to 12 AM)
  const startHour = 6;
  const endHour = 24;
  const totalHours = endHour - startHour;

  const timeToPosition = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = (hours - startHour) * 60 + minutes;
    return (totalMinutes / (totalHours * 60)) * 100;
  };

  const getDuration = (startTime: string, endTime: string) => {
    const startPos = timeToPosition(startTime);
    const endPos = timeToPosition(endTime);
    return endPos - startPos;
  };

  const handleMouseEnter = (train: Train, event: React.MouseEvent) => {
    setHoveredTrain(train.id);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredTrain(null);
  };

  // Generate time labels
  const timeLabels = [];
  for (let hour = startHour; hour < endHour; hour++) {
    timeLabels.push(`${hour.toString().padStart(2, '0')}:00`);
  }

  return (
    <div className="timeline-container">
      {/* Header with time labels */}
      <div className="bg-control-bg border-b border-control-border p-4">
        <h3 className="text-lg font-semibold text-foreground mb-3">Train Schedule Timeline</h3>
        <div className="relative">
          <div className="grid grid-cols-18 gap-0 text-xs text-muted-foreground">
            {timeLabels.map((time) => (
              <div key={time} className="text-center py-1">
                {time}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Grid and Trains */}
      <div className="relative timeline-grid min-h-[400px] p-4">
        {/* Platform Labels */}
        <div className="absolute left-0 top-0 w-16 bg-control-bg border-r border-control-border">
          <div className="text-xs font-medium text-muted-foreground p-2 border-b border-control-border">
            Platform
          </div>
          {[1, 2, 3, 4, 5, 6].map((platform) => (
            <div
              key={platform}
              className="h-12 flex items-center justify-center text-sm font-medium text-foreground border-b border-timeline-grid"
            >
              {platform}
            </div>
          ))}
        </div>

        {/* Train Bars */}
        <div className="ml-16">
          {trains.map((train, index) => {
            const leftPosition = timeToPosition(train.startTime);
            const width = getDuration(train.startTime, train.endTime);
            const topPosition = (train.platform - 1) * 48 + 32; // 48px per platform + header

            return (
              <div
                key={train.id}
                className={`train-bar ${train.type} absolute h-8 flex items-center px-2 text-xs font-medium`}
                style={{
                  left: `${leftPosition}%`,
                  width: `${width}%`,
                  top: `${topPosition}px`,
                }}
                onMouseEnter={(e) => handleMouseEnter(train, e)}
                onMouseLeave={handleMouseLeave}
                onClick={() => onTrainClick?.(train)}
              >
                <span className="truncate">
                  {train.name} {train.delay ? `(+${train.delay}m)` : ''}
                </span>
              </div>
            );
          })}
        </div>

        {/* Tooltip */}
        {hoveredTrain && (
          <div
            className="train-tooltip"
            style={{
              position: 'fixed',
              left: tooltipPosition.x,
              top: tooltipPosition.y - 100,
              zIndex: 1000,
            }}
          >
            {trains
              .filter((train) => train.id === hoveredTrain)
              .map((train) => (
                <div key={train.id}>
                  <h4 className="font-semibold text-foreground">{train.name}</h4>
                  <div className="space-y-1 text-xs text-muted-foreground mt-1">
                    <div>Type: <span className="capitalize">{train.type}</span></div>
                    <div>Platform: {train.platform}</div>
                    <div>Time: {train.startTime} - {train.endTime}</div>
                    <div>Priority: {train.priority}</div>
                    {train.delay && (
                      <div className="text-destructive">Delay: +{train.delay} minutes</div>
                    )}
                    <div>
                      Status: <span className={`status-${train.status.replace('-', '-')}`}>
                        {train.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GanttChart;