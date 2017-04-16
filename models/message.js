/**
 * Message Model - defines the structure of a message
 */
const messageSchema = {
  'properties': {
    'text': {'type': 'string', 'minLength': 1, 'maxLength': 200},
  },
  'required': ['text'],
};

module.exports = messageSchema;
