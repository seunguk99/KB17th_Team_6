<template>
  <footer class="bg-light py-4 border-top">
    <div class="container">
      <div
        class="row row-cols-1 row-cols-md-6 text-center align-items-center g-3"
      >
        <div class="col">
          <a
            href="https://github.com/seunguk99/KB17th_Team_6"
            target="_blank"
            rel="noopener noreferrer"
            class="text-dark text-decoration-none d-flex flex-column align-items-center"
          >
            <strong class="mb-3">KB 가계부</strong>
            <i class="fab fa-github fa-xl"></i>
          </a>
        </div>

        <!-- 팀원 정보, 링크 -->
        <div class="col" v-for="member in team" :key="member.name">
          <div class="d-flex flex-column align-items-center">
            <strong>{{ member.name }}</strong>
            <small class="text-muted">{{ member.role }}</small>
            <a
              v-if="member.link"
              :href="member.link"
              target="_blank"
              rel="noopener noreferrer"
              class="text-secondary small"
              >GitHub</a
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const team = [
  { name: '김승욱', link: 'https://github.com/seunguk99' },
  { name: '박주용', link: 'https://github.com/ju1645' },
  { name: '양민영', link: 'https://github.com/Minyoung06' },
  { name: '윤예림', link: 'https://github.com/StarWhale0w0' },
  { name: '이유미', link: 'https://github.com/ll-04' },
];
</script>
