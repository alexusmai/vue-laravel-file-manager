<template>
    <div ref="contextMenu"
         v-if="menuVisible"
         v-bind:style="menuStyle"
         v-on:blur="closeMenu"
         class="fm-context-menu"
         tabindex="-1">
        <ul v-for="(group, index) in menu"
            v-bind:key="`g-${index}`"
            class="list-unstyled">
            <li v-for="(item, index) in group"
                v-bind:key="`i-${index}`"
                v-if="showMenuItem(item.name)"
                v-on:click="menuAction(item.name)">
                <i class="fa-fw" v-bind:class="item.icon"/>
                {{ lang.contextMenu[item.name] }}
            </li>
        </ul>
    </div>
</template>

<script>
/* eslint-disable no-param-reassign */
import EventBus from '../../eventBus';
import translate from '../../mixins/translate';
import contextMenu from './mixins/contextMenu';
import contextMenuRules from './mixins/contextMenuRules';
import contextMenuActions from './mixins/contextMenuActions';

export default {
  name: 'ContextMenu',
  mixins: [translate, contextMenu, contextMenuRules, contextMenuActions],
  data() {
    return {
      menuVisible: false,
      menuStyle: {
        top: 0,
        left: 0,
      },
    };
  },
  mounted() {
    /**
     * Listen events
     * 'contextMenu'
     */
    EventBus.$on('contextMenu', (event) => this.showMenu(event));
  },
  computed: {
    /**
     * Context menu items
     * @returns {*}
     */
    menu() {
      return this.$store.state.fm.settings.contextMenu;
    },
  },
  methods: {
    /**
     * Show context menu
     * @param event
     */
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
     * Set context menu coordinates
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

    /**
     * Close context menu
     */
    closeMenu() {
      this.menuVisible = false;
    },

    /**
     * Show context menu item
     * @param name
     * @returns {*}
     */
    showMenuItem(name) {
      if (Object.prototype.hasOwnProperty.call(this, `${name}Rule`)) {
        return this[`${name}Rule`]();
      }

      return false;
    },

    /**
     * Call actions when clicking the context menu
     * @param name
     */
    menuAction(name) {
      if (Object.prototype.hasOwnProperty.call(this, `${name}Action`)) {
        this[`${name}Action`]();
      }
      // close context menu
      this.closeMenu();
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

        &:focus {
            outline: none;
        }

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
