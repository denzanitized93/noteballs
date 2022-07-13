<template>
  <nav
    class="navbar is-success"
    aria-label="main navigation"
    role="navigation"
  >
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <div class="navbar-item is-size-4 is-family-monospace">
          Noteballs
        </div>

        <a
          @click.prevent="showMobileNav = !showMobileNav"
          class="navbar-burger"
          :class="{ 'is-active': showMobileNav }"
          aria-expanded="false"
          aria-label="menu"
          data-target="navbarBasicExample"
          role="button"
          ref="navbarBurgerRef"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        :class="{ 'is-active': showMobileNav }"
        class="navbar-menu"
        ref="navbarMenuRef"
      >
        <div class="navbar-start">
          <button
            v-if="storeAuth.user.id"
            @click="logout"
            class="button is-small is-info ml-3 mt-3"
          >
            Logout {{ storeAuth.user.email }}
          </button>
        </div>
        <div class="navbar-end">
          <RouterLink
            @click="showMobileNav = false"
            class="navbar-item"
            to="/"
            active-class="is-active"
          >Notes</RouterLink>
          <RouterLink
            @click="showMobileNav = false"
            class="navbar-item"
            to="/stats"
            active-class="is-active"
          >Stats</RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
/**
 * Imports
 */
  import { ref } from 'vue'
  import { onClickOutside } from '@vueuse/core'
  import { useStoreAuth } from '@/stores/storeAuth'

/**
 * Mobile nav
 */
  const showMobileNav = ref(false)

  /**
   * stores
   */
  const storeAuth = useStoreAuth()

  /**
   * Vue use
   */
  const navbarMenuRef = ref(null)
  const navbarBurgerRef = ref(null)
  onClickOutside(navbarMenuRef, (event) => {
    showMobileNav.value = false
  }, {
    ignore: [navbarBurgerRef]
  })

  const logout = () => {
    storeAuth.logoutUser()
    showMobileNav.value = false
  }

</script>

<style>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>