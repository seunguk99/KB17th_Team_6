<template>
  <div class="position-relative min-vh-100">
    <slot name="header"></slot>
    <slot name="navbar"></slot>

    <div class="content-scroll flex-grow-1 container my-4">
      <slot />
    </div>

    <slot name="footer"></slot>
  </div>
</template>
