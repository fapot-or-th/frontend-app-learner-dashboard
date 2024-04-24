import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';

import { Badge } from '@edx/paragon';

import noCourseImage from 'assets/no_course_image.png';
import track from 'tracking';
import { reduxHooks } from 'hooks';
import verifiedRibbon from 'assets/verified-ribbon.png';
import useActionDisabledState from './hooks';

import messages from '../messages';

const { courseImageClicked } = track.course;

export const CourseCardImage = ({ cardId, orientation }) => {
  const { formatMessage } = useIntl();
  const { bannerImgSrc } = reduxHooks.useCardCourseData(cardId);
  const { homeUrl } = reduxHooks.useCardCourseRunData(cardId);
  const { isVerified } = reduxHooks.useCardEnrollmentData(cardId);
  const { disableCourseTitle } = useActionDisabledState(cardId);
  const handleImageClicked = reduxHooks.useTrackCourseEvent(courseImageClicked, cardId, homeUrl);
  const wrapperClassName = `pgn__card-wrapper-image-cap overflow-visible ${orientation}`;
  const image = (
    <>
      <img
        className="pgn__card-image-cap show"
        src={bannerImgSrc}
        alt={formatMessage(messages.bannerAlt)}
        onError={({ currentTarget }) => {
          // eslint-disable-next-line no-param-reassign
          currentTarget.onerror = null; // prevents looping
          // eslint-disable-next-line no-param-reassign
          currentTarget.src = noCourseImage;
        }}
      />
      {
        isVerified && (
          <span
            className="course-card-verify-ribbon-container"
            title={formatMessage(messages.verifiedHoverDescription)}
          >
            <Badge as="div" variant="success" className="w-100">
              {formatMessage(messages.verifiedBanner)}
            </Badge>
            <img src={verifiedRibbon} alt={formatMessage(messages.verifiedBannerRibbonAlt)} />
          </span>
        )
      }
    </>
  );
  return disableCourseTitle
    ? (<div className={wrapperClassName}>{image}</div>)
    : (
      <a
        className={wrapperClassName}
        href={homeUrl}
        onClick={handleImageClicked}
        tabIndex="-1"
      >
        {image}
      </a>
    );
};
CourseCardImage.propTypes = {
  cardId: PropTypes.string.isRequired,
  orientation: PropTypes.string.isRequired,
};

CourseCardImage.defaultProps = {};

export default CourseCardImage;
