export default {
  computed: {
    /**
     * Selected translate
     * @returns {*}
     */
    lang() {
      // If selected translations exists
      if (Object.prototype.hasOwnProperty.call(
        this.$store.state.fm.settings.translations,
        this.$store.state.fm.settings.lang,
      )) {
        return this.$store.state.fm.settings.translations[
          this.$store.state.fm.settings.lang
        ];
      }
      // default translate - en
      return this.$store.state.fm.settings.translations.en;
    },
  },
};
