// @ts-nocheck
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import $t from '@/locale/global';
import { server } from '@/http/index';
import Switch from '@/pages/switch';

interface SubmenuState {
  [id: number]: number | null; // хранить id последнего открытого подменю
}

function Menu({ data, show, onTog, allPages }) {
  const [openSubmenu, setOpenSubmenu] = useState<SubmenuState>({});

  const SERVICES_ID = 904765767;
  const router = useRouter();
  const locale = router.locale === 'ua' ? 'uk' : router.locale;
  const toggleSubmenu = (parentId: number, id: number) => {
    if (openSubmenu[parentId] === id) {
      // закрыть текущее подменю, если оно уже открыто
      setOpenSubmenu({ ...openSubmenu, [parentId]: null });
    } else {
      // открыть новое подменю
      setOpenSubmenu({ ...openSubmenu, [parentId]: id, [SERVICES_ID]: null });
    }
  };

  useEffect(() => {
    const handleClick = event => {
      if (!event.target.classList.contains('navpart')) {
        onTog();
        setOpenSubmenu({ ...{} });
      }
    };

    document.body.addEventListener('click', handleClick);
    document.body.addEventListener('touchstart', handleClick);

    return () => {
      document.body.removeEventListener('click', handleClick);
      document.body.removeEventListener('touchstart', handleClick);
    };
  }, []);
  useEffect(() => {
    setOpenSubmenu({ ...{} });
  }, [router]);
  const hasValidChildren = item => {
    if (item?.attributes?.children?.data.length > 0) {
      return item.attributes.children.data.some(child => {
        const childUrl = child.attributes.url;
        return (
          allPages.some(page => page.attributes.url === childUrl) ||
          hasValidChildren(child) ||
          item?.attributes?.url === '/usefull'
        );
      });
    }
    return false;
  };

  const renderMenuItem = (item, parentId: number | null) => {
    const hasChildren = hasValidChildren(item);
    if (hasChildren && !item.attributes.url.startsWith('/info')) {
      const isOpen = openSubmenu[parentId] === item.id;

      return (
        <div
          className="nav-item dropdown"
          key={item.id}
          style={{ position: 'relative' }}
        >
          <span
            className={`nav-link dropdown-toggle navpart`}
            style={{ cursor: 'pointer' }}
            onClick={() => toggleSubmenu(parentId, item.id)}
          >
            {locale === 'ru'
              ? item.attributes.title
              : item.attributes[`title_${locale}`]}
          </span>
          <div
            className={`dropdown-menu ${isOpen ? 'show' : ''}`}
            style={{ position: 'absolute', right: 0, top: '100%' }}
          >
            {item.attributes.children.data.map(child => (
              <div key={child.id}>{renderMenuItem(child, item.id)}</div>
            ))}
          </div>
        </div>
      );
    } else if (
      allPages.some(
        page =>
          page.attributes.url === item.attributes.url ||
          item.attributes.url === '/services' ||
          item.attributes.url.startsWith('/info')
      )
    ) {
      if(locale === 'ru'){
        if(item.attributes.title === 'nopage'){
          return <></>
        }
      }else{
        if(item.attributes[`title_${locale}`] === 'nopage'){
          return <></>
        }
      }

      return (
        <Link
          href={item.attributes.url}
          className={`nav-link navpart`}
          key={item.id}
          onClick={() => onTog()}
        >
          {' '}
          {locale === 'ru'
            ? item.attributes.title
            : item.attributes[`title_${locale}`]}{' '}
        </Link>
      );
    }
  };

  return (
    <>
      <div
        className={`collapse navbar-collapse navpart ${show ? 'show' : ''}`}
        id="navbarCollapse"
      >
        {!!data && (
          <div className="navbar-nav ms-auto py-0">
            <Link href="/" className={`nav-item nav-link navpart`}>
              {$t[locale].menu.main}
            </Link>

            {/* <div className="nav-item dropdown" style={{ cursor: 'pointer' }} onClick={() => { setOpenSubmenu({ ...{}, [SERVICES_ID]: !openSubmenu[SERVICES_ID] }); }}>
              <span className="nav-link dropdown-toggle navpart">
                {$t[locale].menu.usefull}
              </span>
              {
                !!openSubmenu[SERVICES_ID] && <div className='dropdown-menu show' >
                  <Link href="/services" className="nav-link navpart">{$t[locale].menu.services}</Link>
                </div>
              }
            </div> */}

            {data.map(item => renderMenuItem(item, null))}

            <Link href="/blog" className={`nav-item nav-link navpart`}>
              {$t[locale].blog.title}
            </Link>
            <Link href="/contacts" className={`nav-item nav-link navpart`}>
              {$t[locale].menu.contacts}
            </Link>

            <div className="flex justify-center align-center w-full mx-auto toggler-wrap">
              <Switch />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Menu;
