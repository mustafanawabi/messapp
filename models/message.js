const messageSchema = {
  'properties': {
    'text': {'type': 'string'},
    'user': {'type': 'string'},
  },
  'required': ['text'],
};

module.exports = messageSchema;
