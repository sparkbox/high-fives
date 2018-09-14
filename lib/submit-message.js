const fs = require('fs')
const readline = require('readline')
const {google} = require('googleapis')
const { escapeForSlackWithMarkdown } = require('slack-hawk-down')
const { appendRow } = require('./google-sheets')

const insertNames = (message, userList) => {
  const userMentionRegex = /<@(U[A-Z0-9]+)>/
  const mentions = message.match(new RegExp(userMentionRegex, 'g'))
  let messageWithInlineNames = message

  mentions.forEach(m => {
    const rawId = m.substring(2, m.length - 1)
    const realName = userList.members.find(m => m.id === rawId).real_name
    const realNameHTML = `<strong class="name-mention">${realName}</strong>`
    messageWithInlineNames = messageWithInlineNames.replace(userMentionRegex, realNameHTML)
  })

  return messageWithInlineNames;
}

const submitMessage = (message, opts) => {
  const userMentionRegex = /<@(U[A-Z0-9]+)>/

  const { authorName, approverName, channel, ts, messageText, clientMsgId } = message
  const rawMessage = messageText
  let messageWithNamesInserted,
      awesomePersonName

  // Grabs the first user mention in the message, extracts ID without @ symbol
  const awesomePersonId = rawMessage.match(userMentionRegex)[1]

  if (opts && opts.userList) {
    // get awesomePersonName
    const member = opts.userList.members.find(m => m.id === awesomePersonId)
    awesomePersonName = member.real_name

    if (awesomePersonName === 'Josiah') {
      awesomePersonName = 'Josiah Stroh' // lol
    }

    // insert names
    messageWithNamesInserted = insertNames(rawMessage, opts.userList)
  }

  const awesomePersonHTML = `<strong class="name-mention">${awesomePersonName}</strong>`
  const escapedMessage = escapeForSlackWithMarkdown(messageWithNamesInserted)
  const row = [
    escapedMessage,
    awesomePersonName,
    authorName,
    approverName,
    ts,
    clientMsgId,
    rawMessage
  ]

  appendRow(row)
}

module.exports = submitMessage
