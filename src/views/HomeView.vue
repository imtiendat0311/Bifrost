<script setup lang="ts"></script>

<template>
  <!-- <NavBar /> -->
  <div class="flex flex-col items-center flex-wrap gap-10 pb-10">
    <p class="font-bold text-xl text-black dark:text-white">"Bifrost vol 2"</p>
    <img
      class="rounded-xl w-6/12 h-1/6"
      alt="Biofrost vol 2"
      src="https://scontent.fdet2-1.fna.fbcdn.net/v/t1.6435-9/129719747_109649050996929_6517372574541656948_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=megAuhhlruAAX8cyDIH&_nc_ht=scontent.fdet2-1.fna&oh=00_AfA3RcJbkhUCZQoJdNy7TcGEJs2D5h5pyAj5O68bTjitwA&oe=64559442"
    />
    <div class="w-5/12 text-center text-lg font-bold text-black dark:text-white">
      Chúng tôi tin rằng mỗi cá thể hội tụ 3 yếu tố cần và đủ: thể xác, khí chất, và linh hồn.<br />Tuy
      nhiên, con người sẽ khó có thể tránh khỏi những sai lầm và vấp ngã trong cuộc sống.<br />Label
      Hoodie mang bên mình thông điểm đó để truyền tải những mảnh câu chuyện khác nhau về chính con
      người chúng ta và những quyết định bồng bột của tuổi trẻ.
    </div>
    <RouterLink to="/vol2">
      <button
        class="btn btn-ghost hover:bg-black hover:text-white dark:hover:bg-black text-black dark:text-white"
      >
        Discover More
      </button>
    </RouterLink>
  </div>
</template>
