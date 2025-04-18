const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'Hello World!',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})