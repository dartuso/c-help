const dialogflow = require('dialogflow');
const path = require('path');

require('dotenv').config(path.resolve(__dirname, '../.env'));

const LANGUAGE_CODE = 'en-US';

class DialogflowController {
  constructor(projectId) {
    this.projectId = projectId;
    let clientEmail = process.env.DIALOGFLOW_CLIENT_EMAIL;
    let privateKey = process.env.DIALOGFLOW_PRIVATE_KEY;

    let config = {
      credentials: {
        private_key: privateKey,
        client_email: clientEmail,
      },
    };
    this.sessionClient = new dialogflow.SessionsClient(config);
  }

  async sendTextMessageToDialogFlow(textMessage, sessionId) {
    // Define session path
    const sessionPath = this.sessionClient.sessionPath(
      this.projectId,
      sessionId
    );
    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: textMessage,
          languageCode: LANGUAGE_CODE,
        },
      },
    };
    try {
      let responses = await this.sessionClient.detectIntent(request);
      return responses;
    } catch (err) {
      console.error('DialogFlow.sendTextMessageToDialogFlow ERROR:', err);
      throw err;
    }
  }
}

module.exports = DialogflowController;
