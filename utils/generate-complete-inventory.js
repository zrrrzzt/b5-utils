(async () => {
  const { writeFile } = require('fs').promises
  const { getQuestions: b50questions } = require('@alheimsins/b5-50-ipip-neo-pi-r')
  const { getQuestions: b300questions } = require('@alheimsins/b5-costa-mccrae-300-ipip-neo-pi-r')
  const items = b300questions('en')
  const findItems = id => items.find(item => item.id === id)
  const fifty = b50questions('en')
  const filtered = fifty.filter(item => !findItems(item.id))
  items.push(...filtered)
  await writeFile('complete-inventory.json', JSON.stringify(items, null, 2))
  console.log('finished')
})()
