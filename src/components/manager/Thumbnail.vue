<template>
    <figure class="fm-thumbnail">
        <transition name="fade" mode="out-in">
            <i v-if="!src" class="far fa-file-image fa-5x pb-2"/>
            <img v-else
                 v-bind:src="src"
                 v-bind:alt="file.filename"
                 class="img-thumbnail">
        </transition>
    </figure>
</template>

<script>
import GET from '../../http/get';

export default {
  name: 'Thumbnail',
  data() {
    return {
      src: '',
    };
  },
  props: {
    disk: {
      type: String,
      required: true,
    },
    file: {
      type: Object,
      required: true,
    },
  },
  watch: {
    'file.timestamp': 'loadImage',
  },
  mounted() {
    if (window.IntersectionObserver) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.loadImage();
              obs.unobserve(this.$el);
            }
          });
        },
        {
          root: null,
          threshold: '0.5',
        },
      );

      // add observer for template
      observer.observe(this.$el);
    } else {
      this.loadImage();
    }
  },
  computed: {
    /**
     * Authorization required
     * @return {*}
     */
    auth() {
      return this.$store.getters['fm/settings/authHeader'];
    },
  },
  methods: {
    /**
     * Load image
     */
    loadImage() {
      // if authorization required
      if (this.auth) {
        GET.thumbnail(
          this.disk,
          this.file.path,
        ).then((response) => {
          const mimeType = response.headers['content-type'].toLowerCase();
          const imgBase64 = Buffer.from(response.data, 'binary').toString('base64');

          this.src = `data:${mimeType};base64,${imgBase64}`;
        });
      } else {
        this.src = `${this.$store.getters['fm/settings/baseUrl']}thumbnails?disk=${this.disk}&path=${encodeURIComponent(this.file.path)}&v=${this.file.timestamp}`;
      }
    },
  },
};
</script>

<style lang="scss">
    .fm-thumbnail {
        display: flex;
        justify-content: center;
        align-items: center;

        .img-thumbnail {
            width: 88px;
            height: 88px;
        }

        .fade-enter-active, .fade-leave-active {
            transition: opacity .3s;
        }
        .fade-enter, .fade-leave-to {
            opacity: 0;
        }
    }
</style>
