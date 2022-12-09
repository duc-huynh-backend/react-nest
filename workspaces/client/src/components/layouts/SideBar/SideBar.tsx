import './SideBar.scss';

import { Fragment, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Icon } from '@iconify/react';
import { APP_URL } from 'src/utils/constants';
import { sessionService } from 'src/services/sessionService';

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

const ITEM_ACTIVE_CLASS_NAME = 'sidebar-item-active';
const SUB_ITEM_ACTIVE_CLASS_NAME = 'sidebar-sub-item-active';
const MINI_SIDEBAR_CLASS_NAME = 'sidebar-mini';
const ACTIVE_SIDEBAR = 'ACTIVE_SIDEBAR';

export function Sidebar() {
  const { pathname } = useLocation();
  const [miniSideBar, setMiniSideBar] = useState('');
  const [activeItem, setActiveItem] = useState('');

  const activeSidebar = sessionService.get(ACTIVE_SIDEBAR);

  // Remove session storage memory of active sidebar for the first time
  useEffect(() => sessionService.remove(ACTIVE_SIDEBAR), []);

  // Re-state active sidebar every click sidebar event
  useEffect(() => setActiveItem(activeSidebar), [activeSidebar]);

  const renderActiveSidebarItem = (
    url: string | null,
    itemName: string | null,
    activeClassName: string,
  ) => {
    if (url === pathname || itemName === activeItem) return activeClassName;
    return '';
  };

  const selectActiveSidebar = (itemName: string) =>
    sessionService.set(ACTIVE_SIDEBAR, itemName);

  const renderSidebarSubItems = (
    subItemArr: Array<any>,
    parentName: string,
  ) => {
    return subItemArr.map((subItem, subItemIndex) => {
      return (
        <li key={subItemIndex} className='sidebar-li'>
          <Link
            to={subItem.url}
            className='sidebar-sub-item flex-center-start'
            onClick={() => selectActiveSidebar(parentName)}
          >
            <p
              className={`sidebar-item-text ${renderActiveSidebarItem(
                subItem.url,
                null,
                SUB_ITEM_ACTIVE_CLASS_NAME,
              )}`}
            >
              {subItem.name}
            </p>
            <div className='sidebar-item-active-click-mask'></div>
          </Link>
        </li>
      );
    });
  };

  const renderSidebarItems = () => {
    return SIDEBAR_LIST.map((item, itemIndex) => {
      return (
        <Fragment key={itemIndex}>
          <li className='sidebar-li'>
            {item.url ? (
              <Link
                to={item.url}
                className={`sidebar-item flex-center-start ${renderActiveSidebarItem(
                  item.url,
                  item.name,
                  ITEM_ACTIVE_CLASS_NAME,
                )}`}
                onClick={() => selectActiveSidebar(item.name)}
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
              <div
                role='menuitem'
                className={`sidebar-item flex-center-start ${renderActiveSidebarItem(
                  item.url,
                  item.name,
                  ITEM_ACTIVE_CLASS_NAME,
                )}`}
              >
                <Icon
                  icon={item.icon}
                  color='white'
                  className='sidebar-item-icon'
                />
                <p className='sidebar-item-text'>{item.name}</p>
              </div>
            )}
            {item.sub.length > 0 && (
              <ul className='sidebar-list'>
                {renderSidebarSubItems(item.sub, item.name)}
              </ul>
            )}
          </li>
        </Fragment>
      );
    });
  };

  const handleMinimizeSideBar = () => {
    miniSideBar === ''
      ? setMiniSideBar(MINI_SIDEBAR_CLASS_NAME)
      : setMiniSideBar('');
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
      <div className={`sidebar ${miniSideBar}`}>
        <ul className='sidebar-list'>{renderSidebarItems()}</ul>
      </div>
    </div>
  );
}
