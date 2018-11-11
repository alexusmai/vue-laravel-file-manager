<template>
    <div class="fm-breadcrumb">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb"
                v-bind:class="[manager === activeManager ? 'active-manager' : 'bg-light']">
                <li class="breadcrumb-item" v-on:click="selectMainDirectory">
                    <span class="badge badge-secondary">
                        <i class="far fa-hdd"></i>
                    </span>
                </li>
                <li class="breadcrumb-item text-truncate"
                    v-for="(item, index) in breadcrumb"
                    v-bind:key="index"
                    v-bind:class="[breadcrumb.length === index + 1 ? 'active' : '']"
                    v-on:click="selectDirectory(index)">
                    <span>{{ item }}</span>
                </li>
            </ol>
        </nav>
    </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    manager: { type: String, required: true },
  },
  computed: {
    /**
     * Active manager name
     * @returns {default.computed.activeManager|(function())|string|activeManager}
     */
    activeManager() {
      return this.$store.state.fm.activeManager;
    },

    /**
     * Selected Disk for this manager
     * @returns {default.computed.selectedDisk|(function())|default.selectedDisk|null}
     */
    selectedDisk() {
      return this.$store.state.fm[this.manager].selectedDisk;
    },

    /**
     * Selected directory for this manager
     * @returns {default.computed.selectedDirectory|(function())|default.selectedDirectory|null}
     */
    selectedDirectory() {
      return this.$store.state.fm[this.manager].selectedDirectory;
    },

    /**
     * Breadcrumb
     * @returns {*}
     */
    breadcrumb() {
      return this.$store.getters[`fm/${this.manager}/breadcrumb`];
    },
  },
  methods: {
    /**
     * Load selected directory
     * @param index
     */
    selectDirectory(index) {
      const path = this.breadcrumb.slice(0, index + 1).join('/');

      // only if this path not selected
      if (path !== this.selectedDirectory) {
        // load directory
        this.$store.dispatch(`fm/${this.manager}/selectDirectory`, { path, history: true });
      }
    },

    /**
     * Select main directory
     */
    selectMainDirectory() {
      if (this.selectedDirectory) {
        this.$store.dispatch(`fm/${this.manager}/selectDirectory`, { path: null, history: true });
      }
    },
  },
};
</script>

<style lang="scss">
    .fm-breadcrumb {

        .breadcrumb {
            flex-wrap: nowrap;
            padding: 0.2rem 0.3rem;
            margin-bottom: 0.5rem;

            &.active-manager {
                background-color: #c2e5eb;
            }

            .breadcrumb-item:not(.active):hover {
                cursor: pointer;
                font-weight: normal;
                color: #6d757d;
            }
        }
    }
</style>
