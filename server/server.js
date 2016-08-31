/**
 * 微信与搜狗合作，可以通过搜狗直接搜索公众号。
 */
const http = require('http')
const url = require('url')
const util = require('util')
const superagent = require('superagent')
const cheerio = require('cheerio')


const onRequest = (req,res) => {
	res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8', 'Access-Control-Allow-Origin': '*'})
	let keyWord = encodeURI(url.parse(req.url,true).query.query); 
	if(keyWord){
	  superagent.get('http://weixin.sogou.com/weixin?type=1&query=' + keyWord + '&ie=utf8&_sug_=n&_sug_type_=').end(
	  	(err,response) => {
			if(err) console.log(err)
			let resultArr = []
			let $ = cheerio.load(response.text)
			$('.mt7 .wx-rb').each((index, item) => {
			  let resultObj = {
			    title: '',
			    wxNum: '',
			    link: '',
			    pic: ''
			  }
			  resultObj.title = $(item).find('h3').text()
			  resultObj.wxNum = $(item).find('label').text()
			  resultObj.link = $(item).find('href').text()
			  resultObj.pic = $(item).find('img').attr('src')
			  resultArr.push(resultObj)
			})
			res.write(JSON.stringify(resultArr))
			res.end()
		})
	}
}

http.createServer(onRequest).listen(process.env.PORT || 8090);
console.log('Server Start!')
