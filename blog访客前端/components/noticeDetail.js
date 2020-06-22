var noticeDetail_template = `
<div class="container">
    <h2>{{notice.title}}</h2>
    <div v-html="notice.content"></div>
</div>
        `
const noticeDetail = {
    data() {
        return {
          notice: '',
        }
    },
    mounted() {
        //发送get请求
        axios.get(store.state.url + 'notice/' + this.$route.query.id)
            .then(response => {
                //console.log(response);
                this.notice = response.data;
            })
            .catch(error => console.log(error));// 请求失败处理
    },
    template: noticeDetail_template
}
