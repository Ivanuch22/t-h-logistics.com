//@ts-nocheck

import Link from 'next/link';
import Head from 'next/head';
import { server } from '@/http';
import Script from 'next/script';
import $t from '@/locale/global';
import { useState } from 'react';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import formatDateTime from '@/utils/formateDateTime';
import Sidebar from '@/components/organisms/Sidebar';
import getRandomBanner from '@/utils/getRandomBanner';
import DefaultLayout from '@/components/layouts/default';
import MostPopular from '@/components/organisms/MostPopular';
import getRandomPopularNews from '@/utils/getRandomPopularNews';
import getHeaderFooterMenus from '@/utils/getHeaderFooterMenus';
import DefaultLayoutContext from '@/contexts/DefaultLayoutContext';
import { PaginationControl } from 'react-bootstrap-pagination-control';

const { publicRuntimeConfig } = getConfig();
const { NEXT_STRAPI_BASED_URL } = publicRuntimeConfig;

export default function Home({
  pages,
  headings,
  pagination,
  randomBanner,
  menu,
  allPages,
  footerMenus,
  footerGeneral,
  mostPopular,
  socialData,
}) {
  const router = useRouter();

  const locale = router.locale === 'ua' ? 'uk' : router.locale;
  const { query } = router;
  const { perPage } = query;
  const [paginationPage, setPaginationPage] = useState(pagination.page);


  function sanitizeImageUrl(url) {
    return url.replace(/[^a-zA-Z0-9-_.~:/?#[\]@!$&'()*+,;=%]/g, '');
  }

  const goToPage = n => {
    router.push(`/blog?page=${n}&perPage=${perPage ? perPage : '15'}`);
  }

  return (
    <>
      <Head>
        <title>{$t[locale].blog.title}</title>
        <meta
          name="description"
          content={$t[locale].blog.title}
        />
        <meta name="keywords" content={$t[locale].blog.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"
        defer
      ></Script>
      <div className="container-xxl bg-white p-0">
        <div className="container-xxl position-relative p-0">
          <DefaultLayoutContext.Provider
            value={{
              footerMenus,
              footerGeneral,
              allPages,
              menu,
              socialData,
            }}
          >
            <DefaultLayout>
              <div className="container-xxl position-relative p-0">
                <div className="container-xxl py-5 bg-primary hero-header mb-5">
                  <div className="container mb-5 mt-5 py-2 px-lg-5 mt-md-1 mt-sm-1 mt-xs-0 mt-lg-5">
                    <div className="row g-5 pt-1">
                      <div
                        className="col-12 text-center text-lg-start"
                        style={{ marginTop: '40px', marginBottom: '50px' }}
                      >
                        <h1 className="text-white animated d-flex align-items-center flex-wrap slideInLeft">
                          <Link href={`/blog`}>
                            <h2 className="d-inline text-white heading_title">{$t[locale].blog.all} | </h2>
                          </Link>
                          {headings.map((heading, index) => {
                            const headingName = heading?.attributes.Name;
                            const isLast = index === headings.length - 1;

                            return (
                              <div key={heading.id} className='d-flex gap-2 align-items-center  '>
                                <Link href={`/blog?heading=${headingName}`}>
  <h2 className="d-inline heading_title text-white heading_name">
    {headingName.charAt(0).toUpperCase() + headingName.slice(1)}
  </h2>
</Link>
                                {!isLast && <span className="d-inline heading_title text-white"> | </span>}
                              </div>
                            );
                          })}
                        </h1>
                        <nav aria-label="breadcrumb">
                          <ol className="breadcrumb justify-content-center justify-content-lg-start animated slideInLeft">
                            <li className="breadcrumb-item">
                              <a className="text-white" href="#">
                                {$t[locale].menu.main}
                              </a>
                            </li>
                            <li className="breadcrumb-item">
                              <a className="text-white" href="/blog">
                                {$t[locale].blog.title}
                              </a>
                            </li>
                          </ol>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" p-3">
                <div className="row">
                  <div className='ps-5 col article-col gap-5 pe-md-2 d-flex flex-column'>
                    {pages.map((page, index) => {
                      const { page_title, admin_date, url, heading, comments, views } = page.attributes;
                      const imageUrl = (page.attributes.image.data) ? page.attributes.image.data.attributes.url : "";

                      return (
                        <div className="row row-line" key={index}>
                          <div className="col-sm-3 col-img mb-3 mb-sm-0">
                            <div className="col-img-in">
                              <Link
                                href={`${sanitizeImageUrl(url)}`}
                                className="thumb-responsive lazy-load a-not-img lazy-loaded"
                                style={{ backgroundImage: `url(${sanitizeImageUrl(NEXT_STRAPI_BASED_URL + imageUrl)})` }}
                              />
                            </div>
                          </div>
                          <div className="col-sm-8 col-txt d-flex flex-column justify-content-between ">
                            <h2 className="entry-title text-uppercase">
                              <Link className="entry-title text-uppercase h4" href={url}>{page_title}</Link>
                            </h2>
                            <div className="hidden-sm hidden-xs pb-2">
                              <div className="entry-header" style={{ clear: "both" }}>
                                <div className="align-items-center d-flex">
                                  <span className="category-color" style={{ paddingRight: 10, color: "#933758" }}>
                                    <Link href={`/blog?heading=${heading.data?.attributes.Name}`} className="text-info text-capitalize fw-bold a-not-img">
                                      {heading.data?.attributes.Name}
                                    </Link>
                                  </span>
                                  <span className="date part">
                                    {formatDateTime(admin_date, false)}
                                  </span>
                                  <div className='view part'>
                                    <div className='w-auto'><img className='me-1' src="https://itc.ua/wp-content/themes/ITC_6.0/images/eye2.png" height="11" width="17" alt="views icon"></img>{views}</div>

                                  </div>
                                  <span className="comments part" >
                                    <Link href={`${url}#comment`} className="">
                                      <img src="https://itc.ua/wp-content/themes/ITC_6.0/images/comment_outline_24.svg" height="24" width="24" alt="comment" />
                                      <span className="disqus-comment-count" data-disqus-url="https://itc.ua/ua/novini/sylovu-bronyu-v-seriali-fallout-zrobyly-bez-vtruchannya-bethesda-a-ot-na-robochomu-pip-boy-v-kompaniyi-napolyagaly/" data-disqus-identifier="2259249 https://itc.ua/?p=2259249">{comments.data.length}</span>
                                    </Link>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                  </div>
                  <div className=' col-md-auto  mx-360'>
                    <Sidebar randomBanner={randomBanner}></Sidebar>
                    <MostPopular title={$t[locale].blog.mostpopular} data={mostPopular} />
                  </div>
                </div>
              </div>
              <div className="d-flex mt-5 justify-content-center">
                {2 && (
                  <PaginationControl
                    page={paginationPage}
                    between={4}
                    total={pagination.total}
                    limit={pagination.pageSize}
                    changePage={page => {
                      setPaginationPage(page);
                      goToPage(page);
                    }}
                    ellipsis={1}
                  />
                )}
              </div>
            </DefaultLayout>
          </DefaultLayoutContext.Provider>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps({ query, locale }) {
  const { page = 1, perPage = 5, heading = '' } = query;
  let pages, pagination, headings;

  const Locale = locale === 'ua' ? 'uk' : locale;
  const filter = heading ? `&filters[heading][Name]=${heading}` : '';


  const randomBanner = await getRandomBanner(locale);
  const mostPopular = await getRandomPopularNews(locale);

  try {
    const getHeadings = await server.get(`/headings?locale=${Locale}`);
    headings = getHeadings.data.data
  } catch (e) {
    console.error("Error fetching headings data", e);
    headings = [];
  }
  try {
    const getPages = await server.get(`/blogs?populate=*&locale=${Locale}&pagination[page]=${page}&pagination[pageSize]=${perPage}${filter}&sort[0]=admin_date:desc`);
    pages = getPages.data.data;
    pagination = getPages.data.meta.pagination;
  } catch (e) {
    console.error("Error fetching data", e);
  }

  try {
    const { menu, allPages, footerMenus, footerGeneral } = await getHeaderFooterMenus(Locale);
    const socialRes = await server.get('/social');
    const socialData = socialRes.data.data.attributes;

    return {
      props: {
        randomBanner,
        pages,
        headings,
        mostPopular,
        pagination,
        menu,
        allPages,
        footerMenus,
        footerGeneral,
        socialData: socialData ?? null,
      },
    };
  } catch (error) {
    console.error("Error fetching header/footer data", error);

    return {
      props: {
        randomBanner,
        pages,
        pagination,
        menu: [],
        allPages: [],
        footerMenus: { about: {}, services: {}, contacts: {} },
        footerGeneral: {},
        socialData: null,
      },
    };
  }
}

