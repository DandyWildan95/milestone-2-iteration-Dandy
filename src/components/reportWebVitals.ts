type ReportCallback = (metric: {
  id: string;
  name: string;
  value: number;
  delta: number;
  entries: Array<PerformanceEntry>;
}) => void;

const reportWebVitals = (onPerfEntry?: ReportCallback) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    // Simplified web vitals reporting
    if ('performance' in window) {
      const metrics = [
        'first-contentful-paint',
        'largest-contentful-paint',
        'first-input-delay',
        'cumulative-layout-shift',
        'total-blocking-time'
      ];

      metrics.forEach(metricName => {
        const entry = performance.getEntriesByType('paint')
          .find(e => e.name === metricName);
        
        if (entry) {
          onPerfEntry({
            id: entry.name,
            name: metricName,
            value: entry.startTime,
            delta: entry.duration,
            entries: [entry]
          });
        }
      });
    }
  }
};

export default reportWebVitals;
