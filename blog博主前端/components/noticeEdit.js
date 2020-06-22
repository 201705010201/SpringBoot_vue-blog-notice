var noticeEdit_template = `
<div>
    <div class="container">
    <div>新闻标题：<input type="text" class="form-control" v-model="notice.title" /></div>
    内容：
    <vue-html5-editor @change="updateData" :content="notice.content" :height="300" ref="editor"></vue-html5-editor>

    <br><button type="button" class="btn-block btn-primary" v-on:click="Save">提交修改</button>
    </div>
</div>
        `
const noticeEdit = {
    data() {
        return {
            notice: { title: '', content: ''},
            url: store.state.url,
        }
    },
    methods: {
        updateData: function (data) {
            // sync content to component
            this.notice.content = data
        },
        //保存
        Save: function () {
            if (this.notice.title == '' || this.notice.content == '') {
                alert("标题或内容不能为空!");
                return;
            }

            this.notice.content = this.notice.content.replace(/<img/g, '<img  class="img-fluid" ')  //增加图片自适应样式

            axios.put(store.state.url + 'notice/', this.notice)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => console.log(error));// 请求失败处理

            //还原模板
            this.notice = { title: '', content: ''};
        },

    },
    mounted() {
        axios.get(store.state.url + 'notice/' + this.$route.query.id)
            .then(response => {
                console.log(response);
                this.notice = response.data
            })
            .catch(error => console.log(error));// 请求失败处理
    },


    template: noticeEdit_template
}