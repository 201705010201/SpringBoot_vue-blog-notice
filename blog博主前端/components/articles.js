var articles_template = `
  <div>
    <head1 :item="1"></head1>
    <br><br><br>
    <div class="container">
      <div class="media border p-3" v-for="(item,index) in articles" v-on:click="selectitem(item.id)">
        <div class="media-left" >
          <img :src="url+item.thumbnail" class="img-thumbnail" style="width:150px">
        </div>
        <div class="media-body">
          <h3>{{item.title}}</h3><br>
          <p>发表日期：{{item.created}} &emsp;点击量：{{item.hits}}&emsp;评论量：{{item.comments}} &emsp;<a href="javascript:;" @click.stop="Delete($event,index)">删除</a> &emsp; <a  @click.stop="Modify($event,item.id)" href="javascript:;">修改</a></p>
        </div>
      </div>
    </div>
  </div>
  `
const articles = {
    data() {
        return {
            articles: '',
            url: store.state.url
        }
    },
    methods: {
        selectitem(id) {
            router.push({
                path: 'articleDetail',
                query: { id: id }
            })
        },
        Delete(e,index) {
            //阻止冒泡
            e.stopPropagation();
            //数据库操作
            axios.delete(store.state.url + 'article/' + this.articles[index].id)
                .then(response => {
                    console.log(response.data);
                    this.articles.splice(index, 1);//从下标i开始删除1个元素：删除下标为i的元素
                })
                .catch(error => console.log(error));// 请求失败处理
        },
        Modify(e,id) {
          e.stopPropagation();
            router.push({
                path: 'articleEdit',
                query: { id: id },
            })
        }
    },
    mounted() {
        //发送get请求
        axios.get(store.state.url + 'articles')
            .then(response => this.articles = response.data)
            .catch(error => console.log(error));// 请求失败处理
    },
    template: articles_template
}
