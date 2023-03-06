const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({  
    devServer: {      
        port:8081,
        proxy: { // proxyTable 설정
            '/api': { // api 로 시작하는 소스 는 traget으로 잡아준다. > 사용할때 url 이 api 가 있어야 한다.
                target: 'http://121.161.237.50:50005',
                changeOrigin: true
            },             
        }
    },
    lintOnSave: false
})
