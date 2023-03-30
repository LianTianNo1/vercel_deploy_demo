// 引入axios模块
const axios = require('axios')
const Router = require('koa-router')
const router = new Router()
const { sendResponse, HttpStatus, getMessages, defaultPrompt } = require('../utils/index')
const log4js = require('../utils/log4js')
require('dotenv').config()

/** 初始化数据 */
const apiKey = process.env.OPENAI_API_KEY
const baseUrl = (process.env.OPENAI_API_BASE_URL || 'https://api.openai.com/v1/chat/completions')
    .trim()
    .replace(/\/$/, '')

/** 会话上下文长度 */
const MAX_MESSAGE = 20
const KEY_LEN = 51

/** 保存前面的会话 */
router.post('/savaSession', async (ctx, next) => {
    const { messages, apiKey } = ctx.request.body
    ctx.session.messages = messages
    ctx.session.apiKey = apiKey
    // log4js.info('保存成功！', ctx.session.messages)
    return sendResponse(ctx, HttpStatus.OK, null, '保存成功！')
})

/** 发送到openai */
router.post('/generate', async (ctx, next) => {
    const { message, isCreate, isOnce, apiKey: _apiKey } = ctx.request.body
    const startTime = new Date().getTime()
    // 如果用户输入为空，返回错误信息
    if (!message) {
        return sendResponse(ctx, HttpStatus.BAD_REQUEST, null, '请输入一些文本')
    }

    // 定义请求的参数
    const params = {
        model: 'gpt-3.5-turbo',
        temperature: 0,
        stream: false,
        messages: [],
    }

    params.messages.push(...getMessages(isOnce, ctx.session))

    // 每次用户的新的话
    params.messages.push({ role: 'user', content: message || '你好呀' })
    // log4js.info('是否是单次会话', isOnce)
    // log4js.info('当前合并的message', params.messages)
    const key =
        _apiKey.length === KEY_LEN
            ? _apiKey
            : ctx.session?.apiKey?.length === KEY_LEN
            ? ctx.session?.apiKey
            : apiKey

    console.log('看下当前的key', key)
    // 定义请求的头部信息
    const headers = {
        'Content-Type': 'application/json', // 内容类型为json格式
        Authorization: `Bearer ${key}`, // 授权信息为您的API密钥，请替换为自己的密钥或使用环境变量存储密钥以保证安全性
    }

    try {
        // log4js.info('请求参数', 'baseUrl-->', baseUrl, 'params-->', params, 'headers-->', headers)
        // 发送post请求到OpenAI的completion接口，并获取响应数据（如果您有自己的反向代理地址，请替换https://api.openai.com/v1/completions）
        const response = await axios.post(baseUrl, params, {
            headers,
        })
        // log4js.info('响应response', JSON.stringify(response.data.choices))

        const chatReply =
            response.data.choices &&
            response.data.choices[0] &&
            response.data.choices[0].message &&
            response.data.choices[0].message.content

        params.messages.push({ role: 'assistant', content: chatReply })

        // 将当前的聊天会话上下文保存到会话中
        if (!isOnce)
            ctx.session.messages = params.messages.slice(-(MAX_MESSAGE + defaultPrompt.length))

        // 返回聊天回复给用户
        log4js.info('请求成功', chatReply)
        const endTime = new Date().getTime()
        let resObj = null
        if (!isOnce) {
            const remaining = Math.max(
                0,
                MAX_MESSAGE - (ctx.session.messages.length - defaultPrompt.length)
            )
            resObj = {
                content: chatReply,
                totalTime: Math.floor((endTime - startTime) / 1000),
                remaining,
                maxCount: MAX_MESSAGE,
            }

            console.log(
                '总条数',
                MAX_MESSAGE,
                '剩余条数',
                remaining,
                '当前长度',
                ctx.session.messages.length,
                '默认对话长度',
                defaultPrompt.length
            )
        } else {
            resObj = {
                content: chatReply,
                totalTime: Math.floor((endTime - startTime) / 1000),
                remaining: 0,
                maxCount: MAX_MESSAGE,
            }
        }

        return sendResponse(ctx, HttpStatus.OK, resObj, '请求成功！')
    } catch (error) {
        // 如果发生错误，返回错误信息给用户（可以根据需要自定义错误处理逻辑）
        log4js.info('请求失败', error.message)
        return sendResponse(ctx, HttpStatus.INTERNAL_SERVER_ERROR, null, '出错了！' + error.message)
    }
})

module.exports = router
