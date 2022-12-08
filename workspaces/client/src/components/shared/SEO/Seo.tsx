import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { pageTitleSelector } from 'src/stores/reducers/appSlice';

export const Seo = () => {
  const pageTitle = useSelector(pageTitleSelector);
  const [appTitle, setAppTitle] = useState('文章チェックツール');

  useEffect(() => {
    pageTitle && setAppTitle(`${appTitle}-${pageTitle}`);
  }, [pageTitle]);

  return (
    <div>
      <Helmet>
        <title>{appTitle}</title>
        <meta name='description' content='Helmet application' />
      </Helmet>
    </div>
  );
};
