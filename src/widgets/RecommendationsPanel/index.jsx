import React from 'react';

import RecomendationWidget from 'widgets/RecomendationWidget';
import LoadingView from './LoadingView';
import LoadedView from './LoadedView';
import hooks from './hooks';
import RecommendationsPaintedDoorBtn from '../RecommendationsPaintedDoorBtn';
import { RECOMMENDATIONS_PANEL } from '../RecommendationsPaintedDoorBtn/constants';
import { usePaintedDoorExperimentContext } from '../RecommendationsPaintedDoorBtn/PaintedDoorExperimentContext';

export const RecommendationsPanel = () => {
  const {
    courses,
    isControl,
    isFailed,
    isLoaded,
    isLoading,
  } = hooks.useRecommendationPanelData();
  const {
    experimentVariation,
    isPaintedDoorWidgetBtnVariation,
    experimentLoading,
  } = usePaintedDoorExperimentContext();

  const getDefaultOrFailedStateWidget = () => {
    if (!experimentLoading && isPaintedDoorWidgetBtnVariation) {
      return (
        <>
          <RecomendationWidget />
          <div className="pt-3" />
          <RecommendationsPaintedDoorBtn
            experimentVariation={experimentVariation}
            placement={RECOMMENDATIONS_PANEL}
          />
        </>
      );
    }
    return (
      <RecomendationWidget />
    );
  };

  if (isLoading) {
    return (<LoadingView />);
  }
  if (isLoaded && courses.length > 0) {
    return (
      <LoadedView courses={courses} isControl={isControl} />
    );
  }
  if (isFailed) {
    return getDefaultOrFailedStateWidget();
  }
  // default fallback
  return getDefaultOrFailedStateWidget();
};

export default RecommendationsPanel;
