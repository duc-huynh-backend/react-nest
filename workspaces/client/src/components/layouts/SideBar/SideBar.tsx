import './SideBar.scss';

import { Fragment, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Icon } from '@iconify/react';
import { ACTIVE_SIDE_BAR, APP_URL, MINI_SIDE_BAR } from 'src/utils/constants';

export const SIDEBAR_LIST = [
  {
    name: APP_URL.USER.TITLE,
    url: null,
    icon: 'ic:baseline-manage-accounts',
    sub: [
      {
        name: APP_URL.USER.LIST.PAGE_TITLE,
        url: APP_URL.USER.LIST.URL,
      },
      {
        name: APP_URL.USER.NEW.PAGE_TITLE,
        url: APP_URL.USER.NEW.URL,
      },
    ],
  },
];

export const FIRST_SIDEBAR_URL = SIDEBAR_LIST[0].url
  ? SIDEBAR_LIST[0].url
  : SIDEBAR_LIST[0].sub[0].url;

export function Sidebar() {
  const activeClassName = 'sidebar-item-active';

  const { pathname } = useLocation();

  const [miniSideBarClassName, setMiniSideBar] = useState('');
  const [activeSideBar, setActiveSideBar] = useState('');
  const activeUrl = sessionStorage.getItem(ACTIVE_SIDE_BAR);
  const miniSideBar = sessionStorage.getItem(MINI_SIDE_BAR);

  useEffect(() => {
    if (activeUrl) setActiveSideBar(activeUrl);
    if (miniSideBar) setMiniSideBar(miniSideBar);
  }, [activeUrl, miniSideBar]);

  const activeSidebarItem = (url: string | null, element?: Element) => {
    // Case click sidebar item -> Remove old active sidebar item state
    if (element) setActiveSideBar('');

    if (url === pathname || (activeSideBar && activeSideBar === url)) {
      sessionStorage.setItem(ACTIVE_SIDE_BAR, url);
      return activeClassName;
    } else {
      return '';
    }
  };

  const renderSidebarItems = () => {
    const renderSidebarSubItems = (subItemArr: Array<any>) => {
      return subItemArr.map((subItem, subItemIndex) => {
        return (
          <li key={subItemIndex} className='sidebar-li'>
            <Link
              to={subItem.url}
              className={`sidebar-sub-item flex-center-start ${activeSidebarItem(
                subItem.url,
              )}`}
              onClick={(e) => activeSidebarItem(null, e.currentTarget)}
            >
              <p className='sidebar-item-text'>{subItem.name}</p>
              <div className='sidebar-item-active-click-mask'></div>
            </Link>
          </li>
        );
      });
    };

    return SIDEBAR_LIST.map((item, itemIndex) => {
      return (
        <Fragment key={itemIndex}>
          <li className='sidebar-li'>
            {item.url ? (
              <Link
                to={item.url}
                className={`sidebar-item flex-center-start ${activeSidebarItem(
                  item.url,
                )}`}
                onClick={(e) => activeSidebarItem(null, e.currentTarget)}
              >
                <Icon
                  icon={item.icon}
                  color='white'
                  className='sidebar-item-icon'
                />
                <p className='sidebar-item-text'>{item.name}</p>
                <div className='sidebar-item-active-click-mask'></div>
              </Link>
            ) : (
              <div role='menuitem' className='sidebar-item flex-center-start'>
                <Icon
                  icon={item.icon}
                  color='white'
                  className='sidebar-item-icon'
                />
                <p className='sidebar-item-text'>{item.name}</p>
              </div>
            )}
          </li>
          {item.sub.length > 0 ? renderSidebarSubItems(item.sub) : <></>}
        </Fragment>
      );
    });
  };

  const handleMinimizeSideBar = () => {
    const className = 'sidebar-mini';
    if (miniSideBarClassName === '') {
      setMiniSideBar(className);
      sessionStorage.setItem(MINI_SIDE_BAR, className);
    } else {
      setMiniSideBar('');
      sessionStorage.removeItem(MINI_SIDE_BAR);
    }
  };

  return (
    <div id='sidebar-main'>
      <div id='sidebar-minimize'>
        <Icon
          icon='ant-design:arrow-left-outlined'
          color='white'
          id='sidebar-minimize-icon'
          onClick={() => handleMinimizeSideBar()}
        />
      </div>
      <div className={`sidebar ${miniSideBarClassName}`}>
        <ul id='sidebar-list'>{renderSidebarItems()}</ul>
      </div>
    </div>
  );
}
