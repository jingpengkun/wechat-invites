// utils/util.js

/**
 * 格式化日期
 * @param {Date} date 日期对象
 * @param {String} format 格式化模式
 * @return {String} 格式化后的日期字符串
 */
const formatDate = (date, format = 'YYYY-MM-DD') => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : `0${n}`
  }

  if (format === 'YYYY年MM月DD日 HH:mm') {
    return `${year}年${formatNumber(month)}月${formatNumber(day)}日 ${formatNumber(hour)}:${formatNumber(minute)}`
  } else if (format === 'YYYY-MM-DD') {
    return `${year}-${formatNumber(month)}-${formatNumber(day)}`
  } else if (format === 'HH:mm') {
    return `${formatNumber(hour)}:${formatNumber(minute)}`
  } else {
    return `${year}-${formatNumber(month)}-${formatNumber(day)} ${formatNumber(hour)}:${formatNumber(minute)}:${formatNumber(second)}`
  }
}

/**
 * 生成随机ID
 * @return {String} 随机ID
 */
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

/**
 * 显示加载提示
 * @param {String} title 提示文字
 */
const showLoading = (title = '加载中') => {
  wx.showLoading({
    title: title,
    mask: true
  })
}

/**
 * 隐藏加载提示
 */
const hideLoading = () => {
  wx.hideLoading()
}

/**
 * 显示消息提示
 * @param {String} title 提示内容
 * @param {String} icon 图标类型
 */
const showToast = (title, icon = 'none') => {
  wx.showToast({
    title: title,
    icon: icon
  })
}

module.exports = {
  formatDate,
  generateId,
  showLoading,
  hideLoading,
  showToast
}