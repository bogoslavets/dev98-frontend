<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <!-- <VueRssFeed :feedUrl="feedUrl" :name="name" :limit="limit" /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
//import VueRssFeed from "vue-rss-feed/src/VueRssFeed.vue";
import axios from "axios";

@Component({
  components: {
    HelloWorld,
    //VueRssFeed,
  },
})
export default class Home extends Vue {
  //feedUrl = "https://dev98.de/feed/";
  //name = "";
  //limit = 5;

  mounted() {
    axios
      .get("https://dev98.de/feed/", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          //"Access-Control-Allow-Origin": "https://dev98.de/feed/",
          "Content-Type": "application/rss+xml",
          credentials: "include",
          "Access-Control-Allow-Credentials": true,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log({ error });
      });

    jQuery.getFeed({
      url: "https://dev98.de/feed/",
      success: function (feed) {
        console.log(feed.title);
        // do more stuff here
      },
    });
  }
}
</script>
