export interface ViewConfig {
  showLatencyIndicators: boolean;
  statusDetailLevel: 'simple' | 'detailed';
  showLatencyValues: boolean;
  indicatorCount: number;
}

export function getViewConfig(): ViewConfig {
  const showLatencyIndicators = process.env.SHOW_LATENCY_INDICATORS === 'true';
  const statusDetailLevel = (process.env.STATUS_DETAIL_LEVEL || 'detailed') as 'simple' | 'detailed';
  
  return {
    showLatencyIndicators,
    statusDetailLevel,
    showLatencyValues: showLatencyIndicators,
    indicatorCount: statusDetailLevel === 'detailed' ? 4 : 2,
  };
}
