<template>
    <div class="fm-context-menu"
         tabindex="-1"
         ref="contextMenu"
         v-if="menuVisible"
         v-bind:style="menuStyle"
         v-on:blur="closeMenu">
        <ul class="list-unstyled">
            <li class="disabled" v-if="showMenuItem('info')">
                {{ `${lang.contextMenu.info} ${selectedItems.length}` }}
            </li>
            <li v-if="showMenuItem('open')"
                v-on:click="menuAction('open')">
                <i class="far fa-fw fa-folder-open"></i>
                {{ lang.contextMenu.open }}
            </li>
            <li v-if="showMenuItem('view')"
                v-on:click="menuAction('view')">
                <i class="fas fa-fw fa-eye"></i>
                {{ lang.contextMenu.view }}
            </li>
            <li v-if="showMenuItem('select')"
                v-on:click="menuAction('select')">
                <i class="fas fa-fw fa-check"></i>
                {{ lang.contextMenu.select }}
            </li>
            <li v-if="showMenuItem('download')"
                v-on:click="menuAction('download')">
                <i class="fas fa-fw fa-download"></i>
                {{ lang.contextMenu.download }}
            </li>
        </ul>
        <ul class="list-unstyled">
            <li v-on:click="menuAction('copy')">
                <i class="far fa-fw fa-copy"></i>
                {{ lang.contextMenu.copy }}
            </li>
            <li v-on:click="menuAction('cut')">
                <i class="fas fa-fw fa-cut"></i>
                {{ lang.contextMenu.cut }}
            </li>
            <li v-if="showMenuItem('rename')"
                v-on:click="menuAction('rename')">
                <i class="far fa-fw fa-edit"></i>
                {{ lang.contextMenu.rename }}
            </li>
            <li v-if="showMenuItem('paste')"
                v-on:click="menuAction('paste')">
                <i class="far fa-fw fa-clipboard"></i>
                {{ lang.contextMenu.paste }}
            </li>
        </ul>
        <ul class="list-unstyled">
            <li class="text-danger" v-on:click="menuAction('delete')">
                <i class="far fa-fw fa-trash-alt"></i>
                {{ lang.contextMenu.delete }}
            </li>
        </ul>
        <ul class="list-unstyled" v-if="showMenuItem('properties')">
            <li v-on:click="menuAction('properties')">
                <i class="far fa-fw fa-list-alt"></i>
                {{ lang.contextMenu.properties }}
            </li>
        </ul>
    </div>
</template>

<script>
/* eslint-disable no-param-reassign */
import EventBus from '../eventBus';
import helper from './../mixins/helper';

export default {
  name: 'ContextMenu',
  mixins: [helper],
  data() {
    return {
      menuVisible: false,
      // styles
      menuStyle: {
        top: 0,
        left: 0,
      },
    };
  },
  computed: {
    // active manager
    activeManager() {
      return this.$store.state.fm.activeManager;
    },

    // selected disk
    selectedDisk() {
      return this.$store.getters['fm/selectedDisk'];
    },

    // selected files, folders
    selectedItems() {
      return this.$store.getters['fm/selectedItems'];
    },

    // clipboard state
    clipboard() {
      return this.$store.state.fm.clipboard;
    },
  },
  mounted() {
    // add event handler
    EventBus.$on('contextMenu', event => this.showMenu(event));
  },
  methods: {
    // show context menu
    showMenu(event) {
      if (this.selectedItems) {
        this.menuVisible = true;

        // focus on menu
        this.$nextTick(() => {
          this.$refs.contextMenu.focus();
          // set menu params
          this.setMenu(event.pageY, event.pageX);
        });
      }
    },

    /**
     * Set menu coordinates
     * @param top
     * @param left
     */
    setMenu(top, left) {
      // get parent el (.fm-body)
      const el = this.$refs.contextMenu.parentNode;

      // get parent el size
      const elSize = el.getBoundingClientRect();

      // actual coordinates of the block
      const elY = window.pageYOffset + elSize.top;
      const elX = window.pageXOffset + elSize.left;

      // calculate the preliminary coordinates
      let menuY = top - elY;
      let menuX = left - elX;

      // calculate max X and Y coordinates
      const maxY = elY + (el.offsetHeight - this.$refs.contextMenu.offsetHeight - 25);
      const maxX = elX + (el.offsetWidth - this.$refs.contextMenu.offsetWidth - 25);

      if (top > maxY) menuY = maxY - elY;
      if (left > maxX) menuX = maxX - elX;

      // set coordinates
      this.menuStyle.top = `${menuY}px`;
      this.menuStyle.left = `${menuX}px`;
    },

    // Close context menu
    closeMenu() {
      this.menuVisible = false;
    },

    /**
     * Menu items
     * @param name
     * @returns {boolean}
     */
    showMenuItem(name) {
      const multiSelect = this.selectedItems.length > 1;
      const firstItemType = this.selectedItems[0].type;

      switch (name) {
        case 'info':
          if (multiSelect) return true;
          break;
        case 'open':
          // open selected folder
          if (!multiSelect && firstItemType === 'dir') return true;
          break;
        case 'select':
          // select file
          if (this.$store.state.fm.fileCallback && !multiSelect && firstItemType === 'file') return true;
          break;
        case 'view':
          // view image
          if (
            !multiSelect &&
            firstItemType === 'file' &&
            this.canView(this.selectedItems[0].extension)
          ) return true;
          break;
        case 'download':
          // download file
          if (!multiSelect && firstItemType === 'file') return true;
          break;
        case 'paste':
          // paste files and folders
          if (this.clipboard.type) return true;
          break;
        case 'rename':
          // rename file or folder
          if (!multiSelect) return true;
          break;
        case 'properties':
          // show element properties
          if (!multiSelect) return true;
          break;
        default:
          return false;
      }

      return false;
    },

    /**
     * Context menu actions
     * @param name
     */
    menuAction(name) {
      switch (name) {
        case 'open':
          // select directory
          this.$store.dispatch(`fm/${this.activeManager}/selectDirectory`, {
            path: this.selectedItems[0].path,
            history: true,
          });
          break;
        case 'select':
          // file callback
          this.$store.dispatch('fm/url', {
            disk: this.selectedDisk,
            path: this.selectedItems[0].path,
          });
          break;
        case 'view':
          // show image
          this.$store.commit('fm/modal/setModalState', {
            modalName: 'Preview',
            show: true,
          });
          break;
        case 'download': {
          // download file
          const tempLink = document.createElement('a');
          tempLink.style.display = 'none';
          tempLink.href = this.downloadLink();
          tempLink.setAttribute('download', this.selectedItems[0].basename);
          tempLink.setAttribute('target', '_blank');
          document.body.appendChild(tempLink);
          // click link
          tempLink.click();
          // remove link
          document.body.removeChild(tempLink);
          break;
        }
        case 'copy':
          // add selected items to the clipboard
          this.$store.dispatch('fm/toClipboard', 'copy');
          break;
        case 'cut':
          // add selected items to the clipboard
          this.$store.dispatch('fm/toClipboard', 'cut');
          break;
        case 'rename':
          // show selected modal
          this.$store.commit('fm/modal/setModalState', {
            modalName: 'Rename',
            show: true,
          });
          break;
        case 'paste':
          // paste items in the selected folder
          this.$store.dispatch('fm/paste');
          break;
        case 'delete':
          // show selected modal
          this.$store.commit('fm/modal/setModalState', {
            modalName: 'Delete',
            show: true,
          });
          break;
        case 'properties':
          // show properties modal window
          this.$store.commit('fm/modal/setModalState', {
            modalName: 'Properties',
            show: true,
          });
          break;
        default:
      }

      // close menu
      this.closeMenu();
    },

    /**
     * If image - show preview
     * @param extension
     * @returns {*|boolean}
     */
    canView(extension) {
      const img = ['png', 'jpg', 'jpeg', 'gif'];

      return img.includes(extension.toLowerCase());
    },

    downloadLink() {
      return `${location.protocol}//${location.hostname}/file-manager/download?disk=${this.selectedDisk}&path=${this.selectedItems[0].path}`;
    },
  },
};
</script>

<style lang="scss">
    .fm-context-menu {
        position: absolute;
        z-index: 9997;
        background-color: white;
        box-shadow: 3px 2px 5px gray;
        border-radius: 5px;

        .list-unstyled {
            margin-bottom: 0;
            border-bottom: 1px solid rgba(0,0,0,.125);
        }

        ul > li {
            padding: 0.4rem 1rem;
        }

        ul > li:not(.disabled) {
            cursor: pointer;

            &:hover {
                background-color: #f8f9fa;
            }

            i {
                padding-right: 2rem;
            }
        }
    }
</style>
