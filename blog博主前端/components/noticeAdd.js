var noticeAdd_template = `
<div>
    <br><br><br>
    <div class="container">
    <div>公告标题：<input type="text" class="form-control" v-model="notice.title" /></div>
    内容：
    <vue-html5-editor @change="updateData" :content="notice.content" :height="300" ref="editor"></vue-html5-editor>

    <br><button type="button" class="btn-block btn-primary" v-on:click="Save">发布</button>
    </div>
</div>
        `
const noticeAdd = {
  data() {
    return {
      notice: { id: '', title: '', content: '' },
      url: store.state.url,
      // imgurl: store.state.imgurl,
    }
  },
  methods: {
    updateData: function (data) {
      // sync content to component
      this.notice.content = data
    },
    //保存
    Save: function () {
      //console.log(this.article);
      if (this.notice.title == '' || this.notice.content == '') {
        alert("标题或内容不能为空!");
        return;
      }

      this.notice.content = this.notice.content.replace(/<img/g, '<img  class="img-fluid" ')  //增加图片自适应样式
      axios.post(store.state.url + 'notice/', this.notice)
        .then(response => console.log(response.data))
        .catch(error => console.log(error));// 请求失败处理

      //还原模板
      this.notice = { id: '', title: '', content: '' };
    },
    //上传图片
    // uploadFile(event) {
    //   var file = event.target.files[0]; //获取input的图片file值
    //   var formData = new FormData();     // 创建form对象
    //   formData.append('myfile', file);     //对应后台接收图片名

    //   axios.post(this.url + 'file', formData)
    //     .then(response => this.article.thumbnail = response.data)
    //     .catch(error => console.log(error));// 请求失败处理
    // },

  },

  template: noticeAdd_template
}
