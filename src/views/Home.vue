<template>
  <div>
    <div v-if="feed && feed.description" style="padding: 30px">
      <h1>{{ feed.description }}</h1>
    </div>
    <div class="grid-container">
      <BlogItem
        v-for="(item, index) in feedItems"
        :key="index"
        :item="item"
        class="cell small-12 medium-6 large-4"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
/*
Breakpoints
*/
$bp-small: 640px;
$bp-medium: 1024px;
$grid-width: 1200px;

/*
Grid settings
*/

$columns-number: 12;
$columns-gutter: 20px;
$rows-gutter: 20px;

/*
Grid generator
*/
.grid-container {
  // Define a grid's width
  width: 100%;
  max-width: $grid-width;
  // Center the grid
  margin: 0 auto;
  // The grid
  display: grid;
  grid-template-columns: repeat($columns-number, auto);
  //gap
  grid-column-gap: $columns-gutter;
  grid-row-gap: $rows-gutter;
  //direction ->
  grid-auto-flow: row;

  // Default cell
  .cell {
    grid-column: span $columns-number;
  }
  // RESPONSIVE
  // Loop for small screen
  @for $i from 1 through $columns-number {
    .small-#{$i} {
      grid-column: span $i;
      // Offsets
      @for $j from 1 through $columns-number {
        &.small-offset-#{$j} {
          grid-column: $j / span $i;
        }
      }
    }
  }

  // Loop for medium screen
  @for $i from 1 through $columns-number {
    @media screen and (min-width: $bp-small + 1) {
      .medium-#{$i} {
        grid-column: span $i;
        // Offsets
        @for $j from 1 through $columns-number {
          &.mediuml-offset-#{$j} {
            grid-column: $j / span $i;
          }
        }
      }
    }
  }

  // Loop for large screen
  @for $i from 1 through $columns-number {
    .large-#{$i} {
      @media screen and (min-width: $bp-medium + 1) {
        grid-column: span $i;
        // Offsets
        @for $j from 1 through $columns-number {
          &.large-offset-#{$j} {
            grid-column: $j / span $i;
          }
        }
      }
    }
  }

  // Loop for screen larger than grid
  @for $i from 1 through $columns-number {
    .xlarge-#{$i} {
      @media screen and (min-width: $grid-width + 1) {
        grid-column: span $i;
        // Offsets
        @for $j from 1 through $columns-number {
          &.xlarge-offset-#{$j} {
            grid-column: $j / span $i;
          }
        }
      }
    }
  }
}
</style>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Feed, FeedItem } from "@/types/elements.types";
//import axios from "axios";
import Parser from "rss-parser";

@Component({
  components: {
    BlogItem: async () => import("../components/BlogItem.vue"),
  },
})
export default class Home extends Vue {
  feedUrl = "https://dev98.de/feed/";

  feed: Feed = null as unknown as Feed;
  feedItems: FeedItem[] = [];

  async mounted() {
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
    let pars = new Parser();
    let feed = await pars
      .parseURL(CORS_PROXY + "https://dev98.de/feed/")
      .then((responce) => {
        console.log(responce);
        this.feed = {
          url: responce.feedUrl,
          description: responce.description,
          image: responce.image?.url,
        };
        responce.items.forEach((item) => {
          const fItem: FeedItem = {
            author: item.creator,
            categories: item.categories,
            content: item.contentSnippet,
            //content: item.content,
            guid: item.guid,
            link: item.link,
            pubDate: item.pubDate,
            isoDate: item.isoDate,
            title: item.title,
          };
          this.feedItems.push(fItem);
        });
      });
  }
}
</script>
