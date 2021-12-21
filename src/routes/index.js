import express from 'express'
const router = express.Router()

import indexController from '../controllers/index-controller.js'

export default {
  // index: require('./main/index')

  // 아래도 됨, 구성은 나중에 고민 api로 할거니깐.
  index: router.get('/', indexController.main)
}