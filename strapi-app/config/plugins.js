// ./config/plugins.js`
'use strict';

module.exports = {
  i18n: {
    enabled: true,
    defaultLocale: "ru", // Set your default locale
    locales: ["en", "ru", "uk"], // Add your supported locales
  },
  'responsive-image': {
    breakpoints: [320, 640, 768, 1024, 1366, 1920], // Визначте необхідні розміри
    format: ['webp', 'jpeg'], // Виберіть формати для оптимізації
    quality: 70, // Встановіть якість зображення
    progressive: true, // Використовуйте прогресивне завантаження для JPEG
  },
  menus: {
    config: {
      layouts: {
        menuItem: { // This is the menu item edit panel.
          link: [ // This is the "link" tab in the menu item edit panel.
            {
              input: {
                label: 'Title EN',
                name: 'title_en',
                type: 'text',
                placeholder: 'Английский перевод',
                required: true,
              },
              grid: {
                col: 12,
              },
            },
            {
              input: {
                label: 'Title UA',
                name: 'title_uk',
                type: 'text',
                placeholder: 'Украинский перевод',
                required: true,
              },
              grid: {
                col: 12,
              },
            },
          ],
        },
      },
    },
  },
  comments: {
    enabled: true,
    config: {
      badWords: false,
      moderatorRoles: ["Authenticated"],
      approvalFlow: ["api::blog.blog"],
      entryLabel: {
        "*": ["Title", "title", "Name", "name", "Subject", "subject"],
        "api::blog.blog": ["MyField"],
      },
      blockedAuthorProps: ["name", "email"],
      reportReasons: {
        MY_CUSTOM_REASON: "MY_CUSTOM_REASON",
      },
      gql: {
        // ...
      },
    },
  },
};