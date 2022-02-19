<template>
  <div class="container">
    <FeedItem v-for="(item, index) in feedItems" :key="index" :item="item" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Feed, FeedItem } from "@/types/elements.types";
import axios from "axios";

@Component({
  components: {
    FeedItem: async () => import("../components/FeedItem.vue"),
    //VueRssFeed,
  },
})
export default class Home extends Vue {
  //feedUrl = "https://dev98.de/feed/";

  feed: Feed = null as unknown as Feed;
  feedItems: FeedItem[] = [];

  async mounted() {
    await axios
      .get(
        "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fdev98.de%2Ffeed%2F"
      )
      .then((response) => {
        console.log(response);
        console.log(response.data);
        this.feed = response.data.feed;
        this.feedItems = response.data.items;
      })
      .catch((error) => {
        console.log({ error });
      });
  }
}
</script>
