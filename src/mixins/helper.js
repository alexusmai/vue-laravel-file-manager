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

            return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
        },

        /**
         * Timestamp to date
         * @param timestamp
         * @returns {string}
         */
        timestampToDate(timestamp) {
            // if date not defined
            if (timestamp === undefined || timestamp === null) return '-';

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
                'image/gif': 'bi-file-earmark-image',
                'image/png': 'bi-file-earmark-image',
                'image/jpeg': 'bi-file-earmark-image',
                'image/bmp': 'bi-file-earmark-image',
                'image/webp': 'bi-file-earmark-image',
                'image/tiff': 'bi-file-earmark-image',
                'image/svg+xml': 'bi-file-earmark-image',

                // text
                'text/plain': 'bi-file-earmark-font',

                // code
                'text/javascript': 'bi-file-earmark-code',
                'application/json': 'bi-file-earmark-code',
                'text/markdown': 'bi-file-earmark-code',
                'text/html': 'bi-file-earmark-code',
                'text/css': 'bi-file-earmark-code',

                // audio
                'audio/midi': 'bi-file-earmark-music',
                'audio/mpeg': 'bi-file-earmark-music',
                'audio/webm': 'bi-file-earmark-music',
                'audio/ogg': 'bi-file-earmark-music',
                'audio/wav': 'bi-file-earmark-music',
                'audio/aac': 'bi-file-earmark-music',
                'audio/x-wav': 'bi-file-earmark-music',
                'audio/mp4': 'bi-file-earmark-music',

                // video
                'video/webm': 'bi-file-earmark-play',
                'video/ogg': 'bi-file-earmark-play',
                'video/mpeg': 'bi-file-earmark-play',
                'video/3gpp': 'bi-file-earmark-play',
                'video/x-flv': 'bi-file-earmark-play',
                'video/mp4': 'bi-file-earmark-play',
                'video/quicktime': 'bi-file-earmark-play',
                'video/x-msvideo': 'bi-file-earmark-play',
                'video/vnd.dlna.mpeg-tts': 'bi-file-earmark-play',

                // archive
                'application/x-bzip': 'bi-file-earmark-zip',
                'application/x-bzip2': 'bi-file-earmark-zip',
                'application/x-tar': 'bi-file-earmark-zip',
                'application/gzip': 'bi-file-earmark-zip',
                'application/zip': 'bi-file-earmark-zip',
                'application/x-7z-compressed': 'bi-file-earmark-zip',
                'application/x-rar-compressed': 'bi-file-earmark-zip',

                // application
                'application/pdf': 'bi-file-earmark-pdf',
                'application/rtf': 'bi-file-earmark-word',
                'application/msword': 'bi-file-earmark-word',

                'application/vnd.ms-word': 'bi-file-earmark-word',
                'application/vnd.ms-excel': 'bi-file-earmark-excel',
                'application/vnd.ms-powerpoint': 'bi-file-earmark-ppt',

                'application/vnd.oasis.opendocument.text': 'bi-file-earmark-word',
                'application/vnd.oasis.opendocument.spreadsheet': 'bi-file-earmark-excel',
                'application/vnd.oasis.opendocument.presentation': 'bi-file-earmark-ppt',

                'application/vnd.openxmlformats-officedocument.wordprocessingml': 'bi-file-earmark-word',
                'application/vnd.openxmlformats-officedocument.spreadsheetml': 'bi-file-earmark-excel',
                'application/vnd.openxmlformats-officedocument.presentationml': 'bi-file-earmark-ppt',
            };

            if (mimeTypes[mime] !== undefined) {
                return mimeTypes[mime];
            }

            // file blank
            return 'bi-file-earmark';
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
                gif: 'bi-file-earmark-image',
                png: 'bi-file-earmark-image',
                jpeg: 'bi-file-earmark-image',
                jpg: 'bi-file-earmark-image',
                bmp: 'bi-file-earmark-image',
                psd: 'bi-file-earmark-image',
                svg: 'bi-file-earmark-image',
                ico: 'bi-file-earmark-image',
                ai: 'bi-file-earmark-image',
                tif: 'bi-file-earmark-image',
                tiff: 'bi-file-earmark-image',
                webp: 'bi-file-earmark-image',

                // text
                txt: 'bi-file-earmark-font',
                json: 'bi-file-earmark-font',
                log: 'bi-file-earmark-font',
                ini: 'bi-file-earmark-font',
                xml: 'bi-file-earmark-font',
                md: 'bi-file-earmark-font',
                env: 'bi-file-earmark-font',

                // code
                js: 'bi-file-earmark-code',
                php: 'bi-file-earmark-code',
                css: 'bi-file-earmark-code',
                cpp: 'bi-file-earmark-code',
                class: 'bi-file-earmark-code',
                h: 'bi-file-earmark-code',
                java: 'bi-file-earmark-code',
                sh: 'bi-file-earmark-code',
                swift: 'bi-file-earmark-code',

                // audio
                aif: 'bi-file-earmark-music',
                cda: 'bi-file-earmark-music',
                mid: 'bi-file-earmark-music',
                mp3: 'bi-file-earmark-music',
                mpa: 'bi-file-earmark-music',
                ogg: 'bi-file-earmark-music',
                wav: 'bi-file-earmark-music',
                wma: 'bi-file-earmark-music',

                // video
                wmv: 'bi-file-earmark-play',
                avi: 'bi-file-earmark-play',
                mpeg: 'bi-file-earmark-play',
                mpg: 'bi-file-earmark-play',
                flv: 'bi-file-earmark-play',
                mp4: 'bi-file-earmark-play',
                mkv: 'bi-file-earmark-play',
                mov: 'bi-file-earmark-play',
                ts: 'bi-file-earmark-play',
                '3gpp': 'bi-file-earmark-play',

                // archive
                zip: 'bi-file-earmark-zip',
                arj: 'bi-file-earmark-zip',
                deb: 'bi-file-earmark-zip',
                pkg: 'bi-file-earmark-zip',
                rar: 'bi-file-earmark-zip',
                rpm: 'bi-file-earmark-zip',
                '7z': 'bi-file-earmark-zip',
                'tar.gz': 'bi-file-earmark-zip',

                // application
                pdf: 'bi-file-earmark-pdf',

                rtf: 'bi-file-earmark-word',
                doc: 'bi-file-earmark-word',
                docx: 'bi-file-earmark-word',
                odt: 'bi-file-earmark-word',

                xlr: 'bi-file-earmark-excel',
                xls: 'bi-file-earmark-excel',
                xlsx: 'bi-file-earmark-excel',

                ppt: 'bi-file-earmark-ppt',
                pptx: 'bi-file-earmark-ppt',
                pptm: 'bi-file-earmark-ppt',
                xps: 'bi-file-earmark-ppt',
                potx: 'bi-file-earmark-ppt',
            };

            if (extension && extensionTypes[extension.toLowerCase()] !== undefined) {
                return extensionTypes[extension.toLowerCase()];
            }

            // blank file
            return 'bi-file-earmark';
        },
    },
};
