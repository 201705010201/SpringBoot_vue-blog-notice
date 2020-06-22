var detail_template = `
<div class="container">
    <h2>{{article.title}}</h2>
    <div v-html="article.content"></div>
    <p>--------------------------------------------------------------------------------------------------</p>
    <div>

        <div class="form-group">
            <label for="name">评论</label>  
            <textarea class="form-control" v-model="comment.content" rows="3"></textarea>
            <button v-on:click="subComment">发表评论</button>
        </div>

    </div>
    <ul class="list-group border-0">
        <li v-for="item in commentList" class="list-group-item border-left-0 border-right-0"><pre>{{item.content}}</pre>{{item.author}}&emsp;{{item.created}}</li>
    </ul>
</div>
        `
const detail = {
    data() {
        return {
            article: '',
            comment: { articleid: '', content: '', created: '', author: '匿名' },
            commentList: []
        }
    },
    methods: {
        subComment: function () {
            if (this.comment.content == '') {
                alert("评论内容不能为空!");
                return;
            }
            //发送post请求
            console.log(this.comment);
            this.comment.articleid = this.article.id;
            axios.post(store.state.url + 'comment/', this.comment)
                .then(response => {
                    //评论发布成功，将该评论增加到this.commentList的第一项
                    this.comment.created = new Date()
                    this.commentList.unshift(this.comment)
                    //还原模板
                    this.comment = { articleid: '', content: '', created: '', author: '匿名' }
                    console.log(response.data)
                })
                .catch(error => console.log(error));// 请求失败处理
        }

    },
    mounted() {
        //发送get请求
        axios.get(store.state.url + 'article/' + this.$route.query.id)
            .then(response => {
                console.log(response);
                this.article = response.data;
                this.commentList = response.data.commentList;
                console.log(this.commentList);
            })
            .catch(error => console.log(error));// 请求失败处理
    },
    template: detail_template
}
