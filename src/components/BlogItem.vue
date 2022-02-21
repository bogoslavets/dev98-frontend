<template>
  <div class="blog-item" v-if="item">
    <div>
      <h2>{{ item.title }}</h2>
    </div>
    <div>
      <div class="label-grid">
        <span
          class="label"
          v-for="(category, index) in item.categories"
          :key="index"
        >
          <svg class="label-marker" fill="currentColor" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="3" />
          </svg>
          {{ category }}
        </span>
      </div>
    </div>
    <div>
      <p class="content">
        {{ item.content }}
        <!-- .slice(0, item.content.length - 20) -->
      </p>
    </div>
    <div class="card-footer">
      <div class="author">
        <img
          class="author-image"
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
          alt=""
        />
        <div style="margin-left: 10px">
          <p>{{ item.author }}</p>
          <p>
            {{
              new Date(item.isoDate).toLocaleDateString("de-DE", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
            }}
          </p>
        </div>
      </div>
      <div>
        <a :href="item.link" target="_blank" class="link">Read More</a>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$blog-item-color: #f9fafb;
$blog-item-hover-color: #f3f4f6;
$blog-item-border-hover-color: #e5e7eb;
$label-color: #dbeafe;
$transition: all 0.3s;

.blog-item {
  background-color: $blog-item-color;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid $blog-item-hover-color;
  border-radius: 20px;
  padding: 0px 8px;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.03);
    background-color: $blog-item-hover-color;
    border: 2px solid $blog-item-border-hover-color;
  }
}
.label-grid {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .label {
    display: flex;
    margin: 6px;
    padding: 5px 8px;
    border-radius: 50px;
    background-color: $label-color;
    font-size: 0.75rem;
    line-height: 1rem;
    &:hover {
      background: rgb(219, 234, 254);
      background: linear-gradient(
        157deg,
        rgba(219, 234, 254, 1) 0%,
        rgba(220, 252, 231, 1) 100%
      );
      > .label-marker {
        color: #14b8a6;
      }
    }
    .label-marker {
      align-self: center;
      width: 6px;
      height: 6px;
      margin-right: 0.375rem;
    }
  }
}
.card-footer {
  margin-bottom: 10px;
  bottom: 0;
  justify-content: space-between;
  display: flex;
  border-width: 0;
  border-style: solid;
  border-color: #e5e7eb;
  .author {
    display: flex;
    .author-image {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 100px;
    }
  }
}
@mixin link {
  background-color: #93c5fd;
  color: white;
  padding: 15px 20px;
  border-radius: 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}
a {
  &:link {
    @include link;
  }
  &:visited {
    @include link;
  }
  &:hover {
    background-color: #60a5fa;
  }
  &:active {
    background-color: #60a5fa;
  }
}

p {
  text-align: left;
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin: 0px;
}
.content {
  margin: 1em;
}
</style>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FeedItem } from "@/types/elements.types";
@Component({
  components: {},
})
export default class BlogItem extends Vue {
  @Prop({
    default: {},
  })
  item!: FeedItem;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
