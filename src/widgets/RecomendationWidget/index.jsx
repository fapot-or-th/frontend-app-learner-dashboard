import React from 'react';

import { useIntl } from '@edx/frontend-platform/i18n';
import { Card, Icon } from '@edx/paragon';
import { ArrowForward } from '@edx/paragon/icons';
import { getConfig } from '@edx/frontend-platform';

import { reduxHooks } from 'hooks';
import noCourseImage from 'assets/no_course_image.png';

import hooks from './hooks';
import messages from './messages';
import './index.scss';

export const arrowIcon = (<Icon className="mx-1" src={ArrowForward} />);

export const RecomendationWidget = () => {
  const { formatMessage } = useIntl();
  const courses = reduxHooks.useAllCourses();

  hooks.useInitializeAllCourses();

  const newCourses = [...courses];

  const sortedCourses = newCourses.sort(
    (a, b) => {
      const enrollmentStartA = new Date(a.enrollment_start ?? '2100-01-01');
      const enrollmentStartB = new Date(b.enrollment_start ?? '2100-01-01');

      return enrollmentStartA - enrollmentStartB;
    },
  );

  return (
    <Card orientation="horizontal" id="recomendation-widget">
      <Card.Body className="m-auto pr-2">
        <h4>
          {formatMessage(messages.recommendationsForYou)}
        </h4>
        <div id="card-container">
          {sortedCourses.map(({ media, name, course_id: courseId }) => (
            <a href={`${getConfig().LMS_BASE_URL}/courses/${courseId}/about`} id="card-item">
              <img
                src={media.image.small}
                alt="course"
                onError={({ currentTarget }) => {
                  // eslint-disable-next-line no-param-reassign
                  currentTarget.onerror = null; // prevents looping
                  // eslint-disable-next-line no-param-reassign
                  currentTarget.src = noCourseImage;
                }}
              />
              <p>{name}</p>
            </a>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

RecomendationWidget.propTypes = {};

export default RecomendationWidget;
