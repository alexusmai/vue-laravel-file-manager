<template>
    <div class="fm-grid">
        <div class="d-flex align-content-start flex-wrap">
            <div v-if="!isRootPath" v-on:click="levelUp" class="fm-grid-item text-center" >
                <div class="fm-item-icon">
                    <i class="fas fa-level-up-alt fa-5x pb-2"/>
                </div>
                <div class="fm-item-info"><strong>..</strong></div>
            </div>

            <div class="fm-grid-item text-center unselectable"
                 v-for="(directory, index) in directories"
                 v-bind:key="`d-${index}`"
                 v-bind:title="directory.basename"
                 v-bind:class="{'active': checkSelect('directories', directory.path)}"
                 v-on:click="selectItem('directories', directory.path, $event)"
                 v-on:dblclick.stop="selectDirectory(directory.path)"
                 v-on:contextmenu.prevent="contextMenu(directory, $event)">
                <div class="fm-item-icon">
                    <i class="fa-5x pb-2"
                       v-bind:class="(acl && directory.acl === 0) ? 'fas fa-unlock-alt' : 'far fa-folder'"/>
                </div>
                <div class="fm-item-info">{{ directory.basename }}</div>
            </div>

            <div class="fm-grid-item text-center unselectable"
                 v-for="(file, index) in files"
                 v-bind:key="`f-${index}`"
                 v-bind:title="file.basename"
                 v-bind:class="{'active': checkSelect('files', file.path)}"
                 v-on:click="selectItem('files', file.path, $event)"
                 v-on:dblclick="selectAction(file.path, file.extension)"
                 v-on:contextmenu.prevent="contextMenu(file, $event)">
                <div class="fm-item-icon">
                    <i v-if="acl && file.acl === 0" class="fas fa-unlock-alt fa-5x pb-2"/>
                    <thumbnail v-else-if="thisImage(file.extension)"
                               v-bind:disk="disk"
                               v-bind:file="file">
                    </thumbnail>
                    <i v-else class="far fa-5x pb-2"
                       v-bind:class="extensionToIcon(file.extension)"/>
                </div>
                <div class="fm-item-info">
                    {{ `${file.filename}.${file.extension}` }}
                    <br>
                    {{ bytesToHuman(file.size) }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import translate from '../../mixins/translate';
import helper from '../../mixins/helper';
import managerHelper from './mixins/manager';
import Thumbnail from './Thumbnail.vue';

export default {
  name: 'grid-view',
  components: { Thumbnail },
  mixins: [translate, helper, managerHelper],
  data() {
    return {
      disk: '',
    };
  },
  props: {
    manager: { type: String, required: true },
  },
  mounted() {
    this.disk = this.selectedDisk;
  },
  beforeUpdate() {
    // if disk changed
    if (this.disk !== this.selectedDisk) {
      this.disk = this.selectedDisk;
    }
  },
  computed: {
    /**
     * Image extensions list
     * @returns {*}
     */
    imageExtensions() {
      return this.$store.state.fm.settings.imageExtensions;
    },
  },
  methods: {
    /**
     * Check file extension (image or no)
     * @param extension
     * @returns {boolean}
     */
    thisImage(extension) {
      // extension not found
      if (!extension) return false;

      return this.imageExtensions.includes(extension.toLowerCase());
    },
  },
};
</script>

<style lang="scss">
    .fm-grid {
        padding-top: 1rem;

        .fm-grid-item {
            position: relative;
            width: 125px;
            padding: 0.4rem;
            margin-bottom: 1rem;
            margin-right: 1rem;
            border-radius: 5px;

            &.active {
                background-color: #c2e5eb;
                box-shadow: 3px 2px 5px gray;
            }

            &:not(.active):hover {
                background-color: #f8f9fa;
                box-shadow: 3px 2px 5px gray;
            }

            .fm-item-icon{
                cursor: pointer;
            }

            .fm-item-icon > i,
            .fm-item-icon > figure > i {
                color: #6d757d;
            }

            .fm-item-info {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
</style>
