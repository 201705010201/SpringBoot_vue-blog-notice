var commentEdit_template = `
  <div>
    <head1 :item="3"></head1>
    <br><br><br>
    <div class="container">
      <div class="list-group" v-for="comment in comments">
        <div class="list-group-item"  v-on:click="selectitem(comment.id)">
          <h4 class="list-group-item-heading" >
            文章标题：{{comment.title}}
          </h4>
        </div>
        <div class="list-group-item" v-for="(item,index) in comment.commentList">
          <p class="list-group-item-heading" >
            {{item.author}}
            <a v-on:click="Delete(index,comment.commentList)" class="pull-right" href="javascript:;">删除</a>
          </p>
          <p class="list-group-item-text">
           {{item.content}}
          </p>
        </div>
      </div>
    </div>
  </div>
  `
const commentEdit = {
  data() {
    return {
      comments: '',
    }
  },
  methods: {
    selectitem(id) {
      router.push({
        path: 'detail',
        query: { id: id }
      })
    },
    Delete(index,arr) {
      //数据库操作
      axios.delete(store.state.url + 'comment/' + arr[index].id)
        .then(response => {
          console.log(response.data);
          arr.splice(index, 1);//从下标i开始删除1个元素：删除下标为i的元素
        })
        .catch(error => console.log(error));// 请求失败处理
    },

  },
  mounted() {
    //发送get请求
    axios.get(store.state.url + 'comments')
      .then(response => {
        //console.log(response.data)
        this.comments = response.data;
      })
      .catch(error => console.log(error));// 请求失败处理
  },
  template: commentEdit_template
}
