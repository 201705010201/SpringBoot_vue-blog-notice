var articleAdd_template = `
<div>
    <head1 :item="2"></head1>
    <br><br><br>
    <div class="container">
    <div>新闻标题：<input type="text" class="form-control" v-model="article.title" /></div>
    <br>缩略图：
    <img :src="url+article.thumbnail" class="img-thumbnail" style="width:200px;height:200px"><br><br>
    <input type="file" @change="uploadFile($event)" class="form-control" />
    内容：
    <vue-html5-editor @change="updateData" :content="article.content" :height="300" ref="editor"></vue-html5-editor>

    <br><button type="button" class="btn-block btn-primary" v-on:click="Save">保存</button>
    </div>
</div>
        `
const articleAdd = {
  data() {
    return {
      article: { id: '', title: '', content: '', thumbnail: 'upload/placeholder.png' },
      url: store.state.url,
      // imgurl: store.state.imgurl,
    }
  },
  methods: {
    updateData: function (data) {
      // sync content to component
      this.article.content = data
    },
    //保存
    Save: function () {
      console.log(this.article);
      if (this.article.title == '' || this.article.content == '') {
        alert("标题或内容不能为空!");
        return;
      }

      this.article.content = this.article.content.replace(/<img/g, '<img  class="img-fluid" ')  //增加图片自适应样式
      axios.post(store.state.url + 'article/', this.article)
        .then(response => console.log(response.data))
        .catch(error => console.log(error));// 请求失败处理

      //还原模板
      this.article = { id: '', title: '', content: '', thumbnail: 'upload/placeholder.png' };
    },
    //上传图片
    uploadFile(event) {
      var file = event.target.files[0]; //获取input的图片file值
      var formData = new FormData();     // 创建form对象
      formData.append('myfile', file);     //对应后台接收图片名

      axios.post(this.url + 'file', formData)
        .then(response => this.article.thumbnail = response.data)
        .catch(error => console.log(error));// 请求失败处理
    },

  },

  template: articleAdd_template
}
