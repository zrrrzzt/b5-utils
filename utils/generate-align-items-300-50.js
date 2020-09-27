(async () => {
  const b300 = require('@alheimsins/b5-costa-mccrae-300-ipip-neo-pi-r')
  const b50 = require('@alheimsins/b5-50-ipip-neo-pi-r')
  const { writeFile } = require('fs').promises

  const b300Questions = b300.getQuestions('en')
  const b50Questions = b50.getQuestions('en')

  const getSimilarQuestion = question => b50Questions.find(item => item.text.toLowerCase() === question.text.toLowerCase())

  const similar = b300Questions.reduce((accumulator, current) => {
    const identical = getSimilarQuestion(current)
    if (identical) {
      accumulator.push({
        300: current.id,
        50: identical.id
      })
    }
    return accumulator
  }, [])

  await writeFile('b5-300-50-alignment.json', JSON.stringify(similar, null, 2), 'utf-8')

  console.log(`Aligned ${similar.length} items`)
})()
