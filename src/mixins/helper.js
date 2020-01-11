export default {
  methods: {
    /**
     * Bytes to KB, MB, ..
     * @param bytes
     * @returns {string}
     */
    bytesToHuman(bytes) {
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

      if (bytes === 0) return '0 Bytes';

      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);

      if (i === 0) return `${bytes} ${sizes[i]}`;

      return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
    },

    /**
     * Timestamp to date
     * @param timestamp
     * @returns {string}
     */
    timestampToDate(timestamp) {
      // if date not defined
      if (timestamp === undefined) return '-';

      const date = new Date(timestamp * 1000);

      return date.toLocaleString(this.$store.state.fm.settings.lang);
    },

    /**
     * Mime type to icon
     * @param mime
     * @returns {*}
     */
    mimeToIcon(mime) {
      // mime types
      const mimeTypes = {

        // image
        'image/gif': 'fa-file-image',
        'image/png': 'fa-file-image',
        'image/jpeg': 'fa-file-image',
        'image/bmp': 'fa-file-image',
        'image/webp': 'fa-file-image',
        'image/tiff': 'fa-file-image',
        'image/svg+xml': 'fa-file-image',

        // text
        'text/plain': 'fa-file-alt',

        // code
        'text/javascript': 'fa-file-code',
        'application/json': 'fa-file-code',
        'text/markdown': 'fa-file-code',
        'text/html': 'fa-file-code',
        'text/css': 'fa-file-code',

        // audio
        'audio/midi': 'fa-file-audio',
        'audio/mpeg': 'fa-file-audio',
        'audio/webm': 'fa-file-audio',
        'audio/ogg': 'fa-file-audio',
        'audio/wav': 'fa-file-audio',
        'audio/aac': 'fa-file-audio',
        'audio/x-wav': 'fa-file-audio',
        'audio/mp4': 'fa-file-audio',

        // video
        'video/webm': 'fa-file-video',
        'video/ogg': 'fa-file-video',
        'video/mpeg': 'fa-file-video',
        'video/3gpp': 'fa-file-video',
        'video/x-flv': 'fa-file-video',
        'video/mp4': 'fa-file-video',
        'video/quicktime': 'fa-file-video',
        'video/x-msvideo': 'fa-file-video',
        'video/vnd.dlna.mpeg-tts': 'fa-file-video',

        // archive
        'application/x-bzip': 'fa-file-archive',
        'application/x-bzip2': 'fa-file-archive',
        'application/x-tar': 'fa-file-archive',
        'application/gzip': 'fa-file-archive',
        'application/zip': 'fa-file-archive',
        'application/x-7z-compressed': 'fa-file-archive',
        'application/x-rar-compressed': 'fa-file-archive',

        // application
        'application/pdf': 'fa-file-pdf',
        'application/rtf': 'fa-file-word',
        'application/msword': 'fa-file-word',

        'application/vnd.ms-word': 'fa-file-word',
        'application/vnd.ms-excel': 'fa-file-excel',
        'application/vnd.ms-powerpoint': 'fa-file-powerpoint',

        'application/vnd.oasis.opendocument.text': 'fa-file-word',
        'application/vnd.oasis.opendocument.spreadsheet': 'fa-file-excel',
        'application/vnd.oasis.opendocument.presentation': 'fa-file-powerpoint',

        'application/vnd.openxmlformats-officedocument.wordprocessingml': 'fa-file-word',
        'application/vnd.openxmlformats-officedocument.spreadsheetml': 'fa-file-excel',
        'application/vnd.openxmlformats-officedocument.presentationml': 'fa-file-powerpoint',
      };

      if (mimeTypes[mime] !== undefined) {
        return mimeTypes[mime];
      }

      // file blank
      return 'fa-file';
    },

    /**
     * File extension to icon (font awesome)
     * @returns {*}
     * @param extension
     */
    extensionToIcon(extension) {
      // files extensions
      const extensionTypes = {

        // images
        gif: 'fa-file-image',
        png: 'fa-file-image',
        jpeg: 'fa-file-image',
        jpg: 'fa-file-image',
        bmp: 'fa-file-image',
        psd: 'fa-file-image',
        svg: 'fa-file-image',
        ico: 'fa-file-image',
        ai: 'fa-file-image',
        tif: 'fa-file-image',
        tiff: 'fa-file-image',

        // text
        txt: 'fa-file-alt',
        json: 'fa-file-alt',
        log: 'fa-file-alt',
        ini: 'fa-file-alt',
        xml: 'fa-file-alt',
        md: 'fa-file-alt',
        env: 'fa-file-alt',

        // code
        js: 'fa-file-code',
        php: 'fa-file-code',
        css: 'fa-file-code',
        cpp: 'fa-file-code',
        class: 'fa-file-code',
        h: 'fa-file-code',
        java: 'fa-file-code',
        sh: 'fa-file-code',
        swift: 'fa-file-code',

        // audio
        aif: 'fa-file-audio',
        cda: 'fa-file-audio',
        mid: 'fa-file-audio',
        mp3: 'fa-file-audio',
        mpa: 'fa-file-audio',
        ogg: 'fa-file-audio',
        wav: 'fa-file-audio',
        wma: 'fa-file-audio',

        // video
        wmv: 'fa-file-video',
        avi: 'fa-file-video',
        mpeg: 'fa-file-video',
        mpg: 'fa-file-video',
        flv: 'fa-file-video',
        mp4: 'fa-file-video',
        mkv: 'fa-file-video',
        mov: 'fa-file-video',
        ts: 'fa-file-video',
        '3gpp': 'fa-file-video',

        // archive
        zip: 'fa-file-archive',
        arj: 'fa-file-archive',
        deb: 'fa-file-archive',
        pkg: 'fa-file-archive',
        rar: 'fa-file-archive',
        rpm: 'fa-file-archive',
        '7z': 'fa-file-archive',
        'tar.gz': 'fa-file-archive',

        // application
        pdf: 'fa-file-pdf',

        rtf: 'fa-file-word',
        doc: 'fa-file-word',
        docx: 'fa-file-word',
        odt: 'fa-file-word',

        xlr: 'fa-file-excel',
        xls: 'fa-file-excel',
        xlsx: 'fa-file-excel',

        ppt: 'fa-file-powerpoint',
        pptx: 'fa-file-powerpoint',
        pptm: 'fa-file-powerpoint',
        xps: 'fa-file-powerpoint',
        potx: 'fa-file-powerpoint',
      };

      if (extension && extensionTypes[extension.toLowerCase()] !== undefined) {
        return extensionTypes[extension.toLowerCase()];
      }

      // blank file
      return 'fa-file';
    },
  },
};
