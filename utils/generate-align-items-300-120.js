(async () => {
  const b300 = require('@alheimsins/b5-costa-mccrae-300-ipip-neo-pi-r')
  const b120 = require('@alheimsins/b5-johnson-120-ipip-neo-pi-r')
  const { writeFile } = require('fs').promises

  const b300Questions = b300.getQuestions('en')
  const b120Questions = b120.getQuestions('en')

  const getSimilarQuestion = question => b120Questions.find(item => item.text.toLowerCase() === question.text.toLowerCase())

  const similar = b300Questions.reduce((accumulator, current) => {
    const identical = getSimilarQuestion(current)
    if (identical) {
      accumulator.push({
        '300': current.id,
        '120': identical.id
      })
    }
    return accumulator
  }, [])

  await writeFile('b5-300-120-alignment.json', JSON.stringify(similar, null, 2), 'utf-8')

  console.log('aligned')
})()
