// following this mostly: https://slackapi.github.io/node-slack-sdk/rtm_api
require('dotenv').config()

const colors = require('colors')
const { RTMClient, WebClient } = require('@slack/client')
const submitMessage = require('./lib/submit-message')

const token = process.env.SLACK_TOKEN

const validApprovers = process.env.VALID_APPROVERS
const channelsToWatch = process.env.CHANNELS_TO_WATCH

const isValidReaction = (reaction) => {
  return !!reaction.match(/earth_/)
}

const isValidMessage = (message) => {
  const userMentionRegex = /<@(U[A-Z0-9]+)>/
  return !!message.text.match(userMentionRegex)
}

const isValidApprover = a => validApprovers.split(',').includes(a)
const isValidAuthor = s => !!s
const inChannelsToWatch = c => channelsToWatch.includes(c)

const rtm = new RTMClient(token)
rtm.start()

const web = new WebClient(token)

const getUserList = () => {
  return web.users.list()
}

const getUserFromList = (list, userId) => {
  return list.members.find(m => m.id === userId)
}

const getMessage = async (channel, ts, userId) => {
  // The best way I could find to grab a specific message is by
  // timestamp. You can ask slack for the history of a channel,
  // and scope it down to an exact timestamp. This will, hopefully,
  // give you an array containing a single message with the timestamp
  // you asked for. There's probably a better way to do this, but...
  // ¯\_(ツ)_/¯
  const { messages } = await web.channels.history({
    channel,
    inclusive: true,
    oldest: ts,
    latest: ts,
  })

  return messages.find(m => m.ts === ts && m.user === userId)
}

rtm.on('authenticated', async (e) => {
  console.log(`Slackbot is authenticated. ${"Let's boogie.".bold.magenta}`)
})

rtm.on('reaction_added', async (e) => {
  const { channel } = e.item
  const approverId = e.user
  const authorId = e.item_user
  const relevantEvent = (isValidApprover(approverId) &&
                         isValidAuthor(authorId) &&
                         inChannelsToWatch(channel) &&
                         isValidReaction(e.reaction))

  if (relevantEvent) {
    const { ts } = e.item
    const message = await getMessage(channel, ts, authorId)

    if (!isValidMessage(message)) {
      console.log("It looks like somebody tried to approve this message, but nobody is mentioned?", message)
    }

    console.log("Message approved:", message)

    const userList = await getUserList()
    const author = getUserFromList(userList, authorId)
    const approver = getUserFromList(userList, approverId)
    const data = {
      authorName: author.real_name,
      authorId,
      approverName: approver.real_name,
      approverId,
      ts,
      messageText: message.text,
      clientMsgId: message.client_msg_id
    }

    const opts = { userList }

    submitMessage(data, opts)
  }
})
