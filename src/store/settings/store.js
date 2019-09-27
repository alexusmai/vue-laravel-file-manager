import mutations from './mutations';
import getters from './getters';

// languages
import ru from './../../lang/ru';
import en from '../../lang/en';
import ar from './../../lang/ar';
import sr from './../../lang/sr';
import cs from './../../lang/cs';
import de from './../../lang/de';
import zh_CN from './../../lang/zh_CN';

export default {
  namespaced: true,
  state() {
    return {
      // ACL
      acl: null,

      // App version
      version: '2.4.4',

      // axios headers
      headers: {},

      // axios default URL
      baseUrl: null,

      /**
       * File manager windows configuration
       * 1 - only one file manager window
       * 2 - one file manager window with directories tree module
       * 3 - two file manager windows
       */
      windowsConfig: null,

      // App language
      lang: null,

      // Translations (/src/lang)
      translations: {
        ru: Object.freeze(ru),
        en: Object.freeze(en),
        ar: Object.freeze(ar),
        sr: Object.freeze(sr),
        cs: Object.freeze(cs),
        de: Object.freeze(de),
        zh_CN: Object.freeze(zh_CN),
      },

      // Context menu items
      contextMenu: [
        [
          {
            name: 'open',
            icon: 'far fa-folder-open',
          },
          {
            name: 'audioPlay',
            icon: 'fas fa-play',
          },
          {
            name: 'videoPlay',
            icon: 'fas fa-play',
          },
          {
            name: 'view',
            icon: 'fas fa-eye',
          },
          {
            name: 'edit',
            icon: 'fas fa-file-signature',
          },
          {
            name: 'select',
            icon: 'fas fa-check',
          },
          {
            name: 'download',
            icon: 'fas fa-download',
          },
        ], [
          {
            name: 'copy',
            icon: 'far fa-copy',
          },
          {
            name: 'cut',
            icon: 'fas fa-cut',
          },
          {
            name: 'rename',
            icon: 'far fa-edit',
          },
          {
            name: 'paste',
            icon: 'far fa-clipboard',
          },
          {
            name: 'zip',
            icon: 'far fa-file-archive',
          },
          {
            name: 'unzip',
            icon: 'far fa-file-archive',
          },
        ], [
          {
            name: 'delete',
            icon: 'far fa-trash-alt text-danger',
          },
        ], [
          {
            name: 'properties',
            icon: 'far fa-list-alt',
          },
        ],
      ],

      // Image extensions for view and preview
      imageExtensions: ['png', 'jpg', 'jpeg', 'gif'],

      // Image extensions for cropping
      cropExtensions: ['png', 'jpg', 'jpeg'],

      // audio extensions for play
      audioExtensions: ['ogg', 'mp3', 'aac', 'wav'],

      // video extensions for play
      videoExtensions: ['webm', 'mp4'],

      // File extensions for code editor
      textExtensions: {
        sh: 'text/x-sh',
        // styles
        css: 'text/css',
        less: 'text/x-less',
        sass: 'text/x-sass',
        scss: 'text/x-scss',
        html: 'text/html',
        // js
        js: 'text/javascript',
        ts: 'text/typescript',
        vue: 'text/x-vue',
        // text
        htaccess: 'text/plain',
        env: 'text/plain',
        txt: 'text/plain',
        ini: 'text/x-ini',
        xml: 'application/xml',
        md: 'text/x-markdown',
        // c-like
        java: 'text/x-java',
        c: 'text/x-csrc',
        cpp: 'text/x-c++src',
        cs: 'text/x-csharp',
        scl: 'text/x-scala',
        php: 'application/x-httpd-php',
        // DB
        sql: 'text/x-sql',
        // other
        pl: 'text/x-perl',
        py: 'text/x-python',
        lua: 'text/x-lua',
        swift: 'text/x-swift',
        rb: 'text/x-ruby',
        go: 'text/x-go',
        yaml: 'text/x-yaml',
      },
    };
  },
  mutations,
  getters,
};
