(async () => {
  const { writeFile } = require('fs').promises
  const alignment = require('../data/b5-300-120-alignment.json')
  const questions = require('../data/300-questions-original.json')
  const getAlignment = id => alignment.find(item => item['300'] === id)
  const alignedQuestions = questions.reduce((accumulator, current) => {
    const aligned = getAlignment(current.id)
    if (aligned) {
      current['id'] = aligned['120']
    }
    accumulator.push(current)
    return accumulator
  }, [])
  await writeFile('300-questions-aligned.json', JSON.stringify(alignedQuestions, null, 2), 'utf-8')
  console.log('Updated file')
})()
