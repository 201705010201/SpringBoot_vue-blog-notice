var head_template = `
  <nav class="navbar fixed-top bg-primary">
    <router-link to="/articles" v-bind:class="['nav-link',item==1 ? 'text-white' : 'text-light']" >文章列表</router-link>
    <router-link to="/articleAdd" :class="['nav-link',item==2 ? 'text-white' : 'text-light']">文章发布</router-link>
    <router-link to="/commentEdit" :class="['nav-link',item==3 ? 'text-white' : 'text-light']">评论管理</router-link>
    <router-link to="/notices" :class="['nav-link',item==4 ? 'text-white' : 'text-light']">公告栏</router-link>
  </nav>
  `
Vue.component('head1', {
  props: {
    item : String,
  },
  data: function () {
    return {

    }
  },
  template: head_template,
});
