<template>
  <div class="d-flex flex-column flex-wrap min-vh-100">
    <slot name="header"></slot>
    <slot name="navbar"></slot>

    <div class="content-scroll flex-grow-1 container my-4">
      <slot />
    </div>

    <slot name="footer"></slot>
  </div>
</template>
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
