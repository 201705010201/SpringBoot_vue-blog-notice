var articles_template = `
<div>
  <br><br><br>
  <div class="container">
    <div class="row  bg-light">
      <div class="col-md-8">
        <div class="media border p-3" v-for="(item,index) in articles" v-on:click="selectitem(item.id)">
          <div class="media-left">
            <img :src="url+item.thumbnail" class="img-thumbnail" style="width:150px">
          </div>
          <div class="media-body">
            <h3>{{item.title}}</h3><br>
            <p>发表日期：{{item.created}} &emsp;点击量：{{item.hits}}&emsp;评论量：{{item.comments}}</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        
        <div class="row">
          <h5>公告:</h5>
          <ul class="list-group">
            <li v-for="(item,index) in notices" class="list-group-item"  v-on:click="selectnotice(item.id)">
              {{item.title}}&emsp;{{item.created}}
            </li>
          </ul>
        </div>
        <br>
        <div class="row">
          <h5>热度文章：</h5>
          <ul class="list-group">
            <li v-on:click="selectitem(item.id)" class="list-group-item" v-for="(item,index) in top">
              {{item.title}}&emsp;点击量：{{item.hits}}&emsp;评论量：{{item.comments}}<br></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
`
const articles = {
  data() {
    return {
      articles: '',
      top: [],
      notices: '',
      url: store.state.url
    }
  },
  methods: {
    selectitem(id) {
      router.push({
        path: 'detail',
        query: { id: id }
      })
    },
    selectnotice(id) {
      router.push({
        path: 'noticeDetail',
        query: { id: id }
      })
    },
  },
  mounted() {
    //发送get请求
    axios.get(store.state.url + 'articles')
      .then(response => this.articles = response.data)
      .catch(error => console.log(error));// 请求失败处理
    axios.get(store.state.url + 'top')
      .then(response => {
        //this.top = response.data
        if (response.data.length > 10) {
          for (var i = 0; i < 10; i++) { this.top.push(response.data[i]); }
        } else { this.top = response.data }
      }).catch(error =>
        console.log(error));// 请求失败处理
    //发送get请求
    axios.get(store.state.url + 'notices')
      .then(response => this.notices = response.data)
      .catch(error => console.log(error));// 请求失败处理
  },
  template: articles_template
}